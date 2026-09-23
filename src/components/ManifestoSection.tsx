"use client";

import { useEffect, useState } from "react";

const LINES = [
  ["01","QUESTION","Don't inherit the question from the answer."],
  ["02","OBSERVE","Before changing the world, notice the one who wants to change it."],
  ["03","EXAMINE","A belief becomes worth examining precisely when it feels unquestionable."],
  ["04","READ","Meet the source before accepting someone else's interpretation of it."],
  ["05","RETURN","If an insight cannot survive ordinary life, return to the observation."],
];

export default function ManifestoSection(){
  const [active,setActive]=useState(0);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v54-manifesto","true");
    style.textContent=`
      .v54-manifesto{position:relative;z-index:7;min-height:115vh;padding:16vh 7vw 18vh;overflow:hidden;background:#020205;isolation:isolate}
      .v54-manifesto:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 35%,rgba(185,165,255,.075),transparent 24%),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:auto,12vw 100%;pointer-events:none}
      .v54-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v54-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px}.v54-kicker,.v54-index{margin:0;color:rgba(255,255,255,.4);font:500 9px/1 Arial,sans-serif;letter-spacing:.25em}.v54-index{color:rgba(255,255,255,.2)}
      .v54-heading{text-align:center;margin:13vh auto 11vh;max-width:1050px}.v54-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(55px,9vw,135px)/.82 Georgia,"Times New Roman",serif;letter-spacing:-.075em}.v54-title em{font-style:normal;color:rgba(185,165,255,.9)}.v54-deck{max-width:570px;margin:38px auto 0;color:rgba(255,255,255,.38);font:400 12px/1.85 Arial,sans-serif}
      .v54-lines{border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}
      .v54-line{display:grid;grid-template-columns:70px 180px 1fr 30px;gap:20px;align-items:center;width:100%;padding:27px 10px;border:0;border-bottom:1px solid rgba(255,255,255,.07);background:transparent;text-align:left;color:rgba(255,255,255,.3);cursor:pointer;transition:.45s}.v54-line:last-child{border-bottom:0}.v54-line:hover,.v54-line.active{color:rgba(255,255,255,.94);background:rgba(255,255,255,.018);padding-left:18px}.v54-line.active .v54-dot{background:rgba(185,165,255,.9);box-shadow:0 0 20px rgba(185,165,255,.3)}
      .v54-num{font:500 8px/1 Arial,sans-serif;letter-spacing:.18em;color:rgba(255,255,255,.2)}.v54-word{font:500 9px/1 Arial,sans-serif;letter-spacing:.22em}.v54-statement{font:400 clamp(18px,2.2vw,28px)/1.2 Georgia,serif;letter-spacing:-.02em}.v54-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.18);justify-self:end;transition:.4s}
      .v54-focus{min-height:180px;display:grid;grid-template-columns:180px 1fr;gap:6vw;align-items:center;padding:40px 10px}.v54-focus-label{margin:0;color:rgba(255,255,255,.22);font:500 8px/1.6 Arial,sans-serif;letter-spacing:.2em}.v54-focus-text{margin:0;color:rgba(255,255,255,.62);font:400 19px/1.5 Georgia,serif}.v54-focus-text span{color:rgba(185,165,255,.8)}
      .v54-end{text-align:center;margin-top:12vh}.v54-end p{margin:0;color:rgba(255,255,255,.2);font:500 8px/1.6 Arial,sans-serif;letter-spacing:.2em}.v54-mark{margin:25px 0;color:rgba(255,255,255,.05);font:400 clamp(70px,12vw,170px)/.7 Georgia,serif}
      @media(max-width:700px){.v54-manifesto{padding:13vh 6vw 15vh}.v54-heading{margin:9vh auto 8vh}.v54-line{grid-template-columns:35px 1fr 12px;gap:12px;padding:21px 5px}.v54-word{grid-column:2}.v54-statement{grid-column:2}.v54-line:hover,.v54-line.active{padding-left:10px}.v54-focus{grid-template-columns:1fr;gap:20px;padding:32px 5px}.v54-focus-text{font-size:17px}}
      @media(prefers-reduced-motion:reduce){.v54-line{transition:none}}
    `;
    document.head.appendChild(style);
    return()=>style.remove();
  },[]);

  const current=LINES[active];

  return <section className="v54-manifesto" id="manifesto" aria-labelledby="v54-title">
    <div className="v54-inner">
      <div className="v54-top"><p className="v54-kicker">13 / THE MANIFESTO</p><p className="v54-index">NO FINAL ANSWERS / ONLY A CLEARER QUESTION</p></div>
      <div className="v54-heading">
        <h2 className="v54-title" id="v54-title">LEAVE WITH<br/>A <em>QUESTION.</em></h2>
        <p className="v54-deck">A final page should not manufacture certainty. It should leave the visitor with a sharper relationship to observation, knowledge, belief and the self.</p>
      </div>
      <div className="v54-lines" role="list">
        {LINES.map((line,i)=><button key={line[0]} type="button" className={"v54-line "+(i===active?"active":"")} onClick={()=>setActive(i)} aria-pressed={i===active}>
          <span className="v54-num">{line[0]}</span><span className="v54-word">{line[1]}</span><span className="v54-statement">{line[2]}</span><i className="v54-dot"/>
        </button>)}
      </div>
      <div className="v54-focus" aria-live="polite">
        <p className="v54-focus-label">CURRENT PRINCIPLE<br/>/{current[1]}</p>
        <p className="v54-focus-text"><span>{current[1]}</span> — {current[2]}</p>
      </div>
      <div className="v54-end"><p>THE JOURNEY DOES NOT NEED TO END HERE</p><div className="v54-mark">?</div><p>LOOK AGAIN.</p></div>
    </div>
  </section>;
}
