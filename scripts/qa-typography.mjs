import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = 'http://127.0.0.1:3004/';
const output = 'artifacts/typography-roles-2026-09-13';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { viewports: [], failures: [] };
const families = ['Spectral', 'Golos Text', 'IBM Plex Mono'];
try {
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : 900 }, reducedMotion: 'reduce', locale: 'ru-RU' });
    const record = { width, requests: [], errors: [] };
    report.viewports.push(record);
    page.on('request', r => { if (r.resourceType() === 'font') record.requests.push(r.url()); });
    page.on('pageerror', e => record.errors.push(e.message));
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.contact').scrollIntoViewIfNeeded();
      await page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })); window.scrollTo(0, 0); });
      await page.waitForTimeout(200);
      record.styles = await page.evaluate(() => {
        const describe = el => { const s = getComputedStyle(el), b = el.getBoundingClientRect(); return { selector: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().replace(/\s+/g, '.') : ''), text: el.textContent.trim(), family: s.fontFamily, weight: s.fontWeight, style: s.fontStyle, size: parseFloat(s.fontSize), lineHeight: parseFloat(s.lineHeight), tracking: s.letterSpacing, numeric: s.fontVariantNumeric, synthesis: s.fontSynthesis, box: { x: b.x, y: b.y, width: b.width, right: b.right, bottom: b.bottom } }; };
        return {
          headings: [...document.querySelectorAll('h1,h1 *,h2,h2 *,h3,h3 *')].map(describe),
          copy: [...document.querySelectorAll('.award-note,.format-caption p,.station-copy p')].map(describe),
          numbers: [...document.querySelectorAll('.station-number,.numeric-spec')].map(describe),
          wordmarks: [...document.querySelectorAll('.wordmark')].map(describe),
          all: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().height && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(describe),
          documentWidth: document.documentElement.scrollWidth,
          preloads: [...document.querySelectorAll('link[rel=preload][as=font]')].map(el => ({ href: el.getAttribute('href'), crossOrigin: el.crossOrigin })),
          faces: [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, display: f.display, status: f.status, range: f.unicodeRange })),
        };
      });
      const styles = record.styles;
      assert.ok(styles.documentWidth <= width, 'Horizontal overflow');
      assert.ok(styles.headings.every(s => s.family.startsWith('Spectral')), 'Every heading descendant must inherit Spectral');
      assert.ok(styles.copy.every(s => s.family.startsWith('"Golos Text"') && s.size === 16.5 && s.weight === '400' && s.style === 'normal'), 'Copy role must stay 16.5px Golos400');
      assert.ok(styles.numbers.every(s => s.family.includes('IBM Plex Mono') && s.numeric.includes('tabular-nums') && s.numeric.includes('lining-nums')), 'Numeric role requires tabular/lining mono');
      assert.ok(styles.numbers.filter(s => s.selector.includes('station-number')).every(s => s.size === 22), 'Every station number must be22px');
      assert.ok(styles.faces.length === 10 && styles.faces.every(f => f.display === 'swap'), 'Exactly10 self-hosted swap faces required');
      assert.deepEqual(styles.preloads.map(p => p.href).sort(), ['/fonts/golos-text-400-900-cyrillic.woff2', '/fonts/spectral-400-cyrillic.woff2']);
      assert.ok(styles.preloads.every(p => p.crossOrigin === 'anonymous'));
      for (const s of styles.all) {
        assert.equal(s.synthesis, 'none', `Font synthesis enabled on ${s.selector}`);
        if (s.family.startsWith('Spectral')) assert.ok(['400', '500'].includes(s.weight), `Unsupported Spectral weight: ${s.weight}`);
        if (s.style === 'italic') assert.ok(s.family.startsWith('Spectral') && s.weight === '400', 'Italic must be real Spectral400');
        if (s.family.includes('IBM Plex Mono')) assert.match(s.text, /^\d+$/, 'Mono may only be applied to numbers');
      }
      // CDP is the same platform-font evidence displayed by DevTools Rendered Fonts.
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      const { root } = await cdp.send('DOM.getDocument');
      const selectors = ['h1 > span', 'h1 > em', 'h2', 'h3', '.wordmark', '.award-note', '.station-copy p', '.plate-label dt', '.plate-label dd', '.station-number', '.numeric-spec', '.instagram-button'];
      record.rendered = [];
      for (const selector of selectors) {
        const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector });
        for (const nodeId of nodeIds) {
          const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
          record.rendered.push({ selector, fonts });
          const custom = fonts.filter(f => f.isCustomFont);
          const fallback = fonts.filter(f => !f.isCustomFont);
          assert.ok(custom.length && custom.every(f => families.some(name => f.familyName.includes(name))), `Unexpected rendered family in ${selector}: ${JSON.stringify(fonts)}`);
          if (fallback.length) {
            // U+2197 is existing decorative UI content, outside the requested Latin subset.
            const { nodeId: arrowId } = await cdp.send('DOM.querySelector', { nodeId, selector: 'span[aria-hidden="true"]' });
            assert.ok(selector === '.instagram-button' && arrowId, `Text fallback in ${selector}`);
            const arrow = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: arrowId });
            assert.deepEqual(fallback, arrow.fonts, 'Only the existing ↗ symbol may use platform fallback');
            assert.equal(fallback.reduce((n, f) => n + f.glyphCount, 0), 1);
          }
        }
      }
      const numberWidths = await page.locator('.station-number').evaluateAll(els => els.map(el => { const range = document.createRange(); range.selectNodeContents(el); return range.getBoundingClientRect().width; }));
      assert.ok(Math.max(...numberWidths) - Math.min(...numberWidths) < .1, 'Station digit runs must have equal widths');
      record.numberWidths = numberWidths;
      assert.ok(record.requests.some(r => r.endsWith('spectral-400-cyrillic.woff2')) && record.requests.some(r => r.endsWith('spectral-400-latin.woff2')));
      assert.ok(record.requests.some(r => r.endsWith('golos-text-400-900-cyrillic.woff2')) && record.requests.some(r => r.endsWith('golos-text-400-900-latin.woff2')));
      assert.ok(record.requests.every(r => r.startsWith(url + 'fonts/')), 'Fonts must be self-hosted');
      await page.screenshot({ path: `${output}/viewport-${width}.png` });
      await page.screenshot({ path: `${output}/full-${width}.png`, fullPage: true });
      await page.locator('.evening-plan').screenshot({ path: `${output}/process-${width}.png` });
      assert.equal(record.errors.length, 0, 'Browser errors');
      record.passed = true;
      console.log(`${width}: typography + Rendered Fonts PASS`);
    } catch (error) {
      record.error = error.message; report.failures.push(`${width}: ${error.message}`);
      await page.screenshot({ path: `${output}/failed-${width}.png`, fullPage: true }).catch(() => {});
      console.error(`${width}: ${error.message}`);
    } finally { await page.close(); }
  }
} finally {
  await browser.close();
  report.passed = !report.failures.length;
  await writeFile(`${output}/font-report.json`, JSON.stringify(report, null, 2));
}
if (!report.passed) process.exitCode = 1;
