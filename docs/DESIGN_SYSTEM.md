# Design System

## Comparison study — not active tokens (2026-08-31)

The five style-unification boards in `design/mockups/site-style-unification-2026-08-31/` explore how one existing project language could govern the whole page. They do not replace the active system below.

| Direction | Dominant composition | Media rule | Graphic rule | Tempo |
|---|---|---|---|---|
| Documentary mosaic | Full-field irregular photographic partitions with overlaid copy and a sharp identity anchor | Real local media, square seams, documentary crops, one uniform paper veil | Minimal rules; typography and aperture geometry carry hierarchy | Dense opening, evidence-led continuation |
| Editorial biography | Asymmetric multi-column spreads with one dominant image per movement | Large uncropped or restrained editorial crops, captions only when factual | Hairline rules, serif display, copper emphasis, open paper | Calm long-form reading |
| Cyprus tapestry | Alternating text/photo fields joined by approved local botanical and diamond artwork | Real photos remain documentary; ornament occupies its own field and never masks faces | Painted olive, sparse citrus blossom, terracotta fruit and Lefkara-inspired diamonds only | Warm, personal and rhythmic |
| Product route | Oversized outline nouns, paired photographic evidence and clipped statements | Full-frame documentary pairs grouped by meaning | Copper perimeter lines, clipped corner, forest statement for emphasis | Graphic, directional and assertive |
| Watercolour invitation | Large authored reserve with complete brush illustrations and very few text clusters | Illustration shown as a complete canvas; photographs receive compatible soft paper integration but no fake painting of identity | One forest action, no extra ornaments, no framed cards | Slow, atmospheric and intimate |

Shared invariants for every board: `#F5F1E8`/`#FFFDF8` paper family, `#171612` ink, `#A86233` copper, `#153F37` forest, Oranienbaum display, Onest utility/body, square or source-led edges, real chef identity, no gradients, glass, generic cards, stock avatars or invented marketing copy. Final spacing, grid, type scale and breakpoint values remain undecided until the user selects a direction.

### Round 2 comparison axes — not active tokens

The eight new boards intentionally explore systems beyond the current palette and font allocation. Their fixed comparison axes are: composition, typographic voice, photographic treatment, graphic device, density and page tempo. Field journal uses annotated evidence; Mise en place uses measured preparation; private invitation uses addressed minimalism; fashion editorial uses art-directed protagonist imagery; Neo-Swiss uses typographic structure; raw luxury uses tactile imperfection; immersive cinema uses sequential scenes; digital collage uses controlled overlap. Exact colors, typefaces, motion and responsive values remain undecided and may not enter production before the user chooses a direction and confirms references.

Status: **Header link strip and hero credential removed by direct user instruction; approved site retained**
Last audit: 2026-09-02

This document describes only the active interface. Historical experiments belong in `DESIGN_AUDIT.md` and must not influence implementation unless the user explicitly restores them.

## Foundations

The latest user correction recorded at the end of this document restores the approved cream/paper
palette. Trivium remains the numerical source for typography and smooth scrolling only. Current
production uses the active CSS-token names in the following table.

### Palette

| Token | Value | Role |
|---|---:|---|
| `--paper` | `#F4EFE5` | Main approved cream editorial field |
| `--paper-light` | `#FCFAF5` | Light ivory alternating surface |
| `--ink` | `#0A0A0A` | Primary heading and text color |
| `--muted` | `#6E665A` | Supporting warm-grey copy |
| `--accent` | `#A0792E` | Display italic and main restrained gold-brown accent |
| `--accent-small` | `#72561F` | Small labels and indices with sufficient cream contrast |
| `--rule` | `#C8C0B3` | Editorial hairlines and structural separators |

Media reference swatches are `--media-shadow: #121318`, `--media-charcoal: #27292B`, `--media-wall: #B3A094`, `--media-wood: #9E7559`, `--media-stone: #726D6C`, `--media-linen: #E0DDDA`, and `--media-flame: #A86233`. They describe recurring colors in the documentary footage and may not be used as text/control colors without a separate contrast check. The forest action comes from the approved brush-villa illustration and its conversion role, not from the film.

### Typography

- Display and editorial typography: self-hosted Cormorant Garamond. Hero uses weight 300 at
  `clamp(44.8px, 6.875vw, 88px) / 1.1`; section headings use weight 400 at
  `clamp(32px, 3.75vw, 48px) / 1.2`; tertiary headings use 20 px / 1.3 at weight 400.
- Emotional/display emphasis: Cormorant Garamond italic 300 in `--accent`; it remains part of the
  display hierarchy rather than a pale caption.
- Body, navigation, labels and controls: self-hosted Montserrat. Narrative body is weight 300,
  generally 16 px / 1.8; supporting format copy is 14.08–15 px / approximately 1.8.
- Labels are Montserrat 600 at 11.2 px / 1.7 with `.25em` tracking. Navigation is 12 px desktop and
  13.6 px phone. Primary actions are Montserrat 600 at 12 px / 1.35 with `.16em` tracking.
- Functional or factual text must not render below 11 px. Long uppercase passages remain forbidden.
- All fonts use `font-display: swap`; the local files cover both Cyrillic and Latin text.

### Layout and spacing

- Global desktop gutters use `clamp(24px, 5vw, 76px)` unless a block has a documented content-specific grid.
- The hero, story, menu, inquiry and footer use different structures and vertical rhythms; there is no universal card or section-height token.
- Desktop story width: the complete story layout may reach `min(calc(100% - 96px), 1440px)`, while the opening MasterChef proof row is independently constrained to a compact `1080px` horizontal field by direct request.
- Phone page gutter: 20 px. Tablet gutter: 24–32 px depending on block.
- Negative spacing is permitted only for the approved inquiry-art crop whose containing block owns `overflow: hidden`.

### Shape, depth and rules

- Visible surfaces and controls use zero radius.
- No shadows, glassmorphism, glow, blur circles or floating-card depth. The hero’s user-requested uniform mosaic softening is a documentary-background treatment, not a surface or depth effect.
- Thin warm rules establish editorial grouping.
- Photography and typography, not decorative effects, create depth.

## Active components

### Header

- A restrained warm-paper overlay sits over the full-field documentary hero so dark navigation remains legible without a black media bar; the header itself has no blur or glass treatment.
- Desktop: wordmark, three anchors and one forest inquiry action.
- Below 900 px: secondary navigation is removed; wordmark and inquiry action remain.
- All interactive targets are at least 44 × 44 CSS px and have visible focus.
- A skip link precedes the header in DOM order and becomes visible on keyboard focus.
- Every external inquiry label names Instagram and `@evg.chef`; `↗` indicates the new tab visually.

### Hero

- One documentary collage covers the complete hero behind the header, copy and main chef portrait. It contains exactly the forty valid screenshots supplied by the user on 2026-08-31; each appears once. The accidental `6 × 8` PNG is not a usable photograph and is excluded. No earlier Instagram file, film frame, gallery image, sourcing image or poster remains in the collage.
- The collage is one continuous irregular field with no food/professional split, visible group label or decorative divider. Wide desktop uses a thirty-two-column by ten-row refinement with a fitted portrait aperture at columns 16–23 / rows 3–7. A separate 901–1100 px compact map keeps columns 18–26 / rows 3–7 clear. Tablet uses twelve by sixteen with columns 8–12 / rows 8–16 reserved; phone uses eight by twenty with columns 4–8 / rows 9–17 reserved and a complete photographic band below it. Every map contains all forty sources and changes both column span and row depth rather than forming an equal square matrix.
- Tile boundaries remain square-edged with a restrained warm hairline. Irregularity comes from content-led aperture proportion and staggered internal grid lines, not radius, shadow, rotation, floating-card overlap or a stock bento preset.
- The screenshot-derived WebP assets keep the supplied visual content and identity intact. Only delivery resizing/compression and CSS `object-fit: cover` crops are permitted; no face/body retouch, text erasure, generative reconstruction or runtime Instagram hotlink is used.
- The separate main identity image is the approved user-supplied `chef-hero-apron.jpg`. Above 1100 px it begins at desktop column 16 (`left: 46.875%`, `top: 20%`) and fills columns 16–23 / rows 3–7 with `width: min(25vw, 440px)` and `height: 50%`. From 901–1100 px it begins at compact column 18 (`left: 53.125%`) with `min(26vw, 340px)`. Below 900 px it remains right-aligned at `3%` and `38vw`; on phone it begins at `top: 40%`, uses `45%` hero height, width `65%` and right `-4%`. The container clips the unchanged source; an optical `1.08` crop and a compact-only `1.22` crop remove its embedded phone screenshot bands while retaining the real face, uniform, apron and hands.
- Hero copy, portrait and collage use one viewport-based coordinate system. The copy starts on the same responsive left gutter as the header rather than inside a separately centered container.
- Hero copy uses the restored initial-light roles `--hero-copy-ink`, `--hero-copy-muted`, `--hero-copy-accent` and `--hero-copy-rule` directly above one uniformly treated documentary field. Local desktop/tablet/phone `.hero-wash` layers are forbidden. The mosaic-owned pseudo-layer alone applies `backdrop-filter: blur(2.2px)` and a `66%` warm-paper veil across every collage photograph at every breakpoint. The stronger complete-field veil restores legibility without changing the approved Oranienbaum or copy colors. The title, eyebrow, foreground chef photograph and primary paper background remain optically sharp.
- The restored main portrait alone receives high-priority loading. All forty collage screenshots use responsive optimized sources and lazy/low-priority loading.
- The hero contains no autoplay video. The supplied film remains in the chef-story section, poster-first and motion-preference aware.
- Visible hero copy is limited to the eyebrow `Победитель «МастерШеф. Профессионалы — 2»` and the exact user-supplied identity promise `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре`. The supporting service paragraph, desktop/tablet format rail, `scroll`, capacity, central Instagram action, `посмотреть форматы` and `пауза видео` are absent by direct instruction. The header remains the sole Instagram action at the top of the page.
- Hero typography uses Oranienbaum 400 with the exact current responsive scale left intact: desktop `clamp(58px, 5.1vw, 88px)`, below 1100 px `clamp(52px, 6vw, 64px)`, phone `clamp(39px, 10.4vw, 46px)`. The title is no longer forced to uppercase or extended variable-width settings. It retains five deliberate lines: `Евгений`, `Грыбенюк —`, `ваш личный`, `Мастер-Шеф`, `на Кипре`; browser wrapping may not create an orphan dash or split `Мастер-Шеф`.
- Below 900 px the starting height floor is 820 px, subject to required-width verification; it may grow with content but may not force an empty second screen after the actions.
- At 768 px and below the header stays inside the hero and uses the same light paper overlay; it does not become a persistent site-wide bar or glass surface.
- On phones all forty screenshot cells remain present behind the content in the independently authored eight-column by twenty-row map. The heading flow is top-anchored below the 72 px header and uses the shared 20 px gutter. The same uniform full-mosaic treatment used on desktop continues behind it; no phone-only paper wash is added. The restored portrait begins directly beneath the title in the right-side rows 9–17 evidence field and may not cover the title or another photograph.
- No substitute hero paragraph, format rail, scroll cue, action or control is introduced.
- The latest screenshot correction uses `2.2px` backdrop blur and a `66%` warm-paper veil across the complete background mosaic while removing all local washes. The value is uniform rather than left-weighted so copy remains readable without reintroducing a local white field. The other comparison treatments and isolated preview route remain unapproved. The title and chef identity remain sharp.

### Chef-story editorial spread

> Blueprint-branch override — 2026-09-02: the earlier desktop/tablet `4 / 3` film rule below is
> retained only as release history. On `codex/mise-en-place-blueprint`, the selected reference's
> portrait-film relationship and the later branch decision supersede it: the documentary film is
> `9 / 16` at every width and remains paired with the workday copy and trajectory.

- The section begins immediately after the hero with a compact two-column award row. It is a modest horizontal rectangle rather than a viewport-scale chapter: desktop width is capped at `1080px`, vertical padding stays restrained, and neither text nor image is allowed to dominate the next screen.
- Its text column contains the heading `От MasterChef к вашему столу` and the exact user-supplied two-paragraph biography. The second paragraph is `Теперь я провожу частные ужины, приватные мероприятия и мастер-классы и превращаю этот опыт в ваш идеальный гастрономический вечер.`; the documentary award photograph occupies the right column in a shallow `16 / 9` aperture. The title remains Oranienbaum. Both biography paragraphs share the same Onest base class, size, weight and line height at every breakpoint; difference in meaning comes only from spacing and color, not a second body typeface or display-sized closing sentence.
- A separately ruled present-day row follows. On desktop and tablet, the left text rail contains `Я — у вас дома` and the three existing working-day facts; a horizontal `4 / 3` film aperture occupies the larger right field. No ornament or extra caption separates the copy from the film.
- The vertical source film uses a restrained center crop inside the requested horizontal 4:3 web aperture. The chef and working action must remain visible throughout playback; the media must not be stretched.
- Phone keeps the complete heading and working-day list beside the film in one compact two-column field. The text occupies columns `1 / 8`, the film columns `8 / 13`, and the gap is `12px`; the film returns to the directly required vertical `9 / 16` and never expands to the content width. The horizontal `4 / 3` change must not cascade into the phone breakpoint. The list uses a compact `44px + 1fr` internal grid and a readable `12px / 1.45` treatment; both biography paragraphs retain their approved shared body treatment.
- The rejected eyebrow `мой путь` is absent; no substitute label, chapter number, arrow or connector is introduced.
- The “документальный фрагмент” label, local pause overlay, section folio and fact indices are absent.
- No explanatory caption appears beneath the film; the MasterChef-and-Europe paragraph and the concise present-day close belong together in the first text column.
- The story fact rail is a three-part working-day sequence supplied directly by the user: `утро: закупаю продукты`, `день: делаю заготовки, маринады и соусы`, `вечер: готовлю у вас дома для вас и ваших гостей`. It keeps the existing unnumbered list structure and geometry; no timeline component, icons or decorative separators are added. The biography uses the user’s concise two-paragraph replacement: the MasterChef win opens the route to the cuisines of Europe and the Mediterranean, and that experience becomes the guest’s gastronomic evening. It must not add the superseded visible prize paragraph, invent workplaces, or depict or imply an unverified plate, statuette, cup, net payout or present-day currency equivalent.
- The biography includes one contemporaneous award photograph requested by the user: Evgen in his season-two chef jacket holding the black branded winner envelope. It remains a square-edged documentary figure without a visible caption, trophy card, gallery or decorative background; the later direct removal instruction supersedes the earlier caption requirement.
- The award image may use an editorial crop but must keep Evgen’s face, jacket and complete envelope visible. No caption, replacement badge or empty caption reserve remains beneath it; the prose stays in the facing left column.
- The local source ledger records that the file was published by Fakty and credited in contemporaneous coverage to STB. The user has explicitly requested its use, but commercial publication authorization remains unconfirmed and must be resolved before treating the asset as cleared.
- The approved ornament is mockup №5: a contemporary Cyprus garden tapestry combining olive leaves, very sparse citrus blossom, terracotta fruit and large Lefkara-inspired open diamonds. It is authored as two local transparent PNG assets rather than reconstructed from the full-page mockup or imported as stock decoration.
- The square master artwork fills the flexible statement reserve with `cover` cropping; the separately composed horizontal continuation fills the reserve below the film. Both sit on the existing paper color, use no shadow/radius/frame, and must retain their hand-painted irregularity rather than repeat as a small wallpaper tile.
- The ornament remains a subordinate identity accent in the right text rail; it may not separate the film from its text or compete with the two requested media/text relationships.
- Video is poster-first, muted, looped and played only while at least 55% visible.
- The source uses `preload="none"`; reduced motion leaves the poster and does not start or prefetch playback.
- The matching VTT remains available in the source but is not forced on for a permanently muted music track; the specific visual `aria-label` carries the meaningful context without a persistent black cue.
- One project-styled pause/resume control in the hero manages persistent page video motion without exposing native player chrome. It is at least 44 px high, reports its state with text and `aria-pressed`, and never enables sound; it is not duplicated over the story film.
- No native controls, sound retry, device chrome, crop, blur or illustration inside this section.

### Bespoke menu

- The rejected eyebrow `у меня нет готового меню` is absent; the menu-creation heading begins the section without a replacement label or decorative filler.
- Active production direction, 2026-09-01: three square-edged source rows use a restrained alternating editorial rhythm rather than the rejected outline-word framework. Their only category labels are `Мясо`, `Рыба`, `Овощи и фрукты`; the smaller `горы`, `порт`, `Кипр` labels remain absent by direct instruction.
- Photographs use full-frame `contain` presentation inside a `4 / 3` aperture. The generated market photographs already match that ratio; the real grape-harvest portrait may retain a restrained paper reserve so Evgen and the grape crate are not cropped.
- Two-column introduction on desktop; one deliberate reading flow below 900 px.
- The visitor brief, product search and hosted evening are explained once in one concise paragraph beneath the single section heading. There is no numbered process list and no second sourcing display heading.
- The product-sourcing promise continues directly from that paragraph into an asymmetric editorial field before event formats rather than restarting as another section or becoming three reusable cards.
- The sourcing field uses exactly three locally stored assets: an identity-preserving generated wide three-quarter scene of a visibly slimmer Evgen inspecting a professionally dressed half lamb at a neutral meat market, an identity-preserving generated side/over-counter scene of the same slimmer Evgen choosing fish at a neutral harbour market, and the real user-approved grape-harvest photograph. The earlier sheep landscape, Larnaca seller, meat counter, boat catch and greenhouse remain inactive source history.
- Desktop, tablet and phone share one deliberate movement: `Мясо` is text/photo, `Рыба` is photo/text, and `Овощи и фрукты` is text/photo. All remain side by side at supported widths; alternation supplies movement without cards, ornament or decorative animation.
- Route and product evidence remain separate when one photograph cannot honestly establish both. A verified Cyprus frame may establish location; a neutral Pexels frame may establish product or work. Neither establishes a supplier relationship with Evgen.
- Photographs and descriptions form one square-edged editorial sequence: every description remains attached to its related word/image movement rather than appearing as a conventional caption underneath. Market views must use visibly different camera angles rather than repeated front-facing waist-up portraits; the grape image remains the calm frontal close. The three description fields use the existing paper and forest surfaces for hierarchy, with thin terracotta perimeter lines and the reference-derived clipped corner; they receive no radius, shadow, icon or reusable-card treatment.
- Exact public-facing lines are `Хотите ягнёнка? — еду за ним в горы.`, `Нужна рыба? — еду в порт к рыбакам.` and `Свежие овощи и фрукты? — только с кипрских ферм.` These express initiative and selection, not guaranteed same-day availability.
- The two market photographs are original AI-generated editorial illustrations based on the project’s real identity references. They must not be described as evidence of a named vendor, market visit or supplier relationship. The grape-harvest frame remains a direct user-supplied photograph and may describe only what is visible; its broader publication rights are not independently verified.
- At 768 px and below each category remains a compact paired movement rather than a scaled desktop canvas. Exact statements remain beside their related image; there is no horizontal scroller, full-width phone slab or generic one-card-per-item stack.
- Three event-format stages remain square-edged and non-interactive. Their exact public names are `Частный ужин`, `Приватные мероприятия` and `Мастер-классы`; the older `Коктейльная вечеринка` and singular `Мастер-класс` labels are superseded.
- Event-format photographs are assigned by meaning, not used as interchangeable food decoration. `Частный ужин` uses the user-supplied vertical close working portrait; `Приватные мероприятия` uses the user-supplied 2278 × 1510 outdoor crêpe-cooking frame; `Мастер-классы` uses the user-supplied landscape demonstration with participants. The existing `4 / 5` stage aperture and square edges remain; object positioning may protect the defining chef, hands, cooking action and teaching interaction, but no photograph may be stretched, face-retouched or replaced by stock.
- The private-event source bitmap remains intact. Its neutral central `cover` crop is part of the already approved stage behavior and must keep the chef, both working hands, crêpe plate and outdoor service context visible while leaving the source mark in the far upper-left outside the rendered aperture. Do not inpaint, blur, paint over or otherwise reconstruct the marked pixels.
- The rejected format eyebrow `я готовлю для компаний до 20 гостей` and the former `Я работаю лично.` line are absent; `Вечера бывают разные` leads the stages directly and no capacity summary replaces it.
- No public section, fact, sourcing-scene or event-format block displays `01 / 02 / 03`; retained content order is expressed structurally rather than by decorative numerals.
- Phone stages alternate image/text direction rather than becoming a carousel.
- Phone section transitions and repeated scene/stage gaps may be tightened when measured empty paper exceeds the content-led editorial pause; the 20 px gutter, image associations, 44 px targets and distinct composition of every section remain fixed.
- The bespoke-menu section ends after the three event formats and proceeds directly to inquiry; no secondary gallery or repeated format summary follows it.

### Footer

- Phone footer spacing is content-led: identity and two wrapped navigation rows remain legible with 44 px target heights, while row gaps and outer padding stay compact enough that the sparse footer does not behave like another full section.

### Inquiry close

- The rejected generic eyebrow `первый шаг` is absent; the large heading begins and spans the field.
- The approved 1536 × 1024 brush-villa source is immutable and must be shown as one complete `contain`-fitted canvas at every width. Cropping, zooming, negative image offsets and asset edits are forbidden.
- Desktop places the complete canvas across the closing field, aligned to the bottom-right; the heading and action use the illustration’s authored quiet paper reserve. Above 1024 px they form one upper-left reading group: the action follows the heading after a responsive 48–64 px interval and is never pushed to the bottom merely to fill the section. The lower-left paper reserve belongs to the illustration’s composition and receives no filler.
- The display heading is reduced and width-limited before any artwork may be compromised.
- At 1024 px and below the complete 3:2 image becomes a separate full-width figure between heading and action. Its aspect ratio follows the source rather than a crop aperture, preventing text/art overlap at tablet widths.
- Text is never placed over dense brushwork.
- Instagram remains the only verified action.
- Copy requests date, location, guest count, desired character and relevant restrictions, then explains that the chef clarifies details and prepares a personal proposal.

### Footer

- Sparse identity, internal anchors and Instagram only.
- The rejected service/capacity sentence is absent and receives no replacement summary.

## Interaction states

- Focus on paper: 2 px `#153F37` inner outline plus a 2 px `#FFFDF8` outer separation ring where adjacent imagery could reduce contrast.
- Focus on media: 2 px `#FFF8EC` inner outline plus a 2 px `#14100F` outer separation ring. A single copper outline is not sufficient over arbitrary photography.
- Primary hover: `--forest-hover`.
- Text-link hover may increase contrast or expose an underline; information never relies on hover alone.
- New-tab actions communicate Instagram, `@evg.chef` and the new-tab behavior in their visible or accessible label.
- Story-video motion remains muted, viewport-controlled and disabled for reduced-motion preferences, but no page-level `пауза видео` / `продолжить видео` control is rendered after the user’s direct removal instruction.
- Loading, empty, error, validation, disabled and success states remain undefined because the current page has no form or data-dependent UI.

## Motion

- Entry transitions are brief, restrained and content-led.
- No animation may leave content hidden when unsupported or interrupted.
- `prefers-reduced-motion: reduce` disables transforms, reveal animations, smooth scrolling and video playback.
- The story film uses a poster fallback; the hero is entirely still imagery.
- The story film pauses outside the viewport and for reduced-motion preferences. The direct user request removes the independent manual pause/resume affordance; this remains an explicit accessibility tradeoff.

## Media delivery

- Use responsive optimized images for the hero mosaic; do not preload the whole collage.
- Below-fold images use `loading="lazy"` and `decoding="async"`.
- Dense mosaic derivatives are sized for their rendered cells and use WebP while original documentary sources and source films remain preserved. All sixty hero DOM tiles resolve from distinct local paths across the approved Instagram, optimized-project, sourcing and derived-frame directories; source and perceptual-scene reuse are forbidden.
- MP4 files keep H.264/yuv420p, front-loaded `moov`, posters and matching VTT timing.
- Video delivery must support HTTP byte ranges. Static versioned media should receive durable cache headers; HTML may use CDN revalidation but not per-request metadata solely to discover its origin.

### Provenance classes

- `documentary`: supplied photographs, supplied videos, and locally stored stills from the approved `@evg.chef` source; may support identity and proof claims. Within the hero background, the active subset is restricted to local `/media/instagram/` images; supplied film and its derived frames remain available only outside that mosaic.
- `press documentary — rights pending`: the 2020 MasterChef award photograph republished by Fakty and attributed in contemporaneous coverage to STB; may support the verified finale context in local review, but is not recorded as commercially cleared.
- `licensed sourcing illustration`: the Pexels fishermen photograph; may illustrate the requested sourcing effort but may not identify a real supplier, partnership or Cyprus location. The former rack-of-lamb file is inactive source history.
- `licensed Cyprus agriculture`: the Wikimedia Commons aubergine-field and orange-tree photographs; may identify Cyprus agriculture under their recorded CC licenses but may not imply that the pictured holdings supply the chef.
- `user-supplied documentary — rights unverified`: `evgen-grape-harvest.webp`; may describe Evgen, the visible grape harvest and field context, but the user-provided file does not independently establish authorship or broader publication rights.
- `local-scene asset — rights pending`: the Kissonerga meat counter, AP Larnaca harbour market and «Вестник Кипра» strawberry photographs. The user explicitly directed their local integration; this does not establish commercial/promotional rights, identify actual suppliers or remove the public-release risk.
- `illustrative`: `chef-story-brush-villa.png`; may suggest atmosphere only and must not be described as a real client venue.
- `superseded proposal`: every photorealistic villa, kitchen continuation, façade, bridge, pool, generated guest, and associated mockup; removed from the active tree and never reintroduced without explicit approval.
- `social preview`: must preserve the real chef's identity and trace back to `chef-portrait.jpg`. An identity-preserving edit may introduce only flat branded framing and verified copy, never a substitute person or invented venue.

## Accessibility

- WCAG AA contrast is the minimum target for normal text and control states.
- `lang="ru"`, semantic landmarks, heading order, lists and figure descriptions are required.
- Decorative collage media and the villa drawing remain hidden from assistive technology.
- Meaningful images retain specific Russian alternative text.
- Targets are at least 44 × 44 CSS px.
- No essential interaction relies only on color, hover, motion or sound.
- Caption timing must match the edited video; cue styling must remain readable on every breakpoint.
- Keyboard focus begins with a skip link to the main content; external Instagram actions announce the destination and new tab.

## Social preview

- Root Open Graph and X imagery is 1200 × 630.
- It is grounded in the real local portrait of Evgen. Any image edit is limited to identity-preserving branded framing; a substitute, stock or lookalike person is not permitted.
- Exact copy uses the current service language and remains inside safe margins for messaging-app crops.
- Metadata uses a trusted configured origin rather than trusting arbitrary forwarded-host headers.

## Responsive verification

Structural breakpoints: 1100, 1024, 900, 768, 700 and 560 px.
Mandatory verification widths: **1440, 1280, 1024, 768, 430, 390 and 375 px**.

At each width verify hierarchy, heading wraps, image crops, overflow, navigation, 44 px targets, focus, captions, reduced motion, loading behavior and console/network errors. Mobile is a separately composed interface, not a mechanically stacked desktop page.

## Open decisions

- final logo and broader brand identity;
- service geography and travel radius;
- public dietary claims;
- verified proof beyond the current biography;
- contact channels beyond Instagram;
- form and asynchronous state language if interactive features are added.
- commercial-use clearance for the 2020 STB/Fakty award photograph.
- publication rights or replacement commissioned photographs for the user-supplied grape harvest, village butcher counter, Cyprus strawberry farm and Larnaca harbour fish market.

Undecided items must remain undecided and may not be filled with template defaults.

## Active Cyprus-ornament system — 2026-09-01

- Palette: limestone `#F1E8D8`, shell `#FFF9EE`, ink `#201C17`, deep olive `#193D32`, terracotta `#B24F2F`, mineral blue `#315C70`, quiet earth `#746A5D` and warm rule `#C9B9A2`. Gold, purple gradients, glass, glow and faux-paper distress are absent.
- Typography: the user’s later direct font-change instruction supersedes the earlier pair. Roboto Flex is the active display, body, navigation and control family, using variable width/weight for hierarchy; Literata Italic is limited to selected emotional phrases and service names. Oranienbaum and Onest are absent from the active interface.
- Hero grid: exactly forty local images in source order; every collage tile is square and equal within its breakpoint. Large: `10 × 4`; medium: `8 × 5`; compact: `5 × 8`; phone: `4 × 10`. Gap is a consistent 2–4 px stitched seam. No tile spans, variable rows, radius, shadow or decorative crop mask.
- Hero overlay: existing title and credibility remain above the grid with one solid limestone reading field and one real apron portrait. The portrait is not a collage tile. It retains its face/apron crop and has a Cyprus-derived double-line diamond corner frame.
- Ornament grammar: open diamond, nested square, interrupted stitch and sparse olive/tapestry field. Use it only at hero frame, chapter divider, film edge, sourcing perimeter and inquiry close. Never cover faces, food, functional copy or the video subtitle-safe area.
- `CyprusDivider`: semantic-free, 48–72 px high, containing a centered run of open diamonds and interrupted lines. It may reveal once through opacity/translate only; reduced motion displays it immediately.
- Format chapter: immediately follows hero. The three supplied scenes form one connected triptych, not three floating cards. Square edges, shared woven perimeter, unequal text-image balance and one heading. At phone widths the three items alternate image/text relationships rather than merely shrinking columns.
- Biography/film: exact current text, award proof, film, poster, captions, muted loop, viewport playback and reduced-motion pause remain. Ornament is an exterior frame only.
- Sourcing: exact meat → fish → produce order, six images, category words and captions remain. Each movement keeps source-led geometry but shares one perimeter and divider rhythm; no crop may remove the evidence named in alternative text.
- Inquiry: existing complete villa artwork and Instagram action remain. Text sits on limestone reserve; the action is deep olive with shell text and terracotta hover. No new form or contact channel.
- Borders: square geometry. Structural 1 px warm-rule lines; 2 px olive/terracotta emphasis; ornament diamonds use 1–2 px strokes. No repeated radius, shadow, embossed effect or glass.
- Motion: 480–720 ms image/ornament entry, no continuous animation, parallax, scroll hijack, cursor effect or marquee. `prefers-reduced-motion` removes transforms, smooth scrolling and video playback.
- Interaction: minimum 44 px targets. Paper/shell focus uses a 2 px mineral-blue outline plus shell separation; olive/photo focus uses shell plus mineral-blue separation. Hover may underline text or swap olive/terracotta surfaces without moving layout.
- Breakpoints: `1200`, `1024`, `820`, `640`, `430px`. Mandatory project review widths remain `1440`, `1280`, `1024`, `768`, `430`, `390`, `375px`.
- Undecided and not invented: logo, pricing, service radius, dietary claims, testimonials, form states, partner logos, additional credentials and contact channels beyond Instagram.

### Textile-depth amendment — 2026-09-01

- The former single-diamond grammar is retired. An isolated rotated square may appear only inside a larger pattern module, never as a standalone corner sticker.
- `cross-cell`: five-square cross with alternating filled/void centre; used by the persistent page selvage and hero loom edge.
- `cutwork-rosette`: nested square/lozenge with four interrupted stitch arms; used only for chapter transitions and evidence corners.
- `stepped-lozenge`: two offset square outlines connected by short steps; used by the event-format spine and inquiry perimeter.
- Page selvage: 18–28 px inside the viewport edge on desktop, visually reduced below 820 px and hidden only if it would consume more than 12 px of a 375 px reading gutter. It is pointer-transparent and never overlays interactive text.
- Pattern bands: minimum 78 px desktop and 58 px phone, with a continuous top/bottom thread and 5–11 complete modules depending on width. Modules may be hidden symmetrically at narrow widths; they may not be stretched.
- Evidence apertures keep square corners. Ornament lives outside photograph/video bounds and never crosses faces, food or captions.
- Section-specific pattern assignment is mandatory: hero/cross-cell, formats/stepped-lozenge, story/cutwork-rosette, sourcing/cross-cell joins, inquiry/stepped-lozenge. Repeating one generic divider everywhere is prohibited.

## WebsiteFactory interaction amendment — approved 2026-09-01

This amendment supersedes the earlier `480–720ms` decorative image/ornament entry rule. Its source
set is the approved WebsiteFactory research recorded in
`WEBSITEFACTORY_REFERENCE_RESEARCH_2026-09-01.md`.

- First frame: the full hero title, eyebrow, portrait and all currently loaded collage cells are in
  their final visual state. No opacity, transform, stagger or delayed title/image entrance.
- Noninteractive media: no hover zoom, saturation change, press response or pointer cursor.
- Interactive color feedback: `160ms` for background/color/underline only. This is the smallest
  existing project feedback duration and is a neutral implementation value, not brand expression.
- Active press: primary inquiry links may translate down by `1px`; no spring, bounce or overshoot.
- Scroll: native anchor navigation may use `scroll-behavior: smooth`; reduced motion forces `auto`.
- Section reveal: none. Chapter boundaries are expressed by a single semantic surface change and
  one Cyprus pattern band, not by hidden content or view-timeline animation.
- Video: poster-first, muted, looped, viewport-controlled; reduced motion pauses it. There is no
  independent global pause event bus because only the story film is rendered.
- Utility type: 11 px is the minimum for eyebrow, navigation, section labels, footer links and
  action labels. Body copy keeps the existing 14–22 px content-led scale.
- Primary action: the visible outcome label is `обсудить вечер`; Instagram remains the verified
  delivery channel in the accessible name and footer evidence link. Minimum target is 44 px on
  desktop and at least 52 px on compact screens.
- Focus: the existing 2 px mineral outline plus shell separation remains mandatory and must not be
  clipped by a container. Hover never carries information unavailable to focus/touch.
- Dividers: one full-width pattern band per chapter boundary. Local pattern strips are allowed only
  when they frame a specific proof aperture or differentiate the three event stages.
- Flat surfaces: limestone and shell remain the long-copy carriers. No generic paper texture,
  generated grain, glass, gradient, shadow or decorative blur is introduced.

## Direct-reference visual reset — 2026-09-01

The user rejected the ornament-led implementation. This reset supersedes the active Cyprus textile
system as a visible interface language. Lefkaritika research and local tapestry assets remain in the
repository as design history only and are not rendered on the corrected route.

- Composition: asymmetric editorial spreads with one dominant photograph and one copy field. No
  photo wall, collage, triptych frame, overlap stack, persistent rail or repeated ornamental border.
- Surfaces: `#F4EFE5` warm paper, `#FCFAF5` light paper, `#171714` ink, `#18382F` forest,
  `#A84A2F` rust and `#706B62` muted text. Each section uses one flat surface; no texture or gradient.
- Typography: Roboto Flex remains the primary Cyrillic family. Headlines use normal width and
  controlled 520–620 weight; Literata italic is limited to one human phrase inside a display line.
  No outline type, poster compression, all-page script or 8–10 px utility labels.
- Header: 68–76 px, flat paper, one lower rule. Wordmark, three anchors and one outcome-specific
  inquiry link. It is not a colored banner or floating navigation card.
- Hero: two columns at wide widths and an authored copy → image sequence on phone. One portrait only;
  exact identity copy remains. No CTA duplication inside the hero.
- Formats: three editorial rows with different media/text proportions. Square image edges, one rule
  between rows and one quiet sequence number per real scenario; no shared outer box, icon or repeated
  card surface.
- Story: one dark content-mode change holds biography, award evidence, present-day film and workday
  facts. Media remains outside copy and captions; phone film stays 9:16.
- Product route: three chapters with a small category label, two evidence images and one existing
  statement. Categories differ by crop/proportion rather than decorative component variants.
- Inquiry: one large sentence, one full-width verified Instagram link and no illustration required
  to manufacture atmosphere.
- Motion and interaction: static content; `160ms` color/underline feedback and `1px` active press
  only. No image hover or section reveal. Focus retains the two-color ring.
- Responsive breakpoints: existing mandatory test widths govern; implementation breakpoints may be
  consolidated around 1100, 820 and 560 px after visual QA.

## User-approved collage/no-green amendment — 2026-09-01

This amendment supersedes only the reset's one-portrait hero rule and every active use of forest
green. The user explicitly keeps the collage and removes green; the clean editorial structure,
typography, content and interaction rules remain active.

- Palette: paper `#F4EFE5`, light paper `#FCFAF5`, ink `#171714`, rust `#A84A2F`, muted `#706B62`
  and rule `#C8C0B3`. There is no rendered green token or green fallback surface.
- Hero: copy remains the left field. The right field is a five-by-eight documentary grid using all
  forty approved local hero photographs, with the real apron portrait inset as a sharp identity
  anchor. The collage has no overlay tint, ornament, rail, rounded tile or hover effect.
- Dark chapters: biography, inquiry and footer use neutral ink. Kicker and quotation emphasis use
  paper, muted or rust according to contrast; photographs retain their natural color.
- Responsive: below 820 px the authored order remains copy then collage. The collage keeps a `5 / 8`
  aperture so its grid remains legible instead of becoming a generic single-column gallery.

### Hero hierarchy correction — 2026-09-01

- Desktop/tablet: the hero keeps two columns. The left column is an authored vertical sequence with
  the eyebrow/title at top and the apron portrait below; the right column is the complete collage.
- The portrait is no longer inset over documentary cells. It uses its own square-edged `4 / 5`
  aperture, aligned to the lower/right edge of the left reading field so title and person remain one
  identity chapter without obscuring any collage image.
- Below 820 px the exact semantic order is copy, portrait, collage. This is a deliberate phone route,
  not a mechanical desktop stack; portrait width and spacing are reduced independently.
- No palette, typography, header, content, interaction or post-hero rule changes with this amendment.

### Chronological story amendment — 2026-09-01

- Route after hero: MasterChef/experience chapter → present-day home-service film → three event
  formats → sourcing → inquiry. MasterChef must precede every service scenario.
- Alternation: MasterChef proof is photo left / text right; present-day chapter is text left / film
  right; formats continue photo/text, text/photo, photo/text. Alternation expresses chronology rather
  than decorative variety.
- On phone the semantic DOM order carries the same sequence: proof before biography copy, then
  present-day copy before film, followed by each format's authored media/copy order.
- Exact biography, event copy, images and film remain unchanged; no travel claim receives an invented
  or unrelated photograph.

### Cream-surface amendment — 2026-09-01

- Every page-level surface uses the existing cream pair: paper `#F4EFE5` and light paper `#FCFAF5`.
  Dark chapter backgrounds are retired; ink remains a text/border role, not a section fill.
- Story, inquiry and footer switch to ink text, muted secondary copy, rust emphasis and warm rules.
- Photograph/video fallback boxes may remain ink while media loads; they are not visible page-level
  color fields and do not tint the documentary media.
- Layout, chronology, collage, images, typography, interaction and responsive behavior stay fixed.

### Unified story-block clarification — 2026-09-01

- MasterChef, present-day home service and `Вечера бывают разные` are one semantic `story` section.
- The formats module keeps its `#menu` anchor and heading but uses a transparent nested surface with
  no independent page-level padding or background reset.
- Sequence inside the block: award/photo → biography → present-day copy → film → formats heading →
  private dinner → private event → master class.

### Mobile release amendment — 2026-09-01

- Breakpoints remain 820, 560, 430 and 390 px; required verification widths are 768, 430, 390 and
  375 px alongside desktop 1440/1280/1024.
- Header remains two-tier below 820 px. Wordmark and inquiry action do not wrap; the three anchors
  remain at least 44 px high and fit without an icon-only fallback.
- At 430 px and below the hero title/portrait interval, story chapter gaps and nested formats gaps are
  reduced independently; media order and content are unchanged.
- Phone story film remains `9 / 16`; event images remain `4 / 5`, `5 / 4`, `4 / 3`; collage remains
  `5 / 8`; sourcing image pairs remain unequal and opposing rather than becoming identical cards.
- Inquiry remains one bordered text action with both outcome and verified Instagram channel visible.

### Corrected MasterChef-to-formats sequence — 2026-09-01

- The active story order is MasterChef proof/biography → formats heading → private dinner → private
  event → master class. These elements share one semantic `story` section and one continuous paper
  surface.
- `Я — у вас дома`, the three working-day facts and the existing film move after that complete block
  into a separate `present-day` chapter. They must never interrupt MasterChef and the three formats.
- The story-to-formats boundary is an internal warm rule with bounded spacing, not a new page-level
  background or generic services wrapper. The formats keep their authored alternating media order.
- The following present-day chapter remains cream, uses the existing text-left / film-right desktop
  composition and the existing copy → 9:16 film mobile order.

### Layered collage hero amendment — 2026-09-01

- The hero uses two conceptual fields: identity copy and one layered media stage. The portrait and
  collage are no longer consecutive large blocks.
- The stage background is the existing five-by-eight grid of forty approved local photographs. Its
  two-pixel warm gutters remain visible around the foreground portrait so the images read as small
  documentary tiles.
- The apron portrait is a square-edged `4 / 5` foreground aperture, centered toward the bottom of the
  stage at approximately 56–62% of the stage width. It has no shadow, radius, generated cutout or
  decorative border.
- Desktop/tablet: copy left, layered stage right. Below 820 px: copy first, then a `5 / 8` stage with
  the smaller portrait over the collage. The portrait no longer creates an additional page-length
  media row.
- Palette, copy, typography, collage sources, portrait source and every post-hero chapter remain
  unchanged.

### Compact mobile story apertures — 2026-09-01

- Below 560 px, documentary story and event media must not become repeated full-width slabs.
- MasterChef proof: four of twelve columns for the `4 / 5` photograph and eight columns for biography
  copy, aligned side by side.
- Private dinner and master class: four-column media left and eight-column copy right. Private event
  reverses the same proportions: eight-column copy left and four-column media right.
- Existing media/copy order and crop families remain: proof → biography, photo/text, text/photo,
  photo/text. Phone type and gaps reduce independently so the eight-column copy field remains readable.
- Borders, cream surfaces, square edges, numbering, headings and all content remain unchanged.

### Headerless MasterChef-and-events sequence — 2026-09-01

- MasterChef proof/biography and the three event formats are one uninterrupted `story` block.
- They share one literal `story-sequence` container; the formats list is not wrapped in another
  visual section.
- Remove the nested `частные форматы` eyebrow, `Вечера бывают разные` heading and section-opening
  rule. Do not replace them with another label, headline, ornament or empty presentation gap.
- The biography's second paragraph already names the three formats; the next visible content is the
  first concrete format, followed by the second and third in the approved alternating order.
- Internal hairlines between the three format rows may remain as reading separators; they do not
  create a second section. `Я — у вас дома` remains the next independent chapter.

### Trivium-derived typography amendment — 2026-09-01

- Source: computed typography from [triviumadr.com](https://triviumadr.com/?rdt_cid=5516680977717612655)
  at 1280 × 720 and 390 × 844, inspected on 2026-09-01.
- Display family: `Cormorant Garamond`, locally hosted, weights 300/400/600 and italic 300/400.
  Hero: `clamp(44.8px, 6.875vw, 88px)` at 1.1 line-height, weight 300. Section headings:
  `clamp(32px, 3.75vw, 48px)` at 1.2, weight 400. Event/source headings: 20/1.3 px, weight 400.
- Text family: `Montserrat`, locally hosted, weights 300/400/500/600. Primary narrative copy:
  16/1.8 px, weight 300. Supporting descriptions and compact lists: 14/1.8 px, weight 300.
  Navigation and actions: 12/1.35 px desktop, 13.6/1.35 px phone, weights 500–600. Labels:
  11.2/1.7 px, weight 600, uppercase, `.25em` tracking.
- Italic accent: Cormorant Garamond 300 italic. Hero italic shares the hero size; callout quotations
  use 32/1.7 px desktop and 21.6/1.7 px phone, following the reference kicker role.
- Text palette on the existing cream surfaces: primary `#0A0A0A`; muted `#6E665A` (darkened from
  Trivium `#B8B0A0` for 4.94:1 contrast on `#F4EFE5`); display/accent gold `#A0792E`; small-label
  gold `#72561F`. Trivium's `#F5F0E8`, `#B8B0A0`, `#C9A84C` and `#E2C47A` remain recorded source
  colors but are not placed as small text on cream because they fail contrast.
- Backgrounds, layout, images, chronology, borders and interaction rules are not changed by this
  amendment. Do not import Trivium's dark page, logo, legal-site layout or service cards.
- Smooth scrolling matches the reference exactly through native `html { scroll-behavior: smooth; }`.
  No JavaScript inertia library or scroll hijacking is allowed. Under `prefers-reduced-motion: reduce`,
  it remains `auto`. The reference's custom dark scrollbar is outside the user's request and is not
  copied onto the cream site.

### Three-photo sourcing amendment — 2026-09-01

- The active sourcing sequence contains exactly three visible photographs of Evgen: two new
  identity-preserving generated market scenes for `Мясо` and `Рыба`, followed by the real
  user-approved grape-harvest photograph for `Овощи и фрукты`.
- The sheep landscape, market seller, meat counter, fishermen/boat catch and greenhouse are inactive
  and must not render. Each category retains its number, heading and exact first-person statement.
- All three rows use one `4 / 3` aperture. The generated market frames use `object-fit: cover` without
  additional scale because they are authored at 4:3; the real grape portrait uses `contain`, and paper
  reserve around it is acceptable so the real frame is not falsely reconstructed or cropped.
- The sequence alternates text/photo → photo/text → text/photo at desktop, tablet and phone. Below
  560 px the established 5/7 proportions and compact height remain; no image becomes a full-width slab.
- Generated market scenes are editorial illustrations, not evidence of named suppliers or visits.
  No visible disclaimer is added, but provenance and prompt details remain in project documentation.
- The meat scene shows a professionally dressed half lamb clearly but non-graphically: no head, blood,
  exposed organs or distress. Evgen is shown naturally slimmer than in the source portraits while his
  face, age and recognizable features remain stable. The fish view uses a different side/over-counter
  angle so the two generated photographs do not read as one repeated pose.

### Readability and responsive-layout amendment — 2026-09-01

- Preserve the approved narrative order: hero → MasterChef proof and biography → formats 01–03 →
  `Я — у вас дома` → personal menu and its three sourcing rows → contact.
- At 821 px and above, event media uses seven of twelve columns and copy uses at least four. Event
  rows have a maximum 72 px vertical inset; the story opening gap tops out at 104 px.
- From 561 through 820 px, do not use a full-width media/text stack. The hero media field is `8 / 5`
  with an 8 × 5 collage; MasterChef, formats, present-day and sourcing are purpose-built side-by-side
  grids using approximately `5 / 7` or its alternating reverse.
- At 560 px and below, preserve the approved event pairs. The MasterChef proof and first paragraph
  share a `4 / 8` row; the second paragraph spans the full grid beneath them. Present-day text stays
  before the `9 / 16` film.
- At 400 px and below, the header contracts rather than clipping: 18 px wordmark, 11.2 px action,
  `.08em` action tracking and 10–12 px horizontal padding. The decorative arrow may be omitted below
  381 px; the accessible action label remains complete.
- Event supporting copy is 15 px with a 1.7 line-height. Sourcing statements retain the approved
  21.6–32 px scale but use a denser 1.4 line-height.
- Sourcing media remains uncropped with `contain`; the aperture is `4 / 3`, capped at 640 px wide on
  large screens, and uses `--paper` as its reserve color. The second row mirrors the 5/7 relationship.
- Documentary image fallbacks use the surrounding cream surface. Do not show black empty fields,
  shimmering skeletons or decorative generated placeholders.

### Compact paired-reading amendment — 2026-09-01

- Active references, three per concern: paired blocks use
  [Clare Smyth biography](https://www.claresmyth.com/biography),
  [Mugaritz](https://www.mugaritz.com/en/) and [Noma](https://noma.dk/); typography uses
  [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655),
  [Nobelhart & Schmutzig](https://nobelhartundschmutzig.com/en/) and
  [Atelier Crenn](https://www.ateliercrenn.com/); compact vertical rhythm uses Noma, Mugaritz and
  Clare Smyth. These references contribute only the documented principles, never brand identity or
  complete compositions.
- A mobile content unit is one image/text pair. The text may be beside its image; when available width
  no longer supports that relationship, it sits immediately before or after the image with no
  intervening section title, spacer or unrelated content. Horizontal content rails are forbidden.
- Mobile navigation must fit its row. `overflow-x: auto`, scroll snapping, drag affordances and
  sideways navigation gestures are forbidden for the active page.
- The phone body remains Montserrat at 15–16 px with 1.6–1.7 leading. Cormorant Garamond remains the
  display and italic accent face. No third typeface, decorative script or lighter low-contrast body is
  introduced.
- The hero keeps copy above the layered collage and apron portrait, but the portrait must visibly enter
  a 390 × 844 first viewport. The unchanged approved image, five-by-eight collage, cream fallback and
  square aperture remain.
- MasterChef and each event format retain the 4/8 alternating pair. Media height must visually support
  the adjacent copy; formats 02/03 must not collapse to thumbnail strips. The second biography
  paragraph follows directly beneath the proof/copy row and belongs to the same block.
- Repeated phone section insets use a compact editorial range rather than 64–88 px landing-page gaps.
  Hairlines remain the only structural separators. Present-day text remains immediately before its
  9:16 film; sourcing text remains directly connected to its one retained image.
- Existing desktop/tablet paired layouts, cream palette, single Instagram path, smooth native vertical
  scrolling and reduced-motion fallback remain authoritative.

### Mobile full-measure reading amendment — 2026-09-01

- The latest supplied production captures supersede the rule that a complete format description must
  remain inside the narrow column beside its photograph.
- At 560 px and below, each event row has two reading beats inside the same list item: photograph plus
  number/title in the first grid row, then the existing description immediately beneath them across
  all twelve columns. This is still one image/text unit and must not be split by a section label,
  decorative gap, card surface or unrelated content.
- Preserve alternation: rows 01 and 03 place the photograph left and heading right; row 02 places the
  heading left and photograph right. Images remain small and retain the established 144–168 px height.
- Phone event headings use the existing Cormorant Garamond 600 weight; event descriptions and both
  MasterChef paragraphs use Montserrat 400 and existing `--ink`. This phone-only strengthening
  replaces the unsuccessful 300/muted treatment without introducing another font or color token.
- MasterChef retains the approved small proof/opening relationship but does not hold the complete
  paragraph inside a rigid eight-column tower. The proof floats left so the opening begins beside it
  and continues below on the full measure; the transition paragraph follows normally. Content, image,
  order and the relationship to formats 01–03 do not change.
- Tablet and desktop paired grids, all section surfaces and the following `Я — у вас дома` chapter
  remain unchanged.

### Compact mobile sourcing amendment — 2026-09-01

- The latest supplied production capture supersedes the earlier phone rule that stacked a complete
  `4 / 3` sourcing aperture below each short statement at full content width.
- At 560 px and below, rows one and three use `5fr / 7fr` text/media and row two mirrors it as
  `7fr / 5fr` media/text. A 16 px gap and vertically centered content keep all three compact. This
  latest user-requested livelier rhythm supersedes the prior temporary no-alternation rule.
- Inside the text field, the existing number and category share a `30px / 1fr` first line; the existing
  statement spans that complete text field immediately below. Row inset is 26 px.
- Phone statements use the existing Cormorant Garamond italic family at `clamp(18px, 4.8vw, 20px)` /
  1.35 and the established contrast-safe `--accent-small`. No new color or typeface is introduced.
- The media field remains `4 / 3` with `object-fit: contain` and `--paper` reserve. All three sources
  must remain complete, in order and square-edged.
- Desktop and tablet use the same alternating 5/7 rhythm and complete-frame image treatment. The
  section introduction, copy, chronology and following contact chapter do not change.

## Exact Trivium dark override — 2026-09-01

Historical status: **superseded for color by the user's next correction; typography measurements remain active**.

The user's side-by-side screenshots and correction `Справа шрифт и цвета который ты
должен быть применить, а слева то, что ты сделал` explicitly supersede the earlier
cream adaptation. Live Trivium computed styles at 1280 × 720 and 390 × 844 are the numerical
source of truth.

- Exact Trivium variables are `--black: #0A0A0A`, `--black-soft: #111111`,
  `--black-border: #2A2A2A`, `--white: #F5F0E8`, `--white-muted: #B8B0A0`,
  `--gold: #C9A84C`, `--gold-dark: #A0792E` and `--gold-light: #E2C47A`.
- The project maps those roles one-to-one onto `--paper`, `--paper-light`, `--rule`, `--ink`,
  `--muted`, `--accent-small`, `--accent-deep` and `--accent` respectively. No cream translation or
  extra brand color remains.
- Page sections alternate only `#0A0A0A` and `#111111`. Images retain their natural color and square
  edges. Empty image reserve uses `#0A0A0A`, including the side reserve around the real grape portrait.
- Cormorant Garamond and Montserrat are already the exact referenced families; no replacement font is
  added. Mobile overrides may change geometry, never the 300/400 weight hierarchy or semantic colors.
- Primary inquiry action uses flat `#C9A84C` with `#0A0A0A` text, directly following the reference's
  gold-action role without copying its legal-site label, gradient, dimensions or layout.
- Header, Footer, hero, story, formats, present-day, sourcing and inquiry all use the same dark role
  system. The favicon is recolored to black/gold/warm-white for consistency.
- Focus remains a two-color ring: light-gold outline against the dark field. Native smooth scrolling
  and reduced-motion behavior are unchanged.

## Cream palette restoration; Trivium typography only — 2026-09-01

The user's correction `Вместо того что бы изменить шрифты ты цвет сайта поменял` makes the scope
unambiguous: the last approved cream release is the color source of truth, while Trivium supplies only
font families, sizes, weights, leading, tracking and scroll behavior.

- Restore `#F4EFE5`, `#FCFAF5`, `#0A0A0A`, `#6E665A`, `#A0792E`, `#72561F` and `#C8C0B3` to their
  previous semantic roles.
- Restore the previous transparent inquiry action, cream/ivory header and footer, light media reserve
  and the pre-dark favicon. Do not retain a black page field or gold-filled CTA.
- Small interactive text and indices use the existing darker `--accent-small` role so the restored
  cream palette remains AA-readable; this does not introduce a new color.
- Keep the measured Cormorant Garamond/Montserrat type scale, weights and mobile hierarchy.
- Keep the existing smooth-scroll and reduced-motion rules, balanced hero-eyebrow wrapping, layout,
  content, imagery and interaction destinations unchanged.

## Typographic completion — 2026-09-01

Cormorant Garamond and Montserrat were already installed before the user's Trivium request. Therefore
an honest implementation cannot claim a family replacement. The visible typography change is the full
set of measured numeric roles: hero `clamp(44.8px, 7vw, 88px)`, section headings
`clamp(32px, 4vw, 48px)`, Montserrat narrative 16/1.7, supporting facts 13.6/1.7, desktop header action
11.2/.14em, primary action 12/1.7, desktop footer wordmark 24/1.1 and contact link 14.72/1.7.
Phone-specific reductions below 400 px remain only where the Russian label otherwise cannot fit.

## Header simplification and title entry — 2026-09-02

- The header retains exactly two visible elements: the `Evgen Grybenyk` wordmark and the existing
  `обсудить вечер` Instagram action.
- The `о шефе`, `форматы` and `продукты` header row is absent on desktop, tablet and phone. It leaves
  no empty second-row height, border or horizontal-scroll container.
- The hero has no winner eyebrow. The unchanged `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре`
  title begins at the hero's normal content inset without a reserved eyebrow margin.
- The footer does not repeat the three removed navigation labels; its `контакты`, wordmark and
  Instagram destination remain.
- Cream palette, Cormorant Garamond/Montserrat roles, collage, portrait, MasterChef biography,
  event-format rows, present-day film, sourcing evidence, contact block and native smooth scrolling
  remain unchanged.
- No substitute menu, hamburger, icon, badge, CTA, decorative mark or new component is introduced.

## Mobile Hero title density — 2026-09-02

- At 560 px and below, the Hero title keeps Cormorant Garamond 300, the existing ink/gold roles and
  the authored title sequence; only its phone scale and leading become denser.
- The fluid phone scale is `clamp(38px, calc(1rem + 5.75vw), 44px)` with `1.05` leading. This yields
  approximately 38 px at 375, 38.4 px at 390 and 40.7 px at 430, then reconnects to 44 px before the
  561 px tablet boundary.
- At 430 px and below the title measure is capped at 340 px so the reference's final `Кипре` line
  remains an intentional fifth beat after the type reduction.
- Desktop and tablet Hero typography, copy padding, header, collage stage, chef portrait, all later
  sections and content remain unchanged.
- No new component, breakpoint-only copy, hidden word, horizontal rail or viewport-height lock is used.

## Mobile media-scale and density amendment — 2026-09-02

- At 560 px and below the `Я — у вас дома` pair uses a five-column copy rail and seven-column film
  rail with a 10 px gutter. The film remains vertical `9 / 16`, uses the existing poster/video and is
  neither full width nor full screen. Time labels become block labels above their unchanged text so
  the narrower copy rail stays readable at 375 px.
- The phone present-day inset is content-led (`34px 18px 30px`); the heading remains Cormorant
  Garamond and the timeline remains Montserrat at no less than 13.6 px.
- The phone personal-menu introduction uses the same twelve-column system: kicker spans the row,
  heading occupies columns 1–7 and lede columns 8–12. It introduces no image or ornament of its own;
  the first approved sourcing row follows after a 16 px interval.
- The final inquiry again renders `chef-story-brush-villa.png` as a complete `contain`-fitted 3:2
  canvas. Above 1024 px it may occupy the section field behind text placed only in its authored blank
  reserve. At 1024 px and below it is a separate figure between heading and action. The illustration
  suggests atmosphere only and is not presented as a real venue.
- On phones the contact uses 34 px top, 24 px bottom and compact 12–16 px internal intervals; its
  action remains full width, square-edged and at least 64 px high. The section uses the existing
  `--paper` cream so the complete illustration canvas joins the field without a pale rectangular seam.
- The phone footer uses two columns after a full-width identity row. Both utility destinations retain
  minimum 44 px targets; outer padding is 16–20 px so the footer does not read as another section.

No card, radius, shadow, gradient, texture, stock photograph, additional sourcing image, decorative
filler, new copy or unverified contact channel is authorized by this amendment.

## Exact Trivium webfont binaries — 2026-09-02

- Source of truth is the font request embedded in the live Trivium page:
  `Cormorant Garamond: 300, 400, 600, 700, italic 300/400` and
  `Montserrat: 300, 400, 500, 600`, served by Google Fonts with `font-display: swap`.
- The site self-hosts all 15 exact current WOFF2 bytes from that request, not TTF files with matching
  family metadata. The complete five-subset delivery is Cyrillic-ext, Cyrillic, Vietnamese,
  Latin-ext and Latin:
  - Cormorant Garamond v21 Cyrillic-ext normal: `d04439363ec805132dc6c6e6a925f76efe17646f9811af8e10e218ea3dba5335`;
  - Cormorant Garamond v21 Cyrillic normal: `d81372bae1f872f1418c0b7eb412f8a92a156a950fda8d2383701c75d38969df`;
  - Cormorant Garamond v21 Vietnamese normal: `826f73ca737feec0eb1004808629973d6b611fddc2bd2a689b5fe331f6be6427`;
  - Cormorant Garamond v21 Latin-ext normal: `9dc38267bdee93a653200ef3c1e8060e3f1399073432c415c683b419d3b50464`;
  - Cormorant Garamond v21 Latin normal: `5d618c462b7a5b74f442e1548880086af71764d9cc7d35c16ab45353da934621`;
  - Cormorant Garamond v21 Cyrillic-ext italic: `919a7720ae1671f06ebdd4f65bb9c2f0d619f81f805d85aec025c89139536292`;
  - Cormorant Garamond v21 Cyrillic italic: `3170a883f1968a2d1135259e40fd88508da70c20337e491f171f9405d0749053`;
  - Cormorant Garamond v21 Vietnamese italic: `3512ad3b4ddd21fa75ab44296867da1f82948350ffba678a04afbb511015cb08`;
  - Cormorant Garamond v21 Latin-ext italic: `06bc9a8c179afaf7dd5d3b4987ad2f4a82ca85a542c9e498b18bf32ad0257d8e`;
  - Cormorant Garamond v21 Latin italic: `e6d6d1d73858aa9b66f3a3539f9dec22faab2276e61ad1d813bc04dd59c9c122`;
  - Montserrat v31 Cyrillic-ext normal: `744830a0e77dd14dd543a4230d6e3ce67ca961634074b5d536ebafc66c732301`;
  - Montserrat v31 Cyrillic normal: `0b00fbd6edcc84cd5f77364bbeb06b75ed263c740061eba34511f1e2ac1a82d3`;
  - Montserrat v31 Vietnamese normal: `9e2672d100bc36a37073fb250abfaa7394f5151bf5dda3f4d5fc281345eb391b`;
  - Montserrat v31 Latin-ext normal: `920711de9ae96c18970fa4faca73cd302b93ac5ed57ebeb6bfec2ddeff930082`;
  - Montserrat v31 Latin normal: `6438d7b8ea9c7c3992d5e2fd2afdb1ff948570a3ef0bedae76247b51632960ba`.
- All five unicode ranges are copied from the live `fonts.googleapis.com` CSS. The browser therefore
  selects the same release-specific `fonts.gstatic.com` binary for every supported glyph run.
- Separate `@font-face` rules retain the reference weight mapping even when several weights share one
  variable WOFF2 binary. Real italic binaries are mandatory; synthetic bold/italic remains disabled.
- `text-rendering: auto` also matches the measured Trivium computed value; `font-synthesis: none`
  continues to prevent synthetic styles. No remote font dependency is added at runtime. Palette,
  type sizes, line-height, letter-spacing,
  compact phone Hero, layout, media and content remain governed by their latest approved rules.

## Denser Hero collage — 2026-09-02

- The foreground `chef-hero-apron.jpg` identity layer is immutable for this correction: its source,
  `4 / 5` aperture, crop, width, position, caption, priority and responsive overrides remain exactly
  as approved.
- The background collage uses 104 existing local documentary photographs. It exposes 80 photographs
  at wide desktop (8 × 10), 77 at compact desktop from 821–1100 px (7 × 11), 96 at tablet from
  561–820 px (12 × 8), and all 104 on phone (8 × 13).
- These grids track the existing stage ratios so the smaller cells stay visually square without
  changing Hero height, stage aspect ratios or text geometry. Existing 2 px rules, square edges,
  `object-fit: cover`, restrained saturation/contrast and paper reserves remain.
- The first eighty tiles load eagerly so every photograph intersecting the initial Hero paints without
  blank grid cells; only the first twelve receive high fetch priority. Tiles 81–104 remain lazy/low
  priority and all tiles retain responsive image sizing. No remote image, generated photograph,
  carousel, animation, overlay or new component is introduced.

## Hero collage 94-photo packing amendment — 2026-09-02

- The user's current phone capture and exact ten-photo reduction supersede only the 104-photo count
  and the 8 × 13 phone matrix above. The active background pool contains exactly 94 local sources.
- Wide desktop continues to expose the first 80 sources in 8 × 10; compact desktop continues to
  expose the first 77 in 7 × 11. Those approved stage proportions do not change.
- Tablet retains a 12 × 8 field of equal cells. Two unused row-five cells sit completely beneath the
  opaque foreground portrait, while every exposed cell through the final row contains photography.
- Phone uses an 8 × 12 field of equal near-square cells. Two unused row-seven cells sit completely
  beneath the opaque foreground portrait, while every exposed cell through the final row contains
  photography. No cream reserve is visible around or below the portrait.
- All 94 retained Hero backgrounds use eager loading with low priority after the first twelve. This
  keeps the complete mobile field requested on a fresh load; synchronous image decoding prevents a
  completed image from remaining as a cream-looking unpainted tile. Responsive `sizes` continue to
  bound the requested derivatives.
- The foreground `chef-hero-apron.jpg` source, 4:5 aperture, crop, size, position, caption, preload,
  priority and every breakpoint override remain unchanged.

## Mobile story-pair repair — 2026-09-02

- The user's latest three phone captures supersede the `Mobile full-measure reading amendment` only
  where that amendment moved event descriptions across all twelve columns or allowed MasterChef copy
  to wrap beneath a floated proof photograph.
- At 560 px and below, MasterChef uses a deliberate 4/8 side-by-side grid. The small proof photograph
  occupies four columns; one intact copy container occupies eight columns and contains both unchanged
  biography paragraphs. No paragraph escapes beneath the photograph as an independent full-width
  beat.
- Every event format is one side-by-side row. Rows 01 and 03 keep photo left / copy right; row 02 keeps
  copy left / photo right. The copy container remains present in layout and contains the number,
  heading and complete existing description in normal document flow.
- Phone event descriptions use the exact Montserrat face already approved, at a compact 13.6 px with
  1.55 leading. Headings remain Cormorant Garamond 400 at 20 px; numbers remain restrained Cormorant
  labels. These values keep the complete copy adjacent without changing wording or creating a card.
- Event photographs remain small, square-edged and meaning-specific. Their phone aperture is
  `clamp(164px, 46vw, 184px)` high; crops continue to protect the chef, cooking action and teaching
  interaction.
- Hairlines, cream surfaces, chronology, desktop/tablet grids and the following `Я — у вас дома`
  chapter remain unchanged. No radius, shadow, icon, animation, horizontal scroll or new component is
  introduced.

## Mise en place blueprint review system — 2026-09-02

Scope: this amendment is active only on `codex/mise-en-place-blueprint` and supersedes earlier
comparison-only status for direction 04. For this branch it also supersedes the historical
desktop/tablet `4 / 3` film geometry: the film is the approved portrait `9 / 16` at all widths. It
extends the latest approved cream release; it does not replace the existing brand, Hero, content or
closing villa.

### Fixed foundations

- Palette remains exactly `--paper: #F4EFE5`, `--paper-light: #FCFAF5`, `--ink: #0A0A0A`,
  `--accent: #A0792E`, `--accent-small: #72561F`, `--muted: #6E665A` and `--rule: #C8C0B3`.
  Blueprint drawings use these roles with opacity, never a new technical blue, green or copper token.
- Typography remains the exact self-hosted Cormorant Garamond v21 and Montserrat v31 binaries and the
  active measured hierarchy. Drawing labels may reuse current Montserrat utility roles; no handwritten
  mockup face or third font is introduced.
- Existing `--content: 1440px`, fluid gutter, twelve-column content logic, square media apertures,
  one-pixel structural rules and 160 ms interaction feedback remain.
- Generic border radius, shadows, gradients, glass, paper texture, decorative blur, hover motion,
  scroll reveal, parallax and continuous drawing animation remain absent. The reference-supported
  circular menu-dish crop is the only radius; the focus ring is the only shadow.

### Blueprint drawing grammar

- Authoritative text remains selectable semantic HTML. Raster drawings are decorative CSS backgrounds
  and remain absent from the accessibility tree; the related HTML copy and media retain their existing
  semantics.
- Primary contours use 1–1.4 px `--ink` strokes at restrained opacity. Ordered nodes and the decisive
  route segment use `--accent-small`; secondary circles, centre lines and leaders use `--rule`.
- Construction lines may use a sparse dash cadence, but registration marks, ticks and crosshairs occur
  only where they clarify alignment. No numerical scale, unit, coordinate, time or specification text
  is rendered.
- One process graphic belongs to one chapter: preparation sequence for formats, workday trajectory,
  plate construction for the menu introduction and ordered contour/spine for sourcing. The same motif
  is not tiled or repeated as wallpaper.
- Culinary contours are deliberately schematic: knife, cut intervals, serving/plate, open meat portion,
  fish silhouette and produce/field forms. They communicate sequence/category only and make no anatomy,
  recipe, supplier or measurement claim.

### Chapter composition

- Header/Hero are immutable for this variant: the two header items, exact title, 94-photo collage,
  foreground apron portrait and all active responsive packing rules remain.
- MasterChef proof and exact biography remain one pair. A single horizontal preparation figure creates
  the transition into the three formats without entering the photograph or becoming a fourth format.
- Format rows keep their three exact scenarios, media and copy, but receive unequal drawing reserves and
  one shared knife → cutting → serving route. Alternation remains content-led; no repeated outer box is
  allowed.
- Workday keeps the exact HTML order `утро`, `день`, `вечер`. At wide widths an open double arc aligns
  one node to each list row between copy and portrait film. At phone widths it becomes one vertical
  line with three large nodes between a six-column copy rail and a five-column 9:16 film.
- Personal-menu introduction uses one concentric plate plan around the existing approved
  `gallery-dish.webp`. The circular crop is defined by the raster plate geometry rather than a generic
  rounded surface. Its three leaders may repeat only words already present in the exact lede:
  `любимые вкусы`, `ограничения`, `персональное меню`.
- Sourcing preserves the exact order, statements and approved media. Wide layouts allocate a distinct
  reserve for one contour study per row and connect rows through a single ordered spine. On phones the
  detailed studies disappear, while existing numbers become the three large route nodes and every
  photograph stays beside its text.
- Inquiry preserves the complete 1536 × 1024 villa and exact Instagram action. Footer content and
  compact phone grouping remain unchanged.

### Responsive and accessibility rules

- Active implementation breakpoints remain 1100, 1024, 820, 560, 430, 400 and 380 px. Mandatory visual
  verification remains 1440, 1280, 1024, 768, 430, 390 and 375 px.
- At 820 px and below, preparation/plate drawings lose secondary leaders and crosshairs. At 560 px and
  below, workday and sourcing retain only major route nodes; detailed culinary contours never create a
  standalone tall mobile panel.
- Film captioning, poster-first playback, reduced-motion pause, semantic headings/lists, meaningful image
  alternatives, skip link, 44 px targets and two-color focus treatment remain mandatory.
- Loading fallbacks use the surrounding cream. Diagrams must not cover faces, food, video captions,
  links or authoritative copy. No horizontal overflow or horizontal navigation is allowed.

Exact drawing geometry and local gaps are neutral fitting decisions to be recorded after seven-width
QA. Undecided business facts remain undecided: timing, temperature, distance, supplier identity,
pricing, travel radius, dietary claims and any contact route beyond Instagram.

## Rejected exploration: raster blueprint background amendment — 2026-09-02

The three-sheet ImageGen direction below is retained only as decision history. The user rejected it;
the later exact-mockup correction and final raster blueprint system supersede every asset and placement
described in this subsection.

- The user's direct request replaces the visible preparation, workday, plate and source SVG drawings
  with three original raster sheets generated from the selected blueprint's principles. Functional
  geometry stays in CSS/HTML; the new artwork is decorative and never carries copy or data.
- Assets are `preparation-sheet.webp`, `workday-trajectory-sheet.webp` and
  `menu-sourcing-sheet.webp` under `public/media/blueprint-backgrounds/`. Each source master is
  1536 × 1024 and converted to WebP for delivery; generated originals remain outside the checkout.
- Backgrounds are mounted through section-owned CSS pseudo-elements with `pointer-events: none`; live
  section content establishes a higher stacking context.
- Desktop uses the complete asymmetric sheet wherever the chapter geometry permits. Tablet and phone
  use deliberate crop/position changes; phone opacity is reduced so artwork does not compete with
  adjacent text/photo pairs. A background may disappear only if a required 44 px target, readable text
  or documentary subject cannot otherwise be preserved.
- The generated paper tone must visually merge with `--paper` / `--paper-light`; no hard image frame,
  radius, shadow, gradient, blend-mode gimmick or repeated tile is allowed. Foreground documentary
  photographs retain square edges and normal contrast.
- The raster sheets contain no authoritative text, unit, time, supplier or claim. Exact copy remains
  selectable HTML, and existing project photographs/film remain evidence. The generated chef in the
  workday sheet is an illustrative figure, not a portrait or identity claim.
- Neutral fitting values still to be confirmed by required-width QA are per-section opacity,
  background position and background-size. They may be adjusted only to protect the established
  hierarchy, not to introduce a new style.

### Per-block image rule

- Every semantic block has its own image identity: existing Hero collage; new MasterChef origin sheet;
  three distinct format sheets; workday sheet; menu sheet; separate meat, fish and produce sheets; and
  the existing complete villa for inquiry.
- A generated sheet is never reused across two blocks. The shared palette and graphite/ink/brass
  medium create continuity while subject, path geometry, scale and crop remain block-specific.
- Generated sheets remain background atmosphere. Documentary photographs, exact HTML copy, controls
  and focus states always sit above them and keep their current contrast.
- Original project copy and documentary photographs are immutable in this change. Background assets
  must contain an intelligible schematic relationship—sequence, route, alignment, cut construction or
  component logic—and may not collapse into a merely decorative food illustration.

### Exact-mockup correction

- The free-form generated sheets are rejected and may not ship. Background diagrams are redrawn from
  the user-supplied original mockup's geometry and annotation system.
- Workday uses the original semicircle, three time anchors and sun/moon marks; menu uses its concentric
  plate and three diameter callouts; meat/fish use culinary section sequences and a `0 / 10 / 20 cm`
  scale; produce uses separate ingredient studies plus the four-part sensory component diagram.
- These measurements are approved visual/specification content from the user's own supplied mockup,
  not model-invented business facts. No additional values, suppliers, timing or claims may be added.
- The redrawn diagrams are exported as raster assets and mounted as background layers. Exact HTML and
  all original documentary photographs remain foreground content.
- Final delivery is raster-only: WebP `background-image` assets. No SVG diagram remains in the route,
  stylesheet or project asset tree.

### Final raster blueprint system

This section supersedes the earlier SVG and three-sheet exploration.

- The production set is exactly six transparent WebP files: `workday-plan.webp` (1387 × 2027),
  `menu-plate-plan.webp` (2027 × 1627), `meat-cut-plan.webp` (1920 × 693),
  `fish-cut-plan.webp` (1920 × 693), `produce-balance-plan.webp` (1920 × 693) and
  `contact-spoon-plan.webp` (1920 × 800).
- Drawings are mounted only on `::before` layers with `pointer-events: none`; live text, images, film
  and links always occupy the higher stacking layer. The original menu dish is a separate foreground
  image and the only reference-supported circular crop.
- Wide workday uses the vertical arc between copy and film. Wide/tablet menu and sourcing use the
  reference's copy/photo/drawing three-field rhythm. The contact spoon sits above the complete villa
  without replacing it.
- At 560 px and below, workday has a 390 px-tall centred background reserve after the copy/photo pair;
  menu has a full uncropped `contain` plan below its copy; each source row reserves 132 px for its
  background study; inquiry reserves 150 px for the full spoon before the villa. These are deliberate
  mobile compositions, not stacked desktop diagrams.
- Approved drawing data is limited to the supplied reference: `06:00 / 12:00 / 18:00`,
  `Ø 280 / Ø 180 / Ø 60`, `0 / 10 / 20 cm`, the existing annotation phrases and the four produce
  components. No other measurement, ingredient claim, supplier, temperature, weight or timing may be
  introduced.
- Backgrounds never tile, animate, receive filters, shadows, gradients or blend-mode effects. Paper
  transparency allows the existing `--paper` and `--paper-light` fields to remain authoritative.

## Approved per-block raster previews — 2026-09-02

This amendment supersedes the earlier rule that withheld new drawings from MasterChef and event
formats. The user reconfirmed the supplied `04-mise-en-place-blueprint.png` as the visual source and
explicitly requested a different raster drawing for every content block, with approval one block at a
time. Only drawings explicitly approved in chat may enter the review page.

- Approved for the current partial review: `masterchef-recipes-europe.png`,
  `private-dinner-seven-course.png` and `private-event-canape-studies.png`.
- The MasterChef drawing uses recipe sheets and an unlabeled Europe/Mediterranean route; the private
  dinner drawing uses a six-place table and seven-course sequence; the private-event drawing uses a
  canapé tray and three exploded assembly studies. Each subject is unique and appears once.
- These are ordinary raster `<img>` elements, not SVG, inline vectors, pseudo-elements or repeated CSS
  backgrounds. They are decorative companions to authoritative HTML and therefore use empty
  alternatives while the original photographs, headings and copy remain unchanged.
- Wide format rows use the selected mockup's three-field rhythm: photograph, copy and one complete 2:1
  drawing share the row, with the second row reversing direction. The MasterChef sheet follows its
  proof/copy pair as a wide transition. Tablet and phone layouts move each complete sheet beneath its
  related pair at natural 2:1 ratio instead of cropping or horizontally scrolling it.
- The approved warm ivory, graphite/charcoal and muted-brass image language remains fixed. No frame,
  radius, shadow, filter, gradient, blend mode, animation, generated wording or new business claim is
  added.
- Masterclass and all later blocks remain unchanged until their own drawings are shown and approved.
  Rejected generation attempts are not copied into the project and may not appear in the review build.

## Process blueprint + documentary foreground system — 2026-09-02

This section supersedes the detached 2:1 drawing-sheet placement. A blueprint is now a causal process
layer belonging to the same visual object as its photograph or film.

### Meaning grammar

- Every blueprint describes one process with three to seven states: input → transformation → check or
  handoff → result. A drawing that only depicts a dish, table, ingredient, map or utensil is incomplete.
- One muted-brass line with an arrow is the primary route. Thin solid graphite defines construction
  and components; graphite dash defines preparation, hidden dependency or an alternate branch.
- A filled graphite dot is an input, an empty ring is a stage, a double ring is a check/handoff and a
  target is the final outcome. Axes, ticks, section cuts and dimension leaders appear only where they
  express an actual decision.
- Generated background rasters contain no readable typography. Copy, names, claims, timings and
  accessibility meaning remain in HTML.

### Layer order and overlap

1. Existing cream section surface.
2. Unique raster blueprint, square-edged and unfiltered, at `z-index: 0`.
3. Existing documentary photograph or film at `z-index: 1`.
4. Existing live heading, body copy and actions at `z-index: 2` or higher.

- The photo covers approximately 55–60% of its blueprint canvas. Its top and side placement may vary
  with the block, but the blueprint remains visibly active on at least two sides.
- The raster canvas must extend 10–15% of its height below the photo. A meaningful part of the route,
  not empty paper, occupies this lower strip so the real scene reads as the result of the plan.
- Critical nodes stay outside the photo safe zone. The main route may disappear behind the photo and
  re-emerge, but its order must remain inferable.
- Blueprints are backgrounds of their media compositions, never separate third-column illustrations
  or full-width sheets beneath unrelated content.

### Responsive contract

- Wide layout uses an asymmetrical media/blueprint composition beside its copy; alternating sections
  may mirror the media field while preserving process direction.
- Tablet retains the overlap and lower exposed strip; media may cover less of the raster when labels
  and process nodes need room.
- Phone receives a deliberately recomposed arrangement, not a scaled desktop sheet. The exact photo
  cover ratio, vertical safe zone and whether each final asset needs a dedicated phone raster remain
  undecided until the private-dinner prototype is approved at 430, 390 and 375 px.
- No crop may hide the input, the check/handoff and the final node simultaneously. No horizontal scroll,
  card frame, rounded mask, shadow, blend mode, decorative animation or pseudo-vector substitute.

The first validation target is the private-dinner process. It must visibly connect the guest brief,
menu choice, parallel preparation, seven-course service rhythm and shared-table outcome while the
original cooking photograph remains untouched in the foreground.
