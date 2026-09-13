# Self-hosted fonts by role

Current brief: `design/references/oranienbaum-brief-2026-09-13.md`.

- Oranienbaum 400 normal: headings, wordmark and dish-part titles, minimum 19px.
- Ysabeau Office 400 / 500 / 600 normal and 400 italic: body, UI, reserved FAQ-question role and italic accents.
- PT Mono 400 normal: numbers with tabular/lining figures.

All 12 WOFF2 files are unchanged official Google Fonts static Cyrillic/Latin subsets. A WOFF2-capable, pre-variable Chrome 60 user agent supplies actual static weights. FontTools verified each weight, italic angle, absence of variable axes and all Russian letters including Ё/ё. PT Mono digits have identical advance widths.

Sources: [Oranienbaum](https://github.com/google/fonts/tree/main/ofl/oranienbaum), [Ysabeau Office](https://github.com/google/fonts/tree/main/ofl/ysabeauoffice), [PT Mono](https://github.com/google/fonts/tree/main/ofl/ptmono). Adjacent OFL files retain copyright and reserved-name notices. No font is renamed, converted or subsetted locally.

Total: 135760 bytes. Cyrillic first-screen preloads Oranienbaum 400 + Ysabeau Office 400 total 15780 bytes. CSS declares the requested Unicode ranges; official Latin files retain a few extra combining marks outside those ranges. There are no font requests to external services at runtime. All faces use swap, with no base64 or inline fonts.

`role-fonts-manifest.json` records versioned official URLs, SHA256, file sizes, actual family/style/weight, Cyrillic coverage and numeric metrics. Reproduce with `python3 scripts/fetch-oranienbaum-fonts.py --output /private/tmp/chef-role-fonts`.

Caveat is an unused optional token, with no loaded face. Older assets and approved mockups remain as historical references; none of the previous families or Bellota is referenced by active font declarations. The earlier Spectral build script is retained to reproduce its historical version.
