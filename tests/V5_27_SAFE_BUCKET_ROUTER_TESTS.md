# V5.27 SAFE Manual Tests

## Router behavior

### No bucket selected
Expected:
- returns zero visible entries
- status = waiting_for_bucket

### Feelings bucket
Call router with:
- activeBucket = feelings
Expected:
- 12 to 40 visible options
- entries are feeling/regulation/sensory-related
- no random full-database flood

### Food & Drink bucket
Call router with:
- activeBucket = food-and-drink
Expected:
- 12 to 40 visible options
- entries are food/grocery/cooking-related

### School bucket
Call router with:
- activeBucket = school
Expected:
- 12 to 40 visible options
- entries are school/academic/reading/math-related

### Emergency bucket
Call router with:
- activeBucket = emergency
Expected:
- 12 to 40 visible options
- emergency terms stay available
- sensitive/parent-gated safety terms remain gated unless unlocked

## App behavior
Because this patch does not touch ChildAAC.jsx:
- board layout should not change
- active words should not change
- keyboard should still work
- typed tracker should still work
- languageTree.js should remain untouched
