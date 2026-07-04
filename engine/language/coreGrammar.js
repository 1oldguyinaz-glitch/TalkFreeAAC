export const CONNECTORS = [
  "and", "because", "but", "or", "so", "then", "if", "when",
  "before", "after", "to", "for", "with", "without", "of", "from",
  "in", "on", "under", "over", "into", "onto"
];

export const SENTENCE_STARTERS = [
  "I", "I want", "I need", "I feel", "I am", "Can I", "Where is",
  "What is", "Who is", "Help me", "More please", "No thank you",
  "Yes please", "I love you", "I am done", "I need a break"
];

export const GRAMMAR_NEXT = {
  "": ["I", "you", "we", "help", "more", "all done", "yes", "no"],
  "I": ["want", "need", "can", "will", "am", "feel", "have", "see", "like", "don't"],
  "you": ["want", "need", "can", "will", "are", "have", "see"],
  "we": ["can", "will", "go", "play", "need", "have"],
  "I want": ["to", "more", "food", "drink", "water", "apple juice", "help", "outside"],
  "I need": ["help", "water", "potty", "a break", "mom", "dad", "medicine"],
  "I can": ["go", "play", "eat", "drink", "help", "see", "do"],
  "I will": ["go", "try", "wait", "help", "play", "eat"],
  "I am": ["happy", "sad", "mad", "scared", "hurt", "sick", "tired"],
  "I feel": ["happy", "sad", "mad", "scared", "hurt", "sick", "calm"],
  "I have": ["pain", "toy", "food", "drink", "question", "idea"],
  "I see": ["mom", "dad", "teacher", "dog", "car", "outside"],
  "I like": ["it", "this", "that", "food", "music", "outside"],
  "I don't": ["want", "like", "know", "feel good", "need that"],
  "I want to": ["go", "eat", "drink", "play", "sleep", "watch", "read"],
  "I want to go": ["outside", "home", "school", "park", "bathroom", "bedroom"],
  "I want to eat": ["food", "snack", "breakfast", "lunch", "dinner"],
  "I want to drink": ["water", "milk", "apple juice", "orange juice"],
  "Can I": ["go", "have", "play", "watch", "eat", "drink", "help"],
  "Can I go": ["outside", "home", "school", "bathroom", "park"],
  "Where is": ["mom", "dad", "teacher", "bathroom", "my toy", "my cup"],
  "What is": ["that", "this", "it", "wrong"],
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

  return [];
}

export function shouldShowConnectors(sentence = []) {
  return sentence.length >= 2;
}
