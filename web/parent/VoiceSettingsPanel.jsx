import React, { useMemo } from "react";
import {
  VOICE_CADENCE_PRESETS,
  VOICE_PROFILES,
  buildVoiceRuntimeSettings,
  normalizeVoiceSettings,
  updateVoiceSettings
} from "../../engine/voice/voiceSettings.js";
import { speak } from "../shared/speech.js";

const PREVIEW_TEXT = "I am hungry. I need help with this.";

export default function VoiceSettingsPanel({ profile, setProfile }) {
  const settings = normalizeVoiceSettings(profile);
  const runtime = useMemo(() => buildVoiceRuntimeSettings(profile), [profile]);

  function save(patch) {
    setProfile(updateVoiceSettings(profile, patch));
  }

  return (
    <article className="parentPanelV4 voiceSettingsPanel">
      <div className="voiceSettingsHeader">
        <div>
          <h2>Voice Cadence</h2>
          <p className="muted">Performance-first voice setup. The board only speaks each word on tap when that accessibility option is enabled.</p>
        </div>
        <button type="button" onClick={() => speak(PREVIEW_TEXT, profile)}>🔊 Preview</button>
      </div>

      <div className="voiceSettingsGrid compactVoiceSettingsGrid">
        <form className="parentForm voiceSettingsForm" onSubmit={event => event.preventDefault()}>
          <label>
            Voice Type
            <select value={settings.voiceProfile} onChange={event => save({ voiceProfile: event.target.value, speechRate: null, speechPitch: null })}>
              {Object.entries(VOICE_PROFILES).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </label>

          <label>
            Cadence
            <select value={settings.cadencePreset} onChange={event => save({ cadencePreset: event.target.value, speechRate: null, speechPitch: null })}>
              {Object.entries(VOICE_CADENCE_PRESETS).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </label>

          <label className="voiceToggleRow">
            <input
              type="checkbox"
              checked={settings.speakEachWordOnTap === true}
              onChange={event => save({ speakEachWordOnTap: event.target.checked })}
            />
            <span>
              Speak each word on tap
              <small>Off by default for faster bucket navigation. Use Speak to say the full sentence.</small>
            </span>
          </label>
        </form>

        <div className="voiceTuningPanel compactVoiceReadout">
          <div className="voiceReadoutGrid">
            <span><b>{runtime.profileLabel}</b> voice</span>
            <span><b>{runtime.cadenceLabel}</b> cadence</span>
            <span><b>{runtime.speakEachWordOnTap ? "On" : "Off"}</b> word tap speech</span>
          </div>

          <p className="muted">Current output: rate {runtime.rate.toFixed(2)} • pitch {runtime.pitch.toFixed(2)} • volume {runtime.volume.toFixed(2)}</p>

          <div className="voiceButtonRow">
            <button type="button" onClick={() => save({ speechRate: null, speechPitch: null })}>Reset tuning</button>
            <button type="button" onClick={() => speak(PREVIEW_TEXT, profile)}>Preview voice</button>
          </div>
        </div>
      </div>
    </article>
  );
}
