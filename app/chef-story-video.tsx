"use client";

import { useRef, useState } from "react";
import { usePageMediaPlayback } from "./media-motion";
import { siteImages } from "./site-images";

export default function ChefStoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempt = useRef(0);
  const [failed, setFailed] = useState(false);
  usePageMediaPlayback(videoRef);

  async function playFilm() {
    const video = videoRef.current;
    if (!video) return;
    const attempt = ++playAttempt.current;
    setFailed(false);
    try {
      if (failed || video.error) video.load();
      await video.play();
      video.focus();
    } catch {
      if (attempt !== playAttempt.current) return;
      setFailed(Boolean(video.error));
    }
  }

  return <figure data-video-error={failed ? true : undefined} className="preparation-film">
    <div className="film-stage">
      <video id="story-documentary-video" ref={videoRef} controls muted playsInline preload="metadata"
        poster={siteImages["film-poster"].src} aria-label="Домашний фильм: от подготовки ножей до подачи ужина"
        onError={() => setFailed(true)} onPlaying={() => setFailed(false)}>
        <source src="/media/chef-story-short-prep-2026-09-12.mp4" type="video/mp4" onError={() => setFailed(true)} />
        <track kind="captions" src="/media/chef-story-short-prep-2026-09-12.ru.vtt" srcLang="ru" label="Русские субтитры" />
        Ваш браузер не поддерживает видео.
      </video>
      {failed && <button className="film-retry" type="button" onClick={() => void playFilm()}>Повторить</button>}
    </div>
    <figcaption>{failed ? <span role="status">Видео не удалось загрузить. Попробуйте ещё раз.</span> : "До того, как гости сядут за стол"}</figcaption>
  </figure>;
}
