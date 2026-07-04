import { analyzeSentence, classifySentence } from "../../engine/composer/sentenceComposer.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const result = analyzeSentence(["I", "want", "water"]);
assert(result.intent === "request", "I want water should be request intent.");
assert(result.isComplete === true, "Three-word request should be complete.");

const tags = classifySentence("I want apple juice", "Food & Drinks");
assert(tags.includes("Food/Drink"), "Food sentence should be tagged Food/Drink.");

console.log("sentenceComposer.test.js passed");
