export function addDailyNote(profile, note) {
  const clean = {
    id: `note_${Date.now()}`,
    date: new Date().toISOString(),
    didWell: note.didWell || "",
    struggledWith: note.struggledWith || "",
    workedOn: note.workedOn || "",
    comments: note.comments || ""
  };

  return {
    ...profile,
    dailyNotes: [clean, ...(profile.dailyNotes || [])]
  };
}
