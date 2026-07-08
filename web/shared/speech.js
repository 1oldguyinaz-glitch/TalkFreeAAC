import { buildVoiceRuntimeSettings } from "../../engine/voice/voiceSettings.js";

let cachedVoices = [];
let voicesPrimed = false;

function hasSpeech() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function normalize(value = "") {
  return String(value || "").toLowerCase().trim();
}

function refreshVoiceCache() {
  if (!hasSpeech()) return [];
  cachedVoices = window.speechSynthesis.getVoices?.() || [];
  voicesPrimed = true;
  return cachedVoices;
}

function getVoices() {
  if (!hasSpeech()) return [];
  if (!voicesPrimed || !cachedVoices.length) return refreshVoiceCache();
  return cachedVoices;
}

function scoreVoice(voice, settings) {
  const name = normalize(`${voice.name || ""} ${voice.lang || ""} ${voice.voiceURI || ""}`);
  let score = 0;

  if (settings.voiceURI && voice.voiceURI === settings.voiceURI) score += 100;
  if (settings.voiceName && normalize(voice.name) === normalize(settings.voiceName)) score += 60;
  if (name.includes("en")) score += 8;
  if (voice.default) score += 4;

  for (const term of settings.preferredTerms || []) {
    if (term && name.includes(normalize(term))) score += 12;
  }

  return score;
}

export function pickSpeechVoice(profileOrSettings = {}) {
  const voices = getVoices();
  if (!voices.length) return null;
  const settings = buildVoiceRuntimeSettings(profileOrSettings);
  return voices
    .slice()
    .sort((a, b) => scoreVoice(b, settings) - scoreVoice(a, settings))[0] || null;
}

export function getAvailableSpeechVoices() {
  return getVoices().map(voice => ({
    name: voice.name,
    lang: voice.lang,
    voiceURI: voice.voiceURI,
    default: voice.default
  }));
}

export function speak(text, profileOrSettings = {}, overrides = {}) {
  const cleanText = String(text || "").trim();
  if (!cleanText || !hasSpeech()) return false;

  const settings = {
    ...buildVoiceRuntimeSettings(profileOrSettings),
    ...overrides
  };

  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(cleanText);
  const voice = pickSpeechVoice(profileOrSettings);

  if (voice) msg.voice = voice;
  msg.rate = settings.rate;
  msg.pitch = settings.pitch;
  msg.volume = settings.volume;
  window.speechSynthesis.speak(msg);
  return true;
}

export function warmSpeechVoices() {
  if (!hasSpeech()) return [];
  const voices = refreshVoiceCache();
  if (window.speechSynthesis?.addEventListener) {
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoiceCache, { once: false });
  } else {
    window.speechSynthesis.onvoiceschanged = refreshVoiceCache;
  }
  return voices;
}
