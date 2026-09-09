# Hero layout options — 2026-09-09

Status: **comparison-only; no public interface change**

## Audit completed before drawing

The active route, Hero JSX, Hero CSS, responsive rules, local fonts, documentary media, user-supplied
desktop capture, design reference map, design system, earlier Hero audits and saved reference screenshots
were inspected before these mockups were authored. The working tree already contained unrelated event-
format work; it is intentionally left untouched.

The current Hero fails primarily through hierarchy rather than styling:

1. The near-50/50 split makes the left side feel like an oversized empty title page while the right side
   carries almost all visual evidence.
2. Ninety-four similarly scaled collage cells collapse distinct events, dishes and people into texture.
3. The large foreground portrait reads as a separate card laid over another image system.
4. The title, collage and portrait do not share one optical axis; each behaves as an independent block.
5. The first viewport is unusually deep, so the next chapter appears as an accidental fragment rather
   than a deliberate continuation.

## Reference-led replacement plan

| Current element | Why it feels templated or unresolved | Confirmed reference / project decision | Mockup response |
|---|---|---|---|
| Equal copy/media split | It is a familiar portfolio split and does not follow the actual density of the Russian title | User's supplied failure capture; active cream editorial system | Each option assigns one dominant subject and one secondary evidence rhythm rather than preserving equal halves |
| Uniform micro-collage | Repetition destroys photographic hierarchy and creates visual noise | Existing Hero audit; Marrow reference screenshot; real local media | Options either remove the wall, reduce it to a legible contact sheet, or turn it into three semantic evidence fields |
| Floating portrait rectangle | It reads as a card because its crop, scale and layer are independent of the grid | Existing real portrait assets and square-edge media rule | Portrait becomes the cover image, a grid anchor, a cutout, or the central member of a triptych |
| Five-line display stack | The line count is technically controlled but too tall beside the current stage | Exact user-supplied title; current Cormorant Garamond and italic accent roles | The wording is unchanged, but each option authors a different line measure and relationship to media |
| Abrupt post-Hero fragment | The visible start of the next section looks like overflow from the Hero | Current page chronology and hairline separators | Every board ends at a deliberate 900 px Hero boundary; the live following section is not redesigned |

## Five directions

1. **Portrait cover.** One large real portrait anchors the right two-fifths; a short four-frame evidence
   strip supports the promise without becoming a background wall. Best for immediate personal trust.
2. **Cinematic band.** One real action photograph owns the opening; the complete title sits in a quiet
   editorial band below it. Best for showing the service before explaining it.
3. **Documentary spread.** A variable twelve-image contact sheet and the title occupy one continuous
   editorial grid. Best if the archive/collage idea must remain central.
4. **Signature poster.** The transparent real portrait and oversized typography share one paper field;
   a narrow proof column carries three documentary stills. Best for the strongest author identity.
5. **Proof triptych.** Three large scenes express process → chef → result beneath a compact title line.
   Best for clarity, premium restraint and a direct service story.

## Components and scope

- Retained: exact title, header wordmark and action, cream/ink/gold palette, Cormorant Garamond,
  Montserrat, square media edges, real local photographs and the current post-Hero route.
- Reworked in the mockups only: Hero geometry, title line breaks, photographic hierarchy, portrait role
  and the amount of collage evidence visible in the first viewport.
- New live components required: none. A chosen direction can be implemented with the existing Hero
  semantic structure plus a smaller, deliberately curated media dataset.
- UI libraries: none.
- No generated person, replacement portrait, stock image, gradient, glass effect, rounded card, shadow,
  generic CTA block or placeholder copy is used.

## Mobile intent before selection

These boards compare desktop hierarchy at 1440 × 900. They are not claims of responsive completion.
After one direction is selected, its phone layout should be authored independently:

- portrait cover: title → portrait crop → four-frame horizontal evidence strip;
- cinematic band: compact title band → wide 4:3 action frame;
- documentary spread: title → one anchor portrait → six large evidence frames, not the desktop matrix;
- signature poster: title and cutout share the first viewport; proof images become a short horizontal rail;
- proof triptych: title → one dominant chef frame → paired process/result frames.

The required 1440, 1280, 1024, 768, 430, 390 and 375 px verification belongs to the selected live
implementation, not to these comparison-only boards.

## Rendered artifacts and visual check

- `00-overview.png` — one comparison sheet containing all five directions.
- `01-portrait-cover.png` — 1440 × 900.
- `02-cinematic-band.png` — 1440 × 900.
- `03-documentary-spread.png` — 1440 × 900.
- `04-signature-poster.png` — 1440 × 900.
- `05-proof-triptych.png` — 1440 × 900.
- `index.html` and `overview.html` — deterministic local rendering sources.

All five desktop boards were rendered in local Chrome and visually inspected at their native 1440 ×
900 size. The exact title and header action remain legible, all selected local images resolve, image
crops retain the chef or relevant food/process subject, and no content overflows the board. The contact
sheet was inspected after the final re-render of options 02 and 04.

Final anti-template audit for the comparison set: no rounded card, repeated equal card system, shadow,
glass, blur, glow, decorative gradient, generic CTA, stock avatar, generated person, UI-library styling
or placeholder copy is present. Option 03 intentionally retains a collage, but its modules are sized by
content and therefore do not reproduce the active uniform micro-grid.
