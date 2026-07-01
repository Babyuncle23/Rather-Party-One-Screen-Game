export const questionsDatabase = [
  {
    id: 1,
    category: "survival",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be stranded", type: "stranded" },
          { text: "be left", type: "left" }
        ]
      },
      {
        options: [
          { text: "on a desert island", requires: ["stranded", "left"], type: "isolated", hints: ["Name a famous singer", "Name an annoying person", "Name a youtuber"] },
          { text: "in the woods alone", requires: ["stranded", "left"], type: "isolated", hints: [{ text: "Fictional character", brainstorm: ["Harry Potter", "Batman", "Sherlock Holmes", "Darth Vader"] }] },
          { text: "in a completely unfamiliar city", requires: ["left"], type: "urban", hints: [{ text: "Famous politician", brainstorm: ["Barack Obama", "Winston Churchill", "Abraham Lincoln"] }] },
        ]
      },
      {
        options: [
          { text: "for the rest of your life", hints: [{ text: "Famous actor", brainstorm: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Johnny Depp"] }] },
          { text: "for 5 years" },
          { text: "for 10 years" },
          { text: "for one day" },
          { text: "for one week" },
          { text: "forever" }
        ]
      },
      {
        options: [
          { text: "accompanied by [ ... ] or by [ ... ]?", hints: ["Name a type of person you find annoying", "Name a profession"] }
        ]
      }
    ],
    hints: [
      { text: "Cartoon character", brainstorm: ["Mickey Mouse", "Homer Simpson", "SpongeBob", "Bugs Bunny"] },
      { text: "Famous media personality", brainstorm: ["Kim Kardashian", "Oprah Winfrey", "Gordon Ramsay"] }
    ]
  },
{
    id: 2,
    category: "activities",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "spend 1000 hours", type: "time", hints: [{ text: "Popular video game", brainstorm: ["Minecraft", "GTA V", "Fortnite", "Skyrim"] }] },
          { text: "enter a competition for", type: "compete", hints: ["Name a board game", { text: "Sport", brainstorm: ["Football", "Basketball", "Tennis", "Golf"] }] },
          { text: "dedicate your entire future to", type: "future" },
          { text: "sacrifice all your free time to", type: "sacrifice", hints: ["Name an annoying habit"] },
          { text: "spend all your weekends", type: "weekends" },
          { text: "be cursed to spend the rest of your life", type: "curse" }
        ]
      },
      {
        options: [
          // Добавлен type: "winnable", чтобы привязать к этому действию условие победы/поражения
          { text: "playing", requires: ["time", "compete", "sacrifice", "weekends", "curse"], type: "winnable", hints: ["Name a mobile game"] },
          { text: "mastering", requires: ["future", "sacrifice"], hints: [{ text: "Musical instrument", brainstorm: ["Guitar", "Piano", "Violin", "Drums"] }] },
          { text: "watching", requires: ["time", "weekends"], hints: [{ text: "Popular TV show", brainstorm: ["Breaking Bad", "Game of Thrones", "Friends", "The Office"] }, { text: "Natural process", brainstorm: ["Campfire burning", "Leaves falling", "Rain pouring", "Clouds moving"] }] },
          { text: "obsessively analyzing", requires: ["future", "curse"], hints: [{ text: "Weird conspiracy theory", brainstorm: ["Flat earth", "Birds aren't real", "Lizard people", "Faked moon landing"] }, { text: "School subject", brainstorm: ["Math", "History", "Physics", "Literature"] }] },
          { text: "aggressively teaching people about", requires: ["curse"], hints: ["Name a random country"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" },
          // Добавлено ограничение requires: ["compete", "winnable"] и улучшен текст штрафа
          { text: "[ ... ] or [ ... ], and if you win you get a million dollars, but if you lose, you pay a fine equal to your entire annual income?", requires: ["compete", "winnable"] }
        ]
      }
    ],
    hints: [
      { text: "Creative hobby", brainstorm: ["Painting", "Writing", "Photography", "Knitting", "Beatmaking", "Sculpting", "Composing"] },
      { text: "Basic human activity", brainstorm: ["Sleeping", "Eating", "Walking", "Breathing"] }
    ]
  },
  {
    id: 3,
    category: "animals",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have a pet", type: "possession", hints: ["Name a chubby animal", { text: "Farm animal", brainstorm: ["Cow", "Pig", "Chicken", "Sheep"] }] },
          { text: "be chased by a", type: "threat_run", hints: [{ text: "Fast animal", brainstorm: ["Cheetah", "Horse", "Ostrich", "Greyhound"] }, { text: "Angry animal", brainstorm: ["Bull", "Wolverine", "Hornet", "Boar"] }, { text: "Weird-looking animal", brainstorm: ["Platypus", "Sloth", "Pug", "Emu"] }] },
          { text: "be trapped alone with a", type: "threat_close", hints: ["Name a very loud animal"] },
          { text: "have to play with a", type: "threat_close", hints: [{ text: "Dangerous animal", brainstorm: ["Tiger", "Shark", "Crocodile", "Bear"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]", type: "normal" },
          { text: "giant [ ... ] or giant [ ... ]", type: "giant", hints: [{ text: "Common insect", brainstorm: ["Ant", "Spider", "Fly", "Mosquito"] }] },
          { text: "tiny [ ... ] or tiny [ ... ]", type: "tiny", hints: [{ text: "Heavy animal", brainstorm: ["Elephant", "Rhino", "Hippo", "Whale"] }] },
          { text: "invisible [ ... ] or invisible [ ... ]", type: "invisible", hints: ["Name an animal that bites"] }
        ]
      },
      {
        options: [
          { text: "for the next ten years?", requires: ["possession"] },
          { text: "in a tiny studio apartment?", requires: ["possession", "threat_run", "threat_close"] },
          { text: "in a dark forest?", requires: ["threat_run", "threat_close"], hints: [{ text: "Nocturnal animal", brainstorm: ["Owl", "Bat", "Raccoon", "Moth"] }] },
          { text: "in an empty mall?", requires: ["threat_run", "threat_close"] },
          { text: "inside a small elevator?", requires: ["threat_close"] },
          { text: "?" } 
        ]
      }
    ],
    hints: [
      { text: "Wild animal", brainstorm: ["Wolf", "Fox", "Lion", "Zebra"] },
      { text: "Dog breed", brainstorm: ["Pug", "Bulldog", "Husky", "Golden Retriever"] }
    ]
  },
  {
    id: 4,
    category: "skills",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { 
            text: "instantly become a world-class expert in", 
            type: "positive", 
            hints: [
              { text: "Foreign language", brainstorm: ["Spanish", "Mandarin", "French", "Japanese"] },
              { text: "Professional field", brainstorm: ["Medicine", "Law", "Engineering", "Finance"] },
              { text: "Martial art", brainstorm: ["Karate", "Judo", "Boxing", "Taekwondo"] }
            ] 
          },
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "but only when you are", type: "condition" },
          { text: "but only when you are trying to impress", type: "context" }
        ]
      },
      {
        options: [
          { text: "the first person you meet on the street?", requires: ["context"], hints: [{ text: "Superpower", brainstorm: ["Flying", "Invisibility", "Telepathy", "Time travel"] }] },
          { text: "the hiring manager during a job interview?", requires: ["context"], hints: ["Name a professional skill"] },
          { text: "your parents at dinner?", requires: ["context"] },
          { text: "completely hungover?", requires: ["condition"] },
          { text: "in sauna?", requires: ["condition"] },
          { text: "having a bad hair day?", requires: ["condition"] },
          { text: "on a first date?", requires: ["condition"], hints: ["Name a topic for small talk"] }
        ]
      }
    ]
  },
  {
    id: 5,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have to brush your teeth with", type: "hygiene", hints: [{ text: "Sauce", brainstorm: ["Ketchup", "Mayo", "Mustard", "Soy Sauce"] }, { text: "Sticky thing", brainstorm: ["Honey", "Glue", "Syrup", "Melted cheese"] }] },
          { text: "have to wash your clothes in", type: "hygiene", hints: [{ text: "Sauce", brainstorm: ["Ketchup", "Mayo", "Mustard", "Soy Sauce"] }, { text: "Sticky thing", brainstorm: ["Honey", "Glue", "Syrup", "Melted cheese"] }] },
          { text: "have to drink a full glass of", type: "utility", hints: [{ text: "Hot drink", brainstorm: ["Coffee", "Tea", "Hot Chocolate", "Mulled Wine"] }, { text: "Popular drink", brainstorm: ["Cola", "Juice", "Beer", "Milk"] }] },
          { text: "fill your bed pillows with", type: "storage", hints: [{ text: "Crunchy snack", isPlural: true, brainstorm: ["Chips", "Nuts", "Pretzels", "Crackers"] }, { text: "Kitchen item", isPlural: true, brainstorm: ["Spoons", "Plates", "Blenders", "Knives"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "every single morning for the rest of your life?" },
          { text: "every single day for an entire year, receiving the million dollars only at the very end?" },
          { text: "right before sleep?" },
          { text: "but a random stranger is forced to watch you do it?" },
          { text: "?" }
        ]
      }
    ],
    hints: [] 
  },
  {
    id: 6,
    category: "body",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "instantly sweat a puddle that", type: "sweat", hints: [{ text: "Sweet liquid", brainstorm: ["Maple syrup", "Melted chocolate", "Apple juice", "Honey"] }, { text: "Strong-smelling food", brainstorm: ["Onion", "Garlic", "Fish", "Blue Cheese"] }] },
          { text: "breathe out a cloud that", type: "breath", hints: [{ text: "Fast food", brainstorm: ["Burger", "Pizza", "Fries", "Hot Dog"] }, { text: "Strong-smelling food", brainstorm: ["Onion", "Garlic", "Fish", "Blue Cheese"] }] },
          { text: "produce saliva that", type: "saliva", hints: [{ text: "Type of candy", brainstorm: ["Gummy bears", "Chocolate", "Lollipop", "Skittles"] }, { text: "Sweet liquid", brainstorm: ["Maple syrup", "Melted chocolate", "Apple juice", "Honey"] }] },
          { text: "have a face that", type: "face", hints: [{ text: "Body part", brainstorm: ["Foot", "Ear", "Knee", "Elbow"] }] },
          { text: "have a head that", type: "face", hints: [{ text: "Body part", brainstorm: ["Foot", "Ear", "Knee", "Elbow"] }] }
        ]
      },
      {
        options: [
          { text: "smells exactly like", requires: ["sweat", "breath"] },
          { text: "tastes exactly like", requires: ["sweat", "saliva"] },
          { text: "looks exactly like a", requires: ["face"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: ", but only when you are", type: "condition" },
          { text: ", and it triggers instantly every time you", type: "action" },
          { text: "", type: "none" }
        ]
      },
      {
        options: [
          { text: "in a bad mood?", requires: ["condition"] },
          { text: "in a great mood?", requires: ["condition"] },
          { text: "feeling guilty?", requires: ["condition"], hints: [{ text: "Junk food", brainstorm: ["Chips", "Donuts", "Ice cream", "Nachos"] }] },
          { text: "trying to sleep?", requires: ["condition"] },
          { text: "sit still?", requires: ["action"] },
          { text: "start laughing?", requires: ["action"] },
          { text: "get nervous?", requires: ["action"] },
          { text: "start eating?", requires: ["action"] },
          { text: "sneeze?", requires: ["action"], hints: [{ text: "Strong spice", brainstorm: ["Pepper", "Chili", "Cinnamon", "Garlic"] }] },
          { text: "?", requires: ["none"] }
        ]
      }
    ],
    hints: [] 
  },
  {
    id: 7,
    category: "survival",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be stranded", type: "stranded" },
          { text: "be left", type: "left" }
        ]
      },
      {
        options: [
          { text: "on a desert island", requires: ["stranded", "left"] },
          { text: "in the woods alone", requires: ["stranded", "left"] },
          { text: "in a completely unfamiliar city", requires: ["left"] }
        ]
      },
      {
        options: [
          { text: "for the rest of your life" },
          { text: "for 5 years" },
          { text: "for 10 years" },
          { text: "for one day" },
          { text: "for one week" }
        ]
      },
      {
        options: [
          { text: "without [ ... ] or without [ ... ]?", hints: [{ text: "Common piece of clothing", brainstorm: ["Sock", "Shoe", "Jacket", "Hat"] }, { text: "Facility people visit regularly", brainstorm: ["Gym", "Cinema", "Supermarket", "Library"] }] }
        ]
      }
    ],
    hints: [
      { text: "Daily item", brainstorm: ["Key", "Phone", "Wallet", "Watch"] },
      { text: "Hygiene product", isPlural: true, brainstorm: ["Soaps", "Toothpastes", "Shampoos", "Deodorants"] }
    ]
  },
  {
    id: 8,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "magically receive an endless supply of", type: "recurring", hints: [{ text: "Large item in a house", isPlural: true, brainstorm: ["Sofas", "Beds", "Fridges", "Tables"] }] },
          { text: "receive a random package every day containing", type: "recurring" },
          { text: "randomly find a pile of", type: "recurring" },
          { text: "get to use", type: "one-time", hints: [{ text: "Expensive thing", isPlural: true, brainstorm: ["Cars", "Yachts", "Diamonds", "Mansions"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]", type: "middle" }
        ]
      },
      {
        options: [
          { text: "appear out of thin air, but you have no control over when it happens?", requires: ["recurring"] }, 
          { text: "except it completely disappears on weekends?", requires: ["recurring"] }, 
          { text: "but it always emits a terrible, rotten smell?", requires: ["recurring"], hints: [{ text: "Thing that smells bad", brainstorm: ["Garbage", "Skunk", "Rotten egg", "Mud"] }] },
          { text: "only one more time in your entire life?", requires: ["one-time"], hints: [{ text: "Thing you use daily", isPlural: true, brainstorm: ["Toothbrushes", "Smartphones", "Microwaves", "Toilets"] }] },
          { text: "but you are forced to share it with a total stranger?" }, 
          { text: "?" }
        ]
      }
    ],
    hints: [
      { text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] },
      { text: "Thing you wear on your head", isPlural: true, brainstorm: ["Hats", "Helmets", "Caps", "Headbands"] }
    ]
  },
  {
    id: 9,
    category: "social",
    text: "Would you rather",
    fragments: [
      {
        options: [
{ text: "be adopted by a family of", type: "adopted", hints: [{ text: "Animal", isPlural: true, brainstorm: ["Wolves", "Monkeys", "Penguins", "Bears"] }, { text: "Type of rich person", isPlural: true, brainstorm: ["Billionaires", "Aristocrats", "Celebrities", "Royals"] }] },          { text: "be fully accepted into a secret society of", type: "society", hints: [{ text: "Boring profession", isPlural: true, brainstorm: ["Accountants", "Data entry clerks", "Actuaries", "Auditors"] }, { text: "Exciting profession", isPlural: true, brainstorm: ["Astronauts", "Spies", "Stunt doubles", "Detectives"] }] }, 
          { text: "be raised from birth by a pack of", type: "raised", hints: [{ text: "Angry-looking animal", isPlural: true, brainstorm: ["Rhinos", "Bulls", "Eagles", "Hippos"] }] },
          { text: "be fully accepted into a magic school of", type: "society" }, 
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" } 
        ]
      }
    ],
    hints: [
      "Name a group of people (use plural)",
      { text: "Pet", isPlural: true, brainstorm: ["Dogs", "Cats", "Parrots", "Hamsters"] }
    ]
  },
  {
    id: 10,
    category: "career",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "start a successful business that only sells", type: "business", hints: [{ text: "Cheap item", isPlural: true, brainstorm: ["Paperclips", "Rubber bands", "Pencils", "Matches"] }] },
          { text: "found a popular new cult based entirely on the use of", type: "cult" },
          { text: "start a massive social movement focused on", type: "movement", hints: [{ text: "Minor inconvenience", isPlural: true, brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] }] },
          { text: "open a fancy restaurant where everything tastes like", type: "restaurant", hints: [{ text: "Thing you find in a bathroom", brainstorm: ["Soap", "Shampoo", "Toothpaste", "Toilet paper"] }] },
          { text: "host a daily podcast that obsessively discusses", type: "podcast", hints: [{ text: "Disease", isPlural: true, brainstorm: ["Flus", "Colds", "Headaches", "Allergies"] }] },
          { text: "run a massive YouTube channel dedicated to", type: "podcast" },
          { text: "become the CEO of a company that produces", type: "business" },
          { text: "form a popular musical band where all instruments are replaced by", type: "band", hints: [{ text: "Tool", isPlural: true, brainstorm: ["Hammers", "Saws", "Drills", "Wrenches"] }] },
          { text: "start a feared criminal gang that exclusively steals", type: "gang", hints: [{ text: "Cheap household item", isPlural: true, brainstorm: ["Sponges", "Toilet paper", "Lightbulbs", "Batteries"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: ", and become incredibly famous, but everyone makes fun of you?" },
          { text: ", but your entire family is forced to participate?" }, 
          { text: ", and you have to bring it up in every single conversation?" },
          { text: ", but you secretly absolutely hate it?" },
          { text: "?" }
        ]
      }
    ],
    hints: [
      { text: "Random thing in your room", isPlural: true, brainstorm: ["Books", "Cables", "Pillows", "Cups"] },
      { text: "Office supply", isPlural: true, brainstorm: ["Staplers", "Pens", "Sticky notes", "Folders"] }
    ]
  },
  {
    id: 11,
    category: "time_travel",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "travel 100 years into the past", type: "past", hints: [{ text: "Historical figure", brainstorm: ["Napoleon", "Cleopatra", "Lincoln", "Einstein"] }, { text: "Famous event", brainstorm: ["World War", "Moon Landing", "Titanic sinking", "Woodstock"] }] },
          { text: "travel back to the 80s", type: "past", hints: [{ text: "80s Pop Culture Icon", brainstorm: ["Michael Jackson", "Madonna", "Pac-Man", "Darth Vader"] }, { text: "Famous 80s movie", brainstorm: ["Star Wars", "Back to the Future", "Ghostbusters", "Terminator"] }] },
          { text: "travel 1000 years into the future", type: "future" },
          { text: "pause time for one hour every day", type: "pause" },
          { text: "go back to your childhood", type: "childhood" }
        ]
      },
      {
        options: [
          { text: "and accidentally alter the fate of", requires: ["past"], type: "change" },
          { text: "and discover that future humans worship", requires: ["future"], type: "worship" },
          { text: "to secretly steal", requires: ["pause"], type: "steal", hints: [{ text: "Everyday object", isPlural: true, brainstorm: ["Smartphones", "Toasters", "Fidget spinners", "Vinyl records"] }] },
          { text: "to secretly fart on", requires: ["pause"], type: "steal", hints: [{ text: "Everyday object", isPlural: true, brainstorm: ["Smartphones", "Toasters", "Fidget spinners", "Vinyl records"] }] },
          { text: "but you can only talk to", requires: ["childhood"], type: "talk", hints: [{ text: "Family member", brainstorm: ["Grandma", "Grandpa", "Uncle", "Aunt"] }, { text: "Childhood hero", brainstorm: ["Santa Claus", "Spider-Man", "Batman", "Tooth Fairy"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]", type: "normal" }
        ]
      },
      {
        options: [
          { text: "before returning to the present?", requires: ["change", "steal"] },
          { text: "and they refuse to let you leave?", requires: ["worship"] },
          { text: "until you grow up again?", requires: ["talk"] },
          { text: "?" }
        ]
      }
    ],
    hints: [] 
  }
];