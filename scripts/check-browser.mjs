// Optional development QA: PLAYWRIGHT_MODULE may point at an installed Playwright.
// BASE_URL=http://127.0.0.1:5432 QA_OUTPUT=/absolute/output ENGINE=chromium node scripts/check-browser.mjs
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.ENGINE || 'chromium';
const origin = process.env.BASE_URL || 'http://127.0.0.1:5432';
const output = path.resolve(process.env.QA_OUTPUT || 'output/browser-qa');
await mkdir(output, { recursive: true });
const browser = await pw[engine].launch({headless:true, ...(process.env.PW_EXECUTABLE ? {executablePath:process.env.PW_EXECUTABLE} : {})});
console.log(`Browser ready: ${engine} ${browser.version()}`);
const results = [];
const failures = [];
async function record(name, action) {
  try { const details = await action(); results.push({name,status:'passed',details}); console.log(`PASS ${name}`); }
  catch (error) { failures.push(name); results.push({name,status:'failed',error:error.stack}); console.error(`FAIL ${name}: ${error.message}`); }
  await writeFile(path.join(output,`${engine}.json`),JSON.stringify({engine,version:browser.version(),results},null,2));
}
async function createPage(width,height,extra={}) {
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,hasTouch:width<1024,...(engine!=='firefox'?{isMobile:width<1024}:{}),...extra});
  page.setDefaultTimeout(12000);
  page.setDefaultNavigationTimeout(20000);
  page.qaErrors=[];
  page.on('pageerror',e=>page.qaErrors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)page.qaErrors.push(`${r.status()} ${r.url()}`);});
  return page;
}
async function ready(page,hash='') {
  await page.goto(origin+'/'+hash,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.querySelector('.hero').dataset.heroIntro==='complete');
}
async function scrollTo(page,selector,end=false) {
  await page.evaluate(({selector,end})=>{
    const el=document.querySelector(selector),main=document.querySelector('#main');
    const story=!!el.closest('.dinner-story');
    document.documentElement.classList.toggle('is-story-reading',story);
    main.scrollTo({top:main.scrollTop+(end?el.getBoundingClientRect().bottom-main.clientHeight:el.getBoundingClientRect().top-(story?parseFloat(getComputedStyle(el).scrollMarginTop):0)),behavior:'instant'});
  },{selector,end});
  await page.waitForTimeout(140);
}
async function geometry(page) {
  return page.evaluate(()=>{
    const main=document.querySelector('#main');
    const clipped=[];
    for(const el of main.querySelectorAll('h1,h2,h3,h4,p,figcaption,dt,dd,.button,[data-film-play],[data-film-sound],.story-contact')) {
      if(el.closest('.sr-only,[aria-hidden="true"]')||!el.getClientRects().length)continue;
      const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)continue;
      for(let parent=el.parentElement;parent&&parent!==main;parent=parent.parentElement){
        const css=getComputedStyle(parent),clip=parent.getBoundingClientRect();
        if(css.display==='contents')continue;
        if(/hidden|clip/.test(css.overflowY)&&(rect.top<clip.top-2||rect.bottom>clip.bottom+2))clipped.push({element:el.className||el.tagName,parent:parent.className,axis:'y'});
        if(/hidden|clip/.test(css.overflowX)&&(rect.left<clip.left-2||rect.right>clip.right+2))clipped.push({element:el.className||el.tagName,parent:parent.className,axis:'x'});
      }
    }
    return {height:main.clientHeight,visibleHeight:visualViewport?.height||innerHeight,width:main.clientWidth,scrollWidth:main.scrollWidth,clipped,storyWidth:document.querySelector('.story-scenes').clientWidth,storyFont:parseFloat(getComputedStyle(document.querySelector('.story-copy h3')).fontSize)};
  });
}
const sizes=engine==='chromium'?[[320,480],[360,640],[375,667],[390,844],[430,932],[768,1024],[1024,768],[1280,720],[1440,900],[844,390],[667,375]]:[[375,667],[390,844],[1440,900]];
try {
  if(!process.env.QA_ONLY || process.env.QA_ONLY==='layout') for(const [width,height] of sizes) await record(`layout ${width}x${height}`,async()=>{
    const page=await createPage(width,height,{reducedMotion:'reduce'});
    try {
      await ready(page);
      const before=await geometry(page);
      assert(Math.abs(before.height-before.visibleHeight)<2,JSON.stringify(before));
      assert(before.scrollWidth<=before.width+1,'horizontal overflow');
      assert(before.storyWidth<=760,'story CSS failed to parse');
      assert(before.storyFont>=35,'story typography fallback missing');
      assert.deepEqual(before.clipped,[],'clipped content');
      const sections=['.hero','#about','.sq-intro','#format-dinner','#format-events','#format-masterclass','#letter-conversation','#letter-menu','#ingredients','#menu','#letter-preparation','#letter-evening','#contact'];
      for(const selector of sections){
        await scrollTo(page,selector);
        await page.locator(selector).evaluate(el=>Promise.allSettled([...el.querySelectorAll('img')].map(img=>img.decode())));
        if(['.hero','#about','#format-dinner','#ingredients','#menu','#letter-preparation','#contact'].includes(selector))await page.screenshot({path:path.join(output,`${engine}-${width}x${height}-${selector.replace(/[.#]/g,'')}.png`),timeout:15000});
        const metrics=await page.locator(selector).evaluate(el=>({height:el.clientHeight,buttons:[...el.querySelectorAll('.button')].map(b=>{const r=b.getBoundingClientRect();return {top:r.top,bottom:r.bottom}})}));
        if(metrics.height<=height+1) assert(metrics.buttons.every(b=>b.top>=0&&b.bottom<=height+1),`${selector}: buttons outside viewport`);
      }
      // The end of long chapters must stay reachable with section snapping disabled.
      await scrollTo(page,'#ingredients',true);
      assert(Math.abs(await page.locator('#ingredients').evaluate(el=>el.getBoundingClientRect().bottom)-height)<2,'long chapter end unreachable');
      assert.deepEqual(page.qaErrors,[]);
      return before;
    } finally {await page.close();}
  });
  if(!process.env.QA_ONLY || process.env.QA_ONLY==='interactions') await record('menu, formats, dialog, history and video',async()=>{
    const page=await createPage(390,844);
    try {
      await ready(page);
      await page.locator('.menu-toggle').click();
      await page.locator('#mobile-menu > button').click();
      await page.locator('#mobile-formats a[href="#format-dinner"]').click();
      await page.waitForFunction(()=>Math.abs(document.querySelector('#format-dinner').getBoundingClientRect().top)<2);
      await page.locator('[data-dialog="details-dinner"]').click();
      await page.waitForTimeout(650);
      const dialog=page.locator('#details-dinner');
      assert(await dialog.evaluate(d=>d.open));
      assert(await dialog.evaluate(d=>d.getBoundingClientRect().bottom<=visualViewport.height+1));
      await page.keyboard.press('Escape');
      await page.waitForFunction(()=>!document.querySelector('dialog[open]'));
      assert(await page.locator('#main').evaluate(el=>!el.inert));
      for(const i of [1,2,0]) {
        await page.locator(`[data-service-jump="${i}"]`).click();
        await page.waitForFunction(index=>document.querySelectorAll('.sq-panel')[index].getBoundingClientRect().top<2,i);
        await page.waitForTimeout(550);
      }
      await page.locator('.menu-toggle').click();
      await page.locator('#mobile-menu a[href="#menu"]').click();
      await page.waitForFunction(()=>location.hash==='#menu'&&!document.documentElement.classList.contains('menu-open'));
      await page.waitForTimeout(700);
      await page.goBack();
      await page.waitForFunction(()=>location.hash==='#format-dinner');
      await scrollTo(page,'#letter-preparation',true);
      assert.equal(await page.locator('[data-film-play]').count(),0,'preparation Play button should be absent');
      await page.waitForFunction(()=>!document.querySelector('[data-letter-video]').paused||!!document.querySelector('[data-film-status]').textContent);
      const media=await page.locator('[data-letter-video]').evaluate(v=>({playing:!v.paused,inline:v.hasAttribute('playsinline'),muted:v.muted,controls:v.controls,loop:v.loop,error:v.error?.code||null}));
      assert(media.inline); assert(media.playing,'video did not start: '+JSON.stringify(media));
      assert(!media.muted,'audio should start after the menu interaction');
      assert(!media.controls); assert(media.loop);
      await page.locator('[data-film-sound]').click();
      assert(await page.locator('[data-letter-video]').evaluate(v=>v.muted));
      await scrollTo(page,'#contact');
      await page.waitForFunction(()=>document.querySelector('[data-letter-video]').paused);
      assert.deepEqual(page.qaErrors,[]);
      return media;
    }finally{await page.close();}
  });
  if(engine==='chromium'&&(!process.env.QA_ONLY||process.env.QA_ONLY==='fallbacks')) for(const mode of ['webview','safe-area','legacy-css','legacy-dialog','autoplay-blocked','no-javascript']) await record(mode,async()=>{
    const page=await createPage(390,744,{reducedMotion:mode==='autoplay-blocked'?'no-preference':'reduce',javaScriptEnabled:mode!=='no-javascript'});
    try {
      if(mode==='webview')await page.addInitScript(()=>{
        window.qaViewport={height:648,scale:1};
        Object.defineProperty(visualViewport,'height',{get:()=>window.qaViewport.height});
        Object.defineProperty(visualViewport,'scale',{get:()=>window.qaViewport.scale});
      });
      if(mode==='legacy-dialog')await page.addInitScript(()=>{HTMLDialogElement.prototype.showModal=undefined;CanvasRenderingContext2D.prototype.roundRect=undefined;});
      if(mode==='autoplay-blocked')await page.addInitScript(()=>{
        const play=HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play=function(){return this.matches('[data-hero-video]')?Promise.reject(new DOMException('Autoplay blocked','NotAllowedError')):play.call(this);};
      });
      if(['safe-area','legacy-css'].includes(mode))await page.route('**/*.css',async route=>{
        const response=await route.fetch();let css=await response.text();
        if(mode==='legacy-css')css=css.replace(/\b(\d*\.?\d+)(?:dvh|svh|lvh|cqw)\b/g,'$1unsupported').replaceAll('container-type: inline-size','unsupported-container: inline-size').replaceAll('@container','@unsupported-container');
        else css=css.replace(/env\(safe-area-inset-top(?:,\s*0px)?\)/g,'47px').replace(/env\(safe-area-inset-bottom(?:,\s*0px)?\)/g,'34px');
        await route.fulfill({response,body:css});
      });
      if(mode==='no-javascript'){
        await page.goto(origin,{waitUntil:'load'});
        const state=await page.evaluate(()=>({height:document.scrollingElement.scrollHeight,heroOpacity:getComputedStyle(document.querySelector('.hero-identity')).opacity,headings:[...document.querySelectorAll('.story-copy h3')].every(el=>getComputedStyle(el).opacity==='1')}));
        assert(state.height>744);assert.equal(state.heroOpacity,'1');assert(state.headings);return state;
      }
      await ready(page);
      const metrics=await geometry(page);
      assert(Math.abs(metrics.height-metrics.visibleHeight)<2,JSON.stringify(metrics));
      assert(metrics.scrollWidth<=metrics.width+1);
      assert(metrics.storyFont>=35);
      if(mode==='webview'){
        for(const height of [560,710,648]){
          await page.evaluate(h=>{qaViewport.height=h;visualViewport.dispatchEvent(new Event('resize'));},height);
          await page.waitForFunction(h=>document.querySelector('#main').clientHeight===h,height);
        }
        await page.evaluate(()=>{qaViewport.height=324;qaViewport.scale=2;visualViewport.dispatchEvent(new Event('resize'));});
        await page.waitForTimeout(100);
        assert.equal(await page.locator('#main').evaluate(el=>el.clientHeight),648,'pinch zoom resized layout');
        await page.evaluate(()=>{qaViewport.height=648;qaViewport.scale=1;visualViewport.dispatchEvent(new Event('resize'));});
      }
      if(mode==='safe-area'){
        const box=await page.locator('.menu-toggle').boundingBox();assert(box.y>=47&&box.width>=44&&box.height>=44);
        const gap=await page.evaluate(()=>document.querySelector('.hero-portrait').getBoundingClientRect().top-document.querySelector('.hero-actions').getBoundingClientRect().bottom);
        assert(gap>=12,'safe area causes hero overlap');
      }
      if(mode==='legacy-css'){
        assert.equal(metrics.storyFont,50.24);
        await scrollTo(page,'#menu');
        assert.equal(await page.locator('.story-taste-diagram').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),2);
      }
      if(['legacy-dialog','webview'].includes(mode)){
        await scrollTo(page,'#format-dinner');
        await page.locator('[data-dialog="details-dinner"]').click();
        assert(await page.locator('dialog[open]').evaluate(d=>d.getBoundingClientRect().bottom<=visualViewport.height+1));
        await page.keyboard.press('Escape');
        await page.waitForFunction(()=>!document.querySelector('dialog[open]'));
        assert(await page.locator('#main').evaluate(el=>!el.inert));
      }
      if(mode==='autoplay-blocked'){
        assert(await page.locator('[data-hero-video]').evaluate(v=>v.paused));
        assert(await page.locator('.hero-video-toggle').isVisible());
        assert(await page.locator('.collage-tile--video img').evaluate(img=>img.naturalWidth>0));
      }
      await page.screenshot({path:path.join(output,`${engine}-${mode}.png`)});
      assert.deepEqual(page.qaErrors,[]);return metrics;
    }finally{await page.close();}
  });
} finally {await browser.close();}
if(failures.length)throw new Error(`Failed: ${failures.join(', ')}`);
