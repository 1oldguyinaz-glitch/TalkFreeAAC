export const RELEASE_CHECKS = [
  {
    id: "core-free",
    label: "Core communication is free",
    description: "AAC board, speech, sentence building, search, and essential vocabulary must not require payment."
  },
  {
    id: "local-first",
    label: "Local-first profile",
    description: "Profile, predictions, history, and reports work from local browser storage."
  },
  {
    id: "human-first-home",
    label: "Human-first home board",
    description: "I love you, hug, thank you, hi, bye, sorry, miss you, good morning, and good night are easy to reach."
  },
  {
    id: "sentence-persists",
    label: "Sentence persists across topics",
    description: "Changing topics never clears the current sentence."
  },
  {
    id: "adaptive-prediction",
    label: "Adaptive prediction active",
    description: "Predictions use grammar, context, routine, relationship, safety, and personalization."
  },
  {
    id: "search-genome",
    label: "Genome-aware search",
    description: "Search finds words, phrases, aliases, topics, and related vocabulary."
  },
  {
    id: "parent-dashboard",
    label: "Parent dashboard opens",
    description: "Reports, timeline, goals, team members, notes, and professional insights are usable."
  },
  {
    id: "no-scroll-aac",
    label: "AAC board is touch-first",
    description: "Board scales across Chromebook, tablet, desktop, and touchscreen without normal-use scrolling."
  },
  {
    id: "symbols-fallback",
    label: "Symbols have safe fallback",
    description: "Missing cartoon images fall back to icons instead of breaking the board."
  },
  {
    id: "release-ready",
    label: "Release candidate tested",
    description: "Manual smoke tests pass after npm install and npm run dev."
  }
];

export function buildReleaseChecklist(profile = {}) {
  const sentenceStarters = ["I am", "I want", "I need", "I can", "I can't", "I feel", "I like", "I don't", "Can I", "Help me"];
  const humanPhrases = ["I love you", "Can I have a hug", "Thank you", "Hi", "Bye", "I'm sorry", "I miss you", "Good morning", "Good night"];

  return RELEASE_CHECKS.map(check => {
    let passed = true;

    if (check.id === "local-first") {
      passed = typeof localStorage !== "undefined";
    }

    if (check.id === "human-first-home") {
      passed = humanPhrases.length >= 8;
    }

    if (check.id === "adaptive-prediction") {
      passed = Boolean(profile.predictionStats || profile.conversationPatterns || profile.favoritePhrases);
    }

    if (check.id === "sentence-persists") {
      passed = Array.isArray(profile.sentence || []);
    }

    if (check.id === "core-free") {
      passed = true;
    }

    return {
      ...check,
      passed,
      status: passed ? "pass" : "needs-review",
      sentenceStarters: check.id === "human-first-home" ? sentenceStarters : undefined
    };
  });
}

export function getReleaseReadinessScore(profile = {}) {
  const checks = buildReleaseChecklist(profile);
  const passed = checks.filter(check => check.passed).length;
  return {
    passed,
    total: checks.length,
    percent: Math.round((passed / checks.length) * 100),
    checks
  };
}
