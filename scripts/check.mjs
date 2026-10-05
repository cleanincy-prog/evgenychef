import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { stages, products, flavorNotes } from '../src/content.mjs';
import './check-count-up.mjs';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const html = await readFile(resolve(root,'index.html'),'utf8');
const manifest = JSON.parse(await readFile(new URL('../src/media-manifest.json',import.meta.url),'utf8'));
const referenced = new Set();
const importedModules = ['/assets/hero-snapshot.js', '/assets/count-up.mjs', '/assets/ui-language.mjs'];
for (const match of html.matchAll(/(?:src|href|poster|data-src)="(\/[^"\s]+)"/g)) referenced.add(match[1].split(/[?#]/)[0]);
for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
  match[1].split(',').forEach(candidate => referenced.add(candidate.trim().split(/\s/)[0]));
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate element IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]),`Missing anchor: ${match[1]}`);
for (const file of [...referenced].filter(path=>path.endsWith('.css'))) {
  const css = await readFile(resolve(root,'.'+file),'utf8');
  for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
    const url = match[1].replaceAll('"','').split('?')[0];
    if (!url.startsWith('data:')) assert((await stat(resolve(root,'.'+dirname(file),url))).size>0,`Missing font: ${url}`);
  }
}
for (const file of [...referenced, ...importedModules]) assert((await stat(resolve(root,'.'+file))).size>0,`Missing asset: ${file}`);
for (const item of manifest) {
  const data = await readFile(resolve(root,'.'+item.file));
  assert.equal(createHash('sha256').update(data).digest('hex'),item.sha256,`Media checksum mismatch: ${item.file}`);
}
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.equal((html.match(/<article\b[^>]*class="process-card /g)||[]).length,6,'Six chapters must preserve the full story');
assert.equal((html.match(/\bdata-letter-video\b/g)||[]).length,1,'The preparation chapter must include its original video');
for (const item of [...stages, ...products, ...flavorNotes]) {
  for (const paragraph of item.text.split('\n\n')) {
    const escaped = paragraph.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    assert(html.includes(escaped), `Story content missing: ${paragraph}`);
  }
}
for (const file of ['duck-ingredients.webp', 'vegetables.webp', 'duck-pan.webp']) assert(html.includes(file), `Selected ingredient photo missing: ${file}`);
assert(!/cinema-|data-process-(?:card|panel|story)|process-cards\.(?:css|mjs)/.test(html),'Previous interactive layouts must not remain on the page');
assert(!html.includes('class="day-track"'),'Obsolete scroll sequence remains');
assert.equal((html.match(/class="sq-panel"/g)||[]).length,3);
assert(!/biotrofi|Dimitris|FRSPH|Michelin|€|contact@|\/api\/|_next\/|connect.facebook.net/i.test(html),'Unrelated brand, claim, price or endpoint remains');
assert(html.includes('В основе моей кухни — опыт лучших кулинарных школ Франции, Швейцарии и Германии'),'Latest biography missing');
assert(html.includes('https://www.instagram.com/evg.chef/'),'Verified contact missing');
assert(!(await readdir(root)).some(name=>['about','blog','plan'].includes(name)),'Unexpected subpage');
for (const match of html.matchAll(/href="(https?:[^\"]+)"/g)) assert.equal(new URL(match[1]).hostname,'www.instagram.com','Unexpected external navigation');
if (process.argv.includes('--http')) {
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
  for (const file of ['/',...referenced,...importedModules]) {
    const response = await fetch(base+file,{method:'HEAD'});
    assert.equal(response.status,200,`HTTP ${file}`);
  }
  for (const file of importedModules) {
    const module = await fetch(base+file,{method:'HEAD'});
    assert(module.headers.get('content-type').includes('javascript'),`Module MIME: ${file}`);
  }
  const video = manifest.find(item=>item.file.endsWith('preparation.mp4'));
  const range = await fetch(base+video.file,{headers:{Range:'bytes=0-1023'}});
  assert.equal(range.status,206);
  assert.equal(range.headers.get('content-type'),'video/mp4');
  assert.equal(range.headers.get('content-range'),`bytes 0-1023/${video.bytes}`);
  assert.equal((await range.arrayBuffer()).byteLength,1024);
  const suffix = await fetch(base+video.file,{headers:{Range:'bytes=-128'}});
  assert.equal(suffix.status,206);
  assert.equal((await suffix.arrayBuffer()).byteLength,128);
  const invalid = await fetch(base+video.file,{headers:{Range:`bytes=${video.bytes}-`}});
  assert.equal(invalid.status,416);
  assert.equal((await fetch(base+'/blog')).status,404);
  console.log('HTTP OK: page, modules, media, byte ranges and missing routes.');
}
console.log(`OK: ${referenced.size} local references; ${manifest.length} media files verified against the manifest; 3 formats, 6 cinematic chapters, one homepage.`);
