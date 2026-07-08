# V7.0.3 — Layout-only board redesign

## Purpose
Reorganizes the child AAC shell to match the requested sketch layout without changing board wiring.

## What changed
- Top row: compact TalkFreeAAC logo on the left and profile/settings entry on the right.
- Sentence row: large sentence bar with a dedicated Speak button.
- Quick phrase row: saved phrases remain directly under the sentence bar.
- Board: topics are now inside the board as the first band, core words in the next band, and active words in the lower band.
- Keyboard access is presented as a left-side tab when keyboard is enabled by stage/settings.

## What did not change
- No language routing changes.
- No speech/cadence changes.
- No semantic bucket logic changes.
- No prediction engine changes.
- No profile/storage changes.
- No 10k database behavior changes.

## Safety rule
This patch is shell/CSS layout only. The existing handlers are preserved: tap word, tap bucket, Speak, Back, Clear, Home, keyboard, profile/settings, and insights.
