import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { writePages } from './render.mjs';
import { pages } from '../src/pages.mjs';
import { renderRobots, renderSitemap } from '../src/seo.mjs';

const source = fileURLToPath(new URL('../public/', import.meta.url));
const output = fileURLToPath(new URL('../dist/', import.meta.url));
await writePages(source);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
const production = process.argv.includes('--production');
await writePages(output, { production });
await writeFile(new URL('../dist/robots.txt', import.meta.url), renderRobots({ production }));
if (production) {
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), renderSitemap());
}
console.log(`Built ${pages.length} static pages (${production ? 'production, indexable' : 'preview, noindex'}): ${output}`);
