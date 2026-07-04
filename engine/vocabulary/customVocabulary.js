export function addCustomWord(profile, wordObject) {
  const clean = {
    id: wordObject.id || wordObject.name.toLowerCase().replace(/\s+/g, "_"),
    name: wordObject.name,
    domain: wordObject.domain || "Custom",
    category: wordObject.category || "Custom",
    grammar_type: wordObject.grammar_type || "object",
    icon: wordObject.icon || "🔤",
    color: wordObject.color || "#00A6A6",
    createdAt: new Date().toISOString(),
    createdBy: wordObject.createdBy || "parent",
    approved: true
  };

  return {
    ...profile,
    customVocabulary: {
      ...(profile.customVocabulary || {}),
      [clean.name]: clean
    }
  };
}

export function removeCustomWord(profile, wordName) {
  const next = { ...(profile.customVocabulary || {}) };
  delete next[wordName];
  return { ...profile, customVocabulary: next };
}

export function getCustomVocabulary(profile) {
  return Object.values(profile.customVocabulary || {});
}
