# TalkFreeAAC V7.3.0 — Board Proportion, Profile, and Quick Phrase Patch

## Purpose

Polish the communication board without changing semantic routing, prediction, speech behavior, or storage performance.

## Changes

- Removes the Home-only breadcrumb/state bar because the communication board is already Home.
- Keeps the state banner for topic, prediction, and semantic-bucket navigation.
- Gives Topics, Core Words, and Active Words one shared tile-height system.
- Enlarges the quick phrase row below the talk bar to use active-word proportions.
- Keeps Topics, Core Words, and Active Words labels left-aligned.
- Increases the talk-bar height, reduces text size slightly, and improves line height/wrapping so sentence text is not clipped.
- Displays the communicator photo and name in the board header with settings access.
- Adds local settings for communicator name and compressed profile-photo upload.
- Adds an **Edit quick phrase bar** button with ten editable entries.
- Adds **Please** to the default child and adult quick phrase sets.

## Safety boundaries

This patch does not modify:

- semantic concept graph data
- prediction scoring
- topic or bucket routing
- voice behavior
- billing, login, or cloud services
- Professional Insights calculations

## Version

`7.3.0`
