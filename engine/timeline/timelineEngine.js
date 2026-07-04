export function addTimelineEvent(profile, event) {
  const timeline = [...(profile.timeline || []), {
    id: "evt_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    type: event.type || "communication",
    text: event.text || "",
    tags: event.tags || [],
    context: event.context || profile.activeContext || "Core Needs",
    metadata: event.metadata || {},
    time: event.time || new Date().toISOString()
  }].slice(-20000);
  return { ...profile, timeline };
}

export function getTimeline(profile, limit = 100) {
  return [...(profile.timeline || [])].reverse().slice(0, limit);
}

export function timelineStats(profile) {
  const events = profile.timeline || [];
  const communication = events.filter(e => e.type === "communication");
  const byTag = {};
  for (const event of communication) {
    for (const tag of event.tags || []) byTag[tag] = (byTag[tag] || 0) + 1;
  }
  return {
    totalEvents: events.length,
    communicationCount: communication.length,
    topTags: Object.entries(byTag).sort((a,b) => b[1] - a[1]).slice(0, 10)
  };
}
