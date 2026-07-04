import { KNOWLEDGE_OBJECTS, LANGUAGE_GRAPH, STAGE_BOARDS, CONTEXT_BOARDS } from "../genome/genome.js";
import { getAACBoard, sortWordsForAAC } from "../boards/languageTree.js";

export function stageNumber(stage = "") {
  if (stage.startsWith("Stage 1")) return 1;
  if (stage.startsWith("Stage 2")) return 2;
  return 3;
}

export function currentPhrase(sentence = []) {
  return Array.isArray(sentence) ? sentence.join(" ").trim() : "";
}

export function isAllowed(word, stage) {
  const obj = KNOWLEDGE_OBJECTS[word];
  if (!obj) return true;
  return Number(obj.developmental_stage || 2) <= stageNumber(stage) || obj.grammar_type === "sentence" || obj.domain === "Topics" || obj.domain === "Core Needs";
}

export function getPredictions(profile) {
  const sentence = profile.sentence || [];
  const phrase = currentPhrase(sentence);
  const stage = profile.selectedStage || "Stage 1: Emerging Communicator";
  const activeContext = profile.activeContext || "Core Needs";
  const limit = stageNumber(stage) === 1 ? 24 : stageNumber(stage) === 2 ? 32 : 40;

  if (!phrase) return getAACBoard(profile, limit);

  const candidates = [];
  function add(word, score = 50) {
    if (!word || !isAllowed(word, stage)) return;
    candidates.push({ word, score });
  }

  Object.entries(LANGUAGE_GRAPH[phrase] || {}).forEach(([word, score]) => add(word, score + 100));
  const last = sentence[sentence.length - 1];
  Object.entries(LANGUAGE_GRAPH[last] || {}).forEach(([word, score]) => add(word, score + 50));

  const contextWords = CONTEXT_BOARDS[activeContext] || [];
  contextWords.forEach(word => add(word, 45));
  (STAGE_BOARDS[stage] || []).forEach(word => add(word, 35));
  (profile.recentWords || []).forEach((word, index) => add(word, 30 - index));
  (profile.favorites || []).forEach(word => add(word, 75));

  ["please", "more", "again", "all done", "help"].forEach((word, i) => add(word, 90 - i * 5));

  const best = [];
  const seen = new Set();
  const scored = candidates.map(item => ({
    ...item,
    score: item.score + ((profile.wordCounts || {})[item.word] || 0) * 4 + (contextWords.includes(item.word) ? 25 : 0)
  })).sort((a, b) => b.score - a.score);

  for (const item of scored) {
    if (seen.has(item.word)) continue;
    seen.add(item.word);
    best.push(item.word);
    if (best.length >= limit) break;
  }

  if (best.length < limit) {
    for (const word of getAACBoard(profile, limit)) {
      if (!seen.has(word)) {
        seen.add(word);
        best.push(word);
      }
      if (best.length >= limit) break;
    }
  }

  return sortWordsForAAC(best).slice(0, limit);
}
