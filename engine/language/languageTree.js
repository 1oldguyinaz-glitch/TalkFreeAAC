export const TREE_VERSION = "5.20";

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
  }
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
