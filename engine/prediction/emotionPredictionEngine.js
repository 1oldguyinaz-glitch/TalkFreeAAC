export function getEmotionPredictions(profile = {}, sentence = []) {
  const phrase = sentence.join(" ").toLowerCase();
  const candidates = [];

  if (/i am$|i feel$/.test(phrase)) {
    candidates.push(
      { word: "happy", reasons: { emotion: true, grammar: true }, score: 280 },
      { word: "sad", reasons: { emotion: true, grammar: true }, score: 280 },
      { word: "mad", reasons: { emotion: true, grammar: true }, score: 260 },
      { word: "scared", reasons: { emotion: true, grammar: true }, score: 260 },
      { word: "tired", reasons: { emotion: true, grammar: true }, score: 245 },
      { word: "excited", reasons: { emotion: true, grammar: true }, score: 235 },
      { word: "frustrated", reasons: { emotion: true, grammar: true }, score: 235 }
    );
  }

  if (/sad|mad|scared|frustrated|hurt|sick|tired/.test(phrase)) {
    candidates.push(
      { word: "because", reasons: { emotion: true, grammar: true }, score: 330 },
      { word: "Can I have a hug", reasons: { emotion: true, relationship: true }, score: 320 },
      { word: "I need help", reasons: { emotion: true, safety: true }, score: 320 },
      { word: "I need a break", reasons: { emotion: true }, score: 300 },
      { word: "It hurts", reasons: { emotion: true, safety: true }, score: 300 },
      { word: "I don't understand", reasons: { emotion: true }, score: 260 }
    );
  }

  if (/happy|excited|proud/.test(phrase)) {
    candidates.push(
      { word: "because", reasons: { emotion: true, grammar: true }, score: 260 },
      { word: "I love you", reasons: { relationship: true }, score: 250 },
      { word: "That's funny", reasons: { emotion: true, conversation: true }, score: 240 },
      { word: "Again", reasons: { emotion: true }, score: 220 }
    );
  }

  return candidates;
}
