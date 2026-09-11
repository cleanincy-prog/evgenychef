import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Preserve the original photographic detail/alpha after the imagegen colour edit.
// Run from the project root. Generated reference is retained beside this script.
const source = "public/media/menu/personal-menu-duck-plate-cutout-v1.webp";
const destination = "public/media/menu/personal-menu-duck-plate-cream-v2.webp";
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const output = Buffer.from(data);
const target = [244, 239, 229]; // Existing site --paper, #F4EFE5.
const food = [[.575,.31],[.716,.414],[.637,.505],[.555,.60],[.435,.687],[.306,.613],[.382,.518],[.473,.413]];
function protectedFood(x, y) {
  let inside = false;
  for (let i = 0, j = food.length - 1; i < food.length; j = i++) {
    const [xi, yi] = food[i], [xj, yj] = food[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const smooth = (low, high, value) => {
  const t = Math.min(1, Math.max(0, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
};
let changed = 0, protectedPixels = 0;
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const index = (y * info.width + x) * 4;
  const [r, g, b, a] = data.subarray(index, index + 4);
  if (a === 0) continue;
  if (protectedFood(x / info.width, y / info.height)) { protectedPixels++; continue; }
  const maximum = Math.max(r, g, b), minimum = Math.min(r, g, b);
  // The source ceramic is light and neutral/cool; warm food colours are excluded.
  const mask = smooth(90, 155, minimum) * (1 - smooth(40, 85, maximum - minimum)) * (1 - smooth(6, 30, r - b));
  if (mask === 0) continue;
  const luminance = .2126 * r + .7152 * g + .0722 * b;
  const materialLight = 255 - (255 - luminance) * .46;
  for (let channel = 0; channel < 3; channel++) {
    const cream = materialLight * target[channel] / target[0];
    output[index + channel] = Math.round(data[index + channel] * (1 - mask) + cream * mask);
  }
  if (output[index] !== r || output[index + 1] !== g || output[index + 2] !== b) changed++;
}
await sharp(output, { raw: info }).webp({ lossless: true, effort: 6 }).toFile(destination);
const decoded = await sharp(destination).ensureAlpha().raw().toBuffer();
let alphaDifferences = 0, protectedDifferences = 0;
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const i = (y * info.width + x) * 4;
  if (data[i + 3] !== decoded[i + 3]) alphaDifferences++;
  if (data[i + 3] && protectedFood(x / info.width, y / info.height) && [0,1,2].some(c => data[i + c] !== decoded[i + c])) protectedDifferences++;
}
const report = { source, destination, width: info.width, height: info.height, target, changedCeramicPixels: changed, protectedPixels, alphaDifferences, protectedFoodRgbDifferences: protectedDifferences, encoding: "lossless WebP", method: "imagegen colour reference; source-preserving ceramic colour preparation" };
await writeFile("design/generated/cream-duck-plate-2026-09-11/asset-verification.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
if (alphaDifferences || protectedDifferences) throw new Error("Original alpha or protected food detail changed");
