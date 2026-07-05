import React from "react";

export default function PredictionBadge({ type = "AI" }) {
  return <span className="predictionBadge">{type}</span>;
}
