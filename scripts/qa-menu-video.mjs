import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:3004';
const output = path.resolve(process.env.MENU_VIDEO_QA_OUTPUT || 'artifacts/menu-video-2026-09-22');
await mkdir(output, { recursive: true });
const report = { base, layouts: [], states: {}, pageErrors: [] };
const source = '/media/menu-planning-smooth-2026-09-22.mp4';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
async function open(options = {}) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, ...options });
  page.on('pageerror', error => report.pageErrors.push(error.message));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function showVideo(page) {
  await page.locator('#menu-planning-video').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const video = document.querySelector('#menu-planning-video');
    return !video.paused && video.currentTime > .1;
  });
}
async function state(page) {
  return page.locator('#menu-planning-video').evaluate(video => ({
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
    assert.equal(playing.duration, 12.5);
    assert.equal(playing.controls, false);
    assert.equal(playing.muted, true);
    assert.equal(playing.inline, true);
    assert.equal(playing.loop, true);
    assert.equal(playing.error, null);
    const geometry = await page.locator('#menu-planning-video').evaluate(video => {
      const rect = video.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width, height: rect.height,
        overflow: document.documentElement.scrollWidth > innerWidth,
        objectFit: getComputedStyle(video).objectFit };
    });
    assert.equal(geometry.overflow, false, `No horizontal overflow at ${width}`);
    assert.ok(geometry.left >= 0 && geometry.right <= width);
    assert.ok(Math.abs(geometry.width / geometry.height - 16 / 9) < .01);
    assert.equal(geometry.objectFit, 'contain');
    // Inspect the moving hand, the complete notebook and neighboring dish layout.
    await page.locator('#menu-planning-video').evaluate(video => { video.pause(); video.currentTime = 7; });
    await page.waitForFunction(() => !document.querySelector('#menu-planning-video').seeking);
    await page.locator('.station-menu').screenshot({ path: path.join(output, `menu-video-${width}.png`) });
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: path.join(output, `page-${width}.png`), fullPage: true });
    }
    if (width === 1440) {
      await page.locator('#menu-planning-video').evaluate(async video => { video.currentTime = 12.2; await video.play(); });
      await page.waitForFunction(() => {
        const video = document.querySelector('#menu-planning-video');
        return video.currentTime < 1 && !video.paused;
      });
      report.states.loop = await state(page);
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForFunction(() => document.querySelector('#menu-planning-video').paused);
      report.states.offscreen = await state(page);
      await showVideo(page);
      report.states.resumed = await state(page);
      // The pre-existing preparation film must still work independently.
      await page.locator('#story-documentary-video').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => !document.querySelector('#story-documentary-video').paused);
      assert.equal((await state(page)).paused, true);
      report.states.preparationFilmPreserved = true;
      await page.locator('#conversation-video').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => !document.querySelector('#conversation-video').paused);
      report.states.conversationFilmPreserved = true;
    }
    report.layouts.push({ width, playing, geometry });
    await page.close();
  }

  const reduced = await open({ reducedMotion: 'reduce' });
  await reduced.locator('#menu-planning-video').scrollIntoViewIfNeeded();
  await reduced.waitForTimeout(800);
  report.states.reducedMotion = await state(reduced);
  assert.equal(report.states.reducedMotion.paused, true);
  assert.equal(report.states.reducedMotion.time, 0);
  await reduced.emulateMedia({ reducedMotion: 'no-preference' });
  await showVideo(reduced);
  await reduced.emulateMedia({ reducedMotion: 'reduce' });
  await reduced.waitForFunction(() => document.querySelector('#menu-planning-video').paused);
  report.states.dynamicReducedMotion = true;
  await reduced.locator('.station-menu').screenshot({ path: path.join(output, 'reduced-motion-390.png') });
  await reduced.close();

  const noJs = await open({ javaScriptEnabled: false });
  await noJs.locator('#menu-planning-video').scrollIntoViewIfNeeded();
  assert.equal((await state(noJs)).paused, true);
  assert.equal(await noJs.locator('#menu-planning-video').evaluate(video => getComputedStyle(video).visibility), 'hidden');
  await noJs.locator('.menu-worktable-poster').evaluate(image => image.decode());
  assert.equal(await noJs.locator('.menu-worktable-poster').evaluate(image => image.naturalWidth > 0), true);
  await noJs.locator('.station-menu').screenshot({ path: path.join(output, 'no-js-390.png') });
  await noJs.close();
  report.states.noJavaScriptPoster = true;

  for (const width of [1440, 390]) {
    const page = await open({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.locator('.dish-notes-photo').scrollIntoViewIfNeeded();
    await page.locator('.dish-notes-photo').evaluate(image => image.decode());
    await page.locator('#menu-planning-video').scrollIntoViewIfNeeded();
    await page.locator('#menu-planning-video').evaluate(async video => { const image = new Image(); image.src = video.poster; await image.decode(); });
    await page.waitForTimeout(150);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('.station-menu').screenshot({ path: path.join(output, `text-200-${width}.png`) });
    await page.close();
  }
  report.states.text200Percent = true;

  const failure = await browser.newPage({ viewport: { width: 390, height: 844 } });
  let block = true;
  await failure.route(`**${source}`, route => block ? route.abort('failed') : route.continue());
  await failure.goto(base, { waitUntil: 'domcontentloaded' });
  await failure.locator('.menu-worktable').scrollIntoViewIfNeeded();
  const retry = failure.getByRole('button', { name: 'Повторить загрузку видео работы над меню' });
  await retry.waitFor({ state: 'visible' });
  const target = await retry.boundingBox();
  assert.ok(target.height >= 44);
  assert.equal(await failure.locator('.menu-worktable-poster').evaluate(image => image.complete && image.naturalWidth > 0), true);
  await retry.focus();
  await failure.locator('.station-menu').screenshot({ path: path.join(output, 'error-390.png') });
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
