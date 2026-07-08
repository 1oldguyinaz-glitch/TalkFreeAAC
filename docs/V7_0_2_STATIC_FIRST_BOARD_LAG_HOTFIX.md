# V7.0.2 — Static-First Board Lag Hotfix

## Problem

After the V7 voice patch, the AAC board still lagged during word taps and bucket navigation.

Root causes:

1. The child board still triggered lazy 10k vocabulary database scans during active board updates.
2. Profile saving still wrote the full profile to localStorage synchronously after every tap.
3. `tapHistory` could grow too large and make every profile copy/save heavier over time.

## Fix

- The live child board now uses static-first routing only:
  - static next-word candidates
  - static semantic bucket words
  - static topic-tree navigation
- The child board no longer lazy-loads or scans the 10k language database during tap/bucket navigation.
- Profile persistence is deferred and flushed after a short idle delay.
- Pending profile saves flush on tab hide or page unload.
- `tapHistory` is capped to the latest 300 events.
- Stored profile compaction trims heavy historical arrays more aggressively.

## Product rule

The active AAC board must feel instant. Heavy vocabulary enrichment belongs behind Search, More, admin tools, or background indexing — never in the critical tap path.
