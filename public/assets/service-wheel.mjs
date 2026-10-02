import { WheelGestures } from './wheel-gestures.mjs';

// A gesture includes both finger movement and its momentum. Consuming it does
// not impose a cooldown: a newly recognized gesture can step immediately.
export function createServiceWheelGesture() {
  let detector;
  let unsubscribe;
  let phase;
  let consumed = false;
  let direction = 0;
  let distance = 0;
  let reverseDistance = 0;

  function connect() {
    unsubscribe?.();
    detector = WheelGestures({ preventWheelAction: false, reverseSign: false });
    unsubscribe = detector.on('wheel', next => {
      if (next.isEnding) return;
      phase = next;
      if (next.isStart) {
        consumed = false;
        distance = reverseDistance = 0;
      }
    });
  }

  connect();

  return {
    update(event) {
      phase = null;
      detector.feedWheel(event);
      if (!phase) return 0;
      const [dx, dy] = phase.axisDelta;
      if (!dy || Math.abs(dx) > Math.abs(dy)) return 0;

      if (consumed) {
        if (Math.sign(dy) === direction || event.momentum === true) {
          reverseDistance = 0;
          return 0;
        }
        // A deliberate reversal responds immediately, even before the old
        // momentum ends. Small opposite-axis jitter is not a second gesture.
        reverseDistance += dy;
        if (Math.abs(reverseDistance) < 16) return 0;
        const reversal = reverseDistance;
        connect();
        detector.feedWheel(event);
        distance = reversal;
      } else {
        if (phase.isMomentum) return 0;
        if (Math.sign(dy) !== Math.sign(distance)) distance = 0;
        distance += dy;
      }

      return Math.abs(distance) >= 16 ? Math.sign(distance) : 0;
    },
    consume() {
      consumed = true;
      direction = Math.sign(distance) || direction;
      distance = reverseDistance = 0;
    },
    get consumed() { return consumed; },
  };
}
