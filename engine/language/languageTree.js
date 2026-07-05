export const TREE_VERSION = "5.10";

export const FIXED_CORE_LANGUAGE = [
  "I", "want", "need", "feel", "am", "can",
  "don't", "like", "love", "have", "see", "hear",
  "think", "go", "stop", "help", "get", "do"
];

export const HOME_BRANCH = [
  "more", "help", "food", "drink", "water", "snack", "outside", "inside", "break",
  "and", "because", "but", "to", "with", "then", "when", "if", "so",
  "yes", "no", "finished", "please", "thank you", "mom", "dad", "you", "me"
];

export const BRANCHES = {
  "i": [
    "want", "need", "feel", "am", "can", "don't", "like", "love", "have",
    "see", "hear", "think", "go", "stop", "help", "get", "do", "more",
    "mom", "dad", "you", "me", "please", "yes", "no", "finished"
  ],

  "i want": [
    "to", "more", "help", "food", "drink", "water", "outside", "play", "break",
    "a hug", "mom", "dad", "snack", "bathroom", "tablet", "toy", "music", "turn",
    "please", "because", "with", "and", "then", "after", "yes", "no", "finished"
  ],

  "i want to": [
    "go", "play", "eat", "drink", "see", "watch", "read", "sit", "stand",
    "stop", "try", "talk", "help", "get", "do", "listen", "wait", "open",
    "outside", "inside", "home", "school", "bathroom", "mom", "dad", "please", "finished"
  ],

  "i need": [
    "help", "a break", "bathroom", "water", "food", "quiet", "space", "medicine", "mom",
    "dad", "teacher", "doctor", "inside", "outside", "stop", "safe", "please", "now",
    "because", "and", "with", "then", "yes", "no", "finished", "hurt", "scared"
  ],

  "i feel": [
    "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "excited", "proud",
    "lonely", "safe", "frustrated", "okay", "hungry", "thirsty", "nervous", "calm", "upset",
    "because", "and", "but", "with", "please", "hug", "mom", "dad", "help"
  ],

  "i am": [
    "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "ready", "not ready",
    "okay", "safe", "hungry", "thirsty", "cold", "hot", "done", "finished", "waiting",
    "because", "and", "but", "with", "please", "mom", "dad", "help", "hug"
  ],

  "i am sad": [
    "because", "tired", "sick", "hurt", "scared", "lonely", "frustrated", "not ready", "okay",
    "safe", "with", "mom", "dad", "teacher", "please", "hug", "help", "I need help",
    "I need a break", "Can I have a hug", "I miss you", "thank you", "yes", "no", "finished", "outside", "inside"
  ],

  "i am scared": [
    "because", "help", "mom", "dad", "teacher", "safe", "stop", "hurt", "outside",
    "inside", "bathroom", "doctor", "medicine", "please", "hug", "stay", "quiet", "space",
    "I need help", "I need a break", "Can I have a hug", "yes", "no", "finished", "with", "and", "but"
  ],

  "i can": [
    "go", "play", "eat", "drink", "help", "try", "do", "see", "hear",
    "read", "watch", "sit", "stand", "stop", "listen", "wait", "get", "have",
    "with", "to", "and", "then", "please", "yes", "no", "finished", "more"
  ],

  "i don't": [
    "want", "like", "need", "feel", "know", "understand", "want to", "like it", "feel good",
    "want that", "want this", "need help", "because", "but", "please", "stop", "finished", "more",
    "yes", "no", "mom", "dad", "teacher", "outside", "inside", "break", "safe"
  ],

  "i like": [
    "this", "that", "you", "mom", "dad", "food", "drink", "water", "snack",
    "music", "toy", "tablet", "outside", "inside", "school", "play", "reading", "watching",
    "because", "and", "with", "more", "please", "yes", "no", "finished", "thank you"
  ],

  "i love": [
    "you", "mom", "dad", "my family", "hug", "this", "that", "more", "because",
    "and", "thank you", "I miss you", "Can I have a hug", "yes", "no", "finished", "please", "me",
    "good morning", "good night", "good job", "happy", "safe", "with", "home", "family", "friend"
  ],

  "can i": [
    "have", "go", "play", "eat", "drink", "see", "watch", "read", "sit",
    "stand", "help", "get", "more", "outside", "inside", "bathroom", "a hug", "a break",
    "please", "with", "mom", "dad", "teacher", "yes", "no", "finished", "thank you"
  ],

  "help me": [
    "please", "now", "I am hurt", "I am scared", "I need a break", "I need bathroom", "I need water", "I need mom", "I need dad",
    "stop", "safe", "doctor", "medicine", "outside", "inside", "with", "because", "yes",
    "no", "finished", "thank you", "more", "hurt", "scared", "sad", "tired", "sick"
  ],

  "go": [
    "outside", "inside", "home", "school", "bathroom", "park", "car", "room", "table",
    "to", "with", "from", "after", "then", "now", "later", "please", "stop",
    "mom", "dad", "teacher", "friend", "yes", "no", "finished", "help", "more"
  ],

  "stop": [
    "please", "that", "this", "now", "because", "I am scared", "I am hurt", "I need help", "too loud",
    "too much", "wait", "finished", "no", "yes", "mom", "dad", "teacher", "safe", "break",
    "quiet", "space", "inside", "outside", "help", "thank you", "with", "but"
  ],

  "help": [
    "me", "please", "now", "with", "food", "drink", "water", "bathroom", "outside",
    "inside", "school", "tablet", "toy", "I am hurt", "I am scared", "mom", "dad", "teacher",
    "because", "and", "then", "yes", "no", "finished", "thank you", "more", "break"
  ]
};

export function normalizeTreeKey(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sentenceToText(sentence = []) {
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

function bestKeyForPhrase(phrase = "") {
  const clean = normalizeTreeKey(phrase);
  if (!clean) return "";

  const keys = Object.keys(BRANCHES).sort((a, b) => b.length - a.length);
  return keys.find(key => clean === key || clean.endsWith(` ${key}`) || clean.includes(` ${key} `)) || "";
}

export function getActiveTreeBranch(sentence = []) {
  const phrase = sentenceToText(sentence);
  const key = bestKeyForPhrase(phrase);
  return key ? BRANCHES[key] : HOME_BRANCH;
}

export function getFixedCoreLanguage() {
  return [...FIXED_CORE_LANGUAGE];
}

export function getDynamicBranch(sentence = []) {
  return [...getActiveTreeBranch(sentence)];
}

export function uniqueWords(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = normalizeTreeKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
