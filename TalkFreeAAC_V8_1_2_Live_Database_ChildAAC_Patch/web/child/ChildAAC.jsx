import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import StateMachineTile from "./components/StateMachineTile.jsx";
import { speak as speakText } from "../shared/speech.js";
import {
  recordTypedVocabularyFromKeyboard,
  markTypedVocabularyCustomAdded
} from "../../engine/storage/typedVocabularyTracker.js";
import { saveCustomVocabularyItem } from "../../engine/storage/customVocabularyStore.js";
import {
  getFitzgeraldBucketDirectoryV8_1,
  getFitzgeraldColumnSliceV8_1,
  getFitzgeraldColumnSliceV8_1Async,
  isEntryActiveInGrammarStateV8_1
} from "../../engine/language/languageDatabaseRouterV5_27.js";
import {
  getStageBoardLimits,
  normalizeStageSettings
} from "../../engine/display/stageSettings.js";
import "../styles/aac-keyboard.css";
import "../styles/aac-state-machine.css";

const COLUMN_SLOT_COUNT = 10;
const ROOT_BUCKET_PAGE_SIZE = 10;

const COLUMN_DEFINITIONS = [
  {
    grid_column: 1,
    title: "Initiators",
    subtitle: "Pronouns • Questions",
    rootBuckets: ["core_words", "question"]
  },
  {
    grid_column: 2,
    title: "Core Actions",
    subtitle: "Verbs",
    rootBuckets: ["core_words", "activity"]
  },
  {
    grid_column: 3,
    title: "Modifiers",
    subtitle: "Negations • Prepositions • Conjunctions",
    rootBuckets: ["core_words"]
  },
  {
    grid_column: 4,
    title: "Possessives",
    subtitle: "Determiners",
    rootBuckets: ["core_words"]
  },
  {
    grid_column: 5,
    title: "Describers",
    subtitle: "Emotions • Adjectives",
    rootBuckets: ["emotion", "color_size"]
  },
  {
    grid_column: 6,
    title: "Targets",
    subtitle: "Noun folders",
    rootBuckets: []
  }
];

const ALWAYS_CONTROL_ORDER = ["yes", "no", "help", "stop", "clear"];

const CONTROL_VISUALS = {
  yes: { symbol: "✅", css: "control_yes" },
  no: { symbol: "❌", css: "control_no" },
  help: { symbol: "🆘", css: "control_help" },
  stop: { symbol: "🛑", css: "control_stop" },
  clear: { symbol: "🗑️", css: "control_clear" }
};

const BUCKET_PRIORITY = [
  "food_drink",
  "person",
  "place",
  "school_work",
  "object",
  "device_media",
  "bathroom_care",
  "sick_health",
  "pain",
  "safety",
  "time_routine",
  "social_connection",
  "help_support",
  "communication_repair",
  "refusal_advocacy",
  "story_comment",
  "recovery_support"
];

const BUCKET_LABELS = {
  food_drink: "Food & Drink",
  person: "People",
  place: "Places",
  school_work: "School & Work",
  object: "Things",
  device_media: "Devices & Media",
  bathroom_care: "Bathroom & Care",
  sick_health: "Health",
  pain: "Pain",
  safety: "Safety",
  time_routine: "Time & Routines",
  social_connection: "Social",
  help_support: "Help & Support",
  communication_repair: "Communication Repair",
  refusal_advocacy: "Refusal & Advocacy",
  story_comment: "Stories & Comments",
  recovery_support: "Recovery Support"
};

const BUCKET_SYMBOLS = {
  food_drink: "🍎",
  person: "👥",
  place: "📍",
  school_work: "🎒",
  object: "📦",
  device_media: "📱",
  bathroom_care: "🚻",
  sick_health: "🩺",
  pain: "🩹",
  safety: "⚠️",
  time_routine: "🕒",
  social_connection: "🤝",
  help_support: "🆘",
  communication_repair: "💬",
  refusal_advocacy: "✋",
  story_comment: "📖",
  recovery_support: "🌱"
};

const IRREGULAR_VERB_FORMS = {
  want: { progressive: "wanting", past: "wanted", thirdPerson: "wants" },
  need: { progressive: "needing", past: "needed", thirdPerson: "needs" },
  go: { progressive: "going", past: "went", thirdPerson: "goes" },
  make: { progressive: "making", past: "made", thirdPerson: "makes" },
  get: { progressive: "getting", past: "got", thirdPerson: "gets" },
  see: { progressive: "seeing", past: "saw", thirdPerson: "sees" },
  eat: { progressive: "eating", past: "ate", thirdPerson: "eats" },
  drink: { progressive: "drinking", past: "drank", thirdPerson: "drinks" },
  have: { progressive: "having", past: "had", thirdPerson: "has" },
  do: { progressive: "doing", past: "did", thirdPerson: "does" },
  feel: { progressive: "feeling", past: "felt", thirdPerson: "feels" },
  be: { progressive: "being", past: "was", thirdPerson: "is" }
};

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

function createMachineState() {
  return {
    activeState: 1,
    activeColumn: 1,
    pendingVerb: null,
    column3Mode: "default"
  };
}

function emptyColumns() {
  return { 1: [], 2: [], 3: [], 4: [], 5: [] };
}

function phraseTokensFromProfile(profile) {
  const sentence = profile?.sentence || [];
  if (Array.isArray(sentence)) return sentence.map(String).filter(Boolean);
  const value = String(sentence || "").trim();
  return value ? value.split(/\s+/) : [];
}

function phraseFromProfile(profile) {
  return phraseTokensFromProfile(profile).join(" ").trim();
}

function normalizeKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value = "") {
  return String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function spokenText(entry = {}) {
  return String(entry.speak_text || entry.display_label || entry.label || "").trim();
}

function normalizeLiveEntry(entry = {}, overrides = {}) {
  const label = String(entry.display_label || entry.label || entry.speak_text || "").trim();
  const text = String(entry.speak_text || label).trim();
  const slot = Number(entry.grid_row || entry.grid_slot || overrides.grid_row || 1);

  return {
    ...entry,
    ...overrides,
    label,
    speak_text: text,
    lemma: String(entry.lemma || text).toLowerCase().trim(),
    symbol_key: entry.symbol_key || text || label,
    grid_row: Number.isFinite(slot) ? slot : 1
  };
}

function isTemplateOrResetPhrase(entry = {}) {
  const action = String(entry.on_tap_action || "");
  const label = spokenText(entry);
  return action.includes("template") || label.includes("___");
}

function fitEntriesIntoMotorSlots(slices, columnNumber) {
  const preferred = [];
  const fallback = [];

  for (const slice of slices) {
    for (const rawEntry of slice?.visible || []) {
      if (rawEntry.always_active === true) continue;
      if (Number(rawEntry.grid_column) !== Number(columnNumber)) continue;
      const entry = normalizeLiveEntry(rawEntry);
      if (entry.grid_row < 1 || entry.grid_row > COLUMN_SLOT_COUNT) continue;
      if (isTemplateOrResetPhrase(entry)) fallback.push(entry);
      else preferred.push(entry);
    }
  }

  const bySlot = new Map();
  for (const entry of [...preferred, ...fallback]) {
    if (!bySlot.has(entry.grid_row)) bySlot.set(entry.grid_row, entry);
  }

  return [...bySlot.values()].sort((a, b) => a.grid_row - b.grid_row);
}

function entryAtRow(entries, row) {
  return (entries || []).find(entry => Number(entry.grid_row || entry.grid_slot) === row) || null;
}

function sortBucketDirectory(directory = []) {
  const priority = new Map(BUCKET_PRIORITY.map((bucket, index) => [bucket, index]));
  return [...directory].sort((a, b) => {
    const aPriority = priority.has(a.bucket) ? priority.get(a.bucket) : Number.MAX_SAFE_INTEGER;
    const bPriority = priority.has(b.bucket) ? priority.get(b.bucket) : Number.MAX_SAFE_INTEGER;
    return aPriority - bPriority || b.count - a.count || a.bucket.localeCompare(b.bucket);
  });
}

function buildBucketAnchors(directory = []) {
  return sortBucketDirectory(directory).map((item, index) => ({
    id: `fitzgerald_bucket_${item.bucket}`,
    label: BUCKET_LABELS[item.bucket] || titleCase(item.bucket),
    symbol: BUCKET_SYMBOLS[item.bucket] || "📁",
    symbol_key: item.bucket,
    speak_text: "",
    is_bucket: true,
    bucket_id: item.bucket,
    route_bucket: item.bucket,
    bucket_count: Number(item.count || 0),
    total_pages: Math.max(1, Number(item.totalPages || 1)),
    grid_column: 6,
    grid_row: (index % ROOT_BUCKET_PAGE_SIZE) + 1,
    root_page: Math.floor(index / ROOT_BUCKET_PAGE_SIZE) + 1,
    active_in_state: [6],
    always_active: false,
    on_tap_action: "open_bucket_in_column_6",
    route_next_state: 6
  }));
}

function pageBucketAnchors(anchors = [], page = 1) {
  return anchors
    .filter(entry => Number(entry.root_page) === Number(page))
    .map(entry => ({ ...entry }));
}

function lastConsonantShouldDouble(lemma) {
  if (!/^[a-z]+$/.test(lemma) || lemma.length < 3) return false;
  const lastThree = lemma.slice(-3);
  const [a, b, c] = lastThree;
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  return !vowels.has(a) && vowels.has(b) && !vowels.has(c) && !["w", "x", "y"].includes(c);
}

function regularProgressive(lemma) {
  if (lemma.endsWith("ie")) return `${lemma.slice(0, -2)}ying`;
  if (lemma.endsWith("e") && !lemma.endsWith("ee")) return `${lemma.slice(0, -1)}ing`;
  if (lastConsonantShouldDouble(lemma)) return `${lemma}${lemma.slice(-1)}ing`;
  return `${lemma}ing`;
}

function regularPast(lemma) {
  if (lemma.endsWith("e")) return `${lemma}d`;
  if (/[^aeiou]y$/.test(lemma)) return `${lemma.slice(0, -1)}ied`;
  if (lastConsonantShouldDouble(lemma)) return `${lemma}${lemma.slice(-1)}ed`;
  return `${lemma}ed`;
}

function regularThirdPerson(lemma) {
  if (/[^aeiou]y$/.test(lemma)) return `${lemma.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh|o)$/.test(lemma)) return `${lemma}es`;
  return `${lemma}s`;
}

function buildGrammarVariants(verbEntry = {}) {
  const lemma = normalizeKey(verbEntry.lemma || spokenText(verbEntry));
  if (!lemma) return [];

  const forms = IRREGULAR_VERB_FORMS[lemma] || {
    progressive: regularProgressive(lemma),
    past: regularPast(lemma),
    thirdPerson: regularThirdPerson(lemma)
  };

  return [
    { form: "base", surface: lemma, slot: 1, label: titleCase(lemma) },
    { form: "present_progressive", surface: forms.progressive, slot: 2, label: titleCase(forms.progressive) },
    { form: "past", surface: forms.past, slot: 3, label: titleCase(forms.past) },
    { form: "third_person_present", surface: forms.thirdPerson, slot: 4, label: titleCase(forms.thirdPerson) }
  ].map(variant => ({
    id: `${verbEntry.id || lemma}_${variant.form}`,
    label: variant.label,
    speak_text: variant.surface,
    symbol_key: variant.surface,
    lemma,
    source_lemma: lemma,
    grammar_form: variant.form,
    is_grammar_variant: true,
    grid_column: 3,
    grid_row: variant.slot,
    grid_slot: variant.slot,
    active_in_state: [3],
    always_active: false,
    on_tap_action: "replace_pending_verb_and_advance_to_state_4",
    route_next_state: 4
  }));
}

function defaultControlFallback(label) {
  const key = normalizeKey(label);
  return {
    id: `fallback_${key}`,
    label: titleCase(key),
    speak_text: key,
    always_active: true,
    active_in_state: [1, 2, 3, 4, 5, 6],
    on_tap_action: key === "clear"
      ? "clear_sentence_and_reset_to_state_1"
      : "insert_word_and_reset_to_state_1"
  };
}

function orderedAlwaysControls(entries = []) {
  const byLabel = new Map(
    entries
      .filter(entry => entry.always_active === true)
      .map(entry => [normalizeKey(entry.label || entry.speak_text), normalizeLiveEntry(entry)])
  );

  return ALWAYS_CONTROL_ORDER.map(label => {
    const liveEntry = byLabel.get(label);
    return liveEntry
      ? { ...liveEntry, label: titleCase(label), speak_text: label }
      : defaultControlFallback(label);
  });
}

function routeNextState(entry, fallback) {
  const explicit = Number(entry?.route_next_state);
  if (Number.isFinite(explicit) && explicit >= 1 && explicit <= 6) return explicit;

  const action = String(entry?.on_tap_action || "");
  const match = action.match(/state_(\d)/);
  if (match) return Math.max(1, Math.min(6, Number(match[1])));
  return fallback;
}

export default function ChildAAC({
  profile,
  onTap,
  onPhrase,
  onSpeak,
  onBack,
  onClear,
  onContext,
  onParent
}) {
  const [machine, setMachine] = useState(createMachineState);
  const [baseColumns, setBaseColumns] = useState(emptyColumns);
  const [alwaysControls, setAlwaysControls] = useState(() => orderedAlwaysControls([]));
  const [bucketAnchors, setBucketAnchors] = useState([]);
  const [column6Context, setColumn6Context] = useState({
    mode: "root",
    routeBucket: "",
    label: "Targets",
    page: 1,
    totalPages: 1
  });
  const [column6BucketEntries, setColumn6BucketEntries] = useState([]);
  const [boardLoading, setBoardLoading] = useState(true);
  const [boardError, setBoardError] = useState("");
  const [column6Loading, setColumn6Loading] = useState(false);

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardText, setKeyboardText] = useState("");
  const [keyboardMode, setKeyboardMode] = useState("letters");
  const [shiftOn, setShiftOn] = useState(false);
  const [keyboardSaveStatus, setKeyboardSaveStatus] = useState("");

  const initialLoadGeneration = useRef(0);
  const column6RequestGeneration = useRef(0);

  const sentenceTokens = useMemo(() => phraseTokensFromProfile(profile), [profile]);
  const actualPhrase = useMemo(() => phraseFromProfile(profile), [profile]);
  const stageSettings = useMemo(() => normalizeStageSettings(profile), [profile]);
  const boardLimits = useMemo(() => getStageBoardLimits(profile), [profile]);
  const communicationStage = stageSettings.communicationStage;
  const routingProfileKey = useMemo(() => JSON.stringify({
    stage: communicationStage,
    showSensitiveVocabulary: profile?.settings?.showSensitiveVocabulary === true,
    sensitiveVocabularyUnlocked: profile?.settings?.sensitiveVocabularyUnlocked === true || profile?.sensitiveVocabularyUnlocked === true,
    parentVocabularyUnlocked: profile?.settings?.parentVocabularyUnlocked === true || profile?.settings?.parentUnlocked === true || profile?.parentUnlocked === true,
    schoolMode: profile?.settings?.schoolMode === true || profile?.schoolMode === true,
    emergencyMode: profile?.settings?.emergencyMode === true || profile?.emergencyMode === true
  }), [
    communicationStage,
    profile?.settings?.showSensitiveVocabulary,
    profile?.settings?.sensitiveVocabularyUnlocked,
    profile?.sensitiveVocabularyUnlocked,
    profile?.settings?.parentVocabularyUnlocked,
    profile?.settings?.parentUnlocked,
    profile?.parentUnlocked,
    profile?.settings?.schoolMode,
    profile?.schoolMode,
    profile?.settings?.emergencyMode,
    profile?.emergencyMode
  ]);
  const name = profile?.userProfile?.name || profile?.name || "Communicator";
  const profileTrackingId = profile?.userProfile?.id || profile?.id || name || "default";
  const photo = profile?.userProfile?.photoUrl || profile?.userProfile?.photo || profile?.photoUrl || profile?.photo || "";

  const resetMachineToState1 = useCallback(() => {
    column6RequestGeneration.current += 1;
    setMachine(createMachineState());
    setColumn6BucketEntries([]);
    setColumn6Context(previous => ({
      mode: "root",
      routeBucket: "",
      label: "Targets",
      page: 1,
      totalPages: Math.max(1, Math.ceil(bucketAnchors.length / ROOT_BUCKET_PAGE_SIZE) || previous.totalPages || 1)
    }));
    setColumn6Loading(false);
  }, [bucketAnchors.length]);

  useEffect(() => {
    let cancelled = false;
    const generation = ++initialLoadGeneration.current;

    async function loadInitialGrid() {
      setBoardLoading(true);
      setBoardError("");

      try {
        // One asynchronous call loads the lazy 23 MB database chunk. All remaining
        // initial slices are synchronous reads from the router's in-memory cache.
        await getFitzgeraldColumnSliceV8_1Async(profile, {
          state: 1,
          page: 1,
          stage: communicationStage,
          includeAlwaysActive: true
        });

        if (cancelled || generation !== initialLoadGeneration.current) return;

        const controlSlice = getFitzgeraldColumnSliceV8_1(profile, {
          state: 1,
          page: 1,
          stage: communicationStage,
          includeAlwaysActive: true
        });

        const nextColumns = emptyColumns();
        for (const definition of COLUMN_DEFINITIONS.slice(0, 5)) {
          const slices = definition.rootBuckets.map(routeBucket =>
            getFitzgeraldColumnSliceV8_1(profile, {
              state: definition.grid_column,
              routeBucket,
              page: 1,
              stage: communicationStage
            })
          );

          nextColumns[definition.grid_column] = fitEntriesIntoMotorSlots(
            slices,
            definition.grid_column
          );
        }

        const directory = getFitzgeraldBucketDirectoryV8_1(6);
        const nextBucketAnchors = buildBucketAnchors(directory);
        const rootPageCount = Math.max(
          1,
          Math.ceil(nextBucketAnchors.length / ROOT_BUCKET_PAGE_SIZE)
        );

        if (cancelled || generation !== initialLoadGeneration.current) return;

        setBaseColumns(nextColumns);
        setAlwaysControls(orderedAlwaysControls(controlSlice.visible));
        setBucketAnchors(nextBucketAnchors);
        setColumn6BucketEntries([]);
        setColumn6Context({
          mode: "root",
          routeBucket: "",
          label: "Targets",
          page: 1,
          totalPages: rootPageCount
        });
        setMachine(createMachineState());
      } catch (error) {
        if (cancelled || generation !== initialLoadGeneration.current) return;
        setBoardError(error instanceof Error ? error.message : "The live language database could not be loaded.");
        setBaseColumns(emptyColumns());
        setBucketAnchors([]);
        setAlwaysControls(orderedAlwaysControls([]));
      } finally {
        if (!cancelled && generation === initialLoadGeneration.current) {
          setBoardLoading(false);
        }
      }
    }

    loadInitialGrid();

    return () => {
      cancelled = true;
    };
  }, [routingProfileKey]);

  const column3Entries = useMemo(() => {
    const defaults = baseColumns[3] || [];
    if (machine.column3Mode !== "verb_grammar" || !machine.pendingVerb) return defaults;

    const grammarVariants = buildGrammarVariants(machine.pendingVerb);
    const preservedDefaults = defaults.filter(entry => Number(entry.grid_row) > 4);
    return [...grammarVariants, ...preservedDefaults].sort((a, b) => a.grid_row - b.grid_row);
  }, [baseColumns, machine.column3Mode, machine.pendingVerb]);

  const rootColumn6Entries = useMemo(
    () => pageBucketAnchors(bucketAnchors, column6Context.page),
    [bucketAnchors, column6Context.page]
  );

  const column6Entries = column6Context.mode === "bucket"
    ? column6BucketEntries
    : rootColumn6Entries;

  const columnEntries = useMemo(() => ({
    ...baseColumns,
    3: column3Entries,
    6: column6Entries
  }), [baseColumns, column3Entries, column6Entries]);

  const pendingVerbLabel = machine.pendingVerb ? spokenText(machine.pendingVerb) : "";
  const sentencePreview = [actualPhrase, pendingVerbLabel].filter(Boolean).join(" ");

  const appendText = useCallback((text) => {
    const value = String(text || "").trim();
    if (!value) return;
    if (/\s/.test(value) && onPhrase) onPhrase(value);
    else onTap?.(value);
  }, [onPhrase, onTap]);

  const moveToState = useCallback((nextState) => {
    const state = Math.max(1, Math.min(6, Number(nextState || 1)));
    setMachine(current => ({
      ...current,
      activeState: state,
      activeColumn: state
    }));
  }, []);

  const loadColumn6BucketPage = useCallback(async (routeBucket, page = 1, label = "") => {
    const requestGeneration = ++column6RequestGeneration.current;
    const safePage = Math.max(1, Number(page || 1));
    const bucketMeta = bucketAnchors.find(entry => entry.route_bucket === routeBucket);

    setBoardError("");
    setColumn6Loading(true);
    setColumn6Context({
      mode: "bucket",
      routeBucket,
      label: label || bucketMeta?.label || BUCKET_LABELS[routeBucket] || titleCase(routeBucket),
      page: safePage,
      totalPages: Math.max(1, Number(bucketMeta?.total_pages || 1))
    });

    try {
      const slice = await getFitzgeraldColumnSliceV8_1Async(profile, {
        state: 6,
        routeBucket,
        page: safePage,
        stage: communicationStage,
        allowStageExpansion: true
      });

      if (requestGeneration !== column6RequestGeneration.current) return;

      const entries = (slice.visible || [])
        .filter(entry => Number(entry.grid_column) === 6)
        .map(entry => normalizeLiveEntry(entry))
        .filter(entry => entry.grid_row >= 1 && entry.grid_row <= COLUMN_SLOT_COUNT)
        .sort((a, b) => a.grid_row - b.grid_row);

      setColumn6BucketEntries(entries);
      setColumn6Context(current => ({
        ...current,
        page: Number(slice.page || safePage),
        totalPages: Math.max(1, Number(bucketMeta?.total_pages || current.totalPages || 1))
      }));
      onContext?.(`fitzgerald/6/${routeBucket}/page/${safePage}`);
    } catch (error) {
      if (requestGeneration !== column6RequestGeneration.current) return;
      setBoardError(error instanceof Error ? error.message : `Unable to open ${routeBucket}.`);
      setColumn6BucketEntries([]);
    } finally {
      if (requestGeneration === column6RequestGeneration.current) {
        setColumn6Loading(false);
      }
    }
  }, [bucketAnchors, communicationStage, onContext, profile]);

  const restoreColumn6Root = useCallback((page = 1) => {
    column6RequestGeneration.current += 1;
    setColumn6BucketEntries([]);
    setColumn6Loading(false);
    setColumn6Context({
      mode: "root",
      routeBucket: "",
      label: "Targets",
      page: Math.max(1, Number(page || 1)),
      totalPages: Math.max(1, Math.ceil(bucketAnchors.length / ROOT_BUCKET_PAGE_SIZE))
    });
  }, [bucketAnchors.length]);

  const handleTopControl = useCallback((control) => {
    const controlKey = normalizeKey(control.label || control.speak_text);
    if (controlKey === "clear" || control.on_tap_action === "clear_sentence_and_reset_to_state_1") {
      onClear?.();
      resetMachineToState1();
      return;
    }

    appendText(spokenText(control));
    resetMachineToState1();
  }, [appendText, onClear, resetMachineToState1]);

  const commitGrammarVariant = useCallback((entry) => {
    if (!machine.pendingVerb) return;

    // The base verb exists only in the local preview. This local draft performs
    // the required pop/override atomically, so the parent sentence receives one
    // final surface form and can never become "I want wanted".
    const draftTokens = [...sentenceTokens, spokenText(machine.pendingVerb)];
    draftTokens.pop();
    draftTokens.push(spokenText(entry));
    const replacement = draftTokens[draftTokens.length - 1];

    appendText(replacement);
    setMachine(current => ({
      ...current,
      activeState: 4,
      activeColumn: 4,
      pendingVerb: null,
      column3Mode: "default"
    }));
  }, [appendText, machine.pendingVerb, sentenceTokens]);

  const commitPendingBaseWithModifier = useCallback((modifierEntry) => {
    if (!machine.pendingVerb) return;
    const phrase = [spokenText(machine.pendingVerb), spokenText(modifierEntry)]
      .filter(Boolean)
      .join(" ");
    appendText(phrase);
    setMachine(current => ({
      ...current,
      activeState: routeNextState(modifierEntry, 4),
      activeColumn: routeNextState(modifierEntry, 4),
      pendingVerb: null,
      column3Mode: "default"
    }));
  }, [appendText, machine.pendingVerb]);

  const handleBoardEntry = useCallback((entry) => {
    if (!entry || boardLoading || column6Loading) return;
    if (!isEntryActiveInGrammarStateV8_1(entry, machine.activeState)) return;

    if (entry.is_bucket === true || entry.on_tap_action === "open_bucket_in_column_6") {
      if (machine.activeState !== 6) return;
      loadColumn6BucketPage(entry.route_bucket || entry.bucket_id, 1, entry.label);
      return;
    }

    if (entry.is_grammar_variant === true || entry.on_tap_action === "replace_pending_verb_and_advance_to_state_4") {
      commitGrammarVariant(entry);
      return;
    }

    if (machine.column3Mode === "verb_grammar" && machine.pendingVerb && Number(entry.grid_column) === 3) {
      commitPendingBaseWithModifier(entry);
      return;
    }

    const action = String(entry.on_tap_action || "");
    const value = spokenText(entry);
    const isSlamShut = entry.slam_shut_trigger === true ||
      (Number(entry.grid_column) === 6 && Number(entry.route_next_state) === 1) ||
      action.includes("reset_to_state_1");

    if (action === "set_pending_verb_and_open_column_3_grammar") {
      setMachine(current => ({
        ...current,
        activeState: 3,
        activeColumn: 3,
        pendingVerb: normalizeLiveEntry(entry),
        column3Mode: "verb_grammar"
      }));
      onContext?.(`fitzgerald/grammar/${entry.grammar_profile_id || normalizeKey(value)}`);
      return;
    }

    if (action.startsWith("advance_without_insert")) {
      moveToState(routeNextState(entry, Math.min(6, machine.activeState + 1)));
      return;
    }

    if (value) appendText(value);

    if (isSlamShut) {
      restoreColumn6Root(1);
      setMachine(createMachineState());
      return;
    }

    moveToState(routeNextState(entry, Math.min(6, machine.activeState + 1)));
  }, [
    appendText,
    boardLoading,
    column6Loading,
    commitGrammarVariant,
    commitPendingBaseWithModifier,
    loadColumn6BucketPage,
    machine.activeState,
    machine.column3Mode,
    machine.pendingVerb,
    moveToState,
    onContext,
    restoreColumn6Root
  ]);

  const handleSpeak = () => {
    onSpeak?.();
    resetMachineToState1();
  };

  const handleBack = () => {
    if (machine.pendingVerb) {
      setMachine(current => ({
        ...current,
        activeState: 2,
        activeColumn: 2,
        pendingVerb: null,
        column3Mode: "default"
      }));
      return;
    }

    if (column6Context.mode === "bucket") {
      restoreColumn6Root(1);
      return;
    }

    onBack?.();
    resetMachineToState1();
  };

  const openKeyboard = () => {
    resetMachineToState1();
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
    setKeyboardText(previous => `${previous}${value}`);
  };

  const backspaceKeyboardText = () => {
    setKeyboardSaveStatus("");
    setKeyboardText(previous => Array.from(previous).slice(0, -1).join(""));
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
    appendText(text);
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
            onChange={event => updateKeyboardText(event.target.value)}
            placeholder={`Type anything ${name} wants to say...`}
            autoFocus
          />
          <div className="aacKeyboardFunctionStack">
            <button className="aacKeyboardFunction speak" onClick={speakKeyboardText}>🔊 Speak</button>
            <button className="aacKeyboardFunction add" onClick={addTypedToSentence}>➕ Add</button>
            <button className="aacKeyboardFunction add" onClick={saveTypedVocabularyToCustomStore}>💾 Save</button>
            <button className="aacKeyboardFunction erase" onClick={backspaceKeyboardText}>⌫ Back</button>
            <button className="aacKeyboardFunction clear" onClick={clearKeyboardText}>🗑 Clear</button>
            {keyboardSaveStatus && <div className="aacKeyboardFunction" aria-live="polite">{keyboardSaveStatus}</div>}
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
                      onClick={() => setShiftOn(previous => !previous)}
                    >
                      ⇧ Shift
                    </button>
                  )}
                  {row.map(key => renderKeyboardKey(key))}
                  {index === 2 && <button className="aacKeyboardKey aacKeyboardWide" onClick={backspaceKeyboardText}>⌫</button>}
                </div>
              ))}
            </div>
          )}

          {keyboardMode === "symbols" && (
            <div className="aacKeyboardRows symbols">
              {SYMBOL_ROWS.map((row, index) => (
                <div key={`symbol-row-${index}`} className="aacKeyboardRow">{row.map(key => renderKeyboardKey(key))}</div>
              ))}
            </div>
          )}

          {keyboardMode === "emoji" && (
            <div className="aacKeyboardRows emoji">
              {EMOJI_ROWS.map((row, index) => (
                <div key={`emoji-row-${index}`} className="aacKeyboardRow">{row.map(key => renderKeyboardKey(key, "emojiKey"))}</div>
              ))}
            </div>
          )}

          <div className="aacKeyboardBottomRow">
            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => {
              setKeyboardMode(keyboardMode === "symbols" ? "letters" : "symbols");
              setShiftOn(false);
            }}>{keyboardMode === "symbols" ? "ABC" : "?123"}</button>
            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => {
              setKeyboardMode(keyboardMode === "emoji" ? "letters" : "emoji");
              setShiftOn(false);
            }}>{keyboardMode === "emoji" ? "ABC" : "😊 Emoji"}</button>
            <button className="aacKeyboardKey aacKeyboardSpace" onClick={() => addKeyboardText(" ")}>Space</button>
            <button className="aacKeyboardKey aacKeyboardMode" onClick={() => addKeyboardText("\n")}>↵ Line</button>
            <button className="aacKeyboardKey aacKeyboardDone" onClick={addTypedToSentence}>Add to Sentence</button>
          </div>
        </main>
      </section>
    );
  }

  return (
    <main className="aacStateMachineShell" aria-label="TalkFreeAAC live six-column grammar board">
      <header className="aacStateMachineHeader">
        <section className="aacStateMachineBrand" aria-label="TalkFreeAAC">
          <strong>Talk<span>Free</span>AAC</strong>
          <small>
            Stage {communicationStage} • {boardLimits.ageBandLabel}
            {boardLoading ? " • Loading live vocabulary" : " • V8.1 live database"}
          </small>
        </section>

        <section className="aacStateMachineSentence" aria-live="polite" aria-label="Sentence builder">
          <div className="aacStateMachineSentenceText">
            {sentencePreview || <span className="sentencePlaceholder">Start a sentence in Column 1</span>}
            {pendingVerbLabel && <mark>choose a tense</mark>}
            {boardError && <mark>{boardError}</mark>}
          </div>
          <div className="aacStateMachineSentenceActions">
            <button type="button" onClick={handleSpeak}>🔊 Speak</button>
            <button type="button" onClick={handleBack}>↶ Back</button>
          </div>
        </section>

        <section className="aacStateMachineAccount">
          {stageSettings.keyboardEnabled && <button type="button" onClick={openKeyboard}>⌨ Keyboard</button>}
          <button type="button" onClick={onParent} aria-label={`Open settings for ${name}`}>
            {photo ? <img src={photo} alt="" /> : <span className="profileInitial">{name.slice(0, 1).toUpperCase()}</span>}
            <span>Settings</span>
          </button>
        </section>
      </header>

      <nav className="aacAlwaysActiveRow" aria-label="Always active communication controls">
        {alwaysControls.map(control => {
          const key = normalizeKey(control.label || control.speak_text);
          const visual = CONTROL_VISUALS[key] || { symbol: "●", css: "" };
          return (
            <button
              key={control.id || key}
              type="button"
              className={`alwaysActiveControl ${visual.css}`}
              onClick={() => handleTopControl(control)}
              aria-label={`${control.label || titleCase(key)}, always available`}
            >
              <span aria-hidden="true">{visual.symbol}</span>
              <strong>{control.label || titleCase(key)}</strong>
            </button>
          );
        })}
      </nav>

      <section className="aacStateMachineColumns" aria-label={`State ${machine.activeState}: Column ${machine.activeColumn} active`}>
        {COLUMN_DEFINITIONS.map(column => {
          const columnNumber = Number(column.grid_column);
          const isActive = machine.activeColumn === columnNumber;
          const isGrammarOverlay = columnNumber === 3 && machine.column3Mode === "verb_grammar";
          const isColumn6 = columnNumber === 6;
          const isBucketView = isColumn6 && column6Context.mode === "bucket";
          const title = isGrammarOverlay
            ? "Choose Tense"
            : isBucketView
              ? column6Context.label
              : column.title;
          const subtitle = isGrammarOverlay
            ? `${pendingVerbLabel || "Verb"}: base • ongoing • past • present`
            : isColumn6
              ? `${isBucketView ? "Items" : "Folders"} • Page ${column6Context.page} of ${column6Context.totalPages}`
              : column.subtitle;
          const entries = columnEntries[columnNumber] || [];

          return (
            <article
              key={columnNumber}
              className={`grammarPathColumn ${isActive ? "isActive" : "isDimmed"}`}
              aria-current={isActive ? "step" : undefined}
              aria-busy={isColumn6 && column6Loading ? true : undefined}
              aria-label={`Column ${columnNumber}: ${title}${isActive ? ", active" : ", unavailable until its turn"}`}
            >
              <header className="grammarPathColumnHeader">
                <span className="grammarPathStateNumber">{columnNumber}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </div>
              </header>

              <div className="grammarPathColumnSlots">
                {Array.from({ length: COLUMN_SLOT_COUNT }, (_, index) => {
                  const row = index + 1;
                  const entry = entryAtRow(entries, row);
                  return (
                    <StateMachineTile
                      key={`${columnNumber}-${row}-${entry?.id || "empty"}`}
                      entry={entry}
                      profile={profile}
                      enabled={isActive && !boardLoading && !column6Loading && Boolean(entry)}
                      pending={Boolean(entry?.is_grammar_variant)}
                      onSelect={handleBoardEntry}
                    />
                  );
                })}
              </div>

              {isColumn6 && (
                <footer className="column6BucketControls">
                  <button
                    type="button"
                    disabled={!isActive || column6Loading || column6Context.page <= 1}
                    onClick={() => {
                      const previousPage = column6Context.page - 1;
                      if (column6Context.mode === "bucket") {
                        loadColumn6BucketPage(column6Context.routeBucket, previousPage, column6Context.label);
                      } else {
                        setColumn6Context(current => ({ ...current, page: previousPage }));
                      }
                    }}
                    aria-label="Previous target page"
                  >←</button>
                  <button
                    type="button"
                    disabled={!isActive || column6Loading || column6Context.mode === "root"}
                    onClick={() => restoreColumn6Root(1)}
                  >{column6Loading ? "Loading…" : "Folders"}</button>
                  <button
                    type="button"
                    disabled={!isActive || column6Loading || column6Context.page >= column6Context.totalPages}
                    onClick={() => {
                      const nextPage = column6Context.page + 1;
                      if (column6Context.mode === "bucket") {
                        loadColumn6BucketPage(column6Context.routeBucket, nextPage, column6Context.label);
                      } else {
                        setColumn6Context(current => ({ ...current, page: nextPage }));
                      }
                    }}
                    aria-label="Next target page"
                  >→</button>
                </footer>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
