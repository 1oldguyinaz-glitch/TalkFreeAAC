import React, { useState } from "react";
import { createTeamMember, addTeamNote, getTeamNotes } from "../../engine/team/teamWorkspace.js";
import { createGoal, getActiveGoals } from "../../engine/goals/goalEngine.js";
import { recommendVocabulary, pendingRecommendations } from "../../engine/recommendations/recommendationEngine.js";

export default function TeamWorkspacePanel({ profile, setProfile }) {
  const [member, setMember] = useState({ name: "", email: "", role: "teacher" });
  const [goal, setGoal] = useState({ title: "", category: "Communication", targetWords: "" });
  const [rec, setRec] = useState({ word: "", phrase: "", reason: "", role: "teacher" });
  const [note, setNote] = useState({ role: "teacher", ate: "", didWell: "", struggledWith: "", workedOn: "", comments: "" });

  const notes = getTeamNotes(profile, 5);
  const goals = getActiveGoals(profile);
  const recommendations = pendingRecommendations(profile);

  return (
    <div className="panel">
      <h2>Team Workspace</h2>
      <p>Parent-controlled collaboration. Team notes do not change the child's AAC board.</p>

      <h3>Add Team Member</h3>
      <input className="search" placeholder="Name" value={member.name} onChange={e => setMember({ ...member, name: e.target.value })} />
      <input className="search" placeholder="Email" value={member.email} onChange={e => setMember({ ...member, email: e.target.value })} />
      <select className="search" value={member.role} onChange={e => setMember({ ...member, role: e.target.value })}>
        <option>teacher</option><option>therapist</option><option>caregiver</option>
      </select>
      <button className="control" onClick={() => setProfile(createTeamMember(profile, member))}>Add Member</button>

      <h3>Daily Note</h3>
      <input className="search" placeholder="Today I ate..." value={note.ate} onChange={e => setNote({ ...note, ate: e.target.value })} />
      <input className="search" placeholder="Today I did well at..." value={note.didWell} onChange={e => setNote({ ...note, didWell: e.target.value })} />
      <input className="search" placeholder="Today I struggled with..." value={note.struggledWith} onChange={e => setNote({ ...note, struggledWith: e.target.value })} />
      <input className="search" placeholder="Today we worked on..." value={note.workedOn} onChange={e => setNote({ ...note, workedOn: e.target.value })} />
      <textarea className="search" placeholder="Comments" value={note.comments} onChange={e => setNote({ ...note, comments: e.target.value })} />
      <button className="control" onClick={() => setProfile(addTeamNote(profile, note))}>Save Note</button>

      <h3>Goal</h3>
      <input className="search" placeholder="Goal title" value={goal.title} onChange={e => setGoal({ ...goal, title: e.target.value })} />
      <input className="search" placeholder="Target words, comma separated" value={goal.targetWords} onChange={e => setGoal({ ...goal, targetWords: e.target.value })} />
      <button className="control" onClick={() => setProfile(createGoal(profile, { ...goal, targetWords: goal.targetWords.split(",").map(w => w.trim()).filter(Boolean) }))}>Add Goal</button>

      <h3>Vocabulary Recommendation</h3>
      <input className="search" placeholder="Word" value={rec.word} onChange={e => setRec({ ...rec, word: e.target.value })} />
      <input className="search" placeholder="Phrase" value={rec.phrase} onChange={e => setRec({ ...rec, phrase: e.target.value })} />
      <input className="search" placeholder="Reason" value={rec.reason} onChange={e => setRec({ ...rec, reason: e.target.value })} />
      <button className="control" onClick={() => setProfile(recommendVocabulary(profile, rec))}>Recommend Vocabulary</button>

      <h3>Status</h3>
      <ul>
        <li>Team members: {(profile.teamMembers || []).length}</li>
        <li>Active goals: {goals.length}</li>
        <li>Pending vocabulary recommendations: {recommendations.length}</li>
        <li>Latest notes: {notes.length}</li>
      </ul>
    </div>
  );
}
