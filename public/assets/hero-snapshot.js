// Rasterize only the collage tiles; the portrait stays sharp above this layer.
export function createHeroSnapshot(frame, grid) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-softened';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return { paint() {}, ready() {} };
  const photos = [...grid.querySelectorAll('.collage-tile')];
  let lastWidth = 0;
  let lastHeight = 0;
  let resizeFrame;
  let decoded = false;

  function paint() {
    if (!decoded) return;
    if (frame.dataset.heroIntro === 'running' || frame.dataset.heroIntro === 'revealing') return;
    if (photos.some(photo => {
      const image = photo.querySelector('img');
      return !image.complete || !image.naturalWidth;
    })) return;
    const field = grid.getBoundingClientRect();
    if (!field.width || !field.height) return;
    if (lastWidth === field.width && lastHeight === field.height) return;
    // This layer is intentionally soft: CSS-pixel resolution keeps its texture small.
    const scale = Math.min(1, 1600 / Math.max(field.width, field.height));
    const placements = photos.map(photo => {
      const image = photo.querySelector('img');
      return { image, clip: photo.getBoundingClientRect(), box: image.getBoundingClientRect(), cover: photo.classList.contains('collage-tile') };
    });
    const scene = document.createElement('canvas');
    scene.width = Math.round(field.width * scale);
    scene.height = Math.round(field.height * scale);
    const painter = scene.getContext('2d', { alpha: false });
    if (!painter) return;
    painter.setTransform(scene.width / field.width, 0, 0, scene.height / field.height, 0, 0);
    painter.fillStyle = '#2c2622';
    painter.fillRect(0, 0, field.width, field.height);
    for (const { image, clip, box, cover } of placements) {
      let width = box.width;
      let height = box.height;
      if (cover) {
        const ratio = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        width = image.naturalWidth * ratio;
        height = image.naturalHeight * ratio;
      }
      painter.save();
      painter.beginPath();
      painter.rect(clip.left - field.left, clip.top - field.top, clip.width, clip.height);
      painter.clip();
      painter.drawImage(image, box.left - field.left + (box.width - width) / 2, box.top - field.top + (box.height - height) / 2, width, height);
      painter.restore();
    }
    canvas.width = scene.width;
    canvas.height = scene.height;
    // Bake the blur into pixels once; unsupported engines retain a static CSS fallback.
    const canBlurPixels = 'filter' in context;
    canvas.toggleAttribute('data-css-blur', !canBlurPixels);
    if (canBlurPixels) context.filter = `blur(${1.5 * scale}px)`;
    context.drawImage(scene, 0, 0);
    if (canBlurPixels) context.filter = 'none';
    scene.width = scene.height = 1;
    if (!canvas.isConnected) grid.append(canvas);
    lastWidth = field.width;
    lastHeight = field.height;
    frame.dataset.heroSnapshot = 'ready';
  }

  function queuePaint() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(paint);
  }
  photos.forEach(photo => photo.querySelector('img').addEventListener('load', () => {
    if (!decoded) return;
    lastWidth = 0;
    photo.querySelector('img').decode().then(queuePaint).catch(() => {});
  }));
  new ResizeObserver(queuePaint).observe(grid);
  return { paint, ready() { decoded = true; paint(); } };
}
