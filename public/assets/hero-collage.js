// Шеф4 photo order with a two-second assembly and bounded preparation time.
import { createHeroSnapshot } from './hero-snapshot.js';

const frame = document.querySelector('.hero-frame');
// Keep entrance opacity separate from the parent's scroll-driven opacity.
const card = frame?.querySelector('.hero-identity');
const grid = frame?.querySelector('.hero-collage-grid');
const portrait = frame?.querySelector('.hero-portrait');

const video = grid?.querySelector('[data-hero-video]');
if (video) {
  const tile = video.closest('.collage-tile');
  const toggle = tile.querySelector('.hero-video-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let suspended = false;
  let userChoice = null;
  let starting = false;
  let failed = false;
  video.muted = true;
  toggle.hidden = false;

  function updateButton() {
    const playing = !video.paused && !video.ended;
    tile.toggleAttribute('data-video-playing', playing);
    toggle.setAttribute('aria-label', playing ? 'Приостановить видео с шефом' : 'Воспроизвести видео с шефом');
  }
  function syncVideo() {
    const wantsPlayback = userChoice ?? (!reducedMotion.matches && !navigator.connection?.saveData);
    const canPlay = !failed && !suspended && visible && !document.hidden && frame.dataset.heroIntro === 'complete' && wantsPlayback;
    if (!canPlay) {
      video.pause();
    } else if (video.paused && !starting) {
      if (!video.hasAttribute('src')) video.src = video.dataset.src;
      starting = true;
      video.play().catch(() => {}).finally(() => { starting = false; updateButton(); });
    }
    updateButton();
  }
  toggle.addEventListener('click', () => {
    userChoice = video.paused;
    syncVideo();
  });
  video.addEventListener('loadeddata', () => tile.setAttribute('data-video-ready', ''));
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => {
    failed = true;
    tile.removeAttribute('data-video-ready');
    toggle.hidden = true;
    syncVideo();
  });
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    syncVideo();
  }, { threshold: 0 }).observe(tile);
  new MutationObserver(syncVideo).observe(frame, { attributes: true, attributeFilter: ['data-hero-intro'] });
  document.addEventListener('visibilitychange', syncVideo);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && userChoice !== false) userChoice = null;
    syncVideo();
  });
  window.addEventListener('pagehide', () => { suspended = true; syncVideo(); });
  window.addEventListener('pageshow', () => { suspended = false; syncVideo(); });
}

if (frame && grid && frame.dataset.heroIntro === 'complete') {
  const snapshot = createHeroSnapshot(frame, grid);
  Promise.allSettled([...grid.querySelectorAll('img')].map(image => image.decode()))
    .then(() => snapshot.ready());
}

if (frame && card && grid && frame.dataset.heroIntro === 'pending') {
  const snapshot = createHeroSnapshot(frame, grid);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const initialWidth = innerWidth;
  let disposed = false;
  let timeout;
  let readinessTimeout;

  function finish() {
    if (disposed) return;
    disposed = true;
    frame.dataset.heroIntro = 'complete';
    snapshot.paint();
    clearTimeout(timeout);
    clearTimeout(readinessTimeout);
    motion.removeEventListener('change', stopIfUnavailable);
    document.removeEventListener('visibilitychange', stopIfUnavailable);
    window.removeEventListener('scroll', stopIfUnavailable, true);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pagehide', finish);
    frame.removeEventListener('animationend', onAnimationEnd);
    frame.removeEventListener('focusin', finish);
  }
  function unavailable() {
    const bounds = frame.getBoundingClientRect();
    return motion.matches || document.hidden || bounds.bottom <= 0 || bounds.top >= innerHeight;
  }
  function stopIfUnavailable() { if (unavailable()) finish(); }
  function onResize() { if (innerWidth !== initialWidth) finish(); }
  function onAnimationEnd(event) {
    if (event.target === card && event.animationName === 'hero-card-reveal') finish();
  }

  const images = [...frame.querySelectorAll('.hero-story img, .hero-collage-grid img')];
  const imagesReady = Promise.allSettled(images.map(image => image.decode()));
  let decoded = false;
  imagesReady.then(() => { decoded = true; snapshot.ready(); });

  if (unavailable() || getComputedStyle(card).opacity !== '0') {
    finish();
  } else {
    motion.addEventListener('change', stopIfUnavailable);
    document.addEventListener('visibilitychange', stopIfUnavailable);
    // The BAO layout scrolls #main instead of the window.
    window.addEventListener('scroll', stopIfUnavailable, {passive: true, capture: true});
    window.addEventListener('resize', onResize);
    window.addEventListener('pagehide', finish);
    frame.addEventListener('animationend', onAnimationEnd);
    // Keyboard users can reach the hero actions immediately.
    frame.addEventListener('focusin', finish);
    const criticalReady = Promise.allSettled([
      document.fonts.ready,
      imagesReady,
    ]);
    // Allow a cold public preview to decode the collage, but keep the wait bounded.
    Promise.race([
      criticalReady,
      new Promise(resolve => { readinessTimeout = setTimeout(resolve, 1800); }),
    ]).then(() => {
      if (disposed) return;
      if (unavailable() || getComputedStyle(card).opacity !== '0') return finish();
      clearTimeout(readinessTimeout);
      snapshot.paint();
      if (!decoded || !images.every(image => image.complete && image.naturalWidth > 0)) {
        frame.dataset.heroIntro = 'revealing';
        timeout = setTimeout(finish, 900);
        return;
      }
      const field = grid.getBoundingClientRect();
      const fieldScale = parseFloat(getComputedStyle(frame).getPropertyValue('--intro-field-scale'));
      const middleY = field.y + field.height / 2;
      const shots = [...frame.querySelectorAll('[data-story-photo]')];
      const featured = new Set(shots.map(shot => shot.dataset.storyPhoto));
      const tiles = [...frame.querySelectorAll('[data-photo-index]')];
      const tileBounds = new Map(tiles.map(tile => [tile.dataset.photoIndex, tile.getBoundingClientRect()]));
      const shotBounds = new Map(shots.map(shot => [shot, shot.getBoundingClientRect()]));
      const portraitBounds = portrait?.getBoundingClientRect();
      for (const shot of shots) {
        const from = shotBounds.get(shot);
        const to = tileBounds.get(shot.dataset.storyPhoto);
        const targetX = field.x + (to.x + to.width / 2 - field.x) * fieldScale;
        const targetY = middleY + (to.y + to.height / 2 - middleY) * fieldScale;
        shot.style.setProperty('--story-x', `${targetX - from.x - from.width / 2}px`);
        shot.style.setProperty('--story-y', `${targetY - from.y - from.height / 2}px`);
        shot.style.setProperty('--story-scale', String(fieldScale * Math.min(to.width / from.width, to.height / from.height)));
      }
      for (const tile of tiles) {
        if (featured.has(tile.dataset.photoIndex)) continue;
        const to = tileBounds.get(tile.dataset.photoIndex);
        tile.style.setProperty('--intro-x', `${field.right + field.width * .12 - to.x - to.width / 2}px`);
        tile.style.setProperty('--intro-y', `${middleY - to.y - to.height / 2}px`);
      }
      if (portraitBounds) {
        // Start beyond the right edge and join the same photo stream as the tiles.
        portrait.style.setProperty('--intro-x', `${field.right + field.width * .12 - portraitBounds.x}px`);
        portrait.style.setProperty('--intro-y', `${middleY - portraitBounds.y - portraitBounds.height / 2}px`);
      }
      frame.dataset.heroIntro = 'running';
      timeout = setTimeout(finish, 3000);
    }).catch(finish);
  }
}
