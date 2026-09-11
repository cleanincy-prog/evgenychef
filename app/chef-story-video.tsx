"use client";

import { useRef, useState } from "react";
import { siteImages } from "./site-images";

export default function ChefStoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempt = useRef(0);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  async function playFilm() {
    const video = videoRef.current;
    if (!video) return;
    const attempt = ++playAttempt.current;
    setFailed(false);
    setStarted(true);
    try {
      if (failed || video.error) video.load();
      await video.play();
      video.focus();
    } catch {
      if (attempt !== playAttempt.current) return;
      setStarted(false);
      setFailed(true);
    }
  }

  return <figure data-video-error={failed ? true : undefined} className={`preparation-film${started ? " is-playing" : ""}`}>
    <div className="film-stage">
      <video id="story-documentary-video" ref={videoRef} controls={started} muted playsInline preload="none" tabIndex={started ? 0 : -1}
        poster={siteImages["film-poster"].src} aria-label="Домашний фильм: от подготовки ножей до подачи ужина"
        onError={() => { setFailed(true); setStarted(false); }}>
        <source src="/media/chef-story-img-5399-no-grill.mp4" type="video/mp4" onError={() => { setFailed(true); setStarted(false); }} />
        <track kind="captions" src="/media/chef-story-img-5399-no-grill.ru.vtt" srcLang="ru" label="Русские субтитры" />
        Ваш браузер не поддерживает видео.
      </video>
      {!started && <button className="film-play" type="button" onClick={() => void playFilm()}><span aria-hidden="true">▷</span>{failed ? "Повторить" : "Смотреть фильм"}</button>}
    </div>
    <figcaption>{failed ? <span role="status">Видео не удалось загрузить. Попробуйте ещё раз.</span> : "Домашний фильм · подготовка к вечеру"}</figcaption>
  </figure>;
}
