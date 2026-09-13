import sharp from 'sharp';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The user's exact requirement: use the actual site photograph, not generated food.
// Only proportional resizing, placement, and a separate contact shadow are applied.
const folder = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(folder, '../../../..');
const source = path.join(root, 'public/media/web/duck-plate-960.webp');
const background = path.join(folder, 'worktable-background.png');
const output = path.join(folder, 'menu-worktable-real-duck-v1.png');
const { width, height } = await sharp(background).metadata();
if (!width || !height) throw new Error('Background dimensions unavailable');
const placement = {
  width: Math.round(width * 650 / 1536),
  left: Math.round(width * 944 / 1536),
  top: Math.round(height * 398 / 1024),
};
await copyFile(source, path.join(folder, 'original-site-duck.webp'));
const photo = await sharp(source).resize({ width: placement.width, kernel: 'lanczos3' })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const fullPhoto = Buffer.alloc(width * height * 4);
const fullShadow = Buffer.alloc(width * height * 4);
const shadowOffset = Math.max(1, Math.round(height * 6 / 1024));
for (let y = 0; y < photo.info.height; y++) {
  for (let x = 0; x < photo.info.width; x++) {
    const tx = placement.left + x;
    const ty = placement.top + y;
    if (tx < 0 || tx >= width || ty < 0 || ty >= height) continue;
    const from = (y * photo.info.width + x) * 4;
    const to = (ty * width + tx) * 4;
    photo.data.copy(fullPhoto, to, from, from + 4);
    if (ty + shadowOffset < height) {
      const si = ((ty + shadowOffset) * width + tx) * 4;
      fullShadow[si] = 68;
      fullShadow[si + 1] = 56;
      fullShadow[si + 2] = 40;
      fullShadow[si + 3] = Math.round(photo.data[from + 3] * .18);
    }
  }
}
const raw = { width, height, channels: 4 };
const photoLayer = await sharp(fullPhoto, { raw }).png().toBuffer();
const shadowLayer = await sharp(fullShadow, { raw }).blur(Math.max(.3, width * 8 / 1536)).png().toBuffer();
await sharp(background).ensureAlpha().composite([
  { input: shadowLayer },
  { input: photoLayer },
]).png().toFile(output);

// Check the final opaque photographic pixels, not merely the existence of a file.
const rendered = await sharp(output).ensureAlpha().raw().toBuffer();
let checkedOpaquePixels = 0;
let differingOpaquePixels = 0;
let largestChannelDifference = 0;
for (let i = 0; i < fullPhoto.length; i += 4) {
  if (fullPhoto[i + 3] !== 255) continue;
  checkedOpaquePixels++;
  let different = false;
  for (let c = 0; c < 3; c++) {
    const difference = Math.abs(rendered[i + c] - fullPhoto[i + c]);
    largestChannelDifference = Math.max(largestChannelDifference, difference);
    different ||= difference !== 0;
  }
  if (different) differingOpaquePixels++;
}
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceHash = sha256(await readFile(source));
const copiedHash = sha256(await readFile(path.join(folder, 'original-site-duck.webp')));
const report = {
  source: path.relative(root, source),
  sourceSha256: sourceHash,
  sourceCopySha256: copiedHash,
  output: path.relative(root, output),
  width, height,
  placement: { ...placement, height: photo.info.height },
  operationsOnPhoto: ['proportional Lanczos resize', 'RGBA placement', 'canvas-edge crop'],
  foodGenerated: false,
  foodRetouched: false,
  checkedOpaquePixels,
  differingOpaquePixels,
  largestChannelDifference,
};
await writeFile(path.join(folder, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
if (sourceHash !== copiedHash || differingOpaquePixels) throw new Error('Photograph preservation check failed');
console.log(JSON.stringify(report));
