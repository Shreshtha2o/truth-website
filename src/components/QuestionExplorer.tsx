"use client";

import { useMemo, useState } from "react";

type Perspective = { label: string; text: string };
type Question = { id: string; number: string; question: string; framing: string; perspectives: Perspective[]; sourceNote: string; openQuestion: string };

const QUESTIONS: Question[] = [
  { id:"knowledge", number:"01", question:"What do I actually know?", framing:"Separate direct observation, remembered information, interpretation and belief before deciding what follows.", perspectives:[
    {label:"OBSERVATION",text:"What could be independently checked or directly observed?"},
    {label:"INTERPRETATION",text:"What meaning or explanation am I adding to what was observed?"},
    {label:"BELIEF",text:"Which parts am I accepting because they were inherited, repeated or emotionally compelling?"},
  ], sourceNote:"Use this panel as a method template. Attach verified sources to individual claims before publishing them as factual conclusions.", openQuestion:"What evidence would make you revise your current view?" },
  { id:"self", number:"02", question:"Who is the one looking?", framing:"Examine the observer as carefully as the object being observed: motives, assumptions, identity and attention.", perspectives:[
    {label:"EXPERIENCE",text:"What is happening in experience before I describe it?"},
    {label:"IDENTITY",text:"Which roles, memories and labels am I treating as a permanent self?"},
    {label:"MOTIVE",text:"What do I want this conclusion to be true for?"},
  ], sourceNote:"Philosophical questions should distinguish a tradition's interpretation from a claim about objective reality.", openQuestion:"If the desired answer disappeared, what would remain worth examining?" },
  { id:"world", number:"03", question:"What do my choices change?", framing:"Move from private intention to observable consequences for other people, animals, institutions and ecosystems.", perspectives:[
    {label:"SYSTEM",text:"What larger systems make this choice possible?"},
    {label:"CONSEQUENCE",text:"Who or what bears costs that are not visible at the point of choice?"},
    {label:"ALTERNATIVE",text:"What realistic alternatives change the trade-offs?"},
  ], sourceNote:"Consequences should be supported with relevant empirical evidence rather than inferred from moral intuition alone.", openQuestion:"Which consequence would you investigate before making the next decision?" },
];

export default function QuestionExplorer(){
  const [activeId,setActiveId]=useState(QUESTIONS[0].id);
  const [tab,setTab]=useState(0);
  const active=useMemo(()=>QUESTIONS.find(q=>q.id===activeId) ?? QUESTIONS[0],[activeId]);
  return <section id="question-explorer" className="question-explorer" aria-labelledby="question-explorer-title">
    <div className="question-explorer__intro">
      <p className="eyebrow">DEEP DIVE / QUESTION</p>
      <h2 id="question-explorer-title">DON’T JUST <span>ASK.</span><br/>EXAMINE.</h2>
      <p>Choose a question. Separate what is observed from what is interpreted. Then identify what remains open.</p>
    </div>
    <div className="question-explorer__grid">
      <nav className="question-explorer__questions" aria-label="Questions">
        {QUESTIONS.map(q=><button key={q.id} className={q.id===active.id?"is-active":""} onClick={()=>{setActiveId(q.id);setTab(0)}}>
          <span>{q.number}</span><strong>{q.question}</strong><i aria-hidden="true">↗</i>
        </button>)}
      </nav>
      <article className="question-explorer__panel">
        <p className="question-explorer__number">{active.number} / {QUESTIONS.length}</p>
        <h3>{active.question}</h3>
        <p className="question-explorer__framing">{active.framing}</p>
        <div className="question-explorer__tabs" role="tablist" aria-label="Examination layers">
          {active.perspectives.map((p,i)=><button key={p.label} role="tab" aria-selected={tab===i} onClick={()=>setTab(i)}>{p.label}</button>)}
        </div>
        <div className="question-explorer__answer" role="tabpanel">
          <span>{active.perspectives[tab].label}</span>
          <p>{active.perspectives[tab].text}</p>
        </div>
        <div className="question-explorer__notes"><div><small>SOURCE METHOD</small><p>{active.sourceNote}</p></div><div><small>OPEN QUESTION</small><p>{active.openQuestion}</p></div></div>
      </article>
    </div>
  </section>;
}
