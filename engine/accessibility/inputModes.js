export const INPUT_MODES = {
  TOUCH: "touch",
  KEYBOARD: "keyboard",
  SWITCH: "switch",
  EYE_TRACKING: "eye_tracking",
  SCANNING: "scanning"
};

export function updateInputMode(profile, mode) {
  return {
    ...profile,
    inputSettings: {
      ...(profile.inputSettings || {}),
      activeInput: mode
    }
  };
}

export function toggleEyeTracking(profile, enabled) {
  return {
    ...profile,
    inputSettings: {
      ...(profile.inputSettings || {}),
      eyeTrackingEnabled: enabled,
      activeInput: enabled ? INPUT_MODES.EYE_TRACKING : (profile.inputSettings?.activeInput || INPUT_MODES.TOUCH)
    }
  };
}

export function updateDwellMs(profile, dwellMs) {
  return {
    ...profile,
    inputSettings: {
      ...(profile.inputSettings || {}),
      eyeTrackingDwellMs: Number(dwellMs) || 900
    }
  };
}
