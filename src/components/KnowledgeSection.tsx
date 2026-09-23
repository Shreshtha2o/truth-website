/* V52 — KnowledgeSection
 * Isolated editorial section. Does not modify V41–V51.
 */
"use client";

import { useEffect, useState } from "react";

const MODES = [
  {
    n:"01", label:"INFORMATION",
    title:"How much can you collect without seeing?",
    body:"Information can increase the number of things you can say without necessarily changing the way you look. More facts can coexist with the same assumptions, reactions and habits.",
    contrast:"MORE TO KNOW",
  },
  {
    n:"02", label:"UNDERSTANDING",
    title:"What changes when you see the structure?",
    body:"Understanding asks how something works and what follows from it. It connects observation, context and consequences instead of stopping at the accumulation of facts.",
    contrast:"SEE THE CONNECTION",
  },
  {
    n:"03", label:"SELF-KNOWLEDGE",
    title:"Can the observer be part of the subject?",
    body:"When the subject of inquiry is your own desire, fear, identity or belief, the observer cannot simply stand outside the investigation. The question becomes personal without becoming merely subjective.",
    contrast:"LOOK AT THE LOOKER",
  },
];

export default function KnowledgeSection(){
  const [active,setActive]=useState(0);
  const [compare,setCompare]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v52-knowledge","true");
    style.textContent=`
      .v52-knowledge{position:relative;z-index:7;min-height:116vh;padding:16vh 7vw 17vh;overflow:hidden;background:#050508;isolation:isolate}
      .v52-knowledge:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 75% 25%,rgba(120,145,255,.065),transparent 25%),radial-gradient(circle at 24% 76%,rgba(255,181,107,.035),transparent 24%);pointer-events:none}
      .v52-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v52-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px}
      .v52-kicker,.v52-index{margin:0;color:rgba(255,255,255,.4);font:500 9px/1 Arial,sans-serif;letter-spacing:.25em}.v52-index{color:rgba(255,255,255,.2)}
      .v52-head{margin:11vh 0 10vh;display:grid;grid-template-columns:1.25fr .75fr;gap:8vw;align-items:end}.v52-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(54px,8vw,120px)/.84 Georgia,"Times New Roman",serif;letter-spacing:-.07em}.v52-title em{font-style:normal;color:rgba(177,191,255,.9)}.v52-deck{max-width:410px;margin:0 0 5px;color:rgba(255,255,255,.42);font:400 12px/1.85 Arial,sans-serif}
      .v52-stage{display:grid;grid-template-columns:300px minmax(0,1fr);border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}
      .v52-nav{border-right:1px solid rgba(255,255,255,.1);padding:12px 0}.v52-tab{width:100%;min-height:120px;padding:23px 22px;display:grid;grid-template-columns:35px 1fr;gap:12px;border:0;border-left:2px solid transparent;background:transparent;text-align:left;color:rgba(255,255,255,.29);cursor:pointer;transition:.45s}.v52-tab:hover,.v52-tab.active{color:rgba(255,255,255,.9);background:rgba(255,255,255,.022)}.v52-tab.active{border-left-color:rgba(177,191,255,.82)}
      .v52-num{font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v52-label{font:500 9px/1 Arial,sans-serif;letter-spacing:.2em}
      .v52-main{min-height:600px;padding:55px 6vw;display:flex;flex-direction:column;justify-content:space-between}.v52-meta{display:flex;justify-content:space-between;color:rgba(255,255,255,.22);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v52-meta strong{color:rgba(177,191,255,.72);font-weight:500}
      .v52-copy{max-width:760px}.v52-copy h3{margin:0 0 26px;color:rgba(255,255,255,.94);font:400 clamp(34px,4.6vw,66px)/.94 Georgia,"Times New Roman",serif;letter-spacing:-.05em}.v52-body{max-width:650px;margin:0;color:rgba(255,255,255,.45);font:400 13px/1.9 Arial,sans-serif}.v52-contrast{margin:33px 0 0;padding-left:17px;border-left:1px solid rgba(177,191,255,.55);color:rgba(255,255,255,.7);font:400 16px/1.4 Georgia,serif}
      .v52-bottom{display:flex;align-items:end;justify-content:space-between;gap:20px}.v52-diagram{display:flex;align-items:center;gap:7px}.v52-node{width:8px;height:8px;border:1px solid rgba(177,191,255,.55);border-radius:50%}.v52-line{width:45px;height:1px;background:rgba(255,255,255,.13)}.v52-note{max-width:330px;margin:0;color:rgba(255,255,255,.22);font:500 8px/1.6 Arial,sans-serif;letter-spacing:.14em}
      .v52-compare{margin-top:7vh;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.015);overflow:hidden}.v52-compare button{width:100%;padding:17px 20px;border:0;background:transparent;color:rgba(255,255,255,.5);text-align:left;font:500 8px/1 Arial,sans-serif;letter-spacing:.2em;cursor:pointer}.v52-table{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,.08)}.v52-cell{padding:18px 20px;color:rgba(255,255,255,.34);font:400 11px/1.6 Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,.06)}.v52-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.62)}
      .v52-foot{margin:6vh 0 0;max-width:760px;color:rgba(255,255,255,.23);font:400 11px/1.75 Arial,sans-serif}
      @media(max-width:850px){.v52-knowledge{padding:13vh 6vw 15vh}.v52-head{grid-template-columns:1fr;gap:30px;margin-top:9vh}.v52-stage{grid-template-columns:1fr}.v52-nav{display:grid;grid-template-columns:repeat(3,1fr);border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.v52-tab{min-height:82px;padding:15px 10px;grid-template-columns:1fr;gap:7px;border-left:0;border-bottom:2px solid transparent}.v52-tab.active{border-bottom-color:rgba(177,191,255,.82)}.v52-main{min-height:610px;padding:43px 5vw}}
      @media(max-width:520px){.v52-nav{grid-template-columns:1fr}.v52-tab{min-height:65px;grid-template-columns:32px 1fr;border-bottom:0;border-left:2px solid transparent}.v52-tab.active{border-left-color:rgba(177,191,255,.82);border-bottom:0}.v52-table{grid-template-columns:1fr}.v52-cell:nth-child(odd){border-right:0}}
      @media(prefers-reduced-motion:reduce){.v52-tab{transition:none}}
    `;
    document.head.appendChild(style);return()=>style.remove();
  },[]);

  const x=MODES[active];

  return <section className="v52-knowledge" id="knowledge" aria-labelledby="v52-title">
    <div className="v52-inner">
      <div className="v52-top"><p className="v52-kicker">11 / KNOWLEDGE</p><p className="v52-index">INFORMATION ≠ UNDERSTANDING</p></div>
      <div className="v52-head">
        <h2 className="v52-title" id="v52-title">DON’T JUST<br/><em>KNOW</em> MORE.<br/>SEE MORE.</h2>
        <p className="v52-deck">Self-education is not only the expansion of memory. It can also mean examining how knowledge is formed, what assumptions accompany it, and whether it changes the way you perceive.</p>
      </div>
      <div className="v52-stage">
        <nav className="v52-nav" aria-label="Knowledge lenses">
          {MODES.map((m,i)=><button key={m.n} type="button" className={"v52-tab "+(active===i?"active":"")} onClick={()=>setActive(i)} aria-selected={active===i}><span className="v52-num">{m.n}</span><span className="v52-label">{m.label}</span></button>)}
        </nav>
        <article className="v52-main" aria-live="polite">
          <div className="v52-meta"><span><strong>{x.label}</strong> / LENS</span><span>{x.n} / 03</span></div>
          <div className="v52-copy"><h3 key={x.n}>{x.title}</h3><p className="v52-body">{x.body}</p><p className="v52-contrast">{x.contrast}</p></div>
          <div className="v52-bottom"><div className="v52-diagram" aria-hidden="true"><i className="v52-node"/><i className="v52-line"/><i className="v52-node"/><i className="v52-line"/><i className="v52-node"/></div><p className="v52-note">FACTS CAN FILL A MIND. INQUIRY EXAMINES THE MIND THAT USES THEM.</p></div>
        </article>
      </div>
      <div className="v52-compare">
        <button type="button" onClick={()=>setCompare(v=>!v)} aria-expanded={compare}>{compare?"− CLOSE":"＋ OPEN"} / A SIMPLE DISTINCTION</button>
        {compare&&<div className="v52-table"><div className="v52-cell">Information: adds content to what you can recall.</div><div className="v52-cell">Understanding: examines relationships, context and consequences.</div><div className="v52-cell">Knowledge can answer a question.</div><div className="v52-cell">Inquiry can also examine the question itself.</div></div>}
      </div>
      <p className="v52-foot">This distinction is a philosophical framing, not a claim that information and understanding are separate in practice. Deep understanding generally depends on accurate information; inquiry asks what we do with it.</p>
    </div>
  </section>;
}
