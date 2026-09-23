/* V43 — InquirySection
 * A self-contained editorial section.
 * No Three.js, no external packages, no changes to ParticleJourney.
 */
"use client";

import { useEffect, useState, type CSSProperties } from "react";

const IDEAS = [
  {
    number: "01",
    title: "QUESTION THE BORROWED",
    short: "What do you actually know?",
    body:
      "Much of what appears to be certainty arrives before examination: habits, identities, opinions, fears, ambitions. Inquiry begins by separating direct observation from what has simply been inherited.",
    word: "EXAMINE",
  },
  {
    number: "02",
    title: "WATCH THE OBSERVER",
    short: "Who is looking?",
    body:
      "The question is not only about the world outside. Notice the one interpreting it: the expectations, attachments and assumptions that shape what is being seen.",
    word: "OBSERVE",
  },
  {
    number: "03",
    title: "FOLLOW THE QUESTION",
    short: "What remains when certainty falls?",
    body:
      "A serious question does not need an immediate answer. It can remain open long enough for contradiction to become visible and for clarity to emerge without being forced.",
    word: "SEE",
  },
];

export default function InquirySection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v43-inquiry", "true");
    style.textContent = `
      .v43-inquiry {
        position: relative;
        z-index: 7;
        min-height: 100vh;
        padding: 15vh 7vw 16vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        isolation: isolate;
      }

      .v43-inquiry::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 78% 42%, rgba(122, 91, 255, .075), transparent 30%),
          linear-gradient(180deg, rgba(3,3,8,.18), rgba(3,3,8,.76) 15%, rgba(3,3,8,.88));
        pointer-events: none;
        z-index: -2;
      }

      .v43-inquiry::after {
        content: "";
        position: absolute;
        left: 7vw;
        right: 7vw;
        top: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
        opacity: .55;
        z-index: -1;
      }

      .v43-inner {
        width: min(1220px, 100%);
        margin: 0 auto;
      }

      .v43-kicker {
        display: flex;
        align-items: center;
        gap: 11px;
        margin: 0 0 25px;
        color: rgba(255,255,255,.56);
        font: 500 10px/1 "Arial", sans-serif;
        letter-spacing: .24em;
      }

      .v43-kicker i {
        width: 22px;
        height: 1px;
        background: currentColor;
        display: block;
      }

      .v43-head {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
        gap: 7vw;
        align-items: end;
        margin-bottom: 7vh;
      }

      .v43-title {
        margin: 0;
        max-width: 850px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(52px, 7vw, 112px);
        line-height: .88;
        font-weight: 400;
        letter-spacing: -.055em;
        color: rgba(255,255,255,.94);
      }

      .v43-title em {
        font-style: normal;
        color: rgba(181, 160, 255, .92);
      }

      .v43-intro {
        margin: 0 0 4px;
        max-width: 380px;
        color: rgba(255,255,255,.55);
        font: 400 14px/1.75 Arial, sans-serif;
      }

      .v43-ideas {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        border-top: 1px solid rgba(255,255,255,.14);
        border-bottom: 1px solid rgba(255,255,255,.14);
      }

      .v43-card {
        min-height: 370px;
        padding: 28px 30px 34px;
        border: 0;
        border-right: 1px solid rgba(255,255,255,.11);
        background: rgba(255,255,255,.012);
        color: inherit;
        text-align: left;
        cursor: pointer;
        position: relative;
        transition: background .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1);
      }

      .v43-card:last-child { border-right: 0; }

      .v43-card:hover,
      .v43-card.is-active {
        background: rgba(255,255,255,.035);
      }

      .v43-card.is-active {
        transform: translateY(-3px);
      }

      .v43-number {
        color: rgba(255,255,255,.38);
        font: 500 10px/1 Arial, sans-serif;
        letter-spacing: .18em;
      }

      .v43-word {
        position: absolute;
        right: 26px;
        top: 27px;
        color: rgba(181,160,255,.48);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .22em;
      }

      .v43-card h3 {
        margin: 92px 0 13px;
        max-width: 260px;
        color: rgba(255,255,255,.91);
        font: 500 18px/1.12 Arial, sans-serif;
        letter-spacing: -.02em;
      }

      .v43-short {
        margin: 0 0 24px;
        color: rgba(255,255,255,.62);
        font: 400 12px/1.55 Arial, sans-serif;
      }

      .v43-body {
        margin: 0;
        max-width: 340px;
        color: rgba(255,255,255,.43);
        font: 400 12px/1.7 Arial, sans-serif;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity .55s ease, transform .55s cubic-bezier(.16,1,.3,1);
      }

      .v43-card.is-active .v43-body {
        opacity: 1;
        transform: translateY(0);
      }

      .v43-card::after {
        content: "";
        position: absolute;
        left: 30px;
        right: 30px;
        bottom: 0;
        height: 2px;
        transform: scaleX(0);
        transform-origin: left;
        background: rgba(181,160,255,.75);
        transition: transform .65s cubic-bezier(.16,1,.3,1);
      }

      .v43-card.is-active::after {
        transform: scaleX(1);
      }

      .v43-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
        padding-top: 26px;
      }

      .v43-active-note {
        color: rgba(255,255,255,.42);
        font: 500 9px/1.5 Arial, sans-serif;
        letter-spacing: .17em;
        text-transform: uppercase;
      }

      .v43-active-note strong {
        color: rgba(255,255,255,.72);
        font-weight: 500;
      }

      .v43-line {
        flex: 1;
        max-width: 310px;
        height: 1px;
        background: rgba(255,255,255,.12);
        position: relative;
      }

      .v43-line span {
        display: block;
        height: 1px;
        width: calc((var(--v43-active, 0) + 1) * 33.333%);
        background: rgba(255,255,255,.52);
        transition: width .7s cubic-bezier(.16,1,.3,1);
      }

      @media (max-width: 850px) {
        .v43-inquiry { padding: 13vh 6vw; }
        .v43-head { grid-template-columns: 1fr; gap: 30px; }
        .v43-ideas { grid-template-columns: 1fr; }
        .v43-card { min-height: 0; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.11); }
        .v43-card:last-child { border-bottom: 0; }
        .v43-card h3 { margin-top: 55px; }
        .v43-body { opacity: 1; transform: none; }
        .v43-card.is-active { transform: none; }
        .v43-line { display: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v43-card, .v43-body, .v43-card::after, .v43-line span {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <section className="v43-inquiry" id="inquiry" aria-labelledby="inquiry-title">
      <div className="v43-inner">
        <p className="v43-kicker"><i /> THE INQUIRY</p>

        <div className="v43-head">
          <h2 className="v43-title" id="inquiry-title">
            DON’T COLLECT<br />
            <em>ANSWERS.</em><br />
            LEARN TO SEE.
          </h2>
          <p className="v43-intro">
            Self-education is not the accumulation of more information.
            It is the examination of the person who interprets information.
          </p>
        </div>

        <div className="v43-ideas" role="tablist" aria-label="Three stages of inquiry">
          {IDEAS.map((idea, index) => (
            <button
              key={idea.number}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`v43-card ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span className="v43-number">{idea.number}</span>
              <span className="v43-word">{idea.word}</span>
              <h3>{idea.title}</h3>
              <p className="v43-short">{idea.short}</p>
              <p className="v43-body">{idea.body}</p>
            </button>
          ))}
        </div>

        <div className="v43-bottom">
          <p className="v43-active-note">
            EXAMINATION <strong>{String(active + 1).padStart(2, "0")}</strong> / 03
          </p>
          <div className="v43-line" style={{ "--v43-active": active } as CSSProperties}>
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
