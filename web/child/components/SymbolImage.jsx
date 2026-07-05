import React, { useMemo, useState } from "react";

const FALLBACKS = {
  "i": "🧒",
  "want": "🤲",
  "need": "🆘",
  "feel": "🙂",
  "am": "=",
  "can": "🙋",
  "don't": "✕",
  "like": "☺",
  "love": "♡",
  "have": "🤲",
  "see": "👀",
  "hear": "👂",
  "think": "💭",
  "go": "→",
  "stop": "🛑",
  "help": "🤝",
  "get": "🤲",
  "do": "🙌",
  "more": "☝",
  "food": "🍎",
  "drink": "🥤",
  "water": "💧",
  "snack": "🍪",
  "outside": "🌳",
  "inside": "🏠",
  "break": "🛝",
  "and": "+",
  "because": "♣",
  "but": "≠",
  "to": "→",
  "with": "👥",
  "then": "◷",
  "when": "?",
  "if": "↔",
  "so": "→",
  "yes": "✓",
  "no": "✕",
  "finished": "🙌",
  "please": "🙏",
  "thank you": "♡",
  "mom": "👩",
  "dad": "👨",
  "you": "☝",
  "me": "🙋"
};

function slugify(word = "") {
  return String(word)
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .trim();
}

function fallbackFor(word = "") {
  const key = String(word).toLowerCase().trim();
  if (FALLBACKS[key]) return FALLBACKS[key];
  if (key.includes("love")) return "♡";
  if (key.includes("hug")) return "🤗";
  if (key.includes("thank")) return "♡";
  if (key.includes("sorry")) return "☹";
  if (key.includes("morning")) return "☀";
  if (key.includes("night")) return "☾";
  if (key.includes("food")) return "🍎";
  if (key.includes("drink")) return "🥤";
  if (key.includes("school")) return "🏫";
  if (key.includes("place")) return "📍";
  if (key.includes("question")) return "?";
  if (key.includes("search")) return "⌕";
  if (key.includes("emergency")) return "⚠";
  return "•";
}

export default function SymbolImage({ word, className = "symbolImage" }) {
  const [failed, setFailed] = useState(false);
  const slug = useMemo(() => slugify(word), [word]);

  if (!slug || failed) {
    return <span className="fallbackSymbol" aria-hidden="true">{fallbackFor(word)}</span>;
  }

  return (
    <img
      className={className}
      src={`/symbols/aac/${slug}.svg`}
      alt=""
      aria-hidden="true"
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}
