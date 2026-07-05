# TalkFreeAAC V5.08 — Restore Dynamic Layout + Symbol Only

## Problem
V5.07 made the board static. Buttons showed, but selections did not repopulate the board.

## Fix
This patch restores the dynamic AAC layout using:
- `getFullBoard(profile)`
- active predictions
- context words
- topic switching
- search/recents/favorites/emergency modes

It keeps the picture-symbol replacement.

## Replaces
- web/child/ChildAAC.jsx
- web/child/components/AACButton.jsx
- web/child/components/SymbolImage.jsx

## Adds
- web/public/symbols/aac/*.svg

## Does not replace
- web/styles/aac-polish.css

That avoids another layout/CSS drift.
