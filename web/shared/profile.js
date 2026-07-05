import { migrateProfile } from "../../engine/profile/profileMigration.js";

const STORAGE_KEY = "talkfreeaac.profile.v4";

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateProfile({});
    return migrateProfile(JSON.parse(raw));
  } catch (error) {
    console.warn("TalkFreeAAC profile load failed; using safe default.", error);
    return migrateProfile({});
  }
}

export function saveProfile(profile) {
  const migrated = migrateProfile(profile);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  } catch (error) {
    console.warn("TalkFreeAAC profile save failed.", error);
  }
  return migrated;
}

export function resetProfile() {
  localStorage.removeItem(STORAGE_KEY);
  return migrateProfile({});
}
