// Runs once per visible visit; the controller resets it after leaving the screen.
// The HTML retains its final value without JavaScript.
export function createCountUp({
  prefersReducedMotion = () => false,
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

  function reset(element) {
    const state = active.get(element);
    if (state) { cancelFrame(state.frame); active.delete(element); }
    const target = Number(element.dataset.count);
    if (Number.isFinite(target)) element.textContent = String(target);
    delete element.dataset.counted;
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

    const state = { target, frame: 0, start: null };
    active.set(element, state);
    element.textContent = '0';
    function step(timestamp) {
      if (active.get(element) !== state) return;
      if (prefersReducedMotion()) { finish(); return; }
      // A delayed first frame must not skip the animation on a busy mobile page.
      if (state.start === null) state.start = timestamp;
      const progress = Math.max(0, Math.min(1, (timestamp - state.start) / 1600));
      element.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) state.frame = requestFrame(step);
      else active.delete(element);
    }
    state.frame = requestFrame(step);
  }

  return { animate, finish, reset };
}
