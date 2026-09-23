"use client";

import { useEffect, useRef } from "react";

const links = [
  ["SELF", "self"],
  ["THE INQUIRY", "acharya"],
  ["THE WORLD", "earth"],
  ["NATURE", "nature"],
  ["THE VASTNESS", "universe"],
] as const;

export default function ClosingExperience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-close-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={rootRef} className="closing-experience" aria-labelledby="closing-title">
      <div className="closing-orbit closing-orbit-a" aria-hidden="true" />
      <div className="closing-orbit closing-orbit-b" aria-hidden="true" />

      <div className="closing-inner">
        <div className="closing-kicker" data-close-reveal>
          <span>THE JOURNEY CONTINUES</span>
          <i />
        </div>

        <div className="closing-copy" data-close-reveal>
          <p className="closing-overline">01 — THE QUESTION REMAINS</p>
          <h2 id="closing-title">
            DON&apos;T COLLECT
            <br />
            <em>ANSWERS.</em>
          </h2>
          <p className="closing-lede">
            Keep looking. Keep questioning what you assume you know, what you call progress,
            and the one who is asking the question.
          </p>
        </div>

        <div className="closing-actions" data-close-reveal>
          <button type="button" onClick={() => jumpTo("self")}>
            <span>BEGIN AGAIN</span>
            <b>↗</b>
          </button>
          <button type="button" onClick={() => jumpTo("acharya")}>
            <span>RETURN TO THE INQUIRY</span>
            <b>↗</b>
          </button>
        </div>

        <nav className="closing-index" aria-label="Journey chapters" data-close-reveal>
          <span className="closing-index-label">EXPLORE</span>
          <div className="closing-links">
            {links.map(([label, id], index) => (
              <button key={id} type="button" onClick={() => jumpTo(id)}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {label}
              </button>
            ))}
          </div>
        </nav>

        <footer className="closing-footer" data-close-reveal>
          <span>QUESTION WHAT YOU HAVE INHERITED.</span>
          <span>THEN LOOK AGAIN.</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
