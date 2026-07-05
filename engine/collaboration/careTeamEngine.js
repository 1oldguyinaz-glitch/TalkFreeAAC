export const CARE_TEAM_MESSAGE_TYPES = [
  "Home note",
  "School note",
  "Therapy note",
  "Medical note",
  "Behavior/regulation note",
  "Vocabulary request"
];

export function addCareTeamMessage(profile = {}, message = {}) {
  const text = String(message.text || "").trim();
  if (!text) return profile;

  const entry = {
    id: `team-msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    author: message.author || "Care team",
    role: message.role || "Parent 1",
    type: message.type || "Home note",
    text,
    followUpNeeded: Boolean(message.followUpNeeded)
  };

  return {
    ...profile,
    careTeamMessages: [entry, ...(profile.careTeamMessages || [])].slice(0, 200)
  };
}

export function resolveCareTeamMessage(profile = {}, id) {
  return {
    ...profile,
    careTeamMessages: (profile.careTeamMessages || []).map(message =>
      message.id === id ? { ...message, resolvedAt: new Date().toISOString(), followUpNeeded: false } : message
    )
  };
}

export function getCareTeamDigest(profile = {}, limit = 20) {
  const messages = profile.careTeamMessages || [];
  const open = messages.filter(message => message.followUpNeeded && !message.resolvedAt);

  return {
    totalMessages: messages.length,
    openFollowUps: open.length,
    latestMessages: messages.slice(0, limit),
    openFollowUpMessages: open
  };
}
