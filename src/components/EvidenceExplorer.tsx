"use client";

import { useState } from "react";

type EvidenceItem = {
  id: string;
  label: string;
  claim: string;
  source: string;
  context: string;
  uncertainty: string;
};

const DEFAULT_ITEMS: EvidenceItem[] = [
  {
    id: "example-01",
    label: "EXAMPLE 01",
    claim: "A statement becomes stronger when its evidence can be examined rather than merely repeated.",
    source: "Identify where the statement came from: a primary document, direct observation, measured data, expert analysis, or an unverified repetition.",
    context: "Ask what the source was trying to establish, who produced it, when it was produced, and what information may be missing from the immediate claim.",
    uncertainty: "Evidence can support a conclusion without making it certain. Record what is known, what is inferred, and what remains unresolved.",
  },
  {
    id: "example-02",
    label: "EXAMPLE 02",
    claim: "A number without its population, timeframe, and measurement method can create a misleading impression of precision.",
    source: "Look for the original dataset or report rather than relying only on a headline, graphic, or secondary summary.",
    context: "Check who was measured, how the sample was selected, when the data was collected, and whether the comparison uses the same definitions.",
    uncertainty: "Sampling limits, missing data, measurement error, and changing definitions can affect what a number can legitimately tell us.",
  },
  {
    id: "example-03",
    label: "EXAMPLE 03",
    claim: "A persuasive interpretation is not automatically the only interpretation supported by the evidence.",
    source: "Separate the underlying source material from the interpretation placed on top of it.",
    context: "Compare competing explanations and ask which observations each explanation accounts for, and which observations it leaves unexplained.",
    uncertainty: "When reasonable interpretations remain, show the disagreement instead of hiding it behind confident language.",
  },
];

const TABS = ["claim", "source", "context", "uncertainty"] as const;
type Tab = (typeof TABS)[number];

export default function EvidenceExplorer({ items = DEFAULT_ITEMS }: { items?: EvidenceItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [tab, setTab] = useState<Tab>("claim");
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  const content: Record<Tab, string> = {
    claim: active.claim,
    source: active.source,
    context: active.context,
    uncertainty: active.uncertainty,
  };

  return (
    <section className="evidence-explorer" aria-labelledby="evidence-explorer-title">
      <div className="evidence-explorer__header">
        <div>
          <span className="evidence-explorer__eyebrow">THE EVIDENCE OBSERVATORY</span>
          <h2 id="evidence-explorer-title">Look beneath<br /><em>the statement.</em></h2>
        </div>
        <p>Move from assertion to examination. Separate what was said, where it came from, the surrounding context, and what remains uncertain.</p>
      </div>

      <div className="evidence-explorer__shell">
        <nav className="evidence-explorer__items" aria-label="Evidence examples">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={item.id === active.id ? "is-active" : ""}
              aria-pressed={item.id === active.id}
              onClick={() => setActiveId(item.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <i aria-hidden="true">→</i>
            </button>
          ))}
        </nav>

        <div className="evidence-explorer__body">
          <div className="evidence-explorer__tabs" role="tablist" aria-label="Evidence examination layers">
            {TABS.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={tab === name}
                className={tab === name ? "is-active" : ""}
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="evidence-explorer__reading" role="tabpanel">
            <span>{active.label} / {tab.toUpperCase()}</span>
            <p key={`${active.id}-${tab}`}>{content[tab]}</p>
          </div>

          <div className="evidence-explorer__rule" />
          <p className="evidence-explorer__instruction">A useful inquiry does not hide uncertainty. It makes uncertainty visible.</p>
        </div>
      </div>
    </section>
  );
}
