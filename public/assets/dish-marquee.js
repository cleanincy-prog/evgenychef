import { uiText } from './ui-language.mjs';

const section = document.querySelector('.sq-intro--dishes');
if (section) {
  const toggle = section.querySelector('.dish-marquee-toggle');
  const strip = section.querySelector('.dish-marquee');
  const videos = [...strip.querySelectorAll('video')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = !('IntersectionObserver' in window);
  let paused = false;
  let running = false;
  let elapsed = 0;
  let startedAt = 0;
  let blocked = false;
  const nearby = new Set('IntersectionObserver' in window ? [] : videos);
  const pending = new WeakSet();
  const failed = new WeakSet();
  const shouldPlay = video => running && nearby.has(video) && !failed.has(video);
  const updateButton = () => {
    toggle.hidden = reducedMotion.matches;
    toggle.dataset.paused = String(paused || blocked);
    toggle.setAttribute('aria-label', paused || blocked
      ? uiText('Продолжить движение лент', 'Resume marquee motion')
      : uiText('Приостановить движение лент', 'Pause marquee motion'));
  };
  const play = video => {
    if (!shouldPlay(video) || !video.paused || pending.has(video) || video.readyState < 1) return;
    // Both copies use the same clock, so a new tile enters at the same loop phase.
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = (elapsed + (performance.now() - startedAt) / 1000) % video.duration;
    }
    pending.add(video);
    Promise.resolve(video.play()).catch(error => {
      if (error.name === 'NotAllowedError' && shouldPlay(video)) {
        blocked = true;
        updateButton();
      }
    }).finally(() => {
      pending.delete(video);
      if (!shouldPlay(video)) video.pause();
    });
  };
  const update = () => {
    const nextRunning = visible && !document.hidden && !paused && !reducedMotion.matches;
    if (running !== nextRunning) {
      if (running) elapsed += (performance.now() - startedAt) / 1000;
      else startedAt = performance.now();
      running = nextRunning;
    }
    section.dataset.marqueeRunning = String(running);
    updateButton();
    videos.forEach(video => {
      if (visible && !reducedMotion.matches && !video.hasAttribute('src') && !failed.has(video)) {
        video.muted = true;
        video.preload = 'auto';
        video.src = video.dataset.src;
      }
      if (shouldPlay(video)) play(video);
      else video.pause();
    });
  };
  videos.forEach(video => {
    video.addEventListener('loadedmetadata', () => play(video));
    video.addEventListener('canplay', () => play(video));
    video.addEventListener('error', () => {
      // Return to the real poster if the connection or decoder fails.
      if (failed.has(video)) return;
      failed.add(video);
      video.removeAttribute('src');
      video.load();
    });
  });
  toggle.addEventListener('click', () => {
    if (blocked) { blocked = false; paused = false; }
    else paused = !paused;
    update();
  });
  document.addEventListener('visibilitychange', update);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', update);
  else reducedMotion.addListener(update);
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) nearby.add(entry.target);
        else nearby.delete(entry.target);
      });
      update();
    }, { root: strip, rootMargin: '0px 80px', threshold: 0 });
    videos.forEach(video => videoObserver.observe(video));
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { root: document.querySelector('#main'), threshold: 0 }).observe(section);
  }
  update();
}
