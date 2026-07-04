import { KNOWLEDGE_OBJECTS, GENOME } from "../genome/genome.js";
import { getWordObject } from "../language/languageEngine.js";
import { HUMAN_FIRST_PHRASES, LIFE_BOARDS, normalizeText } from "../language/communicationGenome.js";

function scoreCandidate(candidate, query) {
  const q = normalizeText(query);
  const name = normalizeText(candidate.name || candidate.phrase || candidate.word || "");
  const aliases = (candidate.aliases || []).map(normalizeText);
  const topic = normalizeText(candidate.topic || candidate.domain || candidate.category || "");
  const purpose = normalizeText(candidate.purpose || candidate.communication_purpose || "");

  let score = 0;
  if (name === q) score += 200;
  if (name.startsWith(q)) score += 140;
  if (name.includes(q)) score += 100;
  if (aliases.some(alias => alias === q)) score += 180;
  if (aliases.some(alias => alias.includes(q))) score += 120;
  if (topic.includes(q)) score += 55;
  if (purpose.includes(q)) score += 45;
  score += candidate.priority || candidate.prediction_weight || 0;

  return score;
}

export function searchObjects(query, limit = 60) {
  const q = normalizeText(query);
  if (!q) return [];

  const candidates = [];

  Object.keys(KNOWLEDGE_OBJECTS || {}).forEach(word => {
    const obj = getWordObject(word);
    candidates.push({ ...obj, name: obj.name || word });
  });

  Object.values(GENOME.domains || {}).flat().forEach(word => {
    const obj = getWordObject(word);
    candidates.push({ ...obj, name: obj.name || word });
  });

  HUMAN_FIRST_PHRASES.forEach(item => {
    candidates.push({
      name: item.phrase,
      phrase: item.phrase,
      aliases: item.aliases,
      purpose: item.purpose,
      priority: item.priority,
      grammar_type: "relationship",
      icon: item.phrase === "I love you" ? "❤️" : "💬",
      color: "#ef5da8"
    });
  });

  Object.entries(LIFE_BOARDS).forEach(([topic, words]) => {
    words.forEach(word => candidates.push({ ...getWordObject(word), name: word, topic }));
  });

  const seen = new Set();

  return candidates
    .map(candidate => ({ candidate, score: scoreCandidate(candidate, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.candidate)
    .filter(item => {
      const key = item.name || item.phrase;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
