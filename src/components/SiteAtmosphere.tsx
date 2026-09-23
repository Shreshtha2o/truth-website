"use client";

import { useEffect, useRef } from "react";

export default function SiteAtmosphere() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let raf = 0;
    let targetX = 50;
    let targetY = 50;
    let x = 50;
    let y = 50;

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / Math.max(window.innerWidth, 1)) * 100;
      targetY = (event.clientY / Math.max(window.innerHeight, 1)) * 100;
    };

    const tick = () => {
      x += (targetX - x) * 0.045;
      y += (targetY - y) * 0.045;
      root.style.setProperty("--atmo-x", `${x.toFixed(2)}%`);
      root.style.setProperty("--atmo-y", `${y.toFixed(2)}%`);
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="site-atmosphere" aria-hidden="true">
      <div className="site-atmosphere__light" />
      <div className="site-atmosphere__vignette" />
      <div className="site-atmosphere__grain" />
      <div className="site-atmosphere__edge" />
    </div>
  );
}
