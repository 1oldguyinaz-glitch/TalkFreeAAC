import assert from "node:assert/strict";
import fs from "node:fs";
import {
  getViewportFitLayoutV7_5,
  rowCountV7_5
} from "../engine/display/viewportFit.js";

const cases = [
  { name: "compact phone", width: 320, height: 568, boardWidth: 280 },
  { name: "phone portrait", width: 430, height: 932, boardWidth: 382 },
  { name: "reported compact window", width: 648, height: 600, boardWidth: 580 },
  { name: "tablet portrait", width: 768, height: 1024, boardWidth: 700 },
  { name: "desktop", width: 1440, height: 900, boardWidth: 1360 },
  { name: "short landscape", width: 800, height: 420, boardWidth: 730 }
];

for (const viewport of cases) {
  const layout = getViewportFitLayoutV7_5({
    ...viewport,
    topicCount: 12,
    coreCount: 18,
    activeCount: 24,
    quickCount: 10
  });

  assert.ok(layout.boardColumns >= 5 && layout.boardColumns <= 12, `${viewport.name}: board column range`);
  assert.ok(layout.quickColumns >= 1 && layout.quickColumns <= 10, `${viewport.name}: quick column range`);
  assert.equal(layout.topicRows, rowCountV7_5(12, layout.boardColumns), `${viewport.name}: topic rows`);
  assert.equal(layout.coreRows, rowCountV7_5(18, layout.boardColumns), `${viewport.name}: core rows`);
  assert.equal(layout.activeRows, rowCountV7_5(24, layout.boardColumns), `${viewport.name}: active rows`);
  assert.ok(layout.quickRows <= 2, `${viewport.name}: quick phrases stay within two rows`);
  assert.ok(layout.quickTrack >= 52 && layout.quickTrack <= 124, `${viewport.name}: quick track stays bounded`);
}

const stageFourCompact = getViewportFitLayoutV7_5({
  width: 320,
  height: 568,
  boardWidth: 280,
  topicCount: 12,
  coreCount: 24,
  activeCount: 21,
  quickCount: 10
});
assert.ok(stageFourCompact.totalBoardRows <= 9, "Stage 4 compact board reduces rows to fit");

const childSource = fs.readFileSync(new URL("../web/child/ChildAAC.jsx", import.meta.url), "utf8");
assert.match(childSource, /getViewportFitLayoutV7_5/);
assert.match(childSource, /ResizeObserver/);
assert.match(childSource, /ref=\{boardSectionsRef\}/);
assert.doesNotMatch(childSource, /displaySettings\?\.buttonScale/);
assert.doesNotMatch(childSource, /displaySettings\?\.textScale/);

const personalizationSource = fs.readFileSync(new URL("../web/parent/BoardPersonalizationPanel.jsx", import.meta.url), "utf8");
assert.doesNotMatch(personalizationSource, /Button size/);
assert.doesNotMatch(personalizationSource, /Word size/);
assert.match(personalizationSource, /adjust automatically to the current screen/);

const accessibilitySource = fs.readFileSync(new URL("../web/parent/AccessibilityPanel.jsx", import.meta.url), "utf8");
assert.doesNotMatch(accessibilitySource, /buttonScale/);
assert.doesNotMatch(accessibilitySource, /textScale/);
assert.match(accessibilitySource, /Automatic fit/);

const css = fs.readFileSync(new URL("../web/styles/aac-unified-board.css", import.meta.url), "utf8");
const v75 = css.slice(css.indexOf("V7.5.0 — automatic viewport-fit board"));
assert.match(v75, /repeat\(var\(--aac-board-columns\)/);
assert.match(v75, /repeat\(var\(--aac-quick-columns\)/);
assert.match(v75, /grid-template-rows:\s*var\(--aac-topic-track\)/);
assert.match(v75, /overflow:\s*hidden\s*!important/);
assert.match(v75, /container-type:\s*size/);
assert.doesNotMatch(v75, /overflow-y:\s*auto/);

console.log("V7.5 automatic viewport-fit tests passed.");
