# Hero light-blur explorations

Date: 2026-08-31  
Status: unapproved visual exploration; no production interface code changed.

## Audit baseline

- Current hero captured for this comparison: one edge-to-edge forty-image documentary mosaic, one local paper reading wash, one square-edged foreground portrait, and the exact two-part copy rendered by the live route.
- Current approved system explicitly excludes optical blur. The direct user request for five light-blur mockups opens a bounded comparison only; it does not replace that active rule until one direction is selected.
- Existing typography, header, copy, portrait crop, media sources, square edges, 54/46 subject split, and light paper/russet/forest palette remain invariants.

## References and principles

- Current approved hero and local documentary assets: preserve identity, real content, exact composition and authored crop hierarchy.
- `artifacts/hero-audit/README.md`: contrast belongs in a local copy corridor; documentary evidence outside it must remain readable.
- Marrow reference analysis: photographic evidence can be tonally unified without destroying people, dishes and events.
- MOLD case-study principle already recorded in the project: hierarchy follows content role; anchors and supporting frames do not need identical treatment.
- Direct request dated 2026-08-31: compare five *light* blur treatments.

## Templated elements found

None are introduced in this exploration. The active hero is project-specific. The main risk is turning a local readability device into generic glassmorphism or an arbitrary soft-focus effect.

## Five mockup directions

1. **Local vertical corridor** — 4 px blur limited to the left reading corridor, feathering to zero before the open evidence field.
2. **Uniform documentary field** — restrained 2 px blur across the complete mosaic below the header; copy and controls remain sharp.
3. **Horizontal tilt-shift** — 3 px top focus layer that dissolves vertically before the lower evidence field.
4. **Radial focus island** — 5 px elliptical feathered field shaped around the headline rather than a visible rectangular panel.
5. **Tile-by-tile depth** — 4 px blur is applied inside every secondary photograph while all grid rules and six documentary anchors remain sharp.

## Final comparison files

- `00-current-hero.jpg` — current production baseline at 1440 × 1000.
- `01-local-vertical-corridor.jpg` — compact left-to-right blur corridor.
- `02-uniform-field.jpg` — full-mosaic low-strength blur.
- `03-horizontal-tilt-shift.jpg` — top-to-bottom blur dissolve.
- `04-radial-focus-island.jpg` — elliptical blur field around the copy.
- `05-tile-by-tile-depth.jpg` — per-photograph blur with sharp grid rules and anchors.

The final mockups are deterministic browser captures of the actual project hero and the isolated preview stylesheet in `app/hero-blur-preview/preview.module.css`. This replaced an initial ImageGen pass because those outputs converged on nearly identical paper-veiled treatments and did not provide a truthful comparison. Rejected generated drafts and intermediate browser captures were moved out of the project to the corresponding Codex generated-images archive.

## What remains

- Header, hero copy, portrait, all source photographs and mosaic geometry.
- No new component is required for the mockups.

## What would be reworked after selection

- Only the local readability layer and, for direction 3, per-tile treatment rules.
- Phone behavior must be authored separately; desktop blur geometry may not simply scale down.

## Anti-template guardrails

- No glass panel, rounded surface, glow, mesh gradient, floating card or generic centered hero.
- No global blur over the full collage.
- No blur on the foreground portrait, copy, controls or important documentary anchors.
- No new copy, CTA, icons or decoration.
- The five outputs are comparison artifacts, not five unrelated interface redesigns.

## Final anti-template audit

- No generic centered hero, card grid, glass panel, glow, gradient decoration, rounding or new marketing copy was introduced.
- Each output uses the live project photography, current typography, current header and current hero geometry.
- The five mechanisms are visibly and technically distinct: directional mask, uniform backdrop filter, vertical tilt-shift mask, radial mask and per-tile image filter.
- The production route is unchanged; the comparison is isolated at `/hero-blur-preview?variant=1…5`.

## Verification status

This round produces desktop comparison mockups only. Mandatory production verification at 1440, 1280, 1024, 768, 430, 390 and 375 px remains open until a direction is selected and implemented.
