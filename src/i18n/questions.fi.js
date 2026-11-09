// =====================================================================
// QUESTIONS DATABASE — SUOMEKSI (Sprint 4)
// Identical structure to questions.js: same ids, type/requires, scene,
// hints (reference local PROMPTS). Markers [ ... ], [PICKER],
// [RESPONDER], [PREV_CHOICE] kept as-is.
//
// NOMINATIVE-SAFETY: [ ... ] slots sit only where nominative is natural —
// ” ” quotes, apposition (olento ”X”, henkilö ”X”, aihe ”X”), colon lists,
// or subject position.
// =====================================================================

const MOD_SUBJECTS = ['josta nautit', 'jonka kanssa kamppailit', 'johon olisit pitänyt kiinnittää enemmän huomiota'];

export const PROMPTS = {
  // TEKEMISET
  actionWork: { text: 'Sopimaton teko töissä', brainstorm: ['torkut pöydällä', 'aikainen poistuminen', 'pomon sivuuttaminen', 'pelaaminen töissä', 'sarjojen katselu', 'laulaminen taukotilassa', 'kahvin pönkkiminen', 'riidan aloittaminen', 'töihin tuleminen humalassa', 'tiktokin selailu', 'itkeminen vessassa', 'tietokannan poistaminen', 'pääasiakkaan haukkuminen', 'pyjamassa kokouksessa', 'nukkuminen esityksen aikana', 'firman omaisuuden myynti'] },
  actionIllegal: { text: 'Pieni rikos', brainstorm: ['elokuvan pirateeraus', 'punaisia päin kävely', 'kynän pönkkiminen', 'konserttiin ilman lippua', 'karkin pönkkiminen', 'seinän töhertäminen', 'ylikirpeä koulualueella', 'lippu matkustaminen', 'väärä nimi', 'hätäjarrun vetäminen', 'parkkivartijan lahjonta', 'naapurin wifin kaappaus', 'lääkärintodistuksen väärennys'] },
  actionEmbarrassing: { text: 'Nolotus', brainstorm: ['nimen unohtaminen', 'niiskaus nauraessa', 'heilautus muukalaiselle', 'vastaus väärään viestiin', 'vessapaperia kengässä', 'vetoketju auki', 'opettajan kutsuminen äidiksi', 'vanhan postauksen tykkäys', 'pinaattia hampaissa', 'lasioveen kävely', 'oman salasanan unohtaminen'] },
  actionParty: { text: 'Hauska juhlatemppu', brainstorm: ['miekan nieminen', 'omenoiden jongleeraus', 'voltti taaksepäin', 'lasin syöminen', 'hengityksen pidätys 2 min', 'rubikin kuutio sokkona', 'banaanin kuorinta jaloilla', 'salaisen aineen arvaus drinkissä', 'laulun laulaminen takaperin', 'puun rikkominen päällä', 'kahdella äänellä puhuminen', 'silmien pyöritys eri suuntiin', 'kirsikan varren solmu', 'neulan löytö heinäsuovasta'] },
  actionChore: { text: 'Tavallinen kotityösi (esim. tiskaus)', brainstorm: ['imurointi', 'roskien vieminen', 'pyykin viikkaus', 'sängyn pedaaminen', 'pölyjen pyyhintä', 'vessan puhdistus', 'kierrätyksen lajittelu', 'lakanoien vaihto', 'tiskikoneen tyhjennys', 'ikkunoiden pesu'] },
  actionRelax: { text: 'Rentouttava tekeminen', brainstorm: ['10h nukkuminen', 'kuuma kylpy', 'kirjan lukeminen', 'seinään tuijottaminen', 'auringonlaskun katselu', 'kävelyllä käynti', 'meditointi', 'yrttitee', 'ihan ei-mitään tekeminen', 'rannalla makaaminen', 'pilvien katselu', 'porekylpy', 'meren kuuntelu', 'hieronta', 'syvään hengittäminen', 'sateen katselu', 'maalaaminen'] },
  actionExtreme: { text: 'Extremelaji jota et koskaan kokeilisi', brainstorm: ['jättiaallon surffaus', 'laskuvarjohyppy', 'enduro-ajelu', 'kalliokiipeily', 'wingsuit-lento', 'voltti', 'ultramaratooni', 'hyppy kahden talon välillä', 'mäkelasku skeitillä'] },
  humanActivity: { text: 'Tekeminen', modifiers: ['josta nautit', 'josta et nauti'] },
  hobby: { text: 'Harrastus', modifiers: ['jonka haluaisit aloittaa', 'joka kiinnostaa', 'jota et koskaan tekisi'] },
  annoyingHabit: { text: 'Tapa', modifiers: ['hyvä', 'huono'] },

  // SANAT JA ABSTRAKTIOT
  personalLike: { text: 'Asiat joista oikeasti pidät' },
  personalInterest: { text: 'Aiheet jotka kiinnostavat' },
  letterM: { text: 'M-kirjaimella alkavat sanat' },
  madeUpCompound: { text: 'Keksitty yhdyssana (kaksi lempiasiaasi yhdessä, esim. herkkupelit)' },
  madeUpHyphenated: { text: 'Keksitty väliviivasana (sisältää lempiasiasi, esim. halauskone)' },
  abstractMood: { text: 'Abstrakti tunne tai käsite', modifiers: ['jonka koit äskettäin', 'jota et ole kokenut vähään aikaan'], brainstorm: ['Ilo', 'Epätoivo', 'Hämmennys', 'Apatia', 'Paniikki', 'Melankolia', 'Euforia', 'Tylsyys', 'Nostalgia'] },

  // PAIKAT
  country: { text: 'Maa joka kiinnostaa' },
  famousCity: { text: 'Kuuluisa kaupunki' },
  specificLocation: { text: 'Paikka jossa käyt usein' },
  publicPlace: { text: 'Julkinen paikka jossa viihdyt' },

  // IHMISET JA ROOLIT
  fictionalChar: { text: 'Keksin hahmo' },
  villain: { text: 'Kauhuelokuvan pahis', brainstorm: ['Dracula', 'Pennywise', 'Chucky', 'Hannibal', 'Muumio', 'Alien', 'Freddy Krueger', 'Michael Myers', 'Predator', 'Jigsaw'] },
  politician: { text: 'Poliitikko', brainstorm: ['Putin', 'Macron', 'Merkel', 'Stalin', 'Lenin', 'Nixon', 'Trump', 'Biden', 'Boris Johnson', 'Kim Jong Un', 'Obama', 'Churchill', 'Mandela', 'Gandhi', 'Lincoln', 'Franklin', 'Kuningatar Elisabet', 'Thatcher', 'Kamala Harris'] },
  historical: { text: 'Historiallinen hahmo', brainstorm: ['Nero', 'Platon', 'Dante', 'Galilei', 'Mozart', 'Lincoln', 'Kleopatra', 'Napoleon', 'Julius Caesar', 'Newton', 'Einstein', 'Jeanne d\'Arc', 'MLK', 'Marco Polo', 'Aleksanteri Suuri', 'Tšingis-kaani', 'Marie Curie'] },
  singer: { text: 'Laulaja/muusikko', brainstorm: ['Prince', 'Adele', 'Drake', 'Sia', 'Sting', 'Bowie', 'Taylor Swift', 'Michael Jackson', 'Freddie Mercury', 'Beyoncé', 'Lady Gaga', 'Sinatra', 'Elvis', 'Whitney Houston', 'Billie Eilish', 'Bieber'] },
  band: { text: 'Bändi', brainstorm: ['Queen', 'KISS', 'Muse', 'Blur', 'Nirvana', 'The Beatles', 'Metallica', 'Pink Floyd', 'Led Zeppelin', 'Rolling Stones', 'RHCP', 'Guns N\' Roses', 'Arctic Monkeys', 'Linkin Park', 'Foo Fighters', 'Black Sabbath', 'Radiohead'] },
  actor: { text: 'Näyttelijä', brainstorm: ['Brad Pitt', 'Tom Cruise', 'Jim Carrey', 'Tom Hanks', 'Vin Diesel', 'Will Smith', 'Leonardo DiCaprio', 'Robert Downey Jr', 'Matthew McConaughey', 'Scarlett Johansson', 'Johnny Depp', 'Christian Bale', 'Morgan Freeman', 'Ryan Reynolds', 'Jennifer Lawrence', 'Samuel L Jackson', 'Joaquin Phoenix'] },
  profession: { text: 'Ammatti', modifiers: ['joka kuulostaa uuvuttavalta', 'joka kuulostaa hauskalta'] },
  cartoonChar: { text: 'Piirroshahmo', brainstorm: ['Popeye', 'Gumball', 'Scooby', 'Stewie', 'Väiski Vemmelsääri', 'Mikki Hiiri', 'Homer Simpson', 'Paavo Pesusieni', 'Tom-kissa', 'Jerry-hiiri', 'Jaska Jokunen', 'Nalle Puh', 'Rick Sanchez'] },
  mediaPersonality: { text: 'Mediapersoona', brainstorm: ['Oprah Winfrey', 'Ellen DeGeneres', 'Conan O\'Brien', 'Jimmy Fallon', 'Jimmy Kimmel', 'Joe Rogan', 'Larry King', 'David Letterman', 'Gordon Ramsay', 'Tucker Carlson', 'Trevor Noah'] },

  // RUOKA JA JUOMAT
  fastFood: { text: 'Pikaruoka', brainstorm: ['hampurilainen', 'pizza', 'ranskalaiset', 'hodari', 'paistettu kana', 'taco', 'burrito', 'sipulirenkaat'] },
  snack: { text: 'Naposteltava', brainstorm: ['skittles', 'doritos', 'cheetos', 'popcorn', 'pretzelit', 'pähkinät', 'keksit', 'kuivaliha'] },
  sweetLiquid: { text: 'Makea neste', brainstorm: ['hunaja', 'siirappi', 'mehu', 'limppari', 'maito', 'nektari', 'vaahterasiirappi', 'sulatettu suklaa', 'omenasmehu', 'appelsiinimehu', 'viinirypälelimppari', 'kondensoitu maito'] },
  strongFood: { text: 'Vahvatuoksuinen ruoka', brainstorm: ['sipuli', 'valkosipuli', 'kala', 'tonnikala', 'kimchi', 'curry', 'sinihomejuusto', 'silli', 'mätä munat', 'sardiinit', 'durian'] },
  sauce: { text: 'Kastike', brainstorm: ['Pesto', 'Salsa', 'Kermakastike', 'Tahini', 'Hummus', 'Tomaattikastike', 'Sienikastike', 'BBQ', 'Teriyaki', 'Valkosipuliaioli', 'Hunajasinappi', 'Hollandaise', 'Buffalo', 'Sweet chili', 'Aura'] },
  hotDrink: { text: 'Kuuma juoma', brainstorm: ['Tee', 'Kahvi', 'Kaakao', 'Latte', 'Chai', 'Kuuma suklaa', 'Yrttitee', 'Earl Grey', 'Vihreä tee', 'Cappuccino', 'Espresso', 'Matcha latte', 'Mintutee', 'Flat white', 'Lämminsimi'] },
  popularDrink: { text: 'Juoma', brainstorm: ['Vesi', 'Kahvi', 'Tee', 'Olut', 'Limppari', 'Omppumehu', 'Kokis', 'Punaviini', 'Jäätee', 'Limsa', 'Kaakao', 'Omenasmehu', 'Pienpanimo-olut', 'Energiajuoma', 'Kivennäisvesi'] },
  candyType: { text: 'Karkkityyppi', brainstorm: ['Nallekarkit', 'Suklaa', 'Tikkari', 'Skittles', 'Vaahtokarkki', 'Lakritsi', 'Tumma suklaa', 'Hattara'] },
  fruit: { text: 'Hedelmä', brainstorm: ['Omena', 'Päärynä', 'Persikka', 'Luumu', 'Rypäleet', 'Vesimeloni', 'Mansikka', 'Ananas', 'Granaattiomena', 'Greippi', 'Mustikka', 'Vadelma', 'Passio', 'Kiivi', 'Lohikäärmehedelmä'] },
  foodItem: { text: 'Ruoka', modifiers: ['jota voisit syödä joka päivä', 'josta pidät', 'jota et syö'], brainstorm: ['Pizza', 'Juusto', 'Kakku', 'Suklaa'] },

  // ELÄIMET
  animalFunny: { text: 'Hassun näköinen eläin', brainstorm: ['laiskiainen', 'mopsi', 'sammakko', 'laama', 'koala', 'apina', 'vesinokkaeläin', 'kapibaara', 'hedelmälepakko', 'emu'] },
  animalFarm: { text: 'Maatilan eläin', brainstorm: ['lehmä', 'possu', 'hevonen', 'vuohi', 'lammas', 'ankka', 'kana', 'sonni', 'pässi', 'kananpoika', 'kukko', 'aasi', 'muuliaasi', 'kalkkuna'] },
  chubbyAnimal: { text: 'Pullukka eläin', brainstorm: ['Hylje', 'Panda', 'Hamsteri', 'Pingviini', 'Karhu', 'Kultapanda', 'Marsu', 'Virtahepo', 'Murmelli', 'Siili'] },
  fastAnimal: { text: 'Nopea eläin', brainstorm: ['Leijona', 'Jänis', 'Haukka', 'Hai', 'Kotka', 'Muuttohaukka', 'Gepardi', 'Purjekala', 'Marliini', 'Sarviantilooppi', 'Gaselli', 'Gnu', 'Kilparatsu', 'Strutsi', 'Vinttikoira'] },
  angryAnimal: { text: 'Vihan näköinen eläin', brainstorm: ['Ampia', 'Härkä', 'Mäyrä', 'Villisika', 'Käärme', 'Grizzly', 'Silverback', 'Puhveli', 'Hunajamäyrä', 'Virtahepo', 'Ahma', 'Sarvinen', 'Chihuahua', 'Villisika'] },
  loudAnimal: { text: 'Äänekäs eläin', brainstorm: ['Leijona', 'Susi', 'Varis', 'Hyeena', 'Hanhet', 'Sinivalas', 'Riikinkukko', 'Aasi', 'Merileijona', 'Sammakko'] },
  dangerousAnimal: { text: 'Vaarallinen eläin', brainstorm: ['Leijona', 'Hai', 'Kobra', 'Susi', 'Karhu', 'Tiikeri', 'Krokotiili', 'Musta mamba', 'Laimuryppy', 'Komodovaraani', 'Nuolimyrkkysammakko', 'Virtahepo'] },
  insect: { text: 'Hyönteinen', brainstorm: ['Muurahainen', 'Mehiläinen', 'Kärpänen', 'Ampia', 'Kirppu', 'Hunajamehiläinen', 'Sudenkorento', 'Perhonen', 'Leppäkerttu', 'Heinäsirkka', 'Torakka', 'Hyttynen', 'Kimalainen', 'Rukoileva mantis'] },
  heavyAnimal: { text: 'Raskas eläin', brainstorm: ['Lehmä', 'Karhu', 'Härkä', 'Hylje', 'Hevonen', 'Sinivalas', 'Norsu', 'Valkosarvikuono', 'Virtahepo', 'Mursu', 'Kirahvi', 'Biison', 'Gaur', 'Merinorsu', 'Aasian norsu'] },
  bitingAnimal: { text: 'Pureva eläin', brainstorm: ['Koira', 'Kissa', 'Muurahainen', 'Ampia', 'Rotta', 'Saksanpaimenkoira', 'Alligaattorikilpikonna', 'Musta mamba', 'Komodovaraani', 'Hedelmälepakko', 'Grizzly', 'Villisika', 'Tulimuurahainen', 'Hyttynen', 'Valkohai'] },
  nocturnalAnimal: { text: 'Yöeläin', brainstorm: ['Pöllö', 'Lepakko', 'Kettu', 'Susi', 'Myyrä', 'Supikoira', 'Siili', 'Liito-orava', 'Mäyrä', 'Opossumi', 'Lemuri', 'Ai-ai', 'Hedelmälepakko', 'Kehrääjä'] },
  wildAnimal: { text: 'Villi eläin', brainstorm: ['Susi', 'Karhu', 'Leijona', 'Peura', 'Kettu', 'Bengalintiikeri', 'Norsu', 'Grizzly', 'Punakenguru', 'Lumileopardi', 'Jääkarhu', 'Merikotka', 'Harmaasusi', 'Vuorigorilla', 'Afrikan leijona'] },
  dogBreed: { text: 'Koirarotu', brainstorm: ['Mopsi', 'Bokseri', 'Husky', 'Beagle', 'Collie', 'Villakoira', 'Akita', 'Corgi', 'Chow', 'Vizsla', 'Saksanpaimenkoira', 'Kultainennoutaja', 'Ranskanbulldoggi', 'Bordercollie', 'Labradori', 'Siperianhusky', 'Tanskandoggi', 'Australianpaimenkoira', 'Berninpaimenkoira', 'Kavaljeeri', 'Dobermanni', 'Rottweiler', 'Malamuutti', 'Newfoundlandinkoira', 'Bernhardinkoira'] },
  exoticAnimal: { text: 'Eksoottinen eläin', brainstorm: ['Panda', 'Koala', 'Iguana', 'Tukaani'] },

  // ESINEET
  everyday: { text: 'Aineellinen esine/esineet', modifiers: ['joita käytät usein', 'joita haluat lisää'] },
  expensive: { text: 'Kallis esine' },
  gadget: { text: 'Elektroniikkalaite', brainstorm: ['iPad', 'iPod', 'Kindle', 'Walkman', 'Hakulaite', 'Kamera', 'iPhone', 'Game Boy', 'Sähköparranajokone', 'Älykaiutin', 'Langaton hiiri', 'Pelikonsoli', 'Polaroid', 'Tietokone'] },
  smallObj: { text: 'Pienet esineet', isPlural: true, brainstorm: ['Kolikot', 'Nastat', 'Nopat', 'Avaimet', 'Sormukset', 'Siemenet', 'Pullonkorkit', 'Nippusiteet', 'Napit', 'Kumilenksut', 'Neulat', 'Korunapit', 'Kahvipavut', 'Hakaneulat', 'Tulitikut', 'Plekrat', 'Muistikortit'] },
  stickyThing: { text: 'Tahmea juttu', brainstorm: ['Liima', 'Hunaja', 'Teippi', 'Purukumi', 'Pihka', 'Kaksipuolinen teippi', 'Muistilappu', 'Melassi', 'Vaahterasiirappi', 'Superliima', 'Purukumi', 'Pihka', 'Karamelli', 'Maalarinteippi', 'Liimapuikko'] },
  kitchenItem: { text: 'Keittiöesineet', isPlural: true, brainstorm: ['Lusikat', 'Lautaset', 'Tehosekoittimet', 'Veitset', 'Haarukat', 'Leikkuulaudat', 'Mittakupit', 'Paistinpannut', 'Kulhot', 'Kahvinkeittimet', 'Leivänpaahdimet', 'Uunipellit', 'Puulusikat', 'Astiankuivaustelineet', 'Monitoimikoneet'] },
  householdItem: { text: 'Kodin esine jota käytät usein', brainstorm: ['Leivänpaahdin', 'Lamppu', 'Sieni', 'Luuta', 'Tuoli', 'Imuri', 'Kahvinkeitin', 'Seinäkello', 'Pyykkikori', 'Leikkuulauta', 'Kaukosäädin', 'Lakana', 'Suihkuverho', 'Roskis', 'Pyykinpesukone'] },
  clothingItem: { text: 'Vaate', brainstorm: ['Paita', 'Farkut', 'Hame', 'Mekko', 'Pipo', 'Talvitakki', 'Nahkavyö', 'Neule', 'T-paita', 'Sadetakki'] },
  survivalTool: { text: 'Selviytymisväline', brainstorm: ['Veitsi', 'Kirves', 'Saha', 'Sytkäri', 'Köysi', 'Multitool', 'Ensiapulaukku', 'Taskulamppu', 'Makuupussi', 'Kompassi'] },
  shape: { text: 'Muoto / tunnistettava esine', brainstorm: ['Kuutio', 'Kolmio', 'Pähkinä', 'Ilmapallo', 'Lamppu', 'Päärynä', 'Muna', 'Tiili', 'Sydän', 'Timantti', 'Sylinteri', 'Kartio', 'Donitsi', 'Banaani', 'Pyramidi', 'Tähti', 'Nuoli', 'Pilleri'] },
  hygieneProduct: { text: 'Hygieniatuote', brainstorm: ['Saippua', 'Hammastahna', 'Shampoo', 'Deo'] },
  badSmellingThing: { text: 'Pahanhajuinen juttu', brainstorm: ['Roskat', 'Haisunäätä', 'Mätä muna', 'Muta'] },
  cheapItem: { text: 'Halvat pikkuesineet', isPlural: true, brainstorm: ['Nippusiteet', 'Kumilenksut', 'Kynät', 'Tulitikut'] },
  roomItem: { text: 'Esineet olohuoneessasi', isPlural: true, brainstorm: ['Kirjat', 'Kaapelit', 'Tyynyt', 'Mukit'] },
  minorInconvenience: { text: 'Pikkuinharmi', brainstorm: ['Hidas wifi', 'Varpaan iskeytyminen', 'Liikennevalot', 'Paperihaava'] },
  fragileObject: { text: 'Hauras esine', brainstorm: ['Raaka muna', 'Lasikuppi', 'Kukka', 'Pahvikuppi'] },
  inanimateObject: { text: 'Eloton esine', brainstorm: ['Tuoli', 'Lamppu', 'Auto', 'Puu'] },
  stickySubstance: { text: 'Tahmea aine', brainstorm: ['Hunaja', 'Muta', 'Lima', 'Liima'] },
  vegetable: { text: 'Kasvis', brainstorm: ['Parsakaali', 'Porkkana', 'Sipuli', 'Kaali'] },

  // MEDIA, BRÄNDIT, KÄSITTEET
  company: { text: 'Firma', brainstorm: ['Sony', 'Apple', 'Nokia', 'Yahoo', 'Tesla', 'SpaceX', 'Intel', 'Meta', 'Blockbuster', 'Netflix', 'Google', 'Amazon', 'Microsoft', 'Samsung', 'Toyota', 'General Electric', 'Coca Cola'] },
  app: { text: 'Sovellus', brainstorm: ['Zoom', 'Uber', 'Slack', 'Tinder', 'Discord', 'Reddit', 'BeReal', 'TikTok', 'Instagram', 'Google Maps', 'Spotify', 'YouTube', 'WhatsApp', 'Twitter', 'Apple Music', 'Netflix', 'Facebook', 'Snapchat'] },
  website: { text: 'Nettisivu', brainstorm: ['eBay', 'Bing', 'Twitch', 'Reddit', 'Tumblr', 'Github', 'YouTube', 'Wikipedia', 'Amazon', 'Google', 'Facebook', 'Instagram', 'Pinterest', 'LinkedIn', 'Netflix', 'SoundCloud'] },
  videoGame: { text: 'videopeli', brainstorm: ['Doom', 'Halo', 'Tetris', 'Portal', 'Skyrim', 'Fortnite', 'GTA', 'World of Warcraft', 'The Witcher', 'RDR', 'Mario', 'Minecraft', 'Elden Ring', 'Call of Duty', 'Final Fantasy', 'League of Legends'] },
  boardGame: { text: 'lautapeli', brainstorm: ['Monopoli', 'Uno', 'Shakki', 'Twister', 'Jenga', 'Alfapet', 'Catan'] },
  sport: { text: 'Laji', brainstorm: ['Golf', 'Rugby', 'Tennis', 'Jalkapallo', 'Nyrkkeily', 'Koripallo', 'Lentopallo', 'Jääkiekko', 'Pingis', 'Amerikkalainen jalkapallo', 'Formula 1', 'Kalliokiipeily', 'Taitoluistelu', 'Laukat', 'Ultimate'] },
  mobileGame: { text: 'Mobiilipeli', brainstorm: ['Alto', 'Snake', 'Plague', 'Threes', 'Monument', 'Candy Crush', 'Clash of Clans', 'Subway Surfers', 'Angry Birds', 'Temple Run', 'Among Us', 'Genshin Impact', 'Pokémon GO', 'PUBG Mobile', 'Plants vs Zombies'] },
  instrument: { text: 'Soitin', brainstorm: ['Piano', 'Rummut', 'Harppu', 'Huilu', 'Sello', 'Kitara', 'Sähkökitara', 'Flyygeli', 'Viulu', 'Saksofoni', 'Trumpetti', 'Klarinetti', 'Pasuuna', 'Basso', 'Syntetisaattori'] },
  tvShow: { text: 'Sarja josta pidät', brainstorm: ['Lost', 'Fargo', 'Friends', 'The Wire', 'Succession', 'Breaking Bad', 'Game of Thrones', 'Sopranos', 'Stranger Things', 'The Office', 'Better Call Saul', 'Black Mirror', 'Chernobyl', 'The Crown', 'House of the Dragon'] },
  schoolSubject: { text: 'Kouluaine', modifiers: MOD_SUBJECTS, brainstorm: ['Matikka', 'Kuvataide', 'Musiikki', 'Historia', 'Fysiikka', 'Tietotekniikka', 'Liikunta', 'Vieras kieli', 'Yhteiskuntaoppi', 'Politiikka', 'Ympäristöoppi', 'Äidinkieli', 'Graafinen suunnittelu', 'Uskonto', 'Taloustieto'] },
  complicatedTopic: { text: 'Monimutkainen aihe', brainstorm: ['Kryptovaluutat', 'Verot', 'Tekoäly', 'Astrologia', 'Kvanttifysiikka', 'Matrix', 'NFT'] },
  foreignLanguage: { text: 'Vieras kieli', modifiers: ['jonka haluaisit oppia', 'joka olisi hyödyllistä osata'], brainstorm: ['Ranska', 'Saksa', 'Espanja', 'Italia', 'Arabia', 'Mandariinikiina', 'Japani', 'Portugali', 'Venäjä', 'Korea', 'Hindi', 'Hollanti', 'Turkki', 'Ruotsi', 'Vietnam'] },
  professionalField: { text: 'Ammattialue (esim. lääketiede, koodaus)', brainstorm: ['Lääketiede', 'Laki', 'Insinööri', 'Rahoitus', 'Suunnittelu', 'Koodaus', 'Projektijohto', 'Data-analytiikka', 'Markkinointi', 'Liikkeenjohto', 'HR', 'Ympäristötiede', 'Graafinen suunnittelu', 'Tekoäly', 'PR'] },
  martialArt: { text: 'Kamppailulaji', brainstorm: ['Judo', 'Karate', 'Aikido', 'Kung fu', 'Sumo', 'Bjj', 'Muay thai', 'MMA', 'Taekwondo', 'Krav maga', 'Capoeira', 'Jeet kune do', 'Kendo', 'Hapkido', 'Wing chun', 'Kempo'] },
  smallTalkTopic: { text: 'Smalltalk-aihe', brainstorm: ['Sää', 'Matkailu', 'Harrastukset', 'Elokuvat', 'Musiikki', 'Viikonloppusuunnitelmat', 'Lempiravintolat', 'Teknotrendit', 'Luetut kirjat', 'Työelämä', 'Lomakokemukset', 'Kuntotavoitteet', 'Tapahtumat', 'Kokkailu', 'Ura'] },
  movie: { text: 'Elokuva', brainstorm: ['Titanic', 'Star Wars', 'Matrix', 'Shrek', 'Harry Potter', 'Jurassic Park', 'Avatar', 'Tarun sormusten herrasta', 'Avengers', 'Spiderman'] },
  title: { text: 'Kuuluisa kirja- tai elokuvanimi', brainstorm: ['Matrix', 'Shrek', 'Titanic', 'Avatar', 'Hamlet', 'Dracula'] },
  movieGenre: { text: 'Elokuvagenre', brainstorm: ['Kauhu', 'Romcom', 'Scifi', 'Musikaali', 'Länkkäri', 'Mykkäelokuva', 'True crime', 'Toiminta', 'Fantasia'] },
  musicGenre: { text: 'Musiikkityyli', brainstorm: ['Heavy metal', 'Klassinen', 'K-pop', 'Jazz', 'Country', 'Dubstep', 'Ooppera', 'Punk', 'Tekno'] }
};

export const questionsDatabase = [
  {
    id: 1,
    category: 'survival',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'joutua', type: 'stranded' },
          { text: 'jäädä', type: 'left' }
        ]
      },
      {
        options: [
          { text: 'autiolle saarelle', requires: ['stranded', 'left'], type: 'isolated', scene: 'island' },
          { text: 'yksin metsään', requires: ['stranded', 'left'], type: 'isolated', scene: 'woods' },
          { text: 'täysin vieraaseen kaupunkiin', requires: ['left'], type: 'urban', scene: 'city' }
        ]
      },
      {
        options: [
          { text: 'lopuksi elämäksesi' },
          { text: '5 vuodeksi' },
          { text: '10 vuodeksi' },
          { text: 'yhdeksi päiväksi' },
          { text: 'yhdeksi viikoksi' },
          { text: 'ikuisesti' }
        ]
      },
      {
        options: [
          { text: 'seurana: ”[ ... ]” vai ”[ ... ]”?' }
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
    category: 'activities',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'viettää 1000 tuntia', type: 'time' },
          { text: 'osallistua mestaruuskisaan', type: 'compete' },
          { text: 'omistaa koko tulevaisuutesi tekemiselle', type: 'future' },
          { text: 'uhrata kaiken vapaa-aikasi tekemiselle', type: 'sacrifice' },
          { text: 'viettää kaikki viikonloppusi tekemiselle', type: 'weekends' }
        ]
      },
      {
        options: [
          { text: 'pelaten peliä', requires: ['time', 'compete', 'sacrifice', 'weekends'], scene: 'playing', hints: [PROMPTS.videoGame, PROMPTS.boardGame, PROMPTS.sport, PROMPTS.mobileGame, PROMPTS.instrument] },
          { text: 'tehden tekemistä', requires: ['sacrifice', 'weekends'], scene: 'doing', hints: [PROMPTS.annoyingHabit, PROMPTS.actionChore, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: 'opetellen taitoa', scene: 'mastering', requires: ['future', 'sacrifice', 'time', 'weekends'], hints: [PROMPTS.hobby, PROMPTS.instrument, PROMPTS.foreignLanguage] },
          { text: 'katsoen sarjaa', requires: ['time', 'weekends'], hints: [PROMPTS.tvShow, PROMPTS.sport] },
          { text: 'ahmien analysoiden aihetta', requires: ['future', 'time'], scene: 'report', hints: [PROMPTS.complicatedTopic, PROMPTS.historical, PROMPTS.country, PROMPTS.mediaPersonality, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'aggressiivisesti opettaen ihmisille aihetta', requires: ['future', 'weekends'], scene: 'report', hints: [PROMPTS.schoolSubject, PROMPTS.complicatedTopic, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?' },
          { text: '”[ ... ]” vai ”[ ... ]” — miljoonasta dollarista?', requires: ['compete'], scene: 'money' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 3,
    category: 'animals',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'saada lemmikiksi olennon', type: 'possession', hints: [PROMPTS.animalFarm, PROMPTS.dogBreed, PROMPTS.chubbyAnimal, PROMPTS.animalFunny] },
          { text: 'joutua olennon jahtaamaksi', type: 'threat_run', scene: 'chase', hints: [PROMPTS.fastAnimal, PROMPTS.angryAnimal, PROMPTS.dangerousAnimal, PROMPTS.wildAnimal, PROMPTS.heavyAnimal] },
          { text: 'joutua yksin loukkuun olennon kanssa', type: 'threat_close', hints: [PROMPTS.dangerousAnimal, PROMPTS.angryAnimal, PROMPTS.bitingAnimal, PROMPTS.loudAnimal] },
          { text: 'leikkiä olennon kanssa', type: 'threat_close', hints: [PROMPTS.insect, PROMPTS.animalFunny, PROMPTS.dogBreed, PROMPTS.nocturnalAnimal, PROMPTS.wildAnimal] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”', type: 'normal' },
          { text: '— jättiversio: ”[ ... ]” vai ”[ ... ]”', type: 'giant' },
          { text: '— pienoisversio: ”[ ... ]” vai ”[ ... ]”', type: 'tiny' },
          { text: '— näkymätön versio: ”[ ... ]” vai ”[ ... ]”', type: 'invisible' }
        ]
      },
      {
        options: [
          { text: 'seuraavat kymmenen vuotta?', requires: ['possession'] },
          { text: 'pienessä yksiössä?', requires: ['possession', 'threat_run', 'threat_close'] },
          { text: 'pimeässä metsässä?', requires: ['threat_run', 'threat_close'] },
          { text: 'tyhjässä ostoskeskuksessa?', requires: ['threat_run', 'threat_close'] },
          { text: 'pienessä hississä?', requires: ['threat_close'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 4,
    category: 'skills',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'tulla välittömästi maailmanluokan asiantuntijaksi alalla', type: 'positive', hints: [PROMPTS.foreignLanguage, PROMPTS.martialArt, PROMPTS.hobby, PROMPTS.instrument] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: '— mutta vain kun olet', type: 'condition' },
          { text: '— mutta vain kun yrität tehdä vaikutuksen', type: 'context' }
        ]
      },
      {
        options: [
          { text: 'rekrytoijaan?', requires: ['context'] },
          { text: 'vanhempiisi?', requires: ['context'] },
          { text: 'puoliunessa?', requires: ['condition'] },
          { text: 'saunassa?', requires: ['condition'] },
          { text: 'huonona hiustenpäivänä?', requires: ['condition'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 5,
    category: 'lifestyle',
    tags: ['lab_scene', 'meme_charlie'],
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'harjata hampaasi aineella', type: 'hygiene', hints: [PROMPTS.sauce, PROMPTS.stickyThing, PROMPTS.sweetLiquid, PROMPTS.badSmellingThing] },
          { text: 'pestä vaatteesi nesteellä', type: 'hygiene', hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink, PROMPTS.popularDrink] },
          { text: 'juoda täysi lasi nestettä', type: 'drink', scene: 'drink', hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'joka aamu loppuelämäsi?' },
          { text: 'joka päivä vuoden ajan?' },
          { text: 'juuri ennen nukkumaanmenoa?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 6,
    category: 'body',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'hikoilla lätäkköä, joka', type: 'sweat' },
          { text: 'hengittää ulos pilveä, joka', type: 'breath' },
          { text: 'erittää sylkeä, joka', type: 'saliva' }
        ]
      },
      {
        options: [
          { text: 'haisee kuin', requires: ['sweat', 'breath'], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.badSmellingThing] },
          { text: 'maistuu kuin', requires: ['sweat', 'saliva'], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.snack] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: '— mutta vain kun olet', type: 'condition' },
          { text: '— aina kun', type: 'action' }
        ]
      },
      {
        options: [
          { text: 'huonolla tuulella?', requires: ['condition'] },
          { text: 'hyvällä tuulella?', requires: ['condition'] },
          { text: 'tunnet syyllisyyttä?', requires: ['condition'] },
          { text: 'yrität nukkua?', requires: ['condition'] },
          { text: 'istut paikoillasi?', requires: ['action'] },
          { text: 'aloitat nauraa?', requires: ['action'] },
          { text: 'hermostut?', requires: ['action'] },
          { text: 'aloitat syödä?', requires: ['action'] },
          { text: 'aivastat?', requires: ['action'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 7,
    category: 'survival',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'joutua', type: 'stranded' },
          { text: 'jäädä', type: 'left' }
        ]
      },
      {
        options: [
          { text: 'autiolle saarelle', requires: ['stranded', 'left'], type: 'island' },
          { text: 'yksin metsään', requires: ['stranded', 'left'], type: 'isolated', scene: 'woods' },
          { text: 'täysin vieraaseen kaupunkiin', requires: ['left'], type: 'urban', scene: 'city' }
        ]
      },
      {
        options: [
          { text: 'lopuksi elämäksesi' },
          { text: '5 vuodeksi' },
          { text: '10 vuodeksi' },
          { text: 'yhdeksi päiväksi' },
          { text: 'yhdeksi viikoksi' }
        ]
      },
      {
        options: [
          { text: '— ja ottaa mukaan vain esineen ”[ ... ]” tai ”[ ... ]”?' },
          { text: '— kun ainoa aloitustavarasi on ”[ ... ]” tai ”[ ... ]”?' },
          { text: '— ja taskuissasi vain ”[ ... ]” tai ”[ ... ]”?' }
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
    category: 'lifestyle',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'saada loputtoman varaston ainetta', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType] },
          { text: 'saada päivittäin paketin, joka sisältää', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: 'herätä joka aamu vieressäsi kasa nimeltä', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.strongFood] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: '— mutta se katoaa viikonloppuisin?', requires: ['recurring'] },
          { text: '— mutta se haisee aina kauheasta?', requires: ['recurring'] },
          { text: '— mutta joudut jakamaan sen muukalaisen kanssa?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 9,
    category: 'social',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'joutua perheen adoptoimaksi, joka on', type: 'adopted', hints: [PROMPTS.wildAnimal, PROMPTS.animalFunny] },
          { text: 'perustaa kultti aiheen ympärille:', type: 'cult', scene: 'spiritual', hints: [PROMPTS.actionChore, PROMPTS.personalLike] },
          { text: 'kasvaa lauman jäsenenä:', type: 'raised', hints: [PROMPTS.wildAnimal, PROMPTS.angryAnimal, PROMPTS.animalFunny] },
          { text: 'päästä taikakouluun, jossa voi kutsua vain', type: 'society', hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'pystyä muuttamaan kullan aineeksi', type: 'society', hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.snack, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'pystyä muuttamaan veden aineeksi', type: 'society', hints: [PROMPTS.sweetLiquid, PROMPTS.sauce, PROMPTS.hotDrink, PROMPTS.abstractMood] },
          { text: 'pystyä muuttamaan lian aineeksi', type: 'society', hints: [PROMPTS.expensive, PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.abstractMood] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 10,
    category: 'career',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'perustaa yrityksen, joka myy vain', type: 'business', hints: [PROMPTS.cheapItem, PROMPTS.expensive, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'perustaa kultti aiheen ympärille:', type: 'cult', hints: [PROMPTS.everyday, PROMPTS.annoyingHabit, PROMPTS.roomItem] },
          { text: 'käynnistää protestiliikkeen, joka vastustaa', type: 'movement', hints: [PROMPTS.minorInconvenience, PROMPTS.annoyingHabit, PROMPTS.roomItem, PROMPTS.vegetable] },
          { text: 'avata ravintolan, jossa kaikki maistuu kuin', type: 'restaurant', hints: [PROMPTS.strongFood, PROMPTS.abstractMood] },
          { text: 'pitää podcastia aiheesta', type: 'podcast', scene: 'report', hints: [PROMPTS.humanActivity, PROMPTS.minorInconvenience, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'pitää YouTube-kanavaa aiheesta', type: 'podcast', scene: 'report', hints: [PROMPTS.humanActivity, PROMPTS.annoyingHabit, PROMPTS.tvShow, PROMPTS.personalInterest] },
          { text: 'tulla yrityksen CEO:ksi, joka valmistaa', type: 'business', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive] },
          { text: 'perustaa katujengin, joka varastaa vain', type: 'gang', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.gadget] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'ja yrittää taivutella kaverisi mukaan?' },
          { text: 'ja ottaa sen puheeksi joka keskustelussa?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 11,
    category: 'social',
    text: 'Valitse: pelaaja [PICKER]',
    fragments: [
      {
        options: [
          { text: 'teettäisi pienen tatuoinnin', type: 'tattoo', scene: 'tattoo', hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.politician, PROMPTS.actor] },
          { text: 'pitäisi tunnin esitelmän ”Minä ja', type: 'presentation', scene: 'report', hints: [PROMPTS.actionChore, PROMPTS.everyday, PROMPTS.animalFunny, PROMPTS.snack] },
          { text: 'kirjoittaisi tunteikkaan laulun aiheesta', type: 'song', scene: 'song', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.everyday, PROMPTS.candyType] },
          { text: 'esiintyisi pikkubudjettimusikaalissa nimeltä', type: 'musical', scene: 'song', hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'selkäänsä?', requires: ['tattoo'] },
          { text: '”?', requires: ['presentation'] },
          { text: 'ja esittäisi sen syntymäpäivilläsi?', requires: ['song', 'musical'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 12,
    category: 'superpowers',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'pystyä muuttamaan minkä tahansa esineen esineeksi', type: 'clean_power', hints: [PROMPTS.foodItem, PROMPTS.animalFunny, PROMPTS.fragileObject] },
          { text: 'pystyä muuttumaan olennoksi', type: 'clean_power_self', hints: [PROMPTS.animalFunny, PROMPTS.exoticAnimal, PROMPTS.inanimateObject] },
          { text: 'pystyä teleportaamaan, mutta saapua aina aineen peitossa:', type: 'has_condition', hints: [PROMPTS.stickySubstance, PROMPTS.sauce, PROMPTS.strongFood] },
          { text: 'tulla näkymättömäksi, mutta vain pitäessäsi esinettä', type: 'has_condition', hints: [PROMPTS.everyday, PROMPTS.fragileObject, PROMPTS.foodItem] },
          { text: 'olla supervahva, mutta vain laulaessasi aiheesta', type: 'has_condition', scene: 'songResponder', hints: [PROMPTS.schoolSubject, PROMPTS.vegetable, PROMPTS.abstractMood, PROMPTS.actionChore, PROMPTS.personalLike] },
          { text: 'olla supervahva, mutta vain laulaessasi kappaleita esiintyjältä', type: 'has_condition', scene: 'songResponder', hints: [PROMPTS.singer, PROMPTS.band] },
          { text: 'pystyä lukemaan mieliä, mutta kuulla vain ajatuksia aiheesta', type: 'has_condition', hints: [PROMPTS.fastFood, PROMPTS.vegetable, PROMPTS.schoolSubject, PROMPTS.abstractMood, PROMPTS.actionChore] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'aina kun aivastat?', requires: ['clean_power_self'] },
          { text: 'vain 60 sekuntia päivässä?', requires: ['clean_power', 'clean_power_self'] },
          { text: '?', requires: ['has_condition', 'clean_power', 'clean_power_self'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 13,
    category: 'lifestyle',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'käyttää hahmon kokonaista asua:', type: 'costume_full', hints: [PROMPTS.animalFunny, PROMPTS.foodItem, PROMPTS.profession, PROMPTS.fictionalChar, PROMPTS.cartoonChar] },
          { text: 'kantaa mukanasi luonnollisen kokoista patsasta:', type: 'carry_statue', hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: 'pukeutua aivan kuin hahmo', type: 'dress_like', hints: [PROMPTS.villain, PROMPTS.profession, PROMPTS.cartoonChar] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'jokaiseen työhaastatteluun?', requires: ['costume_full', 'dress_like'] },
          { text: 'julkisessa liikenteessä?', requires: ['costume_full', 'carry_statue'] },
          { text: 'ruokakaupassa?', requires: ['carry_statue'] },
          { text: 'aina tavatessasi sukulaisia?', requires: ['costume_full', 'dress_like', 'carry_statue'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 14,
    category: 'superpowers',
    text: 'Valitse maaginen kyky:',
    fragments: [
      {
        options: [
          { text: 'saada jokainen huoneessa aloittamaan tekemisen', type: 'start', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: 'pysäyttää välittömästi kenet tahansa tekemästä', type: 'stop', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity] },
          { text: 'ansaita 10 $ aina kun lopetat tekemisen', type: 'earn', scene: 'money', hints: [PROMPTS.actionChore, PROMPTS.humanActivity] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: '?' },
          { text: '— mutta sitä voi käyttää vain kerran päivässä?' },
          { text: '— mutta se toimii vain kavereihisi?', requires: ['start', 'stop'] },
          { text: '— mutta se toimii vain yli 30-vuotiaisiin?', requires: ['start', 'stop'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 15,
    category: 'mind',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'saada välittömästi henkilön koko elämänkokemuksen:', type: 'exp' },
          { text: 'imeyttää välittömästi henkilön kaikki muistot ja taidot:', type: 'skills' }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: '— mutta puhuisit lopullisesti hänen äänellään?' },
          { text: '— mutta näyttäisit vihastuessasi täysin häneltä?' },
          { text: '?' }
        ]
      }
    ],
    hints: [PROMPTS.historical, PROMPTS.singer, PROMPTS.actor, PROMPTS.politician, PROMPTS.mediaPersonality]
  },
  {
    id: 16,
    category: 'identity',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'vaihtaa kehoja henkilön kanssa:', type: 'switch', hints: [PROMPTS.profession, PROMPTS.mediaPersonality] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'lopuksi elämäksenne?' },
          { text: 'joka ikinen maanantai loppuelämäksi?' },
          { text: 'joka viikonloppu seuraavat 10 vuotta?' },
          { text: 'yhdeksi satunnaispäiväksi joka kuussa?' },
          { text: 'tasan vuodeksi ja sitten takaisin normaaliksi?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 17,
    category: 'entertainment',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'järjestää 12 tunnin katselumaratonin aiheesta', type: 'watch', hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.sport, PROMPTS.actionEmbarrassing] },
          { text: 'esiintyä pikkubudjettimusikaalissa aiheesta', type: 'musical', hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame, PROMPTS.actionChore, PROMPTS.personalInterest] },
          { text: 'kirjoittaa 100-sivuisen fanifiktiota aiheesta', type: 'fanfic', hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.videoGame, PROMPTS.politician, PROMPTS.abstractMood] },
          { text: 'nauhoittaa 3 tunnin raivon aiheesta', type: 'rant', scene: 'report', hints: [PROMPTS.movie, PROMPTS.videoGame, PROMPTS.tvShow, PROMPTS.annoyingHabit] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'ja pysäyttää 5 min välein selittääksesi juonta?', requires: ['watch'] },
          { text: 'ja julkaista sen netissä?', requires: ['musical', 'fanfic', 'rant'] },
          { text: 'ja lähettää sen kaikille puhelinkontakteillesi?', requires: ['musical', 'fanfic', 'rant'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 18,
    category: 'adventure',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'teleportoitua satunnaisesti paikkaan', type: 'location', scene: 'welcomeTo', hints: [PROMPTS.country, PROMPTS.famousCity] },
          { text: 'teleportoitua suoraan henkilön kotiin:', scene: 'welcomeTo', type: 'person', hints: [PROMPTS.actor, PROMPTS.singer, PROMPTS.politician, PROMPTS.historical] },
          { text: 'teleportoitua maagisesti paikkaan', type: 'place', scene: 'welcomeTo', hints: [PROMPTS.specificLocation, PROMPTS.publicPlace] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'tasan 24 tunniksi?' },
          { text: 'lopuksi elämäksesi?', requires: ['location', 'place'] },
          { text: 'ilman paluutietä?' },
          { text: 'mutta saapuisit klovnina?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 19,
    category: 'identity',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'että kaikki väittäisivät sinun näyttävän kuin', type: 'look', hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.animalFunny, PROMPTS.cartoonChar] },
          { text: 'että yhteiskunta kohtelisi sinua kuin henkilöä', type: 'status', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.profession, PROMPTS.fictionalChar] },
          { text: 'muuttua pysyvästi olennoksi', type: 'morph', hints: [PROMPTS.fictionalChar, PROMPTS.chubbyAnimal, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'aina kun yrität olla vakava?', requires: ['look', 'status'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 20,
    category: 'social',
    canTriggerCombo: true,
    text: 'Kumman valitsisit: sinulla olisi',
    fragments: [
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”' }
        ]
      },
      {
        options: [
          { text: 'pomona?', scene: 'boss', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor] },
          { text: 'parhaana kaverina?', scene: 'bestFriend', hints: [PROMPTS.cartoonChar, PROMPTS.chubbyAnimal, PROMPTS.dogBreed, PROMPTS.fictionalChar] },
          { text: 'vannoutuneena vihollisena?', scene: 'enemy', hints: [PROMPTS.villain, PROMPTS.historical, PROMPTS.mediaPersonality] },
          { text: 'psykoterapeuttina?', scene: 'psychotherapist', type: 'therapist', hints: [PROMPTS.historical, PROMPTS.actor, PROMPTS.singer, PROMPTS.mediaPersonality] },
          { text: 'sparrauskumppanina?', scene: 'sparringPartner', hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical] },
          { text: 'kuntovalmentajana?', scene: 'danceFitness', hints: [PROMPTS.actor, PROMPTS.fastAnimal, PROMPTS.villain, PROMPTS.singer] },
          { text: 'kuuliaisena alaisena?', scene: 'subordinate', hints: [PROMPTS.politician, PROMPTS.villain, PROMPTS.historical, PROMPTS.actor] },
          { text: 'hovimestarina?', hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.fictionalChar] },
          { text: 'lastenhoitajana?', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor, PROMPTS.cartoonChar] },
          { text: 'matikanopettajana?', scene: 'mathTeacher', hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.singer] },
          { text: 'kuvataideopettajana?', scene: 'artTeacher', hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.heavyAnimal] },
          { text: 'tanssinopettajana?', scene: 'danceFitness', hints: [PROMPTS.politician, PROMPTS.heavyAnimal, PROMPTS.villain, PROMPTS.cartoonChar] },
          { text: 'joogaopettajana?', scene: 'yogaTeacher', hints: [PROMPTS.villain, PROMPTS.dangerousAnimal, PROMPTS.politician, PROMPTS.actor] },
          { text: 'uber-kuskina?', scene: 'uberDriver', hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.chubbyAnimal, PROMPTS.singer] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 21,
    category: 'naming_realm',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'vaihtaa maan nimeksi', type: 'renameCountry', scene: 'welcomeTo', hints: [PROMPTS.company, PROMPTS.chubbyAnimal, PROMPTS.everyday, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'vaihtaa kaupungin nimeksi', type: 'renameCity', scene: 'welcomeTo', hints: [PROMPTS.snack, PROMPTS.everyday, PROMPTS.company, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] }
        ]
      },
      {
        options: [
          { text: '[ ... ]maa vai [ ... ]maa?', requires: ['renameCountry', 'renameCity'] },
          { text: '[ ... ]la vai [ ... ]la?', requires: ['renameCity'] },
          { text: '[ ... ]kylä vai [ ... ]kylä?', requires: ['renameCity'] },
          { text: '[ ... ]-tasavalta vai [ ... ]-tasavalta?', requires: ['renameCountry'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 22,
    category: 'social',
    canTriggerCombo: true,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'että lempisananlauseesi olisi', type: 'catchphrase' },
          { text: 'että joudut huutamaan ääneen', type: 'yell' }
        ]
      },
      {
        options: [
          { text: '”Pyhä [ ... ]!” vai ”Pyhä [ ... ]!”' },
          { text: '”Voi [ ... ]!” vai ”Voi [ ... ]!”' },
          { text: '”[ ... ] voittaa!” vai ”[ ... ] voittaa!”' },
          { text: '”Mitä ihmeen [ ... ]?” vai ”Mitä ihmeen [ ... ]?”' }
        ]
      },
      {
        options: [
          { text: 'aina astuessasi huoneeseen?' },
          { text: 'aina istuessasi?' },
          { text: 'vastatessasi puhelimeen?' },
          { text: 'yllättyessäsi?' },
          { text: 'aivastaessasi?' },
          { text: 'joutuessasi kiusalliseen tilanteeseen?' }
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
    category: 'naming',
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'tulla suuntauksen henkiseksi johtajaksi:', scene: 'spiritual' },
          { text: 'kirjoittaa 1000-sivuinen manifesti suuntauksesta', type: 'manifesto', scene: 'fanfic' },
          { text: 'elää tiukasti suuntauksen mukaan:', scene: 'report' },
          { text: 'saada hallituksesi ottamaan käyttöön suuntauksen', scene: 'ideology' },
          { text: 'saada vanhempasi seuraamaan suuntausta', scene: 'report' },
          { text: 'saada kaverisi seuraamaan suuntausta', scene: 'report' },
          { text: 'kieltää pysyvästi suuntauksen', scene: 'ban' },
          { text: 'opiskella suuntauksen historiaa:', type: 'explain', scene: 'fanfic' }
        ]
      },
      {
        options: [
          { text: '[ ... ]ismi vai [ ... ]ismi?' }
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
    category: 'naming',
    canTriggerCombo: false,
    text: 'Kumman valitsisit:',
    fragments: [
      {
        options: [
          { text: 'vaihtaa sukunimesi sukunimeksi', type: 'own_name', hints: [PROMPTS.title, PROMPTS.app, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.letterM] },
          { text: 'perustaa kansallisen juhlapäivän nimeltä', type: 'holiday', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.personalLike] },
          { text: 'adoptoida koiran ja antaa sille nimeksi', type: 'dog', scene: 'dog', hints: [PROMPTS.title, PROMPTS.politician, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: 'adoptoida kissan ja antaa sille nimeksi', type: 'cat', scene: 'cat', hints: [PROMPTS.villain, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] }
        ]
      },
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 101,
    isCombo: true,
    triggerCategory: ['animals', 'survival', 'social', 'mind', 'identity'],
    category: 'combo',
    text: 'Kun sinua jahtaa vihainen ”[PREV_CHOICE]”, kumpi olisi suojelijanasi:',
    fragments: [
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?', scene: 'protector' }
        ]
      }
    ],
    hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical, PROMPTS.cartoonChar, PROMPTS.fictionalChar]
  },
  {
    id: 102,
    isCombo: true,
    triggerCategory: ['animals', 'survival', 'lifestyle', 'social', 'mind', 'identity'],
    category: 'combo',
    text: 'Jos olet vihamielisen ”[PREV_CHOICE]” kanssa samassa huoneessa, kumpi olisi tukenasi:',
    fragments: [
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?', scene: 'protector' }
        ]
      }
    ],
    hints: [PROMPTS.kitchenItem, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.actor, PROMPTS.profession]
  },
  {
    id: 103,
    isCombo: true,
    triggerCategory: ['career', 'superpowers'],
    category: 'combo',
    text: 'Vakuuttaaksesi pomolle, että ”[PREV_CHOICE]” on yritykselle elintärkeä, esittäisitkö',
    fragments: [
      {
        options: [
          { text: '100-sivuisen raportin aiheesta ”[ ... ]” vai ”[ ... ]”?', scene: 'report' }
        ]
      }
    ],
    hints: [PROMPTS.complicatedTopic, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.actionIllegal, PROMPTS.schoolSubject, PROMPTS.actionEmbarrassing]
  },
  {
    id: 104,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Kun olet valtion ”[PREV_CHOICE]” ylin johtaja, kummasta tulisi valtioideologia:',
    fragments: [
      {
        options: [
          { text: '[ ... ]ismi vai [ ... ]ismi?', scene: 'ideology' }
        ]
      }
    ],
    hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.company, PROMPTS.abstractMood]
  },
  {
    id: 105,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Kun olet valtion ”[PREV_CHOICE]” ylin johtaja, perustaisit kansallisen juhlapäivän:',
    fragments: [
      {
        options: [
          { text: '[ ... ]-päivä vai [ ... ]-päivä?' }
        ]
      }
    ],
    hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.app]
  },
  {
    id: 106,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Kun olet valtion ”[PREV_CHOICE]” johtaja, laitatko',
    fragments: [
      {
        options: [
          { text: 'jättimäisen ”[ ... ]” vai ”[ ... ]” lippuunne?' },
          { text: 'kuvan aiheesta ”[ ... ]” vai ”[ ... ]” kansalliseen valuuttaanne?', scene: 'money' }
        ]
      }
    ],
    hints: [PROMPTS.animalFunny, PROMPTS.angryAnimal, PROMPTS.fastFood, PROMPTS.everyday, PROMPTS.survivalTool, PROMPTS.kitchenItem]
  },
  {
    id: 107,
    isCombo: true,
    triggerCategory: ['social', 'identity', 'animals'],
    category: 'combo',
    text: 'Mikä on todennäköisin kohtaaminen pelaajan [PICKER] ja olennon ”[PREV_CHOICE]” välillä:',
    fragments: [
      {
        options: [
          { text: '”[ ... ]” vai ”[ ... ]”?' }
        ]
      }
    ],
    hints: [PROMPTS.actionParty, PROMPTS.actionExtreme, PROMPTS.actionChore, PROMPTS.actionEmbarrassing, PROMPTS.actionWork]
  }
];
