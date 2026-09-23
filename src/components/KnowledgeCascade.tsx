"use client";

import { useMemo, useState } from "react";

type Stage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  question: string;
};

const STAGES: Stage[] = [
  {
    id: "signal",
    number: "01",
    label: "SIGNAL",
    title: "SOMETHING APPEARS.",
    description:
      "A sensation, observation, statement, event, or piece of information enters attention. It is the beginning of examination, not yet a conclusion.",
    question: "What exactly entered my attention?",
  },
  {
    id: "interpretation",
    number: "02",
    label: "INTERPRETATION",
    title: "THE MIND GIVES IT A STORY.",
    description:
      "Memory, language, expectations, and prior beliefs can organize a signal into meaning. The meaning may be useful, incomplete, or mistaken.",
    question: "What meaning did I add?",
  },
  {
    id: "belief",
    number: "03",
    label: "BELIEF",
    title: "THE STORY BECOMES CERTAIN.",
    description:
      "Repeated interpretations can harden into assumptions or beliefs. Once protected, they may filter which evidence is noticed.",
    question: "What would make me examine this belief?",
  },
  {
    id: "inquiry",
    number: "04",
    label: "INQUIRY",
    title: "THE ASSUMPTION BECOMES VISIBLE.",
    description:
      "Inquiry separates evidence from interpretation and asks what is actually knowable, what is uncertain, and what remains to be tested.",
    question: "Which part can I check?",
  },
  {
    id: "clarity",
    number: "05",
    label: "CLARITY",
    title: "THE FIELD GETS CLEANER.",
    description:
      "Clarity here does not mean having every answer. It means seeing distinctions that were previously mixed together.",
    question: "What can I now see that I could not see before?",
  },
  {
    id: "action",
    number: "06",
    label: "ACTION",
    title: "SEEING MEETS LIFE.",
    description:
      "A clearer view can be tested in practice. The next action becomes another opportunity for observation rather than proof of a fixed identity.",
    question: "What small action can test this understanding?",
  },
];

export default function KnowledgeCascade() {
  const [activeId, setActiveId] = useState("signal");
  const [opened, setOpened] = useState<string[]>(["signal"]);

  const active = useMemo(
    () => STAGES.find((stage) => stage.id === activeId) ?? STAGES[0],
    [activeId]
  );

  function choose(id: string) {
    setActiveId(id);
    setOpened((current) => (current.includes(id) ? current : [...current, id]));
  }

  function next() {
    const index = STAGES.findIndex((stage) => stage.id === active.id);
    choose(STAGES[(index + 1) % STAGES.length].id);
  }

  return (
    <section
      id="knowledge-cascade"
      className="knowledge-cascade"
      aria-labelledby="knowledge-cascade-title"
    >
      <div className="knowledge-cascade__light" aria-hidden="true" />
      <div className="knowledge-cascade__grid" aria-hidden="true" />

      <div className="knowledge-cascade__inner">
        <header className="knowledge-cascade__header">
          <div>
            <p className="knowledge-cascade__eyebrow">21 / THE KNOWLEDGE CASCADE</p>
            <h2 id="knowledge-cascade-title">
              FROM SIGNAL
              <br />
              <em>TO SEEING.</em>
            </h2>
          </div>

          <div className="knowledge-cascade__intro">
            <span>HOW DOES A BELIEF FORM?</span>
            <p>
              Follow one possible chain from what enters attention to what
              becomes belief, inquiry, clarity, and action. The sequence is a
              model for examination—not a universal law of cognition.
            </p>
          </div>
        </header>

        <div className="knowledge-cascade__flow">
          <div className="knowledge-cascade__steps" aria-label="Knowledge cascade stages">
            {STAGES.map((stage, index) => (
              <div key={stage.id} className="knowledge-cascade__step-wrap">
                <button
                  type="button"
                  className={`knowledge-cascade__step ${
                    active.id === stage.id ? "is-active" : ""
                  } ${opened.includes(stage.id) ? "is-opened" : ""}`}
                  onClick={() => choose(stage.id)}
                  aria-pressed={active.id === stage.id}
                >
                  <span>{stage.number}</span>
                  <strong>{stage.label}</strong>
                  <i>{opened.includes(stage.id) ? "●" : "○"}</i>
                </button>
                {index < STAGES.length - 1 && (
                  <span className="knowledge-cascade__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <article className="knowledge-cascade__reading">
            <div className="knowledge-cascade__reading-top">
              <span>{active.number} / {active.label}</span>
              <span>{opened.length.toString().padStart(2, "0")} / 06 EXPLORED</span>
            </div>

            <div className="knowledge-cascade__reading-body">
              <p className="knowledge-cascade__kicker">CURRENT STAGE</p>
              <h3>{active.title}</h3>
              <p className="knowledge-cascade__description">{active.description}</p>

              <div className="knowledge-cascade__question">
                <span>INQUIRY</span>
                <p>{active.question}</p>
              </div>
            </div>

            <div className="knowledge-cascade__reading-bottom">
              <button type="button" onClick={next}>
                FOLLOW THE CASCADE <span>↗</span>
              </button>
              <div className="knowledge-cascade__mini-progress">
                {STAGES.map((stage) => (
                  <i key={stage.id} className={opened.includes(stage.id) ? "is-on" : ""} />
                ))}
              </div>
            </div>
          </article>
        </div>

        <footer className="knowledge-cascade__footer">
          <p>
            <span>REMEMBER</span> A model can help you see a pattern. It should
            not replace direct examination.
          </p>
          <a href="#knowledge">RETURN TO KNOWLEDGE ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
