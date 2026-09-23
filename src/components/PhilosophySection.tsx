/* V44 — PhilosophySection
 * Isolated editorial section. No changes to ParticleJourney/V42/V43.
 */
"use client";

import { useEffect, useState } from "react";

const LENSES = [
  {
    id: "belief",
    number: "01",
    label: "BELIEF",
    title: "What if certainty is borrowed?",
    body:
      "A belief can feel personal simply because it has lived with us for a long time. The first movement of inquiry is to notice where a conclusion came from before treating it as truth.",
    mark: "BORROWED",
  },
  {
    id: "desire",
    number: "02",
    label: "DESIRE",
    title: "What is driving the search?",
    body:
      "The thing being sought and the reason for seeking it are not always the same. Watching desire closely can reveal how fear, comparison, reward and identity quietly shape our questions.",
    mark: "MOTIVE",
  },
  {
    id: "identity",
    number: "03",
    label: "IDENTITY",
    title: "Who says: this is me?",
    body:
      "Names, roles, memories and preferences describe parts of a person, but inquiry can ask what happens when these descriptions are observed rather than automatically defended.",
    mark: "OBSERVER",
  },
  {
    id: "truth",
    number: "04",
    label: "TRUTH",
    title: "Can truth be inherited?",
    body:
      "A statement can be repeated by millions and still require examination. In this framework, truth is approached through seeing clearly rather than through the comfort of agreement.",
    mark: "SEE",
  },
];

export default function PhilosophySection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v44-philosophy", "true");
    style.textContent = `
      .v44-philosophy {
        position: relative;
        z-index: 7;
        min-height: 115vh;
        padding: 16vh 7vw 18vh;
        overflow: hidden;
        isolation: isolate;
        background:
          radial-gradient(circle at 74% 30%, rgba(111, 82, 255, .09), transparent 27%),
          radial-gradient(circle at 20% 82%, rgba(255, 157, 82, .045), transparent 23%),
          linear-gradient(180deg, rgba(3,3,8,.86), rgba(3,3,8,.97));
      }

      .v44-philosophy::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
        background-size: 80px 80px;
        mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
        opacity: .22;
      }

      .v44-inner {
        width: min(1240px, 100%);
        margin: 0 auto;
        position: relative;
      }

      .v44-topline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        border-top: 1px solid rgba(255,255,255,.13);
        padding-top: 17px;
        margin-bottom: 8vh;
      }

      .v44-kicker,
      .v44-coordinate {
        margin: 0;
        color: rgba(255,255,255,.48);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .24em;
        text-transform: uppercase;
      }

      .v44-coordinate { color: rgba(255,255,255,.28); }

      .v44-heading {
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr);
        gap: 8vw;
        align-items: end;
        margin-bottom: 11vh;
      }

      .v44-title {
        margin: 0;
        color: rgba(255,255,255,.95);
        font: 400 clamp(56px, 8.3vw, 132px)/.82 Georgia, "Times New Roman", serif;
        letter-spacing: -.065em;
      }

      .v44-title span { color: rgba(180,160,255,.9); }

      .v44-description {
        margin: 0 0 5px;
        max-width: 390px;
        color: rgba(255,255,255,.48);
        font: 400 13px/1.8 Arial, sans-serif;
      }

      .v44-question {
        position: absolute;
        top: -55px;
        right: 0;
        writing-mode: vertical-rl;
        color: rgba(255,255,255,.18);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .3em;
      }

      .v44-grid {
        display: grid;
        grid-template-columns: minmax(210px, .45fr) minmax(0, 1.55fr);
        min-height: 530px;
        border-top: 1px solid rgba(255,255,255,.13);
        border-bottom: 1px solid rgba(255,255,255,.13);
      }

      .v44-nav {
        border-right: 1px solid rgba(255,255,255,.11);
        padding: 22px 0;
      }

      .v44-tab {
        width: 100%;
        min-height: 72px;
        border: 0;
        border-left: 2px solid transparent;
        padding: 17px 22px;
        background: transparent;
        color: rgba(255,255,255,.36);
        text-align: left;
        cursor: pointer;
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 15px;
        transition: color .45s ease, background .45s ease, border-color .45s ease;
      }

      .v44-tab:hover { color: rgba(255,255,255,.7); }

      .v44-tab.is-active {
        color: rgba(255,255,255,.92);
        border-left-color: rgba(180,160,255,.85);
        background: rgba(255,255,255,.025);
      }

      .v44-tab-num {
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .14em;
        padding-top: 3px;
        opacity: .62;
      }

      .v44-tab-label {
        font: 500 10px/1.3 Arial, sans-serif;
        letter-spacing: .2em;
      }

      .v44-display {
        position: relative;
        padding: 58px 6vw 55px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 0;
      }

      .v44-display::before {
        content: "TRUTH";
        position: absolute;
        right: 5vw;
        top: 30px;
        color: rgba(255,255,255,.025);
        font: 700 clamp(90px, 15vw, 230px)/.8 Arial, sans-serif;
        letter-spacing: -.08em;
        pointer-events: none;
      }

      .v44-display-top {
        display: flex;
        justify-content: space-between;
        gap: 25px;
        align-items: flex-start;
        position: relative;
      }

      .v44-mark {
        color: rgba(180,160,255,.6);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .22em;
      }

      .v44-stage {
        color: rgba(255,255,255,.25);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .18em;
      }

      .v44-display h3 {
        position: relative;
        margin: 75px 0 25px;
        max-width: 850px;
        color: rgba(255,255,255,.93);
        font: 400 clamp(34px, 5vw, 72px)/.98 Georgia, "Times New Roman", serif;
        letter-spacing: -.045em;
      }

      .v44-display-body {
        position: relative;
        max-width: 610px;
        margin: 0;
        color: rgba(255,255,255,.48);
        font: 400 14px/1.85 Arial, sans-serif;
      }

      .v44-bottom {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 30px;
        margin-top: 70px;
      }

      .v44-rule {
        width: min(360px, 45%);
        height: 1px;
        background: rgba(255,255,255,.12);
      }

      .v44-caption {
        margin: 0;
        color: rgba(255,255,255,.27);
        font: 500 8px/1.5 Arial, sans-serif;
        letter-spacing: .18em;
        text-transform: uppercase;
      }

      .v44-footnote {
        margin: 10vh 0 0;
        max-width: 700px;
        color: rgba(255,255,255,.3);
        font: 400 11px/1.7 Arial, sans-serif;
      }

      .v44-footnote strong {
        color: rgba(255,255,255,.55);
        font-weight: 500;
      }

      @media (max-width: 850px) {
        .v44-philosophy { min-height: auto; padding: 13vh 6vw 14vh; }
        .v44-topline { margin-bottom: 6vh; }
        .v44-heading { grid-template-columns: 1fr; gap: 28px; margin-bottom: 8vh; }
        .v44-question { display: none; }
        .v44-grid { grid-template-columns: 1fr; }
        .v44-nav {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-right: 0;
          border-bottom: 1px solid rgba(255,255,255,.11);
          padding: 0;
        }
        .v44-tab {
          min-height: 66px;
          padding: 15px 8px;
          grid-template-columns: 1fr;
          gap: 7px;
          border-left: 0;
          border-bottom: 2px solid transparent;
        }
        .v44-tab.is-active {
          border-left: 0;
          border-bottom-color: rgba(180,160,255,.85);
        }
        .v44-tab-label { font-size: 8px; letter-spacing: .12em; }
        .v44-display { min-height: 500px; padding: 40px 5vw; }
        .v44-display h3 { margin-top: 60px; }
        .v44-rule { width: 45%; }
      }

      @media (max-width: 520px) {
        .v44-nav { grid-template-columns: repeat(2, 1fr); }
        .v44-tab { min-height: 58px; }
        .v44-display { min-height: 540px; }
        .v44-bottom { align-items: flex-start; flex-direction: column; }
        .v44-rule { width: 100%; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v44-tab { transition: none; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const lens = LENSES[active];

  return (
    <section className="v44-philosophy" id="philosophy" aria-labelledby="v44-title">
      <div className="v44-inner">
        <div className="v44-topline">
          <p className="v44-kicker">03 / PHILOSOPHY</p>
          <p className="v44-coordinate">A FRAMEWORK FOR INQUIRY</p>
        </div>

        <div className="v44-heading">
          <h2 className="v44-title" id="v44-title">
            WHAT IS<br /><span>TRUTH?</span>
          </h2>
          <p className="v44-description">
            Not a collection of conclusions, but a question worth returning to:
            how do belief, desire and identity shape what we call real?
          </p>
          <span className="v44-question">QUESTION THE QUESTION</span>
        </div>

        <div className="v44-grid">
          <nav className="v44-nav" aria-label="Philosophical lenses">
            {LENSES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`v44-tab ${active === index ? "is-active" : ""}`}
                aria-current={active === index ? "step" : undefined}
                onClick={() => setActive(index)}
              >
                <span className="v44-tab-num">{item.number}</span>
                <span className="v44-tab-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <article className="v44-display" aria-live="polite">
            <div className="v44-display-top">
              <span className="v44-mark">{lens.mark}</span>
              <span className="v44-stage">{lens.number} / 04</span>
            </div>

            <div>
              <h3 key={lens.id}>{lens.title}</h3>
              <p className="v44-display-body">{lens.body}</p>
            </div>

            <div className="v44-bottom">
              <div className="v44-rule" />
              <p className="v44-caption">FROM CERTAINTY → OBSERVATION → CLARITY</p>
            </div>
          </article>
        </div>

        <p className="v44-footnote">
          <strong>Note:</strong> This section presents a philosophical framework for
          inquiry, not a claim that every tradition defines truth in the same way.
        </p>
      </div>
    </section>
  );
}
