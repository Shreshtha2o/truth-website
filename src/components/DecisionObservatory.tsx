 "use client";

import { useMemo, useState } from "react";

type Stage = {
  id: string;
  no: string;
  label: string;
  title: string;
  text: string;
  question: string;
  action: string;
};

const STAGES: Stage[] = [
  {
    id: "pause",
    no: "01",
    label: "PAUSE",
    title: "WHAT HAPPENS BEFORE THE CHOICE?",
    text: "A decision rarely begins at the moment you notice it. Notice the pressure, urgency, expectation, or emotion that arrived first.",
    question: "What was already moving in me before I decided?",
    action: "Name the first observable signal without explaining it.",
  },
  {
    id: "separate",
    no: "02",
    label: "SEPARATE",
    title: "WHAT IS FACT — AND WHAT IS STORY?",
    text: "A decision can contain an event, an interpretation, a prediction, and a desire at the same time. Pull those layers apart before treating them as one thing.",
    question: "Which part can I verify, and which part am I adding?",
    action: "Write one fact and one interpretation separately.",
  },
  {
    id: "motive",
    no: "03",
    label: "MOTIVE",
    title: "WHAT AM I TRYING TO PROTECT OR GET?",
    text: "Desire can quietly shape what appears reasonable. Looking at motive does not invalidate a decision; it makes the force behind it visible.",
    question: "What outcome do I most want — and why?",
    action: "State the desired outcome without calling it good or bad.",
  },
  {
    id: "options",
    no: "04",
    label: "OPTIONS",
    title: "WHAT ELSE COULD I DO?",
    text: "A pressured mind can make a narrow set of options feel like the whole field. Generate alternatives before choosing among them.",
    question: "What option am I ignoring because it is uncomfortable?",
    action: "Create one additional option, even if you may reject it.",
  },
  {
    id: "consequence",
    no: "05",
    label: "CONSEQUENCE",
    title: "WHAT FOLLOWS FROM EACH PATH?",
    text: "Look beyond the immediate reward or discomfort. A choice can affect your future self, other people, resources, and the wider situation.",
    question: "What happens next if I follow this path?",
    action: "Trace one immediate and one second-order consequence.",
  },
  {
    id: "test",
    no: "06",
    label: "TEST",
    title: "WHAT CAN I LEARN BEFORE COMMITTING?",
    text: "Some decisions need action. Others need one small experiment first. Testing can turn an abstract argument into observable information.",
    question: "What is the smallest safe test that could teach me something?",
    action: "Define a reversible experiment where one exists.",
  },
  {
    id: "return",
    no: "07",
    label: "RETURN",
    title: "CAN I LOOK AGAIN?",
    text: "Clarity is not the same as certainty. Return to the original question after the analysis and notice what changed.",
    question: "What do I see now that I did not see at the beginning?",
    action: "Write the conclusion with its remaining uncertainty.",
  },
];

export default function DecisionObservatory() {
  const [activeId, setActiveId] = useState("pause");
  const [visited, setVisited] = useState<string[]>(["pause"]);
  const [note, setNote] = useState("");

  const active = useMemo(
    () => STAGES.find((stage) => stage.id === activeId) ?? STAGES[0],
    [activeId]
  );

  const completion = Math.round((visited.length / STAGES.length) * 100);

  function selectStage(id: string) {
    setActiveId(id);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function nextStage() {
    const index = STAGES.findIndex((stage) => stage.id === active.id);
    selectStage(STAGES[(index + 1) % STAGES.length].id);
  }

  return (
    <section
      id="decision-observatory"
      className="decision-observatory"
      aria-labelledby="decision-observatory-title"
    >
      <div className="decision-observatory__halo" aria-hidden="true" />
      <div className="decision-observatory__lines" aria-hidden="true" />

      <div className="decision-observatory__inner">
        <header className="decision-observatory__header">
          <div>
            <p className="decision-observatory__eyebrow">23 / THE DECISION OBSERVATORY</p>
            <h2 id="decision-observatory-title">
              BEFORE
              <br />
              <em>YOU CHOOSE.</em>
            </h2>
          </div>

          <div className="decision-observatory__intro">
            <span>PAUSE → SEPARATE → MOTIVE → OPTIONS → CONSEQUENCE → TEST</span>
            <p>
              A decision-making laboratory for examining what is already
              present before a choice becomes automatic.
            </p>
          </div>
        </header>

        <div className="decision-observatory__progress">
          <div>
            <span>OBSERVED</span>
            <strong>{visited.length} / {STAGES.length}</strong>
          </div>
          <div className="decision-observatory__track">
            <i style={{ width: `${completion}%` }} />
          </div>
          <span>{completion}%</span>
        </div>

        <div className="decision-observatory__workspace">
          <aside className="decision-observatory__rail" aria-label="Decision stages">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                type="button"
                className={`${active.id === stage.id ? "is-active" : ""} ${
                  visited.includes(stage.id) ? "is-visited" : ""
                }`}
                onClick={() => selectStage(stage.id)}
                aria-pressed={active.id === stage.id}
              >
                <span>{stage.no}</span>
                <b>{stage.label}</b>
                <i>{visited.includes(stage.id) ? "●" : "○"}</i>
              </button>
            ))}
          </aside>

          <main className="decision-observatory__card">
            <div className="decision-observatory__card-top">
              <span>{active.no} / {active.label}</span>
              <span>DECISION FIELD</span>
            </div>

            <div className="decision-observatory__content">
              <p className="decision-observatory__micro">OBSERVATION</p>
              <h3>{active.title}</h3>
              <p className="decision-observatory__text">{active.text}</p>

              <div className="decision-observatory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="decision-observatory__note">
                <label htmlFor="decision-note">PRIVATE FIELD NOTE</label>
                <textarea
                  id="decision-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Write only what helps you observe the decision…"
                />
              </div>

              <div className="decision-observatory__action">
                <span>NEXT TEST</span>
                <p>{active.action}</p>
              </div>
            </div>

            <div className="decision-observatory__controls">
              <button type="button" onClick={nextStage}>
                NEXT STAGE <span>↗</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setVisited((current) =>
                    current.includes(active.id) ? current : [...current, active.id]
                  )
                }
              >
                {visited.includes(active.id) ? "OBSERVED" : "MARK OBSERVED"}
              </button>
            </div>
          </main>
        </div>

        <footer className="decision-observatory__footer">
          <p>
            <span>FIELD NOTE</span> This is a reflection framework, not a
            substitute for professional, legal, medical, financial, or safety advice.
          </p>
          <a href="#evidence-observatory">BACK TO EVIDENCE ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
