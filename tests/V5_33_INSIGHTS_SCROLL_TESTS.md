# V5.33 — Insights Scroll Manual Tests

## Test 1 — Main board remains locked
1. Open the child AAC board.
2. Try to scroll the main board.
3. Expected: the main board remains locked in the approved fixed layout.

## Test 2 — Insights panel scrolls
1. Open Parent Dashboard.
2. Go to Teacher / Therapist Insights.
3. Select each tab: Summary, IEP, Classroom, Session.
4. Try scrolling inside the insights content area.
5. Expected: content scrolls vertically inside the insights panel.

## Test 3 — IEP textarea scrolls
1. Open Teacher / Therapist Insights.
2. Select IEP.
3. Scroll inside the IEP summary text area.
4. Expected: the text area scrolls without pushing or breaking the parent shell.

## Test 4 — Mobile/touch behavior
1. Open Parent Dashboard on mobile or browser responsive mode.
2. Swipe inside the insights content area.
3. Expected: vertical swipe scrolls insights content smoothly.

## Non-regression
- No changes to `web/styles/app.css`.
- No changes to child board layout classes.
- No changes to prediction/language engines.
