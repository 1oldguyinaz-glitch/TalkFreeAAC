import React, { useMemo, useState } from "react";
import { currentPhrase, getFullBoard } from "../../engine/prediction/predictionEngine.js";
import { searchObjects } from "../../engine/search/searchEngine.js";
import { getRecents, getFavorites } from "../../engine/memory/memoryEngine.js";
import { isNavigationButton } from "../../engine/navigation/navigationEngine.js";
import SentenceBuilder from "./components/SentenceBuilder.jsx";
import HumanPhraseBar from "./components/HumanPhraseBar.jsx";
import ProfileCorner from "./components/ProfileCorner.jsx";
import AACButton from "./components/AACButton.jsx";
import ResponsiveGrid from "./components/ResponsiveGrid.jsx";
import TopicRail from "./components/TopicRail.jsx";

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Health & Body") return "Health";
  return word;
}

export default function ChildAAC({ profile, onTap, onPhrase, onSpeak, onBack, onClear, onContext, onParent }) {
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

    if (String(word).includes(" ") && onPhrase) {
      onPhrase(word);
      return;
    }

    onTap(word);
  }

  function selectPhrase(phraseText) {
    if (onPhrase) onPhrase(phraseText);
    else phraseText.split(" ").forEach(part => part.trim() && onTap(part.trim()));
  }

  const displayPredictions =
    section === "Search" ? searchWords :
    section === "Recents" ? getRecents(profile, 30) :
    section === "Favorites" ? getFavorites(profile, 30) :
    section === "Topics" ? board.topics :
    section === "Emergency" ? ["I need help", "I am hurt", "I am scared", "call mom", "call dad", "I use AAC"] :
    board.predictions;

  const displayContext = ["Search", "Recents", "Favorites", "Topics", "Emergency"].includes(section)
    ? []
    : board.contextWords;

  return (
    <div className="aacShellV4 adaptiveShell">
      <header className="aacTopV4">
        <div className="brandBlock">
          <div className="brandName">TalkFree<span>AAC</span></div>
          <div className="brandTag">Communication without barriers</div>
        </div>

        <div className="speechPanelV4">
          <button className="speechDisplayV4" onClick={onSpeak}>
            <span>{phrase || "Tap words to talk"}</span>
          </button>
          <button className="controlBubble speak" onClick={onSpeak}>🔊 Speak</button>
          <button className="controlBubble back" onClick={onBack}>⬅ Back</button>
          <button className="controlBubble clear" onClick={onClear}>Clear</button>
        </div>
      </header>

      <SentenceBuilder onSelect={selectPhrase} />
      <HumanPhraseBar onSelect={selectPhrase} />

      <main className="communicationBoardV4">
        <section className="mainTalkArea">
          <div className="boardHeaderRow">
            <h2>{section === "Core Needs" ? "Keep Talking" : labelFor(section)}</h2>
            <nav className="modePills">
              {["Core Needs", "Topics", "Search", "Recents", "Favorites", "Emergency"].map(r => (
                <button key={r} className={section === r ? "modePill active" : "modePill"} onClick={() => { setQuery(""); onContext(r); }}>
                  {r}
                </button>
              ))}
            </nav>
          </div>

          {section === "Search" ? (
            <input className="searchV4" placeholder="Search words, phrases, topics..." value={query} onChange={e => setQuery(e.target.value)} />
          ) : null}

          <ResponsiveGrid className="predictionGridV4">
            {displayPredictions.map(word => (
              <AACButton key={`prediction-${word}`} word={word} onSelect={selectWord} variant="prediction" />
            ))}
          </ResponsiveGrid>

          <ResponsiveGrid className="contextGridV4">
            {displayContext.map(word => (
              <AACButton key={`context-${word}`} word={word} onSelect={selectWord} />
            ))}
          </ResponsiveGrid>
        </section>

        <TopicRail topics={board.topics} onContext={onContext} />
        <ProfileCorner profile={profile} onParent={onParent} />
      </main>
    </div>
  );
}
