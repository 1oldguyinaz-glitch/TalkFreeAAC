import assert from "node:assert/strict";
import fs from "node:fs";
import { getSymbolDisplayMode } from "../engine/display/displaySettings.js";
import { getSemanticGraphPredictionV7_1 } from "../engine/prediction/semanticGraphPredictionEngineV7_1.js";

assert.equal(getSymbolDisplayMode({ settings: { ageBand: "child" } }), "classic");
assert.equal(getSymbolDisplayMode({ settings: { ageBand: "adult" } }), "age_respectful");
assert.equal(getSymbolDisplayMode({ displaySettings: { symbolMode: "sign_language" } }), "sign_language");

const wantToHave = getSemanticGraphPredictionV7_1({ settings: { communicationStage: 4, ageBand: "adult" } }, { phrase: "I want to have", limit: 20 });
assert.equal(wantToHave.routeKey, "i want to have");
assert.ok(wantToHave.directWords.includes("this"));
assert.ok(wantToHave.bucketIds.includes("object"));
assert.ok(wantToHave.bucketIds.includes("activity"));

const have = getSemanticGraphPredictionV7_1({ settings: { communicationStage: 4, ageBand: "adult" } }, { phrase: "I have", limit: 20 });
assert.equal(have.routeKey, "i have");
assert.ok(have.directWords.includes("a question"));
assert.ok(have.bucketIds.includes("place"));

const childSource = fs.readFileSync(new URL("../web/child/ChildAAC.jsx", import.meta.url), "utf8");
assert.match(childSource, /"me", "to", "my"/);
assert.match(childSource, /profile=\{profile\}/);

const css = fs.readFileSync(new URL("../web/styles/aac-unified-board.css", import.meta.url), "utf8");
assert.match(css, /width:\s*100%\s*!important/);
assert.match(css, /repeat\(\s*auto-fit/);
assert.match(css, /overflow-y:\s*auto\s*!important/);

console.log("V7.4 universal responsive board tests passed.");
