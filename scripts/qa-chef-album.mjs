import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = 'artifacts/chef-album-2026-09-18';
const reference = await readFile('design/references/chef-album-approved-2026-09-18.html', 'utf8');
const expectedCopy = [...reference.matchAll(/<p(?: class="chef-lead")?>([^<]+)<\/p>/g)].map(match => match[1]);
const widths = [1440, 1280, 1024, 768, 430, 390, 375];
const cases = [...widths.map(width => ({ width })), { width: 320 }, ...[1440, 768, 375].map(width => ({ width, enlarged: true })), { width: 390, noJs: true }];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { cases: [], failures: [] };
try {
  for (const test of cases) {
    const page = await browser.newPage({ viewport: { width: test.width, height: 900 }, deviceScaleFactor: 1, javaScriptEnabled: !test.noJs, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const record = { ...test };
    report.cases.push(record);
    try {
      await page.goto('http://127.0.0.1:3004/#formats', { waitUntil: 'networkidle' });
      if (test.enlarged) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
      for (const image of await page.locator('.format-image img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async element => { await element.decode(); });
      }
      await page.evaluate(() => document.fonts.ready);
      record.layout = await page.evaluate(() => {
        const rect = element => {
          const r = element.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
        };
        return {
          viewport: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          paragraphs: [...document.querySelectorAll('.format-caption p')].map(element => element.textContent),
          items: [...document.querySelectorAll('.fmt')].map(item => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.format-caption');
            const heading = item.querySelector('h3');
            return {
              item: rect(item), image: rect(img), caption: rect(caption), heading: rect(heading),
              title: heading.textContent, titleFont: getComputedStyle(heading).fontFamily, titleSize: getComputedStyle(heading).fontSize,
              captionFont: getComputedStyle(caption.querySelector('p')).fontFamily,
              overflow: [...caption.querySelectorAll('h3,p')].some(el => el.scrollWidth > el.clientWidth + 1),
              loaded: img.complete && img.naturalWidth > 0, currentSrc: img.currentSrc,
              fit: getComputedStyle(img).objectFit,
            };
          }),
          heroCollage: document.querySelectorAll('.collage-tile img').length,
          videoControls: document.querySelector('video').controls,
          conversationSrc: document.querySelector('.conversation-illustration img').getAttribute('src'),
        };
      });
      assert.deepEqual(record.layout.paragraphs, expectedCopy, 'Preserve every word of the chosen three descriptions');
      assert.equal(record.layout.items.length, 3);
      assert.ok(record.layout.documentWidth <= test.width, 'No horizontal document overflow');
      for (const item of record.layout.items) {
        assert.ok(item.loaded, `Photo must decode: ${item.title}`);
        assert.equal(item.fit, 'contain', 'The complete photo must remain visible');
        assert.ok(!item.overflow, `No clipped heading or description: ${item.title}`);
        assert.ok(item.caption.x >= 0 && item.caption.right <= test.width + 1, `Note stays in viewport: ${item.title}`);
        assert.ok(item.image.x >= 0 && item.image.right <= test.width + 1, `Photo stays in viewport: ${item.title}`);
        assert.match(item.titleFont, /Oranienbaum/);
        assert.match(item.captionFont, /Ysabeau Office/);
      }
      assert.equal(record.layout.heroCollage, 63);
      assert.equal(record.layout.videoControls, false);
      assert.match(record.layout.conversationSrc, /conversation-guest-2026-09-18/);
      assert.deepEqual(errors, []);
      record.passed = true;
    } catch (error) {
      record.error = error.message;
      report.failures.push({ ...test, error: error.message });
    }
    const suffix = `${test.width}${test.enlarged ? '-200' : ''}${test.noJs ? '-nojs' : ''}`;
    await page.locator('.formats').screenshot({ path: `${output}/formats-${suffix}.png`, animations: 'disabled' });
    if ([1440,390].includes(test.width) && !test.enlarged && !test.noJs) {
      await page.screenshot({ path: `${output}/page-${test.width}.png`, fullPage: true, animations: 'disabled' });
    }
    console.log(JSON.stringify({ ...test, passed: !!record.passed, error: record.error }));
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, reducedMotion: 'reduce' });
  await page.route('**/media/web/private-dinner-wide-v2-*', route => route.abort());
  await page.goto('http://127.0.0.1:3004/#formats', { waitUntil: 'networkidle' });
  await page.locator('.format-private-dinner').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('.format-caption p').count(), 6, 'Descriptions remain available if a photograph fails');
  await page.locator('.instagram-button').focus();
  assert.equal(await page.locator('.instagram-button').evaluate(element => element === document.activeElement), true);
  assert.equal(await page.locator('.instagram-button').getAttribute('href'), 'https://www.instagram.com/evg.chef/');
  report.imageErrorAndContact = 'passed';
  await page.close();
} finally {
  await browser.close();
  report.passed = report.failures.length === 0;
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ passed: report.passed, failures: report.failures }));
if (!report.passed) process.exitCode = 1;
