import { buildLanguageBoard } from "../language/languageEngine.js";
import { getConversationPredictions } from "../language/conversationEngine.js";
import { getContextPredictions } from "./contextPredictionEngine.js";
import { getRoutinePredictions } from "./routineEngine.js";
import { getPersonalizedPredictions } from "./personalizationEngine.js";
import { getConversationMemoryPredictions } from "./conversationMemory.js";
import { getRelationshipPredictions } from "./relationshipPredictionEngine.js";
import { getEmotionPredictions } from "./emotionPredictionEngine.js";
import { getSafetyPredictions } from "./safetyPredictionEngine.js";
import { rankPredictions } from "./predictionScoring.js";
import { ensureCommunicationProfile } from "../profile/userCommunicationProfile.js";

export function currentPhrase(sentence = []) {
  return Array.isArray(sentence) ? sentence.join(" ").trim() : "";
}

export function getPredictions(profile) {
  return getFullBoard(profile).predictions;
}

export function getFullBoard(rawProfile = {}) {
  const profile = ensureCommunicationProfile(rawProfile);
  const sentence = profile.sentence || [];
  const activeContext = profile.activeContext || "Core Needs";

  const board = buildLanguageBoard(profile);

  const candidates = [
    ...getSafetyPredictions(profile, sentence),
    ...getEmotionPredictions(profile, sentence),
    ...getRelationshipPredictions(profile, sentence),
    ...getConversationPredictions(profile, 16).map(word => ({
      word,
      reasons: {
        grammar: true,
        relationship: /love|hug|thank|miss|good night/i.test(word),
        emotion: /sad|happy|mad|scared|hurt|sick|tired/i.test(word)
      },
      score: 160
    })),
    ...getContextPredictions(profile),
    ...getRoutinePredictions(profile),
    ...getPersonalizedPredictions(profile),
    ...getConversationMemoryPredictions(profile, sentence),
    ...(board.predictions || []).map(word => ({
      word,
      reasons: { grammar: true },
      score: 120
    }))
  ];

  const predictions = rankPredictions(candidates, profile, sentence, activeContext, 12);

  return {
    ...board,
    predictions
  };
}
