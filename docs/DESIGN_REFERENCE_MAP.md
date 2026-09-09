# Design Reference Map

Status: **Mobile MasterChef and event pairs repaired; exact Trivium fonts, cream interface and Hero retained**

## Compact paired-reading reference map — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Photo + text blocks | [Clare Smyth biography](https://www.claresmyth.com/biography); [Mugaritz](https://www.mugaritz.com/en/); [Noma](https://noma.dk/) | Treat each documentary image and its explanation as one local editorial chapter; the reader should see the relationship without crossing an empty screen | Brand marks, full-screen openings, galleries, drag navigation, restaurant menus or pixel geometry | MasterChef and each of the three formats remain paired at every width; sourcing copy stays beside its image on tablet/desktop and immediately before it on phones |
| Readable type | [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655); [Nobelhart & Schmutzig](https://nobelhartundschmutzig.com/en/); [Atelier Crenn](https://www.ateliercrenn.com/) | A restrained serif display face carries hierarchy while a neutral sans-serif carries continuous reading; body measure and leading matter more than decorative scale | Dark palettes, brand fonts, logos, reservation widgets, legal-site composition or restaurant navigation | Keep the approved local Cormorant Garamond/Montserrat pair; stabilize phone body at 15–16 px, 1.6–1.7 leading and short adjacent columns; use gold only for existing accents |
| Vertical rhythm | [Noma](https://noma.dk/); [Mugaritz](https://www.mugaritz.com/en/); [Clare Smyth biography](https://www.claresmyth.com/biography) | Related narrative beats follow one another with deliberate but compact intervals so the next image or paragraph appears before the previous idea loses context | Full-viewport hero treatment, cookie layers, carousels, parallax, drag interaction or animated spectacle | Reduce phone hero/story/present/source/contact intervals; keep hairlines as the only separators and ensure no section opens with an empty screen |
| Mobile navigation and scroll | User's exact prohibition of horizontal scrolling; existing native-scroll rule; [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655) | Native vertical scrolling with restrained feedback; all navigation remains visible without a sideways gesture | JavaScript inertia, scroll hijacking, custom scrollbar, marquee or horizontal content rail | Remove `overflow-x: auto` from the mobile navigation; keep native `scroll-behavior: smooth` and reduced-motion fallback |
| Hero first viewport | User's approved title-above / apron-below / collage-behind composition and direct request to execute the previous audit recommendation; [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655); [Noma](https://noma.dk/) | The identity image must enter the first phone viewport instead of beginning after a complete text-only screen | Full-bleed restaurant hero, image overlay text, new crop, new photograph or hidden collage | Reduce phone copy/stage depth and lift the unchanged apron aperture while preserving title first and collage background |
| MasterChef proof | User's one-block chronology and previous mobile audit; [Clare Smyth biography](https://www.claresmyth.com/biography); [Atelier Crenn](https://www.ateliercrenn.com/); [Mugaritz](https://www.mugaritz.com/en/) | Award proof and biography must read as a single evidence pair with comparable visual duration | CV timeline, badge, trophy icon, card, invented award object or separate awards section | Retain the 4/8 row but increase the proof aperture so it supports the full first paragraph; second paragraph follows immediately below |
| Event formats | User's exact photo/text alternating instruction; [Noma](https://noma.dk/); [Mugaritz](https://www.mugaritz.com/en/); [Clare Smyth biography](https://www.claresmyth.com/biography) | Each service is one image-and-copy unit; alternating direction supplies rhythm without a carousel | Equal cards, horizontal slider, separate service pages, generic icons, large empty section headers or tiny thumbnails | Keep 01 photo/text, 02 text/photo, 03 photo/text; give all three mobile photographs a consistent readable height and compact row inset |

Last audit: 2026-09-02

This file records only the active interface. Superseded proposals and implementation history remain in [`DESIGN_AUDIT.md`](./DESIGN_AUDIT.md); they are not active references.

## Comparison-only unification study — 2026-08-31

The user requested five separate views of the same site, each consistently using one of the visual languages already present in the active project. These mockups are decision aids only and do not supersede the active interface or authorize route/style changes.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Unified documentary-mosaic concept | Active light hero and [`hero-1440.png`](../artifacts/hero-light-implementation/hero-1440.png) | Irregular documentary apertures, one sharp identity anchor, warm paper veil and copy integrated with photographic evidence | Old hero copy/actions, source chrome, uniform bento grid, external brand or generated replacement chef | Apply the mosaic/evidence rhythm to the same biography, sourcing, formats and inquiry sequence in comparison board 01 only |
| Unified editorial-biography concept | Active chef-story rows and [`desktop-preview.png`](../design/mockups/chef-story-editorial-spread-2026-08-30/desktop-preview.png) | Asymmetric magazine spreads, quiet paper, large serif hierarchy, hairline rules and one dominant image per reading movement | Superseded biography, caption bar, numbered filler, another publication's masthead or template | Recompose the same page content as a continuous editorial feature in comparison board 02 only |
| Unified Cyprus-tapestry concept | Active local tapestry assets and [`chef-story-ornament-variant-05.png`](../design/mockups/chef-story-ornament-variant-05.png) | Botanical/Lefkara painting becomes a structural identity field, not a generic decorative icon | New folk symbols, dense wallpaper, unrelated Mediterranean clichés or stock ornament | Use the approved local olive/citrus/diamond language as restrained dividers and media fields in comparison board 03 only |
| Unified product-route concept | Active sourcing movement and [`08b-selected-category-framework-full-frame.png`](../design/mockups/sourcing-layout-explorations-2026-08-31/08b-selected-category-framework-full-frame.png) | Oversized outline taxonomy, paired evidence, clipped paper/forest statements and exhibition-like pacing | Generic cards, new claims, fake suppliers, copied gallery identity or three equal modules | Translate identity, biography, sourcing, formats and inquiry into a single route/exhibition grammar in comparison board 04 only |
| Unified watercolour-invitation concept | Active complete villa illustration and [`inquiry-1440.png`](../artifacts/inquiry-full-frame-2026-08-31/inquiry-1440.png) | Sparse paper, full-canvas brush illustration, soft material edges and one calm invitation action | Invented venue claim, cropped villa, luxury clichés, extra CTAs or decorative gradients | Extend the invitation's quiet illustrated tempo across the same page sequence in comparison board 05 only |

Every comparison keeps the current content boundary, real chef identity, local media, paper/ink/copper/forest family and absence of stock template patterns. Any whole-site implementation remains blocked on the user's selection.

## Eight user-selected fashion and concept directions — comparison only — 2026-08-31

The user rejected the first rendered set, requested text-first ideas, then explicitly selected directions 3–5 from the first text list and all five directions from the fashion-led second list for raster mockups. The descriptions themselves are now confirmed project requirements for this study. The boards live only in `design/mockups/style-directions-round-2-2026-08-31/`.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Field journal | User-selected `Полевой дневник шефа`; current real sourcing and working media | Show decisions, routes, source notes and process evidence as a coherent working notebook | Scrapbook kits, fake handwriting, invented suppliers, rustic restaurant template | Comparison board 01 only |
| Mise en place | User-selected professional-kitchen direction; current real preparation/event media | Precision grid, tools, hands, sequences and measured alignment create identity | Dashboard UI, lab-fiction claims, chrome effect for decoration, generic cards | Comparison board 02 only |
| Private invitation | User-selected personal-invitation direction; current one-to-one service journey | One addressed statement and one primary image per movement; conversion feels personal | Wedding template, generic luxury invitation, script-font decoration, multiple CTAs | Comparison board 03 only |
| Fashion editorial | User-selected fashion-led direction; real chef portrait and working photography | Chef is the campaign protagonist; scale, crop and art direction carry the page | Another magazine's masthead, copied fashion brand, substitute model, beauty retouch | Comparison board 04 only |
| Neo-Swiss kinetic | User-selected Neo-Swiss direction; current exact copy and documentary frames | Strict typographic grid, variable-width headlines, coordinates and purposeful motion cues | Stock Swiss poster copy, illegible outline type, motion without information | Comparison board 05 only |
| Raw luxury | User-selected tactile anti-gloss direction; real local images and current quiet premium content | Paper grain, registration marks, scans and restrained imperfect evidence counter synthetic polish | Fake vintage branding, distressed texture over faces, generic beige luxury template | Comparison board 06 only |
| Immersive cinema | User-selected cinematic direction; current story film and evening sequence | One scene per chapter, subtitle-scale copy and narrative progression from source to table | Streaming-service UI, fake trailer controls, arbitrary parallax, invented venue | Comparison board 07 only |
| Digital collage | User-selected new-wave poster direction; current portrait, ingredients and contact-sheet media | Cropped silhouette, oversized type, overlaps and contact sheets build high-energy identity | Random sticker pack, meme aesthetic, bento grid, unrelated logos or decorative chaos | Comparison board 08 only |

The live interface remains the approved system. These boards do not select a winner, replace active tokens or authorize implementation.

## Approved reference inventory

| Reference | Active use | Deliberate exclusions |
|---|---|---|
| User’s direct biography replacement from 2026-08-31: keep the paragraph beginning `Победа в «МастерШеф. Профессионалы»…` and replace the close with `Теперь я провожу частные ужины, приватные мероприятия и мастер-классы и превращаю этот опыт в ваш идеальный гастрономический вечер.`; the earlier typography correction keeps both paragraphs in font 1 | Render the supplied two-paragraph biography verbatim and give both paragraphs one shared Onest base class so family, size, weight and line height have a single source at every breakpoint; retain the second paragraph’s semantic separation, spacing and ink color | No heading, color-role, spacing, photograph, layout, responsive geometry, later story chapter or whole-page change |
| User-supplied current hero crops at 17:05:42 and 17:06:08 plus direct correction from 2026-08-31: remove the white patch, begin the main chef photograph at the indicated grid strip, and apply blur across every photograph in the complete hero rather than only the left side | Supersede the oversized desktop aperture and compounded left wash. The later 17:23:55 correction refines the same principle into the active thirty-two-column wide aperture, compact crop and uniform full-mosaic `2.2px` / `66%` treatment | No blank paper beside/below the desktop portrait, local left-only veil, missing/covered/repeated source, blur on copy or main portrait, generated edit, glass panel, radius, shadow, layout change below the hero, commit or publication |
| User's direct mobile adaptation request from 2026-08-31 and the measured seven-width live audit | Improve readability and scan rhythm without changing the approved compositions: keep a stable 13 px phone biography body; widen the story fact rail to at least 120 px and use 11 px facts; retain the phone film at 9:16; raise the tablet portrait only inside its reserved empty aperture; reduce only measured phone transition, scene, stage and footer gaps while retaining 44 px targets | No mobile redesign, mechanical one-column stack, new card pattern, changed content/order, hidden image, crop or source replacement, smaller target, new decoration, invented state or change to desktop composition |
| User’s direct hero-collage correction from 2026-08-31: move the main chef photograph closer to the text without covering other photographs, and add a slight blur plus a transparent milky veil to the whole collage except the text, main chef photograph and primary page background | Reflow all forty supplied screenshots around dedicated responsive apertures beneath the sharp foreground portrait; the final screenshot-led refinement places the wide portrait at `46.875%`, crops out embedded source bands and applies one uniform `2.2px` blur with a `66%` warm-paper veil only to the background mosaic | No blur, opacity or color wash on the title, eyebrow, foreground portrait or page background; no hidden/removed/repeated collage source, portrait overlap with a photo tile, opaque panel, glass card, glow, radius, shadow, generated edit or change below the hero |
| User’s direct responsive correction from 2026-08-31: the story video remains 9:16 on mobile and every other mobile decision stays as it was; the horizontal change applies only to the web version | Limit the approved horizontal `4 / 3` film aperture to desktop/tablet. At the existing phone breakpoint, restore the original vertical `9 / 16` aperture while preserving the current mobile columns, text, ornament, facts, playback behavior and square edges | No mobile re-layout, reordered content, new crop, replacement film, change to desktop/tablet 4:3, new control, decoration or unrelated page change |
| User-supplied 1794 × 1898 grape-harvest photograph and direct instruction from 2026-08-31 to replace the pumpkins with this photo | Replace only the first photograph in the `ОВОЩИ` sourcing movement. Preserve the complete supplied frame with Evgen, the grape crate, vineyard context and original portrait proportion inside the existing `contain` treatment; keep the strawberry-greenhouse photograph as the second frame | No crop, generative edit, retouch, removal of the visible source-interface arrow, new caption, category rename, layout change, replacement of the greenhouse frame or change outside the sourcing photograph |
| User’s direct hero correction from 2026-08-31: keep the chef’s main photograph exactly as it appeared over the previous collage | Restore the separate user-supplied `chef-hero-apron.jpg` identity layer with the previous source, crop, size and desktop/tablet/phone coordinates, above the new forty-photo irregular collage | No replacement portrait, new crop, generated person, identity edit, repositioned title, change to the forty collage sources or their responsive partitions, or post-hero change |
| User-supplied screenshot batch from 2026-08-31 and direct instruction to remove every existing hero-collage photograph, build the replacement only from these images, include every usable image in both web and mobile, and avoid equal/aligned tile shapes | Supersedes the sixty-source food/professional split and all film/gallery/sourcing/older-Instagram background cells. Use the forty valid supplied chef screenshots once each in one full-field irregular editorial partition, with independently authored desktop, tablet and phone placements so every image remains in the hero at every width; the later direct correction restores only the separate main portrait above this field | No former background source, repeated screenshot, uniform square matrix, fixed left/right subject taxonomy, rounded card, stock/generated image, face retouch, screenshot-content rewrite, runtime Instagram hotlink or change below the hero |
| User-supplied chef-story screenshot and direct correction from 2026-08-31: make the MasterChef block, its text and photograph smaller; keep it as a modest horizontal rectangle directly below the hero; render the two supplied biography paragraphs in one typeface | Supersedes only the scale and mixed body typography of the current award row. Constrain that row independently inside the wider story layout, reduce its heading and body rhythm, use a shallow landscape award crop, and give both biography paragraphs the same Onest size/leading while retaining their semantic separation | No removal or shortening of the supplied copy, replacement photograph, caption, card surface, radius, shadow, new decoration, change to the following film/home chapter or whole-page restyle |
| User-supplied 2278 × 1510 outdoor cooking photograph and direct instruction from 2026-08-31 to use it for `Приватные мероприятия` while concealing the upper-left source mark | Replace only the second event-format photograph. Keep the supplied bitmap intact and use the already approved central `4 / 5` stage crop so the chef, both working hands, crêpe plate and outdoor service context remain visible while the upper-left mark stays outside the rendered aperture | No generative reconstruction, watermark inpainting, face/body retouch, stretch, new caption inside the photograph, change to format order/copy, card restyle or unrelated page change |
| User-supplied inquiry screenshot at 15:54 and direct feedback from 2026-08-31 that the web version feels slightly empty | Recompose only the wide-screen vertical rhythm: keep the heading and Instagram action as one upper-left invitation group instead of pinning the action to the bottom edge, while the complete brush-villa canvas continues to occupy the full closing field | No new copy, eyebrow, metadata, line, icon, decorative filler, larger/cropped illustration, image edit, mobile reordering, footer change or new visual style |
| User-supplied chef-story capture, direct layout instruction and immediate aspect-ratio clarification from 2026-08-31: immediately below the hero place the award text at left and award photograph at right, keep the complete biography with that text, then create a separate row with video at left and text at right and make the web video horizontal 4:3 | Supersedes the earlier merged desktop spread and mistaken desktop 3:4 interpretation. The first story row is one text/photo relationship directly after the hero; the second uses one dominant horizontal 4:3 film aperture at left and narrower working-day text at right on web widths. The later direct biography replacement supplies its current exact copy, and the later direct mobile correction keeps the phone aperture at 9:16. Keep the existing award image, exact biography, `Я — у вас дома` statement, three workday facts, film, captions and square edges | No equal cards, interleaved chronology, text beneath the award photograph, desktop 9:16 or vertical 3:4 film tile, phone-wide 4:3 override, crop that removes the chef or working action, invented copy, new media, icon, rounded panel, shadow, gradient, glass, decorative connector or unrelated change below the story |
| User’s inquiry-close screenshot and direct correction from 2026-08-31: the complete brush-villa drawing must remain visible; reduce or recompose the text instead of cropping the artwork | Supersedes the earlier desktop/right and mobile/full-width crop treatment. Preserve the original 1536 × 1024 illustration canvas at every width with `contain` fitting; use its authored paper reserve for the heading on desktop and reduce the display scale where needed | No crop, zoom, negative image offset, image edit, replacement illustration, text over dense brushwork, added copy, new action or change outside inquiry/footer geometry |
| User-supplied event-format photographs and direct mapping from 2026-08-31: first photograph for `Мастер-классы`, second photograph for `Частный ужин`; request to find the third photograph independently | Use the supplied group-demonstration frame as direct masterclass evidence and the supplied close working portrait as direct private-dinner evidence. For `Приватные мероприятия`, select the existing local `@evg.chef` event-room frame `instagram-09.jpg`, whose guests and active venue establish an event atmosphere without introducing an external stock source | No generated people, external stock image, unrelated empty venue, repeated plated-dish placeholder, change to format order/copy, new card treatment or crop that removes the defining chef/guest context |
| User’s latest hero-collage correction from 2026-08-31: use sixty photographs rather than thirty-two, make them smaller, keep food at left and professional context at right, and use no photographs with text | Supersedes only the previous thirty-two-cell count and Instagram-only boundary. Preserve the no-duplicate and subject-order rules while expanding to sixty distinct local documentary stills: thirty-three food/preparation/sourcing frames at left and twenty-seven chef/team/venue/service frames at right | No repeated or perceptually duplicate image, article/social screenshot, caption overlay, dominant sign or logo, runtime hotlink, generated person, visible group label, rounded tile, card or change below the hero |
| User’s direct hero typography correction from 2026-08-31: return the text font and colors from the initial versions; initial light hero at commit `6ed9169` | Supersedes the later Roboto Flex treatment for visible hero copy. Restore the initial light hero’s serif display voice and exact light-surface text roles: Oranienbaum, `#1A1815` title, `#9B6343` emphasis, `#6D665D` eyebrow and `#AD6F32` eyebrow rule | No copy, line-break, font-size, layout, mosaic, portrait, header, animation or post-hero change; no return to the initial page’s obsolete content or composition |
| User’s direct hero-collage correction from 2026-08-31: remove duplicated photographs; place food on the left and the chef, awards, companies and related professional context on the right | Remains authoritative for uniqueness and subject order. The latest sixty-photo instruction increases the source count but does not restore repeated filler: every selected source appears once and the foreground chef portrait remains separate | No repeated source path, near-adjacent duplicate crop, runtime social hotlink, generated replacement, semantic card label, divider caption or change to post-hero sections |
| User’s direct supporting-copy removals from 2026-08-31: `мой путь`, `у меня нет готового меню`, `я готовлю для компаний до 20 гостей`, `первый шаг`, and the footer service/capacity sentence | Remove the five exact lines without replacement and close only the empty margins/grid tracks they leave behind | No substitute eyebrow, capacity restatement, new claim, new section, decorative filler or broader visual recomposition |
| User’s desktop hero screenshot and direct instruction `Нужно все исправить` from 2026-08-31 | Authoritative correction of the current hero composition: align copy, portrait and documentary field to one shared hero grid; repair the exact title’s line rhythm; keep the portrait optically inside the mosaic; reveal photographic evidence through a local reading veil; and verify every required width | No new hero copy or action, substitute/generated person, opaque paper half-screen, arbitrary portrait card, generic bento composition, rounded media, blur, glow, glass, decorative gradient or change to later sections |
| User’s exact hero-title correction from 2026-08-31: `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре` | Authoritative visible `h1` copy in the hero, including the supplied surname, personal role and Cyprus geography | No change to metadata, biography, media, typography, layout, actions or any post-hero copy; no added punctuation or substitute marketing language |
| User’s direct final hero reduction from 2026-08-31: remove the `приватные ужины, мероприятия, персональные мастер-классы` copy and `scroll` | Authoritative visible-content boundary for the first screen: keep only the verified eyebrow and personal-Master-Chef display statement over the approved documentary field | No supporting paragraph, repeated format rail, scroll label, replacement prompt, CTA or decorative filler |
| User’s desktop capture and direct chef-story correction from 2026-08-31: the current spread looks like two blocks forced into one | Recompose the same approved story as one chronological editorial journey: one dominant `От MasterChef к вашему столу` heading, compact award-and-origin evidence, then the larger present-day `Я — у вас дома` chapter with its working-day rail and film | No new biography claim, duplicate heading, equal card pair, generic timeline, icon, arrow, numbered steps, new media, new ornament style or decorative connector |
| User’s direct hero simplification from 2026-08-31: remove `до 20 гостей`, the in-hero Instagram action, `посмотреть форматы` and `пауза видео`; restore the previous version’s type size and colors | Authoritative content and control boundary for the hero: keep only the identity promise, service line, documentary media and existing header action; retain the previously approved Roboto Flex scale with ink/rust/muted color roles | No replacement CTA, capacity claim, inline navigation, motion button, new font scale, new color treatment or compensating decorative element |
| User’s direct hero-copy brief from 2026-08-31: Evgen is the guest’s personal Master Chef for private dinners, events and personal masterclasses | Authoritative message hierarchy for the hero: identify Evgen, state the personal-chef relationship and name the three intended occasions in one concise promise | No generic luxury claim, invented availability, price, guarantee, new service category or visual recomposition |
| User’s earlier hero source correction from 2026-08-31: remove images taken from video and leave only Instagram images | Superseded where necessary by the later combination of sixty distinct photographs, no duplicates and no photo text. Keep all twenty-one clean unique Instagram frames, then expand only with already stored project documentary media and eight clean stills from the project’s own films because the static pool otherwise cannot provide sixty unique text-free images | No runtime social hotlink, unrelated account, generated replacement, external stock added for this correction or reuse of the five static files proven to duplicate active Instagram frames |
| User’s direct hero-photo text removal from 2026-08-31, repeated in the latest sixty-photo instruction | Exclude every photo whose primary visible subject includes an article, social caption, headline, large sign or branding. The active Instagram exclusions are `03`, `05`, `09`, `10`, `14`, `16`, `17`, `21`, `25`, `28` and `32`; `chef-stage` and `chef-team` are also excluded | No AI text erasure, crop intended to conceal embedded text, retouching of people, text-bearing award/press/company fallback, repeated filler or removal of the site’s separate functional hero copy and navigation |
| User’s current phone capture and direct correction from 2026-08-31: the photos, collage structure and chef are not visible | Authoritative visibility requirement for the light mobile hero: retain the paper-led reading zone and let it dissolve into a clearly legible, uniquely sourced two-field documentary collage | No return to the rejected black veil, no fully opaque beige cover across the collage, no generic split-card UI and no collapse of the food/professional distinction |
| User-supplied 10:51 apron portrait from 2026-08-31 | Authoritative foreground chef photograph for the hero; preserve the real face, uniform, apron and hands while using a center crop that excludes the phone screenshot bands | No generated replacement, identity edit, beauty retouch, invented background, screenshot chrome or black bands in the visible hero crop |
| User’s direct correction from 2026-08-31: `Верни светлый фон`, restoring the previously selected light direction | Authoritative color treatment for the complete full-field hero: warm paper fallback, dark editorial copy, forest action, copper emphasis and a local light paper scrim over the documentary collage | No black hero field, dark full-screen veil, dimmed photographs, opaque content card, decorative gradient or glass |
| User’s direct hero correction from 2026-08-31: `60 маленьких квадратов, иногда прямоугольников`; collage across the whole hero; hero copy and chef photograph over it; prefer chef, people and catering over selfies | Fully active again under the latest exact count. Use sixty distinct small cells, with occasional two-column documentary rectangles, across the complete hero behind the copy and foreground portrait | No generic bento layout, large feature cards, generated people, replacement chef identity, rounded tiles, decorative glow or copied external collage |
| User-selected light hero concept [`hero-variant-01-light-paper.png`](../artifacts/hero-concepts/hero-variant-01-light-paper.png), approved 2026-08-30 | Warm paper reading field, dark editorial type, forest inquiry action and a clear documentary collage occupying the right side | The generated reconstruction is not a source asset; no generated faces, rewritten copy, invented media, rounded card grid or pixel-for-pixel implementation |
| User-marked hero screenshots from 2026-08-30 and approved project hero at commit `a6380fe` | Exact hierarchy of the sharp chef portrait, horizontal film and dense documentary mosaic | No copied brand, generated chef, blur, cards, rounding or detached media |
| User mobile capture at 23:04 on 2026-08-30 | Evidence that the phone hero becomes visually overloaded when two CTA panels, the pause control, a three-format rail, portrait, video and supporting mosaic compete in one continuous field | No imitation of browser chrome, no new style and no removal of the primary inquiry or accessible media control |
| User mobile capture on 2026-08-31 with the direct removal instruction | Remove the redundant three-photo menu atlas and its repeated summary so the three event formats lead directly to inquiry; retain the original knives photograph in project media | No replacement gallery, no substitute CTA, no deletion of media still used by the hero collage |
| User mobile captures and direct simplification instruction from 2026-08-31: the bespoke-process introduction and sourcing route explain the same idea and must become one readable block | Keep one section heading, compress request → sourcing → hosted evening into one paragraph, and let the existing sourcing mosaic continue that paragraph without a second title or repeated numbered explanation | No second display heading, duplicate process list, replacement imagery, new claim, card treatment or change to the approved sourcing captions; the later 11:10 removal instruction supersedes this row only for public credits and numeric markers |
| User desktop capture and direct format naming from 2026-08-31: `Частный ужин`, `Приватные мероприятия`, `Мастер-классы` | Authoritative public taxonomy for the three representative formats; use the same wording in the hero, format stages, metadata description and footer | No cocktail-party label, singular masterclass label, additional package, price, selection control or visual recomposition |
| User screenshot at 11:10 and direct removal instruction from 2026-08-31 | Remove the complete on-page photo disclaimer/credit strip and every decorative `01 / 02 / 03` marker across story, section headings, sourcing scenes and event formats | No removal of meaningful headings, place labels, first-person scene copy, format descriptions, image alternative text or repository license records |
| User’s direct sourcing-media corrections and final boat-removal instruction from 2026-08-31 | Keep the approved sheep and fishermen/catch frames; replace the neutral meat detail with the Kissonerga village counter, add the Larnaca harbour seller, replace the lemon orchard with the Cyprus strawberry greenhouse, and remove the separate boat-only frame. The later direct grape-photo replacement supersedes only the pumpkin frame | No second butcher-counter duplicate, no solitary boat, no removal of the catch frame, no generic orchard standing in for strawberry cultivation, no claim that a pictured business supplies Evgen, and no claim that the three new editorial/platform files are rights-cleared |
| User’s sourcing-layout screenshot and direct correction from 2026-08-31: the current field is unreadable and strangely arranged; draw five different display styles | Authoritative exploration brief for the sourcing block: retain the same six photographs, three place labels and three exact statements while testing five materially different reading structures with close text-to-image association and an obvious route order | No implementation before the user selects a direction; no invented copy, source, supplier claim, decorative AI style, generic card grid, gradients, glass, rounding or replacement photography |
| User’s follow-up sourcing request from 2026-08-31: create five more unconventional layout variants | Extend the selection set from five to ten with deliberately nonstandard but implementable structures: diagonal sequence, central typographic spine, oversized place-name framework, serpentine reading route and offset editorial apertures | No repetition of the first five compositions; no loss of readability, text-to-image pairing, source honesty or approved square-edged visual language for novelty’s sake |
| User’s clarified selection screenshots and direct implementation corrections from 2026-08-31: reproduce concept 8 in the live sourcing block, replace `ГОРЫ / ПОРТ / КИПР` with `МЯСО / РЫБА / ОВОЩИ`, remove the smaller place labels, and do not crop photographs | Concept 8’s enormous outline category words, three distinct editorial movements and terracotta-edged caption fields govern production. Show every complete source frame, especially the Larnaca seller, price signs and fish; keep only the three large category words plus the exact sourcing statements | Supersedes the earlier mistaken concept-2 selection and the rejected seventeen-row production map; no small `горы / порт / Кипр` labels, `cover` cropping, cards, rounded panels, invented supplier claim, copied brand treatment or change to the three statements and palette |
| User mobile capture at 23:44 and direct corrections on 2026-08-30 and 2026-08-31 | Remove the story-film pause overlay, the redundant “документальный фрагмент” label and the later-rejected sentence beneath the film; keep the tightened career text and restrained pattern | No replacement caption, browser chrome, generic ornamental stock, invented MasterChef season, restaurant list or unrelated decorative system |
| User’s prize-research request from 2026-08-31; [official «МастерШеф. Профессионалы — 2» finale](https://www.youtube.com/watch?v=tB88GYIfrk0); [Fakty ICTV winner report](https://life.fakty.com.ua/ua/showbiz/tb/mastershef-profesionaly-2-im-ya-peremozhtsya/) | Name the exact edition and state the advertised winner’s prize: Evgen won season 2 in 2020; the main prize was 1,000,000 Ukrainian hryvnias | No invented plate, statuette or season-specific physical trophy; no net-of-tax amount, present-day conversion or invented award object |
| User’s direct request from 2026-08-31 to bring the exact award photograph onto the site; [2020 Fakty interview and photograph](https://fakty.ua/ru/349986-ya-byl-moralno-istocshen-neozhidannoe-priznanie-pobeditelya-mastershef-professionaly-foto); [official STB winner record](https://www.stb.ua/ua/2020/07/18/kto-stal-pobeditelem-shou-mastershef-professionaly-2/) | Add one documentary proof image in the existing biography: Evgen in his season-two chef jacket holding the black MasterChef winner envelope; keep the photograph square-edged and caption only the verified finale/year | No fabricated cup, logo recreation, retouch, generated replacement, unrelated press gallery or claim that the envelope itself contains cash; publication rights remain an explicit release risk until confirmed |
| User’s direct caption-removal instruction from 2026-08-31 | Keep the approved award photograph but remove the complete visible `Финал · 2020 / конверт победителя` caption beneath it | No replacement label, badge, date, prize claim, decorative rule or removal of meaningful alternative text |
| User’s direct ornament correction from 2026-08-31; [UNESCO — Lefkara laces or Lefkaritika](https://ich.unesco.org/en/RL/lefkara-laces-or-lefkaritika-00255); [Visit Cyprus — Traditional Handicrafts](https://www.visitcyprus.com/discover-cyprus/culture/sites-and-monuments/traditional-handicrafts/) | Replace the rejected checker fragments with a substantial Cyprus-specific field: open diamond lattice, cut-work voids, satin-stitch-like filled marks and needle-edge rhythm derived from Lefkaritika | No copied lace specimen, tourism branding, generic Greek-key border, photographic texture, stock SVG or tiny checker accent |
| User-selected ornament mockup [`chef-story-ornament-variant-05.png`](../design/mockups/chef-story-ornament-variant-05.png), approved 2026-08-31 | Supersedes the CSS-only lace field with a richer Cyprus garden tapestry: olive foliage, restrained citrus blossom, terracotta fruit and large open diamonds in one hand-painted textile composition | No generic wallpaper repeat, tropical flowers, exact reuse of the complete mockup screenshot, altered page copy, decorative frame or generated food/person imagery |
| User-supplied photographs and portrait films; local documentary stills derived from the approved [@evg.chef](https://www.instagram.com/evg.chef/) source | All people, process, dish and venue media | No runtime hotlinks, unrelated accounts, stock substitutions or duplicated stills |
| Approved chef-story mockups in `design/mockups/chef-story-editorial-spread-2026-08-30/` | Current three-role desktop spread and exact 9:16 mobile poster | No device frame, social-Reel chrome, crop, second illustration or invented credentials |
| Direct content brief and first-person correction from 2026-08-30 | Verified service facts, biography, bespoke-menu logic and inquiry language | No invented location, price, season, restaurant count, dietary claim or guarantee |
| User’s direct `Я — у вас дома` fact-row correction from 2026-08-31 | Replace the credential/travel/capacity list in this block with one chronological working-day sequence: morning purchasing, daytime prep/marinades/sauces and evening cooking in the client’s home | No new claim, icon, timeline component, numbering, layout change or rewrite of the separate hero eyebrow and biography credentials |
| Direct sourcing brief and final selection from 2026-08-31; [sheep herd near Kalavasos / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:No_escape_(41810065242).jpg), [Greenwood Family Butchers in Kissonerga / Tripadvisor](https://www.tripadvisor.com/Restaurant_Review-g1916666-d23825039-Reviews-Greenwood_Family_Butchers-Kissonerga_Paphos_District.html), [fishermen with their catch / Pexels](https://www.pexels.com/photo/fishermen-with-catched-fish-on-boat-in-port-17782837/), [Larnaca harbour market / AP](https://apnews.com/article/cyprus-lionfish-toadfish-invasive-species-mediterranean-climate-b7a33b3f56d642171e54860706a67669), the user-supplied grape-harvest photograph and [Cyprus strawberry greenhouse / Вестник Кипра](https://vkcyprus.com/interview/10715-otkuda-rodom-kiprskaya-klubnika/) | Make the sourcing promise tangible through six unequal documentary fields: route plus counter for lamb, catch plus Larnaca market seller for fish, and personal harvest plus cultivation for produce; keep complete source/license records while public credits remain omitted by direct instruction | No solitary boat, no claim that the external photographs show Evgen’s actual suppliers, no invented farm/fisherman names, no exact availability guarantee, no claim of commercial clearance for user-supplied/platform/editorial imagery, no copied layout and no generic card treatment |
| User-approved `public/media/chef-story-brush-villa.png` and its transfer instruction | Decorative imagined setting in the final inquiry close | No claim that the villa is a real venue; no person, pool, form or extra contact channel |
| [Marrow Private Chefs](https://marrowprivatechefs.com/) and [`REFERENCE_ANALYSIS_MARROW.md`](./REFERENCE_ANALYSIS_MARROW.md) | Editorial pacing, documentary proof, varied section composition and restrained conversion hierarchy | No copied photography, wording, statistics, palette, offer structure, map or exact geometry |
| [Eugénie Colleville](https://www.eugeniecollevilleparis.com/) | Establish the individual chef, role and verified context before presenting service categories; caption documentary work specifically | No luxury/VIP claims, press claims, service taxonomy, palette or composition |
| [Noble Rot](https://noblerot.co.uk/) | Keep editorial story/proof and the reservation path visually distinct | No restaurant identity, magazine navigation, typography or content |
| [SingleThread](https://singlethreadfarms.com/) | Place verified operating facts near the decision path when those facts become available | No Farm/Restaurant/Inn ecosystem, booking rules, partner blocks or geography |
| [The Modern House Journal](https://themodernhouse.com/journal/) | Mark documentary media and editorial/illustrative material as different evidence classes | No article grid, brand system, photography or exact metadata treatment |
| [MOLD](https://thisismold.com/) and its [editorial-system case study](https://houseof207.com/mold-magazine/) | Let content type determine grid rhythm; preserve editorial intent on mobile | No identity, colors, proprietary layouts or publication content |
| [Vittles 2026 pitching guide](https://www.vittlesmagazine.com/p/vittles-pitching-guide-2026?action=share) | Keep the first-person food story voice-led and structured as an arc rather than a CV list | No publication voice, article content, subscription model or wording |
| User-selected typography references and licensed project fonts: Roboto Flex, Oranienbaum and Onest | Extended hero display, editorial serif hierarchy and readable Cyrillic UI/body copy | No commercial reference font files, specimen layouts or library-default typography |
| Direct request “Исправь всё” following the independent read-only audit on 2026-08-30 | Neutral functional corrections to performance, accessibility, metadata, captions, caching and regression coverage | No visual redesign, new decoration, content expansion or deployment authorization |
| Real `public/media/chef-portrait.jpg` plus the approved current palette | Identity source for `public/og.png`; flat editorial framing and two verified text lines only | No substitute person, altered identity, invented venue, new credential, logo or decorative stock imagery |

## Active element map

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| User-supplied current portrait crop at 17:23:55 and direct correction from 2026-08-31: remove black bands, move the main photograph left toward the text on web, restore text legibility over the blur, and keep the photograph beside the text on mobile | Treat the embedded phone chrome as non-photographic source material; move the unchanged identity source inside newly reserved wide and phone apertures; preserve the explicitly restored Oranienbaum and initial light-hero colors; improve contrast only through the one complete background-mosaic veil | No retouch, generated reconstruction, source overwrite, black band, covered supporting photo, portrait/title overlap, local copy panel, text shadow, font or copy change, blurred main portrait, hidden/repeated source, commit or publication | Wide placement uses a thirty-two-column refinement with the portrait at column 16; compact crop containment removes both screenshot bands; the phone aperture begins at row 9 immediately after the title; one stronger uniform paper veil affects all forty background photos and no foreground layer |
| Overall page | Current approved interface, user content brief and Marrow analysis | One personal service journey with composition changing according to content | Generic SaaS funnel, repeated cards, pricing, FAQ, testimonials or unsupported proof | Hero → editorial story → unified bespoke-menu and sourcing route → event formats → illustrated inquiry → sparse footer |
| Header and navigation | Direct light-background correction, full-field hero correction, existing navigation instruction and independent UX audit | A restrained translucent paper strip preserves the continuous collage while keeping dark navigation reliably legible; the forest action stays the conversion anchor | Black media bar, blur, glass panel, hamburger without need, pill navigation or stock footer/header | Warm paper overlay with dark name and navigation, plus an action explicitly naming `@evg.chef` and Instagram; secondary links are removed below 900 px |
| Hero copy | User’s exact hero-title correction, direct personal-Master-Chef brief, both follow-up reductions, the screenshot-led complete correction and the latest initial-style restoration from 2026-08-31 | Let the verified eyebrow and exact identity/role/location statement carry the first screen on one dominant reading axis; use deliberate line groups so the dash stays with the surname and `на Кипре` remains an intentional closing line; restore the initial light hero’s serif voice without reopening the composition | Supporting service paragraph, format rail, scroll label, hero capacity claim, inline CTA/navigation, motion button, invented urgency, statistics, price, availability or obsolete initial-version copy | The hero contains only `Победитель «МастерШеф. Профессионалы — 2»` and `Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре`; five controlled display lines use Oranienbaum and retain the current responsive sizes and fixed line groups |
| Hero mosaic | User-supplied forty-screenshot batch; direct full-field, irregularity, complete desktop/mobile inclusion and the three latest screenshot corrections | One continuous edge-to-edge evidence field uses all forty sources once and changes aperture proportions at each breakpoint; every portrait aperture is fitted to the foreground photograph rather than exposing reserve paper or hiding another photograph | Repeated, hidden or replaced screenshots, runtime hotlinks, equal square matrix, semantic card pair, visible group labels, generic bento hierarchy, generated imagery, copied grid, rounding, local left wash or portrait/photo overlap | Wide desktop uses a thirty-two-by-ten partition around columns 16–23 / rows 3–7; compact preserves columns 18–26 / rows 3–7; tablet uses twelve-by-sixteen around columns 8–12 / rows 8–16; phone uses eight-by-twenty around columns 4–8 / rows 9–17 with a complete lower band. All maps contain forty sources |
| Hero light-blur treatment | Latest screenshot and direct full-field legibility instruction from 2026-08-31; current approved forty-photo hero; the uniform-field principle documented as direction 2 in the earlier comparison | Use one even treatment across every background photograph so the complete hero recedes as one documentary field and the restored original type/colors remain readable | No local left wash, glassmorphism, glow, mesh gradient, rounded panel, regenerated identity, new copy, focus island, tilt-shift, tile-by-tile depth or blur outside the mosaic | The obsolete `.hero-wash` is absent. One full-mosaic pseudo-layer applies `2.2px` backdrop blur and `66%` warm-paper transparency at every breakpoint; title, main portrait and paper background remain sharp |
| Hero foreground identity and delivery | User-supplied apron portrait, the adjacent-strip screenshot, white-patch correction and 17:23:55 crop correction | Keep the real chef as the only sharp foreground photograph; crop out embedded source chrome; fit its apertures to the exact collage grid and place it beside the text without sitting above a tile | Detached portrait card, exposed reserve paper, hidden background tile, arbitrary overlap, generated/upscaled identity, retouch, pre-faded substitute, visible screenshot bands, blur or milky veil on the portrait | Wide `chef-hero-apron.jpg` begins at column 16 / row 3 (`46.875%`, `20%`); compact begins at column 18 with a contained `1.22` optical crop; phone begins at row 9 (`40%`) directly below the title with a contained `1.08` crop. Tablet retains its approved right-side zone |
| Chef-story spread | User’s 2026-08-31 “two blocks in one” correction, direct `мой путь` removal, approved editorial mockups, selected ornament mockup №5, documentary film, verified biography, award proof and the working-day fact row | One chronological editorial journey uses a single dominant MasterChef-to-table heading without an eyebrow; the compact award/origin column leads into the larger present-day home chapter, where statement, workday facts and live film share one field | Separate competing headings of equal weight, replacement label, equal cards, generic timeline, social embed, device frame, blur, copied textile, new ornament style or detached trophy section | Desktop and tablet keep the heading in the established main editorial column; the award and first paragraph form the prologue, while `Я — у вас дома`, the fact rail and 9:16 film form the main chapter. Phone preserves a dedicated 9:16 home poster after the compact prologue instead of mechanically stacking desktop columns |
| Chef-story video | User-supplied film, direct muted-autoplay instruction, independent accessibility audit, the user’s 23:44 correction and the 2026-08-31 hero-control removal | Video plays muted only when substantially visible, pauses outside the viewport and respects reduced-motion preferences without placing a control in the hero | Automatic sound, eager offscreen download, native control chrome, hero pause label, duplicate controls, chapter UI or replacement footage | Poster-first, `preload="none"`, IntersectionObserver playback, matching Russian VTT and reduced-motion pause; no page-motion control is rendered |
| Biography | User’s direct replacement copy and direct shared-font-1 correction from 2026-08-31; the official 2020 finale, contemporaneous winner reports, direct award-photo request and later caption-removal instruction | Keep the documented winner envelope without a visible caption and connect the MasterChef win with the user-supplied Europe and Mediterranean journey, techniques and combinations for original dishes, then close with the promised gastronomic evening in the same body typeface | Superseded prize amount and year in the visible paragraph or photo caption, mixed biography typefaces, invented workplaces or restaurants, unrelated awards, third-person luxury copy, or a claim that the pictured envelope itself is the prize | The fact rail names the exact edition; one uncaptained local documentary figure shows Evgen holding the black winner envelope; both first-person paragraphs share the same Onest base class at every breakpoint, while spacing and color preserve their semantic separation |
| Bespoke menu and ingredient sourcing route | Direct content brief; direct `у меня нет готового меню` removal; latest supplied sourcing capture and request to make the block livelier; direct instruction to keep the real grape photograph and generate Evgen at meat and fish markets | Let the menu-creation heading lead without an eyebrow, explain the request → sourcing promise once, then pair each exact statement with one human, ingredient-specific scene | Replacement label, repeated process, card grid, stock supplier claims, generated anonymous chef, named vendor claim, fake documentary caption, rounded image, carousel or additional category | One concise introduction leads into three square-edged paired rows. Identity-preserving generated Evgen meat/fish market scenes precede the real grape-harvest image; rows alternate text/photo, photo/text, text/photo while the existing statements remain unchanged |
| Event formats | Direct brief, approved menu sequence, user’s exact format naming, the 2026-08-31 removal of numbering/capacity eyebrow, the 2026-08-31 removal of the former `Я работаю лично.` line, and the direct event-format photo assignments, including the latest outdoor cooking frame for `Приватные мероприятия` | Show representative uses of one bespoke service with one consistent public taxonomy; give each format documentary evidence of its distinct human situation: chef at work, outdoor guest-facing service, chef teaching participants | Product selection UI, carousel, prices, repeated CTA, invented inclusions, additional package, decorative numbering, replacement eyebrow, stock event imagery, generated reconstruction, watermark inpainting or repeated generic food close-ups | `Вечера бывают разные` leads directly into `Частный ужин`, `Приватные мероприятия` and `Мастер-классы`; their square-edged stages use the supplied private-dinner photograph, the supplied outdoor crêpe-cooking photograph and the supplied masterclass photograph respectively; the second image keeps its original pixels while the central `4 / 5` aperture excludes its upper-left mark |
| Inquiry close | Direct transfer instruction, direct `первый шаг` removal, approved brush-villa asset, independent conversion audit, the user’s 2026-08-31 full-artwork correction and the 15:54 wide-screen spacing screenshot | Let the invitation heading lead the conversion close without a generic step label; preserve the complete authored illustration canvas; group the only two interactive reading elements on wide screens so the space between them is intentional rather than accidental; the action names the verified channel | Replacement eyebrow, generic contact form, invented response time, decorative filler, text over dense art, stock villa, additional channel, crop, zoom or negative image offset | Heading scale is reduced before the illustration is compromised; above 1024 px the action follows the heading in the same upper-left reading cluster while the complete drawing continues across the field; tablet/phone retain the complete 3:2 canvas between heading and action |
| Footer | Direct removal of the service/capacity sentence and current approved interface | Close with only identity, internal anchors and verified contact | Replacement summary, generic multi-column corporate footer, invented address, phone or email | Name, internal anchors and Instagram; no repeated format/capacity sentence |
| Typography | Licensed project fonts, initial light hero at `6ed9169` and the latest direct restoration request | Restore the original serif display contrast in the hero while keeping Cyrillic support and the current editorial hierarchy | Library defaults, synthetic italic, decorative script or restoration of obsolete initial copy/layout | Oranienbaum for hero and editorial headings; Onest for body, labels and controls; Roboto Flex remains self-hosted but inactive in the current visible interface |
| Color and accessibility | Direct light-background correction, initial light hero at `6ed9169`, selected light hero concept, approved paper palette, WCAG 2.2 AA and the latest full-field legibility correction | Preserve the original text hierarchy and exact restored colors while letting the entire documentary background recede evenly | Black hero field, dark full-screen veil, decorative mesh, local left wash, glass panel, arbitrary accent, opaque content card, blurred text/portrait or low-contrast microtype | Hero copy uses the dedicated initial-light tokens and Oranienbaum; the complete mosaic alone receives the authorized `2.2px`/`66%` treatment; header and forest/paper focus treatment remain sharp |
| Social preview | Real `chef-portrait.jpg`, current metadata copy and approved palette | Social sharing must identify the same real chef as the site and repeat only verified service scope | Different/generated person, stock food, fake venue, unsupported MasterChef details, location or price | One 1200:630 editorial card with real chef, `ЕВГЕНИЙ ГРЫБЕНИК`, and `ЧАСТНЫЙ ШЕФ · ДО 20 ГОСТЕЙ` |
| Favicon | Approved forest/paper/copper tokens and the verified initials `ЕГ` | Replace the unrelated blue starter mark with a neutral, readable project identifier until a final logo is supplied | Claim that the monogram is a final logo, imported icon set, gradient, rounded app tile or new brand symbol | Square forest field, copper rule, paper initials; metadata points directly to `/favicon.svg` |
| Motion | Approved reveal references, direct film behavior and independent accessibility audit | Motion supports entry and documentary proof without blocking reading or trapping a visitor in autoplay | Scroll hijacking, decorative particles, native player chrome, unrequested parallax or hidden content | Short CSS reveals, synchronized page-level pause/resume, viewport-controlled video and complete reduced-motion overrides |
| Responsive behavior | Direct light-background and full-field hero corrections, the current forty-photo batch, current mobile hierarchy and latest title-proximity correction | Keep the same forty-source evidence field at every aspect ratio; reserve a deliberate foreground aperture rather than hiding a source; anchor the phone heading and portrait as one close reading sequence | Hiding or darkening the collage on phones, covering a photograph with the portrait, compounded paper washes, mechanically stacking desktop blocks, duplicate sources or horizontal carousel | Dedicated wide, compact, tablet and phone maps keep all forty sources; phone portrait starts at the row-9 boundary 7–27 px after the title across 375–430 px; mandatory checks remain 1440/1280/1024/768/430/390/375 px |

## Open inputs

- service location and working radius;
- dietary constraints suitable for public claims;
- named restaurant career proof beyond the already confirmed MasterChef edition;
- verified contact methods beyond Instagram;
- final logo/brand identity;
- form, loading, empty, validation and success language if interactive forms are introduced.
- publication authorization or a commercial-use license for the STB award photograph republished by Fakty.

No unresolved input above is invented in the active interface.

## Active Cyprus-ornament square-collage map — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero collage | User’s exact equal-small-square instruction and forty local ordered sources | Rhythm comes from equal photographic units rather than irregular bento sizing | Rectangular exceptions, variable tile spans, reordered media, social-feed chrome or hidden photographs | Ten-by-four square grid on large screens, responsive exact-factor recomposition to eight-by-five, five-by-eight and four-by-ten |
| Cyprus identity | User’s direct Cyprus-pattern brief; previously approved UNESCO/Visit Cyprus Lefkaritika research | Open diamonds, solid/void alternation, stitched edging and hand-made irregular rhythm | Copied lace specimen, tourism branding, generic Greek key, flag literalism or stock wallpaper | CSS-authored dividers and borders plus the existing project-local tapestry PNGs |
| Palette | User’s explicit freedom to change the palette; Cyprus limestone, olives, terracotta and coastal mineral color already present in project media | Place-led mineral palette with accessible functional roles | Gold-on-black luxury cliché, purple AI gradient, pastel travel branding or decorative glow | Limestone/shell reading fields, dark olive structure, terracotta emphasis and mineral-blue focus/details |
| Immediate format chapter | User’s exact reorder instruction and three existing format scenes | Show what the chef does immediately after establishing identity | New service, price, card kit, carousel or rewritten format copy | Complete `Вечера бывают разные` triptych moves after hero with exact images/text/order |
| Section transitions | User’s direct request to author outlines and transitions; Lefkaritika edge rhythm | Borders behave as stitched seams between narrative chapters | Repeated scallop, ornamental overload, animated wallpaper or SVG stock asset | One semantic-free divider primitive with nested diamond/open-square marks and restrained reveal |
| Biography and film | Existing story/media order plus approved Cyprus tapestry assets | Real evidence remains primary; ornament frames rather than replaces it | New biography claim, illustrated film, native video chrome or autoplay sound | MasterChef proof and original film remain together after formats, with tapestry/lattice edge roles |
| Sourcing | Two identity-preserving generated Evgen market scenes, the real grape-harvest photograph and exact category statements | Material origin uses three human, ingredient-specific scenes in one alternating editorial route | Equal generic cards, supplier claims, map gimmick, anonymous substitute chef or cropped-away real portrait | Meat and fish receive generated 4:3 market scenes; produce retains the real portrait; the middle row mirrors the common 5/7 relationship |
| Inquiry | Existing villa artwork and verified Instagram path | Calm final invitation inside a place-specific frame | Extra contact channel, form, invented venue or generic CTA strip | Limestone/olive close with terracotta/mineral ornamental corners and the existing action |

Decisions without direct references: exact diamond module size, line thickness, tile-gap width, crop positions, breakpoints and reveal timing. They remain content-led and neutral. Form/loading/error/success states remain undefined because no form or data-dependent UI is introduced.

Typography amendment: the user’s direct font-change instruction supersedes the prior Oranienbaum/Onest choice. Roboto Flex supplies modern variable-sans structure; Literata Italic marks only selected human/emotional phrases and service names. Neither family is used with its sample-page composition or external brand styling.

## Cyprus textile-depth correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Page edge | User’s critique that two diamonds are not a Cyprus system; approved Lefkaritika needle-edge research | A textile has a continuous selvage rather than isolated stickers | Wallpaper repeat, Greek key, tourism branding or ornamental scrollwork | Paired cross-stitch rails frame the reading surface and compress to a quiet stitched edge on phones |
| Hero loom | Exact forty-square hero requirement plus Lefkaritika solid/void alternation | The square photo field becomes the woven centre of a larger textile frame | Variable bento spans, masks over faces, extra photography or copied lace | Cross-cell band and interrupted thread lines frame the complete equal-square collage while the portrait stays unobstructed |
| Chapter transitions | Approved cut-work void and satin-stitch principles | Each transition has a real pattern family, not the same diamond repeated | Seven identical diamonds, stock SVG ribbon or animated wallpaper | Alternating cut-work rosette, cross-cell and stepped-lozenge bands mark formats, story and sourcing transitions |
| Event formats | Existing three factual service scenes | A stepped woven spine differentiates and joins the three stages | Rounded cards, identical panels, extra service copy or decorative icon set | Each stage receives a distinct large geometric stitch mark and shared woven top/bottom selvage |
| Film and proof | Existing documentary evidence and tapestry assets | Ornament frames evidence without competing with it | Picture mask, subtitle obstruction, repeated corner diamond or generated illustration | Cross-cell side rail and cut-work corner blocks sit outside the film and award apertures |
| Sourcing route | Existing six-image content-led composition | Category changes behave like textile joins | Generic separator line, equal card grid, crop or map gimmick | Different woven join between meat, fish and produce while the existing layouts remain distinct |
| Inquiry close | Existing villa artwork and Instagram route | Finish with a stepped border that feels intentionally closed | Two floating diamonds, new form, invented venue or gold luxury cue | Full stepped-lozenge perimeter with a clear limestone reserve for the heading and action |

Decisions without direct references: exact cell count, module dimensions, side-rail width and responsive simplification. They are neutral geometric adaptations and do not introduce a new brand motif beyond the approved textile sources.

## Approved WebsiteFactory application map — 2026-09-01

The user explicitly approved the researched references for this copied Site. The complete
three-source-per-element registry and concrete live shortlist are recorded in
[`WEBSITEFACTORY_REFERENCE_RESEARCH_2026-09-01.md`](./WEBSITEFACTORY_REFERENCE_RESEARCH_2026-09-01.md).

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero and identity | Central, Massimo Bottura, Cardinali Studio; `HERO-027`, `REST-015`, `PHOTO-006` | Show verified identity immediately, with the real chef and documentary field visible on the first frame | Another restaurant identity, hidden-first title, montage hover or masonry composition | Keep the forty-square Cyprus collage and apron portrait; remove entry stagger and decorative hover so title/evidence are immediately readable |
| Event formats | The Modern, Social Pantry, PlateForm Cyprus; `REST-024`, `EVENT-001`, `EVENT-002` | Three genuinely different human situations precede one clear inquiry path | Packages, prices, capacity claims, repeated card kit or mobile-hidden action | Keep the supplied triptych and exact copy; preserve its connected geometry and direct route to the single inquiry action |
| Chef story | Massimo Bottura, Alchemist, Alexandre Couillon; `REST-015`, `REST-016`, `LAYOUT-018` | Biography is a short authored route proved by work, award and current practice | Centered manifesto, CV timeline, restaurant claims or generic about section | Keep the compact MasterChef proof, present-day film chapter and workday facts on separate editorial surfaces |
| Sourcing | Central, noma, Cardinali Studio; `PHOTO-002`, `PHOTO-006`, `LAYOUT-018`; latest user sourcing capture and direct generation brief | Person → ingredient → place reads as one authored field journey; alternating sides make the three short scenes feel active without decorative motion | Supplier claims, map gimmick, equal cards, anonymous stock chef, generated replacement grape portrait or close-up-only loop | Evgen appears in two identity-preserving generated 4:3 market scenes and the real grape photo. The order is meat → fish → produce and the sides alternate across every breakpoint |
| Inquiry action | Urban Catering Cyprus, Bastion Events, GOV.UK button; `BUTTON-001`, `BUTTON-005`, `REST-024` | One outcome-specific primary action remains visible and touch-safe; channel name is secondary | Invented form, phone, response promise, multiple competing CTAs or `Подробнее` | Header and close say `обсудить вечер`; both remain links to the verified Instagram account and announce the external destination |
| Lines and transitions | KOL, MAD, Base Design, Ikoyi; `SECTION-009`, `DECOR-007`, `DECOR-013`, `VISUAL-020` | A line guides, separates a content mode or marks an action; a surface change announces a chapter | Ornament without function, repeated bands inside one transition, copied cultural motif or generic paper grain | One major Cyprus band remains between chapters; interior rules frame evidence or distinguish stages; warm flat surfaces carry long copy |
| Hover, focus and press | GOV.UK, Material 3 evidence set, NN/g; `INTERACT-002`, `INTERACT-004`, `MOTION-003` | Hover reinforces an interactive state, focus is always visible, press is brief causal feedback | Hover-only information, motion on `aria-hidden` images, focus clipping or animated layout | Decorative media is static; links retain underline/color states; the primary action keeps the global two-color focus ring and a one-pixel active press |
| Motion and reduced motion | NN/g and web.dev; `MOTION-001`, `MOTION-006`, `MOTION-016`, `MOTION-030`, `MOTION-032`, `MOTION-035` | Essential content is visible first frame; motion explains state/navigation; reduced motion is complete | Staggered hero reveal, multi-carrier view-timeline reveal, clip-path, parallax, bounce or arbitrary easing collection | Remove tile/reveal animations and the unused media event bus; keep smooth anchor navigation, brief interaction color feedback and viewport video playback only |
| Functional microtype | GOV.UK, Material 3 evidence set, current accessibility requirements; `BUTTON-001`, `INTERACT-004` | Utility text remains readable and targets stay at least 44 px | 8–9 px labels or shrinking controls to fit the composition | Navigation, eyebrow, section label, footer and primary actions use at least 11 px; phone actions remain 52 px or taller |

Decisions without direct references: the retained Cyprus module dimensions, existing crop focal points
and existing breakpoints. The interaction color transition uses the smallest existing project value
(`160ms`) as neutral feedback, not as a new brand-motion signature. Form/loading/error/success states
remain undefined because the route still contains no form or asynchronous data UI.

## User rejection and direct-reference reset — 2026-09-01

The user rejected the first WebsiteFactory implementation as visually unrelated to the references.
This correction supersedes the square photo wall, persistent textile rails, pattern bands, ornamental
corner frames and oversized poster typography. The problem was not the research categories; it was
retaining the previous visual system instead of translating the live references into composition.

| Project element | Direct live reference | Principle used | What is not copied | Corrected implementation |
|---|---|---|---|---|
| Hero | [Central](https://centralrestaurante.com.pe/en/), [noma](https://noma.dk/), [Massimo Bottura](https://osteriafrancescana.it/massimo-bottura/) | One identity statement and one dominant real photograph establish person and place immediately | Peru/Denmark/Modena identity, split manifesto wording, logos, restaurant booking language | Quiet split hero: exact identity copy on a flat surface and one real chef portrait; no forty-tile background |
| Formats | [The Modern](https://www.themodernnyc.com/private-dining/), [Social Pantry](https://socialpantry.co.uk/we-offer/events/), [Urban Catering Cyprus](https://www.urbancatering.com.cy/services/private-chef) | A real scenario is followed by the specific use and one inquiry route | Gallery carousel, prices, capacities, invented packages, London/New York/Cyprus competitor branding | Three editorial scenario rows with different image/text proportions; no triptych frame, overlap or ornament |
| Chef story | [Massimo Bottura](https://osteriafrancescana.it/massimo-bottura/), [Alexandre Couillon](https://www.alexandrecouillon.com/en/meet.html) | First-person biography is short, authored and proved by a real image/episode | Another chef’s origin story, team claims, revolution language or restaurant mission | Two concise biography paragraphs, award proof and current home-service film in one chronological dark chapter |
| Product route | [Central](https://centralrestaurante.com.pe/en/), [noma](https://noma.dk/) | Place, ingredient and process form a legible sequence with calm captions | Territory research claims, supplier partnerships, altitude map or editorial feed | Three source chapters; each keeps two real evidence images plus the existing first-person statement |
| CTA and footer | [The Modern](https://www.themodernnyc.com/private-dining/), [Urban Catering Cyprus](https://www.urbancatering.com.cy/services/private-chef) | One outcome-specific inquiry closes the route; verified channel stays explicit | Form fields, phone/email, response-time promise or secondary promotional CTA | One full-width `обсудить вечер` Instagram link on a flat dark close, followed by a minimal footer |
| Lines and motion | [noma](https://noma.dk/), [NN/g](https://www.nngroup.com/articles/animation-purpose-ux/), [web.dev](https://web.dev/articles/animations-guide) | Hairlines separate content modes; essential content is static; motion is only interaction feedback | Textile rails, decorative bands, scroll reveal, image hover, parallax or spectacle | One-pixel structural rules, no decorative pattern component, no content animation, complete reduced-motion behavior |

Decisions without direct references: exact retained brand color values, crop focal points and breakpoint
thresholds. They are constrained by the real project media and verified at the required widths. No
new factual copy, logo, form, channel, price, capacity or supplier relationship is introduced.

Implementation status: the corrected route now renders this map directly. The former photo wall,
Cyprus rails, pattern bands, framed triptych and illustrated close are inactive. The local result has
passed the seven-width visual/DOM audit; production remains unchanged until the user approves it.

## User-directed collage and no-green correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero media | User's direct instruction `оставь коллаж`; the project's forty approved local hero photographs | Preserve documentary density inside the clean editorial split hero | Former full-page wall, Cyprus rails, ornament bands, framed triptych or another site's gallery composition | The right hero field becomes a forty-image grid with the real chef portrait as its sharp identity anchor; the left copy field and later editorial page remain unchanged |
| Green color | User's direct instruction `убери этот зеленый цвет`; current warm-paper, ink and rust system | Remove green without inventing a replacement brand color | New gradient, blue/purple accent, decorative tint or image recoloring | Retire the forest token from the rendered route; dark surfaces use neutral ink and emphasis uses existing rust/paper roles |

Decisions without direct references: the five-by-eight collage subdivision and portrait inset are
bounded neutral adaptations of the existing forty-image asset set. No copy, content order, event
scenario, sourcing photograph, interaction or mobile navigation changes.

## User-directed hero hierarchy — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero hierarchy | User's exact instruction `надпись сверху, фото с фартухом снизу, коллаж справа` | Separate identity copy, portrait and documentary context into an explicit reading order | Portrait floating over collage, full-page photo wall, ornament, centered generic hero or secondary CTA | Desktop/tablet: copy and apron portrait form the left column; the forty-image collage owns the complete right column. Phone: copy → portrait → collage |

No new visual decision is introduced beyond the bounded portrait aperture and spacing needed to fit
the three user-specified zones. Palette, typography, content and post-hero composition remain fixed.

## User-directed chronological story — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Chef story and formats | User's exact narrative: MasterChef victory → European/Mediterranean experience → private dinners → private events → master classes; direct alternating `фото — текст / текст — фото` instruction | Chronology and alternating evidence make the page read as one continuous authored story | CV timeline, new claims, invented travel photograph, repeated same-side media or separate service-card grid | MasterChef proof leads directly after hero as photo/text; present-day film is text/photo; the three existing format rows follow as photo/text, text/photo, photo/text |

No biography sentence, event description, image, film, format order or claim is added or rewritten.
Only page order and the existing media/copy sides change.

## User-directed cream surface — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Global section surfaces | User's exact instruction `Цвет везде кремовый как и есть`; existing project paper tokens | One continuous cream reading field keeps the story visually whole | New color, dark chapter, green return, gradient, texture or tinted photograph | Hero, story, formats, sourcing, inquiry and footer use `#F4EFE5` / `#FCFAF5`; text becomes ink and existing rust remains the only accent |

No layout, image, content, interaction or responsive order changes with this correction.

## User clarification: one MasterChef-and-evenings block — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef and evenings | User's exact clarification `Сначала мастер шеф, потом вечера это в одном блоке друг за другом` | Origin and present-day services belong to one semantic/story surface | Two adjacent sections, separate background, duplicated intro or gap that reads as a new chapter | The formats module becomes the final movement inside the single `story` section, immediately after MasterChef/present-day rows |

The formats anchor, heading, copy, media and alternating order remain unchanged.

## Mobile adaptation for public release — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Phone hero | User-approved title → apron portrait → collage order; existing 430/390/375 project breakpoints | Preserve identity and documentary evidence without squeezing desktop columns | Side-by-side phone hero, hidden collage, tiny portrait or mechanically scaled desktop | Two-tier header; copy first; 82–86% portrait; square five-by-eight collage grid below |
| Unified story | User-approved one-block chronology and alternating media/copy order | Keep chronology legible with compact but distinct reading movements | Accordion, timeline widget, card stack or reordered copy | Reduced phone chapter gaps; proof → copy → present copy → vertical film → formats, all on one cream surface |
| Formats and sourcing | Existing authored compact layouts | Preserve unequal image proportions and alternating order on small screens | Three identical cards, horizontal carousel or full-width repeated images | Content-specific 4:5, 5:4 and 4:3 format crops; sourcing pairs retain unequal 82% alignment |
| Inquiry and navigation | Existing single Instagram action and project 44 px target rule | Keep actions readable and reachable at 375 px | Icon-only navigation, hidden channel, multiple CTAs or undersized text | No-wrap header action, 44 px navigation targets, two-part inquiry action and one-column footer |

Decisions without direct references: phone spacing reductions at 820/430 px and the portrait width
change from 82% to 86% below 430 px. They are bounded by the approved content and target-size rules.

## Direct mobile-order correction — 2026-09-01

This correction supersedes the earlier `proof → present-day → formats` sequence wherever it appears
in the historical records below or above.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef, formats and present-day chapter | User's exact correction after inspecting the public 390 px page: `победа мастер шеф и 3 варианта мероприятий это один блок`; follow-up: `Я у вас дома идёт после шефа и мероприятий` | The proof of victory and the three ways to work with the chef form one uninterrupted narrative unit; the day-at-home film is the next chapter, not an interstitial | Existing incorrect proof → present-day film → formats order, generic service-card grid, duplicate section intro, new copy or a color break inside the unified block | Inside `story`: MasterChef proof and biography → formats heading → private dinner → private event → master class. After `story`, a separate cream `present-day` section contains `Я — у вас дома`, the three workday facts and the existing film |

## Present-day film scale correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| `Я — у вас дома` chapter | User's supplied 390 px production capture and direct corrections: the video is too large; web should use the existing horizontal ratio, phone should use `9:16` without filling the screen; follow-up `Текст не удаляй, сделай рядом` | Keep the complete heading and three-part working-day text visibly paired with the documentary film; use ratio and column share to distinguish desktop and phone instead of stacking a full-width poster below a separate text block | Deleting the facts, full-width phone film, full-screen poster, text above a large empty gap, new copy, caption, card, rounded frame, device chrome or decorative control | Desktop and tablet retain the text-left / `4:3` film-right spread. At `560px` and below, one 12-column row places all copy in columns `1 / 8` and the `9:16` film in columns `8 / 13`, with a `12px` gap and compact list spacing; at 375/390/430 px the film is approximately 134/141/157 px wide rather than the full content width |

The sequence comes directly from the user's correction. The only neutral implementation decisions are
a warm rule between the unified story and the following present-day chapter and bounded responsive
spacing; no new visual language, content or media is introduced.

## Layered hero correction from supplied mobile captures — 2026-09-01

This correction supersedes the earlier hero rule that placed the portrait and collage in separate
sequential fields.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero portrait and collage | User-supplied `Photo 1.jpg` and `Photo 2.jpg`; exact instruction `Коллаж сделай его маленькими картинками за спиной шефа, фото шефа меньше` | Convert two oversized consecutive media blocks into one foreground/background composition: the documentary grid supplies context and the smaller portrait remains the identity focal point | Screenshot browser chrome, phone status bars, new imagery, transparent AI cutout, gradient, shadow, rounded card, ornamental frame or separate collage chapter | The forty existing local images become a five-by-eight background inside one `hero-stage`; the approved apron portrait is reduced and layered above the center/lower part of that grid. Desktop keeps copy at left and the layered stage at right; phone keeps copy above the same stage |

The presentation-layout principle used here is only foreground/background hierarchy and one coherent
composition. No presentation artifact, slide template or presentation-specific styling is introduced.

## Mobile editorial-aperture correction — 2026-09-01

This correction supersedes the earlier phone rule that allowed the MasterChef proof and event-format
media to occupy the complete content width.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof and three format rows on phone | User-supplied mobile captures `Photo 1.jpg` and `Photo 2.jpg`; exact corrections `Это не должно быть целыми блоками` and `Это должны быть небольшие фото и текст сбоку` | Keep each photograph and its copy in one compact side-by-side editorial pair instead of consecutive full-width slabs | Equal cards, full-width repeated media, vertical image/copy stacking, horizontal carousel, hidden copy, overlap or changed narrative order | Below 560 px the MasterChef proof uses a four-of-twelve-column photograph beside eight columns of biography copy. Formats alternate in the same 4/8 rhythm: media-left/copy-right, copy-left/media-right, media-left/copy-right |

No content, image, section order, background, typography or desktop/tablet rule changes.

## Final MasterChef-and-events unification — 2026-09-01

This correction supersedes every earlier rule that retained a separate formats eyebrow, formats
heading or top divider inside the story.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof and three event formats | User-supplied mobile capture at 18:28; exact instruction `Убери вечера бывают разные и т.д., частные форматы, говорю тебе, мастер шеф фото и 3 мероприятия это 1 блок` | The award story and the three concrete ways to work with the chef read as one uninterrupted editorial sequence | Separate `ЧАСТНЫЕ ФОРМАТЫ` eyebrow, `Вечера бывают разные` heading, section-opening rule, replacement heading, generic services wrapper or duplicated summary | Keep the MasterChef image and biography first, then continue directly with `Частный ужин`, `Приватные мероприятия` and `Мастер-классы` in the same `story` section and cream surface |

No replacement copy or decorative separator is introduced. Existing event names, descriptions,
photographs, alternating sides and the following `Я — у вас дома` chapter remain unchanged.

## Trivium ADR typography system — 2026-09-01

The user supplied [triviumadr.com](https://triviumadr.com/?rdt_cid=5516680977717612655) as the exact
reference for fonts, type sizes and text colors. Computed styles were inspected at 1280 × 720 and
390 × 844 rather than inferred from appearance.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Display headings | Trivium hero: Cormorant Garamond 300, 88/96.8 px desktop and 44.8/49.28 px phone; section heading: 400, 48/57.6 px desktop and 32/38.4 px phone | Quiet high-contrast serif replaces oversized heavy sans display type; one italic serif phrase may carry emphasis | Trivium wording, dark hero, gold-on-black composition, logo or page layout | Hero uses a 44.8–88 px Cormorant scale; all section headings use a 32–48 px scale; existing Russian copy and emphasis positions remain |
| Body and interface text | Trivium body: Montserrat 300, 16/27.2–28.8 px; card copy 14.08/25.344 px; nav 12/16.2 px desktop and 13.6/18.36 px phone; labels 11.2/19.04 px, uppercase with wide tracking | Light geometric sans for long copy; compact but open line-height; small labels differentiated by weight and tracking | English text, legal-site density, form styling or generic card composition | Main narrative copy uses 16/1.8 Montserrat; supporting copy 14/1.8; navigation/actions 12–13.6 px; labels 11.2 px with 600 weight and .25em tracking |
| Text colors on cream | Trivium computed text roles: `#F5F0E8` primary, `#B8B0A0` muted, `#C9A84C`/`#E2C47A` gold, `#A0792E` dark gold and `#0A0A0A` inverse text; existing approved cream `#F4EFE5`/`#FCFAF5` surfaces | Preserve the reference's black / muted neutral / gold hierarchy while maintaining readable contrast on the user's cream background | Trivium's black page background, low-contrast pale text on cream or a new full-site dark theme | Use exact `#0A0A0A` for primary text, a contrast-safe dark taupe derived from `#B8B0A0` for secondary copy, and `#A0792E` only for large/accent text; tiny labels use a darker gold descendant |
| Smooth scrolling | Trivium computed `html { scroll-behavior: smooth; }`; no Lenis, Locomotive Scroll, GSAP or ScrollTrigger runtime detected | Native smooth anchor travel without scroll hijacking or inertial lag | Trivium's dark custom scrollbar, JavaScript scroll interception or continuous motion | Retain the site's existing native `scroll-behavior: smooth`; keep the existing `prefers-reduced-motion: reduce` override to `auto` |

The typefaces are locally hosted from the same Google Fonts families referenced by Trivium. Existing
cream surfaces, photographs, content order, layout, interactions and component geometry are unchanged.

## Three-photo sourcing correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Product-sourcing photographs | User's exact instructions `Оставь фото рыбы, овец и шефа с виноградом и выровняй блок`, `3 остальных фото убери` and `Продавца на лодке удали`; inspected active sheep, boat/catch, Larnaca fish display and Evgen grape-harvest files | One documentary photograph per category, with a common aligned aperture and no duplicate evidence | Meat-counter, boat/catch and strawberry-greenhouse photographs; a three-card template; changed category copy; cropped identity or invented sourcing claims | Keep only `cyprus-sheep-herd.webp`, `larnaca-fish-market-seller.webp` and `evgen-grape-harvest.webp`; each source row uses the same single-image field and complete-frame `contain` treatment |

The removed photographs remain inactive source history in the repository; they do not render on the
site. Typography, cream palette, category statements, row order and later inquiry block remain fixed.

## Readability and responsive-layout correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Header at 375–390 px | Independent UX/UI live audits requested by the user | The wordmark and primary action must fit without hidden horizontal overflow | No hamburger, abbreviated brand or new navigation pattern | Narrow-screen type, tracking and padding contract; the decorative arrow may disappear only at 380 px and below |
| Hero at 561–820 px | User-approved layered hero plus both audits | Preserve text-first chronology while reducing the media stage from a phone portrait slab to a compact 8 × 5 collage | No new hero copy, buttons or template composition | Text remains above; the collage becomes 8 columns × 5 rows and the chef stays layered over it |
| MasterChef story | Supplied mobile captures and repeated user direction | One story: proof image and first paragraph together; the transition paragraph reconnects the proof to all three formats | No separate services heading or detached biography block | Desktop remains 6/5, tablet becomes 5/7, phone uses a 4/8 first row followed by the second paragraph across all 12 columns |
| Three event formats | User-approved compact phone pairs and both audits | Photo and text remain adjacent at every width; alternating direction supports scanning | No full-width tablet image stack and no cards | Desktop uses balanced 7/5–5/7 rows, tablet uses 5/7–7/5 pairs, phone preserves 4/8 pairs |
| Present-day chapter | Approved chronology and documentary film | `Я — у вас дома` follows all three formats and keeps text and film legibly related | No relocation before the formats | Desktop and tablet use paired columns; phone keeps text before the 9/16 film |
| Sourcing rows | User-selected sheep, fish-market and grape images | Full uncropped evidence stays aligned but should not dominate the narrative | No replacement crop or extra image | Desktop media is capped at 640 × 480, tablet remains paired, phone stays linear; aperture reserve uses the section cream |
| Image loading surfaces | Approved cream palette and live-audit evidence | Delayed imagery must fail softly into the page surface | No black skeleton, shimmer or invented placeholder art | Hero collage, portrait and documentary apertures use cream backgrounds; the first collage row is requested eagerly |

The 8/5 tablet hero stage, 5/7 tablet pair ratios, 640 × 480 sourcing cap and 380 px arrow cutoff are neutral implementation decisions derived from measured overflow and content proportions. They do not introduce a new visual style.

## Mobile reading repair from current production captures — 2026-09-01

This correction supersedes the earlier phone rule that kept each complete event description beside
its photograph.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef phone copy | Two user-supplied 20:41 production captures and the direct feedback `Это смотрится и читается не красиво, нужно переделать`; approved Trivium-derived type roles | Preserve the proof/text relationship without forcing the complete paragraph into a narrow vertical tower | New typeface, black section, larger proof, card, caption, duplicated summary or reordered story | The small proof floats left: the opening paragraph begins beside it, then naturally uses the full width below; the transition paragraph follows; below 560 px both paragraphs use existing primary ink and Montserrat 400 |
| Event-format phone rows | Same two production captures; prior direct requirement that images stay small and text stays beside or slightly below; approved editorial-pair system | Adjacency is satisfied by pairing the photograph with the number/title; long explanation belongs immediately below that pair on the full measure | Full-width image slab, all-copy narrow tower, equal card, horizontal scroll, accordion, hidden text, new label or extra divider | In each alternating row, the existing photograph and number/title occupy row one; the existing description spans all twelve columns in row two with no intervening content |
| Phone event hierarchy | Trivium-derived Cormorant/Montserrat families and the current captures' weak visual hierarchy | Make the event name clearly precede its explanation through existing family weights and primary color | Imported font, oversized landing-page heading, arbitrary accent color, shadow or decorative badge | Existing numbers remain gold; event headings use loaded Cormorant 600; descriptions use loaded Montserrat 400 and `--ink` |

No desktop/tablet layout, content, imagery, section, chronology, palette or interaction changes.

## Compact mobile sourcing ledger — 2026-09-01

This correction supersedes the earlier phone rule that placed every sourcing photograph at full
content width after its text.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Three sourcing rows on phone | Latest user-supplied 21:00 production capture and direct rejection `Это смотрится ужасно`; earlier exact instructions to retain sheep, fish and grape photographs and align the block | Three short sourcing facts form one compact aligned ledger; image evidence stays adjacent and subordinate instead of consuming a separate screen | Full-width repeated image slabs, alternating gallery, cards, cropped photographs, hidden statements, new categories, icons or decorative labels | At 560 px and below every row uses the same 5/7 text/media grid: number and category share the first text line, the exact statement follows beneath, and the complete photograph remains inside a small `4 / 3` field on the right |
| Sourcing statement hierarchy | Approved Trivium-derived roles and the supplied capture’s visibly weak pale italic text | Preserve the established italic serif voice while using a contrast-safe existing gold role and compact leading | New font, black panel, enlarged marketing quote, extra caption or arbitrary color | Phone statement uses Cormorant Garamond italic at 18–20 px / 1.35 and existing `--accent-small`; number and title remain clearly subordinate to the photograph/text pair |

Desktop and tablet source grids, exact content, imagery, order, `contain` behavior, section surfaces and
all surrounding blocks remain unchanged.

## Livelier Evgen sourcing route — 2026-09-01

This correction supersedes the earlier exact sheep / seller / grape image set and the temporary
same-side mobile ledger rule.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Sourcing photography | Latest supplied 21:34 production capture; direct request `Этот блок нужно сделать красивее, живее, и сгенерировать подходящие фото`; correction `Фото шефа с виноградом можно оставит, и сгенерировать его на мясном и на рыбном рынке`; correction `Слишком не реалистично, нужны разные ракурсы`; direct half-lamb and slimmer-chef instructions; real local Evgen grape and portrait references; approved `PHOTO-002` and `PHOTO-006` editorial-photo roles | Keep the real identity present through the whole sourcing journey while giving each scene a different observed camera position: wide three-quarter meat inspection, side/over-counter fish selection, frontal real harvest portrait | Generic market stock, repeated front-facing pose, anonymous or redesigned chef, named vendor/logo, visible price, graphic carcass, copied market, generated grape replacement, new copy or claim that a generated scene documents an actual supplier visit | Generate one 4:3 meat-market view with a naturally slimmer Evgen and a professionally dressed half lamb, plus one 4:3 harbour-market side view; retain `evgen-grape-harvest.webp`; record prompts/provenance and use neutral descriptive alt text |
| Sourcing row rhythm | Same user request for a livelier block; existing project-approved alternating editorial-pair principle; Central, noma and Cardinali references | Movement comes from side alternation and human action inside each frame, not ornament or animation | Bento grid, cards, full-width phone posters, horizontal scroll, decorative hover, overlap, random aspect ratios or hidden copy | Row one is text/photo, row two photo/text, row three text/photo at desktop, tablet and phone; 5/7 proportions mirror for row two, all media remain 4:3 and square-edged |

Unreferenced neutral values are limited to the exact identity-preserving prompts, generated filenames
and the existing 16 px phone gap. No new color, typeface, copy, component or interaction is introduced.

## Exact Trivium dark typography and color correction — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Whole-page palette | User-supplied current-vs-Trivium phone captures; live [Trivium ADR](https://triviumadr.com/?rdt_cid=5516680977717612655) computed variables at 1280 and 390 px | Preserve the reference's explicit dark hierarchy: black and soft-black surfaces, warm-white headings, warm-grey explanation, gold display emphasis and gold primary action | Legal-services identity, logo, background grid, vignette, gradient, content, navigation model or page composition | `#0A0A0A` / `#111111` surfaces, `#F5F0E8` primary text, `#B8B0A0` body, `#E2C47A` display accent, `#C9A84C` labels/action, `#2A2A2A` rules across the existing chef layout |
| Display typography | Same direct correction; live Trivium `h1`, `h2`, `h3` and italic computed styles | Thin Cormorant 300 hero, Cormorant 400 section/tertiary headings, italic 300 gold emphasis | English legal line breaks, logo lettering, copied hero wording or a new heading | Keep existing Russian content and geometry; enforce 44.8–88 hero, 32–48 section and 20 px tertiary Cormorant roles with no mobile 600-weight override |
| Explanatory typography | Same direct correction; live Trivium body, hero text and service-card paragraphs | Montserrat 300 and warm-grey color make explanation clearly subordinate without becoming faint | Legal copy, card widths, form labels or low-contrast text | Narrative copy uses 16/1.8 and supporting copy approximately 14–15/1.8 in `#B8B0A0`; mobile paragraphs no longer switch to black/400 styling |
| Inquiry action | Live Trivium primary action color/type role; current single Instagram conversion path | One flat gold action closes the dark reading journey with black uppercase utility text | Reference button wording, gradient, second CTA, form or reservation behavior | Existing Instagram action becomes flat `#C9A84C` with `#0A0A0A` text, 12/1.35 Montserrat 600 and the current square geometry |

The exact crop maps, photographs, content order, source-row alternation, navigation destinations,
media behavior and section geometry remain project-owned and unchanged.

## User correction: Trivium is typography-only — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Whole-page palette | User correction `Вместо того что бы изменить шрифты ты цвет сайта поменял`; last approved cream release at commit `831383c` | Preserve the existing cream visual identity exactly | Trivium black surfaces, gold-filled CTA and dark favicon | Restore cream/ivory surfaces, black primary type, muted warm-grey copy, restrained brown-gold accents and the previous favicon colors |
| Typography and scroll | User-supplied Trivium comparison and live measured type values | Keep Cormorant Garamond/Montserrat families, measured scale, weights, tracking and smooth/reduced-motion behavior | Trivium palette, legal branding, background grid or page composition | Retain the current type rules and balanced eyebrow wrap while changing no layout, content or media |

This correction supersedes only the dark-color portion of the preceding map. The measured Trivium
typography remains approved.

## Typographic completion after user clarification — 2026-09-01

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Existing font families | Live Trivium CSS and loaded font files | State the factual constraint: both sites already use Cormorant Garamond and Montserrat | Claiming an unchanged family is a new font | Retain the exact families and make the visible change through the reference's numeric roles |
| Hero and section scale | Live Trivium `clamp(2.8rem, 7vw, 5.5rem)` and `clamp(2rem, 4vw, 3rem)` | Match the actual fluid scale rather than a near approximation | Trivium wording and line breaks | Change hero interpolation to 7vw and section-heading interpolation to 4vw |
| Body and supporting rhythm | Live Trivium Montserrat 300 body and action metrics | Apply exact leading/weight to narrative, facts and CTA roles | Legal-site content density | Use 16/1.7 narrative, 13.6/1.7 workday facts and 12/1.7 primary action while preserving current geometry |
| Header/footer utility type | Live Trivium header CTA and contact/footer roles | Make the typography visibly systematic at the page edges | Trivium logo, footer copy or mobile menu | Use 11.2/.14em desktop header action, 13.6/.14em mobile where it fits, 24 px desktop footer wordmark and 14.72 px Instagram contact |

## Header simplification and title entry — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Header link strip | User-supplied phone capture from 2026-09-02 and direct instruction `Удали о шеф, форматы, продукты` | Keep only the identity and the single useful top action; remove the redundant second navigation row | Hamburger menu, replacement links, icons, empty navigation reserve or a new CTA | Remove `о шефе`, `форматы` and `продукты` from the header at every width; retain the wordmark and `обсудить вечер` action in one row |
| Hero credential | Same capture and direct instruction `и про победителя` | The chef's name should begin the hero without a separate credential label delaying it | Replacement eyebrow, badge, trophy icon, decorative rule or rewritten claim | Remove only `Победитель «МастерШеф. Профессионалы — 2»` above the hero title and close the resulting empty margin; keep the complete title, collage, portrait and every post-hero block |
| Footer navigation wording | Same direct instruction to remove the three labels | A removed navigation label should not reappear later as a duplicate utility link | Removing contact access, social link, wordmark or section content | Remove the same three links from the footer navigation while retaining `контакты`, the wordmark and Instagram link |

## Mobile Hero title density — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Hero title at 375–430 px | User-supplied phone capture from 2026-09-02 and direct instruction `Шрифт надо мельче, что бы вот так помещалось на Хиро на 1 скрол` | Reduce only the phone display scale and leading so the title completes sooner and the collage enters the same reading view | New wording, desktop/tablet type changes, compressed body text, smaller media, hidden portrait or a full-viewport redesign | Keep Cormorant Garamond 300 and the five approved title beats; use a fluid phone size of about 38–41 px with 1.05 leading, retaining the existing copy inset, collage and portrait |

## Exact Trivium webfont binaries — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Display serif, normal | Live Trivium HTML, exact `fonts.googleapis.com` CSS request and referenced `fonts.gstatic.com` Cormorant Garamond v21 binaries | Use the same WOFF2 bytes and the same 300/400/600/700 face mapping, not merely a family name or a separately sourced TTF | Trivium wording, dark palette, legal-site layout or its desktop/mobile line breaks | Self-host all five exact v21 Cyrillic-ext/Cyrillic/Vietnamese/Latin-ext/Latin normal subsets with the reference ranges and weight declarations |
| Display serif, italic | Same live request and v21 binary response | Use the exact italic WOFF2 bytes behind both reference weights 300 and 400 | A synthetic italic, different release, converted file or substitute script face | Self-host all five exact v21 italic subsets; all existing gold italic roles use these real italic outlines |
| Sans-serif reading face | Live Trivium request for Montserrat v31, `fonts.googleapis.com` CSS and `fonts.gstatic.com` binaries | Use the same v31 WOFF2 bytes for 300/400/500/600 with the reference subset boundaries | Another Montserrat build, local TTF export, synthesized weight, Trivium copy or color system | Self-host all five exact v31 subsets and retain the already measured Trivium size/weight/leading roles |
| Existing site geometry | User's immediately preceding smaller-Hero instruction and all approved field-journal captures | A font-binary correction must not silently undo the latest layout decision | Reverting the 38–41 px mobile Hero, changing colors, media, spacing or section order | Preserve the compact mobile Hero override and every approved layout/content rule; only exact font delivery, measured `text-rendering: auto` parity and proof tests change |

## Denser Hero photo field — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Background collage density | Direct user instruction `На Хиро блоке нужно фото сделать квадратики меньше, но самих фото больше` and the current approved layered Hero | Increase documentary density by reducing each background cell while retaining the collage as one continuous field behind the identity portrait | Bento cards, new decorative frame, horizontal scroll, enlarged Hero, changed title, generated identity, altered foreground crop or repeated empty cells | Expand the existing local documentary pool to 104 source paths; show 80 cells in an 8 × 10 wide grid, 77 in a 7 × 11 compact-desktop grid, 96 in a 12 × 8 tablet grid and all 104 in an 8 × 13 phone grid so cells remain close to square at each stage ratio |
| Foreground chef portrait | Direct user constraint `ключевое фото шефа не трогай`; existing approved `chef-hero-apron.jpg` layer | The portrait remains the fixed identity anchor while only the photographic context behind it becomes denser | Source replacement, crop, size, position, caption, z-index, optical adjustment, filter or loading change | Preserve the existing portrait markup and every `.hero-apron` rule verbatim at desktop, compact desktop, tablet and phone breakpoints |

The exact grid counts are neutral fitting values derived from the four existing Hero-stage aspect
ratios; the direct reference defines smaller cells and more photographs but no numeric count.

## Hero collage empty-space correction — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Phone collage count and packing | User-supplied current phone capture and direct instruction `Сделай в коллаже просто на 10 фото меньше и не будет пустых мест` | Reduce the active field from 104 to exactly 94 photographs and close every exposed grid cell instead of leaving cream-looking reserve around or below the portrait | New imagery, repeated filler, enlarged portrait, changed Hero copy, card/bento treatment, decorative background or altered palette | Remove ten pale/low-context supplementary crops, keep the first forty approved sources, reorder the retained archive frames around the visible perimeter and use twelve phone rows; two unused equal cells are positioned wholly beneath the opaque portrait at phone and tablet sizes so every exposed track is photographic; eager requests plus synchronous decode prevent loaded tiles from remaining visually unpainted |
| Foreground portrait | Same instruction in the context of the immediately preceding `ключевое фото шефа не трогай` constraint | Correct only the background field; identity remains the stable visual anchor | Crop, scale, source, caption, position, z-index, preload or responsive geometry change | Preserve `chef-hero-apron.jpg` markup and all `.hero-apron` declarations byte-for-byte |

## Mobile story-pair repair — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof on phone | User's three current production captures and direct rejection; approved compact paired-reading references: [Clare Smyth biography](https://www.claresmyth.com/biography), [Mugaritz](https://www.mugaritz.com/en/) and [Noma](https://noma.dk/) | A documentary photograph and its complete explanation must remain one local reading unit; no paragraph may appear to belong to the next block | External brand identity, page geometry, card styling, full-width portrait, timeline, badge or rewritten biography | Replace the float with the existing twelve-column editorial grid: small proof at 4/12 and both unchanged paragraphs together at 8/12 |
| Event formats on phone | Same supplied captures; user's standing instruction that photos stay small and text sits beside them; existing approved 01/03 photo-left and 02 photo-right rhythm | Number, title and description are one copy object beside the related photograph; alternation provides movement without separating content | Full-width description rows, stacked cards, horizontal slider, iconography, new copy, larger photos or a new surface | Keep each format in one grid row; restore `.format-copy` as a real side column containing number, heading and paragraph; retain 5/7 alternating placement and square edges |

The phone-only type and spacing values are neutral fitting decisions derived from the existing image
apertures and copy lengths. Desktop, tablet, Hero, palette, fonts, content and `Я — у вас дома`
remain unchanged.

## Mobile media scale and illustrated close — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| `Я — у вас дома` film | User-supplied current phone capture and direct correction that the video is too small; standing requirement that phone film remains 9:16 with its text beside it | Give the documentary film enough visual weight to read as the principal evidence while preserving the adjacent working-day text | Full-width or full-screen video, 4:3 phone crop, detached text, horizontal scroll, device frame or replacement footage | At 560 px and below change the pair from 7/5 to 5/7 columns; retain 9:16, square edges and cover fitting, and stack each small time label above its unchanged sentence inside the narrow copy rail |
| Personal-menu introduction | Same supplied capture and direct rejection of a large text-only cream field; approved compact paired-reading system | Treat heading and explanation as one compact editorial pair so the first sourcing photograph enters the same reading movement | Decorative filler, duplicated sourcing photograph, new ornament, card, background texture or removed copy | At phone widths place the unchanged heading and unchanged lede beside one another on the twelve-column grid, tighten only their local gaps and pull the first sourcing row upward |
| Inquiry close | Same supplied capture and direct rejection of a blank text-only ending; previously user-approved `chef-story-brush-villa.png` and its complete-canvas rule | Let the existing illustration provide atmosphere and visual closure while the single verified Instagram action remains explicit | Stock venue, claim that the scene is real, cropped/zoomed art, green page surface, extra CTA, contact form or decorative overlay | Restore the exact 1536 × 1024 illustration. Above 1024 px it sits complete behind the left-side invitation group; at 1024 px and below it is a separate complete 3:2 figure between heading and action |
| Phone footer | Same phone capture and existing compact-footer rule | Use the footer for identity and navigation rather than letting three minimum-height links become another empty section | New footer copy, image, columns of corporate links, smaller targets or hidden Instagram destination | Keep the wordmark on the first row, then place `контакты` and Instagram beside one another on the second row; retain 44 px targets and reduce only outer padding and row gaps |

Exact mobile grid spans, 10 px local gaps and compact padding are neutral fitting values derived from
the current 375–430 px content widths. No new visual source or UI-library component is introduced.

## Selected alternative: Mise en place blueprint — 2026-09-02

Status: active only for the independent `codex/mise-en-place-blueprint` review version. The primary
visual source is the user-selected local bitmap
`design/mockups/premium-graphic-directions-2026-09-02/04-mise-en-place-blueprint.png`; its generated
copy, numbers and photographic content are explicitly non-authoritative.

For this independent branch, the approved portrait-film composition below supersedes the historical
rows that require a desktop/tablet `4 / 3` aperture. Those rows remain as provenance for earlier
releases, not as active geometry for this review version; the film is `9 / 16` at every width.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Header and Hero | Existing approved interface at `3f7a2f8`; direct requirement to preserve Hero | Keep the established two-item header and the complete layered 94-photo identity field as the opening anchor | Blueprint mockup's cropped opening, new badge, menu, copy, collage treatment or portrait change | Leave header/Hero content, sources, geometry, typography, palette and responsive maps unchanged |
| MasterChef proof | Existing approved `story-origin`; exact local award photograph and biography; blueprint's horizontal drafting rhythm | Keep proof and biography as one factual editorial pair; use the following preparation drawing to lead into service formats | Invented award facts, copied mockup photography, technical labels, credential badge or decorative frame | Preserve exact photo and both paragraphs; follow them with one restrained knife → cutting → serving preparation sequence outside the media bounds |
| Event formats | Selected blueprint's knife/cut/serving contours; exact three approved format photographs and descriptions | One shared preparation grammar connects three real scenarios while each photo/copy pair keeps its own proportion and direction | Three icon cards, equal panels, one arbitrary icon badge per service, copied generated photos or new format copy | Retain the three ordered rows and alternating phone pairs; introduce one shared contour route and section-specific reserves instead of another repeated card/grid system |
| Workday | Selected blueprint's large preparation arc; exact current `утро → день → вечер` list and chef film | Turn the three real workday statements into one readable trajectory with three aligned nodes beside documentary media | `06:00`, `12:00`, `18:00`, clock ticks, temperatures, travel data, pictogram badges or invented annotations | Desktop/tablet use one open double arc aligned to the three HTML list items; phone collapses it to one vertical route with three large nodes between the copy and the adjacent 9:16 film |
| Personal-menu introduction | Selected blueprint's measured plating plan and photographed plate; exact current heading/lede; existing approved `gallery-dish.webp` | Concentric plate construction around real project media gives the menu explanation a visual object and shows inputs converging into a personal result | Generated mockup steak/dish, diameters, units, flavour claims, handwritten copy or scientific precision | Place the existing local dish inside one static concentric composition diagram; leaders use only `любимые вкусы`, `ограничения` and `персональное меню`; authoritative copy remains HTML |
| Ordered sourcing route | Selected blueprint's ingredient contour studies and three-row anatomy; exact existing meat → fish → produce content, media and provenance register | One continuous ordered spine and three distinct culinary studies make the source sequence legible without turning it into cards | Supplier names, vendor marks, cut names, anatomy claims, weights, centimetres, routes, generated replacement photos or claims that illustrative scenes prove real visits | Keep the exact three rows/photos/statements; add an open-cut study, fish contour and produce/field study in dedicated desktop reserve; phone hides detail and retains only the ordered nodes plus adjacent text/photo pairs |
| Inquiry and villa | Existing approved complete `chef-story-brush-villa.png`; direct requirement to preserve the full villa | The known complete illustration remains the final visual resolution after the drafted preparation journey | Blueprint mockup's spoon-only bordered close, new venue claim, form, additional CTA or cropped villa | Preserve the complete 3:2 villa behavior and the single verified Instagram action at every breakpoint |
| Typography, palette and geometry | Existing approved design system and direct user constraints | Draw with the existing ink/rule/gold roles on cream; preserve the exact Cormorant Garamond/Montserrat hierarchy and square media | Handwritten mockup font, green field, technical-blue surface, gradient, paper texture, radius, shadow, glass or library theme | Use current tokens only; one-pixel strokes, sparse dashed construction lines, square apertures and no decorative animation |
| Mobile composition | Direct instruction to keep only large understandable nodes and media beside copy; current approved 12-column phone pairs | Simplify information density rather than mechanically stacking desktop diagrams | Independent tall diagram sections, microtype, hatch noise, hidden photos, horizontal scroll or full-width card stack | Keep formats and sourcing paired, workday copy beside film, reduce diagrams to major route/plate nodes, and verify 430/390/375 px independently |
| Footer | Existing approved compact footer | Preserve identity and two useful destinations without turning the close into a second marketing section | Corporate link columns, added navigation, social icons or blueprint decoration | Keep current wordmark, `контакты` and Instagram link with 44 px targets |

Neutral decisions without direct reference are limited to the exact SVG coordinates, line dash cadence,
responsive hiding thresholds and local spacing required to fit the existing content. They may use only
the documented tokens and must be validated at every mandatory width. No UI library supplies visible
styling; React/Next/Vinext remain infrastructure.

## Rejected exploration: raster blueprint backgrounds — 2026-09-02

This historical stage recorded the first interpretation of the raster-background request. The three
free-form ImageGen sheets described below were subsequently rejected by the user and are not active
assets. The later exact-mockup correction and final implemented raster map are authoritative.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Formats background | Direct request for a distinct drawn background; selected blueprint's preparation language | One continuous knife → cutting board → serving-cloche atelier sheet gives the format chapter a tangible mise-en-place identity | Reference page layout, words, measurements, times, handwriting, photography or blue technical paper | `preparation-sheet.webp` is a non-semantic CSS background with quiet live-content reserves; existing photographs and exact copy stay above it |
| Workday background | Direct request; selected blueprint's open movement; exact current morning/day/evening narrative | Exactly three large illustrated anchor scenes are joined by one open route behind the workday copy and portrait film | Literal clock, ticks, time labels, dashboard timeline, fake data or replacement documentary media | `workday-trajectory-sheet.webp` replaces the visible SVG arc while the exact HTML list and 9:16 film remain authoritative |
| Menu and sourcing background | Direct request; selected blueprint's plate and ingredient studies; exact current sourcing chapters | One large plate construction and three separate meat/fish/produce studies form the chapter's background field | Generated reference dish/copy, anatomy or supplier claims, labels, units, cards or replacement sourcing photographs | `menu-sourcing-sheet.webp` replaces the visible plate/source SVGs; real project sourcing media remain the foreground evidence |

All three backgrounds use only the approved ivory, ink, rule-grey and restrained brass roles. They
contain no readable text, number, unit, logo or watermark and are illustrative rather than documentary
evidence. Live HTML, documentary media and actions always remain above the image layer.

### Per-block expansion

The user's immediate clarification `Для каждого блока делай картинку` expands the raster system from
three chapter sheets to one distinct image per semantic content block. Hero already owns its approved
photographic collage and inquiry already owns the complete villa; those are retained rather than
replaced. New original background sheets are required for MasterChef origin, each of the three event
formats, workday, personal-menu introduction, meat, fish and produce. No sheet may be reused as a
generic repeated texture.

The next direct clarification is authoritative: all original documentary photographs and exact live
text remain unchanged; generated images are background layers, never content replacements. Each asset
must visibly behave as a scheme or drawing through routes, nodes, axes, cut studies, construction
circles and process relationships—not as a standalone decorative culinary picture.

### Exact-mockup correction

The user's rejection `тут в чем чертеж? Что мы тут измерили?` and instruction to redraw the original
mockup supersede the free ImageGen background expansion. Active backgrounds must be faithful isolates
of the supplied original's actual diagram vocabulary: workday semicircle with `06:00 / 12:00 / 18:00`,
plate construction with `Ø 280 / Ø 180 / Ø 60`, meat and fish section studies with the original
`0 / 10 / 20 cm` scale, and the produce component/radial study. No newly invented atelier scene or
decorative process image is approved. Original live text and documentary photos remain unchanged.

Final format constraint: every new diagram ships only as a raster WebP background. No SVG diagram is
rendered, referenced or retained in the site source. The exact-mockup geometry is rasterized into one
background asset per applicable block.

### Final implemented raster map

This table supersedes the earlier exploratory SVG and free-generation maps for the active review build.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Workday | User high-resolution capture and selected original mockup | Measured daily arc with three real stages, time anchors, ticks and sun/moon orientation | Reference photograph and generated body copy | `workday-plan.webp` is the `.story-present::before` background; exact HTML list and original 9:16 film remain foreground |
| Personal menu | Same supplied reference; existing `gallery-dish.webp` | Plate diameters and construction axes surround a real project dish | Generated steak photograph or replacement copy | `menu-plate-plan.webp` is the `.sources-intro::before` background; the existing dish remains a separate foreground image |
| Meat chapter | Same supplied reference; exact meat chapter content | Animal/portion construction plus the approved `0 / 10 / 20 cm` scale identifies what is being studied | Anatomy claims, cut names, weights or supplier claims | `meat-cut-plan.webp` is the `.source-row-1::before` background behind the unchanged photo and text |
| Fish chapter | Same supplied reference; exact fish chapter content | Whole-fish/fillet section sequence plus the approved scale | Species, weight, freshness or supplier claim | `fish-cut-plan.webp` is the `.source-row-2::before` background behind the unchanged photo and text |
| Produce chapter | Same supplied reference; exact produce chapter content | Individual ingredient studies and a four-part sensory radial | New dietary claims, percentages or farm identity | `produce-balance-plan.webp` is the `.source-row-3::before` background behind the unchanged photo and text |
| Inquiry | Supplied reference's spoon close; existing complete villa | Sauce route resolves the drafting sequence into the final serving gesture | Replacement villa, form, second CTA or new contact method | `contact-spoon-plan.webp` is the `.contact::before` background; the complete villa and verified Instagram action remain foreground |

No new drawing is assigned to Hero, MasterChef proof or the three event-format rows because the user
explicitly asked to return to the original mockup and that reference provides no distinct measured
drawing for those current-site blocks. Inventing additional pseudo-measurements would violate the
reference-driven policy. Their approved photographs, copy and editorial geometry therefore remain the
only active references.

## User-approved per-block raster previews — 2026-09-02

This table supersedes the preceding no-drawing decision only for the three rows explicitly approved by
the user. It is a partial review map; unapproved blocks retain their current implementation.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof drawing | Direct user instruction `лучше рецепты нарисовать и карту европы`; approved generated preview; selected `04-mise-en-place-blueprint.png` | Make European culinary experience immediately readable through concrete recipe sheets and one geographic route | Reference copy, flags, country borders, labels, trophy, diploma claim, replacement photograph or altered biography | Add the approved 1774 × 887 raster as one complete decorative `<img>` below the unchanged award-photo/biography pair |
| Private dinner drawing | Direct user approval of the generated six-place/seven-course preview; exact private-dinner copy | Show a personal multi-course evening as one preparation-to-table sequence rather than a generic service icon | New menu claims, guest identities, restaurant floor plan, replacement photo, card treatment or invented text | Add the approved 1774 × 887 raster as the third field beside the unchanged private-dinner photo/copy pair on wide screens and beneath the pair on tablet/phone |
| Private-event drawing | User rejection of the abstract cocktail-table route followed by direct approval of the canapé study; exact private-event copy | Use a concrete tray and three assembly studies so the drawing describes small, conversation-friendly food at a glance | Rejected branching diagram, people markers, new event claims, changed photo/copy, repeated dinner table or recipe/map motif | Add the approved 1774 × 887 raster as the leading third field beside the unchanged private-event pair on wide screens and beneath it on tablet/phone; the rejected preview remains outside the project |

Neutral fitting decisions are limited to the vertical gap around each complete 2:1 image and the
responsive maximum width needed to preserve the existing reading order. No visible UI-library styling
is used.

## Process-first blueprint correction — 2026-09-02

The user clarified that the blueprint concept means designing the process, not illustrating the
subject. This correction supersedes the detached photo/copy/drawing three-field treatment and the
object-only meaning of the three recently approved raster sheets. Photographs and film remain the
documentary foreground; a unique raster blueprint behind each meaningful media block must explain how
that photographed result is planned and produced. The blueprint must remain visible around the
foreground media and in a 10–15% strip below it. Work continues one block at a time, with the private
dinner as the first approval prototype.

| Project element | Reference | Principle used | What is not copied | Planned project implementation |
|---|---|---|---|---|
| Hero — personal chef | Direct process-first correction; current Hero copy and documentary collage | Design the complete evening as request → sourcing → mise en place → cooking → service, with Evgen as the foreground control point | Generic service funnel, dashboard flowchart, labels inside generated art, replacement portrait or redesigned collage | One restrained master-process raster behind the existing identity layer; the 94-image field remains documentary context rather than 94 separate diagrams |
| MasterChef origin | Same correction; exact biography; selected `04-mise-en-place-blueprint.png` | Show victory → European/Mediterranean learning → recipe/technique archive → transformation into an authored dish and service formats | Trophy poster, travel map alone, flags, copied countries, invented venues or biography changes | Rework the recipe/map sheet into a causal route; keep the award photograph above it and expose the final transformation below the photo |
| Private dinner | Same correction; exact seven-course copy; current dinner photograph | Show preferences/restrictions → menu choice → parallel mise en place → seven-course rhythm → shared table | A decorative row of plates, fixed guest count, invented dishes, restaurant floor plan or readable generated labels | First prototype: a process raster behind the unchanged photograph, with critical stages at the sides and a visible service route below it |
| Private event | Same correction; exact small-bite/free-conversation copy | Show batch preparation → assembly rules → tray loading → circulation → replenishment | Canapé anatomy alone, cocktail-table ornament, invented guest count, venue plan or menu claims | Extend the accepted canapé language into a production-and-replenishment loop behind the unchanged action photograph |
| Masterclass | Same correction; exact demonstration/participation/shared-table copy | Show chef demonstration → guest repetition → correction → joint finish → shared table | Classroom icon set, certificate, fixed participant count, copied lesson text or replacement photo | Create one process raster behind the unchanged masterclass photograph; the route must visibly pass from chef station to participant stations and finish below at the table |
| `Я — у вас дома` | Same correction; exact morning/day/evening list; current portrait film | Show sourcing → preparation → packing/transport → on-site cooking → evening service | Clock ornament alone, invented times, delivery claim, new steps in HTML or replacement film | Replace the isolated day arc with a logistics route behind the live 9:16 film; preserve the three authoritative HTML phases |
| Personal menu | Same correction; exact preference/restriction copy; current plated dish | Show brief → compatible seasonal ingredients → flavor/texture decisions → course sequence → final plate | Plate diameters alone, decorative circles, invented allergens, ingredients or menu | Build the decision route around and beneath the unchanged circular dish foreground; factual labels remain HTML only |
| Meat sourcing | Same correction; exact mountain-lamb statement and current market image | Show request → source journey → inspection → butchery → selected cut → cooking/service | Cow anatomy copied from the mockup, supplier claim, temperature, weight, certification or new provenance | A lamb-specific process raster behind the unchanged photograph; inspection and cut-selection nodes remain visible at the edge and below |
| Fish sourcing | Same correction; exact port statement and current harbour image | Show request → harbour selection → freshness check → filleting → portioning → cooking/service | Fish silhouette alone, named boat/vendor, catch time, weight, species claim or invented scale | A harbour-to-plate process raster behind the unchanged photograph, with check and portioning stages visible outside the media safe zone |
| Produce sourcing | Same correction; exact Cyprus-farm statement and current grape image | Show season/farm → harvest → ripeness check → sorting → pairing → menu component | Produce icons alone, invented farm, season, variety, taste score or replacement photograph | A farm-to-component process raster behind the unchanged grape photograph; sorting and pairing branches continue into the lower visible strip |
| Inquiry close | Same correction; exact invitation and Instagram action; approved complete villa art | Show guest wish → conversation → evening brief → menu/sourcing/preparation → table encounter | Decorative spoon alone, contact-form fiction, response-time promise, booking status or a second CTA | Keep the complete villa as the final foreground atmosphere and add a single closing process route behind it, ending at the table |

The only confirmed generated-art vocabulary is warm ivory paper, thin graphite construction,
graphite dash for hidden/preparatory relationships and one muted-brass main route. Empty rings denote
stages, double rings denote checks/handoffs, filled dots denote inputs and a target denotes the outcome.
Generated raster art contains no readable words, letters, numbers, supplier facts, temperatures,
weights or timings. Exact factual labels remain live HTML. Hero treatment and mobile overlap values
remain explicitly undecided until the first private-dinner composition is approved.

## Rejected detached drawings removed from review — 2026-09-02

The user's phone capture and direct rejection of the published fish/produce composition supersede the
earlier raster-background and approved-preview maps for the current review state. The problem is not
the documentary content: it is the detached subject drawing and the large space reserved for it. Until
a process-first replacement is separately shown and approved, a block must contain no blueprint layer
and must reserve no blueprint space.

| Project element | Reference | Principle used | What is not copied | Current review implementation |
|---|---|---|---|---|
| Private dinner | Approved process-first prototype and direct instruction to apply it | One causal blueprint sits behind the unchanged cooking photograph and remains visible at its sides and below | Detached illustration, fixed guest count, replacement photo or added copy | Retain `private-dinner-process-v2.png` inside the layered media field |
| MasterChef proof | Latest rejection plus the original photo/biography pair | Return to documentary proof while its causal process drawing awaits approval | Recipe/map sheet as a separate follow-on illustration | Remove the detached drawing from rendered markup; retain award photo and exact biography |
| Private event and Masterclass | Latest rejection; existing approved photo/copy pairs | Keep the event rows compact and documentary until each process background is approved | Canapé study or any third drawing field | Render only the unchanged photo and text |
| Workday | Latest rejection; exact three-phase HTML list and original portrait film | Keep the authoritative phases and film together without an empty drawing reserve | Isolated clock arc | Remove the old pseudo-element and its reserved mobile height |
| Personal menu | Latest rejection; existing dish photograph and exact menu copy | Keep the real dish as foreground evidence in a compact composition | Plate-diameter drawing and its empty canvas | Remove the pseudo-element; return the dish to the live layout |
| Meat, fish and produce | Latest phone capture; exact source statements and current documentary images | Each source remains one compact text/photo chapter pending its own process approval | Detached animal, fish or produce study and all space allocated to it | Remove the three pseudo-elements and reset their fixed mobile height/padding |
| Inquiry | Latest rejection; existing complete villa and Instagram action | Preserve the original closing image and action without an unapproved intermediate drawing | Spoon drawing and its 150 px mobile reserve | Remove the pseudo-element and return the villa to normal flow |

No new visual principle is invented in this correction. The temporary no-blueprint state is the most
neutral implementation permitted by the project policy, and the one-by-one approval sequence remains
authoritative.

## One-by-one process approval — calculation-sheet direction — 2026-09-02

This amendment supersedes both the blanket-removal interpretation above and the rejected
`private-dinner-process-v2.png` prototype. The user requires exactly one raster drawing for each
meaningful block, each drawing must explain how that block is planned or produced, and every drawing
must be shown and approved separately before it is inserted. Rejection removes only that candidate;
it is not permission to remove already approved drawings from other blocks.

The Workday-film row below supersedes the historical `workday-plan.webp` row in the earlier
"Final implemented raster map". That measured-arc implementation is no longer active.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof | Direct user instruction to keep the previous recipes and Europe map; previously approved `masterchef-recipes-europe.png` | Culinary knowledge is expressed through recipe development and the Europe/Mediterranean route | New map, flags, invented places, replacement photo or a generic travel graphic | Keep the existing approved raster and layer it beneath the unchanged award photograph; do not regenerate it |
| Private dinner | Direct approval of the new calculation-sheet preview after rejection of the abstract route and architectural-plan alternatives | Express professional planning through guest count, seven-course portion/yield calculations, ingredient loss, temperatures, equipment load, preparation timing and service sequence | The rejected node route, the rejected house floor plan, decorative plate anatomy, changed copy or changed documentary photo | Store the approved raster as `private-dinner-calculation-process.png`; layer the unchanged dinner photograph over its quiet upper-middle zone so calculations remain visible at the left, right and below |
| Private event | Direct approval of the revised monochrome menu/calculation preview; direct correction to remove venue tables and colour | Express event production through guest and reserve calculation, four menu items, per-item quantities, batch allocation, tray loading and timed launch/refill | The rejected venue map, cocktail-table symbols, coloured food, old object-only canapé poster, changed copy or changed documentary photo | Store the approved raster as `private-event-production-calculation.png`; layer the unchanged outdoor cooking photo over the quiet upper-middle zone while the quantity tables remain visible left/right and the batch timeline remains visible below |
| Masterclass | Direct approval of the corrected six-person preview; direct correction from twelve to six participants | Express skill transfer as chef demonstration → two synchronized stations of three → technique control with a correction loop → three shared dish outputs; the calculation sheet states 6 participants, 3 total ingredient kits and 18 participant portions | The rejected twelve-person/four-station version, classroom furniture, certificates, venue planning, event tray/batch logic, colour, changed copy or changed documentary photo | Store the approved raster as `masterclass-six-person-learning-process.png`; layer the unchanged teaching photograph over the quiet upper-middle zone while participant/ingredient calculations, equipment specification, station lanes, control loop and lower timing band remain visible |
| Workday film | Direct approval of the final text-free preview after three corrections: remove the critical-path sheet, remove all generated text, place the vertical film on the left, and stack the drawings on the right from top to bottom | Express the day only through four ordered graphite miniatures: purchase → preparations → marinade → cooking at home | The rejected calculation/manifest/van version, the rejected horizontal four-step version, labels, numbers, visible section copy, clock ornament, changed film or colour | Store the approved raster as `workday-four-step-vertical.png`; use it as the full 2:1 process field, overlay the unchanged 9:16 film in its left safe zone, and keep the four text-free miniatures visible in one right-hand vertical column |
| Remaining blocks | Direct instruction to work one drawing at a time | No drawing enters the interface before its own explicit approval | Restoring the old object-only meat, fish, produce, menu, workday or spoon drawings as if they were approved process sheets | Keep the documentary fallback until the next candidate is approved |

The approved visual language remains warm ivory paper, graphite construction lines and restrained
antique-gold process accents. Unlike the rejected first prototype, factual calculations may appear in
the raster when they are the central meaning of the approved sheet. They remain illustrative planning
values for the drawing and do not modify the live commercial copy.

The latest colour correction is authoritative for newly generated candidates: graphite line, graphite
hatching and neutral paper only. It does not retroactively invalidate the separately approved
MasterChef and private-dinner rasters.

## Exact remaining-drawing set — direct approval — 2026-09-02

The user supplied `docs/references/ideal-remaining-blueprints-2026-09-02.png` (1066 × 2306) and
explicitly declared its remaining drawings ideal, required without changes and exact. This latest
approval supersedes the earlier instruction to keep the remaining menu/source/inquiry blocks in
documentary fallback and also supersedes the simplified transparent WebP reconstructions. The wording
"all remaining blocks" is applied to the five blocks still awaiting approval; MasterChef, dinner,
private event, masterclass and the already approved text-free workday composite remain unchanged.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Personal menu | Exact user-supplied crop `(355, 800, 1000, 1355)` | The complete plate construction, real plated food, diameter callouts and three handwritten relationships are the approved menu-design drawing | The rejected generated taste/texture matrix candidate; the old simplified transparent plate reconstruction; surrounding screenshot typography as raster text | Save the 645 × 555 source pixels unchanged as `personal-menu-reference-exact.png`; keep live heading/copy at left and render this exact crop as the facing visual |
| Meat | Exact user-supplied crop `(558, 1420, 1038, 1563)` | Cow section, three cut studies, separator and 0–20 cm scale remain one inseparable measured drawing | The simplified cow/cut WebP, new anatomy claims, changed sourcing photograph or changed live copy | Save the 480 × 143 source pixels unchanged as `meat-reference-exact.png`; place it beside the unchanged meat photograph and live chapter copy |
| Fish | Exact user-supplied crop `(533, 1602, 1022, 1759)` | Whole-fish construction, four fillet studies, separator and 0–20 cm scale remain one inseparable measured drawing | The simplified lens-shaped fish WebP, species claims, changed sourcing photograph or changed live copy | Save the 489 × 157 source pixels unchanged as `fish-reference-exact.png`; place it beside the unchanged fish photograph and live chapter copy |
| Produce | Exact user-supplied crop `(543, 1789, 1044, 1944)` | Tomato/onion/garlic/artichoke studies and the four-part sensory section remain one inseparable drawing | The simplified leaf/radial WebP, added percentages or farm claims, changed sourcing photograph or changed live copy | Save the 501 × 155 source pixels unchanged as `produce-reference-exact.png`; place it beside the unchanged produce photograph and live chapter copy |
| Inquiry | Exact user-supplied crop `(366, 2041, 783, 2198)` | The sauce trajectory resolves into the perspective spoon exactly as shown in the approved close | The simplified spoon WebP, the previously rendered villa, a form, second CTA or new contact channel | Save the 417 × 157 source pixels unchanged as `inquiry-spoon-reference-exact.png`; make it the central visual between the existing invitation and verified Instagram action |

The exact pixel crops retain their original opaque paper, line weight, handwritten marks, colour and
embedded labels. They are not regenerated, traced, recoloured, cleaned, made transparent, sharpened or
combined with the rejected transparent WebP assets.

## Process-background row direction — direct approval — 2026-09-02

The user established one explicit composition rule for the four process-background rows immediately
after the Hero. The documentary photograph remains foreground evidence, the approved drawing is the
background/underlay and continues visibly below the photograph to the end of the block. This rule
supersedes the previous alternation of the second and third event rows and the previous cropped-photo
treatment.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef proof | Direct instruction: photograph left, text right, drawing as background | The award photograph is the left foreground proof; the recipes/Europe sheet remains visible behind it and below it | New map, changed biography, crop of the award photograph or detached drawing | Keep `masterchef-recipes-europe.png` as the process field; fit the complete award image at left and keep both paragraphs at right |
| Private dinner | Direct instruction: complete photograph right, text left, drawing as background and end-of-block underlay | The uncropped portrait cooking image is the right foreground outcome of the calculation sheet | Landscape crop, changed copy, new calculation sheet or separate lower illustration | Keep `private-dinner-calculation-process.png` across the field; fit the complete portrait photograph at right, retain text at left and expose the lower calculation/service band |
| Private event | Direct instruction: same as private dinner — photograph right, text left, layout as underlay | The outdoor cooking photograph remains right of the copy while the production sheet continues beneath it | Reversed copy/photo order, venue plan, changed photo or detached sheet | Move the existing process field to the right-hand side of the copy and fit the complete landscape photo over its quiet area |
| Masterclass | Direct instruction: photograph left, text right, layout as underlay | The teaching photograph is the left foreground proof; the six-person learning sheet remains the block background | Twelve-person version, classroom furniture, changed copy or right-hand photograph | Move the process field to the left and the live copy to the right; keep the complete teaching photograph over the approved sheet |

No asset is regenerated. Exact overlay percentages are neutral fitting decisions derived from each
photograph's intrinsic ratio and the already approved quiet area in its process sheet.

## Muted colour treatment for process backgrounds — direct approval — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Four primary process underlays | Direct user instruction in this task and the existing site palette | Preserve each approved planning drawing while adding restrained culinary colour: dusty herb green, muted terracotta, soft ochre, warm olive and paper beige | No vivid rainbow palette, no new objects, no changed labels, calculations, routes or geometry | Save non-destructive coloured raster versions and use them only as the MasterChef, dinner, event and master-class underlays |

## Collision-free process compositions — direct correction — 2026-09-02

The user's screenshot rejects a precomposed full calculation sheet placed behind an unrelated photograph. The approved principle is now one integrated field spanning the whole row: a clean reserved zone for live copy, a clean reserved zone for the complete documentary photograph, and different planning calculations/combinations arranged only in the remaining areas and lower band.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef | Direct correction plus the established photo-left/copy-right rule | Landscape proof at left, live copy at right, recipe/route studies only in the centre, margins and lower band | A complete old sheet hidden by the proof photograph | Regenerate a 2:1 underlay with exact quiet zones matching the two foreground elements |
| Private dinner | User's rejected screenshot plus photo-right/copy-left rule | Portrait photo receives a tall right-hand quiet zone; guest/menu calculations occupy centre, far-right margin and bottom | Table, timeline or dishes running behind the chef's face/body | Regenerate a 2:1 calculation underlay around the real portrait geometry |
| Private event | Direct correction plus photo-right/copy-left rule | Landscape event photo receives a wide upper-right quiet zone; batch/menu calculations remain in centre, edge and bottom | Production cells or food sketches behind the photo | Regenerate a 2:1 event-production underlay around the foreground geometry |
| Master class | Direct correction plus photo-left/copy-right rule | Landscape teaching photo receives a wide upper-left quiet zone; station arithmetic and dish outcomes occupy the centre and lower band | Station flow or labels hidden behind the photo/copy | Regenerate a 2:1 learning underlay around the foreground geometry |

## Mobile copy cell — direct correction — 2026-09-02

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef and three event-format rows on narrow screens | User-supplied phone screenshot and direct statement “Текст не в ячейке” | Keep live readable copy inside the same technical-paper field as the process drawing; place copy in an upper cell and the 2:1 drawing/photo composite directly below it | Detached text above the drawing, tiny copy squeezed into the desktop reserved rectangle, rasterised marketing copy | At 560 px and below, the field becomes a taller unified wrapper; live copy overlays its bordered upper cell while the original 2:1 process raster and complete photo occupy the lower half |

| Duplicate empty desktop copy reserve on mobile | User-supplied follow-up screenshot pointing to the unused rectangle | Once mobile copy has its readable upper cell, remove the second empty desktop reserve and let only the active calculation/photo portion fill the lower field | Leaving a visibly unused square or shrinking live copy until it becomes unreadable | Crop the lower raster to its active 70% segment at 560 px and below; translate photo coordinates to that cropped segment |

## Layout-first rendering workflow — direct correction — 2026-09-03

The latest instruction supersedes crop-based attempts. Text and complete documentary photography must be composed first as live foreground elements at each target breakpoint. Their measured rectangles then become immutable exclusion zones used to render separate desktop and mobile process underlays.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Four primary process blocks | Direct user instruction: “сначала расположишь текст как надо и картинку как надо, а потом по размерам зарендеришь” | Foreground composition determines background geometry, never the reverse | Scaling or cropping a pre-existing desktop sheet until its empty cells happen to align | Refactor each row into one shared positioning field; measure live copy/photo rectangles at required widths; generate desktop and mobile rasters from those exclusion zones |
| Documentary photographs | Direct user instruction: photographs must not be cropped and must run edge-to-edge | The CSS frame always has the exact intrinsic aspect ratio of its source photograph; resizing changes only the overall frame size | `object-fit: cover`, arbitrary fixed aspect ratios, letterboxing or baked-in photography | Use measured percentage width/height pairs that reproduce 1719:900, 1152:1572, 2278:1510 and 1144:770 exactly, with `object-fit: contain` filling the matched frame |
| Final underlay quality | Direct user instruction that layouts must be rendered in excellent quality | Keep master rasters at least twice their maximum CSS display size, with lossless line/text edges | Low-resolution screenshot crops, JPEG masters or browser-scaled one-size assets | Retain high-resolution PNG masters and create optimized delivery files only after visual approval |

## Side-by-side rule at every width — direct correction — 2026-09-03

The latest direction supersedes the earlier narrow-screen “copy first/photo second” interpretation.
These four blocks never become a vertical text/photo stack: MasterChef and master class keep the
photograph on the left and live copy on the right; private dinner and private event keep live copy on
the left and the photograph on the right. On narrow screens both elements may become smaller and the
field may become taller, but their left/right relationship is immutable. The currently approved
process rasters are used for this trial; replacement underlays are deferred until visual review.

## Unframed foreground zones — direct correction — 2026-09-03

The process drawing must never outline the live photograph or copy with a reserved-cell border,
registration rectangle, guide line or decorative strip. Their areas remain plain paper. Process
arrows and calculations may approach and visually connect the two foreground elements only from the
genuinely free centre, edge and lower zones; no underlay line may continue beneath either element.

## Real-photo culinary archive — direct approval — 2026-09-09

This map supersedes the active `Photorealistic MasterChef route` raster pair. The old files remain only
as retired project history and are no longer visual references.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| MasterChef lead | User-approved “culinary archive + live editorial photography” direction; existing award proof and copy | Keep the verified personal evidence separate from illustrative atmosphere | No replacement chef, stock face, altered biography, award-photo retouch or forced crop | Natural-height twelve-column lead with the complete award photograph at left and unchanged live copy at right |
| Kitchen-action archive | Five exact Pexels source pages recorded in `public/media/masterchef/CREDITS.md`; Pexels licence | Real hands, service and kitchen-pass moments replace isolated floating dishes | No claim that the stock scenes are Evgen, his dishes, his travels or his clients; no copied Pexels page composition | Locally optimized 3:4 WebP derivatives in an asymmetric editorial contact sheet, with square edges and no shadow |
| Recipe facsimile | Mary Hawker’s recipe book, c.1691, Wellcome Collection, Public Domain Mark | Use a genuine manuscript leaf as an archival source rather than imitating handwriting | No fake note, invented recipe, torn edge, tape or parchment texture | Show one locally optimized page raster as a credited archive figure |
| Eastern Mediterranean geography | Joan Oliva portolan atlas, c.1590, Library of Congress/Wikimedia Commons, public domain | Use an authentic chart with its original line network instead of a generated car route | No invented itinerary, map labels, route line, vehicle or destination claim | Show the unaltered chart as a small credited archive figure; contextual relationship is editorial, not evidentiary |
| Archive sequence metadata | User-approved recipe-sheet/index recommendation plus existing biography’s `рецепты, техники и сочетания` | Fine rules, numbering and three concise live labels carry the narrative | No SVG, icon system, fake date, city label or generic card chrome | HTML text and CSS hairlines define `победа / исследование / авторский вечер` |
| Responsive archive | Project’s approved side-by-side MasterChef lead rule and explicit mobile anti-template policy | Preserve lead orientation; author a separate asymmetric contact sheet below | No 1:2 generated background, proportional desktop shrink or horizontal carousel | At 820 px and below retain photo-left/copy-right; place real frames in a deliberate two-column sequence with one wide third frame |

## Mapped recipe journey — direct correction — 2026-09-09

This correction supersedes the detached `Real-photo culinary archive` contact sheet while retaining its
real licensed photographs and unchanged MasterChef proof.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Journey logic | User's direct instruction: each country must connect by a line to the dish learned there | Geography, connector and dish form one readable causal unit | The old AI car, floating plate shadows, decorative route or an unrelated gallery | One map canvas with five numbered country points, one restrained travel path and five functional leaders terminating at real photo frames |
| Geographic base | [Mediterranean Sea location map (blank).svg](https://commons.wikimedia.org/wiki/File:Mediterranean_Sea_location_map_(blank).svg), NordNordWest, CC BY-SA 3.0; documented bounds 7° W–42.5° E and 29°–48° N | Use a geographic field whose published bounds actually contain Spain, southern France, Italy, Greece, Turkey and Cyprus | No hand-drawn coastline, invented borders, branded map style, cropped western-only map or reuse of the generated map pixels | Store the original 1754 × 862 SVG locally; keep the map and route in one 1754:862 wrapper so points cannot drift, while a separate fixed-ratio leader layer ends at the five photo edges |
| Country/dish working set | Existing five credited real photos plus the user-defined travel-recipe logic | Use cuisine-recognisable examples to prototype the mapping | No claim that source photography documents Evgen's trip or that unverified stops are settled biography | Spain/paella, France/sauce work, Italy/ravioli, Greece/octopus, Turkey/pistachio pastry; visible editorial-verification note |
| Cyprus endpoint | Existing site identity and current private-chef story on Cyprus | Show where accumulated techniques arrive in the current service | No invented sixth recipe, city or supplier | A final map point labelled `Кипр · авторское меню сегодня`, without a stock dish photo |
| Mobile relationship | User's required country → line → dish logic and project mobile anti-template rule | Preserve the causal connector even when spatial geography cannot carry large photos | No scaled desktop poster, horizontal carousel or identical card stack | Keep the complete map, route and live country names visible; follow them with five unequal numbered rows where country text, hairline leader and real image remain on one row |

## Integrated MasterChef route — direct correction — 2026-09-09

This map supersedes the standalone journey composition above while retaining its licensed sources and
verified one-to-one route logic.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| One MasterChef composition | User's direct instruction that the map is a background and small addition to the MasterChef block | Award proof, biography and travel evidence read as one continuous story | No second section, display title, intro paragraph or repeated divider | Keep the existing archive field; lead proof stays foreground and the route becomes its compact lower/background layer |
| Background geography | NordNordWest Mediterranean location map, CC BY-SA 3.0; existing approved point geometry | Geographic context remains legible but subordinate | No opaque map panel, generated scenery, vehicle or ornamental travel poster | Render the complete map at low contrast behind the live route and dish callouts, with its attribution retained |
| Five dish callouts | Five exact Pexels photographs and the user's requested country → line → dish relationship | Equal visual treatment makes the photos one editorial set; leaders preserve causality | No detached gallery, unequal stock-card styles, shadows, radius or decorative captions | Five square photographs with a common muted documentary grade, a 1 px keyline and calibrated crops sit directly over the map field |
| Compact biography | Existing verified award photo and biography plus the user's one-mobile-scroll constraint | Preserve the story while removing repetition | No new biography facts, slogan or generic travel copy | Condense the two existing paragraphs into one live paragraph covering the award, recipe research and present work on Cyprus |
| Phone composition | User's direct instruction: chef photo, text, map and food photos must fit within one mobile scroll | Design a separate compact spatial composition rather than stacking desktop rows | No five-row ledger, carousel, hidden route or vertical card list | Keep the photo-left/text-right lead; below it use a 245–295 px map field across the 375–560 px range, with five 46–56 px callouts and 11 px live labels |
| Working route facts | Existing editorial set: Spain/paella, France/sauce, Italy/ravioli, Greece/octopus, Turkey/pistachio; Cyprus endpoint | Keep the proposed narrative visible without presenting it as verified travel documentation | No claim that stock photos are Evgen's own dishes or that stops are confirmed | Retain a concise visible verification note and full descriptive alt text/source credits |

## Transparent plate composition — direct correction — 2026-09-09

This correction supersedes the five framed Pexels callouts in the active map. The source photos remain in
the media archive and credits, but are no longer rendered by the MasterChef route.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Unified picture | User's instruction to place everything closer, structurally and as one understandable picture | Compress proof, map and dishes into a single causal reading path | No detached gallery, lower thumbnail rail or new content section | Preserve one MasterChef field; reduce the route gap/canvas and distribute plates around the live route |
| Plate photography | User's request for professional, photoreal dishes without visible backgrounds; no external photo reference supplied | Use a neutral consistent studio-photo system with material realism and clean isolated silhouettes | No illustrated rendering, CGI gloss, stock kitchen scene, props, text, watermark, floating garnish or artificial perfect symmetry | Five coordinated generated masters and 512 px WebP derivatives, each showing one complete off-white porcelain plate; a shared calibrated ellipse hides the generator's opaque transparency-preview backing |
| Map-to-dish relationship | User's earlier required country → line → dish logic | Short local leaders read faster than lines converging on one distant row | No purely decorative path or ambiguous unlabeled image | Each country point connects to one nearby transparent plate whose live caption names the country and dish |
| Photo truthfulness | Existing editorial-status rule and actual site content | Generated food is atmospheric menu illustration, not documentary travel evidence | No claim that Evgen cooked, photographed or served the exact rendered plates | Keep the visible confirmation note and update alt text to describe plate contents without provenance claims |
| Compact mobile field | User's one-mobile-scroll requirement | Staggered plate silhouettes use map space efficiently and avoid card stacking | No five-column caption rail, carousel or hidden relationship | At 375–430 px use 48–58 px plate cutouts around the same route, full-width map and wrapping 11 px live labels |

## `Я — у вас дома` narrative expansion — 2026-09-09

This direct request supersedes the text-free presentation of the present-day film. It does not change
the approved order: the chapter still follows MasterChef and the three event formats.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Chapter message | User's request to devise a concept, description and illustrations for the `Я — у вас дома` video; existing exact workday facts | Explain the value of a home chef through the host's regained presence: `Я у вас дома, чтобы вы были дома — со своими` | Generic private-chef luxury copy, restaurant-at-home cliché, new capacity/dietary claims, cleanup promise or second CTA | Restore a visible heading and concise factual description before the media; keep the existing Instagram action elsewhere on the page |
| Documentary film | Existing 37-second `chef-story-img-5399-no-grill.mp4`, its poster and actual sequence of tools, vegetables, mussels and plating | Let real preparation provide the evidence; the copy supplies only the missing host-facing meaning | Device frame, native controls, autoplay audio, invented guests inserted into the film, fake testimonial or montage unrelated to the source footage | Keep the unchanged 9:16 film, muted and viewport-controlled, in a dedicated portrait aperture |
| Workday drawing | Approved `workday-four-step-vertical.png` | The four graphite miniatures make the off-camera arc legible: products → preparation → marinade → cooking | Redrawing the approved plan, arbitrary icons, numbered cards, decorative measurements or a library stepper | Show the existing raster as a separate illustration field with live four-part captions; crop only its authored right-hand drawing zone through CSS |
| Storyboard artifact | Approved graphite-on-cream language plus the user's request for illustrations | Extend the current language to the missing beats `arrival → mise en place → heat → shared table` while avoiding a fabricated likeness | No generated chef face, branded location, luxury villa, restaurant interior, extra copy inside the image or claim that the scene is documentary | Save `home-evening-storyboard-v1.png` as a concept/storyboard artifact; do not present it as a real client home or a documentary still |
| Mobile composition | Project's separate-mobile-layout rule and the 375 px minimum target | Preserve readable copy and a meaningful portrait film rather than shrinking the desktop spread | Full-width autoplay poster, tiny 2:1 composite, mechanical one-column card stack or hidden illustration | Copy leads; film and the right-hand drawing crop form an unequal two-column evidence row; the four live captions follow as a ruled ledger |
## Flag-marked recipe route — direct correction — 2026-09-09

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Route numbering | User's direct instruction to remove `01`–`05` | Country and dish names carry identity; document order remains semantic only | No replacement badges, bullets or Roman numerals | Remove the `number` data field, numeric map tokens and numbered plate captions while retaining the `<ol>` |
| National route nodes | User's direct instruction to colour countries with flags; existing approved map coordinates | Put national colour at the actual country point so route, geography and dish remain one readable unit | No decorative flag strip, generic pin icon, floating emoji or invented territory boundary | Six square-edged 3:2 local vector flags sit over Spain, France, Italy, Greece, Turkey and Cyprus route points |
| Base-map restraint | Existing NordNordWest CC BY-SA 3.0 map and project anti-template policy | Preserve geographic evidence and add only the requested functional colour | No recolouring of unaddressable source paths or bright full-map poster treatment | Keep the map at approved low opacity; flag symbols are the only new colour layer and retain a fine paper separation keyline |

## Flag-filled country territories — direct correction — 2026-09-09

This correction supersedes the rectangular national route nodes above. Visible numbering remains removed.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Territory colour | User's clarification that colours must be on the country territory beneath the dishes | The geographic silhouette itself becomes the national-colour carrier | No floating flag, marker rectangle, pin, emoji, legend strip or flag beside country text | Clip each national flag field to the projected outline of Spain, France, Italy, Greece, Turkey and Cyprus |
| Geographic registration | [Mediterranean Sea location map.svg](https://commons.wikimedia.org/wiki/File:Mediterranean_Sea_location_map.svg) metadata: equirectangular, 7° W–42.5° E, 29°–48° N, 1753.947 × 861.729; [Natural Earth 1:50m Admin 0 Countries](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/) | Use published bounds and real administrative polygons so the overlay registers to the existing map | No invented country silhouette, guessed blob, manual tracing or independent decorative projection | Project Natural Earth longitude/latitude coordinates linearly into the base SVG canvas and retain only Mediterranean-intersecting polygons |
| Route hierarchy | Existing approved route and country → leader → dish relationship | Filled territories establish place; route and leaders explain travel and recipe acquisition | No removal of causal connectors or replacement with a decorative atlas poster | Render territory colour above the quiet base map and below route, live labels, leaders and plates |
| Small-country legibility | User's one-mobile-scroll constraint and existing 375 px minimum | Preserve the true Cyprus silhouette while its live endpoint label guarantees comprehension | No enlarged fake Cyprus, displaced inset map or detached flag chip | Keep Cyprus at projected scale; retain `Кипр` in live text and its endpoint in the map title/note |

## `Я — у вас дома` minimal documentary correction — 2026-09-09

This entry supersedes the earlier `narrative expansion` composition. The user's direct correction is the
authoritative reference: the current result is too orange and reads as a checkerboard; the replacement
must be minimalist, use the least possible illustration, and feel realistic and beautiful.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Section composition | User's direct request for minimalism and rejection of the checkerboard rhythm | One idea is carried by one real moving image, with negative space doing the compositional work | No illustration beside the film, four-cell stage ledger, card grid, split-screen device or decorative layer | Keep a single text column and a single portrait film; remove the illustration field and all live stage cells |
| Film edit | User's complaint about the orange video; direct audit of the existing documentary footage | Preserve real hands, food and cooking while removing the source shots that visually cause the complaint | No synthetic replacement scene, generated likeness, global cold filter, fake home or invented guests | Re-cut the existing footage around tools, washing, pan, mussels and plating; omit the orange-wide shots and checkerboard cutting-board sequence; apply only a restrained yellow-channel correction |
| Poster | Existing final plated-dish footage | Let the real finished dish be the only still image and quiet entry state for the film | No AI poster, composite, illustration, typography baked into the image or stock food photograph | Extract a poster from the corrected final plating sequence |
| Copy | Existing approved service facts and user's preference for restraint | State the service in two sentences, then keep the established host-facing promise | No luxury vocabulary, invented cleanup/capacity claim, process repetition or second call to action | `Я приезжаю с подготовленным mise en place и беру кухню на себя. Вы встречаете гостей и остаётесь частью собственного вечера.` followed by the existing promise |
| Mobile behavior | User's rejection of the checkerboard; project's separate-mobile-layout requirement | A single readable sequence replaces both the side-by-side media row and the 2×2 ledger | No narrow media columns, desktop grid mechanically stacked, edge-to-edge autoplay or tiny poster | Copy comes first; one 9:16 film follows at a deliberate portrait width with a single factual caption |
| Retired concept image | User's request for minimum illustration and realistic output | Keep rejected exploration out of the live/public experience | No generated storyboard is surfaced as documentary evidence | Remove the AI storyboard from the page/public media path; retain only an explicitly rejected working artifact for provenance |

## `Я — у вас дома` adjacent visual correction — 2026-09-09

This entry supersedes the film-edit decision above. The user clarified that the supplied video itself must
remain unchanged; only the block beside it needs a new, minimally drawn but photorealistic visual.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Documentary film | User's direct correction `видео оставь как есть` and the supplied original film | Preserve the accepted real material exactly | No re-cut, crop, colour grade, synthetic replacement or new poster | Restore `chef-story-img-5399-no-grill.mp4`, its original poster and timing caption track |
| Adjacent visual | User's request to draw only the neighbouring block; existing message that the chef works while guests remain together | Show the outcome of the cooking film in one coherent scene: the plate arriving at a real home table | No four-panel storyboard, checkerboard process diagram, generated chef likeness, orange kitchen, luxury restaurant or stock testimonial pose | Generate one 4:5 photorealistic editorial scene of a mussel dish arriving at a simple domestic table; crop out faces and identify it as a visualization |
| Media relationship | User's request for the drawing beside the video and rejection of checkerboard rhythm | Two unequal photographs share one baseline and almost equal visual height, reading as one film-and-outcome pair | No 2×2 grid, alternating cards, step ledger, overlap collage or decorative frame | Use a narrow 9:16 documentary film beside a wider 4:5 still, separated only by whitespace and individual factual captions |
| Mobile behavior | Same direct correction and project's deliberate-mobile rule | Keep the film and its companion visibly related without reducing either to an unreadable thumbnail | No vertical card stack or four-cell process grid | Preserve the two-image pair at 375 px with proportional columns chosen to equalize their heights; copy remains a separate preceding block |

## Event-specific blueprint concepts — 2026-09-09

The user explicitly approved all three event-specific directions on 2026-09-09 and instructed that they
be implemented. They supersede the three `*-layout-color-v2.png` event-format underlays; the previous
files remain audit history only.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Private dinner | User-supplied 2026-09-09 composite screenshot; exact seven-course copy and portrait cooking photograph; explicit approval `Да, отлично` | Ingredient choice and mise en place resolve into seven authored courses and one intimate-table outcome | Existing calculation sheet, private-event tray loop, masterclass station diagram, copied text or replacement photo | Activate `private-dinner-event-concept-v3.png` beneath the unchanged copy/photo pair |
| Private event | Same user correction and approval; existing outdoor live-cooking photograph and small-bite/conversation copy | A griddle feeds four bite assemblies, tray circulation, return and replenishment so the drawing expresses a fluid standing event | Formal dinner table, seven-course plate sequence, fixed guest count, venue floor plan or changed photo | Activate `private-event-circulation-concept-v3.png`; keep the quiet copy-left and landscape-photo-right apertures |
| Masterclass | Same user correction and approval; existing demonstration photograph and exact learning copy | Demonstration branches into two practice stations, a correction loop and a shared workbench with three outcomes | Event tray circulation, intimate dinner choreography, certificate motif, replacement participants or changed text | Activate `masterclass-learning-concept-v3.png`; keep the quiet photo-left and copy-right apertures |

The three process topologies are now approved project decisions. All palette, line, surface, photograph,
copy and foreground-direction decisions come from the supplied screenshot and active project.

## Event-format mobile integration correction — 2026-09-09

The user's Android production capture is the authoritative failure reference: a complete wide sheet placed
below the live pair reads as a detached poster, not as the requested drawing around and between content.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Mobile private dinner | User production capture and the approved private-dinner topology | Keep the copy-left/photo-right relationship inside one portrait sheet; ingredients and seven-course path wrap the quiet apertures and resolve below them | No full 2:1 poster beneath the pair, tiny seven-plate strip, duplicated live text or changed photo | Use a dedicated text-free portrait underlay at phone widths; retain the exact HTML copy and documentary portrait above it |
| Mobile private event | Same capture and explicit correction `Исправь`; approved griddle/assembly/circulation concept | Enlarge the operational sequence and connect it spatially to the live event photo | No detached banner, excessive empty middle, formal dinner table or generic people diagram | Use a portrait underlay with copy-left/photo-right quiet zones, side connectors and a compact lower circulation loop |
| Mobile masterclass | Same correction and approved demonstration/practice/feedback concept | Preserve the reversed photo-left/copy-right direction while the teaching loop surrounds and completes the pair | No event trays, seven-course motif, certificate symbol or generic step cards | Use a portrait underlay with photo-left/copy-right quiet zones and a large lower demonstration → practice → correction → table sequence |
| Responsive source selection | Project's deliberate-mobile rule and the failure visible in the supplied capture | Art-direct the raster itself rather than mechanically shrinking the desktop sheet | No CSS crop presented as a complete diagram, hidden blueprint, horizontal scroll or extra content row | Wide screens above 820 px retain the approved 1774 × 887 sheets; tablet/phone select three dedicated portrait assets while live semantics remain unchanged |

## Event-format compact-sheet correction — 2026-09-09

The user's second Android capture supersedes the portrait-underlay decision above. It proves that the
1122 × 1402 sheets technically contain the copy and photo but remain visually wrong: they become tall,
dense generated posters and no longer resemble the calm approved desktop drawings.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Compact narrow sheet | User's 18:57 Android capture; original supplied composite; three approved 1774 × 887 concept sheets | The live pair remains the visual subject and the drawing acts as a quiet explanatory surround | No full-height vertical infographic, botanical frame, central object tower, duplicated figure rows or dense photoreal food collage | Through 940 px use one near-square, text-free sheet per concept with an empty upper pair of apertures and one sparse lower process band |
| Tablet sheet | Same rejected capture and direct browser verification at 561, 768, 820 and 821 px | Keep the compact source wherever the wide sheet would place illustration behind wrapped live copy | No early jump back to the dense wide composition and no tall portrait poster | At 561–820 px use a square integrated field; at 821–940 px contain the same compact sheet in a shallow 2:1 field; return to the approved wide sheet only at 941 px |
| Live content | Exact current Russian copy and documentary photographs | Copy and real photography stay larger than the decorative drawing and retain their established left/right direction | No baked-in text, generated photograph, replacement portrait or shrinking copy to make the illustration fit | Keep the existing semantic photo and HTML copy; only the art-directed source and measured field geometry change |

## Country-colour photographic route plates — 2026-09-09

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Five dish photographs | User's direct rejection of the soft/pixelated AI look and request for ultra-real food photography | Each dish must read as a real restaurant photograph with natural texture, irregular ingredients and coherent daylight | No global map regeneration, plastic food, cloned garnish, artificial glow, baked-in copy or replacement route | Keep the current route geometry and replace its five plate cutouts with separate native-alpha `v2` images |
| Country-colour ceramics | User's direct instruction that every plate use the country's colours; approved restrained site palette | Translate flag colour into believable glazed ceramic rather than printing a literal flag | No souvenir graphics, flag logos, saturated rainbow palette or change to live country labels | Spain uses saffron/red, France ivory/navy/red, Italy ivory/green/terracotta, Greece ivory/cobalt and Turkey crimson/ivory |
| Responsive delivery | Existing integrated route and the project's deliberate-mobile rule | One sharp source serves the same semantic plate at every breakpoint and the complete rim remains visible | No desktop-only replacement, CSS upscaling of a tiny source, crop mask or alternate mobile content | Deliver 1024 px transparent WebP assets, keep `object-fit: contain`, remove the old ellipse clip and verify all required widths |

## Unified proportional MasterChef field — 2026-09-09

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| One editorial rectangle | User's 21:12 desktop failure capture and direct instruction that text, photo and map fill one block proportionally | All three elements share one bounded stage and one continuous paper surface | No detached heading, centred poster, card frame or generic split-section template | Move the heading into the story lead and make proof, copy and route children of the same 12-column field |
| Upper proof pair | User's repeated approved direction: photograph left, text right, photograph never cropped | Documentary proof and live copy remain the foreground anchors, with edges derived from the same grid | No photo crop, replacement photograph, empty intermediary column or text baked into raster art | Desktop uses an approximately 46/48 pair with a 6% breathing interval; compact widths retain a deliberate 6/6 pair |
| Full-width route continuation | User's instruction that the drawing be part of and connect photo and text | The map begins beneath the foreground pair and uses the remaining lower field from side to side | No 760 px cap, floating map island, new illustration or line passing through live copy | Remove the cap/centre transform; position the existing licensed route across the full composition and protect text with the paper surface |
| Mobile composition | User's explicit demand for the same photo-left/text-right relationship on mobile; supplied phone failures | Reflow geometry, not content: foreground remains paired while the map fills the lower shared area | No desktop overlap through wrapped copy, hidden route, horizontal scroll or cropped photograph | One shared grid with a full-width third-row route and mobile-specific plate positions at 820, 560 and 430 px |

## Event-format non-generative technical mockup — 2026-09-09

This unapproved discussion direction responds to the user's rejection of the perimeter raster mockups as
too weak and visibly AI-made. It does not change the public implementation.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Graphic language | User's rejection `слишком слабо и очень ИИшно`; original supplied editorial composite | Replace synthetic object collages with deliberate technical notation and real typographic hierarchy | No generated food vignettes, foliage garlands, mirrored decoration, fake hand sketches or pseudo-watercolour | Author the entire surround as deterministic inline SVG with hard rules, nodes, labels and service-specific routes |
| Photographic hierarchy | Exact three user-selected documentary photographs | Let real evidence occupy the largest visual aperture and vary its placement by the actual aspect ratio | No repeated thumbnail placement, artificial frame, generated extension or equal crop template | Dinner uses a dominant portrait at right; private event a wide upper stage; masterclass a nearly full-width demonstration frame |
| Service distinction | Existing exact copy: seven courses, conversational small bites, teaching and shared table | Diagram only the causal information already present in each service | No arbitrary ingredients or decorative measurements | Dinner maps seven sequential plates; event maps assembly, trays, guests and replenishment; masterclass maps demonstration, feedback and three outcomes |

The user's follow-up correctly rejects the first technical pass as visually coherent but semantically
empty. The v4 mockup removes unsupported `assembly`, `return/replenishment`, `feedback`, plate symbols and
unlabelled nodes. It now encodes only statements present in the adjacent live copy: the dinner's either/or
choice, the event's conversational eating outcome, and the masterclass's explicit show/cook/sit sequence.

## Hero layout comparison — 2026-09-09

This is a comparison-only response to the user's supplied desktop capture and direct request for five
better Hero layouts. It does not change the public Hero or supersede the active cream system before the
user selects a direction.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Failure diagnosis | User-supplied 4090 × 2380 capture from 2026-09-09; active Hero JSX/CSS | Treat the unequal information load, micro-grid noise and detached portrait as hierarchy problems | No new style inferred from the chef topic and no effects used to disguise the split | Record the audit and produce five deterministic comparison boards only |
| Portrait cover | Current real `chef-hero-apron.jpg`; The Modern House reference screenshot; active title/palette | One identity image establishes the opening while secondary proof remains structurally separate | No property-site masthead, full copied geometry, substitute portrait or floating card | Large integrated portrait plus a restrained four-frame evidence strip and compact title field |
| Cinematic band | Real `private-event-outdoor-crepes.png`; The Modern House and Eugénie Colleville reference screenshots | Let a legible real scene lead; place type in an authored quiet region rather than veiling every photograph | No copied food styling, logo, navigation, overlay slogan or restaurant template | Full-width action field with a separate cream title band |
| Documentary spread | Marrow and MOLD case-study reference screenshots; project Hero audit; approved local archive | Give documentary modules unequal scale according to meaning and keep one dominant reading axis | No Marrow grid/copy, MOLD identity, generic bento, uniform micro-tiles or global dark wash | One continuous editorial grid with a title field, large portrait/action anchors and fewer supporting images |
| Signature poster | Active Cormorant/italic typography roles; real alpha-backed `hero-anchor-portrait.png`; exact title | Make the chef's identity and name one integrated composition | No reuse of an earlier model-generated page, fashion-brand styling, red accent, cutout reconstruction or invented copy | Oversized live title, real supplied cutout and a narrow three-frame documentary proof column |
| Proof triptych | Project's actual process → chef → result content; square-edge media rule | Explain the offer through three large readable scenes rather than dozens of tiny tiles | No three-card benefit grid, labels in boxes, icons, equal card padding or stock food | One compact title header and a continuous unequal triptych of tools/action, chef and finished dish |


## `Я — у вас дома` wide-film correction — 2026-09-09

This direct correction supersedes the portrait-film geometry in the active home chapter. It changes only
the chapter's proportions and responsive composition; the accepted source film, copy and visual language
remain authoritative.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Chapter density | User's direct observation that the block feels very empty; current 12-column spread | Use the already available paper field for the chapter's real documentary evidence instead of filling it with new decoration | No companion illustration, card, process grid, generic facts, icon row, ornament or added marketing copy | Keep the copy at left and expand the film across the previously unused centre/right columns |
| Film geometry | User's explicit `3 на 4 или 4 на 3, чтобы горизонтально было длиннее и больше`; the real supplied film | Interpret the requested horizontal option as `4 / 3` and make the moving image the dominant visual aperture | No vertical `3 / 4`, portrait `9 / 16`, stretching, device frame, rounded crop, shadow or replacement footage | Render the unchanged MP4/poster/VTT in a large square-edged `4 / 3` aperture with `object-fit: cover` |
| Responsive composition | Same direct request; project's deliberate-mobile rule | Desktop/tablet keep a copy/film editorial pair; phones give the wide film the full readable measure below the copy | No tiny side rail, mechanical shrink of the desktop columns, horizontal overflow or edge-to-edge viewport bleed | Use a four/eight-column desktop split, a five/seven-column tablet split and a full-width `4 / 3` phone film after the copy |

## Personal-menu sourcing reset — 2026-09-09

This direct correction supersedes the personal-menu plate drawing and the three numbered
text/photo/cut-study rows. The supplied screenshot records the rejected current state; unrelated overlay
content inside the capture is ignored.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Chapter purpose | User's rejection of the block's logic and function; actual journey already stated by the page: guest preferences, product search, authored menu | Make the cause-and-effect relationship explicit once so the visitor understands why there is no fixed menu | Ingredient catalogue, procurement checklist, invented availability promise, generic benefit cards or a new CTA | Lead with one proposition: the guest brief comes first, product selection follows, and the evening's menu is the result |
| Documentary evidence | Existing approved `evgen-half-lamb-market-v1.webp`, `evgen-fish-harbour-market-v1.webp` and real `evgen-grape-harvest.webp` | Three project-specific scenes read as one body of evidence when aligned into a compact photographic sentence | New stock/generative media, supplier identity, claim that generated scenes document a real visit, repeated row template or cut-study illustration | Keep all three files in meat → fish → produce order inside one unequal `5 / 4 / 3` square-edged strip with short factual captions |
| Desktop/tablet composition | Existing editorial photography system; source aspect ratios; user's screenshot as an anti-reference | Let image proportion and one common baseline establish rhythm; let the copy explain the logic separately | Third illustration column, vertical timeline, `01 / 02 / 03`, equal cards, alternating bands, overlap collage or decorative measurement | One two-column intro above one continuous three-frame strip; no repeated source chapters |
| Phone composition | Project's mandatory deliberate-mobile rule; actual two landscape/one portrait media set | Recompose according to native image orientation so all evidence fits in one viewable unit | Three full-width slabs, horizontally scrolling rail, hidden scene, tiny diagram or desktop rows stacked unchanged | Meat and fish form two left-hand landscape frames; harvest spans their combined height at right; captions stay attached to each frame |
| Visual language | Approved cream/ink/gold palette, Cormorant Garamond/Montserrat hierarchy, square media and fine-rule restraint | Remove unsupported decoration and make the content itself carry the section | Blueprint rasters, generic icons, radius, shadow, gradient, glass, glow, texture or decorative animation | Existing tokens only; warm loading reserves, small opaque-paper captions and a single fine top rule for the gallery |

No positive external layout reference was supplied for this correction. Exact grid shares, gallery height,
crop focal points and caption insets therefore remain explicitly neutral fitting decisions derived from the
three source files and the already approved project system, not a new site-wide style.

## `Я — у вас дома` contextual day route — 2026-09-09

This direct request adds useful context to the approved wide-film composition. It supersedes the earlier
instruction to solve the chapter only through negative space, but it does not authorize invented service
claims or a return to illustration-led process graphics.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Expanded lede | User's request to add context; previously confirmed workday facts `утро: закупаю продукты`, `день: делаю заготовки, маринады и соусы`, `вечер: готовлю у вас дома`; current host-facing promise | Explain what happens before the chef arrives and why the host can remain with guests | No cleanup promise, fixed times, supplier claim, menu guarantee, staffing claim, luxury cliché or generic restaurant-at-home copy | Replace the two-sentence lede with a concise three-sentence account of preparation before arrival, final cooking/presentation at home and the host's role |
| Day route | Same exact three-part user-authored sequence | Fill the quiet copy field with real operational context and make the unseen preparation legible | No icons, numbered cards, clock face, invented hours, diagram raster, checklist control or decorative illustration | Add one semantic definition list: `утро — закупаю продукты`; `день — делаю заготовки, маринады и соусы`; `вечер — готовлю и подаю у вас дома` |
| Responsive placement | User's approval of the large horizontal `4 / 3` film; existing 12-column editorial field | Preserve the dominant film while allowing the context to change position where the left rail becomes too narrow | No smaller video, portrait ratio, overlapping copy, repeated card stack or horizontal scroll | Wide screens place the route below copy beside the film; 1100 px and below use one full-width three-part ruled line beneath the pair; phones use three compact rows before the film |

## Hero collage-retention correction — 2026-09-09

This direct clarification supersedes only the collage-removing directions in the previous Hero comparison.
The public Hero remains unchanged until the user chooses a layout.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Collage invariant | User's direct correction `нет, коллаж остается`; current 94-source local archive | Preserve documentary accumulation as a defining identity layer | No single-photo Hero, triptych replacement, reduced proof strip, generated filler or source deletion | Every comparison board contains the same complete archive; only its grid ratio and grouping change |
| Hierarchy correction | User's supplied failure capture; active Hero structure | The problem is distribution of copy, portrait and archive, not the existence of the collage | No new brand style, decoration, generic card system or arbitrary effects | Produce five layouts with grid apertures, horizontal band, diagonal sequence, archive frame and reversed split |
| Portrait integration | Current real `chef-hero-apron.jpg`; active square-edge rule | Make the portrait a deliberate anchor in the same compositional system | No floating rounded card, shadow, substitute person, cutout reconstruction or identity edit | Align the portrait to grid/band/frame geometry and keep it sharp above the documentary field |
| Copy integration | Exact title and current type/palette system | Reduce the blank paper footprint while preserving clean reading | No rewritten slogan, additional CTA, text shadow, glass surface or photo-wide dark wash | Use only solid or highly opaque project paper fields sized to the actual title |

## Selected Hero collage frame — 2026-09-09

The user's direct instruction `Делай коллаж рамку` approves comparison direction 04 and
supersedes the active split Hero composition. It does not alter any later page section.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Overall Hero | User-approved `04-collage-frame.png`; user's mandatory-collage correction | One central identity spread is surrounded by continuous documentary evidence | No generic centred landing Hero, photo veil, new brand style or additional marketing block | Make the full Hero a collage stage and place one square-edged copy/portrait spread inside it |
| Archive frame | Current complete 94-source Hero dataset; approved comparison source | Accumulation remains visible and gains an authored irregular rhythm | No source deletion, duplicate filler, external image or reduced proof strip | Render every source once; use 10 × 12 desktop, 12 × 10 compact and 8 × 15 phone partitions with exact wide spans |
| Central spread | Approved board; exact current title and portrait | Bind identity copy and chef portrait into a single editorial object | No floating card, radius, shadow, glass, overlay CTA or invented copy | Solid paper copy field at left and real cover-cropped portrait at right, divided by one 2 px seam |
| Phone composition | Selected board plus project's deliberate-mobile rule | Preserve the four-sided archive frame while giving text and portrait legible independent depth | No scaled-down side-by-side desktop spread, hidden portrait or long stack of collage thumbnails | Stack the copy above the portrait inside one inset central unit; keep archive rails visible on every side |

## Private-dinner photographic course field — 2026-09-09

The user's sequence `Фото сделай более реалистичные и сделай их в 2 ряда` → `Убери подписи, оставь картинки`
→ `внеси изменения в блок` supersedes the course-line drawing only inside `Частный ужин`. The exact live
service copy and documentary chef photograph remain approved.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Seven-course visual | User's direct request; the seven-course promise already present in live copy | Make seven distinct restaurant courses immediately recognisable through food photography | No abstract circles, technical route, arrows, numbers, stage names, dish names or decorative micro-labels | Add one text-free overhead photographic field containing exactly seven complete plates in two rows: four above and three centred below |
| Image character | User's rejection of the earlier AI-looking diagrams; approved `Transparent route plates` photo grammar in `docs/DESIGN_SYSTEM.md`; warm-paper editorial system | Reuse only the approved near-overhead camera, normal-lens perspective, consistent porcelain scale, soft upper-left daylight and natural imperfections so the plates feel photographic rather than diagrammatic | No glossy CGI finish, impossible garnish, duplicate plate, prop styling, hands, people, logo, watermark or reuse of the five named route dishes as menu claims | Use the generated `private-dinner-seven-plates-v1.jpg` only as a representative menu visual, never as documentary evidence of a delivered client menu |
| Existing live pair | Current `Частный ужин` copy and `/media/event-formats/private-dinner.jpg` | Keep the chef, offer and seven-course promise as the factual layer; let the plate field support them without repeating words | No rewritten promise, course captions, second CTA, card chrome or replacement chef image | Preserve the live number/title/paragraph and real chef photograph; place the plate field in the remaining lower paper area |
| Responsive composition | User's two-row requirement; project's deliberate-mobile rule | Keep the 4-over-3 relationship intact rather than stacking seven cards | No horizontal scroller, one-column list, clipped rims or desktop layout mechanically reduced to phone | Use a larger authored first-format field and fit the complete 3:2 plate image below the live pair at every required width |

No supplied reference fixes the exact percentage insets or first-format aspect ratios. Those remain neutral
fitting decisions constrained by the source image, the existing live apertures and collision-free checks.

## Approved real personal-menu plate — 2026-09-09

The user's supplied first menu-layout screenshot establishes the explanatory composition, while the user's
later supplied plate photograph is the authoritative food image and supersedes the rejected generated dish
experiments. The restaurant source page used to recover the same photograph at delivery resolution is
`https://www.deuxave.com/menu/`; publication rights are not established by this reference map.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Personal-menu image | User-approved `Снимок экрана 2026-09-09 в 22.02.33.png`; same high-resolution photograph from Deuxave's menu page | Use a genuinely photographed complete plate with visible meat, garnish and sauces as the focal object | No generated replacement, AI retouching, added food, changed colour, marble field or claim that Evgen cooked the pictured dish | Preserve the real source inside the rim, remove only the outer marble through alpha and deliver a versioned transparent web asset |
| Explanatory composition | User's first supplied menu-layout screenshot; exact current personal-menu copy | Let one isolated plate face the copy while three fine leaders make the culinary logic legible | No copied dish, handwriting, diameter values, measurement units, construction circles or rasterised explanatory text | Keep all explanations as live HTML and use one responsive SVG leader layer around the approved photograph |
| Culinary explanations | Exact three relationships visible in the supplied reference: texture/temperature balance, sauce joining flavour and dish, local/seasonal products | Explain the type of decisions made when a personal menu is composed without asserting a recipe or supplier | No ingredient list, cut name, provenance claim, metric, nutrition data or invented menu promise | Use `баланс текстур и температур`, `соус связывает вкус и блюдо`, and `локальные продукты · сезон` as concise callouts |
| Existing sourcing proof | Active personal-menu reset and current three-photo strip | Keep product choice as the documentary follow-on after the example plate | No replacement of meat/fish/produce scenes, new card row or second process diagram | Retain the unequal desktop proof strip and deliberate two-row phone composition unchanged beneath the annotated introduction |
| Responsive integration | Project's deliberate-mobile rule; approved photo's near-square plate | Preserve plate scale and clear food while moving labels into available perimeter space | No mechanically shrunken desktop figure, label overlap, baked text or horizontal scroll | Wide screens use copy-left/plate-right; tablet and phone place a purpose-built annotated figure after the copy with breakpoint-specific geometry |

The exact leader coordinates and responsive figure heights have no independent visual reference. They are
neutral fitting decisions tied to visible food targets and must be verified at all mandatory widths.
## Unlabelled drafting rules for the private-dinner field — 2026-09-10

The user's supplied mobile capture of the previously approved private-dinner mockup is authoritative for
the missing line structure. The request restores only its organising rules; all course labels remain
explicitly rejected.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Perimeter keyline | User-supplied `Photo 1.jpg` in the 2026-09-10 correction; approved square-edge paper system | Make the private-dinner composition read as one authored sheet rather than loose content on an empty field | No card fill, radius, shadow, double decorative frame or generic panel styling | Draw one inset `1px` `--rule` frame inside the existing first-format process field |
| Upper and lower rules | Same supplied mockup and the user's earlier direction `по периметру, сверху, снизу, между` | Establish quiet header/footer bands without adding another verbal hierarchy | No `ЧАСТНЫЙ УЖИН`, `СЕМЬ ПОДАЧ`, number, legend, unit or ornamental caption on the rules | Add one short inset rule near the top and one near the bottom; both remain empty and decorative |
| Content separators | Same supplied mockup; current live copy/photo/4+3 plate geometry | Use the vertical rule to distinguish copy from documentary photo and the horizontal rule to distinguish the live pair from the course field | No timeline meaning, arrows, course order, labels, extra nodes or line crossing through food and faces | Position a vertical spine only inside the upper live-content zone and a horizontal divider at the start of the plate zone; adapt their extents to the existing asymmetric wide layout |
| Line endpoints | Circular termini visible on the supplied vertical separator; existing `--accent-small` drafting accent | Give the vertical spine a deliberate beginning and end at small scale | No icon, marker legend, interaction, animation or repeated dot pattern | Use two small hollow endpoints with paper centres; hide the complete line layer from assistive technology |

Exact percentages at each breakpoint are neutral fitting decisions. They must keep the rules in quiet
paper gaps and preserve the approved copy, documentary photograph and complete seven-plate image.

## Quiet-zone MasterChef underlay — 2026-09-09

This table supersedes the active inline-map and proportional-field rows immediately above.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| One integrated stage | User's 00:34 desktop composition plus the latest rejection of the obscured v18 map | Photograph, live copy and process drawing occupy one rectangle, but each has a protected functional zone | No detached map poster, overlapping route fragments, card, border, shadow or generated copy | One fixed-ratio ivory `story-origin-lead`; documentary photograph upper left, live copy upper right, route underlay across the lower band |
| Desktop underlay | User's request to place the real photo and text first, then render the drawing to their dimensions | Reserve the entire upper half as clean paper and draw only the lower route continuation | No line, flag, label, plate or map contour beneath photo/copy | `masterchef-route-underlay-v3-desktop.webp`, 1774 × 887, fills the 2:1 stage without crop |
| Tablet underlay | User's demand that the whole composition remain proportional at intermediate widths | Preserve the quiet upper pair and complete route in one compact field | No over-tall phone poster or too-shallow 2:1 stage behind wrapped copy | `masterchef-route-underlay-v3-tablet.webp`, 1254 × 1254, selected from 561–900 px inside a 23:20 field; only surplus blank paper above the complete lower map is removed |
| Mobile underlay | User's requirement for a deliberate mobile composition with the same photo-left/text-right relationship | Recompose the same visual grammar vertically and keep the route complete from Spain to Cyprus | No mechanically shrunken desktop map, horizontal scroll, hidden endpoint or stacked photo-over-text layout | `masterchef-route-underlay-v3-mobile.webp`, 1086 × 1448, uses a protected upper 58% and lower map band |
| Route evidence | User's approved map-and-car concept and five country dishes | One continuous ochre line and vintage car connect the countries; food remains a separate realistic overlay | No active flag badges, leader network, country words baked into the image or SVG fragments | Underlay supplies map/route/car; five v2 native-alpha plate assets sit only in the lower band; live captions identify country and dish |
| Accessibility and provenance | Existing approved semantic itinerary and explicit disclosure | Decorative raster stays hidden from assistive technology while itinerary remains readable HTML | No essential words in the generated asset and no misleading documentary-food claim | Empty-alt `picture`; semantic ordered list/captions; disclose generated underlay and plate visualizations plus unconfirmed itinerary |

## Mobile Hero scale correction — 2026-09-10

The user's supplied phone capture and direct follow-up `Меньше текст и меньше квадрат с фото шефа` are
authoritative for the scale of the existing phone Hero only. The selected collage-frame direction, exact
copy, portrait source, archive and desktop/tablet composition remain approved.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| Phone title | User-supplied `Photo 1.jpg` and direct scale correction from 2026-09-10 | Preserve the five-line identity hierarchy but lower its visual dominance inside the central paper field | No rewritten heading, extra line, substitute font, tighter tracking or desktop typography change | Reduce only the `max-width: 560px` display clamp and its supporting mobile insets |
| Phone portrait field | Same capture and direct request; approved `04-collage-frame.png`; unchanged `chef-hero-apron.jpg` | Make the central identity object visibly smaller so the surrounding documentary archive reads as a frame | No new crop asset, retouching, rounded card, shadow, hidden portrait or reduction of the archive | Narrow and vertically centre the stacked spread; cap the existing cover aperture while preserving its square edges and caption |
| Archive rails | Approved collage-frame direction and complete 94-source local archive | The space released by the smaller copy/portrait unit belongs to visible photographic evidence on all four sides | No deleted, duplicated, blurred or replaced tile and no generic decorative background | Keep the 8 × 15 phone partition unchanged and expose more of it around the centred unit |

No supplied reference fixes the exact numeric reduction. The mobile font clamp, side inset and portrait cap
are neutral fitting decisions that must be checked at 430, 390 and 375 px and must not alter 561 px or wider.

## Private-dinner mobile editorial sheet — 2026-09-10

Photo 1 is a current-state anti-reference. Photo 2 is the authoritative positive reference through 560 px.
This entry supersedes the earlier mobile directions to retain `01`, omit captions and fit one complete 3:2
montage beneath the upper pair.

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|
| One mobile sheet | User-supplied Photo 2 and direct instruction that Photo 1 must look like it | Copy, documentary photo and seven-course evidence form one tall editorial rectangle | Browser chrome, detached technical poster, nested cards or unrelated empty paper | One square-edged bordered field with consistent inset and a content-derived portrait height |
| Utility header | Photo 2 | State service and scope before the display title | Decorative `01`, badge or second heading level | Live utility row `ЧАСТНЫЙ УЖИН` / `СЕМЬ ПОДАЧ` with one fine gold rule |
| Copy/photo pair | Photo 2; approved private-dinner copy and portrait | Give the offer and chef equal visual authority | Thumbnail photo, tiny title, cropped evidence or meaningless centre guide | Dominant title/paragraph left, complete portrait right, CSS divider with dots and `ГОТОВИТ ШЕФ` between them |
| Course sequence | Photo 2; existing seven-course source | Make the seven stages legible by directly pairing each plate with its role | Dish claims, arrows, diagram circles, numbers or one-column cards | Four labelled courses above and three centred below with the exact seven live course-type labels |
| Responsive/accessibility | Project deliberate-mobile rule | Author the phone composition independently and preserve semantic meaning | Scaled desktop canvas, horizontal scroller, baked raster text or SVG diagram | Semantic ordered lists; representative plate raster remains decorative; chef photo retains specific alt; all visible labels remain HTML |
