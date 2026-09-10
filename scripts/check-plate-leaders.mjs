import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localUrl = new URL(process.env.LOCAL_URL || "http://127.0.0.1:3004");
assert.equal(localUrl.protocol, "http:");
assert.ok(["localhost", "127.0.0.1"].includes(localUrl.hostname), "QA is restricted to localhost");
assert.equal(localUrl.username + localUrl.password, "");
const artifacts = path.join(root, "artifacts/plate-leaders-2026-09-11");
const runtime = path.join(artifacts, "runtime");
await mkdir(runtime, { recursive: true });
process.env.TMPDIR = runtime;
process.env.XDG_CACHE_HOME = path.join(runtime, "cache");
process.env.XDG_CONFIG_HOME = path.join(runtime, "config");
const profile = await mkdtemp(path.join(runtime, "geometry-profile-"));
const report = { url: localUrl.origin, startedAt: new Date().toISOString(), resizeOrder: [1440, 375, 1280, 1024, 768, 430, 390], results: [], externalRequests: [], pageErrors: [], passed: false };
const context = await chromium.launchPersistentContext(profile, {
  executablePath: process.env.CHROME_EXECUTABLE || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
  locale: "ru-RU",
  colorScheme: "light",
  deviceScaleFactor: 1,
  downloadsPath: path.join(runtime, "downloads"),
  tracesDir: path.join(runtime, "traces"),
  env: { ...process.env },
  args: ["--disable-background-networking", "--disable-component-update", "--disable-default-apps", "--no-first-run"],
});
await context.route("**/*", async route => {
  const url = new URL(route.request().url());
  if (["http:", "https:"].includes(url.protocol) && url.origin !== localUrl.origin) {
    report.externalRequests.push(url.href);
    return route.abort("blockedbyclient");
  }
  return route.continue();
});

function segmentIntersectsRect(a, b, rect) {
  let lower = 0;
  let upper = 1;
  for (const [axis, min, max] of [["x", rect.left - 2, rect.right + 2], ["y", rect.top - 2, rect.bottom + 2]]) {
    const delta = b[axis] - a[axis];
    if (Math.abs(delta) < 1e-9) {
      if (a[axis] < min || a[axis] > max) return false;
    } else {
      const near = (min - a[axis]) / delta;
      const far = (max - a[axis]) / delta;
      lower = Math.max(lower, Math.min(near, far));
      upper = Math.min(upper, Math.max(near, far));
      if (lower > upper) return false;
    }
  }
  return true;
}

async function inspect(page) {
  return page.locator(".menu-plate").evaluate(figure => {
    const figureRect = figure.getBoundingClientRect();
    const box = rect => ({ left: rect.left - figureRect.left, top: rect.top - figureRect.top, right: rect.right - figureRect.left, bottom: rect.bottom - figureRect.top, width: rect.width, height: rect.height });
    const textRects = element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return [...range.getClientRects()].filter(rect => rect.width && rect.height).map(box);
    };
    const labels = Object.fromEntries(["main", "side", "texture", "sauce"].map(name => {
      const element = figure.querySelector(`.plate-label-${name}`);
      return [name, { box: box(element.getBoundingClientRect()), title: textRects(element.querySelector("dt")), description: textRects(element.querySelector("dd")) }];
    }));
    const img = figure.querySelector(".menu-plate-photo");
    const photoRect = img.getBoundingClientRect();
    const scale = Math.min(photoRect.width / img.naturalWidth, photoRect.height / img.naturalHeight);
    const photo = { left: photoRect.left - figureRect.left + (photoRect.width - img.naturalWidth * scale) / 2, top: photoRect.top - figureRect.top + (photoRect.height - img.naturalHeight * scale) / 2, width: img.naturalWidth * scale, height: img.naturalHeight * scale };
    const svg = figure.querySelector(".plate-leaders");
    return {
      width: innerWidth,
      figure: box(figureRect),
      mobile: matchMedia("(max-width: 900px)").matches,
      svgCount: figure.querySelectorAll(".plate-leaders").length,
      svg: { box: box(svg.getBoundingClientRect()), viewBox: { x: svg.viewBox.baseVal.x, y: svg.viewBox.baseVal.y, width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height } },
      paths: [...svg.querySelectorAll("path")].map(element => ({ name: element.dataset.note, d: element.getAttribute("d") })),
      circles: [...svg.querySelectorAll("circle")].map(element => ({ name: element.dataset.note, x: element.cx.baseVal.value, y: element.cy.baseVal.value, radius: element.r.baseVal.value })),
      labels,
      photo,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
}

function checkGeometry(result, baseline) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  check(result.svgCount === 1 && result.paths.length === 4 && result.circles.length === 4, "Exactly one SVG, four leader paths and four endpoint circles are required");
  check(!result.horizontalOverflow, "Page has horizontal overflow");
  check(Math.abs(result.svg.viewBox.width - result.figure.width) < 0.5 && Math.abs(result.svg.viewBox.height - result.figure.height) < 0.5, "SVG coordinates must follow the measured figure after resize");
  check(Math.abs(result.svg.box.width - result.figure.width) < 0.5 && Math.abs(result.svg.box.height - result.figure.height) < 0.5, "SVG rendering box must equal the figure to preserve horizontal geometry");
  const names = ["main", "side", "texture", "sauce"];
  check(names.every(name => result.paths.filter(item => item.name === name).length === 1 && result.circles.filter(item => item.name === name).length === 1), "Every caption must have its own path and circle");
  result.measurements = [];
  for (const item of result.paths) {
    const values = item.d.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)?.map(Number);
    const commands = item.d.match(/[MLHVCSQTAZ]/gi)?.map(command => command.toUpperCase()).join("");
    check(commands === "MHL" && values?.length === 5 && values.every(Number.isFinite), `${item.name}: expected finite M/H/L geometry`);
    if (!names.includes(item.name) || commands !== "MHL" || values?.length !== 5) continue;
    const [startX, startY, elbowX, endX, endY] = values;
    const start = { x: startX, y: startY };
    const elbow = { x: elbowX, y: startY };
    const end = { x: endX, y: endY };
    const label = result.labels[item.name];
    const first = label.description[0];
    const last = label.description.at(-1);
    const upper = ["main", "side"].includes(item.name);
    const onLeft = ["main", "sauce"].includes(item.name);
    const desired = result.mobile
      ? { x: label.box.left + 2, y: upper ? last.bottom + 6 : label.title[0].top - 6 }
      : { x: onLeft ? first.right + 6 : first.left - 6, y: (first.top + first.bottom) / 2 };
    check(Math.abs(start.x - desired.x) <= 0.6 && Math.abs(start.y - desired.y) <= 0.6, `${item.name}: leader detached from the actual text edge; expected ${JSON.stringify(desired)}, actual ${JSON.stringify(start)}`);
    check(Math.abs(elbow.x - start.x) >= 20 && Math.abs(elbow.x - start.x) <= 40, `${item.name}: horizontal segment outside the 20–40px clear attachment range`);
    check(result.mobile ? elbow.x > start.x : onLeft === (elbow.x > start.x), `${item.name}: horizontal segment points away from the expected direction`);
    const circle = result.circles.find(candidate => candidate.name === item.name);
    check(circle && Math.hypot(circle.x - end.x, circle.y - end.y) <= 0.5, `${item.name}: endpoint circle detached from leader`);
    const normalizedEnd = { x: (end.x - result.photo.left) / result.photo.width, y: (end.y - result.photo.top) / result.photo.height };
    check(normalizedEnd.x > 0 && normalizedEnd.x < 1 && normalizedEnd.y > 0 && normalizedEnd.y < 1, `${item.name}: endpoint outside the contained photograph`);
    if (baseline[item.name]) check(Math.hypot(normalizedEnd.x - baseline[item.name].x, normalizedEnd.y - baseline[item.name].y) <= 0.002, `${item.name}: food target changes after resize`);
    else baseline[item.name] = normalizedEnd;
    for (const [otherName, otherLabel] of Object.entries(result.labels)) {
      for (const rect of [...otherLabel.title, ...otherLabel.description]) {
        check(!segmentIntersectsRect(start, elbow, rect) && !segmentIntersectsRect(elbow, end, rect), `${item.name}: line intersects ${otherName} text or its 2px clearance`);
      }
    }
    result.measurements.push({ name: item.name, start, elbow, end, anchor: desired, normalizedEnd });
  }
  return errors;
}

try {
  const page = await context.newPage();
  page.on("pageerror", error => report.pageErrors.push(error.message));
  const response = await page.goto(localUrl.href, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".menu-plate").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const image = document.querySelector(".menu-plate-photo");
    return image?.complete && image.naturalWidth > 0;
  });
  await page.locator(".menu-plate-photo").evaluate(image => image.decode());
  await page.waitForFunction(() => document.querySelectorAll(".menu-plate .plate-leaders path[data-note]").length === 4, null, { timeout: 30_000 });
  const baseline = {};
  for (const width of report.resizeOrder) {
    await page.setViewportSize({ width, height: width >= 1024 ? 1000 : 900 });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.waitForFunction(() => {
      const figure = document.querySelector(".menu-plate");
      const svg = figure.querySelector(".plate-leaders");
      return Math.abs(svg.viewBox.baseVal.width - figure.getBoundingClientRect().width) < 0.5;
    });
    const result = await inspect(page);
    result.errors = checkGeometry(result, baseline);
    result.passed = result.errors.length === 0;
    report.results.push(result);
    await page.locator(".menu-plate").screenshot({ path: path.join(artifacts, `geometry-${width}.png`), animations: "disabled" });
    console.log(`${width}px: ${result.passed ? "PASS" : `FAIL — ${result.errors.join("; ")}`}`);
  }
  report.passed = report.results.every(result => result.passed) && report.pageErrors.length === 0 && report.externalRequests.length === 0;
} catch (error) {
  report.error = error.stack || String(error);
  console.error(report.error);
} finally {
  report.completedAt = new Date().toISOString();
  await writeFile(path.join(artifacts, "geometry-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await context.close();
}
if (!report.passed) process.exitCode = 1;
