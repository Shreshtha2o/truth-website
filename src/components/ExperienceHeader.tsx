"use client";

import { useEffect, useState } from "react";

const chapters = [
  ["self", "01", "SELF-EDUCATION"],
  ["acharya", "02", "THE INQUIRY"],
  ["earth", "03", "FROM SELF TO WORLD"],
  ["nature", "04", "NATURE"],
  ["universe", "05", "THE VASTNESS"],
  ["finale", "06", "THE RETURN"],
] as const;

export default function ExperienceHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("self");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      const point = window.scrollY + window.innerHeight * 0.38;
      let current = "self";
      for (const [id] of chapters) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= point) current = id;
      }
      setActive(current);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.experienceMenu = open ? "open" : "closed";
    return () => { delete document.body.dataset.experienceMenu; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="experience-header" aria-label="Experience navigation">
        <button className="experience-mark" onClick={() => go("self")} aria-label="Return to beginning">
          <span className="experience-mark-dot" />
          <span>THE INQUIRY</span>
        </button>

        <div className="experience-status" aria-hidden="true">
          <span className="experience-status-number">{chapters.find(([id]) => id === active)?.[1] ?? "01"}</span>
          <span className="experience-status-line"><i style={{ transform: `scaleX(${progress})` }} /></span>
          <span className="experience-status-total">06</span>
        </div>

        <button
          className={`experience-menu-button${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="experience-menu"
        >
          <span>{open ? "CLOSE" : "INDEX"}</span>
          <b><i /><i /></b>
        </button>
      </header>

      <div className="experience-header-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      <aside id="experience-menu" className={`experience-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="experience-menu-inner">
          <p className="experience-menu-kicker">A MAP OF THE JOURNEY</p>
          <h2>Question.<br /><em>Then see.</em></h2>
          <nav aria-label="Chapters">
            {chapters.map(([id, number, label]) => (
              <button key={id} className={active === id ? "is-active" : ""} onClick={() => go(id)} tabIndex={open ? 0 : -1}>
                <span>{number}</span>
                <strong>{label}</strong>
                <small>{active === id ? "YOU ARE HERE" : "ENTER"}</small>
              </button>
            ))}
          </nav>
          <p className="experience-menu-foot">A visual inquiry into the one who sees, the world being seen, and the assumptions between them.</p>
        </div>
      </aside>
    </>
  );
}
