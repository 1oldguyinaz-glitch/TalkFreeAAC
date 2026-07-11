// TalkFreeAAC V5.28 — Stage-aware display settings
// Stage controls complexity. Age band controls tone. The large database stays hidden.

export const COMMUNICATION_STAGES = {
  1: {
    label: "Stage 1 — Emerging",
    description: "Lowest visual load. Survival communication and fast wins.",
    coreLimit: 12,
    activeLimit: 12,
    quickPhraseLimit: 6,
    topicLimit: 5,
    defaultBoardDensity: "simple"
  },
  2: {
    label: "Stage 2 — Expanding",
    description: "More choices without flooding the board.",
    coreLimit: 18,
    activeLimit: 16,
    quickPhraseLimit: 8,
    topicLimit: 7,
    defaultBoardDensity: "standard"
  },
  3: {
    label: "Stage 3 — Sentence Builder",
    description: "More grammar, sentence building, and topic depth.",
    coreLimit: 18,
    activeLimit: 24,
    quickPhraseLimit: 10,
    topicLimit: 9,
    defaultBoardDensity: "standard"
  },
  4: {
    label: "Stage 4 — Teen / Adult Advanced",
    description: "Higher density for school, work, social, and advanced language.",
    coreLimit: 24,
    activeLimit: 40,
    quickPhraseLimit: 10,
    topicLimit: 9,
    defaultBoardDensity: "expanded"
  },
  5: {
    label: "Stage 5 — Aphasia / Adult Recovery",
    description: "Adult-respectful retrieval support, repair, medical, and family language.",
    coreLimit: 18,
    activeLimit: 24,
    quickPhraseLimit: 8,
    topicLimit: 8,
    defaultBoardDensity: "standard"
  }
};

export const AGE_BANDS = {
  young_child: "Young child",
  child: "Child",
  teen: "Teen",
  adult: "Adult",
  aphasia_recovery: "Aphasia / recovery"
};

export const BOARD_DENSITIES = {
  simple: {
    label: "Simple",
    activeMultiplier: 0.75,
    quickMultiplier: 0.75
  },
  standard: {
    label: "Standard",
    activeMultiplier: 1,
    quickMultiplier: 1
  },
  expanded: {
    label: "Expanded",
    activeMultiplier: 1.25,
    quickMultiplier: 1
  }
};

export const DEFAULT_STAGE_SETTINGS = {
  communicationStage: 1,
  ageBand: "young_child",
  boardDensity: "simple",
  expandedVocabularyEnabled: true,
  keyboardEnabled: false,
  searchEnabled: false,
  schoolMode: false,
  emergencyMode: true,
  showSensitiveVocabulary: false,
  parentVocabularyUnlocked: false,
  maxVisibleButtons: null
};

function numberStage(value) {
  const stage = Number(value || DEFAULT_STAGE_SETTINGS.communicationStage);
  if (!Number.isFinite(stage)) return DEFAULT_STAGE_SETTINGS.communicationStage;
  return Math.max(1, Math.min(5, Math.round(stage)));
}

function booleanValue(value, fallback) {
  if (typeof value === "boolean") return value;
  return fallback;
}

export const MAX_VISIBLE_OPTIONS = [24, 30, 36, 42, 45];

function normalizeMaxVisibleButtons(value, stagePreset, communicationStage) {
  if (communicationStage < 3) return null;
  const numeric = Number(value);
  const defaultTotal = Math.min(45, stagePreset.coreLimit + stagePreset.activeLimit);
  if (!Number.isFinite(numeric)) return defaultTotal;
  const minimum = Math.min(defaultTotal, stagePreset.coreLimit + 6);
  return Math.max(minimum, Math.min(45, Math.round(numeric)));
}

export function normalizeStageSettings(profile = {}) {
  const source = profile.settings || {};
  const communicationStage = numberStage(
    source.communicationStage ||
    profile.communicationStage ||
    profile.stage ||
    profile.userProfile?.communicationStage
  );

  const stagePreset = COMMUNICATION_STAGES[communicationStage] || COMMUNICATION_STAGES[1];
  const ageBand = AGE_BANDS[source.ageBand] ? source.ageBand : (
    AGE_BANDS[profile.ageBand] ? profile.ageBand : DEFAULT_STAGE_SETTINGS.ageBand
  );
  const boardDensity = BOARD_DENSITIES[source.boardDensity] ? source.boardDensity : stagePreset.defaultBoardDensity;

  return {
    ...DEFAULT_STAGE_SETTINGS,
    ...source,
    communicationStage,
    ageBand,
    boardDensity,
    expandedVocabularyEnabled: booleanValue(source.expandedVocabularyEnabled, DEFAULT_STAGE_SETTINGS.expandedVocabularyEnabled),
    keyboardEnabled: booleanValue(source.keyboardEnabled, communicationStage >= 3),
    searchEnabled: booleanValue(source.searchEnabled, communicationStage >= 3),
    schoolMode: booleanValue(source.schoolMode, DEFAULT_STAGE_SETTINGS.schoolMode),
    emergencyMode: booleanValue(source.emergencyMode, DEFAULT_STAGE_SETTINGS.emergencyMode),
    showSensitiveVocabulary: booleanValue(source.showSensitiveVocabulary, DEFAULT_STAGE_SETTINGS.showSensitiveVocabulary),
    parentVocabularyUnlocked: booleanValue(source.parentVocabularyUnlocked, DEFAULT_STAGE_SETTINGS.parentVocabularyUnlocked),
    maxVisibleButtons: normalizeMaxVisibleButtons(source.maxVisibleButtons, stagePreset, communicationStage)
  };
}

export function getStageBoardLimits(profile = {}) {
  const settings = normalizeStageSettings(profile);
  const stagePreset = COMMUNICATION_STAGES[settings.communicationStage] || COMMUNICATION_STAGES[1];
  const density = BOARD_DENSITIES[settings.boardDensity] || BOARD_DENSITIES[stagePreset.defaultBoardDensity];

  const rawActiveLimit = Math.max(8, Math.min(40, Math.round(stagePreset.activeLimit * density.activeMultiplier)));
  const visibleBoardCeiling = 45;
  const requestedVisibleLimit = settings.communicationStage >= 3
    ? (settings.maxVisibleButtons || Math.min(visibleBoardCeiling, stagePreset.coreLimit + rawActiveLimit))
    : Math.min(visibleBoardCeiling, stagePreset.coreLimit + rawActiveLimit);
  const safeVisibleLimit = Math.max(stagePreset.coreLimit + 6, Math.min(visibleBoardCeiling, requestedVisibleLimit));
  const activeLimit = Math.max(6, Math.min(rawActiveLimit, safeVisibleLimit - stagePreset.coreLimit));

  return {
    coreLimit: stagePreset.coreLimit,
    activeLimit,
    quickPhraseLimit: Math.max(4, Math.min(10, Math.round(stagePreset.quickPhraseLimit * density.quickMultiplier))),
    topicLimit: stagePreset.topicLimit,
    totalVisibleLimit: stagePreset.coreLimit + activeLimit,
    requestedVisibleLimit: safeVisibleLimit,
    maxVisibleAdjustable: settings.communicationStage >= 3,
    stageLabel: stagePreset.label,
    ageBandLabel: AGE_BANDS[settings.ageBand] || AGE_BANDS.young_child,
    densityLabel: density.label
  };
}

export function updateStageSettings(profile = {}, patch = {}) {
  const current = normalizeStageSettings(profile);
  const nextSettings = normalizeStageSettings({
    ...profile,
    settings: {
      ...current,
      ...patch
    }
  });

  return {
    ...profile,
    stage: nextSettings.communicationStage,
    communicationStage: nextSettings.communicationStage,
    ageBand: nextSettings.ageBand,
    settings: {
      ...(profile.settings || {}),
      ...nextSettings
    },
    userProfile: {
      ...(profile.userProfile || {}),
      communicationStage: nextSettings.communicationStage,
      ageBand: nextSettings.ageBand
    }
  };
}

export function isAdultTone(profile = {}) {
  const { ageBand } = normalizeStageSettings(profile);
  return ageBand === "teen" || ageBand === "adult" || ageBand === "aphasia_recovery";
}
