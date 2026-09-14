"use client";

import { useEffect, useRef, useState } from "react";
import "./menu-worktable.css";

/* eslint-disable @next/next/no-img-element -- the approved illustration has explicit local responsive sources */

export default function MenuWorktable() {
  const figureRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const suffix = attempt ? `?retry=${attempt}` : "";
  const source = (width: number) => `/media/menu/chef-planning/scene-${width}.webp${suffix}`;
  const loaded = () => setState("ready");
  const failed = () => setState("error");

  useEffect(() => {
    const image = figureRef.current?.querySelector("img");
    if (image?.complete) setState(image.naturalWidth ? "ready" : "error");
  }, []);

  return <figure ref={figureRef} className="menu-worktable" data-menu-visual data-ready={state === "ready"} data-state={state}>
    <div className="menu-worktable-picture">
      <img src={source(960)}
        srcSet={`${source(640)} 640w, ${source(960)} 960w, ${source(1536)} 1536w`}
        sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(620px, calc(90.5vw - 34px)), min(620px, calc(48.87vw - 34px))"
        width={1536} height={1024} loading="lazy" decoding="async"
        alt="Карандашный рисунок через плечо: Евгений составляет меню в тетради. На столе — пример расчёта на четыре порции, список продуктов, план подготовки и вопросы гостям."
        onLoad={loaded} onError={failed} />
    </div>
    {state === "error" && <div className="menu-worktable-error" role="alert">
      <p>Не удалось загрузить изображение.</p>
      <button onClick={() => { setState("loading"); setAttempt(value => value + 1); }}>Попробовать ещё раз</button>
    </div>}
  </figure>;
}
