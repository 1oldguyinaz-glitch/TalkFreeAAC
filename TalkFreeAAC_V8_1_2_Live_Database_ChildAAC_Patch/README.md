# TalkFreeAAC V8.1.2 — Live Fitzgerald Database Runtime Patch

Replace this file in the V8.1.1 repository:

- `web/child/ChildAAC.jsx`

The component removes the V8.0 static JSON board imports and consumes:

- `getFitzgeraldColumnSliceV8_1`
- `getFitzgeraldColumnSliceV8_1Async`
- `getFitzgeraldBucketDirectoryV8_1`

Implemented runtime behavior:

1. Lazy-loads the 10,000-entry routed database, then builds Columns 1–5 from live cached slices.
2. Builds Column 6 root folders from the live V8.1 bucket directory.
3. Refreshes only Column 6 local state when a folder or page is opened.
4. Generates the temporary Column 3 verb grammar overlay without static grammar JSON.
5. Commits only the selected verb surface form, preventing `I want wanted`.
6. Restores Column 3 immediately after grammar selection.
7. Slam-shuts final Column 6 targets back to State 1 and restores root folders.
8. Keeps Yes, No, Help, Stop, and Clear active in every state.

Validation performed against `TalkFreeAAC-main-9-V8.1.1-complete.zip`:

- `npm run build` passed.
- `node tests/run_all_tests.js` passed.
- `node tests/V8_0_SIX_COLUMN_GRAMMAR_STATE_MACHINE_TESTS.mjs` passed.
- `node tests/V8_1_FULL_FITZGERALD_DATABASE_ROUTING_TESTS.mjs` passed.

Note: the router's actual async signature is `(profile, options)`, so a FOOD request is made as:

```js
getFitzgeraldColumnSliceV8_1Async(profile, {
  state: 6,
  routeBucket: "food_drink",
  page: 1,
  stage: communicationStage,
  allowStageExpansion: true
});
```
