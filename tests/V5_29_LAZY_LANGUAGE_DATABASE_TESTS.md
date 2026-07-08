# V5.29 Lazy Language Database Tests

## Manual acceptance tests

1. Build the web app.
   - Command: `cd web && npm run build`
   - Expected: build completes successfully.

2. Inspect build output.
   - Expected: initial main JS chunk does not contain the full 10,000-entry database.
   - Expected: the database is emitted as a separate lazy-loaded asset/chunk.

3. Open the child board at Stage 1.
   - Expected: low-density board appears immediately.
   - Expected: no expanded database flood appears.

4. Select an expanded topic with expanded vocabulary enabled.
   - Expected: database loads on demand.
   - Expected: visible result is capped by stage limits.
   - Expected: no more than the configured active button count appears.

5. Turn expanded vocabulary off.
   - Expected: topic board uses fallback/context words only.
   - Expected: database is not required for the initial board experience.

## Regression checks

- Settings still opens Parent/Admin Settings, not a child topic.
- Communication Stage controls board density.
- Age Band controls tone.
- Core words keep stable motor order.
- Search and keyboard remain hidden unless enabled for that stage/settings profile.
