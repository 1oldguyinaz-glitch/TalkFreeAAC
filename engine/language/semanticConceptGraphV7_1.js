// TalkFreeAAC V7.1 — Semantic Concept Graph Runtime
// Compact high-value graph stays in the live board bundle. The full 10,000-concept
// graph is lazy-loaded only for deep search, professional tools, and enriched routing.

import { SEMANTIC_CORE_CONCEPTS_V7_1 } from "./semanticCoreConceptsV7_1.js";
import {
  SEMANTIC_AGE_BANDS,
  SEMANTIC_BUCKETS_V7_1,
  SEMANTIC_GRAPH_VERSION,
  ageBandFromSemanticProfile,
  normalizeSemanticText,
  semanticItemAllowed,
  stageFromSemanticProfile
} from "./semanticGraphSchemaV7_1.js";

export const SEMANTIC_GRAPH_LOADING_MODE = "static-core-plus-lazy-10000";
export const SEMANTIC_GRAPH_DATA_PATH = "./semanticConceptGraphV7_1_10000.json";

const PRIORITY_SCORE = Object.freeze({ core: 400, common: 260, specialized: 110, rare: 20 });

function syntheticConcept(label, config = {}) {
  const normalized = normalizeSemanticText(label);
  return {
    id: `concept:synthetic:${normalized.replace(/\s+/g, "-")}`,
    label,
    normalized_label: normalized,
    entry_type: config.entry_type || "functional_phrase",
    primary_category: config.primary_category || "communication_repair",
    secondary_categories: config.secondary_categories || ["repair", "self_advocacy"],
    bucket_paths: config.bucket_paths || ["communication_repair"],
    intents: config.intents || ["communication_repair", "self_advocacy"],
    stage_access: config.stage_access || [1, 2, 3, 4, 5],
    age_bands: config.age_bands || [...SEMANTIC_AGE_BANDS],
    recovery_appropriate: config.recovery_appropriate ?? true,
    priority: config.priority || "core",
    sentence_frames: config.sentence_frames || [label],
    relations: {
      actions: config.relations?.actions || ["wait", "repeat", "show", "help"],
      descriptors: config.relations?.descriptors || ["again", "slower", "different"],
      people: config.relations?.people || ["you", "helper"],
      places: config.relations?.places || ["here"],
      emotions: config.relations?.emotions || ["frustrated", "confused", "calm"],
      related_concepts: config.relations?.related_concepts || []
    },
    prediction_weight: config.prediction_weight ?? 1.2,
    utility_score: config.utility_score ?? 240,
    gating: config.gating || { parent: false, sensitive: false, school: false, emergency: false }
  };
}

export const SYNTHETIC_SEMANTIC_CONCEPTS_V7_1 = Object.freeze([
  syntheticConcept("Try again", {
    primary_category: "communication_repair",
    secondary_categories: ["repair", "clarification", "word_finding"],
    bucket_paths: ["communication_repair", "recovery_support"],
    intents: ["communication_repair", "recovery_support", "self_advocacy"],
    stage_access: [1, 2, 3, 4, 5]
  }),
  syntheticConcept("I know but can't say it", {
    stage_access: [5],
    age_bands: ["adult", "aphasia_recovery"],
    bucket_paths: ["communication_repair", "recovery_support"],
    intents: ["communication_repair", "recovery_support", "self_advocacy"]
  }),
  syntheticConcept("Say it another way", {
    stage_access: [2, 3, 4, 5],
    bucket_paths: ["communication_repair", "recovery_support"]
  }),
  syntheticConcept("Show me", {
    primary_category: "needs_help",
    secondary_categories: ["help", "clarification"],
    bucket_paths: ["help_support", "communication_repair", "recovery_support"],
    intents: ["request", "communication_repair", "recovery_support"]
  }),
  syntheticConcept("Write it", {
    stage_access: [3, 4, 5],
    age_bands: ["teen", "adult", "aphasia_recovery"],
    bucket_paths: ["communication_repair", "recovery_support"]
  }),
  syntheticConcept("Point to it", {
    bucket_paths: ["communication_repair", "recovery_support"]
  }),
  syntheticConcept("My choice", {
    primary_category: "safety_emergency",
    secondary_categories: ["self_advocacy", "choice", "consent"],
    bucket_paths: ["refusal_advocacy", "safety"],
    intents: ["choice", "self_advocacy", "refusal"]
  }),
  syntheticConcept("I need space", {
    primary_category: "needs_help",
    secondary_categories: ["break", "self_advocacy", "sensory_support"],
    bucket_paths: ["break_regulation", "refusal_advocacy"],
    intents: ["request", "self_advocacy", "refusal"]
  }),
  syntheticConcept("I don't want", {
    primary_category: "safety_emergency",
    secondary_categories: ["refusal", "choice", "self_advocacy"],
    bucket_paths: ["refusal_advocacy", "safety"],
    intents: ["refusal", "choice", "self_advocacy"]
  }),
  syntheticConcept("Different", {
    entry_type: "word",
    primary_category: "descriptors",
    secondary_categories: ["choice", "descriptor"],
    bucket_paths: ["color_size", "refusal_advocacy"],
    intents: ["choice", "describe", "self_advocacy"],
    recovery_appropriate: true
  }),
  syntheticConcept("Go away", {
    primary_category: "safety_emergency",
    secondary_categories: ["refusal", "boundary", "safety"],
    bucket_paths: ["refusal_advocacy", "safety"],
    intents: ["refusal", "self_advocacy", "safety"]
  }),
  syntheticConcept("Leave me alone", {
    stage_access: [2, 3, 4, 5],
    primary_category: "safety_emergency",
    secondary_categories: ["refusal", "boundary", "consent"],
    bucket_paths: ["refusal_advocacy", "safety"],
    intents: ["refusal", "self_advocacy", "safety"]
  }),
  syntheticConcept("Call someone", {
    primary_category: "safety_emergency",
    secondary_categories: ["urgent_help", "safety", "support"],
    bucket_paths: ["safety", "help_support"],
    intents: ["safety", "request", "self_advocacy"]
  })
]);

function uniqueConceptsByLabel(concepts = []) {
  const byLabel = new Map();
  for (const concept of concepts) {
    const key = normalizeSemanticText(concept?.label || concept?.normalized_label || "");
    if (!key) continue;
    const previous = byLabel.get(key);
    if (!previous || scoreConceptBase(concept) > scoreConceptBase(previous)) byLabel.set(key, concept);
  }
  return [...byLabel.values()];
}

export const STATIC_SEMANTIC_CONCEPTS_V7_1 = Object.freeze(
  uniqueConceptsByLabel([...SEMANTIC_CORE_CONCEPTS_V7_1, ...SYNTHETIC_SEMANTIC_CONCEPTS_V7_1])
);

function buildIndex(concepts = []) {
  const index = {
    concepts,
    byLabel: new Map(),
    byBucket: new Map(),
    byIntent: new Map(),
    byPrimary: new Map()
  };

  for (const concept of concepts) {
    const labelKey = normalizeSemanticText(concept.normalized_label || concept.label);
    if (!labelKey) continue;
    index.byLabel.set(labelKey, concept);

    for (const bucketId of concept.bucket_paths || []) {
      if (!index.byBucket.has(bucketId)) index.byBucket.set(bucketId, []);
      index.byBucket.get(bucketId).push(concept);
    }

    for (const intent of concept.intents || []) {
      if (!index.byIntent.has(intent)) index.byIntent.set(intent, []);
      index.byIntent.get(intent).push(concept);
    }

    const primary = concept.primary_category || "objects";
    if (!index.byPrimary.has(primary)) index.byPrimary.set(primary, []);
    index.byPrimary.get(primary).push(concept);
  }

  return index;
}

const staticIndex = buildIndex(STATIC_SEMANTIC_CONCEPTS_V7_1);
let fullGraphCache = null;
let fullIndexCache = null;
let fullGraphPromise = null;

function normalizeGraphPayload(moduleOrPayload) {
  const payload = moduleOrPayload?.default || moduleOrPayload;
  if (!payload || !Array.isArray(payload.concepts)) {
    throw new Error("Semantic graph payload is missing concepts.");
  }
  return payload;
}

export function isFullSemanticGraphLoadedV7_1() {
  return Boolean(fullGraphCache && Array.isArray(fullGraphCache.concepts));
}

export async function loadFullSemanticGraphV7_1() {
  if (isFullSemanticGraphLoadedV7_1()) return fullGraphCache;
  if (!fullGraphPromise) {
    fullGraphPromise = import("./semanticConceptGraphV7_1_10000.json", { with: { type: "json" } })
      .then(normalizeGraphPayload)
      .then(payload => {
        fullGraphCache = payload;
        fullIndexCache = buildIndex(uniqueConceptsByLabel([...payload.concepts, ...SYNTHETIC_SEMANTIC_CONCEPTS_V7_1]));
        return fullGraphCache;
      })
      .catch(error => {
        fullGraphPromise = null;
        throw error;
      });
  }
  return fullGraphPromise;
}

export function getSemanticBucketV7_1(bucketId = "") {
  return SEMANTIC_BUCKETS_V7_1[normalizeSemanticText(bucketId).replace(/\s+/g, "_")] || SEMANTIC_BUCKETS_V7_1[bucketId] || null;
}

export function getStaticSemanticConceptV7_1(label = "") {
  return staticIndex.byLabel.get(normalizeSemanticText(label)) || null;
}

export async function getSemanticConceptV7_1Async(label = "") {
  const staticConcept = getStaticSemanticConceptV7_1(label);
  if (staticConcept) return staticConcept;
  await loadFullSemanticGraphV7_1();
  return fullIndexCache.byLabel.get(normalizeSemanticText(label)) || null;
}

function profileUsageScore(concept, profile = {}) {
  const label = concept?.label || "";
  const key = normalizeSemanticText(label);
  const usage = profile.usage || profile.wordUsage || {};
  const keyboard = profile.keyboardLearningSignals || {};
  const favorites = new Set((profile.favorites || []).map(normalizeSemanticText));
  const recents = new Set((profile.recentWords || []).map(normalizeSemanticText));
  return Number(usage[label] || usage[key] || 0) +
    Number(keyboard[label] || keyboard[key] || 0) +
    (favorites.has(key) ? 90 : 0) +
    (recents.has(key) ? 35 : 0);
}

function safetyAllowed(concept = {}, profile = {}, bucketId = "") {
  const gating = concept.gating || {};
  const settings = profile.settings || {};
  const sensitive = settings.showSensitiveVocabulary === true || settings.sensitiveVocabularyUnlocked === true || profile.sensitiveVocabularyUnlocked === true;
  const parent = settings.parentVocabularyUnlocked === true || settings.parentUnlocked === true || profile.parentUnlocked === true;
  const school = settings.schoolMode === true || profile.schoolMode === true || bucketId === "school_work";
  const emergency = settings.emergencyMode === true || profile.emergencyMode === true || bucketId === "safety";
  if (gating.sensitive && !sensitive) return false;
  if (gating.parent && !parent) return false;
  if (gating.school && !school) return false;
  if (gating.emergency && !emergency) return false;
  return true;
}

function scoreConceptBase(concept = {}, profile = {}, bucketId = "") {
  const fallback = getSemanticBucketV7_1(bucketId)?.fallback || [];
  const fallbackOrder = fallback
    .map(item => normalizeSemanticText(typeof item === "string" ? item : item?.label || ""))
    .indexOf(normalizeSemanticText(concept.label));
  const fallbackBoost = fallbackOrder >= 0 ? Math.max(0, 220 - fallbackOrder * 12) : 0;
  return (PRIORITY_SCORE[concept.priority] || 0) +
    Number(concept.utility_score || 0) / 2 +
    Number(concept.prediction_weight || 0) * 80 +
    fallbackBoost +
    profileUsageScore(concept, profile);
}

function normalizeLimit(value, fallback = 24) {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(40, Math.round(parsed)));
}

function conceptAllowed(concept, profile = {}, options = {}) {
  const bucketId = options.bucketId || "";
  return semanticItemAllowed(concept, profile, options) && safetyAllowed(concept, profile, bucketId);
}

function conceptsForBucketFromIndex(index, bucketId, profile = {}, options = {}) {
  const limit = normalizeLimit(options.limit, 24);
  const bucket = getSemanticBucketV7_1(bucketId);
  if (!bucket) return [];
  const source = index.byBucket.get(bucket.id) || [];
  return source
    .filter(concept => conceptAllowed(concept, profile, { ...options, bucketId: bucket.id }))
    .sort((a, b) => scoreConceptBase(b, profile, bucket.id) - scoreConceptBase(a, profile, bucket.id))
    .slice(0, limit);
}

export function getStaticConceptsForBucketV7_1(bucketId, profile = {}, options = {}) {
  return conceptsForBucketFromIndex(staticIndex, bucketId, profile, options);
}

export function getStaticWordsForBucketV7_1(bucketId, profile = {}, options = {}) {
  return getStaticConceptsForBucketV7_1(bucketId, profile, options).map(concept => concept.label);
}

export async function getConceptsForBucketV7_1Async(bucketId, profile = {}, options = {}) {
  await loadFullSemanticGraphV7_1();
  return conceptsForBucketFromIndex(fullIndexCache, bucketId, profile, options);
}

export async function searchSemanticConceptGraphV7_1Async(query = "", profile = {}, options = {}) {
  const q = normalizeSemanticText(query);
  if (!q) return [];
  await loadFullSemanticGraphV7_1();
  const limit = normalizeLimit(options.limit, 24);
  return fullIndexCache.concepts
    .filter(concept => normalizeSemanticText(concept.label).includes(q))
    .filter(concept => conceptAllowed(concept, profile, options))
    .sort((a, b) => {
      const aExact = normalizeSemanticText(a.label) === q ? 500 : 0;
      const bExact = normalizeSemanticText(b.label) === q ? 500 : 0;
      return (bExact + scoreConceptBase(b, profile)) - (aExact + scoreConceptBase(a, profile));
    })
    .slice(0, limit);
}

export function getStaticRelatedConceptLabelsV7_1(label = "", options = {}) {
  const concept = getStaticSemanticConceptV7_1(label);
  if (!concept) return [];
  const relationOrder = options.relationOrder || ["related_concepts", "actions", "descriptors", "people", "places", "emotions"];
  const labels = [];
  for (const relationType of relationOrder) {
    if (relationType === "related_concepts") labels.push(...(concept.relations?.related_concepts || []));
    else labels.push(...(concept.relations?.[relationType] || []));
  }
  const current = normalizeSemanticText(label);
  return [...new Set(labels.map(String))]
    .filter(item => normalizeSemanticText(item) && normalizeSemanticText(item) !== current)
    .slice(0, normalizeLimit(options.limit, 24));
}

export function getSemanticGraphRuntimeSummaryV7_1(profile = {}) {
  return {
    version: SEMANTIC_GRAPH_VERSION,
    loadingMode: SEMANTIC_GRAPH_LOADING_MODE,
    staticConceptCount: STATIC_SEMANTIC_CONCEPTS_V7_1.length,
    fullGraphLoaded: isFullSemanticGraphLoadedV7_1(),
    stage: stageFromSemanticProfile(profile),
    ageBand: ageBandFromSemanticProfile(profile),
    bucketCount: Object.keys(SEMANTIC_BUCKETS_V7_1).length,
    localFirst: true,
    externalAiRequired: false
  };
}

export default {
  SEMANTIC_GRAPH_LOADING_MODE,
  SEMANTIC_GRAPH_DATA_PATH,
  STATIC_SEMANTIC_CONCEPTS_V7_1,
  SYNTHETIC_SEMANTIC_CONCEPTS_V7_1,
  isFullSemanticGraphLoadedV7_1,
  loadFullSemanticGraphV7_1,
  getSemanticBucketV7_1,
  getStaticSemanticConceptV7_1,
  getSemanticConceptV7_1Async,
  getStaticConceptsForBucketV7_1,
  getStaticWordsForBucketV7_1,
  getConceptsForBucketV7_1Async,
  searchSemanticConceptGraphV7_1Async,
  getStaticRelatedConceptLabelsV7_1,
  getSemanticGraphRuntimeSummaryV7_1
};
