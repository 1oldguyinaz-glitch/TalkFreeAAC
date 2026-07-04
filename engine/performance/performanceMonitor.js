export function measure(name, fn) {
  const start = performance.now();
  const result = fn();
  const durationMs = Number((performance.now() - start).toFixed(2));
  return { name, durationMs, result };
}

export function profilePerformance(profile) {
  const json = JSON.stringify(profile || {});
  return {
    profileSizeChars: json.length,
    timelineCount: (profile.timeline || []).length,
    sentenceCount: (profile.sentenceHistory || []).length,
    wordCount: Object.keys(profile.wordCounts || {}).length
  };
}
