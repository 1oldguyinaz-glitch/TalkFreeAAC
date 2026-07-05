# TalkFreeAAC V5.13 — Topics Populated and Selectable

## Purpose
Populates every existing topic with selectable attributes.

## Important
This does not change the locked layout.

## Behavior
When a topic is selected from the existing right sidebar, the lower active tree grid is populated with that topic's words.

Example:
- Select `Feelings`
- Lower active tree shows: happy, sad, mad, scared, tired, sick, hurt, excited, proud, lonely, safe, frustrated, okay, hungry, thirsty, nervous, calm, upset, because, and, but, with, please, hug, mom, dad, help

## Topics populated
- Relationships
- Feelings
- Food & Drink
- Places
- School
- Actions
- Things
- Body & Health
- Questions
- Recents
- Favorites
- Search
- Emergency

## Replace
- `engine/language/languageTree.js`
- `engine/prediction/predictionEngine.js`

## Do not touch
- layout
- CSS
- button positions
- topic rail structure
- bottom nav
- sentence bar

## Commit message
Version 5.13 - Topics populated and selectable
