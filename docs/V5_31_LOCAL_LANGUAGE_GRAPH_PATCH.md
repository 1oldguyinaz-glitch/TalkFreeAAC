# TalkFreeAAC V5.31 — Local Language Graph Prediction Patch

## Purpose

This patch upgrades next-word prediction from a small route table into a local language graph engine.

The board now prioritizes sentence grammar first, then enriches from the hidden 10,000-entry language database without flooding the child board.

## Core behavior

The important path is now explicit and stage-safe:

```text
I → am / I'm / want / need / feel / can
I'm → feeling
I'm feeling → happy / sad / mad / scared / tired / sick / hurt / excited / calm
I am → feeling
I am feeling → happy / sad / mad / scared / tired / sick / hurt / excited / calm
```

## What changed

### Added

```text
engine/prediction/languageGraphPredictionEngine.js
```

This engine:

- lazy-loads the 10,000-word database only when needed
- builds local indexes across the entire database
- indexes trigger phrases, context phrases, related words, labels, branches, and phrase continuations
- extracts next-word continuations from sentence templates and functional phrases
- merges four scoring lanes:
  - grammar route
  - database context
  - personal usage / favorites / recents
  - stage / age appropriateness

### Updated

```text
engine/prediction/nextWordAssumptionEngine.js
```

This is now a compatibility wrapper. Older v5.30 import names still work, but they route into the v5.31 graph engine.

```text
web/child/ChildAAC.jsx
```

The child board now calls the v5.31 prediction wrapper and uses the v5.31 local graph source.

## No external AI dependency

No mini ChatGPT or cloud model is included in this patch.

Reason: the broken behavior was not an intelligence problem. It was a routing/indexing problem.

A local graph is faster, private, cheaper, offline-capable, and safer for AAC users.

## Stage behavior

The prediction engine respects the active Communication Stage.

```text
Stage 1: simple core next words and basic feelings
Stage 2: more actions, people, medical basics, and choices
Stage 3: sentence connectors like because / then / when
Stage 4: teen/adult advanced language
Stage 5: adult recovery / aphasia repair phrases
```

Age Band still controls tone. Communication Stage still controls complexity.

## Database behavior

The 10,000-entry database still stays hidden.

The engine scans/indexes the database after lazy-load, but the child board only receives the capped visible slice.

```text
hidden database → graph index → scored candidates → stage gate → capped visible board
```

## Acceptance examples

```text
Tap I:
want, need, am, I'm, feel, can, don't, like, love, have, go, help

Tap I'm:
feeling, happy, sad, mad, scared, tired, sick, hurt, ready

Tap I'm → feeling:
happy, sad, mad, scared, tired, sick, hurt, excited, calm, upset

Tap I → want:
to, more, help, food, drink, water, outside, play, break, mom, dad

Tap I → need:
help, bathroom, water, food, break, quiet, space, medicine, mom, dad
```
