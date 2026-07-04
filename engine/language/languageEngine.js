import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";
import { getGrammarPredictions, CONNECTORS, HUMAN_CONNECTION_PHRASES, shouldShowConnectors } from "./coreGrammar.js";
import { getTopicWords, getNavigationTopics } from "../navigation/navigationEngine.js";

const CORE_HOME = [
  "I love you", "I want", "I need", "I am", "I can", "Help me",
  "Thank you", "Hi", "Bye", "more", "all done", "yes", "no", "please",
  "water", "food", "potty", "outside", "happy", "sad", "hurt", "play"
];

export function inferGrammarType(word = "") {
  const w = String(word).toLowerCase();
  if (["i", "you", "we", "he", "she", "they", "it"].includes(w)) return "pronoun";
  if (["want", "need", "can", "will", "am", "feel", "have", "see", "like", "don't", "go", "eat", "drink", "play", "help", "stop"].includes(w)) return "verb";
  if (CONNECTORS.includes(w)) return "connector";
  if (["i love you", "hug", "can i have a hug", "thank you", "hi", "bye", "i'm sorry", "i miss you", "good job", "good morning", "good night"].includes(w)) return "relationship";
  if (["happy", "sad", "mad", "scared", "hurt", "sick", "tired", "calm", "excited"].includes(w)) return "feeling";
  if (["mom", "dad", "teacher", "friend", "brother", "sister"].includes(w)) return "person";
  if (["outside", "home", "school", "park", "bathroom", "bedroom"].includes(w)) return "place";
  if (["food", "drink", "water", "milk", "apple juice", "snack"].includes(w)) return "food";
  return "object";
}

export function colorForType(type) {
  const colors = {
    pronoun: "#1688ff",
    verb: "#62c83f",
    connector: "#ffffff",
    relationship: "#ef5da8",
    feeling: "#ef382e",
    person: "#ffd400",
    place: "#9b57d6",
    food: "#ff8c00",
    safety: "#b00020",
    object: "#00a6a6"
  };
  return colors[type] || colors.object;
}

export function iconFor(word = "") {
  const w = String(word).toLowerCase();
  const icons = {
    "i":"👦","you":"👉","we":"👫","it":"⭐",
    "i love you":"❤️","love":"❤️","hug":"🤗","can i have a hug":"🤗","thank you":"🙏","hi":"👋","bye":"👋","i'm sorry":"😢","i miss you":"🥰","good job":"⭐","good morning":"☀️","good night":"🌙",
    "want":"🙋","need":"🆘","can":"✅","will":"➡️","am":"🙂","feel":"❤️","like":"👍","don't":"🚫",
    "to":"➡️","and":"➕","because":"💬","but":"↔️","so":"➡️","then":"⏭️",
    "help":"🆘","more":"➕","all done":"✅","yes":"👍","no":"👎","please":"🙏",
    "water":"💧","food":"🍎","drink":"🥤","apple juice":"🧃","potty":"🚽",
    "outside":"🛝","school":"🏫","home":"🏠","bathroom":"🚽","play":"🎮",
    "happy":"😊","sad":"😢","mad":"😠","hurt":"🤕"
  };
  return icons[w] || "💬";
}

export function getWordObject(word) {
  const known = KNOWLEDGE_OBJECTS[word];
  if (known) return { ...known, color: known.color || colorForType(known.grammar_type), icon: known.icon || iconFor(word) };
  const type = inferGrammarType(word);
  return {
    id: String(word).toLowerCase().replace(/\s+/g, "_"),
    name: word,
    display_text: word,
    grammar_type: type,
    communication_purpose: type === "relationship" ? "relationship" : type === "feeling" ? "emotion" : "communication",
    domain: "Core",
    icon: iconFor(word),
    color: colorForType(type),
    developmental_stage: 1,
    prediction_weight: type === "relationship" ? 120 : 50
  };
}

export function rankByUse(profile, words = []) {
  const counts = profile.wordCounts || {};
  const recents = profile.recentWords || [];
  const favorites = profile.favorites || [];
  return [...new Set(words)].filter(Boolean).sort((a, b) => {
    const score = word => {
      const obj = getWordObject(word);
      return (counts[word] || 0) * 10 +
        (favorites.includes(word) ? 120 : 0) +
        (recents.includes(word) ? 55 - recents.indexOf(word) : 0) +
        (obj.prediction_weight || 0);
    };
    return score(b) - score(a);
  });
}

export function buildLanguageBoard(profile, options = {}) {
  const sentence = profile.sentence || [];
  const activeContext = profile.activeContext || "Core Needs";
  const maxPredictions = options.maxPredictions || 12;
  const maxContext = options.maxContext || 24;

  const grammar = getGrammarPredictions(sentence);
  const connectorWords = shouldShowConnectors(sentence) ? CONNECTORS.slice(0, 10) : [];
  const contextWords = activeContext === "Core Needs" ? CORE_HOME : getTopicWords(activeContext);

  if (sentence.length === 0 && activeContext === "Core Needs") {
    return {
      predictions: rankByUse(profile, HUMAN_CONNECTION_PHRASES.concat(CORE_HOME)).slice(0, maxPredictions),
      contextWords: rankByUse(profile, CORE_HOME).slice(0, maxContext),
      topics: getNavigationTopics()
    };
  }

  return {
    predictions: rankByUse(profile, [...grammar, ...connectorWords]).slice(0, maxPredictions),
    contextWords: rankByUse(profile, contextWords).filter(w => !grammar.includes(w)).slice(0, maxContext),
    topics: getNavigationTopics()
  };
}
