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

    const syncPlayback = async () => {
      video.muted = true;

      if (reducedMotion.matches || !isVisible) {
        video.pause();
        return;
      }

      try {
        await video.play();
      } catch {
        // The documentary poster remains the complete fallback.
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= visibleThreshold;
        void syncPlayback();
      },
      { threshold: [0, visibleThreshold, 0.8] },
    );

    const handleMotionChange = () => {
      void syncPlayback();
    };

    observer.observe(video);
    reducedMotion.addEventListener("change", handleMotionChange);
    void syncPlayback();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      video.muted = true;
      video.pause();
    };
  }, [videoRef, visibleThreshold]);
}
