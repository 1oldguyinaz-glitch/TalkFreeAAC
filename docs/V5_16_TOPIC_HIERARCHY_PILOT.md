# TalkFreeAAC V5.16 — Topic Hierarchy Pilot

## Scope
Adds drill-down topic hierarchy for only:
- Relationships
- Feelings
- Food & Drink

Other topics stay flat.

## Behavior
Topic selection does not enter the sentence box.

Example:
1. Select `Food & Drink`
2. Active tree shows broad nodes:
   - Fruit
   - Produce
   - Snacks
   - Meals
   - Breakfast
   - Fast Food
   - Drinks
   - Sweets
   - Hot Food
   - Cold Food
3. Select `Fast Food`
4. Active tree shows foods:
   - chicken nuggets
   - french fries
   - hamburger
   - cheeseburger
   - pizza
   - kids meal
5. Select `chicken nuggets`
6. `chicken nuggets` enters the sentence
7. Active tree resets to default/sentence mode

## Replace
- `engine/language/languageTree.js`
- `engine/prediction/predictionEngine.js`
- `web/child/ChildAAC.jsx`
- `web/child/components/SymbolImage.jsx`

## Do not touch
- layout
- CSS
- grid sizing
- color mapping
- topic rail structure
- bottom nav
- core button positions

## Commit message
Version 5.16 - Pilot hierarchical topic drilldown
