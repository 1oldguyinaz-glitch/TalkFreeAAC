import React from "react";
import SymbolImage from "./SymbolImage.jsx";

const WORD_GROUPS = {
  blue: ["i", "am", "can", "don't", "like", "love", "have", "see", "hear"],
  green: ["want", "need", "feel", "think", "go", "stop", "help", "get", "do", "play", "eat", "drink"],
  orange: ["more", "food"],
  purple: ["drink", "water", "snack", "outside", "inside", "break"],
  white: ["and", "because", "but", "to", "with", "then", "when", "if", "so"],
  yellow: ["yes", "no", "finished", "please", "thank you"],
  pink: ["mom", "dad", "you", "me"]
};

function normalize(word = "") {
  return String(word).toLowerCase().replace(/[^\w\s']/g, "").trim();
}

function colorClassFor(word = "") {
  const key = normalize(word);
  for (const [group, words] of Object.entries(WORD_GROUPS)) {
    if (words.some(token => key === token || key.includes(token))) return group;
  }
  return "blue";
}

export default function AACButton({ word, onSelect, variant = "default" }) {
  const colorClass = colorClassFor(word);

  return (
    <button
      className={`aacApprovedTile ${variant} tile-${colorClass}`}
      onClick={() => onSelect(word)}
      aria-label={word}
    >
      <SymbolImage word={word} />
      <span className="approvedTileLabel">{word}</span>
    </button>
  );
}
