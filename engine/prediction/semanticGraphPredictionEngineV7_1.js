// TalkFreeAAC V7.1 — Semantic Graph Prediction Engine
// Predicts meaning, not just the next grammar token. Uses the compact static graph
// on the live board and keeps the full 10,000-concept graph lazy.

import {
  getStaticRelatedConceptLabelsV7_1,
  getStaticSemanticConceptV7_1
} from "../language/semanticConceptGraphV7_1.js";
import {
  SEMANTIC_BUCKETS_V7_1,
  SEMANTIC_GRAPH_VERSION,
  ageBandFromSemanticProfile,
  normalizeSemanticText,
  semanticItemAllowed,
  stageFromSemanticProfile
} from "../language/semanticGraphSchemaV7_1.js";

export const SEMANTIC_GRAPH_PREDICTION_VERSION = `${SEMANTIC_GRAPH_VERSION}-prediction`;

const DEFAULT_DIRECT_LIMIT = 14;
const DEFAULT_BUCKET_LIMIT = 8;
const MAX_TAIL_WORDS = 7;

export const SEMANTIC_CONTEXT_ROUTES_V7_1 = Object.freeze({
  "i": {
    direct: ["want", "need", "feel", "am", "like", "don't", "can", "have", "think", "know", "go", "help", "love"],
    buckets: ["communication_repair", "social_connection"]
  },
  "i want": {
    direct: ["this", "that", "it", "more", "help", "water", "food", "outside", "play", "break", "bathroom", "you", "different", "please"],
    buckets: ["food_drink", "activity", "place", "person", "object", "help_support", "break_regulation", "device_media"]
  },
  "want": {
    direct: ["this", "that", "it", "more", "help", "water", "food", "outside", "play", "break", "bathroom", "you", "different"],
    buckets: ["food_drink", "activity", "place", "person", "object", "help_support", "break_regulation", "device_media"]
  },
  "i want to": {
    direct: ["go", "play", "eat", "drink", "see", "watch", "read", "talk", "stop", "try", "help", "leave", "rest"],
    buckets: ["activity", "place", "person", "help_support", "break_regulation"]
  },
  "want to": {
    direct: ["go", "play", "eat", "drink", "see", "watch", "read", "talk", "stop", "try", "help", "leave", "rest"],
    buckets: ["activity", "place", "person", "help_support", "break_regulation"]
  },
  "i need": {
    direct: ["help", "water", "food", "bathroom", "break", "quiet", "space", "medicine", "you", "this", "different", "now"],
    buckets: ["help_support", "bathroom_care", "food_drink", "body_state", "sick_health", "break_regulation", "person", "safety"]
  },
  "need": {
    direct: ["help", "water", "food", "bathroom", "break", "quiet", "space", "medicine", "you", "this", "different"],
    buckets: ["help_support", "bathroom_care", "food_drink", "body_state", "sick_health", "break_regulation", "person", "safety"]
  },
  "i need help": {
    direct: ["with", "this", "that", "me", "please", "now", "open", "find", "fix", "understand", "bathroom", "pain", "stuck", "stop"],
    buckets: ["help_support", "pain", "bathroom_care", "device_media", "school_work", "person", "safety", "communication_repair"]
  },
  "help": {
    direct: ["me", "please", "with", "this", "that", "now", "open", "find", "fix", "understand", "bathroom", "pain", "stuck", "stop"],
    buckets: ["help_support", "pain", "bathroom_care", "device_media", "school_work", "person", "safety", "communication_repair"]
  },
  "help me": {
    direct: ["please", "with", "this", "that", "open", "find", "fix", "understand", "bathroom", "food", "clothes", "pain", "stuck", "stop"],
    buckets: ["help_support", "bathroom_care", "pain", "object", "school_work", "communication_repair"]
  },
  "i feel": {
    direct: ["happy", "sad", "mad", "scared", "sick", "tired", "hurt", "overwhelmed", "confused", "excited", "calm", "frustrated", "hot", "cold"],
    buckets: ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"]
  },
  "feel": {
    direct: ["happy", "sad", "mad", "scared", "sick", "tired", "hurt", "overwhelmed", "confused", "excited", "calm", "frustrated", "hot", "cold"],
    buckets: ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"]
  },
  "i am": {
    direct: ["feeling", "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "ready", "not ready", "done", "waiting", "here", "safe"],
    buckets: ["emotion", "body_state", "energy", "mental_care", "place", "person"]
  },
  "i'm": {
    direct: ["feeling", "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "ready", "not ready", "done", "waiting", "here", "safe"],
    buckets: ["emotion", "body_state", "energy", "mental_care", "place", "person"]
  },
  "i am feeling": {
    direct: ["happy", "sad", "mad", "scared", "sick", "tired", "hurt", "overwhelmed", "confused", "excited", "calm", "frustrated", "hot", "cold"],
    buckets: ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"]
  },
  "i'm feeling": {
    direct: ["happy", "sad", "mad", "scared", "sick", "tired", "hurt", "overwhelmed", "confused", "excited", "calm", "frustrated", "hot", "cold"],
    buckets: ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health", "energy", "mental_care"]
  },
  "i like": {
    direct: ["this", "that", "it", "you", "food", "music", "play", "outside", "school", "funny", "quiet", "fast", "slow", "because"],
    buckets: ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "emotion", "story_comment"]
  },
  "like": {
    direct: ["this", "that", "it", "you", "food", "music", "play", "outside", "funny", "quiet", "more", "because"],
    buckets: ["food_drink", "person", "activity", "device_media", "place", "texture_sensory", "emotion"]
  },
  "i don't like": {
    direct: ["this", "that", "it", "loud", "hurt", "hard", "scary", "food", "noise", "stop", "different", "because"],
    buckets: ["refusal_advocacy", "food_drink", "activity", "device_media", "place", "texture_sensory", "safety"]
  },
  "don't like": {
    direct: ["this", "that", "it", "loud", "hurt", "hard", "scary", "food", "noise", "stop", "different", "because"],
    buckets: ["refusal_advocacy", "food_drink", "activity", "device_media", "place", "texture_sensory", "safety"]
  },
  "i don't want": {
    direct: ["this", "that", "it", "more", "to", "you", "food", "noise", "touch", "different", "stop"],
    buckets: ["refusal_advocacy", "safety", "food_drink", "activity", "person", "object"]
  },
  "don't want": {
    direct: ["this", "that", "it", "more", "to", "you", "food", "noise", "touch", "different", "stop"],
    buckets: ["refusal_advocacy", "safety", "food_drink", "activity", "person", "object"]
  },
  "go": {
    direct: ["home", "school", "bathroom", "outside", "car", "store", "doctor", "playground", "therapy", "room", "away", "back", "with", "now"],
    buckets: ["place", "person", "activity", "safety"]
  },
  "go to": {
    direct: ["home", "school", "bathroom", "store", "doctor", "park", "work", "therapy", "room", "hospital"],
    buckets: ["place", "school_work", "person"]
  },
  "with": {
    direct: ["me", "you", "mom", "dad", "teacher", "friend", "this", "that", "help"],
    buckets: ["person", "object", "help_support"]
  },
  "my": {
    direct: ["turn", "body", "head", "hand", "food", "drink", "toy", "book", "tablet", "phone", "room", "seat", "clothes", "shoes"],
    buckets: ["object", "person", "pain", "place", "food_drink", "device_media"]
  },
  "you": {
    direct: ["help", "me", "stop", "go", "come", "look", "wait", "like", "want", "need", "listen", "understand"],
    buckets: ["activity", "help_support", "social_connection", "refusal_advocacy"]
  },
  "stop": {
    direct: ["please", "that", "this", "now", "touching", "noise", "because", "I am scared", "I am hurt", "I need help", "too loud", "too much", "wait", "finished", "no"],
    buckets: ["safety", "refusal_advocacy", "break_regulation", "texture_sensory", "pain", "person", "help_support"]
  },
  "no": {
    direct: ["stop", "not that", "I don't want", "different", "go away", "leave me alone", "more", "thank you"],
    buckets: ["refusal_advocacy", "safety", "communication_repair"]
  },
  "where": {
    direct: ["is", "are", "mom", "dad", "bathroom", "home", "school", "my", "it", "you"],
    buckets: ["person", "place", "object", "school_work", "bathroom_care"]
  },
  "where is": {
    direct: ["mom", "dad", "bathroom", "home", "school", "my", "it", "you", "teacher", "phone"],
    buckets: ["person", "place", "object", "school_work", "bathroom_care"]
  },
  "what": {
    direct: ["is", "are", "happened", "time", "next", "this", "that", "do", "you", "we"],
    buckets: ["question", "object", "activity", "food_drink", "school_work", "time_routine"]
  },
  "who": {
    direct: ["is", "are", "can", "will", "mom", "dad", "teacher", "friend", "doctor", "someone"],
    buckets: ["person", "question"]
  },
  "why": {
    direct: ["is", "are", "did", "can't", "not", "because", "I feel", "I need", "I want"],
    buckets: ["question", "emotion", "body_state", "safety", "story_comment"]
  },
  "how": {
    direct: ["do", "can", "much", "many", "long", "are", "is", "help", "use"],
    buckets: ["question", "activity", "help_support", "school_work"]
  },
  "because": {
    direct: ["I", "it", "you", "we", "my", "the", "I feel", "I need", "I want", "it hurts"],
    buckets: ["emotion", "body_state", "story_comment", "safety"]
  },
  "first": {
    direct: ["I", "we", "go", "do", "eat", "play", "work", "then"],
    buckets: ["story_comment", "time_routine", "activity", "school_work"]
  },
  "then": {
    direct: ["I", "we", "go", "do", "eat", "play", "work", "after"],
    buckets: ["story_comment", "time_routine", "activity", "school_work"]
  },
  "wrong": {
    direct: ["word", "one", "thing", "person", "place", "try again", "not that", "give me time"],
    buckets: ["communication_repair", "recovery_support"]
  },
  "wrong word": {
    direct: ["try again", "not that", "give me time", "show me", "say it another way", "please wait"],
    buckets: ["communication_repair", "recovery_support"]
  },
  "try again": {
    direct: ["please", "this", "that", "slower", "show me", "say it another way", "give me time"],
    buckets: ["communication_repair", "recovery_support"]
  },
  "give me time": {
    direct: ["please", "I know", "I remember", "show me", "write it", "yes", "no", "maybe"],
    buckets: ["communication_repair", "recovery_support", "break_regulation"]
  },
  "i remember": {
    direct: ["who", "what", "where", "when", "home", "family", "because", "then"],
    buckets: ["story_comment", "person", "place", "time_routine", "recovery_support"]
  },
  "i know": {
    direct: ["but", "this", "that", "who", "what", "where", "I know but can't say it"],
    buckets: ["story_comment", "communication_repair", "recovery_support"]
  },
  "i think": {
    direct: ["this", "that", "it", "you", "we", "because", "good", "bad", "right", "wrong", "different", "I agree", "I disagree"],
    buckets: ["story_comment", "social_connection", "color_size", "question", "refusal_advocacy"]
  },
  "i agree": {
    direct: ["with you", "with that", "because", "yes", "maybe", "but", "I think"],
    buckets: ["social_connection", "story_comment", "question"]
  },
  "i disagree": {
    direct: ["with you", "with that", "because", "no", "different", "my choice", "I think"],
    buckets: ["refusal_advocacy", "social_connection", "story_comment", "question"]
  },
  "i heard": {
    direct: ["this", "that", "you", "music", "noise", "at school", "at home", "today", "yesterday", "because", "then"],
    buckets: ["story_comment", "person", "place", "time_routine", "device_media", "school_work"]
  },
  "i found": {
    direct: ["this", "that", "it", "my", "at home", "at school", "outside", "today", "because", "then"],
    buckets: ["object", "place", "person", "story_comment", "time_routine"]
  },
  "that was": {
    direct: ["funny", "good", "bad", "scary", "loud", "hard", "easy", "fun", "interesting", "boring", "different"],
    buckets: ["story_comment", "emotion", "texture_sensory", "color_size", "social_connection"]
  },
  "what happened": {
    direct: ["first", "then", "after", "I saw", "I heard", "I found", "at home", "at school", "today", "yesterday"],
    buckets: ["story_comment", "person", "place", "time_routine", "school_work"]
  },
  "can i": {
    direct: ["have", "go", "play", "help", "stop", "try", "see", "use", "call", "ask", "please"],
    buckets: ["activity", "place", "object", "food_drink", "person", "help_support", "question"]
  },
  "do you": {
    direct: ["want", "like", "know", "need", "feel", "remember", "understand", "agree", "help"],
    buckets: ["question", "social_connection", "emotion", "help_support", "story_comment"]
  },
  "it hurts": {
    direct: ["here", "there", "a little", "a lot", "now", "when I move", "when touched", "help", "doctor", "medicine"],
    buckets: ["pain", "body_state", "sick_health", "help_support", "safety"]
  }
});

function phraseFrom(profile = {}, options = {}) {
  if (options.phrase !== undefined) return String(options.phrase || "").trim();
  const sentence = options.sentence ?? profile.sentence ?? [];
  return Array.isArray(sentence) ? sentence.join(" ").trim() : String(sentence || "").trim();
}

function phraseVariants(text = "") {
  const normalized = normalizeSemanticText(text);
  if (!normalized) return [];
  const parts = normalized.split(" ").filter(Boolean);
  const variants = new Set([normalized]);
  variants.add(normalized.replace(/\bi'm\b/g, "i am"));
  variants.add(normalized.replace(/\bi am\b/g, "i'm"));
  for (let length = Math.min(MAX_TAIL_WORDS, parts.length); length >= 1; length -= 1) {
    const tail = parts.slice(-length).join(" ");
    variants.add(tail);
    variants.add(tail.replace(/\bi'm\b/g, "i am"));
    variants.add(tail.replace(/\bi am\b/g, "i'm"));
  }
  return [...variants].filter(Boolean);
}

const ROUTE_KEYS = Object.keys(SEMANTIC_CONTEXT_ROUTES_V7_1)
  .sort((a, b) => b.split(" ").length - a.split(" ").length || b.length - a.length);

function matchRoute(text = "") {
  const variants = phraseVariants(text);
  for (const variant of variants) {
    const exact = ROUTE_KEYS.find(key => key === variant);
    if (exact) return { key: exact, route: SEMANTIC_CONTEXT_ROUTES_V7_1[exact], variants };
    const suffix = ROUTE_KEYS.find(key => variant.endsWith(` ${key}`));
    if (suffix) return { key: suffix, route: SEMANTIC_CONTEXT_ROUTES_V7_1[suffix], variants };
  }
  return { key: "", route: null, variants };
}

function normalizeItem(value) {
  return typeof value === "string" ? { label: value } : value || { label: "" };
}

function allowedRouteItem(value, profile = {}, options = {}) {
  const routeItem = normalizeItem(value);
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  if (routeItem.minStage && stage < routeItem.minStage) return false;
  if (routeItem.maxStage && stage > routeItem.maxStage) return false;
  if (routeItem.ageBands && !routeItem.ageBands.includes(ageBand)) return false;
  if (routeItem.excludeAgeBands && routeItem.excludeAgeBands.includes(ageBand)) return false;
  const concept = getStaticSemanticConceptV7_1(routeItem.label);
  return concept ? semanticItemAllowed(concept, profile, options) : true;
}

function uniqueLabels(values = [], currentPhrase = "") {
  const currentWords = new Set(normalizeSemanticText(currentPhrase).split(" ").filter(Boolean));
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const label = String(normalizeItem(value).label || "").trim();
    const key = normalizeSemanticText(label);
    if (!key || seen.has(key)) continue;
    if (currentWords.has(key) && !["more", "again", "please", "help"].includes(key)) continue;
    seen.add(key);
    output.push(label);
  }
  return output;
}

function limit(value, fallback, max = 24) {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(max, Math.round(parsed)));
}

function relationWordsForPhrase(phrase, profile = {}, options = {}) {
  const variants = phraseVariants(phrase);
  const lastWord = variants.find(value => !value.includes(" ")) || "";
  const lastTwo = variants.find(value => value.split(" ").length === 2) || "";
  const labels = [];
  if (lastTwo && getStaticSemanticConceptV7_1(lastTwo)) {
    labels.push(...getStaticRelatedConceptLabelsV7_1(lastTwo, { limit: 32 }));
  }
  if (lastWord) labels.push(...getStaticRelatedConceptLabelsV7_1(lastWord, { limit: 32 }));
  return labels.filter(label => allowedRouteItem(label, profile, options));
}

function ageAwareBoosts(profile = {}, options = {}) {
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  if (stage === 5 || ageBand === "aphasia_recovery") {
    return ["yes", "no", "maybe", "give me time", "wrong word", "try again", "show me", "write it", "family", "home", "doctor"];
  }
  if (["teen", "adult"].includes(ageBand) && stage >= 4) {
    return ["privacy", "work", "schedule", "phone", "money", "relationship", "my choice", "I need space"];
  }
  return [];
}

export function getSemanticGraphPredictionV7_1(profile = {}, options = {}) {
  const phrase = phraseFrom(profile, options);
  const routeMatch = matchRoute(phrase);
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  const directLimit = limit(options.directLimit ?? options.limit, DEFAULT_DIRECT_LIMIT, 40);
  const bucketLimit = limit(options.bucketLimit, DEFAULT_BUCKET_LIMIT, 12);

  const directSource = [
    ...(routeMatch.route?.direct || []),
    ...ageAwareBoosts(profile, options),
    ...relationWordsForPhrase(phrase, profile, options)
  ].filter(value => allowedRouteItem(value, profile, options));

  const directWords = uniqueLabels(directSource, phrase).slice(0, directLimit);
  const bucketIds = [...new Set((routeMatch.route?.buckets || []))]
    .filter(bucketId => {
      const bucket = SEMANTIC_BUCKETS_V7_1[bucketId];
      return bucket && semanticItemAllowed(bucket, profile, options);
    })
    .slice(0, bucketLimit);

  return {
    version: SEMANTIC_GRAPH_PREDICTION_VERSION,
    phrase,
    stage,
    ageBand,
    routeKey: routeMatch.key,
    variants: routeMatch.variants,
    directWords,
    bucketIds,
    bucketLabels: bucketIds.map(id => SEMANTIC_BUCKETS_V7_1[id]?.label).filter(Boolean),
    source: routeMatch.route ? "semantic-context-route" : directWords.length ? "semantic-concept-relations" : "semantic-waiting",
    localFirst: true,
    externalAiRequired: false
  };
}

export function getSemanticGraphCandidateWordsV7_1(profile = {}, options = {}) {
  return getSemanticGraphPredictionV7_1(profile, options).directWords;
}

export function getSemanticGraphBucketIdsV7_1(profile = {}, options = {}) {
  return getSemanticGraphPredictionV7_1(profile, options).bucketIds;
}

export function getSemanticGraphPredictionDebugV7_1(profile = {}, options = {}) {
  const prediction = getSemanticGraphPredictionV7_1(profile, options);
  return {
    ...prediction,
    directConcepts: prediction.directWords.map(label => {
      const concept = getStaticSemanticConceptV7_1(label);
      return concept ? {
        label: concept.label,
        primary: concept.primary_category,
        paths: concept.bucket_paths,
        intents: concept.intents,
        priority: concept.priority
      } : { label, primary: "unindexed", paths: [], intents: [], priority: "route-only" };
    })
  };
}

export default {
  SEMANTIC_GRAPH_PREDICTION_VERSION,
  SEMANTIC_CONTEXT_ROUTES_V7_1,
  getSemanticGraphPredictionV7_1,
  getSemanticGraphCandidateWordsV7_1,
  getSemanticGraphBucketIdsV7_1,
  getSemanticGraphPredictionDebugV7_1
};
