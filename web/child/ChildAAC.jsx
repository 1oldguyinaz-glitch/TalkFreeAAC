import React, { useEffect, useMemo, useState } from "react";
import {
  currentPhrase,
  getFullBoard,
  getNextTopicNode,
  topicWordHasChildren
} from "../../engine/prediction/predictionEngine.js";
import AACButton from "./components/AACButton.jsx";
import SymbolImage from "./components/SymbolImage.jsx";
import {
  recordTypedVocabularyFromKeyboard,
  markTypedVocabularyCustomAdded
} from "../../engine/storage/typedVocabularyTracker.js";
import {
  saveCustomVocabularyItem
} from "../../engine/storage/customVocabularyStore.js";
import {
  getBucketedLanguageSliceV5_27Async
} from "../../engine/language/languageDatabaseRouterV5_27.js";
import {
  getNextWordAssumptionSliceV5_30Async,
  getStaticNextWordCandidatesV5_30
} from "../../engine/prediction/nextWordAssumptionEngine.js";
import {
  getStageBoardLimits,
  isAdultTone,
  normalizeStageSettings
} from "../../engine/display/stageSettings.js";
import "../styles/aac-keyboard.css";
import "../styles/aac-unified-board.css";

const CHILD_QUICK_PHRASES = [
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

const ADULT_QUICK_PHRASES = [
  "I need help",
  "Please wait",
  "Yes",
  "No",
  "Stop",
  "I need a break",
  "I know but can't say it",
  "Wrong word",
  "Try again",
  "Thank you"
];

// Stable motor plan order. Higher stages reveal more cells; lower stages never get flooded.
const STAGED_CORE_LANGUAGE = [
  "I", "want", "need", "help", "stop", "yes",
  "no", "more", "finished", "feel", "am", "can",
  "don't", "like", "love", "have", "see", "hear",
  "think", "go", "get", "do", "you", "me"
];

const HOME_BRANCH_BY_STAGE = {
  1: [
    "I'm", "food", "drink", "water", "snack", "outside",
    "inside", "break", "bathroom", "hurt", "mom", "dad"
  ],
  2: [
    "I'm", "feeling", "food", "drink", "water", "snack", "outside", "inside",
    "break", "bathroom", "happy", "sad", "mad", "scared", "teacher", "friend"
  ],
  3: [
    "I'm", "feeling", "food", "drink", "water", "snack", "outside", "inside", "break", "bathroom",
    "to", "with", "then", "when", "because", "but", "play", "go", "home", "school",
    "happy", "sad", "mad", "scared", "tired", "sick"
  ],
  4: [
    "I'm", "feeling", "food", "drink", "water", "snack", "outside", "inside", "break", "bathroom",
    "to", "with", "then", "when", "because", "but", "if", "so", "privacy", "friends",
    "school", "work", "schedule", "phone", "money", "opinion", "question", "relationship",
    "pain", "medicine", "home", "transportation", "technology", "feelings", "choice", "wrong", "try again", "give me time"
  ],
  5: [
    "I'm", "feeling", "pain", "doctor", "medicine", "family", "home", "bathroom", "water", "food",
    "yes", "no", "wrong word", "try again", "give me time", "I know but can't say it",
    "call someone", "help", "stop", "tired", "sick", "where", "who", "what", "when", "why"
  ]
};

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

function quickPhrasesForProfile(profile, limit) {
  const source = isAdultTone(profile) ? ADULT_QUICK_PHRASES : CHILD_QUICK_PHRASES;
  return source.slice(0, limit);
}

function homeBranchForStage(stage) {
  return HOME_BRANCH_BY_STAGE[stage] || HOME_BRANCH_BY_STAGE[1];
}

function secondaryTopicsForSettings(settings) {
  return SECONDARY.filter(topic => {
    if (topic === "Search") return settings.searchEnabled === true;
    if (topic === "Emergency") return settings.emergencyMode !== false;
    return true;
  });
}

const LETTER_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"]
];

const SYMBOL_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["-", "/", ":", ";", "(", ")", "$", "&", "@", "\""],
  [".", ",", "?", "!", "'", "#", "%", "*", "+", "="],
  ["[", "]", "{", "}", "<", ">", "_", "\\", "|", "~"]
];

const EMOJI_ROWS = [
  ["😀", "😃", "😄", "😁", "🙂", "😊", "😍", "😘", "😂", "😭"],
  ["😢", "😡", "😨", "😴", "🤒", "🤕", "🤢", "👍", "👎", "👏"],
  ["❤️", "💙", "⭐", "✨", "🎉", "🧸", "📚", "🎮", "🎵", "📺"],
  ["🍕", "🍟", "🍔", "🍗", "🍎", "🍌", "🥤", "🧃", "💧", "🏠"],
  ["🏫", "🚗", "🚌", "🌳", "🚽", "🛏️", "🆘", "✅", "❌", "❓"]
];

function phraseFromProfile(profile) {
  const sentence = profile?.sentence || [];
  if (Array.isArray(sentence)) return currentPhrase(sentence);
  return String(sentence || "");
}

function normalizeBoardWord(word = "") {
  return String(word || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueWords(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = normalizeBoardWord(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function removeCoreDuplicates(items = [], coreItems = STAGED_CORE_LANGUAGE) {
  const coreKeys = new Set(coreItems.map(normalizeBoardWord));
  return uniqueWords(items).filter(item => !coreKeys.has(normalizeBoardWord(item)));
}

function titleFromContext(context = "") {
  if (!context) return "";
  const last = String(context).split("/").pop() || "";
  return last
    .split("-")
    .map(part => part ? part.slice(0, 1).toUpperCase() + part.slice(1) : "")
    .join(" ");
}

function labelFromEntry(entry) {
  return entry?.display_label || entry?.label || "";
}

function entriesToLabels(entries = []) {
  return entries.map(labelFromEntry).filter(Boolean);
}

export default function ChildAAC({ profile, onTap, onPhrase, onSpeak, onBack, onClear, onContext, onParent }) {
  const [activeTopic, setActiveTopic] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardText, setKeyboardText] = useState("");
  const [keyboardMode, setKeyboardMode] = useState("letters");
  const [shiftOn, setShiftOn] = useState(false);
  const [keyboardSaveStatus, setKeyboardSaveStatus] = useState("");

  const actualPhrase = phraseFromProfile(profile);
  const phrase = actualPhrase || "I want to go outside with you";

  const boardProfile = useMemo(() => ({
    ...(profile || {}),
    activeContext: activeTopic,
    context: activeTopic,
    topic: activeTopic
  }), [profile, activeTopic]);

  const stageSettings = useMemo(() => normalizeStageSettings(profile), [profile]);
  const boardLimits = useMemo(() => getStageBoardLimits(profile), [profile]);
  const board = useMemo(() => getFullBoard(boardProfile), [boardProfile, actualPhrase]);
  const [routedSlice, setRoutedSlice] = useState(null);
  const [nextWordSlice, setNextWordSlice] = useState(null);

  const immediateNextWords = useMemo(() => getStaticNextWordCandidatesV5_30(profile, {
    phrase: actualPhrase,
    stage: stageSettings.communicationStage,
    limit: boardLimits.activeLimit
  }), [profile, actualPhrase, stageSettings.communicationStage, boardLimits.activeLimit]);

  useEffect(() => {
    let cancelled = false;

    if (!activeTopic || stageSettings.expandedVocabularyEnabled !== true) {
      setRoutedSlice(null);
      return () => { cancelled = true; };
    }

    setRoutedSlice({
      status: "loading_database",
      visible: [],
      hiddenCount: 0,
      source: "v5_27_lazy_bucketed_router"
    });

    getBucketedLanguageSliceV5_27Async(boardProfile, {
      stage: stageSettings.communicationStage,
      limit: boardLimits.activeLimit,
      topic: activeTopic,
      activeContext: activeTopic,
      phrase: actualPhrase
    })
      .then(slice => {
        if (!cancelled) setRoutedSlice(slice);
      })
      .catch(error => {
        if (!cancelled) {
          setRoutedSlice({
            status: "database_load_error",
            visible: [],
            hiddenCount: 0,
            error: error?.message || "Vocabulary database failed to load",
            source: "v5_27_lazy_bucketed_router"
          });
        }
      });

    return () => { cancelled = true; };
  }, [activeTopic, boardProfile, boardLimits.activeLimit, actualPhrase, stageSettings.communicationStage, stageSettings.expandedVocabularyEnabled]);

  useEffect(() => {
    let cancelled = false;

    if (activeTopic || !actualPhrase || stageSettings.expandedVocabularyEnabled !== true) {
      setNextWordSlice(null);
      return () => { cancelled = true; };
    }

    setNextWordSlice({
      status: "loading_next_words",
      visible: immediateNextWords,
      hiddenCount: 0,
      source: "v5_30_next_word_assumption"
    });

    getNextWordAssumptionSliceV5_30Async(profile, {
      phrase: actualPhrase,
      stage: stageSettings.communicationStage,
      limit: boardLimits.activeLimit
    })
      .then(slice => {
        if (!cancelled) setNextWordSlice(slice);
      })
      .catch(error => {
        if (!cancelled) {
          setNextWordSlice({
            status: "next_word_load_error_static_fallback",
            visible: immediateNextWords,
            hiddenCount: 0,
            error: error?.message || "Next-word assumptions failed",
            source: "v5_30_next_word_assumption"
          });
        }
      });

    return () => { cancelled = true; };
  }, [activeTopic, actualPhrase, profile, boardLimits.activeLimit, stageSettings.communicationStage, stageSettings.expandedVocabularyEnabled, immediateNextWords]);

  const fixedCoreLanguage = STAGED_CORE_LANGUAGE.slice(0, boardLimits.coreLimit);
  const routedWords = routedSlice?.status === "bucket_ready" ? entriesToLabels(routedSlice.visible) : [];
  const nextWords = nextWordSlice?.visible?.length ? nextWordSlice.visible : immediateNextWords;
  const fallbackHome = homeBranchForStage(stageSettings.communicationStage);
  const sentenceHasWords = Boolean(actualPhrase);
  const predictedSentenceBranch = uniqueWords([
    ...nextWords,
    ...(sentenceHasWords ? (board.contextWords || []) : [])
  ]);
  const activeBranchSource = routedWords.length
    ? routedWords
    : activeTopic && board.contextWords?.length
      ? board.contextWords
      : sentenceHasWords && predictedSentenceBranch.length
        ? predictedSentenceBranch
        : fallbackHome;
  const activeBranch = removeCoreDuplicates(activeBranchSource, fixedCoreLanguage).slice(0, boardLimits.activeLimit);
  const quickPhrases = quickPhrasesForProfile(profile, boardLimits.quickPhraseLimit);
  const visibleTopics = TOPICS.slice(0, boardLimits.topicLimit);
  const visibleSecondary = secondaryTopicsForSettings(stageSettings);
  const unifiedBoardWords = [
    ...fixedCoreLanguage.map(word => ({ word, boardArea: "core" })),
    ...activeBranch.map(word => ({ word, boardArea: "active" }))
  ];
  const name = profile?.userProfile?.name || profile?.name || "Austin";
  const profileTrackingId = profile?.userProfile?.id || profile?.id || profile?.userProfile?.name || profile?.name || "default";
  const photo = profile?.userProfile?.photoUrl || profile?.photoUrl || profile?.avatarUrl || "";

  const addWordToSentence = (word) => {
    if (word.includes(" ") && onPhrase) return onPhrase(word);
    onTap?.(word);
  };

  const selectWord = (word) => {
    if (activeTopic && topicWordHasChildren(activeTopic, word)) {
      const nextTopic = getNextTopicNode(activeTopic, word);
      setActiveTopic(nextTopic);
      return;
    }

    if (activeTopic) setActiveTopic("");
    addWordToSentence(word);
  };

  const selectTopic = (topic) => {
    setActiveTopic(topic);
    onContext?.(topic);
  };

  const clearAll = () => {
    setActiveTopic("");
    onClear?.();
  };

  const speakAndResetTopic = () => {
    setActiveTopic("");
    onSpeak?.();
  };

  const openKeyboard = () => {
    setActiveTopic("");
    setKeyboardOpen(true);
  };

  const closeKeyboard = () => {
    setKeyboardOpen(false);
    setKeyboardMode("letters");
    setShiftOn(false);
    setKeyboardSaveStatus("");
  };

  const updateKeyboardText = (value) => {
    setKeyboardSaveStatus("");
    setKeyboardText(value);
  };

  const addKeyboardText = (value) => {
    setKeyboardSaveStatus("");
    setKeyboardText(prev => `${prev}${value}`);
  };

  const backspaceKeyboardText = () => {
    setKeyboardSaveStatus("");
    setKeyboardText(prev => Array.from(prev).slice(0, -1).join(""));
  };

  const clearKeyboardText = () => {
    setKeyboardSaveStatus("");
    setKeyboardText("");
  };

  const trackKeyboardVocabulary = (action) => {
    const text = keyboardText.trim();
    if (!text) return null;

    return recordTypedVocabularyFromKeyboard(text, {
      action,
      profileId: profileTrackingId,
      profileName: name,
      source: "keyboard"
    });
  };

  const speakKeyboardText = () => {
    const text = keyboardText.trim();
    if (!text) {
      onSpeak?.();
      return;
    }

    trackKeyboardVocabulary("speak");

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const addTypedToSentence = () => {
    const text = keyboardText.trim();
    if (!text) return;
    trackKeyboardVocabulary("add-to-sentence");
    if (onPhrase) onPhrase(text);
    else addWordToSentence(text);
    setKeyboardText("");
    closeKeyboard();
  };

  const saveTypedVocabularyToCustomStore = () => {
    const text = keyboardText.trim();
    if (!text) return;

    const tracked = trackKeyboardVocabulary("save-to-board");
    const saved = saveCustomVocabularyItem(text, {
      source: "keyboard",
      profileId: profileTrackingId,
      profileName: name,
      topicPath: "custom/keyboard",
      typedTrackerEventId: tracked?.event?.id || "",
      alreadyInBuiltInTree: tracked?.primary?.alreadyInBuiltInTree ?? false
    });

    markTypedVocabularyCustomAdded(text, {
      customVocabularyId: saved?.item?.id || "",
      profileId: profileTrackingId,
      profileName: name,
      source: "keyboard"
    });

    setKeyboardSaveStatus("Saved outside the language tree.");
  };

  const renderKeyboardKey = (key, extraClass = "") => (
    <button
      key={key}
      className={`aacKeyboardKey ${extraClass}`}
      onClick={() => addKeyboardText(keyboardMode === "letters" && shiftOn ? key.toUpperCase() : key)}
    >
      {keyboardMode === "letters" && shiftOn ? key.toUpperCase() : key}
    </button>
  );

  if (keyboardOpen) {
    return (
      <section className="aacKeyboardScreen">
        <header className="aacKeyboardHeader">
          <button className="aacKeyboardBack" onClick={closeKeyboard}>← Back to Board</button>

          <textarea
            className="aacKeyboardTextBox"
            value={keyboardText}
            onChange={(event) => updateKeyboardText(event.target.value)}
            placeholder={`Type anything ${name} wants to say...`}
            autoFocus
          />

          <div className="aacKeyboardFunctionStack">
            <button className="aacKeyboardFunction speak" onClick={speakKeyboardText}>🔊 Speak</button>
            <button className="aacKeyboardFunction add" onClick={addTypedToSentence}>➕ Add</button>
            <button className="aacKeyboardFunction add" onClick={saveTypedVocabularyToCustomStore}>💾 Save</button>
            <button className="aacKeyboardFunction erase" onClick={backspaceKeyboardText}>⌫ Back</button>
            <button className="aacKeyboardFunction clear" onClick={clearKeyboardText}>🗑 Clear</button>
            {keyboardSaveStatus && (
              <div className="aacKeyboardFunction" aria-live="polite">{keyboardSaveStatus}</div>
            )}
          </div>
        </header>

        <main className="aacKeyboardBody">
          {keyboardMode === "letters" && (
            <div className="aacKeyboardRows letters">
              {LETTER_ROWS.map((row, index) => (
                <div key={`letter-row-${index}`} className="aacKeyboardRow">
                  {index === 2 && (
                    <button
                      className={`aacKeyboardKey aacKeyboardWide ${shiftOn ? "active" : ""}`}
                      onClick={() => setShiftOn(prev => !prev)}
                    >
                      ⇧ Shift
                    </button>
                  )}
                  {row.map(key => renderKeyboardKey(key))}
                  {index === 2 && (
                    <button className="aacKeyboardKey aacKeyboardWide" onClick={backspaceKeyboardText}>⌫</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {keyboardMode === "symbols" && (
            <div className="aacKeyboardRows symbols">
              {SYMBOL_ROWS.map((row, index) => (
                <div key={`symbol-row-${index}`} className="aacKeyboardRow">
                  {row.map(key => renderKeyboardKey(key))}
                </div>
              ))}
            </div>
          )}

          {keyboardMode === "emoji" && (
            <div className="aacKeyboardRows emoji">
              {EMOJI_ROWS.map((row, index) => (
                <div key={`emoji-row-${index}`} className="aacKeyboardRow">
                  {row.map(key => renderKeyboardKey(key, "emojiKey"))}
                </div>
              ))}
            </div>
          )}

          <div className="aacKeyboardBottomRow">
            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => {
              setKeyboardMode(keyboardMode === "symbols" ? "letters" : "symbols");
              setShiftOn(false);
            }}>
              {keyboardMode === "symbols" ? "ABC" : "?123"}
            </button>

            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => {
              setKeyboardMode(keyboardMode === "emoji" ? "letters" : "emoji");
              setShiftOn(false);
            }}>
              {keyboardMode === "emoji" ? "ABC" : "😊 Emoji"}
            </button>

            <button className="aacKeyboardKey aacKeyboardSpace" onClick={() => addKeyboardText(" ")}>Space</button>
            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => addKeyboardText("\n")}>↵ Line</button>
            <button className="aacKeyboardKey aacKeyboardDone" onClick={addTypedToSentence}>Add to Sentence</button>
          </div>
        </main>
      </section>
    );
  }

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
              <div className="approvedStageTag">Stage {stageSettings.communicationStage} • {boardLimits.ageBandLabel} • {unifiedBoardWords.length} buttons</div>
            </div>
          </section>

          <section className="approvedSentenceCard">
            <button className="approvedSentenceButton" onClick={speakAndResetTopic}>
              <span>{phrase}</span>
              <small>~ {Math.max(1, phrase.split(" ").length)} words</small>
            </button>
            <div className="approvedHeaderTools">
              <button className="approvedTool speak" onClick={speakAndResetTopic}>🔊 Speak</button>
              <button className="approvedTool back" onClick={onBack}>← Back</button>
              <button className="approvedTool clear" onClick={clearAll}>🗑 Clear</button>
            </div>
          </section>
        </header>

        <section className="approvedQuickPhraseRow">
          {quickPhrases.map(item => (
            <button key={item} className="approvedQuickPhrase" onClick={() => {
              setActiveTopic("");
              onPhrase ? onPhrase(item) : addWordToSentence(item);
            }}>
              <SymbolImage word={item} />
              <span>{item}</span>
            </button>
          ))}
        </section>

        <section
          className="approvedBoard approvedUnifiedBoard"
          aria-label={activeTopic ? `${titleFromContext(activeTopic)} board` : "Core and active communication board"}
        >
          <div className="approvedUnifiedBoardGrid">
            {unifiedBoardWords.map(({ word, boardArea }, index) => (
              <AACButton
                key={`${boardArea}-${word}-${index}`}
                word={word}
                onSelect={selectWord}
              />
            ))}
          </div>
        </section>
      </main>

      <aside className="approvedTopicRail">
        <section className="approvedTopicBox">
          <div className="approvedTopicsHeader">TOPICS</div>
          {visibleTopics.map(topic => (
            <button key={topic} className="approvedTopicButton" onClick={() => selectTopic(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>

        <section className="approvedSecondaryTopics">
          {visibleSecondary.map(topic => (
            <button key={topic} className="approvedSecondaryButton" onClick={() => selectTopic(topic)}>
              <SymbolImage word={topic} />
              <span>{topic}</span>
            </button>
          ))}
        </section>
      </aside>

      <nav className="approvedBottomNav">
        <button onClick={() => {
          setActiveTopic("");
          setKeyboardOpen(false);
        }}>🏠 Home</button>
        {stageSettings.keyboardEnabled && <button onClick={openKeyboard}>⌨ Keyboard</button>}
        <button onClick={onParent}>⚙ Settings</button>
        <button onClick={onParent}>📈 Insights 👑</button>
      </nav>
    </div>
  );
}
