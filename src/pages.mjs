import { chef, formats } from './content.mjs';
import { serviceContent } from './service-content.mjs';

export const languages = ['ru', 'en'];
export const serviceSlugs = { dinner: 'private-dinner', events: 'private-events', masterclass: 'cooking-masterclasses' };
export const homePath = language => language === 'en' ? '/en/' : '/';
export const servicePath = (id, language = 'ru') => `${homePath(language)}${serviceSlugs[id]}/`;
export const homeTitles = {
  ru: { title: chef.title, description: chef.description },
  en: {
    title: 'Private Chef in Cyprus — Evgen Grebenik',
    description: 'Evgen Grebenik, private chef in Cyprus. Personal seven-course dinners, private events and cooking classes, with menus shaped around your tastes.',
  },
};
// Date of the latest substantive content edit, never the build or deployment time.
const contentUpdated = '2026-10-13';
export const pages = languages.flatMap(language => [
  { kind: 'home', language, path: homePath(language), lastModified: contentUpdated, ...homeTitles[language] },
  ...formats.map(format => ({
    kind: 'service', language, path: servicePath(format.id, language),
    serviceId: format.id, format, lastModified: contentUpdated, ...serviceContent[format.id][language],
  })),
]);
export const pageFor = path => {
  const page = pages.find(entry => entry.path === path);
  if (!page) throw new Error(`Unknown page: ${path}`);
  return page;
};
export const alternatePath = (page, language) => page.kind === 'home' ? homePath(language) : servicePath(page.serviceId, language);
