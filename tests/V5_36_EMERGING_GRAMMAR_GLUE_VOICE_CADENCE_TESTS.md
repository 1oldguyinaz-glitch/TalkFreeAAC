# V5.36 Manual Tests — Grammar Glue + Voice Cadence

## Precondition

Apply after the working v5.34.1 repair and v5.35.1 board clarity patch.

## Grammar glue tests

### Stage 1 — I like route

1. Set Communication Stage to Stage 1 / Emerging.
2. Go back to the child board.
3. Tap `I`.
4. Confirm `like` appears in the next-word options.
5. Tap `like`.
6. Confirm the board offers `this`, `that`, `it`, `you`, `my`, or `with`.
7. Tap `this`.
8. Confirm the sentence becomes `I like this`.

### Stage 1 — ownership route

1. Clear the board.
2. Tap `my` if visible from core/home or through prediction.
3. Confirm ownership objects appear, such as `turn`, `toy`, `food`, `drink`, `body`, or `room`.

### Stage 1 — help with route

1. Clear the board.
2. Tap `help`.
3. Confirm `with`, `me`, `this`, and `that` are available.
4. Build `help with this` or `help me`.

## Voice cadence tests

### Settings panel

1. Open Parent Dashboard / Settings.
2. Confirm the `Voice Cadence` panel appears beside or below Board Staging.
3. Change Voice Type to `Little girl`.
4. Tap Preview.
5. Confirm speech plays.
6. Change Voice Type to `Little boy`.
7. Tap Preview.
8. Confirm speech plays with different pitch/cadence.

### Cadence controls

1. Change Cadence to `Slow + clear`.
2. Tap Preview.
3. Confirm speech is slower.
4. Move Rate and Pitch sliders.
5. Tap Preview.
6. Confirm custom tuning applies.
7. Tap Reset tuning.
8. Confirm values return to the selected profile/cadence defaults.

### Board speech

1. Return to the child board.
2. Tap any word.
3. Confirm the selected voice settings are used.
4. Build a sentence and tap Speak.
5. Confirm sentence speech uses the selected voice settings.

## Insights readout

1. Open Teacher / Therapist Insights.
2. Confirm the Summary view displays the current voice setup.

## Expected result

- No crash.
- Stage 1 keeps low density but has essential connector/ownership words.
- Voice settings persist in profile settings.
- Speech remains fully local/offline-device dependent.
