import { getCommunicationMetrics, getTopWords, getTopPhrases } from "../analytics/communicationAnalytics.js";

export function generateInsightReport(profile = {}) {
  const metrics = getCommunicationMetrics(profile);
  const topWords = getTopWords(profile, 10);
  const topPhrases = getTopPhrases(profile, 10);

  const recommendations = [];

  if (metrics.completeSentenceRate < 50) {
    recommendations.push({
      priority: "high",
      area: "Sentence Building",
      recommendation: "Keep sentence starters visible and model 2-4 word phrases during routines."
    });
  }

  if (metrics.feelingsExpressed < 3) {
    recommendations.push({
      priority: "medium",
      area: "Emotional Communication",
      recommendation: "Add feeling prompts during transitions, frustration, and recovery moments."
    });
  }

  if (metrics.questionsAsked < 3) {
    recommendations.push({
      priority: "medium",
      area: "Curiosity",
      recommendation: "Model question words such as why, what, where, and can I during play and school tasks."
    });
  }

  if (metrics.affectionExpressed < 3) {
    recommendations.push({
      priority: "medium",
      area: "Relationship Language",
      recommendation: "Keep phrases like I love you, thank you, hug, and good night on the home board."
    });
  }

  if (!recommendations.length) {
    recommendations.push({
      priority: "low",
      area: "Maintenance",
      recommendation: "Continue current modeling. Communication variety is developing."
    });
  }

  return {
    createdAt: new Date().toISOString(),
    summary: {
      communicationEvents: metrics.communications,
      completeSentenceRate: metrics.completeSentenceRate,
      feelingsExpressed: metrics.feelingsExpressed,
      affectionExpressed: metrics.affectionExpressed,
      questionsAsked: metrics.questionsAsked,
      uniqueWords: metrics.uniqueWords,
      totalPhrases: metrics.totalPhrases
    },
    topWords,
    topPhrases,
    recommendations
  };
}

export function generateIEPReadySummary(profile = {}) {
  const report = generateInsightReport(profile);
  const s = report.summary;

  return [
    `Communication events recorded: ${s.communicationEvents}.`,
    `Complete sentence rate: ${s.completeSentenceRate}%.`,
    `Unique words used: ${s.uniqueWords}.`,
    `Phrases spoken: ${s.totalPhrases}.`,
    `Feelings expressed: ${s.feelingsExpressed}.`,
    `Affection/social phrases expressed: ${s.affectionExpressed}.`,
    `Questions asked: ${s.questionsAsked}.`,
    "",
    "Recommended focus areas:",
    ...report.recommendations.map(item => `- ${item.area}: ${item.recommendation}`)
  ].join("\n");
}

export function exportReportJSON(profile = {}) {
  return JSON.stringify(generateInsightReport(profile), null, 2);
}
