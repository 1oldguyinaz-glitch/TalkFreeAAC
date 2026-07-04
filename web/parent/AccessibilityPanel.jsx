import React from "react";
import { INPUT_MODES, updateInputMode, toggleEyeTracking, updateDwellMs } from "../../engine/accessibility/inputModes.js";
import { updateDisplaySettings, DISPLAY_SCHEMES } from "../../engine/display/displaySettings.js";

export default function AccessibilityPanel({ profile, setProfile }) {
  const input = profile.inputSettings || {};
  const display = profile.displaySettings || {};

  return (
    <div className="panel">
      <h2>Accessibility Settings</h2>
      <p>These settings prepare TalkFreeAAC for eye tracking, switches, scanning, keyboard navigation, and visual accessibility.</p>

      <h3>Input Mode</h3>
      <select className="search" value={input.activeInput || "touch"} onChange={e => setProfile(updateInputMode(profile, e.target.value))}>
        <option value={INPUT_MODES.TOUCH}>Touch</option>
        <option value={INPUT_MODES.KEYBOARD}>Keyboard</option>
        <option value={INPUT_MODES.SWITCH}>Switch</option>
        <option value={INPUT_MODES.SCANNING}>Scanning</option>
        <option value={INPUT_MODES.EYE_TRACKING}>Eye Tracking</option>
      </select>

      <h3>Eye Tracking</h3>
      <label>
        <input
          type="checkbox"
          checked={!!input.eyeTrackingEnabled}
          onChange={e => setProfile(toggleEyeTracking(profile, e.target.checked))}
        />
        Enable eye-tracking mode
      </label>

      <input
        className="search"
        type="number"
        min="300"
        max="3000"
        step="100"
        value={input.eyeTrackingDwellMs || 900}
        onChange={e => setProfile(updateDwellMs(profile, e.target.value))}
        placeholder="Dwell time milliseconds"
      />

      <h3>Display Scheme</h3>
      <select className="search" value={display.scheme || "talkfree_pop"} onChange={e => setProfile(updateDisplaySettings(profile, { scheme: e.target.value }))}>
        {Object.entries(DISPLAY_SCHEMES).map(([key, scheme]) => <option key={key} value={key}>{scheme.name}</option>)}
      </select>

      <h3>Size Controls</h3>
      <input className="search" type="number" min="80" max="200" value={display.buttonScale || 100} onChange={e => setProfile(updateDisplaySettings(profile, { buttonScale: Number(e.target.value) }))} placeholder="Button scale %" />
      <input className="search" type="number" min="80" max="200" value={display.textScale || 100} onChange={e => setProfile(updateDisplaySettings(profile, { textScale: Number(e.target.value) }))} placeholder="Text scale %" />
    </div>
  );
}
