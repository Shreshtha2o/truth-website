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
    id: "individual",
    no: "01",
    label: "INDIVIDUAL",
    title: "WHERE DOES A PRIVATE PATTERN BEGIN?",
    text: "A repeated reaction, desire, habit, or assumption can remain personal for a long time. Start by identifying the concrete pattern before connecting it to a larger social explanation.",
    question: "What do I repeatedly do, expect, avoid, or defend?",
    practice: "Describe the pattern using specific observations rather than a label.",
  },
  {
    id: "culture",
    no: "02",
    label: "CULTURE",
    title: "WHAT DOES THE ENVIRONMENT NORMALIZE?",
    text: "Families, peer groups, institutions, media, markets, and traditions can shape what feels ordinary. Influence does not mean complete determination; people can respond differently to the same environment.",
    question: "Which expectation around me feels so normal that I rarely examine it?",
    practice: "Name one social expectation and trace where you learned it.",
  },
  {
    id: "institution",
    no: "03",
    label: "INSTITUTION",
    title: "WHAT STRUCTURE KEEPS THE PATTERN GOING?",
    text: "Individual behaviour can interact with rules, incentives, resources, technologies, and institutions. Looking at structure helps avoid explaining every collective outcome only through personal intention.",
    question: "What system, rule, incentive, or constraint is involved?",
    practice: "Identify one mechanism that could reproduce the pattern.",
  },
  {
    id: "technology",
    no: "04",
    label: "TECHNOLOGY",
    title: "WHAT DOES THE TOOL MAKE EASIER?",
    text: "Tools can alter attention, speed, coordination, access, and behaviour. The relevant question is not simply whether technology is good or bad, but what its design makes easier, harder, visible, or invisible.",
    question: "What behaviour does this tool reward or reduce friction for?",
    practice: "Change one interaction rule and observe what changes.",
  },
  {
    id: "consequence",
    no: "05",
    label: "CONSEQUENCE",
    title: "WHO EXPERIENCES THE EFFECT?",
    text: "A change can create different consequences for different people, places, and time horizons. Follow the effects beyond the person or group closest to the decision.",
    question: "Who gains, who bears a cost, and what remains uncertain?",
    practice: "Trace one first-order and one second-order consequence.",
  },
  {
    id: "agency",
    no: "06",
    label: "AGENCY",
    title: "WHERE CAN ACTION ACTUALLY HAPPEN?",
    text: "Understanding systems should not become an excuse for helplessness. Separate what an individual can change directly, what requires collective action, and what needs institutional change.",
    question: "What is within my direct influence, and what requires coordination?",
    practice: "Name one action at the smallest useful level and one larger dependency.",
  },
  {
    id: "return",
    no: "07",
    label: "RETURN",
    title: "CAN YOU HOLD BOTH LEVELS?",
    text: "A social problem can have inner and structural dimensions at the same time. Return to the original pattern and ask what became clearer after examining the wider system.",
    question: "What changed in my understanding when I moved between self and world?",
    practice: "Write one individual factor and one structural factor without collapsing either into the other.",
  },
];

export default function SocietyWorldLaboratory() {
  const [activeId, setActiveId] = useState("individual");
  const [visited, setVisited] = useState<string[]>(["individual"]);
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
      id="society-world-laboratory"
      className="society-world-laboratory"
      aria-labelledby="society-world-laboratory-title"
    >
      <div className="society-world-laboratory__halo" aria-hidden="true" />
      <div className="society-world-laboratory__grid" aria-hidden="true" />

      <div className="society-world-laboratory__inner">
        <header className="society-world-laboratory__header">
          <div>
            <p className="society-world-laboratory__eyebrow">27 / THE SOCIETY · WORLD LABORATORY</p>
            <h2 id="society-world-laboratory-title">
              FROM
              <br />
              <em>SELF TO WORLD.</em>
            </h2>
          </div>

          <div className="society-world-laboratory__intro">
            <span>INDIVIDUAL → CULTURE → INSTITUTION → TECHNOLOGY → CONSEQUENCE</span>
            <p>
              A systems-thinking space for examining how personal patterns
              and wider structures can interact without reducing one to the other.
            </p>
          </div>
        </header>

        <div className="society-world-laboratory__progress">
          <div>
            <span>WORLD PASS</span>
            <strong>{visited.length} / {LENSES.length}</strong>
          </div>
          <div className="society-world-laboratory__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="society-world-laboratory__workspace">
          <nav className="society-world-laboratory__rail" aria-label="Society and world lenses">
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

          <article className="society-world-laboratory__panel">
            <div className="society-world-laboratory__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>SYSTEM FIELD</span>
            </div>

            <div className="society-world-laboratory__content">
              <p className="society-world-laboratory__micro">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="society-world-laboratory__text">{active.text}</p>

              <div className="society-world-laboratory__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="society-world-laboratory__field">
                <label htmlFor="society-world-note">SYSTEM NOTE</label>
                <textarea
                  id="society-world-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Record the pattern, structure, incentive, or consequence you are examining…"
                />
              </div>

              <div className="society-world-laboratory__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="society-world-laboratory__controls">
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

        <footer className="society-world-laboratory__footer">
          <p>
            <span>METHOD NOTE</span> Systems can constrain and influence
            behaviour without determining every individual’s response.
          </p>
          <a href="#impact">RETURN TO IMPACT ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
