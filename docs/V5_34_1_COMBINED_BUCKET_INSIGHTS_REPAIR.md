# TalkFreeAAC V5.34.1 — Combined Bucket Navigation + Insights Scroll Repair

## Purpose
This patch replaces the failed standalone V5.34 bucket-navigation patch and hardens the V5.33 Professional Insights scroll fix.

It is intended to be applied before V5.35 board-state breadcrumbs.

## Fixes

### 1. Bucket navigation no longer speaks bucket labels
Bucket buttons are navigation-only. Tapping a bucket opens the next semantic layer instead of adding/speaking the bucket label.

Example:

```text
I'm → feeling → Texture / Sensory → sticky
```

Behavior:

```text
Texture / Sensory = opens bucket
sticky = adds/speaks word
```

### 2. Transparent bucket tiles
Bucket tiles use transparent/dashed styling and an `open` cue so they are visually different from speakable word tiles.

### 3. Missing semantic router included
The previous V5.34 patch could crash if V5.32 was not already merged because `ChildAAC.jsx` imported `semanticBucketRouter.js` but the patch did not include that file. This repair includes the router so the dependency is present.

### 4. Insights scroll repair hardened
The main AAC board remains locked. Parent/dashboard screens now get their own scroll container, and the Professional Insights content pane scrolls internally.

## Updated files

```text
engine/prediction/semanticBucketRouter.js
web/child/ChildAAC.jsx
web/child/components/AACButton.jsx
web/styles/aac-unified-board.css
web/styles/parent.css
web/styles/professional-insights.css
```

## Build

```text
npm run build passes
```
