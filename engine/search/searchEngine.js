import { KNOWLEDGE_OBJECTS, GENOME } from "../genome/genome.js";
import { getObjectForWord } from "../boards/languageTree.js";

export function searchObjects(query, limit = 60) {
  const q = String(query || "").toLowerCase().trim();
  if (!q) return [];

  const allWords = new Set([
    ...Object.keys(KNOWLEDGE_OBJECTS || {}),
    ...Object.values(GENOME.domains || {}).flat()
  ]);

  return [...allWords]
    .map(word => {
      const obj = getObjectForWord(word);
      const name = String(obj.name || word).toLowerCase();
      const domain = String(obj.domain || "").toLowerCase();
      const category = String(obj.category || "").toLowerCase();

      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 80;
      if (name.includes(q)) score += 60;
      if (domain.includes(q)) score += 30;
      if (category.includes(q)) score += 20;

      return { obj, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.obj);
}
