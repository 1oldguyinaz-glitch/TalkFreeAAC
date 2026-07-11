# TalkFreeAAC V7.5 — Automatic Viewport-Fit Board

## Purpose

Replace manual button-size controls and scroll-based compact layouts with one automatic fit system. The board now uses the full available screen and recalculates columns, rows, quick-phrase height, symbols, and labels whenever the viewport changes.

## Behavior

- No user-facing button-size or word-size controls.
- No overlap between topic, core, active, or quick-phrase buttons.
- No board scrollbar on compact screens.
- All currently visible stage-approved buttons remain inside the viewport.
- Wider or shorter screens automatically increase the number of columns to reduce rows.
- Narrow portrait screens use fewer columns while shrinking tiles proportionally.
- Symbols and labels scale inside each tile using size containers.
- Existing stage limits, semantic routing, speech, profile, sign mode, and vocabulary behavior are unchanged.

## Implementation

- `engine/display/viewportFit.js` owns deterministic layout calculations.
- `ChildAAC.jsx` observes the live board size with `ResizeObserver` and passes CSS variables to the board.
- `aac-unified-board.css` divides remaining board height using the actual topic/core/active row counts.
- Manual scale inputs were removed from Profile & Board and Accessibility settings.

## Acceptance criteria

1. Resize continuously between phone, tablet, desktop, and short landscape dimensions.
2. Every visible topic, core word, active word, and quick phrase remains on screen.
3. No tiles overlap.
4. The board does not gain a vertical scrollbar.
5. Symbols and labels remain contained by their tiles.
6. Profile, semantic graph, voice, and stage behavior remain unchanged.
