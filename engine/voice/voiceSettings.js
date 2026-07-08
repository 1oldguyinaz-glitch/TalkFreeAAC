// TalkFreeAAC V5.36 — Local voice profile and cadence settings
// Uses browser/device Web Speech voices when available. Child voices are approximated
// with local pitch/rate/cadence because Web Speech voice catalogs vary by device.

export const VOICE_PROFILE_VERSION = "5.36-voice-cadence";

export const VOICE_PROFILES = {
  child_neutral: {
    label: "Child neutral",
    description: "Higher, gentle child-like voice approximation.",
    pitch: 1.32,
    rate: 0.9,
    preferredTerms: ["child", "kid", "junior", "samantha", "zira", "google us english"]
  },
  little_girl: {
    label: "Little girl",
    description: "Higher pitch, softer cadence.",
    pitch: 1.55,
    rate: 0.88,
    preferredTerms: ["child", "girl", "female", "samantha", "zira", "victoria", "google uk english female"]
  },
  little_boy: {
    label: "Little boy",
    description: "Young voice approximation with clear, slower cadence.",
    pitch: 1.34,
    rate: 0.88,
    preferredTerms: ["child", "boy", "junior", "male", "daniel", "alex", "google us english"]
  },
  girl: {
    label: "Girl",
    description: "Clear child/young female voice approximation.",
    pitch: 1.35,
    rate: 0.92,
    preferredTerms: ["girl", "female", "samantha", "zira", "victoria", "google uk english female"]
  },
  boy: {
    label: "Boy",
    description: "Clear child/young male voice approximation.",
    pitch: 1.12,
    rate: 0.92,
    preferredTerms: ["boy", "male", "daniel", "alex", "google us english"]
  },
  teen_girl: {
    label: "Teen girl",
    description: "Less childlike, age-respectful higher voice.",
    pitch: 1.16,
    rate: 0.96,
    preferredTerms: ["female", "samantha", "zira", "victoria", "google uk english female"]
  },
  teen_boy: {
    label: "Teen boy",
    description: "Less childlike, age-respectful lower voice.",
    pitch: 0.98,
    rate: 0.96,
    preferredTerms: ["male", "daniel", "alex", "google us english"]
  },
  adult_female: {
    label: "Adult female",
    description: "Adult-respectful female voice.",
    pitch: 1.0,
    rate: 0.96,
    preferredTerms: ["female", "samantha", "zira", "victoria", "google uk english female"]
  },
  adult_male: {
    label: "Adult male",
    description: "Adult-respectful male voice.",
    pitch: 0.82,
    rate: 0.96,
    preferredTerms: ["male", "daniel", "alex", "google us english"]
  }
};

export const VOICE_CADENCE_PRESETS = {
  gentle: {
    label: "Gentle",
    description: "Softer and slightly slower.",
    rateOffset: -0.05,
    pitchOffset: 0.02
  },
  natural: {
    label: "Natural",
    description: "Balanced everyday speech.",
    rateOffset: 0,
    pitchOffset: 0
  },
  slow_clear: {
    label: "Slow + clear",
    description: "Best for early AAC, classrooms, and noisy rooms.",
    rateOffset: -0.14,
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
  voiceProfile: "child_neutral",
  cadencePreset: "gentle",
  speechRate: null,
  speechPitch: null,
  speechVolume: 1,
  voiceURI: "",
  voiceName: ""
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
  if (ageBand === "teen") return "teen_girl";
  if (ageBand === "adult" || ageBand === "aphasia_recovery") return "adult_female";
  return "child_neutral";
}

export function normalizeVoiceSettings(profile = {}) {
  const existing = sourceSettings(profile);
  const ageBand = profile.settings?.ageBand || profile.ageBand || profile.userProfile?.ageBand || "young_child";
  const defaultProfile = defaultVoiceProfileForAgeBand(ageBand);
  const voiceProfile = VOICE_PROFILES[existing.voiceProfile] ? existing.voiceProfile : defaultProfile;
  const cadencePreset = VOICE_CADENCE_PRESETS[existing.cadencePreset] ? existing.cadencePreset : DEFAULT_VOICE_SETTINGS.cadencePreset;

  return {
    ...DEFAULT_VOICE_SETTINGS,
    ...existing,
    voiceProfile,
    cadencePreset,
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
  const profileConfig = VOICE_PROFILES[settings.voiceProfile] || VOICE_PROFILES.child_neutral;
  const cadence = VOICE_CADENCE_PRESETS[settings.cadencePreset] || VOICE_CADENCE_PRESETS.gentle;

  return {
    ...settings,
    profileLabel: profileConfig.label,
    cadenceLabel: cadence.label,
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
      cadencePreset: next.cadencePreset
    }
  };
}

export function describeVoiceSettings(profile = {}) {
  const runtime = buildVoiceRuntimeSettings(profile);
  return `${runtime.profileLabel} • ${runtime.cadenceLabel} • rate ${runtime.rate.toFixed(2)} • pitch ${runtime.pitch.toFixed(2)}`;
}
