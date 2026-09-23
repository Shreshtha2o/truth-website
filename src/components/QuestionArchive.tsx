"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  number: string;
  category: string;
  title: string;
  body: string;
  cue: string;
};

const QUESTIONS: Question[] = [
  {
    id: "known",
    number: "01",
    category: "KNOWING",
    title: "WHAT DO I ACTUALLY KNOW?",
    body:
      "Separate what is directly observed from memory, interpretation, assumption, and repetition. The distinction is simple; keeping it alive is the practice.",
    cue: "NAME ONE THING YOU ARE CERTAIN ABOUT. THEN ASK WHY.",
  },
  {
    id: "borrowed",
    number: "02",
    category: "IDENTITY",
    title: "WHICH PARTS OF ME WERE BORROWED?",
    body:
      "Language, roles, expectations, ambitions, and fears can arrive through family, culture, peers, institutions, and media. Examine them without automatically rejecting them.",
    cue: "FIND ONE BELIEF YOU NEVER CHOSE CONSCIOUSLY.",
  },
  {
    id: "desire",
    number: "03",
    category: "DESIRE",
    title: "WHAT AM I TRYING TO GET?",
    body:
      "Behind a choice there may be a desired result: approval, security, pleasure, status, certainty, escape, or something else. Seeing the motive can change how the choice is understood.",
    cue: "COMPLETE: IF I GET THIS, THEN I WILL FINALLY ____.",
  },
  {
    id: "observer",
    number: "04",
    category: "OBSERVATION",
    title: "WHO IS LOOKING?",
    body:
      "The observer is not a neutral camera. Attention, history, expectation, and identity can influence what becomes noticeable and what remains unseen.",
    cue: "NOTICE THE REACTION BEFORE EXPLAINING THE REACTION.",
  },
  {
    id: "truth",
    number: "05",
    category: "TRUTH",
    title: "WHAT WOULD CHANGE MY MIND?",
    body:
      "A conclusion becomes harder to examine when no possible evidence is allowed to challenge it. Ask what observation would genuinely require revision.",
    cue: "DEFINE THE EVIDENCE BEFORE DEFENDING THE CONCLUSION.",
  },
  {
    id: "action",
    number: "06",
    category: "ACTION",
    title: "WHAT FOLLOWS IF THIS IS TRUE?",
    body:
      "An idea can remain abstract until its consequences are traced. Ask what changes in speech, attention, relationships, consumption, work, or decisions.",
    cue: "TURN ONE INSIGHT INTO ONE OBSERVABLE EXPERIMENT.",
  },
  {
    id: "society",
    number: "07",
    category: "SOCIETY",
    title: "WHEN DOES A PRIVATE PATTERN BECOME COLLECTIVE?",
    body:
      "Repeated individual choices can interact with incentives, institutions, markets, technology, and culture. Follow the chain without reducing complex systems to one cause.",
    cue: "TRACE ONE PERSONAL CHOICE THREE STEPS OUTWARD.",
  },
  {
    id: "return",
    number: "08",
    category: "RETURN",
    title: "CAN I LOOK AGAIN?",
    body:
      "Inquiry does not require permanent doubt. It requires the ability to return when new evidence, a new context, or a previously unseen assumption becomes visible.",
    cue: "REVISIT ONE CONCLUSION YOU MADE TOO QUICKLY.",
  },
];

export default function QuestionArchive() {
  const [activeId, setActiveId] = useState("known");
  const [saved, setSaved] = useState<string[]>([]);
  const [filter, setFilter] = useState("ALL");

  const categories = useMemo(
    () => ["ALL", ...Array.from(new Set(QUESTIONS.map((q) => q.category)))],
    []
  );

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? QUESTIONS
        : QUESTIONS.filter((question) => question.category === filter),
    [filter]
  );

  const active = QUESTIONS.find((question) => question.id === activeId) ?? QUESTIONS[0];

  function choose(id: string) {
    setActiveId(id);
  }

  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function next() {
    const index = QUESTIONS.findIndex((question) => question.id === active.id);
    setActiveId(QUESTIONS[(index + 1) % QUESTIONS.length].id);
  }

  return (
    <section className="question-archive" aria-labelledby="question-archive-title">
      <div className="question-archive__noise" aria-hidden="true" />
      <div className="question-archive__inner">
        <header className="question-archive__header">
          <div>
            <p className="question-archive__eyebrow">18 / THE QUESTION ARCHIVE</p>
            <h2 id="question-archive-title">
              KEEP THE
              <br />
              <em>QUESTION.</em>
            </h2>
          </div>
          <div className="question-archive__intro">
            <span>NO ANSWER BANK</span>
            <p>
              A collection of questions to return to. Save the ones that stay
              alive, revisit them, and test them against experience.
            </p>
          </div>
        </header>

        <div className="question-archive__filters" role="tablist" aria-label="Question categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "is-active" : ""}
              onClick={() => setFilter(category)}
              role="tab"
              aria-selected={filter === category}
            >
              {category}
            </button>
          ))}
          <span className="question-archive__saved-count">
            {saved.length.toString().padStart(2, "0")} SAVED
          </span>
        </div>

        <div className="question-archive__layout">
          <nav className="question-archive__list" aria-label="Questions">
            {visible.map((question) => (
              <button
                key={question.id}
                type="button"
                className={`question-archive__item ${
                  active.id === question.id ? "is-active" : ""
                }`}
                onClick={() => choose(question.id)}
              >
                <span>{question.number}</span>
                <strong>{question.title}</strong>
                <i>{saved.includes(question.id) ? "●" : "↗"}</i>
              </button>
            ))}
          </nav>

          <article className="question-archive__reader">
            <div className="question-archive__reader-top">
              <span>{active.number} / {active.category}</span>
              <button
                type="button"
                onClick={() => toggleSaved(active.id)}
                aria-pressed={saved.includes(active.id)}
              >
                {saved.includes(active.id) ? "SAVED" : "SAVE QUESTION"}
              </button>
            </div>

            <div className="question-archive__reader-body">
              <p className="question-archive__reader-kicker">RETURN TO THIS</p>
              <h3>{active.title}</h3>
              <p className="question-archive__body">{active.body}</p>

              <div className="question-archive__cue">
                <span>FIELD CUE</span>
                <p>{active.cue}</p>
              </div>
            </div>

            <div className="question-archive__reader-bottom">
              <button type="button" onClick={next}>
                NEXT QUESTION <span>↗</span>
              </button>
              <span>{active.number} / 08</span>
            </div>
          </article>
        </div>

        <footer className="question-archive__footer">
          <p>
            QUESTIONS ARE NOT ACHIEVEMENTS. <span>THEY ARE PLACES TO LOOK FROM.</span>
          </p>
          <a href="#return">RETURN TO PRACTICE ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
