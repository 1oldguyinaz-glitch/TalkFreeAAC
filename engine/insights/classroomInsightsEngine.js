export function buildClassroomSnapshot(profile = {}) {
  const goals = profile.goals || [];
  const notes = profile.dailyNotes || [];
  const team = profile.teamMembers || [];

  return {
    studentName: profile.userProfile?.name || "Student",
    activeGoals: goals.filter(goal => !goal.completed),
    completedGoals: goals.filter(goal => goal.completed),
    latestNotes: notes.slice(0, 5),
    teamMembers: team,
    suggestedClassroomSupports: [
      "Keep core sentence starters visible during all classroom routines.",
      "Model one level above current communication length.",
      "Offer wait time before prompting.",
      "Use relationship and feeling phrases during social opportunities.",
      "Track independent initiations, not just requested responses."
    ]
  };
}

export function buildSessionNoteTemplate(profile = {}) {
  const name = profile.userProfile?.name || "Student";

  return {
    title: `${name} AAC Session Note`,
    fields: {
      date: new Date().toISOString().slice(0, 10),
      communicationTargets: "",
      modeledPhrases: "",
      independentMessages: "",
      promptsUsed: "",
      regulationNotes: "",
      nextSteps: ""
    }
  };
}
