export function recordPredictionOutcome(profile = {}, selectedWord = "", visiblePredictions = []) {
  if (!selectedWord) return profile;

  const normalized = String(selectedWord);
  const predictionStats = profile.predictionStats || {};
  const stat = predictionStats[normalized] || {
    selected: 0,
    shown: 0,
    selectedFromPrediction: 0,
    lastSelectedAt: null
  };

  const wasPredicted = visiblePredictions.includes(selectedWord);

  return {
    ...profile,
    predictionStats: {
      ...predictionStats,
      [normalized]: {
        ...stat,
        selected: stat.selected + 1,
        shown: stat.shown + (wasPredicted ? 1 : 0),
        selectedFromPrediction: stat.selectedFromPrediction + (wasPredicted ? 1 : 0),
        lastSelectedAt: new Date().toISOString()
      }
    }
  };
}

export function getAdaptiveLearningCandidates(profile = {}) {
  const stats = profile.predictionStats || {};

  return Object.entries(stats)
    .map(([word, stat]) => {
      const selected = stat.selected || 0;
      const selectedFromPrediction = stat.selectedFromPrediction || 0;
      const successRate = selected ? selectedFromPrediction / selected : 0;

      return {
        word,
        reasons: { personalization: true },
        score: selected * 18 + successRate * 120
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}
