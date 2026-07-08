// TalkFreeAAC V5.32 — Semantic Bucket Router
// Purpose: classify ambiguous next-word routes into callable meaning buckets.
// Example: "I'm feeling" -> Emotion / Body / Temperature / Texture / Pain / Mental Care.
// No external AI/API. Buckets remain local, lazy-loaded, stage-gated, and privacy-safe.

import {
  filterEntriesBySafetyV5_27,
  getLanguageDatabaseV5_27Async,
  MAX_ACTIVE_OPTIONS
} from "../language/languageDatabaseRouterV5_27.js";

export const SEMANTIC_BUCKET_ROUTER_VERSION = "5.32-semantic-bucket-router";

const DEFAULT_BUCKET_LIMIT_BY_STAGE = {
  1: 4,
  2: 6,
  3: 8,
  4: 10,
  5: 8
};

const DEFAULT_WORD_LIMIT = 24;

function key(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^a-z0-9'/_ -]+/g, " ")
    .replace(/\bi\s*m\b/g, "i'm")
    .replace(/\bim\b/g, "i'm")
    .replace(/\bit's\b/g, "it is")
    .replace(/\s+/g, " ")
    .trim();
}

function stageFrom(profile = {}, options = {}) {
  const raw = options.stage || profile.communicationStage || profile.stage || profile.settings?.communicationStage || 1;
  const stage = Number(raw);
  if (!Number.isFinite(stage)) return 1;
  return Math.max(1, Math.min(5, Math.round(stage)));
}

function clampLimit(value, fallback = DEFAULT_WORD_LIMIT) {
  const number = Number(value || fallback);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(1, Math.min(MAX_ACTIVE_OPTIONS, Math.round(number)));
}

function toSentenceText(profile = {}, options = {}) {
  if (options.phrase) return String(options.phrase || "").trim();
  const sentence = options.sentence || profile.sentence || [];
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

function splitWords(text = "") {
  return key(text).split(/\s+/).filter(Boolean);
}

function phraseVariants(text = "") {
  const clean = key(text);
  if (!clean) return [];

  const words = clean.split(" ").filter(Boolean);
  const variants = new Set([clean]);

  variants.add(clean.replace(/\bi'm\b/g, "i am"));
  variants.add(clean.replace(/\bi am\b/g, "i'm"));
  variants.add(words[words.length - 1] || clean);

  for (let length = Math.min(6, words.length); length >= 1; length -= 1) {
    const tail = words.slice(-length).join(" ");
    variants.add(tail);
    variants.add(tail.replace(/\bi'm\b/g, "i am"));
    variants.add(tail.replace(/\bi am\b/g, "i'm"));
  }

  return [...variants].filter(Boolean);
}

function displayLabel(value = "") {
  const clean = String(value || "").trim();
  const normalized = key(clean);
  if (normalized === "i") return "I";
  if (normalized === "i'm") return "I'm";
  return clean;
}

function entryLabel(entry = {}) {
  return entry.display_label || entry.label || "";
}

function hasStage(entry = {}, stage = 1) {
  return Array.isArray(entry.stage_access) && entry.stage_access.includes(stage);
}

function intersects(listA = [], listB = []) {
  const set = new Set(listA.filter(Boolean));
  return listB.some(item => set.has(item));
}

function normalizeFallback(value) {
  if (typeof value === "string") return { label: value, minStage: 1 };
  return {
    label: value?.label || "",
    minStage: value?.minStage || 1,
    maxStage: value?.maxStage || 5
  };
}

export const SEMANTIC_BUCKETS_V5_32 = {
  emotion: {
    id: "emotion",
    label: "Emotion",
    description: "Feelings as emotions.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["feelings", "regulation"],
    fallback: ["happy", "sad", "mad", "scared", "calm", "excited", "frustrated", { label: "anxious", minStage: 3 }, "lonely", "proud", "worried", "okay"]
  },
  body_state: {
    id: "body_state",
    label: "Body",
    description: "Internal body states and physical sensations.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["body_pain", "states_conditions", "personal_care"],
    fallback: ["hungry", "thirsty", "tired", "dizzy", "weak", "shaky", "itchy", "sweaty", "full", "sleepy"]
  },
  temperature: {
    id: "temperature",
    label: "Temperature",
    description: "Hot, cold, warm, freezing, and weather/body temperature language.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["temperature", "weather_clothing", "states_conditions"],
    fallback: ["hot", "cold", "warm", "freezing", "sweaty", "too hot", "too cold", "cool", "burning"]
  },
  texture_sensory: {
    id: "texture_sensory",
    label: "Texture / Sensory",
    description: "Touch, texture, sensory overload, and environmental input.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["sensory", "descriptors", "expanded_descriptors"],
    fallback: ["sticky", "wet", "dry", "hard", "soft", "scratchy", "tight", "loud", "bright", "too much", "quiet", "comfortable"]
  },
  pain: {
    id: "pain",
    label: "Pain",
    description: "Pain quality, pain location, and hurt words.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["body_pain", "medical_deep", "emergency"],
    fallback: ["hurt", "pain", "sore", "burning", "sharp", "pressure", "stomach", "head", "throat", "ear", "back", "leg"]
  },
  sick_health: {
    id: "sick_health",
    label: "Sick / Health",
    description: "Sick, medical, medicine, and health state language.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["medical_deep", "states_conditions", "body_pain", "personal_care"],
    fallback: ["sick", "nauseous", "dizzy", "medicine", "doctor", "nurse", "throw up", "cough", "fever", "allergy"]
  },
  energy: {
    id: "energy",
    label: "Energy",
    description: "Energy level, fatigue, readiness, and regulation state.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["states_conditions", "regulation", "behavior_support"],
    fallback: ["tired", "ready", "not ready", "sleepy", "awake", "calm", "busy", "slow", "fast", "done"]
  },
  mental_care: {
    id: "mental_care",
    label: "Mental Care",
    description: "Overwhelm, anxiety, confusion, safety, and regulation support.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["regulation", "behavior_support", "communication_repair", "safety_sensitive"],
    fallback: ["overwhelmed", "confused", "unsafe", "need break", "give me time", "please wait", "too much", "quiet", "space", "safe"]
  },
  food_drink: {
    id: "food_drink",
    label: "Food / Drink",
    description: "Food, drink, snacks, groceries, and cooking words.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["food_drink", "grocery", "food_cooking_deep"],
    fallback: ["food", "drink", "water", "snack", "juice", "milk", "apple", "pizza", "chips", "more"]
  },
  activity: {
    id: "activity",
    label: "Activity",
    description: "Actions, play, movement, and activities.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["actions", "expanded_verbs", "play", "sports_movement"],
    fallback: ["play", "go", "watch", "read", "run", "walk", "sit", "stand", "open", "close", "try", "help"]
  },
  place: {
    id: "place",
    label: "Place",
    description: "Places, movement destinations, and community locations.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["places", "community", "community_errands", "transportation", "travel_navigation"],
    fallback: ["outside", "inside", "home", "school", "bathroom", "park", "car", "room", "store"]
  },
  person: {
    id: "person",
    label: "Person",
    description: "People, names, relationships, and helpers.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["people", "social", "relationships"],
    fallback: ["mom", "dad", "teacher", "friend", "doctor", "nurse", "grandma", "grandpa", "brother", "sister", "someone"]
  },
  object: {
    id: "object",
    label: "Object",
    description: "Objects, toys, household items, and things.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["household", "household_items_deep", "play", "technology_media", "accessibility_devices"],
    fallback: ["tablet", "toy", "phone", "blanket", "cup", "book", "chair", "bed", "charger", "device"]
  },
  help_support: {
    id: "help_support",
    label: "Help",
    description: "Help, repair, support, and assistance phrases.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["communication_repair", "life_skills", "accessibility_devices"],
    fallback: ["help", "help me", "please", "wait", "try again", "wrong word", "show me", "fix it", "open", "close"]
  },
  break_regulation: {
    id: "break_regulation",
    label: "Break",
    description: "Breaks, quiet, space, stop, and regulation supports.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["regulation", "behavior_support", "sensory", "communication_repair"],
    fallback: ["break", "quiet", "space", "stop", "finished", "done", "too much", "wait", "safe", "calm"]
  },
  device_media: {
    id: "device_media",
    label: "Device / Media",
    description: "Technology, media, shows, music, games, and devices.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["technology_media", "play", "digital_safety", "accessibility_devices"],
    fallback: ["tablet", "phone", "music", "show", "game", "video", "charger", "TV", "headphones"]
  },
  bathroom_care: {
    id: "bathroom_care",
    label: "Bathroom / Care",
    description: "Bathroom, hygiene, personal care, and body care.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["personal_care", "body_pain", "life_skills"],
    fallback: ["bathroom", "toilet", "wash", "hands", "shower", "brush teeth", "change", "clean", "privacy"]
  },
  safety: {
    id: "safety",
    label: "Safety",
    description: "Emergency, unsafe, stop, help, and safety language.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["emergency", "emergency_deep", "safety_sensitive", "communication_repair", "social_boundaries"],
    fallback: ["help", "stop", "unsafe", "safe", "hurt", "call someone", "emergency", "no", "go away", "I need help"]
  },
  question: {
    id: "question",
    label: "Question",
    description: "Question words and question building.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["questions", "grammar_language", "communication_repair"],
    fallback: ["what", "where", "who", "when", "why", "how", "which", "can", "do", "is"]
  },
  weather: {
    id: "weather",
    label: "Weather",
    description: "Weather, clothing, and outdoor conditions.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["weather_clothing", "temperature", "science_nature"],
    fallback: ["sunny", "rainy", "snow", "windy", "hot", "cold", "cloudy", "jacket", "umbrella"]
  },
  color_size: {
    id: "color_size",
    label: "Color / Size",
    description: "Colors, sizes, shapes, and descriptors.",
    stage_access: [1, 2, 3, 4, 5],
    branches: ["descriptors", "expanded_descriptors"],
    fallback: ["big", "small", "red", "blue", "green", "yellow", "black", "white", "round", "long"]
  },
  time_routine: {
    id: "time_routine",
    label: "Time / Routine",
    description: "Time, sequence, schedule, and routines.",
    stage_access: [2, 3, 4, 5],
    branches: ["time_routines", "grammar_language", "life_skills"],
    fallback: [{ label: "now", minStage: 1 }, "later", "next", "before", "after", "morning", "night", "schedule", "today", "tomorrow"]
  },
  school_work: {
    id: "school_work",
    label: "School / Work",
    description: "School, academics, work, tasks, and vocation.",
    stage_access: [2, 3, 4, 5],
    branches: ["school", "academic_deep", "reading_writing", "math_deep", "work_vocational"],
    fallback: ["school", "teacher", "class", "work", "homework", "read", "write", "math", "finished", "help"]
  }
};

export const SEMANTIC_BUCKET_ROUTES_V5_32 = {
  "i feel": ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"],
  "feel": ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"],
  "feeling": ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"],
  "i am feeling": ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"],
  "i'm feeling": ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"],
  "i am": ["emotion", "body_state", "energy", "activity", "place", "person"],
  "i'm": ["emotion", "body_state", "energy", "activity", "place", "person"],

  "i want": ["food_drink", "activity", "place", "person", "object", "help_support", "break_regulation", "device_media"],
  "want": ["food_drink", "activity", "place", "person", "object", "help_support", "break_regulation", "device_media"],
  "i want to": ["activity", "place", "person", "help_support", "break_regulation", "device_media"],
  "want to": ["activity", "place", "person", "help_support", "break_regulation", "device_media"],

  "i need": ["help_support", "bathroom_care", "food_drink", "body_state", "medical", "break_regulation", "person", "device_media", "safety"],
  "need": ["help_support", "bathroom_care", "food_drink", "body_state", "sick_health", "break_regulation", "person", "device_media", "safety"],
  "i need help": ["body_state", "pain", "bathroom_care", "device_media", "school_work", "person", "safety", "help_support"],
  "help": ["body_state", "pain", "bathroom_care", "device_media", "school_work", "person", "safety", "help_support"],

  "i like": ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "emotion"],
  "like": ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "emotion"],
  "i don't like": ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "safety"],
  "don't like": ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "safety"],

  "it is": ["weather", "temperature", "color_size", "texture_sensory", "place", "time_routine", "safety"],
  "this is": ["color_size", "texture_sensory", "food_drink", "object", "safety"],
  "that is": ["color_size", "texture_sensory", "food_drink", "object", "safety"],

  "where": ["person", "place", "object", "school_work", "bathroom_care"],
  "what": ["question", "object", "activity", "food_drink", "school_work", "time_routine"],
  "who": ["person", "question"],
  "why": ["question", "emotion", "body_state", "safety"],
  "how": ["question", "activity", "help_support", "school_work"],

  "stop": ["safety", "break_regulation", "texture_sensory", "pain", "person", "help_support"],
  "hurt": ["pain", "body_state", "sick_health", "safety", "person"],
  "sick": ["sick_health", "body_state", "pain", "person", "safety"]
};

// Alias for compatibility with the route table typo in early notes. The canonical bucket is sick_health.
SEMANTIC_BUCKET_ROUTES_V5_32["i need"].splice(4, 1, "sick_health");

export function getSemanticBucketByIdV5_32(bucketId = "") {
  return SEMANTIC_BUCKETS_V5_32[bucketId] || null;
}

export function getSemanticBucketByLabelV5_32(label = "") {
  const normalized = key(label);
  return Object.values(SEMANTIC_BUCKETS_V5_32).find(bucket => key(bucket.label) === normalized) || null;
}

export function isSemanticBucketLabelV5_32(label = "") {
  return Boolean(getSemanticBucketByLabelV5_32(label));
}

function routeForPhrase(text = "") {
  const variants = phraseVariants(text);
  const routeKeys = Object.keys(SEMANTIC_BUCKET_ROUTES_V5_32)
    .sort((a, b) => b.split(" ").length - a.split(" ").length || b.length - a.length);

  for (const variant of variants) {
    const exact = routeKeys.find(routeKey => variant === routeKey);
    if (exact) return { key: exact, bucketIds: SEMANTIC_BUCKET_ROUTES_V5_32[exact], variants };

    const suffix = routeKeys.find(routeKey => variant.endsWith(` ${routeKey}`));
    if (suffix) return { key: suffix, bucketIds: SEMANTIC_BUCKET_ROUTES_V5_32[suffix], variants };
  }

  return { key: "", bucketIds: [], variants };
}

function bucketAllowedByStage(bucket = {}, stage = 1) {
  return Array.isArray(bucket.stage_access) && bucket.stage_access.includes(stage);
}

export function getSemanticBucketsForPhraseV5_32(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  if (!phrase) return [];

  const stage = stageFrom(profile, options);
  const routeMatch = routeForPhrase(phrase);
  const fallbackLimit = DEFAULT_BUCKET_LIMIT_BY_STAGE[stage] || DEFAULT_BUCKET_LIMIT_BY_STAGE[1];
  const limit = clampLimit(options.bucketLimit || options.limit || fallbackLimit, fallbackLimit);

  return routeMatch.bucketIds
    .map(getSemanticBucketByIdV5_32)
    .filter(Boolean)
    .filter(bucket => bucketAllowedByStage(bucket, stage))
    .slice(0, limit)
    .map(bucket => ({
      ...bucket,
      sourcePhrase: phrase,
      routeKey: routeMatch.key,
      isSemanticBucket: true
    }));
}

function fallbackWordsForBucket(bucket = {}, stage = 1, limit = DEFAULT_WORD_LIMIT) {
  return (bucket.fallback || [])
    .map(normalizeFallback)
    .filter(item => item.label && stage >= item.minStage && stage <= (item.maxStage || 5))
    .map(item => item.label)
    .slice(0, limit);
}

export function getStaticSemanticBucketWordsV5_32(bucketId = "", profile = {}, options = {}) {
  const bucket = getSemanticBucketByIdV5_32(bucketId);
  if (!bucket) return [];
  const stage = stageFrom(profile, options);
  const limit = clampLimit(options.limit);
  return fallbackWordsForBucket(bucket, stage, limit);
}

function profileUsageScore(label = "", profile = {}) {
  const normalized = key(label);
  const usage = profile.usage || profile.wordUsage || {};
  const keyboardSignals = profile.keyboardLearningSignals || {};
  const recents = new Set((profile.recentWords || []).map(key));
  const favorites = new Set((profile.favorites || []).map(key));

  return (usage[label] || usage[normalized] || 0) +
    (keyboardSignals[label] || keyboardSignals[normalized] || 0) +
    (recents.has(normalized) ? 25 : 0) +
    (favorites.has(normalized) ? 60 : 0);
}

function rankEntriesForBucket(entries = [], bucket = {}, profile = {}) {
  const bucketBranches = new Set(bucket.branches || []);
  const fallbackKeys = new Set((bucket.fallback || []).map(normalizeFallback).map(item => key(item.label)));

  return [...entries].sort((a, b) => {
    const aLabel = entryLabel(a);
    const bLabel = entryLabel(b);
    const aBranches = [a.primary_branch, ...(Array.isArray(a.branches) ? a.branches : [])].filter(Boolean);
    const bBranches = [b.primary_branch, ...(Array.isArray(b.branches) ? b.branches : [])].filter(Boolean);

    const aExact = bucketBranches.has(a.primary_branch) ? 90 : 0;
    const bExact = bucketBranches.has(b.primary_branch) ? 90 : 0;
    const aRelated = intersects(aBranches, bucket.branches || []) ? 60 : 0;
    const bRelated = intersects(bBranches, bucket.branches || []) ? 60 : 0;
    const aFallback = fallbackKeys.has(key(aLabel)) ? 120 : 0;
    const bFallback = fallbackKeys.has(key(bLabel)) ? 120 : 0;

    const aScore = aExact + aRelated + aFallback + (a.prediction_weight || 0) * 100 + Number(a.v5_26_utility_score || 0) / 5 + profileUsageScore(aLabel, profile) + (a.type === "word" ? 20 : 0);
    const bScore = bExact + bRelated + bFallback + (b.prediction_weight || 0) * 100 + Number(b.v5_26_utility_score || 0) / 5 + profileUsageScore(bLabel, profile) + (b.type === "word" ? 20 : 0);
    return bScore - aScore;
  });
}

function uniqueLabels(labels = []) {
  const seen = new Set();
  const out = [];
  for (const label of labels) {
    const clean = displayLabel(label);
    const normalized = key(clean);
    if (!normalized || normalized === "___" || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(clean);
  }
  return out;
}

function labelsFromEntries(entries = []) {
  return entries.map(entryLabel).filter(Boolean);
}

export async function getSemanticBucketSliceV5_32Async(profile = {}, options = {}) {
  const bucketId = options.bucketId || options.semanticBucketId || "";
  const bucket = getSemanticBucketByIdV5_32(bucketId);
  const stage = stageFrom(profile, options);
  const limit = clampLimit(options.limit);
  const phrase = toSentenceText(profile, options);

  if (!bucket) {
    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      status: "unknown_semantic_bucket",
      bucketId,
      bucketLabel: "",
      visible: [],
      hiddenCount: 0,
      phrase,
      source: "v5_32_semantic_bucket_router"
    };
  }

  const fallback = fallbackWordsForBucket(bucket, stage, limit);

  try {
    const database = await getLanguageDatabaseV5_27Async();
    const entries = Array.isArray(database.entries) ? database.entries : [];
    const stageEntries = entries
      .filter(entry => hasStage(entry, stage))
      .filter(entry => {
        const branches = [entry.primary_branch, ...(Array.isArray(entry.branches) ? entry.branches : [])].filter(Boolean);
        return intersects(branches, bucket.branches || []);
      });

    const safeEntries = filterEntriesBySafetyV5_27(stageEntries, profile, bucket.branches?.[0] || bucket.id)
      .filter(entry => entry.type !== "sentence_template");
    const ranked = rankEntriesForBucket(safeEntries, bucket, profile);
    const visible = uniqueLabels([...fallback, ...labelsFromEntries(ranked)]).slice(0, limit);

    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      status: "semantic_bucket_ready",
      bucketId: bucket.id,
      bucketLabel: bucket.label,
      visible,
      hiddenCount: Math.max(0, safeEntries.length - visible.length),
      totalMatchedBeforeLimit: safeEntries.length,
      phrase,
      branches: bucket.branches,
      source: "v5_32_semantic_bucket_router"
    };
  } catch (error) {
    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      status: "semantic_bucket_static_fallback",
      bucketId: bucket.id,
      bucketLabel: bucket.label,
      visible: fallback,
      hiddenCount: 0,
      phrase,
      error: error?.message || "Semantic bucket database enrichment failed",
      source: "v5_32_semantic_bucket_router"
    };
  }
}

export function getSemanticBucketRouteDebugV5_32(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const routeMatch = routeForPhrase(phrase);
  const stage = stageFrom(profile, options);
  return {
    version: SEMANTIC_BUCKET_ROUTER_VERSION,
    phrase,
    stage,
    routeKey: routeMatch.key,
    variants: routeMatch.variants,
    bucketIds: routeMatch.bucketIds,
    bucketLabels: getSemanticBucketsForPhraseV5_32(profile, options).map(bucket => bucket.label)
  };
}

export default {
  SEMANTIC_BUCKET_ROUTER_VERSION,
  SEMANTIC_BUCKETS_V5_32,
  SEMANTIC_BUCKET_ROUTES_V5_32,
  getSemanticBucketByIdV5_32,
  getSemanticBucketByLabelV5_32,
  isSemanticBucketLabelV5_32,
  getSemanticBucketsForPhraseV5_32,
  getStaticSemanticBucketWordsV5_32,
  getSemanticBucketSliceV5_32Async,
  getSemanticBucketRouteDebugV5_32
};
