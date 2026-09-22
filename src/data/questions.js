const MOD_SUBJECTS = ["you enjoyed", "you were struggling with", "you wish you paid more attention to"];

export const PROMPTS = {
  // ACTIONS
  actionWork: { text: "Inappropriate action at work", brainstorm: ["taking a nap", "leaving early", "ignoring the boss", "playing games", "watching netflix", "singing in the breakroom", "stealing coffee", "starting a fight", "showing up drunk", "scrolling tiktok on phone", "crying in the toilet", "deleting important database", "insulting the main client", "wearing pajamas to meeting", "falling asleep during presentation", "liquidating company assets"] },
  actionIllegal: { text: "Minor illegal act", brainstorm: ["pirating a movie", "jaywalking", "stealing a pen", "sneaking into a concert", "shoplifting a candy", "vandalizing a wall", "speeding in a school zone", "riding the train without a ticket", "using a fake name", "jerking the emergency brake", "bribing a parking guard", "stealing wifi from neighbors", "forging a doctor note"] },
  actionEmbarrassing: { text: "Embarrassing action", brainstorm: ["forgetting a name", "snorting while laughing", "waving at a stranger", "replying wrong to a text", "having toilet paper on shoe", "forgetting to zip pants", "calling teacher mom", "accidentally liking an old post", "having spinach in teeth", "walking into a glass door", "forgetting your own password"] },
  actionParty: { text: "Funny party trick", brainstorm: ["swallowing a sword", "juggling apples", "doing a backflip", "eating a glass", "holding breath for two minutes", "solving a rubiks cube blindfolded", "peeling a banana with feet", "guessing the secret ingredient in drink", "singing a song backwards", "breaking a wooden board with head", "speaking with two voices at once", "wobbling eyeballs in different directions", "tying a cherry stem with tongue", "finding a needle in a haystack"] },
  actionChore: { text: "Your regular chore (e.g washing the dishes, ironing clothes)", brainstorm: ["vacuuming", "taking out the trash", "folding the laundry", "making the bed", "dusting the shelves", "cleaning the toilet", "sorting out the recycling bin", "changing bed sheets", "unloading the dishwasher", "wiping all the windows"] },
  actionRelax: { text: "Relaxing activity you enjoy", brainstorm: ["sleeping for 10 hours", "taking a hot bath", "reading a book", "staring at the wall", "watching the sunset", "going for a walk", "meditating", "drinking herbal tea", "doing absolutely nothing", "lying on the beach", "watching clouds floating by", "taking a bubble bath", "listening to ocean", "getting a massage", "breathing deeply", "watching rain hit the window", "painting a canvas"] },
  actionExtreme: { text: "Extreme sport action you would never try", brainstorm: ["surfing a huge wave", "going skydiving", "riding a dirt bike", "climbing a rock", "flying in a wingsuit", "doing a backflip", "running an ultra marathon", "jumping across two buildings", "skating down a massive hill"] }, 
  humanActivity: { text: "Activity", modifiers: ["you enjoy doing", "you do not like doing"]},
  hobby: { text: "Hobby", modifiers: ["you would like to start", "you are interested in", "you would never do"]},
  annoyingHabit: { text: "Habit", modifiers: ["good", "bad"]},
  
  // WORDS & ABSTRACTIONS
  personalLike: { text: "Things you genuinely like"},
  personalInterest: { text: "Topics you are interested in"},
  letterM: { text: "Words starting with the letter M"},
  madeUpCompound: { text: "Made-up compound word (that combine two things you like e.g. snackgames, chocomoney)"},
  madeUpHyphenated: { text: "Made-up hyphenated word (that has one thing you like in it e.g. cuddling-machine, snack-show)"},
  abstractMood: { text: "Abstract feeling or concept", modifiers: ["you experienced recently", "you haven't experienced in a while"], brainstorm: ["Joy", "Despair", "Confusion", "Apathy", "Panic", "Melancholy", "Euphoria", "Boredom", "Nostalgia"] },
  
  // PLACES
  country: { text: "Country that interests you"},
  famousCity: { text: "Famous city that interests you"},
  specificLocation: { text: "Location you visit often"},
  publicPlace: { text: "Public place you often visit"},

  // PEOPLE & ROLES
  fictionalChar: { text: "Fictional character"}, 
  villain: { text: "Horror movie villain", brainstorm: ["Dracula", "Pennywise", "Chucky", "Hannibal", "Mummy", "Alien", "Freddy Krueger", "Michael Myers", "Predator", "Jigsaw"] },
  politician: { text: "Politician", brainstorm: ["Putin", "Macron", "Merkel", "Stalin", "Lenin", "Nixon", "Donald Trump", "Joe Biden", "Boris Johnson", "Kim Jong Un", "Barack Obama", "Winston Churchill", "Nelson Mandela", "Mahatma Gandhi", "Abraham Lincoln", "Benjamin Franklin", "Queen Elizabeth", "Margaret Thatcher", "Kamala Harris"] },  
  historical: { text: "Historical figure", brainstorm: ["Nero", "Plato", "Dante", "Galileo", "Mozart", "Abraham Lincoln", "Cleopatra", "Napoleon", "Julius Caesar", "Isaac Newton", "Albert Einstein", "Joan of Arc", "Martin Luther King", "Marco Polo", "Alexander the Great", "Genghis Khan", "Marie Curie"] },
  singer: { text: "Singer/musician", brainstorm: ["Prince", "Adele", "Drake", "Sia", "Sting", "Bowie", "Taylor Swift", "Michael Jackson", "Freddie Mercury", "Beyoncé", "Lady Gaga", "Frank Sinatra", "Elvis Presley", "Whitney Houston", "Billie Eilish", "Justin Bieber"] },
  band: { text: "Music band", brainstorm: ["Queen", "KISS", "Muse", "Blur", "Nirvana", "The Beatles", "Metallica", "Pink Floyd", "Led Zeppelin", "Rolling Stones", "Red Hot Chili Peppers", "Guns N' Roses", "Arctic Monkeys", "Linkin Park", "Foo Fighters", "Black Sabbath", "Radiohead"] },  
  actor: { text: "Actor", brainstorm: ["Brad Pitt", "Tom Cruise", "Jim Carrey", "Tom Hanks", "Vin Diesel", "Will Smith", "Leonardo DiCaprio", "Robert Downey Jr", "Matthew McConaughey", "Scarlett Johansson", "Johnny Depp", "Christian Bale", "Morgan Freeman", "Ryan Reynolds", "Jennifer Lawrence", "Samuel L Jackson", "Joaquin Phoenix"] },
  profession: { text: "Profession", modifiers: ["that sound exhausting", "that sound fun"]},
  cartoonChar: { text: "Cartoon character", brainstorm: ["Popeye", "Gumball", "Scooby", "Stewie", "Bugs Bunny", "Mickey Mouse", "Homer Simpson", "SpongeBob SquarePants", "Tom Cat", "Jerry Mouse", "Charlie Brown", "Winnie the Pooh", "Rick Sanchez"] },
  mediaPersonality: { text: "Media personality", brainstorm: ["Oprah Winfrey", "Ellen DeGeneres", "Conan O'Brien", "Jimmy Fallon", "Jimmy Kimmel", "Joe Rogan", "Larry King", "David Letterman", "Gordon Ramsay", "Tucker Carlson", "Trevor Noah"] },

  // FOOD & DRINKS
  fastFood: { text: "Fast food", brainstorm: ["burger", "pizza", "french fries", "hot dog", "fried chicken", "taco", "burrito", "onion rings"] },
  snack: { text: "Snack food", brainstorm: ["skittles", "doritos", "cheetos", "popcorn", "pretzels", "peanuts", "cookies", "jerky"] },  
  sweetLiquid: { text: "Sweet liquid", brainstorm: ["honey", "syrup", "juice", "soda", "milk", "nectar", "maple syrup", "melted chocolate", "apple juice", "orange juice", "grape soda", "condensed milk"] },
  strongFood: { text: "Strong-smelling food", brainstorm: ["onion", "garlic", "fish", "tuna", "kimchi", "curry", "blue cheese", "pickled herring", "rotten eggs", "canned sardines", "durian fruit"] },  
  sauce: { text: "Sauce", brainstorm: ["Pesto", "Salsa", "Gravy", "Tahini", "Hummus", "Tomato basil sauce", "Creamy mushroom sauce", "Spicy barbecue sauce", "Teriyaki glaze", "Garlic aioli", "Honey mustard", "Classic hollandaise", "Buffalo hot sauce", "Sweet chili sauce", "Blue cheese dressing"] },
  hotDrink: { text: "Hot drink", brainstorm: ["Tea", "Coffee", "Cocoa", "Latte", "Chai", "Hot chocolate", "Herbal infusion", "Earl grey tea", "Green tea", "Cappuccino", "Espresso shot", "Matcha latte", "Peppermint tea", "Flat white", "Warm apple cider"] },
  popularDrink: { text: "Drink", brainstorm: ["Water", "Coffee", "Tea", "Beer", "Soda", "Orange juice", "Coca cola", "Red wine", "Iced tea", "Lemonade", "Hot chocolate", "Apple juice", "Craft beer", "Energy drink", "Sparkling water"] },
  candyType: { text: "Type of candy", brainstorm: ["Gummy bears", "Chocolate", "Lollipop", "Skittles", "Marshmallow", "Licorice ", "Dark chocolate", "Cotton candy"] },
  fruit: { text: "Fruit", brainstorm: ["Apple", "Pear", "Peach", "Plum", "Grape", "Watermelon", "Strawberry", "Pineapple", "Pomegranate", "Grapefruit", "Blueberry", "Raspberry", "Passion fruit", "Kiwi fruit", "Dragon fruit"] },
  foodItem: { text: "Food item", modifiers: ["you could eat every day", "you like", "you do not eat"], brainstorm: ["Pizza", "Cheese", "Cake", "Chocolate"] },

  // ANIMALS
  animalFunny: { text: "Funny-looking animal", brainstorm: ["sloth", "pug", "frog", "llama", "koala", "monkey", "platypus", "capybara", "fruit bat", "emue"] },  
  animalFarm: { text: "Farm animal", brainstorm: ["cow", "pig", "horse", "goat", "sheep", "duck", "hen", "bull", "ram", "chicken", "rooster", "donkey", "mule", "turkey"] },
  chubbyAnimal: { text: "Chubby animal", brainstorm: ["Seal", "Panda", "Hamster", "Penguin", "Bear", "Red panda", "Guinea pig", "Hippopotamus", "Groundhog", "Hedgehog"] },
  fastAnimal: { text: "Fast animal", brainstorm: ["Lion", "Hare", "Hawk", "Shark", "Eagle", "Peregrine falcon", "Cheetah", "Sailfish", "Black marlin", "Pronghorn antelope", "Springbok", "Wildebeest", "Quarter horse", "Ostrich", "Greyhound"] },
  angryAnimal: { text: "Angry-looking animal", brainstorm: ["Wasp", "Bull", "Badger", "Boar", "Snake", "Grizzly", "Silverback gorilla", "Cape buffalo", "Honey badger", "Hippopotamus", "Wolverine", "Rhinoceros", "Chihuahua", "Wild boar"] },
  loudAnimal: { text: "Animal that could be loud", brainstorm: ["Lion", "Wolf", "Crow", "Hyena", "Geese", "Blue whale", "Peacock", "Donkey", "Sea lion", "Bullfrog"] },
  dangerousAnimal: { text: "Animal that could be dangerous", brainstorm: ["Lion", "Shark", "Cobra", "Wolf", "Bear", "Tiger", "Crocodile", "Black mamba", "Box jellyfish", "Komodo dragon", "Poison dart frog", "Hippopotamus"] },
  insect: { text: "Insect", brainstorm: ["Ant", "Bee", "Fly", "Wasp", "Flea", "Honey bee", "House fly", "Dragonfly", "Butterfly", "Ladybug", "Grasshopper", "Cockroach", "Mosquito", "Bumblebee", "Praying mantis"] },
  heavyAnimal: { text: "Heavy animal", brainstorm: ["Cow", "Bear", "Bull", "Seal", "Horse", "Blue whale", "African elephant", "White rhinoceros", "Hippopotamus", "Walrus", "Giraffe", "Bison", "Gaur", "Southern elephant seal", "Asian elephant"] },
  bitingAnimal: { text: "Animal that bites", brainstorm: ["Dog", "Cat", "Ant", "Wasp", "Rat", "German shepherd", "Snapping turtle", "Black mamba", "Komodo dragon", "Fruit bat", "Grizzly bear", "Wild boar", "Fire ant", "Mosquito", "Great white shark"] },
  nocturnalAnimal: { text: "Nocturnal animal", brainstorm: ["Owl", "Bat", "Fox", "Wolf", "Mole", "Raccoon", "Hedgehog", "Flying squirrel", "Badger", "Opossum", "Lemur", "Aye-aye", "Sugar glider", "Fruit bat", "Nightjar"] },
  wildAnimal: { text: "Wild animal", brainstorm: ["Wolf", "Bear", "Lion", "Deer", "Fox", "Bengal tiger", "African elephant", "Grizzly bear", "Red kangaroo", "Snow leopard", "Polar bear", "Bald eagle", "Grey wolf", "Mountain gorilla", "African lion"] },
  dogBreed: { text: "Dog breed", brainstorm: ["Pug", "Boxer", "Husky", "Beagle", "Collie", "Poodle", "Akita", "Corgi", "Chow", "Vizsla", "German shepherd", "Golden retriever", "French bulldog", "Border collie", "Labrador retriever", "Siberian husky", "Great dane", "Australian shepherd", "Bernese mountain dog", "Cavalier king charles spaniel", "Doberman pinscher", "Rottweiler", "Alaskan malamute", "Newfoundland", "Saint bernard"] },
  exoticAnimal: { text: "Exotic animal", brainstorm: ["Panda", "Koala", "Iguana", "Toucan"] },

  // ITEMS & OBJECTS
  everyday: { text: "Material thing/things", modifiers: ["you use quite often", "you want to have more of"]},  
  expensive: { text: "Expensive item/items"},
  gadget: { text: "Electronic gadget", brainstorm: ["iPad", "iPod", "Kindle", "Walkman", "Pager", "Camera", "iPhone", "Game Boy", "Electric razor", "Smart speaker", "Wireless mouse", "Gaming console", "Polaroid", "Computer"] },  
  smallObj: { text: "Small object", isPlural: true, brainstorm: ["Coins", "Pins", "Dice", "Keys", "Rings", "Seeds", "Bottle caps", "Paperclips", "Buttons", "Rubber bands", "Thumb tacks", "Earring studs", "Coffee beans", "Safety pins", "Match sticks", "Guitar picks", "Memory cards"] },
  stickyThing: { text: "Sticky thing", brainstorm: ["Glue", "Honey", "Tape", "Gum", "Sap", "Double sided tape", "Sticky note", "Molasses", "Maple syrup", "Super glue", "Chewing gum", "Tree resin", "Caramel sauce", "Masking tape", "Glue stick"] },
  kitchenItem: { text: "Kitchen item", isPlural: true, brainstorm: ["Spoons", "Plates", "Blenders", "Knives", "Forks", "Cutting boards", "Measuring cups", "Frying pans", "Mixing bowls", "Coffee makers", "Toaster ovens", "Baking sheets", "Wooden spoons", "Dish racks", "Food processors"] },
  householdItem: { text: "Common household item you use quite often", brainstorm: ["Toaster", "Lamp", "Sponge", "Broom", "Chair", "Vacuum cleaner", "Coffee maker", "Wall clock", "Laundry basket", "Cutting board", "Remote control", "Bed sheet", "Shower curtain", "Trash can", "Washing machine"] },
  clothingItem: { text: "Common piece of clothing", brainstorm: ["Shirt", "Jeans", "Skirt", "Dress", "Hat", "Winter jacket", "Leather belt", "Sweater", "T-shirt", "Rain coat"] },
  survivalTool: { text: "Basic survival tool", brainstorm: ["Knife", "Axe", "Saw", "Lighter", "Rope", "Multi tool", "First aid kit", "Flashlight", "Sleeping bag", "Compass"] },
  shape: { text: "Shape / object with a recognizable shape", brainstorm: ["Cube", "Triangle", "Peanut", "Balloon", "Lightbulb", "Pear", "Egg", "Brick", "Heart", "Diamond", "Cylinder", "Cone", "Donut", "Banana", "Pyramid", "Star", "Arrow", "Pill"] },
  hygieneProduct: { text: "Hygiene product", brainstorm: ["Soap", "Toothpaste", "Shampoo", "Deodorant"] },
  badSmellingThing: { text: "Thing that smells bad", brainstorm: ["Garbage", "Skunk", "Rotten egg", "Mud"] },
  cheapItem: { text: "Cheap item", isPlural: true, brainstorm: ["Paperclips", "Rubber bands", "Pencils", "Matches"] },
  roomItem: { text: "Thing in your living room", isPlural: true,  brainstorm: ["Books", "Cables", "Pillows", "Cups"] },
  minorInconvenience: { text: "Minor inconvenience", brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] },
  fragileObject: { text: "Fragile object", brainstorm: ["Raw egg", "Glass cup", "Flower", "Paper cup"] },
  inanimateObject: { text: "Inanimate object", brainstorm: ["Chair", "Lamp", "Car", "Tree"] },
  stickySubstance: { text: "Sticky substance", brainstorm: ["Honey", "Mud", "Slime", "Glue"] },
  vegetable: { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] },

  // MEDIA & BRANDS & CONCEPTS
  company: { text: "Company", brainstorm: ["Sony", "Apple", "Nokia", "Yahoo", "Tesla", "SpaceX", "Intel", "Meta", "Blockbuster", "Netflix", "Google", "Amazon", "Microsoft", "Samsung", "Toyota", "General Electric", "Coca Cola Company"] },  
  app: { text: "Modern app", brainstorm: ["Zoom", "Uber", "Slack", "Tinder", "Discord", "Reddit", "BeReal", "TikTok", "Instagram", "Google Maps", "Spotify", "YouTube", "WhatsApp", "Twitter", "Apple Music", "Netflix", "Facebook", "Snapchat"] },
  website: { text: "Website", brainstorm: ["eBay", "Bing", "Twitch", "Reddit", "Tumblr", "Github", "YouTube", "Wikipedia", "Amazon", "Google", "Facebook", "Instagram", "Pinterest", "LinkedIn", "Netflix", "SoundCloud"] },
  videoGame: { text: "video game", brainstorm: ["Doom", "Halo", "Tetris", "Portal", "Skyrim", "Fortnite", "Grand Theft Auto", "World of Warcraft", "The Witcher", "Red Dead Redemption", "Super Mario Bros", "Minecraft", "Elden Ring", "Call of Duty", "Final Fantasy", "League of Legends"] },
  boardGame: { text: "board game", brainstorm: ["Monopoly", "Uno", "Chess", "Twister", "Jenga", "Scrabble", "Catan"] },
  sport: { text: "Sport", brainstorm: ["Golf", "Rugby", "Tennis", "Soccer", "Boxing", "Basketball", "Volleyball", "Ice hockey", "Table tennis", "American football", "Formula one", "Rock climbing", "Figure skating", "Horse racing", "Ultimate frisbee"] },
  mobileGame: { text: "Mobile game", brainstorm: ["Alto", "Snake", "Plague", "Threes", "Monument", "Candy Crush Saga", "Clash of Clans", "Subway Surfers", "Angry Birds", "Temple Run", "Among Us", "Genshin Impact", "Pokémon GO", "PUBG Mobile", "Plants vs Zombies"] },
  instrument: { text: "Musical instrument", brainstorm: ["Piano", "Drum", "Harp", "Flute", "Cello", "Acoustic guitar", "Electric guitar", "Grand piano", "Violin", "Saxophone", "Trumpet", "Clarinet", "Trombone", "Bass guitar", "Synthesizer"] },
  tvShow: { text: "TV show you like", brainstorm: ["Lost", "Fargo", "Friends", "The Wire", "Succession", "Breaking Bad", "Game of Thrones", "The Sopranos", "Stranger Things", "The Office", "Better Call Saul", "Black Mirror", "Chernobyl", "The Crown", "House of the Dragon"] },
  schoolSubject: { text: "School subject", modifiers: MOD_SUBJECTS, brainstorm: ["Math", "Art", "Music", "History", "Physics", "Computer science", "Physical education", "Foreign language", "Social studies", "Political science", "Environmental science", "English literature", "Graphic design", "Religious studies", "Business economics"] },
  complicatedTopic: { text: "Complicated topic", brainstorm: ["Cryptocurrency", "Taxes", "Artificial intelligence", "Astrology", "Quantum physics", "The Matrix", "NFTs"] },
  foreignLanguage: { text: "Foreign language", modifiers: ["you would like to learn", "that would be useful to know"], brainstorm: ["French", "German", "Spanish", "Italian", "Arabic", "Mandarin chinese", "Japanese", "Portuguese", "Russian", "Korean", "Hindi", "Dutch", "Turkish", "Swedish", "Vietnamese"] },
  professionalField : { text: "Professional field (e.g. Medicine, Sofware development)", brainstorm: ["Medicine", "Law", "Engineering", "Finance", "Design", "Software development", "Project management", "Data science", "Digital marketing", "Business administration", "Human resources", "Environmental science", "Graphic design", "Artificial intelligence", "Public relations"] },
  martialArt: { text: "Martial art", brainstorm: ["Judo", "Karate", "Aikido", "Kung fu", "Sumo", "Brazilian jiu jitsu", "Muay thai", "Mixed martial arts", "Taekwondo", "Krav maga", "Capoeira", "Jeet kune do", "Kendo", "Hapkido", "Wing chun", "Shorinji Kempo"] },
  smallTalkTopic: { text: "Small talk topic", brainstorm: ["Weather", "Travel", "Hobbies", "Movies", "Music", "Weekend plans", "Favorite local restaurants", "Current technology trends", "Recent books read", "Work life balance", "Holiday experiences", "Fitness goals", "Upcoming local events", "Cooking experiments", "Career growth"] },
  movie: { text: "Movie", brainstorm: ["Titanic", "Star Wars", "The Matrix", "Shrek", "Harry Potter", "Jurassic Park", "Avatar", "The Lord of the Rings", "The Avengers", "Spider-Man"] },
  movieGenre: { text: "Movie genre", brainstorm: ["Horror", "Romantic Comedy", "Sci-Fi", "Musical", "Western", "Silent film", "True crime", "Action", "Fantasy"] },
  musicGenre: { text: "Music genre", brainstorm: ["Heavy metal", "Classical", "K-pop", "Jazz", "Country", "Dubstep", "Opera", "Punk rock", "Techno"] }
};
export const questionsDatabase = [
  {
    id: 1,
    category: "survival",
    canTriggerCombo: true,
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
          { text: "on a desert island", requires: ["stranded", "left"], type: "isolated", scene: "island" },
          { text: "in the woods alone", requires: ["stranded", "left"], type: "isolated", scene: "woods" },
          { text: "in a completely unfamiliar city", requires: ["left"], type: "urban", scene: "city" }
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
          { text: "accompanied by [ ... ] or by [ ... ]?" }
        ]
      }
    ],
    hints: [
      PROMPTS.singer,
      PROMPTS.fictionalChar, PROMPTS.politician, PROMPTS.profession, 
      PROMPTS.cartoonChar, PROMPTS.mediaPersonality, PROMPTS.actor
    ]
  },
  {
    id: 2,
    category: "activities",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "spend 1000 hours", type: "time" },
          { text: "enter a championship for", type: "compete" },
          { text: "dedicate your entire future to", type: "future" },
          { text: "sacrifice all your free time to", type: "sacrifice" },
          { text: "spend all your weekends", type: "weekends" },
        ]
      },
      {
        options: [
          { text: "playing", requires: ["time", "compete", "sacrifice", "weekends"], scene: "playing", hints: [PROMPTS.videoGame, PROMPTS.boardGame, PROMPTS.sport, PROMPTS.mobileGame] },
          { text: "doing", requires: ["sacrifice", "weekends"], scene: "doing", hints: [PROMPTS.annoyingHabit, PROMPTS.actionChore, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: "mastering", scene: "mastering", requires: ["future", "sacrifice", "time", "weekends"], hints: [PROMPTS.hobby, PROMPTS.instrument, PROMPTS.foreignLanguage] },
          { text: "watching", requires: ["time", "weekends"], hints: [PROMPTS.tvShow, PROMPTS.sport] },
          { text: "obsessively analyzing", requires: ["future", "time"], scene: "report", hints: [PROMPTS.complicatedTopic, PROMPTS.historical, PROMPTS.country, PROMPTS.mediaPersonality, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: "aggressively teaching people about", requires: ["future", "weekends"], scene: "report", hints: [PROMPTS.schoolSubject, PROMPTS.complicatedTopic, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" },
          { text: "[ ... ] or [ ... ] for a million dollars?", requires: ["compete"], scene: "money" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 3,
    category: "animals",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have a pet", type: "possession", hints: [PROMPTS.animalFarm, PROMPTS.dogBreed, PROMPTS.chubbyAnimal, PROMPTS.animalFunny] },
          { text: "be chased by a", type: "threat_run", scene: "chase", hints: [PROMPTS.fastAnimal, PROMPTS.angryAnimal, PROMPTS.dangerousAnimal, PROMPTS.wildAnimal, PROMPTS.heavyAnimal] },
          { text: "be trapped alone with a", type: "threat_close", hints: [PROMPTS.dangerousAnimal, PROMPTS.angryAnimal, PROMPTS.bitingAnimal, PROMPTS.loudAnimal] },
          { text: "have to play with a", type: "threat_close", hints: [PROMPTS.insect, PROMPTS.animalFunny, PROMPTS.dogBreed, PROMPTS.nocturnalAnimal, PROMPTS.wildAnimal] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]", type: "normal" },
          { text: "giant [ ... ] or giant [ ... ]", type: "giant" },
          { text: "tiny [ ... ] or tiny [ ... ]", type: "tiny" },
          { text: "invisible [ ... ] or invisible [ ... ]", type: "invisible" }
        ]
      },
      {
        options: [
          { text: "for the next ten years?", requires: ["possession"] },
          { text: "in a tiny studio apartment?", requires: ["possession", "threat_run", "threat_close"] },
          { text: "in a dark forest?", requires: ["threat_run", "threat_close"] },
          { text: "in an empty mall?", requires: ["threat_run", "threat_close"] },
          { text: "inside a small elevator?", requires: ["threat_close"] },
          { text: "?" } 
        ]
      }
    ],
    hints: [] 
  },
  {
    id: 4,
    category: "skills",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "instantly become a world-class expert in", type: "positive", hints: [PROMPTS.foreignLanguage, PROMPTS.martialArt, PROMPTS.hobby, PROMPTS.instrument] }
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
          { text: "the hiring manager?", requires: ["context"] },
          { text: "your parents?", requires: ["context"] },
          { text: "half asleep?", requires: ["condition"] },
          { text: "in sauna?", requires: ["condition"] },
          { text: "having a bad hair day?", requires: ["condition"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 5,
    category: "lifestyle",
    tags: ["lab_scene", "meme_charlie"],
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have to brush your teeth with", type: "hygiene", hints: [PROMPTS.sauce, PROMPTS.stickyThing, PROMPTS.sweetLiquid, PROMPTS.badSmellingThing] },
          { text: "have to wash your clothes in", type: "hygiene", hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink, PROMPTS.popularDrink] },
          { text: "have to drink a full glass of", type: "drink", scene: "drink", hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "every morning for the rest of your life?" },
          { text: "every day for a year?" },
          { text: "right before sleep?" },
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
          { text: "sweat a puddle that", type: "sweat" },
          { text: "breathe out a cloud that", type: "breath" },
          { text: "produce saliva that", type: "saliva" }
        ]
      },
      {
        options: [
          { text: "smells like", requires: ["sweat", "breath"], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.badSmellingThing] },
          { text: "tastes like", requires: ["sweat", "saliva"], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.snack] }
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
          { text: "every time you", type: "action" },
        ]
      },
      {
        options: [
          { text: "in a bad mood?", requires: ["condition"] },
          { text: "in a great mood?", requires: ["condition"] },
          { text: "feeling guilty?", requires: ["condition"] },
          { text: "trying to sleep?", requires: ["condition"] },
          { text: "sit still?", requires: ["action"] },
          { text: "start laughing?", requires: ["action"] },
          { text: "get nervous?", requires: ["action"] },
          { text: "start eating?", requires: ["action"] },
          { text: "sneeze?", requires: ["action"] },
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
          { text: "on a desert island", requires: ["stranded", "left"], type: "island" },
          { text: "in the woods alone", requires: ["stranded", "left"], type: "isolated", scene: "woods" },
          { text: "in a completely unfamiliar city", requires: ["left"], type: "urban", scene: "city" }
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
          { text: ", arriving there with absolutely nothing but [ ... ] or [ ... ]?" },
          { text: ", with your only starting item being [ ... ] or [ ... ]?" },
          { text: ", starting off with nothing but [ ... ] or [ ... ] in your pockets?" }
        ]
      }
    ],
    hints: [
      PROMPTS.clothingItem, 
      PROMPTS.survivalTool, 
      PROMPTS.hygieneProduct,
      PROMPTS.everyday,
      PROMPTS.expensive,
      PROMPTS.badSmellingThing
    ]
  },
  {
    id: 8,
    category: "lifestyle",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "receive an endless supply of", type: "recurring", hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType] },
          { text: "receive a daily package containing", type: "recurring", hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "wake up every morning next to a pile of", type: "recurring", hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.strongFood] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "but it disappears on weekends?", requires: ["recurring"] }, 
          { text: "but it always smells terrible?", requires: ["recurring"] },
          { text: "but you have to share it with a stranger?" }, 
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 9,
    category: "social",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be adopted by a family of", type: "adopted", hints: [PROMPTS.wildAnimal, PROMPTS.animalFunny] },
          { text: "start a cult based around", type: "cult", scene: "spiritual", hints: [PROMPTS.actionChore, PROMPTS.personalLike] }, 
          { text: "be raised by a pack of", type: "raised", hints: [PROMPTS.wildAnimal, PROMPTS.angryAnimal, PROMPTS.animalFunny] },
          { text: "go to a magic school where you can only summon", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the power to turn gold into", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.snack, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the power to turn water into", type: "society", hints: [PROMPTS.sweetLiquid, PROMPTS.sauce, PROMPTS.hotDrink, PROMPTS.abstractMood] },
          { text: "have the power to turn dirt into", type: "society", hints: [PROMPTS.expensive, PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.abstractMood] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" } 
        ]
      }
    ],
    hints: []
  },
  {
    id: 10,
    category: "career",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "start a business that only sells", type: "business", hints: [PROMPTS.cheapItem, PROMPTS.expensive, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "start a cult based around", type: "cult", hints: [PROMPTS.everyday, PROMPTS.annoyingHabit, PROMPTS.roomItem] },
          { text: "start a protest movement against", type: "movement", hints: [PROMPTS.minorInconvenience, PROMPTS.annoyingHabit, PROMPTS.roomItem, PROMPTS.vegetable] },
          { text: "open a restaurant where everything tastes like", type: "restaurant", hints: [PROMPTS.strongFood, PROMPTS.abstractMood] },
          { text: "host a podcast about", type: "podcast", scene: "report", hints: [PROMPTS.humanActivity, PROMPTS.minorInconvenience, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: "run a YouTube channel about", type: "podcast", scene: "report", hints: [PROMPTS.humanActivity, PROMPTS.annoyingHabit, PROMPTS.tvShow, PROMPTS.personalInterest] },
          { text: "become CEO of a company making", type: "business", hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive] },
          { text: "start a street gang that only steals", type: "gang", hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.gadget] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "and try to convince your friends to join?" }, 
          { text: "and bring it up in every conversation?" },
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 11,
    category: "social",
    text: "Would you rather have [PICKER]",
    fragments: [
      {
        options: [
          { text: "get a small tattoo of", type: "tattoo", scene: "tattoo", hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.politician, PROMPTS.actor] },
          { text: "give a 1-hour presentation on their relationship with", type: "presentation", scene: "report", hints: [PROMPTS.actionChore, PROMPTS.everyday, PROMPTS.animalFunny, PROMPTS.snack] },
          { text: "write a heartfelt song about", type: "song", scene: "song", hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.everyday, PROMPTS.candyType] },
          { text: "star in a low-budget musical about", type: "musical", scene: "song",  hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
{
        options: [
          { text: "on their back?", requires: ["tattoo"] },
          { text: "?", requires: ["presentation"] },
          { text: "and perform it at your birthday?", requires: ["song", "musical"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 12,
    category: "superpowers",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be able to turn any object into", type: "clean_power", hints: [PROMPTS.foodItem, PROMPTS.animalFunny, PROMPTS.fragileObject] },
          { text: "be able to turn yourself into", type: "clean_power_self", hints: [PROMPTS.animalFunny, PROMPTS.exoticAnimal, PROMPTS.inanimateObject] },
          { text: "be able to teleport, but always arrive covered in", type: "has_condition", hints: [PROMPTS.stickySubstance, PROMPTS.sauce, PROMPTS.strongFood] },
          { text: "become invisible, but only while holding", type: "has_condition", hints: [PROMPTS.everyday, PROMPTS.fragileObject, PROMPTS.foodItem] },
          { text: "have super strength, but only while singing about", type: "has_condition", scene: "songResponder", hints: [PROMPTS.schoolSubject, PROMPTS.vegetable, PROMPTS.abstractMood, PROMPTS.actionChore, PROMPTS.personalLike] },
          { text: "have super strength, but only while singing songs by", type: "has_condition", scene: "songResponder", hints: [PROMPTS.singer, PROMPTS.band] },
          { text: "be able to read minds, but only hear thoughts about", type: "has_condition", hints: [PROMPTS.fastFood, PROMPTS.vegetable, PROMPTS.schoolSubject, PROMPTS.abstractMood, PROMPTS.actionChore] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "whenever you sneeze?", requires: ["clean_power_self"] },
          { text: "for only 60 seconds a day?", requires: ["clean_power", "clean_power_self"] },
          { text: "?", requires: ["has_condition", "clean_power", "clean_power_self"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 13,
    category: "lifestyle",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "wear a full costume of", type: "costume_full", hints: [PROMPTS.animalFunny, PROMPTS.foodItem, PROMPTS.profession, PROMPTS.fictionalChar, PROMPTS.cartoonChar] },
          { text: "carry a life-sized statue of", type: "carry_statue", hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: "dress exactly like", type: "dress_like", hints: [PROMPTS.villain, PROMPTS.profession, PROMPTS.cartoonChar] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "to every job interview?", requires: ["costume_full", "dress_like"] },
          { text: "on public transport?", requires: ["costume_full", "carry_statue"] },
          { text: "when grocery shopping?", requires: ["carry_statue"] },
          { text: "whenver you meet your family members?", requires: ["costume_full", "dress_like", "carry_statue"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 14,
    category: "superpowers",
    text: "Would you rather have the magical ability to",
    fragments: [
      {
        options: [
          { text: "make everyone in the room suddenly start", type: "start", hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: "instantly stop anyone from", type: "stop", hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity] },
          { text: "earn $10 every time you finish", type: "earn", scene: "money", hints: [PROMPTS.actionChore, PROMPTS.humanActivity] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "?" },
          { text: ", but you can only use it once a day?" },
          { text: ", but it only works on your friends?", requires: ["start", "stop"] },
          { text: ", but it only works on people older than 30?", requires: ["start", "stop"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 15,
    category: "mind",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "instantly gain all the life experience of", type: "exp" },
          { text: "instantly absorb all the memories and skills of", type: "skills" }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: ", but you permanently speak with their exact voice?" },
          { text: ", but you start looking exactly like them when you get angry?" },
          { text: "?" }
        ]
      }
    ],
    hints: [PROMPTS.historical, PROMPTS.singer, PROMPTS.actor, PROMPTS.politician]
  },
  {
    id: 16,
    category: "identity",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "switch bodies with", type: "switch", hints: [PROMPTS.profession, PROMPTS.mediaPersonality] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "for the rest of your lives?" },
          { text: "every single Monday for the rest of your lives?" },
          { text: "every weekend for the next 10 years?" },
          { text: "for one random day every month?" },
          { text: "for exactly one year, and then return to normal?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 17,
    category: "entertainment",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "host a 12-hour watch party of", type: "watch", hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.sport, PROMPTS.actionEmbarrassing] },
          { text: "star in a low-budget musical about/based on", type: "musical", hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame, PROMPTS.actionChore, PROMPTS.personalInterest] },
          { text: "write a 100-page fanfiction about", type: "fanfic", hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.videoGame, PROMPTS.politician, PROMPTS.abstractMood] },
          { text: "record a 3-hour rant about", type: "rant", scene: "report",  hints: [PROMPTS.movie, PROMPTS.videoGame, PROMPTS.tvShow, PROMPTS.annoyingHabit] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "and pause every 5 minutes to explain the plot?", requires: ["watch"] },
          { text: "and post it online?", requires: ["musical", "fanfic", "rant"] },
          { text: "and send it to all your phone contacts?", requires: ["musical", "fanfic", "rant"] },
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 18,
    category: "adventure",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be randomly teleported to", type: "location", scene: "welcomeTo", hints: [PROMPTS.country, PROMPTS.famousCity] },
          { text: "instantly teleport into the home of", scene: "welcomeTo", type: "person", hints: [PROMPTS.actor, PROMPTS.singer, PROMPTS.politician, PROMPTS.historical] },
          { text: "be magically teleported into", type: "place", scene: "welcomeTo", hints: [PROMPTS.specificLocation, PROMPTS.publicPlace] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "for exactly 24 hours?" },
          { text: "for the rest of your life?", requires: ["location", "place"] },
          { text: "with no way back?" },
          { text: "but you arrive dressed as a clown?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 19,
    category: "identity",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have everyone insist you look exactly like", type: "look", hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.animalFunny, PROMPTS.cartoonChar] },
          { text: "be treated by society exactly like", type: "status", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.profession, PROMPTS.fictionalChar] },
          { text: "permamently turn into", type: "morph", hints: [PROMPTS.fictionalChar, PROMPTS.chubbyAnimal, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "whenever you try to be serious?", requires: ["look", "status"] },
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 20,
    category: "social",
    canTriggerCombo: true,
    text: "Would you rather have",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "as your boss?", scene: "boss", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor] },
          { text: "as your best friend?", scene: "bestFriend", hints: [PROMPTS.cartoonChar, PROMPTS.chubbyAnimal, PROMPTS.dogBreed, PROMPTS.fictionalChar] },
          { text: "as your sworn enemy?", scene: "enemy", hints: [PROMPTS.villain, PROMPTS.historical, PROMPTS.mediaPersonality] },
          { text: "as your psychotherapist?", scene: "psychotherapist", type: "therapist", hints: [PROMPTS.historical, PROMPTS.actor, PROMPTS.singer, PROMPTS.mediaPersonality] },
          { text: "as your martial art sparring partner?", scene: "sparringPartner", hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical] },
          { text: "as your fitness trainer?", scene: "danceFitness", hints: [PROMPTS.actor, PROMPTS.fastAnimal, PROMPTS.villain, PROMPTS.singer] },
          { text: "as your obedient subordinate?", scene: "subordinate", hints: [PROMPTS.politician, PROMPTS.villain, PROMPTS.historical, PROMPTS.actor] },
          { text: "as your butler?", hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.fictionalChar] },
          { text: "as your nanny?", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor, PROMPTS.cartoonChar] },
          { text: "as your math teacher?", scene: "mathTeacher", hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.singer] },
          { text: "as your art teacher?", hints: "artTeacher", hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.heavyAnimal] },
          { text: "as your dance teacher?", scene: "danceFitness", hints: [PROMPTS.politician, PROMPTS.heavyAnimal, PROMPTS.villain, PROMPTS.cartoonChar] },
          { text: "as your yoga teacher?", scene: "yogaTeacher", hints: [PROMPTS.villain, PROMPTS.dangerousAnimal, PROMPTS.politician, PROMPTS.actor] },
          { text: "as your uber driver?", scene: "uberDriver", hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.chubbyAnimal, PROMPTS.singer] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 21,
    category: "naming_realm",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "rename your country to", type: "renameCountry", scene: "welcomeTo", hints: [PROMPTS.company, PROMPTS.chubbyAnimal, PROMPTS.everyday, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: "rename your city to", type: "renameCity", scene: "welcomeTo", hints: [PROMPTS.snack, PROMPTS.everyday, PROMPTS.company, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] }
        ]
      },
      {
        options: [
          { text: "[ ... ]land or [ ... ]land?", requires: ["renameCountry", "renameCity"] },
          { text: "[ ... ]ville or [ ... ]ville?", requires: ["renameCity"] },
          { text: "[ ... ]field or [ ... ]field?", requires: ["renameCity"] },
          { text: "The Republic of [ ... ] or The Republic of [ ... ]?", requires: ["renameCountry"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 22,
    category: "social",
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have your catchphrase be", type: "catchphrase" },
          { text: "have to loudly yell", type: "yell" }
        ]
      },
      {
        options: [
          { text: "\"Sweet mother of [ ... ]!\" or \"Sweet mother of [ ... ]!\"" },
          { text: "\"Holy [ ... ]!\" or \"Holy [ ... ]!\"" },
          { text: "\"By the power of [ ... ]!\" or \"By the power of [ ... ]!\"" },
          { text: "\"What in the [ ... ]?\" or \"What in the [ ... ]?\"" }
        ]
      },
      {
        options: [
          { text: "every time you enter a room?" },
          { text: "every time you sit down?" },
          { text: "every time you answer the phone?" },
          { text: "whenever you get surprised?" },
          { text: "whenever you sneeze?" },
          { text: "whenever you find yourself in an awkward situation?" }
        ]
      }
    ],
    hints: [
      PROMPTS.madeUpCompound, 
      PROMPTS.madeUpHyphenated, 
      PROMPTS.animalFunny, 
      PROMPTS.everyday, 
      PROMPTS.kitchenItem, 
      PROMPTS.snack
    ]
  },
  {
    id: 23,
    category: "naming",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "become the spiritual leader of", scene: "spiritual" },
          { text: "write a 1000-page manifesto about", type: "manifesto", scene: "fanfic" },
          { text: "strictly live by", scene: "report" },
          { text: "have your government adopt", scene: "ideology" },
          { text: "try to convince your parents to follow", scene: "report" },
          { text: "try to convince your friends to follow", scene: "report" },
          { text: "permanently ban", scene: "ban" },
          { text: "study the history of", type: "explain", scene: "fanfic" }
        ]
      },
      {
        options: [
          { text: "[ ... ]ism or [ ... ]ism?" }
        ]
      }
    ],
    hints: [
      PROMPTS.fastFood,
      PROMPTS.everyday,
      PROMPTS.actionChore,
      PROMPTS.annoyingHabit,
      PROMPTS.abstractMood,
      PROMPTS.personalInterest,
      PROMPTS.personalLike
    ]
  },
  {
    id: 24,
    category: "naming",
    canTriggerCombo: false,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "change your surname to", type: "own_name", hints: [PROMPTS.title, PROMPTS.app, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.letterM] },
          { text: "have a national holiday called The Day of", type: "holiday", hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.personalLike] },
          { text: "adopt a dog and name it", type: "dog", scene: "dog", hints: [PROMPTS.title, PROMPTS.politician, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "adopt a cat and name it", type: "cat", scene: "cat", hints: [PROMPTS.villain, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 101,
    isCombo: true,
    triggerCategory: ["animals", "survival", "social", "mind", "identity"],
    category: "combo",
    text: "Being chased by angry [PREV_CHOICE], would you rather have",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ] as your protector?", scene: "protector" }
        ]
      }
    ],
    hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical, PROMPTS.cartoonChar]
  },
  {
    id: 102,
    isCombo: true,
    triggerCategory: ["animals", "survival", "lifestyle", "social", "mind", "identity"],
    category: "combo",
    text: "If you were trapped in a room with angry [PREV_CHOICE], would you rather have",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ] by your side?", scene: "protector"}
        ]
      }
    ],
    hints: [PROMPTS.kitchenItem, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.actor, PROMPTS.profession]
  },
  {
    id: 103,
    isCombo: true,
    triggerCategory: ["career", "superpowers"],
    category: "combo",
    text: "To convince the boss that [PREV_CHOICE] is crucial for the company, would you rather present",
    fragments: [
      {
        options: [
          { text: "a 100-page report about [ ... ] or about [ ... ]?", scene: "report" }
        ]
      }
    ],
    hints: [PROMPTS.complicatedTopic, PROMPTS.annoyingHabit, PROMPTS.humanActivity]
  },
  {
    id: 104,
    isCombo: true,
    triggerCategory: ["naming_realm"], 
    category: "combo",
    text: "As the supreme leader of [PREV_CHOICE], would you rather adopt",
    fragments: [
      {
        options: [
          { text: "[ ... ]ism or [ ... ]ism as your state ideology?", scene: "ideology"  }
        ]
      }
    ],
    hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.company, PROMPTS.abstractMood]
  },
  {
    id: 105,
    isCombo: true,
    triggerCategory: ["naming_realm"], 
    category: "combo",
    text: "As the supreme leader of [PREV_CHOICE], would you rather establish a national holiday called",
    fragments: [
      {
        options: [
          { text: "The Day of [ ... ] or The Day of [ ... ]?" }
        ]
      }
    ],
    hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.app]
  },
  {
    id: 106,
    isCombo: true,
    triggerCategory: ["naming_realm"],
    category: "combo",
    text: "As the leader of [PREV_CHOICE], would you rather put",
    fragments: [
      {
        options: [
          { text: "a giant [ ... ] or a giant [ ... ] on your state flag?" },
          { text: "a picture of [ ... ] or [ ... ] on your national currency?", scene: "money" }
        ]
      }
    ],
    hints: [PROMPTS.animalFunny, PROMPTS.angryAnimal, PROMPTS.fastFood, PROMPTS.everyday, PROMPTS.survivalTool, PROMPTS.kitchenItem]
  },
  {
    id: 107,
    isCombo: true,
    triggerCategory: ["social", "identity", "animals"],
    category: "combo",
    text: "What is the most likely interaction between [PICKER] and [PREV_CHOICE]:",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ]?" }
        ]
      }
    ],
    hints: [PROMPTS.actionParty, PROMPTS.actionExtreme, PROMPTS.actionChore, PROMPTS.actionEmbarrassing, PROMPTS.actionWork]
  }
];