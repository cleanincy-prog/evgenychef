# Задача: сверстать блоки «Меню», «Форматы» и FAQ на evgenychef.com

Предполагается, что три гарнитуры уже подключены и переменные объявлены:
--font-display: 'Oranienbaum'  --font-sans: 'Ysabeau Office'  --font-mono: 'PT Mono'
Если нет — сначала выполнить задачу по замене шрифтовой системы, этот блок её продолжает.

Цвета берутся из существующей палитры сайта, новых не вводить:
--paper #f4efe5 · --ink #0a0a0a · --muted #6e665a · --gold-text #72561f · --rule #c8c0b3

## Роли гарнитур в этих блоках

Oranienbaum  — заголовок секции, названия блюд, названия форматов. Только это.
Ysabeau Office — описания блюд, курсивные акценты, вопросы и ответы FAQ.
PT Mono      — номера подач, все спецификации с числами, цены.

Ни одна из трёх не заходит на чужую роль. Внутри одной строки гарнитуры меняются
(«Утка сухого вызревания» — Oranienbaum, «· пюре из печёного сельдерея» — Ysabeau) —
это намеренно, так строка получает два уровня без смены кегля.

## Меню

Структура строки: номер подачи, название блюда, сопровождение, акцент курсивом.

    <div class="dish">
      <span class="dish-num">01</span>
      <span class="dish-body">
        <span class="dish-name">Приветственная подача</span>
        <span class="dish-sub">· гребешок · огурец · укроп · <em>на один укус</em></span>
      </span>
    </div>

    .dish      { display: grid; grid-template-columns: auto 1fr; gap: 14px;
                 padding: 10px 0; border-bottom: 1px dotted var(--rule); }
    .dish-num  { font: 400 13px/1.5 var(--font-mono); letter-spacing: .02em;
                 color: var(--gold-text);
                 font-variant-numeric: tabular-nums lining-nums; }
    .dish-name { font: 400 20px/1.3 var(--font-display); color: var(--ink); }
    .dish-sub  { font: 400 15px/1.5 var(--font-sans); color: var(--muted); }
    .dish-sub em { font-style: italic; }   /* курсив настоящий, у Ysabeau он есть */

Заголовок секции:

    .menu-title { font: 400 clamp(26px, 3.4vw, 38px)/1.1 var(--font-display);
                  margin: 0 0 12px; }

## Форматы

    <div class="fmt">
      <div class="fmt-name">Частный ужин</div>
      <div class="fmt-spec">
        <span>2–12 гостей</span><span>3–4 часа</span><span>дом или вилла</span>
        <b>от €180 с гостя</b>
      </div>
    </div>

    .fmt      { border-top: 1px solid var(--rule); padding-top: 11px; margin-top: 14px; }
    .fmt-name { font: 400 20px/1.3 var(--font-display); color: var(--ink); }
    .fmt-spec { display: flex; flex-wrap: wrap; gap: 4px 18px; margin-top: 4px;
                font: 400 13px/1.5 var(--font-mono); letter-spacing: .02em;
                color: var(--muted);
                font-variant-numeric: tabular-nums lining-nums; }
    .fmt-spec b { font-weight: inherit; color: var(--gold-text); }

Расстояние между элементами спецификации задаётся gap, а не пробелами и не &nbsp;.
Цена всегда последняя и всегда золотом — по ней глаз ищет строку.

## FAQ

    .faq-q { font: 600 18px/1.35 var(--font-sans); margin: 0 0 4px; }
    .faq-a { font: 400 16.5px/1.62 var(--font-sans); color: var(--muted);
             margin: 0 0 16px; max-width: 52ch; }

Вес 600 здесь — единственное полужирное начертание на всей странице. Больше нигде
font-weight выше 400 не ставить.

## Мобильная версия — не стакинг, а пересборка

@media (max-width: 760px):

1. Строка меню распадается на две. Название блюда остаётся на первой строке
   (19px, не меньше), сопровождение уходит на вторую (14.5px, --muted).
   Ведущая точка-разделитель перед сопровождением убирается — на второй строке
   она бессмысленна. Реализовать сменой .dish-sub на display:block и
   удалением ведущего «· » (отдельный span с классом .sep, скрываемый в медиазапросе).

2. Спецификация форматов из строки становится сеткой 2×2:
   .fmt-spec { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; }
   Так три формата остаются сравнимыми при вертикальной прокрутке, когда их
   нельзя увидеть одновременно.

3. Интерлиньяж ответов FAQ 1.62 → 1.70, кегль не уменьшается.

## Ловушки

- Oranienbaum ниже 19px не опускать нигде, включая мобильную версию.
- У Oranienbaum нет ни курсива, ни полужирного. font-style: italic и font-weight > 400
  на .dish-name, .fmt-name и .menu-title запрещены — браузер подделает.
- У Oranienbaum пропорциональные цифры, поэтому номера подач и цены только PT Mono
  с tabular-nums, иначе колонки не выровняются.
- Цвет Oranienbaum — только var(--ink). var(--muted) на ней недопустим:
  тонкие штрихи выцветают на тёплой бумаге.
- Трекинг у Oranienbaum ноль. Отрицательный слепляет засечки.
- Если заголовки содержат вложенные span, добавить h1 *, h2 *, h3 * { font-family: inherit }
  — иначе правило для span перебьёт правило для заголовка.

## Проверка

1. При 1440 и 375 открыть оба блока.
2. Rendered Fonts в DevTools: на .dish-name и .fmt-name — Oranienbaum Regular,
   без синтетических начертаний.
3. Цены трёх форматов выровнены по вертикали друг под другом.
4. Скриптом убедиться, что Oranienbaum нигде не мельче 19px:
   [...document.querySelectorAll('*')].filter(el => {
     const s = getComputedStyle(el);
     return s.fontFamily.includes('Oranienbaum') && parseFloat(s.fontSize) < 19;
   })
   Должен вернуть пустой массив.