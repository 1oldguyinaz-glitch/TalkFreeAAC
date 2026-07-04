import React, { useMemo, useState } from "react";
import { getPredictions, currentPhrase } from "../../engine/prediction/predictionEngine.js";
import { TYPE_STYLES, GENOME } from "../../engine/genome/genome.js";
import { searchObjects } from "../../engine/search/searchEngine.js";
import { getRecents, getFavorites } from "../../engine/memory/memoryEngine.js";
import { attachAccessibilityMetadata } from "../../engine/accessibility/accessibilityMeta.js";
import { getObjectForWord, fallbackIcon, getTopicButtons } from "../../engine/boards/languageTree.js";

const TOPIC_RIBBON = ["Topics", "Food & Drinks", "Daily Living", "School Curriculum", "Outside", "Play", "People", "Feelings", "Bathroom", "Health & Body"];

function styleForWord(word) {
  const obj = getObjectForWord(word);
  return TYPE_STYLES[obj.grammar_type] || TYPE_STYLES.object || { color: "#00A6A6" };
}

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Daily Living") return "Daily";
  if (word === "Health & Body") return "Health";
  return word;
}

export default function ChildAAC({ profile, onTap, onSpeak, onComplete, onBack, onClear, onContext, onFriction, onParent }) {
  const [query, setQuery] = useState("");
  const section = profile.activeContext || "Core Needs";
  const phrase = currentPhrase(profile.sentence || []);
  const rail = ["Core Needs", "Topics", "Sentence Starters", "Search", "Recents", "Favorites", "Emergency"];

  const predictions = useMemo(() => {
    if (section === "Search" && query) return searchObjects(query).map(o => o.name);
    if (section === "Emergency") return ["I need help", "I am hurt", "I am scared", "call mom", "call dad", "my name is", "I use AAC"];
    if (section === "Recents") return getRecents(profile, 40);
    if (section === "Favorites") return getFavorites(profile, 40);
    if (section === "Topics") return getTopicButtons();
    return getPredictions(profile);
  }, [profile, query, section, phrase]);

  const accessiblePredictions = attachAccessibilityMetadata(predictions, { dwellMs: profile.inputSettings?.eyeTrackingDwellMs || 900 });

  function handleButton(word) {
    if (section === "Topics" || GENOME.domains?.[word]) {
      onContext(word);
      return;
    }
    onTap(word);
  }

  return (
    <div className="aacShell">
      <header className="aacHeader">
        <div className="aacLogo">Talk<span>Free</span><b>AAC</b></div>
        <button className="topPill" onClick={() => onContext("Core Needs")}>🏠 Home</button>
        <button className="topPill orange" onClick={() => onContext("Sentence Starters")}>⚡ Quick Phrases</button>
        <button className="topPill pink" onClick={() => onContext("Favorites")}>❤️ Favorites</button>
        <button className="settingsButton" onClick={onParent}>⚙️ Settings</button>
      </header>

      <section className="speechArea">
        <button className="speechBox" onClick={onSpeak}>
          <div className="speechText">{phrase || "Tap words to talk"}</div>
          <div className="speechHint">🔊 Speak</div>
        </button>
        <button className="actionButton speak" onClick={onSpeak}>🔊<br/>Speak Sentence</button>
        <button className="actionButton back" onClick={onBack}>⬅️<br/>Backspace</button>
        <button className="actionButton clear" onClick={onClear}>🗑️<br/>Clear</button>
      </section>

      <nav className="sectionRail">
        {rail.map(r => (
          <button key={r} className={section === r ? "active" : ""} onClick={() => { setQuery(""); onContext(r); }}>
            {r}
          </button>
        ))}
      </nav>

      {section === "Search" ? <input className="search" placeholder="Search all words..." value={query} onChange={e => setQuery(e.target.value)} /> : null}

      {profile.justCompletedSentence ? (
        <div className="completionBar">
          ✅ Sentence spoken. Start another:
          <button onClick={() => onTap("I")}>I</button>
          <button onClick={() => onTap("I want")}>I want</button>
          <button onClick={() => onTap("I need")}>I need</button>
          <button onClick={() => onTap("Can I")}>Can I</button>
          <button onClick={() => onTap("Help me")}>Help me</button>
        </div>
      ) : null}

      <main className="aacGrid">
        {accessiblePredictions.map(({ word, accessibility }) => {
          const obj = getObjectForWord(word);
          const style = styleForWord(word);
          return (
            <button
              key={word}
              className="aacCard"
              style={{ background: style.color || obj.color || "#00A6A6" }}
              onClick={() => handleButton(word)}
              aria-label={accessibility.ariaLabel}
              title={accessibility.accessibilityHint}
            >
              <div className="aacIcon">{obj.icon || fallbackIcon(word)}</div>
              <div className="aacLabel">{labelFor(word)}</div>
            </button>
          );
        })}
      </main>

      <footer className="topicRibbon">
        {TOPIC_RIBBON.map(topic => (
          <button key={topic} onClick={() => onContext(topic)}>{topic === "Topics" ? "📖 " : ""}{labelFor(topic)}</button>
        ))}
      </footer>
    </div>
  );
}
