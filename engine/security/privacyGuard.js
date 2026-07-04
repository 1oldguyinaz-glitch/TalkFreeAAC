export function containsSensitiveMedicalData(profile) {
  const u = profile.userProfile || {};
  return Boolean(u.allergies || u.medicalNotes || u.emergencyDescription);
}

export function exportPrivacySummary(profile) {
  return {
    localFirst: true,
    hasEmergencyProfile: Boolean(profile.userProfile?.emergencyDescription),
    hasMedicalData: containsSensitiveMedicalData(profile),
    hasTeamWorkspace: (profile.teamMembers || []).length > 0 || (profile.teamNotes || []).length > 0,
    hasCommunicationHistory: (profile.sentenceHistory || []).length > 0 || (profile.timeline || []).length > 0
  };
}

export function requireParentApproval(action) {
  return {
    action,
    requiresParentApproval: true,
    reason: "This action may change vocabulary, export data, or affect privacy."
  };
}
