import { GENOME, KNOWLEDGE_OBJECTS, CONTEXT_BOARDS } from "../genome/genome.js";

export const TOPIC_ORDER = [
  "Food & Drinks", "School Curriculum", "Daily Living", "Outside", "Play",
  "People", "Feelings", "Health & Body", "Bathroom", "Clothing",
  "Transportation", "Animals", "Colors & Shapes", "Letters & Numbers",
  "Questions", "Conversation", "Safety", "Time", "Technology", "Weather",
  "Community", "Sports", "Music & Entertainment", "Holidays", "Nature", "Home"
];

export const CORE_NEEDS = [
  "I", "want", "need", "help", "more", "all done", "yes", "no", "please",
  "thank you", "I love you", "stop", "potty", "water", "food", "drink",
  "hurt", "break", "again", "wait", "open", "close", "up", "down", "on",
  "off", "hot", "cold", "too loud", "quiet"
];

export const SENTENCE_STARTERS = [
  "I want", "I need", "I feel", "I am", "Can I", "Where is", "What is",
  "Who is", "Help me", "More please", "No thank you", "Yes please",
  "I love you", "I am done", "I need a break", "I want to go",
  "I want to play", "I want to eat", "I want to drink", "I don't want",
  "I don't like", "I like", "I see", "I hear", "I have", "I lost", "I found"
];

export function getTopicButtons() {
  return TOPIC_ORDER.filter(topic => GENOME.domains?.[topic] || CONTEXT_BOARDS?.[topic]);
}

export function getWordsForTopic(topic) {
  if (topic === "Core Needs") return CORE_NEEDS;
  if (topic === "Topics") return getTopicButtons();
  if (topic === "Sentence Starters") return SENTENCE_STARTERS;
  if (CONTEXT_BOARDS?.[topic]) return CONTEXT_BOARDS[topic];
  if (GENOME.domains?.[topic]) return GENOME.domains[topic];
  return [];
}

export function inferType(word = "") {
  const w = String(word).toLowerCase();
  if (["i", "you", "we", "he", "she", "they", "me"].includes(w)) return "pronoun";
  if (["go", "jump", "eat", "drink", "play", "see", "sleep", "stop", "open", "close", "want", "need"].includes(w)) return "verb";
  if (["happy", "sad", "mad", "scared", "hurt", "calm", "frustrated"].includes(w)) return "feeling";
  if (["mom", "dad", "sister", "brother", "teacher", "friend"].includes(w)) return "person";
  if (["home", "school", "outside", "park", "bathroom", "bedroom"].includes(w)) return "place";
  if (["food", "drink", "drinks", "water", "milk", "apple juice", "snacks", "cookie"].includes(w)) return "food";
  if (["what", "where", "who", "why", "when", "how"].includes(w)) return "question";
  return "object";
}

export function fallbackIcon(word = "") {
  const w = String(word).toLowerCase();
  const icons = {
    "i": "👦", "you": "👧", "we": "👫", "he": "👦", "she": "👧",
    "love": "❤️", "like": "🙂", "don't know": "🤔",
    "go": "🏃", "jump": "🙌", "eat": "🍽️", "drink": "🥤", "play": "⚽",
    "see": "👀", "sleep": "😴", "stop": "✋",
    "food": "🍎", "drinks": "🥛", "snacks": "🍪", "potty": "🚽",
    "toys": "🚚", "home": "🏠", "school": "🏫", "outside": "🛝",
    "mom": "👩", "dad": "👨", "sister": "👧", "brother": "👦",
    "teacher": "👩‍🏫", "happy": "😊", "sad": "😢", "mad": "😠",
    "help": "🆘", "more": "➕", "all done": "✅", "yes": "👍",
    "no": "👎", "please": "🙏", "thank you": "🙏", "water": "💧",
    "apple juice": "🧃", "milk": "🥛", "bed": "🛏️", "bathroom": "🚽",
    "topics": "📖", "school curriculum": "📚", "daily living": "🧼",
    "feelings": "😊", "health & body": "🩺"
  };
  return icons[w] || "🔤";
}

export function getObjectForWord(word) {
  return KNOWLEDGE_OBJECTS[word] || {
    id: String(word || "").toLowerCase().replace(/\s+/g, "_"),
    name: word,
    display_text: word,
    domain: "Custom",
    category: "Custom",
    grammar_type: inferType(word),
    icon: fallbackIcon(word),
    color: "#00A6A6",
    developmental_stage: 1,
    prediction_weight: 50
  };
}

export function sortWordsForAAC(words = []) {
  const priority = { pronoun: 1, verb: 2, food: 3, place: 4, person: 5, feeling: 6, question: 7, social: 8, safety: 9, learning: 10, object: 11 };
  return [...new Set(words)].filter(Boolean).sort((a, b) => {
    const ao = getObjectForWord(a);
    const bo = getObjectForWord(b);
    const ap = priority[ao.grammar_type] || 99;
    const bp = priority[bo.grammar_type] || 99;
    if (ap !== bp) return ap - bp;
    return String(a).localeCompare(String(b));
  });
}

export function getAACBoard(profile, limit = 35) {
  const active = profile.activeContext || "Core Needs";
  if (active === "Topics") return getTopicButtons().slice(0, limit);
  return sortWordsForAAC(getWordsForTopic(active)).slice(0, limit);
}
