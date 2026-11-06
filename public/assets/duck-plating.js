const chapter = document.querySelector('[data-duck-plating]');
if (chapter) setupDuckPlating(chapter);

function setupDuckPlating(chapter) {
  const diagram = chapter.querySelector('.duck-diagram');
  const film = chapter.querySelector('video');
  const svg = chapter.querySelector('.duck-arrows');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const keys = ['duck', 'puree', 'sauce', 'physalis'];
  const groups = Object.fromEntries(keys.map(key => [key, svg.querySelector(`[data-duck-arrow="${key}"]`)]));
  const notes = Object.fromEntries(keys.map(key => [key, diagram.querySelector(`[data-duck-note="${key}"]`)]));
  let data = { fps: 29.97002997002997, frames: 1, tracks: Object.fromEntries(keys.map(key => [key, [groups[key].dataset.firstPoint.split(',').map(Number)]])) };
  let visible = false, animation = 0, geometry = null, playPending = false;

  function measure() {
    const box = diagram.getBoundingClientRect(), media = film.getBoundingClientRect();
    if (!box.width || !media.width) return;
    geometry = {
      width: box.width, height: box.height,
      video: { x: media.left - box.left, y: media.top - box.top, w: media.width, h: media.height },
      notes: Object.fromEntries(keys.map(key => {
        const r = notes[key].getBoundingClientRect();
        return [key, { x: r.left - box.left, y: r.top - box.top, width: r.width, height: r.height }];
      })),
    };
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    draw(film.currentTime);
  }

  function draw(time) {
    if (!geometry) return;
    const index = Math.max(0, Math.min(data.frames - 1, Math.floor(time * data.fps + .01)));
    const g = geometry;
    for (const key of keys) {
      const [px, py] = data.tracks[key][index];
      const target = [g.video.x + px / 1920 * g.video.w, g.video.y + py / 1080 * g.video.h];
      const n = g.notes[key], bottom = key === 'puree' || key === 'physalis';
      const sy = bottom ? n.y - 9 : n.y + n.height + 9, sx = n.x + n.width * .42;
      const bend = Math.min(28, g.width * .075);
      const elbowY = bottom ? Math.max(target[1] + bend, sy - bend) : Math.min(target[1] - bend, sy + bend);
      const path = `M${sx},${sy} L${sx},${elbowY} L${target[0]},${target[1]}`;
      const angle = Math.atan2(target[1] - elbowY, target[0] - sx);
      const headLength = Math.max(6, Math.min(11, g.width * .025));
      const wing = sign => [target[0] + headLength * Math.cos(angle + Math.PI + sign * .48), target[1] + headLength * Math.sin(angle + Math.PI + sign * .48)];
      const a = wing(-1), b = wing(1);
      const head = `M${a[0]},${a[1]} L${target[0]},${target[1]} L${b[0]},${b[1]}`;
      groups[key].querySelectorAll('[data-line]').forEach(p => p.setAttribute('d', path));
      groups[key].querySelectorAll('[data-head]').forEach(p => p.setAttribute('d', head));
    }
    chapter.dataset.trackedFrame = String(index);
  }
  function frameLoop(_now, metadata) {
    animation = 0;
    draw(metadata?.mediaTime ?? film.currentTime);
    if (!film.paused && !film.ended) animation = film.requestVideoFrameCallback ? film.requestVideoFrameCallback(frameLoop) : requestAnimationFrame(frameLoop);
  }
  function stopFrames() {
    if (!animation) return;
    if (film.cancelVideoFrameCallback) film.cancelVideoFrameCallback(animation);
    else cancelAnimationFrame(animation);
    animation = 0;
  }
  async function play() {
    if (playPending) return;
    playPending = true;
    try { await film.play(); } catch { /* Keep the poster when autoplay is unavailable. */ }
    finally { playPending = false; }
  }
  function visibility() {
    if (!visible || document.hidden) film.pause();
    else if (!film.ended && !reduced.matches && film.paused) play();
  }
  film.addEventListener('play', () => { if (!animation) frameLoop(); });
  film.addEventListener('pause', () => { stopFrames(); draw(film.currentTime); });
  film.addEventListener('ended', () => draw(film.currentTime));
  film.addEventListener('seeked', () => draw(film.currentTime));
  film.addEventListener('loadeddata', measure);
  const resize = new ResizeObserver(measure);
  [diagram, film, ...Object.values(notes)].forEach(element => resize.observe(element));
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].intersectionRatio >= .35;
    visibility();
  }, { root: document.querySelector('#main'), threshold: [0, .35] });
  observer.observe(film);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', () => { if (reduced.matches) film.pause(); else visibility(); });
  document.fonts.ready.then(measure);
  film.muted = true;
  film.controls = false;
  measure();
  // The first measured arrows work immediately; a failed track request cannot disable playback.
  fetch(chapter.dataset.tracks).then(response => {
    if (!response.ok) throw new Error('Duck tracks unavailable');
    return response.json();
  }).then(tracks => {
    if (!tracks.frames || !tracks.fps || keys.some(key => tracks.tracks?.[key]?.length !== tracks.frames)) throw new Error('Invalid duck tracks');
    data = tracks;
    draw(film.currentTime);
  }).catch(() => { chapter.dataset.tracking = 'first-frame-fallback'; });
}
