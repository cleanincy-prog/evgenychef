# Задача: заменить шрифтовую систему сайта evgenychef.com на Oranienbaum

Персональный сайт частного шефа (Кипр), русский язык, Next.js со статическим экспортом.
Меняем только типографику. Разметку, цвета, копирайтинг, анимации и структуру секций
НЕ трогать.

## Что сейчас

Все три CSS-переменные ведут на одну гарнитуру:

    --font-pencil: "Bellota Text", "Trebuchet MS", sans-serif;
    --font-sans:   var(--font-pencil);
    --font-display: var(--font-pencil);

Bellota вшита base64 двумя @font-face (кириллица + латиница), оба вес 400,
font-display: block. Начертаний 500/600 и курсива нет. var(--font-display)
используется только в правиле h1,h2,h3. Палитра (не менять): --paper #f4efe5,
--ink #0a0a0a, --muted #6e665a, --gold #a0792e, --gold-text #72561f, --rule #c8c0b3.

## Целевая система

- Oranienbaum — логотип, h1, h2, h3, названия блюд. Дисплейная, одно начертание.
- Ysabeau Office — весь текст, интерфейс, вопросы FAQ, курсивные акценты. 400/500/600 + курсив.
- PT Mono — все числа: номера подач и шагов, цены, гости, часы, километры.
- Caveat — опционально, рукописные пометки, 1-2 строки на страницу.

## 1. Переменные

    :root{
      --font-display: 'Oranienbaum', Georgia, 'Times New Roman', serif;
      --font-sans:    'Ysabeau Office', system-ui, -apple-system, sans-serif;
      --font-mono:    'PT Mono', ui-monospace, Menlo, monospace;
      --font-pencil:  'Caveat', cursive;
    }

--font-sans и --font-display больше не ссылаются на --font-pencil.

## 2. Роли

    body       { font: 400 16.5px/1.62 var(--font-sans); }
    .wordmark  { font: 400 19px/1 var(--font-display);
                 letter-spacing: .22em; text-transform: uppercase; }
    h1         { font: 400 clamp(34px, 5vw, 52px)/1.02 var(--font-display); }
    h2         { font: 400 clamp(26px, 3.4vw, 38px)/1.1 var(--font-display); }
    h3, .dish  { font: 400 clamp(19px, 1.5vw, 20px)/1.3 var(--font-display);
                 color: var(--ink); }
    .faq-q     { font: 600 18px/1.35 var(--font-sans); }
    .label     { font: 500 13px/1.35 var(--font-sans); letter-spacing: .02em; }
    .num, .price, .spec {
      font: 400 13px/1.5 var(--font-mono);
      font-variant-numeric: tabular-nums lining-nums;
    }
    em, .accent{ font-family: var(--font-sans); font-style: italic; }
    .pencil    { font: 400 23px/1.25 var(--font-pencil); color: var(--gold-text); }

Трекинг дисплейных ролей — ровно ноль. Отрицательный не ставить: Oranienbaum узкая
и плотная, минус слепляет ей засечки.

Сейчас body 18px/1.45 на Bellota. Ставим 16.5px/1.62 — у Ysabeau Office крупнее очко,
мельче не станет.

.station-number сейчас 27px: перевести на --font-mono и поставить 22px с трекингом
.04em (моноширинный при равном кегле выглядит крупнее пропорционального).

## 3. Две обязательные строки

    /* В заголовках есть внутренние span (в h1 — золотая строка «ваш личный»).
       Правило для span перебивает правило для h1, и заголовок остаётся гротеском. */
    h1 *, h2 *, h3 *, h4 * { font-family: inherit; }

    /* Страховка от поддельных начертаний — у Oranienbaum их физически нет */
    h1, h2, h3, .dish, .wordmark { font-weight: 400; font-style: normal; }

## 4. Жёсткие ограничения Oranienbaum (проверены отрисовкой)

- НИЖЕ 19px этой гарнитурой не набирать ничего. Ниже — только Ysabeau Office.
  Абзацы, списки, микрокопию, подписи — никогда Oranienbaum.
- Курсива нет. Все курсивные акценты («вишня на красном вине», «на один укус») —
  курсив Ysabeau Office. font-style: italic на Oranienbaum запрещён.
- Полужирного нет. Единственное место с весом 600 на всём сайте — вопросы FAQ,
  Ysabeau Office. font-weight > 400 на Oranienbaum запрещён.
- Цвет дисплейного текста — только var(--ink). var(--muted) на Oranienbaum запрещён:
  тонкие штрихи на тёплой бумаге #f4efe5 выцветают. Золото допустимо только
  на акцентной строке крупным кеглем.
- Цифры у Oranienbaum пропорциональные («1» почти вдвое уже «0»). Любые числа,
  которые стоят в колонку или сравниваются, — только PT Mono с tabular-nums.
- Прописные: латиница и короткие лейблы до двух слов — можно (гарнитура узкая,
  «ЧАСТНЫЙ УЖИН» с трекингом .12em читается). Длинные русские строки прописными — нет.

## 5. Подключение

Отказаться от base64-инлайна: .woff2 в public/fonts, @font-face с font-display: swap
(сейчас block), <link rel="preload"> для двух файлов первого экрана — Oranienbaum
и Ysabeau Office 400, оба кириллица.

Файлы: Oranienbaum 400 · Ysabeau Office 400/500/600 + 400 italic · PT Mono 400
· Caveat 400 (если оставляем пометки). Каждый — два подмножества через unicode-range.

    pyftsubset Oranienbaum-Regular.ttf \
      --unicodes="U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116" \
      --layout-features="kern,liga,locl" \
      --flavor=woff2 --output-file=public/fonts/oranienbaum-cyrillic.woff2

Латиница: --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,
U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

Bellota Text и её base64-блоки удалить полностью.

## 6. Проверка

1. Собрать, открыть при 1440×900 и 375×812.
2. getComputedStyle(document.querySelector('h1')).fontFamily содержит Oranienbaum —
   и то же для внутренних span заголовка.
3. Rendered Fonts в DevTools: нигде нет синтетической жирности и синтетического наклона.
4. Ни один элемент с Oranienbaum не имеет font-size меньше 19px — проверить скриптом:
   [...document.querySelectorAll('*')].filter(el => {
     const s = getComputedStyle(el);
     return s.fontFamily.includes('Oranienbaum') && parseFloat(s.fontSize) < 19;
   })
   Массив должен быть пустым.
5. Цены в трёх форматах выровнены по вертикали.
6. Подгружаются оба подмножества, кириллица не падает на fallback.

## Опционально, отдельным коммитом

В логотипе «Evgen Grebenik», в домене и нике — «evgeny». Свести к «Evgeny Grebenik».