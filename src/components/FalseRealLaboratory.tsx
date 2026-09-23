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
    id: "claim",
    no: "01",
    label: "CLAIM",
    title: "WHAT EXACTLY IS BEING CLAIMED?",
    text: "Before calling something true or false, make the statement precise. Vague claims can hide several different propositions, while precise claims can be examined.",
    question: "Can I rewrite this statement so that someone else could check what it means?",
    practice: "Turn one vague statement into a specific, testable proposition.",
  },
  {
    id: "observation",
    no: "02",
    label: "OBSERVATION",
    title: "WHAT WAS ACTUALLY OBSERVED?",
    text: "Separate what was directly observed from what was inferred afterward. The two can feel identical in memory even when they are not.",
    question: "Which part did I actually observe, and which part did I add?",
    practice: "Describe the event without explaining why it happened.",
  },
  {
    id: "assumption",
    no: "03",
    label: "ASSUMPTION",
    title: "WHAT AM I ADDING WITHOUT NOTICING?",
    text: "Assumptions can enter through language, expectation, identity, prior knowledge, or emotion. Making them visible does not automatically make them wrong; it makes them available for examination.",
    question: "What would I have to assume for my conclusion to follow?",
    practice: "Write one hidden assumption underneath the claim.",
  },
  {
    id: "evidence",
    no: "04",
    label: "EVIDENCE",
    title: "WHAT WOULD SUPPORT OR CHALLENGE IT?",
    text: "Evidence is relevant information that bears on a claim. Look in both directions: what would strengthen the conclusion, and what observation would make you revise it?",
    question: "What evidence would count against what I currently believe?",
    practice: "Name one confirming observation and one disconfirming observation.",
  },
  {
    id: "motive",
    no: "05",
    label: "MOTIVE",
    title: "WHAT DO I WANT TO BE TRUE?",
    text: "Desire can influence what we notice and how quickly we conclude. A motive does not prove a belief false, but noticing it can reveal where extra scrutiny is useful.",
    question: "What would I gain, protect, avoid, or preserve if this were true?",
    practice: "State the desired outcome separately from the factual claim.",
  },
  {
    id: "uncertainty",
    no: "06",
    label: "UNCERTAINTY",
    title: "WHAT REMAINS UNKNOWN?",
    text: "Not every question can be resolved immediately. Naming uncertainty prevents a gap in knowledge from quietly becoming a certainty.",
    question: "What do I genuinely not know yet?",
    practice: "Write one sentence beginning: “At present, I cannot establish…”",
  },
  {
    id: "revision",
    no: "07",
    label: "REVISION",
    title: "WHAT WOULD MAKE YOU LOOK AGAIN?",
    text: "A claim becomes easier to examine when its revision condition is explicit. The point is not permanent doubt; it is knowing what would warrant updating your view.",
    question: "What new information would make me change this conclusion?",
    practice: "Write a clear revision condition before moving on.",
  },
];

export default function FalseRealLaboratory() {
  const [activeId, setActiveId] = useState("claim");
  const [visited, setVisited] = useState<string[]>(["claim"]);
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
      id="false-real-laboratory"
      className="false-real-laboratory"
      aria-labelledby="false-real-laboratory-title"
    >
      <div className="false-real-laboratory__split" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="false-real-laboratory__noise" aria-hidden="true" />

      <div className="false-real-laboratory__inner">
        <header className="false-real-laboratory__header">
          <div>
            <p className="false-real-laboratory__eyebrow">29 / THE FALSE · THE REAL</p>
            <h2 id="false-real-laboratory-title">
              BEFORE
              <br />
              <em>TRUE.</em>
            </h2>
          </div>

          <div className="false-real-laboratory__intro">
            <span>CLAIM → OBSERVATION → ASSUMPTION → EVIDENCE → MOTIVE → UNCERTAINTY</span>
            <p>
              Not a machine for declaring what is true. A disciplined sequence
              for making claims precise enough to examine.
            </p>
          </div>
        </header>

        <div className="false-real-laboratory__progress">
          <div>
            <span>EXAMINATION PASS</span>
            <strong>{visited.length} / {LENSES.length}</strong>
          </div>
          <div className="false-real-laboratory__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="false-real-laboratory__workspace">
          <nav className="false-real-laboratory__rail" aria-label="Claim examination lenses">
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

          <article className="false-real-laboratory__panel">
            <div className="false-real-laboratory__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>CLARITY FIELD</span>
            </div>

            <div className="false-real-laboratory__content">
              <p className="false-real-laboratory__micro">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="false-real-laboratory__text">{active.text}</p>

              <div className="false-real-laboratory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="false-real-laboratory__field">
                <label htmlFor="false-real-laboratory-note">EXAMINATION NOTE</label>
                <textarea
                  id="false-real-laboratory-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Write the claim, observation, assumption, evidence, motive, or uncertainty you are examining…"
                />
              </div>

              <div className="false-real-laboratory__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="false-real-laboratory__controls">
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

        <footer className="false-real-laboratory__footer">
          <p>
            <span>METHOD NOTE</span> “False” and “real” are not treated here as
            labels to apply by intuition. Claims need definitions, evidence,
            context, and appropriate uncertainty; different questions require
            different standards of verification.
          </p>
          <a href="#evidence-observatory">RETURN TO EVIDENCE ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
