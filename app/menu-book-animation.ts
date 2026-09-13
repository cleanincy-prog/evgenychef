const decoded = new Map<string, Promise<void>>();
function loadImage(src: string) {
  if (decoded.has(src)) return decoded.get(src)!;
  const image = new Image();
  image.src = src;
  const result = image.decode().catch(error => { decoded.delete(src); throw error; });
  decoded.set(src, result);
  return result;
}

// React owns the recipe content. This controller changes presentation only;
// temporary moving copies live in an otherwise empty, dedicated flight layer.
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
  let mode = "final";
  let animations: Animation[] = [];
  let timeline: Animation | null = null;
  let frame = 0;
  let disposed = false;
  let paused = false;
  let loadVersion = 0;
  let observer: IntersectionObserver | undefined;
  let lastWidth = root.getBoundingClientRect().width;

  function stop() {
    cancelAnimationFrame(frame);
    animations.forEach(animation => animation.cancel());
    animations = []; timeline = null; paused = false;
    pauseButton.hidden = true; pauseButton.textContent = "Пауза";
    root.querySelectorAll(".mb-flights").forEach(layer => layer.replaceChildren());
    root.dataset.playing = "false";
  }
  function setMode(next: "sketch" | "final", announce = true) {
    stop(); mode = next; root.dataset.state = next;
    book.querySelectorAll<HTMLElement>(".mb-art").forEach(art => {
      const plate = Boolean(art.closest(".mb-plate"));
      art.querySelector<HTMLElement>(".mb-photo")!.style.opacity = next === "final" && plate ? "1" : "0";
      art.querySelector<SVGSVGElement>(".mb-pencil")!.style.opacity = next === "final" && plate ? "0" : "1";
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
  function assemble(elapsed: number) {
    book.querySelectorAll<HTMLElement>(".mb-page").forEach((page, pageIndex) => {
      const target = page.querySelector<HTMLElement>(".mb-plate .mb-art")!.getBoundingClientRect();
      const parent = page.getBoundingClientRect();
      const ingredients = [...page.querySelectorAll<HTMLElement>(".mb-ingredient .mb-art")];
      [3, 1, 0, 2].forEach((part, order) => {
        const from = ingredients[part].getBoundingClientRect();
        const flight = document.createElement("div"); flight.className = "mb-flight";
        const art = document.createElement("div"); art.className = "mb-flight-art";
        // Reuse the existing clip definition: no duplicate SVG IDs in the DOM.
        art.append(ingredients[part].querySelector(".mb-photo")!.cloneNode(true));
        flight.append(art);
        Object.assign(flight.style, { left: `${from.left - parent.left}px`, top: `${from.top - parent.top}px`, width: `${from.width}px`, height: `${from.height}px` });
        page.querySelector(".mb-flights")!.append(flight);
        const points = [[.53, .47], [.44, .51], [.60, .65], [.49, .62]];
        const [tx, ty] = points[part];
        const dx = target.left + target.width * tx - from.left - from.width / 2;
        const dy = target.top + target.height * ty - from.top - from.height / 2;
        const animation = animate(flight, [
          { transform: "translate(0,0) scale(1)", opacity: 0 },
          { transform: "translate(0,0) scale(1)", opacity: 1, offset: .08 },
          { transform: `translate(${dx}px,${dy}px) scale(.8)`, opacity: .9, offset: .81 },
          { transform: `translate(${dx}px,${dy}px) scale(.8)`, opacity: 0 },
        ], { delay: Math.max(0, 4150 + order * 400 + pageIndex * 140 - elapsed), duration: 1770, easing: "cubic-bezier(.38,0,.27,1)" });
        if (paused) animation.pause();
      });
    });
  }
  function play() {
    if (playButton.disabled || disposed) return;
    observer?.disconnect();
    if (reduced.matches) { setMode("final"); return; }
    setMode("sketch", false); mode = "animating"; root.dataset.playing = "true";
    pauseButton.hidden = false; playLabel.textContent = "Начать заново";
    timeline = animate(book, [{ opacity: 1 }, { opacity: 1 }], { duration: 9000 });
    const active = timeline;
    book.querySelectorAll<HTMLElement>(".mb-page").forEach((page, pageIndex) => {
      const lag = pageIndex * 140;
      page.querySelectorAll<HTMLElement>(".mb-art").forEach(art => {
        const index = Number(art.dataset.part); const plate = index === 4;
        const start = (plate ? 4570 : 160 + index * 230) + lag;
        art.querySelectorAll<SVGPathElement>(".mb-stroke").forEach((stroke, line) => {
          animate(stroke, [{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }], { delay: start + line * (plate ? 31 : 28), duration: plate ? 1050 : 1320, easing: "ease-in-out" });
        });
        const pencil = art.querySelector(".mb-pencil")!; const photo = art.querySelector(".mb-photo")!;
        if (plate) {
          animate(pencil, [{ opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .65 }, { opacity: 0 }], { delay: 4490 + lag, duration: 3770 });
          animate(photo, [{ opacity: 0 }, { opacity: 1 }], { delay: 6870 + lag, duration: 1350, easing: "ease-in-out" });
        } else {
          animate(photo, [{ opacity: 0 }, { opacity: 1, offset: .18 }, { opacity: 1, offset: .67 }, { opacity: 0 }], { delay: 2410 + index * 200 + lag, duration: 3620, easing: "ease-in-out" });
          animate(pencil, [{ opacity: 1 }, { opacity: 0, offset: .18 }, { opacity: 0, offset: .67 }, { opacity: 1 }], { delay: 2510 + index * 200 + lag, duration: 3470, easing: "ease-in-out" });
        }
      });
      animate(page.querySelector(".mb-assembly-cue path")!, [{ strokeDasharray: "1", strokeDashoffset: "1" }, { strokeDasharray: "1", strokeDashoffset: "0" }], { delay: 3710 + lag, duration: 1200 });
    });
    let sent = false; let last = -1;
    function tick() {
      if (timeline !== active || disposed) return;
      const time = Number(active.currentTime || 0);
      const phase = time < 2450 ? 0 : time < 4050 ? 1 : time < 6870 ? 2 : 3;
      if (phase !== last && !paused) {
        status.textContent = ["Намечаем форму и текстуру ингредиентов.", "Появляются цвет и фактура.", "Собираем компоненты на тарелке.", "Завершаем соусом и зеленью. Подача готова."][phase]; last = phase;
      }
      if (time >= 3950 && !sent) { sent = true; assemble(time); }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    active.finished.then(() => { if (timeline === active && !disposed) { setMode("final"); playLabel.textContent = "Повторить сборку"; } }).catch(() => {});
  }
  function togglePause() {
    if (!timeline) return;
    paused = !paused; animations.forEach(animation => paused ? animation.pause() : animation.play());
    pauseButton.textContent = paused ? "Продолжить" : "Пауза";
    status.textContent = paused ? "Анимация на паузе." : "Продолжаем сборку блюда.";
  }
  function toggleSketch() { observer?.disconnect(); setMode(mode === "final" ? "sketch" : "final"); }
  function visibilityChanged() { if (document.hidden && timeline && !paused) togglePause(); }
  function motionChanged() { if (reduced.matches) { observer?.disconnect(); setMode("final"); } }
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
      playButton.disabled = false; sketchButton.disabled = false; setMode("final");
      if (focusOnMount) {
        root.scrollIntoView({ block: "start", behavior: "instant" });
        book.querySelector<HTMLElement>(".mb-dish-title")?.focus({ preventScroll: true });
      }
      if (!reduced.matches) {
        observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) play(); }, { threshold: .3 });
        observer.observe(root);
      }
    } catch {
      if (disposed || version !== loadVersion) return;
      book.setAttribute("aria-busy", "false"); errorMessage.hidden = false;
      status.textContent = "Описание блюда доступно. Изображение можно загрузить повторно.";
    }
  }
  const resize = new ResizeObserver(() => {
    const width = root.getBoundingClientRect().width;
    if (innerWidth < 240 || Math.abs(width - lastWidth) < 1) return;
    lastWidth = width; if (timeline) setMode("final");
  });
  resize.observe(root);
  playButton.addEventListener("click", play); pauseButton.addEventListener("click", togglePause);
  sketchButton.addEventListener("click", toggleSketch); retryButton.addEventListener("click", load);
  reduced.addEventListener("change", motionChanged); document.addEventListener("visibilitychange", visibilityChanged);
  void load();
  return () => {
    disposed = true; stop(); observer?.disconnect(); resize.disconnect();
    playButton.removeEventListener("click", play); pauseButton.removeEventListener("click", togglePause);
    sketchButton.removeEventListener("click", toggleSketch); retryButton.removeEventListener("click", load);
    reduced.removeEventListener("change", motionChanged); document.removeEventListener("visibilitychange", visibilityChanged);
  };
}
