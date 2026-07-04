export function inferContextByTime(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 10) return "Daily Living";
  if (hour >= 10 && hour < 14) return "School Curriculum";
  if (hour >= 14 && hour < 17) return "Outside";
  if (hour >= 17 && hour < 20) return "Food & Drinks";
  if (hour >= 20 || hour < 5) return "Daily Living";
  return "Core Needs";
}

export function suggestContext(profile) {
  if (profile.activeContext && profile.activeContext !== "Core Needs") return profile.activeContext;
  return inferContextByTime();
}

export function adaptiveBoardOrder(profile, baseSections = []) {
  const recent = profile.recentContexts || [];
  const suggested = suggestContext(profile);
  return [...new Set([suggested, ...recent, ...baseSections])].filter(Boolean);
}
