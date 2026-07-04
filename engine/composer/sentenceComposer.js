import { currentPhrase } from "../prediction/predictionEngine.js";

const COMPLETION_SUGGESTIONS = {
  "I want": ["please", "more", "again", "all done"],
  "I need": ["help", "please", "break", "mom", "dad"],
  "I feel": ["happy", "sad", "mad", "hurt", "scared"],
  "I am": ["happy", "sad", "mad", "hurt", "sick"],
  "Can I": ["go outside", "play", "watch", "have more"],
  "Where is": ["mom", "dad", "bathroom", "my toy"],
  "Help me": ["please", "mom", "dad", "teacher"]
};

export function analyzeSentence(sentence = []) {
  const phrase = currentPhrase(sentence);
  const words = phrase.split(/\s+/).filter(Boolean);

  let intent = "statement";
  if (/^(I want|Can I|More please)/i.test(phrase)) intent = "request";
  if (/^(I need help|help|stop|I am hurt|I am scared)/i.test(phrase)) intent = "urgent";
  if (/^(I feel|I am)/i.test(phrase)) intent = "emotion";
  if (/^(Where|What|Who|Why|When|How)/i.test(phrase)) intent = "question";

  return {
    phrase,
    wordCount: words.length,
    intent,
    isComplete: words.length >= 3 || /^(yes|no|help|stop|I love you|all done|more please)$/i.test(phrase)
  };
}

export function getCompletionSuggestions(sentence = []) {
  const phrase = currentPhrase(sentence);
  const starters = Object.keys(COMPLETION_SUGGESTIONS);
  const match = starters.find(s => phrase.startsWith(s));
  return match ? COMPLETION_SUGGESTIONS[match] : ["please", "more", "again", "all done", "help"];
}

export function buildSentenceRecord(profile) {
  const analysis = analyzeSentence(profile.sentence || []);
  return {
    ...analysis,
    context: profile.activeContext || "Core Needs",
    time: new Date().toISOString(),
    tags: classifySentence(analysis.phrase, profile.activeContext)
  };
}

export function classifySentence(phrase, context = "") {
  const tags = new Set();
  if (/water|juice|milk|eat|food|hungry|thirsty/i.test(phrase)) tags.add("Food/Drink");
  if (/potty|bathroom|pee|poop|wash/i.test(phrase)) tags.add("Bathroom");
  if (/help|hurt|stop|scared|emergency/i.test(phrase)) tags.add("Safety");
  if (/happy|sad|mad|feel|hurt|scared|calm/i.test(phrase)) tags.add("Emotion");
  if (/school|read|write|math|letter|number/i.test(phrase)) tags.add("School");
  if (context) tags.add(context);
  return [...tags];
}
