import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FITZGERALD_PAGE_SIZE_V8_1,
  FITZGERALD_ROUTING_VERSION_V8_1,
  getFitzgeraldBucketDirectoryV8_1,
  getFitzgeraldColumnSliceV8_1,
  getFitzgeraldRouteV8_1,
  isEntryActiveInGrammarStateV8_1
} from "../engine/language/languageDatabaseRouterV5_27.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const readJson = relative => JSON.parse(fs.readFileSync(path.join(here, "..", relative), "utf8"));
const database = readJson("engine/language/languageDatabaseV5_27_10000.json");
const audit = readJson("engine/language/fitzgeraldRoutingV8_1.audit.json");
const entries = database.entries;

assert.equal(FITZGERALD_ROUTING_VERSION_V8_1, "8.1.0");
assert.equal(FITZGERALD_PAGE_SIZE_V8_1, 10);
assert.equal(entries.length, 10000);
assert.equal(audit.total_entries, 10000);
assert.equal(audit.validation.valid, true);
assert.equal(audit.coverage.unclassified_entries, 0);
assert.equal(audit.coverage.entries_with_grid_column, 10000);
assert.equal(audit.coverage.entries_with_active_in_state, 10000);
assert.equal(audit.coverage.entries_with_route_bucket, 10000);
assert.equal(audit.coverage.entries_with_page_and_slot, 10000);
assert.equal(audit.coverage.entries_with_tap_action, 10000);
assert.equal(Object.values(audit.counts_by_column).reduce((sum, count) => sum + count, 0), 10000);

const roleByColumn = {
  1: "initiator_pronoun_question",
  2: "action_verb",
  3: "modifier_negation_preposition",
  4: "possessive_determiner",
  5: "describer_emotion_adjective",
  6: "target_noun"
};

const occupiedSlots = new Set();
for (const entry of entries) {
  assert.ok(Number.isInteger(entry.grid_column) && entry.grid_column >= 1 && entry.grid_column <= 6, `${entry.id}: invalid grid_column`);
  assert.equal(entry.fitzgerald_schema_version, "8.1.0", `${entry.id}: wrong schema version`);
  assert.equal(entry.fitzgerald_role, roleByColumn[entry.grid_column], `${entry.id}: role mismatch`);
  assert.ok(Array.isArray(entry.active_in_state) && entry.active_in_state.length > 0, `${entry.id}: missing states`);
  assert.ok(entry.active_in_state.every(state => Number.isInteger(state) && state >= 1 && state <= 6), `${entry.id}: invalid state`);
  assert.ok(entry.always_active === true || entry.active_in_state.includes(entry.grid_column), `${entry.id}: route does not include its column`);
  assert.ok(entry.route_bucket, `${entry.id}: missing route bucket`);
  assert.ok(entry.on_tap_action, `${entry.id}: missing tap action`);
  assert.ok(Number.isInteger(entry.display_page) && entry.display_page >= 1, `${entry.id}: invalid display page`);
  assert.ok(Number.isInteger(entry.grid_slot) && entry.grid_slot >= 1 && entry.grid_slot <= 10, `${entry.id}: invalid grid slot`);
  assert.ok(entry.route_path.includes(`state_${entry.grid_column}/`), `${entry.id}: invalid route path`);

  const slotKey = `${entry.grid_column}:${entry.route_bucket}:${entry.display_page}:${entry.grid_slot}`;
  assert.equal(occupiedSlots.has(slotKey), false, `${entry.id}: duplicate motor-plan slot ${slotKey}`);
  occupiedSlots.add(slotKey);
}

function findWord(label) {
  return entries.find(entry => entry.type === "word" && entry.label.toLowerCase() === label.toLowerCase());
}

const expectedRoutes = [
  ["I", 1, "initiator_pronoun_question"],
  ["want", 2, "action_verb"],
  ["not", 3, "modifier_negation_preposition"],
  ["my", 4, "possessive_determiner"],
  ["happy", 5, "describer_emotion_adjective"],
  ["apple", 6, "target_noun"]
];

for (const [label, column, role] of expectedRoutes) {
  const entry = findWord(label);
  assert.ok(entry, `${label} missing from database`);
  assert.equal(entry.grid_column, column, `${label}: wrong column`);
  assert.equal(entry.fitzgerald_role, role, `${label}: wrong role`);
  assert.equal(isEntryActiveInGrammarStateV8_1(entry, column), true, `${label}: inactive in assigned state`);
}

for (const label of ["yes", "no", "help", "stop", "clear"]) {
  const entry = findWord(label);
  assert.ok(entry, `${label} missing`);
  assert.equal(entry.always_active, true, `${label}: must always be active`);
  assert.deepEqual(entry.active_in_state, [1, 2, 3, 4, 5, 6], `${label}: incomplete always-active states`);
}

const want = findWord("want");
assert.equal(want.grammar_profile_id, "grammar_want");
assert.equal(want.on_tap_action, "set_pending_verb_and_open_column_3_grammar");
const apple = findWord("apple");
assert.equal(apple.route_bucket, "food_drink");
assert.equal(apple.on_tap_action, "insert_word_and_reset_to_state_1");

const route = getFitzgeraldRouteV8_1(apple);
assert.equal(route.gridColumn, 6);
assert.equal(route.routeBucket, "food_drink");
assert.equal(route.displayPage, apple.display_page);
assert.equal(route.gridSlot, apple.grid_slot);

const state6Directory = getFitzgeraldBucketDirectoryV8_1(6, database);
const foodDirectory = state6Directory.find(item => item.bucket === "food_drink");
assert.ok(foodDirectory, "State 6 FOOD route missing");
assert.ok(foodDirectory.count > 0);
assert.ok(foodDirectory.totalPages >= 1);

const foodPage = getFitzgeraldColumnSliceV8_1(
  { stage: 5, settings: { parentVocabularyUnlocked: true, sensitiveVocabularyUnlocked: true, schoolMode: true, emergencyMode: true } },
  { state: 6, routeBucket: "food_drink", page: 1, allowStageExpansion: true },
  database
);
assert.equal(foodPage.status, "fitzgerald_route_ready");
assert.equal(foodPage.activeColumn, 6);
assert.ok(foodPage.visible.length > 0 && foodPage.visible.length <= 10);
assert.ok(foodPage.visible.every(entry => entry.grid_column === 6));
assert.ok(foodPage.visible.every(entry => entry.route_bucket === "food_drink"));
assert.deepEqual(foodPage.visible.map(entry => entry.grid_slot), [...foodPage.visible].map(entry => entry.grid_slot).sort((a, b) => a - b));

console.log("V8.1 full 10,000-entry Fitzgerald database routing tests passed.");
