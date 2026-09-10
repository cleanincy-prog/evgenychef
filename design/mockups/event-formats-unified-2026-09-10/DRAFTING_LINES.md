# Единые линии трёх блоков

Прямой запрос: «Там есть красивые полоски в блоке частный ужин, давай такие везде сделаем».

Источник оформления линий — существующий блок частного ужина: `artifacts/event-formats-inspection-2026-09-10/390-1.png`, а также `.format-menu-drafting-*` и `.format-dinner-axis` в `app/globals.css`. Заимствованы тонкий контур, верхняя и нижняя рейки, горизонтальный разделитель и золотистая вертикальная линия с маленькими полыми окончаниями. Надпись «ГОТОВИТ ШЕФ» и прежний заголовок не переносятся: запрос касается линий. Это уточнение эскизов; оно сохраняет уже заданное чередование фото и уменьшенные канапе.

Метод — встроенный image_gen. Код сайта не меняется.

## Промпт для телефона

Use case: precise-object-edit.
Asset type: mobile website mockup comparison board with three panels.
Input image 1 is the SOLE EDIT TARGET: the existing three-panel mockup. Input image 2 is a STYLE REFERENCE ONLY for fine drafting lines, especially the narrow gold vertical line with a tiny hollow circle at each endpoint in the Private dinner section. Do not use reference image 2 for layout, content, photographs, background crops, title styling, typography or text.
Primary request: unify the line vocabulary across all THREE panels of image 1. Each panel must have the SAME thin square-corner perimeter, the same fine upper and lower horizontal rails, and the same fine horizontal divider above the food/technique region. These frames and horizontal lines are muted warm gray, consistently fine and quiet. Keep their current geometry and placement.
In EACH of the three panels, restyle the existing vertical separator between description and photograph as a thin muted golden-brown vertical spine with TWO tiny HOLLOW circular endpoints, one at its top and one at its bottom, following ONLY that line principle in reference image 2. The spine remains in the existing gap between text and photo, spanning the existing photo-description row. Leave adequate clear paper around the spine and tiny circles; no line or circle may touch text, image or food. All three vertical spines use identical weight, color and circle diameter. Keep the short golden horizontal line next to 01, 02, 03 uniform as already present.
STRICT INVARIANTS: Preserve canvas size and crop, panel sizes, section heights and layout. Preserve all words letter-for-letter, fonts, text sizes, wrapping, positions and colors. Do NOT add any label to the vertical spines. In particular do NOT add «ГОТОВИТ ШЕФ», utility headers, or any text from reference image 2. Keep photographs at RIGHT / LEFT / RIGHT exactly as in image 1, with middle panel photo on the left and complete description on the right, full-width 02 title above. Preserve each photo size, content, identity and crop; do not mirror photos. Preserve the existing smaller canapés and all food positions, counts, order, size and shadows. Preserve all dishes, tools, labels, lower-zone geometry and paper background. No new per-food frames, no cards, no thick outlines, no additional ornaments, no redesign. Change only the line treatment, with a visibly consistent delicate drafting vocabulary in all three panels.

## Промпт для компьютера

Use case: precise-object-edit / ui-mockup.
Input 1 is the SOLE EDIT TARGET: the current desktop design mockup with three stacked services and alternating photos. Input 2 is a STYLE REFERENCE ONLY: the original private-dinner mobile editorial sheet. The user likes the delicate drafting lines of private dinner and asks for the SAME line treatment throughout all THREE sections.
CHANGE ONLY THE STRUCTURAL LINE LAYER of input 1:
- Give each of the three service sections the same delicate square-edged inset perimeter treatment. Use fine continuous muted warm gray #c8c0b3 strokes, visually around 1px at original width, never thick borders or cards.
- Make the upper and lower horizontal inset rails and the horizontal divider ABOVE each lower food area consistent in stroke, color and clear inset. Use the quiet refined drafting grammar of input 2. Preserve the existing section boundaries and dimensions. Avoid accumulating redundant extra lines.
- In the upper text/photo gap of EACH section, use a thin subdued golden-brown #72561f vertical drafting line with a TINY HOLLOW CIRCLE at EACH END, as visible in input 2. The line is confined to the upper content zone. Endpoints are small, discreet and identical across the three sections, approximately 5px across at a 1044px-wide full board. No arrows. No text along the spine.
- Keep the existing short gold rule next to each 01/02/03 number, identical in style and length.
DO NOT copy any words or layout from input 2. Specifically do not introduce 'ГОТОВИТ ШЕФ', the extra 'ЧАСТНЫЙ УЖИН / СЕМЬ ПОДАЧ' utility row, or a different title/photo arrangement. It is strictly a line-style reference.
STRICT INVARIANTS: Keep all content and geometry of input 1. Photo positions remain section 01 RIGHT / section 02 LEFT / section 03 RIGHT. Text and photograph in section 02 stay in their current alternating positions. All titles, body paragraphs, seven plate captions and six technique captions stay exact with their current type sizes and positions. Preserve the SMALLER canapes exactly in their existing three rows, retaining object scale and centers. Keep all seven plates, all technique imagery, the documentary photos, palette, paper, spacing, and dimensions. Add no new photo, food, claim, banner, CTA, icon, circle around food or per-item box.
The result should clearly show ONE consistent delicate editorial drafting system framing the same three content-specific compositions. Lines must stay in quiet gaps and never cross a face, text or food. Return the complete full desktop mockup at the same crop, not a zoom or detail view.
