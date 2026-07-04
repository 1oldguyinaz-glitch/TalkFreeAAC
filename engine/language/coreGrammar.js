export const CONNECTORS = [
  "and", "because", "but", "or", "so", "then", "if", "when",
  "before", "after", "to", "for", "with", "without", "of", "from",
  "in", "on", "under", "over", "into", "onto"
];

export const SENTENCE_STARTERS = [
  "I am", "I want", "I need", "I can", "I can't",
  "I feel", "I like", "I don't", "Can I", "Help me"
];

export const HUMAN_CONNECTION_PHRASES = [
  "I love you", "Can I have a hug", "Thank you", "Hi", "Bye",
  "I'm sorry", "I miss you", "Good job", "Good morning", "Good night"
];

export const GRAMMAR_NEXT = {
  "": ["I love you", "I want", "I need", "I am", "I can", "Help me", "Thank you", "Hi"],
  "I": ["want", "need", "can", "will", "am", "feel", "like", "don't", "love"],
  "I love": ["you", "mom", "dad", "grandma", "grandpa", "my family"],
  "I want": ["to", "more", "food", "drink", "water", "apple juice", "help", "outside", "hug"],
  "I need": ["help", "water", "potty", "a break", "mom", "dad", "medicine", "hug"],
  "I can": ["go", "play", "eat", "drink", "help", "see", "do"],
  "I can't": ["do it", "find it", "hear", "see", "stop", "wait"],
  "I am": ["happy", "sad", "mad", "scared", "hurt", "sick", "tired", "excited"],
  "I feel": ["happy", "sad", "mad", "scared", "hurt", "sick", "calm", "frustrated"],
  "I like": ["it", "this", "that", "you", "music", "outside", "playing"],
  "I don't": ["want", "like", "know", "understand", "feel good", "need that"],
  "I want to": ["go", "eat", "drink", "play", "sleep", "watch", "read"],
  "I want to go": ["outside", "home", "school", "park", "bathroom", "bedroom"],
  "Can I": ["go", "have", "play", "watch", "eat", "drink", "help"],
  "Can I go": ["outside", "home", "school", "bathroom", "park"],
  "Help me": ["please", "open", "close", "go", "stop", "find"]
};

export function normalizePhrase(sentence = []) {
  return Array.isArray(sentence) ? sentence.join(" ").trim() : String(sentence || "").trim();
}

export function getGrammarPredictions(sentence = []) {
  const phrase = normalizePhrase(sentence);
  if (GRAMMAR_NEXT[phrase]) return GRAMMAR_NEXT[phrase];

  const last = sentence[sentence.length - 1] || "";
  if (["and", "because", "but", "so", "then"].includes(last)) return ["I", "you", "we", "it", "mom", "dad"];
  if (last === "to") return ["go", "eat", "drink", "play", "sleep", "watch", "read"];
  if (["want", "need", "like", "have"].includes(last)) return ["to", "more", "help", "food", "drink", "outside"];
  if (sentence.length >= 2) return CONNECTORS.slice(0, 8);
  return [];
}

export function shouldShowConnectors(sentence = []) {
  return sentence.length >= 2;
}
