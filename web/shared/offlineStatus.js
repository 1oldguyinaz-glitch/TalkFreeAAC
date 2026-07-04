export function getOfflineStatus() {
  return {
    online: navigator.onLine,
    mode: navigator.onLine ? "online" : "offline",
    localFirst: true
  };
}

export function subscribeOfflineStatus(callback) {
  const handler = () => callback(getOfflineStatus());
  window.addEventListener("online", handler);
  window.addEventListener("offline", handler);

  return () => {
    window.removeEventListener("online", handler);
    window.removeEventListener("offline", handler);
  };
}
