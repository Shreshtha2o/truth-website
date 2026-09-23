"use client";

import { useEffect, useRef } from "react";

const SELECTOR = "[data-inquiry]";

export default function InquiryInteractions() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !finePointer.matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!nodes.length) return;

    const cleanups: Array<() => void> = [];

    nodes.forEach((node) => {
      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--ix", `${(x * 12).toFixed(2)}px`);
        node.style.setProperty("--iy", `${(y * 8).toFixed(2)}px`);
      };
      const onLeave = () => {
        node.style.setProperty("--ix", "0px");
        node.style.setProperty("--iy", "0px");
      };
      node.addEventListener("pointermove", onMove, { passive: true });
      node.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <div ref={rootRef} aria-hidden="true" className="inquiry-interactions" />;
}
