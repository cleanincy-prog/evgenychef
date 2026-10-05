// A bitmap machine and its pasta texture, driven by the existing native scroller.
// Kept separate from the story's copy, photographs, reveals, video, and navigation.
const ribbon = document.querySelector('.story-scenes');
const scroller = document.querySelector('#main');

if (ribbon && scroller) initPasta();

function initPasta() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const body = document.createElement('canvas');
  const bc = body.getContext('2d');
  if (!ctx || !bc) return;

  canvas.className = 'story-pasta';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.hidden = true;
  document.body.append(canvas);
  body.width = 572;
  body.height = 470;

  const source = new Image();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const firstCard = ribbon.querySelector('.story-scene');
  const header = document.querySelector('.site-header');
  const clamp = value => Math.max(0, Math.min(1, value));
  let frame = 0;
  let ready = false;

  function prepareMachine() {
    bc.save();
    bc.beginPath();
    bc.moveTo(60, 282); bc.lineTo(81, 281); bc.lineTo(84, 228);
    bc.quadraticCurveTo(85, 219, 96, 219); bc.lineTo(327, 219);
    bc.quadraticCurveTo(338, 219, 338, 240); bc.lineTo(345, 241);
    bc.quadraticCurveTo(355, 244, 355, 257); bc.lineTo(355, 437);
    bc.quadraticCurveTo(355, 456, 338, 457); bc.lineTo(94, 457);
    bc.quadraticCurveTo(82, 457, 82, 438); bc.lineTo(81, 337);
    bc.lineTo(62, 333); bc.quadraticCurveTo(54, 312, 60, 282);
    bc.closePath(); bc.clip();
    bc.drawImage(source, 0, 0);

    // Matching metal from the approved image replaces its stationary handle.
    bc.save(); bc.beginPath();
    bc.moveTo(291, 209); bc.lineTo(306, 209); bc.lineTo(356, 300);
    bc.lineTo(357, 343); bc.lineTo(346, 363); bc.lineTo(336, 355);
    bc.lineTo(344, 329); bc.lineTo(337, 309); bc.closePath(); bc.clip();
    bc.translate(420, 0); bc.scale(-1, 1); bc.drawImage(source, 0, 0);
    bc.restore();
    bc.drawImage(source, 162, 339, 32, 123, 195, 339, 32, 123);
    bc.restore();

    ready = true;
    ribbon.classList.add('is-pasta-ready');
    schedule();
  }

  function crank(angle) {
    const x = 349, y = 316;
    const tipX = 380 + Math.sin(angle) * 40;
    const tipY = 290 - Math.cos(angle) * 85;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 26, y + 4, tipX - 14, tipY + 27, tipX, tipY);
    ctx.strokeStyle = '#424139'; ctx.lineWidth = 8; ctx.stroke();
    ctx.strokeStyle = '#bdbbb0'; ctx.lineWidth = 4.4; ctx.stroke();
    ctx.strokeStyle = '#ebe8dc'; ctx.lineWidth = 1.25; ctx.stroke();
    const cap = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 10);
    cap.addColorStop(0, '#dedbd0'); cap.addColorStop(.48, '#8e8c82');
    cap.addColorStop(1, '#43453e');
    ctx.fillStyle = cap;
    ctx.beginPath(); ctx.ellipse(x, y, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(tipX, tipY + 2); ctx.rotate(Math.sin(angle) * .12);
    // The rounded handle also renders in iOS / Android WebViews without roundRect.
    ctx.beginPath();
    ctx.moveTo(-5, -110); ctx.lineTo(5, -110); ctx.quadraticCurveTo(18, -110, 18, -97);
    ctx.lineTo(18, -11); ctx.quadraticCurveTo(18, 2, 5, 2);
    ctx.lineTo(-5, 2); ctx.quadraticCurveTo(-18, 2, -18, -11);
    ctx.lineTo(-18, -97); ctx.quadraticCurveTo(-18, -110, -5, -110);
    ctx.closePath(); ctx.clip();
    ctx.drawImage(source, 267, 55, 39, 116, -18, -110, 36, 112);
    ctx.restore();
  }

  function draw() {
    frame = 0;
    if (!ready || document.hidden) return;

    // Read all layout before writing. The canvas occupies only the existing gutter.
    const view = scroller.getBoundingClientRect();
    const bounds = ribbon.getBoundingClientRect();
    const card = firstCard.getBoundingClientRect();
    const headerBottom = header?.getBoundingClientRect().bottom || view.top;
    const bottom = Math.min(view.bottom, window.innerHeight);
    const pin = Math.max(view.top, headerBottom) + 8;
    const top = Math.max(pin, bounds.top);
    const height = Math.min(bottom - 18, bounds.bottom) - top;
    const railX = (bounds.left + card.left) / 2;
    // Mirror the machine so the crank fits in the outside margin on phones.
    const scale = Math.min(.24, (card.left - railX - 3) / 156, (railX - view.left - 3) / 236);
    const machineBottom = 8 + (458 - 80) * scale;
    if (scale <= 0 || height < machineBottom + 26 || bounds.top >= bottom || bounds.bottom <= pin) {
      canvas.hidden = true;
      return;
    }
    const progress = clamp((pin - bounds.top) / Math.max(1, bounds.height - (bottom - pin - 18)));
    const left = railX - 236 * scale - 2;
    const width = 392 * scale + 4;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
    canvas.style.left = `${left}px`; canvas.style.top = `${top}px`;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    canvas.dataset.progress = progress.toFixed(4);
    canvas.hidden = false;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const center = railX - left;
    const ox = center + 210 * scale;
    const oy = 8 - 80 * scale;
    // Keep the canvas transparent so the smoked glass remains visible around it.
    ctx.save(); ctx.translate(ox, oy); ctx.scale(-scale, scale);
    ctx.drawImage(body, 0, 0);
    crank(reduced.matches ? 0 : progress * 7 * Math.PI * 2);
    ctx.restore();

    const pastaWidth = 30 * scale;
    const pastaX = center - pastaWidth / 2;
    const outlet = oy + 339 * scale;
    const start = machineBottom + 18;
    const end = start + Math.max(0, height - 8 - start) * progress;
    ctx.save(); ctx.beginPath();
    ctx.moveTo(pastaX, outlet); ctx.lineTo(pastaX + pastaWidth, outlet);
    ctx.lineTo(pastaX + pastaWidth, end - 2);
    ctx.quadraticCurveTo(center, end + 2, pastaX, end - 1);
    ctx.closePath(); ctx.clip();
    ctx.fillStyle = '#d4b264'; ctx.fillRect(pastaX, outlet, pastaWidth, end - outlet + 2);
    const tileHeight = 200 * scale;
    const textureOffset = reduced.matches ? 0 : (scroller.scrollTop * .21) % tileHeight;
    for (let y = outlet - tileHeight + textureOffset; y < end; y += tileHeight) {
      ctx.drawImage(source, 195, 540, 30, 200, pastaX, y, pastaWidth, tileHeight + .25);
    }
    ctx.restore();
  }

  function schedule() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }
  source.addEventListener('load', prepareMachine, { once: true });
  source.addEventListener('error', () => canvas.remove(), { once: true });
  source.src = '/media/chef/letter/pasta-machine.jpg';
  scroller.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule, { once: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', schedule);
  document.fonts.ready.then(schedule);
  const resize = new ResizeObserver(schedule);
  [ribbon, scroller, header].filter(Boolean).forEach(element => resize.observe(element));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  });
}
