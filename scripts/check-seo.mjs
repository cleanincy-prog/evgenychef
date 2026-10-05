import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chef } from '../src/content.mjs';
import { pages, alternatePath } from '../src/pages.mjs';
import { site, absolute, escapeAttribute } from '../src/seo.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const localRoot = fileURLToPath(new URL('../public/', import.meta.url));
const preview = process.argv.includes('--preview');
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
const titles = new Set();
const descriptions = new Set();
const pagePaths = new Set(pages.map(page => page.path));
const documents = new Map(await Promise.all(pages.map(async page => [page.path, await readFile(resolve(root, `.${page.path}`, 'index.html'), 'utf8')])));

for (const page of pages) {
  const html = documents.get(page.path);
  const local = await readFile(resolve(localRoot, `.${page.path}`, 'index.html'), 'utf8');
  const oneMeta = name => {
    const values = [...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)">/g)].filter(match => match[1] === name);
    assert.equal(values.length, 1, `${page.path}: exactly one ${name}`);
    return values[0][2];
  };
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert(html.includes(`<title>${escapeAttribute(page.title)}</title>`));
  titles.add(page.title);
  descriptions.add(oneMeta('description'));
  assert.equal(oneMeta('description'), escapeAttribute(page.description));
  assert.equal(oneMeta('og:title'), escapeAttribute(page.title));
  assert.equal(oneMeta('twitter:description'), escapeAttribute(page.description));
  assert.equal(oneMeta('twitter:card'), 'summary_large_image');
  assert(html.includes(`<html lang="${page.language}"`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page.path}: one main heading`);
  assert(local.includes('<meta name="robots" content="noindex,nofollow">'));
  assert.equal(html.split('<body')[1], local.split('<body')[1], 'Preview and production must show the same content');
  const body = html.split('<body')[1];
  const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page.path}: duplicate IDs`);
  for (const match of body.matchAll(/href="([^"]+)"/g)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), absolute(page.path));
    if (target.origin !== site.origin) {
      assert.equal(target.hostname, 'www.instagram.com', 'Only the verified contact is external');
      continue;
    }
    if (target.pathname.startsWith('/media/')) {
      assert((await stat(resolve(root, `.${target.pathname}`))).isFile(), `Missing linked media: ${target.pathname}`);
      continue;
    }
    assert(pagePaths.has(target.pathname), `${page.path}: missing linked page ${target.pathname}`);
    if (target.hash) assert(documents.get(target.pathname).includes(`id="${target.hash.slice(1)}"`), `Missing anchor: ${target.href}`);
  }
  for (const match of html.matchAll(/(?:src|poster|data-src)="(\/[^"\s]+)"/g)) {
    assert((await stat(resolve(root, `.${match[1]}`))).isFile(), `Missing resource: ${match[1]}`);
  }
  if (page.language === 'en') {
    const text = body.replaceAll('Русский', '').replace(/<[^>]*>/g, '');
    assert(!/[А-Яа-яЁё]/.test(text), `${page.path}: untranslated English text`);
    assert(!/\b(?:alt|aria-label|title)="[^"]*[А-Яа-яЁё]/.test(body), 'Translate accessible labels and image descriptions');
  }
  if (page.kind === 'service') {
    assert(body.includes(escapeAttribute(page.h1)));
    assert(page.sections.length >= 3 && page.faq.length >= 3);
    for (const paragraph of page.sections.flatMap(section => section.paragraphs)) assert(body.includes(escapeAttribute(paragraph)), 'Service information must be rendered without JavaScript');
  }

  if (preview) {
    assert.equal(oneMeta('robots'), 'noindex,nofollow');
    assert(!html.includes('rel="canonical"'));
    assert(!html.includes('google-site-verification'));
    assert(!html.includes('application/ld+json'));
  } else {
    assert(!/noindex|nofollow|nosnippet/i.test(oneMeta('robots')));
    assert(oneMeta('robots').includes('max-image-preview:large'));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert(html.includes(`<link rel="canonical" href="${absolute(page.path)}">`));
    assert.equal(oneMeta('og:url'), absolute(page.path));
    assert.equal(oneMeta('google-site-verification'), site.googleVerification, 'Preserve Search Console ownership');
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)];
    assert.deepEqual(alternates.map(match => match[1]).sort(), ['en', 'ru', 'x-default']);
    for (const [, language, url] of alternates) {
      const expected = alternatePath(page, language === 'x-default' ? 'ru' : language);
      assert.equal(url, absolute(expected));
      assert(documents.get(expected).includes(`hreflang="${page.language}" href="${absolute(page.path)}"`), 'Language links must be reciprocal');
    }
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data['@context'], 'https://schema.org');
    const graph = data['@graph'];
    const entityIds = new Set(graph.map(node => node['@id']));
    assert.equal(entityIds.size, graph.length, 'Unique graph IDs');
    assert.equal(graph.filter(node => node['@type'] === 'Service').length, page.kind === 'home' ? 3 : 1);
    assert.deepEqual(graph.find(node => node['@type'] === 'Person').sameAs, [chef.instagram]);
    assert(!graph.some(node => ['LocalBusiness', 'Restaurant', 'Review', 'AggregateRating'].includes(node['@type'])), 'No invented business profile, reviews or ratings');
    const checkReferences = value => {
      if (!value || typeof value !== 'object') return;
      if (value['@id']) assert(entityIds.has(value['@id']), `Unresolved entity: ${value['@id']}`);
      Object.values(value).forEach(checkReferences);
    };
    checkReferences(data);
    for (const node of graph) {
      if (node['@type'] === 'Service') assert(pagePaths.has(new URL(node.url).pathname), 'Service URL must be a real page');
      for (const value of [node.image, node.contentUrl].filter(value => typeof value === 'string')) {
        const url = new URL(value);
        assert.equal(url.origin, site.origin);
        assert((await stat(resolve(root, `.${url.pathname}`))).size > 0, `Missing structured image: ${value}`);
      }
    }
    if (page.kind === 'service') assert.equal(graph.find(node => node['@type'] === 'BreadcrumbList').itemListElement.at(-1).item, absolute(page.path));
  }
}
assert.equal(titles.size, pages.length, 'Each page needs its own title');
assert.equal(descriptions.size, pages.length, 'Each page needs its own description');
if (preview) {
  assert(robots.includes('Disallow: /'));
  await assert.rejects(stat(resolve(root, 'sitemap.xml')), { code: 'ENOENT' });
} else {
  assert(robots.includes('Allow: /'));
  assert(!/^Disallow:\s*\//m.test(robots));
  assert(robots.includes(`Sitemap: ${site.origin}/sitemap.xml`));
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), pages.map(page => absolute(page.path)));
  assert(!/lastmod|changefreq|priority/.test(sitemap));
}
if (process.argv.includes('--http')) {
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
  for (const page of pages) {
    const response = await fetch(base + page.path);
    assert.equal(response.status, 200, page.path);
    assert(response.headers.get('content-type').includes('text/html'));
    assert((await response.text()).includes(`<html lang="${page.language}"`));
    if (page.path !== '/') {
      const redirect = await fetch(base + page.path.slice(0, -1), { redirect: 'manual' });
      assert.equal(redirect.status, 308, 'Normalize folder URLs');
      assert.equal(redirect.headers.get('location'), page.path);
    }
  }
  assert.equal((await fetch(base + '/en/no-such-page/')).status, 404);
  const module = await fetch(base + '/assets/ui-language.mjs');
  assert.equal(module.status, 200);
  assert(module.headers.get('content-type').includes('javascript'));
}
console.log(`SEO OK: ${pages.length} real pages; unique metadata, static content, language links, resources and ${preview ? 'preview exclusions' : 'canonical URLs, reciprocal hreflang, ownership, sitemap and structured data'}.`);
