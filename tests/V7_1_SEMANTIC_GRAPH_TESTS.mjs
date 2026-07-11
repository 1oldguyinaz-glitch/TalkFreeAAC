import assert from "node:assert/strict";
import fs from "node:fs";
import { performance } from "node:perf_hooks";

import {
  SEMANTIC_AGE_BANDS,
  SEMANTIC_BUCKETS_V7_1,
  SEMANTIC_TOP_LEVEL_CATEGORIES,
  normalizeSemanticText,
  validateSemanticConceptNodeV7_1
} from "../engine/language/semanticGraphSchemaV7_1.js";
import {
  STATIC_SEMANTIC_CONCEPTS_V7_1,
  getConceptsForBucketV7_1Async,
  getSemanticConceptV7_1Async,
  getStaticRelatedConceptLabelsV7_1,
  getStaticSemanticConceptV7_1,
  getStaticWordsForBucketV7_1,
  getSemanticGraphRuntimeSummaryV7_1,
  loadFullSemanticGraphV7_1,
  searchSemanticConceptGraphV7_1Async
} from "../engine/language/semanticConceptGraphV7_1.js";
import {
  SEMANTIC_CONTEXT_ROUTES_V7_1,
  getSemanticGraphPredictionV7_1
} from "../engine/prediction/semanticGraphPredictionEngineV7_1.js";
import {
  getSemanticBucketsForPhraseV5_32,
  getStaticSemanticBucketWordsV5_32
} from "../engine/prediction/semanticBucketRouter.js";
import {
  getStaticLanguageGraphCandidatesV5_31
} from "../engine/prediction/languageGraphPredictionEngine.js";

const source = JSON.parse(fs.readFileSync(new URL("../engine/language/languageDatabaseV5_27_10000.json", import.meta.url), "utf8"));
const graph = JSON.parse(fs.readFileSync(new URL("../engine/language/semanticConceptGraphV7_1_10000.json", import.meta.url), "utf8"));
const childSource = fs.readFileSync(new URL("../web/child/ChildAAC.jsx", import.meta.url), "utf8");

const childStage1 = { settings: { communicationStage: 1, ageBand: "young_child" } };
const adultStage4 = { settings: { communicationStage: 4, ageBand: "adult" } };
const recoveryStage5 = { settings: { communicationStage: 5, ageBand: "aphasia_recovery" } };

function includesAll(values, expected, message) {
  const normalizedValues = new Set(values.map(normalizeSemanticText));
  for (const value of expected) assert(normalizedValues.has(normalizeSemanticText(value)), `${message}: missing ${value}`);
}

function concept(label) {
  const found = getStaticSemanticConceptV7_1(label);
  assert(found, `Missing static semantic concept: ${label}`);
  return found;
}

function fullConcept(label) {
  const normalized = normalizeSemanticText(label);
  const found = graph.concepts.find(node => node.normalized_label === normalized);
  assert(found, `Missing full semantic concept: ${label}`);
  return found;
}

console.log("V7.1 semantic graph validation starting...");

// Layer 1: source and generated graph integrity.
assert.equal(source.entries.length, 10000, "Source database must remain 10,000 entries.");
assert.equal(graph.concepts.length, 10000, "Generated semantic graph must cover every source entry.");
assert.equal(graph.metadata.source_entry_count, 10000);
assert.equal(graph.metadata.concept_count, 10000);
assert.equal(graph.metadata.local_first, true);
assert.equal(graph.metadata.external_ai_required, false);
assert(STATIC_SEMANTIC_CONCEPTS_V7_1.length >= 300, "Static board graph should cover at least 300 high-value concepts.");

const validCategories = new Set(Object.keys(SEMANTIC_TOP_LEVEL_CATEGORIES));
const validBuckets = new Set(Object.keys(SEMANTIC_BUCKETS_V7_1));
const validAges = new Set(SEMANTIC_AGE_BANDS);
const conceptIds = new Set();
const normalizedLabelCounts = new Map();

for (const node of graph.concepts) {
  const result = validateSemanticConceptNodeV7_1(node);
  assert(result.valid, `${node.label}: ${result.errors.join(", ")}`);
  assert(validCategories.has(node.primary_category), `${node.label}: unknown primary category`);
  assert(node.bucket_paths.length > 0, `${node.label}: no semantic paths`);
  for (const bucketId of node.bucket_paths) assert(validBuckets.has(bucketId), `${node.label}: invalid bucket ${bucketId}`);
  for (const stage of node.stage_access) assert([1, 2, 3, 4, 5].includes(stage), `${node.label}: invalid stage ${stage}`);
  for (const age of node.age_bands) assert(validAges.has(age), `${node.label}: invalid age band ${age}`);
  assert(!conceptIds.has(node.id), `Duplicate semantic concept ID: ${node.id}`);
  conceptIds.add(node.id);
  normalizedLabelCounts.set(node.normalized_label, (normalizedLabelCounts.get(node.normalized_label) || 0) + 1);
}

// Layer 2: critical metadata corrections and stage dignity.
const apple = concept("apple");
assert.equal(apple.primary_category, "food_drink");
includesAll(apple.bucket_paths, ["food_drink", "object", "color_size"], "Apple multi-path graph");
assert.deepEqual(apple.stage_access, [1, 2, 3, 4, 5]);
assert(!apple.secondary_categories.includes("device"), "Apple must not retain the old technology classification.");
includesAll(apple.relations.actions, ["eat", "want", "like"], "Apple action edges");
includesAll(apple.relations.descriptors, ["red", "green"], "Apple descriptor edges");
includesAll(apple.relations.places, ["kitchen", "school", "store"], "Apple place edges");

const banana = concept("banana");
assert.equal(banana.primary_category, "food_drink");
assert(banana.stage_access.includes(1), "Banana must be available to Stage 1.");
assert(concept("red").stage_access.includes(1), "Basic colors must be available to Stage 1.");
assert(concept("green").stage_access.includes(1), "Basic colors must be available to Stage 1.");
assert(concept("privacy").age_bands.includes("adult"), "Privacy must remain adult/teen appropriate.");
assert(!concept("privacy").age_bands.includes("child"), "Privacy must not be forced into a young-child route.");
assert(concept("home").age_bands.includes("child"), "Recovery relevance must not hide home from children.");
assert(concept("doctor").age_bands.includes("child"), "Doctor must remain available across age bands.");
const bathroom = concept("bathroom");
includesAll(bathroom.bucket_paths, ["bathroom_care", "help_support", "place"], "Bathroom multi-path graph");
const breakConcept = concept("break");
includesAll(breakConcept.bucket_paths, ["break_regulation", "help_support", "time_routine"], "Break regulation graph");
const privacy = concept("privacy");
includesAll(privacy.bucket_paths, ["bathroom_care", "refusal_advocacy", "safety"], "Privacy dignity graph");
assert.deepEqual(concept("help").gating, { parent: false, sensitive: false, school: false, emergency: false }, "Help must never be gated.");
includesAll(concept("doctor").bucket_paths, ["person", "sick_health", "place"], "Doctor multi-path graph");
includesAll(concept("medicine").bucket_paths, ["sick_health", "object", "time_routine", "safety"], "Medicine multi-path graph");
includesAll(concept("orange").bucket_paths, ["food_drink", "object", "color_size"], "Orange ambiguity graph");
includesAll(concept("drink").bucket_paths, ["food_drink", "activity", "body_state"], "Drink noun/action ambiguity graph");
assert.equal(concept("dog").primary_category, "objects", "Dog must not inherit a noisy question branch.");
assert.equal(concept("swing").primary_category, "play_leisure", "Swing must remain play language.");
assert.equal(concept("show").primary_category, "actions", "Show must remain an action, not entertainment media.");
assert.equal(concept("crayon").primary_category, "objects", "Crayon must remain an art object.");
assert.equal(concept("marker").primary_category, "objects", "Marker must remain an art object.");
includesAll(concept("wheelchair").bucket_paths, ["device_media", "object", "place"], "Wheelchair accessibility multi-path graph");
includesAll(concept("address").bucket_paths, ["core_words", "recovery_support", "safety"], "Address personal-information graph");
includesAll(concept("phone number").bucket_paths, ["core_words", "recovery_support", "device_media"], "Phone number personal-information graph");
for (const node of STATIC_SEMANTIC_CONCEPTS_V7_1.filter(item => item.priority === "core")) {
  assert.deepEqual(node.gating, { parent: false, sensitive: false, school: false, emergency: false }, `${node.label}: core communication must not be gated.`);
}

// High-risk source corruption corrections. These examples intentionally span
// foods, actions, grammar, people, sensory words, school tools, phrases, and
// ambiguous adult/recovery vocabulary.
assert.equal(fullConcept("pineapple").primary_category, "food_drink");
assert(!fullConcept("pineapple").bucket_paths.includes("device_media"), "Pineapple must not retain technology routing.");
assert.equal(fullConcept("catch").primary_category, "actions");
assert.equal(fullConcept("his").primary_category, "core");
assert.equal(fullConcept("caregiver").primary_category, "people");
assert.equal(fullConcept("noisy").primary_category, "descriptors");
includesAll(fullConcept("noisy").bucket_paths, ["texture_sensory", "color_size"], "Noisy sensory graph");
assert.equal(fullConcept("scissors").primary_category, "objects");
includesAll(fullConcept("scissors").bucket_paths, ["object", "school_work"], "Scissors multi-path graph");
assert.equal(fullConcept("whiteboard").primary_category, "school_work");
includesAll(fullConcept("whiteboard").bucket_paths, ["school_work", "object"], "Whiteboard multi-path graph");
assert.equal(fullConcept("I want quesadilla please").primary_category, "food_drink");
assert.deepEqual(fullConcept("I want quesadilla please").bucket_paths, ["food_drink"]);
assert.equal(fullConcept("The answer is ___ because ___").primary_category, "school_work");
includesAll(fullConcept("The answer is ___ because ___").bucket_paths, ["school_work", "story_comment"], "Academic narrative graph");
assert.equal(fullConcept("It is too fast").primary_category, "descriptors");
includesAll(fullConcept("It is too fast").bucket_paths, ["texture_sensory", "break_regulation", "color_size"], "Sensory speed graph");
assert.equal(fullConcept("I heard ___").primary_category, "actions");
assert.equal(fullConcept("I am not comfortable with hugging.").primary_category, "safety_emergency");
includesAll(fullConcept("I am not comfortable with hugging.").bucket_paths, ["refusal_advocacy", "safety"], "Boundary phrase graph");
assert.equal(fullConcept("I need support for say again.").primary_category, "communication_repair");
assert.equal(fullConcept("spelling word family").primary_category, "school_work");
assert(!fullConcept("spelling word family").bucket_paths.includes("person"), "Academic word family must not route to people.");
assert.equal(fullConcept("dry turkey").primary_category, "food_drink", "Descriptor + food compounds must retain the food target.");
assert.equal(fullConcept("orange Legos").primary_category, "objects", "Descriptor + toy compounds must retain the object target.");
assert.equal(fullConcept("white car toy").primary_category, "objects", "Descriptor + vehicle-toy compounds must retain the object target.");
assert.equal(fullConcept("green water table").primary_category, "objects", "Descriptor + play-object compounds must retain the object target.");
assert.equal(fullConcept("tissue").primary_category, "objects");
assert.equal(fullConcept("hurt feelings").primary_category, "feelings_states");
assert.equal(fullConcept("hula hoop").primary_category, "play_leisure");
assert.equal(fullConcept("receipt").primary_category, "school_work");
assert.equal(fullConcept("daily school counselor").primary_category, "people");
assert.equal(fullConcept("My device needs a new page.").primary_category, "technology_media");
assert.equal(fullConcept("My goal is repairing my message.").primary_category, "communication_repair");
assert.equal(fullConcept("Do not share my picture.").primary_category, "safety_emergency");
const period = fullConcept("period");
assert.equal(period.primary_category, "time_routines");
includesAll(period.bucket_paths, ["time_routine", "school_work", "body_state", "sick_health"], "Period ambiguity graph");
assert.deepEqual(period.gating, { parent: false, sensitive: false, school: false, emergency: false });
const stage1Foundation = [
  "I", "you", "me", "my", "want", "need", "help", "stop", "yes", "no", "more",
  "food", "drink", "water", "apple", "banana", "snack", "bathroom", "break",
  "mom", "dad", "teacher", "friend", "home", "school", "outside", "store",
  "happy", "sad", "mad", "scared", "tired", "sick", "hurt", "hot", "cold",
  "red", "blue", "green", "yellow", "big", "small", "soft", "hard", "sticky",
  "go", "play", "eat", "drink", "read", "watch", "open", "close",
  "what", "where", "who", "when", "why", "how"
];
for (const label of stage1Foundation) {
  const node = concept(label);
  assert(node.stage_access.includes(1), `Stage 1 foundational concept is hidden: ${label}`);
  assert(node.age_bands.includes("child"), `Child foundational concept is hidden: ${label}`);
  assert.deepEqual(node.gating, { parent: false, sensitive: false, school: false, emergency: false }, `Foundational concept is incorrectly gated: ${label}`);
}

const simpleStage1Frames = ["I like that", "I don't like that", "I want paint", "I want slide", "I don't like slide", "I want to play Legos"];
for (const label of simpleStage1Frames) {
  const node = fullConcept(label);
  assert(node.stage_access.includes(1), `${label}: simple functional frame must be available at Stage 1.`);
  assert(node.stage_access.includes(5), `${label}: simple functional frame must remain available for recovery.`);
  assert.deepEqual(node.gating, { parent: false, sensitive: false, school: false, emergency: false }, `${label}: simple communication must not be gated.`);
}
assert(fullConcept("I heard ___").stage_access.includes(5), "Simple narrative/recovery frame must remain available at Stage 5.");
assert(fullConcept("I found ___").stage_access.includes(5), "Simple narrative/recovery frame must remain available at Stage 5.");

// Layer 3: meaning-first direct prediction and bucket routing.
const want1 = getSemanticGraphPredictionV7_1(childStage1, { phrase: "I want", limit: 16, bucketLimit: 6 });
includesAll(want1.directWords, ["this", "that", "it", "water", "food", "outside", "break", "bathroom", "different"], "Stage 1 I want route");
includesAll(want1.bucketIds, ["food_drink", "activity", "place", "person"], "Stage 1 I want buckets");
assert(want1.directWords.length <= 16);

const feel1 = getSemanticGraphPredictionV7_1(childStage1, { phrase: "I feel", limit: 16, bucketLimit: 8 });
includesAll(feel1.directWords, ["happy", "sad", "mad", "scared", "sick", "tired", "hurt", "overwhelmed", "confused", "calm"], "Stage 1 I feel route");
includesAll(feel1.bucketIds, ["emotion", "body_state", "temperature", "texture_sensory", "pain", "sick_health"], "I feel meaning buckets");

const help1 = getSemanticGraphPredictionV7_1(childStage1, { phrase: "help", limit: 18 });
includesAll(help1.directWords, ["me", "please", "with", "this", "open", "find", "fix", "bathroom", "stuck", "stop"], "Help route");

const go1 = getSemanticGraphPredictionV7_1(childStage1, { phrase: "go", limit: 18 });
includesAll(go1.directWords, ["home", "school", "bathroom", "outside", "car", "store", "doctor", "playground", "therapy", "room", "away", "back"], "Go destination route");

// Layer 4: multi-path graph behavior.
includesAll(getStaticRelatedConceptLabelsV7_1("red", { limit: 20 }), ["apple", "ball", "shirt", "car"], "Red descriptor multi-path");
includesAll(getStaticRelatedConceptLabelsV7_1("kitchen", { limit: 20 }), ["food", "water", "apple", "snack", "eat", "cup", "plate"], "Kitchen place multi-path");
includesAll(getStaticRelatedConceptLabelsV7_1("snack", { limit: 20 }), ["apple", "banana", "crackers", "chips", "cookie"], "Snack multi-path");
includesAll(getStaticRelatedConceptLabelsV7_1("eat", { limit: 20 }), ["food", "snack", "apple", "banana", "breakfast", "lunch", "dinner"], "Eat action multi-path");

const redRoute = getSemanticGraphPredictionV7_1(childStage1, { phrase: "red", limit: 12 });
includesAll(redRoute.directWords, ["apple", "ball", "shirt", "car"], "Red prediction route");
const appleRoute = getSemanticGraphPredictionV7_1(childStage1, { phrase: "I want apple", limit: 24 });
includesAll(appleRoute.directWords, ["eat", "snack", "like", "red", "green", "kitchen", "school", "store"], "Apple relation route");
assert(!appleRoute.directWords.includes("want"), "Prediction must not repeat a word already present in the sentence.");

// Layer 5: functional communication beyond requesting.
const noRoute = getSemanticGraphPredictionV7_1(childStage1, { phrase: "no", limit: 12 });
includesAll(noRoute.directWords, ["stop", "not that", "I don't want", "different", "go away"], "Refusal/self-advocacy route");
includesAll(noRoute.bucketIds, ["refusal_advocacy", "safety", "communication_repair"], "Refusal buckets");

const whyRoute = getSemanticGraphPredictionV7_1(adultStage4, { phrase: "why", limit: 14 });
includesAll(whyRoute.directWords, ["because", "I feel", "I need", "I want"], "Question route");
assert(whyRoute.bucketIds.includes("story_comment"), "Questions should support explanation and narrative.");

const firstRoute = getSemanticGraphPredictionV7_1(adultStage4, { phrase: "first", limit: 14 });
includesAll(firstRoute.directWords, ["then", "go", "do", "eat", "play", "work"], "Narrative sequencing route");
assert(firstRoute.bucketIds.includes("story_comment"), "Narrative bucket should be available.");

const opinionRoute = getSemanticGraphPredictionV7_1(adultStage4, { phrase: "I think", limit: 20, bucketLimit: 8 });
includesAll(opinionRoute.directWords, ["this", "that", "because", "good", "bad", "right", "wrong", "I agree", "I disagree"], "Opinion route");
includesAll(opinionRoute.bucketIds, ["story_comment", "social_connection", "question", "refusal_advocacy"], "Opinion buckets");

const agreementRoute = getSemanticGraphPredictionV7_1(adultStage4, { phrase: "I disagree", limit: 18, bucketLimit: 8 });
includesAll(agreementRoute.directWords, ["with you", "with that", "because", "no", "different", "my choice", "I think"], "Disagreement and self-advocacy route");

const socialQuestionRoute = getSemanticGraphPredictionV7_1({ settings: { communicationStage: 2, ageBand: "child" } }, { phrase: "do you", limit: 18, bucketLimit: 8 });
includesAll(socialQuestionRoute.directWords, ["want", "like", "know", "need", "feel", "remember", "understand", "help"], "Social question route");

const painRoute = getSemanticGraphPredictionV7_1(childStage1, { phrase: "it hurts", limit: 18, bucketLimit: 8 });
includesAll(painRoute.directWords, ["here", "there", "a little", "a lot", "now", "help", "doctor", "medicine"], "Pain communication route");
includesAll(painRoute.bucketIds, ["pain", "body_state", "sick_health", "help_support", "safety"], "Pain support buckets");

// Layer 6: teen/adult and recovery behavior.
const adultWant = getSemanticGraphPredictionV7_1(adultStage4, { phrase: "I want", limit: 24 });
includesAll(adultWant.directWords, ["privacy", "work", "schedule", "phone", "money", "relationship", "my choice", "I need space"], "Adult dignity additions");

const recoveryRepair = getSemanticGraphPredictionV7_1(recoveryStage5, { phrase: "wrong word", limit: 20, bucketLimit: 8 });
includesAll(recoveryRepair.directWords, ["try again", "not that", "give me time", "show me", "say it another way", "please wait"], "Stage 5 repair route");
assert(recoveryRepair.bucketIds.includes("recovery_support"), "Stage 5 must expose recovery support.");

const recoveryTime = getSemanticGraphPredictionV7_1(recoveryStage5, { phrase: "give me time", limit: 20 });
includesAll(recoveryTime.directWords, ["I know", "I remember", "show me", "write it", "yes", "no", "maybe"], "Stage 5 phrase rebuilding");

const recoveryNarrative = getSemanticGraphPredictionV7_1(recoveryStage5, { phrase: "I heard", limit: 24, bucketLimit: 8 });
includesAll(recoveryNarrative.directWords, ["this", "that", "music", "noise", "at school", "at home", "today", "yesterday", "because", "then"], "Stage 5 narrative rebuilding");
includesAll(recoveryNarrative.bucketIds, ["story_comment", "person", "place", "time_routine"], "Stage 5 narrative buckets");

// Layer 7: bucket leaf quality.
const foodWords = getStaticSemanticBucketWordsV5_32("food_drink", childStage1, { limit: 20 });
includesAll(foodWords, ["food", "drink", "water", "snack", "juice", "milk", "apple", "banana"], "Food bucket");
const textureWords = getStaticSemanticBucketWordsV5_32("texture_sensory", childStage1, { limit: 20 });
includesAll(textureWords, ["sticky", "wet", "dry", "hard", "soft", "scratchy", "loud", "bright", "quiet"], "Texture bucket");
const repairWords = getStaticWordsForBucketV7_1("communication_repair", recoveryStage5, { limit: 24 });
includesAll(repairWords, ["wrong word", "try again", "give me time", "show me", "say it another way", "I know but can't say it"], "Recovery repair bucket");

const wantBuckets = getSemanticBucketsForPhraseV5_32(childStage1, { phrase: "I want", bucketLimit: 4 });
assert.deepEqual(wantBuckets.map(bucket => bucket.label), ["Food / Drink", "Activity", "Place", "Person"]);

// Layer 8: compatibility and board integration.
const legacyCandidates = getStaticLanguageGraphCandidatesV5_31(childStage1, { phrase: "I want", limit: 12 });
includesAll(legacyCandidates, ["this", "that", "it", "water", "food", "outside", "break", "bathroom"], "V5.31 compatibility wrapper");
assert(childSource.includes('activeBranchMode = "semanticMixed"'), "Child board must mix direct words with bucket choices.");
assert(childSource.includes('["semanticBucketChoices", "semanticMixed"]'), "Mixed bucket tiles must remain navigable.");
assert(!childSource.includes("semanticConceptGraphV7_1_10000.json"), "Child board must not eagerly import the full graph.");

// Layer 9: route/bucket matrix across all five communication stages.
const matrixProfiles = [
  childStage1,
  { settings: { communicationStage: 2, ageBand: "child" } },
  { settings: { communicationStage: 3, ageBand: "child" } },
  adultStage4,
  recoveryStage5
];
let matrixCallCount = 0;
for (const matrixProfile of matrixProfiles) {
  for (const routePhrase of Object.keys(SEMANTIC_CONTEXT_ROUTES_V7_1)) {
    const routeResult = getSemanticGraphPredictionV7_1(matrixProfile, { phrase: routePhrase, limit: 40, bucketLimit: 12 });
    assert.equal(new Set(routeResult.directWords.map(normalizeSemanticText)).size, routeResult.directWords.length, `Duplicate route words: ${routePhrase}`);
    for (const bucketId of routeResult.bucketIds) assert(validBuckets.has(bucketId), `Unknown route bucket: ${bucketId}`);
    matrixCallCount += 1;
  }
  for (const bucketId of validBuckets) {
    const words = getStaticSemanticBucketWordsV5_32(bucketId, matrixProfile, { limit: 40 });
    assert(words.length > 0, `Dead semantic bucket for Stage ${matrixProfile.settings.communicationStage}: ${bucketId}`);
    assert.equal(new Set(words.map(normalizeSemanticText)).size, words.length, `Duplicate bucket words: ${bucketId}`);
    assert(words.length <= 40, `Bucket limit exceeded: ${bucketId}`);
    matrixCallCount += 1;
  }
}
const stage1AdultOnlyTerms = new Set(["privacy", "rent", "paycheck", "dating", "coworker", "supervisor", "insurance", "password"]);
for (const routePhrase of Object.keys(SEMANTIC_CONTEXT_ROUTES_V7_1)) {
  const routeResult = getSemanticGraphPredictionV7_1(childStage1, { phrase: routePhrase, limit: 40, bucketLimit: 12 });
  for (const word of routeResult.directWords) {
    assert(!stage1AdultOnlyTerms.has(normalizeSemanticText(word)), `Stage 1 adult-language leak: ${routePhrase} -> ${word}`);
  }
}

// Layer 10: static route performance. This protects the V7.0.2 no-lag rule.
const start = performance.now();
for (let index = 0; index < 2000; index += 1) {
  getSemanticGraphPredictionV7_1(childStage1, { phrase: index % 2 ? "I want" : "I feel", limit: 16, bucketLimit: 8 });
  getStaticLanguageGraphCandidatesV5_31(childStage1, { phrase: index % 2 ? "go" : "help", limit: 16 });
}
const elapsed = performance.now() - start;
assert(elapsed < 5000, `Static semantic routing regression: ${elapsed.toFixed(1)}ms for 4,000 calls.`);

const duplicateNormalizedLabelCount = [...normalizedLabelCounts.values()].filter(count => count > 1).length;
assert(duplicateNormalizedLabelCount < 250, `Unexpectedly high normalized-label duplication: ${duplicateNormalizedLabelCount}`);

const summary = getSemanticGraphRuntimeSummaryV7_1(childStage1);
assert.equal(summary.fullGraphLoaded, false, "Static tests must not load the 10k graph.");
assert.equal(summary.localFirst, true);
assert.equal(summary.externalAiRequired, false);

// Layer 11: lazy full-graph loading and deep retrieval. This runs only after
// static-board performance assertions so it cannot hide an eager-load regression.
const fullGraph = await loadFullSemanticGraphV7_1();
assert.equal(fullGraph.concepts.length, 10000, "Lazy graph must expose all 10,000 concepts.");
const microscope = await getSemanticConceptV7_1Async("microscope");
assert(microscope, "Deep graph lookup must find non-static vocabulary.");
assert.equal(microscope.primary_category, "school_work");
const microSearch = await searchSemanticConceptGraphV7_1Async("micro", adultStage4, { limit: 12 });
assert(microSearch.some(item => normalizeSemanticText(item.label) === "microscope"), "Deep semantic search must find microscope.");
const schoolConcepts = await getConceptsForBucketV7_1Async("school_work", adultStage4, { limit: 40 });
assert(schoolConcepts.length > 0, "Deep school/work bucket must return concepts.");
assert.equal(getSemanticGraphRuntimeSummaryV7_1(childStage1).fullGraphLoaded, true, "Full graph should report loaded after explicit deep access.");

console.log(JSON.stringify({
  status: "PASS",
  sourceEntries: source.entries.length,
  graphConcepts: graph.concepts.length,
  staticConcepts: STATIC_SEMANTIC_CONCEPTS_V7_1.length,
  categories: validCategories.size,
  buckets: validBuckets.size,
  duplicateNormalizedLabels: duplicateNormalizedLabelCount,
  routeBucketMatrixCalls: matrixCallCount,
  staticRoutingCalls: 4000,
  staticRoutingMilliseconds: Number(elapsed.toFixed(2)),
  lazyFullGraphConcepts: fullGraph.concepts.length,
  deepSchoolBucketSample: schoolConcepts.length
}, null, 2));
