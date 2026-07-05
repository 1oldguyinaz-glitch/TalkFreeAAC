import {
  TREE_VERSION,
  getFixedCoreLanguage,
  getDynamicBranch,
  uniqueWords
} from "../language/languageTree.js";

const TOPICS = [
  "Relationships",
  "Feelings",
  "Food & Drink",
  "Places",
  "School",
  "Actions",
  "Things",
  "Body & Health",
  "Questions",
  "Recents",
  "Favorites",
  "Search",
  "Emergency"
];

export function currentPhrase(sentence = []) {
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

export function predictNextWords(profile = {}) {
  return getFixedCoreLanguage();
}

export function getPredictions(profile = {}) {
  return predictNextWords(profile);
}

export function getContextWords(profile = {}) {
  const sentence = profile.sentence || [];
  return uniqueWords(getDynamicBranch(sentence)).slice(0, 27);
}

export function getFullBoard(profile = {}) {
  return {
    version: TREE_VERSION,
    predictions: getFixedCoreLanguage(),
    contextWords: getContextWords(profile),
    topics: [...TOPICS]
  };
}

export function getBoard(profile = {}) {
  return getFullBoard(profile);
}

export function buildPredictionBoard(profile = {}) {
  return getFullBoard(profile);
}

export function recordSelection(profile = {}, word = "") {
  return {
    ...profile,
    sentence: [...(profile.sentence || []), word]
  };
}

export function clearSentence(profile = {}) {
  return {
    ...profile,
    sentence: []
  };
}

export function removeLastWord(profile = {}) {
  return {
    ...profile,
    sentence: [...(profile.sentence || [])].slice(0, -1)
  };
}

export default {
  currentPhrase,
  predictNextWords,
  getPredictions,
  getContextWords,
  getFullBoard,
  getBoard,
  buildPredictionBoard,
  recordSelection,
  clearSentence,
  removeLastWord
};
