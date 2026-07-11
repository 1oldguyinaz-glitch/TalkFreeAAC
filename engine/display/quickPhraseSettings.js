import { isAdultTone } from "./stageSettings.js";

export const CHILD_QUICK_PHRASES = Object.freeze([
  "I love you",
  "Have a hug",
  "Please",
  "Thank you",
  "Hi",
  "Bye",
  "I'm sorry",
  "I miss you",
  "Good morning",
  "Good night"
]);

export const ADULT_QUICK_PHRASES = Object.freeze([
  "I need help",
  "Please",
  "Please wait",
  "Yes",
  "No",
  "Stop",
  "I need a break",
  "Wrong word",
  "Try again",
  "Thank you"
]);

export const QUICK_PHRASE_LIMIT = 10;

function cleanPhrase(value = "") {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function getDefaultQuickPhrases(profile = {}) {
  return [...(isAdultTone(profile) ? ADULT_QUICK_PHRASES : CHILD_QUICK_PHRASES)];
}

export function normalizeQuickPhrases(phrases = [], { keepEmpty = false } = {}) {
  const source = Array.isArray(phrases) ? phrases : [];
  const normalized = source
    .slice(0, QUICK_PHRASE_LIMIT)
    .map(cleanPhrase);

  if (keepEmpty) {
    while (normalized.length < QUICK_PHRASE_LIMIT) normalized.push("");
    return normalized;
  }

  return normalized.filter(Boolean);
}

export function getQuickPhrases(profile = {}, limit = QUICK_PHRASE_LIMIT) {
  const custom = normalizeQuickPhrases(
    profile?.settings?.quickPhrases || profile?.quickPhrases || []
  );
  const source = custom.length ? custom : getDefaultQuickPhrases(profile);
  return source.slice(0, Math.max(1, Number(limit || QUICK_PHRASE_LIMIT)));
}

export function updateQuickPhrases(profile = {}, phrases = []) {
  return {
    ...profile,
    settings: {
      ...(profile.settings || {}),
      quickPhrases: normalizeQuickPhrases(phrases)
    }
  };
}

export function resetQuickPhrases(profile = {}) {
  const nextSettings = { ...(profile.settings || {}) };
  delete nextSettings.quickPhrases;
  return {
    ...profile,
    settings: nextSettings
  };
}
