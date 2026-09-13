import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const reports=[];
await mkdir('artifacts/typography-roles-2026-09-13', { recursive: true });
try {
 for(const [name,width,js,delay] of [['cold-desktop',1440,true,0],['cold-mobile',375,true,0],['slow-fonts',375,true,1200],['no-js',375,false,0]]){
  const context=await browser.newContext({viewport:{width,height:width===375?812:900},reducedMotion:'reduce',javaScriptEnabled:js});
  const page=await context.newPage();
  if(delay) await page.route('**/fonts/*.woff2',async route=>{await new Promise(r=>setTimeout(r,delay));await route.continue()});
  if(js) await page.addInitScript(()=>{
    window.typeFrames=[];
    function tick(t){const h=document.querySelector('h1');if(h){const s=getComputedStyle(h);if(s.fontFamily.includes('Spectral')){const b=h.getBoundingClientRect();window.typeFrames.push({time:t,loaded:document.fonts.check('400 29px Spectral','Евгений')&&document.fonts.check('italic 400 29px Spectral','ваш личный'),width:b.width,height:b.height});}}if(t<6000)requestAnimationFrame(tick)}requestAnimationFrame(tick);
  });
  for(const navigation of ['cold','reload']){
   if(navigation==='cold') await page.goto('http://127.0.0.1:3004/',{waitUntil:'networkidle'}); else await page.reload({waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   const record=await page.evaluate(()=>({frames:window.typeFrames||[],paint:performance.getEntriesByType('paint').map(p=>({name:p.name,time:p.startTime})),resources:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='css'||r.name.endsWith('.woff2')).map(r=>({url:r.name,start:r.startTime,end:r.responseEnd,duration:r.duration})),h1:getComputedStyle(document.querySelector('h1')).fontFamily,body:getComputedStyle(document.body).fontFamily,width:document.documentElement.scrollWidth}));
   record.name=name;record.navigation=navigation;
   assert.ok(record.h1.includes('Spectral')&&record.body.includes('Golos Text'));assert.ok(record.width<=width);
   if(js){const fcp=record.paint.find(p=>p.name==='first-contentful-paint')?.time||0;const frames=record.frames.filter(f=>f.time>=fcp);const firstLoaded=frames.find(f=>f.loaded);record.fallbackMs=firstLoaded?Math.max(0,firstLoaded.time-fcp):null;const settled=frames.filter(f=>firstLoaded&&f.time>=firstLoaded.time);assert.ok(settled.length&&settled.every(f=>f.loaded));assert.equal(new Set(settled.map(f=>`${f.width}/${f.height}`)).size,1,'No subsequent heading shift after font loads');}
   await page.screenshot({path:`artifacts/typography-roles-2026-09-13/${name}-${navigation}.png`});reports.push(record);
  }
  await context.close();
 }
}finally{await browser.close();await writeFile('artifacts/typography-roles-2026-09-13/loading-report.json',JSON.stringify(reports,null,2));}
console.log(reports.map(r=>({name:r.name,navigation:r.navigation,fallbackMs:r.fallbackMs})));
