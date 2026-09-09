# Hero collage layout options — 2026-09-09

Status: **comparison-only; direct correction of the previous five-board set**

## Authoritative clarification

The user's direct correction is that the collage remains. The rejected part of the previous exploration
is any direction that removes it, reduces the Hero to a single scene, or replaces it with a triptych.
This set therefore treats the complete current 94-source archive and the separate real apron portrait as
fixed ingredients. Only distribution, scale hierarchy, text measure and the relationship between the
three layers may change.

## Re-audit and implementation plan

The current Hero data, JSX, desktop CSS, supplied failure capture, earlier comparison boards and latest
design documentation were re-checked. Unrelated in-progress changes to the home and sourcing chapters
remain untouched.

| Existing element | Why it looks unresolved | Confirmed replacement | Retained |
|---|---|---|---|
| Collage confined to the right half | Ninety-four sources are compressed into a narrow field and read as noise | Extend the archive across the full Hero or distribute it as authored bands/frame fields | Every current local source and 2 px stitched seam |
| Copy owns a blank half-screen | The title feels disconnected from the visual proof | Place copy in a smaller grid-aligned paper aperture, centre band or edge field while the collage continues around it | Exact Russian title and cream/ink/gold typography |
| Portrait floats over the micro-grid | Its scale and caption make it resemble a card unrelated to the tile rhythm | Align the portrait to the same grid, make it the central spine, or bind it to the copy field | Exact `chef-hero-apron.jpg` identity source and sharp crop |
| All background images have equal visual weight | Selfies, awards, cooking and dishes compete equally | Change the grid proportion and grouping while keeping the complete archive | No source replacement, generation or retouching |

Five layouts are required:

1. grid-aligned copy and portrait apertures inside a full-field archive;
2. a calm horizontal title band crossing a top/bottom collage field;
3. a diagonal title → portrait → proof sequence over the archive;
4. a central editorial spread surrounded by a photographic frame;
5. a reversed archive-led split with the collage dominant at left and the identity field at right.

No live component is edited. No new UI component or library is required for the comparison boards.

## Mobile intent

All boards compare 1440 × 900 desktop hierarchy. The selected direction must receive a separate phone
composition rather than shrinking its desktop geometry. On phone, the exact title should lead, the
portrait must enter the first viewport, and the archive should resolve into 12–18 larger authored cells
with the remaining sources available through a later/animated sequence only if explicitly approved.

## Rendered artifacts

- `00-overview.png` — one comparison sheet;
- `01-grid-apertures.png` — paper title and portrait apertures aligned to the full mosaic;
- `02-horizontal-band.png` — a calm horizontal title band between two archive fields;
- `03-diagonal-anchors.png` — title, portrait and proof anchors form a diagonal reading route;
- `04-collage-frame.png` — a central editorial spread surrounded by the archive;
- `05-reversed-split.png` — archive-led left field with identity at right;
- `index.html` — deterministic source used to render each 1440 × 900 board;
- `overview.html` — deterministic source used to render the comparison sheet.

## Verification and anti-template audit

- All five boards were rendered and visually inspected at their native 1440 × 900 size.
- Each board instantiates the same 94 unique local archive sources. The selected wide-tile patterns add
  exactly the number of grid spans required to fill each board without deleting or duplicating a source.
- The separate identity portrait keeps a portrait aperture and `object-fit: cover`, removing the source's
  black phone bands without stretching or retouching the person.
- Exact heading, masthead action, palette, type binaries, square media edges and 2 px seams are retained.
- No gradient, blur, glass, shadow, radius, stock image, generated person, placeholder copy, card grid,
  generic CTA or UI-library styling is present.
- Mobile is intentionally not presented as verified. This set is a desktop direction comparison; the
  chosen direction still requires a separately authored phone composition and checks at all project
  widths before public implementation.
