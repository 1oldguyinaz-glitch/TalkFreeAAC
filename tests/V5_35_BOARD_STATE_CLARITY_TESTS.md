# V5.35 Board State Clarity Tests

## 1. Home state

Expected:

- breadcrumb shows `Home`
- helper says `Say something.`
- board remains locked, not scrollable

## 2. Prediction state

Steps:

```text
Tap: I'm
```

Expected:

- breadcrumb includes `Home › I'm`
- helper says `Choose the next word.` or equivalent next-action language
- next-word options populate

## 3. Semantic bucket choice state

Steps:

```text
Tap: I'm
Tap: feeling
```

Expected:

- board shows meaning buckets
- bucket tiles are transparent/dashed
- tapping a bucket does not add/say the bucket label

## 4. Semantic bucket leaf state

Steps:

```text
Tap: Texture / Sensory
```

Expected:

- breadcrumb includes `Home › I'm › Feeling › Texture / Sensory`
- helper says to choose a texture/sensory word
- board shows leaf/object words such as sticky, wet, dry, hard, soft

## 5. Leaf word speech output

Steps:

```text
Tap: sticky
```

Expected:

- sentence becomes `I'm feeling sticky`
- bucket state clears
- no bucket label is added to the sentence

## 6. Back behavior from semantic bucket

Steps:

```text
Tap: I'm
Tap: feeling
Tap: Texture / Sensory
Tap: Back
```

Expected:

- board returns to the meaning bucket choices
- sentence does not delete a word yet

## 7. Back behavior from home/prediction

Steps:

```text
Tap: I'm
Tap: Back
```

Expected:

- if not inside a bucket/topic, existing sentence-back behavior runs

## 8. Topic drill-down breadcrumb

Steps:

```text
Tap: Food & Drink
Tap a topic bucket with children
```

Expected:

- breadcrumb shows the topic path
- Back returns one topic level up
- breadcrumb Home resets board context

## 9. Fallback safety

Simulate a failed expanded vocabulary load.

Expected:

- core buttons remain visible
- banner explains more words are unavailable
- Back and Home actions are visible

## 10. Reduced motion

Enable reduced motion at OS/browser level.

Expected:

- grid still changes normally
- fade/shift animation is disabled
