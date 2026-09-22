import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
let release;
const ready = new Promise(resolve => { release = resolve; });
await page.route('**/media/conversation-playback-2026-09-22.mp4', async route => { await ready; await route.continue(); });
try {
  await page.goto('http://127.0.0.1:3004', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  const session = await page.context().newCDPSession(page);
  await session.send('Network.enable');
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.locator('#conversation-video').evaluate(video => {
    window.networkPlayback = { starts: [], waiting: [], ended: 0, scrollAt: 0 };
    video.addEventListener('playing', () => window.networkPlayback.starts.push(performance.now()));
    video.addEventListener('waiting', () => {
      if (window.networkPlayback.starts.length) window.networkPlayback.waiting.push({ at: video.currentTime, time: performance.now() });
    });
    video.addEventListener('ended', () => window.networkPlayback.ended++);
    const rect = video.getBoundingClientRect();
    scrollTo(0, scrollY + rect.top - innerHeight - 1200);
  });
  // Wait for development JS hydration before isolating media network speed.
  await page.waitForFunction(() => document.querySelector('#conversation-video').preload === 'auto');
  await session.send('Network.emulateNetworkConditions', { offline: false, latency: 100, downloadThroughput: 187500, uploadThroughput: 93750, connectionType: 'cellular4g' });
  release();
  await page.waitForTimeout(1500);
  await page.locator('#conversation-video').scrollIntoViewIfNeeded();
  await page.evaluate(() => { window.networkPlayback.scrollAt = performance.now(); });
  await page.waitForFunction(() => !document.querySelector('#conversation-video').paused, null, { timeout: 20000 });
  await page.waitForFunction(() => window.networkPlayback.ended === 2, null, { timeout: 35000 });
  const result = await page.locator('#conversation-video').evaluate(video => {
    const quality = video.getVideoPlaybackQuality();
    return { ...window.networkPlayback, readyState: video.readyState, paused: video.paused, time: video.currentTime,
      totalFrames: quality.totalVideoFrames, droppedFrames: quality.droppedVideoFrames,
      startDelayMs: window.networkPlayback.starts[0] - window.networkPlayback.scrollAt,
      connection: { megabitsPerSecond: 1.5, latencyMs: 100 } };
  });
  await writeFile('artifacts/conversation-playback-2026-09-22/network-report.json', JSON.stringify(result, null, 2));
  assert.equal(result.ended, 2);
  assert.equal(result.paused, true);
  assert.equal(result.waiting.filter(item => item.at > .1 && item.at < 9.9).length, 0, 'No stalls within either playback on the throttled connection');
  console.log(JSON.stringify(result, null, 2));
} catch(error) {
  console.log(await page.locator('#conversation-video').evaluate(v=>({events:window.networkPlayback,paused:v.paused,ready:v.readyState,network:v.networkState,error:v.error?.message,buffer:[...Array(v.buffered.length)].map((_,i)=>[v.buffered.start(i),v.buffered.end(i)]),preload:v.preload,rect:v.getBoundingClientRect().toJSON(),hidden:document.hidden})));
  throw error;
} finally { release(); await browser.close(); }
