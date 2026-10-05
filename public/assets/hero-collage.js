// Шеф4 photo order with a two-second assembly and bounded preparation time.
import { uiText } from './ui-language.mjs';

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
    toggle.setAttribute('aria-label', playing ? uiText('Приостановить видео с шефом', 'Pause the chef video') : uiText('Воспроизвести видео с шефом', 'Play the chef video'));
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

function imageReady(image) {
  if (image.complete) return Promise.resolve();
  if (image.decode) return image.decode().catch(() => {});
  return new Promise(resolve => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });
}

// A slow or failed optional snapshot must never prevent the entrance from running.
function prepareSnapshot() {
  import('./hero-snapshot.js').then(async ({ createHeroSnapshot }) => {
    const snapshot = createHeroSnapshot(frame, grid);
    await Promise.allSettled([...grid.querySelectorAll('img')].map(imageReady));
    snapshot.ready();
  }).catch(() => {}); // The existing CSS blur is the static fallback.
}
if (frame && grid && frame.dataset.heroIntro === 'complete') prepareSnapshot();

if (frame && card && grid && frame.dataset.heroIntro === 'pending') {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let disposed = false;
  let suspended = document.hidden;
  let preparing = false;
  let generation = 0;
  let startedAt = 0;
  let startedWidth = 0;
  let remaining = 0;
  let timeout;
  let readinessTimeout;
  const images = [...frame.querySelectorAll('.hero-story img, .hero-portrait img')];
  const criticalReady = Promise.allSettled([
    document.fonts.ready,
    ...images.map(imageReady),
  ]);

  function finish() {
    if (disposed) return;
    disposed = true;
    frame.dataset.heroIntro = 'complete';
    frame.removeAttribute('data-hero-suspended');
    clearTimeout(timeout);
    clearTimeout(readinessTimeout);
    motion.removeEventListener('change', onAvailability);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('scroll', onAvailability, true);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pagehide', onPageHide);
    window.removeEventListener('pageshow', onPageShow);
    frame.removeEventListener('animationend', onAnimationEnd);
    frame.removeEventListener('focusin', finish);
    prepareSnapshot();
  }
  function outsideViewport() {
    const bounds = frame.getBoundingClientRect();
    return bounds.height > 0 && innerHeight > 0 && (bounds.bottom <= 0 || bounds.top >= innerHeight);
  }
  function armCompletion() {
    startedAt = performance.now();
    timeout = setTimeout(finish, remaining);
  }
  function setSuspended(value) {
    if (disposed) return;
    if (value && !suspended && remaining) {
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
    }
    suspended = value;
    frame.toggleAttribute('data-hero-suspended', value);
    clearTimeout(timeout);
    clearTimeout(readinessTimeout);
    generation += 1;
    preparing = false;
    if (value) return;
    if (startedWidth && remaining <= 0) return finish();
    if (remaining) armCompletion();
    onAvailability();
  }
  function onVisibility() { setSuspended(document.hidden); }
  function onPageHide() { setSuspended(true); }
  function onPageShow() { setSuspended(document.hidden); }
  function onAvailability() {
    if (disposed) return;
    if (motion.matches) return finish();
    if (suspended || document.hidden) return;
    if (outsideViewport()) return finish();
    prepareEntrance();
  }
  function onResize() {
    // In-app browser chrome can adjust the initial width by a few pixels.
    // Only a substantial reorientation invalidates an already measured flight.
    if (startedWidth && Math.abs(innerWidth - startedWidth) > startedWidth * .15) return finish();
    onAvailability();
  }
  function onAnimationEnd(event) {
    if (event.target === card && event.animationName === 'hero-card-reveal') finish();
  }

  function prepareEntrance() {
    if (preparing || disposed || frame.dataset.heroIntro !== 'pending') return;
    const bounds = grid.getBoundingClientRect();
    if (!bounds.width || !bounds.height || !innerHeight) return;
    // Never hide content which the CSS failure fallback has already shown.
    if (getComputedStyle(card).opacity !== '0') return finish();
    preparing = true;
    const current = ++generation;
    // Only the leading photos and portrait are needed to begin the flight.
    Promise.race([
      criticalReady,
      new Promise(resolve => { readinessTimeout = setTimeout(resolve, 1800); }),
    ]).then(() => {
      if (disposed || current !== generation || suspended || document.hidden) return;
      if (motion.matches || outsideViewport() || getComputedStyle(card).opacity !== '0') return finish();
      clearTimeout(readinessTimeout);
      startedWidth = innerWidth;
      if (!images.every(image => image.complete && image.naturalWidth > 0)) {
        frame.dataset.heroIntro = 'revealing';
        remaining = 900;
        armCompletion();
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
      remaining = 3000;
      armCompletion();
    }).catch(finish);
  }
  motion.addEventListener('change', onAvailability);
  document.addEventListener('visibilitychange', onVisibility);
  // The BAO layout scrolls #main instead of the window.
  window.addEventListener('scroll', onAvailability, { passive: true, capture: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  frame.addEventListener('animationend', onAnimationEnd);
  frame.addEventListener('focusin', finish);
  frame.toggleAttribute('data-hero-suspended', suspended);
  onAvailability();
}
