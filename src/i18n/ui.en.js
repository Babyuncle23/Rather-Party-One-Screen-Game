// =====================================================================
// ENGLISH UI DICTIONARY — canonical set of all user-facing strings.
// t(key, params) interpolates {name}-style placeholders.
// =====================================================================

export const UI_EN = {
  meta: { name: 'English' },

  misc: {
    loading: 'Loading...',
    tapToContinue: '👇 Tap to continue',
    reconnecting: 'Reconnecting…',
    reconnectSub: 'Trying to reach the room server',
    hostWait: '⏳ Waiting for the host to reconnect…',
    oralBanner: '🗣️ Give an oral hint out loud!',
    oralDone: 'Done',
    emojiPickerTitle: 'Choose an emoji',
    emojiPickerSub: 'Pick an icon that fits your style.',
    videoTitle: 'How to play',
    shareQr: 'Liked this one-screen game? Share the link with others via QR 😊',
    shareQrAlt: 'QR code — link to share the game',
    footerBadge: 'Designed by Human',
    footerSub: 'coded by ai 😬',
    iosTitle: '🍏 Install on iPhone',
    awayWait: '⏳ Waiting for {name} to reconnect…',
    leaveRoom: 'Leave room',
    roomCode: 'Room: {code}',
    copied: '✓ Copied',
    hostWaitLeft: 'closes in {left}'
  },

  setup: {
    modeSoloTitle: '1 Phone',
    modeSoloSub: 'Pass & Play',
    modeOnlineTitle: '2–4 Phones',
    modeOnlineSub: 'Online Room',
    lead: 'Choose questions and find out how others have answered them ✨',
    tutorial: 'How to play (23s)',
    tabCreate: 'Create Room',
    tabJoin: 'Join Room',
    avatarTitle: 'Tap to change avatar',
    nameOnlinePh: 'Your name',
    roomCodePh: 'ROOM CODE',
    connectCreate: 'Create Room',
    connectJoin: 'Join Room',
    enterName: 'Enter your name first!',
    enterCode: 'Enter the 4-letter room code!',
    nameSoloPh: 'Enter player name',
    addPlayer: '+ Add Player',
    seatOrder: 'Add names in the order players are seated around the table.',
    avatarHelp: 'Tap an avatar to change it.',
    roundsLabel: 'Number of rounds:',
    start: 'Start Game',
    install: '📱 Install App to Home Screen',
    installIos: "To play in full-screen mode like a real app:\n\n1. Tap the Share button (square with an arrow pointing up) at the bottom of the screen.\n2. Scroll down and tap 'Add to Home Screen' ➕.",
    safetyBtn: 'Safety',
    safetyTip: 'Recommended to read before starting.',
    safetyTipAll: 'Recommended for all players to read before starting.'
  },

  lobby: {
    title: 'Room Lobby',
    shareHint: 'Share this code with friends:',
    roundsLabel: 'Number of rounds:',
    start: 'Start Game',
    leave: 'Leave Room',
    host: 'host',
    offline: 'offline',
    waitMore: 'Waiting for at least one more player…',
    full: 'Room is full — 4 players max',
    connected: '{n} players connected — tap Start!',
    waitHost: 'Waiting for the host to start the game…',
    qrAlt: 'QR code — scan to join the room'
  },

  rejoin: {
    title: 'Back to your room',
    asPlayer: 'as {avatar} {name}',
    btn: 'Rejoin',
    dismiss: 'Dismiss'
  },

  claim: {
    title: 'Game already started — rejoin as:',
    cancel: 'Cancel'
  },

  turn: {
    suffix: "'s Turn",
    guessSuffix: ', Guess!'
  },

  pass: {
    title: 'PASS THE PHONE TO:',
    defaultNote: 'Only this player should look at the phone. Keep it hidden from others.',
    phrases: [
      'Pass the phone to {emojiName} {name}.',
      'Hand the device over to {emojiName} {name}.',
      "It is {emojiName} {name}'s turn now.",
      'Give the phone to {emojiName} {name}.',
      'Time for {emojiName} {name} to play.',
      'Next up is {emojiName} {name}.'
    ],
    phraseSimple: 'Pass the phone to {emojiName} {name}.',
    responderNote: "Now it's {r}'s turn to answer {p}'s prompt.\nKeep the phone hidden from others!",
    watchNote: 'Only this player should hold the phone, but {name} can watch!',
    guesserSpeech: 'Pass the phone to {emojiName} {name}, and {responder} can watch.',
    readyBtn: 'I am {name} — hold ✋',
    readyShort: 'Hold to confirm'
  },

  picker: {
    step1First: "STEP 1: Secretly pick a question for {name} (they won't see it yet!)",
    step2First: 'STEP 2: Pick a topic.',
    step2SubFirst: '{name} will blindly invent 2 words for this topic, and they will be plugged into your question!',
    step1: '👇 Select a question for {name}',
    step1Sub: "The blank spaces will be filled in with {name}'s answers later.",
    step2: "👇 Select a topic for {name}'s answers",
    sendTo: 'Send to {name} ➜',
    editStart: '✍️ EDIT THE QUESTION',
    editStop: '← CANCEL EDITING',
    editSave: 'Save Changes',
    livePreview: 'Live Preview',
    answerN: '[ ___ ANSWER {n} ___ ]',
    customToggle: '✍️ OR WRITE YOUR OWN PROMPT',
    backToPresets: '← BACK TO READY-MADE TOPICS',
    writeTopic: 'Please write a topic or go back to the ready-made ones!'
  },

  responder: {
    nowChoose: 'Now choose:',
    pluralWarn: '* Please write both answers in plural (e.g. cats, apples)',
    ideas: '💡 Ideas',
    hideIdeas: '🔼 Hide ideas',
    firstPh: 'First answer',
    secondPh: 'Second answer',
    submit: 'Submit Answers',
    blind1: 'BLIND STEP 1/2: Enter two different answers for this topic: {topic}.<span class="blind-step-sub">You\'ll see what crazy question {name} prepared right after!</span>',
    blind2: 'BLIND STEP 2/2: Pick which of your answers wins — the others will try to guess it!',
    diffWords: 'Enter 2 different words!'
  },

  companion: {
    picking: '{emoji} {name} is picking a question for {target}…',
    targetYou: 'you',
    pickingSub: 'Get ready — your turn is coming!',
    typing: '{emoji} {name} is typing their two answers…',
    typingSub: 'Watch the blanks fill in live!',
    choosing: '{emoji} {name} just saw the question — choosing secretly…',
    choosingSub: 'Get ready to guess!',
    typingInd: '✍️ typing… <b>{n}/{max}</b>'
  },

  guesser: {
    callout: 'Tap one answer.',
    prompt: 'Prompt',
    maskCaption: '••• hides any number of letters',
    maskTitle: '1 or more hidden letters',
    lettersBadge: '({n} letters)',
    wallet: 'Wallet',
    revealOpts: 'Reveal options',
    revealRand: 'Random letters',
    revealLen: 'Word length & 1st letters',
    costLine: '-{cost} pts',
    rollStatus: '💡 One reveal per turn: 🎲 -{a} / 📏 -{b} pts',
    rollSpent: '🔒 Reveal spent',
    progressRound: 'ROUND {a}/{b}',
    progressGuesser: 'GUESSER {a} OF {b}',
    winPts: 'Win: +{n} points',
    scoreLine: "{name}'s score: {n}",
    notEnough: 'Not enough points for this reveal!',
    notEnoughOral: 'Not enough points for an oral hint!',
    oralBtn: '💬 Ask for oral hint (-{n} pts)',
    oralTitle: '💬 Oral Hint Activated!',
    oralExplain: 'Ask your friend to give you a single honest oral hint or association about their choice.\n\n(For example: "This is a physical object" or "I encounter this at work")',
    spectating: '👀 {emoji} {name} is guessing — watch it live!',
    spectatingYours: '👀 {emoji} {name} is guessing <b>your</b> answer — watch it live!'
  },

  result: {
    title: 'Result',
    correct: '🎉 CORRECT!',
    wrong: '❌ WRONG!',
    yourGuess: 'Your guess',
    score: 'Score',
    sentence: 'chose {word} in the question:',
    continue: 'Continue ➜'
  },

  final: {
    gameOver: 'Game Over!',
    leaderboard: 'Leaderboard',
    history: 'Match History',
    stopVoice: '⏹ Stop Voice',
    choicesBy: 'Choices by {name}',
    noChoices: 'No choices were made by this player.',
    round: 'Round {n}',
    points: 'points',
    playAgain: 'Play Again (Keep Players)',
    waitHost: '⏳ Waiting for the host to restart…',
    speech: {
      draw2: "It's a draw! Both {a} and {b} finished with {n} points.",
      drawAll: 'Unbelievable! Everyone tied. {names} all finished with {n} points.',
      sharedWin: 'First place is shared by {names} with {n} points!',
      win: 'The winner is {name} with {n} points!',
      followedBy: 'Followed by ',
      otherScores: 'Other scores: ',
      withPts: '{name} with {n}',
      ptsWord: 'points',
      historyIntro: 'Here is the history of all choices. ',
      and: ' and '
    }
  },

  safety: {
    privTitle: '🌱 Safety Timeout',
    privDesc: 'Nothing happened yet. The game is on pause.<br>Only you can see this screen.',
    privPanelTitle: 'SAFER SPACE PRINCIPLES:',
    priv1: '<strong>Right to Stop:</strong> Personal boundaries matter more than game points.',
    priv2: "<strong>Respect & Comfort:</strong> Players don't judge or force anyone to view uncomfortable topics.",
    priv3: '<strong>Privacy:</strong> You can preview safety options privately.',
    back: '← Return',
    next: 'Next ➜',
    optsTitle: 'Safety Options',
    optsHint: 'Tap an option to expand details.<br>Actions require a 2-second hold.',
    opt1: '🔄 Skip This Round',
    opt1Desc: 'Round is canceled. Game draws a new question.',
    opt2: "💬 Open Circle (Let's Talk)",
    opt2Desc: 'Pauses the game and opens a friendly text screen for the whole company.',
    opt3: '🛑 Stop Match & Talk Openly',
    opt3Desc: 'Stops match instantly and saves points.',
    opt4: '⏳ Set Anonymous Exit Timer',
    opt4Desc: 'Choose a delay below, and the match will end automatically later.',
    flowCfg: 'FLOW CONFIG:',
    min0: '0 min',
    minPlus: '+1 min',
    currentMin: 'Current: {n} min',
    hold2s: 'Hold 2s to Confirm',
    hold2sLong: 'Hold for 2s to Confirm',
    holding: 'Holding...',
    backToGame: '← Return to Game',
    talkTitle: 'Open Circle',
    talkMsg: 'This game is made for fun, connection, and good times.',
    talkResume: 'We Are Ready to Continue',
    noMatch: 'There is no active match to skip yet.',
    exitTimer: 'The match will automatically end in {n} min.',
    exitTitle: '⏳ Anonymous Exit Timer',
    sessionTitle: '⏱️ SESSION NOTICE: Play Time Limit Reached',
    sessionBody: 'Time is up — the match has been closed. You can start a new game anytime.',
    stoppedTitle: '🛑 Match Stopped',
    stoppedBody: 'The session has been explicitly halted. Current player scores have been preserved successfully:\n\n{scores}\n\nReturning to the lobby.',
    sessionBodyFull: 'To ensure session health and automatic player background anonymization, this match has been finalized by the system.\n\nFINAL MATCH SCORES:\n{scores}\n\nThe lobby is now closed. Please recreate players or take a routine break.',
    rollback: 'A safety option was used — the round was canceled, scores rolled back, and a new question is loaded.'
  },

  a11y: {
    prevQuestion: 'Previous question',
    nextQuestion: 'Next question',
    prevPrompt: 'Previous prompt',
    nextPrompt: 'Next prompt',
    removePlayer: 'Remove {name}',
    settings: 'Settings',
    toggleSound: 'Toggle sound',
    language: 'Language',
    close: 'Close'
  },

  settings: {
    title: '⚙️ Settings',
    sr: 'Screen Reader Compatibility',
    srSub: '(Mutes in-game auto-voice)',
    rally: 'Rally English Mode',
    rallySub: '(Finnish accent for auto-voice)',
    adv: 'Advanced Mode',
    advSub: '(Unlocks custom prompts and question editing)',
    done: 'Done'
  },

  alerts: {
    notice: 'Notice',
    error: 'Error',
    invalidName: 'Invalid Name',
    nameTaken: 'This name is already taken!',
    minPlayers: 'Please add at least 2 players to start!',
    roomClosed: '🚪 Room closed',
    roomClosedBody: 'The room was closed or expired. You are back at the start screen.',
    hostLeft: '🚪 Host left',
    hostLeftBody: 'The host left the room, so the game ended. You are back at the start screen.',
    hostGone: '⏳ Host never returned',
    hostGoneBody: 'The host was away too long and the room was closed. You are back at the start screen.',
    nextInOrder: 'the next player in order',
    otherPlayer: 'the other player',
    nextPlayer: 'the next player',
    safetyTitle: '🛡️ Safety',
    sessionErr: 'Something went wrong.'
  },

  prompts: {
    nameTwo: 'Name two: ',
    nameTwoStem: 'name',
    fallback: 'interesting things'
  },

  emojiNames: {
    '🔥': 'Fiery', '⚠️': 'Dangerous',
    '🦊': 'Fox', '🐼': 'Panda', '🐱': 'Cat', '🐶': 'Dog', '🐰': 'Bunny', '🐯': 'Tiger',
    '🐨': 'Koala', '🐷': 'Pig', '🐮': 'Cow', '🐵': 'Monkey', '🐺': 'Wolf', '🦁': 'Lion',
    '🐸': 'Frog', '👶': 'Baby', '👴': 'Old Man',
    '🤠': 'Cowboy', '🥳': 'Party', '🤡': 'Clown', '😎': 'Cool', '😡': 'Angry', '👺': 'Goblin', '👹': 'Ogre',
    '💀': 'Skeleton', '👽': 'Alien', '🤖': 'Robo',
    '🍉': 'Watermelon', '🍓': 'Strawberry', '🥑': 'Avocado', '🍍': 'Pineapple', '🥝': 'Kiwi',
    '🍊': 'Tangerine', '🍋': 'Lemon', '🍎': 'Apple', '🥭': 'Mango', '🥥': 'Coconut',
    '🌸': 'Flower', '🍄': 'Mushroom', '🌹': 'Rose', '🌝': 'Moonface'
  }
};
