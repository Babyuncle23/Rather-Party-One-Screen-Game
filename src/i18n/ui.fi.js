// =====================================================================
// SUOMENKIELINEN UI-SANASTO — mirror of ui.en.js.
// Pelaajien nimet asetetaan ainoastaan nominatiivisopiviin paikkoihin
// (appositio / kaksoispiste) — syötettyjä nimiä ei voida taivuttaa.
// =====================================================================

export const UI_FI = {
  meta: { name: 'Suomi' },

  misc: {
    loading: 'Ladataan...',
    tapToContinue: '👇 Jatka napauttamalla',
    reconnecting: 'Yhdistetään uudelleen…',
    reconnectSub: 'Yritetään tavoittaa huonepalvelin',
    hostWait: '⏳ Odotetaan isännän paluuta…',
    oralBanner: '🗣️ Anna suullinen vihje ääneen!',
    oralDone: 'Valmis',
    emojiPickerTitle: 'Valitse emoji',
    emojiPickerSub: 'Valitse tyyliisi sopiva kuvake.',
    videoTitle: 'Näin pelataan',
    shareQr: 'Piditkö tästä pelistä? Jaa linkki muille QR-koodilla 😊',
    shareQrAlt: 'QR-koodi — linkki peliin',
    footerBadge: 'Designed by Human',
    footerSub: 'coded by ai 😬',
    iosTitle: '🍏 Asenna iPhoneen'
  },

  setup: {
    modeSoloTitle: '1 puhelin',
    modeSoloSub: 'Vuorotellen',
    modeOnlineTitle: '2–4 puhelinta',
    modeOnlineSub: 'Verkkohuone',
    lead: 'Valitse kysymykset ja näe, miten muut ovat vastanneet ✨',
    tutorial: 'Näin pelataan (23s)',
    tabCreate: 'Luo huone',
    tabJoin: 'Liity huoneeseen',
    avatarTitle: 'Vaihda avatar napauttamalla',
    nameOnlinePh: 'Nimesi',
    roomCodePh: 'HUONEKOODI',
    connectCreate: 'Luo huone',
    connectJoin: 'Liity huoneeseen',
    enterName: 'Syötä ensin nimesi!',
    enterCode: 'Syötä 4-kirjaiminen huonekoodi!',
    nameSoloPh: 'Pelaajan nimi',
    addPlayer: '+ Lisää',
    seatOrder: 'Lisää nimet siinä järjestyksessä, jossa pelaajat istuvat pöydän ääressä.',
    avatarHelp: 'Vaihda avatar napauttamalla.',
    roundsLabel: 'Kierrosten määrä:',
    start: 'Aloita peli',
    install: '📱 Asenna aloitusnäytölle',
    installIos: 'Pelataksesi koko näytön tilassa kuten oikeassa sovelluksessa:\n\n1. Napauta Jaa-painiketta (neliö, josta nuoli ylös) näytön alareunassa.\n2. Selaa alas ja napauta "Lisää Koti-valikkoon" ➕.',
    safetyBtn: 'Turva',
    safetyTip: 'Suositeltavaa lukea ennen aloittamista.',
    safetyTipAll: 'Suositeltavaa kaikkien pelaajien lukea ennen aloittamista.'
  },

  lobby: {
    title: 'Huoneen aula',
    shareHint: 'Jaa tämä koodi kavereille:',
    roundsLabel: 'Kierrosten määrä:',
    start: 'Aloita peli',
    leave: 'Poistu huoneesta',
    host: 'isäntä',
    offline: 'poissa',
    waitMore: 'Odotetaan vähintään yhtä pelaajaa lisää…',
    full: 'Huone on täynnä — enintään 4 pelaajaa',
    connected: '{n} pelaajaa yhdistetty — paina Aloita!',
    waitHost: 'Odotetaan, että isäntä aloittaa pelin…',
    qrAlt: 'QR-koodi — skannaa liittyäksesi huoneeseen'
  },

  turn: {
    suffix: ' — vuorosi',
    guessSuffix: ', arvaa!'
  },

  pass: {
    title: 'PUHELIN PELAAJALLE:',
    defaultNote: 'Vain tämä pelaaja saa katsoa puhelinta. Pidä se muilta piilossa.',
    phrases: [
      'Anna puhelin pelaajalle {emojiName} {name}.',
      'Ojenna laite pelaajalle {emojiName} {name}.',
      'Nyt on pelaajan {emojiName} {name} vuoro.',
      'Seuraava pelaaja: {emojiName} {name}.',
      'Pelaajan {emojiName} {name} vuoro alkaa.',
      'Puhelin siirtyy pelaajalle {emojiName} {name}.'
    ],
    phraseSimple: 'Anna puhelin pelaajalle {emojiName} {name}.',
    responderNote: 'Nyt on pelaajan {r} vuoro vastata pelaajan {p} aiheeseen.\nPidä puhelin muilta piilossa!',
    watchNote: 'Vain tämä pelaaja saa pitää puhelinta, mutta {name} saa katsoa!',
    guesserSpeech: 'Anna puhelin pelaajalle {emojiName} {name}, ja {responder} saa katsoa.',
    readyBtn: 'Olen {name} — pidä ✋',
    readyShort: 'Pidä painettuna vahvistaaksesi'
  },

  picker: {
    step1First: 'VAIHE 1: Valitse salaa kysymys pelaajalle {name} — hän ei näe sitä vielä!',
    step2First: 'VAIHE 2: Valitse aihe.',
    step2SubFirst: '{name} keksii sokeasti 2 sanaa tälle aiheelle — ne liitetään kysymykseesi!',
    step1: '👇 Valitse kysymys pelaajalle {name}',
    step1Sub: 'Tyhjät kohdat täytetään myöhemmin pelaajan {name} vastauksilla.',
    step2: '👇 Valitse aihe pelaajan {name} vastauksille',
    sendTo: 'Lähetä pelaajalle {name} ➜',
    editStart: '✍️ MUOKKAA KYSYMYSTÄ',
    editStop: '← PERUUTA MUOKKAUS',
    editSave: 'Tallenna muokkaukset',
    livePreview: 'Esikatselu',
    answerN: '[ ___ VASTAUS {n} ___ ]',
    customToggle: '✍️ TAI KIRJOITA OMA AIHEESI',
    backToPresets: '← TAKAISIN VALMISIIN AIHEISIIN',
    writeTopic: 'Kirjoita aihe tai palaa valmiisiin!'
  },

  responder: {
    nowChoose: 'Valitse nyt:',
    pluralWarn: '* Kirjoita molemmat vastaukset monikossa (esim. kissat, omenat)',
    ideas: '💡 Ideoita',
    hideIdeas: '🔼 Piilota ideat',
    firstPh: 'Ensimmäinen vastaus',
    secondPh: 'Toinen vastaus',
    submit: 'Lähetä vastaukset',
    blind1: 'SOKEA VAIHE 1/2: Kirjoita kaksi eri vastausta tähän aiheeseen.<span class="blind-step-sub">Näet heti perään, minkä hullun kysymyksen pelaaja {name} valmisti!</span>',
    blind2: 'SOKEA VAIHE 2/2: Valitse kumpi vastauksistasi voittaa — muut yrittävät arvata sen!',
    diffWords: 'Syötä 2 eri sanaa!'
  },

  companion: {
    picking: '{emoji} {name} valitsee kysymystä: {target}…',
    targetYou: 'sinulle',
    pickingSub: 'Valmistaudu — vuorosi tulee pian!',
    typing: '{emoji} {name} kirjoittaa kahta vastausta…',
    typingSub: 'Katso, kun tyhjät täyttyvät livenä!',
    choosing: '{emoji} {name} näki juuri kysymyksen — valitsee salaa…',
    choosingSub: 'Valmistaudu arvaamaan!',
    typingInd: '✍️ kirjoittaa… <b>{n}/{max}</b>'
  },

  guesser: {
    callout: 'Napauta yhtä vastausta.',
    prompt: 'Aihe',
    maskCaption: '••• piilottaa minkä tahansa määrän kirjaimia',
    maskTitle: '1 tai useampi piilotettu kirjain',
    lettersBadge: '({n} kirjainta)',
    wallet: 'Lompakko',
    revealOpts: 'Paljastusvaihtoehdot',
    revealRand: 'Satunnaiset kirjaimet',
    revealLen: 'Sanapituus & ensimmäiset kirjaimet',
    costLine: '-{cost} pistettä',
    rollStatus: '💡 Yksi paljastus per vuoro: 🎲 -{a} / 📏 -{b} pistettä',
    rollSpent: '🔒 Paljastus käytetty',
    progressRound: 'KIERROS {a}/{b}',
    progressGuesser: 'ARVAAJA {a}/{b}',
    winPts: 'Voitto: +{n} pistettä',
    scoreLine: 'Pelaajan {name} pisteet: {n}',
    notEnough: 'Ei tarpeeksi pisteitä tähän paljastukseen!',
    notEnoughOral: 'Ei tarpeeksi pisteitä suulliseen vihjeeseen!',
    oralBtn: '💬 Pyydä suullinen vihje (-{n} pistettä)',
    oralTitle: '💬 Suullinen vihje käytössä!',
    oralExplain: 'Pyydä kaveriasi antamaan yksi rehellinen suullinen vihje tai assosiaatio hänen valinnastaan.\n\n(Esimerkiksi: "Tämä on konkreettinen esine" tai "Törmään tähän töissä")',
    spectating: '👀 {emoji} {name} arvaa — katso livenä!',
    spectatingYours: '👀 {emoji} {name} arvaa <b>sinun</b> vastaustasi — katso livenä!'
  },

  result: {
    title: 'Tulos',
    correct: '🎉 OIKEIN!',
    wrong: '❌ VÄÄRIN!',
    yourGuess: 'Arvauksesi',
    score: 'Pisteet',
    sentence: 'valitsi vaihtoehdon {word} kysymyksessä:',
    continue: 'Jatka ➜'
  },

  final: {
    gameOver: 'Peli ohi!',
    leaderboard: 'Tulostaulu',
    history: 'Otteluhistoria',
    stopVoice: '⏹ Pysäytä ääni',
    choicesBy: 'Pelaajan {name} valinnat',
    noChoices: 'Tämä pelaaja ei tehnyt valintoja.',
    round: 'Kierros {n}',
    points: 'pistettä',
    playAgain: 'Pelaa uudelleen (sama porukka)',
    waitHost: '⏳ Odotetaan, että isäntä aloittaa uudelleen…',
    speech: {
      draw2: 'Tasapeli! Sekä {a} että {b} saivat {n} pistettä.',
      drawAll: 'Uskomatonta! Kaikki pelasivat tasan. {names} saivat kaikki {n} pistettä.',
      sharedWin: 'Ensimmäinen sija jaetaan: {names} — {n} pistettä!',
      win: 'Voittaja on {name} — {n} pistettä!',
      followedBy: 'Seuraavaksi ',
      otherScores: 'Muut tulokset: ',
      withPts: '{name} — {n}',
      ptsWord: 'pistettä',
      historyIntro: 'Tässä kaikkien valintojen historia. ',
      and: ' ja '
    }
  },

  safety: {
    privTitle: '🌱 Turvatauko',
    privDesc: 'Mitään ei ole vielä tapahtunut. Peli on tauolla.<br>Vain sinä näet tämän näytön.',
    privPanelTitle: 'TURVALLISEMMAN TILAN PERIAATTEET:',
    priv1: '<strong>Oikeus lopettaa:</strong> henkilökohtaiset rajat ovat tärkeämpiä kuin pelipisteet.',
    priv2: '<strong>Kunnioitus ja mukavuus:</strong> pelaajat eivät tuomitse eivätkä pakota ketään katsomaan epämukavia aiheita.',
    priv3: '<strong>Yksityisyys:</strong> voit esikatsella turvavaihtoehtoja rauhassa.',
    back: '← Takaisin',
    next: 'Seuraava ➜',
    optsTitle: 'Turvavaihtoehdot',
    optsHint: 'Napauta vaihtoehtoa nähdäksesi lisätiedot.<br>Toiminnot vaativat 2 sekunnin painalluksen.',
    opt1: '🔄 Ohita tämä kierros',
    opt1Desc: 'Kierros perutaan. Peli arpoo uuden kysymyksen.',
    opt2: '💬 Avoin piiri (Puhutaan)',
    opt2Desc: 'Keskeyttää pelin ja avaa ystävällisen tekstinäytön koko porukalle.',
    opt3: '🛑 Lopeta peli & puhu avoimesti',
    opt3Desc: 'Lopettaa pelin välittömästi ja tallentaa pisteet.',
    opt4: '⏳ Aseta anonyymi poistumisajastin',
    opt4Desc: 'Valitse viive alle, ja peli päättyy automaattisesti myöhemmin.',
    flowCfg: 'ASETUS:',
    min0: '0 min',
    minPlus: '+1 min',
    currentMin: 'Nyt: {n} min',
    hold2s: 'Pidä 2s vahvistaaksesi',
    hold2sLong: 'Pidä 2s vahvistaaksesi',
    holding: 'Pidetään...',
    backToGame: '← Takaisin peliin',
    talkTitle: 'Avoin piiri',
    talkMsg: 'Tämä peli on tehty hauskanpitoon, yhteyteen ja hyviin hetkiin.',
    talkResume: 'Olemme valmiita jatkamaan',
    noMatch: 'Aktiivista peliä ei ole vielä ohitettavaksi.',
    exitTimer: 'Peli päättyy automaattisesti {n} min kuluttua.',
    exitTitle: '⏳ Anonyymi poistumisajastin',
    sessionTitle: '⏱️ ISTUNTO-ILMOITUS: Peliaika loppui',
    sessionBody: 'Aika loppui — peli on suljettu. Voit aloittaa uuden pelin milloin tahansa.',
    stoppedTitle: '🛑 Peli pysäytetty',
    stoppedBody: 'Istunto lopetettiin erikseen. Pelaajien pisteet tallennettiin:\n\n{scores}\n\nPalataan aloitusnäyttöön.',
    sessionBodyFull: 'Istunnon terveyden ja automaattisen anonymisoinnin vuoksi peli päätettiin järjestelmän toimesta.\n\nLOPPUPISTEET:\n{scores}\n\nAula on suljettu. Luo pelaajat uudelleen tai pidä tauko.',
    rollback: 'Turvavaihtoehtoa käytettiin — kierros peruttiin, pisteet palautettiin ja uusi kysymys ladattiin.'
  },

  a11y: {
    prevQuestion: 'Edellinen kysymys',
    nextQuestion: 'Seuraava kysymys',
    prevPrompt: 'Edellinen aihe',
    nextPrompt: 'Seuraava aihe',
    removePlayer: 'Poista {name}',
    settings: 'Asetukset',
    toggleSound: 'Ääni päälle/pois',
    language: 'Kieli',
    close: 'Sulje'
  },

  settings: {
    title: '⚙️ Asetukset',
    sr: 'Ruudunlukuyhteensopivuus',
    srSub: '(Mykistää pelin autoäänen)',
    rally: 'Ralli-englanti -tila',
    rallySub: '(Suomalainen aksentti autoäänelle)',
    adv: 'Edistynyt tila',
    advSub: '(Avaa omat aiheet ja kysymysten muokkauksen)',
    done: 'Valmis'
  },

  alerts: {
    notice: 'Huom',
    error: 'Virhe',
    invalidName: 'Virheellinen nimi',
    nameTaken: 'Tämä nimi on jo käytössä!',
    minPlayers: 'Lisää vähintään 2 pelaajaa aloittaaksesi!',
    roomClosed: '🚪 Huone suljettu',
    roomClosedBody: 'Huone suljettiin tai vanhentui. Olet takaisin aloitusnäytöllä.',
    nextInOrder: 'seuraava pelaaja',
    otherPlayer: 'toinen pelaaja',
    nextPlayer: 'seuraava pelaaja',
    safetyTitle: '🛡️ Turvallisuus',
    sessionErr: 'Jokin meni pieleen.'
  },

  prompts: {
    nameTwo: 'Nimeä kaksi: ',
    nameTwoStem: 'nimeä',
    fallback: 'kiinnostavia asioita'
  },

  emojiNames: {
    '🔥': 'Tulinen', '⚠️': 'Vaarallinen',
    '🦊': 'Kettu', '🐼': 'Panda', '🐱': 'Kissa', '🐶': 'Koira', '🐰': 'Pupu', '🐯': 'Tiikeri',
    '🐨': 'Koala', '🐷': 'Possu', '🐮': 'Lehmä', '🐵': 'Apina', '🐺': 'Susi', '🦁': 'Leijona',
    '🐸': 'Sammakko', '👶': 'Vauva', '👴': 'Ukko',
    '🤠': 'Cowboy', '🥳': 'Bilettäjä', '🤡': 'Pelle', '😎': 'Cool', '😡': 'Ärjy', '👺': 'Menninkäinen', '👹': 'Peikko',
    '💀': 'Luuranko', '👽': 'Alien', '🤖': 'Robo',
    '🍉': 'Vesimeloni', '🍓': 'Mansikka', '🥑': 'Avokado', '🍍': 'Ananas', '🥝': 'Kiivi',
    '🍊': 'Mandariini', '🍋': 'Sitruuna', '🍎': 'Omena', '🥭': 'Mango', '🥥': 'Kookos',
    '🌸': 'Kukka', '🍄': 'Sieni', '🌹': 'Ruusu', '🌝': 'Kuukasvo'
  }
};
