import React, { useState } from "react";
import { getCommunicationMetrics, getTopWords, getTopPhrases, buildInsightSummary } from "../../engine/analytics/communicationAnalytics.js";
import { addGoal, completeGoal } from "../../engine/goals/goalEngine.js";
import { addTeamMember, removeTeamMember, TEAM_ROLES } from "../../engine/team/teamEngine.js";
import { addDailyNote } from "../../engine/notes/noteEngine.js";
import MetricCard from "./components/MetricCard.jsx";
import ProfessionalInsightsPanel from "./components/ProfessionalInsightsPanel.jsx";

export default function ParentMenu({ profile, setProfile, onBack }) {
  const [goalForm, setGoalForm] = useState({ title: "", targetWords: "", level: "Emerging", notes: "" });
  const [teamForm, setTeamForm] = useState({ name: "", email: "", role: "Parent 1" });
  const [noteForm, setNoteForm] = useState({ didWell: "", struggledWith: "", workedOn: "", comments: "" });

  const metrics = getCommunicationMetrics(profile);
  const topWords = getTopWords(profile);
  const topPhrases = getTopPhrases(profile);
  const insight = buildInsightSummary(profile);

  function submitGoal(event) {
    event.preventDefault();
    if (!goalForm.title.trim()) return;
    setProfile(addGoal(profile, goalForm));
    setGoalForm({ title: "", targetWords: "", level: "Emerging", notes: "" });
  }

  function submitTeam(event) {
    event.preventDefault();
    if (!teamForm.name.trim() && !teamForm.email.trim()) return;
    setProfile(addTeamMember(profile, teamForm));
    setTeamForm({ name: "", email: "", role: "Parent 1" });
  }

  function submitNote(event) {
    event.preventDefault();
    const hasNote = Object.values(noteForm).some(value => String(value).trim());
    if (!hasNote) return;
    setProfile(addDailyNote(profile, noteForm));
    setNoteForm({ didWell: "", struggledWith: "", workedOn: "", comments: "" });
  }

  return (
    <div className="parentShellV4">
      <header className="parentHeaderV4">
        <div>
          <h1>Parent Dashboard</h1>
          <p>Local-first communication profile and progress overview.</p>
        </div>
        <button className="parentBackButton" onClick={onBack}>Back to AAC</button>
      </header>

      <section className="parentGrid metricsGridV4">
        <MetricCard label="Communication Events" value={metrics.communications} />
        <MetricCard label="Complete Sentences" value={`${metrics.completeSentenceRate}%`} />
        <MetricCard label="Unique Words" value={metrics.uniqueWords} />
        <MetricCard label="Phrases Spoken" value={metrics.totalPhrases} />
        <MetricCard label="Feelings Expressed" value={metrics.feelingsExpressed} />
        <MetricCard label="Affection Expressed" value={metrics.affectionExpressed} />
        <MetricCard label="Questions Asked" value={metrics.questionsAsked} />
        <MetricCard label="Active Goals" value={metrics.activeGoals} />
      </section>

      <section className="parentGrid">
        <ProfessionalInsightsPanel profile={profile} />
      </section>

      <section className="parentGrid twoColumnV4">
        <article className="parentPanelV4">
          <h2>AI Vocabulary Growth</h2>
          <p className="muted">{insight.headline}</p>
          <div className="insightList">
            {insight.strengths.map(item => <div key={item}>{item}</div>)}
          </div>
        </article>

        <article className="parentPanelV4">
          <h2>Top Phrases</h2>
          <div className="chipList">
            {topPhrases.length ? topPhrases.map(item => (
              <span key={item.phrase}>{item.phrase} <b>{item.count}</b></span>
            )) : <p className="muted">No phrases yet.</p>}
          </div>
        </article>
      </section>

      <section className="parentGrid twoColumnV4">
        <article className="parentPanelV4">
          <h2>Top Words</h2>
          <div className="chipList">
            {topWords.length ? topWords.map(item => (
              <span key={item.word}>{item.word} <b>{item.count}</b></span>
            )) : <p className="muted">No words yet.</p>}
          </div>
        </article>

        <article className="parentPanelV4">
          <h2>Team Workspace</h2>
          <form className="parentForm" onSubmit={submitTeam}>
            <input placeholder="Name" value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} />
            <input placeholder="Email" value={teamForm.email} onChange={e => setTeamForm({ ...teamForm, email: e.target.value })} />
            <select value={teamForm.role} onChange={e => setTeamForm({ ...teamForm, role: e.target.value })}>
              {TEAM_ROLES.map(role => <option key={role}>{role}</option>)}
            </select>
            <button>Add Team Member</button>
          </form>

          <div className="stackList">
            {(profile.teamMembers || []).map(member => (
              <div className="stackItem" key={member.id}>
                <strong>{member.name || member.email}</strong>
                <small>{member.role} • {member.email}</small>
                <button onClick={() => setProfile(removeTeamMember(profile, member.id))}>Remove</button>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="parentGrid twoColumnV4">
        <article className="parentPanelV4">
          <h2>Goals</h2>
          <form className="parentForm" onSubmit={submitGoal}>
            <input placeholder="Goal title" value={goalForm.title} onChange={e => setGoalForm({ ...goalForm, title: e.target.value })} />
            <input placeholder="Target words, comma separated" value={goalForm.targetWords} onChange={e => setGoalForm({ ...goalForm, targetWords: e.target.value })} />
            <select value={goalForm.level} onChange={e => setGoalForm({ ...goalForm, level: e.target.value })}>
              <option>Emerging</option>
              <option>Expanding</option>
              <option>Fluent</option>
            </select>
            <textarea placeholder="Notes" value={goalForm.notes} onChange={e => setGoalForm({ ...goalForm, notes: e.target.value })} />
            <button>Add Goal</button>
          </form>

          <div className="stackList">
            {(profile.goals || []).map(goal => (
              <div className="stackItem" key={goal.id}>
                <strong>{goal.title}</strong>
                <small>{goal.level} • {goal.targetWords?.join(", ")}</small>
                {!goal.completed ? <button onClick={() => setProfile(completeGoal(profile, goal.id))}>Complete</button> : <em>Completed</em>}
              </div>
            ))}
          </div>
        </article>

        <article className="parentPanelV4">
          <h2>Daily Notes</h2>
          <form className="parentForm" onSubmit={submitNote}>
            <input placeholder="Today I did well at..." value={noteForm.didWell} onChange={e => setNoteForm({ ...noteForm, didWell: e.target.value })} />
            <input placeholder="Today I struggled with..." value={noteForm.struggledWith} onChange={e => setNoteForm({ ...noteForm, struggledWith: e.target.value })} />
            <input placeholder="Today we worked on..." value={noteForm.workedOn} onChange={e => setNoteForm({ ...noteForm, workedOn: e.target.value })} />
            <textarea placeholder="Comments" value={noteForm.comments} onChange={e => setNoteForm({ ...noteForm, comments: e.target.value })} />
            <button>Save Daily Note</button>
          </form>
        </article>
      </section>
    </div>
  );
}
