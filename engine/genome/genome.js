import genome from "../../data/genome/talkfree_language_genome_v2_part2_rebuild.json";

export const GENOME = genome;
export const KNOWLEDGE_OBJECTS = genome.knowledge_objects || {};
export const TYPE_STYLES = genome.type_styles || {};
export const LANGUAGE_GRAPH = genome.language_graph || {};
export const STAGE_BOARDS = genome.stage_boards || {};
export const CONTEXT_BOARDS = genome.context_boards || {};

export function getDomains() {
  return Object.keys(genome.domains || {});
}

export function getObject(name) {
  return KNOWLEDGE_OBJECTS[name] || null;
}
