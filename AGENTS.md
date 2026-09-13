# Этапы ещё немного ниже — 2026-09-13

Последующее «Если чуть чуть еще ниже?» увеличивает коэффициент сдвига02/04 с30% до40% в прежней лесенке. Это ещё55px на1440/1280 и48px на1024. Остальная композиция и mobile сохраняются. Аудит и проверка: docs/PROCESS_STAGGER40_2026-09-13.md. Следующая запись30% — предыдущая версия.

# Этапы лесенкой — 2026-09-13

Запрос «каждый подпункт шел ниже другого на30%» для «От разговора — к вашему столу» реализован в существующих46%/54% колонках:02 ниже01 на30% высоты его содержания;04 ниже03 минимум на30% высоты его содержания, с необходимым проходом под тарелкой02.03 сохраняет место под рисунком01. Отступы измеряет существующий маршрут; первая дуга проходит над текстом и опускается к02. До900px сохраняется одобренная вертикальная последовательность. Bellota400, тексты, медиа и прочие блоки прежние. Точная интерпретация, аудит и проверка: docs/PROCESS_STAGGER_2026-09-13.md.

# Выбран Bellota Text — 2026-09-13

Прямое «Третий вариант» выбирает Bellota Text из пяти шрифтовых макетов. Весь сайт использует normal400 из выбранного образца; локальные кириллица/латиница inline/block и font-synthesis:none. Размеры и композиции остаются прежними. Источник: design/references/approved-bellota-text-{desktop,mobile}-2026-09-13.png. Аудит и проверка: docs/BELLOTA_TEXT_2026-09-13.md. Нижележащие Shantell/Caveat — предыдущие версии для истории и отката. Остальные правила проекта сохраняются.

# Проба Shantell Sans — 2026-09-13

По прямому «Давай Shantell Sana попробуем» весь сайт использует выбранный Shantell Sans: normal400, акценты500, локальная кириллица/латиница inline/block без смены шрифта при обновлении. Типографические размеры подогнаны к прежней композиции; пять строк и текст Hero, медиа и прочее содержание сохраняются. На901–1100px слегка расширена подпись «Текстуры» и добавлен внутренний запас абзацу этапа03; header/footer допускают перенос при увеличении текста. Caveat сохранён для отката. Аудит, точные значения, семь ширин и проверки: docs/SHANTELL_SANS_2026-09-13.md. Предыдущие указания единого Caveat ниже описывают версию до этой пробы.

# Позиция старта видео — 2026-09-13

Прямое «Нужно что бы оно начиналось в положении на скриншоте» заменяет запуск при появлении 1% на полную видимость кадра с небольшим отступом снизу, как на design/references/approved-video-start-position-2026-09-13.jpg. При коротком экране используется максимально доступная видимость; после старта видео играет до ухода с экрана. Текст, CSS, 9:16, медиа, ручное управление и reduced motion сохраняются. Аудит и проверка: docs/VIDEO_START_POSITION_2026-09-13.md.

# Одобренный текст — 2026-09-13

По прямому «Отлично, добавь на сайт этот текст» перенесена последняя редакция: биография, три формата, этапы «Знакомимся / Продумываю меню / Готовлю к встрече / Ваш вечер», подписи тарелки и видео. Пользователь исключил «Евгений, есть идея…» и всё после него: предложенные контакт/подвал не добавляются; прежние контакт «Начнём с вашего вечера.», Instagram и подвал сохранены. «Обсудить вечер» остаётся в шапке без дубликата. Последующее «В Хиро блоке текст не меняй, оставь как есть» сохраняет исходный первый экран «Евгений Гребеник — ваш личный Мастер-Шеф на Кипре», его CSS и композицию; предложенные «Кого соберём…» и вводный текст Hero не используются. Биография под первым экраном остаётся новой. Фотографии, Caveat и концепция «План вечера» сохранены. Источник, аудит и проверка: docs/APPROVED_COPY_2026-09-13.md. Более ранний независимый отчёт — исследование, не финальный текст.

# Видео подготовки — 2026-09-12

По прямому запросу удалена опция «Смотреть фильм». Текущий ролик public/media/chef-story-short-prep-2026-09-12.mp4 сокращён на повторных планах мытья овощей (5.166667–7.733333 с исходника); оригинал сохранён. Плеер сразу показан 9:16, заранее загружается и запускается без звука при прокрутке до него, пауза вне экрана, ручное управление и reduced motion сохраняются. Отчёт: docs/VIDEO_SCROLL_2026-09-12.md. Остальные правила проекта ниже остаются.

# Текущая политика проекта — 2026-09-11

Пользователь уточнил правильную фамилию: «Гребеник». В актуальном содержании использовать «Евгений Гребеник» / «Evgen Grebenik»; прежние Грыбенюк/Грыбеник/Grybenyk в исторических отчётах и технических именах файлов не являются актуальным написанием. Проверка: docs/CHEF_SURNAME_2026-09-11.md.

После замечания «Ты сделал не так выразительно как на макете» усилены толщина кромки, прилегание слева/снизу, штрих названий и подчёркивания в рамках того же выбранного «Бумажного края». Общий фон, фотографии и форма остаются. Текущая проверка: docs/PAPER_EDGE_EXPRESSION_2026-09-11.md.

Последний выбор «Давай этот» — бумажный стикер из design/references/approved-paper-edge-sticker-2026-09-11.png: общий со страницей --paper, простой прямоугольник с мелким неровным срезом и локальной тенью снизу слева. Светлая заливка прежней оболочки заменяется. Фигурные выемки, загнутые углы, плёнка и приподнятая нижняя полоса не выбраны. Сохраняются размеры, наклоны, фото, подписи и отсутствие номеров/дат. Аудит и проверка: docs/PAPER_EDGE_STICKERS_2026-09-11.md.

Предыдущий выбор пользователя — цельные фото-стикеры с подписями для блока «Какой будет ваш вечер?», утверждённые «Давай добавим на сайт». Референс: design/references/approved-whole-stickers-2026-09-11.png; аудит и реализация: docs/FORMAT_STICKERS_2026-09-11.md. Разрешены именно в этом блоке бумажная оболочка, небольшие радиусы/контактная тень, статический лёгкий наклон и карандашные подчёркивания. Номера услуг исключены; идея дат отменена «Или не надо». Это прямое исключение из общего запрета неподтверждённых карточек/теней, а не разрешение менять другие разделы. Все остальные правила ниже сохраняются.

Рабочая папка: `/Users/dmitro/Documents/ChatGPT/Шеф4`. Текущая версия — «План вечера» с единым карандашным Caveat. Проба Bad Script отменена прямым «Верни предыдущий шрифт»: восстановлены прежняя гарнитура и размеры заголовков. История и проверка: docs/FONT_PAIRING_2026-09-11.md. Главное фото Hero возвращено к исходному фону по «верни пожалуйста» после кремовой пробы. Прозрачный public/media/chef-hero-apron-cream.png сохраняется в папке по отдельной просьбе пользователя, но не подключается к Hero. История и проверка: docs/HERO_CREAM_PORTRAIT_2026-09-11.md.

Пользователь прямо поручил: «Закомить пока этот сайт вместо другой версии на гитхаб и сервер» и указал https://github.com/cleanincy-prog/evgenychef . Этот запрос отменяет прежний запрет публикации данной копии. Авторизованы коммит, push в main указанного репозитория и замена действующей публичной версии https://evgenychef.com через существующий Sites-проект appgprj_6a981b9ab8708191b17ebf66cc5f818f. Не создавать новый сайт, не менять аудиторию или домен; сохранять историю и существующие версии для отката.

Все изменения исходников выполняются в Шеф4. Предыдущие локальные копии не изменяются и их Git-история не импортируется. Секреты не хранить в файлах, Git или удалённых URL. Не публиковать runtime-кэши, .env, PID-файлы и логи.

Локальный preview остаётся только на 127.0.0.1:3004 и получает HTTP noindex. Опубликованный сайт использует canonical https://evgenychef.com/, индексируемые метаданные, robots.txt и sitemap.xml. Start-local.command и Stop-local.command работают с этой папкой.

Прямой запрос «Сделай и шрифт сайта карандашный» заменяет исторические требования сохранять Cormorant/Montserrat. Композиция основана на одобренном «Плане вечера»; новый запрос требует публикации текущего результата, а не дополнительного редизайна. Исторические отчёты сохраняются как история; актуальная запись — docs/RELEASE_2026-09-11.md.

---

# Project Instructions

These instructions apply to the whole repository and are mandatory for every agent and every future interface task.

# Reference-Driven Design Policy

This is a critical architectural rule of the project. It has priority over development speed, implementation convenience, familiar model patterns, and solutions previously generated by a model.

## 1. Permanent project rule

It is forbidden to create an interface from:

- a model's internal templates or defaults;
- typical AI-generated landing pages;
- ready-made landing-page kits;
- standard SaaS templates;
- standard Tailwind, Bootstrap, Material UI, Ant Design, or shadcn compositions;
- sites previously created by a model;
- generic UI compositions without a confirmed reference;
- a visual style automatically inferred from the project's topic.

All visual and compositional decisions must be grounded in at least one of these sources:

1. references supplied by the user;
2. the project's approved design system;
3. the project's existing approved interface;
4. concrete requirements in project documentation;
5. the project's actual content, business goals, and user journeys.

UI libraries may be used only as technical primitives. Their default appearance must not remain, and their demo compositions must not be used as a ready-made interface.

## 2. Prohibited template patterns

Do not use any of the following unless a confirmed reference or an explicit project requirement directly supports it:

- a centered hero with a large heading, subtitle, and two buttons;
- the sequence “Hero -> three cards -> benefits -> testimonials -> CTA -> Footer”;
- the same three- or four-card grid for every section;
- repeated cards with identical radius, shadow, and padding;
- generic SaaS sections or dashboard layouts;
- a standard Bento Grid;
- a standard FAQ accordion;
- testimonials with stock avatars;
- a generic partner-logo strip;
- standard pricing cards;
- purple-blue “AI” gradients or arbitrary mesh gradients;
- glassmorphism without a reference;
- decorative blur circles, meaningless glows, or generic floating cards;
- abstract 3D objects without a functional reason;
- identical rounding on every element;
- identical section heights;
- standard navigation or Footer without project analysis;
- placeholders, lorem ipsum, or generic marketing copy;
- arbitrary icons used in place of a meaningful visual solution;
- animation added merely for effect;
- a mobile layout made only by stacking desktop blocks into one column.

Being modern or popular is not a sufficient reason to use a pattern.

## 3. Required process before interface code

No visual interface changes may begin until the following process is completed and recorded.

### Step 1: Audit the project

Inspect the current structure, components, pages and routes, styles, design tokens, fonts, images, content, responsive behavior, user-provided references, and project documentation. Do not rewrite the interface before the audit is complete.

### Step 2: Find references inside the project

Search for URLs, images, screenshots, mockups, requirements files, design documents, `references`, `design`, `docs`, `assets`, and `mockups` directories, and previously approved interface versions. Internal model knowledge and previous AI generations are not references.

### Step 3: Maintain the reference map

Create or update `docs/DESIGN_REFERENCE_MAP.md`. For every major block or component, record:

| Project element | Reference | Principle used | What is not copied | Project implementation |
|---|---|---|---|---|

Every major visual decision must have a traceable source. If no source exists, say so explicitly in the map.

### Step 4: Maintain the design system

Create or update `docs/DESIGN_SYSTEM.md` from confirmed references and existing approved project decisions. Record the palette, typography scale, containers, grid, spacing, radii, borders, shadows, image rules, button states, hover and focus states, animation rules, and mobile breakpoints.

Do not adopt a library's default values merely because they are available. Undecided values must remain explicitly undecided rather than being invented.

### Step 5: Make an implementation plan

Before editing interface code, record:

1. which existing elements look templated;
2. why each one looks templated;
3. which confirmed reference or approved system decision will replace it;
4. which components remain;
5. which components must be reworked;
6. which new components are genuinely required.

Only then may interface implementation begin.

## 4. Rules for using references

A reference must not be copied wholesale. Extract a specific principle, adapt it to project content, preserve brand identity, combine only compatible principles, respect the user journey and real content constraints, preserve accessibility, and design mobile behavior deliberately.

It is forbidden to copy another site pixel-for-pixel, copy another brand, reproduce unique illustrations or protected text, move a block only because it looks attractive, mix incompatible styles, or add elements that do not solve a user need.

## 5. When a reference is missing

For an element without a reference:

1. check the documentation and existing interface again;
2. use the already approved project design system if it covers the element;
3. if implementation is necessary, use the most neutral functional solution available;
4. add no decorative effects;
5. do not turn the neutral solution into a generic AI template;
6. record the missing reference in `docs/DESIGN_REFERENCE_MAP.md`.

Do not independently choose a new visual style for the whole project. In a new or empty project, do not fabricate a design system: document the missing inputs and obtain references or explicit direction before visual implementation.

## 6. UI library rules

Libraries are allowed for accessibility, focus management, modal and dropdown behavior, form validation, foundational primitives, and technically complex state management.

It is forbidden to import ready-made sections, retain a library's stock theme, leave default sizes/colors/radii/shadows without a project-grounded decision, assemble a page from demo components, use a ready-made landing template, or preserve the recognizable look of shadcn, Bootstrap, Material UI, or another library. Every visible component must be adapted to the approved project design system.

## 7. Mandatory anti-template audit

After implementation, check and correct:

- repeated sections with the same composition;
- excessive card use;
- identical rounding everywhere;
- stock AI gradients, glassmorphism, or decorative objects;
- generic marketing copy;
- components unrelated to the business goal;
- sections whose composition does not reflect their content;
- major decisions without a traceable reference;
- a generic SaaS-template or single-prompt appearance;
- loss of the project's existing individuality;
- mobile behavior that was not designed separately.

The task is not complete while any unjustified template element remains.

## 8. Mandatory visual verification

Verify the interface at minimum at widths 1440, 1280, 1024, 768, 430, 390, and 375 px. Check visual hierarchy, readability, line length, contrast, interactive target sizes, overflow, heading wraps, image behavior, navigation, forms, hover, focus, loading, empty, and error states.

The mobile interface must not be merely a smaller desktop interface.

## 9. Definition of done

An interface task is not complete until:

- this policy remains present in `AGENTS.md`;
- `docs/DESIGN_REFERENCE_MAP.md` is current;
- `docs/DESIGN_SYSTEM.md` is current;
- every major block is tied to a reference or an approved existing system decision;
- templated compositions and stock UI-library styling have been removed;
- desktop and mobile have been visually checked at the required widths;
- there is no placeholder copy, unjustified decoration, or generic AI-generated section;
- a final anti-template audit has been completed.

If a criterion cannot be met because the project or required inputs are absent, report it as an open blocker. Never claim completion of the interface task in that state.

## 10. Required final report

After interface work, report:

1. files created;
2. files changed;
3. templated elements found;
4. how they were reworked;
5. references used;
6. decisions without references;
7. UI libraries used only as primitives;
8. desktop and mobile verification results;
9. remaining limitations or risks.
