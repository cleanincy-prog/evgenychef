// Optional browser regression: use the same PLAYWRIGHT_MODULE/PW_EXECUTABLE as check-browser.mjs.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await pw.chromium.launch({ headless:true, ...(process.env.PW_EXECUTABLE ? {executablePath:process.env.PW_EXECUTABLE} : {}) });
const origin = process.env.BASE_URL || 'http://127.0.0.1:5440';
const output = path.resolve(process.env.QA_OUTPUT || 'output/counter-qa');
await mkdir(output, {recursive:true});
const results=[];
async function record(name, fn) {
  try { const details=await fn(); results.push({name,status:'passed',details}); console.log(`PASS ${name}`); }
  catch(error) { results.push({name,status:'failed',error:error.stack}); console.error(`FAIL ${name}: ${error.message}`); }
  await writeFile(path.join(output,'results.json'),JSON.stringify(results,null,2));
}
async function scroll(page, selector) {
  await page.evaluate(selector=>{
    const main=document.querySelector('#main');
    main.scrollTo({top:main.scrollTop+document.querySelector(selector).getBoundingClientRect().top,behavior:'instant'});
  },selector);
}
const values = page => page.locator('[data-count]').evaluateAll(els=>els.map(el=>Number(el.textContent)));
async function midway(page) {
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-count]')].every(el=>{
    const rect=el.getBoundingClientRect(),opacity=Number(getComputedStyle(el.closest('[data-reveal]')).opacity);
    return Number(el.textContent)>0&&Number(el.textContent)<Number(el.dataset.count)&&rect.top>47&&rect.bottom<=innerHeight&&opacity>.9;
  }));
  return values(page);
}
async function final(page) { await page.waitForFunction(()=>[...document.querySelectorAll('[data-count]')].map(el=>el.textContent).join(',')==='25,20'); }
async function makePage(options={}) {
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,...options});
  page.setDefaultTimeout(10000);
  page.qaErrors=[];page.on('pageerror',error=>page.qaErrors.push(error.message));
  return page;
}
async function ready(page, language='ru') {
  await page.goto(origin+(language==='en'?'/en/':'/'),{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  if(!await page.evaluate(()=>document.hidden)) await page.waitForFunction(()=>document.querySelector('.hero').dataset.heroIntro==='complete');
}
try {
  for(const language of ['ru','en']) for(const [width,height] of [[1440,900],[1280,720],[1024,768],[768,1024],[430,932],[390,844],[375,667]]) await record(`${language} ${width}: first and repeat`,async()=>{
    const page=await makePage({viewport:{width,height},isMobile:width<1024,hasTouch:width<1024});
    try {
      await ready(page,language);
      assert.deepEqual(await values(page),[25,20]);
      assert.equal(await page.locator('.bio-note').count(),0);
      await scroll(page,'#about');
      const first=await midway(page);
      await page.screenshot({path:path.join(output,`counting-${language}-${width}.png`)});
      await final(page);
      await page.screenshot({path:path.join(output,`about-${language}-${width}.png`)});
      const geometry=await page.locator('#about').evaluate(el=>({overflow:document.querySelector('#main').scrollWidth>innerWidth+1,cards:[...el.querySelectorAll('.numbers-grid > div')].map(card=>{const r=card.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom};})}));
      assert(!geometry.overflow);assert(geometry.cards.every(r=>r.left>=0&&r.right<=width+1&&r.top>=47&&r.bottom<=height+1),JSON.stringify(geometry));
      await page.dispatchEvent('#main','scroll');await page.waitForTimeout(200);
      assert.deepEqual(await values(page),[25,20],'same visible visit must not restart');
      await scroll(page,'#services');await page.waitForTimeout(200);
      await scroll(page,'#about');const repeat=await midway(page);await final(page);
      assert.deepEqual(page.qaErrors,[]);
      return {first,repeat,final:await values(page),geometry};
    }finally{await page.close();}
  });
  for(const mode of ['hidden-open','background-return','page-cache','observer-delayed','reduced-motion','no-javascript']) await record(mode,async()=>{
    const page=await makePage({reducedMotion:mode==='reduced-motion'?'reduce':'no-preference',javaScriptEnabled:mode!=='no-javascript'});
    try {
      if(['hidden-open','background-return'].includes(mode))await page.addInitScript(hidden=>{
        window.qaHidden=hidden;Object.defineProperty(document,'hidden',{get:()=>window.qaHidden});
      },mode==='hidden-open');
      if(mode==='observer-delayed')await page.addInitScript(()=>{window.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};});
      if(mode==='no-javascript'){
        await page.goto(origin,{waitUntil:'domcontentloaded'});
        assert.deepEqual(await values(page),[25,20]);return {final:await values(page)};
      }
      await ready(page);await scroll(page,'#about');
      let first;
      if(mode==='hidden-open'){
        await page.waitForTimeout(1900);assert.deepEqual(await values(page),[25,20]);
        assert(await page.locator('[data-count]').evaluateAll(els=>els.every(el=>!el.dataset.counted)),'hidden count must not be consumed');
        await page.evaluate(()=>{window.qaHidden=false;document.dispatchEvent(new Event('visibilitychange'));});
      }else if(mode==='background-return'){
        first=await midway(page);
        await page.evaluate(()=>{window.qaHidden=true;document.dispatchEvent(new Event('visibilitychange'));});
        await page.waitForTimeout(1900);assert.deepEqual(await values(page),[25,20]);
        await page.evaluate(()=>{window.qaHidden=false;document.dispatchEvent(new Event('visibilitychange'));});
      }else if(mode==='page-cache'){
        first=await midway(page);
        await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
        await page.waitForTimeout(1900);assert.deepEqual(await values(page),[25,20]);
        await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
      }else if(mode==='reduced-motion'){
        await page.waitForTimeout(400);assert.deepEqual(await values(page),[25,20]);return {final:await values(page)};
      }
      const resumed=await midway(page);await final(page);assert.deepEqual(page.qaErrors,[]);
      return {first,resumed,final:await values(page)};
    }finally{await page.close();}
  });
}finally{await browser.close();}
if(results.some(result=>result.status==='failed'))process.exitCode=1;
