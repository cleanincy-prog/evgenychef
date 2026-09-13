"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import artwork from "./menu-book-photos.json";
import { attachMenuMedia } from "./menu-book-media";
import "./menu-book.css";

const ingredients = [
  { name: "Осьминог", grams: 160, action: "Обжариваем подготовленные щупальца до золотистых краёв." },
  { name: "Вяленые томаты", grams: 25, action: "Вялим, чтобы вкус стал насыщеннее." },
  { name: "Оливки", grams: 25, action: "Маринуем с травами, чесноком и лимоном." },
  { name: "Томатный соус", grams: 60, action: "Увариваем до бархатистой текстуры." },
] as const;
const extras = [
  { name: "Зелень", grams: 5, action: "Добавляем свежей перед подачей." },
  { name: "Чеснок", grams: 3, action: "Измельчаем для маринада и соуса." },
  { name: "Оливковое масло", grams: 10, action: "Добавляем в маринад и при обжарке." },
  { name: "Лимонный сок", grams: 5, action: "Добавляем в маринад для свежести." },
  { name: "Соль", grams: 1, action: "Приправляем соус и осьминога." },
  { name: "Чёрный перец", grams: .2, action: "Свежемолотый, добавляем перед подачей." },
] as const;

function Amount({ grams }: { grams: number }) {
  return <span className="mb-amount" data-grams={grams}><span className="mb-quantity">{String(grams).replace(".", ",")}</span> г</span>;
}

function FoodArt({ partIndex }: { partIndex: number }) {
  const id = `menu-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const part = artwork.parts[partIndex];
  const [x, y, w, h] = part.photoRect;
  return <div className="mb-art" data-part={partIndex} style={{ "--art-ratio": `${w} / ${h}` } as CSSProperties}>
    <svg width="0" height="0" className="mb-defs" aria-hidden="true"><defs>
      <clipPath id={`${id}-clip`} clipPathUnits="objectBoundingBox"><path d={part.clipPath} clipRule="evenodd" /></clipPath>
    </defs></svg>
    <div className="mb-photo" style={{ clipPath: `url(#${id}-clip)` }}>
      <img src={artwork.photoSrc} srcSet={`${artwork.photoSrc} 960w, ${artwork.photoLargeSrc} ${artwork.photoSize[0]}w`}
        sizes={partIndex === 4 ? "(max-width: 620px) 660px, 820px" : "360px"}
        width={artwork.photoSize[0]} height={artwork.photoSize[1]} alt="" loading="lazy" decoding="async" draggable="false"
        style={{ width: `${artwork.photoSize[0] / w * 100}%`, height: `${artwork.photoSize[1] / h * 100}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} />
    </div>
  </div>;
}

export default function MenuBook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (rootRef.current) return attachMenuMedia(rootRef.current);
  }, []);
  return <div className="menu-book" ref={rootRef} data-ready="false">
    <div className="mb-toolbar"><p className="mb-menu-title">Меню вашего вечера</p></div>
    <p className="mb-status" role="status" aria-live="polite">Загружаю изображения…</p>
    <div className="mb-book" aria-label="Осьминог" aria-busy="false">
      <article className="mb-page" data-recipe="octopus" aria-labelledby={titleId}>
        <header className="mb-heading">
          <p className="mb-eyebrow">Вяленые томаты · оливки · зелень</p>
          <h4 id={titleId} className="mb-dish-title">Осьминог</h4>
          <p className="mb-portions">На <span className="mb-quantity">1</span> порцию · вес подготовленных продуктов</p>
        </header>
        <ol className="mb-ingredients" aria-label="Основные ингредиенты и приготовление">
          {ingredients.map(({ name, grams, action }, partIndex) => <li className="mb-ingredient" key={name}>
            <div className="mb-operation">
              <div className="mb-operation-heading"><h5>{name}</h5><Amount grams={grams} /></div>
              <p>{action}</p><svg className="mb-leader" viewBox="0 0 160 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 7Q83 9 157 4" /></svg>
            </div>
            <div className="mb-ingredient-art" aria-hidden="true"><FoodArt partIndex={partIndex} /></div>
          </li>)}
        </ol>
        <div className="mb-details">
          <p className="mb-eyebrow">Также в составе</p>
          <ol className="mb-extra-ingredients" aria-label="Дополнительные ингредиенты и приготовление">
            {extras.map(({ name, grams, action }) => <li className="mb-extra-ingredient" key={name}>
              <div className="mb-operation-heading"><h5>{name}</h5><Amount grams={grams} /></div><p>{action}</p>
            </li>)}
          </ol>
        </div>
        <div className="mb-assembly-cue" aria-hidden="true"><span>Готовая подача</span><svg viewBox="0 0 48 25"><path d="M2 3C27 0 37 9 38 23M38 23L30 16M38 23L44 14" /></svg></div>
        <figure className="mb-serving">
          <div className="mb-plate" role="img" aria-label="Осьминог: готовая подача на тарелке"><FoodArt partIndex={4} /></div>
          <figcaption>Осьминога укладываем на соус, добавляем томаты, маринованные оливки и свежую зелень.</figcaption>
        </figure>
        <footer className="mb-page-footer"><span>Евгений Гребеник</span><span className="mb-page-number">01</span></footer>
      </article>
    </div>
    <p className="mb-error" role="alert" hidden>Не удалось загрузить изображение. Состав и приготовление доступны. <button data-menu-retry>Попробовать ещё раз</button></p>
  </div>;
}
