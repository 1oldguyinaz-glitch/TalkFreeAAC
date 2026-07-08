# V5.32 Semantic Bucket Router Tests

## Build

```bash
cd web
npm run build
```

Expected: build passes.

## Manual Board Tests

### Feeling route

1. Open the child board.
2. Tap `I`.
3. Tap `I'm` or `am`.
4. Tap `feeling`.

Expected active board includes classified bucket buttons:

```text
Emotion
Body
Temperature
Texture / Sensory
Pain
Sick / Health
Energy
Mental Care
```

### Texture route

1. Continue from `I'm feeling`.
2. Tap `Texture / Sensory`.

Expected board switches to texture/sensory words, for example:

```text
sticky
wet
dry
hard
soft
scratchy
tight
loud
bright
too much
```

The bucket label must not be added to the sentence.

### Emotion route

1. Continue from `I'm feeling`.
2. Tap `Emotion`.

Expected board shows emotion words, for example:

```text
happy
sad
mad
scared
calm
excited
frustrated
worried
```

### Want route

1. Clear sentence.
2. Tap `I`.
3. Tap `want`.

Expected board shows meaning buckets such as:

```text
Food / Drink
Activity
Place
Person
Object
Help
Break
Device / Media
```

### Need route

1. Clear sentence.
2. Tap `I`.
3. Tap `need`.

Expected board shows meaning buckets such as:

```text
Help
Bathroom / Care
Food / Drink
Body
Sick / Health
Break
Person
Device / Media
Safety
```

### Stage gates

Test Stage 1 and Stage 4.

Expected:

```text
Stage 1: fewer buckets and fewer visible detailed words.
Stage 4: more bucket choices and richer vocabulary where database entries allow it.
```

### Topic override

1. Start a semantic route.
2. Select a regular topic from the topic rail.

Expected: semantic bucket state clears and regular topic routing works.

### Home reset

1. Open any semantic bucket.
2. Tap Home.

Expected: semantic bucket state clears and the home board returns.

## Privacy / Performance

Expected:

```text
No external API calls.
10,000-word database remains lazy-loaded.
Only capped bucket slices are shown.
```
