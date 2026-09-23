"use client";

import { useState } from "react";

type Card = {
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
};

const DEFAULT_CARDS: Card[] = [
  {
    eyebrow: "QUESTION 01",
    title: "What do I actually know?",
    summary: "Separate direct observation from memory, assumption, and borrowed belief.",
    detail: "Before accepting an answer, identify its source. Was it observed, reasoned through, learned from someone else, or simply repeated often enough to feel familiar?",
  },
  {
    eyebrow: "QUESTION 02",
    title: "What is shaping my view?",
    summary: "Look for the forces that quietly influence attention, desire, and interpretation.",
    detail: "Family, culture, incentives, media, habits, fear, and aspiration can all become part of the frame through which an experience is interpreted. The point is not to reject every influence, but to notice it.",
  },
  {
    eyebrow: "QUESTION 03",
    title: "What would change my mind?",
    summary: "Turn certainty into an inquiry by making room for evidence that could challenge it.",
    detail: "A useful question is not only 'Why do I believe this?' but also 'What observation or argument would make me reconsider it?' This keeps inquiry open rather than turning it into a search for confirmation.",
  },
];

export default function InquiryModules({ cards = DEFAULT_CARDS }: { cards?: Card[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="inquiry-modules" aria-label="Interactive inquiry">
      <div className="inquiry-modules__intro">
        <span>THE INQUIRY LAB</span>
        <h2>Don&apos;t just read.<br /><em>Investigate.</em></h2>
        <p>Open a question. Stay with it long enough to examine what you usually take for granted.</p>
      </div>

      <div className="inquiry-modules__grid">
        {cards.map((card, index) => {
          const isOpen = open === index;
          return (
            <article className={`inquiry-card${isOpen ? " is-open" : ""}`} key={`${card.title}-${index}`}>
              <button
                type="button"
                className="inquiry-card__trigger"
                aria-expanded={isOpen}
                aria-controls={`inquiry-detail-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="inquiry-card__eyebrow">{card.eyebrow}</span>
                <span className="inquiry-card__title">{card.title}</span>
                <span className="inquiry-card__summary">{card.summary}</span>
                <span className="inquiry-card__mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              <div id={`inquiry-detail-${index}`} className="inquiry-card__detail" hidden={!isOpen}>
                <p>{card.detail}</p>
                <span className="inquiry-card__prompt">Stay with the question →</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
