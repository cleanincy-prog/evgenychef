import sharp from 'sharp';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const refs = 'design/references/menu-photographic-2026-09-14';
const oldRefs = 'design/references/fish-notebook-ingredients-2026-09-14';
const work = 'design/mockups/menu-photographic-2026-09-14';
const out = 'public/media/menu/worktable';
const frame = { width: 1440, height: 1120 };
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const paper = [244, 239, 229];
await mkdir(work, { recursive: true });

async function masked(file, path, crop, key) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}"><path d="${path}" fill="white"/></svg>`)).ensureAlpha().raw().toBuffer();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = data.subarray(i, i + 3);
    const alpha = key ? Math.max(0, Math.min(255, key(r, g, b))) : 255;
    data[i + 3] = Math.round(alpha * mask[i + 3] / 255);
  }
  let image = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  if (crop) image = image.extract(crop);
  return image.png().toBuffer();
}

async function placedShadow(input, left, top, blur, opacity, offsetX, offsetY) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 55; data[i + 1] = 48; data[i + 2] = 37;
    data[i + 3] = Math.round(data[i + 3] * opacity);
  }
  const object = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  const layer = await sharp({ create: { ...frame, channels: 4, background: clear } }).composite([{ input: object, left: left + offsetX, top: top + offsetY }]).png().toBuffer();
  return sharp(layer).blur(blur).png().toBuffer();
}

// Use photographed stone grain, with a low-contrast neutral paper balance.
const grain = await sharp(`${refs}/notebook-kaboom.jpg`).extract({ left: 0, top: 20, width: 1400, height: 450 }).resize({ width: frame.width }).greyscale().raw().toBuffer({ resolveWithObject: true });
const average = grain.data.reduce((sum, value) => sum + value, 0) / grain.data.length;
const surface = Buffer.alloc(frame.width * frame.height * 4);
for (let y = 0; y < frame.height; y++) for (let x = 0; x < frame.width; x++) {
  const band = Math.floor(y / grain.info.height);
  const row = band % 2 ? grain.info.height - 1 - y % grain.info.height : y % grain.info.height;
  const texture = (grain.data[row * frame.width + x] - average) * .12;
  const i = (y * frame.width + x) * 4;
  for (let c = 0; c < 3; c++) surface[i + c] = Math.max(0, Math.min(255, Math.round(paper[c] + texture)));
  surface[i + 3] = 255;
}

const bookPath = 'M508 122C680 119 832 98 920 108L969 122C1125 103 1285 117 1407 123Q1436 128 1435 157L1447 884Q1449 913 1420 916C1260 923 1100 925 970 918C840 935 680 934 511 923Q477 922 477 892L478 155Q478 131 508 122Z';
const book = { left: 80, top: 90, width: 1050, height: 884, angle: -6 };
const bookCut = await masked(`${refs}/notebook-markus-original.jpg`, bookPath, { left: 460, top: 90, width: 1010, height: 850 });
await writeFile(`${work}/notebook-cutout.png`, bookCut);
const bookFlat = await sharp(bookCut).resize(book.width, book.height).modulate({ brightness: 1.04 }).png().toBuffer();
const bookRotated = await sharp(bookFlat).rotate(book.angle, { background: clear }).png().toBuffer();
const bookSize = await sharp(bookRotated).metadata();
const bookOrigin = { left: Math.round(book.left + (book.width - bookSize.width) / 2), top: Math.round(book.top + (book.height - bookSize.height) / 2) };

// Real ceramic basin, viewed from above. No replacement of its photographed shape.
const bowlPath = 'M1580 104C2386 105 3050 762 3056 1572C3063 2390 2395 3033 1582 3038C766 3041 112 2377 108 1580C106 766 766 105 1580 104Z';
const bowlCut = await masked(`${refs}/white-bowl.png`, bowlPath, { left: 90, top: 85, width: 2985, height: 2975 });
const bowl = { left: 858, top: 580, width: 535 };
const bowlLayer = await sharp(bowlCut).resize({ width: bowl.width }).linear([1, 1, 1], [12, 7, 10]).png().toBuffer();
await writeFile(`${work}/bowl-cutout.png`, bowlLayer);

// The pencil is a photographed graphite pencil, not an SVG drawing.
const pencilPath = 'M879 390L885 425L891 757Q889 765 881 765L875 762L871 428Z';
const pencilCut = await masked(`${refs}/notebook-katrin.jpg`, pencilPath, { left: 869, top: 387, width: 27, height: 382 });
const pencilLayer = await sharp(pencilCut).resize({ height: 420 }).rotate(76, { background: clear }).png().toBuffer();
const pencil = { left: 342, top: 993 };

const layers = [
  { input: await placedShadow(bookRotated, bookOrigin.left, bookOrigin.top, 10, .15, 2, 8) },
  { input: await placedShadow(bookRotated, bookOrigin.left, bookOrigin.top, 2, .2, 0, 2) },
  { input: bookRotated, ...bookOrigin },
  { input: await placedShadow(pencilLayer, pencil.left, pencil.top, 2.5, .24, 2, 3) },
  { input: pencilLayer, ...pencil },
  { input: await placedShadow(bowlLayer, bowl.left, bowl.top, 12, .16, 3, 6) },
  { input: await placedShadow(bowlLayer, bowl.left, bowl.top, 3, .2, 0, 3) },
  { input: bowlLayer, left: bowl.left, top: bowl.top },
];
const background = await sharp(surface, { raw: { ...frame, channels: 4 } }).composite(layers).png().toBuffer();
await writeFile(`${work}/photographic-background.png`, background);

// Preserve the supplied food, including its original arrangement and surface detail.
const foodSource = 'design/mockups/menu-worktable-ingredients-2026-09-14/food-only.png';
const food = { left: 946, top: 680, width: 360 };
const foodLayer = await sharp(foodSource).resize({ width: food.width }).png().toBuffer();
const scene = await sharp(background).composite([{ input: foodLayer, left: food.left, top: food.top }]).png().toBuffer();
await writeFile(`${work}/scene.png`, scene);
const foreground = await sharp(foodLayer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const final = await sharp(scene).ensureAlpha().raw().toBuffer();
let checked = 0;
for (let y = 0; y < foreground.info.height; y++) for (let x = 0; x < foreground.info.width; x++) {
  const i = (y * foreground.info.width + x) * 4;
  if (foreground.data[i + 3] !== 255) continue;
  const j = ((food.top + y) * frame.width + food.left + x) * 4;
  checked++;
  for (let c = 0; c < 3; c++) if (foreground.data[i + c] !== final[j + c]) throw Error('Supplied food RGB changed');
}

// Real ingredient cutouts, with fuller silhouettes and visible natural detail.
const peaMeta = await sharp(`${oldRefs}/peas-pexels-768093.jpg`).metadata();
const pea = await masked(`${oldRefs}/peas-pexels-768093.jpg`, `M0 0H${peaMeta.width}V${peaMeta.height}H0Z`, null, (r, g, b) => Math.min(g - b - 12, g - r + 8) * 22);
await sharp(pea).trim({ threshold: 0 }).rotate(-36, { background: clear }).resize({ width: 380, height: 300, fit: 'inside' }).webp({ lossless: true }).toFile(`${out}/photo-notebook-peas.webp`);
const carrotMeta = await sharp(`${oldRefs}/carrot-pexels-6740693.jpg`).metadata();
const carrot = await masked(`${oldRefs}/carrot-pexels-6740693.jpg`, `M0 0H${carrotMeta.width}V${carrotMeta.height}H0Z`, null, (r, g, b) => (Math.max(r, g, b) - Math.min(r, g, b) - 25) * 14);
await sharp(carrot).trim({ threshold: 0 }).rotate(53, { background: clear }).resize({ width: 320, height: 300, fit: 'inside' }).webp({ lossless: true }).toFile(`${out}/photo-notebook-carrot.webp`);
const musselPath = 'M913 129C980 115 1056 163 1121 196C1177 235 1214 290 1194 356C1175 431 1173 498 1135 563C1111 617 1092 657 1044 703L943 783C874 821 817 845 772 859C751 864 730 838 722 805C694 745 683 681 683 606C681 524 688 443 711 363C749 281 782 207 836 163C859 145 882 133 913 129Z';
const mussel = await masked(`${refs}/mussels-electra.jpg`, musselPath, { left: 676, top: 113, width: 550, height: 758 });
await sharp(mussel).trim({ threshold: 0 }).rotate(30, { background: clear }).resize({ width: 320, height: 300, fit: 'inside' }).webp({ lossless: true }).toFile(`${out}/photo-notebook-mussels.webp`);
for (const id of ['fish', 'tomatoes', 'greens']) await copyFile(`${out}/fish-notebook-${id}.webp`, `${out}/photo-notebook-${id}.webp`);

const ingredients = [];
for (const [id, name] of [['fish', 'Филе рыбы'], ['peas', 'Зелёный горошек'], ['carrot', 'Морковь'], ['tomatoes', 'Томаты'], ['mussels', 'Мидии'], ['greens', 'Зелень']]) {
  const file = `${out}/photo-notebook-${id}.webp`;
  const { width, height } = await sharp(file).metadata();
  ingredients.push({ id, name, src: `/${file.replace(/^public\//, '')}`, width, height, bytes: (await readFile(file)).length });
}
await writeFile('app/menu-worktable-ingredients.json', JSON.stringify(ingredients, null, 2) + '\n');
const exports = [];
for (const width of [640, 960, 1440]) {
  const file = `${out}/photo-notebook-scene-${width}.webp`;
  await sharp(scene).resize({ width }).webp({ lossless: true, effort: 6 }).toFile(file);
  exports.push({ file, width, bytes: (await readFile(file)).length });
}
const report = { frame, book, bookOrigin, bowl, food, checkedOpaqueCompositePixels: checked, differingOpaquePixels: 0, foodGenerated: false, foodRetouched: false, environmentGenerated: false, foodSource, foodSourceSha256: createHash('sha256').update(await readFile(foodSource)).digest('hex'), exports, ingredients };
await writeFile(`${work}/verification.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
