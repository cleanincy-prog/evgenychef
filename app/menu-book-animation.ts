const decoded = new Map<string, Promise<void>>();
function loadImage(src: string) {
  if (decoded.has(src)) return decoded.get(src)!;
  const image = new Image();
  image.src = src;
  const result = image.decode().catch(error => { decoded.delete(src); throw error; });
  decoded.set(src, result);
  return result;
}

// Each illustration stays in place: pencil, ingredient color, then the whole plate.
export function attachMenuAnimation(root: HTMLElement, focusOnMount: boolean) {
  const book = root.querySelector<HTMLElement>(".mb-book")!;
  const status = root.querySelector<HTMLElement>(".mb-status")!;
  const playButton = root.querySelector<HTMLButtonElement>("[data-menu-play]")!;
  const playLabel = root.querySelector<HTMLElement>("[data-menu-play-label]")!;
  const pauseButton = root.querySelector<HTMLButtonElement>("[data-menu-pause]")!;
  const sketchButton = root.querySelector<HTMLButtonElement>("[data-menu-sketch]")!;
  const retryButton = root.querySelector<HTMLButtonElement>("[data-menu-retry]")!;
  const errorMessage = root.querySelector<HTMLElement>(".mb-error")!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let mode = "sketch";
  let animations: Animation[] = [];
  let timeline: Animation | null = null;
  let frame = 0;
  let disposed = false;
  let paused = false;
  let loadVersion = 0;
  let observer: IntersectionObserver | undefined;

  function stop() {
    cancelAnimationFrame(frame);
    animations.forEach(animation => animation.cancel());
    animations = []; timeline = null; paused = false;
    pauseButton.hidden = true; pauseButton.textContent = "Пауза";
    root.dataset.playing = "false";
  }
  function setMode(next: "sketch" | "final", announce = true) {
    stop(); mode = next; root.dataset.state = next; root.dataset.phase = next;
    book.querySelectorAll<HTMLElement>(".mb-art").forEach(art => {
      art.querySelector<HTMLElement>(".mb-photo")!.style.opacity = next === "final" ? "1" : "0";
      art.querySelector<SVGSVGElement>(".mb-pencil")!.style.opacity = next === "final" ? "0" : "1";
      art.querySelectorAll<SVGPathElement>(".mb-stroke").forEach(stroke => { stroke.style.strokeDashoffset = "0"; });
    });
    sketchButton.textContent = next === "final" ? "Вернуть рисунок" : "Показать подачу";
    playLabel.textContent = "Оживить меню";
    if (announce) status.textContent = next === "final" ? "От замысла — к готовому блюду." : "Каждое блюдо начинается с замысла.";
  }
  function animate(element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    const animation = element.animate(keyframes, { fill: "both", ...options });
    animations.push(animation);
    return animation;
  }
  function play() {
    if (playButton.disabled || disposed) return;
    observer?.disconnect();
    if (reduced.matches) { setMode("final"); return; }
    setMode("sketch", false); mode = "animating"; root.dataset.playing = "true";
    pauseButton.hidden = false; playLabel.textContent = "Начать заново";
    timeline = animate(book, [{ opacity: 1 }, { opacity: 1 }], { duration: 6600 });
    const active = timeline;
    book.querySelectorAll<HTMLElement>(".mb-page").forEach((page, pageIndex) => {
      const lag = pageIndex * 120;
      page.querySelectorAll<HTMLElement>(".mb-art").forEach(art => {
        const index = Number(art.dataset.part); const plate = index === 4;
        const start = (plate ? 480 : 160 + index * 230) + lag;
        art.querySelectorAll<SVGPathElement>(".mb-stroke").forEach((stroke, line) => {
          animate(stroke, [{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }], { delay: start + line * (plate ? 35 : 24), duration: plate ? 1200 : 950, easing: "ease-in-out" });
        });
        const pencil = art.querySelector(".mb-pencil")!; const photo = art.querySelector(".mb-photo")!;
        const colorAt = (plate ? 4900 : 2850 + index * 140) + lag;
        const duration = plate ? 1050 : 950;
        animate(pencil, [{ opacity: 1 }, { opacity: 0 }], { delay: colorAt, duration, easing: "ease-in-out" });
        animate(photo, [{ opacity: 0 }, { opacity: 1 }], { delay: colorAt, duration, easing: "ease-in-out" });
      });
    });
    let last = -1;
    function tick() {
      if (timeline !== active || disposed) return;
      const time = Number(active.currentTime || 0);
      const phase = time < 2800 ? 0 : time < 4900 ? 1 : 2;
      if (phase !== last && !paused) {
        root.dataset.phase = ["pencil", "color", "plate"][phase];
        status.textContent = ["Карандашом намечаем форму и текстуру.", "Ингредиенты обретают цвет.", "Появляется готовая подача."][phase]; last = phase;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    active.finished.then(() => { if (timeline === active && !disposed) { setMode("final"); playLabel.textContent = "Повторить"; } }).catch(() => {});
  }
  function togglePause() {
    if (!timeline) return;
    paused = !paused; animations.forEach(animation => paused ? animation.pause() : animation.play());
    pauseButton.textContent = paused ? "Продолжить" : "Пауза";
    status.textContent = paused ? "Анимация на паузе." : "Продолжаем от замысла к подаче.";
  }
  function toggleSketch() { observer?.disconnect(); setMode(mode === "final" ? "sketch" : "final"); }
  function visibilityChanged() { if (document.hidden && timeline && !paused) togglePause(); }
  function motionChanged() { if (reduced.matches) { observer?.disconnect(); if (timeline) setMode("final"); } }
  async function load() {
    const version = ++loadVersion;
    root.dataset.ready = "false"; book.setAttribute("aria-busy", "true");
    playButton.disabled = true; sketchButton.disabled = true; errorMessage.hidden = true;
    status.textContent = "Готовлю страницы…";
    try {
      const photoImages = [...book.querySelectorAll<HTMLImageElement>(".mb-photo img")];
      const pencils = [...book.querySelectorAll<SVGImageElement>(".mb-pencil image")];
      await Promise.all([...new Set([...photoImages.map(image => image.currentSrc || image.src), ...pencils.map(image => image.getAttribute("href")!)])].map(loadImage));
      // decode() also resolves cached responsive images after a page turn.
      photoImages.forEach(image => { image.loading = "eager"; });
      await Promise.all(photoImages.map(image => image.decode()));
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (disposed || version !== loadVersion) return;
      root.dataset.ready = "true"; book.setAttribute("aria-busy", "false");
      playButton.disabled = false; sketchButton.disabled = false; setMode(reduced.matches ? "final" : "sketch");
      if (focusOnMount) {
        root.scrollIntoView({ block: "start", behavior: "instant" });
        book.querySelector<HTMLElement>(".mb-dish-title")?.focus({ preventScroll: true });
      }
      if (!reduced.matches) {
        observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.intersectionRatio >= .3)) play(); }, { threshold: .3 });
        observer.observe(root);
      }
    } catch {
      if (disposed || version !== loadVersion) return;
      book.setAttribute("aria-busy", "false"); errorMessage.hidden = false;
      status.textContent = "Описание блюда доступно. Изображение можно загрузить повторно.";
    }
  }
  playButton.addEventListener("click", play); pauseButton.addEventListener("click", togglePause);
  sketchButton.addEventListener("click", toggleSketch); retryButton.addEventListener("click", load);
  reduced.addEventListener("change", motionChanged); document.addEventListener("visibilitychange", visibilityChanged);
  void load();
  return () => {
    disposed = true; stop(); observer?.disconnect();
    playButton.removeEventListener("click", play); pauseButton.removeEventListener("click", togglePause);
    sketchButton.removeEventListener("click", toggleSketch); retryButton.removeEventListener("click", load);
    reduced.removeEventListener("change", motionChanged); document.removeEventListener("visibilitychange", visibilityChanged);
  };
}
