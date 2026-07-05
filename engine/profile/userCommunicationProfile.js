export function ensureCommunicationProfile(profile = {}) {
  return {
    ...profile,
    wordCounts: profile.wordCounts || {},
    phraseCounts: profile.phraseCounts || {},
    recentWords: profile.recentWords || [],
    recentPhrases: profile.recentPhrases || [],
    favoritePhrases: profile.favoritePhrases || [
      "I love you",
      "Can I have a hug",
      "Thank you",
      "Good night"
    ],
    conversationPatterns: profile.conversationPatterns || {},
    recentConversationPatterns: profile.recentConversationPatterns || [],
    preferredVocabulary: profile.preferredVocabulary || {},
    selectedStage: profile.selectedStage || "Level 1 Communicator"
  };
}
