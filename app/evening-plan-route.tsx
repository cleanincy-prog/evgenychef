"use client";

import { useEffect, useRef, useState } from "react";

type RoutePoint = { x: number; y: number };

// Keep the open tip in the same path so it repaints with the measured curve.
function arrowTo(curve: string, tip: RoutePoint, control: RoutePoint) {
  const length = Math.hypot(tip.x - control.x, tip.y - control.y);
  const ux = (tip.x - control.x) / length;
  const uy = (tip.y - control.y) / length;
  const point = (back: number, side: number) =>
    `${tip.x - ux * back - uy * side},${tip.y - uy * back + ux * side}`;
  return `${curve} M${point(9, -5)} Q${point(4, -1)} ${tip.x},${tip.y} Q${point(4, 1)} ${point(9, 5)}`;
}

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
      let rect = board.getBoundingClientRect();
      const menuSpansColumns = board.classList.contains("process-board-with-menu");
      const conversation = board.querySelector(".conversation-illustration")?.getBoundingClientRect();
      if (conversation) {
        board.style.setProperty("--conversation-row-height", `${Math.ceil(conversation.bottom - rect.top + 56)}px`);
      }
      if (window.matchMedia("(min-width: 901px)").matches) {
        const contentHeight = (selector: string) => {
          const station = board.querySelector(selector);
          const heading = station?.querySelector(".station-heading");
          const last = station?.lastElementChild;
          return heading && last ? last.getBoundingClientRect().bottom - heading.getBoundingClientRect().top : 0;
        };
        const menuDrop = Math.ceil(contentHeight(".station-conversation") * .4);
        board.style.setProperty("--menu-step-drop", `${menuDrop}px`);
        const menuHeading = board.querySelector(".station-menu > .station-heading")?.getBoundingClientRect();
        if (menuSpansColumns && conversation && menuHeading && board.querySelector("[data-menu-visual]")) {
          board.style.setProperty("--menu-visual-clearance", `${Math.ceil(Math.max(24, conversation.bottom - menuHeading.bottom + 40))}px`);
        }
        const preparation = board.querySelector(".station-preparation .station-heading")?.getBoundingClientRect();
        const menuBottom = board.querySelector("[data-menu-visual], .menu-plate")?.getBoundingClientRect().bottom;
        const clearMenu = preparation && menuBottom ? menuBottom - preparation.top + 56 : 0;
        const eveningDrop = Math.ceil(Math.max(contentHeight(".station-preparation") * .4, clearMenu));
        board.style.setProperty("--evening-step-drop", `${eveningDrop}px`);
        // Read the final board size after the flow offsets, so the SVG never scales stale coordinates.
        rect = board.getBoundingClientRect();
      }
      const nodes = [...board.querySelectorAll("[data-route-node]")].map(node => {
        const box = node.getBoundingClientRect();
        return { x: box.left - rect.left + box.width / 2, y: box.top - rect.top + box.height / 2 };
      });
      if (nodes.length !== 4) return;
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      if (window.matchMedia("(max-width: 900px)").matches) {
        setPaths(nodes.slice(0, -1).map((start, index) => {
          const end = nodes[index + 1];
          const top = start.y + 18;
          const bottom = end.y - 18;
          const length = bottom - top;
          return arrowTo(`M${start.x},${top} C${start.x + 3},${top + length / 3} ${end.x - 3},${bottom - length / 3} ${end.x},${bottom}`, { x: end.x, y: bottom }, { x: end.x - 3, y: bottom - length / 3 });
        }));
        return;
      }
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
      const menuVisual = board.querySelector("[data-menu-visual]")?.getBoundingClientRect();
      const sauce = board.querySelector(".plate-label-sauce")?.getBoundingClientRect();
      const aisle = sauce ? sauce.left - rect.left - 24 : menuVisual ? Math.max(mid, departure + 18) : mid;
      const leaveY = sauce ? Math.max(c.y + 35, sauce.bottom - rect.top + 22) : d.y - 30;
      const departureX = menuVisual ? departure : Math.min(departure, aisle - 20);
      const visualTop = menuVisual ? menuVisual.top - rect.top : 0;
      const outerRail = menuVisual ? menuVisual.left - rect.left - 22 : 0;
      // Wide worktables use their outer edge; the chef illustration uses the
      // existing aisle between the columns and below the conversation.
      const menuReturn = menuVisual && menuSpansColumns
        ? `M${b.x - 4},${b.y + 17} C${b.x - 22},${b.y + 42} ${conversationRail},${b.y + 32} ${conversationRail},${b.y + 72} L${conversationRail},${visualTop - 34} Q${conversationRail},${visualTop - 20} ${conversationRail - 14},${visualTop - 20} L${outerRail + 14},${visualTop - 20} Q${outerRail},${visualTop - 20} ${outerRail},${visualTop - 6} L${outerRail},${c.y - 50} Q${outerRail},${c.y - 29} ${c.x},${c.y - 18}`
        : `M${b.x - 4},${b.y + 17} C${b.x - 22},${b.y + 42} ${conversationRail + 3},${b.y + 30} ${conversationRail},${turnY} C${conversationRail - 5},${turnY + (returnY - turnY) / 3} ${conversationRail + 6},${returnY - 20} ${conversationRail - 44},${returnY} C${conversationRail - 94},${returnY + 20} ${c.x + 16},${returnY - 8} ${c.x},${c.y - 18}`;
      setPaths([
        arrowTo(`M${a.x + 5},${a.y - 17} C${a.x + 85},-48 ${b.x - 24},-54 ${b.x - 10},${a.y + 14} S${b.x + 2},${b.y - 85} ${b.x},${b.y - 18}`, { x: b.x, y: b.y - 18 }, { x: b.x + 2, y: b.y - 85 }),
        arrowTo(menuReturn, { x: c.x, y: c.y - 18 }, menuVisual && menuSpansColumns ? { x: outerRail, y: c.y - 29 } : { x: c.x + 16, y: returnY - 8 }),
        arrowTo(`M${departureX},${c.y} C${aisle + 3},${c.y - 3} ${aisle - 4},${leaveY - 28} ${aisle},${leaveY} C${aisle + 2},${d.y + 10} ${d.x - 58},${d.y + 9} ${d.x - 18},${d.y + 1}`, { x: d.x - 18, y: d.y + 1 }, { x: d.x - 58, y: d.y + 9 }),
      ]);
    }
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(board);
    for (const element of board.querySelectorAll(".station-heading, .menu-plate, [data-menu-visual], .plate-label, .conversation-illustration, .preparation-film")) observer.observe(element);
    void document.fonts.ready.then(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <svg ref={svgRef} className="plan-route" aria-hidden="true" preserveAspectRatio="none">
    {paths.map((d, i) => <path className="plan-route-line" key={i} d={d} />)}
  </svg>;
}
