import React from "react";

export default function BoardBreadcrumbs({ items = [], onNavigate }) {
  if (!items.length) return null;

  return (
    <nav className="boardBreadcrumbs" aria-label="Board path">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const canNavigate = Boolean(item.actionable && !isLast);
        return (
          <React.Fragment key={item.id || `${item.label}-${index}`}>
            {index > 0 && <span className="boardBreadcrumbSeparator" aria-hidden="true">›</span>}
            <button
              type="button"
              className={`boardBreadcrumbCrumb ${isLast ? "current" : ""}`}
              onClick={() => canNavigate && onNavigate?.(item)}
              aria-current={isLast ? "page" : undefined}
              disabled={!canNavigate}
            >
              {item.label}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
