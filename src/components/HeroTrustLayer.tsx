"use client";

import { useEffect, useState } from "react";

const OFFICIAL_URL = "https://acharyaprashant.org/";

export default function HeroTrustLayer() {
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = Math.max(rect.height, window.innerHeight);
      const passed = Math.max(0, -rect.top);
      const progress = Math.min(1, passed / Math.max(heroHeight * 0.72, 1));
      setHeroProgress(progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        className="hero-disclaimer"
        style={{
          opacity: Math.max(0, 1 - heroProgress),
          transform: `translate3d(${heroProgress * 2}vw, 0, 0)`,
          pointerEvents: heroProgress > 0.92 ? "none" : "auto",
        }}
        aria-label="Website disclaimer"
      >
        <span className="hero-disclaimer-track">
          <span>This is not the official website.</span>
          <span aria-hidden="true">This is not the official website.</span>
        </span>
      </div>

      <a
        className="official-cta"
        href={OFFICIAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit the official Acharya Prashant website"
      >
        <span className="official-cta-border" aria-hidden="true" />
        <span className="official-cta-glow" aria-hidden="true" />
        <span className="official-cta-label">Click here</span>
      </a>
    </>
  );
}
