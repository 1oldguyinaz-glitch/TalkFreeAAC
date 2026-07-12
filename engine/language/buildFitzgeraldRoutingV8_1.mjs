// TalkFreeAAC V8.1 — deterministic Fitzgerald six-column routing builder.
// Enriches all 10,000 V5.27 language entries without exposing the full database on screen.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATABASE_PATH = path.join(HERE, "languageDatabaseV5_27_10000.json");
const GRAPH_PATH = path.join(HERE, "semanticConceptGraphV7_1_10000.json");
const AUDIT_PATH = path.join(HERE, "fitzgeraldRoutingV8_1.audit.json");

export const FITZGERALD_ROUTING_VERSION = "8.1.0";
export const FITZGERALD_PAGE_SIZE = 10;

const ROLE_BY_COLUMN = {
  1: "initiator_pronoun_question",
  2: "action_verb",
  3: "modifier_negation_preposition",
  4: "possessive_determiner",
  5: "describer_emotion_adjective",
  6: "target_noun"
};

const NEXT_STATE_BY_COLUMN = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 1 };
const ALL_STATES = [1, 2, 3, 4, 5, 6];

const ALWAYS_ACTIVE = new Set(["yes", "no", "help", "stop", "clear"]);

const SUBJECT_AND_PERSONAL_PRONOUNS = new Set([
  "i", "me", "you", "he", "him", "she", "her", "we", "us", "they", "them", "it",
  "someone", "somebody", "anyone", "anybody", "everyone", "everybody", "nobody", "whoever"
]);

const QUESTION_WORDS = new Set([
  "what", "where", "who", "whom", "whose", "when", "why", "how", "which"
]);

const QUESTION_AUXILIARIES = new Set([
  "am", "is", "are", "was", "were", "be", "been", "being", "do", "does", "did",
  "can", "could", "will", "would", "shall", "should", "may", "might", "must",
  "have", "has", "had"
]);

const SOCIAL_INITIATORS = new Set([
  "hello", "hi", "hey", "goodbye", "bye", "please", "thanks", "thank you", "sorry",
  "excuse me", "yes please", "no thank you", "okay", "ok"
]);

const POSSESSIVES = new Set([
  "my", "mine", "your", "yours", "his", "her", "hers", "our", "ours", "their", "theirs", "its"
]);

const DETERMINERS = new Set([
  "a", "an", "the", "this", "that", "these", "those", "some", "any", "all", "both",
  "each", "every", "either", "neither", "another", "other", "much", "many", "few", "fewer",
  "most", "enough", "several", "one", "two", "three", "four", "five"
]);

const NEGATIONS = new Set([
  "not", "no", "never", "none", "nothing", "nobody", "nowhere", "cannot", "can't", "cant",
  "don't", "dont", "doesn't", "doesnt", "didn't", "didnt", "won't", "wont", "wouldn't",
  "wouldnt", "shouldn't", "shouldnt", "couldn't", "couldnt", "isn't", "isnt", "aren't",
  "arent", "wasn't", "wasnt", "weren't", "werent", "without"
]);

const PREPOSITIONS = new Set([
  "about", "above", "across", "after", "against", "along", "among", "around", "at", "before",
  "behind", "below", "beneath", "beside", "between", "beyond", "by", "despite", "down", "during",
  "except", "for", "from", "in", "inside", "into", "near", "of", "off", "on", "onto", "out",
  "outside", "over", "past", "since", "through", "throughout", "to", "toward", "towards", "under",
  "underneath", "until", "up", "upon", "with", "within", "without"
]);

const CONNECTORS = new Set([
  "and", "or", "but", "because", "so", "if", "then", "while", "although", "though", "unless",
  "when", "where", "as", "than", "yet", "also", "however", "therefore", "instead"
]);

const ADVERBIAL_MODIFIERS = new Set([
  "again", "almost", "already", "always", "away", "back", "carefully", "even", "fast", "first",
  "forward", "here", "just", "last", "later", "maybe", "more", "less", "most", "next", "now", "often",
  "only", "probably", "quickly", "rarely", "really", "slowly", "sometimes", "soon", "still",
  "together", "too", "usually", "very", "there", "today", "tomorrow", "yesterday"
]);

const BODY_AND_CONDITION_DESCRIPTORS = new Set([
  "allergic", "awake", "bleeding", "bored", "broken", "busy", "calm", "charged", "comfortable",
  "confused", "constipated", "dizzy", "done", "dry", "finished", "full", "hungry", "hurt", "itchy",
  "locked", "lost", "missing", "nauseous", "numb", "okay", "overwhelmed", "ready", "relaxed",
  "safe", "sick", "sleepy", "sore", "stuck", "sweaty", "thirsty", "tingly", "tired", "uncomfortable",
  "unlocked", "unsafe", "upset", "wet", "weak", "worried"
]);

const CORE_VERB_OVERRIDES = new Set([
  "accept", "ask", "be", "bring", "buy", "call", "carry", "catch", "change", "check", "choose",
  "clean", "close", "come", "cook", "copy", "cut", "decide", "do", "drink", "drive", "eat",
  "feel", "find", "finish", "fix", "get", "give", "go", "have", "hear", "help", "hold", "know",
  "learn", "leave", "like", "listen", "look", "love", "make", "move", "need", "open", "pay",
  "pick", "play", "put", "read", "remember", "repeat", "run", "say", "see", "share", "show",
  "sit", "sleep", "speak", "spell", "stand", "start", "stay", "stop", "take", "talk", "tell",
  "think", "throw", "touch", "try", "turn", "understand", "use", "wait", "walk", "want", "wash",
  "watch", "work", "write"
]);

const KNOWN_GRAMMAR_PROFILES = new Map([
  ["want", "grammar_want"], ["need", "grammar_need"], ["go", "grammar_go"], ["eat", "grammar_eat"],
  ["drink", "grammar_drink"], ["make", "grammar_make"], ["get", "grammar_get"], ["have", "grammar_have"],
  ["see", "grammar_see"], ["feel", "grammar_feel"]
]);

const BUCKET_COLUMN_FALLBACK = {
  question: 1,
  social_connection: 1,
  communication_repair: 1,
  recovery_support: 1,
  refusal_advocacy: 1,
  help_support: 1,
  safety: 1,
  story_comment: 1,
  activity: 2,
  core_words: 3,
  break_regulation: 5,
  emotion: 5,
  body_state: 5,
  temperature: 5,
  texture_sensory: 5,
  energy: 5,
  mental_care: 5,
  weather: 5,
  color_size: 5,
  food_drink: 6,
  place: 6,
  person: 6,
  object: 6,
  pain: 6,
  sick_health: 6,
  device_media: 6,
  bathroom_care: 6,
  school_work: 6,
  time_routine: 6
};

const CATEGORY_COLUMN_FALLBACK = {
  questions: 1,
  social: 1,
  communication_repair: 1,
  needs_help: 1,
  safety_emergency: 1,
  actions: 2,
  core: 3,
  descriptors: 5,
  feelings_states: 5,
  people: 6,
  objects: 6,
  food_drink: 6,
  places: 6,
  body_health: 6,
  school_work: 6,
  time_routines: 6,
  play_leisure: 6,
  technology_media: 6
};

const BRANCH_TO_BUCKET = {
  core: "core_words",
  actions: "activity",
  expanded_verbs: "activity",
  questions: "question",
  communication_repair: "communication_repair",
  grammar_language: "core_words",
  social: "social_connection",
  social_boundaries: "refusal_advocacy",
  choice_preference: "story_comment",
  emergency: "safety",
  emergency_deep: "safety",
  safety_sensitive: "safety",
  parent_gated_safety_deep: "safety",
  feelings: "emotion",
  regulation: "break_regulation",
  behavior_support: "break_regulation",
  sensory: "texture_sensory",
  temperature: "temperature",
  descriptors: "color_size",
  expanded_descriptors: "color_size",
  states_conditions: "body_state",
  body_pain: "pain",
  medical_deep: "sick_health",
  personal_care: "bathroom_care",
  food_drink: "food_drink",
  grocery: "food_drink",
  food_cooking_deep: "food_drink",
  people: "person",
  places: "place",
  community: "place",
  community_errands: "place",
  transportation: "place",
  travel_navigation: "place",
  household: "object",
  household_items_deep: "object",
  technology_media: "device_media",
  accessibility_devices: "device_media",
  play: "object",
  nature_animals: "object",
  animals_deep: "object",
  school: "school_work",
  academic_deep: "school_work",
  reading_writing: "school_work",
  math_deep: "school_work",
  science_nature: "school_work",
  therapy_goals: "school_work",
  work_vocational: "school_work",
  life_skills: "school_work",
  money_life_skills: "school_work",
  time_routines: "time_routine",
  weather_clothing: "weather",
  sports_movement: "activity",
  music_art_creativity: "object",
  holidays_events: "time_routine",
  digital_safety: "device_media",
  home_living_deep: "object"
};

function normalize(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[_–—]/g, " ")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstToken(label = "") {
  return normalize(label).split(" ").filter(Boolean)[0] || "";
}

function startsWithAny(label, values) {
  const normalized = normalize(label);
  for (const value of values) {
    if (normalized === value || normalized.startsWith(`${value} `)) return true;
  }
  return false;
}

function routeBucket(entry, concept) {
  const graphBucket = concept?.bucket_paths?.find(Boolean);
  return graphBucket || BRANCH_TO_BUCKET[entry.primary_branch] || "object";
}

function buildActionLexicon(concepts) {
  const set = new Set(CORE_VERB_OVERRIDES);
  for (const concept of concepts) {
    const label = normalize(concept.label);
    if (!label || label.includes(" ")) continue;
    if (concept.primary_category === "actions" || concept.bucket_paths?.includes("activity")) set.add(label);
  }
  return set;
}

function classifyEntry(entry, concept, actionLexicon) {
  const label = normalize(entry.label);
  const first = firstToken(label);
  const bucket = routeBucket(entry, concept);
  const primaryCategory = concept?.primary_category || "";
  const isAtomic = entry.type !== "word";

  if (ALWAYS_ACTIVE.has(label)) {
    const gridColumn = label === "stop" ? 2 : 1;
    return { gridColumn, activeStates: ALL_STATES, source: "always_active_override", confidence: "high" };
  }

  // These words intentionally preserve more than one valid motor-plan position.
  if (["this", "that", "these", "those"].includes(label)) {
    return { gridColumn: 4, activeStates: [1, 4], source: "demonstrative_multi_role", confidence: "high" };
  }
  if (["more", "less"].includes(label)) {
    return { gridColumn: 3, activeStates: [3, 5], source: "quantity_modifier_multi_role", confidence: "high" };
  }
  if (["same", "different"].includes(label)) {
    return { gridColumn: 5, activeStates: [3, 5], source: "comparison_descriptor_multi_role", confidence: "high" };
  }

  if (POSSESSIVES.has(label) || DETERMINERS.has(label) || startsWithAny(label, POSSESSIVES)) {
    return { gridColumn: 4, activeStates: [4], source: "possessive_determiner_lexicon", confidence: "high" };
  }

  if (SUBJECT_AND_PERSONAL_PRONOUNS.has(label) || QUESTION_WORDS.has(label) || SOCIAL_INITIATORS.has(label)) {
    return { gridColumn: 1, activeStates: [1], source: "initiator_pronoun_question_lexicon", confidence: "high" };
  }

  if (NEGATIONS.has(label) || PREPOSITIONS.has(label) || CONNECTORS.has(label) || ADVERBIAL_MODIFIERS.has(label)) {
    return { gridColumn: 3, activeStates: [3], source: "modifier_connector_lexicon", confidence: "high" };
  }

  if (BODY_AND_CONDITION_DESCRIPTORS.has(label)) {
    return { gridColumn: 5, activeStates: [5], source: "condition_descriptor_lexicon", confidence: "high" };
  }

  // A core action wins over auxiliary-question ambiguity, but remains valid in State 1 when appropriate.
  if (actionLexicon.has(label)) {
    const activeStates = QUESTION_AUXILIARIES.has(label) ? [1, 2] : [2];
    return { gridColumn: 2, activeStates, source: QUESTION_AUXILIARIES.has(label) ? "action_auxiliary_multi_role" : "action_lexicon", confidence: "high" };
  }

  if (QUESTION_AUXILIARIES.has(label)) {
    return { gridColumn: 1, activeStates: [1, 2], source: "question_auxiliary_lexicon", confidence: "high" };
  }

  // Phrase/template prefix analysis is intentionally ahead of broad semantic fallbacks.
  if (isAtomic) {
    if (
      SUBJECT_AND_PERSONAL_PRONOUNS.has(first) || QUESTION_WORDS.has(first) || QUESTION_AUXILIARIES.has(first) ||
      SOCIAL_INITIATORS.has(first) || startsWithAny(label, ["can i", "can you", "could i", "could you", "will you", "would you", "do you", "did you", "is there", "are there"])
    ) {
      return { gridColumn: 1, activeStates: [1], source: "phrase_initiator_prefix", confidence: "high" };
    }

    if (POSSESSIVES.has(first) || DETERMINERS.has(first)) {
      return { gridColumn: 4, activeStates: [4], source: "phrase_determiner_prefix", confidence: "high" };
    }

    if (NEGATIONS.has(first) || PREPOSITIONS.has(first) || CONNECTORS.has(first) || ADVERBIAL_MODIFIERS.has(first)) {
      return { gridColumn: 3, activeStates: [3], source: "phrase_modifier_prefix", confidence: "high" };
    }

    if (actionLexicon.has(first)) {
      return { gridColumn: 2, activeStates: [2], source: "phrase_action_prefix", confidence: "high" };
    }
  }

  if (primaryCategory === "descriptors" || primaryCategory === "feelings_states") {
    return { gridColumn: 5, activeStates: [5], source: "semantic_category_descriptor", confidence: "high" };
  }

  if (primaryCategory === "actions") {
    return { gridColumn: 2, activeStates: [2], source: "semantic_category_action", confidence: "high" };
  }

  // Atomic phrases in these communication domains behave as sentence initiators/quick messages.
  if (isAtomic && [
    "question", "social_connection", "communication_repair", "recovery_support",
    "refusal_advocacy", "help_support", "safety", "story_comment"
  ].includes(bucket)) {
    return { gridColumn: 1, activeStates: [1], source: "atomic_communication_bucket", confidence: "medium" };
  }

  // Single words and noun compounds in communication/safety domains remain targets unless a lexical rule above says otherwise.
  if (!isAtomic && [
    "social_connection", "communication_repair", "recovery_support",
    "refusal_advocacy", "help_support", "safety", "story_comment"
  ].includes(bucket)) {
    return { gridColumn: 6, activeStates: [6], source: "communication_noun_target_fallback", confidence: "medium" };
  }

  const bucketColumn = BUCKET_COLUMN_FALLBACK[bucket];
  if (bucketColumn) {
    return { gridColumn: bucketColumn, activeStates: [bucketColumn], source: "semantic_bucket_fallback", confidence: "medium" };
  }

  const categoryColumn = CATEGORY_COLUMN_FALLBACK[primaryCategory];
  if (categoryColumn) {
    return { gridColumn: categoryColumn, activeStates: [categoryColumn], source: "semantic_category_fallback", confidence: "medium" };
  }

  return { gridColumn: 6, activeStates: [6], source: "safe_target_fallback", confidence: "low" };
}

function tapAction(entry, gridColumn, label) {
  if (ALWAYS_ACTIVE.has(label)) {
    return label === "clear" ? "clear_sentence_and_reset_to_state_1" : "insert_word_and_reset_to_state_1";
  }

  // Existing database phrases and templates are complete/atomic communication shortcuts.
  if (entry.type === "functional_phrase") return "insert_phrase_and_reset_to_state_1";
  if (entry.type === "sentence_template") return "insert_template_and_reset_to_state_1";

  if (gridColumn === 2 && KNOWN_GRAMMAR_PROFILES.has(label)) {
    return "set_pending_verb_and_open_column_3_grammar";
  }

  return gridColumn === 6
    ? "insert_word_and_reset_to_state_1"
    : `insert_word_and_advance_to_state_${NEXT_STATE_BY_COLUMN[gridColumn]}`;
}

function stageRank(entry) {
  const visibility = {
    stage1_core_active: 0,
    always_emergency: 1,
    stage2_context_active: 2,
    stage3_deep_context: 3,
    stage4_search_or_context: 4,
    parent_gated: 5
  };
  return visibility[entry.visibility_tier] ?? 9;
}

function assignPages(entries) {
  const groups = new Map();
  entries.forEach((entry, index) => {
    const groupKey = `${entry.grid_column}:${entry.route_bucket}`;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push({ entry, index });
  });

  for (const groupEntries of groups.values()) {
    groupEntries.sort((a, b) => {
      const stageDifference = stageRank(a.entry) - stageRank(b.entry);
      if (stageDifference) return stageDifference;
      const utilityDifference = Number(b.entry.v5_26_utility_score || 0) - Number(a.entry.v5_26_utility_score || 0);
      if (utilityDifference) return utilityDifference;
      const predictionDifference = Number(b.entry.prediction_weight || 0) - Number(a.entry.prediction_weight || 0);
      if (predictionDifference) return predictionDifference;
      return a.index - b.index;
    });

    groupEntries.forEach(({ entry }, position) => {
      entry.display_page = Math.floor(position / FITZGERALD_PAGE_SIZE) + 1;
      entry.grid_slot = (position % FITZGERALD_PAGE_SIZE) + 1;
      entry.route_path = `state_${entry.grid_column}/${entry.route_bucket}/page_${entry.display_page}/slot_${entry.grid_slot}`;
    });
  }
}

function countBy(entries, field) {
  const result = {};
  for (const entry of entries) {
    const key = String(entry[field]);
    result[key] = (result[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })));
}

function validate(entries) {
  const errors = [];
  const routeSlots = new Set();

  if (entries.length !== 10000) errors.push(`Expected 10000 entries, found ${entries.length}.`);

  for (const entry of entries) {
    if (!Number.isInteger(entry.grid_column) || entry.grid_column < 1 || entry.grid_column > 6) {
      errors.push(`${entry.id}: invalid grid_column`);
    }
    if (!Array.isArray(entry.active_in_state) || entry.active_in_state.length === 0) {
      errors.push(`${entry.id}: missing active_in_state`);
    }
    if (!entry.active_in_state.every(state => Number.isInteger(state) && state >= 1 && state <= 6)) {
      errors.push(`${entry.id}: invalid active_in_state`);
    }
    if (!entry.fitzgerald_role || !entry.route_bucket || !entry.on_tap_action) {
      errors.push(`${entry.id}: incomplete Fitzgerald route`);
    }
    if (!Number.isInteger(entry.display_page) || entry.display_page < 1 || !Number.isInteger(entry.grid_slot) || entry.grid_slot < 1 || entry.grid_slot > FITZGERALD_PAGE_SIZE) {
      errors.push(`${entry.id}: invalid page/slot`);
    }

    const slotKey = `${entry.grid_column}:${entry.route_bucket}:${entry.display_page}:${entry.grid_slot}`;
    if (routeSlots.has(slotKey)) errors.push(`${entry.id}: duplicate route slot ${slotKey}`);
    routeSlots.add(slotKey);
  }

  return errors;
}

export function buildFitzgeraldRoutingV8_1(database, semanticGraph) {
  const concepts = semanticGraph?.concepts || [];
  const conceptBySourceId = new Map(concepts.map(concept => [concept.source_id, concept]));
  const actionLexicon = buildActionLexicon(concepts);

  const entries = (database?.entries || []).map(entry => {
    const concept = conceptBySourceId.get(entry.id);
    const bucket = routeBucket(entry, concept);
    const classification = classifyEntry(entry, concept, actionLexicon);
    const label = normalize(entry.label);
    const grammarProfileId = classification.gridColumn === 2 ? KNOWN_GRAMMAR_PROFILES.get(label) || "" : "";

    return {
      ...entry,
      fitzgerald_schema_version: FITZGERALD_ROUTING_VERSION,
      fitzgerald_role: ROLE_BY_COLUMN[classification.gridColumn],
      grid_column: classification.gridColumn,
      active_in_state: classification.activeStates,
      always_active: ALWAYS_ACTIVE.has(label),
      route_bucket: bucket,
      semantic_category: concept?.primary_category || "unknown",
      semantic_bucket_paths: concept?.bucket_paths || [bucket],
      on_tap_action: tapAction(entry, classification.gridColumn, label),
      route_next_state: ALWAYS_ACTIVE.has(label) || entry.type !== "word" || classification.gridColumn === 6
        ? 1
        : NEXT_STATE_BY_COLUMN[classification.gridColumn],
      grammar_profile_id: grammarProfileId,
      classification_source: classification.source,
      classification_confidence: classification.confidence
    };
  });

  assignPages(entries);
  const errors = validate(entries);

  const audit = {
    schema_version: FITZGERALD_ROUTING_VERSION,
    generated_at: new Date().toISOString(),
    source_database_version: database?.metadata?.version || "5.27",
    total_entries: entries.length,
    page_size: FITZGERALD_PAGE_SIZE,
    validation: {
      valid: errors.length === 0,
      error_count: errors.length,
      errors: errors.slice(0, 100)
    },
    coverage: {
      entries_with_grid_column: entries.filter(entry => Number.isInteger(entry.grid_column)).length,
      entries_with_active_in_state: entries.filter(entry => Array.isArray(entry.active_in_state) && entry.active_in_state.length > 0).length,
      entries_with_route_bucket: entries.filter(entry => Boolean(entry.route_bucket)).length,
      entries_with_page_and_slot: entries.filter(entry => Number.isInteger(entry.display_page) && Number.isInteger(entry.grid_slot)).length,
      entries_with_tap_action: entries.filter(entry => Boolean(entry.on_tap_action)).length,
      unclassified_entries: errors.length ? entries.filter(entry => !entry.fitzgerald_role).length : 0
    },
    counts_by_column: countBy(entries, "grid_column"),
    counts_by_role: countBy(entries, "fitzgerald_role"),
    counts_by_bucket: countBy(entries, "route_bucket"),
    counts_by_source: countBy(entries, "classification_source"),
    counts_by_confidence: countBy(entries, "classification_confidence"),
    always_active_count: entries.filter(entry => entry.always_active).length,
    multi_state_count: entries.filter(entry => entry.active_in_state.length > 1).length,
    grammar_profile_count: entries.filter(entry => Boolean(entry.grammar_profile_id)).length
  };

  const metadata = {
    ...(database.metadata || {}),
    name: "TalkFreeAAC V8.1 — 10,000 Entry Fitzgerald Routed Language Database",
    version: "8.1.0",
    source_database_name: database?.metadata?.name || "TalkFreeAAC V5.27 language database",
    source_database_version: database?.metadata?.version || "5.27",
    supersedes: "V8.0 Six-Column Grammar State Machine",
    build_type: "full_10000_entry_fitzgerald_routing",
    fitzgerald_routing: {
      schema_version: FITZGERALD_ROUTING_VERSION,
      total_entries_routed: entries.length,
      page_size: FITZGERALD_PAGE_SIZE,
      columns: ROLE_BY_COLUMN,
      validation_passed: errors.length === 0
    }
  };

  const validation = {
    ...(database.validation || {}),
    total_entries: entries.length,
    fitzgerald_routing_version: FITZGERALD_ROUTING_VERSION,
    fitzgerald_entries_routed: entries.length,
    fitzgerald_unclassified_entries: 0,
    fitzgerald_validation_passed: errors.length === 0,
    fitzgerald_counts_by_column: audit.counts_by_column,
    fitzgerald_counts_by_bucket: audit.counts_by_bucket
  };

  return { database: { metadata, validation, entries }, audit };
}

function main() {
  const database = JSON.parse(fs.readFileSync(DATABASE_PATH, "utf8"));
  const semanticGraph = JSON.parse(fs.readFileSync(GRAPH_PATH, "utf8"));
  const result = buildFitzgeraldRoutingV8_1(database, semanticGraph);

  if (!result.audit.validation.valid) {
    throw new Error(`Fitzgerald routing validation failed:\n${result.audit.validation.errors.join("\n")}`);
  }

  fs.writeFileSync(DATABASE_PATH, `${JSON.stringify(result.database, null, 2)}\n`, "utf8");
  fs.writeFileSync(AUDIT_PATH, `${JSON.stringify(result.audit, null, 2)}\n`, "utf8");
  console.log(`Routed ${result.audit.total_entries} entries across six Fitzgerald columns.`);
  console.log(JSON.stringify(result.audit.counts_by_column));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
