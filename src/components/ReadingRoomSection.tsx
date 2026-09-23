/* V53 — ReadingRoomSection
 * Isolated editorial section. Does not modify V41–V52.
 */
"use client";

import { useEffect, useState } from "react";

const TEXTS = [
  {
    n:"01", tag:"BHAGAVAD GITA", title:"The field of action",
    line:"What happens when action is examined instead of merely justified?",
    body:"The Gita can be approached as a dialogue about action, attachment, knowledge and the nature of the self. Read the text itself and compare interpretations rather than treating a summary as the text."
  },
  {
    n:"02", tag:"UPANISHADS", title:"The question of the self",
    line:"What remains when borrowed identities are examined?",
    body:"The Upanishadic corpus contains diverse dialogues and teachings concerning self, reality, knowledge and liberation. Different texts and later traditions interpret these themes in different ways."
  },
  {
    n:"03", tag:"ASHTAVAKRA GITA", title:"The witness and freedom",
    line:"Can observation itself become the subject of inquiry?",
    body:"The Ashtavakra Gita is a distinctive non-dual dialogue traditionally presented between Ashtavakra and King Janaka. Its radical language invites close reading rather than reducing it to a motivational slogan."
  },
  {
    n:"04", tag:"KABIR / OTHER VOICES", title:"Question the borrowed form",
    line:"What if the form is not the thing being sought?",
    body:"Poets and teachers across traditions have challenged mechanical belief and social imitation in very different historical contexts. Their words should be read in their own context before being combined into one philosophy."
  },
];

export default function ReadingRoomSection(){
  const [active,setActive]=useState(0);
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    const style=document.createElement("style");
    style.setAttribute("data-v53-reading-room","true");
    style.textContent=`
      .v53-reading{position:relative;z-index:7;min-height:120vh;padding:16vh 7vw 18vh;overflow:hidden;background:#040407;isolation:isolate}
      .v53-reading:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 34%,rgba(255,193,116,.055),transparent 24%),radial-gradient(circle at 82% 70%,rgba(155,139,255,.065),transparent 28%);pointer-events:none}
      .v53-inner{position:relative;width:min(1240px,100%);margin:auto}
      .v53-top{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding-top:17px}
      .v53-kicker,.v53-index{margin:0;color:rgba(255,255,255,.4);font:500 9px/1 Arial,sans-serif;letter-spacing:.25em}.v53-index{color:rgba(255,255,255,.2)}
      .v53-head{margin:11vh 0 10vh;display:grid;grid-template-columns:1.2fr .8fr;gap:8vw;align-items:end}
      .v53-title{margin:0;color:rgba(255,255,255,.95);font:400 clamp(54px,8vw,121px)/.84 Georgia,"Times New Roman",serif;letter-spacing:-.07em}.v53-title em{font-style:normal;color:rgba(210,182,130,.9)}
      .v53-deck{max-width:430px;margin:0 0 5px;color:rgba(255,255,255,.42);font:400 12px/1.85 Arial,sans-serif}
      .v53-room{display:grid;grid-template-columns:280px minmax(0,1fr);border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}
      .v53-nav{border-right:1px solid rgba(255,255,255,.1);padding:12px 0}
      .v53-tab{width:100%;min-height:105px;padding:21px 20px;display:grid;grid-template-columns:35px 1fr;gap:12px;border:0;border-left:2px solid transparent;background:transparent;text-align:left;color:rgba(255,255,255,.3);cursor:pointer;transition:.45s}
      .v53-tab:hover,.v53-tab.active{color:rgba(255,255,255,.91);background:rgba(255,255,255,.022)}.v53-tab.active{border-left-color:rgba(210,182,130,.82)}
      .v53-num{font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v53-tag{font:500 9px/1.35 Arial,sans-serif;letter-spacing:.15em}
      .v53-main{min-height:610px;padding:55px 6vw;display:flex;flex-direction:column;justify-content:space-between}
      .v53-meta{display:flex;justify-content:space-between;color:rgba(255,255,255,.22);font:500 8px/1 Arial,sans-serif;letter-spacing:.18em}.v53-meta strong{color:rgba(210,182,130,.72);font-weight:500}
      .v53-copy{max-width:750px}.v53-copy h3{margin:0 0 27px;color:rgba(255,255,255,.94);font:400 clamp(35px,4.8vw,68px)/.93 Georgia,"Times New Roman",serif;letter-spacing:-.05em}.v53-line{margin:0 0 24px;color:rgba(255,255,255,.7);font:400 18px/1.45 Georgia,serif}.v53-body{max-width:660px;margin:0;color:rgba(255,255,255,.44);font:400 12px/1.9 Arial,sans-serif}
      .v53-open{margin-top:34px;border:0;border-bottom:1px solid rgba(210,182,130,.35);padding:0 0 8px;background:transparent;color:rgba(255,255,255,.55);font:500 8px/1 Arial,sans-serif;letter-spacing:.2em;cursor:pointer}.v53-open:hover{color:#fff}
      .v53-detail{max-width:660px;margin-top:18px;padding:17px 0;border-top:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.3);font:400 10px/1.75 Arial,sans-serif}
      .v53-bottom{display:flex;justify-content:space-between;align-items:end;gap:20px}.v53-mark{color:rgba(255,255,255,.045);font:400 72px/.7 Georgia,serif}.v53-note{max-width:350px;margin:0;color:rgba(255,255,255,.22);font:500 8px/1.65 Arial,sans-serif;letter-spacing:.14em}
      .v53-foot{margin:7vh 0 0;max-width:760px;color:rgba(255,255,255,.23);font:400 11px/1.75 Arial,sans-serif}
      @media(max-width:850px){.v53-reading{padding:13vh 6vw 15vh}.v53-head{grid-template-columns:1fr;gap:30px;margin-top:9vh}.v53-room{grid-template-columns:1fr}.v53-nav{display:grid;grid-template-columns:repeat(2,1fr);border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.v53-tab{min-height:80px;padding:15px 11px;border-left:0;border-bottom:2px solid transparent}.v53-tab.active{border-bottom-color:rgba(210,182,130,.82)}.v53-main{min-height:650px;padding:43px 5vw}}
      @media(max-width:520px){.v53-nav{grid-template-columns:1fr}.v53-tab{min-height:64px;grid-template-columns:32px 1fr;border-bottom:0;border-left:2px solid transparent}.v53-tab.active{border-left-color:rgba(210,182,130,.82);border-bottom:0}.v53-copy h3{font-size:36px}.v53-main{min-height:700px}}
      @media(prefers-reduced-motion:reduce){.v53-tab{transition:none}}
    `;
    document.head.appendChild(style); return()=>style.remove();
  },[]);

  const x=TEXTS[active];

  return <section className="v53-reading" id="reading-room" aria-labelledby="v53-title">
    <div className="v53-inner">
      <div className="v53-top"><p className="v53-kicker">12 / THE READING ROOM</p><p className="v53-index">READ THE TEXT / THEN READ YOUR INTERPRETATION</p></div>
      <div className="v53-head">
        <h2 className="v53-title" id="v53-title">DON’T <em>COLLECT</em><br/>QUOTATIONS.<br/>READ DEEPLY.</h2>
        <p className="v53-deck">Texts can become another source of borrowed certainty when they are reduced to slogans. This room treats reading as a slower encounter: source, context, interpretation, question.</p>
      </div>
      <div className="v53-room">
        <nav className="v53-nav" aria-label="Reading room texts">
          {TEXTS.map((t,i)=><button key={t.n} className={"v53-tab "+(i===active?"active":"")} type="button" onClick={()=>{setActive(i);setOpen(false)}} aria-selected={i===active}><span className="v53-num">{t.n}</span><span className="v53-tag">{t.tag}</span></button>)}
        </nav>
        <article className="v53-main" aria-live="polite">
          <div className="v53-meta"><span><strong>{x.tag}</strong> / READING LENS</span><span>{x.n} / 04</span></div>
          <div className="v53-copy">
            <h3 key={x.n}>{x.title}</h3>
            <p className="v53-line">{x.line}</p>
            <p className="v53-body">{x.body}</p>
            <button className="v53-open" type="button" onClick={()=>setOpen(v=>!v)}>{open?"− CLOSE":"＋ OPEN"} / READING NOTE</button>
            {open&&<p className="v53-detail">A summary is not a substitute for the primary source. Where possible, read the relevant passage, identify the translator or edition, and compare interpretations before drawing a conclusion.</p>}
          </div>
          <div className="v53-bottom"><span className="v53-mark">¶</span><p className="v53-note">PRIMARY TEXT → CONTEXT → INTERPRETATION → YOUR OWN EXAMINATION</p></div>
        </article>
      </div>
      <p className="v53-foot">The descriptions above are intentionally brief orientation notes. They do not attempt to represent the full history, theology or diversity of the traditions named.</p>
    </div>
  </section>;
}
