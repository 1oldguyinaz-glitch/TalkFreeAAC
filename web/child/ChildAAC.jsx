import React, { useMemo } from "react";
import { currentPhrase, getFullBoard } from "../../engine/prediction/predictionEngine.js";
import AACButton from "./components/AACButton.jsx";
import SymbolImage from "./components/SymbolImage.jsx";

const QUICK_PHRASES = [
  "I love you",
  "Have a hug",
  "Thank you",
  "Hi",
  "Bye",
  "I'm sorry",
  "I miss you",
  "Good job",
  "Good morning",
  "Good night"
];

const FIXED_CORE_LANGUAGE = [
  "I", "want", "need", "feel", "am", "can",
  "don't", "like", "love", "have", "see", "hear",
  "think", "go", "stop", "help", "get", "do"
];

const HOME_BRANCH = [
  "more", "help", "food", "drink", "water", "snack", "outside", "inside", "break",
  "and", "because", "but", "to", "with", "then", "when", "if", "so",
  "yes", "no", "finished", "please", "thank you", "mom", "dad", "you", "me"
];

const TOPICS = [
  "Relationships",
  "Feelings",
  "Food & Drink",
  "Places",
  "School",
  "Actions",
  "Things",
  "Body & Health",
  "Questions"
];

const SECONDARY = [
  "Recents",
  "Favorites",
  "Search",
  "Emergency"
];

function phraseFromProfile(profile) {
  const sentence = profile?.sentence || [];
  if (Array.isArray(sentence)) return currentPhrase(sentence);
  return String(sentence || "");
}

function uniqueWords(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = String(item || "").toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ChildAAC({ profile, onTap, onPhrase, onSpeak, onBack, onClear, onContext, onParent }) {
  const phrase = phraseFromProfile(profile) || "I want to go outside with you";
  const board = useMemo(() => getFullBoard(profile || {}), [profile, phrase]);
  const activeBranch = uniqueWords(board.contextWords?.length ? board.contextWords : HOME_BRANCH).slice(0, 27);
  const name = profile?.userProfile?.name || profile?.name || "Austin";
  const photo = profile?.userProfile?.photoUrl || profile?.photoUrl || profile?.avatarUrl || "";

  const selectWord = (word) => {
    if (word.includes(" ") && onPhrase) return onPhrase(word);
    onTap?.(word);
  };

  return (
    <div className="approvedAacShell">
      <main className="approvedMain">
        <header className="approvedHeader">
          <section className="approvedBrandCard">
            <button className="approvedProfileButton" onClick={onParent} aria-label="Open profile">
              {photo ? <img src={photo} alt="" /> : <span>{name.slice(0,1).toUpperCase()}</span>}
            </button>
            <div className="approvedBrandText">
              <div className="approvedBrandName">Talk<span>Free</span>AAC</div>
              <div className="approvedBrandTag">Free voice. <strong>Paid insight.</strong></div>
            </div>
          </section>

          <section className="approvedSentenceCard">
            <button className="approvedSentenceButton" onClick={onSpeak}>
              <span>{phrase}</span>
              <small>~ {Math.max(1, phrase.split(" ").length)} words</small>
            </button>
            <div className="approvedHeaderTools">
              <button className="approvedTool speak" onClick={onSpeak}>🔊 Speak</button>
              <button className="approvedTool back" onClick={onBack}>← Back</button>
              <button className="approvedTool clear" onClick={onClear}>🗑 Clear</button>
            </div>
          </section>
        </header>

        <section className="approvedQuickPhraseRow">
          {QUICK_PHRASES.map(item => (
            <button key={item} className="approvedQuickPhrase" onClick={() => onPhrase ? onPhrase(item) : selectWord(item)}>
              <SymbolImage word={item} />
              <span>{item}</span>
            </button>
          ))}
        </section>

        <section className="approvedBoard">
          <section className="approvedCoreSection">
            <div className="approvedSectionTitle">
              <h2>CORE LANGUAGE <span>(Always Available)</span></h2>
              <p>These stay fixed. They never disappear.</p>
            </div>
            <div className="approvedCoreGrid">
              {FIXED_CORE_LANGUAGE.map(word => <AACButton key={word} word={word} onSelect={selectWord} />)}
            </div>
          </section>

          <section className="approvedFringeSection">
            <div className="approvedSectionTitle">
              <h2>ACTIVE TREE / CONNECTORS / ENDINGS</h2>
              <p>These change with the sentence branch.</p>
            </div>
            <div className="approvedFringeGrid">
              {activeBranch.map(word => <AACButton key={word} word={word} onSelect={selectWord} />)}
            </div>
          </section>
        </section>
      </main>

      <aside className="approvedTopicRail">
        <section className="approvedTopicBox">
          <div className="approvedTopicsHeader">TOPICS</div>
          {TOPICS.map(topic => (
            <button key={topic} className="approvedTopicButton" onClick={() => onContext?.(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>

        <section className="approvedSecondaryTopics">
          {SECONDARY.map(topic => (
            <button key={topic} className="approvedSecondaryButton" onClick={() => onContext?.(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>
      </aside>

      <nav className="approvedBottomNav">
        <button onClick={() => onContext?.("Home")}>🏠 Home</button>
        <button onClick={() => onContext?.("Keyboard")}>⌨ Keyboard</button>
        <button onClick={() => onContext?.("Settings")}>⚙ Settings</button>
        <button onClick={onParent}>📈 Insights 👑</button>
      </nav>
    </div>
  );
}
