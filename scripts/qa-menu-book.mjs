import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import path from 'node:path';

const out=path.resolve('artifacts/menu-book-scroll-lines-2026-09-13');await mkdir(out,{recursive:true});
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
  await page.locator('[data-menu-sketch]').click();
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'sketch');
  await page.locator('.menu-book').screenshot({path:path.join(out,'pencil-1440.png')});
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'sketch');
  assert.equal(await page.locator('.mb-pencil image,.mb-pencil mask').count(),0);
  const lineStyles=await page.locator('.mb-stroke').evaluateAll(es=>es.map(e=>({fill:getComputedStyle(e).fill,width:parseFloat(getComputedStyle(e).strokeWidth),effect:getComputedStyle(e).vectorEffect})));
  assert.ok(lineStyles.length>0&&lineStyles.every(s=>s.fill==='none'&&s.width<=.8&&s.effect==='non-scaling-stroke'));
  await page.locator('[data-menu-color]').click();
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'final');
  assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='1'));
  await page.locator('[data-menu-color]').focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  assert.equal(await page.locator('[data-menu-color]').evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle==='solid'),true);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:1100});
  await page.locator('[data-menu-scroll]').click();
  const firstArt='.mb-page[data-recipe="duck"] .mb-ingredient:first-child .mb-art';
  const firstPlate='.mb-page[data-recipe="duck"] .mb-plate .mb-art';
  const position=async(selector,fraction)=>page.locator(selector).evaluate(async(el,f)=>{
    const r=el.getBoundingClientRect();
    window.scrollTo({top:scrollY+r.top+r.height/2-innerHeight*f,behavior:'instant'});
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },fraction);
  const state=async(selector)=>page.locator(selector).evaluate(el=>({
    progress:Number(el.dataset.progress),draw:Number(el.style.getPropertyValue('--draw')),
    photo:getComputedStyle(el.querySelector('.mb-photo')).opacity,pencil:getComputedStyle(el.querySelector('.mb-pencil')).opacity,
    strokes:[...el.querySelectorAll('.mb-stroke')].map(p=>getComputedStyle(p).strokeDashoffset),
    top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom
  }));
  await position(firstArt,.73);
  const partial=await state(firstArt);
  assert.ok(partial.draw>0&&partial.draw<1);assert.equal(partial.photo,'0');
  await page.waitForTimeout(450);assert.deepEqual(await state(firstArt),partial,'Drawing must stop when scrolling stops');
  assert.equal(await page.evaluate(()=>document.querySelector('.menu-book').getAnimations({subtree:true}).length),0);
  await page.screenshot({path:path.join(out,'scroll-drawing.png')});
  await position(firstArt,.407);
  const beforeCut=await state(firstArt);assert.equal(beforeCut.draw,1);assert.equal(beforeCut.photo,'0');assert.equal(beforeCut.pencil,'1');
  await page.screenshot({path:path.join(out,'scroll-before-cut.png')});
  const opacitySamples=[];
  for(const fraction of [.407,.405,.403,.401,.399]){
    await position(firstArt,fraction);
    const value=await state(firstArt);opacitySamples.push(value.photo);
    assert.ok(['0','1'].includes(value.photo));assert.ok(['0','1'].includes(value.pencil));
  }
  assert.ok(opacitySamples.includes('0')&&opacitySamples.includes('1'));
  assert.equal((await state(firstArt)).photo,'1');
  await page.screenshot({path:path.join(out,'scroll-after-cut.png')});
  await position(firstArt,.65);assert.equal((await state(firstArt)).photo,'0');assert.ok((await state(firstArt)).draw<1);
  await position(firstPlate,.407);assert.equal((await state(firstPlate)).photo,'0');
  await position(firstPlate,.399);const plate=await state(firstPlate);assert.equal(plate.photo,'1');assert.ok(plate.top>=0&&plate.bottom<=1100);
  await page.screenshot({path:path.join(out,'scroll-finished-plate.png')});
  assert.equal(await page.locator('.mb-flight,.mb-flights').count(),0);
  await page.locator('[data-menu-next]').click();await ready();
  assert.deepEqual(await page.locator('.mb-page').evaluateAll(es=>es.map(e=>e.dataset.recipe)),['octopus','lamb']);
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'scroll');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('.menu-book').dataset.mode==='final');
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'final');assert.ok(await page.locator('[data-menu-scroll]').isDisabled());
  await page.locator('[data-menu-sketch]').click();assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'sketch');
  await page.setViewportSize({width:1440,height:1900});await ready();
  await page.locator('.menu-book').screenshot({path:path.join(out,'pencil-second-spread.png')});
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.querySelectorAll('.mb-page').length===1);await ready();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-menu-scroll]').click();
  const mobilePlate='.mb-page .mb-plate .mb-art';
  await position(mobilePlate,.407);assert.equal((await state(mobilePlate)).photo,'0');
  await page.screenshot({path:path.join(out,'mobile-before-cut.png')});
  await position(mobilePlate,.399);const mobile=await state(mobilePlate);assert.equal(mobile.photo,'1');assert.ok(mobile.top>=0&&mobile.bottom<=844);
  await page.screenshot({path:path.join(out,'mobile-after-cut.png')});
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [1440,375]){
    await page.setViewportSize({width,height:1900});await ready();
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');await page.waitForTimeout(150);await ready();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.locator('.menu-book').screenshot({path:path.join(out,'text-200-'+width+'.png')});
    await page.evaluate(()=>document.documentElement.style.fontSize='');
  }
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(url);await ready();
  assert.equal(await page.locator('.menu-book').getAttribute('data-mode'),'scroll');
  assert.ok((await page.locator('.mb-photo').evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(v=>v==='0'));
  await page.locator('video').scrollIntoViewIfNeeded();
  await page.locator('video').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().bottom+scrollY-innerHeight*.94+2,behavior:'instant'}));
  await page.waitForFunction(()=>!document.querySelector('video').paused&&document.querySelector('video').currentTime>.1);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('video').paused);
  const failContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});let fail=true;
  await failContext.route('**/duck-photo-atlas-*.webp',route=>fail?route.abort():route.continue());const bad=await failContext.newPage();
  await bad.goto(url);await bad.locator('.mb-error').waitFor({state:'visible'});
  assert.equal(await bad.locator('.menu-book').getAttribute('data-mode'),'sketch');
  assert.ok((await bad.locator('.mb-art').evaluateAll(es=>es.map(e=>e.style.getPropertyValue('--draw')))).every(v=>Number(v)===1));
  fail=false;await bad.locator('[data-menu-retry]').click();await bad.waitForFunction(()=>document.querySelector('.menu-book').dataset.ready==='true');
  assert.equal(await bad.locator('.mb-error').isVisible(),false);await failContext.close();
  assert.deepEqual(errors,[]);
  await writeFile(path.join(out,'report.json'),JSON.stringify({passed:true,noindex:response.headers()['x-robots-tag'],widths,errors,opacitySamples,
    tests:['Two recipes on desktop, one full recipe on mobile; all 12 operations retained','Seven widths, 200% text, current fonts, route clearance, collage and video','Thin unfilled SVG strokes; no grayscale raster or reveal mask','Pencil progress follows scrolling and stays still without scrolling','Color cuts in one frame; all sampled opacity values are 0 or 1','Reverse scrolling returns the sketch; plates fully visible at the color threshold on desktop and mobile','Static sketch/color controls, keyboard focus, page navigation, reduced motion and image error/retry','No timers, Web Animations or moving ingredient copies']},null,2));
  console.log('All scroll-line menu checks passed');
}catch(error){await writeFile(path.join(out,'report.json'),JSON.stringify({passed:false,widths,errors,error:String(error)},null,2));throw error;}finally{await browser.close();}
