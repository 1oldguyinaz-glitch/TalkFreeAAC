import React, { Suspense, lazy, useState } from "react";
import ChildAAC from "../child/ChildAAC.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { loadProfile, saveProfile } from "../shared/profile.js";
import { speak } from "../shared/speech.js";
import { currentPhrase, getPredictions } from "../../engine/prediction/predictionEngine.js";
import { completeSentence } from "../../engine/sentences/sentenceEngine.js";
import { addFriction } from "../../engine/friction/frictionLog.js";
import { recordUsage } from "../../engine/memory/memoryEngine.js";
import { buildSentenceRecord } from "../../engine/composer/sentenceComposer.js";
import { addTimelineEvent } from "../../engine/timeline/timelineEngine.js";
import { isNavigationButton } from "../../engine/navigation/navigationEngine.js";
import { recordPhraseUse } from "../../engine/language/favoritePhraseEngine.js";
import { recordConversationPattern } from "../../engine/prediction/conversationMemory.js";
import { recordPredictionOutcome } from "../../engine/prediction/adaptiveLearningEngine.js";
import { ensureCommunicationProfile } from "../../engine/profile/userCommunicationProfile.js";
import { compactProfileForStorage } from "../../engine/performance/storageHealthEngine.js";
import { shouldSpeakEachWordOnTap } from "../../engine/voice/voiceSettings.js";
import "../styles/parent.css";
import "../styles/adaptive-ui.css";
import "../styles/professional-insights.css";
import "../styles/prediction-ui.css";
import "../styles/reports.css";
import "../styles/release.css";

const ParentMenu = lazy(() => import("../parent/ParentMenu.jsx"));

function AppContent() {
  const [profile, setProfileState] = useState(ensureCommunicationProfile(loadProfile()));
  const [screen, setScreen] = useState("child");

  function setProfile(next) {
    const safe = compactProfileForStorage(ensureCommunicationProfile(next));
    setProfileState(saveProfile(safe));
  }

  function tapWord(word) {
    if (isNavigationButton(word)) {
      changeContext(word);
      return;
    }

    const visiblePredictions = getPredictions(profile);
    const learned = recordPredictionOutcome(profile, word, visiblePredictions);
    const before = currentPhrase(learned.sentence);
    const updated = recordUsage(learned, word, before);

    setProfile({
      ...updated,
      sentence: [...(learned.sentence || []), word],
      justCompletedSentence: false
    });

    if (shouldSpeakEachWordOnTap(profile)) speak(word, profile);
  }

  function tapPhrase(phrase) {
    if (!phrase) return;

    const visiblePredictions = getPredictions(profile);
    const learned = recordPredictionOutcome(profile, phrase, visiblePredictions);
    const parts = String(phrase).split(" ").filter(Boolean);
    const updated = recordPhraseUse(learned, phrase);

    setProfile({
      ...updated,
      sentence: [...(learned.sentence || []), ...parts],
      recentWords: [...parts, ...(learned.recentWords || [])].slice(0, 40),
      justCompletedSentence: false
    });

    if (shouldSpeakEachWordOnTap(profile)) speak(phrase, profile);
  }

  function speakSentence() {
    const phrase = currentPhrase(profile.sentence);
    if (!phrase) return;

    const record = buildSentenceRecord(profile);
    speak(phrase, profile);

    const withPhrase = recordPhraseUse(profile, phrase);
    const withPattern = recordConversationPattern(withPhrase, phrase);
    const completed = completeSentence(withPattern);

    setProfile(addTimelineEvent(completed, {
      type: "communication",
      text: record.phrase,
      tags: record.tags,
      context: record.context,
      metadata: { intent: record.intent, wordCount: record.wordCount }
    }));
  }

  function changeContext(ctx) {
    const recentContexts = [ctx, ...(profile.recentContexts || []).filter(c => c !== ctx)].slice(0, 10);
    setProfile({ ...profile, activeContext: ctx, recentContexts });
  }

  return (
    <div className="app">
      {screen === "child" ? (
        <ChildAAC
          profile={profile}
          onTap={tapWord}
          onPhrase={tapPhrase}
          onSpeak={speakSentence}
          onComplete={speakSentence}
          onBack={() => setProfile({ ...profile, sentence: (profile.sentence || []).slice(0, -1) })}
          onClear={() => setProfile({ ...profile, sentence: [] })}
          onContext={changeContext}
          onFriction={issue => setProfile(addFriction(profile, issue))}
          onParent={() => setScreen("parent")}
        />
      ) : (
        <Suspense fallback={<div className="parentShellV4"><p>Loading parent settings...</p></div>}>
          <ParentMenu profile={profile} setProfile={setProfile} onBack={() => setScreen("child")} />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
