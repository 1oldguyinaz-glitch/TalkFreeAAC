export function createGoal({ title, targetWords = "", level = "Emerging", notes = "" }) {
  return {
    id: `goal_${Date.now()}`,
    title: title || "New communication goal",
    targetWords: String(targetWords)
      .split(",")
      .map(word => word.trim())
      .filter(Boolean),
    level,
    notes,
    progress: 0,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function addGoal(profile, goalInput) {
  return {
    ...profile,
    goals: [
      createGoal(goalInput),
      ...(profile.goals || [])
    ]
  };
}

export function updateGoal(profile, goalId, patch) {
  return {
    ...profile,
    goals: (profile.goals || []).map(goal =>
      goal.id === goalId
        ? { ...goal, ...patch, updatedAt: new Date().toISOString() }
        : goal
    )
  };
}

export function completeGoal(profile, goalId) {
  return updateGoal(profile, goalId, { completed: true, progress: 100 });
}
