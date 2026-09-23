"use client";

import { useMemo, useState } from "react";

type AtlasNode = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  question: string;
  practice: string;
};

const NODES: AtlasNode[] = [
  {
    id: "self",
    number: "01",
    label: "SELF",
    title: "START WITH THE ONE WHO IS LOOKING.",
    description:
      "Before collecting more conclusions, examine the observer: reactions, identities, desires, fears, and assumptions.",
    question: "What do I actually know about the one who is experiencing this?",
    practice: "Pause before the first conclusion. Notice what appeared before the explanation.",
  },
  {
    id: "desire",
    number: "02",
    label: "DESIRE",
    title: "TRACE WHAT IS MOVING YOU.",
    description:
      "A choice can look rational while being shaped by reward, fear, comparison, habit, or the wish to protect an identity.",
    question: "What do I want from this situation—and what happens if I do not get it?",
    practice: "Name the desired outcome without defending it. Then observe the pressure it creates.",
  },
  {
    id: "thought",
    number: "03",
    label: "THOUGHT",
    title: "SEPARATE FACT FROM THE STORY.",
    description:
      "Thought can describe, remember, interpret, predict, and defend. Inquiry becomes clearer when these functions are not mixed together.",
    question: "Which part is directly observable, and which part have I added?",
    practice: "Write one sentence for the fact and one for your interpretation. Keep them separate.",
  },
  {
    id: "text",
    number: "04",
    label: "TEXT",
    title: "READ BEFORE YOU INTERPRET.",
    description:
      "A serious reading practice moves from the source to its context, then to interpretation, and finally to personal examination.",
    question: "What does the text actually say before I make it say what I want?",
    practice: "Read a short passage twice: first for what is present, then for what you assumed.",
  },
  {
    id: "society",
    number: "05",
    label: "SOCIETY",
    title: "FOLLOW INNER PATTERNS INTO THE WORLD.",
    description:
      "Individual choices participate in larger systems. Inquiry can examine how beliefs, incentives, institutions, technology, and culture interact.",
    question: "What changes when this personal pattern becomes collective?",
    practice: "Trace one private assumption to one visible social consequence.",
  },
  {
    id: "action",
    number: "06",
    label: "ACTION",
    title: "LET CLARITY CHANGE PRACTICE.",
    description:
      "Inquiry is not complete merely because an idea feels convincing. Its practical consequences can also be examined.",
    question: "If I really saw this clearly, what would change in the next action?",
    practice: "Choose one small observable action. Test it instead of turning insight into another belief.",
  },
];

const CONNECTIONS = [
  ["self", "desire"],
  ["desire", "thought"],
  ["thought", "text"],
  ["text", "society"],
  ["society", "action"],
  ["action", "self"],
];

export default function LearningAtlas() {
  const [activeId, setActiveId] = useState("self");
  const [visited, setVisited] = useState<string[]>(["self"]);

  const active = useMemo(
    () => NODES.find((node) => node.id === activeId) ?? NODES[0],
    [activeId]
  );

  function selectNode(id: string) {
    setActiveId(id);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function nextNode() {
    const index = NODES.findIndex((node) => node.id === active.id);
    selectNode(NODES[(index + 1) % NODES.length].id);
  }

  return (
    <section className="learning-atlas" aria-labelledby="learning-atlas-title">
      <div className="learning-atlas__glow" aria-hidden="true" />
      <div className="learning-atlas__grid" aria-hidden="true" />

      <div className="learning-atlas__inner">
        <header className="learning-atlas__header">
          <div>
            <p className="learning-atlas__eyebrow">16 / THE LEARNING ATLAS</p>
            <h2 id="learning-atlas-title">
              SIX DIRECTIONS.
              <br />
              <em>ONE INQUIRY.</em>
            </h2>
          </div>
          <p className="learning-atlas__intro">
            There is no required order for understanding. This map is a way to
            see how self-observation, thought, texts, society, and action can
            be examined as connected questions.
          </p>
        </header>

        <div className="learning-atlas__workspace">
          <div className="learning-atlas__map" aria-label="Learning domains">
            <div className="learning-atlas__orbit learning-atlas__orbit--outer" />
            <div className="learning-atlas__orbit learning-atlas__orbit--inner" />
            <div className="learning-atlas__center">
              <span>THE</span>
              <strong>QUESTION</strong>
            </div>

            {CONNECTIONS.map(([from, to]) => (
              <div
                key={`${from}-${to}`}
                className={`learning-atlas__connection learning-atlas__connection--${from}-${to}`}
                aria-hidden="true"
              />
            ))}

            {NODES.map((node, index) => {
              const angle = -90 + index * 60;
              const activeState = active.id === node.id;
              const visitedState = visited.includes(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`learning-atlas__node ${
                    activeState ? "is-active" : ""
                  } ${visitedState ? "is-visited" : ""}`}
                  style={
                    {
                      "--angle": `${angle}deg`,
                    } as React.CSSProperties
                  }
                  onClick={() => selectNode(node.id)}
                  aria-pressed={activeState}
                  aria-label={`${node.number} ${node.label}`}
                >
                  <span className="learning-atlas__node-ring" />
                  <span className="learning-atlas__node-number">{node.number}</span>
                  <span className="learning-atlas__node-label">{node.label}</span>
                </button>
              );
            })}
          </div>

          <article className="learning-atlas__panel">
            <div className="learning-atlas__panel-top">
              <span>{active.number}</span>
              <span>{active.label}</span>
              <span>{visited.length.toString().padStart(2, "0")} / 06 EXPLORED</span>
            </div>

            <div className="learning-atlas__panel-content">
              <p className="learning-atlas__panel-kicker">CURRENT DIRECTION</p>
              <h3>{active.title}</h3>
              <p className="learning-atlas__description">{active.description}</p>

              <div className="learning-atlas__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="learning-atlas__practice">
                <span>TRY THIS</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="learning-atlas__panel-bottom">
              <button type="button" onClick={nextNode}>
                EXPLORE NEXT <span>↗</span>
              </button>
              <div className="learning-atlas__progress" aria-label={`${visited.length} of 6 explored`}>
                {NODES.map((node) => (
                  <span
                    key={node.id}
                    className={visited.includes(node.id) ? "is-filled" : ""}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="learning-atlas__footer">
          <p>
            <span>NOTE</span> The map is a navigation device, not a hierarchy.
            Return to any direction whenever the question changes.
          </p>
          <a href="#inquiry-lab">CONTINUE TO THE INQUIRY LAB ↗</a>
        </div>
      </div>

     
    </section>
  );
}
