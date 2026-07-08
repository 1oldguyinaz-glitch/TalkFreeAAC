import React, { useEffect, useMemo, useState } from "react";
import {
  VOICE_CADENCE_PRESETS,
  VOICE_PROFILES,
  buildVoiceRuntimeSettings,
  normalizeVoiceSettings,
  updateVoiceSettings
} from "../../engine/voice/voiceSettings.js";
import { getAvailableSpeechVoices, speak, warmSpeechVoices } from "../shared/speech.js";

const PREVIEW_TEXT = "I like this. I need help with that.";

function formatNumber(value) {
  return Number(value).toFixed(2);
}

export default function VoiceSettingsPanel({ profile, setProfile }) {
  const [availableVoices, setAvailableVoices] = useState([]);
  const settings = normalizeVoiceSettings(profile);
  const runtime = useMemo(() => buildVoiceRuntimeSettings(profile), [profile]);

  useEffect(() => {
    const refresh = () => {
      warmSpeechVoices();
      setAvailableVoices(getAvailableSpeechVoices());
    };

    refresh();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
      window.speechSynthesis.onvoiceschanged = refresh;
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
      }
    };
  }, []);

  function save(patch) {
    setProfile(updateVoiceSettings(profile, patch));
  }

  function clearManualRatePitch() {
    save({ speechRate: null, speechPitch: null });
  }

  function selectVoiceURI(value) {
    const voice = availableVoices.find(item => item.voiceURI === value);
    save({ voiceURI: value, voiceName: voice?.name || "" });
  }

  return (
    <article className="parentPanelV4 voiceSettingsPanel">
      <div className="voiceSettingsHeader">
        <div>
          <h2>Voice Cadence</h2>
          <p className="muted">Local device speech. Child voices are approximated with profile, pitch, and cadence because every phone/browser has different voices.</p>
        </div>
        <button type="button" onClick={() => speak(PREVIEW_TEXT, profile)}>🔊 Preview</button>
      </div>

      <div className="voiceSettingsGrid">
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

          <label>
            Device Voice
            <select value={settings.voiceURI} onChange={event => selectVoiceURI(event.target.value)}>
              <option value="">Auto-pick best local voice</option>
              {availableVoices.map(voice => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} {voice.lang ? `(${voice.lang})` : ""}{voice.default ? " • default" : ""}
                </option>
              ))}
            </select>
          </label>
        </form>

        <div className="voiceTuningPanel">
          <label>
            Rate <strong>{formatNumber(runtime.rate)}</strong>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.01"
              value={runtime.rate}
              onChange={event => save({ speechRate: Number(event.target.value) })}
            />
          </label>

          <label>
            Pitch <strong>{formatNumber(runtime.pitch)}</strong>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              value={runtime.pitch}
              onChange={event => save({ speechPitch: Number(event.target.value) })}
            />
          </label>

          <label>
            Volume <strong>{formatNumber(runtime.volume)}</strong>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={runtime.volume}
              onChange={event => save({ speechVolume: Number(event.target.value) })}
            />
          </label>

          <div className="voiceReadoutGrid">
            <span><b>{runtime.profileLabel}</b> profile</span>
            <span><b>{runtime.cadenceLabel}</b> cadence</span>
            <span><b>{availableVoices.length || 0}</b> local voices</span>
          </div>

          <div className="voiceButtonRow">
            <button type="button" onClick={clearManualRatePitch}>Reset tuning</button>
            <button type="button" onClick={() => speak(PREVIEW_TEXT, profile)}>Preview voice</button>
          </div>
        </div>
      </div>
    </article>
  );
}
