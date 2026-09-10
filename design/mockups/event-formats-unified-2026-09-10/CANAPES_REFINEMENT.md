# Уменьшение канапе

Прямой запрос пользователя: «Может сделать канапе меньше?»

Принятое для эскиза изменение: примерно −25% по ширине и высоте каждого канапе, с сохранением центров предметов, рядов и общих размеров секций. Сайт и исходные фотографии не меняются. Метод: встроенный image_gen, отдельные правки компьютерного и мобильного макетов.

## Промпт для компьютера

Use case: precise-object-edit. Make one very localized edit to this desktop website design mockup.
TARGET: only the canapes, the small finger-food objects in the LOWER part of the SECOND section "02 Приватные мероприятия", between the horizontal dividers beneath its text/photo and above "03 Мастер-классы".
CHANGE: reduce the width AND height of EACH INDIVIDUAL canape to about 75% of its current size, centered on the exact same center point as before. Preserve the complete existing set, their order and their three rows. Scale each object's natural shadow with it. Let the existing warm paper show through the space freed around every snack. The goal is visibly smaller bite-size canapes with more breathing room, balanced against the much larger seven plates above.
STRICT INVARIANTS: preserve whole image dimensions and crop; preserve ALL section frames, all horizontal/vertical dividers and their coordinates, all text letter-for-letter including labels, ALL documentary chef photographs, all colors/fonts, all section heights and spacing. Preserve section 01 and section 03 absolutely unchanged. Do not shrink the whole canape band as one centered thumbnail: keep its original spread across the width, only shrink the individual snacks around their current positions. Do not add or remove snacks, do not change ingredients, do not create extra rows. No new UI, captions or arrows.
Return the full edited desktop mockup with all three sections visible, not a crop.

## Промпт для телефона

Use case: precise-object-edit.
Asset type: mobile website UI mockup comparison board, three panels.
Input image 1 is the sole edit target. Make ONE local object-size change only: in the bottom content region of the MIDDLE panel numbered 02, under the heading «Приватные мероприятия», scale every individual canapé down to approximately 75% of its original width and height, centered at the exact same existing center. There are four existing rows of canapés: keep every object, keep their exact order, keep the same number per row, and keep all four row center positions and the overall arrangement. Keep each food object recognizable and scale its contact shadow with it. Reveal more of the same cream paper background between each smaller canapé. Do not shrink the whole lower region or a combined board: reduce each individual food object only.
STRICT INVARIANTS: Keep the canvas size and crop, all three panel frames, complete section geometry and lower-zone height exactly unchanged. Preserve all text letter-for-letter, typography, lines, separators, photos, palette, textures and all layout positions. The LEFT panel 01 and RIGHT panel 03 must remain absolutely unchanged. Within the middle panel, everything outside the individual canapés and their shadows remains unchanged. Do not add, delete, merge, reorder, or relocate any canapé. Do not regenerate or redesign the layout. The intended result is the same mockup with visibly lighter, smaller bites and more paper visible between them.

## Результат

- [Компьютер](desktop-v3-smaller-canapes.png)
- [Телефон](mobile-v2-smaller-canapes.png)

Генерация визуально уменьшила канапе примерно на четверть и сохранила существующие ряды. У мобильного результата ширина 1354 px вместо исходных 1355 px; это raster-концепт, а не точное масштабирование исходника. Возможны небольшие генеративные изменения в деталях других фотографий. Код сайта не менялся.
