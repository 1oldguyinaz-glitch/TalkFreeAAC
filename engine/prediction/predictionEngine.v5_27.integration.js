// TalkFreeAAC V5.27 SAFE — Prediction Integration Wrapper
// This file is intentionally conservative.
// It does not change the board unless expanded vocabulary is explicitly enabled.

import { getBucketedLanguageSliceV5_27 } from "../language/languageDatabaseRouterV5_27.js";

export function applyV5_27LanguageSlice(existingBoard = {}, profile = {}, options = {}) {
  const enabled =
    options.enabled === true ||
    profile?.settings?.enableExpandedVocabularyBoardSlice === true;

  if (!enabled) {
    return {
      ...existingBoard,
      languageRouter: {
        version: "5.27-safe-bucketed",
        enabled: false,
        status: "not_enabled",
        note: "Expanded database loaded but not injected into the child board."
      }
    };
  }

  const slice = getBucketedLanguageSliceV5_27(profile, {
    stage: options.stage || profile.stage || 1,
    bucketPath: options.bucketPath || profile.activeBucketPath,
    bucket: options.bucket || profile.activeBucket,
    activeBucket: options.activeBucket || profile.activeBucket,
    activeContext: options.activeContext || profile.activeContext,
    topic: options.topic || profile.activeTopic,
    phrase: options.phrase || (profile.sentence || []).join(" "),
    limit: options.limit || 24
  });

  if (slice.status !== "bucket_ready") {
    return {
      ...existingBoard,
      languageRouter: {
        version: "5.27-safe-bucketed",
        enabled: true,
        status: slice.status,
        bucketPath: slice.bucketPath,
        visibleCount: 0,
        note: "No bucket selected, so nothing was injected into active words."
      }
    };
  }

  const labels = slice.visible.map(entry => entry.label);
  const baseContextWords = Array.isArray(existingBoard.contextWords) ? existingBoard.contextWords : [];

  return {
    ...existingBoard,
    contextWords: [...new Set([...baseContextWords, ...labels])].slice(0, 40),
    languageRouter: {
      version: "5.27-safe-bucketed",
      enabled: true,
      status: slice.status,
      bucketPath: slice.bucketPath,
      visibleCount: labels.length,
      hiddenCount: slice.hiddenCount,
      limit: slice.limit,
      source: slice.source
    }
  };
}

export default {
  applyV5_27LanguageSlice
};
