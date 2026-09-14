import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = 'artifacts/menu-formats-faq-2026-09-14';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { viewports: [], fonts: {}, enlarged: [], noJs: null, failures: [] };
const cssOf = async page => page.evaluate(() => {
  const describe = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return { text: el.textContent.trim(), family: s.fontFamily, size: parseFloat(s.fontSize), weight: s.fontWeight, style: s.fontStyle, color: s.color, tracking: s.letterSpacing, synthesis: s.fontSynthesis, numeric: s.fontVariantNumeric, display: s.display, lineHeight: parseFloat(s.lineHeight), x: r.x, width: r.width, right: r.right, y: r.y + scrollY, bottom: r.bottom + scrollY };
  };
  const all = [...document.querySelectorAll('*')];
  return {
    scrollWidth: document.documentElement.scrollWidth,
    undersizedDisplay: all.filter(el => { const s = getComputedStyle(el); return s.fontFamily.includes('Oranienbaum') && parseFloat(s.fontSize) < 19; }).map(describe),
    display: all.filter(el => getComputedStyle(el).fontFamily.includes('Oranienbaum')).map(describe),
    heavy: all.filter(el => parseFloat(getComputedStyle(el).fontWeight) > 400 && !el.closest('.faq-q')).map(describe),
    dishNames: [...document.querySelectorAll('.dish-name')].map(describe),
    dishSubs: [...document.querySelectorAll('.dish-sub')].map(describe),
    separators: [...document.querySelectorAll('.dish-sub .sep')].map(describe),
    italics: [...document.querySelectorAll('.dish-sub em')].map(describe),
    nums: [...document.querySelectorAll('.dish-num')].map(describe),
    formatNames: [...document.querySelectorAll('.fmt-name')].map(describe),
    specs: [...document.querySelectorAll('.fmt-spec')].map(el => ({ ...describe(el), gap: getComputedStyle(el).gap, children: [...el.children].map(describe) })),
    prices: [...document.querySelectorAll('.fmt-spec b')].map(describe),
    questions: [...document.querySelectorAll('.faq-q')].map(describe),
    answers: [...document.querySelectorAll('.faq-a')].map(describe),
    images: [...document.querySelectorAll('.formats img, .menu-worktable img')].map(el => ({ loaded: el.complete && el.naturalWidth > 0, alt: el.alt })),
  };
});
const near = (a, b) => Math.abs(a - b) < 0.1;
try {
  for (const width of [1440, 1280, 1024, 768, 761, 760, 430, 390, 375]) {
    const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : 1000 }, locale: 'ru-RU', reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const record = { width, errors };
    report.viewports.push(record);
    try {
      await page.goto('http://127.0.0.1:3004/', { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('.formats img, .menu-worktable img')].map(img => { img.loading = 'eager'; return img.decode(); }));
      });
      const data = record.styles = await cssOf(page);
      assert.ok(data.scrollWidth <= width, 'No horizontal overflow');
      assert.deepEqual(data.undersizedDisplay, [], 'No Oranienbaum below 19px');
      assert.deepEqual(data.heavy, [], 'Only FAQ questions may have a weight above 400');
      assert.ok(data.display.every(s => s.weight === '400' && s.style === 'normal' && s.color === 'rgb(10, 10, 10)' && ['normal', '0px'].includes(s.tracking)), 'Every display face is normal 400 ink with no tracking');
      assert.ok(data.dishNames.length >= 2 && data.dishNames.every(s => s.family.startsWith('Oranienbaum') && s.size === (width <= 760 ? 19 : 20)), 'Dish name size and face');
      assert.ok(data.dishSubs.every(s => s.family.includes('Ysabeau Office') && s.size === (width <= 760 ? 14.5 : 15) && s.display === (width <= 760 ? 'block' : 'inline')), 'Dish descriptions reflow at 760px');
      assert.ok(data.separators.every(s => s.display === (width <= 760 ? 'none' : 'inline')), 'Leading separator disappears only on mobile');
      assert.ok(data.italics.every(s => s.style === 'italic' && s.family.includes('Ysabeau Office') && s.synthesis === 'none'), 'Real sans italic');
      assert.ok(data.nums.every(s => s.family.includes('PT Mono') && s.size === 13 && s.numeric === 'lining-nums tabular-nums'), 'Aligned mono numbering');
      assert.ok(data.formatNames.length === 3 && data.formatNames.every(s => s.family.startsWith('Oranienbaum') && s.size === 20), 'Format names');
      assert.ok(data.prices.length === 3 && data.prices.every(s => near(s.x, data.prices[0].x) && s.family.includes('PT Mono') && s.weight === '400' && s.color === 'rgb(114, 86, 31)'), 'Prices share the same x coordinate, gold mono400');
      for (const s of data.specs) {
        assert.equal(s.children.length, 4);
        assert.equal(s.display, width <= 760 ? 'grid' : 'flex');
        assert.ok(s.children.every(c => c.x >= s.x - 1 && c.right <= s.right + 1 && c.family.includes('PT Mono') && c.numeric === 'lining-nums tabular-nums'));
        if (width <= 760) {
          assert.ok(near(s.children[0].y, s.children[1].y) && near(s.children[2].y, s.children[3].y));
          assert.ok(near(s.children[0].x, s.children[2].x) && near(s.children[1].x, s.children[3].x));
          assert.ok(s.children[2].y >= Math.max(s.children[0].bottom, s.children[1].bottom), 'Spec rows cannot overlap');
        }
      }
      assert.ok(data.questions.length === 4 && data.questions.every(s => s.family.includes('Ysabeau Office') && s.weight === '600' && s.size === 18));
      assert.ok(data.answers.every(s => s.family.includes('Ysabeau Office') && s.weight === '400' && s.size === 16.5 && near(s.lineHeight, 16.5 * (width <= 760 ? 1.7 : 1.62))));
      assert.ok(data.images.every(s => s.loaded && s.alt));
      assert.deepEqual(errors, []);
      for (const [selector, name] of [['.formats', 'formats'], ['.sample-menu', 'menu'], ['.faq', 'faq']]) {
        await page.locator(selector).screenshot({ path: `${output}/${name}-${width}.png`, animations: 'disabled' });
      }
      if (width === 1440 || width === 375) {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
        const { root } = await cdp.send('DOM.getDocument');
        report.fonts[width] = {};
        for (const [selector, expected] of [['.dish-name', 'Oranienbaum-Regular'], ['.fmt-name', 'Oranienbaum-Regular'], ['.dish-sub em', 'YsabeauOffice-Italic'], ['.faq-q', 'YsabeauOffice-SemiBold'], ['.fmt-spec b', 'PTMono-Regular']]) {
          const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
          const result = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
          report.fonts[width][selector] = result.fonts;
          assert.ok(result.fonts.length && result.fonts.every(f => f.isCustomFont && f.postScriptName === expected), `Rendered font mismatch: ${selector}`);
        }
        await cdp.detach();
      }
      record.passed = true;
      console.log(`${width}px passed`);
    } catch (e) { record.error = e.message; report.failures.push(`${width}: ${e.message}`); }
    await page.close();
  }
  for (const width of [1440, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto('http://127.0.0.1:3004/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await page.evaluate(() => document.fonts.ready);
    const data = await cssOf(page);
    const passed = data.scrollWidth <= width && data.dishNames.every(s => s.size >= 38) && data.answers.every(s => s.size === 33);
    report.enlarged.push({ width, passed, scrollWidth: data.scrollWidth });
    if (!passed) report.failures.push(`200% text at ${width}px`);
    for (const name of ['formats', 'sample-menu', 'faq']) await page.locator(`.${name}`).screenshot({ path: `${output}/${name}-${width}-200.png`, animations: 'disabled' });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false });
  await page.goto('http://127.0.0.1:3004/', { waitUntil: 'networkidle' });
  report.noJs = { dishes: await page.locator('.dish-name').count(), specs: await page.locator('.fmt-spec').count(), answers: await page.locator('.faq-a:visible').count() };
  assert.deepEqual(report.noJs, { dishes: 2, specs: 3, answers: 4 });
  await page.close();
} finally {
  await browser.close();
  report.passed = report.failures.length === 0;
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ passed: report.passed, failures: report.failures, enlarged: report.enlarged, noJs: report.noJs }));
if (!report.passed) process.exitCode = 1;
