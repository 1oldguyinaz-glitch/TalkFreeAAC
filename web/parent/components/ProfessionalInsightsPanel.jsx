import React, { useMemo, useState } from "react";
import { generateInsightReport, generateIEPReadySummary, exportReportJSON } from "../../../engine/insights/professionalInsightsEngine.js";
import { buildClassroomSnapshot, buildSessionNoteTemplate } from "../../../engine/insights/classroomInsightsEngine.js";

export default function ProfessionalInsightsPanel({ profile }) {
  const [view, setView] = useState("summary");
  const report = useMemo(() => generateInsightReport(profile), [profile]);
  const iep = useMemo(() => generateIEPReadySummary(profile), [profile]);
  const classroom = useMemo(() => buildClassroomSnapshot(profile), [profile]);
  const session = useMemo(() => buildSessionNoteTemplate(profile), [profile]);

  function copyText(text) {
    navigator.clipboard?.writeText(text);
  }

  function downloadJSON() {
    const blob = new Blob([exportReportJSON(profile)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "talkfreeaac-insight-report.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="parentPanelV4 professionalInsights">
      <div className="insightsHeader">
        <div>
          <strong className="premiumTag">Professional</strong>
          <h2>Teacher / Therapist Insights</h2>
          <p className="muted">Optional professional layer. Core communication remains free.</p>
        </div>
        <button onClick={downloadJSON}>Export JSON</button>
      </div>

      <nav className="insightTabs">
        {["summary", "iep", "classroom", "session"].map(tab => (
          <button key={tab} className={view === tab ? "active" : ""} onClick={() => setView(tab)}>
            {tab}
          </button>
        ))}
      </nav>

      {view === "summary" && (
        <div className="insightContent">
          <div className="miniMetricGrid">
            <span><b>{report.summary.communicationEvents}</b> Events</span>
            <span><b>{report.summary.completeSentenceRate}%</b> Sentences</span>
            <span><b>{report.summary.feelingsExpressed}</b> Feelings</span>
            <span><b>{report.summary.questionsAsked}</b> Questions</span>
          </div>

          <h3>Recommendations</h3>
          <div className="stackList">
            {report.recommendations.map((item, index) => (
              <div key={index} className="stackItem">
                <strong>{item.area}</strong>
                <small>{item.recommendation}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "iep" && (
        <div className="insightContent">
          <textarea readOnly value={iep} />
          <button onClick={() => copyText(iep)}>Copy IEP Summary</button>
        </div>
      )}

      {view === "classroom" && (
        <div className="insightContent">
          <h3>{classroom.studentName} Classroom Snapshot</h3>
          <div className="stackList">
            {classroom.suggestedClassroomSupports.map(item => (
              <div key={item} className="stackItem"><small>{item}</small></div>
            ))}
          </div>
        </div>
      )}

      {view === "session" && (
        <div className="insightContent">
          <h3>{session.title}</h3>
          {Object.entries(session.fields).map(([key, value]) => (
            <label key={key} className="sessionField">
              <span>{key}</span>
              <input readOnly value={value} />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
