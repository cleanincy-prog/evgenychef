## Выразительность выбранного макета — 2026-09-11

[Повторный аудит и план](PAPER_EDGE_EXPRESSION_2026-09-11.md): бумажная оболочка699c96b читается как тонкая рамка; воспроизвести толщину кромки и более длинную левую/нижнюю тень источника, усилить штрих подписи. Сохранить компоненты, фото, тексты, общий фон и геометрию; создать только следующую версию SVG-кромки. Затем семь ширин и прежняя публикация.

## Бумажный край вместо светлой оболочки — 2026-09-11

До кода выполнен [аудит и план](PAPER_EDGE_STICKERS_2026-09-11.md). Пользователь выбрал конкретный «Бумажный край». Заменить только светлую основу/равномерную тень: общий --paper, SVG-срез в декоративном псевдоэлементе, локальная тень снизу слева. Существующая разметка, фото/тексты и desktop/mobile-композиция остаются; новых компонентов/библиотек нет. Пройти семь обязательных ширин, существующие проверки и антишаблонный аудит, затем прежняя публикация с историей.

## Цельные стикеры — 2026-09-11

До интерфейсного кода выполнен аудит источников, компонентов, CSS, медиа, адаптивности и QA. [Текущий план](FORMAT_STICKERS_2026-09-11.md): выбранная бумажная оболочка объединяет реальное фото и живую подпись; номера удаляются, даты не добавляются; крупные стикеры адаптируются для desktop/планшета/телефона; sizes обновляется. Вне форматов всё остаётся. Stock-компонентов нет, новая библиотека/компонент не нужны. Семь ширин и anti-template аудит обязательны перед прежней публикацией.

## Широкое фото «Частный ужин» — 2026-09-11

До изменения кода проверены app/page.tsx, app/site-images.ts, globals.css, манифест/генератор изображений, семьразмерный QA и актуальная документация. Пользователь выбрал конкретный private-dinner-wide-v2.png и поручил добавить на сайт. Шаблонных элементов в затрагиваемом открытом списке нет; все компоненты остаются, переработка компоновки и новые компоненты не нужны. План: сохранить выбранный PNG под отдельным именем, создать пропорциональные WebP384/768, подключить только к первой услуге с истинной геометрией1536×1024, проверить семь обязательных ширин, загрузку и полный кадр, собрать и опубликовать в прежние GitHub/Sites. Оригинальный JPEG, его коллажное вхождение и две другие услуги сохраняются. [Подробный аудит и отчёт](PRIVATE_DINNER_WIDE_2026-09-11.md).

## Уточнение заголовка «МастерШеф» — 2026-09-11

План до правки: изменить только award-title и убрать повтор этой фразы в начале award-note; сохранить фото, абзацы, CSS и компоненты. Источник — прямое уточнение пользователя. Шаблонных элементов и новых компонентов нет. Проверить семь ширин и сборку; подробности в MASTERCHEF_TEXT_2026-09-11.md.

## Текущая правка: текст «МастерШеф», 2026-09-11

До изменения интерфейса выполнен аудит, источники и план записаны в [MASTERCHEF_TEXT_2026-09-11.md](MASTERCHEF_TEXT_2026-09-11.md). Только дословная замена подписи и необходимое отображение длинного текста на телефоне в существующем стиле.

## Усилить и согреть фон Hero — 2026-09-11

До кода проверены CSS (палитра, изоляция, z-index, overflow, брейкпоинты), DOM-иерархия, предыдущие визуальные проверки и действующие документы. Референс — прямой запрос усилить размытие и добавить кремовый/слегка оранжевый оттенок, совместимый с одобренной бумажной палитрой. Изменить только фон: blur 0.7px→2px и ровная вуаль rgb(246 224 196 / 24%) через hero-collage::after. Все существующие компоненты сохраняются, новые не требуются; шаблонных элементов и переработок композиции нет. Проверить семь обязательных ширин, отсутствие тонирования/размытия центра, обрезку краёв и стабильность скролла. Сборка и публикация в прежний сайт.

## Усилить размытие Hero — 2026-09-11

До правки повторно проверены CSS Hero, актуальные документы и неизменная DOM-иерархия из предшествующего аудита. Прямой запрос «Нужен больше блюр» после 0.3px требует только увеличить радиус до 0.7px. Все компоненты остаются; шаблонных элементов, композиционных переработок и новых компонентов нет. Источник решения — последовательные уточнения пользователя и одобренный Hero. Проверить семь обязательных ширин, чёткий центр и стабильность прокрутки; сборка и публикация в тот же сайт.

## Минимальное размытие Hero — 2026-09-11

До правки проверены текущий CSS, DOM-иерархия Hero и актуальные документы. Запрос пользователя уточняет единственный параметр: снизить blur(1.1px) до едва заметных 0.3px. Все существующие компоненты остаются; шаблонных элементов, новых компонентов и композиционных изменений нет. Референс — прямое уточнение «примерно 5%» и одобренный Hero. Проверить семь обязательных ширин, чёткость центра и неизменность геометрии при прокрутке; собрать и опубликовать в прежний сайт.

## Лёгкие изображения и мягкий фон Hero — 2026-09-11

До изменения интерфейса проверены исходники и суммарный вес изображений14.17МБ. [Полный аудит и план](IMAGE_LOADING_2026-09-11.md): создать WebP-производные иsrcset по размеру применения, сохранить оригиналы, применить blur1.1px только к hero-collage-grid. Все компоненты остаются, новые не нужны; шаблонных элементов нет. Проверить семь ширин, экономию байтов, чёткий главный портрет/текст, загрузку и стабильность скролла.

## Устранение рывков фотографий Hero — 2026-09-11

До изменения CSS проверены Hero, источники изображений, resize/scroll-обработчики и действующие документы. [Причина и план](HERO_SCROLL_STABILITY_2026-09-11.md): удалить три динамических dvh-переопределения и оставить существующую svh-высоту. Новых компонентов/шаблонных элементов нет; все композиционные решения остаются. Проверить семь ширин, геометрию фото при скролле и обратной прокрутке, сборку и существующие HTTP-тесты.

## Замена фото «МастерШеф» — 2026-09-11

До изменения интерфейса проверены оба вхождения снимка, CSS и действующие документы. [Аудит и план](MASTERCHEF_PHOTO_2026-09-11.md): новый оригинальный JPEG; замена источника в блоке победы и коллаже; истинные размеры 1280 × 1160; естественная высота основного фото при прежней ширине. Шаблонных элементов нет, все компоненты остаются, новых не требуется. Семь обязательных ширин и финальный аудит после замены.

## Уточнение: Hero заполняет мобильный экран — 2026-09-11

До правки CSS проверены текущий Hero, соседний блок и новый скриншот; причины и план записаны в [HERO_MOBILE_VIEWPORT_2026-09-11.md](HERO_MOBILE_VIEWPORT_2026-09-11.md). Изменяется только минимальная высота поля в компактных брейкпоинтах до 1100 px: видимая высота браузера минус header. Шаблонных элементов нет; все компоненты остаются, новые не нужны. Сохраняются текст, портрет и квадратный последний ряд. Проверить семь обязательных ширин и дополнительные короткие/высокие телефоны.

## Текущая правка мобильного края Hero — 2026-09-11

Аудит и план до CSS: [HERO_MOBILE_EDGE_2026-09-11.md](HERO_MOBILE_EDGE_2026-09-11.md). Поднять текст уменьшением внешнего отступа; завершить фотополе одним квадратным рядом, сохранив размеры ключевого фото и весь текст.

## Текущая правка: только фотографии — 2026-09-11

Аудит и план до кода: [HERO_PHOTOS_ONLY_2026-09-11.md](HERO_PHOTOS_ONLY_2026-09-11.md). Удалить31 видеокадр из коллажа, заполнить рамку63 оставшимися снимками; текст, центральное фото и остальные разделы сохранить.

## Текущая правка: большой коллаж — 2026-09-11

Аудит и конкретный план до кода: [HERO_LARGE_COLLAGE_2026-09-11.md](HERO_LARGE_COLLAGE_2026-09-11.md). Переносится только полное фотополе из Mise en place, центральный текст/портрет и остальные блоки сохраняются.

## Размеры фотографий форматов — 2026-09-11

До изменения CSS выполнен аудит исходников и активной сетки. План: единые области 3:2 и contain/center; убрать индивидуальные размеры/позиции трёх фото; сохранить строки, семантику, подписи, исходные изображения и брейкпоинты. Шаблонных элементов не найдено; новых компонентов/библиотек нет. После правки проверить полные кадры и равные размеры на семи обязательных ширинах. Подробности: FORMAT_IMAGE_SIZES_2026-09-11.md.

## Возврат предыдущего шрифта — 2026-09-11

По прямому поручению пользователя отменить только пробу Bad Script: удалить её @font-face/токен/переопределения, восстановив исходный Caveat и размеры. Остальные изменения сайта сохраняются. Аудит и результаты — [FONT_PAIRING_2026-09-11.md](FONT_PAIRING_2026-09-11.md).

## История пробы пары шрифтов — 2026-09-11

Предварительный аудит, распределение селекторов и план записаны до правки интерфейса в [FONT_PAIRING_2026-09-11.md](FONT_PAIRING_2026-09-11.md). Bad Script — только крупные заголовки и личное приглашение; Caveat сохраняется в остальном. Новых компонентов, шаблонов и библиотек нет. Проверка семи ширин и сборка, локальный просмотр 3004.

## Кремовая тарелка с уткой — 2026-09-11

Предварительный аудит и план записаны в CREAM_DUCK_PLATE_2026-09-11.md: изменить только цвет керамики по прямому запросу и --paper #F4EFE5, сохранить кадр/еду/прозрачность, подключить версионный актив и проверить семь ширин. Шаблонных элементов в блоке не найдено; сохраняются MenuPlate, PlateLeaders и текущая адаптивность; новых компонентов и UI-библиотек не нужно.

## Коррекция выносок после замечания пользователя — 2026-09-11

Статичные линии не соединяются с фактическими описаниями. Их заменяет измеряемый SVG: строго горизонтальное начало у края текста (зазор6 px), один диагональный отрезок и кольцо в фиксированной относительной точке реальной фотографии. Отдельная мобильная привязка под/над текстом, перерасчёт после переносов и загрузки шрифта. Источник — пользовательский скриншот подписей и прямое «Полоски не ровно и не доходят к описанию». Новых шрифтов/палитры/декора/библиотек нет. Прежнее утверждение о завершённой геометрии заменяется этой коррекцией. Аудит, план и проверка: [PLATE_CAPTIONS_2026-09-11.md](PLATE_CAPTIONS_2026-09-11.md).

# Текущая правка: подписи блюда — 2026-09-11

Аудит и план до изменения интерфейса записаны в [PLATE_CAPTIONS_2026-09-11.md](PLATE_CAPTIONS_2026-09-11.md): четыре полных пояснения из пользовательского скриншота, читаемые поля вокруг фотографии, отдельная мобильная геометрия и проверка маршрута. Новых компонентов/UI-библиотек нет. Только локальная копия 127.0.0.1:3004.

# Обновление 2026-09-11: Шеф4

Текущий перенос и карандашная типографика завершены. Актуальный план, аудит и результаты: [PENCIL_FONT_2026-09-11.md](PENCIL_FONT_2026-09-11.md). Адрес этой копии — 127.0.0.1:3004. Ниже сохранена историческая документация предыдущего этапа.

# Implementation plan — local «План вечера», 2026-09-10

## Root handoff verification — 2026-09-10

Финальная локальная сборка, lint, TypeScript и 5 HTTP-тестов прошли. Последний браузерный прогон `artifacts/evening-plan-local/qa-report.json` прошёл на всех семи ширинах и подтвердил восстановление видео после ошибки кнопкой «Повторить». Root выполнил read-only сравнение оригинала с baseline: 726 файлов, общий SHA-256 и raw Git-статус совпали. Подробный итог и список файлов — `artifacts/evening-plan-local/REPORT.md`. Запуск только 127.0.0.1:3001; публикации не было.


Status: **local interface implementation, seven-width browser verification and final independent anti-template audit complete; final original-integrity comparison and overall handoff remain with the root task**. Audit/reference map/design system updated; both approved PNGs visually inspected. All work occurs in this copy. Original folder/site/hosting stays untouched; localhost only, no deployment/public preview/tunnel/Git publication.

## Completion record — 2026-09-10

Steps2–7 and the design/anti-template portion of step8 are complete. The running local server is `http://127.0.0.1:3001`; final screenshot/browser run17:08:49–17:09:08 UTC passed all seven widths. Source photograph crops, route/“Соус” separation, plate/04 gap and mobile line termination were independently rechecked after corrections. Documentation records the final actual CSS values and source-media adaptations. Interface isolation/noindex and loopback behavior were observed in the local browser run; root remains responsible for the final complete infrastructure/build report, read-only baseline comparison and user handoff. No deployment or message sending is requested.

1. Complete local isolation: remove Sites/hosting references only here, empty D1/R2 bindings if local Cloudflare plugin remains, bind 127.0.0.1:3001 (or free local port), local SITE_URL/noindex, retain AGENTS policy + explicit local-only instructions, root README local startup. Install independent dependencies here.
2. Rebuild Home as approved: collage frame → compact MasterChef proof → three open format rows → four-stage evening process → Instagram invitation. Stop rendering old geography/car, full seven-plate/canapé/technique groups, separate film/menu chapters. Keep historical assets without using old contradictory layout CSS.
3. Retain fonts, real portrait/award/service photos/plate/film. Curate 24 unique desktop Hero frames and 14 readable phone frames; preserve original colours and actual source geometry. Do not reproduce mockup-generated photographic distortions.
4. Implement semantic open service list and process sequence: 01 Разговор → 02 Меню → 03 Подготовка → 04 Ваш вечер. Desktop spatial route; mobile separate vertical line at left. Whole plate with four live neutral labels inside Menu; original film inside Preparation.
5. Use source-aware portrait/video crops; vertical dinner source keeps head/hands/pan in a modest supporting field. Film starts on request, has poster and accessible controls. Produce conversation/toast graphite process illustrations with image tooling, provenance and truthful illustrative alt text.
6. Add exact “Начнём с вашего вечера”, one “Написать в Instagram ↗” primary action, @evg.chef and “В первом сообщении укажите дату, число гостей и формат”. No invented facts/recipes/prices/reviews/capacities/cleanup promises or automatic message sending.
7. Start only on loopback. Run relevant lint/static/build checks and browser inspect 1440,1280,1024,768,430,390,375px. Verify readability, real crops, intact plate, video/loading/control/reduced-motion, headings, links/skip/focus/target size and zero horizontal overflow. Save screenshots locally.
8. Record final anti-template audit, actual fitting values, results and limitations. Check original integrity read-only against baseline, avoiding secrets/excluded metadata. Report local URL and main created/changed files.

Retain: self-hosted fonts, original media, semantic anchors/skip link and useful video behavior. Rework: Home, Hero apertures/selection, format rendering, plate integration/callouts, responsive CSS, invitation/video accessibility. Newly needed only: compact format rows, four-stage semantic process/decorative route and two process illustrations. No UI kit or form required.

Anti-template test: no generic centered two-action Hero, equal cards, dark banner, arbitrary stock icon/gradient/radius/shadow, fictional slogans or merely scaled mobile desktop map. All major blocks trace to approved PNGs and real content. The implementation/visual portions of this original pre-code plan are complete: all seven widths passed the final browser run and independent screenshot review. Final original-integrity verification is not claimed by this document.
