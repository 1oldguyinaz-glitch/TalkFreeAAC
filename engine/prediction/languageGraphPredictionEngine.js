// TalkFreeAAC V5.31 — Local Language Graph Prediction Engine
// Purpose: grammar-first next-word routing across the entire hidden language database.
// No external AI/API. The 10k vocabulary database stays lazy-loaded, stage-gated, and bucket-safe.

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
import {
  getSemanticGraphCandidateWordsV7_1,
  getSemanticGraphPredictionDebugV7_1
} from "./semanticGraphPredictionEngineV7_1.js";
import { getStaticSemanticConceptV7_1 } from "../language/semanticConceptGraphV7_1.js";

export const LANGUAGE_GRAPH_PREDICTION_VERSION = "7.1-semantic-language-graph";

const DEFAULT_LIMIT = 24;
const MAX_PHRASE_TAIL = 6;

const FEELING_WORDS = [
  "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "excited", "proud", "lonely",
  "safe", "frustrated", "okay", "hungry", "thirsty", "nervous", "calm", "upset", "worried", "confused"
];

const BODY_NEED_WORDS = [
  "help", "with", "this", "that", "it", "my", "me", "bathroom", "water", "food", "break",
  "quiet", "space", "medicine", "mom", "dad", "teacher", "doctor", "safe", "now",
  "please", "hurt", "sick", "scared"
];

const WANT_WORDS = [
  "this", "that", "it", "to", "with", "my", "more", "help", "food", "drink", "water",
  "outside", "play", "break", "a hug", "mom", "dad", "snack", "bathroom", "tablet",
  "toy", "music", "turn", "please"
];

const ACTION_WORDS = [
  "go", "play", "eat", "drink", "see", "watch", "read", "sit", "stand", "stop",
  "try", "talk", "help", "get", "do", "listen", "wait", "open", "close", "make"
];

const PEOPLE_WORDS = [
  "mom", "dad", "teacher", "friend", "doctor", "nurse", "grandma", "grandpa", "brother", "sister", "someone"
];

const QUESTION_WORDS = [
  "what", "where", "who", "when", "why", "how", "which", "can", "do", "is"
];

const REPAIR_WORDS = [
  "wrong word", "try again", "give me time", "I know but can't say it", "please wait", "not that", "yes", "no", "help"
];

const EMERGING_GRAMMAR_GLUE_WORDS = [
  "this", "that", "it", "you", "me", "my", "to", "with", "for"
];

const OWNERSHIP_WORDS = [
  "turn", "toy", "food", "drink", "water", "cup", "book", "tablet", "mom", "dad",
  "body", "hand", "foot", "room", "seat", "bag", "clothes", "shoes", "blanket"
];

export const LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31 = [
  {
    id: "v5_31_overlay_im_contraction",
    label: "I'm",
    display_label: "I'm",
    type: "word",
    subtype: "local_graph_overlay",
    part_of_speech: "word_or_compound",
    primary_branch: "grammar_language",
    branches: ["core", "grammar_language", "feelings"],
    stage_access: [1, 2, 3, 4, 5],
    trigger_phrases: ["I", "I am", "sentence_start", "home"],
    show_by_context: ["I", "core", "sentence", "sentence_start", "home"],
    related_words: ["I am", "feeling"],
    prediction_weight: 1.15,
    safety_level: "standard",
    parent_gated: false,
    requires_sensitive_unlock: false,
    requires_parent_unlock: false,
    requires_school_mode: false,
    requires_emergency_mode: false
  },
  {
    id: "v5_31_overlay_feeling_bridge",
    label: "feeling",
    display_label: "feeling",
    type: "word",
    subtype: "local_graph_overlay",
    part_of_speech: "word_or_compound",
    primary_branch: "feelings",
    branches: ["feelings", "grammar_language"],
    stage_access: [1, 2, 3, 4, 5],
    trigger_phrases: ["I'm", "I am", "I feel"],
    show_by_context: ["I'm", "I am", "I feel", "feelings"],
    related_words: FEELING_WORDS,
    prediction_weight: 1.2,
    safety_level: "standard",
    parent_gated: false,
    requires_sensitive_unlock: false,
    requires_parent_unlock: false,
    requires_school_mode: false,
    requires_emergency_mode: false
  }
];

const WORD_MIN_STAGE = {
  because: 3,
  then: 3,
  when: 3,
  with: 1,
  for: 1,
  without: 4,
  if: 4,
  privacy: 4,
  relationship: 4,
  opinion: 4,
  schedule: 4,
  work: 4,
  money: 4,
  transportation: 4,
  medicine: 2,
  doctor: 2,
  "wrong word": 4,
  "give me time": 4,
  "i know but can't say it": 5
};

function route(words, bucketHints = [], extra = {}) {
  return { words, bucketHints, ...extra };
}

export const LOCAL_GRAMMAR_GRAPH_V5_31 = {
  "i": route(
    ["want", "need", "am", "I'm", "feel", "like", "have", "can", "don't", "love", ...EMERGING_GRAMMAR_GLUE_WORDS, "go", "help", "more"],
    ["grammar_language", "actions", "feelings", "communication_repair", "food_drink", "people"]
  ),
  "i want": route(WANT_WORDS, ["food_drink", "actions", "places", "people", "play", "communication_repair"]),
  "i want to": route(ACTION_WORDS, ["actions", "expanded_verbs", "places", "play", "food_drink", "communication_repair"]),
  "i need": route(BODY_NEED_WORDS, ["communication_repair", "body_pain", "food_drink", "people", "sensory", "medical_deep", "school"]),
  "i need to": route(ACTION_WORDS, ["actions", "expanded_verbs", "communication_repair", "places", "school"]),
  "i feel": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "i am": route(["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"], ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]),
  "i am feeling": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "i'm": route(["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"], ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]),
  "im": route(["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"], ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]),
  "i'm feeling": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "im feeling": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "want": route(WANT_WORDS, ["food_drink", "actions", "places", "people", "play"]),
  "want to": route(ACTION_WORDS, ["actions", "expanded_verbs", "places", "play", "food_drink"]),
  "i want to have": route(["this", "that", "it", "food", "drink", "help", "a break", "my turn", "time", "fun", "you", "something different"], ["things", "food_drink", "actions", "places", "people", "play", "social"]),
  "want to have": route(["this", "that", "it", "food", "drink", "help", "a break", "my turn", "time", "fun", "you", "something different"], ["things", "food_drink", "actions", "places", "people", "play", "social"]),
  "need": route(BODY_NEED_WORDS, ["communication_repair", "body_pain", "food_drink", "people", "sensory", "medical_deep"]),
  "need to": route(ACTION_WORDS, ["actions", "expanded_verbs", "communication_repair", "places"]),
  "am": route(["feeling", ...FEELING_WORDS, "ready", "not ready", "done", "waiting"], ["feelings", "regulation", "states_conditions", "body_pain", "grammar_language"]),
  "feel": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "feeling": route(FEELING_WORDS, ["feelings", "regulation", "body_pain", "states_conditions", "sensory"]),
  "have": route(["this", "that", "it", "food", "drink", "help", "time", "a question", "an idea", "pain", "my turn", "something to say"], ["things", "food_drink", "actions", "places", "people", "body_pain", "social"]),
  "i have": route(["this", "that", "it", "food", "drink", "help", "time", "a question", "an idea", "pain", "my turn", "something to say"], ["things", "food_drink", "actions", "places", "people", "body_pain", "social"]),
  "can": route(["I", "you", "we", "go", "have", "help", "play", "eat", "drink", "watch", "stop", "try"], ["grammar_language", "actions", "communication_repair"]),
  "don't": route(["want", "like", "know", "feel", "need", "touch", "stop", "go"], ["grammar_language", "choice_preference", "actions", "communication_repair"]),
  "i like": route(["this", "that", "it", "you", "my", "with", "food", "drink", "music", "play", "more", "because"], ["choice_preference", "food_drink", "play", "social", "grammar_language", "people"]),
  "like": route(["this", "that", "it", "you", "my", "with", "food", "music", "play", "more", "because"], ["choice_preference", "food_drink", "play", "social", "grammar_language"]),
  "my": route(OWNERSHIP_WORDS, ["things", "people", "body_pain", "places", "food_drink"]),
  "you": route(["help", "me", "stop", "go", "come", "look", "wait", "like", "want", "need", "with", "this", "that"], ["people", "actions", "communication_repair", "grammar_language"]),
  "this": route(["one", "is", "that", "hurts", "feels", "looks", "with", "please", "help"], ["grammar_language", "things", "sensory", "communication_repair"]),
  "that": route(["one", "is", "this", "hurts", "feels", "looks", "with", "please", "help"], ["grammar_language", "things", "sensory", "communication_repair"]),
  "with": route(["me", "you", "this", "that", "mom", "dad", "teacher", "friend", "help"], ["grammar_language", "people", "communication_repair"]),
  "go": route(["outside", "inside", "home", "school", "bathroom", "park", "car", "room", "to", "with", "now", "later", "please"], ["places", "transportation", "school", "community", "actions"]),
  "help": route(["me", "please", "now", "with", "food", "drink", "water", "bathroom", "outside", "inside", "school", "tablet", "toy", ...PEOPLE_WORDS], ["communication_repair", "people", "school", "food_drink", "places"]),
  "stop": route(["please", "that", "this", "now", "because", "I am scared", "I am hurt", "I need help", "too loud", "too much", "wait", "finished", "no", "safe", "break", "quiet", "space"], ["communication_repair", "regulation", "sensory", "emergency", "social_boundaries"]),
  "where": route(["is", "are", "mom", "dad", "bathroom", "home", "school", "my", "it"], ["questions", "people", "places"]),
  "what": route(["is", "are", "happened", "time", "next", "this", "that", "do"], ["questions", "grammar_language", "communication_repair"]),
  "who": route(["is", "are", "can", "will", ...PEOPLE_WORDS], ["questions", "people", "social"]),
  "why": route(["is", "are", "did", "can't", "not", "because"], ["questions", "grammar_language", "communication_repair"]),
  "how": route(["do", "can", "much", "many", "long", "are", "is"], ["questions", "grammar_language"]),
  "wrong": route(REPAIR_WORDS, ["communication_repair"]),
  "try": route(["again", "this", "that", "please", "later", "with", "me"], ["communication_repair", "actions"]),
  "because": route(["I", "it", "you", "we", "my", "the", "I feel", "I need", "I want"], ["grammar_language", "feelings", "communication_repair"])
};

let graphIndexCache = null;
let graphIndexSourceSize = 0;

function clampLimit(value) {
  const number = Number(value || DEFAULT_LIMIT);
  if (!Number.isFinite(number)) return DEFAULT_LIMIT;
  return Math.max(4, Math.min(MAX_ACTIVE_OPTIONS, Math.round(number)));
}

function normalizeText(value = "") {
  return normalizeTreeKey(value)
    .replace(/[’]/g, "'")
    .replace(/\bi\s*m\b/g, "i'm")
    .replace(/\bim\b/g, "i'm")
    .replace(/\bi am\b/g, "i am")
    .replace(/\s+/g, " ")
    .trim();
}

function displayWord(value = "") {
  const clean = String(value || "").trim();
  const normalized = normalizeText(clean);
  if (normalized === "i'm" || normalized === "im") return "I'm";
  if (normalized === "i") return "I";
  return clean;
}

function entryLabel(entry = {}) {
  return entry.display_label || entry.label || "";
}

function toSentenceText(profile = {}, options = {}) {
  if (options.phrase) return String(options.phrase || "").trim();
  const sentence = options.sentence || profile.sentence || [];
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

function wordMinStage(word = "") {
  const key = normalizeText(word);
  return WORD_MIN_STAGE[key] || 1;
}

function wordAllowedByStage(word = "", stage = 1) {
  const concept = getStaticSemanticConceptV7_1(word);
  if (concept?.stage_access?.length) return concept.stage_access.includes(stage);
  return stage >= wordMinStage(word);
}

function splitWords(text = "") {
  return normalizeText(text)
    .replace(/___+/g, " ")
    .replace(/[^a-z0-9'\s]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function addToMapArray(map, key, value) {
  if (!key) return;
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
}

function addScore(map, label, score, source, entry = null) {
  const cleanLabel = displayWord(label);
  const key = normalizeText(cleanLabel);
  if (!key || key === "___" || key.length > 80) return;

  const current = map.get(key) || {
    label: cleanLabel,
    key,
    score: 0,
    sources: new Set(),
    entries: []
  };

  current.score += score;
  if (source) current.sources.add(source);
  if (entry) current.entries.push(entry);
  map.set(key, current);
}

function normalizeSignalArray(values = []) {
  return Array.isArray(values) ? values.map(normalizeText).filter(Boolean) : [];
}

function hasStage(entry, stage) {
  return Array.isArray(entry?.stage_access) && entry.stage_access.includes(stage);
}

function stageFrom(profile = {}, options = {}) {
  const raw = options.stage || profile.communicationStage || profile.stage || profile.settings?.communicationStage || 1;
  const stage = Number(raw);
  if (!Number.isFinite(stage)) return 1;
  return Math.max(1, Math.min(5, Math.round(stage)));
}

function isAdultTone(profile = {}) {
  const ageBand = profile?.settings?.ageBand || profile?.ageBand || profile?.userProfile?.ageBand || "";
  return ["teen", "adult", "aphasia_recovery"].includes(ageBand);
}

function phraseVariants(text = "") {
  const clean = normalizeText(text);
  if (!clean) return [];

  const words = clean.split(" ").filter(Boolean);
  const variants = new Set([clean]);

  const expanded = clean.replace(/\bi'm\b/g, "i am");
  const contracted = clean.replace(/\bi am\b/g, "i'm");
  variants.add(expanded);
  variants.add(contracted);
  variants.add(words[words.length - 1] || clean);

  for (let length = Math.min(MAX_PHRASE_TAIL, words.length); length >= 1; length -= 1) {
    const tail = words.slice(-length).join(" ");
    variants.add(tail);
    variants.add(tail.replace(/\bi'm\b/g, "i am"));
    variants.add(tail.replace(/\bi am\b/g, "i'm"));
  }

  return [...variants].filter(Boolean);
}

function routeForPhrase(text = "") {
  const variants = phraseVariants(text);
  const routeKeys = Object.keys(LOCAL_GRAMMAR_GRAPH_V5_31)
    .sort((a, b) => b.split(" ").length - a.split(" ").length || b.length - a.length);

  for (const variant of variants) {
    const exact = routeKeys.find(key => variant === key);
    if (exact) return { key: exact, route: LOCAL_GRAMMAR_GRAPH_V5_31[exact], variants };

    const suffix = routeKeys.find(key => variant.endsWith(` ${key}`));
    if (suffix) return { key: suffix, route: LOCAL_GRAMMAR_GRAPH_V5_31[suffix], variants };
  }

  return { key: "", route: null, variants };
}

function shouldIndexLabelAsPhrase(entry = {}) {
  if (!entry || entry.type === "word") return false;
  const label = entryLabel(entry);
  const words = splitWords(label);
  return words.length >= 2 && words.length <= 14;
}

function buildGraphIndex(database = { entries: [] }) {
  const databaseEntries = Array.isArray(database.entries) ? database.entries : [];
  const entries = [...LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31, ...databaseEntries];

  const index = {
    allEntries: entries,
    bySignal: new Map(),
    byBucket: new Map(),
    byLabel: new Map(),
    continuations: new Map()
  };

  for (const entry of entries) {
    const label = entryLabel(entry);
    const labelKey = normalizeText(label);
    if (!labelKey) continue;

    addToMapArray(index.byLabel, labelKey, entry);

    const branches = [entry.primary_branch, ...(Array.isArray(entry.branches) ? entry.branches : [])]
      .filter(Boolean);
    for (const branch of branches) addToMapArray(index.byBucket, branch, entry);

    const signals = [
      ...normalizeSignalArray(entry.trigger_phrases),
      ...normalizeSignalArray(entry.show_by_context),
      ...normalizeSignalArray(entry.related_words)
    ];
    for (const signal of signals) addToMapArray(index.bySignal, signal, entry);

    if (shouldIndexLabelAsPhrase(entry)) {
      const words = splitWords(label);
      for (let prefixLength = 1; prefixLength < Math.min(words.length, MAX_PHRASE_TAIL + 1); prefixLength += 1) {
        const prefix = words.slice(0, prefixLength).join(" ");
        const next = words[prefixLength];
        if (next && next !== "___") {
          addToMapArray(index.continuations, prefix, {
            label: displayWord(next),
            entry,
            score: entry.type === "sentence_template" ? 210 : 170
          });
        }
      }
    }
  }

  graphIndexCache = index;
  graphIndexSourceSize = databaseEntries.length;
  return index;
}

function getGraphIndex(database = { entries: [] }) {
  const size = Array.isArray(database.entries) ? database.entries.length : 0;
  if (graphIndexCache && graphIndexSourceSize === size) return graphIndexCache;
  return buildGraphIndex(database);
}

function profileUsageScore(label = "", profile = {}) {
  const key = normalizeText(label);
  const usage = profile.usage || profile.wordUsage || {};
  const keyboardSignals = profile.keyboardLearningSignals || {};
  const recents = new Set((profile.recentWords || []).map(normalizeText));
  const favorites = new Set((profile.favorites || []).map(normalizeText));

  return (usage[label] || usage[key] || 0) +
    (keyboardSignals[label] || keyboardSignals[key] || 0) +
    (recents.has(key) ? 25 : 0) +
    (favorites.has(key) ? 60 : 0);
}

function entryBaseScore(entry = {}, routeMatch = {}, phraseSignals = []) {
  const label = entryLabel(entry);
  const labelKey = normalizeText(label);
  const routeWords = new Set((routeMatch.route?.words || []).map(normalizeText));
  const bucketHints = new Set(routeMatch.route?.bucketHints || []);
  const signals = [
    ...normalizeSignalArray(entry.trigger_phrases),
    ...normalizeSignalArray(entry.show_by_context),
    ...normalizeSignalArray(entry.related_words)
  ];

  let score = 0;
  if (routeWords.has(labelKey)) score += 520;
  if (bucketHints.has(entry.primary_branch)) score += 125;
  if (Array.isArray(entry.branches) && entry.branches.some(branch => bucketHints.has(branch))) score += 80;
  if (signals.some(signal => phraseSignals.includes(signal))) score += 180;
  if (signals.some(signal => phraseSignals.some(phrase => phrase.endsWith(` ${signal}`) || signal.endsWith(` ${phrase}`)))) score += 70;
  score += (entry.prediction_weight || 0) * 100;
  score += Number(entry.v5_26_utility_score || 0) / 5;
  if (entry.visible_by_default) score += 10;
  if (entry.type === "word") score += 25;
  if (entry.type === "functional_phrase") score += 8;
  if (entry.type === "sentence_template") score -= 80;

  return score;
}

function allowedEntries(entries = [], profile = {}, stage = 1, bucket = "") {
  const staged = entries.filter(entry => hasStage(entry, stage));
  return filterEntriesBySafetyV5_27(staged, profile, bucket);
}

function labelAllowedByDatabase(label = "", index, profile = {}, stage = 1, bucket = "") {
  const entries = index.byLabel.get(normalizeText(label)) || [];
  if (!entries.length) return { allowed: wordAllowedByStage(label, stage), entries: [] };
  const safe = allowedEntries(entries, profile, stage, bucket);
  return { allowed: safe.length > 0, entries: safe };
}

function addSemanticGraphCandidates(candidateMap, profile = {}, options = {}, stage = 1) {
  const semanticWords = getSemanticGraphCandidateWordsV7_1(profile, {
    ...options,
    stage,
    directLimit: Math.min(MAX_ACTIVE_OPTIONS, Number(options.limit || DEFAULT_LIMIT) + 8)
  });
  semanticWords.forEach((word, index) => {
    if (!wordAllowedByStage(word, stage)) return;
    addScore(candidateMap, word, 920 - index * 9, "v7.1-semantic-graph");
  });
}

function addGrammarCandidates(candidateMap, routeMatch = {}, profile = {}, stage = 1) {
  const routeWords = routeMatch.route?.words || [];
  routeWords.forEach((word, index) => {
    if (!wordAllowedByStage(word, stage)) return;
    addScore(candidateMap, word, 700 - index * 8, "grammar-route");
  });

  if (!routeMatch.route && routeMatch.variants?.length) {
    const final = routeMatch.variants[0]?.split(" ").pop();
    const fallback = LOCAL_GRAMMAR_GRAPH_V5_31[final];
    if (fallback) {
      fallback.words.forEach((word, index) => {
        if (!wordAllowedByStage(word, stage)) return;
        addScore(candidateMap, word, 450 - index * 5, "grammar-fallback");
      });
    }
  }
}

function addTreeFallbackCandidates(candidateMap, profile = {}, options = {}, stage = 1) {
  const phrase = toSentenceText(profile, options);
  const sentence = options.sentence || profile.sentence || (phrase ? phrase.split(" ") : []);
  const treeBranch = getDynamicBranch(sentence, options.activeContext || profile.activeContext || "");
  treeBranch.forEach((word, index) => {
    if (!wordAllowedByStage(word, stage)) return;
    addScore(candidateMap, word, 260 - index * 4, "legacy-dynamic-tree");
  });
}

function addDatabaseCandidates(candidateMap, index, routeMatch = {}, profile = {}, stage = 1) {
  const bucket = routeMatch.route?.bucketHints?.[0] || "";
  const variants = routeMatch.variants || [];

  for (const variant of variants) {
    const signalEntries = index.bySignal.get(variant) || [];
    const safeSignalEntries = allowedEntries(signalEntries, profile, stage, bucket)
      .filter(entry => entry.type !== "sentence_template");

    for (const entry of safeSignalEntries) {
      addScore(candidateMap, entryLabel(entry), entryBaseScore(entry, routeMatch, variants) + 190, "database-signal", entry);
    }

    const continuationRows = index.continuations.get(variant) || [];
    for (const row of continuationRows) {
      if (!wordAllowedByStage(row.label, stage)) continue;
      const dbGate = labelAllowedByDatabase(row.label, index, profile, stage, bucket);
      if (!dbGate.allowed) continue;
      addScore(candidateMap, row.label, row.score + 230, "database-phrase-continuation", row.entry);
    }
  }

  const routeWords = routeMatch.route?.words || [];
  for (const word of routeWords) {
    const dbGate = labelAllowedByDatabase(word, index, profile, stage, bucket);
    if (dbGate.allowed && dbGate.entries.length) {
      dbGate.entries.forEach(entry => addScore(candidateMap, word, entryBaseScore(entry, routeMatch, variants) + 120, "database-label-match", entry));
    }
  }

  const bucketHints = routeMatch.route?.bucketHints || [];
  for (const hint of bucketHints) {
    const bucketEntries = allowedEntries(index.byBucket.get(hint) || [], profile, stage, hint)
      .filter(entry => entry.type !== "sentence_template")
      .slice(0, 80);

    for (const entry of bucketEntries) {
      addScore(candidateMap, entryLabel(entry), entryBaseScore(entry, routeMatch, variants), "database-bucket-fill", entry);
    }
  }
}

function finalizeCandidates(candidateMap, index, profile = {}, stage = 1, limit = DEFAULT_LIMIT, routeMatch = {}) {
  const adultTone = isAdultTone(profile);
  const currentWords = new Set((routeMatch.variants?.[0] || "").split(" ").map(normalizeText));
  const bucket = routeMatch.route?.bucketHints?.[0] || "";

  return [...candidateMap.values()]
    .map(candidate => {
      const dbGate = labelAllowedByDatabase(candidate.label, index, profile, stage, bucket);
      const entryBoost = dbGate.entries.reduce((sum, entry) => sum + entryBaseScore(entry, routeMatch, routeMatch.variants || []) / 12, 0);
      const adultBoost = adultTone && ["doctor", "medicine", "work", "privacy", "schedule", "wrong word", "give me time", "I know but can't say it"].includes(candidate.label) ? 30 : 0;
      return {
        ...candidate,
        score: candidate.score + profileUsageScore(candidate.label, profile) + entryBoost + adultBoost,
        entries: [...candidate.entries, ...dbGate.entries]
      };
    })
    .filter(candidate => {
      const key = normalizeText(candidate.label);
      if (!key || key === "___") return false;
      if (currentWords.has(key) && !["more", "again", "please"].includes(key)) return false;
      if (!wordAllowedByStage(candidate.label, stage)) return false;
      const dbGate = labelAllowedByDatabase(candidate.label, index, profile, stage, bucket);
      return dbGate.allowed;
    })
    .sort((a, b) => b.score - a.score)
    .map(candidate => candidate.label)
    .filter(Boolean)
    .filter((word, index, array) => array.findIndex(other => normalizeText(other) === normalizeText(word)) === index)
    .slice(0, limit);
}

export function getStaticLanguageGraphCandidatesV5_31(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  if (!phrase) return [];

  const stage = stageFrom(profile, options);
  const limit = clampLimit(options.limit);
  const routeMatch = routeForPhrase(phrase);
  const candidates = [];

  // V7.1 meaning-first lane: direct semantic relations and high-value context words.
  candidates.push(...getSemanticGraphCandidateWordsV7_1(profile, {
    ...options,
    phrase,
    stage,
    directLimit: Math.min(MAX_ACTIVE_OPTIONS, limit + 8)
  }));

  // Preserve the proven V5.31 grammar route and legacy tree as fallbacks.
  if (routeMatch.route?.words?.length) candidates.push(...routeMatch.route.words);

  const sentence = options.sentence || profile.sentence || phrase.split(" ");
  candidates.push(...getDynamicBranch(sentence, options.activeContext || profile.activeContext || ""));

  return uniqueWords(candidates)
    .filter(word => wordAllowedByStage(word, stage))
    .slice(0, limit);
}

export function getLanguageGraphRouteDebugV5_31(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const routeMatch = routeForPhrase(phrase);
  return {
    version: LANGUAGE_GRAPH_PREDICTION_VERSION,
    phrase,
    routeKey: routeMatch.key,
    variants: routeMatch.variants,
    semantic: getSemanticGraphPredictionDebugV7_1(profile, { ...options, phrase }),
    staticWords: getStaticLanguageGraphCandidatesV5_31(profile, options)
  };
}

export async function getLanguageGraphPredictionSliceV5_31Async(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const limit = clampLimit(options.limit);
  const stage = stageFrom(profile, options);

  if (!phrase) {
    return {
      version: LANGUAGE_GRAPH_PREDICTION_VERSION,
      status: "waiting_for_sentence",
      visible: [],
      hiddenCount: 0,
      phrase: "",
      routeKey: "",
      source: "v5_31_local_language_graph"
    };
  }

  const routeMatch = routeForPhrase(phrase);
  const candidateMap = new Map();

  addSemanticGraphCandidates(candidateMap, profile, { ...options, phrase }, stage);
  addGrammarCandidates(candidateMap, routeMatch, profile, stage);
  addTreeFallbackCandidates(candidateMap, profile, { ...options, phrase }, stage);

  let databaseCandidateCount = 0;

  try {
    const database = await getLanguageDatabaseV5_27Async();
    const index = getGraphIndex(database);
    addDatabaseCandidates(candidateMap, index, routeMatch, profile, stage);
    databaseCandidateCount = candidateMap.size;

    const visible = finalizeCandidates(candidateMap, index, profile, stage, limit, routeMatch);

    return {
      version: LANGUAGE_GRAPH_PREDICTION_VERSION,
      status: "ready",
      visible,
      hiddenCount: Math.max(0, databaseCandidateCount - visible.length),
      totalMatchedBeforeLimit: databaseCandidateCount,
      phrase,
      routeKey: routeMatch.key,
      variants: routeMatch.variants,
      engineBreakdown: {
        grammar: routeMatch.route?.words?.length || 0,
        databaseGraph: databaseCandidateCount,
        stage,
        bucketHints: routeMatch.route?.bucketHints || []
      },
      source: "v5_31_local_language_graph"
    };
  } catch (error) {
    const fallback = getStaticLanguageGraphCandidatesV5_31(profile, { ...options, phrase, stage, limit });
    return {
      version: LANGUAGE_GRAPH_PREDICTION_VERSION,
      status: "database_load_error_static_fallback",
      visible: fallback,
      hiddenCount: 0,
      phrase,
      routeKey: routeMatch.key,
      error: error?.message || "Language graph database enrichment failed",
      source: "v5_31_local_language_graph"
    };
  }
}

export default {
  LANGUAGE_GRAPH_PREDICTION_VERSION,
  LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31,
  LOCAL_GRAMMAR_GRAPH_V5_31,
  getStaticLanguageGraphCandidatesV5_31,
  getLanguageGraphRouteDebugV5_31,
  getLanguageGraphPredictionSliceV5_31Async
};
