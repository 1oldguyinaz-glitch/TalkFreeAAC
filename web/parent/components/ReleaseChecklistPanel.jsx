import React, { useMemo } from "react";
import { TALKFREEAAC_RELEASE } from "../../app/releaseInfo.js";
import { getReleaseReadinessScore } from "../../../engine/quality/releaseChecklistEngine.js";
import { getStorageUsageEstimate } from "../../../engine/performance/storageHealthEngine.js";

export default function ReleaseChecklistPanel({ profile }) {
  const readiness = useMemo(() => getReleaseReadinessScore(profile), [profile]);
  const storage = useMemo(() => getStorageUsageEstimate(), [profile]);

  return (
    <section className="parentPanelV4 releasePanel">
      <div className="panelTitleRow">
        <div>
          <strong className="releaseTag">{TALKFREEAAC_RELEASE.name}</strong>
          <h2>Release Candidate Check</h2>
          <p className="muted">{TALKFREEAAC_RELEASE.corePromise}</p>
        </div>
        <strong className="releaseScore">{readiness.percent}%</strong>
      </div>

      <div className="miniMetricGrid">
        <span><b>{readiness.passed}/{readiness.total}</b> Checks</span>
        <span><b>{storage.estimatedKilobytes} KB</b> Local Data</span>
        <span><b>{storage.status}</b> Storage</span>
      </div>

      <div className="releaseChecklist">
        {readiness.checks.map(check => (
          <div className={`releaseCheck ${check.status}`} key={check.id}>
            <strong>{check.passed ? "✅" : "⚠️"} {check.label}</strong>
            <small>{check.description}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
