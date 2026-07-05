import React, { useMemo, useState } from "react";
import { addCareTeamMessage, resolveCareTeamMessage, getCareTeamDigest, CARE_TEAM_MESSAGE_TYPES } from "../../../engine/collaboration/careTeamEngine.js";
import { TEAM_ROLES } from "../../../engine/team/teamEngine.js";

export default function CareTeamPanel({ profile, setProfile }) {
  const [form, setForm] = useState({
    author: "",
    role: "Parent 1",
    type: "Home note",
    text: "",
    followUpNeeded: false
  });

  const digest = useMemo(() => getCareTeamDigest(profile), [profile]);

  function submit(event) {
    event.preventDefault();
    setProfile(addCareTeamMessage(profile, form));
    setForm({ author: "", role: "Parent 1", type: "Home note", text: "", followUpNeeded: false });
  }

  return (
    <section className="parentPanelV4 careTeamPanel">
      <div className="panelTitleRow">
        <div>
          <h2>Care Team Notes</h2>
          <p className="muted">Home, school, therapy, and caregiver collaboration.</p>
        </div>
        <strong className="countPill">{digest.openFollowUps} follow-ups</strong>
      </div>

      <form className="parentForm careTeamForm" onSubmit={submit}>
        <input placeholder="Author name" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          {TEAM_ROLES.map(role => <option key={role}>{role}</option>)}
        </select>
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          {CARE_TEAM_MESSAGE_TYPES.map(type => <option key={type}>{type}</option>)}
        </select>
        <label className="checkboxRow">
          <input type="checkbox" checked={form.followUpNeeded} onChange={e => setForm({ ...form, followUpNeeded: e.target.checked })} />
          Follow-up needed
        </label>
        <textarea placeholder="Write a note for the team..." value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} />
        <button>Save Team Note</button>
      </form>

      <div className="stackList">
        {digest.latestMessages.length ? digest.latestMessages.map(message => (
          <div className="stackItem teamMessage" key={message.id}>
            <strong>{message.type}</strong>
            <small>{message.author || "Care team"} • {message.role} • {String(message.createdAt).slice(0, 10)}</small>
            <p>{message.text}</p>
            {message.followUpNeeded && !message.resolvedAt ? (
              <button onClick={() => setProfile(resolveCareTeamMessage(profile, message.id))}>Mark resolved</button>
            ) : null}
          </div>
        )) : <p className="muted">No team notes yet.</p>}
      </div>
    </section>
  );
}
