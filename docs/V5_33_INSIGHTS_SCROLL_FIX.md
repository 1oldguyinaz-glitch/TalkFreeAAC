# V5.33 — Insights Scroll Fix

## Purpose
Fix the Parent Dashboard professional insights panel so the user can scroll through long insight content without changing or unlocking the main AAC board layout.

## Scope
Updated only the professional insights CSS.

## Behavior
- The main AAC board remains locked and non-scrolling.
- The Teacher / Therapist Insights panel becomes its own scrollable region.
- The header and tabs stay visible at the top of the panel.
- Summary, IEP, classroom, and session content can scroll vertically.
- Long IEP text areas can scroll internally.
- Touch scrolling is enabled for mobile/tablet use.

## Files
Updated:
- `web/styles/professional-insights.css`

Added:
- `docs/V5_33_INSIGHTS_SCROLL_FIX.md`
- `tests/V5_33_INSIGHTS_SCROLL_TESTS.md`
