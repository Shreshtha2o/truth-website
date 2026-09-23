"use client";

import { useEffect, useState } from "react";

const PATHS = [
  ["01","START WITH A QUESTION","Begin where certainty ends.","Choose one assumption you rarely examine. Write it down. Ask where it came from, what it asks you to believe, and what changes if it is not true.","BEGIN INQUIRY"],
  ["02","LEARN TO OBSERVE","Watch before you conclude.","Notice a reaction without immediately defending or suppressing it. Separate what happened from the story the mind added to what happened.","PRACTICE OBSERVATION"],
  ["03","READ DEEPLY","Use texts as mirrors.","Read slowly. Compare interpretations. Return to the original passage. Examine whether the text changes what you can actually see about yourself.","OPEN THE TEXTS"],
] as const;

export default function StartLearningSection(){
  const [active,setActive]=useState(0);
  const [started,setStarted]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v48-start","true");
    style.textContent=`
      .v48-start{position:relative;z-index:7;min-height:112vh;padding:17vh 7vw 16vh;overflow:hidden;isolation:isolate;background:radial-gradient(circle at 50% 44%,rgba(126,101,255,.11),transparent 27%),linear-gradient(180deg,#04040a,#020207)}
      .v48-start:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 48%,transparent 0 17%,rgba(255,255,255,.028) 17.1%,transparent 17.3%),radial-gradient(circle at 50% 48%,transparent 0 31%,rgba(255,255,255,.02) 31.1%,transparent 31.3%)}
      .v48-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v48-top{display:flex;justify-content:space-between;gap:25px;border-top:1px solid rgba(255,255,255,.13);padding-top:17px;margin-bottom:9vh}
      .v48-kicker,.v48-index{margin:0;color:rgba(255,255,255,.46);font:500 9px/1 Arial,sans-serif;letter-spacing:.24em}.v48-index{color:rgba(255,255,255,.24)}
      .v48-heading{text-align:center;margin-bottom:10vh}
      .v48-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(56px,8.5vw,132px)/.82 Georgia,"Times New Roman",serif;letter-spacing:-.067em}.v48-title span{color:rgba(183,163,255,.92)}
      .v48-intro{max-width:560px;margin:35px auto 0;color:rgba(255,255,255,.43);font:400 13px/1.8 Arial,sans-serif}
      .v48-paths{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(255,255,255,.13);border-bottom:1px solid rgba(255,255,255,.13)}
      .v48-path{position:relative;min-height:390px;padding:29px 30px 34px;border:0;border-right:1px solid rgba(255,255,255,.11);background:transparent;text-align:left;color:rgba(255,255,255,.45);cursor:pointer;transition:background .5s ease,color .5s ease}
      .v48-path:last-child{border-right:0}.v48-path:hover,.v48-path.is-active{background:rgba(255,255,255,.028);color:rgba(255,255,255,.9)}
      .v48-number{font:500 9px/1 Arial,sans-serif;letter-spacing:.16em}.v48-label{position:absolute;right:28px;top:29px;color:rgba(183,163,255,.48);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}
      .v48-path h3{margin:86px 0 21px;max-width:310px;color:rgba(255,255,255,.92);font:400 clamp(28px,3vw,46px)/.98 Georgia,"Times New Roman",serif;letter-spacing:-.04em}
      .v48-path p{max-width:340px;margin:0;color:rgba(255,255,255,.4);font:400 12px/1.75 Arial,sans-serif}.v48-path.is-active p{color:rgba(255,255,255,.55)}
      .v48-action{position:absolute;left:30px;bottom:29px;color:rgba(255,255,255,.32);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v48-path.is-active .v48-action{color:rgba(183,163,255,.78)}
      .v48-path:after{content:"";position:absolute;left:30px;right:30px;bottom:0;height:2px;background:rgba(183,163,255,.75);transform:scaleX(0);transform-origin:left;transition:transform .65s cubic-bezier(.16,1,.3,1)}.v48-path.is-active:after{transform:scaleX(1)}
      .v48-launch{display:flex;justify-content:center;align-items:center;flex-direction:column;margin-top:8vh;text-align:center}.v48-current{margin:0 0 17px;color:rgba(255,255,255,.28);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}
      .v48-button{min-width:245px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:17px 24px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.86);cursor:pointer;font:500 9px/1 Arial,sans-serif;letter-spacing:.2em;transition:.4s ease}.v48-button:hover{background:rgba(183,163,255,.09);border-color:rgba(183,163,255,.65);transform:translateY(-2px)}.v48-button.is-started{border-color:rgba(183,163,255,.72)}
      .v48-status{margin:16px 0 0;color:rgba(183,163,255,.6);font:500 8px/1 Arial,sans-serif;letter-spacing:.16em}.v48-foot{margin:9vh auto 0;max-width:690px;text-align:center;color:rgba(255,255,255,.25);font:400 11px/1.7 Arial,sans-serif}
      @media(max-width:850px){.v48-start{min-height:auto;padding:13vh 6vw 15vh}.v48-paths{grid-template-columns:1fr}.v48-path{min-height:300px;border-right:0;border-bottom:1px solid rgba(255,255,255,.11)}.v48-path:last-child{border-bottom:0}.v48-path h3{margin-top:62px}}
      @media(max-width:520px){.v48-top{margin-bottom:7vh}.v48-intro{font-size:12px}.v48-path{min-height:285px;padding:24px 20px}.v48-label{right:20px;top:24px}.v48-action{left:20px;bottom:22px}}
      @media(prefers-reduced-motion:reduce){.v48-path,.v48-path:after,.v48-button{transition:none}}
    `;
    document.head.appendChild(style); return()=>style.remove();
  },[]);

  const p=PATHS[active];
  return <section className="v48-start" id="start-learning" aria-labelledby="v48-title">
    <div className="v48-inner">
      <div className="v48-top"><p className="v48-kicker">07 / START LEARNING</p><p className="v48-index">THE JOURNEY BECOMES YOURS</p></div>
      <div className="v48-heading"><h2 className="v48-title" id="v48-title">NOW, <span>BEGIN.</span></h2><p className="v48-intro">There is no single correct doorway into inquiry. Choose a starting point, slow down, and test what you encounter for yourself.</p></div>
      <div className="v48-paths" role="tablist" aria-label="Ways to start learning">
        {PATHS.map((x,i)=><button key={x[0]} type="button" role="tab" aria-selected={active===i} className={"v48-path "+(active===i?"is-active":"")} onClick={()=>{setActive(i);setStarted(false)}}><span className="v48-number">{x[0]}</span><span className="v48-label">{x[1]}</span><h3>{x[2]}</h3><p>{x[3]}</p><span className="v48-action">{x[4]} ↗</span></button>)}
      </div>
      <div className="v48-launch"><p className="v48-current">SELECTED PATH · {p[0]} · {p[1]}</p><button type="button" className={"v48-button "+(started?"is-started":"")} onClick={()=>setStarted(true)}>{started?"YOUR INQUIRY HAS BEGUN":"BEGIN WITH THIS PATH"} <span>→</span></button>{started&&<p className="v48-status">KEEP QUESTIONING. RETURN WHEN YOU ARE READY.</p>}</div>
      <p className="v48-foot">This gateway is intentionally simple: learning here means examining, reading and observing—not accepting a conclusion because a website presented it.</p>
    </div>
  </section>;
}
