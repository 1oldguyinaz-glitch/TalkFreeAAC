import {
  getCommunicationEntries,
  getEntriesByTopic,
  findCommunicationEntry
} from "../genome/communicationGenomeLoader.js";

export const HUMAN_FIRST_PHRASES = [
  "I love you",
  "Can I have a hug",
  "Thank you",
  "Hi",
  "Bye",
  "I'm sorry",
  "I miss you",
  "Good job",
  "Good morning",
  "Good night"
];

export const SENTENCE_STARTERS = [
  "I am",
  "I want",
  "I need",
  "I can",
  "I can't",
  "I feel",
  "I like",
  "I don't",
  "Can I",
  "Help me"
];

export const CORE_TOPICS = [
  "Core Needs",
  "Relationships",
  "Feelings",
  "Conversation",
  "Food & Drinks",
  "Places",
  "School",
  "Safety",
  "Actions",
  "Search",
  "Recents",
  "Favorites",
  "Emergency"
];

export const CORE_WORDS = [
  "I", "you", "want", "need", "help", "more", "stop", "go", "yes", "no",
  "please", "thank you", "love", "hug", "sad", "happy", "mad", "scared",
  "because", "and", "but", "to", "with", "without", "now", "later"
];

export function normalizeText(value = "") {
  return String(value).toLowerCase().replace(/[^\w\s']/g, "").replace(/\s+/g, " ").trim();
}

export function getWordObject(word = "") {
  const entry = findCommunicationEntry(word);

  if (entry) {
    return {
      name: entry.display || entry.word || word,
      display_text: entry.display || entry.word || word,
      grammar_type: entry.grammar || entry.grammar_type || "word",
      communication_purpose: entry.purpose || entry.communication_purpose || "communication",
      topic: entry.topic || "Core Needs",
      aliases: entry.aliases || [],
      relatedWords: entry.relatedWords || [],
      relatedPhrases: entry.relatedPhrases || [],
      icon: entry.icon || "💬",
      cartoon: entry.cartoon,
      color: entry.color || "#1688ff",
      predictionWeight: entry.predictionWeight || 1
    };
  }

  const lower = normalizeText(word);
  const phrase = String(word).includes(" ");

  const type =
    ["i", "you", "me", "my", "mine", "we", "they"].includes(lower) ? "pronoun" :
    ["want", "need", "go", "stop", "help", "like", "love", "feel", "eat", "drink"].includes(lower) ? "verb" :
    ["sad", "happy", "mad", "scared", "tired", "hurt", "sick"].includes(lower) ? "feeling" :
    phrase ? "phrase" :
    "word";

  const purpose =
    /love|hug|thank|sorry|miss|good morning|good night|hi|bye/.test(lower) ? "relationship" :
    /sad|happy|mad|scared|hurt|sick|tired|feel/.test(lower) ? "emotion" :
    /help|stop|hurt|scared|emergency/.test(lower) ? "safety" :
    "communication";

  const color =
    purpose === "relationship" ? "#ff4fa3" :
    purpose === "emotion" ? "#ef4444" :
    purpose === "safety" ? "#dc2626" :
    type === "verb" ? "#22c55e" :
    type === "pronoun" ? "#1688ff" :
    "#1688ff";

  return {
    name: word,
    display_text: word,
    grammar_type: type,
    communication_purpose: purpose,
    topic: "Core Needs",
    aliases: [],
    relatedWords: [],
    relatedPhrases: [],
    icon: purpose === "relationship" ? "❤️" : purpose === "emotion" ? "😊" : purpose === "safety" ? "🚨" : "💬",
    color,
    predictionWeight: 1
  };
}

function getTopicList() {
  const entries = getCommunicationEntries();
  const topics = entries.map(entry => entry.topic).filter(Boolean);
  return Array.from(new Set([...CORE_TOPICS, ...topics]));
}

function wordsForTopic(topic = "Core Needs") {
  if (topic === "Core Needs") return [...HUMAN_FIRST_PHRASES, ...CORE_WORDS];
  if (topic === "Relationships") return [...HUMAN_FIRST_PHRASES, ...getEntriesByTopic("Relationships").map(e => e.display || e.word)];
  if (topic === "Feelings") return getEntriesByTopic("Feelings").map(e => e.display || e.word);
  if (topic === "Conversation") return getEntriesByTopic("Conversation").map(e => e.display || e.word);
  if (topic === "Food & Drinks") return getEntriesByTopic("Food & Drinks").map(e => e.display || e.word);
  if (topic === "Places") return getEntriesByTopic("Places").map(e => e.display || e.word);
  if (topic === "School") return getEntriesByTopic("School").map(e => e.display || e.word);
  if (topic === "Safety") return getEntriesByTopic("Safety").map(e => e.display || e.word);
  if (topic === "Actions") return getEntriesByTopic("Actions").map(e => e.display || e.word);

  return getEntriesByTopic(topic).map(e => e.display || e.word);
}

function grammarPredictions(sentence = []) {
  const phrase = sentence.join(" ").toLowerCase();

  if (!sentence.length) {
    return ["I love you", "I want", "I need", "I feel", "Can I have a hug", "Help me", "Hi", "Thank you", "Good morning", "Good night"];
  }

  if (phrase === "i") return ["want", "need", "can", "am", "feel", "like", "love", "don't", "have", "see"];
  if (phrase === "i want") return ["to", "more", "please", "help", "food", "drink", "outside", "hug", "a break"];
  if (phrase === "i need") return ["help", "a break", "bathroom", "water", "food", "you", "medicine", "space"];
  if (phrase === "i feel" || phrase === "i am") return ["happy", "sad", "mad", "scared", "tired", "sick", "hurt", "frustrated"];
  if (phrase === "can i") return ["have", "go", "play", "help", "take a break", "tell you something"];
  if (phrase.endsWith("because")) return ["I am sad", "it hurts", "I miss you", "I don't know", "I need help", "I'm tired"];

  return ["and", "because", "but", "please", "thank you", "more", "help", "finished"];
}

export function buildLanguageBoard(profile = {}) {
  const activeContext = profile.activeContext || "Core Needs";
  const sentence = profile.sentence || [];
  const topicWords = wordsForTopic(activeContext);
  const predictions = grammarPredictions(sentence);

  return {
    predictions,
    contextWords: topicWords,
    topics: getTopicList()
  };
}
