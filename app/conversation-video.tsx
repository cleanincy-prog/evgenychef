"use client";

import { useEffect, useRef, useState } from "react";
import { useConversationPlayback } from "./conversation-playback";
import "./conversation-video.css";

const poster = "/media/web/conversation-video-2026-09-22-960.webp";

export default function ConversationVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useConversationPlayback(videoRef);
  useEffect(() => {
    // An initial network error may happen before React attaches its handlers.
    if (videoRef.current?.error) setFailed(true);
  }, []);

  function retry() {
    const video = videoRef.current;
    if (!video) return;
    setFailed(false);
    // Retry keeps the playback budget and visibility/reduced-motion rules.
    video.load();
  }

  return <figure className="process-illustration conversation-illustration conversation-film" data-video-error={failed ? true : undefined}>
    <div className="conversation-film-stage">
      <video id="conversation-video" ref={videoRef} width={1280} height={720}
        src="/media/conversation-playback-2026-09-22.mp4" poster={poster}
        muted playsInline preload="metadata"
        disablePictureInPicture disableRemotePlayback tabIndex={-1}
        aria-label="Карандашная анимация без звука: гостья просит паштет, тартар из говядины и утиную грудку, её пожелания появляются текстом. Евгений записывает их в блокнот."
        onError={() => setFailed(true)} onPlaying={() => setFailed(false)}>
        <track kind="captions" src="/media/conversation-2026-09-22.ru.vtt" srcLang="ru" label="Пожелания гостьи" />
        Гостья: «Хочу паштет, тартар из говядины, утиную грудку». Евгений записывает пожелания.
      </video>
      <div className="conversation-film-touch-shield" aria-hidden="true"
        onContextMenu={event => event.preventDefault()} />
      {failed && <>
        {/* eslint-disable-next-line @next/next/no-img-element -- local video fallback retains the exact approved frame */}
        <img className="conversation-film-poster" src={poster}
          srcSet="/media/web/conversation-video-2026-09-22-480.webp 480w, /media/web/conversation-video-2026-09-22-960.webp 960w"
          sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(63.35vw, 450px), (max-width: 1440px) min(36.64vw, 450px), min(31.25vw, 675px)"
          width={960} height={540} alt="Гостья обсуждает меню, Евгений записывает пожелания" />
        <button className="film-retry" type="button" onClick={retry} aria-label="Повторить загрузку видео знакомства">Повторить</button>
      </>}
    </div>
    {failed && <figcaption role="status">Видео не удалось загрузить. Попробуйте ещё раз.</figcaption>}
  </figure>;
}
