export const DISPLAY_SCHEMES = {
  talkfree_pop: {
    name: "TalkFree Pop",
    core: "#0B1F3A",
    emotion: "#E53935",
    food: "#FF8C00",
    learning: "#FFD400",
    places: "#2ECC71",
    people: "#1976D2",
    questions: "#8E44AD",
    actions: "#7ED957"
  },
  high_contrast: {
    name: "High Contrast",
    core: "#000000",
    emotion: "#D00000",
    food: "#FFB000",
    learning: "#FFFF00",
    places: "#00FF00",
    people: "#00BFFF",
    questions: "#B000FF",
    actions: "#00FF88"
  },
  low_visual_load: {
    name: "Low Visual Load",
    core: "#1F2937",
    emotion: "#B91C1C",
    food: "#C2410C",
    learning: "#CA8A04",
    places: "#15803D",
    people: "#1D4ED8",
    questions: "#7E22CE",
    actions: "#65A30D"
  }
};

export function updateDisplaySettings(profile, settings) {
  return {
    ...profile,
    displaySettings: {
      ...(profile.displaySettings || {}),
      ...settings
    }
  };
}

export function getDisplayScheme(profile) {
  const scheme = profile.displaySettings?.scheme || "talkfree_pop";
  return DISPLAY_SCHEMES[scheme] || DISPLAY_SCHEMES.talkfree_pop;
}
