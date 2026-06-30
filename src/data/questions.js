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
          { text: "on a desert island", requires: ["stranded", "left"], type: "isolated" },
          { text: "in the woods alone", requires: ["stranded", "left"], type: "isolated" },
          { text: "in a completely unfamiliar city", requires: ["left"], type: "urban" },
          { text: "on a space station", requires: ["stranded"], type: "isolated" }
        ]
      },
      {
        options: [
          { text: "for the rest of your life" },
          { text: "for 5 years" },
          { text: "for 10 years" },
          { text: "for one day" },
          { text: "for one week" },
          { text: "forever" }
        ]
      },
      {
        options: [
          { text: "accompanied by ___ or by ___?" }
        ]
      }
    ],
    hints: [
      "Name two celebrities",
      "Name two people who would be helpful in a crisis",
      "Name two weird travel companions",
      "Name two youtubers"
    ]
  },
  {
    id: 2,
    category: "gaming",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "spend 1000 hours" },
          { text: "compete in a world tournament" },
          { text: "dedicate your entire future" },
          { text: "sacrifice all your free time" },
          { text: "spend all your weekends" },
          { text: "be cursed to only ever engage in" }
        ]
      },
      {
        options: [
          { text: "playing", requires: ["spend 1000 hours", "sacrifice all your free time", "spend all your weekends"] },
          { text: "mastering", requires: ["compete in a world tournament", "dedicate your entire future"] },
          { text: "watching", requires: ["spend 1000 hours", "spend all your weekends"] },
          { text: "obsessively analyzing", requires: ["dedicate your entire future"] },
          { text: "aggressively teaching", requires: ["be cursed to only ever engage in"] }
        ]
      },
      {
        options: [
          { text: "___ or ___?" }
        ]
      }
    ],
    hints: [
      "Name two video games",
      "Name two bizarre activities",
      "Name two board games",
      "Name two outdoor activities"
    ]
  },
  {
    id: 3,
    category: "animals",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have a pet", type: "possession" },
          { text: "be chased by a wild", type: "threat" },
          { text: "be adopted by a", type: "threat" },
          { text: "be forced to live with a", type: "possession" }
        ]
      },
      {
        options: [
          { text: "for the next ten years", requires: ["possession"] },
          { text: "through a dark forest", requires: ["threat"] },
          { text: "in an empty mall", requires: ["threat"] },
          { text: "in your own bedroom", requires: ["possession", "threat"] },
          { text: "on a deserted beach", requires: ["possession", "threat"] }
        ]
      },
      {
        options: [
          { text: "that is a normal ___ or normal ___?" },
          { text: "that is a giant ___ or giant ___?" },
          { text: "that is a tiny ___ or tiny ___?" },
          { text: "that is an invisible ___ or invisible ___?" }
        ]
      }
    ],
    hints: [
      "Name two animals",
      "Name two mythical creatures",
      "Name two celebrities",
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
          { text: "instantly become a world-class expert in", type: "positive" },
          { text: "permanently lose the ability to understand", type: "negative" }
        ]
      },
      {
        options: [
          { text: "___ or ___" }
        ]
      },
      {
        options: [
          { text: "but only when you are", type: "condition" },
          { text: "while desperately trying to impress", type: "context" }
        ]
      },
      {
        options: [
          { text: "a crush at a party", requires: ["context"] },
          { text: "your boss at a meeting", requires: ["context"] },
          { text: "your parents at dinner", requires: ["context"] },
          { text: "completely hungover", requires: ["condition"] },
          { text: "having a bad hair day", requires: ["condition"] },
          { text: "on a first date", requires: ["condition"] }
        ]
      }
    ],
    hints: [
      "Name two academic subjects",
      "Name two creative arts",
      "Name two professional industries",
      "Name two foreign languages"
    ]
  },
  {
    id: 5,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "live in a house completely made of", type: "material" },
          { text: "have a bedroom filled with", type: "objects" },
          { text: "wear a full outfit crafted from", type: "material" }
        ]
      },
      {
        options: [
          { text: "___ or ___", requires: ["material", "objects"] }
        ]
      },
      {
        options: [
          { text: "but your residence is in the middle of", type: "location" },
          { text: "and you are forced to wear it while", type: "usage" }
        ]
      },
      {
        options: [
          { text: "an active volcano", requires: ["location"] },
          { text: "a busy airport runway", requires: ["location"] },
          { text: "a high-security prison", requires: ["location"] },
          { text: "giving a professional presentation", requires: ["usage"] },
          { text: "your first date", requires: ["usage"] },
          { text: "a professional wrestling match", requires: ["usage"] }
        ]
      }
    ],
    hints: [
      "Name two gross materials",
      "Name two sticky or slimy objects",
      "Name two fragile things",
      "Name two things that attract bugs"
    ]
  },
  {
    id: 6,
    category: "body",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have sweat that", type: "sweat" },
          { text: "have breath that", type: "breath" },
          { text: "have a face that" }
        ]
      },
      {
        options: [
          { text: "always smells like", requires: ["sweat", "breath"] },
          { text: "always tastes like", requires: ["sweat", "breath"] },
          { text: "always looks like", requires: ["face"] }
        ]
      },
      {
        options: [
          { text: "___ or ___," }
        ]
      },
      {
        options: [
          { text: "but only when you are", type: "condition" },
          { text: "and it triggers every time you", type: "action" }
        ]
      },
      {
        options: [
          { text: "in a bad mood", requires: ["condition"] },
          { text: "in a great mood", requires: ["condition"] },
          { text: "feeling guilty", requires: ["condition"] },
          { text: "trying to sleep", requires: ["condition"] },
          { text: "sit perfectly still", requires: ["action"] },
          { text: "start laughing", requires: ["action"] },
          { text: "get nervous", requires: ["action"] },
          { text: "start eating", requires: ["action"] }
        ]
      }
    ],
    hints: [
      "Name two types of food",
      "Name two famous celebrities",
      "Name two weird objects",
      "Name two animals"
    ]
  },
{
  id: 7,
  category: "social",
  text: "Would you rather",
  fragments: [
    {
      options: [
        { text: "accidentally start loudly commentating on people's actions like a sports reporter to", type: "recipient" },
        { text: "be caught intensely sniffing", type: "object" }
      ]
    },
    {
      options: [
        { text: "___ or ___," }
      ]
    },
      {
        options: [
          { text: "right in the middle of", type: "place" },
          { text: "while your entire family is watching", type: "family" }
        ]
      },
      {
        options: [
          { text: "a professional job interview", requires: ["place"] },
          { text: "your own wedding ceremony", requires: ["place"] },
          { text: "a funeral service", requires: ["place"] },
          { text: "a crowded public elevator", requires: ["place"] },
          { text: "a live news broadcast", requires: ["place"] }
        ]
      }
    ],
    hints: [
      "Name two people you know",
      "Name two weird objects",
      "Name two types of professionals",
      "Name two places you shouldn't be"
    ]
  },
  {
    id: 8,
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
          { text: "without possessing ___ or without ___?" }
        ]
      }
    ],
    hints: [
      "Name two things you can't live without",
      "Name two types of activities to do with others",
      "Name two items you use daily",
      "Name two essential tech gadgets"
    ]
  },
  {
    id: 9,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have an infinite supply of" },
          { text: "receive a daily dose of" },
          { text: "find a random amount of" },
          { text: "get exactly one lifetime use of" }
        ]
      },
      {
        options: [
          { text: "___ or ___," }
        ]
      },
      {
        options: [
          { text: "but you have no control over when it appears?" },
          { text: "except it completely disappears on weekends?" },
          { text: "but you are forced to share it with a total stranger?" },
          { text: "and it always emits a bizarre, pungent smell?" }
        ]
      }
    ],
    hints: [
      "Name two strong emotions",
      "Name two valuable materials",
      "Name two weird liquids",
      "Name two everyday objects"
    ]
  }
];