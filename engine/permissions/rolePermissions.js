export const ROLES = {
  CHILD: "child",
  PARENT: "parent",
  TEACHER: "teacher",
  THERAPIST: "therapist",
  CAREGIVER: "caregiver"
};

export const PERMISSIONS = {
  COMMUNICATE: "communicate",
  VIEW_ASSIGNED_GOALS: "view_assigned_goals",
  ADD_TEAM_NOTE: "add_team_note",
  RECOMMEND_VOCABULARY: "recommend_vocabulary",
  VIEW_INSIGHTS: "view_insights",
  MANAGE_VOCABULARY: "manage_vocabulary",
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_TEAM: "manage_team"
};

const ROLE_PERMISSIONS = {
  child: [PERMISSIONS.COMMUNICATE],
  teacher: [PERMISSIONS.ADD_TEAM_NOTE, PERMISSIONS.VIEW_ASSIGNED_GOALS, PERMISSIONS.RECOMMEND_VOCABULARY],
  therapist: [PERMISSIONS.ADD_TEAM_NOTE, PERMISSIONS.VIEW_ASSIGNED_GOALS, PERMISSIONS.RECOMMEND_VOCABULARY, PERMISSIONS.VIEW_INSIGHTS],
  caregiver: [PERMISSIONS.ADD_TEAM_NOTE, PERMISSIONS.VIEW_ASSIGNED_GOALS],
  parent: Object.values(PERMISSIONS)
};

export function can(role, permission) {
  return (ROLE_PERMISSIONS[role] || []).includes(permission);
}

export function getPermissions(role) {
  return ROLE_PERMISSIONS[role] || [];
}
