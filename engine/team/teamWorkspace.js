export function addTeamNote(profile, note) {
  const cleanNote = {
    role: note.role || "teacher",
    author: note.author || "",
    studentName: note.studentName || "",
    ate: note.ate || "",
    didWell: note.didWell || "",
    struggledWith: note.struggledWith || "",
    workedOn: note.workedOn || "",
    comments: note.comments || "",
    ageAppropriate: note.ageAppropriate !== false,
    time: new Date().toISOString()
  };

  const teamNotes = [...(profile.teamNotes || []), cleanNote].slice(-5000);
  return { ...profile, teamNotes };
}

export function getTeamNotes(profile, limit = 100) {
  return [...(profile.teamNotes || [])].reverse().slice(0, limit);
}

export function teamSummary(profile) {
  const notes = profile.teamNotes || [];
  return {
    totalNotes: notes.length,
    latest: notes[notes.length - 1] || null,
    roles: [...new Set(notes.map(n => n.role || "unknown"))]
  };
}
