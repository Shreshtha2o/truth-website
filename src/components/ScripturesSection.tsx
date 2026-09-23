/* V45 — ScripturesSection
 * Isolated editorial section. Does not modify V41/V42/V43/V44.
 */
"use client";

import { useEffect, useState } from "react";

const TEXTS = [
  {
    id: "gita",
    number: "01",
    title: "BHAGAVAD GITA",
    subtitle: "THE FIELD OF ACTION",
    description:
      "A dialogue placed in the middle of conflict: action, responsibility, attachment, knowledge and the question of how to act without being lost in the results.",
    prompt: "What is action when the actor is being examined?",
  },
  {
    id: "upanishads",
    number: "02",
    title: "UPANISHADS",
    subtitle: "THE QUESTION OF SELF",
    description:
      "A body of philosophical dialogues and teachings concerned with knowledge, consciousness, reality and the investigation of the self.",
    prompt: "What remains when borrowed identity is questioned?",
  },
  {
    id: "ashtavakra",
    number: "03",
    title: "ASHTAVAKRA GITA",
    subtitle: "THE DIRECT QUESTION",
    description:
      "A radical dialogue traditionally presented as a conversation between Ashtavakra and King Janaka, centered on bondage, freedom and the nature of the self.",
    prompt: "Can freedom be found by becoming something else?",
  },
  {
    id: "voices",
    number: "04",
    title: "OTHER VOICES",
    subtitle: "MANY DOORS",
    description:
      "Across centuries, thinkers and mystics have used different languages to challenge habit, authority, identification and unexamined belief.",
    prompt: "Can different words point toward the same inquiry?",
  },
];

export default function ScripturesSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-v45-scriptures", "true");
    style.textContent = `
      .v45-scriptures {
        position: relative;
        z-index: 7;
        min-height: 112vh;
        padding: 16vh 7vw 18vh;
        overflow: hidden;
        isolation: isolate;
        background:
          radial-gradient(circle at 18% 35%, rgba(255,171,91,.055), transparent 24%),
          radial-gradient(circle at 82% 68%, rgba(120,91,255,.07), transparent 30%),
          linear-gradient(180deg, rgba(3,3,8,.97), rgba(5,5,11,.98));
      }

      .v45-scriptures::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 50% 45%, transparent 0 25%, rgba(255,255,255,.018) 26%, transparent 27%),
          linear-gradient(90deg, transparent 49.95%, rgba(255,255,255,.045) 50%, transparent 50.05%);
        opacity: .55;
      }

      .v45-inner {
        position: relative;
        width: min(1240px, 100%);
        margin: 0 auto;
      }

      .v45-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 30px;
        border-top: 1px solid rgba(255,255,255,.13);
        padding-top: 17px;
        margin-bottom: 9vh;
      }

      .v45-kicker,
      .v45-index {
        margin: 0;
        color: rgba(255,255,255,.45);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v45-index { color: rgba(255,255,255,.24); }

      .v45-heading {
        display: grid;
        grid-template-columns: 1.15fr .85fr;
        gap: 8vw;
        align-items: end;
        margin-bottom: 10vh;
      }

      .v45-title {
        margin: 0;
        color: rgba(255,255,255,.94);
        font: 400 clamp(54px, 8vw, 124px)/.84 Georgia, "Times New Roman", serif;
        letter-spacing: -.06em;
      }

      .v45-title span { color: rgba(185,166,255,.9); }

      .v45-intro {
        margin: 0 0 5px;
        max-width: 390px;
        color: rgba(255,255,255,.46);
        font: 400 13px/1.8 Arial, sans-serif;
      }

      .v45-stage {
        display: grid;
        grid-template-columns: 290px minmax(0, 1fr);
        min-height: 590px;
        border-top: 1px solid rgba(255,255,255,.13);
        border-bottom: 1px solid rgba(255,255,255,.13);
      }

      .v45-list {
        border-right: 1px solid rgba(255,255,255,.11);
        padding: 14px 0;
      }

      .v45-item {
        width: 100%;
        min-height: 128px;
        border: 0;
        border-left: 2px solid transparent;
        padding: 23px 22px;
        display: grid;
        grid-template-columns: 31px 1fr;
        gap: 13px;
        text-align: left;
        background: transparent;
        color: rgba(255,255,255,.34);
        cursor: pointer;
        transition: background .5s ease, color .5s ease, border-color .5s ease;
      }

      .v45-item:hover { color: rgba(255,255,255,.68); }

      .v45-item.is-active {
        color: rgba(255,255,255,.93);
        background: rgba(255,255,255,.028);
        border-left-color: rgba(185,166,255,.82);
      }

      .v45-num {
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .15em;
        padding-top: 2px;
      }

      .v45-item-title {
        display: block;
        font: 500 11px/1.25 Arial, sans-serif;
        letter-spacing: .14em;
      }

      .v45-item-sub {
        display: block;
        margin-top: 9px;
        font: 400 9px/1.4 Arial, sans-serif;
        letter-spacing: .12em;
        color: rgba(255,255,255,.25);
      }

      .v45-item.is-active .v45-item-sub { color: rgba(255,255,255,.44); }

      .v45-reading {
        position: relative;
        padding: 58px 6vw 52px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }

      .v45-reading::after {
        content: attr(data-number);
        position: absolute;
        right: 3vw;
        bottom: -35px;
        color: rgba(255,255,255,.025);
        font: 700 260px/.8 Arial, sans-serif;
        letter-spacing: -.1em;
        pointer-events: none;
      }

      .v45-reading-top {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 1;
      }

      .v45-label {
        color: rgba(185,166,255,.65);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v45-counter {
        color: rgba(255,255,255,.23);
        font: 500 8px/1 Arial, sans-serif;
        letter-spacing: .16em;
      }

      .v45-copy {
        position: relative;
        z-index: 1;
        max-width: 720px;
      }

      .v45-copy h3 {
        margin: 0 0 27px;
        color: rgba(255,255,255,.94);
        font: 400 clamp(35px, 5vw, 72px)/.94 Georgia, "Times New Roman", serif;
        letter-spacing: -.045em;
      }

      .v45-copy h4 {
        margin: 0 0 19px;
        color: rgba(255,255,255,.38);
        font: 500 9px/1 Arial, sans-serif;
        letter-spacing: .24em;
      }

      .v45-description {
        max-width: 620px;
        margin: 0;
        color: rgba(255,255,255,.5);
        font: 400 14px/1.85 Arial, sans-serif;
      }

      .v45-question {
        margin: 43px 0 0;
        padding-left: 18px;
        border-left: 1px solid rgba(185,166,255,.5);
        color: rgba(255,255,255,.72);
        font: 400 17px/1.5 Georgia, "Times New Roman", serif;
      }

      .v45-bottom {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 25px;
      }

      .v45-rule {
        width: 130px;
        height: 1px;
        background: rgba(255,255,255,.18);
      }

      .v45-note {
        margin: 0;
        color: rgba(255,255,255,.25);
        font: 500 8px/1.5 Arial, sans-serif;
        letter-spacing: .18em;
      }

      .v45-foot {
        margin: 8vh 0 0;
        max-width: 760px;
        color: rgba(255,255,255,.3);
        font: 400 11px/1.7 Arial, sans-serif;
      }

      .v45-foot strong {
        color: rgba(255,255,255,.52);
        font-weight: 500;
      }

      @media (max-width: 850px) {
        .v45-scriptures { min-height: auto; padding: 13vh 6vw 15vh; }
        .v45-heading { grid-template-columns: 1fr; gap: 28px; margin-bottom: 8vh; }
        .v45-stage { grid-template-columns: 1fr; }
        .v45-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-right: 0;
          border-bottom: 1px solid rgba(255,255,255,.11);
          padding: 0;
        }
        .v45-item {
          min-height: 94px;
          padding: 16px 12px;
          border-left: 0;
          border-bottom: 2px solid transparent;
        }
        .v45-item.is-active { border-bottom-color: rgba(185,166,255,.82); }
        .v45-reading { min-height: 570px; padding: 42px 5vw; }
      }

      @media (max-width: 520px) {
        .v45-list { grid-template-columns: 1fr 1fr; }
        .v45-item { grid-template-columns: 1fr; gap: 6px; }
        .v45-item-sub { display: none; }
        .v45-reading { min-height: 620px; }
        .v45-question { font-size: 15px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .v45-item { transition: none; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const text = TEXTS[active];

  return (
    <section className="v45-scriptures" id="scriptures" aria-labelledby="v45-title">
      <div className="v45-inner">
        <div className="v45-top">
          <p className="v45-kicker">04 / SCRIPTURES</p>
          <p className="v45-index">READ · QUESTION · CONTINUE</p>
        </div>

        <div className="v45-heading">
          <h2 className="v45-title" id="v45-title">
            READ.<br /><span>QUESTION.</span><br />SEE.
          </h2>
          <p className="v45-intro">
            Texts can become authorities, or they can become invitations to look.
            This section treats scripture as material for inquiry rather than as a
            substitute for inquiry.
          </p>
        </div>

        <div className="v45-stage">
          <nav className="v45-list" aria-label="Texts and traditions">
            {TEXTS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`v45-item ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-current={active === index ? "page" : undefined}
              >
                <span className="v45-num">{item.number}</span>
                <span>
                  <span className="v45-item-title">{item.title}</span>
                  <span className="v45-item-sub">{item.subtitle}</span>
                </span>
              </button>
            ))}
          </nav>

          <article className="v45-reading" data-number={text.number} aria-live="polite">
            <div className="v45-reading-top">
              <span className="v45-label">{text.number}</span>
              <span className="v45-counter">{text.number} / 04</span>
            </div>

            <div className="v45-copy">
              <h4>{text.subtitle}</h4>
              <h3 key={text.id}>{text.title}</h3>
              <p className="v45-description">{text.description}</p>
              <p className="v45-question">{text.prompt}</p>
            </div>

            <div className="v45-bottom">
              <span className="v45-rule" />
              <p className="v45-note">THE TEXT IS NOT THE END OF THE QUESTION</p>
            </div>
          </article>
        </div>

        <p className="v45-foot">
          <strong>Editorial framing:</strong> the descriptions above are concise
          introductions for a visual website, not substitutes for reading the texts
          themselves or for the diversity of interpretations surrounding them.
        </p>
      </div>
    </section>
  );
}
