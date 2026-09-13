"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import artwork from "./menu-book-art.json";
import lineArtwork from "./menu-book-lines.json";
import { attachMenuAnimation } from "./menu-book-animation";
import "./menu-book.css";

const recipes = [
  { key: "duck", name: "Утиная грудка", short: "Утка", subtitle: "Сельдерей · морковь · соус",
    parts: [["Утиная грудка", "Обжариваем до румяной, хрустящей кожи."], ["Сельдерей", "Готовим нежное, гладкое пюре."], ["Морковь и зелень", "Морковь запекаем и глазируем. Зелень оставляем свежей."], ["Соус", "Увариваем до насыщенного вкуса."]],
    finish: "На пюре выкладываем утку, добавляем морковь, зелень и завершаем подачу соусом." },
  { key: "octopus", name: "Осьминог", short: "Осьминог", subtitle: "Вяленые томаты · оливки · зелень",
    parts: [["Осьминог", "Обжариваем до золотистых краёв."], ["Томаты", "Вялим, чтобы вкус стал насыщеннее."], ["Оливки и зелень", "Оливки маринуем с травами. Добавляем свежую зелень."], ["Томатный соус", "Увариваем до бархатистой текстуры."]],
    finish: "Осьминога укладываем на соус, добавляем томаты, маринованные оливки и свежую зелень." },
  { key: "lamb", name: "Каре ягнёнка", short: "Каре ягнёнка", subtitle: "Розмарин · корнеплоды · мясной соус",
    parts: [["Каре ягнёнка", "Обжариваем и доводим в духовке."], ["Розмарин", "Ароматизируем мясо при приготовлении."], ["Корнеплоды", "Запекаем до золотистого края."], ["Мясной соус", "Увариваем, чтобы подчеркнуть вкус ягнёнка."]],
    finish: "Подаём каре с запечёнными корнеплодами, розмарином и глянцевым мясным соусом." },
] as const;
type Recipe = typeof recipes[number];
type FoodKey = Recipe["key"];

function subscribeCompact(callback: () => void) {
  const media = window.matchMedia("(max-width: 900px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const compactSnapshot = () => window.matchMedia("(max-width: 900px)").matches;

function FoodArt({ recipe, partIndex }: { recipe: FoodKey; partIndex: number }) {
  const id = `menu-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const source = recipe === "duck" && (partIndex === 0 || partIndex === 4) ? "duckOriginal" : recipe;
  const asset = artwork[source];
  const part = asset.parts[partIndex];
  const strokes = lineArtwork[source][partIndex];
  const [x, y, w, h] = part.photoRect;
  return <div className="mb-art" data-part={partIndex} style={{ "--art-ratio": `${w} / ${h}` } as CSSProperties}>
    <svg width="0" height="0" className="mb-defs" aria-hidden="true"><defs>
      <clipPath id={`${id}-clip`} clipPathUnits="objectBoundingBox"><path d={part.clipPath} clipRule="evenodd" /></clipPath>
      <clipPath id={`${id}-pencil-clip`} clipPathUnits="objectBoundingBox"><path d={part.pencilClipPath} clipRule="evenodd" /></clipPath>
    </defs></svg>
    <div className="mb-photo" style={{ clipPath: `url(#${id}-clip)` }}>
      <img src={asset.photoSrc} srcSet={`${asset.photoSrc} 960w, ${asset.photoLargeSrc} ${asset.photoSize[0]}w`}
        sizes={partIndex === 4 ? "(max-width: 620px) 660px, 820px" : "360px"}
        width={asset.photoSize[0]} height={asset.photoSize[1]} alt="" loading="lazy" decoding="async" draggable="false"
        style={{ width: `${asset.photoSize[0] / w * 100}%`, height: `${asset.photoSize[1] / h * 100}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} />
    </div>
    <svg className="mb-pencil" viewBox={`0 0 ${w} ${h}`} style={{ clipPath: `url(#${id}-pencil-clip)` }} aria-hidden="true">
      {strokes.map((stroke, line) => <path key={line} className="mb-stroke" pathLength="1" d={stroke.d}
        style={{ "--stroke-start": stroke.start, "--stroke-speed": stroke.speed } as CSSProperties} />)}
    </svg>
  </div>;
}

function RecipePage({ recipe, index }: { recipe: Recipe; index: number }) {
  const titleId = useId();
  return <article className="mb-page" data-recipe={recipe.key} aria-labelledby={titleId}>
    <header className="mb-heading"><p className="mb-eyebrow">{recipe.subtitle}</p><h4 id={titleId} className="mb-dish-title" tabIndex={-1}>{recipe.name}</h4></header>
    <ol className="mb-ingredients" aria-label="Ингредиенты и приготовление">
      {recipe.parts.map(([name, action], partIndex) => <li className="mb-ingredient" key={name}>
        <div className="mb-operation"><h5>{name}</h5><p>{action}</p><svg className="mb-leader" viewBox="0 0 160 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 7Q83 9 157 4" /></svg></div>
        <div className="mb-ingredient-art" aria-hidden="true"><FoodArt recipe={recipe.key} partIndex={partIndex} /></div>
      </li>)}
    </ol>
    <div className="mb-assembly-cue" aria-hidden="true"><span>Готовая подача</span><svg viewBox="0 0 48 25"><path d="M2 3C27 0 37 9 38 23M38 23L30 16M38 23L44 14" pathLength="1" /></svg></div>
    <figure className="mb-serving"><div className="mb-plate" role="img" aria-label={`${recipe.name}: готовая подача на тарелке`}><FoodArt recipe={recipe.key} partIndex={4} /></div><figcaption>{recipe.finish}</figcaption></figure>
    <footer className="mb-page-footer"><span>Евгений Гребеник</span><span className="mb-page-number">{String(index + 1).padStart(2, "0")}</span></footer>
  </article>;
}

function MenuSpread({ first, compact, focusOnMount, navigate }: { first: number; compact: boolean; focusOnMount: boolean; navigate: (direction: number) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = compact ? 1 : 2;
  const visible = recipes.slice(first, first + count);
  useEffect(() => {
    if (!rootRef.current) return;
    return attachMenuAnimation(rootRef.current, focusOnMount);
  }, [focusOnMount]);
  return <div className="menu-book" ref={rootRef} data-state="sketch" data-mode="scroll" data-ready="false">
    <div className="mb-toolbar"><p className="mb-menu-title">Меню вашего вечера</p><div className="mb-controls">
      <button className="mb-quiet" data-menu-scroll aria-pressed="true" disabled>По скроллу</button>
      <button className="mb-play" data-menu-color aria-pressed="false" disabled>Цветная подача</button>
    </div></div>
    <p className="mb-status" role="status" aria-live="polite">Готовлю страницы…</p>
    <div className="mb-book" aria-label={visible.map(recipe => recipe.name).join(" и ")} aria-busy="true">
      {visible.map((recipe, i) => <RecipePage key={recipe.key} recipe={recipe} index={first + i} />)}
    </div>
    <p className="mb-error" role="alert" hidden>Не удалось загрузить изображение. <button data-menu-retry>Попробовать ещё раз</button></p>
    <nav className="mb-navigation" aria-label="Страницы меню">
      <button className="mb-page-turn" data-menu-previous disabled={first === 0} onClick={() => navigate(-1)}><span aria-hidden="true">←</span> {first > 0 ? recipes[first - 1].short : "Назад"}</button>
      <span className="mb-page-range" aria-live="polite">{compact ? `${String(first + 1).padStart(2, "0")} / 03` : `${String(first + 1).padStart(2, "0")}–${String(first + 2).padStart(2, "0")} / 03`}</span>
      <button className="mb-page-turn" data-menu-next disabled={first + count >= recipes.length} onClick={() => navigate(1)}>{first + count < recipes.length ? recipes[first + count].short : "Далее"} <span aria-hidden="true">→</span></button>
    </nav>
    <div className="mb-bottom"><p>У каждого блюда — свой путь к вашему столу.</p><button className="mb-quiet" data-menu-sketch aria-pressed="false" disabled>Карандашный эскиз</button></div>
    <noscript><style>{".menu-book .mb-stroke{stroke-dashoffset:0}"}</style><p>Ингредиенты и готовые блюда доступны без анимации. Для перелистывания меню включите JavaScript.</p></noscript>
  </div>;
}

export default function MenuBook() {
  const compact = useSyncExternalStore(subscribeCompact, compactSnapshot, () => false);
  const [view, setView] = useState({ first: 0, turn: 0 });
  const first = Math.min(view.first, recipes.length - (compact ? 1 : 2));
  return <MenuSpread key={`${first}-${compact}`} first={first} compact={compact} focusOnMount={view.turn > 0}
    navigate={direction => setView({ first: first + direction, turn: view.turn + 1 })} />;
}
