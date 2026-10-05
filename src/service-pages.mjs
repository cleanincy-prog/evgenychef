import { chef, formats } from './content.mjs';
import { homePath, servicePath, alternatePath, pageFor } from './pages.mjs';
import { renderSeoHead, pageImage, escapeAttribute as escape } from './seo.mjs';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.4"/></svg>';
const labels = {
  ru: { home: 'Частный шеф на Кипре', language: 'English', contact: 'Написать в Instagram',
    contents: 'Об этой встрече', questions: 'Перед встречей', discuss: 'Обсудим ваши планы',
    note: 'Напишите дату, место на Кипре и количество гостей. Расскажите о поводе и пожеланиях к еде.',
    services: 'Ужины, мероприятия и мастер-классы',
    introduction: 'Персональное меню, приготовление и подача — для вашего вечера с шефом Евгением Гребеником.',
    navigation: 'Подробно об услугах', skip: 'К содержимому', caption: 'Евгений Гребеник · Кипр' },
  en: { home: 'Private chef in Cyprus', language: 'Русский', contact: 'Message on Instagram',
    contents: 'About this experience', questions: 'Before we meet', discuss: 'Let’s discuss your plans',
    note: 'Share the date, location in Cyprus and number of guests. Tell me about the occasion and the food you enjoy.',
    services: 'Dinners, private events and cooking classes',
    introduction: 'A personal menu, cooking and serving — for your evening with chef Evgen Grebenik.',
    navigation: 'Explore the services', skip: 'Skip to content', caption: 'Evgen Grebenik · Cyprus' },
};
export function languageLink(page, className = 'language-link') {
  const language = page.language === 'ru' ? 'en' : 'ru';
  return `<a class="${className}" href="${alternatePath(page, language)}" lang="${language}" hreflang="${language}">${labels[page.language].language}</a>`;
}
export function renderServiceFooter(page) {
  const t = labels[page.language];
  return `<footer class="site-index" id="explore" aria-labelledby="explore-title"><div class="container">
    <div class="site-index-heading"><h2 id="explore-title">${t.home}</h2>${languageLink(page)}</div>
    <p>${t.introduction}</p>
    <nav aria-label="${t.navigation}">${formats.map(format => {
      const other = pageFor(servicePath(format.id, page.language));
      return `<a href="${other.path}"${page.path === other.path ? ' aria-current="page"' : ''}>${escape(other.h1)} <span aria-hidden="true">↗</span></a>`;
    }).join('')}</nav>
    <a class="site-index-home" href="${homePath(page.language)}">${chef.wordmark}</a>
  </div></footer>`;
}

export function renderServicePage(page, { production = false } = {}) {
  const t = labels[page.language];
  const image = pageImage(page);
  const format = page.format;
  const srcset = `/media/chef/${format.small} 768w, ${format.medium ? `/media/chef/${format.medium} 1536w, ` : ''}${image.src} ${image.width}w`;
  const contact = `<a class="button" href="${chef.instagram}" target="_blank" rel="noopener noreferrer"><span>${t.contact}</span>${arrow}</a>`;
  return `<!doctype html>
<html lang="${page.language}" class="cormorant_garamond_5cf6ee7e-module__oQQLIW__variable dm_sans_3d80eddf-module__18Q8-q__variable">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#f5f0eb">
  ${renderSeoHead({ production, page })}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/b0947914c9718a1e-s.0l.9lak812di~.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/01e4147cff8141ee-s.p.10ked.7w885.g.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/reference.css">
  <link rel="stylesheet" href="/assets/local.css">
  <link rel="stylesheet" href="/assets/service-pages.css">
</head>
<body class="service-document" id="top">
  <a class="skip-link" href="#main">${t.skip}</a>
  <header class="detail-header container"><a class="wordmark" href="${homePath(page.language)}">${chef.wordmark}</a><nav aria-label="${page.language === 'ru' ? 'Навигация' : 'Navigation'}"><a href="${homePath(page.language)}#services">${t.services}</a>${languageLink(page)}</nav></header>
  <main id="main" tabindex="-1">
    <div class="container">
      <nav class="breadcrumbs" aria-label="${page.language === 'ru' ? 'Путь страницы' : 'Breadcrumbs'}"><a href="${homePath(page.language)}">${t.home}</a><span aria-hidden="true">/</span><span aria-current="page">${escape(page.h1)}</span></nav>
      <section class="article-hero" aria-labelledby="service-title">
        <div><p class="eyebrow">${t.caption}</p><h1 id="service-title">${escape(page.h1)}</h1><p class="article-lead">${escape(page.lead)}</p>${contact}</div>
        <figure class="article-photo"><img src="${image.src}" srcset="${srcset}" sizes="(max-width:767px) calc(100vw - 48px), 44vw" width="${image.width}" height="${image.height}" alt="${escape(image.alt)}" loading="eager" decoding="async" fetchpriority="high"><figcaption>${t.caption}</figcaption></figure>
      </section>
      <div class="article-layout">
        <aside class="article-index"><p>${t.contents}</p><nav aria-label="${t.contents}">${page.sections.map((section, index) => `<a href="#section-${index + 1}">${escape(section.heading)}</a>`).join('')}<a href="#questions">${t.questions}</a></nav></aside>
        <article class="article-copy" aria-labelledby="service-title">
          ${page.sections.map((section, index) => `<section id="section-${index + 1}"><h2>${escape(section.heading)}</h2>${section.paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</section>`).join('\n')}
          <section class="article-questions" id="questions" aria-labelledby="questions-title"><h2 id="questions-title">${t.questions}</h2><dl>${page.faq.map(item => `<div><dt>${escape(item.question)}</dt><dd>${escape(item.answer)}</dd></div>`).join('')}</dl></section>
          <section class="article-contact" id="contact"><h2>${t.discuss}</h2><p>${t.note}</p>${contact}<p class="article-handle">@evg.chef</p></section>
        </article>
      </div>
    </div>
  </main>
  ${renderServiceFooter(page)}
</body>
</html>`;
}
