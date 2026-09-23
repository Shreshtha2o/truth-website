/* V55 — SynthesisExperience
 * Larger isolated editorial module. Does not modify V41–V54.
 */
"use client";

import { useEffect, useState } from "react";

const ACTS = [
  ["01","SEE","Start with what is happening.","Before naming an experience, notice it. Before defending an opinion, notice the reaction around it. Observation gives the inquiry something more solid than assumption.","What can you directly observe right now?","OBSERVATION"],
  ["02","QUESTION","Examine what you call certain.","A conclusion can feel natural because it has been repeated, rewarded or protected for a long time. Questioning does not require immediate rejection; it requires enough attention to inspect the structure.","Which certainty have you never seriously examined?","INQUIRY"],
  ["03","CONNECT","Follow the pattern beyond yourself.","The same habits of desire, identity and imitation can appear in relationships, institutions, consumption and ideas of progress. Seeing a pattern does not by itself solve it, but it changes the question.","Where does an inner pattern become an outer consequence?","CONNECTION"],
  ["04","RETURN","Bring insight back into life.","The test of inquiry is not how impressive an idea sounds on a screen. Return to ordinary decisions, conversations, ambitions and fears. Observe again. Revise again.","What changes when the question enters an ordinary day?","PRACTICE"],
];

const PILLARS = [
  ["SELF","Who is experiencing this?"],
  ["WORLD","What consequences follow?"],
  ["TEXT","What does the source actually say?"],
  ["ACTION","What changes in practice?"],
];

export default function SynthesisExperience(){
  const [active,setActive]=useState(0);
  const [pillar,setPillar]=useState(0);
  const [started,setStarted]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v55-synthesis","true");
    style.textContent=`
      .v55-synthesis{position:relative;z-index:7;min-height:180vh;overflow:hidden;background:#020204;color:#fff;isolation:isolate}
      .v55-synthesis:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 18%,rgba(178,157,255,.08),transparent 23%),radial-gradient(circle at 15% 68%,rgba(255,181,108,.035),transparent 23%);pointer-events:none}
      .v55-syn-inner{position:relative;width:min(1280px,100%);margin:auto;padding:15vh 7vw 18vh}
      .v55-syn-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px}.v55-syn-kicker,.v55-syn-index{margin:0;color:rgba(255,255,255,.38);font:500 9px/1 Arial,sans-serif;letter-spacing:.25em}.v55-syn-index{color:rgba(255,255,255,.18)}
      .v55-syn-hero{min-height:75vh;display:flex;flex-direction:column;justify-content:center;max-width:1100px}.v55-syn-hero h2{margin:0;color:rgba(255,255,255,.96);font:400 clamp(58px,9vw,140px)/.81 Georgia,"Times New Roman",serif;letter-spacing:-.075em}.v55-syn-hero h2 em{font-style:normal;color:rgba(184,164,255,.9)}.v55-syn-lead{max-width:560px;margin:45px 0 0;color:rgba(255,255,255,.4);font:400 13px/1.85 Arial,sans-serif}
      .v55-scrollhint{display:flex;align-items:center;gap:14px;margin-top:70px;color:rgba(255,255,255,.22);font:500 8px/1 Arial,sans-serif;letter-spacing:.22em}.v55-scrollline{width:70px;height:1px;background:rgba(255,255,255,.2)}
      .v55-act{border-top:1px solid rgba(255,255,255,.12);padding:10vh 0 12vh}.v55-act-head{display:flex;justify-content:space-between;gap:40px;margin-bottom:7vh}.v55-act-no,.v55-act-label{font:500 9px/1 Arial,sans-serif;letter-spacing:.2em}.v55-act-no{color:rgba(184,164,255,.7)}.v55-act-label{color:rgba(255,255,255,.22)}
      .v55-act-grid{display:grid;grid-template-columns:260px minmax(0,1fr);border:1px solid rgba(255,255,255,.1);min-height:560px}.v55-act-nav{border-right:1px solid rgba(255,255,255,.09);padding:12px}.v55-act-btn{width:100%;padding:22px 18px;display:flex;justify-content:space-between;border:0;border-left:2px solid transparent;background:transparent;color:rgba(255,255,255,.3);text-align:left;cursor:pointer;font:500 9px/1 Arial,sans-serif;letter-spacing:.2em;transition:.4s}.v55-act-btn:hover,.v55-act-btn.active{color:rgba(255,255,255,.9);background:rgba(255,255,255,.025)}.v55-act-btn.active{border-left-color:rgba(184,164,255,.85)}
      .v55-act-content{position:relative;padding:60px 7vw;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.v55-act-content:after{content:"";position:absolute;right:-60px;bottom:-90px;width:340px;height:340px;border:1px solid rgba(184,164,255,.07);border-radius:50%;box-shadow:0 0 0 55px rgba(184,164,255,.012),0 0 0 110px rgba(184,164,255,.008)}
      .v55-act-meta{display:flex;justify-content:space-between;color:rgba(255,255,255,.2);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v55-act-meta strong{color:rgba(184,164,255,.7);font-weight:500}
      .v55-act-copy{position:relative;z-index:1;max-width:760px}.v55-act-copy h3{margin:0 0 27px;color:rgba(255,255,255,.94);font:400 clamp(38px,5vw,72px)/.91 Georgia,serif;letter-spacing:-.055em}.v55-act-body{max-width:650px;margin:0;color:rgba(255,255,255,.43);font:400 13px/1.9 Arial,sans-serif}.v55-act-question{margin:36px 0 0;padding-left:18px;border-left:1px solid rgba(184,164,255,.6);color:rgba(255,255,255,.7);font:400 19px/1.45 Georgia,serif}
      .v55-act-foot{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:end;gap:25px}.v55-act-word{color:rgba(255,255,255,.04);font:400 70px/.7 Georgia,serif}.v55-act-progress{display:flex;gap:10px}.v55-act-progress i{display:block;width:28px;height:1px;background:rgba(255,255,255,.12)}.v55-act-progress i.on{background:rgba(184,164,255,.7)}
      .v55-synthesis{padding:14vh 0;border-top:1px solid rgba(255,255,255,.12)}.v55-synthesis h3{margin:0;max-width:900px;color:rgba(255,255,255,.94);font:400 clamp(43px,6vw,90px)/.88 Georgia,serif;letter-spacing:-.06em}.v55-synthesis h3 em{font-style:normal;color:rgba(184,164,255,.88)}
      .v55-pillar-nav{display:grid;grid-template-columns:repeat(4,1fr);margin-top:8vh;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1)}.v55-pillar{min-height:150px;padding:25px 18px;border:0;border-right:1px solid rgba(255,255,255,.07);background:transparent;color:rgba(255,255,255,.3);text-align:left;cursor:pointer;transition:.4s}.v55-pillar:last-child{border-right:0}.v55-pillar:hover,.v55-pillar.active{background:rgba(255,255,255,.02);color:rgba(255,255,255,.9)}.v55-pillar strong{display:block;color:rgba(184,164,255,.65);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em}.v55-pillar span{display:block;margin-top:35px;font:400 18px/1.25 Georgia,serif}
      .v55-final-card{margin-top:9vh;padding:7vh 6vw;border:1px solid rgba(184,164,255,.13);background:radial-gradient(circle at 75% 50%,rgba(184,164,255,.055),transparent 35%);display:grid;grid-template-columns:1fr auto;gap:40px;align-items:end}.v55-final-card p{margin:0;color:rgba(255,255,255,.42);font:400 12px/1.8 Arial,sans-serif}.v55-final-card p strong{display:block;margin-bottom:13px;color:rgba(255,255,255,.78);font:400 25px/1.2 Georgia,serif}.v55-start{border:1px solid rgba(184,164,255,.35);border-radius:999px;padding:15px 24px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.78);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em;cursor:pointer}.v55-start:hover{border-color:rgba(184,164,255,.75);color:#fff}
      .v55-complete{margin-top:7vh;color:rgba(255,255,255,.2);font:500 8px/1.7 Arial,sans-serif;letter-spacing:.18em}
      @media(max-width:850px){.v55-syn-inner{padding:12vh 6vw 15vh}.v55-syn-hero{min-height:65vh}.v55-act-grid{grid-template-columns:1fr}.v55-act-nav{display:grid;grid-template-columns:repeat(4,1fr);border-right:0;border-bottom:1px solid rgba(255,255,255,.09)}.v55-act-btn{padding:17px 10px;border-left:0;border-bottom:2px solid transparent}.v55-act-btn.active{border-bottom-color:rgba(184,164,255,.85)}.v55-act-content{min-height:600px;padding:43px 5vw}.v55-final-card{grid-template-columns:1fr}.v55-pillar span{font-size:15px}}
      @media(max-width:520px){.v55-act-nav{grid-template-columns:1fr 1fr}.v55-act-btn{border-bottom:0;border-left:2px solid transparent}.v55-act-btn.active{border-left-color:rgba(184,164,255,.85)}.v55-pillar-nav{grid-template-columns:1fr 1fr}.v55-pillar{min-height:115px}.v55-pillar span{margin-top:22px}.v55-synthesis{padding:10vh 0}}
      @media(prefers-reduced-motion:reduce){.v55-act-btn,.v55-pillar,.v55-start{transition:none}}
    `;
    document.head.appendChild(style);
    return()=>style.remove();
  },[]);

  const current=ACTS[active], currentPillar=PILLARS[pillar];

  return <section className="v55-synthesis" id="synthesis" aria-labelledby="v55-syn-title">
    <div className="v55-syn-inner">
      <div className="v55-syn-top"><p className="v55-syn-kicker">14 / THE SYNTHESIS</p><p className="v55-syn-index">SEE → QUESTION → CONNECT → RETURN</p></div>
      <div className="v55-syn-hero">
        <h2 id="v55-syn-title">THE POINT IS NOT<br/>TO <em>ARRIVE.</em><br/>IT IS TO SEE.</h2>
        <p className="v55-syn-lead">The sections before this one are different doors into the same larger activity: examining experience, ideas, texts and consequences without outsourcing the entire inquiry to someone else.</p>
        <div className="v55-scrollhint"><span className="v55-scrollline"/> CONTINUE DOWN / THE SYNTHESIS</div>
      </div>
      <div className="v55-act">
        <div className="v55-act-head"><span className="v55-act-no">FOUR MOVEMENTS</span><span className="v55-act-label">A FRAMEWORK FOR CONTINUING</span></div>
        <div className="v55-act-grid">
          <nav className="v55-act-nav" aria-label="Synthesis movements">
            {ACTS.map((a,i)=><button key={a[0]} type="button" className={"v55-act-btn "+(i===active?"active":"")} onClick={()=>setActive(i)}><span>{a[0]}</span><span>{a[1]}</span></button>)}
          </nav>
          <article className="v55-act-content" aria-live="polite">
            <div className="v55-act-meta"><span><strong>{current[5]}</strong> / MOVEMENT</span><span>{current[0]} / 04</span></div>
            <div className="v55-act-copy"><h3>{current[2]}</h3><p className="v55-act-body">{current[3]}</p><p className="v55-act-question">{current[4]}</p></div>
            <div className="v55-act-foot"><span className="v55-act-word">{current[5]}</span><div className="v55-act-progress">{ACTS.map((a,i)=><i key={a[0]} className={i<=active?"on":""}/>)}</div></div>
          </article>
        </div>
      </div>
      <div className="v55-synthesis">
        <h3>KEEP FOUR THINGS<br/><em>IN THE ROOM.</em></h3>
        <div className="v55-pillar-nav">
          {PILLARS.map((p,i)=><button key={p[0]} type="button" className={"v55-pillar "+(i===pillar?"active":"")} onClick={()=>setPillar(i)}><strong>0{i+1} / {p[0]}</strong><span>{p[1]}</span></button>)}
        </div>
        <div className="v55-final-card" aria-live="polite">
          <p><strong>{currentPillar[0]}</strong>{currentPillar[1]}</p>
          <button type="button" className="v55-start" onClick={()=>setStarted(v=>!v)}>{started?"INQUIRY ACTIVE":"START THE INQUIRY"}</button>
        </div>
        <p className="v55-complete">NO LOGIN · NO SCORE · NO CERTIFICATE · JUST A PLACE TO BEGIN LOOKING MORE CAREFULLY.</p>
      </div>
    </div>
  </section>;
}
