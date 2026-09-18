import assert from "node:assert/strict";
import test, { before } from "node:test";
import { readFile } from "node:fs/promises";

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
  for (const expected of ["Евгений", "Гребеник", "Знакомимся", "Продумываю меню", "Готовлю к встрече", "Ваш вечер", "Из нашего разговора складывается меню. Я выбираю продукты и продумываю, какие блюда приготовить и как они будут сочетаться между собой."]) {
    assert.ok(text.toLocaleLowerCase("ru").includes(expected.toLocaleLowerCase("ru")), `Missing rendered content: ${expected}`);
  }
  assert.doesNotMatch(text, /В первом сообщении укажите дату и формат/i);
  assert.doesNotMatch(text, /Частые вопросы|стоимость|€|число гостей|количество гостей|состав группы|сколько будет гостей|\d+[–-]\d+ гостей/i, "Removed FAQ, prices and guest counts must not return");
  assert.doesNotMatch(html, /id="faq"|class="faq-q"/);
  const steps = [...html.matchAll(/\bdata-step="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(steps, ["01", "02", "03", "04"]);
});

test("shares a consistent chef identity, service description and readable new preview asset", async () => {
  const meta = new Map(tags(html, "meta").map(tag => [tag.property || tag.name, tag.content]));
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  assert.match(title, /Евгений Гребеник.*частный шеф на Кипре/);
  assert.doesNotMatch(title, /План вечера|Mise en place/);
  assert.equal(meta.get("og:title"), title);
  assert.equal(meta.get("twitter:title"), title);
  assert.match(meta.get("description"), /Частные ужины, приватные мероприятия и мастер-классы на Кипре/);
  assert.equal(meta.get("og:description"), meta.get("description"));
  assert.equal(meta.get("twitter:description"), meta.get("description"));
  assert.equal(meta.get("og:locale"), "ru_RU");
  assert.equal(meta.get("og:site_name"), "Евгений Гребеник");
  assert.equal(meta.get("twitter:card"), "summary_large_image");
  const image = new URL(meta.get("og:image"));
  assert.equal(image.origin, "https://evgenychef.com");
  assert.equal(meta.get("twitter:image"), image.href);
  assert.doesNotMatch(image.pathname, /og-grebenik\.png$/);
  assert.match(meta.get("og:image:alt"), /Гребеник/);
  assert.equal(meta.get("twitter:image:alt"), meta.get("og:image:alt"));
  const response = await localFetch(image.pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^image\/png/);
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), Number(meta.get("og:image:width")));
  assert.equal(png.readUInt32BE(20), Number(meta.get("og:image:height")));
  assert.ok(png.length < 5_000_000, "Preview should stay within a modest download size");
  const icon = tags(html, "link").find(tag => tag.rel === "icon");
  const iconResponse = await localFetch(new URL(icon.href, base).pathname);
  assert.equal(iconResponse.status, 200);
  assert.match(iconResponse.headers.get("content-type"), /^image\/svg\+xml/);
  assert.match(await iconResponse.text(), /aria-label="Евгений Гребеник"/);
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

test("provides functional page anchors and the exact Instagram destination", () => {
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

test("renders 63 documentary collage photos and the selected chef illustration without a food photograph", async () => {
  const imageTags = tags(html, "img");
  const collage = [...html.matchAll(/<[^>]+\bclass="[^"]*\bcollage-tile\b[^"]*"[^>]*>[\s\S]*?<img\b([^>]*)>/g)]
    .map(match => tags(`<img ${match[1]}>`, "img")[0]);
  assert.equal(collage.length, 63, "The requested full collage requires 63 DOM photos");
  assert.equal(new Set(collage.map(img => img.src)).size, 63, "Collage photos may not repeat");
  for (const image of collage) {
    assert.doesNotMatch(image.src, /hero-film-still|hero-collage\/|hero-plating-poster|chef-environment-poster|gallery-cooking|instagram-(?:2[1-9]|3[0-2])\.webp/, "Extracted video frames must not return to the collage");
  }
  const required = [
    "/media/web/chef-hero-apron-576.webp",
    "/media/web/masterchef-640.webp",
    "/media/menu/chef-planning/scene-960.webp",
    "/media/web/masterclasses-1144.jpg",
  ];
  for (const path of required) assert.ok(imageTags.some(img => img.src === path), `Missing real asset: ${path}`);
  for (const img of imageTags) assert.ok(Object.hasOwn(img, "alt"), `Image requires alt, including decorative empty alt: ${img.src}`);
  const imagePaths = imageTags.flatMap(img => {
    assert.ok(Number(img.width) > 0 && Number(img.height) > 0, `Image requires intrinsic dimensions: ${img.src}`);
    if (!img.src.endsWith(".svg") && Number(img.width) > 320) assert.ok(img.srcset && img.sizes, `Large photographic image requires responsive source choices: ${img.src}`);
    return [img.src, ...(img.srcset || "").split(",").filter(Boolean).map(source => source.trim().split(/\s+/)[0])];
  });
  const uniqueImagePaths = [...new Set(imagePaths)];
  // Keep local HTTP concurrency bounded while checking every responsive variant.
  for (let start = 0; start < uniqueImagePaths.length; start += 8) {
    await Promise.all(uniqueImagePaths.slice(start, start + 8).map(async path => {
      assert.match(path, /^\/media\/(?:web\/.+\.(?:webp|jpg)|menu\/personal-menu-duck-plate-cream-v2\.webp|menu\/(?:book|exploded|worktable|chef-planning)\/[a-z0-9-]+\.(?:webp|svg))$/, `Page images must use optimized local media: ${path}`);
      const response = await localFetch(path, { method: "HEAD" });
      assert.equal(response.status, 200, `Image must be available: ${path}`);
      assert.match(response.headers.get("content-type") || "", path.endsWith(".svg") ? /^image\/svg\+xml/ : path.endsWith(".jpg") ? /^image\/jpeg/ : /^image\/webp/);
    }));
  }
  const chefScene = imageTags.filter(img => img.src.includes("/menu/chef-planning/"));
  assert.equal(chefScene.length, 1, "The selected chef illustration must appear once");
  assert.match(chefScene[0].alt, /Евгений составляет меню в тетради/);
  assert.equal(imageTags.filter(img => img.src.includes("/menu/worktable/")).length, 0, "The rejected food photograph and ingredient montage must not return");
  assert.ok(!visibleText(html).includes("Фото блюда"), "The removed dish must not retain a photo action");
  assert.doesNotMatch(html, /data-recipe="octopus"|data-grams=|class="mb-(?:pencil|stroke|navigation)"|data-menu-(?:scroll|sketch|color|next)/);

});

test("serves the shortened looping inline film without playback controls and with usable byte ranges", async () => {
  const videos = tags(html, "video");
  assert.equal(videos.length, 1);
  assert.equal(videos[0].poster, "/media/web/film-poster-540.webp");
  assert.ok(!Object.hasOwn(videos[0], "autoplay"), "Viewport playback must not begin offscreen through the autoplay attribute");
  assert.ok(Object.hasOwn(videos[0], "playsinline"));
  assert.ok(!Object.hasOwn(videos[0], "controls"), "The film must not expose pause, seeking or other player controls");
  assert.ok(Object.hasOwn(videos[0], "muted"));
  assert.ok(Object.hasOwn(videos[0], "loop"));
  assert.ok(Object.hasOwn(videos[0], "disablepictureinpicture"));
  assert.ok(Object.hasOwn(videos[0], "disableremoteplayback"));
  assert.equal(videos[0].tabindex, "-1");
  assert.equal(videos[0].preload, "metadata");
  assert.doesNotMatch(visibleText(html), /Смотреть фильм/i);
  const videoPath = "/media/chef-story-short-prep-2026-09-12.mp4";
  assert.equal(videos[0].src, videoPath);
  const poster = await localFetch(videos[0].poster, { method: "HEAD" });
  assert.equal(poster.status, 200);
  const original = await readFile(new URL(`../public${videoPath}`, import.meta.url));
  for (const [range, start, end] of [
    ["bytes=0-1023", 0, 1023],
    ["bytes=1048576-1049599", 1048576, 1049599],
    ["bytes=-1024", original.length - 1024, original.length - 1],
  ]) {
    const video = await localFetch(videoPath, { headers: { Range: range } });
    assert.equal(video.status, 206, range);
    assert.match(video.headers.get("content-type") || "", /^video\/mp4/);
    assert.equal(video.headers.get("content-range"), `bytes ${start}-${end}/${original.length}`);
    assert.deepEqual(Buffer.from(await video.arrayBuffer()), original.subarray(start, end + 1), `Wrong video fragment for ${range}`);
  }
  const invalid = await localFetch(videoPath, { headers: { Range: `bytes=${original.length}-` } });
  assert.equal(invalid.status, 416);
});
