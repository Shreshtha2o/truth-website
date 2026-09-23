/* V50 — ReturnToQuestionSection
 * Isolated closing experience. Does not modify V41–V49.
 */
"use client";

import { useEffect, useRef, useState } from "react";

const QUESTIONS = [
  "What do I actually know?",
  "Which parts of me were borrowed?",
  "What happens before I call something true?",
  "Who is looking at all of this?",
];

export default function ReturnToQuestionSection(){
  const [active,setActive]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const sectionRef=useRef<HTMLElement>(null);
  const [visible,setVisible]=useState(false);

  useEffect(()=>{
    const el=sectionRef.current;
    if(!el)return;
    const io=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.22});
    io.observe(el);
    return()=>io.disconnect();
  },[]);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v50-return","true");
    style.textContent=`
      .v50-return{position:relative;z-index:7;min-height:120vh;display:grid;place-items:center;padding:15vh 7vw;overflow:hidden;background:#020206;isolation:isolate}
      .v50-return:before{content:"";position:absolute;inset:-25%;background:radial-gradient(circle at 50% 46%,rgba(169,139,255,.09),transparent 19%),radial-gradient(circle at 50% 50%,rgba(255,255,255,.035),transparent 43%);pointer-events:none}
      .v50-ring{position:absolute;width:min(72vw,850px);aspect-ratio:1;border:1px solid rgba(255,255,255,.075);border-radius:50%;transform:scale(${visible?1:1.08});opacity:${visible?.75:0};transition:transform 2s cubic-bezier(.16,1,.3,1),opacity 1.6s ease}
      .v50-ring:before,.v50-ring:after{content:"";position:absolute;border-radius:50%;inset:13%;border:1px solid rgba(255,255,255,.045)}.v50-ring:after{inset:31%;border-color:rgba(184,162,255,.10)}
      .v50-inner{position:relative;width:min(1120px,100%);text-align:center}
      .v50-kicker{margin:0 0 38px;color:rgba(255,255,255,.34);font:500 9px/1 Arial,sans-serif;letter-spacing:.28em}
      .v50-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(58px,9vw,138px)/.83 Georgia,"Times New Roman",serif;letter-spacing:-.07em}
      .v50-title em{font-style:normal;color:rgba(184,162,255,.9)}
      .v50-sub{max-width:520px;margin:42px auto 0;color:rgba(255,255,255,.42);font:400 12px/1.8 Arial,sans-serif}
      .v50-questions{margin:75px auto 0;width:min(720px,100%);border-top:1px solid rgba(255,255,255,.11)}
      .v50-q{width:100%;display:grid;grid-template-columns:48px 1fr 25px;align-items:center;gap:15px;padding:22px 5px;border:0;border-bottom:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.36);text-align:left;cursor:pointer;transition:color .4s ease,transform .4s ease}
      .v50-q:hover,.v50-q.is-active{color:rgba(255,255,255,.9);transform:translateX(5px)}
      .v50-q.is-active .v50-qdot{background:rgba(184,162,255,.9);box-shadow:0 0 20px rgba(184,162,255,.25)}
      .v50-qnum{font:500 8px/1 Arial,sans-serif;letter-spacing:.18em;color:rgba(255,255,255,.2)}.v50-qtext{font:400 17px/1.25 Georgia,"Times New Roman",serif}.v50-qdot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.2);justify-self:end;transition:.4s}
      .v50-answer{min-height:72px;padding:25px 30px;border:1px solid rgba(184,162,255,.14);background:rgba(255,255,255,.018);color:rgba(255,255,255,.58);font:400 12px/1.8 Arial,sans-serif;opacity:${revealed?1:0};transform:translateY(${revealed?0:8}px);transition:opacity .6s ease,transform .6s ease}
      .v50-answer span{color:rgba(184,162,255,.72)}
      .v50-actions{margin-top:60px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
      .v50-button{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:14px 22px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.72);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em;cursor:pointer;transition:.4s}
      .v50-button:hover{border-color:rgba(184,162,255,.58);color:#fff}.v50-button.primary{border-color:rgba(184,162,255,.4)}
      .v50-end{margin-top:11vh;color:rgba(255,255,255,.22);font:500 8px/1.6 Arial,sans-serif;letter-spacing:.18em}
      @media(max-width:600px){.v50-return{min-height:108vh;padding:12vh 6vw}.v50-ring{width:115vw}.v50-q{grid-template-columns:32px 1fr 12px;padding:19px 2px}.v50-qtext{font-size:15px}.v50-answer{padding:21px}.v50-sub{margin-top:32px}}
      @media(prefers-reduced-motion:reduce){.v50-ring,.v50-q,.v50-button{transition:none}}
    `;
    document.head.appendChild(style);return()=>style.remove();
  },[visible,revealed]);

  const question=QUESTIONS[active];

  return <section ref={sectionRef} className="v50-return" id="return" aria-labelledby="v50-title">
    <div className="v50-ring" aria-hidden="true"/>
    <div className="v50-inner">
      <p className="v50-kicker">09 / RETURN TO THE QUESTION</p>
      <h2 className="v50-title" id="v50-title">BEGIN WHERE<br/>THE <em>ANSWER</em><br/>ENDS.</h2>
      <p className="v50-sub">The journey does not end with a conclusion. It returns to the one who is asking. Choose a question, stay with it, and notice what changes when you do not rush to resolve it.</p>
      <div className="v50-questions">
        {QUESTIONS.map((q,i)=><button key={q} className={"v50-q "+(i===active?"is-active":"")} type="button" onClick={()=>{setActive(i);setRevealed(true)}} aria-pressed={i===active}><span className="v50-qnum">0{i+1}</span><span className="v50-qtext">{q}</span><i className="v50-qdot"/></button>)}
        <div className="v50-answer"><span>STAY WITH IT / </span>{revealed?"There is no predetermined answer here. Use the question as an invitation to observe your own assumptions, reactions and conclusions.": "Select a question to open the inquiry."}</div>
      </div>
      <div className="v50-actions">
        <button className="v50-button primary" type="button" onClick={()=>document.getElementById("practice")?.scrollIntoView({behavior:"smooth"})}>RETURN TO PRACTICE</button>
        <button className="v50-button" type="button" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>RETURN TO BEGINNING</button>
      </div>
      <p className="v50-end">NO FINAL ANSWER · NO BORROWED CONCLUSION · KEEP LOOKING</p>
    </div>
  </section>;
}
