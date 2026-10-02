// Runs once when a figure is revealed; the HTML retains its final value without JS.
export function createCountUp({
  prefersReducedMotion = () => false,
  now = () => performance.now(),
  requestFrame = callback => requestAnimationFrame(callback),
  cancelFrame = id => cancelAnimationFrame(id),
} = {}) {
  const active = new Map();

  function finish() {
    for (const [element, state] of active) {
      cancelFrame(state.frame);
      element.textContent = String(state.target);
    }
    active.clear();
  }

  function animate(element) {
    if (element.dataset.counted) return;
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;
    element.dataset.counted = 'true';
    if (prefersReducedMotion() || target === 0) {
      element.textContent = String(target);
      return;
    }

    const start = now();
    const state = { target, frame: 0 };
    active.set(element, state);
    element.textContent = '0';
    function step(timestamp) {
      if (prefersReducedMotion()) { finish(); return; }
      const progress = Math.max(0, Math.min(1, (timestamp - start) / 1600));
      element.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) state.frame = requestFrame(step);
      else active.delete(element);
    }
    state.frame = requestFrame(step);
  }

  return { animate, finish };
}
