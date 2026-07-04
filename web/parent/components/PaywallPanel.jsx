import React from "react";

export default function PaywallPanel({ title = "Professional Insights", children }) {
  return (
    <section className="paywallPanel">
      <div>
        <strong>Premium</strong>
        <h3>{title}</h3>
        <p>{children || "Communication stays free. Professional insights, exports, and team collaboration can be upgraded later."}</p>
      </div>
      <button type="button">Upgrade Later</button>
    </section>
  );
}
