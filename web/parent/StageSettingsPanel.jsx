import React from "react";
import {
  AGE_BANDS,
  BOARD_DENSITIES,
  COMMUNICATION_STAGES,
  getStageBoardLimits,
  normalizeStageSettings,
  updateStageSettings
} from "../../engine/display/stageSettings.js";

function settingRow(label, value) {
  return (
    <div className="stageSettingsReadout" key={label}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function StageSettingsPanel({ profile, setProfile }) {
  const settings = normalizeStageSettings(profile);
  const limits = getStageBoardLimits(profile);

  function save(patch) {
    setProfile(updateStageSettings(profile, patch));
  }

  function toggle(key) {
    save({ [key]: !settings[key] });
  }

  return (
    <article className="parentPanelV4 stageSettingsPanel">
      <div className="stageSettingsHeader">
        <div>
          <h2>Board Staging</h2>
          <p className="muted">Controls what the child board shows. The large language database stays hidden and bucketed.</p>
        </div>
        <div className="stageSettingsPill">{limits.stageLabel}</div>
      </div>

      <div className="stageSettingsGrid">
        <form className="parentForm stageSettingsForm" onSubmit={event => event.preventDefault()}>
          <label>
            Communication Stage
            <select
              value={settings.communicationStage}
              onChange={event => save({ communicationStage: Number(event.target.value) })}
            >
              {Object.entries(COMMUNICATION_STAGES).map(([stage, config]) => (
                <option key={stage} value={stage}>{config.label}</option>
              ))}
            </select>
          </label>

          <label>
            Age Band
            <select
              value={settings.ageBand}
              onChange={event => save({ ageBand: event.target.value })}
            >
              {Object.entries(AGE_BANDS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label>
            Board Density
            <select
              value={settings.boardDensity}
              onChange={event => save({ boardDensity: event.target.value })}
            >
              {Object.entries(BOARD_DENSITIES).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </label>
        </form>

        <div className="stageSettingsReadoutGrid">
          {settingRow("Core buttons", limits.coreLimit)}
          {settingRow("Active slice", limits.activeLimit)}
          {settingRow("Max visible", limits.totalVisibleLimit)}
          {settingRow("Tone", limits.ageBandLabel)}
        </div>
      </div>

      <div className="stageToggleGrid">
        <button className={settings.expandedVocabularyEnabled ? "enabled" : ""} onClick={() => toggle("expandedVocabularyEnabled")}>
          Expanded vocab {settings.expandedVocabularyEnabled ? "ON" : "OFF"}
        </button>
        <button className={settings.keyboardEnabled ? "enabled" : ""} onClick={() => toggle("keyboardEnabled")}>
          Keyboard {settings.keyboardEnabled ? "ON" : "OFF"}
        </button>
        <button className={settings.searchEnabled ? "enabled" : ""} onClick={() => toggle("searchEnabled")}>
          Search {settings.searchEnabled ? "ON" : "OFF"}
        </button>
        <button className={settings.schoolMode ? "enabled" : ""} onClick={() => toggle("schoolMode")}>
          School mode {settings.schoolMode ? "ON" : "OFF"}
        </button>
        <button className={settings.emergencyMode ? "enabled" : ""} onClick={() => toggle("emergencyMode")}>
          Emergency {settings.emergencyMode ? "ON" : "OFF"}
        </button>
        <button className={settings.showSensitiveVocabulary ? "enabled danger" : "danger"} onClick={() => toggle("showSensitiveVocabulary")}>
          Sensitive vocab {settings.showSensitiveVocabulary ? "ON" : "OFF"}
        </button>
      </div>
    </article>
  );
}
