// Lifecycle fault injection complements browser-engine checks; it is not a real Telegram device test.
// PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs BASE_URL=http://127.0.0.1:5433 node scripts/check-embedded-browsers.mjs
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.ENGINE || 'chromium';
const origin = process.env.BASE_URL || 'http://127.0.0.1:5433';
const output = path.resolve(process.env.QA_OUTPUT || 'output/embedded-qa');
await mkdir(output, { recursive: true });
const browser = await pw[engine].launch({ headless: true, ...(process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {}) });
const results = [];
const cases = (process.env.QA_CASES || 'normal,desktop,hidden-open,hide-during-flight,page-cache,opening-width,slow-photo,failed-photo,slow-snapshot,failed-snapshot,slow-critical,reduced-motion,blocked-controller,observer-recovery,blocked-autoplay,pending-animation').split(',');
try {
  for (const name of cases) {
    const desktop = ['desktop', 'pending-animation'].includes(name);
    const page = await browser.newPage({ viewport: desktop ? { width: 1440, height: 900 } : { width: 390, height: 744 }, hasTouch: !desktop, ...(engine !== 'firefox' ? { isMobile: !desktop } : {}), reducedMotion: name === 'reduced-motion' ? 'reduce' : 'no-preference' });
    page.setDefaultTimeout(12000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.addInitScript(({ name }) => {
        window.__hidden = name === 'hidden-open';
        Object.defineProperty(document, 'hidden', { get: () => window.__hidden });
        window.__intro = [];
        new MutationObserver(() => {
          const hero = document.querySelector('.hero-frame');
          if (hero && window.__intro[window.__intro.length - 1]?.state !== hero.dataset.heroIntro) window.__intro.push({ state: hero.dataset.heroIntro, hidden: document.hidden, time: Math.round(performance.now()) });
        }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-hero-intro'] });
        if (name === 'observer-recovery') {
          // Reproduce missing observer deliveries after an embedded view resumes.
          const NativeObserver = window.IntersectionObserver;
          window.IntersectionObserver = class extends NativeObserver { constructor(callback, options) { super(() => {}, options); } };
        }
        if (name === 'blocked-autoplay') {
          const nativePlay = HTMLMediaElement.prototype.play;
          HTMLMediaElement.prototype.play = function () {
            if (!window.__manualPlay) return Promise.reject(new DOMException('Requires a gesture', 'NotAllowedError'));
            return nativePlay.call(this);
          };
          document.addEventListener('click', event => { if (event.isTrusted) window.__manualPlay = true; }, true);
        }
        if (name === 'pending-animation') {
          const nativeAnimate = Element.prototype.animate;
          Element.prototype.animate = function (...args) {
            const animation = nativeAnimate.apply(this, args);
            animation.playbackRate = 0;
            return animation;
          };
        }
      }, { name });
      if (name === 'slow-photo' || name === 'failed-photo') await page.route('**/hero-12*', async route => {
        if (name === 'failed-photo') return route.abort();
        await new Promise(resolve => setTimeout(resolve, 4400));
        await route.continue().catch(() => {});
      });
      if (name === 'slow-snapshot' || name === 'failed-snapshot') await page.route('**/hero-snapshot.js', async route => {
        if (name === 'failed-snapshot') return route.abort();
        await new Promise(resolve => setTimeout(resolve, 3500));
        await route.continue().catch(() => {});
      });
      if (name === 'slow-critical') await page.route('**/hero-63*', async route => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await route.continue().catch(() => {});
      });
      if (name === 'blocked-controller') await page.route('**/hero-collage.js', route => route.abort());
      // A stalled media response must not block the story's enhancement until window.load.
      if (name === 'observer-recovery') await page.route('**/*.mp4', async route => {
        await new Promise(resolve => setTimeout(resolve, 9000));
        await route.abort().catch(() => {});
      });
      await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 20000 });
      if (name === 'hidden-open') {
        await page.waitForTimeout(3600);
        assert.equal(await page.locator('.hero').getAttribute('data-hero-intro'), 'pending');
        await page.evaluate(() => { window.__hidden = false; document.dispatchEvent(new Event('visibilitychange')); });
      }
      const shouldRun = !['reduced-motion', 'blocked-controller', 'slow-critical'].includes(name);
      let movement;
      if (shouldRun) {
        await page.waitForFunction(() => document.querySelector('.hero').dataset.heroIntro === 'running');
        if (name === 'opening-width') await page.setViewportSize({ width: 393, height: 744 });
        if (name === 'hide-during-flight' || name === 'page-cache') {
          await page.waitForTimeout(150);
          await page.evaluate(name => {
            if (name === 'page-cache') window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
            else { window.__hidden = true; document.dispatchEvent(new Event('visibilitychange')); }
          }, name);
          const before = await page.locator('.hero-story-shot').first().evaluate(el => getComputedStyle(el).transform);
          await page.waitForTimeout(3400);
          assert.equal(await page.locator('.hero').getAttribute('data-hero-intro'), 'running');
          const after = await page.locator('.hero-story-shot').first().evaluate(el => getComputedStyle(el).transform);
          assert.equal(after, before, 'flight must pause while the host hides its view');
          await page.evaluate(name => {
            if (name === 'page-cache') window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
            else { window.__hidden = false; document.dispatchEvent(new Event('visibilitychange')); }
          }, name);
        }
        const frameStyles = () => [...document.querySelectorAll('.hero-story-shot, .collage-tile, .hero-portrait')].map(el => { const style = getComputedStyle(el); return `${style.transform}/${style.opacity}`; });
        const before = await page.evaluate(frameStyles);
        await page.waitForTimeout(600);
        const after = await page.evaluate(frameStyles);
        // At least one photo animation must actually advance, not merely set a state flag.
        movement = { changedPhotos: after.filter((style, index) => style !== before[index]).length };
        assert(movement.changedPhotos > 0, 'photo geometry/opacity did not change between frames');
        if (name === 'normal') await page.screenshot({ path: path.join(output, `${engine}-hero-moving.png`) });
        const progress = await page.locator('.hero').evaluate(el => el.getAnimations({ subtree: true }).some(animation => animation.currentTime > 200 && animation.playState === 'running'));
        assert(progress, 'no active, advancing CSS animation');
      }
      if (name === 'blocked-controller') await page.waitForTimeout(3500);
      else await page.waitForFunction(() => document.querySelector('.hero').dataset.heroIntro === 'complete');
      assert.equal(await page.locator('.hero-identity').evaluate(el => getComputedStyle(el).opacity), '1');
      assert.equal(await page.locator('.hero-actions a').count(), 1);
      if (name === 'blocked-autoplay') {
        await page.locator('.hero-video-toggle').scrollIntoViewIfNeeded();
        const media = page.locator('[data-hero-video]');
        assert(await media.evaluate(el => el.paused));
        await page.locator('.hero-video-toggle').click();
        await page.waitForFunction(() => !document.querySelector('[data-hero-video]').paused);
        assert(await media.evaluate(el => el.muted && el.hasAttribute('playsinline')));
      }
      if (['observer-recovery', 'normal', 'desktop', 'pending-animation'].includes(name)) {
        for (const selector of ['#about', '#format-dinner', '#letter-conversation', '#ingredients', '#menu', '#letter-preparation', '#letter-evening']) {
          await page.locator(selector).evaluate(el => {
            document.documentElement.classList.toggle('is-story-reading', !!el.closest('.dinner-story'));
            const main = document.querySelector('#main');
            main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top, behavior: 'instant' });
            window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
          });
          await page.waitForTimeout(name === 'pending-animation' ? 1500 : 1100);
          const invisible = await page.locator(selector).evaluate(el => [...el.querySelectorAll('.motion-reveal, [data-story-reveal]')].filter(target => {
            const bounds = target.getBoundingClientRect();
            const visible = Math.min(bounds.bottom, innerHeight - 48) - Math.max(bounds.top, 0);
            return bounds.height > 0 && visible > Math.min(bounds.height, innerHeight - 48) * .8 && Number(getComputedStyle(target).opacity) < .95;
          }).map(target => target.className));
          assert.deepEqual(invisible, [], `hidden visible copy in ${selector}`);
        }
      }
      if (name === 'pending-animation') {
        await page.locator('#format-dinner').evaluate(el => {
          document.documentElement.classList.remove('is-story-reading');
          const main = document.querySelector('#main');
          main.scrollTo({ top: main.scrollTop + el.getBoundingClientRect().top, behavior: 'instant' });
        });
        await page.locator('[data-dialog="details-dinner"]').click();
        await page.waitForFunction(() => {
          const dialog = document.querySelector('#details-dinner');
          return dialog.open && getComputedStyle(dialog).opacity === '1' && dialog.getBoundingClientRect().top < innerHeight;
        });
        await page.locator('#details-dinner .close-sheet').click();
        await page.waitForFunction(() => !document.querySelector('#details-dinner').open && !document.documentElement.classList.contains('scroll-locked'));
        await page.getByRole('button', { name: 'Показать формат: Мероприятия', exact: true }).click();
        await page.waitForFunction(() => !document.querySelector('.service-transition') && !document.documentElement.classList.contains('is-navigating') && Math.abs(document.querySelector('#format-events').getBoundingClientRect().top) < 2);
      }
      const states = await page.evaluate(() => window.__intro);
      assert.deepEqual(errors, []);
      const result = { name, status: 'passed', states, movement, errors };
      results.push(result);
      console.log(`PASS ${name}`);
      if (['hidden-open', 'normal', 'desktop'].includes(name)) await page.screenshot({ path: path.join(output, `${engine}-${name}.png`) });
    } catch (error) {
      results.push({ name, status: 'failed', error: error.stack, errors, states: await page.evaluate(() => window.__intro).catch(() => []) });
      console.error(`FAIL ${name}: ${error.message}`);
    } finally {
      await page.close();
      await writeFile(path.join(output, `${engine}.json`), JSON.stringify({ engine, version: browser.version(), note: 'Lifecycle fault injection, not physical device or Telegram certification', results }, null, 2));
    }
  }
} finally { await browser.close(); }
if (results.some(result => result.status === 'failed')) process.exitCode = 1;
