import { normalizeVocabularyLabel } from "./typedVocabularyTracker.js";

export const CUSTOM_VOCABULARY_STORAGE_KEY = "talkfreeaac.customVocabulary.v1";
export const CUSTOM_VOCABULARY_EXPORT_VERSION = "1.0";

function nowIso() {
  return new Date().toISOString();
}

function safeStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

function cleanLabel(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function itemTypeFromLabel(label = "") {
  return cleanLabel(label).split(/\s+/).filter(Boolean).length > 1 ? "phrase" : "word";
}

function emptyCustomVocabularyData() {
  const timestamp = nowIso();

  return {
    version: CUSTOM_VOCABULARY_EXPORT_VERSION,
    createdAt: timestamp,
    updatedAt: timestamp,
    description: "User-saved custom vocabulary. This data does not modify languageTree.js.",
    items: []
  };
}

export function getCustomVocabularyData() {
  const storage = safeStorage();
  if (!storage) return emptyCustomVocabularyData();

  try {
    const raw = storage.getItem(CUSTOM_VOCABULARY_STORAGE_KEY);
    if (!raw) return emptyCustomVocabularyData();

    const parsed = JSON.parse(raw);
    return {
      ...emptyCustomVocabularyData(),
      ...parsed,
      items: Array.isArray(parsed.items) ? parsed.items : []
    };
  } catch {
    return emptyCustomVocabularyData();
  }
}

function saveCustomVocabularyData(data) {
  const storage = safeStorage();
  const normalized = {
    ...emptyCustomVocabularyData(),
    ...data,
    updatedAt: nowIso()
  };

  if (storage) {
    storage.setItem(CUSTOM_VOCABULARY_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export function getCustomVocabularyItems() {
  return getCustomVocabularyData().items.filter(item => item && item.active !== false);
}

export function saveCustomVocabularyItem(label = "", meta = {}) {
  const clean = cleanLabel(label);
  const normalizedLabel = normalizeVocabularyLabel(clean);

  if (!normalizedLabel) {
    return {
      item: null,
      data: getCustomVocabularyData(),
      created: false
    };
  }

  const data = getCustomVocabularyData();
  const timestamp = nowIso();
  const existingIndex = data.items.findIndex(item => item.normalizedLabel === normalizedLabel);

  if (existingIndex >= 0) {
    const existing = data.items[existingIndex];
    const updated = {
      ...existing,
      label: existing.label || clean,
      updatedAt: timestamp,
      lastSavedAt: timestamp,
      saveCount: (existing.saveCount || 1) + 1,
      active: true,
      source: meta.source || existing.source || "keyboard",
      profileId: meta.profileId || existing.profileId || "",
      profileName: meta.profileName || existing.profileName || "",
      topicPath: meta.topicPath || existing.topicPath || "custom/keyboard",
      alreadyInBuiltInTree: Boolean(meta.alreadyInBuiltInTree ?? existing.alreadyInBuiltInTree)
    };

    data.items[existingIndex] = updated;
    return {
      item: updated,
      data: saveCustomVocabularyData(data),
      created: false
    };
  }

  const item = {
    id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    label: clean,
    normalizedLabel,
    type: meta.type || itemTypeFromLabel(clean),
    category: meta.category || "custom",
    topicPath: meta.topicPath || "custom/keyboard",
    colorCategory: meta.colorCategory || "custom",
    symbolKey: meta.symbolKey || normalizedLabel,
    source: meta.source || "keyboard",
    profileId: meta.profileId || "",
    profileName: meta.profileName || "",
    usageCount: 0,
    saveCount: 1,
    alreadyInBuiltInTree: Boolean(meta.alreadyInBuiltInTree),
    createdAt: timestamp,
    updatedAt: timestamp,
    lastSavedAt: timestamp,
    active: true
  };

  data.items = [item, ...data.items];
  return {
    item,
    data: saveCustomVocabularyData(data),
    created: true
  };
}

export function recordCustomVocabularyUsage(label = "") {
  const normalizedLabel = normalizeVocabularyLabel(label);
  const data = getCustomVocabularyData();
  const index = data.items.findIndex(item => item.normalizedLabel === normalizedLabel);

  if (index < 0) return null;

  const item = {
    ...data.items[index],
    usageCount: (data.items[index].usageCount || 0) + 1,
    lastUsedAt: nowIso(),
    updatedAt: nowIso()
  };

  data.items[index] = item;
  return {
    item,
    data: saveCustomVocabularyData(data)
  };
}

export function removeCustomVocabularyItem(idOrLabel = "") {
  const normalized = normalizeVocabularyLabel(idOrLabel);
  const data = getCustomVocabularyData();

  data.items = data.items.map(item => {
    if (item.id === idOrLabel || item.normalizedLabel === normalized) {
      return {
        ...item,
        active: false,
        updatedAt: nowIso(),
        removedAt: nowIso()
      };
    }
    return item;
  });

  return saveCustomVocabularyData(data);
}

export function exportCustomVocabularyData() {
  return JSON.stringify(getCustomVocabularyData(), null, 2);
}

export function downloadCustomVocabularyExport(filename = "talkfreeaac-custom-vocabulary-export.json") {
  if (typeof document === "undefined") return exportCustomVocabularyData();

  const blob = new Blob([exportCustomVocabularyData()], { type: "application/json" });
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

export function clearCustomVocabularyItems() {
  const storage = safeStorage();
  if (storage) storage.removeItem(CUSTOM_VOCABULARY_STORAGE_KEY);
  return emptyCustomVocabularyData();
}

export default {
  CUSTOM_VOCABULARY_STORAGE_KEY,
  getCustomVocabularyData,
  getCustomVocabularyItems,
  saveCustomVocabularyItem,
  recordCustomVocabularyUsage,
  removeCustomVocabularyItem,
  exportCustomVocabularyData,
  downloadCustomVocabularyExport,
  clearCustomVocabularyItems
};
