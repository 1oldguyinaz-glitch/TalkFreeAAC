import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";
import { teamSummary } from "../team/teamWorkspace.js";
import { timelineStats } from "../timeline/timelineEngine.js";
import { calculateProgress } from "./progressEngine.js";

export function buildInsightSummary(profile) {
  const wordCounts = profile.wordCounts || {};
  const totalTaps = Object.values(wordCounts).reduce((a, b) => a + b, 0);
  const byDomain = {};

  for (const [word, count] of Object.entries(wordCounts)) {
    const domain = KNOWLEDGE_OBJECTS[word]?.domain || "Unknown";
    byDomain[domain] = (byDomain[domain] || 0) + count;
  }

  return {
    totalTaps,
    topWords: Object.entries(wordCounts).sort((a,b) => b[1] - a[1]).slice(0, 10),
    topDomains: Object.entries(byDomain).sort((a,b) => b[1] - a[1]).slice(0, 10),
    completedSentences: (profile.sentenceHistory || []).length,
    frictionCount: (profile.frictionLog || []).length,
    favoritesCount: (profile.favorites || []).length,
    recentsCount: (profile.recentWords || []).length,
    team: teamSummary(profile),
    timeline: timelineStats(profile),
    progress: calculateProgress(profile),
    nextBest: ["help", "more", "all done", "I love you", "please"]
  };
}
