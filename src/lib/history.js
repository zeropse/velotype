export const HISTORY_STORAGE_KEY = "velotype-history";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function makeConfigKey({
  time,
  wordCount,
  includePunctuation,
  includeNumbers,
  language,
}) {
  return [
    `t:${time}`,
    `w:${wordCount}`,
    `p:${includePunctuation ? 1 : 0}`,
    `n:${includeNumbers ? 1 : 0}`,
    `l:${language}`,
  ].join("|");
}

export function loadRuns() {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveRuns(runs) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(runs));
  } catch {
    // ignore
  }
}

export function saveRunAndCheckPB(runBase) {
  const runs = loadRuns();
  const configKey = makeConfigKey({
    time: runBase.time,
    wordCount: runBase.wordCount,
    includePunctuation: runBase.includePunctuation,
    includeNumbers: runBase.includeNumbers,
    language: runBase.language,
  });

  let previousBest = null;
  for (const r of runs) {
    if (r.configKey === configKey) {
      if (!previousBest || r.wpm > previousBest.wpm) {
        previousBest = r;
      }
    }
  }

  const isPB = !previousBest || runBase.wpm > previousBest.wpm;

  const run = {
    ...runBase,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    configKey,
  };

  runs.push(run);
  saveRuns(runs);

  return {
    isPB,
    previousBestWpm: previousBest ? previousBest.wpm : null,
    run,
  };
}
