import { getTopicWords } from "../navigation/navigationEngine.js";

export function getContextPredictions(profile = {}) {
  const activeContext = profile.activeContext || "Core Needs";
  const sentence = profile.sentence || [];
  const phrase = sentence.join(" ").toLowerCase();

  const topicWords = getTopicWords(activeContext).slice(0, 16).map(word => ({
    word,
    reasons: { context: true },
    score: 80
  }));

  const contextBoosts = [];

  if (/doctor|hurt|pain|sick|medicine/.test(activeContext.toLowerCase() + " " + phrase)) {
    contextBoosts.push(
      { word: "It hurts", reasons: { context: true, safety: true }, score: 260 },
      { word: "I am scared", reasons: { emotion: true, context: true }, score: 220 },
      { word: "Please stop", reasons: { safety: true }, score: 250 },
      { word: "I need help", reasons: { safety: true }, score: 260 }
    );
  }

  if (/school|class|teacher|math|reading/.test(activeContext.toLowerCase() + " " + phrase)) {
    contextBoosts.push(
      { word: "I have a question", reasons: { context: true }, score: 230 },
      { word: "I need help", reasons: { context: true }, score: 230 },
      { word: "I know the answer", reasons: { context: true }, score: 210 },
      { word: "I'm done", reasons: { context: true }, score: 180 }
    );
  }

  if (/bedtime|night|sleep/.test(activeContext.toLowerCase() + " " + phrase)) {
    contextBoosts.push(
      { word: "Good night", reasons: { routine: true, relationship: true }, score: 260 },
      { word: "I love you", reasons: { relationship: true }, score: 280 },
      { word: "Can I have a hug", reasons: { relationship: true }, score: 245 },
      { word: "I'm tired", reasons: { emotion: true }, score: 210 }
    );
  }

  if (/restaurant|food|drink/.test(activeContext.toLowerCase() + " " + phrase)) {
    contextBoosts.push(
      { word: "Water", reasons: { context: true }, score: 210 },
      { word: "More please", reasons: { context: true }, score: 190 },
      { word: "I'm full", reasons: { context: true }, score: 180 },
      { word: "Thank you", reasons: { relationship: true }, score: 220 }
    );
  }

  return [...contextBoosts, ...topicWords];
}
