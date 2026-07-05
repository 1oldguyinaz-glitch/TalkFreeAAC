import { getCommunicationMetrics, getTopWords, getTopPhrases } from "../analytics/communicationAnalytics.js";
import { summarizeTimeline, buildTimelineNarrative } from "../timeline/timelineSummaryEngine.js";

export function buildProgressReport(profile = {}) {
  const metrics = getCommunicationMetrics(profile);
  const timeline = summarizeTimeline(profile);
  const topWords = getTopWords(profile, 15);
  const topPhrases = getTopPhrases(profile, 15);
  const name = profile.userProfile?.name || "Student";

  const strengths = [];

  if (metrics.affectionExpressed > 0) strengths.push("Uses relationship/social language.");
  if (metrics.feelingsExpressed > 0) strengths.push("Uses emotional communication.");
  if (metrics.questionsAsked > 0) strengths.push("Uses questions to participate.");
  if (metrics.uniqueWords > 10) strengths.push("Shows vocabulary variety.");
  if (metrics.completeSentenceRate >= 50) strengths.push("Combines words into complete messages.");

  if (!strengths.length) {
    strengths.push("Beginning communication profile is ready for modeling and tracking.");
  }

  const nextSteps = [
    "Model one level above current message length.",
    "Keep relationship and feeling phrases available on the home board.",
    "Track independent initiations separately from prompted responses.",
    "Review top words weekly and add missing personal vocabulary.",
    "Use the same core board across home, school, and therapy."
  ];

  return {
    title: `${name} TalkFreeAAC Progress Report`,
    createdAt: new Date().toISOString(),
    studentName: name,
    metrics,
    timeline,
    topWords,
    topPhrases,
    strengths,
    nextSteps,
    narrative: buildTimelineNarrative(profile)
  };
}

export function buildIEPProgressText(profile = {}) {
  const report = buildProgressReport(profile);
  const m = report.metrics;

  return [
    `${report.studentName} used TalkFreeAAC to communicate across recorded activities.`,
    `Recorded communication events: ${m.communications}.`,
    `Unique words used: ${m.uniqueWords}.`,
    `Phrases spoken: ${m.totalPhrases}.`,
    `Complete sentence rate: ${m.completeSentenceRate}%.`,
    `Feelings expressed: ${m.feelingsExpressed}.`,
    `Relationship/social phrases expressed: ${m.affectionExpressed}.`,
    `Questions asked: ${m.questionsAsked}.`,
    "",
    "Strengths:",
    ...report.strengths.map(item => `- ${item}`),
    "",
    "Suggested next steps:",
    ...report.nextSteps.map(item => `- ${item}`)
  ].join("\n");
}

export function buildCaregiverSummary(profile = {}) {
  const report = buildProgressReport(profile);

  return [
    `TalkFreeAAC summary for ${report.studentName}`,
    "",
    report.narrative,
    "",
    "Most used words:",
    ...(report.topWords.length ? report.topWords.map(item => `- ${item.word}: ${item.count}`) : ["- No words recorded yet."]),
    "",
    "Most used phrases:",
    ...(report.topPhrases.length ? report.topPhrases.map(item => `- ${item.phrase}: ${item.count}`) : ["- No phrases recorded yet."])
  ].join("\n");
}
