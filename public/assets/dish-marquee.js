import { uiText } from './ui-language.mjs';

const section = document.querySelector('.sq-intro--dishes');
if (section) {
  const toggle = section.querySelector('.dish-marquee-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = !('IntersectionObserver' in window);
  let paused = false;
  const update = () => {
    section.dataset.marqueeRunning = String(visible && !document.hidden && !paused && !reducedMotion.matches);
    toggle.hidden = reducedMotion.matches;
    toggle.dataset.paused = String(paused);
    toggle.setAttribute('aria-label', paused
      ? uiText('Продолжить движение лент', 'Resume marquee motion')
      : uiText('Приостановить движение лент', 'Pause marquee motion'));
  };
  toggle.addEventListener('click', () => { paused = !paused; update(); });
  document.addEventListener('visibilitychange', update);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', update);
  else reducedMotion.addListener(update);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      // Load the whole repeated strip when the section arrives, including offscreen plates.
      if (visible) section.querySelectorAll('.dish-marquee img').forEach(image => { image.loading = 'eager'; });
      update();
    }, { root: document.querySelector('#main'), threshold: 0 }).observe(section);
  }
  update();
}
