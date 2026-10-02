import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import './render.mjs';

const source = fileURLToPath(new URL('../public/', import.meta.url));
const output = fileURLToPath(new URL('../dist/', import.meta.url));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
if (process.argv.includes('--production')) {
  const origin = 'https://evgenychef.com';
  const index = new URL('../dist/index.html', import.meta.url);
  const html = (await readFile(index, 'utf8'))
    .replace('<meta name="robots" content="noindex,nofollow">', '<meta name="robots" content="index,follow">')
    .replace('<meta property="og:type" content="website">', `<link rel="canonical" href="${origin}/">\n  <meta property="og:url" content="${origin}/">\n  <meta property="og:type" content="website">`)
    .replace('content="/media/chef/hero.webp"', `content="${origin}/media/chef/hero.webp"`);
  await writeFile(index, html);
  await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
}
console.log(`Static homepage built: ${output}`);
