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
      const conversation = board.querySelector(".conversation-illustration")?.getBoundingClientRect();
      if (conversation) {
        board.style.setProperty("--conversation-row-height", `${Math.ceil(conversation.bottom - rect.top + 56)}px`);
      }
      const nodes = [...board.querySelectorAll("[data-route-node]")].map(node => {
        const box = node.getBoundingClientRect();
        return { x: box.left - rect.left + box.width / 2, y: box.top - rect.top + box.height / 2 };
      });
      if (nodes.length !== 4) return;
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      const [a, b, c, d] = nodes;
      const mid = b.x - rect.width * .08;
      const leftLabels = [...board.querySelectorAll(".plate-label-main, .plate-label-sauce")]
        .map(label => label.getBoundingClientRect().left - rect.left);
      const labelEdge = leftLabels.length ? Math.min(...leftLabels) : b.x;
      const conversationRight = conversation ? conversation.right - rect.left : mid - 18;
      const conversationRail = Math.min(Math.max(mid, conversationRight + 18), (conversationRight + labelEdge) / 2);
      const mainLabel = board.querySelector(".plate-label-main")?.getBoundingClientRect();
      const turnY = mainLabel ? Math.min(b.y + 80, mainLabel.top - rect.top - 16) : b.y + 80;
      const returnY = c.y - 38;
      const preparationHeading = board.querySelector(".station-preparation .station-heading")?.getBoundingClientRect();
      const departure = preparationHeading ? preparationHeading.right - rect.left + 10 : mid;
      const sauce = board.querySelector(".plate-label-sauce")?.getBoundingClientRect();
      const aisle = sauce ? sauce.left - rect.left - 24 : mid;
      const leaveY = sauce ? Math.max(c.y + 35, sauce.bottom - rect.top + 22) : d.y - 30;
      const departureX = Math.min(departure, aisle - 20);
      setPaths([
        `M${a.x},${a.y} C${a.x},-38 ${b.x},-38 ${b.x},${b.y}`,
        `M${b.x},${b.y} C${b.x},${b.y + 26} ${conversationRail},${b.y + 26} ${conversationRail},${turnY} V${returnY - 38} Q${conversationRail},${returnY} ${conversationRail - 44},${returnY} H${c.x + 44} Q${c.x},${returnY} ${c.x},${c.y}`,
        `M${departureX},${c.y} Q${aisle},${c.y} ${aisle},${c.y + 35} V${leaveY} Q${aisle},${d.y + 15} ${d.x},${d.y}`,
      ]);
    }
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(board);
    for (const element of board.querySelectorAll(".station-heading, .menu-plate, .plate-label, .conversation-illustration")) observer.observe(element);
    void document.fonts.ready.then(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <svg ref={svgRef} className="plan-route" aria-hidden="true" preserveAspectRatio="none">{paths.map((d, i) => <path key={i} d={d} />)}</svg>;
}
