# V5.30 Next-Word Assumption + Gating Fix

## Problem fixed

After the V5.28/V5.29 stage-settings patch, the approved layout looked right, but the board did not reliably repopulate after selecting a core word such as `I`.

Root cause:

- `ChildAAC.jsx` was prioritizing topic slices and home fallback.
- When no topic was active, it ignored the sentence-based dynamic branch from `getFullBoard()`.
- Result: tapping `I` updated the sentence, but the visible active board did not switch into the next-word set.

## What changed

### 1. Sentence-based gating restored

The child board now uses this priority order:

1. Active topic routed slice
2. Active topic tree children
3. Sentence-based next-word assumptions
4. Home fallback

This means pressing `I` now exposes the next likely word set instead of leaving the board stuck.

### 2. Added local-first next-word assumption engine

New file:

```text
engine/prediction/nextWordAssumptionEngine.js
```

The engine does not require an external AI service. It uses:

- deterministic phrase routes
- the existing language tree
- lazy database enrichment from the 10,000-entry vocabulary database
- stage filtering
- safety filtering
- capped visible output

### 3. Added `I'm` as an overlay vocabulary route

`I'm` is now available without replacing the 10,000-word JSON file.

The route supports:

```text
I'm → feeling → happy/sad/mad/scared/tired/sick/etc.
```

It also supports the full form:

```text
I → am → feeling → happy/sad/mad/scared/etc.
```

### 4. Kept the database gated

The 10,000-entry database is still hidden. The next-word engine scans/enriches from it only after a sentence context exists and still returns only the stage-capped visible slice.

## No external mini-ChatGPT added

Not needed yet. The correct next move was deterministic local routing, not an API dependency. External AI would add latency, cost, privacy concerns, and failure modes before the base board logic is stable.
