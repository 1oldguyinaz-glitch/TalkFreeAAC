export function exportTeamWorkspace(profile) {
  return {
    app: "TalkFreeAAC",
    version: "0.7",
    exportType: "team_workspace_backup",
    exportedAt: new Date().toISOString(),
    teamMembers: profile.teamMembers || [],
    teamNotes: profile.teamNotes || [],
    goals: profile.goals || [],
    vocabularyRecommendations: profile.vocabularyRecommendations || []
  };
}

export function importTeamWorkspace(profile, payload) {
  if (!payload || payload.app !== "TalkFreeAAC" || payload.exportType !== "team_workspace_backup") {
    throw new Error("Not a TalkFreeAAC team workspace backup.");
  }

  return {
    ...profile,
    teamMembers: [...(profile.teamMembers || []), ...(payload.teamMembers || [])],
    teamNotes: [...(profile.teamNotes || []), ...(payload.teamNotes || [])],
    goals: [...(profile.goals || []), ...(payload.goals || [])],
    vocabularyRecommendations: [
      ...(profile.vocabularyRecommendations || []),
      ...(payload.vocabularyRecommendations || [])
    ]
  };
}
