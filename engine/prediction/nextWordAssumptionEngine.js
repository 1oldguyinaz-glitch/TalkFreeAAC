// TalkFreeAAC V5.30 — Next-word assumption engine
// Purpose: keep the large vocabulary gated while still making the next useful words appear after each tap.
// No external AI required. This is local-first deterministic routing plus lazy database enrichment.

import {
  getDynamicBranch,
  normalizeTreeKey,
  uniqueWords
} from "../language/languageTree.js";
import {
  filterEntriesBySafetyV5_27,
  getLanguageDatabaseV5_27Async,
  MAX_ACTIVE_OPTIONS
} from "../language/languageDatabaseRouterV5_27.js";

export const NEXT_WORD_ASSUMPTION_VERSION = "5.30-gated-next-word";

const FEELING_WORDS = [
  "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "excited", "proud", "lonely",
  "safe", "frustrated", "okay", "hungry", "thirsty", "nervous", "calm", "upset"
];

const BODY_NEED_WORDS = [
  "help", "bathroom", "water", "food", "break", "quiet", "space", "medicine", "mom", "dad",
  "teacher", "doctor", "safe", "now", "please", "hurt", "sick", "scared"
];

const WANT_WORDS = [
  "to", "more", "help", "food", "drink", "water", "outside", "play", "break", "a hug",
  "mom", "dad", "snack", "bathroom", "tablet", "toy", "music", "turn", "please"
];

const ACTION_WORDS = [
  "go", "play", "eat", "drink", "see", "watch", "read", "sit", "stand", "stop",
  "try", "talk", "help", "get", "do", "listen", "wait", "open"
];

export const NEXT_WORD_DATA_OVERLAY_V5_30 = [
  {
    id: "v5_30_overlay_im",
    label: "I'm",
    display_label: "I'm",
    type: "word",
    primary_branch: "core",
    branches: ["core", "grammar_language", "feelings"],
    stage_access: [1, 2, 3, 4, 5],
    trigger_phrases: ["home", "core", "sentence_start"],
    show_by_context: ["home", "core", "sentence_start"],
    prediction_weight: 1
  },
  {
    id: "v5_30_overlay_feeling",
    label: "feeling",
    display_label: "feeling",
    type: "word",
    primary_branch: "feelings",
    branches: ["feelings", "grammar_language"],
    stage_access: [1, 2, 3, 4, 5],
    trigger_phrases: ["I'm", "I am"],
    show_by_context: ["I'm", "I am", "feelings"],
    prediction_weight: 1
  }
];

export const NEXT_WORD_ROUTES_V5_30 = {
  "i": {
    words: ["want", "need", "am", "feel", "can", "don't", "like", "love", "have", "see", "hear", "think", "go", "help", "more", "mom", "dad"],
    bucketHints: ["core", "actions", "feelings", "food_drink", "people", "communication_repair"]
  },
  "i want": {
    words: WANT_WORDS,
    bucketHints: ["food_drink", "actions", "places", "people", "play", "communication_repair"]
  },
  "i want to": {
    words: ACTION_WORDS,
    bucketHints: ["actions", "places", "play", "food_drink", "communication_repair"]
  },
  "i need": {
    words: BODY_NEED_WORDS,
    bucketHints: ["communication_repair", "body_pain", "food_drink", "people", "sensory", "medical_deep", "school"]
  },
  "i feel": {
    words: FEELING_WORDS,
    bucketHints: ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]
  },
  "i am": {
    words: ["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"],
    bucketHints: ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]
  },
  "i am feeling": {
    words: FEELING_WORDS,
    bucketHints: ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]
  },
  "i'm": {
    words: ["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"],
    bucketHints: ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]
  },
  "i'm feeling": {
    words: FEELING_WORDS,
    bucketHints: ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]
  },
  "want": {
    words: WANT_WORDS,
    bucketHints: ["food_drink", "actions", "places", "people", "play"]
  },
  "need": {
    words: BODY_NEED_WORDS,
    bucketHints: ["communication_repair", "body_pain", "food_drink", "people", "sensory"]
  },
  "help": {
    words: ["me", "please", "now", "with", "food", "drink", "water", "bathroom", "outside", "inside", "school", "tablet", "toy", "mom", "dad", "teacher"],
    bucketHints: ["communication_repair", "people", "school", "food_drink", "places"]
  },
  "go": {
    words: ["outside", "inside", "home", "school", "bathroom", "park", "car", "room", "to", "with", "now", "later", "please", "mom", "dad"],
    bucketHints: ["places", "transportation", "school", "community", "actions"]
  },
  "stop": {
    words: ["please", "that", "this", "now", "because", "I am scared", "I am hurt", "I need help", "too loud", "too much", "wait", "finished", "no", "safe", "break", "quiet", "space"],
    bucketHints: ["communication_repair", "regulation", "sensory", "emergency", "social_boundaries"]
  }
};

function clampLimit(value) {
  const number = Number(value || 24);
  if (!Number.isFinite(number)) return 24;
  return Math.max(4, Math.min(MAX_ACTIVE_OPTIONS, Math.round(number)));
}

function toSentenceText(profile = {}, options = {}) {
  if (options.phrase) return String(options.phrase || "").trim();
  const sentence = options.sentence || profile.sentence || [];
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

function lastWord(text = "") {
  const parts = normalizeTreeKey(text).split(" ").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function normalizePhraseVariants(text = "") {
  const clean = normalizeTreeKey(text)
    .replace(/i’m/g, "i'm")
    .replace(/\bi am\b/g, "i am")
    .trim();

  if (!clean) return [];

  const words = clean.split(" ").filter(Boolean);
  const variants = new Set([clean, lastWord(clean)]);

  for (let length = Math.min(4, words.length); length >= 1; length -= 1) {
    variants.add(words.slice(-length).join(" "));
  }

  return [...variants].filter(Boolean);
}

function bestRouteForText(text = "") {
  const variants = normalizePhraseVariants(text);
  const keys = Object.keys(NEXT_WORD_ROUTES_V5_30).sort((a, b) => b.length - a.length);

  for (const variant of variants) {
    const match = keys.find(routeKey => variant === routeKey || variant.endsWith(` ${routeKey}`));
    if (match) return { key: match, route: NEXT_WORD_ROUTES_V5_30[match], variants };
  }

  return { key: "", route: null, variants };
}

function hasStage(entry, stage) {
  return Array.isArray(entry?.stage_access) && entry.stage_access.includes(stage);
}

function entryLabel(entry = {}) {
  return entry.display_label || entry.label || "";
}

function normalizedArray(values = []) {
  return Array.isArray(values) ? values.map(value => normalizeTreeKey(value)).filter(Boolean) : [];
}

function textMatchesAny(text = "", candidates = []) {
  if (!text || !candidates.length) return false;
  return candidates.some(candidate => candidate && (text === candidate || text.endsWith(` ${candidate}`) || candidate.endsWith(` ${text}`)));
}

function entryMatchesContext(entry = {}, route = {}, phraseVariants = []) {
  const triggerPhrases = normalizedArray(entry.trigger_phrases);
  const showByContext = normalizedArray(entry.show_by_context);
  const relatedWords = normalizedArray(entry.related_words);
  const allSignals = [...triggerPhrases, ...showByContext, ...relatedWords];

  if (phraseVariants.some(variant => textMatchesAny(variant, allSignals))) return true;

  const bucketHints = route?.bucketHints || [];
  if (bucketHints.includes(entry.primary_branch)) return true;
  if (Array.isArray(entry.branches) && entry.branches.some(branch => bucketHints.includes(branch))) return true;

  return false;
}

function entryScore(entry = {}, route = {}, phraseVariants = [], profile = {}) {
  const label = entryLabel(entry);
  const labelKey = normalizeTreeKey(label);
  const usage = profile.usage || profile.wordUsage || {};
  const recents = new Set((profile.recentWords || []).map(normalizeTreeKey));
  const favorites = new Set((profile.favorites || []).map(normalizeTreeKey));
  const routeWords = new Set((route?.words || []).map(normalizeTreeKey));
  const bucketHints = new Set(route?.bucketHints || []);

  let score = 0;
  if (routeWords.has(labelKey)) score += 500;
  if (bucketHints.has(entry.primary_branch)) score += 120;
  if (Array.isArray(entry.branches) && entry.branches.some(branch => bucketHints.has(branch))) score += 70;
  if (normalizedArray(entry.trigger_phrases).some(signal => phraseVariants.includes(signal))) score += 90;
  if (normalizedArray(entry.show_by_context).some(signal => phraseVariants.includes(signal))) score += 40;
  score += (entry.prediction_weight || 0) * 100;
  score += Number(entry.v5_26_utility_score || 0) / 5;
  score += usage[label] || usage[labelKey] || 0;
  if (recents.has(labelKey)) score += 20;
  if (favorites.has(labelKey)) score += 40;
  if (entry.type === "word") score += 12;
  if (entry.type === "functional_phrase") score += 4;
  return score;
}

export function getStaticNextWordCandidatesV5_30(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  if (!phrase) return [];

  const { route } = bestRouteForText(phrase);
  const treeBranch = getDynamicBranch(options.sentence || profile.sentence || phrase.split(" "), options.activeContext || profile.activeContext || "");
  const routeWords = route?.words || [];

  return uniqueWords([...routeWords, ...treeBranch]).slice(0, clampLimit(options.limit));
}

export function getNextWordRouteDebugV5_30(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const routeMatch = bestRouteForText(phrase);
  return {
    version: NEXT_WORD_ASSUMPTION_VERSION,
    phrase,
    routeKey: routeMatch.key,
    variants: routeMatch.variants,
    staticWords: getStaticNextWordCandidatesV5_30(profile, options)
  };
}

export async function getNextWordAssumptionSliceV5_30Async(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const limit = clampLimit(options.limit);
  const stage = Number(options.stage || profile.communicationStage || profile.stage || profile.settings?.communicationStage || 1);

  if (!phrase) {
    return {
      version: NEXT_WORD_ASSUMPTION_VERSION,
      status: "waiting_for_sentence",
      visible: [],
      hiddenCount: 0,
      phrase: "",
      routeKey: "",
      source: "v5_30_next_word_assumption"
    };
  }

  const routeMatch = bestRouteForText(phrase);
  const staticWords = getStaticNextWordCandidatesV5_30(profile, { ...options, phrase, limit });
  let databaseWords = [];
  let matchedDatabaseCount = 0;

  try {
    const database = await getLanguageDatabaseV5_27Async();
    const entries = [
      ...NEXT_WORD_DATA_OVERLAY_V5_30,
      ...((database && Array.isArray(database.entries)) ? database.entries : [])
    ];

    const safeEntries = filterEntriesBySafetyV5_27(
      entries.filter(entry => hasStage(entry, stage)),
      profile,
      routeMatch.route?.bucketHints?.[0] || ""
    );

    const matched = safeEntries
      .filter(entry => entryMatchesContext(entry, routeMatch.route || {}, routeMatch.variants))
      .sort((a, b) => entryScore(b, routeMatch.route || {}, routeMatch.variants, profile) - entryScore(a, routeMatch.route || {}, routeMatch.variants, profile));

    matchedDatabaseCount = matched.length;
    databaseWords = matched.map(entryLabel).filter(Boolean);
  } catch (error) {
    return {
      version: NEXT_WORD_ASSUMPTION_VERSION,
      status: "database_load_error_static_fallback",
      visible: uniqueWords(staticWords).slice(0, limit),
      hiddenCount: 0,
      phrase,
      routeKey: routeMatch.key,
      error: error?.message || "Next-word database enrichment failed",
      source: "v5_30_next_word_assumption"
    };
  }

  const visible = uniqueWords([...staticWords, ...databaseWords]).slice(0, limit);

  return {
    version: NEXT_WORD_ASSUMPTION_VERSION,
    status: "ready",
    visible,
    hiddenCount: Math.max(0, matchedDatabaseCount - Math.max(0, limit - staticWords.length)),
    totalMatchedBeforeLimit: matchedDatabaseCount,
    phrase,
    routeKey: routeMatch.key,
    source: "v5_30_next_word_assumption"
  };
}

export default {
  NEXT_WORD_ASSUMPTION_VERSION,
  NEXT_WORD_DATA_OVERLAY_V5_30,
  NEXT_WORD_ROUTES_V5_30,
  getStaticNextWordCandidatesV5_30,
  getNextWordRouteDebugV5_30,
  getNextWordAssumptionSliceV5_30Async
};
