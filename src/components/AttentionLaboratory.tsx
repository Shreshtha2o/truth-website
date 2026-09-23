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
    id: "notice",
    no: "01",
    label: "NOTICE",
    title: "WHERE DOES YOUR ATTENTION GO?",
    text: "Attention is finite. Before changing a habit, notice what repeatedly captures you: a notification, comparison, fear, reward, unfinished thought, or something else.",
    question: "What captured my attention immediately before I noticed it?",
    practice: "Name the trigger without judging it.",
  },
  {
    id: "stay",
    no: "02",
    label: "STAY",
    title: "CAN YOU REMAIN WITH ONE THING?",
    text: "Rapid switching can make observation difficult. Try staying with one ordinary object, sensation, sound, or thought long enough to notice its changes.",
    question: "What changes when I stop reaching for the next stimulus?",
    practice: "Stay with one observable thing for 30 seconds.",
  },
  {
    id: "trace",
    no: "03",
    label: "TRACE",
    title: "WHAT PULLS THE MIND FORWARD?",
    text: "A thought often points toward another thought. Tracing the sequence can reveal an expectation, memory, image, or desire that was not obvious at first.",
    question: "What thought came immediately before this one?",
    practice: "Trace one step backward without creating a story about it.",
  },
  {
    id: "filter",
    no: "04",
    label: "FILTER",
    title: "WHAT ARE YOU SELECTING OUT?",
    text: "Attention does not only select what enters awareness; it can also make some information easier to ignore. Notice what your current focus leaves outside the frame.",
    question: "What relevant detail would I rather not look at?",
    practice: "Add one piece of information you had previously excluded.",
  },
  {
    id: "technology",
    no: "05",
    label: "TECHNOLOGY",
    title: "WHAT IS THE TOOL TRAINING YOU TO EXPECT?",
    text: "Interfaces can reward speed, novelty, repetition, and immediate response. This does not make technology inherently good or bad; it gives us something concrete to observe.",
    question: "What behavior does this interface make unusually easy?",
    practice: "Change one notification, feed, or interaction rule for a short test.",
  },
  {
    id: "return",
    no: "06",
    label: "RETURN",
    title: "CAN ATTENTION COME BACK?",
    text: "Distraction is not the end of observation. Notice the moment you realize you have drifted, then return without turning the return itself into a performance.",
    question: "What happens between losing attention and noticing that it is gone?",
    practice: "Notice the return itself.",
  },
];

export default function AttentionLaboratory() {
  const [activeId, setActiveId] = useState("notice");
  const [visited, setVisited] = useState<string[]>(["notice"]);
  const [observation, setObservation] = useState("");

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
      id="attention-laboratory"
      className="attention-laboratory"
      aria-labelledby="attention-laboratory-title"
    >
      <div className="attention-laboratory__orb" aria-hidden="true" />
      <div className="attention-laboratory__grid" aria-hidden="true" />

      <div className="attention-laboratory__inner">
        <header className="attention-laboratory__header">
          <div>
            <p className="attention-laboratory__eyebrow">24 / THE ATTENTION LABORATORY</p>
            <h2 id="attention-laboratory-title">
              WATCH
              <br />
              <em>WHAT WATCHES.</em>
            </h2>
          </div>

          <div className="attention-laboratory__intro">
            <span>NOTICE → STAY → TRACE → FILTER → TECHNOLOGY → RETURN</span>
            <p>
              A practical space for examining attention as it moves through
              thought, environment, technology, and everyday experience.
            </p>
          </div>
        </header>

        <div className="attention-laboratory__progress">
          <div>
            <span>LAB PASS</span>
            <strong>{visited.length} / {MODES.length}</strong>
          </div>
          <div className="attention-laboratory__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="attention-laboratory__workspace">
          <nav className="attention-laboratory__rail" aria-label="Attention modes">
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

          <article className="attention-laboratory__panel">
            <div className="attention-laboratory__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>ATTENTION FIELD</span>
            </div>

            <div className="attention-laboratory__content">
              <p className="attention-laboratory__micro">CURRENT OBSERVATION</p>
              <h3>{active.title}</h3>
              <p className="attention-laboratory__text">{active.text}</p>

              <div className="attention-laboratory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="attention-laboratory__field">
                <label htmlFor="attention-observation">FIELD NOTE</label>
                <textarea
                  id="attention-observation"
                  value={observation}
                  onChange={(event) => setObservation(event.target.value)}
                  rows={3}
                  placeholder="Record only what you actually noticed…"
                />
              </div>

              <div className="attention-laboratory__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="attention-laboratory__controls">
              <button type="button" onClick={nextMode}>
                NEXT MODE <span>↗</span>
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
          </article>
        </div>

        <footer className="attention-laboratory__footer">
          <p>
            <span>METHOD NOTE</span> Attention is being treated here as an
            object of observation, not as a fixed personal trait or diagnosis.
          </p>
          <a href="#decision-observatory">CONTINUE TO DECISION ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
