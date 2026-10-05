import { chef, formats } from './content.mjs';
import { pages, pageFor, languages, alternatePath, servicePath, homePath } from './pages.mjs';

export const site = Object.freeze({
  origin: 'https://evgenychef.com', name: chef.name, alternateName: 'Evgen Grebenik', language: 'ru',
  image: '/media/chef/hero.webp', imageWidth: 1200, imageHeight: 798,
  imageAlt: 'Евгений Гребеник за рабочим столом на кухне',
  // Public ownership proof, preserved across all production releases.
  googleVerification: 'uUluD2OIPclLXZLbvv_BYap3pCJ0ouYrBdhviqhvy10',
});
export const absolute = path => new URL(path, `${site.origin}/`).href;
export const escapeAttribute = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function pageImage(page) {
  if (page.kind === 'home') return { src: site.image, width: site.imageWidth, height: site.imageHeight,
    alt: page.language === 'ru' ? site.imageAlt : 'Evgen Grebenik at work in the kitchen' };
  return { src: `/media/chef/${page.format.photo}`, width: page.format.width, height: page.format.height,
    alt: page.language === 'ru' ? page.format.alt : {
      dinner: 'Evgen cooking a dish in a pan in a professional kitchen',
      events: 'Evgen making pancakes outdoors at a private event',
      masterclass: 'Cooking class participants watching Evgen demonstrate a technique',
    }[page.serviceId] };
}

export function structuredData(page = pageFor('/')) {
  const en = page.language === 'en';
  const personId = absolute('/#chef');
  const websiteId = absolute('/#website');
  const webpageId = absolute(`${page.path}#webpage`);
  const imageId = absolute(`${page.path}#primary-image`);
  const image = pageImage(page);
  const offered = page.kind === 'home' ? formats : [page.format];
  const serviceId = id => absolute(`${servicePath(id)}#service`);
  const graph = [
    { '@type': 'WebSite', '@id': websiteId, url: absolute('/'), name: site.name,
      alternateName: site.alternateName, inLanguage: languages, publisher: { '@id': personId } },
    { '@type': 'WebPage', '@id': webpageId, url: absolute(page.path), name: page.title,
      description: page.description, inLanguage: page.language, isPartOf: { '@id': websiteId },
      about: { '@id': personId }, primaryImageOfPage: { '@id': imageId },
      mainEntity: offered.map(format => ({ '@id': serviceId(format.id) })),
      ...(page.kind === 'service' ? { breadcrumb: { '@id': absolute(`${page.path}#breadcrumbs`) } } : {}) },
    { '@type': 'Person', '@id': personId, name: en ? site.alternateName : chef.name,
      alternateName: en ? chef.name : site.alternateName, jobTitle: en ? 'Private chef' : 'Частный шеф-повар',
      url: absolute(homePath(page.language)), image: absolute('/media/chef/hero-portrait-original.jpg'), sameAs: [chef.instagram] },
    { '@type': 'ImageObject', '@id': imageId, url: absolute(image.src), contentUrl: absolute(image.src),
      width: image.width, height: image.height, caption: image.alt },
    ...offered.map(format => {
      const servicePage = pageFor(servicePath(format.id, page.language));
      return { '@type': 'Service', '@id': serviceId(format.id), name: servicePage.h1,
        serviceType: servicePage.h1, description: servicePage.description,
        url: absolute(servicePage.path), image: absolute(`/media/chef/${format.photo}`),
        provider: { '@id': personId }, areaServed: { '@type': 'Country', name: en ? 'Cyprus' : 'Кипр' },
        mainEntityOfPage: { '@id': webpageId } };
    }),
  ];
  if (page.kind === 'service') graph.push({
    '@type': 'BreadcrumbList', '@id': absolute(`${page.path}#breadcrumbs`),
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: en ? 'Private chef in Cyprus' : 'Частный шеф на Кипре', item: absolute(homePath(page.language)) },
      { '@type': 'ListItem', position: 2, name: page.h1, item: absolute(page.path) },
    ],
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function renderSeoHead({ production = false, page = pageFor('/') } = {}) {
  const en = page.language === 'en';
  const image = pageImage(page);
  const meta = (name, value, property = false) => `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeAttribute(value)}">`;
  const tags = [
    meta('robots', production ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'),
    `<title>${escapeAttribute(page.title)}</title>`, meta('description', page.description),
    meta('author', en ? site.alternateName : chef.name),
    meta('og:site_name', en ? site.alternateName : site.name, true),
    meta('og:title', page.title, true), meta('og:description', page.description, true),
    meta('og:type', 'website', true), meta('og:locale', en ? 'en_GB' : 'ru_RU', true),
    meta('og:locale:alternate', en ? 'ru_RU' : 'en_GB', true),
    meta('og:image', absolute(image.src), true),
    meta('og:image:type', image.src.endsWith('.webp') ? 'image/webp' : 'image/jpeg', true),
    meta('og:image:width', image.width, true), meta('og:image:height', image.height, true),
    meta('og:image:alt', image.alt, true), meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', page.title), meta('twitter:description', page.description),
    meta('twitter:image', absolute(image.src)), meta('twitter:image:alt', image.alt),
  ];
  if (production) tags.push(
    `<link rel="canonical" href="${absolute(page.path)}">`,
    ...[...languages, 'x-default'].map(language => `<link rel="alternate" hreflang="${language}" href="${absolute(alternatePath(page, language === 'x-default' ? 'ru' : language))}">`),
    meta('og:url', absolute(page.path), true), meta('google-site-verification', site.googleVerification),
    `<script type="application/ld+json">${JSON.stringify(structuredData(page)).replaceAll('<', '\\u003c')}</script>`,
  );
  return tags.join('\n  ');
}

export const renderRobots = ({ production = false } = {}) => production
  ? `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`
  : 'User-agent: *\nDisallow: /\n';

// Real canonical pages only. Do not infer lastmod from a build timestamp.
export const renderSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${absolute(page.path)}</loc></url>`).join('\n')}\n</urlset>\n`;
