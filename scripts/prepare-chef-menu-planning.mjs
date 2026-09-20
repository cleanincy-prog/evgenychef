import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const source = new URL("design/references/chef-duck-notebook-2026-09-20.png", root);
const output = new URL("public/media/menu/chef-planning/", root);
await mkdir(output, { recursive: true });
const original = await readFile(source);
const metadata = await sharp(original).metadata();
if (metadata.width !== 1536 || metadata.height !== 1024) throw Error("Unexpected approved illustration dimensions");
const variants = [];
for (const width of [640, 960, 1536]) {
  const buffer = await sharp(original).resize({ width }).webp({ quality: 92, effort: 6, smartSubsample: true }).toBuffer();
  const filename = `duck-12-2026-09-20-${width}.webp`;
  await writeFile(new URL(filename, output), buffer);
  const info = await sharp(buffer).metadata();
  variants.push({ filename, width: info.width, height: info.height, bytes: buffer.length, sha256: createHash("sha256").update(buffer).digest("hex") });
}
await writeFile(new URL("design/references/chef-duck-notebook-2026-09-20.manifest.json", root), JSON.stringify({
  source: "design/references/chef-duck-notebook-2026-09-20.png",
  editedFrom: "design/references/approved-chef-menu-2026-09-14.png",
  prompt: "design/references/chef-duck-notebook-2026-09-20.prompt.txt",
  sourceSha256: createHash("sha256").update(original).digest("hex"),
  width: metadata.width, height: metadata.height,
  operation: "Built-in ImageGen edits in-paper notes to duck for 12; this script only encodes proportional responsive WebP copies",
  variants,
}, null, 2) + "\n");
console.log(JSON.stringify({ variants }, null, 2));
