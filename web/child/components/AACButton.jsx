import React from "react";
import SymbolImage from "./SymbolImage.jsx";

const CATEGORY_COLORS = {
  pronoun: "#1688ff",
  action: "#16c86a",
  food: "#ff9f1c",
  place: "#9b57d6",
  person: "#ffdd00",
  feeling: "#ef4444",
  relationship: "#ff4fa3",
  connector: "#f8fafc",
  safety: "#ef4444"
};

const WORD_GROUPS = {
  pronoun: ["i", "you", "me", "my", "your", "he", "she", "they", "we", "it", "this", "that"],
  action: ["want", "need", "can", "go", "stop", "help", "play", "eat", "drink", "open", "close", "read", "watch", "sit", "stand", "try", "listen", "wait", "do", "get", "have", "see", "hear", "think", "like"],
  food: ["food", "water", "drink", "juice", "milk", "snack", "breakfast", "lunch", "dinner", "hungry", "thirsty", "full", "more"],
  place: ["outside", "inside", "home", "school", "bathroom", "park", "store", "car", "room", "table", "chair", "bed", "playground", "places"],
  person: ["mom", "dad", "grandma", "grandpa", "teacher", "friend", "family", "people"],
  feeling: ["feel", "happy", "sad", "mad", "angry", "scared", "tired", "sick", "hurt", "frustrated", "excited", "proud", "lonely", "safe", "emotions"],
  relationship: ["love", "hug", "thank", "hi", "bye", "sorry", "miss", "good job", "good morning", "good night"],
  connector: ["and", "because", "but", "to", "with", "without", "for", "from", "in", "on", "under", "over", "then", "when", "after", "so", "if", "please", "yes", "no", "finished", "all done", "maybe"],
  safety: ["emergency", "doctor", "medicine", "call", "stop", "hurt", "scared", "safe", "health"]
};

function normalize(word = "") {
  return String(word).toLowerCase().replace(/[^\w\s']/g, "").trim();
}

function categoryFor(word = "") {
  const key = normalize(word);
  for (const [category, list] of Object.entries(WORD_GROUPS)) {
    if (list.some(token => key === token || key.includes(token))) return category;
  }
  return "pronoun";
}

function tileColorFor(word) {
  return CATEGORY_COLORS[categoryFor(word)] || CATEGORY_COLORS.pronoun;
}

export default function AACButton({ word, onSelect, variant = "default", showPredictionBadge = false }) {
  const color = tileColorFor(word);
  const category = categoryFor(word);

  return (
    <button
      className={`aacBubble ${variant} category-${category}`}
      style={{ "--tileColor": color }}
      onClick={() => onSelect(word)}
      aria-label={word}
    >
      {showPredictionBadge ? <span className="predictionBadge">AI</span> : null}
      <SymbolImage word={word} />
      <span className="bubbleLabel">{word}</span>
    </button>
  );
}
