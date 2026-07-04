import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";
import { teamSummary } from "../team/teamWorkspace.js";

export function buildInsightSummary(profile) {
  const wordCounts = profile.wordCounts || {};
  const totalTaps = Object.values(wordCounts).reduce((a, b) => a + b, 0);
  const byDomain = {};

  for (const [word, count] of Object.entries(wordCounts)) {
    const domain = KNOWLEDGE_OBJECTS[word]?.domain || "Unknown";
    byDomain[domain] = (byDomain[domain] || 0) + count;
  }

  const topWords = Object.entries(wordCounts).sort((a,b) => b[1] - a[1]).slice(0, 10);
  const topDomains = Object.entries(byDomain).sort((a,b) => b[1] - a[1]).slice(0, 10);

  return {
    totalTaps,
    topWords,
    topDomains,
    completedSentences: (profile.sentenceHistory || []).length,
    frictionCount: (profile.frictionLog || []).length,
    favoritesCount: (profile.favorites || []).length,
    recentsCount: (profile.recentWords || []).length,
    team: teamSummary(profile),
    nextBest: suggestNextBest(topDomains)
  };
}

export function suggestNextBest(topDomains) {
  const dominant = topDomains?.[0]?.[0] || "Core Needs";
  if (dominant === "Food & Drinks") return ["cup", "straw", "orange juice", "cracker", "yogurt"];
  if (dominant === "Outside") return ["park", "swing", "slide", "ball", "friend"];
  if (dominant === "School Curriculum") return ["I need help", "show me again", "letter", "number", "sentence"];
  if (dominant === "Daily Living") return ["brush teeth", "wash hands", "get dressed", "seat belt", "appointment"];
  if (dominant === "Feelings") return ["calm", "frustrated", "I need a break", "hug", "help"];
  return ["help", "more", "all done", "I love you", "please"];
}
