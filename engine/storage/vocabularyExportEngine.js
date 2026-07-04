export function exportVocabulary(profile) {
  return {
    app: "TalkFreeAAC",
    version: "0.7",
    exportType: "vocabulary_backup",
    exportedAt: new Date().toISOString(),
    customVocabulary: profile.customVocabulary || {},
    favorites: profile.favorites || [],
    recentWords: profile.recentWords || []
  };
}

export function importVocabulary(profile, payload) {
  if (!payload || payload.app !== "TalkFreeAAC" || payload.exportType !== "vocabulary_backup") {
    throw new Error("Not a TalkFreeAAC vocabulary backup.");
  }

  return {
    ...profile,
    customVocabulary: { ...(profile.customVocabulary || {}), ...(payload.customVocabulary || {}) },
    favorites: [...new Set([...(profile.favorites || []), ...(payload.favorites || [])])],
    recentWords: [...new Set([...(payload.recentWords || []), ...(profile.recentWords || [])])].slice(0, 30)
  };
}
