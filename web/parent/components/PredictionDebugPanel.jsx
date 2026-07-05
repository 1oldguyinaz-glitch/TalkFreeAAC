import React, { useMemo } from "react";
import { exportPredictionDebug, getPredictionDebugSnapshot } from "../../../engine/prediction/predictionDebugEngine.js";

export default function PredictionDebugPanel({ profile }) {
  const snapshot = useMemo(() => getPredictionDebugSnapshot(profile), [profile]);

  function downloadDebug() {
    const blob = new Blob([exportPredictionDebug(profile)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "talkfreeaac-prediction-debug.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="parentPanelV4 predictionDebugPanel">
      <div className="insightsHeader">
        <div>
          <strong className="premiumTag">Developer</strong>
          <h2>Prediction Debug</h2>
          <p className="muted">Use this when predictions look wrong during testing.</p>
        </div>
        <button onClick={downloadDebug}>Export Debug</button>
      </div>

      <div className="miniMetricGrid">
        <span><b>{snapshot.activeContext}</b> Context</span>
        <span><b>{snapshot.activeRoutine}</b> Routine</span>
        <span><b>{snapshot.predictions.length}</b> Predictions</span>
      </div>

      <div className="chipList">
        {snapshot.predictions.map(item => <span key={item}>{item}</span>)}
      </div>
    </section>
  );
}
