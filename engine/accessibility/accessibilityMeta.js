export function buildButtonAccessibility(word, index, total, options = {}) {
  return {
    word,
    dwellTarget: true,
    dwellMs: options.dwellMs || 900,
    focusOrder: index + 1,
    totalTargets: total,
    scanGroup: Math.floor(index / 5) + 1,
    ariaLabel: `Say ${word}`,
    accessibilityHint: `Activates the communication button for ${word}`
  };
}

export function attachAccessibilityMetadata(words = [], options = {}) {
  return words.map((word, index) => ({
    word,
    accessibility: buildButtonAccessibility(word, index, words.length, options)
  }));
}
