export const BOARD_PRESETS = {
  desktop: { columns: 8, maxPredictions: 12, maxContext: 32 },
  laptop: { columns: 7, maxPredictions: 10, maxContext: 28 },
  tablet: { columns: 6, maxPredictions: 8, maxContext: 24 },
  compact: { columns: 4, maxPredictions: 6, maxContext: 16 }
};

export function getBoardPreset(width = window.innerWidth, height = window.innerHeight) {
  const shortest = Math.min(width, height);
  const longest = Math.max(width, height);

  if (shortest < 600) return BOARD_PRESETS.compact;
  if (shortest < 820) return BOARD_PRESETS.tablet;
  if (longest < 1250) return BOARD_PRESETS.laptop;
  return BOARD_PRESETS.desktop;
}

export function getAdaptiveStyle(width = window.innerWidth, height = window.innerHeight) {
  const preset = getBoardPreset(width, height);
  return {
    "--boardColumns": preset.columns,
    "--tileSize": `clamp(58px, ${preset.columns >= 8 ? "10.2vh" : "8.8vh"}, 128px)`,
    "--tileFont": `clamp(10px, ${preset.columns >= 8 ? "1.35vw" : "1.7vw"}, 22px)`,
    "--tileIcon": `clamp(24px, ${preset.columns >= 8 ? "3.9vw" : "4.9vw"}, 58px)`
  };
}

export function limitBoardWords(words = [], width = window.innerWidth, height = window.innerHeight) {
  const preset = getBoardPreset(width, height);
  return words.slice(0, preset.maxContext);
}
