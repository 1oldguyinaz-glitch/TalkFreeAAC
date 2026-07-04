import React, { useState } from "react";
import ChildAAC from "../child/ChildAAC.jsx";
import ParentMenu from "../parent/ParentMenu.jsx";
import { loadProfile, saveProfile } from "../shared/profile.js";
import { speak } from "../shared/speech.js";
import { currentPhrase } from "../../engine/prediction/predictionEngine.js";
import { completeSentence } from "../../engine/sentences/sentenceEngine.js";
import { addFriction } from "../../engine/friction/frictionLog.js";
import { recordUsage } from "../../engine/memory/memoryEngine.js";
import { buildSentenceRecord } from "../../engine/composer/sentenceComposer.js";
import { addTimelineEvent } from "../../engine/timeline/timelineEngine.js";
import { isNavigationButton } from "../../engine/navigation/navigationEngine.js";

export default function App() {
  const [profile, setProfileState] = useState(loadProfile());
  const [screen, setScreen] = useState("child");

  function setProfile(next) {
    setProfileState(saveProfile(next));
  }

  function tapWord(word) {
    if (isNavigationButton(word)) {
      changeContext(word);
      return;
    }
    const before = currentPhrase(profile.sentence);
    const updated = recordUsage(profile, word, before);
    setProfile({ ...updated, sentence: [...(profile.sentence || []), word], justCompletedSentence: false });
    speak(word);
  }

  function speakSentence() {
    const phrase = currentPhrase(profile.sentence);
    if (!phrase) return;
    const record = buildSentenceRecord(profile);
    speak(phrase);
    const completed = completeSentence(profile);
    setProfile(addTimelineEvent(completed, { type: "communication", text: record.phrase, tags: record.tags, context: record.context, metadata: { intent: record.intent, wordCount: record.wordCount } }));
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
          onSpeak={speakSentence}
          onComplete={speakSentence}
          onBack={() => setProfile({ ...profile, sentence: (profile.sentence || []).slice(0, -1) })}
          onClear={() => setProfile({ ...profile, sentence: [] })}
          onContext={changeContext}
          onFriction={issue => setProfile(addFriction(profile, issue))}
          onParent={() => setScreen("parent")}
        />
      ) : (
        <ParentMenu profile={profile} setProfile={setProfile} onBack={() => setScreen("child")} />
      )}
    </div>
  );
}
