export function communicationTrends(profile) {
  const timeline = profile.timeline || [];
  const sentenceHistory = profile.sentenceHistory || [];
  const wordCounts = profile.wordCounts || {};
  const byDay = {};

  for (const event of timeline) {
    const day = String(event.time || "").slice(0, 10);
    if (!day) continue;
    byDay[day] = byDay[day] || { communications: 0, tags: {} };
    if (event.type === "communication") byDay[day].communications += 1;
    for (const tag of event.tags || []) {
      byDay[day].tags[tag] = (byDay[day].tags[tag] || 0) + 1;
    }
  }

  const days = Object.entries(byDay).map(([day, data]) => ({ day, ...data }));

  return {
    days,
    totalDays: days.length,
    totalSentences: sentenceHistory.length,
    uniqueWords: Object.keys(wordCounts).length,
    averageSentencesPerActiveDay: days.length ? Number((sentenceHistory.length / days.length).toFixed(2)) : 0,
    strongestDay: days.sort((a, b) => b.communications - a.communications)[0] || null
  };
}

export function detectGrowthSignals(profile) {
  const wordCounts = profile.wordCounts || {};
  const sentenceHistory = profile.sentenceHistory || [];
  return {
    usesMultipleWords: sentenceHistory.some(s => (s.length || 0) >= 2),
    usesThreePlusWords: sentenceHistory.some(s => (s.length || 0) >= 3),
    vocabularyOver25: Object.keys(wordCounts).length >= 25,
    vocabularyOver100: Object.keys(wordCounts).length >= 100,
    hasFavorites: (profile.favorites || []).length > 0,
    hasTeamSupport: (profile.teamMembers || []).length > 0
  };
}
