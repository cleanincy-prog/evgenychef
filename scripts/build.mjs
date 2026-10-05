import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { renderHomepage } from './render.mjs';
import { renderRobots, renderSitemap } from '../src/seo.mjs';

const source = fileURLToPath(new URL('../public/', import.meta.url));
const output = fileURLToPath(new URL('../dist/', import.meta.url));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
const production = process.argv.includes('--production');
await writeFile(new URL('../dist/index.html', import.meta.url), renderHomepage({ production }).replace(/[ \t]+$/gm, ''));
await writeFile(new URL('../dist/robots.txt', import.meta.url), renderRobots({ production }));
if (production) {
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), renderSitemap());
}
console.log(`Static homepage built (${production ? 'production, indexable' : 'preview, noindex'}): ${output}`);
