# TalkFreeAAC V4 Patch 08.10 — Final AI Prediction Test Plan

## Required install order
1. 08.01 Prediction Core
2. 08.02 Memory + Routines
3. 08.03 Engine Integration
4. 08.04 Relationship / Emotion / Safety
5. 08.05 Adaptive Learning
6. 08.06 Debug Tools
7. 08.07 Language + Search Alignment
8. 08.08 Profile Migration
9. 08.09 Prediction UI
10. 08.10 Final docs/tests

## Test phrases

### Human-first
- Empty board should show "I love you", "Can I have a hug", "Thank you".
- "I love" should predict "you".

### Needs
- "I want" should predict "to", "more", "please", "help", food/drink words.
- "I need" should predict "help", "a break", "bathroom", "water".

### Feelings
- "I feel" should predict feelings.
- "I am sad" should predict "because", "Can I have a hug", "I need help".

### Safety
- Emergency context should prioritize "Help me", "I am hurt", "I am scared", "Stop".

### Routine
- Bedtime should prioritize "Good night", "I love you", "Can I have a hug".
- Morning should prioritize "Good morning", "I'm hungry", "School".

### Search
- Search "love" should find "I love you".
- Search "hug" should find relationship phrase.
- Search "school" should find school words/topics.

### Learning
- Repeated selected words should rise over time.
- Completed spoken sentences should be recorded in conversation memory.
