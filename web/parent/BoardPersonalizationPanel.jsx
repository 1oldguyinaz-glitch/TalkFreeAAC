import React, { useEffect, useMemo, useState } from "react";
import {
  getDefaultQuickPhrases,
  getQuickPhrases,
  normalizeQuickPhrases,
  QUICK_PHRASE_LIMIT,
  resetQuickPhrases,
  updateQuickPhrases
} from "../../engine/display/quickPhraseSettings.js";
import { SYMBOL_DISPLAY_MODES, updateDisplaySettings } from "../../engine/display/displaySettings.js";

function profileName(profile = {}) {
  return profile?.userProfile?.name || profile?.name || "Austin";
}

function profilePhoto(profile = {}) {
  return profile?.userProfile?.photoUrl ||
    profile?.userProfile?.photo ||
    profile?.userProfile?.avatar ||
    profile?.photoUrl ||
    profile?.photo ||
    profile?.avatarUrl ||
    profile?.avatar ||
    "";
}

function initialsFor(name = "") {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.slice(0, 1).toUpperCase())
    .join("") || "TF";
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not be opened."));
    image.src = src;
  });
}

async function compressProfilePhoto(file) {
  if (!file?.type?.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Choose an image smaller than 8 MB.");

  const rawUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(rawUrl);
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Photo processing is unavailable on this device.");

    const scale = Math.max(size / image.width, size / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    const x = (size - width) / 2;
    const y = (size - height) / 2;
    context.drawImage(image, x, y, width, height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(rawUrl);
  }
}

export default function BoardPersonalizationPanel({ profile, setProfile }) {
  const currentName = profileName(profile);
  const currentPhoto = profilePhoto(profile);
  const currentSymbolMode = profile.displaySettings?.symbolMode || "auto";
  const defaultPhrases = useMemo(() => getDefaultQuickPhrases(profile), [profile?.settings?.ageBand, profile?.ageBand]);
  const [name, setName] = useState(currentName);
  const [draftPhrases, setDraftPhrases] = useState(() => normalizeQuickPhrases(getQuickPhrases(profile), { keepEmpty: true }));
  const [editingPhrases, setEditingPhrases] = useState(false);
  const [photoStatus, setPhotoStatus] = useState("");

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  useEffect(() => {
    if (!editingPhrases) {
      setDraftPhrases(normalizeQuickPhrases(getQuickPhrases(profile), { keepEmpty: true }));
    }
  }, [profile, editingPhrases]);

  function saveName() {
    const safeName = String(name || "").replace(/\s+/g, " ").trim().slice(0, 60) || "AAC User";
    setProfile({
      ...profile,
      name: safeName,
      userProfile: {
        ...(profile.userProfile || {}),
        name: safeName
      }
    });
    setName(safeName);
  }

  async function choosePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setPhotoStatus("Preparing photo…");
    try {
      const photoUrl = await compressProfilePhoto(file);
      setProfile({
        ...profile,
        userProfile: {
          ...(profile.userProfile || {}),
          photoUrl
        }
      });
      setPhotoStatus("Photo updated.");
    } catch (error) {
      setPhotoStatus(error?.message || "Photo could not be saved.");
    }
  }

  function removePhoto() {
    const nextUserProfile = { ...(profile.userProfile || {}) };
    delete nextUserProfile.photoUrl;
    delete nextUserProfile.photo;
    delete nextUserProfile.avatar;
    setProfile({
      ...profile,
      photoUrl: "",
      photo: "",
      avatarUrl: "",
      avatar: "",
      userProfile: nextUserProfile
    });
    setPhotoStatus("Photo removed.");
  }

  function updatePhrase(index, value) {
    setDraftPhrases(current => current.map((item, itemIndex) => itemIndex === index ? value : item));
  }

  function savePhrases() {
    const cleaned = normalizeQuickPhrases(draftPhrases);
    setProfile(updateQuickPhrases(profile, cleaned.length ? cleaned : defaultPhrases));
    setDraftPhrases(normalizeQuickPhrases(cleaned.length ? cleaned : defaultPhrases, { keepEmpty: true }));
    setEditingPhrases(false);
  }

  function restoreDefaults() {
    setProfile(resetQuickPhrases(profile));
    setDraftPhrases(normalizeQuickPhrases(defaultPhrases, { keepEmpty: true }));
    setEditingPhrases(false);
  }

  return (
    <article className="parentPanelV4 boardPersonalizationPanel">
      <div className="boardPersonalizationHeader">
        <div>
          <h2>{currentName}'s Profile &amp; Board</h2>
          <p className="muted">Controls the communicator identity, picture style, and editable phrase buttons directly below the talk bar.</p>
        </div>
        <div className="boardProfilePreview" aria-label={`${currentName} board profile preview`}>
          <span className="boardProfilePreviewAvatar">
            {currentPhoto ? <img src={currentPhoto} alt="" /> : <span>{initialsFor(currentName)}</span>}
          </span>
          <strong>{currentName}</strong>
        </div>
      </div>

      <div className="boardPersonalizationGrid">
        <section className="boardIdentityEditor" aria-label="Communicator profile settings">
          <label>
            Communicator name
            <input value={name} maxLength={60} onChange={event => setName(event.target.value)} />
          </label>
          <div className="boardPersonalizationActions">
            <button type="button" onClick={saveName}>Save name</button>
            <label className="boardPhotoUploadButton">
              Choose photo
              <input type="file" accept="image/*" onChange={choosePhoto} />
            </label>
            {currentPhoto && <button type="button" className="secondary" onClick={removePhoto}>Remove photo</button>}
          </div>
          {photoStatus && <small className="boardPersonalizationStatus" role="status">{photoStatus}</small>}

          <label className="boardPictureStyleField">
            Board picture style
            <select
              value={currentSymbolMode}
              onChange={event => setProfile(updateDisplaySettings(profile, { symbolMode: event.target.value }))}
            >
              {Object.entries(SYMBOL_DISPLAY_MODES).map(([value, option]) => (
                <option key={value} value={value}>{option.name}</option>
              ))}
            </select>
            <small>{SYMBOL_DISPLAY_MODES[currentSymbolMode]?.description || SYMBOL_DISPLAY_MODES.auto.description}</small>
          </label>

          {currentSymbolMode === "sign_language" && (
            <p className="boardSymbolSafetyNote">
              Sign mode uses available hand-gesture visuals and keeps the written word visible. It is not a certified ASL dictionary; unavailable signs use a safe fallback.
            </p>
          )}

          <p className="boardAutomaticFitNote">Button, symbol, and word sizes adjust automatically to the current screen.</p>
        </section>

        <section className="quickPhraseEditor" aria-label="Quick phrase bar settings">
          <div className="quickPhraseEditorTopline">
            <div>
              <h3>Quick phrase bar</h3>
              <p className="muted">Edit the buttons from “I need help” through “Thank you.” “Please” is included in the default set.</p>
            </div>
            <button type="button" onClick={() => setEditingPhrases(value => !value)}>
              {editingPhrases ? "Close editor" : "Edit quick phrase bar"}
            </button>
          </div>

          {editingPhrases ? (
            <div className="quickPhraseInputGrid">
              {Array.from({ length: QUICK_PHRASE_LIMIT }, (_, index) => (
                <label key={index}>
                  <span>{index + 1}</span>
                  <input
                    value={draftPhrases[index] || ""}
                    maxLength={80}
                    placeholder={`Phrase ${index + 1}`}
                    onChange={event => updatePhrase(index, event.target.value)}
                  />
                </label>
              ))}
              <div className="quickPhraseEditorActions">
                <button type="button" onClick={savePhrases}>Save phrase bar</button>
                <button type="button" className="secondary" onClick={restoreDefaults}>Restore defaults</button>
              </div>
            </div>
          ) : (
            <div className="quickPhrasePreviewList">
              {getQuickPhrases(profile).map((phrase, index) => <span key={`${phrase}-${index}`}>{phrase}</span>)}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
