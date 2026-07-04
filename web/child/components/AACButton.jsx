import React from "react";
import { getWordObject } from "../../../engine/language/languageEngine.js";

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Daily Living") return "Daily";
  if (word === "Health & Body") return "Health";
  return word;
}

export default function AACButton({ word, onSelect, variant = "word" }) {
  const obj = getWordObject(word);
  return (
    <button
      className={`aacBubble ${variant}`}
      style={{ "--tileColor": obj.color || "#1688ff" }}
      onClick={() => onSelect(word)}
      aria-label={`Select ${word}`}
    >
      <span className="bubbleIcon">{obj.icon || "💬"}</span>
      <span className="bubbleLabel">{labelFor(word)}</span>
    </button>
  );
}
