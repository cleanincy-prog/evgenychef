import sharp from 'sharp';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const folder = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(folder, '../../..');
const references = path.join(root, 'design/references/menu-fish-2026-09-14');
const publicFolder = path.join(root, 'public/media/menu/worktable');
const background = path.join(folder, 'worktable-background.png');
const output = path.join(folder, 'menu-worktable-fish.png');
const { width, height } = await sharp(background).metadata();
if (width !== 1536 || height !== 1024) throw Error('Unexpected background dimensions');

// Preserve the user-supplied photographic RGB. Only crop, alpha mask, resize,
// and placement are used; the generated drawing never replaces the food.
const original = path.join(references, 'user-photo-original.jpg');
const crop = { left: 0, top: 318, width: 576, height: 576 };
const cropped = await sharp(original).extract(crop).ensureAlpha().raw().toBuffer();
const plate = await sharp(path.join(references, 'fish-plate.png')).ensureAlpha().raw().toBuffer();
let maskedSourcePixels = 0;
for (let i = 0; i < plate.length; i += 4) {
  if (plate[i + 3] !== 255) continue;
  maskedSourcePixels++;
  if (plate[i] !== cropped[i] || plate[i + 1] !== cropped[i + 1] || plate[i + 2] !== cropped[i + 2]) throw Error('Source photograph changed');
}

const placement = { width: 620, left: 940, top: 399 };
const photo = await sharp(path.join(references, 'fish-plate.png')).resize({ width: placement.width, kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const layer = Buffer.alloc(width * height * 4);
const shadow = Buffer.alloc(width * height * 4);
for (let y = 0; y < photo.info.height; y++) {
  for (let x = 0; x < photo.info.width; x++) {
    const tx = placement.left + x, ty = placement.top + y;
    if (tx >= width || ty >= height) continue;
    const from = (y * photo.info.width + x) * 4;
    photo.data.copy(layer, (ty * width + tx) * 4, from, from + 4);
    if (tx + 7 < width && ty + 11 < height) {
      const si = ((ty + 11) * width + tx + 7) * 4;
      shadow[si] = 67; shadow[si + 1] = 52; shadow[si + 2] = 32;
      shadow[si + 3] = Math.round(photo.data[from + 3] * .22);
    }
  }
}
const raw = { width, height, channels: 4 };
await sharp(background).ensureAlpha().composite([
  { input: await sharp(shadow, { raw }).blur(10).png().toBuffer() },
  { input: await sharp(layer, { raw }).png().toBuffer() },
]).png().toFile(output);

const final = await sharp(output).ensureAlpha().raw().toBuffer();
let checkedOpaquePixels = 0;
for (let i = 0; i < layer.length; i += 4) {
  if (layer[i + 3] !== 255) continue;
  checkedOpaquePixels++;
  if (final[i] !== layer[i] || final[i + 1] !== layer[i + 1] || final[i + 2] !== layer[i + 2]) throw Error('Final photograph pixels changed');
}
const exports = [];
for (const size of [640, 960, 1536]) {
  const file = path.join(publicFolder, `menu-worktable-fish-${size}.webp`);
  await sharp(output).resize({ width: size }).webp({ lossless: true, effort: 6 }).toFile(file);
  const expected = await sharp(output).resize({ width: size }).ensureAlpha().raw().toBuffer();
  const actual = await sharp(file).ensureAlpha().raw().toBuffer();
  if (!expected.equals(actual)) throw Error(`Lossless export differs: ${size}`);
  const bytes = await readFile(file);
  exports.push({ file: path.relative(root, file), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
}
await copyFile(path.join(references, 'fish-photo.png'), path.join(publicFolder, 'fish-photo-provided-2026-09-14.png'));
const report = { source: path.relative(root, original), sourceSha256: createHash('sha256').update(await readFile(original)).digest('hex'), crop, placement, maskedSourcePixels, checkedOpaquePixels, differingOpaquePixels: 0, foodGenerated: false, colorRetouched: false, exports };
await writeFile(path.join(folder, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
