import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium, firefox } from 'playwright';

const base = process.env.QA_FIXES_URL || 'http://127.0.0.1:3004';
const out = path.resolve(process.env.QA_FIXES_OUTPUT || 'artifacts/qa-fixes-controls-2026-09-15/local');
await mkdir(out, { recursive: true });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const results = { base, checkedAt: new Date().toISOString(), layouts: [], video: {}, http: [] };
const assetPaths = new Set();
const filmPath = '/media/chef-story-short-prep-2026-09-12.mp4';

async function settle(page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 600) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await pause(40);
  }
  await page.waitForFunction(() => Array.from(document.images).every(i => i.complete && i.naturalWidth > 0));
}

async function openVideo(page) {
  await page.locator('video').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const v = document.querySelector('video');
    return !v.paused && v.currentTime > 0.5;
  }, null, { timeout: 20000 });
}

async function state(page) {
  return page.locator('video').evaluate(v => ({
    controls: v.controls, muted: v.muted, loop: v.loop, inline: v.playsInline,
    pipDisabled: v.disablePictureInPicture, remoteDisabled: v.disableRemotePlayback,
    tabIndex: v.tabIndex, paused: v.paused, time: v.currentTime, duration: v.duration,
    error: v.error?.code || null, pointerEvents: getComputedStyle(v).pointerEvents,
    seekable: Array.from({ length: v.seekable.length }, (_, i) => [v.seekable.start(i), v.seekable.end(i)]),
  }));
}

const chrome = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    const context = await chrome.newContext({ viewport: { width, height: width > 768 ? 1000 : 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await settle(page);
    for (const src of await page.evaluate(() => Array.from(document.images).flatMap(i => [i.getAttribute('src'), ...(i.getAttribute('srcset') || '').split(',').map(s => s.trim().split(/\s+/)[0])]).filter(Boolean))) assetPaths.add(src);
    await openVideo(page);
    const initial = await state(page);
    assert.equal(initial.controls, false);
    assert.equal(initial.muted, true);
    assert.equal(initial.loop, true);
    assert.equal(initial.inline, true);
    assert.equal(initial.pipDisabled, true);
    assert.equal(initial.remoteDisabled, true);
    assert.equal(initial.tabIndex, -1);
    assert.equal(initial.error, null);
    assert.equal(await page.locator('.preparation-film button').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}`);
    const box = await page.locator('video').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await pause(800);
    const afterTap = await state(page);
    assert.equal(afterTap.paused, false, `A tap must not pause the film at ${width}`);
    assert.ok(afterTap.time > initial.time);
    assert.deepEqual(errors, []);
    await page.screenshot({ path: path.join(out, `page-${width}.png`), fullPage: true });
    await page.locator('.preparation-film').screenshot({ path: path.join(out, `video-${width}.png`) });
    results.layouts.push({ width, initial, afterTap, errors });
    await writeFile(path.join(out, 'progress.json'), JSON.stringify(results, null, 2));

    if (width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction(() => document.querySelector('video').paused);
      results.video.offscreen = await state(page);
      await openVideo(page);
      await page.locator('video').evaluate(v => {
        v.dataset.loops = '0';
        let previous = v.currentTime;
        v.addEventListener('timeupdate', () => {
          if (previous > v.duration * 0.8 && v.currentTime < v.duration * 0.2) v.dataset.loops = String(Number(v.dataset.loops) + 1);
          previous = v.currentTime;
        });
        v.playbackRate = 8;
      });
      await page.waitForFunction(() => Number(document.querySelector('video').dataset.loops) >= 1, null, { timeout: 15000 });
      await page.locator('video').evaluate(v => { v.playbackRate = 1; });
      results.video.afterLoop = await state(page);
      assert.equal(results.video.afterLoop.paused, false);
    }
    await context.close();
  }

  const reduced = await chrome.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await reduced.goto(base, { waitUntil: 'domcontentloaded' });
  await reduced.locator('video').scrollIntoViewIfNeeded();
  await pause(1200);
  results.video.reducedMotion = await state(reduced);
  assert.equal(results.video.reducedMotion.paused, true);
  assert.equal(results.video.reducedMotion.controls, false);
  await reduced.close();

  if (new URL(base).hostname === '127.0.0.1') {
    const page = await chrome.newPage({ viewport: { width: 390, height: 844 } });
    let fail = true;
    await page.route(`**${filmPath}`, route => fail ? route.abort('failed') : route.continue());
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.locator('video').scrollIntoViewIfNeeded();
    const retry = page.getByRole('button', { name: 'Повторить', exact: true });
    await retry.waitFor();
    results.video.failed = await state(page);
    await page.locator('.preparation-film').screenshot({ path: path.join(out, 'video-failed.png') });
    fail = false;
    await retry.click();
    await page.waitForFunction(() => !document.querySelector('video').paused && document.querySelector('video').currentTime > 0.5);
    await retry.waitFor({ state: 'hidden' });
    results.video.recovered = await state(page);
    await page.close();
  }
} finally { await chrome.close(); }

const ff = await firefox.launch({ headless: true });
try {
  for (const width of [1440, 375]) {
    const page = await ff.newPage({ viewport: { width, height: 900 } });
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await settle(page);
    await openVideo(page);
    const playback = await state(page);
    assert.equal(playback.controls, false);
    assert.equal(playback.error, null);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('.preparation-film').screenshot({ path: path.join(out, `firefox-video-${width}.png`) });
    results.layouts.push({ browser: 'firefox', width, playback });
    await page.close();
  }
} finally { await ff.close(); }

assetPaths.add('/media/web/film-poster-540.webp');
const assets = [...assetPaths].filter(s => s.startsWith('/'));
for (let i = 0; i < assets.length; i += 6) {
  await Promise.all(assets.slice(i, i + 6).map(async src => {
    const r = await fetch(new URL(src, base), { method: 'HEAD', signal: AbortSignal.timeout(20000) });
    const type = r.headers.get('content-type');
    results.http.push({ path: src, status: r.status, type });
    assert.equal(r.status, 200, src);
    assert.match(type, src.endsWith('.webp') ? /^image\/webp/ : src.endsWith('.jpg') ? /^image\/jpeg/ : /^image\//, src);
  }));
}
const ranges = ['bytes=0-1023', 'bytes=1048576-1049599', 'bytes=-1024'];
for (const range of ranges) {
  const r = await fetch(new URL(filmPath, base), { headers: { Range: range }, signal: AbortSignal.timeout(20000) });
  const bytes = (await r.arrayBuffer()).byteLength;
  results.http.push({ path: filmPath, range, status: r.status, bytes, contentRange: r.headers.get('content-range') });
  assert.equal(r.status, 206, range);
  assert.equal(bytes, 1024, range);
}
await writeFile(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify({ base, layouts: results.layouts.length, http: results.http.length, loop: results.video.afterLoop, errorRecovery: !!results.video.recovered, out }, null, 2));
