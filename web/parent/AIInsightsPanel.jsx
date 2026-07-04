import React from "react";
import { buildInsightSummary } from "../../engine/insights/insightEngine.js";
import { addApprovalItem } from "../../engine/recommendations/approvalQueue.js";

export default function AIInsightsPanel({ profile, setProfile }) {
  const s = buildInsightSummary(profile);

  function queueSuggestion(suggestion) {
    setProfile(addApprovalItem(profile, {
      type: "vocabulary",
      title: `Add ${suggestion.word}`,
      payload: suggestion,
      reason: suggestion.reason
    }));
  }

  return (
    <div className="panel">
      <h2>AI Vocabulary Growth</h2>
      <p>Local-only recommendations based on communication patterns. Parent approval required.</p>

      <h3>Suggested Vocabulary</h3>
      <ul>
        {s.vocabularyGrowthSuggestions.map(item => (
          <li key={item.word}>
            <strong>{item.word}</strong> — {item.reason}
            <button className="control" onClick={() => queueSuggestion(item)}>Queue</button>
          </li>
        ))}
      </ul>

      <h3>Dynamic Favorites</h3>
      <p>{s.dynamicFavorites.join(", ") || "No favorites yet."}</p>

      <h3>Growth Signals</h3>
      <ul>
        {Object.entries(s.growthSignals).map(([key, value]) => <li key={key}>{key}: {value ? "yes" : "no"}</li>)}
      </ul>

      <h3>Trend Summary</h3>
      <ul>
        <li>Active days: {s.trends.totalDays}</li>
        <li>Average sentences per active day: {s.trends.averageSentencesPerActiveDay}</li>
        <li>Unique words: {s.trends.uniqueWords}</li>
        <li>Pending approvals: {s.pendingApprovals}</li>
      </ul>
    </div>
  );
}
