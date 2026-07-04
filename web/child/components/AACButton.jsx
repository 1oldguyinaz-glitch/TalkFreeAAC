import React from "react";
import { getWordObject } from "../../../engine/language/languageEngine.js";
import SymbolImage from "./SymbolImage.jsx";

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Daily Living") return "Daily";
  if (word === "Health & Body") return "Health";
  return word;
}

export default function AACButton({ word, onSelect, variant = "word" }) {
  const obj = getWordObject(word);
  const tileColor = obj.color || "#1688ff";

  return (
    <button
      className={`aacBubble ${variant}`}
      style={{ "--tileColor": tileColor }}
      onClick={() => onSelect(word)}
      aria-label={`Select ${word}`}
      title={word}
    >
      <SymbolImage wordObject={obj} />
      <span className="bubbleLabel">{labelFor(word)}</span>
    </button>
  );
}
