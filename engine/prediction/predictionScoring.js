export const SCORE_WEIGHTS = {
  grammar: 240,
  context: 210,
  routine: 180,
  relationship: 170,
  emotion: 160,
  frequency: 130,
  recency: 115,
  favorite: 220,
  personalization: 190,
  developmental: 90,
  safety: 260
};

export function normalizePredictionText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function uniquePredictions(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const text = typeof item === "string" ? item : item.word;
    const key = normalizePredictionText(text);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function scorePrediction({
  word,
  profile = {},
  sentence = [],
  activeContext = "Core Needs",
  reasons = {},
  baseScore = 0
}) {
  const text = typeof word === "string" ? word : word.word;
  const normalized = normalizePredictionText(text);
  const counts = profile.wordCounts || {};
  const phraseCounts = profile.phraseCounts || {};
  const recents = profile.recentWords || [];
  const recentPhrases = profile.recentPhrases || [];
  const favorites = profile.favorites || [];
  const favoritePhrases = profile.favoritePhrases || [];

  let score = Number(baseScore || 0);
  const why = [];

  function add(reason, amount) {
    if (!amount) return;
    score += amount;
    why.push(reason);
  }

  if (reasons.grammar) add("grammar", SCORE_WEIGHTS.grammar);
  if (reasons.context) add("context", SCORE_WEIGHTS.context);
  if (reasons.routine) add("routine", SCORE_WEIGHTS.routine);
  if (reasons.relationship) add("relationship", SCORE_WEIGHTS.relationship);
  if (reasons.emotion) add("emotion", SCORE_WEIGHTS.emotion);
  if (reasons.personalization) add("personalization", SCORE_WEIGHTS.personalization);
  if (reasons.safety) add("safety", SCORE_WEIGHTS.safety);
  if (reasons.developmental) add("developmental", SCORE_WEIGHTS.developmental);

  if (counts[text]) add("frequency", counts[text] * 12);
  if (phraseCounts[text]) add("phrase frequency", phraseCounts[text] * 18);
  if (favorites.includes(text)) add("favorite", SCORE_WEIGHTS.favorite);
  if (favoritePhrases.includes(text)) add("favorite phrase", SCORE_WEIGHTS.favorite + 40);

  const recentIndex = recents.indexOf(text);
  if (recentIndex >= 0) add("recent word", Math.max(10, SCORE_WEIGHTS.recency - recentIndex * 8));

  const recentPhraseIndex = recentPhrases.indexOf(text);
  if (recentPhraseIndex >= 0) add("recent phrase", Math.max(10, SCORE_WEIGHTS.recency - recentPhraseIndex * 8));

  if (activeContext && normalized.includes(normalizePredictionText(activeContext))) {
    add("context text match", 40);
  }

  if (sentence.length === 0 && ["i love you", "i want", "i need", "help me", "thank you"].includes(normalized)) {
    add("home board priority", 180);
  }

  return {
    word: text,
    score,
    reasons: why
  };
}

export function rankPredictions(candidates = [], profile = {}, sentence = [], activeContext = "Core Needs", limit = 12) {
  return uniquePredictions(candidates)
    .map(candidate => {
      if (typeof candidate === "string") {
        return scorePrediction({ word: candidate, profile, sentence, activeContext });
      }

      return scorePrediction({
        word: candidate.word,
        profile,
        sentence,
        activeContext,
        reasons: candidate.reasons || {},
        baseScore: candidate.score || candidate.baseScore || 0
      });
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.word);
}
