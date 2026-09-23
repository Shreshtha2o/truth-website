"use client";

import { useMemo, useState } from "react";

type Lens = {
  id: string;
  number: string;
  label: string;
  title: string;
  text: string;
  prompt: string;
};

const LENSES: Lens[] = [
  {
    id: "claim",
    number: "01",
    label: "CLAIM",
    title: "WHAT EXACTLY IS BEING SAID?",
    text:
      "Large statements often contain several smaller claims. Before evaluating one, make the wording precise enough that someone could disagree with a specific proposition.",
    prompt: "Rewrite the statement so that it can actually be checked.",
  },
  {
    id: "source",
    number: "02",
    label: "SOURCE",
    title: "WHERE DID THIS COME FROM?",
    text:
      "Trace a claim to its nearest available source. A screenshot, quotation, summary, headline, or repost is not automatically equivalent to the underlying evidence.",
    prompt: "Find the closest primary or directly relevant source.",
  },
  {
    id: "context",
    number: "03",
    label: "CONTEXT",
    title: "WHAT IS MISSING AROUND IT?",
    text:
      "A statement can change meaning when its date, population, location, definitions, comparison group, or surrounding passage changes. Context is part of the evidence.",
    prompt: "Write down the time, place, population, and definitions involved.",
  },
  {
    id: "evidence",
    number: "04",
    label: "EVIDENCE",
    title: "WHAT WOULD SUPPORT OR CHALLENGE IT?",
    text:
      "Evidence should be connected to the claim being tested. Ask what observation would count for it, against it, or leave the question unresolved.",
    prompt: "Name one observation that would increase confidence and one that would decrease it.",
  },
  {
    id: "uncertainty",
    number: "05",
    label: "UNCERTAINTY",
    title: "WHAT IS STILL NOT KNOWN?",
    text:
      "Good inquiry can end with a narrower conclusion rather than a dramatic one. Distinguish established information from interpretation and from what remains uncertain.",
    prompt: "Complete: 'At this point, I can say ___, but I cannot yet say ___.'",
  },
  {
    id: "revision",
    number: "06",
    label: "REVISION",
    title: "WHAT WOULD MAKE YOU UPDATE?",
    text:
      "The purpose of checking evidence is not to defend an identity. It is to make conclusions proportionate to what the available information can support.",
    prompt: "Define the new evidence that would cause you to revise the conclusion.",
  },
];

const ORDER = ["claim", "source", "context", "evidence", "uncertainty", "revision"];

export default function EvidenceObservatory() {
  const [activeId, setActiveId] = useState("claim");
  const [checked, setChecked] = useState<string[]>(["claim"]);
  const [claim, setClaim] = useState("");

  const active = useMemo(
    () => LENSES.find((lens) => lens.id === activeId) ?? LENSES[0],
    [activeId]
  );

  function choose(id: string) {
    setActiveId(id);
    setChecked((current) => (current.includes(id) ? current : [...current, id]));
  }

  function next() {
    const index = ORDER.indexOf(active.id);
    choose(ORDER[(index + 1) % ORDER.length]);
  }

  const completion = Math.round((checked.length / ORDER.length) * 100);

  return (
    <section
      id="evidence-observatory"
      className="evidence-observatory"
      aria-labelledby="evidence-observatory-title"
    >
      <div className="evidence-observatory__beam" aria-hidden="true" />
      <div className="evidence-observatory__grid" aria-hidden="true" />

      <div className="evidence-observatory__inner">
        <header className="evidence-observatory__header">
          <div>
            <p className="evidence-observatory__eyebrow">22 / THE EVIDENCE OBSERVATORY</p>
            <h2 id="evidence-observatory-title">
              DON’T
              <br />
              <em>ASSUME.</em>
            </h2>
          </div>
          <div className="evidence-observatory__intro">
            <span>CLAIM → SOURCE → CONTEXT → EVIDENCE → UNCERTAINTY</span>
            <p>
              A compact method for slowing down a conclusion. Use it on a
              headline, argument, memory, social-media post, or your own
              assumption.
            </p>
          </div>
        </header>

        <div className="evidence-observatory__meter">
          <div>
            <span>OBSERVATORY PASS</span>
            <strong>{completion}%</strong>
          </div>
          <div className="evidence-observatory__meter-track">
            <i style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="evidence-observatory__workspace">
          <nav className="evidence-observatory__lenses" aria-label="Evidence lenses">
            {LENSES.map((lens) => (
              <button
                key={lens.id}
                type="button"
                className={`${active.id === lens.id ? "is-active" : ""} ${
                  checked.includes(lens.id) ? "is-checked" : ""
                }`}
                onClick={() => choose(lens.id)}
                aria-pressed={active.id === lens.id}
              >
                <span>{lens.number}</span>
                <strong>{lens.label}</strong>
                <i>{checked.includes(lens.id) ? "✓" : "○"}</i>
              </button>
            ))}
          </nav>

          <article className="evidence-observatory__panel">
            <div className="evidence-observatory__panel-top">
              <span>{active.number} / {active.label}</span>
              <span>CHECK THE CONCLUSION</span>
            </div>

            <div className="evidence-observatory__body">
              <p className="evidence-observatory__kicker">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="evidence-observatory__text">{active.text}</p>

              <div className="evidence-observatory__claim">
                <label htmlFor="observatory-claim">WORKING CLAIM</label>
                <textarea
                  id="observatory-claim"
                  rows={3}
                  value={claim}
                  onChange={(event) => setClaim(event.target.value)}
                  placeholder="Write one statement you want to examine…"
                />
              </div>

              <div className="evidence-observatory__prompt">
                <span>CHECKPOINT</span>
                <p>{active.prompt}</p>
              </div>
            </div>

            <div className="evidence-observatory__bottom">
              <button type="button" onClick={next}>
                NEXT LENS <span>↗</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setChecked((current) =>
                    current.includes(active.id)
                      ? current
                      : [...current, active.id]
                  )
                }
              >
                {checked.includes(active.id) ? "LENS CHECKED" : "MARK CHECKED"}
              </button>
            </div>
          </article>
        </div>

        <footer className="evidence-observatory__footer">
          <p>
            <span>METHOD NOTE</span> Checking evidence does not guarantee
            certainty. It makes the basis and limits of a conclusion easier to see.
          </p>
          <a href="#question-archive">RETURN TO QUESTIONS ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
