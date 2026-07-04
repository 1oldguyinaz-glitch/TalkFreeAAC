import React, { useMemo, useState } from "react";
import { getPredictions, currentPhrase } from "../../engine/prediction/predictionEngine.js";
import { KNOWLEDGE_OBJECTS, TYPE_STYLES, GENOME } from "../../engine/genome/genome.js";
import { semanticSearch } from "../../engine/search/semanticSearch.js";
import { getCompletionSuggestions } from "../../engine/composer/sentenceComposer.js";
import { getRecents, getFavorites } from "../../engine/memory/memoryEngine.js";
import { attachAccessibilityMetadata } from "../../engine/accessibility/accessibilityMeta.js";

export default function ChildAAC({ profile, onTap, onSpeak, onComplete, onBack, onClear, onContext, onFriction, onParent }) {
  const [query, setQuery] = useState("");
  const section = profile.activeContext;
  const phrase = currentPhrase(profile.sentence || []);
  const rail = GENOME.child_visible_sections;

  const predictions = useMemo(() => {
    if (section === "Search" && query) return semanticSearch(query).map(o => o.name);
    if (section === "Emergency") return ["I need help", "I am hurt", "I am scared", "call mom", "call dad", "my name is", "I use AAC"];
    if (section === "Recents") return getRecents(profile, 30);
    if (section === "Favorites") return getFavorites(profile, 30);
    const base = getPredictions(profile);
    const completions = phrase ? getCompletionSuggestions(profile.sentence || []) : [];
    return [...new Set([...base, ...completions])];
  }, [profile, query, section, phrase]);

  const accessiblePredictions = attachAccessibilityMetadata(predictions, { dwellMs: profile.inputSettings?.eyeTrackingDwellMs || 900 });

  return (
    <div className="shell">
      <div className="rail">
        {rail.map(r => <button className={section === r ? "active" : ""} key={r} onClick={() => { setQuery(""); onContext(r); }}>{r}</button>)}
      </div>
      <main>
        <div className="top">
          <div><div className="brand">TalkFreeAAC</div><div>Free communication • local-first</div></div>
          <button className="lock" onClick={onParent}>🔒</button>
        </div>

        {profile.lastCompletedSentence ? <div className="last">Last said: {profile.lastCompletedSentence}</div> : null}
        <div className="sentence">{phrase || "\u00A0"}</div>

        <div className="controls">
          <button className="control" onClick={onSpeak}>🔊 Speak</button>
          <button className="control" onClick={onComplete}>✅ Done</button>
          <button className="control" onClick={onBack}>⬅️ Back</button>
          <button className="control" onClick={onClear}>❌ Clear</button>
          <button className="control" onClick={() => onFriction("Could not find word")}>⚠️ Hard</button>
        </div>

        {section === "Search" ? <input className="search" placeholder="Search words..." value={query} onChange={e => setQuery(e.target.value)} /> : null}

        <div className="board-title">{profile.justCompletedSentence ? "New thought" : section}</div>

        <div className="grid">
          {accessiblePredictions.map(({ word, accessibility }) => {
            const obj = KNOWLEDGE_OBJECTS[word] || { name: word, grammar_type: "safety", icon: "🆘" };
            const style = TYPE_STYLES[obj?.grammar_type] || TYPE_STYLES.object;
            return (
              <button key={word} className="word" style={{ background: style.color }} onClick={() => onTap(word)} aria-label={accessibility.ariaLabel} title={accessibility.accessibilityHint}>
                <div className="icon">{obj?.icon || "🔤"}</div>
                <div className="label">{word}</div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
