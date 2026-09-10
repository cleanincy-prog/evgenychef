"use client";

import { useEffect, useRef, useState } from "react";

// The path follows real heading positions, including after the local fonts load.
export default function EveningPlanRoute() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  useEffect(() => {
    const svg = svgRef.current;
    const board = svg?.parentElement;
    if (!svg || !board) return;
    let frame = 0;
    function measure() {
      if (!svg || !board) return;
      const rect = board.getBoundingClientRect();
      const nodes = [...board.querySelectorAll("[data-route-node]")].map(node => {
        const box = node.getBoundingClientRect();
        return { x: box.left - rect.left + box.width / 2, y: box.top - rect.top + box.height / 2 };
      });
      if (nodes.length !== 4) return;
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      const [a, b, c, d] = nodes;
      const mid = b.x - rect.width * .08;
      const preparationHeading = board.querySelector(".station-preparation .station-heading")?.getBoundingClientRect();
      const departure = preparationHeading ? preparationHeading.right - rect.left + 10 : mid;
      const sauce = board.querySelector(".plate-label-sauce")?.getBoundingClientRect();
      const aisle = sauce ? sauce.left - rect.left - 24 : mid;
      const leaveY = sauce ? Math.max(c.y + 35, sauce.bottom - rect.top + 22) : d.y - 30;
      const departureX = Math.min(departure, aisle - 20);
      setPaths([
        `M${a.x},${a.y} C${a.x},-38 ${b.x},-38 ${b.x},${b.y}`,
        `M${b.x},${b.y} C${mid},${b.y + 100} ${mid},${c.y - 110} ${mid - 110},${c.y - 62} S${c.x},${c.y - 82} ${c.x},${c.y}`,
        `M${departureX},${c.y} Q${aisle},${c.y} ${aisle},${c.y + 35} V${leaveY} Q${aisle},${d.y + 15} ${d.x},${d.y}`,
      ]);
    }
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(board);
    for (const element of board.querySelectorAll(".station-heading, .menu-plate, .plate-label")) observer.observe(element);
    void document.fonts.ready.then(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <svg ref={svgRef} className="plan-route" aria-hidden="true" preserveAspectRatio="none">{paths.map((d, i) => <path key={i} d={d} />)}</svg>;
}
