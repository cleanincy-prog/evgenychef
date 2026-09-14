import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.HERO_QA_URL || 'http://127.0.0.1:3005/';
const output = process.env.HERO_QA_OUTPUT || 'artifacts/hero-loading-2026-09-15';
const filter = process.env.HERO_QA_CASE;
await mkdir(output, { recursive: true });
const cases = [1440, 1280, 1024, 768, 430, 390, 375].map(width => ({ name: `width-${width}`, width, reload: true }));
cases.push(
  { name: 'slow-css-mobile', width: 375, cssDelay: 3500 },
  { name: 'slow-css-desktop', width: 1440, cssDelay: 3500 },
  { name: 'slow-fonts-mobile', width: 375, fontDelay: 3500 },
  { name: 'slow-images-mobile', width: 375, imageDelay: 1800 },
  { name: 'slow-images-desktop', width: 1440, imageDelay: 1800 },
  { name: 'failed-images-mobile', width: 375, failedImages: true, reload: true },
  { name: 'no-js-mobile', width: 375, noJs: true },
  { name: 'no-js-desktop', width: 1440, noJs: true },
  { name: 'text-200-mobile', width: 375, enlarged: true },
  { name: 'text-200-desktop', width: 1440, enlarged: true },
  { name: 'retina-mobile', width: 390, dpr: 3 },
);
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { base, cases: [], failures: [] };
try {
  for (const test of cases.filter(test => !filter || test.name.includes(filter))) {
    const context = await browser.newContext({ viewport: { width: test.width, height: test.width < 621 ? 812 : 900 }, deviceScaleFactor: test.dpr || 1, javaScriptEnabled: !test.noJs, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    if (test.cssDelay || test.enlarged) await page.route('**/*.css', async route => {
      if (test.cssDelay) await new Promise(resolve => setTimeout(resolve, test.cssDelay));
      if (test.enlarged) {
        const response = await route.fetch();
        await route.fulfill({ response, body: `${await response.text()}\nhtml { font-size: 200%; }` });
      } else await route.continue();
    });
    if (test.fontDelay) await page.route('**/*.woff2', async route => {
      await new Promise(resolve => setTimeout(resolve, test.fontDelay));
      await route.continue();
    });
    if (test.imageDelay || test.failedImages) await page.route('**/media/web/*', async route => {
      if (test.failedImages) await route.abort();
      else { await new Promise(resolve => setTimeout(resolve, test.imageDelay)); await route.continue(); }
    });
    if (!test.noJs) await page.addInitScript(() => {
      window.heroFrames = []; window.heroShifts = []; window.heroRecording = true;
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.heroShifts.push({ time: entry.startTime, value: entry.value, sources: entry.sources.map(source => ({ node: source.node?.className || source.node?.nodeName, previous: source.previousRect.toJSON(), current: source.currentRect.toJSON() })) });
      }).observe({ type: 'layout-shift', buffered: true });
      function tick(time) {
        const title = document.querySelector('h1');
        if (title && getComputedStyle(title).fontFamily.includes('Oranienbaum')) {
          const elements = [...document.querySelectorAll('.site-header, .hero-frame, .hero-identity, .hero-copy, .hero-copy h1, .hero-portrait, .hero-portrait img, .collage-tile, .award-proof')];
          const rects = elements.map(element => { const r = element.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(n => Math.round(n * 100) / 100); });
          const textNodes = [...document.querySelectorAll('.site-header a, h1 span, h1 em, .award-copy p, .numeric-spec')];
          const fonts = textNodes.every(element => { const s = getComputedStyle(element); return document.fonts.check(`${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`, element.textContent); });
          window.heroFrames.push({ time, fonts, rects });
        }
        if (window.heroRecording) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    try {
      for (const navigation of test.reload ? ['cold', 'reload'] : ['cold']) {
        if (navigation === 'reload' && test.failedImages) await page.unroute('**/media/web/*');
        if (navigation === 'cold') await page.goto(base, { waitUntil: 'domcontentloaded' });
        else await page.reload({ waitUntil: 'domcontentloaded' });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all([...document.querySelectorAll('.hero-frame img')].map(image => image.decode().catch(() => {})));
        });
        await page.waitForTimeout(350);
        const record = await page.evaluate(() => {
          window.heroRecording = false;
          const rect = selector => { const b = document.querySelector(selector).getBoundingClientRect(); return { x: b.x, y: b.y, right: b.right, bottom: b.bottom, width: b.width, height: b.height }; };
          return {
            frames: window.heroFrames || [], shifts: window.heroShifts || [],
            paints: performance.getEntriesByType('paint').map(p => ({ name: p.name, time: p.startTime })),
            fonts: [...document.fonts].map(f => ({ family: f.family, style: f.style, weight: f.weight, status: f.status })),
            fontRequests: performance.getEntriesByType('resource').filter(r => /\.woff2(?:\?|$)/.test(r.name)).map(r => r.name),
            rects: { title: rect('h1'), copy: rect('.hero-copy'), portrait: rect('.hero-portrait'), frame: rect('.hero-frame') },
            documentWidth: document.documentElement.scrollWidth,
            collageCount: document.querySelectorAll('.collage-tile').length,
            images: [...document.querySelectorAll('.hero-frame img')].map(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })),
            title: document.querySelector('h1').innerText,
            body: document.body.innerText,
          };
        });
        Object.assign(record, { name: test.name, navigation, width: test.width, errors: [...errors] });
        report.cases.push(record);
        assert.equal(record.documentWidth, test.width, 'No horizontal overflow');
        assert.equal(record.collageCount, 63);
        assert.equal(record.images.length, 64);
        assert.equal(record.fontRequests.length, 0, 'Used fonts must not have a separate network phase');
        assert.equal(record.images.filter(image => image.loaded).length, test.failedImages && navigation === 'cold' ? 0 : 64);
        assert.match(record.title.replace(/\s+/g, ' '), /Евгений Гребеник — ваш личный Мастер-Шеф на Кипре/);
        assert.doesNotMatch(record.body, /Частые вопросы|стоимость|€|число гостей|количество гостей|состав группы/i);
        delete record.body;
        assert.deepEqual(errors, []);
        const { title, copy, portrait, frame } = record.rects;
        assert.ok(title.x >= copy.x - 1 && title.right <= copy.right + 1 && title.y >= copy.y - 1 && title.bottom <= copy.bottom + 1, 'Title stays inside its panel');
        assert.ok(portrait.bottom <= frame.bottom + 1 && portrait.y >= frame.y, 'Portrait stays in Hero');
        if (test.width <= 620) assert.ok(portrait.y >= title.bottom, 'Portrait does not overlap enlarged text');
        if (!test.noJs) {
          const fcp = record.paints.find(p => p.name === 'first-contentful-paint')?.time;
          assert.ok(fcp !== undefined, 'First paint recorded');
          const frames = record.frames.filter(frame => frame.time >= fcp);
          assert.ok(frames.length >= 2, 'Visible loading frames sampled');
          record.fallbackFrames = frames.filter(frame => !frame.fonts).length;
          assert.equal(record.fallbackFrames, 0, 'Real fonts must be ready from the first visible frame');
          const first = frames[0].rects;
          record.maxGeometryChange = Math.max(...frames.flatMap(frame => frame.rects.flatMap((rect, i) => rect.map((n, j) => Math.abs(n - first[i][j])))));
          assert.ok(record.maxGeometryChange <= 0.1, `Hero moved ${record.maxGeometryChange}px after first paint`);
          record.layoutShiftSum = record.shifts.reduce((sum, shift) => sum + shift.value, 0);
          assert.equal(record.layoutShiftSum, 0, 'No unexpected layout shifts during initial loading');
        }
        await page.screenshot({ path: `${output}/${test.name}-${navigation}.png` });
        console.log(JSON.stringify({ name: test.name, navigation, fallbackFrames: record.fallbackFrames, movement: record.maxGeometryChange, shifts: record.layoutShiftSum }));
      }
    } catch (error) {
      report.failures.push({ name: test.name, message: error.message });
      console.error(test.name, error.message);
    } finally { await context.close(); }
  }
} finally {
  await browser.close();
  await writeFile(`${output}/loading-report.json`, JSON.stringify(report, null, 2));
}
assert.deepEqual(report.failures, []);
