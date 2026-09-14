import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const source = 'design/references/menu-fish-2026-09-14/fish-photo.png';
const folder = 'design/mockups/menu-worktable-ingredients-2026-09-14';
const output = 'public/media/menu/worktable';
await mkdir(folder, { recursive: true });
await mkdir(output, { recursive: true });

const image = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = image.info;
const silhouette = 'M179 104C202 105 214 131 228 117C246 102 280 100 294 121L308 108C326 101 341 121 345 153L371 186C411 180 426 200 398 223L440 277C462 292 457 327 436 347L411 386C417 414 399 432 371 428L322 406C281 433 236 425 209 414C170 410 157 387 151 363L115 371L91 352L81 335L98 317L67 292L75 270L107 259L91 235L116 217L121 190L137 179L145 160L178 155C185 139 161 116 179 104Z';
const svgMask = path => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="${path}" fill="white"/></svg>`);
const boundary = await sharp(svgMask(silhouette)).ensureAlpha().raw().toBuffer();
const food = Buffer.from(image.data);
let checked = 0;
for (let i = 0; i < food.length; i += 4) {
  const [r, g, b] = food.subarray(i, i + 3);
  // The original plate is cool neutral white; real food is warm, green or dark.
  // This key changes alpha only and is limited by the traced food silhouette.
  const warmth = Math.max(r - b - 14, g - b - 18);
  const dark = Math.max(r, g, b) < 135;
  const alpha = dark ? 255 : Math.max(0, Math.min(255, warmth * 42));
  food[i + 3] = Math.round(alpha * boundary[i + 3] / 255);
  if (food[i + 3] === 255) {
    checked++;
    if (food[i] !== image.data[i] || food[i + 1] !== image.data[i + 1] || food[i + 2] !== image.data[i + 2]) throw Error('Food RGB changed');
  }
}
const foodFull = await sharp(food, { raw: { width, height, channels: 4 } }).png().toBuffer();
await sharp(foodFull).trim({ threshold: 0 }).png().toFile(`${folder}/food-only.png`);

const fillet = 'M264 185C279 181 292 197 308 207L331 220L350 237L378 250L396 265L424 278C446 279 451 294 444 309L434 329L418 343L393 332L366 321L339 305L306 291L281 276L258 259L246 242L239 226L243 207Z';
for (const [name, path] of [['fish', fillet]]) {
  const mask = await sharp(svgMask(path)).ensureAlpha().raw().toBuffer();
  const pixels = Buffer.from(food);
  for (let i = 3; i < pixels.length; i += 4) pixels[i] = Math.min(pixels[i], mask[i]);
  await sharp(pixels, { raw: { width, height, channels: 4 } }).trim({ threshold: 0 }).resize({ width: 300 }).webp({ lossless: true }).toFile(`${output}/fish-notebook-${name}.webp`);
}

const backgroundPath = `${folder}/background.png`;
const placement = { left: 1007, top: 687, width: 265 };
const foreground = await sharp(`${folder}/food-only.png`).resize({ width: placement.width }).ensureAlpha().png().toBuffer();
const composite = await sharp(backgroundPath).composite([{ input: foreground, left: placement.left, top: placement.top }]).png().toBuffer();
await writeFile(`${folder}/scene.png`, composite);

const frontRaw = await sharp(foreground).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const finalRaw = await sharp(composite).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let compositeChecked = 0;
for (let y = 0; y < frontRaw.info.height; y++) for (let x = 0; x < frontRaw.info.width; x++) {
  const from = (y * frontRaw.info.width + x) * 4;
  if (frontRaw.data[from + 3] !== 255) continue;
  const to = ((placement.top + y) * finalRaw.info.width + placement.left + x) * 4;
  compositeChecked++;
  for (let channel = 0; channel < 3; channel++) if (frontRaw.data[from + channel] !== finalRaw.data[to + channel]) throw Error('Composite food changed');
}
const exports = [];
for (const target of [640, 960, 1419]) {
  const file = `${output}/fish-notebook-scene-${target}.webp`;
  await sharp(composite).resize({ width: target }).webp({ lossless: true, effort: 6 }).toFile(file);
  exports.push({ file, width: target, bytes: (await readFile(file)).length });
}
// Mobile uses the same photographed paper and finished bowl, with live text.
await sharp(backgroundPath).extract({ left: 82, top: 206, width: 520, height: 596 }).webp({ lossless: true }).toFile(`${output}/fish-notebook-page.webp`);
const dishCrop = { left: 843, top: 495, width: 576, height: 613 };
for (const target of [320, 576]) await sharp(composite).extract(dishCrop).resize({ width: target }).webp({ lossless: true }).toFile(`${output}/fish-notebook-bowl-${target}.webp`);
const report = { source, sha256: createHash('sha256').update(await readFile(source)).digest('hex'), checkedOpaqueSourcePixels: checked, checkedOpaqueCompositePixels: compositeChecked, differingOpaquePixels: 0, foodGenerated: false, foodRetouched: false, placement, exports };
await writeFile(`${folder}/verification.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
