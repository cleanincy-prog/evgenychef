import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const outputPath = name => fileURLToPath(new URL(name, import.meta.url));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const option of [3]) {
    for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(new URL(`./index.html`, import.meta.url).href);
      await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
      await page.screenshot({ path: outputPath(`./site-mockup-${width}.png`), fullPage: true });
      const data = await page.evaluate(() => ({
        width: innerWidth,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        foodPhotoPresent: Boolean(document.querySelector('.menu-planning-photo, img[src*="fish-plate"]')),
        menuHeading: document.querySelector('.station-menu h3').textContent,
        menuCopy: document.querySelector('.station-menu .station-copy p').textContent,
        paper: getComputedStyle(document.body).backgroundColor,
        titleFont: getComputedStyle(document.querySelector('h2')).fontFamily,
        copyFont: getComputedStyle(document.querySelector('.station-copy p')).fontFamily,
        numberFont: getComputedStyle(document.querySelector('.station-number')).fontFamily,
        images: [...document.images].map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 })),
      }));
      if (errors.length || data.horizontalOverflow || data.foodPhotoPresent || data.images.some(img => !img.loaded) || data.menuHeading !== 'Продумываю меню' || data.menuCopy !== 'Из нашего разговора складывается меню. Я выбираю продукты и продумываю, какие блюда приготовить и как они будут сочетаться между собой.') throw Error(`Option ${option} failed at ${width}px`);
      results.push({ option, ...data, errors });
      if (width === 1440) {
        await page.setViewportSize({ width, height: 1200 });
        const menu = await page.locator('.station-menu').boundingBox();
        const heading = await page.locator('.station-menu .station-heading').boundingBox();
        const x = Math.max(0, menu.x - 16);
        await page.screenshot({ path: outputPath(`./menu-mockup-detail.png`), clip: {
          x, y: heading.y - 24, width: Math.min(width - x, menu.width + 32), height: menu.y + menu.height - heading.y + 56,
        }});
      }
      await page.close();
    }
  }
  const scenePage = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  await scenePage.goto(new URL('./index.html', import.meta.url).href);
  await scenePage.waitForFunction(() => document.documentElement.dataset.ready === 'true');
  await scenePage.addStyleTag({ content: '.menu-planning-scene { width:1536px;max-width:none;margin:0; }' });
  await scenePage.locator('.menu-planning-scene').screenshot({ path: outputPath('./scene-full-size.png') });
  await scenePage.close();
  const detailPage = await browser.newPage({ viewport: { width: 800, height: 570 }, deviceScaleFactor: 1 });
  await detailPage.goto(new URL('./notebook-detail.html', import.meta.url).href);
  await detailPage.evaluate(async () => Promise.all([...document.images].map(img => img.decode())));
  await detailPage.screenshot({ path: outputPath('./notebook-detail.png') });
  await detailPage.close();
  const reviewPage = await browser.newPage({ viewport: { width: 1210, height: 1000 }, deviceScaleFactor: 1 });
  await reviewPage.goto(new URL('./review.html', import.meta.url).href);
  await reviewPage.evaluate(async () => Promise.all([...document.images].map(img => img.decode())));
  await reviewPage.screenshot({ path: outputPath('./review.png'), fullPage: true });
  await reviewPage.close();
  await writeFile(new URL('./render-report.json', import.meta.url), JSON.stringify({ results, generatedWith: 'previous ImageGen lettering edit reused; original external block copy restored; no new generation for scope correction', productionSiteModified: false, screenshotType: 'separate HTML mockups using the existing site CSS; additional notebook close-up rendered through an HTML viewport' }, null, 2) + '\n');
  console.log(JSON.stringify(results.map(({ option, width, horizontalOverflow, images }) => ({ option, width, horizontalOverflow, allImagesLoaded: images.every(img => img.loaded) }))));
} finally { await browser.close(); }
