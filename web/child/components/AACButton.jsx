import React from "react";
import SymbolImage from "./SymbolImage.jsx";

const COLOR_GROUPS = {
  blue: ["i","want","need","feel","am","can","don't","like","love","have","see","hear"],
  green: ["think","go","stop","help","get","do"],
  orange: ["more","help"],
  purple: ["food","drink","water","snack","outside","inside","break"],
  white: ["and","because","but","to","with","then","when","if","so"],
  yellow: ["yes","no","finished","please","thank you"],
  pink: ["mom","dad","you","me"]
};

function normalize(word = "") {
  return String(word).toLowerCase().replace(/[^\w\s']/g, "").trim();
}

function colorClassFor(word = "") {
  const key = normalize(word);
  for (const [group, words] of Object.entries(COLOR_GROUPS)) {
    if (words.includes(key)) return group;
  }
  return "blue";
}

export default function AACButton({ word, onSelect }) {
  const colorClass = colorClassFor(word);
  return (
    <button className={`aacApprovedTile tile-${colorClass}`} onClick={() => onSelect(word)} aria-label={word}>
      <SymbolImage word={word} />
      <span className="approvedTileLabel">{word}</span>
    </button>
  );
}
