import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import path from 'node:path';

const out=path.resolve('artifacts/menu-book-pencil-color-2026-09-13');await mkdir(out,{recursive:true});
const url='http://127.0.0.1:3004/';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--disable-component-update','--no-first-run']});
const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce',locale:'ru-RU'});
await context.route('**/*',route=>{const target=new URL(route.request().url());return ['http:','https:'].includes(target.protocol)&&target.origin!==new URL(url).origin?route.abort():route.continue();});
const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
const ready=()=>page.waitForFunction(()=>document.querySelector('.menu-book')?.dataset.ready==='true');
const final=()=>page.waitForFunction(()=>document.querySelector('.menu-book')?.dataset.state==='final'&&document.querySelector('.menu-book')?.dataset.playing==='false');
const response=await page.goto(url);await ready();await page.evaluate(()=>document.fonts.ready);
const widths=[];
try {
  for(const width of [1440,1280,1024,768,430,390,375]) {
    await page.setViewportSize({width,height:1100});
    await page.waitForFunction(w=>document.querySelectorAll('.mb-page').length===(w<=900?1:2),width);await ready();
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
      return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,book:full,pages:[...scene.querySelectorAll('.mb-page')].map(el=>({recipe:el.dataset.recipe,rect:rect(el),plate:rect(el.querySelector('.mb-plate')),ingredients:rect(el.querySelector('.mb-ingredients')),actions:[...el.querySelectorAll('.mb-operation p')].map(el=>el.textContent),photoLoaded:[...el.querySelectorAll('.mb-photo img')].every(img=>img.complete&&img.naturalWidth>0)})),
        heading,conversation,stations:stations.map(el=>({step:el.dataset.step,heading:rect(el.querySelector('.station-heading')),rect:rect(el)})),throughBook,throughCopy,
        smallControls:[...book.querySelectorAll('button')].filter(el=>el.getBoundingClientRect().height>0).filter(el=>el.getBoundingClientRect().height<43.9||el.getBoundingClientRect().width<43.9).map(el=>el.textContent),
        fonts:{title:getComputedStyle(book.querySelector('h4')).fontFamily,copy:getComputedStyle(book.querySelector('.mb-operation p')).fontFamily,number:getComputedStyle(book.querySelector('.mb-page-number')).fontFamily},
        headingSizes:[...book.querySelectorAll('h4,h5')].map(el=>parseFloat(getComputedStyle(el).fontSize)),collage:document.querySelectorAll('.collage-tile img').length,
        video:{source:document.querySelector('video source').getAttribute('src'),controls:document.querySelector('video').controls}};
    });
    widths.push(measure);
    assert.equal(measure.overflow,false);assert.deepEqual(measure.smallControls,[]);assert.equal(measure.throughBook,0);assert.equal(measure.throughCopy,0);
    assert.ok(measure.pages.every(p=>p.plate.top>=p.ingredients.bottom&&p.actions.length===4&&p.photoLoaded));
    assert.ok(measure.headingSizes.every(size=>size>=19));assert.match(measure.fonts.title,/Oranienbaum/);assert.match(measure.fonts.copy,/Ysabeau/);assert.match(measure.fonts.number,/PT Mono/);
    assert.equal(measure.collage,63);assert.equal(measure.video.controls,true);assert.match(measure.video.source,/short-prep/);
    if(width>900){assert.ok(measure.book.top>=measure.conversation.bottom+20);assert.ok(measure.stations[2].heading.top>=measure.book.bottom+45);}
    else{assert.ok(measure.stations.every((s,i,all)=>!i||s.rect.top>=all[i-1].rect.bottom-1));}
    console.log(`${width}px: passed`);
  }
  await page.locator('[data-menu-next]').click();await ready();assert.equal(await page.locator('.mb-page').getAttribute('data-recipe'),'octopus');await page.locator('.menu-book').screenshot({path:path.join(out,'octopus-375.png')});
  await page.locator('[data-menu-next]').click();await ready();assert.equal(await page.locator('.mb-page').getAttribute('data-recipe'),'lamb');await page.locator('.menu-book').screenshot({path:path.join(out,'lamb-375.png')});assert.ok(await page.locator('[data-menu-next]').isDisabled());
  await page.locator('[data-menu-previous]').click();await ready();
  // Keep the complete spread inside the viewport for state screenshots: Chrome's
  // oversized element capture briefly changes device metrics and remounts the spread.
  await page.setViewportSize({width:1440,height:1800});await page.waitForFunction(()=>document.querySelectorAll('.mb-page').length===2);await ready();
  assert.deepEqual(await page.locator('.mb-page').evaluateAll(es=>es.map(e=>e.dataset.recipe)),['octopus','lamb']);
  await page.locator('[data-menu-previous]').click();await ready();
  await page.locator('[data-menu-sketch]').click();assert.equal(await page.locator('.menu-book').getAttribute('data-state'),'sketch');await page.locator('.menu-book').screenshot({path:path.join(out,'pencil-1440.png')});
  assert.equal(await page.locator('.menu-book').getAttribute('data-state'),'sketch');
  assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='0'));
  await page.locator('[data-menu-play]').click();await final();assert.equal(await page.evaluate(()=>document.querySelector('.menu-book').getAnimations({subtree:true}).length),0);
  await page.locator('[data-menu-play]').focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  assert.equal(await page.locator('[data-menu-play]').evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle==='solid'),true);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-menu-play]').click();
  await page.waitForFunction(()=>[...document.querySelectorAll('.mb-stroke')].some(el=>{const n=parseFloat(getComputedStyle(el).strokeDashoffset);return n>.2&&n<.8;}));
  assert.equal(await page.locator('.menu-book').getAttribute('data-phase'),'pencil');
  assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='0'));
  assert.equal(await page.locator('.mb-flight,.mb-flights').count(),0);
  assert.ok(await page.evaluate(()=>document.querySelector('.menu-book').getAnimations({subtree:true}).every(a=>a.effect.getKeyframes().every(frame=>!('transform' in frame)))));
  await page.locator('[data-menu-pause]').click();
  // WAAPI commits pending pause tasks on the next animation frame.
  const times=await page.evaluate(async()=>{const animations=document.querySelector('.menu-book').getAnimations({subtree:true});await Promise.all(animations.map(a=>a.ready));return animations.map(a=>Number(a.currentTime));});
  await page.evaluate(()=>new Promise(resolve=>setTimeout(resolve,220)));assert.ok((await page.evaluate(()=>document.querySelector('.menu-book').getAnimations({subtree:true}).map(a=>Number(a.currentTime)))).every((t,i)=>Math.abs(t-times[i])<1));
  await page.locator('[data-menu-pause]').click();
  await page.waitForFunction(()=>document.querySelector('.menu-book')?.dataset.phase==='color'&&[...document.querySelectorAll('.mb-ingredient .mb-photo')].every(el=>Number(getComputedStyle(el).opacity)>.99));
  assert.ok((await page.locator('.mb-plate .mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='0'));
  await page.locator('[data-menu-pause]').click();await page.locator('.menu-book').screenshot({path:path.join(out,'phase-02-color.png')});await page.locator('[data-menu-pause]').click();
  await page.waitForFunction(()=>document.querySelector('.menu-book')?.dataset.phase==='plate');
  assert.equal(await page.locator('.mb-flight,.mb-flights').count(),0);
  await final();assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='1'));
  await page.locator('[data-menu-play]').click();await page.locator('[data-menu-next]').click();await ready();await final();assert.equal(await page.locator('.mb-flight').count(),0);
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.querySelectorAll('.mb-page').length===1);await ready();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-menu-play]').click();await final();
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.menu-book').screenshot({path:path.join(out,'mobile-finished-390.png')});
  // Root text enlargement exercises actual rem-based type and the recipe container.
  for(const width of [1440,375]){await page.setViewportSize({width,height:1100});await ready();await page.evaluate(()=>document.documentElement.style.fontSize='200%');await page.waitForTimeout(150);await ready();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.locator('.menu-book').screenshot({path:path.join(out,`text-200-${width}.png`)});await page.evaluate(()=>document.documentElement.style.fontSize='');}
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(url);await ready();
  assert.equal(await page.locator('.menu-book').getAttribute('data-state'),'sketch');
  assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='0'));
  await page.locator('video').scrollIntoViewIfNeeded();
  await page.locator('video').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().bottom+scrollY-innerHeight*.94+2,behavior:'instant'}));await page.waitForFunction(()=>!document.querySelector('video').paused&&document.querySelector('video').currentTime>.1);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('video').paused);
  const failContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});let fail=true;
  await failContext.route('**/duck-photo-atlas-*.webp',route=>fail?route.abort():route.continue());const bad=await failContext.newPage();await bad.goto(url);await bad.locator('.mb-error').waitFor({state:'visible'});fail=false;await bad.locator('[data-menu-retry]').click();await bad.waitForFunction(()=>document.querySelector('.menu-book').dataset.ready==='true');assert.equal(await bad.locator('.mb-error').isVisible(),false);await failContext.close();
  assert.deepEqual(errors,[]);
  await writeFile(path.join(out,'report.json'),JSON.stringify({passed:true,noindex:response.headers()['x-robots-tag'],widths,errors,tests:['Selected spread in native site, one full recipe on mobile','12 cooking operations and all three plates','Existing fonts, collage, step sequence and video retained','Route avoids book, all step copy, conversation image and video','Responsive widths and200% text','Navigation limits, drawing/serving, reduced motion, keyboard focus','Pencil first, then ingredient color, then the whole finished plate','No flight elements or transform animations; final color remains','Pause/resume, cleanup on recipe change, complete mobile animation and image-error retry','Video starts at approved scroll position and pauses offscreen']},null,2));
  console.log('All menu integration checks passed');
}catch(error){await writeFile(path.join(out,'report.json'),JSON.stringify({passed:false,widths,errors,error:String(error)},null,2));throw error;}finally{await browser.close();}
