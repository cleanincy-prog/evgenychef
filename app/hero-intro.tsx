"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Enhances the existing server-rendered Hero without changing its layout. */
export default function HeroIntro({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const card = frame?.querySelector<HTMLElement>(".hero-identity");
    const grid = frame?.querySelector<HTMLElement>(".hero-collage-grid");
    if (!frame || !card || !grid || frame.dataset.heroIntro !== "pending") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let timeout = 0;

    const release = () => {
      disposed = true;
      window.clearTimeout(timeout);
      motion.removeEventListener("change", stopIfUnavailable);
      document.removeEventListener("visibilitychange", stopIfUnavailable);
      window.removeEventListener("scroll", stopIfUnavailable);
      window.removeEventListener("resize", finish);
      window.removeEventListener("pagehide", finish);
      frame.removeEventListener("animationend", onAnimationEnd);
    };

    const finish = () => {
      frame.dataset.heroIntro = "complete";
      release();
    };

    const unavailable = () => {
      const bounds = frame.getBoundingClientRect();
      return motion.matches || document.hidden || bounds.bottom <= 0 || bounds.top >= window.innerHeight;
    };

    function stopIfUnavailable() {
      if (unavailable()) finish();
    }

    function onAnimationEnd(event: AnimationEvent) {
      if (event.target === card && event.animationName === "hero-card-reveal") finish();
    }

    // No late hide/replay after the CSS fail-safe has already revealed the Hero.
    // Unsupported scripting queries also retain the original static page.
    if (unavailable() || getComputedStyle(card).opacity !== "0") {
      finish();
      return;
    }

    motion.addEventListener("change", stopIfUnavailable);
    document.addEventListener("visibilitychange", stopIfUnavailable);
    window.addEventListener("scroll", stopIfUnavailable, { passive: true });
    window.addEventListener("resize", finish);
    window.addEventListener("pagehide", finish);
    frame.addEventListener("animationend", onAnimationEnd);

    // Intro is optional: a slow or broken image must never hold back the title.
    timeout = window.setTimeout(finish, 700);
    const images = [...frame.querySelectorAll<HTMLImageElement>("img")];
    void Promise.all([
      document.fonts.ready,
      ...images.map(image => image.decode()),
    ]).then(() => {
      if (disposed) return;
      if (unavailable() || getComputedStyle(card).opacity !== "0") {
        finish();
        return;
      }
      window.clearTimeout(timeout);
      // The field initially gathers on the left, then unfolds to its exact
      // original layout. The four leading photos all travel left into it.
      const field = grid.getBoundingClientRect();
      const fieldScale = Number.parseFloat(getComputedStyle(frame).getPropertyValue("--intro-field-scale"));
      const middleY = field.y + field.height / 2;
      const shots = [...frame.querySelectorAll<HTMLElement>("[data-story-photo]")];
      const featured = new Set(shots.map(shot => shot.dataset.storyPhoto));
      const tiles = [...frame.querySelectorAll<HTMLElement>("[data-photo-index]")];
      // Measure once, before any style writes. Interleaving these phases forces
      // a separate style/layout update for almost every photograph.
      const tileBounds = new Map(tiles.map(tile => [tile.dataset.photoIndex, tile.getBoundingClientRect()]));
      const shotBounds = new Map(shots.map(shot => [shot, shot.getBoundingClientRect()]));
      for (const shot of shots) {
        const from = shotBounds.get(shot);
        const to = tileBounds.get(shot.dataset.storyPhoto);
        if (!from || !to) continue;
        const targetX = field.x + (to.x + to.width / 2 - field.x) * fieldScale;
        const targetY = middleY + (to.y + to.height / 2 - middleY) * fieldScale;
        shot.style.setProperty("--story-x", `${targetX - from.x - from.width / 2}px`);
        shot.style.setProperty("--story-y", `${targetY - from.y - from.height / 2}px`);
        shot.style.setProperty("--story-scale", `${fieldScale * Math.min(to.width / from.width, to.height / from.height)}`);
      }
      // The smaller photographs continue the same right-to-left stream. Their
      // launch point stays right of every cell, even as the field opens out.
      for (const tile of tiles) {
        if (featured.has(tile.dataset.photoIndex)) continue;
        const to = tileBounds.get(tile.dataset.photoIndex)!;
        tile.style.setProperty("--intro-x", `${field.right + field.width * .12 - to.x - to.width / 2}px`);
        tile.style.setProperty("--intro-y", `${middleY - to.y - to.height / 2}px`);
      }
      frame.dataset.heroIntro = "running";
      // The card finishes fading at 3000ms; the timer only covers lost events.
      timeout = window.setTimeout(finish, 3250);
    }).catch(() => {
      if (!disposed) finish();
    });

    // Keep the pending SSR state during Strict Mode's setup/cleanup rehearsal.
    return release;
  }, []);

  return <div className="hero-frame" data-hero-intro="pending" ref={frameRef}>{children}</div>;
}
