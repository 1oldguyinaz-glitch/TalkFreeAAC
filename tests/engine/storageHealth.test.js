import { storageHealth } from "../../engine/storage/storageHealth.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const health = storageHealth({
  sentenceHistory: [{ sentence: "I want water" }],
  timeline: [],
  wordCounts: { I: 1, want: 1, water: 1 },
  teamNotes: []
});

assert(health.wordCount === 3, "Word count should equal 3.");
assert(health.sentenceCount === 1, "Sentence count should equal 1.");

console.log("storageHealth.test.js passed");
