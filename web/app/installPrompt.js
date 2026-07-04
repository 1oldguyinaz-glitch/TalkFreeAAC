export function registerInstallPrompt(callback) {
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    if (callback) callback(true);
  });

  return async function promptInstall() {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return result.outcome === "accepted";
  };
}
