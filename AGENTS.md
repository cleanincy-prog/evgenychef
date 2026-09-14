# Настоящие фотографии рабочего стола — 2026-09-14

Последнее «Это всё слишком ИИйно выглядит» требует заменить искусственную сцену реальной фотографической композицией. Сохраняются один кадр без раскрытия и горизонтального скролла, две страницы по заданным ролям, исходная рыба и глубокая светлая чаша. Подбираются настоящие фото прошитого блокнота, керамики, стола и карандаша; продукты не генерируются. Только внутри страниц возвращаются рукописные заметки по выбранному эскизу. [Аудит, план и проверка](docs/MENU_PHOTOGRAPHIC_2026-09-14.md). Прежние фон и каталожная раскладка ниже — отклонённая версия.

# Одна цельная тетрадь на телефоне — 2026-09-14

Пользователь отклонил опубликованное разрезание композиции на две страницы и тарелку. Прямое «Не надо ничего разворачивать, всё аккуратно в одном блоке, не шире скрола» требует единого кадра в пределах экрана. Диалог, увеличение, раскрытие, горизонтальная прокрутка и отдельные мобильные картинки не нужны. Сохраняются обе страницы внутри общей тетради, настоящая еда и глубокая тарелка; название и подпись остаются обычным читаемым текстом у композиции. [Аудит и план](docs/MENU_NOTEBOOK_ONE_BLOCK_2026-09-14.md). Предыдущая мобильная колонка ниже отклонена.

# Разворот ингредиентов и глубокая тарелка — 2026-09-14

Прямое уточнение требует описание и состав на левой странице тетради, фотографии ингредиентов — на правой. Фон блока совпадает с paper сайта; внутри изображения — аккуратные стол и стена. Вместо широкой плоской белой тарелки нужна глубокая кремовая посуда в цвет фона. Еда остаётся отдельным слоем из присланного фото без генерации и ретуши. Остальные разделы, шрифты и маршрут сохраняются; обновление относится к прежнему действующему сайту. [Аудит и план](docs/MENU_WORKTABLE_INGREDIENTS_2026-09-14.md).

# Выбрано присланное блюдо с рыбой — 2026-09-14

Прямое «Давай вот это блюдо лучше добавим» с фотографией выбирает для рабочего стола рыбу с овощами вместо утки. Используется именно присланный фотослой, без генерации и ретуши цветной еды; удаляются поля телефона и фон вокруг тарелки, сохраняются фактура и подача. Строка меню и нижний карандашный набросок становятся «Рыба с овощами»; точный вид рыбы не выдумывается. Композиция блокнота и остальные разделы сохраняются. Новый запрос продолжает обновление действующего сайта на прежнем домене и с прежней аудиторией. [Аудит и план](docs/MENU_WORKTABLE_FISH_2026-09-14.md). Утка и предыдущие кандидаты ниже — история.

# Новая фотография утки: поиск референса — 2026-09-13

Последнее «Вообще не сходится с макетом, и эта утка выглядит ужасно, найди хороший референс который будет смотреться хорошо там» отклоняет прежнюю утку Deuxave и требует новый реальный фотореференс. Требование использовать именно старое фото больше не действует. Композиционная опора — одобренный `menu-worktable-v1.png`; новый кандидат BOKA / Will Blunt пока является предложением. [Источники, аудит и примерка](design/references/duck-worktable-selection-2026-09-13/README.md). Текущий этап — показать референс и его соответствие композиции; изменения активного сайта не выполнены.

# Публикация рабочего стола с настоящей уткой — 2026-09-13

Прямое «Внеси на обычный» разрешает публикацию уже проверенного MenuWorktable на основном публичном evgenychef.com. Ограничение localhost для этой итерации снято. Сохраняются существующие Sites-проект appgprj_6a981b9ab8708191b17ebf66cc5f818f, GitHub cleanincy-prog/evgenychef/main, домен и аудитория. В выпуск входит выбранный блокнот с исходной фотографией утки, подпись примера меню и проверенное исправление номера этапа при увеличении текста. [Состав выпуска](docs/RELEASE_MENU_WORKTABLE_2026-09-13.md). Локальный preview и его HTTP noindex сохраняются. Записи ниже о непубликации относятся к предыдущему этапу.

# Новый блок меню — сначала эскиз, 2026-09-13

Последующее «На сайте сделал?» выполнено локальной интеграцией на 127.0.0.1:3004/#menu. [Аудит, состав и проверки](docs/MENU_WORKTABLE_SITE_2026-09-13.md). Активный MenuBook заменён сценой MenuWorktable с исходным фото утки; полный кадр, читаемый пример меню, прежние шрифты, остальные разделы и маршрут сохранены. Семь ширин, 200% текста, загрузка/ошибка/повтор, no-JS, TypeScript, HTTP и сборка проверены. Исправлен перенос цифр этапа при увеличении текста. Основной домен пока не меняется. Ниже сохраняется история выбора эскиза.

Последнее прямое «Нет, утку которая была на сайте, её делай, не рисованную» требует исходное фото `public/media/web/duck-plate-960.webp`. Готовый эскиз: `design/mockups/menu-worktable-2026-09-13/real-duck/menu-worktable-real-duck-v1.png`. Фото вставлено отдельным слоем: только пропорциональное уменьшение и размещение, без генерации и ретуши еды. Проверка всех 280415 непрозрачных пикселей фотослоя после уменьшения: 0 отличий. Генеративный `duck-photo-atlas-1536.webp` и вариант `menu-worktable-duck-v1.png` для цветного блюда отклонены; их состав не приписывается реальной фотографии. Выбранная композиция рабочего стола сохранена, активный сайт не изменён. Подробности и воспроизводимая сборка — `design/mockups/menu-worktable-2026-09-13/real-duck/`.

История: «Я передумал, давай уткц» меняет основное блюдо выбранного рабочего стола на **утиную грудку**. Первая версия ошибочно использовала нарисованный атлас с сельдереем и морковью; последующее уточнение выше заменяет её исходной фотографией. Предыдущие варианты сохраняются для истории.

«Отлично, да, кайф, сделай так с осьминогом» выбирает показанный рабочий стол `design/mockups/menu-worktable-2026-09-13/menu-worktable-v1.png` и поручает вариант с осьминогом. Сохраняются раскрытый блокнот, ракурс, свет, фон, лимон, веточка и карандаш. В тарелке — осьминог с томатами, оливками, томатным соусом и зеленью по действующему блюду; соответствующие строка меню и нижний рисунок заменяют лосося. Результат этой правки сохраняется отдельным PNG; перенос на сайт ещё не выполнен. Это актуальный выбранный визуальный источник; отклонённые ранние рисунки с людьми им не являются.

Последующее «Можешь дать идею лучше», затем «Нарисуй как это будет выглядеть» поручает эскиз **рабочего стола шефа**: раскрытый блокнот с примером меню и набросками подач, одна готовая тарелка на краю страницы, лимон, веточка и карандаш. Новый результат хранится в `design/mockups/menu-worktable-2026-09-13/`. Он пока предназначен только для просмотра; интеграция и публикация не разрешены этим запросом.

Первый эскиз отклонён прямым «Выглядит ужасно». Файлы первой версии не являются одобренным визуальным референсом. Требуется новая цельная и более лёгкая композиция по исходному пользовательскому рисунку; режим «сначала эскиз» сохраняется.

По «Давай сделаем блок про меню, вместо осьминога, в таком стиле что то» и приложенному рисунку подготовлено направление: карандашный Евгений за эскизами, пожелания гостей, цветные продукты и четыре примера подач. Последующее прямое «Сначала эскиз потом всё остальное» ограничивает текущую работу отдельным макетом `design/mockups/menu-concept-2026-09-13/`. Не интегрировать и не публиковать этот новый блок до выбора пользователем эскиза. Действующий цветной лист осьминога ниже пока остаётся активным. [Референс, аудит и эскиз](docs/MENU_CONCEPT_2026-09-13.md).

# Один цветной лист: осьминог с граммовками — 2026-09-13

Последние прямые «Убери идею с отрисовкой, просто оставь цветную версию, и добавь больше ингредиентов», «Оставь только осьминога» и «Соль, перец, граммовки добавь» оставляют один постоянно цветной лист меню. Утка, каре, перелистывание, карандашные слои, скролл-переход и переключатели исключены из активного блока. У осьминога 10 компонентов с приготовлением и весом подготовленных продуктов на 1 порцию, включая соль и чёрный перец. Последующее «Картинки к ингредиентам нужны везде» требует отдельного изображения у всех десяти позиций. Четыре прежние картинки и целая тарелка сохраняются; дополнительные компоненты получают предметные фотографии в той же последовательности строк. Количества предложены в рамках запроса, без заявления об утверждённой технологической карте. Один лист до640px, на телефоне по доступной ширине; действующие шрифты и остальные разделы прежние. Исторические медиа и рисунки сохранены для отката, в клиентский блок входит только цветной осьминог. [Аудит, состав и проверка](docs/MENU_BOOK_COLOR_2026-09-13.md). Более ранние записи анимации ниже — история.

# Тонкий карандаш и резкий цвет по скроллу — 2026-09-13

Прямое «тонкой линией… карандашом… резкий цветной переход, по скролле… как образы» заменяет плотный растровый карандаш, таймер и плавное проявление цвета предыдущей версии. Используются тонкие незалитые SVG-линии по существующим изображениям: сначала общий контур, затем детали. Прокрутка управляет длиной штрихов; без прокрутки рисунок неподвижен. На пороге изображение сразу переключается в цвет, обратная прокрутка возвращает эскиз. Каждый ингредиент и целая тарелка ниже проходят это на своём месте. Ручные «По скроллу / Цветная подача / Карандашный эскиз», reduced motion, навигация и повтор загрузки сохраняют доступность. Цветные изображения, рецепты, приготовление, разворот, шрифты и остальные блоки прежние. Автопроигрывание, пауза и повтор таймера ниже — история. [Источники и проверка](docs/MENU_BOOK_SCROLL_LINES_2026-09-13.md).

# Карандаш → цвет → готовая тарелка — 2026-09-13

Последнее уточнение пользователя отменяет перелёт и укладывание компонентов в тарелку. На их местах сначала проявляется карандашная прорисовка, затем цвет ингредиентов, затем целиком цветная подача ниже. Цвет остаётся в финале; пауза, повтор, ручной рисунок/подача и reduced motion сохраняются. Осьминог не перерисовывается. Утка возвращена к прежнему исходному фото с соответствующим карандашным слоем; каре переработано по натуральному фотореференсу и остаётся иллюстрацией. Книга, действия приготовления, три рецепта, действующие шрифты и соседние блоки сохраняются. Предыдущее описание полётов ниже — история. [Источники и проверка](docs/MENU_BOOK_PENCIL_COLOR_2026-09-13.md).

# Публикация выбранной книги меню — 2026-09-13

Последующее прямое «Добавь на очновеой» разрешает публикацию уже проверенной книги меню на основном публичном evgenychef.com. Ограничение localhost для этой итерации снято. Используются существующие Sites-проект appgprj_6a981b9ab8708191b17ebf66cc5f818f и cleanincy-prog/evgenychef/main; аудитория и домен сохраняются. Предыдущая версия остаётся в истории для отката. Локальный preview и noindex не меняются. [Состав выпуска](docs/RELEASE_MENU_BOOK_2026-09-13.md).

# Выбранная книга меню в основном сайте — 2026-09-13

Прямые «Внеси изменения на сайт» и «Хорошо, добавляй» переносят выбранный animated-menu-book v2 в этап «Продумываю меню». На каждом листе одно блюдо: четыре компонента с действиями приготовления, сборка и целая красивая тарелка ниже. Три рецепта — утка, осьминог с зеленью и каре ягнёнка. Desktop показывает два соседних листа, до 900 px — один рецепт с перелистыванием. Карандашная штриховка превращается в цвет, компоненты собираются в подачу; есть повтор, пауза, статичный рисунок/подача, reduced motion и повтор загрузки. Действующие Oranienbaum / Ysabeau Office / PT Mono сохраняются.

MenuBook заменяет только прежнюю активную сцену MenuExplodedDish. Книга занимает ширину процесса под рисунком 01; заголовок 02 сохраняет сдвиг 40%, этап 03 идёт после книги с проходом 55 px, смещение 04 сохраняет 40%. Стрелки обходят книгу и содержание. Исходники макета и прежние медиа сохранены; сайт использует WebP-копии шести выбранных атласов. Остальные блоки и основной текст не меняются. Эта итерация проверена в основном localhost на 127.0.0.1:3004/#menu; публикация текущего меню на домен не выполнялась. [Источники, файлы и проверка](docs/MENU_BOOK_SITE_2026-09-13.md).

# Публикация текущей версии — 2026-09-13

Прямое «Внеси на сервер» разрешает публикацию проверенной текущей версии: Oranienbaum / Ysabeau Office / PT Mono и завершённая фотографическая сцена «Продумываю меню». Этот запрос отменяет ограничения localhost-only для этих двух готовых изменений ниже. Использовать существующие evgenychef.com, Sites-проект appgprj_6a981b9ab8708191b17ebf66cc5f818f и GitHub cleanincy-prog/evgenychef/main; аудитория и домен прежние, история сохраняется для отката. Самостоятельные неутверждённые макеты в публикацию не входят. Локальный preview 127.0.0.1:3004 и его HTTP noindex сохраняются. [Состав и проверки](docs/RELEASE_ORANIENBAUM_2026-09-13.md).

# Oranienbaum / Ysabeau Office / PT Mono — 2026-09-13

Прямое [задание](design/references/oranienbaum-brief-2026-09-13.md) заменяет прежние Spectral/Golos/IBM Plex Mono. Oranienbaum 400 normal: логотип 19px/1 uppercase/+0.22em, h1 clamp(34px,5vw,52px)/1.02, h2 clamp(26px,3.4vw,38px)/1.1, h3 и названия частей блюда clamp(19px,1.5vw,20px)/1.3. Минимум 19px, ink, нулевой трекинг заголовков, без синтеза. Ysabeau Office 400: текст 16.5px/1.62; 500: UI/лейблы; 600 только для вопросов FAQ (отсутствует); 400 italic для всех курсивных акцентов. Строка Hero «ваш личный» — настоящий Ysabeau Office italic 0.92em, чтобы сохранить пять строк. PT Mono 400: все числа, 01–04 22px/+0.04em, 25 13px, tabular/lining. 12 локальных статических WOFF2 Cyrillic/Latin, swap и два кириллических preload. Caveat остаётся неиспользуемой опцией. Логотип допускает перенос по словам при 200% текста. Evgen Grebenik, тексты, палитра, медиа и композиция сохраняются; параллельные правки сцены меню сохранены. Результат остаётся только на localhost, без публикации. [Аудит и проверка](docs/ORANIENBAUM_2026-09-13.md). Старые шрифтовые записи ниже — история.

# Сцена меню — пока только localhost, 2026-09-13

Текущий прямой запрос меняет визуальную часть «Продумываю меню» по `design/references/approved-menu-exploded-table-2026-09-13.png`: настоящие фотографии с удалённым фоном, стена и угол стола в цветах сайта. Во время работы пользователь уточнил: сначала localhost, без изменений на домене. Этот результат остаётся только на127.0.0.1:3004; публикация наevgenychef.com возможна после отдельного указания. Раннее разрешение публикации ниже не применяется к этой локальной итерации. [Аудит и проверка](docs/MENU_EXPLODED_PHOTOS_2026-09-13.md).

# Стрелки между этапами — 2026-09-13

По прямому запросу других стрелок соединения01→02→03→04 заменены плавными графитными SVG-стрелками с открытыми наконечниками. Существующие безопасные проходы сохраняются; mobile имеет отдельные вертикальные стрелки. Узлы/цифры остаются латунными;40%/+55px, тексты, медиа и шрифтовые роли прежние. Анимация не добавляется. [Аудит и проверка](docs/PROCESS_ARROWS_2026-09-13.md).

# Этап03 ниже — 2026-09-13

Прямое «03 тоже нужно сделать ниже» добавляет55px к первой строке desktop-сетки процесса:03 с видео опускается целиком, пунктир следует за узлами. Коэффициенты02/04 остаются40%; прежний расчёт04 сохраняет проход под тарелкой и порядок. До900px прежний вертикальный поток. Тексты, медиа и одобренные шрифтовые роли сохраняются. Аудит и проверка: docs/PROCESS_STEP03_2026-09-13.md.

# Шрифтовые роли Spectral / Golos Text / IBM Plex Mono — 2026-09-13

Прямое [задание](design/references/typography-role-brief-2026-09-13.md) заменяет прежний единый Bellota. Spectral400: логотип/h1/h2;500: h3/названия частей блюда;400italic: курсив. Golos Text400: основной текст16.5px;500: интерфейс/лейблы;600 только для вопросов (FAQ отсутствует). IBM Plex Mono400 только цифры,01–04:22px/+0.04em;25:13px. Tabular/lining numbers, font-synthesis:none, наследование всех потомков h1–h4. Локальные WOFF2 cyrillic/latin, swap и preload двух кириллических400; Bellota inline и активные файлы удалены. Caveat не подключается без рукописных пометок. Тексты, Evgen Grebenik, цвета, секции, медиа, анимации и40%-маршрут прежние. [Аудит и проверка](docs/TYPOGRAPHY_ROLES_2026-09-13.md). Более ранние шрифтовые записи ниже — история.

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
