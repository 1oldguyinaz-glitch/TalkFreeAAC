// TalkFreeAAC V7.5 — automatic viewport-fit layout
// The communication board owns sizing. Users do not have to resize tiles manually.

export function clampNumberV7_5(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

export function rowCountV7_5(itemCount, columns) {
  return Math.max(1, Math.ceil(Math.max(0, Number(itemCount) || 0) / Math.max(1, Number(columns) || 1)));
}

export function chooseBoardColumnsV7_5({ width, height, counts = [] } = {}) {
  const safeWidth = Math.max(220, Number(width) || 0);
  const safeHeight = Math.max(320, Number(height) || 0);

  let columns = safeWidth >= 1380 ? 12
    : safeWidth >= 1120 ? 10
      : safeWidth >= 900 ? 9
        : safeWidth >= 700 ? 8
          : safeWidth >= 520 ? 7
            : safeWidth >= 360 ? 6
              : 5;

  const maximumColumns = safeWidth < 360 ? 8
    : safeWidth < 520 ? 8
      : safeWidth < 700 ? 9
        : safeWidth < 900 ? 10
          : 12;
  const targetRows = safeHeight < 560 ? 8 : safeHeight < 720 ? 9 : 10;
  const totalRows = candidate => counts.reduce(
    (sum, count) => sum + rowCountV7_5(count, candidate),
    0
  );

  while (columns < maximumColumns && totalRows(columns) > targetRows) columns += 1;
  return columns;
}

export function chooseQuickColumnsV7_5({ width, height, itemCount } = {}) {
  const safeWidth = Math.max(220, Number(width) || 0);
  const safeHeight = Math.max(320, Number(height) || 0);
  const safeCount = Math.max(1, Number(itemCount) || 1);

  if (safeHeight < 520) return safeCount;
  if (safeWidth >= 1180) return Math.min(safeCount, 10);
  if (safeWidth >= 880) return Math.min(safeCount, 8);
  if (safeWidth >= 640) return Math.min(safeCount, 6);
  return Math.min(safeCount, 5);
}

export function getViewportFitLayoutV7_5({
  width = 1024,
  height = 768,
  boardWidth = width,
  topicCount = 0,
  coreCount = 0,
  activeCount = 0,
  quickCount = 0
} = {}) {
  const boardColumns = chooseBoardColumnsV7_5({
    width: boardWidth,
    height,
    counts: [topicCount, coreCount, activeCount]
  });
  const quickColumns = chooseQuickColumnsV7_5({ width, height, itemCount: quickCount });
  const topicRows = rowCountV7_5(topicCount, boardColumns);
  const coreRows = rowCountV7_5(coreCount, boardColumns);
  const activeRows = rowCountV7_5(activeCount, boardColumns);
  const quickRows = rowCountV7_5(quickCount, quickColumns);
  const quickTrack = Math.round(clampNumberV7_5(
    height * (quickRows > 1 ? 0.16 : 0.105),
    quickRows > 1 ? 76 : 52,
    quickRows > 1 ? 124 : 92
  ));

  return {
    boardColumns,
    quickColumns,
    topicRows,
    coreRows,
    activeRows,
    quickRows,
    quickTrack,
    totalBoardRows: topicRows + coreRows + activeRows
  };
}
