// Color is present in the initial HTML. This only handles loading and retry.
export function attachMenuMedia(root: HTMLElement) {
  const book = root.querySelector<HTMLElement>(".mb-book")!;
  const status = root.querySelector<HTMLElement>(".mb-status")!;
  const retry = root.querySelector<HTMLButtonElement>("[data-menu-retry]")!;
  const error = root.querySelector<HTMLElement>(".mb-error")!;
  let disposed = false;
  let version = 0;

  async function load(restart = false) {
    const current = ++version;
    root.dataset.ready = "false";
    book.setAttribute("aria-busy", "true");
    retry.disabled = true;
    error.hidden = true;
    status.textContent = "Загружаю изображения…";
    const images = [...book.querySelectorAll<HTMLImageElement>(".mb-photo img")];
    images.forEach(image => {
      image.loading = "eager";
      if (restart) {
        image.setAttribute("src", image.getAttribute("src")!);
        image.setAttribute("srcset", image.getAttribute("srcset")!);
      }
    });
    try {
      await Promise.all(images.map(image => image.decode()));
      if (disposed || current !== version) return;
      root.dataset.ready = "true";
      book.setAttribute("aria-busy", "false");
      status.textContent = "";
    } catch {
      if (disposed || current !== version) return;
      book.setAttribute("aria-busy", "false");
      error.hidden = false;
      retry.disabled = false;
      status.textContent = "";
    }
  }
  const reload = () => { void load(true); };
  retry.addEventListener("click", reload);
  void load();
  return () => { disposed = true; retry.removeEventListener("click", reload); };
}
