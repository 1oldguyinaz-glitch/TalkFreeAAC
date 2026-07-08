// TalkFreeAAC V5.27 SAFE — Bucketed 10,000 Entry Language Router
// Hidden database. Bucket-gated slices only. No automatic board flooding.

import { DEEP_BUCKET_MAP_V5_27 } from "./deepBucketMapV5_27.js";

export const V5_27_ROUTER_VERSION = "5.27-safe-bucketed";
export const MIN_ACTIVE_OPTIONS = 12;
export const DEFAULT_ACTIVE_OPTIONS = 24;
export const MAX_ACTIVE_OPTIONS = 40;

export const LANGUAGE_DATABASE_PUBLIC_PATH = "data/languageDatabaseV5_27_10000.json";
export const LANGUAGE_DATABASE_LOADING_MODE = "lazy-dynamic-import";

const EMPTY_LANGUAGE_DATABASE = { entries: [] };
let languageDatabaseCache = null;
let languageDatabaseLoadPromise = null;

function normalizeLanguageDatabasePayload(payload) {
  const database = payload?.default || payload;
  return Array.isArray(database?.entries) ? database : EMPTY_LANGUAGE_DATABASE;
}

function cachedLanguageDatabase() {
  return languageDatabaseCache || EMPTY_LANGUAGE_DATABASE;
}

async function loadBundledLanguageDatabaseV5_27() {
  // Dynamic import keeps the 10,000-entry database out of the initial app chunk.
  // Vite turns this into a separate lazy-loaded asset/chunk.
  const module = await import("./languageDatabaseV5_27_10000.json");
  return normalizeLanguageDatabasePayload(module);
}

async function loadPublicLanguageDatabaseFallbackV5_27() {
  // Fallback only. Useful if a later wrapper chooses to place the database in /public/data.
  if (typeof window === "undefined" || typeof fetch !== "function") {
    throw new Error("Vocabulary database lazy-load requires Vite dynamic import or browser fetch().");
  }

  const baseUrl = import.meta.env?.BASE_URL || "/";
  const assetBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const response = await fetch(`${assetBase}${LANGUAGE_DATABASE_PUBLIC_PATH}`, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Vocabulary database failed to load: ${response.status}`);
  }

  return normalizeLanguageDatabasePayload(await response.json());
}

export function isLanguageDatabaseLoadedV5_27() {
  return Array.isArray(languageDatabaseCache?.entries);
}

export async function loadLanguageDatabaseV5_27() {
  if (isLanguageDatabaseLoadedV5_27()) return languageDatabaseCache;

  if (!languageDatabaseLoadPromise) {
    languageDatabaseLoadPromise = (async () => {
      try {
        languageDatabaseCache = await loadBundledLanguageDatabaseV5_27();
      } catch (dynamicImportError) {
        try {
          languageDatabaseCache = await loadPublicLanguageDatabaseFallbackV5_27();
        } catch (fallbackError) {
          fallbackError.cause = dynamicImportError;
          throw fallbackError;
        }
      }

      return languageDatabaseCache;
    })().catch(error => {
      languageDatabaseLoadPromise = null;
      throw error;
    });
  }

  return languageDatabaseLoadPromise;
}

const TOPIC_TO_BUCKETS = {
  relationships: ["people", "social", "social_boundaries"],
  feelings: ["feelings", "regulation", "sensory", "states_conditions", "temperature", "descriptors"],
  "food-and-drink": ["food_drink", "grocery", "food_cooking_deep"],
  "food drink": ["food_drink", "grocery", "food_cooking_deep"],
  places: ["places", "community", "community_errands", "transportation", "travel_navigation"],
  school: ["school", "academic_deep", "reading_writing", "math_deep", "science_nature", "therapy_goals"],
  actions: ["actions", "expanded_verbs", "sports_movement"],
  things: ["household", "household_items_deep", "technology_media", "play", "nature_animals", "animals_deep"],
  "body-and-health": ["body_pain", "medical_deep", "personal_care", "states_conditions"],
  "body health": ["body_pain", "medical_deep", "personal_care", "states_conditions"],
  questions: ["questions", "communication_repair", "grammar_language"],
  emergency: ["emergency", "emergency_deep"],
  keyboard: ["communication_repair", "grammar_language", "choice_preference"],
  custom: ["choice_preference", "communication_repair"],
  core: []
};

const PATH_ALIASES = {
  emotion: "feelings",
  emotions: "feelings",
  feeling: "feelings",
  feelings: "feelings",
  texture: "sensory",
  textures: "sensory",
  sensory: "sensory",
  pain: "body_pain",
  body: "body_pain",
  health: "medical_deep",
  medical: "medical_deep",
  schoolwork: "academic_deep",
  academics: "academic_deep",
  math: "math_deep",
  reading: "reading_writing",
  writing: "reading_writing",
  food: "food_drink",
  drink: "food_drink",
  grocery: "grocery",
  people: "people",
  relationship: "social",
  relationships: "social",
  social: "social",
  boundary: "social_boundaries",
  boundaries: "social_boundaries",
  place: "places",
  places: "places",
  travel: "travel_navigation",
  transportation: "transportation",
  action: "actions",
  actions: "actions",
  verb: "expanded_verbs",
  verbs: "expanded_verbs",
  play: "play",
  toy: "play",
  toys: "play",
  tech: "technology_media",
  technology: "technology_media",
  animal: "animals_deep",
  animals: "animals_deep",
  question: "questions",
  questions: "questions",
  repair: "communication_repair",
  communication: "communication_repair",
  grammar: "grammar_language",
  choice: "choice_preference",
  preference: "choice_preference",
  emergency: "emergency"
};

function key(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^a-z0-9'/_ -]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value = "") {
  return key(value).replace(/\s+/g, "-");
}

function clampLimit(value) {
  const number = Number(value || DEFAULT_ACTIVE_OPTIONS);
  if (!Number.isFinite(number)) return DEFAULT_ACTIVE_OPTIONS;
  return Math.max(MIN_ACTIVE_OPTIONS, Math.min(MAX_ACTIVE_OPTIONS, Math.round(number)));
}

function normalizeBucket(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const cleaned = key(raw);
  const slugged = slug(raw);
  return PATH_ALIASES[cleaned] || PATH_ALIASES[slugged] || cleaned.replace(/-/g, "_").replace(/\s+/g, "_");
}

function hasStage(entry, stage) {
  return Array.isArray(entry.stage_access) && entry.stage_access.includes(stage);
}

function hasAnyStage(entry) {
  return Array.isArray(entry.stage_access) && entry.stage_access.length > 0;
}

function sensitiveAllowed(profile = {}) {
  return profile?.settings?.showSensitiveVocabulary === true ||
    profile?.settings?.sensitiveVocabularyUnlocked === true ||
    profile?.sensitiveVocabularyUnlocked === true;
}

function parentAllowed(profile = {}) {
  return profile?.settings?.parentVocabularyUnlocked === true ||
    profile?.settings?.parentUnlocked === true ||
    profile?.parentUnlocked === true;
}

function schoolAllowed(profile = {}, bucket = "") {
  return profile?.settings?.schoolMode === true ||
    profile?.schoolMode === true ||
    bucket === "school" ||
    bucket === "academic_deep" ||
    bucket === "math_deep" ||
    bucket === "reading_writing" ||
    bucket === "science_nature";
}

function emergencyAllowed(profile = {}, bucket = "") {
  return profile?.settings?.emergencyMode === true ||
    profile?.emergencyMode === true ||
    bucket === "emergency" ||
    bucket === "emergency_deep";
}

export function getLanguageDatabaseV5_27() {
  return cachedLanguageDatabase();
}

export async function getLanguageDatabaseV5_27Async() {
  return loadLanguageDatabaseV5_27();
}

export function getAvailableBucketsV5_27(database = cachedLanguageDatabase()) {
  const counts = {};
  for (const entry of database.entries || []) {
    const branch = entry.primary_branch || "unknown";
    counts[branch] = (counts[branch] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([bucket, count]) => ({
      bucket,
      count,
      deepBucket: DEEP_BUCKET_MAP_V5_27[bucket] || null
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getAvailableBucketsV5_27Async() {
  const database = await loadLanguageDatabaseV5_27();
  return getAvailableBucketsV5_27(database);
}

function availableBucketSet(database = cachedLanguageDatabase()) {
  return new Set(getAvailableBucketsV5_27(database).map(row => row.bucket));
}

export function resolveBucketPathV5_27(input = {}, database = cachedLanguageDatabase()) {
  const parts = [];

  if (Array.isArray(input.bucketPath)) {
    parts.push(...input.bucketPath);
  } else if (input.bucketPath) {
    parts.push(...String(input.bucketPath).split(/[/>|]+/));
  }

  if (input.bucket) parts.push(input.bucket);
  if (input.activeBucket) parts.push(input.activeBucket);
  if (input.activeContext) parts.push(input.activeContext);
  if (input.topic) parts.push(input.topic);

  const normalizedParts = parts
    .map(part => String(part || "").trim())
    .filter(Boolean)
    .map(part => ({
      raw: part,
      slug: slug(part),
      bucket: normalizeBucket(part)
    }));

  const buckets = availableBucketSet(database);
  const explicitBucket = [...normalizedParts].reverse()
    .map(part => part.bucket)
    .find(bucket => buckets.has(bucket));

  if (explicitBucket) {
    return {
      requestedPath: normalizedParts.map(part => part.raw),
      bucket: explicitBucket,
      bucketGroup: [explicitBucket],
      mode: "exact-bucket"
    };
  }

  const topicKey = [...normalizedParts].reverse().map(part => part.slug).find(part => TOPIC_TO_BUCKETS[part]);
  if (topicKey) {
    return {
      requestedPath: normalizedParts.map(part => part.raw),
      bucket: topicKey,
      bucketGroup: TOPIC_TO_BUCKETS[topicKey],
      mode: "topic-bucket-group"
    };
  }

  const inferred = inferBucketFromText(`${input.phrase || ""} ${input.text || ""} ${input.query || ""}`);
  if (inferred) {
    return {
      requestedPath: normalizedParts.map(part => part.raw),
      bucket: inferred,
      bucketGroup: [inferred],
      mode: "inferred-from-text"
    };
  }

  return {
    requestedPath: normalizedParts.map(part => part.raw),
    bucket: "",
    bucketGroup: [],
    mode: "waiting-for-bucket"
  };
}

function inferBucketFromText(text = "") {
  const lowered = key(text);
  if (!lowered) return "";

  for (const [alias, bucket] of Object.entries(PATH_ALIASES)) {
    if (lowered.includes(alias)) return bucket;
  }

  for (const [bucket, config] of Object.entries(DEEP_BUCKET_MAP_V5_27 || {})) {
    const triggers = config?.show_by_context || [];
    if (triggers.some(trigger => lowered.includes(key(trigger)))) return bucket;
  }

  return "";
}

function uniqueEntries(entries = []) {
  const seen = new Set();
  const out = [];

  for (const entry of entries) {
    const labelKey = key(entry?.label || entry?.display_label || entry?.id);
    if (!labelKey || seen.has(labelKey)) continue;
    seen.add(labelKey);
    out.push(entry);
  }

  return out;
}

export function filterEntriesBySafetyV5_27(entries = [], profile = {}, bucket = "") {
  return entries.filter(entry => {
    if (entry.requires_sensitive_unlock && !sensitiveAllowed(profile)) return false;
    if ((entry.parent_gated || entry.requires_parent_unlock) && !parentAllowed(profile)) return false;
    if (entry.requires_school_mode && !schoolAllowed(profile, bucket)) return false;
    if (entry.requires_emergency_mode && !emergencyAllowed(profile, bucket)) return false;
    return true;
  });
}

function rankEntries(entries = [], profile = {}, bucketPath = {}) {
  const usage = profile.usage || profile.wordUsage || {};
  const favorites = new Set((profile.favorites || []).map(key));
  const recents = new Set((profile.recentWords || []).map(key));
  const keyboardSignals = profile.keyboardLearningSignals || {};
  const firstBucket = bucketPath.bucketGroup?.[0] || bucketPath.bucket;

  return [...entries].sort((a, b) => {
    const ak = key(a.label);
    const bk = key(b.label);

    const aExact = a.primary_branch === firstBucket ? 75 : 0;
    const bExact = b.primary_branch === firstBucket ? 75 : 0;

    const aScore =
      aExact +
      (a.prediction_weight || 0) * 100 +
      (usage[a.label] || usage[ak] || 0) +
      (keyboardSignals[a.label] || keyboardSignals[ak] || 0) +
      (favorites.has(ak) ? 50 : 0) +
      (recents.has(ak) ? 20 : 0) +
      (a.type === "word" ? 10 : 0) +
      (a.type === "functional_phrase" ? 6 : 0);

    const bScore =
      bExact +
      (b.prediction_weight || 0) * 100 +
      (usage[b.label] || usage[bk] || 0) +
      (keyboardSignals[b.label] || keyboardSignals[bk] || 0) +
      (favorites.has(bk) ? 50 : 0) +
      (recents.has(bk) ? 20 : 0) +
      (b.type === "word" ? 10 : 0) +
      (b.type === "functional_phrase" ? 6 : 0);

    return bScore - aScore;
  });
}

function filterByBucketGroup(bucketGroup = [], profile = {}, bucket = "", stage = 1, allowStageExpansion = false, database = cachedLanguageDatabase()) {
  return database.entries
    .filter(entry => bucketGroup.includes(entry.primary_branch))
    .filter(entry => allowStageExpansion ? hasAnyStage(entry) : hasStage(entry, stage))
    .filter(entry => filterEntriesBySafetyV5_27([entry], profile, bucket).length === 1);
}

function fillCongruent(entries = [], profile = {}, bucketPath = {}, limit = DEFAULT_ACTIVE_OPTIONS, stage = 1, database = cachedLanguageDatabase()) {
  if (entries.length >= Math.min(MIN_ACTIVE_OPTIONS, limit)) return entries;

  const group = bucketPath.bucketGroup || [];
  if (!group.length) return entries;

  const existing = new Set(entries.map(entry => key(entry.label)));
  const fallback = filterByBucketGroup(group, profile, bucketPath.bucket, stage, true, database)
    .filter(entry => !existing.has(key(entry.label)));

  return uniqueEntries([...entries, ...rankEntries(fallback, profile, bucketPath)]).slice(0, limit);
}

function databaseNotLoadedSlice(stage, limit, bucketPath) {
  return {
    version: V5_27_ROUTER_VERSION,
    stage,
    limit,
    visible: [],
    hiddenCount: 0,
    bucketPath,
    status: "database_not_loaded",
    source: "v5_27_lazy_bucketed_router"
  };
}

export function getBucketedLanguageSliceV5_27(profile = {}, options = {}, database = cachedLanguageDatabase()) {
  const stage = options.stage || profile.stage || 1;
  const limit = clampLimit(options.limit);
  const bucketPath = resolveBucketPathV5_27({
    bucketPath: options.bucketPath || profile.activeBucketPath,
    bucket: options.bucket || profile.activeBucket,
    activeBucket: options.activeBucket || profile.activeBucket,
    activeContext: options.activeContext || profile.activeContext,
    topic: options.topic || profile.activeTopic,
    phrase: options.phrase || (Array.isArray(profile.sentence) ? profile.sentence.join(" ") : profile.sentence || "")
  }, database);

  if (!Array.isArray(database.entries) || database.entries.length === 0) {
    return databaseNotLoadedSlice(stage, limit, bucketPath);
  }

  if (!bucketPath.bucketGroup.length) {
    return {
      version: V5_27_ROUTER_VERSION,
      stage,
      limit,
      visible: [],
      hiddenCount: database.entries.length,
      bucketPath,
      status: "waiting_for_bucket",
      source: "v5_27_lazy_bucketed_router"
    };
  }

  let entries = filterByBucketGroup(bucketPath.bucketGroup, profile, bucketPath.bucket, stage, false, database);
  entries = uniqueEntries(entries);
  entries = rankEntries(entries, profile, bucketPath);
  entries = fillCongruent(entries, profile, bucketPath, limit, stage, database);

  return {
    version: V5_27_ROUTER_VERSION,
    stage,
    limit,
    visible: entries.slice(0, limit),
    hiddenCount: Math.max(0, entries.length - limit),
    totalMatchedBeforeLimit: entries.length,
    bucketPath,
    status: "bucket_ready",
    source: "v5_27_lazy_bucketed_router"
  };
}

// Backward-compatible name, but now bucket-gated and safe.
export function getActiveLanguageSlice(profile = {}, options = {}) {
  return getBucketedLanguageSliceV5_27(profile, options);
}

export async function getBucketedLanguageSliceV5_27Async(profile = {}, options = {}) {
  const database = await loadLanguageDatabaseV5_27();
  return getBucketedLanguageSliceV5_27(profile, options, database);
}

export async function getActiveLanguageSliceAsync(profile = {}, options = {}) {
  return getBucketedLanguageSliceV5_27Async(profile, options);
}

export function searchLanguageDatabaseV5_27(query = "", profile = {}, options = {}, database = cachedLanguageDatabase()) {
  const q = key(query);
  if (!q || !Array.isArray(database.entries) || database.entries.length === 0) return [];

  const limit = Math.min(MAX_ACTIVE_OPTIONS, Math.max(1, Number(options.limit || MAX_ACTIVE_OPTIONS)));
  const stage = options.stage || profile.stage || 1;
  const bucketPath = resolveBucketPathV5_27({
    bucketPath: options.bucketPath,
    bucket: options.bucket,
    activeBucket: options.activeBucket,
    activeContext: options.activeContext,
    topic: options.topic,
    query
  }, database);

  let entries = database.entries
    .filter(entry => key(entry.label).includes(q))
    .filter(entry => hasStage(entry, stage) || options.allowStageExpansion === true);

  if (bucketPath.bucketGroup.length && options.global !== true) {
    entries = entries.filter(entry => bucketPath.bucketGroup.includes(entry.primary_branch));
  }

  entries = filterEntriesBySafetyV5_27(entries, profile, bucketPath.bucket);
  return rankEntries(uniqueEntries(entries), profile, bucketPath).slice(0, limit);
}

export async function searchLanguageDatabaseV5_27Async(query = "", profile = {}, options = {}) {
  const database = await loadLanguageDatabaseV5_27();
  return searchLanguageDatabaseV5_27(query, profile, options, database);
}

export default {
  V5_27_ROUTER_VERSION,
  LANGUAGE_DATABASE_PUBLIC_PATH,
  LANGUAGE_DATABASE_LOADING_MODE,
  MIN_ACTIVE_OPTIONS,
  DEFAULT_ACTIVE_OPTIONS,
  MAX_ACTIVE_OPTIONS,
  isLanguageDatabaseLoadedV5_27,
  loadLanguageDatabaseV5_27,
  getLanguageDatabaseV5_27,
  getLanguageDatabaseV5_27Async,
  getAvailableBucketsV5_27,
  getAvailableBucketsV5_27Async,
  resolveBucketPathV5_27,
  getBucketedLanguageSliceV5_27,
  getBucketedLanguageSliceV5_27Async,
  getActiveLanguageSlice,
  getActiveLanguageSliceAsync,
  searchLanguageDatabaseV5_27,
  searchLanguageDatabaseV5_27Async,
  filterEntriesBySafetyV5_27
};
