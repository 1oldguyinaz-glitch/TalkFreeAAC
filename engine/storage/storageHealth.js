export function storageHealth(profile) {
  const json = JSON.stringify(profile || {});
  const bytes = new Blob([json]).size;
  const kb = Number((bytes / 1024).toFixed(2));
  const mb = Number((bytes / (1024 * 1024)).toFixed(3));

  return {
    bytes,
    kb,
    mb,
    sentenceCount: (profile.sentenceHistory || []).length,
    timelineCount: (profile.timeline || []).length,
    wordCount: Object.keys(profile.wordCounts || {}).length,
    teamNoteCount: (profile.teamNotes || []).length,
    warning: mb > 4 ? "Large local profile. Consider backup/export." : ""
  };
}
