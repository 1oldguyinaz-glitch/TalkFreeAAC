import React from "react";
import BoardBreadcrumbs from "./BoardBreadcrumbs.jsx";

export default function BoardStateBanner({ boardState, onNavigate, onBack, onHome }) {
  if (!boardState) return null;

  return (
    <section
      className={`boardStateBanner mode-${boardState.mode} ${boardState.isLoading ? "loading" : ""} ${boardState.hasError ? "error" : ""}`}
      aria-live="polite"
    >
      <div className="boardStateTopline">
        <BoardBreadcrumbs items={boardState.breadcrumbItems} onNavigate={onNavigate} />
        <div className="boardStateMeta">
          {boardState.isLoading && <span>Loading more words…</span>}
          {!boardState.isLoading && boardState.hiddenCount > 0 && <span>{boardState.hiddenCount} hidden</span>}
        </div>
      </div>

      <div className="boardStateHelperRow">
        <strong>{boardState.activeLabel}</strong>
        <span>{boardState.helperText}</span>
        {(boardState.hasError || boardState.isEmpty) && (
          <div className="boardStateActions">
            <button type="button" onClick={onBack}>Back</button>
            <button type="button" onClick={onHome}>Home</button>
          </div>
        )}
      </div>
    </section>
  );
}
