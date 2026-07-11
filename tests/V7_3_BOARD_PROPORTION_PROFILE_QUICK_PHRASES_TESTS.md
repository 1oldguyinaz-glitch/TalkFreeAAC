# V7.3.0 Board Proportion, Profile, and Quick Phrase Tests

## Automated

- Vite production build completes.
- Legacy TalkFreeAAC tests pass.
- V7.1 semantic graph suite passes unchanged.
- Quick phrase defaults include `Please` for child and adult profiles.
- Custom quick phrases are normalized, capped at ten, saved, and reset safely.
- Profile migration retains communicator name and normalizes the photo field.
- Home-only board state banner is omitted.
- Topic, core, active, and quick phrase controls share the uniform tile-height system.
- Section labels are left-aligned.
- Talk-bar text uses multi-line wrapping and safe line height.

## Manual device matrix

- Desktop: 1440×900 and 1024×768
- Tablet portrait: 820×1180
- Phone portrait: 430×932 and 390×844
- Phone landscape: 844×390

Verify:

1. No Home bar appears on the root communication board.
2. Topic, core, active, and quick phrase buttons no longer appear crushed.
3. The sentence text remains fully readable within the white talk bar.
4. The communicator name and photo appear in the top header.
5. Settings can edit the communicator name, photo, and ten quick phrase buttons.
6. Topic and semantic navigation still displays a breadcrumb/state banner when needed.
