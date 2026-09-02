# Interface and Anti-Template Audit

Audit date: 2026-09-01

## Portrait crop, copy proximity and legibility correction — 2026-08-31

The user supplied the current portrait crop at 17:23:55 and identified four defects: black screenshot bands remain visible, the main chef photograph is too far from the title on wide screens, the title has lost legibility against the softened photographs, and the phone portrait is separated from the title by an excessive empty interval. Before implementation, the 576 × 1280 source, its embedded phone chrome, the live 1440/1024/390 crops, all forty placements, title and portrait rectangles, complete breakpoint cascade, approved Oranienbaum/color tokens, uniform mosaic layer and existing documentation/tests were audited. Live measurement proves that the bands occur in the 901–1100 composition: at 1024 px a 266 × 450 aperture exposes the source beyond its real photographic field, while the 1440 and current 390 crops already conceal it.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Wide portrait beginning at 50% while the title ink ends near 46% | The 58 px gap at 1440 reads as a detached central column | Refine the desktop grid to thirty-two columns and begin the portrait at column 16 (`46.875%`), leaving a narrow intentional reading gap and moving all surrounding photographs around its new aperture | Exact title position/copy, portrait size, all forty sources, square seams and zero overlap |
| Compact portrait using the raw screenshot crop in a narrow/tall aperture | The aperture reveals the screenshot's black phone-status and navigation bands | Clip the identity container and apply a restrained breakpoint-specific optical crop to the unchanged source | Real face, body, apron, hands, background and unedited source file |
| Phone portrait pinned to the bottom beneath rows 13–20 | The measured title-to-portrait gap is 178 px at 390 × 844 | Re-author the phone map around columns 4–8 / rows 9–17 and place the portrait at `top: 40%` with a `45%` height so it begins immediately after the title | Eight-by-twenty irregular field, every source, right-edge crop and no title/photo overlap |
| Uniform 58% paper veil over the mosaic | The initial hero colors remain correct, but the active photographic detail competes with the copper lines | Preserve the approved Oranienbaum and exact four color tokens; strengthen only the same complete mosaic-owned warm-paper layer | No local wash, text shadow, font replacement, blurred foreground, card or opaque copy panel |

Templated elements found: none. The failures are source chrome, spacing and responsive-aperture defects in the project-specific collage. Components retained: `Home`, header, exact hero copy, forty supplied screenshots, approved portrait source and every later section. Components reworked: wide/compact/mobile placement maps, portrait coordinates/crop containment and the single uniform mosaic veil. New components, assets, generated edits, copy, controls and UI-library compositions required: none.

Implementation plan: update the reference map and active design system; refine wide and compact placement coordinates; move the portrait without covering any tile; crop only the embedded screenshot bands; move the phone portrait directly below the title through a dedicated aperture; strengthen the existing complete-mosaic veil while preserving typography/colors; update structural tests; run lint, build, regression tests and `git diff --check`; verify 1440, 1280, 1024, 768, 430, 390 and 375 px for all forty loaded images, zero bands, intersections or overflow, readable computed type/colors and a uniform background-only treatment. No commit or publication is authorized.

Implementation result: the wide and compact maps now use a thirty-two-column refinement. The wide portrait begins at column 16 (`46.875%`) with a measured 12.6 px title gap at 1440 px; compact begins at column 18 (`53.125%`) with a 1.3 px box gap at 1024 px. The portrait container clips overflow and the unchanged bitmap receives a neutral `1.08` optical crop, increased to `1.22` only for 901–1100 px where both embedded phone bands previously appeared. The phone map now places twenty photos above, ten to the left of the rows 9–17 aperture and ten below; the portrait begins at the exact `40%` row boundary with `45%` hero height. The title remains Oranienbaum with the exact restored ink/copper/muted/rule tokens. Only the existing full-mosaic veil changes, from 58% to 66%, while its `2.2px` blur and foreground exclusions remain unchanged.

Verification result: ESLint, the production Vinext build, focused source/palette/composition tests and `git diff --check` pass. The complete five-test file reports three passing source/palette/media suites; its two pre-existing generated-worker integrations retain `default is not a function` in `dist/server/ssr/index.js`, with no worker/runtime source changed by this correction. Live browser checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 report forty loaded tiles, zero broken images, zero portrait/tile and title/portrait intersections and zero horizontal overflow at every width. The uniform overlay computes to `blur(2.2px)` and `rgba(245, 241, 232, 0.66)` everywhere; the title computes to `Oranienbaum, serif`, `rgb(26, 24, 21)` ink and `rgb(155, 99, 67)` accent. Title-to-portrait gaps are 12.6 px at 1440, 11.2 px at 1280, 1.3 px at 1024 and 27.0/9.7/6.8 px at 430/390/375. The 1024 capture confirms both black bands are fully absent, and the 390 capture confirms the portrait now begins immediately beneath the title while preserving all surrounding photographs.

Final anti-template audit: no stock card, bento preset, common radius, shadow, glass panel, glow, decorative gradient, generic copy, new action, icon, generated media or library-default composition was introduced. Files created: none. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the supplied 17:23:55 screenshot, the direct four-part correction, the existing forty-photo collage and approved apron portrait. Decisions without direct numeric references: the 32-column refinement, `1.08`/`1.22` optical crops and 66% veil; each is a minimal source- and geometry-led value verified at all required widths. UI libraries used only as primitives: Next Image and the existing Tailwind build pipeline; neither determines the visible composition. Remaining limitations/risks: publication rights for the screenshot-derived images and the existing generated-worker regression outside this hero change. No commit or publication was performed.

## Direct chef-biography copy replacement — 2026-08-31

The user supplied the complete replacement biography. The first paragraph already matched the supplied wording; the second paragraph is replaced with the exact service-to-experience sentence: `Теперь я провожу частные ужины, приватные мероприятия и мастер-классы и превращаю этот опыт в ваш идеальный гастрономический вечер.` The existing two-paragraph structure, typography, spacing, photograph and responsive composition remain unchanged. The active reference map, design system and rendered-HTML assertion are synchronized with the new copy. This content-only correction introduces no template pattern, UI-library styling, visual decision or decision without a reference.

Verification result: the production build, focused ESLint check, source/composition regression and git diff check pass. Live browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm the exact rendered sentence, zero paragraph overflow and zero page-level horizontal overflow. The longer close remains fully readable beside the existing award photograph at every required width. The two generated-worker tests retain the pre-existing Vinext SSR “default is not a function” failure, unrelated to this copy-only change.

## Screenshot-led aperture and full-field blur correction — 2026-08-31

The user supplied two current crops and identified three concrete defects: the main portrait aperture leaves an unwanted white field to its right and below; the portrait must begin on the grid boundary indicated by the adjacent vertical photo strip; and the milky blur must affect every collage photograph across the complete hero rather than reading as a left-side treatment. The active forty-source maps, portrait geometry, local `.hero-wash` gradients, full-field pseudo-layer, stacking order, responsive maps, current screenshots and mandatory widths were audited before implementation. The first crop proves that the reserved desktop aperture extends beyond the portrait, while the second isolates the photo strip whose right edge and row-three top establish the portrait start.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Desktop columns 9–13 / rows 3–7 reserved around a narrower 3:4 portrait | The unused fifth column and residual vertical reserve render as the white patch in the first screenshot | Fit the wide portrait to columns 9–12 / rows 3–7, begin it at `left: 50%` / `top: 20%`, and place the right-middle photographs from column 13 | Exact portrait source/crop, all forty screenshots, square edges and no photo/portrait overlap |
| One desktop placement map reused through 901–1100 px | The fitted wide right band would fall beneath the wider intermediate portrait | Add a fourth compact map only for 901–1100 px, retaining the current columns 9–13 reserve there | Sixteen-by-ten structure, all source order, existing title clearance and tablet breakpoint |
| Strong left `.hero-wash` plus a subtle full-field mosaic overlay | The left wash makes the uniform overlay appear local and gives the collage two visibly different treatments | Remove every local hero wash and use one complete mosaic-owned `2.2px` blur plus `58%` warm-paper veil across all forty photographs | Sharp title, eyebrow, header, main portrait and primary paper background |

Templated elements found: none. The defects come from mismatched project-specific geometry and compounded functional overlays, not from a stock component. Components retained: `Home`, header, exact hero copy, all forty supplied assets, portrait source, story and later sections. Components reworked: desktop and compact tile maps, portrait aperture geometry, the mosaic overlay and obsolete wash markup/rules. New components, assets, copy, controls, generated imagery and UI-library styling required: none.

Implementation sequence: update the active reference map and design system; author a fitted desktop map and separate compact map; align the wide portrait to the exact grid aperture; remove the local wash from markup and all breakpoints; apply one uniform full-mosaic treatment; update structural tests; run lint, production build, regression tests and `git diff --check`; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px for zero white aperture, forty loaded photographs, uniform overlay values, sharp foreground layers, zero intersections and zero overflow. No commit or publication is authorized.

Implementation result: the wide desktop map now places its five right-middle cells from column 13 with a four-column span, while the main portrait begins at column 9 / row 3 (`left: 50%`, `top: 20%`) and fills the exact columns 9–12 / rows 3–7 aperture through `25vw × 50%` geometry. A separate compact map retains the former column-14 right band for 901–1100 px, where the portrait remains at `left: 55%` and `26vw`; tablet and phone retain their independently approved maps. The `.hero-wash` element and all four base/responsive gradient rules are removed. One `.hero-mosaic::after` layer now covers the complete collage with `blur(2.2px)` and `58%` warm paper. The final veil is stronger than the first neutral trial because removing the former 84% left wash otherwise reduced title readability; unlike the rejected treatment, the value is identical across every photograph.

Verification result: ESLint, the production Vinext build and `git diff --check` pass. Three source/palette/media regression suites pass; the two existing generated-worker suites retain the unrelated `default is not a function` failure in `dist/server/ssr/index.js`, with no worker/runtime source changed. Live checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 report forty loaded tiles, zero broken hero images, zero tile/portrait and title/portrait intersections, zero horizontal overflow and zero `.hero-wash` elements at every width. The overlay computes uniformly to `blur(2.2px)` and `rgba(245, 241, 232, 0.58)`, while title, portrait container and portrait image each compute to `filter: none`. At 1440 and 1280 px the portrait-to-right and portrait-to-bottom gaps are only the authored 1.4–1.5 px grid seam; at 1024 px the compact right seam is 4.2 px. Final 1440 and 390 captures confirm that the white patch is gone, the portrait starts on the supplied strip boundary, every supporting photo receives the same treatment and the mobile composition remains filled.

Final anti-template audit: the change removes an unintended empty field and compounded local overlay rather than introducing a new visual pattern. No card, stock bento hierarchy, radius, shadow, glass panel, glow, decorative mesh, generated media, copied composition, generic copy, icon, action, animation or library-default styling was added. Files created: none. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the two supplied current screenshots, the direct three-part correction, the existing forty-photo batch and the approved apron portrait. Decisions without a direct numeric reference: `2.2px`, `58%`, the fitted 25% × 50% aperture and the separate compact map; these are minimal functional values selected through the supplied geometry and seven-width verification. UI libraries used only as primitives: Next Image and the existing Tailwind build pipeline; neither supplies a visible composition. Remaining limitations/risks: publication rights for the Instagram-derived screenshots and the two unrelated generated-worker failures. No commit or publication was performed.

## Mobile readability and vertical-rhythm refinement plan — 2026-08-31

The user requested a complete mobile review focused on readability, scanability, excess spacing, typography, block/media sizing, overflow and awkward wrapping. Before interface edits, the active route, all section markup, the complete stylesheet and breakpoint cascade, local fonts, forty-image hero map, portrait aperture, story film/poster/VTT behavior, sourcing and format imagery, inquiry illustration, current reference map/design system, existing mobile captures, regression assertions and dirty worktree were audited. A fresh live-browser pass measured 1440, 1280, 1024, 768, 430, 390 and 375 px. The document has no horizontal overflow, all visible targets are at least 44 px and the current content-specific compositions remain intact, so this is a restrained responsive correction rather than a redesign.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Phone story rail at 106–125 px with `9–10px` factual text | It falls below the project system's 11 px minimum and is visibly denser than the surrounding Onest copy | Give the rail a `3 / 8` share with a 120 px floor, set facts to 11 px with calmer tracking, slightly reduce the adjacent title/ornament rhythm and keep the film at `9 / 16` | Two-column phone movement, semantic order, exact three facts, square tapestry, film source/crop/captions/playback and square edges |
| Tablet hero portrait pinned to the bottom at 768 × 1024 | The reserved lower-right aperture leaves a large inactive interval after the title on taller tablet viewports | Within the existing empty aperture, raise the portrait only as extra viewport height becomes available; keep the 820 px floor unchanged | Exact portrait, crop, right alignment, non-overlap map, title position, collage and reading wash |
| Phone transition from story to menu | Existing 74 px story tail plus 96 px menu inset creates about 170 px of paper after the final story row before the next heading | Reduce only these phone section insets, preserving a clear editorial pause without an accidental blank band | Section order, paper fields, rules, 20 px gutter and all copy |
| Phone menu/source and footer rhythm | Repeated 42/30/24 px gaps and a 251 px sparse footer make the lower page longer than its content requires | Tighten scene, stage and footer row gaps while preserving 44 px link targets and the authored alternating/mosaic compositions | All images, statements, links, complete inquiry illustration and square geometry |
| Phone biography text at 12 px on 375 px | It is technically contained but smaller than the surrounding body system and more difficult to scan beside the award proof | Use a stable 13 px Onest body size and consistent 1.52 leading for both biography paragraphs | Exact two paragraphs, common typeface, two-column award row and image crop |

Templated elements found: none in the active mobile page. The hero, story split, oversized sourcing words, alternating event formats and full-frame inquiry drawing are all traced to direct user references. The audit instead found spacing and type values that had drifted too small or loose at breakpoint edges. Components retained: all JSX, copy, semantic order, images, videos, media behavior, header, hero maps, sourcing geometry, format sequence, inquiry and footer content. Components to rework: responsive CSS only for the tablet portrait and phone story/menu/footer rhythm. New components, assets, copy, controls, decorative effects and UI libraries required: none.

Implementation plan: first update the active reference map and design system; then adjust the 768 px portrait offset inside its reserved aperture; at 560 px improve the story rail/body typography, retain the required 9:16 film, tighten the story-to-menu transition and lower-page gaps, and compact the footer without reducing targets; add focused regression assertions for the new mobile values; run ESLint, production build, source/render tests and `git diff --check`; finally repeat live visual and measured verification at 1440, 1280, 1024, 768, 430, 390 and 375 px, including heading wraps, overflow, target sizes, image/video geometry, media readiness, focus/hover and console output. Static content has no form, loading, empty or form-error UI; this absence will be reported rather than invented.

Decisions without a dedicated visual reference: the exact revised inset and gap values. They are neutral fitting corrections bounded by the existing 20 px phone gutter, the approved typography scale, the portrait's authored empty aperture and the user's direct request to remove unnecessary spacing. They do not establish a new style or add decoration.

Implementation result: the 768 px hero portrait now rises only when viewport height exceeds the established 820 px floor, capped at 72 px and remaining inside its reserved lower-right aperture. On phones the portrait fills that aperture more efficiently at `65%`, `right: -4%`, `bottom: 0`. The award biography uses one stable 13 px / 1.52 Onest treatment. The home chapter keeps its two-column composition and required 9:16 film, while the statement rail receives a 120 px floor and the three facts render at 11 px / 1.38 with restrained tracking. Phone story tail/menu inset, source-scene, format-stage and footer gaps are tightened; the sparse footer drops from 251 px to 209 px at 375 px and to 161 px at 390/430 px while every target remains at least 44 px. At 375 px the complete document decreases from 4,993 px to 4,851 px without removing or hiding content.

Verification result: ESLint, production Vinext build, the focused responsive/source regression and `git diff --check` pass. The complete five-test file has three passing source/palette/media suites; its two generated-worker integration suites retain the existing `default is not a function` failure in `dist/server/ssr/index.js`, while no worker/runtime source changed. Live browser verification at 1440, 1280, 1024, 768, 430, 390 and 375 px found exact document widths with zero horizontal text/document overflow, forty hero tiles, zero portrait/tile intersections, zero broken images after viewport entry, no heading escaping its viewport and a 44 px minimum visible target. The film reaches ready state 4, plays while substantially visible, pauses after navigation to the distant contact section, computes to 4:3 at 1440/1280/1024/768 and 9:16 at 430/390/375. The header action reaches the approved forest hover value and exposes the 2 px focus outline with 5 px paper ring. Browser warning/error output is empty. The page has no form or data collection surface, so loading, empty, validation and submission-error states are not applicable and were not invented.

Final anti-template audit: no section, card, repeated composition, radius, shadow, gradient, glass, glow, decorative object, icon, placeholder, stock asset, generic copy or library-default theme was introduced. The update preserves the project-specific full-field collage, two-part editorial story, oversized source words, alternating event formats and complete inquiry drawing. Mobile remains deliberately composed rather than a mechanical desktop stack. Files created: none. Files changed for this refinement: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_AUDIT.md`, `docs/DESIGN_REFERENCE_MAP.md` and `docs/DESIGN_SYSTEM.md`. UI libraries added or used as visible primitives: none; Tailwind remains only the existing infrastructure import. Remaining limitations/risks: the two unrelated generated-worker test failures and previously documented publication authorization for some documentary assets; no publication or commit was performed.

## Mobile story-film 9:16 restoration plan — 2026-08-31

The user directly clarified that the horizontal story-film change belongs only to the web version: on mobile the video must remain `9:16` and everything else must stay as it was. Before interface edits, the active story markup, film source/poster/captions, global `4 / 3` rule, the existing `560px` phone breakpoint, current mobile two-column composition, reference map, design system, regression assertions and dirty worktree were audited. The defect is a cascade leak: the desktop aspect ratio currently applies at every width because the phone rule changes width but does not restore an aspect ratio.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Story film computes to `4 / 3` at phone widths | The global web rule reaches mobile and contradicts the direct correction | At `max-width: 560px`, set both the aperture and video to `aspect-ratio: 9 / 16` | Desktop/tablet `4 / 3`, current phone columns and spacing, exact MP4/poster/VTT, center crop, muted viewport playback, facts, ornament and square edges |

Templated elements found: none. This is a responsive containment correction inside the approved project-specific story, not a new composition. Components retained: the complete `ChefStoryVideo`, story markup and all non-phone CSS. Components reworked: two phone-only declarations and their regression assertion. New components, assets, copy, controls, decoration and UI-library primitives required: none.

Implementation sequence: update the active reference map and design system; add the scoped phone aspect-ratio override; update regression coverage to require web `4 / 3` and mobile `9 / 16`; run the focused source test, ESLint, production build and `git diff --check`; verify the required widths if browser access is available. Decisions without references: none. The breakpoint, source and all geometry except the explicitly supplied mobile ratio remain unchanged.

Implementation result: the global story-film aperture and video remain `4 / 3`. Inside the existing `@media (max-width: 560px)` block, both now explicitly resolve to `9 / 16`. No width, grid, gap, type, ornament, source, crop position, playback rule or markup changed, so the current phone composition is preserved apart from the corrected vertical aperture.

Verification result: ESLint, the production Vinext build, the focused composition/media regression and `git diff --check` pass. The complete five-test file has three passing source/palette/media suites; its two existing generated-worker integration tests retain the previously documented `default is not a function` failure in `dist/server/ssr/index.js`, and no worker/runtime source changed. Structural coverage now requires the default web `4 / 3` pair and the phone-only `9 / 16` pair. Per the active Sites workflow, browser screenshots, DOM inspection and resizing were not performed without an explicit browser-testing request; visual confirmation at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains the open definition-of-done limitation.

Final anti-template audit: the correction adds two phone-only aspect-ratio declarations and no section, card, repeated composition, radius, shadow, gradient, glass, glow, icon, copy, decoration, animation, generated media or library-default component. Files created: none. Files changed for this correction: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s direct mobile/web distinction, the existing 560px phone breakpoint and the exact existing film implementation. Decisions without references: none. UI libraries introduced or used as visible primitives: none. Remaining limitations and risks: the seven-width visual pass above and the unrelated generated-worker failures; no commit or publication was performed.

## Collage softening and non-overlap plan — 2026-08-31

The user directly asked to move the main chef photograph closer to the hero text without letting it cover other photographs, and to add a slight blur plus a transparent milky veil across the collage while leaving the text and main photograph/background unaffected. The active route, forty supplied WebP sources, all three explicit placement maps, hero stacking order, copy/portrait coordinates, prior blur comparison and required responsive widths were audited before implementation. The current portrait is an absolute foreground layer above a completely filled grid, so moving it alone would necessarily conceal documentary evidence; the correction therefore requires both a position change and a content-preserving reflow.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Desktop portrait at `left: 54%` over a fully occupied sixteen-by-ten mosaic | It sits farther from the text than requested and overlaps whichever tiles happen to lie beneath it | Move the portrait to `left: 50%` and reserve columns 9–13 / rows 3–7 as its fitted empty aperture | Exact portrait source, crop, dimensions, border, sharpness, title position and all forty collage sources |
| Fully occupied tablet and phone maps beneath a right/bottom portrait | The existing foreground photograph necessarily hides several screenshots at those widths | Re-author the tablet map around columns 8–12 / rows 8–16 and the phone map around columns 4–8 / rows 13–20 | Twelve-by-sixteen and eight-by-twenty grid systems, all forty sources, irregular spans and previous portrait coordinates |
| Sharp, high-density background collage | It competes with the title and portrait more than the latest direct direction permits | Add one mosaic-only pseudo-layer with `backdrop-filter: blur(1.4px)` and `rgb(245 241 232 / 16%)` | Natural image color, square edges, 2 px seams, existing reading scrim and sharp foreground layers |

Templated elements found: none in the approved hero. The potential failure is a generic glass-panel interpretation of “milky blur”; the confirmed implementation avoids a panel, radius, shadow or isolated card and instead treats only the complete documentary background as one quiet optical field. Components retained: `Home`, hero copy, header, portrait source, all forty screenshots, story and every later section. Components reworked: `buildBandLayout`, the three placement maps, `.hero-mosaic` overlay and wide-screen portrait position. New components, assets, copy, actions, UI-library components and generated imagery required: none.

Implementation sequence: update the active reference map and design system; extend the placement helper with explicit row/column origins; re-author all three maps around their responsive portrait aperture; move only the wide-screen portrait toward the copy; add the restrained mosaic-only softening layer; update structural regression coverage; run lint, production build, tests and `git diff --check`; then visually inspect 1440, 1280, 1024, 768, 430, 390 and 375 px for forty loaded tiles, zero tile/portrait intersections, sharp copy/portrait, correct overlay, no overflow and stable hierarchy. No commit or publication is authorized.

Implementation result: `buildBandLayout` now accepts explicit column and row origins, allowing all forty screenshots to flow around rather than beneath the foreground identity. The desktop sixteen-by-ten map uses eight top cells, twelve left-middle cells, five right-middle cells and fifteen bottom cells around a fitted columns 9–13 / rows 3–7 aperture. The tablet twelve-by-sixteen map uses twenty-four upper cells plus sixteen lower-left cells around columns 8–12 / rows 8–16, and the phone eight-by-twenty map uses thirty upper cells plus ten lower-left cells around columns 4–8 / rows 13–20. The wide-screen portrait begins at `left: 50%`; at 1100 px and below its existing `left: 55%` position now uses `26vw` so it remains inside the desktop aperture. One `.hero-mosaic::after` layer adds `blur(1.4px)` and `16%` warm paper above the mosaic only. Copy, portrait and primary paper field remain sharp sibling layers.

Verification result: ESLint, the production Vinext build and `git diff --check` pass. Three source/palette/media regression suites pass, including the forty-source, fitted-aperture and collage-only blur assertions. The two existing generated-worker integration tests remain unrelated failures with `default is not a function` inside `dist/server/ssr/index.js`; no worker/runtime source changed. Live checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 report forty loaded tiles, zero broken hero images, zero tile/portrait intersections, zero title/portrait intersections and zero horizontal overflow at every size. The overlay computes to `blur(1.4px)` and `rgba(245, 241, 232, 0.16)` throughout, while the title, portrait container and portrait image each compute to `filter: none`. Visual inspection of the final 1440 px and 390 px captures confirms that the portrait is closer to the copy, no photograph disappears beneath it, the remaining paper reserve reads as a restrained frame rather than an empty column, and the mobile composition is independently filled rather than a stacked desktop layout.

Final anti-template audit: the correction reflows the exact user-supplied documentary evidence and applies one directly requested uniform background treatment. It adds no repeated card system, stock bento hierarchy, radius, shadow, glass panel, glow, decorative mesh, generated person, replacement source, generic copy, icon, action, animation or library-default composition. Files created for this correction: none. Files changed for this correction: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. The earlier collage task’s forty optimized assets remain in `public/media/hero-instagram/`; the ignored screenshot inbox and unrelated untracked blur-preview paths were not edited or included. References used: the latest direct instruction, the supplied forty-photo batch, the restored approved apron portrait and the uniform-field principle from the previously documented comparison. Decisions without direct numeric references: the neutral `1.4px` blur, `16%` veil, fitted grid apertures and `26vw` intermediate width; each was kept minimal and verified at all required widths. UI libraries used only as primitives: Next Image delivery and the existing Tailwind build import; neither supplies visible styling. Remaining limitations and risks: publication rights for the supplied Instagram-derived screenshots still require confirmation for commercial release, and the two generated-worker integration failures remain outside this interface change. No commit or publication was performed.

## Main chef portrait restoration plan — 2026-08-31

The user directly corrected the new irregular forty-photo hero: the chef’s main photograph must remain exactly as it was over the previous collage. Before interface edits, the current forty-source dataset and three responsive partitions, the previous committed portrait markup/CSS, active light reading scrim, image-priority rule, reference map, design system, tests and dirty worktree were audited. The former implementation is available verbatim in the current `HEAD` and uses the already stored user-supplied `chef-hero-apron.jpg`.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| New forty-photo collage without a separate identity anchor | The user explicitly wants the previous main chef photograph to remain | Restore the exact previous portrait markup, source, crop and desktop/tablet/phone CSS coordinates | All forty new collage images, unequal tile proportions, responsive partitions, copy, header, wash and post-hero sections |
| Leading collage screenshot preloaded | The restored portrait is again the stable identity/LCP image | Make the portrait the sole preloaded hero image and return all forty supporting cells to lazy/low priority | One total image preload and optimized local delivery |

Templated elements found: none. This is a direct restoration of a confirmed project-specific identity layer, not a new card or collage pattern. Components retained: the full current page and new irregular collage. Components reworked: one portrait markup block, its exact previous CSS rules and the supporting-image priority branch. New assets, copy, actions, interactions, generated media and UI-library primitives required: none.

Implementation sequence: update this audit, the active reference map and design system; restore the previous portrait block and responsive CSS verbatim; make every collage tile lazy/low priority; update regression assertions; run lint, production build, focused tests and `git diff --check`; verify the image source, preload count, forty-cell presence and responsive geometry without committing or publishing.

Decisions without references: none. The asset, crop, dimensions and every responsive coordinate come directly from the user-approved previous implementation.

Implementation result: the exact previous `hero-chef-portrait` block is restored immediately above the wash and below the copy layer, using `/media/chef-hero-apron.jpg`, `fill`, the previous responsive `sizes`, sole `preload` and high fetch priority. The complete previous CSS is restored verbatim: the desktop 54% boundary and 3:4 field, the below-1100 px cap, the below-900 px lower-right field, the phone `-5% / -2% / 64%` placement, and the `object-fit: cover; object-position: 50% 47%` crop. All forty collage screenshots now use lazy/low-priority delivery; their data, order, proportions and three grid maps are unchanged.

Verification result: ESLint, the production Vinext build, the three source/palette/media tests and `git diff --check` pass. The two generated-worker integration tests retain the already documented `default is not a function` failure in `dist/server/ssr/index.js`; no worker or generated runtime file was changed. Live checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 confirm one loaded main portrait, forty collage tiles, zero broken hero images, zero title/portrait overlap and zero document overflow at every width. The measured portrait fields are `360 × 480`, `320 × 427`, `276 × 369`, `292 × 389`, `275 × 367`, `250 × 333` and `240 × 320` px respectively, matching the restored responsive rules. Visual review at 1440 and 390 px confirms the same prior desktop and phone identity hierarchy over the new irregular collage. The browser console contains no warning or error.

Final anti-template audit: the change restores one user-approved identity photograph and does not alter the collage composition or add a new pattern. It introduces no card system, repeated grid, new radius, shadow, blur, glow, glass, gradient, generated person, stock image, icon, copy, action, animation or UI-library styling. Files created: none. Files changed for this correction: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s direct instruction and the exact previous committed portrait implementation. Decisions without references: none. UI libraries introduced: none. Remaining limitations and risks: the existing publication-rights caveat for user-supplied imagery remains; no commit or publication was performed.

## User-supplied irregular hero collage plan — 2026-08-31

The user supplied a new screenshot batch and directly required every existing hero-collage photograph to be removed, the replacement collage to use these images only, every supplied photograph to remain in the hero on both web and mobile, and the photographs not to form an even grid or share one shape. The active route, sixty-cell mixed source ledger, two-part grid, foreground apron portrait, light reading scrim, responsive rules, image delivery, tests, reference map and design system were audited before implementation. The inbox contains forty valid screenshots between `1206 × 1966` and `2276 × 2174` pixels, plus one accidental `6 × 8` PNG that cannot function as a photograph.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Sixty-cell mix of older Instagram, gallery, sourcing, poster and film-derived sources | The source set directly contradicts the new all-supplied-photo boundary | Forty separately named delivery WebPs derived only from the valid supplied screenshots, each rendered exactly once | Local delivery, responsive sizing, low-priority loading and no runtime hotlink |
| Rigid 54/46 food/professional split with repeated square cells | The visible taxonomy and repeated geometry contradict the request for a normal irregular collage | One continuous authored partition: 16 × 10 on desktop, 12 × 16 on tablet and 8 × 20 on phone, with unequal column and row spans at every width | Full-field hero coverage, square edges, warm hairlines and documentary crops |
| Separate `chef-hero-apron.jpg` foreground photograph | It is not part of the new supplied batch and masks several cells that must all be visible | Remove the separate portrait layer; let the many supplied standing, cooking, teaching and group frames carry identity inside the collage | Existing hero copy, header, typography and functional paper reading scrim |

Templated elements found: the repeated small-square matrix and fixed subject split now behave as an imposed contact-sheet template rather than a composition derived from the supplied set. Components retained: `Home`, header, hero copy, exact title, light palette, reading scrim and every post-hero section. Components reworked: hero image dataset, mosaic markup, grid geometry, responsive layout and hero media regression assertions. New components, copy, actions, icons, generated assets and UI-library primitives required: none.

Implementation sequence: update this audit, the active reference map and design system; derive forty compressed WebPs with safe names outside the untracked inbox; replace both old arrays and the foreground portrait with one forty-item dataset; encode explicit unequal desktop/tablet/phone placements so every source stays inside the hero; update tests; run lint, production build, source/media tests and `git diff --check`; then visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px, including image loading, overflow, title wrapping, target size, focus and console state; complete the anti-template audit without publishing or committing.

Decisions without references: the exact grid coordinates, restrained 2 px gutters, WebP quality and per-frame focal points are neutral fitting decisions constrained by the supplied forty images, full-field hero, existing light reading system and the requirement that all images remain visible at every width. The inbox itself remains untracked and is not part of the deliverable.

Implementation result: the two old source arrays and their sixty mixed paths are replaced by one forty-item `heroCollageImages` dataset. The forty valid screenshots were resized only as needed, compressed to 3.0 MiB total and stored as `public/media/hero-instagram/hero-01.webp` through `hero-40.webp`; the source inbox remains untracked and the accidental `6 × 8` PNG is absent from both the delivered asset directory and rendered data. Explicit band layouts fill the complete 16 × 10 desktop, 12 × 16 tablet and 8 × 20 phone maps. Unequal row depths and column spans produce portrait, landscape, shallow and compact apertures with staggered internal seams while every screenshot appears exactly once. The former food/professional group wrappers, optimized-source remapper, wide-tile modifiers and separate apron portrait layer are removed. One leading supplied screenshot is preloaded; the remaining thirty-nine are lazy and low priority.

Verification result: ESLint, the production Vinext build, the three source/palette/media tests and `git diff --check` pass. The two existing generated-worker integration tests retain the previously documented `default is not a function` failure inside `dist/server/ssr/index.js`; no worker or generated runtime file was changed. Live checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 find forty tiles, forty loaded images, zero broken images, forty tiles wholly inside the hero, zero hero overflow and zero document-level horizontal overflow at every width. The intended grids resolve to 16 × 10, 12 × 16 and 8 × 20 at their respective breakpoints and expose 9, 12 and 9 distinct tile dimensions. Visual review at 1440 and 390 px confirms the hero reads as one irregular chef-led collage, the phone is a separately composed map rather than a stacked desktop layout, the title remains legible over the single functional paper dissolve, and the lower mobile evidence field remains open. Visible header targets are at least 44 px, the keyboard skip link exposes the forest focus ring, the Instagram hover resolves to `#0F332D`, and the browser console contains no warning or error. The decorative collage has no interactive, empty or error state; its only relevant loading/error state is the verified complete image set.

Final anti-template audit: the former repeated-square matrix, fixed 54/46 taxonomy and detached foreground portrait are gone. The replacement uses the exact supplied evidence and three explicitly authored responsive partitions; it introduces no reusable card grid, uniform tile shape, radius, shadow, glass, blur, glow, decorative mesh, generated person, stock image, placeholder, generic copy, icon, new action or UI-library styling. Files created: forty WebP assets in `public/media/hero-instagram/`. Files changed: `.gitignore`, `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the complete valid user-supplied screenshot batch and the direct desktop/mobile irregularity instruction, plus the existing approved hero copy and light reading system. Decisions without references: the neutral delivery quality, exact grid coordinates, 2 px seams and center-biased cover crops recorded above. UI libraries used only as primitives: Next Image delivery and the existing Tailwind build import; neither contributes a visible component or theme. Remaining limitations and risks: publication rights for the supplied Instagram-derived screenshots must be confirmed before commercial release; the inbox is ignored and the two unrelated untracked blur-exploration paths are intentionally excluded; no commit or publication was performed by this task.

## Supporting-label removals plan — 2026-08-31

The user directly removed five visible supporting lines: `мой путь`, `у меня нет готового меню`, `я готовлю для компаний до 20 гостей`, `первый шаг`, and `Я провожу частные ужины, приватные мероприятия и мастер-классы · до 20 гостей`. The active route, story heading, bespoke-menu heading and format heading, inquiry grid, footer grid, responsive rules, active reference map, design system and rendered-HTML coverage were audited before implementation.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Story eyebrow `мой путь` | Directly rejected supporting copy above the already sufficient MasterChef-to-table heading | No substitute label; keep the heading aligned to its existing editorial column | Story heading, award proof, biography, home chapter, film and ornament |
| Bespoke-menu eyebrow `у меня нет готового меню` | Directly rejected supporting copy above the already sufficient menu-creation heading | No substitute label; close the vacated heading margin | Menu heading, personal-menu paragraph and sourcing route |
| Event-format eyebrow `я готовлю для компаний до 20 гостей` | Directly rejected capacity repetition above the format heading | No substitute label; let the format heading lead the block | Three format names, descriptions and documentary images |
| Inquiry eyebrow `первый шаг` | Directly rejected generic step label | No substitute label; move the existing heading to the first grid row | Inquiry heading, villa illustration and Instagram action |
| Footer service/capacity sentence | Directly rejected repetition of formats and capacity already addressed elsewhere | No substitute sentence; use a two-role footer with identity and navigation/contact links | Wordmark, internal anchors and Instagram link |

Templated elements found: the generic step eyebrow and repeated service/capacity summaries behave as conventional landing-page microcopy rather than necessary project content. Components retained: every major section, heading, media asset, action, service card and navigation link. Components reworked: the five text nodes and only the margins/grid tracks that would otherwise remain empty. New components, assets, copy, decoration, interactions and UI-library primitives required: none.

Implementation sequence: record the user instruction in the active reference map and design system; remove the five exact text nodes; remove their now-unused selectors; preserve desktop and phone alignment by explicitly retaining the story heading column and compacting the inquiry/footer grids; add regression assertions for the exact removals; run lint, production build, tests and `git diff --check`. Because this is a copy-removal request and browser testing was not requested, screenshots, DOM inspection and resize testing remain outside this pass.

Implementation result: all five rejected text nodes are absent from the active route. The story heading remains in the established second editorial column on desktop; the bespoke-menu and format headings no longer reserve eyebrow margins; the inquiry grid now begins with its heading and uses three active rows; and the footer now uses two active columns for identity and links. The shared label selectors and all `contact-kicker` selectors were removed. No literal standalone backslash was present in the active page source.

Verification result: the existing local page returns `200`; ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage asserts that the five exact strings and their obsolete label wrappers/selectors remain absent. Per the Sites workflow, browser screenshot/DOM/resize testing was not requested and therefore was not performed; the AGENTS-required visual checks at 1440, 1280, 1024, 768, 430, 390 and 375 px remain the open verification limitation.

Final anti-template audit: removing the generic step eyebrow and repeated capacity/service summaries reduces conventional landing-page microcopy without adding a replacement section, card, badge, icon, radius, shadow, gradient, glass, glow, animation, decorative object or generic claim. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the five exact user removal instructions and the existing approved layout. Decisions without references: none. UI libraries introduced or restyled: none. Remaining limitations: the seven-width visual pass is open, and production publication requires explicit approval because the existing Site is public.

## Exact hero-title correction plan — 2026-08-31

The user supplied the exact replacement heading `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре` and explicitly limited the correction to the hero block. The active route, hero markup, typography and responsive rules, approved media composition, design documentation and rendered-HTML regression coverage were audited before implementation. The current hero still says `Евгений Грыбеник — ваш личный Мастер-Шеф.`; its surname, missing location and terminal punctuation do not match the new direct instruction.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Hero identity promise | The visible surname and service geography do not match the exact user-supplied line | `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре` | Eyebrow, existing semantic `h1`, ink/rust emphasis, line-group markup, typography, collage, portrait, header and every later section |

Templated elements found: none. This is a direct copy correction inside the approved project-specific hero, not a visual recomposition. Components retained: the complete `Home` page and all hero/post-hero styling. Component reworked: hero `h1` text only. New components, assets, styles, interactions, claims, visual effects and UI-library elements required: none.

Implementation sequence: record the new direct reference in the active reference map and design system; replace only the visible hero title; update the exact-copy regression assertion; run lint, production build, tests and `git diff --check`; keep browser screenshot/DOM/resize testing out of scope because the user requested a copy edit rather than browser QA; publish the validated existing Site through its current access policy.

Implementation result: the semantic hero `h1` now renders `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре` without terminal punctuation. The existing first identity line and rust-emphasis group remain intact, and no CSS, media, component, metadata or post-hero copy was changed for this correction. The rendered-HTML assertion now protects the exact supplied phrase.

Verification result: the local route returns `200`, the built HTML contains the exact updated span sequence, ESLint, the production Vinext build and `git diff --check` pass, and four of five repository tests pass. The remaining first-suite failure is pre-existing and unrelated: the current page intentionally omits the old contact paragraph while its stale assertion still requires `дату, место, количество гостей`; the same known drift is already recorded later in this audit. Per the Sites workflow, the user did not request browser testing, so screenshot, DOM and resize inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px was not performed and remains the visual-verification limitation for this copy change.

Final anti-template audit: no visual composition, card, grid, radius, shadow, glass, glow, gradient, decorative object, generic copy, icon, animation, mobile stacking rule or UI-library component was added or changed. The exact user-supplied line is the only interface modification. Decisions without references: none for this correction.

## Instagram-only hero mosaic plan — 2026-08-31

The user directly requested that the hero stop showing images taken from video and retain only Instagram photographs. The active route, sixty-cell dataset, local optimized derivatives, hero grid rules, foreground portrait, current reference map, design system and regression assertions were audited before implementation. The issue is limited to source provenance: the background mosaic currently mixes `/media/instagram/` files with `hero-film-still-*` frames and older local gallery/chef photographs, even though the requested composition itself remains approved.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Mixed-source sixty-cell hero dataset | Film-derived frames remain visible in the hero and the source mix is no longer what the user requested | Recompose all sixty background cells exclusively from the existing local `/media/instagram/instagram-*.jpg` set | Exact sixty-cell count, ten desktop rectangles, two additional tablet/phone rectangles, order rhythm, crops, lazy optimized delivery and square edges |
| Separate foreground chef portrait | It is a still photograph rather than a background video frame and anchors the chef identity above the collage | Keep the approved `chef-hero-apron.jpg` foreground layer unchanged | Real identity, crop, priority loading and current responsive placement |

Templated elements found: none. This is a source-provenance correction inside the existing project-specific collage, not a new visual composition. Components retained: `Home`, header, hero copy, actions, motion control, foreground portrait, all hero CSS, responsive maps and every post-hero section. Component reworked: `heroCollageImages` only. New components, assets, copy, visual effects and UI-library elements required: none.

Implementation sequence: update this audit, the active reference map and design system; replace every non-Instagram background source while preserving all sixty layout entries and rectangle flags; add a regression assertion that every hero background source is local Instagram media and that no film-still source remains; run lint, production build, tests and `git diff --check`; visually verify the required widths and record any remaining limitation.

Implementation result: `heroCollageImages` still contains exactly sixty entries, but every source now resolves from `/media/instagram/instagram-*.jpg`. All `hero-film-still-*` frames, the environment poster and older gallery/chef fallback images are absent from the hero background. The ten desktop-wide flags, two additional tablet/phone-wide flags, optimized WebP routing, animation order, foreground apron portrait, copy, actions and responsive CSS are unchanged. Regression coverage now requires sixty Instagram paths and rejects film, poster, gallery and chef fallback sources inside the collage dataset.

Verification result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. The existing local route returns `200`, and structural assertions confirm sixty Instagram-only cells, ten desktop rectangles, two additional tablet/phone rectangles and no former video-derived source in the hero dataset. Per the Sites workflow, screenshot, DOM and resize inspection were not performed without an explicit browser-testing request; the mandatory visual pass at 1440, 1280, 1024, 768, 430, 390 and 375 px remains open.

Final anti-template audit: no composition, reusable card, radius, shadow, glass, glow, decorative gradient, generated asset, generic copy or library-default component was added. The change removes unsupported media provenance while preserving the approved project-specific full-field collage and separately composed mobile map. Decisions without references and existing open inputs remain unchanged.

## Mobile hero media-visibility correction plan — 2026-08-31

The user supplied a current phone capture and directly reported that the photographs, the fact that the field is a collage, and the chef himself are not visible. The active route, all sixty collage sources, portrait source, hero stacking order, desktop/tablet/phone grid maps, color tokens, current light-direction reference, required-width captures and responsive CSS were audited before implementation. The defect is concentrated in media treatment rather than composition: on phones the 96–18% vertical paper wash is compounded by a second 76–12% horizontal wash, producing about 98% effective paper opacity across the opening and continuing to mute the lower mosaic; the current `hero-anchor-portrait.png` also contains a baked pale fade, so placing it above the CSS wash still leaves the chef washed out.

| Existing element | Why it looks wrong | Confirmed replacement | Retained |
|---|---|---|---|
| Two compounded phone paper gradients | They make sixty distinct photographs read as one beige texture and obscure the cell boundaries that establish the collage | One functional top-to-bottom paper scrim: calm behind the copy, a decisive fade after the paragraph/actions and a fully open documentary field at the bottom | Light hero direction, dark text, full-field 6 × 12 map and all sixty cells |
| Pre-faded `hero-anchor-portrait.png` | The fade is inside the asset, so the chef remains pale even though the portrait layer is above the wash | The user-supplied apron portrait from the 10:51 phone capture, stored locally and centrally cropped as a square-edged foreground photograph so the black screenshot bands remain outside the visible frame | Real chef identity, current lower-right position, no generated person and no card styling |
| Restrained global mosaic grading | Appropriate at wider widths, but too quiet after the phone wash compounds over it | Slightly clearer phone-only contrast/saturation while preserving natural skin and food color | Existing crops, optimized delivery, lazy loading and hairline cell boundaries |

Templated elements found: none. This is a screenshot-directed visibility correction to the approved project-specific hero. Components retained: `Home`, header, copy, actions, motion control, sixty-image dataset, desktop/tablet/phone grid maps and every post-hero section. Components reworked: portrait source and phone-only wash/media exposure. New components, copy, claims, interactions, generated assets and UI-library components required: none. Tailwind remains only a build-time CSS primitive.

Implementation sequence: update this audit, the active reference map and the design system; store the newly supplied apron portrait locally and replace the faded portrait source with it; use a controlled center crop that excludes the phone screenshot bands without retouching or regenerating the chef; collapse the phone wash to one functional vertical scrim and expose the lower collage; add phone-only restrained media contrast; update regression assertions; run lint, production build, tests and `git diff --check`; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px; then record the final anti-template and verification result.

Implementation result: the supplied 576 × 1280 capture is stored unchanged as `public/media/chef-hero-apron.jpg` and is now the hero’s only high-priority image. A 3:4 foreground field with `object-fit: cover` and `object-position: 50% 47%` keeps the real face, apron and hands while cropping the capture’s black system bands outside the visible frame. At 1100 px and below the portrait is shifted clear of the reading column, and at 900 px and below its 42% right-side field avoids paragraph overlap; the established 62% × 41% lower-right phone field remains. The former two phone wash layers are replaced by one vertical paper scrim that falls from 93% to complete transparency by 87% of the hero, and phone collage cells receive only a restrained saturation/contrast lift. The quiet formats route gains a local translucent paper backing so it remains readable where the collage opens.

Verification result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Live visual checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 confirm the supplied portrait source, sixty collage cells, no visible screenshot bands, zero broken images, zero horizontal overflow and 44 px minimum targets. The 1024 and 768 px paragraph/portrait overlap area measures zero after the breakpoint correction. At 430, 390 and 375 px the lower mosaic is fully exposed, cell boundaries and individual scenes are legible, and the chef’s face, apron and hands remain visible. The primary hover resolves to `#0F332D`, the keyboard skip-link focus exposes the documented forest/paper ring, and the browser console contains no warning or error.

Final anti-template audit: the correction reveals project documentary material rather than adding a new layout pattern. It introduces no card system, bento preset, radius, shadow, glass, blur, glow, decorative mesh, generated person, identity edit, generic copy, icon or library-default component. The only gradient is the functional single-axis paper reading scrim required by the approved light direction; unlike the superseded compounded washes, it becomes completely transparent over the lower evidence field. Decisions without references remain unchanged: service radius, dietary claims, exact MasterChef edition, additional contacts, final logo and form/loading/empty/error language remain undefined.

## Light full-field hero correction plan — 2026-08-31

The user explicitly restored the previously selected light background after reviewing the full-field sixty-tile implementation. The current project structure, route, stylesheet, tokens, fonts, image dataset, responsive rules, active reference map and design system were inspected before implementation. The problem is isolated to color treatment: `.hero`, `.hero-mosaic` and tile fallbacks use the near-black `--hero-base`; every collage image is reduced to `brightness(0.82)`; and desktop, tablet and phone overlays apply near-black scrims reaching 96%, 97% and 94% opacity. This combination makes the requested documentary collage read as black even though the correct sixty-image composition is present.

| Existing element | Why it looks wrong | Confirmed replacement | Retained |
|---|---|---|---|
| Near-black hero and mosaic fallbacks | Any loading gap or cell seam expands the rejected dark direction | Existing approved `--paper` surface | Full-field 20 × 14, 9 × 8 and 6 × 12 grids |
| Darkened tile filter | It suppresses people, catering and kitchen evidence the user asked to foreground | Natural exposure with restrained saturation and contrast only | Exact sixty sources, editorial crops, square edges and hover movement |
| 94–97% black reading scrim | It covers most of the collage and contradicts the selected light concept | Functional left/top-biased warm-paper scrim that dissolves into the photographs | Copy and portrait remain foreground overlays |
| Light hero type and transparent/dark header | These roles depend on the rejected black scrim | Dark `--ink`/`--muted` copy, copper emphasis, forest focus and a restrained paper header overlay | Exact wordmark, navigation, actions, copy, 44 px targets and mobile geometry |

Templated elements found: none. This is a reference correction, not a new composition. Components retained: `Home`, the sixty-item collage data, portrait, header, copy, actions, motion control, all responsive grid maps and every post-hero section. Components reworked: hero/header color roles, tile exposure, functional reading scrims, rules and focus treatment. New components required: none. Tailwind remains only a build-time CSS primitive; no stock theme or UI-library component is used.

Implementation sequence: update this audit, the active reference map and the design system; replace only hero/header color rules and breakpoint scrims; update regression assertions; run lint, production build, tests and `git diff --check`; then record the final anti-template and verification result. The Sites workflow does not permit screenshot, DOM or resize inspection unless the user explicitly requests browser testing, so the seven-width visual pass remains an open blocker unless separately authorized.

Implementation result: the hero, complete mosaic and tile loading fallbacks now use `--paper`; the sixty supporting photographs retain natural brightness with restrained saturation/contrast; and the former near-black overlays are replaced at every breakpoint by warm-paper reading scrims. Header, headline, copy, quiet action, motion control, format rail and focus states now use the approved ink/muted/rust/forest roles. The exact sixty sources, ten desktop rectangles, twelve tablet/phone rectangles, portrait, copy, actions and mobile geometry are unchanged.

Verification result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage confirms the light hero fallback and scrim, absence of brightness dimming and the existing sixty-tile responsive maps. The live local route returns `200` at `http://localhost:3000`. Per the Sites workflow and the user’s local-link request, no screenshot, DOM inspection or browser resizing was performed; visual approval at 1440, 1280, 1024, 768, 430, 390 and 375 px remains the only open blocker.

Final anti-template audit: the correction adds no card system, bento preset, stock gradient, glass, blur, glow, shadow, radius, generated person, invented copy or library-default styling. The only gradients are functional warm-paper reading scrims derived from the selected light direction; they support dark-text contrast while the project-specific documentary collage remains continuous across the full hero.

## Full-field sixty-tile hero plan — 2026-08-31

The user directly superseded the split paper/collage hero: the collage must cover the entire hero, contain sixty small squares with occasional rectangles, favor the chef, people and catering over selfies, and carry both the copy and a chef photograph as foreground overlays. The project structure, active route, stylesheet, tokens, fonts, local media, optimized derivatives, existing references, responsive rules and current uncommitted work were inspected before this plan. Existing unrelated sourcing-route and Lefkaritika work remains untouched.

| Existing element | Why it looks wrong for the new direction | Confirmed replacement | Retained |
|---|---|---|---|
| Paper reading field plus right-side mosaic | The collage covers only part of the hero, contradicting the explicit full-block instruction | One edge-to-edge documentary grid behind the header and all hero content | Current page hierarchy, verified copy, navigation and action destination |
| Fifteen large named tiles plus a nested forty-five-image contact sheet | It creates feature-card hierarchy instead of sixty consistently small cells | One flat sixty-item grid with ten desktop and twelve tablet/phone horizontal cells | Square edges, real local media, optimized derivatives and restrained hairlines |
| Instagram set used wholesale | Several adjacent selfie frames make the wall read as personal phone documentation instead of service evidence | Curated set led by cooking, teams, guests, kitchens, service and catering; omit active selfie frames and repeat strong documentary sources sparingly | Approved `@evg.chef` provenance and no runtime hotlinks |
| Hero portrait embedded as a large mosaic tile and hero film as another cell | Neither satisfies the new request for a chef photograph over the collage, and the film competes with the sixty requested photographs | Real alpha-backed chef portrait as a separate identity layer; no hero video | Exact real chef asset; story video, reduced-motion behavior and single page-level motion control |
| Paper-only desktop/mobile text colors | They do not remain readable once the collage fills the background | Existing media-context hero tokens plus a functional left-biased dark reading scrim | Forest action, verified hierarchy, 44 px targets and media-context focus treatment |
| Phone collage hidden in favor of two frames | It directly violates the instruction to make the collage the full hero | Separate 6 × 12 phone map containing all sixty tiles and twelve horizontal cells | Phone copy order, hidden duplicate format rail and compact actions |

Templated elements found: the nested contact sheet behaves like a secondary gallery widget and the large named tiles create a bento-like hierarchy. Both must be removed. Components retained: every post-hero section, copy, actions, header links, fonts, tokens, local documentary library, motion controller and chef-story video. Components reworked: hero media data, markup, portrait layering, full-field scrim, header colors, grid maps and hero-responsive rules. New components required: none. UI libraries used: Tailwind remains only a build-time CSS import; no library component or stock theme is used.

Implementation sequence: update the reference map and design system; replace the split hero arrays with one curated sixty-item dataset; remove the nested contact sheet and hero video from hero markup; add the real portrait overlay; rewrite only hero/header CSS and responsive rules; update structural regression assertions; run lint, build and tests; complete the permitted preview/deployment flow; record the anti-template and required-width verification results or leave the visual pass explicitly open if the Sites workflow does not permit browser QA.

Implementation result: the two former media arrays and nested contact sheet are replaced by one `heroCollageImages` dataset with exactly sixty rendered cells. Ten sources become horizontal on desktop and two additional sources become horizontal below 900 px, filling the documented 20 × 14, 9 × 8 and 6 × 12 maps without hiding any cell. The curated set omits the active selfie frames and prioritizes cooking sequences, teams, guests, service rooms, catering kitchens and plated tables; a small number of stronger documentary sources repeat rather than restoring the rejected selfie sequence. `hero-anchor-portrait.png` is now the only high-priority hero image and sits as a real alpha-backed foreground portrait. `HeroMosaicVideo` is removed from the page while the independently approved story film remains unchanged.

Verification result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass after integration with the current Lefkaritika and sourcing-route work. Structural assertions confirm sixty collage cells, ten desktop rectangles, twelve tablet/phone rectangles, one image preload, sixty lazy stills, no hidden mobile collage, no nested contact sheet, no hero video and absence of the selected selfie filenames. The live local route returns `200` and was handed off in the existing Site preview tab. Per the Sites workflow, no screenshot, DOM inspection or browser resizing was performed without an explicit browser-testing request; the mandatory visual pass at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains an open blocker. Crop quality, exact portrait/text overlap and line wrapping at those seven widths must not be claimed as visually approved until that pass is authorized.

Final anti-template audit: the active hero contains no bento hierarchy, feature cards, nested gallery widget, rounded media, shadow, glow, blur, glass, arbitrary mesh, generated person, stock avatar, library-default component or mobile desktop stack. The only gradient is the functional dark reading scrim required to keep verified text legible over documentary photography. No UI library contributes visible styling. The saved Sites version is prepared, but the currently public site requires explicit publication approval before deployment.

## Independent-audit remediation plan — 2026-08-30

The user requested that every finding from the independent read-only audit be corrected without publishing. The current page, active JSX, final CSS overrides, local media, build output, live HTTP headers, current design documents and tests were inspected before interface edits.

| Existing issue | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Sixty-three server image preloads and full-size sources in small mosaic cells | They create a 9.50 MiB image candidate set and compete with the hero's actual LCP content | One optimized high-priority anchor plus responsive lazy/low-priority supporting images | Exact sixty-image composition, crops, grid positions, animation order and approved assets |
| Eager offscreen story video and autoplay-based hero loop | Autoplay begins resource work before viewport/motion decisions and defeats the poster-first fallback | Client-controlled poster-first video components; `preload="none"`; play only when allowed and relevant | Exact MP4s, posters, muted loops, 16:9/9:16 geometry and no controls |
| Static assets revalidate immediately and MP4 Range requests return full `200` responses | Repeat visits create avoidable validation traffic; seeking/metadata can transfer the full video | Worker-level asset caching plus standards-compliant single-range `206` responses | Existing Sites/Vinext architecture, file URLs and media bytes |
| Request-derived metadata and missing favicon/robots/sitemap | The brochure route becomes `no-store` only to discover its own host and browser/site metadata is incomplete | Trusted static site origin, canonical metadata, declared SVG icon and standard discovery routes | Existing title, description and social preview |
| Low-contrast quiet/rust microcopy and 8.5 px phone facts | Several normal-text combinations miss AA or strain readability | Accessible quiet/rust text tokens and an 11 px phone factual line | Approved paper/forest/rust palette, typography roles and content |
| Mobile-only caption styling | Desktop/tablet fall back to browser-default cue presentation | One global project cue style with a smaller phone override | Exact VTT wording, timing and accessibility role |
| Multiple contradictory “active” reference states and historical CSS implementations | Future changes can accidentally restore rejected designs or inherit stale cascade rules | Current-only reference/system documents and one self-contained active chef-story stylesheet | Complete decision history in this audit, current editorial composition and approved mockups |
| Regex-only regression coverage | Green tests do not detect preload budgets, cache/range behavior, metadata or accessibility tokens | Source/render assertions plus worker cache/range and performance-budget tests | Existing server-render and reference-integrity coverage |

Templated elements found: none in the active visual composition. The work is functional remediation, not redesign. Components retained: all page sections, copy, media, semantic hierarchy, hero mosaic, story editorial spread, menu stages/atlas, inquiry illustration and footer. Components reworked: image delivery, hero-video lifecycle, story-video lifecycle, metadata, static-asset delivery and CSS organization. Two small functional modules, `HeroMosaicVideo` and the shared media-motion controller, are required to prevent invisible autoplay, respect reduced motion and let the visitor stop persistent motion. No UI library component is required. A corrected social preview based on the real chef portrait and a neutral temporary favicon are required because the former preview showed the wrong person and the starter favicon was unrelated.

Implementation must preserve the exact reference-led layouts, update `DESIGN_REFERENCE_MAP.md` and `DESIGN_SYSTEM.md` before interface code, run lint/build/tests, check the seven mandatory widths, verify captions/reduced motion/network/console, complete the anti-template audit and stop before publication.

### Remediation result — 2026-08-30

- The active CSS and both design documents now describe one current interface; superseded experiments remain only as dated history in this audit.
- The palette is split by role: `#A86233` is display copper, `#934522` is AA copper text, `#68635A` is quiet text, `#7C756B` is the functional rule, and the documentary hero has a guaranteed `#14100F` veil. Automated contrast checks pass for every documented normal-text pair.
- The sixty-image hero keeps its approved composition but now ships one high-priority anchor and sixty-three cell-sized WebP derivatives; all supporting images are lazy/low priority. Both videos are poster-first, viewport-controlled, reduced-motion aware and synchronized with an explicit pause/resume control.
- The story film retains its VTT source, but the all-duration `[Музыкальное сопровождение]` cue is no longer forced over a permanently muted background film; the specific Russian `aria-label` provides its meaningful context.
- Static metadata now uses the trusted project URL and includes canonical, Open Graph/X, favicon, robots and sitemap output. `public/og.png` is exactly 1200 × 630 and uses the real chef rather than the former substitute person.
- The edge worker adds durable static caching and standards-compliant single-range MP4 responses. Runtime tests cover valid `206`, invalid `416`, cache headers, metadata, optimized-asset counts, OG dimensions, palette contrast and active source invariants.
- `npm test`, `npm run lint` and `git diff --check` pass. The required live visual pass at 1440, 1280, 1024, 768, 430, 390 and 375 px remains an open blocker in this session because browser access was explicitly declined; no alternative browser or publishing path was used.

Final anti-template audit: no generic card system, equalized section template, stock photography, gradient, glass, glow, rounding, decorative blur, SaaS pattern or library-default visual was introduced. Existing project-specific hierarchy, real media, distinct section rhythms and separate mobile compositions are preserved.

## Scope inspected

- repository structure and Git state;
- application and source files;
- components, pages, and routes;
- styles, tokens, fonts, images, and content;
- responsive implementation;
- URLs, screenshots, mockups, and reference directories;
- project design and requirements documentation.

## Findings

## Latest screenshot-directed correction — new chef photograph and horizontal film

The user supplied two marked screenshots on 2026-08-30. The first selects the square focal cell directly below the `MAMA GAIA` team photograph for a different image of the chef. The second selects the dark lower-right gap immediately left of the current portrait film and explicitly requires the same original hero video in 16:9 rather than 9:16. These marks supersede the previous `.tile-white` author emphasis and the tall far-right video placement; the rest of the asymmetric collage and all later sections remain approved.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| `chef-white-jacket.jpg` as the large sharp author cell | The user again rejected this photograph and marked a different cell for the author image | Promote the stronger existing `chef-portrait.jpg` into the marked `.tile-dessert` cell; rotate the other two chef-photo sources into subordinate cells so all sixty stills remain unique | Existing local chef photography, square edges, no generated person, and the unequal collage |
| Tall `.tile-chef-video` at the far right | It is still presented with a portrait-shaped viewport and occupies the wrong place | Keep `chef-environment.mp4`, but move its named grid cell into the marked lower-right gap and give the cell a true 16:9 aspect ratio | Exact original MP4, poster, autoplay, mute, loop, no controls, and `filter: none` |
| Former mobile author and film map | It is tied to the rejected featured tile and vertical film | Give the marked photo the large mobile author area and span the film horizontally below/right | Six-column mobile focal grid, independent mobile composition, full copy, and 44 px targets |

Templated elements found: none in the existing asymmetric field. This revision corrects two user-marked cells and does not introduce a card group, media column, bento preset, or decorative layer. Components retained: page structure, all sixty unique still sources, supporting contact field, copy, navigation, actions, later sections, both video sources, fonts, and palette. Components reworked: the three chef-photo source assignments, sharp-cell selector, video grid area/aspect, and mobile placement. New components and UI libraries required: none.

Implementation plan: rotate the three existing chef-photo sources so `chef-portrait.jpg` occupies the selected square without duplication; transfer the sharp/foreground treatment from `.tile-white` to `.tile-dessert`; move `.tile-chef-video` to the lower-right gap with a 16:9 container and landscape crop; remap the same pair deliberately below 900 px; update structural assertions; then run lint, build, rendered-source tests, the seven required responsive checks, media readiness checks, and the final anti-template audit before publishing.

Implementation result: the three existing chef photographs were rotated rather than duplicated. `chef-portrait.jpg` now occupies the marked `.tile-dessert` cell with the face-preserving `50% 8%` crop, `filter: none`, no crop-drift animation, and foreground stacking above the readability veil. `chef-white-jacket.jpg` moves to the smaller subordinate `.tile-portrait` cell, while `gallery-dessert-chef.jpg` occupies the former large `.tile-white` background area behind the veil. `.tile-chef-video` keeps the exact `chef-environment.mp4` source and poster, moves from the tall far-right area to `8 / 7 / 11 / 11`, aligns to the bottom of that grid field, and computes to a true 16:9 container with `object-fit: cover`. Below 900 px the featured photo takes the large author area and the same horizontal film spans the lower-right four columns.

Verification result: ESLint, the production build, both rendered-source tests, and media/source assertions pass. Browser checks at 1440, 1280, 1024, 768, 430, 390, and 375 px confirm sixty loaded hero images, zero broken images, zero document-level horizontal overflow, zero heading self-overflow, and a 44 px minimum visible interactive target. The promoted photograph resolves to `chef-portrait.jpg`, computes to `filter: none`, stays above the veil, and keeps the chef's face in frame at every width. The hero film resolves to the original `chef-environment.mp4`, reaches ready state 4, computes to `filter: none` and `object-fit: cover`, and maintains a measured 1.7778 ratio at every width. Its original file is 720 × 1280, so the requested landscape presentation intentionally crops the top and bottom rather than stretching or replacing the footage.

Final anti-template audit: the correction uses two exact user-marked cells within the existing irregular field. No detached card pair, generic media column, bento preset, equalized gallery, new decoration, blur, rounding, shadow, glow, stock image, generated chef, replacement clip, copied interface, or UI-library theme was introduced. Mobile retains a distinct map rather than stacking the desktop pair. No unresolved visual decision remains in this correction.

## Latest voice correction — first person throughout

The user directly required the site text to be written in the first person. This supersedes the detached third-person biography and service descriptions introduced in the preceding content revision. The information architecture, claims, imagery, section order, and conversion path remain unchanged; only narrative perspective changes. The hero becomes `Я — ваше меню`, the biography becomes the chef's own account, the process becomes `вы рассказываете мне / я нахожу / я создаю`, each format states what I will do, and the inquiry asks the visitor to tell me what they want. Neutral navigation and factual accessibility descriptions are retained because they are functional labels rather than brand narration.

Implementation and verification result: metadata, hero, biography, menu process, sourcing examples, formats, inquiry close, actions, and footer now use one consistent first-person voice. The villa label was shortened to `я — у вас дома` so the first-person wording remains legible within the existing mobile composition. ESLint, the production build, both rendered-source tests, and `git diff --check` pass. The preceding seven-width browser audit remains valid because no layout structure changed; an additional 390 px screenshot check confirms that the corrected villa label is fully visible and the page has no new horizontal overflow.

## Latest visual correction — both chef media belong to an asymmetric collage

The user corrected the previous foreground pair on 2026-08-30: neither the selected photograph nor the video should read as a card placed over the collage. Both must be real collage cells to the right of the copy, both must remain optically sharp, the photograph must be replaced with a more successful existing chef image, and the surrounding mosaic must use visibly unequal sizes instead of a symmetric contact sheet.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Separate portrait-and-video foreground pair | It reads as two mounted cards rather than as part of the documentary collage | Return both media to `.hero-mosaic` as named, explicitly placed cells to the right of the copy; preserve the original `chef-environment.mp4` hero loop | Same hero copy, dark documentary field, one action, fact line, original hero video, and square edges |
| `chef-portrait.jpg` as the promoted author image | The user rejected this portrait as insufficiently successful | Promote `chef-white-jacket.jpg`: direct eye contact, clear professional uniform, bright separation from the dark field | No generated face, retouching, crop export, blur, overlay, or unrelated photograph |
| Uniform 15 × 3 lower contact sheet | Repeated equal cells produce the symmetric rhythm the user rejected | Recompose the forty-five supporting stills through dense 18 × 6 desktop and 12 × 10 mobile fields with selected 2 × 2, 3 × 2, 2 × 3, and narrow cells | All forty-five local stills, chronological material, sharp rendering, and no carousel |
| Foreground tiles outside the mosaic veil | Their isolation creates card-like depth | Let only the named chef photo and chef video rise above the readability veil while remaining grid cells; all other media stays behind it | Readable text contrast, no shadows, no rounding, and restrained rules |

Templated elements found: the equal lower contact sheet has become too regular for the latest direction, and the separate media pair reads as a familiar editorial-card overlay. The correction replaces both with one project-specific asymmetric image field. Components retained: navigation, copy, actions, sixty unique stills, both project video components, later sections, fonts, and palette. Components reworked: hero mosaic markup, featured asset, grid areas, contact-field density, stacking, and mobile map. New components and UI libraries required: none.

Implementation plan: restore the sixtieth background image; remove the separate foreground pair; insert the original `chef-environment.mp4` hero loop directly into the mosaic; make `chef-white-jacket.jpg` the sharp featured right-side cell; create unequal desktop and mobile spans for the lower field; preserve reading contrast; update assertions; then repeat the seven-width visual and anti-template audit.

Implementation result: the separate `.hero-chef-pair` is removed. `chef-white-jacket.jpg` is now the large named mosaic cell to the right of the copy, and the original `chef-environment.mp4` loop is a smaller mosaic cell below/right. Both sit inside `.hero-mosaic`, compute to `filter: none`, keep square edges, and rise above only the readability veil. `chef-portrait.jpg` returns as a subordinate background tile, so the hero again contains exactly sixty unique still images. The former 15 × 3 contact strip is replaced by a dense 18 × 6 desktop field and a 12 × 10 mobile field with selected narrow, 2 × 2, 3 × 2, 2 × 3, and 3 × 3 cells.

Verification result: lint, production build, rendered-source tests, and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390, and 375 px confirm sixty loaded hero images, forty-five supporting cells, multiple computed cell sizes at every width, zero broken images, zero horizontal overflow, 44 px minimum visible targets, heading containment, and `filter: none` on both the promoted photo and the original hero video. The original loop resolves to `chef-environment.mp4`, reaches ready state 4, and plays while visible.

Final anti-template audit: the equal contact sheet and detached media-card pair are gone. The hero now has a content-led irregular rhythm, one clearly weighted author image, one subordinate motion cell, and a distinct mobile map. No generic card system, symmetric gallery widget, stock media, blur, rounded device frame, glow, glass, gradient, shadow, decorative object, or UI-library theme was introduced. The featured-photo choice is grounded in the user's request and existing project media; there are no unresolved visual decisions in this correction.

## Latest visual revision plan — sharp chef portrait beside the copy, film lower right

The user directly requested on 2026-08-30 that the hero text be paired with a clearly emphasized, unblurred photograph of the chef, while the chef video should sit lower and farther to the right. This instruction is the confirmed compositional reference for the revision.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Chef portrait embedded as one tile in the background mosaic | The global hero veil and contact-field density prevent the person from reading as the primary author beside the copy | Promote the sharp local `chef-portrait.jpg` into one dedicated square-edged portrait immediately beside the copy | Exact chef photograph, documentary background, typography, formal copy, action, and factual line |
| Process video directly below the paragraph in the text column | It interrupts the reading sequence, does not create the requested lower-right relationship, and its first frame does not identify the chef | Use the existing 9:16 chef-at-work film and its chef-visible poster in the media composition, lower than the portrait and shifted to its right | User-supplied footage, autoplay, loop, muted state, no controls, and `filter: none` |
| `chef-portrait.jpg` also present in the focal mosaic | Repeating the promoted portrait would weaken its emphasis and break the sixty-unique-still rule | Remove only that duplicate mosaic tile; the dedicated portrait becomes the sixtieth still while the other fifty-nine remain in the background field | Dominant washed anchor tile, all other unique stills, crop rhythm, and every later section |
| Desktop-first pair on narrow screens | A literal side-by-side reduction would make both faces too small | At 900 px and below, place the portrait after the copy and keep the video lower-right as a controlled overlap; on phones reduce the overlap and preserve the reading order | Direct mobile navigation, full-width action, 44 px targets, and deliberate collage recomposition |

Templated elements found: none. The requested change is an editorial author-and-process pair grounded in real project media, not a generic card group. Components retained: site header, hero copy, action, fact line, documentary mosaic, all later sections, fonts, palette, and both video sources. Components reworked: hero content grouping, the focal-media list, portrait treatment, video placement, hero spacing, and mobile ordering. New component required: none. UI libraries remain infrastructure-only.

Implementation plan: group the hero copy separately from the media pair; promote the existing sharp portrait without any CSS blur or image filter; place the existing chef-at-work film below and to the right of the portrait; keep exactly sixty unique hero still images by removing the promoted photo from the background list; recompose the pair for tablet and phone widths; update structural tests; then run the full anti-template and seven-width visual verification.

## Latest content revision plan — the chef is the menu

The user supplied the missing business narrative on 2026-08-30. The service is led by a MasterChef winner who teaches culinary craft, has worked across different countries, and has experience opening restaurants. He now concentrates that experience into personally led private events for groups of up to 20. There is no fixed catalogue: the requested evening determines the products, menu, and service format.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Generic hero promise `Ужин, созданный для вас` | It is pleasant but interchangeable and does not express the chef's distinctive no-catalogue model | Lead with `Шеф — и есть меню`, followed immediately by the concrete request-to-evening explanation | Current hero media, type system, one main action, and factual line |
| Villa story without biography | The visual says `у вас дома` but gives no reason to trust this particular chef | Add a restrained editorial biography after the villa: MasterChef victory → teaching/international/restaurant experience → deliberate move to intimate events | Villa illustration, live window, playback behavior, and existing section label |
| Abstract menu inputs | They explain consultation but not the exceptional sourcing effort or what happens after the call | Use three practical steps: client describes; chef sources; chef creates and leads | Numbered ruled list, menu authorship, and no fixed catalogue |
| Dinner sequence `встреча / подача / финал` | It repeats mood but hides the actual range of services the user wants to sell | Reuse the three existing documentary figures for a private dinner, cocktail party, and masterclass; state the seven-course and up-to-20 boundaries in copy | Existing photography, square edges, typography, and three-item reading rhythm |
| Formal contact close | It asks for details but does not remove the perceived burden of choosing a menu | Ask only for date, guest count, and the desired feeling; the chef then asks questions and prepares the proposal | Instagram as the only verified channel and one final action |

This is a content-led rework, not a new landing-page template. No testimonial, FAQ, package card, price tier, urgency device, extra conversion band, new media, new icon, or UI library is required. One genuinely necessary element is the short post-villa biography, because the current page contains no place where the supplied career proof can be understood. The existing menu figures are re-authored as representative scenarios rather than converted into packages.

Implementation plan: update the reference map and design system first; rewrite metadata, navigation labels, hero, story, process, formats, contact, footer, alternative text, and rendered-copy assertions; add only the layout rules required for the biography; verify build, lint, source tests, responsive rendering at all seven mandatory widths, target sizes, heading wraps, overflow, media loading, and reduced-motion behavior; then record the final anti-template audit and any unsupplied facts.

Implementation result: the opening now states the differentiator `Шеф — и есть меню` and explains it before the first action. A new post-villa biography connects the supplied MasterChef victory, current teaching, international travel, and restaurant-opening experience to the deliberate choice of personally led private events. The menu section now shows how a request becomes an evening, including the supplied mountain-lamb and port-fish examples. The existing three visual figures sell a private dinner of up to seven courses, a cocktail party with small bites, and a culinary masterclass. The final image field also names small catering, while the page states the 20-guest limit consistently. Metadata, navigation, alternative text, footer, and the inquiry close use the same language.

Verification result: ESLint, production build, both rendered-HTML/source tests, and `git diff --check` pass. Live browser inspection at 1440, 1280, 1024, 768, 430, 390, and 375 px found zero document-level horizontal overflow, zero broken images among 67 rendered images, two present videos, all key blocks and headings within the viewport, no heading self-overflow, and no visible interactive target below 44 px. The initial 390 px check found `Коктейльная вечеринка` crossing into its image; the even mobile figure now gives the caption the wider column, and a second DOM and screenshot check confirms zero text overflow and zero image overlap. The villa's intentionally oversized internal artboard remains clipped by its own stage on tablet/mobile without causing page overflow.

Final anti-template audit: no new testimonial, FAQ, price tier, package selector, generic feature card, badge, icon row, stock avatar, gradient, glass panel, decorative object, urgency copy, or repeated CTA section was introduced. The only new composition is a ruled biography split supported by the existing editorial system and required by the supplied career story. The three service figures remain one varied editorial sequence, not selectable packages. UI libraries are used only as project infrastructure; no library theme or visible library component was added.

Decisions still without source remain deliberately absent: MasterChef country/season, restaurant names and count, operating geography and travel radius, prices, ingredient availability guarantees, exact timing promises, dietary claims, and contact channels beyond Instagram. The sourcing examples express initiative, not an absolute availability or time guarantee.

## Latest revision plan — sixty stills and a sharp film beneath the hero copy

The user directly asked on 2026-08-30 to keep the restored dominant-portrait composition, move its video beneath the hero text, remove the video blur, and expand the collage from about thirty to sixty photographs using the public [@evg.chef](https://www.instagram.com/evg.chef/) profile. The public profile is an explicitly supplied project source; no material from another chat, project, stock library, or unrelated account is used.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Fifteen focal photographs plus thirteen lower stills | Twenty-eight stills do not meet the explicit total of sixty | Keep all twenty-eight current stills and add thirty-two non-repeating local stills derived from the public profile: thirteen carousel photographs, seven other post covers, and twelve distinct frames from two public Reels linked by the profile | Exact dominant anchor, current focal hierarchy, dark documentary field, crop motion, and all later sections |
| Video as the fourteenth cell of the lower strip | Its position is not beneath the text and its scale is too small to read as the requested moving image | Remove it from the contact sheet and place the same muted autoplay loop immediately after the hero description, before the action | Exact MP4, poster, autoplay, loop, muted state, no native controls, and reduced-motion poster fallback |
| `blur(5.5px)` on the hero loop | The user explicitly asked for the video without blur | Render the moved film optically sharp with `filter: none` and a restrained square-edged frame/rule already supported by the project system | Still-photo sharpness, hero veil behind the content, and video object-fit behavior |
| Fourteen-cell, one-row lower sheet | It cannot hold the requested additional material without repetition or an arbitrary overflow | Use a forty-five-image contact field: thirteen existing film stills + thirty-two new Instagram-derived stills; desktop uses fifteen columns by three rows and mobile uses nine columns by five rows | The focal field remains a separate upper level and the mobile collage remains deliberately recomposed |

Templated elements found: none. The rework is content-led and uses the user-selected documentary source rather than adding a generic gallery, card grid, decorative particle field, or unrelated UI component. Components retained: site header, current hero copy, action, fact line, fifteen-image focal field, all sections after the hero, typography, palette, and both existing video files. Components reworked: lower media data, lower contact-field geometry, hero video markup, video treatment, timing, and mobile hero spacing. New component required: none. UI libraries remain infrastructure-only.

Implementation plan: save the thirty-two selected public-profile stills locally with normalized filenames and no hotlinking; verify the source list has no repeated file or repeated carousel cover; keep exactly sixty `<img>` elements in the hero; place one semantic, decorative muted video directly below the descriptive copy; adjust desktop and mobile composition separately; update rendered-source tests; then perform the full anti-template and seven-width visual verification.

Implementation result: `public/media/instagram/` now contains thirty-two normalized JPEGs (thirteen carousel photographs, seven clean post covers, and twelve distinct Reel frames) with a combined optimized size of 4.5 MB and no duplicate file hashes. `mosaicContactImages` combines those files with the thirteen existing film stills, producing a forty-five-image contact field beneath the unchanged fifteen-image focal field: exactly sixty hero photographs. The same `chef-environment.mp4` now follows `.hero-copy` in its own 9:16 square-edged frame; it remains muted, autoplaying, looping, control-free, and uses the existing poster, while its computed filter is `none`. The action and factual line follow it in normal document order.

Verification result: production build and both rendered-HTML tests pass. Browser verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirms sixty loaded hero images, forty-five contact cells, zero broken images, zero horizontal overflow, the largest focal area still belonging to the required anchor portrait, the video below the copy with `filter: none`, muted active playback at ready state 4, a minimum visible target of 44 px, and the heading fully inside every viewport. The lower field resolves to 15 × 3 at desktop widths and 9 × 5 from 768 px downward. The hero content remains inside the hero at all required sizes.

Final anti-template audit: no generic gallery widget, card system, slider, badge, stock image, unrelated account, glow, glass, gradient, decorative object, or UI-library theme was introduced. Density comes exclusively from the user's selected documentary source. The dominant portrait, subordinate contact field, sharp copy-bound loop, and distinct mobile map each have a traceable project reference and content role.

## Latest correction — dominant portrait with the video in the lower strip

The user's new positional clue identifies commit `a6380fe`, not `004b6ae`: one portrait is visibly larger than every other photograph, while the film stills and video occupy a separate lower contact sheet. This is the latest project version with that exact hierarchy.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Flat 16 × 12 field from `004b6ae` | It intersperses all film stills and the video throughout one grid, contradicting the user's memory of the video below | Restore the `a6380fe` two-level field: a 12-column focal grid above and a 14-column/2-row contact sheet across the lower part | Current formal hero copy, one inquiry action, factual line, Roboto Flex typography, veil, header, and all later sections |
| Large anchor mixed into the same full-height field as the lower film tiles | Its dominance is weakened by an undifferentiated single grid | Restore the anchor at `1 / 1 / 9 / 4`, making it the only photograph spanning eight focal rows | The exact sharp anchor asset and its `filter: none` treatment |
| Video positioned as a direct tile near the bottom center | It is low, but it is not structurally part of the distinct lower band the user described | Place the video as the fourteenth cell inside the lower contact sheet, after thirteen sequential film stills | Existing muted source, poster, 5.5 px video blur, autoplay/loop behavior, and reduced-motion fallback |

Templated elements found: none. The correction restores an existing project-specific editorial hierarchy. Components retained: all current content and sections, all media files, header, actions, playback logic, and typography. Components reworked: hero data split, contact-sheet wrapper, desktop focal areas, delay scopes, and mobile lower-strip rules. New components, libraries, and assets required: none.

Implementation result: the exact `a6380fe` hierarchy is restored. Fifteen focal photographs occupy the 12-column × 10-row hero field, with the sharp anchor alone spanning rows 1–8 and columns 1–3. A separate bottom contact sheet contains thirteen chronological film stills followed by the video as its fourteenth cell. The lower sheet spans 20% of the hero on desktop and uses 7 columns × 2 rows on mobile. The current copy, header, actions, facts, typography, veil, all later sections, and every media file remain unchanged.

Verification result: visual inspection at desktop and 375 px confirms the dominant left portrait and the distinct lower band. Structural checks confirm fifteen direct focal tiles, fourteen lower-sheet cells, the video nested in the lower sheet, a sharp anchor, blur only on the video, and zero broken images. At 1440, 1280, 1024, 768, 430, 390, and 375 px the anchor remains the largest focal tile, the heading remains inside the viewport, visible actions remain at least 44 px high, and no horizontal overflow occurs. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the hierarchy is project-owned and historically traceable. No generic card system, stock media, new decorative effect, library-default component, global blur, or invented content is introduced. The lower strip is a chronological media device rather than a generic gallery pattern.

## Superseded correction — exact last collage after still-photo blur removal

The user rejected the `a6380fe` focal-field/contact-sheet restoration because its photos and motion tile occupy different positions. Repository history identifies the requested source as commit `004b6ae`: the last flat 16 × 12 collage after optical blur was removed from every still photograph and retained only on the video tile.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Fifteen-photo focal field plus separate lower contact sheet | It is a later composition and moves the video and film stills away from their requested locations | Restore the single 16-column/12-row mosaic from `004b6ae`, including its exact 29 tile order and named grid areas | Current formal hero copy, single inquiry action, factual line, Roboto Flex typography, dark veil, and all sections after the hero |
| Contact-sheet wrapper around thirteen film stills and the video | The wrapper creates a separate band that did not exist in the requested version | Place all twenty-eight photographs and the video as direct children of one `.hero-mosaic` | Exact media sources, chronological film-still filenames, muted video, and sharp anchor portrait |
| Later 12-column focal placement and 7 × 2 mobile strip | It belongs to the wrong collage revision | Restore the exact desktop 16 × 12 areas and the approved 6 × 18 dense mobile flow from `004b6ae` | Separate desktop/mobile compositions, readable overlay, 44 px actions, and zero-overflow requirement |

Templated elements found: none. The rejected intermediate restoration was project-specific but not the requested historical state. Components retained: header, current text, action, fact line, all media files, story section, menu, contacts, footer, and playback logic. Components reworked: hero media array, wrapper markup, desktop tile areas, animation delays, and mobile mosaic rules. New components, libraries, and assets required: none.

Implementation result: the rejected focal-field/contact-sheet split is removed. The hero now uses the exact `004b6ae` flat composition: twenty-eight existing photographs and `chef-environment.mp4` are direct siblings in one 16 × 12 grid, with the original named desktop areas and all twenty-nine entrance delays restored. The current formal copy, one inquiry action, factual line, Roboto Flex hero type, story section, menu, contacts, and every media asset remain unchanged. Every still photograph is sharp; the anchor computes to `filter: none`, and only the video computes to `blur(5.5px) saturate(0.72) contrast(0.94)`.

Verification result: the corrected single-field hero was visually inspected at 1440 and 375 px and structurally checked at 1440, 1280, 1024, 768, 430, 390, and 375 px. Every required width renders twenty-nine direct mosaic tiles, zero contact-sheet wrappers, zero broken images, no horizontal overflow, a heading inside the viewport, and visible actions at least 44 px high. Desktop resolves to 16 columns × 12 rows; mobile resolves to the reference-driven 6 columns × 18 rows. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the correction introduces no generic card grid, stock image, generated collage asset, decorative blur, glass, glow, gradient, or library-default component. The only blur remains the user-requested motion treatment. Desktop and mobile retain distinct project-history-backed maps rather than stacking one composition mechanically.

## Superseded attempt — restore the later documentary hero collage

The user directly requested the previous / original dense collage with the chef, many stills, a video tile, and blur. The source of truth is the project's own previously approved hero at commit `a6380fe`; no material from another chat or project is used.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Light copy-and-three-image split | It removes the dense documentary impression the user now explicitly wants back | Restore the full-field two-level mosaic: fifteen independent photographs plus thirteen chronological film stills and one muted blurred video tile | Current formal Russian copy, single inquiry action, Roboto Flex hero typography, navigation destinations, media files, and all sections after the hero |
| Separate paper header and proof band | They belong to the rejected calm split and break the continuous collage field | Return the header, copy, actions, and factual format line to the established dark photographic field | Wordmark, three page anchors, Instagram inquiry action, keyboard focus, and 44 px target rule |
| Three sharp hero images | The selection is too sparse for the requested “много снимков” direction | Reuse the exact existing 29-item media composition without creating, duplicating, or altering any asset | The supplied sharp anchor portrait remains unblurred; only the motion tile is blurred |
| Desktop-derived image split on phones | The restored collage cannot be reduced to three stacked images | Restore the approved mobile focal map and 7 × 2 film contact sheet | Full-width hero, readable overlay copy, direct actions, and zero horizontal overflow |

Templated elements found in this revision: none. The calm split was reference-driven, but it is superseded by the user's direct request. Components retained: all later page sections, story film and kitchen media, menu gallery, contacts, footer, typography, and playback behavior. Components reworked: hero data, markup, header treatment, mosaic composition, and responsive hero rules. No new component, UI library, or media asset is required.

Implementation result: the calm three-image hero, separate paper header, and standalone proof band are removed. The re-approved project collage now renders fifteen focal photographs, thirteen chronological film stills, and the existing muted `chef-environment.mp4` tile. The required anchor portrait remains sharp with computed `filter: none`; only the motion tile keeps `blur(5.5px) saturate(0.72) contrast(0.94)`. Current formal hero copy, one inquiry action, the verified Bragin Culinary Academy fact, Roboto Flex typography, and every section after the hero are preserved.

Verification result: the restored hero was visually inspected at 1440 and 375 px and structurally checked at 1440, 1280, 1024, 768, 430, 390, and 375 px. Every checked width renders 15 focal tiles plus 14 contact-sheet cells, no broken image, a 44 px minimum visible target, no horizontal overflow, the self-hosted Roboto Flex hero, a sharp anchor portrait, and the requested blurred video. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: no new card grid, stock image, generated collage asset, glass surface, glow, gradient, decorative blur field, generic section, or library-default component is introduced. The only optical blur belongs to the user-requested video tile, and the dense media hierarchy comes from the project's own previously approved interface and real project assets. Desktop and mobile use different collage maps rather than a stacked desktop layout.

## Reference research — one real film becomes the client's space

The user confirmed on 2026-08-26 that the task is to find a modern, understandable reference before any further code change. The required meaning is specific: keep the existing real portrait film, communicate that the chef comes and cooks in the client's kitchen, and make media and concept read as one composition. The user explicitly rejected old private-chef layouts, two adjacent rectangles, a generated kitchen used as a false continuation, a video mounted into a wall, and an abstract proposal that cannot be understood from a static description.

The live-reference pass therefore moved outside the private-chef category and inspected contemporary cinematography, interior, architecture, and creative-studio sites:

| Live reference | Useful mechanism | Project adaptation | Deliberately rejected |
|---|---|---|---|
| [Erin G. Wesley](https://eringwesley.com/) and [case study](https://snp.agency/cases/erin-wesley) | Film thumbnails change aspect ratio inside one continuous cinematic gallery; the surrounding type and controls do not become separate cards | Let the same 9:16 chef film begin as a narrow portrait aperture and expand once into a larger cinematic field while preserving the source ratio in its final state | Multiple project films, WebGL gallery novelty, copied camera UI, duplicated footage presented as separate events, or a permanent carousel |
| [Studio Chenille](https://studiochenille.com/) and [case study](https://kaev.ai/work/studio-chenille) | Scroll creates the sensation of stepping from outside into a home through one continuous moving image | Use the film expansion as the moment of “arrival”: the chef moves from a typographic threshold into the client's evening without inserting a second room image | Luxury-house footage, another home's identifiable architecture, scroll hijacking across the full page, or a generated kitchen presented as evidence |
| [CA Film Creatives](https://www.charlesalexandertv.com/) | One film owns the viewport; a short statement and restrained film metadata frame the experience | Keep the chef footage dominant and use only the exact service phrase plus quiet factual labels outside the subtitle-safe area | Real-estate brand styling, fencing film, decorative timeline, dark cinematic grade, or full-screen copy covering the chef/subtitles |
| [L’Étude](https://letude.group/) | Portrait media crosses oversized type and changes scale inside an open editorial canvas | Let the portrait aperture intersect `ШЕФ У ВАС ДОМА` so the meaning is visible before motion begins; use the existing project type and paper/rust/forest palette | Red/blue identity, unrelated project mosaic, symbols, copied layout, or multiple competing films |

The strongest project-specific synthesis is not a copied site block. It combines three compatible principles: L’Étude supplies media integrated with type, Erin Wesley supplies variable aspect/aperture behavior, and Studio Chenille supplies the emotional logic of entering the home. CA Film Creatives supplies restraint. The proposed sequence is: (1) the section opens as one large phrase `ШЕФ У ВАС ДОМА`; (2) the real portrait film is already playing inside one tall aperture that interrupts the phrase; (3) on one short, non-hijacked entry transition, the aperture expands into the main film field; (4) only verified service facts remain alongside it. No kitchen photograph is required because the footage itself already contains the real working environment.

This is a reference shortlist, not implementation approval. No application code, media, or `DESIGN_SYSTEM.md` values change in this pass. If selected, the implementation must preserve the complete source film, subtitles, muted viewport playback, a static final state under `prefers-reduced-motion`, and a normal-flow portrait composition on mobile.

## Earlier proposal — the film becomes the live stroke in “У ВАС” (superseded by the reference shortlist above)

After reviewing the researched editorial and private-chef references, the user rejected the whole split-screen family as old-fashioned. The project-specific correction is therefore not another arrangement of video and kitchen imagery. It removes the second image entirely and turns the exact 9:16 film into the spatial action that communicates the service.

Initial state: oversized project typography reads `ШЕФ / У ВАС`; only a narrow live vertical slice of the film crosses the phrase like one moving stroke. On section entry the slice widens into the complete portrait film and shifts to the right. The vacated field reveals only already established service facts: `меню по запросу`, `готовит на месте`, `ведёт подачу`. The concept communicates “arrival” through one meaningful transformation instead of illustrating a client kitchen that the project cannot document.

This direction is grounded in the user's direct rejection, exact source video, existing extended-display typography, verified service journey, and the business goal “chef comes into the client's space.” It intentionally has no external layout reference and must remain documented as an original project-specific solution rather than a borrowed trend.

Implementation constraints if approved: no generated kitchen, no second photograph, no video-in-wall effect, no phone/Reel frame, no overlay across subtitles, no looping decoration, no scroll hijacking, and no invented facts. Desktop may use one viewport-entry expansion; mobile uses the complete portrait film in normal flow after the typographic opening. `prefers-reduced-motion` must render the final expanded state immediately. `DESIGN_SYSTEM.md` remains unchanged until approval; no interface code is changed in this proposal pass.

## Research plan — replace the false video/kitchen continuity

The user rejected the current `#film` result on 2026-08-26. The problem is conceptual rather than photographic: the unchanged 9:16 documentary film and the square generated kitchen touch with a zero seam, so the pair claims one continuous location even though the sources are unrelated. Matching oak, tile, stone, and light makes that implication stronger rather than more credible.

| Existing element | Why it looks wrong | Confirmed reference principle | Retained |
|---|---|---|---|
| Flush 9:16 film + square generated kitchen | Two independent sources read as a failed panorama and a false claim about where the film was shot | Chef On The House and Sous keep vertical film visibly independent and connect it to the in-home service through scenario and copy | Exact film, muted viewport playback, poster, captions, warm editorial palette |
| Generated kitchen used as proof of “у вас дома” | The room has no owner, factual location, or documentary authority | Gaggenau separates chef, host, and home; The Modern House treats the lived-in room as a real character with an identified story | The general insight that the client's kitchen is part of the service |
| No text or service transition in the section | The user has to infer the business meaning from two images alone | Food Fire + Knives and Down to Earth place film between the promise and the concrete service sequence | Restrained Russian editorial voice and no generic feature-card grid |
| Same desktop pair mechanically stacked on mobile | The false continuity remains and becomes a long unexplained sequence | Sous uses a purpose-built 9:16 mobile treatment; references keep film, statement, and room as separate reading beats | Film-first mobile priority and reduced-motion support |

Three project-specific candidate directions are now recorded before code changes:

1. **Editorial film + exact service statement (recommended now).** Keep the vertical film as the only principal media. Use adjacent paper, one sentence such as “Ваша кухня. Его ритм. Ваш вечер.”, and a thin factual sequence only after operational facts are confirmed. This is grounded in Chef On The House, Sous, Food Fire + Knives, and Down to Earth Cuisine.
2. **One film expanded into three documentary beats.** Pair the complete vertical film with real stills extracted from the same footage—preparation, fire, serving—rather than another kitchen image. This borrows the honest film/contact-sheet principle from cinematography portfolios and the “watch instead” content treatment of Wishbone Kitchen without copying their brand language.
3. **Real home as a separate editorial context.** After a future shoot, sequence film → short statement → genuine client kitchen/host/table imagery. This is grounded in Gaggenau, The Modern House, and FRAMA. It must not be implemented with the current generated room presented as documentary evidence.

No interface code is changed in this research pass. The generated kitchen remains a rejected current implementation until the user selects a replacement direction. `DESIGN_SYSTEM.md` is intentionally unchanged because the new block composition is not yet approved. No UI library is introduced.

Open blockers: verified wording for what the chef brings and leaves, permission to describe work in clients' homes, and real residential/host imagery for direction 3. Scroll reveal is optional only for a later approved direction; normal flow and `prefers-reduced-motion` must remain fully understandable.

## Revision plan — generate a kitchen from the exact first video frame

The user requested the first decoded video frame and then explicitly asked to use it to render a matching kitchen. The existing generated kitchen has required repeated positional cropping because its black niche and wide-room composition were designed for an earlier wall-mount concept. A new asset should be composed for the current independent right-hand block instead of continuing to repair the obsolete image with CSS.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| `chef-story-kitchen-background.jpg` | It was generated around a black architectural niche and conflicts with the now-confirmed independent-media concept | New near-square photorealistic kitchen generated from the exact first frame as material, lighting, and camera reference | Warm oak, cream tile, beige stone, ordinary domestic kitchen, no-person rule, and zero-seam pair |
| Crop ratio `960 / 941` removing 712 source pixels | It is a corrective workaround for the obsolete asset rather than a content-led composition | Generate the kitchen close to the final right-block ratio and use only minimal fit behavior | Current pair width, film source, desktop equal-height principle, and responsive stack |
| Existing photo's distinct architecture and light | It does not visually belong to the supplied frame closely enough | Match the first frame's cabinet-panel proportions, under-cabinet lighting, square backsplash, countertop height, and warm neutral balance | No claim that the generated view is the same factual room |

Components retained: markup, exact film/poster/track, no-copy section, section anchor, zero seam, playback, and later blocks. Components reworked: right image asset/source and fit rules. New component/UI library: none. Genuinely new asset: one project-bound generated kitchen JPEG.

Implementation result: built-in image generation produced `public/media/chef-story-kitchen-first-frame-match.jpg`, a 1254 × 1254 near-square JPEG optimized to 458 KB. The first video frame was used only as a reference for oak tone, raised-panel cabinetry, cream square tile, beige stone, under-cabinet lighting, and eye-level camera. The output contains no person, text, logo, black niche, screen, or reserved video opening. The page now references this new asset; the earlier photographic and illustrated kitchen files remain recoverable but are not rendered.

The equal-height desktop pair now uses columns `1 : 1.7778`: at the inspected 1384 px viewport the film renders at 464 × 824 px and the new square kitchen at 824 × 824 px, with a 0 px seam. The kitchen uses its complete square composition at every width without the former 712 px corrective crop.

Visual verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed the correct new source, square kitchen ratio, zero seam, zero horizontal overflow, zero broken images, and equal desktop heights. The video reached ready state 4, remained muted, and played while visible. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the new asset is tied directly to the exact film frame and current component geometry rather than a generic kitchen prompt. No generated person, showroom-gloss treatment, black niche, empty screen, copied food setup, card chrome, border, radius, shadow, glass, gradient, filler copy, or library-default UI is present.

## Revision plan — remove the exact black-niche fragment

The user supplied `Снимок экрана 2026-08-26 в 02.00.16.png` after requesting the kitchen and first video frame separately. The screenshot isolates the left portion to remove: window sliver, tiled pier, wooden cabinet frame, black niche, foreground plant, and foreground worktop. This is now a concrete crop reference rather than a general preference for right alignment.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Mild 45:32 right-anchored crop | It still leaves much of the black niche visible beside the video | Remove approximately the first 712 of 1672 source pixels, leaving a right-hand crop near 960 × 941 | Right edge, warm wall, backsplash, worktop, drawers, and zero seam |
| Desktop columns `1 : 2.5` | They correspond to the milder crop and no longer match the accepted remaining source region | Use `1 : 1.8137`, derived from the 9:16 film and remaining kitchen ratio | Equal desktop height and film-first composition |
| Full 16:9 kitchen on narrow screens | It reintroduces the exact rejected niche | Apply the approved right-anchored crop at every width | Stacked mobile order and smaller left-aligned film |

Components retained: markup, exact film, source kitchen, no-copy section, playback, zero-gap structure, and later page blocks. Components reworked: crop aspect, column ratio, and narrow-screen kitchen fit. New asset/component/library: none.

Implementation result: the kitchen viewport now uses `aspect-ratio: 960 / 941`, `object-fit: cover`, and `object-position: 100% 50%` at every width. This removes an estimated 712 source pixels exclusively from the left and 0 pixels from the right, matching the isolated black-niche screenshot. Desktop columns use `1 : 1.8137`; at the inspected 1384 px viewport the film renders at 458 × 814 px and the accepted kitchen region at 830 × 814 px with a 0 px seam and equal height.

Visual verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed the same 712 px source-side crop, right crop of 0 px, `object-position: 100% 50%`, zero seam, zero horizontal overflow, and no broken images at every width. The black niche and its wood frame no longer appear in the kitchen figure. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the crop is directly defined by the user's supplied rejection fragment. No generic centered crop, niche, duplicate frame, card chrome, border, radius, shadow, glass, gradient, filler copy, generated person, or library-default UI remains.

## Revision plan — preserve the right edge and crop only the kitchen's left

The user supplied `Снимок экрана 2026-08-26 в 01.20.27.png` and clarified the preferred trade-off: if the equal-height desktop pair cannot show the entire kitchen, the crop must sacrifice the left side rather than the right. This latest direction supersedes the prior strict no-crop instruction for desktop only.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Full 16:9 kitchen in a `1 : 3.1605` row | It avoids all crop but does not express the newly requested right-edge priority | A milder 45:32 viewport that removes only a limited portion of the left side | Smaller film, wide kitchen role, equal desktop height, and zero seam |
| Centered `object-position` | Any future crop would remove both sides and can hide the right-hand cabinetry | `object-position: 100% 50%` with `object-fit: cover` | Exact photographic asset and natural vertical framing |
| Full-frame behavior on mobile | The complaint concerns the wide side-by-side composition; cropping a stacked kitchen would add no benefit | Keep the complete centered 16:9 kitchen below 900 px | Natural mobile aspect ratios and film-first order |

Components retained: markup, exact film, kitchen source, no-copy block, wider container, playback, responsive stacking, and later sections. Components reworked: desktop column ratio and kitchen crop alignment only. New asset/component/library: none.

Implementation result: desktop columns now use `1 : 2.5`. The kitchen viewport is 45:32 with `object-fit: cover` and `object-position: 100% 50%`; at the inspected 1384 px viewport the film renders at 368 × 654 px and the kitchen at 920 × 654 px. The scaled kitchen exceeds its viewport by approximately 242 rendered pixels, all removed from the left; the calculated right crop is 0 px. The film and kitchen remain joined at a 0 px seam. At 900 px and below, the complete 16:9 kitchen remains centered with `object-fit: contain`.

Visual verification at 1440, 1280, and 1024 px confirmed `object-position: 100% 50%`, equal media height, zero seam, zero horizontal overflow, and preservation of the right-hand cabinet edge. At 768, 430, 390, and 375 px the source returns to its complete 16:9 ratio with no crop and a 0 px vertical join. No image fails; lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the crop now follows a specific content priority supplied by the user rather than a centered default. The right architecture is preserved, the film remains subordinate in width, and no card chrome, border, radius, shadow, glass, gradient, decorative copy, generated person, or library-default UI is introduced.

## Revision plan — show the complete kitchen and reduce the film

The latest screenshot identifies two problems in the flush photographic pair: the 16:9 kitchen was forced into a 4:5 viewport and visibly cropped, while the prior column ratio made the film too large and left the overall composition feeling uneven. The user explicitly prefers smaller media over losing any part of the kitchen.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Kitchen photograph forced to `aspect-ratio: 4 / 5` with `object-fit: cover` | It removes most of the original horizontal room and directly contradicts “кухня не должна быть обрезана” | Restore the source's complete 16:9 frame with `object-fit: contain` | Exact prior kitchen asset, no-person staging, and zero-pixel seam |
| Column ratio `1 : 1.4222` | It is correct only for a 4:5 right image and therefore requires cropping | Use `1 : 3.1605`, derived from 9:16 and 16:9 widths at the same height | Equal desktop height and immediate video-to-kitchen join |
| 1240 px maximum pair width | It leaves more outer paper than necessary in the supplied wide screenshot | Allow the visual pair to use up to 1440 px while retaining 48 px viewport gutters | Centered frame, no horizontal overflow, and section-only composition |
| Mobile 9:16 crop applied to the kitchen | It preserves equal height by discarding the room | Stack natural-aspect media; make the film narrower and left-aligned, then show the full-width kitchen | Film-first order and zero artificial decoration |

Components retained: exact film, earlier photographic kitchen, no-copy markup, section anchor, playback, and later page blocks. Components reworked: pair width, desktop column ratio, kitchen fit behavior, and narrow-screen dimensions. New asset/component/library: none.

Implementation result: the pair now uses up to 1440 px with equal 48 px outer gutters at ordinary desktop widths. Above 900 px its columns use `1 : 3.1605`: at the inspected 1384 px viewport the film renders at 310 × 550 px and the complete kitchen at 978 × 550 px, joined at a 0 px seam. The kitchen uses its full 16:9 source frame with `object-fit: contain` and centered positioning; no architecture is removed. At 900 px and below, the smaller left-aligned film precedes a full-width natural-ratio kitchen, also with a 0 px row gap.

Visual verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed that the kitchen's rendered ratio remains 1.7778 against its natural 1.7768 ratio, `object-fit` remains `contain`, and no crop occurs. Desktop outer gutters are symmetrical, the seam is 0 px, equal desktop height is retained, horizontal overflow is 0, and no image fails. The video reached ready state 4, remained muted, and played while visible. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the kitchen is no longer treated as a generic portrait card or decorative crop. Its full room geometry determines the right column, while the film receives the smaller documentary role requested by the user. No filler copy, card chrome, border, radius, shadow, glass, gradient, crop mask, generated person, or library-default UI is present.

## Revision plan — restore the photographic kitchen with a flush join

The user explicitly rejected the hand-drawn kitchen and requested the immediately preceding photographic kitchen. The two media must touch directly: the kitchen begins at the exact right edge of the video with no pixel of paper, border, caption, or grid gap between them.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| `chef-story-kitchen-illustration.jpg` at right | The user now explicitly rejects the drawn treatment | Reuse `chef-story-kitchen-background.jpg`, cropped toward its real cabinetry and backsplash | People-free warm kitchen palette and the current two-object section |
| 48/30/28 px grid gaps | Even a restrained gutter contradicts “не через пиксель” | Set desktop, tablet, and mobile grid gaps to exactly 0 | Equal-height logic, page gutters, and direct section start |
| Illustration-specific class and alt text | They no longer describe the rendered asset | Rename to a photographic-kitchen figure and provide accurate non-venue alt text | Semantic media grouping and accessible image description |

Components retained: `ChefStoryVideo`, exact film behavior, current section anchor, equal-height grid, earlier kitchen-photo asset, and all later sections. Components reworked: the right image source/class/alt and zero-gap responsive CSS. New asset, component, or UI library: none.

Implementation result: `chef-story-kitchen-illustration.jpg` is removed from the rendered markup and the right figure now uses `chef-story-kitchen-background.jpg`. The photographic crop is biased to 78% horizontally so the warm wall, backsplash, worktop, and lower cabinetry remain visible while the obsolete black niche stays out of frame. Desktop/tablet columns and mobile rows all use `gap: 0`; no border is drawn at the shared edge. The equal-height behavior and content-free section are retained.

Visual verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed a computed 0 px seam and 0 px height difference at every width, zero horizontal overflow, zero broken images, and the correct photographic source. The video reached ready state 4, remained muted, and played while visible across all widths. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the rejected illustration no longer renders. The section contains only the exact film and one user-selected prior kitchen asset, joined without cards, captions, copy, padding between media, border, radius, shadow, glass treatment, decorative gradient, or generated person. Mobile preserves the same zero-gap relationship as a deliberate vertical sequence.

## Revision plan — equal-height visual pair with no surrounding copy

The user supplied `Снимок экрана 2026-08-26 в 01.05.30.png` and identified the remaining geometry error: because the pair used `align-items: center`, the naturally shorter film began below the illustration and ended above it. The title, biography, and two caption systems also contradict the explicit request for “только видео и кухня”.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Story title before the visual pair | It prevents the film from beginning at the start of the block | Remove it from this section | Section anchor and page order |
| Center-aligned 380 px film beside a flexible 4:5 illustration | Their top and bottom edges cannot coincide | Use proportional columns `1 : 1.4222`; the natural 9:16 and 4:5 media ratios then produce the same height | Exact film, exact illustration, independent figures, and real gap |
| Two different external figcaptions | They add mismatched length below otherwise comparable media | Remove both captions; retain the embedded Russian subtitle track inside the film | Video accessibility track and playback behavior |
| Biography strip below the pair | The latest instruction limits the block to the two media objects | Remove it from this section | No replacement or filler content |

Components retained: `ChefStoryVideo`, the exact MP4/poster/track, kitchen illustration asset, section anchor, and all later page blocks. Components reworked: chef-story markup and responsive grid only. New component and UI library: none.

Implementation result: the section now begins immediately with `story-visual-pair`. The heading, biography strip, portfolio link, and both external figcaptions are removed. At widths above 700 px the columns use the natural-ratio proportion `1 : 1.4222`, so the unchanged 9:16 film and uncropped 4:5 illustration have identical rendered heights; both align to the same start row. At phone widths the two objects stack with the same width and 9:16 rendered height, with the illustration cropped centrally rather than distorted.

Visual verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed a 0 px height difference at every width, a 0 px top and bottom difference in every two-column layout, zero horizontal overflow, zero broken images, and no residual story heading or biography markup. The video reached ready state 4, remained muted, and played while visible at all widths. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the block contains exactly the two user-requested media objects and no filler copy, card chrome, duplicated captions, rounded surfaces, shared background, visual mounting, shadow, glass, gradient, generated person, or library-default UI. Equal height is produced by source aspect ratios rather than stretching either desktop asset; mobile uses a deliberate crop for parity.

## Revision plan — separate film and illustrated kitchen

The user directly rejected the current composite treatment: although the generated background is visibly a kitchen, seating the portrait film inside its dark niche still makes the video appear mounted into the wall. The correction requires two clearly independent objects instead of one simulated environment.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Full-width kitchen photograph used as the story background | The photograph establishes one continuous room, so the film inevitably reads as a screen or opening inside that room | Remove the background from the visible section and use a new self-contained editorial illustration as the right-hand object | Warm wood, cream, rust, forest, and ink palette already approved for the project |
| Portrait film aligned to the photograph's dark architectural niche | This is precisely the wall-mounted effect the user has rejected | Present the unchanged 9:16 film as a plain independent figure on the left, with its own factual caption below | Exact MP4, poster, caption track, playback behavior, crop, and semantic figure |
| Story title placed over the photographic wall | It makes the title dependent on the background crop and weakens the separation of the two objects | Return the label and title to the warm paper surface above the media pair | Existing formal Russian copy, Oranienbaum hierarchy, copper emphasis, and restrained heading motion |
| Existing photographic kitchen asset | It no longer supports the requested composition | Keep it as a superseded project asset but remove it from rendered CSS; generate one person-free illustrated kitchen for the new right-hand figure | No deletion or alteration of previous project assets |

Components retained: `ChefStoryVideo`, all exact film behavior and text, section semantics, `story-details`, and every later page block. Components reworked: story markup and responsive layout. Genuinely new component: one non-interactive illustrated-kitchen figure. UI libraries: none.

Implementation result: `story-kitchen-stage` is removed from the page. The section title now sits independently on warm paper; `story-visual-pair` places the exact film at left and `chef-story-kitchen-illustration.jpg` at right with a real grid gap and no shared background. The illustration is a 1122 × 1402 JPEG generated in a hand-painted gouache-and-ink architectural style with no person, text, logo, screen, or niche. Biography paragraphs and the Instagram link remain in their own ruled strip below. The previous kitchen photograph remains a recoverable superseded asset but is no longer referenced by the rendered story composition.

Decision without a separate external visual reference: the illustration's exact drawing treatment is derived from the user's request for a “нарисованная кухня,” the established warm material palette, and the project's editorial ink/rule language. It is not promoted to a site-wide illustration system.

Visual verification:

| Width | Result |
|---:|---|
| 1440 | Independent 380 px portrait film and larger 4:5 illustration read as two objects; title remains above and biography below |
| 1280 | Two-object hierarchy and clear physical gap remain intact |
| 1024 | Film and illustration stay balanced without crop loss or overflow |
| 768 | Compact two-column version remains separate and readable |
| 430 | Deliberate order is title → film → illustration → biography; media never overlap |
| 390 | Both full-width mobile objects and captions remain contained |
| 375 | Narrowest layout preserves the same order, gap, readable heading wrap, and full illustration |

Automated browser measurements at all seven widths confirmed zero horizontal overflow, zero broken or unlabelled images, complete story/pair/details bounds, a 44 px minimum target, no framework error overlay, and a real gap between the two media objects. The exact video reached ready state 4, played while visible, and remained muted at every width. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the rejected simulated screen/wall composition is gone. The section uses one documentary object and one explicitly illustrative object with different roles and captions, not repeated cards. No shared kitchen background, overlap, rounded card system, shadow, glass treatment, decorative gradient, generated person, stock marketing copy, chapter UI, or library-default component remains. Mobile behavior is a designed sequence rather than a compressed desktop row.

## Revision plan — expose the complete kitchen photograph

The user supplied `Снимок экрана 2026-08-26 в 00.20.58.png` and correctly identified that the 92% paper plane hides almost the complete right half of the generated kitchen. The remaining visible wood around the film does not communicate the intended full room, so the generated asset is not doing meaningful visual work.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Full-height 92% paper plane from 48% of the section width | It hides the blank wall, backsplash, counter, lower cabinets, and spatial relationship that make the image recognizably a kitchen | Remove the plane completely and expose the photograph across the full upper stage | Generated background asset, its crop, warm palette, and the film/niche alignment |
| Complete biography over the photograph | Two paragraphs and a link require a large readability surface, which defeats the reason for using the kitchen image | Keep only the compact section label and title on the naturally empty wall; move paragraphs and portfolio link to a dedicated paper strip below | Exact Russian copy, semantic heading, link destination, heading animation, and page order |
| Desktop overlay structure carried into mobile | Even when the paper plane becomes solid, the title and detailed copy still compete with the long film stage | On mobile, end the photograph with the film and place both title and biography on paper below | Exact film, caption, accessible reading order, and deliberately tall portrait presentation |

Components retained: `ChefStoryVideo`, generated kitchen asset, exact film behavior, all text, section semantics, and every later page block. Components reworked: story markup splits the photographic stage from the biography strip; CSS removes the full-height cover and supplies separate desktop/mobile compositions. New interactive component: none. UI libraries: none.

Decision without a separate visual reference: the biography strip uses a three-part desktop reading grid because the real content contains exactly two paragraphs and one portfolio action. It becomes one column on mobile rather than repeating a generic card composition.

Implementation result: the full-height paper cover is removed. `story-kitchen-stage` now displays the complete kitchen photograph across 100% of the viewport width, with the exact film in the left niche and only the `01 / о шефе` label plus title on the naturally empty upper-right wall. Both biography paragraphs and the Instagram link move into a separate warm-paper `story-details` strip immediately below the photograph. On phones the image still ends with the film, then the title and details continue on paper without overlaying a busy crop.

Visual verification:

| Width | Result |
|---:|---|
| 1440 | Full backsplash, worktop, lower cabinets, wall, and right edge of the room remain visible; no paper cover obscures the kitchen |
| 1280 | Film/niche alignment and compact wall title remain intact; biography strip starts below the image |
| 1024 | Heading occupies only the upper wall while the kitchen surfaces remain readable across the stage |
| 768 | Two-column stage remains balanced and the lower paper strip keeps both paragraphs readable |
| 430 | Wood-framed film fills the photographic part; title begins on paper below rather than covering the kitchen |
| 390 | Film, title, paragraphs, and link remain centered with no horizontal overflow |
| 375 | Narrowest heading wrap and full story sequence remain contained |

Automated browser measurements at all required widths confirmed `scrollWidth === innerWidth`, zero broken images, the kitchen background applied to the full stage, complete film/intro/details bounds, a 44 px minimum target, and no console errors. The video reached ready state 4, played while visible, and remained muted at every width.

Final anti-template audit: the photograph now performs a clear environmental role instead of acting as a mostly hidden texture. The stage and biography use distinct compositions tied to their content; no half-screen veil, rounded card, glass, blur, shadow, decorative gradient, generic three-card grid, duplicated chef, generated person, new control, or placeholder copy remains. Mobile behavior is purpose-built and does not overlay the desktop title/copy arrangement on the photo.

## Revision plan — replace the abstract kitchen with a photographic niche

The user directly rejected the abstract CSS-panel environment and proposed using a kitchen photograph in which the video can stand naturally. Existing project candidates were inspected before implementation: `chef-kitchen.jpg`, `gallery-workspace.jpg`, `chef-studio.jpg`, `gallery-venue.jpg`, `gallery-cooking.jpg`, `chef-bakery.jpg`, `chef-stage.jpg`, the environment poster, and all thirteen film stills. The available kitchen photographs are portrait selfies, tight process crops, or contain no open architectural area suitable for a vertical film; stretching them behind the section would duplicate the chef or create an arbitrary crop.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Abstract wall, cabinet, countertop, and tile bands built in CSS | The user reports that the result does not look convincing; the flat seams still read as designed scenery | One photorealistic 16:9 kitchen background with a purpose-composed dark left niche and calm right wall | Warm material palette sampled from the source film and full-width environmental intent |
| Video merely overlaps color-matched bands | Color matching alone does not create a believable physical placement | Align the exact 9:16 video inside the background's dark architectural niche | MP4, poster, caption track, mute, autoplay, loop, viewport pause, and reduced-motion behavior |
| Biography directly on the abstract wall | The former wall was uniformly readable, while a photograph introduces texture and contrast variation | Use a flat translucent paper plane over the photograph on desktop/tablet and solid paper below the photographic film stage on mobile | Exact biography, title, section label, link, heading motion, and document order |

New implementation asset: `public/media/chef-story-kitchen-background.jpg`, generated with the built-in image-generation workflow from the supplied poster as a palette/material reference only. The generated output contains no people, text, logo, or copied chef identity. It is not a new design reference or factual venue photograph; authority comes from the user's direct request and exact source film.

Components retained: `ChefStoryVideo`, story markup, copy, all behavior, and later sections. Components reworked: only story background/crop, film alignment, biography plane, and responsive CSS. New interactive component required: none. UI library usage: none; Tailwind remains build infrastructure only.

Decision without a separate external reference: exact background positioning is adapted to the generated niche at each breakpoint. The mobile photograph intentionally ends before the biography rather than stacking the desktop photo-and-text overlay unchanged.

Implementation result: the abstract CSS wall/cabinet/tile scenery is superseded by `chef-story-kitchen-background.jpg`, a 1672 × 941 JPEG optimized to 295 KB. At 1440 and 1280 px the unchanged film sits within the photograph's left charcoal niche with visible wood framing; the biography remains readable over one flat 92% paper plane aligned to the right half. At 1024 and 768 px the background position shifts to keep the niche behind the smaller film. At 430, 390, and 375 px the photograph is cropped specifically around the film and ends when the biography begins; the copy then uses the solid approved paper background.

Visual verification:

| Width | Result |
|---:|---|
| 1440 | Film visually seated inside the dark niche; wood frame, continuous worktop, and right biography plane inspected |
| 1280 | Same physical relationship retained with a 370 px film and no clipping |
| 1024 | Background crop shifted to keep the 340 px film inside the niche; biography remains inside the paper plane |
| 768 | Compact two-column composition visually inspected; kitchen photo ends cleanly with the section |
| 430 | Mobile photo crop frames the 366 px film in wood; copy starts on solid paper immediately below |
| 390 | 326 px film and full-width copy remain centered and contained |
| 375 | Narrowest film frame, caption, heading wrap, and biography bounds checked without overflow |

Automated browser measurements at all seven required widths confirmed `scrollWidth === innerWidth`, zero broken images, the kitchen background applied, complete story/film/copy bounds, and a 44 px minimum interactive target. The video reached ready state 4, played while visible, and remained muted at every width. Lint, production build, rendered-HTML tests, and `git diff --check` pass.

Final anti-template audit: the block now depends on the exact film format and a purpose-composed photographic niche rather than a generic image/text card or invented CSS room. The generated background has no person, logo, text, fake dish, or claimed location. There is no rounded frame, glass, blur, shadow, decorative gradient, chapter interface, new CTA, or copied restaurant composition. Mobile behavior is independently composed instead of stacking the desktop overlay over a busy photograph.

## Revision plan — film becomes a kitchen environment

The user asked for the chef-story film to feel like a kitchen in which the chef stands, using colors already present in the footage. The current section was inspected at 1280 px: the film is visually isolated by an offset hairline frame and surrounded by the same neutral paper as the rest of the page. The source poster was sampled before implementation; its usable recurring tones are dusty wall `#C1A99A`, wood `#9D7053`, stone `#897066`, and deep umber `#33292D`.

| Existing element | Why it looks templated or needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Portrait film inside an offset rectangular outline | The frame makes the real kitchen footage read like a poster card placed on a generic editorial background | Use the film itself as the primary environmental reference and let its wall, wood, tile, and worktop tones continue across a full-width section | Exact MP4, poster, caption track, 9:16 ratio, crop, loop, muted viewport playback, and figcaption |
| Neutral 1260 px two-column paper spread | It is competent but interchangeable; the background does not participate in the film's sense of place | A full-width kitchen-toned stage with an internal 12-column reading grid and flat material zones derived from the footage | Two-part film/biography hierarchy, text content, section label, title animation, portfolio link, and order before the menu |
| Generic editorial rule beside the label | On an environmental field the accent gradient introduces a separate visual language | A single umber/stone structural seam that belongs to the abstract kitchen field | Section number, label, restrained motion, and accessible static fallback |
| Potential literal kitchen reconstruction | A copied or invented room would become decorative scenography and could imply a real venue that is not verified | Use only abstract bands, panel seams, and tile-scale lines sampled from the visible footage; no new image asset or illustration | Real footage as the only documentary evidence |

References used: the exact user-supplied film and poster are primary. [Da Pietro 1955](https://www.awwwards.com/inspiration/restaurant-cocktail-bar-da-pietro-1955) supports one immersive hospitality field; [Chef's Space](https://www.behance.net/gallery/201551729/Landing-of-Premium-Italian-Restaurant) supports combining chef imagery and biography inside one staged tonal scene; [Wade and Leta](https://bestawards.co.nz/digital/small-scale-websites/sons-co/wade-and-leta/) supports extending sampled photographic colors into adjacent flat planes. No reference imagery, brand, copy, or exact geometry will be copied.

Components retained: `ChefStoryVideo`, all film behavior, story copy, semantic heading, external portfolio link, page sequence, fonts, and all other sections. Components reworked: `.chef-story`, `.story-film`, `.story-copy`, section-label rule, and their responsive rules. New component required: none. UI libraries used as primitives: none; Tailwind remains build infrastructure only.

Decision without an external reference: the exact seam spacing is an implementation adaptation to the source frame and responsive grid. It will remain restrained, non-photorealistic, and recorded here rather than presented as a copied room.

Implementation result: the neutral 1260 px paper spread and offset poster outline are replaced by a full-width environment built entirely in CSS. The film remains an untouched 9:16 source and overlaps three flat material zones derived from its own poster: dusty wall, warm wood, and pale tile separated by a dark worktop seam. The biography occupies the uninterrupted wall plane, so it remains highly readable rather than sitting on a card. On phones the film leads inside the material field and the biography follows on the same wall color. No new image, illustration, copy, control, animation library, or playback behavior was introduced.

Visual verification:

| Width | Result |
|---:|---|
| 1440 | Full kitchen field, film/biography hierarchy, structural seams, and title wrapping visually inspected; no overflow |
| 1280 | Immersive two-part scene retained; video ready state 4 and active muted playback confirmed |
| 1024 | Reduced film width and reading column remain balanced; all content stays inside the viewport |
| 768 | Compact two-column kitchen scene visually inspected; text remains on the pale wall field rather than crossing the darker cabinet zone |
| 430 | Purpose-built mobile composition visually inspected: material field → portrait film → biography; no clipping or overflow |
| 390 | Film width 326 px and copy width 350 px remain centered; no broken image or horizontal scroll |
| 375 | Narrowest material field, film caption, heading wrap, and biography bounds checked; no horizontal scroll |

Automated browser measurements at 1440, 1280, 1024, 768, 430, 390, and 375 px confirmed `scrollWidth === innerWidth`, zero broken images, a 44 px minimum interactive target, and complete story/film/copy bounds inside every viewport. The film reached ready state 4, played while substantially visible, and remained muted at every width. Contrast checks are 4.68:1 for story body copy on the sampled wall, 6.29:1 for headings, and 11.58:1 for the film caption on umber.

Final anti-template audit: the story is no longer an interchangeable image-and-copy spread or framed card. Its structure is tied to the exact supplied footage and does not copy any researched site. No generic card, gradient glow, glass treatment, shadow, invented kitchen photograph, photorealistic CSS illustration, duplicated video, chapter UI, decorative object, placeholder text, or library-default component is present. The seams vary from the menu geometry and serve the specific environmental concept rather than becoming a repeated site-wide pattern.

## Revision plan — calm hero and bespoke-menu image hierarchy

The user directly selected [Take a Chef](https://www.takeachef.com/en-us) for its uncluttered first screen and supplied `Снимок экрана 2026-08-25 в 20.52.27.png` for the menu section. The reference was inspected in the browser at 1280 × 720 and 390 × 844. The current project implementation was audited before code changes.

| Existing element | Why it looks templated or needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Dark full-screen 29-media hero wall | Twenty-nine simultaneous media, a veil, large display type, paragraph, two CTA controls, and three repeated factual phrases compete for one first-screen hierarchy; the overall arrangement remains too close to the earlier Marrow baseline | Take a Chef's principle of separated copy and imagery: light paper field, compact left copy, one action, and a right-hand three-image composition with no overlap | Exact promise, Roboto Flex hero role, project palette, mandated portrait, page anchors, and verified Instagram action |
| Two hero actions plus three near-synonymous service notes | The secondary film action is already available through navigation and scroll; the three notes repeat ideas explained immediately below | One primary `обсудить ужин` action and one separate ruled fact band containing only the verified Bragin Culinary Academy context | Instagram destination, visible 44 px target, formal Russian tone, and keyboard focus |
| Header over a cinematic collage | It requires a gradient veil to remain legible and visually binds navigation to the most complex part of the page | Separate paper-raised header with dark navigation and a forest action | Existing wordmark, three internal destinations, and no unnecessary mobile menu |
| One full-bleed three-image strip in the menu section | The three equal uncaptioned images act as a generic gallery and do not show how menu photography relates to the evening | The supplied 20:52 reference's two-level hierarchy, translated into three named narrative stages plus an asymmetric ingredient/process/result field | Existing conversation-led copy, numbered prompts, six already approved project images, and direct transition to contact |
| Take a Chef's carousel cards and lower collage | Direct copying would introduce fixed-menu semantics, repeated rounded cards, yellow marketplace branding, and controls without enough unique menu items | Square-edged editorial stages `встреча`, `подача`, `финал`; no carousel, links, catalogue, prices, or invented dishes; lower rust-backed field uses different project geometry | Principle of a clear primary image row followed by a secondary looser field |

Components retained: the one-page architecture, `ChefStoryVideo`, story section, conversation-led menu explanation, contact close, footer, fonts, palette, and all source media files. Components reworked: `Home` hero markup, header/hero styles, menu image markup, and responsive rules. New interactive component required: none. Tailwind remains build infrastructure only; no stock UI component or theme is used.

Decisions without references: no new visual style is invented. The exact image choices and crops are project adaptations governed by the approved photography system and current assets. Loading, empty, error, and form states remain out of scope because this change introduces no data-backed interaction or form.

Implementation result: the 29-media dark Hero, veil, contact sheet, loop, second CTA, three repeated notes, overlay header, and related visible mosaic markup are removed. The replacement uses a paper-raised header, one concise promise and CTA, three sharp project images led by the mandated portrait, and one ruled verified-experience band. The menu retains its conversation-led explanation and adds a captioned three-stage sequence followed by a staggered rust-backed field. All nine visible Hero/menu images come from existing project media; no third-party image, image file edit, carousel dependency, or new menu product is introduced.

Visual verification:

| Width | Result |
|---:|---|
| 1440 | Calm split Hero and full menu atlas visually inspected; no overflow, broken image, clipped heading, or missing stage |
| 1280 | Desktop split, fact band, and three-stage menu inspected; all images loaded and minimum target was 44 px |
| 1024 | Compact desktop split retained readable copy and deliberate image crops; no overflow |
| 768 | Hero deliberately changed to copy → fact → images; menu became one-column explanation plus three readable stages. A 14 px atlas overflow found during QA was corrected |
| 430 | Mobile copy, CTA, proof, images, stages, and atlas visually inspected; no clipping or overflow |
| 390 | Long extended-grotesk word initially clipped; a dedicated ≤400 px type rule corrected it. Hero and complete mobile menu composition were rechecked |
| 375 | Narrowest Hero was visually inspected after the fix; heading, CTA, proof, and image field remain inside the viewport |

Automated browser measurements at every required width confirmed zero horizontal overflow, zero elements outside the viewport, zero broken images, three menu stages, a fully contained menu atlas, and a 44 px minimum interactive target. Keyboard focus resolves to a 2 px rust outline with a 5 px offset. The primary action changes from forest `rgb(21, 63, 55)` to `rgb(15, 51, 45)` on hover. The unchanged story film reached ready state 4, played while visible, remained muted, and produced no console errors.

Final anti-template audit: the first screen no longer resembles the earlier Marrow photo wall and does not copy Take a Chef's marketplace header, yellow pill, review count, rounded collage, or exact geometry. The menu has three repeated narrative stages only because the supplied reference and real dinner sequence justify them; they are open editorial figures rather than stock cards, packages, or a carousel. The lower field uses a different staggered geometry, flat project rust, and real project process imagery. No glass, glow, gradient decoration, stock UI theme, arbitrary animation, fixed-menu copy, placeholder content, pricing, testimonials, or unsupported facts were added.

Remaining risks: the mandated portrait source is intentionally washed and only receives a restrained CSS tonal balance; several other photographs are social-media resolution. Service geography, guest capacity, price range, operational inclusions, and contact methods beyond Instagram remain unverified and therefore are not added.

The repository had no application before the Sites foundation was initialized on 2026-08-24. Its temporary generic loading skeleton was audited and fully replaced with the approved reference-driven slice.

| Audit question | Result |
|---|---|
| Existing template-like elements | Starter `SkeletonPreview`, generic metadata, default Geist/Arial typography, default light/dark colors, and starter Tailwind theme |
| Why they are template-like | They are infrastructure defaults with no relationship to the Marrow reference, Evgen Grybenyk's work, or the supplied media |
| Elements requiring redesign | The entire visible starter surface; completed |
| Components safe to retain | Sites/Vinext build infrastructure only; no visible starter component |
| Required new components | Quiet project header, reference-driven hero mosaic, dedicated chef video/about feature with viewport playback controller, bespoke-menu sequence, and contact close |
| Existing design system | Current project tokens, typography, layout tiers, responsive compositions, states, and motion rules are recorded in `docs/DESIGN_SYSTEM.md` |
| Existing references | [Marrow Private Chefs](https://marrowprivatechefs.com/), user-supplied [@evg.chef](https://www.instagram.com/evg.chef/) profile, and the two supplied videos |
| UI libraries | Tailwind is present only as build infrastructure; no stock components, theme, or demo composition remain |
| Placeholder or generic marketing copy | None |
| Desktop/mobile visual verification | Completed at 1440, 1280, 1024, 768, 430, 390, and 375 px |

## Implementation decision

The 19:45 reference revision changes two specific surfaces without changing the page architecture or media system. The hero moves from a classical serif promise to a bold extended-grotesk composition, while the chef-story heading receives one project-specific typographic landing animation. The rejected plate-and-dish motion mark is removed completely after the user's direct 20:12 correction. The third supplied falling/radial reference remains a documented next-step concept rather than an unapproved site-wide effect.

## Revision plan — extended hero type and chef-story landing motion

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Oranienbaum / Onest hero headline | The user explicitly selected the bold extended sans typography in the 19:45:39 screenshot and later confirmed that normal-width Onest did not reproduce it | Use self-hosted OFL Roboto Flex in uppercase at its maximum width axis with tight leading; retain Onest for body/UI and Oranienbaum for later headings | Exact hero copy, collage, veil, actions, factual line, media, and mobile hierarchy |
| Generic whole-block reveal on the chef biography | It does not reproduce the object-landing rhythm the user selected in the 19:45:29 screenshot | Split the real heading into semantic line/word spans and let each word settle vertically as the section enters | Reading order, heading text, paragraphs, film, and accessible static fallback |
| Rejected circular dish cutout and CSS plate | The user's 20:12 screenshot shows that the literal object adaptation reads as a cheap sticker and conflicts with the site's restrained editorial language | Remove the object, plate, steam, image crop, and their animation entirely; let the heading words provide the landing rhythm, completed by one thin structural rule from the approved design system | Warm paper field, heading text, word order, rust/ink palette, and scroll-linked motion with reduced-motion fallback |
| Full-site falling/radial animation from the 19:47:16 screenshot | The user likes the motion but has not selected the substitute object or exact placement | Document a proposed sequence of falling menu-note words—`повод`, `гости`, `вкус`, `ритм`—that settle into the bespoke-menu section; do not implement until approved | Current menu structure and content remain unchanged |

Templated elements found in this revision: the chef-story's shared whole-block reveal is functional but generic and is replaced only where the new reference supplies a stronger content-specific motion. Components retained: the complete one-page architecture, all media, the viewport playback controller, menu, contacts, footer, and the existing font files. Components reworked: hero headline styling and chef-story heading markup/motion. No decorative media markup, UI library, or animation library is introduced.

Implementation result: the hero promise uses OFL Roboto Flex in uppercase at width 151, weight 720, and optical size 96; no Helios font file or commercial reference asset is copied. In the chef-story spread, the unchanged heading words settle individually as the section enters and a thin warm rule draws beside the section label. The rejected dish cutout, plate drawing, steam strokes, image crop, and related animation are absent. Reading order remains unchanged, the heading is immediately legible when view timelines are unavailable, and motion is disabled by the existing reduced-motion fallback. The supplied collage, both videos, their files, copy, and all later sections remain unchanged.

Verification result: the expanded hero and chapter-free story were visually checked at 1440 and 390 px and structurally checked at 1440, 1280, 1024, 768, 430, 390, and 375 px. The hero resolves to self-hosted `Roboto Flex` with computed width 151%, variation settings `opsz 96 / wdth 151 / wght 720`, and a deliberate three-line cadence at desktop and mobile widths. The story uses two columns from 1440 through 768 px and one column at 430, 390, and 375 px. Chapter nodes remain zero, the dedicated film remains muted during active playback, all images load, every visible target is at least 44 px high, and no viewport has horizontal overflow.

Anti-template result for this revision: the generic whole-copy reveal is removed only from the chef biography and replaced with restrained type choreography tied to the supplied reference. The user's rejection confirms that a literal decorative food object is not justified here, so it is removed rather than cosmetically restyled. No card grid, particle field, generic loader, stock illustration, looping ornament, animation library, fake food object, or repeated section pattern is introduced. The third screenshot remains a documented proposal—menu inputs settling into order—because the user has not yet approved its object and exact placement.

## Revision plan — remove film chapters

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Three-column film / biography / chapter rail | The user's direct correction states that the film chapters are unclear and have no useful role in this page | Return the section to a focused two-column editorial spread: portrait film plus biography and portfolio link | Exact film, poster, captions, muted autoplay, heading animation, formal biography, and existing section order |
| Chapter buttons at 00:00, 00:15, and 00:31 | They duplicate the visible film, introduce player-like controls without a viewing need, and compete with the biography | Remove the controls, active number, progress rule, time labels, and related custom event bridge | Control-free film and viewport playback behavior |
| Wide process rail used to fill empty space | Filling width is not a sufficient content reason, and the rail now reads as an invented interface layer | Constrain the story to a balanced two-column frame with deliberate negative space and no replacement content | Editorial asymmetry, warm paper field, thin film frame, and distinct mobile composition |
| Onest 600 in the hero | Although applied technically, its normal-width Cyrillic does not reproduce the broad extended character the user selected and was directly rejected as visually unapplied | Use OFL-licensed Roboto Flex only for the hero at its maximum width axis, bold weight, and large optical size; retain Onest for body/UI | Exact hero copy, three-line cadence, colors, collage, actions, factual line, and every non-hero type role |
| Viewport-triggered attempt to unmute the film | The user explicitly asks to remove sound until a later instruction | Keep the film permanently muted while preserving autoplay, viewport play/pause, loop, poster, captions, and reduced-motion behavior | Exact MP4 file and all visual film behavior |

Templated or unjustified element found: the chapter rail is a technically functional but unnecessary player-navigation pattern. It is removed rather than restyled. Components retained: `Home`, `ChefStoryVideo`, all media, hero, menu, contacts, footer, and the story copy. Components removed: `ChefStoryChapters` and its custom event bridge. Components simplified: `ChefStoryVideo` and the story grid. The hero receives one self-hosted OFL variable font family; no UI or animation library is required.

Implementation result: the chapter component, custom seek/progress events, active index, time labels, progress line, chapter CSS, and pointer/keyboard sound-retry logic are removed. The story is a centered two-column film-and-biography spread and deliberately becomes one column below 700 px. The film's exact source, poster, captions, loop, viewport play/pause, and reduced-motion behavior remain; `muted` is never set to false. Roboto Flex Cyrillic/Latin web subsets and its OFL notice are self-hosted only for the hero, while Onest and Oranienbaum retain their established roles.

Final anti-template audit: no player-navigation widget, replacement rail, filler content, repeated card composition, decorative food object, stock gradient, glass treatment, or library-default component remains. The story composition now follows its actual content instead of filling a third column, and the expanded hero font is tied directly to the supplied 19:45:39 reference and latest correction.

The approved page sequence remains intact: private chef and collage → chef-at-work film with personal context → individual-menu explanation → contacts. The established hero collage, exact media, typography, palette, poster, captions, muted autoplay baseline, and later sections remain.

## Historical revision plan — formal editorial copy and interactive film chapters (superseded)

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Static right-hand process rail | The user specifically identifies insufficient interactivity; the current list looks actionable but does not affect the film | Three semantic chapter buttons grounded in actual footage: preparation at 00:00, cooking at 00:15, and serving at 00:31 | Three-part ruled rail, large chapter index, exact film, no native controls, and no play button |
| No playback feedback in the rail | A click would otherwise feel disconnected from the media | Active chapter derived from `timeupdate`, large index synchronization, exact time labels, and one restrained progress rule | Existing rust/ink/paper system, Oranienbaum hierarchy, keyboard focus, and 44 px targets |
| Informal or promotional phrases across the page | Phrases such as `написанный под вас`, `шеф — и есть меню`, and `собирает меню` do not match the newly requested formal tone | Complete formal Russian statements centered on an individual menu, personal authorship, and responsibility from conversation to final serving | All verified facts, current information architecture, Instagram as the only contact method, and restrained editorial cadence |
| Mixed metadata and visible terminology | `приватный` is repeated in metadata, accessibility text, and visible copy | Consistent `частный шеф` / `частный ужин` terminology and revised metadata | Latin wordmark, personal name, Bragin Culinary Academy reference, and current social-preview image |
| Reduced-motion and browser sound constraints | New seeking must not break existing accessibility and autoplay behavior | Chapter selection seeks a paused frame under reduced motion; ordinary mode reuses the current best-effort audible playback path | Poster fallback, mute/pause outside view, captions, loop, and browser-policy fallback |

Existing templated elements: none. The interaction is added because it directly exposes the supplied film's process, not for decoration. Components retained: `Home`, page sections, all media arrays, hero, menu imagery, contact close, and the current video playback controller. Components reworked: formal copy, metadata, video event bridge, and process-rail markup/styles. Genuinely new component: one client chapter controller; no UI library is required.

Implementation result: every visible page section, navigation label, metadata description, image/video description, and contact label now uses one formal Russian register centered on a private dinner, individual menu, and personal authorship. The former static rail is now a native-button chapter index at 00:00, 00:15, and 00:31. Clicking or keyboard-activating a chapter seeks the unchanged film, requests playback through the existing sound fallback, updates `aria-pressed`, synchronizes the large index, and advances one restrained progress rule. The film still has no native controls or play button; reduced-motion behavior remains paused and muted while allowing a still-frame seek.

Verification result: lint, production build, and rendered-HTML tests pass. Browser interaction at 1440 px confirmed that selecting “Приготовление” moved playback to 15.9 seconds, set the correct active state, continued playing with sound, and updated the progress line. The complete interface was checked at 1440, 1280, 1024, 768, 430, 390, and 375 px: horizontal overflow was 0 at every width; no image failed; all three chapter buttons remained present; their minimum rendered height was 102 px on desktop/tablet and 83 px on phones; the smallest visible interactive target was 44 px. A 1280 px long-label overflow found during QA was corrected by adapting the rail type scale and keeping the active label inside its control.

Final anti-template audit: no new card grid, generic marketing section, invented proof, arbitrary animation, rounded component system, stock gradient, glass effect, or duplicated media was introduced. The added interaction is uniquely tied to the actual film timeline and the approved three-stage working method. The only unresolved inputs remain broader brand identity, service geography and capacity, additional verified contact methods, and any future form/error-state language.

## Revision plan — editorial focal collage and contact sheet

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| One flat 29-tile 16 × 12 wall | Although project-specific, its single visual level gives a portrait, food detail, event scene, and consecutive film still the same mosaic logic, weakening the intended focal hierarchy | A loose 12 × 10 focal field informed by the Glamour loose-grid and Pinterest food-editorial references | Full-hero coverage, left portrait anchor, dark cinematic veil, overlaid content, and every independent photograph |
| Thirteen film stills scattered among unrelated photographs | The frames are a real chronological process sequence but currently read as arbitrary filler | One lower contact sheet informed by the Pinterest contact-sheet reference | All thirteen exact stills, their source order, and the existing quiet loop |
| Fourteen-cell desktop sequence on narrow screens | A single miniature row would make the film frames illegible | Recompose the sheet to 7 columns × 2 rows below 900 px | Same order, no carousel, no hidden images, and no additional controls |
| Current media treatment | The user requested collage design, not new or edited media | No file, crop, filter, blur, playback, or source change; only CSS placement and one semantic grouping wrapper | Exact sharp portrait, sharp documentary stills, blurred loop, tile entrance, hover behavior, and reduced-motion fallback |

Existing templated elements: none. The current mosaic is original but visually too level for the new collage request. Components retained: `Home`, `ChefStoryVideo`, all page sections, every media source, and every interaction. Components reworked: hero mosaic data grouping and hero grid placement. New component required: none; one structural contact-sheet wrapper is added inside the existing mosaic. No UI library is required.

Implementation result: the fifteen independent photographs now fill the upper 80% of the hero through a 12-column loose grid with distinct portrait, team, food, and process scales. The thirteen exact film stills remain in chronological filename order inside a contact sheet with the existing quiet loop; it occupies the lower 20% as fourteen columns on desktop and recomposes to seven columns by two rows below 900 px. All twenty-nine visual elements remain visible, every image source and the video source are unchanged, the required portrait retains `filter: none`, and the loop retains its exact `blur(5.5px) saturate(0.72) contrast(0.94)` treatment. The overlay copy, navigation, actions, animation behavior, and every section after the hero are unchanged.

## Revision plan — Oranienbaum and fuller chef-story spread

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Literata display family | The user explicitly requested Oranienbaum | Self-host Oranienbaum 400 in Cyrillic/Latin subsets and keep Onest for body/UI | Current semantic display roles, project colors, real Russian copy, and local font delivery |
| Italic serif emphasis | Oranienbaum has no italic face, so retaining it would synthesize a style the family does not contain | Normal-style copper emphasis, supported by scale and line breaks | Existing emphasized words and content hierarchy |
| 1260 px two-column chef-story frame | The user's 16:27 screenshot shows excessive inactive width around the film and biography on a wide viewport | A wider modular three-part editorial spread derived from the Intern, Capital Magazine, and Pinterest Predicts references | Exact film size limit, biography, heading, Instagram action, caption, and warm paper field |
| No structural content after the biography | The right side has no secondary rhythm and the block ends visually before the available width is used | A narrow ruled process rail using the existing verified sequence: listens → assembles the menu → leads every serving | No new claims, metrics, cards, decorative image, or duplicate media |
| Desktop-only expansion risk | A squeezed third column would make tablet/mobile worse | Collapse the rail under the biography at intermediate widths and into a compact linear sequence on phones | Mobile story order, 44 px targets, readable line lengths, and zero-overflow requirement |

Existing templated elements: none. The current two-column split is reference-driven but under-filled at the supplied viewport, so it is being recomposed rather than replaced by a generic section. Components retained: `Home`, `ChefStoryVideo`, all media arrays, every media style, hero, menu, contacts, and footer. Components reworked: display font delivery, display emphasis, and chef-story grid. New component required: one semantic `aside` inside the existing story section; no UI library is required.

Implementation result: Oranienbaum is self-hosted in official Cyrillic and Latin subsets under its OFL notice, while Onest remains the body and interface face. Every display role uses the real 400 normal face with font synthesis disabled; copper color and scale replace the former italic emphasis. At wide widths the story now fills a frame up to 1600 px with the unchanged film, biography, and a ruled process rail; at 1024 and 768 px the rail moves beneath the biography, and at phone widths it follows the film and copy as a compact linear sequence. The rail repeats only the already verified working method and introduces no new claim, metric, image, video, or card. Media sources, files, crops, filters, poster, captions, controls, and playback behavior are unchanged.

## Revision plan — Cinematic Editorial option 1

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| EB Garamond + Jost | The user selected option 1 after requesting stronger frontend typography | Literata with genuine Cyrillic italic for display roles and Onest for body/UI roles, both from their official Google Fonts families | Current type scale, Russian copy, line breaks, hierarchy, colors, and semantic roles |
| Generic opacity/translate hero-copy entrance | It does not express the selected editorial transition direction | Short CSS clip-path reveals with individual headline-line timing and restrained vertical travel | Current content order, layout positions, actions, and accessibility |
| One shared opacity/translate reveal for all later content | It treats text and media identically even though option 1 calls for composed editorial text transitions | Apply the clipped reveal only to text blocks; retain the existing quiet reveal for the film and menu photography | Section layout, film, photographs, and view-timeline enhancement |
| Existing media system | The user explicitly said not to touch photos or video | No media implementation change | All twenty-eight photos, the hero loop, the full chef film, sources, files, placement, crops, blur, poster, captions, sound behavior, and reduced-motion poster path |

Existing templated elements: none. The earlier fade-up is functional but visually generic, so it is the only transition pattern being reworked. Components retained: `Home`, `ChefStoryVideo`, all page sections, all media arrays, and all media styles. Components reworked: font loading and text-only motion styling. New components and UI libraries required: none.

Implementation result: Literata and Onest are now self-hosted from official Google Fonts files with their OFL notices, and their computed families were confirmed in the rendered interface. The hero headline reveals its two lines through separate CSS clip masks; eyebrow, copy, actions, factual line, and later text blocks use restrained mask timing, while the existing film and menu photography retain their prior reveal. The final mobile contact heading scale was reduced only enough to accommodate Literata's wider Cyrillic metrics. No photo or video file, media source, media component, mosaic entry, crop, placement, blur, poster, captions, or playback rule changed.

## Revision plan — dark cinematic hero reference

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Light warm hero wash and dark text | The new 00:22 screenshot explicitly establishes a dark photographic opening with light type | Hero-only deep umber veil, ivory headline and navigation, warm secondary copy, and copper italic emphasis | Light paper design for every section after the hero |
| Content begins near the outer gutter and spreads to 66% | The reference uses a narrower left-centre reading column with deliberate empty space around it | Move the hero content inward on desktop, constrain its measure, and use a three-line headline cadence | Existing Russian promise, description, and two real actions |
| Factual service notes read as an inline afterthought | The reference gives the lower factual row a structural rule and deliberate rhythm | Place the same three verified notes below the actions with separators and no invented numbers | Exact factual note copy; no statistics, awards, ratings, or locations from the reference |
| Blur is applied broadly to supporting stills | The user now specifically asks to blur the retained video; still photography in the new reference is darkened rather than optically blurred | Remove blur from every still image and apply a stronger isolated blur to `.tile-motion video` | Required portrait remains sharp; all twenty-eight unique photos and the quiet loop remain |
| Current mobile hero is derived from the light treatment | Contrast and text hierarchy would not carry the new direction deliberately | Use a separate dark mobile veil, three-line headline, full-width actions, and wrapped factual line while retaining the dense 6 × 18 map | Mobile-first tile map, 44 px targets, complete content, and no sticky overlay |

Existing templated elements: none. The hero is being reworked because its current light alignment and broad blur no longer match the newly confirmed reference, not because a generic template is being substituted. Components retained: `Home`, the full mosaic media array, site header, actions, scroll cue, all later sections, and `ChefStoryVideo`. Components reworked: hero headline markup and hero/header/mosaic styling. New components required: none. UI libraries remain infrastructure-only.

Implementation result: the hero now uses a deep umber photographic veil, ivory and copper display hierarchy, an inward desktop reading column, a three-line Russian headline cadence, paired rectangular actions, and a three-part factual line. The twenty-eight unique still photographs remain sharp; the exact required portrait retains computed `filter: none`; and the quiet motion tile remains present with an isolated computed `blur(5.5px)`. The page body, dedicated film, menu, contacts, and footer remain unchanged.

## Revision plan — full-field collage and scroll-activated film

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Collage limited to the right 57% of the hero | Directly conflicts with the instruction that the collage span the hero from beginning to end | Full-hero 12 × 10 documentary mosaic using fourteen photographs plus the existing quiet video tile | Authentic project imagery, varied crops, staggered reveals, and separate mobile placement |
| Opaque paper header and paper-led left column | Interrupt the requested continuous photographic field and keep the copy outside the collage | Transparent overlay header; hero copy placed directly over slightly blurred imagery with a warm legibility wash derived from the supplied screenshot | Wordmark, navigation, inquiry action, headline, supporting copy, and factual format note |
| Ten-photo selection | Does not satisfy the new request for more imagery | Add the four relevant project photographs already present in the audited media library: kitchen, studio, portrait, and workspace | Existing ten curated images and the process loop |
| Dedicated film with native controls and a play button | Explicitly rejected by the user | New client playback component with no native controls: muted autoplay baseline, play/unmute request at substantial viewport intersection, pause/remute outside view, and muted fallback when browser policy blocks automatic sound | Complete `IMG_5399` sequence, poster, captions, 9:16 frame, about copy, and section layout |

Existing components retained: one-page route, all narrative sections, header content, hero copy, menu section, contacts, and footer. Components reworked: hero mosaic data, header surface, hero wash, desktop/mobile mosaic maps, hero copy positioning, and dedicated film rendering. The only genuinely new component is the client-side viewport playback controller required for the requested sound behavior. No generic cards, new marketing sections, or UI-library themes are introduced.

## Revision plan — mandatory sharp portrait and doubled collage

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Supplied portrait treated only as a visual-direction screenshot | The user explicitly clarified that this exact image must remain in place | Copy the supplied PNG into project media and make it the large left hero anchor | Its exact pixels, portrait crop, baked light field, and established left-side role |
| Blur applied to the complete mosaic parent | It necessarily blurs the required portrait and conflicts with the explicit correction | Remove parent blur; apply slight softening only to non-anchor tile media and explicitly reset the anchor to `filter: none` | Warm text-legibility wash and restrained saturation on supporting tiles |
| Fourteen-photo hero | The user explicitly requested twice as many photographs | Twenty-eight unique photographs: exact supplied portrait + fourteen existing project photographs + thirteen distinct stills from the current `IMG_5399.MOV`; the quiet video remains a separate twenty-ninth tile | Full-height field, overlaid copy, authentic current-project media, and no duplicated tile sources |
| 12 × 10 desktop / 4 × 12 mobile map | Too coarse for twenty-nine visual tiles and would reduce the anchor's importance | Original 16 × 12 desktop map with a large fixed anchor; curated dense 6 × 18 mobile flow with role-specific spans | Irregular editorial rhythm and deliberately different desktop/mobile behavior |

No new external source is required. The additional stills are derived from the user-supplied film already selected for the second block, so they show the same real private-dinner process rather than invented or stock imagery. No section, copy block, interaction, or UI library needs to change.

Implementation result: the exact supplied PNG is now the first and largest hero tile, the parent mosaic no longer has a blur filter, and the anchor has an explicit `filter: none` in its resting and hover states. Thirteen distinct web-sized stills were selected at three-second intervals from `IMG_5399.MOV`, producing exactly twenty-eight unique photo sources; the quiet loop remains the separate twenty-ninth visual tile. The desktop grid fills a 16 × 12 map without gaps after its entrance sequence, while mobile uses a deliberately different dense 6 × 18 map.

## Historical revision record — light animated direction (superseded)

The direct user instruction on 2026-08-24 changes the approved visual direction without changing the page's content architecture.

| Existing element | Why it now needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Warm near-black page and overlays | Conflicts with the explicit requirement for a light site | Warm ivory paper system documented in `DESIGN_SYSTEM.md` | Editorial serif/sans contrast and restrained green/copper roles |
| Eight-photo hero mosaic | Does not satisfy the request for materially more photographs | Fourteen relevant `@evg.chef` photographs plus one supplied video tile | Asymmetric image-led hero and deliberate mobile remapping |
| Motion limited mainly to one video | Does not satisfy the request for an animated site | Staggered tile entry, slow crop drift, hover response, and supported section reveals | Reduced-motion fallback and no decorative scroll hijacking |
| Dark film and Footer fields | Break continuity with the new light direction | Paper, mineral borders, and light framed video composition | Dedicated chef-at-work film, controls, poster, and verified copy |

No new generic sections or card systems were required. Header, hero, proof, approach, film, and Footer remain; their visible styling and responsive compositions were reworked. The supplied hero footage was reduced to a clean four-second process loop, and a profile image containing unrelated headline text was removed from the active mosaic. The venue name associated with the original footage does not appear in interface copy, captions, source paths, or the edited loop.

## Revision plan — private dinners and personal authorship

The direct user instruction on 2026-08-24 replaces the consultant-oriented story and rejects the current frontend, typography, and portrait placed after the video.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Cormorant Garamond + Manrope | Explicitly rejected by the user; the pairing feels disconnected from the approved reference | EB Garamond + Jost from the approved Marrow reference, tested with the actual Russian copy | Editorial serif/sans role contrast |
| Dense fourteen-photo selfie-heavy wall | The chef is present but the collage reads as visual noise instead of evidence of a private-dinner service | Curated ten-photo wall plus one process loop, led by a strong chef portrait, dishes, team, and service context | Asymmetry, animation, separate mobile placement |
| Consultant headline, proof band, and approach section | They describe restaurant development rather than a private chef for dinners | Direct private-dinner promise in hero; about text beside the video; no corporate proof strip | Verified Bragin Culinary Academy context in the about copy |
| Portrait and pitch after the video | Explicitly disliked by the user and duplicates the chef immediately after showing him at work | Remove the portrait aside; let video lead and place concise biography beside it | Supplied video, poster, native controls, captions |
| No genuine bespoke-menu section | The service model is now explicit: the chef is the menu and writes it to request | One editorial menu section explaining the conversation and three inputs; no fixed dishes, packages, or cards | Documentary dish/process imagery as evidence |
| Minimal utility Footer | Contacts need to be the final narrative section | Large but restrained contact close with the verified Instagram profile and dinner-inquiry action | Minimal anchors and personal name |

Elements that remain: Sites/Vinext infrastructure, semantic one-page route, verified media, light paper palette, reduced-motion fallback, and Instagram as the only confirmed contact. Elements reworked: header, hero, collage selection and geometry, all messaging, typography, video/about layout, Footer, responsive behavior, and motion timing. Genuinely new components: a bespoke-menu editorial sequence and a dedicated contact close. No cards, FAQ, testimonials, pricing tiers, or invented contact fields are introduced.

## Resolved media correction — dedicated film

The user supplied `IMG_5399.MOV` for the second block. It is a genuinely different 43.966667-second portrait sequence showing Evgen preparing a private dinner from setup through cooking and final plating. The iPhone source uses HEVC video with AAC audio at 1080 × 1920, so it is transcoded at its original dimensions and without cropping to a web-optimized H.264/AAC MP4 with fast-start metadata. A matching poster is extracted from the same footage, the caption duration is updated to `00:44`, and the former public film is removed. The old source remains preserved at `assets/video-archive/old-4253138-hd_1080_2048_25fps.mp4`. The video/about layout and responsive framing require no redesign.

## Visual and functional verification

| Width | Result |
|---:|---|
| 1440 | Loose focal field plus one 14-cell contact-sheet row rendered; minimum sheet cell is 101 × 174 px, all media loaded, and zero horizontal overflow was verified |
| 1280 | Desktop focal hierarchy and one 14-cell contact-sheet row rendered; minimum sheet cell is 90 × 174 px, all media loaded, and zero horizontal overflow was verified |
| 1024 | Compact desktop focal field and one 14-cell contact-sheet row rendered; minimum sheet cell is 71 × 174 px, all media loaded, and zero horizontal overflow was verified |
| 768 | Focal field retained while the sheet deliberately recomposes to 7 × 2; minimum sheet cell is 109 × 96 px, all media loaded, and zero horizontal overflow was verified |
| 430 | Mobile 6 × 18 field and 7 × 2 sheet rendered with 60 × 96 px minimum cells, full-width actions, all media loaded, and zero horizontal overflow was verified |
| 390 | Mobile composition rendered with 54 × 96 px minimum sheet cells; headline and actions remain inside the viewport, all media loaded, and zero horizontal overflow was verified |
| 375 | Narrowest composition rendered with 52 × 96 px minimum sheet cells; all twenty-nine visuals remain present, actions stay at least 44 px high, and zero horizontal overflow was verified |

Both rendered MP4 files retain their exact files and durations: 4 seconds for the hero loop and 43.966667 seconds for the dedicated film. The dedicated film remains control-free and is now permanently muted by direct instruction; chapter navigation and its event bridge are absent. Current two-column story, expanded hero typography, and required responsive widths are verified in the latest revision record above.

## Final anti-template audit

- no repeated card grid, Bento composition, pricing/testimonial pattern, generic FAQ, stock avatar, partner strip, or decorative glass/gradient object is present;
- sections intentionally use different compositions based on their content: mosaic hero, video/about split, editorial bespoke-menu sequence, and sparse contact close;
- the collage is directly required by the user and uses a project-specific focal field plus chronological contact sheet rather than a stock Bento layout or generic polaroid scatter;
- the dark hero, inward content column, paired actions, and low factual line are directly traceable to the supplied 00:22 screenshot; no statistics, awards, English copy, or third-party photography were copied;
- the fuller story spread is traceable to the supplied 16:27 screenshot and researched editorial references; its ruled rail avoids cards, extra media, invented facts, and imitation of a specific magazine grid;
- the revised hero collage is traceable to the current loose-grid, contact-sheet, and food-editorial Pinterest references; no rounded Pinterest tiles, third-party imagery, torn-paper styling, or exact magazine geometry were copied;
- Oranienbaum is the user's explicit choice; its single real style is used without fake italic or invented weights;
- visible library defaults and the starter skeleton were removed;
- all copy is tied to the chef's publicly visible role and the supplied media;
- desktop and mobile collages use different contact-sheet geometry rather than a squeezed or stacked desktop layout;
- all major visible decisions have a traceable source in `docs/DESIGN_REFERENCE_MAP.md`.

## Risks and open blockers

- no approved logo or full brand identity;
- no verified contact method beyond the supplied Instagram profile;
- no broader site content or final information architecture;
- Instagram source images are suitable for a working draft but some remain limited to social-media resolution; event signage that is part of documentary photography is retained only where it establishes real professional context;
- both supplied videos are portrait-format and require deliberate desktop framing.
- the required portrait is 864 px wide and the derived film stills are 720 px wide, which is sufficient for their current mosaic roles but not for future full-width standalone use;
- dedicated-film sound is intentionally disabled until the user explicitly asks to restore it.

## Proposal-only study — chef-story media relationship (2026-08-30)

The supplied screenshot shows the current portrait film and square kitchen touching at a computed boundary. Although the media heights align, the composition makes unrelated sources look like one accidental panorama: the grill frame on the left and the empty generated kitchen on the right have neither a clear spatial connection nor enough separation to read as distinct evidence.

Three layouts were prepared without changing the page, media, playback, crop sources, or approved design-system tokens:

| Direction | What changes | Why it may work | Main risk |
|---|---|---|---|
| Architectural opening | The kitchen owns the field and the portrait film becomes a tall door/window-like aperture with visible architectural depth | Creates one coherent scene and makes the 9:16 ratio intentional rather than awkward | Must avoid looking like a television mounted in a fake room |
| Editorial diptych | The film and kitchen become two offset independent objects with a real paper gutter, distinct captions, and different reading levels | Most truthful about the two sources and clearest at desktop and mobile widths | Less immersive than the other two directions |
| Foreground cinematic film | The kitchen becomes an atmospheric field, while the film stands as a separate foreground plane crossed by the established extended grotesk statement | Feels most contemporary and gives scroll motion a meaningful scale transition | Requires restrained motion and careful subtitle clearance |

The comparison uses only the current project film poster and first-frame-matched kitchen image. No external images, other-chat material, generic landing composition, stock device frame, or new UI library appears. This is a selection artifact only; implementation and required seven-width verification remain pending until one direction is approved.

## Selected implementation plan — option 3 (2026-08-30)

The user selected the foreground cinematic film without combining it with the architectural-opening or editorial-diptych alternatives.

| Existing element | Why it looks unresolved | Selected replacement | Retained |
|---|---|---|---|
| Flush equal-height film and kitchen rectangles | The zero-gap boundary makes separate sources look like one accidental panorama and gives neither object a deliberate hierarchy | One wide kitchen field with the portrait film as a separate foreground plane | Exact film, poster, caption track, generated kitchen image, muted viewport playback, square edges |
| Empty kitchen occupying most of the pair | The image has atmosphere but no narrative job beyond filling width | Use it as environmental depth behind the statement `ШЕФ У ВАС ДОМА` | Its honey oak, tile, stone, and warm-light material cues; no claim that it is a real event venue |
| Film locked to a narrow equal-height column | The ratio reads as a layout problem rather than a documentary choice | Let the 9:16 film rise from the lower edge and interrupt the typography as a deliberate foreground object | Complete uncropped person and film sequence, no blur, no controls, no sound |
| Desktop pair stacked mechanically on phones | The two-source stack loses the selected single-scene concept | Keep one tall mobile scene, enlarge the film plane, and move metadata into the open right-hand area | Real film first in the visual hierarchy, readable title, subtitle-safe clearance, zero horizontal overflow |

No new component library, stock image, generated person, interaction, or content section is required. `app/page.tsx` will only reshape this section's semantic composition; the final chef-story rules in `app/globals.css` will replace the flush-pair override; source-aware tests will be updated. The hero, menu, contact close, all media files, and sound policy remain untouched.

Implementation result: the flush `story-visual-pair` and separate kitchen figure are removed from the page. `story-cinema-stage` now places the current kitchen image as one atmospheric field, the exact `IMG_5399` film as a sharp square-edged foreground plane, and the selected `ШЕФ У ВАС ДОМА` statement behind it in the established extended Roboto Flex voice. The film source, poster, Russian caption track, duration, viewport play/pause behavior, muted state, and lack of controls are unchanged. Option 1's architectural reveal and option 2's editorial gutter are not mixed into the result.

Responsive implementation: widths above 1024 px use the bounded 16:9 field; tablet widths increase minimum scene height and film share; 768 px and below switch to a deliberately taller scene; 560 px and below move the section index, enlarge the portrait film to 58vw, preserve the kitchen as one background field, and keep the quiet caption in the open right-hand area. Reduced-motion rules remove the one-time title and foreground-film entrances.

Validation result: lint, the production build, both rendered-source tests, `git diff --check`, and a local HTTP 200 response pass. Source checks confirm the selected semantic structure, the empty alternative text on the atmospheric generated kitchen, sharp 9:16 film treatment, 16:9 desktop field, dedicated mobile breakpoints, scroll-linked entrance guarded by feature support, and reduced-motion fallback. Per the Sites workflow, browser screenshots, DOM inspection, and viewport resizing were not performed because the user did not explicitly request browser testing; visual confirmation at the mandatory seven widths therefore remains an open verification limitation rather than an asserted result.

Final anti-template audit for this change: the rejected equal split is removed; no card, Bento grid, device mockup, rounded media frame, glow, glass, arbitrary gradient object, stock asset, play button, chapter control, or UI-library default was introduced. The new hierarchy is tied directly to the selected option-3 mockup and the existing project media. The generated kitchen remains labelled in documentation as atmosphere rather than documentary evidence.

## Latest correction plan — illustrated villa with a live window (2026-08-30)

The screenshot `Снимок экрана 2026-08-30 в 16.08.13.png` confirms that option 3 failed in implementation: the kitchen remains an oversized empty photograph, the dark extended headline loses contrast and is physically cut by the film, and the portrait video looks pasted on top rather than spatially motivated. The user directly rejects this result and proposes a clearer concept: draw a villa and let the existing film play inside its window.

| Existing element | Why it fails | Confirmed replacement | Retained |
|---|---|---|---|
| Generated empty kitchen as a full field | It repeats the same cabinetry already visible in the film and adds no new meaning | One original editorial architectural illustration of a villa exterior | Warm paper, wood, stone, rust, and deep green project palette |
| Portrait film floating over the room | Its placement has no believable spatial anchor | Exact film fitted into one intentionally drawn tall 9:16 window | Complete film, poster, captions, sharp pixels, muted autoplay, viewport pause, no controls |
| Oversized black `ШЕФ У ВАС ДОМА` behind the film | It is low-contrast, cropped, and competes with the chef | Remove the overlapping headline; let the villa/window metaphor carry the message, supported only by quiet external labeling | Established Oranienbaum/Onest roles elsewhere on the page |
| Desktop scene adapted by scale alone | The window-to-building relationship would disappear on phones | Define a separate mobile crop and window alignment from the same asset | One continuous scene rather than two stacked rectangles |

The new illustration is required because no project asset depicts a villa façade with a single correctly proportioned opening, and using a third-party home would imply a real venue. Image generation will therefore create one project-owned, non-photorealistic architectural backdrop with no person, text, logo, watermark, screen, or baked-in media. The existing film remains the sole documentary layer. No UI library or new content section is needed.

Implementation result: built-in image generation produced `public/media/chef-story-villa-window.jpg`, a 1672 × 941 editorial gouache-and-watercolor villa exterior optimized to 565 KB. A targeted second generation widened only the single dark opening while preserving the façade, entry, planting, palette, and wide framing. The final prompt specified an original contemporary villa at blue hour, warm ivory plaster, natural stone, umber timber, restrained foliage, one straight portrait opening, no people, text, sign, logo, watermark, screen, device, second large window, location claim, or glossy 3D rendering.

`story-villa-artboard` now keeps the generated villa and live film in one shared coordinate system. On desktop the exact window rectangle is mapped at `18.72% / 25.82% / 16.26% / 56.1%`; the complete 9:16 film uses `object-fit: contain` against the drawing's umber opening, so no part of the chef is cropped. The rejected kitchen, large overlapping headline, corner bracket, and `Из кухни — к столу` caption are absent from the rendered page. Only the quiet `01 / шеф у вас дома` label remains outside the video.

Mobile is not a stacked fallback: the same artboard becomes taller and shifts left, keeping the live window, façade, and entry context in one crop. Feature-supported view animation reveals the architectural field and then the window once; reduced-motion disables both. The film source, poster, Russian captions, muted state, autoplay, loop, viewport pause, and control-free presentation remain unchanged.

Validation result: lint, production build, both rendered-source tests, `git diff --check`, and local HTTP 200 pass. Tests confirm the new asset, semantic structure, decorative empty alternative text, exact window mapping, uncropped film treatment, mobile artboard shift, supported view animation, and reduced-motion fallback. The current request did not explicitly request browser testing, so Sites workflow rules prevent screenshot, DOM, and resized visual inspection; the required seven-width visual confirmation remains an explicitly reported limitation rather than a claimed result.

Final anti-template audit: the design uses one user-directed spatial metaphor and one project-owned illustration, not a generic split, card, Bento grid, device mockup, stock villa, luxury-property template, gradient decoration, glass panel, rounded screen, play button, or UI-library default. The villa is documented and coded as conceptual atmosphere; the real film remains the only documentary evidence.

## Latest clarification plan — open villa entrance and visible kitchen (2026-08-30)

The current project asset was inspected before implementation. Its flat-roofed exterior, entry steps, material palette, and wide editorial treatment already establish the selected villa direction, but the left opening is a featureless dark rectangle and the central wooden entrance is closed. That makes the moving layer read as a screen and leaves no visible evidence that the chef is working inside a home.

| Existing element | Why it fails | Confirmed replacement | Retained |
|---|---|---|---|
| Featureless left dark aperture | It has no sill, reveal depth, or casement cue, so it reads as an embedded display rather than a villa window | Keep the exact internal 9:16 rectangle but strengthen the plaster/stone reveals, sill, and restrained warm light around it | Current video coordinates, complete uncropped film, poster, captions, muted autoplay, viewport pause, no controls |
| Closed right wooden entrance | The exterior never opens into a lived domestic space, so “шеф у вас дома” remains an abstract caption | Open the door inward and show a warm ordinary kitchen behind it with wood cabinets, pale square tile, stone counter, and practical household light | Entry steps, canopy, façade geometry, surrounding planting, and blue-hour atmosphere |
| Villa and film read as two unrelated layers | The architecture does not explain that both belong to the same at-home evening | Use one clear spatial sequence: exterior villa, open threshold, visible kitchen, chef working in the adjacent live window | One original non-documentary illustration and one exact documentary film; no new section, button, card, or interaction |

Components retained: `ChefStoryVideo`, the MP4/poster/VTT trio, `story-villa-stage`, external section label, current mobile crop strategy, and every other page block. Components reworked: only the villa raster asset and its source reference in the page; window coordinates remain unchanged unless output inspection proves a measurable geometry shift. Genuinely new component and UI library: none.

The asset edit must preserve the 1672 × 941 framing and the exact left aperture position. It may add no people, food display, text, logo, sign, address, pool, vehicle, screen, glossy real-estate rendering, or second large competing window. The generated kitchen is a conceptual view into a home, not evidence of a particular venue.

Prototype result: built-in image editing produced `public/media/chef-story-villa-window-v2.jpg`, a 1672 × 941 versioned JPEG optimized to 563 KB. The left aperture gained a recessed reveal and sill; the right wooden entrance opened onto a warm domestic kitchen. The user approved those two spatial devices but rejected the villa scene, architecture, and painterly realization. The prototype is therefore retained only as a composition reference and is not connected to the rendered page.

## Proposal-only plan — five new villa directions (2026-08-30)

The next action is visual comparison, not interface implementation. Every proposal must preserve the approved left live-window/right open-door relationship while replacing the rejected house, surroundings, and rendering language. The five directions will deliberately test: a precise Mediterranean architectural illustration, a cinematic conceptual visualization, a sunlit editorial screen-print, an architectural cutaway, and a tactile paper-and-ink collage. Each must reserve the same unobstructed 9:16 field for the exact film and show a recognizably domestic kitchen through the open entrance.

No proposal may contain a generated chef, guest, logo, address, claim of a real villa, copied third-party architecture, screen/device chrome, pool, vehicle, text baked into the image, or effect-only decoration. `app/page.tsx`, video behavior, CSS coordinates, hero, menu, and contact sections remain unchanged until the user selects one direction. After selection, only the chosen asset and any measured coordinate/crop adjustments may proceed to implementation and required validation.

Proposal result: five wide raw PNG directions and five still previews are saved under `design/mockups/chef-villa-study-2026-08-30/`. The preview files use the exact existing `chef-story-img-5399-poster.jpg` composited into each reserved window; they do not regenerate or alter the chef. Direction 04 initially introduced an unrequested illustrated person inside the kitchen, so one targeted edit removed only that person and reconstructed the empty countertop and cabinetry before the option was saved. The final prompt set is recorded in the same folder.

The five comparison points are: (01) light mineral architectural drawing, (02) cinematic dusk realism, (03) bold editorial screen print, (04) shallow architectural cutaway, and (05) tactile paper-and-ink collage. The site still references the previously rendered villa asset. No proposal is implemented, committed as active UI, or published before selection.

Proposal anti-template audit: every direction solves the same project-specific spatial story rather than adding a generic landing composition. There are no cards, device mockups, UI-library defaults, copied homes, arbitrary 3D objects, text overlays, stock guests, generated chef identity, or decorative effects unrelated to explaining the at-home service.

## Second proposal series — five architecture-led villa directions (2026-08-30)

The user requested five additional villas in different styles, retaining an open door and an adjacent window where the chef is cooking. The existing project, first five proposals, approved spatial invariant, documentary poster, prompt record, and current rendered asset reference were inspected before generation. This is a proposal-only extension: no page component, stylesheet, interaction, video behavior, or active media reference is changed.

Built-in image generation produced five new 1672 × 941 raw PNGs: (06) a traditional Cypriot stone courtyard, (07) 1960s Mediterranean modernism, (08) an organic lime-plaster monolith, (09) a cedar-and-travertine coastal pavilion in a woodblock/colored-pencil treatment, and (10) a geometric terracotta-and-pale-brick risograph villa. Each keeps the window on the left and a visibly open entrance directly beside it; the entrance reveals a warm domestic kitchen without a generated person.

Five versioned `*-preview.jpg` files place the unchanged `chef-story-img-5399-poster.jpg` inside the reserved aperture. The chef is neither regenerated nor altered. `06-10-comparison-preview.jpg` provides one inspected comparison sheet. The final prompts are recorded in the study's `PROMPTS.md`.

Second-series anti-template audit: the five outputs vary building typology, materials, light, and image-making method while preserving the project-specific at-home sequence. They introduce no interface card system, stock SaaS composition, gradient decoration, luxury-property claim, copied villa, generated chef, logo, text, pool, vehicle, or device frame. The open door, domestic kitchen, architectural window reveal, and exact documentary insert all remain functional rather than ornamental.

Visual verification: all ten new files are 1672 × 941; the five previews and the comparison sheet were inspected at full output resolution. Every second-series preview shows the chef inside the left architectural window and an open door immediately beside it with a kitchen visible beyond. Website breakpoint verification is unchanged and intentionally not repeated because this proposal task does not modify the rendered interface.

## Final correction plan — supplied close stone façade (2026-08-30)

The user supplied `Снимок экрана 2026-08-30 в 17.16.51.png` and asked for the block to match it. This supersedes the exploratory blue-hour villa, the screen-print proposal, and the intermediate cabinet-alignment mockup. The confirmed composition is now a close sunlit stone exterior with two adjacent architectural openings: a deep left window reserved for the exact live film, and an open right entrance revealing a warm wood-and-tile domestic kitchen.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Wide blue-hour painted villa | Its distant massing and painterly atmosphere were explicitly rejected | The supplied close stone façade, cropped only to remove its outer preview border | One coherent exterior field and the established warm material palette |
| Video mapped to the earlier dark aperture | Its coordinates no longer correspond to the selected façade | Measure and map the film to the supplied left recess | Exact MP4, poster, VTT, muted autoplay/loop, viewport pause, no controls, no blur, complete uncropped portrait |
| Cabinet relationship left to chance | The user explicitly wants the illustrated kitchen cabinets and the cabinets visible behind the chef to sit on one visual level | Keep `object-fit: contain` and use the available vertical letterbox space to lower the film until the upper cabinet bands align | The video pixels and the supplied kitchen remain unchanged |
| Existing tall mobile crop | It was tuned around a different building and can hide the new open door | Reduce the artificial stage height and shift the same artboard so the live window and part of the open kitchen remain simultaneously visible | One continuous scene, 44 px interaction minimums elsewhere, no mobile carousel or detached film card |

Components retained: `ChefStoryVideo`, `story-villa-stage`, section semantics, quiet external label, one-time reveal, reduced-motion fallback, and every later page block. Components reworked: the façade asset reference, stage ratio, window coordinates, film vertical alignment, label contrast, and the two responsive crops. New component and UI library: none.

The screenshot is a user-supplied project reference and asset. It is not combined with any information, image, or archive from another chat. The outer preview frame is the only pixel content removed; no person or kitchen is generated. Implementation must be followed by source tests, lint, production build, local HTTP verification, anti-template audit, and private publishing. Per Sites workflow, screenshot/DOM/resized-browser QA remains unavailable unless explicitly requested, so the seven required visual widths will be reported as an open verification limitation rather than claimed.

Implementation result: `public/media/chef-story-stone-villa.jpg` is a 2720 × 1520, 631 KB JPEG made directly from the user-supplied screenshot by cropping 10 px horizontally and 9 px vertically from the outer preview frame. No scene pixel was regenerated or sourced elsewhere. The page now references this asset; the previous illustrated villa remains recoverable but is not rendered.

The measured dark recess is mapped at `25.85% / 17.76% / 14.96% / 57.04%` inside a `34 / 19` artboard. The complete 9:16 film remains `object-fit: contain`; `object-position: 50% 75%` uses the existing vertical letterbox space to place the upper wood cabinets behind the chef on the same visual band as the right-hand kitchen cabinets. Desktop keeps the complete façade. Tablet uses a 5:4 stage and a `-15%` artboard shift; phone uses an 8:9 stage and a `-48%` shift so both the live window and the open kitchen threshold remain in the crop. The quiet label changes to dark umber/rust for contrast against the sunlit wall.

Validation result: lint, production build, rendered-source tests, `git diff --check`, and a local HTTP 200 response pass. Source tests confirm the supplied asset, exact window mapping, cabinet-alignment object position, tablet/phone ratios, live-film invariants, scroll-linked reveal, and reduced-motion fallback. During the subsequent screenshot-directed hero correction, the merged current page was also regression-checked in the browser at 1440, 1280, 1024, 768, 430, 390, and 375 px. The stone façade loaded at every width, the live window retained `object-fit: contain` and `object-position: 50% 75%`, the film reached ready state 4, and the document kept zero horizontal overflow. Desktop preserves the complete façade; tablet and phone preserve both the live window and open entrance in their dedicated crops.

Final anti-template audit: the block is a single reference-led architectural scene rather than a card, split-screen template, Bento grid, device mockup, or generic luxury-villa hero. No new headline, button, chapter control, play icon, rounded media treatment, glass, gradient, glow, generated person, stock photograph, library component, or placeholder copy was added. Mobile uses a content-specific two-opening crop rather than stacking the film separately.

## Third proposal series — pool and guests (2026-08-30)

The user explicitly requested a pool and possible guests. This supersedes the earlier proposal-only prohibition on pools and generated guests, but not the prohibition on a generated chef or on placing people inside the video window, kitchen, doorway, or threshold. Directions 11–15 extend the five architecture-led concepts with a shallow or narrow foreground pool and four or five fully dressed adult guests in a quiet dinner or aperitif moment. The pool remains part of a domestic courtyard rather than a resort, and the gathering remains secondary to the live-window/open-door spatial story.

Five raw PNGs and five 1672 × 941 previews are saved as directions 11–15. The previews place the unchanged `chef-story-img-5399-poster.jpg` inside the reserved opening, and `11-15-pool-guests-comparison-preview.jpg` records the inspected set. No page, stylesheet, interaction, or active media reference changed.

## Fourth proposal series — site palette and rich scenography (2026-08-30)

The user found the pool-and-guest concepts promising but asked for explicit coordination with the site's colors and the video and for substantially more elements and decoration. Before generation, the live CSS tokens, `docs/DESIGN_SYSTEM.md`, `public/og.png`, `chef-story-img-5399-poster.jpg`, and `chef-story-video-first-frame.jpg` were inspected. The resulting palette is not invented: paper `#F5F1E8`, raised ivory `#FFFDF8`, forest `#153F37`, rust `#A34F2B`, dusty wall `#C1A99A`, honey wood `#9D7053`, warm stone `#897066`, and deep umber `#33292D`.

Built-in image editing produced directions 16–20 from the five pool-and-guest scenes. Each retains its architecture, pool, secondary gathering, open door, warm kitchen, and dark video field while adding purposeful dinner scenography: layered linens and tableware, ceramics, glassware, candles, service furniture, lanterns, woven seating, herbs, citrus, vines, planters, textiles, and water reflections. The decoration is abundant but functional; it supports dining, service, comfort, practical light, or Mediterranean planting rather than arbitrary effects.

Five raw PNGs and five normalized 1672 × 941 previews are stored under `design/mockups/chef-villa-study-2026-08-30/`; the raw built-in outputs are 1671–1672 × 941. `16-20-rich-site-palette-comparison-preview.jpg` was inspected at full output resolution. Every preview keeps the real unchanged chef poster inside the left architectural window, the adjacent door visibly open, the kitchen readable, guests outside the circulation path, forest-toned water, and the project's rust/ivory/wood/stone/umber balance.

Fourth-series anti-template audit: the additional detail is grounded in the private-dinner journey and approved palette, not in a generic luxury-villa kit. The scenes contain no generated chef, device frame, text, logo, copied property, bright resort-blue water, pool loungers, wedding arch, hotel buffet, arbitrary glow, or decorative object without a hospitality or garden role. No UI library is involved, and the rendered site remains unchanged pending selection.

## Depth and grill-removal correction plan (2026-08-30)

The published stone-façade block was audited against the user's new correction. The door and window currently share too much vertical emphasis because the live layer fills the full measured dark recess. The film also contains one clearly bounded outdoor-grill montage: the transition into the grill begins at 17.066667 seconds and the domestic stovetop sequence resumes at 23.866667 seconds.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Live layer fills the architectural recess | Its moving height competes with the door and flattens the intended exterior-to-interior depth | Scale the moving field to 78% around the existing recess center, leaving the original dark reveal visible around it | Supplied stone façade, door, kitchen, exact left opening, no blur or screen frame |
| Grill montage at 17.07–23.87 seconds | It reads as an exterior cooking insert rather than action occurring inside the visible home | Create one project-local derivative that joins the retained pre-grill and post-grill sequences without changing their speed | Original MP4 remains recoverable; portrait aspect and content, audio track, poster, muted playback and loop remain |
| Caption cue ends at the old 43.967-second duration | It would outlive the shortened film metadata | Point the derivative to a matching 37.167-second caption track | Same factual `[Музыкальное сопровождение]` text and accessibility behavior |

Components retained: `ChefStoryVideo`, `story-villa-stage`, the user-supplied façade, poster fallback, muted autoplay/loop, viewport pause, reduced-motion behavior, external label, biography, and all later sections. Components reworked: only the film source/track and the measured live-window rectangle. New UI component and library: none.

Implementation constraints: remove no domestic-kitchen shot; do not speed, recolor, blur, mask, or spatially crop the retained 9:16 frames; do not regenerate the chef or architecture; do not alter the door; and do not use information or assets from another chat. After implementation, update source tests, run lint/build/tests and local HTTP verification, complete the anti-template audit, and publish through the existing private Sites project. Seven-width browser inspection remains an open verification item unless explicitly requested.

Implementation result: `public/media/chef-story-img-5399-no-grill.mp4` is a web-optimized 720 × 1280, 37.166667-second derivative of the existing user-supplied film, appropriate for the small architectural window while the untouched 1080 × 1920 source remains recoverable. Only the 6.8-second continuous grill montage from 17.066667 through 23.866667 was removed; inspection of one-second frames across the join confirms that the retained vegetable preparation now cuts directly to the domestic stovetop. The matching `chef-story-img-5399-no-grill.ru.vtt` cue ends at 37.167 seconds, while the existing poster remains valid because the opening frame did not change.

The moving rectangle is scaled to 78% around the previous recess center: `top: 24.08%`, `left: 27.5%`, `width: 11.65%`, and `height: 44.47%`. The supplied dark recess is therefore visible around the live image as architectural depth, while the unchanged door remains the larger near opening. `object-fit: contain` and `object-position: 50% 75%` retain the complete portrait frame and the cabinet alignment.

Validation result: lint, production build, both rendered-source tests, `git diff --check`, local HTTP 200, MP4 stream inspection, and frame inspection across the edit pass. The merged current page was then browser-checked at 1440, 1280, 1024, 768, 430, 390, and 375 px during the subsequent hero placement correction. At every width the stone asset loaded, the reduced live window remained inside the supplied dark reveal, `chef-story-img-5399-no-grill.mp4` reached ready state 4, `object-fit: contain` and `object-position: 50% 75%` remained active, and document-level horizontal overflow stayed at zero. Desktop, tablet, and phone screenshots confirm the door remains the larger near opening and both architectural openings remain readable.

Final anti-template audit: the correction changes only project-specific perspective and documentary footage. It adds no section, card, generic split, device frame, rounded media shell, play control, animation, gradient, glass, icon, stock asset, generated person, new copy, or UI-library styling. The mobile scene remains one deliberate architectural crop rather than a stacked desktop fallback.

## Fifth proposal series — original innovative villas (2026-08-30)

The user requested five new authorial and innovative villa ideas. The project palette, film poster, active stone façade, previous twenty proposals, pool/guest direction, rich-decoration rule, and live-window/open-door invariant were inspected before generation. This remains proposal-only work: the active stone-façade block, edited film, CSS mapping, video behavior, page structure, and published site are unchanged.

The five new concepts are architectural systems rather than style skins: (21) one continuous limestone ribbon forms canopy, reveals, bench, dining plinth, and pool coping; (22) inhabitable edible-garden terraces combine herbs, citrus, shade, seating, prep surfaces, water rill, and pool; (23) pivoting terracotta climate screens become shade wings, service surfaces, and patterned lantern light; (24) a stone bridge crosses a pool-canal and widens into the dining platform and herb island; and (25) broad terraced seating/planting bands curve around an oval pool and off-center dinner platform.

Built-in image generation produced five 1672 × 941 raw PNGs and five 1672 × 941 previews under `design/mockups/chef-villa-study-2026-08-30/`. The previews place the unchanged `chef-story-img-5399-poster.jpg` inside the measured dark opening; `21-25-innovative-villas-comparison-preview.jpg` was inspected at full output resolution. Every option includes a pool, secondary adult guests, rich functional dinner details, the approved site/video palette, an unobstructed left live window, and an immediately adjacent open entrance with the warm domestic kitchen visible.

Fifth-series anti-template audit: no option is a restyled generic villa or a novelty object. Every defining move performs multiple project-relevant jobs across climate, planting, circulation, service, seating, water, and dining. The concepts avoid resort infinity-pool imagery, hotel arrival, futuristic spectacle, literal theatre, wedding décor, device framing, copied properties, text, logos, and generated chef identity. No UI library or rendered-site code is involved.

## Selected water-bridge villa implementation plan (2026-08-30)

The user selected direction 24 from the innovative-villa study and then required a 9:16 mobile presentation. The selection attachment `Photo 1.jpg` was inspected only as confirmation; its black bars and phone editing controls are not site content. The clean 1672 × 941 project source `design/mockups/chef-villa-study-2026-08-30/24-water-bridge-house.png` and its exact-poster preview are the implementation references.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Active close stone façade | It is a previously approved direction, but the user has now explicitly selected the water-bridge villa | Clean direction-24 scene with pool-canal, crossing bridge, planting, open kitchen door, and secondary dinner guests | One continuous architectural field, project palette, and quiet external label |
| Stone-façade live-window mapping | Its coordinates and vertical film alignment belong to another architectural opening | Measure and map the existing film to direction 24's dark left recess; center the complete portrait frame with narrow architectural side reveals | `ChefStoryVideo`, edited no-grill MP4, poster, VTT, muted autoplay/loop, viewport pause, reduced-motion fallback, no controls, and no blur |
| Phone stage at 8:9 | It conflicts with the new explicit mobile requirement | Use an exact 9:16 stage at 560 px and below, with a separate crop centered on the live window, open door, and water bridge | The same continuous source image and live video rather than a detached mobile card |
| Light-façade label contrast | Dark umber was chosen for the previous sunlit wall and will lose contrast over the selected dusk foliage | Use subdued ivory for the label and a warm rust/sand index sampled from the approved palette | Existing wording, compact scale, and non-interactive placement |

The current block is not a generic template; the rework is required because the selected reference has changed. Components retained: the semantic section, `story-villa-stage`, `story-villa-artboard`, `story-villa-window`, `ChefStoryVideo`, entrance reveal, biography, and every later section. Components reworked: only the active villa asset, native artboard ratio, measured video rectangle, label contrast, and desktop/tablet/phone crops. New components and UI libraries: none.

Implementation constraints: do not use the phone screenshot as the background; do not use the preview with the chef still baked into it; do not regenerate or crop the chef film; do not hide the open door on mobile; do not let guests compete with the window-door-bridge sequence; do not add controls, cards, gradients, glow, glass, resort-blue water, or new marketing copy. After implementation, update source tests, run lint and the production build, verify the mandatory seven widths with special attention to the exact mobile 9:16 geometry, complete the anti-template audit, and publish through the existing Sites project.

Implementation result: `public/media/chef-story-water-bridge-villa.jpg` is a 1672 × 941, 576 KB web export made directly from the clean direction-24 PNG. The phone screenshot and the preview with the chef poster baked into it are not rendered. `app/page.tsx` now references the clean export, while the former stone façade remains recoverable but inactive.

The measured black recess is mapped at `top: 20.19%`, `left: 35.77%`, `width: 7.78%`, and `height: 22.53%` inside the exact `1672 / 941` artboard. The complete film remains `object-fit: contain` at `object-position: 50% 50%`; its narrow side reveals preserve the depth of the architectural opening. The quiet label uses approved ivory and warm-sand colors with a chef-story-specific selector so generic story-heading rules cannot enlarge it.

Responsive result: desktop widths 1440, 1280, and 1024 show the complete scene; 768 uses the dedicated 5:4 crop and keeps the window, door, bridge, pool, planting, and part of the dinner gathering; 430, 390, and 375 use an exact 9:16 stage with a `-99%` artboard offset. At all three phone widths the live window remains left of the open door, the pool and illuminated bridge form a clear vertical arrival axis, and guests are intentionally outside the primary crop rather than reducing the architectural story to fit them.

Validation result: lint, production build, both rendered-source tests, and `git diff --check` pass. Browser verification at 1440, 1280, 1024, 768, 430, 390, and 375 confirms the selected 1672 × 941 image loaded, the live MP4 reached ready state 4, the label remained 10 px on desktop/tablet and 9 px on phone, and document-level horizontal overflow stayed at zero. The measured phone stage ratio is `0.56250` at all three widths, confirming exact 9:16 geometry. No console errors were recorded. The poster remains the loading/reduced-motion fallback; this static media block has no empty, form, hover, or focus state of its own.

Final anti-template audit: the active block is one project-specific arrival-and-dinner scene, not a generic villa hero, card grid, split-screen, device mockup, or resort template. The water, bridge, planting, table setting, guests, window, and open kitchen door each serve the private-dinner narrative. No new section, card, rounded shell, stock gradient, glass, glow, decorative UI object, play control, generic copy, library theme, generated chef, or mobile stacking pattern was introduced. The only people generated in the architectural background are the already approved small secondary adult guests; the chef remains exclusively the user's exact documentary film.

## Video and brush-villa correction plan (2026-08-30)

The user explicitly rejected the complete water-bridge style and requested a simpler composition: retain the video itself and place a villa drawn as a loose brush sketch beside it, including a tree and table. The published 1672 × 941 water-bridge asset, current live-window mapping, existing film behavior, approved palette, 9:16 mobile requirement, and biography transition were audited before implementation. No external site or generic illustration kit is used; the direct user instruction and the existing project design system are the confirmed references.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Full photorealistic water-bridge courtyard | The user asked to remove this style entirely | Warm paper field with an original transparent brush vignette of a villa, olive tree, set dinner table, chairs, and herbs | The at-home meaning and approved forest/rust/wood/stone/umber palette |
| Film embedded inside a small architectural window | The user now wants the video itself to remain as the primary object | Independent square-edged 9:16 film plane with no screen or window metaphor | Exact no-grill MP4, poster, captions, muted autoplay/loop, viewport pause, reduced-motion fallback, no controls, and no blur |
| One continuous rendered scene | It binds documentary footage to a rejected visual style | One asymmetrical editorial field where real film and transparent drawing remain visibly different media | Quiet `01 — я у вас дома` label, existing section semantics, biography, and later page blocks |
| Mobile architectural crop | There is no longer a wide scene to crop | Exact 9:16 stage: film fills the left 56.25% at its native ratio; right-weighted brushwork appears beside it in the remaining paper field | No stacking, carousel, device chrome, or reduction of the film to a thumbnail |

The current block is not retained merely because it is already implemented: the latest direct correction replaces its visual premise. Components retained: `ChefStoryVideo`, `chef-story`, `story-villa-stage` as the section field, the label, biography, and all later content. Components reworked: the artboard markup, illustration asset, film wrapper role, sizing, reveal motion, contrast, and responsive composition. New functional component and UI library: none.

Illustration brief: one landscape PNG integrated into the exact paper field; loose dry-brush, ink, and gouache architectural notation; main marks weighted to the right two-thirds; simple Mediterranean/Cypriot façade with open entrance, one mature olive tree, a long set table, two woven chairs, and a few herb pots; visible unfinished strokes and generous paper gaps; approved project palette only. No people, chef, pool, bridge, resort styling, copied villa, photorealism, 3D, visibly hard image rectangle, text, logo, watermark, gradient, glow, splashes without purpose, or decorative objects beyond the requested dinner context.

Asset-generation note: built-in `imagegen` produced the requested composition at 1536 × 1024. Two explicit alpha-channel attempts returned RGB files with a rendered checker pattern rather than true transparency, so neither failed output is used. A third targeted edit replaced only that pattern with the approved warm paper tone; the final project PNG samples between `(244, 240, 229)` and `(246, 242, 233)` in empty areas around the project paper `(245, 241, 232)`, allowing the edges to dissolve without a frame while preserving the illustration itself.

Implementation must update source tests, run lint and the production build, preserve the existing social preview, verify the seven required widths with special attention to the exact 9:16 phone field, complete the anti-template audit, and prepare the existing public Sites project for a separately approved deployment.

Implementation result: `public/media/chef-story-brush-villa.png` is the final 1536 × 1024 built-in `imagegen` asset. It contains no person, chef, pool, bridge, text, logo, copied property, or device element. The generated scene is limited to the requested open villa entrance, olive tree, set dinner table, two chairs, and herb pots in dry-brush, ink, and restrained gouache marks. `app/page.tsx` no longer references the water-bridge asset and no longer maps the film into an architectural window; it renders an independent `story-villa-film` beside a decorative `story-villa-sketch` figure.

Desktop implementation uses an asymmetrical two-column paper field between structural hairlines. The real 9:16 film stretches to the available inner height while the right-weighted illustration extends into the remaining field without a card, frame, caption, shadow, or background effect. Tablet keeps the film dominant and moves the drawn façade/table closer rather than scaling both into equal cards. At 560 px and below, the complete stage is exactly 9:16; the film remains exactly 9:16 at `56.25%` of the stage width and the drawing uses the same visual height beside it in the central band, leaving deliberate paper above and below rather than stacking the media.

Validation result: lint, production build, both rendered-source tests, and `git diff --check` pass. Browser verification at 1440, 1280, 1024, 768, 430, 390, and 375 confirms the brush asset loaded at its native 1536 × 1024 size, the film remained at a measured `0.5625` width/height ratio, the MP4 reached ready state 4, and document-level horizontal overflow remained zero. Phone-stage ratios measured `0.562504`, `0.562503`, and `0.562501` at 430, 390, and 375 respectively, confirming the exact 9:16 field within subpixel rounding. The small label remained 10 px on desktop/tablet and 9 px on phone, and no console errors were recorded.

Final anti-template audit: the user explicitly asked for video beside drawing, so the two-media relationship is reference-led rather than an arbitrary generic split. The composition has unequal roles, one documentary source, one original project illustration, generous negative space, and a project-specific 9:16 phone field. It introduces no card grid, equal panels, rounded media, device chrome, generic luxury-villa render, gradient, glass, glow, icon, extra CTA, new marketing copy, stock art, generated chef, generated guests, or UI-library theme. Mobile remains one designed poster-like field rather than a desktop row mechanically stacked into a column.

## Brush-villa transfer implementation plan (2026-08-30)

The user directly requested that the approved brush-villa drawing move from the chef-story stage into the block headed `Расскажите мне, чего хочется`. The current page, final override rules, approved illustration, contact structure, earlier responsive rules, and source tests were audited before interface edits. This instruction changes placement and responsive composition only; it does not authorize a new image, copy, contact method, or visual style.

| Existing element | Why it now looks wrong | Confirmed replacement | Retained |
|---|---|---|---|
| Film and illustration share one chef-story stage | The mobile reference showed two competing rectangular media fields, and the latest instruction assigns the drawing to another narrative role | A centered independent 9:16 film on desktop/tablet and a full-stage 9:16 film on phone | Exact MP4, poster, VTT, muted autoplay/loop, viewport pause, reduced-motion behavior, square corners, label, biography |
| Sparse contact close with a detached right-column action | It does not yet express the imagined at-home evening, although the user has now assigned the approved drawing to it | Existing heading remains dominant; copy and action form the left inquiry path; the villa drawing anchors the right lower field | First-person copy, Instagram URL, section numbering, typography, palette, focus/hover behavior |
| Mobile contact as a reduced one-column desktop layout | An absolutely positioned illustration behind copy would harm legibility and repeat the failed collage problem | A dedicated wide illustration crop between heading and copy, followed by the full-width action | 20 px gutter, square geometry, no text overlay, no new UI control |

Components retained: `ChefStoryVideo`, `story-villa-stage`, `story-villa-film`, `story-villa-label`, `contact`, `contact-kicker`, `contact-action`, biography, all menu content, Footer, and the existing illustration asset. Components reworked: decorative figure location, chef-story stage alignment/sizing, contact grid, and phone-specific illustration crop. Genuinely new functional components and UI libraries: none.

Implementation constraints: use `public/media/chef-story-brush-villa.png` unchanged; keep it decorative with empty alternative text; do not overlay body copy on dense brushwork; do not crop or recolor the chef film; preserve the exact phone 9:16 stage; introduce no form, second CTA, stock asset, generated person, card, rounding, shadow, gradient, glass, glow, or template contact composition. After implementation, update source tests, run lint/build/tests, verify all seven required widths, and complete the anti-template audit before preparing a separately approved public deployment.

Implementation result: only the decorative figure moved. `ChefStoryVideo`, `chef-story`, the no-grill MP4, poster, caption track, muted autoplay/loop, viewport pause, reduced-motion fallback, and biography remain in their existing story section. The removed drawing leaves the documentary film as the single story-stage medium; on phones the film fills the exact 9:16 stage, while the compact label sits in the paper space immediately above it rather than over the footage.

`contact-villa-sketch` now follows the inquiry heading in semantic order and reuses the unchanged approved PNG with empty alternative text. Desktop keeps the heading across the editorial field, copy and the existing Instagram action at left, and the illustration at right. At 768 px and below the illustration becomes a full-width crop between heading and copy; at phone widths the 7:5 crop shows the open green-shuttered entrance, olive canopy, set table, chair, and herb pots without placing text over brushwork. The contact background uses the approved paper token so the asset edge dissolves without a card or mask effect.

Validation result: lint, production build, both rendered-source tests, and `git diff --check` pass. Browser verification at 1440, 1280, 1024, 768, 430, 390, and 375 px confirms zero horizontal overflow, a loaded villa image, and story-video ready state 4 at every width. The independent film retained a measured 9:16 ratio at all seven checks; phone stage ratios measured `0.562504`, `0.562503`, and `0.562501` at 430, 390, and 375 px. The inquiry action remains separated from the heading at every breakpoint, is 72 px high on phone, and retains the existing rust focus outline and forest hover state. Browser logs contain no errors.

Final anti-template audit: the change removes the failed two-media split rather than replacing it with another generic collage. The inquiry close is specific to the user's approved villa drawing and first-person dinner request; desktop and mobile use different compositions, and mobile does not merely stack the old desktop pair. No new card, rounded shell, form, testimonial, icon, generic CTA, stock asset, gradient, glass, glow, shadow, generated person, contact channel, or UI-library style was introduced. Decisions without a reference remain unchanged: verified contact methods beyond Instagram, service radius, dietary claims, and extended form states are still intentionally undefined.

## Proposal-only chef-story editorial spread (2026-08-30)

The latest phone screenshot shows that the drawing transfer succeeded but left the chef-story film reading as a full-screen embedded Reel: the tiny detached label does not supply enough hierarchy, the video has no editorial relationship with the biography beneath it, and the same solitary-media idea is too sparse on desktop. The user explicitly requested a beautiful mockup for both sizes, so this phase creates a proposal only and does not touch the live page, active CSS, video behavior, publication, or contact illustration.

Confirmed replacement principle: combine the unchanged portrait documentary film, existing `Я — у вас дома` language, verified facts, and the current MasterChef biography into one content-led editorial spread. Desktop uses a wide asymmetric field with statement at left, exact 9:16 film in the centre, and biography at right. Mobile remains a deliberate exact 9:16 paper poster, but the film becomes a smaller right-offset 9:16 plane; the left margin carries three existing facts and the biography begins immediately after the poster. The layouts therefore share hierarchy but are not mechanically stacked versions of each other.

Retained: real MP4/poster/VTT, paper/ink/rust/forest palette, Oranienbaum and Onest, square geometry, first-person voice, verified MasterChef statement, `до 20 гостей`, no sound control, and the already relocated contact illustration. Reworked in the proposal only: film scale, label hierarchy, biography proximity, and mobile information rail. New UI components, imagery, generated people, and libraries: none.

Implementation constraints for any later approved build: do not crop or recolor the film; do not add a device frame, blur, shadow, card, controls, second illustration, stock image, or invented claim; keep caption contrast; preserve an exact 9:16 mobile stage; verify all seven required widths before publishing. The mockup itself must use actual project media, fonts, palette, and copy so it can be judged without image-generation artifacts.

Proposal result: `desktop.html` and `mobile.html` plus inspected PNG previews are stored under `design/mockups/chef-story-editorial-spread-2026-08-30/`. They are deterministic HTML/CSS mockups rather than generated UI images. Both use the real edited MP4 and poster, exact Oranienbaum/Onest project fonts, paper/ink/rust/forest tokens, current captions, verified facts, and condensed existing biography copy. The active page, stylesheet, tests, published site, contact illustration, and social preview remain unchanged.

Visual verification: the desktop proposal rendered at the browser's normal 1280 × 720 viewport with no overflow and video ready state 4. The mobile proposal rendered at 390 × 844 with zero horizontal overflow, video ready state 4, and an exact poster ratio of `0.562503`. The two previews were inspected at native output size; hierarchy, heading wraps, video containment, caption contrast, factual rail, biography transition, and square geometry are readable at both sizes.

Proposal anti-template audit: the mockup is not a generic video/text card or symmetric split. Its three desktop zones reflect distinct content roles—service statement, documentary proof, and biography—while mobile uses a separately composed factual margin and right-offset film inside an exact 9:16 field. It adds no card shell, rounding, shadow, gradient, glass, device frame, icon, stock image, generated person, decorative animation, testimonial, or new conversion element. No UI library is used. Approval remains required before translating this proposal into the live responsive section.

## Approved chef-story editorial spread implementation plan (2026-08-30)

The user approved the editorial mockup and explicitly requested implementation on the site followed by a public link. The project structure, page semantics, final story overrides, `ChefStoryVideo`, MP4/poster/VTT behavior, contact illustration, proposal files, design tokens, responsive rules, and source tests were audited again before interface edits. The approved mockup is now a confirmed project reference rather than a proposal.

| Existing element | Why it looks templated or unresolved | Confirmed replacement | Retained |
|---|---|---|---|
| Solitary portrait film centered in a large ruled field | On phones it reads like an embedded social Reel; on desktop the unused paper has no narrative job | Approved mobile 9:16 editorial poster and desktop three-role magazine spread | Exact film, poster, VTT, muted autoplay/loop, viewport pause, reduced-motion behavior, square geometry |
| Tiny detached `01 я — у вас дома` label | It cannot establish a relationship between film, verified facts, and biography | Large Oranienbaum first-person statement plus a quiet documentary index | Existing wording, rust index, paper/ink palette |
| Biography as a distant generic two-column follow-up | Its separation makes the documentary proof and personal history feel unrelated | Biography becomes the third desktop role and begins directly after the phone poster | Complete factual paragraphs, MasterChef reference, first-person voice |
| Mobile as a scaled full-width desktop media plane | It does not create a mobile-specific reading path | Exact 9:16 paper stage with a 68% right-offset film and narrow three-fact rail at left | 20 px page gutter, caption track, full uncropped film |

Components retained: `ChefStoryVideo`, `story-villa-film`, `story-biography`, both story paragraphs, all video behavior and media, the contact illustration and every other page block. Components reworked: story wrapper semantics, statement hierarchy, fact presentation, biography placement, and responsive composition. Genuinely new functional components and UI libraries: none; the fact rail is semantic inline page content.

Implementation constraints: preserve the actual film without crop or recoloring; do not duplicate the VTT cue with a manual caption; do not move or alter the brush-villa illustration; introduce no new image, person, credential, CTA, card, frame, radius, shadow, gradient, glass, glow, icon, control, or generic template section. Update tests, run lint/build, verify 1440, 1280, 1024, 768, 430, 390, and 375 px, complete the anti-template audit, then publish to the existing public Sites project under the user's explicit authorization.

Implementation result: `app/page.tsx` now connects the service statement, three verified facts, the unchanged `ChefStoryVideo`, and the existing biography inside `story-editorial-layout`. Desktop uses a deliberately unequal three-role composition; tablet keeps statement and film together above a full-width biography; at 560 px and below the story stage is an exact 9:16 paper poster with the film at 68% width on the right and the facts in a 26% left rail. The biography follows 36 px below the mobile poster. The brush-villa figure remains unchanged and appears only in the inquiry close.

The first mobile browser pass exposed a real rendering defect: the existing view-timeline reveal clipped the zero-height mobile statement wrapper, hiding the title and fact rail. The final mobile rule explicitly removes animation, clip-path, and transform from that wrapper, and moves the film from 24.6% to 25.5% of the poster height. This preserves a visible title-to-film gap of 19.38 px at 430, 9.87 px at 390, and 6.62 px at 375 without changing the exact fixed-ratio stage.

Validation result: lint, production build, both rendered-source tests, and `git diff --check` pass. Browser verification at 1440, 1280, 1024, 768, 430, 390, and 375 px records zero document-level horizontal overflow, video ready state 4, one caption track, and a loaded contact illustration at every width. Film width/height ratios remain between `0.562502` and `0.562507`; mobile stage ratios measure `0.562504`, `0.562503`, and `0.562501` at 430, 390, and 375 respectively. Fact-to-film horizontal gaps are 23.41, 21, and 20.11 px on those phones, and the biography begins exactly 36 px after each stage. Screenshots were inspected at 1280, 1024, 768, and 390 px; heading wraps, caption contrast, factual rail, biography transition, and contact illustration remain legible. Browser logs contain no warnings or errors.

Final anti-template audit: the former isolated Reel treatment has been replaced by the exact approved editorial mockup rather than a generic video card or equal split. Content roles determine the geometry, desktop and mobile use separately designed compositions, the portrait media remains honest and uncropped, and the only added elements are verified text facts. No library theme, card shell, repeated grid, radius, shadow, gradient, glass, glow, device chrome, icon, stock media, generated person, additional illustration, CTA, marketing claim, or decorative animation was introduced. Decisions without references remain unchanged: contact methods beyond Instagram, service radius, dietary claims, and form/loading/error states are still intentionally undefined.

## Mobile chef-story refinement plan (2026-08-30)

The user requested a second inspection of the live mobile site, then approved the four resulting corrections. The published page was inspected at 375, 390, and 430 px, with additional screenshots of the hero, biography, bespoke-menu transition, inquiry illustration, action, and Footer. No horizontal overflow, browser warning, browser error, undersized interactive target, missing media, or structural failure was found. The hero, film scale, title, biography typography, menu, villa illustration, body copy, actions, and Footer remain approved and are outside this edit.

| Existing detail | Measured problem | Approved correction | Retained |
|---|---|---|---|
| Stage bottom border plus biography top border | Two adjacent hairlines and a 116 px film-to-kicker transition make the narrative pause feel longer than intended | Keep the stage hairline, remove the phone biography border, and reduce its margin/padding | Exact stage ratio, biography content and body rule |
| 8–9 px index and fact text | The 375 px layout reduces essential factual copy to approximately 8 px | Set both mobile metadata roles to a 9 px minimum and reduce tracking slightly | Onest, uppercase treatment, rust numbering, three verified facts |
| Fact rail ends well above the film | The last fact leaves a visually inactive lower-left strip beside the moving image | Extend the rail to 61% of stage height and distribute three rows evenly | 26% rail width, 68% film width, asymmetric poster geometry |
| Default caption box | The opaque black cue looks heavier than the paper-based editorial system | Style the existing `::cue` with smaller type, ivory text, and translucent ink | Original VTT wording, timing, caption track, no manual duplicate |

Components retained: all JSX, `ChefStoryVideo`, film/poster/VTT sources and behavior, exact 9:16 stage, 68% film plane, biography, hero, menu, inquiry close, Footer, illustration, actions, and design tokens. Components reworked: mobile-only story metadata sizing, fact-rail height/distribution, biography transition spacing/border, and cue presentation. New components, assets, content, UI libraries, and interactions: none.

Implementation constraints: change only final CSS overrides and source assertions; do not alter markup, media, caption text/timing, film crop, illustration, contact action, or desktop composition. After implementation, run lint/build/tests, inspect 1440, 1280, 1024, 768, 430, 390, and 375 px, verify cue rendering where supported, repeat the anti-template audit, and publish the validated source to the existing public Site.

Implementation result: only `app/globals.css` and its source assertions changed. The mobile story index is now 9 px with reduced tracking; factual text remains at least 9 px, uses a three-row grid, and occupies a 61%-high rail whose lower edge aligns with the film within one rendered pixel. The phone biography now has no duplicate top border and uses a 24 px stage margin plus 18 px internal pause. The existing VTT cue uses the project's ivory/ink colors, 82% type, and a 64%-opaque ink background where the browser supports `::cue` styling. No JSX, media, copy, or interaction changed.

Validation result: lint, production build, both rendered-source tests, and `git diff --check` pass. Browser screenshots were inspected at 1280, 768, 430, 390, and 375 px, with computed checks at all required widths: 1440, 1280, 1024, 768, 430, 390, and 375. Every width records zero horizontal overflow, film ready state 4, one caption track, and a loaded inquiry illustration. Film ratios remain between `0.562502` and `0.562507`; phone stage ratios remain between `0.562501` and `0.562504`. At 430, 390, and 375 the fact rail ends within `0.72`, `0.50`, and `0.42` px of the film, the biography begins 24 px after the stage, and the film-to-biography kicker gaps measure 86.59, 81.96, and 80.23 px. Mobile fact sizes measure 9.245, 9, and 9 px respectively, and the biography top border is zero while the stage retains its single 1 px bottom rule. Browser logs contain no warnings or errors.

Final anti-template audit: the refinement removes redundant structure and uses the existing verified facts to balance the approved poster; it does not add visual filler or replace the composition. Desktop and tablet remain unchanged. No card, radius, shadow, gradient, glow, glass, icon, stock media, generated content, invented fact, new CTA, new interaction, library theme, or decorative animation was introduced. The hero, menu, inquiry illustration, action, and Footer were visually rechecked and retain their approved project-specific roles. Decisions without references remain unchanged: contact methods beyond Instagram, service radius, dietary claims, and form/loading/error states are still intentionally undefined.

## Independent UX remediation implementation plan — 2026-08-30

The independent read-only audit identified conversion, accessibility, loading and release-traceability issues without rejecting the approved visual direction. The user's direct instruction `Исправь всё` authorizes a bounded functional correction but not publication.

Unresolved elements: the social preview shows a different generated-looking person; inquiry labels conceal the Instagram destination; the phone/tablet hero forces 1160 px while removing internal navigation; representative formats arrive late; essential facts fall to 8.5–9 px; biography copy uses vague travel/restaurant authority; persistent autoplay has no page pause; the dedicated 8.6 MB film uses eager preload; later images are eager; and superseded CSS increases regression risk.

Confirmed replacement sources: real project portraits and documentary stills, the approved hero and editorial story, the user's audit-fix instruction, the verified `@evg.chef` profile, current paper/forest/rust tokens and the required service → trust → formats → Instagram path. No external style or UI library is needed.

Retained: the one-page route, approved asymmetric mosaic, `Я — ваше меню`, first-person voice, editorial story spread, exact videos/posters/VTT, three existing formats, bespoke process, contact illustration, sparse Footer, square geometry, project fonts, muted playback and reduced-motion fallback.

Reworked: social preview, hero service/format microcopy and internal route, all Instagram labels and accessible names, biography specificity, inquiry expectations, media pause/resume, microtype/contrast tokens, mobile hero floor, image loading, dense-image derivatives and regression assertions. Genuinely new functional elements: one skip link and one shared video-motion toggle.

Decisions intentionally not invented: service geography/radius, exact MasterChef edition or season, named restaurants, price/minimum spend, confirmed inclusions, dietary guarantees, response time and additional channels. Copy may ask for missing event details and explain the proposal step without asserting them.

Before completion: run lint, production build, rendered-source tests and `git diff --check`; verify keyboard focus, pause/resume and fallback states, external-link expectations, request strategy, zero overflow, target sizes, headings and media at 1440, 1280, 1024, 768, 430, 390 and 375 px; then record the final anti-template audit. Do not publish.

Implementation result: the approved composition and all documentary originals remain intact. The hero now identifies the private-chef service and three formats before scrolling, includes a direct internal route to formats, and uses Instagram-specific external labels with accessible new-tab names. The inquiry close asks for date, location, guest count, desired character, preferences and restrictions, then explains the personal-proposal step. Vague travel/restaurant authority and the inconsistent catering label were removed.

Accessibility and motion result: a keyboard skip link targets the main landmark; essential microtype is at least 11 px; focus styling covers links and buttons; persistent videos share a 44 px text-labelled pause/resume state; viewport and reduced-motion changes pause both sources; autoplay attributes and eager video preload are absent; the music-only VTT is retained but is not forced into a permanent visual cue.

Delivery result: one anchor portrait is the only preloaded/high-priority mosaic image. The other 59 mosaic images use lazy loading, asynchronous decoding and local WebP derivatives. The 63 generated derivatives total approximately 1.4 MB while every documentary original remains preserved. Below-fold stills declare dimensions and lazy decoding. Trusted canonical, Open Graph, favicon, robots and sitemap metadata no longer depend on forwarded request headers. The real-chef 1200 × 630 preview replaces the mismatched identity. The edge worker adds cache policy and byte-range fallback for video delivery.

Validation result: production build, ESLint, five rendered/source/delivery tests and `git diff --check` pass. Tests cover the conversion path, trusted metadata, WCAG contrast roles, one-image preload strategy, 60-image composition, lazy delivery, motion state, reduced motion, 44 px controls, optimized derivatives, social dimensions, cache headers and video range responses. A live local-browser pass at the seven mandatory widths could not be completed because browser access to `localhost:3001` was denied by the environment; no bypass or alternate browser was used. Static breakpoint/source assertions cover 1024, 768 and 560 px behavior, but final visual sign-off at 1440, 1280, 1024, 768, 430, 390 and 375 px remains an explicit release check rather than a claimed result.

Final anti-template audit: no new card grid, FAQ, pricing, testimonial strip, stock avatar, icon row, rounded shell, shadow, gradient, glass, glow, decorative object, generic marketing section, generated chef, unrelated media or library theme was introduced. The previous CSS history was reduced to active selectors, and the remaining page sequence is the approved project-specific journey: documentary author field → editorial proof → bespoke formats → illustrated inquiry. Decisions without sources remain absent: geography, radius, MasterChef edition, restaurant names, pricing, dietary guarantees, response time, extra contact channels and form states.

Files created: `app/hero-mosaic-video.tsx`, `app/media-motion.tsx`, `app/robots.ts`, `app/site-config.ts`, `app/sitemap.ts` and `public/media/optimized/`. Files changed: `app/chef-story-video.tsx`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `worker/index.ts`, `tests/rendered-html.test.mjs`, `public/og.png`, `public/favicon.svg` and the three active design documents. No commit, saved Site version or deployment was created.

## Consolidated three-audit release plan — 2026-08-30

The user asked to apply the frontend, color/reference and UX conclusions together and publish the result. The three reports agree on the same bounded direction: keep the approved documentary mosaic, editorial story, bespoke formats and illustrated inquiry; correct performance, accessibility, trust, metadata and conversion clarity without introducing a new visual style.

The current shared implementation was reviewed against all three reports, `DESIGN_REFERENCE_MAP.md` and `DESIGN_SYSTEM.md` before release edits. The only remaining visible conflict appears at phone widths: the transparent internal formats action crosses a bright documentary portrait, and the full-width motion control competes with the primary conversion action. The confirmed replacement uses the existing guaranteed `--hero-base` contrast color behind the secondary action and restores the motion control to its intrinsic compact width. No copy, media, layout hierarchy, component, asset, claim, radius, shadow, gradient, glass, glow or library style is added.

Retained components: every page block, both videos, shared pause state, hero actions, all text, the approved illustration, optimized media, metadata, cache/range behavior and responsive compositions. Reworked components: phone-only secondary-action surface and phone-only motion-control width. New components: none.

Release verification must cover production build, lint, source/delivery tests, `git diff --check`, keyboard focus, visible pause state, target sizes, missing media, horizontal overflow and inspected screenshots at 1440, 1280, 1024, 768, 430, 390 and 375 px. The final public version may be saved and deployed only after those checks pass.

The first local production-server pass exposed a delivery-only regression: its runtime does not inject the Cloudflare `ASSETS` and `IMAGES` bindings used after deployment, while the new cache/range branch assumed they were always present. The worker now applies image optimization and static-asset interception only when those bindings exist, then falls through to vinext's normal local handling otherwise. Hosted behavior, cache policy and byte-range behavior remain unchanged because Sites supplies the bindings there.

Consolidated validation result: the production build, ESLint, five rendered/source/delivery tests and `git diff --check` pass. The local production server returns 200 for the page, robots and sitemap, with no worker binding exception. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px recorded zero horizontal overflow, no broken images after the lazy-loading pass, two synchronized video controls, 44 px minimum interactive targets and 11 px minimum essential metadata. Screenshots of the hero, story, formats, menu, inquiry and Footer were inspected at representative desktop, tablet and phone widths. At 375 px the phone-only secondary action now keeps its contrast over the documentary mosaic and the motion control measures approximately 122 × 44 px rather than spanning the full content width. Pause and resume update both controls and both videos together.

Final consolidated anti-template audit: the release preserves the approved project-specific sequence and its asymmetric editorial geometry. It adds no repeated card system, stock testimonial, generic CTA section, stock gradient, glass, glow, floating decoration, arbitrary radius, default UI-library theme, invented credential or mobile layout made by merely stacking desktop panels. The only post-audit visual changes use already approved hero tokens to solve measured contrast and hierarchy problems. Decisions without confirmed references remain explicitly unimplemented: service geography and radius, exact MasterChef edition, pricing, named restaurant history, dietary guarantees, response time, extra contact channels and form/loading/error states.

## Urgent mobile hero decongestion plan — 2026-08-30

The user supplied a 23:04 phone capture showing a concrete regression in the live first screen. The service statement remains readable, but two full-width CTA panels, the pause control, a duplicate three-format rail, the author portrait, the 16:9 film and the dense supporting mosaic all compete in one continuous field. When the mobile browser restores a position inside the hero, the absolute header also disappears above its chrome and leaves only a clipped fragment of the Instagram action.

Confirmed replacement: preserve the approved words, palette, portrait, film, inquiry path and media control, but give each a single role on narrow screens. Use the existing `--hero-base` surface as a calm upper reading field; keep the header sticky only within the hero; retain one full-width forest inquiry action on phones; reduce the phone formats route to a quiet 44 px text action; keep the pause control compact; remove the duplicate format rail because the paragraph already names all three formats; and reduce the documentary field at 768 px and below to the author portrait plus one offset film. Wider layouts retain the complete sixty-image field and current hierarchy.

Retained components: the header links, hero heading and paragraph, both actions, `MediaMotionControl`, `HeroMosaicVideo`, all source media, every breakpoint above 768 px and every following page section. Reworked components: narrow-screen header positioning/surface, phone action hierarchy, narrow-screen format duplication and narrow-screen mosaic map. New components, copy, claims, assets and UI libraries: none.

Implementation may begin only against this supplied capture and the active hero system above. Validation must include production build, tests, lint, `git diff --check`, a restored-scroll header check, action and media-control target sizes, pause synchronization, overflow and screenshots at 1440, 1280, 1024, 768, 430, 390 and 375 px. Publication is authorized by the user's urgent request for the live site correction.

Implementation result: CSS only re-composes the hero at 768 px and below. The header uses an opaque sticky position constrained by the hero; the reading field is fully calm through the copy and actions; only the author portrait and the existing 16:9 film remain visible in an offset lower documentary field. The duplicate format rail is removed at these widths. At 560 px and below the primary Instagram action remains full width, the formats route becomes a quiet underlined 44 px action, and the shared pause control stays approximately 122 × 44 px. All wider hero rules, source images, copy, interactions and following sections remain unchanged.

Validation result: production build, ESLint, five rendered/source/delivery tests and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px record zero horizontal overflow, zero broken images, zero sections outside the viewport and no undersized visible target after entry animation. The 1440/1280/1024 hero retains the complete documentary map and format rail; 768/430/390/375 show exactly the two intended documentary frames and no duplicate rail. Screenshots were inspected at 1440, 768, 430, 390 and 375 px. A restored 180 px phone scroll keeps the header at viewport top while it remains inside the hero. Activating either pause control sets both controls to `aria-pressed=true` and pauses both videos.

Final anti-template audit: this correction removes simultaneous evidence layers instead of adding a replacement card, banner or decorative object. The narrow-screen composition is not a stacked desktop hero: it assigns separate reading and documentary fields, preserves asymmetric overlap, and uses only confirmed project media and tokens. No new claim, asset, component, library theme, radius, shadow, glass, glow, stock gradient, generic CTA group or animation was introduced. Decisions without confirmed references remain unchanged: service geography and radius, exact MasterChef edition, pricing, named restaurant history, dietary guarantees, response time, extra contact channels and form/loading/error states.

Implementation result: at 768 px and below the header is sticky only inside the hero and uses the approved opaque hero surface. Narrow-screen copy remains in a calm upper field, the redundant format rail is hidden, and the lower documentary field retains only the author portrait and one 16:9 film. On phones the primary inquiry stays full width, the formats route becomes an underlined 44 px text action, and the motion control stays compact. Layouts above 768 px keep the complete documentary mosaic and existing action hierarchy. No component, copy, claim, asset, library, radius, shadow, glow or decorative object was added.

Validation result: the production build, ESLint, all five rendered/source/delivery tests and the final whitespace check pass. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px found no horizontal overflow or visible broken image. Widths above 768 px keep sixteen direct mosaic tiles and the supporting contact sheet; 768/430/390/375 px expose exactly two direct media tiles and hide the duplicate sheet and format rail. Visible interactive targets are at least 44 px high, the two video controls pause and resume together, the header remains at the viewport top during restored hero scroll and leaves with the hero, and the browser reports no warning or error. The menu and inquiry anchors were also inspected at 375 px. Final anti-template audit found no new card system, default library style, stock gradient, glass, glow, repeated generic section or desktop-only mobile stacking.

## Repository consolidation — 2026-08-30

At the user's request, the working tree is reduced to the active site and the references that still govern it. The approved editorial story mockups, final brush-villa inquiry illustration, active no-grill story film, hero film, documentary stills, optimized delivery assets and current design documents remain. The rejected 25-direction villa study, its temporary refinement worktree, superseded villa and kitchen renderings, replaced full-length/archived films and their inactive caption files are removed from the active repository. They remain recoverable from Git history and are not interface dependencies.

## Light hero implementation plan — 2026-08-30

The user reviewed two generated studies and explicitly selected `artifacts/hero-concepts/hero-variant-01-light-paper.png`. This selection supersedes the full-screen dark hero veil while preserving the documentary collage, exact first-person copy, actions, real local media, motion behavior and all following sections.

Templated elements found: none in the page structure. The current failure is a visual treatment: the 78–92% horizontal dark veil combined with the vertical veil turns most documentary frames into an indistinct background, while the portrait and film rise above it as detached cards. The confirmed replacement uses the approved paper/ink/copper/forest system already present throughout the site and the reference principles recorded in `artifacts/hero-audit/README.md`: separate reading from evidence, retain natural image exposure, and let content determine frame hierarchy.

Retained components: header links, hero copy, both actions, format line above 768 px, shared media control, all sixty still sources, original hero film, optimized delivery, subsequent sections and responsive content rules. Reworked elements: hero/header color roles, paper-to-collage division, portrait source hierarchy, media plane, focus states and narrow-screen paper field. New components, copy, claims, stock assets and UI libraries: none.

Implementation sequence: make the header and left reading field opaque paper; move the documentary mosaic to the right above 768 px; use the unwashed real portrait as the large anchor; replace the full-screen veil with only a narrow paper seam; place portrait, film and supporting frames on one plane; translate the existing two-frame narrow-screen composition to a paper field; update regression assertions; then run lint, build, tests and the seven mandatory visual widths before the final anti-template audit. No publication is authorized by this request.

Implementation result: the hero and header now use the approved `--paper` surface with `--ink`, `--muted`, `--rust` and `--forest` roles. Above 768 px the paper reading field occupies 44–52% according to breakpoint and the complete documentary grid begins at its right edge. The former two-axis black veil is removed; its element is a one-pixel paper/media rule on wider screens and a short paper-to-transparent transition only where the narrow-screen media montage meets the controls. The real, unwashed `chef-portrait.jpg` is the large anchor, the secondary portrait source is moved into a supporting cell, and the film retains natural color without a detached border. All copy, actions, source media, video behavior and following sections remain unchanged.

Verification result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px found zero horizontal overflow, zero heading overflow, zero broken images and a 44 px minimum visible target. Widths above 768 px expose sixteen direct mosaic items plus the supporting sheet; widths at and below 768 px deliberately expose two media items. The 1440 hero reports all sixty documentary images and sixty-one fully visible media tiles including the film after the entry sequence. The hero film reaches ready state 4, computes to `filter: none`, and the shared pause action pauses both video elements before restoring playback. The hero focus outline computes to the approved forest 2 px ring, and the browser console contains no warning or error. Final screenshots are stored in `artifacts/hero-light-implementation/`.

Final anti-template audit: the redesign removes the full-screen dark veil and detached foreground treatment without introducing a generic split-template, card system, bento preset, stock gradient, glass, blur, glow, shadow, radius, generated person, invented copy or library-default theme. The asymmetrical field remains specific to the project's real documentary material, while narrow screens retain their separately composed two-frame evidence field. No publication was performed.

## Chef-story copy and ornament correction plan — 2026-08-30

The user supplied a 23:44 mobile capture of the active `Я — у вас дома` spread and identified four concrete issues: the pause overlay blocks the working image, `документальный фрагмент` is redundant, the career copy needs a stronger connection to private guests, and the otherwise spare paper field needs restrained pattern detail. The direct content brief now also confirms that the chef won MasterChef, travelled across Europe and brought recipes back for private guests.

Templated elements found: none in the section structure. The problem is local hierarchy and finish. The overlay behaves like player chrome instead of editorial content; the metadata label repeats what the film already proves; the current biography avoids the newly confirmed Europe journey; and adding an unrelated ornamental asset would create untraceable decoration.

Confirmed replacement: keep the approved three-role desktop spread and exact phone poster, remove only the story-local pause control and the redundant label, retain the single hero motion control for both muted videos, and place one concise first-person line directly beneath the story film. Derive the requested ornament from the checkered wooden chopping board visible in the supplied capture and the actual film, using the existing paper/rust/forest/rule palette as a sparse square weave rather than importing a botanical or luxury pattern.

Components retained: `ChefStoryVideo`, exact MP4/poster/VTT, viewport playback, reduced-motion behavior, statement, three verified facts, biography, all responsive grids and every other page section. Components to rework: story index copy, fact wording, film wrapper, local control placement, the short film note, biography paragraphs and the chef-story responsive ornament rules. New components genuinely required: one semantic caption paragraph and two decorative `aria-hidden` pattern spans inside the existing story section. UI libraries used: none.

Implementation may begin after this plan. Verification must cover lint, production build, source/render tests, `git diff --check`, the seven mandatory widths, absence of the story overlay and removed phrase, video readiness, zero overflow, readable heading wraps and the final anti-template audit. Publication follows the active Sites workflow after validation.

Implementation result: the story-local `MediaMotionControl` and its overlay styles are removed, while the single hero motion control continues to synchronize both muted videos. The visible phrase `документальный фрагмент` is removed and the folio remains as the quiet accessible section marker `Раздел 1 — о шефе`. The fact rail now reads `победитель MasterChef`, `рецепты из Европы` and `лично для компаний до 20 гостей`. A concise first-person caption beneath the film says: `Победив в MasterChef, я объездил Европу и привёз рецепты для частных вечеров.` The biography now connects that journey to techniques, authored menus and personally led private events without adding a season, restaurant name, price or geographic service claim.

Pattern result: two square-weave accents use CSS only and deliberately echo the checkered wooden chopping board visible in the real story film. One small accent balances the folio/title field; one narrow band closes the caption beneath the video. Both use only the approved rust, forest and paper system, remain `aria-hidden`, and add no image request, logo, icon, stock ornament, shadow, radius or generic luxury motif.

Validation result: production build, ESLint, all five rendered/source/delivery tests and the whitespace check pass. The active page was browser-checked at 1440, 1280, 1024, 768, 430, 390 and 375 px. Every width reports zero horizontal overflow, zero broken images, two ornament elements, no story-local control, no `документальный фрагмент` text and no current warning/error after a clean reload. At phone widths the film remains right-offset, the 11 px fact rail stays readable, the short caption fits between the film and biography, and the heading remains inside the viewport. At tablet and desktop widths the caption stays directly below the 9:16 film and the unequal statement/film/biography roles remain intact.

Final anti-template audit: the change removes player chrome and redundant metadata, strengthens one factual narrative, and adds only a film-derived detail. It introduces no card, repeated section, stock gradient, mesh, glass, glow, decorative blur, generated person, botanical stock pattern, UI-library theme, generic CTA, device frame, autoplay sound or desktop-only mobile stacking. The requested ornament is traceable to the project’s own footage and the supplied capture; no major visual decision remains without a reference.

### Ornament proportion correction — 2026-08-31

The user’s 00:37 desktop captures explicitly approve the compact square weave beside `Я — у вас дома` and reject the full-width version beneath the film. The problem is proportion, not motif: stretching a small woven module across the whole video column turns it into an unrelated page divider.

Confirmed correction: retain the left module unchanged and give the film-side instance the same compact width, height, tile scale and opacity. Align it to the right edge beneath the short caption so it remains a secondary signature rather than a border. Desktop, tablet and phone must all preserve the compact module; no new ornament, asset, component, color or content is required.

Implementation result: the rejected full-width `story-square-weave-film` band is replaced by the same 72 × 24 px module used beside the statement and aligned to the video column’s right edge. At phone widths both modules resolve to 48 × 18 px; the film width is reduced from 64% to 62% solely to preserve the complete lower module inside the exact 9:16 paper stage rather than clipping it into a one-row line.

Validation result: production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm matching module dimensions, zero horizontal overflow and zero broken images. The right module is 72 × 24 px through tablet and 48 × 18 px on phones; at 375 px its bottom remains inside the poster stage with the full two-row weave visible. Final anti-template audit: the correction removes the border-like treatment and introduces no new decoration, asset, component, library style or content.

## Ingredient sourcing editorial route plan — 2026-08-31

The user asked to expand the existing `Я нахожу продукты` passage with three exact sourcing promises and mandatory photography: rack of lamb, fresh fish with working fishermen, and fruit/vegetables from a Cyprus farm. The project structure, active menu section, current media classes, responsive rules, design map and design system were audited before interface edits. The existing numbered step is factual and not templated, but it compresses the strongest differentiator into one paragraph and gives the visitor no visual evidence of the effort involved.

Confirmed replacement sources: the user’s direct wording and four licensed photo references found specifically for this task — Daniel & Hannah Snipes’ fresh lamb rack photograph and Karim Ayman’s fishermen/catch photograph from Pexels, plus Hannes Grobe’s aubergine field on Cyprus (CC BY 3.0) and JanRehschuh’s orange on a Cyprus tree (CC BY-SA 3.0) from Wikimedia Commons. The two Pexels photographs are editorial illustrations, not documented Cyprus suppliers. The two Commons photographs verify Cyprus agriculture but not a relationship with Evgen. This distinction must remain visible in the copy/credits and in the reference map.

Templated elements found: none that require removal. The risk in the requested addition is a generic equal three-card row. The confirmed replacement is one asymmetric sourcing field whose image geometry follows content: a vertical meat-market close-up, a taller working-fishermen portrait and a layered Cyprus farm scene. All photographs remain square-edged, untreated and locally hosted; captions are direct first-person statements rather than marketing blurbs.

Components retained: menu heading, menu lede, all three numbered process rows, event formats, menu atlas, section colors, fonts, rules and all following sections. Components to rework: the second process-step wording and the space between the process list and event formats. New component genuinely required: one semantic `source-journey` figure group with three scenes and a compact credit note. UI libraries used: none.

Implementation plan: save the four selected licensed images locally at display-appropriate dimensions; insert the sourcing field after the process list; use the exact corrected Russian lines `Хотите ягнёнка? — еду за ним в горы.`, `Нужна рыба? — еду в порт к рыбакам.` and `Свежие овощи и фрукты? — только с кипрских ферм.`; add source/author/license links; design a separate phone reading sequence; update rendered-source assertions; then run lint, production build, tests, `git diff --check`, image checks and the mandatory seven-width visual audit before publication.

Decisions without references remain explicitly absent: the names and locations of Evgen’s real shepherds, fishermen, markets or farms; seasonal availability; procurement timing; organic certification; and a guarantee that every ingredient is always sourced from the pictured place. Those inputs are blockers only for presenting the images as documentary supplier proof, not for the clearly labelled editorial route requested here.

Implementation result: the second process step now names the complete trip to the source, and a semantic `source-journey` section follows it before the event formats. The route uses the exact requested first-person lines, a 4:5 butcher-display frame for fresh lamb rack, a 2:3 fishermen/catch frame, and a two-image Cyprus farm composition that pairs vegetables growing in the field with fruit on the tree. All four WebP assets are stored locally. The compact provenance block states that the photographs do not identify Evgen’s actual suppliers and links every source; the two Commons assets include author and CC license links.

Responsive result: desktop uses one 12-column asymmetric editorial field. At 768 px and below, the scenes become a deliberate vertical route with a left-aligned lamb frame, a narrower right-aligned fishermen frame, and a full-width paired farm image. Phone crops keep the rack, catch, aubergines and orange recognizable; captions remain adjacent to their media instead of becoming detached cards or a horizontal carousel.

Validation result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px record zero page or internal text overflow, four loaded sourcing images, the exact 1600 × 2400 lamb-rack asset, no broken media, no console warnings/errors and 44 px minimum source-link targets. Screenshots were inspected at 1440, 768 and 390 px, including the lower farm/credit area.

Final anti-template audit: the addition is not an equal card row or a reusable gallery preset. Image proportions, offsets and caption positions differ according to mountains, port and farm content; mobile reorders density rather than shrinking the desktop grid. The section introduces no radius, shadow, glass, glow, gradient, icon, badge, carousel, fake partner, generated supplier, library-default component or decorative animation. UI libraries remain infrastructure-only and contribute no visible default styling.

Files created for this change: `public/media/sourcing/lamb-rack-market.webp`, `public/media/sourcing/fishermen-catch.webp`, `public/media/sourcing/cyprus-aubergine-field.webp`, `public/media/sourcing/cyprus-orange-tree.webp` and `public/media/sourcing/CREDITS.md`. Files changed for this change: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. The unresolved limitation is documentary provenance for Evgen’s real suppliers; it is stated in the interface rather than concealed.

## Lefkaritika ornament replacement plan — 2026-08-31

The user explicitly rejects both active checker fragments as “not a pattern” and asks for a Cyprus-style ornament in the same palette that fills the block’s available space. This instruction supersedes the earlier compact square-weave approval and proportion correction. The section grid, exact phone stage, ornament selectors, active documentation and current uncommitted sourcing-route work were audited before edits; the sourcing-route work is independent and must remain untouched.

Confirmed references: the user’s direct scale, origin and palette instruction; UNESCO’s description of Lefkaritika as a combination of hemstitch, cut work, satin-stitch filling and needlepoint edging; and the official Visit Cyprus description of Lefkaritika as a traditional handmade lace from mountainous Lefkara. The implementation extracts the principles of open geometric lattice, solid/void alternation and stitched edging without copying any one textile or tourism asset.

Templated element found: the two 12 px checker gradients read as generic pixel decoration and leave most of the intended negative field empty. Confirmed replacement: one responsive CSS motif system with open diamonds, alternating rust/forest stitch marks and paper cut-work voids. The statement instance must flex between heading and facts; the film instance must occupy the complete reserved width beneath the caption. Phone composition must crop the same motif deliberately into the stage’s paper reserves rather than shrink it into another icon.

Components retained: complete story layout, folio, heading, three facts, exact film/poster/VTT, caption, biography, motion behavior, all copy and every other section. Components to rework: the two decorative spans and their responsive geometry only. New components, assets, claims and UI libraries required: none.

Implementation may begin after this record. Validation must include lint, production build, rendered-source tests, `git diff --check`, live video/caption integrity, zero overflow and visual review at 1440, 1280, 1024, 768, 430, 390 and 375 px. The anti-template audit must specifically reject a generic Greek-key border, repeated checker pixels, copied lace artwork and a phone layout that merely scales the desktop field.

Implementation result: both `story-square-weave` fragments and their 12 px checker gradients are removed. The two decorative spans now use the shared `story-cyprus-lace` system: crossing rust/forest threads create the open diamond lattice; alternating filled stitch marks and paper voids create the solid/cut-work rhythm; contrasting three-pixel edge runs close the field without turning it into a page border. The statement field flexes to fill the complete space between heading and facts (approximately 299–429 px high across checked desktop widths), while the film field spans its complete 340–410 px column and keeps a 72–80 px depth. At 768 px the paired fields measure approximately 361 × 353 px and 325 × 82 px; on phones the motif is deliberately cropped to the free top-right reserve and the full film-caption width rather than scaled down as a miniature icon.

Validation result: production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass with the independent sourcing-route work preserved. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report two visible ornament fields, zero document overflow, zero ornament overflow, zero broken images, no story-heading overflow, and visible film/caption geometry. Desktop, tablet and phone screenshots were inspected; the console contains no warnings or errors. Final anti-template audit: the rejected checker pixels are absent; the field is neither a generic Greek-key strip nor a copied lace image, card, gradient effect, SVG illustration or library decoration. Its scale follows each content reserve, and the phone crop is composed separately from desktop.

## Selected ornament mockup №5 implementation plan — 2026-08-31

The user reviewed five purpose-made story-block mockups and selected variant №5. The confirmed reference is now stored at `design/mockups/chef-story-ornament-variant-05.png`. This selection supersedes the active CSS-only line lattice but does not change the story grid, copy, film, facts, biography, motion behavior or any other page section.

Reference principle: translate only the selected ornament language — olive foliage, a few citrus blossoms, terracotta fruit, large open diamonds, warm paper and visibly handmade textile marks — into project-ready decorative assets. Do not place the complete generated screenshot in the site, regenerate food or people, alter typography, or turn the artwork into a small endlessly repeating wallpaper.

Templated element found: the active CSS lattice is structurally sound but visually generic compared with the user-approved composition. Confirmed replacement: one square transparent master field for the tall/square statement reserve and one independently composed transparent horizontal continuation below the film caption. Both are local project assets and use the approved paper/forest/rust palette.

Components retained: all story semantics and geometry, exact media, facts, biography and responsive stage. Components to rework: decorative backgrounds and their asset preload behavior only. New components and UI libraries: none. New assets genuinely required: the square tapestry, the horizontal continuation and the archived approved mockup.

Implementation may begin after the two final assets are generated and inspected. Validation must cover alpha/background integrity, recognisable olive/diamond motifs, build, lint, rendered-source tests, `git diff --check`, zero overflow and the required 1440, 1280, 1024, 768, 430, 390 and 375 px visual audit before publication.

Implementation result: the generic CSS lattice and both pseudo-element stitch layers are removed. The statement reserve now uses the local transparent square asset `public/media/story-cyprus-tapestry-square.png`; the film-caption reserve uses the independently composed transparent horizontal asset `public/media/story-cyprus-tapestry-strip.png`. Both preserve the selected mockup’s hand-painted olive branches, terracotta fruit, sparse citrus blossom and open diamond/star geometry. They remain non-repeating, use the existing paper field as their ground and are cropped independently by the two established responsive slots. The approved mockup is archived in `design/mockups/chef-story-ornament-variant-05.png`; no complete screenshot is used at runtime.

Asset integrity result: the final PNGs are 1254 × 1254 and 2172 × 724 with genuine alpha channels. Neutral generation-preview pixels were removed from the alpha field before integration; the painted motifs, palette and texture remain intact. The square and strip are local, have no text, people, food, logo, frame, shadow or baked page background.

Validation result: production build, ESLint, all five rendered/source/delivery tests and both working-tree and staged whitespace checks pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report two loaded ornament backgrounds, zero document overflow, zero ornament overflow, zero broken images, no story-heading overflow and a visible film caption at every width. The statement field ranges from 235–341 px wide and 299–429 px high on desktop, becomes 361 × 353 px at 768 px, and uses a deliberate 42 px top-right crop on phones; the film continuation remains 72–82 px deep on desktop/tablet and 32 px on phones. Inspected 1440, 768 and 390 px screenshots match the selected №5 language; the browser console contains no warning or error.

Final anti-template audit: the rejected checker fragments and generic CSS lattice are absent. The replacement is not a stock wallpaper repeat, Greek-key strip, card, gradient, glow, SVG icon set or library decoration; it is the user-selected project-specific Cyprus garden tapestry, adapted into two content-shaped compositions. UI libraries remain unused for visible styling. No decision remains without a confirmed reference, and no new marketing claim or interactive behavior was introduced.

## Menu atlas removal plan — 2026-08-31

The user supplied a current phone capture and directly requested removal of the complete rust-backed block containing the venue, pan, knives and repeated service summary. The active page, responsive CSS, test assertions and media references were audited first. The block is the `menu-atlas` immediately after the three event-format stages; its venue, process and tools photographs also remain part of the approved hero collage through the shared documentary source list.

Templated element found: the detached three-image atlas now repeats the service formats already explained directly above and reads as a secondary gallery rather than a necessary step in the visitor journey. Confirmed replacement: remove the complete atlas markup, its rust field, all desktop/tablet/phone atlas rules and the obsolete positive test assertion. The menu section will end after the three distinct event formats and flow directly into the inquiry section. No replacement block, copy, image, CTA or decoration is required.

Components retained: menu heading, sourcing route, all three event formats, inquiry section, hero collage and every following component. The knives source `public/media/hero-film-still-01.jpg` is explicitly retained in the project and continues to appear in the documentary hero collage. `gallery-venue.jpg` and `hero-film-still-10.jpg` are also retained because the hero still uses them. Components reworked: `menu-atlas` only. New components, assets, claims and UI libraries: none.

Implementation may begin against this capture and removal instruction. Validation must include the production build, rendered-source tests, `git diff --check`, confirmation that no `menu-atlas` markup or selector remains, confirmation that the knives image remains tracked and referenced, and an anti-template audit. The independent uncommitted ornament mockup is outside this change and must remain untouched.

Implementation result: the complete `menu-atlas` markup, three figures, repeated summary, rust field and every atlas-specific desktop/tablet/phone rule are removed. The bespoke-menu section now ends after its three distinct event formats and proceeds directly to inquiry. No replacement block or spacing decoration was added. `public/media/hero-film-still-01.jpg` remains tracked in the project and referenced by the sixty-cell hero collage; the venue and cooking stills also remain because that collage uses them.

Validation result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. The source test now rejects both `menu-atlas` and its former accessible label; repository checks confirm that no atlas selector remains and that the knives photograph is still tracked and referenced. The previously verified retained sections and their breakpoints are unchanged; this removal introduces no new responsive composition. Final anti-template audit: one redundant gallery-like block and repeated format summary were removed without adding a card, CTA, decoration, radius, shadow, gradient, library style or substitute content. The separate ornament work remains untouched.

## Ingredient sourcing mosaic revision plan — 2026-08-31

The user approved publication but directly corrected the sourcing presentation: the photographs and their descriptions must read as a mosaic. The active route, four licensed assets, three exact statements, credit treatment, desktop grid and phone breakpoints were audited before this revision. The current desktop field is asymmetric, but each description still sits in the conventional caption position beneath its image; at 768 px and below the entire block becomes a sequential image-then-caption route. That structure does not satisfy the new mosaic instruction.

Confirmed reference: the user’s explicit `фото и описания к ним мозайкой` direction, applied within the already approved square-edged editorial system and the existing licensed image inventory. The replacement is one content-specific mosaic whose seven visible fields interlock: lamb photograph and lamb statement, fishermen photograph and port statement, two Cyprus farm photographs and one farm statement. It must not be implemented as an equal three-card row or a stock Bento composition.

Components retained: sourcing heading, exact three statements, all four local image files and crops, semantic association between each statement and its related media, visible source note, all author/license links and every surrounding menu/inquiry component. Components to rework: `source-journey-scenes` markup and its desktop/tablet/phone placement rules only. No new asset, copy, claim, UI library, interaction, radius, shadow, icon or decoration is required.

Implementation plan: flatten the three figure-caption stacks into one labelled mosaic list; give each image and description an explicit unequal grid area; use a twelve-column desktop map and a separately authored six-column map below 768 px; keep all four crops recognizable and every statement adjacent to its evidence; update source assertions; then run lint, production build, tests, `git diff --check` and the mandatory seven-width visual audit before publishing the exact validated source.

Decisions without references remain unchanged: no pictured person or farm is claimed as an actual supplier, and no sourcing timing, certification or guaranteed availability is introduced. The current visible provenance note remains the safeguard for those unknowns.

Implementation result: the former three figure-caption stacks now share one `source-journey-mosaic` grid. The three semantic list items remain associated for assistive technology, while CSS places their four image fields and three caption fields independently. The lamb and farm descriptions use the approved raised-paper surface; the port description uses the existing forest surface to continue the route rhythm. All tiles keep square edges, the four licensed photographs remain unchanged, and no source or claim was added.

Responsive result: desktop resolves to twelve columns and fourteen rows, with the tall fishermen image anchoring the upper-right and the farm pair closing the lower field. At 768 px and below the route changes to a six-column, twenty-six-row composition: each description overlaps one column band of its related image, the fish route reverses its visual weight, and the two farm photographs meet the farm statement as one final cluster. It is no longer a sequential image-then-caption stack.

Validation result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. Live browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm the expected twelve- or six-column map, four loaded images, three visible descriptions, three accessible list items, zero document/text overflow, no broken media, 44 px minimum source-link targets and no console warning or error. The exact statements and all source/license links remain present.

Final anti-template audit: the user-requested mosaic is content-specific rather than a stock Bento preset. Its seven fields have unequal spans, two color roles and a separately composed phone map; there is no repeated card component, radius, shadow, glass, glow, generic gradient, icon, badge, carousel, placeholder, new marketing claim or library-default styling. Files changed for this revision: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. No new file or UI library was introduced.

## Mobile alignment refinement plan — 2026-08-31

The user requested fresh mobile screenshots, a visual review and complete alignment correction. The active page, components, local media, breakpoints, typography, content, current reference map and design system were audited before interface edits. Fresh live-browser captures were saved at 430, 390 and 375 px. All three widths have zero document overflow, a consistent 20 px gutter through story, menu, sourcing, formats, inquiry and Footer, no undersized visible target and no broken image once each section enters the viewport.

Templated elements found: none. The measured defect is confined to the phone hero geometry. The vertically centred copy starts at 241 px on a 430 × 932 viewport but at 181 px on a 375 × 812 viewport, so the first reading line drifts by 60 px across nearby devices. At every audited phone width the pale portrait field intersects the paragraph, primary action, internal formats route and motion control; the paragraph consequently changes from light-on-dark to low-contrast light-on-pale mid-line. At 375 px the primary action also has too little content width because the inherited 28 px button padding remains inside a 202.5 px column.

Confirmed replacement sources: the user's direct alignment request, the approved phone hero rule in the active design system, the direct sixty-cell full-field hero correction and the fresh measured captures. The correction will retain the exact 6 × 12 collage, all sixty sources, portrait, copy, actions, single motion control, header and 820 px minimum hero. It will top-anchor the reading flow below the header, expand it to the common phone gutter, reduce only the phone button's inherited horizontal padding, and confine the portrait to a narrower lower-right evidence field beginning after the paragraph. The opaque forest inquiry may cross the photograph; the quiet route and motion control must remain left of it.

Components retained: all JSX, content, local assets, media behavior, header, hero collage map and every below-fold section. Components to rework: phone-only hero copy width/alignment, portrait width/height/position and button spacing. New components, assets, claims, interactions and UI libraries: none. After implementation the site must pass lint, production build, rendered tests, `git diff --check`, fresh after-captures at 430/390/375 and the mandatory 1440/1280/1024/768/430/390/375 visual verification before publication.

Implementation result: the phone copy cluster now starts at a stable 132 px offset, spans the full width between the established 20 px gutters and keeps the paragraph at a 350 px readable maximum. The inherited phone button padding is reduced to 14 px, giving the complete Instagram label room at 375 px. The portrait is reduced from a 76% × 47% field at `right: -7%` to a 62% × 41% lower-right field at `right: -5%`. The 6 × 12 collage, exact media, heading, paragraph, actions, motion control, header and 820 px height floor are unchanged. No JSX or below-fold rule changed.

Validation result: the production build, ESLint, all five rendered/source/delivery tests and `git diff --check` pass. Live browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px found sixty hero tiles, zero document or text overflow, zero broken images after viewport entry, no undersized visible target and no console warning or error at every width. On 430/390/375 px the paragraph, quiet internal route and motion control no longer intersect the portrait; the copy begins at 132 px on all three instead of drifting between 181 and 241 px. The primary hover reaches the approved `--forest-hover`; the skip link and wordmark expose the documented paper/ink focus rings. Fresh before/after and section captures are stored in `artifacts/mobile-alignment-audit-2026-08-31/`.

Final anti-template audit: the correction changes only measured phone geometry. It adds no card, repeated composition, radius, shadow, gradient, glass, glow, decoration, icon, generic copy, stock asset, generated person, interaction or library-default theme. Tailwind remains an infrastructure import and contributes no visible default component. Decisions without references remain unchanged: service radius, dietary claims, exact MasterChef edition, additional contacts, final logo and form/loading/empty/error language are still intentionally undefined.
## Bespoke menu consolidation plan — 2026-08-31

The user supplied two phone captures and directly identified the bespoke-process introduction and the following sourcing route as one repeated idea. The current source, content, four licensed sourcing assets, captions, credits, desktop/touch maps, typography and active design documents were audited before interface edits.

Templated or redundant elements found: the section first explains the service in a lede, repeats it across three numbered rows, and then restarts the sourcing portion with a second oversized heading. On a phone this produces two consecutive editorial introductions before the visual evidence appears, even though both describe the same request → sourcing → evening sequence.

Confirmed replacement source: the user’s two captures and direct instruction to simplify and combine the material into one readable block. The approved paper field, single `Вы рассказываете. Я создаю меню.` heading, existing irregular sourcing mosaic, exact three scene statements and visible provenance remain the design and content sources.

Components retained: the bespoke-menu section, main heading and label, sourcing mosaic, all four images, semantic scene associations, exact three captions, credits, event formats and inquiry sequence. Components to rework: the introductory copy and the spacing between the introduction and mosaic. Components removed: the three-row process list and the second `Еду за вкусом к его источнику.` heading. New components, assets, claims and UI libraries required: none.

Implementation plan: replace the lede and numbered rows with one concise first-person paragraph covering the visitor brief, product search and personally led evening; remove the repeated route header; connect the mosaic directly to the introduction with a single structural rule; update assertions and the active design documents; run lint, production build, rendered-source tests and `git diff --check`; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px; then complete the anti-template audit before publishing.

Decisions without references remain unchanged: service radius, exact ingredient availability, named suppliers, dietary guarantees, pricing and response time are not introduced. The images continue to illustrate the sourcing route without claiming depicted people or holdings as Evgen’s suppliers.

Implementation result: the section now has one display heading and one concise paragraph covering the visitor brief, personal menu, ingredient search and hosted evening. The three numbered process rows and the repeated sourcing display heading are removed. The existing mosaic now follows the introduction directly across one structural rule; all four photographs, three exact scene statements, semantic list roles, provenance note, author/license links, event formats and inquiry close are unchanged.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass against the combined current workspace. Regression coverage requires the consolidated paragraph and rejects the removed process labels, route heading and their CSS selectors. The local route returns `200` and the updated site is available in the retained preview tab. The Sites workflow does not permit screenshot, DOM or breakpoint inspection unless the user explicitly requests browser testing, so a fresh visual sign-off at 1440, 1280, 1024, 768, 430, 390 and 375 px remains an explicit release limitation rather than a claimed result.

Final anti-template audit: the change removes a repeated feature-list rhythm and a duplicate oversized introduction. It adds no card, equal grid, new CTA, radius, shadow, gradient, glass, glow, icon, placeholder, stock media, generic marketing claim or library-default component. The retained source mosaic remains the approved content-specific irregular composition. Files changed for this consolidation: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. No new file or UI library was introduced by this task.

## Event-format naming correction plan — 2026-08-31

The user supplied a current desktop capture of the three-format field and directly set the required public names: `Частный ужин`, `Приватные мероприятия`, `Мастер-классы`. The active page, format-stage markup, hero summary, footer, metadata description, tests, responsive stage rules and design documents were audited before interface edits.

Templated elements found: none. The problem is terminology drift: the second stage still says `Коктейльная вечеринка`, the third is singular, and the same superseded terms appear in the hero and footer. Confirmed replacement source: the user’s exact naming and attached capture. The existing three photographs, stage order, descriptions, numbering, heading, limit of 20 guests, square geometry and responsive composition remain unchanged.

Components retained: hero, format-stage structure and imagery, heading, numbering, descriptions, inquiry sequence and all layout CSS. Components to rework: format names, matching hero/footer/metadata summary, meaningful alternative text and rendered-copy assertions. New components, assets, claims, styles and UI libraries required: none.

Implementation plan: apply the exact three names consistently across public copy; use the typographically correct closed hyphen in `Мастер-классы`; keep descriptions factual and broad enough for their renamed formats; update tests; run lint, production build, rendered/source tests and `git diff --check`; then complete the anti-template audit. Because no layout or style changes are planned, the previously verified responsive composition remains the governing layout reference; no new browser QA is performed unless explicitly requested.

Decisions without references remain unchanged: no new package contents, pricing, event geography, availability, response time or guest-limit exception is introduced.

Implementation result: the three stage titles now read exactly `Частный ужин`, `Приватные мероприятия` and `Мастер-классы`. The same taxonomy replaces the former cocktail-party/singular-masterclass wording in the hero paragraph, desktop format rail, accessible format label, footer and site description. Alternative text for the second image now describes a private event. The three images, descriptions, numbering and all CSS remain unchanged.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires all three approved names and rejects both forms of the former cocktail-party wording. The local route returns `200` and the retained preview tab has been refreshed. No screenshot, DOM or breakpoint inspection was performed because browser testing was not requested; the change introduces no style or layout rule, while the existing seven-width responsive composition remains unchanged.

Final anti-template audit: this is a screenshot-directed terminology correction only. It adds no component, card, selector, package, price, icon, CTA, decoration, radius, shadow, gradient, animation, image or library-default styling. Files changed: `app/page.tsx`, `app/site-config.ts`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Files created: none. UI libraries remain infrastructure-only.

## Public photo-note and numbering removal plan — 2026-08-31

The user supplied a current desktop crop of the disclaimer/credit strip and directly requested removal of all descriptions of that type and numbering everywhere. Before interface edits, the active page, sourcing mosaic, story spread, section headings, format stages, responsive selectors, tests, media records, reference map and design system were audited. The requested targets are the complete `source-journey-provenance` block and every visible `01 / 02 / 03` marker in `story-editorial-index`, the story facts, section kickers, sourcing metadata and format captions.

Templated elements found: repeated decorative numeric prefixes create the same editorial device across otherwise distinct content blocks, while the detached disclaimer/credit appendix interrupts the visitor journey shown in the supplied screenshot. Confirmed replacement source: the screenshot and the user’s direct removal instruction. Neutral hierarchy already exists through headings, labels, place names, image association, rules and source order, so no replacement decoration is required.

Components retained: all headings, the three story facts, film caption, biography, four sourcing images, three exact first-person sourcing statements, the place labels `горы`, `порт`, `Кипр`, the three event-format names/descriptions/images, inquiry content, semantic list relationships, meaningful alternative text and repository source/license records. Components to rework: story facts and event-format captions lose their numeric columns; source metadata becomes a single place label; section kickers keep their verbal labels only. Components removed: the story folio, both remaining section numbers, all item-number spans and the public provenance strip. New components, assets, claims and UI libraries required: none.

Implementation plan: remove the targeted markup; delete every now-unused selector and responsive override; convert content whose order is not meaningful from ordered to unordered lists; update regression tests to reject the provenance class, its public copy and all numeric marker classes/markup; keep `public/media/sourcing/CREDITS.md` and `docs/SOURCING_PHOTO_REFERENCES.md` intact; then run ESLint, the production build, tests and `git diff --check`. Visual verification must cover 1440, 1280, 1024, 768, 430, 390 and 375 px, including whitespace left by the removals, heading alignment, mosaic integrity, format captions, overflow, focus, loading and console errors. The final anti-template audit must confirm that no substitute card, divider field, decoration or repeated numbering is introduced.

Decisions without references remain unchanged: no new supplier identity, availability promise, event geography, pricing, response time, contact channel or license interpretation is introduced. The user-facing credit strip is removed exactly as requested; the underlying author/license inventory remains documented in the repository.

Implementation result: `source-journey-provenance` and its complete disclaimer/link list are removed from the rendered page together with every associated desktop, tablet and phone selector. The story folio, story-fact indices, section numbers, sourcing-scene indices and event-format indices are also removed. Story facts and event formats now use unnumbered lists; place labels and all visitor-facing descriptions remain. Numeric grid columns in the fact and format captions were collapsed rather than left as empty spacing. `public/media/sourcing/CREDITS.md` and `docs/SOURCING_PHOTO_REFERENCES.md` remain intact.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage rejects the removed provenance copy/classes, numeric-marker classes and visible `01 / 02 / 03` markup. Live browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report zero unwanted blocks, zero numeric marker nodes, zero exact visible leading-zero markers, zero horizontal or checked text overflow, zero broken images after viewport entry, no undersized visible target and no console warning or error. Visual inspection confirms that the mosaic now proceeds directly to the event-format heading without an empty credit field; story facts, place labels and format captions remain aligned on desktop and in the separately composed mobile layouts. The removal creates no loading, empty or error state; existing controls and media behavior are unchanged.

Final anti-template audit: the repeated folio device and detached technical appendix are absent, with no substitute divider panel, badge, card, icon, decoration, radius, shadow, gradient, glass, glow, animation or library-default styling. The asymmetric sourcing mosaic and alternating phone format stages retain their content-specific compositions. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Files created: none. UI libraries remain infrastructure-only.

## MasterChef prize verification and biography plan — 2026-08-31

The user asked what Evgen Grybenyk actually received for winning MasterChef and requested that the verified result be added to the site. Before interface edits, the active page, sole route, story spread, biography copy, fact rail, metadata, typography, responsive rules, tests, local media, approved mockups, reference map and design system were audited. The repository previously called Evgen a generic `MasterChef` winner and explicitly left the edition undecided.

Research result: the official `МастерШеф. Профессионалы — 2` finale aired on 18 July 2020 and advertised a 1,000,000-hryvnia winner’s prize. A contemporaneous Fakty ICTV report explicitly identifies Evgen Grybenyk as the season-two winner and states the same 1,000,000-hryvnia cash award. No equally specific reliable source found in this pass establishes that a plate, statuette or other physical trophy formed part of Evgen’s season-two prize, so none may be shown or claimed.

Templated elements found: none. The issue is a factual trust gap rather than a compositional pattern: the current page repeats the win but omits the exact edition and the concrete prize. Confirmed replacement sources are the user’s direct research request, the official finale and the contemporaneous winner report. The existing asymmetric editorial story, three-item fact rail, real film, Cyprus tapestry, first-person voice, square geometry, palette and responsive composition remain the approved design source.

Components retained: hero, story structure, video, tapestry, three-item fact rail, biography headings and paragraphs, all subsequent sections and every interaction. Components to rework: only the first story fact, the opening biography paragraph, metadata summary and rendered-copy assertions. New components, assets, selectors, imagery and UI libraries required: none.

Implementation plan: identify the edition in the existing first fact as `МастерШеф. Профессионалы — 2`; revise the first biography paragraph to record `2020` and `главный приз сезона — 1 000 000 гривен` before continuing the established Europe-to-private-table narrative; make metadata equally specific; update regression tests; run ESLint, the production build, rendered/source tests and `git diff --check`; then visually verify the unchanged composition at 1440, 1280, 1024, 768, 430, 390 and 375 px before the final anti-template audit.

Decisions without references remain deliberately absent: plate, statuette, season-specific physical cup, net-of-tax payout, present-day currency conversion and licensed MasterChef logo or press imagery. No external photo is imported because the verified cash-prize wording resolves the user’s question without adding unlicensed media or an invented visual symbol.

Implementation result: the first story fact now reads `победитель «МастерШеф. Профессионалы — 2»`. The opening biography paragraph records the 2020 win and the exact advertised wording `Главный приз сезона — 1 000 000 гривен`, then continues into the already approved Europe-to-private-menu narrative. The site description names the same edition. No external image, logo, trophy symbol, component, selector or layout rule was added.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires the edition, year and 1,000,000-hryvnia wording, requires the specific edition in metadata, and rejects `тарелка`, `статуэтка` and `кубок` in rendered copy. Live browser review at 1440, 1280, 1024, 768, 430, 390 and 375 px found zero document overflow, zero broken images, no visible text clipping and no undersized visible target. The long edition wraps deliberately in the narrow fact rail; the biography remains readable with no overflow, and the 9:16 story stage and film ratios remain stable. The primary action exposes the approved hover color, the motion control exposes the documented 2 px forest focus outline, and the console contains no warning or error. Static content has no loading, empty or form-error state; media loading completed without a broken asset in the audited viewports.

Final anti-template audit: this change closes a factual trust gap inside the existing editorial hierarchy. It adds no card, badge, statistic grid, trophy icon, stock press image, repeated section, radius, shadow, gradient, glass, glow, animation, generic marketing copy or UI-library styling. The three-item rail and first-person biography keep their approved roles; only the evidence becomes more precise. Files changed for this task: `app/page.tsx`, `app/site-config.ts`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Files created: none. UI libraries introduced: none.

## Sourcing-media completion plan — 2026-08-31

The user directly reported that the vegetable, fruit, fish and lamb references had not been found or updated and required all four to be completed. Before interface edits, the active sourcing markup, its four files, the twelve- and six-column maps, captions, accessibility labels, reference board, source records, current design map/system and regression tests were audited. The audit confirms that vegetables and fruit are present but use the older Commons files, while the lamb and fishermen images are neutral US/Egypt Pexels illustrations; no visible frame currently establishes a Cyprus route for either animal product.

Templated elements found: none. The defect is evidence drift: one image is being asked to imply both route and product even when its source proves only the product/work. Confirmed replacement sources are the user’s correction; Rolf Dietrich Brecher’s freely licensed sheep-herding frame near Kalavasos; the CC0 fishing-boat frame from Ayia Napa; Michal Rosak’s Cyprus pumpkin harvest; Natalia Shatkova’s Cyprus lemon orchard; and the retained Pexels rack/catch frames for neutral product/work evidence. Paid Shutterstock/Getty/iStock references remain direction-only until licensed files and commercial clearance exist.

Components retained: the single bespoke-menu introduction, three semantic sourcing scenes, exact first-person statements, place labels, square-edged editorial field, event formats and inquiry sequence. Components to rework: each lamb and fish scene gains a separate Cyprus route image beside the retained product/work image; both farm images are replaced with the current free Cyprus selections; image alternative text and accessible route labels become exact. New components genuinely required: none—the existing semantic figure structure expands from four to six image fields.

Implementation plan: convert the four chosen downloads to bounded local WebP assets; update the reference board and license ledger; expand the desktop map from seven to nine fields and compose an independent six-column phone map; update JSX, tests, reference documents and source inventory; run lint, production build, rendered/source tests and `git diff --check`; then complete the anti-template audit. The Sites workflow prohibits unrequested browser screenshots/DOM inspection, so the mandatory seven-width visual sign-off will remain an explicit release limitation unless the user separately requests browser testing.

Decisions without references remain absent: no named supplier, partnership, exact availability, same-day sourcing guarantee or claim that the neutral Pexels rack/catch frames were shot in Cyprus is introduced. The industrial background in the free Kalavasos fallback is accepted only as an honest, traceable interim route frame; the preferred paid Lofou mountain-sheep direction remains documented for later licensed replacement.

Implementation result: the public sourcing field now contains six visible images across the same three semantic scenes. Lamb pairs the Kalavasos sheep-herding route with the retained rack detail; fish pairs an Ayia Napa fishing boat with the retained catch/work frame; the former aubergine and orange files are replaced in active markup by the Cyprus pumpkin harvest and lemon orchard. Desktop remains a twelve-column, fourteen-row editorial map with nine unequal fields. At 768 px and below it becomes a separately composed six-column, twenty-seven-row route that interleaves location, product and text rather than stacking six conventional image captions. Alternative text identifies only what each source establishes.

Reference and license result: four bounded WebP assets and `reference-board-publishable.jpg` were created. `CREDITS.md`, the sourcing reference document, active reference map, design system and artifact README now distinguish the six active sources from the retained historical files and distinguish verified Cyprus route evidence from neutral product/work evidence. Paid watermarked previews remain reference-only.

Validation result: ESLint, the production build and all five rendered/source/delivery tests pass; asset inspection confirms valid WebP dimensions of 1600×1069, 1200×674, 1600×1067 and 1200×1600 for the four new files. `git diff --check` initially identified one Markdown line break and passes after correction. No browser screenshot, DOM inspection or seven-width visual QA was performed because the Sites skill prohibits it without an explicit user request. The mandatory 1440/1280/1024/768/430/390/375 px visual sign-off therefore remains an open release limitation and this interface task is not represented as fully visually signed off.

Final anti-template audit: the revision adds content-specific route/product evidence inside the existing asymmetric composition. It adds no card component, equal grid, repeated section, radius, shadow, gradient, glass, glow, decorative object, icon, badge, generic copy, carousel, horizontal scroller, animation or library-default styling. Desktop and phone maps use different field relationships. Files created: four WebP source assets and one JPG reference board. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `public/media/sourcing/CREDITS.md`, `artifacts/sourcing-photo-references-2026-08-31/README.md`, `docs/SOURCING_PHOTO_REFERENCES.md`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none.

## MasterChef award photograph plan — 2026-08-31

The user explicitly asked to find the photograph of Evgen with his winner’s award and bring it into the site. Before interface edits, the sole page and route, current story spread, biography, fact rail, video and tapestry media, responsive story rules, regression tests, local media inventory, reference map and design system were audited. The repository is clean before this change. The current page already states the verified edition, year and advertised 1,000,000-hryvnia prize but intentionally contains no award photograph.

Research result: a contemporaneous Fakty interview shows Evgen Grybenyk in his season-two chef jacket holding a black branded winner envelope after the `МастерШеф. Профессионалы — 2` finale. The official STB winner record confirms the edition, winner and million-hryvnia prize; a separate contemporaneous report credits the photograph to STB. The photograph establishes the visible envelope and finale context, not a cup, plate, statuette or literal cash handover.

Templated elements found: none. The gap is documentary proof beside an already verified claim. The confirmed replacement source is the exact photo requested by the user. The existing asymmetric story, first-person voice, square geometry, paper/ink/rust palette, 9:16 film and Cyprus tapestry remain. The new photo must not become a detached trophy card, badge row, gallery or generic credentials section.

Components retained: complete page sequence, story statement, film, tapestry, fact rail, biography heading/copy and all interactions. Components to rework: the biography gains one semantic figure and a short finale caption; tablet and phone biography flow gain deliberate image placement. New component required: none. New asset required: one local high-resolution JPEG plus a repository-only source/rights ledger.

Implementation plan: store the exact source photograph locally without retouching; add it to the biography with specific Russian alternative text and a factual `Финал · 2020` caption; preserve the complete envelope in every crop; update story CSS separately for desktop, tablet and phone; update regression and asset tests; record source and unresolved commercial-use rights; then run lint, production build, rendered/source tests and `git diff --check`, followed by visual verification at 1440, 1280, 1024, 768, 430, 390 and 375 px and a final anti-template audit.

Decisions without references remain absent: no cup, plate, statuette, net payout, present-day conversion or claim that the envelope physically contained the prize money. Publication authorization for promotional/commercial use of the STB press photograph is not established in the repository; this remains a release risk even though the user explicitly requested the local integration.

Implementation result: the high-resolution 1719 × 900 source photograph is stored locally at `public/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg` without retouching. A semantic `story-award-proof` figure now sits inside the existing biography, with exact Russian alternative text and the restrained caption `Финал · 2020 / конверт победителя`. Its centered 4:3 crop removes the source page’s blurred side extensions while keeping Evgen’s face, season jacket and complete envelope visible. Desktop retains the three-role spread; tablet pairs the biography heading and photograph before a two-column copy row; phone places the photograph between heading and copy. A source and rights record is stored in `public/media/masterchef/CREDITS.md` and is not rendered as a public credit strip.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires the local award asset, its caption and source ledger. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px confirms a loaded 1719 × 900 image, a stable 4:3 rendered crop, no document or caption overflow, no broken image, no undersized visible control and no console warning or error at every width. Visual review confirms that the envelope remains complete in all seven compositions and that tablet/mobile flows are deliberately recomposed rather than stacked mechanically. The audit also exposed the existing long season name crossing the narrow 375 px fact rail; language-aware hyphenation now resolves it without reducing factual text below the 11 px minimum.

Final anti-template audit: the change replaces a factual proof gap with one exact documentary figure inside the approved biography. It adds no detached award section, card, badge, trophy icon, repeated grid, radius, shadow, gradient, glass, glow, generated person, invented claim, decorative animation or UI-library theme. The Cyprus tapestry, live film, fact rail and biography remain compositionally distinct. Files created: `public/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg` and `public/media/masterchef/CREDITS.md`. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining release limitation: the repository does not contain commercial-use clearance for the STB/Fakty photograph, so rights must be confirmed before public commercial publication.

## Sourcing reference correction, local scenes — 2026-08-31

The user rejected the first free six-image replacement because it still described the requested sourcing route through neutral or merely adjacent imagery. The revised brief is explicit: a fresh-meat counter in a Cypriot village, a real fruit-and-vegetable farm with strawberry cultivation as the preferred example, and the fish market at Larnaca harbour where the catch and boats are visible together. The existing sourcing markup, current six files, license ledger, reference boards, source map and design-system constraints were re-audited before any interface edit. Concurrent uncommitted MasterChef work is present in the shared worktree and is preserved untouched.

Research result: two counter views were found at Greenwood Family Butchers in Kissonerga; two complementary Cyprus strawberry-farm views were found through Cyprus Inform and «Вестник Кипра»; a manual potato harvest establishes the vegetable side in Kokkinochoria; and Petros Karadjias’s AP photograph precisely documents fresh fish sold at Larnaca harbour with boats immediately behind the stall. These six views are assembled in `reference-board-local-scenes.jpg` and recorded with direct source links.

Implementation plan: replace the public sourcing media only after the selected authors, businesses or agencies provide commercial/promotional permission or after an equivalent commissioned shoot is supplied. The intended six-field sequence is village-counter wide/detail; strawberry cultivation/vegetable harvest; Larnaca market/harbour work. Existing headings, three first-person lines, asymmetric desktop map and distinct phone reading order remain. No new components are required.

Implementation result: the reference board, sourcing reference document, reference map and rights-pending provenance class are updated. Public interface files and published site media are deliberately unchanged because the exact local photographs are editorial, platform-hosted or otherwise not commercially cleared. Version 38 remains unpublished and is superseded as a visual direction by this correction.

Anti-template audit: the new direction is documentary and situation-specific. It introduces no card system, stock-gradient treatment, generic farm iconography, decorative product still life, repeated composition, radius, shadow, badge or invented supplier claim. Remaining blocker: rights-cleared files or a commissioned shoot for the six exact local scenes; mandatory seven-width visual verification becomes relevant only after those public assets are implemented.

## Hero wash transparency plan — 2026-08-31

The user directly asked to make the visible “blur” more transparent. The active hero, header, sixty-image mosaic, foreground portrait, paper wash, desktop/tablet/phone gradients, typography, actions, responsive maps, current design system, reference map and existing screenshots were audited before implementation. The active interface contains no optical `blur()` or `backdrop-filter`; the perceived blur is the translucent warm-paper `.hero-wash` layered above the sharp documentary collage.

Templated elements found: none. The requested change is a local balance correction inside the already approved full-field hero. The confirmed source is the user’s direct instruction together with the existing rule that the collage remain visibly documentary while dark copy retains a functional reading zone. Components retained: header, all sixty photographs, portrait, copy, actions, motion control, grid geometry and all later sections. Component to rework: `.hero-wash` only. New components, assets, claims, effects and UI libraries required: none.

Implementation plan: lower the paper alpha at each existing gradient stop on desktop, tablet and phone; preserve each breakpoint’s current gradient direction and dissolution point; do not add optical blur, backdrop filtering, text shadow or a card behind the copy; keep the header unchanged so navigation contrast is not weakened beyond the requested hero field. Then run ESLint, the production build, rendered/source tests and `git diff --check`. The Sites workflow does not permit browser screenshots, resizing or visual QA without an explicit browser-testing request, so the mandatory seven-width visual sign-off remains an open limitation for this small style adjustment.

Decisions without references: the exact intermediate alpha values are a neutral proportional reduction from the approved wash, not a new visual style. No media, crop, layout, text, interaction, breakpoint or page structure changes.

Implementation result: the desktop wash now moves from 92% paper behind the left copy through 54% at the central transition to 2% at the far edge. The 900 px and 768 px horizontal variants were reduced proportionally, and the phone wash now starts at 87%, passes through 66% and 28%, and reaches 4% before becoming fully transparent at its existing 87% dissolution point. The header remains at its approved opacity. No image filter, media source, crop, layout, copy or interaction changed.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage now requires the reduced desktop wash values and the existing fully transparent phone endpoint. The current page responds successfully in the retained local preview, which was refreshed for user review. Per the Sites workflow, no screenshot, DOM inspection, resizing or visual QA was performed without an explicit browser-testing request; the mandatory 1440/1280/1024/768/430/390/375 px visual sign-off therefore remains open.

Final anti-template audit: the adjustment only reveals more of the approved documentary collage. It adds no optical blur, backdrop filter, card, new gradient direction, glass, glow, shadow, radius, decoration, component, content or library-default styling. Files created: none. Files changed for this request: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining limitation: seven-width visual verification requires a separately requested browser-testing pass.

## Sourcing final seven-photo composition plan — 2026-08-31

The user explicitly finalized the sourcing combination: retain the existing sheep and add the newly found village meat-counter frame; retain the Ayia Napa boat and fishermen-with-catch frame and add the newly found Larnaca harbour seller; retain the Cyprus pumpkin harvest and replace the lemon orchard with the newly found Cyprus strawberry-greenhouse rows. Before interface edits, the active three-scene markup, six image files, twelve- and six-column maps, exact first-person captions, alternative text, source ledger, local-scene reference board, design map/system, regression tests and concurrent MasterChef work were audited. The unrelated MasterChef changes are preserved.

Templated elements found: none. The current defect is a mismatch between the user-approved evidence and active files: the neutral US lamb rack and lemon orchard are no longer selected, while the requested Larnaca seller is missing. The confirmed replacement sources are the user’s final combination, Greenwood Family Butchers in Kissonerga, Petros Karadjias’s AP Larnaca harbour photograph and the Cyprus strawberry-greenhouse photograph published by «Вестник Кипра».

Components retained: the complete section introduction, three semantic sourcing figures, sheep, boat, fishermen/catch and pumpkin images, three exact first-person captions, place labels, square-edged editorial treatment, event formats and inquiry sequence. Components to rework: the lamb product field changes to the village counter; the fish figure gains one seller field; the farm fruit field changes to strawberry cultivation; desktop and phone field placement expands for seven photographs. New semantic components, copy, claims and UI libraries required: none.

Implementation plan: store the three selected source files as bounded WebP assets; update source/rights records; expand the desktop map from twelve by fourteen rows to twelve by seventeen and the independent phone map from six by twenty-seven rows to six by forty compact rows so wide counter and greenhouse scenes remain legible; update JSX, alternative text and tests; run lint, production build, rendered/source tests, asset checks and `git diff --check`; complete an anti-template audit. The Sites workflow prohibits unrequested browser screenshots, DOM inspection and resizing, so the mandatory 1440/1280/1024/768/430/390/375 px visual sign-off remains open unless the user separately requests browser testing.

Decisions without references remain absent: no pictured counter, seller, fisherman, boat or farm is claimed to supply Evgen; no exact availability, same-day sourcing, ownership or partnership is introduced. The user directly authorized integration of the three selected reference photographs, but the repository still lacks recorded commercial/promotional permission for the Tripadvisor/platform, AP editorial and «Вестник Кипра» files. They must remain labeled rights-pending and public deployment requires a separate release decision.

Implementation result: after the final boat-removal correction, the active sourcing field contains exactly six photographs. The retained sheep leads to `kissonerga-meat-counter.webp`; the retained fishermen/catch frame interlocks with `larnaca-fish-market-seller.webp`; the retained pumpkin harvest leads to `cyprus-strawberry-greenhouse.webp`. The former rack, boat and lemon files remain in the source ledger with `Active: No`. Desktop uses a twelve-column, seventeen-row, nine-field map. At 768 px and below a separate six-column, forty-row map keeps both new wide agricultural/counter scenes horizontal, interlocks catch and seller, and uses controlled caption overlaps rather than a mechanical desktop stack. Captions and surrounding copy are unchanged; alternative text identifies only the visible scene and documented location.

Validation result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Asset inspection confirms valid WebP files at 1542×1000, 1600×1067 and 1000×559. The retained local preview responds `200`. No screenshot, DOM inspection, resize pass or browser interaction was performed because the Sites workflow requires an explicit browser-testing request; mandatory visual sign-off at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains open.

Final anti-template audit: the change extends the existing content-specific documentary field and the boat correction removes a decorative prelude; neither creates a reusable card, equal grid, second section, radius, shadow, glow, glass, decorative gradient, icon, badge, carousel, stock marketing copy, animation or library-default styling. Desktop and phone relationships differ deliberately. Files created for this request: `public/media/sourcing/kissonerga-meat-counter.webp`, `public/media/sourcing/larnaca-fish-market-seller.webp` and `public/media/sourcing/cyprus-strawberry-greenhouse.webp`. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `public/media/sourcing/CREDITS.md`, `artifacts/sourcing-photo-references-2026-08-31/README.md`, `docs/SOURCING_PHOTO_REFERENCES.md`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining risks: the three new photographs are not recorded as commercially cleared, the seven-width visual pass remains open, and public deployment has not been authorized in this turn.

### Boat-only frame removal correction

The user directly removed the photograph whose only subject is a boat underway. The fishermen/catch photograph and Larnaca seller remain the complete fish evidence; sheep, counter, pumpkin and strawberry remain unchanged. No new component or asset is required. Implementation removes the `source-fish-route` image and its active source assertion, marks the retained PxHere file inactive, and recomposes only the fish positions in the established desktop and phone maps. The same rights and visual-verification limitations remain.

## Personal Master Chef hero-copy plan — 2026-08-31

The user directly replaced the hero’s `Я — ваше меню` idea with a clearer positioning statement: Evgen is the guest’s personal Master Chef for private dinners, events and personal masterclasses. Before interface edits, the sole active route, hero hierarchy, extended display type, supporting paragraph, format rail, actions, responsive rules, regression assertions, reference map and design system were audited. Concurrent uncommitted award-photo and sourcing-reference work is present and remains untouched.

Templated elements found: none. The existing hero composition is project-specific and remains approved; only its message is changing. The current headline is memorable but indirect, while the new user-supplied idea identifies the person, relationship and use cases immediately. The confirmed replacement is a concise display statement, `Евгений Грыбеник — ваш личный Мастер-Шеф`, followed by `Для приватных ужинов, мероприятий и персональных мастер-классов — до 20 гостей.` The established project spelling is retained because this is a message rewrite rather than a site-wide name change.

Components retained: header, wordmark, sixty-image Instagram mosaic, foreground portrait, paper scrim, both actions, shared motion control, responsive hero geometry and every post-hero section. Components to rework: hero eyebrow, display heading, supporting paragraph and desktop/tablet format rail wording. New components, assets, claims, styles and UI-library elements required: none.

Implementation plan: replace only the four hero copy fragments; preserve the existing semantic heading structure and action labels; update the rendered-copy regression assertion; run lint, production build, tests and `git diff --check`; save and deploy the exact source state through Sites. Because the Sites workflow prohibits screenshots, DOM inspection, resizing and visual QA unless explicitly requested, the mandatory 1440/1280/1024/768/430/390/375 px visual sign-off will remain open unless the user separately requests browser testing.

Decisions without references remain unchanged: exact event geography, pricing, availability, dietary guarantees, response time and contact channels beyond Instagram. No new claim is inferred from the phrase `личный Мастер-Шеф`.

Implementation result: the hero eyebrow now carries the verified MasterChef edition, while the display heading reads `Евгений Грыбеник — ваш личный Мастер-Шеф`. The supporting line reads `Для приватных ужинов, мероприятий и персональных мастер-классов — до 20 гостей.` The desktop/tablet format rail uses the same three occasions. Header, actions, media, responsive rules and all post-hero content are unchanged. The established project spelling `Грыбеник` is retained rather than treating the spelling in the idea sketch as a site-wide rename.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires the new headline, supporting line and exact hero eyebrow. No screenshot, DOM inspection, resize pass or browser interaction was performed because the Sites workflow requires an explicit browser-testing request. The mandatory visual sign-off at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains open; in particular, the new four-line display wrap has not been visually approved at those widths.

Final anti-template audit: this is a content-only correction inside the approved project-specific hero. It adds no section, card, badge, icon, repeated layout, radius, shadow, gradient, glass, glow, generated asset, animation or library-default styling. Files created: none. Files changed for this request: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining limitation: the seven-width visual check above.

## Hero copy-and-controls simplification — 2026-08-31

The user directly asked to remove four items from the hero: the `до 20 гостей` capacity phrase, the in-hero Instagram discussion action, the `посмотреть форматы` route and the `пауза видео` control. They also asked to restore the previous version’s font size and colors. Before interface edits, the active hero markup, current typography rules, previous published typography values, header action, hero action group, media control, responsive rules, regression assertions, reference map and design system were audited.

Templated elements found: none. The issue is first-screen density. The confirmed replacement is the user’s exact reduction: one identity heading, one service line, the existing documentary field and the single header Instagram action. The typography audit confirms that the hero still uses the previous approved Roboto Flex sizes and the same `--ink`, `--rust` and `--muted` roles; no corrective CSS override is required.

Components retained: header and its Instagram action, wordmark, hero eyebrow, identity heading, service line, sixty-image Instagram mosaic, foreground portrait, paper wash, scroll cue and every later section. Components reworked: the service line loses the capacity suffix; the complete `hero-actions` wrapper and both links are removed; the hero `MediaMotionControl` render and unused page import are removed. New components, assets, claims, styles and UI-library elements required: none.

Implementation result: the hero service line now ends after `персональных мастер-классов.` The in-hero Instagram action, formats link, their wrapper and the rendered motion control are absent. The separate header and lower inquiry Instagram links remain, and capacity statements outside the hero remain unchanged. No CSS was edited: the previous display sizes and the `--ink` / `--rust` / `--muted` color assignments remain exact.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires the shortened service line, rejects `посмотреть форматы`, `пауза видео`, the hero action wrapper and the rendered motion control, and locks the previous desktop/tablet/phone display sizes plus ink/rust/muted color roles. No screenshots, DOM inspection, resizing or visual QA were performed because the Sites workflow requires an explicit browser-testing request; the mandatory seven-width visual sign-off remains open.

Final anti-template audit: removing the action cluster and control reduces first-screen density without adding any substitute element, card, badge, icon, decoration, radius, shadow, gradient, glass, glow, animation or library-default styling. Files created: none. Files changed: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining risks: seven-width visual verification is open, and the story film no longer offers a manual pause affordance even though viewport and reduced-motion pausing remain.

## Final hero text reduction — 2026-08-31

The user directly asked to remove the remaining service-format copy from the hero together with the `scroll` label. Before interface edits, the active hero markup, service paragraph, desktop/tablet format rail, scroll cue, heading hierarchy, responsive rules, current design map/system and regression assertions were audited.

Templated elements found: none. The user is defining a deliberately minimal first screen rather than replacing one template with another. The confirmed composition retains the verified MasterChef eyebrow, the identity/role display statement, the sixty-image documentary mosaic, foreground portrait and header action. The supporting service paragraph, repeated format rail and scroll cue are removed without replacement.

Components retained: header, wordmark, verified eyebrow, identity heading, mosaic, portrait, paper wash and every post-hero section. Components reworked: `hero-copy`, `hero-note` and `scroll-cue` markup are removed from the hero. New components, assets, claims, styles and UI-library elements required: none. Existing CSS is retained so prior typography and responsive media geometry remain unchanged.

Implementation result: the hero now renders only the verified eyebrow and the `Евгений Грыбеник — ваш личный Мастер-Шеф` display statement above the approved documentary media. The supporting line, three-format rail and scroll cue are absent. The service names remain available in the detailed formats section below. No CSS, media, crop, breakpoint, later copy or interaction changed.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage rejects the removed paragraph, rail and scroll cue specifically inside the hero while retaining the detailed format section below. No screenshots, DOM inspection, resizing or visual QA were performed because the Sites workflow requires an explicit browser-testing request; the mandatory seven-width visual sign-off remains open.

Final anti-template audit: the reduction adds no replacement CTA, prompt, icon, scroll animation, card, badge, decoration, radius, shadow, gradient, glass, glow or library-default styling. Files created: none. Files changed: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining limitation: seven-width visual verification is open.

## `Я — у вас дома` working-day fact-row plan — 2026-08-31

The user directly asked to replace all three facts beneath `Я — у вас дома` with a chronological service-day sequence: morning product purchasing, daytime prep with marinades and sauces, and evening cooking in the client’s home. Before interface edits, the sole active route, story statement and fact-list markup, story geometry, responsive rules, current regression assertions, reference map and design system were audited. Concurrent uncommitted hero, award-photo and sourcing-reference work is present and remains untouched.

Templated elements found: none. The current list is already a project-specific editorial rail, but its credential/travel/capacity content does not explain the requested daily rhythm. The user’s wording is the confirmed replacement. The existing three unequal story roles, unnumbered list, film, tapestry, biography, award proof, palette, typography and responsive composition remain unchanged.

Components retained: the full page sequence, `story-editorial-facts` list semantics, all story media and every interaction. Components to rework: only the three list-item strings and their exact regression assertions. New components, assets, styles and UI libraries required: none.

Implementation plan: replace the three facts with `утро: закупаю продукты`, `день: делаю заготовки, маринады и соусы`, and `вечер: готовлю у вас дома`; use the grammatically correct plural `соусы` while preserving the user’s meaning; add exact rendered-copy coverage and reject the superseded story-rail strings; run lint, production build, tests and `git diff --check`; save and publish the exact source state through Sites. The Sites workflow prohibits screenshots, DOM inspection, resizing and visual QA without an explicit browser-testing request, so the mandatory 1440/1280/1024/768/430/390/375 px sign-off remains open.

Decisions without references: none. Punctuation and lowercase styling follow the user’s supplied phrases and the existing lowercase fact rail. The separate hero eyebrow and biography keep the verified MasterChef wording because the request targets only the `Я — у вас дома` block.

## Duplicate hero Instagram link removal plan — 2026-08-31

The user directly asked to remove the additional Instagram link from the center of the first screen and retain only the one at the top. Before interface edits, the sole route, header action, hero action group, contact close, footer links, responsive hero rules, current design map/system and regression coverage were audited. Concurrent uncommitted project work is preserved.

Templated elements found: the two Instagram actions inside the same first-screen hierarchy duplicate one destination and compete for attention. The confirmed replacement is the user’s direct instruction: retain the named Instagram link in the header, remove the central primary Instagram button, and leave the quieter internal `посмотреть форматы` route in the hero copy. The lower inquiry close and footer are outside the targeted first-screen duplication and remain unchanged.

Components retained: header, header Instagram action, hero copy, internal formats route, motion control, all media, responsive geometry and every later section. Component to rework: the hero action group loses only its external Instagram anchor. New components, assets, claims, styles and UI libraries required: none.

Implementation plan: remove the central Instagram anchor, add a regression assertion that the hero action group contains no external Instagram URL while the header action remains, update the active reference map and design system, then run ESLint, the production build, rendered/source tests and `git diff --check`. This reduction introduces no new visual value; the existing single-action flex layout and responsive rules are retained unless verification exposes a structural issue.

Decisions without references: none. The user identified the exact duplicate and the link that must remain.

Implementation result: the external Instagram anchor and its now-unused primary-button rules are removed from `.hero-actions`. The header keeps the single Instagram link at the top, and `посмотреть форматы` remains the only action inside the hero copy. The inquiry close and footer are unchanged. Regression coverage now isolates the hero action source and rejects `instagramUrl`, `button-primary` and the Instagram label inside it while requiring the header action and internal formats route.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Browser DOM and visual inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px confirms exactly one Instagram anchor in the hero region, zero inside the central action group, a visible 44 px-or-taller header target, a visible internal formats action, no horizontal document overflow and no console warning or error at every width. The viewport override was reset after verification.

Final anti-template audit: this correction removes a competing conversion control without adding replacement decoration or another generic CTA. No section, card, radius, shadow, gradient, glass, glow, icon, animation, asset, copy claim or UI-library style was introduced. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining limitation: none for this scoped change.

Implementation result: the three list items now read `утро: закупаю продукты`, `день: делаю заготовки, маринады и соусы`, and `вечер: готовлю у вас дома`. The existing semantic list, lowercase treatment, story geometry and all surrounding MasterChef, film, biography and capacity copy remain unchanged. Regression coverage requires all three new rendered strings and rejects the three superseded strings specifically inside story-list items.

Validation result: ESLint and the production build pass; the rendered-page test containing the new strings passes, as do the palette, asset and worker tests on a post-build rerun. The complete five-test run still has one unrelated pre-existing failure because `app/globals.css` currently uses a 92% hero wash while the existing composition assertion still expects 97%; neither file was changed for that discrepancy in this task. `git diff --check` passes. No screenshot, DOM inspection, resize pass or visual QA was performed because the Sites workflow requires an explicit browser-testing request, so the mandatory 1440/1280/1024/768/430/390/375 px sign-off remains open.

Final anti-template audit: this content-only change converts a mixed credential list into the user-supplied daily sequence without adding a timeline widget, icon, card, badge, number, separator, new surface, radius, shadow, gradient, glass, glow, animation, generic copy or library-default style. Files created: none. Files changed for this request: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. The site was not published because the shared worktree also contains unrelated concurrent changes, including a rights-pending press photograph, and the full regression suite is not green; deploying that complete state would exceed this request.

## Hero copy-and-controls simplification plan — 2026-08-31

The user directly asked to remove four items from the hero: the `до 20 гостей` capacity phrase, the in-hero Instagram discussion action, the `посмотреть форматы` route and the `пауза видео` control. They also asked to restore the previous version’s font size and colors. Before interface edits, the active hero markup, current local typography rules, previous published typography values, header action, remaining hero action group, media control, responsive rules, regression assertions, reference map and design system were audited. The central Instagram action is already absent in the concurrent local work; this task preserves that removal and deletes the three remaining requested items.

Templated elements found: none. The issue is first-screen density. The confirmed replacement is the user’s exact reduction: one identity heading, one service line, the existing documentary field and the single header Instagram action. The typography audit confirms that the current hero still uses the previous approved Roboto Flex sizes and the same `--ink`, `--rust` and `--muted` roles; no corrective CSS override is required.

Components retained: header and its Instagram action, wordmark, hero eyebrow, identity heading, service line, sixty-image Instagram mosaic, foreground portrait, paper wash, scroll cue and every later section. Components to rework: the service line loses the capacity suffix; the now-single-item `hero-actions` wrapper and its formats link are removed; the hero `MediaMotionControl` render and unused page import are removed. New components, assets, claims, styles and UI-library elements required: none.

Implementation plan: update the hero markup only; keep capacity statements outside the hero unchanged; update tests to require the shorter line and reject the removed hero actions/control; preserve the exact existing display-size and color declarations; run ESLint, the production build, rendered/source tests and `git diff --check`; prepare a Sites version containing only this task’s safe source changes. The Sites workflow prohibits unrequested screenshots, DOM inspection, resizing and visual QA, so the mandatory 1440/1280/1024/768/430/390/375 px sign-off remains open.

Decisions without references: none. The user named every removed element and explicitly supplied the typography reference as the previous version. Removing the visible pause control leaves the story film governed by viewport visibility and reduced-motion preference but removes a manual pause affordance; this is the direct requested tradeoff and is recorded as an accessibility risk.

Implementation result: the hero service line now ends after `персональных мастер-классов.` The formats link and its now-empty action wrapper are removed, as are the rendered `MediaMotionControl` and its page import. The in-hero Instagram action was already absent in the concurrent local state and remains absent; the separate header and lower inquiry links remain. Capacity statements outside the hero remain unchanged. No CSS was edited: the previous display sizes and the `--ink` / `--rust` / `--muted` color assignments remain exact.

Validation result: ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage requires the shortened service line, rejects `посмотреть форматы`, `пауза видео`, the hero action wrapper and the rendered motion control, and locks the previous desktop/tablet/phone display sizes plus ink/rust/muted color roles. The retained local preview responds successfully. No screenshots, DOM inspection, resizing or visual QA were performed because the Sites workflow requires an explicit browser-testing request; the mandatory seven-width visual sign-off remains open.

Final anti-template audit: removing the action cluster and control reduces first-screen density without adding any substitute element, card, badge, icon, decoration, radius, shadow, gradient, glass, glow, animation or library-default styling. Files created: none. Files changed for this request: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining risks: seven-width visual verification is open, and the story film no longer offers a manual pause affordance even though viewport and reduced-motion pausing remain.

## Hero photo-text removal plan — 2026-08-31

The user directly asked to remove text from every photograph in the hero. Before interface edits, the active sixty-cell source array, all twenty-four unique active Instagram files, the foreground portrait, hero copy/navigation layers, optimized derivatives, responsive grid geometry, current reference map/system and regression tests were audited. The mosaic has no per-tile HTML caption; the unwanted text is baked into a subset of source frames.

Audit result: active IDs `05` and `10` are article screenshots dominated by copy; `21` and `25` carry baked-in social captions; `28` carries a large headline overlay; `03`, `14` and `32` contain large readable scene signage or labeling that becomes a primary tile subject. These eight files are therefore excluded from the active hero selection. Small incidental garment marks that are not a tile’s subject are not retouched, and the separate website heading, navigation and header action remain functional interface copy rather than photo text.

Templated elements found: none. The issue is documentary-source hygiene. The confirmed replacement is the user’s direct instruction plus the already approved local Instagram-only source boundary. Components retained: header, hero copy, foreground identity portrait, paper wash, all sixty tile positions, ten desktop-wide flags, two tablet-wide flags, responsive maps and every later section. Component to rework: only `heroCollageImages`. New components, assets, visual values and UI libraries required: none.

Implementation plan: replace every occurrence of IDs `03`, `05`, `10`, `14`, `21`, `25`, `28` and `32` with clean active photographs from the same local source; preserve exactly sixty entries and every wide/tablet-wide slot; add a regression exclusion for all eight text-heavy IDs; run ESLint, the production build, rendered/source tests and `git diff --check`; prepare no public deployment while the shared worktree contains unrelated rights-pending media. The Sites workflow prohibits screenshots, DOM inspection and resizing without an explicit browser-testing request, so mandatory visual sign-off at 1440, 1280, 1024, 768, 430, 390 and 375 px remains open.

Decisions without references: none. No text is erased from pixels, no person is regenerated and no new account or stock source is introduced. Cleaner already approved photographs repeat where necessary because the sixty-cell composition remains a direct project requirement.

## Biography and evening-step copy replacement — 2026-08-31

Audit scope: the active biography markup, three-part working-day fact rail, award image and caption, surrounding story composition, responsive rules, regression assertions, reference map and design system were inspected before changing the visible copy. A repository-wide search found one rendered instance of each superseded phrase and its matching test and documentation records. The current unrelated removal inside the contact block is preserved.

Reference result: the user supplied the complete biography replacement and the exact extended evening-step label, and explicitly requested grammar and punctuation correction. The corrected biography quotes `«МастерШеф. Профессионалы»`, capitalizes the geographic name `Средиземноморье`, and uses the grammatically parallel phrase `к новым кухням Европы и Средиземноморья`. No additional claim or decorative treatment is inferred.

Templated elements found: none. The request is a copy correction inside the approved editorial story. Components retained: biography heading, award photograph, caption, two-paragraph structure, unnumbered fact list, story layout, typography and every responsive rule. Components to rework: three text nodes only. New components, assets, selectors, visual values and UI libraries required: none.

Implementation plan: replace the two biography paragraphs and one evening-step label without changing their markup; update rendered regression coverage to require the new text and reject the superseded wording; synchronize the reference map and design system; run lint, the rendered-page suite, the production build and `git diff --check`; verify wrapping and overflow at 1440, 1280, 1024, 768, 430, 390 and 375 px; then complete the anti-template audit.

Decisions without references: none. The wording comes directly from the user; the only editorial interventions are Russian quotation, capitalization and grammatical agreement.

Implementation result: the evening fact now reads `вечер: готовлю у вас дома для вас и ваших гостей`. The superseded year-and-prize biography and private-guest logistics paragraph are replaced by the corrected two-paragraph Europe-and-Mediterranean story and the concise gastronomic-evening close. Existing markup, award media, caption, CSS and responsive composition remain unchanged. Regression coverage requires every new phrase and rejects the superseded evening item, opening sentence and prize sentence.

Validation result: ESLint, the production build and `git diff --check` pass. Four of five rendered/source/delivery tests pass; the remaining first-suite failure is unrelated to this request and comes from a pre-existing local removal of the contact paragraph while its old assertion still requires `дату, место, количество гостей`. Browser DOM and geometry checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm the exact new text, no old visible prize paragraph, no horizontal document overflow, no text-box overflow and no fact-item overlap. Visual inspection at desktop and phone widths confirms readable paragraph flow and contained wrapping in the narrow mobile fact rail. No console warnings or errors were reported, and the temporary viewport override was reset.

Final anti-template audit: this copy-only correction adds no section, card, badge, icon, decoration, radius, shadow, gradient, glass, glow, animation or library-default styling. Files created: none. Files changed for this request: `app/page.tsx`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining limitation: the complete test suite stays non-green until the separate contact-copy change and its stale assertion are reconciled; that unrelated user change was preserved.
## Five sourcing-layout mockups plan — 2026-08-31

The user supplied a current desktop screenshot of the ingredient-sourcing field and directly reported that it is unreadable and strangely arranged. They requested five mockups in different display styles. The active page, three semantic figures, six local photographs, exact captions, place labels, seventeen-row desktop map, forty-row phone map, current reference map, design system and source/rights records were audited before concept work. The screenshot is evidence of the current problem, not a source of additional instructions or copy.

Templated or unsuccessful elements found: the present asymmetric map distributes each story across distant fields; related route/product frames are not consistently adjacent to their text; the eye must jump from upper-left to upper-right and back down; large unused paper areas weaken the three-step route; and the farm caption is pushed below the visible crop. The issue is not the photographs or wording but the reading order and association.

Confirmed sources for the exploration: the user’s screenshot and direct readability correction; the existing six approved sourcing photographs; the exact statements `Хотите ягнёнка? — еду за ним в горы.`, `Нужна рыба? — еду в порт к рыбакам.` and `Свежие овощи и фрукты? — только с кипрских ферм.`; the approved warm-paper, forest, ink and copper palette; square edges; Oranienbaum/Onest typography; and the documented editorial principle that route and product evidence remain distinct.

Components retained: all six photographs, all three statements, all three place labels, their route/product pairings and the sourcing block’s role before event formats. Components to rework in mockups only: spatial grouping, sequence, image crop, text scale and paper/forest surface distribution. Five genuinely different concepts are required: an editorial triptych, a left-to-right route, three cinematic chapter bands, an index/catalog composition, and a restrained documentary contact sheet with a fixed reading rail.

No implementation code, production media or source claims will be changed in this exploration. No UI library is needed. The concepts must avoid generic cards, equal reusable panels, rounded containers, gradients, glass, decorative glow, arbitrary icons and invented marketing copy. Mobile behavior and mandatory seven-width verification remain open until one concept is selected and implemented.

Exploration result: five separate ImageGen mockups were saved in `design/mockups/sourcing-layout-explorations-2026-08-31/`: `01-editorial-triptych.png`, `02-horizontal-source-route.png`, `03-cinematic-chapter-bands.png`, `04-editorial-index-evidence.png` and `05-documentary-feature-spreads.png`. Each concept keeps the three exact statements adjacent to its two related documentary subjects and establishes an explicit reading order. The generated photographs are reference reconstructions only; production implementation must retain the six existing local media files.

Anti-template result: the five concepts vary their content relationships rather than recoloring one stock grid. No rounded card system, shadow, gradient, glass, glow, icon, badge, button, generic marketing copy or UI-library default was introduced. Files created: the five PNG mockups and their README. Files changed: `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Interface code changed: none. Remaining blocker: the user must select or combine a direction before implementation, deliberate mobile composition and the required seven-width visual verification can begin.

## Five additional unconventional sourcing-layout mockups plan — 2026-08-31

The user requested five more unconventional variants after reviewing the first five concepts. The existing exploration set, current screenshot, six documentary subjects, three exact statements, place labels, approved palette/type roles and anti-template exclusions remain the source boundary. The follow-up explicitly asks for broader compositional invention, not new content or a production implementation.

The second set must not repeat the first set’s editorial triptych, horizontal text rail, alternating chapter bands, left index/evidence field or magazine feature-spread geometry. The five new bounded directions are: a diagonal staircase route; a central typographic spine with alternating evidence; oversized place names used as the structural framework; a serpentine image route with captions in its bends; and offset editorial apertures that reveal paired images through a single continuous paper field.

All six source subjects and all three statements remain mandatory in every concept. Novelty must remain subordinate to readable Cyrillic type, obvious route/product pairing, square-edged imagery and feasible CSS/grid implementation. No interface code, production media, new claim or UI library is authorized. Phone composition, rights clearance, implementation and seven-width visual verification remain outside this concept-only pass.

Exploration result: five new 1536 × 1024 ImageGen mockups were saved beside the first set as `06-diagonal-staircase-route.png`, `07-central-typographic-spine.png`, `08-oversized-place-framework.png`, `09-serpentine-documentary-route.png` and `10-offset-editorial-apertures.png`. A targeted edit removed duplicate small place labels from concept 08 while preserving its three giant outline labels, photographs, captions and geometry. All five final files retain six documentary subjects, three exact statements and legible route/product associations.

Anti-template result: none of the new concepts repeats the earlier triptych, top rail, chapter-band, index/evidence or feature-spread structures. Novelty comes from route geometry and type scale rather than stock effects. No generic card system, bento grid, radius, shadow, gradient, glass, glow, icon, button, badge, invented copy or UI-library default was introduced. Files created: five PNG mockups. Files changed: the mockup README, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Interface code changed: none. Remaining blocker: a direction or hybrid must be selected before production implementation, deliberate mobile composition and seven-width verification.

## Concept 8 category-label and full-frame correction plan — 2026-08-31

The earlier concept-2 interpretation was stopped before any corrected file was saved. The user then supplied a screenshot clarifying that the target is concept 8, `08-oversized-place-framework.png`, and retained the requested replacements `ГОРЫ → МЯСО`, `ПОРТ → РЫБА`, `КИПР → ОВОЩИ`. They also directly rejected photograph cropping, specifically the Larnaca fish-market frame where the seller and price signs must remain visible.

The full-size concept-8 raster and the original 1600 × 1067 Larnaca market source were inspected. The current concept places that 3:2 source into a near-square aperture with `cover`-like cropping. The corrected selection mockup will preserve the complete source inside its aperture, accepting paper breathing room or a geometry adjustment rather than cutting the seller, signs or display. The other five subjects, three exact statements, enormous outline typography, terracotta rules, forest fish-caption field, warm paper palette and overall concept remain invariant.

This remains a mockup edit, not production implementation. The original concept-8 file stays unchanged and the corrected selection is saved as a sibling. No UI library, new claim, replacement photograph or interface-code change is authorized.

Correction result: `08b-selected-category-framework-full-frame.png` was saved at 1536 × 1024. The enormous outline words now read `МЯСО`, `РЫБА`, `ОВОЩИ`. The Larnaca market aperture uses the complete supplied source so the seller, roof structure, both upper price signs, lower 20€ sign, fish boxes and harbour context remain visible. The other five photographic subjects, three exact statements, terracotta field lines, forest caption surface and warm-paper composition remain present. The original `08-oversized-place-framework.png` is preserved unchanged.

Anti-template result: the correction changes meaning and source framing inside the selected project-specific composition without introducing a card grid, radius, shadow, gradient, glass, glow, icon, button, badge, generic copy or UI-library default. Files created: one PNG sibling. Files changed: the mockup README, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Interface code changed: none. Mobile composition and seven-width browser verification remain pending production implementation.

## Story-film sentence removal — 2026-08-31

The user explicitly removed the sentence `Победив в MasterChef, я объездил Европу и привёз рецепты для частных вечеров.` from beneath the documentary film. The complete `figcaption` and its now-unused responsive styles are removed; the film, tapestry continuation, biography, facts and surrounding editorial composition remain unchanged. The rendered-HTML regression now asserts that the rejected sentence is absent. This copy-only correction introduces no new visual decision or UI library.

## Chef-story unified journey plan — 2026-08-31

The user supplied a current desktop capture and identified the central compositional defect: `Я — у вас дома` with the portrait film already behaves as one complete block, while `От MasterChef к вашему столу` with award proof and biography behaves as another complete block pushed into the same three-column row. Before interface edits, the sole route, story markup, active responsive rules, documentary film/poster, award photograph, Cyprus tapestry assets, exact user-supplied copy, current reference map/system, regression tests and the live 1440 px rendering were audited. Concurrent uncommitted hero, sourcing and copy work remains in place and will not be reverted.

Templated or unsuccessful elements found: the desktop spread gives two large headings nearly equal weight; the central film visually belongs to the left statement while the ruled award/copy stack forms a detached right article; all three columns begin separate reading paths; and the ornament reinforces the split by filling only the first two roles. The content is valid, but its hierarchy does not express the intended progression from verified win to present-day private service.

Confirmed replacement sources: the user’s direct “two blocks in one” correction and screenshot; the existing approved editorial-spread principle; the exact documentary film, award proof, first-person biography, chronological workday facts and Cyprus tapestry; and the project’s paper/ink/rust/forest palette, square geometry and Oranienbaum/Onest typography. No external layout, generic template, new media or new visual language is introduced.

Implementation plan: make `От MasterChef к вашему столу` the single section-level heading; group the award photograph and the first biography paragraph into a compact origin prologue; place the subordinate `Я — у вас дома` statement, unchanged fact rail and 9:16 film together as the larger present-day chapter; move the concise final sentence directly after that chapter; retain the two existing tapestry crops as internal editorial texture; and preserve semantic heading order. Desktop uses an origin-to-present axis, tablet uses a prologue row followed by the larger home chapter, and phone uses a compact prologue followed by the existing dedicated 9:16 home poster rather than a simple desktop stack.

Components retained: section, all copy, fact list, film component, award figure/caption, both tapestry assets, palette, typefaces, square edges, viewport-controlled playback and reduced-motion behavior. Components to rework: story DOM grouping, heading levels, desktop/tablet grid and mobile reading order. New components, assets, claims, actions and UI libraries required: none.

Decisions without references: none beyond neutral proportional spacing needed to establish the user-requested hierarchy. Exact responsive gaps and type sizes must stay within the documented project scale and will be corrected through the mandatory 1440/1280/1024/768/430/390/375 px browser pass rather than treated as a new design system.

Implementation result: the story now has one section-level `h2`, `От MasterChef к вашему столу`. The award photograph, finale caption and first biography paragraph form a compact origin prologue. The subordinate `Я — у вас дома` statement, unchanged working-day list and portrait film form the larger present-day chapter, and the concise gastronomic-evening close follows that chapter. Desktop reads from award evidence through statement to live film; 768 px uses a horizontal prologue followed by the larger statement/film movement; 430/390/375 px use a compact title-and-award prologue followed by the preserved exact 9:16 home poster. Phone facts disable automatic hyphenation so Russian words remain whole inside the narrow rail.

Validation result: ESLint, the production Vinext build and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm zero document overflow, no fact-row overlap, intact heading and image bounds, exact 9:16 phone stages, whole-word fact wrapping and no console warnings or errors. The story video remains poster-first, muted and without controls; it is paused and unloaded outside the viewport, then loads and plays only when brought into view. Three of five repository tests pass. The two failing tests are unrelated stale assertions against concurrent hero/contact work already present in the dirty tree: one expects the superseded hero title DOM (and later still expects removed contact copy), while the other expects superseded hero wash values. The new story-structure assertions themselves pass.

Final anti-template audit: the rework removes the competing mini-section effect without introducing a card pair, timeline widget, numeric steps, arrow, icon, badge, radius, shadow, gradient, glass, glow, new ornament, generated media, generic copy or library-default component. The two media types remain square-edged documentary evidence, and mobile is a separately composed prologue-plus-poster flow rather than a desktop stack. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries introduced: none. Remaining risk: commercial-use clearance for the existing STB/Fakty award photograph is still unresolved and unchanged by this layout correction.

## Complete hero correction plan — 2026-08-31

The user supplied a 4096 × 2370 Retina desktop capture of the active light hero, asked what was wrong and then directly instructed that every identified hero problem be fixed. The capture is evidence of the rendered state, not a source of hidden instructions. Before interface changes, the active hero markup, all hero/header CSS and responsive rules, the sixty-source dataset, portrait files and dimensions, current screenshots, approved light concept, hero audit, Marrow reference analysis, design system, reference map, regression suite and unrelated dirty-worktree changes were inspected.

Templated or unsuccessful elements found: the copy is constrained to a fixed 520 px block while the display face reaches 96 px at width axis 151, creating an orphan dash and a seven-line wall; the longer exact title in source is not represented by the older screenshot and will wrap even worse; the centered 1280 px copy container, viewport-relative `left: 47%` portrait and full-viewport mosaic use three incompatible coordinate systems; the portrait is bottom-anchored and reads as a detached rectangle rather than a mosaic cell; the 576 px phone source is enlarged beyond its useful desktop scale; the 92% → 2% full-screen wash erases the left photographs while exposing a noisy right contact sheet; and repeated clean sources become conspicuous because several recur close together.

Confirmed replacement: use the user’s exact title and existing visible-content boundary; preserve all sixty clean local Instagram cells and the user-supplied apron portrait; align the header gutter, copy, portrait and mosaic to one viewport grid; author five stable title lines with the dash attached to the surname and `Мастер-Шеф` unsplit; reduce the display width axis/scale only as required for the exact title; position the portrait on the 50% / tenth-column boundary near the third mosaic row and cap its desktop size; replace the whole-screen wash with one local reading corridor; distribute repeated sources; and deliberately recompose tablet and phone positions.

Components retained: semantic `section`/`header`/`nav` structure, exact eyebrow and title wording, wordmark, sole header Instagram action, sixty-image Instagram-only source boundary, ten desktop-wide and two additional narrow-breakpoint rectangles, real apron portrait, square edges, colors, fonts, entrance motion, lazy/priority loading policy and every post-hero section. Components to rework: hero title spans, source ordering, hero copy width/offset, portrait placement/scale, reading scrim and hero-responsive rules. New components, copy, media files, claims, actions and UI libraries required: none.

Decisions without references: no new style is introduced. Exact gutter, scale and crop values are project adaptations of the approved light concept, the existing 20-column field, the Marrow principle of one dominant reading axis and the user’s rendered screenshot. The current apron photograph remains the authoritative identity source; its limited 576 px width cannot be made genuinely high resolution without an unapproved generated identity edit, so this implementation limits its rendered desktop size instead of fabricating detail.

Implementation sequence: update the active reference map and design system; replace the title markup and hero-only CSS; redistribute but do not add or remove background sources; update regression assertions; run lint, build, tests and `git diff --check`; visually inspect 1440, 1280, 1024, 768, 430, 390 and 375 px; check line wraps, crop, overflow, contrast, header targets, image loading, hover/focus, reduced motion, console and responsive separation; then complete the anti-template audit. No deployment is authorized.

### Concurrent story-film removal validation

Validation result: ESLint and the production build pass, and `git diff --check` reports no whitespace errors. Four of five existing tests pass; the single failure remains the pre-existing contact-copy mismatch documented above and is unrelated to the removed story sentence. Local browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm that the sentence and `.story-film-note` are absent, the film and tapestry remain inside the viewport, and the document has no horizontal overflow. Desktop and phone captures confirm a clean film-to-tapestry transition without a blank caption remnant. Final anti-template audit: no section, card, replacement copy, decoration, animation, responsive behavior or UI-library styling was introduced. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Remaining limitation: none specific to this deletion.

### Hero implementation and validation result

Implementation result: the exact title is represented by one accessible `h1` label and five visual lines: `Евгений`, `Грыбенюк —`, `ваш личный`, `Мастер-Шеф`, `на Кипре`. The former centered 1280 px wrapper and fixed 520 px copy column are replaced by the shared responsive header gutter and a wider viewport-relative reading axis. Roboto Flex remains the display family while the title uses the documented 144 width axis and reduced responsive scale. The portrait now begins at the 50% mosaic boundary near the third row on desktop, is capped at 440 px, carries the same warm hairline as the field and no longer anchors to the bottom. Tablet and phone move it into a separate lower/right evidence zone. The paper veil is local on desktop and dissolves vertically on phone. All sixty clean Instagram-only cells, ten desktop rectangles, two additional tablet/phone rectangles, one LCP preload and the existing source boundary remain; the sixteen permitted sources are redistributed with three or four uses each instead of five-cell concentration.

Verification result: `npm test` completes the production Vinext build and all five rendered/source/delivery tests; ESLint and `git diff --check` pass. Browser inspection at 2048 × 1185 confirms the reported wide-screen defect is removed: copy starts on the 80 px header gutter, the portrait starts at x=1024, the copy ends at x=840 and the five lines remain intact. Required-width checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report sixty hero cells, zero broken images, zero document-level horizontal overflow and no title/portrait intersection. The narrowest desktop text-to-portrait gap is 30.8 px at 1024; the 768 layout separates them vertically; phone title-to-portrait gaps are 237.9, 200.2 and 178.7 px. The 375 px eyebrow remains one 11 px line after reducing only its tracking. Every visible header target is at least 44 px high. The wordmark focus state renders the project forest 2 px outline with the paper separation ring, and the existing hover rules remain intact. The console reports no warnings or errors. Reduced-motion behavior remains covered by the existing source regression and CSS media query. The static hero has no loading, empty, form or data-error UI; all image requests complete and broken-image count stays zero.

Final anti-template audit: the correction removes the accidental portrait-card placement and the paper-half/contact-sheet split without introducing a generic centered hero, card group, standard bento hierarchy, radius, shadow, glass, blur, glow, decorative gradient, stock icon, placeholder copy, new CTA, generated person or library-default surface. The functional local gradient exists only to protect dark copy. Mobile is deliberately recomposed instead of stacking the desktop pair. Files created for this hero correction: none. Hero-related files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries used as visible components: none; Tailwind remains build infrastructure only. Remaining limitation: `chef-hero-apron.jpg` is still a 576 px-wide user-supplied phone source. Its desktop display is now materially smaller, but genuine Retina sharpness would require a higher-resolution original; no generated identity detail was fabricated. No deployment was performed.

## Unique subject-ordered hero collage plan — 2026-08-31

The user directly reported visible photograph duplication and requested a subject-led correction: food on the left; the chef, awards, companies and related evidence on the right. Before interface edits, the active hero DOM, desktop/tablet/phone grid rules, all thirty-two local Instagram originals and optimized derivatives, file hashes, a labelled visual contact sheet, current reference map/system, regression assertions and concurrent dirty-worktree changes were audited. The sixty rendered cells use only sixteen distinct source paths, repeated three or four times each; the local source directory itself contains thirty-two distinct file hashes.

Templated or unsuccessful elements found: repeated source paths turn the documentary field into obvious filler; the global row-major order mixes plated dishes, selfies, press screenshots, company signage and service environments without a narrative axis; the old sixty-cell target now conflicts with the user’s explicit no-duplicates requirement; and adjacent repeated crops weaken trust in the photographic proof.

Confirmed replacement source: the user’s direct no-duplicates and left/right grouping instruction, the thirty-two locally stored `@evg.chef` photographs, the approved full-field light hero, square edges, restrained hairlines, functional paper reading scrim and foreground apron portrait. Twelve unique food/preparation frames are assigned to the left evidence field; twenty unique chef/team/award/company/venue frames are assigned to the right. Company/press frames with readable branding remain functional documentary evidence only on the right and are never repeated as texture.

Components retained: semantic hero/header, exact eyebrow/title, foreground portrait, local Instagram-only source boundary, optimized WebP delivery, light paper scrim, full-field coverage, square geometry, entrance motion, loading priority and every post-hero section. Components to rework: the collage data structure, group wrappers, desktop/tablet/phone internal grid maps, tile width flags and regression assertions. New components, assets, copy, claims, actions and UI libraries required: none.

Implementation plan: replace the sixty-entry repeated array with separate twelve- and twenty-entry unique arrays; render two flush internal grids inside the existing full-field mosaic; use 46%/54% food/professional fields on desktop and tablet, then 43%/57% fields with two and three columns on phones; keep occasional horizontal crops and exact map fill without hiding a source; verify thirty-two unique DOM image paths, subject-side placement, loading, overflow, title/portrait separation, hover/focus and reduced motion at 1440, 1280, 1024, 768, 430, 390 and 375 px; then run the anti-template audit.

Decisions without references: none. The exact internal column counts and percentage split are neutral functional geometry derived from the user’s left/right instruction, the available 12:20 source ratio and the existing full-field hero bounds; they introduce no new visual style.

Implementation result: the repeated sixty-entry source list is replaced by `heroFoodImages` and `heroProfessionalImages`. The food group contains twelve distinct files; the professional group contains twenty distinct files; together they cover `instagram-01.jpg` through `instagram-32.jpg` exactly once. The existing outer mosaic now holds two flush internal grids with no labels, gap beyond the existing 2 px hairline, card surface or decorative divider. Desktop and tablet retain the 46%/54% subject split; phone uses the separately composed 43%/57% split with two food columns and three professional columns. Four food frames and five professional frames are horizontal on desktop; one professional frame returns to a single phone cell so both narrow maps fill exactly.

Verification result: the production build, all five rendered/source/delivery tests, ESLint and `git diff --check` pass. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px confirms twelve food cells at left, twenty professional cells at right, thirty-two unique resolved sources, zero broken images, zero zero-sized tiles, zero document-width overflow and no title/portrait intersection at every width. Both internal maps fill the hero bounds, the portrait remains clipped by the hero rather than creating page overflow on phones, visible header targets remain 44 px high, and the console reports no warnings or errors. Existing focus-visible, hover and reduced-motion rules remain source-regression covered and unchanged.

Final anti-template audit: the change removes repetition-as-filler and random subject mixing without introducing a generic gallery, visible split-panel component, bento hierarchy, carousel, card, label, icon, radius, shadow, gradient, blur, glass, glow, stock media, generated person, placeholder copy or library-default styling. The composition is driven only by the user’s subject instruction and actual project photographs. Files created: none. Files changed for this correction: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries used as visible components: none; the existing framework image primitive remains delivery infrastructure only. Decisions without references: none. Remaining limitations and risks: no implementation blocker; the pre-existing commercial-use clearance risk for press/company imagery remains unchanged and recorded in the project provenance notes.

## Mobile chef-story two-movement plan — 2026-08-31

The user rejected the five exploratory alternatives and supplied a direct phone composition: immediately below the hero place the existing left statement with an image at right; in the following movement place the video at left and text at right, with the video occupying three quarters of the width. The attached desktop capture remains evidence of the source content only; the user’s new instruction is authoritative for the phone layout.

Before interface edits, the active story DOM, desktop/tablet/phone CSS, film component and poster, award figure, two approved Cyprus tapestry crops, exact biography and workday copy, current reference map/system, regression coverage and working-tree state were audited. The only unrelated working-tree item is the pre-existing untracked sourcing-mockup directory, which remains untouched.

Templated or unsuccessful element found: the current phone treatment compresses statement, fact rail, ornament and film into one tall 9:16 poster, then makes the MasterChef origin chapter lead the section. That no longer matches the requested service-first reading order and gives the film only 62% of the poster width. Confirmed replacement: the user’s explicit two-movement geometry, the existing `Я — у вас дома` statement, square tapestry, uncropped film, three workday facts and the existing origin evidence. Desktop and tablet remain unchanged.

Implementation plan: below 560 px, make the existing story wrapper a three-row mobile editorial flow with the home chapter first, followed by the MasterChef heading and its award/origin proof. Inside the home stage use twelve neutral columns. Place the statement in columns 1–7 and the square tapestry in columns 8–12; on the next row place the film in columns 1–9 and the fact rail in columns 10–12. Keep the horizontal tapestry continuation attached beneath the film and the closing sentence below the two-row service composition. Remove only the superseded absolute poster positioning. No component, asset, copy, claim, action or UI library is added.

Decisions without references: the exact 7/5 statement-to-image split is neutral supporting geometry required to keep the supplied statement readable while preserving a materially visible image. The film-to-copy split is the user’s exact 3/4-to-1/4 instruction. The visual mobile order differs from the unchanged semantic source order; verify that every heading and paragraph remains present and report this as an accessibility risk if it cannot be resolved without duplicating content or changing desktop semantics.

## Sixty-image text-free hero-collage implementation plan — 2026-08-31

The user now requires exactly sixty photographs rather than thirty-two, asks for smaller cells, preserves the food-left/professional-right subject logic and explicitly rejects photographs containing text. Before interface edits, the active route, hero data and responsive CSS, all thirty-two Instagram originals and derivatives, the complete optimized and sourcing directories, both existing project films, current reference map/system, regression coverage and unrelated dirty-worktree changes were audited. The unrelated hero typography restoration, mobile chef-story work and sourcing mockup directory remain preserved.

Templated or unsuccessful elements found: the current 4/5-column desktop and 2/3-column phone maps contain only thirty-two relatively large cells and therefore no longer satisfy the supplied density. Eleven Instagram sources (`03`, `05`, `09`, `10`, `14`, `16`, `17`, `21`, `25`, `28`, `32`) are text-led; `09`, `16` and `17` were added after live hero inspection exposed their orange headline strip at actual tile size. `chef-stage` and `chef-team` also make signage a primary subject. Perceptual-hash comparison further found five duplicate collisions between the otherwise clean static pool and selected Instagram frames: `chef-kitchen`, `chef-studio`, `chef-bakery`, `gallery-workspace` and `chef-white-jacket`.

Confirmed replacement: preserve twenty-one clean Instagram sources, twenty-two unique local optimized project photographs and nine text-free local sourcing photographs; create eight text-free WebP stills from the project’s existing documentary films to reach sixty distinct scenes without repetition. Keep thirty-three food/preparation/sourcing images at left and twenty-seven chef/team/service/venue images at right. Use a 54%/46% outer split, then 7/6 columns × 6 rows on desktop, 5/4 × 9 on tablet and 4/3 × 12 on phone. Controlled two-column spans fill each map exactly and make no image appear twice.

Components retained: semantic hero/header, exact copy, foreground portrait, paper scrim, subject-led two-group structure, square edges, entrance motion, lazy-loading policy, typography work already present in the worktree and every post-hero section. Components to rework: the two collage arrays, responsive internal grids, width flags, image size hints, portrait boundary and regression assertions. New assets required: eight delivery-sized WebP frames under `public/media/hero-collage/`; no new component, copy, claim, action or UI library is required.

Implementation sequence: update this audit, the active reference map and design system; extract and inspect the five film stills; replace the source arrays; update responsive geometry and assertions; run perceptual-duplicate, file-validity, lint, production-build, rendered/source and whitespace checks; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px; then save the validated Sites version. Public deployment still requires a separate explicit approval because the project is public.

Decisions without references: the exact still timestamps and crop positions are neutral documentary selections required by the source shortage, not a new visual style. The source-boundary expansion is the smallest implementation compatible with the latest exact sixty/no-duplicates/no-text combination. No library default, generated media or external replacement photograph is introduced.

Implementation result: `heroFoodImages` now contains thirty-three distinct food/preparation/sourcing sources and `heroProfessionalImages` contains twenty-seven distinct chef/team/service/venue sources. The resolved sixty-path ledger contains twenty-one clean Instagram frames, twenty-two existing optimized project photographs, nine text-free sourcing photographs and eight delivery-sized frames from the project’s existing films. Eleven text-led Instagram files, both sign-led static files and all five static duplicate paths are absent. The outer mosaic is 54%/46%; desktop maps are 7/6 columns × 6 rows, the below-900 maps are 5/4 × 9 and phone maps are 4/3 × 12. Nine permanent rectangles in each group, three tablet rectangles and three phone rectangles in the food group fill every map exactly without repeating a source.

Verification result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Every one of the sixty resolved assets exists; dHash comparison at distance ≤ 4 reports zero collision. Browser checks at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812 found sixty tiles, thirty-three food cells, twenty-seven professional cells, sixty loaded images, zero broken or zero-sized tiles, zero document-width overflow, full group-height coverage and zero title/portrait intersection at every width. Computed maps resolve to 7/6 × 6 above 900 px, 5/4 × 9 at 768 px and 4/3 × 12 on all three phones. Visible header targets remain at least 44 px. Final 1440 and 375 px visual inspection confirms the smaller-cell density, subject-led left/right reading order and removal of the visible orange text strips; browser logs contain no warning or error.

Final anti-template audit: the correction increases evidence density and removes text-led and duplicate filler without introducing a generic gallery component, bento hierarchy, carousel, card, radius, shadow, gradient, glass, glow, icon, badge, generated person, stock UI or library-default styling. Files created for this correction: eight WebP files in `public/media/hero-collage/`. Files changed for this correction: `app/page.tsx`, the hero-mosaic rules in `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries used as visible components: none; the framework image primitive remains delivery infrastructure only. Remaining limitations and risks: small incidental garment embroidery may exist in documentary chef frames but no selected photograph uses copy, a headline, caption, sign or logo as its subject; the pre-existing publication-rights uncertainty for sourced/project media remains recorded and unchanged. Public Sites deployment is not performed without explicit approval.

Implementation result: below 560 px the section now starts with the present-day service composition. `Я — у вас дома` occupies the left seven columns and the approved square Cyprus tapestry occupies the right five. The next row gives the film nine of twelve columns and the three existing working-day facts the remaining three columns; the 12 px gutter leaves the measured film share at 74.1% of the usable stage, matching the requested three-quarter role. The horizontal tapestry continuation stays attached to the film, and the existing closing sentence follows the two-row service movement. `От MasterChef к вашему столу`, the award photograph and the origin paragraph now read visually as a separate evidence chapter below. Desktop and tablet declarations outside the phone query are unchanged.

Verification result: the production build, all five rendered/source/delivery tests, ESLint and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px show zero document-level horizontal overflow. At 430/390/375 px the statement-to-image and film-to-facts gutters remain 12 px, the film share remains 74.1%, all fact rows fit their assigned column without overflow, and the narrowest fact text remains 10 px. Visual captures at 430 and 375 px confirm the requested two movements and readable whole-word wrapping; a separate capture confirms the MasterChef evidence begins only after the service close. The in-view video loads and plays muted while retaining its full 9:16 frame. Tablet and desktop captures confirm their established origin-first composition remains intact.

Final anti-template audit: the former phone poster is replaced by content-specific editorial rows, not a card grid or generic mobile stack. No duplicate copy, new claim, icon, label, radius, shadow, gradient, glass, blur, glow, generated media, stock asset, control or library-default component is introduced. Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. UI libraries used as visible components: none. Remaining limitation: CSS visual ordering puts the home chapter before the origin chapter on phones while the semantic DOM retains the chronological origin-first order required by the unchanged desktop/tablet structure. The content and heading relationships remain complete, but a future markup-level responsive architecture could align visual and assistive-technology order if the project accepts a broader structural change. The pre-existing commercial-use clearance risk for the award photograph remains unchanged.
## Initial hero typography and color restoration — 2026-08-31

The user directly asked to return the hero text font and colors from the initial versions. Before interface edits, the active hero markup and responsive rules, the complete stylesheet history, the initial dark hero at `4d6bace`, the initial light hero at `6ed9169`, the later Oranienbaum dark hero at `26883ec`, the current approved light background, local font files, reference map, design system, tests and stored hero captures were audited. Because the active hero is light and the user did not ask to restore a dark veil, `6ed9169` is the compatible authoritative source: Oranienbaum with `#1A1815` title, `#9B6343` emphasis, `#6D665D` eyebrow and `#AD6F32` rule.

Templated elements found: none. The visible issue is a later typographic treatment, not the composition. The selected source is a prior approved project implementation, so no external template or model-default style is introduced.

Components retained: hero copy and exact five line groups, header, mosaic, foreground portrait, paper scrim, animations, current responsive font sizes and every post-hero section. Components to rework: only hero copy family, weight, variable-font settings, forced casing and four text-role colors. New components, assets, claims, sections and UI-library elements required: none.

Implementation plan: add dedicated tokens for the initial light-hero text roles; restore Oranienbaum 400 and authored casing on the hero title; apply the initial eyebrow, title, emphasis and rule colors; update regression assertions; run lint, production build, rendered/source tests and `git diff --check`; then save and publish the exact validated Sites source. The Sites workflow prohibits unrequested screenshots, DOM inspection, resizing and visual QA, so the mandatory 1440/1280/1024/768/430/390/375 px visual sign-off remains an open project-policy blocker unless the user separately requests browser testing.

Decisions without references: none. The font and color values come from the project’s own initial light hero. The current font sizes and geometry remain because the user requested font and colors, not a broader layout restoration.

Implementation result: visible hero copy now uses the self-hosted Oranienbaum family at weight 400 and the authored mixed case. Dedicated tokens restore the initial light hero’s `#1A1815` title, `#9B6343` emphasis, `#6D665D` eyebrow and `#AD6F32` rule. Roboto Flex width/optical settings and forced uppercase are no longer applied to the hero title. The five line groups, responsive sizes, light paper scrim, mosaic, portrait, header and all later sections remain unchanged by this correction.

Validation result: the local route returns `200`; ESLint, the production build, all five rendered/source/delivery tests and `git diff --check` pass. Regression coverage locks the restored font family, weight, authored casing, four exact color roles and large-text contrast. The user did not request browser testing, so the Sites workflow prevents screenshot, DOM and resize inspection; the AGENTS-required 1440/1280/1024/768/430/390/375 px visual pass remains open and this scoped interface change is not represented as fully visually signed off.

Final anti-template audit: this restoration changes only established project typography and colors. It adds no section, card, grid, radius, shadow, gradient, glass, glow, decorative object, generic copy, icon, animation, media, mobile stacking pattern or UI-library appearance. Files created: none. Files changed for this correction: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s direct request and the project’s initial light hero at `6ed9169`. Decisions without references: none. UI libraries introduced or restyled: none. Remaining limitation: the prohibited unrequested seven-width browser pass.

## Event-format photograph replacement plan — 2026-08-31

The user supplied two photographs and explicitly assigned the first to `Мастер-классы`. A follow-up clarified that the second is for `Частный ужин`. The user asked for the third photograph to be found independently. Before interface edits, the active route and three format stages, their current image sources and alternative text, the `4 / 5` desktop/mobile apertures and object-position rules, all local gallery and Instagram candidates, current reference map/design system, regression suite and concurrent dirty-worktree changes were audited. The supplied files are 1144 × 770 and 1152 × 1572 PNG captures without visible browser chrome.

Templated or unsuccessful elements found: the three existing images are generic service placeholders that do not establish the distinct human situation behind each format. The private-dinner stage uses an older poster; the event stage shows plated food rather than an event; and the masterclass stage shows a finished dish rather than people learning with the chef. Their identical aperture is an approved editorial rhythm, but their evidence is interchangeable.

Confirmed replacement sources: the user’s direct two-photo mapping; the first supplied image’s visible chef-led demonstration and participating guests; the second supplied image’s close working portrait and pan; the existing local `public/media/instagram/instagram-09.jpg` frame, which shows guests seated throughout an active event room; and the approved square-edged format composition. The internal event frame is selected instead of external stock because it belongs to the project’s documented `@evg.chef` media set and preserves visual/provenance continuity.

Implementation plan: derive efficient local JPEG assets from the two supplied PNG photographs without retouching; replace only the three image sources, intrinsic dimensions and alternative text; keep the exact format order, names, descriptions, DOM structure and responsive composition; tune only the existing per-stage object positions so the dinner action, event guests and chef-to-participant interaction remain legible in the `4 / 5` aperture; add source regressions; run lint, production build, rendered/source tests and `git diff --check`; inspect 1440, 1280, 1024, 768, 430, 390 and 375 px; then complete the anti-template audit.

Components retained: the `menu-stages` list and figures, heading, format names and descriptions, square edges, hairline captions, three-column desktop rhythm and deliberately alternating phone layout. Components reworked: the three image sources, intrinsic dimensions, alternative text and stage-specific crop positions. New UI components, copy, claims, actions, sections and libraries required: none.

Decisions without references: the exact focal percentages inside the fixed aperture are neutral crop adjustments and will be judged only by whether the defining human action remains visible at every required width. No new visual style is introduced.

## Inquiry illustration full-frame correction plan — 2026-08-31

The user supplied a current desktop screenshot and explicitly rejected the cropped inquiry illustration: the complete drawing must be visible, and typography or layout must yield before the artwork does. Before interface edits, the active route, complete stylesheet cascade, 1536 × 1024 source illustration, intrinsic image markup, inquiry/footer geometry, responsive rules, approved reference map/design system, test suite and dirty working tree were audited. The current crop is CSS-authored rather than present in the file: the figure owns `overflow: hidden`, the image is widened to 164–176% on desktop/tablet and 136–160% on smaller widths, and negative `left` offsets move a large part of the source outside the aperture.

Templated or unsuccessful element found: the final block treats the illustration as a decorative cover crop even though this artwork was composed as a complete editorial canvas with a quiet left paper reserve. At every breakpoint the source is enlarged and shifted, so the right-hand olive tree, table, chairs, plants and/or source edges are lost. This contradicts the supplied screenshot correction and weakens the project-specific illustration.

Confirmed replacement: the user’s direct full-artwork instruction, the original local `chef-story-brush-villa.png`, its authored 3:2 canvas and the existing paper/forest/rust system. On wide desktop the complete canvas will be contained and aligned bottom-right behind the closing composition; the heading will use a smaller width-limited scale in the quiet reserve and the Instagram action will remain at left. At 1024 px and below the complete 3:2 image will become a normal-flow figure between heading and action. No image edit, new asset, copy, component, action or UI library is required.

Implementation plan: replace the crop aperture and absolute zoom offsets with one `contain`-fitted image; reduce the heading scale and constrain its reading width; give the desktop close enough measured height for the complete source; switch tablet/phone to a source-ratio figure; add a source regression that rejects crop/zoom rules; run ESLint, the production build, rendered/source tests and `git diff --check`; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px for complete artwork, text/art separation, heading wraps, footer transition, overflow, focus, loading and console errors; then complete the anti-template audit.

Components retained: inquiry markup, exact heading, original PNG, Instagram action, footer, square-edged palette and focus/hover states. Components reworked: inquiry geometry and its desktop/tablet/phone image sizing only. New components and UI libraries: none. Decisions without references: the exact reduced type scale and closing-field height are neutral fitting values derived from the immutable 3:2 artwork and must be accepted only if the required-width review keeps all source edges visible and prevents dense-art overlap.

## Inquiry illustration full-frame correction result — 2026-08-31

Implementation result: the original 1536 × 1024 `chef-story-brush-villa.png` remains byte-for-byte untouched. The inquiry figure no longer owns a crop aperture, and the image no longer uses negative `left` offsets, transforms or 136–176% enlargement. At wide desktop it fills the measured closing field with `object-fit: contain` and bottom-right alignment, so the complete source canvas is visible behind the composition. The heading is reduced to `clamp(58px, 5vw, 102px)` and limited to the authored quiet reserve; the Instagram action remains unchanged. At 1024 px and below the figure enters normal flow at the exact source ratio `3 / 2`, between the reduced heading and action.

Verification result: the production build, all five rendered/source/delivery tests, ESLint and `git diff --check` pass. Live checks at 2048 × 1014 (the supplied screenshot geometry), 1440, 1280, 1024, 768, 430, 390 and 375 px confirm the image resolves at its natural 1536 × 1024 dimensions, computes to `object-fit: contain`, retains every source edge, and creates zero document-level horizontal overflow or broken image. Visual inspection confirms the complete crown, trunk, building, table, both chairs and lower plants remain visible; the heading does not enter dense brushwork. The action remains 78 px high on desktop/tablet and 72 px on phones, exposes the approved forest hover transition and a 2 px forest focus outline with 3 px offset. The browser console contains no warning or error. Static local content has no empty or form-error state; lazy loading completes when the block enters view.

Final anti-template audit: the correction removes a generic decorative cover crop and lets the project-specific illustration’s own composition govern the close. It adds no card, repeated section, radius, shadow, gradient, glass, glow, decorative object, stock media, generated image, placeholder copy, icon, animation or library-default component. Files created for verification: eight inquiry screenshots plus one 1024 px artwork check in `artifacts/inquiry-full-frame-2026-08-31/`. Files changed for this request: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s screenshot/direct instruction and the original local brush-villa artwork. Decisions without references: only the neutral type clamp, field height and 1024 px switch required to fit the immutable source without overlap. UI libraries used as visible components: none. Remaining task-specific limitations or risks: none; unrelated working-tree changes and existing media-rights notes remain preserved.

## Event-format photograph replacement result — 2026-08-31

Implementation result: the supplied 1152 × 1572 working portrait is stored as `public/media/event-formats/private-dinner.jpg` and now illustrates `Частный ужин`. The existing 900 × 900 local `@evg.chef` event-room frame `public/media/instagram/instagram-09.jpg` illustrates `Приватные мероприятия`. The supplied 1144 × 770 chef-led group demonstration is stored as `public/media/event-formats/masterclass.jpg` and now illustrates `Мастер-классы`. Intrinsic dimensions and specific Russian alternative text are present in source. The existing `4 / 5` apertures use focal positions `50% 50%`, `48% 50%` and `68% 50%` respectively so the pan, event guests and chef-to-participant interaction remain visible. Format order, names, descriptions, markup, square edges and all other page sections remain unchanged by this request.

Validation result: the production Vinext build, all five rendered/source/delivery tests, ESLint and `git diff --check` pass. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px confirms all three format photographs load at their expected natural dimensions, keep their aspect ratio, retain the defining subject, and create no broken stage image, card overflow, text/image collision or document-level horizontal overflow. Desktop/tablet maintain the three-stage editorial row; at 1024/768 the longer event title wraps without collision; phone keeps the approved alternating image/text direction and the complete three-format reading order. Console inspection reports no warning or error. Loading, empty and error UI remain inapplicable to these static local figures.

Final anti-template audit: the change replaces three interchangeable service placeholders with direct documentary evidence without adding a card style, carousel, icon, badge, radius, shadow, gradient, glass, glow, stock image, generated person, generic copy, action or animation. The existing card-like figures are not restyled or multiplied; their project-specific editorial composition remains intact. Files created: `public/media/event-formats/private-dinner.jpg` and `public/media/event-formats/masterclass.jpg`. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the two user-supplied photographs, the user’s direct format mapping and the existing local `instagram-09.jpg` documentary frame. Decisions without references: only the three neutral focal percentages. UI libraries introduced or used as visible components: none; Tailwind remains build infrastructure only. Remaining task-specific limitations or risks: none; no external stock source or new rights dependency was introduced.

## Selected sourcing-framework production plan — 2026-08-31

The user supplied side-by-side evidence of the discrepancy: the live sourcing block still renders the rejected sparse seventeen-row mosaic, while the approved target is concept 8’s three-movement oversized-word framework. The follow-up corrections replace all large place words with `МЯСО`, `РЫБА`, `ОВОЩИ` and remove the smaller `горы`, `порт`, `Кипр` labels entirely. Before interface edits, the active semantic figures, six local photographs, full stylesheet cascade, selected `08b-selected-category-framework-full-frame.png` artifact, reference map, design system and regression suite were audited.

Templated or unsuccessful elements found: the live twelve-column/seventeen-row canvas disperses each scene into unrelated fields, leaves large accidental voids and makes the fish and vegetable movements read as remnants of a layout rather than authored sections. It also uses `object-fit: cover`, contradicting the selected full-frame treatment. This is the direct reason the second and third movements appeared unchanged after concept selection: only the mockup and documentation were updated; production markup and CSS were explicitly left on the old system.

Confirmed replacement: the user’s target screenshot, the corrected concept-8 artifact, the six existing documentary assets, the three exact statements, the approved Oranienbaum/Onest typography and paper/forest/terracotta palette. Desktop follows the reference’s meat/text/image, fish/image/text and vegetable/text/image movements. Category words are outline-only and content-bearing; small place metadata is removed. Every image uses `contain` and preserves its complete source frame.

Components retained: the single bespoke-menu introduction, semantic sourcing section/list/figures, all six image files and alternative text, three exact statements, event formats and inquiry sequence. Components to rework: the three figure wrappers gain category headings; the small metadata spans are removed; the seventeen-row/forty-row CSS map is replaced by three source-specific editorial grids and a separate narrow-width composition. New components, assets, claims, actions and UI libraries required: none.

Implementation plan: update the reference map and design system first; change the semantic markup; replace only sourcing CSS; update regression assertions to require the three category words and reject the removed metadata/old row maps; run ESLint, production build, tests and `git diff --check`; then inspect 1440, 1280, 1024, 768, 430, 390 and 375 px for hierarchy, full-frame imagery, heading wraps, image/text attachment, overflow, loading and console errors. The anti-template pass must reject repeated card styling, uniform section boxes, radius, shadow, gradient, glass, ornamental glow and mechanical mobile stacking.

Decisions without references: no supplied mobile screenshot exists for this selected framework. The narrow layout therefore uses the most neutral content-faithful adaptation of the approved desktop relationships: category first, unequal full-frame image pair, attached statement, with fish retaining its contrasting forest field. This is recorded as an implementation adaptation rather than a new visual direction. Rights uncertainty for the three previously documented external sourcing images remains unchanged.

Implementation result: the rejected global seventeen-row/forty-row map is no longer present. Each semantic figure now owns one large outline heading (`МЯСО`, `РЫБА`, `ОВОЩИ`), an unequal full-frame image pair and its attached statement field. Meat leads with word at left, images at right and a long paper statement; fish uses images at left with the word and forest statement at right; vegetables close with word/statement at left and the two farm frames at right. The smaller place metadata nodes and every related selector are removed. All six images use intrinsic-ratio `height: auto` plus `object-fit: contain`; the vegetable image field begins only after the complete outline word, so no live photograph covers it.

Verification result: ESLint, the production Vinext build, all five rendered/source/delivery tests and `git diff --check` pass. Browser measurements at 1440, 1280, 1024, 768, 430, 390 and 375 px found the three exact category headings, zero small metadata nodes, zero horizontal overflow, zero elements escaping the viewport, zero caption overflow and zero broken images. All six images retain their natural aspect ratios at every width and compute to `object-fit: contain`; the desktop vegetable word/image overlap is zero. Visual inspection at 1440 px confirms the target’s three distinct editorial movements, complete seller/price-sign frame and forest fish field. Inspection at 390 px confirms the separate six-column mobile composition, intact category words, two-image pairings, readable statements and no mechanical desktop-scale canvas. Browser logs contain no warning or error.

Final anti-template audit: the former sparse generic map is replaced from the user-selected project artifact, not a UI-library pattern. The three scenes have different content-led relationships and are not repeated cards. No radius, shadow, gradient, glass, glow, icon, badge, carousel, stock media, generated person, placeholder copy, new claim, decorative animation or library-default component is introduced. Files created: none. Files changed for this request: the sourcing markup in `app/page.tsx`, sourcing rules in `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Existing unrelated chef-story edits in the same two interface files were preserved. References used: the user’s two screenshots, direct category/metadata corrections and `08b-selected-category-framework-full-frame.png`. Decisions without references: only the documented neutral mobile adaptation. UI libraries used as visible components: none. Remaining risk: the previously recorded publication-rights uncertainty for the sourcing photographs is unchanged; no deployment was requested or performed.

## Chef-story two-row recomposition plan — 2026-08-31

The user supplied a capture of the active award photograph/caption/prose and explicitly specified the new relationships: directly beneath the hero, biography text at left and the award photograph at right, with `Теперь я превращаю этот опыт в ваш идеальный гастрономический вечер.` kept with that text; below it, a separate row with the video at left and the text at right. The user immediately clarified that “wider” means a horizontal 4:3 video aperture, correcting the initial 3:4 interpretation. The complete route, active story markup and CSS cascade, local award image and film, caption, exact copy, ornament assets, responsive rules, prior approved references, dirty working-tree changes and regression suite were audited before implementation.

Templated or unsuccessful elements found: the active desktop story forces a compact photo/prose prologue beside a second statement/ornament/film chapter, so the requested photo/text pair does not exist and the concise close is stranded under the second chapter. The phone layout reverses the chronology and puts the home chapter before the award proof. Both structures obscure the two direct media/text relationships the user has now specified.

Confirmed replacement: the new user capture and exact position instruction, the existing `evgen-grybenyk-winner-envelope-2020.jpg`, exact biography and close, the existing `chef-story-img-5399-no-grill.mp4`, exact `Я — у вас дома` statement, three workday facts, approved paper/ink/rust palette, typography and square edges. The first row is text/photo; the second is a dominant horizontal 4:3 film aperture at left with a narrower text rail at right. The vertical source is center-cropped rather than stretched, and the chef/action must stay visible.

Components retained: every exact line of public copy, award image and caption, story film and accessibility behavior, three fact-list items, semantic heading/list/figure elements, fonts, colors and square-edged media. Components to rework: story DOM grouping, desktop/tablet row grids, phone order, story spacing and ornament placement. New components, assets, copy, UI libraries and actions required: none.

Implementation plan: first update the reference map and design system; regroup the first heading/prose/close opposite the award figure; regroup the second dominant horizontal 4:3 film opposite the statement/fact rail; remove CSS that visually reorders the story; update structural regressions; run ESLint, production build, tests and `git diff --check`; then inspect 1440, 1280, 1024, 768, 430, 390 and 375 px for row order, the 4:3 film aperture, full award subject, heading wraps, readability of the narrow fact rail, video loading/playback, focus, reduced motion, overflow and console errors. The anti-template pass must reject equal cards, new radii/shadows, repeated section frames, generic timeline styling, decorative gradients/glass/glows and mechanical phone stacking.

Decisions without references: the exact desktop gap, row padding and phone type reductions are neutral fitting values constrained by the supplied relationship and existing design system. The pre-existing commercial-use clearance risk for the award photograph remains unchanged.

Implementation result: the story is now grouped into two direct rows. The opening row keeps the complete MasterChef heading, biography and `Теперь я превращаю этот опыт в ваш идеальный гастрономический вечер.` together at left, opposite the documentary award photograph at right. The following row places `ChefStoryVideo` at left and the `Я — у вас дома` statement, approved Cyprus ornament and three existing workday facts at right. Both `.story-villa-film` and its `<video>` use an explicit `aspect-ratio: 4 / 3`; `object-fit: cover` center-crops the vertical source without stretching it. Desktop, tablet and phone preserve the same semantic and visual left/right relationships, with no CSS order reversal.

Verification result: ESLint, the production Vinext build, the three source/accessibility/media regression tests and `git diff --check` pass. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and 375 px measures the film at exactly `1.333` at every width, confirms it is landscape, loaded to ready state 4, playing, muted and looping with `object-fit: cover`, and finds zero story-image failures, story-boundary overflow or document-level horizontal overflow. Visual review at 1440 and 375 px confirms the requested text/photo row and the separate wide-video/text row remain legible and square-edged. The browser console contains no warning or error. The complete five-test command retains the separately documented generated-server integration failures; no generated server or runtime file was changed for this request.

Final anti-template audit: the former merged/interleaved story spread and phone chronology reversal were the unsuccessful templated elements; they are replaced by the two reference-driven media/text relationships rather than equal cards or a generic timeline. No new section, card, radius, shadow, gradient, glass, glow, icon, placeholder copy, marketing claim, decorative animation or UI-library styling was added. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user-supplied screenshot, the direct layout instruction, the immediate horizontal 4:3 clarification, the existing approved story media and project design system. Decisions without references: only the bounded gaps, row padding and mobile type reductions already recorded above. UI libraries used as visible components: none. Remaining limitations and risks: the portrait source film necessarily loses its top/bottom extremes inside a horizontal 4:3 crop, and the pre-existing award-photograph publication-rights risk is unchanged.

## Inquiry wide-screen rhythm correction plan — 2026-08-31

The user supplied a 2044 × 1008 web capture of the active illustrated inquiry close and said that the block feels slightly empty. Before interface edits, the active inquiry markup, complete stylesheet cascade, immutable 1536 × 1024 brush-villa asset, prior full-frame correction, footer boundary, reference map, design system, regression assertions and overlapping uncommitted work in the story and sourcing sections were audited. The illustration is already complete and correctly contained; the visible problem is the desktop grid’s `auto 1fr auto` row structure, which pins the only action near the bottom while the heading remains at the top and leaves a large accidental interval between the two related elements.

Templated or unsuccessful elements found: no generic template pattern is present. The unsuccessful detail is a content-agnostic full-height distribution rule inside a project-specific illustrated close. It treats the heading and its only response action as opposite-edge anchors, weakening their relationship and making the quiet paper reserve read as missing content.

Confirmed replacement: the user’s current screenshot and direct spacing feedback, the existing full-frame brush-villa rule, exact heading, exact Instagram action, approved paper/forest/rust palette and the existing 1024 px transition. On widths above 1024 px, the heading and action become one upper-left invitation cluster with a restrained responsive interval. The complete artwork remains bottom-right and fully visible; tablet and phone retain the already approved heading → full 3:2 illustration → action order.

Components retained: exact markup and copy, original PNG, intrinsic dimensions, `contain` fit, closing-field height, heading size, action size/states, footer, tablet/phone composition and every other page section. Component to rework: the wide-screen contact grid rows and action placement only. New components, assets, copy, decoration, animation and UI libraries required: none.

Implementation plan: change only the final wide-screen inquiry override so the second row sizes to its action and the remaining flexible reserve follows below; give the action a 48–64 px responsive separation from the heading; preserve the 1024 px and narrower rules unchanged; add a source regression for the desktop cluster; run lint, production build, rendered/source tests and `git diff --check`; then inspect 1440, 1280, 1024, 768, 430, 390 and 375 px for hierarchy, complete artwork, heading/action relationship, footer transition, overflow, focus, loading and console errors before the final anti-template audit.

Decisions without references: only the exact responsive interval between the already approved heading and action. It is a neutral fitting value bounded by the user’s screenshot and does not establish a new spacing system.

Implementation result: above 1024 px the inquiry grid now uses `auto auto minmax(0, 1fr)` rows with no generic row gap. The existing Instagram action occupies the second row and follows the heading after `clamp(48px, 3vw, 64px)`, producing a measured 61 px interval at the supplied 2044 px width and 48 px at 1440/1280 px. The former flexible gap no longer separates the two related elements. The complete illustration, field height, heading scale, action styling, footer and all rules at 1024 px and below are unchanged.

Verification result: ESLint, the production Vinext build, the three source/accessibility/media regression tests (including the new inquiry grid assertions) and `git diff --check` pass. Browser inspection at 2044, 1440, 1280, 1024, 768, 430, 390 and 375 px confirms the 1536 × 1024 artwork loads completely with `object-fit: contain`, the desktop invitation cluster remains within the quiet left reserve, the approved tablet/phone heading → 3:2 art → action order remains intact, every action target is at least 72 px high, headings have no self-overflow, and the document has no horizontal overflow. Visual review at 2044, 1440 and 390 px confirms that the wide-screen gap now reads as a compact invitation while the lower reserve remains attached to the full illustration. The browser console contains no warning or error. The complete five-test command still reports two worker-render integration failures (`default is not a function` inside the generated worker); the production build and all tests covering this CSS/document change pass, and no worker/runtime file was edited for this request.

Final anti-template audit: the correction removes one content-agnostic opposite-edge distribution rule and introduces no section, card, badge, icon, copy, decorative line, filler, repeated composition, radius, shadow, gradient, glass, glow, animation, generated asset or library-default styling. Mobile remains a separately composed image-first sequence rather than a reduced desktop cluster. Files created: none. Files changed for this request: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s 15:54 screenshot/direct feedback, the prior full-artwork instruction and the immutable local brush-villa asset. Decisions without references: only the bounded 48–64 px desktop interval. UI libraries introduced or used as visible components: none. Remaining task-specific limitation: the two unrelated generated-worker integration failures noted above; overlapping uncommitted story and sourcing changes remain preserved.

## Award-photo caption removal plan — 2026-08-31

The user directly requested removal of the visible `Финал · 2020 / конверт победителя` text beneath the MasterChef award photograph. Before interface edits, the active story markup, caption styles at desktop and phone widths, rendered regression, reference map, design system and dirty working tree were audited. The photograph remains requested documentary evidence; only its visible two-part caption is in scope.

Templated or unsuccessful element found: none. This is a direct content-removal correction. Confirmed replacement: no replacement text or decorative element; the image remains square-edged in its existing position with its meaningful alternative text. Components retained: the award figure, image, intrinsic dimensions, crop, biography, story layout and all responsive relationships. Components to remove: the `figcaption` and its now-unused selectors. New components, assets, copy and UI libraries required: none.

Implementation plan: record the direct instruction in the reference map and design system; remove the caption markup and caption-only CSS; update regression coverage to reject a visible caption inside the award figure while retaining the image and alternative text; run the focused rendered test, lint and `git diff --check`; then verify that the change introduces no overflow or empty caption gap. Decisions without references: none.

Implementation result: the complete `figcaption` containing `Финал · 2020` and `конверт победителя` is removed from the award figure. Its desktop and phone-only caption selectors are also removed, so no empty caption reserve or decorative rule remains. The award photograph, intrinsic dimensions, responsive crop and meaningful alternative text are unchanged. Regression coverage now rejects any caption inside `story-award-proof`.

Verification result: ESLint and the production Vinext build pass; the three source/accessibility/media regressions, including the changed story-composition test, pass; `git diff --check` passes. The full five-test command still has two unrelated generated-server integration failures because `dist/server/ssr/index.js` imports the absent `dist/server/index.js`; neither failing path was edited here. Live browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm zero visible award-caption text, zero `figcaption` nodes, a loaded award image, no empty caption gap and zero document-level horizontal overflow. The browser console contains no warning or error.

Final anti-template audit: this direct deletion introduces no replacement copy, label, badge, component, section, card, radius, shadow, gradient, glass, glow, icon, decoration, animation or library-default styling. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Reference used: the user’s direct removal instruction. Decisions without references: none. UI libraries introduced or used as visible components: none. Remaining task-specific limitation: none; the unrelated existing generated-server integration failures and previously recorded award-photo rights risk remain unchanged.

## Private-event photograph replacement plan — 2026-08-31

The user supplied a 2278 × 1510 outdoor photograph of the chef cooking crêpes and directly assigned it to `Приватные мероприятия`, asking that the upper-left inscription be concealed. Before implementation, the current three event-format figures, their intrinsic dimensions and alternative text, the complete `4 / 5` stage crop and phone alternation, the supplied original, existing media rights notes, active reference map/design system, dirty working tree and regression suite were audited. A web search did not locate a verified clean copy of the same frame.

Templated or unsuccessful element found: the current local `instagram-09.jpg` room frame is no longer the user-selected evidence for private events. The event-format composition itself remains approved and is not templated; only the second documentary source is superseded.

Confirmed replacement: the exact user-supplied outdoor cooking photograph. Preserve every source pixel and use the existing square-edged `4 / 5` cover aperture with a neutral central focal position. At that ratio the chef, face, apron, both working hands, crêpe plate and live outdoor service remain visible, while the far upper-left source mark falls outside the rendered aperture. This avoids generative reconstruction or destructive paint-over while achieving the requested visible result.

Components retained: event-format heading, order, names, descriptions, semantic figure markup, `4 / 5` aperture, square edges, phone alternation, the first and third photographs, page structure, typography and palette. Components to rework: the second image source, intrinsic dimensions, alternative text, focal percentage and source regression. New components, copy, decoration, interaction and UI libraries required: none.

Implementation plan: copy the supplied original non-destructively into `public/media/event-formats/`; point only the second format image at it with exact intrinsic dimensions and situation-specific Russian alternative text; use the neutral central focal position; update tests to require the new local asset and stop requiring `instagram-09.jpg` for delivery; run lint, production build, source/media tests and `git diff --check`; then verify the seven required widths for subject retention, concealed upper-left mark, image loading, title wrapping, text/image collisions and horizontal overflow. Complete the anti-template pass before publishing.

Decisions without references: only the exact central focal percentage, bounded by the supplied image and immutable `4 / 5` aperture. The screenshot carries a third-party source mark and no publication-rights record accompanied it; the project must treat commercial-use clearance as unresolved even though the mark is outside the rendered crop. UI libraries remain infrastructure-only.

Implementation result: the tracked original `public/media/event-formats/private-event-outdoor-crepes.png` now replaces only the second stage source. The page records the exact 2278 × 1510 intrinsic dimensions and the specific alternative text `Евгений Грыбенюк готовит блины перед гостями на приватном мероприятии`. The second stage uses `object-position: 50% 50%`; the approved `4 / 5` cover aperture excludes the far-left 23.49% of the source before the visible frame begins, so the upper-left mark remains outside the rendered image while the chef, both hands, crêpe and service equipment stay legible. The bitmap itself is unchanged; no image-generation edit, blur, paint-over or inpainting was performed.

Verification result: ESLint and the production Vinext build pass. The two source/media regression tests pass, `git diff --check` passes, and the new 2278 × 1510 asset loads at its exact natural dimensions. The complete five-test command retains the two previously documented generated-worker failures (`default is not a function`); the three source/accessibility/media tests pass and no worker/runtime file changed. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px confirm `object-fit: cover`, `object-position: 50% 50%`, three loaded event images, zero document-level horizontal overflow, no caption self-overflow at the measured edge widths, no text/image collision and no visible upper-left source mark. Desktop/tablet keep the three-stage row; phone keeps the approved alternating composition.

Final anti-template audit: the request changes one documentary source and one grounded focal percentage only. It adds no section, repeated card, radius, shadow, gradient, glass, glow, badge, icon, stock image, generated person, decorative object, placeholder copy, animation, action or UI-library styling. Files created: none; the supplied bitmap already existed as a tracked project asset. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: none; the superseded room frame was documentary but no longer matched the user’s selected evidence. References used: the exact user-supplied photograph, direct format assignment and the existing approved event-stage system. Decisions without references: only the neutral 50% focal position. UI libraries used as visible components: none. Remaining limitations and risks: publication rights for the marked source remain unverified; production deployment is pending explicit approval because the existing Site is public.
## Compact MasterChef proof plan — 2026-08-31

The user supplied the current desktop capture and directly required the first post-hero MasterChef proof to become smaller in every dimension: a modest horizontal rectangle immediately below the hero, with smaller copy, a smaller photograph, and the two supplied biography paragraphs rendered in one typeface. The active route, story markup, responsive rules, local award photograph, reference map, design system and current uncommitted work were audited before implementation. The existing row is `1344 × 726px` at 1440px viewport width, uses a heading up to `96px`, crops the photograph to `4 / 3`, and changes the closing sentence from Onest body copy to a `27–38px` Oranienbaum display statement; those choices directly conflict with the correction.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Full-width, tall award row | At 1344px wide and roughly 726px high it reads as another hero-sized chapter | Independently cap the row at 1080px and reduce its vertical padding so it reads as one compact proof strip below the hero | Exact location, two-column relationship, warm paper field and square edges |
| `66–96px` heading and `27–38px` closing statement | The mixed scale makes the biography feel like two unrelated typographic blocks | Reduce the heading and render both supplied paragraphs in the same Onest body size and leading | Exact heading and complete supplied text |
| `4 / 3` award crop | It makes the photograph taller and more dominant than requested | Use a smaller `16 / 9` landscape aperture with a face-and-envelope-preserving crop | Exact documentary photograph and meaningful alternative text |

Templated elements found: the oversized post-hero statement behaves like a second generic full-screen feature block and the display-sized closing paragraph creates an unnecessary marketing-quote pattern. Components retained: story section, semantic heading, both paragraphs, award figure, following film/home chapter, media, palette, typography sources and all later sections. Components reworked: award-row width, grid proportions, spacing, heading scale, paragraph typography and responsive award crop. New components, assets, copy, interactions, decoration and UI-library primitives required: none.

Implementation sequence: update the active reference map and design system; constrain and rescale only the award row; update structural assertions for the compact geometry and shared paragraph type; run lint, production build, tests and `git diff --check`; then visually verify 1440, 1280, 1024, 768, 430, 390 and 375px widths, including overflow, copy wraps, image subject retention, targets, focus and media states, before recording the final anti-template result.

Implementation result: only the opening MasterChef row was rescaled. It is centered at a maximum width of 1080px, uses restrained 30–44px vertical padding, a `16 / 9` desktop/tablet photograph, and a reduced `46–60px` display heading. The two exact biography paragraphs remain separate semantic paragraphs but both now compute to the same Onest family, size, weight and line height; the former display-sized close and its extra rule are removed. Phone keeps the same text-left/photo-right relationship, reduces the gap and uses the existing face-preserving portrait adaptation so the small image remains useful rather than becoming a thin thumbnail. The following film/home chapter is unchanged.

Verification result: at 1440px the row measures `1080 × 409.8px`, down from `1344 × 725.9px`; at 1024px it is `960 × 352.1px`; at 768px it is `720 × 302.8px`; at 390px it is `350 × 318.5px`; and at 375px it is `335 × 333px`. At every required width both paragraphs compute to the same Onest family, size and leading, the award image loads at its natural 1719px width, the story heading and row have zero self-overflow, and the document has zero horizontal overflow. Visual review at 1440, 768 and 390px confirms the chef's face, jacket and envelope remain visible, the row reads as a small horizontal proof rather than a second hero, and the mobile copy remains legible beside the smaller image. All visible page targets remain at least 44px, no completed image is broken and the browser console has no warning or error. The proof has no interactive, loading, empty or error UI state of its own; its only media loading state was verified directly.

ESLint, the production Vinext build, the story/source/accessibility regression and `git diff --check` pass. The complete five-test command retains the two already documented generated-worker integration failures (`default is not a function` inside `dist/server/ssr/index.js`); three source/accessibility/media tests pass, and no production worker/runtime file was changed for this visual request.

Final anti-template audit: the oversized second-hero rhythm and display-quote treatment are gone. The result adds no card surface, repeated grid, radius, shadow, gradient, glass, glow, decorative object, icon, placeholder, generic marketing copy, animation or library-default component. Files created: none. Files changed for this request: `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user-supplied current screenshot and exact scale/type correction, plus the existing approved local photograph and story system. Decisions without references: only the bounded responsive gaps and padding needed to fit the supplied content. UI libraries used as visible components: none. Remaining limitation and risk: the pre-existing commercial-publication clearance risk for the award photograph is unchanged; the intentional oversized `ОВОЩИ` outline heading elsewhere still self-overflows its own clipped decorative aperture on desktop, without causing document overflow, and was not altered by this request.

## Grape-harvest sourcing-photo replacement plan — 2026-08-31

The user supplied a 1794 × 1898 PNG showing Evgen holding a crate of harvested grapes and directly asked to replace the pumpkins with this photograph. Before interface edits, the active route, sourcing markup, complete sourcing stylesheet, current six-image composition, local asset register, responsive `contain` behavior, tests, design references and overlapping uncommitted work were audited. The pumpkin image appears only as the first photograph in the `ОВОЩИ` movement and in its source/regression records; no layout or style change is needed.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| `cyprus-pumpkin-harvest.webp` in the first produce aperture | The user directly replaced this subject with the supplied personal harvest photograph | Store a web-ready derivative of the exact supplied frame and use it as the first `source-farm-field` image with accurate intrinsic dimensions and alternative text | Existing two-image produce relationship, full-frame `contain` behavior, strawberry greenhouse, `ОВОЩИ` label, caption, desktop/mobile maps and square edges |

Templated elements found: none in the active sourcing movement. The change is a direct documentary-source substitution, not a redesign. Components retained: all markup structure, sourcing statements, responsive layout, palette, typography and later sections. Component to rework: one image source and its intrinsic/alternative metadata. New components, visible UI libraries, copy, decoration and interaction required: none.

Implementation sequence: update the active reference map and design system; add the optimized local derivative and asset record; replace the pumpkin source in JSX; update the regression assertion; run lint, the production build, tests and `git diff --check`; then visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px for complete-frame rendering, subject visibility, intrinsic ratio, loading, overflow and console errors before recording the final anti-template result.

Decisions without references: only the neutral WebP delivery format and filename. The supplied image remains compositionally unchanged, including the visible circular arrow near the right edge; removing it would be an unrequested image edit. Publication ownership and broader reuse rights have not been independently verified.

Implementation result: `public/media/sourcing/evgen-grape-harvest.webp` is a 1794 × 1898, 377 KiB web-ready derivative of the exact supplied PNG. It replaces only the first `source-farm-field` source; JSX now carries the correct intrinsic dimensions and the alternative text `Евгений Грыбенюк с ящиком собранного винограда`. The pumpkin asset remains locally as inactive licensed source history. The strawberry photograph, category label, statement, markup, CSS and desktop/mobile placement are unchanged. The asset register now records the new source and the unresolved publication-rights status.

Verification result: the optimized asset preserves the source dimensions and complete composition, the local route returns `200`, and the asset returns `200 image/webp`. ESLint, the production Vinext build, the three source/accessibility/media regression tests and `git diff --check` pass. The complete five-test run retains the two pre-existing generated-worker failures (`default is not a function` in `dist/server/ssr/index.js`); neither failure touches the sourcing asset or page source, and the unchanged local development route still renders successfully. Automated browser screenshots, DOM inspection and responsive resizing were not performed because the active Sites workflow forbids browser QA without an explicit browser-testing request. The project-mandated visual pass at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains an open blocker and completion is not claimed.

Final anti-template audit: the change replaces one approved documentary frame and introduces no section, layout, card, radius, shadow, gradient, glass, glow, icon, decorative object, placeholder, animation, interaction, copy block or UI-library styling. Files created: `public/media/sourcing/evgen-grape-harvest.webp`. Files changed for this request: `app/page.tsx`, `tests/rendered-html.test.mjs`, `public/media/sourcing/CREDITS.md`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: none. References used: the exact user-supplied photograph, direct replacement instruction and the existing approved full-frame sourcing system. Decisions without references: the neutral WebP filename and delivery encoding only. UI libraries used as visible components: none. Remaining limitations and risks: the seven-width visual review is pending explicit browser-testing authorization; publication rights for the supplied photo are not independently verified; and publishing is pending explicit approval because the existing Site is public and the working tree also contains unrelated unpublished changes that must not be pushed implicitly.

## Shared biography-font plan — 2026-08-31

The user identified the first biography paragraph as font 1 and directly required the following `Теперь я превращаю…` paragraph to use that same font. Before interface edits, the active story markup, complete story CSS cascade, desktop/tablet/phone overrides, self-hosted font declarations, design system, reference map, regression assertions and overlapping uncommitted work were audited. Both rules currently repeat the same Onest values independently, which visually matches the prior requirement but does not give the two paragraphs one structural source of truth.

| Existing element | Why it needs rework | Confirmed replacement | Retained |
|---|---|---|---|
| Separate `.story-origin-copy` and `.story-home-close` typography declarations | Duplicated font family, size, weight and leading can diverge and does not encode the user’s explicit “same font 1” relationship | Apply `.story-origin-copy` to both paragraphs and reduce `.story-home-close` to its distinct margin/color role | Exact copy, paragraph separation, color hierarchy, layout and every other section |

Templated elements found: none; this is a typography-consistency correction inside an already approved content-led composition. Components retained: the complete story, both semantic paragraphs, heading, award photograph, second story row, fonts, palette and responsive geometry. Component to rework: only the two paragraph class assignments and their CSS ownership. New components, assets, copy, interaction, decoration and UI-library primitives required: none.

Implementation sequence: update the active reference map and design system; give both paragraphs the shared font-1 class; remove duplicated typography declarations from the close modifier and its breakpoint overrides; strengthen regression assertions around the shared class and single-source CSS; run ESLint, the production build, focused tests and `git diff --check`; then record the final anti-template audit. The Sites workflow forbids browser screenshots, DOM inspection and responsive resizing without an explicit browser-testing request, so the project-mandated seven-width visual review remains an open blocker unless separately authorized.

Implementation result: the second paragraph now uses `className="story-origin-copy story-home-close"`. The shared `.story-origin-copy` rule is the only owner of Onest, size, weight and line height on desktop, tablet and phone. `.story-home-close` now contains only its distinct margin, padding, border and ink color; all duplicated breakpoint typography overrides were removed. Copy, photograph, heading, layout, responsive geometry and later sections are unchanged.

Verification result: the existing local route returns `200`. ESLint, the production Vinext build, the focused palette/composition regression tests and `git diff --check` pass. The composition regression requires the shared class on the close paragraph and rejects any font family, size, weight, tracking or line-height declaration inside `.story-home-close`. The complete five-test command retains the two pre-existing generated-worker integration failures (`default is not a function` in `dist/server/ssr/index.js`); the remaining three source/accessibility/media tests pass, and the failures do not touch this CSS relationship. Automated browser screenshots, DOM inspection and responsive resizing were not performed because the active Sites workflow forbids browser QA without an explicit browser-testing request. The mandatory 1440, 1280, 1024, 768, 430, 390 and 375 px visual review therefore remains open, so interface completion is not claimed.

Final anti-template audit: this change introduces no new section, card, radius, shadow, gradient, glass, glow, icon, decorative object, placeholder, animation, interaction or library-default styling. Files created: none. Files changed for this request: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: none. Rework: the second paragraph now directly shares font 1 with the first rather than independently duplicating its values. References used: the user’s exact typography correction and the approved Onest body system. Decisions without references: none. UI libraries used as visible components: none. Remaining limitations and risks: the required seven-width visual review is pending explicit browser-testing authorization; the existing Site is public and publication requires approval; the dirty working tree contains unrelated unpublished changes, so deploying the full source would broaden this request and was not attempted.

## Cyprus-ornament square-collage redesign plan — 2026-09-01

The user directly requires four changes: every photograph inside the hero collage must become an equal small square; the visual system must be based on Cyprus patterns and ornament; borders, transitions and palette may be newly authored; and `Вечера бывают разные` must move immediately after the hero. The copied project was audited before interface edits. It is one Russian-language route with forty ordered hero photographs, a separate apron portrait, three exact event formats, the MasterChef biography and award proof, the original kitchen film, six sourcing photographs, a Cyprus tapestry pair, one Instagram action and a decorative closing villa. The source project outside this copied folder remains untouched.

Confirmed sources are the user’s direct brief; the existing project-approved Lefkaritika research recorded from UNESCO and Visit Cyprus; the two project-local Cyprus garden tapestry assets; and the actual local media/content journey. The implementation extracts open diamonds, cut-work voids, stitched edging, olive foliage, terracotta fruit and limestone/olive/terracotta/mineral-blue relationships. No textile specimen, tourism brand, other website, Greek-key stock border or generated illustration is copied.

| Existing element | Why it must change | Confirmed replacement | Retained |
|---|---|---|---|
| Forty irregular hero tiles driven by four placement maps | Directly conflicts with the new equal-square instruction and makes the collage code needlessly complex | A deterministic 10 × 4 square grid on large screens, 8 × 5 at tablet, 5 × 8 on compact layouts and 4 × 10 on phones | Exact forty sources, source order, separate chef portrait and hero copy |
| Format block after story and sourcing | Directly conflicts with the required narrative order | Move the complete `Вечера бывают разные` section immediately after the hero | Exact title, three format names, descriptions, photographs and their order |
| Ornament isolated inside the chef-story row | Cyprus identity does not govern the complete page | A non-wallpaper system of Lefkara-derived frame corners, diamond dividers, textile edge transitions and existing tapestry fields | Existing approved tapestry assets and square geometry |
| Warm paper/forest/rust palette used mainly as editorial color | The user authorizes a broader palette change and asks for a stronger Cyprus style | Limestone, shell, dark olive, terracotta and mineral blue with defined contrast roles | Natural documentary color and accessible focus |
| Uniform hard section breaks | They do not express the new ornamental brief | Stitched diamond divider after hero/formats, open-lattice edge around the film and woven perimeter on sourcing/inquiry | Semantic landmarks and exact content |

Components retained: page landmarks, header destinations, hero copy, forty photographs, apron portrait, three event formats, `ChefStoryVideo`, biography/proof, sourcing scenes, contact action, footer, alternative text and reduced-motion behavior. Components reworked: hero grid generation, section order, decorative divider markup, complete active stylesheet, responsive compositions and regression tests. New component genuinely required: one decorative `CyprusDivider` primitive with no semantic content. No form, stock media, generated art, icon library, testimonial, pricing, FAQ or new marketing copy is added.

Implementation sequence: update the reference records; create the equal-square first viewport and show the coherent local preview; move the exact format section after the hero; apply the ornament/palette system to the remaining existing blocks; update tests; run lint, build and source checks; perform the anti-template audit; publish only the copied Site project. Decisions without direct references are exact line weights, diamond sizes, crop positions, breakpoint thresholds and motion timing; they are bounded by the supplied media and accessibility requirements. React/Next/Vinext remain technical primitives only.

### Cyprus-ornament square-collage implementation result — 2026-09-01

Implementation result: the four placement-map builders and all rectangular hero spans are removed. The forty exact local sources now render in one deterministic equal-square grid: ten columns on large screens, eight at tablet, five on compact screens and four on phones. The real apron portrait remains a separate foreground identity image rather than being misrepresented as one of the forty collage cells. The hero uses a solid shell reading field, olive structure, terracotta proof accents and a five-diamond frame detail.

The complete `Вечера бывают разные` chapter now follows the closing hero tag before biography, film or sourcing. Its exact heading, three format names, descriptions, photographs and order are unchanged. It is composed as one connected woven triptych on desktop and an overlapping six-column sequence on compact screens, not three rounded cards. The story then retains the award proof and original film; sourcing retains all six photographs and statements; inquiry retains the complete villa artwork and Instagram route.

Cyprus identity is now structural rather than isolated: three semantic-free diamond dividers mark narrative transitions; the format triptych, proof image, film stage, sourcing perimeter and inquiry receive distinct Lefkara-derived corner/edge treatments; the existing square and strip tapestry assets remain active. The new palette uses limestone, shell, deep olive, terracotta, mineral blue, earth and warm-rule roles. It includes no Greek-key stock pattern, flag literalism, gold luxury treatment, gradient, glass, glow, radius, general shadow, generated art or external brand material.

Files created: none. Files changed for this request: `.openai/hosting.json`, `app/page.tsx`, `app/globals.css`, `app/site-config.ts`, `public/favicon.svg`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: irregular bento-like hero geometry, isolated ornament use and the late three-column formats placement. Rework: equal square grid, whole-page ornament grammar, connected content-led triptych and direct hero → formats journey. References used: the user’s direct square/reorder/palette brief, the existing approved Lefkaritika research, local tapestry assets and actual project media. Decisions without references: exact module sizes, strokes, gaps, crop focal points, breakpoint thresholds and motion timings. UI libraries used as visible components: none; React/Next/Vinext remain infrastructure only.

Verification result: the local route returns `200`; ESLint, the production Vinext build, five focused narrative/grid/ornament/media tests and `git diff --check` pass. Source-level responsive assertions cover the required 10/8/5/4-column grid changes, exact forty-image inventory, hero → formats → story → sourcing → inquiry order, reduced-motion handling, local video, captions and assets. Automated screenshots, DOM inspection and seven-width browser resizing were not performed because the active Sites workflow forbids browser QA without an explicit browser-testing request. The project-policy visual review at 1440, 1280, 1024, 768, 430, 390 and 375 px therefore remains the only open completion limitation.

Final anti-template audit: no centered two-button hero, bento spans, repeated rounded cards, SaaS section sequence, stock avatar, testimonial, pricing, FAQ, partner-logo strip, decorative 3D object, purple AI gradient, glass, glow, cursor effect, scroll hijack, marquee, placeholder copy or invented service claim is present. The repeated diamond is justified by the user’s Cyprus-ornament requirement and changes scale/role across hero, dividers, frames and inquiry instead of becoming a generic wallpaper.

### Typography correction — 2026-09-01

The user explicitly requires the fonts to change as part of the same redesign. The current Oranienbaum/Onest pair is therefore superseded. Roboto Flex becomes the variable contemporary display/body family, with controlled width and weight rather than template-default sizing; Literata Italic becomes the limited accent for emotional phrases and format names. Both families are already self-hosted in Cyrillic and Latin project assets. No network font, external brand typeface or font-library component is introduced.

Implementation result: every active Oranienbaum and Onest declaration is removed. Roboto Flex now owns navigation, body copy and the compressed high-weight heading hierarchy; Literata Italic is limited to emphasized hero language, service names and documentary captions. Both use the existing local Cyrillic/Latin files with `font-display: swap`, so the redesign adds no network dependency. ESLint, the production Vinext build, six focused source/media/layout/type tests and `git diff --check` pass. The previously recorded seven-width browser visual review remains the only open verification limitation.

## Full Cyprus textile-system correction — 2026-09-01

The user correctly identifies that the current Cyprus expression is superficial: a small five-diamond hero badge, three nearly identical diamond dividers and isolated diamond corners do not constitute a visual system. The active route, forty-square collage, section order, local tapestry assets, responsive layouts, palette, fonts and exact story/media sequence were audited before implementation. The content and logic remain approved; the visual grammar is the only scope of this correction.

Templated or weak elements found: one repeated diamond used as a universal ornament; plain rectangular section perimeters without an internal textile rhythm; a format triptych separated only by rules; a film frame and inquiry close that receive the same corner token; and no coherent edge treatment connecting the page on mobile. These choices make the Cyprus reference read as an afterthought.

Confirmed replacement: derive three compatible geometric families from the already approved Lefkaritika sources—cross-stitch cells, open cut-work rosettes and stepped woven lozenges—and give each a distinct role. Cross-stitch cells form the continuous side rails and hero loom edge; cut-work rosettes create chapter bands; stepped lozenges separate the three format stages and close the inquiry. The existing hand-painted Cyprus tapestry remains the only representational decorative artwork. Exact diamonds, crosses and steps are original CSS geometry, not a copied lace specimen.

Components retained: all copy, forty ordered square photographs, chef portrait, three format photographs and descriptions, biography, MasterChef proof, film behavior, sourcing photographs/statements, villa artwork, Instagram action, typography and palette. Components reworked: hero edge treatment, section transitions, format perimeter/separators, story-film frame, sourcing separators, inquiry perimeter and persistent mobile/desktop page rails. New components genuinely required: one semantic-free `CyprusPatternBand` primitive with three pattern variants and one semantic-free `CyprusPageRails` primitive. No new claims, imagery, icons, cards, controls or interaction are introduced.

Implementation plan: replace the five-diamond hero badge and seven-diamond divider with the three-family pattern primitives; introduce a continuous but restrained page edge; assign a specific pattern role to formats, story/video, sourcing and inquiry; preserve equal hero squares and the requested narrative order; update regression coverage to reject the old shallow markers; run lint, build, focused tests and `git diff --check`; then publish the copied Site. Exact module size, rail density and breakpoint visibility are implementation decisions bounded by readability and touch-safe mobile gutters. Automated browser visual QA remains unavailable without an explicit browser-testing request under the active Sites workflow.

Implementation result: the five-diamond badge, three generic seven-diamond dividers and standalone diamond corner stickers are removed. Two continuous cross-cell selvage rails now frame the viewport; the hero closes with a full cross-cell loom band; formats receive a stepped-lozenge band plus three different woven marks; the award proof, film chapter, sourcing joins and inquiry use deliberately different rosette/cross/stepped constructions. Narrow layouts simplify module count and rail width without mechanically stacking a desktop border. The forty equal hero squares, exact section order, all copy, photographs and film remain unchanged.

Verification result: the local route returns `200`; ESLint, the production Vinext build, six focused grid/order/pattern/type/media tests and `git diff --check` pass. Regression coverage requires all three ornament families, the page rails, three format marks, story/film patterns, two sourcing joins and both inquiry bands while rejecting the retired divider and hero badge. Automated screenshots, DOM inspection and seven-width browser resizing were not performed because the active Sites workflow forbids browser QA without an explicit browser-testing request; the mandated 1440/1280/1024/768/430/390/375 px visual pass remains open.

Final anti-template audit: the correction adds no new card, radius, shadow, gradient, glass, glow, icon set, stock artwork, invented copy, marketing section, animation loop or UI-library theme. Files created: none. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user’s critique and the already approved Lefkaritika/handicraft sources plus local tapestry assets. Decisions without direct references: exact module density, rail width and responsive module count. UI libraries used as visible components: none; React/Next/Vinext remain infrastructure only. Remaining risks: browser visual verification is pending explicit authorization and the previously recorded publication-rights questions for some documentary images remain unchanged.

## WebsiteFactory application plan — 2026-09-01

The user explicitly approved the WebsiteFactory reference research for implementation in this copied
Site. Audit scope: `app/page.tsx`, `app/globals.css`, the story-video playback hook, all current routes,
assets, tests, active design records and the already published copied Site project. Content, forty
hero images, apron portrait, event sequence, biography, award proof, story film, sourcing evidence,
villa illustration and all current destinations remain approved and are retained.

Templated or unsupported elements found:

1. Forty noninteractive hero tiles use a staggered entrance and hover zoom/filter. They look like a
   generic gallery effect, delay evidence and have no interaction meaning.
2. Multiple format/story/source carriers use view-timeline opacity/translation. The page accumulates
   reveal behavior without one information or navigation purpose.
3. Utility copy falls to 8–9 px in navigation, eyebrow, section label, contact action and footer.
4. The visually primary header action says only `Instagram`, even though the user journey is to
   discuss a private evening; the channel has displaced the outcome.
5. Several pattern bands overlap the same chapter transition. The Cyprus pattern is approved, but a
   repeated line without a distinct structural job becomes noise.
6. `MediaMotionControl` and the hero-video component remain as an unused event-bus path even though
   neither control nor hero video is rendered.

Confirmed replacements:

- WebsiteFactory `HERO-027`, `PHOTO-006` and the Central/noma/Cardinali live principles replace the
  hidden-first gallery behavior with a static first-frame documentary field.
- NN/g motion guidance and web.dev performance guidance remove decorative hover and multi-carrier
  reveal; only anchor navigation, interaction feedback and viewport video playback remain.
- GOV.UK/Material interaction evidence sets establish the outcome-specific `обсудить вечер` label,
  visible focus and minimum utility type/target sizes.
- KOL, MAD, Ikoyi and Base section evidence keep only lines that guide, separate a content mode or
  frame proof. One major pattern band remains at each chapter boundary.
- The Modern, Social Pantry, PlateForm Cyprus and Urban Catering retain the three distinct event
  scenarios and make the inquiry outcome primary without inventing a new channel.

Components retained: all semantic landmarks and content components, `CyprusPatternBand`,
`CyprusPageRails`, `FormatWeaveMark`, `EventFormats`, `ChefStoryVideo`, all current media, alt text,
captions and reduced-motion video behavior. Components reworked: action labels, transition-band
placement, utility typography, media hover/motion, focus-safe interaction feedback and responsive
microtype. Components removed: the unused global media control/event bus and unused hero-video
component. New visible components required: none.

Implementation sequence: update the reference records first; remove unsupported motion and redundant
bands; update action wording and utility typography; simplify the playback hook; extend focused
regression tests; build; run lint/tests; preview the representative first screen; verify the full
route at 1440, 1280, 1024, 768, 430, 390 and 375 px including keyboard/focus/reduced motion/video;
perform anti-template audit; publish only this copied Site project. Decisions without direct
references remain exact retained Cyprus geometry, crop focal points and breakpoints. No new palette,
font, imagery, claim, form, icon, library theme or contact channel is authorized.

### WebsiteFactory application result — 2026-09-01

Implementation result: the hero title and documentary evidence are visible in their final state on
the first frame. The forty noninteractive tiles no longer animate, zoom or refilter on hover. All
view-timeline chapter reveals are removed. Header and closing actions now lead with the outcome
`обсудить вечер`; the verified Instagram destination remains explicit in the accessible name and as
secondary visible channel text in the closing action. Navigation, eyebrow, section label, action and
footer utility text now use at least 11 px while every interactive target remains at least 44 px.

Transition density is reduced without erasing the approved Cyprus identity. The extra pattern band
inside the formats chapter and the second pattern at the contact entrance are removed; the remaining
full-width bands each separate one chapter, while proof/film/source strips frame their own evidence.
The event photographs now explicitly override their HTML intrinsic heights and honor the intended
`4:5`, `5:4` and `4:3` apertures. At 390 px this reduces the formats chapter from approximately
4,865 px to 1,783 px and the complete route from approximately 11,668 px to 8,586 px, while preserving
all three images and descriptions.

The unused global media-control event bus and unused hero-video component are removed. The active
story film retains only the viewport observer, reduced-motion query, muted playback, poster, local
caption track and offscreen pause. The unapproved production route `/hero-blur-preview`, including
its gradient masks and backdrop-blur experiments, is also removed; the root route is now the only
interface route emitted by the build.

Files created: `docs/WEBSITEFACTORY_REFERENCE_RESEARCH_2026-09-01.md`. Files changed:
`app/page.tsx`, `app/globals.css`, `app/media-motion.tsx`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Files removed:
`app/hero-mosaic-video.tsx`, `app/hero-blur-preview/page.tsx` and
`app/hero-blur-preview/preview.module.css`.

Templated/unsupported elements found: hidden-first gallery entrance, decorative image hover,
multi-carrier scroll reveal, 8–9 px utility text, channel-first primary action, redundant transition
bands, an unused media-control architecture and a production experimental blur route. Rework:
static first-frame evidence, interaction-only feedback, readable utility scale, outcome-specific
inquiry, one transition band per chapter, simplified playback and one approved public route.

References used: the user-approved WebsiteFactory three-source registry; Central, Massimo Bottura,
Alexandre Couillon, Cardinali Studio, noma, KOL, MAD, Ikoyi, Base Design, The Modern, Social Pantry,
PlateForm Cyprus, Urban Catering Cyprus, GOV.UK button guidance, NN/g motion guidance and web.dev
animation-performance guidance. Deliberate exclusions and element mappings remain in the reference
map and research file. Decisions without direct references: retained Cyprus module dimensions,
existing crop focal points, existing breakpoints and the neutral `160ms` feedback token.

Visible UI libraries used: none. React, Next-compatible Vinext and the browser platform remain
technical primitives only. Seven-width verification at 1440, 1280, 1024, 768, 430, 390 and 375 px
finds no horizontal overflow, heading overflow, target below 44 px or utility type below 11 px.
Wide, tablet and phone hero/event/story/source/inquiry compositions were visually inspected. The
formats deep link lands exactly at its heading; the primary action focus shows the two-color ring
without clipping; no browser console warnings or errors were recorded.

Final anti-template audit: no centered two-button hero, bento spans, generic cards, repeated radius,
stock gradient, glass, glow, generic paper texture, testimonial, pricing, FAQ, partner strip,
placeholder copy, decorative hover, parallax, marquee, scroll hijack or unreferenced route remains.
Remaining limitations/risks: commercial-use clearance is still unresolved for the previously
recorded STB/Fakty award image and several documentary sourcing photographs. No form states exist
because no form or new channel was introduced. Real-device assistive-technology and low-end-phone
video decoding were not separately lab-tested; the page uses the verified browser/static fallback
behavior and contains no blur or chapter animation requiring phone compositor acceptance.

## Rejected result and full visual correction plan — 2026-09-01

The user rejected the previous result as unrelated to the references. The diagnosis is specific: the
implementation changed motion and microtype but retained the old forty-cell photo wall, persistent
Cyprus rails, multiple pattern bands, framed/overlapping triptych and oversized mixed poster type.
Those features dominated perception and are not present as an extracted principle in Central, noma,
The Modern, Social Pantry, Urban Catering, Massimo Bottura or Alexandre Couillon.

Templated/unsupported elements to remove: full-field equal-square hero mosaic; sharp portrait floating
over that mosaic; page-long ornament rails; every `CyprusPatternBand`; every `FormatWeaveMark`;
ornamental proof/film/source/contact frames; overlapping mobile event stages; illustrated inquiry
background; compressed outline source headings; repeated inset corner marks. The forty supplied
images and ornament assets remain stored but become inactive rather than being misused as layout.

Confirmed replacement: Central/noma supply one-image/one-statement hero and place → source → table
pacing; Bottura/Couillon supply concise first-person chef chapters; The Modern/Social Pantry supply
real event scenarios followed by decision copy; Urban Catering supplies the outcome-specific inquiry;
NN/g/web.dev supply static essential content and interaction-only motion. Components retained:
semantic landmarks, exact hero title/eyebrow, exact event names/descriptions/images, biography,
award proof, `ChefStoryVideo`, workday facts, six sourcing images/statements, Instagram destination,
footer anchors, alt text and reduced-motion playback. Components reworked: every visible layout and
the complete active stylesheet. Components removed: all ornament/collage render primitives and the
villa illustration from the active route. New visible components required: none.

Implementation sequence: replace the active route with the direct-reference editorial structure;
replace the stylesheet with the flat-surface system; update regression tests to reject the old visual
language; build; preview the first screen; visually check the full route at 1440, 1280, 1024, 768,
430, 390 and 375 px; perform the anti-template audit. No version is published until the user sees
and accepts this corrected local result.

### Direct-reference correction result — 2026-09-01

The local route is now rebuilt as one coherent editorial/private-dining site. The opening pairs the
exact chef identity with one dominant real portrait. It flows directly into three distinct event
scenarios, then a dark chronological chef chapter, three calm sourcing chapters and one outcome-led
Instagram inquiry. The source portrait is optically cropped at the 821–1100 px range so the embedded
phone screenshot bars never enter the visible aperture; the underlying documentary source is not
retouched. The stale metadata, award alternative text and favicon label now use the same authoritative
surname spelling `Грыбенюк` as the visible identity.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`, `app/site-config.ts`,
`public/favicon.svg`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated/unsupported elements found: the forty-cell hero wall, floating portrait, persistent
textile rails, repeated pattern bands, framed/overlapping event triptych, outline poster headings,
ornamental evidence frames and illustrated generic close. Rework: all of those visible systems are
removed from the active route and replaced by direct-reference image/copy relationships, flat
surfaces, structural hairlines and content-specific chapter pacing.

References used: Central and noma for one-image/one-statement identity and source-led pacing;
Massimo Bottura and Alexandre Couillon for concise authored biography with proof; The Modern, Social
Pantry and Urban Catering Cyprus for concrete private-event scenarios and outcome-specific inquiry;
NN/g and web.dev for static essential content and interaction-only feedback. Decisions without a
direct visual reference are the bounded rust/forest values retained from the project, exact crop
focal percentages, the quiet sequence numbers and the 1100/820/560 px breakpoints. Visible UI
libraries used: none; React, Next-compatible Vinext and browser primitives remain infrastructure.

Desktop and mobile verification: 1440, 1280, 1024, 768, 430, 390 and 375 px were visually inspected
and measured. Every width has `scrollWidth === innerWidth`, no heading overflow, no broken image,
no interactive target smaller than 44 × 44 px and no utility text below 11 px. Hero, formats, story,
sourcing and inquiry were inspected on wide and phone compositions. The main inquiry has a visible
2 px rust focus outline, 4 px offset and contrasting 6 px paper separation; the browser console has
no warnings or errors.

Final anti-template audit: no centered two-button hero, collage, bento grid, repeated card surface,
shared rounding, stock gradient, glass, glow, decorative blur, testimonial, pricing, FAQ, partner
strip, placeholder copy, image hover, reveal animation, parallax, marquee, scroll hijack or stock
library styling remains in the rendered route. Remaining limitations/risks: commercial publication
rights for the previously recorded award and sourcing photographs are not independently verified;
real-device assistive-technology and low-end-phone video decoding were not lab-tested. The corrected
version is local only and intentionally has not been pushed, saved as a new Sites version or deployed.

## User-directed collage and no-green implementation plan — 2026-09-01

The user reviewed the corrected local page and gave two precise changes: remove the green color and
keep the collage. The active route, forty local hero images, inset portrait source, flat editorial
layout, exact content, responsive rules, tests and reference records were audited before interface
editing. The bounded interpretation is to restore the collage only inside the existing right hero
media field, not the rejected full-page ornamental system.

Templated/unsupported elements found: none in the corrected editorial structure. The unsupported
choice is the forest-green story surface and forest-colored utility/quote roles after the user
explicitly removed that color. Components retained: header, left hero copy, all post-hero sections,
event/source layouts, biography, film, contact, navigation and interaction states. Components to
rework: hero media field and forest color assignments only. New visible components required: one
semantic-free local collage grid and its inset identity portrait; no new content or library primitive.

Implementation plan: add the forty approved local photographs to the right hero field; retain the
portrait as its sharp anchor; remove the forest token and remap its roles to ink/rust; update tests
and the three design records; run lint, focused tests, production build and source checks. The public
Site remains unchanged until the revised local result is accepted.

### Collage and no-green implementation result — 2026-09-01

Implementation result: the clean split hero remains, while its right media field now contains the
complete forty-image local collage in a five-by-eight grid. The apron portrait sits inside that field
as the sharp identity anchor; its unchanged screenshot source is optically cropped so embedded phone
chrome stays outside the visible aperture. The former forest token and all active references to it
are removed. Biography uses neutral ink, source quotations use rust and image fallbacks use ink.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated elements found: none added; the rejected full-page ornamental wall is not restored.
Rework: only the right hero media field and green color roles changed. References used: the user's
exact collage/no-green instruction, the existing approved forty-image local asset set and the active
editorial split system. Decisions without references: five-by-eight subdivision, two-pixel seams and
bounded portrait inset/crop. Visible UI libraries used: none; framework image delivery remains a
technical primitive.

Verification result: ESLint, six focused tests, `git diff --check`, the production build and the
local HTTP response pass. Regression coverage requires all forty collage assets, the five-by-eight
grid, inset portrait, exact copy/content and absence of every former green token. Browser screenshots,
DOM inspection and seven-width resizing were not performed because the active Sites workflow permits
those only after an explicit browser-testing request. That visual pass at 1440, 1280, 1024, 768, 430,
390 and 375 px remains the only open completion limitation. The public Site is unchanged.

Final anti-template audit: no ornament rail, pattern band, generic card, radius, gradient, glass,
glow, generated artwork, testimonial, pricing, FAQ, placeholder copy, image hover, reveal animation,
parallax, marquee or library-default styling is introduced. The collage is justified directly by
the user's instruction and is contained within one editorial media field rather than becoming the
page-wide composition previously rejected.

## User-directed hero hierarchy implementation plan — 2026-09-01

The user supplied an exact spatial correction: title above, apron photograph below and collage at
right. The current two-column hero, copy grouping, forty-image grid, inset portrait, responsive order,
source crop, palette, post-hero route and tests were audited before visual editing.

The unsupported element is the portrait floating over the right collage: it contradicts the new
three-zone hierarchy and conceals documentary cells. Retained: exact copy, forty collage images,
apron source, two-column hero, flat palette, header and every later section. Reworked: hero DOM grouping,
left-column vertical rhythm, portrait aperture and compact order. New components required: none; the
existing portrait and collage become siblings instead of overlapping layers.

Implementation plan: create a left hero wrapper; keep copy at its top; move the apron figure below;
leave the five-by-eight collage as the complete right field; author phone order copy → portrait →
collage; update regression coverage and design records; run lint, tests, build and response checks.
The public Site remains unchanged until the revised local result is accepted.

### Hero hierarchy implementation result — 2026-09-01

Implementation result: the hero now has three explicit zones. `hero-left` groups the eyebrow/title
at top and a separate `4 / 5` apron figure below. The five-by-eight collage is the complete right
column and no portrait obscures its forty cells. At 820 px and below the DOM/CSS order is copy,
portrait, collage, with independent portrait width and spacing for phone screens.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated elements found: none. Rework: the unsupported floating portrait was moved into the
user-specified lower-left field; no post-hero component changed. Reference used: the user's exact
spatial instruction and the already approved collage/no-green system. Decisions without references:
bounded `4 / 5` portrait aperture, 56–82% responsive portrait width and neutral spacing. Visible UI
libraries used: none; the framework image primitive remains delivery infrastructure only.

Verification result: ESLint, six focused tests, `git diff --check`, the production build and local
HTTP response pass. Regression coverage proves copy → portrait → collage source order, the separate
left wrapper, `4 / 5` portrait aperture, all forty assets and absence of the former overlay anchor.
The required seven-width browser visual pass remains open because the active Sites workflow permits
browser QA only after an explicit browser-testing request. The public Site remains unchanged.

Final anti-template audit: the correction adds no card, border radius, ornament, gradient, glass,
glow, generated asset, decorative animation, generic marketing block or library-default styling.
The three-zone hero reflects the user's content hierarchy rather than a reusable landing template.

## User-directed chronological story implementation plan — 2026-09-01

The user defined the story as one chronology: MasterChef victory, accumulated European and
Mediterranean experience, then private dinners, private events and master classes. The active route,
story DOM, award proof, biography, present-day film/facts, three exact format rows and responsive
alternation were audited before editing.

Unsupported elements found: the formats currently precede MasterChef, so the service outcome appears
before its origin; the MasterChef row is text/photo while the requested story must begin photo/text.
Retained: every word, image, film, format and later section. Reworked: story/formats route order,
MasterChef row column assignment and phone DOM reading order. New components/assets required: none.

Implementation plan: move the story immediately after hero; reorder its first row to award proof then
biography; keep present-day text then film; place EventFormats after story so its existing alternating
rows complete the chronology; update regression coverage and records; run lint, tests, build and
response checks. The public Site remains unchanged until the local result is accepted.

### Chronological story implementation result — 2026-09-01

Implementation result: `От MasterChef к вашему столу` now begins immediately after the hero. Its
first row is award proof then biography copy; its second row remains present-day copy then film. The
three event formats follow directly and retain their exact order while continuing the requested
photo/text, text/photo, photo/text alternation. The resulting route reads victory → accumulated
experience → work at home → private dinner → private event → master class.

Files created: none. Files changed in the combined local correction: `app/page.tsx`,
`app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`,
`docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: none. Rework: story/formats order,
MasterChef media/copy sides and phone reading order only. Reference used: the user's exact chronology
and alternation instruction. Decisions without references: none beyond the already recorded bounded
spacing and grid columns. Visible UI libraries used: none.

Verification result: ESLint, six focused tests, `git diff --check`, production build and local HTTP
response pass. Coverage requires story before formats, award before biography, present-day copy before
film, formats before sourcing and every original media/copy item. Seven-width browser visual QA is
still open because it was not explicitly requested under the active Sites workflow. The public Site
is unchanged.

Final anti-template audit: the correction introduces no timeline widget, card set, new marketing
copy, stock image, decorative icon, gradient, glass, radius, motion or library theme. Alternation is
content-led and chronological rather than a reusable visual gimmick.

## User-directed cream-surface implementation plan — 2026-09-01

The user explicitly requires the existing cream color everywhere. The active paper tokens, section
backgrounds, story/contact/footer contrast roles, media fallbacks, borders and interaction states
were audited before editing. The unsupported elements are the ink story, inquiry and footer fields;
all layout and content decisions remain approved.

Implementation plan: remap story, inquiry, footer and document background to the existing cream pair;
convert their text and structural rules to ink/muted/rust; preserve media loading fallbacks and action
feedback; update design records and color regression assertions; run lint, tests, build and response
checks. No component, asset, copy or responsive rule is added.

## Unified MasterChef-and-evenings block plan — 2026-09-01

The user clarified that MasterChef and the evenings must be one block, not merely consecutive page
sections. The current story boundary, EventFormats wrapper, anchors, nested padding and background
roles were audited. The only unsupported detail is the formats module closing and reopening a section.

Implementation plan: render EventFormats as a nested story movement; move it before the story closing
tag; replace its independent section padding/background with transparent internal spacing; preserve
all content, anchors, alternation and responsive behavior; update tests and records; rerun lint, build
and response checks. No new component, image or copy is required.

### Cream surface and unified story implementation result — 2026-09-01

Implementation result: every page-level surface now uses the existing cream pair. Story, inquiry and
footer use ink text, muted secondary copy, rust emphasis and warm structural rules. MasterChef,
present-day film and `Вечера бывают разные` now share one semantic `story` section and one continuous
cream surface; EventFormats keeps its `#menu` anchor but is a transparent nested movement rather than
a second section.

Files created: none. Files changed across the combined correction: `app/page.tsx`,
`app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`,
`docs/DESIGN_SYSTEM.md` and this audit. Templated elements found: none. Rework: dark page surfaces
were converted to cream, and the separate formats section was folded into the chronological story.
References used: the user's exact cream-color instruction and exact one-block clarification. Decisions
without references: transparent nested padding and a single warm rule between present-day film and
formats. Visible UI libraries used: none.

Verification result: ESLint, six focused tests, `git diff --check`, production build and local HTTP
response pass. Coverage requires cream story/contact/footer/document surfaces; MasterChef before
formats; EventFormats inside the story boundary; and formats before sourcing. Seven-width browser
visual QA remains open because it was not explicitly requested under the active Sites workflow. The
public Site is unchanged.

Final anti-template audit: the unified block adds no wrapper card, repeated panel, new heading,
gradient, texture, radius, shadow, glass, decorative object, animation or library theme. The cream
continuity and sequence are direct user requirements rather than generic landing-page styling.

## Mobile adaptation and public-release plan — 2026-09-01

The user requested a mobile adaptation and public URL. The existing responsive header, hero order,
portrait and collage apertures, unified story chronology, film ratio, format crops, sourcing pairs,
inquiry action, footer, minimum type/target rules, reduced-motion behavior, build and hosting metadata
were audited before editing.

Templated/weak mobile details found: desktop-scale vertical gaps persist inside the unified story at
phone widths; the 430 px composition lacks its own portrait and chapter-density refinement; header
labels are not explicitly protected from wrapping. Retained: all content, cream palette, media,
five-by-eight collage, semantic order, navigation and single contact action. Reworked: only compact
spacing, portrait width and no-wrap safeguards. New components/assets required: none.

Implementation plan: add bounded 820/430 phone rhythm rules; retain authored media ratios and unequal
sourcing alignment; update source assertions and design records; run lint, tests, production build and
response checks; commit the exact source; package, save and deploy the existing Site; return its public
URL. Browser screenshot/DOM QA is not performed unless explicitly requested under the Sites workflow.

### Mobile adaptation implementation result — 2026-09-01

Implementation result: the two-tier compact header now explicitly prevents wordmark/action wrapping.
At 820 px the unified story receives shorter chapter spacing while preserving its semantic sequence;
at 430 px and below the portrait grows to 86%, hero/story/formats intervals tighten, present-day heading
and format rows reduce independently, and inquiry/source spacing is bounded. Collage, media ratios,
copy, cream surfaces and alternating order remain unchanged.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated elements found:
desktop-scale gaps and unprotected header wrapping at compact widths. Rework: authored 820/430 px
rhythm and no-wrap safeguards. References used: the user's mobile-adaptation request and the approved
project mobile order/ratios. Decisions without references: exact compact gaps and 86% portrait width.
Visible UI libraries used: none.

Verification result: ESLint, six focused tests, `git diff --check`, production build and local HTTP
response pass. Tests cover 430 px rules, no-wrap header, collage/portrait hierarchy, unified story
boundary and phone-specific 9:16 / 4:5 / 5:4 / 4:3 media ratios. Browser screenshots and DOM resizing
were not performed because the active Sites workflow requires an explicit browser-testing request;
the seven-width visual pass therefore remains an open project-policy limitation.

Final anti-template audit: mobile remains an authored narrative order rather than a desktop stack or
generic card feed. No new component, decoration, gradient, radius, shadow, animation, hidden content,
icon-only control or placeholder is introduced. Remaining risks: real-device rendering and the
previously recorded documentary-image rights have not been independently verified.

## Public-mobile order correction plan — 2026-09-01

The public Site was opened at 390 × 844 px after the user's explicit browser-inspection request. The
DOM and visible scroll confirm the defect: `Я — у вас дома` and its film currently sit between the
MasterChef proof/biography and `Вечера бывают разные`, so the technically nested section does not read
as the requested single story.

Templated/unsupported element found: the present-day chapter interrupts the exact user-authored
origin-to-offer sequence. It makes the three formats appear as a later services module instead of the
direct result of the MasterChef story. Retained: all copy, award image, three event images, film,
facts, cream palette, typography, alternating rows, anchors and later sourcing/inquiry chapters.
Reworked: DOM order, semantic section boundary and only the spacing needed to express that boundary.
New components/assets required: none.

Implementation plan: keep the MasterChef intro and proof first; render `EventFormats` immediately
after the biography inside `story`; close that unified section only after all three format rows; move
the existing `story-present` composition unchanged into a following cream `present-day` section;
update regression coverage; run lint, tests, build and anti-template checks; then inspect the result at
1440, 1280, 1024, 768, 430, 390 and 375 px before publishing the corrected public version.

### Public-mobile order correction result — 2026-09-01

Implementation result: the `story` DOM now contains the MasterChef heading, award proof, exact
biography and all three event formats in this order. The section closes only after `Мастер-классы`.
The unchanged `Я — у вас дома` copy, three working-day facts and film now form the next semantic
`present-day` section. Both remain cream, but a warm rule marks the new chapter after the complete
MasterChef-and-formats narrative.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated/unsupported element found: the present-day film interrupting the user-authored
origin-to-offer sequence. Rework: only DOM order, semantic boundary and bounded internal spacing.
References used: the user's exact 2026-09-01 mobile correction and follow-up order. Decisions without
references: the existing light-paper variant for the following chapter and a single warm boundary
rule. Visible UI libraries used: none; Next's image primitive remains delivery infrastructure only.

Verification result: ESLint, six focused regression tests, `git diff --check` and the production build
pass. The local browser was visually inspected at 1440, 1280, 1024, 768, 430, 390 and 375 px. All
seven widths preserve the section order `hero → story → present-day → sources → contact` and the
story order `MasterChef → Вечера бывают разные → Частный ужин → Приватные мероприятия →
Мастер-классы`. Measured horizontal overflow is zero at every width. At 430/390/375 px all three
navigation targets are 44 px tall, no heading overflows, the proof-to-formats transition is visually
continuous, and `Я — у вас дома` appears only after the third format. Visible lazy-loaded images
resolve at their natural dimensions; the inspected console has no warning or error entries.

Final anti-template audit: the fix adds no card, accordion, generic service grid, background gradient,
green surface, radius, shadow, ornament, glow, decorative animation, placeholder or library theme.
The content sequence is the user's exact narrative rather than a reusable landing-page pattern.
Remaining risk: documentary-image publication rights remain as previously recorded; a physical-device
test outside the responsive browser emulator has not been performed.

## User-supplied layered-hero implementation plan — 2026-09-01

The two supplied mobile captures were inspected at their original resolution. They show the current
problem directly: the apron portrait is an oversized standalone block and the forty-image collage is
another full-width block beneath it. The user's correction requires the collage to become small images
behind the chef and the chef image itself to become smaller.

Templated/unsupported elements found: two consecutive full-width media slabs create page length without
new narrative information; portrait and documentary evidence compete instead of forming one identity
composition. Retained: exact hero copy, approved apron source, all forty collage images, five-by-eight
tile logic, cream/ink/rust palette, square edges, header and every post-hero section. Reworked: hero
media containment, foreground/background stacking, portrait width and phone stage height. New
components/assets required: none.

Implementation plan: replace `hero-left` plus independent right collage with copy plus one
`hero-stage`; keep the collage as the absolute background and layer the smaller `hero-apron` above it;
use copy-left/stage-right on desktop and copy-then-stage on phone; update responsive source sizes and
regression assertions; run lint, focused tests, production build and anti-template checks; publish the
validated source to the existing public Site. The supplied captures and direct instruction are the
authoritative visual reference; presentation guidance contributes only the single-composition and
foreground/background hierarchy principle.

### User-supplied layered-hero implementation result — 2026-09-01

Implementation result: `hero-copy` and one `hero-stage` now form the hero. Inside the stage, the
five-by-eight collage is the full background and the existing apron portrait is a centered `4 / 5`
foreground aperture. The portrait width is reduced from the previous 82–86% phone field to 60% and
from a separate desktop column element to 56% of the media stage. Below 820 px the page now reads
copy → one layered stage, eliminating the former portrait block followed by a separate collage block.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated/unsupported elements found: consecutive full-width portrait and collage slabs.
Rework: one reference-led foreground/background composition. References used: the two supplied mobile
captures and the user's exact instruction. Decisions without references: bounded 56/60/62% portrait
widths and a 22/18 px lower stage offset. Visible UI libraries used: none; the framework image
primitive remains delivery infrastructure only.

Verification result: ESLint, six focused regression tests, `git diff --check`, local HTTP response and
the production build pass. Coverage requires the collage before the portrait in the stage, absolute
background containment, the smaller portrait widths, all forty images, the `5 / 8` phone stage and
the absence of the old `hero-left` wrapper. A new browser screenshot/resize pass was not performed
because the active Sites workflow permits browser visual QA only on an explicit browser-testing
request in the current turn; this remains the open project-policy limitation for this publication.

Final anti-template audit: the hero uses the user's own documentary grid and real portrait; it adds no
card kit, radius, shadow, gradient, glass, ornamental shape, new copy, generated image, animation or
library-default composition. Remaining risks: exact phone crop should be confirmed in the user's real
browser after publication, and previously recorded documentary-image rights remain unresolved.

## Mobile full-block correction plan — 2026-09-01

The two new supplied mobile captures were inspected at original resolution. They show two instances
of the same defect: the MasterChef proof and first event photograph each occupy almost the full content
width and are followed by another full-width text block. The mobile route therefore reads as stacked
slabs rather than the requested authored photo/text alternation.

Templated/unsupported elements found: full-width media repeated across unrelated story movements and
full-width copy immediately beneath it. Retained: exact content, proof and event sources, chronology,
section boundaries, cream palette, crop families, numbering, headings and all desktop/tablet layouts.
Reworked: phone-only widths and opposing alignment. New components/assets required: none.

Implementation plan: below 560 px give the MasterChef proof four of twelve columns and place the
biography copy in the adjacent eight; apply the same small-photo/copy side-by-side rhythm to formats
01 and 03; reverse the columns for format 02; reduce phone heading/body size and gaps only as needed
for readable Russian line length; update regression coverage; run lint, tests, build and anti-template
checks; publish the exact validated source to the existing public Site.

### Mobile full-block correction result — 2026-09-01

Implementation result: below 560 px the MasterChef proof and biography now share one twelve-column
row at a `4 / 8` split. Each event format also stays in one compact row: formats 01 and 03 place the
small photograph in columns 1–4 and copy in columns 5–12; format 02 mirrors the pair with copy in
columns 1–8 and media in columns 9–12. At 430 px and below the gap contracts to 14 px. Phone format
headings become 30 px and supporting copy 15 px so the side field remains readable.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated/unsupported elements
found: repeated full-width mobile media and text slabs. Rework: compact side-by-side editorial pairs
with alternating direction. References used: the two supplied mobile captures and both exact user
corrections. Decisions without references: the bounded `4 / 8` column ratio, 14–16 px gap, 30 px
format heading and 15 px body copy. Visible UI libraries used: none.

Verification result: ESLint, six focused regression tests, `git diff --check`, local HTTP response and
the production build pass. Coverage requires every phone pair's exact columns and existing crop
families. Desktop/tablet rules, content and sequence remain unchanged. A new browser screenshot/resize
pass was not performed because the active Sites workflow permits browser visual QA only on an explicit
browser-testing request in the current turn; this remains the open project-policy limitation.

Final anti-template audit: the correction removes repeated full-width slabs and adds no card,
accordion, carousel, radius, shadow, gradient, ornament, animation, new content or library theme.
Remaining risks: exact side-by-side crop and Russian line wrapping should be confirmed in the user's
real mobile browser after publication; documentary-image rights remain as previously recorded.

## MasterChef-and-events final unification plan — 2026-09-01

The supplied 18:28 mobile capture shows that the code-level shared `story` section still reads as two
visual blocks. The retained `ЧАСТНЫЕ ФОРМАТЫ` eyebrow, oversized `Вечера бывают разные` heading,
top rule and large transition gap restart the narrative after the MasterChef biography.

Templated/unsupported elements found: a generic services-section heading inserted between a biography
that already names all three formats and the formats themselves; a section-opening divider inside what
the user explicitly defines as one block. Retained: MasterChef image/copy, all three event names,
descriptions and photographs, alternating mobile pairs, cream surface, square geometry, event-row
hairlines and the later `Я — у вас дома` chapter. Reworked: nested formats header, transition spacing
and top divider. New components/assets required: none.

Implementation plan: place the MasterChef row and the formats list inside one literal
`story-sequence` container; remove the nested formats wrapper and header from the rendered page;
preserve `#menu` with an accessible label; remove the story-origin bottom divider and the format-list
top divider; use only the first event row's content padding between them; update regression assertions;
run the existing checks and production build; publish to the current public Site.

### MasterChef-and-events final unification result — 2026-09-01

Implementation result: one `story-sequence` now owns the MasterChef photograph and biography plus the
three event rows. The former nested formats wrapper, `частные форматы` eyebrow, `Вечера бывают
разные` heading, transition padding and section-opening rules are absent. After the biography, the
first event begins through the same row rhythm as the following two events. `Я — у вас дома` remains
outside this sequence and follows only after the third format.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. Templated/unsupported elements found: a generic services-section restart inside an already
complete story. Rework: one literal container and uninterrupted editorial sequence. References used:
the supplied 18:28 mobile capture and the user's repeated exact direction. Decisions without direct
references: none beyond reusing the existing row padding as the bounded transition. Visible UI
libraries used: none.

Verification result: ESLint, six focused regression tests, `git diff --check`, anti-template search,
production build and local HTTP response pass. Tests require one sequence container, the absence of
the rejected labels/wrapper/dividers and the approved event order. A new browser screenshot/resize
pass was not performed because the active Sites workflow permits browser visual QA only on an explicit
browser-testing request in the current turn; this remains the open project-policy limitation.

Final anti-template audit: the correction removes a generic section header and wrapper. It adds no
card, replacement headline, decorative divider, radius, shadow, gradient, ornament, animation,
placeholder or library theme. Remaining risks: exact physical-device line wrapping should be checked
in the user's browser after publication; previously recorded documentary-image rights remain unresolved.

## Trivium typography implementation plan — 2026-09-01

The supplied Trivium ADR page was inspected at 1280 × 720 and 390 × 844. Computed styles establish
two families and a clear scale: Cormorant Garamond for display typography, Montserrat for body/UI,
88/44.8 px hero headings, 48/32 px section headings, 20 px tertiary headings, 16 px narrative copy,
14.08 px supporting copy and 11.2–13.6 px labels/navigation.

Superseded elements found: the current Roboto Flex hero and section headings range from 46 to 142 px
and use heavy 540–560 weights; event/source headings range from 30 to 76 px; narrative copy ranges to
23 px. These choices came from the previous editorial system but are now superseded by the user's
new exact type reference. Retained: all content, cream surfaces, image compositions, block sequence,
breakpoints, borders, accessibility targets and interaction behavior. Reworked: font assets, family
tokens, text-role colors, display/body scales, weights, line-heights, letter-spacing and mobile type.
New components required: none. New assets required: locally hosted files for the two referenced Google
Fonts families.

Implementation plan: download the exact Trivium Google Fonts families and weights; replace the global
font-face/token layer; map every heading, paragraph, label, navigation/action and caption to the
measured scale; preserve the user's cream surfaces by translating Trivium's light-on-black neutral
roles to contrast-safe dark equivalents; update regression assertions; verify 1280 and 390 px through
computed styles as well as the standard non-browser checks; publish to the existing public Site.

Scroll inspection result: Trivium uses only native `html { scroll-behavior: smooth; }`; computed body
scroll behavior is `auto`, and no Lenis, Locomotive Scroll, GSAP or ScrollTrigger runtime is present.
The project already implements the same native rule and additionally respects reduced-motion by
switching to `auto`. The scroll implementation therefore remains unchanged; regression coverage will
make this equivalence explicit. Trivium's six-pixel dark custom scrollbar is not part of the requested
smoothness and is not compatible with the approved cream surface.

### Trivium typography implementation result — 2026-09-01

Implementation result: the complete rendered route now uses locally hosted Cormorant Garamond for
display headings, italic emphasis, event/source headings and editorial numbers, plus Montserrat for
body copy, navigation, actions, labels, lists, captions and footer links. The hero follows the measured
44.8–88 px scale; section/contact/present-day headings follow 32–48 px; tertiary headings are 20 px;
main copy is 16/1.8; supporting copy is 14/1.8; navigation/actions are 12 px desktop and 13.6 px phone;
labels are 11.2/1.7 with the reference's wide uppercase tracking. Primary text is Trivium `#0A0A0A`,
large accents use `#A0792E`, and muted/small-accent roles use contrast-safe darker descendants of the
reference neutrals on the unchanged cream backgrounds.

Files created: nine local font assets — five Cormorant Garamond and four Montserrat weight/style
files. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Superseded elements found:
oversized/heavier Roboto Flex headings, Literata-only italic accents, body sizes up to 23 px and event/
source headings up to 76 px. Rework: one measured two-family hierarchy across every text role.
References used: Trivium computed styles at 1280 × 720 and 390 × 844 plus its Google Fonts stylesheet.
Decisions without direct reference: `#6E665A` and `#72561F` are contrast-safe dark adaptations required
by the user's previously approved cream surface; the mapping from Trivium legal-site roles to the
chef site's existing semantic roles is project-specific. Visible UI libraries used: none.

Verification result: both downloaded families validate as TrueType fonts; ESLint, six focused tests,
`git diff --check`, anti-template search, the production build and local HTTP response pass. Reference
computed styles were inspected at 1280 and 390 px. Regression coverage requires the exact family,
weight, desktop/phone scale, text tokens, native smooth scrolling and reduced-motion override. A new
local browser screenshot/resize pass at the full seven-width matrix was not performed because the
active Sites workflow allows local browser visual QA only when explicitly requested in the current
turn; this remains the project-policy limitation.

Final anti-template audit: the change modifies only typography and text-role colors. It adds no
service card, legal-site layout, dark page field, logo, gradient, glass, radius, shadow, decorative
animation, JavaScript scroll hijacking or scrollbar imitation from Trivium. Remaining risks: exact
Russian wrapping should be checked on the user's physical phone after publication; previously recorded
documentary-image rights remain unresolved.

## Three-photo sourcing alignment plan — 2026-09-01

The active sourcing data and responsive CSS were audited after the user's direct correction. Each of
the three categories currently renders two photographs, producing unequal inner grids and staggered
phone widths. The user explicitly selects only the sheep herd, Larnaca fish-display and Evgen
grape-harvest frames and removes the other three from the rendered site. The follow-up `Продавца на
лодке удали` supersedes the initial interpretation of `фото рыбы`: the boat/catch frame is inactive,
while the market frame showing the fish display remains.

Templated/unsupported elements found: none; the defect is excess evidence and inconsistent geometry.
Retained: section introduction, three category rows, exact copy, numbering, order, square edges,
Trivium-derived typography, cream palette and inquiry transition. Reworked: image arrays, multi-column
media grids, row-specific image ratios/positions and staggered phone widths. New components or assets
required: none.

Implementation plan: reduce each category to its selected image; require exactly three active source
paths and reject the meat-counter, boat/catch and greenhouse paths in regression coverage; replace
the unequal two-image grids with one common `4 / 3` full-frame `contain` aperture; remove mobile width
staggering; run lint, focused tests, anti-template checks, production build and local response check;
publish to the existing public Site. The exact `4 / 3` aperture is the bounded neutral interpretation
of `выровняй блок`; it preserves all three complete source frames.

### Three-photo sourcing alignment result — 2026-09-01

Implementation result: the rendered sourcing block contains exactly three images in order — sheep
herd, Larnaca fish-market display and Evgen with grapes. The Kissonerga meat counter,
fishermen/boat-catch frame and strawberry greenhouse are absent from active page data. All three rows
share one text/image column system and one square-edged `4 / 3` paper aperture; every image uses
`contain`, so none of the three source frames is cropped. The former row-specific grids, crop positions,
minimum heights and phone 82% staggering are removed.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit.
Templated elements found: none; the corrected defect was excess imagery and unequal media geometry.
References used: the user's exact selection and follow-up confirmation of the Larnaca market frame.
Decisions without direct references: the common `4 / 3` aperture is the neutral implementation of
`выровняй блок`. Visible UI libraries used: none.

Verification result: ESLint, six focused tests, `git diff --check`, anti-template search, production
build and local HTTP response pass. Tests require exactly the three selected active source paths,
reject the three removed paths and require the common `4 / 3` contain aperture. No browser screenshot/
resize pass was performed because the active Sites workflow requires an explicit browser-testing
request for visual QA; this remains the project-policy limitation.

Final anti-template audit: the change simplifies the existing editorial sequence and adds no card,
new section, radius, shadow, gradient, glow, glass, icon, animation or library theme. Remaining risks:
the three retained documentary-image rights remain as previously recorded, and physical-device crop/
paper-reserve balance should be checked by the user after publication.

## Readability and responsive-layout implementation plan — 2026-09-01

Two independent user-requested audits inspected the live site at 1440, 1024/768 and 430/390/375 px.
Both found the same primary defects: the 375–390 px header is wider than the viewport; the 561–820 px
range falls back to rejected full-width image/text slabs; and the desktop story and sourcing route are
too long because documentary media dominates its copy. The UX audit additionally found that the
second mobile MasterChef paragraph becomes a detached narrow text tower. The UI audit found black
image-loading fields and white reserve around the three sourcing images.

Templated/unsupported elements found: the tablet-only full-width slab sequence is a generic responsive
fallback and directly contradicts the approved paired editorial rhythm. Retained: all content, exact
block order, cream palette, Trivium-derived typography, layered chef collage, MasterChef plus formats
as one block, the later present-day chapter, three selected sourcing photographs, square edges and the
single Instagram outcome. Reworked: header contraction, tablet grids, mobile biography flow, desktop
media balance, vertical rhythm and loading surfaces. New components/assets required: none.

Implementation plan: contract the narrow header; make a dedicated 561–820 px layout with an 8/5 hero
and side-by-side 5/7 content pairs; let the second phone biography paragraph span the grid; reduce
desktop row insets and the third format's media span; cap source media at 640 × 480; switch all empty
documentary apertures to cream and prioritize the first collage row; update regression tests; run lint,
tests, anti-template checks and production build; visually verify 1440, 1280, 1024, 820, 768, 560,
430, 390 and 375 px; then publish the exact validated state.

### Readability and responsive-layout implementation result — 2026-09-01

Implementation result: the 375–390 px header now fits the viewport, with the decorative arrow hidden
only at 380 px and below. The 561–820 px range has its own composition: the hero is a compact 8/5
stage with an 8 × 5 collage, while MasterChef, all three formats, present-day and sourcing remain
side-by-side. On phones the MasterChef proof and first paragraph keep their 4/8 relationship and the
transition paragraph now spans all twelve columns underneath. Desktop event rows top out at 72 px
vertical inset, the third event uses the same seven-column media weight as the others, and sourcing
media is capped at 640 × 480. Event copy is 15/1.7 and sourcing statements are 1.4 line-height. Hero,
portrait and documentary loading surfaces are cream; the first eight collage images load eagerly.

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit.
Templated/unsupported elements found: the previous tablet-only stack of full-width media and text
slabs. Rework: dedicated paired grids, narrower large-screen media, denser editorial rhythm and
surface-consistent image loading. References used: the two independent live audits requested by the
user, the supplied mobile captures, the approved layered hero, the Trivium-derived typography scale
and the user's exact content/order decisions. Decisions without direct reference: the 8/5 tablet
stage, 5/7 pair ratios, 640 px source cap and 380 px decorative-arrow cutoff. Visible UI libraries
used: none; the framework image primitive remains delivery infrastructure only.

Verification result: ESLint, seven focused regression tests, `git diff --check`, anti-template search,
production build and local HTTP rendering pass. Browser verification covered 1440, 1280, 1024, 820,
768, 560, 430, 390 and 375 px. At every width `scrollWidth` equals `clientWidth`; all event rows remain
side-by-side; the phone transition paragraph spans the content width; tablet collage and content grids
match the new system; source media reaches no more than 640 × 480; all hero fallback surfaces compute
to cream; and the console has no errors or warnings.

Final anti-template audit: the implementation removes a generic responsive stack and introduces no
new section, card, radius, shadow, gradient, glass, glow, decorative object, animation or library
theme. It preserves the project's exact narrative and documentary identity. Remaining risks: a real
physical-device check may still reveal platform-specific font rasterisation or dynamic browser-chrome
effects, and previously recorded documentary-image rights remain unresolved.
# Compact paired-reading implementation plan — 2026-09-01

The user requested a denser page, a more readable typographic rhythm, researched block references,
and one non-negotiable mobile rule: every content unit must keep its photograph and text together,
either beside each other or with the text immediately below; no horizontal content scrolling is
allowed. The same request explicitly includes the preceding self-audit recommendations: the apron
portrait must enter the first phone viewport, the MasterChef proof must carry more visual weight
beside the biography, and format photographs 02/03 must stop reading as tiny thumbnails.

Before implementation, the active route, complete breakpoint cascade, local Trivium-derived fonts,
hero stage, MasterChef-and-formats sequence, present-day film, three sourcing rows, contact/footer,
focused regressions and clean worktree were audited. The existing document has no horizontal page
overflow, but the mobile navigation still permits an internal horizontal scroll; the phone hero copy
and stage together exceed the first viewport; the 4/8 MasterChef aperture ends well before its first
paragraph; format media 02/03 are materially shorter than their adjacent copy; and repeated 48–72 px
phone insets create unnecessary paper gaps. These are composition and rhythm defects, not grounds for
a new visual language.

Three independently checked reference groups govern the correction:

1. Paired editorial blocks: [Clare Smyth biography](https://www.claresmyth.com/biography),
   [Mugaritz](https://www.mugaritz.com/en/) and [Noma](https://noma.dk/). The extracted principle is
   that documentary imagery and its narrative form one local reading chapter. Their branding,
   full-screen openings, galleries, drag interactions and restaurant navigation are not copied.
2. Readable typography: the user-supplied [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655),
   [Nobelhart & Schmutzig](https://nobelhartundschmutzig.com/en/) and
   [Atelier Crenn](https://www.ateliercrenn.com/). The extracted principle is a restrained serif
   hierarchy plus a plain sans-serif body with comfortable leading and limited line length. No dark
   palette, logo, reservation UI or branded typeface is copied.
3. Compact vertical rhythm: [Noma](https://noma.dk/), [Mugaritz](https://www.mugaritz.com/en/) and
   [Clare Smyth biography](https://www.claresmyth.com/biography). The extracted principle is to make
   the next related image or paragraph visible without inserting an empty screen between narrative
   beats. Their carousels, overlays, cookie UI and full-viewport hero behavior are excluded.

Templated/unsupported elements found: the inherited 821 px fallback still defines generic one-column
slabs before later tablet rules undo them; mobile nav uses `overflow-x: auto`; phone format apertures
use unrelated aspect ratios that make two photographs appear as thumbnails; and several section
insets are sized like independent landing-page chapters although MasterChef plus all three formats is
one story. Retained: exact content and order, cream palette, Trivium-derived families/colors, layered
hero collage, approved photographs, 4/8 alternating direction, square edges, native smooth scroll,
single Instagram outcome and all accessibility semantics. Reworked: mobile/tablet spacing,
typographic line-height/measure, media aperture height, nav overflow and hero stage proportion. New
components, assets, copy, cards, sliders, icons, decoration and UI libraries required: none.

Implementation plan: update the active reference map and design system; remove internal nav scrolling;
reduce phone hero copy and stage height so the apron portrait enters the first viewport; increase the
MasterChef proof height while keeping the second paragraph immediately below; give all three mobile
format pairs a consistent minimum media height without overlap; tighten story, present-day, sourcing,
contact and footer intervals; keep source text immediately before its photograph where a side-by-side
pair no longer fits; add focused regression coverage; run ESLint, tests, anti-template checks,
production build and `git diff --check`; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px;
then publish the exact validated build.

Decisions without a direct numeric reference are limited to the final bounded inset and aperture
values. They will be derived from the existing 18 px phone gutter, 44 px target rule, copy heights and
the requirement that each pair remains locally visible. No new color, font, interaction or section is
invented.

### Compact paired-reading implementation result — 2026-09-01

Implementation result: mobile navigation now distributes its three destinations inside the available
row and has no horizontal overflow. At 560 px and below, hero copy insets contract to 44/46 px (40/42
px at 430 and below) and the unchanged 60%-wide apron portrait rises to a 104 px bottom reserve. The
chef now enters every audited first viewport while the five-by-eight collage remains behind him. The
MasterChef proof retains its exact four-column role but uses a 184–216 px aperture; its height now
tracks the first biography paragraph instead of ending halfway through it. All three event photographs
use one 144–168 px phone height, while the approved left/right alternation and unequal copy lengths
remain. Mobile copy is Montserrat 15 px / 1.66 for the biography and 15 px / 1.62 for event details.
The second biography paragraph follows at 14 px, source copy-to-photo gaps are 22 px, and repeated
story/present/source/contact insets now use a 30–52 px compact range. Desktop and tablet insets were
reduced proportionally without changing their paired grids.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated/unsupported elements
removed: the horizontally scrollable mobile navigation, thumbnail-like format apertures and repeated
landing-page-sized empty intervals. Rework: bounded CSS rhythm and aperture corrections only; exact
content, order, imagery, cream palette, Trivium-derived fonts/colors, square geometry and interaction
model remain.

References used: three links per active concern as recorded above and in the reference map. Decisions
without numeric references: 104 px hero lift, 184–216 px MasterChef aperture, 144–168 px event media
height and the final 22–52 px spacing range. Each value is a neutral fit derived from the existing
content rectangles and verified at all required widths. Visible UI libraries used: none; Next Image
remains delivery infrastructure only.

Verification result: ESLint, seven focused regressions, `git diff --check`, the anti-template search
and the Vinext production build pass. Browser verification covered 1440 × 1000, 1280 × 900,
1024 × 900, 768 × 1024, 430 × 932, 390 × 844 and 375 × 812. Every width reports zero document and
navigation overflow and a 44 px minimum interactive target. The apron begins at y=721/734/768 on
375/390/430 px, so the chef is visible inside each first viewport. MasterChef proof heights are
195/203/216 px; all three event media apertures are 150/156/168 px at the same widths. At phone widths
the three source images follow their copy by exactly 22 px; from tablet upward MasterChef, formats and
sources remain side-by-side. Cormorant Garamond/Montserrat compute correctly and the 9:16 present-day
film remains directly after its copy.

Final anti-template audit: no card grid, bento preset, repeated rounded container, shadow, decorative
gradient, glass, glow, generic marketing copy, icon, carousel, scroll hijacking, generated asset or
library-default composition was introduced. Remaining risks: physical Android/iOS browser chrome may
change how much of the portrait is visible by a few pixels, and the existing documentary-image rights
remain unresolved; the layout itself has no open blocker.

Publication result: the validated build was saved and deployed to the existing public Sites project.
The public response is HTTP 200, and a fresh 390 × 844 browser pass on the production URL reproduces
the verified geometry: zero page/nav overflow, apron y=734, MasterChef proof height 203 px and three
156 px event apertures.

## Screenshot-led mobile reading correction plan — 2026-09-01

The two latest user-supplied production captures show that the compact paired-reading implementation
is structurally correct but visually unsuccessful. Long Montserrat descriptions remain inside narrow
eight-column fields, producing tall broken lines beside small photographs. The 300 weight and muted
taupe weaken contrast, while the repeated complete `image + all copy` pair gives every format the
same cramped silhouette. The MasterChef chapter has the same contrast defect, although its proof and
first paragraph remain a valid local pair. These are reading defects evidenced by the supplied page,
not grounds for a new visual language.

Retained: MasterChef first; the three formats immediately after it inside the same `story-sequence`;
the following `Я — у вас дома` chapter; all exact copy, photographs, crop families, cream surfaces,
Cormorant/Montserrat families, gold numbering, square edges, hairlines, alternating media direction,
native smooth scroll and every desktop/tablet relationship. Reworked only below 560 px: the small
MasterChef proof floats at the opening so the first paragraph begins beside it and then naturally
continues below it on the full measure; the transition paragraph follows normally. Each event
photograph shares its first row with its number and heading, then its description continues directly
beneath that pair across the complete twelve-column content measure. MasterChef keeps its four/eight
opening proportion rather than a rigid full-height copy column, and both paragraphs use the established
primary ink and Montserrat 400 at the phone breakpoint. Event headings use the already loaded
Cormorant 600 weight to restore hierarchy; descriptions use primary ink and Montserrat 400.

Templated/unsupported elements found: three repeated narrow text towers; low-contrast light body copy;
and an event-row implementation that treats the adjacency instruction as a reason to constrain every
sentence beside the photograph. Replacement source: the user-supplied current captures, the direct
instruction that the result is not beautiful/readable, the approved editorial-pair rule, and the
existing Trivium-derived family and primary-text roles. New components, assets, copy, cards, icons,
decoration, colors, breakpoints, scripts and UI libraries required: none.

Implementation plan: update the active reference map and design system before CSS; use a phone-only
editorial float for the existing proof figure and `display: contents` only for the existing event-copy
wrapper so semantic list structure remains;
place number and heading beside the photograph and the description in row two; strengthen the phone
copy using existing weights/colors; update focused regressions; run lint, tests, build, diff and
anti-template checks; visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px; then publish the exact
validated source to the existing Site. The only neutral numeric decisions are the heading offset and
row gap, bounded by the existing 14 px phone grid and 144–168 px apertures.

### Screenshot-led mobile reading correction result — 2026-09-01

Implementation result: below 560 px the MasterChef proof is a 31%-wide editorial float. The opening
paragraph begins beside it and continues on the complete measure as soon as the photograph ends; the
transition paragraph follows without a detached field. Both use Montserrat 400, 15/1.62 and `--ink`.
Each format uses a five/seven-column first row (reversed for format 02): the retained photograph stays
144–168 px high, while its gold number and Cormorant 600 title share the opposite field. The exact
description begins 18 px below and spans all twelve columns in Montserrat 400 and `--ink`. No markup,
copy, media, order, desktop/tablet grid, surface or interaction changed.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated/unsupported elements
reworked: three identical narrow text towers and the light low-contrast phone copy. References used:
the two current user-supplied production captures, the direct readability correction, the approved
editorial-pair rules and the existing Trivium-derived type roles. Decisions without direct numeric
references: the 31% proof float, five/seven event split, 18 px row gap and 32 px title offset; each is
a bounded content-fit value derived from the existing 14 px grid and 144–168 px apertures. Visible UI
libraries used: none; Next Image remains delivery infrastructure only.

Verification result: ESLint, seven focused regressions, `git diff --check`, the anti-template search
and the Vinext production build pass. Browser checks covered 1440 × 1000, 1280 × 900, 1024 × 900,
768 × 1024, 430 × 932, 390 × 844 and 375 × 812. Every width reports zero document/navigation overflow
and a 44 px minimum interactive target. Desktop/tablet preserve their original paired grids and 300
weight secondary role. At 430/390/375 px, event descriptions measure 394/354/339 px and sit below
168/156/150 px media apertures; story and event copy compute to weight 400 and `rgb(10, 10, 10)`.
Dedicated viewport screenshots at all three phone widths confirm no overlap, orphaned title, clipped
line or repeated full-width image slab. Both local families load, every documentary image resolves
after lazy loading, and the browser console has no warning or error.

Final anti-template audit: the correction adds no card, bento preset, repeated rounded surface,
shadow, decorative gradient, glass, glow, generic marketing copy, icon, carousel, accordion, stock or
generated asset, scroll interception or library-default composition. Remaining risks: physical mobile
browser chrome can alter the visible viewport height, and the pre-existing documentary-image rights
uncertainty remains; the corrected block itself has no open layout blocker.

## Screenshot-led sourcing compression plan — 2026-09-01

The latest user-supplied production capture shows the active `Мясо / Рыба / Овощи и фрукты` phone
layout as three oversized image slabs separated from their short statements. Direct 390 × 844 browser
measurement confirms that every category is 466.2 px high: the copy uses only 109.7 px while the
full-width `4 / 3` aperture is 354 × 265.5 px. The repeated one-column rule therefore spends almost
1,400 px on three compact sourcing facts and contradicts both the direct `небольшие фото и текст
сбоку` requirement and the earlier instruction to align this block.

Retained: exactly three selected documentary photographs in the established sheep → fish market →
grape harvest order; complete-frame `contain`; category numbers, names and exact statements; cream
field, Cormorant/Montserrat families, square edges, hairlines, section introduction, desktop 5/7 grid,
tablet 5/7 grid, surrounding chronology and the single Instagram outcome. Reworked only below 560 px:
all three rows use one stable five/seven text/media pair, with number and heading sharing the first
text line and the statement immediately below. A common direction is deliberate: it makes the three
categories one aligned sourcing ledger rather than another decorative alternating gallery. The quote
uses the established darker small-gold role because the latest capture exposes weak pale contrast.

Templated/unsupported elements found: three repeated full-width photo slabs and one large-screen
stacking rule mechanically inherited by phones. Replacement source: the user’s latest screenshot and
direct rejection, the approved compact editorial-pair principle, the earlier explicit three-photo and
alignment instructions, and the existing Trivium-derived type/color roles. No markup, component,
asset, copy, crop, new color, card, icon, interaction, animation or UI library is required.

Implementation plan: update the active reference map and design system before CSS; override only the
phone source grid, copy hierarchy, quote scale/contrast and section spacing; add focused regressions;
run lint, tests, production build, diff and anti-template checks; visually verify 1440, 1280, 1024,
768, 430, 390 and 375 px; then publish the exact validated source. Neutral numeric choices are limited
to the five/seven split, 16 px gap, 26 px row inset and 18–20 px quote scale, derived from the existing
18 px phone gutter and the actual text/image proportions.

### Screenshot-led sourcing compression result — 2026-09-01

Implementation result: at 560 px and below all three source rows now use the same `5fr / 7fr`
text/media grid. Number and category share a compact first line; the unchanged statement follows in
Cormorant Garamond italic at 18–20 px / 1.35 and the existing darker `--accent-small`. The photograph
remains complete inside its `4 / 3` cream aperture on the right. Section opening space contracts to
24 px and each row uses a 26 px vertical inset. Desktop/tablet rules, markup, content and media remain
unchanged.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. Templated/unsupported elements
reworked: the repeated full-width photo-slab stack and pale oversized phone quote treatment.
References used: the latest user-supplied production capture/direct rejection, the earlier exact
three-photo/alignment instructions, the approved editorial-pair system and established Trivium roles.
Decisions without direct numeric references: the five/seven split, 16 px gap, 26 px row inset,
30/one-fraction internal title line and 18–20 px quote scale; each is a neutral content-fit value.
Visible UI libraries used: none; the framework does not determine this composition.

Verification result: ESLint, seven focused regressions, `git diff --check`, the anti-template search
and the Vinext production build pass. Browser checks cover 1440 × 1000, 1280 × 900, 1024 × 900,
768 × 1024, 430 × 932, 390 × 844 and 375 × 812 with zero document/navigation overflow and 44 px
minimum targets. At 430/390/375 px each source row is 218.4/200.9/194.3 px high, versus the rejected
466.2 px row at 390 px. Media fields are 220.5 × 165.4, 197.2 × 147.9 and 188.4 × 141.3 px;
all three text/image pairs remain side by side. Dedicated screenshots at all phone widths confirm
complete frames, aligned headings, readable statements, square edges and no empty full-screen gaps.
Both local fonts and all three lazy images resolve, `object-fit` computes to `contain`, and the browser
console has no warning or error.

Final anti-template audit: no card, bento preset, alternating gallery gimmick, rounded surface,
shadow, gradient, glass, glow, icon, carousel, accordion, generated asset, new marketing copy,
horizontal rail, animation or library-default composition was introduced. Remaining risks: physical
mobile browser chrome can alter visible viewport height and the pre-existing documentary-image rights
uncertainty remains; the corrected sourcing geometry has no open blocker.

## Present-day film correction plan — 2026-09-01

Audit source: the user's supplied production capture at 390 px and two direct corrections. The active
chapter currently places the complete `Я — у вас дома` copy above a content-width `9:16` film on
phone. That mechanically stacked layout creates a large vertical interruption and makes the film feel
like a full-screen poster. The three working-day facts are approved content and must remain; the
user's clarification explicitly requires moving them beside the film rather than deleting them.

Existing elements that look templated or unsupported: the phone-only one-column stack, the `44px`
inter-block gap and the `width: 100%` vertical film. Replacement reference: the latest user capture
and direct ratio/adjacency instructions, combined with the project's approved editorial split and
square-edged documentary media rule. Components retained: the semantic section, heading, unnumbered
list, video component, captions and desktop/tablet `4:3` aperture. Components reworked: phone grid,
list density and film width. New components, assets, controls, copy and colors required: none.

Implementation plan: preserve the DOM content; at `560px` and below convert `.story-present` to a
12-column row with copy at `1 / 8`, film at `8 / 13`, `12px` gap and top alignment; retain `9:16` only
on phone; compact the fact rail to `44px + 1fr`, `7px` row padding and `12px / 1.45`; reduce section
padding to `44px 18px 36px`. Then run focused regressions, lint, production build, anti-template and
overflow checks and visually verify 1440, 1280, 1024, 768, 430, 390 and 375 px before publication.
The only neutral numeric choices are the seven/five column split and compact row values, derived from
the measured 339–394 px content widths and the user's requirement that the complete text remain
readable beside a clearly non-full-width vertical film.

### Present-day film correction result — 2026-09-01

Implementation result: the heading and all three approved working-day facts remain unchanged in the
left rail. At `560px` and below the copy and film now share one 12-column row: copy `1 / 8`, film
`8 / 13`, `12px` gap and top alignment. The fact list begins `18px` below the heading and uses a
compact `44px + 1fr` grid with `7px` row padding and `12px / 1.45` text. The phone film remains
square-edged `9:16`; desktop and tablet retain their existing `4:3` film and text-left/media-right
spread. The phone section now uses `44px 18px 36px` padding instead of the previous stacked gap.

Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. The templated element found
was the phone-only text-then-full-width-poster stack; it was reworked into the directly requested
adjacent editorial pair. References used: the user's latest 390 px production capture, direct aspect
ratio instruction, explicit `Текст не удаляй, сделай рядом` correction and the existing approved
cream, typography, line and documentary-media system. Decisions without direct numeric references:
the seven/five split, 12 px gap and compressed list values; these are neutral fit values derived from
the measured supported viewports. Visible UI libraries used: none.

Verification result: seven source/CSS regressions, ESLint, `git diff --check` and the Vinext
production build pass. Browser verification covers 1440 × 1000, 1280 × 900, 1024 × 900,
768 × 1024, 430 × 932, 390 × 844 and 375 × 812. Document and navigation overflow are zero at every
width. At 375/390/430 px the film measures 134.3 × 238.7, 140.5 × 249.8 and 157.2 × 279.4 px with a
computed `9 / 16` ratio; the copy measures 192.8, 201.5 and 224.8 px wide and all facts remain beside
the film. At 768/1024/1280/1440 px the film computes to `4 / 3`. Screenshots at all seven widths
confirm aligned starts, complete readable copy, square edges, bounded section height and no empty
poster-sized gap. Browser console contains no warning or error.

Final anti-template audit: no card, bento grid, carousel, rounded surface, shadow, gradient, glow,
glass, icon, caption, control, animation, generated asset or new marketing copy was introduced.
Remaining risks: the video uses a live center crop, so the exact visible action changes with playback;
physical mobile browser chrome can reduce the simultaneously visible page area. Neither risk blocks
the corrected layout.

## Livelier sourcing block plan — 2026-09-01

Audit source: the user's supplied 21:34 production capture and direct corrections. The current block
is compact and readable, but its three same-side rows repeat one rigid ledger pattern. The photographs
also vary sharply in visual quality and relationship to the copy: the distant sheep frame is dominated
by an industrial plant; the fish-market frame is a static price display; only the real grape-harvest
portrait supplies the personal, human energy promised by the site.

Retained: the complete `Я не работаю по меню` introduction, order `Мясо → Рыба → Овощи и фрукты`,
all three exact statements, real `evgen-grape-harvest.webp`, cream surfaces, Cormorant/Montserrat
roles, hairlines, square edges, compact mobile side-by-side behavior, navigation and contact path.
Reworked: the meat/fish media sources and the repeated same-side row geometry. New components, copy,
colors, controls and animation required: none.

Replacement sources: two original 4:3 identity-preserving generated photographs use the real local
Evgen grape and portrait images only as identity references—one wide three-quarter meat-market scene
with a professionally dressed half lamb and one side/over-counter harbour fish-market scene. They must
preserve his bald head, face, short beard and age while following the later direct request for a
naturally slimmer build; they omit readable branding/price text and avoid presenting a named vendor.
The half lamb remains non-graphic: no head, blood or exposed organs. These are editorial illustrations,
not proof of a specific supplier visit. The real grape photograph is not regenerated. Layout follows
the approved alternating editorial-pair principle: text/photo →
photo/text → text/photo on every breakpoint, with the existing 5/7 grid mirrored only for row two.

Templated/unsupported elements found: three mechanically identical same-side rows and two weak
category images whose subject hierarchy does not match the personal-chef narrative. The images and
one row direction change; content and semantic markup stay intact. Implementation sequence: update
the active map/system first; inspect both generated identity outputs; save new versioned assets;
update source metadata and row-two grid; add focused regression coverage; build and visually verify
1440, 1280, 1024, 768, 430, 390 and 375 px; run the anti-template audit; publish the exact validated
source. Neutral choices without exact references are the generated filenames and prompt wording only.

Implementation result: the first generated waist-up pair was rejected before integration after the
user called it unrealistic. The final meat prompt uses the two local Evgen identity references but
overrides the source-body silhouette with the user's later slimmer-build direction; it frames Evgen in
a non-frontal three-quarter working view beside one professionally dressed half lamb. The final fish
prompt keeps the same facial identity and slimmer silhouette but moves the camera across and slightly
above the counter, placing Evgen in side/three-quarter profile. Both prompts explicitly prohibit logos,
price text, frontal presentation, artificial advertising polish and incorrect anatomy. The meat prompt
also prohibits a head, blood, exposed organs and graphic treatment. The two generated originals are
1448 × 1086 PNGs; the active 84-quality WebP derivatives are 130 KB and 110 KB. Their SHA-256 values
are `97b42898da93779faf77dd067f989ccb546352d0d280957109b5c28e47fa8b12` and
`f8cf7d646a903b318a5f90a8fd39acc4e5ace40dac3d49e3902460846762327b` respectively.

The active source sequence is now `evgen-half-lamb-market-v1.webp` →
`evgen-fish-harbour-market-v1.webp` → `evgen-grape-harvest.webp`. Rows alternate text/photo →
photo/text → text/photo at every supported width. The first two exact-ratio generated frames use
`cover` without scale; the real portrait uses `contain`. The old sheep landscape and Larnaca seller
remain only as inactive source history and do not render. All exact category statements remain.

Visual verification result: live local browser inspection passed at 1440, 1280, 1024, 768, 430, 390
and 375 px. At every width the document `scrollWidth` equals `innerWidth`, all images are complete, and
the three source rows have no internal overflow. Measured source apertures are 640 × 480 at 1280,
513 × 384 at 1024, 406 × 305 at 768, 221 × 165 at 430, 197 × 148 at 390 and 188 × 141 at
375. The half lamb, Evgen's face and working gesture remain legible; the fish frame is visibly a
different over-counter angle; the full real grape subject remains visible with cream reserve. Browser
console inspection shows no warnings or errors. The seven rendered/source assertions, ESLint,
production build and `git diff --check` pass.

Final anti-template audit: the section has no cards, rounding, shadow, stock icon, gradient, hover
spectacle, carousel, horizontal scroll, full-width repeated phone poster or generic equal-grid
composition. Movement comes only from the confirmed alternating editorial pairing and the three
different photographic viewpoints. No UI library component or theme is used. No new control, form,
loading, empty or error state was introduced; existing navigation, contact actions, hover and focus
rules remain unchanged. Remaining limitations: the two market scenes are generated editorial
illustrations and cannot prove a real supplier or visit; the grape-source publication rights remain
user-supplied rather than independently verified; the requested slimmer body is an authored visual
portrayal rather than documentary evidence.

## Exact Trivium dark typography and color correction plan — 2026-09-01

Audit source: the user's two 21:54 phone captures compare the current production story directly with
the required Trivium result. The live Trivium route was re-inspected at 1280 × 720 and 390 × 844.
Computed variables are `#0A0A0A` black, `#111111` soft black, `#2A2A2A` border, `#F5F0E8` warm
white, `#B8B0A0` muted white, `#C9A84C` gold, `#A0792E` dark gold and `#E2C47A` light gold.
Computed typography confirms Cormorant Garamond 300 at 88/1.1 desktop and 44.8/1.1 mobile for the
hero, Cormorant 400 at 48/1.2 desktop and 32/1.2 mobile for section headings, Cormorant 400 at 20/1.3
for tertiary headings, Montserrat 300 at 16–16.8/1.8–1.85 for main copy, Montserrat 300 at
14.08/1.8 for supporting copy, and Montserrat 600 at 11.2/1.7 for tracked labels.

The current project already self-hosts the exact two font families and its main desktop type scale is
correct. The visible mismatch comes from the previous cream translation and phone-specific readability
overrides: cream/white surfaces invert the reference hierarchy; `#A0792E` is too dark for the requested
gold accent; paragraphs become ink/400 on phone; event headings become Cormorant 600/22; list copy
shrinks to Montserrat 400/12/1.45; the final action remains transparent instead of gold-filled.

Retained: all copy, photo/video assets, hero collage, recently approved generated market views, real
grape frame, source alternation, block order, grids, responsive apertures, scroll behavior, navigation
and Instagram destination. Reworked: root palette tokens, semantic text weights/colors, phone type
overrides, primary inquiry action, focus surface and favicon colors. New components, images, font files,
content, animation or library primitives required: none.

Implementation plan: update the active reference map/system first; map the exact Trivium variables onto
the existing semantic tokens; remove phone-only 400/600 text deviations; keep compact sizes only where
the paired media grid requires them; convert the existing inquiry action to a flat referenced gold
field; update color/type regression assertions; run lint, production build, source tests and diff check;
then visually inspect 1440, 1280, 1024, 768, 430, 390 and 375 px before publishing a new version.
Anti-template boundary: no Trivium layout, logo, legal copy, card system, form, grid overlay, vignette or
background effect may be copied. The only transferred system is the directly requested type/color role.

## Exact Trivium dark correction validation — 2026-09-01

Implementation maps the eight measured Trivium color roles onto the project's existing semantic tokens,
keeps the self-hosted Cormorant Garamond/Montserrat files, removes mobile-only heavy text overrides,
recolors the favicon and turns the existing single inquiry link into the referenced flat-gold action.
The hero eyebrow now uses balanced wrapping so `2»` cannot become an isolated desktop line. Copy,
photographs, collage, source alternation, MasterChef-plus-three-formats sequence, video, navigation and
Instagram destination are unchanged.

Automated verification: seven source assertions pass, ESLint passes, the production vinext build passes
and `git diff --check` is clean. Browser verification at 1440, 1280, 1024, 768, 430, 390 and 375 px
found no horizontal overflow, missing image, video failure, console warning or console error. Cormorant
Garamond and Montserrat load in the intended weights. Measured contrast ranges are 16.65–17.45:1 for
primary text, 8.77–9.2:1 for muted text and 8.66:1 for gold/CTA roles. Interactive targets remain
44–76 px high.

Responsive review retains three deliberate differences that are source- or content-led rather than
template defects: the narrow MasterChef evidence frame stays beside its opening paragraph because the
user requested small photography with adjacent text; the grape portrait remains fully visible with
`object-fit: contain` because it is the real retained evidence image; and the phone hero keeps the
reference-like final `Кипре` line. No cards, radii, shadows, gradients, glass effects, library demo
compositions or new decorative elements were introduced. No UI library is used.

## Corrective plan: restore cream; retain Trivium typography — 2026-09-01

The user identified the exact scope error after version 24: the task was to change typography, not the
site palette. The black/soft-black page surfaces, warm-white/muted-white text, gold-filled inquiry action
and dark favicon are therefore unapproved. The last approved cream release at `831383c` is the palette
reference; current Cormorant Garamond/Montserrat sizes, weights, tracking and scroll behavior remain the
Trivium reference.

Implementation is limited to color roles and color-dependent component states. Restore the prior root
tokens, cream header/footer/media reserves, original text hierarchy, transparent inquiry action and
favicon colors. Retain all current type metrics, balanced eyebrow wrap, grids, spacing, responsive
behavior, content, imagery, animation and destinations. Update assertions, run diff check, tests, lint,
production build and all seven viewport checks, then publish a corrective site version. No component,
layout, library or new visual device is required.

## Cream restoration validation — 2026-09-01

The corrected implementation restores the pre-dark cream and ivory surfaces, black primary text,
warm-grey supporting text, restrained brown-gold accents, transparent inquiry action and the original
favicon. The only color-role refinement uses the palette's existing darker `--accent-small` for small
interactive text and indices so they pass AA on cream. No black Trivium surface or gold-filled action
remains. Relative to the last cream release, all other CSS differences are typographic metrics,
responsive type weights and the balanced hero-eyebrow wrap.

Verification at 1440, 1280, 1024, 768, 430, 390 and 375 px found no horizontal overflow, broken
image, video failure or console warning/error. Cormorant Garamond and Montserrat 300/500/600 load
without fallback. Primary text measures 17.28–18.98:1, muted copy 4.94–5.42:1, `--accent-small`
5.98–6.57:1 and CTA text 18.98:1; large display gold remains above the 3:1 large-text threshold.
Seven source assertions, ESLint, production vinext build and `git diff --check` pass. No UI library,
card treatment, radius, shadow, gradient, glass effect, stock composition or new decoration is used.

## Typographic completion plan — 2026-09-01

The user correctly challenged three claims that the font had been changed. Audit confirms that the two
families were already Cormorant Garamond and Montserrat; calling that a replacement was inaccurate.
The remaining measurable deviations are numeric: hero 6.875vw instead of 7vw, section headings 3.75vw
instead of 4vw, narrative leading 1.8 instead of 1.7, compact workday facts below the reference role,
header-action tracking/size, primary-action leading and footer edge roles. Correct those values only.
Do not alter the restored cream palette, content, media, layouts or scroll behavior. Re-run the complete
test/build/lint and seven-width visual audit before creating a new publishable commit.

## User-directed header and hero-label removal plan — 2026-09-02

The restored field-journal Site and the user's supplied phone capture were audited before editing.
The rejected visible elements are the header's second-row links `о шефе`, `форматы`, `продукты` and
the hero credential `Победитель «МастерШеф. Профессионалы — 2»`. On phones the three links also add a
46 px row; above the title the credential plus its margin delays the chef's name. The footer repeats
the same three rejected link labels.

Reference: the user's exact 2026-09-02 screenshot and removal instruction. Retained components:
wordmark, `обсудить вечер` action, keyboard-only skip link, hero title, forty-image collage, apron
portrait, MasterChef biography, three event formats, present-day film, sourcing, contact and footer
identity/social links. Reworked components: header grid and narrow header height, hero title spacing,
footer utility navigation and regression assertions. New components, assets, copy, colors, fonts,
animation or library primitives required: none.

Implementation plan: remove the three header links and matching footer links; remove the hero
credential; collapse the mobile header to one row and remove the now-empty title margin; delete only
the unused navigation/eyebrow CSS; preserve all established content and visual tokens; update focused
tests; run lint, production build, source assertions and `git diff --check`; verify 1440, 1280, 1024,
768, 430, 390 and 375 px before publishing the correct field-journal project. Anti-template boundary:
do not replace the removed material with a menu, icon, badge, generic CTA or decoration.

## Header and hero-label removal validation — 2026-09-02

Implementation removes the three-link header navigation, its responsive second-row geometry, the
winner eyebrow and its reserved title margin. The same three utility labels are removed from the
footer while `контакты` remains. The header now contains only the unchanged wordmark and Instagram
action; the hero begins with the unchanged chef identity title. No later content, copy, media, palette,
type role, link destination, animation or component order changed.

Verification: all seven focused source assertions pass, ESLint passes, the production Vinext build
passes and `git diff --check` is clean. Browser inspection at 1440, 1280, 1024, 768, 430, 390 and
375 px confirms zero horizontal overflow, zero broken loaded images, no rejected navigation or winner
label and a single-row header measuring 76 px wide, 70 px tablet and 66 px phone. The title and collage
remain legible and correctly ordered at every breakpoint; the 375 px title begins immediately below
the compact header and the portrait remains inside the documentary stage.

Final anti-template audit: no substitute hamburger, menu, badge, icon, CTA, card, radius, shadow,
gradient, glass effect or decorative filler was added. Files created: none. Files changed:
`app/page.tsx`, `app/globals.css`, the reference map, design system, design audit and focused tests.
Reference used: the user's supplied phone capture and exact removal instruction. Decisions without a
reference: none. UI libraries used as visible components: none. Remaining risk is limited to normal
third-party Instagram availability; the site's own layout and local media pass the required checks.

## Mobile Hero title-density plan — 2026-09-02

The latest supplied phone capture and direct instruction were audited against the active Hero, its
five authored title beats and the 560/430 px breakpoint cascade. The current base expression
`clamp(44.8px, 7vw, 88px)` resolves to the same 44.8 px minimum at 375, 390 and 430 px. Combined with
1.1 leading, this holds the collage lower than the reference reading rhythm. The issue is isolated to
phone display geometry; the header, copy, media stage, portrait and later sections do not need rework.

Implementation plan: add one phone-only `h1` scale of roughly 38–41 px at the three target widths,
tighten leading to 1.05, and cap the narrow title measure so the approved final `Кипре` line remains.
Retain Cormorant Garamond 300, all exact wording, colors, padding, collage, portrait and desktop/tablet
rules. Add a focused regression assertion, run lint, production build, source tests and diff check,
then verify 1440, 1280, 1024, 768, 430, 390 and 375 px for title wrapping, collage entry, overflow,
image loading and console errors before publishing the same field-journal Site. Templated elements
found: none. New components, assets, copy, animation and UI-library primitives: none. The exact fluid
interpolation, 1.05 leading and 340 px measure are neutral fitting values derived from the supplied
capture and verified at every required width rather than literal values present in the screenshot.

## Mobile Hero title-density validation — 2026-09-02

The phone-only override resolves to 38 px / 39.9 px leading at 375, 38.425 px / 40.346 px at 390 and
40.725 px / 42.761 px at 430. The title remains five lines at all three widths and the collage now
begins at y=348, 351 and 363 respectively, roughly one current text line earlier than the preceding
44.8 px / 1.1 treatment. The unchanged collage and portrait therefore enter the same phone reading
view sooner, matching the supplied capture without reducing either image stage.

Automated verification: seven focused source assertions pass, ESLint passes, the production Vinext
build passes and `git diff --check` is clean. Browser checks at 1440, 1280, 1024, 768, 430, 390 and
375 px report zero horizontal overflow, zero broken images, all 45 page images loaded, no rejected
navigation/credential content and minimum visible link targets of 44 px. Desktop and tablet retain
their previous base type scale; the documentary film remains 4:3 there and 9:16 on phones. Cormorant
Garamond normal/italic 300 and Montserrat 600 all load successfully. Hover changes the header action
from accent to ink and the keyboard-visible wordmark focus ring renders as a 2 px accent outline with
an ivory separation ring. Browser logs contain no warning or error; static content has no form,
loading, empty or form-error state to invent.

Final anti-template audit: no card, radius, shadow, gradient, glass effect, decorative filler, generic
copy, new CTA or mobile stacking pattern was introduced. Files created: none. Files changed:
`app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`,
`docs/DESIGN_SYSTEM.md` and `docs/DESIGN_AUDIT.md`. Templated elements found: none. Rework is limited
to phone Hero title scale, leading and measure. Reference used: the user's latest supplied phone
capture and direct smaller-title instruction. Decisions without direct numeric references: the exact
fluid interpolation, 1.05 leading and 340 px measure, each selected as a minimal fitting value and
verified across the complete breakpoint set. UI libraries used as visible components: none. Remaining
risk is normal variation from browser text rasterization and user font scaling; the responsive layout
itself retains readable wrapping and zero overflow.

## Exact Trivium font-binary implementation plan — 2026-09-02

The user clarified that matching family names are insufficient and requested the exact fonts loaded
by the supplied Trivium reference. A fresh audit of the live HTML confirms the page requests Google
Fonts Cormorant Garamond v21 in normal 300/400/600/700 and italic 300/400 plus Montserrat v31 in
normal 300/400/500/600. The current site instead self-hosts nine official static TTF payloads from the
same upstream v21/v31 releases. Their outlines were already visually equivalent, but their container,
static/variable model, subset structure, hinting and SHA-256 are not byte-identical to the WOFF2
resources Chromium receives on the reference.

Implementation is limited to the font delivery and matching rasterization settings. Replace the TTF
sources with all 15 exact release/subset WOFF2 binaries from the complete live Cyrillic-ext, Cyrillic,
Vietnamese, Latin-ext and Latin response; reproduce the live
Google Fonts weight/style and unicode-range declarations; include the two OFL license texts; preserve
all existing font-role metrics, the latest smaller phone Hero, palette, spacing, media and section
geometry. Update regression tests to reject any active TTF source, require every exact local filename,
weight/style mapping and SHA-256 hash, then prove in the browser that all requested weights load from
the local exact binaries with no fallback or synthesis.

Templated elements found: none. Components retained: the complete page and every visual component.
Components reworked: none; only `@font-face` source declarations, font assets and the measured
`text-rendering: auto` behavior change. New visual
components, copy, decoration, interaction and UI-library primitives required: none. Reference used:
the user's supplied Trivium capture, the live Trivium font request and the current Google Fonts v21/v31
CSS response. Decisions without a direct reference are limited to local filenames; binary contents,
weights, styles, subset ranges and display behavior come directly from the reference delivery chain.

## Exact Trivium webfont validation — 2026-09-02

Files created: 15 local WOFF2 assets reproducing the complete live Google Fonts response for
Cormorant Garamond v21 normal/italic and Montserrat v31 normal across Cyrillic-ext, Cyrillic,
Vietnamese, Latin-ext and Latin, plus both upstream OFL license texts. Files changed:
`app/globals.css`, `tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`,
`docs/DESIGN_SYSTEM.md` and this audit. Files removed: the nine previous static TTF assets. Those TTFs
were official files from the same upstream releases and had equivalent outlines, but were not the
same variable/subset WOFF2 payloads that Chromium receives from the reference.

Every one of the 15 new files passes its pinned SHA-256 check and WOFF2 magic-byte check. Regression
coverage now verifies each of the 50 exact `@font-face` combinations individually: family, style,
weight, source file, `font-display: swap` and full unicode range. It also rejects `.ttf`, `truetype`
and `local()` sources, preventing system-font substitution. The live measured Trivium value
`text-rendering: auto` replaces the prior `optimizeLegibility`; synthetic styles remain disabled.

Browser verification passed at 1440, 1280, 1024, 768, 430, 390 and 375 px. Every width reports zero
horizontal overflow, zero broken images, 48 images present, fonts status `loaded`, minimum 44 px link
target, 4:3 film on desktop/tablet and 9:16 on phone. The Hero remains 88 px desktop, scales at
1024/768, and retains the latest user-approved compact 40.725/38.425/38 px five-line phone treatment
at 430/390/375 rather than reverting to Trivium's larger English Hero. The mobile screenshot confirms
the collage, portrait and title remain aligned. Browser logs contain no warning or error. Automated
tests pass 7/7; ESLint and the production build pass.

Anti-template result: no templated component, generic section, card system, decoration, palette,
content or layout was added. No UI library is used as a visible component. The reference used is the
user-supplied Trivium capture plus the live `fonts.googleapis.com` CSS and every referenced
`fonts.gstatic.com` binary. Decisions without a direct reference are only the descriptive local
filenames and self-hosted `/fonts/` path. Remaining risk is normal platform-dependent rasterization
and user font scaling; Cyrillic and English naturally use their own glyphs, but both now come from the
exact same v21/v31 font payload set as the reference.

## Denser Hero collage implementation plan — 2026-09-02

The current approved Hero was audited before interface edits. It contains one 40-source local
`hero-instagram` array, a five-column/eight-row wide and phone grid, an eight-column/five-row tablet
grid, 2 px rules and covered image crops. The separate foreground `chef-hero-apron.jpg` uses its own
markup and `.hero-apron` geometry above the collage. That portrait source, crop, size, position,
caption, loading priority and every responsive override are explicitly out of scope.

Templated elements found: none. The existing layered documentary Hero remains project-specific.
The only density problem is the now-too-large background cells identified by the user's direct
correction. Reference used: that instruction plus the current approved Hero and its four stage
ratios. No external site or generic gallery pattern is needed.

Implementation plan: retain the complete Hero component and append 64 relevant existing local archive
images to the 40 approved Hero sources, yielding 104 unique source paths without generating or
downloading media. Exact and near-identical aliases found in the older optimized archive are excluded
in favour of distinct approved story, event and gallery frames. Rework only the background grid:
8 × 10 with 80 visible tiles above 1100 px,
7 × 11 with 77 visible tiles at 821–1100 px, 12 × 8 with 96 visible tiles at 561–820 px, and 8 × 13
with all 104 visible tiles at 560 px and below. Update responsive `sizes` and the first-row priority
threshold. Eagerly paint the first 80 tiles that can intersect the initial viewport while reserving
high fetch priority for only the first 12. Keep the 2 px rules, crops, palette, title, Hero/stage
dimensions and all post-Hero blocks.

Components retained: header, Hero copy, Hero stage, portrait, story, event formats, present-day film,
sourcing and contact/footer. Component reworked: only `hero-collage-grid` and its source dataset. New
components, copy, interaction, animation, generated assets and UI-library primitives required: none.
Decisions without a direct numeric reference are the four grid counts and selected supplementary
local paths; both are neutral functional choices derived from stage ratios and existing project media.

### Denser Hero validation and anti-template audit

Browser verification passed at 1440, 1280, 1024, 768, 430, 390 and 375 px. Visible background-photo
counts are respectively 80, 80, 77, 96, 104, 104 and 104. Representative cell dimensions are
91.84 × 80.59, 81.45 × 80.59, 68.38 × 73.09, 62.16 × 58.25, 52 × 51.07,
47 × 46.15 and 45.13 × 44.3 px: all are compact, close to square and contained by the unchanged
Hero stage. Every width reports zero horizontal overflow and zero broken images. The title remains
88 px on wide desktop and retains the approved 40.725/38.425/38 px five-line phone treatment at
430/390/375. The film remains 4:3 on desktop/tablet and 9:16 on phone; the minimum interactive target
remains above 44 px.

The protected portrait is still `/media/chef-hero-apron.jpg`, keeps `object-position: 50% 43%`, its
existing 4:5 aperture and every previous responsive geometry rule. A zero-context diff confirms that
neither its markup nor a `.hero-apron` declaration changed. Visual screenshots at 1440, 768 and
390 px confirm the same portrait scale, crop, caption and layer position above the denser field.
Browser logs contain no warning or error. The source-path audit reports 104 entries, 104 unique paths
and no missing files; a 64-bit perceptual-hash pass at Hamming distance three reports no remaining
near-duplicate pair. Automated tests pass 7/7; ESLint and the production build pass.

Anti-template result: no card grid, stock gallery component, decoration, new palette, copy, animation
or generic section was introduced. The only visible rework is the density of the existing
project-specific documentary field. No UI library is used as a visible component. Files created:
none. Files changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs` and the three
required design records. The sole reference is the direct user instruction plus the already approved
Hero. Decisions without direct numeric references remain the grid counts and supplementary local
source selection. Remaining risk: the larger DOM contains 104 background image nodes; responsive
`sizes`, low fetch priority after the first twelve, lazy delivery for tiles 81–104 and
breakpoint-specific hiding limit delivery cost. Public mobile verification initially exposed delayed
paint in lazy tiles 25–40; the final delivery rule makes tiles 1–80 eager and removes that transient
blank region without changing layout or portrait geometry.

## Hero collage empty-space correction plan — 2026-09-02

The user supplied the current 575 px phone capture and then gave the exact corrective scope: use ten
fewer background photographs and leave no empty places. The active Hero was audited before visual
code changes. It currently contains 104 local sources in an 8 × 13 phone matrix; the first forty
approved photographs read densely, while the final supplementary row contains several pale or
low-context crops that merge into the cream reserve. The separate foreground
`chef-hero-apron.jpg`, its crop, scale, position, caption and loading behavior remain protected and
out of scope.

Templated elements found: none. This is a local density and packing defect inside the approved
documentary collage. The direct screenshot and instruction replace the previous 104-photo phone
count with exactly 94 sources. Components retained: the complete Hero copy, stage, forty approved
opening sources, foreground portrait, all typography, colors, interactions and every later section.
Component to rework: the phone/tablet packing rules and the supplementary source order only.
No new component, asset, copy, effect, library or decorative treatment is required.

Implementation plan: remove ten pale or low-context supplementary crops, leaving 94 photographs, and
place the retained sources so the phone perimeter uses recognisable chef, event and food frames;
change the phone field from thirteen to twelve rows. Preserve equal cells by reserving two grid cells
under the opaque portrait at phone and tablet sizes, then fill every exposed track through the final
row. Request every retained Hero tile eagerly so a fresh phone load does not expose the cream
fallback as a false empty cell. Keep the desktop 80-photo and compact-desktop 77-photo views
unchanged. Update regression
assertions, then verify 1440, 1280, 1024, 768, 430, 390 and 375 px for exact visible counts, complete
packing, image health, portrait immutability and horizontal overflow.

References used: the user's supplied phone screenshot, the exact `на 10 фото меньше` instruction and
the existing approved layered Hero. Decisions without a numeric reference: only the two grid cells
reserved beneath the already opaque portrait and the ordering of retained local sources; both are
neutral packing choices, not a new visual style. UI libraries used as visible
components: none; the existing framework image primitive remains delivery infrastructure only.

### Hero collage empty-space correction result

Implementation result: the background pool now contains exactly 94 unique local paths. The ten
removed sources are the article-led `instagram-05` and `instagram-10`, low-context `instagram-31`,
the pale dish and empty-venue crops, film still 12, gallery venue, gallery ingredient, gallery
dessert-chef and the brush-villa illustration. The retained 54 archive paths are ordered so the
phone perimeter shows recognisable chef, food, event and working-action frames. Desktop still shows
80 cells in 8 × 10 and compact desktop 77 in 7 × 11. Tablet shows all 94 in 12 × 8 with only cells
5:6 and 5:7 reserved beneath the portrait; phone shows all 94 in 8 × 12 with only cells 7:4 and 7:5
reserved beneath the portrait. Every exposed position is photographic through the final row.

All 94 background images now use eager loading and synchronous decoding; the first twelve alone keep
high fetch priority. The synchronous decode is required by the supplied defect: live inspection had
shown completed images with valid natural dimensions that still appeared as cream tiles during
capture. The foreground portrait source and every `.hero-apron` declaration remain unchanged.

Verification result: ESLint, the production Vinext build, all seven rendered/source/delivery tests
and `git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report 94
total image nodes, respectively 80/80/77/94/94/94/94 visible tiles, 94 loaded images, zero pending
or broken images, zero exposed grid gaps and zero horizontal overflow at every width. The only two
unoccupied equal cells at tablet and phone sizes are geometrically contained by the opaque portrait.
Every visible link keeps a minimum 44 px target. Visual inspection at 1440, 768, 430 and 390 px
confirms a continuous field through its bottom edge and the unchanged chef portrait. Browser logs
contain no warning or error beyond development connection messages.

Final anti-template audit: no card, bento hierarchy, repeated filler, radius, shadow, gradient,
glass, glow, decoration, generated image, new copy, component or UI-library styling was introduced.
Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this
audit. References used: the user's supplied phone capture, exact ten-photo reduction and the approved
layered Hero. Decisions without direct references: source ordering and the two concealed grid
positions; both are functional packing choices verified at every required width. Remaining risk:
requesting 94 background derivatives at once increases Hero network concurrency, but low priority
after the first twelve and responsive `sizes` bound individual requests; this is the deliberate
tradeoff for eliminating delayed visible holes on a fresh phone load.

## Mobile story-pair repair plan — 2026-09-02

The user's three current production captures show one repeated structural failure. At 560 px and
below, each event image remains beside only its number and title while the related description is
forced into a separate full-width row. The MasterChef proof uses the same broken reading pattern:
the opening copy wraps around a floated photograph and the remainder detaches below it. The result
looks like five unrelated fragments rather than one MasterChef-to-formats story.

Templated elements found: none. The defect comes from two phone-only layout techniques—
`.format-copy { display: contents; }` and a floated `.story-award`—that dissolve the semantic copy
containers visually. Confirmed replacement: the user's latest screenshots and direct rejection,
combined with the already approved compact paired-reading rule, require each photograph and all of
its text to remain one local side-by-side editorial unit. Components retained: Hero, cream palette,
exact Trivium font binaries, all copy, photographs, numbering, chronology, desktop/tablet layouts,
the following `Я — у вас дома` chapter and every interaction. Components to rework: only the phone
MasterChef proof and phone event-row geometry. New components, assets, copy, effects and libraries:
none.

Implementation plan: restore a real copy container beside every event photograph, keep the existing
01/03 photo-left and 02 photo-right alternation, place number, title and description together inside
that container, and tighten its mobile type rhythm so the pair remains compact. Replace the
MasterChef float with a 4/8 grid so both biography paragraphs remain in the text column beside the
small proof photograph. Update the reference map, design system and source tests before visual QA;
then verify 1440, 1280, 1024, 768, 430, 390 and 375 px for grouping, readable line lengths, image
crops, section rhythm, 44 px targets and horizontal overflow.

References used: the user's three supplied production captures, the direct statement that the result
must not look this way, and the existing approved compact paired-reading reference set (Clare Smyth,
Mugaritz and Noma). Decisions without direct numeric references are limited to the phone-only copy
size, leading and local spacing needed to fit the existing text beside the existing images. UI
libraries used as visible components: none.

### Mobile story-pair repair result

Implementation result: at 560 px and below the floated MasterChef proof and dissolved event-copy
containers are removed. The MasterChef proof now occupies four columns while one intact eight-column
copy rail contains both existing biography paragraphs. Every format keeps its complete number,
heading and description inside a real side column beside the related image; 01/03 remain photo-left
and 02 remains photo-right. Phone descriptions use 13.6 px / 1.55 Montserrat, the unchanged headings
use 20 px Cormorant Garamond, and small media apertures use 164–184 px height. `Я — у вас дома`
retains its approved 7/5 text/video grid and 9:16 film.

Verification result: ESLint, the production build, all seven rendered/source tests and
`git diff --check` pass. Browser verification at 1440, 1280, 1024, 768, 430, 390 and 375 px confirms
zero horizontal overflow, every description fully contained by its corresponding copy rail, the
approved format order and a minimum 44 px interactive target. At all three phone widths each event
image and copy rail begins on the same grid row; the MasterChef proof and complete biography also
begin together. The 390 px full-page asset pass reports 102/102 images loaded, zero pending or broken
images and no console warning or error. Visual inspection at 768, 430, 390 and 375 px confirms the
paired rhythm and the unchanged following present-day composition.

Final anti-template audit: no card wrapper, stacked service template, radius, shadow, gradient,
glass, glow, decoration, icon, new copy, asset, animation or UI-library styling was introduced.
Files created: none. Files changed: `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user's
three current captures, direct rejection and existing approved paired-reading references. Decisions
without exact supplied numbers: phone-only copy leading, local gaps and image height; each is a
neutral fitting value verified at the required widths. Remaining risk: the 13.6 px supporting copy
is intentionally compact and should be rechecked on any unusually large system font setting; content
is not clipped or height-limited.

## Mobile media scale and blank-field correction plan — 2026-09-02

The user's two current production captures were audited before interface changes. At 390 px the
approved 9:16 film is only about 140.5 px wide because the phone override gives seven columns to copy
and five to media. The personal-menu introduction then occupies a long one-column text-only field,
and the final inquiry contains only its kicker, heading and bordered action because the previously
approved villa illustration is absent from the active route. The one-column footer adds three more
minimum-height rows. These are the exact sources of the reported small video and empty cream blocks.

Templated/unsupported elements found: no generic card system is present, but the detached one-column
intro and artless inquiry behave like generic text slabs and do not reflect the project's approved
paired editorial system. References used: the user's supplied captures and direct critique; the
standing text-beside-film and mobile 9:16 rules; the approved compact paired-reading system; and the
approved complete `chef-story-brush-villa.png` inquiry artwork. Components retained: all copy, exact
Trivium font binaries, cream palette, film source and behavior, three sourcing rows/photos, contact
destination, square edges and page order. Components to rework: phone present-day grid, phone source
intro rhythm, inquiry artwork/layout and phone footer packing. New visible component required: one
semantic-free `contact-art` figure using the existing approved asset.

Implementation plan: give the phone film seven of twelve columns and keep the complete timeline in a
five-column rail; pair the menu heading and lede across the phone grid so the first source image
arrives sooner; restore the whole 3:2 villa canvas between heading and action on tablet/phone and as a
complete background field on desktop, using the existing paper cream behind it so its authored canvas
does not create a pale rectangular seam; compress the footer into an identity row followed by two
adjacent utility links. Do not add the rejected tapestry ornament, duplicate sourcing photography,
invent copy, change color roles or introduce cards. Verify 1440, 1280, 1024, 768, 430, 390 and 375 px
for film dimensions/aspect, complete art visibility, line wrapping, 44 px targets, media loading and
horizontal overflow before publication.

Decisions without direct numeric references are the 5/7 phone split, 10 px local gap and compact
section insets; they are neutral fitting corrections calculated from the current phone widths. UI
libraries used as visible components: none; React/Next/Vinext remain infrastructure only.

### Mobile media scale and blank-field correction result

Implementation result: at 560 px and below the unchanged 9:16 workday film now receives seven of
twelve columns while the complete morning/day/evening timeline remains beside it in five columns.
The personal-menu heading and unchanged explanation form one compact two-column introduction, so the
first sourcing row follows immediately. The approved complete `chef-story-brush-villa.png` canvas is
restored as the closing visual: it occupies the right side of the inquiry above 1024 px and becomes a
separate 3:2 figure between heading and action at 1024 px and below. The phone footer is reduced to an
identity row and a two-link utility row. No copy, sourcing photograph, film source, contact destination
or color role was removed or replaced.

Verification result: ESLint, the production Vinext build, all seven rendered/source tests and
`git diff --check` pass. Browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px report zero
horizontal overflow, zero text overflow, zero broken images and a minimum 44 px interactive target.
The film remains exact 4:3 at 1440–768 px and exact 9:16 at 430/390/375 px; its phone widths are
225.7/202.3/193.6 px respectively instead of the previous approximately 140 px. The complete contact
art measures 394/354/339 px wide at those phone widths. Visual inspection at 1440 and 390 px confirms
that the closing illustration is not cropped, the action labels do not collide, the menu introduction
no longer reads as an isolated text slab and the film remains beside its related text.

Final anti-template audit: the unsupported one-column text slabs and artless closing field were
removed without adding a card, bento grid, radius, shadow, gradient, glass, glow, filler ornament,
stock photograph, new copy, icon, horizontal scroll or UI-library styling. Files created: none. Files
changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. References used: the user's two
current production captures, the standing text-beside-film rule, the approved compact paired-reading
system and the approved villa illustration. Decisions without supplied exact numbers: the 5/7 phone
split, local 10 px gap and compact insets; each is a neutral fitting value verified across the required
widths. Visible UI libraries: none. Remaining risk: the closing villa is an illustration expressing
the intended atmosphere, not a documentary claim about a specific venue; this remains explicit in the
reference map and no venue claim is added to the page.

## Mise en place blueprint alternative — pre-implementation audit and plan — 2026-09-02

The user selected the local 864 × 1821 `04-mise-en-place-blueprint.png` direction for a complete
alternative review version. The current branch, active route, CSS cascade, metadata, motion code,
tests, all local media, provenance registers, seven required breakpoints and the complete premium
comparison set were inspected before interface changes. `AGENTS.md` remains intact.

### Current product audit

- Architecture is one public narrative route in `app/page.tsx`, with root metadata in
  `app/layout.tsx` / `app/site-config.ts`, documentary video behavior in `app/chef-story-video.tsx`
  and `app/media-motion.tsx`, and one active stylesheet in `app/globals.css`.
- Current order is header → Hero → MasterChef proof and biography → three formats → workday film →
  personal-menu sourcing → illustrated inquiry → footer. The page has no form, loading, empty or error
  workflow; both inquiry actions use the verified Instagram destination.
- Protected content/media are the exact Russian copy in `app/page.tsx`; 94 local Hero tiles and
  `chef-hero-apron.jpg`; the MasterChef proof; all three event photographs; the existing film/poster/VTT;
  the exact meat, fish and grape images; and the complete `chef-story-brush-villa.png` close.
- Active visual foundations already match the request: cream/ivory fields, Cormorant Garamond plus
  Montserrat, black/gold/warm-grey roles, square edges, hairline rules, no decorative gradients,
  radii, glass, shadows or animation, separately authored tablet/phone pairs and accessible focus.
- Asset caveats remain: the meat/fish scenes are approved identity-preserving illustrations rather
  than evidence of named suppliers; publication rights for the user-supplied grape photograph and
  the MasterChef press image remain unresolved. No new factual claim may be inferred from them.
- Dependencies were absent at audit start; Node 24.18.0 meets the declared minimum. The branch is
  `codex/mise-en-place-blueprint` at `3f7a2f8`, clean, with no upstream. Existing source tests contain
  seven deliberately strict composition/content contracts that must be updated with the new structure.

### Templated or under-authored elements found

The active page does not contain SaaS cards or a generic landing template. Its weakness is repetition:

| Existing element | Why it reads as under-authored | Confirmed replacement | Retained |
|---|---|---|---|
| Three `.format-row` split layouts | The same ruled image/copy grammar repeats three times with only the middle row mirrored; the long reserve does not reveal the chef's preparation process | Selected blueprint's one shared knife → cutting → serving contour route with unequal reserves | Exact scenarios, copy, photographs, numbering, order and phone alternation |
| Plain workday ledger | Three ruled list rows name morning/day/evening but do not visually express progression | One open trajectory aligned to the three semantic list items; vertical three-node reduction on phone | Exact list wording, order, film, poster, captions and portrait documentary framing |
| Text-only menu introduction | Heading and lede explain personal creation while the largest nearby cream reserve has no content role | One restrained concentric plate-construction plan around an approved local dish photograph | Exact heading, lede and sourcing order |
| Three repeated `.source-row` 5/7 pairs | Alternation alone does not make meat → fish → farm read as one sourcing journey | One shared ordered spine plus distinct open meat, fish and produce/field contour studies | Exact categories, statements, images, provenance and mobile photo/text pairs |
| Generic graphic close in selected bitmap | The mockup replaces the project's approved visual resolution with a spoon panel | Existing complete villa remains the final scene | Exact inquiry copy, Instagram action and footer |

### Reference extraction

Transfer only the selected bitmap's useful principles: sparse preparation arcs, a measured-looking but
non-numeric plate plan with a real dish at its centre, restrained knife/cut/serving outlines,
category-specific ingredient contours,
long hairlines, asymmetric media/copy/drawing fields and graphics placed outside documentary bounds.
Do not copy its generated Russian wording, photographs, steak dish, `06:00` / `12:00` / `18:00`,
diameters, centimetres, ticks posing as data, handwritten claims, flavours, suppliers or incidental
objects. The older dark steel/red `style-directions-round-2/.../02-mise-en-place.png` is incompatible
and remains inactive.

### Implementation plan before interface code

1. Add one focused `blueprint-diagrams` module for the four genuinely required static figures:
   preparation sequence, workday trajectory, plate composition and category contours. Use inline SVG
   because the user explicitly requested an implementable SVG/CSS system; authoritative text remains
   HTML and duplicated graphics are hidden from assistive technology.
2. Preserve header/Hero and MasterChef proof, then insert one preparation transition and recompose the
   format fields around their real media/copy rather than producing equal cards.
3. Recompose the workday as copy + aligned route + portrait film on wide screens and as six-column
   text, a compact three-node axis and five-column film on phones.
4. Give the menu introduction a compact plate-construction field using one existing approved dish
   image, then recompose sourcing into
   copy/photo/contour zones connected by one meat → fish → farm spine. Hide detail, not content, on
   narrow screens.
5. Preserve the complete villa, contact action, footer, metadata, motion and all exact content. Add no
   business fact, image, contact method, dependency or visible UI-library component.
6. Update strict source tests; run lint, production build, tests and `git diff --check`; visually inspect
   1440, 1280, 1024, 768, 430, 390 and 375 px for hierarchy, wraps, media, targets, focus, overflow,
   captions, loading and console errors; complete the anti-template pass.
7. Commit only this branch. Then create a separate public Sites project named `Евгений Грыбенюк —
   Чертёж Mise en place` with slug `evgen-grybenyk-mise-en-place-review`, replace only this branch's
   inherited hosting `project_id`, save/deploy the validated build and leave the original project
   `appgprj_6a95b4e815648191b78fa20eba9811e3` untouched.

Neutral decisions without a supplied numeric source are the exact SVG control points, stroke opacity,
dash cadence, local reserve widths and responsive hiding threshold. They must use only existing tokens
and will be recorded after visual QA. Visible UI libraries required: none; React/Next/Vinext and the
existing image primitive are implementation infrastructure only.

### Implementation result and final audit

The first implementation reproduced the selected bitmap too mechanically: a thin detached workday
arc, a landscape crop that reduced the chef to an apron fragment, an empty plate diagram and oversized
sourcing rows. The user's supplied capture made those failures explicit. The corrected version keeps
the reference's drafting principle while rebuilding each relationship around the project's actual
content:

- `app/blueprint-diagrams.tsx` now contains four purpose-specific figures: preparation, workday,
  personal-menu composition and category contours. The workday drawing is one open three-node
  trajectory beside the complete portrait film, not a clock; the mobile drawing is a separately
  authored vertical three-node route rather than a scaled desktop arc.
- `app/page.tsx` preserves the exact Russian copy, header, Hero, MasterChef proof, media order, contact
  action and complete villa. It adds only the semantic placements required to associate each drawing
  with its chapter.
- `app/globals.css` uses the existing cream, ink, gold and rule tokens, square apertures and the
  approved twelve-column logic. The menu plan contains the existing local `gallery-dish.webp`; the
  source chapter is a compact copy/photo/contour sequence rather than three large repeated panels.
- `tests/rendered-html.test.mjs` now covers the diagram vocabulary, exact order, accessibility roles,
  prohibited invented data, desktop/tablet/phone geometry, mobile simplification and existing
  anti-template constraints.

Files created: `app/blueprint-diagrams.tsx`. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `design/mockups/premium-graphic-directions-2026-09-02/README.md`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. No production media was edited.

References used are the user-selected local `04-mise-en-place-blueprint.png`, the current approved
interface at the branch base, the exact project copy, existing documentary photographs/film and the
approved complete villa. The reference contributes sparse construction lines, asymmetric reserves,
an open process trajectory and a plated composition; its generated copy, dish, times, units, ticks,
photographs and implied suppliers are not copied. Neutral decisions without a supplied exact source
are the SVG control points, 1–1.4 px line roles, twelve-column spans, 48 × 300 px phone workday route,
260 px phone plate and responsive detail-hiding thresholds. No visible UI library is used; React,
Next/Vinext and SVG are implementation primitives only.

Local verification passes: `npm run lint`, the production Vinext build, all eight tests and
`git diff --check`. Browser inspection was completed at 1440, 1280, 1024, 768, 430, 390 and 375 px.
At every width `scrollWidth === clientWidth`, the overflow scan finds zero overflowing elements, all
images resolve, the film has no media error, both self-hosted fonts load, the console has no warning or
error and the smallest interactive target is 44 px. The workday film remains exact `9 / 16`; measured
film widths are 435.8, 387.4, 309.9, 241.3, 164.2, 147.5 and 141.3 px respectively. Visual checks
confirm deliberate phone compositions rather than stacked desktop blocks: workday copy/node route/film
remain side by side, menu copy stays paired with its plate, and every sourcing photograph stays beside
its text. The complete villa and both Instagram actions remain visible and functional. Focus indication
was visually checked; hover feedback remains in the existing CSS. The page has no form or
data-dependent loading, empty, validation or error states. The video poster is its loading fallback.

Final anti-template audit passes: there is no card grid, bento layout, generic marketing section,
stock UI-library theme, repeated radius, decorative shadow, gradient, glass, glow, arbitrary 3D object,
placeholder copy, invented business claim, decorative animation or mobile-only desktop stacking.
Construction marks are limited to chapter relationships and secondary leaders disappear where they
would become noise. The known accessibility tradeoff from the earlier direct video-control removal
remains: ordinary-motion users do not receive a manual pause control for the muted viewport-driven
loop, while reduced-motion users receive a still poster and off-screen media is paused. Remaining asset
risks are unchanged: commercial publication rights for the user-supplied grape and MasterChef images
are not confirmed, and the meat/fish sourcing scenes are illustrative rather than documentary proof of
named suppliers.

### Independent review publication target

This branch is bound only to the newly created Sites project
`appgprj_6a981b9ab8708191b17ebf66cc5f818f`, titled `Евгений Грыбенюк — Чертёж Mise en place`, with the
requested slug `evgen-grybenyk-mise-en-place-review`. The inherited production project
`appgprj_6a95b4e815648191b78fa20eba9811e3` was not mutated. The branch metadata and canonical URL now
target the independent review project; its validated commit is the only source authorized for the new
deployment.

## Raster blueprint backgrounds — pre-implementation audit and plan — 2026-09-02

The user directly rejected the visible line-diagram treatment and asked for several distinct drawings
to be created as images and inserted as backgrounds. The current route, the selected
`04-mise-en-place-blueprint.png`, all four rendered SVG figures, three chapter grids, current media,
tokens, responsive pairs and the already published independent review project were re-audited before
interface edits.

| Existing element | Why it fails the latest direction | Confirmed replacement | Retained |
|---|---|---|---|
| Horizontal preparation SVG | Reads as a thin interface diagram rather than a material culinary drawing | Original ImageGen preparation sheet with knife, cutting board and cloche, used as the formats background | Three format rows, copy, photos, numbering and order |
| Open workday SVG arc | Still feels detached and schematic between text and film | Original ImageGen three-scene trajectory sheet used behind the whole workday field | Exact morning/day/evening list and portrait film |
| SVG plate plus three source contours | Splits one visual idea into four mechanical vector motifs | Original ImageGen plate/meat/fish/produce sheet used as the menu and sourcing background | Exact menu copy, source categories, statements and documentary photos |

Implementation plan: save the three selected 1536 × 1024 masters as optimized project WebP assets;
remove the visible SVG figures from the route; add one non-interactive pseudo-background per chapter;
keep all live content above those layers; author tablet/phone crop and opacity separately; update the
strict source tests; run lint, production build, tests and `git diff --check`; verify the established
seven widths and complete the anti-template audit before updating the same independent review Site.
No dependency or visible UI library is required.

The user's follow-up `Для каждого блока делай картинку` expands the implementation before CSS
integration: generate separate original sheets for MasterChef origin, private dinner, private event,
masterclass, workday, menu, meat, fish and produce. Retain the existing Hero collage and villa as the
already approved images for their blocks. Each generated sheet must be unique, text-free, non-factual,
used once and positioned as a background behind the corresponding block.

The user's final constraint before generation keeps every original photograph and exact text in place.
The new images are background-only, while each must remain recognizably diagrammatic: route, nodes,
axes, process sequence, cut construction or component relationships are mandatory; decorative food
art without a readable scheme is rejected.

The first generated sheets were then rejected because they were illustrative rather than measured.
That direction is abandoned before integration. The active plan now isolates and faithfully redraws
the original mockup's workday/time, plate/diameter, meat/cut-scale, fish/cut-scale and produce/component
diagrams as raster background assets. No free-form generated chef, table, ingredient scene or invented
per-block visual will ship. Original text and documentary photography remain untouched.

The user then made the asset contract explicit: no SVG. The final implementation must rasterize every
approved diagram into its own WebP and mount it only through the corresponding block's CSS background.
Any temporary vector drafting source is excluded from the project before validation and publication.

### Final raster implementation and anti-template audit

The final implementation abandons the rejected free-form generated sheets and ships six transparent,
reference-traced WebP drawings only:

- `workday-plan.webp` — the `06:00 / 12:00 / 18:00` semicircle, ticks, sun/moon and three culinary
  anchors;
- `menu-plate-plan.webp` — concentric plate construction, `Ø 280 / Ø 180 / Ø 60` leaders and the
  original annotations;
- `meat-cut-plan.webp`, `fish-cut-plan.webp` and `produce-balance-plan.webp` — three separate chapter
  studies with the approved cut/component logic and scales;
- `contact-spoon-plan.webp` — the closing sauce trajectory and spoon drawing.

All six files live under `public/media/blueprint-backgrounds/` and are referenced only by CSS
`background-image` declarations on section pseudo-elements. `app/blueprint-diagrams.tsx` and every
temporary SVG drafting file were deleted. The rejected `preparation-sheet.webp`,
`workday-trajectory-sheet.webp` and `menu-sourcing-sheet.webp` files were also deleted before release.
No diagram appears as an `<img>`, `<svg>` or semantic content node.

`app/page.tsx` keeps the exact Russian copy, workday film, three sourcing photographs, complete villa
and all existing actions. The approved `gallery-dish.webp` is restored as foreground content at the
centre of the menu-plan background; its one circular crop is directly supported by the plate reference
and is the only radius in the stylesheet. `app/globals.css` owns all background placement, stacking and
responsive reserves. `tests/rendered-html.test.mjs` now proves the six WebP assets exist, are mounted as
backgrounds, and that the obsolete SVG component cannot return.

Files created: the six WebP assets above. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit.
File removed: `app/blueprint-diagrams.tsx`. No UI library supplies visible styling; React and Vinext
remain infrastructure only.

References used: the user-supplied high-resolution capture
`/Users/dmitro/Desktop/Снимок экрана 2026-09-02 в 17.05.37.png`, the selected local
`design/mockups/premium-graphic-directions-2026-09-02/04-mise-en-place-blueprint.png`, the current
approved interface and its original media/copy. Neutral fitting decisions without exact reference are
the CSS background positions/opacities and the phone-only vertical reserves required to keep labels,
photographs and HTML copy readable.

Validation passes: ESLint, production Vinext build and all eight source tests. Browser verification was
performed at exactly 1440, 1280, 1024, 768, 430, 390 and 375 px. Every width reports
`scrollWidth === innerWidth`, all six computed pseudo-element backgrounds resolve to WebP, no diagram
exists in content markup, and the original menu photograph loads. Visual checks confirm the complete
wide workday arc, plate diameters, three source studies and closing spoon; the 560 px breakpoint gives
workday and inquiry separate background reserves so measurements do not sit beneath live copy. The
three sourcing photos stay beside their text and the corresponding diagram remains below them on
phones. Focus, 44 px targets, video poster/captions and reduced-motion behavior are unchanged.

Final anti-template audit passes: the change introduces no card grid, bento, library theme, repeated
rounding, shadow, gradient, glass, decorative glow, generic copy or arbitrary illustration. Each
drawing explains an explicit time, diameter, cut, component or serving relationship from the supplied
reference. Remaining limitations: raster labels are intentionally non-selectable background artwork;
their meaning is contextual and they do not replace the authoritative HTML. Existing publication-rights
risks for user-supplied documentary media remain unchanged.

## Partial per-block raster integration plan — 2026-09-02

The user paused one-by-one drawing approval and requested an in-site preview of the three accepted
assets. The current route, all existing photographs/copy, the selected blueprint mockup, the three
approved 1774 × 887 PNG previews, format alternation and phone pair layouts were re-audited before UI
edits. The worktree was clean before the first accepted asset was copied.

Templated elements found: none in the retained interface. The rejected private-event draft did read as
an abstract branching infographic, so it is excluded. The accepted replacement is a concrete
tray-and-assembly study grounded in the block's small-bite content.

Implementation plan:

1. Preserve Header/Hero, all live copy, photographs, numbering, 9:16 film, existing six approved
   reference-derived backgrounds, inquiry villa, actions and footer.
2. Add one ordinary raster image after the MasterChef photo/copy pair. On wide screens give the first
   two event rows the selected mockup's three-field photo/copy/drawing rhythm, reverse the second row,
   and move each sheet beneath its pair on tablet/phone. Do not use SVG or pseudo-elements.
3. Keep each sheet complete at 2:1, square-edged and unfiltered. Use responsive gaps tailored to the
   existing chronology; do not create cards, frames, horizontal scroll or a repeated component surface.
4. Leave Masterclass and later blocks untouched until the user approves their individual drawings.
5. Update source tests for the three explicit paths and decorative image contract; run build, tests,
   lint and `git diff --check`; inspect 1440, 1280, 1024, 768, 430, 390 and 375 px before publishing the
   same independent review Site.

References used: the user's approved local blueprint mockup, the three approved generated raster
previews, original documentary media and exact project copy. Decisions without direct reference are
limited to grid row placement and responsive gaps. React/Next/Vinext remain infrastructure; no visible
UI library is introduced.

### Partial integration verification and anti-template audit

Files created: the three approved PNG assets under `public/media/blueprint-backgrounds/`. Files
changed: `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
`docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit. No existing documentary image,
video, copy, action or generated social preview was changed.

ESLint, the Vinext production build, all eight source tests and `git diff --check` pass. Browser review
was completed at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 900, 430 × 932, 390 × 844 and 375 × 812.
At every exact width `scrollWidth === innerWidth`; all three approved rasters report complete natural
dimensions; no photo, copy or drawing rectangles overlap; the smallest link target remains 44 px; and
the browser console contains no warning or error. The wide 1440/1280/1024 compositions use unequal
photo/copy/drawing fields; 768 moves each drawing below its paired row; 430/390/375 retain the existing
side-by-side photo/copy arrangement with a complete 2:1 drawing beneath it. No image is cropped,
stretched, filtered or used twice.

The final partial anti-template audit passes. The change adds no card, bento, radius, shadow, gradient,
glass, glow, stock icon, placeholder copy, repeated image, new CTA, decorative animation or library
theme. Each approved sheet has a distinct content role, and the rejected abstract private-event route
is absent. Remaining limitation: this is intentionally a partial review; Masterclass and later
per-block replacements await one-by-one user approval.

## Process-first correction audit and approval plan — 2026-09-02

The user rejected the conceptual role of the current per-block imagery: a blueprint must project the
process that produces the photographed outcome, sit behind the photograph, and remain slightly visible
below it. The route, stylesheet, exact copy, current documentary media, six earlier raster backgrounds,
three newly approved sheets, selected mockup and required responsive widths were re-audited before any
new interface edit.

### What currently fails

- `masterchef-recipes-europe.png` contains sources of experience but does not show their transformation
  into an authored dish or service format.
- `private-dinner-seven-course.png` shows a course sequence and table but omits the guest brief, menu
  choice, parallel preparation and service control.
- `private-event-canape-studies.png` explains bite assembly but not batch production, tray loading,
  circulation and replenishment.
- The six earlier CSS backgrounds isolate a clock, plate, cut or spoon motif. They are closer to the
  selected reference but still do not each express a complete input-to-result process.
- The three newly added sheets are separate grid fields or follow-on rows. That makes them editorial
  illustrations, not the process layer beneath the documentary evidence.

### Elements retained

Header, Hero wording and identity portrait, all documentary photographs, MasterChef proof, exact
Russian copy, numbering/order, 9:16 film, complete villa, Instagram actions, font files, cream palette,
square edges, content grid, focus behavior and reduced-motion behavior remain. No photograph is
regenerated, recolored or replaced.

### Process map

Eleven meaningful media compositions require a unique process: full-evening system; MasterChef
experience-to-authorship; private dinner; private-event production loop; masterclass learning loop;
workday logistics; personal-menu decision route; lamb sourcing-to-service; fish harbour-to-service;
produce farm-to-menu; and inquiry-to-table. The reference map records the inputs, transformations and
outcomes for each.

### Approval sequence and first implementation slice

1. Prototype `Частный ужин`, because its existing seven-course promise makes process success easiest to
   judge. Generate one text-free raster background using the selected mockup only as material/style
   guidance, not as subject matter.
2. Locally place the unchanged dinner photograph above that background. Keep meaningful linework on
   the sides and 10–15% below; keep the existing copy adjacent and above the background layer.
3. Show the actual block at wide and phone widths. Do not publish or propagate the system to other
   blocks until the user approves this composition.
4. After approval, repeat generation and approval one block at a time, then perform the required build,
   lint, source tests, seven-width browser verification, anti-template audit and review-site publish.

No visible UI library is needed; React/Next/Vinext remain infrastructure. Neutral decisions awaiting
the first prototype are the exact media cover percentage, side offset, lower-strip height and whether
phone requires a separate raster composition. These remain undecided rather than being applied to all
blocks prematurely.

### First private-dinner prototype result

The first approval slice is now implemented locally and prepared for the independent review Site.
`private-dinner-process-v2.png` is a 1774 × 887 built-in ImageGen raster with an explicit quiet aperture
for the unchanged cooking photograph. The drawing maps guest inputs, a two-way menu decision,
parallel preparation lanes, one control handoff, exactly seven service stages and a shared-table
outcome. `app/page.tsx` mounts it inside `format-process-field`; `app/globals.css` keeps the raster at
z-index 0, the documentary photo at z-index 1 and live copy at z-index 2. The plan remains visible on
both sides and beneath the photograph instead of occupying a separate drawing field.

Files created: `public/media/blueprint-backgrounds/private-dinner-process-v2.png` and
`design/process-blueprints-2026-09-02/PROMPTS.md`. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit.
The previous private-dinner raster remains in the repository but is no longer referenced by the page.
No UI library supplies visible styling.

The production build and all eight source tests pass; ESLint and `git diff --check` pass. Direct visual
review at 1280 × 900 and 390 × 844 confirms the input cluster, transformation photo, seven-stage route,
table outcome and lower blueprint strip remain visible with no horizontal overflow. This is not the
final all-block audit: the remaining ten media compositions deliberately retain their current state
until the user approves the private-dinner direction, after which every block still requires its own
asset and the mandatory seven-width verification.

## Emergency review correction after mobile rejection — 2026-09-02

The user's latest 390 px capture exposed a review-state error: superseded drawings were still
published while only the private-dinner process prototype should have been active. In the fish row the
old `fish-cut-plan.webp` pseudo-element combined with `min-height: 392px` and a drawing reserve below
the photo/text pair, producing the large blank band visible in the capture. The same failure pattern
exists in the produce, meat, workday, menu and inquiry blocks; MasterChef and private event also retain
detached `<figure>` drawings.

Templated or invalid elements to remove:

1. The detached MasterChef recipe/map and private-event canapé sheets: they are separate editorial
   illustrations rather than backgrounds that project a process.
2. The workday, menu, source and inquiry pseudo-elements: they show isolated subjects and do not satisfy
   the causal input → transformation → handoff → result rule.
3. Mobile `min-height`, bottom padding and top margin values whose only purpose is to reserve space for
   those inactive drawings.

Elements retained: the Header/Hero, all exact copy, every original documentary photograph, the portrait
film, menu dish, source numbering/order, villa artwork, actions, focus behavior, fonts and palette. The
private-dinner layered prototype remains because it is the only current image that follows the revised
process/background rule.

Implementation plan:

1. Remove the two detached drawing nodes and stop supplying a drawing to the private-event data row.
2. Remove every superseded blueprint URL from active page/CSS rendering while retaining asset files as
   historical inputs.
3. Restore natural-height copy/photo layouts at wide, tablet and phone widths; specifically remove the
   700 px workday, 600 px menu, 392 px source-row and 150 px inquiry reserves on phone.
4. Update source tests to enforce exactly one active blueprint and to reject all stale asset URLs and
   detached drawing hooks.
5. Run lint, tests, production build and `git diff --check`; visually inspect 1440, 1280, 1024, 768,
   430, 390 and 375 px before replacing the public review version.

The latest user capture is the direct reference for this cleanup. Neutral compact geometry is the only
decision without a new drawing reference. No visible UI library is introduced.

### Correction verification and anti-template audit

Files created: none. Files changed: `app/page.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`, `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and this audit.
The retired raster files remain in the repository only as review history and are not referenced by the
rendered page or active stylesheet.

The detached MasterChef and private-event drawings are removed. The six old CSS backgrounds and every
responsive rule that reserved space for them are removed. Ordinary event rows now contain only their
documentary photo and exact copy; sourcing rows use the screenshot-grounded compact text-left/photo-right
composition; workday returns to a direct list/film pair; personal menu keeps the real dish in normal
flow; and inquiry returns the complete villa immediately after the heading. The only active blueprint
is the private-dinner process raster behind its original photograph.

ESLint, the production build, all eight source tests and `git diff --check` pass. Browser inspection was
completed at 1440, 1280, 1024, 768, 430, 390 and 375 px. At every width the document `scrollWidth`
equals the viewport width, exactly one blueprint URL is rendered, the retired source-row pseudo-layer
computes to `none`, and the photo/copy pairs have zero geometric overlap. Source rows now measure
609/596/478/394 px on wide and tablet layouts, then 218/201/194–196 px at 430/390/375 px instead of the
forced 392 px plus 154 px reserve. The menu introduction measures 221–244 px and the workday pair
344–550 px without fixed placeholder height. Visual captures confirm readable headings, uncropped
source photographs, the process blueprint below and around the private-dinner photo, compact phone
chapters, the complete villa, and no horizontal overflow.

The final anti-template audit passes for this correction: there are no new cards, repeated drawing
fields, gradients, shadows, glows, stock icons, placeholder copy, invented claims, new CTA or library
theme. References used are the user's latest rejected phone capture, the existing approved documentary
interface and the approved private-dinner process prototype. The only decision without a drawing
reference is neutral spacing while a block awaits approval. Remaining limitation: ten unique
process-first backgrounds still require one-by-one generation and user approval; they are intentionally
absent from this review version.

## Approved private-dinner calculation sheet — implementation plan — 2026-09-02

### Audit correction

The user clarified that the unwanted drawings must be replaced one by one, not globally deleted. The
first abstract private-dinner route and the later architectural kitchen plan were rejected. The newly
generated culinary calculation sheet was explicitly approved. The MasterChef recipes/Europe raster was
also explicitly retained. Other old object studies are not reinstated as process drawings.

### Pre-code anti-template and implementation plan

1. **Templated or incorrect element found:** the previous private-dinner raster reads as a generic node
   network and does not expose the requested calculations; the emergency cleanup incorrectly treated
   missing drawings as the desired final state.
2. **Reference replacing it:** the approved 2:1 calculation sheet with guest/course totals, portion and
   yield table, ingredient loss, preparation timeline, heat-load diagram and seven-course service row.
3. **Elements retained:** exact Russian copy, original private-dinner photograph, event numbering,
   editorial grid, warm paper palette and existing layered media-field semantics.
4. **Elements reworked:** only the private-dinner raster source and its photo-safe overlay geometry.
5. **New component requirement:** none. The existing `format-process-field` is the correct semantic
   primitive; adding a card, gallery, third column or duplicate illustration would be unjustified.
6. **MasterChef:** the previously approved recipes/Europe raster remains authoritative and will not be
   regenerated. Restore it in the same layered-media system while preserving the existing proof photo
   and biography.
7. **Unapproved blocks:** remain in their compact documentary fallback until their individual preview
   receives an explicit approval.

Implementation verification must cover lint, source tests, production build, `git diff --check`, and
browser checks at 1440, 1280, 1024, 768, 430, 390 and 375 px. At every width the dinner photograph must
cover the quiet upper-middle area while leaving the calculation totals, equipment/temperature plan and
lower service sequence visible without a detached blank band or horizontal overflow.

### Implemented and verified

- **File created:** `public/media/blueprint-backgrounds/private-dinner-calculation-process.png`
  (1774 × 887 raster).
- **Files changed:** `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
  `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and `docs/DESIGN_AUDIT.md`.
- **Incorrect/templated element removed:** the generic node-route dinner prototype is no longer
  referenced. The approved calculation sheet now expresses real planning dependencies. The previously
  approved MasterChef recipes/Europe sheet is restored as a background rather than as a detached row.
- **Reference decisions:** the two active rasters come only from explicit user approvals; documentary
  photographs, copy, typography, paper palette and editorial grid come from the approved site.
- **Neutral decisions without a separate reference:** the dinner photo uses `top: 3%`, `left: 36%`,
  `width: 35%`, `height: 64%` on larger layouts and a wider mobile crop so the left calculations,
  right equipment plan and lower service sequence stay visible. The MasterChef photo uses its raster's
  quiet centre. These are fitting decisions, not a new visual style.
- **UI libraries:** no visual component library or stock theme was introduced; existing React/Next
  primitives only.
- **Automated verification:** ESLint, production build, all eight source tests and `git diff --check`
  pass.
- **Visual verification:** 1440, 1280, 1024, 768, 430, 390 and 375 px were inspected in the local
  production build. Both rasters loaded at native 1774 px width, media stayed inside each 2:1 field,
  and `documentElement.scrollWidth` equalled the viewport at every width. Wide layouts preserve the
  editorial side copy; 430/390/375 use full-width process fields with the photographs above the plans,
  visible drawing on multiple sides and a real lower process band.
- **Anti-template result:** no cards, repeated three-column drawing rows, gradients, glows, shadows,
  decorative icons, placeholder copy or library defaults were added. MasterChef and dinner deliberately
  use different process metaphors.
- **Remaining limitation:** calculations become supporting visual detail at narrow-phone size rather
  than body-readable copy; the authoritative service description remains live HTML. Every remaining
  block still requires its own one-by-one process drawing and explicit approval before insertion.

## Approved private-event production sheet — implementation plan — 2026-09-02

The first private-event candidate was conditionally accepted, then corrected by direct user feedback:
venue tables and service-floor mapping are irrelevant; menu, calculations, dishes and quantities are
the required subject; the drawing must not be coloured. The revised monochrome preview was explicitly
approved.

1. Retain the event's exact live copy, outdoor cooking photograph, numbering and alternating editorial
   rhythm.
2. Add no new component. Reuse `format-process-field` and extend its row-specific positioning so the
   second row mirrors the dinner composition without duplicating its visual metaphor.
3. Replace only `eventFormats[1].drawingSrc` and `processBackground`; do not reactivate
   `private-event-canape-studies.png` or any venue-map candidate.
4. Place the photo over the quiet upper-middle zone. Keep the left guest/count calculation, right menu
   specification and lower batch/timeline band exposed.
5. On tablet/phone, put the event copy first and the same layered field second. Do not add fixed blank
   reserves, detached drawings, horizontal scroll or furniture symbols.
6. Update source tests to require three active approved rasters and two process event rows, while the
   masterclass remains the sole documentary fallback in the event list.
7. Verify lint, build, source tests, `git diff --check` and 1440/1280/1024/768/430/390/375 px before
   publishing the existing review URL.

### Implemented and verified

- **File created:** `public/media/blueprint-backgrounds/private-event-production-calculation.png`
  (1774 × 887 monochrome raster).
- **Files changed:** `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
  `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and `docs/DESIGN_AUDIT.md`.
- **Rejected elements kept inactive:** the venue plan, furniture/table layout, coloured marks and the
  former `private-event-canape-studies.png` do not appear in rendered JSX or CSS. The approved sheet is
  about menu allocation, quantities, production batches, tray loading and timed service.
- **Reference used:** the user's explicit approval of the corrected monochrome preview. The unchanged
  outdoor cooking photograph, exact live copy, numbering and alternating editorial rhythm remain from
  the existing approved interface.
- **Neutral fitting decisions without a separate reference:** on wide layouts the photo uses `top: 4%`,
  `left: 28%`, `width: 39%`, `height: 57%`; at 560 px and below it uses `top: 3%`, `left: 38%`,
  `width: 52%`, `height: 68%`. Wide layout places the process field at columns `1 / 10` and copy at
  columns `10 / 13`; at 820 px and below the copy moves to row 1 and the full-width process field to row
  2. These percentages fit the supplied raster's quiet centre while retaining the left calculation and
  lower service sequence rather than introducing a new visual style.
- **UI libraries:** no visible component library, stock theme or new component was introduced. The
  existing React/Next markup and `format-process-field` primitive are reused.
- **Automated verification:** ESLint, the production build, all eight source tests and
  `git diff --check` pass.
- **Responsive verification:** browser geometry was checked at all required widths and the raster
  reported `naturalWidth = 1774` throughout. At 1440 px the field/media measured 968 × 484 / 377 ×
  276; at 1280 px, 860 × 430 / 335 × 245; at 1024 px, 688 × 344 / 268 × 196; at 768 px,
  724 × 362 / 282 × 206; at 430 px, 394 × 197 / 205 × 134; at 390 px, 354 × 177 / 184 ×
  120; and at 375 px, 339 × 170 / 176 × 115. `documentElement.scrollWidth` equalled the viewport
  at every width. Screenshot review at 1280, 1024, 768, 430 and 375 px confirmed the wide right-hand
  copy, the mobile copy-first order, the foreground photo and the exposed process sheet.
- **Anti-template result:** no cards, detached third-column illustration, fixed blank reserve, gradient,
  shadow, furniture symbol, placeholder copy or library-default styling was added.
- **Remaining limitation:** calculations are supporting visual detail at narrow-phone size; the exact
  commercial description remains live HTML. Masterclass remains the only documentary fallback in the
  event list, and all later blocks still await their own one-by-one raster approval.

## Approved six-person masterclass sheet — implementation plan — 2026-09-02

The first masterclass preview incorrectly planned twelve participants across four stations. The user
corrected the capacity to six people, then explicitly approved the revised monochrome raster. The
approved sheet now expresses a different process from dinner and event production: demonstration,
two synchronized stations of three, technique control with a correction loop and a shared three-dish
output. It calculates one demonstration kit plus two working kits and 18 participant portions.

1. Retain the exact live masterclass copy, documentary teaching photograph, row number and established
   process-first event sequence.
2. Add no new component. Reuse `format-process-field`, set only the third event row to the approved
   raster and extend row-specific fitting rules.
3. Place the unchanged photograph over the quiet upper-middle zone as the demonstration source. Keep
   the six-person calculation and ingredient totals visible at left, station-equipment specification at
   right, and the practice/control/timing route visible below.
4. Alternate the wide composition after the second row: masterclass copy on the left and the layered
   process field on the right. At 820 px and below, keep live copy first and the full-width composite
   second.
5. Do not reference the rejected twelve-person preview, restore the old decorative masterclass image,
   or add colour, furniture, certificate motifs, cards, shadows, fixed blank reserves or SVG.
6. Update source assertions and asset records so all three event rows are process composites and no
   documentary-only fallback remains in `eventFormats`.
7. Run lint, production build, eight source tests and `git diff --check`; visually verify 1440, 1280,
   1024, 768, 430, 390 and 375 px before updating the existing public review URL.

### Implemented and verified

- **File created:** `public/media/blueprint-backgrounds/masterclass-six-person-learning-process.png`
  (1774 × 887 monochrome raster).
- **Files changed:** `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
  `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and `docs/DESIGN_AUDIT.md`.
- **Rejected element kept inactive:** the earlier twelve-person/four-station preview is not stored in or
  referenced by the project. The approved version contains exactly six participants, two stations of
  three, three ingredient kits, six participant portions per dish and 18 participant portions total.
- **Reference used:** the user's explicit approval of the corrected six-person preview. The photograph,
  exact live copy, event numbering and graphite process language come from the approved interface and
  immediately preceding approved raster system.
- **Neutral fitting decisions without a separate reference:** the wide process field occupies columns
  `4 / 13`, with live copy at `1 / 4`; the photograph uses `top: 4%`, `left: 29%`, `width: 42%` and
  `height: 53%` at every 2:1 size. These values fit the raster's quiet demonstration zone while exposing
  both calculation columns and the complete lower practice/control/timing route.
- **UI libraries:** none introduced or used for visible styling; the existing React/Next process-field
  primitive is reused.
- **Automated verification:** ESLint, production build, all eight source tests and `git diff --check`
  pass.
- **Responsive verification:** at 1440/1280/1024 px, field/media measure 968 × 484 / 406 × 256,
  860 × 430 / 361 × 228 and 688 × 344 / 289 × 182. At 768/430/390/375 px, the copy moves to row 1
  and the full-width field to row 2, measuring 724 × 362, 394 × 197, 354 × 177 and 339 × 170.
  The 1774 px source loaded at every width and `documentElement.scrollWidth` equalled the viewport.
  Screenshot review at 1280 and 390 px confirmed the unchanged teaching photograph remains over the
  drawing while “6 участников”, both station lanes, equipment, control and timing stay visible.
- **Anti-template result:** the sheet adds no classroom card grid, certificate, generic icon row, colour,
  gradient, shadow, SVG or detached illustration; its demonstration/practice/correction topology is not
  reused from dinner or event production.
- **Remaining limitation:** tiny raster annotations become atmospheric support on narrow phones; exact
  service meaning remains in live HTML. The next unapproved block is `Я — у вас дома`; Hero, personal
  menu, meat, fish, produce and inquiry also remain documentary-only pending their own approval.

## Approved text-free workday composition — implementation plan — 2026-09-02

Three workday candidates were reviewed. The user rejected the detailed critical-path/manifest version,
then rejected the horizontal miniature sequence, and finally corrected the composition to contain no
visible text: the unchanged vertical film is on the left and four drawings run top-to-bottom on the
right. The final monochrome preview was explicitly approved.

1. Save only the approved 1774 × 887 raster as `workday-four-step-vertical.png`. Do not reference the
   manifest/vehicle candidate or either earlier horizontal candidate.
2. Replace the current visible heading/list composition with one layered 2:1 process field. Keep the
   existing heading and exact three-phase copy as screen-reader context so the section remains named,
   but remove them from visible flow as explicitly requested.
3. Keep the original 720 × 1280 documentary film and playback behavior. Restore its native 9:16 shape,
   position it in the raster's quiet left zone and place it above the background at `z-index: 1`.
4. Leave the four generated miniatures unobscured on the right in their approved vertical order:
   purchase, preparations, marinade and cooking at home. Add no live labels, cards or duplicate icons.
5. Preserve the section's paper surface and rules. Add no fixed-height blank reserve, SVG, colour,
   shadow, gradient, blended filter or animation.
6. Update source assertions and asset records to require the raster, the process field, left film and
   accessibility-only copy.
7. Verify lint, production build, all eight tests, `git diff --check` and the required seven widths
   before publishing to the same public review URL.

### Implemented and verified

- **File created:** `public/media/blueprint-backgrounds/workday-four-step-vertical.png`
  (1774 × 887 monochrome raster).
- **Files changed:** `app/page.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`,
  `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` and `docs/DESIGN_AUDIT.md`.
- **Templated/rejected elements kept inactive:** the critical-path/manifest/vehicle sheet and both
  horizontal miniature candidates are not referenced by the project. The former visible heading/list
  rail is removed from layout rather than converted into a card or timeline.
- **Reference used:** the user's explicit approval of the text-free preview and direct placement rule:
  unchanged portrait video on the left; purchase, preparations, marinade and cooking-at-home drawings
  stacked vertically on the right.
- **Neutral fitting decisions without a separate reference:** the single process field spans the complete
  grid. The film uses `top: 5%`, `left: 12%`, `width: 25.3125%` and `height: 90%`; this preserves its exact
  `9 / 16` ratio while fitting the raster's authored quiet zone.
- **Accessibility:** the exact original `Я — / у вас дома` heading and three workday facts remain in a
  one-pixel clipped semantic wrapper. The decorative raster uses empty alt text and `aria-hidden`; the
  video retains its existing accessible label and caption track.
- **UI libraries:** none introduced or used for visible styling; the existing page grid and video
  component are reused as technical primitives.
- **Automated verification:** ESLint, production build, all eight source tests and `git diff --check`
  pass.
- **Responsive verification:** at 1440/1280/1024/768/430/390/375 px, process field dimensions are
  1308 × 654, 1162 × 581, 930 × 465, 724 × 362, 394 × 197, 354 × 177 and 339 × 170. Film dimensions are
  331 × 588, 294 × 523, 235 × 418, 183 × 326, 100 × 177, 90 × 159 and 86 × 153; the measured ratio is
  `0.5625` at every width. The 1774 px raster loads at every size and document width always equals the
  viewport. Screenshot review at all seven widths confirmed the film remains left, all four drawings
  remain visible top-to-bottom at right and no live text appears in the section.
- **Anti-template result:** the workday is one content-specific process composite, with no cards,
  generic timeline, labels, icons, colour, gradient, shadow, SVG, decorative animation or desktop-only
  restacking behavior.
- **Remaining limitation:** the four miniatures intentionally become atmospheric at narrow-phone size,
  while the exact process remains available to assistive technology. Personal menu, meat, fish, produce,
  inquiry and Hero still await their own independently approved process drawings.
