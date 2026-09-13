"use client";

import { useEffect, useRef, useState } from "react";
import "./menu-worktable.css";

/* eslint-disable @next/next/no-img-element -- the selected artwork has explicit local responsive sources */

export default function MenuWorktable() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const suffix = attempt ? `?retry=${attempt}` : "";
  const source = (width: number) => `/media/menu/worktable/menu-worktable-duck-${width}.webp${suffix}`;

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) setState(image.naturalWidth ? "ready" : "error");
  }, []);

  return <figure className="menu-worktable" data-menu-visual data-ready={state === "ready"} data-state={state}>
    <div className="menu-worktable-picture" aria-busy={state === "loading"}>
      <img ref={imageRef} src={source(960)}
        srcSet={`${source(640)} 640w, ${source(960)} 960w, ${source(1536)} 1536w`}
        sizes="(max-width: 620px) calc(100vw - 69px), (max-width: 900px) calc(90.5vw - 38px), min(960px, calc(90.5vw - 48px))"
        width={1536} height={1024} loading="lazy" decoding="async"
        alt="Раскрытый блокнот с меню и карандашными набросками подач. На краю блокнота — фотография утиной грудки на тёмном мазке соуса, с зеленью и оранжевыми акцентами. Рядом лимон, веточка и карандаш."
        onLoad={() => setState("ready")} onError={() => setState("error")} />
    </div>
    <figcaption className="menu-worktable-caption">
      <p><span className="menu-worktable-label">Пример меню</span>Гребешки · грибной велюте · утиная грудка · панна-котта с ягодами.</p>
      <a href="https://www.deuxave.com/menu/" target="_blank" rel="noopener noreferrer">Источник фото</a>
    </figcaption>
    {state === "error" && <div className="menu-worktable-error" role="alert">
      <p>Не удалось загрузить изображение.</p>
      <button onClick={() => { setState("loading"); setAttempt(value => value + 1); }}>Попробовать ещё раз</button>
    </div>}
  </figure>;
}
