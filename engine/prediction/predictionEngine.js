import {
  TREE_VERSION,
  getFixedCoreLanguage,
  getDynamicBranch,
  uniqueWords
} from "../language/languageTree.js";

export function currentPhrase(sentence = []) {
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

export function predictNextWords(profile = {}) {
  return getFixedCoreLanguage();
}

export function getFullBoard(profile = {}) {
  const sentence = profile.sentence || [];
  const branch = getDynamicBranch(sentence);
  const topics = [
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

  return {
    version: TREE_VERSION,
    predictions: getFixedCoreLanguage(),
    contextWords: uniqueWords(branch).slice(0, 27),
    topics
  };
}

export function recordSelection(profile = {}, word = "") {
  return {
    ...profile,
    sentence: [...(profile.sentence || []), word]
  };
}
