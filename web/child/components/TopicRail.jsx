import React from "react";

function labelFor(topic) {
  if (topic === "Food & Drinks") return "Food";
  if (topic === "School Curriculum") return "School";
  if (topic === "Health & Body") return "Health";
  return topic;
}

export default function TopicRail({ topics = [], onContext }) {
  return (
    <aside className="topicRailV4" aria-label="Topics">
      <div className="topicRailSpacer" />
      {topics.map(topic => (
        <button key={topic} className="topicBubbleV4" onClick={() => onContext(topic)}>
          {labelFor(topic)}
        </button>
      ))}
    </aside>
  );
}
