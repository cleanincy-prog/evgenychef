import { writeFile } from 'node:fs/promises';
import { chef, formats } from '../src/content.mjs';
import { serviceRenders } from '../src/service-renders.mjs';
import { renderProcess } from '../src/process.mjs';
import { heroImages, heroVideo, heroStoryShots, heroCollageWideDesktop, heroCollageWideCompact, heroIntroStyles } from '../src/hero-collage.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const media = file => `/media/chef/${file}`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.4"/></svg>';
const button = (label, href = '#contact', tone = '', attrs = '') => `<a class="button ${tone}" href="${href}" ${attrs}><span class="voice-mono">${label}</span>${arrow}</a>`;
const image = (file, alt, cls = '', extra = '') => `<img src="${media(file)}" alt="${escape(alt)}" class="${cls}" loading="lazy" decoding="async" ${extra}>`;
const formatImage = (format, cls, sizes) => image(format.photo, format.alt, cls, `width="${format.width}" height="${format.height}" srcset="${media(format.small)} 768w, ${format.medium ? `${media(format.medium)} 1536w, ` : ''}${media(format.photo)} ${format.width}w" sizes="${sizes}"`);
const sceneSourceSet = scene => `${media(scene.small)} ${scene.smallWidth}w, ${media(scene.photo)} ${scene.width}w`;
const sceneImage = format => {
  const { desktop, mobile, square } = serviceRenders[format.id];
  return `<picture><source media="(max-width:767px)" srcset="${sceneSourceSet(mobile)}" sizes="100vw" width="${mobile.width}" height="${mobile.height}">${square ? `<source media="(max-aspect-ratio:7/5)" srcset="${sceneSourceSet(square)}" sizes="100vw" width="${square.width}" height="${square.height}">` : ''}${image(desktop.photo, format.alt, 'service-photo', `width="${desktop.width}" height="${desktop.height}" srcset="${sceneSourceSet(desktop)}" sizes="100vw"`)}</picture>`;
};
const number = i => String(i + 1).padStart(2, '0');
const collageImage = (entry, sizes, priority = 'auto') => `<img src="${entry.src}" srcset="${entry.srcSet}" sizes="${sizes}" width="${entry.width}" height="${entry.height}" alt="" loading="eager" decoding="async" fetchpriority="${priority}">`;
const collageVideo = () => `<img src="${heroVideo.poster}" width="${heroVideo.width}" height="${heroVideo.height}" alt="" loading="eager" decoding="async"><video data-hero-video data-src="${heroVideo.src}" poster="${heroVideo.poster}" width="${heroVideo.width}" height="${heroVideo.height}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video><button type="button" class="hero-video-toggle" aria-label="Воспроизвести видео с шефом" hidden><svg class="hero-video-pause" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" fill="none" stroke="currentColor" stroke-width="2"/></svg><svg class="hero-video-play" viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor"/></svg></button>`;
const dialog = (id, label, content) => `<dialog id="${id}" class="sheet" aria-labelledby="${id}-title" data-lenis-prevent><div class="sheet-top"><a href="#top" class="wordmark" data-close>${chef.wordmark}</a><button type="button" class="close-sheet voice-mono" data-close aria-label="Закрыть окно">Закрыть <span aria-hidden="true">×</span></button></div><div class="sheet-inner">${content}</div></dialog>`;

const html = `<!doctype html>
<html lang="ru" class="cormorant_garamond_5cf6ee7e-module__oQQLIW__variable dm_sans_3d80eddf-module__18Q8-q__variable">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#2c2622">
  <title>${chef.title}</title>
  <meta name="description" content="${chef.description}">
  <meta property="og:title" content="${chef.title}">
  <meta property="og:description" content="${chef.description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:image" content="/media/chef/hero.webp">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/b0947914c9718a1e-s.0l.9lak812di~.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/01e4147cff8141ee-s.p.10ked.7w885.g.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${heroImages[62].src}" as="image" imagesrcset="${heroImages[62].srcSet}" imagesizes="(max-width: 620px) 60vw, 29vw" fetchpriority="high">
  <link rel="stylesheet" href="/assets/reference.css">
  <link rel="stylesheet" href="/assets/local.css">
  <link rel="stylesheet" href="/assets/process.css">
  <link rel="stylesheet" href="/assets/hero-collage.css">
  <link rel="stylesheet" href="/assets/bao-motion.css">
  <link rel="stylesheet" href="/assets/story-timeline.css">
  <link rel="stylesheet" href="/assets/story-pasta.css">
  <link rel="stylesheet" href="/assets/about-glass.css">
  <script type="module" src="/assets/hero-collage.js"></script>
  <script type="module" src="/assets/bao-site.js"></script>
  <script type="module" src="/assets/process.js"></script>
  <script type="module" src="/assets/story-pasta.js"></script>
  <noscript><style>.hero-frame[data-hero-intro="pending"] .hero-collage-grid, .hero-frame[data-hero-intro="pending"] .hero-identity, .hero-frame[data-hero-intro="pending"] .hero-bottom, .hero-frame[data-hero-intro="pending"] .scroll-cue, .hero-frame[data-hero-intro="pending"] .hero-shade, .hero-frame[data-hero-intro="pending"] .hero-portrait { animation: none; }</style></noscript>
</head>
<body id="top">
<a class="skip-link" href="#main">К содержимому</a>
<header class="site-header">
  <div class="nav-ice-curve" aria-hidden="true"><div class="nav-ice-blur"></div><div class="nav-ice-tint"></div></div>
  <nav class="header-inner" aria-label="Основная навигация">
    <ul class="header-links"><li><a href="#services" class="link-underline voice-mono">Форматы</a></li><li><a href="#about" class="link-underline voice-mono">О шефе</a></li><li><a href="#ingredients" class="link-underline voice-mono">Продукты</a></li></ul>
    <a class="wordmark" href="#top" aria-label="Евгений Гребеник — к началу">${chef.wordmark}</a>
    <div class="header-actions"><a href="#process" class="link-underline voice-mono">Как всё проходит</a>${button('Обсудить вечер', '#contact', 'compact')}</div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню"><span></span><span></span></button>
  </nav>
  <nav id="mobile-menu" class="mobile-menu" aria-label="Мобильная навигация" hidden>
    <a href="#services">Форматы</a><a href="#about">О шефе</a><a href="#process">Как всё проходит</a><a href="#ingredients">Продукты</a><a href="#menu">Персональное меню</a><a href="#contact">Обсудить вечер ${arrow}</a>
  </nav>
</header>
<main id="main" tabindex="-1">
  <section class="hero hero-frame grain" data-hero-intro="pending" aria-labelledby="hero-title">
    <div class="hero-background"><div class="hero-collage-grid">
      <figure class="hero-portrait"><img src="${media('hero-portrait-original.jpg')}" width="576" height="1280" alt="Евгений Гребеник улыбается, стоя в полосатом поварском фартуке" loading="eager" fetchpriority="high" decoding="async"></figure>
      ${heroImages.map((entry,index)=>`<div class="collage-tile${heroCollageWideDesktop.has(index) ? ' collage-tile--wide-desktop' : ''}${heroCollageWideCompact.has(index) ? ' collage-tile--wide-compact' : ''}${index === heroVideo.index ? ' collage-tile--video' : ''}" data-photo-index="${index}" style="${heroIntroStyles[index]}">${index === heroVideo.index ? collageVideo() : collageImage(entry, `(max-width: 767px) ${heroCollageWideCompact.has(index) ? '25vw' : '12.5vw'}, ${heroCollageWideDesktop.has(index) ? '20vw' : '10vw'}`)}</div>`).join('')}
      <div class="hero-shade" aria-hidden="true"></div>
    </div></div>
    <div class="hero-story" aria-hidden="true">${heroStoryShots.map(shot=>`<figure class="hero-story-shot" data-story-photo="${shot.index}" style="--story-delay:${shot.delay}ms;--story-depart:${shot.depart}ms;--story-flight:${shot.flight}ms">${collageImage(heroImages[shot.index], '(max-width: 620px) 60vw, 29vw', 'high')}</figure>`).join('')}</div>
    <div class="hero-content">
      <div class="hero-identity">
        <div class="hero-center">
          <h1 id="hero-title"><span class="line-mask"><span>Евгений</span></span><span class="line-mask"><span><em>Гребеник.</em></span></span></h1>
          <div class="hero-kicker hero-enter"><span></span><p class="voice-mono">Ваш личный мастер-шеф на Кипре</p></div>
          <p class="hero-description hero-enter">Частные ужины, приватные мероприятия и мастер-классы на Кипре.</p>
          <div class="button-row hero-actions hero-enter">${button('Обсудить ваш вечер')}</div>
        </div>
      </div>
      <div class="hero-bottom voice-mono hero-enter"><p><span class="status-dot"></span>Современная авторская кухня</p></div>
      <span class="scroll-cue" aria-hidden="true"><svg width="19" height="11" viewBox="0 0 19 11" fill="none"><path d="m1 1.6 8.4 8.3L18 1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
    </div>
  </section>

  <section id="about" class="about-section about-glass section-space" aria-labelledby="about-title">
    <div class="container">
      <div class="about-grid">
        <div class="about-heading" data-reveal><h2 id="about-title" class="editorial-heading">Мой опыт —<br><em>для вашего вечера.</em></h2></div>
        <figure class="about-photo" data-reveal>${image('masterchef-1280.jpg', 'Евгений Гребеник в поварском кителе с конвертом победителя на «МастерШеф. Профессионалы»', 'about-portrait', 'width="1280" height="1160"')}<figcaption class="voice-mono">Евгений Гребеник · «МастерШеф. Профессионалы»</figcaption></figure>
        <div class="about-copy" data-reveal>${chef.biography.map(p=>`<p class="body-copy">${p}</p>`).join('')}<p class="bio-note voice-mono">Франция · Швейцария · Германия</p></div>
      </div>
      <div class="about-facts" role="group" aria-label="Опыт и подход">
        <div class="numbers-grid">
          <div data-reveal><p class="number"><span data-count="25">25</span>+</p><p>лет в гастрономии</p></div>
          <div data-reveal><p class="number"><span data-count="20">20</span>+</p><p>лет работы шеф-поваром</p></div>
          <div data-reveal><p class="number number--text">Ваши вкусы</p><p>основа каждого меню</p></div>
          <div data-reveal><p class="number number--text">Готовлю</p><p>по всему Кипру для вас</p></div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" aria-labelledby="services-title">
    <div class="sq-track" style="--panel-count:${formats.length}">
      <div class="sq-sticky">
        <div class="sq-intro">
          <div class="sq-intro-content"><h2 id="services-title" class="display">Какой будет<br><em>ваш вечер?</em></h2><p>Собрать близких, встретиться с друзьями<br>или приготовить ужин вместе.</p></div>
          <div class="sq-marquee" aria-hidden="true"><div class="animate-marquee">${Array(2).fill('<div class="sq-marquee-group"><span>Приватный ужин</span><i></i><span>Частные мероприятия</span><i></i><span>Мастер-классы</span><i></i></div>').join('')}</div></div>
        </div>
        <nav class="sq-nav" aria-label="Выбор формата">${formats.map((f,i)=>`<button type="button" data-service-jump="${i}" aria-label="Показать формат: ${f.nav}" class="voice-mono">${f.nav}</button>`).join('')}<span class="sq-progress" aria-hidden="true"><span></span></span></nav>
        ${formats.map((f,i)=>`<article class="sq-panel" id="format-${f.id}" data-service="${i}">
          <figure class="sq-photo">${sceneImage(f)}</figure><div class="sq-shade" aria-hidden="true"></div>
          <div class="sq-content container"><div class="sq-copy"><h3>${f.title}<em>${f.subtitle}</em></h3><p class="service-description">${f.description}</p><div class="button-row">${button('Обсудить встречу', '#contact', 'light')}${f.id === 'dinner' ? button('Подробнее', `#details-${f.id}`, 'glass', `data-dialog="details-${f.id}"`) : ''}</div></div></div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <div class="dinner-story" data-snap>
  ${renderProcess()}

  <div class="story-footer story-only"><a class="story-action" href="${chef.instagram}" target="_blank" rel="noopener noreferrer">Обсудим ваш вечер${arrow}</a></div>
  </div>

  <section id="contact" class="contact-section grain" aria-labelledby="contact-title">
    ${image('plating.webp', '', 'cover', 'width="1200" height="969"')}
    <div class="contact-shade"></div><div class="container centered contact-inner"><div data-reveal><p class="eyebrow">Начнём с разговора</p><h2 id="contact-title">Обсудим<br><em>ваш вечер.</em></h2><p>Напишите мне о поводе, дате и количестве гостей.<br>Вместе найдём подходящий формат.</p></div><div data-reveal>${button('Написать в Instagram', chef.instagram, '', 'target="_blank" rel="noopener noreferrer"')}<p class="contact-handle">@evg.chef</p></div></div>
  </section>
</main>

${formats.filter(f=>f.id === 'dinner').map(f=>dialog(`details-${f.id}`,f.title,`<div class="sheet-grid"><div><p class="eyebrow">Формат встречи</p><h2 id="details-${f.id}-title">${f.title}</h2><p class="sheet-lead">${f.lead}</p><p class="body-copy">${f.description}</p><ol class="detail-list">${f.details.map((p,i)=>`<li><span class="voice-mono">${number(i)}</span><p>${p}</p></li>`).join('')}</ol>${button('Обсудить встречу', '#contact', '', 'data-close')}</div><figure>${formatImage(f, 'sheet-photo', '(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 43vw, 501px')}</figure></div>`)).join('')}
</body>
</html>`;

await writeFile(new URL('../public/index.html', import.meta.url), html.replace(/[ \t]+$/gm, ''));
console.log(`Rendered homepage: ${formats.length} formats, 6 cinematic chapters, original photographs and preparation video.`);
