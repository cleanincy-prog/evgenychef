import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

async function sha256(path) {
  const bytes = await readFile(new URL(path, root));
  return createHash("sha256").update(bytes).digest("hex");
}

const exactTriviumFonts = {
  "public/fonts/cormorant-garamond-v21-cyrillic-ext-normal.woff2": "d04439363ec805132dc6c6e6a925f76efe17646f9811af8e10e218ea3dba5335",
  "public/fonts/cormorant-garamond-v21-cyrillic-normal.woff2": "d81372bae1f872f1418c0b7eb412f8a92a156a950fda8d2383701c75d38969df",
  "public/fonts/cormorant-garamond-v21-vietnamese-normal.woff2": "826f73ca737feec0eb1004808629973d6b611fddc2bd2a689b5fe331f6be6427",
  "public/fonts/cormorant-garamond-v21-latin-ext-normal.woff2": "9dc38267bdee93a653200ef3c1e8060e3f1399073432c415c683b419d3b50464",
  "public/fonts/cormorant-garamond-v21-latin-normal.woff2": "5d618c462b7a5b74f442e1548880086af71764d9cc7d35c16ab45353da934621",
  "public/fonts/cormorant-garamond-v21-cyrillic-ext-italic.woff2": "919a7720ae1671f06ebdd4f65bb9c2f0d619f81f805d85aec025c89139536292",
  "public/fonts/cormorant-garamond-v21-cyrillic-italic.woff2": "3170a883f1968a2d1135259e40fd88508da70c20337e491f171f9405d0749053",
  "public/fonts/cormorant-garamond-v21-vietnamese-italic.woff2": "3512ad3b4ddd21fa75ab44296867da1f82948350ffba678a04afbb511015cb08",
  "public/fonts/cormorant-garamond-v21-latin-ext-italic.woff2": "06bc9a8c179afaf7dd5d3b4987ad2f4a82ca85a542c9e498b18bf32ad0257d8e",
  "public/fonts/cormorant-garamond-v21-latin-italic.woff2": "e6d6d1d73858aa9b66f3a3539f9dec22faab2276e61ad1d813bc04dd59c9c122",
  "public/fonts/montserrat-v31-cyrillic-ext-normal.woff2": "744830a0e77dd14dd543a4230d6e3ce67ca961634074b5d536ebafc66c732301",
  "public/fonts/montserrat-v31-cyrillic-normal.woff2": "0b00fbd6edcc84cd5f77364bbeb06b75ed263c740061eba34511f1e2ac1a82d3",
  "public/fonts/montserrat-v31-vietnamese-normal.woff2": "9e2672d100bc36a37073fb250abfaa7394f5151bf5dda3f4d5fc281345eb391b",
  "public/fonts/montserrat-v31-latin-ext-normal.woff2": "920711de9ae96c18970fa4faca73cd302b93ac5ed57ebeb6bfec2ddeff930082",
  "public/fonts/montserrat-v31-latin-normal.woff2": "6438d7b8ea9c7c3992d5e2fd2afdb1ff948570a3ef0bedae76247b51632960ba",
};

const exactTriviumSubsetRanges = {
  "cyrillic-ext": "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
  cyrillic: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
  vietnamese: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
  "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
};

const exactRemainingReferenceCrops = {
  "public/media/blueprint-backgrounds/personal-menu-reference-exact.png": "413c019ecc94bcbabb58069becedb9c2ce4517fe95e024fa40ebd45cd42c3ff2",
  "public/media/blueprint-backgrounds/meat-reference-exact.png": "99b731e4236552fc70a6b1b93e700315e07b2f4bea2b4691f56489e7eb6cf6af",
  "public/media/blueprint-backgrounds/fish-reference-exact.png": "01b4cb016f0dfffeb1211a9900cca215c533c82f088972da506aff4dbba96a08",
  "public/media/blueprint-backgrounds/produce-reference-exact.png": "d88877c9277a1c7fffd898d08e129bba70522aea2d9fb41f5060a15e35cc0cca",
  "public/media/blueprint-backgrounds/inquiry-spoon-reference-exact.png": "6a4dad6b4e4dc1929946abbd5478d80f8a3e5734fb5bbe63ad20980a494fedb7",
};

const obsoleteTtfFonts = [
  "public/fonts/cormorant-garamond-300.ttf",
  "public/fonts/cormorant-garamond-400.ttf",
  "public/fonts/cormorant-garamond-600.ttf",
  "public/fonts/cormorant-garamond-italic-300.ttf",
  "public/fonts/cormorant-garamond-italic-400.ttf",
  "public/fonts/montserrat-300.ttf",
  "public/fonts/montserrat-400.ttf",
  "public/fonts/montserrat-500.ttf",
  "public/fonts/montserrat-600.ttf",
];

test("layers the approved collage behind the smaller chef portrait", async () => {
  const [page, css] = await Promise.all([source("app/page.tsx"), source("app/globals.css")]);
  const heroSources = page.slice(
    page.indexOf("const heroCollageSources"),
    page.indexOf("const eventFormats"),
  );
  const explicitHeroSources = heroSources.match(/"\/media\/[^"]+"/g) ?? [];

  assert.match(page, /<section className="hero" id="top"/);
  assert.match(page, /src="\/media\/chef-hero-apron\.jpg"/);
  assert.match(page, /const heroCollageSources = \[/);
  assert.match(heroSources, /\{ length: 40 \}[\s\S]*?hero-instagram/);
  assert.equal(explicitHeroSources.length, 54);
  assert.equal(new Set(explicitHeroSources).size, 54);
  assert.equal(40 + explicitHeroSources.length, 94);
  assert.equal((heroSources.match(/"\/media\/hero-collage\//g) ?? []).length, 6);
  assert.match(heroSources, /\/media\/event-formats\/private-dinner\.jpg/);
  assert.match(heroSources, /\/media\/masterchef\/evgen-grybenyk-winner-envelope-2020\.jpg/);
  for (const removed of [
    "instagram-05.webp",
    "instagram-10.webp",
    "instagram-31.webp",
    "environment-dish.webp",
    "environment-venue.webp",
    "hero-film-still-12.webp",
    "gallery-venue.webp",
    "gallery-ingredient.webp",
    "gallery-dessert-chef.webp",
    "chef-story-brush-villa.webp",
  ]) assert.ok(!heroSources.includes(removed), `removed empty-looking Hero source returned: ${removed}`);
  assert.match(page, /className="hero-media hero-collage"/);
  assert.match(page, /className="hero-collage-grid" aria-hidden="true"/);
  assert.match(page, /className="hero-collage-tile"/);
  assert.match(page, /className="hero-stage"/);
  assert.match(page, /className="hero-apron"/);
  assert.ok(page.indexOf('className="hero-copy"') < page.indexOf('className="hero-stage"'));
  assert.ok(page.indexOf('className="hero-media hero-collage"') < page.indexOf('className="hero-apron"'));
  assert.match(page, /aria-label="Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре"/);
  assert.match(page, /<span>Грыбенюк —<\/span>/);
  assert.match(page, /ваш личный/);
  assert.match(page, /Мастер-Шеф на Кипре/);
  assert.doesNotMatch(page, /hero-mosaic|CyprusPatternBand|CyprusPageRails|FormatWeaveMark/);
  assert.match(css, /\.hero\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:/);
  assert.match(css, /\.hero-stage\s*\{[^}]*position:\s*relative;[^}]*overflow:\s*hidden/);
  assert.match(css, /\.hero-media\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0/);
  assert.match(css, /\.hero-apron\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*2;[^}]*width:\s*min\(56%, 500px\);[^}]*aspect-ratio:\s*4 \/ 5/);
  assert.match(css, /\.hero-collage-grid\s*\{[^}]*grid-template-columns:\s*repeat\(8,[^}]*grid-template-rows:\s*repeat\(10,/);
  assert.match(css, /\.hero-collage-tile:nth-child\(n \+ 81\)\s*\{\s*display:\s*none/);
  assert.match(page, /sizes="\(max-width: 560px\) 12\.5vw, \(max-width: 820px\) 8\.34vw, \(max-width: 1100px\) 8vw, 7vw"/);
  assert.match(page, /loading="eager"/);
  assert.doesNotMatch(heroSources, /loading=\{index < 80/);
  assert.match(page, /fetchPriority=\{index < 12 \? "high" : "low"\}/);
  assert.match(page, /loading="eager"\s+fetchPriority=\{index < 12 \? "high" : "low"\}\s+decoding="sync"/);
  assert.match(css, /@media \(max-width: 430px\)/);
  assert.match(css, /\.hero-apron\s*\{\s*width:\s*60%/);
  assert.match(css, /\.wordmark,\s*\.header-action\s*\{\s*white-space:\s*nowrap/);
  assert.doesNotMatch(page, /className="site-nav"|className="hero-eyebrow"/);
  assert.doesNotMatch(page, /Победитель «МастерШеф\. Профессионалы — 2»/);
  assert.doesNotMatch(page, /<a href="#(?:film|menu|products)">(?:о шефе|форматы|продукты)<\/a>/);
  assert.match(css, /\.hero h1\s*\{[^}]*margin-top:\s*0/);
  const tabletHeroCss = css.slice(
    css.indexOf("@media (max-width: 1100px)"),
    css.indexOf("@media (max-width: 560px)"),
  );
  const phoneHeroCss = css.slice(
    css.indexOf("@media (max-width: 560px)"),
    css.indexOf("@media (max-width: 430px)"),
  );
  const narrowHeroCss = css.slice(
    css.indexOf("@media (max-width: 430px)"),
    css.indexOf("@media (max-width: 400px)"),
  );
  assert.doesNotMatch(tabletHeroCss, /\.hero h1\s*\{/);
  assert.match(tabletHeroCss, /\.hero-collage-grid\s*\{[^}]*grid-template-columns:\s*repeat\(7,[^}]*grid-template-rows:\s*repeat\(11,/);
  assert.match(tabletHeroCss, /\.hero-collage-tile:nth-child\(n \+ 78\)\s*\{\s*display:\s*none/);
  assert.match(tabletHeroCss, /\.hero-collage-tile:nth-child\(54\)\s*\{\s*grid-column-start:\s*8/);
  assert.match(phoneHeroCss, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(38px, calc\(1rem \+ 5\.75vw\), 44px\);[^}]*line-height:\s*1\.05/);
  assert.match(phoneHeroCss, /\.hero-collage-grid\s*\{[^}]*grid-template-columns:\s*repeat\(8,[^}]*grid-template-rows:\s*repeat\(12,/);
  assert.match(phoneHeroCss, /\.hero-collage-tile:nth-child\(n \+ 78\)\s*\{\s*display:\s*block/);
  assert.match(phoneHeroCss, /\.hero-collage-tile:nth-child\(52\)\s*\{\s*grid-column-start:\s*6/);
  assert.match(narrowHeroCss, /\.hero h1\s*\{\s*max-width:\s*340px/);
  assert.doesNotMatch(css, /\.site-nav|\.hero-eyebrow/);
  assert.doesNotMatch(page, /hero-collage-anchor/);
  assert.doesNotMatch(page, /className="hero-left"/);
  assert.doesNotMatch(css, /\.cyprus-|\.page-rail|\.pattern-module|\.format-weave|backdrop-filter/i);
  assert.equal((css.match(/border-radius\s*:/g) ?? []).length, 0);
  assert.doesNotMatch(css, /\.menu-dish/);
});

test("keeps the three exact event scenarios in editorial rows", async () => {
  const page = await source("app/page.tsx");
  const home = page.slice(page.indexOf("export default function Home"));
  const storyStart = home.indexOf('className="story"');
  const sequenceStart = home.indexOf('className="story-sequence"');
  const formatsCall = home.indexOf("<EventFormats />");
  const storyClose = home.indexOf("</section>", formatsCall);
  const presentDay = home.indexOf('className="present-day"');
  const presentAccessible = home.indexOf('className="present-day-accessible"');
  const presentProcess = home.indexOf('className="story-present-process-field"');
  const presentFilm = home.indexOf('className="story-film"');

  assert.ok(storyStart < formatsCall);
  assert.ok(storyStart < sequenceStart);
  assert.ok(sequenceStart < home.indexOf('className="story-origin"'));
  assert.ok(formatsCall < storyClose);
  assert.ok(storyClose < presentDay);
  assert.ok(presentDay < presentAccessible);
  assert.ok(presentAccessible < presentProcess);
  assert.ok(presentProcess < presentFilm);
  assert.ok(presentFilm < home.indexOf('className="sources"'));
  assert.ok(home.indexOf('className="story-award"') < home.indexOf('className="story-copy"'));
  assert.ok(home.indexOf('className="story-copy"') < formatsCall);
  assert.ok(formatsCall < presentProcess);
  assert.match(page, /const eventFormats = \[/);
  assert.match(page, /<div className="story-sequence" id="menu" aria-label="Победа MasterChef и форматы мероприятий"/);
  assert.match(page, /<ol className="format-list">/);
  assert.doesNotMatch(page, /<section className="formats"/);
  assert.doesNotMatch(page, /Вечера бывают разные|частные форматы|formats-title|formats-intro|story-formats/i);

  const ordered = [
    "Частный ужин",
    "/media/event-formats/private-dinner.jpg",
    "Приватные мероприятия",
    "/media/event-formats/private-event-outdoor-crepes.png",
    "Мастер-классы",
    "/media/event-formats/masterclass.jpg",
  ];
  let cursor = -1;
  for (const item of ordered) {
    const next = page.indexOf(item, cursor + 1);
    assert.ok(next > cursor, `${item} must keep its approved order`);
    cursor = next;
  }

  assert.match(page, /className={`format-row format-row-\$\{index \+ 1\}\$\{format\.processBackground/);
  assert.doesNotMatch(page, /menu-stages|format-weave|triptych|carousel/i);

  const workdayFacts = [
    "утро</span> закупаю продукты",
    "день</span> делаю заготовки, маринады и соусы",
    "вечер</span> готовлю у вас дома для вас и ваших гостей",
  ];
  for (const fact of workdayFacts) {
    assert.ok(page.includes(fact), `missing approved workday fact: ${fact}`);
  }
  assert.match(page, /<ul aria-label="Мой рабочий день">/);
});

test("keeps only the approved process-first blueprints active in the interface", async () => {
  const [page, css] = await Promise.all([
    source("app/page.tsx"),
    source("app/globals.css"),
  ]);
  const retiredPseudoBackgrounds = [
    "workday-plan.webp",
    "menu-plate-plan.webp",
    "meat-cut-plan.webp",
    "fish-cut-plan.webp",
    "produce-balance-plan.webp",
    "contact-spoon-plan.webp",
  ];
  const retiredDetachedDrawings = [
    "private-dinner-seven-course.png",
    "private-event-canape-studies.png",
  ];
  const activeBlueprints = [
    "/media/blueprint-backgrounds/masterchef-recipes-europe-layout-color-v2.png",
    "/media/blueprint-backgrounds/private-dinner-layout-color-v2.png",
    "/media/blueprint-backgrounds/private-event-layout-color-v2.png",
    "/media/blueprint-backgrounds/masterclass-six-person-layout-color-v2.png",
    "/media/blueprint-backgrounds/workday-four-step-vertical.png",
    "/media/blueprint-backgrounds/personal-menu-reference-exact.png",
    "/media/blueprint-backgrounds/meat-reference-exact.png",
    "/media/blueprint-backgrounds/fish-reference-exact.png",
    "/media/blueprint-backgrounds/produce-reference-exact.png",
    "/media/blueprint-backgrounds/inquiry-spoon-reference-exact.png",
  ];
  const activeBlueprintReferences = `${page}\n${css}`.match(/\/media\/blueprint-backgrounds\/[^"')\s]+/g) ?? [];

  await Promise.all(activeBlueprints.map((path) => access(new URL(`public${path}`, root))));
  await assert.rejects(access(new URL("app/blueprint-diagrams.tsx", root)));

  assert.deepEqual(activeBlueprintReferences.toSorted(), activeBlueprints.toSorted());
  assert.doesNotMatch(page, /PreparationSequence|WorkdayTrajectory|MenuComposition|SourceContour|<svg/);
  assert.doesNotMatch(css, /url\([^)]*\.svg|blueprint-figure|workday-trajectory|menu-composition|source-contour/);
  assert.match(page, /className="menu-reference-plan" aria-hidden="true"[\s\S]*?src="\/media\/blueprint-backgrounds\/personal-menu-reference-exact\.png"/);
  assert.match(css, /\.source-list::before\s*\{[^}]*background:\s*var\(--rule\)/);

  for (const name of [...retiredPseudoBackgrounds, ...retiredDetachedDrawings]) {
    assert.ok(!`${page}\n${css}`.includes(name), `retired blueprint must not be active: ${name}`);
  }

  assert.doesNotMatch(page, /block-drawing|format-drawing|story-origin-drawing/);
  assert.doesNotMatch(css, /\.block-drawing|\.format-drawing|\.story-origin-drawing/);
  assert.doesNotMatch(css, /\.story-present::before|\.sources-intro::before|\.source-row(?:(?:-[123])?)::before|\.contact::before/);
  assert.match(page, /className="story-origin-process-field"[\s\S]*?className="story-origin-process-plan"[\s\S]*?masterchef-recipes-europe-layout-color-v2\.png[\s\S]*?className="story-award"/);
  assert.match(page, /className="present-day-accessible"[\s\S]*?className="story-present-process-field"[\s\S]*?className="story-present-process-plan"[\s\S]*?workday-four-step-vertical\.png[\s\S]*?className="story-film"/);
  assert.match(page, /className="format-process-field"/);
  assert.match(page, /className="format-process-plan"/);
  assert.equal((page.match(/processBackground:\s*true/g) ?? []).length, 3);
  assert.equal((page.match(/processBackground:\s*false/g) ?? []).length, 0);
  assert.equal((page.match(/drawingSrc:\s*null/g) ?? []).length, 0);
  assert.match(page, /\) : \(\s*<figure className="format-media">[\s\S]*?<div className="format-copy">/);
  assert.match(page, /<header className="source-copy">[\s\S]*?<div className="source-images">/);
  assert.equal((page.match(/className="source-reference-plan"/g) ?? []).length, 1);
  assert.match(page, /className="source-reference-plan"[\s\S]*?src=\{chapter\.drawingSrc\}/);
  assert.match(page, /className="contact-reference-plan" aria-hidden="true"[\s\S]*?inquiry-spoon-reference-exact\.png/);
  assert.match(css, /\.format-process-field\s*\{[^}]*position:\s*relative;[^}]*aspect-ratio:\s*2 \/ 1/);
  assert.match(css, /\.format-process-plan\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*0;[^}]*object-fit:\s*contain/);
  assert.match(css, /\.story-origin-process-plan\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*0;[^}]*object-fit:\s*contain/);
  assert.match(css, /\.story-origin-process-field\s*\{[^}]*grid-column:\s*1 \/ 13;[^}]*aspect-ratio:\s*2 \/ 1/);
  assert.match(css, /\.story-origin-process-field \.story-award\s*\{[^}]*top:\s*10%;[^}]*left:\s*5%;[^}]*width:\s*42%;[^}]*height:\s*44%/);
  assert.match(css, /\.story-origin > \.story-copy\s*\{[^}]*grid-column:\s*9 \/ 13;[^}]*grid-row:\s*1/);
  assert.match(css, /\.story-origin-process-field \.story-award img\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center/);
  assert.match(css, /\.story-present-process-field\s*\{[^}]*position:\s*relative;[^}]*grid-column:\s*1 \/ -1;[^}]*aspect-ratio:\s*2 \/ 1/);
  assert.match(css, /\.story-present-process-plan\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*0;[^}]*object-fit:\s*contain/);
  assert.match(css, /\.story-present-process-field \.story-film\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*1;[^}]*top:\s*5%;[^}]*left:\s*12%;[^}]*width:\s*25\.3125%;[^}]*height:\s*90%/);
  assert.match(css, /\.present-day-accessible\s*\{[^}]*position:\s*absolute;[^}]*clip:\s*rect\(0 0 0 0\);[^}]*white-space:\s*nowrap/);
  assert.match(css, /\.format-process-field\s*\{[^}]*grid-column:\s*1 \/ 13;[^}]*aspect-ratio:\s*2 \/ 1/);
  assert.match(css, /\.format-row-1\.format-row-process \.format-media\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*1;[^}]*top:\s*5%;[^}]*left:\s*58%;[^}]*width:\s*27\.1145%;[^}]*height:\s*74%/);
  assert.match(css, /\.format-row-1\.format-row-process \.format-media img\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.format-row-2\.format-row-process \.format-process-field\s*\{[^}]*grid-column:\s*1 \/ 13/);
  assert.match(css, /\.format-row-2\.format-row-process \.format-media\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*1;[^}]*top:\s*8%;[^}]*left:\s*52%;[^}]*width:\s*37%;[^}]*height:\s*49\.1%/);
  assert.match(css, /\.format-row-2\.format-row-process \.format-media img\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.format-row-2\.format-row-process \.format-copy\s*\{[^}]*grid-column:\s*1 \/ 4;[^}]*grid-row:\s*1/);
  assert.match(css, /\.format-row-3\.format-row-process \.format-process-field\s*\{[^}]*grid-column:\s*1 \/ 13/);
  assert.match(css, /\.format-row-3\.format-row-process \.format-media\s*\{[^}]*position:\s*absolute;[^}]*z-index:\s*1;[^}]*top:\s*10%;[^}]*left:\s*2%;[^}]*width:\s*32%;[^}]*height:\s*43\.1%/);
  assert.match(css, /\.format-row-3\.format-row-process \.format-media img\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.format-row-3\.format-row-process \.format-copy\s*\{[^}]*grid-column:\s*10 \/ 13;[^}]*grid-row:\s*1/);
  assert.match(css, /@media \(max-width:\s*820px\)[\s\S]*?\.format-row-2\.format-row-process \.format-copy\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*1/);
  assert.match(css, /@media \(max-width:\s*820px\)[\s\S]*?\.format-row-2\.format-row-process \.format-process-field\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*2;[^}]*width:\s*100%/);
  assert.match(css, /@media \(max-width:\s*820px\)[\s\S]*?\.format-row-3\.format-row-process \.format-copy\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*2/);
  assert.match(css, /@media \(max-width:\s*820px\)[\s\S]*?\.format-row-3\.format-row-process \.format-process-field\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*1;[^}]*width:\s*100%/);
});

test("uses the measured Trivium typography on the approved editorial surfaces", async () => {
  const [css, favicon] = await Promise.all([
    source("app/globals.css"),
    source("public/favicon.svg"),
  ]);

  for (const value of [
    'font-family: "Cormorant Garamond"',
    'font-family: "Montserrat"',
    "--paper: #f4efe5",
    "--paper-light: #fcfaf5",
    "--ink: #0a0a0a",
    "--accent: #a0792e",
    "--accent-small: #72561f",
    "--muted: #6e665a",
    "--rule: #c8c0b3",
    ".format-row-1 .format-media",
    ".format-row-2 .format-media",
    ".format-row-3 .format-media",
    ".story-origin",
    ".story-present",
    ".source-row",
  ]) assert.ok(css.includes(value), `missing editorial-system marker: ${value}`);

  assert.doesNotMatch(css, /font-family:\s*"(?:Roboto Flex|Literata|Oranienbaum|Onest)"|--rust/);
  for (const path of Object.keys(exactTriviumFonts)) {
    assert.ok(css.includes(path.replace("public", "")), `missing exact Trivium webfont source: ${path}`);
  }
  assert.doesNotMatch(css, /\.ttf\b|format\(["']truetype["']\)|\blocal\(/i);
  assert.match(css, /text-rendering:\s*auto/);
  const faceBlocks = css.match(/@font-face\s*\{[^}]+\}/g) ?? [];
  const fontSpecs = [
    {
      family: "Cormorant Garamond",
      style: "italic",
      weights: [300, 400],
      file: (subset) => `/fonts/cormorant-garamond-v21-${subset}-italic.woff2`,
    },
    {
      family: "Cormorant Garamond",
      style: "normal",
      weights: [300, 400, 600, 700],
      file: (subset) => `/fonts/cormorant-garamond-v21-${subset}-normal.woff2`,
    },
    {
      family: "Montserrat",
      style: "normal",
      weights: [300, 400, 500, 600],
      file: (subset) => `/fonts/montserrat-v31-${subset}-normal.woff2`,
    },
  ];

  for (const { family, style, weights, file } of fontSpecs) {
    for (const weight of weights) {
      for (const [subset, unicodeRange] of Object.entries(exactTriviumSubsetRanges)) {
        const matches = faceBlocks.filter((block) =>
          block.includes(`font-family: "${family}"`) &&
          block.includes(`font-style: ${style};`) &&
          block.includes(`font-weight: ${weight};`) &&
          block.includes(`src: url("${file(subset)}") format("woff2");`) &&
          block.includes(`unicode-range: ${unicodeRange};`) &&
          block.includes("font-display: swap;"),
        );
        assert.equal(matches.length, 1, `missing exact ${family} ${style} ${weight} ${subset} face`);
      }
    }
  }

  assert.equal(faceBlocks.length, 50);
  assert.equal((css.match(/font-family:\s*"Cormorant Garamond"/g) ?? []).length, 30);
  assert.equal((css.match(/font-family:\s*"Montserrat"/g) ?? []).length, 20);
  assert.match(css, /\.hero h1\s*\{[^}]*font:\s*300 clamp\(44\.8px, 7vw, 88px\)\/1\.1 var\(--font-display\)/);
  assert.match(css, /\.section-intro h2\s*\{[^}]*font:\s*400 clamp\(32px, 4vw, 48px\)\/1\.2 var\(--font-display\)/);
  assert.match(css, /\.format-copy h3\s*\{[^}]*font:\s*400 20px\/1\.3 var\(--font-display\)/);
  assert.match(css, /\.story-copy p\s*\{[^}]*font:\s*300 16px\/1\.7 var\(--font-sans\)/);
  assert.match(css, /\.source-copy blockquote\s*\{[^}]*color:\s*var\(--accent-small\);[^}]*font:\s*300 clamp\(20px, 2vw, 27px\)\/1\.4 var\(--font-accent\)/);
  assert.match(css, /\.contact h2\s*\{[^}]*font:\s*400 clamp\(32px, 4vw, 48px\)\/1\.2 var\(--font-display\)/);
  assert.match(css, /\.story-award\s*\{[^}]*grid-column:\s*1 \/ 7/);
  assert.match(css, /\.story-copy\s*\{[^}]*grid-column:\s*8 \/ 13/);
  assert.match(css, /\.story-sequence,\s*\.story-present\s*\{[^}]*max-width:\s*var\(--content\)/);
  assert.doesNotMatch(css, /\.story-formats/);
  assert.doesNotMatch(css, /\.formats-intro/);
  assert.doesNotMatch(css, /\.format-list\s*\{[^}]*border-top/);
  assert.doesNotMatch(css, /\.story-origin\s*\{[^}]*border-bottom/);
  assert.match(css, /\.present-day\s*\{[^}]*background:\s*var\(--paper-light\)/);
  assert.match(css, /\.story-present-process-field \.story-film,\s*\.story-present-process-field \.story-film video\s*\{\s*aspect-ratio:\s*9 \/ 16/);
  assert.match(css, /\.format-row \.format-media\s*\{[^}]*height:\s*clamp\(164px, 46vw, 184px\);[^}]*aspect-ratio:\s*auto/);
  assert.match(css, /\.story-origin\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\);\s*gap:\s*14px;\s*align-items:\s*start/);
  assert.match(css, /\.story-award\s*\{[^}]*grid-column:\s*1 \/ 5;[^}]*grid-row:\s*1;[^}]*width:\s*auto/);
  assert.match(css, /\.story-copy\s*\{[^}]*display:\s*block;[^}]*grid-column:\s*5 \/ 13;[^}]*grid-row:\s*1/);
  assert.match(css, /\.format-row-1 \.format-media,\s*\.format-row-3 \.format-media\s*\{\s*grid-column:\s*1 \/ 6;\s*grid-row:\s*1/);
  assert.match(css, /\.format-row-2 \.format-media\s*\{\s*grid-column:\s*8 \/ 13;\s*grid-row:\s*1/);
  assert.match(css, /\.format-row-1 \.format-copy,[^}]*\.format-row-3 \.format-copy\s*\{\s*grid-column:\s*6 \/ 13;\s*grid-row:\s*1/);
  assert.match(css, /\.format-row-2 \.format-copy\s*\{\s*grid-column:\s*1 \/ 8;\s*grid-row:\s*1/);
  assert.match(css, /\.format-copy\s*\{[^}]*display:\s*block;[^}]*min-width:\s*0;[^}]*align-self:\s*start/);
  assert.doesNotMatch(css, /\.format-copy\s*\{\s*display:\s*contents/);
  assert.match(css, /\.format-copy p\s*\{[^}]*margin-top:\s*10px;[^}]*color:\s*var\(--ink\);[^}]*font-size:\s*13\.6px;[^}]*font-weight:\s*300;[^}]*line-height:\s*1\.55/);
  assert.match(css, /\.story-award,\s*\.story-award img\s*\{[^}]*height:\s*clamp\(196px, 56vw, 218px\);[^}]*aspect-ratio:\s*auto/);
  assert.match(css, /\.story-copy p\s*\{\s*color:\s*var\(--ink\);\s*font-size:\s*14px;\s*font-weight:\s*300;\s*line-height:\s*1\.55/);
  assert.match(css, /\.hero-apron\s*\{\s*bottom:\s*104px;\s*width:\s*min\(60%, 300px\)/);
  assert.doesNotMatch(css, /overflow-x:\s*auto/);
  assert.doesNotMatch(css, /--forest|#18382f|#193d32|#153f37/i);
  assert.match(css, /\.story\s*\{[^}]*background:\s*var\(--paper\)/);
  assert.match(css, /\.contact\s*\{[^}]*background:\s*#f7f4ef/);
  assert.match(css, /\.site-footer\s*\{[^}]*background:\s*var\(--paper-light\)/);
  assert.match(css, /\.format-copy p\s*\{[^}]*font:\s*300 14\.08px\/1\.8 var\(--font-sans\)/);
  assert.match(css, /\.contact-action\s*\{[^}]*border:\s*0;[^}]*color:\s*var\(--ink\);[^}]*font:\s*600 12px\/1\.7 var\(--font-sans\)/);
  assert.match(css, /\.header-action\s*\{[^}]*font-family:\s*var\(--font-sans\);[^}]*font-size:\s*11\.2px/);
  assert.match(css, /\.header-action\s*\{[^}]*color:\s*var\(--accent-small\);[^}]*font-size:\s*11\.2px;[^}]*font-weight:\s*600;[^}]*line-height:\s*1\.35;[^}]*letter-spacing:\s*\.14em/);
  assert.match(css, /\.site-footer > a:first-child\s*\{[^}]*font:\s*600 24px\/1\.1 var\(--font-display\)/);
  assert.match(css, /\.site-footer > a:last-child\s*\{[^}]*font-size:\s*14\.72px/);
  assert.match(favicon, /fill="#193D32"/);
  assert.match(favicon, /stroke="#B24F2F"/);
  assert.match(favicon, /fill="#FFF9EE"/);
  assert.match(css, /html\s*\{[^}]*background:\s*var\(--paper\)/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|mesh-gradient|glassmorphism|drop-shadow/i);
});

test("applies outcome-specific actions and interaction-only motion", async () => {
  const [page, css, motion] = await Promise.all([
    source("app/page.tsx"),
    source("app/globals.css"),
    source("app/media-motion.tsx"),
  ]);

  assert.equal((page.match(/Обсудить вечер в Instagram @evg\.chef/g) ?? []).length, 2);
  assert.match(page, />\s*обсудить вечер <span aria-hidden="true">↗<\/span>/);
  assert.match(page, /<span>обсудить вечер<\/span>/);
  assert.match(css, /--motion-feedback:\s*160ms ease-out/);
  assert.match(css, /html\s*\{[^}]*scroll-behavior:\s*smooth/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*auto/);
  assert.match(css, /\.header-action:active\s*\{\s*transform:\s*translateY\(1px\)/);
  assert.match(css, /\.contact-action:active\s*\{\s*transform:\s*translateY\(1px\)/);
  assert.doesNotMatch(css, /animation:|animation-timeline|clip-path|:hover\s+img|parallax|marquee/);
  assert.doesNotMatch(css, /font(?:-size)?:\s*(?:[^;]*\s)?(?:8|9|10)px\b/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /IntersectionObserver/);
  assert.doesNotMatch(motion, /chef-media-motion|MediaMotionControl|data-media-paused|CustomEvent/);
});

test("preserves the approved story, sourcing evidence and accessibility", async () => {
  const [page, video, layout, config, favicon] = await Promise.all([
    source("app/page.tsx"),
    source("app/chef-story-video.tsx"),
    source("app/layout.tsx"),
    source("app/site-config.ts"),
    source("public/favicon.svg"),
  ]);

  for (const text of [
    "От MasterChef",
    "Я —",
    "Я не работаю по меню",
    "Хотите ягнёнка? — еду за ним в горы.",
    "Нужна рыба? — еду в порт к рыбакам.",
    "Свежие овощи и фрукты? — только с кипрских ферм.",
    "Расскажите мне,",
  ]) assert.ok(page.includes(text));
  assert.doesNotMatch(page, /Победитель «МастерШеф\. Профессионалы — 2»/);

  const sourceOrder = [
    "/media/sourcing/evgen-half-lamb-market-v1.webp",
    "/media/sourcing/evgen-fish-harbour-market-v1.webp",
    "/media/sourcing/evgen-grape-harvest.webp",
  ];
  let cursor = -1;
  for (const item of sourceOrder) {
    const next = page.indexOf(item, cursor + 1);
    assert.ok(next > cursor, `${item} must keep source order`);
    cursor = next;
  }
  assert.equal((page.match(/\/media\/sourcing\//g) ?? []).length, 3);
  assert.doesNotMatch(page, /cyprus-sheep-herd|larnaca-fish-market-seller|kissonerga-meat-counter|fishermen-catch|cyprus-strawberry-greenhouse/);
  assert.match(await source("app/globals.css"), /\.source-images\s*\{[^}]*width:\s*100%;[^}]*aspect-ratio:\s*16 \/ 10;[^}]*overflow:\s*hidden;[^}]*background:\s*#f7f4ef/);
  assert.match(await source("app/globals.css"), /\.source-images img\s*\{[^}]*object-fit:\s*cover/);
  assert.match(await source("app/globals.css"), /\.source-row-3 \.source-images img\s*\{[^}]*object-fit:\s*contain/);

  assert.match(page, /className="skip-link" href="#main-content"/);
  assert.match(page, /className="contact-reference-plan" aria-hidden="true"/);
  assert.match(page, /src="\/media\/blueprint-backgrounds\/inquiry-spoon-reference-exact\.png"/);
  assert.doesNotMatch(page, /className="contact-art"|chef-story-brush-villa\.png/);
  assert.match(page, /target="_blank"[\s\S]*?rel="noreferrer"/);
  assert.match(layout, /<html lang="ru">/);
  assert.match(layout, /metadataBase: new URL\(SITE_URL\)/);
  assert.match(config, /Евгений Грыбенюк/);
  assert.doesNotMatch(`${page}\n${config}\n${favicon}`, /Грыбеник/);
  assert.match(video, /muted/);
  assert.match(video, /loop/);
  assert.match(video, /playsInline/);
  assert.match(video, /preload="none"/);
  assert.match(video, /kind="captions"/);
  assert.doesNotMatch(video, /\bautoPlay\b|\bcontrols\b/);
});

test("keeps readability-specific desktop, tablet and narrow-phone geometry", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /\.format-row\s*\{[^}]*grid-template-columns:\s*repeat\(12,[^}]*padding:\s*clamp\(30px, 3\.4vw, 46px\) 0/);
  assert.match(css, /\.format-row-3 \.format-media\s*\{\s*grid-column:\s*1 \/ 8/);
  assert.match(css, /\.format-row-3 \.format-copy\s*\{\s*grid-column:\s*9 \/ 13/);
  assert.match(css, /\.story-intro\s*\{\s*margin-bottom:\s*clamp\(48px, 5vw, 72px\)/);
  assert.match(css, /\.source-row\s*\{[^}]*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\);[^}]*align-items:\s*center/);
  assert.match(css, /\.source-copy\s*\{\s*grid-column:\s*1 \/ 4/);
  assert.match(css, /\.source-images\s*\{\s*grid-column:\s*4 \/ 8;\s*grid-row:\s*1/);
  assert.match(css, /\.source-reference-plan\s*\{[^}]*grid-column:\s*8 \/ 13;[^}]*grid-row:\s*1;[^}]*width:\s*100%;[^}]*height:\s*auto/);
  assert.doesNotMatch(css, /min-height:\s*(?:700|600|392)px/);
  assert.doesNotMatch(css, /padding:\s*26px 0 154px/);

  const tablet = css.slice(css.indexOf("@media (min-width: 561px) and (max-width: 820px)"), css.indexOf("@media (max-width: 560px)"));
  assert.match(tablet, /\.hero-stage\s*\{\s*aspect-ratio:\s*8 \/ 5/);
  assert.match(tablet, /grid-template-columns:\s*repeat\(12,/);
  assert.match(tablet, /grid-template-rows:\s*repeat\(8,/);
  assert.match(tablet, /\.hero-collage-tile:nth-child\(n \+ 78\)\s*\{\s*display:\s*block/);
  assert.match(tablet, /\.hero-collage-tile:nth-child\(n \+ 97\)\s*\{\s*display:\s*none/);
  assert.match(tablet, /\.story-award\s*\{\s*grid-column:\s*1 \/ 6/);
  assert.match(tablet, /\.story-copy\s*\{\s*grid-column:\s*6 \/ 13/);
  assert.match(tablet, /\.format-row-1 \.format-media,[\s\S]*?grid-column:\s*1 \/ 6;\s*grid-row:\s*1/);
  assert.match(tablet, /\.format-row-2 \.format-copy\s*\{\s*grid-column:\s*1 \/ 8;\s*grid-row:\s*1/);
  assert.doesNotMatch(tablet, /\.story-present-copy|\.story-film\s*\{\s*grid-column/);
  assert.match(tablet, /\.source-row\s*\{[^}]*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\)/);
  assert.match(tablet, /\.source-images\s*\{\s*grid-column:\s*4 \/ 8;\s*grid-row:\s*1/);
  assert.match(tablet, /\.source-reference-plan\s*\{\s*grid-column:\s*8 \/ 13;\s*grid-row:\s*1/);

  const phone = css.slice(css.indexOf("@media (max-width: 560px)"), css.indexOf("@media (max-width: 430px)"));
  const narrowPhone = css.slice(css.indexOf("@media (max-width: 430px)"), css.indexOf("@media (max-width: 400px)"));
  assert.match(phone, /\.present-day\s*\{\s*padding:\s*34px 18px 30px/);
  assert.match(phone, /\.story-present\s*\{\s*display:\s*block/);
  assert.doesNotMatch(phone, /\.story-present-copy|\.story-present ul|\.story-present li|\.story-film\s*\{\s*grid-column/);
  assert.match(phone, /\.sources-intro\s*\{[^}]*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\);[^}]*gap:\s*14px 10px;[^}]*margin-bottom:\s*16px/);
  assert.match(phone, /\.sources-heading h2\s*\{[^}]*margin-top:\s*18px/);
  assert.match(phone, /\.sources-lede\s*\{[^}]*width:\s*min\(310px, 92%\);[^}]*font-size:\s*13\.6px;[^}]*line-height:\s*1\.6/);
  assert.match(phone, /\.menu-reference-plan\s*\{[^}]*grid-column:\s*1 \/ -1;[^}]*grid-row:\s*2;[^}]*width:\s*100%;[^}]*margin-top:\s*4px/);
  assert.match(phone, /\.source-row\s*\{[^}]*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\);[^}]*gap:\s*14px;[^}]*align-items:\s*center;[^}]*padding:\s*26px 0/);
  assert.match(phone, /\.source-copy\s*\{[^}]*grid-template-columns:\s*30px minmax\(0, 1fr\);[^}]*column-gap:\s*8px/);
  assert.match(phone, /\.source-copy blockquote\s*\{[^}]*grid-column:\s*1 \/ -1;[^}]*color:\s*var\(--accent-small\);[^}]*font-size:\s*clamp\(18px, 4\.8vw, 20px\);[^}]*line-height:\s*1\.35/);
  assert.match(phone, /\.source-images\s*\{[^}]*grid-column:\s*6 \/ 13;[^}]*grid-row:\s*1;[^}]*aspect-ratio:\s*16 \/ 10/);
  assert.match(phone, /\.source-reference-plan\s*\{[^}]*grid-column:\s*1 \/ -1;[^}]*grid-row:\s*2;[^}]*width:\s*100%/);
  assert.match(css, /\.source-list::before\s*\{[^}]*left:\s*16px/);
  assert.doesNotMatch(phone, /\.source-row-2\s*\{/);
  assert.match(phone, /\.contact\s*\{[^}]*margin:\s*0 18px 24px;[^}]*padding:\s*34px 18px 24px/);
  assert.match(phone, /\.contact-reference-plan\s*\{\s*margin-top:\s*8px/);
  assert.match(narrowPhone, /\.contact-reference-plan\s*\{\s*margin-top:\s*6px/);
  assert.match(phone, /\.site-footer\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) auto;[^}]*padding:\s*14px 18px 18px/);
  assert.match(css, /\.contact-reference-plan\s*\{[^}]*grid-column:\s*5 \/ 10;[^}]*grid-row:\s*1 \/ 3;[^}]*width:\s*100%/);
  assert.match(css, /\.contact-reference-plan img\s*\{[^}]*width:\s*100%;[^}]*height:\s*auto/);

  assert.match(css, /@media \(max-width: 400px\)[\s\S]*?\.wordmark\s*\{[^}]*font-size:\s*18px;[^}]*letter-spacing:\s*\.08em/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.site-header\s*\{[^}]*min-height:\s*70px/);
  assert.match(css, /@media \(max-width: 400px\)[\s\S]*?\.header-action\s*\{[^}]*font-size:\s*11\.2px;[^}]*letter-spacing:\s*\.08em/);
  assert.match(css, /@media \(max-width: 380px\)[\s\S]*?\.header-action span\s*\{\s*display:\s*none/);
  assert.doesNotMatch(css, /background:\s*var\(--ink\);[\s\S]{0,180}\.hero-(?:stage|media|collage-tile|apron)/);
});

test("keeps records and rejects the obsolete visible-system files", async () => {
  await Promise.all([
    "AGENTS.md",
    "docs/DESIGN_AUDIT.md",
    "docs/DESIGN_REFERENCE_MAP.md",
    "docs/DESIGN_SYSTEM.md",
    "docs/WEBSITEFACTORY_REFERENCE_RESEARCH_2026-09-01.md",
    "public/media/blueprint-backgrounds/workday-plan.webp",
    "public/media/blueprint-backgrounds/menu-plate-plan.webp",
    "public/media/blueprint-backgrounds/meat-cut-plan.webp",
    "public/media/blueprint-backgrounds/fish-cut-plan.webp",
    "public/media/blueprint-backgrounds/produce-balance-plan.webp",
    "public/media/blueprint-backgrounds/contact-spoon-plan.webp",
    "public/media/blueprint-backgrounds/masterchef-recipes-europe.png",
    "public/media/blueprint-backgrounds/private-dinner-seven-course.png",
    "public/media/blueprint-backgrounds/private-dinner-process-v2.png",
    "public/media/blueprint-backgrounds/private-dinner-calculation-process.png",
    "public/media/blueprint-backgrounds/private-event-canape-studies.png",
    "public/media/blueprint-backgrounds/private-event-production-calculation.png",
    "public/media/blueprint-backgrounds/masterclass-six-person-learning-process.png",
    "public/media/blueprint-backgrounds/masterchef-recipes-europe-layout-color-v2.png",
    "public/media/blueprint-backgrounds/private-dinner-layout-color-v2.png",
    "public/media/blueprint-backgrounds/private-event-layout-color-v2.png",
    "public/media/blueprint-backgrounds/masterclass-six-person-layout-color-v2.png",
    "public/media/blueprint-backgrounds/workday-four-step-vertical.png",
    "public/media/blueprint-backgrounds/personal-menu-reference-exact.png",
    "public/media/blueprint-backgrounds/meat-reference-exact.png",
    "public/media/blueprint-backgrounds/fish-reference-exact.png",
    "public/media/blueprint-backgrounds/produce-reference-exact.png",
    "public/media/blueprint-backgrounds/inquiry-spoon-reference-exact.png",
    "docs/references/ideal-remaining-blueprints-2026-09-02.png",
    "public/media/chef-hero-apron.jpg",
    "public/media/chef-story-img-5399-no-grill.mp4",
    "public/media/chef-story-img-5399-poster.jpg",
    "public/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg",
    "public/media/event-formats/private-dinner.jpg",
    "public/media/event-formats/private-event-outdoor-crepes.png",
    "public/media/event-formats/masterclass.jpg",
    "public/media/optimized/gallery-dish.webp",
    "public/fonts/CORMORANT-GARAMOND-OFL.txt",
    "public/fonts/MONTSERRAT-OFL.txt",
    ...Object.keys(exactTriviumFonts),
    ...Array.from(
      { length: 40 },
      (_, index) => `public/media/hero-instagram/hero-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  ].map((path) => access(new URL(path, root))));

  await assert.rejects(access(new URL("app/hero-blur-preview/page.tsx", root)));
  await assert.rejects(access(new URL("app/hero-mosaic-video.tsx", root)));
  await assert.rejects(access(new URL("app/blueprint-diagrams.tsx", root)));
  await Promise.all(obsoleteTtfFonts.map((path) => assert.rejects(access(new URL(path, root)))));

  for (const [path, expectedHash] of Object.entries(exactTriviumFonts)) {
    const bytes = await readFile(new URL(path, root));
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "wOF2", `${path} must be a WOFF2 binary`);
    assert.equal(await sha256(path), expectedHash, `${path} must stay byte-identical to Trivium's served payload`);
  }

  for (const [path, expectedHash] of Object.entries(exactRemainingReferenceCrops)) {
    assert.equal(await sha256(path), expectedHash, `${path} must stay byte-identical to the approved screenshot crop`);
  }
});
