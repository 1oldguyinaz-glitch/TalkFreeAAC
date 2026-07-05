import {
  TREE_VERSION,
  TOPICS,
  getFixedCoreLanguage,
  getDynamicBranch,
  getTopicAttributes,
  getNextTopicContext,
  isTopicNavigationWord,
  uniqueWords
} from "../language/languageTree.js";

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
  const activeContext = profile.activeContext || profile.context || profile.topic || "";
  return uniqueWords(getDynamicBranch(sentence, activeContext)).slice(0, 27);
}

export function getTopicWords(topic = "") {
  return uniqueWords(getTopicAttributes(topic)).slice(0, 27);
}

export function getNextTopicNode(currentContext = "", selectedWord = "") {
  return getNextTopicContext(currentContext, selectedWord);
}

export function topicWordHasChildren(currentContext = "", selectedWord = "") {
  return isTopicNavigationWord(currentContext, selectedWord);
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
    activeContext: "",
    context: "",
    topic: "",
    sentence: [...(profile.sentence || []), word]
  };
}

export function clearSentence(profile = {}) {
  return {
    ...profile,
    activeContext: "",
    context: "",
    topic: "",
    sentence: []
  };
}

export function removeLastWord(profile = {}) {
  return {
    ...profile,
    sentence: [...(profile.sentence || [])].slice(0, -1)
  };
}

export function setActiveContext(profile = {}, context = "") {
  return {
    ...profile,
    activeContext: context,
    context,
    topic: context
  };
}

export function clearActiveContext(profile = {}) {
  return {
    ...profile,
    activeContext: "",
    context: "",
    topic: ""
  };
}

export default {
  currentPhrase,
  predictNextWords,
  getPredictions,
  getContextWords,
  getTopicWords,
  getNextTopicNode,
  topicWordHasChildren,
  getFullBoard,
  getBoard,
  buildPredictionBoard,
  recordSelection,
  clearSentence,
  removeLastWord,
  setActiveContext,
  clearActiveContext
};
