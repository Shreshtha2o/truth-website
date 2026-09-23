/* V49 — LivingPracticeSection
 * Isolated interactive practice section. Does not modify V41–V48.
 */
"use client";

import { useEffect, useState } from "react";

const PRACTICES = [
  {
    n:"01", label:"NOTICE", title:"Catch the first reaction.",
    body:"When something pleasant or unpleasant happens, pause before explaining it. Notice the immediate movement: attraction, resistance, fear, comparison or justification.",
    prompt:"What appeared in you before the story about it?",
  },
  {
    n:"02", label:"TRACE", title:"Follow the thought backward.",
    body:"Take one strong opinion and ask what supports it. Was it directly observed, learned from someone, repeated by a group, or built from an earlier experience?",
    prompt:"Where did this certainty come from?",
  },
  {
    n:"03", label:"TEST", title:"Look without protecting the conclusion.",
    body:"Hold an idea lightly enough to examine evidence that does not fit it. The purpose is not to replace one belief with its opposite, but to see the structure of the belief.",
    prompt:"What would you notice if you stopped defending the answer?",
  },
  {
    n:"04", label:"RETURN", title:"Come back to observation.",
    body:"Inquiry is not completed by one insight. Return to the same question in ordinary situations—work, relationships, ambition, conflict and choice—and see what changes.",
    prompt:"Can the question survive everyday life?",
  },
];

export default function LivingPracticeSection(){
  const [active,setActive]=useState(0);
  const [seconds,setSeconds]=useState(60);
  const [running,setRunning]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v49-practice","true");
    style.textContent=`
      .v49-practice{position:relative;z-index:7;min-height:112vh;padding:16vh 7vw 17vh;overflow:hidden;isolation:isolate;background:radial-gradient(circle at 28% 38%,rgba(255,169,91,.045),transparent 25%),radial-gradient(circle at 78% 65%,rgba(120,94,255,.08),transparent 30%),linear-gradient(180deg,#030308,#05050c)}
      .v49-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v49-top{display:flex;justify-content:space-between;gap:25px;border-top:1px solid rgba(255,255,255,.13);padding-top:17px;margin-bottom:8vh}
      .v49-kicker,.v49-index{margin:0;color:rgba(255,255,255,.45);font:500 9px/1 Arial,sans-serif;letter-spacing:.24em}.v49-index{color:rgba(255,255,255,.23)}
      .v49-heading{display:grid;grid-template-columns:1.2fr .8fr;gap:8vw;align-items:end;margin-bottom:10vh}
      .v49-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(52px,7.7vw,118px)/.84 Georgia,"Times New Roman",serif;letter-spacing:-.065em}.v49-title span{color:rgba(183,163,255,.92)}
      .v49-intro{max-width:400px;margin:0 0 4px;color:rgba(255,255,255,.45);font:400 13px/1.8 Arial,sans-serif}
      .v49-grid{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:610px;border-top:1px solid rgba(255,255,255,.13);border-bottom:1px solid rgba(255,255,255,.13)}
      .v49-nav{border-right:1px solid rgba(255,255,255,.11);padding:12px 0}
      .v49-tab{width:100%;min-height:100px;padding:20px 23px;display:grid;grid-template-columns:30px 1fr;gap:14px;border:0;border-left:2px solid transparent;background:transparent;color:rgba(255,255,255,.32);text-align:left;cursor:pointer;transition:.45s ease}
      .v49-tab:hover,.v49-tab.is-active{color:rgba(255,255,255,.92);background:rgba(255,255,255,.025)}.v49-tab.is-active{border-left-color:rgba(183,163,255,.85)}
      .v49-num{font:500 9px/1 Arial,sans-serif;letter-spacing:.15em}.v49-label{font:500 9px/1 Arial,sans-serif;letter-spacing:.2em}
      .v49-main{position:relative;padding:55px 6vw 45px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.v49-main:before{content:"INQUIRY";position:absolute;right:2vw;bottom:-45px;color:rgba(255,255,255,.022);font:700 clamp(100px,15vw,235px)/.8 Arial,sans-serif;letter-spacing:-.1em}
      .v49-meta{position:relative;display:flex;justify-content:space-between;color:rgba(255,255,255,.24);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v49-meta strong{color:rgba(183,163,255,.65);font-weight:500}
      .v49-copy{position:relative;max-width:760px}.v49-copy h3{margin:0 0 24px;color:rgba(255,255,255,.94);font:400 clamp(36px,4.8vw,70px)/.94 Georgia,"Times New Roman",serif;letter-spacing:-.045em}.v49-body{max-width:630px;margin:0;color:rgba(255,255,255,.48);font:400 13px/1.85 Arial,sans-serif}.v49-prompt{margin:34px 0 0;padding-left:17px;border-left:1px solid rgba(183,163,255,.55);color:rgba(255,255,255,.72);font:400 17px/1.5 Georgia,"Times New Roman",serif}
      .v49-bottom{position:relative;display:flex;justify-content:space-between;align-items:flex-end;gap:25px}.v49-rule{width:125px;height:1px;background:rgba(255,255,255,.18)}.v49-note{margin:0;color:rgba(255,255,255,.25);font:500 8px/1.5 Arial,sans-serif;letter-spacing:.16em}
      .v49-timer{margin-top:9vh;display:flex;align-items:center;justify-content:center;gap:18px}.v49-timer button{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:13px 19px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.7);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em;cursor:pointer}.v49-timer button:hover{border-color:rgba(183,163,255,.6)}.v49-clock{min-width:72px;color:rgba(255,255,255,.8);font:400 24px/1 Georgia,serif;text-align:center}
      .v49-foot{max-width:720px;margin:7vh 0 0;color:rgba(255,255,255,.27);font:400 11px/1.7 Arial,sans-serif}
      @media(max-width:850px){.v49-practice{min-height:auto;padding:13vh 6vw 15vh}.v49-heading{grid-template-columns:1fr;gap:28px}.v49-grid{grid-template-columns:1fr}.v49-nav{display:grid;grid-template-columns:repeat(2,1fr);border-right:0;border-bottom:1px solid rgba(255,255,255,.11);padding:0}.v49-tab{min-height:76px;border-left:0;border-bottom:2px solid transparent;padding:15px 12px}.v49-tab.is-active{border-bottom-color:rgba(183,163,255,.85)}.v49-main{min-height:590px;padding:43px 5vw}}
      @media(max-width:520px){.v49-tab{grid-template-columns:1fr;gap:6px}.v49-main{min-height:630px}.v49-timer{margin-top:7vh;flex-wrap:wrap}}
      @media(prefers-reduced-motion:reduce){.v49-tab,.v49-timer button{transition:none}}
    `;
    document.head.appendChild(style); return()=>style.remove();
  },[]);

  useEffect(()=>{
    if(!running) return;
    const id=window.setInterval(()=>setSeconds(s=>{
      if(s<=1){setRunning(false);return 60}
      return s-1;
    }),1000);
    return()=>window.clearInterval(id);
  },[running]);

  const p=PRACTICES[active];

  return <section className="v49-practice" id="practice" aria-labelledby="v49-title">
    <div className="v49-inner">
      <div className="v49-top"><p className="v49-kicker">08 / LIVING PRACTICE</p><p className="v49-index">READ → OBSERVE → TEST → RETURN</p></div>
      <div className="v49-heading"><h2 className="v49-title" id="v49-title">MAKE THE<br/><span>QUESTION</span><br/>LIVING.</h2><p className="v49-intro">A philosophy becomes useful when it can be examined in ordinary moments. These small practices are prompts, not prescriptions.</p></div>
      <div className="v49-grid">
        <nav className="v49-nav" aria-label="Inquiry practices">
          {PRACTICES.map((x,i)=><button key={x.n} type="button" className={"v49-tab "+(active===i?"is-active":"")} onClick={()=>{setActive(i);setRunning(false)}} aria-selected={active===i}><span className="v49-num">{x.n}</span><span className="v49-label">{x.label}</span></button>)}
        </nav>
        <article className="v49-main" aria-live="polite">
          <div className="v49-meta"><span><strong>{p.label}</strong> / PRACTICE</span><span>{p.n} / 04</span></div>
          <div className="v49-copy"><h3 key={p.n}>{p.title}</h3><p className="v49-body">{p.body}</p><p className="v49-prompt">{p.prompt}</p></div>
          <div className="v49-bottom"><span className="v49-rule"/><p className="v49-note">ONE MINUTE · NO PERFORMANCE · JUST OBSERVATION</p></div>
        </article>
      </div>
      <div className="v49-timer"><button type="button" onClick={()=>setRunning(v=>!v)}>{running?"PAUSE":"START"} 60-SECOND PRACTICE</button><span className="v49-clock">00:{String(seconds).padStart(2,"0")}</span></div>
      <p className="v49-foot">Use the timer only as a simple pause. The point is not to complete an exercise perfectly, but to notice what actually happens when attention is given without immediately reaching for an answer.</p>
    </div>
  </section>;
}
