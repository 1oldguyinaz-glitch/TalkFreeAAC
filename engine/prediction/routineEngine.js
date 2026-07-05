export function getCurrentRoutine(now = new Date()) {
  const hour = now.getHours();

  if (hour >= 5 && hour < 10) return "Morning";
  if (hour >= 10 && hour < 14) return "School";
  if (hour >= 14 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 20) return "Dinner";
  if (hour >= 20 && hour < 23) return "Bedtime";
  return "Night";
}

export const ROUTINE_PREDICTIONS = {
  Morning: [
    "Good morning", "I love you", "I'm hungry", "Water", "Bathroom", "School", "I need help"
  ],
  School: [
    "I have a question", "I need help", "Teacher", "Bathroom please", "I'm done", "My turn"
  ],
  Afternoon: [
    "I'm home", "Snack", "Outside", "Let's play", "I need a break", "Tell me more"
  ],
  Dinner: [
    "I'm hungry", "Water", "More please", "I'm full", "Thank you", "I don't like that"
  ],
  Bedtime: [
    "Good night", "I love you", "Can I have a hug", "I'm tired", "Story please", "Light off"
  ],
  Night: [
    "I need help", "I am scared", "Water", "Bathroom", "Mom", "Dad"
  ]
};

export function getRoutinePredictions(profile = {}, now = new Date()) {
  const routine = profile.activeRoutine || getCurrentRoutine(now);
  return (ROUTINE_PREDICTIONS[routine] || []).map((word, index) => ({
    word,
    reasons: { routine: true },
    score: 220 - index * 10
  }));
}
