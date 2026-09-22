"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useConversationPlayback(videoRef: RefObject<HTMLVideoElement | null>) {
  // Keep the budget across visibility changes and reload attempts.
  const completedPlays = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let reachedStart = false;
    let disposed = false;
    let playPending = false;

    const mayPlay = () => !disposed && visible && reachedStart &&
      !document.hidden && !reducedMotion.matches && completedPlays.current < 2;

    const syncPlayback = async () => {
      if (!mayPlay()) {
        if (!video.paused) video.pause();
        return;
      }
      if (video.error || !video.paused || playPending || video.readyState < 3) return;

      // Start with a small buffer rather than playing the very first packet.
      const remaining = video.duration - video.currentTime;
      const needed = Math.min(2, remaining);
      let bufferedAhead = 0;
      for (let i = 0; i < video.buffered.length; i += 1) {
        if (video.buffered.start(i) <= video.currentTime + .05 &&
          video.buffered.end(i) > video.currentTime) {
          bufferedAhead = video.buffered.end(i) - video.currentTime;
          break;
        }
      }
      // Browsers may stop preloading once they judge the connection fast
      // enough (HAVE_ENOUGH_DATA). Do not wait for bytes they won't request
      // until playback actually begins.
      if (video.readyState < 4 && video.networkState === 2 && bufferedAhead + .05 < needed) return;

      playPending = true;
      try {
        await video.play();
        // Scrolling away can race the asynchronous play request.
        if (!mayPlay()) video.pause();
      } catch {
        // Retain the poster when autoplay is blocked; a gesture can retry.
      } finally {
        playPending = false;
      }
    };

    const handleEnded = () => {
      completedPlays.current += 1;
      if (completedPlays.current >= 2) return; // Hold the final frame.
      video.currentTime = 0;
      void syncPlayback();
    };

    // Visibility changes are observed without measuring layout on every scroll.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0;
      if (!visible) reachedStart = false;
      else if (entry.intersectionRatio >= .2) reachedStart = true;
      void syncPlayback();
    }, { threshold: [0, .01, .2] });

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // Changing preload lets the existing request continue without load()
      // aborting and restarting an in-flight download.
      video.preload = "auto";
      preloadObserver.disconnect();
    }, { rootMargin: "2000px 0px" });

    visibilityObserver.observe(video);
    preloadObserver.observe(video);
    video.addEventListener("ended", handleEnded);
    const readinessEvents = ["canplay", "progress", "seeked"] as const;
    for (const event of readinessEvents) video.addEventListener(event, syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    document.addEventListener("pointerup", syncPlayback, { passive: true });
    document.addEventListener("keydown", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      disposed = true;
      visibilityObserver.disconnect();
      preloadObserver.disconnect();
      video.removeEventListener("ended", handleEnded);
      for (const event of readinessEvents) video.removeEventListener(event, syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      document.removeEventListener("pointerup", syncPlayback);
      document.removeEventListener("keydown", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, [videoRef]);
}
