 "use client";

import { useMemo, useState } from "react";

type Mode = {
  id: string;
  no: string;
  label: string;
  title: string;
  text: string;
  question: string;
  practice: string;
};

const MODES: Mode[] = [
  {
    id: "define",
    no: "01",
    label: "DEFINE",
    title: "WHAT DOES THE WORD ACTUALLY MEAN?",
    text: "A familiar word can hide several meanings. Before debating a statement, make the important terms concrete enough that both sides know what is being discussed.",
    question: "Which word in this statement carries the most hidden meaning?",
    practice: "Write one working definition without using the same word again.",
  },
  {
    id: "label",
    no: "02",
    label: "LABEL",
    title: "WHEN DOES A DESCRIPTION BECOME A LABEL?",
    text: "Labels can compress a large amount of information into a single word. They can also make further observation unnecessary if the label is treated as the explanation.",
    question: "What specific observations are hidden inside this label?",
    practice: "Replace one label with two observable descriptions.",
  },
  {
    id: "frame",
    no: "03",
    label: "FRAME",
    title: "WHAT DOES THE WORD MAKE EASY TO SEE?",
    text: "Language directs attention. The same event can be described through different frames, each foregrounding some features and leaving others less visible.",
    question: "What changes when I describe the same event with different words?",
    practice: "Write two neutral descriptions of the same event.",
  },
  {
    id: "question",
    no: "04",
    label: "QUESTION",
    title: "WHAT KIND OF QUESTION IS THIS?",
    text: "A question can ask for a fact, a definition, a cause, a prediction, an interpretation, or a value judgment. Confusing these types can make disagreement harder to resolve.",
    question: "What would count as an answer to this question?",
    practice: "Rewrite the question so its answer can be identified.",
  },
  {
    id: "quote",
    no: "05",
    label: "CONTEXT",
    title: "WHAT SURROUNDS THE SENTENCE?",
    text: "A quotation is a fragment of a larger conversation or text. Meaning can depend on who said it, when, why, and what came immediately before and after it.",
    question: "What context would I need before interpreting this sentence?",
    practice: "Locate the surrounding passage or original statement.",
  },
  {
    id: "revise",
    no: "06",
    label: "REVISE",
    title: "CAN THE WORDING BECOME MORE PRECISE?",
    text: "Precision does not always make language complicated. Often it removes unnecessary certainty and makes the actual disagreement smaller and easier to examine.",
    question: "What is the narrowest version of this statement that I can defend?",
    practice: "Remove one vague or absolute word and see what remains.",
  },
];

export default function LanguageLaboratory() {
  const [activeId, setActiveId] = useState("define");
  const [visited, setVisited] = useState<string[]>(["define"]);
  const [note, setNote] = useState("");

  const active = useMemo(
    () => MODES.find((mode) => mode.id === activeId) ?? MODES[0],
    [activeId]
  );

  const progress = Math.round((visited.length / MODES.length) * 100);

  function selectMode(id: string) {
    setActiveId(id);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function nextMode() {
    const index = MODES.findIndex((mode) => mode.id === active.id);
    selectMode(MODES[(index + 1) % MODES.length].id);
  }

  return (
    <section
      id="language-laboratory"
      className="language-laboratory"
      aria-labelledby="language-laboratory-title"
    >
      <div className="language-laboratory__halo" aria-hidden="true" />
      <div className="language-laboratory__grid" aria-hidden="true" />

      <div className="language-laboratory__inner">
        <header className="language-laboratory__header">
          <div>
            <p className="language-laboratory__eyebrow">25 / THE LANGUAGE LABORATORY</p>
            <h2 id="language-laboratory-title">
              LOOK
              <br />
              <em>AT THE WORDS.</em>
            </h2>
          </div>

          <div className="language-laboratory__intro">
            <span>DEFINE → LABEL → FRAME → QUESTION → CONTEXT → REVISE</span>
            <p>
              A practical space for examining how language describes,
              compresses, frames, and sometimes obscures what we are trying to see.
            </p>
          </div>
        </header>

        <div className="language-laboratory__progress">
          <div>
            <span>LAB PASS</span>
            <strong>{visited.length} / {MODES.length}</strong>
          </div>
          <div className="language-laboratory__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="language-laboratory__workspace">
          <nav className="language-laboratory__rail" aria-label="Language modes">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`${active.id === mode.id ? "is-active" : ""} ${
                  visited.includes(mode.id) ? "is-visited" : ""
                }`}
                onClick={() => selectMode(mode.id)}
                aria-pressed={active.id === mode.id}
              >
                <span>{mode.no}</span>
                <b>{mode.label}</b>
                <i>{visited.includes(mode.id) ? "●" : "○"}</i>
              </button>
            ))}
          </nav>

          <article className="language-laboratory__panel">
            <div className="language-laboratory__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>LANGUAGE FIELD</span>
            </div>

            <div className="language-laboratory__content">
              <p className="language-laboratory__micro">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="language-laboratory__text">{active.text}</p>

              <div className="language-laboratory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="language-laboratory__field">
                <label htmlFor="language-note">WORKING NOTE</label>
                <textarea
                  id="language-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Write the word, phrase, or question you are examining…"
                />
              </div>

              <div className="language-laboratory__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="language-laboratory__controls">
              <button type="button" onClick={nextMode}>
                NEXT LENS <span>↗</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setVisited((current) =>
                    current.includes(active.id) ? current : [...current, active.id]
                  )
                }
              >
                {visited.includes(active.id) ? "EXAMINED" : "MARK EXAMINED"}
              </button>
            </div>
          </article>
        </div>

        <footer className="language-laboratory__footer">
          <p>
            <span>METHOD NOTE</span> Language can influence attention and
            interpretation, but wording alone does not determine what is true.
          </p>
          <a href="#attention-laboratory">BACK TO ATTENTION ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
