# TalkFreeAAC V5.18 — Three Topic Deep Drilldown

## Scope
Applies the same hierarchical drilldown principle across the first three pilot topics:

- Relationships
- Feelings
- Food & Drink

## Behavior
Branch selections do not enter the sentence box. They drill deeper.
Leaf/object selections enter the sentence and reset the active tree.

## Examples

Relationships:
- Relationships → People → Family People → mom
- Relationships → Love & Care → Hugs → Can I have a hug
- Relationships → Social Words → Turns → my turn

Feelings:
- Feelings → Sad Feelings → Need Comfort → Can I have a hug
- Feelings → Body Feelings → Hurt → head hurts
- Feelings → Calm Tools → Comfort Items → blanket

Food & Drink:
- Food & Drink → Snacks → Gummies → gummies
- Food & Drink → Meals → Kid Favorites → chicken nuggets
- Food & Drink → Fast Food → McDonald's → Happy Meal
- Food & Drink → Breakfast → Cereal → Cheerios

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
Version 5.18 - Deepen first three topic hierarchies
