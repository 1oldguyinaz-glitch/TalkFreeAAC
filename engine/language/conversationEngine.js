import { CONNECTORS, getGrammarPredictions } from "./coreGrammar.js";
import { getFavoritePhrases } from "./favoritePhraseEngine.js";
import { LIFE_BOARDS } from "./communicationGenome.js";

export function getConversationPredictions(profile, limit = 12) {
  const sentence = profile.sentence || [];
  const phrase = sentence.join(" ").trim();
  const favorites = getFavoritePhrases(profile, 8);
  const grammar = getGrammarPredictions(sentence);
  const context = profile.activeContext || "Core Needs";

  let extras = [];

  if (/i love$/i.test(phrase)) {
    extras = ["you", "mom", "dad", "grandma", "grandpa", "my family"];
  } else if (/i am sad/i.test(phrase) || /i feel sad/i.test(phrase)) {
    extras = ["because", "I miss you", "Can I have a hug", "It hurts", "I need a break"];
  } else if (/i want$/i.test(phrase)) {
    extras = ["to", "more", "outside", "food", "drink", "hug", "help"];
  } else if (/i need$/i.test(phrase)) {
    extras = ["help", "hug", "water", "potty", "break", "mom", "dad"];
  }

  if (LIFE_BOARDS[context]) {
    extras = [...extras, ...LIFE_BOARDS[context]];
  }

  if (sentence.length >= 2) {
    extras = [...extras, ...CONNECTORS.slice(0, 8)];
  }

  return [...new Set([...extras, ...grammar, ...favorites])]
    .filter(Boolean)
    .slice(0, limit);
}
