import { getCommunicationEntries } from "../genome/communicationGenomeLoader.js";
import { getWordObject, HUMAN_FIRST_PHRASES, SENTENCE_STARTERS, CORE_WORDS, CORE_TOPICS, normalizeText } from "../language/languageEngine.js";

function scoreSearchMatch(entry, query) {
  const q = normalizeText(query);
  if (!q) return 0;

  const fields = [
    entry.name,
    entry.word,
    entry.display,
    entry.display_text,
    entry.topic,
    entry.purpose,
    entry.communication_purpose,
    entry.grammar,
    entry.grammar_type,
    ...(entry.aliases || []),
    ...(entry.relatedWords || []),
    ...(entry.relatedPhrases || [])
  ].filter(Boolean).map(normalizeText);

  let score = 0;

  for (const field of fields) {
    if (field === q) score += 500;
    else if (field.startsWith(q)) score += 260;
    else if (field.includes(q)) score += 140;
  }

  if (entry.predictionWeight) score += Number(entry.predictionWeight) * 4;

  return score;
}

export function searchObjects(query = "", limit = 40) {
  const q = normalizeText(query);
  if (!q) return [];

  const genome = getCommunicationEntries().map(entry => ({
    ...entry,
    name: entry.display || entry.word || entry.name
  }));

  const staticItems = [
    ...HUMAN_FIRST_PHRASES,
    ...SENTENCE_STARTERS,
    ...CORE_WORDS,
    ...CORE_TOPICS
  ].map(word => getWordObject(word));

  const all = [...genome, ...staticItems];
  const seen = new Set();

  return all
    .map(entry => ({ ...entry, _score: scoreSearchMatch(entry, q) }))
    .filter(entry => entry._score > 0)
    .sort((a, b) => b._score - a._score)
    .filter(entry => {
      const key = normalizeText(entry.name || entry.display || entry.word);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit)
    .map(({ _score, ...entry }) => entry);
}

export function searchWords(query = "", limit = 40) {
  return searchObjects(query, limit).map(item => item.name || item.display || item.word);
}

export function searchPhrases(query = "", limit = 20) {
  return searchObjects(query, limit)
    .filter(item => String(item.name || item.display || item.word).includes(" "))
    .map(item => item.name || item.display || item.word);
}
