import assert from "node:assert/strict";
import test, { before } from "node:test";

const base = new URL(process.env.LOCAL_URL || "http://127.0.0.1:3004");
assert.equal(base.protocol, "http:", "QA is restricted to local HTTP");
assert.ok(["127.0.0.1", "localhost"].includes(base.hostname), "QA must never target a public site");
assert.equal(base.username + base.password, "");
const instagram = "https://www.instagram.com/evg.chef/";
let html;
let homeResponse;

function decode(value = "") {
  return value.replace(/&(?:amp|lt|gt|quot|apos|nbsp);|&#(?:x[0-9a-f]+|\d+);/gi, entity => {
    const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " " };
    if (named[entity]) return named[entity];
    return String.fromCodePoint(entity.startsWith("&#x") ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10));
  });
}

// These helpers inspect the actual SSR response, not source files or CSS details.
function tags(markup, tag) {
  return [...markup.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))].map(match => {
    const attributes = {};
    for (const attr of match[1].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attributes[attr[1].toLowerCase()] = decode(attr[2] ?? attr[3] ?? attr[4] ?? "");
    }
    return attributes;
  });
}
function visibleText(markup) {
  return decode(markup.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}
async function localFetch(path, options = {}) {
  const url = new URL(path, base);
  assert.equal(url.origin, base.origin, "All HTTP checks must remain on the local server");
  return fetch(url, { ...options, redirect: "error", signal: AbortSignal.timeout(30_000) });
}

before(async () => {
  try {
    homeResponse = await localFetch("/");
    assert.equal(homeResponse.status, 200, "The localhost page must render successfully");
    html = await homeResponse.text();
  } catch (error) {
    throw new Error(`Start the independent local copy with npm run dev before running HTTP tests (${base.origin}).`, { cause: error });
  }
});

test("serves the approved evening page as accessible Russian HTML", () => {
  assert.ok(homeResponse.headers.get("content-type")?.includes("text/html"));
  assert.equal(tags(html, "html")[0]?.lang, "ru");
  assert.equal(tags(html, "h1").length, 1, "A single page identity is required");
  const text = visibleText(html);
  for (const expected of ["Евгений", "Грыбенюк", "Mise en place", "Разговор", "Меню", "Подготовка", "Ваш вечер", "Начнём с вашего вечера", "Основной продукт", "Гарнир", "Текстуры", "Соус"]) {
    assert.ok(text.toLocaleLowerCase("ru").includes(expected.toLocaleLowerCase("ru")), `Missing rendered content: ${expected}`);
  }
  assert.ok(text.includes("В первом сообщении укажите дату, число гостей и формат"));
  assert.ok(!text.includes("до 20 гостей"), "The prototype must not invent guest capacity");
  const steps = [...html.matchAll(/\bdata-step="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(steps, ["01", "02", "03", "04"]);
});

test("keeps the loopback preview private while advertising the public canonical site", async () => {
  assert.match(homeResponse.headers.get("x-robots-tag") || "", /noindex/i);
  const robotsMeta = tags(html, "meta").find(tag => tag.name?.toLowerCase() === "robots");
  assert.doesNotMatch(robotsMeta?.content || "", /noindex|nofollow/i);
  assert.match(robotsMeta?.content || "", /index/i);
  const canonical = tags(html, "link").find(tag => tag.rel === "canonical");
  assert.equal(new URL(canonical?.href || "").href, "https://evgenychef.com/");
  const robotsResponse = await localFetch("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /^Allow:\s*\//im);
  assert.doesNotMatch(robots, /^Disallow:\s*\//im);
  assert.match(robots, /Sitemap:\s*https:\/\/evgenychef\.com\/sitemap\.xml/i);
  const sitemap = await localFetch("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /<loc>https:\/\/evgenychef\.com\/<\/loc>/i);
});

test("provides only functional page anchors and the exact Instagram destination", () => {
  const anchors = tags(html, "a");
  assert.ok(anchors.length > 0);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1])));
  for (const anchor of anchors) {
    assert.ok(anchor.href?.startsWith("#") || anchor.href === instagram, `Unexpected link: ${anchor.href}`);
    if (anchor.href?.startsWith("#") && anchor.href.length > 1) assert.ok(ids.has(decodeURIComponent(anchor.href.slice(1))), `Missing anchor target: ${anchor.href}`);
    if (anchor.target === "_blank") assert.match(anchor.rel || "", /noopener|noreferrer/);
  }
  assert.ok(anchors.some(anchor => anchor.href === instagram));
  assert.equal(tags(html, "form").length, 0, "This page must not send an automatic inquiry");
});

test("renders 63 independent documentary collage photos and the real project assets", async () => {
  const imageTags = tags(html, "img");
  const collage = [...html.matchAll(/<[^>]+\bclass="[^"]*\bcollage-tile\b[^"]*"[^>]*>[\s\S]*?<img\b([^>]*)>/g)]
    .map(match => tags(`<img ${match[1]}>`, "img")[0]);
  assert.equal(collage.length, 63, "The requested full collage requires 63 DOM photos");
  assert.equal(new Set(collage.map(img => img.src)).size, 63, "Collage photos may not repeat");
  for (const image of collage) {
    assert.doesNotMatch(image.src, /hero-film-still|hero-collage\/|hero-plating-poster|chef-environment-poster|gallery-cooking|instagram-(?:2[1-9]|3[0-2])\.webp/, "Extracted video frames must not return to the collage");
  }
  const required = [
    "/media/chef-hero-apron.jpg",
    "/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg",
    "/media/menu/personal-menu-duck-plate-cream-v2.webp",
  ];
  for (const path of required) assert.ok(imageTags.some(img => img.src === path), `Missing real asset: ${path}`);
  for (const img of imageTags) assert.ok(Object.hasOwn(img, "alt"), `Image requires alt, including decorative empty alt: ${img.src}`);
  await Promise.all([...new Set([...collage.map(img => img.src), ...required])].map(async path => {
    const response = await localFetch(path, { method: "HEAD" });
    assert.equal(response.status, 200, `Image must be available: ${path}`);
    assert.match(response.headers.get("content-type") || "", /^image\//);
  }));
});

test("serves the original documentary video and poster with usable byte ranges", async () => {
  const videos = tags(html, "video");
  assert.equal(videos.length, 1);
  assert.equal(videos[0].poster, "/media/chef-story-img-5399-poster.jpg");
  assert.ok(!Object.hasOwn(videos[0], "autoplay"), "The film starts on an explicit user action");
  assert.ok(Object.hasOwn(videos[0], "playsinline"));
  const videoPath = "/media/chef-story-img-5399-no-grill.mp4";
  assert.ok(tags(html, "source").some(source => source.src === videoPath && source.type === "video/mp4"));
  const poster = await localFetch(videos[0].poster, { method: "HEAD" });
  assert.equal(poster.status, 200);
  const video = await localFetch(videoPath, { headers: { Range: "bytes=0-1023" } });
  assert.equal(video.status, 206, "Video range requests must support seeking");
  assert.match(video.headers.get("content-type") || "", /^video\/mp4/);
  assert.match(video.headers.get("content-range") || "", /^bytes 0-1023\/\d+$/);
  assert.equal((await video.arrayBuffer()).byteLength, 1024);
});
