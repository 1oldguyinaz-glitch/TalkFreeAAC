# V5.34.1 Manual Test Plan

## Build test

```bash
cd web
npm run build
```

Expected: build passes.

## Bucket navigation test

1. Open the child AAC board.
2. Tap `I'm`.
3. Tap `feeling`.
4. Confirm semantic buckets display, such as:
   - Emotion
   - Body
   - Temperature
   - Texture / Sensory
   - Pain
5. Tap `Texture / Sensory`.
6. Confirm it does **not** speak/add `Texture / Sensory` to the sentence.
7. Confirm it opens words like:
   - sticky
   - wet
   - dry
   - hard
   - soft
8. Tap `sticky`.
9. Confirm the sentence updates with `sticky`.

## Bucket tile visual test

Expected:

- Bucket tiles are transparent/dashed.
- Bucket tiles show an `open` cue.
- Speakable word tiles remain solid/colored.

## Insights scroll test

1. Open Parent Dashboard / Insights.
2. Go to Teacher / Therapist Insights.
3. Open Summary, IEP, Classroom, and Session tabs.
4. On desktop and mobile/tablet viewport sizes, confirm the insight content scrolls.
5. Return to the main AAC board and confirm the AAC board remains locked/non-scrolling.

## Regression test

- Home button resets bucket/topic state.
- Topic rail still works.
- Core words still speak/add normally.
- Search/keyboard buttons still follow stage settings.
