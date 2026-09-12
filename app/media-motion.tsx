"use client";

import { useEffect, type RefObject } from "react";

export function usePageMediaPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  visibleThreshold: number,
) {
  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    let manuallyPaused = false;
    let automaticPause = false;
    let disposed = false;

    const pause = () => {
      if (!video.paused) {
        automaticPause = true;
        video.pause();
      }
    };

    const syncPlayback = async () => {
      if (document.hidden || !isVisible) {
        pause();
        return;
      }
      if (reducedMotion.matches || manuallyPaused || video.ended || video.error) return;

      try {
        await video.play();
        if (disposed || document.hidden || !isVisible) pause();
      } catch {
        // Autoplay may be blocked: the poster and native controls stay usable.
      }
    };

    // Fetch the film before the visitor reaches it, without offscreen playback.
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      video.preload = "auto";
      // An initial source failure can precede hydration; retry once near the
      // viewport so loading and error events reach the mounted player.
      if (video.readyState === 0 && video.paused) video.load();
      preloadObserver.disconnect();
    }, { rootMargin: "800px 0px" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= visibleThreshold;
        void syncPlayback();
      },
      { threshold: [0, visibleThreshold, 0.8] },
    );

    const handleMotionChange = () => reducedMotion.matches ? pause() : void syncPlayback();
    const handleVisibility = () => { void syncPlayback(); };
    const handlePause = () => {
      if (!automaticPause && !video.ended) manuallyPaused = true;
      automaticPause = false;
    };
    const handlePlay = () => { manuallyPaused = false; };

    preloadObserver.observe(video);
    observer.observe(video);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibility);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      disposed = true;
      preloadObserver.disconnect();
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      pause();
    };
  }, [videoRef, visibleThreshold]);
}
