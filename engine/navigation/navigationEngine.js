import { LIFE_BOARDS } from "../language/communicationGenome.js";

export const NAV_TOPICS = [
  "Relationships",
  "Needs",
  "Feelings",
  "Conversation",
  "Actions",
  "Places",
  "Food & Drinks",
  "Food & Drink",
  "School",
  "Safety",
  "Bedtime",
  "Morning",
  "Doctor",
  "Restaurant",
  "Playground",
  "Emergency"
];

export function isNavigationButton(word) {
  return word === "Topics" ||
    NAV_TOPICS.includes(word) ||
    Boolean(LIFE_BOARDS?.[word]);
}

export function getNavigationTopics() {
  return NAV_TOPICS;
}

export function getTopicWords(topic) {
  if (LIFE_BOARDS?.[topic]) return LIFE_BOARDS[topic];

  const purposeBoards = {
    Connect: ["I love you", "Can I have a hug", "Thank you", "Hi", "Bye", "I'm sorry", "I miss you", "Good job", "Good morning", "Good night"],
    Relationships: ["mom", "dad", "family", "friend", "teacher", "hug", "I love you", "Thank you", "Hi", "Bye"],
    Feelings: ["happy", "sad", "mad", "scared", "excited", "tired", "sick", "hurt", "break", "help"],
    Feel: ["I am happy", "I am sad", "I am mad", "I am scared", "I am excited", "I am tired", "I feel sick", "I need a break"],
    Needs: ["I want", "I need", "Help me", "More", "All done", "Bathroom", "Water", "Food", "Stop"],
    Need: ["I want", "I need", "Help me", "More", "All done", "Bathroom", "Water", "Food", "Stop"],
    Conversation: ["Why", "Really", "Tell me more", "I have a question", "That's funny", "I don't know", "Maybe"],
    Talk: ["Why", "Really", "Tell me more", "I have a question", "That's funny", "I don't know", "Maybe"],
    Play: ["Let's play", "Outside", "Music", "Toys", "My turn", "Your turn", "Again"],
    "Daily Life": ["Home", "School", "Bathroom", "Eat", "Drink", "Get dressed", "Go outside", "Bedtime"],
    "Food & Drink": ["food", "drink", "water", "snack", "more", "all done", "hungry", "thirsty"],
    "Food & Drinks": ["food", "drink", "water", "snack", "more", "all done", "hungry", "thirsty"],
    School: ["teacher", "friend", "class", "work", "help", "question", "done", "break"],
    Doctor: ["hurt", "pain", "sick", "medicine", "doctor", "help", "stop", "scared"],
    Emergency: ["Help me", "I am hurt", "I am scared", "Stop", "Call mom", "Call dad", "I am lost", "I feel sick"]
  };

  return purposeBoards[topic] || [];
}
