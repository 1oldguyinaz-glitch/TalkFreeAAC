import React, { useMemo, useState } from "react";

const FALLBACKS = {
  "i": "🧒",
  "you": "👉",
  "me": "🙋",
  "want": "🤲",
  "need": "🆘",
  "feel": "😊",
  "am": "=",
  "can": "💪",
  "don't": "❌",
  "like": "👍",
  "love": "❤️",
  "have": "🤲",
  "see": "👀",
  "hear": "👂",
  "think": "💭",
  "go": "➡️",
  "stop": "🛑",
  "help": "🤝",
  "more": "➕",
  "food": "🍎",
  "drink": "🥤",
  "water": "💧",
  "outside": "🌳",
  "home": "🏠",
  "school": "🏫",
  "bathroom": "🚽",
  "mom": "👩",
  "dad": "👨",
  "happy": "😊",
  "sad": "😢",
  "mad": "😠",
  "scared": "😨",
  "tired": "😴",
  "hurt": "🤕",
  "and": "＋",
  "because": "💭",
  "but": "≠",
  "to": "→",
  "with": "👥",
  "please": "🙏",
  "yes": "✅",
  "no": "❌",
  "finished": "🙌"
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
  if (key.includes("love")) return "❤️";
  if (key.includes("hug")) return "🤗";
  if (key.includes("thank")) return "🙏";
  if (key.includes("help")) return "🆘";
  if (key.includes("food") || key.includes("eat")) return "🍎";
  if (key.includes("drink") || key.includes("water")) return "🥤";
  if (key.includes("school")) return "🏫";
  if (key.includes("home")) return "🏠";
  if (key.includes("outside") || key.includes("park")) return "🌳";
  if (key.includes("sad")) return "😢";
  if (key.includes("scared")) return "😨";
  if (key.includes("hurt")) return "🤕";
  return "💬";
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
