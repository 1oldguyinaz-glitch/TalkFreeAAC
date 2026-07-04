import React from "react";

export const HUMAN_PHRASES = [
  { text: "I love you", icon: "❤️" },
  { text: "Can I have a hug", icon: "🤗" },
  { text: "Thank you", icon: "🙏" },
  { text: "Hi", icon: "👋" },
  { text: "Bye", icon: "👋" },
  { text: "I'm sorry", icon: "😢" },
  { text: "I miss you", icon: "🥰" },
  { text: "Good job", icon: "⭐" },
  { text: "Good morning", icon: "☀️" },
  { text: "Good night", icon: "🌙" }
];

export default function HumanPhraseBar({ onSelect }) {
  return (
    <section className="humanPhraseDock" aria-label="Human connection phrases">
      {HUMAN_PHRASES.map(item => (
        <button key={item.text} className="humanPhraseBubble" onClick={() => onSelect(item.text)}>
          <span>{item.icon}</span><strong>{item.text}</strong>
        </button>
      ))}
    </section>
  );
}
