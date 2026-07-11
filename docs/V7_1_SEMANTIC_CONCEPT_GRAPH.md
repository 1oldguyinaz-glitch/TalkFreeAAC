# TalkFreeAAC V7.1 — Semantic Concept Graph

## Purpose

V7.1 converts the existing 10,000-entry language database into a local-first semantic concept graph. The goal is not to place more words on the board. The goal is to help a communicator reach the intended meaning through fewer taps, multiple logical paths, stage-appropriate prediction, and age-respectful vocabulary.

Communication remains free, offline-capable, and independent of external AI services.

## Architecture

```text
languageDatabaseV5_27_10000.json
        ↓ deterministic generator
semanticConceptGraphV7_1_10000.json
        ├── compact static graph for the live AAC board
        ├── meaning-first prediction routes
        ├── semantic bucket router
        └── lazy full-graph search / professional tooling
```

The live board imports only the compact high-value graph. The full 10,000-concept file is loaded only when an explicit deep lookup, search, or enriched professional workflow requests it. This preserves the V7.0.2 static-first performance rule.

## Concept contract

Every generated concept includes:

- stable concept and source identifiers
- normalized label and entry type
- primary category
- secondary categories
- multiple semantic bucket paths
- communication intents
- Stage 1–5 access
- child, teen, adult, and aphasia/recovery age-band access
- recovery appropriateness
- core/common/specialized/rare priority
- sentence frames
- related actions, descriptors, people, places, emotions, and concepts
- prediction and utility weights
- safety and permission gates
- original source metadata for auditing

## Top-level categories

1. Core Words
2. People
3. Actions
4. Things / Objects
5. Food & Drink
6. Places
7. Feelings & Body States
8. Body & Health
9. Descriptors
10. Questions
11. Social
12. Needs & Help
13. School / Work
14. Time & Routines
15. Communication Repair
16. Safety / Emergency
17. Play / Leisure
18. Technology / Media

## Board-facing semantic buckets

The graph exposes 29 focused buckets, including Core Words, Emotion, Body, Temperature, Texture / Sensory, Pain, Sick / Health, Energy, Mental Care, Food / Drink, Activity, Place, Person, Object, Help, Break, Device / Media, Bathroom / Care, Safety, Question, Weather, Color / Size, Time / Routine, School / Work, Social Connection, Refusal / Advocacy, Communication Repair, Story / Comment, and Recovery Support.

Buckets are navigation choices, not speech output. A bucket tap opens stage-appropriate leaf vocabulary.

## Multi-path examples

### Apple

Apple is reachable through:

- Food / Drink
- Object
- Color / Size
- fruit
- snack
- grocery
- eat
- want
- like
- red
- green
- kitchen
- school
- store

### Bathroom

Bathroom is reachable through:

- Bathroom / Care
- Help
- Place
- requests
- location questions
- personal care
- self-advocacy

### Break

Break is reachable through:

- Break / Regulation
- Help
- Time / Routine
- requesting
- refusing
- sensory regulation
- readiness and return-to-task language

### Doctor

Doctor is reachable through:

- Person
- Sick / Health
- Place
- call
- see
- hospital
- clinic
- body-health requests

## Meaning-first prediction

V7.1 adds high-value routes for functional, generative communication. Examples:

- `I want` → direct choices plus Food / Drink, Activity, Place, Person, Object, Help, Break, and Device / Media buckets
- `I feel` → emotion, body, temperature, sensory, pain, health, energy, and mental-care language
- `help` → me, please, with, this, open, find, fix, understand, bathroom, pain, stuck, and stop
- `go` → home, school, bathroom, outside, car, store, doctor, playground, therapy, room, away, and back
- `no` → refusal, boundaries, safety, and communication-repair language
- `wrong word` / `give me time` → adult-respectful recovery and message-repair language
- `I think` / `I agree` / `I disagree` → opinions, reasons, agreement, and self-advocacy
- `I heard` / `I found` / `what happened` → narrative rebuilding across people, places, and time
- `can I` / `do you` → generative questions rather than request-only communication
- `it hurts` → pain location, intensity, help, health, and safety language

Direct high-confidence words and semantic buckets can appear together. This removes the unnecessary bucket-only tap while preserving multiple paths when the next meaning is ambiguous.

## Stage behavior

### Stage 1 — Emerging communicator

- low-density board
- core words, yes/no, help, stop, more, this/that/it
- basic food, drink, people, places, feelings, pain, bathroom, and break language
- no adult-only financial, workplace, privacy, or relationship leakage

### Stage 2 — Early functional communicator

- broader functional vocabulary
- more descriptors, social language, questions, and simple repair
- additional semantic bucket choices without flooding the board

### Stage 3 — Expanding communicator

- sequencing, explanation, describing, opinions, and narrative language
- wider school, community, time, and communication-repair access

### Stage 4 — Teen / adult communicator

- age-respectful privacy, work, schedule, phone, money, relationship, choice, and boundary language
- no forced childlike vocabulary tone

### Stage 5 — Aphasia / adult recovery communicator

- yes/no verification
- word-finding and repair
- phrase rebuilding
- family, home, doctor, pain, medicine, time, and orientation support
- adult dignity; Stage 5 is not Stage 1 with adult labels

## Generated audit

The V7.1 build produces:

- 10,000 semantic concepts from 10,000 source entries
- 18 top-level categories
- 29 board-facing semantic buckets
- 379 generated static high-value concepts, plus 9 runtime-only synthetic repair and self-advocacy concepts (388 live static concepts total)
- 4,306 corrected primary classifications
- 1,674 entries with expanded stage access
- 5,045 recovery-appropriate entries
- zero schema validation failures
- 19 normalized-label duplicate groups retained under unique concept IDs; runtime lookup deterministically selects the highest-value concept

The source database is not overwritten. The generator is reproducible and preserves original metadata for review.

## Performance and safety

- no external AI or network call is required for communication
- no 10,000-entry scan occurs during ordinary board taps
- static prediction is synchronous and local
- full graph loading is explicit and lazy
- safety, parent, school, sensitive-vocabulary, and emergency gates remain available
- Help, school, bathroom, break, and other essential communication concepts are never accidentally hidden behind emergency or school-only gates
- high-risk compounds resolve to their semantic head, so phrases such as `dry turkey`, `orange Legos`, `white car toy`, and `green water table` do not inherit the wrong branch
- accessibility, personal-information, school/work, device, safety, and communication-repair concepts receive explicit deterministic corrections before runtime

## Files

### Added

- `engine/language/semanticGraphSchemaV7_1.js`
- `engine/language/buildSemanticConceptGraphV7_1.mjs`
- `engine/language/semanticConceptGraphV7_1_10000.json`
- `engine/language/semanticCoreConceptsV7_1.js`
- `engine/language/semanticConceptGraphV7_1.audit.json`
- `engine/language/semanticConceptGraphV7_1.js`
- `engine/prediction/semanticGraphPredictionEngineV7_1.js`
- `tests/V7_1_SEMANTIC_GRAPH_TESTS.mjs`
- `tests/V7_1_SEMANTIC_CONCEPT_GRAPH_TESTS.md`

### Updated

- `engine/prediction/languageGraphPredictionEngine.js`
- `engine/prediction/semanticBucketRouter.js`
- `engine/navigation/boardStateEngine.js`
- `web/child/ChildAAC.jsx`
- `web/app/version.js`
- `web/package.json`

## Regeneration

From the repository root:

```bash
node engine/language/buildSemanticConceptGraphV7_1.mjs
```

## Commit

```bash
git commit -m "Add semantic concept graph for AAC prediction"
```
