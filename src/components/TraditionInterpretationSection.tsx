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
    id: "text",
    no: "01",
    label: "TEXT",
    title: "WHAT DOES THE SOURCE ACTUALLY SAY?",
    text: "Begin with the words themselves. A translation, quotation, paraphrase, or remembered line can each introduce choices. Separate the primary text from later summaries and explanations.",
    question: "Am I responding to the source, or to someone's description of it?",
    practice: "Write the exact passage or reference before interpreting it.",
  },
  {
    id: "context",
    no: "02",
    label: "CONTEXT",
    title: "WHAT SURROUNDS THE PASSAGE?",
    text: "A statement can change meaning when its surrounding passage, genre, historical setting, intended audience, or larger argument is ignored. Context does not produce one automatic interpretation, but it can constrain careless ones.",
    question: "What relevant context am I leaving outside the frame?",
    practice: "Read the surrounding section before drawing a conclusion.",
  },
  {
    id: "translation",
    no: "03",
    label: "TRANSLATION",
    title: "WHAT CHANGED IN TRANSLATION?",
    text: "Moving between languages involves choices about words, syntax, tone, and concepts. Different translations can foreground different nuances without making every translation equally reliable.",
    question: "Which key word or phrase carries interpretive weight here?",
    practice: "Compare the wording of at least two credible translations when available.",
  },
  {
    id: "tradition",
    no: "04",
    label: "TRADITION",
    title: "WHO HAS BEEN READING THIS — AND HOW?",
    text: "Traditions develop through commentaries, teachers, practices, institutions, debates, and communities. A living tradition may contain multiple interpretations rather than a single timeless voice.",
    question: "Whose interpretation am I treating as the whole tradition?",
    practice: "Name the tradition or interpreter behind the reading you are using.",
  },
  {
    id: "interpretation",
    no: "05",
    label: "INTERPRETATION",
    title: "WHERE DOES READING BECOME INTERPRETATION?",
    text: "Interpretation can illuminate a text, but it is not identical to the text. Make the transition visible: first the source, then the reading being proposed, then the reasons offered for that reading.",
    question: "Which sentence is the source, and which sentence is my interpretation?",
    practice: "Mark one claim as source-derived and one as interpretive.",
  },
  {
    id: "comparison",
    no: "06",
    label: "COMPARISON",
    title: "WHAT CHANGES WHEN VOICES MEET?",
    text: "Comparing traditions can reveal both resonances and genuine differences. Similar vocabulary does not necessarily mean identical concepts, and disagreement does not automatically make a tradition incoherent.",
    question: "Am I comparing concepts, words, practices, or my own assumptions?",
    practice: "Choose one precise point of similarity and one precise difference.",
  },
  {
    id: "return",
    no: "07",
    label: "RETURN",
    title: "CAN YOU READ AGAIN WITHOUT PRETENDING TO KNOW?",
    text: "After examining source, context, translation, tradition, and interpretation, return to the passage. The aim is not to manufacture certainty but to make the grounds of understanding more visible.",
    question: "What do I now know — and what remains open?",
    practice: "Write one conclusion and one unresolved question.",
  },
];

export default function TraditionInterpretationSection() {
  const [activeId, setActiveId] = useState("text");
  const [visited, setVisited] = useState<string[]>(["text"]);
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
      id="tradition-interpretation"
      className="tradition-interpretation"
      aria-labelledby="tradition-interpretation-title"
    >
      <div className="tradition-interpretation__halo" aria-hidden="true" />
      <div className="tradition-interpretation__rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="tradition-interpretation__inner">
        <header className="tradition-interpretation__header">
          <div>
            <p className="tradition-interpretation__eyebrow">28 / TRADITION · TEXT · INTERPRETATION</p>
            <h2 id="tradition-interpretation-title">
              READ THE
              <br />
              <em>READER.</em>
            </h2>
          </div>

          <div className="tradition-interpretation__intro">
            <span>SOURCE → CONTEXT → TRANSLATION → TRADITION → INTERPRETATION</span>
            <p>
              A reading room for separating what a text says from the layers
              through which people encounter, explain, and debate it.
            </p>
          </div>
        </header>

        <div className="tradition-interpretation__progress">
          <div>
            <span>READING PASS</span>
            <strong>{visited.length} / {LENSES.length}</strong>
          </div>
          <div className="tradition-interpretation__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="tradition-interpretation__workspace">
          <nav className="tradition-interpretation__rail" aria-label="Tradition and interpretation lenses">
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

          <article className="tradition-interpretation__panel">
            <div className="tradition-interpretation__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>READING FIELD</span>
            </div>

            <div className="tradition-interpretation__content">
              <p className="tradition-interpretation__micro">CURRENT LENS</p>
              <h3>{active.title}</h3>
              <p className="tradition-interpretation__text">{active.text}</p>

              <div className="tradition-interpretation__question">
                <span>QUESTION</span>
                <p>{active.question}</p>
              </div>

              <div className="tradition-interpretation__field">
                <label htmlFor="tradition-interpretation-note">READING NOTE</label>
                <textarea
                  id="tradition-interpretation-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Record the source, context, interpretive move, or uncertainty you want to examine…"
                />
              </div>

              <div className="tradition-interpretation__practice">
                <span>SMALL PRACTICE</span>
                <p>{active.practice}</p>
              </div>
            </div>

            <div className="tradition-interpretation__controls">
              <button type="button" onClick={nextLens}>
                NEXT LENS <span>↗</span>
              </button>
              <button type="button" onClick={() => setVisited((current) =>
                current.includes(active.id) ? current : [...current, active.id]
              )}>
                {visited.includes(active.id) ? "EXAMINED" : "MARK EXAMINED"}
              </button>
            </div>
          </article>
        </div>

        <footer className="tradition-interpretation__footer">
          <p>
            <span>METHOD NOTE</span> No single module can settle the meaning of
            a tradition. Primary texts, scholarship, translations, and lived
            traditions can contain genuine differences and disagreements.
          </p>
          <a href="#reading-room">RETURN TO READING ROOM ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
