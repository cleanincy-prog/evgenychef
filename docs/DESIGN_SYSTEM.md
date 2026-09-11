## Утверждён широкий кухонный кадр первой услуги — 2026-09-11

По последнему прямому выбору и поручению публикации используется private-dinner-wide-v2.png 1536×1024. Предыдущие записи о домашнем фоне — история отклонённой пробы. Общая рамка 3:2 и contain/center теперь показывают полный широкий кадр без боковых полей и растяжения. Desktop остаётся 270×180, mobile — полная ширина содержимого при прежнем breakpoint620px. Responsive WebP384/768, lazy/async, alt и истинные width/height; оригинал и старые производные сохраняются. Никаких новых значений палитры, Caveat, отступов, радиусов, теней, состояний, анимаций или библиотек. [Аудит и проверка](PRIVATE_DINNER_WIDE_2026-09-11.md).

## Исходный фон главного фото восстановлен — 2026-09-11

По прямому запросу возвращается вариант до кремовой пробы: основной портрет chef-hero-apron.jpg с исходным фоном через WebP320/576. Геометрия, Caveat, коллаж, кремовая вуаль и все состояния остаются прежними. Прозрачный chef-hero-apron-cream.png сохраняется в папке проекта по отдельному уточнению пользователя и не подключается к Hero. Следующая запись о кремовом портрете — история отклонённой пробы. Новых токенов или визуальных решений нет.

## Кремовый фон главного портрета Hero — 2026-09-11

По прямому запросу фон единственного главного фото совпадает с `hero-copy`/`hero-identity`: существующий `--paper #f4efe5` виден через прозрачные области нового `chef-hero-apron-cream.png` размером 576×1280. Нативная маска macOS Vision выделяет фигуру, Swift-композиция использует пиксели оригинала без перерисовки лица, одежды или позы. Координаты человека сохранены; исходный JPEG и прежние производные остаются. Не добавлены градиенты, тени, рамки, размытие портрета или цветовой фильтр поверх человека. CSS не менялся: прежние типографика Caveat, сетка 52% / оставшаяся ширина, промежуток 2px, высота desktop, mobile-портрет 4:5, `translateY(-21%)`, breakpoint 620px, стабильный svh и все состояния сохранены. Фоновый коллаж отдельно сохраняет `blur(2px)` и вуаль `rgb(246 224 196 / 24%)`.

Responsive WebP-варианты 320/576 px с качеством 78 сохраняют alpha и прежние `sizes`, `alt`, высокий приоритет загрузки и `decoding="async"`. Фактические размеры/хеш нового источника записаны в манифесте, props воспроизведены существующим генератором. Финальный визуальный просмотр на 1440/1280/1024/768/430/390/375px подтвердил аккуратный мягкий край, совпадение кремового поля, исходные лицо/позу и загрузку. Геометрия identity/portrait/title совпадает с baseline; разница естественной высоты img менее 0,71px на узких viewport связана с округлением responsive-файлов, без значимого сдвига кадра. Детализация ограничена оригиналом шириной 576px. Production build, пять HTTP-тестов и anti-template аудит — PASS; фокус 2px и цели >=44px проверены на 1440/390. [Аудит, план, реализация и проверка](HERO_CREAM_PORTRAIT_2026-09-11.md). Новые UI-библиотеки и визуальные токены не добавлены.

## Уточнение заголовка награды — 2026-09-11

award-title теперь «Больше 25 лет в гастрономии» по прямому запросу. Первая award-note начинается «Победа в…», чтобы не повторять заголовок. Все значения типографики, расположения, цвета, отступов, размеров фото, состояний и брейкпоинтов прежние. Это замена содержания в одобренной системе.

## Длинное описание «МастерШеф» — 2026-09-11

Два пользовательских абзаца используют существующие .award-note: Caveat22px, line-height1.4, цвет --muted, margin-top6px. Desktop сохраняет flex-композицию, фото23% не сжимается, текстовая .award-copy получает min-width0. На <=620px фото и заголовок сохраняются рядом (36% + оставшаяся ширина, gap16px), оба абзаца видны ниже на полную ширину; .award-copy использует display:contents для этого grid. Высота естественная. Прежнее скрытие .award-note отменено. Палитра, остальные размеры, границы, состояния, анимация и брейкпоинты сохраняются. [Аудит и план](MASTERCHEF_TEXT_2026-09-11.md).

## Кремовый фон Hero — 2026-09-11

Активный blur фоновой сетки —2px вместо 0.7px. Внутри hero-collage поверх сетки располагается неподвижный псевдоэлемент с цветом rgb(246 224 196 / 24%): тёплый кремовый с лёгкой оранжевой нотой по прямому запросу пользователя. Однородная заливка, без градиента или blend-mode; inset0, z-index1, pointer-events:none. Родитель коллажа остаётся в собственном слое z-index:-1 внутри изолированного hero-frame и обрезает края. Поэтому вуаль не покрывает соседний hero-identity с портретом и текстом. Сетка, кадрирование, svh, WebP, типографика и состояния сохраняются. Далее — история прежних значений.

## Текущая сила размытия Hero — 2026-09-11

По запросу «Нужен больше блюр» активный радиус hero-collage-grid равен 0.7px вместо 0.3px. Это промежуточная сила относительно прежних 0.3px/1.1px. Фильтр остаётся постоянным и ограниченным фоном; портрет и текст вне фильтра. Размеры, сетки, свёртка на мобильном, svh, WebP и состояния сохраняются. Следующие записи — история предыдущих значений.

## Уточнение силы размытия — 2026-09-11

По прямому уточнению пользователя эффект на hero-collage-grid уменьшается с blur(1.1px) до blur(0.3px). Значение «примерно 5%» — пожелание едва заметной мягкости; CSS blur не использует процентную шкалу. Главный портрет, текст, WebP-источники, сетка, svh, типографика и все состояния сохраняются. Это активное значение заменяет предыдущие 1.1px.

## Изображения для быстрой загрузки — 2026-09-11

Активные растры получают WebP-производные и srcset по существующим областям. Коллаж:192/384px, качество 54; главный портрет:320/576px,78; фото форматов:384/768px,70; награда:320/640px,74; тарелка:480/960px,76 с alpha; карандашные сцены:480/960px lossless; постер:540px,70. Оригиналы сохраняются. Только hero-collage-grid получает постоянный blur(1.1px); центр Hero и его текст не фильтруются. Стабильная svh-высота, сетка, квадратный нижний ряд, типографика и все состояния прежние. [Аудит и проверка](IMAGE_LOADING_2026-09-11.md).

## Стабильная высота Hero при прокрутке — 2026-09-11

Текущее правило компактного Hero: min-height calc(100svh - высота header) в прежних брейкпоинтах 1100/900/620 px, header 80/72/74 px. Удалено переопределение dvh: сворачивание адресной строки больше не меняет высоту фотополя и cover-кадрирование. Первый экран при открытых панелях заполнен, после начала прокрутки естественно видны следующие блоки. Смена ориентации/реальный resize остаются адаптивными, короткий экран сохраняет естественный размер содержимого. Все остальные токены, сетки, фото, типографика и состояния прежние. [Аудит и проверка](HERO_SCROLL_STABILITY_2026-09-11.md).

## Фото «МастерШеф» — 2026-09-11

Пользовательский оригинал 1280 × 1160 выводится в award-proof целиком: width 23%, height auto, contain/center; до 620 px прежняя ширина 36%, высота также естественная. Это предотвращает обрезку лица и конверта при замене горизонтального снимка. Подписи, flex-композиция, отступы, границы, палитра, Caveat, состояния, брейкпоинты и остальные блоки сохраняются. Коллаж использует тот же новый источник в существующей ячейке. [Источник и аудит](MASTERCHEF_PHOTO_2026-09-11.md).

## Hero на всю доступную высоту телефона — 2026-09-11

Новое прямое уточнение заменяет прежнюю естественную высоту мобильного поля: до 1100 px `min-height` равен `100dvh` минус высота header; запасное правило использует `100svh`. В существующих брейкпоинтах header равен 80 px (до 1100), 72 px (до 900) и 74 px (до 620). Это относится к телефонам и планшетам. Верхний отступ 72–84 px, квадратный последний ряд и прежние размеры/кадрирование портрета сохраняются. Дополнительная высота заполнена коллажем. В коротком viewport естественная высота контента имеет приоритет, чтобы не обрезать текст. Следующий блок всегда начинается за нижним краем первого экрана. Остальные брейкпоинты, палитра, типографика, состояния и интервалы без изменений. [Аудит и проверка](HERO_MOBILE_VIEWPORT_2026-09-11.md).

## Мобильный Hero по скриншоту — 2026-09-11

На<=620px Hero имеет естественную высоту по содержимому, align-items:start, padding-top:clamp(72px,20vw,84px). Токен --hero-bottom-cell:calc((100vw - 14px)/8) равен ширине квадратной ячейки с 7 швами по 2px. Нижний padding равен этому размеру плюс 2px; grid-template-rows:repeat(9,minmax(0,1fr)) var(--hero-bottom-cell). Таким образом последние 8 фото квадратные, их начало на 2px ниже портрета, а конец совпадает с концом Hero. Это источник-размерная подгонка текущей сетки по присланному screenshot, не новый стиль. Текст, шрифт, портрет, desktop/tablet, цвета, состояния и все остальные интервалы остаются прежними. План/проверка: [HERO_MOBILE_EDGE_2026-09-11.md](HERO_MOBILE_EDGE_2026-09-11.md).

## Коллаж без видеокадров — 2026-09-11

63 изображения без 31 извлечённого видеокадра.17 двухколоночных ячеек дают 80 заполненных единиц:10×8 выше 620px,8×10 на телефоне. Карты широких позиций сохраняют первые 17 позиций прежних desktop/compact наборов. Это подгонка числа рядов/колонок под оставшиеся источники, в пределах существующего принципа. Фотополе на всю ширину, его высота, швы 2px, бумага, Caveat, размеры и кадрирование центрального портрета остаются прежними. Без новых токенов, декора, UI-библиотек и анимации. Аудит/план: [HERO_PHOTOS_ONLY_2026-09-11.md](HERO_PHOTOS_ONLY_2026-09-11.md).

## Большой коллаж — действующие правила 2026-09-11

Фон Hero:94 исходных снимка из соседней одобренной Mise en place. Полная ширина экрана, плотная сетка 10×12; до 1100px12×10 с исходной compact-картой широких ячеек; до 620px8×15. Зазор 2px из обоих существующих вариантов. Высота из источника: clamp(700px,100svh−80px,824px), мобильная clamp(720px,100svh−74px,866px); содержимое при увеличении текста расширяет блок. Центральный hero-identity сохраняет прежнюю ширину/высоту, переносы, размер Caveat и кадрирование chef-hero-apron.jpg; непрозрачный --paper сохраняет читаемость. Цвета/шрифты/радиусы 0/состояния/остальные интервалы не меняются. Исходные фото без фильтра. Новых библиотек и анимации нет.

Источник и план: [HERO_LARGE_COLLAGE_2026-09-11.md](HERO_LARGE_COLLAGE_2026-09-11.md). Прежняя схема 24/14 снимков историческая.

Уточнение V8: desktop первая строка процесса учитывает фактическую высоту сцены плюс нижний проход маршрута. Дуга 02→03 проходит справа и ниже изображения. На ширинах до 900 px сохраняется прежний вертикальный маршрут.

## Сцена разговора V8 — одобренный рисунок и фон

Активный растр conversation-evgen-paper-flowers-v8.png (1536×1024) основан на одобренных пользователем V7/V8. Наклон головы в блокнот, лёгкая улыбка, маленькие цветы и два стакана остаются внутри изображения. Цвет бумаги задан существующим #F4EFE5; прежняя цепочка grayscale(1) contrast(1.25) и multiply устраняет вариацию светлого фона при показе на странице. Размеры, отступы, брейкпоинты, шрифты и другие иллюстрации сохраняются. Проверка — CHEF_PENCIL_CURRENT_REPORT.md.

## Одинаковые области фотографий форматов — 2026-09-11

По прямому запросу пользователя все три фотографии имеют одинаковые области 3:2, при этом кадры сохраняются целиком: object-fit: contain, object-position: center. Размеры исходников различаются (ужин 1152×1572; мероприятия 2278×1510; мастер-классы 1144×770), поэтому у вертикального фото остаются поля цвета --paper #F4EFE5. Геометрия 3:2 взята из существующего мобильного оформления двух горизонтальных фотографий. Общий desktop максимум 270×180 px сохраняет прежнюю максимальную высоту 180 px; на телефоне область занимает всю ширину контента. Старая индивидуальная высота ужина 255 px отменяется. Никаких обрезки, растягивания, обработки исходников, новых декоративных рамок и библиотек. Аудит и план: FORMAT_IMAGE_SIZES_2026-09-11.md.

## Актуальная типографика: возврат к Caveat — 2026-09-11

По прямому «Верни предыдущий шрифт» весь интерфейс снова использует локальный Caveat через прежние --font-pencil / --font-sans / --font-display. Bad Script и --font-personal отключены. Восстановлены исходные размеры Hero (clamp(40px,4.25vw,62px); до 1100 px clamp(34px,4.1vw,45px); до 620 px clamp(31px,8.4vw,48px)), line-height 1.08; h2 line-height 1.12. Остальная палитра, композиция, адаптивность, состояния и библиотеки сохраняются. Аудит, план и проверка возврата — [FONT_PAIRING_2026-09-11.md](FONT_PAIRING_2026-09-11.md).

## История пробы типографики: Caveat + Bad Script — 2026-09-11

По прямому «Давай попробуем» после согласованного распределения ролей: локальный Bad Script 400 (токен --font-personal) только в Hero h1 и крупных h2 разделов formats/evening-plan/contact. Caveat остаётся в h3, основном тексте, меню, кнопках, wordmark, номерах, награде и подписях блюда. --font-display и --font-sans сохраняют Caveat. Естественный наклон Bad Script, без дополнительного курсива и синтетического веса. Размер/интерлиньяж заголовков уточняются по фактическому размещению на семи ширинах; остальные размеры, палитра, контейнеры, сетка, границы, состояния, анимация и брейкпоинты сохраняются. Подробные аудит, план и итог: [FONT_PAIRING_2026-09-11.md](FONT_PAIRING_2026-09-11.md). Эта запись заменяет требование единого Caveat только для указанных заголовков.

Проверенные значения: h2 line-height 1.3; Hero line-height 1.24, размер clamp(32px,3.7vw,54px), до 1100 px clamp(30px,3.5vw,39px), до 620 px clamp(26px,7.5vw,40px). Семь ширин 1440/1280/1024/768/430/390/375 прошли проверку загрузки гарнитур, геометрии и визуальный просмотр; остальные роли сохранили Caveat.

## Карандашная сцена V7

Новый фотопортрет 11.21.14 задаёт голову и естественные пропорции. Минимальная улыбка закрытого рта; взгляд вниз в блокнот. Маленькие цветы и два стакана воды рисуются теми же тонкими графитными линиями, что люди; все предметы в растре 3:2. CSS, размеры, адаптивность и Caveat сохраняются. Источники и план — CHEF_CONVERSATION_V7_2026-09-11.md.

## Кремовая тарелка с уткой — 2026-09-11

По прямому запросу керамика в MenuPlate получает тёплый кремовый оттенок из гаммы существующего --paper #F4EFE5. Реальные блики и тени сохраняют объём; это цвет материала на фото, а не сплошная заливка. Прозрачность вокруг тарелки, подача и натуральные цвета еды сохраняются. Смена цвета керамики имеет приоритет над историческим запретом ретуши именно этой области. CSS-фильтр всего снимка не используется. Сетка, контейнеры, шрифты, размеры, состояния, выноски и брейкпоинты остаются текущими; новых токенов и библиотек нет. Аудит/план/проверка: CREAM_DUCK_PLATE_2026-09-11.md.

## Коррекция выносок после замечания пользователя — 2026-09-11

Статичные линии не соединяются с фактическими описаниями. Их заменяет измеряемый SVG: строго горизонтальное начало у края текста (зазор 6 px), один диагональный отрезок и кольцо в фиксированной относительной точке реальной фотографии. Отдельная мобильная привязка под/над текстом, перерасчёт после переносов и загрузки шрифта. Источник — пользовательский скриншот подписей и прямое «Полоски не ровно и не доходят к описанию». Новых шрифтов/палитры/декора/библиотек нет. Прежнее утверждение о завершённой геометрии заменяется этой коррекцией. Аудит, план и проверка: [PLATE_CAPTIONS_2026-09-11.md](PLATE_CAPTIONS_2026-09-11.md).

## Последнее уточнение: взгляд в блокнот и единый карандаш — V6

Пользователь отверг V5 («Совсем не поход») и потребовал: смотреть в блокнот, быть нарисованным карандашом как женщина, а не выглядеть чёрно-белой фотографией. Новый первичный исходник: design/references/chef-2026-09-11/user-chef-photo-011309.png. Это заменяет прежнее направление взгляда к гостье.

Предварительный аудит: у предыдущего шефа плотная фактура лица/бороды и фартука, тогда как женщина состоит из лёгких контуров с открытой штриховкой. План: заново нарисовать мужскую фигуру по новому фото в исходной разговорной сцене; женщина служит точным референсом характера линий. Голова и глаза направлены вниз на страницу, правая рука пишет, левая придерживает раскрытый блокнот. Сходство передаётся контуром и пропорциями лица, без фотореалистичной кожи, пор, зерна и плотных полутонов. Женщина и композиция сохраняются. Меняется растр/src/alt; CSS, типографика, компоненты и библиотеки не меняются. Точный промпт: design/generated/evening-plan-illustrations/CHEF_LIGHT_PENCIL_V6_PROMPT.md. V5 не является принятым пользователем портретом.

## Актуальные подписи блюда — 2026-09-11

Новый пользовательский скриншот задаёт четыре пары название/пояснение и тонкие указатели с кольцами на блюде. Сохраняется активный карандашный Caveat, --gold-text для названий, --muted для пояснений и --paper для фона; без карточек, теней, радиусов, новых эффектов или библиотек. Размер текста подбирается для живых полей: заголовок 24–28 px, пояснение 19–20 px; полный текст доступен на телефоне. Mobile сохраняет две подписи сверху/две снизу с отдельной областью целой тарелки. Размеры, маршрут и адаптивность проверяются по [PLATE_CAPTIONS_2026-09-11.md](PLATE_CAPTIONS_2026-09-11.md). Сетка остального сайта, состояния кнопок, изображения и брейкпоинты 1100/900/620 не меняются. Это дополнение имеет приоритет над историческим “short mobile titles”.

## Актуальная коррекция: сходство и естественное телосложение — V5

Пользователь отклонил V4: «Теперь слишком худой и не похоож». Предыдущие положительные технические проверки не означают одобрения портрета. Источник внешности и телосложения — присланное фото design/references/chef-2026-09-11/user-chef-photo.png. До изменения интерфейса план уточнён: вернуть полноту щёк, мягкую форму челюсти, естественную шею и умеренную ширину плеч/торса ближе к фото; уменьшить поворот головы, сохранив явный взгляд на женщину. Сохранить запись в раскрытый блокнот, положение рук, женщину, графитную технику и формат. Новых компонентов, CSS-токенов или библиотек не нужно. Меняется только растр и его src. Промпт: design/generated/evening-plan-illustrations/CHEF_LIKENESS_V5_PROMPT.md. Итоговое сходство подлежит визуальному сравнению; не заявлять точную копию фотографии или пользовательское одобрение.

## Приоритетное уточнение пользователя — версия 4

«Стой, он должен смотреть на нее и записывать в блокнот, и он худее». V3 с фронтальным взглядом и разговорными жестами является промежуточным и не соответствует этому уточнению. До следующего изменения интерфейса план уточнён: направить голову и глаза шефа к женщине, показать правую руку с пишущим инструментом на странице раскрытого блокнота, левую руку придерживающей блокнот; сделать плечи, руки и торс заметно стройнее. Черты и одежда по новому пользовательскому фото. Женщина, роль этапа, графитная техника и текущая геометрия сохраняются. Новые UI-компоненты не нужны. Промпт: design/generated/evening-plan-illustrations/CHEF_NOTEBOOK_V4_PROMPT.md.

## Уточнение портрета по фото пользователя — версия 3

Для «Разговора» сохранять фронтальное лицо и открытую улыбку из design/references/chef-2026-09-11/user-chef-photo.png, белый китель и полосатый фартук. V2 не использовать как источник лица. Графит, бумага, соотношение 3:2, текущий размер/адаптивность и Caveat остаются прежними. Новых декоративных решений нет. План и проверки — CHEF_PENCIL_IDENTITY_2026-09-11.md.

## Текущая правка Шеф 4: карандашный Евгений — 2026-09-11

В сцене «Разговор» изображается реальный шеф по chef-hero-apron.jpg. Графитная техника, бумага, формат 3:2, существующий multiply/grayscale/contrast и адаптивный размер иллюстрации сохраняются. Меняется персонаж, без новых токенов, эффектов, полей, сетки, состояний или библиотек. Активная типографика — локальный Caveat по PENCIL_FONT_2026-09-11.md; историческая пара шрифтов ниже не восстанавливается. Новый рисунок является иллюстрацией, не документальной фотографией события. Аудит и план: CHEF_PENCIL_IDENTITY_2026-09-11.md.

# CURRENT LOCAL DESIGN SYSTEM — «План вечера», 2026-09-10

## Root handoff verification — 2026-09-10

Финальная локальная сборка, lint, TypeScript и 5 HTTP-тестов прошли. Последний браузерный прогон `artifacts/evening-plan-local/qa-report.json` прошёл на всех семи ширинах и подтвердил восстановление видео после ошибки кнопкой «Повторить». Root выполнил read-only сравнение оригинала с baseline: 726 файлов, общий SHA-256 и raw Git-статус совпали. Подробный итог и список файлов — `artifacts/evening-plan-local/REPORT.md`. Запуск только 127.0.0.1:3001; публикации не было.


Active contract for isolated local implementation of the approved evening-plan PNGs. Earlier conflicting “proposal only” and production/publication constraints below are historical. Original folder/site is untouchable; localhost only. The raster establishes composition; real media and semantic HTML remain content.

## Final fitted values and verification — 2026-09-10

These values are taken from the actual local CSS after the final seven-width visual check. They replace the earlier undecided fit values in this current chapter, while historical entries remain provenance only.

| Element | Final CSS fitting |
|---|---|
| Wide sheet | 90.5% width, max-width 1320px; <=620px width `calc(100% - 36px)` |
| Section heading | Cormorant 400, `clamp(40px,4.65vw,66px)`, line-height 1.05; phones `clamp(37px,9.5vw,54px)`, line-height 1.04 |
| Hero type | `clamp(40px,4.25vw,62px)`, line-height .97; <=1100px `clamp(34px,4.1vw,45px)`; <=620px `clamp(31px,8.4vw,48px)`, line-height .98 |
| Service/process body | 18px wide; 15px at <=1100px for compact wide service/process; process returns to16px at <=900px, service returns to16px at <=620px; body base16px |
| Desktop process | 46% /54% columns, first row `clamp(365px,31vw,440px)`; station04 padding-top210px above1100px,125px at901–1100px; <=900px open vertical flow |
| Desktop path | SVG measured from live nodes/heading/“Соус” bounds; 1.35px muted-gold dashed stroke4/5; 03 exit uses a clear aisle left/below annotation |
| Mobile route | Per-station pseudo line on first three stages only, x10px; top/bottom19px at<=900px,17px at<=620px; ends at node04 |
| Format photographs | `contain`, natural colour, right aligned wide; height clamp142–180px,154px tablet. Phone dinner255px high/centred; events/masterclass aperture1.5:1 |
| Whole plate | `contain`; desktop note field width107%, ratio1.43; tablet max600px/ratio.89; phone width minus33px/ratio.83; no clipping or food recolouring |
| Plate labels | Cormorant italic gold, clamp19–25px wide;25px tablet; clamp20px,5.3vw,26px phone; four short neutral names |
| Film | Poster frame2:3, source-aware object-position50%66%; max280px wide, up to300/360px at narrower breakpoints; playback frame9:16 and `contain`; user starts film, native controls thereafter |
| Illustration integration | Generated process assets only: multiply + grayscale(1) contrast(1.25); conversation max450px and toast max440px wide; no filter on actual source photos/video |
| Final action/focus | 56px high wide/tablet,54px phone; 14px/13px label; visible2px gold outline with5px offset; square edges |
| Breakpoints | 1100px compact wide,900px vertical process/tablet,620px authored phone Hero/services |

Final independent screenshot review and the browser report passed at 1440,1280,1024,768,430,390,375px. Wide plate/04 separation, independent plate-note/route geometry, final mobile node termination and source-media context are confirmed. No page-level horizontal clipping conceals overflow. Film playback/retry/poster and keyboard focus were exercised. Final original-integrity comparison is outside this design-system verification and remains with the root task.

## Retained foundations

| Role | Value |
|---|---|
| Paper / light paper | `#f4efe5` / `#fcfaf5`; continuous warm field |
| Ink / supporting | `#0a0a0a` / `#6e665a` |
| Display/route gold | `#a0792e` |
| Small contrast gold | `#72561f` |
| Rules | `#c8c0b3`, 1px |
| Display | Self-hosted Cormorant Garamond 300/400; gold italic emphasis |
| Body/actions | Self-hosted Montserrat 300/400; 600 actions |
| Edges/depth | Square, radius 0, no shadows/gradients/glass/blur/stock cards |

## Geometry and imagery

Wide sheet approximately 90–91% viewport width as the approved raster; source-derived page gutters and existing content cap may be fitted. Phone gutter baseline 20px (16–24px where content/frame needs). Header shallow. Hero: 24 distinct desktop photos (10 top, 7+7 sides), 14 selected phone photos (4 top,5+5 sides), central text/portrait side-by-side wide and text above portrait mobile. No photo filter/generation; source black bands may be excluded with CSS crop while preserving face/body.

Award remains a compact actual image/copy strip. Formats share open horizontal separators; desktop number/title/copy/photo, mobile broad title/copy before supporting image. Vertical dinner source must retain head/hands/pan; it may use a wider reserved field with contained source rather than invent a landscape crop. No repeated full food inventory.

Process has 01 upper left, 02 upper right, 03 lower left, 04 lower right on desktop. Fine graphite structure with restrained gold line/nodes; no decorative loops beyond route logic. Phone has separate left vertical line and wide readable content. Whole real plate and four neutral labels sit inside Menu; titles two above/two below on mobile. Fine leaders stay clear of text/food/main route. Original documentary film/poster sits inside Preparation; requested playback with controls and honest source geometry.

Conversation/toast are quiet graphite illustrations, not event evidence; produce through image tooling and record provenance. Photographs/video remain original. Contact stays on paper with a thin rule, serif invitation, one square gold Instagram button, account/helper and compact footer.

## Type, spacing, states

Approved mobile prompt specifies body ~16px @430px; avoid tiny raster-scale body. Wide body baseline 16–20px. Existing fluid section role 32–60px and source heading proportions guide fit; full Russian headings must wrap naturally. Hero has its own source-fit serif scale. Exact type sizes, viewport transitions, crop coordinates and gaps are neutral content-fit decisions pending actual QA, not new decorative tokens. No fixed equal section heights.

Minimum interactive targets 44px; visible 2px focus outline with separation; skip link retained. Hover/active changes stay within gold/ink palette. Real Instagram destination `https://www.instagram.com/evg.chef/`; no automatic send. Film uses real poster/loading fallback and reachable controls; honour reduced motion, avoid decorative animation. Body overflow must be fixed at source, not hidden at page level to conceal layout errors. Main page has no invented form/booking/empty state.

Required visual widths: 1440,1280,1024,768,430,390,375px. Verify body/title wraps, contrast, focus/links, intact plate, source crop, video/poster/error fallback and horizontal overflow. Record final fitted values and results after implementation.

---

# Historical system (superseded where inconsistent with the local contract)

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

> Text-free workday override — 2026-09-02: the earlier visible-copy and desktop/tablet `4 / 3`
> rules below are retained only as release history. The approved workday composition supersedes them:
> one proportional `2 / 1` raster field contains the unchanged `9 / 16` film at the left and four
> text-free process miniatures in a vertical column at the right at every width.

- The section begins immediately after the hero with a compact two-column award row. It is a modest horizontal rectangle rather than a viewport-scale chapter: desktop width is capped at `1080px`, vertical padding stays restrained, and neither text nor image is allowed to dominate the next screen.
- Its text column contains the heading `От MasterChef к вашему столу` and the exact user-supplied two-paragraph biography. The second paragraph is `Теперь я провожу частные ужины, приватные мероприятия и мастер-классы и превращаю этот опыт в ваш идеальный гастрономический вечер.`; the documentary award photograph occupies the right column in a shallow `16 / 9` aperture. The title remains Oranienbaum. Both biography paragraphs share the same Onest base class, size, weight and line height at every breakpoint; difference in meaning comes only from spacing and color, not a second body typeface or display-sized closing sentence.
- A separately ruled present-day row follows as one proportional `2 / 1` process field. The original
  heading and three working-day facts remain in the document as visually hidden screen-reader context;
  no live text is visible in the approved composition.
- The unchanged vertical source film stays at its native `9 / 16` ratio in the quiet left zone and is
  never stretched. Four graphite miniatures remain unobscured at the right in the approved top-to-bottom
  order: purchase, preparations, marinade, cooking at home.
- Phone retains the same authored composite instead of restacking it. The field scales proportionally,
  preserves the left-film/right-drawings relationship and creates no horizontal overflow or blank reserve.
- The rejected eyebrow `мой путь` is absent; no substitute label, chapter number, arrow or connector is introduced.
- The “документальный фрагмент” label, local pause overlay, section folio and fact indices are absent.
- No explanatory caption appears beneath the film; the MasterChef-and-Europe paragraph and the concise present-day close belong together in the first text column.
- The three-part working-day sequence supplied directly by the user remains exact in hidden semantic
  HTML: `утро: закупаю продукты`, `день: делаю заготовки, маринады и соусы`, `вечер: готовлю у вас дома
  для вас и ваших гостей`. Its former visible rail geometry is superseded by the approved text-free raster.
  The biography uses the user’s concise two-paragraph replacement: the MasterChef win opens the route
  to the cuisines of Europe and the Mediterranean, and that experience becomes the guest’s gastronomic
  evening. It must not add the superseded visible prize paragraph, invent workplaces, or depict or imply
  an unverified plate, statuette, cup, net payout or present-day currency equivalent.
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

## Review-state gate for process blueprints — 2026-09-02

- Only a process-first raster explicitly approved for its block may be visible in the review build.
- An unapproved or superseded drawing must be removed from rendering, not hidden with opacity, and no
  fixed height, padding or margin may remain as a placeholder for it.
- While a block awaits its process drawing, its existing documentary photo/film, exact live copy and
  established reading order form the neutral fallback.
- The current review exception list contains exactly one active blueprint:
  `private-dinner-process-v2.png`. All earlier MasterChef, event, workday, menu, sourcing and inquiry
  drawings are inactive regardless of whether their asset files remain available for audit history.
- At phone width, source chapters remain a compact two-column text/photo composition; workday remains
  a copy/film pair; personal menu keeps its real dish in the layout; inquiry places the complete villa
  immediately after its heading. None may contain a blank reserved band.

## Approved-raster lifecycle and calculation-sheet grammar — 2026-09-02

This section supersedes the statement that `private-dinner-process-v2.png` is the active exception.

- Every meaningful block ultimately receives exactly one process raster, approved independently in
  chat before insertion. A rejected candidate is never rendered.
- `masterchef-recipes-europe.png` remains approved by explicit user instruction and is not regenerated.
- `private-dinner-calculation-process.png` replaces the rejected private-dinner prototype. Its grammar
  is a chef's calculation sheet: inputs, quantities, yield/loss, time, heat/equipment dependency and
  ordered service. This grammar is specific to the dinner block and must not be mechanically repeated.
- `private-event-production-calculation.png` is the approved private-event grammar: guest count and
  reserve, four-item menu allocation, batch and tray quantities, production handoffs and timed service.
  It contains no venue plan, furniture or coloured drawing marks.
- `masterclass-six-person-learning-process.png` is the approved learning-production grammar: exactly
  six participants are divided into two stations of three; one demonstration branches into synchronized
  practice, a control gate returns errors through a correction loop, and the accepted route resolves into
  three dish outputs. The sheet calculates three ingredient kits and 18 participant portions. It contains
  no classroom furniture, certificate motif, event tray/batch logic or colour.
- `workday-four-step-vertical.png` is the approved text-free workday grammar. The unchanged portrait
  film occupies the left safe zone; four graphite miniatures form one vertical column on the right in the
  order purchase → preparations → marinade → cooking at home. The raster contains no title, labels,
  numbers, calculations, vehicle, clock or colour. The live workday copy is removed from visual flow at
  the user's direction but retained as screen-reader context.
- The blueprint and documentary media form one composite. The raster is absolute at `z-index: 0`; the
  unchanged photograph or film is above it at `z-index: 1`. Live copy remains above both for the three
  event-format sheets; the workday is the explicitly approved text-free exception. Media occupies the
  quiet area intentionally designed into each sheet.
- Event-format calculation rasters must stay legible on at least two sides and in a meaningful lower
  strip. The text-free workday instead preserves its four-step right column. Neither grammar may create
  empty paper through a fixed `min-height`, padding or margin.
- The former detached `<figure>` drawing pattern remains prohibited. SVG, generated vector markup,
  gradients, filters, shadows, blend modes and decorative animation remain prohibited.
- Candidate files may remain for audit history, but only the currently approved filename for a block
  may be referenced by rendered JSX or CSS.
- Phone composition is designed independently for event formats: retain the overlapping media/process
  relationship, preserve the left calculation total and lower service sequence, and avoid horizontal
  scrolling. The workday exception scales its single `2 / 1` composite proportionally at every width.

All other blocks remain in documentary fallback while their unique process sheet is awaiting the
user's explicit yes/no decision.

New candidates after the private-event correction use monochrome graphite construction, hatching and
type on neutral paper. No antique-gold route or coloured food is added unless the user later approves
that colour for a specific block. Earlier approved assets remain unchanged unless separately revised.

## Exact screenshot-crop grammar — remaining blocks — 2026-09-02

The direct approval of `docs/references/ideal-remaining-blueprints-2026-09-02.png` replaces the generated
candidate workflow for personal menu, meat, fish, produce and inquiry. These five visuals use literal
opaque PNG crops from the approved source, not ImageGen output and not the retired transparent WebP
reconstructions.

- Source crop geometry is immutable: personal menu `645 × 555`, meat `480 × 143`, fish `489 × 157`,
  produce `501 × 155`, inquiry spoon `417 × 157`.
- Each crop is rendered at its complete intrinsic ratio with `object-fit: contain`. No secondary crop,
  mask, opacity, filter, blend mode, shadow, SVG, generated overlay or colour correction is allowed.
- The sampled source-sheet paper is `#f7f4ef`. The containing menu/source/inquiry surfaces use that
  reference-grounded paper so the immutable rectangular crops do not acquire artificial frames.
- Personal menu uses the crop's embedded real dish as the final food image. The previous separate
  circular `gallery-dish.webp` figure is not layered over it because that would change the approved
  drawing and show a different dish.
- Meat, fish and produce use one three-part editorial row: live chapter copy, unchanged documentary
  sourcing photograph and the complete exact drawing. The three rows share a grid but retain distinct
  subject-specific drawings and source crops.
- Inquiry is the compact bordered close shown in the reference: live invitation at left, exact spoon
  crop in the middle and the existing verified Instagram action at right. The villa is no longer
  rendered in this block; no second image competes with the approved spoon.
- At 821 px and above these relationships remain side-by-side. At 820 px and below the menu visual moves
  beneath its live copy. At 560 px and below each source row places its live chapter copy beside the
  documentary photograph, then gives the exact drawing the complete second row so its construction
  details remain readable; inquiry becomes invitation → spoon → action. This is an authored mobile order,
  not a proportional shrink of the desktop sheet.
- MasterChef, dinner, private event, masterclass and workday keep their separately approved assets and
  geometry. Hero has no drawing in this supplied reference and receives none.

## Process-background row direction — 2026-09-02

- The four process rows after Hero use one directional rule: MasterChef photo-left/copy-right; private
  dinner photo-right/copy-left; private event photo-right/copy-left; masterclass photo-left/copy-right.
- The approved 2:1 drawing is always the lowest visual layer. It is never a detached third column and
  must remain visible around the photograph and in the lower end-of-block band.
- Documentary photographs use their complete intrinsic aspect ratio. Their wrappers are sized from the
  source ratio and images use `object-fit: contain`; no face, hands, cookware or venue edge is removed to
  force a uniform crop.
- At 820 px and below, private dinner and private event preserve copy-first reading order before their
  process field. Masterclass preserves process-field-first order before its copy. MasterChef remains a
  left/right proof pair at tablet width and becomes field-first/copy-second at phone width.
- No change is made to the approved raster files, copy, numbering, typography, colour or square-edge
  treatment. No card, frame, shadow, gradient, mask, SVG or new illustration is added.

## Muted process-background colour — 2026-09-02

- The four primary process underlays use colour, but remain technical drawings subordinate to the documentary photographs and live copy.
- Allowed colour family: paper beige, warm graphite, desaturated olive, dusty herb green, muted terracotta and the site's soft ochre/gold.
- Colour is selective and low-saturation. Fine construction lines, Russian copy, quantities, scales and diagram geometry remain unchanged and legible.
- Vivid primary colours, rainbow palettes, neon tones, broad opaque fills and high-contrast gradients are prohibited.

## Collision-free process field — 2026-09-02

- The process image spans the complete twelve-column editorial row and is the lowest visual layer.
- Every desktop underlay contains two authored quiet zones matching the live copy and the complete documentary photograph. No label, calculation, line, arrow or food study may sit behind either foreground zone.
- Different calculations and combinations occupy the remaining centre gap, outer margins and lower end-of-block band; they must not form one large hidden table.
- Copy and photographs remain live foreground elements. Text is never rasterised into the underlay, and photography is never baked into the generated drawing.

## Narrow-screen copy cell — 2026-09-02

- At 560 px and below, every primary process block is one continuous technical-paper field rather than two detached stacked blocks.
- The live copy occupies a bordered upper cell with normal reading width and size. The 2:1 process raster is anchored immediately below, and its foreground photo remains in the authored quiet zone.
- The cell border uses the existing blueprint rule colour; no card radius, shadow, fill, icon or ornamental frame is added.
- The duplicate desktop copy reserve is not shown in the lower mobile raster. Dinner/event rasters expose source x 30–100%; MasterChef/master-class rasters expose source x 0–70%. The active portion scales proportionally and is clipped by the unified field.

## Foreground-first process rendering — 2026-09-03

- Live copy and the complete documentary photograph are laid out and measured before any replacement underlay is rendered.
- Desktop process fields remain 2:1. Narrow-phone fields may become taller, but the photograph and live copy remain side-by-side rather than stacking.
- Each breakpoint family receives its own raster underlay. Desktop rasters are not cropped or stretched into mobile compositions.
- Copy and photo rectangles are immutable exclusion zones for image generation. All calculations, combinations and process marks must remain outside them.
- A photograph frame must match the source ratio exactly and be filled edge-to-edge. Cropping and letterboxing are both prohibited; only proportional scaling is allowed.
- High-resolution process masters use lossless PNG at no less than 2× the maximum rendered dimensions. Any optimized delivery derivative must preserve visibly crisp construction lines and readable numbers.

### Authoritative side rule

- MasterChef and master class: complete photograph left, live copy right.
- Private dinner and private event: live copy left, complete photograph right.
- This relationship is preserved at desktop, tablet and phone widths. “Top-to-bottom” applies only to the separate workday-step imagery and must not be generalized to these four process blocks.
- Photo and copy exclusion zones have no visible border, bracket, registration mark or placeholder frame. They read as unmarked paper within the one shared composition.

## Photorealistic MasterChef route — 2026-09-09

- The approved MasterChef underlay is now a responsive pair:
  `masterchef-travel-photoreal-desktop.png` at 1774 × 887 and
  `masterchef-travel-photoreal-mobile.png` at 887 × 1774.
- The Europe route and its ochre travel line remain a restrained technical drawing. The car and five
  destination dishes are photorealistic, softly lit and deliberately muted to stay subordinate to the
  documentary winner photograph and live copy.
- Desktop keeps the 2:1 composition. At 820 px and below the complete portrait raster uses a 1:2 field;
  it is switched with `<picture>` rather than cropped, stretched or reused from the desktop source.
- The winner photograph stays complete on the left and the live copy stays on the right. Both occupy the
  authored clear upper area while the route and dishes complete the lower half of the same rectangle.

## Real-photo culinary archive — 2026-09-09

This section supersedes `Photorealistic MasterChef route — 2026-09-09` for the active interface.

- The MasterChef block is a natural-height editorial composition, never one precomposed background.
  Personal evidence occupies the lead row: complete award photograph at left, unchanged biography at
  right. Illustrative internet imagery begins only in the archive below.
- The archive uses real rectangular photography of kitchen actions, not isolated food objects. Frames
  may share a 3:4 crop for rhythm, but their widths and grid spans vary so they do not become a generic
  equal-card gallery.
- Genuine recipe and map facsimiles may appear only as discrete credited figures. Do not simulate
  handwriting, parchment, tape, torn edges, stamps, travel routes or archival dates.
- All photography and facsimiles use square edges, no shadow, no radius, no CSS filter, no blend mode and
  no opacity texture. `object-fit: cover` is allowed only for the five explicitly illustrative stock
  action frames; the Evgen award photograph remains complete with `object-fit: contain`.
- Narrative metadata is live HTML in Montserrat uppercase: 10–11 px, 0.12–0.16 em tracking, muted ink or
  `--accent-small`. Separators use a single 1 px `--rule` line. Numbers are functional sequence markers,
  not badge decoration.
- Desktop uses the twelve-column content grid. At 820 px and below the lead pair remains photograph-left
  and copy-right; the archive becomes a two-column asymmetric contact sheet without horizontal overflow.
  At 430 px and below the text remains at least 12 px and touch/navigation behavior is unchanged.
- The retired `masterchef-travel-photoreal-desktop.png` and
  `masterchef-travel-photoreal-mobile.png` must not be referenced by active JSX or CSS.

## Mapped recipe journey — 2026-09-09

This section supersedes the detached archive-grid rules for the active MasterChef continuation.

- The primary visual is one wide geographic field using NordNordWest's credited CC BY-SA 3.0 blank
  Mediterranean location map. Its documented bounds (7° W–42.5° E, 29°–48° N) include the complete
  Spain-to-Cyprus working route. It has square edges, no shadow, no radius, no generated scenery and no
  decorative vehicle.
- Five live country labels, five route points and five real photo figures form exact one-to-one pairs:
  Spain/paella, France/sauce work, Italy/ravioli, Greece/octopus and Turkey/pistachio pastry. These are an
  editorial working set pending chef confirmation, not documentary proof of a precise itinerary.
- A 1.5 px `--accent-small` path connects the five country points and ends at Cyprus. Separate 1 px
  `--ink` leaders connect each point to its photograph. The inline SVG is permitted here because every
  line communicates the explicit map-to-dish relationship requested by the user.
- The country, dish and technique remain live text. Country labels use Montserrat 600 at 11–12 px;
  dish names use Cormorant Garamond at 20–26 px; supporting technique text uses Montserrat at 11–12 px.
  Numbers are sequence references shared between points and figures, never decorative badges.
- Desktop uses one fixed 16:9 spatial canvas: the complete map occupies the centre and photographs sit
  on unequal perimeter positions. Map pixels, route and route points share one exact 1754:862 wrapper;
  the five outer leaders share the 16:9 canvas and terminate inside the associated photo edge. No two
  figures receive a common card surface.
- At 940 px and below the map remains complete above an ordered route ledger. Every ledger row keeps
  `country → horizontal leader → photograph` on one line, while alternating image widths and offsets
  prevent a generic repeated-card stack. The route and all six country names remain visible on the map;
  only the desktop perimeter leaders are replaced by row leaders. The route order remains semantic in
  an `<ol>`.
- At 430 px and below country/dish text remains at least 11 px, the map is never horizontally scrolled,
  and the page must have no overflow. No information is hover-only and no route-drawing animation is
  added.

## Integrated MasterChef route — 2026-09-09

This rule replaces the active standalone journey layout while keeping its verified assets, attribution
and geographic point geometry.

- The award image, biography and route share one `story-origin-archive-field`. The route has no display
  heading and no independent section border; a small `маршрут рецептов` label is contextual metadata.
- The map is a full, low-contrast background layer. Its coastline and the ochre route remain visible;
  five photographs and labels are the foreground endpoints. Map opacity may sit between `.14` and `.22`,
  while route/leader strokes remain 1–1.5 px.
- The five dish images use an identical `1 / 1` crop, square edges and one 1 px `--rule` keyline.
  Their shared documentary grade is `grayscale(.12) sepia(.08) saturate(.82) contrast(1.04)
  brightness(.97)`. This grade applies only to illustrative dish photography, never the award image.
- Crop positions are fixed from source inspection: Spain `center 36%`, France `center 47%`, Italy
  `center 46%`, Greece `center 47%`, Turkey `center 44%`.
- Callout labels use live Montserrat at 11 px minimum and combine country and dish in one compact line.
  Full descriptive alt text remains on every photo. Numbers and leaders carry route identity and are not
  decorative badges.
- At phone widths, keep the award photo and concise text side by side. The map continuation is 245–295 px
  tall across the 375–560 px range; each food callout is `clamp(46px, 13vw, 56px)`. All five callouts, the Cyprus endpoint, attribution
  and editorial-status note must fit without a horizontal scrollbar or a repeated vertical list.
- No UI component library is introduced. Semantic HTML, CSS Grid/absolute positioning and the existing
  inline route SVG are the only primitives.

## Transparent route plates — 2026-09-09

This rule supersedes the active square stock-photo apertures and their shared CSS grade.

- Active dish media are five separate 512 × 512 WebP delivery images derived from coordinated generated
  masters. Each canvas contains one complete plate only; no table, room, hand, utensil, napkin, garnish
  outside the plate, border, text, logo or watermark is visible in the interface.
- Photography lock: near-overhead 70° camera, normal-lens perspective, identical plate scale, matte warm
  off-white porcelain, soft large-source daylight from upper left, restrained contrast, natural colour,
  plausible food textures and small real preparation irregularities. Avoid CGI gloss, illustration,
  aggressive HDR, impossible ingredient repetition and excessive symmetry.
- Native alpha remains the preferred source format, but the built-in generator did not encode it in this
  pass. The active neutral fallback clips the shared plate geometry with one calibrated CSS ellipse so no
  backing pixels are visible. CSS must not add a drop shadow, border, filter, blend mode or opaque surface.
- Desktop plate width is `clamp(82px, 9vw, 118px)`; at 560 px and below it is
  `clamp(48px, 14vw, 58px)`. Use `aspect-ratio: 1 / 1` and `object-fit: contain`.
- Stops are positioned as local map callouts rather than a grid rail: Spain lower-west, France upper-west,
  Italy upper-centre, Greece lower-east and Turkey mid-east. Captions remain live and pair route number,
  country and dish; desktop retains full point labels, while compact screens may reduce point labels to
  numbers because the adjacent captions preserve the text relationship.
- Leaders remain 1 px graphite and begin at the exact geographic route points. Their authored endpoint
  sits beneath the associated plate centre; the higher plate layer hides the continuation so the visible
  line always ends exactly at the silhouette edge at every responsive size.
- The map remains the lowest layer at `.16`–`.18` opacity. The integrated route canvas targets
  340–344 px on desktop, 245–330 px on tablet and 190–240 px at 375–560 px. No internal scrolling or clipping of live
  captions is permitted.
- No UI library is involved; semantic HTML, the existing SVG coordinate system and focused CSS are the
  only layout primitives.

## Present-day home chapter amendment — 2026-09-09

The user's new request for a video concept, visible description and illustrations supersedes the
2026-09-02 text-free workday override. The approved film and graphite process raster remain the media
sources; this amendment changes their hierarchy and restores live explanatory copy.

- Message: the heading stays `Я — у вас дома.` The chapter lede is factual and follows the existing
  day arc. The closing display line is `Чтобы вы были дома — со своими.` It describes the service
  outcome without introducing an unverified operational promise.
- Desktop: one twelve-column editorial spread, not a card row. Copy occupies the opening four columns,
  the 9:16 documentary film occupies the middle portrait field and a CSS crop of the approved four-step
  graphite raster occupies the closing field. The four live stage captions form one ruled ledger below
  the lede or media, depending on available width.
- Mobile: copy comes first. Film and illustration remain side by side as unequal evidence rather than
  becoming a full-width poster followed by a tiny diagram. Stage captions use two columns at 430–375 px,
  remain at least 13.6 px and preserve the real order: products, preparation, marinade, cooking at home.
- Media: the existing film stays muted, looped, poster-first and visibility controlled. The approved
  raster remains text-free; all meaning is live HTML. The generated storyboard is a production-planning
  artifact only and is not represented as a real venue, guest group or documentary photograph.
- Styling: use only `--paper-light`, `--ink`, `--muted`, `--accent`, `--accent-small` and `--rule`, with
  the existing Cormorant/Montserrat roles. Zero radius, zero shadow, zero gradient and square media edges.
- Interaction: no new action, control or animation. The page's single Instagram inquiry route remains
  unchanged.
- UI libraries: none. React markup, CSS Grid and the existing video playback hook are the only
  implementation primitives.
## Flag route nodes — 2026-09-09

- Visible route numbering is absent. The dish journey remains a semantic ordered list, but country and dish
  names are the only visible identifiers.
- Each of the six route coordinates uses one local 3:2 national-flag SVG. Flags are centred on the route
  point, rendered above the ochre route and below live labels/plates, and use square edges with no shadow,
  radius, glow or motion.
- A 3 px paper-colour keyline and 1 px low-opacity ink outline may be used to preserve the edges of white
  flag fields against the quiet map. This is functional separation, not card chrome.
- Desktop flag geometry is 84 × 56 source-map units inside the existing `150 100 1450 600` viewBox. The
  same SVG geometry scales with the map on tablet and phone, avoiding breakpoint drift.
- Desktop retains live country labels beside the six flag nodes. At 560 px and below the five travelled
  country labels may be hidden because the adjacent plate captions repeat them; the Cyprus endpoint label
  remains visible. No information may depend on flag recognition alone.

## Flag-filled territory overlay — 2026-09-09

- The rectangular route-node flags are retired from the active map. National colour appears only inside the
  real projected territories of Spain, France, Italy, Greece, Turkey and Cyprus.
- Geometry source: Natural Earth 1:50m Admin 0 country polygons. Projection: equirectangular into the existing
  1753.947 × 861.729 base-map canvas using its documented bounds of −7° to 42.5° longitude and 48° to 29°
  latitude. Remote polygons outside the Mediterranean field are excluded.
- The transparent overlay shares the map's exact canvas and crop, so country shapes, route and leaders scale
  together at every breakpoint. No CSS-positioned territorial approximation is allowed.
- Each territory clips a simplified national flag field. Use the standard flag colours already recorded in
  the project; preserve islands present in the 1:50m geometry and use even-odd fills for interior rings.
- Country colour is visually dominant over the base map but remains beneath the ochre route and functional
  leaders. A restrained `--ink`-family outline may separate neighbouring territories; no keyline rectangle,
  shadow, radius, glow, gradient or animation is allowed.
- Country and dish names remain live HTML. The map title enumerates every filled territory and the plate
  captions repeat the five recipe countries, so no information depends only on colour or flag recognition.
- On phones, retain the same geographic overlay rather than swapping in enlarged markers. Labels may be
  collision-managed independently, but the country silhouettes may not be displaced or enlarged.

## Minimal documentary home chapter correction — 2026-09-09

This correction supersedes the earlier two-image `present-day home chapter` layout.

- **Composition:** one 12-column editorial spread only: copy in the left field, one real portrait film in
  the right field, and intentional empty columns between and around them. No secondary illustration or
  stage grid is permitted in this chapter.
- **Film geometry:** keep the source's authored 9:16 ratio, square corners, no device frame, shadow,
  radius, overlay tint or decorative border. Desktop width is restrained rather than stretched to fill
  the available row.
- **Colour:** the film remains photographic. Editing may selectively reduce yellow saturation and use a
  very small cool compensation, but must preserve natural skin, vegetables and plated food. CSS filters
  and strong global grading are prohibited.
- **Image rule:** only frames from the real supplied film may appear in the live chapter. AI images,
  drawn process diagrams and illustrative composites are excluded by the user's latest direction.
- **Caption:** one small factual line below the film. It may identify the domestic setting and visible
  sequence, but cannot claim a client testimonial, unstaged shoot or location not evidenced by the film.
- **Responsive design:** at 820 px the spread may retain a restrained copy/film pairing if both stay
  readable. At 560 px and below it becomes a deliberate linear reading order: copy, promise, centred
  portrait film, caption. Film width is capped near 280 px instead of becoming edge-to-edge.
- **Motion and controls:** preserve the existing muted, inline, looping and viewport-controlled playback;
  the static real-food poster is the low-motion and pre-play state.
- **Anti-template constraint:** no cards, stepper, checkerboard, split media, icon row, ornamental rules,
  generated drawing or new CTA may be introduced into this chapter.

## Home chapter film-and-outcome pair correction — 2026-09-09

This correction supersedes the prohibition on an adjacent image above while retaining the ban on grids,
cards and multi-panel process art.

- **Video invariant:** the supplied `chef-story-img-5399-no-grill.mp4`, original poster and caption timing
  remain untouched and unfiltered.
- **Companion image:** one photorealistic 4:5 raster may sit beside the 9:16 film. It depicts the service
  outcome, not another preparation step, and must be visibly disclosed as a visualization.
- **Pair geometry:** use approximately `.72fr 1fr` columns. Because 9:16 at `.72` width and 4:5 at `1`
  width produce almost equal heights, both media align naturally without a card frame or forced crop grid.
- **Colour:** neutral daylight, paper, stone, charcoal, dark shell and restrained vegetable colour. Avoid
  orange cabinetry, golden restaurant lighting, patterned textiles and checkerboard surfaces.
- **People:** no identifiable face or generated chef likeness. Natural cropped hands may communicate a
  shared table without implying a specific client or documented event.
- **Surface:** square corners, no shadow, border, radius, tint, badge, icon, overlay copy or animation.
- **Mobile:** the pair remains side by side down to 375 px with a 10–12 px gap and independent 11 px
  captions; the copy sits above it. The stage ledger remains prohibited.

## Event-specific blueprint candidate contract — 2026-09-09

The user approved this set on 2026-09-09. The three `*concept-v3.png` delivery assets are active in the
event-format rows; the mockup folder remains their design/provenance record.

- Every underlay is 1774 × 887 on warm ivory paper, with fine graphite/charcoal construction and only
  restrained sage, dusty terracotta and antique-brass accents.
- Private dinner keeps copy left and the complete portrait photograph right; its unique visual grammar is
  ingredient/preparation convergence into seven courses and an intimate table.
- Private event keeps copy left and the complete landscape photograph right; its unique grammar is small-
  bite assembly, rectangular tray circulation, return and replenishment among standing guests.
- Masterclass keeps the complete landscape photograph left and copy right; its unique grammar is technique
  demonstration, two practice stations, feedback/correction and a long shared workbench.
- Quiet apertures are borderless paper, not cards or frames. Generated sheets contain no readable text;
  exact factual content remains live in any future implementation.
- Square edges, no shadow, no radius, no gradient, no browser chrome and no UI-library styling.
- At 821 px and above, each approved underlay remains behind its established copy/photo apertures.
  At 820–561 px, private dinner uses a `1 / 1.1` field to accommodate its portrait photo; the two
  landscape formats use `1 / .9` fields so their shorter media does not create an empty middle. At 560 px
  and below, dinner/event use `1 / 1.18` and masterclass uses `1 / 1.08`, protecting wrapped Russian copy
  while retaining the full 2:1 drawing directly beneath the live pair. No blueprint is hidden merely
  because the viewport is narrow.

## Event-format portrait underlay contract — 2026-09-09

This mobile correction supersedes only the final `560 px and below` rule above.

- Each event format has one dedicated portrait raster for tablet and phone widths up to 820 px. It preserves the approved event-specific
  topology but redistributes it around two upper live-content apertures and one compact lower process zone.
- The raster contains no readable words, numbers, logos, watermark, UI chrome or embedded photograph.
  Russian copy, numbering and documentary imagery remain accessible HTML.
- Private dinner and private event keep copy left / photo right. Masterclass keeps photo left / copy right.
  The photo aperture is visually equal to or slightly larger than the copy aperture; neither becomes a
  thumbnail beside a dominant illustration.
- Process lines may enter from the outer edges, pass through the centre gap and resolve in the lower part of
  the same sheet. The lower process zone is not a separate figure and must not be isolated by a large blank
  band or a second divider.
- Tablet fields use the portrait asset's intrinsic 1122:1402 ratio. At 560 px and below, a slightly taller
  17:25 field creates a content-occupied upper reserve while the complete intrinsic-ratio sheet remains
  anchored within the same composition. A `<picture>` media source switches assets without duplicating
  semantics or hiding information.
- At 380 px and below, the field adjusts to 13:20 and the two left-copy formats gain three percentage
  points of copy width. This is a measured collision correction for the longer private-event paragraph,
  not an additional visual breakpoint or a change to the drawing scale.
- Wide screens above 820 px continue to use the approved 1774 × 887 drawings. No new card, radius, shadow, gradient,
  border frame, icon library, animation or UI component is introduced.

## Event-format compact narrow sheet contract — 2026-09-09

This contract supersedes the portrait-underlay contract above.

- **Source boundary:** use the dedicated compact raster through 940 px. The approved 1774 × 887 wide
  concept returns at 941 px, the first verified width where its live-copy zones remain clear.
- **Phone canvas:** use a near-square sheet and a square CSS field. The upper 46–50% is calm ivory paper
  reserved for the live copy/photo pair; one sparse process band occupies the lower half. No process mark
  may cross the two foreground rectangles.
- **Density:** keep at least half the canvas as unmarked paper. Ban full-height process towers, botanical
  borders, repeated realistic participant bodies, mirrored station panels and richly shaded table spreads.
  Use fine graphite, one restrained brass route and only small sage/terracotta accents.
- **Foreground hierarchy:** at 360–430 px the exact HTML copy remains 12 px or larger, headings remain
  17 px or larger, and documentary photographs remain recognisable apertures rather than thumbnails.
  Private dinner/event keep copy left and photo right; masterclass keeps photo left and copy right.
- **Geometry:** phone fields use `1 / 1`; compact foregrounds begin near 5%. The private-dinner portrait
  may use a narrower 33–35% aperture so its 4:5 crop clears the lower band; landscape photographs may use
  42–48%. Exact values are verified against the longest private-event and masterclass copy.
- **Tablet and intermediate geometry:** 561–820 px keeps the same square field and deliberately larger
  live type. At 821–940 px the same compact raster is contained inside a shallow `2 / 1` field while the
  established wide live-copy/photo coordinates are retained; this removes height without reintroducing
  illustration behind the copy.
- **Surface:** continuous warm paper, square edges, no border around apertures, card, radius, shadow,
  gradient, glow, embedded words, number, logo or watermark.

## Country-colour photographic route plates — 2026-09-09

- The integrated MasterChef route, licensed map, country labels, leaders and live captions remain the
  approved structure. This amendment changes only the five plate-image deliveries.
- Each dish is one isolated native-alpha photographic cutout on a complete ceramic plate: paella for
  Spain, duck for France, ravioli for Italy, octopus for Greece and baklava for Turkey.
- Ceramic colour carries country identity with restrained glazed tones: saffron/red; ivory/navy/red;
  ivory/green/terracotta; ivory/cobalt; crimson/ivory. Do not print flags, crests or typography on plates.
- Photography uses coherent near-overhead perspective, soft daylight, contact shadow, natural food
  texture and restrained saturation. Avoid waxy surfaces, repeated ingredients, synthetic blur and CGI
  specular highlights.
- Active delivery is 1024 × 1024 high-quality WebP with alpha. At the current 48–118 CSS px display range
  this preserves high-density sharpness without shipping the multi-megabyte masters.
- The wrapper must not crop the alpha silhouette: no `clip-path` and no hidden overflow. The image stays
  square with `object-fit: contain`; the full coloured rim must remain visible at every breakpoint.

## Unified MasterChef editorial-stage contract — 2026-09-09

- `story-origin-lead` is one continuous paper field. On desktop its height is approximately 43 viewport
  percent, clamped to 520–620 px; it is not a card and receives no border, radius, shadow or tint.
- The complete award photograph occupies the upper-left 46%; the live heading and biography occupy the
  upper-right 48%, beginning at 52%. The 6% interval is editorial whitespace, not an empty grid column.
- The Mediterranean route keeps its native `1450 / 600` ratio, aligns to the bottom and uses 100% of
  the desktop stage so it begins beneath the photograph and continues beneath the copy from outer edge
  to outer edge. It has no arbitrary pixel maximum. All map geometry remains in its source coordinate
  system.
- At widths through 820 px the upper foreground remains two equal columns with a 10 px seam. The route
  becomes full width in the immediately following grid row with a 12–18 px shared rhythm; it never
  crosses wrapped photography or text. Phone flags are suppressed because the live plate captions repeat
  country identity at a readable size.
- At 430 px and below the route kicker occupies the otherwise unused lower-left space beneath the complete
  landscape proof while the biography remains in the right column. This is a measured balance correction,
  not extra content or a detached label.
- The proof image always uses `object-fit: contain` at the verified 1719:900 ratio. Its caption has no
  artificial rule line. The map, plate cutouts and captions must stay within the shared field.
- Plate delivery, route palette, typography and evidence labels remain governed by the approved route
  contract above. This correction changes proportion and placement only.

- **Source boundary:** use the dedicated compact raster through 940 px. The approved 1774 × 887 wide
  concept returns at 941 px, the first verified width where its live-copy zones remain clear.
- **Phone canvas:** use a near-square sheet and a square CSS field. The upper 46–50% is calm ivory paper
  reserved for the live copy/photo pair; one sparse process band occupies the lower half. No process mark
  may cross the two foreground rectangles.
- **Density:** keep at least half the canvas as unmarked paper. Ban full-height process towers, botanical
  borders, repeated realistic participant bodies, mirrored station panels and richly shaded table spreads.
  Use fine graphite, one restrained brass route and only small sage/terracotta accents.
- **Foreground hierarchy:** at 360–430 px the exact HTML copy remains 12 px or larger, headings remain
  17 px or larger, and documentary photographs remain recognisable apertures rather than thumbnails.
  Private dinner/event keep copy left and photo right; masterclass keeps photo left and copy right.
- **Geometry:** phone fields use `1 / 1`; compact foregrounds begin near 5%. The private-dinner portrait
  may use a narrower 33–35% aperture so its 4:5 crop clears the lower band; landscape photographs may use
  42–48%. Exact values are verified against the longest private-event and masterclass copy.
- **Tablet and intermediate geometry:** 561–820 px keeps the same square field and deliberately larger
  live type. At 821–940 px the same compact raster is contained inside a shallow `2 / 1` field while the
  established wide live-copy/photo coordinates are retained; this removes height without reintroducing
  illustration behind the copy.
- **Surface:** continuous warm paper, square edges, no border around apertures, card, radius, shadow,
  gradient, glow, embedded words, number, logo or watermark.

## Hero comparison-board boundary — 2026-09-09

The five Hero boards in `design/mockups/hero-layout-options-2026-09-09/` are exploratory artifacts, not
an active design-system amendment. They must preserve the existing exact title, header destinations,
cream/ink/gold colour roles, current Cormorant Garamond and Montserrat binaries, square edges and real
local documentary media. They may vary only composition, crop, line measure and evidence density.

The boards must not introduce generated people, stock media, gradients, blur, glass, shadow, radius,
placeholder copy, a generic CTA, a uniform card grid or a UI-library theme. A selected direction requires
its own deliberate phone composition and visual verification at 1440, 1280, 1024, 768, 430, 390 and
375 px before it can supersede the live Hero.

## Personal-menu sourcing reset — 2026-09-09

This amendment supersedes the active three numbered sourcing rows and the personal-menu/meat/fish/produce
cut-study presentation. The user's direct rejection of that entire block is authoritative.

- The chapter has one job: explain that the menu is produced by a conversation with the guest followed by
  product selection. It is not an ingredient catalogue and not a three-step procurement timeline.
- Visible copy states the relationship once: `ваш вкус → продукты → меню вечера`. The arrows are an inline
  reading aid only; no boxes, numbered nodes or interactive stepper are introduced.
- Retain the three approved photographs in meat → fish → produce order. The photographs act together as
  one documentary proof strip, not as three cards or three independent sections.
- Desktop and tablet use one uninterrupted, square-edged gallery row with unequal `5 / 4 / 3` shares.
  The unequal widths follow two landscape sources and one portrait source; all frames share one deliberate
  visual height.
- At 560 px and below, meat and fish occupy two compact landscape apertures in the left seven columns;
  produce occupies the right five columns across both rows. This is the authored phone composition, not a
  stacked desktop layout.
- Each frame owns one compact opaque-paper caption at its lower edge. Captions identify only the established
  sourcing relationship; they do not name suppliers, promise availability or represent generated market
  scenes as documentary evidence of a specific visit.
- Loading reserves use the section's existing warm paper. Market photographs may use restrained `cover`
  crops; the portrait harvest photograph may crop horizontally only enough to fit its content-driven narrow
  aperture while keeping Evgen and the grape crate legible.
- The four cut-study rasters, category numbers, row timeline, repeated headings and repeated quotations are
  inactive. Their files may remain as design history but must not be referenced by live page or CSS.
- No new colour, typeface, radius, shadow, gradient, glass, ornament, animation, hover behavior, carousel,
  tab, icon or secondary action is part of this chapter.

## Home-chapter contextual route amendment — 2026-09-09

This amendment extends the active wide `4 / 3` home-film composition with factual context from the
previously approved morning/day/evening sequence.

- Active lede: `Подготовка начинается задолго до прихода гостей: я закупаю продукты, делаю заготовки,
  маринады и соусы. К вам приезжаю с готовым mise en place и беру на себя огонь и подачу. Вы встречаете
  гостей и остаётесь частью собственного вечера.`
- One semantic `<dl>` follows the copy relationship: `утро — закупаю продукты`, `день — делаю заготовки,
  маринады и соусы`, `вечер — готовлю и подаю у вас дома`.
- The route is typography and hairlines only: muted/ink body text, `--accent-small` phase labels and
  `--rule` separators. It has no container fill, border box, radius, shadow, icon, number or illustration.
- Above 1100 px, copy and route occupy the left four columns while the film spans the right eight columns
  across both rows. The route aligns toward the film's lower half to use the existing quiet field.
- From 821–1100 px and from 561–820 px, the copy/film pair stays in its approved columns and the route
  becomes one three-column ruled line across the full content width below it.
- At 560 px and below the deliberate reading order is copy → three compact definition rows → film. Phase
  labels and statements remain at least 11 px and the video remains full-width `4 / 3`.
- The original film, poster, VTT, promise, caption, motion behavior and every surrounding chapter remain
  unchanged. No UI library is introduced.

## Hero collage-retention comparison boundary — 2026-09-09

The user has made the collage mandatory for every new Hero direction. Comparison boards may redistribute
the existing 94-source archive, exact title and real apron portrait, but may not replace the archive with
one photograph, a reduced evidence strip or a three-image story. The active cream, ink, gold, Cormorant
Garamond, Montserrat, square-edge and 2 px seam rules remain fixed.

Allowed comparison moves are grid-ratio changes, larger documentary spans, grid-aligned paper apertures,
one calm horizontal band, one central archive frame, a diagonal reading sequence or a reversed dominant-
archive split. No gradient, blur, glass, shadow, radius, generated person, stock media, placeholder copy,
new CTA or UI-library styling is allowed. These boards remain non-public until one direction is selected
and independently authored for all required desktop and mobile widths.

## Active Hero collage-frame amendment — 2026-09-09

Direction `04 · Коллаж-рамка` is user-approved and becomes the active Hero composition.

- **Field:** the Hero below the masthead is one full-width photographic archive. Every one of the current
  94 local sources is instantiated once; none is hidden at a breakpoint.
- **Archive partitions:** above 1100 px use 10 columns × 12 rows; from 561–1100 px use 12 columns × 10
  rows; at 560 px and below use 8 columns × 15 rows. Each map contains 26 explicitly chosen two-column
  cells, so 94 images occupy the partition exactly. Grid flow is dense and seams remain 2 px.
- **Central spread:** square edges, solid `--paper`, a 2 px `--paper-light` outer keyline and one 2 px
  internal media seam. It has no radius, shadow, transparency effect or decorative layer.
- **Wide composition:** copy/portrait is approximately `56 / 44`. The exact Russian title is vertically
  centred inside the copy field; the real apron portrait fills the adjacent aperture with cover cropping.
- **Phone composition:** the spread becomes a single vertical unit with copy above portrait. The central
  unit stays inset on all sides so the archive remains a recognisable frame rather than a background strip.
- **Typography:** keep Cormorant Garamond normal/italic and the established ink/gold roles. Desktop title
  peaks at 64 px; phone title remains 38–42 px with an independently sized service line.
- **Media:** `chef-hero-apron.jpg` remains unedited; `object-fit: cover` and a centre-biased focal point may
  remove its baked black bands. Archive tiles retain the approved restrained saturation/contrast treatment.
- **Prohibitions:** no new copy, CTA, icon, generated media, stock image, gradient, blur, glass, shadow,
  radius, hover spectacle or UI-library appearance belongs to the Hero.

## Private-dinner seven-plate amendment — 2026-09-09

This amendment supersedes the active private-dinner process drawing while leaving the other two event
formats unchanged.

- The first event field keeps its live `01`, `Частный ужин`, exact paragraph and real portrait photograph.
- Its supporting visual is one text-free, overhead photographic composition with exactly seven complete
  plates in a fixed two-row rhythm: four on the upper row and three centred below.
- No course number, course type, dish name, arrow, route connector, legend or caption is visible inside or
  beneath the plate image. The existing paragraph remains the sole explanation of the seven-course offer.
  A separate empty interface layer may carry only the approved structural perimeter and separator rules.
- The plate composition is representative generated imagery, not evidence of an actual client menu. It is
  decorative to assist visual understanding and therefore receives empty alternative text; the factual
  promise remains accessible live HTML.
- Reuse only the approved `Transparent route plates` photo grammar: near-overhead 70° camera, normal-lens
  perspective, consistent plate scale, matte warm porcelain, soft upper-left daylight, natural texture and
  small preparation imperfections. Do not reuse its five named dishes as factual private-dinner menu claims.
  Reject glossy CGI, impossible ingredients, duplicate plates, props, hands and watermarks.
- The plate image keeps its native `3 / 2` ratio. Its placement may change across wide, tablet and phone
  layouts, but the four-over-three topology, complete image and clear separation from live copy/photo must
  remain intact.
- First-format field ratios are content-fitted rather than inherited from the other services: `1.8 / 1`
  above 1100 px, `1.5 / 1` from 821–1100 px, `1 / 1` from 561–820 px and `.92 / 1` through 560 px.
  The uncropped plate field occupies respectively 56%, 52%, 76% and 88% of the local canvas width.
- This exception removes only the first format's obsolete blueprint underlay. Private-event and masterclass
  retain their current event-specific wide/compact rasters and geometry.
- Continue square edges and the established paper/ink/gold system. Add no card, radius, shadow, gradient,
  glass, glow, icon, hover effect, animation or UI-library theme.

## Annotated real plate amendment — 2026-09-09

This amendment adds one approved real plate to the personal-menu introduction and supersedes only the
rejected generated dish experiments. The active sourcing reset and its three-photo proof strip remain.

- **Photographic invariant:** inside the plate rim, preserve the selected source photograph exactly in
  subject, geometry, colour and texture. Remove only the marble outside the plate. Do not regenerate,
  relight, retouch, rearrange, sharpen or add food; retain genuine transparency outside the rim.
- **Wide layout:** the personal-menu introduction becomes a twelve-column editorial pair. Copy occupies
  columns 1–4 and the annotated plate occupies columns 5–12; the plate remains the dominant visual object.
- **Tablet and phone layout:** below 940 px, copy precedes the figure. The figure receives independent
  height and label positions; it is not the desktop composition scaled down. Important meat, sauce and
  garnish regions must remain unobscured at 768, 430, 390 and 375 px.
- **Callout vocabulary:** exactly three live relationships are active: `баланс текстур и температур`,
  `соус связывает вкус и блюдо`, and `локальные продукты · сезон`. They describe menu-composition
  principles, not verified ingredients, suppliers or provenance of the pictured plate.
- **Leader style:** use deterministic inline SVG only. Lines are unfilled, round-capped, `1–1.25px`, and
  use the existing `--accent-small` at restrained opacity; small endpoint dots use the same colour. Labels
  use the established accent italic face and remain live text. No arrow icon library or baked raster text.
- **Surface and effects:** the figure stays on the existing `#f7f4ef` section paper with no card fill,
  radius, shadow, gradient, glass, glow, border frame or animation. The plate edge itself supplies all
  required depth; no synthetic shadow is added after background removal.
- **Accessibility:** the plate has a literal alt describing the visible meat, sauces and greens. Leaders
  are decorative and hidden from assistive technology; the three explanations remain readable HTML in
  DOM order. The source note does not claim that Evgen prepared or served the photographed dish.
- **Delivery:** serve a versioned alpha WebP/PNG from `public/media/menu/`; keep source/provenance details
  in project records. The rejected `personal-menu-photo-v1.png` and `personal-menu-photo-celeriac-v2.png`
  remain inactive design history and must never be referenced by the live page.
## Private-dinner drafting-rule amendment — 2026-09-10

- The `Частный ужин` process field has one inset square perimeter keyline plus three empty structural
  hairlines: upper rail, lower rail and the divider before the seven-plate field.
- One vertical spine separates live copy from the documentary photograph only in the upper content zone.
  It ends in two hollow circular points using the existing paper and `--accent-small` colours.
- All strokes are `1px` and use `--rule`; endpoints are restrained drafting accents. The layer is
  non-interactive and `aria-hidden`.
- No word, number, course name, legend, measurement or icon may be attached to these lines. Their only job
  is to frame and separate the existing factual copy, documentary photograph and representative plates.
- At 560 px and below, the horizontal content divider follows the physical boundary between the upper
  copy/photo pair and the lower 4 + 3 plate image. At wider breakpoints, its length and the vertical spine
  adapt to the existing asymmetric composition so neither line crosses text, a face or a plate.
- Preserve the approved first-format aspect ratios and all image sizes. Add no card surface, radius,
  shadow, gradient, glass, glow, motion or library component.

## Quiet-zone MasterChef stage contract — 2026-09-09

This contract supersedes `Unified MasterChef editorial-stage contract` and every active rule that requires
the inline map, route polyline, flag layer, point-label layer or leader layer.

- One continuous ivory stage contains all three elements. Above 900 px it prefers the 1774:887 (`2 / 1`)
  desktop ratio but keeps a 520 px fit floor at intermediate widths; from 561–900 px the square 1254 source
  occupies a denser 23:20 tablet field; at 560 px and below the stage switches to the art-directed
  1086:1448 (`3 / 4`) mobile composition.
- The underlay is the lowest layer. Desktop uses `contain` aligned to the lower edge; tablet uses `cover`
  and removes only surplus blank upper paper; mobile matches its intrinsic ratio. The stage paper is sampled
  from the raster's quiet edge (`#fcf6ef`), so contained artwork does not create a second white rectangle.
  The underlay is decorative (`aria-hidden`, empty `alt`) and contains no words, flags, food, photo aperture,
  text aperture or border.
- The desktop underlay reserves the upper half as unmarked paper. The mobile underlay reserves the upper
  58%. Only the lower band contains graphite geography, one continuous ochre route and the vintage car.
- The 1719:900 documentary award photograph is the upper-left foreground and always renders uncropped with
  natural height and `object-fit: contain`. The exact live title, biography and route kicker are one upper-
  right group. Both layers sit above the underlay and have transparent backgrounds.
- At 560 px and below the title remains in the right-hand live-copy rail with the photograph at left; the
  layout is not converted to a vertical stack. Unused space below the short landscape proof may carry only
  its existing caption or the route kicker—not invented copy.
- Five approved 1024 × 1024 native-alpha plate photographs are separate absolute children in the lower map
  band. Their complete ceramic rims remain visible; country and dish remain semantic live captions.
  Positions are independently set for landscape and portrait underlays so plates never enter the protected
  foreground. At 560 px and below only the country line is visually shown; the dish name remains in the DOM
  for accessibility and avoids collisions between five adjacent labels.
- The complete stage uses square edges with no card, border, radius, shadow, gradient, glow, colour panel,
  visible grid line or animation. A small disclosure below the stage may wrap normally and must not change
  the stage ratio.
- Active JSX must not reference the historic Mediterranean SVG or route-flag files. Those files and their
  credits remain stored only as historical source records.

## Mobile Hero compact-scale amendment — 2026-09-10

- At 560 px and below, the existing copy-over-portrait Hero spread is a centred intrinsic-height object;
  it no longer stretches between the former shallow top and bottom insets.
- The phone display title uses the existing Cormorant Garamond ink/gold roles at `30–34px`, `.9` leading,
  with reduced internal spacing. Its exact five controlled lines and accessible label remain unchanged.
- The central spread keeps square edges and uses approximately 12 vw side rails, bounded to prevent either
  edge crowding or excessive width. The apron aperture preserves the existing cover crop and is capped at
  `430px` high.
- The complete 94-photo archive, 8 × 15 mobile partition, 2 px seams, portrait source, caption and masthead
  remain unchanged. The newly exposed area is documentary collage, not blank or decorative filler.
- From 561 px upward, Hero size, 56/44 relationship, type scale and media geometry remain governed by the
  active collage-frame contract.
- Add no replacement image, generated crop, radius, shadow, gradient, blur, animation, CTA or UI-library
  component for this correction.

## Private-event editorial canapé-field amendment — 2026-09-10

This amendment supersedes the active private-event circulation underlays only. The private-dinner plate
field, masterclass process field and all content outside event row 02 remain unchanged.

- `Приватные мероприятия` is one square-edged editorial sheet with three content zones: live copy at upper
  left, the existing documentary cooking photograph at upper right and the approved local canapé study in a
  wide lower field.
- The complete surface uses `--paper: #f4efe5`. Structural marks use one colour only,
  `--rule: #c8c0b3`; no accent-colour spine, multicolour panel, second paper tile or tinted card is added.
- The documentary chef photograph and canapé photograph retain their original source colour at full opacity.
  The shared site colour belongs to the containing `--paper` sheet and its image apertures only. Row 02 must
  not apply grayscale, sepia, blend modes, tint overlays or reduced opacity to either photograph.
- One vertical `1px` rule divides copy and chef photograph only through the upper zone. One horizontal
  `1px` rule separates the full upper pair from the canapé field. An inset perimeter plus short empty top and
  bottom rails may unify the sheet; all marks are decorative and `aria-hidden`.
- The lower visual is `/media/event-formats/private-event-canapes-v3.webp`: a revised original 1774 × 887
  transparent WebP layer with many distinct canapés in three dense rows. The removed tabletop resolves to the
  aperture's exact `--paper` background, while every ingredient and its soft contact shadow retain natural
  colour at full opacity. It remains decorative with empty alternative text and does not assert delivered
  menu items, quantities or a specific client event. The former canapé
  illustration plus circulation/guest-route and compact circulation rasters are no longer active for row 02.
- Above 1100 px the field is a shallow landscape composition and the canapé raster may use a centred
  content crop to fit the lower band. From 561–820 px the field is square. Through 560 px it becomes slightly
  portrait so the exact paragraph remains legible while copy and photo stay side by side above a deeper
  canapé field. At every breakpoint the lower aperture ends at the established 5% inset; tablet and phone
  must not reinstate a detached `2 / 1` tile or leave an empty band before the bottom rule.
- Apart from the exact shared row-02 paper surface above, no gradient, shadow, radius, glass, glow, icon,
  badge, animation, UI-library theme or new business copy is introduced. The adjacent event rows preserve
  their separately approved visual grammars.

## Visual-defect repair amendment — 2026-09-10

- Hero documentary inventory is fixed at 94 local sources. Responsive maps remain 10 × 12 desktop,
  12 × 10 compact and 8 × 15 phone; no source is hidden to alter perceived density.
- Hero stage heights remain `700–824px` wide, `720–954px` tablet and `720–866px` phone. On phones the
  central editorial spread again uses the approved 18 px side inset and the `38–42px` display scale. The
  stage, collage and title are not globally reduced.
- Only two proof apertures are reduced: the Hero apron column is capped at 560 px on ultrawide screens and
  the phone MasterChef award uses a smaller bounded aperture. The Hero portrait uses an upward face-safe crop
  at ultrawide width; source pixels, caption, borders and photographic colour remain unchanged.
- The Hero spread must remain visually continuous across 1100/1101 px. Both sides of that breakpoint share
  compatible inset and height endpoints; no new composition begins there.
- Hero loading starts all 94 first-viewport mosaic cells eagerly. The identity portrait and first twelve
  cells are high-priority; the remaining cells are low-priority, and every mosaic image decodes
  asynchronously so it cannot synchronously block the first paint.
- Through 560 px, MasterChef biography text is at least 13 px with `1.5` leading and receives a full-width
  band below the title/proof pair. Route plates are at least 50 px in the 375–430 px range; country labels are
  at least 12 px. Format descriptions are at least 13 px with `1.5` leading.
- The header action arrow remains visible at all supported widths down to 375 px. The complete action keeps a
  44 px minimum target and may tighten spacing/letter-spacing only in the <=400 px rule.
- Phone personal-menu annotations use a taller square-to-portrait stage; top notes remain outside the plate,
  the sauce note remains below its leader, and all text stays at least 12 px.
- No palette, font family, card system, radius, shadow, gradient, generated imagery, icon library or motion
  rule is added by this amendment.
## Private-dinner mobile editorial-sheet amendment — 2026-09-10

This amendment supersedes only the phone rules in `Private-dinner seven-plate amendment`.

- Through 560 px, `Частный ужин` is one tall, single-surface editorial sheet with a thin outer `--rule`
  border. It is not the former `.92 / 1` near-square process field and not a reusable card.
- The decorative `01` is absent. A compact uppercase utility row reads `ЧАСТНЫЙ УЖИН` at left and
  `СЕМЬ ПОДАЧ` at right, followed by one restrained gold rule.
- The upper composition keeps live title and exact paragraph at left and the complete documentary portrait
  at right. The portrait is approximately half the usable width and may scale but must not be cropped,
  stretched or reduced to a thumbnail.
- A narrow centre seam uses a CSS hairline, two open endpoint dots and the vertical live label
  `ГОТОВИТ ШЕФ`. No SVG or meaningless construction line is permitted.
- One horizontal rule separates the upper pair from the menu sequence.
- The lower composition contains exactly seven course positions: four equal items in the first row and
  three equal items centred in the second. Every ceramic rim remains visible.
- Course labels are live HTML and use exactly: `Стартер`, `Холодная закуска`, `Горячая закуска`,
  `Рыбный курс`, `Освежающая пауза`, `Основное блюдо`, `Десерт`. They identify course roles only and
  must not be expanded into unverified dish claims.
- The representative course raster remains non-documentary and decorative; the seven labels form semantic
  ordered lists. The chef photograph retains its literal alternative text.
- Use the existing warm paper, ink, muted and gold tokens and current Cormorant/Montserrat roles. Labels
  remain at least 11 px. No radius, shadow, gradient, glass, texture, icon, animation or UI-library theme.
- The exact phone aspect ratio, copy/photo share and insets are reference-bounded fitting decisions. They
  must preserve the full composition at 430, 390 and 375 px without page overflow.
- Above 560 px the existing private-dinner geometry remains until a separate wider reference supersedes it.

## Personal-menu annotated plate amendment — 2026-09-10

This amendment supersedes the active personal-menu three-step sequence, sourcing-photo gallery, provenance
line, three shorthand annotations and `пример композиции блюда` caption. It does not alter any other page
chapter, navigation item, contact surface or global token.

- **Surface and container:** `#products` remains a warm editorial field using `#f7f4ef`, `--ink`, `--muted`,
  `--accent-small` and `--rule`. Content stays inside `--content` with the current responsive `--gutter`.
- **Typography:** display copy uses Cormorant Garamond; the gold italic lines use the same family through
  `--font-accent`; body copy and utility labels use Montserrat. Opening and detail body copy stay at 16 px or
  larger. Ingredient descriptions stay at least 14 px. Kicker roles retain uppercase tracking.
- **Opening rhythm:** kicker, two-line display title and exact paragraph form one left-led editorial block.
  One horizontal `--rule` divider separates it from the dish explanation. There is no process stepper.
- **Dish explanation:** above 700 px the title and paragraph occupy unequal columns separated by one vertical
  hairline. At 700 px and below they stack and the vertical line is removed. No card or alternate surface is
  introduced.
- **Plate stage:** the existing 1800 × 1665 alpha WebP is always rendered with `height: auto`; the full rim
  remains visible. Four-path wide, tablet and phone leader groups share the stage's `0 0 1200 820` coordinate
  system. SVG is decorative and contains no text.
- **Callouts:** four live HTML notes use italic Cormorant titles in `--accent-small` and Montserrat descriptions
  in `--muted`. No background, radius, border, number, icon or large marker. Leaders use `--accent-small`, a
  non-scaling stroke and small terminal dots backed by the section paper.
- **Wide geometry:** the complete plate occupies the centre while notes use the perimeter. The left and right
  title/description columns do not intersect leaders. Exact positions may vary only to keep each endpoint on
  the photographed ingredient at the current source aspect ratio.
- **Phone geometry:** through 620 px the plate stage becomes deliberately tall. Duck and vegetable notes sit
  above; sauce and purée sit below the large plate. All descriptions stay visible,
  there is no interaction-dependent disclosure and the page must not overflow horizontally.
- **Action:** a single square-edged `ОБСУДИТЬ МЕНЮ` anchor links to `#contact`. Above 620 px it is flanked by
  two thin rules; on phones the rules may be omitted to preserve the 44 px target and legible label.
- **States and motion:** preserve the global visible `:focus-visible` outline. Hover may darken the button
  background without movement or decorative animation; reduced-motion behavior remains unchanged.
- **Image limitation:** the approved source visibly contains duck, sauce, orange purée-like elements
  and a vegetable/mushroom garnish, but it does not exactly reproduce the screenshot's pale purée and roasted
  carrot arrangement. No ingredient pixels are generated or altered to hide that mismatch.
- **Anti-template boundary:** no gallery, numbered sequence, cards, badges, icons, gradient, glass, shadow,
  decorative background, FAQ, testimonial, extra CTA or replacement marketing copy is permitted.
- **Verification matrix:** visually check 1440, 1280, 1024, 768, 430, 390 and 375 px; the user's requested
  360 px check is additional. At each width confirm exact copy, four visible notes and leaders, endpoints,
  full plate rim, button focus, no overlap and no horizontal scroll.

### Closing-contact removal amendment — 2026-09-10

- Remove the bordered `.contact` field, its spoon reference image, duplicate action and all responsive
  layout overrides; do not leave an empty `#contact` target or compensate with decorative whitespace.
- The personal-menu action becomes the sole closing CTA and links directly to the established
  `https://www.instagram.com/evg.chef/` destination in a new tab with the existing accessible label pattern.
- Remove the duplicate footer `контакты` anchor. The footer keeps only the chef name and verified Instagram
  link in a two-column wide layout and a deliberate stacked compact layout.
- Preserve the existing square-edge button, focus-visible outline, hover state, paper palette, typography,
  minimum target size and reduced-motion behavior. No new breakpoint, asset, component or library is added.

### Personal-menu copy simplification amendment — 2026-09-10

- Keep one opening text column: `ПЕРСОНАЛЬНОЕ МЕНЮ`, the existing two-line title, the existing first paragraph,
  then the user's exact second paragraph beginning `Каждое блюдо — это комбинация`.
- Retire `.personal-menu-rule`, `.personal-menu-detail`, `.personal-menu-detail-heading` and
  `.personal-menu-detail-copy` from active markup and CSS. Do not retain their divider as decoration.
- Both explanatory paragraphs use the existing 16–20 px Montserrat lede role and the same readable measure;
  only a restrained content gap separates them. The plate composition and all later behavior remain unchanged.


## Masterclasses editorial section amendment — 2026-09-10

- This explicit user brief replaces only row 03's blueprint/photo-left design. Reuse the current `format-list` container and the approved `--paper`, `--paper-light`, `--ink`, `--muted`, `--rule`, `--accent-small`, `--font-display` (Cormorant Garamond) and `--font-sans` (Montserrat) tokens.
- A separate server-rendered `MasterclassesSection` uses normal document flow, two upper columns (copy then photo), a full-width six-stage scene and 1 px horizontal rules. It has no outer radius, card border, drop shadow, filtering, decorative icon, CTA or animation.
- The explicit `03` plus short rule is restored for this section only. The title uses the existing serif family, description the sans family, stage captions the serif family. Exact requested Russian wording remains live HTML.
- Reuse the approved 1144 × 770 masterclass photograph at its natural ratio; no face generation, recolouring, stretching or aggressive crop. One new text-free overhead scene uses a continuous light linen surface; labels are aligned to six equal subject positions, outside the image semantics but inside the same figure.
- Desktop/tablet preserve the upper two-column structure while space permits. Through 560 px copy precedes the complete photo. The continuous scene retains a readable intrinsic width in a native horizontal overflow region with six live ordered labels, a concise scroll hint and the existing visible focus style. No JavaScript or controls are necessary.
- Phone text must remain legible (description 15 px minimum; scene captions 18 px minimum); image dimensions reserve space during lazy loading. Alternative text describes image content; the representative scene identifies itself as an illustration of techniques, not event evidence. A failed image must leave the heading, copy, captions and accessible description available.
- Exact neutral fitting values will be recorded with visual results. Required widths: 1440, 1280, 1024, 768, 430, 390, 375 px. No unreferenced decorative decisions are introduced.


Masterclasses verified fitting values: header 1.1:1 with 24–56 px gap; vertical section/scene spacing 20–32 px; desktop title 38–60 px, body 16–25 px/1.5, captions 18–27 px/1.3. Through 560 px: 24 px section padding and header gap, 36–44 px title, 15 px/1.6 body, 900 px unbroken scene with 21 px captions. Live captions occupy the clear bottom linen at 5% inset. The section uses zero radii, no shadows and no animation. These values were visually checked at the complete seven-width matrix; see DESIGN_AUDIT.md for results and the existing Cloudflare typecheck limitation.


## Masterclasses same-paper amendment — 2026-09-10 follow-up

- The user's latest correction replaces the linen tabletop with actual transparent image background over the exact existing `--paper` surface. Keep ingredient/tool colours and the documentary photo unfiltered and at full opacity. No mix-blend or approximation of the background colour.
- Reuse private-event/private-dinner construction lines: square inset perimeter at 1.5%, content insets 3%, 1 px `--rule` rails above and below the upper pair, a lower rail after the technique scene, and a separator in the upper column gap. Lines are noninteractive and have no semantic content.
- Keep content in normal flow. On phones the copy/photo separator becomes horizontal within the existing single-column reading order. Do not divide the six technique groups into cards or break their continuous scroll.
- The original backdrop wording and no-perimeter rule in the prior masterclass amendment are superseded. Typography, section number, images' subject matter, captions, photo ratio and 560 px breakpoint remain unchanged.


Same-paper verification: the v2 lossless WebP has real alpha; clear background reveals the exact --paper token. The image edit used built-in image_gen, followed by alpha preparation of its flat backing; no CSS filter or blend mode is involved. Section vertical insets are 24–38 px, upper rail padding 16–22 px, inset frame 1.5%, content inset 3%; the separator uses the existing 24–56 px grid gap (24 px on phones). The seven required widths and keyboard scroll endpoint pass; all structure lines use --rule.

## Masterclasses mobile/web amendment — 2026-09-10

- Supersedes the previous phone scroller and 560 px breakpoint only. Above 700 px retain the existing two-column header and complete six-stage scene. At 700 px and below use copy, complete photograph, then two continuous three-stage strips. The 700 px boundary is already used for content-fitting elsewhere in the site and avoids the observed narrow columns at 561 px.
- Reuse the existing alpha WebP at its natural proportions through two CSS apertures split near x=1015/2071, in the clear space before the sauce bowl. No new image, cropping of individual subjects, recolouring, per-item panels or cards. Each active figure has meaningful alt text and an ordered caption list; the second compact list continues at 4.
- Preserve all existing tokens, wide type clamps, square 1.5% perimeter, 3% inset and 1 px rules. Compact header retains the 24 px gap and 36–44 px heading; use 15–16 px body copy and 18–22 px captions fitted to available width. Compact stage bands share the same paper and one horizontal divider.
- Remove the swipe hint and keyboard focus stop once the scene fits the viewport. CSS-hidden alternate layout must also leave the accessibility tree. No client state, new controls, library or animation.
- Verify 1440, 1280, 1024, 768, 430, 390 and 375 px, plus 560/561 and 700/701 px. Exact final crop and size values are recorded in DESIGN_AUDIT.md after visual inspection.
- Compact perimeter fitting: retain 1.5% side insets, but use 12 px vertically (half the existing 24 px section padding). A percentage of the much taller two-strip section can otherwise cross the upper rail near 700 px; this keeps the same frame outside the content rails at every compact width.


## Unified service-sheet contract — approved 2026-09-10

This contract supersedes ALL earlier service-specific geometry, title scale, numbering, photo-side and mobile exceptions for the three service sheets. Authority: user's `Делай` following the final unified mockups and direct smaller-canape / alternating-photo / shared-line corrections.

- Preserve --paper #f4efe5, --ink #0a0a0a, --muted #6e665a, --rule #c8c0b3 and --accent-small #72561f. Keep Cormorant Garamond for titles/captions and Montserrat for paragraphs. No new font, palette, shadow, radius, gradient or motion.
- One reusable normal-flow service sheet. Existing page container remains. Frame and rules are 1px; content padding fits the approved inset treatment, initially 16–32px. Services have natural, not forced-equal heights.
- Shared wide title initially clamp(36px,4.2vw,60px); shared description initially clamp(16px,1.55vw,22px) / 1.55. A long title wraps at the same size. Number and its short gold rule use the same style in all three services.
- Wide headers pair text and documentary photo, with photo on RIGHT / LEFT / RIGHT. A quiet gap contains a 1px gold spine with 6px hollow endpoints. Upper/lower rails and the supporting-image separator use --rule. No endpoint decorations at the perimeter corners.
- At <=700px, each service has its number and full-width title above the description/photo pair. Title initially clamp(28px,7.7vw,34px), body 15px / 1.55. Text and photo remain side-by-side with the approved alternating direction; row height follows its content. Titles, descriptions and photos must not collide at 375px or enlarged text.
- Seven courses remain 4+3 with complete plate rims and live labels. Labels share a serif role, initially clamp(12px,1.5vw,22px). Plate raster is representative illustration, not proof of an actual menu; no dish claims are added.
- Canapes retain the existing alpha source, full natural color and a reduced displayed scale with quiet gaps. Fit source-derived apertures without cards; never claim a fixed event quantity from the illustration.
- Six techniques retain the existing alpha scene. Wide: six across. Mobile: two unboxed groups of three with the existing live names. No scroll hint or extra focus stop.
- Documentary source files remain unchanged. Crops may fit the approved aperture but must preserve the chef identity and the event context. The first portrait may require a source-aware fit rather than imitating the generated mockup pixels.
- Existing global hover/focus states and >=44px action targets remain; these static service sheets introduce no new controls. No animation or library primitive is needed. Text and labels remain available if decorative media fail.
- Exact clamps, gaps and aperture coordinates are neutral fitting values subject to visual QA at 1440,1280,1024,768,430,390,375px, including heading wraps, loading, overflow and photo context. The final audit records any adjustment.

### Verified implementation values
The seven-plate source uses a white exterior and multiply blending instead of the planned alpha extraction; its soft mask is a functional source crop. Canapés use 24 source apertures: 8 columns wide / 6 compact, with image widths 67% / 84% of each cell. This keeps their scale below the plates and preserves breathing room. Techniques occupy 80% of the wide content field and 100% in the two compact rows. Wide documentary photos use 4:3 apertures; dinner crop focus is 50% 18%, event 57% 50%. At ≤700 px, photos occupy the side column with a minimum 210 px height and source-aware positioning. Russian paragraphs use automatic hyphenation with `hyphenate-limit-chars: 6 3 3` and a long-word fallback.

Shared type is identical across all three services at each measured width: 60/22 px at 1440; 53.76/19.84 at 1280; 43.008/16 at 1024; 36/16 at 768; 33.11/15 at 430; 30.03/15 at 390; 28.875/15 at 375 (heading/body). Captions remain live text. Muted copy has 4.94:1 contrast on paper; ink 17.28:1; small accent 5.98:1. All seven widths passed overflow and image-loading checks in Chrome. [Evidence](../artifacts/event-formats-implementation-2026-09-10/metrics.json).
# Style-inspection corrections — 2026-09-10

Follow-up from independent visual QA: place France/Greece captions above their plates on wide screens, reusing the existing mobile placement principle to avoid the raster route stroke. The wide France stop is fitted at 68% stage height so its caption also clears the award credit at 1280px; tablet/phone positions remain separately authored. Country labels use the existing 12px phone role; dish names have a 14px floor. No plate or map pixels change.

This latest amendment is authoritative for the following corrections requested after SITE_STYLE_AUDIT_2026-09-10.md. It supersedes incompatible earlier mobile geometry, hidden-dish, ingredient-copy and unconfirmed-itinerary clauses only.

- Preserve all approved paper/ink/accent/rule colors, Cormorant Garamond and Montserrat, square edges and existing hover/focus treatments. Preserve original photo pixels, Hero framing and 94-source inventory. No filter, new illustration, UI library, decorative effect or global restyle.
- Services keep the approved right/left/right documentary direction, shared heading/body roles and exact offers. At <=700px assign more of the upper pair to the text and reduce empty seams before reducing photographic context. Keep body >=15px and avoid automatic hyphenation of ordinary Russian words. Natural flow determines height; exact widths are fitted and measured at all seven widths.
- Biography kicker adopts the existing Montserrat 600, 11.2px, tracked accent-small role. The phone award image and title remain paired, followed by the biography in normal flow with a visible gap after the caption. Existing map artwork remains beneath that live copy; no text depends on a fixed percentage of map height.
- Without factual confirmation, describe the five-country illustration as a cuisine map, not the chef's itinerary. Only the established MasterChef win and current Cyprus services enter the concise biography. Five country/dish labels are preserved. On phone provide a compact, unboxed key using the home-story-day row principle, with readable existing text roles and no duplicate accessible content.
- Keep the four-note plate and source exactly as approved. Replace uncertain recipe claims with composition notes for main product, garnish, textures and sauce. Live text and alternative description must not assert berries, puree, seasoning or cooking methods that the source cannot verify. Leader geometry remains source-bound.
- Show Instagram by the existing header/menu actions using supporting typography. Keep the existing destination, accessible new-tab description, square button and minimum 44px target. Do not add another CTA or contact section.
- Exact responsive fitting and any practical limitations are recorded in STYLE_FIXES_2026-09-10.md after verification. The missing facts are handled by neutral copy, not by inventing the itinerary or recipe.

Verified fitting: mobile service text/photo 1.45:1, 8px gaps, 12px sheet inset, 15px/24px description, 190px minimum photo height. At 375/390/430px descriptions measure 175.2/184.0/207.7px; award-caption-to-body gap is 20px. Map country/dish key uses 12px Montserrat and 18px Cormorant. All seven widths passed overflow/image/text-overlap checks; independent checks covered 375/390/1280/1440. Hover/focus, reduced motion and blocked media were checked. Full results and limitations: [STYLE_FIXES_2026-09-10.md](STYLE_FIXES_2026-09-10.md).

## Image-coherence exploration — concept only, 2026-09-10

The requested visual mockup in `design/mockups/image-coherence-2026-09-10/` explores background joins and the existing drafting/caption treatment across different image types. It is **not approved or implemented** and changes no active token or interface contract.

- Reuse paper `#f4efe5`, light paper `#fcfaf5`, ink `#0a0a0a`, muted `#6e665a`, accent `#a0792e`, small accent `#72561f`, rule `#c8c0b3`, Cormorant Garamond and Montserrat. No new motif, font, decoration or UI-library styling is proposed.
- Preserve documentary source colours, faces, the complete approved 94-photo Hero, existing section order and the service-specific food arrangements. Coherence concerns the containing paper and existing annotations; it does not require one photographic treatment or a common object size across unrelated groups.
- Retain the final plate's current cold white. Neutral light is a future-photography guideline only; no recolouring or replacement of the present plate is proposed.
- Exact background masks, joins, spacing and caption fitting remain undecided pending review and implementation. The concept raster cannot replace source photographs or live text and sets no pixel-accurate implementation values.
- No browser verification at 1440, 1280, 1024, 768, 430, 390 or 375 px has been performed for this raster-only proposal. Existing production QA remains separate. A future implementation must undergo the full responsive and anti-template checks.

The concept README records the audited problem, traceable source files, preservation rules and pre-visualisation plan. These notes do not authorise publishing a redesign.

## Editorial reimagining — REJECTED, archive only, 2026-09-10

**Rejected by the user: «Фу, это ужас», followed by «Нет, пересобери мою идею».** The exploratory values and proposed component removals below are retained as history only. They are not active tokens, approved decisions or references for the next proposal. Do not continue the single-photo editorial replacement or its dark final spread. The approved production system is unchanged.

The user's **«Ты можешь делать любой макет, и убирать и добавлять в нем что хочешь, возможно он будет лучше»** authorises free recomposition of a new mockup. It removes the previous proposal's fixed-structure constraints only within `design/mockups/editorial-reimagining-2026-09-10/`. The active website tokens and contracts above remain unchanged.

- Brand continuity: reuse current paper `#f4efe5`, light paper `#fcfaf5`, ink `#0a0a0a`, muted `#6e665a`, accent `#a0792e`, small accent `#72561f`, rule `#c8c0b3`, Cormorant Garamond and Montserrat. No new active palette or typeface.
- Proposed media rule: one leading real chef/process frame, then a selected documentary sequence of work, dishes and people. The mockup may omit the full collage, drawn cuisine map, floating food scenes and plate leaders. Existing files remain untouched. The common language comes from selection, scale and context; no mandatory warm filter or generative replacement of original identity enters production.
- Proposed composition: asymmetric identity opening, concise factual proof, three open service chapters with content-specific image/text proportions, and a shorter personal-menu/process story. Warm flat paper and thin meaningful rules connect them; square edges, no shadows, stock cards, decorative grids, gradients or added motion.
- Proposed final surface: a single menu/contact spread may use current ink `#0a0a0a` as its background with light-paper text, following the approved Marrow inverse text/surface principle. This is a concept-only role inversion, not a new color token, a copied dark luxury theme or a change to the active site.
- Mobile intent: choose a source-aware crop, shorten simultaneous text/image competition, keep the identity and action readable, and present service meaning beside its corresponding photographic evidence in the reading sequence. Exact type scale, containers, grid, spacing and breakpoints remain undecided; a raster cannot establish responsive CSS values.
- Existing visible focus, semantic link labels and minimum 44px interaction targets remain the baseline for any later implementation. No new controls, state system or UI library is proposed. Hover, focus, loading/error handling and motion cannot be verified from a raster.

The [concept README](../design/mockups/editorial-reimagining-2026-09-10/README.md) records the sources, audit, plan, copy and risks. No browser QA at the seven required widths, implementation or publication is claimed for this proposal.

## Original Mise en place reassembled — proposal only, 2026-09-10

The current user request **«Нет, пересобери мою идею»** restores the approved original concept as the source for a new mockup in `design/mockups/mise-en-place-reassembled-2026-09-10/`. Preserve collage-frame identity, the drawn cuisine map and its plates, thin drafting service sheets, seven courses in 4+3, smaller canapés, six techniques, home film and the whole four-note plate. Do not use the rejected editorial boards as references.

Use the current paper/ink/muted-gold palette, Cormorant Garamond/Montserrat roles, thin rules, square edges, original photo colours, approved factual copy and known Instagram channel. Proposed changes concern image/text proportions, deliberate blank space, consistent paper joins and source-aware object scale within each group. They do not introduce a new photographic style, dark final section, photo-only service narrative, new illustration motif, UI library, decorative effect or animation.

Source-derived framing, precise type fitting, intervals and masks remain concept-only decisions. Existing active tokens are unchanged. The raster is not a production asset and has not undergone seven-width browser/state verification. The [new README](../design/mockups/mise-en-place-reassembled-2026-09-10/README.md) records the audit, references and plan.

## Mise en place — evening plan, proposal only, 2026-09-10

The user's **«Сделай получше идею, убери лишнее, добавь чего не хватает, нарисуй макет»** authorises a more substantial raster proposal in `design/mockups/mise-en-place-evening-plan-2026-09-10/`. Within this proposal, the previous fixed 94-photo, literal-geography and full-food-grid constraints may be reduced or transformed. This is not an active-system amendment, approval to implement, or publication instruction. Earlier generated proposal boards, including the rejected editorial direction, are not design sources.

- **Brand:** preserve paper `#f4efe5`, light paper `#fcfaf5`, ink `#0a0a0a`, muted `#6e665a`, main route `#a0792e`, small accent `#72561f`, rules `#c8c0b3`, Cormorant Garamond and Montserrat. Existing text-role hierarchy remains the baseline. No active color, font or size token is changed.
- **Hero:** retain the source-derived documentary collage frame, separate original chef portrait and existing identity heading. A curated 24-cell selection proposes larger, more legible frames in place of the 94-source density; this exact selection and geometry are not yet active. Preserve original photo color, identity and context. Add no global filter or replacement face.
- **Evidence and services:** fit the verified MasterChef archive as a small photo/copy proof below the Hero. The three existing services share one open drawing sheet with thin square rules, concise copy and small real photographs. At most one optional small source-derived food motif per format; omit the full repeated food grids. Do not create equal stock cards, fixed equal section heights, repeated large portraits, shadows or library styling.
- **Process language:** use the user's recorded process-first blueprint correction, not a subject illustration. One muted-gold causal route and fine graphite construction lines connect Conversation, Menu, Preparation and Evening. Meaningful existing hollow-node/guide grammar may express the stations; arbitrary icons, ornamental loops, literal Europe/car geography and generic four-card flowcharts are excluded. New stages or operational promises are not inferred from the art.
- **Integrated media:** the whole original personal-menu plate and its neutral Main product / Garnish / Textures / Sauce notes belong to the Menu station. One original home-film poster/still belongs to Preparation. Route and labels keep clear of food and text. The plate and workday film do not reappear in large independent chapters after the process. No exact recipe or original photo alteration is implied by the raster.
- **Inquiry:** preserve the current Instagram destination and familiar action language. A short first-message helper asks for date, guest count and format; it is an instruction, not a booking form or availability claim. No additional contact channel, guarantee, price or promotional banner is introduced.
- **Desktop and mobile:** desktop composes all four related stations in one drawing field with content-led scale. The separate phone board deliberately reroutes the sequence through wide readable text zones, an integrated whole-plate field and a source-aware preparation aperture. Service descriptions must not be squeezed into narrow equal photo/text columns. Raster dimensions do not establish CSS breakpoints.
- **Unspecified values and states:** exact container width, grid, spacing, font sizes, source-cell selection, aperture coordinates and breakpoints remain proposed or undecided. Existing square edges, thin borders, no-shadow/no-new-motion baseline, visible focus and minimum 44px action target apply to any future implementation. Hover/focus, loading, empty/error states, overflow and seven-width browser behavior are not verified by a raster. No UI library or new interactive component is required for this proposal.

The [evening-plan README](../design/mockups/mise-en-place-evening-plan-2026-09-10/README.md) records the audit, three substantive content replacements, traceable current sources, factual Russian copy, exact prompts and completed raster inspection. Separate desktop/mobile PNGs and `PROMPTS.md` are saved. The two proposed graphite conversation/guest illustrations use the existing process-first drawing language to explain actual service stages; they are not images of verified events or active production assets. Raster/source approximation and mobile-excerpt limitations are recorded separately from future browser QA. App code, source photographs, active design decisions and the published site remain unchanged.


## Шеф 4: карандашная типографика — 2026-09-11

Прямой новый запрос пользователя заменяет прежнюю пару Cormorant/Montserrat: Caveat 400–700 обслуживает весь текст, заголовки, выноски и кнопки. Файлы кириллицы/латиницы размещаются в public/fonts, font-display: swap. Без искусственного курсива и отрицательного трекинга. Читающий текст 20–22px, служебный 16–18px; заголовки сохраняют адаптивную шкалу с более свободным интерлиньяжем. Палитра и композиция сохраняются. План и результаты: PENCIL_FONT_2026-09-11.md.
