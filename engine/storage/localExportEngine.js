export function exportProfile(profile) {
  return {
    app: "TalkFreeAAC",
    version: "0.7",
    exportType: "profile_backup",
    exportedAt: new Date().toISOString(),
    profile
  };
}

export function downloadProfileBackup(profile, filename = "talkfreeaac-profile-backup.json") {
  const payload = exportProfile(profile);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function validateProfileImport(payload) {
  if (!payload || payload.app !== "TalkFreeAAC") return { ok: false, error: "Not a TalkFreeAAC backup." };
  if (!payload.profile) return { ok: false, error: "Backup missing profile." };
  return { ok: true };
}

export function importProfileBackup(payload) {
  const validation = validateProfileImport(payload);
  if (!validation.ok) throw new Error(validation.error);
  return payload.profile;
}
