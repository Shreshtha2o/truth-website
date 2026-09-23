"use client";

import { useEffect, useRef } from "react";

/**
 * V74 — Premium Micro-Interactions & Cursor System
 * Isolated enhancement layer. Does not modify ParticleJourney or globals.css.
 */
export default function MicroInteractions() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.setAttribute("data-v74-micro-interactions", "true");
    style.textContent = `
      .v74-micro-root { position: fixed; inset: 0; z-index: 40; pointer-events: none; }
      .v74-cursor,
      .v74-cursor-ring {
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
        border-radius: 999px;
        opacity: 0;
        transform: translate3d(-50%, -50%, 0);
        transition: opacity .25s ease, width .28s cubic-bezier(.2,.8,.2,1), height .28s cubic-bezier(.2,.8,.2,1), border-color .28s ease, background .28s ease;
        will-change: transform;
      }
      .v74-cursor { width: 5px; height: 5px; background: rgba(255,255,255,.92); z-index: 2; }
      .v74-cursor-ring { width: 31px; height: 31px; border: 1px solid rgba(255,255,255,.34); z-index: 1; }
      .v74-micro-root.is-visible .v74-cursor,
      .v74-micro-root.is-visible .v74-cursor-ring { opacity: 1; }
      .v74-micro-root.is-hovering .v74-cursor-ring {
        width: 52px; height: 52px;
        border-color: rgba(185,166,255,.7);
        background: rgba(185,166,255,.045);
      }
      .v74-magnetic {
        position: relative;
        will-change: transform;
      }
      .v74-magnetic::after {
        content: "";
        position: absolute;
        inset: -7px;
        border: 1px solid transparent;
        border-radius: inherit;
        pointer-events: none;
        transition: border-color .35s ease, opacity .35s ease;
        opacity: 0;
      }
      .v74-magnetic:hover::after { border-color: rgba(255,255,255,.11); opacity: 1; }
      .v74-focus-glow { transition: filter .45s ease, opacity .45s ease; }
      .v74-focus-glow:hover { filter: brightness(1.08); }
      @media (pointer: coarse), (max-width: 800px) {
        .v74-micro-root { display: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        .v74-micro-root { display: none; }
      }
    `;
    document.head.appendChild(style);

    const cursor = root.querySelector<HTMLElement>(".v74-cursor");
    const ring = root.querySelector<HTMLElement>(".v74-cursor-ring");
    if (!cursor || !ring) return () => style.remove();

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return () => style.remove();

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(
      ".round-cta, .nav-menu, .v74-magnetic"
    ));

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let active = false;

    const render = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate3d(-50%, -50%, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate3d(-50%, -50%, 0)`;
      raf = requestAnimationFrame(render);
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!active) {
        active = true;
        root.classList.add("is-visible");
      }
    };

    const leave = () => {
      active = false;
      root.classList.remove("is-visible", "is-hovering");
    };

    const enterInteractive = () => root.classList.add("is-hovering");
    const leaveInteractive = () => root.classList.remove("is-hovering");

    const magneticHandlers = magnetic.map((element) => {
      const enter = () => root.classList.add("is-hovering");
      const leaveElement = () => {
        element.style.transform = "";
        root.classList.remove("is-hovering");
      };
      const moveElement = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const strength = element.classList.contains("nav-menu") ? 0.08 : 0.12;
        element.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      };
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leaveElement);
      element.addEventListener("mousemove", moveElement);
      return { element, enter, leaveElement, moveElement };
    });

    const interactive = Array.from(document.querySelectorAll<HTMLElement>(
      "button, a, [role=button], input, textarea, select"
    ));
    interactive.forEach((element) => {
      element.addEventListener("mouseenter", enterInteractive);
      element.addEventListener("mouseleave", leaveInteractive);
    });

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      magneticHandlers.forEach(({ element, enter, leaveElement, moveElement }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leaveElement);
        element.removeEventListener("mousemove", moveElement);
        element.style.transform = "";
      });
      interactive.forEach((element) => {
        element.removeEventListener("mouseenter", enterInteractive);
        element.removeEventListener("mouseleave", leaveInteractive);
      });
      style.remove();
    };
  }, []);

  return (
    <div ref={rootRef} className="v74-micro-root" aria-hidden="true">
      <span className="v74-cursor" />
      <span className="v74-cursor-ring" />
    </div>
  );
}
