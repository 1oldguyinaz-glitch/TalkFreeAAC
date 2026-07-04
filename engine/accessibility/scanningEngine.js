export function nextScanIndex(currentIndex, total) {
  if (!total) return 0;
  return (currentIndex + 1) % total;
}

export function previousScanIndex(currentIndex, total) {
  if (!total) return 0;
  return (currentIndex - 1 + total) % total;
}

export function selectScannedWord(words = [], index = 0) {
  return words[index] || null;
}

export function scanGroups(words = [], groupSize = 5) {
  const groups = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize));
  }
  return groups;
}
