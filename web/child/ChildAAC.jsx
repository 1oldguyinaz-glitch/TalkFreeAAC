import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  currentPhrase,
  getFullBoard,
  getNextTopicNode,
  topicWordHasChildren
} from "../../engine/prediction/predictionEngine.js";
import AACButton from "./components/AACButton.jsx";
import BoardStateBanner from "./components/BoardStateBanner.jsx";
import SymbolImage from "./components/SymbolImage.jsx";
import { speak as speakText } from "../shared/speech.js";
import {
  recordTypedVocabularyFromKeyboard,
  markTypedVocabularyCustomAdded
} from "../../engine/storage/typedVocabularyTracker.js";
import {
  saveCustomVocabularyItem
} from "../../engine/storage/customVocabularyStore.js";
import {
  getStaticNextWordCandidatesV5_31
} from "../../engine/prediction/nextWordAssumptionEngine.js";
import {
  getSemanticBucketByIdV5_32,
  getSemanticBucketByLabelV5_32,
  getSemanticBucketsForPhraseV5_32,
  getStaticSemanticBucketWordsV5_32
} from "../../engine/prediction/semanticBucketRouter.js";
import {
  getStageBoardLimits,
  normalizeStageSettings
} from "../../engine/display/stageSettings.js";
import { getViewportFitLayoutV7_5 } from "../../engine/display/viewportFit.js";
import { getQuickPhrases } from "../../engine/display/quickPhraseSettings.js";
import {
  buildBoardStateV5_35,
  parentTopicFromPath,
  topicPathAtIndex
} from "../../engine/navigation/boardStateEngine.js";
import "../styles/aac-keyboard.css";
import "../styles/aac-unified-board.css";

// Stable motor plan order. Higher stages reveal more cells; lower stages never get flooded.
const STAGED_CORE_LANGUAGE = [
  "I", "want", "need", "help", "stop", "yes",
  "no", "more", "like", "you", "me", "to", "my",
  "finished", "feel", "am", "can", "don't", "love",
  "have", "see", "hear", "think", "go", "get", "do"
];

const HOME_BRANCH_BY_STAGE = {
  1: [
    "I'm", "this", "that", "it", "with", "to",
    "food", "drink", "water", "break", "bathroom", "hurt"
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
  const [semanticBucketId, setSemanticBucketId] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardText, setKeyboardText] = useState("");
  const [keyboardMode, setKeyboardMode] = useState("letters");
  const [shiftOn, setShiftOn] = useState(false);
  const [keyboardSaveStatus, setKeyboardSaveStatus] = useState("");
  const layoutMainRef = useRef(null);
  const boardSectionsRef = useRef(null);
  const [fitViewport, setFitViewport] = useState({ width: 1024, height: 768, boardWidth: 900 });

  useEffect(() => {
    const main = layoutMainRef.current;
    const boardSections = boardSectionsRef.current;
    if (!main || !boardSections) return undefined;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mainRect = main.getBoundingClientRect();
        const boardRect = boardSections.getBoundingClientRect();
        const next = {
          width: Math.max(260, Math.round(mainRect.width)),
          height: Math.max(320, Math.round(mainRect.height)),
          boardWidth: Math.max(220, Math.round(boardRect.width))
        };
        setFitViewport(previous => (
          Math.abs(previous.width - next.width) < 2 &&
          Math.abs(previous.height - next.height) < 2 &&
          Math.abs(previous.boardWidth - next.boardWidth) < 2
        ) ? previous : next);
      });
    };

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(main);
    observer?.observe(boardSections);
    window.addEventListener("resize", measure, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

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
  // V7.0.2 performance rule: the live child board must be static-first.
  // Do not lazy-load or scan the 10k language database during tap/bucket navigation.
  // Heavy vocabulary enrichment belongs behind Search/More/admin flows, not the active board.

  const immediateNextWords = useMemo(() => getStaticNextWordCandidatesV5_31(profile, {
    phrase: actualPhrase,
    stage: stageSettings.communicationStage,
    limit: boardLimits.activeLimit
  }), [profile, actualPhrase, stageSettings.communicationStage, boardLimits.activeLimit]);

  const semanticBuckets = useMemo(() => getSemanticBucketsForPhraseV5_32(profile, {
    phrase: actualPhrase,
    stage: stageSettings.communicationStage,
    bucketLimit: Math.min(boardLimits.activeLimit, boardLimits.topicLimit + 2)
  }), [profile, actualPhrase, stageSettings.communicationStage, boardLimits.activeLimit, boardLimits.topicLimit]);

  const fixedCoreLanguage = STAGED_CORE_LANGUAGE.slice(0, boardLimits.coreLimit);
  const routedWords = [];
  const nextWords = immediateNextWords;
  const fallbackHome = homeBranchForStage(stageSettings.communicationStage);
  const sentenceHasWords = Boolean(actualPhrase);
  const semanticBucket = semanticBucketId ? getSemanticBucketByIdV5_32(semanticBucketId) : null;
  const semanticBucketLabels = semanticBuckets.map(bucket => bucket.label);
  const semanticBucketReserve = Math.min(
    semanticBucketLabels.length,
    stageSettings.communicationStage === 1 ? 4 : stageSettings.communicationStage === 2 ? 5 : 6
  );
  const semanticDirectReserve = Math.max(4, boardLimits.activeLimit - semanticBucketReserve);
  const semanticDirectWords = removeCoreDuplicates(nextWords, fixedCoreLanguage);
  const semanticMixedBranch = uniqueWords([
    ...semanticDirectWords.slice(0, semanticDirectReserve),
    ...semanticBucketLabels.slice(0, semanticBucketReserve)
  ]);
  const semanticBucketWords = semanticBucketId
    ? getStaticSemanticBucketWordsV5_32(semanticBucketId, profile, {
      phrase: actualPhrase,
      stage: stageSettings.communicationStage,
      limit: boardLimits.activeLimit
    })
    : [];
  const predictedSentenceBranch = uniqueWords([
    ...nextWords,
    ...(sentenceHasWords ? (board.contextWords || []) : [])
  ]);

  let activeBranchSource = fallbackHome;
  let activeBranchMode = "home";

  if (semanticBucketWords.length) {
    activeBranchSource = semanticBucketWords;
    activeBranchMode = "semanticLeafWords";
  } else if (routedWords.length) {
    activeBranchSource = routedWords;
    activeBranchMode = "topicWords";
  } else if (activeTopic && board.contextWords?.length) {
    activeBranchSource = board.contextWords;
    activeBranchMode = "topicWords";
  } else if (sentenceHasWords && semanticBucketLabels.length) {
    // V7.1 shows high-confidence direct words and meaning buckets together.
    // This preserves multi-path access while reducing the extra tap required by bucket-only routing.
    activeBranchSource = semanticMixedBranch;
    activeBranchMode = "semanticMixed";
  } else if (sentenceHasWords && predictedSentenceBranch.length) {
    activeBranchSource = predictedSentenceBranch;
    activeBranchMode = "predictionWords";
  }

  const activeBranch = removeCoreDuplicates(activeBranchSource, fixedCoreLanguage).slice(0, boardLimits.activeLimit);
  const activeSliceState = null;
  const boardState = buildBoardStateV5_35({
    phrase: actualPhrase,
    activeTopic,
    semanticBucket,
    activeBranchMode,
    activeBranchCount: activeBranch.length,
    loadingStatus: "",
    error: "",
    hiddenCount: 0
  });
  const boardVisualKey = `${boardState.mode}:${activeTopic}:${semanticBucketId}:${activeBranchMode}:${activeBranch.join("|")}`;

  const isSemanticBucketNavigationWord = (word) => {
    return ["semanticBucketChoices", "semanticMixed"].includes(activeBranchMode) && Boolean(getSemanticBucketByLabelV5_32(word));
  };

  const isTopicBucketNavigationWord = (word) => {
    return Boolean(activeTopic && topicWordHasChildren(activeTopic, word));
  };

  const isNavigationBucketWord = (word) => {
    return isSemanticBucketNavigationWord(word) || isTopicBucketNavigationWord(word);
  };
  const quickPhrases = getQuickPhrases(profile, boardLimits.quickPhraseLimit);
  const visibleTopics = TOPICS.slice(0, boardLimits.topicLimit);
  const visibleSecondary = secondaryTopicsForSettings(stageSettings);
  const boardTopics = uniqueWords([...visibleTopics, ...visibleSecondary]).slice(0, 12);
  const fitLayout = getViewportFitLayoutV7_5({
    width: fitViewport.width,
    height: fitViewport.height,
    boardWidth: fitViewport.boardWidth,
    topicCount: boardTopics.length,
    coreCount: fixedCoreLanguage.length,
    activeCount: activeBranch.length,
    quickCount: quickPhrases.length
  });
  const {
    boardColumns,
    quickColumns,
    topicRows,
    coreRows,
    activeRows,
    quickRows,
    quickTrack
  } = fitLayout;
  const unifiedBoardWords = [
    ...fixedCoreLanguage.map(word => ({ word, boardArea: "core", isBucket: false })),
    ...activeBranch.map(word => ({ word, boardArea: "active", isBucket: isNavigationBucketWord(word) }))
  ];
  const name = profile?.userProfile?.name || profile?.name || "Austin";
  const profileTrackingId = profile?.userProfile?.id || profile?.id || profile?.userProfile?.name || profile?.name || "default";
  const photo = profile?.userProfile?.photoUrl || profile?.userProfile?.photo || profile?.userProfile?.avatar || profile?.photoUrl || profile?.photo || profile?.avatarUrl || profile?.avatar || "";
  const boardDisplayStyle = {
    "--aac-board-columns": boardColumns,
    "--aac-topic-rows": topicRows,
    "--aac-core-rows": coreRows,
    "--aac-active-rows": activeRows,
    "--aac-topic-track": `${topicRows}fr`,
    "--aac-core-track": `${coreRows}fr`,
    "--aac-active-track": `${activeRows}fr`,
    "--aac-quick-columns": quickColumns,
    "--aac-quick-rows": quickRows,
    "--aac-quick-track": `${quickTrack}px`
  };

  const addWordToSentence = (word) => {
    setSemanticBucketId("");
    if (word.includes(" ") && onPhrase) return onPhrase(word);
    onTap?.(word);
  };

  const selectWord = (word) => {
    if (isSemanticBucketNavigationWord(word)) {
      const nextBucket = getSemanticBucketByLabelV5_32(word);
      if (nextBucket) {
        setSemanticBucketId(nextBucket.id);
        setActiveTopic("");
        onContext?.(`semantic/${nextBucket.id}`);
        return;
      }
    }

    if (isTopicBucketNavigationWord(word)) {
      const nextTopic = getNextTopicNode(activeTopic, word);
      setActiveTopic(nextTopic);
      setSemanticBucketId("");
      onContext?.(nextTopic);
      return;
    }

    if (activeTopic) setActiveTopic("");
    addWordToSentence(word);
  };

  const selectTopic = (topic) => {
    setSemanticBucketId("");
    setActiveTopic(topic);
    onContext?.(topic);
  };

  const navigateHome = () => {
    setActiveTopic("");
    setSemanticBucketId("");
    setKeyboardOpen(false);
    onContext?.("home");
  };

  const handleBackAction = () => {
    if (semanticBucketId) {
      setSemanticBucketId("");
      onContext?.("semantic");
      return;
    }

    if (activeTopic) {
      const parentTopic = parentTopicFromPath(activeTopic);
      setActiveTopic(parentTopic);
      onContext?.(parentTopic || "home");
      return;
    }

    onBack?.();
  };

  const handleBreadcrumbNavigation = (item) => {
    if (!item) return;

    if (item.type === "home") {
      navigateHome();
      return;
    }

    if (item.type === "phrase") {
      setActiveTopic("");
      setSemanticBucketId("");
      onContext?.("prediction");
      return;
    }

    if (item.type === "topic") {
      const nextTopic = topicPathAtIndex(activeTopic, item.index);
      setActiveTopic(nextTopic);
      setSemanticBucketId("");
      onContext?.(nextTopic || "home");
    }
  };

  const clearAll = () => {
    setActiveTopic("");
    setSemanticBucketId("");
    onClear?.();
  };

  const speakAndResetTopic = () => {
    setActiveTopic("");
    setSemanticBucketId("");
    onSpeak?.();
  };

  const openKeyboard = () => {
    setActiveTopic("");
    setSemanticBucketId("");
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

    speakText(text, profile);
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
    <div className="approvedAacShell layoutSketchShell" style={boardDisplayStyle}>
      <main ref={layoutMainRef} className="approvedMain layoutSketchMain">
        <header className="approvedSketchTopBar">
          <section className="approvedSketchBrand" aria-label="TalkFreeAAC logo">
            <div className="approvedBrandName compact">Talk<span>Free</span>AAC</div>
            <div className="approvedStageTag compact">Stage {stageSettings.communicationStage} • {boardLimits.ageBandLabel}</div>
          </section>

          <button className="approvedSketchProfile" onClick={onParent} aria-label={`Open ${name}'s profile and settings`}>
            {photo ? <img src={photo} alt="" /> : <span>{name.slice(0,1).toUpperCase()}</span>}
            <span className="approvedSketchProfileCopy">
              <strong>{name}</strong>
            </span>
          </button>
        </header>

        <section className="approvedSketchSentenceRow" aria-label="Sentence builder">
          <button className="approvedSentenceButton sketchSentence" onClick={speakAndResetTopic}>
            <span>{phrase}</span>
            <small>{Math.max(1, phrase.split(" ").length)} words</small>
          </button>

          <div className="approvedSketchSpeechStack">
            <button className="approvedSketchSpeak" onClick={speakAndResetTopic}>🔊 Speak</button>
            <div className="approvedSketchMiniTools">
              <button onClick={handleBackAction}>← Back</button>
              <button onClick={clearAll}>Clear</button>
            </div>
          </div>
        </section>

        <section className="approvedQuickPhraseRow sketchQuickPhrases" aria-label="Saved quick-use phrases">
          {quickPhrases.map(item => (
            <button key={item} className="approvedQuickPhrase" onClick={() => {
              setActiveTopic("");
              setSemanticBucketId("");
              onPhrase ? onPhrase(item) : addWordToSentence(item);
            }}>
              <SymbolImage word={item} profile={profile} />
              <span>{item}</span>
            </button>
          ))}
        </section>

        <section
          className={`approvedBoard approvedUnifiedBoard sketchBoardShell ${stageSettings.keyboardEnabled ? "hasKeyboardRail" : "noKeyboardRail"} ${boardState.mode === "home" ? "homeBoardState" : "hasBoardState"}`}
          aria-label={semanticBucket ? `${semanticBucket.label} semantic bucket board` : activeTopic ? `${titleFromContext(activeTopic)} board` : "Core and active communication board"}
        >
          {stageSettings.keyboardEnabled && (
            <button className="sketchKeyboardRail" onClick={openKeyboard} aria-label="Open keyboard">
              <span className="sketchKeyboardArrow" aria-hidden="true">›</span>
              <span className="sketchKeyboardIcon" aria-hidden="true">⌨</span>
              <strong>Keyboard</strong>
            </button>
          )}

          {boardState.mode !== "home" && (
            <BoardStateBanner
              boardState={boardState}
              onNavigate={handleBreadcrumbNavigation}
              onBack={handleBackAction}
              onHome={navigateHome}
            />
          )}

          <div ref={boardSectionsRef} className="sketchBoardSections" data-board-visual-key={boardVisualKey}>
            <section className="sketchBoardBand sketchTopicBand" aria-label="Topics and buckets">
              <div className="sketchBandLabel">Topics</div>
              <div className="sketchTopicGrid">
                {boardTopics.map(topic => (
                  <button key={topic} className="approvedBoardTopicButton" onClick={() => selectTopic(topic)}>
                    <SymbolImage word={topic} profile={profile} />
                    <span>{topic}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="sketchBoardBand sketchCoreBand" aria-label="Core words">
              <div className="sketchBandLabel">Core Words</div>
              <div className="sketchCoreGrid">
                {fixedCoreLanguage.map((word, index) => (
                  <AACButton
                    key={`core-${word}-${index}`}
                    word={word}
                    onSelect={selectWord}
                    isBucket={false}
                    profile={profile}
                  />
                ))}
              </div>
            </section>

            <section className="sketchBoardBand sketchActiveBand" aria-label="Active words">
              <div className="sketchBandLabel">Active Words</div>
              <div className="sketchActiveGrid boardGridTransition">
                {activeBranch.map((word, index) => (
                  <AACButton
                    key={`active-${word}-${index}`}
                    word={word}
                    onSelect={selectWord}
                    isBucket={isNavigationBucketWord(word)}
                    profile={profile}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
