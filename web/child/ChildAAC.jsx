import React, { useMemo, useState } from "react";
import { currentPhrase, getFullBoard } from "../../engine/prediction/predictionEngine.js";
import { searchObjects } from "../../engine/search/searchEngine.js";
import { getRecents, getFavorites } from "../../engine/memory/memoryEngine.js";
import { getWordObject } from "../../engine/language/languageEngine.js";
import { isNavigationButton } from "../../engine/navigation/navigationEngine.js";

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Daily Living") return "Daily";
  if (word === "Health & Body") return "Health";
  return word;
}

function WordCard({ word, onClick, className = "" }) {
  const obj = getWordObject(word);
  return (
    <button className={`aacCard ${className}`} style={{ background: obj.color }} onClick={() => onClick(word)} aria-label={`Say ${word}`}>
      <div className="aacIcon">{obj.icon || "🔤"}</div>
      <div className="aacLabel">{labelFor(word)}</div>
    </button>
  );
}

export default function ChildAAC({ profile, onTap, onSpeak, onBack, onClear, onContext, onParent }) {
  const [query, setQuery] = useState("");
  const section = profile.activeContext || "Core Needs";
  const phrase = currentPhrase(profile.sentence || []);
  const board = useMemo(() => getFullBoard(profile), [profile, phrase, section]);

  const searchWords = useMemo(() => {
    if (!(section === "Search" && query)) return [];
    return searchObjects(query).map(o => o.name);
  }, [section, query]);

  function selectWord(word) {
    if (isNavigationButton(word)) {
      onContext(word);
      return;
    }
    onTap(word);
  }

  const displayPredictions =
    section === "Search" ? searchWords :
    section === "Recents" ? getRecents(profile, 30) :
    section === "Favorites" ? getFavorites(profile, 30) :
    section === "Topics" ? board.topics :
    section === "Emergency" ? ["I need help", "I am hurt", "I am scared", "call mom", "call dad", "I use AAC"] :
    board.predictions;

  const displayContext = ["Search", "Recents", "Favorites", "Topics", "Emergency"].includes(section) ? [] : board.contextWords;

  return (
    <div className="aacShell">
      <header className="aacHeader">
        <div className="aacLogo">Talk<span>Free</span><b>AAC</b></div>
        <button className="topPill" onClick={() => onContext("Core Needs")}>🏠 Home</button>
        <button className="topPill orange" onClick={() => onContext("Sentence Starters")}>⚡ Starters</button>
        <button className="topPill pink" onClick={() => onContext("Favorites")}>❤️ Favorites</button>
        <button className="settingsButton" onClick={onParent}>⚙️ Parent</button>
      </header>

      <section className="speechArea">
        <button className="speechBox" onClick={onSpeak}>
          <div className="speechText">{phrase || "Tap words to talk"}</div>
          <div className="speechHint">🔊 Speak</div>
        </button>
        <button className="actionButton speak" onClick={onSpeak}>🔊<br/>Speak</button>
        <button className="actionButton back" onClick={onBack}>⬅️<br/>Back</button>
        <button className="actionButton clear" onClick={onClear}>🗑️<br/>Clear</button>
      </section>

      <nav className="sectionRail">
        {["Core Needs", "Topics", "Search", "Recents", "Favorites", "Emergency"].map(r => (
          <button key={r} className={section === r ? "active" : ""} onClick={() => { setQuery(""); onContext(r); }}>{r}</button>
        ))}
      </nav>

      {section === "Search" ? <input className="search" placeholder="Search all words..." value={query} onChange={e => setQuery(e.target.value)} /> : null}

      <main className="boardLayout">
        <section className="predictionZone">
          {displayPredictions.map(word => <WordCard key={`p-${word}`} word={word} onClick={selectWord} className="predictionCard" />)}
        </section>
        <section className="contextZone">
          {displayContext.map(word => <WordCard key={`c-${word}`} word={word} onClick={selectWord} />)}
        </section>
        <aside className="topicRail">
          {board.topics.map(topic => <button key={topic} onClick={() => onContext(topic)}>{labelFor(topic)}</button>)}
        </aside>
      </main>
    </div>
  );
}
