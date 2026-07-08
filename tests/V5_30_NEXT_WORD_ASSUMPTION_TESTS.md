# V5.30 Next-Word Assumption Manual Tests

## Test 1 — `I` repopulates next words

1. Open child board.
2. Stage 1 profile.
3. Tap `I`.

Expected:

- Sentence shows `I`.
- Board does not freeze.
- Active board changes to likely next options.
- Core still keeps stable motor positions.
- Active area includes useful non-core followups such as family/need/action options.

## Test 2 — `I → am → feeling`

1. Tap `I`.
2. Tap `am`.
3. Tap `feeling`.

Expected:

- Sentence becomes `I am feeling`.
- Board shows feelings such as `happy`, `sad`, `mad`, `scared`, `tired`, `sick`, `hurt`.

## Test 3 — `I'm → feeling`

1. Clear sentence.
2. Tap `I'm` from the active/home area.
3. Tap `feeling`.

Expected:

- Sentence becomes `I'm feeling`.
- Board shows feelings such as `happy`, `sad`, `mad`, `scared`, `tired`, `sick`, `hurt`.

## Test 4 — Topic gating still works

1. Clear sentence.
2. Tap `Food & Drink`.

Expected:

- Board shows a capped topic slice.
- The 10,000-word database does not flood the board.
- Stage 1 remains low density.

## Test 5 — No external AI dependency

Expected:

- App builds and runs without OpenAI/API keys.
- Next-word routing works offline/local-first.
