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

export const SYMBOL_DISPLAY_MODES = {
  auto: {
    name: "Automatic by age",
    description: "Uses child-friendly or age-respectful symbols from the communicator profile."
  },
  classic: {
    name: "Classic AAC symbols",
    description: "Uses the standard TalkFree picture set."
  },
  age_respectful: {
    name: "Teen / adult symbols",
    description: "Uses more neutral, age-respectful visuals."
  },
  sign_language: {
    name: "Sign language visuals",
    description: "Uses available hand-gesture visuals and falls back safely when a sign asset is unavailable."
  }
};

export function getSymbolDisplayMode(profile = {}) {
  const requested = profile.displaySettings?.symbolMode || "auto";
  if (requested !== "auto" && SYMBOL_DISPLAY_MODES[requested]) return requested;

  const ageBand = profile.settings?.ageBand || profile.ageBand || profile.userProfile?.ageBand || "young_child";
  return ["teen", "adult", "aphasia_recovery"].includes(ageBand) ? "age_respectful" : "classic";
}

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
