import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chef, formats } from '../src/content.mjs';
import { site } from '../src/seo.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const preview = process.argv.includes('--preview');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const local = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
const meta = name => [...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)">/g)]
  .filter(match => match[1] === name).map(match => match[2]);
const oneMeta = name => {
  const values = meta(name);
  assert.equal(values.length, 1, `Exactly one ${name}`);
  return values[0];
};
assert.equal((html.match(/<title>/g) || []).length, 1);
assert(html.includes(`<title>${chef.title}</title>`));
assert.equal(oneMeta('description'), chef.description);
assert.equal(oneMeta('og:title'), chef.title);
assert.equal(oneMeta('twitter:description'), chef.description);
assert.equal(oneMeta('og:image'), `${site.origin}${site.image}`);
assert.equal(oneMeta('og:image:alt'), site.imageAlt);
assert.equal(oneMeta('twitter:card'), 'summary_large_image');
assert(html.includes('<html lang="ru"'));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert(local.includes('<meta name="robots" content="noindex,nofollow">'), 'Public preview must remain noindex');
assert.equal(html.split('<body')[1], local.split('<body')[1], 'SEO must not change the visible page between build modes');
for (const format of formats) {
  assert(html.includes(`id="format-${format.id}"`));
  assert(html.includes(format.description), 'Service content must exist in static HTML');
}

if (preview) {
  assert.equal(oneMeta('robots'), 'noindex,nofollow');
  assert(robots.includes('Disallow: /'));
  assert(!html.includes('rel="canonical"'));
  assert(!html.includes('google-site-verification'));
  await assert.rejects(stat(resolve(root, 'sitemap.xml')), { code: 'ENOENT' });
} else {
  assert(!/noindex|nofollow|nosnippet/i.test(oneMeta('robots')), 'Production must remain indexable');
  assert(oneMeta('robots').includes('max-image-preview:large'));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert(html.includes(`<link rel="canonical" href="${site.origin}/">`));
  assert.equal(oneMeta('og:url'), `${site.origin}/`);
  assert.equal(oneMeta('google-site-verification'), site.googleVerification, 'Preserve Search Console ownership');
  assert(robots.includes('Allow: /'));
  assert(!/^Disallow:\s*\//m.test(robots));
  assert(robots.includes(`Sitemap: ${site.origin}/sitemap.xml`));
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), [`${site.origin}/`]);
  assert(!/lastmod|changefreq|priority/.test(sitemap));
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const data = JSON.parse(scripts[0][1]);
  assert.equal(data['@context'], 'https://schema.org');
  const graph = data['@graph'];
  const ids = new Set(graph.map(node => node['@id']));
  assert.equal(ids.size, graph.length, 'Unique graph entity IDs');
  assert.equal(graph.filter(node => node['@type'] === 'Service').length, formats.length);
  assert.equal(graph.find(node => node['@type'] === 'WebSite').name, chef.name);
  assert.deepEqual(graph.find(node => node['@type'] === 'Person').sameAs, [chef.instagram]);
  assert(!graph.some(node => ['LocalBusiness', 'Restaurant', 'Review', 'AggregateRating'].includes(node['@type'])), 'Do not invent business or rating facts');
  const checkReferences = value => {
    if (!value || typeof value !== 'object') return;
    if (value['@id']) assert(ids.has(value['@id']), `Unresolved entity: ${value['@id']}`);
    Object.values(value).forEach(checkReferences);
  };
  checkReferences(data);
  for (const node of graph) {
    if (node['@type'] === 'Service') {
      assert.equal(node.areaServed.name, 'Кипр');
      const anchor = new URL(node.url).hash.slice(1);
      assert(html.includes(`id="${anchor}"`), `Service target must exist: ${anchor}`);
    }
    for (const value of [node.image, node.contentUrl].filter(value => typeof value === 'string')) {
      const url = new URL(value);
      assert.equal(url.origin, site.origin);
      assert((await stat(resolve(root, `.${url.pathname}`))).size > 0, `Missing structured image: ${value}`);
    }
  }
}
console.log(`SEO OK: ${preview ? 'preview exclusions' : 'canonical, indexing, sitemap, ownership, linked structured data'}, metadata and static content.`);
