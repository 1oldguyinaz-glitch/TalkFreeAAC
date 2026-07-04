import { getPredictions } from "../../engine/prediction/predictionEngine.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const profile = {
  selectedStage: "Stage 1: Emerging Communicator",
  activeContext: "Core Needs",
  sentence: [],
  wordCounts: {},
  recentWords: [],
  favorites: []
};

const predictions = getPredictions(profile);
assert(Array.isArray(predictions), "Predictions should be an array.");
assert(predictions.length > 0, "Predictions should not be empty.");

console.log("predictionEngine.test.js passed");
