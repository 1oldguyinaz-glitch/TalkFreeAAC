import { GENOME, CONTEXT_BOARDS } from "../genome/genome.js";
import { LIFE_BOARDS } from "../language/communicationGenome.js";
import { COMMUNICATION_GENOME, getEntriesByTopic, getEntryDisplay } from "../genome/communicationGenomeLoader.js";

export const NAV_TOPICS = [
  "Relationships",
  "Needs",
  "Feelings",
  "Conversation",
  "Actions",
  "Places",
  "Food & Drinks",
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
    (COMMUNICATION_GENOME.topics || []).includes(word) ||
    Boolean(GENOME.domains?.[word]) ||
    Boolean(CONTEXT_BOARDS?.[word]) ||
    Boolean(LIFE_BOARDS?.[word]);
}

export function getNavigationTopics() {
  return NAV_TOPICS;
}

export function getTopicWords(topic) {
  const genomeWords = getEntriesByTopic(topic).map(getEntryDisplay);
  if (genomeWords.length) return genomeWords;
  if (LIFE_BOARDS?.[topic]) return LIFE_BOARDS[topic];
  if (CONTEXT_BOARDS?.[topic]) return CONTEXT_BOARDS[topic];
  if (GENOME.domains?.[topic]) return GENOME.domains[topic];

  const purposeBoards = {
    Connect: ["I love you", "Can I have a hug", "Thank you", "Hi", "Bye", "I'm sorry", "I miss you", "Good job", "Good morning", "Good night"],
    Feel: ["I am happy", "I am sad", "I am mad", "I am scared", "I am excited", "I am tired", "I feel sick", "I need a break"],
    Need: ["I want", "I need", "Help me", "More", "All done", "Potty", "Water", "Food", "Stop"],
    Talk: ["Why", "Really", "Tell me more", "I have a question", "That's funny", "I don't know", "Maybe"],
    Play: ["Let's play", "Outside", "Music", "Toys", "My turn", "Your turn", "Again"],
    "Daily Life": ["Home", "School", "Bathroom", "Eat", "Drink", "Get dressed", "Go outside", "Bedtime"],
    Emergency: ["Help me", "I am hurt", "I am scared", "Stop", "Call mom", "Call dad", "I am lost", "I feel sick"]
  };

  return purposeBoards[topic] || [];
}
