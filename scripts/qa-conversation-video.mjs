import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:3004';
const output = path.resolve(process.env.CONVERSATION_QA_OUTPUT || 'artifacts/conversation-video-2026-09-22');
await mkdir(output, { recursive: true });
const report = { base, layouts: [], states: {}, pageErrors: [] };
const source = '/media/conversation-2026-09-22.mp4';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
async function open(options = {}) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, ...options });
  page.on('pageerror', error => report.pageErrors.push(error.message));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function showVideo(page) {
  await page.locator('#conversation-video').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const video = document.querySelector('#conversation-video');
    return !video.paused && video.currentTime > .1;
  });
}
async function state(page) {
  return page.locator('#conversation-video').evaluate(video => ({
    paused: video.paused, time: video.currentTime, duration: video.duration,
    muted: video.muted, controls: video.controls, loop: video.loop,
    inline: video.playsInline, width: video.videoWidth, height: video.videoHeight,
    error: video.error?.code || null,
  }));
}
try {
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    const page = await open({ viewport: { width, height: width > 768 ? 1000 : 844 } });
    assert.equal((await state(page)).paused, true, 'Do not play above-the-fold media offscreen');
    await showVideo(page);
    const playing = await state(page);
    assert.equal(playing.width, 1280);
    assert.equal(playing.height, 720);
    assert.equal(playing.duration, 10);
    assert.equal(playing.controls, false);
    assert.equal(playing.muted, true);
    assert.equal(playing.inline, true);
    assert.equal(playing.loop, true);
    assert.equal(playing.error, null);
    const geometry = await page.locator('#conversation-video').evaluate(video => {
      const rect = video.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width, height: rect.height,
        overflow: document.documentElement.scrollWidth > innerWidth,
        objectFit: getComputedStyle(video).objectFit };
    });
    assert.equal(geometry.overflow, false, `No horizontal overflow at ${width}`);
    assert.ok(geometry.left >= 0 && geometry.right <= width);
    assert.ok(Math.abs(geometry.width / geometry.height - 16 / 9) < .01);
    assert.equal(geometry.objectFit, 'contain');
    // Inspect the frame with the complete baked-in sentence as well as layout.
    await page.locator('#conversation-video').evaluate(video => { video.pause(); video.currentTime = 7; });
    await page.waitForFunction(() => !document.querySelector('#conversation-video').seeking);
    await page.locator('.station-conversation').screenshot({ path: path.join(output, `conversation-${width}.png`) });
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: path.join(output, `page-${width}.png`), fullPage: true });
    }
    if (width === 1440) {
      await page.locator('#conversation-video').evaluate(async video => { video.currentTime = 9.7; await video.play(); });
      await page.waitForFunction(() => {
        const video = document.querySelector('#conversation-video');
        return video.currentTime < 1 && !video.paused;
      });
      report.states.loop = await state(page);
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForFunction(() => document.querySelector('#conversation-video').paused);
      report.states.offscreen = await state(page);
      await showVideo(page);
      report.states.resumed = await state(page);
      // The pre-existing preparation film must still work independently.
      await page.locator('#story-documentary-video').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => !document.querySelector('#story-documentary-video').paused);
      assert.equal((await state(page)).paused, true);
      report.states.preparationFilmPreserved = true;
    }
    report.layouts.push({ width, playing, geometry });
    await page.close();
  }

  const reduced = await open({ reducedMotion: 'reduce' });
  await reduced.locator('#conversation-video').scrollIntoViewIfNeeded();
  await reduced.waitForTimeout(800);
  report.states.reducedMotion = await state(reduced);
  assert.equal(report.states.reducedMotion.paused, true);
  assert.equal(report.states.reducedMotion.time, 0);
  await reduced.locator('.station-conversation').screenshot({ path: path.join(output, 'reduced-motion-390.png') });
  await reduced.close();

  const noJs = await open({ javaScriptEnabled: false });
  await noJs.locator('#conversation-video').scrollIntoViewIfNeeded();
  assert.equal((await state(noJs)).paused, true);
  await noJs.locator('.station-conversation').screenshot({ path: path.join(output, 'no-js-390.png') });
  await noJs.close();
  report.states.noJavaScriptPoster = true;

  for (const width of [1440, 390]) {
    const page = await open({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.locator('.station-conversation').scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('.station-conversation').screenshot({ path: path.join(output, `text-200-${width}.png`) });
    await page.close();
  }
  report.states.text200Percent = true;

  const failure = await browser.newPage({ viewport: { width: 390, height: 844 } });
  let block = true;
  await failure.route(`**${source}`, route => block ? route.abort('failed') : route.continue());
  await failure.goto(base, { waitUntil: 'domcontentloaded' });
  await failure.locator('.conversation-film').scrollIntoViewIfNeeded();
  const retry = failure.getByRole('button', { name: 'Повторить загрузку видео знакомства' });
  await retry.waitFor({ state: 'visible' });
  const target = await retry.boundingBox();
  assert.ok(target.height >= 44);
  assert.equal(await failure.locator('.conversation-film-poster').evaluate(image => image.complete && image.naturalWidth > 0), true);
  await retry.focus();
  await failure.locator('.station-conversation').screenshot({ path: path.join(output, 'error-390.png') });
  block = false;
  await retry.press('Enter');
  await showVideo(failure);
  assert.equal(await retry.count(), 0);
  report.states.errorAndKeyboardRetry = await state(failure);
  await failure.close();
  assert.deepEqual(report.pageErrors, []);
  report.passed = true;
} finally {
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
