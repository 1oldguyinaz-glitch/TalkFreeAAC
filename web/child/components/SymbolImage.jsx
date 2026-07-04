import React, { useState } from "react";
import { getFallbackSymbol, getSymbolPath } from "../../../engine/display/symbolPriority.js";

export default function SymbolImage({ wordObject, className = "symbolImage" }) {
  const [failed, setFailed] = useState(false);
  const src = getSymbolPath(wordObject);
  const fallback = getFallbackSymbol(wordObject);

  if (failed || !src) {
    return <span className={`${className} fallbackSymbol`} aria-hidden="true">{fallback}</span>;
  }

  return (
    <img
      className={className}
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}
