# V5.31 Local Language Graph — Manual Tests

## Install order

Must be installed after v5.29 and v5.30.

## Test 1 — I branch repopulates

1. Open child board.
2. Tap `I`.
3. Active board should repopulate immediately.

Expected visible examples:

```text
want
need
am
I'm
feel
can
help
more
```

Fail condition:

```text
Board goes blank after I.
```

## Test 2 — I'm path

1. Tap `I'm`.
2. Confirm `feeling` appears.
3. Tap `feeling`.
4. Confirm emotion words appear.

Expected emotion examples:

```text
happy
sad
mad
scared
tired
sick
hurt
excited
calm
upset
```

## Test 3 — I am path

1. Tap `I`.
2. Tap `am`.
3. Confirm `feeling` and emotions appear.
4. Tap `feeling`.
5. Confirm emotion words appear.

## Test 4 — Stage 1 stays simple

1. Set Communication Stage to Stage 1.
2. Tap `I`.
3. Confirm the board remains capped and does not dump database terms.
4. Confirm advanced words like `privacy`, `relationship`, `schedule`, `because` do not dominate Stage 1.

## Test 5 — Stage 4 expands

1. Set Communication Stage to Stage 4.
2. Tap `I`.
3. Confirm advanced connector words can appear when context supports them.

Expected examples may include:

```text
because
then
when
privacy
schedule
work
```

## Test 6 — Stage 5 adult repair support

1. Set Communication Stage to Stage 5.
2. Use repair/context paths like `wrong`, `try`, or adult recovery profile.
3. Confirm repair phrases remain available.

Expected examples:

```text
wrong word
try again
give me time
I know but can't say it
please wait
```

## Test 7 — Lazy DB still isolated

1. Run `npm run build`.
2. Confirm the 10,000-word database remains a lazy asset/chunk, not manually duplicated into the patch.

## Test 8 — No external API required

Disconnect network after app load or use local dev environment.

Expected:

```text
Next-word assumptions still work from local grammar fallback.
```
