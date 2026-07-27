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
      "Monopoly", 
      "Uno", 
      "Chess", 
      "Twister", 
      "Jenga", 
      "Scrabble",
      "Catan"
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
    text: "Conspiracy theory", 
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
      "Cryptocurrency", 
      "Taxes", 
      "Artificial intelligence", 
      "Astrology", 
      "Quantum physics", 
      "The Matrix",
      "NFTs"
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
      "Grizzly", 
      "Silverback gorilla", 
      "Cape buffalo", 
      "Honey badger", 
      "Hippopotamus", 
      "Wolverine", 
      "Rhinoceros", 
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
          { text: "enter a championship for", type: "compete" },
          { text: "dedicate your entire future to", type: "future" },
          { text: "sacrifice all your free time to", type: "sacrifice" },
          { text: "spend all your weekends", type: "weekends" },
        ]
      },
      {
        options: [
          { text: "playing", requires: ["time", "compete", "sacrifice", "weekends"], hints: [PROMPTS.videoGame, PROMPTS.boardGame, PROMPTS.sport, PROMPTS.mobileGame, PROMPTS.instrument] },
          { text: "doing", requires: ["sacrifice", "weekends"], hints: [PROMPTS.annoyingHabit, PROMPTS.chore, PROMPTS.humanActivity, PROMPTS.creativeHobby] },
          { text: "mastering", requires: ["future", "sacrifice", "time", "weekends"], hints: [PROMPTS.professionalSkill, PROMPTS.creativeHobby, PROMPTS.instrument, PROMPTS.foreignLanguage] },
          { text: "watching", requires: ["time", "weekends"], hints: [PROMPTS.tvShow, PROMPTS.youtuber, PROMPTS.sport] },
          { text: "obsessively analyzing", requires: ["future", "time"], hints: [PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic, PROMPTS.historical, PROMPTS.country, PROMPTS.mediaPersonality, PROMPTS.personalInterest] },
          { text: "aggressively teaching people about", requires: ["future", "weekends"], hints: [PROMPTS.schoolSubject, PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: "[ ... ] or [ ... ]?" },
          { text: "[ ... ] or [ ... ] for a million dollars?", requires: ["compete"] }
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
          { text: "have to drink a full glass of", type: "utility", hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink] }
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
          { text: "smells like", requires: ["sweat", "breath"], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, { text: "Thing that smells bad", brainstorm: ["Garbage", "Skunk", "Rotten egg", "Mud"] }] },
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
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "receive an endless supply of", type: "recurring", hints: [{ text: "Large item in a house", isPlural: true, brainstorm: ["Sofas", "Beds", "Fridges", "Tables"] }, { text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, { text: "Thing you wear on your head", isPlural: true, brainstorm: ["Hats", "Helmets", "Caps", "Headbands"] }, PROMPTS.candyType] },
          { text: "receive a daily package containing", type: "recurring", hints: [{ text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "wake up every morning next to a pile of", type: "recurring", hints: [{ text: "Thing you find in a refrigerator", isPlural: true, brainstorm: ["Eggs", "Apples", "Carrots", "Sausages"] }, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.strongFood] }
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
          { text: "be adopted by a family of", type: "adopted", hints: [{ text: "Animal", isPlural: true, brainstorm: ["Wolves", "Monkeys", "Penguins", "Bears"] }, { text: "Type of rich person", isPlural: true, brainstorm: ["Billionaires", "Aristocrats", "Celebrities", "Royals"] }, { text: "Group of people", isPlural: true, brainstorm: ["Tourists", "Teenagers", "Politicians", "Clowns"] }] },
          { text: "join a secret society of", type: "society", hints: [{ text: "Type of rich person", isPlural: true, brainstorm: ["Billionaires", "Aristocrats", "Celebrities", "Royals"] }, { text: "Group of people", isPlural: true, brainstorm: ["Tourists", "Teenagers", "Politicians", "Clowns"] }] }, 
          { text: "be raised by a pack of", type: "raised", hints: [{ text: "Animal", isPlural: true, brainstorm: ["Wolves", "Monkeys", "Penguins", "Bears"] }, { text: "Angry-looking animal", isPlural: true, brainstorm: ["Rhinos", "Bulls", "Eagles", "Hippos"] }, { text: "Pet", isPlural: true, brainstorm: ["Dogs", "Cats", "Parrots", "Hamsters"] }] },
          { text: "go to a magic school where you can only summon", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the power to turn gold into", type: "society", hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.snack, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "have the power to turn water into", type: "society", hints: [PROMPTS.sweetLiquid, PROMPTS.sauce, PROMPTS.hotDrink] },
          { text: "have the power to turn dirt into", type: "society", hints: [PROMPTS.expensive, { text: "Valuable resource", brainstorm: ["Gold", "Silver", "Diamonds", "Oil"] }, PROMPTS.fastFood, PROMPTS.candyType] }
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
          { text: "start a business that only sells", type: "business", hints: [{ text: "Cheap item", isPlural: true, brainstorm: ["Paperclips", "Rubber bands", "Pencils", "Matches"] }, PROMPTS.expensive, PROMPTS.techOld, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: "start a cult based around", type: "cult", hints: [PROMPTS.everyday, PROMPTS.techOld, { text: "Thing you find in a bathroom", brainstorm: ["Soap", "Shampoo", "Toothpaste", "Toilet paper"] }, { text: "Random thing in your room", isPlural: true, brainstorm: ["Books", "Cables", "Pillows", "Cups"] }] },
          { text: "start a protest movement against", type: "movement", hints: [{ text: "Minor inconvenience", isPlural: true, brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] }, PROMPTS.annoyingHabit] },
          { text: "open a restaurant where everything tastes like", type: "restaurant", hints: [PROMPTS.strongFood, { text: "Disease", isPlural: true, brainstorm: ["Flus", "Colds", "Headaches", "Allergies"] }] },
          { text: "host a podcast about", type: "podcast", hints: [PROMPTS.conspiracyTheory, PROMPTS.humanActivity, { text: "Minor inconvenience", isPlural: true, brainstorm: ["Slow Wi-Fi", "Stubbed toes", "Traffic lights", "Paper cuts"] }, PROMPTS.personalInterest] },
          { text: "run a YouTube channel about", type: "podcast", hints: [PROMPTS.conspiracyTheory, PROMPTS.humanActivity, PROMPTS.annoyingHabit] },
          { text: "become CEO of a company making", type: "business", hints: [{ text: "Cheap household item", isPlural: true, brainstorm: ["Sponges", "Toilet paper", "Lightbulbs", "Batteries"] }, { text: "Office supply", isPlural: true, brainstorm: ["Staplers", "Pens", "Sticky notes", "Folders"] }, PROMPTS.techOld] },
          { text: "start a street gang that only steals", type: "gang", hints: [PROMPTS.everyday, PROMPTS.smallObj, { text: "Cheap household item", isPlural: true, brainstorm: ["Sponges", "Toilet paper", "Lightbulbs", "Batteries"] }] }
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
          { text: "get a small tattoo of", type: "tattoo", hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.politician, PROMPTS.actor] },
          { text: "give a 1-hour presentation on their relationship with", type: "presentation", hints: [PROMPTS.chore, PROMPTS.everyday, PROMPTS.animalFunny, PROMPTS.snack] },
          { text: "write a heartfelt song about", type: "song", hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.everyday, PROMPTS.candyType] },
          { text: "star in a low-budget musical about", type: "musical", hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame] }

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
          { text: "?", requires: ["presentation", "expert"] },
          { text: "and perform it at your birthday?", requires: ["song"] }
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
          // Без встроенного условия
          { text: "be able to turn any object into", type: "clean_power", hints: [{ text: "Food item", brainstorm: ["Pizza", "Cheese", "Cake", "Chocolate"] }, { text: "Office supply", brainstorm: ["Stapler", "Paperclip", "Sticky note", "Pen"] }, PROMPTS.animalFunny, { text: "Fragile object", brainstorm: ["Raw egg", "Glass cup", "Flower", "Paper cup"] }] },
          { text: "be able to turn yourself into", type: "clean_power_self", hints: [PROMPTS.animalFunny, { text: "Exotic animal", brainstorm: ["Panda", "Koala", "Iguana", "Toucan"] }, { text: "Inanimate object", brainstorm: ["Chair", "Lamp", "Car", "Tree"] }] },
          
          // Уже со встроенным условием
          { text: "be able to teleport, but always arrive covered in", type: "has_condition", hints: [{ text: "Sticky substance", brainstorm: ["Honey", "Mud", "Slime", "Glue"] }, { text: "Sauce", brainstorm: ["Ketchup", "Mayonnaise", "Mustard", "Soy sauce"] }, { text: "Chemical", brainstorm: ["Gasoline", "Bleach", "Chlorine", "Vinegar"] }, PROMPTS.strongFood] },
          { text: "become invisible, but only while holding", type: "has_condition", hints: [{ text: "Office supply", brainstorm: ["Stapler", "Paperclip", "Sticky note", "Pen"] }, { text: "Fragile object", brainstorm: ["Raw egg", "Glass cup", "Flower", "Paper cup"] }, { text: "Food item", brainstorm: ["Pizza", "Cheese", "Cake", "Chocolate"] }] },
          { text: "have super strength, but only while singing about", type: "has_condition", hints: [{ text: "Boring topic", brainstorm: ["Taxes", "Weather", "Traffic", "Math"] }, PROMPTS.schoolSubject, { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] }] },
          { text: "have super strength, but only while singing songs by", type: "has_condition", hints: [PROMPTS.singer, PROMPTS.band] },
          { text: "be able to read minds, but only hear thoughts about", type: "has_condition", hints: [{ text: "Boring topic", brainstorm: ["Taxes", "Weather", "Traffic", "Math"] }, PROMPTS.fastFood, { text: "Vegetable", brainstorm: ["Broccoli", "Carrot", "Onion", "Cabbage"] }] }
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
          { text: "wear a full costume of", type: "costume_full", hints: [PROMPTS.animalFunny, { text: "Food item", brainstorm: ["Hot dog", "Banana", "Taco", "Pizza"] }, { text: "Unusual profession", brainstorm: ["Clown", "Mime", "Pirate", "Astronaut"] }, PROMPTS.fictionalChar, PROMPTS.cartoonChar] },
          { text: "carry a life-sized statue of", type: "carry_statue", hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: "dress exactly like", type: "dress_like", hints: [PROMPTS.villain, { text: "Unusual profession", brainstorm: ["Clown", "Mime", "Pirate", "Astronaut"] }, PROMPTS.cartoonChar] }
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
          { text: "make everyone in the room suddenly start", type: "start", hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.creativeHobby] },
          { text: "instantly stop anyone from", type: "stop", hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.humanActivity] },
          { text: "earn $10 every time you finish", type: "earn", hints: [PROMPTS.chore, PROMPTS.humanActivity] }
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
    // Фикс QA 10: Убраны абстрактные/сбивающие с толку категории вроде "Cult leader" и "Tech billionaire"
hints: [
      PROMPTS.historical, PROMPTS.singer, PROMPTS.actor, PROMPTS.politician, PROMPTS.personRespect
    ]
  },

{
    id: 16,
    category: "identity",
    canTriggerCombo: true,
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
    id: 17,
    category: "entertainment",
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "host a 12-hour watch party of", type: "watch", hints: [PROMPTS.movie, PROMPTS.tvShow] },
          { text: "star in a low-budget musical about/based on", type: "musical", hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame] },
          { text: "write a 100-page fanfiction about", type: "fanfic", hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.videoGame] },
          { text: "record a 3-hour rant about", type: "rant", hints: [PROMPTS.movie, PROMPTS.videoGame, PROMPTS.tvShow] }
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
          { text: "be randomly teleported to", type: "location", hints: [PROMPTS.country, PROMPTS.famousCity] },
          { text: "instantly teleport into the home of", type: "person", hints: [PROMPTS.actor, PROMPTS.singer, PROMPTS.politician, PROMPTS.historical, PROMPTS.youtuber] },
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
          { text: "as your boss?", hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.youtuber, PROMPTS.actor, PROMPTS.personRespect] },
          { text: "as your best friend?", hints: [PROMPTS.cartoonChar, PROMPTS.chubbyAnimal, PROMPTS.dogBreed, PROMPTS.fictionalChar] },
          { text: "as your sworn enemy?", hints: [PROMPTS.villain, PROMPTS.historical, PROMPTS.youtuber, PROMPTS.mediaPersonality] },
          { text: "as your psychotherapist?", hints: [PROMPTS.historical, PROMPTS.actor, PROMPTS.singer, PROMPTS.mediaPersonality, PROMPTS.personRespect] },
          { text: "as your martial art sparring partner?", hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.youtuber, PROMPTS.historical] },
          { text: "as your cleaner?", hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.villain, PROMPTS.youtuber] },
          { text: "as your fitness trainer?", hints: [PROMPTS.actor, PROMPTS.fastAnimal, PROMPTS.villain, PROMPTS.singer] },
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
    category: "naming_realm", // Уникальная категория-триггер для комбо
    canTriggerCombo: true,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "rename your country to", type: "country", hints: [PROMPTS.fantasyKingdom, PROMPTS.terriblePlace, PROMPTS.company, PROMPTS.chubbyAnimal, PROMPTS.everyday, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.letterM] },
          { text: "rename your city to", type: "city", hints: [PROMPTS.fantasyKingdom, PROMPTS.terriblePlace, PROMPTS.snack, PROMPTS.everyday, PROMPTS.company, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.letterM] }
        ]
      },
      {
        options: [
          { text: "[ ... ]land or [ ... ]land?", requires: ["country", "city"] },
          { text: "[ ... ]ville or [ ... ]ville?", requires: ["city"] },
          { text: "[ ... ]field or [ ... ]field?", requires: ["city"] },
          { text: "The Republic of [ ... ] or The Republic of [ ... ]?", requires: ["country"] }
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
          { text: "become the spiritual leader of" },
          { text: "write a 1000-page manifesto about" },
          { text: "strictly live by" },
          { text: "have your government adopt" },
          { text: "try to convince your parents to follow" },
          { text: "try to convince your friends to follow" },
          { text: "permanently ban" },
          { text: "study the history of" }
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
  },
  {
    id: 24, // Вынесли питомцев и личные имена сюда, чтобы они не триггерили комбо
    category: "naming",
    canTriggerCombo: false,
    text: "Would you rather",
    fragments: [
      {
        options: [
          { text: "change your surname to", type: "own_name", hints: [PROMPTS.nickname, PROMPTS.title, PROMPTS.app, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.personRespect, PROMPTS.letterM] },
          { text: "have a national holiday called The Day of", type: "holiday", hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.personRespect, PROMPTS.personalLike] },
          { text: "adopt a dog and name it", type: "dog", hints: [PROMPTS.title, PROMPTS.politician, PROMPTS.company, PROMPTS.app, PROMPTS.techOld, PROMPTS.personRespect, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: "adopt a cat and name it", type: "cat", hints: [PROMPTS.terriblePlace, PROMPTS.villain, PROMPTS.company, PROMPTS.app, PROMPTS.techOld, PROMPTS.personRespect, PROMPTS.personalLike, PROMPTS.letterM] }
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
          // Вернули твою идею! Идеально подходит для спасения от животных.
          { text: "[ ... ] or [ ... ] as your protector?" }
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
    text: "If you were trapped in a room with mutated angry [PREV_CHOICE], would you rather have",
    fragments: [
      {
        options: [
          { text: "[ ... ] or [ ... ] by your side?" }
        ]
      }
    ],
    hints: [PROMPTS.kitchenItem, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.actor, PROMPTS.profession
    ]
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
          // Убрали дублирование "100-page report"
          { text: "a 100-page report about [ ... ] or about [ ... ]?" }
        ]
      }
    ],
    hints: [PROMPTS.conspiracyTheory, PROMPTS.complicatedTopic, PROMPTS.annoyingHabit, PROMPTS.humanActivity]
  },
  {
    id: 104,
    isCombo: true,
    triggerCategory: ["naming_realm"], // Срабатывает только после создания страны/города
    category: "combo",
    text: "As the supreme leader of [PREV_CHOICE], would you rather adopt",
    fragments: [
      {
        options: [
          // Движок корректно заменит скобки, и суффикс "ism" приклеится к слову игрока
          { text: "[ ... ]ism or [ ... ]ism as your state ideology?" }
        ]
      }
    ],
    hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.techOld, PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.company, PROMPTS.abstractMood]
  },
  {
    id: 105,
    isCombo: true,
    triggerCategory: ["naming_realm"], // Срабатывает только после создания страны/города
    category: "combo",
    text: "As the supreme leader of [PREV_CHOICE], would you rather establish a national holiday called",
    fragments: [
      {
        options: [
          { text: "The Day of [ ... ] or The Day of [ ... ]?" }
        ]
      }
    ],
    hints: [PROMPTS.chore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.app]
  }
];
