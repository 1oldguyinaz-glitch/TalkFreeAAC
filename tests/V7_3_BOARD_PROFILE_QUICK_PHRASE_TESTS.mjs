import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getDefaultQuickPhrases,
  getQuickPhrases,
  normalizeQuickPhrases,
  resetQuickPhrases,
  updateQuickPhrases
} from "../engine/display/quickPhraseSettings.js";
import { migrateProfile } from "../engine/profile/profileMigration.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const childSource = fs.readFileSync(path.join(root, "web/child/ChildAAC.jsx"), "utf8");
const boardCss = fs.readFileSync(path.join(root, "web/styles/aac-unified-board.css"), "utf8");
const parentSource = fs.readFileSync(path.join(root, "web/parent/ParentMenu.jsx"), "utf8");
const personalizationSource = fs.readFileSync(path.join(root, "web/parent/BoardPersonalizationPanel.jsx"), "utf8");

const adult = { settings: { communicationStage: 4, ageBand: "adult" } };
const child = { settings: { communicationStage: 1, ageBand: "child" } };

assert.equal(getDefaultQuickPhrases(adult).includes("Please"), true, "Adult defaults must include Please.");
assert.equal(getDefaultQuickPhrases(child).includes("Please"), true, "Child defaults must include Please.");
assert.equal(getQuickPhrases(adult).length, 10, "Adult quick phrase bar should expose ten defaults.");

const custom = updateQuickPhrases(adult, ["Please", "Call Mom", "  Thank   you  "]);
assert.deepEqual(getQuickPhrases(custom), ["Please", "Call Mom", "Thank you"], "Custom phrases should be cleaned and preserved.");
assert.equal(normalizeQuickPhrases(Array(20).fill("word")).length, 10, "Quick phrase storage must cap at ten.");
assert.equal(getQuickPhrases(resetQuickPhrases(custom)).includes("I need help"), true, "Reset should restore adult defaults.");

const migrated = migrateProfile({
  name: "Jordan",
  avatarUrl: "data:image/jpeg;base64,test",
  settings: { communicationStage: 4, ageBand: "adult" }
});
assert.equal(migrated.userProfile.name, "Jordan", "Migration should retain communicator name.");
assert.equal(migrated.userProfile.photoUrl, "data:image/jpeg;base64,test", "Migration should normalize the profile photo.");

assert.match(childSource, /boardState\.mode !== "home"/, "Home-only board state banner must be omitted.");
assert.match(childSource, /homeBoardState/, "Home board must receive the compact no-banner layout class.");
assert.match(childSource, /getQuickPhrases\(profile/, "Board must read profile-configured quick phrases.");
assert.match(childSource, /userProfile\?\.photoUrl/, "Board header must read the communicator photo.");
assert.match(parentSource, /BoardPersonalizationPanel/, "Settings must expose board personalization.");
assert.match(personalizationSource, /Edit quick phrase bar/, "Settings must provide the requested quick phrase editor button.");
assert.match(personalizationSource, /Choose photo/, "Settings must allow a communicator photo to be selected.");

assert.match(boardCss, /--aac-uniform-tile-height/, "Uniform tile sizing variable must exist.");
assert.match(boardCss, /\.sketchTopicGrid,[\s\S]*\.sketchCoreGrid,[\s\S]*\.sketchActiveGrid[\s\S]*grid-auto-rows: var\(--aac-uniform-tile-height\)/, "Topics, core, and active grids must share one height system.");
assert.match(boardCss, /\.sketchQuickPhrases[\s\S]*grid-template-rows: var\(--aac-uniform-tile-height\)/, "Quick phrases must share the active-word height system.");
assert.match(boardCss, /\.sketchBandLabel[\s\S]*justify-self: start !important/, "Section labels must align left.");
assert.match(boardCss, /\.approvedSentenceButton\.sketchSentence span[\s\S]*line-height: 1\.16/, "Talk-bar text must have unclipped line height.");

console.log("V7.3 board profile and quick phrase tests passed.");
