import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = 'artifacts/format-cleanup-2026-09-15';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { cases: [], failures: [] };
const cases = [1440, 1280, 1024, 768, 430, 390, 375].map(width => ({ width, dpr: 1 }));
cases.push(...[430, 390, 375].map(width => ({ width, dpr: 3 })), { width: 375, dpr: 2 }, { width: 375, dpr: 1, noJs: true }, { width: 375, dpr: 1, enlarged: true }, { width: 1440, dpr: 1, enlarged: true });
try {
 for (const test of cases) {
  const page = await browser.newPage({ viewport: { width: test.width, height: 900 }, deviceScaleFactor: test.dpr, javaScriptEnabled: !test.noJs, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const record = { ...test };
  report.cases.push(record);
  try {
   await page.goto('http://127.0.0.1:3004/#formats', { waitUntil: 'networkidle' });
   if (test.enlarged) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
   await page.locator('.format-masterclasses').scrollIntoViewIfNeeded();
   await page.locator('.format-masterclasses img').evaluate(async image => { await image.decode(); });
   const data = record.result = await page.evaluate(() => {
    const image = document.querySelector('.format-masterclasses img');
    const bounds = image.getBoundingClientRect();
    return {
     text: document.body.innerText,
     faq: !!document.querySelector('#faq, .faq'),
     image: { src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0, width: image.naturalWidth, height: image.naturalHeight, x: bounds.x, right: bounds.right, fit: getComputedStyle(image).objectFit },
     specFields: [...document.querySelectorAll('.fmt-spec')].map(el => el.children.length),
     documentWidth: document.documentElement.scrollWidth,
     smallDisplay: [...document.querySelectorAll('*')].filter(el => { const s=getComputedStyle(el); return s.fontFamily.includes('Oranienbaum') && parseFloat(s.fontSize) < 19; }).length,
    };
   });
   assert.equal(data.faq, false);
   assert.doesNotMatch(data.text, /Частые вопросы|стоимость|€|число гостей|количество гостей|состав группы|сколько будет гостей|\d+[–-]\d+ гостей/i);
   assert.deepEqual(data.specFields, [2, 2, 2]);
   assert.ok(data.image.loaded && data.image.src.endsWith('.jpg'));
   assert.equal(data.image.fit, 'contain');
   assert.ok(data.image.x >= 0 && data.image.right <= test.width);
   assert.ok(data.documentWidth <= test.width);
   assert.equal(data.smallDisplay, 0);
   const response = await page.request.get(data.image.src);
   assert.equal(response.status(), 200);
   assert.match(response.headers()['content-type'], /^image\/jpeg/);
   record.imageContentType = response.headers()['content-type'];
   assert.deepEqual(errors, []);
   delete data.text;
   if (test.dpr === 1 && !test.noJs) await page.locator('.formats').screenshot({ path: `${output}/formats-${test.width}${test.enlarged ? '-200' : ''}.png`, animations: 'disabled' });
   if (test.width === 390 && test.dpr === 3) await page.locator('.format-masterclasses').screenshot({ path: `${output}/masterclasses-mobile-3x.png` });
   record.passed = true;
   console.log(JSON.stringify({ ...test, passed: true, image: data.image.src }));
  } catch (e) { record.error=e.message; report.failures.push({ ...test, error:e.message }); }
  await page.close();
 }
} finally {
 await browser.close();
 report.passed = !report.failures.length;
 await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2)+'\n');
}
console.log(JSON.stringify({ passed: report.passed, failures: report.failures }));
if (!report.passed) process.exitCode = 1;
