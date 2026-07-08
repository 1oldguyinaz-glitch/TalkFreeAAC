// TalkFreeAAC V7.0.1 — Performance-first local voice settings
// Keep voice setup simple and non-blocking. Board navigation must never wait on speech.

export const VOICE_PROFILE_VERSION = "7.0.1-performance-first-voice";

export const VOICE_PROFILES = {
  young_female: {
    label: "Young female",
    ageGroup: "young",
    gender: "female",
    description: "Higher, gentle young-child voice approximation.",
    pitch: 1.42,
    rate: 0.9,
    preferredTerms: ["female", "child", "girl", "samantha", "zira", "victoria"]
  },
  young_male: {
    label: "Young male",
    ageGroup: "young",
    gender: "male",
    description: "Clear young-boy voice approximation.",
    pitch: 1.2,
    rate: 0.9,
    preferredTerms: ["male", "child", "boy", "alex", "daniel"]
  },
  teen_female: {
    label: "Teen female",
    ageGroup: "teen",
    gender: "female",
    description: "Age-respectful teen female approximation.",
    pitch: 1.14,
    rate: 0.96,
    preferredTerms: ["female", "samantha", "zira", "victoria"]
  },
  teen_male: {
    label: "Teen male",
    ageGroup: "teen",
    gender: "male",
    description: "Age-respectful teen male approximation.",
    pitch: 0.98,
    rate: 0.96,
    preferredTerms: ["male", "alex", "daniel"]
  },
  adult_female: {
    label: "Adult female",
    ageGroup: "adult",
    gender: "female",
    description: "Adult female voice.",
    pitch: 1.0,
    rate: 0.98,
    preferredTerms: ["female", "samantha", "zira", "victoria"]
  },
  adult_male: {
    label: "Adult male",
    ageGroup: "adult",
    gender: "male",
    description: "Adult male voice.",
    pitch: 0.84,
    rate: 0.98,
    preferredTerms: ["male", "alex", "daniel"]
  }
};

export const VOICE_CADENCE_PRESETS = {
  slow_clear: {
    label: "Slow and clear",
    description: "Best default for early AAC and noisy rooms.",
    rateOffset: -0.12,
    pitchOffset: 0
  },
  natural: {
    label: "Natural",
    description: "Balanced everyday speech.",
    rateOffset: 0,
    pitchOffset: 0
  },
  quick: {
    label: "Quick",
    description: "Faster output for fluent users.",
    rateOffset: 0.08,
    pitchOffset: 0
  }
};

export const DEFAULT_VOICE_SETTINGS = {
  voiceProfile: "young_female",
  cadencePreset: "slow_clear",
  speakEachWordOnTap: false,
  speechRate: null,
  speechPitch: null,
  speechVolume: 1,
  voiceURI: "",
  voiceName: ""
};

const LEGACY_PROFILE_MAP = {
  child_neutral: "young_female",
  little_girl: "young_female",
  girl: "young_female",
  little_boy: "young_male",
  boy: "young_male",
  teen_girl: "teen_female",
  teen_boy: "teen_male",
  adult_female: "adult_female",
  adult_male: "adult_male"
};

const LEGACY_CADENCE_MAP = {
  gentle: "slow_clear",
  slow_clear: "slow_clear",
  natural: "natural",
  quick: "quick"
};

function clamp(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function sourceSettings(profile = {}) {
  return profile.settings?.voice || profile.voiceSettings || profile.speechSettings || {};
}

export function defaultVoiceProfileForAgeBand(ageBand = "") {
  if (ageBand === "teen") return "teen_female";
  if (ageBand === "adult" || ageBand === "aphasia_recovery") return "adult_female";
  return "young_female";
}

export function normalizeVoiceSettings(profile = {}) {
  const existing = sourceSettings(profile);
  const ageBand = profile.settings?.ageBand || profile.ageBand || profile.userProfile?.ageBand || "young_child";
  const defaultProfile = defaultVoiceProfileForAgeBand(ageBand);
  const mappedProfile = LEGACY_PROFILE_MAP[existing.voiceProfile] || existing.voiceProfile;
  const mappedCadence = LEGACY_CADENCE_MAP[existing.cadencePreset] || existing.cadencePreset;
  const voiceProfile = VOICE_PROFILES[mappedProfile] ? mappedProfile : defaultProfile;
  const cadencePreset = VOICE_CADENCE_PRESETS[mappedCadence] ? mappedCadence : DEFAULT_VOICE_SETTINGS.cadencePreset;

  return {
    ...DEFAULT_VOICE_SETTINGS,
    ...existing,
    voiceProfile,
    cadencePreset,
    speakEachWordOnTap: existing.speakEachWordOnTap === true,
    speechRate: existing.speechRate === null || existing.speechRate === undefined || existing.speechRate === ""
      ? null
      : clamp(existing.speechRate, 0.5, 1.5, null),
    speechPitch: existing.speechPitch === null || existing.speechPitch === undefined || existing.speechPitch === ""
      ? null
      : clamp(existing.speechPitch, 0.5, 2, null),
    speechVolume: clamp(existing.speechVolume, 0, 1, DEFAULT_VOICE_SETTINGS.speechVolume),
    voiceURI: String(existing.voiceURI || ""),
    voiceName: String(existing.voiceName || "")
  };
}

export function buildVoiceRuntimeSettings(profile = {}) {
  const settings = normalizeVoiceSettings(profile);
  const profileConfig = VOICE_PROFILES[settings.voiceProfile] || VOICE_PROFILES.young_female;
  const cadence = VOICE_CADENCE_PRESETS[settings.cadencePreset] || VOICE_CADENCE_PRESETS.slow_clear;

  return {
    ...settings,
    profileLabel: profileConfig.label,
    cadenceLabel: cadence.label,
    ageGroup: profileConfig.ageGroup,
    gender: profileConfig.gender,
    preferredTerms: profileConfig.preferredTerms || [],
    rate: clamp(
      settings.speechRate ?? (profileConfig.rate + cadence.rateOffset),
      0.5,
      1.5,
      0.9
    ),
    pitch: clamp(
      settings.speechPitch ?? (profileConfig.pitch + cadence.pitchOffset),
      0.5,
      2,
      1.2
    ),
    volume: clamp(settings.speechVolume, 0, 1, 1)
  };
}

export function shouldSpeakEachWordOnTap(profile = {}) {
  return normalizeVoiceSettings(profile).speakEachWordOnTap === true;
}

export function updateVoiceSettings(profile = {}, patch = {}) {
  const current = normalizeVoiceSettings(profile);
  const next = normalizeVoiceSettings({
    ...profile,
    settings: {
      ...(profile.settings || {}),
      voice: {
        ...current,
        ...patch
      }
    }
  });

  return {
    ...profile,
    voiceSettings: next,
    settings: {
      ...(profile.settings || {}),
      voice: next
    },
    userProfile: {
      ...(profile.userProfile || {}),
      voiceProfile: next.voiceProfile,
      cadencePreset: next.cadencePreset,
      speakEachWordOnTap: next.speakEachWordOnTap
    }
  };
}

export function describeVoiceSettings(profile = {}) {
  const runtime = buildVoiceRuntimeSettings(profile);
  const tapMode = runtime.speakEachWordOnTap ? "word tap speech on" : "Speak button only";
  return `${runtime.profileLabel} • ${runtime.cadenceLabel} • ${tapMode}`;
}
