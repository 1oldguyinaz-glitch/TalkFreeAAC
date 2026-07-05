export function getPersonalizedPredictions(profile = {}) {
  const candidates = [];

  (profile.favoritePhrases || []).forEach((phrase, index) => {
    candidates.push({
      word: phrase,
      reasons: { favorite: true, personalization: true },
      score: 280 - index * 8
    });
  });

  (profile.favorites || []).forEach((word, index) => {
    candidates.push({
      word,
      reasons: { favorite: true, personalization: true },
      score: 230 - index * 8
    });
  });

  const family = profile.family || profile.userProfile?.family || [];
  family.forEach((person, index) => {
    const name = typeof person === "string" ? person : person.name;
    if (name) {
      candidates.push({
        word: name,
        reasons: { relationship: true, personalization: true },
        score: 220 - index * 6
      });
    }
  });

  const preferred = profile.preferredVocabulary || {};
  Object.values(preferred).flat().forEach((word, index) => {
    candidates.push({
      word,
      reasons: { personalization: true },
      score: 180 - index * 4
    });
  });

  return candidates;
}
