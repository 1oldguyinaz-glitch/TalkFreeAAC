export function recommendVocabulary(profile, recommendation) {
  const clean = {
    id: "rec_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    word: recommendation.word || "",
    phrase: recommendation.phrase || "",
    reason: recommendation.reason || "",
    requestedBy: recommendation.requestedBy || "team",
    role: recommendation.role || "teacher",
    status: "pending_parent_approval",
    createdAt: new Date().toISOString()
  };

  return {
    ...profile,
    vocabularyRecommendations: [...(profile.vocabularyRecommendations || []), clean]
  };
}

export function approveVocabularyRecommendation(profile, recommendationId) {
  return {
    ...profile,
    vocabularyRecommendations: (profile.vocabularyRecommendations || []).map(r =>
      r.id === recommendationId ? { ...r, status: "approved", approvedAt: new Date().toISOString() } : r
    )
  };
}

export function rejectVocabularyRecommendation(profile, recommendationId) {
  return {
    ...profile,
    vocabularyRecommendations: (profile.vocabularyRecommendations || []).map(r =>
      r.id === recommendationId ? { ...r, status: "rejected", rejectedAt: new Date().toISOString() } : r
    )
  };
}

export function pendingRecommendations(profile) {
  return (profile.vocabularyRecommendations || []).filter(r => r.status === "pending_parent_approval");
}
