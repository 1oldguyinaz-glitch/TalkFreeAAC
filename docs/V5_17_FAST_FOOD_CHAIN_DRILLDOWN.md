# TalkFreeAAC V5.17 — Fast Food Chain Drilldown

## Scope
Adds chain-level drilldown under:

Food & Drink → Fast Food

## New flow
- Food & Drink
- Fast Food
- McDonald's / Burger King / Wendy's / Chick-fil-A / Taco Bell / Pizza Chains / Subway / KFC / Popeyes / Sonic / Dairy Queen / Fast Food Favorites
- Selecting a chain opens common foods for that chain.
- Selecting a food adds it to the sentence.
- Active tree resets after the food is selected.

## Important
This patch builds directly on V5.16.

## Replace
- engine/language/languageTree.js
- web/child/components/SymbolImage.jsx

## Do not touch
- layout
- CSS
- grid sizing
- color mapping
- topic rail structure
- bottom nav
- core button positions

## Commit message
Version 5.17 - Add fast food chain drilldown
