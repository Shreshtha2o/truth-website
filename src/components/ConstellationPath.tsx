"use client";

import { useMemo, useState } from "react";

type PathNode = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  connects: string;
  href: string;
};

const PATHS: PathNode[] = [
  {
    id: "question",
    number: "01",
    label: "QUESTION",
    title: "BEGIN WHERE CERTAINTY ENDS.",
    description:
      "Start with one honest question. Not a question designed to confirm what you already believe, but one that can expose an assumption.",
    connects: "Inquiry Lab",
    href: "#inquiry-lab",
  },
  {
    id: "observe",
    number: "02",
    label: "OBSERVE",
    title: "SEE BEFORE YOU EXPLAIN.",
    description:
      "Stay with what is happening long enough to notice the reaction, the story, and the motive that arrive around it.",
    connects: "Reflection Chamber",
    href: "#reflection-chamber",
  },
  {
    id: "read",
    number: "03",
    label: "READ",
    title: "LET THE TEXT CHALLENGE YOU.",
    description:
      "Read primary texts carefully. Separate what the source says from later interpretation, personal projection, and inherited certainty.",
    connects: "Reading Room",
    href: "#reading-room",
  },
  {
    id: "connect",
    number: "04",
    label: "CONNECT",
    title: "FOLLOW THE PATTERN OUTWARD.",
    description:
      "Trace the relationship between an inner pattern and its effects in relationships, institutions, technology, society, and the environment.",
    connects: "Impact",
    href: "#impact",
  },
  {
    id: "test",
    number: "05",
    label: "TEST",
    title: "TURN INSIGHT INTO AN OBSERVATION.",
    description:
      "Do not stop at a compelling idea. Find one small, observable way to examine whether the insight changes what you actually do.",
    connects: "Living Practice",
    href: "#practice",
  },
  {
    id: "return",
    number: "06",
    label: "RETURN",
    title: "COME BACK WITHOUT PRETENDING.",
    description:
      "Return when the question changes, evidence appears, or an old conclusion stops explaining what you can see.",
    connects: "Return to Question",
    href: "#return",
  },
];

const EDGES = [
  ["question", "observe"],
  ["observe", "read"],
  ["read", "connect"],
  ["connect", "test"],
  ["test", "return"],
  ["return", "question"],
];

export default function ConstellationPath() {
  const [activeId, setActiveId] = useState("question");
  const [visited, setVisited] = useState<string[]>(["question"]);

  const active = useMemo(
    () => PATHS.find((item) => item.id === activeId) ?? PATHS[0],
    [activeId]
  );

  function choose(id: string) {
    setActiveId(id);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function next() {
    const index = PATHS.findIndex((item) => item.id === active.id);
    choose(PATHS[(index + 1) % PATHS.length].id);
  }

  return (
    <section
      id="constellation-path"
      className="constellation-path"
      aria-labelledby="constellation-path-title"
    >
      <div className="constellation-path__stars" aria-hidden="true" />
      <div className="constellation-path__aurora" aria-hidden="true" />

      <div className="constellation-path__inner">
        <header className="constellation-path__header">
          <div>
            <p className="constellation-path__eyebrow">20 / THE CONSTELLATION</p>
            <h2 id="constellation-path-title">
              NO STRAIGHT
              <br />
              <em>LINE.</em>
            </h2>
          </div>

          <div className="constellation-path__intro">
            <span>A LEARNING PATH THAT CAN LOOP</span>
            <p>
              Inquiry rarely moves in a straight line. Question, observation,
              reading, connection, testing, and return can illuminate one
              another.
            </p>
          </div>
        </header>

        <div className="constellation-path__stage">
          <div className="constellation-path__map" aria-label="Interactive inquiry constellation">
            <div className="constellation-path__orbit constellation-path__orbit--outer" />
            <div className="constellation-path__orbit constellation-path__orbit--inner" />

            {EDGES.map(([from, to]) => (
              <div
                key={`${from}-${to}`}
                className={`constellation-path__edge constellation-path__edge--${from}-${to}`}
                aria-hidden="true"
              />
            ))}

            <div className="constellation-path__core">
              <span>KEEP</span>
              <strong>LOOKING</strong>
              <i />
            </div>

            {PATHS.map((item, index) => {
              const angle = -90 + index * 60;
              const isActive = active.id === item.id;
              const isVisited = visited.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`constellation-path__node ${
                    isActive ? "is-active" : ""
                  } ${isVisited ? "is-visited" : ""}`}
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                  onClick={() => choose(item.id)}
                  aria-pressed={isActive}
                >
                  <span className="constellation-path__node-dot" />
                  <small>{item.number}</small>
                  <b>{item.label}</b>
                </button>
              );
            })}
          </div>

          <article className="constellation-path__panel">
            <div className="constellation-path__panel-top">
              <span>{active.number} / {active.label}</span>
              <span>{visited.length} / 06 VISITED</span>
            </div>

            <div className="constellation-path__panel-body">
              <p className="constellation-path__kicker">CURRENT STAR</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>

              <div className="constellation-path__connect">
                <span>NEXT CONNECTION</span>
                <strong>{active.connects}</strong>
              </div>
            </div>

            <div className="constellation-path__panel-bottom">
              <a href={active.href}>GO THERE <span>↗</span></a>
              <button type="button" onClick={next}>
                NEXT STAR <span>↗</span>
              </button>
            </div>
          </article>
        </div>

        <footer className="constellation-path__footer">
          <p>
            THE PATH IS A MAP, NOT A SCORE. <span>RETURN WHENEVER YOU NEED TO.</span>
          </p>
          <a href="#inquiry-lab">START AT THE QUESTION ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
