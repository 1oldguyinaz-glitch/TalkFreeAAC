export function createGoal(profile, goal) {
  const cleanGoal = {
    id: "goal_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    title: goal.title || "",
    category: goal.category || "Communication",
    assignedTo: goal.assignedTo || "team",
    targetWords: goal.targetWords || [],
    status: goal.status || "active",
    notes: goal.notes || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return { ...profile, goals: [...(profile.goals || []), cleanGoal] };
}

export function updateGoalStatus(profile, goalId, status) {
  return {
    ...profile,
    goals: (profile.goals || []).map(goal =>
      goal.id === goalId ? { ...goal, status, updatedAt: new Date().toISOString() } : goal
    )
  };
}

export function getActiveGoals(profile) {
  return (profile.goals || []).filter(goal => goal.status === "active");
}

export function goalSummary(profile) {
  const goals = profile.goals || [];
  return {
    total: goals.length,
    active: goals.filter(g => g.status === "active").length,
    completed: goals.filter(g => g.status === "completed").length
  };
}
