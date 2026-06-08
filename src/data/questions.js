export const questionsDatabase = [
  {
    id: 1,
    category: "people",
    difficulty: "hard",
    text: "Would you rather be stranded on a desert island until the end of your life with ___ or with ___?",
    resultTemplate: "{name} would rather be stranded on a desert island until the end of life with {winner} than with {loser}.",
    hints: [
      "Name two characters from any book or movie you remember",
      "Name two world-famous actors or celebrities everyone knows",
      { text: "Name two historical figures you find interesting", brainstorm: ["Albert Einstein", "Leonardo da Vinci", "Marie Curie", "Isaac Newton", "Aristotle", "Galileo Galilei"] }
    ]
  },
  {
    id: 2,
    category: "colors",
    difficulty: "easy",
    text: "Would you rather wear only ___ socks or ___ socks for the rest of your life?",
    resultTemplate: "{name} would rather wear only {winner} socks than {loser} socks for the rest of life.",
    hints: [
      "Name two colors that are very bright",
      "Name two colors that look terrible together",
      "Name two colors that you can see somewhere in this room right now",
      "Name two of the safest colors you can think of",
      "Name two of the most standard colors you know"
    ]
  },
  {
    id: 3,
    category: "gaming",
    difficulty: "medium",
    text: "Would you rather spend 1000 hours playing ___ or playing ___?",
    resultTemplate: "{name} would rather spend 1000 hours playing {winner} than playing {loser}.",
    hints: [
      "Name two popular games (board games, sports, or digital) you dislike",
      "Name two games of any kind you recently played or saw",
      "Name two classic games that almost every person on earth knows",
      "Name two games that require a lot of physical activity or energy"
    ]
  },
  {
    id: 4,
    category: "food",
    difficulty: "easy",
    text: "Would you rather eat nothing but ___ or nothing but ___ for an entire month?",
    resultTemplate: "{name} would rather eat nothing but {winner} than nothing but {loser} for an entire month.",
    hints: [
      "Name two of your favorite fast-food or snack items",
      "Name two things you would eat for breakfast on a perfect morning",
      "Name two popular ingredients used in a pizza"
    ]
  },
  {
    id: 5,
    category: "superpowers",
    difficulty: "hard",
    text: "Would you rather have the ability to instantly transform into ___ or into ___?",
    resultTemplate: "{name} would rather have the ability to instantly transform into a {winner} than into a {loser}.",
    hints: [
      "Name two wild animals that are known to be large and heavy",
      "Name two well-known comic book or movie superheroes",
      "Name two random everyday objects in this room",
      { text: "Name two mythical creatures from classic stories or fairy tales", brainstorm: ["Dragon", "Phoenix", "Kraken", "Minotaur", "Pegasus", "Hydra", "Chimeras", "Griffon"] },
      "Name two of the cutest animals in your opinion"
    ]
  },
  {
    id: 6,
    category: "pop-culture",
    difficulty: "medium",
    text: "Would you rather go to a private live concert of ___ or of ___?",
    resultTemplate: "{name} would rather go to a private live concert of {winner} than of {loser}.",
    hints: [
      "Name two music artists, bands, or composers you know",
      "Name two famous singers or performers that have massive global hit songs",
      "Name two well-known internet personalities, bloggers, or creators"
    ]
  },
  {
    id: 7,
    category: "lifestyle",
    difficulty: "easy",
    text: "Would you rather live in a house completely made of ___ or made of ___?",
    resultTemplate: "{name} would rather live in a house completely made of {winner} than made of {loser}.",
    hints: [
      "Name two delicious sweet treats or candies", 
      "Name two building materials or metals",
      { text: "Name two fragile or easily breakable materials", brainstorm: ["Glass", "Porcelain", "Ceramic", "Ice", "Crystal", "Chalk", "Eggshells"] },
      { text: "Name two substances or textures that for some reason feel unpleasant to you", brainstorm: ["Sandpaper", "Wet Cardboard", "Slime", "Velvet", "Sticky Tape", "Aluminum Foil"] }
    ]
  },
  {
    id: 8,
    category: "lifestyle",
    difficulty: "medium",
    text: "Would you rather have your bedroom completely filled with ___ or with ___?",
    resultTemplate: "{name} would rather have a bedroom completely filled with {winner} than with {loser}.",
    hints: [
      { text: "Name two things that make an extremely unpleasant or annoying sound", brainstorm: ["Chalkboard Scratch", "Car Alarm", "Dentist Drill", "Mosquito Buzzing", "Crying Baby", "Screeching Brakes"] },
      { text: "Name two soft things that you love to touch", brainstorm: ["Velvet Fabric", "Silk Sheets", "Cat Fur", "Memory Foam", "Feather Pillow", "Cashmere Sweater"] },
      "Name two tech gadgets or electronic devices"
    ]
  },
  {
    id: 9,
    category: "finance",
    difficulty: "hard",
    text: "Would you rather receive a lifetime endless supply of ___ or of ___?",
    resultTemplate: "{name} would rather receive a lifetime endless supply of {winner} than of {loser}.",
    hints: [
      { text: "Name two expensive items or luxury goods you wish you owned", brainstorm: ["Sports Car", "Private Jet", "Designer Watch", "Luxury Mansion", "Yacht", "Diamond Jewelry"] },
      "Name two daily services or subscriptions that you use often",
      "Name two necessary everyday goods or products that you always buy",
      "Name two good moods",
      "Name two bad moods"
    ]
  },
  {
    id: 10,
    category: "travel",
    difficulty: "medium",
    text: "Would you rather spend a year traveling around ___ or around ___?",
    resultTemplate: "{name} would rather spend a year traveling around {winner} than around {loser}.",
    hints: [
      "Name two countries, cities, or regions that you personally find beautiful or fascinating",
      "Name two distinct types of natural terrain or geographic ecosystems",
      { text: "Name two areas known for extreme weather, intense pollution, or very difficult terrain", brainstorm: ["Sahara Desert", "Siberian Tundra", "Amazon Rainforest", "Death Valley", "Mariana Trench", "Mount Everest"] }
    ]
  },
  {
    id: 11,
    category: "skills",
    difficulty: "hard",
    text: "Would you rather instantly become a world-class expert in ___ or in ___?",
    resultTemplate: "{name} would rather instantly become a world-class expert in {winner} than in {loser}.",
    hints: [
      { text: "Name two complex academic subjects, scientific disciplines, or professional industries", brainstorm: ["Quantum Mechanics", "Neuroscience", "Astrophysics", "Paleontology", "Cryptography", "Genetics"] },
      "Name two creative arts, styles of performance, crafts, or musical instruments",
      { text: "Name two activities that you find incredibly boring, repetitive, or tedious to do", brainstorm: ["Doing Taxes", "Ironing Shirts", "Data Entry", "Washing Dishes", "Sorting Files", "Weeding Gardens"] },
      "Name two fields that are notoriously stressful, high-pressure, or exhausting",
      "Name two highly specific, unusual, or absurd activities"
    ]
  },
  {
    id: 12,
    category: "animals",
    difficulty: "easy",
    text: "Would you rather have a pet ___ or a pet ___ for the next ten years?",
    resultTemplate: "{name} would rather have a pet {winner} than a pet {loser} for the next ten years.",
    hints: [
      "Name two animals that you think are affectionate, gentle, or great companions",
      { text: "Name two wild, rare, or majestic animals that you usually only see in nature documentaries", brainstorm: ["Snow Leopard", "Blue Whale", "Golden Eagle", "Emperor Penguin", "Panda Bear", "Bengal Tiger"] },
      { text: "Name two creatures that terrify you, give you the creeps, or possess toxic defenses", brainstorm: ["Box Jellyfish", "Black Widow", "King Cobra", "Poison Dart Frog", "Grizzly Bear", "Vampire Bat"] },
      { text: "Name two animals known for being extremely noisy, destructive, or bad-smelling", brainstorm: ["Skunk", "Hyena", "Raccoon", "Howler Monkey", "Tasmanian Devil", "Wild Boar"] },
      "Name two massive prehistoric beasts, mythological creatures, or bizarre monsters"
    ]
  },
  {
    id: 13,
    category: "fashion",
    difficulty: "easy",
    text: "Would you rather attend a formal gala wearing a suit made of ___ or made of ___?",
    resultTemplate: "{name} would rather attend a formal gala wearing a suit made of {winner} than made of {loser}.",
    hints: [
      { text: "Name two high-quality fabrics, textures, or materials used to make fine clothing", brainstorm: ["Egyptian Cotton", "Mulberry Silk", "Italian Cashmere", "Merino Wool", "Satin Fabric", "Velvet Cloth"] },
      { text: "Name two shiny, rigid, or reflective elements found in nature or manufacturing", brainstorm: ["Polished Chrome", "Raw Obsidian", "Stained Glass", "Liquid Mercury", "Gold Leaf", "Titanium Sheet"] },
      "Name two sticky, wet, or crumbly foods that would easily stain or fall apart",
      { text: "Name two random objects you would find in a recycling bin, tool shed, or hardware store", brainstorm: ["Rusty Wrench", "Plastic Bottle", "Cardboard Box", "Power Drill", "Metal Paint Can", "Rubber Mallet"] }
    ]
  },
  {
    id: 14,
    category: "history",
    difficulty: "hard",
    text: "Would you rather travel back in time to experience the era of ___ or the era of ___?",
    resultTemplate: "{name} would rather travel back in time to experience the era of {winner} than the era of {loser}.",
    hints: [
      { text: "Name two historical time periods known for significant artistic, architectural, or cultural growth", brainstorm: ["The Renaissance", "Ancient Egypt", "Classical Antiquity", "Victorian Era", "The Roaring 20s", "Age of Enlightenment"] },
      "Name two specific decades from the past century",
      { text: "Name two historical events marked by severe hardships", brainstorm: ["The Great Depression", "The Black Death", "Pompeii Eruption", "The Dust Bowl", "The Potato Famine"] },
      { text: "Name two time periods that lacked modern conveniences like indoor plumbing or electricity", brainstorm: ["The Middle Ages", "The Stone Age", "Ancient Rome", "The Viking Age", "The Wild West"] }
    ]
  },
  {
    id: 15,
    category: "lifestyle",
    difficulty: "hard",
    text: "Would you rather be forced to experience ___ or experience ___ for the next 5 years of your life?",
    resultTemplate: "{name} would rather be forced to experience {winner} than {loser} for the next 5 years of life.",
    hints: [
      "Name two crazy or absurd situations that make no sense",
      { text: "Name two mildly annoying, awkward, or ironic everyday accidents", brainstorm: ["Stepping on Lego", "Dropping Phone on Face", "Spilling Coffee on Shirt", "Stubbing Little Toe", "Forgetting Someone's Name"] },
      "Name two unexpectedly pleasant or surprisingly satisfying feelings"
    ]
  },
  {
    id: 16,
    category: "history",
    difficulty: "hard",
    text: "Would you rather travel 25 years into the future to see the development of ___ or the development of ___?",
    resultTemplate: "{name} would rather travel 25 years into the future to see the development of {winner} than of {loser}.",
    hints: [
      "Name two advanced futuristic technologies or sci-fi inventions",
      "Name two mega-corporations, digital platforms, or popular websites",
      "Name two massive global cities or geographic regions",
      { text: "Name two major industries, scientific fields, or professional domains", brainstorm: ["Quantum Computing", "Renewable Energy", "Aerospace Engineering", "Biotechnology", "Artificial Intelligence", "Marine Biology"] }
    ]
  },
  {
    id: 17,
    category: "people",
    difficulty: "easy",
    text: "Would you rather have every second child born in the world named ___ or named ___?",
    resultTemplate: "{name} would rather every second child born be named {winner} than {loser}.",
    hints: [
      "Name two classic and popular names that you know",
      "Name two unique names from your favorite movies or books",
      { text: "Name two famous historical figures", brainstorm: ["Newton", "Da Vinci", "Tesla", "Mozart", "Curie", "Lincoln"] }
    ]
  },
  {
    id: 18,
    category: "skills",
    difficulty: "easy",
    text: "Would you rather permanently lose the ability to say the word ___ or the word ___?",
    resultTemplate: "{name} would rather lose the ability to say the word {winner} than the word {loser}.",
    hints: [
      "Name two short everyday words you say many times a day",
      { text: "Name two words that are long or difficult to spell", brainstorm: ["Beautiful", "Necessary", "Queue", "Restaurant", "Receipt", "Schedule"] },
      "Name two basic things you can see in the room right now"
    ]
  },
  {
    id: 19,
    category: "lifestyle",
    difficulty: "easy",
    text: "Would you rather live in a world where everyone thinks you are ___ years old or ___ years old?",
    resultTemplate: "{name} would rather everyone believe they are {winner} years old than {loser} years old.",
    hints: [
      "Name two random numbers between 1 and 100",
      "Name two ages when people usually study at school or university"
    ]
  },
  {
    id: 20,
    category: "pop-culture",
    difficulty: "medium",
    text: "Would you rather found a legendary new music band and name it ___ or name it ___?",
    resultTemplate: "{name} would rather name their new music band {winner} than {loser}.",
    hints: [
      { text: "Name two cool objects from outer space", brainstorm: ["Black Hole", "Supernova", "Milky Way", "Asteroid", "Shooting Star", "Red Planet"] },
      "Name two delicious foods or drinks",
      { text: "Name two beautiful elements of nature", brainstorm: ["Thunderstorm", "Midnight Rain", "Neon Oasis", "Solar Flare", "Golden River", "Ocean Echo"] },
      "Write two short dramatic phrases that sound like a movie title",
      "Write two funny, positive phrases that a happy person would say"
    ]
  },
  {
    id: 21,
    category: "skills",
    difficulty: "hard",
    text: "Would you rather have to say ___ or say ___ every time you finish a phone call?",
    resultTemplate: "{name} would rather have to say {winner} than {loser} at the end of every phone call.",
    hints: [
      "Write two short phrases that sound like a famous movie line",
      "Write two funny phrases you would say to your best friend when leaving",
      "Write two polite but completely random phrases to say goodbye"
    ]
  },
  {
    id: 22,
    category: "lifestyle",
    difficulty: "hard",
    text: "Would you rather say ___ or say ___ every time someone steps ahead of you in a line?",
    resultTemplate: "{name} would rather say {winner} than {loser} when someone steps ahead of them in a line.",
    hints: [
      "Write two funny phrases that show you are completely confused",
      "Write two polite, formal phrases to tell someone they made a mistake"
    ]
  }
];