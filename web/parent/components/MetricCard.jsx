import React from "react";

export default function MetricCard({ label, value, hint }) {
  return (
    <article className="parentMetricCard">
      <span>{value}</span>
      <strong>{label}</strong>
      {hint ? <small>{hint}</small> : null}
    </article>
  );
}
