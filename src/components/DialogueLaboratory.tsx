 "use client";

import { useMemo, useState } from "react";

type Lens = {
  id: string;
  no: string;
  label: string;
  title: string;
  text: string;
  question: string;
  practice: string;
};

const LENSES: Lens[] = [
  {
    id: "listen",
    no: "01",
    label: "LISTEN",
    title: "WHAT WAS ACTUALLY SAID?",
    text: "Conversation can become distorted when the mind prepares its reply before the other person has finished. Start with the words, tone, and concrete request that were actually present.",
    question: "What did I hear before I interpreted it?",
    practice: "Write the shortest accurate version of the other person’s point.",
  },
  {
    id: "mirror",
    no: "02",
    label: "MIRROR",
    title: "WHAT DID IT TRIGGER IN ME?",
    text: "A response can contain information about the conversation and information about the responder. Separating the two makes it easier to examine both without collapsing them.",
    question: "Which part of my reaction belongs to the present situation?",
    practice: "Name one immediate reaction without turning it into a judgment.",
  },
  {
    id: "clarify",
    no: "03",
    label: "CLARIFY",
    title: "WHAT DOES THE OTHER PERSON MEAN?",
    text: "Words that sound obvious can carry different meanings for different people. Clarification can turn an argument about words into an examination of the underlying issue.",
    question: "What specific meaning am I assuming?",
    practice: "Ask one concrete clarification question instead of defending your interpretation.",
  },
  {
    id: "steelman",
    no: "04",
    label: "RESTATE",
    title: "CAN I STATE THEIR POINT FAIRLY?",
    text: "You do not have to agree with an argument to represent it accurately. Restating another position before responding can expose where the actual disagreement lies.",
    question: "Would the other person recognize my summary?",
    practice: "State the strongest version you can understand before answering.",
  },
  {
    id: "boundary",
    no: "05",
    label: "BOUNDARY",
    title: "WHAT NEEDS TO BE SAID CLEARLY?",
    text: "Careful dialogue does not require endless agreement. A clear boundary, disagreement, or refusal can be more honest than an unclear attempt to avoid friction.",
    question: "What am I actually willing and unwilling to do?",
    practice: "Express one boundary in one direct sentence.",
  },
  {
    id: "return",
    no: "06",
    label: "RETURN",
    title: "WHAT IS THE QUESTION NOW?",
    text: "After a difficult exchange, return to the underlying question. The conversation may have generated new information, exposed an assumption, or shown that the original question was incomplete.",
    question: "What should we examine now that we could not see before?",
    practice: "Write one question that moves the conversation back to substance.",
  },
];

export default function DialogueLaboratory() {
  const [activeId, setActiveId] = useState("listen");
  const [visited, setVisited] = useState<string[]>(["listen"]);
  const [note, setNote] = useState("");

  const active = useMemo(
    () => LENSES.find((lens) => lens.id === activeId) ?? LENSES[0],
    [activeId]
  );

  const progress = Math.round((visited.length / LENSES.length) * 100);

  function selectLens(id: string) {
    setActiveId(id);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function nextLens() {
    const index = LENSES.findIndex((lens) => lens.id === active.id);
    selectLens(LENSES[(index + 1) % LENSES.length].id);
  }

  return (
    <section
      id="dialogue-laboratory"
      className="dialogue-laboratory"
      aria-labelledby="dialogue-laboratory-title"
    >
      <div className="dialogue-laboratory__halo" aria-hidden="true" />
      <div className="dialogue-laboratory__grid" aria-hidden="true" />

      <div className="dialogue-laboratory__inner">
        <header className="dialogue-laboratory__header">
          <div>
            <p className="dialogue-laboratory__eyebrow">26 / THE DIALOGUE LABORATORY</p>
            <h2 id="dialogue-laboratory-title">
              BEFORE
              <br />
              <em>YOU REPLY.</em>
            </h2>
          </div>

          <div className="dialogue-laboratory__intro">
            <span>LISTEN → MIRROR → CLARIFY → RESTATE → BOUNDARY → RETURN</span>
            <p>
              A practical framework for examining disagreement without
              confusing understanding with agreement.
            </p>
          </div>
        </header>

        <div className="dialogue-laboratory__progress">
          <div>
            <span>DIALOGUE PASS</span>
            <strong>{visited.length} / {LENSES.length}</strong>
          </div>
          <div className="dialogue-laboratory__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="dialogue-laboratory__workspace">
          <nav className="dialogue-laboratory__rail" aria-label="Dialogue lenses">
            {LENSES.map((lens) => (
              <button
                key={lens.id}
                type="button"
                className={`${active.id === lens.id ? "is-active" : ""} ${
                  visited.includes(lens.id) ? "is-visited" : ""
                }`}
                onClick={() => selectLens(lens.id)}
                aria-pressed={active.id === lens.id}
              >
                <span>{lens.no}</span>
                <b>{lens.label}</b>
                <i>{visited.includes(lens.id) ? "●" : "○"}</i>
              </button>
            ))}
          </nav>

          <article className="dialogue-laboratory__panel">
            <div className="dialogue-laboratory__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>DIALOGUE FIELD</span>
            </div>

            <div className="dialogue-laboratory__content">
              <p className="dialogue-laboratory__micro">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="dialogue-laboratory__text">{active.text}</p>

              <div className="dialogue-laboratory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="dialogue-laboratory__field">
                <label htmlFor="dialogue-note">WORKING NOTE</label>
                <textarea
                  id="dialogue-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Record what you heard, noticed, or need to clarify…"
                />
              </div>

              <div className="dialogue-laboratory__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="dialogue-laboratory__controls">
              <button type="button" onClick={nextLens}>
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

        <footer className="dialogue-laboratory__footer">
          <p>
            <span>METHOD NOTE</span> Understanding another person’s position
            does not require agreement, and disagreement does not require hostility.
          </p>
          <a href="#language-laboratory">BACK TO LANGUAGE ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
