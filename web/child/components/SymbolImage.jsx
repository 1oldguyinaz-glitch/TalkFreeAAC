import React, { useMemo, useState } from "react";

function slugify(word = "") {
  return String(word)
    .toLowerCase()
    .replace(/[^\w\s&']/g, "")
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .trim();
}

const FALLBACKS = {
  "i":"🧒","want":"🤲","need":"🆘","feel":"🙂","am":"=","can":"🙋","don't":"✕","like":"☺","love":"❤️",
  "have":"📦","see":"👀","hear":"👂","think":"💭","go":"➡️","stop":"🛑","help":"🤝","get":"🤲","do":"🙌",
  "more":"🙌","food":"🍎","drink":"🥤","water":"💧","snack":"🍪","outside":"🌳","inside":"🏠","break":"🛝",
  "and":"+","because":"💬","but":"≠","to":"➡️","with":"👥","then":"🕒","when":"❓","if":"↕️","so":"➡️",
  "yes":"✅","no":"❌","finished":"🙌","please":"🙏","thank you":"💖","mom":"👩","dad":"👨","you":"👍","me":"🧒"
};

export default function SymbolImage({ word, className = "symbolImage" }) {
  const [failed, setFailed] = useState(false);
  const slug = useMemo(() => slugify(word), [word]);
  const fb = FALLBACKS[String(word).toLowerCase()] || "•";

  if (failed || !slug) return <span className="fallbackSymbol" aria-hidden="true">{fb}</span>;

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
