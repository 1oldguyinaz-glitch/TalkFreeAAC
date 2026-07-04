export function addApprovalItem(profile, item) {
  const clean = {
    id: "approval_" + Math.random().toString(36).slice(2) + Date.now().toString(36),
    type: item.type || "vocabulary",
    title: item.title || "",
    payload: item.payload || {},
    reason: item.reason || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };
  return { ...profile, approvalQueue: [...(profile.approvalQueue || []), clean] };
}

export function approveItem(profile, itemId) {
  return {
    ...profile,
    approvalQueue: (profile.approvalQueue || []).map(item =>
      item.id === itemId ? { ...item, status: "approved", approvedAt: new Date().toISOString() } : item
    )
  };
}

export function rejectItem(profile, itemId) {
  return {
    ...profile,
    approvalQueue: (profile.approvalQueue || []).map(item =>
      item.id === itemId ? { ...item, status: "rejected", rejectedAt: new Date().toISOString() } : item
    )
  };
}

export function pendingApprovalItems(profile) {
  return (profile.approvalQueue || []).filter(item => item.status === "pending");
}
