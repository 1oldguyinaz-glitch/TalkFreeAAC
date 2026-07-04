export const TEAM_ROLES = [
  "Parent 1",
  "Parent 2",
  "Teacher",
  "Therapist",
  "Counselor",
  "Care Team",
  "Other"
];

export function addTeamMember(profile, member) {
  const clean = {
    id: `team_${Date.now()}`,
    name: member.name || "",
    email: member.email || "",
    role: member.role || "Parent 1",
    createdAt: new Date().toISOString()
  };

  return {
    ...profile,
    teamMembers: [clean, ...(profile.teamMembers || [])]
  };
}

export function removeTeamMember(profile, memberId) {
  return {
    ...profile,
    teamMembers: (profile.teamMembers || []).filter(member => member.id !== memberId)
  };
}
