import React from "react";
import { currentPhrase } from "../../engine/prediction/predictionEngine.js";
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

const CORE_LANGUAGE = [
  "I", "want", "need", "feel", "am", "can",
  "don't", "like", "love", "have", "see", "hear",
  "think", "go", "stop", "help", "get", "do"
];

const FRINGE_CONNECTORS_ENDINGS = [
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

const SECONDARY_TOPICS = [
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

function profileName(profile) {
  return profile?.userProfile?.name || profile?.name || "Austin";
}

function profilePhoto(profile) {
  return profile?.userProfile?.photoUrl || profile?.photoUrl || profile?.avatarUrl || "";
}

function contextForTopic(topic) {
  const map = {
    "Food & Drink": "Food & Drinks",
    "Body & Health": "Health & Body"
  };
  return map[topic] || topic;
}

export default function ChildAAC({ profile, onTap, onPhrase, onSpeak, onBack, onClear, onContext, onParent }) {
  const phrase = phraseFromProfile(profile);
  const name = profileName(profile);
  const photo = profilePhoto(profile);

  function selectWord(word) {
    if (String(word).includes(" ") && onPhrase) {
      onPhrase(word);
      return;
    }
    onTap(word);
  }

  function selectTopic(topic) {
    if (onContext) onContext(contextForTopic(topic));
  }

  return (
    <div className="approvedAacShell">
      <main className="approvedMain">
        <header className="approvedHeader">
          <section className="approvedBrandCard">
            <button className="approvedProfileButton" onClick={onParent} aria-label="Open profile">
              {photo ? <img src={photo} alt="" /> : <span>{name.slice(0, 1).toUpperCase()}</span>}
            </button>
            <div className="approvedBrandText">
              <div className="approvedBrandName">Talk<span>Free</span>AAC</div>
              <div className="approvedBrandTag">Free voice. <strong>Paid insight.</strong></div>
            </div>
          </section>

          <section className="approvedSentenceCard">
            <button className="approvedSentenceButton" onClick={onSpeak}>
              <span>{phrase || "I want to go outside with you"}</span>
              <small>~ {Math.max(1, (phrase || "I want to go outside with you").split(" ").length)} words</small>
            </button>
            <div className="approvedHeaderTools">
              <button className="approvedTool speak" onClick={onSpeak}>🔊 Speak</button>
              <button className="approvedTool back" onClick={onBack}>← Back</button>
              <button className="approvedTool clear" onClick={onClear}>🗑 Clear</button>
            </div>
          </section>
        </header>

        <section className="approvedQuickPhraseRow">
          {QUICK_PHRASES.map(phraseText => (
            <button key={phraseText} className="approvedQuickPhrase" onClick={() => onPhrase ? onPhrase(phraseText) : selectWord(phraseText)}>
              <SymbolImage word={phraseText} />
              <span>{phraseText}</span>
            </button>
          ))}
        </section>

        <section className="approvedBoard">
          <section className="approvedCoreSection">
            <div className="approvedSectionTitle">
              <h2>CORE LANGUAGE <span>(Active Branch)</span></h2>
              <p>Build your sentence — words that talk.</p>
            </div>
            <div className="approvedCoreGrid">
              {CORE_LANGUAGE.map(word => (
                <AACButton key={word} word={word} onSelect={selectWord} />
              ))}
            </div>
          </section>

          <section className="approvedFringeSection">
            <div className="approvedSectionTitle">
              <h2>FRINGE / CONNECTORS / ENDINGS</h2>
              <p>Add details, connect ideas, and finish.</p>
            </div>
            <div className="approvedFringeGrid">
              {FRINGE_CONNECTORS_ENDINGS.map(word => (
                <AACButton key={word} word={word} onSelect={selectWord} />
              ))}
            </div>
          </section>
        </section>
      </main>

      <aside className="approvedTopicRail">
        <section className="approvedTopicBox">
          <div className="approvedTopicsHeader">TOPICS</div>
          {TOPICS.map(topic => (
            <button key={topic} className="approvedTopicButton" onClick={() => selectTopic(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>

        <section className="approvedSecondaryTopics">
          {SECONDARY_TOPICS.map(topic => (
            <button key={topic} className="approvedSecondaryButton" onClick={() => selectTopic(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>
      </aside>

      <nav className="approvedBottomNav">
        <button onClick={() => selectTopic("Core Needs")}>🏠 Home</button>
        <button onClick={() => selectTopic("Keyboard")}>⌨ Keyboard</button>
        <button onClick={() => selectTopic("Settings")}>⚙ Settings</button>
        <button onClick={onParent}>📈 Insights 👑</button>
      </nav>
    </div>
  );
}
