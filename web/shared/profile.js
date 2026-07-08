import { migrateProfile } from "../../engine/profile/profileMigration.js";

const STORAGE_KEY = "talkfreeaac.profile.v4";
const DEFERRED_SAVE_DELAY_MS = 350;

let pendingProfileSave = null;
let saveTimer = null;
let flushListenersAttached = false;

function canUseStorage() {
  return typeof localStorage !== "undefined";
}

function writeProfileNow(profile) {
  const migrated = migrateProfile(profile);
  if (!canUseStorage()) return migrated;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  } catch (error) {
    console.warn("TalkFreeAAC profile save failed.", error);
  }

  return migrated;
}

export function flushProfileSave() {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }

  if (!pendingProfileSave) return null;
  const next = pendingProfileSave;
  pendingProfileSave = null;
  return writeProfileNow(next);
}

function scheduleDeferredSave() {
  if (typeof window === "undefined") {
    flushProfileSave();
    return;
  }

  if (saveTimer) clearTimeout(saveTimer);

  saveTimer = window.setTimeout(() => {
    saveTimer = null;
    const flush = () => flushProfileSave();

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(flush, { timeout: 1200 });
    } else {
      window.setTimeout(flush, 0);
    }
  }, DEFERRED_SAVE_DELAY_MS);

  attachFlushListeners();
}

function attachFlushListeners() {
  if (flushListenersAttached || typeof window === "undefined") return;
  flushListenersAttached = true;

  window.addEventListener("beforeunload", flushProfileSave);
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushProfileSave();
    });
  }
}

export function loadProfile() {
  try {
    const raw = canUseStorage() ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return migrateProfile({});
    return migrateProfile(JSON.parse(raw));
  } catch (error) {
    console.warn("TalkFreeAAC profile load failed; using safe default.", error);
    return migrateProfile({});
  }
}

export function saveProfile(profile, options = {}) {
  const migrated = migrateProfile(profile);

  if (options.defer === true) {
    pendingProfileSave = migrated;
    scheduleDeferredSave();
    return migrated;
  }

  return writeProfileNow(migrated);
}

export function resetProfile() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = null;
  pendingProfileSave = null;
  if (canUseStorage()) localStorage.removeItem(STORAGE_KEY);
  return migrateProfile({});
}
