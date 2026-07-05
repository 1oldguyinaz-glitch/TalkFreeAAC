import { KNOWLEDGE_OBJECTS, GENOME } from "../genome/genome.js";
import { getWordObject } from "../language/languageEngine.js";
import { getCommunicationEntries, getEntryDisplay, normalize } from "../genome/communicationGenomeLoader.js";
import { HUMAN_FIRST_PHRASES, LIFE_BOARDS } from "../language/communicationGenome.js";

function scoreCandidate(candidate, query) {
  const q = normalize(query);
  const name = normalize(candidate.name || candidate.phrase || candidate.word || candidate.display || "");
  const aliases = (candidate.aliases || []).map(normalize);
  const topic = normalize(candidate.topic || candidate.domain || candidate.category || "");
  const purpose = normalize(candidate.purpose || candidate.communication_purpose || "");

  let score = 0;
  if (name === q) score += 220;
  if (name.startsWith(q)) score += 150;
  if (name.includes(q)) score += 110;
  if (aliases.some(alias => alias === q)) score += 200;
  if (aliases.some(alias => alias.includes(q))) score += 140;
  if (topic.includes(q)) score += 60;
  if (purpose.includes(q)) score += 50;
  score += candidate.priority || candidate.predictionWeight || candidate.prediction_weight || 0;
  return score;
}

export function searchObjects(query, limit = 60) {
  const q = normalize(query);
  if (!q) return [];

  const candidates = [];

  getCommunicationEntries().forEach(entry => {
    candidates.push({
      ...entry,
      name: getEntryDisplay(entry),
      phrase: entry.phrase,
      aliases: entry.aliases,
      purpose: entry.purpose,
      priority: entry.predictionWeight,
      grammar_type: entry.grammar,
      icon: entry.icon,
      color: entry.color
    });
  });

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
      const key = item.name || item.phrase || item.display;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
