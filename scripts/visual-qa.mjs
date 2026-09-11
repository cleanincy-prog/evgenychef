import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localUrl = new URL(process.env.LOCAL_URL || "http://127.0.0.1:3004");
assert.equal(localUrl.protocol, "http:");
assert.ok(["localhost", "127.0.0.1"].includes(localUrl.hostname), "Visual QA is restricted to localhost");
assert.equal(localUrl.username + localUrl.password, "");
const artifacts = path.join(root, "artifacts/photos-only-collage-2026-09-11");
const temporary = path.join(root, "work/.tmp");
await mkdir(artifacts, { recursive: true });
await mkdir(temporary, { recursive: true });
// Playwright and Node also create launch artifacts before Chrome starts.
process.env.TMPDIR = temporary;
process.env.XDG_CACHE_HOME = path.join(temporary, "cache");
process.env.XDG_CONFIG_HOME = path.join(temporary, "config");
const profile = await mkdtemp(path.join(temporary, "chrome-profile-"));
const chrome = process.env.CHROME_EXECUTABLE || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const report = { url: localUrl.origin, startedAt: new Date().toISOString(), browser: chrome, profile, viewports: [], errorFallback: null, passed: false };
const failures = [];
const context = await chromium.launchPersistentContext(profile, {
  executablePath: chrome,
  headless: true,
  reducedMotion: "reduce",
  locale: "ru-RU",
  colorScheme: "light",
  deviceScaleFactor: 1,
  downloadsPath: path.join(temporary, "downloads"),
  tracesDir: path.join(temporary, "traces"),
  viewport: { width: 1440, height: 1000 },
  env: { ...process.env, TMPDIR: temporary, XDG_CACHE_HOME: path.join(temporary, "cache"), XDG_CONFIG_HOME: path.join(temporary, "config") },
  args: ["--disable-background-networking", "--disable-component-update", "--disable-default-apps", "--no-first-run"],
});
await context.route("**/*", async route => {
  const url = new URL(route.request().url());
  if (["http:", "https:"].includes(url.protocol) && url.origin !== localUrl.origin) return route.abort("blockedbyclient");
  return route.continue();
});

function verify(condition, message) {
  if (!condition) throw new Error(message);
}
async function settleImages(page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize().height;
  for (let y = 0; y < height; y += Math.round(viewportHeight * 0.8)) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
  await page.waitForFunction(() => [...document.images].every(img => {
    const style = getComputedStyle(img);
    const box = img.getBoundingClientRect();
    return box.width === 0 || box.height === 0 || style.visibility === "hidden" || (img.complete && img.naturalWidth > 0);
  }), null, { timeout: 25_000 });
  await page.evaluate(async () => {
    await Promise.all([...document.images].filter(img => img.getClientRects().length && img.complete).map(img => img.decode().catch(() => {})));
    window.scrollTo(0, 0);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function inspectLayout(page) {
  return page.evaluate(() => {
    const visible = element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const box = element => {
      const r = element.getBoundingClientRect();
      return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height, right: r.right, bottom: r.bottom + scrollY };
    };
    const collage = [...document.querySelectorAll(".collage-tile img")];
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map(h => ({ level: Number(h.tagName[1]), text: h.innerText.replace(/\s+/g, " ").trim() }));
    const stations = [...document.querySelectorAll(".process-station[data-step]")].map(station => ({ step: station.dataset.step, text: station.querySelector("h3,h2")?.textContent?.trim(), box: box(station) }));
    const plate = document.querySelector(".menu-plate-photo");
    const plateBox = plate ? box(plate) : null;
    const clips = [];
    if (plate) for (let parent = plate.parentElement; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      const parentBox = box(parent);
      if (["hidden", "clip"].includes(style.overflowX) && (plateBox.x < parentBox.x - 1 || plateBox.right > parentBox.right + 1)) clips.push({ element: parent.className, axis: "x" });
      if (["hidden", "clip"].includes(style.overflowY) && (plateBox.y < parentBox.y - 1 || plateBox.bottom > parentBox.bottom + 1)) clips.push({ element: parent.className, axis: "y" });
    }
    const oversized = [...document.body.querySelectorAll("*")].filter(el => visible(el) && !el.classList.contains("skip-link") && !el.closest("svg")).map(el => ({ element: `${el.tagName.toLowerCase()}.${el.className}`, rect: box(el) })).filter(item => item.rect.x < -1 || item.rect.right > innerWidth + 1).slice(0, 20);
    const video = document.querySelector("video");
    const poster = video?.getAttribute("poster");
    return {
      viewport: { width: innerWidth, height: innerHeight },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      bodyWidth: document.body.scrollWidth,
      oversized,
      headings,
      stations,
      collage: { total: collage.length, unique: new Set(collage.map(img => img.getAttribute("src"))).size, visible: collage.filter(visible).length, visibleUnique: new Set(collage.filter(visible).map(img => img.getAttribute("src"))).size },
      images: [...document.images].filter(visible).map(img => ({ src: img.getAttribute("src"), loaded: img.complete && img.naturalWidth > 0, altPresent: img.hasAttribute("alt") })),
      plate: plate ? { source: plate.getAttribute("src"), box: plateBox, intrinsic: [plate.naturalWidth, plate.naturalHeight], objectFit: getComputedStyle(plate).objectFit, clips } : null,
      links: [...document.querySelectorAll("a")].map(a => ({ href: a.getAttribute("href"), text: a.innerText.trim(), targetExists: !a.hash || a.hash === "#" || !!document.getElementById(decodeURIComponent(a.hash.slice(1))) })),
      video: video ? { source: video.querySelector("source")?.getAttribute("src") || video.getAttribute("src"), poster, autoplay: video.autoplay, paused: video.paused, controls: video.controls, playsInline: video.playsInline } : null,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  });
}

async function checkKeyboard(page, width) {
  const button = page.locator(".instagram-button");
  verify(await button.count() === 1, "One final Instagram button is required");
  await page.evaluate(() => {
    document.body.tabIndex = -1;
    document.body.focus();
    document.body.removeAttribute("tabindex");
    window.scrollTo(0, 0);
  });
  let reached = false;
  for (let index = 0; index < 40; index++) {
    await page.keyboard.press("Tab");
    if (await button.evaluate(el => document.activeElement === el)) { reached = true; break; }
  }
  verify(reached, "The Instagram button must be reachable with Tab");
  const focus = await button.evaluate(el => ({ focusVisible: el.matches(":focus-visible"), outlineStyle: getComputedStyle(el).outlineStyle, outlineWidth: getComputedStyle(el).outlineWidth, rect: { width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height } }));
  verify(focus.focusVisible, "Keyboard focus must be recognized as :focus-visible");
  verify(focus.outlineStyle !== "none" && parseFloat(focus.outlineWidth) > 0, "Instagram button requires a visible keyboard outline");
  verify(focus.rect.width >= 44 && focus.rect.height >= 44, "Instagram target must be at least 44 × 44 CSS px");
  if (width === 1440 || width === 390) await page.screenshot({ path: path.join(artifacts, `focus-${width}.png`) });
  return focus;
}

async function checkVideo(page) {
  const video = page.locator("video");
  await video.scrollIntoViewIfNeeded();
  verify(await video.evaluate(el => el.paused && !el.autoplay), "Documentary video must initially wait for user intent");
  const startButton = page.getByRole("button", { name: /Смотреть фильм/i });
  verify(await startButton.count() === 1, "A clear film-start control is required");
  await startButton.click();
  await page.waitForFunction(() => {
    const video = document.querySelector("video");
    return video && !video.paused && video.currentTime > 0.2 && video.videoWidth > 0;
  }, null, { timeout: 30_000 });
  const start = await video.evaluate(el => ({ time: el.currentTime, controls: el.controls, videoWidth: el.videoWidth, videoHeight: el.videoHeight, duration: el.duration, currentSrc: el.currentSrc }));
  verify(start.controls, "Native playback controls must become available after starting the film");
  await page.waitForFunction(startTime => document.querySelector("video").currentTime > startTime + 0.25, start.time, { timeout: 10_000 });
  await video.evaluate(el => el.pause());
  const paused = await video.evaluate(el => ({ paused: el.paused, time: el.currentTime, error: el.error?.message ?? null }));
  verify(paused.paused && paused.time > start.time && !paused.error, "Real media playback must advance and pause cleanly");
  return { ...start, paused };
}

try {
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    const page = await context.newPage();
    const pageErrors = [];
    const failedLocalRequests = [];
    const cancelledLocalRequests = [];
    const externalRequests = [];
    const httpErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    page.on("request", request => { if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== localUrl.origin) externalRequests.push(request.url()); });
    page.on("requestfailed", request => {
      if (new URL(request.url()).origin !== localUrl.origin) return;
      const item = { url: request.url(), error: request.failure()?.errorText };
      (item.error?.includes("ERR_ABORTED") ? cancelledLocalRequests : failedLocalRequests).push(item);
    });
    page.on("response", response => { if (new URL(response.url()).origin === localUrl.origin && response.status() >= 400) httpErrors.push({ url: response.url(), status: response.status() }); });
    const record = { width, passed: false, pageErrors, failedLocalRequests, cancelledLocalRequests, externalRequests, httpErrors };
    report.viewports.push(record);
    try {
      await page.setViewportSize({ width, height: width >= 1024 ? 1000 : 900 });
      const response = await page.goto(localUrl.href, { waitUntil: "networkidle", timeout: 45_000 });
      verify(response?.status() === 200, "Local page response must be 200");
      await settleImages(page);
      verify(response.headers()["x-robots-tag"]?.includes("noindex"), "Local response requires noindex header");
      record.layout = await inspectLayout(page);
      const layout = record.layout;
      verify(layout.reducedMotion, "Reduced-motion preference must be active for reproducible capture");
      verify(layout.document.width <= width && layout.bodyWidth <= width, `Horizontal page overflow at ${width}px: document ${layout.document.width}, body ${layout.bodyWidth}`);
      verify(layout.oversized.length === 0, `Elements extend beyond the viewport: ${JSON.stringify(layout.oversized)}`);
      verify(layout.headings.filter(h => h.level === 1).length === 1, "Exactly one visible h1 is required");
      verify(layout.headings.some(h => h.text.includes("От разговора") && h.text.includes("к вашему столу")), "The process heading must remain live readable text");
      verify(layout.headings.some(h => h.text.includes("Начнём с вашего вечера")), "The closing invitation must be present");
      verify(layout.headings.every((h, i, items) => i === 0 || h.level <= items[i - 1].level + 1), "Heading levels must not skip a semantic level");
      assert.deepEqual(layout.stations.map(s => s.step), ["01", "02", "03", "04"]);
      assert.deepEqual(layout.stations.map(s => s.text), ["Разговор", "Меню", "Подготовка", "Ваш вечер"]);
      if (width <= 900) verify(layout.stations.every((station, index, items) => index === 0 || station.box.y >= items[index - 1].box.bottom - 1), "Tablet and mobile process stations must follow a vertical reading order");
      const expectedVisible = 63;
      verify(layout.collage.total === 63 && layout.collage.unique === 63, "The full collage requires exactly 63 unique DOM photo sources");
      verify(layout.collage.visible === expectedVisible && layout.collage.visibleUnique === expectedVisible, `Expected ${expectedVisible} unique visible collage photos, got ${JSON.stringify(layout.collage)}`);
      verify(layout.images.every(img => img.loaded && img.altPresent), "Every rendered image must load and have an alt attribute");
      verify(layout.plate?.source === "/media/web/duck-plate-960.webp", "The real cutout plate must be used");
      verify(layout.plate.objectFit === "contain", "The plate must use object-fit: contain");
      verify(layout.plate.box.x >= -1 && layout.plate.box.right <= width + 1 && layout.plate.clips.length === 0, "The complete plate must fit without clipping");
      verify(layout.links.every(link => link.href?.startsWith("#") || link.href === "https://www.instagram.com/evg.chef/"), "All links must target page anchors or the exact Instagram account");
      verify(layout.links.every(link => link.targetExists), "Every internal link target must exist");
      verify(layout.video?.source === "/media/chef-story-img-5399-no-grill.mp4" && layout.video.poster === "/media/web/film-poster-540.webp", "The original film and poster must be retained");
      verify(layout.video.playsInline && !layout.video.autoplay && layout.video.paused, "The film must be inline and user initiated");
      await page.screenshot({ path: path.join(artifacts, `page-${width}.png`), fullPage: true, animations: "disabled" });
      await page.locator('.hero').screenshot({ path: path.join(artifacts, `hero-${width}.png`), animations: "disabled" });
      record.keyboard = await checkKeyboard(page, width);
      if (width === 1440) record.playback = await checkVideo(page);
      verify(pageErrors.length === 0, `Browser errors: ${JSON.stringify(pageErrors)}`);
      verify(failedLocalRequests.length === 0 && httpErrors.length === 0, `Failed local requests: ${JSON.stringify({ failedLocalRequests, httpErrors })}`);
      verify(externalRequests.length === 0, `The page attempted external network requests: ${externalRequests.join(", ")}`);
      record.passed = true;
      console.log(`${width}px: PASS`);
    } catch (error) {
      record.error = error.stack || String(error);
      failures.push(`${width}px: ${error.message}`);
      await page.screenshot({ path: path.join(artifacts, `page-${width}.png`), fullPage: true, animations: "disabled" }).catch(() => {});
      console.error(`${width}px: FAIL — ${error.message}`);
    } finally {
      page.removeAllListeners("requestfailed");
      page.removeAllListeners("response");
      await page.close();
    }
  }

  // Exercise the media error path separately, so the deliberate 404 does not
  // contaminate the successful-page network audit above.
  const fallbackPage = await context.newPage();
  try {
    await fallbackPage.setViewportSize({ width: 390, height: 900 });
    await fallbackPage.route("**/chef-story-img-5399-no-grill.mp4", route => route.fulfill({ status: 404, contentType: "text/plain", body: "Deliberate local QA media failure" }));
    await fallbackPage.goto(localUrl.href, { waitUntil: "networkidle" });
    const film = fallbackPage.locator("video");
    await film.scrollIntoViewIfNeeded();
    const before = await film.evaluate(el => ({ text: el.parentElement?.innerText || "", poster: el.getAttribute("poster") }));
    await fallbackPage.getByRole("button", { name: /Смотреть фильм/i }).click();
    await fallbackPage.waitForFunction(() => {
      const video = document.querySelector("video");
      return !video || !!video.error || !!document.querySelector("[data-video-error]");
    }, null, { timeout: 15_000 });
    const after = await fallbackPage.evaluate(() => {
      const video = document.querySelector("video");
      const fallback = document.querySelector("[data-video-error]") || [...document.querySelectorAll('[role="status"], [role="alert"]')].find(el => el.getBoundingClientRect().height > 0);
      return { videoPresent: !!video, poster: video?.getAttribute("poster"), error: video?.error?.message || null, fallbackText: fallback?.textContent?.trim() || "", localText: video?.parentElement?.innerText || "" };
    });
    report.errorFallback = { simulatedHttpStatus: 404, before, after, present: !!after.fallbackText || after.localText !== before.text };
    verify(after.poster === before.poster || !after.videoPresent, "Media failure must preserve the original poster or present a fallback");
    await fallbackPage.screenshot({ path: path.join(artifacts, "video-error-fallback.png") });
    await fallbackPage.unroute("**/chef-story-img-5399-no-grill.mp4");
    await fallbackPage.getByRole("button", { name: "Повторить" }).click();
    await fallbackPage.waitForFunction(() => {
      const video = document.querySelector("video");
      return video && video.readyState >= 2 && !video.paused && video.currentTime > 0.25;
    }, null, { timeout: 20_000 });
    report.errorFallback.retryRecovered = await film.evaluate(el => el.controls && !el.error);
    verify(report.errorFallback.retryRecovered, "Retry must recover real playback after the media becomes available");
    await film.evaluate(el => el.pause());
    if (report.errorFallback.present) console.log("Video error fallback: exercised");
    else console.log("Video error fallback: no separate fallback UI detected; original poster retained");
  } catch (error) {
    report.errorFallback = { error: error.message };
    failures.push(`Video error path: ${error.message}`);
  } finally { await fallbackPage.close(); }
} finally {
  await context.close();
  report.completedAt = new Date().toISOString();
  report.failures = failures;
  report.passed = failures.length === 0 && report.viewports.length === 7;
  await writeFile(path.join(artifacts, "qa-report.json"), JSON.stringify(report, null, 2) + "\n");
}
console.log(`Saved screenshots and QA report: ${artifacts}`);
if (!report.passed) process.exitCode = 1;
