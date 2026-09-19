"use client";

import { useEffect, useRef, useState } from "react";
import "./dish-notes.css";

/* eslint-disable @next/next/no-img-element -- the approved photograph uses explicit local responsive sources */

type Leader = { path: string; x: number; y: number };

export default function DishNotes() {
  const figureRef = useRef<HTMLElement>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  useEffect(() => {
    const figure = figureRef.current;
    const picture = figure?.querySelector(".dish-notes-photo");
    if (!figure || !picture) return;
    let frame = 0;
    const measure = () => {
      const bounds = figure.getBoundingClientRect();
      const photo = picture.getBoundingClientRect();
      const stacked = getComputedStyle(figure).getPropertyValue("--dish-stacked").trim() === "1";
      const points = [
        { name: "duck", x: .2183, y: .4656 },
        { name: "puree", x: .3171, y: .7678 },
        { name: "sauce", x: .5244, y: .769 },
      ];
      setLeaders(points.map(point => {
        const note = figure.querySelector(`.atlas-note--${point.name}`)!.getBoundingClientRect();
        const x = photo.left - bounds.left + photo.width * point.x;
        const y = photo.top - bounds.top + photo.height * point.y;
        const right = point.name === "sauce";
        const top = point.name === "duck";
        const sx = stacked
          ? note.left - bounds.left + note.width * (right ? .25 : .72)
          : (right ? note.left - 9 : note.right + 9) - bounds.left;
        const sy = stacked
          ? (top ? note.bottom + 8 : note.top - 8) - bounds.top
          : note.bottom - bounds.top - 8;
        const path = stacked
          ? `M${sx},${sy} C${sx},${sy + (top ? 32 : -32)} ${x - 12},${y + (top ? -28 : 28)} ${x},${y}`
          : `M${sx},${sy} C${sx + (right ? -50 : 50)},${sy + 8} ${x + (right ? 40 : -40)},${y + 12} ${x},${y}`;
        return { path, x, y };
      }));
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(figure);
    observer.observe(picture);
    for (const note of figure.querySelectorAll(".atlas-note")) observer.observe(note);
    void document.fonts.ready.then(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <section className="dish-notes" id="dish-notes" data-dish-visual aria-labelledby="dish-notes-title">
    <h3 id="dish-notes-title">Как складывается вкус</h3>
    <figure className="dish-notes-layout" ref={figureRef}>
      <img className="dish-notes-photo" src="/media/menu/atlas-dish/plate-820.webp"
        srcSet="/media/menu/atlas-dish/plate-410.webp 410w, /media/menu/atlas-dish/plate-820.webp 820w"
        sizes="(max-width: 620px) calc(100vw - 69px), (max-width: 900px) min(496px, calc(90.5vw - 34px)), min(44vw, 930px)"
        width={820} height={844} loading="lazy" decoding="async"
        alt="Блюдо Atlas, вид сверху: ломтики утиной грудки, пюре из фенхеля и батата, бок-чой, эдамаме, грибы шиитаке, хрустящие чипсы и соус с юдзу на кремовой тарелке." />
      <p className="atlas-note atlas-note--duck">Утка остаётся сочной,<br />{" "}а кожица — хрустящей.</p>
      <p className="atlas-note atlas-note--puree">Пюре из фенхеля — нежность,<br />{" "}батат — сладость.</p>
      <p className="atlas-note atlas-note--vegetables">Овощи добавляют свежесть,<br />{" "}грибы — насыщенность,<br />{" "}чипсы — хруст.</p>
      <p className="atlas-note atlas-note--sauce">Соус с юдзу объединяет вкусы<br />{" "}и добавляет кислинку.</p>
      <svg className="dish-notes-leaders" aria-hidden="true">
        {leaders.map((leader, index) => <g key={index}>
          <path d={leader.path} /><circle cx={leader.x} cy={leader.y} r="2.5" />
        </g>)}
      </svg>
      <figcaption className="dish-notes-credit">
        <a href="https://www.instagram.com/p/DKR7q48OzOD/?img_index=2" target="_blank" rel="noopener noreferrer">Фото: Atlas / @mashburnphoto</a>
      </figcaption>
    </figure>
  </section>;
}
