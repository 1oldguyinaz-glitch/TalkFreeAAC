# TalkFreeAAC V5.25 — Unified Core + Active Board

## Purpose
Cleans up Layout 1 by removing the visual split between core language and active words.

## What changed
The main board is now one continuous board:

- core words appear first
- active words continue immediately after core words
- the separate Core Language section title is removed
- the separate Active Tree / Connectors / Endings section title is removed
- the gap between the core section and active section is removed
- duplicate active words that already exist in fixed core are filtered out

## Behavior
- Core words are still always available.
- Core words still appear first.
- Active words still update after selections.
- Topic drilldown behavior still works.
- Final object/word selections still enter the sentence.
- The language tree is not touched.

## Replace
- `web/child/ChildAAC.jsx`

## Add
- `web/styles/aac-unified-board.css`
- `docs/V5_25_UNIFIED_CORE_ACTIVE_BOARD.md`

## Does not touch
- `engine/language/languageTree.js`
- `engine/storage/typedVocabularyTracker.js`
- `engine/storage/customVocabularyStore.js`
- `web/styles/aac-keyboard.css`
- `web/styles/app.css`
- `web/styles/aac-polish.css`
- symbols
- topic vocabulary
- insights
- profile/settings
- keyboard behavior

## Commit message
Version 5.25 - Unified core and active board
