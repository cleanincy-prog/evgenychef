import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const out = 'artifacts/menu-photographic-2026-09-14';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = [];
const errors = [];
async function settle(page) {
  await page.locator('.menu-worktable').scrollIntoViewIfNeeded();
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.querySelectorAll('.menu-worktable img')) { img.loading = 'eager'; await img.decode(); }
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:3004/');
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: 1100 });
    await settle(page);
    const value = await page.evaluate(() => {
      const rect = element => { const r = element.getBoundingClientRect(); return { left:r.left,top:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY,width:r.width,height:r.height }; };
      const scene = rect(document.querySelector('.menu-worktable'));
      const description = rect(document.querySelector('.notebook-description'));
      const photos = rect(document.querySelector('.notebook-photographs'));
      const background = rect(document.querySelector('.menu-worktable-picture'));
      const route = document.querySelector('.plan-route'), routeBox = rect(route);
      const blocked = [scene, ...[...document.querySelectorAll('.station-copy,.conversation-illustration,.preparation-film')].map(rect)];
      let intersections = 0;
      for (const line of route.querySelectorAll('path')) for (let p = 0; p < line.getTotalLength(); p += 4) {
        const point = line.getPointAtLength(p), x=point.x+routeBox.left, y=point.y+routeBox.top;
        if (blocked.some(b => x>b.left+3 && x<b.right-3 && y>b.top+3 && y<b.bottom-3)) intersections++;
      }
      return { width:innerWidth, overflow:document.documentElement.scrollWidth>innerWidth, scene, description, photos, background, intersections,
        paper:getComputedStyle(document.querySelector('.menu-worktable')).backgroundColor,
        bodyFont:getComputedStyle(document.querySelector('.notebook-introduction')).fontFamily,
        captionTextSize:parseFloat(getComputedStyle(document.querySelector('.menu-worktable-caption p')).fontSize),
        pageLetteringSize:parseFloat(getComputedStyle(document.querySelector('.notebook-introduction')).fontSize),
        detachedDish:document.querySelectorAll('.notebook-mobile-dish').length,
        expandableViews:document.querySelectorAll('.menu-worktable dialog,.menu-worktable details,.menu-worktable [aria-expanded]').length,
        labels:[...document.querySelectorAll('.notebook-ingredient-list li')].map(e=>e.textContent),
        images:[...document.querySelectorAll('.notebook-ingredient img')].map(e=>({alt:e.alt,loaded:e.complete&&e.naturalWidth>0})),
        textOverflow:[...document.querySelectorAll('.notebook-description p,.notebook-ingredient-list li,.notebook-ingredient figcaption')].some(e=>e.scrollWidth>e.clientWidth+1)
      };
    });
    assert.equal(value.overflow, false, `${width}: page overflow`);
    assert.equal(value.textOverflow, false, `${width}: text overflow`);
    assert.equal(value.intersections, 0, `${width}: process arrows cross content`);
    assert.equal(value.images.length, 6);
    assert.ok(value.images.every(img => img.loaded));
    assert.deepEqual(value.images.map(img => img.alt), value.labels);
    assert.equal(value.paper, 'rgb(244, 239, 229)');
    assert.ok(value.captionTextSize >= 16);
    assert.equal(value.detachedDish, 0, `${width}: the bowl must remain in the same frame`);
    assert.equal(value.expandableViews, 0, `${width}: the user excluded expanding the notebook`);
    assert.ok(value.background.height > 0, `${width}: the full scene must always be visible`);
    assert.ok(Math.abs(value.background.width / value.background.height - 1440 / 1120) < .005, `${width}: preserve the complete composition`);
    assert.ok(value.scene.left >= 0 && value.scene.right <= width, `${width}: the entire block must fit the screen`);
    assert.ok(value.description.bottom < value.background.top + value.background.height * .88, `${width}: text must stay on the left page`);
    assert.ok(value.photos.left > value.description.right, `${width}: photographs must remain on the right page, never below`);
    assert.ok(value.photos.bottom < value.background.top + value.background.height * .62, `${width}: photos clear the bowl`);
    results.push(value);
    await page.locator('.menu-worktable').screenshot({ path:`${out}/menu-${width}.png` });
    await page.locator('.evening-plan').screenshot({ path:`${out}/process-${width}.png` });
    console.log(`${width}px passed`);
  }
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 1200 });
    await page.evaluate(() => document.documentElement.style.fontSize='200%');
    await settle(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth>innerWidth), false);
    assert.equal(await page.locator('.notebook-description').evaluate(e=>e.scrollWidth>e.clientWidth+1), false);
    assert.ok(await page.locator('.menu-worktable-caption p').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=32));
    await page.locator('.menu-worktable').screenshot({ path:`${out}/text-200-${width}.png` });
    await page.evaluate(() => document.documentElement.style.fontSize='');
  }
  const nojs = await browser.newPage({ viewport:{width:390,height:844}, javaScriptEnabled:false });
  await nojs.goto('http://127.0.0.1:3004/');
  await nojs.locator('.menu-worktable').scrollIntoViewIfNeeded();
  assert.equal(await nojs.locator('.notebook-ingredient img').count(),6);
  await nojs.locator('.menu-worktable').screenshot({path:`${out}/no-js-390.png`});
  assert.ok(await nojs.locator('.notebook-ingredient img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)));
  const failed = await browser.newPage({ viewport:{width:390,height:844} });
  let abort = true;
  await failed.route('**/photo-notebook-*.webp*', route => abort ? route.abort() : route.continue());
  await failed.goto('http://127.0.0.1:3004/');
  await failed.locator('.menu-worktable').scrollIntoViewIfNeeded();
  const retry = failed.getByRole('button',{name:'Попробовать ещё раз'});
  await retry.waitFor(); await retry.focus();
  assert.equal(await retry.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  assert.ok((await retry.boundingBox()).height>=44);
  await failed.locator('.menu-worktable').screenshot({path:`${out}/error-390.png`});
  abort=false; await failed.keyboard.press('Enter'); await settle(failed);
  await failed.waitForFunction(()=>document.querySelector('.menu-worktable').dataset.ready==='true');
  assert.equal(await failed.locator('.menu-worktable-error').count(),0);
  assert.equal(await page.locator('.menu-worktable').evaluate(e=>e.getAnimations({subtree:true}).length),0);
  assert.deepEqual(errors,[]);
  await writeFile(`${out}/report.json`, JSON.stringify({passed:true,results,errors,checks:['one complete frame on seven widths','both pages and bowl in the same scene','no expansion or horizontal scrolling','route clearance','full-size caption at 200% text','no JavaScript','failed assets and keyboard retry','no animation']},null,2));
} catch(error) {
  await writeFile(`${out}/report.json`,JSON.stringify({passed:false,results,errors,error:error.stack},null,2));
  throw error;
} finally { await browser.close(); }
