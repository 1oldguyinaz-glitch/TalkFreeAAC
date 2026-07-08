# TalkFreeAAC V5.35 — Board State Clarity + Navigation Polish

## Purpose

This patch makes the child board feel intentional during deeper language-tree navigation.

It adds:

- board breadcrumbs
- board state helper text
- safer Back/Home navigation
- bucket/topic fallback messaging
- light grid transitions
- reduced-motion support
- a local board state engine

## Key rule

A bucket is navigation. A leaf word is speech output.

V5.35 does not change the main AAC board into a scroll screen. It keeps the board locked and adds state clarity inside the existing board area.

## New files

```text
engine/navigation/boardStateEngine.js
web/child/components/BoardBreadcrumbs.jsx
web/child/components/BoardStateBanner.jsx
```

## Updated files

```text
web/child/ChildAAC.jsx
web/styles/aac-unified-board.css
```

## Behavior

Example path:

```text
I'm → feeling → Texture / Sensory → sticky
```

The board now shows:

```text
Home › I'm › Feeling › Texture / Sensory
Choose a texture / sensory word.
```

Then leaf words like:

```text
sticky / wet / dry / hard / soft / scratchy / tight
```

## Back behavior

Back now prioritizes board navigation before sentence deletion:

1. If inside a semantic bucket, Back returns to the bucket choices.
2. If inside a topic drill-down, Back returns one topic level up.
3. Otherwise Back deletes the previous sentence token through the existing `onBack` handler.

## Home behavior

Home resets:

```text
activeTopic = ""
semanticBucketId = ""
keyboardOpen = false
```

It does not erase the sentence. Clear still erases the sentence.

## Fallback behavior

If expanded words fail or a bucket has no extra words:

- core words remain usable
- the banner explains the issue
- Back and Home are available

## Motion

Grid changes use a short 150ms fade/shift animation.

`prefers-reduced-motion: reduce` disables the animation.
