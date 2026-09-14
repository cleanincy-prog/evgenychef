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
    } catch {
      if (attempt !== playAttempt.current) return;
      setFailed(Boolean(video.error));
    }
  }

  return <figure data-video-error={failed ? true : undefined} className="preparation-film">
    <div className="film-stage">
      <video id="story-documentary-video" ref={videoRef} muted loop playsInline preload="metadata"
        src="/media/chef-story-short-prep-2026-09-12.mp4"
        disablePictureInPicture disableRemotePlayback tabIndex={-1}
        poster={siteImages["film-poster"].src} aria-label="Домашний фильм: от подготовки ножей до подачи ужина"
        onError={() => setFailed(true)} onPlaying={() => setFailed(false)}>
        <track kind="captions" src="/media/chef-story-short-prep-2026-09-12.ru.vtt" srcLang="ru" label="Русские субтитры" />
        Ваш браузер не поддерживает видео.
      </video>
      {failed && <button className="film-retry" type="button" onClick={() => void playFilm()}>Повторить</button>}
    </div>
    {failed && <figcaption role="status">Видео не удалось загрузить. Попробуйте ещё раз.</figcaption>}
  </figure>;
}
