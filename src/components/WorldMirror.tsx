"use client";

import { useMemo, useState } from "react";

type Mirror = {
  id: string;
  index: string;
  label: string;
  title: string;
  prompt: string;
  detail: string;
  signal: string;
};

const MIRRORS: Mirror[] = [
  {
    id: "attention",
    index: "01",
    label: "ATTENTION",
    title: "WHAT ARE YOU GIVING YOUR LIFE TO?",
    prompt: "Look at where your attention goes before deciding what matters.",
    detail:
      "Attention is limited. What repeatedly receives it can shape what feels important, urgent, or real. The exercise here is observation, not self-judgment.",
    signal: "NOTICE THE NEXT DISTRACTION.",
  },
  {
    id: "comparison",
    index: "02",
    label: "COMPARISON",
    title: "WHO ARE YOU MEASURING YOURSELF AGAINST?",
    prompt: "Notice the standard that quietly enters the room when you compare.",
    detail:
      "Comparison can reveal an assumed measure of success, status, beauty, intelligence, or belonging. Examine the measure before accepting the conclusion.",
    signal: "QUESTION THE STANDARD.",
  },
  {
    id: "certainty",
    index: "03",
    label: "CERTAINTY",
    title: "WHAT WOULD MAKE YOU LOOK AGAIN?",
    prompt: "Find the point at which confidence becomes resistance to evidence.",
    detail:
      "Certainty can be useful when evidence is strong, but it can also protect an identity or conclusion. Inquiry asks what evidence would actually change your view.",
    signal: "LEAVE ROOM FOR REVISION.",
  },
  {
    id: "identity",
    index: "04",
    label: "IDENTITY",
    title: "WHAT MUST REMAIN TRUE ABOUT YOU?",
    prompt: "Notice which self-description you protect most quickly.",
    detail:
      "Identity organizes experience, but it can also filter what is permitted to be seen. Try observing the defense before deciding whether the identity is true or false.",
    signal: "WATCH THE DEFENSE.",
  },
  {
    id: "technology",
    index: "05",
    label: "TECHNOLOGY",
    title: "WHAT IS THE TOOL TRAINING YOU TO EXPECT?",
    prompt: "Examine the relationship between convenience, attention, and choice.",
    detail:
      "Tools are not only instruments; repeated use can shape habits and expectations. This is an invitation to examine the interaction rather than declare technology inherently good or bad.",
    signal: "NOTICE THE HABIT.",
  },
  {
    id: "world",
    index: "06",
    label: "WORLD",
    title: "WHERE DOES YOUR INNER PATTERN BECOME A SOCIAL ONE?",
    prompt: "Follow one personal choice outward into its larger consequences.",
    detail:
      "Private decisions can participate in markets, institutions, relationships, and environments. The point is not guilt; it is tracing connections carefully.",
    signal: "FOLLOW THE CONSEQUENCE.",
  },
];

export default function WorldMirror() {
  const [activeId, setActiveId] = useState("attention");
  const [flipped, setFlipped] = useState(false);

  const active = useMemo(
    () => MIRRORS.find((mirror) => mirror.id === activeId) ?? MIRRORS[0],
    [activeId]
  );

  function selectMirror(id: string) {
    setActiveId(id);
    setFlipped(false);
  }

  function nextMirror() {
    const index = MIRRORS.findIndex((mirror) => mirror.id === active.id);
    setActiveId(MIRRORS[(index + 1) % MIRRORS.length].id);
    setFlipped(false);
  }

  return (
    <section className="world-mirror" aria-labelledby="world-mirror-title">
      <div className="world-mirror__ambient" aria-hidden="true" />
      <div className="world-mirror__scanlines" aria-hidden="true" />

      <div className="world-mirror__inner">
        <header className="world-mirror__header">
          <div>
            <p className="world-mirror__eyebrow">17 / THE WORLD MIRROR</p>
            <h2 id="world-mirror-title">
              THE WORLD
              <br />
              <em>REFLECTS US.</em>
            </h2>
          </div>

          <div className="world-mirror__header-copy">
            <span>FROM INNER PATTERN → OUTER CONSEQUENCE</span>
            <p>
              Look at ordinary life as a field of inquiry. Attention,
              comparison, identity, technology, and choice leave traces beyond
              the private mind.
            </p>
          </div>
        </header>

        <div className="world-mirror__stage">
          <aside className="world-mirror__index" aria-label="Mirror topics">
            {MIRRORS.map((mirror) => (
              <button
                key={mirror.id}
                type="button"
                className={active.id === mirror.id ? "is-active" : ""}
                onClick={() => selectMirror(mirror.id)}
                aria-pressed={active.id === mirror.id}
              >
                <span>{mirror.index}</span>
                <strong>{mirror.label}</strong>
                <i />
              </button>
            ))}
          </aside>

          <div className="world-mirror__object">
            <div className="world-mirror__ring world-mirror__ring--one" />
            <div className="world-mirror__ring world-mirror__ring--two" />
            <div className="world-mirror__ring world-mirror__ring--three" />

            <div className={`world-mirror__lens ${flipped ? "is-flipped" : ""}`}>
              <div className="world-mirror__face world-mirror__face--front">
                <span>{active.index}</span>
                <strong>{active.label}</strong>
                <small>LOOK CLOSER</small>
              </div>
              <div className="world-mirror__face world-mirror__face--back">
                <span>THE SIGNAL</span>
                <strong>{active.signal}</strong>
              </div>
            </div>

            <button
              type="button"
              className="world-mirror__flip"
              onClick={() => setFlipped((value) => !value)}
              aria-label="Flip the mirror"
            >
              <span>↻</span>
            </button>
          </div>

          <article className="world-mirror__reading">
            <p className="world-mirror__reading-label">CURRENT MIRROR</p>
            <h3>{active.title}</h3>
            <p className="world-mirror__prompt">{active.prompt}</p>

            <div className="world-mirror__rule" />

            <p className="world-mirror__detail">{active.detail}</p>

            <div className="world-mirror__actions">
              <button type="button" onClick={() => setFlipped(true)}>
                REVEAL SIGNAL <span>↗</span>
              </button>
              <button type="button" onClick={nextMirror}>
                NEXT MIRROR <span>↗</span>
              </button>
            </div>
          </article>
        </div>

        <footer className="world-mirror__footer">
          <span>OBSERVE → TRACE → QUESTION → TEST</span>
          <a href="#impact">CONNECT TO IMPACT ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
