import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';

const base = new URL(process.env.HERO_QA_URL || 'http://127.0.0.1:3004/');
assert.ok(base.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(base.hostname), 'Local preview only');
const output = process.env.HERO_QA_OUTPUT || 'artifacts/hero-right-flow-2026-09-22';
const baselineDirectory = process.env.HERO_QA_BASELINE || 'artifacts/hero-right-flow-2026-09-22';
await mkdir(output, { recursive: true });
const baseline = JSON.parse(await readFile(`${baselineDirectory}/baseline.json`, 'utf8').catch(() => '[]'));
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { base: base.href, cases: [], failures: [] };

// Observe the rendered experience from first paint, including loading states.
function recordIntro() {
  window.introQA = { samples: [], shifts: [], starts: [], start: null, done: null };
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.introQA.shifts.push(entry.value);
  }).observe({ type: 'layout-shift', buffered: true });
  document.addEventListener('animationstart', event => {
    if (event.animationName.startsWith('hero-')) window.introQA.starts.push({ name: event.animationName, time: performance.now(), target: event.target.className, story: event.target.closest('[data-story-photo]')?.dataset.storyPhoto, photo: event.target.dataset.photoIndex });
  });
  function tick(time) {
    const frame = document.querySelector('.hero-frame');
    const card = document.querySelector('.hero-identity');
    const grid = document.querySelector('.hero-collage-grid');
    if (frame && card && grid) {
      const state = frame.dataset.heroIntro;
      if (state === 'running' && window.introQA.start === null) window.introQA.start = time;
      if (state === 'complete' && window.introQA.done === null) window.introQA.done = time;
      const tiles = [...document.querySelectorAll('.collage-tile')];
      const visible = tiles.map((tile, index) => Number(getComputedStyle(tile).opacity) * Number(getComputedStyle(grid).opacity) > .01 ? index : -1).filter(index => index !== -1);
      if (state === 'running' && !window.introQA.opening) {
        window.introQA.opening = {
          frame: frame.getBoundingClientRect().toJSON(),
          shots: [...document.querySelectorAll('[data-story-photo]')].map(shot => shot.getBoundingClientRect().toJSON()),
        };
      }
      window.introQA.samples.push({
        time, state, visible, card: Number(getComputedStyle(card).opacity),
        story: [...document.querySelectorAll('[data-story-photo]')].filter(shot => {
          const parent = getComputedStyle(shot.parentElement);
          return parent.display !== 'none' && parent.visibility !== 'hidden' &&
            Number(getComputedStyle(shot).opacity) * Number(getComputedStyle(shot.querySelector('img')).opacity) > .01;
        }).map(shot => shot.dataset.storyPhoto),
        storyPositions: state === 'running' ? [...document.querySelectorAll('[data-story-photo]')].map(shot => {
          const rect = shot.getBoundingClientRect();
          return { photo: shot.dataset.storyPhoto, x: rect.x + rect.width / 2, width: rect.width, opacity: Number(getComputedStyle(shot).opacity) * Number(getComputedStyle(shot.querySelector('img')).opacity) };
        }) : [],
        unloadedVisible: visible.filter(index => { const image = tiles[index].querySelector('img'); return !image.complete || !image.naturalWidth; }),
        layout: [frame.offsetWidth, frame.offsetHeight, card.offsetLeft, card.offsetTop, card.offsetWidth, card.offsetHeight],
      });
    }
    if (window.introQA.samples.length < 600) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

async function inspect(page) {
  return page.evaluate(() => ({
    text: document.querySelector('h1').innerText,
    state: document.querySelector('.hero-frame').dataset.heroIntro,
    opacity: getComputedStyle(document.querySelector('.hero-identity')).opacity,
    animations: document.querySelector('.hero-frame').getAnimations({ subtree: true }).filter(animation => animation.playState !== 'finished').length,
    overflow: document.documentElement.scrollWidth > innerWidth,
    elements: [...document.querySelectorAll('.site-header, .hero, .hero-frame, .hero-collage-grid, .collage-tile, .hero-identity, .hero-copy, h1, .hero-portrait, .hero-portrait img, .award-proof')].map(element => ({ className: element.className, rect: element.getBoundingClientRect().toJSON() })),
    imageSources: [...document.querySelectorAll('.hero-collage img, .hero-portrait img')].map(image => image.currentSrc),
    loaded: [...document.querySelectorAll('.hero-collage img, .hero-portrait img')].filter(image => image.complete && image.naturalWidth > 0).length,
    gridFilter: getComputedStyle(document.querySelector('.hero-collage-grid')).filter,
    gridTransform: getComputedStyle(document.querySelector('.hero-collage-grid')).transform,
    persistentEffects: [...document.querySelectorAll('.collage-tile, .hero-identity')].some(element => { const s = getComputedStyle(element); return s.transform !== 'none' || s.filter !== 'none' || s.willChange !== 'auto'; }),
    recording: window.introQA,
  }));
}

const cases = [1440, 1280, 1024, 768, 430, 390, 375].map(width => ({ name: `width-${width}`, width, animate: true }));
cases.push(
  { name: 'reduced-mobile', width: 390, reduced: true },
  { name: 'reduced-desktop', width: 1440, reduced: true },
  { name: 'no-js-mobile', width: 390, noJs: true },
  { name: 'no-js-desktop', width: 1440, noJs: true },
  { name: 'blocked-client-mobile', width: 390, blockedClient: true },
  { name: 'late-client-mobile', width: 390, clientDelay: 3400 },
  { name: 'slow-images-mobile', width: 390, imageDelay: 1700, animate: true },
  { name: 'stalled-images-mobile', width: 390, imageDelay: 4000 },
  { name: 'toolbar-height-mobile', width: 390, resizeHeight: true },
  { name: 'orientation-mobile', width: 390, resizeWidth: true },
  { name: 'failed-collage-mobile', width: 390, failCollage: true },
  { name: 'reduced-mid-intro', width: 390, reduceDuring: true },
  { name: 'scroll-mid-intro', width: 390, scrollDuring: true },
  { name: 'text-200-mobile', width: 375, enlarged: true, reduced: true },
  { name: 'text-200-desktop', width: 1440, enlarged: true, reduced: true },
  { name: 'retina-mobile', width: 390, dpr: 3, animate: true },
  { name: 'cpu-4x-mobile', width: 390, cpu: 4 },
  { name: 'short-desktop', width: 1440, height: 620, animate: true },
);

try {
  for (const test of cases.filter(test => !process.env.HERO_QA_CASE || test.name === process.env.HERO_QA_CASE)) {
    const context = await browser.newContext({ viewport: { width: test.width, height: test.height || (test.width < 621 ? 812 : 900) }, reducedMotion: test.reduced ? 'reduce' : 'no-preference', javaScriptEnabled: !test.noJs, deviceScaleFactor: test.dpr || 1 });
    const page = await context.newPage();
    // Keep each captured page stable while other local work triggers Vite HMR.
    // The application itself has no WebSocket functionality.
    await page.routeWebSocket(url => url.hostname === base.hostname && url.port === base.port, socket => socket.onMessage(() => undefined));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    if (!test.noJs) await page.addInitScript(recordIntro);
    if (test.enlarged) await page.route('**/app/globals.css', async route => {
      const response = await route.fetch();
      await route.fulfill({ response, body: `${await response.text()}\nhtml { font-size: 200%; }` });
    });
    if (test.blockedClient) await page.route('**/*', route => route.request().resourceType() === 'script' ? route.abort() : route.continue());
    if (test.clientDelay) await page.route('**/*', async route => {
      // Delay the Hero controller once, rather than multiplying the delay at
      // every level of Vite's development module graph.
      if (route.request().resourceType() === 'script' && route.request().url().includes('hero-intro')) await new Promise(resolve => setTimeout(resolve, test.clientDelay));
      return route.continue();
    });
    if (test.imageDelay || test.failCollage) await page.route('**/media/web/hero-*', async route => {
      if (test.failCollage) return route.abort();
      await new Promise(resolve => setTimeout(resolve, test.imageDelay));
      return route.continue();
    });
    if (test.cpu) {
      const session = await context.newCDPSession(page);
      await session.send('Emulation.setCPUThrottlingRate', { rate: test.cpu });
    }
    try {
      await page.goto(base.href, { waitUntil: 'domcontentloaded' });
      if (test.reduceDuring) {
        await page.waitForFunction(() => document.querySelector('.hero-frame')?.dataset.heroIntro === 'running');
        await page.emulateMedia({ reducedMotion: 'reduce' });
      }
      if (test.scrollDuring) {
        await page.waitForFunction(() => document.querySelector('.hero-frame')?.dataset.heroIntro === 'running');
        await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      }
      if (test.resizeHeight || test.resizeWidth) {
        await page.waitForFunction(() => document.querySelector('.hero-frame')?.dataset.heroIntro === 'running');
        await page.waitForTimeout(400);
        await page.setViewportSize({ width: test.resizeWidth ? 430 : 390, height: test.resizeHeight ? 760 : 812 });
        await page.waitForTimeout(100);
        assert.equal(await page.locator('.hero-frame').getAttribute('data-hero-intro'), test.resizeWidth ? 'complete' : 'running', 'Only width changes cancel the intro');
      }
      if (!test.noJs && !test.blockedClient) await page.waitForFunction(() => document.querySelector('.hero-frame')?.dataset.heroIntro === 'complete');
      if (test.scrollDuring) await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('.hero img')].map(image => image.decode().catch(() => {})));
      });
      if (test.blockedClient) await page.waitForTimeout(3100);
      await page.waitForTimeout(100);
      const record = await inspect(page);
      record.name = test.name;
      record.errors = errors;
      report.cases.push(record);
      assert.deepEqual(errors, [], 'No page errors');
      assert.equal(record.overflow, false, 'No horizontal overflow');
      assert.equal(record.opacity, '1', 'Final card is visible');
      assert.equal(record.animations, 0, 'No running animations remain');
      assert.equal(record.persistentEffects, false, 'No transforms, per-tile filters or will-change remain');
      assert.equal(record.gridFilter, 'blur(5px)', 'Approved background blur remains');
      assert.equal(record.gridTransform, 'none', 'The field returns to its original size');
      assert.equal(record.loaded, test.failCollage ? 1 : 64);
      assert.match(record.text.replace(/\s+/g, ' '), /Евгений Гребеник — ваш частный Мастер-Шеф на Кипре/);

      if (test.animate) {
        const q = record.recording;
        assert.notEqual(q.start, null, 'Intro actually played');
        assert.notEqual(q.done, null, 'Intro completed');
        assert.ok(q.done - q.start >= 2960 && q.done - q.start <= 3120, `Total intro ${q.done - q.start}ms`);
        const playing = q.samples.filter(sample => sample.state === 'running');
        const storyStarts = q.starts.filter(start => start.name === 'hero-story-arrive');
        assert.deepEqual(storyStarts.map(start => start.story), ['62', '3', '34', '38'], 'MasterChef → conference → cooking → school');
        assert.ok(q.opening.shots.every(shot => shot.left >= q.opening.frame.left && shot.right <= q.opening.frame.right && shot.top >= q.opening.frame.top && shot.bottom <= q.opening.frame.bottom), 'All four opening photos fit inside the Hero');
        assert.ok(q.opening.shots.every(shot => shot.x + shot.width / 2 > q.opening.frame.x + q.opening.frame.width * .6), 'Every key photo first appears on the right');
        for (const photo of ['62', '3', '34', '38']) {
          // The settled shot stays in the DOM with its final transform. Include
          // that endpoint even if a busy host misses its last visible frame.
          const path = playing.flatMap(sample => sample.storyPositions.filter(position => position.photo === photo));
          assert.ok(path.length > 10, 'A key photograph remains readable before landing');
          assert.ok(path.at(-1).x < path[0].x - test.width * .07, 'Every key photograph flies visibly left');
          assert.ok(path.at(-1).width < path[0].width * .55, 'Every key photograph shrinks into the collage');
          assert.ok(path.slice(1).every((position, index) => position.x <= path[index].x + .1), 'The flight never reverses to the right');
        }
        assert.ok(playing.filter(sample => sample.time - q.start < 500).every(sample => sample.visible.length === 0), 'The first key photograph leads the collage');
        assert.ok(playing.some(sample => sample.visible.length >= 1 && sample.visible.length <= 3), 'Starts with individual photos');
        assert.ok(playing.some(sample => sample.visible.length >= 8 && sample.visible.length <= 10), 'Builds through 8–10 photos');
        assert.ok(playing.filter(sample => sample.card > 0 && sample.card < 1).length >= 3, 'The card has multiple intermediate fade states');
        assert.ok(playing.slice(1).every((sample, index) => sample.card >= playing[index].card), 'The card never flashes or fades back out');
        assert.ok(playing.every(sample => sample.unloadedVisible.length === 0), 'No empty photo slots during intro');
        assert.equal(q.starts.filter(start => start.name === 'hero-photo-in').length, 63, 'Every photo plays exactly once');
        const cardStarts = q.starts.filter(start => start.name === 'hero-card-reveal');
        assert.equal(cardStarts.length, 1, 'Card appears once');
        const cardDelay = cardStarts[0].time - q.start;
        assert.ok(cardDelay >= 2470 && cardDelay <= 2580, `Card starts the final fade at ${cardDelay}ms`);
        const stream = q.starts.filter(start => start.name === 'hero-photo-in' && !['62', '3', '34', '38'].includes(start.photo));
        const firstInterval = (stream[10].time - stream[0].time) / 10;
        const lastInterval = (stream.at(-1).time - stream.at(-11).time) / 10;
        assert.ok(lastInterval < firstInterval * .65, 'The photo stream accelerates toward the finish');
        assert.equal(q.shifts.reduce((sum, value) => sum + value, 0), 0, 'Zero layout shift');
        assert.ok(playing.every(sample => JSON.stringify(sample.layout) === JSON.stringify(playing[0].layout)), 'Layout boxes stay fixed');
        const firstTen = playing.find(sample => sample.visible.length >= 10).visible;
        assert.ok(Math.max(...firstTen) - Math.min(...firstTen) > 35, 'Early photos span the grid');
        const initialStarts = q.starts.length;
        await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(120);
        assert.equal(await page.evaluate(() => window.introQA.starts.length), initialStarts, 'Scroll cannot replay intro');
      }
      if (test.reduced || test.noJs || test.blockedClient || test.clientDelay || (test.imageDelay && !test.animate) || test.failCollage) {
        assert.equal(record.recording?.starts.filter(start => start.name === 'hero-photo-in' || start.name === 'hero-story-arrive').length || 0, 0, 'Static fallback has no intro');
      }
      if (test.reduced) assert.ok(record.recording.samples.every(sample => sample.card === 1), 'Reduced motion visible from first sample');
      if (test.clientDelay) {
        const samples = record.recording.samples;
        const firstVisible = samples.findIndex(sample => sample.card === 1);
        assert.ok(firstVisible >= 0 && samples.slice(firstVisible).every(sample => sample.card === 1), 'Late hydration never hides a revealed card');
      }

      const original = baseline.find(item => item.width === test.width);
      if (original && !test.enlarged && !test.failCollage && !test.dpr && !test.height && !test.resizeHeight && !test.resizeWidth) {
        assert.deepEqual(record.elements, original.elements, 'Exact original final geometry');
        // A cached larger copy from an opening shot may also be reused by the
        // collage. Both sizes are the same original photograph, unchanged.
        // Development and production previews can use different local ports.
        const assetPath = source => new URL(source).pathname;
        const photoIdentity = source => assetPath(source).replace(/-(192|384)\.webp$/, '-responsive.webp');
        assert.deepEqual(record.imageSources.map(photoIdentity), original.imageSources.map(photoIdentity), 'Original responsive photos');
        record.largerCachedCopies = record.imageSources.flatMap((source, index) => assetPath(source) === assetPath(original.imageSources[index]) ? [] : [{ index, source }]);
        const screenshot = await page.screenshot({ path: `${output}/${test.name}.png` });
        const originalPng = await readFile(`${baselineDirectory}/before-${test.width}.png`);
        record.identicalScreenshot = screenshot.equals(originalPng);
        if (!record.identicalScreenshot) {
          // Check the untouched image area against the original with only blur
          // rounding tolerance. Cached larger copies get a separate comparison.
          const a = await sharp(originalPng).removeAlpha().raw().toBuffer();
          const b = await sharp(screenshot).removeAlpha().raw().toBuffer();
          assert.equal(a.length, b.length);
          const tiles = record.elements.filter(element => element.className.startsWith('collage-tile'));
          const upgraded = record.largerCachedCopies.map(copy => tiles[copy.index].rect);
          const difference = { original: { max: 0, sum: 0, count: 0 }, upgraded: { max: 0, sum: 0, count: 0 } };
          for (let index = 0; index < a.length; index++) {
            const x = Math.floor(index / 3) % test.width;
            const y = Math.floor(index / (3 * test.width));
            const bucket = upgraded.some(rect => x >= rect.left - 8 && x <= rect.right + 8 && y >= rect.top - 8 && y <= rect.bottom + 8) ? difference.upgraded : difference.original;
            const delta = Math.abs(a[index] - b[index]);
            bucket.max = Math.max(bucket.max, delta);
            bucket.sum += delta;
            bucket.count++;
          }
          record.rasterDifference = Object.fromEntries(Object.entries(difference).map(([key, value]) => [key, { maxChannelDelta: value.max, meanChannelDelta: value.sum / (value.count || 1) }]));
          assert.ok(difference.original.max <= 8 && difference.original.sum / difference.original.count < .02, `Unchanged pixels outside cached-copy cells: ${JSON.stringify(record.rasterDifference)}`);
          assert.ok(difference.upgraded.max <= 32 && difference.upgraded.sum / (difference.upgraded.count || 1) < 4, `Only raster detail changes with a larger original: ${JSON.stringify(record.rasterDifference)}`);
        }
      } else await page.screenshot({ path: `${output}/${test.name}.png` });

      if (test.enlarged) {
        const find = name => record.elements.find(element => element.className === name)?.rect;
        const copy = find('hero-copy');
        const title = record.elements.find(element => element.className === '')?.rect;
        assert.ok(title.x >= copy.x && title.right <= copy.right + 1 && title.bottom <= copy.bottom + 1, 'Enlarged title stays in the card');
      }
      console.log(JSON.stringify({ name: test.name, duration: record.recording?.start == null ? null : record.recording.done - record.recording.start, identicalScreenshot: record.identicalScreenshot, rasterDifference: record.rasterDifference, shifts: record.recording?.shifts, passed: true }));
    } catch (error) {
      report.failures.push({ name: test.name, error: error.message });
      console.error(test.name, error.message);
    } finally { await context.close(); }
  }
} finally {
  await browser.close();
  await writeFile(`${output}/qa-report.json`, JSON.stringify(report, null, 2));
}
assert.deepEqual(report.failures, []);
