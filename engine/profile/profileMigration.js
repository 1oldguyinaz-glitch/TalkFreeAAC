import {
  DEFAULT_STAGE_SETTINGS,
  normalizeStageSettings
} from "../display/stageSettings.js";

export const CURRENT_PROFILE_VERSION = "4.9-stage-settings";

export function migrateProfile(profile = {}) {
  const stageSettings = normalizeStageSettings({
    ...profile,
    settings: {
      ...DEFAULT_STAGE_SETTINGS,
      ...(profile.settings || {})
    }
  });

  const next = {
    ...profile,
    profileVersion: CURRENT_PROFILE_VERSION,
    sentence: profile.sentence || [],
    activeContext: profile.activeContext || "Core Needs",
    activeTopic: profile.activeTopic || "",
    activeBucket: profile.activeBucket || "",
    activeBucketPath: profile.activeBucketPath || [],
    stage: stageSettings.communicationStage,
    communicationStage: stageSettings.communicationStage,
    ageBand: stageSettings.ageBand,
    settings: {
      ...(profile.settings || {}),
      ...stageSettings
    },
    wordCounts: profile.wordCounts || {},
    phraseCounts: profile.phraseCounts || {},
    recentWords: profile.recentWords || [],
    recentPhrases: profile.recentPhrases || [],
    favoritePhrases: profile.favoritePhrases || [
      "I love you",
      "Can I have a hug",
      "Thank you",
      "Good morning",
      "Good night"
    ],
    favorites: profile.favorites || [],
    teamMembers: profile.teamMembers || [],
    goals: profile.goals || [],
    dailyNotes: profile.dailyNotes || [],
    timeline: profile.timeline || [],
    conversationPatterns: profile.conversationPatterns || {},
    recentConversationPatterns: profile.recentConversationPatterns || [],
    predictionStats: profile.predictionStats || {},
    preferredVocabulary: profile.preferredVocabulary || {},
    userProfile: {
      ...(profile.userProfile || {}),
      name: profile.userProfile?.name || profile.name || "Austin",
      communicatorLevel: profile.userProfile?.communicatorLevel || profile.communicatorLevel || "Level 1 Communicator",
      communicationStage: stageSettings.communicationStage,
      ageBand: stageSettings.ageBand,
      avatar: profile.userProfile?.avatar || profile.avatar || ""
    }
  };

  return next;
}
