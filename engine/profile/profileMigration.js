export const CURRENT_PROFILE_VERSION = "4.8";

export function migrateProfile(profile = {}) {
  const next = {
    ...profile,
    profileVersion: CURRENT_PROFILE_VERSION,
    sentence: profile.sentence || [],
    activeContext: profile.activeContext || "Core Needs",
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
      name: profile.userProfile?.name || profile.name || "Austin",
      communicatorLevel: profile.userProfile?.communicatorLevel || profile.communicatorLevel || "Level 1 Communicator",
      avatar: profile.userProfile?.avatar || profile.avatar || "",
      ...(profile.userProfile || {})
    }
  };

  return next;
}
