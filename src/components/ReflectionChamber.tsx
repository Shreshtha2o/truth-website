"use client";

import { useMemo, useState } from "react";

type Layer = {
  id: string;
  index: string;
  label: string;
  question: string;
  instruction: string;
};

const LAYERS: Layer[] = [
  {
    id: "event",
    index: "01",
    label: "EVENT",
    question: "WHAT ACTUALLY HAPPENED?",
    instruction:
      "Describe only what could be recorded by a camera or independently checked. Remove the explanation for a moment.",
  },
  {
    id: "reaction",
    index: "02",
    label: "REACTION",
    question: "WHAT HAPPENED IN ME?",
    instruction:
      "Notice the first physical or emotional response. Do not turn it into a story yet.",
  },
  {
    id: "story",
    index: "03",
    label: "STORY",
    question: "WHAT DID I MAKE IT MEAN?",
    instruction:
      "Name the interpretation that appeared. Ask which parts are evidence and which parts are added meaning.",
  },
  {
    id: "motive",
    index: "04",
    label: "MOTIVE",
    question: "WHAT DO I WANT?",
    instruction:
      "Look for the outcome you are protecting or pursuing: approval, safety, status, pleasure, control, certainty, or something else.",
  },
  {
    id: "assumption",
    index: "05",
    label: "ASSUMPTION",
    question: "WHAT AM I TAKING FOR GRANTED?",
    instruction:
      "Find the hidden premise that must be true for your interpretation to work.",
  },
  {
    id: "choice",
    index: "06",
    label: "CHOICE",
    question: "WHAT CAN I TEST?",
    instruction:
      "Turn the inquiry toward something observable. Choose one small test rather than another abstract conclusion.",
  },
];

export default function ReflectionChamber() {
  const [activeId, setActiveId] = useState("event");
  const [completed, setCompleted] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const active = useMemo(
    () => LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[0],
    [activeId]
  );

  function selectLayer(id: string) {
    setActiveId(id);
  }

  function markComplete() {
    setCompleted((current) =>
      current.includes(active.id) ? current : [...current, active.id]
    );
  }

  function nextLayer() {
    const index = LAYERS.findIndex((layer) => layer.id === active.id);
    setActiveId(LAYERS[(index + 1) % LAYERS.length].id);
  }

  const completion = Math.round((completed.length / LAYERS.length) * 100);

  return (
    <section className="reflection-chamber" aria-labelledby="reflection-chamber-title">
      <div className="reflection-chamber__halo" aria-hidden="true" />
      <div className="reflection-chamber__lines" aria-hidden="true" />

      <div className="reflection-chamber__inner">
        <header className="reflection-chamber__header">
          <div>
            <p className="reflection-chamber__eyebrow">19 / THE REFLECTION CHAMBER</p>
            <h2 id="reflection-chamber-title">
              LOOK
              <br />
              <em>AGAIN.</em>
            </h2>
          </div>

          <div className="reflection-chamber__intro">
            <span>A PRACTICE OF SEPARATION</span>
            <p>
              Move from event to reaction, story, motive, assumption, and
              finally a testable choice. The layers are a tool for examining
              one situation without rushing toward a verdict.
            </p>
          </div>
        </header>

        <div className="reflection-chamber__progress">
          <div>
            <span>CHAMBER PROGRESS</span>
            <strong>{completion}%</strong>
          </div>
          <div className="reflection-chamber__bar">
            <i style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="reflection-chamber__workspace">
          <nav className="reflection-chamber__layers" aria-label="Reflection layers">
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                className={`${active.id === layer.id ? "is-active" : ""} ${
                  completed.includes(layer.id) ? "is-complete" : ""
                }`}
                onClick={() => selectLayer(layer.id)}
                aria-pressed={active.id === layer.id}
              >
                <span>{layer.index}</span>
                <strong>{layer.label}</strong>
                <i>{completed.includes(layer.id) ? "✓" : "→"}</i>
              </button>
            ))}
          </nav>

          <article className="reflection-chamber__card">
            <div className="reflection-chamber__card-top">
              <span>{active.index} / {active.label}</span>
              <span>OBSERVE BEFORE CONCLUDE</span>
            </div>

            <div className="reflection-chamber__card-body">
              <p className="reflection-chamber__kicker">CURRENT LAYER</p>
              <h3>{active.question}</h3>
              <p className="reflection-chamber__instruction">{active.instruction}</p>

              <label className="reflection-chamber__note">
                <span>PRIVATE FIELD NOTE</span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Write only what helps you look more carefully…"
                  rows={5}
                />
              </label>
            </div>

            <div className="reflection-chamber__actions">
              <button
                type="button"
                className="reflection-chamber__complete"
                onClick={markComplete}
              >
                {completed.includes(active.id) ? "LAYER EXAMINED" : "MARK AS EXAMINED"}
              </button>
              <button type="button" onClick={nextLayer}>
                NEXT LAYER <span>↗</span>
              </button>
            </div>
          </article>
        </div>

        <footer className="reflection-chamber__footer">
          <p>
            <span>PRIVATE BY DESIGN</span> Notes stay in this page session and
            are not sent anywhere by this component.
          </p>
          <a href="#synthesis">RETURN TO SYNTHESIS ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
