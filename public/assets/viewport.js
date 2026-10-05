// Embedded browsers can expose less space than 100dvh (toolbars/keyboard).
// Keep the layout stable while the user magnifies it with pinch zoom.
const root = document.documentElement;
let frame = 0;
let previousHeight = 0;
function updateViewport() {
  frame = 0;
  const viewport = window.visualViewport;
  if (viewport && Math.abs(viewport.scale - 1) > .01) return;
  const height = Math.round(Math.min(window.innerHeight, viewport?.height || window.innerHeight));
  if (height > 0 && height !== previousHeight) {
    root.style.setProperty('--viewport-height', `${height}px`);
    previousHeight = height;
  }
}
function scheduleViewport() {
  if (!frame) frame = requestAnimationFrame(updateViewport);
}
updateViewport();
window.addEventListener('resize', scheduleViewport, { passive: true });
window.visualViewport?.addEventListener('resize', scheduleViewport, { passive: true });
window.addEventListener('pageshow', scheduleViewport);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) scheduleViewport();
});
