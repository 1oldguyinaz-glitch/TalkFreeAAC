const KEY = "talkfreeaac.profile.rebuild5";

export function defaultProfile() {
  return {
    selectedStage: "Stage 1: Emerging Communicator",
    activeContext: "Core Needs",
    sentence: [],
    wordCounts: {},
    phraseCounts: {},
    tapHistory: [],
    sentenceHistory: [],
    timeline: [],
    frictionLog: [],
    teamNotes: [],
    teamMembers: [],
    goals: [],
    vocabularyRecommendations: [],
    customVocabulary: {},
    favorites: [],
    recentWords: [],
    recentContexts: [],
    justCompletedSentence: false,
    lastCompletedSentence: "",
    displaySettings: { scheme: "talkfree_pop" },
    inputSettings: { activeInput: "touch", eyeTrackingEnabled: false, eyeTrackingDwellMs: 900 },
    userProfile: {
      name: "",
      photo: "",
      emergencyDescription: "I use AAC to communicate.",
      contacts: [],
      allergies: "",
      medicalNotes: ""
    }
  };
}

export function loadProfile() {
  try {
    return { ...defaultProfile(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return defaultProfile();
  }
}

export function saveProfile(profile) {
  localStorage.setItem(KEY, JSON.stringify({ ...profile, updatedAt: new Date().toISOString() }));
  return { ...profile };
}

export function resetProfile() {
  const p = defaultProfile();
  saveProfile(p);
  return p;
}
