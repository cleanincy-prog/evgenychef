// Keep the original scene and chef pixel-for-pixel; use only ImageGen's guest portrait.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const original = 'public/media/evening-plan/conversation-evgen-paper-flowers-v8.png';
const generated = 'design/generated/conversation-guest-2026-09-18/generated-edit.png';
const output = 'public/media/evening-plan/conversation-guest-2026-09-18.png';
const hash = buffer => createHash('sha256').update(buffer).digest('hex');
const sourceBytes = await readFile(original);
if (hash(sourceBytes) !== '696655d3eaa69b0de21bdd60522083488b2d7ba9608dfe783cdf28d0abe5b862') throw Error('The original illustration has changed');
const source = await sharp(sourceBytes).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const edit = await sharp(generated).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = source.info;
if (width !== 1536 || height !== 1024 || edit.info.width !== width || edit.info.height !== height || channels !== 3 || edit.info.channels !== 3) throw Error('Unexpected illustration dimensions');

// The portrait mask surrounds both hair silhouettes and ends on the blouse.
// It never reaches the chef, notebook, flowers, vase, table or water glasses.
const maskPath = 'M 982 146 L 1325 146 Q 1364 146 1374 214 L 1400 437 Q 1400 468 1360 480 L 1280 500 L 1242 553 L 1125 555 L 1085 509 L 1086 464 L 1098 442 L 1095 425 L 1023 421 L 987 392 L 973 303 Z';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="black"/><path d="${maskPath}" fill="white"/></svg>`;
const mask = await sharp(Buffer.from(svg)).blur(5).greyscale().raw().toBuffer();
const result = Buffer.from(source.data);
let editedPixels = 0;
for (let pixel = 0; pixel < width * height; pixel++) {
  const alpha = mask[pixel] / 255;
  if (!alpha) continue;
  let differs = false;
  for (let c = 0; c < channels; c++) {
    const i = pixel * channels + c;
    result[i] = Math.round(source.data[i] * (1 - alpha) + edit.data[i] * alpha);
    if (result[i] !== source.data[i]) differs = true;
  }
  if (differs) editedPixels++;
}
let protectedPixelDifferences = 0;
for (let y = 0; y < height; y++) for (let x = 0; x < 900; x++) {
  const i = (y * width + x) * channels;
  if (result[i] !== source.data[i] || result[i + 1] !== source.data[i + 1] || result[i + 2] !== source.data[i + 2]) protectedPixelDifferences++;
}
if (protectedPixelDifferences) throw Error('Protected chef area changed');
const png = await sharp(result, { raw: { width, height, channels } }).png().toBuffer();
await writeFile(output, png);
const manifestPath = 'scripts/site-image-manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const item = manifest.images.find(image => image.name === 'conversation');
Object.assign(item, { source: output.replace(/^public/, ''), outputName: 'conversation-guest-2026-09-18', sourceBytes: png.length, sourceSha256: hash(png), sourceWidth: width, sourceHeight: height });
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
const report = { original, originalSha256: hash(sourceBytes), generated, generatedSha256: hash(await readFile(generated)), output, outputSha256: hash(png), width, height, mode: 'built-in imagegen edit; only generated portrait composited into original scene', maskPath, maskFeatherPx: 5, editedPixels, protectedRegion: { left: 0, top: 0, width: 900, height }, protectedPixelDifferences, referencePhotos: ['Снимок экрана 2026-09-18 в 12.34.30.png', 'Снимок экрана 2026-09-18 в 12.34.36.png'] };
await writeFile('design/generated/conversation-guest-2026-09-18/provenance.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
