export function createDwellState() {
  return {
    targetWord: null,
    startedAt: null,
    dwellMs: 900,
    ready: false
  };
}

export function startDwell(word, dwellMs = 900) {
  return {
    targetWord: word,
    startedAt: Date.now(),
    dwellMs,
    ready: false
  };
}

export function updateDwell(state) {
  if (!state?.targetWord || !state.startedAt) return createDwellState();
  const elapsed = Date.now() - state.startedAt;
  return {
    ...state,
    elapsed,
    ready: elapsed >= state.dwellMs
  };
}

export function cancelDwell() {
  return createDwellState();
}
