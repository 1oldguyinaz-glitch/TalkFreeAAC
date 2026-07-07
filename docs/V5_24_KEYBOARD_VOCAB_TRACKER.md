# TalkFreeAAC V5.24 — Keyboard Vocabulary Tracker + Custom Save Foundation

## Purpose
Adds keyboard-side vocabulary tracking and custom-save storage without changing the protected built-in language tree.

## Core rule
- Typed words become data.
- Saved words become custom vocabulary records.
- `engine/language/languageTree.js` stays untouched.

## What changed
### Keyboard tracker
When text is submitted from the keyboard through Speak, Add, or Save, the app records:
- typed words
- typed phrase
- normalized labels
- counts
- first typed date
- last typed date
- source/action
- whether the word/phrase already exists in the built-in vocabulary

This data is exportable for future developer/data-science review.

### Custom vocabulary store
The keyboard now has a Save action that stores the typed word or phrase as a custom vocabulary record in local storage.

Custom records are stored separately from the official vocabulary and do not modify `languageTree.js`.

## Replace
- `web/child/ChildAAC.jsx`

## Add
- `engine/storage/typedVocabularyTracker.js`
- `engine/storage/customVocabularyStore.js`
- `docs/V5_24_KEYBOARD_VOCAB_TRACKER.md`

## Does not touch
- `engine/language/languageTree.js`
- layout CSS
- board sizing
- topic rail layout
- core language grid
- active tree layout
- bottom nav layout
- symbol mappings
- insights dashboard

## Local storage keys
- `talkfreeaac.typedVocabulary.v1`
- `talkfreeaac.customVocabulary.v1`

## Behavior
- Typing individual keyboard letters is silent.
- Typing does not immediately add buttons to the board.
- Speak records a keyboard communication event and speaks the typed text.
- Add records a keyboard communication event and adds the typed text to the sentence.
- Save records the typed text and stores it as custom vocabulary.
- No official built-in vocabulary file is mutated.

## Commit message
Version 5.24 - Add keyboard vocabulary tracker and custom save foundation
