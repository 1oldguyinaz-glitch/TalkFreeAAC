import { GENOME, CONTEXT_BOARDS } from "../genome/genome.js";

export const NAV_TOPICS = [
  "Food & Drinks", "Bathroom", "People", "Places", "School Curriculum",
  "Daily Living", "Outside", "Play", "Feelings", "Health & Body",
  "Animals", "Transportation", "Clothing", "Safety", "Time"
];

export function isNavigationButton(word) {
  return word === "Topics" || NAV_TOPICS.includes(word) || Boolean(GENOME.domains?.[word]) || Boolean(CONTEXT_BOARDS?.[word]);
}

export function getNavigationTopics() {
  return NAV_TOPICS.filter(topic => GENOME.domains?.[topic] || CONTEXT_BOARDS?.[topic]);
}

export function getTopicWords(topic) {
  if (CONTEXT_BOARDS?.[topic]) return CONTEXT_BOARDS[topic];
  if (GENOME.domains?.[topic]) return GENOME.domains[topic];
  return [];
}
