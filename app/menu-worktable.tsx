"use client";

import { useRef, useState } from "react";
import { usePageMediaPlayback } from "./media-motion";
import "./menu-worktable.css";

/* eslint-disable @next/next/no-img-element -- the approved illustration has explicit local responsive sources */

export default function MenuWorktable() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const poster = "/media/web/menu-planning-video-2026-09-22-1280.webp";
  const posterImage = <img className="menu-worktable-poster" src={poster}
    srcSet="/media/web/menu-planning-video-2026-09-22-480.webp 480w, /media/web/menu-planning-video-2026-09-22-960.webp 960w, /media/web/menu-planning-video-2026-09-22-1280.webp 1280w"
    sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(620px, calc(90.5vw - 34px)), (max-width: 1440px) min(620px, calc(48.87vw - 34px)), min(43.06vw, 930px)"
    width={1280} height={720} alt="Евгений составляет меню в тетради, рядом лежат листы с расчётом и порядком подачи." />;
  usePageMediaPlayback(videoRef);

  function retry() {
    if (!videoRef.current) return;
    setState("loading");
    // canplay resumes through the existing visibility/reduced-motion hook.
    videoRef.current.load();
  }

  return <figure className="menu-worktable" data-menu-visual data-ready={state === "ready"} data-state={state}>
    <div className="menu-worktable-picture">
      <video id="menu-planning-video" ref={videoRef} width={1280} height={720}
        src="/media/menu-planning-smooth-2026-09-22.mp4" poster={poster}
        muted loop playsInline preload="metadata"
        disablePictureInPicture disableRemotePlayback tabIndex={-1}
        aria-label="Карандашная анимация без звука: Евгений составляет меню в тетради. В записях — утка с пюре из фенхеля и батата, пак-чой, шиитаке, эдамаме, соус с юдзу и чипсы; пример расчёта на 12 человек, подготовка и порядок подачи."
        onLoadedData={() => setState("ready")} onPlaying={() => setState("ready")} onError={() => setState("error")}>
        <track kind="descriptions" src="/media/menu-planning-2026-09-22.ru.vtt" srcLang="ru" label="Описание работы над меню" />
        Евгений составляет меню в тетради: утка с овощами и соусом с юдзу, пример расчёта на 12 человек.
      </video>
      {state === "error" && posterImage}
      <noscript>
        <style>{".menu-worktable video { visibility: hidden; }"}</style>
        {posterImage}
      </noscript>
    </div>
    {state === "error" && <div className="menu-worktable-error" role="alert">
      <p>Не удалось загрузить видео.</p>
      <button type="button" onClick={retry} aria-label="Повторить загрузку видео работы над меню">Попробовать ещё раз</button>
    </div>}
  </figure>;
}
