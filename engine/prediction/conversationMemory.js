export function getRecentConversationPatterns(profile = {}, limit = 20) {
  const timeline = profile.timeline || [];
  return timeline
    .filter(event => event.type === "communication" && event.text)
    .slice(-limit)
    .map(event => String(event.text));
}

export function recordConversationPattern(profile = {}, phrase = "") {
  if (!phrase.trim()) return profile;

  const patterns = profile.conversationPatterns || {};
  const key = phrase.trim();

  return {
    ...profile,
    conversationPatterns: {
      ...patterns,
      [key]: (patterns[key] || 0) + 1
    },
    recentConversationPatterns: [
      key,
      ...(profile.recentConversationPatterns || []).filter(item => item !== key)
    ].slice(0, 40)
  };
}

export function getConversationMemoryPredictions(profile = {}, sentence = []) {
  const phrase = sentence.join(" ").trim().toLowerCase();
  const patterns = profile.conversationPatterns || {};
  const recents = profile.recentConversationPatterns || [];

  const candidates = [];

  Object.entries(patterns).forEach(([storedPhrase, count]) => {
    const lower = storedPhrase.toLowerCase();
    if (!phrase || lower.startsWith(phrase)) {
      const remaining = storedPhrase.split(" ").slice(sentence.length).join(" ");
      if (remaining) {
        candidates.push({
          word: remaining.split(" ").slice(0, 3).join(" "),
          reasons: { personalization: true },
          score: count * 35
        });
      }
    }
  });

  recents.slice(0, 10).forEach((recent, index) => {
    if (!phrase || recent.toLowerCase().startsWith(phrase)) {
      const next = recent.split(" ").slice(sentence.length).join(" ");
      if (next) {
        candidates.push({
          word: next.split(" ").slice(0, 3).join(" "),
          reasons: { personalization: true },
          score: 160 - index * 8
        });
      }
    }
  });

  return candidates;
}
