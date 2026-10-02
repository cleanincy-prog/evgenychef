import assert from 'node:assert/strict';
import { test } from 'node:test';
import { serviceScrollStops, serviceScrollAction } from '../public/assets/service-scroll.mjs';

const geometry = { top: 2200, height: 5500, viewportHeight: 1000 };
const introPart = 130 / 550;
const stops = serviceScrollStops(geometry, introPart, 3);
const [dinner, events, masterclass] = stops;
const action = (scroll, delta, target = scroll) => serviceScrollAction(stops, scroll, target + delta, delta);

test('the first and last formats meet the continuous page scroll without empty travel', () => {
  assert.equal(dinner, Math.ceil(geometry.top + (geometry.height - geometry.viewportHeight) * introPart));
  assert.equal(masterclass + geometry.viewportHeight, geometry.top + geometry.height);
});

test('fractional layout positions leave the dinner links clear of the intro', () => {
  const fractionalGeometry = { ...geometry, top: 2097.21875, height: 6248, viewportHeight: 1136 };
  const [first] = serviceScrollStops(fractionalGeometry, introPart, 3);
  const introEnd = fractionalGeometry.top + (fractionalGeometry.height - fractionalGeometry.viewportHeight) * introPart;
  assert(first >= introEnd && first - introEnd < 1);
  assert.equal(first % 1, 0);
});

test('the hero, biography and service intro keep scrolling in both directions', () => {
  for (const scroll of [0, geometry.top - 100, geometry.top, dinner - 100]) {
    assert.equal(action(scroll, 40), null);
    assert.equal(action(scroll, -40), null);
  }
});

test('entering the dinner lands smoothly without skipping its photo', () => {
  assert.deepEqual(action(dinner - 50, 1000), { target: dinner, immediate: false });
  assert.deepEqual(action(dinner - 80, 10, dinner - 5), { target: dinner, immediate: false });
});

test('one gesture still switches to exactly the adjacent format', () => {
  assert.deepEqual(action(dinner, 40), { target: events, immediate: true });
  assert.deepEqual(action(events, 40), { target: masterclass, immediate: true });
  assert.deepEqual(action(masterclass, -40), { target: events, immediate: true });
  assert.deepEqual(action(events, -40), { target: dinner, immediate: true });
});

test('scrolling below the masterclass moves the page for small and large gestures', () => {
  for (const delta of [1, 40, 1000]) assert.equal(action(masterclass, delta), null);
  assert.equal(action(masterclass + 300, 40), null);
});

test('scrolling above the dinner smoothly brings the intro and earlier page back', () => {
  for (const delta of [-1, -40, -1000]) assert.equal(action(dinner, delta), null);
  assert.equal(action(dinner - 300, -40), null);
});

test('returning from the next section is smooth and stops at the masterclass', () => {
  assert.equal(action(masterclass + 300, -40), null);
  assert.deepEqual(action(masterclass + 50, -1000), { target: masterclass, immediate: false });
  assert.deepEqual(action(masterclass + 80, -10, masterclass + 5), { target: masterclass, immediate: false });
});

test('reversing before an entry animation completes gives control back to the page', () => {
  assert.equal(action(dinner - 40, -20, dinner), null);
  assert.equal(action(masterclass + 40, 20, masterclass), null);
});

test('fractional scroll rounding at either edge does not trap an outward gesture', () => {
  assert.equal(action(dinner + .75, -20), null);
  assert.equal(action(masterclass - .75, 20), null);
});
