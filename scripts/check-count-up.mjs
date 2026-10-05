import assert from 'node:assert/strict';
import { createCountUp } from '../public/assets/count-up.mjs';

function fixture(reduced = false) {
  let time = 0;
  let id = 0;
  const pending = new Map();
  const motion = { reduced };
  const counts = createCountUp({
    prefersReducedMotion: () => motion.reduced,
    requestFrame: callback => { pending.set(++id, callback); return id; },
    cancelFrame: key => pending.delete(key),
  });
  return {
    counts, pending, motion,
    advance(ms) {
      time += ms;
      const callbacks = [...pending.values()];
      pending.clear();
      callbacks.forEach(callback => callback(time));
    },
  };
}
const figure = target => ({ dataset: { count: String(target) }, textContent: String(target) });

// Both biography figures start from zero, visibly progress, and retain exact totals.
{
  const test = fixture();
  const figures = [figure(25), figure(20)];
  figures.forEach(test.counts.animate);
  assert.deepEqual(figures.map(item => item.textContent), ['0', '0']);
  test.advance(0);
  test.advance(400);
  assert(figures.every(item => Number(item.textContent) > 0 && Number(item.textContent) < Number(item.dataset.count)));
  const midway = figures.map(item => item.textContent);
  figures.forEach(test.counts.animate);
  assert.deepEqual(figures.map(item => item.textContent), midway, 'A second reveal must not restart the count');
  assert.equal(test.pending.size, 2);
  test.advance(1200);
  assert.deepEqual(figures.map(item => item.textContent), ['25', '20']);
  figures.forEach(test.counts.animate);
  assert.equal(test.pending.size, 0, 'Completed figures must not schedule new frames');
}

// Reduced motion uses final values immediately and also finishes in-flight counts.
{
  const test = fixture(true);
  const item = figure(25);
  test.counts.animate(item);
  assert.equal(item.textContent, '25');
  assert.equal(test.pending.size, 0);
}
{
  const test = fixture();
  const figures = [figure(25), figure(20)];
  figures.forEach(test.counts.animate);
  test.advance(0);
  test.advance(100);
  test.motion.reduced = true;
  test.counts.finish();
  assert.deepEqual(figures.map(item => item.textContent), ['25', '20']);
  assert.equal(test.pending.size, 0);
}

// A delayed first frame must leave enough visible time for the whole count.
{
  const test = fixture();
  const item = figure(25);
  test.counts.animate(item);
  test.advance(5000);
  assert.equal(item.textContent, '0');
  test.advance(400);
  assert(Number(item.textContent) > 0 && Number(item.textContent) < 25);
  test.advance(1200);
  assert.equal(item.textContent, '25');
  assert.equal(test.pending.size, 0);
}

// Leaving the viewport cancels pending work and permits a fresh visible visit.
{
  const test = fixture();
  const figures = [figure(25), figure(20)];
  figures.forEach(test.counts.animate);
  test.advance(0);
  test.advance(400);
  const staleFrames = [...test.pending.values()];
  figures.forEach(test.counts.reset);
  assert.deepEqual(figures.map(item => item.textContent), ['25', '20']);
  assert(figures.every(item => !item.dataset.counted));
  assert.equal(test.pending.size, 0);
  figures.forEach(test.counts.animate);
  staleFrames.forEach(callback => callback(5000));
  assert.deepEqual(figures.map(item => item.textContent), ['0', '0'], 'A cancelled callback must not finish a new visit');
  test.advance(0);
  test.advance(400);
  assert(figures.every(item => Number(item.textContent) > 0 && Number(item.textContent) < Number(item.dataset.count)));
  test.advance(1200);
  assert.deepEqual(figures.map(item => item.textContent), ['25', '20']);
  assert.equal(test.pending.size, 0);
}
console.log('OK: biography counters animate per visible visit, survive a delayed first frame, finish at 25/20, and respect reduced motion.');
