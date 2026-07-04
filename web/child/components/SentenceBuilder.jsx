import React from "react";

export const SENTENCE_STARTERS = [
  "I am", "I want", "I need", "I can", "I can't",
  "I feel", "I like", "I don't", "Can I", "Help me"
];

export default function SentenceBuilder({ onSelect }) {
  return (
    <section className="sentenceStarterDock" aria-label="Sentence starters">
      {SENTENCE_STARTERS.map(starter => (
        <button key={starter} className="starterBubble" onClick={() => onSelect(starter)}>
          {starter}
        </button>
      ))}
    </section>
  );
}
