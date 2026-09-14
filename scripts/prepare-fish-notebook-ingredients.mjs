import sharp from 'sharp';
import { access, mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';

const originals = 'design/references/fish-notebook-ingredients-2026-09-14';
const downloaded = '/private/tmp/fish-notebook-ingredients-2026-09-14';
const out = 'public/media/menu/worktable';
await mkdir(originals, { recursive: true });
try { await access(`${originals}/SOURCES.md`); } catch { await copyFile(`${downloaded}/README.md`, `${originals}/SOURCES.md`); }
const selections = [
  { id: 'peas', file: 'peas-pexels-768093.jpg', rect: [140, 280, 770, 1000], key: 'green', path: 'M180 281L213 302C303 349 448 454 587 581C727 712 869 824 884 925C894 980 866 1033 814 1066C794 1069 790 1044 780 1030L703 915L600 800L480 671L320 482L281 481C284 595 305 731 330 870C352 1035 401 1142 509 1235C409 1264 313 1238 261 1176C210 1105 195 1020 182 912C164 771 157 605 156 457C151 376 161 319 180 281Z' },
  { id: 'carrot', file: 'carrot-pexels-6740693.jpg', rect: [355, 760, 90, 580], path: 'M380 888L379 773L388 769L401 884C408 881 419 886 424 902C433 949 427 1027 424 1098C420 1181 421 1250 403 1284C398 1305 390 1318 372 1322L367 1318L383 1310C392 1286 392 1257 390 1223L385 1133L382 1034L379 956C377 926 375 905 380 888Z' },
  { id: 'tomatoes', file: 'cherry-tomatoes-luc-viatour.jpg', rect: [150, 80, 190, 195], key: 'saturation', path: 'M150 80H340V275H150Z' },
  { id: 'mussels', file: 'mussels-valenzuela400.jpg', rect: [612, 366, 229, 127], path: 'M622 459C625 434 663 405 710 389C739 378 763 373 785 381C804 377 824 382 831 395C834 408 821 432 803 443C779 458 743 467 704 476L656 485C633 492 615 481 622 459Z' },
];
for (const item of selections) {
  try { await access(`${originals}/${item.file}`); } catch { await copyFile(`${downloaded}/${item.file}`, `${originals}/${item.file}`); }
  const src = await sharp(`${originals}/${item.file}`).resize({ width: 1000 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = src.info;
  const mask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="${item.path}" fill="white"/></svg>`)).ensureAlpha().raw().toBuffer();
  for (let i = 0; i < src.data.length; i += 4) {
    const [r, g, b] = src.data.subarray(i, i + 3);
    let alpha = 255;
    if (item.key === 'green') alpha = Math.max(0, Math.min(255, (Math.min(g - b - 12, g - r + 8)) * 22));
    if (item.key === 'saturation') alpha = Math.max(0, Math.min(255, (Math.max(r, g, b) - Math.min(r, g, b) - 40) * 16));
    src.data[i + 3] = Math.round(alpha * mask[i + 3] / 255);
  }
  const [left, top, cropWidth, cropHeight] = item.rect;
  const crop = await sharp(src.data, { raw: { width, height, channels: 4 } }).extract({ left, top, width: cropWidth, height: cropHeight }).png().toBuffer();
  const trimmed = await sharp(crop).trim({ threshold: 0 }).png().toBuffer();
  await sharp(trimmed).rotate(item.id === 'carrot' ? 65 : item.id === 'peas' ? -22 : 0, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 300, height: 300, fit: 'inside' }).webp({ lossless: true }).toFile(`${out}/fish-notebook-${item.id}.webp`);
}
await copyFile('public/media/menu/exploded/basil.webp', `${out}/fish-notebook-greens.webp`);
const descriptions = [
  ['fish', 'Филе рыбы'], ['peas', 'Зелёный горошек'], ['carrot', 'Морковь'], ['tomatoes', 'Томаты'], ['mussels', 'Мидии'], ['greens', 'Зелень'],
];
const data = [];
for (const [id, name] of descriptions) {
  const file = `${out}/fish-notebook-${id}.webp`;
  const { width, height } = await sharp(file).metadata();
  data.push({ id, name, src: `/${file.replace(/^public\//, '')}`, width, height, bytes: (await readFile(file)).length });
}
await writeFile('app/menu-worktable-ingredients.json', JSON.stringify(data, null, 2) + '\n');
console.log(JSON.stringify(data));
