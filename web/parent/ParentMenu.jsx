import React, { useState } from "react";
import { buildInsightSummary } from "../../engine/insights/insightEngine.js";
import { addTeamNote, getTeamNotes } from "../../engine/team/teamWorkspace.js";
import { getTimeline } from "../../engine/timeline/timelineEngine.js";

export default function ParentMenu({ profile, setProfile, onBack }) {
  const [note, setNote] = useState({ role: "teacher", ate: "", didWell: "", struggledWith: "", workedOn: "", comments: "" });
  const s = buildInsightSummary(profile);
  const u = profile.userProfile || {};
  const notes = getTeamNotes(profile, 5);
  const timeline = getTimeline(profile, 10);

  function saveNote() {
    setProfile(addTeamNote(profile, note));
    setNote({ role: "teacher", ate: "", didWell: "", struggledWith: "", workedOn: "", comments: "" });
  }

  return (
    <div>
      <div className="top">
        <div><div className="brand">🔒 Parent Menu</div><div>Profile • Insights • Timeline • Team Workspace</div></div>
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

      <div className="panel">
        <h2>Team Workspace Notes</h2>
        <select className="search" value={note.role} onChange={e => setNote({ ...note, role: e.target.value })}>
          <option>teacher</option><option>therapist</option><option>parent</option><option>caregiver</option>
        </select>
        <input className="search" placeholder="Today I ate..." value={note.ate} onChange={e => setNote({ ...note, ate: e.target.value })} />
        <input className="search" placeholder="Today I did well at..." value={note.didWell} onChange={e => setNote({ ...note, didWell: e.target.value })} />
        <input className="search" placeholder="Today I struggled with..." value={note.struggledWith} onChange={e => setNote({ ...note, struggledWith: e.target.value })} />
        <input className="search" placeholder="Today we worked on..." value={note.workedOn} onChange={e => setNote({ ...note, workedOn: e.target.value })} />
        <textarea className="search" placeholder="Comments" value={note.comments} onChange={e => setNote({ ...note, comments: e.target.value })} />
        <button className="control" onClick={saveNote}>Save Team Note</button>
        <h3>Latest Notes</h3>
        <ul>{notes.map((n, i) => <li key={i}>{n.role}: ate {n.ate || "—"}; did well {n.didWell || "—"}; struggled {n.struggledWith || "—"}; worked on {n.workedOn || "—"}</li>)}</ul>
      </div>
    </div>
  );
}
