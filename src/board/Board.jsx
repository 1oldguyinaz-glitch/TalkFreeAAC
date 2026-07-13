import React, { useMemo, useState } from 'react';
import { AGE_BANDS, COLUMN_DEFINITIONS, STAGE_DEFINITIONS } from './constants.js';
import { useBoardMachine } from './useBoardMachine.js';
import { useBoardCatalog } from '../data/useBoardCatalog.js';
import { EARLY_CHILDHOOD_STAGE_1_CATALOG } from '../data/earlyChildhoodStage1Catalog.js';
import { firstVisibleWordPage } from './catalogSelectors.js';
import { InterruptRow } from './InterruptRow.jsx';
import { SentenceBar } from './SentenceBar.jsx';
import { BoardColumn } from './BoardColumn.jsx';

function lastLanguageToken(sentence) {
  for (let index = sentence.length - 1; index >= 0; index -= 1) {
    if ((sentence[index]?.column ?? 0) >= 1) return sentence[index];
  }
  return null;
}

function countProfileWords(catalog) {
  return Object.values(catalog).reduce(
    (total, column) =>
      total + column.buckets.reduce(
        (columnTotal, bucket) => columnTotal + bucket.words.length,
        0
      ),
    0
  );
}

export function Board() {
  const { state, actions } = useBoardMachine(1);
  const { catalog, manifest, directoriesReady, error, loadColumnWords } = useBoardCatalog();
  const [interactionError, setInteractionError] = useState('');

  const usesEarlyChildhoodStageOne =
    state.ageBand === 'early_childhood' && state.stage === 1;

  const displayedCatalog = usesEarlyChildhoodStageOne
    ? EARLY_CHILDHOOD_STAGE_1_CATALOG
    : catalog;

  const previousToken = lastLanguageToken(state.sentence);
  const context = useMemo(() => ({
    stage: state.stage,
    ageBand: state.ageBand,
    previousToken,
    pendingVerb: state.pendingVerb,
    sentence: state.sentence
  }), [state.stage, state.ageBand, previousToken, state.pendingVerb, state.sentence]);

  const runtimeActions = useMemo(() => ({
    ...actions,
    openBucket: async (column, bucket) => {
      try {
        setInteractionError('');

        if (usesEarlyChildhoodStageOne) {
          const firstPage = firstVisibleWordPage(bucket.words ?? [], context);
          actions.openBucket(column, bucket, firstPage);
          return;
        }

        const wordsPayload = await loadColumnWords(column);
        const firstPage = firstVisibleWordPage(
          wordsPayload.buckets?.[bucket.id] ?? [],
          context
        );
        actions.openBucket(column, bucket, firstPage);
      } catch (loadError) {
        setInteractionError(loadError.message);
      }
    }
  }), [actions, context, loadColumnWords, usesEarlyChildhoodStageOne]);

  const vocabularyCount = usesEarlyChildhoodStageOne
    ? countProfileWords(EARLY_CHILDHOOD_STAGE_1_CATALOG)
    : manifest?.displayWordCountsByAgeStage?.[state.ageBand]?.[String(state.stage)] ?? null;

  if (!directoriesReady && !error) {
    return <main className="boardShell boardLoading" aria-busy="true"><h1>TalkFreeAAC Board Core</h1><p>Loading the six-column language directories…</p></main>;
  }

  if (error && !directoriesReady) {
    return <main className="boardShell boardError" role="alert"><h1>Catalog could not be loaded</h1><p>{error.message}</p></main>;
  }

  return (
    <main className="boardShell">
      <header className="appHeader">
        <div>
          <p className="eyebrow">TalkFreeAAC</p>
          <h1>Six-Column Board Core</h1>
          <p className="profileSummary">
            {STAGE_DEFINITIONS[state.stage].label} · {AGE_BANDS[state.ageBand].label}
            {vocabularyCount != null ? ` · ${vocabularyCount.toLocaleString()} available words` : ''}
          </p>
        </div>
        <div className="profileControls">
          <label className="stageControl">
            <span>Communication stage</span>
            <select value={state.stage} onChange={(event) => actions.setStage(Number(event.target.value))}>
              {Object.values(STAGE_DEFINITIONS).map((definition) => (
                <option key={definition.id} value={definition.id}>
                  Stage {definition.id}: {definition.label} ({definition.path.join(' → ')})
                </option>
              ))}
            </select>
          </label>
          <label className="stageControl">
            <span>Age band</span>
            <select value={state.ageBand} onChange={(event) => actions.setAgeBand(event.target.value)}>
              {Object.values(AGE_BANDS).map((ageBand) => (
                <option key={ageBand.id} value={ageBand.id}>{ageBand.label} ({ageBand.range})</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <p className="stageDescription">{STAGE_DEFINITIONS[state.stage].description}</p>
      {interactionError ? <p className="catalogErrorBanner" role="alert">{interactionError}</p> : null}
      <InterruptRow onInterrupt={actions.interrupt} />
      <SentenceBar sentence={state.sentence} onUndo={actions.undo} onResetBoard={actions.resetBoard} />

      <div className="boardViewport" aria-label="Six-column grammatical board">
        <div className="sixColumnGrid">
          {COLUMN_DEFINITIONS.map((definition) => (
            <BoardColumn key={definition.id} definition={definition} catalog={displayedCatalog}
              view={state.columnViews[definition.id]} state={state}
              actions={runtimeActions} context={context} />
          ))}
        </div>
      </div>

      <p className="screenReaderStatus" aria-live="assertive">{state.lastAnnouncement}</p>
    </main>
  );
}
