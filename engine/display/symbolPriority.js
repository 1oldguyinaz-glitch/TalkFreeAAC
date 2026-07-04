const CATEGORY_SYMBOLS = {
  relationship: "relationships",
  feeling: "emotions",
  emotion: "emotions",
  food: "food",
  place: "places",
  safety: "safety",
  conversation: "conversation",
  verb: "actions",
  action: "actions",
  pronoun: "people",
  person: "people",
  learning: "school",
  object: "objects"
};

export function slugifySymbolName(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getSymbolPath(wordObject = {}) {
  if (wordObject.cartoon) return wordObject.cartoon;

  const label = wordObject.name || wordObject.display_text || wordObject.display || "communication";
  const type = wordObject.grammar_type || wordObject.communication_purpose || "object";
  const folder = CATEGORY_SYMBOLS[type] || "objects";

  return `/symbols/v4/${folder}/${slugifySymbolName(label)}.png`;
}

export function getFallbackSymbol(wordObject = {}) {
  const type = wordObject.grammar_type || wordObject.communication_purpose || "object";
  const fallbacks = {
    relationship: "❤️",
    feeling: "😊",
    emotion: "😊",
    food: "🍎",
    place: "📍",
    safety: "🚨",
    conversation: "💬",
    verb: "🏃",
    action: "🏃",
    pronoun: "👤",
    person: "👤",
    learning: "📚",
    object: "💬"
  };
  return wordObject.icon || fallbacks[type] || "💬";
}
