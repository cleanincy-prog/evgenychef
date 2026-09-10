"use client";

import { useEffect, useRef, useState } from "react";

// Food anchors are relative to the original, uncropped photograph.
const notes = [
  { name: "main", x: .538, y: .5, left: true, top: true },
  { name: "side", x: .552, y: .65, left: false, top: true },
  { name: "texture", x: .817, y: .576, left: false, top: false },
  { name: "sauce", x: .637, y: .738, left: true, top: false },
];

type Leader = { name: string; path: string; x: number; y: number };

export default function PlateLeaders() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawing, setDrawing] = useState({ width: 1, height: 1, leaders: [] as Leader[] });

  useEffect(() => {
    const figure = ref.current?.closest(".menu-plate");
    const photo = figure?.querySelector<HTMLImageElement>(".menu-plate-photo");
    if (!figure || !photo) return;
    let frame = 0;
    let disposed = false;

    function measure() {
      if (disposed || !figure || !photo) return;
      const bounds = figure.getBoundingClientRect();
      const image = photo.getBoundingClientRect();
      const ratio = Number(photo.getAttribute("width")) / Number(photo.getAttribute("height"));
      const width = Math.min(image.width, image.height * ratio);
      const height = width / ratio;
      const left = image.left - bounds.left + (image.width - width) / 2;
      const top = image.top - bounds.top + (image.height - height) / 2;
      const mobile = window.matchMedia("(max-width: 900px)").matches;
      const leaders = notes.flatMap(note => {
        const label = figure.querySelector(`.plate-label-${note.name}`);
        const text = label?.querySelector(mobile && !note.top ? "dt" : "dd");
        if (!label || !text) return [];
        const range = document.createRange();
        range.selectNodeContents(text);
        const lines = [...range.getClientRects()];
        if (!lines.length) return [];
        const first = lines[0];
        const last = lines[lines.length - 1];
        const startX = mobile
          ? label.getBoundingClientRect().left - bounds.left + 2
          : (note.left ? first.right + 6 : first.left - 6) - bounds.left;
        const startY = mobile
          ? (note.top ? last.bottom + 6 : first.top - 6) - bounds.top
          : (first.top + first.bottom) / 2 - bounds.top;
        const elbowX = startX + (mobile ? 32 : note.left ? 28 : -28);
        const x = left + width * note.x;
        const y = top + height * note.y;
        return [{ name: note.name, path: `M${startX} ${startY} H${elbowX} L${x} ${y}`, x, y }];
      });
      setDrawing({ width: bounds.width, height: bounds.height, leaders });
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(figure);
    observer.observe(photo);
    for (const text of figure.querySelectorAll(".plate-label, dt, dd")) observer.observe(text);
    window.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <svg ref={ref} className="plate-leaders" viewBox={`0 0 ${drawing.width} ${drawing.height}`} aria-hidden="true">
    {drawing.leaders.map(leader => <g key={leader.name}>
      <path data-note={leader.name} d={leader.path} />
      <circle data-note={leader.name} cx={leader.x} cy={leader.y} r="2.8" />
    </g>)}
  </svg>;
}
