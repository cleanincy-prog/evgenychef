const edgeTolerance = 2;

export function serviceScrollStops({ top, height, viewportHeight }, introPart, count) {
  const travel = height - viewportHeight;
  // The first photo starts exactly where the intro leaves; the last photo
  // sits at the end of the sticky track so the next scroll moves the page.
  // Lenis rounds scroll destinations to whole pixels. Round upward so the
  // intro fully clears the first photo and its links remain clickable.
  return Array.from({ length: count }, (_, index) =>
    Math.ceil(top + travel * (introPart + (1 - introPart) * index / (count - 1))));
}

export function serviceScrollAction(stops, scroll, projected, delta) {
  const first = stops[0];
  const last = stops.at(-1);
  const direction = Math.sign(delta);
  if (!direction) return null;

  // Approach either edge through normal scrolling. Clamp only the destination,
  // keeping the movement smooth and the same gesture on the edge photo.
  if (scroll < first - edgeTolerance) {
    return direction > 0 && projected >= first ? { target: first, immediate: false } : null;
  }
  if (scroll > last + edgeTolerance) {
    return direction < 0 && projected <= last ? { target: last, immediate: false } : null;
  }

  // Outward gestures belong to the page, including the intro above the dinner.
  if ((direction < 0 && scroll <= first + edgeTolerance)
    || (direction > 0 && scroll >= last - edgeTolerance)) return null;

  const position = (scroll - first) / (last - first) * (stops.length - 1);
  const next = Math.max(0, Math.min(stops.length - 1, Math.round(position) + direction));
  return { target: stops[next], immediate: true };
}
