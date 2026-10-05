import { uiText } from './ui-language.mjs';
// Start when the chapter enters view. Browsers may require a gesture for audio.
const chapter = document.querySelector('.story-scene--preparation');
const video = chapter?.querySelector('[data-letter-video]');
if (video) {
  const controls = chapter.querySelector('.story-film-controls');
  const sound = controls.querySelector('[data-film-sound]');
  const status = controls.querySelector('[data-film-status]');
  let request = 0;
  let pending = 0;
  let visible = false;
  let pageActive = true;
  let soundRequested = true;
  let audibleBlocked = false;
  const canPlay = () => visible && pageActive && !document.hidden;
  video.controls = false;
  controls.hidden = false;
  function syncControls() {
    sound.setAttribute('aria-pressed', String(video.muted));
    sound.setAttribute('aria-label', video.muted ? uiText('Включить звук', 'Unmute') : uiText('Выключить звук', 'Mute'));
    controls.querySelector('[data-sound-label]').textContent = video.muted ? uiText('выкл.', 'off') : uiText('вкл.', 'on');
  }
  function pause() {
    request += 1;
    pending = 0;
    video.pause();
    syncControls();
  }
  async function start(fromGesture = false) {
    if (!canPlay() || (pending && !fromGesture)) return;
    const muted = !soundRequested || (audibleBlocked && !fromGesture);
    if (!video.paused && video.muted === muted) return;
    const current = ++request;
    pending = current;
    status.textContent = '';
    // Set muted and call play synchronously within the trusted gesture on iOS.
    video.muted = muted;
    try {
      try {
        await video.play();
        if (current === request && !video.muted) audibleBlocked = false;
      } catch (error) {
        if (current !== request || !canPlay()) return;
        if (muted || error.name !== 'NotAllowedError') throw error;
        audibleBlocked = true;
        video.muted = true;
        await video.play();
        if (current === request) status.textContent = uiText('Коснитесь страницы, чтобы включить звук.', 'Tap the page to enable sound.');
      }
    } catch {
      if (current === request && canPlay()) status.textContent = uiText('Видео временно недоступно.', 'The video is temporarily unavailable.');
    } finally {
      if (pending === current) pending = 0;
      if (!canPlay()) video.pause();
      syncControls();
    }
  }
  sound.addEventListener('click', () => {
    soundRequested = video.muted;
    audibleBlocked = false;
    if (soundRequested) start(true);
    else { video.muted = true; start(); }
    syncControls();
  });
  function enableAudio(event) {
    if (!event.isTrusted || !soundRequested || event.target.closest?.('[data-film-sound]')) return;
    if (event.type === 'keydown' && (event.altKey || event.ctrlKey || event.metaKey || ['Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(event.key))) return;
    audibleBlocked = false;
    start(true);
  }
  ['click', 'touchend', 'keydown'].forEach(event => document.addEventListener(event, enableAudio, { passive: true }));
  ['play', 'playing'].forEach(event => video.addEventListener(event, () => { if (!canPlay()) video.pause(); }));
  video.addEventListener('volumechange', syncControls);
  const headerHeight = Math.ceil(document.querySelector('.site-header')?.getBoundingClientRect().height || 0);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRect.height > 1;
    if (visible) start(); else pause();
  }, { root: document.querySelector('#main'), rootMargin: `-${headerHeight}px 0px 0px 0px`,
    threshold: [0, .01] }).observe(chapter);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else start(); });
  window.addEventListener('pagehide', () => { pageActive = false; pause(); });
  window.addEventListener('pageshow', () => { pageActive = true; start(); });
  syncControls();
}

// Enhance the continuous ribbon while preserving layout and native scrolling.
const ribbon = document.querySelector('.story-scenes');
const storyScroller = document.querySelector('#main');
if (ribbon && storyScroller) {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [...ribbon.querySelectorAll('.story-step')];
  const animations = new Set();
  const revealed = new WeakSet();
  const pendingReveals = new Set();
  let frame = 0;

  function drawProgress() {
    frame = 0;
    if (document.hidden) return;
    const viewport = storyScroller.getBoundingClientRect();
    for (const element of pendingReveals) {
      const bounds = element.getBoundingClientRect();
      const visible = Math.min(bounds.bottom, viewport.bottom - 48) - Math.max(bounds.top, viewport.top);
      if (bounds.height > 0 && visible >= Math.min(bounds.height, viewport.height - 48) * .12) revealCopy(element);
    }
    const readingPoint = viewport.top + viewport.height * .55;
    // Read geometry together, then write styles without interleaving layout work.
    const positions = scenes.map(scene => ({ scene, bounds: scene.getBoundingClientRect() }));
    for (const { scene, bounds } of positions) {
      const fraction = Math.max(0, Math.min(1, (readingPoint - bounds.top) / bounds.height));
      scene.style.setProperty('--story-read', `${(fraction * 100).toFixed(2)}%`);
      if (!motionPreference.matches && bounds.bottom > viewport.top && bounds.top < viewport.bottom) {
        const drift = Math.max(-14, Math.min(14, (viewport.top + viewport.height * .5 - bounds.top - bounds.height * .5) * .035));
        scene.style.setProperty('--story-drift', `${drift.toFixed(2)}px`);
      }
    }
  }
  function scheduleProgress() {
    if (!frame) frame = requestAnimationFrame(drawProgress);
  }

  const revealTargets = [...ribbon.querySelectorAll('.story-copy > h3, .story-body > p, .story-copy > p.story-body, .story-products > div, .story-ingredient-details > figure, [data-taste-note], .story-plate figcaption, .story-film-controls, .story-contact')];
  const noteLeaders = new Map([...ribbon.querySelectorAll('[data-taste-note]')].map(note => [
    note, ribbon.querySelector(`[data-taste-leader="${note.dataset.tasteNote}"]`),
  ]));
  function revealState(element, state) {
    element.dataset.storyReveal = state;
    const leader = noteLeaders.get(element);
    if (leader) leader.dataset.storyReveal = state;
  }
  function revealCopy(element) {
    if (revealed.has(element)) return;
    revealed.add(element);
    pendingReveals.delete(element);
    revealObserver.unobserve(element);
    revealState(element, 'shown');
    if (motionPreference.matches || document.hidden || !element.animate) return;
    const leader = noteLeaders.get(element);
    // Notes and their connector lines fade in place, keeping the diagram aligned.
    const keyframes = leader ? [{ opacity: 0 }, { opacity: 1 }] : [
      { opacity: 0, transform: 'translate3d(0, 22px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    ];
    for (const target of leader ? [element, leader] : [element]) {
      const animation = target.animate(keyframes, { duration: 850, easing: 'cubic-bezier(.22, 1, .36, 1)' });
      // WKWebView can leave a freshly created animation pending at time zero.
      const startTime = document.timeline?.currentTime;
      if (typeof startTime === 'number') animation.startTime = startTime;
      animations.add(animation);
      const timeout = setTimeout(() => animation.cancel(), 1200);
      const settled = () => { clearTimeout(timeout); animations.delete(animation); };
      animation.finished.then(settled, settled);
    }
  }
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= .12) revealCopy(entry.target);
    }
  }, { root: storyScroller, rootMargin: '0px 0px -48px 0px', threshold: .12 });
  function startReveals() {
    for (const element of revealTargets) {
      // Without JavaScript or with reduced motion, all copy remains visible.
      if (motionPreference.matches || !element.animate || revealed.has(element)) continue;
      revealState(element, 'pending');
      pendingReveals.add(element);
      revealObserver.observe(element);
    }
    scheduleProgress();
  }
  // Do not wait for every image/video on the page: embedded views can defer them.
  let fontTimeout;
  Promise.race([document.fonts.ready, new Promise(resolve => { fontTimeout = setTimeout(resolve, 1200); })]).then(() => {
    clearTimeout(fontTimeout);
    requestAnimationFrame(() => requestAnimationFrame(startReveals));
  });

  function cancelReveals() {
    for (const animation of animations) animation.cancel();
    animations.clear();
  }
  ribbon.addEventListener('focusin', event => {
    cancelReveals();
    const target = event.target.closest('[data-story-reveal]');
    if (target) {
      revealed.add(target);
      pendingReveals.delete(target);
      revealObserver.unobserve(target);
      revealState(target, 'shown');
    }
  });
  motionPreference.addEventListener('change', () => {
    cancelReveals();
    if (motionPreference.matches) {
      revealObserver.disconnect();
      pendingReveals.clear();
      for (const element of revealTargets) revealState(element, 'shown');
    }
    for (const scene of scenes) scene.style.removeProperty('--story-drift');
    scheduleProgress();
  });
  storyScroller.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  window.addEventListener('load', scheduleProgress, { once: true });
  window.addEventListener('pageshow', scheduleProgress);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      cancelReveals();
    } else scheduleProgress();
  });
  scheduleProgress();
}

// Keep each side note connected to its ingredient as the diagram reflows.
const tasteDiagram = document.querySelector('.story-taste-diagram');
if (tasteDiagram) {
  const leaders = [...tasteDiagram.querySelectorAll('[data-taste-note]')].map(note => ({
    note,
    heading: note.querySelector('.story-note-heading'),
    point: tasteDiagram.querySelector(`[data-taste-point="${note.dataset.tasteNote}"]`),
    path: tasteDiagram.querySelector(`[data-taste-leader="${note.dataset.tasteNote}"]`),
  }));
  let tasteFrame = 0;
  function drawTasteLeaders() {
    tasteFrame = 0;
    const bounds = tasteDiagram.getBoundingClientRect();
    const plate = tasteDiagram.querySelector('.story-plate-image').getBoundingClientRect();
    const paths = leaders.map(({ note, heading, point, path }) => {
      const label = note.getBoundingClientRect();
      const title = heading.getBoundingClientRect();
      const target = point.getBoundingClientRect();
      const x = target.left + target.width / 2 - bounds.left;
      const y = target.top + target.height / 2 - bounds.top;
      if (label.bottom <= plate.top || label.top >= plate.bottom) {
        const above = label.bottom <= plate.top;
        const sx = label.left + label.width / 2 - bounds.left;
        const sy = (above ? label.bottom + 5 : label.top - 5) - bounds.top;
        const curve = Math.max(12, Math.abs(y - sy) * .4) * (above ? 1 : -1);
        return { path, d: `M${sx},${sy} C${sx},${sy + curve} ${x},${y - curve} ${x},${y}` };
      }
      const left = label.left < target.left;
      const sx = (left ? label.right + 3 : label.left - 3) - bounds.left;
      const sy = title.top + title.height / 2 - bounds.top;
      const curve = Math.max(10, Math.abs(x - sx) * .4) * (left ? 1 : -1);
      return { path, d: `M${sx},${sy} C${sx + curve},${sy} ${x - curve},${y} ${x},${y}` };
    });
    for (const { path, d } of paths) path.setAttribute('d', d);
  }
  function scheduleTasteLeaders() {
    if (!tasteFrame) tasteFrame = requestAnimationFrame(drawTasteLeaders);
  }
  const tasteResize = new ResizeObserver(scheduleTasteLeaders);
  [tasteDiagram, tasteDiagram.querySelector('.story-plate-image'), ...leaders.map(({ note }) => note)].forEach(element => tasteResize.observe(element));
  document.fonts.ready.then(scheduleTasteLeaders);
  window.addEventListener('load', scheduleTasteLeaders, { once: true });
  scheduleTasteLeaders();
}
