export const PROMPTS = {
  // Действия (для вопроса 14)
  actionWork: { 
    text: "Inappropriate action at work", 
    brainstorm: [
      "take a nap", 
      "leave early", 
      "ignore the boss", 
      "play games",
      "watch netflix",
      "sing in the breakroom",
      "steal coffee",
      "start a fight",
      "show up drunk",
      "scroll tiktok on phone",
      "cry in the toilet",
      "delete important database",
      "insult the main client",
      "wear pajamas to meeting",
      "fall asleep during presentation",
      "liquidate company assets"
    ] 
  },
  actionIllegal: { 
    text: "Minor illegal act", 
    brainstorm: [
      "pirate a movie", 
      "jaywalk", 
      "steal a pen", 
      "sneak into a concert",
      "shoplift a candy",
      "vandalize a wall",
      "speed in a school zone",
      "ride the train without a ticket",
      "use a fake name",
      "jerk the emergency brake",
      "bribe a parking guard",
      "steal wifi from neighbors",
      "forge a doctor note"
    ] 
  },
  personalLike: { 
    text: "Things you genuinely like", 
    brainstorm: [] 
  },
  personalInterest: { 
    text: "Topics you are deeply interested in", 
    brainstorm: [] 
  },
  personRespect: { 
    text: "People you highly respect", 
    brainstorm: [] 
  },
  letterM: { 
    text: "Words starting with the letter M", 
    brainstorm: [] 
  },
actionEmbarrassing: { 
    text: "Embarrassing action", 
    brainstorm: [
      "forget a name", 
      "snort while laughing", 
      "wave at a stranger",
      "reply wrong to a text",
      "have toilet paper on shoe",
      "forget to zip pants",
      "call teacher mom",
      "accidentally like an old post",
      "have spinach in teeth",
      "walk into a glass door",
      "forget your own password"
    ]
  },
  nickname: { 
    text: "Nickname", 
    brainstorm: ["Stinky", "Crybaby", "Pookie", "Snookums", "Goofball", "Peanut"] 
  },
  fantasyKingdom: { 
    text: "Fantasy kingdom", 
    brainstorm: ["Mordor", "Narnia", "Westeros", "Hogwarts", "Wakanda", "Asgard"] 
  },
  terriblePlace: { 
    text: "Terrible place to be", 
    brainstorm: ["Dentist office", "Traffic jam", "Public toilet", "Prison", "Tax office"] 
  },
  title: { 
    text: "Title", 
    brainstorm: ["Supreme Overlord", "Grand Poobah", "Chief Executive", "His Majesty", "The Great"] 
  },
  actionParty: { 
    text: "Weird party trick", 
    brainstorm: [
      // Стандартные/классические
      "swallow a sword", 
      "juggle apples", 
      "do a backflip", 
      "eat a glass",
      "hold breath for two minutes",
      "solve a rubiks cube blindfolded",
      "peel a banana with feet",
      "guess the secret ingredient in drink",
      "sing song backwards",
      "break a wooden board with head",
      "speak with two voices at once",
      "wobble eyeballs in different directions",
      "tie a cherry stem with tongue",
      "find a needle in a haystack"
    ] 
  },
actionChore: { 
    text: "Annoying daily chore", 
    brainstorm: [
      "wash the dishes", 
      "iron clothes", 
      "vacuum", 
      "take out the trash",
      "fold the laundry",
      "make the bed",
      "dust the shelves",
      "clean the toilet",
      "sort out the recycling bin",
      "change bed sheets",
      "unload the dishwasher",
      "wipe all the windows"
    ] 
  },
  actionRelax: { 
    text: "Relaxing activity", 
    brainstorm: [
      "sleep for 10 hours", 
      "take a hot bath", 
      "read a book", 
      "stare at the wall",
      "watch the sunset",
      "go for a walk",
      "meditate",
      "drink herbal tea",
      "do absolutely nothing",
      "lie on the beach",
      "watch clouds floating by",
      "take a bubble bath",
      "listen to ocean",
      "get a  massage",
      "breathe deeply",
      "watch rain hit the window",
      "paint a canvas"
    ] 
  },
actionExtreme: { 
    text: "Extreme sport action", 
    brainstorm: [
      "surf a huge wave", 
      "go skydiving",
      "ride a dirt bike",
      "climb a rock",
      "fly in a wingsuit",
      "do a backflip",
      "run an ultra marathon",
      "jump across two buildings",
      "skate down a massive hill"
    ] 
  },  actionAlone: { 
    text: "Something you do when alone", 
    brainstorm: [
      // Стандартные и короткие
      "sing loudly", 
      "talk to yourself", 
      "eat from the fridge",
      "binge watch cartoons",
      "search your own name online",
      "rehearse a fake argument",
      "dance in front of the mirror",
      "stare into the fridge for no reason"
    ] 
  },

  // Еда и напитки
fastFood: { 
    text: "Fast food", 
    brainstorm: [
      // Стандартные
      "burger", 
      "pizza", 
      "french fries", 
      "hot dog",
      "fried chicken",
      "taco",
      "burrito",
      "onion rings",
    ] 
  },
snack: { 
    text: "Snack food", 
    brainstorm: [
      // Короткие
      "skittles", 
      "doritos", 
      "cheetos", 
      "popcorn", 
      "pretzels", 
      "peanuts", 
      "cookies",
      "jerky",
    ] 
  },  sweetLiquid: { 
    text: "Sweet liquid", 
    brainstorm: [
      "honey", 
      "syrup", 
      "juice", 
      "soda", 
      "milk",
      "nectar",
      "maple syrup", 
      "melted chocolate", 
      "apple juice", 
      "orange juice",
      "grape soda",
      "condensed milk"
    ] 
  },
strongFood: { 
    text: "Strong-smelling food", 
    brainstorm: [
      "onion", 
      "garlic", 
      "fish", 
      "tuna",
      "kimchi",
      "curry",
      "blue cheese", 
      "pickled herring",
      "rotten eggs",
      "canned sardines",
      "durian fruit",
    ] 
  },  
  // Животные и существа
animalFunny: { 
    text: "Funny-looking animal", 
    brainstorm: [
      "sloth", 
      "pug", 
      "frog", 
      "llama", 
      "koala",
      "monkey",
      "platypus", 
      "capybara",
      "fruit bat",
      "emue"
    ] 
  },  animalFarm: { 
    text: "Farm animal", 
    brainstorm: [
      "cow", 
      "pig", 
      "horse", 
      "goat", 
      "sheep", 
      "duck", 
      "hen", 
      "bull",
      "ram",
      "chicken", 
      "rooster", 
      "donkey", 
      "mule", 
      "turkey"
    ] 
  },
fictionalChar: { 
    text: "Fictional character", 
    brainstorm: [
      "Shrek", 
      "Yoda", 
      "Goku", 
      "Link", 
      "Mario", 
      "Thor", 
      "Stitch",
      "Elmo",
      "Batman", 
      "Homer Simpson", 
      "Pikachu", 
      "SpongeBob", 
      "Darth Vader", 
      "Harry Potter", 
      "Sherlock Holmes", 
      "Mickey Mouse", 
      "Bugs Bunny", 
      "Iron Man", 
      "Peter Pan",
      "Wonder Woman",
      "Captain America"
    ] 
  }, 
  villain: { 
    text: "Horror movie villain", 
    brainstorm: [
      "Dracula", 
      "Pennywise", 
      "Chucky", 
      "Hannibal", 
      "Mummy", 
      "Alien",
      "Freddy Krueger", 
      "Michael Myers", 
      "Predator", 
      "Jigsaw"
    ] 
  },
  
  // Люди и роли

youtuber: { 
    text: "Famous YouTuber", 
    brainstorm: [
      "PewDiePie", 
      "MrBeast", 
      "Logan Paul", 
      "KSI", 
      "Ninja",
      "Hasan Piker",
      "Johnny Harris"
    ] 
  },

politician: { 
    text: "Famous politician", 
    brainstorm: [
      "Putin", 
      "Macron", 
      "Merkel", 
      "Stalin", 
      "Lenin", 
      "Nixon",
      "Donald Trump", 
      "Joe Biden", 
      "Boris Johnson", 
      "Kim Jong Un", 
      "Barack Obama", 
      "Winston Churchill", 
      "Nelson Mandela", 
      "Mahatma Gandhi", 
      "Abraham Lincoln", 
      "Benjamin Franklin", 
      "Queen Elizabeth",
      "Margaret Thatcher",
      "Kamala Harris"
    ] 
  },  historical: { 
    text: "Historical figure", 
    brainstorm: [
      "Nero", 
      "Plato", 
      "Dante", 
      "Galileo", 
      "Mozart", 

      "Abraham Lincoln", 
      "Cleopatra", 
      "Napoleon", 
      "Julius Caesar", 
      "Isaac Newton", 
      "Albert Einstein", 
      "Joan of Arc", 
      "Martin Luther King", 
      "Marco Polo", 
      "Alexander the Great", 
      "Genghis Khan",
      "Marie Curie"
    ] 
  },
  singer: { 
    text: "Famous singer", 
    brainstorm: [
      "Prince", 
      "Adele", 
      "Drake", 
      "Sia", 
      "Sting", 
      "Bowie",
      "Taylor Swift", 
      "Michael Jackson", 
      "Freddie Mercury", 
      "Beyoncé", 
      "Lady Gaga", 
      "Frank Sinatra", 
      "Elvis Presley", 
      "Whitney Houston", 
      "Billie Eilish", 
      "Justin Bieber", 
    ] 
  },
band: { 
    text: "Rock band", 
    brainstorm: [
      // Короткие
      "Queen", 
      "KISS", 
      "Muse", 
      "Blur", 
      "Nirvana", 
      "The Beatles", 
      "Metallica", 
      "Pink Floyd", 
      "Led Zeppelin", 
      "Rolling Stones", 
      "Red Hot Chili Peppers", 
      "Guns N' Roses", 
      "Arctic Monkeys", 
      "Linkin Park", 
      "Foo Fighters", 
      "Black Sabbath",
      "Radiohead"
    ] 
  },  
  actor: { 
    text: "Famous actor", 
    brainstorm: [
      "Brad Pitt", 
      "Tom Cruise", 
      "Jim Carrey", 
      "Tom Hanks", 
      "Vin Diesel", 
      "Will Smith",
      "Leonardo DiCaprio", 
      "Robert Downey Jr", 
      "Matthew McConaughey", 
      "Scarlett Johansson", 
      "Johnny Depp", 
      "Christian Bale", 
      "Morgan Freeman", 
      "Ryan Reynolds", 
      "Jennifer Lawrence", 
      "Samuel L Jackson", 
      "Joaquin Phoenix"
    ] 
  },
  annoyingHabit: { 
    text: "Annoying habit", 
    brainstorm: [
      "Smoking", 
      "Snoring", 
      "Clicking", 
      "Interrupting", 
      "Chewing",
      "Biting fingernails", 
      "Talking too loud", 
      "Checking phone constantly", 
      "Leaving lights on", 
      "Cracking knuckles", 
      "Arriving late", 
      "Playing loud music", 
      "Interrupting conversations", 
      "Leaving doors open", 
    ] 
  },
  profession: { 
    text: "Profession", 
    brainstorm: [
      "Chef", 
      "Pilot", 
      "Judge", 
      "Nurse", 
      "Artist",
      "Manager",
      "Software developer", 
      "Graphic designer", 
      "Engineer", 
      "Primary school teacher", 
      "Financial advisor", 
      "Professional athlete", 
      "Surgeon", 
      "Security guard", 
      "Construction worker", 
    ] 
  },
//takistetty tähän asti
  cartoonChar: { 
    text: "Cartoon character", 
    brainstorm: [
      "Popeye", 
      "Gumball", 
      "Scooby", 
      "Stewie",
      "Bugs Bunny", 
      "Mickey Mouse", 
      "Homer Simpson", 
      "SpongeBob SquarePants", 
      "Tom Cat", 
      "Jerry Mouse", 
      "Charlie Brown", 
      "Winnie the Pooh", 
      "Rick Sanchez"
    ] 
  },
  mediaPersonality: { 
    text: "Famous media personality", 
    brainstorm: [
      "Oprah Winfrey", 
      "Ellen DeGeneres", 
      "Conan O'Brien", 
      "Jimmy Fallon", 
      "Jimmy Kimmel",
      "Joe Rogan", 
      "Larry King", 
      "David Letterman", 
      "Gordon Ramsay", 
      "Tucker Carlson", 
      "Trevor Noah"
    ] 
  },
  // Вещи и объекты
everyday: { 
    text: "Everyday object", 
    isPlural: true, 
    brainstorm: [
      // Короткие
      "Keys", 
      "Cups", 
      "Pens", 
      "Books", 
      "Lamps", 
      "Bags", 
      "Socks",
      
      // Длинные и фразовые
      "Smartphones", 
      "Toasters", 
      "Fidget spinners", 
      "Vinyl records", 
      "Coffee mugs", 
      "Wrist watches", 
      "Sunglasses", 
      "Power banks", 
      "Backpacks", 
      "Headphones", 
      "Remote controls"
    ] 
  },  
  expensive: { 
    text: "Expensive item", 
    isPlural: true, 
    brainstorm: [
      // Короткие
      "Jets", 
      "Yachts", 
      "Gold", 
      "Diamonds", 
      "Mansions",
      
      // Длинные и фразовые
      "Sports cars", 
      "Designer bags", 
      "Fine art", 
      "Statues", 
      "Private islands", 
      "Luxury watches", 
      "Racing horses", 
      "Rare coins", 
      "Super yachts", 
      "Antique furniture", 
      "Diamond necklaces"
    ] 
  },
gadget: { 
    text: "Gadget", 
    brainstorm: [
      "iPad", 
      "iPod", 
      "Kindle", 
      "Walkman", 
      "Pager", 
      "Camera",
      "iPhone", 
      "Game Boy", 
      "Electric razor", 
      "Smart speaker", 
      "Wireless mouse", 
      "Gaming console", 
      "Polaroid", 
      "Computer"
    ] 
  },  
  smallObj: { 
    text: "Small object", 
    brainstorm: [
      // Короткие
      "Coins", 
      "Pins", 
      "Dice", 
      "Keys", 
      "Rings", 
      "Seeds",
      
      // Длинные и фразовые
      "Bottle caps", 
      "Paperclips", 
      "Buttons", 
      "Rubber bands", 
      "Thumb tacks", 
      "Earring studs", 
      "Coffee beans", 
      "Safety pins", 
      "Match sticks", 
      "Guitar picks", 
      "Memory cards"
    ] 
  },
  
  // Технологии и компании
  techOld: { 
    text: "Outdated technology", 
    brainstorm: [
      // Короткие
      "Pager", 
      "Modem", 
      "Cassette", 
      "Fax machines", 
      "Floppy disks", 
      "VHS tapes", 
      "Landline phones", 
      "Typewriters", 
      "CD players", 
      "Portable tape recorders"
    ] 
  },
company: { 
    text: "Famous company", 
    brainstorm: [
      // Короткие
      "Sony", 
      "Apple", 
      "Nokia", 
      "Yahoo", 
      "Tesla", 
      "SpaceX", 
      "Intel", 
      "Meta",
      
      // Длинные и фразовые
      "Blockbuster", 
      "Netflix", 
      "Google", 
      "Amazon", 
      "Microsoft", 
      "Samsung", 
      "Toyota", 
      "General Electric", 
      "Coca Cola Company"
    ] 
  },  app: { 
    text: "Modern app", 
    brainstorm: [
      // Короткие
      "Zoom", 
      "Uber", 
      "Slack", 
      "Tinder", 
      "Discord", 
      "Reddit", 
      "BeReal",
      
      // Длинные и фразовые
      "TikTok", 
      "Instagram", 
      "Google Maps", 
      "Spotify", 
      "YouTube", 
      "WhatsApp", 
      "Twitter", 
      "Apple Music", 
      "Netflix", 
      "Facebook", 
      "Snapchat"
    ] 
  },
  website: { 
    text: "Popular website", 
    brainstorm: [
      // Короткие
      "eBay", 
      "Bing", 
      "Twitch", 
      "Reddit", 
      "Tumblr", 
      "Github",
      
      // Длинные и фразовые
      "YouTube", 
      "Wikipedia", 
      "Amazon", 
      "Google", 
      "Facebook", 
      "Instagram", 
      "Pinterest", 
      "LinkedIn", 
      "Netflix", 
      "SoundCloud"
    ] 
  },
  videoGame: { 
    text: "Popular video game", 
    brainstorm: [
      // Короткие
      "Doom", 
      "Halo", 
      "Tetris", 
      "Portal", 
      "Skyrim",
      "Fortnite",
      
      // Длинные и фразовые
      "Grand Theft Auto", 
      "World of Warcraft", 
      "The Witcher", 
      "Red Dead Redemption", 
      "Super Mario Bros", 
      "Minecraft", 
      "Elden Ring", 
      "Call of Duty", 
      "Final Fantasy", 
      "League of Legends"
    ] 
  },
  boardGame: { 
    text: "Popular board game", 
    brainstorm: [
      // Короткие
      "Chess", 
      "Clue", 
      "Risk", 
      "Go", 
      "Checkers",
      
      // Длинные и фразовые
      "Monopoly", 
      "Catan", 
      "Scrabble", 
      "Ticket to Ride", 
      "Pandemic", 
      "Carcassonne", 
      "Dungeons and Dragons", 
      "Cards Against Humanity", 
      "Betrayal at House on the Hill", 
      "Twilight Imperium"
    ] 
  },
  sport: { 
    text: "Sport", 
    brainstorm: [
      // Короткие
      "Golf", 
      "Rugby", 
      "Tennis", 
      "Soccer", 
      "Boxing",
      
      // Длинные и фразовые
      "Basketball", 
      "Volleyball", 
      "Ice hockey", 
      "Table tennis", 
      "American football", 
      "Formula one", 
      "Rock climbing", 
      "Figure skating", 
      "Horse racing", 
      "Ultimate frisbee"
    ] 
  },
  mobileGame: { 
    text: "Popular mobile game", 
    brainstorm: [
      // Короткие
      "Alto", 
      "Snake", 
      "Plague", 
      "Threes", 
      "Monument",
      
      // Длинные и фразовые
      "Candy Crush Saga", 
      "Clash of Clans", 
      "Subway Surfers", 
      "Angry Birds", 
      "Temple Run", 
      "Among Us", 
      "Genshin Impact", 
      "Pokémon GO", 
      "PUBG Mobile", 
      "Plants vs Zombies"
    ] 
  },
  chore: { 
    text: "Household chore", 
    brainstorm: [
      // Короткие
      "Vacuuming", 
      "Ironing", 
      "Dusting", 
      "Mopping", 
      "Sweeping",
      
      // Длинные и фразовые
      "Washing dishes", 
      "Doing laundry", 
      "Making the bed", 
      "Walking the dog", 
      "Cleaning the toilet", 
      "Taking out the trash", 
      "Unloading the dishwasher", 
      "Cleaning the litter box", 
      "Changing bed sheets", 
      "Scrubbing the bathtub"
    ] 
  },
  instrument: { 
    text: "Musical instrument", 
    brainstorm: [
      // Короткие
      "Piano", 
      "Drum", 
      "Harp", 
      "Flute", 
      "Cello",
      
      // Длинные и фразовые
      "Acoustic guitar", 
      "Electric guitar", 
      "Grand piano", 
      "Violin", 
      "Saxophone", 
      "Trumpet", 
      "Clarinet", 
      "Trombone", 
      "Bass guitar", 
      "Synthesizer"
    ] 
  },
  creativeHobby: { 
    text: "Creative hobby", 
    brainstorm: [
      // Короткие
      "Drawing", 
      "Painting", 
      "Sewing", 
      "Writing", 
      "Knitting",
      
      // Длинные и фразовые
      "Digital photography", 
      "Graphic design", 
      "Playing guitar", 
      "Oil painting", 
      "Creative writing", 
      "Woodworking", 
      "Pottery making", 
      "Jewelry making", 
      "Song writing", 
      "Video editing"
    ] 
  },
  tvShow: { 
    text: "Popular TV show", 
    brainstorm: [
      // Короткие
      "Lost", 
      "Fargo", 
      "Friends", 
      "The Wire", 
      "Succession",
      
      // Длинные и фразовые
      "Breaking Bad", 
      "Game of Thrones", 
      "The Sopranos", 
      "Stranger Things", 
      "The Office", 
      "Better Call Saul", 
      "Black Mirror", 
      "Chernobyl", 
      "The Crown", 
      "House of the Dragon"
    ] 
  },
  humanActivity: { 
    text: "Basic human activity", 
    brainstorm: [
      // Короткие
      "Sleeping", 
      "Eating", 
      "Walking", 
      "Reading", 
      "Writing",
      
      // Длинные и фразовые
      "Brushing teeth", 
      "Drinking water", 
      "Taking a shower", 
      "Cooking dinner", 
      "Driving a car", 
      "Watching movies", 
      "Listening to music", 
      "Exercising daily", 
      "Talking with friends", 
      "Working on computer"
    ] 
  },
  conspiracyTheory: { 
    text: "Weird conspiracy theory", 
    brainstorm: [
      // Короткие
      "Flat Earth", 
      "Moon landing", 
      "Chemtrails", 
      "Area 51", 
      "Bigfoot",
      
      // Длинные и фразовые
      "Simulation theory", 
      "Reptilian elite", 
      "Hollow Earth", 
      "Birds are drones", 
      "Phantom time hypothesis", 
      "Mandela effect", 
      "New World Order", 
      "Underground alien base", 
      "Illuminati control", 
      "Lost continent of Atlantis"
    ] 
  },
  schoolSubject: { 
    text: "School subject", 
    brainstorm: [
      // Короткие
      "Math", 
      "Art", 
      "Music", 
      "History", 
      "Physics",
      
      // Длинные и фразовые
      "Computer science", 
      "Physical education", 
      "Foreign language", 
      "Social studies", 
      "Political science", 
      "Environmental science", 
      "English literature", 
      "Graphic design", 
      "Religious studies", 
      "Business economics"
    ] 
  },
  country: { 
    text: "Country", 
    brainstorm: [
      // Короткие
      "USA", 
      "Japan", 
      "Brazil", 
      "Egypt", 
      "Canada",
      
      // Длинные и фразовые
      "United Kingdom", 
      "South Korea", 
      "Saudi Arabia", 
      "New Zealand", 
      "South Africa", 
      "Czech Republic", 
      "United Arab Emirates", 
      "Dominican Republic", 
      "Costa Rica", 
      "Sri Lanka"
    ] 
  },
  complicatedTopic: { 
    text: "Complicated topic", 
    brainstorm: [
      // Короткие
      "Entropy", 
      "Inflation", 
      "Relativity", 
      "Philosophy", 
      "Genetics",
      
      // Длинные и фразовые
      "Quantum mechanics", 
      "Artificial intelligence", 
      "String theory", 
      "Macro economics", 
      "Climate change", 
      "Human consciousness", 
      "Global geopolitics", 
      "Organic chemistry", 
      "Nuclear fusion", 
      "Game theory"
    ] 
  },
  chubbyAnimal: { 
    text: "Chubby animal", 
    brainstorm: [
      "Seal", 
      "Panda", 
      "Hamster", 
      "Penguin", 
      "Bear",
      "Red panda", 
      "Guinea pig", 
      "Hippopotamus", 
      "Groundhog", 
      "Hedgehog"
    ] 
  },
  fastAnimal: { 
    text: "Fast animal", 
    brainstorm: [
      // Короткие
      "Lion", 
      "Hare", 
      "Hawk", 
      "Shark", 
      "Eagle",
      
      // Длинные и фразовые
      "Peregrine falcon", 
      "Cheetah", 
      "Sailfish", 
      "Black marlin", 
      "Pronghorn antelope", 
      "Springbok", 
      "Wildebeest", 
      "Quarter horse", 
      "Ostrich", 
      "Greyhound"
    ] 
  },
  angryAnimal: { 
    text: "Angry animal", 
    brainstorm: [
      // Короткие
      "Wasp", 
      "Bull", 
      "Badger", 
      "Boar", 
      "Snake",
      
      // Длинные и фразовые
      "Grizzly bear", 
      "Silverback gorilla", 
      "Cape buffalo", 
      "Honey badger", 
      "Hippopotamus", 
      "Wolverine", 
      "Rhinoceros", 
      "Angry goose", 
      "Chihuahua", 
      "Wild boar"
    ] 
  },
  loudAnimal: { 
    text: "Very loud animal", 
    brainstorm: [
      // Короткие
      "Lion", 
      "Wolf", 
      "Crow", 
      "Hyena", 
      "Geese",
      "Blue whale", 
      "Peacock", 
      "Donkey", 
      "Sea lion", 
      "Bullfrog"
    ] 
  },
  dangerousAnimal: { 
    text: "Dangerous animal", 
    brainstorm: [
      // Короткие
      "Lion", 
      "Shark", 
      "Cobra", 
      "Wolf", 
      "Bear",
      "Tiger",
      "Crocodile",
      "Black mamba", 
      "Box jellyfish", 
      "Komodo dragon", 
      "Poison dart frog", 
      "Hippopotamus", 
    ] 
  },
  insect: { 
    text: "Common insect", 
    brainstorm: [
      // Короткие
      "Ant", 
      "Bee", 
      "Fly", 
      "Wasp", 
      "Flea",
      
      // Длинные и фразовые
      "Honey bee", 
      "House fly", 
      "Dragonfly", 
      "Butterfly", 
      "Ladybug", 
      "Grasshopper", 
      "Cockroach", 
      "Mosquito", 
      "Bumblebee", 
      "Praying mantis"
    ] 
  },
  heavyAnimal: { 
    text: "Heavy animal", 
    brainstorm: [
      // Короткие
      "Cow", 
      "Bear", 
      "Bull", 
      "Seal", 
      "Horse",
      
      // Длинные и фразовые
      "Blue whale", 
      "African elephant", 
      "White rhinoceros", 
      "Hippopotamus", 
      "Walrus", 
      "Giraffe", 
      "Bison", 
      "Gaur", 
      "Southern elephant seal", 
      "Asian elephant"
    ] 
  },
  bitingAnimal: { 
    text: "Animal that bites", 
    brainstorm: [
      // Короткие
      "Dog", 
      "Cat", 
      "Ant", 
      "Wasp", 
      "Rat",
      
      // Длинные и фразовые
      "German shepherd", 
      "Snapping turtle", 
      "Black mamba", 
      "Komodo dragon", 
      "Fruit bat", 
      "Grizzly bear", 
      "Wild boar", 
      "Fire ant", 
      "Mosquito", 
      "Great white shark"
    ] 
  },
  nocturnalAnimal: { 
    text: "Nocturnal animal", 
    brainstorm: [
      // Короткие
      "Owl", 
      "Bat", 
      "Fox", 
      "Wolf", 
      "Mole",
      
      // Длинные и фразовые
      "Raccoon", 
      "Hedgehog", 
      "Flying squirrel", 
      "Badger", 
      "Opossum", 
      "Lemur", 
      "Aye-aye", 
      "Sugar glider", 
      "Fruit bat", 
      "Nightjar"
    ] 
  },
  wildAnimal: { 
    text: "Wild animal", 
    brainstorm: [
      // Короткие
      "Wolf", 
      "Bear", 
      "Lion", 
      "Deer", 
      "Fox",
      
      // Длинные и фразовые
      "Bengal tiger", 
      "African elephant", 
      "Grizzly bear", 
      "Red kangaroo", 
      "Snow leopard", 
      "Polar bear", 
      "Bald eagle", 
      "Grey wolf", 
      "Mountain gorilla", 
      "African lion"
    ] 
  },
  dogBreed: { 
    text: "Dog breed", 
    brainstorm: [
      // Короткие
      "Pug", 
      "Boxer", 
      "Husky", 
      "Beagle", 
      "Collie",
      "Poodle",
      "Akita",
      "Corgi",
      "Chow",
      "Vizsla",
      
      // Длинные и фразовые
      "German shepherd", 
      "Golden retriever", 
      "French bulldog", 
      "Border collie", 
      "Labrador retriever", 
      "Siberian husky", 
      "Great dane", 
      "Australian shepherd", 
      "Bernese mountain dog", 
      "Cavalier king charles spaniel",
      "Doberman pinscher",
      "Rottweiler",
      "Alaskan malamute",
      "Newfoundland",
      "Saint bernard"
    ] 
  },
  foreignLanguage: { 
    text: "Foreign language", 
    brainstorm: [
      // Короткие
      "French", 
      "German", 
      "Spanish", 
      "Italian", 
      "Arabic",
      
      // Длинные и фразовые
      "Mandarin chinese", 
      "Japanese", 
      "Portuguese", 
      "Russian", 
      "Korean", 
      "Hindi", 
      "Dutch", 
      "Turkish", 
      "Swedish", 
      "Vietnamese"
    ] 
  },
  professionalField: { 
    text: "Professional field", 
    brainstorm: [
      // Короткие
      "Medicine", 
      "Law", 
      "Engineering", 
      "Finance", 
      "Design",
      
      // Длинные и фразовые
      "Software development", 
      "Project management", 
      "Data science", 
      "Digital marketing", 
      "Business administration", 
      "Human resources", 
      "Environmental science", 
      "Graphic design", 
      "Artificial intelligence", 
      "Public relations"
    ] 
  },
  martialArt: { 
    text: "Martial art", 
    brainstorm: [
      // Короткие
      "Judo", 
      "Karate", 
      "Aikido", 
      "Kung fu", 
      "Sumo",
      
      // Длинные и фразовые
      "Brazilian jiu jitsu", 
      "Muay thai", 
      "Mixed martial arts", 
      "Taekwondo", 
      "Krav maga", 
      "Capoeira", 
      "Jeet kune do", 
      "Kendo", 
      "Hapkido", 
      "Wing chun",
      "Shorinji Kempo"
    ] 
  },
  superpower: { 
    text: "Superpower", 
    brainstorm: [
      // Короткие
      "Flight", 
      "Invisibility", 
      "Telepathy", 
      "Super strength", 
      "Regeneration",
      
      // Длинные и фразовые
      "Time manipulation", 
      "Telekinetic powers", 
      "Shape shifting", 
      "Super speed", 
      "Elemental control", 
      "Energy projection", 
      "Mind control", 
      "X-ray vision", 
      "Density control", 
      "Matter transmutation"
    ] 
  },
  professionalSkill: { 
    text: "Professional skill", 
    brainstorm: [
      // Короткие
      "Coding", 
      "Writing", 
      "Design", 
      "Selling", 
      "Analysis",
      
      // Длинные и фразовые
      "Project management", 
      "Data visualization", 
      "Public speaking", 
      "Strategic planning", 
      "Software development", 
      "Search engine optimization", 
      "Technical writing", 
      "Conflict resolution", 
      "Financial modeling", 
      "User interface design"
    ] 
  },
  smallTalkTopic: { 
    text: "Small talk topic", 
    brainstorm: [
      // Короткие
      "Weather", 
      "Travel", 
      "Hobbies", 
      "Movies", 
      "Music",
      
      // Длинные и фразовые
      "Weekend plans", 
      "Favorite local restaurants", 
      "Current technology trends", 
      "Recent books read", 
      "Work life balance", 
      "Holiday experiences", 
      "Fitness goals", 
      "Upcoming local events", 
      "Cooking experiments", 
      "Career growth"
    ] 
  },
  sauce: { 
    text: "Sauce", 
    brainstorm: [
      // Короткие
      "Pesto", 
      "Salsa", 
      "Gravy", 
      "Tahini", 
      "Hummus",
      
      // Длинные и фразовые
      "Tomato basil sauce", 
      "Creamy mushroom sauce", 
      "Spicy barbecue sauce", 
      "Teriyaki glaze", 
      "Garlic aioli", 
      "Honey mustard", 
      "Classic hollandaise", 
      "Buffalo hot sauce", 
      "Sweet chili sauce", 
      "Blue cheese dressing"
    ] 
  },
  stickyThing: { 
    text: "Sticky thing", 
    brainstorm: [
      // Короткие
      "Glue", 
      "Honey", 
      "Tape", 
      "Gum", 
      "Sap",
      
      // Длинные и фразовые
      "Double sided tape", 
      "Sticky note", 
      "Molasses", 
      "Maple syrup", 
      "Super glue", 
      "Chewing gum", 
      "Tree resin", 
      "Caramel sauce", 
      "Masking tape", 
      "Glue stick"
    ] 
  },
  hotDrink: { 
    text: "Hot drink", 
    brainstorm: [
      // Короткие
      "Tea", 
      "Coffee", 
      "Cocoa", 
      "Latte", 
      "Chai",
      
      // Длинные и фразовые
      "Hot chocolate", 
      "Herbal infusion", 
      "Earl grey tea", 
      "Green tea", 
      "Cappuccino", 
      "Espresso shot", 
      "Matcha latte", 
      "Peppermint tea", 
      "Flat white", 
      "Warm apple cider"
    ] 
  },
  popularDrink: { 
    text: "Popular drink", 
    brainstorm: [
      // Короткие
      "Water", 
      "Coffee", 
      "Tea", 
      "Beer", 
      "Soda",
      
      // Длинные и фразовые
      "Orange juice", 
      "Coca cola", 
      "Red wine", 
      "Iced tea", 
      "Lemonade", 
      "Hot chocolate", 
      "Apple juice", 
      "Craft beer", 
      "Energy drink", 
      "Sparkling water"
    ] 
  },
  kitchenItem: { 
    text: "Kitchen item", 
    isPlural: true,
    brainstorm: [
      // Короткие
      "Spoons", 
      "Plates", 
      "Blenders", 
      "Knives", 
      "Forks",
      
      // Длинные и фразовые
      "Cutting boards", 
      "Measuring cups", 
      "Frying pans", 
      "Mixing bowls", 
      "Coffee makers", 
      "Toaster ovens", 
      "Baking sheets", 
      "Wooden spoons", 
      "Dish racks", 
      "Food processors"
    ] 
  },
  bodyPart: { 
    text: "Body part", 
    brainstorm: [
      // Короткие
      "Head", 
      "Arm", 
      "Leg", 
      "Hand", 
      "Foot",
      
      // Длинные и фразовые
      "Index finger", 
      "Shoulder blade", 
      "Collar bone", 
      "Rib cage", 
      "Lower back", 
      "Ankle joint", 
      "Upper arm", 
      "Knee cap", 
      "Little toe", 
      "Forearm"
    ] 
  },
  householdItem: { 
    text: "Common household item", 
    brainstorm: [
      // Короткие
      "Toaster", 
      "Lamp", 
      "Sponge", 
      "Broom", 
      "Chair",
      
      // Длинные и фразовые
      "Vacuum cleaner", 
      "Coffee maker", 
      "Wall clock", 
      "Laundry basket", 
      "Cutting board", 
      "Remote control", 
      "Bed sheet", 
      "Shower curtain", 
      "Trash can", 
      "Washing machine"
    ] 
  },
  candyType: { 
    text: "Type of candy", 
    isPlural: true,
    brainstorm: [
      // Короткие
      "Gummy bears", 
      "Chocolate", 
      "Lollipop", 
      "Skittles", 
      "Marshmallow", 
      "Licorice ", 
      "Dark chocolate", 
      "Cotton candy"
    ] 
  },
  strongSpice: { 
    text: "Strong spice", 
    brainstorm: [
      // Короткие
      "Chili", 
      "Pepper", 
      "Clove", 
      "Ginger", 
      "Cumin",
      
      // Длинные и фразовые
      "Cayenne pepper", 
      "Black pepper", 
      "Ground cinnamon", 
      "Crushed red pepper", 
      "Hot paprika", 
      "Wasabi powder", 
      "Grated horseradish", 
      "Cardamom pod", 
      "Star anise", 
      "Curry powder"
    ] 
  },
  fruit: { 
    text: "Fruit", 
    brainstorm: [
      // Короткие
      "Apple", 
      "Pear", 
      "Peach", 
      "Plum", 
      "Grape",
      
      // Длинные и фразовые
      "Watermelon", 
      "Strawberry", 
      "Pineapple", 
      "Pomegranate", 
      "Grapefruit", 
      "Blueberry", 
      "Raspberry", 
      "Passion fruit", 
      "Kiwi fruit", 
      "Dragon fruit"
    ] 
  },
  clothingItem: { 
    text: "Common piece of clothing", 
    brainstorm: [
      "Shirt", 
      "Jeans", 
      "Skirt", 
      "Dress", 
      "Hat",
      "Winter jacket", 
      "Leather belt", 
      "Sweater", 
      "T-shirt",
      "Rain coat", 
    ] 
  },
  survivalTool: { 
    text: "Basic survival tool", 
    brainstorm: [
      // Короткие
      "Knife", 
      "Axe", 
      "Saw", 
      "Lighter", 
      "Rope",
      "Multi tool", 
      "First aid kit", 
      "Flashlight", 
      "Sleeping bag", 
      "Compass"
    ] 
  },
  movie: { 
    text: "Famous movie", 
    brainstorm: [
      "Titanic", 
      "Star Wars", 
      "The Matrix", 
      "Shrek", 
      "Harry Potter", 
      "Jurassic Park", 
      "Avatar", 
      "The Lord of the Rings",
      "The Avengers",
      "Spider-Man"
    ] 
  },
  movieGenre: { 
    text: "Movie genre", 
    brainstorm: [
      "Horror", 
      "Romantic Comedy", 
      "Sci-Fi", 
      "Musical", 
      "Western", 
      "Silent film", 
      "True crime",
      "Action",
      "Fantasy"
    ] 
  }
  ,
  artGenre: { 
    text: "Art genre", 
    brainstorm: [
      "Surrealism", 
      "Cyberpunk", 
      "Abstract expressionism", 
      "Gothic horror", 
      "High fantasy", 
      "True crime", 
      "Musical theater", 
      "Anime",
      "Steampunk"
    ] 
  },
  musicGenre: { 
    text: "Music genre", 
    brainstorm: [
      "Heavy metal", 
      "Classical", 
      "K-pop", 
      "Jazz", 
      "Country", 
      "Dubstep", 
      "Opera", 
      "Punk rock",
      "Techno"
    ] 
  },
  famousCity: { 
    text: "Famous city", 
    brainstorm: ["Tokyo", "New York", "Paris", "London", "Dubai"] 
  },
  specificLocation: { 
    text: "Specific location", 
    brainstorm: ["A nightclub", "A maternity ward", "A public toilet", "A bank vault", "A police station"] 
  },
  publicPlace: { 
    text: "Random public place", 
    brainstorm: ["A shopping mall", "A crowded elevator", "A busy intersection"] 
  },
  shape: {
    text: "shape / an object with a recognizable shape",
    brainstorm: ["Cube", "Triangle", "Peanut", "Balloon", "Lightbulb", "Pear", "Egg", "Brick", "Heart", "Diamond", "Cylinder", "Cone", "Donut", "Banana", "Pyramid", "Star", "Arrow", "Pill"]
  },
  abstractMood: {
    text: "Abstract feeling or concept",
    brainstorm: ["Joy", "Despair", "Confusion", "Apathy", "Panic", "Melancholy", "Euphoria", "Boredom", "Nostalgia"]
  },
  fantasyWorld: {
    text: "Fantasy world",
    brainstorm: ["Middle-earth", "Westeros", "Narnia", "Hogwarts", "Hyrule", "The Witcher universe", "Azeroth"]
  },
  sciFiWorld: {
    text: "Sci-Fi universe",
    brainstorm: ["Star Wars galaxy", "Cyberpunk Night City", "The Matrix", "Dune universe", "Star Trek universe", "Fallout wasteland"]
  },
  madeUpCompound: {
    text: "Made-up compound word",
    brainstorm: ["Thunderfluff", "Doomwaffle", "Slimebucket", "Laserpants", "Gigachad"]
  },
  madeUpHyphenated: {
    text: "Made-up hyphenated word",
    brainstorm: ["Bongo-bongo", "Wibbly-wobbly", "Dilly-dally", "Mumbo-jumbo", "Flim-flam"]
  },
};

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
      PROMPTS.singer, PROMPTS.youtuber, 
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
          { text: "enter a world championship for", type: "compete" },
          { text: "dedicate your entire future to", type: "future" },
          { text: "sacrifice all your free time to", type: "sacrifice" },
          { text: "spend all your weekends", type: "weekends" },
          { text: "be cursed to spend the rest of your life", type: "curse" }
        ]
      },
      {
        options: [
          // Фикс QA 22-24, 27-28: Привязываем подсказки строго к подходящим глаголам
          { text: "playing", requires: ["time", "compete", "sacrifice", "weekends", "curse"], hints: [PROMPTS.videoGame, PROMPTS.boardGame, PROMPTS.sport, PROMPTS.mobileGame, PROMPTS.instrument] },
          { text: "doing", requires: ["sacrifice", "weekends", "curse"], hints: [PROMPTS.annoyingHabit, PROMPTS.chore, PROMPTS.humanActivity, PROMPTS.creativeHobby] },
          { text: "mastering", requires: ["future", "sacrifice", "time", "weekends"], hints: [PROMPTS.professionalSkill, PROMPTS.creativeHobby, PROMPTS.instrument, PROMPTS.foreignLanguage] },
          { text: "watching", requires: ["time", "weekends", "curse"], hints: [PROMPTS.tvShow, PROMPTS.youtuber, PROMPTS.sport] },
          { text: "obsessively analyzing", requires: ["future", "curse", "time"], hints: [PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic, PROMPTS.historical, PROMPTS.country, PROMPTS.mediaPersonality, PROMPTS.personalInterest] },
          { text: "aggressively teaching people about", requires: ["curse", "future", "weekends"], hints: [PROMPTS.schoolSubject, PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" },
          { text: "[ ... ] or [ ... ], and if you win you get a million dollars, but if you lose, you pay a fine equal to half of your annual income?", requires: ["compete"] },
          { text: "[ ... ] or [ ... ], and if you win you get a million dollars, but if you lose, you pay a fine equal to a quarter of your annual income?", requires: ["compete"] }
        ]
      }
    ],
    hints: [] // Очищено, подсказки теперь выдаются на основе глагола
  },
{
    id: 3,
    category: "animals",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have a pet", type: "possession", hints: [PROMPTS.animalFarm, PROMPTS.dogBreed, PROMPTS.chubbyAnimal, PROMPTS.animalFunny] },
          { text: "be chased by a", type: "threat_run", hints: [PROMPTS.fastAnimal, PROMPTS.angryAnimal, PROMPTS.dangerousAnimal, PROMPTS.wildAnimal, PROMPTS.heavyAnimal] },
          // Фикс QA 13-18: Разделяем опасных животных и безобидных для сценариев с лесом и лифтом
          { text: "be trapped alone with a", type: "threat_close", hints: [PROMPTS.dangerousAnimal, PROMPTS.angryAnimal, PROMPTS.bitingAnimal, PROMPTS.loudAnimal] },
          { text: "have to play with a", type: "threat_close", hints: [PROMPTS.insect, PROMPTS.animalFunny, PROMPTS.dogBreed, PROMPTS.nocturnalAnimal] }
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
          { text: "instantly become a world-class expert in", type: "positive", hints: [PROMPTS.foreignLanguage, PROMPTS.martialArt, PROMPTS.creativeHobby, PROMPTS.instrument] }
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
          { text: "the first person you meet on the street?", requires: ["context"] },
          { text: "the hiring manager?", requires: ["context"] }, // Изменено
          { text: "your parents at dinner?", requires: ["context"] },
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
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have to brush your teeth with", type: "hygiene", hints: [PROMPTS.sauce, PROMPTS.stickyThing, PROMPTS.sweetLiquid, { text: "Strong-smelling food", brainstorm: ["onion", "garlic", "blue cheese", "rotten eggs"] }] },
          { text: "have to wash your clothes in", type: "hygiene", hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink, PROMPTS.popularDrink] },
          { text: "have to drink a full glass of", type: "utility", hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink] },
          { text: "fill your bed pillows with", type: "storage", hints: [PROMPTS.snack, PROMPTS.kitchenItem, PROMPTS.smallObj, PROMPTS.everyday, PROMPTS.candyType] }
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
          { text: "while a random stranger awkwardly stares at you?" },
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
          { text: "instantly sweat a puddle that", type: "sweat" },
          { text: "breathe out a cloud that", type: "breath" },
          { text: "produce saliva that", type: "saliva" },
          { text: "have a face that", type: "face" },
          { text: "have a head shape that", type: "head" } // Изменено
        ]
      },
      {
        options: [
          { text: "smells exactly like", requires: ["sweat", "breath"], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, { text: "Thing that smells bad", brainstorm: ["Garbage", "Skunk", "Rotten egg", "Mud"] }] },
          { text: "tastes exactly like", requires: ["sweat", "saliva"], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.snack] },
          { text: "strongly reminds people of the face of a", requires: ["face"], hints: [PROMPTS.animalFunny, PROMPTS.chubbyAnimal] }, // Изменено
          { text: "closely resembles a", requires: ["head"], hints: [PROMPTS.shape, PROMPTS.everyday, PROMPTS.smallObj] } // Добавлено
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
          { text: ", and it triggers every time you", type: "action" },
          { text: "", type: "none" }
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
          { text: ", arriving there with absolutely nothing but [ ... ] or [ ... ]?" },
          { text: ", with your only starting item being [ ... ] or [ ... ]?" },
          { text: ", starting off with nothing but [ ... ] or [ ... ] in your pockets?" }
        ]
      }
    ],
    hints: [
      PROMPTS.clothingItem, 
      PROMPTS.survivalTool, 
      { text: "Small pocket item", brainstorm: ["Keys", "Phone", "Wallet", "Chapstick"] }, 
      { text: "Hygiene product", isPlural: false, brainstorm: ["Soap", "Toothpaste", "Shampoo", "Deodorant"] }
    ]
  },
{
    id: 8,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "magically receive an endless supply of", type: "recurring", hints: [{ text: "Large item in a house", isPlural: true, brainstorm: ["Sofas", "Beds", "Fridges", "Tables"] }, { text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, { text: "Thing you wear on your head", isPlural: true, brainstorm: ["Hats", "Helmets", "Caps", "Headbands"] }, PROMPTS.candyType] },
          { text: "receive a random package every day containing", type: "recurring", hints: [{ text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "wake up every morning next to a new pile of", type: "recurring", hints: [{ text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, { text: "Thing that smells bad", brainstorm: ["Garbage", "Skunk", "Rotten egg", "Mud"] }, PROMPTS.strongFood] },
          { text: "get to use only", type: "one-time", hints: [PROMPTS.gadget, PROMPTS.app] }
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
          { text: "but it always emits a terrible, rotten smell?", requires: ["recurring"] },
          { text: "for the rest of your life?", requires: ["one-time"] },
          { text: "but you are forced to share it with a total stranger?" }, 
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
{
    id: 9,
    category: "social",
    text: "Would you rather",
    fragments: [
      {
        options: [
          // Фикс QA 25-26: Разделяем подсказки по логике действия (Adopted by oil / Sauce — невозможно)
          { text: "be adopted by a family of", type: "adopted", hints: [{ text: "Animal", isPlural: true, brainstorm: ["Wolves", "Monkeys", "Penguins", "Bears"] }, { text: "Type of rich person", isPlural: true, brainstorm: ["Billionaires", "Aristocrats", "Celebrities", "Royals"] }, { text: "Group of people", isPlural: true, brainstorm: ["Tourists", "Teenagers", "Politicians", "Clowns"] }] },
          { text: "be fully accepted into a secret society of", type: "society", hints: [{ text: "Type of rich person", isPlural: true, brainstorm: ["Billionaires", "Aristocrats", "Celebrities", "Royals"] }, { text: "Group of people", isPlural: true, brainstorm: ["Tourists", "Teenagers", "Politicians", "Clowns"] }] }, 
          { text: "be raised from birth by a pack of", type: "raised", hints: [{ text: "Animal", isPlural: true, brainstorm: ["Wolves", "Monkeys", "Penguins", "Bears"] }, { text: "Angry-looking animal", isPlural: true, brainstorm: ["Rhinos", "Bulls", "Eagles", "Hippos"] }, { text: "Pet", isPlural: true, brainstorm: ["Dogs", "Cats", "Parrots", "Hamsters"] }] },
          { text: "be fully accepted into a magic school where the only spell you learn is how to summon", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the magic power to turn gold into", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.snack, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the magic power to turn water into", type: "society", hints: [PROMPTS.sweetLiquid, PROMPTS.sauce, PROMPTS.hotDrink] },
          { text: "have the magic power to turn dirt into", type: "society", hints: [PROMPTS.expensive, { text: "Valuable resource", brainstorm: ["Gold", "Silver", "Diamonds", "Oil"] }, PROMPTS.fastFood, PROMPTS.candyType] }
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
    text: "Would you rather",
    fragments: [
      {
        options: [
          // Фикс QA 19-21: Движения не могут основываться на канцелярских скрепках, а бизнес на теориях заговора
          { text: "start a successful business that only sells", type: "business", hints: [{ text: "Cheap item", isPlural: true, brainstorm: ["Paperclips", "Rubber bands", "Pencils", "Matches"] }, PROMPTS.expensive, PROMPTS.techOld, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "found a popular new cult based entirely on the use of", type: "cult", hints: [PROMPTS.everyday, PROMPTS.techOld, { text: "Thing you find in a bathroom", brainstorm: ["Soap", "Shampoo", "Toothpaste", "Toilet paper"] }, { text: "Random thing in your room", isPlural: true, brainstorm: ["Books", "Cables", "Pillows", "Cups"] }] },
          { text: "start a massive social movement focused on", type: "movement", hints: [PROMPTS.conspiracyTheory, { text: "Minor inconvenience", isPlural: true, brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] }, PROMPTS.annoyingHabit] },
          { text: "open a fancy restaurant where everything tastes like", type: "restaurant", hints: [PROMPTS.strongFood, { text: "Disease", isPlural: true, brainstorm: ["Flus", "Colds", "Headaches", "Allergies"] }] },
          { text: "host a daily podcast that obsessively discusses", type: "podcast", hints: [PROMPTS.conspiracyTheory, PROMPTS.humanActivity, { text: "Minor inconvenience", isPlural: true, brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] }, PROMPTS.personalInterest] },
          { text: "run a massive YouTube channel dedicated to", type: "podcast", hints: [PROMPTS.conspiracyTheory, PROMPTS.humanActivity, PROMPTS.annoyingHabit] },
          { text: "become the CEO of a company that produces", type: "business", hints: [{ text: "Cheap household item", isPlural: true, brainstorm: ["Sponges", "Toilet paper", "Lightbulbs", "Batteries"] }, { text: "Office supply", isPlural: true, brainstorm: ["Staplers", "Pens", "Sticky notes", "Folders"] }, PROMPTS.techOld] },
          { text: "form a popular musical band where all instruments are replaced by", type: "band", hints: [{ text: "Tool", isPlural: true, brainstorm: ["Hammers", "Saws", "Drills", "Wrenches"] }, { text: "Office supply", isPlural: true, brainstorm: ["Staplers", "Pens", "Sticky notes", "Folders"] }, { text: "Cheap item", isPlural: true, brainstorm: ["Paperclips", "Rubber bands", "Pencils", "Matches"] }] },
          { text: "start a feared criminal gang that exclusively steals", type: "gang", hints: [PROMPTS.everyday, PROMPTS.smallObj, { text: "Cheap household item", isPlural: true, brainstorm: ["Sponges", "Toilet paper", "Lightbulbs", "Batteries"] }] }
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
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
{
    id: 11,
    category: "time_travel",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "travel into the past", type: "past" },
          { text: "travel about 100 years into the future", type: "future" }
        ]
      },
      {
        options: [
          { text: "and warn people about the terrible future of", requires: ["past"], type: "change", hints: [PROMPTS.company, { text: "Modern technology", brainstorm: ["Social media", "Smartphones", "Artificial Intelligence"] }, PROMPTS.app, PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic] },
          { text: "and destroy the original prototype of", requires: ["past"], type: "change_done", hints: [PROMPTS.gadget, { text: "Modern technology", brainstorm: ["Social media", "Smartphones", "Artificial Intelligence"] }, PROMPTS.videoGame, PROMPTS.app] },
          { text: "and invest all your savings into", requires: ["past"], type: "change_done", hints: [PROMPTS.company, PROMPTS.app] },
          { text: "and secretly invent and take credit for", requires: ["past"], type: "change", hints: [PROMPTS.gadget, PROMPTS.app, PROMPTS.videoGame, { text: "Popular toy or game", brainstorm: ["Tamagotchi", "Rubik's Cube", "Furby", "Tetris"] }] },
          
          { text: "and discover that future humans worship", requires: ["future"], type: "worship", hints: [PROMPTS.youtuber, PROMPTS.mediaPersonality, PROMPTS.cartoonChar, PROMPTS.fictionalChar, PROMPTS.company] },
          { text: "and discover that future humans completely stopped using", requires: ["future"], type: "future_stop", hints: [PROMPTS.everyday, { text: "Household item", brainstorm: ["Toaster", "Toilet", "Sofa", "Refrigerator"] }, PROMPTS.gadget, { text: "Modern convenience", brainstorm: ["Smartphones", "Wi-Fi", "Toilets", "Beds"] }] },
          { text: "and discover that future humans still unironically use", requires: ["future"], type: "future_still", hints: [PROMPTS.techOld, { text: "Old school trend", brainstorm: ["Fidget spinners", "Tamagotchis", "Yo-yos", "Pogs"] }, PROMPTS.conspiracyTheory] }
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
    id: 12,
    category: "superpowers",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have the superpower to turn any object into", type: "transform", hints: [{ text: "Food item", brainstorm: ["Pizza", "Cheese", "Cake", "Chocolate"] }, { text: "Office supply", brainstorm: ["Stapler", "Paperclip", "Sticky note", "Pen"] }, PROMPTS.animalFunny, { text: "Fragile object", brainstorm: ["Raw egg", "Glass cup", "Flower", "Paper cup"] }] },
          { text: "have the superpower to instantly turn yourself into", type: "shapeshift", hints: [PROMPTS.animalFunny, { text: "Exotic animal", brainstorm: ["Panda", "Koala", "Iguana", "Toucan"] }, { text: "Inanimate object", brainstorm: ["Chair", "Lamp", "Car", "Tree"] }] },
          { text: "be able to teleport anywhere, but you always arrive covered in", type: "teleport", hints: [{ text: "Sticky substance", brainstorm: ["Honey", "Mud", "Slime", "Glue"] }, { text: "Sauce", brainstorm: ["Ketchup", "Mayonnaise", "Mustard", "Soy sauce"] }, { text: "Chemical", brainstorm: ["Gasoline", "Bleach", "Chlorine", "Vinegar"] }, PROMPTS.strongFood] },
          { text: "become completely invisible while holding", type: "invisible", hints: [{ text: "Office supply", brainstorm: ["Stapler", "Paperclip", "Sticky note", "Pen"] }, { text: "Fragile object", brainstorm: ["Raw egg", "Glass cup", "Flower", "Paper cup"] }, { text: "Food item", brainstorm: ["Pizza", "Cheese", "Cake", "Chocolate"] }] },
          { text: "have super strength, but only while singing songs about", type: "strength", hints: [{ text: "Boring topic", brainstorm: ["Taxes", "Weather", "Traffic", "Math"] }, PROMPTS.schoolSubject, { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] }] },
          { text: "have super strength, but only while singing songs by", type: "strength", hints: [PROMPTS.singer, PROMPTS.band] },
          { text: "be able to fly, but you constantly emit the smell of", type: "fly", hints: [{ text: "Sauce", brainstorm: ["Ketchup", "Mayonnaise", "Mustard", "Soy sauce"] }, PROMPTS.strongFood, { text: "Chemical", brainstorm: ["Gasoline", "Bleach", "Chlorine", "Vinegar"] }, { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] }] },
          { text: "gain the ability to read minds, but you can only hear people's thoughts about", type: "mind", hints: [{ text: "Boring topic", brainstorm: ["Taxes", "Weather", "Traffic", "Math"] }, PROMPTS.fastFood, { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] }] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "whenever you sneeze?", requires: ["shapeshift"] },
          { text: "but suddenly everyone you know knows it?", requires: ["teleport", "shapeshift"] },
          { text: "but you can't control exactly when it happens?", requires: ["mind", "shapeshift"] },
          { text: "but the effect only lasts for 60 seconds a day?", requires: ["transform", "invisible", "strength"] }, 
          { text: ", but you have to yell out what you're doing first?" },
          { text: "?" },
          { text: "?" } 
        ]
      }
    ],
    hints: []
  },
{
    id: 13,
    category: "lifestyle",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "be forced to wear a costume of", type: "costume_full", hints: [PROMPTS.animalFunny, { text: "Food item", brainstorm: ["Hot dog", "Banana", "Taco", "Pizza"] }, { text: "Weird profession", brainstorm: ["Clown", "Mime", "Pirate", "Astronaut"] }, PROMPTS.fictionalChar, PROMPTS.cartoonChar] },
          { text: "have to wear a mask of", type: "costume_mask", hints: [PROMPTS.politician, PROMPTS.villain, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: "have to physically carry a life-sized statue of", type: "carry_statue", hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: "be forced to dress exactly like", type: "dress_like", hints: [PROMPTS.villain, { text: "Weird profession", brainstorm: ["Clown", "Mime", "Pirate", "Astronaut"] }, PROMPTS.cartoonChar] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "to every job interview you ever go to?", requires: ["costume_full", "dress_like"] },
          { text: "every time you fly on an airplane?", requires: ["costume_full", "carry_statue"] },
          { text: "every time you use public transport?", requires: ["costume_full", "carry_statue"] },
          { text: "every time you use public toilet?", requires: ["costume_full", "carry_statue"] },
          { text: "in all your official ID and passport photos?", requires: ["costume_mask"] },
          { text: "every time you talk to a police officer?", requires: ["costume_mask", "dress_like"] },
          { text: "every time you talk to a government official?", requires: ["costume_mask", "dress_like"] },
          { text: "every time you go grocery shopping?", requires: ["carry_statue"] },
          { text: "through airport security every single time?", requires: ["carry_statue"] },
          { text: "to every family gathering?", requires: ["costume_full", "dress_like", "carry_statue", "costume_mask"] },
          { text: "and pretend you don't understand why people are staring?", requires: ["costume_full", "carry_statue", "dress_like"] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 14,
    category: "superpowers",
    text: "Would you rather have the magical ability to instantly",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "without anyone ever knowing?" },
          { text: ", but you have to yell out what you're doing first?" },
          { text: ", but it only works when no one is looking at you?" },
          { text: ", but doing it makes you incredibly tired?" },
          { text: ", but you instantly forget everything that happened while you were using it?" },
          { text: ", but it only works for a year?" }
        ]
      }
    ],
    hints: [
      PROMPTS.actionParty, PROMPTS.actionExtreme
    ]
  },
{
    id: 15,
    category: "mind",
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
          { text: ", but you also inherit all of their deepest fears?" },
          { text: ", but you completely forget your own childhood?" },
          { text: ", but you start looking exactly like them when you get angry?" },
          { text: "?" }
        ]
      }
    ],
    // Фикс QA 10: Убраны абстрактные/сбивающие с толку категории вроде "Cult leader" и "Tech billionaire"
hints: [
      PROMPTS.historical, PROMPTS.singer, PROMPTS.actor, PROMPTS.politician, PROMPTS.personRespect
    ]
  },

{
    id: 16,
    category: "identity",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "switch bodies with", type: "switch", hints: [PROMPTS.youtuber, { text: "Someone with a difficult job", brainstorm: ["Coal miner", "Surgeon", "President", "Deep sea diver"] }, PROMPTS.mediaPersonality, PROMPTS.profession] }
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
          { text: "for one random day every month?" }, // Изменено
          { text: "for exactly one year, and then return to normal?" }
        ]
      }
    ],
    hints: []
  },
{
  "id": 17,
  "category": "entertainment",
  "text": "Would you rather",
  "fragments": [
    {
      "options": [
        // Активные действия
        { "text": "watch a terrible, low-budget 4-hour remake of", "type": "watch", "hints": [PROMPTS.movie, PROMPTS.tvShow] },
        { "text": "spend an entire weekend deeply analyzing", "type": "analyze", "hints": [PROMPTS.movie, PROMPTS.tvShow] },
        { "text": "destroy every existing copy of", "type": "destroy", "hints": [PROMPTS.movie, PROMPTS.tvShow] },
        { "text": "create an extremely awkward fan-film based on", "type": "create", "hints": [PROMPTS.movie, PROMPTS.videoGame] },
       
        // Потребление контента
        { "text": "binge-watch every single episode of", "type": "watch", "hints": [PROMPTS.tvShow, PROMPTS.movie] },
        { "text": "consume media exclusively from the genre of", "type": "consume_genre", "hints": [PROMPTS.artGenre, PROMPTS.movieGenre] },
       
        // Образование и манифесты
        { "text": "teach a mandatory 4-hour college course on the history of", "type": "teach", "hints": [PROMPTS.musicGenre, PROMPTS.artGenre] },
        { "text": "pass a global law permanently banning", "type": "ban", "hints": [PROMPTS.musicGenre, PROMPTS.movieGenre] },
        { "text": "create a 1000-page manifesto aggressively defending", "type": "defend", "hints": [PROMPTS.movieGenre, PROMPTS.conspiracyTheory] }
      ]
    },
    {
      "options": [
        { "text": "[ ... ] or [ ... ]" }
      ]
    },
    {
      "options": [
        // Контекст для "создания" (create)
        { "text": "and show it to your family", "requires": ["create"], "type": "create_family" },
        { "text": "and show it to your colleagues", "requires": ["create"], "type": "create_colleagues" },
        { "text": "and show it to your friends", "requires": ["create"], "type": "create_friends" },
        { "text": "and show it to your boss", "requires": ["create"], "type": "create_boss" },

        // Контекст для "смотра/анализа" (watch/analyze)
        { "text": "with your family", "requires": ["watch"], "type": "watch_family" },
        { "text": "surrounded by colleagues", "requires": ["watch"], "type": "watch_colleagues" },
        { "text": "alongside your friends", "requires": ["watch"], "type": "watch_friends" },
        { "text": "alongside your boss", "requires": ["watch", "teach"], "type": "watch_boss" },
        { "text": "alongside your mom", "requires": ["watch", "teach"], "type": "watch_mom" },
        { "text": "", "requires": ["watch", "teach"], "type": "watch_none" },
       
        // Контекст для "уничтожения/манифестов" (destroy/ban/defend)
        { "text": "and no one will ever know about your role in this", "requires": ["destroy", "ban"], "type": "secret_action" },
        { "text": "and everyone will find out about it right away", "requires": ["destroy", "ban", "defend"], "type": "public_action" },
        { "text": "alone in your room", "requires": ["analyze", "defend"], "type": "alone_action" },
        { "text": "on a live television broadcast", "requires": ["teach"], "type": "live_broadcast" },
        
        // Разделенные пустые строки для точечной логики концовок
        { "text": "", "requires": ["consume_genre"], "type": "consume_none" },
        { "text": "", "requires": ["destroy", "ban", "defend", "analyze"], "type": "silent_none" }
      ]
    },
    {
      "options": [
        // Длинные концовки
        { "text": ", and pause every few minutes to explain the deep meaning?", "requires": ["watch_family", "watch_friends"] },
        { "text": ", and nervously wait for honest critique when you finish?", "requires": ["create_family", "create_colleagues", "create_friends", "create_boss", "watch_boss", "watch_mom"] },
        
        // Убрали "live_broadcast" из условий. Теперь стримить в интернет можно только то, что создано, или домашний просмотр
        { "text": ", livestreaming it to thousands?", "requires": ["create_boss", "watch_none"] },
        { "text": ", and cry afterwards?", "requires": ["watch_family", "watch_friends", "watch_mom", "watch_none"] },
        { "text": ", and cry everytime you are done?", "requires": ["consume_none"] },
       
        // КОРОТКИЕ концовки (Знак вопроса)
        { "text": "?", "requires": ["create_family", "create_colleagues", "create_friends", "create_boss", "watch_family", "watch_colleagues", "watch_friends", "watch_boss", "watch_mom", "watch_none", "secret_action", "public_action", "alone_action", "live_broadcast", "consume_none", "silent_none"] },
        { "text": "?", "requires": ["create_family", "create_colleagues", "create_friends", "create_boss", "watch_family", "watch_colleagues", "watch_friends", "watch_boss", "watch_mom", "watch_none", "secret_action", "public_action", "alone_action", "live_broadcast", "consume_none", "silent_none"] },
        { "text": "?", "requires": ["create_family", "create_colleagues", "create_friends", "create_boss", "watch_family", "watch_colleagues", "watch_friends", "watch_boss", "watch_mom", "watch_none", "secret_action", "public_action", "alone_action", "live_broadcast", "consume_none", "silent_none"] }
      ]
    }
  ],
  "hints": []
},
{
    id: 18,
    category: "adventure",
    text: "Would you rather",
    fragments: [
{
        options: [
          { text: "be randomly teleported to", type: "location", hints: [PROMPTS.country, PROMPTS.famousCity] },
          { text: "instantly teleport inside the private home of", type: "person", hints: [PROMPTS.actor, PROMPTS.singer, PROMPTS.politician, PROMPTS.historical, PROMPTS.youtuber] },
          { text: "be permanently transported into the fictional universe of", type: "universe", hints: [PROMPTS.fantasyWorld, PROMPTS.sciFiWorld, PROMPTS.videoGame, PROMPTS.cartoonChar] }, // Изменено
          { text: "be magically teleported into", type: "place", hints: [PROMPTS.specificLocation, PROMPTS.publicPlace] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "and stay there for exactly 24 hours before teleporting right back", type: "time_24h", requires: ["location", "person", "place"] },
          { text: "and stay there for the rest of your life", type: "time_life", requires: ["location", "place"] },
          { text: "and stay there for the rest of your life", type: "time_life_person", requires: ["person"] },
          { text: "for the rest of your life", type: "time_universe", requires: ["universe"] }
        ]
      },
      {
        options: [
          { text: ", but in return gain the ability to fly?", requires: ["time_life", "time_universe"] },
          { text: ", but in return gain the ability to read minds?", requires: ["time_life", "time_universe"] },
          { text: ", but in return, you'll gain knowledge and techniques of every martial art that has ever existed?", requires: ["time_life", "time_universe"] },
          { text: ", but in return, you'll gain the ability to see through walls?", requires: ["time_life", "time_universe"] },
          
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
  {
    id: 19,
    category: "identity",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have everyone genuinely believe you are the exact same age as", type: "age", hints: [PROMPTS.politician, PROMPTS.youtuber] },
          { text: "have everyone constantly insist that you look exactly like", type: "look", hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.animalFunny, PROMPTS.cartoonChar] },
          { text: "have society treat you strictly like", type: "status", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.profession, PROMPTS.fictionalChar] },
          { text: "have your physical appearance randomly morph into", type: "morph", hints: [PROMPTS.fictionalChar, PROMPTS.chubbyAnimal, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "even though your actual appearance hasn't changed at all", requires: ["age", "status"], type: "no_change" },
          { text: "every time you are trying to be serious", requires: ["look", "morph", "status"], type: "serious" },
          { text: "for the next 10 years", type: "duration" },
          { text: "", type: "none" }
        ]
      },
      {
        options: [
          { text: ", and you can never convince anyone otherwise?", requires: ["age", "look", "status"] },
          { text: "?" }
        ]
      }
    ],
    hints: []
  },
{
    id: 20,
    category: "social",
    text: "Would you rather have",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ]" }
        ]
      },
      {
        options: [
          { text: "as your ruthless boss?", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.youtuber, PROMPTS.actor, PROMPTS.personRespect] },
          { text: "as your loyal best friend?", hints: [PROMPTS.cartoonChar, PROMPTS.chubbyAnimal, PROMPTS.dogBreed, PROMPTS.fictionalChar] },
          { text: "as your sworn enemy?", hints: [PROMPTS.villain, PROMPTS.historical, PROMPTS.youtuber, PROMPTS.mediaPersonality] },
          { text: "as your personal therapist?", hints: [PROMPTS.historical, PROMPTS.actor, PROMPTS.singer, PROMPTS.mediaPersonality, PROMPTS.personRespect] },
          { text: "as your martial art sparring partner?", hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.youtuber, PROMPTS.historical] },
          { text: "as your cleaner?", hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.villain, PROMPTS.youtuber] },
          { text: "as your personal fitness trainer?", hints: [PROMPTS.actor, PROMPTS.fastAnimal, PROMPTS.villain, PROMPTS.singer] },
          { text: "as your obedient subordinate?", hints: [PROMPTS.politician, PROMPTS.villain, PROMPTS.historical, PROMPTS.actor] },
          { text: "as your butler?", hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.fictionalChar] },
          { text: "as your nanny?", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor, PROMPTS.cartoonChar] },
          { text: "as your math teacher?", hints: [PROMPTS.youtuber, PROMPTS.historical, PROMPTS.villain, PROMPTS.singer] },
          { text: "as your art teacher?", hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.heavyAnimal] },
          { text: "as your dance teacher?", hints: [PROMPTS.politician, PROMPTS.heavyAnimal, PROMPTS.villain, PROMPTS.cartoonChar] },
          { text: "as your yoga teacher?", hints: [PROMPTS.villain, PROMPTS.dangerousAnimal, PROMPTS.politician, PROMPTS.actor] },
          { text: "as your uber driver?", hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.chubbyAnimal, PROMPTS.singer] }
        ]
      }
    ],
    hints: []
  },
{
    id: 21,
    category: "naming",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "have every second newborn baby in the world legally named", type: "newborn", hints: [PROMPTS.nickname, PROMPTS.title, PROMPTS.villain, PROMPTS.snack, PROMPTS.animalFunny, PROMPTS.personRespect, PROMPTS.letterM] },
          { text: "have the country you live in renamed to", type: "country", hints: [PROMPTS.fantasyKingdom, PROMPTS.terriblePlace, PROMPTS.company, PROMPTS.chubbyAnimal, PROMPTS.everyday, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.letterM] },
          { text: "have the city you live in renamed to", type: "city", hints: [PROMPTS.fantasyKingdom, PROMPTS.terriblePlace, PROMPTS.snack, PROMPTS.everyday, PROMPTS.company, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.letterM] },
          { text: "have your own legal name permanently changed to", type: "own_name", hints: [PROMPTS.nickname, PROMPTS.title, PROMPTS.app, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.personRespect, PROMPTS.letterM] },
          { text: "have everyone with the most common name in your country change it to", type: "common_name", hints: [PROMPTS.nickname, PROMPTS.animalFunny, PROMPTS.techOld, PROMPTS.snack, PROMPTS.everyday, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "have a national public holiday created in your honor called The Day of", type: "holiday", hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.personRespect, PROMPTS.personalLike] },
          { text: "have to adopt a dog and legally name it", type: "dog", hints: [PROMPTS.title, PROMPTS.politician, PROMPTS.company, PROMPTS.app, PROMPTS.techOld, PROMPTS.personRespect, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "have to adopt a cat and legally name it", type: "cat", hints: [PROMPTS.terriblePlace, PROMPTS.villain, PROMPTS.company, PROMPTS.app, PROMPTS.techOld, PROMPTS.personRespect, PROMPTS.personalLike, PROMPTS.letterM] }
        ]
      },
{
        options: [
          { text: "[ ... ] or [ ... ]?" },
          { text: "[ ... ]land or [ ... ]land?", requires: ["country", "city"] },
          { text: "[ ... ]ville or [ ... ]ville?", requires: ["city"] },
          { text: "[ ... ]field or [ ... ]field?", requires: ["city"] },
          { text: "The Republic of [ ... ] or The Republic of [ ... ]?", requires: ["country"] },
          { text: "New [ ... ] or New [ ... ]?", requires: ["country", "city"] }
        ]
      }
    ],
    hints: []
  },
{
    id: 22,
    category: "social",
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
          { text: "whenever you find yourself in an awkward situation?" },
          { text: "?" }
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
          { text: "become the supreme leader of a new global ideology called" },
          { text: "write a 1000-page manifesto explaining the core principles of" },
          { text: "from now on, live exclusively by the principles of" },
          { text: "have your country's government officially adopt the ideology of" },
          { text: "have your parents strictly adopt the ideology of" },
          { text: "have your entire friend group adopt the ideology of" },
          { text: "permanently ban the dangerous ideology of" },
          { text: "build the bright future of the world strictly on the ideology of" },
          { text: "be forced to study the complex history of" }
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
      PROMPTS.animalFunny,
      PROMPTS.everyday,
      PROMPTS.techOld,
      PROMPTS.actor,
      PROMPTS.chore,
      PROMPTS.annoyingHabit,
      PROMPTS.company,
      PROMPTS.abstractMood,
      PROMPTS.personalInterest,
      PROMPTS.personRespect,
      PROMPTS.letterM,
      PROMPTS.personalLike
    ]
  }
];
