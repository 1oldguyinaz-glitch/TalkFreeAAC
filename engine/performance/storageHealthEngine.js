export function getStorageUsageEstimate() {
  try {
    let total = 0;
    for (const key of Object.keys(localStorage)) {
      total += key.length + String(localStorage.getItem(key) || "").length;
    }

    return {
      available: true,
      characters: total,
      estimatedKilobytes: Math.round((total * 2) / 1024),
      status: total < 2_000_000 ? "healthy" : "large"
    };
  } catch (error) {
    return {
      available: false,
      characters: 0,
      estimatedKilobytes: 0,
      status: "unavailable",
      error: error?.message || "Storage unavailable"
    };
  }
}

export function compactProfileForStorage(profile = {}) {
  return {
    ...profile,
    recentWords: (profile.recentWords || []).slice(0, 80),
    recentPhrases: (profile.recentPhrases || []).slice(0, 80),
    recentConversationPatterns: (profile.recentConversationPatterns || []).slice(0, 80),
    timeline: (profile.timeline || []).slice(-500),
    careTeamMessages: (profile.careTeamMessages || []).slice(0, 200),
    dailyNotes: (profile.dailyNotes || []).slice(0, 200)
  };
}
