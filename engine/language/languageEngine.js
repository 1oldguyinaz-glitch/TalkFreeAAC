import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";
import { getGrammarPredictions, CONNECTORS, SENTENCE_STARTERS, shouldShowConnectors } from "./coreGrammar.js";
import { getTopicWords, getNavigationTopics } from "../navigation/navigationEngine.js";

const CORE_START = ["I", "want", "need", "help", "more", "all done", "yes", "no", "please", "thank you", "potty", "water"];

export function inferGrammarType(word = "") {
  const w = String(word).toLowerCase();
  if (["i", "you", "we", "he", "she", "they", "it"].includes(w)) return "pronoun";
  if (["want", "need", "can", "will", "am", "feel", "have", "see", "like", "don't", "go", "eat", "drink", "play", "help", "stop"].includes(w)) return "verb";
  if (CONNECTORS.includes(w)) return "connector";
  if (["happy", "sad", "mad", "scared", "hurt", "sick", "tired", "calm"].includes(w)) return "feeling";
  if (["mom", "dad", "teacher", "friend", "brother", "sister"].includes(w)) return "person";
  if (["outside", "home", "school", "park", "bathroom", "bedroom"].includes(w)) return "place";
  if (["food", "drink", "water", "milk", "apple juice", "snack"].includes(w)) return "food";
  return "object";
}

export function colorForType(type) {
  const colors = { pronoun:"#1e88e5", verb:"#7ed957", connector:"#ffffff", feeling:"#ef382e", person:"#ffd400", place:"#9b57d6", food:"#ff8c00", safety:"#b00020", object:"#00a6a6" };
  return colors[type] || colors.object;
}

export function iconFor(word = "") {
  const w = String(word).toLowerCase();
  const icons = {
    "i":"👦","you":"👉","we":"👫","it":"⭐","want":"🙋","need":"🆘","can":"✅","will":"➡️","am":"🙂","feel":"❤️",
    "have":"🤲","see":"👀","like":"👍","don't":"🚫","to":"➡️","and":"➕","because":"💬","but":"↔️","so":"➡️","then":"⏭️",
    "help":"🆘","more":"➕","all done":"✅","yes":"👍","no":"👎","please":"🙏","thank you":"🙏","water":"💧","food":"🍎","drink":"🥤",
    "apple juice":"🧃","potty":"🚽","outside":"🛝","school":"🏫","home":"🏠","bathroom":"🚽","happy":"😊","sad":"😢","mad":"😠","hurt":"🤕"
  };
  return icons[w] || "🔤";
}

export function getWordObject(word) {
  const known = KNOWLEDGE_OBJECTS[word];
  if (known) return { ...known, color: known.color || colorForType(known.grammar_type), icon: known.icon || iconFor(word) };
  const type = inferGrammarType(word);
  return { id:String(word).toLowerCase().replace(/\s+/g,"_"), name:word, display_text:word, grammar_type:type, domain:"Core", icon:iconFor(word), color:colorForType(type), developmental_stage:1, prediction_weight:50 };
}

export function rankByUse(profile, words = []) {
  const counts = profile.wordCounts || {};
  const recents = profile.recentWords || [];
  const favorites = profile.favorites || [];
  return [...new Set(words)].filter(Boolean).sort((a,b) => {
    const score = word => (counts[word]||0)*10 + (favorites.includes(word)?100:0) + (recents.includes(word)?50-recents.indexOf(word):0) + (getWordObject(word).prediction_weight||0);
    return score(b) - score(a);
  });
}

export function buildLanguageBoard(profile, options = {}) {
  const sentence = profile.sentence || [];
  const activeContext = profile.activeContext || "Core Needs";
  const maxPredictions = options.maxPredictions || 12;
  const maxContext = options.maxContext || 24;

  if ((profile.justCompletedSentence || false) && sentence.length === 0) {
    return { predictions:SENTENCE_STARTERS.slice(0,12), contextWords:[], topics:getNavigationTopics() };
  }

  const grammar = getGrammarPredictions(sentence);
  const connectorWords = shouldShowConnectors(sentence) ? CONNECTORS.slice(0,10) : [];
  const contextWords = activeContext === "Core Needs" ? CORE_START : getTopicWords(activeContext);

  const predictions = rankByUse(profile, [...grammar, ...connectorWords]).slice(0, maxPredictions);
  const context = rankByUse(profile, contextWords).filter(w => !predictions.includes(w)).slice(0, maxContext);

  if (sentence.length === 0 && activeContext === "Core Needs") {
    return { predictions:CORE_START.slice(0,maxPredictions), contextWords:context.filter(w => !CORE_START.includes(w)).slice(0,maxContext), topics:getNavigationTopics() };
  }

  return { predictions, contextWords:context, topics:getNavigationTopics() };
}
