/* V51 — ReligionSection
 * Isolated editorial section. Does not modify V41–V50.
 */
"use client";

import { useEffect, useState } from "react";

const LENSES = [
  {
    n:"01", word:"BELIEF",
    title:"What do you believe because you were told?",
    body:"A belief can be inherited before it is examined. Family, culture, community and authority can all shape what feels obvious. Inquiry begins by noticing that history rather than treating familiarity as proof.",
    line:"Inherited is not the same as understood."
  },
  {
    n:"02", word:"RITUAL",
    title:"When does practice become mechanical?",
    body:"A ritual can carry meaning for the person performing it, but repetition by itself does not settle the question of what the practice means. The distinction is between performing an act and examining why it is being performed.",
    line:"A repeated act still leaves a question open."
  },
  {
    n:"03", word:"FEAR",
    title:"What happens when fear enters the sacred?",
    body:"Ideas about reward, punishment, identity or belonging can influence religious behaviour. Looking closely at that influence does not require rejecting a tradition; it asks what is actually driving the choice.",
    line:"Look at the motive before defending the form."
  },
  {
    n:"04", word:"INQUIRY",
    title:"Can religion begin with a question?",
    body:"One philosophical approach treats religion less as a collection of conclusions and more as an inquiry into the self, suffering, desire and reality. This is one interpretation among many religious and philosophical traditions.",
    line:"Question first. Let the conclusion remain open."
  },
];

export default function ReligionSection(){
  const [active,setActive]=useState(0);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v51-religion","true");
    style.textContent=`
      .v51-religion{position:relative;z-index:7;min-height:118vh;padding:16vh 7vw 17vh;overflow:hidden;isolation:isolate;background:#030307}
      .v51-religion:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px);background-size:10vw 10vw;mask-image:linear-gradient(90deg,transparent,black 22%,black 78%,transparent);pointer-events:none}
      .v51-orbit{position:absolute;right:-10vw;top:12%;width:52vw;max-width:720px;aspect-ratio:1;border:1px solid rgba(190,171,255,.09);border-radius:50%;opacity:.7}
      .v51-orbit:before,.v51-orbit:after{content:"";position:absolute;border-radius:50%;inset:14%;border:1px solid rgba(255,255,255,.045);transform:rotate(27deg) scaleY(.36)}.v51-orbit:after{inset:31%;transform:rotate(-32deg) scaleY(.5);border-color:rgba(190,171,255,.10)}
      .v51-orbit-dot{position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(205,188,255,.75);box-shadow:0 0 24px rgba(190,171,255,.45);left:19%;top:27%}
      .v51-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v51-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px;margin-bottom:11vh}
      .v51-kicker,.v51-index{margin:0;color:rgba(255,255,255,.42);font:500 9px/1 Arial,sans-serif;letter-spacing:.25em}.v51-index{color:rgba(255,255,255,.2)}
      .v51-head{max-width:930px}.v51-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(55px,8vw,122px)/.84 Georgia,"Times New Roman",serif;letter-spacing:-.068em}.v51-title em{font-style:normal;color:rgba(190,171,255,.92)}
      .v51-deck{max-width:530px;margin:42px 0 0;color:rgba(255,255,255,.43);font:400 12px/1.85 Arial,sans-serif}
      .v51-layout{position:relative;margin-top:12vh;display:grid;grid-template-columns:260px minmax(0,1fr);border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}
      .v51-nav{padding:12px 0;border-right:1px solid rgba(255,255,255,.1)}
      .v51-item{width:100%;display:grid;grid-template-columns:35px 1fr;gap:12px;padding:25px 20px;border:0;border-left:2px solid transparent;background:transparent;text-align:left;color:rgba(255,255,255,.3);cursor:pointer;transition:.45s}
      .v51-item:hover,.v51-item.active{color:rgba(255,255,255,.9);background:rgba(255,255,255,.025)}.v51-item.active{border-left-color:rgba(190,171,255,.82)}
      .v51-num{font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v51-word{font:500 9px/1 Arial,sans-serif;letter-spacing:.22em}
      .v51-content{min-height:550px;padding:58px 6vw;display:flex;flex-direction:column;justify-content:space-between}
      .v51-meta{display:flex;justify-content:space-between;color:rgba(255,255,255,.23);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v51-meta strong{color:rgba(190,171,255,.7);font-weight:500}
      .v51-copy{max-width:720px}.v51-copy h3{margin:0 0 26px;color:rgba(255,255,255,.93);font:400 clamp(32px,4.4vw,63px)/.95 Georgia,"Times New Roman",serif;letter-spacing:-.045em}.v51-body{max-width:650px;margin:0;color:rgba(255,255,255,.46);font:400 13px/1.9 Arial,sans-serif}.v51-line{margin:32px 0 0;padding-left:17px;border-left:1px solid rgba(190,171,255,.55);color:rgba(255,255,255,.68);font:400 17px/1.45 Georgia,"Times New Roman",serif}
      .v51-bottom{display:flex;align-items:end;justify-content:space-between;gap:20px}.v51-mark{font:400 75px/.7 Georgia,serif;color:rgba(255,255,255,.04)}.v51-note{max-width:330px;margin:0;color:rgba(255,255,255,.23);font:500 8px/1.6 Arial,sans-serif;letter-spacing:.15em}
      .v51-foot{margin:7vh 0 0;max-width:760px;color:rgba(255,255,255,.25);font:400 11px/1.75 Arial,sans-serif}
      @media(max-width:850px){.v51-religion{padding:13vh 6vw 15vh}.v51-orbit{right:-28vw;top:18%;width:95vw;opacity:.42}.v51-layout{grid-template-columns:1fr}.v51-nav{display:grid;grid-template-columns:repeat(2,1fr);border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.v51-item{padding:17px 12px;border-left:0;border-bottom:2px solid transparent}.v51-item.active{border-bottom-color:rgba(190,171,255,.82)}.v51-content{min-height:590px;padding:43px 5vw}}
      @media(max-width:520px){.v51-top{margin-bottom:8vh}.v51-item{grid-template-columns:1fr;gap:7px}.v51-copy h3{font-size:35px}.v51-content{min-height:650px}.v51-mark{font-size:55px}}
      @media(prefers-reduced-motion:reduce){.v51-item{transition:none}}
    `;
    document.head.appendChild(style);return()=>style.remove();
  },[]);

  const x=LENSES[active];

  return <section className="v51-religion" id="religion" aria-labelledby="v51-title">
    <div className="v51-orbit" aria-hidden="true"><span className="v51-orbit-dot"/></div>
    <div className="v51-inner">
      <div className="v51-top"><p className="v51-kicker">10 / RELIGION · BELIEF · INQUIRY</p><p className="v51-index">QUESTION THE FORM / EXAMINE THE MOTIVE</p></div>
      <div className="v51-head">
        <h2 className="v51-title" id="v51-title">WHAT IF<br/><em>RELIGION</em><br/>BEGINS WITH SEEING?</h2>
        <p className="v51-deck">Religious traditions contain many different understandings of faith, ritual, knowledge and liberation. This section presents an inquiry-oriented philosophical lens rather than a definition of religion for everyone.</p>
      </div>
      <div className="v51-layout">
        <nav className="v51-nav" aria-label="Religion inquiry lenses">
          {LENSES.map((item,i)=><button key={item.n} type="button" className={"v51-item "+(i===active?"active":"")} onClick={()=>setActive(i)} aria-selected={i===active}><span className="v51-num">{item.n}</span><span className="v51-word">{item.word}</span></button>)}
        </nav>
        <article className="v51-content" aria-live="polite">
          <div className="v51-meta"><span><strong>{x.word}</strong> / INQUIRY</span><span>{x.n} / 04</span></div>
          <div className="v51-copy"><h3 key={x.n}>{x.title}</h3><p className="v51-body">{x.body}</p><p className="v51-line">{x.line}</p></div>
          <div className="v51-bottom"><span className="v51-mark">?</span><p className="v51-note">NO TRADITION IS REDUCED TO ONE SENTENCE. READ PRIMARY TEXTS. EXAMINE INTERPRETATIONS. KEEP THE QUESTION ALIVE.</p></div>
        </article>
      </div>
      <p className="v51-foot">The inquiry-oriented framing here is compatible with themes found in several philosophical traditions, but the traditions themselves contain diverse schools, practices and interpretations. The section is intentionally presented as a lens for examination, not as a universal religious conclusion.</p>
    </div>
  </section>;
}
