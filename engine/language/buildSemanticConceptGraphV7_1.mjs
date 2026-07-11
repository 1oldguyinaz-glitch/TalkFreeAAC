// TalkFreeAAC V7.1 semantic graph build tool.
// Run from the repository root:
//   node engine/language/buildSemanticConceptGraphV7_1.mjs
//
// It converts the existing 10,000-entry vocabulary database into a deterministic
// semantic concept graph without changing the source database.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SEMANTIC_AGE_BANDS,
  SEMANTIC_BUCKETS_V7_1,
  SEMANTIC_GRAPH_VERSION,
  SEMANTIC_TOP_LEVEL_CATEGORIES,
  normalizeSemanticText,
  validateSemanticConceptNodeV7_1
} from "./semanticGraphSchemaV7_1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_PATH = path.join(__dirname, "languageDatabaseV5_27_10000.json");
const GRAPH_PATH = path.join(__dirname, "semanticConceptGraphV7_1_10000.json");
const CORE_PATH = path.join(__dirname, "semanticCoreConceptsV7_1.js");
const AUDIT_PATH = path.join(__dirname, "semanticConceptGraphV7_1.audit.json");

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8"));
const entries = Array.isArray(source.entries) ? source.entries : [];

const words = value => new Set(String(value || "").split(/\s*,\s*|\s+/).map(normalizeSemanticText).filter(Boolean));
const list = value => String(value || "").split(/\s*,\s*/).map(normalizeSemanticText).filter(Boolean);

const CORE_WORDS = words(`
  i me my mine you your yours we us our he him his she her hers they them their theirs it this that these those
  want need help stop yes no more finished done like dont don't not am is are was were
  can cannot can't could would should will may might must have do does did go get make see look hear listen say tell think know feel
  happy sad mad angry scared afraid tired sick hurt pain hungry thirsty hot cold
  food drink water bathroom toilet break quiet space please wait now later again
  mom dad mother father teacher friend family home school outside inside
  what where who when why how which
  with to for from in on under over here there near far through around between beside behind up down off out and but because if then before after
  good bad big small same different right wrong
`);

const FOUNDATIONAL_WORDS = words(`
  apple banana orange grape strawberry watermelon fruit vegetable carrots broccoli corn peas
  bread cheese egg eggs cereal rice pasta noodles chicken pizza sandwich cookie cookies cracker crackers
  chips snack breakfast lunch dinner milk juice soda cup bottle spoon fork plate bowl
  red blue green yellow orange purple pink black white brown gray grey
  circle square triangle round long short tall fast slow soft hard wet dry sticky scratchy loud bright dark
  dog cat bird fish horse cow pig duck animal pet
  car bus train truck bike bicycle airplane plane boat ride drive walk run sit stand open close turn
  park store doctor hospital playground kitchen bedroom living room classroom therapy room
  shirt pants shoes socks coat jacket hat clothes blanket bed chair table book ball toy tablet phone music tv game
  blocks bubbles doll puzzle legos slide swing trampoline paint crayons crayon marker markers
  head stomach belly throat ear eye eyes nose mouth hand hands arm leg foot feet back tooth teeth
  bath shower wash clean change medicine nurse
  calm excited worried nervous frustrated confused overwhelmed proud lonely okay safe unsafe
  play eat drink read watch sleep wake work learn write draw sing dance talk call
  morning afternoon evening night today tomorrow yesterday first next last
  hi hello bye goodbye thank thanks sorry hug funny joke love
`);

const COMMON_WORDS = new Set([...CORE_WORDS, ...FOUNDATIONAL_WORDS]);

const CHILD_ONLY_TERMS = new Set(list(`
  potty, tummy, boo boo, blankie, mommy, daddy, nana, papa, preschool, daycare, nap, time-out, timeout
`));

const ADULT_TEEN_TERMS = new Set(list(`
  privacy, consent, relationship, partner, dating, job, paycheck, money, bank, rent, appointment, medication,
  workplace, coworker, supervisor, transportation, schedule, email, password, account, insurance
`));

const RECOVERY_TERMS = new Set(list(`
  wrong word, give me time, try again, say it another way, show me, write it, point to it,
  i know but can't say it, i know but cannot say it, please wait, slower, repeat that,
  yes, no, maybe, family, home, doctor, medicine, pain, name, address, phone number, date, time
`));

const EXACT_PRIMARY = new Map();
function assignPrimary(category, value) {
  for (const item of list(value)) EXACT_PRIMARY.set(item, category);
}

assignPrimary("food_drink", `apple, banana, orange, grape, strawberry, watermelon, fruit, vegetable, carrot, carrots, broccoli, corn, peas, bread, cheese, egg, eggs, cereal, rice, pasta, noodles, chicken, pizza, sandwich, cookie, cookies, cracker, crackers, chips, snack, breakfast, lunch, dinner, milk, juice, soda, food, drink, water`);
assignPrimary("descriptors", `red, blue, green, yellow, orange color, purple, pink, black, white, brown, gray, grey, big, small, tall, short, long, round, circle, square, triangle, soft, hard, wet, dry, sticky, scratchy, loud, quiet, bright, dark, hot, cold, warm, cool, fast, slow, same, different`);
assignPrimary("people", `mom, dad, mommy, daddy, mother, father, grandma, grandpa, grandmother, grandfather, brother, sister, family, friend, teacher, doctor, nurse, therapist, counselor, school counselor, resource teacher, substitute teacher, job coach, boss, customer, aide, helper, student, classmate, coworker, supervisor, partner`);
assignPrimary("places", `home, school, classroom, bathroom, toilet, outside, inside, park, store, hospital, doctor office, playground, kitchen, bedroom, living room, therapy room, bus stop, train station, gas station, airport`);
assignPrimary("objects", `cup, bottle, spoon, fork, plate, bowl, tray, tissue, blanket, bed, chair, table, book, ball, toy, shirt, pants, shorts, underwear, shoes, socks, coat, jacket, hat, clothes, bag, backpack, package, pencil, paper, crayon, crayons, marker, markers, hairbrush, diaper, toothbrush, toothpaste, soap, shampoo, comb, brush, razor, towel, washcloth, mirror, paintbrush, crayon box, umbrella, dog, puppy, kitten, brake`);
assignPrimary("technology_media", `tablet, phone, device, charger, computer, laptop, tv, television, video, game, headphones, music, app, keyboard`);
assignPrimary("body_health", `head, stomach, belly, throat, ear, eye, eyes, nose, mouth, hand, hands, arm, leg, foot, feet, back, tooth, teeth, body, pain, hurt, sick, medicine, medication, allergy, fever, cough, dizzy, nauseous`);
assignPrimary("feelings_states", `happy, sad, mad, angry, scared, afraid, calm, excited, worried, nervous, frustrated, confused, overwhelmed, proud, lonely, okay, tired, sleepy, hungry, thirsty, ready, not ready`);
assignPrimary("actions", `go, get, make, see, look, show, hear, listen, say, tell, think, know, feel, play, eat, drink, read, watch, sleep, wake, work, learn, write, draw, sing, dance, talk, call, walk, run, sit, stand, open, close, turn, stop, wait, help, search, drive, ride, check in, reroute`);
assignPrimary("questions", `what, where, who, when, why, how, which, question`);
assignPrimary("communication_repair", `wrong word, try again, not that, give me time, please wait, show me, say it another way, repeat that, slower, i don't know, i know but can't say it, i know but cannot say it`);
assignPrimary("safety_emergency", `safe, unsafe, emergency, call 911, go away, no, stop, don't touch me, do not touch me, leave me alone`);
assignPrimary("time_routines", `now, later, next, before, after, first, last, morning, afternoon, evening, night, today, tomorrow, yesterday, schedule, routine`);
assignPrimary("social", `hi, hello, bye, goodbye, thank you, thanks, sorry, hug, funny, joke, love, relationship, friend`);
assignPrimary("needs_help", `help me, i need help, break, quiet, space, bathroom, toilet, personal care, wash, clean, change`);
assignPrimary("body_health", `bruise, bruised, wound, swelling, swollen`);
assignPrimary("descriptors", `noisy, too fast, too slow`);
assignPrimary("descriptors", `straight, comfortable, snow`);
assignPrimary("objects", `scissors, dish, dishes, utensil, utensils, whiteboard eraser, teddy bear, picture, seat, trunk, trash, water table, legos`);
assignPrimary("school_work", `whiteboard, social studies, answer, assignment, worksheet, classroom tool, schoolwork, spelling word family`);
assignPrimary("social", `fist bump, promise`);
assignPrimary("places", `room, hill`);
assignPrimary("play_leisure", `art, football, basketball, soccer`);
assignPrimary("actions", `hugging, rush, found, sell`);
assignPrimary("school_work", `price, cost, paycheck, bank, rent`);
assignPrimary("time_routines", `shift, appointment`);

// High-value repairs for source rows whose branch metadata describes a context
// rather than the concept itself. Multi-path bucket tags are added below.
assignPrimary("objects", `car, bus, train, airplane, plane, boat, truck, bike, bicycle, wheelchair, cart, shopping cart, car toy, school bus, seat belt, car seat, boarding pass, suitcase, luggage, elevator button, traffic light, gas`);
assignPrimary("play_leisure", `paint, swing, finish line, dragon, hula hoop`);
assignPrimary("school_work", `dollar, dollars, coin, coins, cash, money, signature, change owed, receipt`);
assignPrimary("time_routines", `traffic jam, detour, transition`);
assignPrimary("technology_media", `dead battery, text message, voice output, communication board, username, login`);
assignPrimary("communication_repair", `message, recent words, active words, my voice`);
assignPrimary("needs_help", `bath, bathroom break, movement break, sensory break`);
assignPrimary("feelings_states", `full, pressure, alone, hurt feelings`);
assignPrimary("social", `apology action`);
assignPrimary("core", `address, favorite, least favorite`);
assignPrimary("descriptors", `sun, cloud, rain, wind, storm`);
assignPrimary("time_routines", `timer`);

const BRANCH_TO_PRIMARY = Object.freeze({
  core: "core",
  grammar_language: "core",
  communication_repair: "communication_repair",
  questions: "questions",
  people: "people",
  social: "social",
  social_boundaries: "safety_emergency",
  relationships: "social",
  actions: "actions",
  expanded_verbs: "actions",
  sports_movement: "actions",
  play: "play_leisure",
  music_art_creativity: "play_leisure",
  technology_media: "technology_media",
  digital_safety: "safety_emergency",
  accessibility_devices: "technology_media",
  grocery: "food_drink",
  food_drink: "food_drink",
  food_cooking_deep: "food_drink",
  places: "places",
  community: "places",
  community_errands: "places",
  transportation: "places",
  travel_navigation: "places",
  household: "objects",
  household_items_deep: "objects",
  home_living_deep: "objects",
  nature_animals: "objects",
  animals_deep: "objects",
  descriptors: "descriptors",
  expanded_descriptors: "descriptors",
  temperature: "descriptors",
  sensory: "feelings_states",
  feelings: "feelings_states",
  regulation: "feelings_states",
  states_conditions: "feelings_states",
  behavior_support: "needs_help",
  body_pain: "body_health",
  medical_deep: "body_health",
  personal_care: "body_health",
  emergency: "safety_emergency",
  emergency_deep: "safety_emergency",
  safety_sensitive: "safety_emergency",
  parent_gated_safety_deep: "safety_emergency",
  school: "school_work",
  academic_deep: "school_work",
  reading_writing: "school_work",
  math_deep: "school_work",
  science_nature: "school_work",
  therapy_goals: "school_work",
  work_vocational: "school_work",
  money_life_skills: "school_work",
  time_routines: "time_routines",
  life_skills: "needs_help",
  choice_preference: "core",
  weather_clothing: "descriptors",
  holidays_events: "social",
  sentence_templates: "core"
});

const LEXICON_TERM_TO_CATEGORIES = new Map();
const LEXICON_CATEGORY_PRIORITY = [
  "communication_repair", "safety_emergency", "body_health", "food_drink",
  "people", "places", "technology_media", "school_work", "objects",
  "play_leisure", "feelings_states", "descriptors", "actions", "social",
  "time_routines", "needs_help", "questions", "core"
];
const EMBEDDED_TERM_STOPLIST = new Set([
  "i", "me", "my", "you", "we", "it", "this", "that", "want", "need", "help",
  "more", "please", "can", "do", "go", "get", "make", "have", "say", "tell",
  "like", "not", "yes", "no", "is", "are", "was", "were", "to", "with", "for",
  "the", "a", "an", "and", "but", "because", "what", "where", "who", "when", "why", "how"
]);

function embeddedLexiconPrimary(labelKey = "", options = {}) {
  const tokens = labelKey.split(" ").filter(Boolean);
  const candidates = [];
  const maxWords = Math.min(5, tokens.length);
  for (let length = maxWords; length >= 1; length -= 1) {
    for (let start = 0; start <= tokens.length - length; start += 1) {
      const term = tokens.slice(start, start + length).join(" ");
      if (options.excludeExact === true && term === labelKey) continue;
      if (EMBEDDED_TERM_STOPLIST.has(term)) continue;
      const categories = LEXICON_TERM_TO_CATEGORIES.get(term);
      if (!categories) continue;
      for (const category of categories) candidates.push({ category, length, start, term });
    }
    if (candidates.length) break;
  }
  if (!candidates.length) return "";
  candidates.sort((a, b) => {
    const rank = category => {
      const index = LEXICON_CATEGORY_PRIORITY.indexOf(category);
      return index < 0 ? LEXICON_CATEGORY_PRIORITY.length : index;
    };
    // Candidates already share the longest span. Prefer the rightmost target
    // concept ("orange Legos" -> Legos), then semantic priority.
    return b.start - a.start || rank(a.category) - rank(b.category) || b.length - a.length;
  });
  return candidates[0].category;
}

const KEYWORD_PRIMARY_RULES = [
  ["communication_repair", /\b(wrong word|try again|say again|say it another way|give me time|repeat|slower|can't say|cannot say|not that|clarify|misunderstood|unclear|clear message|right word|spell it|write it)\b/],
  ["safety_emergency", /\b(emergency|unsafe|danger|police|ambulance|firefighter|911|go away|leave me alone|do not touch|don't touch|consent|abuse|threat)\b/],
  ["questions", /^(what|where|who|when|why|how|which)\b|\?$/],
  ["body_health", /\b(pain|hurt|ache|sore|doctor|dentist|nurse|hospital|medicine|medication|symptom|fever|cough|allergy|blood|body|breathing|breath|tooth|teeth|stomach|headache|nausea|dizzy|therapy|bruise|bruised|wound|swelling|swollen)\b/],
  ["food_drink", /\b(food|drink|water|juice|milk|snack|meal|breakfast|lunch|dinner|fruit|vegetable|grocery|cook|kitchen|eat|hungry|thirsty|pizza|sandwich|apple|banana)\b/],
  ["technology_media", /\b(phone|tablet|computer|laptop|device|charger|internet|website|app|video|television|tv|headphones|keyboard|password|email|game console)\b/],
  ["people", /\b(mom|dad|mother|father|teacher|counselor|friend|doctor|nurse|therapist|family|brother|sister|grandma|grandpa|person|people|helper|aide|student|classmate|coworker|partner|supervisor|boss|customer|coach)\b/],
  ["places", /\b(home|school|classroom|bathroom|outside|inside|park|store|hospital|playground|room|office|library|restaurant|community|travel|bus|train|car|airplane|airport)\b/],
  ["time_routines", /\b(today|tomorrow|yesterday|morning|afternoon|evening|night|schedule|routine|calendar|appointment|before|after|first|next|later|now|time)\b/],
  ["descriptors", /\b(red|blue|green|yellow|purple|pink|black|white|brown|gray|grey|big|small|large|tiny|soft|hard|wet|dry|sticky|scratchy|loud|quiet|bright|dark|hot|cold|warm|cool|fast|slow|shape|color|size|texture)\b/],
  ["feelings_states", /\b(happy|sad|mad|angry|scared|afraid|calm|excited|worried|nervous|frustrated|confused|overwhelmed|proud|lonely|tired|sleepy|ready|mood|feeling|emotion)\b/],
  ["school_work", /\b(school|class|classroom|teacher|student|homework|lesson|read|write|math|science|social studies|answer|problem|solution|result|assignment|worksheet|whiteboard|schoolwork|work|job|vocational|goal|iep|therapy task)\b/],
  ["social", /\b(hello|hi|goodbye|bye|thank|sorry|friend|relationship|love|hug|joke|funny|conversation|social)\b/],
  ["needs_help", /\b(help|support|break|quiet|space|bathroom|toilet|wash|clean|change|care|assist|stuck)\b/],
  ["play_leisure", /\b(play|toy|sport|music|art|draw|paint|dance|sing|game|hobby|movie|show|fun)\b/],
  ["objects", /\b(object|thing|cup|bottle|spoon|fork|plate|bowl|dish|dishes|scissors|utensil|utensils|blanket|chair|table|book|ball|shirt|pants|shoes|clothes|bag|pencil|paper|tool|eraser)\b/],
  ["actions", /\b(go|come|walk|run|sit|stand|open|close|turn|make|get|give|take|put|look|see|hear|heard|listen|say|tell|read|write|play|eat|drink|sleep|watch|work|do)\b/]
];

const SECONDARY_BY_BRANCH = Object.freeze({
  core: ["core_word"],
  grammar_language: ["grammar"],
  communication_repair: ["repair", "clarification", "word_finding"],
  sensory: ["sensory", "texture", "sound", "light"],
  grocery: ["grocery", "food", "snack"],
  actions: ["action"],
  expanded_verbs: ["action", "expanded_action"],
  play: ["play", "toy", "leisure"],
  choice_preference: ["choice", "preference", "opinion"],
  body_pain: ["pain", "body_part", "symptom"],
  academic_deep: ["academic", "classroom"],
  questions: ["question", "information"],
  school: ["school", "classroom"],
  math_deep: ["math", "academic"],
  temperature: ["temperature"],
  reading_writing: ["reading", "writing", "academic"],
  descriptors: ["descriptor"],
  food_drink: ["food", "drink", "meal"],
  technology_media: ["device", "media"],
  household: ["household_item", "home_context"],
  emergency: ["emergency", "urgent_help"],
  social: ["social_connection", "relationship"],
  regulation: ["regulation", "mental_care"],
  feelings: ["emotion", "mood"],
  science_nature: ["science", "nature"],
  places: ["place"],
  medical_deep: ["medical", "health", "symptom"],
  transportation: ["transportation", "travel"],
  therapy_goals: ["therapy", "goal"],
  social_boundaries: ["boundary", "consent", "self_advocacy"],
  accessibility_devices: ["accessibility_device", "support"],
  life_skills: ["life_skill", "independence"],
  behavior_support: ["regulation", "support"],
  people: ["person"],
  weather_clothing: ["weather", "clothing"],
  sports_movement: ["sport", "movement"],
  food_cooking_deep: ["cooking", "food"],
  digital_safety: ["digital_safety", "boundary"],
  nature_animals: ["animal", "nature"],
  money_life_skills: ["money", "life_skill"],
  music_art_creativity: ["music", "art", "creativity"],
  safety_sensitive: ["safety", "sensitive"],
  community_errands: ["community", "errand", "place"],
  travel_navigation: ["travel", "navigation", "place"],
  home_living_deep: ["household_item", "home_context"],
  work_vocational: ["work", "vocational"],
  community: ["community", "place"],
  personal_care: ["personal_care", "hygiene"],
  time_routines: ["time", "routine", "schedule"],
  emergency_deep: ["emergency", "urgent_help"],
  expanded_descriptors: ["descriptor"],
  animals_deep: ["animal"],
  household_items_deep: ["household_item"],
  holidays_events: ["event", "holiday", "social_connection"],
  parent_gated_safety_deep: ["safety", "sensitive"],
  states_conditions: ["body_state", "condition"],
  sentence_templates: ["sentence_frame"]
});

const CATEGORY_DEFAULT_INTENTS = Object.freeze({
  core: ["request", "choice", "comment"],
  people: ["social_connection", "request", "question"],
  actions: ["action", "request", "comment"],
  objects: ["request", "choice", "describe"],
  food_drink: ["request", "choice", "describe"],
  places: ["location", "request", "question"],
  feelings_states: ["emotion", "self_advocacy", "comment"],
  body_health: ["body_health", "self_advocacy", "request"],
  descriptors: ["describe", "choice", "comment"],
  questions: ["question", "communication_repair"],
  social: ["social_connection", "comment"],
  needs_help: ["request", "self_advocacy", "communication_repair"],
  school_work: ["school_work", "request", "comment"],
  time_routines: ["time_routine", "question", "comment"],
  communication_repair: ["communication_repair", "recovery_support", "self_advocacy"],
  safety_emergency: ["safety", "refusal", "self_advocacy"],
  play_leisure: ["request", "social_connection", "comment"],
  technology_media: ["request", "choice", "communication_repair"]
});

const CATEGORY_DEFAULT_FRAMES = Object.freeze({
  core: ["I ___", "I want ___", "I need ___"],
  people: ["I want ___", "Where is ___?", "Talk to ___"],
  actions: ["I want to ___", "Can I ___?", "Help me ___"],
  objects: ["I want ___", "Where is ___?", "Help with ___"],
  food_drink: ["I want ___", "I like ___", "I don't like ___", "More ___"],
  places: ["Go to ___", "Where is ___?", "I want to go to ___"],
  feelings_states: ["I feel ___", "I am ___", "I need help because I feel ___"],
  body_health: ["My ___ hurts", "I feel ___", "I need help with ___"],
  descriptors: ["It is ___", "I feel ___", "I want the ___ one"],
  questions: ["___?", "I want to know ___", "Please explain ___"],
  social: ["I want to say ___", "That was ___", "I feel ___ about you"],
  needs_help: ["I need ___", "Help me with ___", "Please give me ___"],
  school_work: ["I need help with ___", "I finished ___", "I want to learn ___"],
  time_routines: ["___ now", "___ later", "What happens ___?"],
  communication_repair: ["___", "Please ___", "I mean ___"],
  safety_emergency: ["___", "I need help", "Stop ___"],
  play_leisure: ["I want to ___", "I like ___", "Let's ___"],
  technology_media: ["I want ___", "Help with ___", "Turn on ___"]
});

const CATEGORY_DEFAULT_RELATIONS = Object.freeze({
  core: { actions: ["want", "need", "help", "go"], descriptors: ["more", "different"], people: ["you", "me"], places: ["home"], emotions: ["happy", "sad"] },
  people: { actions: ["talk", "help", "see", "call"], descriptors: ["kind", "funny"], people: ["mom", "dad", "teacher", "friend"], places: ["home", "school"], emotions: ["love", "miss", "happy"] },
  actions: { actions: ["go", "stop", "help", "try"], descriptors: ["fast", "slow", "again"], people: ["me", "you"], places: ["home", "school", "outside"], emotions: ["happy", "frustrated"] },
  objects: { actions: ["get", "open", "use", "find"], descriptors: ["this", "that", "big", "small"], people: ["me", "you"], places: ["home", "school"], emotions: ["like", "don't like"] },
  food_drink: { actions: ["eat", "drink", "want", "like"], descriptors: ["more", "hot", "cold", "sweet"], people: ["me", "you"], places: ["kitchen", "school", "store"], emotions: ["like", "don't like"] },
  places: { actions: ["go", "leave", "stay", "find"], descriptors: ["here", "there", "inside", "outside"], people: ["mom", "dad", "teacher", "friend"], places: ["home", "school", "bathroom", "outside"], emotions: ["safe", "scared"] },
  feelings_states: { actions: ["feel", "help", "stop", "rest"], descriptors: ["more", "less", "very"], people: ["me", "you", "helper"], places: ["quiet", "home"], emotions: ["happy", "sad", "mad", "scared", "calm"] },
  body_health: { actions: ["hurt", "help", "rest", "call"], descriptors: ["sharp", "sore", "better", "worse"], people: ["doctor", "nurse", "mom", "dad"], places: ["hospital", "home", "bathroom"], emotions: ["scared", "worried", "okay"] },
  descriptors: { actions: ["look", "feel", "choose", "compare"], descriptors: ["same", "different", "more", "less"], people: ["me", "you"], places: ["here", "there"], emotions: ["like", "don't like"] },
  questions: { actions: ["ask", "tell", "show", "explain"], descriptors: ["what", "where", "who", "when", "why", "how"], people: ["you", "teacher", "helper"], places: ["here", "there"], emotions: ["confused", "curious"] },
  social: { actions: ["talk", "listen", "laugh", "share"], descriptors: ["funny", "kind", "together"], people: ["friend", "family", "you"], places: ["home", "school"], emotions: ["love", "happy", "miss"] },
  needs_help: { actions: ["help", "wait", "show", "fix"], descriptors: ["now", "please", "different"], people: ["you", "teacher", "doctor"], places: ["bathroom", "home", "school"], emotions: ["frustrated", "scared", "calm"] },
  school_work: { actions: ["read", "write", "learn", "finish"], descriptors: ["easy", "hard", "done"], people: ["teacher", "student", "helper"], places: ["school", "classroom", "work"], emotions: ["proud", "confused", "frustrated"] },
  time_routines: { actions: ["start", "finish", "wait", "plan"], descriptors: ["now", "later", "first", "next"], people: ["me", "you"], places: ["home", "school"], emotions: ["ready", "not ready"] },
  communication_repair: { actions: ["repeat", "show", "write", "wait"], descriptors: ["again", "slower", "different"], people: ["you", "helper"], places: ["here"], emotions: ["frustrated", "confused", "calm"] },
  safety_emergency: { actions: ["stop", "help", "leave", "call"], descriptors: ["safe", "unsafe", "now"], people: ["helper", "police", "doctor"], places: ["safe place", "home", "hospital"], emotions: ["scared", "unsafe", "calm"] },
  play_leisure: { actions: ["play", "watch", "listen", "make"], descriptors: ["fun", "favorite", "more"], people: ["friend", "family", "you"], places: ["home", "park", "outside"], emotions: ["happy", "excited"] },
  technology_media: { actions: ["turn on", "watch", "listen", "charge"], descriptors: ["loud", "quiet", "broken"], people: ["me", "you", "helper"], places: ["home", "school"], emotions: ["like", "frustrated"] }
});

const CONCEPT_OVERRIDES = Object.freeze({
  address: {
    primary_category: "core",
    secondary_categories: ["personal_information", "recovery", "safety", "core_word"],
    bucket_paths: ["core_words", "recovery_support", "safety"],
    intents: ["comment", "question", "recovery_support", "self_advocacy"],
    stage_access: [3, 4, 5],
    priority: "core",
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  dog: {
    primary_category: "objects",
    secondary_categories: ["animal", "pet", "nature", "object"],
    bucket_paths: ["object", "activity", "story_comment"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common"
  },
  swing: {
    primary_category: "play_leisure",
    secondary_categories: ["play", "movement", "outdoor", "object"],
    bucket_paths: ["activity", "object", "place"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common"
  },
  umbrella: {
    primary_category: "objects",
    secondary_categories: ["weather", "clothing", "object"],
    bucket_paths: ["object", "weather"],
    stage_access: [2, 3, 4, 5],
    priority: "common"
  },
  bath: {
    primary_category: "needs_help",
    secondary_categories: ["personal_care", "hygiene", "bathroom", "routine"],
    bucket_paths: ["bathroom_care", "help_support", "time_routine"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common"
  },
  paint: {
    primary_category: "play_leisure",
    secondary_categories: ["art", "creativity", "play", "object", "action"],
    bucket_paths: ["activity", "object"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common"
  },
  rainbow: {
    primary_category: "descriptors",
    secondary_categories: ["weather", "color", "visual_descriptor", "nature", "descriptor"],
    bucket_paths: ["weather", "color_size", "story_comment"],
    stage_access: [2, 3, 4, 5],
    priority: "common"
  },
  wheelchair: {
    primary_category: "objects",
    secondary_categories: ["accessibility_device", "transportation", "mobility", "object"],
    bucket_paths: ["device_media", "object", "place"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  comfortable: {
    primary_category: "descriptors",
    secondary_categories: ["sensory", "comfort", "descriptor", "body_state"],
    bucket_paths: ["texture_sensory", "body_state", "color_size"],
    stage_access: [2, 3, 4, 5],
    priority: "common"
  },
  "phone number": {
    primary_category: "core",
    secondary_categories: ["personal_information", "recovery", "device", "core_word"],
    bucket_paths: ["core_words", "recovery_support", "device_media"],
    intents: ["comment", "question", "recovery_support", "self_advocacy"],
    stage_access: [3, 4, 5],
    priority: "core",
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  apple: {
    primary_category: "food_drink",
    secondary_categories: ["fruit", "snack", "grocery", "food_object", "red_food", "green_food"],
    bucket_paths: ["food_drink", "object", "color_size"],
    intents: ["request", "choice", "describe", "comment"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    sentence_frames: ["I want apple", "I like apple", "I don't like apple", "Eat apple"],
    relations: { actions: ["eat", "want", "like", "cut", "buy"], descriptors: ["red", "green", "sweet", "crunchy"], people: ["me", "you"], places: ["kitchen", "school", "store"], emotions: ["like", "don't like"] }
  },
  banana: {
    primary_category: "food_drink",
    secondary_categories: ["fruit", "snack", "grocery", "food_object", "yellow_food"],
    bucket_paths: ["food_drink", "object", "color_size"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    relations: { actions: ["eat", "peel", "want", "like"], descriptors: ["yellow", "soft", "sweet"], people: ["me", "you"], places: ["kitchen", "school", "store"], emotions: ["like", "don't like"] }
  },
  water: {
    bucket_paths: ["food_drink", "body_state", "bathroom_care"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    relations: { actions: ["drink", "get", "pour", "help"], descriptors: ["cold", "warm", "more"], people: ["me", "you"], places: ["kitchen", "bathroom", "school"], emotions: ["thirsty", "better"] }
  },
  help: {
    primary_category: "needs_help",
    secondary_categories: ["help", "support", "communication_repair", "self_advocacy"],
    bucket_paths: ["help_support", "communication_repair", "safety"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["Help me", "Please help", "Help with this", "I need help"],
    relations: { actions: ["open", "find", "fix", "understand", "stop"], descriptors: ["this", "that", "now", "please"], people: ["me", "you", "teacher", "doctor"], places: ["bathroom", "school", "home"], emotions: ["scared", "frustrated", "confused"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  go: {
    bucket_paths: ["activity", "place", "safety"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    relations: { actions: ["go", "come", "leave", "return"], descriptors: ["now", "later", "away", "back"], people: ["you", "mom", "dad", "friend"], places: ["home", "school", "bathroom", "outside", "car", "store", "doctor", "playground", "therapy", "room"], emotions: ["ready", "scared", "excited"] }
  },
  red: {
    primary_category: "descriptors",
    secondary_categories: ["color", "visual_descriptor"],
    bucket_paths: ["color_size", "food_drink", "object"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    relations: { actions: ["look", "choose", "want"], descriptors: ["color", "bright", "dark"], people: ["me", "you"], places: ["here", "there"], emotions: ["like", "don't like"] },
    related_concepts: ["apple", "ball", "shirt", "car", "stop"]
  },
  green: {
    primary_category: "descriptors",
    secondary_categories: ["color", "visual_descriptor"],
    bucket_paths: ["color_size", "food_drink", "object"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    related_concepts: ["apple", "grass", "shirt", "car"]
  },
  snack: {
    bucket_paths: ["food_drink", "time_routine"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    relations: { actions: ["eat", "want", "get", "share"], descriptors: ["more", "different", "favorite"], people: ["me", "you"], places: ["kitchen", "school", "store"], emotions: ["hungry", "like"] },
    related_concepts: ["apple", "banana", "crackers", "chips", "cookie", "water", "juice"]
  },
  kitchen: {
    primary_category: "places",
    secondary_categories: ["home_place", "food_place", "room"],
    bucket_paths: ["place", "food_drink", "object"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    related_concepts: ["food", "drink", "water", "apple", "snack", "eat", "cook", "cup", "plate"]
  },
  eat: {
    bucket_paths: ["activity", "food_drink"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    related_concepts: ["food", "snack", "apple", "banana", "breakfast", "lunch", "dinner", "more", "finished"]
  },
  bathroom: {
    primary_category: "needs_help",
    secondary_categories: ["bathroom", "personal_care", "privacy", "place", "self_advocacy"],
    bucket_paths: ["bathroom_care", "help_support", "place"],
    intents: ["request", "self_advocacy", "location", "question"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["I need the bathroom", "Go to the bathroom", "Where is the bathroom?"],
    relations: { actions: ["go", "use", "help", "wait"], descriptors: ["now", "please", "urgent", "private"], people: ["me", "you", "teacher", "helper"], places: ["home", "school", "room"], emotions: ["safe", "worried", "better"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  break: {
    primary_category: "needs_help",
    secondary_categories: ["break", "regulation", "sensory_support", "self_advocacy", "time"],
    bucket_paths: ["break_regulation", "help_support", "time_routine"],
    intents: ["request", "self_advocacy", "refusal", "time_routine"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["I need a break", "Break please", "I am ready after my break"],
    relations: { actions: ["stop", "rest", "wait", "go"], descriptors: ["quiet", "now", "short", "long"], people: ["me", "you", "teacher", "helper"], places: ["quiet place", "home", "room", "outside"], emotions: ["overwhelmed", "calm", "tired", "ready"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  privacy: {
    primary_category: "needs_help",
    secondary_categories: ["privacy", "boundary", "consent", "self_advocacy", "personal_care"],
    bucket_paths: ["bathroom_care", "refusal_advocacy", "safety"],
    intents: ["request", "self_advocacy", "refusal", "safety"],
    stage_access: [3, 4, 5],
    age_bands: ["teen", "adult", "aphasia_recovery"],
    priority: "common",
    sentence_frames: ["I need privacy", "Please give me privacy", "I want to be alone"],
    relations: { actions: ["close", "wait", "leave", "knock"], descriptors: ["private", "alone", "safe", "please"], people: ["me", "you", "staff", "family"], places: ["bathroom", "bedroom", "room", "home"], emotions: ["safe", "uncomfortable", "calm"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  doctor: {
    primary_category: "people",
    secondary_categories: ["person", "medical_person", "medical", "community"],
    bucket_paths: ["person", "sick_health", "place"],
    intents: ["request", "question", "social_connection", "body_health", "location"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["I need a doctor", "Call the doctor", "Go to the doctor"],
    relations: { actions: ["see", "call", "help", "tell"], descriptors: ["now", "please", "urgent", "safe"], people: ["nurse", "therapist", "family", "helper"], places: ["hospital", "clinic", "office", "home"], emotions: ["scared", "worried", "better", "safe"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  medicine: {
    primary_category: "body_health",
    secondary_categories: ["medical", "health", "personal_item", "routine", "safety"],
    bucket_paths: ["sick_health", "object", "time_routine", "safety"],
    intents: ["body_health", "request", "self_advocacy", "time_routine", "safety"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["I need my medicine", "Is it time for medicine?", "This medicine helps"],
    relations: { actions: ["take", "get", "help", "wait"], descriptors: ["now", "later", "more", "finished"], people: ["doctor", "nurse", "family", "helper"], places: ["home", "school", "hospital", "pharmacy"], emotions: ["better", "worried", "safe"] },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  school: {
    bucket_paths: ["school_work", "place"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  orange: {
    primary_category: "food_drink",
    secondary_categories: ["fruit", "snack", "grocery", "food", "color", "visual_descriptor"],
    bucket_paths: ["food_drink", "object", "color_size"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "common",
    relations: { actions: ["eat", "peel", "want", "like"], descriptors: ["orange", "sweet", "round", "bright"], people: ["me", "you"], places: ["kitchen", "school", "store"], emotions: ["like", "don't like"] }
  },
  drink: {
    primary_category: "food_drink",
    secondary_categories: ["drink", "action", "body_state"],
    bucket_paths: ["food_drink", "activity", "body_state"],
    intents: ["request", "action", "choice", "body_health"],
    stage_access: [1, 2, 3, 4, 5],
    priority: "core",
    sentence_frames: ["I want a drink", "I want to drink", "More drink"],
    relations: {
      actions: ["drink", "get", "pour", "help"],
      descriptors: ["more", "cold", "warm", "finished"],
      people: ["me", "you"],
      places: ["kitchen", "school", "store"],
      emotions: ["thirsty", "better"]
    },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  },
  "wrong word": {
    primary_category: "communication_repair",
    bucket_paths: ["communication_repair", "recovery_support"],
    stage_access: [2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    priority: "core"
  },
  "give me time": {
    primary_category: "communication_repair",
    bucket_paths: ["communication_repair", "recovery_support", "break_regulation"],
    stage_access: [1, 2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    priority: "core"
  },
  "i know but can't say it": {
    primary_category: "communication_repair",
    bucket_paths: ["communication_repair", "recovery_support"],
    stage_access: [5],
    age_bands: ["adult", "aphasia_recovery"],
    priority: "core"
  },
  period: {
    primary_category: "time_routines",
    secondary_categories: ["time", "routine", "school", "classroom", "body_state", "health"],
    bucket_paths: ["time_routine", "school_work", "body_state", "sick_health"],
    intents: ["time_routine", "question", "school_work", "body_health", "comment"],
    stage_access: [2, 3, 4, 5],
    age_bands: [...SEMANTIC_AGE_BANDS],
    priority: "common",
    sentence_frames: ["What period is it?", "My period started", "Use a period"],
    relations: {
      actions: ["start", "end", "wait", "write"],
      descriptors: ["first", "next", "last", "monthly"],
      people: ["teacher", "doctor", "me"],
      places: ["school", "classroom", "bathroom", "home"],
      emotions: ["ready", "worried", "okay"]
    },
    gating: { parent: false, sensitive: false, school: false, emergency: false }
  }
});

const BUCKET_BY_TAG = Object.freeze({
  core_word: "core_words",
  grammar: "core_words",
  connector: "core_words",
  emotion: "emotion",
  mood: "emotion",
  body_state: "body_state",
  condition: "body_state",
  energy: "energy",
  temperature: "temperature",
  texture: "texture_sensory",
  sensory: "texture_sensory",
  sound: "texture_sensory",
  light: "texture_sensory",
  pain: "pain",
  body_part: "pain",
  symptom: "sick_health",
  medical: "sick_health",
  health: "sick_health",
  mental_care: "mental_care",
  regulation: "break_regulation",
  food: "food_drink",
  drink: "food_drink",
  meal: "food_drink",
  snack: "food_drink",
  grocery: "food_drink",
  cooking: "food_drink",
  action: "activity",
  movement: "activity",
  play: "activity",
  leisure: "activity",
  place: "place",
  home: "place",
  school: "school_work",
  classroom: "school_work",
  community: "place",
  transportation: "place",
  travel: "place",
  person: "person",
  family: "person",
  relationship: "person",
  household_item: "object",
  object: "object",
  toy: "object",
  clothing: "object",
  device: "device_media",
  media: "device_media",
  accessibility_device: "device_media",
  help: "help_support",
  support: "help_support",
  personal_care: "bathroom_care",
  hygiene: "bathroom_care",
  bathroom: "bathroom_care",
  safety: "safety",
  emergency: "safety",
  boundary: "refusal_advocacy",
  consent: "refusal_advocacy",
  refusal: "refusal_advocacy",
  self_advocacy: "refusal_advocacy",
  question: "question",
  information: "question",
  weather: "weather",
  color: "color_size",
  size: "color_size",
  shape: "color_size",
  descriptor: "color_size",
  time: "time_routine",
  routine: "time_routine",
  schedule: "time_routine",
  academic: "school_work",
  therapy: "school_work",
  work: "school_work",
  greeting: "social_connection",
  social_connection: "social_connection",
  humor: "social_connection",
  repair: "communication_repair",
  clarification: "communication_repair",
  word_finding: "recovery_support",
  recovery: "recovery_support",
  sentence_frame: "story_comment",
  story: "story_comment",
  narrative: "story_comment",
  opinion: "story_comment"
});

function uniq(values = []) {
  const out = [];
  const seen = new Set();
  for (const value of values.flat(Infinity)) {
    const normalized = normalizeSemanticText(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(String(value).trim());
  }
  return out;
}

function inferWordPrimaryFromSignals(entry, labelKey) {
  if (entry.type !== "word") return "";
  const branches = new Set([entry.primary_branch, ...(Array.isArray(entry.branches) ? entry.branches : [])].filter(Boolean));
  const triggers = (Array.isArray(entry.trigger_phrases) ? entry.trigger_phrases : []).map(normalizeSemanticText).join(" | ");
  const related = (Array.isArray(entry.related_words) ? entry.related_words : []).map(normalizeSemanticText).join(" | ");

  if (CORE_WORDS.has(labelKey) || branches.has("core") && /^(his|him|her|hers|their|theirs|them|near|far|through|around|between|beside|behind|up|down|off|out)$/.test(labelKey)) return "core";
  if (/\b(bruise|bruised|wound|swelling|swollen|bleeding|rash|sprain)\b/.test(labelKey)) return "body_health";
  if (/\b(noisy|too fast|too slow|too loud|too bright)\b/.test(labelKey)) return "descriptors";
  if (/\b(scissors|dish|dishes|utensil|utensils|eraser)\b/.test(labelKey)) return "objects";
  if (/\b(whiteboard|social studies|assignment|worksheet|schoolwork)\b/.test(labelKey)) return "school_work";
  if (/\b(fist bump|promise)\b/.test(labelKey)) return "social";
  if ((branches.has("communication_repair") || branches.has("grammar_language")) &&
      /say again|help me say|don't understand|do not understand|wrong word|right word|clear message|unclear|misunderstood/.test(`${labelKey} | ${triggers} | ${related}`)) return "communication_repair";
  if ((branches.has("grocery") || branches.has("food_drink") || branches.has("food_cooking_deep")) &&
      (/i want to eat|shopping|hungry|thirsty/.test(triggers) || /\b(food|eat|snack|drink|shopping)\b/.test(related))) return "food_drink";
  if ((branches.has("actions") || branches.has("expanded_verbs")) && /i want to|can i|please/.test(triggers)) return "actions";
  if (branches.has("people") && /\b(mom|dad|teacher|friend|doctor|person|family)\b/.test(related)) return "people";
  if ((branches.has("school") || branches.has("academic_deep") || branches.has("reading_writing") || branches.has("math_deep")) &&
      (/school|classroom|assignment|i need help with|i finished|reading|writing|book|story|math|science/.test(triggers) || /\b(teacher|classroom|lesson|school|finished|reading|writing|book|story)\b/.test(related))) return "school_work";
  if ((branches.has("household") || branches.has("household_items_deep") || branches.has("home_living_deep")) &&
      (/i need|where is|home/.test(triggers) || /\b(home|house|household|object|thing)\b/.test(related))) return "objects";
  if (branches.has("social") && /hello|conversation|comment|something to say/.test(triggers)) return "social";
  if ((branches.has("sensory") || branches.has("expanded_descriptors") || branches.has("descriptors")) &&
      (/too|i feel|it is/.test(triggers) || /\b(loud|bright|quiet|space|texture|color|size)\b/.test(related))) return "descriptors";
  if ((branches.has("technology_media") || branches.has("accessibility_devices")) &&
      /\b(phone|tablet|computer|device|charger|keyboard|screen|video|media|headphones)\b/.test(labelKey)) return "technology_media";
  if ((branches.has("places") || branches.has("community") || branches.has("transportation")) &&
      (/i want to go|where is|go|ride/.test(triggers) || /\b(place|home|school|store|park|hospital|room)\b/.test(related))) return "places";
  if ((branches.has("feelings") || branches.has("regulation") || branches.has("states_conditions")) && /i feel|i am/.test(triggers)) return "feelings_states";
  if ((branches.has("body_pain") || branches.has("medical_deep") || branches.has("personal_care")) &&
      (/i feel|my|i need/.test(triggers) || /\b(hurt|pain|doctor|medicine|sick|help)\b/.test(related))) return "body_health";
  if ((branches.has("emergency") || branches.has("emergency_deep") || branches.has("safety_sensitive")) &&
      (/help|emergency|i need/.test(triggers) || /\b(unsafe|police|ambulance|fire|danger)\b/.test(related))) return "safety_emergency";
  return "";
}

function inferLexiconWordPrimary(entry, labelKey) {
  if (EXACT_PRIMARY.has(labelKey)) return EXACT_PRIMARY.get(labelKey);
  if (CORE_WORDS.has(labelKey)) return "core";
  // The visible label is more trustworthy than the noisy source branch. Use
  // lexical meaning first, then context signals, then branch fallback.
  for (const [category, pattern] of KEYWORD_PRIMARY_RULES) {
    if (pattern.test(labelKey)) return category;
  }
  const signalPrimary = inferWordPrimaryFromSignals(entry, labelKey);
  if (signalPrimary) return signalPrimary;
  const branches = Array.isArray(entry.branches) && entry.branches.length ? entry.branches : [entry.primary_branch];
  for (let index = branches.length - 1; index >= 0; index -= 1) {
    const category = BRANCH_TO_PRIMARY[branches[index]];
    if (category) return category;
  }
  return BRANCH_TO_PRIMARY[entry.primary_branch] || "objects";
}

// Build the phrase lexicon from semantic word inference, not from the raw source
// branch. The source database deliberately contains branch noise, so copying the
// final branch directly would propagate errors such as home -> household or
// too fast -> communication repair into every phrase that contains those words.
for (const entry of entries) {
  if (entry.type !== "word") continue;
  const term = normalizeSemanticText(entry.display_label || entry.label || "");
  if (!term || EMBEDDED_TERM_STOPLIST.has(term)) continue;
  const category = inferLexiconWordPrimary(entry, term);
  if (!category) continue;
  if (!LEXICON_TERM_TO_CATEGORIES.has(term)) LEXICON_TERM_TO_CATEGORIES.set(term, new Set());
  LEXICON_TERM_TO_CATEGORIES.get(term).add(category);
}

function inferPrimary(entry, labelKey) {
  if (EXACT_PRIMARY.has(labelKey)) return EXACT_PRIMARY.get(labelKey);
  if (CORE_WORDS.has(labelKey)) return "core";
  if (entry.type === "word") {
    if (labelKey.includes(" ")) {
      const embeddedPrimary = embeddedLexiconPrimary(labelKey, { excludeExact: true });
      if (embeddedPrimary) return embeddedPrimary;
    }
    for (const [category, pattern] of KEYWORD_PRIMARY_RULES) {
      if (pattern.test(labelKey)) return category;
    }
  }
  const signalPrimary = inferWordPrimaryFromSignals(entry, labelKey);
  if (signalPrimary) return signalPrimary;

  if (entry.type !== "word") {
    const sourcePrimary = BRANCH_TO_PRIMARY[entry.primary_branch] || "";
    const sourceSignals = [
      ...(Array.isArray(entry.trigger_phrases) ? entry.trigger_phrases : []),
      ...(Array.isArray(entry.show_by_context) ? entry.show_by_context : [])
    ].map(normalizeSemanticText).join(" | ");
    if (/\b(wrong word|try again|say it another way|give me time|repeat|slower|can't say|cannot say|not that|clarify|spell it|write it)\b/.test(labelKey)) return "communication_repair";
    if (sourcePrimary === "communication_repair" && /say again|help me say|don't understand|do not understand|wrong word|repair|clear message|my voice/.test(sourceSignals)) return "communication_repair";
    if (/\b(emergency|unsafe|danger|call 911|go away|leave me alone|do not touch|don't touch)\b/.test(labelKey)) return "safety_emergency";
    if (/^(do not share|don't share|do not grab|don't grab|please do not look at my screen|please don't look at my screen)\b/.test(labelKey)) return "safety_emergency";
    if (/^i forgot ___$/.test(labelKey)) return "communication_repair";
    if (/^(my device|help me use my aac|help me use my device|turn the volume|turn the screen|my aac device)\b/.test(labelKey)) return "technology_media";
    if (/^(my goal is repairing my message|i need more time for my message)\b/.test(labelKey)) return "communication_repair";
    if (/\b(not comfortable|i don't want|i do not want|my choice|need space|please stop|stop touching|do not hug|don't hug)\b/.test(labelKey)) return "safety_emergency";
    if (/^when i feel\b/.test(labelKey)) return "feelings_states";
    if (/^(it is too|the solution for too)\b/.test(labelKey)) return "descriptors";
    if (/^(step|reason) \d+ is\b/.test(labelKey)) return "core";
    if (/^(i want ___ because|i need ___ for step)\b/.test(labelKey)) return "core";
    if (/^(the answer is .* because|i am working on|my goal is|at therapy|in therapy)\b/.test(labelKey)) return "school_work";
    if (/^i (don't|do not) know\b/.test(labelKey)) return "communication_repair";
    if (/^i (like|don't like|do not like|prefer|choose) (this|that|it|___)\b/.test(labelKey)) return "core";
    if (/^(the ___ looks|the ___ feels|the ___ sounds)\b/.test(labelKey)) return "descriptors";
    if (/\b(first choice|second choice|last choice|same choice|different choice|another choice|favorite|least favorite|rather|instead|neither|both|option|pick one)\b/.test(labelKey) &&
        /^(i choose|i prefer|please show me|please write down|can we practice|i need support for|i want more information about|i need a choice about|i am ready for|i am not ready for|first|second|same|different|favorite|better|worse|least)\b/.test(labelKey)) return "core";
    if (/^i need (a )?(movement|sensory|quiet|bathroom) break\b/.test(labelKey)) return "needs_help";
    if (/^(i want to go to|i need directions to|at [^,]+,)\b/.test(labelKey)) return "places";
    if (/^(what|where|who|when|why|how|which|can you|could you|will you|do you|is |are |why |how )\b|\?$/.test(labelKey)) return "questions";
    if (/\b(i want to play|we want to play|let's play|can we play|want to play)\b/.test(labelKey)) return "play_leisure";
    if (/^(i|we) (found|heard|saw|made|did|went)\b/.test(labelKey)) return "actions";
    if (/\b(pronoun|adverb|adjective|noun|verb|grammar|sentence part|word ending|word beginning)\b/.test(labelKey)) return "core";
    if (/^(choice \d+|i prefer another choice|i prefer (the )?(first|second|last|same|different) choice|please show me (the )?(first|second|last|same|different) choice)\b/.test(labelKey)) return "core";
    const embeddedPrimary = embeddedLexiconPrimary(labelKey);
    if (embeddedPrimary) return embeddedPrimary;
  }

  for (const [category, pattern] of KEYWORD_PRIMARY_RULES) {
    if (pattern.test(labelKey)) return category;
  }
  if (entry.type === "sentence_template") {
    const templatePrimary = BRANCH_TO_PRIMARY[entry.primary_branch];
    if (["school_work", "body_health", "communication_repair", "time_routines", "safety_emergency", "social", "questions"].includes(templatePrimary)) {
      return templatePrimary;
    }
  }
  return BRANCH_TO_PRIMARY[entry.primary_branch] || "objects";
}

function inferSecondary(entry, labelKey, primary) {
  const branches = [entry.primary_branch, ...(Array.isArray(entry.branches) ? entry.branches : [])].filter(Boolean);
  const tags = [];
  const originalPrimary = BRANCH_TO_PRIMARY[entry.primary_branch] || "objects";
  const primaryWasCorrected = originalPrimary !== primary;
  for (const branch of branches) {
    const branchPrimary = BRANCH_TO_PRIMARY[branch] || originalPrimary;
    if (entry.type !== "word" && branchPrimary !== primary) continue;
    if (primaryWasCorrected && entry.type === "word" && branch === entry.primary_branch && branchPrimary !== primary) continue;
    tags.push(...(SECONDARY_BY_BRANCH[branch] || [branch]));
  }

  if (/\b(apple|banana|orange|grape|strawberry|watermelon|fruit)\b/.test(labelKey)) tags.push("fruit", "snack", "grocery", "food");
  if (/\b(vegetable|carrot|broccoli|corn|peas)\b/.test(labelKey)) tags.push("vegetable", "grocery", "food");
  if (/\b(juice|milk|water|soda|coffee|tea)\b/.test(labelKey) && !/\bwater table\b/.test(labelKey)) tags.push("drink");
  if (/\b(breakfast|lunch|dinner|meal)\b/.test(labelKey)) tags.push("meal", "routine");
  if (/\b(snack|chips|cookie|cracker)\b/.test(labelKey)) tags.push("snack");
  if (/\b(red|blue|green|yellow|purple|pink|black|white|brown|gray|grey)\b/.test(labelKey)) tags.push("color", "visual_descriptor");
  if (/\b(big|small|large|tiny|tall|short|long)\b/.test(labelKey)) tags.push("size", "descriptor");
  if (/\b(circle|square|triangle|round|shape)\b/.test(labelKey)) tags.push("shape", "descriptor");
  if (/\b(sticky|wet|dry|hard|soft|scratchy|tight|rough|smooth)\b/.test(labelKey)) tags.push("texture", "sensory");
  if (/\b(loud|quiet|noise|noisy|sound)\b/.test(labelKey)) tags.push("sound", "sensory");
  if (/\b(bright|dark|light)\b/.test(labelKey)) tags.push("light", "sensory");
  if (/\b(too fast|too slow|too loud|too bright)\b/.test(labelKey)) tags.push("sensory", "regulation");
  if (/\b(hot|cold|warm|cool|freezing|burning)\b/.test(labelKey)) tags.push("temperature");
  if (/\b(mom|dad|mother|father|grandma|grandpa|brother|sister|family)\b/.test(labelKey) && !/\bword family\b/.test(labelKey)) tags.push("family", "person");
  if (/\b(teacher|student|classmate|aide)\b/.test(labelKey)) tags.push("school_person", "person", "school");
  if (/\b(doctor|nurse|therapist)\b/.test(labelKey)) tags.push("medical_person", "person", "medical");
  if (/\b(home|kitchen|bedroom|living room)\b/.test(labelKey)) tags.push("home", "place");
  if (/\b(school|classroom|library)\b/.test(labelKey)) tags.push("school", "classroom", "place");
  if (/\b(park|store|restaurant|hospital|office|community)\b/.test(labelKey)) tags.push("community", "place");
  if (/\b(car|bus|train|truck|bike|bicycle|airplane|plane|boat|wheelchair|cart|suitcase|luggage|boarding pass|seat belt|car seat|traffic light)\b/.test(labelKey)) tags.push("transportation", "object");
  if (/\b(phone|tablet|computer|device|charger|headphones|keyboard)\b/.test(labelKey)) tags.push("device", "accessibility_device");
  if (/\b(toy|ball|blocks|doll|puzzle|stuffed animal|dinosaur|robot|play dough|legos|lego|swing|slide|trampoline|bike)\b/.test(labelKey)) tags.push("toy", "object", "play");
  if (/\b(scissors|dish|dishes|utensil|utensils|whiteboard|eraser|picture|seat|trunk|trash|book|marker|pencil|paper|cup|bottle|plate|bowl|table|chair|blanket|shirt|shorts|pants|shoes|socks|coat|jacket|hat)\b/.test(labelKey)) tags.push("object");
  if (/\b(shirt|shorts|pants|shoes|socks|coat|jacket|hat|sweater|clothes|clothing)\b/.test(labelKey)) tags.push("clothing");
  if (/\b(water table)\b/.test(labelKey)) tags.push("toy", "object", "play");
  if (/\b(soap|toothpaste|toothbrush|hairbrush|comb|brush|razor|towel|washcloth|mirror|diaper|lotion|shampoo|deodorant|bandage)\b/.test(labelKey)) tags.push("personal_care", "hygiene", "object");
  if (/\b(dollar|dollars|coin|coins|cash|money|price|cost|paycheck|bank|rent)\b/.test(labelKey)) tags.push("money", "life_skill", "work");
  if (/\b(paint|paintbrush|crayon|crayons|crayon box|marker|markers)\b/.test(labelKey)) tags.push("art", "creativity", "object", "play");
  if (/\b(drive|ride|check in|search|reroute)\b/.test(labelKey)) tags.push("action");
  if (/\b(tissue|receipt|signature|package|hula hoop)\b/.test(labelKey)) tags.push("object");
  if (/\b(counselor|coach|boss|customer|supervisor|substitute teacher|resource teacher)\b/.test(labelKey)) tags.push("person");
  if (/\b(traffic jam|detour|transition)\b/.test(labelKey)) tags.push("time", "routine", "travel");
  if (/\b(snow|sun|rain|rainy|cloud|sunny|cloudy|wind|windy|storm|weather|rainbow|umbrella)\b/.test(labelKey)) tags.push("weather");
  if (/\b(kind|nice|mean|friendly|rude)\b/.test(labelKey)) tags.push("descriptor", "social_connection");
  if (/\b(dog|cat|bird|fish|horse|cow|pig|duck|giraffe|puppy|frog|dragon|animal|pet)\b/.test(labelKey)) tags.push("animal", "nature", "object");
  if (/\b(caregiver|dentist|driver|parent|kid|child|para|aide|helper|staff)\b/.test(labelKey)) tags.push("person");
  if (/\b(breathing|breath)\b/.test(labelKey)) tags.push("body_state", "health", "medical");
  if (/\b(tv|television|video|music|movie|show|game)\b/.test(labelKey) && !/\b(show me|please show|show picture|show symbol)\b/.test(labelKey)) tags.push("media", "leisure");
  if (/\b(no|stop|go away|leave me alone|don't touch|do not touch|consent)\b/.test(labelKey)) tags.push("refusal", "self_advocacy", "boundary");
  if (/\b(wrong word|try again|give me time|repeat|slower|say it another way|can't say|cannot say|message|recent words|active words|my voice)\b/.test(labelKey)) tags.push("repair", "clarification", "word_finding", "recovery");
  if (/\b(address|phone number|name|date of birth)\b/.test(labelKey)) tags.push("personal_information", "recovery", "safety");
  if (/\b(first|then|after|because|happened|remember|story)\b/.test(labelKey)) tags.push("story", "narrative");

  const defaultTagsByPrimary = {
    core: ["core_word"],
    people: ["person"],
    actions: ["action"],
    objects: ["object"],
    food_drink: ["food"],
    places: ["place"],
    feelings_states: ["emotion"],
    body_health: ["health"],
    descriptors: ["descriptor"],
    questions: ["question"],
    social: ["social_connection"],
    needs_help: ["help"],
    school_work: ["academic"],
    time_routines: ["time"],
    communication_repair: ["repair"],
    safety_emergency: ["safety"],
    play_leisure: ["play"],
    technology_media: ["device"]
  };
  tags.push(...(defaultTagsByPrimary[primary] || []));

  return uniq(tags).map(normalizeSemanticText);
}

function inferPriority(entry, labelKey, primary) {
  if (CORE_WORDS.has(labelKey) || RECOVERY_TERMS.has(labelKey)) return "core";
  if (COMMON_WORDS.has(labelKey)) return "common";
  const utility = Number(entry.v5_26_utility_score || 0);
  const weight = Number(entry.prediction_weight || 0);
  if (entry.type === "word" && (utility >= 145 || weight >= 0.98)) return "common";
  if (entry.type === "sentence_template") return "specialized";
  if (utility < 55 && weight < 0.65) return "rare";
  if (["school_work", "body_health", "technology_media"].includes(primary)) return "specialized";
  return "specialized";
}

function containsSetTerm(labelKey, termSet) {
  const padded = ` ${labelKey} `;
  for (const term of termSet) {
    if (!term) continue;
    if (padded.includes(` ${term} `)) return true;
  }
  return false;
}

function isSimpleFunctionalFrame(entry, labelKey) {
  if (entry.type === "word") return false;
  if (labelKey.split(/\s+/).length > 9) return false;
  const simpleStart = /^(i want|i need|i like|i don't like|i do not like|i choose|can i have|more|help me|i see|i hear|i am done with|please give me|go to|where is|i feel|i am)\b/.test(labelKey);
  const genericFrame = /^(i want|i need|i like|i don't like|i do not like|i feel|help me|where is) ___/.test(labelKey);
  const demonstrativeFrame = /^i (like|don't like|do not like|want|need) (this|that|it)$/.test(labelKey);
  const descriptorFrame = /^it is too ___$/.test(labelKey);
  return genericFrame || demonstrativeFrame || descriptorFrame || (simpleStart && containsSetTerm(labelKey, FOUNDATIONAL_WORDS));
}

function inferStages(entry, labelKey, priority, primary) {
  const stages = new Set(Array.isArray(entry.stage_access) ? entry.stage_access : []);
  if (CORE_WORDS.has(labelKey) || FOUNDATIONAL_WORDS.has(labelKey) || isSimpleFunctionalFrame(entry, labelKey)) {
    [1, 2, 3, 4, 5].forEach(stage => stages.add(stage));
  } else if (priority === "common") {
    [2, 3, 4, 5].forEach(stage => stages.add(stage));
  }
  if (RECOVERY_TERMS.has(labelKey) || ["communication_repair", "body_health", "people", "places", "time_routines"].includes(primary)) {
    stages.add(5);
  }
  if (entry.type === "sentence_template" && ["actions", "core", "feelings_states", "descriptors"].includes(primary)) {
    stages.add(5);
  }
  if (primary === "objects" && /\b(soap|toothpaste|toothbrush|hairbrush|comb|brush|razor|towel|washcloth|mirror|diaper|bandage|wheelchair)\b/.test(labelKey)) {
    stages.add(5);
  }
  if (ADULT_TEEN_TERMS.has(labelKey)) {
    stages.delete(1);
    stages.add(4);
    stages.add(5);
  }
  if (stages.size === 0) [3, 4].forEach(stage => stages.add(stage));
  return [...stages].filter(stage => stage >= 1 && stage <= 5).sort((a, b) => a - b);
}

function inferAgeBands(entry, labelKey, primary) {
  if (CHILD_ONLY_TERMS.has(labelKey)) return ["child"];
  if (ADULT_TEEN_TERMS.has(labelKey) || primary === "school_work" && /\b(work|job|vocational|money|rent|bank|paycheck)\b/.test(labelKey)) {
    return ["teen", "adult", "aphasia_recovery"];
  }
  // Recovery relevance does not make common words adult-only. Words such as home,
  // family, doctor, yes, and no must remain available across age bands.
  return [...SEMANTIC_AGE_BANDS];
}

function inferIntents(entry, labelKey, primary, secondary) {
  const intents = [...(CATEGORY_DEFAULT_INTENTS[primary] || ["comment"] )];
  const originalPrimary = BRANCH_TO_PRIMARY[entry.primary_branch] || "objects";
  const primaryWasCorrected = originalPrimary !== primary;
  const signals = (primaryWasCorrected
    ? entry.type === "word"
      ? [
          ...(Array.isArray(entry.trigger_phrases) ? entry.trigger_phrases : []),
          ...(Array.isArray(entry.related_words) ? entry.related_words : []),
          labelKey
        ]
      : [labelKey]
    : [
        ...(Array.isArray(entry.trigger_phrases) ? entry.trigger_phrases : []),
        ...(Array.isArray(entry.show_by_context) ? entry.show_by_context : []),
        labelKey
      ]
  ).map(normalizeSemanticText).join(" | ");

  if (/\b(i want|want|more|choose|favorite|like)\b/.test(signals)) intents.push("request", "choice");
  if (/\b(no|stop|don't want|do not want|don't like|do not like|go away|leave me alone|not that|not comfortable)\b/.test(signals)) intents.push("refusal", "self_advocacy");
  if (/\b(what|where|who|when|why|how|which|question)\b/.test(signals)) intents.push("question");
  if (["feelings_states", "body_health"].includes(primary) && /\b(feel|happy|sad|mad|scared|emotion|mood)\b/.test(signals)) intents.push("emotion");
  if (["body_health", "feelings_states", "needs_help"].includes(primary) && /\b(hurt|pain|sick|doctor|medicine|body)\b/.test(signals)) intents.push("body_health");
  if (/\b(wrong word|try again|repeat|give me time|can't say|cannot say|clarify)\b/.test(signals)) intents.push("communication_repair", "recovery_support");
  if (/\b(first|then|after|because|happened|story|remember)\b/.test(signals)) intents.push("narrative");
  if (secondary.includes("boundary") || secondary.includes("self_advocacy")) intents.push("self_advocacy", "refusal");
  if (secondary.includes("emergency") || secondary.includes("safety")) intents.push("safety");

  return uniq(intents).map(normalizeSemanticText);
}

function inferFrames(entry, primary, label) {
  const frames = [];
  if (entry.type === "sentence_template" || entry.type === "functional_phrase") frames.push(label);
  frames.push(...(CATEGORY_DEFAULT_FRAMES[primary] || ["___"]));
  return uniq(frames).slice(0, 5);
}

const DEFAULT_BUCKET_BY_PRIMARY = Object.freeze({
  core: "core_words",
  people: "person",
  actions: "activity",
  objects: "object",
  food_drink: "food_drink",
  places: "place",
  feelings_states: "emotion",
  body_health: "sick_health",
  descriptors: "color_size",
  questions: "question",
  social: "social_connection",
  needs_help: "help_support",
  school_work: "school_work",
  time_routines: "time_routine",
  communication_repair: "communication_repair",
  safety_emergency: "safety",
  play_leisure: "activity",
  technology_media: "device_media"
});

function inferBucketPaths(primary, secondary) {
  const paths = [];
  for (const tag of secondary) {
    if (BUCKET_BY_TAG[tag]) paths.push(BUCKET_BY_TAG[tag]);
  }
  if (!paths.length && DEFAULT_BUCKET_BY_PRIMARY[primary]) paths.push(DEFAULT_BUCKET_BY_PRIMARY[primary]);
  return uniq(paths).slice(0, 8);
}

function inferRelations(entry, primary) {
  const defaults = CATEGORY_DEFAULT_RELATIONS[primary] || CATEGORY_DEFAULT_RELATIONS.objects;
  const related = Array.isArray(entry.related_words) ? entry.related_words : [];
  return {
    actions: uniq(defaults.actions).slice(0, 8),
    descriptors: uniq(defaults.descriptors).slice(0, 8),
    people: uniq(defaults.people).slice(0, 8),
    places: uniq(defaults.places).slice(0, 8),
    emotions: uniq(defaults.emotions).slice(0, 8),
    related_concepts: uniq(related).slice(0, 12)
  };
}

function inferGating(entry, labelKey, priority) {
  const gating = {
    parent: Boolean(entry.parent_gated || entry.requires_parent_unlock),
    sensitive: Boolean(entry.requires_sensitive_unlock),
    school: Boolean(entry.requires_school_mode),
    emergency: Boolean(entry.requires_emergency_mode)
  };

  // Source gates contain deliberate branch noise. Core and foundational language
  // must never disappear because a source row was marked as school/emergency-only.
  const essentialCommunication = CORE_WORDS.has(labelKey) ||
    FOUNDATIONAL_WORDS.has(labelKey) ||
    isSimpleFunctionalFrame(entry, labelKey) ||
    priority === "core" ||
    /\b(help|i need help|stop|no|yes|unsafe|safe|emergency|throw up|allergy|doctor|medicine|pain|hurt|bathroom|toilet|break)\b/.test(labelKey);

  return essentialCommunication
    ? { parent: false, sensitive: false, school: false, emergency: false }
    : gating;
}

function mergeOverride(node, override = {}) {
  if (!override || typeof override !== "object") return node;
  const merged = { ...node, ...override };
  merged.secondary_categories = override.secondary_categories
    ? uniq(override.secondary_categories).map(normalizeSemanticText)
    : node.secondary_categories;
  merged.bucket_paths = override.bucket_paths
    ? uniq(override.bucket_paths).map(normalizeSemanticText)
    : node.bucket_paths;
  merged.intents = override.intents
    ? uniq(override.intents).map(normalizeSemanticText)
    : node.intents;
  merged.stage_access = [...new Set(override.stage_access || node.stage_access)].sort((a, b) => a - b);
  merged.age_bands = override.age_bands || node.age_bands;
  merged.sentence_frames = uniq([override.sentence_frames || [], node.sentence_frames]).slice(0, 6);
  merged.relations = {
    actions: uniq([override.relations?.actions || [], node.relations.actions]).slice(0, 10),
    descriptors: uniq([override.relations?.descriptors || [], node.relations.descriptors]).slice(0, 10),
    people: uniq([override.relations?.people || [], node.relations.people]).slice(0, 10),
    places: uniq([override.relations?.places || [], node.relations.places]).slice(0, 10),
    emotions: uniq([override.relations?.emotions || [], node.relations.emotions]).slice(0, 10),
    related_concepts: uniq([override.related_concepts || [], override.relations?.related_concepts || [], node.relations.related_concepts]).slice(0, 14)
  };
  return merged;
}

function classify(entry) {
  const label = String(entry.display_label || entry.label || "").trim();
  const labelKey = normalizeSemanticText(label);
  const primary = inferPrimary(entry, labelKey);
  const secondary = inferSecondary(entry, labelKey, primary);
  const priority = inferPriority(entry, labelKey, primary);
  const stageAccess = inferStages(entry, labelKey, priority, primary);
  const ageBands = inferAgeBands(entry, labelKey, primary);
  const intents = inferIntents(entry, labelKey, primary, secondary);
  const frames = inferFrames(entry, primary, label);
  const bucketPaths = inferBucketPaths(primary, secondary);
  const relations = inferRelations(entry, primary);

  const node = {
    id: `concept:${entry.id || labelKey.replace(/\s+/g, "-")}`,
    source_id: entry.id || "",
    label,
    normalized_label: labelKey,
    entry_type: entry.type || "word",
    primary_category: primary,
    secondary_categories: secondary.length ? secondary : [primary],
    bucket_paths: bucketPaths.length ? bucketPaths : [Object.keys(SEMANTIC_BUCKETS_V7_1).find(id => SEMANTIC_BUCKETS_V7_1[id].topLevel === primary) || "object"],
    intents,
    stage_access: stageAccess,
    age_bands: ageBands,
    recovery_appropriate: ageBands.includes("aphasia_recovery") && stageAccess.includes(5),
    priority,
    sentence_frames: frames,
    relations,
    prediction_weight: Number(entry.prediction_weight || 0),
    utility_score: Number(entry.v5_26_utility_score || 0),
    safety_level: entry.safety_level || "standard",
    gating: inferGating(entry, labelKey, priority),
    original_metadata: {
      primary_branch: entry.primary_branch || "",
      branches: Array.isArray(entry.branches) ? entry.branches : [],
      stage_access: Array.isArray(entry.stage_access) ? entry.stage_access : []
    }
  };

  return mergeOverride(node, CONCEPT_OVERRIDES[labelKey]);
}

const concepts = entries.map(classify);
const validationFailures = [];
for (const node of concepts) {
  const validation = validateSemanticConceptNodeV7_1(node);
  if (!validation.valid) validationFailures.push({ id: node.id, label: node.label, errors: validation.errors });
}

const bucketCounts = {};
const primaryCounts = {};
const priorityCounts = {};
const stageCounts = {};
let correctedPrimaryCount = 0;
let expandedStageCount = 0;
let recoveryCount = 0;

for (const node of concepts) {
  primaryCounts[node.primary_category] = (primaryCounts[node.primary_category] || 0) + 1;
  priorityCounts[node.priority] = (priorityCounts[node.priority] || 0) + 1;
  for (const bucket of node.bucket_paths) bucketCounts[bucket] = (bucketCounts[bucket] || 0) + 1;
  for (const stage of node.stage_access) stageCounts[stage] = (stageCounts[stage] || 0) + 1;
  const originalMapped = BRANCH_TO_PRIMARY[node.original_metadata.primary_branch] || "objects";
  if (originalMapped !== node.primary_category) correctedPrimaryCount += 1;
  if (node.stage_access.length > node.original_metadata.stage_access.length) expandedStageCount += 1;
  if (node.recovery_appropriate) recoveryCount += 1;
}

const graph = {
  metadata: {
    version: SEMANTIC_GRAPH_VERSION,
    generated_at: new Date().toISOString(),
    source_database: path.basename(SOURCE_PATH),
    source_entry_count: entries.length,
    concept_count: concepts.length,
    local_first: true,
    external_ai_required: false,
    purpose: "Multi-path AAC meaning graph for prediction, bucket routing, and future decision-support metadata."
  },
  categories: SEMANTIC_TOP_LEVEL_CATEGORIES,
  buckets: SEMANTIC_BUCKETS_V7_1,
  concepts
};

fs.writeFileSync(GRAPH_PATH, `${JSON.stringify(graph)}\n`, "utf8");

const STATIC_LABELS = new Set([
  ...CORE_WORDS,
  ...FOUNDATIONAL_WORDS,
  ...RECOVERY_TERMS,
  ...Object.keys(CONCEPT_OVERRIDES),
  ...Object.values(SEMANTIC_BUCKETS_V7_1).flatMap(bucket => bucket.fallback.map(item => typeof item === "string" ? normalizeSemanticText(item) : normalizeSemanticText(item.label)))
]);

const staticConcepts = concepts
  .filter(node => STATIC_LABELS.has(node.normalized_label) || node.priority === "core")
  .sort((a, b) => {
    const priorityRank = { core: 0, common: 1, specialized: 2, rare: 3 };
    return priorityRank[a.priority] - priorityRank[b.priority] || b.utility_score - a.utility_score || a.label.localeCompare(b.label);
  })
  .map(node => ({
    id: node.id,
    label: node.label,
    normalized_label: node.normalized_label,
    entry_type: node.entry_type,
    primary_category: node.primary_category,
    secondary_categories: node.secondary_categories,
    bucket_paths: node.bucket_paths,
    intents: node.intents,
    stage_access: node.stage_access,
    age_bands: node.age_bands,
    recovery_appropriate: node.recovery_appropriate,
    priority: node.priority,
    sentence_frames: node.sentence_frames,
    relations: node.relations,
    prediction_weight: node.prediction_weight,
    utility_score: node.utility_score,
    gating: node.gating
  }));

const staticModule = `// Generated by buildSemanticConceptGraphV7_1.mjs.\n// Compact high-value semantic graph used by the live AAC board without loading the 10k graph.\n\nexport const SEMANTIC_CORE_CONCEPTS_V7_1 = ${JSON.stringify(staticConcepts, null, 2)};\n\nexport default SEMANTIC_CORE_CONCEPTS_V7_1;\n`;
fs.writeFileSync(CORE_PATH, staticModule, "utf8");

const audit = {
  version: SEMANTIC_GRAPH_VERSION,
  sourceEntries: entries.length,
  concepts: concepts.length,
  staticConcepts: staticConcepts.length,
  validationFailures,
  primaryCounts,
  bucketCounts,
  priorityCounts,
  stageCounts,
  correctedPrimaryCount,
  expandedStageCount,
  recoveryAppropriateCount: recoveryCount,
  criticalExamples: Object.fromEntries(["apple", "banana", "red", "green", "help", "go", "sticky", "overwhelmed", "wrong word", "give me time", "i know but can't say it"].map(label => {
    const node = concepts.find(item => item.normalized_label === label);
    return [label, node || null];
  }))
};
fs.writeFileSync(AUDIT_PATH, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

if (entries.length !== 10000) throw new Error(`Expected 10000 source entries, found ${entries.length}`);
if (concepts.length !== entries.length) throw new Error("Concept count does not match source entry count.");
if (validationFailures.length) throw new Error(`Semantic graph validation failed for ${validationFailures.length} concepts.`);

console.log(JSON.stringify({
  graph: path.relative(process.cwd(), GRAPH_PATH),
  core: path.relative(process.cwd(), CORE_PATH),
  audit: path.relative(process.cwd(), AUDIT_PATH),
  concepts: concepts.length,
  staticConcepts: staticConcepts.length,
  correctedPrimaryCount,
  expandedStageCount,
  recoveryCount
}, null, 2));
