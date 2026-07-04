export const COMMUNICATION_PURPOSES = {
  NEED: "need",
  RELATIONSHIP: "relationship",
  EMOTION: "emotion",
  CONVERSATION: "conversation",
  PLAY: "play",
  LEARNING: "learning",
  SAFETY: "safety",
  DAILY_LIFE: "daily_life"
};

export const HUMAN_FIRST_PHRASES = [
  {
    id: "phrase_i_love_you",
    phrase: "I love you",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 1000,
    aliases: ["love you", "i love", "love", "family love"],
    related: ["hug", "kiss", "mom", "dad", "grandma", "grandpa"]
  },
  {
    id: "phrase_hug",
    phrase: "Can I have a hug",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 940,
    aliases: ["hug", "hold me", "comfort"],
    related: ["I love you", "I'm sad", "I need help"]
  },
  {
    id: "phrase_thank_you",
    phrase: "Thank you",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 900,
    aliases: ["thanks", "thank", "appreciate"],
    related: ["You're welcome", "Good job"]
  },
  {
    id: "phrase_good_morning",
    phrase: "Good morning",
    purpose: COMMUNICATION_PURPOSES.CONVERSATION,
    priority: 850,
    aliases: ["morning", "hello morning"],
    related: ["Hi", "I love you"]
  },
  {
    id: "phrase_good_night",
    phrase: "Good night",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 850,
    aliases: ["night", "bedtime"],
    related: ["I love you", "hug", "I'm tired"]
  },
  {
    id: "phrase_im_sorry",
    phrase: "I'm sorry",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 820,
    aliases: ["sorry", "apologize"],
    related: ["I love you", "hug"]
  },
  {
    id: "phrase_i_miss_you",
    phrase: "I miss you",
    purpose: COMMUNICATION_PURPOSES.RELATIONSHIP,
    priority: 820,
    aliases: ["miss you", "miss"],
    related: ["I love you", "mom", "dad"]
  },
  {
    id: "phrase_tell_me_more",
    phrase: "Tell me more",
    purpose: COMMUNICATION_PURPOSES.CONVERSATION,
    priority: 780,
    aliases: ["more story", "keep talking", "what happened"],
    related: ["Why", "Really", "That's funny"]
  }
];

export const LIFE_BOARDS = {
  Bedtime: [
    "Good night", "I love you", "Can I have a hug", "Story please", "I'm tired",
    "One more", "Water please", "Light off", "I'm scared", "Stay with me"
  ],
  Morning: [
    "Good morning", "I love you", "I'm hungry", "I'm thirsty", "Bathroom please",
    "Get dressed", "School today", "I need help", "I'm tired", "I'm excited"
  ],
  School: [
    "I have a question", "I need help", "My turn", "I know the answer", "Bathroom please",
    "I don't understand", "Can I play", "I'm done", "Again please", "Tell me more"
  ],
  Doctor: [
    "It hurts", "I'm scared", "Please stop", "I don't understand", "Can you explain",
    "I need a break", "Mom please", "Dad please", "All done", "Help me"
  ],
  Restaurant: [
    "I'm hungry", "I'm thirsty", "More please", "I'm full", "I don't like it",
    "Thank you", "Water please", "Bathroom please", "That is yummy", "All done"
  ],
  Playground: [
    "Let's play", "My turn", "Your turn", "Again", "Stop", "Help me",
    "I want swing", "I want slide", "I am happy", "I need a break"
  ],
  Emergency: [
    "Help me", "I am hurt", "I am scared", "Stop", "Call mom",
    "Call dad", "I am lost", "I feel sick", "It hurts here", "I need help"
  ]
};

export function normalizeText(value = "") {
  return String(value).toLowerCase().replace(/[^\w\s']/g, "").replace(/\s+/g, " ").trim();
}

export function phraseToWords(phrase = "") {
  return String(phrase).split(" ").filter(Boolean);
}

export function getHumanPhraseByText(text) {
  const normalized = normalizeText(text);
  return HUMAN_FIRST_PHRASES.find(item =>
    normalizeText(item.phrase) === normalized ||
    (item.aliases || []).some(alias => normalizeText(alias) === normalized)
  );
}
