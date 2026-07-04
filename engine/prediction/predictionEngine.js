import { buildLanguageBoard } from "../language/languageEngine.js";
import { getConversationPredictions } from "../language/conversationEngine.js";

export function currentPhrase(sentence = []) {
  return Array.isArray(sentence) ? sentence.join(" ").trim() : "";
}

export function getPredictions(profile) {
  return getFullBoard(profile).predictions;
}

export function getFullBoard(profile) {
  const board = buildLanguageBoard(profile);
  const conversationPredictions = getConversationPredictions(profile, 12);

  return {
    ...board,
    predictions: [...new Set([...conversationPredictions, ...board.predictions])].slice(0, 12)
  };
}
