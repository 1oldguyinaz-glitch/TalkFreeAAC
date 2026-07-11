// TalkFreeAAC V7.1 — Semantic Bucket Router
// Compatibility exports keep the V5.32 board API stable while routing through the
// V7.1 semantic concept graph. The live board uses the compact static graph; the
// full 10,000-concept graph remains lazy for deep enrichment.

import {
  SEMANTIC_BUCKETS_V7_1,
  SEMANTIC_GRAPH_VERSION,
  normalizeSemanticText,
  semanticItemAllowed,
  stageFromSemanticProfile,
  ageBandFromSemanticProfile
} from "../language/semanticGraphSchemaV7_1.js";
import {
  getConceptsForBucketV7_1Async,
  getStaticWordsForBucketV7_1
} from "../language/semanticConceptGraphV7_1.js";
import {
  SEMANTIC_CONTEXT_ROUTES_V7_1,
  getSemanticGraphPredictionV7_1
} from "./semanticGraphPredictionEngineV7_1.js";

export const SEMANTIC_BUCKET_ROUTER_VERSION = "7.1-semantic-bucket-router";

const DEFAULT_BUCKET_LIMIT_BY_STAGE = Object.freeze({
  1: 4,
  2: 6,
  3: 8,
  4: 10,
  5: 8
});

const DEFAULT_WORD_LIMIT = 24;

function clampLimit(value, fallback = DEFAULT_WORD_LIMIT, max = 40) {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(max, Math.round(parsed)));
}

function toSentenceText(profile = {}, options = {}) {
  if (options.phrase !== undefined) return String(options.phrase || "").trim();
  const sentence = options.sentence ?? profile.sentence ?? [];
  return Array.isArray(sentence) ? sentence.join(" ").trim() : String(sentence || "").trim();
}

function uniqueLabels(labels = []) {
  const seen = new Set();
  const output = [];
  for (const label of labels) {
    const clean = String(label || "").trim();
    const key = normalizeSemanticText(clean);
    if (!key || key === "___" || seen.has(key)) continue;
    seen.add(key);
    output.push(clean);
  }
  return output;
}

// Compatibility object. New metadata is richer, but legacy callers may still inspect
// `branches`, so secondary categories are mirrored there.
export const SEMANTIC_BUCKETS_V5_32 = Object.freeze(
  Object.fromEntries(Object.entries(SEMANTIC_BUCKETS_V7_1).map(([id, bucket]) => [id, {
    ...bucket,
    branches: [...(bucket.secondary_categories || [])]
  }]))
);

// Compatibility route map generated from the V7.1 meaning routes.
export const SEMANTIC_BUCKET_ROUTES_V5_32 = Object.freeze(
  Object.fromEntries(Object.entries(SEMANTIC_CONTEXT_ROUTES_V7_1).map(([route, config]) => [route, [...(config.buckets || [])]]))
);

export function getSemanticBucketByIdV5_32(bucketId = "") {
  const direct = SEMANTIC_BUCKETS_V5_32[bucketId];
  if (direct) return direct;
  const normalized = normalizeSemanticText(bucketId).replace(/\s+/g, "_");
  return SEMANTIC_BUCKETS_V5_32[normalized] || null;
}

export function getSemanticBucketByLabelV5_32(label = "") {
  const normalized = normalizeSemanticText(label);
  return Object.values(SEMANTIC_BUCKETS_V5_32)
    .find(bucket => normalizeSemanticText(bucket.label) === normalized) || null;
}

export function isSemanticBucketLabelV5_32(label = "") {
  return Boolean(getSemanticBucketByLabelV5_32(label));
}

export function getSemanticBucketsForPhraseV5_32(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  if (!phrase) return [];

  const stage = stageFromSemanticProfile(profile, options);
  const fallbackLimit = DEFAULT_BUCKET_LIMIT_BY_STAGE[stage] || DEFAULT_BUCKET_LIMIT_BY_STAGE[1];
  const limit = clampLimit(options.bucketLimit ?? options.limit, fallbackLimit, 12);
  const prediction = getSemanticGraphPredictionV7_1(profile, {
    ...options,
    phrase,
    stage,
    bucketLimit: limit
  });

  return prediction.bucketIds
    .map(getSemanticBucketByIdV5_32)
    .filter(Boolean)
    .filter(bucket => semanticItemAllowed(bucket, profile, options))
    .slice(0, limit)
    .map(bucket => ({
      ...bucket,
      sourcePhrase: phrase,
      routeKey: prediction.routeKey,
      isSemanticBucket: true,
      graphVersion: SEMANTIC_GRAPH_VERSION
    }));
}

function fallbackWordsForBucket(bucket = {}, profile = {}, options = {}) {
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  const limit = clampLimit(options.limit, DEFAULT_WORD_LIMIT);
  return (bucket.fallback || [])
    .map(value => typeof value === "string" ? { label: value } : value || {})
    .filter(item => item.label)
    .filter(item => !item.minStage || stage >= item.minStage)
    .filter(item => !item.maxStage || stage <= item.maxStage)
    .filter(item => !item.ageBands || item.ageBands.includes(ageBand))
    .map(item => item.label)
    .slice(0, limit);
}

export function getStaticSemanticBucketWordsV5_32(bucketId = "", profile = {}, options = {}) {
  const bucket = getSemanticBucketByIdV5_32(bucketId);
  if (!bucket) return [];
  const limit = clampLimit(options.limit, DEFAULT_WORD_LIMIT);
  const graphWords = getStaticWordsForBucketV7_1(bucket.id, profile, { ...options, limit });
  return uniqueLabels([
    ...fallbackWordsForBucket(bucket, profile, { ...options, limit }),
    ...graphWords
  ]).slice(0, limit);
}

export async function getSemanticBucketSliceV5_32Async(profile = {}, options = {}) {
  const bucketId = options.bucketId || options.semanticBucketId || "";
  const bucket = getSemanticBucketByIdV5_32(bucketId);
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  const limit = clampLimit(options.limit, DEFAULT_WORD_LIMIT);
  const phrase = toSentenceText(profile, options);

  if (!bucket) {
    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      graphVersion: SEMANTIC_GRAPH_VERSION,
      status: "unknown_semantic_bucket",
      bucketId,
      bucketLabel: "",
      visible: [],
      hiddenCount: 0,
      phrase,
      stage,
      ageBand,
      source: "v7.1_semantic_bucket_router"
    };
  }

  const fallback = getStaticSemanticBucketWordsV5_32(bucket.id, profile, { ...options, limit });

  try {
    const concepts = await getConceptsForBucketV7_1Async(bucket.id, profile, { ...options, limit: 40 });
    const visible = uniqueLabels([
      ...fallback,
      ...concepts.map(concept => concept.label)
    ]).slice(0, limit);

    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      graphVersion: SEMANTIC_GRAPH_VERSION,
      status: "semantic_graph_bucket_ready",
      bucketId: bucket.id,
      bucketLabel: bucket.label,
      visible,
      hiddenCount: Math.max(0, concepts.length - visible.length),
      totalMatchedBeforeLimit: concepts.length,
      phrase,
      stage,
      ageBand,
      primaryCategory: bucket.topLevel,
      secondaryCategories: bucket.secondary_categories,
      source: "v7.1_semantic_concept_graph"
    };
  } catch (error) {
    return {
      version: SEMANTIC_BUCKET_ROUTER_VERSION,
      graphVersion: SEMANTIC_GRAPH_VERSION,
      status: "semantic_graph_static_fallback",
      bucketId: bucket.id,
      bucketLabel: bucket.label,
      visible: fallback,
      hiddenCount: 0,
      phrase,
      stage,
      ageBand,
      error: error?.message || "Semantic concept graph enrichment failed",
      source: "v7.1_semantic_bucket_router"
    };
  }
}

export function getSemanticBucketRouteDebugV5_32(profile = {}, options = {}) {
  const phrase = toSentenceText(profile, options);
  const prediction = getSemanticGraphPredictionV7_1(profile, { ...options, phrase });
  return {
    version: SEMANTIC_BUCKET_ROUTER_VERSION,
    graphVersion: SEMANTIC_GRAPH_VERSION,
    phrase,
    stage: prediction.stage,
    ageBand: prediction.ageBand,
    routeKey: prediction.routeKey,
    variants: prediction.variants,
    bucketIds: prediction.bucketIds,
    bucketLabels: prediction.bucketLabels,
    directWords: prediction.directWords,
    source: prediction.source
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
