import React from "react";

export default function ProfileCorner({ profile, onParent }) {
  const user = profile.userProfile || {};
  const name = user.name || "Austin";
  const level = profile.selectedStage || "Level 1 Communicator";
  return (
    <button className="profileCorner" onClick={onParent} aria-label="Open parent settings">
      <div className="profileAvatar">
        {user.photo ? <img src={user.photo} alt={name} /> : <span>{name.slice(0, 1).toUpperCase()}</span>}
      </div>
      <div className="profileText">
        <strong>{name}</strong>
        <small>{level.replace("Stage 1: ", "").replace("Stage 2: ", "")}</small>
      </div>
    </button>
  );
}
