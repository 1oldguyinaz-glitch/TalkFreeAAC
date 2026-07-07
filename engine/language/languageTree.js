export const TREE_VERSION = "5.23";

export const FIXED_CORE_LANGUAGE = [
  "I", "want", "need", "feel", "am", "can",
  "don't", "like", "love", "have", "see", "hear",
  "think", "go", "stop", "help", "get", "do"
];

export const TOPICS = [
  "Relationships",
  "Feelings",
  "Food & Drink",
  "Places",
  "School",
  "Actions",
  "Things",
  "Body & Health",
  "Questions",
  "Recents",
  "Favorites",
  "Search",
  "Emergency"
];

export const HOME_BRANCH = [
  "more", "help", "food", "drink", "water", "snack", "outside", "inside", "break",
  "and", "because", "but", "to", "with", "then", "when", "if", "so",
  "yes", "no", "finished", "please", "thank you", "mom", "dad", "you", "me"
];

export const TOPIC_TREE = {
  "relationships": {
    label: "Relationships",
    children: ["People", "Family", "Friends", "School People", "Helpers", "Love & Care", "Comfort", "Greetings", "Social Words"]
  },
  "relationships/people": {
    label: "People",
    children: ["Family People", "Friend People", "School People", "Helper People", "Pronouns", "Groups"]
  },
  "relationships/people/family-people": {
    label: "Family People",
    children: ["mom", "dad", "grandma", "grandpa", "brother", "sister", "aunt", "uncle", "cousin", "baby", "family", "parent", "caregiver", "my family", "home person", "someone"]
  },
  "relationships/people/friend-people": {
    label: "Friend People",
    children: ["friend", "best friend", "classmate", "neighbor", "kid", "boy", "girl", "buddy", "team", "play friend", "my friend", "new friend", "old friend", "someone", "people"]
  },
  "relationships/people/school-people": {
    label: "School People",
    children: ["teacher", "helper", "principal", "nurse", "therapist", "speech teacher", "bus driver", "student", "classmate", "friend", "coach", "lunch helper", "office", "class"]
  },
  "relationships/people/helper-people": {
    label: "Helper People",
    children: ["doctor", "nurse", "therapist", "speech teacher", "helper", "teacher", "caregiver", "police officer", "firefighter", "driver", "neighbor", "adult", "safe person", "help me"]
  },
  "relationships/people/pronouns": {
    label: "Pronouns",
    children: ["I", "me", "you", "we", "they", "he", "she", "my", "your", "mine", "yours", "us", "them", "my turn", "your turn"]
  },
  "relationships/people/groups": {
    label: "Groups",
    children: ["family", "friends", "class", "team", "people", "kids", "adults", "everyone", "someone", "no one", "we", "they", "my family", "my friends"]
  },
  "relationships/love-care": {
    label: "Love & Care",
    children: ["Love Words", "Hugs", "Kind Words", "Missing Someone", "Care Actions", "Praise"]
  },
  "relationships/love-care/love-words": {
    label: "Love Words",
    children: ["I love you", "love", "I love mom", "I love dad", "I love my family", "I like you", "you are nice", "I care", "you help me", "thank you", "please stay", "be with me"]
  },
  "relationships/love-care/hugs": {
    label: "Hugs",
    children: ["hug", "Can I have a hug", "hold hand", "sit with me", "stay with me", "come here", "close", "gentle", "safe hug", "big hug", "little hug", "all done hug"]
  },
  "relationships/love-care/kind-words": {
    label: "Kind Words",
    children: ["thank you", "please", "you're welcome", "I'm sorry", "it's okay", "good job", "nice", "kind", "I like that", "that was good", "you helped me", "I forgive you"]
  },
  "relationships/love-care/missing-someone": {
    label: "Missing Someone",
    children: ["I miss you", "come back", "where is mom", "where is dad", "I want mom", "I want dad", "call mom", "call dad", "home", "stay with me", "I feel lonely", "I need hug"]
  },
  "relationships/love-care/care-actions": {
    label: "Care Actions",
    children: ["help me", "stay with me", "sit with me", "talk to me", "listen", "look at me", "play with me", "read with me", "hold hand", "bring me", "show me", "wait for me"]
  },
  "relationships/love-care/praise": {
    label: "Praise",
    children: ["good job", "great job", "I am proud", "you did it", "I did it", "awesome", "thank you", "nice work", "try again", "keep going", "I like it", "that was good"]
  },
  "relationships/greetings": {
    label: "Greetings",
    children: ["Hello", "Goodbye", "Daily Greetings", "Conversation Starters", "Polite Words"]
  },
  "relationships/greetings/hello": {
    label: "Hello",
    children: ["hi", "hello", "hey", "good morning", "good afternoon", "nice to see you", "come here", "look at me", "I am here", "you are here", "wave", "smile"]
  },
  "relationships/greetings/goodbye": {
    label: "Goodbye",
    children: ["bye", "goodbye", "see you later", "see you soon", "good night", "I miss you", "come back", "all done", "finished", "go home", "have fun", "thank you"]
  },
  "relationships/greetings/daily-greetings": {
    label: "Daily Greetings",
    children: ["good morning", "good night", "how are you", "I'm okay", "I am happy", "I am tired", "wake up", "sleep", "breakfast", "home", "school", "bedtime"]
  },
  "relationships/greetings/conversation-starters": {
    label: "Conversation Starters",
    children: ["how are you", "what are you doing", "look", "listen", "come here", "play with me", "talk to me", "show me", "tell me", "again", "my turn", "your turn"]
  },
  "relationships/greetings/polite-words": {
    label: "Polite Words",
    children: ["please", "thank you", "you're welcome", "I'm sorry", "excuse me", "yes please", "no thank you", "help please", "more please", "all done", "wait please", "sorry"]
  },
  "relationships/social-words": {
    label: "Social Words",
    children: ["Turns", "Sharing", "Play Words", "Space Words", "Repair Words", "Conversation Control"]
  },
  "relationships/social-words/turns": {
    label: "Turns",
    children: ["my turn", "your turn", "wait", "next", "again", "more", "all done", "finished", "I go", "you go", "one more", "stop"]
  },
  "relationships/social-words/sharing": {
    label: "Sharing",
    children: ["share", "give me", "take it", "my toy", "your toy", "together", "with me", "help me", "thank you", "please", "no thank you", "mine"]
  },
  "relationships/social-words/play-words": {
    label: "Play Words",
    children: ["play with me", "game", "toy", "outside", "inside", "again", "more", "fun", "my turn", "your turn", "stop", "all done", "good job"]
  },
  "relationships/social-words/space-words": {
    label: "Space Words",
    children: ["I need space", "stop please", "too close", "quiet", "break", "wait", "no", "all done", "safe", "help me", "I am mad", "I am scared"]
  },
  "relationships/social-words/repair-words": {
    label: "Repair Words",
    children: ["sorry", "I'm sorry", "it's okay", "try again", "help me", "I don't understand", "show me", "tell me", "wait", "yes", "no", "thank you"]
  },
  "relationships/social-words/conversation-control": {
    label: "Conversation Control",
    children: ["yes", "no", "maybe", "again", "more", "finished", "all done", "wait", "stop", "go", "listen", "look", "tell me", "show me"]
  },
  "relationships/family": {
    label: "Family",
    children: ["Parents", "Grandparents", "Siblings", "Home Family", "Family Feelings", "Family Actions"]
  },
  "relationships/family/parents": {
    label: "Parents",
    children: ["mom", "dad", "parent", "caregiver", "I want mom", "I want dad", "call mom", "call dad", "hug mom", "hug dad", "mom help", "dad help"]
  },
  "relationships/family/grandparents": {
    label: "Grandparents",
    children: ["grandma", "grandpa", "nana", "papa", "call grandma", "call grandpa", "I miss you", "hug", "visit", "home", "family", "thank you"]
  },
  "relationships/family/siblings": {
    label: "Siblings",
    children: ["brother", "sister", "baby", "play with me", "share", "my turn", "your turn", "stop please", "help me", "toy", "game", "sorry"]
  },
  "relationships/family/home-family": {
    label: "Home Family",
    children: ["family", "home", "I love you", "hug", "dinner", "bedtime", "good morning", "good night", "I miss you", "come back", "stay", "safe"]
  },
  "relationships/family/family-feelings": {
    label: "Family Feelings",
    children: ["happy", "sad", "mad", "scared", "lonely", "I miss you", "I love you", "safe", "proud", "sorry", "thank you", "hug"]
  },
  "relationships/family/family-actions": {
    label: "Family Actions",
    children: ["hug", "play", "read", "watch", "eat", "drink", "go home", "call", "sit with me", "stay", "help me", "talk to me"]
  },
  "relationships/friends": {
    label: "Friends",
    children: ["Friend Names", "Play Together", "School Friends", "Sharing With Friends", "Friend Feelings"]
  },
  "relationships/friends/friend-names": {
    label: "Friend Names",
    children: ["friend", "best friend", "classmate", "buddy", "my friend", "new friend", "old friend", "kids", "team", "someone", "people", "play friend"]
  },
  "relationships/friends/play-together": {
    label: "Play Together",
    children: ["play with me", "game", "toy", "outside", "inside", "run", "jump", "watch", "read", "again", "more", "all done", "good job"]
  },
  "relationships/friends/school-friends": {
    label: "School Friends",
    children: ["classmate", "friend", "teacher", "class", "recess", "lunch", "playground", "school", "my turn", "your turn", "share", "help me"]
  },
  "relationships/friends/sharing-with-friends": {
    label: "Sharing With Friends",
    children: ["share", "my turn", "your turn", "give me", "take it", "together", "with me", "wait", "please", "thank you", "sorry", "stop"]
  },
  "relationships/friends/friend-feelings": {
    label: "Friend Feelings",
    children: ["happy", "sad", "mad", "lonely", "excited", "proud", "sorry", "thank you", "I like you", "good job", "play with me", "hug"]
  },
  "relationships/helpers": {
    label: "Helpers",
    children: ["At Home Helpers", "At School Helpers", "Medical Helpers", "Safety Helpers", "Ask For Help"]
  },
  "relationships/helpers/at-home-helpers": {
    label: "At Home Helpers",
    children: ["mom", "dad", "grandma", "grandpa", "caregiver", "family", "help me", "I need help", "I need water", "I need bathroom", "I am hurt", "I am scared"]
  },
  "relationships/helpers/at-school-helpers": {
    label: "At School Helpers",
    children: ["teacher", "helper", "nurse", "therapist", "speech teacher", "principal", "I need help", "I don't understand", "bathroom", "break", "hurt", "scared"]
  },
  "relationships/helpers/medical-helpers": {
    label: "Medical Helpers",
    children: ["doctor", "nurse", "medicine", "hurt", "sick", "pain", "body", "head hurts", "stomach hurts", "I feel sick", "I am hurt", "help me"]
  },
  "relationships/helpers/safety-helpers": {
    label: "Safety Helpers",
    children: ["safe person", "teacher", "mom", "dad", "doctor", "nurse", "police officer", "firefighter", "help me", "stop", "I am scared", "I am hurt"]
  },
  "relationships/helpers/ask-for-help": {
    label: "Ask For Help",
    children: ["help me", "I need help", "please help", "come here", "show me", "tell me", "I don't understand", "I am stuck", "I am scared", "I am hurt", "now", "please"]
  },
  "relationships/comfort": {
    label: "Comfort",
    children: ["Comfort People", "Comfort Actions", "Comfort Items", "Comfort Places", "Comfort Words"]
  },
  "relationships/comfort/comfort-people": {
    label: "Comfort People",
    children: ["mom", "dad", "teacher", "friend", "grandma", "grandpa", "helper", "nurse", "safe person", "family", "caregiver", "someone"]
  },
  "relationships/comfort/comfort-actions": {
    label: "Comfort Actions",
    children: ["hug", "Can I have a hug", "stay with me", "sit with me", "hold hand", "quiet", "breathe", "wait", "talk to me", "read with me", "help me", "stop"]
  },
  "relationships/comfort/comfort-items": {
    label: "Comfort Items",
    children: ["blanket", "toy", "tablet", "music", "book", "water", "snack", "headphones", "dark room", "light", "chair", "bed"]
  },
  "relationships/comfort/comfort-places": {
    label: "Comfort Places",
    children: ["home", "inside", "bedroom", "quiet room", "car", "chair", "bed", "safe place", "school nurse", "bathroom", "outside", "with mom"]
  },
  "relationships/comfort/comfort-words": {
    label: "Comfort Words",
    children: ["I am scared", "I am sad", "I need a break", "I need space", "I need quiet", "help me", "stay with me", "safe", "stop", "please", "thank you", "all done"]
  },
  "relationships/feelings-together": {
    label: "Feelings Together",
    children: ["Happy Together", "Sad Together", "Mad Together", "Scared Together", "Repair Together"]
  },
  "relationships/feelings-together/happy-together": {
    label: "Happy Together",
    children: ["happy", "excited", "proud", "fun", "good job", "I like you", "I love you", "play with me", "thank you", "again", "more", "good"]
  },
  "relationships/feelings-together/sad-together": {
    label: "Sad Together",
    children: ["sad", "lonely", "I miss you", "I need hug", "stay with me", "come back", "sorry", "help me", "mom", "dad", "friend", "teacher"]
  },
  "relationships/feelings-together/mad-together": {
    label: "Mad Together",
    children: ["mad", "angry", "frustrated", "stop please", "I need space", "wait", "not fair", "sorry", "try again", "help me", "all done", "finished"]
  },
  "relationships/feelings-together/scared-together": {
    label: "Scared Together",
    children: ["scared", "worried", "nervous", "help me", "stay with me", "safe", "stop", "mom", "dad", "teacher", "hug", "quiet"]
  },
  "relationships/feelings-together/repair-together": {
    label: "Repair Together",
    children: ["sorry", "I'm sorry", "it's okay", "try again", "I forgive you", "help me", "listen", "look", "talk to me", "thank you", "please", "good job"]
  },
  "relationships/school-people": {
    label: "School People",
    children: ["Teachers", "Classmates", "School Helpers", "Bus People", "Therapy People"]
  },
  "relationships/school-people/teachers": {
    label: "Teachers",
    children: ["teacher", "helper", "principal", "speech teacher", "I need help", "I don't understand", "show me", "tell me", "again", "bathroom", "break", "finished"]
  },
  "relationships/school-people/classmates": {
    label: "Classmates",
    children: ["friend", "classmate", "student", "kids", "my turn", "your turn", "share", "play with me", "stop please", "thank you", "sorry", "good job"]
  },
  "relationships/school-people/school-helpers": {
    label: "School Helpers",
    children: ["nurse", "helper", "teacher", "principal", "office", "lunch helper", "I am hurt", "I feel sick", "bathroom", "medicine", "help me", "safe"]
  },
  "relationships/school-people/bus-people": {
    label: "Bus People",
    children: ["bus driver", "bus helper", "seat", "stop", "home", "school", "wait", "help me", "too loud", "safe", "I am scared", "all done"]
  },
  "relationships/school-people/therapy-people": {
    label: "Therapy People",
    children: ["therapist", "speech teacher", "doctor", "helper", "teacher", "talk", "listen", "try", "again", "good job", "break", "finished"]
  },

  "feelings": {
    label: "Feelings",
    children: ["Happy Feelings", "Sad Feelings", "Mad Feelings", "Scared Feelings", "Body Feelings", "Energy Feelings", "Calm Tools", "Social Feelings", "Feeling Needs"]
  },
  "feelings/happy-feelings": {
    label: "Happy Feelings",
    children: ["Happy", "Excited", "Proud", "Silly", "Good", "Safe Happy"]
  },
  "feelings/happy-feelings/happy": {
    label: "Happy",
    children: ["happy", "I am happy", "I feel happy", "good", "great", "fun", "I like it", "I love it", "more", "again", "thank you", "yes"]
  },
  "feelings/happy-feelings/excited": {
    label: "Excited",
    children: ["excited", "really excited", "I want more", "again", "fun", "go", "play", "outside", "party", "game", "music", "happy"]
  },
  "feelings/happy-feelings/proud": {
    label: "Proud",
    children: ["proud", "I did it", "good job", "I tried", "I worked hard", "you did it", "great job", "I can", "again", "thank you", "happy", "smile"]
  },
  "feelings/happy-feelings/silly": {
    label: "Silly",
    children: ["silly", "funny", "laugh", "joke", "play", "again", "fun", "happy", "music", "dance", "game", "more"]
  },
  "feelings/happy-feelings/good": {
    label: "Good",
    children: ["good", "great", "okay", "better", "nice", "safe", "calm", "ready", "I am okay", "I feel good", "thank you", "yes"]
  },
  "feelings/happy-feelings/safe-happy": {
    label: "Safe Happy",
    children: ["safe", "calm", "okay", "happy", "comfortable", "home", "mom", "dad", "teacher", "hug", "quiet", "thank you"]
  },
  "feelings/sad-feelings": {
    label: "Sad Feelings",
    children: ["Sad", "Lonely", "Missing Someone", "Crying", "Disappointed", "Need Comfort"]
  },
  "feelings/sad-feelings/sad": {
    label: "Sad",
    children: ["sad", "I am sad", "I feel sad", "not okay", "upset", "cry", "help me", "hug", "quiet", "space", "mom", "dad"]
  },
  "feelings/sad-feelings/lonely": {
    label: "Lonely",
    children: ["lonely", "I feel lonely", "alone", "stay with me", "sit with me", "talk to me", "play with me", "mom", "dad", "friend", "teacher", "hug"]
  },
  "feelings/sad-feelings/missing-someone": {
    label: "Missing Someone",
    children: ["I miss you", "miss you", "come back", "where is mom", "where is dad", "call mom", "call dad", "home", "hug", "sad", "lonely", "wait"]
  },
  "feelings/sad-feelings/crying": {
    label: "Crying",
    children: ["cry", "tears", "sad", "hurt", "upset", "help me", "hug", "quiet", "space", "tissue", "mom", "dad"]
  },
  "feelings/sad-feelings/disappointed": {
    label: "Disappointed",
    children: ["disappointed", "not fair", "I wanted that", "no", "sad", "mad", "try again", "wait", "all done", "finished", "help me", "because"]
  },
  "feelings/sad-feelings/need-comfort": {
    label: "Need Comfort",
    children: ["Can I have a hug", "I need hug", "stay with me", "help me", "quiet", "space", "blanket", "toy", "water", "mom", "dad", "teacher"]
  },
  "feelings/mad-feelings": {
    label: "Mad Feelings",
    children: ["Mad", "Angry", "Frustrated", "Too Much", "Need Space", "Stop Words"]
  },
  "feelings/mad-feelings/mad": {
    label: "Mad",
    children: ["mad", "I am mad", "I feel mad", "upset", "no", "stop", "not fair", "I don't want", "help me", "because", "wait", "finished"]
  },
  "feelings/mad-feelings/angry": {
    label: "Angry",
    children: ["angry", "very mad", "stop", "no", "too much", "I need space", "I need break", "quiet", "safe", "help me", "all done", "please"]
  },
  "feelings/mad-feelings/frustrated": {
    label: "Frustrated",
    children: ["frustrated", "hard", "I can't", "help me", "try again", "wait", "show me", "I don't understand", "stop", "break", "finished", "because"]
  },
  "feelings/mad-feelings/too-much": {
    label: "Too Much",
    children: ["too much", "too loud", "too bright", "too close", "stop", "quiet", "space", "break", "inside", "home", "help me", "all done"]
  },
  "feelings/mad-feelings/need-space": {
    label: "Need Space",
    children: ["I need space", "space", "quiet", "break", "stop please", "not close", "wait", "safe", "chair", "room", "inside", "all done"]
  },
  "feelings/mad-feelings/stop-words": {
    label: "Stop Words",
    children: ["stop", "stop please", "no", "don't", "wait", "finished", "all done", "too much", "help me", "safe", "because", "please"]
  },
  "feelings/scared-feelings": {
    label: "Scared Feelings",
    children: ["Scared", "Worried", "Nervous", "Unsafe", "Loud/Dark", "Need Safety"]
  },
  "feelings/scared-feelings/scared": {
    label: "Scared",
    children: ["scared", "I am scared", "I feel scared", "help me", "mom", "dad", "teacher", "safe", "hug", "stay with me", "stop", "quiet"]
  },
  "feelings/scared-feelings/worried": {
    label: "Worried",
    children: ["worried", "what happens", "where is mom", "where is dad", "wait", "help me", "safe", "teacher", "home", "doctor", "because", "please"]
  },
  "feelings/scared-feelings/nervous": {
    label: "Nervous",
    children: ["nervous", "shy", "worried", "new place", "new person", "wait", "help me", "show me", "talk to me", "quiet", "safe", "hug"]
  },
  "feelings/scared-feelings/unsafe": {
    label: "Unsafe",
    children: ["unsafe", "not safe", "help me", "stop", "go away", "hurt", "danger", "teacher", "mom", "dad", "doctor", "safe person"]
  },
  "feelings/scared-feelings/loud-dark": {
    label: "Loud/Dark",
    children: ["too loud", "dark", "light", "quiet", "headphones", "inside", "home", "stop", "break", "space", "help me", "safe"]
  },
  "feelings/scared-feelings/need-safety": {
    label: "Need Safety",
    children: ["safe", "help me", "stay with me", "hug", "mom", "dad", "teacher", "quiet", "space", "inside", "home", "stop"]
  },
  "feelings/body-feelings": {
    label: "Body Feelings",
    children: ["Hurt", "Sick", "Tired", "Hungry/Thirsty", "Temperature", "Bathroom Body"]
  },
  "feelings/body-feelings/hurt": {
    label: "Hurt",
    children: ["hurt", "pain", "head hurts", "stomach hurts", "ear hurts", "mouth hurts", "hand hurts", "foot hurts", "back hurts", "help me", "doctor", "medicine"]
  },
  "feelings/body-feelings/sick": {
    label: "Sick",
    children: ["sick", "I feel sick", "throw up", "cough", "runny nose", "fever", "stomach hurts", "medicine", "doctor", "nurse", "rest", "water"]
  },
  "feelings/body-feelings/tired": {
    label: "Tired",
    children: ["tired", "sleepy", "rest", "bed", "nap", "quiet", "blanket", "dark room", "all done", "break", "home", "good night"]
  },
  "feelings/body-feelings/hungry-thirsty": {
    label: "Hungry/Thirsty",
    children: ["hungry", "thirsty", "food", "snack", "water", "drink", "juice", "milk", "eat", "more", "all done", "please"]
  },
  "feelings/body-feelings/temperature": {
    label: "Temperature",
    children: ["hot", "cold", "too hot", "too cold", "sweater", "blanket", "fan", "water", "ice", "outside", "inside", "help me"]
  },
  "feelings/body-feelings/bathroom-body": {
    label: "Bathroom Body",
    children: ["bathroom", "toilet", "pee", "poop", "wash hands", "privacy", "help me", "now", "wait", "all done", "pants", "clean"]
  },
  "feelings/energy-feelings": {
    label: "Energy Feelings",
    children: ["Low Energy", "High Energy", "Wiggly", "Need Break", "Ready", "Not Ready"]
  },
  "feelings/energy-feelings/low-energy": {
    label: "Low Energy",
    children: ["tired", "sleepy", "slow", "rest", "break", "bed", "quiet", "water", "snack", "all done", "finished", "home"]
  },
  "feelings/energy-feelings/high-energy": {
    label: "High Energy",
    children: ["excited", "fast", "busy", "play", "run", "jump", "outside", "music", "dance", "again", "more", "fun"]
  },
  "feelings/energy-feelings/wiggly": {
    label: "Wiggly",
    children: ["wiggly", "move", "jump", "walk", "outside", "swing", "fidget", "break", "chair", "stand", "sit", "help me"]
  },
  "feelings/energy-feelings/need-break": {
    label: "Need Break",
    children: ["I need break", "break", "quiet", "space", "rest", "water", "snack", "bathroom", "all done", "finished", "inside", "home"]
  },
  "feelings/energy-feelings/ready": {
    label: "Ready",
    children: ["ready", "I am ready", "go", "start", "try", "play", "work", "school", "listen", "look", "yes", "again"]
  },
  "feelings/energy-feelings/not-ready": {
    label: "Not Ready",
    children: ["not ready", "wait", "break", "help me", "show me", "tell me", "I don't understand", "scared", "nervous", "no", "please", "later"]
  },
  "feelings/calm-tools": {
    label: "Calm Tools",
    children: ["Quiet", "Space", "Breathing", "Comfort Items", "Comfort People", "Calm Places"]
  },
  "feelings/calm-tools/quiet": {
    label: "Quiet",
    children: ["quiet", "too loud", "headphones", "soft voice", "stop", "inside", "room", "music off", "wait", "calm", "safe", "thank you"]
  },
  "feelings/calm-tools/space": {
    label: "Space",
    children: ["space", "I need space", "not close", "wait", "chair", "room", "break", "safe", "all done", "finished", "quiet", "help me"]
  },
  "feelings/calm-tools/breathing": {
    label: "Breathing",
    children: ["breathe", "slow breath", "help me breathe", "calm", "safe", "okay", "wait", "count", "again", "quiet", "space", "thank you"]
  },
  "feelings/calm-tools/comfort-items": {
    label: "Comfort Items",
    children: ["blanket", "toy", "tablet", "book", "music", "water", "snack", "headphones", "light", "bed", "chair", "fidget"]
  },
  "feelings/calm-tools/comfort-people": {
    label: "Comfort People",
    children: ["mom", "dad", "teacher", "friend", "grandma", "grandpa", "helper", "nurse", "hug", "stay with me", "talk to me", "sit with me"]
  },
  "feelings/calm-tools/calm-places": {
    label: "Calm Places",
    children: ["home", "inside", "bedroom", "quiet room", "bathroom", "car", "chair", "bed", "outside", "park", "safe place", "school nurse"]
  },
  "feelings/social-feelings": {
    label: "Social Feelings",
    children: ["Lonely", "Proud", "Sorry", "Shy", "Friend Feelings", "Family Feelings"]
  },
  "feelings/social-feelings/lonely": {
    label: "Lonely",
    children: ["lonely", "I feel lonely", "alone", "friend", "family", "stay with me", "talk to me", "play with me", "hug", "I miss you", "come here", "help me"]
  },
  "feelings/social-feelings/proud": {
    label: "Proud",
    children: ["proud", "good job", "I did it", "you did it", "I tried", "great job", "I can", "again", "thank you", "happy", "teacher", "family"]
  },
  "feelings/social-feelings/sorry": {
    label: "Sorry",
    children: ["sorry", "I'm sorry", "it's okay", "try again", "help me", "I didn't mean to", "thank you", "please", "wait", "friend", "teacher", "family"]
  },
  "feelings/social-feelings/shy": {
    label: "Shy",
    children: ["shy", "nervous", "new person", "wait", "hide", "quiet", "help me", "mom", "dad", "teacher", "safe", "no thank you"]
  },
  "feelings/social-feelings/friend-feelings": {
    label: "Friend Feelings",
    children: ["happy", "sad", "mad", "lonely", "excited", "proud", "play with me", "friend", "sorry", "thank you", "hug", "good job"]
  },
  "feelings/social-feelings/family-feelings": {
    label: "Family Feelings",
    children: ["I love you", "I miss you", "happy", "sad", "scared", "safe", "hug", "mom", "dad", "family", "home", "thank you"]
  },
  "feelings/feeling-needs": {
    label: "Feeling Needs",
    children: ["Help Needs", "Body Needs", "Comfort Needs", "People Needs", "Stop Needs", "Finish Needs"]
  },
  "feelings/feeling-needs/help-needs": {
    label: "Help Needs",
    children: ["I need help", "help me", "show me", "tell me", "I don't understand", "I am stuck", "teacher", "mom", "dad", "please", "now", "again"]
  },
  "feelings/feeling-needs/body-needs": {
    label: "Body Needs",
    children: ["I need bathroom", "I need water", "I need food", "I need medicine", "I need rest", "I am hurt", "I feel sick", "doctor", "nurse", "help me", "now", "please"]
  },
  "feelings/feeling-needs/comfort-needs": {
    label: "Comfort Needs",
    children: ["I need hug", "I need quiet", "I need space", "blanket", "toy", "music", "headphones", "stay with me", "sit with me", "safe", "calm", "thank you"]
  },
  "feelings/feeling-needs/people-needs": {
    label: "People Needs",
    children: ["I need mom", "I need dad", "I need teacher", "I need doctor", "I need nurse", "I need friend", "call mom", "call dad", "stay with me", "help me", "please", "now"]
  },
  "feelings/feeling-needs/stop-needs": {
    label: "Stop Needs",
    children: ["stop", "stop please", "too much", "too loud", "not close", "I need break", "I need space", "help me", "safe", "no", "finished", "all done"]
  },
  "feelings/feeling-needs/finish-needs": {
    label: "Finish Needs",
    children: ["finished", "all done", "I am done", "no more", "stop", "break", "home", "inside", "wait", "thank you", "please", "help me"]
  },

  "food-and-drink": {
    label: "Food & Drink",
    children: ["Fruit", "Produce", "Snacks", "Meals", "Breakfast", "Fast Food", "Drinks", "Sweets", "Hot Food", "Cold Food"]
  },
  "food-and-drink/fruit": {
    label: "Fruit",
    children: ["Common Fruit", "Berries", "Citrus", "Melon", "Tropical Fruit", "Fruit Cups"]
  },
  "food-and-drink/fruit/common-fruit": {
    label: "Common Fruit",
    children: ["apple", "banana", "grapes", "orange", "strawberry", "blueberry", "watermelon", "peach", "pear", "applesauce", "raisins", "fruit cup"]
  },
  "food-and-drink/fruit/berries": {
    label: "Berries",
    children: ["strawberry", "blueberry", "raspberry", "blackberry", "berries", "berry yogurt", "berry smoothie", "more berries", "all done", "sweet", "cold", "snack"]
  },
  "food-and-drink/fruit/citrus": {
    label: "Citrus",
    children: ["orange", "mandarin orange", "clementine", "grapefruit", "lemon", "lime", "orange juice", "sour", "sweet", "fruit", "more", "all done"]
  },
  "food-and-drink/fruit/melon": {
    label: "Melon",
    children: ["watermelon", "cantaloupe", "honeydew", "melon", "cold fruit", "fruit cup", "sweet", "more", "all done", "snack", "juice", "water"]
  },
  "food-and-drink/fruit/tropical-fruit": {
    label: "Tropical Fruit",
    children: ["pineapple", "mango", "banana", "kiwi", "coconut", "papaya", "fruit cup", "smoothie", "sweet", "more", "all done", "cold"]
  },
  "food-and-drink/fruit/fruit-cups": {
    label: "Fruit Cups",
    children: ["fruit cup", "applesauce", "peaches cup", "mandarin oranges", "mixed fruit", "raisins", "pouch", "spoon", "cold", "snack", "more", "all done"]
  },
  "food-and-drink/produce": {
    label: "Produce",
    children: ["Vegetables", "Crunchy Produce", "Soft Produce", "Potatoes", "Salads", "Dips"]
  },
  "food-and-drink/produce/vegetables": {
    label: "Vegetables",
    children: ["carrot", "corn", "peas", "green beans", "broccoli", "cucumber", "tomato", "lettuce", "celery", "vegetables", "more vegetables", "all done"]
  },
  "food-and-drink/produce/crunchy-produce": {
    label: "Crunchy Produce",
    children: ["carrot", "cucumber", "celery", "apple", "pickle", "lettuce", "chips", "crunchy", "dip", "ranch", "more", "all done"]
  },
  "food-and-drink/produce/soft-produce": {
    label: "Soft Produce",
    children: ["banana", "avocado", "peas", "corn", "sweet potato", "cooked carrots", "applesauce", "soft", "warm", "spoon", "more", "all done"]
  },
  "food-and-drink/produce/potatoes": {
    label: "Potatoes",
    children: ["potato", "sweet potato", "french fries", "tater tots", "mashed potatoes", "hash browns", "baked potato", "ketchup", "butter", "hot", "more", "all done"]
  },
  "food-and-drink/produce/salads": {
    label: "Salads",
    children: ["salad", "lettuce", "tomato", "cucumber", "carrot", "cheese", "croutons", "ranch", "fork", "cold", "more", "all done"]
  },
  "food-and-drink/produce/dips": {
    label: "Dips",
    children: ["ranch", "ketchup", "hummus", "cheese dip", "salsa", "guacamole", "dip", "carrot", "chips", "cucumber", "more", "all done"]
  },
  "food-and-drink/snacks": {
    label: "Snacks",
    children: ["Chips", "Gummies", "Crackers", "Cookies", "Bars", "Cold Snacks", "Crunchy Snacks"]
  },
  "food-and-drink/snacks/chips": {
    label: "Chips",
    children: ["chips", "potato chips", "tortilla chips", "cheese puffs", "Doritos", "Cheetos", "Pringles", "pretzels", "popcorn", "crunchy", "more chips", "all done"]
  },
  "food-and-drink/snacks/gummies": {
    label: "Gummies",
    children: ["gummies", "fruit snacks", "gummy bears", "gummy worms", "Welch's fruit snacks", "Scooby snacks", "sweet", "chewy", "more gummies", "all done", "please", "thank you"]
  },
  "food-and-drink/snacks/crackers": {
    label: "Crackers",
    children: ["crackers", "Goldfish", "Cheez-It", "Ritz", "saltines", "graham crackers", "animal crackers", "pretzels", "cheese", "crunchy", "more", "all done"]
  },
  "food-and-drink/snacks/cookies": {
    label: "Cookies",
    children: ["cookie", "cookies", "Oreos", "chocolate chip cookie", "graham cracker", "animal crackers", "brownie", "sweet", "milk", "more cookie", "all done", "treat"]
  },
  "food-and-drink/snacks/bars": {
    label: "Bars",
    children: ["granola bar", "cereal bar", "breakfast bar", "protein bar", "fruit bar", "Nutri-Grain bar", "Rice Krispies treat", "snack bar", "more", "all done", "wrapper", "open"]
  },
  "food-and-drink/snacks/cold-snacks": {
    label: "Cold Snacks",
    children: ["yogurt", "applesauce", "pudding", "cheese stick", "fruit cup", "smoothie", "ice cream", "popsicle", "cold", "spoon", "more", "all done"]
  },
  "food-and-drink/snacks/crunchy-snacks": {
    label: "Crunchy Snacks",
    children: ["chips", "crackers", "pretzels", "popcorn", "Goldfish", "Cheez-It", "rice cake", "trail mix", "carrot", "apple", "crunchy", "more"]
  },
  "food-and-drink/meals": {
    label: "Meals",
    children: ["Kid Favorites", "Chicken Meals", "Pizza Meals", "Sandwich Meals", "Pasta Meals", "Soup & Rice", "Mexican Foods"]
  },
  "food-and-drink/meals/kid-favorites": {
    label: "Kid Favorites",
    children: ["chicken nuggets", "french fries", "pizza", "mac and cheese", "hot dog", "hamburger", "grilled cheese", "quesadilla", "pancakes", "waffles", "cereal", "kids meal"]
  },
  "food-and-drink/meals/chicken-meals": {
    label: "Chicken Meals",
    children: ["chicken nuggets", "chicken tenders", "chicken sandwich", "grilled chicken", "fried chicken", "chicken strips", "chicken and rice", "dipping sauce", "ketchup", "more chicken", "all done", "hot"]
  },
  "food-and-drink/meals/pizza-meals": {
    label: "Pizza Meals",
    children: ["pizza", "cheese pizza", "pepperoni pizza", "sausage pizza", "slice", "breadsticks", "cheesy bread", "dipping sauce", "more pizza", "all done", "hot", "wait"]
  },
  "food-and-drink/meals/sandwich-meals": {
    label: "Sandwich Meals",
    children: ["sandwich", "grilled cheese", "turkey sandwich", "ham sandwich", "peanut butter sandwich", "jelly sandwich", "chicken sandwich", "cheese", "bread", "chips", "more", "all done"]
  },
  "food-and-drink/meals/pasta-meals": {
    label: "Pasta Meals",
    children: ["pasta", "spaghetti", "mac and cheese", "meatballs", "noodles", "butter noodles", "sauce", "cheese", "fork", "spoon", "more", "all done"]
  },
  "food-and-drink/meals/soup-rice": {
    label: "Soup & Rice",
    children: ["soup", "chicken soup", "noodle soup", "rice", "beans and rice", "chicken and rice", "spoon", "hot", "cool down", "wait", "more", "all done"]
  },
  "food-and-drink/meals/mexican-foods": {
    label: "Mexican Foods",
    children: ["taco", "soft taco", "quesadilla", "burrito", "nachos", "chips", "cheese", "salsa", "rice", "beans", "chicken", "beef"]
  },
  "food-and-drink/breakfast": {
    label: "Breakfast",
    children: ["Cereal", "Hot Breakfast", "Bakery Breakfast", "Eggs & Meat", "Breakfast Drinks", "Breakfast Snacks"]
  },
  "food-and-drink/breakfast/cereal": {
    label: "Cereal",
    children: ["cereal", "Cheerios", "Frosted Flakes", "Lucky Charms", "Fruit Loops", "Cinnamon Toast Crunch", "Rice Krispies", "milk", "bowl", "spoon", "more cereal", "all done"]
  },
  "food-and-drink/breakfast/hot-breakfast": {
    label: "Hot Breakfast",
    children: ["oatmeal", "pancakes", "waffles", "eggs", "hash browns", "bacon", "sausage", "toast", "hot", "syrup", "butter", "wait"]
  },
  "food-and-drink/breakfast/bakery-breakfast": {
    label: "Bakery Breakfast",
    children: ["toast", "bagel", "muffin", "donut", "croissant", "waffle", "pancake", "butter", "jelly", "cream cheese", "more", "all done"]
  },
  "food-and-drink/breakfast/eggs-meat": {
    label: "Eggs & Meat",
    children: ["eggs", "scrambled eggs", "bacon", "sausage", "breakfast sandwich", "hash browns", "cheese", "toast", "ketchup", "hot", "more", "all done"]
  },
  "food-and-drink/breakfast/breakfast-drinks": {
    label: "Breakfast Drinks",
    children: ["milk", "chocolate milk", "water", "orange juice", "apple juice", "smoothie", "drink", "cup", "straw", "more drink", "all done", "thirsty"]
  },
  "food-and-drink/breakfast/breakfast-snacks": {
    label: "Breakfast Snacks",
    children: ["yogurt", "banana", "apple", "breakfast bar", "granola bar", "cereal bar", "muffin", "applesauce", "pouch", "more", "all done", "snack"]
  },
  "food-and-drink/fast-food": {
    label: "Fast Food",
    children: ["McDonald's", "Burger King", "Wendy's", "Chick-fil-A", "Taco Bell", "Pizza Chains", "Subway", "KFC", "Popeyes", "Sonic", "Dairy Queen", "Fast Food Favorites"]
  },
  "food-and-drink/fast-food/mcdonalds": {
    label: "McDonald's",
    children: ["chicken nuggets", "french fries", "cheeseburger", "hamburger", "Happy Meal", "apple slices", "milk", "chocolate milk", "apple juice", "soda", "McFlurry", "ice cream cone", "hash browns", "breakfast sandwich", "ketchup", "sauce", "water"]
  },
  "food-and-drink/fast-food/burger-king": {
    label: "Burger King",
    children: ["chicken nuggets", "french fries", "cheeseburger", "hamburger", "Whopper", "chicken sandwich", "onion rings", "apple juice", "milk", "soda", "ice cream", "kids meal", "ketchup", "sauce", "water", "breakfast sandwich", "hash browns"]
  },
  "food-and-drink/fast-food/wendys": {
    label: "Wendy's",
    children: ["chicken nuggets", "french fries", "cheeseburger", "hamburger", "Frosty", "chicken sandwich", "apple bites", "lemonade", "soda", "milk", "chocolate milk", "kids meal", "ketchup", "sauce", "water", "baked potato", "chili"]
  },
  "food-and-drink/fast-food/chick-fil-a": {
    label: "Chick-fil-A",
    children: ["chicken nuggets", "waffle fries", "chicken sandwich", "mac and cheese", "fruit cup", "lemonade", "milk", "chocolate milk", "apple juice", "ice cream", "kids meal", "Chick-fil-A sauce", "ketchup", "water", "breakfast biscuit", "hash browns", "grilled nuggets"]
  },
  "food-and-drink/fast-food/taco-bell": {
    label: "Taco Bell",
    children: ["taco", "soft taco", "crunchy taco", "quesadilla", "burrito", "nachos", "chips", "cheese", "cinnamon twists", "soda", "water", "sauce", "beans", "rice", "chicken", "beef", "kids meal"]
  },
  "food-and-drink/fast-food/pizza-chains": {
    label: "Pizza Chains",
    children: ["cheese pizza", "pepperoni pizza", "sausage pizza", "breadsticks", "cheesy bread", "wings", "pasta", "cookie", "brownie", "soda", "water", "dipping sauce", "slice", "whole pizza", "more pizza", "all done", "wait"]
  },
  "food-and-drink/fast-food/subway": {
    label: "Subway",
    children: ["sandwich", "turkey sandwich", "ham sandwich", "chicken sandwich", "meatball sub", "cheese", "lettuce", "tomato", "cucumber", "chips", "cookie", "apple slices", "milk", "juice", "water", "soda", "kids meal"]
  },
  "food-and-drink/fast-food/kfc": {
    label: "KFC",
    children: ["chicken nuggets", "fried chicken", "chicken tenders", "french fries", "mac and cheese", "mashed potatoes", "biscuit", "corn", "coleslaw", "soda", "lemonade", "water", "ketchup", "sauce", "kids meal", "cookie", "more chicken"]
  },
  "food-and-drink/fast-food/popeyes": {
    label: "Popeyes",
    children: ["chicken nuggets", "chicken tenders", "fried chicken", "chicken sandwich", "french fries", "mac and cheese", "biscuit", "mashed potatoes", "red beans and rice", "lemonade", "soda", "water", "ketchup", "sauce", "kids meal", "more chicken", "all done"]
  },
  "food-and-drink/fast-food/sonic": {
    label: "Sonic",
    children: ["chicken nuggets", "corn dog", "hot dog", "french fries", "tater tots", "cheeseburger", "grilled cheese", "milkshake", "slush", "lemonade", "soda", "ice cream", "kids meal", "ketchup", "sauce", "water", "pretzel"]
  },
  "food-and-drink/fast-food/dairy-queen": {
    label: "Dairy Queen",
    children: ["chicken strips", "french fries", "cheeseburger", "hot dog", "grilled cheese", "ice cream", "Blizzard", "milkshake", "sundae", "Dilly Bar", "pretzel sticks", "soda", "water", "kids meal", "ketchup", "sauce", "all done", "more"]
  },
  "food-and-drink/fast-food/fast-food-favorites": {
    label: "Fast Food Favorites",
    children: ["chicken nuggets", "french fries", "cheeseburger", "hamburger", "kids meal", "pizza", "taco", "quesadilla", "chicken sandwich", "grilled cheese", "mac and cheese", "hot dog", "corn dog", "milkshake", "ice cream", "apple slices", "ketchup"]
  },
  "food-and-drink/drinks": {
    label: "Drinks",
    children: ["Water", "Milk", "Juice", "Lemonade", "Smoothies", "Soda", "Hot Drinks", "Drink Tools"]
  },
  "food-and-drink/drinks/water": {
    label: "Water",
    children: ["water", "cold water", "ice water", "bottle water", "cup water", "straw", "more water", "all done", "thirsty", "drink", "please", "thank you"]
  },
  "food-and-drink/drinks/milk": {
    label: "Milk",
    children: ["milk", "chocolate milk", "strawberry milk", "white milk", "cup", "straw", "cold", "more milk", "all done", "breakfast", "cereal", "cookie"]
  },
  "food-and-drink/drinks/juice": {
    label: "Juice",
    children: ["juice", "apple juice", "orange juice", "grape juice", "fruit punch", "juice box", "pouch", "straw", "cold", "more juice", "all done", "thirsty"]
  },
  "food-and-drink/drinks/lemonade": {
    label: "Lemonade",
    children: ["lemonade", "pink lemonade", "strawberry lemonade", "ice", "straw", "cold", "sour", "sweet", "more lemonade", "all done", "drink", "cup"]
  },
  "food-and-drink/drinks/smoothies": {
    label: "Smoothies",
    children: ["smoothie", "strawberry smoothie", "banana smoothie", "berry smoothie", "yogurt smoothie", "fruit smoothie", "cold", "straw", "cup", "more", "all done", "drink"]
  },
  "food-and-drink/drinks/soda": {
    label: "Soda",
    children: ["soda", "cola", "root beer", "sprite", "orange soda", "cup", "straw", "ice", "bubbles", "more soda", "all done", "no soda"]
  },
  "food-and-drink/drinks/hot-drinks": {
    label: "Hot Drinks",
    children: ["hot chocolate", "warm milk", "tea", "coffee", "too hot", "cool down", "wait", "cup", "sip", "marshmallow", "more", "all done"]
  },
  "food-and-drink/drinks/drink-tools": {
    label: "Drink Tools",
    children: ["cup", "straw", "bottle", "lid", "ice", "open", "close", "spill", "wipe", "more drink", "all done", "help me"]
  },
  "food-and-drink/sweets": {
    label: "Sweets",
    children: ["Candy", "Chocolate", "Cookies", "Cake", "Ice Cream", "Pudding", "Frozen Treats"]
  },
  "food-and-drink/sweets/candy": {
    label: "Candy",
    children: ["candy", "gummies", "gummy bears", "gummy worms", "lollipop", "Skittles", "M&M's", "fruit snacks", "sweet", "treat", "more candy", "all done"]
  },
  "food-and-drink/sweets/chocolate": {
    label: "Chocolate",
    children: ["chocolate", "chocolate bar", "M&M's", "brownie", "chocolate milk", "chocolate chip cookie", "hot chocolate", "sweet", "more", "all done", "treat", "milk"]
  },
  "food-and-drink/sweets/cookies": {
    label: "Cookies",
    children: ["cookie", "cookies", "Oreo", "chocolate chip cookie", "sugar cookie", "animal crackers", "graham cracker", "milk", "sweet", "more cookie", "all done", "treat"]
  },
  "food-and-drink/sweets/cake": {
    label: "Cake",
    children: ["cake", "cupcake", "birthday cake", "brownie", "donut", "muffin", "frosting", "sprinkles", "sweet", "more cake", "all done", "treat"]
  },
  "food-and-drink/sweets/ice-cream": {
    label: "Ice Cream",
    children: ["ice cream", "vanilla ice cream", "chocolate ice cream", "strawberry ice cream", "cone", "cup", "sprinkles", "milkshake", "cold", "more", "all done", "treat"]
  },
  "food-and-drink/sweets/pudding": {
    label: "Pudding",
    children: ["pudding", "chocolate pudding", "vanilla pudding", "spoon", "cup", "cold", "sweet", "more pudding", "all done", "snack", "treat", "open"]
  },
  "food-and-drink/sweets/frozen-treats": {
    label: "Frozen Treats",
    children: ["popsicle", "ice cream", "ice cream sandwich", "Dilly Bar", "frozen yogurt", "slush", "cold", "too cold", "more", "all done", "treat", "sweet"]
  },
  "food-and-drink/hot-food": {
    label: "Hot Food",
    children: ["Hot Breakfast", "Hot Meals", "Hot Snacks", "Hot Drinks", "Too Hot"]
  },
  "food-and-drink/hot-food/hot-breakfast": {
    label: "Hot Breakfast",
    children: ["oatmeal", "pancakes", "waffles", "eggs", "toast", "hash browns", "bacon", "sausage", "hot", "cool down", "wait", "more"]
  },
  "food-and-drink/hot-food/hot-meals": {
    label: "Hot Meals",
    children: ["soup", "mac and cheese", "chicken nuggets", "pizza", "pasta", "spaghetti", "rice", "hot dog", "grilled cheese", "hot", "cool down", "wait"]
  },
  "food-and-drink/hot-food/hot-snacks": {
    label: "Hot Snacks",
    children: ["pretzel", "popcorn", "pizza rolls", "hot pocket", "tater tots", "french fries", "warm cookie", "hot", "cool down", "wait", "more", "all done"]
  },
  "food-and-drink/hot-food/hot-drinks": {
    label: "Hot Drinks",
    children: ["hot chocolate", "warm milk", "tea", "too hot", "cool down", "wait", "sip", "cup", "marshmallow", "more", "all done", "help me"]
  },
  "food-and-drink/hot-food/too-hot": {
    label: "Too Hot",
    children: ["too hot", "cool down", "wait", "blow on it", "cold water", "help me", "hot", "hurt", "stop", "all done", "more", "please"]
  },
  "food-and-drink/cold-food": {
    label: "Cold Food",
    children: ["Cold Snacks", "Cold Meals", "Cold Drinks", "Frozen Foods", "Too Cold"]
  },
  "food-and-drink/cold-food/cold-snacks": {
    label: "Cold Snacks",
    children: ["yogurt", "applesauce", "fruit cup", "cheese stick", "pudding", "cold", "spoon", "open", "more", "all done", "snack", "please"]
  },
  "food-and-drink/cold-food/cold-meals": {
    label: "Cold Meals",
    children: ["sandwich", "salad", "cold pizza", "lunchable", "cheese", "turkey", "ham", "fruit cup", "chips", "cold", "more", "all done"]
  },
  "food-and-drink/cold-food/cold-drinks": {
    label: "Cold Drinks",
    children: ["water", "milk", "juice", "smoothie", "lemonade", "ice", "straw", "cup", "cold", "more drink", "all done", "thirsty"]
  },
  "food-and-drink/cold-food/frozen-foods": {
    label: "Frozen Foods",
    children: ["ice cream", "popsicle", "frozen yogurt", "ice cream sandwich", "slush", "frozen fruit", "cold", "too cold", "treat", "more", "all done", "wait"]
  },
  "food-and-drink/cold-food/too-cold": {
    label: "Too Cold",
    children: ["too cold", "wait", "warm up", "hurt teeth", "stop", "all done", "water", "help me", "cold", "no more", "finished", "please"]
  },

  // V5.21 — Remaining sidebar topics expanded with the same drilldown structure.
  // Pattern: topic → branch → sub-branch → selectable word.

  "places": {
    label: "Places",
    children: ["Home Places", "School Places", "Outside Places", "Community Places", "Travel Places", "Care Places", "Room Places", "Place Words"]
  },
  "places/home-places": {
    label: "Home Places",
    children: ["Inside Home", "Bedroom", "Bathroom", "Kitchen", "Living Room", "Yard", "Home Needs"]
  },
  "places/home-places/inside-home": {
    label: "Inside Home",
    children: ["home", "inside", "house", "apartment", "room", "hallway", "stairs", "door", "window", "floor", "couch", "chair"]
  },
  "places/home-places/bedroom": {
    label: "Bedroom",
    children: ["bedroom", "bed", "blanket", "pillow", "closet", "dresser", "lamp", "night light", "tablet", "book", "toy", "sleep"]
  },
  "places/home-places/bathroom": {
    label: "Bathroom",
    children: ["bathroom", "toilet", "sink", "tub", "shower", "soap", "towel", "wash hands", "brush teeth", "potty", "privacy", "help me"]
  },
  "places/home-places/kitchen": {
    label: "Kitchen",
    children: ["kitchen", "table", "chair", "fridge", "freezer", "sink", "cup", "plate", "spoon", "fork", "food", "drink"]
  },
  "places/home-places/living-room": {
    label: "Living Room",
    children: ["living room", "couch", "chair", "tv", "remote", "tablet", "toy", "blanket", "music", "game", "family", "sit"]
  },
  "places/home-places/yard": {
    label: "Yard",
    children: ["yard", "outside", "grass", "tree", "swing", "porch", "driveway", "garage", "play", "ball", "bike", "go inside"]
  },
  "places/home-places/home-needs": {
    label: "Home Needs",
    children: ["go home", "stay home", "inside", "outside", "bathroom", "bedroom", "kitchen", "water", "snack", "blanket", "help me", "safe"]
  },

  "places/school-places": {
    label: "School Places",
    children: ["Classroom", "Playground", "Cafeteria", "Library", "Nurse Office", "Bus Area", "School Needs"]
  },
  "places/school-places/classroom": {
    label: "Classroom",
    children: ["classroom", "desk", "chair", "rug", "table", "board", "computer", "pencil", "paper", "book", "teacher", "class"]
  },
  "places/school-places/playground": {
    label: "Playground",
    children: ["playground", "slide", "swing", "climber", "sandbox", "ball", "run", "jump", "outside", "friend", "my turn", "all done"]
  },
  "places/school-places/cafeteria": {
    label: "Cafeteria",
    children: ["cafeteria", "lunch room", "table", "chair", "tray", "lunch", "milk", "water", "snack", "food", "trash", "all done"]
  },
  "places/school-places/library": {
    label: "Library",
    children: ["library", "book", "read", "quiet", "shelf", "computer", "story", "sit", "teacher", "friend", "help me", "all done"]
  },
  "places/school-places/nurse-office": {
    label: "Nurse Office",
    children: ["nurse office", "nurse", "medicine", "hurt", "sick", "rest", "water", "bathroom", "call mom", "call dad", "help me", "safe"]
  },
  "places/school-places/bus-area": {
    label: "Bus Area",
    children: ["bus", "bus stop", "bus line", "seat", "driver", "home", "school", "wait", "too loud", "safe", "help me", "all done"]
  },
  "places/school-places/school-needs": {
    label: "School Needs",
    children: ["go to class", "go to bathroom", "go to nurse", "go outside", "go inside", "go home", "break", "help me", "teacher", "friend", "finished", "wait"]
  },

  "places/outside-places": {
    label: "Outside Places",
    children: ["Park", "Playground Outside", "Yard Outside", "Water Places", "Animal Places", "Outside Safety"]
  },
  "places/outside-places/park": {
    label: "Park",
    children: ["park", "grass", "tree", "bench", "path", "picnic", "play", "walk", "run", "friend", "water", "go home"]
  },
  "places/outside-places/playground-outside": {
    label: "Playground Outside",
    children: ["playground", "slide", "swing", "climber", "seesaw", "sandbox", "ball", "run", "jump", "my turn", "your turn", "stop"]
  },
  "places/outside-places/yard-outside": {
    label: "Yard Outside",
    children: ["yard", "porch", "driveway", "garage", "grass", "tree", "swing", "bike", "ball", "outside", "inside", "help me"]
  },
  "places/outside-places/water-places": {
    label: "Water Places",
    children: ["pool", "splash pad", "beach", "lake", "bath", "water", "swim", "wet", "towel", "safe", "stop", "all done"]
  },
  "places/outside-places/animal-places": {
    label: "Animal Places",
    children: ["zoo", "farm", "pet store", "dog park", "animal", "dog", "cat", "bird", "fish", "look", "scared", "safe"]
  },
  "places/outside-places/outside-safety": {
    label: "Outside Safety",
    children: ["stop", "wait", "hold hand", "stay with me", "too hot", "too cold", "water", "shade", "inside", "safe", "help me", "all done"]
  },

  "places/community-places": {
    label: "Community Places",
    children: ["Stores", "Restaurants", "Medical Places", "Family Places", "Fun Places", "Quiet Places"]
  },
  "places/community-places/stores": {
    label: "Stores",
    children: ["store", "grocery store", "toy store", "clothes store", "pharmacy", "cart", "checkout", "line", "snack", "toy", "go home", "help me"]
  },
  "places/community-places/restaurants": {
    label: "Restaurants",
    children: ["restaurant", "fast food", "table", "chair", "menu", "drink", "food", "fries", "nuggets", "pizza", "all done", "go home"]
  },
  "places/community-places/medical-places": {
    label: "Medical Places",
    children: ["doctor", "dentist", "hospital", "clinic", "therapy", "nurse", "medicine", "hurt", "sick", "wait", "help me", "safe"]
  },
  "places/community-places/family-places": {
    label: "Family Places",
    children: ["grandma house", "grandpa house", "friend house", "family house", "home", "visit", "hug", "play", "eat", "go home", "stay", "bye"]
  },
  "places/community-places/fun-places": {
    label: "Fun Places",
    children: ["movie", "museum", "zoo", "park", "play place", "arcade", "library", "pool", "party", "game", "more", "all done"]
  },
  "places/community-places/quiet-places": {
    label: "Quiet Places",
    children: ["quiet room", "library", "bedroom", "car", "home", "nurse office", "corner", "chair", "blanket", "break", "space", "safe"]
  },

  "places/travel-places": {
    label: "Travel Places",
    children: ["Car", "Bus", "Walking", "Parking", "Trips", "Travel Needs"]
  },
  "places/travel-places/car": {
    label: "Car",
    children: ["car", "car seat", "seat belt", "door", "window", "music", "tablet", "snack", "water", "go home", "stop car", "help me"]
  },
  "places/travel-places/bus": {
    label: "Bus",
    children: ["bus", "bus seat", "bus driver", "bus stop", "school bus", "wait", "too loud", "friend", "home", "school", "safe", "all done"]
  },
  "places/travel-places/walking": {
    label: "Walking",
    children: ["walk", "sidewalk", "crosswalk", "hold hand", "stop", "wait", "go", "outside", "inside", "tired", "help me", "safe"]
  },
  "places/travel-places/parking": {
    label: "Parking",
    children: ["parking lot", "car", "hold hand", "stop", "wait", "go inside", "go outside", "cart", "store", "safe", "help me", "too loud"]
  },
  "places/travel-places/trips": {
    label: "Trips",
    children: ["trip", "go", "home", "school", "store", "park", "doctor", "restaurant", "grandma house", "car", "bus", "all done"]
  },
  "places/travel-places/travel-needs": {
    label: "Travel Needs",
    children: ["I need break", "I need bathroom", "I need water", "I feel sick", "too loud", "stop", "go home", "wait", "tablet", "snack", "help me", "safe"]
  },

  "places/care-places": {
    label: "Care Places",
    children: ["Doctor Office", "Dentist", "Therapy", "Nurse", "Hospital", "Care Needs"]
  },
  "places/care-places/doctor-office": {
    label: "Doctor Office",
    children: ["doctor office", "doctor", "nurse", "scale", "table", "medicine", "shot", "hurt", "wait", "help me", "mom", "dad"]
  },
  "places/care-places/dentist": {
    label: "Dentist",
    children: ["dentist", "teeth", "mouth", "toothbrush", "chair", "open mouth", "hurt", "scared", "help me", "all done", "mom", "dad"]
  },
  "places/care-places/therapy": {
    label: "Therapy",
    children: ["therapy", "speech", "occupational therapy", "physical therapy", "teacher", "helper", "try", "break", "good job", "finished", "help me", "again"]
  },
  "places/care-places/nurse": {
    label: "Nurse",
    children: ["nurse", "nurse office", "medicine", "bandage", "hurt", "sick", "rest", "water", "call mom", "call dad", "safe", "all done"]
  },
  "places/care-places/hospital": {
    label: "Hospital",
    children: ["hospital", "doctor", "nurse", "bed", "medicine", "hurt", "sick", "scared", "mom", "dad", "safe", "help me"]
  },
  "places/care-places/care-needs": {
    label: "Care Needs",
    children: ["help me", "I am hurt", "I feel sick", "I am scared", "hold hand", "stay with me", "medicine", "water", "break", "all done", "safe", "stop"]
  },

  "places/room-places": {
    label: "Room Places",
    children: ["Bedroom Room", "Bathroom Room", "Kitchen Room", "Classroom Room", "Quiet Room", "Play Room"]
  },
  "places/room-places/bedroom-room": {
    label: "Bedroom Room",
    children: ["bedroom", "bed", "blanket", "pillow", "lamp", "closet", "dresser", "toy", "book", "tablet", "sleep", "quiet"]
  },
  "places/room-places/bathroom-room": {
    label: "Bathroom Room",
    children: ["bathroom", "toilet", "sink", "shower", "tub", "soap", "towel", "wash hands", "brush teeth", "privacy", "help me", "all done"]
  },
  "places/room-places/kitchen-room": {
    label: "Kitchen Room",
    children: ["kitchen", "table", "chair", "fridge", "freezer", "sink", "food", "drink", "cup", "plate", "spoon", "fork"]
  },
  "places/room-places/classroom-room": {
    label: "Classroom Room",
    children: ["classroom", "desk", "chair", "table", "rug", "board", "computer", "paper", "pencil", "book", "teacher", "friend"]
  },
  "places/room-places/quiet-room": {
    label: "Quiet Room",
    children: ["quiet room", "chair", "blanket", "headphones", "light", "dark", "music", "break", "space", "safe", "calm", "all done"]
  },
  "places/room-places/play-room": {
    label: "Play Room",
    children: ["play room", "toy", "game", "ball", "blocks", "tablet", "music", "book", "friend", "play", "more", "all done"]
  },

  "places/place-words": {
    label: "Place Words",
    children: ["Where Words", "Direction Words", "Position Words", "Going Words", "Leaving Words", "Safety Place Words"]
  },
  "places/place-words/where-words": {
    label: "Where Words",
    children: ["where", "where is", "here", "there", "this place", "that place", "home", "school", "outside", "inside", "bathroom", "help me"]
  },
  "places/place-words/direction-words": {
    label: "Direction Words",
    children: ["to", "from", "in", "out", "inside", "outside", "up", "down", "left", "right", "around", "through"]
  },
  "places/place-words/position-words": {
    label: "Position Words",
    children: ["on", "under", "over", "next to", "behind", "in front", "near", "far", "top", "bottom", "middle", "beside"]
  },
  "places/place-words/going-words": {
    label: "Going Words",
    children: ["go", "go to", "go home", "go inside", "go outside", "go bathroom", "go school", "go car", "come here", "stay", "wait", "stop"]
  },
  "places/place-words/leaving-words": {
    label: "Leaving Words",
    children: ["leave", "go home", "bye", "all done", "finished", "come back", "stay", "wait", "not ready", "ready", "car", "bus"]
  },
  "places/place-words/safety-place-words": {
    label: "Safety Place Words",
    children: ["safe", "not safe", "stop", "wait", "hold hand", "stay with me", "help me", "too loud", "too close", "inside", "home", "teacher"]
  },

  "school": {
    label: "School",
    children: ["School People", "Classroom Work", "School Tools", "Reading & Writing", "Schedule", "Break & Sensory", "School Places", "School Needs"]
  },
  "school/school-people": {
    label: "School People",
    children: ["Teachers", "Classmates", "Helpers", "Therapy People", "Bus People", "School Office"]
  },
  "school/school-people/teachers": {
    label: "Teachers",
    children: ["teacher", "main teacher", "helper teacher", "substitute teacher", "speech teacher", "ask teacher", "help me", "show me", "tell me", "I don't understand", "good job", "all done"]
  },
  "school/school-people/classmates": {
    label: "Classmates",
    children: ["classmate", "friend", "student", "kids", "my friend", "my turn", "your turn", "share", "play with me", "stop please", "thank you", "sorry"]
  },
  "school/school-people/helpers": {
    label: "Helpers",
    children: ["helper", "aide", "principal", "nurse", "office", "lunch helper", "playground helper", "bus helper", "help me", "I am hurt", "bathroom", "break"]
  },
  "school/school-people/therapy-people": {
    label: "Therapy People",
    children: ["speech teacher", "therapist", "occupational therapist", "physical therapist", "doctor", "nurse", "try", "again", "break", "good job", "finished", "help me"]
  },
  "school/school-people/bus-people": {
    label: "Bus People",
    children: ["bus driver", "bus helper", "friend", "student", "seat", "home", "school", "wait", "too loud", "safe", "help me", "all done"]
  },
  "school/school-people/school-office": {
    label: "School Office",
    children: ["office", "principal", "secretary", "nurse", "call mom", "call dad", "help me", "I am sick", "I am hurt", "wait", "safe", "all done"]
  },

  "school/classroom-work": {
    label: "Classroom Work",
    children: ["Work Choices", "Answering", "Following Directions", "Group Work", "Finished Work", "Help With Work"]
  },
  "school/classroom-work/work-choices": {
    label: "Work Choices",
    children: ["work", "worksheet", "paper", "book", "computer", "tablet", "puzzle", "matching", "sorting", "math", "reading", "writing"]
  },
  "school/classroom-work/answering": {
    label: "Answering",
    children: ["answer", "yes", "no", "maybe", "I know", "I don't know", "choose", "point", "show me", "tell me", "again", "help me"]
  },
  "school/classroom-work/following-directions": {
    label: "Following Directions",
    children: ["listen", "look", "sit", "stand", "wait", "line up", "come here", "go there", "open", "close", "put in", "take out"]
  },
  "school/classroom-work/group-work": {
    label: "Group Work",
    children: ["group", "circle time", "table work", "partner", "friend", "teacher", "my turn", "your turn", "share", "wait", "listen", "good job"]
  },
  "school/classroom-work/finished-work": {
    label: "Finished Work",
    children: ["finished", "all done", "turn in", "clean up", "put away", "check work", "more work", "break", "play", "good job", "help me", "next"]
  },
  "school/classroom-work/help-with-work": {
    label: "Help With Work",
    children: ["help me", "I need help", "I don't understand", "show me", "tell me", "again", "too hard", "try again", "break", "teacher", "please", "thank you"]
  },

  "school/school-tools": {
    label: "School Tools",
    children: ["Writing Tools", "Paper Tools", "Technology", "Art Tools", "Classroom Items", "Tool Needs"]
  },
  "school/school-tools/writing-tools": {
    label: "Writing Tools",
    children: ["pencil", "pen", "marker", "crayon", "eraser", "highlighter", "color pencil", "write", "draw", "paper", "help me", "more"]
  },
  "school/school-tools/paper-tools": {
    label: "Paper Tools",
    children: ["paper", "worksheet", "notebook", "folder", "book", "card", "page", "cut", "glue", "turn page", "finished", "help me"]
  },
  "school/school-tools/technology": {
    label: "Technology",
    children: ["tablet", "computer", "keyboard", "mouse", "screen", "headphones", "charger", "video", "game", "type", "help me", "all done"]
  },
  "school/school-tools/art-tools": {
    label: "Art Tools",
    children: ["crayon", "marker", "paint", "brush", "glue", "scissors", "paper", "color", "draw", "cut", "messy", "all done"]
  },
  "school/school-tools/classroom-items": {
    label: "Classroom Items",
    children: ["desk", "chair", "table", "rug", "board", "door", "window", "light", "book", "bin", "backpack", "lunch box"]
  },
  "school/school-tools/tool-needs": {
    label: "Tool Needs",
    children: ["I need pencil", "I need paper", "I need book", "I need tablet", "I need headphones", "open", "close", "broken", "lost", "help me", "please", "thank you"]
  },

  "school/reading-writing": {
    label: "Reading & Writing",
    children: ["Reading", "Writing", "Letters", "Numbers", "Books", "Story Words"]
  },
  "school/reading-writing/reading": {
    label: "Reading",
    children: ["read", "book", "story", "page", "turn page", "picture", "word", "letter", "listen", "look", "again", "all done"]
  },
  "school/reading-writing/writing": {
    label: "Writing",
    children: ["write", "draw", "trace", "copy", "name", "letter", "word", "sentence", "pencil", "paper", "eraser", "help me"]
  },
  "school/reading-writing/letters": {
    label: "Letters",
    children: ["letter", "alphabet", "A", "B", "C", "my name", "sound", "word", "spell", "read", "write", "help me"]
  },
  "school/reading-writing/numbers": {
    label: "Numbers",
    children: ["number", "count", "one", "two", "three", "more", "less", "same", "different", "how many", "math", "help me"]
  },
  "school/reading-writing/books": {
    label: "Books",
    children: ["book", "library", "story", "picture book", "chapter book", "favorite book", "read again", "turn page", "close book", "open book", "all done", "quiet"]
  },
  "school/reading-writing/story-words": {
    label: "Story Words",
    children: ["who", "what", "where", "when", "why", "how", "first", "next", "then", "last", "again", "tell me"]
  },

  "school/schedule": {
    label: "Schedule",
    children: ["Daily Schedule", "Transitions", "Before/After", "Waiting", "School Events", "Going Home"]
  },
  "school/schedule/daily-schedule": {
    label: "Daily Schedule",
    children: ["arrival", "morning work", "circle time", "reading", "math", "lunch", "recess", "specials", "therapy", "pack up", "bus", "home"]
  },
  "school/schedule/transitions": {
    label: "Transitions",
    children: ["transition", "change", "next", "first", "then", "wait", "not ready", "ready", "help me", "break", "go", "stop"]
  },
  "school/schedule/before-after": {
    label: "Before/After",
    children: ["before", "after", "first", "next", "then", "last", "now", "later", "today", "tomorrow", "finished", "all done"]
  },
  "school/schedule/waiting": {
    label: "Waiting",
    children: ["wait", "timer", "line up", "my turn", "your turn", "soon", "not yet", "ready", "too long", "help me", "break", "all done"]
  },
  "school/schedule/school-events": {
    label: "School Events",
    children: ["recess", "lunch", "assembly", "field trip", "party", "music", "art", "gym", "library", "therapy", "more", "all done"]
  },
  "school/schedule/going-home": {
    label: "Going Home",
    children: ["go home", "bus", "car", "pack up", "backpack", "lunch box", "mom", "dad", "wait", "bye", "finished", "all done"]
  },

  "school/break-sensory": {
    label: "Break & Sensory",
    children: ["Break Choices", "Quiet Tools", "Movement Tools", "Sensory Needs", "Too Much", "Return To Work"]
  },
  "school/break-sensory/break-choices": {
    label: "Break Choices",
    children: ["break", "quiet break", "walk break", "bathroom", "water", "snack", "chair", "calm corner", "tablet", "book", "timer", "all done"]
  },
  "school/break-sensory/quiet-tools": {
    label: "Quiet Tools",
    children: ["quiet", "headphones", "music", "book", "blanket", "dark room", "chair", "space", "breathe", "break", "safe", "finished"]
  },
  "school/break-sensory/movement-tools": {
    label: "Movement Tools",
    children: ["walk", "jump", "stretch", "wiggle", "swing", "run", "outside", "stand", "sit", "heavy work", "break", "all done"]
  },
  "school/break-sensory/sensory-needs": {
    label: "Sensory Needs",
    children: ["too loud", "too bright", "too close", "too much", "need quiet", "need space", "headphones", "break", "help me", "stop", "safe", "all done"]
  },
  "school/break-sensory/too-much": {
    label: "Too Much",
    children: ["too much", "stop", "break", "quiet", "space", "help me", "I am mad", "I am scared", "I need teacher", "all done", "finished", "safe"]
  },
  "school/break-sensory/return-to-work": {
    label: "Return To Work",
    children: ["ready", "not ready", "one more minute", "first break then work", "try again", "help me", "teacher", "work", "finished", "good job", "yes", "no"]
  },

  "school/school-places": {
    label: "School Places",
    children: ["Classroom", "Bathroom", "Cafeteria", "Playground", "Library", "Nurse Office", "Bus"]
  },
  "school/school-places/classroom": {
    label: "Classroom",
    children: ["classroom", "desk", "chair", "table", "rug", "board", "computer", "book", "paper", "pencil", "teacher", "friend"]
  },
  "school/school-places/bathroom": {
    label: "Bathroom",
    children: ["bathroom", "toilet", "sink", "wash hands", "privacy", "help me", "now", "wait", "all done", "teacher", "nurse", "safe"]
  },
  "school/school-places/cafeteria": {
    label: "Cafeteria",
    children: ["cafeteria", "lunch", "table", "chair", "tray", "milk", "water", "snack", "food", "friend", "all done", "trash"]
  },
  "school/school-places/playground": {
    label: "Playground",
    children: ["playground", "slide", "swing", "ball", "run", "jump", "friend", "my turn", "your turn", "stop", "help me", "all done"]
  },
  "school/school-places/library": {
    label: "Library",
    children: ["library", "book", "read", "quiet", "story", "computer", "shelf", "teacher", "friend", "help me", "finished", "all done"]
  },
  "school/school-places/nurse-office": {
    label: "Nurse Office",
    children: ["nurse office", "nurse", "hurt", "sick", "medicine", "rest", "water", "bathroom", "call mom", "call dad", "safe", "all done"]
  },
  "school/school-places/bus": {
    label: "Bus",
    children: ["bus", "bus driver", "seat", "seat belt", "window", "home", "school", "wait", "too loud", "friend", "safe", "all done"]
  },

  "school/school-needs": {
    label: "School Needs",
    children: ["Help Needs", "Body Needs", "Communication Needs", "Social Needs", "Work Needs", "Safety Needs"]
  },
  "school/school-needs/help-needs": {
    label: "Help Needs",
    children: ["I need help", "help me", "show me", "tell me", "I don't understand", "too hard", "again", "teacher", "friend", "please", "thank you", "finished"]
  },
  "school/school-needs/body-needs": {
    label: "Body Needs",
    children: ["bathroom", "water", "snack", "hurt", "sick", "tired", "hot", "cold", "medicine", "nurse", "break", "help me"]
  },
  "school/school-needs/communication-needs": {
    label: "Communication Needs",
    children: ["I want", "I need", "I feel", "yes", "no", "maybe", "again", "more", "finished", "I don't know", "help me", "wait"]
  },
  "school/school-needs/social-needs": {
    label: "Social Needs",
    children: ["friend", "play with me", "my turn", "your turn", "share", "stop please", "sorry", "thank you", "good job", "I need space", "help me", "all done"]
  },
  "school/school-needs/work-needs": {
    label: "Work Needs",
    children: ["pencil", "paper", "book", "tablet", "computer", "turn page", "open", "close", "write", "read", "help me", "finished"]
  },
  "school/school-needs/safety-needs": {
    label: "Safety Needs",
    children: ["safe", "not safe", "stop", "help me", "teacher", "nurse", "too loud", "too much", "hurt", "scared", "call mom", "call dad"]
  },

  "actions": {
    label: "Actions",
    children: ["Movement", "Body Actions", "Communication Actions", "Play Actions", "Self Care Actions", "School Actions", "Home Actions", "Control Actions"]
  },
  "actions/movement": {
    label: "Movement",
    children: ["Go Actions", "Stop Actions", "Walk/Run", "Sit/Stand", "Up/Down", "Travel Actions"]
  },
  "actions/movement/go-actions": {
    label: "Go Actions",
    children: ["go", "come", "leave", "start", "move", "go inside", "go outside", "go home", "go school", "go car", "go bathroom", "go play"]
  },
  "actions/movement/stop-actions": {
    label: "Stop Actions",
    children: ["stop", "wait", "pause", "slow down", "hold on", "all done", "finished", "no more", "stop please", "too fast", "safe", "help me"]
  },
  "actions/movement/walk-run": {
    label: "Walk/Run",
    children: ["walk", "run", "jump", "skip", "march", "crawl", "climb", "dance", "stretch", "swing", "outside", "break"]
  },
  "actions/movement/sit-stand": {
    label: "Sit/Stand",
    children: ["sit", "stand", "lay down", "kneel", "chair", "floor", "couch", "bed", "up", "down", "help me", "all done"]
  },
  "actions/movement/up-down": {
    label: "Up/Down",
    children: ["up", "down", "climb up", "climb down", "pick up", "put down", "stairs", "slide", "lift", "drop", "help me", "again"]
  },
  "actions/movement/travel-actions": {
    label: "Travel Actions",
    children: ["ride", "drive", "walk", "bus", "car", "cross", "hold hand", "wait", "stop", "go", "go home", "safe"]
  },

  "actions/body-actions": {
    label: "Body Actions",
    children: ["Eat/Drink", "Sleep/Rest", "Bathroom Actions", "Wash/Clean", "Dress", "Health Actions"]
  },
  "actions/body-actions/eat-drink": {
    label: "Eat/Drink",
    children: ["eat", "drink", "bite", "chew", "swallow", "sip", "taste", "more", "all done", "hungry", "thirsty", "help me"]
  },
  "actions/body-actions/sleep-rest": {
    label: "Sleep/Rest",
    children: ["sleep", "rest", "nap", "lay down", "close eyes", "blanket", "pillow", "quiet", "good night", "wake up", "tired", "all done"]
  },
  "actions/body-actions/bathroom-actions": {
    label: "Bathroom Actions",
    children: ["go bathroom", "pee", "poop", "flush", "wipe", "wash hands", "privacy", "help me", "pants", "clean", "all done", "now"]
  },
  "actions/body-actions/wash-clean": {
    label: "Wash/Clean",
    children: ["wash", "clean", "wipe", "dry", "soap", "water", "towel", "brush teeth", "bath", "shower", "dirty", "all done"]
  },
  "actions/body-actions/dress": {
    label: "Dress",
    children: ["dress", "undress", "shirt", "pants", "socks", "shoes", "jacket", "zip", "button", "take off", "put on", "help me"]
  },
  "actions/body-actions/health-actions": {
    label: "Health Actions",
    children: ["take medicine", "rest", "tell doctor", "show hurt", "point", "breathe", "cough", "drink water", "hold hand", "help me", "safe", "all done"]
  },

  "actions/communication-actions": {
    label: "Communication Actions",
    children: ["Say", "Ask", "Tell", "Show", "Choose", "Answer", "Repeat"]
  },
  "actions/communication-actions/say": {
    label: "Say",
    children: ["say", "talk", "speak", "tell", "use words", "use button", "voice", "quiet voice", "loud voice", "again", "help me", "thank you"]
  },
  "actions/communication-actions/ask": {
    label: "Ask",
    children: ["ask", "question", "can I", "can you", "where", "what", "who", "when", "why", "how", "help me", "please"]
  },
  "actions/communication-actions/tell": {
    label: "Tell",
    children: ["tell me", "I tell you", "I want", "I need", "I feel", "I like", "I don't like", "because", "show me", "listen", "look", "wait"]
  },
  "actions/communication-actions/show": {
    label: "Show",
    children: ["show me", "show you", "look", "point", "touch", "bring it", "give it", "picture", "button", "again", "help me", "thank you"]
  },
  "actions/communication-actions/choose": {
    label: "Choose",
    children: ["choose", "pick", "this one", "that one", "yes", "no", "maybe", "more", "all done", "my turn", "your turn", "help me"]
  },
  "actions/communication-actions/answer": {
    label: "Answer",
    children: ["answer", "yes", "no", "I know", "I don't know", "maybe", "again", "question", "help me", "wait", "please", "thank you"]
  },
  "actions/communication-actions/repeat": {
    label: "Repeat",
    children: ["again", "say again", "do again", "read again", "show again", "try again", "more", "not again", "all done", "finished", "help me", "please"]
  },

  "actions/play-actions": {
    label: "Play Actions",
    children: ["Toy Play", "Game Play", "Outside Play", "Tablet Play", "Pretend Play", "Turn Taking"]
  },
  "actions/play-actions/toy-play": {
    label: "Toy Play",
    children: ["play", "build", "stack", "roll", "throw", "catch", "push", "pull", "open", "close", "again", "all done"]
  },
  "actions/play-actions/game-play": {
    label: "Game Play",
    children: ["play game", "start game", "pause game", "win", "lose", "try again", "my turn", "your turn", "help me", "more", "all done", "fun"]
  },
  "actions/play-actions/outside-play": {
    label: "Outside Play",
    children: ["run", "jump", "swing", "slide", "climb", "kick", "throw", "catch", "walk", "sit", "stop", "all done"]
  },
  "actions/play-actions/tablet-play": {
    label: "Tablet Play",
    children: ["watch", "play", "tap", "swipe", "open app", "close app", "pause", "volume up", "volume down", "more", "all done", "help me"]
  },
  "actions/play-actions/pretend-play": {
    label: "Pretend Play",
    children: ["pretend", "make food", "drive car", "doctor", "teacher", "baby", "animal", "house", "talk", "play with me", "again", "all done"]
  },
  "actions/play-actions/turn-taking": {
    label: "Turn Taking",
    children: ["my turn", "your turn", "wait", "share", "again", "more", "stop", "all done", "good job", "thank you", "sorry", "help me"]
  },

  "actions/self-care-actions": {
    label: "Self Care Actions",
    children: ["Eating Help", "Dressing Help", "Cleaning Help", "Bathroom Help", "Calming Actions", "Safety Actions"]
  },
  "actions/self-care-actions/eating-help": {
    label: "Eating Help",
    children: ["open", "cut", "pour", "mix", "cool down", "blow on it", "more", "all done", "spoon", "fork", "cup", "help me"]
  },
  "actions/self-care-actions/dressing-help": {
    label: "Dressing Help",
    children: ["put on", "take off", "zip", "button", "tie shoes", "shirt", "pants", "socks", "shoes", "jacket", "help me", "all done"]
  },
  "actions/self-care-actions/cleaning-help": {
    label: "Cleaning Help",
    children: ["wash hands", "wipe face", "wipe table", "clean up", "throw away", "put away", "dirty", "clean", "soap", "towel", "help me", "all done"]
  },
  "actions/self-care-actions/bathroom-help": {
    label: "Bathroom Help",
    children: ["go bathroom", "pull down", "pull up", "wipe", "flush", "wash hands", "privacy", "help me", "all done", "now", "wait", "clean"]
  },
  "actions/self-care-actions/calming-actions": {
    label: "Calming Actions",
    children: ["breathe", "quiet", "space", "hug", "sit", "rest", "walk", "music", "blanket", "headphones", "safe", "all done"]
  },
  "actions/self-care-actions/safety-actions": {
    label: "Safety Actions",
    children: ["stop", "wait", "hold hand", "stay with me", "help me", "safe", "not safe", "too close", "too loud", "inside", "teacher", "mom"]
  },

  "actions/school-actions": {
    label: "School Actions",
    children: ["Work Actions", "Reading Actions", "Writing Actions", "Listening Actions", "Transition Actions", "Help Actions"]
  },
  "actions/school-actions/work-actions": {
    label: "Work Actions",
    children: ["work", "try", "finish", "start", "match", "sort", "count", "circle", "cut", "glue", "turn in", "help me"]
  },
  "actions/school-actions/reading-actions": {
    label: "Reading Actions",
    children: ["read", "listen", "turn page", "look", "point", "find", "sound out", "read again", "book", "story", "help me", "finished"]
  },
  "actions/school-actions/writing-actions": {
    label: "Writing Actions",
    children: ["write", "draw", "trace", "copy", "erase", "color", "spell", "name", "letter", "word", "help me", "finished"]
  },
  "actions/school-actions/listening-actions": {
    label: "Listening Actions",
    children: ["listen", "look", "sit", "quiet", "wait", "answer", "ask", "raise hand", "try", "again", "help me", "finished"]
  },
  "actions/school-actions/transition-actions": {
    label: "Transition Actions",
    children: ["line up", "walk", "go", "stop", "wait", "pack up", "clean up", "next", "first", "then", "ready", "not ready"]
  },
  "actions/school-actions/help-actions": {
    label: "Help Actions",
    children: ["help me", "show me", "tell me", "again", "I don't understand", "too hard", "break", "teacher", "friend", "please", "thank you", "finished"]
  },

  "actions/home-actions": {
    label: "Home Actions",
    children: ["Eating At Home", "Playing At Home", "Resting At Home", "Cleaning At Home", "Family Actions", "Bedtime Actions"]
  },
  "actions/home-actions/eating-at-home": {
    label: "Eating At Home",
    children: ["eat", "drink", "snack", "dinner", "breakfast", "lunch", "more", "all done", "help me", "table", "chair", "kitchen"]
  },
  "actions/home-actions/playing-at-home": {
    label: "Playing At Home",
    children: ["play", "toy", "tablet", "tv", "music", "game", "outside", "inside", "again", "more", "all done", "clean up"]
  },
  "actions/home-actions/resting-at-home": {
    label: "Resting At Home",
    children: ["rest", "sleep", "nap", "sit", "lay down", "blanket", "pillow", "quiet", "music", "water", "all done", "wake up"]
  },
  "actions/home-actions/cleaning-at-home": {
    label: "Cleaning At Home",
    children: ["clean up", "put away", "throw away", "wipe", "wash", "laundry", "trash", "dirty", "clean", "help me", "all done", "good job"]
  },
  "actions/home-actions/family-actions": {
    label: "Family Actions",
    children: ["hug", "talk", "play", "read", "watch", "eat", "help", "come here", "stay", "go home", "thank you", "I love you"]
  },
  "actions/home-actions/bedtime-actions": {
    label: "Bedtime Actions",
    children: ["bath", "pajamas", "brush teeth", "read book", "lights off", "blanket", "sleep", "good night", "hug", "water", "all done", "stay"]
  },

  "actions/control-actions": {
    label: "Control Actions",
    children: ["Open/Close", "On/Off", "More/Less", "Start/Stop", "Fix/Change", "Choice Control"]
  },
  "actions/control-actions/open-close": {
    label: "Open/Close",
    children: ["open", "close", "open door", "close door", "open box", "close box", "open app", "close app", "open book", "close book", "help me", "all done"]
  },
  "actions/control-actions/on-off": {
    label: "On/Off",
    children: ["turn on", "turn off", "lights on", "lights off", "tv on", "tv off", "music on", "music off", "volume up", "volume down", "help me", "stop"]
  },
  "actions/control-actions/more-less": {
    label: "More/Less",
    children: ["more", "less", "again", "no more", "one more", "too much", "not enough", "all done", "finished", "help me", "please", "thank you"]
  },
  "actions/control-actions/start-stop": {
    label: "Start/Stop",
    children: ["start", "stop", "pause", "go", "wait", "ready", "not ready", "again", "all done", "finished", "help me", "safe"]
  },
  "actions/control-actions/fix-change": {
    label: "Fix/Change",
    children: ["fix", "change", "different", "same", "broken", "wrong", "right", "try again", "help me", "show me", "more", "all done"]
  },
  "actions/control-actions/choice-control": {
    label: "Choice Control",
    children: ["choose", "pick", "this one", "that one", "same", "different", "yes", "no", "maybe", "my turn", "your turn", "help me"]
  },

  "things": {
    label: "Things",
    children: ["Toys", "Technology", "Comfort Items", "Home Items", "School Items", "Eating Items", "Clothing", "Outside Things"]
  },
  "things/toys": {
    label: "Toys",
    children: ["Soft Toys", "Building Toys", "Vehicle Toys", "Ball Toys", "Pretend Toys", "Game Toys"]
  },
  "things/toys/soft-toys": {
    label: "Soft Toys",
    children: ["stuffed animal", "teddy bear", "doll", "blanket", "pillow", "soft toy", "puppet", "plush", "hug toy", "favorite toy", "more", "all done"]
  },
  "things/toys/building-toys": {
    label: "Building Toys",
    children: ["blocks", "Legos", "magnet tiles", "puzzle", "stack", "build", "tower", "pieces", "more blocks", "clean up", "help me", "all done"]
  },
  "things/toys/vehicle-toys": {
    label: "Vehicle Toys",
    children: ["car toy", "truck", "train", "bus", "plane", "tractor", "boat", "race car", "track", "drive", "more", "all done"]
  },
  "things/toys/ball-toys": {
    label: "Ball Toys",
    children: ["ball", "soccer ball", "basketball", "football", "baseball", "kick", "throw", "catch", "roll", "bounce", "outside", "all done"]
  },
  "things/toys/pretend-toys": {
    label: "Pretend Toys",
    children: ["play food", "doctor kit", "toy phone", "doll house", "costume", "kitchen toy", "tools", "pretend", "make food", "talk", "more", "all done"]
  },
  "things/toys/game-toys": {
    label: "Game Toys",
    children: ["game", "board game", "cards", "dice", "puzzle", "tablet game", "controller", "my turn", "your turn", "win", "try again", "all done"]
  },

  "things/technology": {
    label: "Technology",
    children: ["Tablet", "TV", "Phone", "Computer", "Music", "Charging"]
  },
  "things/technology/tablet": {
    label: "Tablet",
    children: ["tablet", "iPad", "app", "game", "video", "YouTube", "pause", "play", "volume up", "volume down", "charger", "all done"]
  },
  "things/technology/tv": {
    label: "TV",
    children: ["tv", "remote", "show", "movie", "cartoon", "pause", "play", "volume", "too loud", "more show", "all done", "help me"]
  },
  "things/technology/phone": {
    label: "Phone",
    children: ["phone", "call mom", "call dad", "video call", "picture", "message", "speaker", "volume", "charger", "help me", "all done", "hello"]
  },
  "things/technology/computer": {
    label: "Computer",
    children: ["computer", "keyboard", "mouse", "screen", "headphones", "game", "video", "type", "click", "open", "close", "help me"]
  },
  "things/technology/music": {
    label: "Music",
    children: ["music", "song", "speaker", "headphones", "quiet music", "loud music", "volume up", "volume down", "dance", "again", "all done", "stop"]
  },
  "things/technology/charging": {
    label: "Charging",
    children: ["charger", "plug", "battery", "charge tablet", "charge phone", "outlet", "cord", "broken", "help me", "wait", "all done", "safe"]
  },

  "things/comfort-items": {
    label: "Comfort Items",
    children: ["Soft Comfort", "Sensory Items", "Calm Items", "Sleep Items", "Favorite Items", "Safety Items"]
  },
  "things/comfort-items/soft-comfort": {
    label: "Soft Comfort",
    children: ["blanket", "pillow", "stuffed animal", "soft toy", "hoodie", "sweater", "couch", "bed", "hug", "safe", "more", "all done"]
  },
  "things/comfort-items/sensory-items": {
    label: "Sensory Items",
    children: ["headphones", "fidget", "chewy", "weighted blanket", "squishy", "spinner", "sensory toy", "quiet", "space", "break", "help me", "all done"]
  },
  "things/comfort-items/calm-items": {
    label: "Calm Items",
    children: ["book", "music", "tablet", "blanket", "water", "snack", "chair", "lamp", "night light", "toy", "safe", "calm"]
  },
  "things/comfort-items/sleep-items": {
    label: "Sleep Items",
    children: ["bed", "blanket", "pillow", "pajamas", "night light", "stuffed animal", "water", "book", "music", "good night", "sleep", "all done"]
  },
  "things/comfort-items/favorite-items": {
    label: "Favorite Items",
    children: ["favorite toy", "tablet", "blanket", "book", "music", "snack", "drink", "stuffed animal", "game", "show", "more", "all done"]
  },
  "things/comfort-items/safety-items": {
    label: "Safety Items",
    children: ["helmet", "seat belt", "car seat", "bandage", "medicine", "glasses", "shoes", "jacket", "safe", "help me", "stop", "wait"]
  },

  "things/home-items": {
    label: "Home Items",
    children: ["Furniture", "Kitchen Items", "Bathroom Items", "Bedroom Items", "Cleaning Items", "Light/Doors"]
  },
  "things/home-items/furniture": {
    label: "Furniture",
    children: ["chair", "table", "couch", "bed", "desk", "dresser", "shelf", "stool", "bench", "sit", "help me", "all done"]
  },
  "things/home-items/kitchen-items": {
    label: "Kitchen Items",
    children: ["cup", "plate", "bowl", "spoon", "fork", "straw", "napkin", "fridge", "freezer", "sink", "food", "drink"]
  },
  "things/home-items/bathroom-items": {
    label: "Bathroom Items",
    children: ["toilet", "sink", "soap", "towel", "toothbrush", "toothpaste", "shower", "tub", "brush", "mirror", "help me", "all done"]
  },
  "things/home-items/bedroom-items": {
    label: "Bedroom Items",
    children: ["bed", "blanket", "pillow", "dresser", "closet", "lamp", "night light", "book", "toy", "pajamas", "sleep", "all done"]
  },
  "things/home-items/cleaning-items": {
    label: "Cleaning Items",
    children: ["trash", "wipe", "towel", "soap", "broom", "vacuum", "laundry", "basket", "clean up", "dirty", "clean", "help me"]
  },
  "things/home-items/light-doors": {
    label: "Light/Doors",
    children: ["door", "window", "light", "lamp", "switch", "open", "close", "on", "off", "too bright", "dark", "help me"]
  },

  "things/school-items": {
    label: "School Items",
    children: ["Writing Items", "Paper Items", "Book Items", "Backpack Items", "Classroom Items", "Art Items"]
  },
  "things/school-items/writing-items": {
    label: "Writing Items",
    children: ["pencil", "pen", "marker", "crayon", "eraser", "highlighter", "colored pencil", "sharpener", "write", "draw", "help me", "all done"]
  },
  "things/school-items/paper-items": {
    label: "Paper Items",
    children: ["paper", "worksheet", "notebook", "folder", "page", "card", "picture", "cut", "glue", "turn in", "finished", "help me"]
  },
  "things/school-items/book-items": {
    label: "Book Items",
    children: ["book", "story", "library book", "page", "picture", "word", "letter", "read", "turn page", "open book", "close book", "all done"]
  },
  "things/school-items/backpack-items": {
    label: "Backpack Items",
    children: ["backpack", "lunch box", "folder", "book", "paper", "water bottle", "snack", "jacket", "zipper", "open", "close", "help me"]
  },
  "things/school-items/classroom-items": {
    label: "Classroom Items",
    children: ["desk", "chair", "table", "rug", "board", "computer", "tablet", "bin", "timer", "headphones", "teacher", "help me"]
  },
  "things/school-items/art-items": {
    label: "Art Items",
    children: ["paint", "brush", "marker", "crayon", "glue", "scissors", "paper", "stickers", "color", "draw", "messy", "all done"]
  },

  "things/eating-items": {
    label: "Eating Items",
    children: ["Dishes", "Utensils", "Drink Items", "Food Containers", "Snack Items", "Meal Tools"]
  },
  "things/eating-items/dishes": {
    label: "Dishes",
    children: ["plate", "bowl", "tray", "cup", "napkin", "table", "chair", "more", "all done", "clean", "dirty", "help me"]
  },
  "things/eating-items/utensils": {
    label: "Utensils",
    children: ["spoon", "fork", "knife", "straw", "chopsticks", "scoop", "cut", "mix", "help me", "more", "all done", "finished"]
  },
  "things/eating-items/drink-items": {
    label: "Drink Items",
    children: ["cup", "straw", "water bottle", "juice box", "milk carton", "lid", "ice", "open", "close", "spill", "help me", "all done"]
  },
  "things/eating-items/food-containers": {
    label: "Food Containers",
    children: ["lunch box", "bag", "wrapper", "container", "pouch", "box", "bowl", "open", "close", "trash", "help me", "all done"]
  },
  "things/eating-items/snack-items": {
    label: "Snack Items",
    children: ["chips bag", "gummies pack", "cracker box", "cookie", "bar wrapper", "pouch", "napkin", "open", "more", "all done", "trash", "help me"]
  },
  "things/eating-items/meal-tools": {
    label: "Meal Tools",
    children: ["fork", "spoon", "plate", "bowl", "cup", "napkin", "ketchup", "sauce", "cut", "cool down", "help me", "all done"]
  },

  "things/clothing": {
    label: "Clothing",
    children: ["Daily Clothes", "Shoes", "Weather Clothes", "Sleep Clothes", "School Clothes", "Clothing Help"]
  },
  "things/clothing/daily-clothes": {
    label: "Daily Clothes",
    children: ["shirt", "pants", "shorts", "socks", "underwear", "dress", "skirt", "hoodie", "jacket", "put on", "take off", "help me"]
  },
  "things/clothing/shoes": {
    label: "Shoes",
    children: ["shoes", "sneakers", "boots", "sandals", "socks", "tie shoes", "velcro", "put on shoes", "take off shoes", "too tight", "help me", "all done"]
  },
  "things/clothing/weather-clothes": {
    label: "Weather Clothes",
    children: ["jacket", "coat", "hat", "gloves", "raincoat", "boots", "sweater", "shorts", "too hot", "too cold", "help me", "all done"]
  },
  "things/clothing/sleep-clothes": {
    label: "Sleep Clothes",
    children: ["pajamas", "shirt", "pants", "blanket", "socks", "slippers", "put on pajamas", "take off", "sleep", "good night", "help me", "all done"]
  },
  "things/clothing/school-clothes": {
    label: "School Clothes",
    children: ["backpack", "jacket", "shoes", "socks", "shirt", "pants", "lunch box", "hat", "put on", "take off", "help me", "ready"]
  },
  "things/clothing/clothing-help": {
    label: "Clothing Help",
    children: ["help me dress", "zip", "button", "tie", "too tight", "itchy", "wet", "dirty", "change clothes", "take off", "put on", "all done"]
  },

  "things/outside-things": {
    label: "Outside Things",
    children: ["Playground Things", "Sports Things", "Weather Things", "Vehicle Things", "Nature Things", "Safety Things"]
  },
  "things/outside-things/playground-things": {
    label: "Playground Things",
    children: ["slide", "swing", "climber", "sandbox", "seesaw", "bench", "ball", "bike", "helmet", "my turn", "your turn", "all done"]
  },
  "things/outside-things/sports-things": {
    label: "Sports Things",
    children: ["ball", "soccer ball", "basketball", "football", "baseball", "bat", "glove", "goal", "bike", "helmet", "water", "all done"]
  },
  "things/outside-things/weather-things": {
    label: "Weather Things",
    children: ["sun", "rain", "snow", "wind", "cloud", "umbrella", "jacket", "hat", "gloves", "too hot", "too cold", "go inside"]
  },
  "things/outside-things/vehicle-things": {
    label: "Vehicle Things",
    children: ["car", "bus", "bike", "scooter", "wagon", "stroller", "truck", "train", "helmet", "seat belt", "safe", "help me"]
  },
  "things/outside-things/nature-things": {
    label: "Nature Things",
    children: ["tree", "flower", "grass", "rock", "stick", "leaf", "bug", "bird", "dog", "cat", "look", "don't touch"]
  },
  "things/outside-things/safety-things": {
    label: "Safety Things",
    children: ["helmet", "seat belt", "shoes", "jacket", "sunscreen", "water", "hold hand", "stop", "wait", "safe", "help me", "inside"]
  },

  "body-and-health": {
    label: "Body & Health",
    children: ["Body Parts", "Pain & Hurt", "Sick Words", "Bathroom Health", "Medicine & Care", "Sensory Body", "Safety Health", "Body Needs"]
  },
  "body-and-health/body-parts": {
    label: "Body Parts",
    children: ["Head & Face", "Mouth & Teeth", "Arms & Hands", "Legs & Feet", "Belly & Back", "Whole Body"]
  },
  "body-and-health/body-parts/head-face": {
    label: "Head & Face",
    children: ["head", "face", "eyes", "ears", "nose", "mouth", "hair", "cheek", "chin", "forehead", "head hurts", "help me"]
  },
  "body-and-health/body-parts/mouth-teeth": {
    label: "Mouth & Teeth",
    children: ["mouth", "teeth", "tongue", "lips", "throat", "tooth", "brush teeth", "mouth hurts", "dentist", "drink", "eat", "help me"]
  },
  "body-and-health/body-parts/arms-hands": {
    label: "Arms & Hands",
    children: ["arm", "hand", "finger", "thumb", "elbow", "wrist", "shoulder", "hand hurts", "hold hand", "wash hands", "help me", "all done"]
  },
  "body-and-health/body-parts/legs-feet": {
    label: "Legs & Feet",
    children: ["leg", "foot", "feet", "toe", "knee", "ankle", "walk", "run", "foot hurts", "shoes", "help me", "sit"]
  },
  "body-and-health/body-parts/belly-back": {
    label: "Belly & Back",
    children: ["stomach", "belly", "back", "chest", "side", "bottom", "stomach hurts", "back hurts", "bathroom", "rest", "help me", "doctor"]
  },
  "body-and-health/body-parts/whole-body": {
    label: "Whole Body",
    children: ["body", "skin", "bones", "muscles", "blood", "heart", "breathing", "hurt", "sick", "tired", "safe", "help me"]
  },

  "body-and-health/pain-hurt": {
    label: "Pain & Hurt",
    children: ["Pain Location", "Pain Type", "Injury", "Too Much Body", "Ask For Help", "Comfort For Pain"]
  },
  "body-and-health/pain-hurt/pain-location": {
    label: "Pain Location",
    children: ["head hurts", "ear hurts", "mouth hurts", "teeth hurt", "stomach hurts", "back hurts", "hand hurts", "foot hurts", "leg hurts", "arm hurts", "throat hurts", "help me"]
  },
  "body-and-health/pain-hurt/pain-type": {
    label: "Pain Type",
    children: ["hurt", "pain", "ouch", "sharp pain", "sore", "itchy", "burning", "stinging", "too hot", "too cold", "not okay", "help me"]
  },
  "body-and-health/pain-hurt/injury": {
    label: "Injury",
    children: ["cut", "scratch", "bruise", "bump", "fall", "bleeding", "bandage", "ice pack", "doctor", "nurse", "help me", "safe"]
  },
  "body-and-health/pain-hurt/too-much-body": {
    label: "Too Much Body",
    children: ["too loud", "too bright", "too close", "too much touch", "head hurts", "tired", "break", "quiet", "space", "help me", "stop", "safe"]
  },
  "body-and-health/pain-hurt/ask-for-help": {
    label: "Ask For Help",
    children: ["help me", "I am hurt", "I need doctor", "I need nurse", "call mom", "call dad", "medicine", "bandage", "ice pack", "stay with me", "please", "now"]
  },
  "body-and-health/pain-hurt/comfort-for-pain": {
    label: "Comfort For Pain",
    children: ["hug", "hold hand", "ice pack", "medicine", "water", "rest", "blanket", "quiet", "sit with me", "safe", "all done", "thank you"]
  },

  "body-and-health/sick-words": {
    label: "Sick Words",
    children: ["Feeling Sick", "Cold Symptoms", "Stomach Sick", "Fever", "Doctor Words", "Rest Needs"]
  },
  "body-and-health/sick-words/feeling-sick": {
    label: "Feeling Sick",
    children: ["sick", "I feel sick", "not okay", "tired", "dizzy", "weak", "hurt", "doctor", "nurse", "medicine", "help me", "rest"]
  },
  "body-and-health/sick-words/cold-symptoms": {
    label: "Cold Symptoms",
    children: ["cough", "sneeze", "runny nose", "stuffy nose", "throat hurts", "ear hurts", "tissue", "water", "medicine", "rest", "doctor", "help me"]
  },
  "body-and-health/sick-words/stomach-sick": {
    label: "Stomach Sick",
    children: ["stomach hurts", "throw up", "nauseous", "bathroom", "poop", "diarrhea", "water", "rest", "trash can", "doctor", "help me", "all done"]
  },
  "body-and-health/sick-words/fever": {
    label: "Fever",
    children: ["fever", "hot", "cold", "chills", "sweaty", "thermometer", "medicine", "water", "blanket", "rest", "doctor", "help me"]
  },
  "body-and-health/sick-words/doctor-words": {
    label: "Doctor Words",
    children: ["doctor", "nurse", "medicine", "shot", "check ears", "open mouth", "blood pressure", "scale", "wait", "help me", "all done", "safe"]
  },
  "body-and-health/sick-words/rest-needs": {
    label: "Rest Needs",
    children: ["rest", "sleep", "nap", "bed", "blanket", "quiet", "water", "medicine", "mom", "dad", "all done", "help me"]
  },

  "body-and-health/bathroom-health": {
    label: "Bathroom Health",
    children: ["Bathroom Needs", "Toilet Words", "Clean Words", "Privacy Words", "Accident Words", "Bathroom Help"]
  },
  "body-and-health/bathroom-health/bathroom-needs": {
    label: "Bathroom Needs",
    children: ["bathroom", "I need bathroom", "go now", "wait", "help me", "toilet", "pee", "poop", "privacy", "all done", "wash hands", "safe"]
  },
  "body-and-health/bathroom-health/toilet-words": {
    label: "Toilet Words",
    children: ["toilet", "potty", "pee", "poop", "flush", "wipe", "pants", "pull down", "pull up", "help me", "finished", "all done"]
  },
  "body-and-health/bathroom-health/clean-words": {
    label: "Clean Words",
    children: ["wash hands", "soap", "water", "towel", "clean", "dirty", "wipe", "dry hands", "sink", "help me", "all done", "thank you"]
  },
  "body-and-health/bathroom-health/privacy-words": {
    label: "Privacy Words",
    children: ["privacy", "door closed", "wait outside", "help me", "all done", "pants", "bathroom", "safe", "mom", "dad", "teacher", "nurse"]
  },
  "body-and-health/bathroom-health/accident-words": {
    label: "Accident Words",
    children: ["accident", "wet", "dirty", "change clothes", "help me", "bathroom", "clean", "pants", "underwear", "nurse", "mom", "dad"]
  },
  "body-and-health/bathroom-health/bathroom-help": {
    label: "Bathroom Help",
    children: ["help me", "I need help", "wipe", "flush", "wash hands", "pull up", "pull down", "clean", "privacy", "finished", "all done", "thank you"]
  },

  "body-and-health/medicine-care": {
    label: "Medicine & Care",
    children: ["Medicine", "First Aid", "Doctor Care", "Dentist Care", "Therapy Care", "Care Choices"]
  },
  "body-and-health/medicine-care/medicine": {
    label: "Medicine",
    children: ["medicine", "take medicine", "pill", "liquid medicine", "inhaler", "cream", "drops", "vitamin", "water", "all done", "help me", "yucky"]
  },
  "body-and-health/medicine-care/first-aid": {
    label: "First Aid",
    children: ["bandage", "ice pack", "tissue", "wipe", "wash", "clean cut", "ointment", "hurt", "blood", "help me", "safe", "all done"]
  },
  "body-and-health/medicine-care/doctor-care": {
    label: "Doctor Care",
    children: ["doctor", "nurse", "check body", "listen heart", "check ears", "open mouth", "shot", "scale", "wait", "safe", "help me", "all done"]
  },
  "body-and-health/medicine-care/dentist-care": {
    label: "Dentist Care",
    children: ["dentist", "teeth", "brush teeth", "open mouth", "tooth hurts", "toothbrush", "toothpaste", "chair", "light", "help me", "all done", "safe"]
  },
  "body-and-health/medicine-care/therapy-care": {
    label: "Therapy Care",
    children: ["therapy", "speech", "occupational therapy", "physical therapy", "try", "again", "break", "help me", "good job", "finished", "all done", "safe"]
  },
  "body-and-health/medicine-care/care-choices": {
    label: "Care Choices",
    children: ["water", "rest", "medicine", "doctor", "nurse", "bandage", "ice pack", "hug", "quiet", "blanket", "help me", "all done"]
  },

  "body-and-health/sensory-body": {
    label: "Sensory Body",
    children: ["Sound", "Light", "Touch", "Movement", "Taste/Texture", "Sensory Tools"]
  },
  "body-and-health/sensory-body/sound": {
    label: "Sound",
    children: ["too loud", "quiet", "headphones", "music", "voice", "stop sound", "volume down", "hurt ears", "break", "space", "help me", "safe"]
  },
  "body-and-health/sensory-body/light": {
    label: "Light",
    children: ["too bright", "dark", "light", "lamp", "night light", "sunglasses", "turn off light", "turn on light", "hurt eyes", "break", "help me", "safe"]
  },
  "body-and-health/sensory-body/touch": {
    label: "Touch",
    children: ["too close", "don't touch", "hug", "soft", "scratchy", "itchy", "wet", "sticky", "dirty", "wash", "space", "help me"]
  },
  "body-and-health/sensory-body/movement": {
    label: "Movement",
    children: ["wiggly", "move", "walk", "jump", "swing", "spin", "sit", "stand", "heavy work", "break", "help me", "all done"]
  },
  "body-and-health/sensory-body/taste-texture": {
    label: "Taste/Texture",
    children: ["yucky", "too spicy", "too hot", "too cold", "crunchy", "soft", "sticky", "chewy", "smooth", "drink", "all done", "help me"]
  },
  "body-and-health/sensory-body/sensory-tools": {
    label: "Sensory Tools",
    children: ["headphones", "fidget", "chewy", "weighted blanket", "squishy", "blanket", "music", "quiet", "space", "break", "safe", "all done"]
  },

  "body-and-health/safety-health": {
    label: "Safety Health",
    children: ["Emergency Words", "Safe People", "Stop Safety", "Body Boundaries", "Medical Safety", "Outside Safety"]
  },
  "body-and-health/safety-health/emergency-words": {
    label: "Emergency Words",
    children: ["help me", "I am hurt", "I am scared", "call mom", "call dad", "doctor", "nurse", "stop", "safe", "not safe", "now", "please"]
  },
  "body-and-health/safety-health/safe-people": {
    label: "Safe People",
    children: ["mom", "dad", "teacher", "nurse", "doctor", "helper", "safe person", "police officer", "firefighter", "friend", "family", "help me"]
  },
  "body-and-health/safety-health/stop-safety": {
    label: "Stop Safety",
    children: ["stop", "stop please", "don't", "no", "wait", "too close", "not safe", "help me", "teacher", "mom", "dad", "safe"]
  },
  "body-and-health/safety-health/body-boundaries": {
    label: "Body Boundaries",
    children: ["my body", "don't touch", "stop", "privacy", "bathroom", "space", "safe", "not safe", "help me", "mom", "dad", "teacher"]
  },
  "body-and-health/safety-health/medical-safety": {
    label: "Medical Safety",
    children: ["medicine", "doctor", "nurse", "allergy", "hurt", "sick", "shot", "safe", "help me", "wait", "stop", "all done"]
  },
  "body-and-health/safety-health/outside-safety": {
    label: "Outside Safety",
    children: ["hold hand", "stop", "wait", "car", "street", "helmet", "seat belt", "water", "too hot", "too cold", "safe", "help me"]
  },

  "body-and-health/body-needs": {
    label: "Body Needs",
    children: ["Food/Drink Needs", "Rest Needs", "Bathroom Needs", "Pain Needs", "Sensory Needs", "People Needs"]
  },
  "body-and-health/body-needs/food-drink-needs": {
    label: "Food/Drink Needs",
    children: ["hungry", "thirsty", "food", "snack", "water", "drink", "juice", "milk", "eat", "more", "all done", "please"]
  },
  "body-and-health/body-needs/rest-needs": {
    label: "Rest Needs",
    children: ["tired", "sleepy", "rest", "nap", "bed", "blanket", "quiet", "dark room", "music", "all done", "help me", "safe"]
  },
  "body-and-health/body-needs/bathroom-needs": {
    label: "Bathroom Needs",
    children: ["bathroom", "pee", "poop", "wash hands", "privacy", "help me", "now", "wait", "pants", "clean", "all done", "teacher"]
  },
  "body-and-health/body-needs/pain-needs": {
    label: "Pain Needs",
    children: ["hurt", "pain", "medicine", "doctor", "nurse", "bandage", "ice pack", "hug", "hold hand", "rest", "help me", "now"]
  },
  "body-and-health/body-needs/sensory-needs": {
    label: "Sensory Needs",
    children: ["quiet", "space", "break", "headphones", "fidget", "blanket", "music", "too loud", "too bright", "too close", "help me", "safe"]
  },
  "body-and-health/body-needs/people-needs": {
    label: "People Needs",
    children: ["mom", "dad", "teacher", "nurse", "doctor", "friend", "helper", "stay with me", "help me", "call mom", "call dad", "please"]
  },

  "questions": {
    label: "Questions",
    children: ["Who Questions", "What Questions", "Where Questions", "When Questions", "Why Questions", "How Questions", "Can Questions", "Choice Questions"]
  },
  "questions/who-questions": {
    label: "Who Questions",
    children: ["People Who", "Family Who", "School Who", "Helper Who", "Friend Who", "Who Phrases"]
  },
  "questions/who-questions/people-who": {
    label: "People Who",
    children: ["who", "who is it", "who is there", "who did it", "who wants", "who needs", "who can help", "someone", "everyone", "teacher", "mom", "dad"]
  },
  "questions/who-questions/family-who": {
    label: "Family Who",
    children: ["where is mom", "where is dad", "who is home", "who is coming", "call mom", "call dad", "grandma", "grandpa", "family", "who helps", "who is that", "who"]
  },
  "questions/who-questions/school-who": {
    label: "School Who",
    children: ["who is teacher", "who is helper", "who is friend", "who is next", "who is here", "who is absent", "classmate", "nurse", "principal", "bus driver", "who can help", "who"]
  },
  "questions/who-questions/helper-who": {
    label: "Helper Who",
    children: ["who can help", "who is doctor", "who is nurse", "who is safe", "who do I ask", "teacher", "helper", "mom", "dad", "safe person", "help me", "who"]
  },
  "questions/who-questions/friend-who": {
    label: "Friend Who",
    children: ["who is friend", "who wants to play", "who has toy", "who goes first", "who is next", "who is with me", "friend", "classmate", "my turn", "your turn", "share", "who"]
  },
  "questions/who-questions/who-phrases": {
    label: "Who Phrases",
    children: ["who", "who is", "who has", "who wants", "who needs", "who can", "who did", "who goes", "who helps", "who is next", "who is there", "who is that"]
  },

  "questions/what-questions": {
    label: "What Questions",
    children: ["What Object", "What Activity", "What Food", "What Feeling", "What Happened", "What Phrases"]
  },
  "questions/what-questions/what-object": {
    label: "What Object",
    children: ["what is it", "what is that", "what do you have", "what do I need", "what toy", "what book", "what food", "what drink", "show me", "tell me", "again", "what"]
  },
  "questions/what-questions/what-activity": {
    label: "What Activity",
    children: ["what are we doing", "what next", "what now", "what game", "what work", "what play", "what class", "what happened", "show me", "tell me", "again", "what"]
  },
  "questions/what-questions/what-food": {
    label: "What Food",
    children: ["what food", "what drink", "what snack", "what lunch", "what dinner", "what breakfast", "what fruit", "what chips", "what gummies", "show me", "I want", "what"]
  },
  "questions/what-questions/what-feeling": {
    label: "What Feeling",
    children: ["what do you feel", "what do I feel", "what is wrong", "what hurts", "what happened", "happy", "sad", "mad", "scared", "hurt", "help me", "what"]
  },
  "questions/what-questions/what-happened": {
    label: "What Happened",
    children: ["what happened", "what did you do", "what did I do", "what changed", "what is wrong", "why", "show me", "tell me", "again", "help me", "stop", "what"]
  },
  "questions/what-questions/what-phrases": {
    label: "What Phrases",
    children: ["what", "what is", "what are", "what do", "what did", "what happened", "what next", "what now", "what else", "what color", "what size", "what kind"]
  },

  "questions/where-questions": {
    label: "Where Questions",
    children: ["Where Place", "Where Person", "Where Object", "Where Going", "Where Body", "Where Phrases"]
  },
  "questions/where-questions/where-place": {
    label: "Where Place",
    children: ["where", "where are we", "where is it", "where to go", "home", "school", "bathroom", "outside", "inside", "car", "store", "park"]
  },
  "questions/where-questions/where-person": {
    label: "Where Person",
    children: ["where is mom", "where is dad", "where is teacher", "where is friend", "where is nurse", "where is helper", "home", "school", "come here", "call mom", "call dad", "where"]
  },
  "questions/where-questions/where-object": {
    label: "Where Object",
    children: ["where is toy", "where is tablet", "where is book", "where is cup", "where is blanket", "where is backpack", "find it", "show me", "there", "here", "help me", "where"]
  },
  "questions/where-questions/where-going": {
    label: "Where Going",
    children: ["where are we going", "go home", "go school", "go store", "go doctor", "go outside", "go inside", "go bathroom", "car", "bus", "wait", "where"]
  },
  "questions/where-questions/where-body": {
    label: "Where Body",
    children: ["where hurts", "where is pain", "head", "stomach", "ear", "mouth", "hand", "foot", "back", "show me", "doctor", "where"]
  },
  "questions/where-questions/where-phrases": {
    label: "Where Phrases",
    children: ["where", "where is", "where are", "where do", "where did", "where to", "where now", "where next", "where else", "here", "there", "not here"]
  },

  "questions/when-questions": {
    label: "When Questions",
    children: ["Time Words", "Schedule When", "Before/After When", "Waiting When", "Routine When", "When Phrases"]
  },
  "questions/when-questions/time-words": {
    label: "Time Words",
    children: ["when", "now", "later", "soon", "today", "tomorrow", "morning", "afternoon", "night", "first", "then", "last"]
  },
  "questions/when-questions/schedule-when": {
    label: "Schedule When",
    children: ["when is lunch", "when is break", "when go home", "when outside", "when therapy", "when school", "when bus", "when mom", "when dad", "wait", "timer", "soon"]
  },
  "questions/when-questions/before-after-when": {
    label: "Before/After When",
    children: ["before", "after", "first", "then", "next", "last", "when finished", "when done", "after lunch", "after school", "before bed", "wait"]
  },
  "questions/when-questions/waiting-when": {
    label: "Waiting When",
    children: ["how long", "when", "soon", "wait", "timer", "not yet", "now", "later", "finished", "ready", "not ready", "help me"]
  },
  "questions/when-questions/routine-when": {
    label: "Routine When",
    children: ["when eat", "when drink", "when bathroom", "when sleep", "when play", "when work", "when bath", "when bed", "when car", "when home", "when school", "when"]
  },
  "questions/when-questions/when-phrases": {
    label: "When Phrases",
    children: ["when", "when is", "when are", "when do", "when did", "when can", "when next", "when now", "how long", "soon", "later", "not yet"]
  },

  "questions/why-questions": {
    label: "Why Questions",
    children: ["Why Feelings", "Why Rules", "Why Change", "Why Not", "Why Help", "Why Phrases"]
  },
  "questions/why-questions/why-feelings": {
    label: "Why Feelings",
    children: ["why sad", "why mad", "why scared", "why hurt", "why tired", "why crying", "what happened", "because", "help me", "tell me", "show me", "why"]
  },
  "questions/why-questions/why-rules": {
    label: "Why Rules",
    children: ["why no", "why stop", "why wait", "why not", "why do I have to", "rule", "safe", "because", "help me", "I don't understand", "tell me", "why"]
  },
  "questions/why-questions/why-change": {
    label: "Why Change",
    children: ["why change", "what changed", "why different", "why now", "why later", "schedule", "first", "then", "help me", "I don't understand", "wait", "why"]
  },
  "questions/why-questions/why-not": {
    label: "Why Not",
    children: ["why not", "why can't I", "why no", "not fair", "I want", "I need", "because", "help me", "wait", "later", "safe", "why"]
  },
  "questions/why-questions/why-help": {
    label: "Why Help",
    children: ["why help", "why doctor", "why medicine", "why school", "why work", "why bath", "why clean", "because", "safe", "healthy", "help me", "why"]
  },
  "questions/why-questions/why-phrases": {
    label: "Why Phrases",
    children: ["why", "why is", "why are", "why do", "why did", "why can", "why not", "why now", "why later", "because", "I don't know", "tell me"]
  },

  "questions/how-questions": {
    label: "How Questions",
    children: ["How Help", "How Many", "How Much", "How Feel", "How To", "How Phrases"]
  },
  "questions/how-questions/how-help": {
    label: "How Help",
    children: ["how", "how do I", "show me", "help me", "tell me", "again", "try again", "first", "then", "step", "I don't know", "how"]
  },
  "questions/how-questions/how-many": {
    label: "How Many",
    children: ["how many", "one", "two", "three", "more", "less", "count", "number", "all", "some", "enough", "how many"]
  },
  "questions/how-questions/how-much": {
    label: "How Much",
    children: ["how much", "more", "less", "too much", "not enough", "a little", "a lot", "full", "empty", "some", "all done", "how much"]
  },
  "questions/how-questions/how-feel": {
    label: "How Feel",
    children: ["how do you feel", "how do I feel", "happy", "sad", "mad", "scared", "hurt", "sick", "tired", "okay", "help me", "how"]
  },
  "questions/how-questions/how-to": {
    label: "How To",
    children: ["how to", "show me", "teach me", "help me", "open", "close", "use", "make", "fix", "clean", "write", "read"]
  },
  "questions/how-questions/how-phrases": {
    label: "How Phrases",
    children: ["how", "how is", "how are", "how do", "how did", "how can", "how many", "how much", "how long", "how to", "show me", "tell me"]
  },

  "questions/can-questions": {
    label: "Can Questions",
    children: ["Can I", "Can You", "Can We", "Permission", "Help Requests", "Choice Requests"]
  },
  "questions/can-questions/can-i": {
    label: "Can I",
    children: ["can I", "can I have", "can I go", "can I play", "can I eat", "can I drink", "can I stop", "can I rest", "can I watch", "can I use tablet", "please", "thank you"]
  },
  "questions/can-questions/can-you": {
    label: "Can You",
    children: ["can you", "can you help", "can you open", "can you close", "can you show me", "can you tell me", "can you stay", "can you stop", "can you come here", "please", "thank you", "help me"]
  },
  "questions/can-questions/can-we": {
    label: "Can We",
    children: ["can we", "can we go", "can we play", "can we eat", "can we watch", "can we read", "can we stop", "can we go home", "can we go outside", "please", "thank you", "all done"]
  },
  "questions/can-questions/permission": {
    label: "Permission",
    children: ["can I have", "can I go", "can I use", "can I play", "can I help", "can I stop", "can I be done", "please", "yes", "no", "maybe", "wait"]
  },
  "questions/can-questions/help-requests": {
    label: "Help Requests",
    children: ["can you help", "can you show me", "can you tell me", "can you fix it", "can you open it", "can you get it", "help me", "please", "thank you", "again", "I don't know", "wait"]
  },
  "questions/can-questions/choice-requests": {
    label: "Choice Requests",
    children: ["can I choose", "which one", "this one", "that one", "same", "different", "more", "all done", "yes", "no", "maybe", "help me"]
  },

  "questions/choice-questions": {
    label: "Choice Questions",
    children: ["Yes/No", "This/That", "More/Done", "Same/Different", "Like/Don't Like", "Question Helpers"]
  },
  "questions/choice-questions/yes-no": {
    label: "Yes/No",
    children: ["yes", "no", "maybe", "I don't know", "yes please", "no thank you", "not yet", "later", "wait", "all done", "help me", "again"]
  },
  "questions/choice-questions/this-that": {
    label: "This/That",
    children: ["this", "that", "this one", "that one", "here", "there", "same", "different", "choose", "pick", "show me", "help me"]
  },
  "questions/choice-questions/more-done": {
    label: "More/Done",
    children: ["more", "all done", "finished", "again", "one more", "no more", "stop", "go", "wait", "please", "thank you", "help me"]
  },
  "questions/choice-questions/same-different": {
    label: "Same/Different",
    children: ["same", "different", "other one", "another", "not that", "yes", "no", "maybe", "choose", "show me", "again", "help me"]
  },
  "questions/choice-questions/like-dont-like": {
    label: "Like/Don't Like",
    children: ["like", "don't like", "love", "hate", "favorite", "not favorite", "yucky", "good", "bad", "more", "all done", "help me"]
  },
  "questions/choice-questions/question-helpers": {
    label: "Question Helpers",
    children: ["show me", "tell me", "help me", "again", "I don't know", "wait", "please", "thank you", "what", "where", "who", "how"]
  },
};

export const FLAT_TOPIC_ATTRIBUTES = {
  "places": [
    "outside", "inside", "home", "school", "bathroom", "park", "playground", "store", "car",
    "room", "bedroom", "kitchen", "table", "chair", "door", "bus", "classroom", "library",
    "to", "from", "in", "on", "under", "over", "go", "stay", "finished"
  ],
  "school": [
    "teacher", "friend", "class", "school", "desk", "chair", "book", "paper", "pencil",
    "read", "write", "listen", "look", "learn", "work", "play", "break", "bathroom",
    "help", "I don't understand", "I need help", "finished", "more", "yes", "no", "please"
  ],
  "actions": [
    "go", "stop", "help", "get", "do", "play", "eat", "drink", "read", "watch",
    "sit", "stand", "walk", "run", "jump", "open", "close", "turn", "look", "listen",
    "wait", "try", "choose", "make", "use", "talk", "say", "finished"
  ],
  "things": [
    "toy", "tablet", "book", "ball", "blanket", "clothes", "shoes", "music", "tv",
    "phone", "cup", "plate", "spoon", "fork", "bag", "backpack", "paper", "pencil",
    "chair", "bed", "door", "light", "remote", "game", "more", "help", "finished"
  ],
  "body-and-health": [
    "body", "head", "mouth", "teeth", "ear", "eye", "hand", "arm", "leg",
    "foot", "stomach", "back", "hurt", "pain", "sick", "medicine", "doctor", "nurse",
    "bathroom", "tired", "hot", "cold", "help", "stop", "safe", "I am hurt", "I feel sick"
  ],
  "questions": [
    "who", "what", "where", "when", "why", "how", "which", "can I", "can you",
    "do you", "is it", "are we", "where is", "what is", "why not", "how many", "how much",
    "yes", "no", "maybe", "please", "help", "show me", "tell me", "again", "finished"
  ],
  "recents": [
    "I", "want", "need", "help", "more", "food", "drink", "water", "outside",
    "bathroom", "mom", "dad", "yes", "no", "finished", "please", "thank you", "break",
    "happy", "sad", "hurt", "scared", "go", "stop", "with", "because", "and"
  ],
  "favorites": [
    "I love you", "Can I have a hug", "Help me", "I want", "I need", "I feel", "mom", "dad", "water",
    "food", "snack", "outside", "bathroom", "play", "break", "yes", "no", "finished",
    "please", "thank you", "happy", "sad", "hurt", "safe", "more", "with", "because"
  ],
  "search": [
    "search", "find word", "show me", "people", "places", "food", "feelings", "actions", "things",
    "body", "school", "questions", "recents", "favorites", "help", "more", "yes", "no",
    "I want", "I need", "I feel", "where", "what", "who", "when", "why", "how"
  ],
  "emergency": [
    "Help me", "Stop", "I am hurt", "I am scared", "I need help", "I need mom", "I need dad", "call mom", "call dad",
    "doctor", "medicine", "bathroom", "safe", "hurt", "pain", "sick", "scared", "stop",
    "too loud", "too much", "break", "quiet", "space", "yes", "no", "please", "now"
  ]
};

export const BRANCHES = {
  "i": ["want", "need", "feel", "am", "can", "don't", "like", "love", "have", "see", "hear", "think", "go", "stop", "help", "get", "do", "more", "mom", "dad", "you", "me", "please", "yes", "no", "finished"],
  "i want": ["to", "more", "help", "food", "drink", "water", "outside", "play", "break", "a hug", "mom", "dad", "snack", "bathroom", "tablet", "toy", "music", "turn", "please", "because", "with", "and", "then", "after", "yes", "no", "finished"],
  "i want to": ["go", "play", "eat", "drink", "see", "watch", "read", "sit", "stand", "stop", "try", "talk", "help", "get", "do", "listen", "wait", "open", "outside", "inside", "home", "school", "bathroom", "mom", "dad", "please", "finished"],
  "i need": ["help", "a break", "bathroom", "water", "food", "quiet", "space", "medicine", "mom", "dad", "teacher", "doctor", "inside", "outside", "stop", "safe", "please", "now", "because", "and", "with", "then", "yes", "no", "finished", "hurt", "scared"],
  "i feel": ["happy", "sad", "mad", "scared", "tired", "sick", "hurt", "excited", "proud", "lonely", "safe", "frustrated", "okay", "hungry", "thirsty", "nervous", "calm", "upset", "because", "and", "but", "with", "please", "hug", "mom", "dad", "help"],
  "i am": ["happy", "sad", "mad", "scared", "tired", "sick", "hurt", "ready", "not ready", "okay", "safe", "hungry", "thirsty", "cold", "hot", "done", "finished", "waiting", "because", "and", "but", "with", "please", "mom", "dad", "help", "hug"],
  "i am sad": ["because", "tired", "sick", "hurt", "scared", "lonely", "frustrated", "not ready", "okay", "safe", "with", "mom", "dad", "teacher", "please", "hug", "help", "I need help", "I need a break", "Can I have a hug", "I miss you", "thank you", "yes", "no", "finished", "outside", "inside"],
  "go": ["outside", "inside", "home", "school", "bathroom", "park", "car", "room", "table", "to", "with", "from", "after", "then", "now", "later", "please", "stop", "mom", "dad", "teacher", "friend", "yes", "no", "finished", "help", "more"],
  "stop": ["please", "that", "this", "now", "because", "I am scared", "I am hurt", "I need help", "too loud", "too much", "wait", "finished", "no", "yes", "mom", "dad", "teacher", "safe", "break", "quiet", "space", "inside", "outside", "help", "thank you", "with", "but"],
  "help": ["me", "please", "now", "with", "food", "drink", "water", "bathroom", "outside", "inside", "school", "tablet", "toy", "I am hurt", "I am scared", "mom", "dad", "teacher", "because", "and", "then", "yes", "no", "finished", "thank you", "more", "break"]
};

export function normalizeTreeKey(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugNode(value = "") {
  return normalizeTreeKey(value).replace(/\s+/g, "-").replace(/'/g, "");
}

export function normalizeTopicName(topic = "") {
  const raw = String(topic || "").trim();

  // Important:
  // Nested topic paths must keep their slash separators.
  // Example: "relationships/people" must stay "relationships/people".
  // The old normalizer flattened it into "relationships-people",
  // which made the active tree fall back to the default/home words.
  if (raw.includes("/")) {
    return raw
      .split("/")
      .map(part => slugNode(part))
      .filter(Boolean)
      .join("/");
  }

  const key = normalizeTreeKey(raw);
  const aliases = {
    "food drink": "food-and-drink",
    "food and drink": "food-and-drink",
    "food drinks": "food-and-drink",
    "food and drinks": "food-and-drink",
    "body health": "body-and-health",
    "body and health": "body-and-health",
    "health body": "body-and-health",
    "health and body": "body-and-health"
  };
  return aliases[key] || slugNode(key);
}

export function sentenceToText(sentence = []) {
  if (Array.isArray(sentence)) return sentence.join(" ").trim();
  return String(sentence || "").trim();
}

function bestKeyForPhrase(phrase = "") {
  const clean = normalizeTreeKey(phrase);
  if (!clean) return "";
  const keys = Object.keys(BRANCHES).sort((a, b) => b.length - a.length);
  return keys.find(key => clean === key || clean.endsWith(` ${key}`) || clean.includes(` ${key} `)) || "";
}

export function getTopicNode(context = "") {
  const key = normalizeTopicName(context);
  return TOPIC_TREE[key] || null;
}

export function getTopicNodeChildren(context = "") {
  const node = getTopicNode(context);
  if (node?.children?.length) return [...node.children];

  const key = normalizeTopicName(context);
  if (FLAT_TOPIC_ATTRIBUTES[key]) return [...FLAT_TOPIC_ATTRIBUTES[key]];

  return [];
}

export function getNextTopicContext(currentContext = "", selectedWord = "") {
  const parent = normalizeTopicName(currentContext);
  if (!parent) return "";

  const next = `${parent}/${slugNode(selectedWord)}`;
  return TOPIC_TREE[next] ? next : "";
}

export function isTopicNavigationWord(currentContext = "", selectedWord = "") {
  return Boolean(getNextTopicContext(currentContext, selectedWord));
}

export function getTopicAttributes(topic = "") {
  return getTopicNodeChildren(topic);
}

export function getActiveTreeBranch(sentence = [], activeContext = "") {
  const topicWords = getTopicAttributes(activeContext);
  if (topicWords.length) return topicWords;

  const phrase = sentenceToText(sentence);
  const key = bestKeyForPhrase(phrase);
  return key ? BRANCHES[key] : HOME_BRANCH;
}

export function getFixedCoreLanguage() {
  return [...FIXED_CORE_LANGUAGE];
}

export function getDynamicBranch(sentence = [], activeContext = "") {
  return [...getActiveTreeBranch(sentence, activeContext)];
}

export function uniqueWords(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = normalizeTreeKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
