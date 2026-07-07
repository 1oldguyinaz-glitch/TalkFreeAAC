import {
  FIXED_CORE_LANGUAGE,
  HOME_BRANCH,
  TOPICS,
  TOPIC_TREE,
  FLAT_TOPIC_ATTRIBUTES
} from "../language/languageTree.js";

export const TYPED_VOCABULARY_STORAGE_KEY = "talkfreeaac.typedVocabulary.v1";
export const TYPED_VOCABULARY_EXPORT_VERSION = "1.0";

const MAX_RECENT_EVENTS = 500;

function nowIso() {
  return new Date().toISOString();
}

function safeStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

export function normalizeVocabularyLabel(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\p{L}\p{N}'&/ -]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function displayLabel(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function splitTypedWords(text = "") {
  const matches = String(text || "").match(/[\p{L}\p{N}']+/gu) || [];
  return matches
    .map(word => displayLabel(word))
    .filter(Boolean);
}

function walkTopicNode(node, labels) {
  if (!node) return;

  if (Array.isArray(node)) {
    node.forEach(item => labels.push(item));
    return;
  }

  if (typeof node === "object") {
    if (node.label) labels.push(node.label);
    if (Array.isArray(node.children)) node.children.forEach(item => labels.push(item));
    if (node.children && typeof node.children === "object" && !Array.isArray(node.children)) {
      Object.values(node.children).forEach(child => walkTopicNode(child, labels));
    }

    Object.values(node).forEach(value => {
      if (value && typeof value === "object" && value !== node.children) walkTopicNode(value, labels);
    });
  }
}

let builtInVocabularyCache = null;

export function getBuiltInVocabularySet() {
  if (builtInVocabularyCache) return builtInVocabularyCache;

  const labels = [
    ...FIXED_CORE_LANGUAGE,
    ...HOME_BRANCH,
    ...TOPICS
  ];

  Object.values(FLAT_TOPIC_ATTRIBUTES || {}).forEach(items => {
    if (Array.isArray(items)) labels.push(...items);
  });

  walkTopicNode(TOPIC_TREE, labels);

  builtInVocabularyCache = new Set(
    labels
      .map(normalizeVocabularyLabel)
      .filter(Boolean)
  );

  return builtInVocabularyCache;
}

function emptyTypedVocabularyData() {
  const timestamp = nowIso();

  return {
    version: TYPED_VOCABULARY_EXPORT_VERSION,
    createdAt: timestamp,
    updatedAt: timestamp,
    description: "Keyboard typed vocabulary tracker. This data does not modify languageTree.js.",
    totals: {
      events: 0,
      wordEvents: 0,
      phraseEvents: 0
    },
    words: {},
    phrases: {},
    recentEvents: []
  };
}

export function getTypedVocabularyData() {
  const storage = safeStorage();
  if (!storage) return emptyTypedVocabularyData();

  try {
    const raw = storage.getItem(TYPED_VOCABULARY_STORAGE_KEY);
    if (!raw) return emptyTypedVocabularyData();

    const parsed = JSON.parse(raw);
    return {
      ...emptyTypedVocabularyData(),
      ...parsed,
      totals: {
        ...emptyTypedVocabularyData().totals,
        ...(parsed.totals || {})
      },
      words: parsed.words || {},
      phrases: parsed.phrases || {},
      recentEvents: Array.isArray(parsed.recentEvents) ? parsed.recentEvents : []
    };
  } catch {
    return emptyTypedVocabularyData();
  }
}

function saveTypedVocabularyData(data) {
  const storage = safeStorage();
  const normalized = {
    ...emptyTypedVocabularyData(),
    ...data,
    updatedAt: nowIso()
  };

  if (storage) {
    storage.setItem(TYPED_VOCABULARY_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

function upsertCountRecord(collection, label, incrementBy, meta = {}) {
  const normalizedLabel = normalizeVocabularyLabel(label);
  if (!normalizedLabel) return null;

  const timestamp = nowIso();
  const current = collection[normalizedLabel] || {
    label: displayLabel(label),
    normalizedLabel,
    count: 0,
    firstTypedAt: timestamp,
    lastTypedAt: timestamp,
    source: "keyboard",
    alreadyInBuiltInTree: getBuiltInVocabularySet().has(normalizedLabel),
    alreadyCustomAdded: false,
    customVocabularyId: "",
    actions: {}
  };

  current.label = current.label || displayLabel(label);
  current.count += incrementBy;
  current.lastTypedAt = timestamp;
  current.source = meta.source || current.source || "keyboard";
  current.alreadyInBuiltInTree = getBuiltInVocabularySet().has(normalizedLabel);
  current.actions = {
    ...(current.actions || {}),
    [meta.action || "typed"]: ((current.actions || {})[meta.action || "typed"] || 0) + incrementBy
  };

  if (meta.profileId) current.lastProfileId = meta.profileId;
  if (meta.profileName) current.lastProfileName = meta.profileName;

  collection[normalizedLabel] = current;
  return current;
}

export function recordTypedVocabularyFromKeyboard(text = "", meta = {}) {
  const cleanText = displayLabel(text);
  if (!cleanText) return null;

  const data = getTypedVocabularyData();
  const words = splitTypedWords(cleanText);
  const wordRecords = words.map(word => upsertCountRecord(data.words, word, 1, {
    ...meta,
    source: meta.source || "keyboard"
  })).filter(Boolean);

  const primary = upsertCountRecord(data.phrases, cleanText, 1, {
    ...meta,
    source: meta.source || "keyboard"
  });

  const timestamp = nowIso();
  const event = {
    id: `typed_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    text: cleanText,
    normalizedText: normalizeVocabularyLabel(cleanText),
    words: words.map(word => normalizeVocabularyLabel(word)),
    action: meta.action || "typed",
    source: meta.source || "keyboard",
    profileId: meta.profileId || "",
    profileName: meta.profileName || "",
    alreadyInBuiltInTree: primary?.alreadyInBuiltInTree ?? false,
    createdAt: timestamp
  };

  data.totals.events += 1;
  data.totals.wordEvents += words.length;
  data.totals.phraseEvents += 1;
  data.recentEvents = [event, ...data.recentEvents].slice(0, MAX_RECENT_EVENTS);

  const savedData = saveTypedVocabularyData(data);

  return {
    event,
    primary,
    words: wordRecords,
    data: savedData
  };
}

export function markTypedVocabularyCustomAdded(text = "", meta = {}) {
  const cleanText = displayLabel(text);
  if (!cleanText) return getTypedVocabularyData();

  const data = getTypedVocabularyData();
  const labels = [cleanText, ...splitTypedWords(cleanText)];

  labels.forEach(label => {
    const normalizedLabel = normalizeVocabularyLabel(label);
    const wordRecord = data.words[normalizedLabel];
    const phraseRecord = data.phrases[normalizedLabel];

    [wordRecord, phraseRecord].filter(Boolean).forEach(record => {
      record.alreadyCustomAdded = true;
      record.customVocabularyId = meta.customVocabularyId || record.customVocabularyId || "";
      record.lastCustomAddedAt = nowIso();
      if (meta.profileId) record.lastProfileId = meta.profileId;
      if (meta.profileName) record.lastProfileName = meta.profileName;
    });
  });

  return saveTypedVocabularyData(data);
}

export function exportTypedVocabularyData() {
  return JSON.stringify(getTypedVocabularyData(), null, 2);
}

export function downloadTypedVocabularyExport(filename = "talkfreeaac-typed-vocabulary-export.json") {
  if (typeof document === "undefined") return exportTypedVocabularyData();

  const blob = new Blob([exportTypedVocabularyData()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  return true;
}

export function clearTypedVocabularyData() {
  const storage = safeStorage();
  if (storage) storage.removeItem(TYPED_VOCABULARY_STORAGE_KEY);
  return emptyTypedVocabularyData();
}

export default {
  TYPED_VOCABULARY_STORAGE_KEY,
  normalizeVocabularyLabel,
  getBuiltInVocabularySet,
  getTypedVocabularyData,
  recordTypedVocabularyFromKeyboard,
  markTypedVocabularyCustomAdded,
  exportTypedVocabularyData,
  downloadTypedVocabularyExport,
  clearTypedVocabularyData
};
