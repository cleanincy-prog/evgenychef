"use client";

import { useEffect, type RefObject } from "react";

export function usePageMediaPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.visualViewport;
    let isVisible = false;
    let reachedStartPosition = false;
    let manuallyPaused = false;
    let automaticPause = false;
    let disposed = false;
    let playPending = false;
    let frame = 0;

    const pause = () => {
      if (!video.paused) {
        automaticPause = true;
        video.pause();
      }
    };

    const syncPlayback = async () => {
      if (disposed) return;
      if (document.hidden || !isVisible) {
        pause();
        return;
      }
      if (!reachedStartPosition || reducedMotion.matches || manuallyPaused ||
        video.ended || video.error || !video.paused || playPending) return;

      playPending = true;
      try {
        await video.play();
        if (disposed || document.hidden || !isVisible) pause();
      } catch {
        // Autoplay may be blocked: the poster and native controls stay usable.
      } finally {
        playPending = false;
      }
    };

    const measurePlayback = () => {
      frame = 0;
      if (disposed) return;
      const rect = video.getBoundingClientRect();
      const top = viewport?.offsetTop ?? 0;
      const height = viewport?.height ?? window.innerHeight;
      isVisible = rect.height > 0 && rect.bottom > top && rect.top < top + height;
      // Match the approved phone capture: the whole frame is visible with
      // about 6% of the viewport below it. A taller-than-screen film starts
      // when its top reaches the viewport top instead of waiting forever.
      const startTop = top + Math.max(0, height * 0.94 - rect.height);
      if (!isVisible) reachedStartPosition = false;
      else if (rect.top <= startTop + 1) reachedStartPosition = true;
      // Once started, keep playing while any of the frame remains visible.
      void syncPlayback();
    };

    const scheduleMeasurement = () => {
      if (!frame) frame = window.requestAnimationFrame(measurePlayback);
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

    const handleMotionChange = () => reducedMotion.matches ? pause() : measurePlayback();
    const handleVisibility = () => { measurePlayback(); };
    const handlePause = () => {
      if (!automaticPause && !video.ended) manuallyPaused = true;
      automaticPause = false;
    };
    const handlePlay = () => { manuallyPaused = false; };

    preloadObserver.observe(video);
    const resizeObserver = new ResizeObserver(scheduleMeasurement);
    resizeObserver.observe(video);
    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement);
    viewport?.addEventListener("scroll", scheduleMeasurement, { passive: true });
    viewport?.addEventListener("resize", scheduleMeasurement);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibility);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);
    video.addEventListener("canplay", scheduleMeasurement);
    measurePlayback();

    return () => {
      disposed = true;
      preloadObserver.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", scheduleMeasurement);
      viewport?.removeEventListener("scroll", scheduleMeasurement);
      viewport?.removeEventListener("resize", scheduleMeasurement);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("canplay", scheduleMeasurement);
      pause();
    };
  }, [videoRef]);
}
