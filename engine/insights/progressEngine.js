export function calculateProgress(profile) {
  const sentenceHistory = profile.sentenceHistory || [];
  const wordCounts = profile.wordCounts || {};
  const uniqueWords = Object.keys(wordCounts).length;
  const totalWords = Object.values(wordCounts).reduce((a,b) => a + b, 0);
  const avgSentenceLength = sentenceHistory.length
    ? sentenceHistory.reduce((sum, s) => sum + (s.length || String(s.sentence || "").split(/\s+/).length), 0) / sentenceHistory.length
    : 0;

  return {
    uniqueWords,
    totalWords,
    completedSentences: sentenceHistory.length,
    averageSentenceLength: Number(avgSentenceLength.toFixed(2)),
    vocabularyGrowthScore: uniqueWords,
    communicationConfidenceScore: Math.min(100, Math.round((sentenceHistory.length * 2) + uniqueWords + avgSentenceLength * 5)),
    frictionRate: totalWords ? Number(((profile.frictionLog || []).length / totalWords).toFixed(3)) : 0
  };
}
