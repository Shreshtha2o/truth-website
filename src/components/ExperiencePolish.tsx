"use client";

import { useEffect, useRef } from "react";

/**
 * V76 — Experience Polish
 *
 * A conservative final-cohesion layer. It does not modify ParticleJourney,
 * section markup, existing CSS files, or animation libraries.
 *
 * Responsibilities:
 * - lightweight section visibility state via IntersectionObserver
 * - cinematic reading-progress signal without a scroll handler
 * - keyboard-safe escape behavior for transient focus states
 * - automatic cleanup of observers/listeners/styles
 * - no DOM polling and no animation frame loop
 */
export default function ExperiencePolish() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.setAttribute("data-v76-experience-polish", "true");
    style.textContent = `
      .v76-polish-root {
        position: fixed;
        inset: 0;
        z-index: 35;
        pointer-events: none;
        overflow: hidden;
      }

      .v76-progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        transform-origin: left center;
        transform: scaleX(0);
        background: linear-gradient(90deg, rgba(185,166,255,.0), rgba(185,166,255,.78), rgba(255,255,255,.35));
        box-shadow: 0 0 14px rgba(185,166,255,.22);
        opacity: .7;
        will-change: transform;
      }

      .v76-corner {
        position: absolute;
        left: 18px;
        bottom: 18px;
        width: 26px;
        height: 26px;
        opacity: 0;
        transition: opacity .5s ease;
      }

      .v76-corner::before,
      .v76-corner::after {
        content: "";
        position: absolute;
        background: rgba(255,255,255,.16);
      }

      .v76-corner::before { left: 0; bottom: 0; width: 26px; height: 1px; }
      .v76-corner::after { left: 0; bottom: 0; width: 1px; height: 26px; }
      .v76-polish-root.is-active .v76-corner { opacity: 1; }

      /* Only sections already marked by this layer receive the tiny editorial cue. */
      .experience > section[data-v76-visible="true"] .eyebrow,
      .experience > section[data-v76-visible="true"] .chapter-meta {
        text-shadow: 0 0 18px rgba(185,166,255,.06);
      }

      @media (max-width: 760px) {
        .v76-corner { left: 12px; bottom: 12px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v76-progress { transition: none; }
        .v76-corner { transition: none; }
      }
    `;
    document.head.appendChild(style);

    const sections = Array.from(document.querySelectorAll<HTMLElement>(
      ".experience > section"
    ));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.v76Visible = entry.isIntersecting ? "true" : "false";
          if (entry.isIntersecting) root.classList.add("is-active");
        }
      },
      { root: null, threshold: 0.12, rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    let raf = 0;
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const progressEl = root.querySelector<HTMLElement>(".v76-progress");
      if (progressEl) progressEl.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        document.body.removeAttribute("data-v76-focus-mode");
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      sections.forEach((section) => delete section.dataset.v76Visible);
      style.remove();
    };
  }, []);

  return (
    <div ref={rootRef} className="v76-polish-root" aria-hidden="true">
      <span className="v76-progress" />
      <span className="v76-corner" />
    </div>
  );
}
