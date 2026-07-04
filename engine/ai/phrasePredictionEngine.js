import { currentPhrase } from "../prediction/predictionEngine.js";

const PHRASE_TEMPLATES = [
  { startsWith: "I want", completions: ["please", "more", "again", "all done", "because"] },
  { startsWith: "I need", completions: ["help", "a break", "water", "potty", "mom", "dad"] },
  { startsWith: "I feel", completions: ["happy", "sad", "mad", "scared", "hurt", "sick"] },
  { startsWith: "Can I", completions: ["go outside", "play", "watch", "have more", "take a break"] },
  { startsWith: "Where is", completions: ["mom", "dad", "bathroom", "my toy", "teacher"] }
];

export function predictPhrases(profile, limit = 8) {
  const phrase = currentPhrase(profile.sentence || []);
  const history = profile.sentenceHistory || [];
  const recentMatches = history
    .map(item => item.sentence || "")
    .filter(s => phrase && s.toLowerCase().startsWith(phrase.toLowerCase()) && s !== phrase);

  const template = PHRASE_TEMPLATES.find(t => phrase.startsWith(t.startsWith));
  const templatePredictions = template ? template.completions.map(c => `${phrase} ${c}`.trim()) : [];

  return [...new Set([...recentMatches, ...templatePredictions])].slice(0, limit);
}

export function predictNextThought(profile, limit = 8) {
  const timeline = profile.timeline || [];
  const last = timeline[timeline.length - 1]?.text || "";
  const suggestions = [];

  if (/drink|water|juice|thirsty/i.test(last)) suggestions.push("I want more", "all done", "thank you");
  if (/potty|bathroom/i.test(last)) suggestions.push("all done", "wash hands", "help please");
  if (/hurt|scared|help/i.test(last)) suggestions.push("I need help", "call mom", "I am okay");
  if (/play|outside|park/i.test(last)) suggestions.push("I want to play", "my turn", "again");

  return [...new Set(suggestions)].slice(0, limit);
}
