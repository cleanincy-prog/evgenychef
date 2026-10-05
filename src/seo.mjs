import { chef, formats } from './content.mjs';

export const site = Object.freeze({
  origin: 'https://evgenychef.com',
  name: chef.name,
  alternateName: 'Evgen Grebenik',
  language: 'ru',
  image: '/media/chef/hero.webp',
  imageWidth: 1200,
  imageHeight: 798,
  imageAlt: 'Евгений Гребеник за рабочим столом на кухне',
  // Public ownership proof issued by Search Console for the site owner's account.
  // Keep it in future releases so Google can recheck ownership.
  googleVerification: 'uUluD2OIPclLXZLbvv_BYap3pCJ0ouYrBdhviqhvy10',
});

const absolute = path => new URL(path, `${site.origin}/`).href;
const escapeAttribute = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function structuredData() {
  const personId = absolute('/#chef');
  const websiteId = absolute('/#website');
  const webpageId = absolute('/#webpage');
  const country = { '@type': 'Country', name: 'Кипр', alternateName: 'Cyprus' };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': websiteId,
        url: absolute('/'), name: site.name, alternateName: site.alternateName,
        inLanguage: site.language, publisher: { '@id': personId },
      },
      {
        '@type': 'WebPage', '@id': webpageId,
        url: absolute('/'), name: chef.title, description: chef.description,
        inLanguage: site.language, isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        primaryImageOfPage: { '@id': absolute('/#primary-image') },
        mainEntity: formats.map(format => ({ '@id': absolute(`/#service-${format.id}`) })),
      },
      {
        '@type': 'Person', '@id': personId,
        name: chef.name, alternateName: site.alternateName,
        jobTitle: 'Частный шеф-повар', url: absolute('/'),
        description: chef.biography.join(' '),
        image: absolute('/media/chef/hero-portrait-original.jpg'),
        sameAs: [chef.instagram],
      },
      {
        '@type': 'ImageObject', '@id': absolute('/#primary-image'),
        url: absolute(site.image), contentUrl: absolute(site.image),
        width: site.imageWidth, height: site.imageHeight, caption: site.imageAlt,
      },
      ...formats.map(format => ({
        '@type': 'Service', '@id': absolute(`/#service-${format.id}`),
        name: format.title, serviceType: format.title,
        description: format.description, url: absolute(`/#format-${format.id}`),
        image: absolute(`/media/chef/${format.photo}`),
        provider: { '@id': personId }, areaServed: country,
        mainEntityOfPage: { '@id': webpageId },
      })),
    ],
  };
}

export function renderSeoHead({ production = false } = {}) {
  const meta = (name, value, property = false) => `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeAttribute(value)}">`;
  const tags = [
    meta('robots', production ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'),
    `<title>${escapeAttribute(chef.title)}</title>`,
    meta('description', chef.description),
    meta('author', chef.name),
    meta('og:site_name', site.name, true),
    meta('og:title', chef.title, true),
    meta('og:description', chef.description, true),
    meta('og:type', 'website', true),
    meta('og:locale', 'ru_RU', true),
    meta('og:image', absolute(site.image), true),
    meta('og:image:type', 'image/webp', true),
    meta('og:image:width', site.imageWidth, true),
    meta('og:image:height', site.imageHeight, true),
    meta('og:image:alt', site.imageAlt, true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', chef.title),
    meta('twitter:description', chef.description),
    meta('twitter:image', absolute(site.image)),
    meta('twitter:image:alt', site.imageAlt),
  ];
  if (production) {
    tags.push(
      `<link rel="canonical" href="${absolute('/')}">`,
      meta('og:url', absolute('/'), true),
      meta('google-site-verification', site.googleVerification),
      `<script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll('<', '\\u003c')}</script>`,
    );
  }
  return tags.join('\n  ');
}

export const renderRobots = ({ production = false } = {}) => production
  ? `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`
  : 'User-agent: *\nDisallow: /\n';

// A single canonical page: fragment IDs are sections, never separate sitemap URLs.
// No synthetic lastmod: builds and deployments are not content modification dates.
export const renderSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${absolute('/')}</loc></url>\n</urlset>\n`;
