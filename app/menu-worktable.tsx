"use client";

import { useEffect, useRef, useState } from "react";
import ingredients from "./menu-worktable-ingredients.json";
import "./menu-worktable.css";

/* eslint-disable @next/next/no-img-element -- the selected artwork has explicit local responsive sources */

export default function MenuWorktable() {
  const figureRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const suffix = attempt ? `?retry=${attempt}` : "";
  const source = (width: number) => `/media/menu/worktable/photo-notebook-scene-${width}.webp${suffix}`;
  const loaded = () => setState(current => current === "error" ? current : "ready");
  const failed = () => setState("error");

  useEffect(() => {
    const images = Array.from(figureRef.current?.querySelectorAll("img") ?? []);
    if (images.some(image => image.complete && !image.naturalWidth)) setState("error");
    else if (images.some(image => image.complete && image.naturalWidth)) setState("ready");
  }, []);

  return <figure ref={figureRef} className="menu-worktable" data-menu-visual data-ready={state === "ready"} data-state={state}>
    <div className="notebook-scene" aria-busy={state === "loading"}>
      <div className="menu-worktable-picture">
        <img src={source(960)}
          srcSet={`${source(640)} 640w, ${source(960)} 960w, ${source(1440)} 1440w`}
          sizes="min(1120px, calc(90.5vw - 48px))"
          width={1440} height={1120} loading="lazy" decoding="async"
          alt="Вид сверху на раскрытую прошитую тетрадь и карандаш на светлом столе. Рядом рыба с овощами в глубокой кремовой тарелке с узкой кромкой."
          onLoad={loaded} onError={failed} />
      </div>
      <div className="notebook-pages">
        <div className="notebook-page notebook-description">
          <h4>Рыба с овощами</h4>
          <p className="notebook-introduction">Рыба с обжаренной кожей, овощами и мидиями. Зелёное пюре и соус объединяют подачу.</p>
          <p className="notebook-section-label">Ингредиенты</p>
          <ul className="notebook-ingredient-list">
            {ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
          </ul>
        </div>
        <div className="notebook-page notebook-photographs" aria-label="Фотографии ингредиентов">
          <div className="notebook-ingredient-photos">
            {ingredients.map(ingredient => <figure className={`notebook-ingredient notebook-ingredient-${ingredient.id}`} key={ingredient.id}>
              <img src={`${ingredient.src}${suffix}`} width={ingredient.width} height={ingredient.height}
                loading="lazy" decoding="async" alt={ingredient.name} onLoad={loaded} onError={failed} />
              <figcaption>{ingredient.name}</figcaption>
            </figure>)}
          </div>
        </div>
      </div>
    </div>
    <figcaption className="menu-worktable-caption">
      <p><span className="menu-worktable-label">Рыба с овощами</span>Пример подачи для вашего вечера.</p>
      <div className="notebook-photo-links">
        <a href="/media/menu/worktable/fish-photo-provided-2026-09-14.png" target="_blank" rel="noopener noreferrer">Фото блюда</a>
        <a href="/media/menu/worktable/fish-notebook-credits.html">Источники фотографий</a>
      </div>
    </figcaption>
    <p className="notebook-photo-attribution">Фото томатов: Luc Viatour / Lucnix.be. Керамика: Alorin.</p>
    {state === "error" && <div className="menu-worktable-error" role="alert">
      <p>Не удалось загрузить изображение.</p>
      <button onClick={() => { setState("loading"); setAttempt(value => value + 1); }}>Попробовать ещё раз</button>
    </div>}
  </figure>;
}
