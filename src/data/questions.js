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
          { text: "on a desert island", requires: ["stranded", "left"], type: "isolated", hints: ["Name two famous singers", "Name two annoying people", "Name two youtubers"] },
          { text: "in the woods alone", requires: ["stranded", "left"], type: "isolated", hints: ["Name two fictional characters", "Name two of your favorite artists"] },
          { text: "in a completely unfamiliar city", requires: ["left"], type: "urban", hints: ["Name two famous politicians", "Name two types of tourists"] },
        ]
      },
      {
        options: [
          { text: "for the rest of your life", hints: ["Name two famous actors", "Name two historical figures"] },
          { text: "for 5 years" },
          { text: "for 10 years" },
          { text: "for one day", hints: ["Name two people you trust", "Name two random celebrities"] },
          { text: "for one week" },
          { text: "forever" }
        ]
      },
      {
        options: [
          { text: "accompanied by [ ... ] or by [ ... ]?", hints: ["Name two people playing this game", "Name two people you dislike"] }
        ]
      }
    ],
    hints: [
      "Name two cartoon characters",
      "Name two famous people"
    ]
  },
  {
    id: 2,
    category: "activities",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "spend 1000 hours", type: "time", hints: ["Name two popular video games", "Name two boring chores"] },
          { text: "enter a competition for", type: "compete", hints: ["Name two board games", "Name two sports"] },
          { text: "dedicate your entire future to", type: "future" },
          { text: "sacrifice all your free time to", type: "sacrifice", hints: ["Name two annoying habits", "Name two basic human activities"] },
          { text: "spend all your weekends", type: "weekends" },
          { text: "be cursed to spend the rest of your life", type: "curse" }
        ]
      },
      {
        options: [
          { text: "playing", requires: ["time", "compete", "sacrifice", "weekends", "curse"], hints: ["Name two games you play on a phone", "Name two party games"] },
          { text: "mastering", requires: ["future", "sacrifice"], hints: ["Name two musical instruments", "Name two creative hobbies"] },
          { text: "watching", requires: ["time", "weekends"], hints: ["Name two popular TV shows", "Name two meme videos"] },
          { text: "obsessively analyzing", requires: ["future", "curse"], hints: ["Name two weird rumors", "Name two school subjects"] },
          { text: "aggressively teaching people about", requires: ["curse"], hints: ["Name two conspiracy theories", "Name two random facts"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" }
        ]
      }
    ],
    hints: [] // Очищено, чтобы избежать конфликтов с глаголами (например, "смотреть беспорядок")
  },
  {
    id: 3,
    category: "animals",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have a pet", type: "possession", hints: ["Name two chubby animals", "Name two farm animals"] },
          { text: "be chased by a", type: "threat_run", hints: ["Name two fast animals", "Name two birds"] },
          { text: "be trapped alone with a", type: "threat_close", hints: ["Name two very loud animals", "Name two angry-looking animals"] },
          { text: "have to play with a", type: "threat_close", hints: ["Name two dangerous animals"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]", type: "normal" },
          { text: "giant [ ... ] or giant [ ... ]", type: "giant", hints: ["Name two common insects", "Name two house pets"] },
          { text: "tiny [ ... ] or tiny [ ... ]", type: "tiny", hints: ["Name two heavy animals", "Name two animals that swim"] },
          { text: "invisible [ ... ] or invisible [ ... ]", type: "invisible", hints: ["Name two famous musicians", "Name two animals that bite"] }
        ]
      },
      {
        options: [
          { text: "for the next ten years?", requires: ["possession"] },
          { text: "in a tiny studio apartment?", requires: ["possession", "threat_run", "threat_close"], hints: ["Name two huge animals", "Name two fluffy animals"] },
          { text: "in a dark forest?", requires: ["threat_run", "threat_close"], hints: ["Name two nocturnal animals"] },
          { text: "in an empty mall?", requires: ["threat_run", "threat_close"], hints: ["Name two animals you see at the zoo"] },
          { text: "inside a small elevator?", requires: ["threat_close"] } 
        ]
      }
    ],
    hints: [
      "Name two wild animals",
      "Name two cute animals",
      "Name two dog breeds"
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
              "Name two school subjects",
              "Name two foreign languages",
              "Name two high-paying jobs",
              "Name two martial arts"
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
          { text: "your friends", requires: ["context"], hints: ["Name two superpowers", "Name two impressive skills"] },
          { text: "the hiring manager during a job interview?", requires: ["context"], hints: ["Name two professional skills", "Name two skills you would like to have", "Name two martial arts"] },
          { text: "your parents at dinner?", requires: ["context"] },
          { text: "completely hungover?", requires: ["condition"], hints: ["Name two academic subjects", "Name two school subjects"] },
          { text: "in sauna?", requires: ["condition"], hints: ["Name two academic subjects", "Name two school subjects"] },
          { text: "having a bad hair day?", requires: ["condition"] },
          { text: "on a first date?", requires: ["condition"], hints: ["Name two topics for small talk", "Name two bad conversation topics"] }
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
          { text: "have to brush your teeth with", type: "hygiene", hints: ["Name two sauces", "Name two sweet drinks"] },
          { text: "have to wash your clothes in", type: "hygiene", hints: ["Name two hot drinks", "Name two sticky things"] },
          { text: "have to drink a full glass of", type: "utility", hints: ["Name two sauces", "Name two hot drinks"] },
          { text: "fill your bed pillows with", type: "storage", hints: ["Name two crunchy snacks", "Name two cold things"] }
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
          { text: "for an entire year, but you get paid a million dollars for it?" },
          { text: "before sleep?" },
          { text: "but random stranger is forced to watch you do it?" }
        ]
      }
    ],
    hints: [
      "Name two popular drinks",
      "Name two things you find in a kitchen"
    ]
  },
  {
    id: 6,
    category: "body",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "instantly sweat a puddle that", type: "sweat", hints: ["Name two hot drinks", "Name two sweet liquids"] },
          { text: "breathe out a cloud that", type: "breath", hints: ["Name two types of fast food", "Name two strong-smelling foods"] },
          { text: "produce saliva that", type: "saliva", hints: ["Name two sour foods", "Name two types of candy"] },
          { text: "have a face that", type: "face" }
        ]
      },
      {
        options: [
          { text: "smells exactly like", requires: ["sweat", "breath"] },
          { text: "tastes exactly like", requires: ["sweat", "saliva"] },
          { text: "looks exactly like a", requires: ["face"], hints: ["Name two cartoon characters", "Name two scary creatures", "Name two famous politicians", "Name two body parts"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]," }
        ]
      },
      {
        options: [
          { text: "but only when you are", type: "condition" },
          { text: "and it triggers instantly every time you", type: "action" }
        ]
      },
      {
        options: [
          { text: "in a bad mood?", requires: ["condition"] },
          { text: "in a great mood?", requires: ["condition"] },
          { text: "feeling guilty?", requires: ["condition"], hints: ["Name two junk foods", "Name two things that have a strange flavor"] },
          { text: "trying to sleep?", requires: ["condition"], hints: ["Name two energy drinks", "Name two soft things"] },
          { text: "sit perfectly still?", requires: ["action"] },
          { text: "start laughing?", requires: ["action"] },
          { text: "get nervous?", requires: ["action"] },
          { text: "start eating?", requires: ["action"] },
          { text: "sneeze?", requires: ["action"], hints: ["Name two strong spices", "Name two dusty things"] } 
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
          { text: "without [ ... ] or without [ ... ]?", hints: ["Name two types of clothing that you often wear", "Name two things that modern human 'cannot live without'"] }
        ]
      }
    ],
    hints: [
      "Name two items you use daily",
      "Name two hygiene products"
    ]
  },
  {
    id: 8,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "magically receive an endless supply of", type: "recurring", hints: ["Name two large items in a house", "Name two delicious snacks"] },
          { text: "receive a random package every day containing", type: "recurring" },
          { text: "randomly spawn a pile of", type: "recurring" },
          { text: "get only one more chance in your life to use", type: "one-time", hints: ["Name two expensive things", "Name two things that are very rare"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]," }
        ]
      },
      {
        options: [
          { text: "but you have no control over when it appears?", requires: ["recurring"] }, 
          { text: "except it completely disappears on weekends?", requires: ["recurring"] }, 
          { text: "but you are forced to share it with a total stranger?" }, 
          { text: "and it always emits a terrible, rotten smell?", hints: ["Name two things that smell bad", "Name two liquids you shouldn't drink"] } 
        ]
      }
    ],
    hints: [
      "Name two things you find in a refrigerator",
      "Name two things you wear on your head"
    ]
  },
  {
    id: 9,
    category: "social",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be adopted by a family of", type: "adopted", hints: ["Name two animals", "Name two famous TV families"] },
          { text: "be fully accepted into a secret society of", type: "society", hints: ["Name two boring professions", "Name two hobbies"] }, 
          { text: "be raised from birth by a pack of", type: "raised", hints: ["Name two angry-looking animals", "Name two wild animals", "Name two cute animals", "Name two professions you dislike"] },
          { text: "be fully accepted into a magic school of", type: "society", hints: ["Name two boring professions", "Name two phenomenons", "Name two things that make you feel bored"] }, 
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" } 
        ]
      }
    ],
    hints: [
      "Name two groups of people",
      "Name two pets"
    ]
  },
  {
    id: 10,
    category: "career",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "start a successful business that only sells", type: "business", hints: ["Name two cheap items", "Name two heavy objects", "Name two toys"] },
          { text: "found a popular new cult based entirely on", type: "cult", hints: ["Name two popular drinks", "Name two fast food chains"] },
          { text: "start a massive social movement focused on", type: "movement", hints: ["Name two minor inconveniences", "Name two common habits"] },
          { text: "open a fancy restaurant where everything tastes like", type: "restaurant", hints: ["Name two things you find in a bathroom", "Name two things that smell bad"] },
          { text: "host a daily podcast that obsessively discusses", type: "podcast", hints: ["Name two things old people complain about", "Name two popular snacks", "Name two countries", "Name two diseases"] },
          { text: "form a popular musical band where all instruments are replaced by", type: "band", hints: ["Name two tools", "Name two office supplies"] },
          { text: "start a feared criminal gang that exclusively steals", type: "gang", hints: ["Name two cheap household items", "Name two things you find in a kitchen"] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]," }
        ]
      },
      {
        options: [
          { text: "and become incredibly famous, but everyone makes fun of you?" },
          { text: "but your entire family is forced to participate?" }, 
          { text: "and you have to bring it up in every single conversation?" },
          { text: "but you secretly absolutely hate it?" }
        ]
      }
    ],
    hints: [
      "Name two random things in your room",
      "Name two random things of the same color"
    ]
  }
];