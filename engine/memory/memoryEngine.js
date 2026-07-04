export function recordUsage(profile, word, phraseBefore = "") {
  const now = new Date().toISOString();
  const wordCounts = { ...(profile.wordCounts || {}), [word]: (profile.wordCounts?.[word] || 0) + 1 };
  const phraseCounts = { ...(profile.phraseCounts || {}), [phraseBefore]: (profile.phraseCounts?.[phraseBefore] || 0) + 1 };
  const tapHistory = [...(profile.tapHistory || []), { word, phrase: phraseBefore, time: now }].slice(-10000);
  const recentWords = [word, ...(profile.recentWords || []).filter(w => w !== word)].slice(0, 30);
  return { ...profile, wordCounts, phraseCounts, tapHistory, recentWords };
}

export function addFavorite(profile, word) {
  const favorites = [word, ...(profile.favorites || []).filter(w => w !== word)].slice(0, 50);
  return { ...profile, favorites };
}

export function removeFavorite(profile, word) {
  return { ...profile, favorites: (profile.favorites || []).filter(w => w !== word) };
}

export function getRecents(profile, limit = 20) {
  return (profile.recentWords || []).slice(0, limit);
}

export function getFavorites(profile, limit = 20) {
  return (profile.favorites || []).slice(0, limit);
}
