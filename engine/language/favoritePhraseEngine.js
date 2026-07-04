import { HUMAN_FIRST_PHRASES, normalizeText } from "./communicationGenome.js";

export function getFavoritePhrases(profile, limit = 12) {
  const counts = profile.phraseCounts || {};
  const manual = profile.favoritePhrases || [];
  const phraseHistory = profile.recentPhrases || [];

  const pool = [
    ...manual,
    ...phraseHistory,
    ...HUMAN_FIRST_PHRASES.map(p => p.phrase)
  ];

  return [...new Set(pool)]
    .filter(Boolean)
    .sort((a, b) => {
      const score = phrase =>
        (counts[phrase] || 0) * 20 +
        (manual.includes(phrase) ? 300 : 0) +
        (phraseHistory.includes(phrase) ? 120 - phraseHistory.indexOf(phrase) : 0) +
        ((HUMAN_FIRST_PHRASES.find(p => normalizeText(p.phrase) === normalizeText(phrase)) || {}).priority || 0);

      return score(b) - score(a);
    })
    .slice(0, limit);
}

export function recordPhraseUse(profile, phrase) {
  if (!phrase) return profile;

  return {
    ...profile,
    phraseCounts: {
      ...(profile.phraseCounts || {}),
      [phrase]: ((profile.phraseCounts || {})[phrase] || 0) + 1
    },
    recentPhrases: [
      phrase,
      ...(profile.recentPhrases || []).filter(item => item !== phrase)
    ].slice(0, 30)
  };
}

export function addFavoritePhrase(profile, phrase) {
  if (!phrase) return profile;
  return {
    ...profile,
    favoritePhrases: [
      phrase,
      ...(profile.favoritePhrases || []).filter(item => item !== phrase)
    ].slice(0, 40)
  };
}
