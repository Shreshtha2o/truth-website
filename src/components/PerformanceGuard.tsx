"use client";

import { useEffect } from "react";

/**
 * V75 — Performance & Mobile Guard
 *
 * A non-invasive runtime guard for the existing cinematic experience.
 * It does NOT alter particle choreography, particle count, shaders, assets,
 * section markup, or package dependencies. It only detects device/runtime
 * conditions and suppresses non-essential interaction layers when necessary.
 */
export default function PerformanceGuard() {
  useEffect(() => {
    const root = document.documentElement;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(nav.connection?.saveData);
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const slowNetwork = nav.connection?.effectiveType === "slow-2g" || nav.connection?.effectiveType === "2g";

    const setMode = (mode: "full" | "conservative" | "reduced") => {
      root.dataset.v75Performance = mode;
    };

    // Accessibility and explicit data-saving preferences always win.
    if (reducedMotion || saveData) {
      setMode("reduced");
    } else if (!finePointer || lowMemory || slowNetwork) {
      setMode("conservative");
    } else {
      setMode("full");
    }

    const style = document.createElement("style");
    style.setAttribute("data-v75-performance-guard", "true");
    style.textContent = `
      /* V75 — only non-essential layers are affected. */
      html[data-v75-performance="conservative"] .v74-micro-root {
        opacity: .65;
      }
      html[data-v75-performance="conservative"] .v74-cursor-ring {
        transition-duration: .18s;
      }
      html[data-v75-performance="reduced"] .v74-micro-root {
        display: none !important;
      }
      html[data-v75-performance="reduced"] *,
      html[data-v75-performance="reduced"] *::before,
      html[data-v75-performance="reduced"] *::after {
        scroll-behavior: auto !important;
      }
      @media (pointer: coarse) {
        html[data-v75-performance="full"] .v74-micro-root {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);

    // Keep runtime state honest when the tab is backgrounded. This avoids
    // leaving interaction state active while the browser throttles rendering.
    const onVisibility = () => {
      root.dataset.v75Hidden = document.hidden ? "true" : "false";
    };
    document.addEventListener("visibilitychange", onVisibility, { passive: true });
    onVisibility();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      delete root.dataset.v75Performance;
      delete root.dataset.v75Hidden;
      style.remove();
    };
  }, []);

  return null;
}
