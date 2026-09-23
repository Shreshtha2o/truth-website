/* CinematicEditorialLayer
 * Isolated add-on for the V41 experience.
 * Does not modify ParticleJourney or its particle/image engine.
 */
"use client";

import { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  { selector: ".chapter-self", label: "SELF" },
  { selector: ".chapter-acharya", label: "THE I" },
  { selector: ".chapter-earth", label: "WORLD" },
  { selector: ".chapter-nature", label: "NATURE" },
  { selector: ".chapter-universe", label: "COSMOS" },
  { selector: ".finale", label: "SEE" },
];

export default function CinematicLayer() {
  const [active, setActive] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Self-contained styles: no globals.css changes required.
    const style = document.createElement("style");
    style.setAttribute("data-cinematic-layer", "true");
    style.textContent = `
      .cinematic-layer-ui {
        position: fixed;
        inset: 0;
        z-index: 18;
        pointer-events: none;
        font-family: inherit;
      }

      .cinematic-rail {
        position: absolute;
        right: 2.2vw;
        top: 50%;
        width: 74px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 13px;
        opacity: .72;
      }

      .cinematic-count {
        font: 500 9px/1 "Arial", sans-serif;
        letter-spacing: .16em;
        white-space: nowrap;
        opacity: .72;
      }

      .cinematic-track {
        position: relative;
        width: 1px;
        height: 118px;
        background: rgba(255,255,255,.18);
        overflow: hidden;
      }

      .cinematic-fill {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: var(--cinematic-progress, 0%);
        background: rgba(255,255,255,.78);
        transform-origin: top;
      }

      .cinematic-label {
        font: 500 8px/1 "Arial", sans-serif;
        letter-spacing: .22em;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: .52;
      }

      .cinematic-scroll {
        position: absolute;
        left: 2.4vw;
        bottom: 28px;
        display: flex;
        align-items: center;
        gap: 9px;
        font: 500 8px/1 "Arial", sans-serif;
        letter-spacing: .22em;
        opacity: .48;
        transition: opacity .5s ease, transform .5s ease;
      }

      .cinematic-scroll i {
        display: block;
        width: 22px;
        height: 1px;
        background: currentColor;
        transform-origin: left;
        animation: cinematic-pulse 2.2s ease-in-out infinite;
      }

      @keyframes cinematic-pulse {
        0%,100% { transform: scaleX(.45); opacity: .35; }
        50% { transform: scaleX(1); opacity: 1; }
      }

      .cinematic-reveal {
        opacity: 0;
        transform: translate3d(0, 26px, 0);
        transition:
          opacity 1.05s cubic-bezier(.16,1,.3,1),
          transform 1.15s cubic-bezier(.16,1,.3,1);
        will-change: opacity, transform;
      }

      .cinematic-reveal.cinematic-visible {
        opacity: 1;
        transform: translate3d(0,0,0);
      }

      .cinematic-reveal[data-cinematic-delay="1"] { transition-delay: .08s; }
      .cinematic-reveal[data-cinematic-delay="2"] { transition-delay: .16s; }
      .cinematic-reveal[data-cinematic-delay="3"] { transition-delay: .24s; }

      @media (max-width: 800px) {
        .cinematic-rail { right: 14px; width: 42px; }
        .cinematic-track { height: 82px; }
        .cinematic-label { font-size: 7px; }
        .cinematic-scroll { left: 18px; bottom: 20px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .cinematic-reveal {
          opacity: 1;
          transform: none;
          transition: none;
        }
        .cinematic-scroll i { animation: none; }
      }
    `;
    document.head.appendChild(style);

    // Add restrained reveals only to editorial content, never to particle/image layers.
    const revealGroups = [
      [".hero-content .eyebrow", ".hero-content h1", ".hero-content .hero-copy", ".hero-content .round-cta"],
      [".chapter-meta", ".chapter-content h2", ".chapter-right p", ".phase-mark"],
      [".finale .eyebrow", ".finale h2", ".finale > p", ".finale .round-cta"],
    ];

    const revealElements: HTMLElement[] = [];
    revealGroups.forEach((selectors) => {
      selectors.forEach((selector) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
          if (el.dataset.cinematicOwned) return;
          el.dataset.cinematicOwned = "true";
          el.classList.add("cinematic-reveal");
          el.dataset.cinematicDelay = String(Math.min(index, 3));
          revealElements.push(el);
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("cinematic-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "-8% 0px -10% 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    const sections = CHAPTERS.map((item) =>
      document.querySelector<HTMLElement>(item.selector)
    );

    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;

        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const progress = Math.max(0, Math.min(1, window.scrollY / max));
        root.style.setProperty("--cinematic-progress", `${progress * 100}%`);

        let best = 0;
        let bestDistance = Infinity;
        sections.forEach((section, index) => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height * 0.5 - window.innerHeight * 0.5);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        setActive(best);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      revealElements.forEach((el) => {
        el.classList.remove("cinematic-reveal", "cinematic-visible");
        delete el.dataset.cinematicOwned;
        delete el.dataset.cinematicDelay;
      });
      style.remove();
    };
  }, []);

  return (
    <div className="cinematic-layer-ui" aria-hidden="true">
      <div className="cinematic-rail">
        <span className="cinematic-count">
          {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
        </span>
        <div className="cinematic-track">
          <span className="cinematic-fill" />
        </div>
        <span className="cinematic-label">{CHAPTERS[active]?.label ?? "SELF"}</span>
      </div>

      <div className="cinematic-scroll">
        <i />
        SCROLL TO QUESTION
      </div>
    </div>
  );
}