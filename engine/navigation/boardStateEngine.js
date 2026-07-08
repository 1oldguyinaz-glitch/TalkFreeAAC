// TalkFreeAAC V5.35 — Board State Clarity Engine
// Pure local UI-state helpers. No speech output. No external AI.

function clean(value = "") {
  return String(value || "")
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value = "") {
  const text = clean(value);
  if (!text) return "";
  return text
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map(part => {
      if (part.toLowerCase() === "i'm") return "I'm";
      if (part.toLowerCase() === "aac") return "AAC";
      return part.slice(0, 1).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function splitPhrasePath(phrase = "") {
  const text = clean(phrase);
  if (!text) return [];
  return text
    .split(" ")
    .filter(Boolean)
    .slice(-4)
    .map(token => titleCase(token));
}

function splitTopicPath(topic = "") {
  const text = clean(topic);
  if (!text) return [];
  return text
    .split("/")
    .map(part => titleCase(part))
    .filter(Boolean);
}

function includesLoading(status = "") {
  return String(status || "").toLowerCase().includes("loading");
}

function includesError(status = "") {
  return String(status || "").toLowerCase().includes("error");
}

function helperForMode({ mode, activeLabel, activeBranchMode }) {
  if (mode === "semanticBucket") return `Choose a ${activeLabel.toLowerCase()} word.`;
  if (mode === "semanticBuckets") return "Choose what kind of meaning.";
  if (mode === "topic") return `Choose from ${activeLabel}.`;
  if (mode === "prediction") return "Choose the next word.";
  if (activeBranchMode === "semanticBucketChoices") return "Choose a meaning bucket.";
  return "Say something.";
}

export function buildBoardStateV5_35({
  phrase = "",
  activeTopic = "",
  semanticBucket = null,
  activeBranchMode = "home",
  activeBranchCount = 0,
  loadingStatus = "",
  error = "",
  hiddenCount = 0
} = {}) {
  const phrasePath = splitPhrasePath(phrase);
  const topicPath = splitTopicPath(activeTopic);
  const bucketLabel = semanticBucket?.label || "";

  let mode = "home";
  let activeLabel = "Home";
  let bucketPath = [];

  if (bucketLabel) {
    mode = "semanticBucket";
    activeLabel = bucketLabel;
    bucketPath = [titleCase(bucketLabel)];
  } else if (activeBranchMode === "semanticBucketChoices") {
    mode = "semanticBuckets";
    activeLabel = phrasePath.length ? phrasePath[phrasePath.length - 1] : "Meaning";
  } else if (topicPath.length) {
    mode = "topic";
    activeLabel = topicPath[topicPath.length - 1];
    bucketPath = topicPath;
  } else if (phrasePath.length) {
    mode = "prediction";
    activeLabel = phrasePath[phrasePath.length - 1];
  }

  const breadcrumbItems = [
    { id: "home", label: "Home", type: "home", actionable: true },
    ...phrasePath.map((label, index) => ({
      id: `phrase-${index}-${label}`,
      label,
      type: "phrase",
      index,
      actionable: index < phrasePath.length - 1 || Boolean(bucketLabel)
    })),
    ...bucketPath.map((label, index) => ({
      id: `bucket-${index}-${label}`,
      label,
      type: topicPath.length ? "topic" : "bucket",
      index,
      actionable: index < bucketPath.length - 1
    }))
  ];

  const isLoading = includesLoading(loadingStatus);
  const hasError = Boolean(error) || includesError(loadingStatus);
  const isEmpty = !isLoading && !activeBranchCount && mode !== "home";
  const helperText = hasError
    ? "More words are unavailable right now. Core words still work."
    : isEmpty
      ? "No extra words here yet. Try Back, Home, or another bucket."
      : helperForMode({ mode, activeLabel, activeBranchMode });

  return {
    mode,
    activeLabel,
    phrasePath,
    bucketPath,
    breadcrumbItems,
    helperText,
    isLoading,
    hasError,
    errorText: error || "",
    isEmpty,
    hiddenCount: Number(hiddenCount || 0),
    liveLabel: `${activeLabel}. ${helperText}`
  };
}

export function parentTopicFromPath(topic = "") {
  const parts = clean(topic).split("/").filter(Boolean);
  if (parts.length <= 1) return "";
  return parts.slice(0, -1).join("/");
}

export function topicPathAtIndex(topic = "", index = 0) {
  const parts = clean(topic).split("/").filter(Boolean);
  return parts.slice(0, index + 1).join("/");
}
