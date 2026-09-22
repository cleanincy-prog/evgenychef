// Asset preparation only: the selected ImageGen drawing supplies all new artwork.
// The original video and its animated upper scene are never re-encoded or repainted.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const source = 'design/generated/conversation-complete-2026-09-22/approved-scene.png';
const output = 'public/media/web/conversation-complete-2026-09-22';
const width = 1280, height = 1080;
await mkdir('public/media/web', { recursive: true });
// Registration against the unchanged video: scale 0.954, x +39, y -4.
const aligned = await sharp(source).resize(1330, 1076).extract({ left: 0, top: 4, width: 1241, height: 1072 })
  .extend({ left: 39, right: 0, top: 0, bottom: 8, background: '#f4f0e7' }).removeAlpha().raw().toBuffer();
// Reveal only the new bottom and the exposed chair backs. The moving faces,
// text, arms and tabletop objects remain entirely in the original video.
const chairs = '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="1080"><rect width="100%" height="100%" fill="black"/><path fill="white" d="M160 405 L219 405 L207 428 L198 445 L200 478 L213 503 L243 527 L257 543 L270 557 L271 635 L156 635 Z M1106 411 L1200 411 L1200 635 L1010 635 L1010 575 Q1048 575 1080 562 L1118 555 L1129 540 L1123 510 L1106 460 Z"/></svg>';
const chairMask = await sharp(Buffer.from(chairs)).blur(3).greyscale().raw().toBuffer();
const rgba = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
  const p = y * width + x;
  const t = Math.max(0, Math.min(1, (y - 596) / 22));
  const alpha = Math.max(t * t * (3 - 2 * t), chairMask[p] / 255);
  for (let c = 0; c < 3; c++) rgba[p * 4 + c] = aligned[p * 3 + c];
  rgba[p * 4 + 3] = Math.round(255 * alpha);
}
const layer = sharp(rgba, { raw: { width, height, channels: 4 } });
const files = [];
for (const size of [480, 960, 1280]) {
  const file = output + '-' + size + '.webp';
  await layer.clone().resize(size).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(file);
  files.push({ path: file, bytes: (await readFile(file)).length });
}
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const report = {
  source, sourceSha256: sha256(await readFile(source)), width, height,
  alignment: { resizedWidth: 1330, resizedHeight: 1076, translateX: 39, translateY: -4 },
  transition: { startY: 596, endY: 618 }, files,
  video: 'public/media/conversation-playback-2026-09-22.mp4',
  videoSha256: sha256(await readFile('public/media/conversation-playback-2026-09-22.mp4')),
  mode: 'Selected built-in ImageGen edit; transparent lower continuation over unchanged original video',
};
await writeFile('design/generated/conversation-complete-2026-09-22/provenance.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
