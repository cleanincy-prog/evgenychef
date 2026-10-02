// Playback starts on a deliberate click and stops when the chapter leaves view.
const chapter = document.querySelector('.story-scene--preparation');
const video = chapter?.querySelector('[data-letter-video]');
if (video) {
  const controls = chapter.querySelector('.story-film-controls');
  const play = controls.querySelector('[data-film-play]');
  const sound = controls.querySelector('[data-film-sound]');
  const status = controls.querySelector('[data-film-status]');
  let request = 0;
  let visible = false;
  video.controls = false;
  controls.hidden = false;
  function syncControls() {
    const playing = !video.paused && !video.ended;
    chapter.classList.toggle('is-film-playing', playing);
    play.setAttribute('aria-label', playing ? 'Приостановить видео подготовки' : 'Смотреть видео подготовки');
    controls.querySelector('[data-play-label]').textContent = playing ? 'Пауза' : 'Смотреть видео';
    sound.setAttribute('aria-pressed', String(video.muted));
    sound.setAttribute('aria-label', video.muted ? 'Включить звук' : 'Выключить звук');
    controls.querySelector('[data-sound-label]').textContent = video.muted ? 'выкл.' : 'вкл.';
  }
  function pause() { request += 1; video.pause(); syncControls(); }
  play.addEventListener('click', async () => {
    if (!video.paused) return pause();
    const current = ++request;
    status.textContent = '';
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
      if (current !== request || document.hidden || !visible) video.pause();
    } catch {
      status.textContent = 'Не удалось запустить видео. Попробуйте ещё раз или откройте его в отдельной вкладке.';
    }
    syncControls();
  });
  sound.addEventListener('click', () => { video.muted = !video.muted; syncControls(); });
  ['play', 'pause', 'ended', 'volumechange'].forEach(event => video.addEventListener(event, syncControls));
  const headerHeight = Math.ceil(document.querySelector('.site-header')?.getBoundingClientRect().height || 0);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRect.height > 1;
    if (!visible) pause();
  }, { root: document.querySelector('#main'), rootMargin: `-${headerHeight}px 0px 0px 0px`,
    threshold: [0, .01] }).observe(chapter);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
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
  let frame = 0;

  function drawProgress() {
    frame = 0;
    if (document.hidden) return;
    const viewport = storyScroller.getBoundingClientRect();
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
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < .12 || revealed.has(entry.target)) continue;
      const element = entry.target;
      revealed.add(element);
      revealObserver.unobserve(element);
      revealState(element, 'shown');
      if (motionPreference.matches || document.hidden || !element.animate) continue;
      const leader = noteLeaders.get(element);
      // Notes and their connector lines fade in place, keeping the diagram aligned.
      const keyframes = leader ? [{ opacity: 0 }, { opacity: 1 }] : [
        { opacity: 0, transform: 'translate3d(0, 22px, 0)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
      ];
      for (const target of leader ? [element, leader] : [element]) {
        const animation = target.animate(keyframes, { duration: 850, easing: 'cubic-bezier(.22, 1, .36, 1)' });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      }
    }
  }, { root: storyScroller, rootMargin: '0px 0px -48px 0px', threshold: .12 });
  function startReveals() {
    for (const element of revealTargets) {
      // Without JavaScript or with reduced motion, all copy remains visible.
      if (motionPreference.matches || !element.animate || revealed.has(element)) continue;
      revealState(element, 'pending');
      revealObserver.observe(element);
    }
  }
  // Fonts and the initial fragment scroll must settle before watching the copy.
  const pageLoaded = document.readyState === 'complete' ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  Promise.all([pageLoaded, document.fonts.ready]).then(() => {
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
      revealObserver.unobserve(target);
      revealState(target, 'shown');
    }
  });
  motionPreference.addEventListener('change', () => {
    cancelReveals();
    if (motionPreference.matches) {
      revealObserver.disconnect();
      for (const element of revealTargets) revealState(element, 'shown');
    }
    for (const scene of scenes) scene.style.removeProperty('--story-drift');
    scheduleProgress();
  });
  storyScroller.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  window.addEventListener('load', scheduleProgress, { once: true });
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
