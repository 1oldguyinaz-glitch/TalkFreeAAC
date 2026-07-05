export function getSafetyPredictions(profile = {}, sentence = []) {
  const phrase = sentence.join(" ").toLowerCase();
  const activeContext = String(profile.activeContext || "").toLowerCase();
  const candidates = [];

  const safetyContext = /doctor|safety|emergency|hurt|pain|sick|scared|lost|medicine/.test(`${activeContext} ${phrase}`);

  if (safetyContext) {
    candidates.push(
      { word: "Help me", reasons: { safety: true }, score: 440 },
      { word: "I am hurt", reasons: { safety: true, emotion: true }, score: 410 },
      { word: "I am scared", reasons: { safety: true, emotion: true }, score: 390 },
      { word: "Stop", reasons: { safety: true }, score: 380 },
      { word: "Call mom", reasons: { safety: true, relationship: true }, score: 360 },
      { word: "Call dad", reasons: { safety: true, relationship: true }, score: 360 },
      { word: "I need a break", reasons: { safety: true, emotion: true }, score: 330 },
      { word: "It hurts here", reasons: { safety: true }, score: 330 }
    );
  }

  if (/stop|dont|don't|no/.test(phrase)) {
    candidates.push(
      { word: "Don't touch me", reasons: { safety: true }, score: 410 },
      { word: "I need space", reasons: { safety: true }, score: 350 },
      { word: "Help me", reasons: { safety: true }, score: 350 }
    );
  }

  return candidates;
}
