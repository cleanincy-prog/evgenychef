// Native section snapping. Wheel and touch input stay entirely with the browser.
import { createCountUp } from './count-up.mjs';
import { uiText } from './ui-language.mjs';

const root = document.documentElement;
const main = document.querySelector('#main');
const header = document.querySelector('.site-header');
const menu = document.querySelector('#mobile-menu');
const toggle = document.querySelector('.menu-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const counts = createCountUp({ prefersReducedMotion: () => reducedMotion.matches });
const mobile = matchMedia('(max-width: 1023px)');
const dinnerStory = document.querySelector('.dinner-story');
let openingStoryAnchor = !!targetForHash(location.hash)?.closest('.dinner-story');
const all = (selector, context = document) => [...context.querySelectorAll(selector)];
const panels = all('.sq-panel');
const serviceButtons = all('[data-service-jump]');
const progress = document.querySelector('.sq-progress > span');
const routeTiming = { duration: 500, easing: 'cubic-bezier(.33, 0, .25, 1)', fill: 'both' };
let menuOpen = false;
let menuTimer;
let activeService = 0;
let transition = null;
let dialogTrigger = null;
let restoreDialogFocus = true;
let closingDialog = null;
let dialogBackdrop = null;
let scrollFrame;
let submenuOpen = false;
let dropdownBlockedUntil = 0;

// Reuse the existing format labels in both navigation levels.
function formatLinks() {
  return serviceButtons.map((button, index) => {
    const link = document.createElement('a');
    link.href = `#${panels[index].id}`;
    link.dataset.serviceLink = String(index);
    link.textContent = button.textContent;
    return link;
  });
}
const desktopFormats = document.querySelector('.header-links a[href="#services"]');
const formatGroup = desktopFormats.parentElement;
formatGroup.classList.add('has-formats');
const dropdown = document.createElement('nav');
dropdown.className = 'formats-dropdown';
dropdown.setAttribute('aria-label', uiText('Выбор формата', 'Choose an experience'));
dropdown.id = 'desktop-formats';
const dropdownItems = document.createElement('div');
dropdownItems.className = 'formats-dropdown-items';
dropdownItems.append(...formatLinks());
dropdown.append(dropdownItems);
formatGroup.append(dropdown);
desktopFormats.setAttribute('aria-expanded', 'false');
desktopFormats.setAttribute('aria-controls', dropdown.id);
function showDropdown(open) {
  if (open && performance.now() < dropdownBlockedUntil) return;
  formatGroup.classList.toggle('is-open', open);
  desktopFormats.setAttribute('aria-expanded', String(open));
  dropdown.inert = !open;
}
formatGroup.addEventListener('mouseenter', () => showDropdown(true));
formatGroup.addEventListener('mouseleave', () => showDropdown(false));
formatGroup.addEventListener('focusin', () => showDropdown(true));
formatGroup.addEventListener('focusout', event => { if (!formatGroup.contains(event.relatedTarget)) showDropdown(false); });
showDropdown(false);

const mobileFormatsLink = menu.querySelector('a[href="#services"]');
const mobileFormats = document.createElement('button');
mobileFormats.type = 'button';
mobileFormats.textContent = mobileFormatsLink.textContent;
mobileFormats.setAttribute('aria-expanded', 'false');
mobileFormats.setAttribute('aria-controls', 'mobile-formats');
mobileFormatsLink.replaceWith(mobileFormats);
const submenu = document.createElement('nav');
submenu.id = 'mobile-formats';
submenu.className = 'mobile-submenu';
submenu.setAttribute('aria-label', uiText('Выбор формата', 'Choose an experience'));
submenu.setAttribute('aria-hidden', 'true');
submenu.inert = true;
const backButton = document.createElement('button');
backButton.type = 'button';
backButton.className = 'submenu-back';
backButton.setAttribute('aria-label', uiText('Вернуться в меню', 'Back to the menu'));
backButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" stroke="currentColor" stroke-width="1.4"/></svg>';
submenu.append(...formatLinks(), backButton);
header.append(submenu);
function showSubmenu(open, focus = true) {
  submenuOpen = open;
  submenu.classList.toggle('is-open', open);
  submenu.inert = !open;
  submenu.setAttribute('aria-hidden', String(!open));
  mobileFormats.setAttribute('aria-expanded', String(open));
  menu.inert = open;
  if (focus) (open ? submenu.querySelector('a') : mobileFormats).focus({ preventScroll: true });
}
mobileFormats.addEventListener('click', () => showSubmenu(true));
backButton.addEventListener('click', () => showSubmenu(false));

const desktopSafari = /Safari\//.test(navigator.userAgent)
  && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Android/.test(navigator.userAgent)
  && !/Mobile|iPad|iPhone|iPod/.test(navigator.userAgent)
  && !(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
root.classList.toggle('is-story-reading', openingStoryAnchor);
root.classList.add('native-scroll');
root.classList.toggle('desktop-safari', desktopSafari);

const screens = all('.hero, .about-section, .sq-intro, .sq-panel, .letter-heading, .process-card, .letter-footer, .ingredients-section, .contact-section');
for (const screen of screens) {
  screen.dataset.snap = '';
  screen.dataset.navTone = screen.matches('.hero, .sq-intro, .sq-panel, .process-card:not(.process-card--light), .ingredients-section--photo, .contact-section') ? 'light' : 'dark';
}
// The hero controller reveals its text and button after the collage lands.
const reveals = all('[data-reveal], .sq-intro-content, .sq-copy, .letter-heading > *, .process-caption');
for (const element of reveals) element.classList.add('motion-reveal');
all('.sq-copy .button-row').forEach(element => element.classList.add('motion-cta'));

function reveal(element) {
  if (element.matches('.motion-reveal')) element.classList.add('is-revealed');
  all('.motion-reveal', element).forEach(child => child.classList.add('is-revealed'));
}
const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    // Long text still appears at 80% of the available viewport.
    const required = Math.min(entry.boundingClientRect.height, main.clientHeight) * .8;
    if (entry.isIntersecting && entry.intersectionRect.height >= required - 1) {
      reveal(entry.target);
      revealSections.delete(entry.target);
      revealObserver.unobserve(entry.target);
    }
  }
}, { root: main, threshold: Array.from({ length: 101 }, (_, index) => index / 100) });
const revealSections = new Set();
for (const element of reveals) revealSections.add(element.closest('.hero, .sq-intro, .sq-panel, .process-card, .ingredients-section--photo') || element);
revealSections.forEach(element => revealObserver.observe(element));

// Counters have their own visibility lifecycle, independent of one-time reveals.
const counterGroups = all('.about-facts [data-reveal]').map(element => ({
  element, figures: all('[data-count]', element),
})).filter(group => group.figures.length);
const visibleCounterGroups = new Set();
let pageActive = true;
function resetCounterGroup(group) {
  if (!visibleCounterGroups.delete(group)) return;
  group.figures.forEach(counts.reset);
}
function resetCounters() { counterGroups.forEach(resetCounterGroup); }
function syncCounters() {
  if (document.hidden || !pageActive) { resetCounters(); return; }
  const viewport = main.getBoundingClientRect();
  const top = Math.max(viewport.top, header.getBoundingClientRect().bottom);
  const height = viewport.bottom - top;
  for (const group of counterGroups) {
    const bounds = group.element.getBoundingClientRect();
    const visible = Math.min(bounds.bottom, viewport.bottom) - Math.max(bounds.top, top);
    // Full exit rearms the count; small scrolls around the start threshold do not.
    if (visible <= 0) resetCounterGroup(group);
    else if (bounds.height > 0 && visible >= Math.min(bounds.height, height) * .8 - 1 && !visibleCounterGroups.has(group)) {
      visibleCounterGroups.add(group);
      reveal(group.element);
      group.figures.forEach(counts.animate);
    }
  }
}
const counterObserver = new IntersectionObserver(syncCounters, { root: main, threshold: [0, .8, 1] });
counterGroups.forEach(group => counterObserver.observe(group.element));

function revealVisibleSections() {
  if (document.hidden) return;
  const viewport = main.getBoundingClientRect();
  for (const element of revealSections) {
    const bounds = element.getBoundingClientRect();
    const visible = Math.min(bounds.bottom, viewport.bottom) - Math.max(bounds.top, viewport.top);
    if (bounds.height > 0 && visible >= Math.min(bounds.height, viewport.height) * .8 - 1) {
      reveal(element);
      revealSections.delete(element);
      revealObserver.unobserve(element);
    }
  }
}

function updateService(index) {
  activeService = index;
  serviceButtons.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
  progress.style.transform = `translateX(${index * 100}%)`;
}
function syncScroll() {
  scrollFrame = null;
  // Some embedded views resume before IntersectionObserver delivers a new entry.
  revealVisibleSections();
  syncCounters();
  const storyBounds = dinnerStory?.getBoundingClientRect();
  root.classList.toggle('is-story-reading', (openingStoryAnchor
    || (!!storyBounds && storyBounds.top < main.clientHeight && storyBounds.bottom > header.offsetHeight)));
  let current = screens[0];
  const probe = Math.min(main.clientHeight * .2, 160);
  for (const screen of screens) {
    const bounds = screen.getBoundingClientRect();
    if (bounds.top <= probe && bounds.bottom > probe) current = screen;
  }
  root.style.setProperty('--nav-ink', current.dataset.navTone === 'light' ? '#fafaf8' : '#2c2622');
  root.classList.toggle('is-hero-view', current.matches('.hero'));
  root.classList.toggle('is-about-view', current.matches('.about-section'));
  if (!transition) {
    const index = panels.findIndex(panel => {
      const bounds = panel.getBoundingClientRect();
      return bounds.top < main.clientHeight / 2 && bounds.bottom > main.clientHeight / 2;
    });
    if (index >= 0 && index !== activeService) updateService(index);
  }
}
main.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScroll);
}, { passive: true });

function offsetOf(element) { return element.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop; }
function scrollToElement(element, instant = false) {
  // The cinematic story is freely scrollable; its anchor titles sit below the fixed header.
  const storyTarget = element.closest('.dinner-story');
  if (storyTarget) root.classList.add('is-story-reading');
  const inset = storyTarget ? parseFloat(getComputedStyle(element).scrollMarginTop) || 0 : 0;
  const top = element === main || element === document.body ? 0 : Math.max(0, offsetOf(element) - inset);
  main.scrollTo({ top, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth' });
}
function targetForHash(hash) {
  try {
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    return id === 'top' || id === 'main' ? main : document.getElementById(id);
  } catch { return null; }
}
function setHash(element) {
  const hash = element === main ? '#top' : `#${element.id}`;
  if (element.id && location.hash !== hash) history.pushState(null, '', hash);
}
function cancelTransition() { transition?.finish(); }
function animateOnce(element, keyframes, timing) {
  if (!element.animate || document.hidden) return { finished: Promise.resolve(), cancel() {} };
  const animation = element.animate(keyframes, timing);
  const startTime = document.timeline?.currentTime;
  if (typeof startTime === 'number') animation.startTime = startTime;
  // A stalled WebView animation must not leave a drawer or navigation locked.
  const timeout = setTimeout(() => animation.cancel(), timing.duration + (timing.delay || 0) + 300);
  const settled = () => clearTimeout(timeout);
  animation.finished.then(settled, settled);
  return animation;
}
function panelSnapshot(panel) {
  const clone = panel.cloneNode(true);
  clone.removeAttribute('id');
  clone.removeAttribute('data-snap');
  clone.setAttribute('aria-hidden', 'true');
  clone.inert = true;
  all('[id]', clone).forEach(element => element.removeAttribute('id'));
  const originals = all('img', panel);
  all('img', clone).forEach((image, index) => {
    image.loading = 'eager';
    image.src = originals[index].currentSrc || originals[index].src;
    image.removeAttribute('srcset');
  });
  return clone;
}
function jumpToService(index, horizontal = false) {
  const incoming = panels[index];
  if (!incoming) return;
  cancelTransition();
  const outgoing = panels[activeService];
  const from = activeService;
  const isOnPanel = Math.abs(outgoing.getBoundingClientRect().top) < main.clientHeight * .2;
  if (!horizontal || !isOnPanel || index === from || reducedMotion.matches) {
    scrollToElement(incoming);
    setHash(incoming);
    return;
  }
  // Only the content travels; the header and the format selector stay in place.
  const layer = document.createElement('div');
  layer.className = 'service-transition';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  const oldPanel = panelSnapshot(outgoing);
  const newPanel = panelSnapshot(incoming);
  const direction = index > from ? 1 : -1;
  newPanel.style.transform = `translateX(${direction * 100}%)`;
  layer.append(oldPanel, newPanel);
  document.body.append(layer);
  root.classList.add('is-navigating');
  reveal(incoming);
  scrollToElement(incoming, true);
  updateService(index);
  setHash(incoming);
  const animations = [
    animateOnce(oldPanel, [{ transform: 'translateX(0)' }, { transform: `translateX(${-direction * 100}%)` }], routeTiming),
    animateOnce(newPanel, [{ transform: `translateX(${direction * 100}%)` }, { transform: 'translateX(0)' }], routeTiming),
  ];
  const current = { finish() {
    if (transition !== current) return;
    transition = null;
    animations.forEach(animation => animation.cancel());
    layer.remove();
    root.classList.remove('is-navigating');
    syncScroll();
  } };
  transition = current;
  Promise.allSettled(animations.map(animation => animation.finished)).then(current.finish);
}

function syncLock() {
  const locked = menuOpen || !!document.querySelector('dialog[open]');
  root.classList.toggle('scroll-locked', locked);
  main.inert = locked;
  header.inert = !!document.querySelector('.sheet-fallback[open]');
}
function closeMenu(restoreFocus = false) {
  if (!menuOpen) return;
  showSubmenu(false, false);
  menuOpen = false;
  clearTimeout(menuTimer);
  menu.classList.remove('is-open');
  menu.inert = true;
  menu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', uiText('Открыть меню', 'Open menu'));
  root.classList.remove('menu-open');
  syncLock();
  if (restoreFocus) toggle.focus({ preventScroll: true });
  menuTimer = setTimeout(() => { if (!menuOpen) menu.hidden = true; }, reducedMotion.matches ? 0 : 300);
}
toggle.addEventListener('click', () => {
  if (menuOpen) return closeMenu(true);
  cancelTransition();
  clearTimeout(menuTimer);
  menuOpen = true;
  menu.hidden = false;
  menu.inert = false;
  menu.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', uiText('Закрыть меню', 'Close menu'));
  root.classList.add('menu-open');
  syncLock();
  menu.getBoundingClientRect();
  menu.classList.add('is-open');
});

function openDialog(dialog, trigger) {
  cancelTransition();
  closeMenu();
  dialogTrigger = trigger;
  restoreDialogFocus = true;
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.classList.add('sheet-fallback');
    dialog.setAttribute('open', '');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialogBackdrop = document.createElement('div');
    dialogBackdrop.className = 'sheet-fallback-backdrop';
    dialogBackdrop.setAttribute('aria-hidden', 'true');
    dialogBackdrop.addEventListener('click', () => closeDialog(dialog));
    document.body.append(dialogBackdrop);
    dialog.querySelector('[data-close]')?.focus({ preventScroll: true });
  }
  syncLock();
  if (!reducedMotion.matches && !mobile.matches && !document.hidden) {
    animateOnce(dialog, [{ transform: 'translateY(100vh)' }, { transform: 'translateY(0)' }], { duration: 400, delay: 200, easing: 'ease-in-out', fill: 'backwards' });
    animateOnce(dialog, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 200, fill: 'backwards' });
  }
}
async function closeDialog(dialog, restore = true) {
  if (!dialog?.hasAttribute('open') || closingDialog) return;
  closingDialog = dialog;
  restoreDialogFocus = restore;
  dialog.getAnimations().forEach(animation => animation.cancel());
  if (!reducedMotion.matches && !mobile.matches && !document.hidden) {
    const animations = [
      animateOnce(dialog, [{ transform: 'translateY(0)' }, { transform: 'translateY(100vh)' }], { duration: 600, easing: 'ease-in-out', fill: 'forwards' }),
      animateOnce(dialog, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }),
    ];
    await Promise.allSettled(animations.map(animation => animation.finished));
    animations.forEach(animation => animation.cancel());
  }
  if (dialog.classList.contains('sheet-fallback')) {
    dialog.removeAttribute('open');
    dialog.removeAttribute('aria-modal');
    dialogBackdrop?.remove();
    dialogBackdrop = null;
    dialog.dispatchEvent(new Event('close'));
  } else dialog.close();
  syncLock();
  closingDialog = null;
}
for (const dialog of all('dialog')) {
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('close', () => {
    syncLock();
    if (restoreDialogFocus) dialogTrigger?.focus({ preventScroll: true });
    dialogTrigger = null;
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientY < bounds.top || event.clientX < bounds.left || event.clientX > bounds.right)) closeDialog(dialog);
  });
}

document.addEventListener('click', async event => {
  const trigger = event.target.closest('a, button');
  if (!trigger || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (trigger.matches('a[href^="#"], [data-service-jump]')) {
    showDropdown(false);
    dropdownBlockedUntil = performance.now() + 1000;
  }
  if (trigger.hasAttribute('data-service-jump') || trigger.hasAttribute('data-service-link')) {
    event.preventDefault();
    closeMenu();
    jumpToService(Number(trigger.dataset.serviceJump ?? trigger.dataset.serviceLink), trigger.hasAttribute('data-service-jump'));
    return;
  }
  if (trigger.dataset.dialog) {
    const dialog = document.getElementById(trigger.dataset.dialog);
    if (dialog) { event.preventDefault(); openDialog(dialog, trigger); }
    return;
  }
  if (trigger.hasAttribute('data-close')) {
    event.preventDefault();
    await closeDialog(trigger.closest('dialog'), !trigger.matches('a[href^="#"]'));
  }
  if (trigger.matches('a[href^="#"]')) {
    const target = targetForHash(trigger.hash);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    cancelTransition();
    scrollToElement(target);
    setHash(target);
    if (trigger.classList.contains('skip-link')) main.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  const fallbackDialog = document.querySelector('.sheet-fallback[open]');
  if (fallbackDialog && event.key === 'Escape') {
    event.preventDefault(); closeDialog(fallbackDialog); return;
  }
  if (fallbackDialog && event.key === 'Tab') {
    const items = all('a[href], button, [tabindex="0"]', fallbackDialog).filter(element => !element.disabled && element.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    return;
  }
  if (event.key === 'Escape' && submenuOpen) { event.preventDefault(); showSubmenu(false); return; }
  if (event.key === 'Escape' && menuOpen) { event.preventDefault(); closeMenu(true); return; }
  if (event.key === 'Escape' && formatGroup.classList.contains('is-open')) {
    event.preventDefault();
    dropdownBlockedUntil = performance.now() + 1000;
    showDropdown(false);
    desktopFormats.focus({ preventScroll: true });
    return;
  }
  if (menuOpen && event.key === 'Tab') {
    const focusable = all('a, button', header).filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.closest('[inert]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    return;
  }
  if (event.defaultPrevented || menuOpen || document.querySelector('dialog[open]') || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest('a, button, input, textarea, select, video, [contenteditable="true"]')) return;
  const directions = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 };
  if (!(event.key in directions) && !['Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  cancelTransition();
  if (event.key === 'Home' || event.key === 'End') main.scrollTo({ top: event.key === 'Home' ? 0 : main.scrollHeight, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  else main.scrollBy({ top: directions[event.key] * main.clientHeight * .9, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
function restoreHash() {
  const target = targetForHash(location.hash);
  if (target) { cancelTransition(); closeMenu(); scrollToElement(target, true); }
}
window.addEventListener('popstate', restoreHash);
window.addEventListener('hashchange', restoreHash);
window.addEventListener('resize', () => { cancelTransition(); syncScroll(); });
window.addEventListener('pagehide', cancelTransition);
window.addEventListener('pagehide', () => { pageActive = false; resetCounters(); });
window.addEventListener('pageshow', () => { pageActive = true; cancelTransition(); syncLock(); syncScroll(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) resetCounters(); else syncScroll(); });
mobile.addEventListener('change', () => closeMenu());
reducedMotion.addEventListener('change', () => {
  cancelTransition();
  if (reducedMotion.matches) { counts.finish(); reveals.forEach(reveal); }
});
document.fonts.ready.then(() => { restoreHash(); syncScroll(); });
// Initial browser fragment positioning can run after fonts resolve. Restore a
// story anchor once the page has loaded, with section snapping disabled.
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    if (openingStoryAnchor && targetForHash(location.hash)?.closest('.dinner-story')) restoreHash();
    openingStoryAnchor = false;
    syncScroll();
  });
}, { once: true });
updateService(0);
syncScroll();
