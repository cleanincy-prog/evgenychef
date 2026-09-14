# Self-hosted fonts by role

Current brief: `design/references/oranienbaum-brief-2026-09-13.md`.

- Oranienbaum 400 normal: headings, wordmark and dish-part titles, minimum 19px.
- Ysabeau Office 400 normal and italic: body, UI and italic accents. Static 500/600 files remain reserved and unused on the current page.
- PT Mono 400 normal: numbers with tabular/lining figures.

All 12 WOFF2 files are unchanged official Google Fonts static Cyrillic/Latin subsets. A WOFF2-capable, pre-variable Chrome 60 user agent supplies actual static weights. FontTools verified each weight, italic angle, absence of variable axes and all Russian letters including Ё/ё. PT Mono digits have identical advance widths.

Sources: [Oranienbaum](https://github.com/google/fonts/tree/main/ofl/oranienbaum), [Ysabeau Office](https://github.com/google/fonts/tree/main/ofl/ysabeauoffice), [PT Mono](https://github.com/google/fonts/tree/main/ofl/ptmono). Adjacent OFL files retain copyright and reserved-name notices. No font is renamed, converted or subsetted locally.

Total archive: 135760 bytes. The eight used 400-weight faces (85800 bytes) are copied byte-for-byte into app/fonts and included in the render-blocking stylesheet with Vite `?inline` and `font-display:block`. Head preloads use the exact same data URLs to decode fonts before the first layout; there are no separate network font requests. This prevents fallback typography and the mobile Hero portrait shift during loading. Reserved 500/600 declarations remain external and unused. CSS retains the requested Unicode ranges; official Latin files contain a few extra combining marks outside those ranges. There are no font requests to external services at runtime. See [loading audit and verification](../../docs/HERO_LOADING_2026-09-15.md).

`role-fonts-manifest.json` records versioned official URLs, SHA256, file sizes, actual family/style/weight, Cyrillic coverage and numeric metrics. Reproduce with `python3 scripts/fetch-oranienbaum-fonts.py --output /private/tmp/chef-role-fonts`.

Caveat is an unused optional token, with no loaded face. Older assets and approved mockups remain as historical references; none of the previous families or Bellota is referenced by active font declarations. The earlier Spectral build script is retained to reproduce its historical version.
