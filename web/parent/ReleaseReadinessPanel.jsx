import React from "react";
import { APP_VERSION } from "../app/version.js";
import { exportPrivacySummary } from "../../engine/security/privacyGuard.js";

export default function ReleaseReadinessPanel({ profile }) {
  const privacy = exportPrivacySummary(profile);

  return (
    <div className="panel">
      <h2>Release Readiness</h2>
      <p>{APP_VERSION.name} v{APP_VERSION.version}</p>

      <ul>
        <li>Local-first: {privacy.localFirst ? "yes" : "no"}</li>
        <li>Emergency profile: {privacy.hasEmergencyProfile ? "yes" : "no"}</li>
        <li>Medical data present: {privacy.hasMedicalData ? "yes" : "no"}</li>
        <li>Team workspace data: {privacy.hasTeamWorkspace ? "yes" : "no"}</li>
        <li>Communication history: {privacy.hasCommunicationHistory ? "yes" : "no"}</li>
      </ul>

      <p>Before public release: add final icon, screenshots, Android wrapper, and published privacy policy URL.</p>
    </div>
  );
}
