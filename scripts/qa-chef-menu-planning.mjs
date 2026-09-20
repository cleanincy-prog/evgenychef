import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import path from 'node:path';

const out=path.resolve(process.env.QA_OUTPUT || 'artifacts/chef-menu-planning-2026-09-14');
await mkdir(out,{recursive:true});
const url='http://127.0.0.1:3004/';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--disable-component-update','--no-first-run']});
const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce',locale:'ru-RU'});
await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(url).origin?route.continue():route.abort());
const page=await context.newPage();
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
const results=[];
async function settle() {
  await page.locator('.menu-worktable').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('.menu-worktable img')?.naturalWidth>0);
  await page.waitForFunction(()=>document.querySelector('.menu-worktable')?.dataset.ready==='true');
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
}
try {
  const response=await page.goto(url);
  assert.match(response.headers()['x-robots-tag'],/noindex/);
  for(const width of [1440,1280,1024,768,430,390,375]) {
    await page.setViewportSize({width,height:1100});
    await settle();
    const geometry=await page.evaluate(()=>{
      const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY,width:r.width,height:r.height};};
      const scene=rect(document.querySelector('.menu-worktable'));
      const conversation=rect(document.querySelector('.conversation-illustration'));
      const stations=[...document.querySelectorAll('.process-station')].map(e=>({step:e.dataset.step,heading:rect(e.querySelector('.station-heading')),rect:rect(e)}));
      const route=document.querySelector('.plan-route'),rbox=rect(route);
      const blocked=[scene,...[...document.querySelectorAll('.station-copy,.conversation-illustration,.preparation-film')].map(rect)];
      let intersections=0;
      for(const line of route.querySelectorAll('path')){const length=line.getTotalLength();for(let p=0;p<=length;p+=4){const v=line.getPointAtLength(p);const x=v.x+rbox.left,y=v.y+rbox.top;if(blocked.some(b=>x>b.left+3&&x<b.right-3&&y>b.top+3&&y<b.bottom-3))intersections++;}}
      const image=document.querySelector('.menu-worktable img');
      return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,scene,conversation,stations,intersections,image:{source:image.currentSrc,loaded:image.complete&&image.naturalWidth>0,rect:rect(image),filter:getComputedStyle(image).filter,blend:getComputedStyle(image).mixBlendMode},fonts:{title:getComputedStyle(document.querySelector('.station-menu h3')).fontFamily,copy:getComputedStyle(document.querySelector('.station-menu .station-copy p')).fontFamily,number:getComputedStyle(document.querySelector('.station-number')).fontFamily}};
    });
    results.push(geometry);
    assert.equal(geometry.overflow,false,`${width}: horizontal overflow`);
    assert.equal(geometry.intersections,0,`${width}: route crosses content`);
    assert.equal(geometry.image.loaded,true);
    assert.equal(geometry.image.filter,'grayscale(1) contrast(1.25)');assert.equal(geometry.image.blend,'multiply');
    assert.ok(Math.abs(geometry.image.rect.width/geometry.image.rect.height-1.5)<.001);
    assert.match(geometry.fonts.title,/Oranienbaum/);assert.match(geometry.fonts.copy,/Ysabeau/);assert.match(geometry.fonts.number,/PT Mono/);
    if(width>900){assert.ok(geometry.scene.left>=geometry.stations[1].heading.left+33);assert.ok(geometry.scene.top>=geometry.stations[1].heading.bottom+16);assert.ok(geometry.scene.width<=620.1);assert.ok(geometry.stations[2].heading.top>=geometry.conversation.bottom+54);assert.ok(geometry.stations[3].heading.top>=geometry.scene.bottom+50);}
    else assert.ok(geometry.stations.every((s,i,all)=>!i||s.rect.top>=all[i-1].rect.bottom-1));
    assert.equal(await page.locator('.menu-book,[data-grams],.notebook-pages,.menu-worktable-caption').count(),0);
    assert.equal(await page.locator('.station-menu > .station-heading h3').innerText(),'Продумываю меню');
    assert.equal(await page.locator('.station-menu .station-copy p').innerText(),'Из ваших пожеланий складывается меню. Я выбираю продукты и продумываю, как они будут сочетаться между собой.');
    await page.locator('.evening-plan').screenshot({path:path.join(out,`process-${width}.png`)});
    await page.locator('.menu-worktable').screenshot({path:path.join(out,`menu-${width}.png`)});
    if(width===1440||width===390) await page.screenshot({path:path.join(out,`page-${width}.png`),fullPage:true});
    console.log(`${width}px passed`);
  }
  for(const width of [1440,375]){
    await page.setViewportSize({width,height:1500});
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    await settle();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.locator('.station-menu .station-copy p').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
    assert.ok(await page.locator('.station-number').evaluateAll(elements=>elements.every(e=>getComputedStyle(e).whiteSpace==='nowrap'&&e.scrollWidth<=e.clientWidth+1)));
    await page.locator('.station-menu').screenshot({path:path.join(out,`text-200-${width}.png`)});
    await page.evaluate(()=>document.documentElement.style.fontSize='');
  }
  assert.equal(await page.locator('.collage-tile img').count(),63);
  assert.equal(await page.locator('video').evaluate(e=>e.controls),false);
  assert.equal(await page.locator('.menu-worktable').evaluate(e=>e.getAnimations({subtree:true}).length),0);
  const nojs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});
  const staticPage=await nojs.newPage();await staticPage.goto(url);await staticPage.locator('.menu-worktable').scrollIntoViewIfNeeded();
  await staticPage.locator('.menu-worktable').screenshot({path:path.join(out,'no-js-390.png')});
  assert.equal(await staticPage.locator('.menu-worktable img').evaluate(e=>e.complete&&e.naturalWidth>0),true);
  await nojs.close();
  const failed=await browser.newContext({viewport:{width:390,height:844}});let abort=true;
  await failed.route('**/media/menu/chef-planning/*.webp*',route=>abort?route.abort():route.continue());
  const errorPage=await failed.newPage();await errorPage.goto(url);await errorPage.locator('.menu-worktable').scrollIntoViewIfNeeded();
  await errorPage.locator('.menu-worktable-error').waitFor({state:'visible'});
  const retry=errorPage.getByRole('button',{name:'Попробовать ещё раз'});await retry.focus();
  assert.equal(await retry.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  const box=await retry.boundingBox();assert.ok(box.width>=44&&box.height>=44);
  await errorPage.locator('.station-menu').screenshot({path:path.join(out,'error-390.png')});
  abort=false;await errorPage.keyboard.press('Enter');
  await errorPage.waitForFunction(()=>document.querySelector('.menu-worktable').dataset.ready==='true');
  assert.equal(await errorPage.locator('.menu-worktable-error').count(),0);
  await failed.close();
  assert.deepEqual(errors,[]);
  await writeFile(path.join(out,'report.json'),JSON.stringify({passed:true,results,errors,checks:['Seven widths and route clearance','200% text on desktop and phone','Approved single graphite illustration, no food photograph or ingredient layers','No-JavaScript content and image','Image failure, keyboard retry, 44px target and focus','63 collage photos and inline video preserved']},null,2));
  console.log('Chef-menu checks passed');
} catch(error) {
  await writeFile(path.join(out,'report.json'),JSON.stringify({passed:false,results,errors,error:error.stack},null,2));
  throw error;
} finally {await browser.close();}
