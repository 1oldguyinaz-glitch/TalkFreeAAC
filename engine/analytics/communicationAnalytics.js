export function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function countBy(items = [], keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export function getCommunicationMetrics(profile = {}) {
  const timeline = profile.timeline || [];
  const wordCounts = profile.wordCounts || {};
  const phraseCounts = profile.phraseCounts || {};
  const goals = profile.goals || [];
  const teamMembers = profile.teamMembers || [];
  const notes = profile.dailyNotes || [];
  const recentPhrases = profile.recentPhrases || [];

  const communications = timeline.filter(event => event.type === "communication");
  const completeSentences = communications.filter(event => {
    const text = event.text || "";
    return text.trim().split(/\s+/).length >= 2;
  });

  const feelingWords = ["happy", "sad", "mad", "scared", "hurt", "sick", "tired", "excited", "frustrated", "calm"];
  const relationshipPhrases = ["I love you", "Can I have a hug", "Thank you", "I'm sorry", "I miss you", "Good morning", "Good night"];

  const feelingsExpressed = communications.filter(event =>
    feelingWords.some(word => String(event.text || "").toLowerCase().includes(word))
  ).length;

  const affectionExpressed =
    Object.entries(phraseCounts)
      .filter(([phrase]) => relationshipPhrases.some(p => p.toLowerCase() === phrase.toLowerCase()))
      .reduce((sum, [, count]) => sum + count, 0);

  const questionsAsked = communications.filter(event =>
    /\?|why|what|where|who|when|how|can i/i.test(event.text || "")
  ).length;

  const totalWords = Object.values(wordCounts).reduce((sum, value) => sum + Number(value || 0), 0);
  const uniqueWords = Object.keys(wordCounts).length;
  const totalPhrases = Object.values(phraseCounts).reduce((sum, value) => sum + Number(value || 0), 0);

  const completeSentenceRate = communications.length
    ? Math.round((completeSentences.length / communications.length) * 100)
    : 0;

  return {
    taps: profile.taps || totalWords,
    totalWords,
    uniqueWords,
    totalPhrases,
    communications: communications.length,
    completeSentences: completeSentences.length,
    completeSentenceRate,
    feelingsExpressed,
    affectionExpressed,
    questionsAsked,
    activeGoals: goals.filter(goal => !goal.completed).length,
    teamMembers: teamMembers.length,
    notes: notes.length,
    favoritePhrases: (profile.favoritePhrases || []).length,
    recentPhrases: recentPhrases.slice(0, 8)
  };
}

export function getTopWords(profile = {}, limit = 12) {
  return Object.entries(profile.wordCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

export function getTopPhrases(profile = {}, limit = 12) {
  return Object.entries(profile.phraseCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([phrase, count]) => ({ phrase, count }));
}

export function buildInsightSummary(profile = {}) {
  const metrics = getCommunicationMetrics(profile);
  const topPhrases = getTopPhrases(profile, 5);
  const topWords = getTopWords(profile, 5);

  return {
    headline: metrics.communications
      ? `${metrics.communications} communication events recorded.`
      : "No communication events recorded yet.",
    strengths: [
      metrics.affectionExpressed > 0 ? "Relationship phrases are being used." : "Add relationship phrases to encourage connection.",
      metrics.completeSentenceRate >= 50 ? "Sentence building is developing." : "Sentence starters should stay highly visible.",
      metrics.questionsAsked > 0 ? "Question asking has started." : "Add question prompts to support curiosity."
    ],
    topPhrases,
    topWords
  };
}
