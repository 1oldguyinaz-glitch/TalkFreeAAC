# V5.34 — Bucket Navigation Tile Tests

## Manual tests

### 1. Semantic bucket does not speak

1. Build a phrase: `I'm feeling`.
2. Confirm board shows semantic buckets such as `Emotion`, `Body`, `Temperature`, and `Texture / Sensory`.
3. Tap `Emotion`.
4. Expected: board opens emotion words.
5. Expected: sentence does not become `I'm feeling Emotion`.
6. Expected: speech is not triggered by the bucket tap.

### 2. Leaf words still speak/add normally

1. After opening `Emotion`, tap `happy`.
2. Expected: `happy` is added to the sentence.
3. Expected: normal sentence behavior still works.

### 3. Bucket tiles are visually distinct

1. Build a phrase that produces semantic buckets.
2. Expected: bucket tiles are transparent/dashed and show an `open` cue.
3. Expected: leaf vocabulary tiles keep normal color-category styling.

### 4. Topic tree branches still drill down

1. Open a topic that has child branches.
2. Tap a branch item with children.
3. Expected: child branch opens silently.
4. Expected: branch label is not added to the sentence.

### 5. Main board lock remains unchanged

1. Open the child AAC board.
2. Confirm the board itself remains fixed/non-scrolling.
3. Expected: only the bucket tile behavior changes.
