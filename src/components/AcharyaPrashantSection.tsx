/* V46 — AcharyaPrashantSection
 * Isolated editorial section. Does not modify V41–V45.
 */
"use client";

import { useEffect, useState } from "react";

const TOPICS = [
  {
    id: "inquiry",
    number: "01",
    label: "INQUIRY",
    title: "Question the question.",
    body:
      "Acharya Prashant’s public teaching places self-inquiry at the centre: examine the assumptions, desires and identities through which experience is being interpreted.",
    quote: "The direction turns inward before it turns outward.",
  },
  {
    id: "gita",
    number: "02",
    label: "GITA",
    title: "Read tradition through inquiry.",
    body:
      "His work frequently engages with the Bhagavad Gita, Upanishads and other Indian philosophical texts, presenting them through a contemporary language of self-examination.",
    quote: "A text becomes a mirror when it is used to examine oneself.",
  },
  {
    id: "society",
    number: "03",
    label: "SOCIETY",
    title: "Inner and outer are connected.",
    body:
      "The teaching connects individual conditioning with wider questions around consumption, relationships, education, environment and social behaviour.",
    quote: "The world we create is also shaped by what we are within.",
  },
];

export default function AcharyaPrashantSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v46-acharya", "true");
    style.textContent = `
      .v46-acharya {
        position: relative;
        z-index: 7;
        min-height: 110vh;
        padding: 16vh 7vw 17vh;
        overflow: hidden;
        isolation: isolate;
        background:
          radial-gradient(circle at 77% 28%, rgba(135,106,255,.10), transparent 28%),
          radial-gradient(circle at 18% 76%, rgba(255,169,92,.045), transparent 23%),
          linear-gradient(180deg, rgba(5,5,12,.98), rgba(3,3,8,1));
      }

      .v46-acharya::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(90deg, transparent 0 14%, rgba(255,255,255,.025) 14.05%, transparent 14.1%),
          linear-gradient(90deg, transparent 0 86%, rgba(255,255,255,.025) 86.05%, transparent 86.1%);
        opacity: .55;
      }

      .v46-inner {
        position: relative;
        width: min(1240px, 100%);
        margin: 0 auto;
      }

      .v46-top {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        border-top: 1px solid rgba(255,255,255,.13);
        padding-top: 17px;
        margin-bottom: 8vh;
      }

      .v46-kicker,
      .v46-index {
        margin: 0;
        color: rgba(255,255,255,.46);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v46-index { color: rgba(255,255,255,.25); }

      .v46-heading {
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        gap: 8vw;
        align-items: end;
        margin-bottom: 10vh;
      }

      .v46-title {
        margin: 0;
        color: rgba(255,255,255,.95);
        font: 400 clamp(48px, 7.2vw, 112px)/.86 Georgia, "Times New Roman", serif;
        letter-spacing: -.06em;
      }

      .v46-title span { color: rgba(183,163,255,.9); }

      .v46-intro {
        max-width: 410px;
        margin: 0 0 4px;
        color: rgba(255,255,255,.47);
        font: 400 13px/1.8 Arial, sans-serif;
      }

      .v46-main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 560px;
        border-top: 1px solid rgba(255,255,255,.13);
        border-bottom: 1px solid rgba(255,255,255,.13);
      }

      .v46-portrait {
        position: relative;
        overflow: hidden;
        border-right: 1px solid rgba(255,255,255,.11);
        min-height: 560px;
        background:
          radial-gradient(circle at 50% 42%, rgba(150,120,255,.12), transparent 24%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,.035), transparent 44%);
      }

      .v46-orbit {
        position: absolute;
        width: min(31vw, 380px);
        aspect-ratio: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 50%;
      }

      .v46-orbit::before,
      .v46-orbit::after {
        content: "";
        position: absolute;
        inset: 13%;
        border: 1px solid rgba(183,163,255,.16);
        border-radius: 50%;
      }

      .v46-orbit::after {
        inset: 28%;
        border-color: rgba(255,255,255,.11);
      }

      .v46-core {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 7px;
        height: 7px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: rgba(205,190,255,.9);
        box-shadow: 0 0 35px 10px rgba(140,110,255,.2);
      }

      .v46-side-label {
        position: absolute;
        left: 28px;
        bottom: 28px;
        color: rgba(255,255,255,.28);
        font: 500 8px/1.5 Arial, sans-serif;
        letter-spacing: .2em;
      }

      .v46-side-label strong {
        display: block;
        margin-bottom: 6px;
        color: rgba(255,255,255,.6);
        font-weight: 500;
      }

      .v46-panel {
        padding: 45px 5vw 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 0;
      }

      .v46-tabs {
        display: flex;
        gap: 25px;
        border-bottom: 1px solid rgba(255,255,255,.1);
      }

      .v46-tab {
        position: relative;
        border: 0;
        padding: 0 0 15px;
        background: transparent;
        color: rgba(255,255,255,.32);
        cursor: pointer;
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .2em;
        transition: color .4s ease;
      }

      .v46-tab::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 1px;
        background: rgba(183,163,255,.9);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .45s cubic-bezier(.16,1,.3,1);
      }

      .v46-tab.is-active {
        color: rgba(255,255,255,.9);
      }

      .v46-tab.is-active::after { transform: scaleX(1); }

      .v46-content {
        padding: 60px 0;
        max-width: 650px;
      }

      .v46-number {
        margin: 0 0 17px;
        color: rgba(183,163,255,.62);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .22em;
      }

      .v46-content h3 {
        margin: 0 0 24px;
        color: rgba(255,255,255,.94);
        font: 400 clamp(34px, 4.4vw, 65px)/.96 Georgia, "Times New Roman", serif;
        letter-spacing: -.045em;
      }

      .v46-body {
        margin: 0;
        color: rgba(255,255,255,.48);
        font: 400 13px/1.85 Arial, sans-serif;
      }

      .v46-quote {
        margin: 30px 0 0;
        padding-left: 17px;
        border-left: 1px solid rgba(183,163,255,.55);
        color: rgba(255,255,255,.72);
        font: 400 16px/1.5 Georgia, "Times New Roman", serif;
      }

      .v46-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 25px;
      }

      .v46-note {
        margin: 0;
        max-width: 330px;
        color: rgba(255,255,255,.25);
        font: 500 8px/1.6 Arial, sans-serif;
        letter-spacing: .14em;
      }

      .v46-counter {
        color: rgba(255,255,255,.23);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .15em;
        white-space: nowrap;
      }

      .v46-source {
        margin: 7vh 0 0;
        color: rgba(255,255,255,.28);
        font: 400 11px/1.7 Arial, sans-serif;
      }

      .v46-source strong {
        color: rgba(255,255,255,.52);
        font-weight: 500;
      }

      @media (max-width: 850px) {
        .v46-acharya { min-height: auto; padding: 13vh 6vw 15vh; }
        .v46-heading { grid-template-columns: 1fr; gap: 28px; }
        .v46-main { grid-template-columns: 1fr; }
        .v46-portrait { min-height: 390px; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.11); }
        .v46-orbit { width: min(58vw, 330px); }
        .v46-panel { min-height: 560px; padding: 35px 5vw; }
      }

      @media (max-width: 520px) {
        .v46-tabs { gap: 16px; }
        .v46-tab { font-size: 7px; letter-spacing: .13em; }
        .v46-portrait { min-height: 330px; }
        .v46-panel { min-height: 600px; }
        .v46-content { padding: 45px 0; }
        .v46-bottom { align-items: flex-start; flex-direction: column; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v46-tab, .v46-tab::after { transition: none; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const topic = TOPICS[active];

  return (
    <section className="v46-acharya" id="acharya-prashant" aria-labelledby="v46-title">
      <div className="v46-inner">
        <div className="v46-top">
          <p className="v46-kicker">05 / ACHARYA PRASHANT</p>
          <p className="v46-index">TEACHING · INQUIRY · TEXT</p>
        </div>

        <div className="v46-heading">
          <h2 className="v46-title" id="v46-title">
            THE TEACHER<br />
            <span>AS MIRROR.</span>
          </h2>
          <p className="v46-intro">
            A concise introduction to themes associated with Acharya Prashant’s
            public teaching. The purpose here is to explain the framework, not to
            replace the primary sources.
          </p>
        </div>

        <div className="v46-main">
          <div className="v46-portrait" aria-hidden="true">
            <div className="v46-orbit">
              <div className="v46-core" />
            </div>
            <div className="v46-side-label">
              <strong>THE INQUIRY CONTINUES</strong>
              SELF → TEXT → WORLD
            </div>
          </div>

          <div className="v46-panel">
            <nav className="v46-tabs" aria-label="Teaching themes">
              {TOPICS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`v46-tab ${active === index ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                  aria-selected={active === index}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <article className="v46-content" aria-live="polite">
              <p className="v46-number">{topic.number} / {topic.label}</p>
              <h3 key={topic.id}>{topic.title}</h3>
              <p className="v46-body">{topic.body}</p>
              <p className="v46-quote">{topic.quote}</p>
            </article>

            <div className="v46-bottom">
              <p className="v46-note">
                EXPLORE THE PRIMARY TALKS, BOOKS AND TEXTS FOR FULL CONTEXT.
              </p>
              <span className="v46-counter">{topic.number} / 03</span>
            </div>
          </div>
        </div>

        <p className="v46-source">
          <strong>Framing:</strong> this is a neutral editorial summary of themes
          associated with the public work of Acharya Prashant; individual claims and
          interpretations should be checked against his original talks and writings.
        </p>
      </div>
    </section>
  );
}
