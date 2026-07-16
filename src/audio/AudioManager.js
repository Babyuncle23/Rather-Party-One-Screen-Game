export class AudioManager {
  constructor() {
    this.audioPool = {};
    this.volume = 0.5; 
    this.enabled = true;
    this.isScreenReaderMode = false; // Режим доступности
    this.isVoiceWarmedUp = false;    // Прогрев TTS
    this.cancelQueue = false;        // Флаг прерывания очереди TTS
    this.isRallyEnglish = false;     // Режим финского акцента
    
    this.audioPool.click = this.createAudioPool('src/audio/click.mp3', 3);
    this.audioPool.win = this.createAudioPool('src/audio/win.mp3', 2);
    this.audioPool.lose = this.createAudioPool('src/audio/lose.ogg', 2);
    
    // Пул для фанфар (одного инстанса достаточно)
    this.audioPool.fanfare = this.createAudioPool('src/audio/fanfare.mp3', 1);
    
    this.loadSettings();
    
    this.audioCtx = null;
    this.typewriterBuffer = null;
    this.flapBuffer = null;
    this.isPreloaded = false;
  }

  createAudioPool(src, count) {
    const pool = [];
    for (let i = 0; i < count; i++) {
      // Ищем уже существующий элемент в DOM (полезно для предзагрузки)
      let audio = document.querySelector(`audio[src="${src}"]`);
      if (!audio) {
        audio = new Audio(src);
      }
      audio.volume = this.volume;
      pool.push(audio);
    }
    return pool;
  }

  getPooledAudio(type) {
    const pool = this.audioPool[type];
    if (!pool) return null;
    const startTime = (type === 'click') ? 0.10 : 0;
    
    for (let audio of pool) {
      if (audio.paused || audio.ended) {
        audio.currentTime = startTime;
        return audio;
      }
    }
    const audio = pool[0];
    audio.currentTime = startTime;
    return audio;
  }

  play(type, volumeOverride = null) {
    if (!this.enabled) return;
    const audio = this.getPooledAudio(type);
    if (!audio) return;
    
    audio.volume = volumeOverride !== null ? volumeOverride : this.volume;
    audio.play().catch(err => console.debug(`Audio prevented: ${err.message}`));
  }

  // Асинхронное проигрывание эффекта (для ожидания завершения фанфар)
  playAsync(type, volumeOverride = null) {
    return new Promise((resolve) => {
      if (!this.enabled || this.cancelQueue) {
        resolve();
        return;
      }
      const audio = this.getPooledAudio(type);
      if (!audio) {
        resolve();
        return;
      }
      
      audio.volume = volumeOverride !== null ? volumeOverride : this.volume;
      audio.onended = () => resolve();
      audio.play().catch(err => {
        console.debug(`Audio prevented: ${err.message}`);
        resolve();
      });
    });
  }

  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    Object.values(this.audioPool).forEach(pool => {
      pool.forEach(audio => audio.volume = this.volume);
    });
    this.saveSettings();
  }

  getVolume() { return this.volume; }

  toggleEnabled() {
    this.enabled = !this.enabled;
    this.saveSettings();
    return this.enabled;
  }

  isEnabled() { return this.enabled; }

  setScreenReaderMode(isSR) {
    this.isScreenReaderMode = isSR;
    if (isSR) this.stopSpeech();
  }
toFinglish(text) {
    if (!text) return text;
    
    // 1. Словарь частых исключений, системных фраз и всех эмодзи
    const dict = {
      // Фразы
      "1000-page": "tausand-peidz",
      " 1000 ": " tausand ",
      " 100 ": " handred ",
      " 60 ": " siksti ",
      " 10 ": " ten ",
      " 9 ": " nain ",
      " 8 ": " eit ",
      " 7 ": " seven ",
      " 6 ": " siks ",
      " 5 ": " faiv ",
      " 4 ": " foor ",
      " 3 ": " trii ",
      " 2 ": " tuu ",
      " 1 ": " van ",
      " 0 ": " siirou ",
      "would you rather": "vud ju raater",
      "pass the phone to": "paas tö foun tuu,",
      "choose an emoji": "tsuus en emoji",
      "only this player": "onli tis pleijer",
      "should look at the phone": "šuud luuk ät tö foun",
      "keep it hidden from others": "kiip it hidden from aatörs",
      "time to play": "taim tu plei",
      "next up is": "nekst ap is",
      "hand the device over to": "händ tö divais över tu",
      "vinnie": "vinni",
      "gummy": "gammi",
      "it is": "it is",
      "world": "vorld",
      "pizza": "pizza",
      "sauce": "soos",
      " be ": " bii ",
      "able": "ebl",
      "anywhere": "eniver",
      "k-pop":"kei-pop",
      " the ":" tee ",
      " about ": " ebaut ",
      "question":"kvesson",
      "mandatory ":"mandatori ",
      "history":"histori",
      "heavy":"hevi",
      "alongside": "alongsaid",
      "your":"jor",
      "capybara":"kapibara",
      "pug":"pag",
      "destroy": "destroi", 
      "every": "evri",
      "copy": "kopi",
      "frends": "frendit",
      "have": "hev",
      "dirt": "djört",
      "right": "rait",
      "watch": "vots",
      "chocolate": "tsokolat",
      "doritos": "dorios",
      "dutch": "dats", 
      "bad": "bed",
      " mud ": " mad ",
      "huge": "huge",
      "teeth": "tiis",
      "silent": "sailent",
      "johnson": "jonsson", 
      " belt " : " belt ",
      " leather ": "leatser",
      "instantly": "instantli", 
      " all ": " ool ", 
      "small": "smol",
      "fortnite ": "fortnait ",
      "you": "juu", 
      "switch": "svits",
      "bodies": "bodis",
      "down": "daun",
      "own": "oun",
      "appear": "apiar",
      "body": "bodi",
      " no " : " nou ",
      "role" : "rol",
      "know" : "nou",
      " one " : " van ",
      " tom ": " tom ",
      " cruise " : "crus",
      "when": "ven",
      "only": "onli",
      "but": ", bat",
      "end": "end",
      "and": "änd",
      "fries": "frais",
      "power": "pover",
      "bag ": "bägi ",
      "bags ": "bägit",
      "chased": "tseist", 
      "lose": "luus",
      "fine": "fain",
      "hours": "avers",
      " a ": " e ", 
      " tie ": " tai ",
      " fallon " : " fellon ",
      "rock" : "rok",
      "climb": "klaimb", 
      "during": "djuring",
      "toilet": "toilet", 
      "forced": "forst", 
      "howard": "hovard",
      "curry": "karri",
      " sacrifice ": "sakrifais",
      "synthesizer": "syntikka",
      "swallow": "svolou",
      "carry": "kerri",
      " us ": "aas",
      "laughing": "lafing",
      "company": "kompani",
      "light": "lait", 
      "newfoundland": "njufaundland", 
      " out ": " aut ",
      "always": "olveis",
      "arrive": "eraiv",
      "exactly": "eksaktli",
      "like": "laik",
      "pirate": "pairat", 
      "teemu": "teemu",
      "larry": "larri",
      "desert": "desört",
      "island": "ailand",
      "lighter": "laiter",
      "game": "geim",
      "package": "pakkaus",
      " that": " ,teet", 
      "rope": "roup",
      "duty": "djuti",
      "needle": "nidl",
      "pager": "peiger",
      " the ": " tee ",
      "while": "vail",
      "police": "poliisi",
      "metallica": "metalikka",
      "youtube": "jutub",
      "face": "feis",
      "elevator": "elevator",
      "sweat": "sveat",
      "cassette": "kasset", 
      "life": "laif",
      "tiny": "taini",
      "teenager": "tineiger", 
      "society":  "sosaeti",
      "high": "hai",
      "critique" : "kritik", 
      " mime ": "maim", 
      "without": "wisaut",
      "twilight": "tvailait",
      "year ": "jiir",
      "two": "tuu",
      "run": "ran",
      "back": "bäk", 
      "where": "ver",
      "phone": "foun",
      "toothpaste": "toospeist",
      "saw": "sau",
      "key": "kii",
      " keys ": " kiijs ",
      "popeye": "popai",
      "brown" : "braun",
      "samuel": "samuli",
      "chose": "tsos",
      "puddle": "padl",
      "voice": "vois",
      " or ": " , oor , ",
      "doing": "duuing",
      " do ": " du ",
      "cucumber": "kukamber",
      "karate": "karate",
      "4-hour": "for-aver",
      "strength": "strengt",
      "once": "vans",
      " are ": " ar ",
      "for": "for" ,
      "flashlight": "fleslait",
      "were": "wjör",
      "using": "jusing",
      "sized": "saisd",
      "ksi": "kei-es-ai",
      "writers": "vraiters",
      "type": "taip",
      "shampoo": "sampuu",
      "cotton": "kotton",
      "head": "heed",
      " unironically ": " anaironikali ", 
      "stick": "stik",
      "genghis khan": "gengis kan",
      "million": "million", 
      " it ": " iit ",
      "stares": "steires",
      "swedish": "swidish", 
      "astronaut": "astranaut",
      "single" : "singl", 
      "fly" : "flai",
      "raised": "reist",
      " beyoncé ": " biijonse ", 
      "gang": "geng",
      "conversation": "konversation",
      "vely ": "vli ",
      "nervous": "nervös",
      "terrible": "terribl",
      "magically": "magikali", 
      "supply": "saplai", 
      "analyzing": "analaising",
      "become": "biikam",
      "low-budget": "lou-budget",
      "diver": "daiver",
      "biden": "baiden",
      "shopping": "sopping",
      "cally": "calli",
      "black": "blek",
      "cry": "krai",
      "swallow": "svolou",
      " by": " bai",
      "birth": "börs",
      "rush": "ras",
      "channel": "tsannel",
      "create": "kriieit",
      "something": "somting" ,
      "else": "els",
      "axe ": "aks ",
      "joe": "juuso",
      "queen": "kvin",
      "elizabeth": "elisabet",
      "mind": "maint",
      "year": "jiar",
      "turn" : "tjörn",
      "smartphones": "smartfons", 
      "sticky": "stiki",
      "share": "seir", 
      " teach ": " tiats",
      "knife": "naif",
      "johnny": "jonni",
      " page ": ",page", 
      "physically": "fisikali",
      " monkey " : " monki ",
      "gum": "gam",
      " cloud ": " klaud ",
      " invited ": "invaited",
      " jump " : " ,jump ",
      "first": "fjörst",
      "interview": "intervju",
      "receive": "resiv",
      " any ": " eni ",
      "harry potter": "harri potteri",
      "both": "bos",
      " guilty ": " gilti ",
      "should": "suud",
      "breathe": "briis",
      "sneeze": "sniis",
      "school": "skuul",
      "pewdiepie" : "pju-di-pai",
      "jimmy": "jimmi",
      "sci-Fi": "ski-fi",
      "future": "future",
      "portuguese": "portugis",
      "acoustic": "akustik", 
      "tourists": "tursits",
      "can watch": "kän vats",
      // Слова из вопросов 18-21
      "private": "praivat",
      "universe": "junivers",
      "knowledge": "nouledz",
      "techniques": "tekniks",
      "martial": "marsial",
      "through": "truu",
      "walls": "vools",
      "genuinely": "genuinli",
      "believe": "biliiv",
      "appearance": "apiirans",
      "actual": "aktual",
      "serious": "siirios",
      "otherwise": "adörvais",
      "ruthless": "ruutles",
      "loyal": "loijal",
      "sworn": "svoorn",
      "therapist": "terapist",
      "obedient": "obiidient",
      "newborn": "njuuborn",
      "legally": "liigali",
      "honor": "onor",
      "new york": "njuu joork",
      "maternity": "metörniti",
      "vault": "voolt",
      "crybaby": "kraibeibi",
      "pookie": "puukii",
      "snookums": "snuukums",
      "goofball": "guufbool",
      "peanut": "piinat",
      "supreme": "supriim",
      "chief": "tsiif",
      "executive": "eksekutiv",
      "majesty": "madzesti",
      "poobah": "puuba",

      
      /*"":"",
      "":"",
      "":"", */

      "turn now": "törn nau",
      "this is your call only": "tis is joor kool ounli",
      "read the question and choose a prompt": "riid tö kvestion änd tsuus a prompt",
      "can watch the guessing process": "kän vats tö gessing prosess",
      "it's a draw": "its a droo",
      "finished with": "finist vit",
      "points": "points",
      "unbelievable": "anbiliivöböl",
      "first place is shared by": "föörst pleis is sääred bai",
      "the winner is": "tö vinner is",
      "other scores": "aatör skoors",
      "followed by": "folloud bai",
      "here is the history of all choices": "hiir is tö histori of ool tsoises",
      "creation": "kreation", 
      "rally english": "rälli englanti",
      " to ": " tuu ",
      " anyone ": " enivan ",
      // Эмодзи (Животные и существа)
      "fiery": "fajeri", "dangerous": "deintsörös",
      "fox": "foks", "panda": "panda", "cat": "kät", "dog": "dog", 
      "bunny": "bunni", "tiger": "taiger", "koala": "koala", "pig": "pig", 
      "cow": "kau", "monkey": "manki", "wolf": "volf", "lion": "laion", 
      "otter": "oottör", "sloth": "sloot", "chipmunk": "tsipmank", 
      "bat": "bät", "raccoon": "rakkuun", "penguin": "pengvin", 
      "owl": "aul", "bird": "böörd", "eagle": "iigöl", "duck": "dak", 
      "rooster": "ruustör", "baby chick": "beibi tsik", "peacock": "piikok", 
      "dove": "dove", "parrot": "parrot", "flamingo": "flamingo",
      "frog": "frog", "octopus": "oktopus", "turtle": "törtöl", 
      "lizard": "lisaard", "shrimp": "srimp", "crab": "krab", 
      "squid": "skvid", "shark": "saark", "lobster": "lobster", 
      "whale": "veil", "dolphin": "dolfin", "blowfish": "bloufis",
      "bee": "bii", "spider": "spaider",
      "dino": "dino", "t-rex": "tii-reks", "dragon": "dragon", "unicorn": "unikorn",
      // Эмодзи (Люди и роли)
      "baby": "beibi", "old man": "old män", "sensei": "sensei", 
      "ninja": "ninja", "super": "super", "supervillain": "supervillön", 
      "elf": "elf", "wizard": "visard", "cowboy": "kauboi", "cool": "kuul", 
      "nerd": "nörtti", "party": "paarti", "clown": "klaun", "angry": "ängri", 
      "goblin": "goblin", "ogre": "ogre", "skeleton": "skeleton", 
      "ghost": "gost", "alien": "alieni", "robo": "robo",
      // Эмодзи (Еда и растения)
      "watermelon": "votörmelon", "strawberry": "strooberi", "avocado": "avokado", 
      "pineapple": "painäppöl", "kiwi": "kiivi", "tangerine": "tändžöriin", 
      "cherries": "tserriis", "lemon": "lemon", "apple": "aple", 
      "mango": "mango", "coconut": "kokonat", "flower": "flauör", 
      "sunflower": "sanflauör", "mushroom": "masruum", "rose": "rose", 
      "moonface": "muunfeis",
      "alone": "eloun", "strawberry" : "strouberri",
      "great": "greit",
      "to?": "tuu?",
      "thought": "sout"
      
    
    };

    let processedText = text.toLowerCase();
    const maskedPhrases = [];

// Маскируем фразы из словаря
    for (const [eng, fin] of Object.entries(dict)) {
      if (processedText.includes(eng)) {
        // Динамически переносим пробелы из оригинального слова в маску, 
        // чтобы не создавать ложных границ для других слов
        const prefix = eng.startsWith(' ') ? ' ' : '';
        const suffix = eng.endsWith(' ') ? ' ' : '';
        const mask = `${prefix}__MASK${maskedPhrases.length}__${suffix}`;
        
        maskedPhrases.push({ mask, fin });
        processedText = processedText.split(eng).join(mask);
      }
    }

    // Изолируем слово "to", чтобы не читалось как "torstai"
    processedText = processedText.replace(/\bto\b/g, 'tu');

    // 2. Удаление немых букв
    processedText = processedText.replace(/\bkn/g, 'n');
    processedText = processedText.replace(/\bwr/g, 'r');
    processedText = processedText.replace(/mb\b/g, 'm');
    processedText = processedText.replace(/igh/g, 'ai');
    

    // 3. Гласные (Дифтонги)
    processedText = processedText.replace(/ay|ey|ai/g, 'ei');
    processedText = processedText.replace(/ee|ea/g, 'ii');
    processedText = processedText.replace(/oo/g, 'uu');
    processedText = processedText.replace(/ou|ow/g, 'au');
    processedText = processedText.replace(/aw|au/g, 'oo');

// 4. Согласные и суффиксы
    processedText = processedText.replace(/sh/g, 's');
    processedText = processedText.replace(/ph/g, 'f');
    processedText = processedText.replace(/ch/g, 'ts');
    processedText = processedText.replace(/th/g, 't'); 
    processedText = processedText.replace(/wh/g, 'v'); // НОВОЕ: what/when -> vat/ven
    
    // Добавь эту строку для удаления "h" на конце слов:
    processedText = processedText.replace(/h\b/g, '');
    
    processedText = processedText.replace(/w/g, 'v');
    
    // Твои специфические правила суффиксов
    processedText = processedText.replace(/alyzing\b/g, 'alaising');
    processedText = processedText.replace(/izing\b/g, 'aising');
    processedText = processedText.replace(/ize\b/g, 'ais');
    processedText = processedText.replace(/ise\b/g, 'ais');
    processedText = processedText.replace(/ape\b/g, 'eip');
    processedText = processedText.replace(/ire\b/g, 'air');
    processedText = processedText.replace(/ate\b/g, 'eit');
    processedText = processedText.replace(/ew\b/g, 'ju');
    processedText = processedText.replace(/ime\b/g, 'aim');
    processedText = processedText.replace(/ture\b/g, 'tsur'); // НОВОЕ: future -> fjutsur
    
    processedText = processedText.replace(/ck/g, 'k');
    
    // ИЗМЕНЕНО: Универсальное правило для "y" на конце слов (заменяет старые ly и dy)
    // Убирает баг с пробелом и чинит слова вроде party, funny, hobby
    processedText = processedText.replace(/y\b/g, 'i'); 
    
    // Обработка c и x
    processedText = processedText.replace(/c(?=[eiy])/g, 's');
    processedText = processedText.replace(/c/g, 'k');
    processedText = processedText.replace(/x/g, 'ks');
    // Правило ct -> kt удалено за ненадобностью
    
    // Остальные
    processedText = processedText.replace(/tion/g, 'sson');
    processedText = processedText.replace(/sion/g, 'sson'); // НОВОЕ: version -> versson
    processedText = processedText.replace(/tial/g, 'sial');
    processedText = processedText.replace(/q/g, 'kv');


    // Размаскировываем сохраненные словарные фразы
    maskedPhrases.forEach(({ mask, fin }) => {
      processedText = processedText.split(mask).join(fin);
    });

    return processedText;
  }

  saveSettings() {
    localStorage.setItem('audioVolume', this.volume.toString());
    localStorage.setItem('audioEnabled', this.enabled.toString());
  }

  setRallyEnglishMode(isRally) {
    this.isRallyEnglish = isRally;
  }

  checkFinnishVoiceExists() {
    if (!window.speechSynthesis) return false;
    const voices = window.speechSynthesis.getVoices();
    // Проверяем разные форматы написания языкового кода
    return voices.some(v => v.lang === 'fi-FI' || v.lang === 'fi_FI');
  }

checkFinnishVoiceExistsAsync() {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve(false);
        return;
      }

      // Функция для проверки наличия финского голоса
      const checkForFi = () => {
        const voices = window.speechSynthesis.getVoices();
        return voices.some(v => v.lang === 'fi-FI' || v.lang === 'fi_FI');
      };

      // 1. Быстрая проверка: если нужный голос уже в списке
      if (checkForFi()) {
        resolve(true);
        return;
      }

      // 2. Если финского пока нет (список пуст ИЛИ загружены только базовые голоса), 
      // подписываемся на событие обновления списка голосов
      window.speechSynthesis.onvoiceschanged = () => {
        if (checkForFi()) {
          resolve(true);
          // Очищаем обработчик, чтобы не висел в памяти
          window.speechSynthesis.onvoiceschanged = null; 
        }
      };

      // 3. Принудительно вызываем getVoices(), чтобы "пнуть" движок в iOS/Chrome
      window.speechSynthesis.getVoices();

      // 4. Страховочный таймаут (2.5 секунды). 
      // Если за это время событие не нашло финский голос, значит его точно нет на устройстве.
      setTimeout(() => {
        resolve(checkForFi());
      }, 5000);
    });
  }

  loadSettings() {
    const savedVolume = localStorage.getItem('audioVolume');
    const savedEnabled = localStorage.getItem('audioEnabled');
    if (savedVolume !== null) this.volume = parseFloat(savedVolume);
    if (savedEnabled !== null) this.enabled = savedEnabled === 'true';
  }

  async preloadRevealSounds() {
    if (this.isPreloaded || !this.enabled) return;
    try {
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const loadBuffer = async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioCtx.decodeAudioData(arrayBuffer);
      };
      const [typewriter, flap] = await Promise.all([
        loadBuffer('src/audio/typewriter.mp3'),
        loadBuffer('src/audio/flap.mp3')
      ]);
      this.typewriterBuffer = typewriter;
      this.flapBuffer = flap;
      this.isPreloaded = true;
    } catch (err) { console.debug("Preloading failed:", err.message); }
  }

  async playRevealCombo() {
    if (!this.enabled) return;
    try {
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.audioCtx.state === 'suspended') await this.audioCtx.resume();
      if (!this.isPreloaded) await this.preloadRevealSounds();
      if (!this.typewriterBuffer || !this.flapBuffer) return;

      const now = this.audioCtx.currentTime;
      const flapSource = this.audioCtx.createBufferSource();
      flapSource.buffer = this.flapBuffer;
      const flapGain = this.audioCtx.createGain();
      flapGain.gain.value = this.volume;
      flapSource.connect(flapGain);
      flapGain.connect(this.audioCtx.destination);
      flapSource.start(now);

      const typewriterSource = this.audioCtx.createBufferSource();
      typewriterSource.buffer = this.typewriterBuffer;
      const typewriterGain = this.audioCtx.createGain();
      typewriterGain.gain.value = Math.min(1.0, this.volume * 1.6);
      typewriterSource.connect(typewriterGain);
      typewriterGain.connect(this.audioCtx.destination);
      typewriterSource.start(now, 1.0, 2.0);
    } catch (err) { console.debug("Instant audio combo failed:", err.message); }
  }

// Обычный вызов с колбэком onstart (для лоадера)
  speak(text, onStartCallback = null) {
    if (!this.enabled || !window.speechSynthesis || this.isScreenReaderMode) {
      if (onStartCallback) onStartCallback();
      return;
    }
    
    window.speechSynthesis.cancel();
    this.cancelQueue = false;
    
    // Принудительно опускаем в нижний регистр для финского, чтобы избежать чтения по буквам
    const finalVoiceText = this.isRallyEnglish ? this.toFinglish(text).toLowerCase() : text;
    const utterance = new SpeechSynthesisUtterance(finalVoiceText);
    if (this.isRallyEnglish) {
      utterance.volume = Math.min(this.volume * 1.0, 1.0); // Изменено с 2 на 1.25
      utterance.lang = 'fi-FI';
      utterance.rate = 0.8; // На 25% медленнее
    } else {
      utterance.volume = this.volume;
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
    }
    
    if (onStartCallback) {
      let hasFired = false;
      const fireCallback = () => {
        if (!hasFired) {
          hasFired = true;
          onStartCallback();
        }
      };

      // 1. Срабатывает ровно тогда, когда браузер физически начинает воспроизведение
      utterance.onstart = fireCallback;
      
      // 2. Дополнительная страховка: если браузер пропустил onstart, 
      // но начал воспроизводить первое слово или звук
      utterance.onboundary = fireCallback;

      // 3. Если произошла ошибка движка (нет интернета, сбой iOS)
      utterance.onerror = fireCallback;

      // Технический предохранитель от софт-лока игры (зависания навсегда).
      // Если через 10 секунд голос так и не смог заговорить из-за сбоя системы устройства,
      // мы принудительно пускаем игрока дальше. Это НЕ фейковая задержка, 
      // а защита от сломанного API в некоторых телефонах.
      setTimeout(fireCallback, 10000); 
    }
    
    window.speechSynthesis.speak(utterance);
  }

  // Promise-обертка для управления очередью на финальном экране
  speakAsync(text) {
    return new Promise((resolve) => {
      if (!this.enabled || !window.speechSynthesis || this.isScreenReaderMode || this.cancelQueue) {
        resolve();
        return;
      }
      
      // Принудительно опускаем в нижний регистр для финского
      const finalVoiceText = this.isRallyEnglish ? this.toFinglish(text).toLowerCase() : text;
      const utterance = new SpeechSynthesisUtterance(finalVoiceText);
      if (this.isRallyEnglish) {
        utterance.volume = Math.min(this.volume * 1.25, 1.0); // Изменено с 2 на 1.25
        utterance.lang = 'fi-FI';
        utterance.rate = 0.75;
      } else {
        utterance.volume = this.volume;
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      
      window.speechSynthesis.speak(utterance);
    });
  }

  stopSpeech() {
    this.cancelQueue = true;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

