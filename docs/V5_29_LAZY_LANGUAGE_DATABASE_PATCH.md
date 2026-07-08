# TalkFreeAAC V5.29 — Lazy Language Database Patch

## Purpose

Keep the 10,000-entry language database out of the initial app bundle.

The language tree remains the source vocabulary engine, but it now loads only when the child board needs expanded topic vocabulary.

## What changed

- Removed static import of `languageDatabaseV5_27_10000.json` from `languageDatabaseRouterV5_27.js`.
- Added lazy dynamic import:
  - `loadLanguageDatabaseV5_27()` loads the database on demand.
  - `getBucketedLanguageSliceV5_27Async()` waits for the database before routing expanded words.
- Kept sync functions backward-compatible:
  - Before load, they return an empty/not-loaded slice instead of flooding the board.
- Added browser fetch fallback for future wrappers that choose to place the database in `public/data`.

## Expected behavior

- Initial board loads without the 10,000-entry JSON in the main JS chunk.
- Stage 1 home board remains low-density and does not trigger the database unless expanded vocabulary/topic routing is used.
- Topic selection can lazy-load the database and return capped bucketed results.
- Database remains hidden from the visible board unless routed through the stage-aware slice rules.

## Build check

Run:

```bash
cd web
npm run build
```

Expected result: build passes. The database should appear as a separate lazy-loaded asset/chunk, not inside the initial main app bundle.
