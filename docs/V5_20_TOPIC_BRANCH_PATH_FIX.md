# TalkFreeAAC V5.20 — Topic Branch Path Fix

## Purpose
Fixes the bug shown in the screenshots:

Relationships → People changed the title to People, but the active tree fell back to the default/home words.

## Cause
Nested topic paths like:

relationships/people

were being normalized into:

relationships-people

That broke lookup for deeper topic branches.

## Fixed behavior
- Relationships → People now shows People sub-branches
- Feelings → branch now shows the correct next level
- Food & Drink → branch now shows the correct next level
- Branch selections still do not enter the sentence
- Final leaf/object selections still enter the sentence and reset the active tree

## Replace
- engine/language/languageTree.js

## Do not touch
- layout
- CSS
- grid sizing
- color mapping
- topic rail structure
- bottom nav
- core button positions
- symbol coverage

## Commit message
Version 5.20 - Fix nested topic branch path lookup
