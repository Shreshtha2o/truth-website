 "use client";

import { useMemo, useState } from "react";

type AtlasNode = {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  links: string[];
};

const NODES: AtlasNode[] = [
  { id:"self", index:"01", label:"SELF", title:"The one who is looking.", description:"Begin with the observer: attention, identity, desire, fear, and the assumptions that shape perception.", links:["philosophy","knowledge"] },
  { id:"philosophy", index:"02", label:"PHILOSOPHY", title:"Question the assumptions.", description:"Use philosophy as a practice of examination: concepts become questions rather than conclusions to inherit.", links:["self","scriptures","knowledge"] },
  { id:"scriptures", index:"03", label:"SCRIPTURES", title:"Read across traditions.", description:"Approach texts as objects of inquiry. Compare language, context, interpretation, and the questions a text is addressing.", links:["philosophy","self","tradition"] },
  { id:"knowledge", index:"04", label:"KNOWLEDGE", title:"Separate knowing from believing.", description:"Trace how claims are formed, tested, communicated, and revised.", links:["self","philosophy","evidence"] },
  { id:"evidence", index:"05", label:"EVIDENCE", title:"Look at what supports a claim.", description:"Inspect sources, context, uncertainty, and competing explanations before reaching a conclusion.", links:["knowledge","world"] },
  { id:"society", index:"06", label:"SOCIETY", title:"See the human system.", description:"Examine institutions, incentives, culture, education, relationships, and the consequences of collective choices.", links:["self","world","nature"] },
  { id:"nature", index:"07", label:"NATURE", title:"Widen the frame.", description:"Ask how human activity relates to animals, ecosystems, resources, climate, and the living world.", links:["society","world"] },
  { id:"world", index:"08", label:"WORLD", title:"Return to the whole.", description:"Bring inner inquiry and external knowledge together without pretending that complexity has one simple answer.", links:["evidence","society","nature"] },
];

export default function KnowledgeAtlas() {
  const [active, setActive] = useState("self");
  const [focus, setFocus] = useState<string | null>(null);
  const current = useMemo(() => NODES.find(n => n.id === active) ?? NODES[0], [active]);

  const connected = new Set(current.links);

  return (
    <section className="knowledge-atlas" aria-labelledby="knowledge-atlas-title">
      <div className="atlas-head">
        <div>
          <span className="atlas-kicker">KNOWLEDGE ATLAS / 01</span>
          <h2 id="knowledge-atlas-title">MOVE THROUGH<br /><em>QUESTIONS.</em></h2>
        </div>
        <p className="atlas-intro">
          Ideas are connected. Follow a question outward, then return to the one who is asking it.
        </p>
      </div>

      <div className="atlas-grid">
        <nav className="atlas-map" aria-label="Knowledge domains">
          <div className="atlas-lines" aria-hidden="true" />
          {NODES.map(node => {
            const isActive = node.id === active;
            const isConnected = connected.has(node.id);
            const isDimmed = focus !== null && focus !== node.id && !isConnected && !isActive;
            return (
              <button
                key={node.id}
                className={`atlas-node ${isActive ? "is-active" : ""} ${isConnected ? "is-connected" : ""} ${isDimmed ? "is-dimmed" : ""}`}
                onClick={() => { setActive(node.id); setFocus(node.id); }}
                onMouseEnter={() => setFocus(node.id)}
                onMouseLeave={() => setFocus(null)}
                aria-pressed={isActive}
              >
                <span className="atlas-node-index">{node.index}</span>
                <span>{node.label}</span>
              </button>
            );
          })}
        </nav>

        <article className="atlas-detail" aria-live="polite">
          <span className="atlas-detail-index">{current.index}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <div className="atlas-related">
            <span>CONNECTED QUESTIONS</span>
            <div>
              {current.links.map(id => {
                const n = NODES.find(item => item.id === id);
                return n ? (
                  <button key={id} onClick={() => setActive(id)}>{n.label} ↗</button>
                ) : null;
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
