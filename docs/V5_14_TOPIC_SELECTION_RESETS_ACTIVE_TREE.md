# TalkFreeAAC V5.14 — Topic Selection Resets Active Tree

## Purpose
Fixes topic-selected words staying stuck in the active tree until Speak is pressed.

## Expected behavior
1. Select `Things`.
2. Lower active tree shows topic attributes like:
   - toy
   - tablet
   - book
3. Select `toy`.
4. `toy` is added to the sentence.
5. Lower active tree immediately returns to the normal sentence/default tree.

## Important
Topic buttons remain navigation only. They do not enter the sentence box.

## Replace
- `web/child/ChildAAC.jsx`
- `engine/prediction/predictionEngine.js`

## Do not touch
- layout
- CSS
- grids
- colors
- topic rail structure
- bottom navigation
- core language positions

## Commit message
Version 5.14 - Reset active tree after topic word selection
