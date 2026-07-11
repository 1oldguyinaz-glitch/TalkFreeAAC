# V7.1 Semantic Concept Graph — Test Record

## Automated commands

```bash
node tests/V7_1_SEMANTIC_GRAPH_TESTS.mjs
node tests/run_all_tests.js
cd web && npm run build
```

## Automated coverage

### Graph integrity

- source database remains exactly 10,000 entries
- generated graph contains exactly 10,000 concepts
- every concept has a unique concept ID
- all primary categories, semantic buckets, stages, and age bands validate
- no concept is missing semantic paths, intents, sentence frames, or relations
- normalized duplicate labels remain auditable and deterministic

### Critical corrections

- apple is food/fruit/snack and not technology
- apple supports Food / Drink, Object, and Color / Size paths
- banana, red, and green are available at Stage 1
- orange supports both fruit and color paths
- bathroom supports Bathroom / Care, Help, and Place paths
- break supports regulation, help, and routine paths
- doctor supports person, health, and place paths
- medicine supports health, object, routine, and safety paths
- privacy remains teen/adult/recovery appropriate
- Help is never hidden behind an emergency gate
- pineapple and applesauce are corrected from technology to Food / Drink
- catch, swallow, rewind, and record are corrected to actions
- his and other grammar glue remain Core Words
- caregiver is corrected to People
- noisy and “It is too fast” expose sensory/descriptor paths
- scissors and whiteboard expose Object and School / Work paths
- food phrases such as “I want quesadilla please” do not inherit unrelated social branches
- compound targets such as `dry turkey`, `orange Legos`, `white car toy`, and `green water table` resolve to the correct food/object head
- wheelchair, phone number, address, receipt, school counselor, job coach, and device-repair vocabulary retain accessibility, recovery, school/work, and life-skills paths
- simple functional frames such as `I like that`, `I want paint`, `I want slide`, and `I want to play Legos` remain available at Stage 1 and Stage 5
- academic narrative templates remain School / Work
- refusal and communication-repair phrases retain their intended meaning
- ambiguous “period” supports time, school, and body-health paths without a school gate

### Prediction behavior

- `I want`
- `I feel`
- `help`
- `go`
- `no`
- `why`
- `first`
- `I think`, `I agree`, and `I disagree`
- `can I` and `do you`
- `it hurts`
- `I heard`, `I found`, and `what happened`
- adult `I want`
- Stage 5 `wrong word`
- Stage 5 `give me time`

### Multi-path behavior

- red → apple / ball / shirt / car
- kitchen → food / water / apple / snack / eat / cup / plate
- snack → apple / banana / crackers / chips / cookie
- eat → food / snack / apple / banana / breakfast / lunch / dinner
- apple → actions, descriptors, and places without repeating an already selected word

### Bucket quality

- Food / Drink
- Texture / Sensory
- Communication Repair
- all 29 buckets across all five stages
- no duplicate visible labels within a bucket slice
- all route bucket IDs resolve to valid bucket definitions

### Stage and dignity safeguards

- route matrix covers 54 context routes across all five communication stages
- Stage 1 blocks adult-only terms such as rent, paycheck, dating, supervisor, insurance, password, and privacy
- Stage 4 receives adult dignity additions
- Stage 5 receives adult recovery and word-finding support

### Compatibility

- V5.31 static prediction API remains callable
- V5.32 semantic bucket API remains callable
- mixed direct-word and bucket navigation remains recognized by the board
- legacy engine, sentence composer, storage health, and accessibility tests pass

### Performance

- 4,000 static semantic prediction calls execute without loading the 10,000-concept graph
- measured test run: about 390–395 ms in the build environment; hard regression ceiling is 5,000 ms
- full graph loads only after an explicit lazy-load test

### Deep graph access

- explicit lazy load returns 10,000 concepts
- non-static vocabulary lookup finds `microscope`
- semantic search finds deep vocabulary
- enriched School / Work bucket retrieval succeeds

## Production build

Vite production build result:

- 87 modules transformed
- build completed successfully
- no import, JSX, or path failures
- expected bundle-size advisory remains; no production build failure
- final main bundle measured about 705.45 kB raw / 139.79 kB gzip in the verification environment

## Manual acceptance checks

1. Open Stage 1 and select `I` → `want`.
2. Confirm direct words and meaning buckets appear together.
3. Confirm Food / Drink opens leaf words such as water, apple, banana, and snack.
4. Confirm the board returns using Back and Home without dead ends.
5. Select `I` → `feel`; verify emotion, body, temperature, sensory, pain, and health access.
6. Select `red`; verify apple, ball, shirt, and car are reachable.
7. Open a Stage 4 adult profile; verify adult language appears without childlike substitutions.
8. Open a Stage 5 recovery profile; verify Wrong word, Try again, Give me time, Show me, and phrase-rebuilding support.
9. Confirm Speak remains the only default speech trigger.
10. Confirm no layout, voice, storage, login, payment, or Professional Insights behavior changed.
