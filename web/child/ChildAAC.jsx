import React, { useMemo, useState } from "react";
import { currentPhrase, getFullBoard } from "../../engine/prediction/predictionEngine.js";
import { searchObjects } from "../../engine/search/searchEngine.js";
import { getRecents, getFavorites } from "../../engine/memory/memoryEngine.js";
import { isNavigationButton } from "../../engine/navigation/navigationEngine.js";
import SentenceBuilder from "./components/SentenceBuilder.jsx";
import HumanPhraseBar from "./components/HumanPhraseBar.jsx";
import ProfileCorner from "./components/ProfileCorner.jsx";
import AACButton from "./components/AACButton.jsx";
import TopicRail from "./components/TopicRail.jsx";

const MODES = ["Core Needs", "Topics", "Search", "Recents", "Favorites", "Emergency"];

function unique(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = String(item || "").toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function labelFor(word) {
  if (word === "Food & Drinks") return "Food";
  if (word === "School Curriculum") return "School";
  if (word === "Health & Body") return "Health";
  return word;
}

export default function ChildAAC({
  profile = {},
  onTap = () => {},
  onPhrase,
  onSpeak = () => {},
  onBack = () => {},
  onClear = () => {},
  onContext = () => {},
  onParent = () => {}
}) {
  const [query, setQuery] = useState("");
  const section = profile.activeContext || "Core Needs";
  const phrase = currentPhrase(profile.sentence || []);
  const board = useMemo(() => getFullBoard(profile), [profile, phrase, section]);

  const searchWords = useMemo(() => {
    if (!(section === "Search" && query)) return [];
    return unique(searchObjects(query).map(o => o.name || o.display || o.word)).slice(0, 30);
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

  function selectPhrase(text) {
    if (onPhrase) onPhrase(text);
    else String(text).split(" ").forEach(part => part.trim() && onTap(part.trim()));
  }

  const modeWords =
    section === "Search" ? searchWords :
    section === "Recents" ? unique(getRecents(profile, 30)) :
    section === "Favorites" ? unique(getFavorites(profile, 30)) :
    section === "Topics" ? unique(board.topics).slice(0, 30) :
    section === "Emergency" ? ["Help me", "Stop", "I am hurt", "I am scared", "Call mom", "Call dad", "I use AAC", "I need a break", "doctor", "medicine", "bathroom", "safe"] :
    null;

  const top = modeWords ? modeWords.slice(0, 12) : unique(board.predictions).slice(0, 12);
  const bottom = modeWords ? modeWords.slice(12, 30) : unique(board.contextWords).slice(0, 18);

  return (
    <div className="aacShellV5">
      <header className="aacHeaderV5">
        <section className="brandCardV5">
          <div className="brandNameV5">TalkFree<span>AAC</span></div>
          <div className="brandTagV5">free voice • paid insight</div>
        </section>

        <section className="speechCardV5">
          <button className="sentenceDisplayV5" onClick={onSpeak}>
            <span>{phrase || "I'm ready to start talking to anybody"}</span>
          </button>
          <button className="toolButtonV5 speak" onClick={onSpeak}>Speak</button>
          <button className="toolButtonV5 back" onClick={onBack}>Back</button>
          <button className="toolButtonV5 clear" onClick={onClear}>Clear</button>
        </section>
      </header>

      <SentenceBuilder onSelect={selectPhrase} />
      <HumanPhraseBar onSelect={selectPhrase} />

      <main className="boardShellV5">
        <section className="talkBoardV5">
          <div className="boardTopV5">
            <h2>{section === "Core Needs" ? "Language Tree" : labelFor(section)}</h2>
            <nav className="modePillsV5">
              {MODES.map(mode => (
                <button
                  key={mode}
                  className={section === mode ? "modePillV5 active" : "modePillV5"}
                  onClick={() => {
                    setQuery("");
                    onContext(mode);
                  }}
                >
                  {labelFor(mode)}
                </button>
              ))}
            </nav>
          </div>

          {section === "Search" ? (
            <input
              className="searchInputV5"
              placeholder="Search words, phrases, people, places..."
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          ) : (
            <div className="treeHintV5">Core words build the sentence. Fringe words finish the thought.</div>
          )}

          <section className="coreGridV5">
            {top.map((word, index) => (
              <AACButton key={`core-${word}-${index}`} word={word} onSelect={selectWord} variant="prediction" showPredictionBadge={section === "Core Needs"} />
            ))}
          </section>

          <section className="fringeGridV5">
            {bottom.map((word, index) => (
              <AACButton key={`fringe-${word}-${index}`} word={word} onSelect={selectWord} />
            ))}
          </section>
        </section>

        <TopicRail topics={board.topics} onContext={onContext} />
        <ProfileCorner profile={profile} onParent={onParent} />
      </main>
    </div>
  );
}
