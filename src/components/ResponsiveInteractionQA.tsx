"use client";

import { useEffect } from "react";

/**
 * V77 — Responsive & Interaction QA Guard
 * Conservative runtime layer for layout safety and accessibility.
 * Does not modify ParticleJourney, shaders, particle targets, or content.
 */
export default function ResponsiveInteractionQA() {
  useEffect(() => {
    const root = document.documentElement;
    const style = document.createElement("style");
    style.setAttribute("data-v77-responsive-qa", "true");
    style.textContent = `
      /* Prevent accidental horizontal scroll without changing the particle canvas. */
      .experience { overflow-x: clip; }

      /* Keep fixed navigation usable around browser safe areas. */
      .site-nav {
        padding-left: max(22px, env(safe-area-inset-left));
        padding-right: max(22px, env(safe-area-inset-right));
      }

      /* Keyboard users get a clear focus signal without affecting pointer users. */
      :where(a, button, [role="button"], input, textarea, select):focus-visible {
        outline: 1px solid rgba(185,166,255,.82);
        outline-offset: 4px;
      }

      @media (max-width: 760px) {
        .site-nav {
          gap: 12px;
          padding-top: max(14px, env(safe-area-inset-top));
          padding-bottom: 14px;
        }
        .nav-center { display: none; }
        .brand, .nav-menu, .round-cta { min-height: 44px; }
        .round-cta { display: inline-flex; align-items: center; justify-content: center; }
      }

      @media (max-width: 520px) {
        .site-nav { padding-left: max(16px, env(safe-area-inset-left)); padding-right: max(16px, env(safe-area-inset-right)); }
        .nav-menu { letter-spacing: .1em; }
      }

      @media (prefers-reduced-motion: reduce) {
        :where(a, button, [role="button"]) { scroll-behavior: auto !important; }
      }
    `;
    document.head.appendChild(style);

    const updateViewportMode = () => {
      const width = window.innerWidth;
      root.dataset.v77Viewport = width <= 760 ? "mobile" : width <= 1100 ? "tablet" : "desktop";
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewportMode);
      delete root.dataset.v77Viewport;
      style.remove();
    };
  }, []);

  return null;
}
