"use client";

import { useRef } from "react";
import { usePageMediaPlayback } from "./media-motion";

export default function ChefStoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  usePageMediaPlayback(videoRef, 0.55);

  return (
    <video
      id="story-documentary-video"
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster="/media/chef-story-img-5399-poster.jpg"
      aria-label="Шеф готовит частный ужин — от подготовки до подачи"
    >
      <source
        src="/media/chef-story-img-5399-no-grill.mp4"
        type="video/mp4"
      />
      <track
        kind="captions"
        src="/media/chef-story-img-5399-no-grill.ru.vtt"
        srcLang="ru"
        label="Русские субтитры"
      />
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  );
}
