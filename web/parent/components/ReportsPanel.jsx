import React, { useMemo, useState } from "react";
import { buildProgressReport, buildIEPProgressText, buildCaregiverSummary } from "../../../engine/reports/progressReportEngine.js";
import { downloadTextFile, exportProgressJSON, exportProgressText } from "../../../engine/reports/reportExportEngine.js";

export default function ReportsPanel({ profile }) {
  const [view, setView] = useState("caregiver");
  const report = useMemo(() => buildProgressReport(profile), [profile]);
  const caregiver = useMemo(() => buildCaregiverSummary(profile), [profile]);
  const iep = useMemo(() => buildIEPProgressText(profile), [profile]);
  const progress = useMemo(() => exportProgressText(profile), [profile]);

  const text = view === "iep" ? iep : view === "progress" ? progress : caregiver;

  function copy() {
    navigator.clipboard?.writeText(text);
  }

  return (
    <section className="parentPanelV4 reportsPanel">
      <div className="panelTitleRow">
        <div>
          <h2>Progress Reports</h2>
          <p className="muted">Caregiver, IEP, and professional summaries generated locally.</p>
        </div>
        <button onClick={() => downloadTextFile("talkfreeaac-progress-report.json", exportProgressJSON(profile), "application/json")}>
          Export JSON
        </button>
      </div>

      <div className="miniMetricGrid">
        <span><b>{report.metrics.communications}</b> Events</span>
        <span><b>{report.metrics.uniqueWords}</b> Words</span>
        <span><b>{report.metrics.totalPhrases}</b> Phrases</span>
        <span><b>{report.metrics.completeSentenceRate}%</b> Sentences</span>
      </div>

      <nav className="reportTabs">
        <button className={view === "caregiver" ? "active" : ""} onClick={() => setView("caregiver")}>Caregiver</button>
        <button className={view === "iep" ? "active" : ""} onClick={() => setView("iep")}>IEP</button>
        <button className={view === "progress" ? "active" : ""} onClick={() => setView("progress")}>Progress</button>
      </nav>

      <textarea className="reportText" readOnly value={text} />

      <div className="reportActions">
        <button onClick={copy}>Copy</button>
        <button onClick={() => downloadTextFile(`talkfreeaac-${view}-report.txt`, text)}>Download TXT</button>
      </div>
    </section>
  );
}
