const decoded = new Map<string, Promise<void>>();
function loadImage(src: string) {
  if (decoded.has(src)) return decoded.get(src)!;
  const image = new Image();
  image.src = src;
  const result = image.decode().catch(error => { decoded.delete(src); throw error; });
  decoded.set(src, result);
  return result;
}

type ViewMode = "scroll" | "sketch" | "final";
const clamp = (value: number) => Math.max(0, Math.min(1, value));

// Scrolling extends individual pencil strokes; color is a single, reversible cut.
export function attachMenuAnimation(root: HTMLElement, focusOnMount: boolean) {
  const book = root.querySelector<HTMLElement>(".mb-book")!;
  const arts = [...book.querySelectorAll<HTMLElement>(".mb-art")];
  const status = root.querySelector<HTMLElement>(".mb-status")!;
  const scrollButton = root.querySelector<HTMLButtonElement>("[data-menu-scroll]")!;
  const colorButton = root.querySelector<HTMLButtonElement>("[data-menu-color]")!;
  const sketchButton = root.querySelector<HTMLButtonElement>("[data-menu-sketch]")!;
  const retryButton = root.querySelector<HTMLButtonElement>("[data-menu-retry]")!;
  const errorMessage = root.querySelector<HTMLElement>(".mb-error")!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let mode: ViewMode = reduced.matches ? "final" : "scroll";
  let frame = 0;
  let disposed = false;
  let ready = false;
  let loadVersion = 0;

  function render() {
    if (disposed) return;
    const viewport = window.innerHeight;
    let colored = 0;
    arts.forEach(art => {
      let progress = 1;
      if (mode === "scroll") {
        const rect = art.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        progress = clamp((viewport * .9 - center) / (viewport * .54));
      }
      const color = mode === "final" || (mode === "scroll" && progress >= .92);
      const draw = mode === "scroll" ? clamp(progress / .82) : 1;
      art.style.setProperty("--draw", draw.toFixed(4));
      art.dataset.progress = progress.toFixed(4);
      art.dataset.color = String(color);
      if (color) colored++;
    });
    root.dataset.state = colored === arts.length ? "final" : colored > 0 ? "mixed" : "sketch";
  }
  function schedule() {
    if (!ready || mode !== "scroll" || frame || disposed) return;
    frame = requestAnimationFrame(() => { frame = 0; render(); });
  }
  function setMode(next: ViewMode) {
    cancelAnimationFrame(frame); frame = 0;
    mode = next; root.dataset.mode = next;
    scrollButton.setAttribute("aria-pressed", String(next === "scroll"));
    colorButton.setAttribute("aria-pressed", String(next === "final"));
    sketchButton.setAttribute("aria-pressed", String(next === "sketch"));
    status.textContent = next === "scroll"
      ? "Прокрутите страницу, чтобы увидеть готовую подачу."
      : next === "sketch" ? "Тонкие линии — первый образ блюда." : "От наброска — к готовому блюду.";
    render();
  }
  function followScroll() { if (!reduced.matches) setMode("scroll"); }
  function showColor() { setMode("final"); }
  function showSketch() { setMode("sketch"); }
  function motionChanged() {
    scrollButton.disabled = !ready || reduced.matches;
    if (reduced.matches) setMode("final");
  }
  async function load() {
    const version = ++loadVersion;
    ready = false; root.dataset.ready = "false"; book.setAttribute("aria-busy", "true");
    scrollButton.disabled = true; colorButton.disabled = true; sketchButton.disabled = true;
    errorMessage.hidden = true; status.textContent = "Готовлю страницы…";
    try {
      const images = [...book.querySelectorAll<HTMLImageElement>(".mb-photo img")];
      await Promise.all([...new Set(images.map(image => image.currentSrc || image.src))].map(loadImage));
      images.forEach(image => { image.loading = "eager"; });
      await Promise.all(images.map(image => image.decode()));
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (disposed || version !== loadVersion) return;
      ready = true; root.dataset.ready = "true"; book.setAttribute("aria-busy", "false");
      scrollButton.disabled = reduced.matches; colorButton.disabled = false; sketchButton.disabled = false;
      if (focusOnMount) {
        root.scrollIntoView({ block: "start", behavior: "instant" });
        book.querySelector<HTMLElement>(".mb-dish-title")?.focus({ preventScroll: true });
      }
      setMode(reduced.matches ? "final" : "scroll");
    } catch {
      if (disposed || version !== loadVersion) return;
      book.setAttribute("aria-busy", "false"); errorMessage.hidden = false;
      sketchButton.disabled = false;
      setMode("sketch");
      status.textContent = "Наброски и описание доступны. Изображение можно загрузить повторно.";
    }
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  scrollButton.addEventListener("click", followScroll);
  colorButton.addEventListener("click", showColor);
  sketchButton.addEventListener("click", showSketch);
  retryButton.addEventListener("click", load);
  reduced.addEventListener("change", motionChanged);
  void load();
  return () => {
    disposed = true; cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    scrollButton.removeEventListener("click", followScroll);
    colorButton.removeEventListener("click", showColor);
    sketchButton.removeEventListener("click", showSketch);
    retryButton.removeEventListener("click", load);
    reduced.removeEventListener("change", motionChanged);
  };
}
