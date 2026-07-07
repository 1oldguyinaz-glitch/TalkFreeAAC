# TalkFreeAAC V5.27 SAFE — Bucketed 10,000 Language Database

## Purpose
This fixes the V5.27 payload so the 10,000-entry database stays in separate hidden buckets and never floods the active board.

## Bradley's rule
The database can be huge, but the child board should only receive a small, congruent active slice.

## Safe behavior
- 10,000 entries remain hidden in the database.
- Nothing is injected into the child board unless a bucket/path is explicitly selected.
- Active slices are capped from 12 to 40 options.
- Default active slice target is 24 options.
- If no bucket is selected, the router returns zero visible board entries.
- If a stage-1 bucket has fewer than 12 items, the router fills from later-stage entries inside the same bucket group, not from random unrelated words.
- Search can query the database, but search results are capped.
- Parent/sensitive/school/emergency-gated entries stay gated.
- The language tree is not touched.

## Bucket model
The router supports exact buckets and topic-to-bucket groups.

Examples:
- Feelings -> feelings, regulation, sensory, states_conditions, temperature
- Food & Drink -> food_drink, grocery, food_cooking_deep
- School -> school, academic_deep, reading_writing, math_deep, science_nature
- Body & Health -> body_pain, medical_deep, personal_care
- Questions -> questions, communication_repair, grammar_language

## Why this path is better
The 10,000-word database should power:
- Search
- parent-approved vocabulary management
- custom word comparison
- typed vocabulary data-science review
- future official vocabulary patches

It should not become the default child board.

## Replace from original V5.27 payload
- engine/language/languageDatabaseRouterV5_27.js
- engine/prediction/predictionEngine.v5_27.integration.js

## Add/keep
- engine/language/languageDatabaseV5_27_10000.json
- engine/language/deepBucketMapV5_27.js

## Does not touch
- web/child/ChildAAC.jsx
- engine/language/languageTree.js
- web/styles/app.css
- web/styles/aac-polish.css
- keyboard tracker
- custom vocabulary store
- symbols
- insights

## Validation
- Total database entries checked: 10000
- No bucket selected -> 0 visible entries
- Feelings bucket -> capped active slice
- Food & Drink bucket -> capped active slice
- School bucket -> capped active slice
- Emergency bucket -> capped active slice
- Active board limit enforced: 12 to 40

## Commit message
Version 5.27 SAFE - Bucketed 10k database with gated active slices
