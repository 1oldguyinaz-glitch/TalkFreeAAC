import { buildProgressReport, buildIEPProgressText, buildCaregiverSummary } from "./progressReportEngine.js";

export function exportProgressJSON(profile = {}) {
  return JSON.stringify(buildProgressReport(profile), null, 2);
}

export function exportProgressText(profile = {}) {
  const report = buildProgressReport(profile);

  return [
    report.title,
    `Created: ${report.createdAt}`,
    "",
    report.narrative,
    "",
    "Metrics:",
    ...Object.entries(report.metrics).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "Strengths:",
    ...report.strengths.map(item => `- ${item}`),
    "",
    "Next Steps:",
    ...report.nextSteps.map(item => `- ${item}`)
  ].join("\n");
}

export function exportIEPText(profile = {}) {
  return buildIEPProgressText(profile);
}

export function exportCaregiverText(profile = {}) {
  return buildCaregiverSummary(profile);
}

export function downloadTextFile(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
