import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import path from 'node:path';

const out=path.resolve('artifacts/menu-book-color-2026-09-13');await mkdir(out,{recursive:true});
const url='http://127.0.0.1:3004/';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--disable-component-update','--no-first-run']});
const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce',locale:'ru-RU'});
await context.route('**/*',route=>{const target=new URL(route.request().url());return ['http:','https:'].includes(target.protocol)&&target.origin!==new URL(url).origin?route.abort():route.continue();});
const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
const ready=()=>page.waitForFunction(()=>document.querySelector('.menu-book')?.dataset.ready==='true');
const response=await page.goto(url);await ready();await page.evaluate(()=>document.fonts.ready);
const widths=[];
try {
  for(const width of [1440,1280,1024,768,430,390,375]) {
    await page.setViewportSize({width,height:1100});
    assert.equal(await page.locator('.mb-page').count(),1);await ready();
    await page.locator('.menu-book').scrollIntoViewIfNeeded();
    await page.evaluate(async()=>{await Promise.all([...document.images].filter(img=>img.complete).map(img=>img.decode().catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
    await page.locator('.menu-book').screenshot({path:path.join(out,`menu-${width}.png`)});
    await page.locator('.evening-plan').screenshot({path:path.join(out,`process-${width}.png`)});
    const measure=await page.evaluate(()=>{
      const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY,width:r.width,height:r.height};};
      const book=document.querySelector('.menu-book');const scene=document.querySelector('.mb-book');
      const stations=[...document.querySelectorAll('.process-station')];
      const full=rect(book);const paper=rect(scene);const heading=rect(document.querySelector('.station-menu > .station-heading'));const conversation=rect(document.querySelector('.conversation-illustration'));
      const route=document.querySelector('.plan-route');const rbox=rect(route);
      let throughBook=0,throughCopy=0;
      const blocked=[...document.querySelectorAll('.station-copy,.conversation-illustration,.preparation-film')].map(rect);
      for(const line of route.querySelectorAll('path')){const length=line.getTotalLength();for(let p=0;p<=length;p+=4){const v=line.getPointAtLength(p);const x=v.x+rbox.left,y=v.y+rbox.top;if(x>paper.left+1&&x<paper.right-1&&y>paper.top+1&&y<paper.bottom-1)throughBook++;if(blocked.some(b=>x>b.left+3&&x<b.right-3&&y>b.top+3&&y<b.bottom-3))throughCopy++;}}
      return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,book:full,pages:[...scene.querySelectorAll('.mb-page')].map(el=>({recipe:el.dataset.recipe,rect:rect(el),plate:rect(el.querySelector('.mb-plate')),ingredients:rect(el.querySelector('.mb-details')),actions:[...el.querySelectorAll('.mb-operation p,.mb-extra-ingredient > p')].map(el=>el.textContent),photoLoaded:[...el.querySelectorAll('.mb-photo img')].every(img=>img.complete&&img.naturalWidth>0)})),
        heading,conversation,stations:stations.map(el=>({step:el.dataset.step,heading:rect(el.querySelector('.station-heading')),rect:rect(el)})),throughBook,throughCopy,
        smallControls:[...book.querySelectorAll('button')].filter(el=>el.getBoundingClientRect().height>0).filter(el=>el.getBoundingClientRect().height<43.9||el.getBoundingClientRect().width<43.9).map(el=>el.textContent),
        fonts:{title:getComputedStyle(book.querySelector('h4')).fontFamily,copy:getComputedStyle(book.querySelector('.mb-operation p')).fontFamily,number:getComputedStyle(book.querySelector('.mb-page-number')).fontFamily},
        headingSizes:[...book.querySelectorAll('h4,h5')].map(el=>parseFloat(getComputedStyle(el).fontSize)),collage:document.querySelectorAll('.collage-tile img').length,
        video:{source:document.querySelector('video source').getAttribute('src'),controls:document.querySelector('video').controls}};
    });
    widths.push(measure);
    assert.equal(measure.overflow,false);assert.deepEqual(measure.smallControls,[]);assert.equal(measure.throughBook,0);assert.equal(measure.throughCopy,0);
    assert.ok(measure.pages.every(p=>p.plate.top>=p.ingredients.bottom&&p.actions.length===10&&p.recipe==='octopus'&&p.photoLoaded));
    assert.ok(measure.headingSizes.every(size=>size>=19));assert.match(measure.fonts.title,/Oranienbaum/);assert.match(measure.fonts.copy,/Ysabeau/);assert.match(measure.fonts.number,/PT Mono/);
    assert.equal(measure.collage,63);assert.equal(measure.video.controls,true);assert.match(measure.video.source,/short-prep/);
    if(width>900){assert.ok(measure.book.top>=measure.conversation.bottom+20);assert.ok(measure.stations[2].heading.top>=measure.book.bottom+45);}
    else{assert.ok(measure.stations.every((s,i,all)=>!i||s.rect.top>=all[i-1].rect.bottom-1));}
    console.log(`${width}px: passed`);
  }
  assert.equal(await page.locator('.mb-pencil,.mb-stroke,.mb-flight,.mb-navigation,[data-menu-scroll],[data-menu-color],[data-menu-sketch]').count(),0);
  assert.deepEqual(await page.locator('.mb-amount').evaluateAll(es=>es.map(e=>Number(e.dataset.grams))),[160,25,25,60,5,3,10,5,1,.2]);
  assert.ok((await page.locator('.mb-portions').innerText()).includes('1 порцию'));
  const colorState=()=>page.locator('.mb-photo').evaluateAll(es=>es.map(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})));
  const expected=Array.from({length:5},()=>({opacity:'1',transform:'none'}));
  for(const motion of ['no-preference','reduce']){
    await page.emulateMedia({reducedMotion:motion});
    for(const fraction of [0,.3,.7,1]){
      await page.locator('.menu-book').evaluate((el,f)=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY+el.clientHeight*f-innerHeight/2,behavior:'instant'}),fraction);
      assert.deepEqual(await colorState(),expected);
    }
  }
  assert.equal(await page.locator('.menu-book').evaluate(el=>el.getAnimations({subtree:true}).length),0);
  assert.equal(await page.locator('.mb-page').getAttribute('data-recipe'),'octopus');
  for(const width of [1440,375]){
    await page.setViewportSize({width,height:1900});
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const clipped=await page.locator('.mb-operation-heading,.mb-extra-ingredient,.mb-portions').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent));
    assert.deepEqual(clipped,[]);
    await page.locator('.menu-book').screenshot({path:path.join(out,'text-200-'+width+'.png')});
    await page.evaluate(()=>document.documentElement.style.fontSize='');
  }
  const noJS=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});
  const staticPage=await noJS.newPage();await staticPage.goto(url);
  await staticPage.locator('.mb-plate').scrollIntoViewIfNeeded();
  assert.equal(await staticPage.locator('.mb-page').count(),1);
  assert.equal(await staticPage.locator('.mb-amount').count(),10);
  assert.ok((await staticPage.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='1'));
  await staticPage.locator('.menu-book').screenshot({path:path.join(out,'no-js-390.png')});await noJS.close();
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(url);await ready();
  await page.locator('video').scrollIntoViewIfNeeded();
  await page.locator('video').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().bottom+scrollY-innerHeight*.94+2,behavior:'instant'}));
  await page.waitForFunction(()=>!document.querySelector('video').paused&&document.querySelector('video').currentTime>.1);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('video').paused);
  const failContext=await browser.newContext({viewport:{width:390,height:844}});let fail=true;
  await failContext.route('**/octopus-photo-atlas-*.webp',route=>fail?route.abort():route.continue());const bad=await failContext.newPage();
  await bad.goto(url);await bad.locator('.mb-error').waitFor({state:'visible'});
  assert.equal(await bad.locator('.mb-amount').count(),10);
  const retry=bad.locator('[data-menu-retry]');
  await bad.keyboard.press('Tab');await retry.focus();
  assert.equal(await retry.evaluate(el=>getComputedStyle(el).outlineStyle==='solid'),true);
  const target=await retry.boundingBox();assert.ok(target.width>=44&&target.height>=44);
  await bad.locator('.menu-book').screenshot({path:path.join(out,'image-error-390.png')});
  fail=false;await bad.keyboard.press('Enter');await bad.waitForFunction(()=>document.querySelector('.menu-book').dataset.ready==='true');
  assert.equal(await bad.locator('.mb-error').isVisible(),false);await failContext.close();
  assert.deepEqual(errors,[]);
  await writeFile(path.join(out,'report.json'),JSON.stringify({passed:true,noindex:response.headers()['x-robots-tag'],widths,errors,
    tests:['Only octopus; 10 ingredients with weights for one portion, including salt and pepper','Seven widths, 200% text, current fonts, route clearance, collage and video','Always colored through scrolling and both motion preferences; no pencil, animation or navigation','Color and complete recipe without JavaScript','Image error/retry by keyboard, visible focus and 44px target']},null,2));
  console.log('All color-only octopus checks passed');
} catch(error){await writeFile(path.join(out,'report.json'),JSON.stringify({passed:false,widths,errors,error:error.stack},null,2));throw error;}
finally{await browser.close();}
