import Lenis from './lenis.mjs';
import { createServiceWheelGesture } from './service-wheel.mjs';
import { serviceScrollStops, serviceScrollAction } from './service-scroll.mjs';

// The reference's scroll feel, rebuilt around the chef's actual content.
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
const lerp = (a, b, progress) => a + (b - a) * progress;
const lenis = new Lenis({ autoRaf: false, lerp: .055, wheelMultiplier: .55, touchMultiplier: 1, anchors: false, allowNestedScroll: true, virtualScroll: handleServiceGesture });
window.__lenis = lenis;
let motion = !reducedMotion.matches;
root.classList.toggle('motion-ready', motion);

const header = $('.site-header');
const hero = $('.hero');
const heroBackground = $('.hero-background');
const heroContent = $('.hero-content');
const sq = $('.sq-track');
const sqSticky = $('.sq-sticky', sq);
const panels = $$('.sq-panel');
const panelCopies = panels.map(panel => $('.sq-content', panel));
const serviceButtons = $$('[data-service-jump]');
const intro = $('.sq-intro');
const serviceProgressBar = $('.sq-progress > span');
const serviceIntroPart = 130 / (130 + 140 * panels.length);
const produceFrame = $('.produce-frame');
const producePhoto = $('[data-parallax]', produceFrame);
let geometry = {};
let dirty = true;
let previousScroll = window.scrollY;
let headerDirectionStart = previousScroll;
let lastDirection = 0;
let activeService = -1;
let renderedHeroProgress = -1;
let renderedServiceProgress = -1;
let renderedProduceProgress = -1;
const serviceGesture = { distance: 0, consumed: false, multiTouch: false };
const serviceWheel = createServiceWheelGesture();

function measure() {
  const y = window.scrollY;
  const bounds = element => { const r = element.getBoundingClientRect(); return { top: r.top + y, height: r.height }; };
  geometry = { sq: { ...bounds(sq), viewportHeight: sqSticky.offsetHeight }, hero: bounds(hero), produce: bounds(produceFrame) };
  renderedHeroProgress = renderedServiceProgress = renderedProduceProgress = -1;
  dirty = true;
  lenis.resize();
}

function updateMotion() {
  // At large text sizes or short landscape viewports use an ordinary, readable flow.
  root.classList.toggle('motion-ready', !reducedMotion.matches);
  const serviceFits = (innerWidth >= 768 || innerHeight >= 720) && panels.every(panel => $('.sq-content', panel).getBoundingClientRect().height <= innerHeight);
  motion = !reducedMotion.matches && serviceFits && innerHeight >= 530;
  if (!motion) cancelServiceStep();
  root.classList.toggle('motion-ready', motion);
  for (const element of panels) {
    element.removeAttribute('aria-hidden');
    element.inert = false;
    if (!motion) {
      for (const property of ['opacity', 'visibility', 'pointer-events', 'transform']) element.style.removeProperty(property);
    }
  }
  if (!motion) {
    intro.removeAttribute('style');
    $('.hero-background').style.transform = '';
    heroContent.style.opacity = '';
    for (const panel of panels) {
      $('.sq-content', panel).removeAttribute('style');
    }
    intro.removeAttribute('aria-hidden');
  }
  activeService = -1;
  measure();
}

function jumpToService(index) {
  if (!motion) return goTo(panels[index]);
  scrollServiceTo(serviceStops()[index]);
}
function goTo(target) {
  cancelServiceStep();
  // Lenis already honours the root's scroll-padding-top.
  lenis.scrollTo(target, { duration: reducedMotion.matches ? 0 : 1.4, force: true });
}

function serviceStops() {
  return serviceScrollStops(geometry.sq, serviceIntroPart, panels.length);
}

function cancelServiceStep() {
  lenis.reset();
  serviceGesture.distance = 0;
}

function scrollServiceTo(target, { immediate = true } = {}) {
  lenis.reset();
  serviceGesture.consumed = true;
  serviceWheel.consume();
  lenis.scrollTo(target, { immediate, force: true });
}

function handleServiceGesture({ deltaX, deltaY, event }) {
  if (!motion || !geometry.sq || lenis.isStopped || !mobileMenu.hidden) return true;
  if (event.ctrlKey || event.defaultPrevented || event.lenisStopPropagation) return true;
  if (event.target.closest?.('dialog, [data-lenis-prevent], [data-lenis-prevent-vertical], input, textarea, select, [contenteditable="true"]')) return true;
  const touch = event.type.startsWith('touch');
  if (event.target.closest?.(touch ? '[data-lenis-prevent-touch]' : '[data-lenis-prevent-wheel]')) return true;

  if (event.type === 'touchstart') {
    serviceGesture.distance = 0;
    serviceGesture.consumed = false;
    serviceGesture.multiTouch = event.touches.length !== 1;
    return true;
  }
  if (touch && (serviceGesture.multiTouch || event.touches.length > 1)) return true;
  const preventScroll = () => {
    if (event.cancelable) event.preventDefault();
    return false;
  };
  // Touchend repeats the last movement in Lenis; it must never advance a slide.
  if (event.type === 'touchend') return serviceGesture.consumed ? preventScroll() : true;
  if (!deltaY || Math.abs(deltaX) > Math.abs(deltaY)) return true;

  const wheelDirection = touch ? 0 : serviceWheel.update(event);
  if (touch ? serviceGesture.consumed : serviceWheel.consumed) return preventScroll();

  const y = window.scrollY;
  const projected = (touch ? y : lenis.targetScroll) + deltaY;
  const action = serviceScrollAction(serviceStops(), y, projected, deltaY);
  if (!action || !event.cancelable) return true;
  preventScroll();

  if (!action.immediate) {
    scrollServiceTo(action.target, action);
    return false;
  }

  if (touch) {
    if (Math.sign(deltaY) !== Math.sign(serviceGesture.distance)) serviceGesture.distance = 0;
    serviceGesture.distance += deltaY;
    if (Math.abs(serviceGesture.distance) < 16) return false;
  } else if (!wheelDirection) return false;

  scrollServiceTo(action.target);
  return false;
}

const menuToggle = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  mobileMenu.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.hidden = !expanded;
  header.classList.remove('is-hidden');
});

let dialogTrigger = null;
function closeDialog(dialog) { dialog.close(); }
for (const dialog of $$('dialog')) {
  dialog.addEventListener('close', () => {
    lenis.start();
    dialogTrigger?.focus({ preventScroll: true });
    dialogTrigger = null;
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(dialog); });
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('button, a');
  if (!trigger) return;
  if (trigger.hasAttribute('data-service-jump') || trigger.hasAttribute('data-service-link')) {
    event.preventDefault();
    jumpToService(Number(trigger.dataset.serviceJump ?? trigger.dataset.serviceLink));
    closeMenu();
    return;
  }
  if (trigger.dataset.dialog) {
    event.preventDefault();
    const dialog = document.getElementById(trigger.dataset.dialog);
    if (!dialog) return;
    dialogTrigger = trigger;
    closeMenu();
    cancelServiceStep();
    lenis.stop();
    dialog.showModal();
    return;
  }
  if (trigger.hasAttribute('data-close')) closeDialog(trigger.closest('dialog'));
  if (trigger.matches('a[href^="#"]')) {
    const target = document.getElementById(decodeURIComponent(trigger.hash.slice(1)));
    if (target) {
      event.preventDefault();
      closeMenu();
      goTo(trigger.hash === '#top' ? 0 : target);
      history.replaceState(null, '', trigger.hash);
    }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuToggle.focus(); }
});

function paintVisibility(element, opacity, active) {
  element.style.opacity = String(opacity);
  element.style.visibility = opacity > .001 ? 'visible' : 'hidden';
  element.style.pointerEvents = active ? 'auto' : 'none';
}
function renderServices(p) {
  // Offscreen sections keep the same clamped progress; don't rewrite their styles.
  if (p === renderedServiceProgress) return;
  renderedServiceProgress = p;
  const introPart = serviceIntroPart;
  const introTravel = clamp((p - .04) / (introPart - .04));
  intro.style.transform = `translate3d(0,${-102 * introTravel}%,0)`;
  intro.style.visibility = introTravel >= 1 ? 'hidden' : 'visible';
  intro.setAttribute('aria-hidden', String(introTravel >= 1));
  const serviceProgress = clamp((p - introPart) / (1 - introPart));
  const servicePosition = .5 + serviceProgress * (panels.length - 1);
  const selectedService = Math.min(panels.length - 1, Math.floor(servicePosition));
  panels.forEach((panel,index) => {
    const incoming = index === 0 ? 1 : clamp((servicePosition - index + .25) / .5);
    const outgoing = index === panels.length - 1 ? 1 : clamp((index + 1.25 - servicePosition) / .5);
    const opacity = outgoing > 0 ? incoming : 0;
    paintVisibility(panel, opacity, selectedService === index && introTravel >= 1);
    const copy = panelCopies[index];
    copy.style.opacity = String(incoming * outgoing);
    copy.style.transform = `translate3d(0,${(1-incoming)*60 - (1-outgoing)*40}px,0)`;
  });
  if (activeService !== selectedService) {
    activeService = selectedService;
    panels.forEach((panel,i) => { panel.inert = i !== activeService; panel.setAttribute('aria-hidden',String(i !== activeService)); });
    serviceButtons.forEach((button,i) => button.setAttribute('aria-current',String(i === activeService)));
  }
  serviceProgressBar.style.transform = `translateX(${(servicePosition - .5)*100}%)`;
}

function render(y) {
  const delta = y - previousScroll;
  const direction = Math.sign(delta);
  if (direction && direction !== lastDirection) { headerDirectionStart = y; lastDirection = direction; }
  if (direction && Math.abs(y-headerDirectionStart) > 9 && mobileMenu.hidden && !document.querySelector('dialog[open]')) header.classList.toggle('is-hidden', direction > 0 && y > 120);
  if (y < 60) header.classList.remove('is-hidden');
  previousScroll = y;
  if (!motion) return;

  const heroProgress = clamp((y - geometry.hero.top) / geometry.hero.height);
  if (heroProgress !== renderedHeroProgress) {
    renderedHeroProgress = heroProgress;
    heroBackground.style.transform = `translate3d(0,${heroProgress * 16}%,0)`;
    heroContent.style.opacity = String(1 - clamp((heroProgress - .18) / .66));
  }

  renderServices(clamp((y - geometry.sq.top) / (geometry.sq.height - geometry.sq.viewportHeight)));

  const producerProgress = clamp((y+innerHeight-geometry.produce.top)/(geometry.produce.height+innerHeight));
  if (producerProgress !== renderedProduceProgress) {
    renderedProduceProgress = producerProgress;
    producePhoto.style.transform = `translate3d(0,${lerp(-6,6,producerProgress)}%,0)`;
  }
}

function animateCount(element) {
  if (element.dataset.counted || reducedMotion.matches || !motion) return;
  element.dataset.counted = 'true';
  const target = Number(element.dataset.count);
  const start = performance.now();
  function frame(now) {
    const p = clamp((now-start)/1600);
    element.textContent = String(Math.round(target*(1-Math.pow(1-p,3))));
    if (p<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-revealed');
    $$('[data-count]',entry.target).forEach(animateCount);
    revealObserver.unobserve(entry.target);
  });
}, {rootMargin:'0px 0px 6% 0px',threshold:.06});
$$('[data-reveal]').forEach(element => revealObserver.observe(element));

let resizeFrame;
window.addEventListener('resize',() => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(updateMotion); });
reducedMotion.addEventListener('change', updateMotion);
new ResizeObserver(() => { dirty = true; measure(); }).observe(document.body);
window.addEventListener('scroll',() => { dirty = true; },{passive:true});
function frame(time) {
  lenis.raf(time);
  if (dirty || Math.abs(window.scrollY-previousScroll)>.05) { render(window.scrollY); dirty = false; }
  requestAnimationFrame(frame);
}
updateMotion();
document.fonts.ready.then(updateMotion);
requestAnimationFrame(frame);
