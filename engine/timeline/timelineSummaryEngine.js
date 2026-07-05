export function getTimelineEvents(profile = {}, limit = 100) {
  const events = profile.timeline || [];
  return [...events]
    .sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))
    .slice(0, limit);
}

export function groupTimelineByDay(profile = {}, limit = 100) {
  const grouped = {};

  getTimelineEvents(profile, limit).forEach(event => {
    const date = String(event.createdAt || event.timestamp || new Date().toISOString()).slice(0, 10);
    grouped[date] = grouped[date] || [];
    grouped[date].push(event);
  });

  return grouped;
}

export function summarizeTimeline(profile = {}) {
  const events = getTimelineEvents(profile, 500);
  const communicationEvents = events.filter(event => event.type === "communication");
  const goalEvents = events.filter(event => event.type === "goal");
  const noteEvents = events.filter(event => event.type === "note");

  const phrases = communicationEvents.map(event => event.text).filter(Boolean);
  const uniquePhrases = Array.from(new Set(phrases));

  return {
    totalEvents: events.length,
    communicationEvents: communicationEvents.length,
    goalEvents: goalEvents.length,
    noteEvents: noteEvents.length,
    uniquePhrases: uniquePhrases.length,
    latestPhrase: phrases[0] || "",
    latestEventAt: events[0]?.createdAt || events[0]?.timestamp || null
  };
}

export function buildTimelineNarrative(profile = {}) {
  const summary = summarizeTimeline(profile);
  const name = profile.userProfile?.name || "The communicator";

  return [
    `${name} has ${summary.communicationEvents} recorded communication events.`,
    `${name} has used ${summary.uniquePhrases} unique recorded phrases.`,
    summary.latestPhrase ? `Most recent phrase: "${summary.latestPhrase}".` : "No spoken phrases have been recorded yet.",
    `Total timeline events: ${summary.totalEvents}.`
  ].join(" ");
}
