export function getRelationshipPredictions(profile = {}, sentence = []) {
  const phrase = sentence.join(" ").toLowerCase();
  const candidates = [];

  const familyNames = [
    ...(profile.family || []),
    ...(profile.userProfile?.family || [])
  ].map(person => typeof person === "string" ? person : person.name).filter(Boolean);

  if (!sentence.length) {
    candidates.push(
      { word: "I love you", reasons: { relationship: true }, score: 360 },
      { word: "Can I have a hug", reasons: { relationship: true }, score: 330 },
      { word: "Thank you", reasons: { relationship: true }, score: 300 },
      { word: "Good morning", reasons: { relationship: true }, score: 260 },
      { word: "Good night", reasons: { relationship: true }, score: 260 }
    );
  }

  if (/mom|dad|grandma|grandpa|family|teacher|friend/.test(phrase)) {
    candidates.push(
      { word: "I love you", reasons: { relationship: true }, score: 340 },
      { word: "Can I have a hug", reasons: { relationship: true }, score: 310 },
      { word: "Thank you", reasons: { relationship: true }, score: 270 },
      { word: "Come here", reasons: { relationship: true }, score: 220 },
      { word: "I miss you", reasons: { relationship: true }, score: 260 }
    );
  }

  if (/i love$/.test(phrase)) {
    candidates.push(
      { word: "you", reasons: { relationship: true, grammar: true }, score: 420 },
      { word: "mom", reasons: { relationship: true }, score: 310 },
      { word: "dad", reasons: { relationship: true }, score: 310 },
      { word: "my family", reasons: { relationship: true }, score: 280 }
    );
  }

  familyNames.forEach((name, index) => {
    candidates.push({
      word: name,
      reasons: { relationship: true, personalization: true },
      score: 260 - index * 8
    });
  });

  return candidates;
}
