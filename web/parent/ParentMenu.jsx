import React from "react";
import { buildInsightSummary } from "../../engine/insights/insightEngine.js";
import { getTimeline } from "../../engine/timeline/timelineEngine.js";
import TeamWorkspacePanel from "./TeamWorkspacePanel.jsx";
import AIInsightsPanel from "./AIInsightsPanel.jsx";
import BackupRestorePanel from "./BackupRestorePanel.jsx";
import AccessibilityPanel from "./AccessibilityPanel.jsx";
import ReleaseReadinessPanel from "./ReleaseReadinessPanel.jsx";

export default function ParentMenu({ profile, setProfile, onBack }) {
  const s = buildInsightSummary(profile);
  const u = profile.userProfile || {};
  const timeline = getTimeline(profile, 10);

  return (
    <div>
      <div className="top">
        <div><div className="brand">🔒 Parent Menu</div><div>Profile • Insights • AI • Backup • Accessibility • Release</div></div>
        <button className="lock" onClick={onBack}>AAC</button>
      </div>

      <div className="panel">
        <h2>Progress Dashboard</h2>
        <div className="metrics">
          <div className="metric"><strong>Taps</strong><span>{s.totalTaps}</span></div>
          <div className="metric"><strong>Sentences</strong><span>{s.completedSentences}</span></div>
          <div className="metric"><strong>Unique Words</strong><span>{s.progress.uniqueWords}</span></div>
          <div className="metric"><strong>Confidence</strong><span>{s.progress.communicationConfidenceScore}</span></div>
        </div>
      </div>

      <ReleaseReadinessPanel profile={profile} />
      <AIInsightsPanel profile={profile} setProfile={setProfile} />
      <BackupRestorePanel profile={profile} setProfile={setProfile} />
      <AccessibilityPanel profile={profile} setProfile={setProfile} />

      <div className="panel">
        <h2>Communication Timeline</h2>
        <ul>{timeline.map(e => <li key={e.id}><strong>{new Date(e.time).toLocaleString()}</strong>: {e.text} {e.tags?.length ? `(${e.tags.join(", ")})` : ""}</li>)}</ul>
      </div>

      <div className="panel">
        <h2>User Profile + Emergency</h2>
        <input className="search" placeholder="Preferred name" value={u.name || ""} onChange={e => setProfile({ ...profile, userProfile: { ...u, name: e.target.value } })} />
        <textarea className="search" placeholder="Emergency description" value={u.emergencyDescription || ""} onChange={e => setProfile({ ...profile, userProfile: { ...u, emergencyDescription: e.target.value } })} />
        <input className="search" placeholder="Allergies" value={u.allergies || ""} onChange={e => setProfile({ ...profile, userProfile: { ...u, allergies: e.target.value } })} />
        <input className="search" placeholder="Medical notes" value={u.medicalNotes || ""} onChange={e => setProfile({ ...profile, userProfile: { ...u, medicalNotes: e.target.value } })} />
      </div>

      <TeamWorkspacePanel profile={profile} setProfile={setProfile} />
    </div>
  );
}
