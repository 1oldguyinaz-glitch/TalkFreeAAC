import { buildLanguageBoard } from "../language/languageEngine.js";

export function currentPhrase(sentence = []) {
  return Array.isArray(sentence) ? sentence.join(" ").trim() : "";
}

export function getPredictions(profile) {
  return buildLanguageBoard(profile).predictions;
}

export function getFullBoard(profile) {
  return buildLanguageBoard(profile);
}
