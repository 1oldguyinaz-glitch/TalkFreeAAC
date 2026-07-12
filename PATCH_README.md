# TalkFreeAAC V8.1 GitHub Patch

## Base required

Apply this patch over the repository after the V8.0 six-column grammar-state-machine patch.

Base used for validation: `TalkFreeAAC-main(8).zip` with V8.0 applied.

## Apply

Copy the contents of this ZIP into the root of the TalkFreeAAC repository and allow matching files to be replaced.

Do not place the outer patch folder inside the repository. The first copied folders should be `engine`, `tests`, `docs`, and `web`.

## What this patch completes

- Classifies all 10,000 entries in `engine/language/languageDatabaseV5_27_10000.json`.
- Assigns every entry to one or more valid Fitzgerald states.
- Assigns every entry to a grammatical column.
- Assigns every entry to a semantic route bucket.
- Assigns deterministic 10-item page and slot coordinates.
- Assigns state-transition tap behavior.
- Preserves all existing stage, age, safety, privacy, and parent-gating metadata.
- Keeps the database hidden, lazy loaded, and bucket gated.
- Adds runtime APIs for state/column/bucket retrieval.
- Adds a reproducible classification builder and audit report.

## Coverage

- Total entries: 10,000
- Routed entries: 10,000
- Unclassified entries: 0
- Invalid routes: 0
- Duplicate `(column, bucket, page, slot)` coordinates: 0

### Column totals

- Column 1 — Initiators / Pronouns / Questions: 2,934
- Column 2 — Actions / Verbs: 648
- Column 3 — Modifiers / Negations / Prepositions: 543
- Column 4 — Possessives / Determiners: 265
- Column 5 — Describers / Emotions / Adjectives: 1,034
- Column 6 — Targets / Nouns: 4,576

## Important files

- `engine/language/languageDatabaseV5_27_10000.json`
- `engine/language/buildFitzgeraldRoutingV8_1.mjs`
- `engine/language/fitzgeraldRoutingV8_1.audit.json`
- `engine/language/languageDatabaseRouterV5_27.js`
- `tests/V8_1_FULL_FITZGERALD_DATABASE_ROUTING_TESTS.mjs`

## Validation completed

- Original 10,000 IDs and labels preserved
- Original stage and safety gates preserved
- Existing TalkFreeAAC tests passed
- V8.0 state-machine tests passed
- V8.1 full-database routing tests passed
- Vite production build passed

## Rebuild the routing data

From the repository root:

```bash
node engine/language/buildFitzgeraldRoutingV8_1.mjs
```
