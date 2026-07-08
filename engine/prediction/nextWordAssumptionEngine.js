// TalkFreeAAC V5.31 — Compatibility wrapper for the local language graph engine
// Previous import names stay alive so older child-board code does not break.
// New code should prefer languageGraphPredictionEngine.js exports directly.

import {
  LANGUAGE_GRAPH_PREDICTION_VERSION,
  LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31,
  LOCAL_GRAMMAR_GRAPH_V5_31,
  getLanguageGraphPredictionSliceV5_31Async,
  getLanguageGraphRouteDebugV5_31,
  getStaticLanguageGraphCandidatesV5_31
} from "./languageGraphPredictionEngine.js";

export const NEXT_WORD_ASSUMPTION_VERSION = LANGUAGE_GRAPH_PREDICTION_VERSION;
export const NEXT_WORD_DATA_OVERLAY_V5_30 = LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31;
export const NEXT_WORD_ROUTES_V5_30 = LOCAL_GRAMMAR_GRAPH_V5_31;

export const NEXT_WORD_DATA_OVERLAY_V5_31 = LANGUAGE_GRAPH_OVERLAY_ENTRIES_V5_31;
export const NEXT_WORD_ROUTES_V5_31 = LOCAL_GRAMMAR_GRAPH_V5_31;

export function getStaticNextWordCandidatesV5_30(profile = {}, options = {}) {
  return getStaticLanguageGraphCandidatesV5_31(profile, options);
}

export function getNextWordRouteDebugV5_30(profile = {}, options = {}) {
  return getLanguageGraphRouteDebugV5_31(profile, options);
}

export async function getNextWordAssumptionSliceV5_30Async(profile = {}, options = {}) {
  return getLanguageGraphPredictionSliceV5_31Async(profile, options);
}

export function getStaticNextWordCandidatesV5_31(profile = {}, options = {}) {
  return getStaticLanguageGraphCandidatesV5_31(profile, options);
}

export function getNextWordRouteDebugV5_31(profile = {}, options = {}) {
  return getLanguageGraphRouteDebugV5_31(profile, options);
}

export async function getNextWordAssumptionSliceV5_31Async(profile = {}, options = {}) {
  return getLanguageGraphPredictionSliceV5_31Async(profile, options);
}

export default {
  NEXT_WORD_ASSUMPTION_VERSION,
  NEXT_WORD_DATA_OVERLAY_V5_30,
  NEXT_WORD_DATA_OVERLAY_V5_31,
  NEXT_WORD_ROUTES_V5_30,
  NEXT_WORD_ROUTES_V5_31,
  getStaticNextWordCandidatesV5_30,
  getNextWordRouteDebugV5_30,
  getNextWordAssumptionSliceV5_30Async,
  getStaticNextWordCandidatesV5_31,
  getNextWordRouteDebugV5_31,
  getNextWordAssumptionSliceV5_31Async
};
