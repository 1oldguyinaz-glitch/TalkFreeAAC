# TalkFreeAAC V5.28 — Stage Settings Router Patch

## Executed

- Added real parent/admin board staging controls.
- Wired Communication Stage 1–5 into the child board display.
- Split Communication Stage from Age Band.
- Routed topic selections through `languageDatabaseRouterV5_27.js` instead of dumping the 10,000-entry language database.
- Capped the visible child board to the approved no-scroll 45-cell shell.
- Stopped Settings from behaving like a child topic; Settings now opens the parent/admin area.
- Hid keyboard/search by default for Stage 1 unless parent enables them.
- Added adult/aphasia tone quick phrases when Age Band is Teen, Adult, or Aphasia / recovery.

## Stage behavior

| Stage | Core | Active | Max board cells | Intended use |
|---|---:|---:|---:|---|
| 1 | 12 | 12 | 24 | Emerging communicator / low overwhelm |
| 2 | 18 | 16 | 34 | Expanding choices |
| 3 | 18 | 24 | 42 | Sentence building |
| 4 | 24 | 21 | 45 | Teen/adult advanced within current no-scroll shell |
| 5 | 18 | 24 | 42 | Aphasia/adult recovery |

## Files changed

- `engine/display/stageSettings.js`
- `engine/profile/profileMigration.js`
- `web/child/ChildAAC.jsx`
- `web/parent/ParentMenu.jsx`
- `web/parent/StageSettingsPanel.jsx`
- `web/styles/parent.css`
- `web/styles/aac-unified-board.css`

## Validation

`npm run build` passes.

Build warning remains: the vocabulary database is bundled into the main JS chunk. This patch preserves behavior, but the next performance fix should lazy-load `languageDatabaseV5_27_10000.json` only when expanded vocabulary/search is needed.
