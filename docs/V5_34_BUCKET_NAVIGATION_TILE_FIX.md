# V5.34 — Bucket Navigation Tile Fix

## Purpose

Bucket labels are navigation controls, not spoken vocabulary.

When the board displays semantic buckets such as `Emotion`, `Body`, `Temperature`, or `Texture / Sensory`, tapping the bucket must drill into the next layer. It must not add the bucket label to the sentence and it must not speak the label.

## Behavior

- Semantic bucket tiles are marked as navigation tiles.
- Topic-tree items with children are also marked as navigation tiles.
- Navigation bucket taps open the next layer silently.
- Leaf-word taps still add/speak vocabulary normally.
- Bucket tiles render as transparent/dashed tiles so users can tell they contain more objects.

## Examples

```text
I'm → feeling → Emotion
```

Tapping `Emotion` opens emotion objects:

```text
happy / sad / mad / scared / calm / frustrated
```

`Emotion` is not added to the sentence.

```text
Food & Drink → Fast Food
```

If `Fast Food` has child nodes, it opens the child branch instead of speaking.

## Updated files

```text
web/child/ChildAAC.jsx
web/child/components/AACButton.jsx
web/styles/aac-unified-board.css
```
