import { can, PERMISSIONS } from "../permissions/rolePermissions.js";

export function addTeamNote(profile, note) {
  const role = note.role || "teacher";
  if (!can(role, PERMISSIONS.ADD_TEAM_NOTE)) return profile;

  const cleanNote = {
    id: "note_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    role,
    author: note.author || "",
    studentName: note.studentName || "",
    ate: note.ate || "",
    didWell: note.didWell || "",
    struggledWith: note.struggledWith || "",
    workedOn: note.workedOn || "",
    comments: note.comments || "",
    ageAppropriate: note.ageAppropriate !== false,
    localOnlyUntilSyncEnabled: true,
    time: new Date().toISOString()
  };

  return { ...profile, teamNotes: [...(profile.teamNotes || []), cleanNote].slice(-5000) };
}

export function getTeamNotes(profile, limit = 100) {
  return [...(profile.teamNotes || [])].reverse().slice(0, limit);
}

export function teamSummary(profile) {
  const notes = profile.teamNotes || [];
  return {
    totalNotes: notes.length,
    latest: notes[notes.length - 1] || null,
    roles: [...new Set(notes.map(n => n.role || "unknown"))],
    members: (profile.teamMembers || []).length
  };
}

export function createTeamMember(profile, member) {
  const clean = {
    id: "member_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    name: member.name || "",
    role: member.role || "teacher",
    email: member.email || "",
    status: "invited",
    createdAt: new Date().toISOString()
  };

  return { ...profile, teamMembers: [...(profile.teamMembers || []), clean] };
}
