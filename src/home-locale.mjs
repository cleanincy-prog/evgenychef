import { homeEnglish } from './home-en.mjs';

const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const translate = value => {
  if (!/[А-Яа-яЁё]/.test(value)) return value;
  const key = value.trim();
  if (!Object.hasOwn(homeEnglish, key)) throw new Error(`Missing English homepage copy: ${key}`);
  return value.replace(key, escape(homeEnglish[key]));
};

// Only the known template's text nodes and human-readable attributes are translated.
// URLs, CSS, script code and metadata never pass through the dictionary.
// Missing source copy fails the build instead of silently shipping a mixed language page.
export function localizeHomepage(html, language) {
  if (language === 'ru') return html;
  if (language !== 'en') throw new Error(`Unsupported language: ${language}`);
  return html.replace(/(<body\b[^>]*>)([\s\S]*)(<\/body>)/, (_, start, body, end) => start + body
    .split(/(<[^>]+>)/g)
    .map(part => part.startsWith('<')
      ? part.replace(/\b(alt|aria-label|title)="([^"]*)"/g, (_, attribute, value) => `${attribute}="${translate(value)}"`)
      : translate(part))
    .join('') + end);
}
