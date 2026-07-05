# TalkFreeAAC V5.19 — Full Topic Symbol Coverage

## Purpose
Adds explicit symbol coverage for every current topic-tree branch and selectable word in the V5.18 pilot vocabulary.

## Coverage
- Total current topic-tree terms checked: 856
- Newly added symbol mappings: 375
- Remaining unmapped topic-tree terms: 0

## Behavior
No current topic-tree item should fall back to the generic star symbol unless it is a new word added later without a mapping.

## Replace
- `web/child/components/SymbolImage.jsx`

## Do not touch
- layout
- CSS
- grid sizing
- color mapping
- topic rail structure
- bottom nav
- core button positions
- language tree logic

## Commit message
Version 5.19 - Full symbol coverage for topic tree
