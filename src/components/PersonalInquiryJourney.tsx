 "use client";

import { useMemo, useState } from "react";

type Step = {
  id: string;
  no: string;
  label: string;
  title: string;
  text: string;
  prompt: string;
  action: string;
};

const STEPS: Step[] = [
  {
    id: "notice",
    no: "01",
    label: "NOTICE",
    title: "START WITH WHAT IS HERE.",
    text: "Begin with an event, thought, reaction, desire, or belief that is concrete enough to observe. Do not begin by explaining it.",
    prompt: "What is happening right now — before I interpret it?",
    action: "Write one observable fact without adding a reason.",
  },
  {
    id: "question",
    no: "02",
    label: "QUESTION",
    title: "TURN THE CERTAINTY INTO A QUESTION.",
    text: "A useful question does not merely decorate an existing conclusion. It opens the part of the situation that you have not yet examined.",
    prompt: "What am I assuming that I have not actually checked?",
    action: "Convert one conclusion into a genuine question.",
  },
  {
    id: "trace",
    no: "03",
    label: "TRACE",
    title: "FOLLOW THE PATTERN BACKWARD.",
    text: "Trace the thought, desire, fear, expectation, or identity behind the reaction. The aim is not to blame yourself; it is to make the sequence visible.",
    prompt: "What happened immediately before this reaction or conclusion?",
    action: "Follow the chain back by asking “what came before?” three times.",
  },
  {
    id: "test",
    no: "04",
    label: "TEST",
    title: "LET REALITY INTERRUPT THE STORY.",
    text: "Look for evidence that could support or challenge the interpretation. Keep observation and explanation separate while you test it.",
    prompt: "What could I observe that would make me revise this view?",
    action: "Name one confirming and one disconfirming observation.",
  },
  {
    id: "connect",
    no: "05",
    label: "CONNECT",
    title: "FOLLOW THE CONSEQUENCES.",
    text: "A private pattern can have consequences in relationships, work, society, technology, or action. Examine the connection without assuming that one level explains everything.",
    prompt: "Where does this pattern become visible beyond me?",
    action: "Trace one consequence at the next wider level.",
  },
  {
    id: "choose",
    no: "06",
    label: "CHOOSE",
    title: "MAKE THE NEXT STEP SMALL ENOUGH TO TEST.",
    text: "Clarity does not require a grand declaration. A small, reversible action can reveal more than a large promise.",
    prompt: "What can I change or test without pretending to know everything?",
    action: "Choose one small experiment and define what you will observe.",
  },
  {
    id: "return",
    no: "07",
    label: "RETURN",
    title: "COME BACK WITHOUT THE PERFORMANCE.",
    text: "After acting, return to the original question. What changed? What stayed? What did you learn, and what remains uncertain?",
    prompt: "What do I see now that I could not see before?",
    action: "Write one changed understanding and one open question.",
  },
];

export default function PersonalInquiryJourney() {
  const [activeId, setActiveId] = useState("notice");
  const [visited, setVisited] = useState<string[]>(["notice"]);
  const [note, setNote] = useState("");
  const [started, setStarted] = useState(false);

  const active = useMemo(
    () => STEPS.find((step) => step.id === activeId) ?? STEPS[0],
    [activeId]
  );

  const progress = Math.round((visited.length / STEPS.length) * 100);

  function selectStep(id: string) {
    setActiveId(id);
    setStarted(true);
    setVisited((current) => (current.includes(id) ? current : [...current, id]));
  }

  function nextStep() {
    const index = STEPS.findIndex((step) => step.id === active.id);
    selectStep(STEPS[(index + 1) % STEPS.length].id);
  }

  return (
    <section
      id="personal-inquiry-journey"
      className="personal-inquiry-journey"
      aria-labelledby="personal-inquiry-journey-title"
    >
      <div className="personal-inquiry-journey__orbit" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <div className="personal-inquiry-journey__inner">
        <header className="personal-inquiry-journey__header">
          <div>
            <p className="personal-inquiry-journey__eyebrow">30 / THE PERSONAL INQUIRY JOURNEY</p>
            <h2 id="personal-inquiry-journey-title">
              MAKE IT
              <br />
              <em>YOUR QUESTION.</em>
            </h2>
          </div>

          <div className="personal-inquiry-journey__intro">
            <span>NOTICE → QUESTION → TRACE → TEST → CONNECT → CHOOSE → RETURN</span>
            <p>
              A guided sequence for taking one real question through observation,
              examination, experiment, and return. No score. No diagnosis. No final answer supplied.
            </p>
          </div>
        </header>

        <div className="personal-inquiry-journey__progress">
          <div>
            <span>JOURNEY</span>
            <strong>{visited.length} / {STEPS.length}</strong>
          </div>
          <div className="personal-inquiry-journey__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="personal-inquiry-journey__workspace">
          <nav className="personal-inquiry-journey__rail" aria-label="Personal inquiry steps">
            {STEPS.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`${active.id === step.id ? "is-active" : ""} ${
                  visited.includes(step.id) ? "is-visited" : ""
                }`}
                onClick={() => selectStep(step.id)}
                aria-pressed={active.id === step.id}
              >
                <span>{step.no}</span>
                <b>{step.label}</b>
                <i>{visited.includes(step.id) ? "●" : "○"}</i>
              </button>
            ))}
          </nav>

          <article className="personal-inquiry-journey__panel">
            <div className="personal-inquiry-journey__panel-top">
              <span>{active.no} / {active.label}</span>
              <span>{started ? "INQUIRY ACTIVE" : "BEGIN HERE"}</span>
            </div>

            <div className="personal-inquiry-journey__content">
              <p className="personal-inquiry-journey__micro">CURRENT STEP</p>
              <h3>{active.title}</h3>
              <p className="personal-inquiry-journey__text">{active.text}</p>

              <div className="personal-inquiry-journey__question">
                <span>YOUR QUESTION</span>
                <p>{active.prompt}</p>
              </div>

              <div className="personal-inquiry-journey__field">
                <label htmlFor="personal-inquiry-note">PRIVATE WORKING NOTE</label>
                <textarea
                  id="personal-inquiry-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={4}
                  placeholder="Write only what you want to examine. This field stays in this component's React state and is not submitted anywhere."
                />
              </div>

              <div className="personal-inquiry-journey__action">
                <span>NEXT ACTION</span>
                <p>{active.action}</p>
              </div>
            </div>

            <div className="personal-inquiry-journey__controls">
              <button type="button" onClick={nextStep}>
                CONTINUE JOURNEY <span>↗</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setVisited((current) =>
                    current.includes(active.id) ? current : [...current, active.id]
                  )
                }
              >
                {visited.includes(active.id) ? "SEEN" : "MARK SEEN"}
              </button>
            </div>
          </article>
        </div>

        <footer className="personal-inquiry-journey__footer">
          <p>
            <span>METHOD NOTE</span> This is a reflective framework, not a
            psychological assessment or a promise that every question has one answer.
          </p>
          <a href="#inquiry-lab">RETURN TO INQUIRY LAB ↗</a>
        </footer>
      </div>

      
    </section>
  );
}
