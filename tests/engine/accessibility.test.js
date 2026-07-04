import { attachAccessibilityMetadata } from "../../engine/accessibility/accessibilityMeta.js";
import { nextScanIndex } from "../../engine/accessibility/scanningEngine.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const buttons = attachAccessibilityMetadata(["yes", "no"], { dwellMs: 1000 });
assert(buttons[0].accessibility.dwellMs === 1000, "Dwell time should be preserved.");
assert(nextScanIndex(1, 2) === 0, "Scan index should wrap.");

console.log("accessibility.test.js passed");
