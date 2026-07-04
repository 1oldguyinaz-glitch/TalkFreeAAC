import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";

export function adaptiveVocabularyRank(profile, words = []) {
  const wordCounts = profile.wordCounts || {};
  const recentWords = profile.recentWords || [];
  const favorites = profile.favorites || [];

  return [...words]
    .map(word => {
      const obj = KNOWLEDGE_OBJECTS[word] || {};
      let score = obj.prediction_weight || 50;
      score += (wordCounts[word] || 0) * 5;
      if (recentWords.includes(word)) score += 25 - recentWords.indexOf(word);
      if (favorites.includes(word)) score += 50;
      if (profile.activeContext && obj.domain === profile.activeContext) score += 35;
      return { word, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(x => x.word);
}

export function suggestVocabularyGrowth(profile, limit = 12) {
  const used = new Set(Object.keys(profile.wordCounts || {}));
  const activeContext = profile.activeContext || "Core Needs";

  return Object.values(KNOWLEDGE_OBJECTS)
    .filter(obj => !used.has(obj.name))
    .filter(obj => obj.domain === activeContext || obj.developmental_stage <= 2)
    .map(obj => ({
      word: obj.name,
      domain: obj.domain,
      reason: obj.domain === activeContext ? "Matches current context" : "Useful early vocabulary",
      score: (obj.prediction_weight || 50) + (obj.domain === activeContext ? 40 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function dynamicFavorites(profile, limit = 16) {
  const wordCounts = profile.wordCounts || {};
  const manual = profile.favorites || [];
  const automatic = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  return [...new Set([...manual, ...automatic])].slice(0, limit);
}
