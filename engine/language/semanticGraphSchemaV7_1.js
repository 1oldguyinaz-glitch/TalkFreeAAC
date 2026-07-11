// TalkFreeAAC V7.1 — Semantic Graph Schema
// Stable metadata contract shared by prediction, bucket routing, search, and future Professional Insights.
// Communication remains local-first and free. This schema contains no network or paid-service dependency.

export const SEMANTIC_GRAPH_VERSION = "7.1.0-semantic-concept-graph";

export const SEMANTIC_PRIORITIES = Object.freeze([
  "core",
  "common",
  "specialized",
  "rare"
]);

export const SEMANTIC_AGE_BANDS = Object.freeze([
  "child",
  "teen",
  "adult",
  "aphasia_recovery"
]);

export const SEMANTIC_INTENTS = Object.freeze([
  "request",
  "choice",
  "refusal",
  "self_advocacy",
  "question",
  "social_connection",
  "comment",
  "describe",
  "emotion",
  "body_health",
  "communication_repair",
  "narrative",
  "action",
  "location",
  "time_routine",
  "school_work",
  "safety",
  "recovery_support"
]);

export const SEMANTIC_TOP_LEVEL_CATEGORIES = Object.freeze({
  core: {
    id: "core",
    label: "Core Words",
    description: "High-frequency grammar and functional words used across messages."
  },
  people: {
    id: "people",
    label: "People",
    description: "Family, friends, helpers, professionals, and relationship words."
  },
  actions: {
    id: "actions",
    label: "Actions",
    description: "Things a person can do, request, stop, or describe."
  },
  objects: {
    id: "objects",
    label: "Things / Objects",
    description: "Personal items, household objects, toys, tools, and devices."
  },
  food_drink: {
    id: "food_drink",
    label: "Food & Drink",
    description: "Foods, drinks, meals, snacks, groceries, and cooking concepts."
  },
  places: {
    id: "places",
    label: "Places",
    description: "Home, school, community, travel, and destination concepts."
  },
  feelings_states: {
    id: "feelings_states",
    label: "Feelings & Body States",
    description: "Emotions, regulation, sensory states, energy, and internal states."
  },
  body_health: {
    id: "body_health",
    label: "Body & Health",
    description: "Body parts, pain, illness, care, medical, and recovery concepts."
  },
  descriptors: {
    id: "descriptors",
    label: "Descriptors",
    description: "Color, size, shape, texture, amount, speed, opinion, and qualities."
  },
  questions: {
    id: "questions",
    label: "Questions",
    description: "Question words, information requests, and clarification."
  },
  social: {
    id: "social",
    label: "Social",
    description: "Greetings, relationships, humor, boundaries, and social connection."
  },
  needs_help: {
    id: "needs_help",
    label: "Needs & Help",
    description: "Help, breaks, personal care, support, and functional needs."
  },
  school_work: {
    id: "school_work",
    label: "School / Work",
    description: "Academic, classroom, therapy, vocational, and work concepts."
  },
  time_routines: {
    id: "time_routines",
    label: "Time & Routines",
    description: "Time, sequence, schedules, routines, and planning."
  },
  communication_repair: {
    id: "communication_repair",
    label: "Communication Repair",
    description: "Correcting, clarifying, slowing down, and rebuilding a message."
  },
  safety_emergency: {
    id: "safety_emergency",
    label: "Safety / Emergency",
    description: "Safety, refusal, boundaries, urgent help, and emergency concepts."
  },
  play_leisure: {
    id: "play_leisure",
    label: "Play / Leisure",
    description: "Play, hobbies, sports, music, art, entertainment, and recreation."
  },
  technology_media: {
    id: "technology_media",
    label: "Technology / Media",
    description: "Devices, communication technology, media, games, and digital concepts."
  }
});

export const SEMANTIC_BUCKETS_V7_1 = Object.freeze({
  core_words: {
    id: "core_words",
    label: "Core Words",
    topLevel: "core",
    description: "High-frequency grammar and functional words that combine across messages.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["core_word", "grammar", "connector"],
    fallback: ["I", "you", "want", "need", "more", "not", "go", "help", "this", "that", "it", "and"]
  },
  emotion: {
    id: "emotion",
    label: "Emotion",
    topLevel: "feelings_states",
    description: "Emotional feelings and moods.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["emotion", "mood", "regulation"],
    fallback: ["happy", "sad", "mad", "scared", "calm", "excited", "frustrated", "worried", "proud", "lonely", "okay"]
  },
  body_state: {
    id: "body_state",
    label: "Body",
    topLevel: "feelings_states",
    description: "Internal body states and physical sensations.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["body_state", "energy", "sensory_state"],
    fallback: ["hungry", "thirsty", "tired", "sleepy", "dizzy", "weak", "shaky", "itchy", "sweaty", "full"]
  },
  temperature: {
    id: "temperature",
    label: "Temperature",
    topLevel: "descriptors",
    description: "Temperature and thermal comfort language.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["temperature"],
    fallback: ["hot", "cold", "warm", "cool", "freezing", "burning", "too hot", "too cold"]
  },
  texture_sensory: {
    id: "texture_sensory",
    label: "Texture / Sensory",
    topLevel: "descriptors",
    description: "Texture, touch, sound, light, and sensory input.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["texture", "sensory", "sound", "light"],
    fallback: ["sticky", "wet", "dry", "hard", "soft", "scratchy", "tight", "loud", "bright", "quiet", "too much", "comfortable"]
  },
  pain: {
    id: "pain",
    label: "Pain",
    topLevel: "body_health",
    description: "Pain location, intensity, and quality.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["pain", "body_part", "symptom"],
    fallback: ["hurt", "pain", "sore", "burning", "sharp", "pressure", "head", "stomach", "throat", "ear", "back", "leg"]
  },
  sick_health: {
    id: "sick_health",
    label: "Sick / Health",
    topLevel: "body_health",
    description: "Illness, symptoms, medicine, and medical support.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["health", "symptom", "medical"],
    fallback: ["sick", "nauseous", "dizzy", "medicine", "doctor", "nurse", "throw up", "cough", "fever", "allergy"]
  },
  energy: {
    id: "energy",
    label: "Energy",
    topLevel: "feelings_states",
    description: "Energy, fatigue, readiness, and regulation state.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["energy", "readiness", "regulation"],
    fallback: ["tired", "ready", "not ready", "sleepy", "awake", "calm", "busy", "slow", "fast", "done"]
  },
  mental_care: {
    id: "mental_care",
    label: "Mental Care",
    topLevel: "feelings_states",
    description: "Overwhelm, anxiety, confusion, safety, and regulation support.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["mental_care", "regulation", "self_advocacy"],
    fallback: ["overwhelmed", "confused", "unsafe", "need break", "give me time", "please wait", "too much", "quiet", "space", "safe"]
  },
  food_drink: {
    id: "food_drink",
    label: "Food / Drink",
    topLevel: "food_drink",
    description: "Foods, drinks, meals, snacks, groceries, and cooking.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["food", "drink", "meal", "snack", "grocery", "cooking"],
    fallback: ["food", "drink", "water", "snack", "juice", "milk", "apple", "banana", "pizza", "chips", "more"]
  },
  activity: {
    id: "activity",
    label: "Activity",
    topLevel: "actions",
    description: "Actions, movement, play, and activities.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["action", "movement", "play", "leisure"],
    fallback: ["play", "go", "watch", "read", "run", "walk", "sit", "stand", "open", "close", "try", "help"]
  },
  place: {
    id: "place",
    label: "Place",
    topLevel: "places",
    description: "Destinations, rooms, community places, and travel locations.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["place", "home", "school", "community", "transportation"],
    fallback: ["outside", "inside", "home", "school", "bathroom", "park", "car", "room", "store", "doctor"]
  },
  person: {
    id: "person",
    label: "Person",
    topLevel: "people",
    description: "Family, friends, helpers, and professionals.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["family", "friend", "school_person", "medical_person", "community_person"],
    fallback: ["mom", "dad", "teacher", "friend", "doctor", "nurse", "grandma", "grandpa", "brother", "sister", "someone"]
  },
  object: {
    id: "object",
    label: "Object",
    topLevel: "objects",
    description: "Personal items, household objects, toys, tools, and devices.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["object", "personal_item", "household_item", "toy", "tool"],
    fallback: ["tablet", "toy", "phone", "blanket", "cup", "book", "chair", "bed", "charger", "device"]
  },
  help_support: {
    id: "help_support",
    label: "Help",
    topLevel: "needs_help",
    description: "Help, support, assistance, and functional needs.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["help", "support", "assistance", "accessibility"],
    fallback: ["help", "help me", "please", "wait", "show me", "fix it", "open", "close", "find", "understand"]
  },
  break_regulation: {
    id: "break_regulation",
    label: "Break",
    topLevel: "needs_help",
    description: "Breaks, quiet, space, stop, and regulation support.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["break", "regulation", "sensory_support"],
    fallback: ["break", "quiet", "space", "stop", "finished", "done", "too much", "wait", "safe", "calm"]
  },
  device_media: {
    id: "device_media",
    label: "Device / Media",
    topLevel: "technology_media",
    description: "Technology, media, shows, music, games, and devices.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["device", "media", "game", "music", "accessibility_device"],
    fallback: ["tablet", "phone", "music", "show", "game", "video", "charger", "TV", "headphones"]
  },
  bathroom_care: {
    id: "bathroom_care",
    label: "Bathroom / Care",
    topLevel: "needs_help",
    description: "Bathroom, hygiene, personal care, and privacy.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["bathroom", "hygiene", "personal_care", "privacy"],
    fallback: ["bathroom", "toilet", "wash", "hands", "shower", "brush teeth", "change", "clean", "privacy"]
  },
  safety: {
    id: "safety",
    label: "Safety",
    topLevel: "safety_emergency",
    description: "Safety, urgent help, boundaries, and emergencies.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["safety", "emergency", "boundary", "urgent_help"],
    fallback: ["help", "stop", "unsafe", "safe", "hurt", "call someone", "emergency", "no", "go away", "I need help"]
  },
  question: {
    id: "question",
    label: "Question",
    topLevel: "questions",
    description: "Question words, information requests, and clarification.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["question", "clarification", "information"],
    fallback: ["what", "where", "who", "when", "why", "how", "which", "can", "do", "is"]
  },
  weather: {
    id: "weather",
    label: "Weather",
    topLevel: "descriptors",
    description: "Weather, clothing needs, and outdoor conditions.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["weather", "outdoor_condition", "clothing_need"],
    fallback: ["sunny", "rainy", "snow", "windy", "hot", "cold", "cloudy", "jacket", "umbrella"]
  },
  color_size: {
    id: "color_size",
    label: "Color / Size",
    topLevel: "descriptors",
    description: "Colors, sizes, shapes, amounts, and visual descriptors.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["color", "size", "shape", "amount"],
    fallback: ["big", "small", "red", "blue", "green", "yellow", "black", "white", "round", "long"]
  },
  time_routine: {
    id: "time_routine",
    label: "Time / Routine",
    topLevel: "time_routines",
    description: "Time, sequence, schedules, and routines.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["time", "sequence", "schedule", "routine"],
    fallback: ["now", "later", "next", "before", "after", "morning", "night", "today", "tomorrow", "schedule"]
  },
  school_work: {
    id: "school_work",
    label: "School / Work",
    topLevel: "school_work",
    description: "School, classroom, therapy, work, and task concepts.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["school", "classroom", "academic", "therapy", "work"],
    fallback: ["school", "teacher", "class", "work", "homework", "read", "write", "math", "finished", "help"]
  },
  social_connection: {
    id: "social_connection",
    label: "Social",
    topLevel: "social",
    description: "Greetings, connection, humor, friendship, and shared attention.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["greeting", "connection", "humor", "relationship"],
    fallback: ["hi", "bye", "thank you", "please", "I like you", "funny", "friend", "hug", "talk", "listen"]
  },
  refusal_advocacy: {
    id: "refusal_advocacy",
    label: "No / Advocate",
    topLevel: "safety_emergency",
    description: "Refusal, consent, boundaries, choice, and self-advocacy.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["refusal", "self_advocacy", "boundary", "consent"],
    fallback: ["no", "stop", "not that", "I don't want", "different", "go away", "my choice", "please wait", "I need space"]
  },
  communication_repair: {
    id: "communication_repair",
    label: "Fix My Message",
    topLevel: "communication_repair",
    description: "Correcting, clarifying, and rebuilding communication.",
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["repair", "clarification", "word_finding", "pace"],
    fallback: ["wrong word", "try again", "not that", "give me time", "please wait", "show me", "say it another way", "I don't know", "I know but can't say it"]
  },
  story_comment: {
    id: "story_comment",
    label: "Tell / Comment",
    topLevel: "social",
    description: "Comments, opinions, stories, events, and narrative language.",
    stage_access: [2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    secondary_categories: ["comment", "opinion", "story", "narrative"],
    fallback: ["I think", "I know", "I remember", "it happened", "first", "then", "after", "because", "funny", "important"]
  },
  recovery_support: {
    id: "recovery_support",
    label: "Recovery Support",
    topLevel: "communication_repair",
    description: "Adult word-finding, phrase rebuilding, orientation, and verification support.",
    stage_access: [5],
    age_bands: ["adult", "aphasia_recovery"],
    secondary_categories: ["recovery", "word_finding", "verification", "orientation"],
    fallback: ["yes", "no", "maybe", "give me time", "wrong word", "try again", "I know but can't say it", "show me", "write it", "family", "home", "doctor"]
  }
});

export function normalizeSemanticText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9'/_ -]+/g, " ")
    .replace(/\bi\s*m\b/g, "i'm")
    .replace(/\bim\b/g, "i'm")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeSemanticStage(value, fallback = 1) {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(5, Math.round(parsed)));
}

export function normalizeAgeBand(value = "") {
  const normalized = normalizeSemanticText(value).replace(/\s+/g, "_");
  if (["aphasia", "recovery", "aphasia_recovery", "adult_recovery"].includes(normalized)) return "aphasia_recovery";
  if (["teen", "teenager", "adolescent"].includes(normalized)) return "teen";
  if (["adult", "young_adult", "older_adult"].includes(normalized)) return "adult";
  return "child";
}

export function stageFromSemanticProfile(profile = {}, options = {}) {
  return normalizeSemanticStage(
    options.stage ??
    profile.communicationStage ??
    profile.stage ??
    profile.settings?.communicationStage ??
    1
  );
}

export function ageBandFromSemanticProfile(profile = {}, options = {}) {
  return normalizeAgeBand(
    options.ageBand ??
    profile.settings?.ageBand ??
    profile.ageBand ??
    profile.userProfile?.ageBand ??
    "child"
  );
}

export function semanticItemAllowed(item = {}, profile = {}, options = {}) {
  const stage = stageFromSemanticProfile(profile, options);
  const ageBand = ageBandFromSemanticProfile(profile, options);
  const stages = Array.isArray(item.stage_access) ? item.stage_access : [1, 2, 3, 4, 5];
  const ageBands = Array.isArray(item.age_bands) && item.age_bands.length ? item.age_bands : SEMANTIC_AGE_BANDS;
  return stages.includes(stage) && ageBands.includes(ageBand);
}

export function validateSemanticConceptNodeV7_1(node = {}) {
  const errors = [];
  if (!node.id) errors.push("missing id");
  if (!node.label) errors.push("missing label");
  if (!SEMANTIC_TOP_LEVEL_CATEGORIES[node.primary_category]) errors.push("invalid primary_category");
  if (!Array.isArray(node.secondary_categories) || node.secondary_categories.length === 0) errors.push("missing secondary_categories");
  if (!Array.isArray(node.intents) || node.intents.length === 0) errors.push("missing intents");
  if (!Array.isArray(node.stage_access) || node.stage_access.length === 0) errors.push("missing stage_access");
  if (!Array.isArray(node.age_bands) || node.age_bands.length === 0) errors.push("missing age_bands");
  if (!SEMANTIC_PRIORITIES.includes(node.priority)) errors.push("invalid priority");
  if (!Array.isArray(node.sentence_frames) || node.sentence_frames.length === 0) errors.push("missing sentence_frames");
  if (!node.relations || typeof node.relations !== "object") errors.push("missing relations");
  return { valid: errors.length === 0, errors };
}

export default {
  SEMANTIC_GRAPH_VERSION,
  SEMANTIC_PRIORITIES,
  SEMANTIC_AGE_BANDS,
  SEMANTIC_INTENTS,
  SEMANTIC_TOP_LEVEL_CATEGORIES,
  SEMANTIC_BUCKETS_V7_1,
  normalizeSemanticText,
  normalizeSemanticStage,
  normalizeAgeBand,
  stageFromSemanticProfile,
  ageBandFromSemanticProfile,
  semanticItemAllowed,
  validateSemanticConceptNodeV7_1
};
