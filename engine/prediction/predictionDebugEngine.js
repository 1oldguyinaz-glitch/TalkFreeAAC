import { getPredictions } from "./predictionEngine.js";

export function getPredictionDebugSnapshot(profile = {}) {
  const sentence = profile.sentence || [];
  const phrase = sentence.join(" ");
  const predictions = getPredictions(profile);

  return {
    phrase,
    activeContext: profile.activeContext || "Core Needs",
    activeRoutine: profile.activeRoutine || "auto",
    predictions,
    wordCounts: profile.wordCounts || {},
    phraseCounts: profile.phraseCounts || {},
    predictionStats: profile.predictionStats || {},
    recentWords: profile.recentWords || [],
    recentPhrases: profile.recentPhrases || []
  };
}

export function exportPredictionDebug(profile = {}) {
  return JSON.stringify(getPredictionDebugSnapshot(profile), null, 2);
}
