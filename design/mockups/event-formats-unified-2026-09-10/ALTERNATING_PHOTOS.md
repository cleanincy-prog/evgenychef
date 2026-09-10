# Чередование фотографий

Прямое требование пользователя: «И фото, должно быть первое справа потом слева потом справа».

В обоих эскизах меняется верхняя пара только второго формата: фотография переносится налево, текст — направо. Ужин и мастер-классы сохраняют фото справа. Уменьшенный масштаб канапе сохраняется. Это уточнение макетов, код сайта не меняется. Метод: встроенный image_gen.

## Промпт для телефона

Use case: precise-object-edit.
Asset type: three-panel mobile website mockup comparison board.
Input image 1 is the sole edit target. Make exactly one layout change in the UPPER description-and-photo pair of the MIDDLE panel 02 «Приватные мероприятия»: exchange the horizontal positions of the photograph and its description. Put the photograph on the LEFT and the complete description on the RIGHT. Keep the full-width 02 number and title above this pair at exactly their current positions. Preserve the photograph's current size, proportions, content, chef identity, crop and context; translate it horizontally only, DO NOT mirror or flip the image itself. Keep a fine vertical separator between photo and description. Use the existing paragraph typography and left-aligned text, natural line wrapping fitting the right column.
Middle description text verbatim: «Я соберу свободный формат с небольшими закусками и блюдами, которые удобно есть за разговором.» Preserve all words and punctuation.
Strict invariants: Panels 01 and 03 remain absolutely unchanged, with their photos on the RIGHT. This establishes photo positions RIGHT / LEFT / RIGHT across the three panels. Keep every reduced-size canapé in the middle lower area unchanged in size, position, count, order, shadows and appearance. Keep all lower regions and labels unchanged in all panels. Preserve canvas dimensions/crop, complete frames and section geometry, paper background, palette, all other text letter-for-letter, fonts, line weights, spacing and title positions. The middle photo-description row keeps its current upper and lower bounds. Change no content. No additional decorations. No redesign.

## Промпт для компьютера

Use case: precise-object-edit / ui-mockup.
Edit the supplied desktop website mockup to make the documentary PHOTOGRAPH positions alternate: section 01 photo RIGHT, section 02 photo LEFT, section 03 photo RIGHT.
ONE LOCAL CHANGE ONLY: in the UPPER header area of the MIDDLE section numbered 02 "Приватные мероприятия", SWAP the existing photograph and text columns. Place the existing photo of the chef making crepes at the LEFT with the same displayed dimensions and orientation; move the COMPLETE existing copy group (02 + short line, title, full paragraph) to the RIGHT. Put a fine vertical separator in the gap between them. Keep the copy left-aligned within its new right column, and preserve the existing title and body font sizes, colors and hierarchy. Text may naturally reflow if needed but must be verbatim. The common paper background fills the vacated spaces. The panel height and its horizontal dividers must stay unchanged.
DO NOT mirror or flip the photograph pixels. This is a column-position swap, not a horizontal flip of the whole section. Preserve the chef, head, hands, crepe-making activity and natural original orientation.
STRICT INVARIANTS: section 01 and section 03 remain visually unchanged, with their photos on the RIGHT. Keep the latest SMALLER canapes in section 02 exactly the same size, rows, positions and amount; do not enlarge or move them. Preserve ALL lower food/technique imagery, labels and all other text, frame lines, palette, type styles, page dimensions, crop and complete three-section layout. No new images, controls, banners, captions, effects or decorative objects. Return the full portrait desktop design mockup, not a crop.
