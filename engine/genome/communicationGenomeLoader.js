import genome from "../../data/genome/talkfree_communication_genome_v4.json";

export const COMMUNICATION_GENOME = genome;
export const COMMUNICATION_ENTRIES = genome.entries || [];

export function getCommunicationEntries() {
  return COMMUNICATION_ENTRIES;
}

export function getEntriesByTopic(topic) {
  return COMMUNICATION_ENTRIES.filter(entry => entry.topic === topic);
}

export function getEntriesByPurpose(purpose) {
  return COMMUNICATION_ENTRIES.filter(entry => entry.purpose === purpose);
}

export function getEntryDisplay(entry) {
  return entry.display || entry.phrase || entry.word || "";
}

export function findCommunicationEntry(text) {
  const normalized = normalize(text);
  return COMMUNICATION_ENTRIES.find(entry => {
    const display = normalize(getEntryDisplay(entry));
    const aliases = (entry.aliases || []).map(normalize);
    return display === normalized || aliases.includes(normalized);
  });
}

export function normalize(value = "") {
  return String(value).toLowerCase().replace(/[^\w\s']/g, "").replace(/\s+/g, " ").trim();
}
