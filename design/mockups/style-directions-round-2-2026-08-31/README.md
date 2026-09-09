# Style Directions — Round 2 — 2026-08-31

Status: comparison-only raster study. The live site, its running development process, routes, components, styles and public assets must remain unchanged.

## User-selected directions

From the earlier conceptual list:

1. `01-field-journal.png` — **Полевой дневник шефа**: documentary working notebook, markets, routes, annotations and visible decision-making.
2. `02-mise-en-place.png` — **Mise en place**: professional precision, stainless work surfaces, measured grids, tools, hands and preparation sequences.
3. `03-private-invitation.png` — **Личное приглашение**: sparse invitation addressed to one guest, one image and one decisive phrase per movement.

From the later fashion-led list:

4. `04-fashion-editorial.png` — **Fashion editorial**: the chef as the campaign's protagonist, hard-flash crops, full-body identity and bold magazine composition.
5. `05-neo-swiss-kinetic.png` — **Neo-Swiss + kinetic typography**: strict grid, variable-width display type, coordinates and photographic apertures driven by typography.
6. `06-raw-luxury.png` — **Raw luxury**: restrained premium composition with scans, paper grain, registration marks and intentionally imperfect analogue evidence.
7. `07-immersive-cinema.png` — **Immersive cinema**: one scene per chapter, cinematic light, subtitle-scale copy and a clear evening narrative.
8. `08-digital-collage.png` — **Digital collage / new-wave poster**: cropped silhouette, oversized lettering, contact sheets, overlaps and poster-like section changes.

`00-overview.jpg` shows all eight boards together.

## Shared comparison content

Every board uses the same current information architecture: header; personal-chef hero; MasterChef biography; product sourcing; three event formats; Instagram inquiry; footer. Prominent text is limited to the current project lines:

- `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре`
- `От MasterChef к вашему столу.`
- `Я не работаю по меню, я его создаю.`
- `Вечера бывают разные`
- `Расскажите мне, чего хочется.`

## Audit and plan before generation

The active page, local media, current palette/type system, existing hero/story/sourcing/inquiry mockups and earlier five-board comparison were already audited on 2026-08-31. None of the user-selected eight directions is treated as a library theme or a ready-made landing template. The new visual requirements supplied directly by the user are the primary references; real local chef images are identity/documentary references.

Templated elements to avoid in every direction: centered two-button hero, equal three-card section, reusable rounded cards, stock testimonials, pricing, FAQ, partner strip, bento preset, glass, glow, arbitrary gradient, generic luxury copy and invented credentials. The same exact section sequence and project meaning remain; only art direction, grid, type, media treatment and rhythm change.

Implementation plan:

1. Generate one tall desktop comparison board per direction in built-in ImageGen mode.
2. Supply real project-local chef, award, sourcing and event photographs as reference inputs; label each as a reference rather than an edit target.
3. Save every selected output in this directory; never import a board into the live app.
4. Assemble one neutral overview sheet after all eight boards exist.
5. Audit identity drift, invented copy, repeated card patterns and insufficient structural distinction.
6. Leave responsive implementation values undecided until the user selects a direction.

## Result and anti-template audit

All eight boards and the neutral comparison sheet were generated with the built-in ImageGen mode and saved locally in this directory. The prompt set is recorded in [`PROMPTS.md`](./PROMPTS.md).

- The three earlier concepts use distinct information metaphors: working notebook, professional preparation system and one-to-one invitation.
- The five fashion-led concepts use distinct art-direction systems: campaign editorial, typographic grid, tactile monograph, cinematic chapters and new-wave poster collage.
- No board introduces pricing cards, testimonials, FAQ, partner logos, glassmorphism, a stock bento grid or a centered two-button hero.
- The live application, routes, components, styles and public assets were not edited for this study.
- No UI library or library theme was used; these are standalone raster concepts.

## Deliberate limitations

These are direction-selection boards, not production-ready screens. ImageGen may render inaccurate small lettering, incidental labels and illustrative supporting scenes. Only the prominent project lines listed above and the high-level composition should be evaluated; no small generated claim, venue, metric, supplier, credential or contact detail is approved. Production implementation must reuse verified project copy and cleared local media, deliberately adapt the selected direction for mobile, and then pass the required 1440, 1280, 1024, 768, 430, 390 and 375 px checks.
