/* V56 — InquiryLab
 * Larger isolated interactive module. Does not modify V41–V55.
 */
"use client";

import { useEffect, useState } from "react";

const SCENARIOS = [
  {
    no:"01", label:"A BELIEF",
    title:"Someone gives you an answer before you ask the question.",
    context:"A confident explanation arrives through family, culture, a teacher, a social feed, or a community. It may be right, wrong, incomplete, or useful in a particular context.",
    prompts:["What is the actual question?","What evidence would change your view?","What part of the answer is interpretation?"],
  },
  {
    no:"02", label:"A DESIRE",
    title:"You strongly want a particular outcome.",
    context:"The desire can quietly change what you notice. Evidence that supports the desired outcome may feel more convincing than evidence that complicates it.",
    prompts:["What do you want to be true?","What are you ignoring because it is inconvenient?","Would the observation change if the outcome changed?"],
  },
  {
    no:"03", label:"A CONFLICT",
    title:"Two people are certain they are seeing the same event correctly.",
    context:"Memory, identity, expectation and attention can shape an account of what happened. The goal is not to manufacture agreement but to separate observation from interpretation.",
    prompts:["What was directly observed?","What was inferred afterward?","Which part is still uncertain?"],
  },
  {
    no:"04", label:"A CHOICE",
    title:"A decision feels urgent and personal.",
    context:"Pressure can compress attention. A short pause can make room to distinguish facts, assumptions, fears, values and consequences before acting.",
    prompts:["What is known?","What is assumed?","What consequence are you unwilling to look at?"],
  },
];

const FILTERS = [
  ["FACT","What can be checked?"],
  ["ASSUMPTION","What am I adding?"],
  ["MOTIVE","What do I want?"],
  ["CONSEQUENCE","What follows?"],
];

export default function InquiryLab(){
  const [scenario,setScenario]=useState(0);
  const [filter,setFilter]=useState(0);
  const [checked,setChecked]=useState<number[]>([]);
  const [complete,setComplete]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v56-inquiry-lab","true");
    style.textContent=`
      .v56-lab{position:relative;z-index:7;min-height:170vh;padding:15vh 7vw 18vh;overflow:hidden;background:#030305;isolation:isolate}
      .v56-lab:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 72% 18%,rgba(177,157,255,.085),transparent 25%),radial-gradient(circle at 20% 70%,rgba(255,180,100,.035),transparent 23%);pointer-events:none}
      .v56-lab-inner{position:relative;width:min(1280px,100%);margin:auto}
      .v56-lab-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px}.v56-lab-kicker,.v56-lab-index{margin:0;font:500 9px/1 Arial,sans-serif;letter-spacing:.25em;color:rgba(255,255,255,.38)}.v56-lab-index{color:rgba(255,255,255,.18)}
      .v56-lab-hero{padding:13vh 0 11vh;max-width:1120px}.v56-lab-hero h2{margin:0;font:400 clamp(58px,9vw,138px)/.81 Georgia,serif;letter-spacing:-.075em;color:rgba(255,255,255,.95)}.v56-lab-hero h2 em{font-style:normal;color:rgba(185,165,255,.9)}.v56-lab-lead{max-width:580px;margin:44px 0 0;color:rgba(255,255,255,.4);font:400 13px/1.9 Arial,sans-serif}
      .v56-lab-switch{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.11);border-bottom:1px solid rgba(255,255,255,.11)}.v56-scenario{min-height:120px;padding:22px 18px;border:0;border-right:1px solid rgba(255,255,255,.07);background:transparent;text-align:left;color:rgba(255,255,255,.28);cursor:pointer;transition:.4s}.v56-scenario:last-child{border-right:0}.v56-scenario:hover,.v56-scenario.active{background:rgba(255,255,255,.025);color:rgba(255,255,255,.9)}.v56-scenario strong{display:block;color:rgba(185,165,255,.65);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}.v56-scenario span{display:block;margin-top:27px;font:400 16px/1.25 Georgia,serif}
      .v56-case{margin-top:8vh;border:1px solid rgba(255,255,255,.11);display:grid;grid-template-columns:1fr 1fr;min-height:600px}.v56-case-copy{padding:60px 6vw;border-right:1px solid rgba(255,255,255,.09);display:flex;flex-direction:column;justify-content:space-between}.v56-case-meta{display:flex;justify-content:space-between;color:rgba(255,255,255,.22);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v56-case-meta strong{color:rgba(185,165,255,.72);font-weight:500}.v56-case-copy h3{margin:0 0 25px;font:400 clamp(36px,4.6vw,67px)/.93 Georgia,serif;letter-spacing:-.05em;color:rgba(255,255,255,.94)}.v56-context{max-width:590px;color:rgba(255,255,255,.43);font:400 12px/1.9 Arial,sans-serif}.v56-questions{margin-top:36px}.v56-q{display:flex;gap:13px;margin:0 0 12px;color:rgba(255,255,255,.62);font:400 14px/1.45 Georgia,serif}.v56-q i{width:4px;height:4px;flex:none;margin-top:8px;border-radius:50%;background:rgba(185,165,255,.7)}
      .v56-case-filter{padding:60px 6vw;display:flex;flex-direction:column;justify-content:space-between}.v56-filter-title{margin:0 0 28px;color:rgba(255,255,255,.23);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}.v56-filter-tabs{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(255,255,255,.08)}.v56-filter{min-height:95px;padding:19px;border:0;border-right:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07);background:transparent;text-align:left;color:rgba(255,255,255,.3);cursor:pointer;transition:.4s}.v56-filter:nth-child(even){border-right:0}.v56-filter:hover,.v56-filter.active{background:rgba(185,165,255,.035);color:rgba(255,255,255,.9)}.v56-filter strong{display:block;color:rgba(185,165,255,.7);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v56-filter span{display:block;margin-top:18px;font:400 14px/1.3 Georgia,serif}
      .v56-insight{margin-top:30px;padding:24px 0;border-top:1px solid rgba(255,255,255,.09);border-bottom:1px solid rgba(255,255,255,.09)}.v56-insight-label{margin:0 0 14px;color:rgba(255,255,255,.2);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}.v56-insight p:last-child{margin:0;color:rgba(255,255,255,.56);font:400 18px/1.45 Georgia,serif}
      .v56-completion{margin-top:8vh;padding:6vh 6vw;border:1px solid rgba(185,165,255,.14);display:flex;align-items:center;justify-content:space-between;gap:30px;background:radial-gradient(circle at 80% 50%,rgba(185,165,255,.055),transparent 30%)}.v56-completion p{margin:0;color:rgba(255,255,255,.4);font:400 12px/1.7 Arial,sans-serif}.v56-completion strong{display:block;margin-bottom:9px;color:rgba(255,255,255,.78);font:400 24px/1.2 Georgia,serif}.v56-complete-btn{border:1px solid rgba(185,165,255,.38);border-radius:999px;padding:14px 22px;background:transparent;color:rgba(255,255,255,.72);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em;cursor:pointer;white-space:nowrap}.v56-complete-btn:hover{border-color:rgba(185,165,255,.8);color:#fff}
      .v56-note{margin:6vh 0 0;max-width:760px;color:rgba(255,255,255,.21);font:400 11px/1.8 Arial,sans-serif}
      @media(max-width:850px){.v56-lab{padding:12vh 6vw 15vh}.v56-lab-switch{grid-template-columns:1fr 1fr}.v56-scenario{border-bottom:1px solid rgba(255,255,255,.07)}.v56-case{grid-template-columns:1fr}.v56-case-copy{border-right:0;border-bottom:1px solid rgba(255,255,255,.09);min-height:580px}.v56-case-filter{min-height:550px}.v56-completion{align-items:flex-start;flex-direction:column}}
      @media(max-width:520px){.v56-lab-switch{grid-template-columns:1fr}.v56-scenario{border-right:0;min-height:76px;padding:16px 12px}.v56-scenario span{margin-top:12px}.v56-case-copy,.v56-case-filter{padding:43px 5vw}.v56-case-copy{min-height:620px}.v56-filter-tabs{grid-template-columns:1fr}.v56-filter{border-right:0!important}.v56-completion{padding:35px 25px}}
      @media(prefers-reduced-motion:reduce){.v56-scenario,.v56-filter,.v56-complete-btn{transition:none}}
    `;
    document.head.appendChild(style);
    return()=>style.remove();
  },[]);

  const current=SCENARIOS[scenario], currentFilter=FILTERS[filter];

  function togglePrompt(i:number){
    setChecked(v=>v.includes(i)?v.filter(x=>x!==i):[...v,i]);
  }

  return <section className="v56-lab" id="inquiry-lab" aria-labelledby="v56-lab-title">
    <div className="v56-lab-inner">
      <div className="v56-lab-top"><p className="v56-lab-kicker">15 / THE INQUIRY LAB</p><p className="v56-lab-index">OBSERVATION / ASSUMPTION / MOTIVE / CONSEQUENCE</p></div>
      <div className="v56-lab-hero">
        <h2 id="v56-lab-title">DON’T JUST<br/><em>THINK</em> ABOUT<br/>INQUIRY. TEST IT.</h2>
        <p className="v56-lab-lead">A small interactive laboratory for separating what happened from what was added afterward. There is no score and no correct personality type. The exercise is simply to slow the movement from observation to conclusion.</p>
      </div>

      <div className="v56-lab-switch" role="tablist" aria-label="Inquiry scenarios">
        {SCENARIOS.map((s,i)=><button key={s.no} type="button" className={"v56-scenario "+(i===scenario?"active":"")} onClick={()=>{setScenario(i);setFilter(0);setChecked([])}}><strong>{s.no} / {s.label}</strong><span>{s.title}</span></button>)}
      </div>

      <div className="v56-case">
        <article className="v56-case-copy">
          <div className="v56-case-meta"><span><strong>{current.label}</strong> / CASE</span><span>{current.no} / 04</span></div>
          <div>
            <h3>{current.title}</h3>
            <p className="v56-context">{current.context}</p>
            <div className="v56-questions">
              {current.prompts.map((q,i)=><button key={q} type="button" className="v56-q" onClick={()=>togglePrompt(i)} aria-pressed={checked.includes(i)} style={{opacity:checked.includes(i)?1:.68,textDecoration:checked.includes(i)?"line-through":"none",textDecorationColor:"rgba(185,165,255,.45)"}}><i/>{q}</button>)}
            </div>
          </div>
          <div style={{color:"rgba(255,255,255,.2)",font:"500 8px/1 Arial,sans-serif",letterSpacing:".18em"}}>{checked.length} / {current.prompts.length} PROMPTS EXAMINED</div>
        </article>

        <aside className="v56-case-filter">
          <div>
            <p className="v56-filter-title">FOUR FILTERS / SELECT ONE</p>
            <div className="v56-filter-tabs">
              {FILTERS.map((f,i)=><button key={f[0]} type="button" className={"v56-filter "+(i===filter?"active":"")} onClick={()=>setFilter(i)}><strong>{f[0]}</strong><span>{f[1]}</span></button>)}
            </div>
            <div className="v56-insight" aria-live="polite"><p className="v56-insight-label">CURRENT LENS / {currentFilter[0]}</p><p>{currentFilter[1]}</p></div>
          </div>
          <p style={{margin:0,color:"rgba(255,255,255,.22)",font:"500 8px/1.7 Arial,sans-serif",letterSpacing:".14em"}}>THE FILTER DOES NOT GIVE THE ANSWER. IT CHANGES WHAT YOU LOOK FOR.</p>
        </aside>
      </div>

      <div className="v56-completion">
        <p><strong>{complete?"INQUIRY CONTINUES.":"READY TO CONTINUE?"}</strong>{complete?"Take the same four filters into an ordinary situation and observe before concluding.":"There is nothing to submit. Marking this complete only changes the visual state of this module."}</p>
        <button type="button" className="v56-complete-btn" onClick={()=>setComplete(v=>!v)}>{complete?"RESET LAB":"COMPLETE THIS PASS"}</button>
      </div>
      <p className="v56-note">This is an educational reflection tool, not a diagnostic test or a substitute for evidence, professional advice, or careful investigation of complex real-world questions.</p>
    </div>
  </section>;
}
