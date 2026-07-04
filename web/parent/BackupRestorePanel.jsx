import React, { useRef, useState } from "react";
import { downloadProfileBackup, importProfileBackup } from "../../engine/storage/localExportEngine.js";
import { exportVocabulary, importVocabulary } from "../../engine/storage/vocabularyExportEngine.js";
import { exportTeamWorkspace, importTeamWorkspace } from "../../engine/storage/teamExportEngine.js";
import { storageHealth } from "../../engine/storage/storageHealth.js";

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BackupRestorePanel({ profile, setProfile }) {
  const [status, setStatus] = useState("");
  const inputRef = useRef(null);
  const health = storageHealth(profile);

  async function handleImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      let next = profile;

      if (payload.exportType === "profile_backup") next = importProfileBackup(payload);
      else if (payload.exportType === "vocabulary_backup") next = importVocabulary(profile, payload);
      else if (payload.exportType === "team_workspace_backup") next = importTeamWorkspace(profile, payload);
      else throw new Error("Unknown TalkFreeAAC backup type.");

      setProfile(next);
      setStatus("Import successful.");
    } catch (error) {
      setStatus(error.message || "Import failed.");
    }
  }

  return (
    <div className="panel">
      <h2>Backup / Restore</h2>
      <p>Local export only. No cloud required.</p>

      <div className="metrics">
        <div className="metric"><strong>Size MB</strong><span>{health.mb}</span></div>
        <div className="metric"><strong>Sentences</strong><span>{health.sentenceCount}</span></div>
        <div className="metric"><strong>Timeline</strong><span>{health.timelineCount}</span></div>
        <div className="metric"><strong>Words</strong><span>{health.wordCount}</span></div>
      </div>

      {health.warning ? <p><strong>{health.warning}</strong></p> : null}

      <button className="control" onClick={() => downloadProfileBackup(profile)}>Export Full Profile</button>
      <button className="control" onClick={() => downloadJson(exportVocabulary(profile), "talkfreeaac-vocabulary-backup.json")}>Export Vocabulary</button>
      <button className="control" onClick={() => downloadJson(exportTeamWorkspace(profile), "talkfreeaac-team-workspace-backup.json")}>Export Team Workspace</button>

      <input ref={inputRef} type="file" accept="application/json" onChange={handleImport} className="search" />
      <p>{status}</p>
    </div>
  );
}
