import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createServiceWheelGesture } from '../public/assets/service-wheel.mjs';

async function fixture(name) {
  const file = new URL(`./fixtures/trackpad/${name}.json`, import.meta.url);
  return JSON.parse(await readFile(file, 'utf8')).wheelEvents;
}

function replay(t, events) {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const gesture = createServiceWheelGesture();
  const steps = [];
  let previousTime = events[0].timeStamp;
  for (const event of events) {
    t.mock.timers.tick(event.timeStamp - previousTime);
    previousTime = event.timeStamp;
    const step = gesture.update({ deltaMode: 0, deltaX: 0, ...event });
    if (step) {
      steps.push(step);
      gesture.consume();
    }
  }
  return steps;
}

for (const name of ['swipe-up-trackpad', 'swipe-up-fast-trackpad', 'swipe-down-trackpad', 'swipe-down-fast-trackpad']) {
  test(`one step for the complete recorded macOS gesture: ${name}`, async t => {
    const events = await fixture(name);
    const direction = Math.sign(events.reduce((sum, event) => sum + event.deltaY, 0));
    assert.deepEqual(replay(t, events), [direction]);
  });
}

test('both recorded Mac trackpad swipes work, including the second during momentum', async t => {
  const events = (await fixture('double-swipe-right')).map(event => ({ ...event, deltaX: event.deltaY, deltaY: event.deltaX }));
  const direction = Math.sign(events.reduce((sum, event) => sum + event.deltaY, 0));
  assert.deepEqual(replay(t, events), [direction, direction]);
});

test('opposite gestures respond immediately without an animation lock or cooldown', t => {
  const events = [40, -40, 40, -40].map((deltaY, index) => ({ deltaY, timeStamp: index * 8, momentum: false }));
  assert.deepEqual(replay(t, events), [1, -1, 1, -1]);
});

test('native momentum spikes never count as gestures; the next finger movement does', t => {
  const events = [
    { timeStamp: 0, deltaY: 40, momentum: false },
    { timeStamp: 8, deltaY: 30, momentum: true },
    { timeStamp: 16, deltaY: 150, momentum: true },
    { timeStamp: 24, deltaY: 2, momentum: false },
    { timeStamp: 32, deltaY: 14, momentum: false },
  ];
  assert.deepEqual(replay(t, events), [1, 1]);
});

test('arriving during momentum does not start a new step', t => {
  const events = [140, 80, 40, 10].map((deltaY, index) => ({ deltaY, timeStamp: index * 16, momentum: true }));
  assert.deepEqual(replay(t, events), []);
});

test('minor opposite-direction noise does not rearm a consumed gesture', t => {
  const events = [40, -1, -2, 30].map((deltaY, index) => ({ deltaY, timeStamp: index * 8, momentum: false }));
  assert.deepEqual(replay(t, events), [1]);
});

test('horizontal gestures do not change the vertical sequence', t => {
  const events = [40, 30, 20].map((deltaX, index) => ({ deltaX, deltaY: 2, timeStamp: index * 8 }));
  assert.deepEqual(replay(t, events), []);
});
