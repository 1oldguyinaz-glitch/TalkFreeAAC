import React from "react";
import SymbolImage from "./SymbolImage.jsx";
import "../../styles/aac-colors.css";

const COLOR_GROUPS = {
  blue: [
    "i", "me", "you", "we", "he", "she", "they", "my", "your", "mine", "yours"
  ],

  green: [
    "want", "need", "can", "like", "have", "see", "hear", "think", "go", "get", "do",
    "play", "eat", "drink", "read", "watch", "sit", "stand", "try", "open", "close",
    "listen", "wait", "turn", "look", "make", "use", "choose", "talk", "say"
  ],

  orange: [
    "food", "drink", "water", "snack", "juice", "milk", "breakfast", "lunch", "dinner",
    "hungry", "thirsty", "more food", "more drink"
  ],

  purple: [
    "outside", "inside", "home", "school", "bathroom", "park", "car", "room", "table",
    "chair", "bed", "playground", "store", "place", "places", "toilet"
  ],

  yellow: [
    "mom", "dad", "teacher", "friend", "grandma", "grandpa", "family", "people",
    "doctor", "nurse", "class", "student"
  ],

  red: [
    "feel", "happy", "sad", "mad", "angry", "scared", "tired", "sick", "hurt",
    "frustrated", "excited", "proud", "lonely", "safe", "emergency", "stop",
    "help", "medicine", "pain", "body", "health", "calm", "upset", "nervous",
    "okay", "not ready", "ready"
  ],

  pink: [
    "love", "i love you", "hug", "have a hug", "can i have a hug", "thank you",
    "hi", "bye", "i'm sorry", "sorry", "i miss you", "miss you", "good job",
    "good morning", "good night", "relationship", "relationships"
  ],

  white: [
    "am", "don't", "dont", "not", "and", "because", "but", "to", "with", "without",
    "for", "from", "in", "on", "under", "over", "then", "when", "after", "if",
    "so", "yes", "no", "finished", "all done", "please", "maybe", "a", "an", "the",
    "is", "are", "was"
  ],

  brown: [
    "thing", "things", "toy", "tablet", "book", "ball", "blanket",
    "clothes", "shoes", "music", "tv", "phone", "cup", "plate", "spoon", "fork",
    "bag", "backpack", "paper", "pencil"
  ]
};

function normalize(word = "") {
  return String(word)
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function colorClassFor(word = "") {
  const key = normalize(word);

  for (const [group, words] of Object.entries(COLOR_GROUPS)) {
    if (words.includes(key)) return group;
  }

  for (const [group, words] of Object.entries(COLOR_GROUPS)) {
    if (words.some(token => key.includes(token))) return group;
  }

  return "brown";
}

export default function AACButton({ word, onSelect }) {
  const colorClass = colorClassFor(word);

  return (
    <button
      className={`aacApprovedTile tile-${colorClass}`}
      onClick={() => onSelect(word)}
      aria-label={word}
    >
      <SymbolImage word={word} />
      <span className="approvedTileLabel">{word}</span>
    </button>
  );
}
