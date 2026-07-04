import { KNOWLEDGE_OBJECTS } from "../genome/genome.js";

const RELATED = {
  juice: ["drink", "cup", "straw", "thirsty", "apple juice", "orange juice", "grape juice"],
  potty: ["bathroom", "toilet", "pee", "poop", "wipe", "flush"],
  hurt: ["pain", "doctor", "help", "bandage", "medicine"],
  school: ["teacher", "read", "write", "math", "worksheet", "homework"],
  outside: ["park", "playground", "swing", "slide", "ball", "run"],
  tired: ["sleepy", "rest", "bed", "break", "quiet"],
  food: ["eat", "hungry", "snack", "breakfast", "lunch", "dinner"]
};

export function semanticSearch(query, limit = 30) {
  const q = (query || "").toLowerCase().trim();
  if (!q) return [];
  const related = RELATED[q] || [];
  return Object.values(KNOWLEDGE_OBJECTS)
    .map(obj => {
      const name = obj.name.toLowerCase();
      const domain = (obj.domain || "").toLowerCase();
      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 70;
      if (name.includes(q)) score += 50;
      if (domain.includes(q)) score += 20;
      if (related.includes(name)) score += 60;
      if (related.some(r => name.includes(r))) score += 30;
      return { obj, score };
    })
    .filter(x => x.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.obj);
}
