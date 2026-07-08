# TalkFreeAAC v7.0.1 — Performance-first voice and board speed

## Purpose

Voice integration was making the board feel slower because speech could trigger after each selected word. AAC navigation must stay instant. This patch decouples speech output from board navigation.

## Changes

- Stops speaking every tapped word by default.
- Keeps full sentence output on the Speak button.
- Adds a parent setting: **Speak each word on tap**.
- Defaults that setting to off for faster bucket navigation.
- Simplifies voice profiles to six choices:
  - Young female
  - Young male
  - Teen female
  - Teen male
  - Adult female
  - Adult male
- Simplifies cadence profiles to three choices:
  - Slow and clear
  - Natural
  - Quick
- Removes the large exposed device/accent voice list from the parent UI.
- Caches browser speech voices so speech setup is not part of normal board rendering.
- Updates app version metadata to 7.0.1.

## Rule

Board population and bucket navigation must not wait on speech synthesis.
