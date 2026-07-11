# TalkFreeAAC V7.4 — Universal Responsive Board and Symbol Modes

## Purpose

This patch restores the communication board to the full available screen width and replaces fixed device-specific tile counts with a fit-first grid. Buttons resize with the available board width, preserve spacing, and never overlap. Compact screens use contained board scrolling only when minimum readable touch targets cannot fit at once.

## Changes

- Removes the 1440px board-width ceiling.
- Uses CSS `auto-fit` grids for Topics, Core Words, and Active Words.
- Applies user-controlled button and word scaling without breaking the grid.
- Keeps the full interface responsive across desktop, tablet, phone portrait, and phone landscape.
- Simplifies the top-right destination to one avatar-and-name profile button.
- Renames the settings destination around the communicator profile.
- Makes `to` a permanent early core word for phrases such as “I want to…”.
- Adds semantic continuations for `I want to have`, `want to have`, `I have`, and `have`.
- Adds automatic child versus teen/adult symbol presentation.
- Adds a sign-language visual mode with hand-gesture cues and safe fallback behavior.

## Safety note

The sign-supported display is not a certified ASL dictionary. The written word remains authoritative. A clinically reviewed sign asset library should replace or extend the cue set before making formal sign-language claims.

## Scope

No login, billing, voice, storage, or Professional Insights calculation behavior is changed.
