# V5.36 — Emerging Grammar Glue + Voice Cadence

## Purpose

This patch does two small but high-leverage things:

1. Surfaces essential grammar/ownership connector words earlier for Stage 1 / Emerging users.
2. Adds local voice cadence controls in Parent Settings with a professional insight readout.

## Grammar glue changes

Stage 1 was too needs/category-heavy. Emerging users still need a few high-value connector and ownership words to build real phrases.

New priority grammar words include:

- this
- that
- it
- you
- me
- my
- to
- with
- for

Example routes:

- `I > like > this / that / it / you / my / with`
- `I > want > this / that / it / to / with / my`
- `I > need > help / with / this / that / it / my / me`
- `my > turn / toy / food / drink / body / room`
- `you > help / me / stop / go / come / look`
- `with > me / you / this / that / mom / dad / teacher`

## Voice cadence changes

Added local browser/device speech settings:

- Child neutral
- Little girl
- Little boy
- Girl
- Boy
- Teen girl
- Teen boy
- Adult female
- Adult male

Cadence presets:

- Gentle
- Natural
- Slow + clear
- Quick

The app uses the local Web Speech API. True installed voice availability depends on the device/browser, so child voices are approximated through voice choice, pitch, rate, and cadence.

## Files

### Updated

- `engine/prediction/languageGraphPredictionEngine.js`
- `web/app/App.jsx`
- `web/child/ChildAAC.jsx`
- `web/parent/ParentMenu.jsx`
- `web/parent/components/ProfessionalInsightsPanel.jsx`
- `web/shared/speech.js`
- `web/styles/parent.css`

### Added

- `engine/voice/voiceSettings.js`
- `web/parent/VoiceSettingsPanel.jsx`

## Build

`npm run build` passes.
