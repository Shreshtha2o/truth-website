"use client";

import { useEffect } from "react";

/**
 * V73 — VisualPolish
 * Isolated finishing layer. Does not modify ParticleJourney or globals.css.
 * Adds restrained responsive polish, overflow protection, section rhythm,
 * navigation refinement, selection/scrollbar treatment, and subtle reveal cues.
 */
export default function VisualPolish() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v73-visual-polish", "true");
    style.textContent = `
      /* ---------- global guardrails ---------- */
      html { overflow-x: hidden; scroll-behavior: smooth; }
      body { overflow-x: hidden; }
      ::selection { background: rgba(185,166,255,.22); color: rgba(255,255,255,.96); }

      /* ---------- scrollbar ---------- */
      * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.18) transparent; }
      *::-webkit-scrollbar { width: 7px; height: 7px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.16);
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.28); }

      /* ---------- shared section rhythm ---------- */
      .experience > section:not(.hero):not(.story-chapter):not(.finale) {
        position: relative;
        isolation: isolate;
      }

      /* A very restrained transition seam between large editorial modules. */
      .experience > section:not(.hero):not(.story-chapter):not(.finale)::before {
        content: "";
        position: absolute;
        top: 0;
        left: 7vw;
        right: 7vw;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.09), transparent);
        pointer-events: none;
        z-index: 20;
      }

      /* ---------- existing cinematic navigation ---------- */
      .cinematic-navigation,
      .v72-navigation,
      [data-v72-navigation] {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
      }

      /* ---------- buttons / links ---------- */
      .experience a,
      .experience button { -webkit-tap-highlight-color: transparent; }
      .experience a:focus-visible,
      .experience button:focus-visible,
      .experience input:focus-visible,
      .experience textarea:focus-visible {
        outline: 1px solid rgba(185,166,255,.78);
        outline-offset: 4px;
      }

      /* ---------- hero refinement ---------- */
      .hero-content,
      .hero-side-word { will-change: transform; }
      .hero-copy { text-wrap: balance; }

      /* ---------- editorial chapters ---------- */
      .story-chapter .chapter-content h2,
      .finale h2 { text-wrap: balance; }
      .story-chapter .chapter-right p { text-wrap: pretty; }

      /* ---------- large interactive modules ---------- */
      .v45-scriptures,
      .v46-acharya,
      .v47-impact,
      .v48-start-learning,
      .v49-living-practice,
      .v50-return,
      .v51-religion,
      .v52-knowledge,
      .v53-reading-room,
      .v54-manifesto,
      .v55-synthesis,
      .v56-inquiry-lab,
      .v57-learning-atlas,
      .v58-world-mirror,
      .v59-question-archive,
      .v60-reflection-chamber,
      .v61-constellation,
      .v62-knowledge-cascade,
      .v63-evidence-observatory,
      .v64-decision-observatory,
      .v65-attention-laboratory,
      .v66-language-laboratory,
      .v67-dialogue-laboratory,
      .v68-society-world-laboratory,
      .v69-tradition-interpretation,
      .v70-false-real-laboratory,
      .v71-personal-inquiry-journey {
        overflow: clip;
      }

      /* ---------- responsive typography ---------- */
      @media (max-width: 900px) {
        .site-nav { padding-left: 5vw !important; padding-right: 5vw !important; }
        .nav-center { display: none !important; }
        .hero-copy { max-width: 560px !important; }
        .chapter-meta { padding-left: 5vw !important; padding-right: 5vw !important; }
        .chapter-content { padding-left: 5vw !important; padding-right: 5vw !important; }
      }

      @media (max-width: 640px) {
        html { scroll-behavior: auto; }
        .site-nav { min-height: 58px; }
        .brand { letter-spacing: .08em !important; }
        .nav-menu { font-size: 9px !important; }
        .hero-content { padding-left: 6vw !important; padding-right: 6vw !important; }
        .hero-copy { font-size: 13px !important; line-height: 1.65 !important; }
        .round-cta { min-height: 46px; }
        .story-chapter { min-height: 92vh; }
        .chapter-meta { gap: 14px !important; }
        .chapter-content { grid-template-columns: 1fr !important; gap: 34px !important; }
        .chapter-right { max-width: 520px; }
        .experience > section:not(.hero):not(.story-chapter):not(.finale)::before {
          left: 5vw;
          right: 5vw;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}
