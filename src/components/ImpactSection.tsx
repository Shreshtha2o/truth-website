/* V47 — ImpactSection
 * Isolated editorial section. Does not modify V41–V46.
 */
"use client";

import { useEffect, useState } from "react";

const AREAS = [
  {
    id: "education",
    number: "01",
    label: "EDUCATION",
    title: "What are we actually learning?",
    body:
      "Education can transmit information, skills and credentials. A deeper question is whether it also teaches a person to examine assumptions, attention, desire and the way knowledge is being used.",
    metric: "LEARNING",
    note: "From information → understanding",
  },
  {
    id: "society",
    number: "02",
    label: "SOCIETY",
    title: "What shapes the individual?",
    body:
      "Families, institutions, media, markets and peer groups influence what people value and fear. Seeing these influences clearly can make room for more deliberate choices.",
    metric: "CONDITIONING",
    note: "From conformity → examination",
  },
  {
    id: "environment",
    number: "03",
    label: "ENVIRONMENT",
    title: "What does desire consume?",
    body:
      "Consumption is not only an economic question. It is also connected to desire, identity and the stories that make accumulation feel necessary. Examining the motive can change the action.",
    metric: "CONSUMPTION",
    note: "From excess → responsibility",
  },
  {
    id: "technology",
    number: "04",
    label: "TECHNOLOGY",
    title: "Does a better tool create a better life?",
    body:
      "Technology can extend capability without automatically changing the purposes for which capability is used. The question therefore moves from what a tool can do to why it is being used.",
    metric: "CAPABILITY",
    note: "From power → purpose",
  },
];

export default function ImpactSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v47-impact", "true");
    style.textContent = `
      .v47-impact {
        position: relative;
        z-index: 7;
        min-height: 116vh;
        padding: 16vh 7vw 18vh;
        overflow: hidden;
        isolation: isolate;
        background:
          radial-gradient(circle at 82% 38%, rgba(111,87,255,.08), transparent 29%),
          radial-gradient(circle at 14% 72%, rgba(255,171,91,.04), transparent 24%),
          linear-gradient(180deg, rgba(3,3,8,1), rgba(4,4,10,.98));
      }

      .v47-impact::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(90deg, transparent 0 24.9%, rgba(255,255,255,.035) 25%, transparent 25.1%),
          linear-gradient(90deg, transparent 0 74.9%, rgba(255,255,255,.035) 75%, transparent 75.1%);
        opacity: .42;
      }

      .v47-inner {
        width: min(1240px, 100%);
        margin: 0 auto;
        position: relative;
      }

      .v47-top {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        border-top: 1px solid rgba(255,255,255,.13);
        padding-top: 17px;
        margin-bottom: 8vh;
      }

      .v47-kicker,
      .v47-index {
        margin: 0;
        color: rgba(255,255,255,.45);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v47-index { color: rgba(255,255,255,.24); }

      .v47-heading {
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        gap: 8vw;
        align-items: end;
        margin-bottom: 10vh;
      }

      .v47-title {
        margin: 0;
        color: rgba(255,255,255,.95);
        font: 400 clamp(50px, 7.7vw, 120px)/.84 Georgia, "Times New Roman", serif;
        letter-spacing: -.065em;
      }

      .v47-title span { color: rgba(183,163,255,.9); }

      .v47-intro {
        max-width: 400px;
        margin: 0 0 4px;
        color: rgba(255,255,255,.47);
        font: 400 13px/1.8 Arial, sans-serif;
      }

      .v47-stage {
        display: grid;
        grid-template-columns: minmax(230px,.48fr) minmax(0,1.52fr);
        min-height: 610px;
        border-top: 1px solid rgba(255,255,255,.13);
        border-bottom: 1px solid rgba(255,255,255,.13);
      }

      .v47-nav {
        padding: 12px 0;
        border-right: 1px solid rgba(255,255,255,.11);
      }

      .v47-tab {
        width: 100%;
        min-height: 116px;
        padding: 21px 23px;
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 14px;
        border: 0;
        border-left: 2px solid transparent;
        background: transparent;
        color: rgba(255,255,255,.32);
        text-align: left;
        cursor: pointer;
        transition: background .45s ease, color .45s ease, border-color .45s ease;
      }

      .v47-tab:hover { color: rgba(255,255,255,.68); }

      .v47-tab.is-active {
        color: rgba(255,255,255,.93);
        background: rgba(255,255,255,.026);
        border-left-color: rgba(183,163,255,.85);
      }

      .v47-num {
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .15em;
        padding-top: 3px;
      }

      .v47-tab-label {
        display: block;
        font: 500 10px/1.2 Arial, sans-serif;
        letter-spacing: .18em;
      }

      .v47-tab-note {
        display: block;
        margin-top: 10px;
        color: rgba(255,255,255,.24);
        font: 400 9px/1.4 Arial, sans-serif;
      }

      .v47-tab.is-active .v47-tab-note { color: rgba(255,255,255,.42); }

      .v47-display {
        position: relative;
        padding: 57px 6vw 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }

      .v47-display::before {
        content: attr(data-word);
        position: absolute;
        right: 2vw;
        bottom: -42px;
        color: rgba(255,255,255,.023);
        font: 700 clamp(100px, 16vw, 250px)/.8 Arial, sans-serif;
        letter-spacing: -.1em;
        pointer-events: none;
      }

      .v47-display-top {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 1;
      }

      .v47-display-label {
        color: rgba(183,163,255,.65);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v47-counter {
        color: rgba(255,255,255,.23);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .17em;
      }

      .v47-copy {
        position: relative;
        z-index: 1;
        max-width: 700px;
      }

      .v47-copy h3 {
        margin: 0 0 26px;
        color: rgba(255,255,255,.94);
        font: 400 clamp(35px, 4.8vw, 69px)/.95 Georgia, "Times New Roman", serif;
        letter-spacing: -.045em;
      }

      .v47-body {
        max-width: 620px;
        margin: 0;
        color: rgba(255,255,255,.49);
        font: 400 13px/1.85 Arial, sans-serif;
      }

      .v47-note {
        margin: 38px 0 0;
        padding-left: 17px;
        border-left: 1px solid rgba(183,163,255,.52);
        color: rgba(255,255,255,.68);
        font: 400 16px/1.5 Georgia, "Times New Roman", serif;
      }

      .v47-bottom {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 22px;
      }

      .v47-rule {
        width: 120px;
        height: 1px;
        background: rgba(255,255,255,.18);
      }

      .v47-bottom-text {
        margin: 0;
        color: rgba(255,255,255,.25);
        font: 500 8px/1.5 Arial, sans-serif;
        letter-spacing: .17em;
      }

      .v47-foot {
        max-width: 780px;
        margin: 8vh 0 0;
        color: rgba(255,255,255,.3);
        font: 400 11px/1.7 Arial, sans-serif;
      }

      .v47-foot strong {
        color: rgba(255,255,255,.54);
        font-weight: 500;
      }

      @media (max-width: 850px) {
        .v47-impact { min-height: auto; padding: 13vh 6vw 15vh; }
        .v47-heading { grid-template-columns: 1fr; gap: 28px; margin-bottom: 8vh; }
        .v47-stage { grid-template-columns: 1fr; }
        .v47-nav {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          border-right: 0;
          border-bottom: 1px solid rgba(255,255,255,.11);
          padding: 0;
        }
        .v47-tab {
          min-height: 100px;
          border-left: 0;
          border-bottom: 2px solid transparent;
          padding: 16px 12px;
        }
        .v47-tab.is-active { border-bottom-color: rgba(183,163,255,.85); }
        .v47-display { min-height: 570px; padding: 43px 5vw; }
      }

      @media (max-width: 520px) {
        .v47-nav { grid-template-columns: 1fr 1fr; }
        .v47-tab { grid-template-columns: 1fr; gap: 7px; min-height: 86px; }
        .v47-tab-note { display: none; }
        .v47-display { min-height: 620px; }
        .v47-bottom { align-items: flex-start; flex-direction: column; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v47-tab { transition: none; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const area = AREAS[active];

  return (
    <section className="v47-impact" id="impact" aria-labelledby="v47-title">
      <div className="v47-inner">
        <div className="v47-top">
          <p className="v47-kicker">06 / IMPACT</p>
          <p className="v47-index">SELF → SOCIETY → WORLD</p>
        </div>

        <div className="v47-heading">
          <h2 className="v47-title" id="v47-title">
            INNER CHANGE<br />
            <span>MEETS</span><br />
            THE WORLD.
          </h2>
          <p className="v47-intro">
            The question does not end with the individual. What we value,
            consume and build shapes the world around us.
          </p>
        </div>

        <div className="v47-stage">
          <nav className="v47-nav" aria-label="Areas of impact">
            {AREAS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`v47-tab ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-selected={active === index}
              >
                <span className="v47-num">{item.number}</span>
                <span>
                  <span className="v47-tab-label">{item.label}</span>
                  <span className="v47-tab-note">{item.note}</span>
                </span>
              </button>
            ))}
          </nav>

          <article className="v47-display" data-word={area.metric} aria-live="polite">
            <div className="v47-display-top">
              <span className="v47-display-label">{area.metric}</span>
              <span className="v47-counter">{area.number} / 04</span>
            </div>

            <div className="v47-copy">
              <h3 key={area.id}>{area.title}</h3>
              <p className="v47-body">{area.body}</p>
              <p className="v47-note">{area.note}</p>
            </div>

            <div className="v47-bottom">
              <span className="v47-rule" />
              <p className="v47-bottom-text">THE OUTER WORLD REFLECTS INNER CHOICES</p>
            </div>
          </article>
        </div>

        <p className="v47-foot">
          <strong>Perspective:</strong> this section connects self-inquiry with
          practical domains without claiming that individual awareness alone can
          solve complex social or environmental problems.
        </p>
      </div>
    </section>
  );
}
