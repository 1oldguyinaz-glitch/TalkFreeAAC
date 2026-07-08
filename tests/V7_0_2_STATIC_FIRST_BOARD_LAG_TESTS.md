# V7.0.2 Static-First Board Lag Tests

## Manual checks

1. Open the child AAC board on Stage 1 / Emerging.
2. Tap `I`.
   - Expected: board repopulates immediately.
   - Expected: no word is spoken unless `Speak each word on tap` is enabled.
3. Tap `I'm` then `feeling`.
   - Expected: semantic buckets show immediately.
4. Tap `Texture / Sensory`.
   - Expected: static bucket words show immediately.
   - Expected: no visible pause from the 10k vocabulary database.
5. Tap 20 words quickly.
   - Expected: no progressive slowdown.
6. Press `Speak`.
   - Expected: full sentence speaks once.
7. Refresh the page.
   - Expected: recent sentence/profile state persists after deferred save flush.

## Code checks

- `ChildAAC.jsx` must not call async 10k database enrichment in the active render/tap path.
- `saveProfile(profile, { defer: true })` should be used from `App.jsx`.
- `tapHistory` should be capped at 300.
