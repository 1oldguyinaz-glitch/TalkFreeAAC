import React, { useMemo } from "react";
import { groupTimelineByDay, summarizeTimeline } from "../../../engine/timeline/timelineSummaryEngine.js";

export default function TimelinePanel({ profile }) {
  const grouped = useMemo(() => groupTimelineByDay(profile, 80), [profile]);
  const summary = useMemo(() => summarizeTimeline(profile), [profile]);

  return (
    <section className="parentPanelV4 timelinePanel">
      <div className="panelTitleRow">
        <div>
          <h2>Communication Timeline</h2>
          <p className="muted">Local history of communication events, goals, and notes.</p>
        </div>
        <strong className="countPill">{summary.totalEvents} events</strong>
      </div>

      {Object.keys(grouped).length ? (
        <div className="timelineList">
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date} className="timelineDay">
              <h3>{date}</h3>
              {events.map(event => (
                <div className="timelineItem" key={event.id || `${date}-${event.text}-${event.createdAt}`}>
                  <strong>{event.type || "event"}</strong>
                  <span>{event.text || event.title || event.description || "Recorded activity"}</span>
                  <small>{String(event.createdAt || event.timestamp || "").slice(11, 16)}</small>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">No timeline events yet. Speak a sentence from the AAC board to start tracking.</p>
      )}
    </section>
  );
}
