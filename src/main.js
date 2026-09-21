import { Match } from './core/Match.js';
import { WordShifter } from './core/WordShifter.js';
import { ScreenController } from './ui/ScreenController.js';
import { AudioManager } from './audio/AudioManager.js';
import { SIMPLE_COLORS, SIMPLE_MATERIALS, SIMPLE_MOODS, SIMPLE_ERAS, SIMPLE_COUNTRIES, SIMPLE_CITIES, SIMPLE_FOODS, SIMPLE_SPORTS, SIMPLE_PROFESSIONS, SIMPLE_VEGETABLES, SIMPLE_FRUITS, SIMPLE_CLOTHES } from './data/nerfWords.js';
import { SCENE_REGISTRY } from './data/scenes.js';

export const PLAYER_EMOJIS = [
  "🔥", "⚠️", "🦊", "🐼", "🐱", "🐶", "🐰", "🐯", "🐨", "🐷", "🐮", "🐵", "🐺", "🦁", "🐸", 
  "👽", "🤖", "👶", "👴", "😎", "🥳", "🤡", 
  "😡", "👺", "👹", "💀", "🍉", "🍓", "🥑", "🍍", "🥝", "🍊", "🍋", "🍎", "🥭", 
  "🥥", "🌸", "🍄", "🌹", "🌝"
];

const EMOJI_NAMES = {
  "🔥": "Fiery", "⚠️": "Dangerous",
  "🦊": "Fox", "🐼": "Panda", "🐱": "Cat", "🐶": "Dog", "🐰": "Bunny", "🐯": "Tiger", "🐨": "Koala", "🐷": "Pig", "🐮": "Cow", "🐵": "Monkey", "🐺": "Wolf", "🦁": "Lion",
  "🐸": "Frog",
  "👶": "Baby", "👴": "Old Man",
  "🤠": "Cowboy", "🥳": "Party", "🤡": "Clown", "😡": "Angry", "👺": "Goblin", "👹": "Ogre", "💀": "Skeleton",
  "👽": "Alien", "🤖": "Robo",
  "🍉": "Watermelon", "🍓": "Strawberry", "🥑": "Avocado", "🍍": "Pineapple", "🥝": "Kiwi", "🍊": "Tangerine", "🍋": "Lemon", "🍎": "Apple", "🥭": "Mango", "🥥": "Coconut",
  "🌸": "Flower", "🍄": "Mushroom", "🌹": "Rose", "🌝": "Moonface"
};

export const EYE_ANCHORS = {
  "🐼": { x: -7, y: 8, s: 1.05 },
  "🔥": { x: -2, y: 16, s: 0.65 },
  "⚠️": { x: -1, y: 16, s: 0.5 },
  "🦊": { x: -3, y: 22, s: 0.7 },
  "🐱": { x: -4, y: 13, s: 0.75 },
  "🐶": { x: -5, y: -5, s: 0.75 },
  "🐰": { x: -4, y: 23, s: 0.65 },
  "🐯": { x: -7, y: -10, s: 1.15 },
  "🐨": { x: -4, y: 12, s: 0.75 },
  "🐷": { x: -6, y: 16, s: 0.7 },
  "🐮": { x: -1, y: 2, s: 0.5 },
  "🐵": { x: -1, y: 2, s: 0.6 },
  "🐺": { x: -5, y: 14, s: 0.9 },
  "🦁": { x: -5, y: -10, s: 0.8 },
  "🐸": { x: -5, y: -31, s: 1.05 },
  "👽": { x: -5, y: 13, s: 1.05 }, 
  "🤖": { x: -4, y: 1, s: 1.05 },
  "👶": { x: -5, y: 24, s: 0.85 },
  "👴": { x: -5, y: 24, s: 0.85 },
  "🤠": { x: -4, y: 10, s: 0.75 },
  "🥳": { x: -3, y: -7, s: 0.85 },
  "🤡": { x: -7, y: -7, s: 0.95 },
  "😡": { x: -6, y: 13, s: 0.95 },
  "👺": { x: -7, y: -20, s: 0.95 },
  "👹": { x: -5, y: 7, s: 0.85 },
  "💀": { x: -5, y: 7, s: 1 },
  "🍉": { x: 1, y: 23, s: 0.75 },
  "🍓": { x: 1, y: 23, s: 0.75 },
  "🥑": { x: 1, y: 23, s: 0.75 },
  "🍍": { x: 1, y: 23, s: 0.5 },
  "🥝": { x: -2, y: 1, s: 0.9 },
  "🍊": { x: 1, y: 11, s: 0.65 },
  "🍋": { x: 7, y: -1, s: 0.65 },
  "🍎": { x: -5, y: 14, s: 0.9 },
  "🥭": { x: 4, y: 4, s: 0.6 },
  "🥥": { x: -1, y: 0, s: 0.6 },
  "🌸": { x: 4, y: 4, s: 0.6 },
  "🍄": { x: 4, y: -17, s: 0.6 },
  "🌹": { x: 4, y: -21, s: 0.35 },
  "🌝": { x: -4, y: -14, s: 0.8 },
  "default": { x: 0, y: 0, s: 1.0 }
};

function getDefaultEmojiForNewPlayer() {
  const used = new Set(temporaryPlayersList.map(p => p.emoji));
  const available = PLAYER_EMOJIS.filter(emoji => !used.has(emoji));
  if (available.length > 0) return available[Math.floor(Math.random() * available.length)];
  return PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];
}

function passPhoneWithSpeech(player, onConfirm, note, speakNote = false, exactSpeech = null) {
  const emojiName = EMOJI_NAMES[player.emoji] || "";
  let spokenText = "";
  
  if (exactSpeech) {
    spokenText = exactSpeech;
  } else {
    let randomPhrase = "";
    if (audioManager && audioManager.isRallyEnglish) {
      randomPhrase = `Pass the phone to ${emojiName} ${player.name}.`;
    } else {
      const handoverPhrases = [
        `Pass the phone to ${emojiName} ${player.name}.`,
        `Hand the device over to ${emojiName} ${player.name}.`,
        `It is ${emojiName} ${player.name}'s turn now.`,
        `Give the phone to ${emojiName} ${player.name}.`,
        `Time for ${emojiName} ${player.name} to play.`,
        `Next up is ${emojiName} ${player.name}.`
      ];
      randomPhrase = handoverPhrases[Math.floor(Math.random() * handoverPhrases.length)];
    }
    
    spokenText = randomPhrase;
    
    if (note && speakNote) {
      const cleanNote = note.replace(/<\/?[^>]+(>|$)/g, "");
      spokenText += " " + cleanNote;
    }
  }

  if (audioManager && !audioManager.isScreenReaderMode) {
    if (!audioManager.isVoiceWarmedUp) {
      screens.showLoading();
      audioManager.speak(spokenText, () => {
        screens.hideLoading();
        audioManager.isVoiceWarmedUp = true;
      });
    } else {
      audioManager.speak(spokenText);
    }
  } else {
    audioManager.stopSpeech(); 
  }
  
  const wrappedConfirm = () => {
    if (audioManager) audioManager.stopSpeech();
    onConfirm();
  };
  
  screens.showPassScreen(player, wrappedConfirm, note);
}

let game = null;
let screens = null;
let audioManager = null;

let currentQuestion = null;
let roundScoresSnapshot = null;
let currentHint = "";
let currentHintObject = null; 
let isCustomHintActive = false; 
let shifter = null;
let responderChoice = "";
let unchosenChoice = ""; 
let activeSuffix = "";
let activePrefix = "";

let remainingGuessers = [];
let totalGuessersThisRound = 0; 
let currentGuesserIndex = null;
const FIXED_REWARD = 50; 
let revealCount = 0; 
let currentCardIndex = 0;
let fragmentsHistory = [];
let questionHistory = [];

let temporaryPlayersList = [];
let currentFragmentsState = [];
let safetyDelayedTimer = null; 
let oralHintUsedThisTurn = false;

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (!document.getElementById('setup-screen')) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 50);

    audioManager = new AudioManager();
    screens = new ScreenController();
    screens.setupAudioControl(audioManager);
    
    const srToggle = document.getElementById('sr-mode-toggle');
    if (srToggle) {
      srToggle.onchange = (e) => audioManager.setScreenReaderMode(e.target.checked);
    }

    const rallyToggle = document.getElementById('rally-english-toggle');
    if (rallyToggle) {
      rallyToggle.checked = false;
      rallyToggle.onchange = (e) => {
        audioManager.setRallyEnglishMode(e.target.checked);
        if (e.target.checked && window.speechSynthesis) {
          window.speechSynthesis.getVoices();
        }
      };
    }

    setupInitialEventListeners();
    setupGlobalButtonSounds();
    setupPsychologicalSafetySystem(); 
    
    updateStatsBarVisibility(); 
    setupVideoTutorial();

    const initAudioPreload = () => {
      audioManager.preloadRevealSounds();
      document.removeEventListener('click', initAudioPreload);
      document.removeEventListener('touchstart', initAudioPreload);
    };
    document.addEventListener('click', initAudioPreload);
    document.addEventListener('touchstart', initAudioPreload);

  } catch (error) {
    console.error("Initialization error:", error);
    if (screens) screens.showAlert("Error", "UI Style Injection failed: " + error.message);
  }
});

function updateStatsBarVisibility() {
  const statsBars = document.querySelectorAll('.stats-bar');
  statsBars.forEach(bar => {
    const spans = bar.querySelectorAll('span');
    const hasAnyContent = Array.from(spans).some(span => span.textContent.trim().length > 0);
    if (hasAnyContent) {
      bar.classList.remove('stats-bar-empty');
      bar.style.display = 'flex';
      bar.style.margin = '4px 0'; 
      bar.style.visibility = 'visible';
    } else {
      bar.classList.add('stats-bar-empty');
      bar.style.display = 'none';
    }
  });

  const rollStatus = document.getElementById('ability-roll-status');
  if (rollStatus) {
    if (rollStatus.textContent.trim().length === 0) {
      rollStatus.style.display = 'none';
    } else {
      rollStatus.style.display = 'block';
    }
  }
}

function setupInitialEventListeners() {
  const addPlayerBtn = document.getElementById('add-player-btn');
  const singleInput = document.getElementById('single-player-input');
  const startGameBtn = document.getElementById('start-game-btn');

  addPlayerBtn.onclick = () => {
    const name = singleInput.value.trim();
    if (name.length > 0) {
      if (temporaryPlayersList.some(p => p.name === name.toUpperCase())) {
        screens.showAlert("Invalid Name", "This name is already taken!");
        return;
      }
      temporaryPlayersList.push({ name: name.toUpperCase(), emoji: getDefaultEmojiForNewPlayer() });
      singleInput.value = "";
      renderPlayerBoxes();
    }
  };

  singleInput.onkeydown = (e) => {
    if (e.key === "Enter") addPlayerBtn.click();
  };

  const emojiPickerCloseBtn = document.getElementById('emoji-picker-close-btn');
  const emojiPickerModal = document.getElementById('emoji-picker-modal');

  if (emojiPickerCloseBtn) {
    emojiPickerCloseBtn.onclick = (e) => {
      e.stopPropagation();
      closeEmojiPicker();
    };
  }

  if (emojiPickerModal) {
    emojiPickerModal.onclick = (e) => {
      if (e.target === emojiPickerModal) closeEmojiPicker();
    };
  }

  startGameBtn.onclick = () => {
    const roundsInput = parseInt(document.getElementById('rounds-input').value) || 3;
    if (temporaryPlayersList.length < 2) {
      screens.showAlert("Notice", "Please add at least 2 players to start!");
      return;
    }
    game = new Match(temporaryPlayersList, roundsInput);
    window.game = game; 
   
    const safetyBtn = document.getElementById('safety-global-btn');
    if (safetyBtn) safetyBtn.style.display = 'block';
   
    const safetyTip = document.getElementById('safety-tip-text');
    if (safetyTip) safetyTip.style.display = 'none'; 

    passPhoneWithSpeech(
      game.players[game.pickerIndex],
      initRound,
      "This is your call only. Read the question and choose a prompt."
    );
  };

  const backToSetupBtn = document.getElementById('back-to-setup-btn');
  if (backToSetupBtn) {
    backToSetupBtn.onclick = resetToSetupState;
  }
}

function resetToSetupState() {
  if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
  if (audioManager) audioManager.stopSpeech();
  const stopVoiceBtn = document.getElementById('stop-voice-btn');
  if (stopVoiceBtn) stopVoiceBtn.style.display = 'none';

  const helpSection = document.querySelector('.help-section');
  if (helpSection) helpSection.style.display = 'block';

  game = null;
  currentQuestion = null;
  currentHint = "";
  shifter = null;
  responderChoice = "";
  remainingGuessers = [];
  currentGuesserIndex = null;
  revealCount = 0;

  renderPlayerBoxes();
  const safetyTip = document.getElementById('safety-tip-text');
  if (safetyTip) safetyTip.innerText = "Recommended for all players to read before starting.";
  screens.switchScreen('setup');
}

function renderPlayerBoxes() {
  const container = document.getElementById('players-boxes-container');
  container.innerHTML = "";
  temporaryPlayersList.forEach((player, index) => {
    const box = document.createElement('div');
    box.className = "player-box";
    box.innerHTML = `
      <div class="player-box-left">
        <div class="player-avatar" title="Tap to choose or reroll emoji">${player.emoji}</div>
        <div class="player-name-block">
          <span>${player.name}</span>
        </div>
      </div>
      <button class="delete-box-btn">✕</button>
    `;
    box.querySelector('.delete-box-btn').onclick = () => {
      temporaryPlayersList.splice(index, 1);
      renderPlayerBoxes();
    };
    box.querySelector('.player-avatar').onclick = (e) => {
      e.stopPropagation();
      openEmojiPicker(index);
    };
    container.appendChild(box);
  });
  updateHelpTargetText();
  updateStatsBarVisibility();
}

let activeEmojiPickerIndex = null;

function renderEmojiPickerGrid(selectedEmoji) {
  const grid = document.getElementById('emoji-picker-grid');
  if (!grid) return;
  grid.innerHTML = "";
  PLAYER_EMOJIS.forEach((emoji) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'emoji-picker-tile';
    tile.innerText = emoji;
    tile.title = EMOJI_NAMES[emoji] ? `${EMOJI_NAMES[emoji]} (${emoji})` : emoji;
    if (emoji === selectedEmoji) tile.classList.add('selected');
    tile.onclick = (e) => {
      e.stopPropagation();
      if (activeEmojiPickerIndex === null) return;
      temporaryPlayersList[activeEmojiPickerIndex].emoji = emoji;
      renderPlayerBoxes();
      if (audioManager) audioManager.play('click'); 
      closeEmojiPicker(); 
    };
    grid.appendChild(tile);
  });
}

function openEmojiPicker(index) {
  activeEmojiPickerIndex = index;
  const player = temporaryPlayersList[activeEmojiPickerIndex];
  const modal = document.getElementById('emoji-picker-modal');
  if (!modal || !player) return;
  renderEmojiPickerGrid(player.emoji);
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function closeEmojiPicker() {
  const modal = document.getElementById('emoji-picker-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
  activeEmojiPickerIndex = null;
}

function setupGlobalButtonSounds() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    const isTapScreen = e.target.closest('#pass-screen') || e.target.closest('#custom-alert-modal');
    
    if (button || isTapScreen) {
      if (button && (button.id === 'safety-global-btn' || button.closest('#safety-modal'))) return;
      audioManager.play('click');
    }
  }, true);
}

function setupPsychologicalSafetySystem() {
  const globalBtn = document.getElementById('safety-global-btn');
  const modal = document.getElementById('safety-modal');
  const scrPrivacy = document.getElementById('safety-screen-privacy');
  const scrOptions = document.getElementById('safety-screen-options');
  const scrTalk = document.getElementById('safety-screen-talk');
 
  const proceedBtn = document.getElementById('safety-proceed-btn');
  const closeBtn1 = document.getElementById('safety-close-btn-1');
  const closeBtn2 = document.getElementById('safety-close-btn-2');
  const resumeMatchBtn = document.getElementById('safety-resume-match-btn');

  if (!globalBtn || !modal) return;

  globalBtn.onclick = (e) => {
    e.stopPropagation();
    if (scrPrivacy) scrPrivacy.style.display = 'block';
    if (scrOptions) scrOptions.style.display = 'none';
    if (scrTalk) scrTalk.style.display = 'none';
    modal.style.display = 'flex';
  };

  if (proceedBtn) {
    proceedBtn.onclick = () => {
      if (scrPrivacy) scrPrivacy.style.display = 'none';
      if (scrOptions) scrOptions.style.display = 'block';
    };
  }

  const closeSafety = () => { modal.style.display = 'none'; };
  
  if (closeBtn1) closeBtn1.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };
  if (closeBtn2) closeBtn2.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };
  if (resumeMatchBtn) resumeMatchBtn.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };

  let safetySelectedMinutes = 0;
  const timerMinus = document.getElementById('safety-timer-minus');
  const timerPlus = document.getElementById('safety-timer-plus');
  const timerDisplay = document.getElementById('safety-timer-display');

  if (timerMinus && timerPlus && timerDisplay) {
    const handleMinus = (e) => {
      e.preventDefault(); e.stopPropagation();
      safetySelectedMinutes = 0;
      timerDisplay.innerText = "Current: 0 min";
    };

    const handlePlus = (e) => {
      e.preventDefault(); e.stopPropagation();
      safetySelectedMinutes += 1;
      timerDisplay.innerText = `Current: ${safetySelectedMinutes} min`;
    };

    timerMinus.onclick = handleMinus; timerMinus.ontouchstart = handleMinus;
    timerPlus.onclick = handlePlus; timerPlus.ontouchstart = handlePlus;
  }

  const optionCards = scrOptions.querySelectorAll('.safety-option-card');
  optionCards.forEach(card => {
    card.onclick = (e) => {
      if (e.target.closest('.safety-hold-trigger') || e.target.closest('.btn-small')) return;

      const desc = card.querySelector('.safety-desc-text');
      const trigger = card.querySelector('.safety-hold-trigger');
      const badge = card.querySelector('.safe-preview-badge');
      const isOpen = desc.style.display === 'block';

      optionCards.forEach(c => {
        c.querySelector('.safety-desc-text').style.display = 'none';
        c.querySelector('.safety-hold-trigger').style.display = 'none';
        const b = c.querySelector('.safe-preview-badge');
        if (b) b.style.display = 'inline';
      });

      if (!isOpen) {
        desc.style.display = 'block';
        trigger.style.display = 'block';
        if (badge) badge.style.display = 'none';
      }
    };
  });

  setupSafetyHoldTriggers(scrOptions, scrTalk, modal, () => safetySelectedMinutes);
}

function resetSafetyButtonsState(scrOptions) {
  const cards = scrOptions.querySelectorAll('.safety-option-card');
  cards.forEach(c => {
    c.querySelector('.safety-desc-text').style.display = 'none';
    c.querySelector('.safety-hold-trigger').style.display = 'none';
    const b = c.querySelector('.safe-preview-badge');
    if (b) b.style.display = 'inline';
  });
  const display = document.getElementById('safety-timer-display');
  if (display) display.innerText = "Current: 0 min";
}

function setupSafetyHoldTriggers(scrOptions, scrTalk, modal, getMinutesFn) {
  const triggers = scrOptions.querySelectorAll('.safety-hold-trigger');
  triggers.forEach(btn => {
    let holdTimer = null;
    let pointerId = null;
    let isHolding = false;
    let hasTriggered = false;

    const resetHoldState = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      isHolding = false;
      hasTriggered = false;
      btn.classList.remove('holding');
      btn.innerText = "Hold for 2s to Confirm";
      if (pointerId !== null && typeof btn.releasePointerCapture === 'function' && btn.hasPointerCapture(pointerId)) {
        try { btn.releasePointerCapture(pointerId); } catch (error) {}
      }
      pointerId = null;
    };

    const startHold = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (isHolding) return;
      e.preventDefault();
      e.stopPropagation();

      isHolding = true;
      hasTriggered = false;
      pointerId = e.pointerId ?? null;
      btn.classList.add('holding');
      btn.innerText = "Holding...";

      if (pointerId !== null && typeof btn.setPointerCapture === 'function') {
        try { btn.setPointerCapture(pointerId); } catch (error) {}
      }

      holdTimer = window.setTimeout(() => {
        if (hasTriggered) return;
        hasTriggered = true;
        const minutes = typeof getMinutesFn === 'function' ? getMinutesFn() : 0;
        executeSafetyAction(btn.dataset.action, scrOptions, scrTalk, modal, minutes);
        resetHoldState();
      }, 2000);
    };

    const endHold = (e) => {
      if (!isHolding) return;
      if (e && e.pointerId !== undefined && pointerId !== null && e.pointerId !== pointerId) return;
      e?.preventDefault?.();
      e?.stopPropagation?.();
      resetHoldState();
    };

    btn.addEventListener('pointerdown', startHold);
    btn.addEventListener('pointerup', endHold);
    btn.addEventListener('pointercancel', endHold);
    btn.addEventListener('pointerleave', endHold);
    btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
  });
}

function executeSafetyAction(action, scrOptions, scrTalk, modal, minutes) {
  if (action === 'skip') {
    modal.style.display = 'none';
    if (game && game.players && roundScoresSnapshot) {
      game.players.forEach(p => {
        const backup = roundScoresSnapshot.find(b => b.id === p.id);
        if (backup) p.gold = backup.gold;
      });
    }
    initRound();
    screens.showAlert("🛡️ Safety", "Current round was canceled. All scores earned during this round have been rolled back, and a new question is loaded.");

  } else if (action === 'talk') {
    if (scrOptions) scrOptions.style.display = 'none';
    if (scrTalk) scrTalk.style.display = 'block';

  } else if (action === 'stop-direct') {
    scrOptions.style.display = 'none';
    scrTalk.style.display = 'block';

  } else if (action === 'stop-direct') {
    modal.style.display = 'none';
    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
    const progressReport = game.players.map(p => `${p.name}: ${p.gold} pts`).join('\n');
   
    screens.showAlert(
      "🛑 Match Stopped", 
      `The session has been explicitly halted. Current player scores have been preserved successfully:\n\n${progressReport}\n\nReturning to the main lobby.`,
      () => {
        const safetyTip = document.getElementById('safety-tip-text');
        if (safetyTip) {
            safetyTip.style.display = 'block'; 
            safetyTip.innerText = "Recommended to read before starting.";
        }
        game = null;
        renderPlayerBoxes();
        screens.switchScreen('setup');
      }
    );

  } else if (action === 'stop-delayed') {
    modal.style.display = 'none';
    const delayMs = minutes * 60 * 1000;
   
    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
   
    safetyDelayedTimer = setTimeout(() => {
      let scoresSummary = "No active players data found.";
      if (window.game && window.game.players) {
        scoresSummary = window.game.players.map(p => `${p.name}: ${p.gold} pts`).join('\n');
      }
     
      const sessionCloseAlert =
        `To ensure session health and automatic player background anonymization, this match has been finalized by the system.\n\n` +
        `FINAL MATCH SCORES:\n${scoresSummary}\n\n` +
        `The lobby is now closed. Please recreate players or take a routine break.`;
     
      screens.showAlert("⏱️ SESSION NOTICE: Play Time Limit Reached", sessionCloseAlert, () => {
        const safetyTip = document.getElementById('safety-tip-text');
        if (safetyTip) safetyTip.innerText = "Recommended for all players to read before starting.";
        window.game = null;
        game = null;
        renderPlayerBoxes();
        screens.switchScreen('setup');
      });
    }, delayMs);
  }
}

function updateHelpTargetText() {
  const helpResponderName = document.getElementById('help-responder-name');
  if (!helpResponderName) return;

  if (game && game.players.length === 2) {
    helpResponderName.innerText = game.players[game.getResponderIndex()].name;
  } else if (game && game.players.length > 2) {
    helpResponderName.innerText = 'the next player in order';
  } else if (temporaryPlayersList.length === 2) {
    helpResponderName.innerText = temporaryPlayersList[1].name || 'the other player';
  } else {
    helpResponderName.innerText = 'the next player';
  }
}

function getValidFragmentOptions(fragIndex) {
  const frag = currentQuestion.fragments[fragIndex];
  if (fragIndex === 0) return frag.options;
 
  const activeTypes = [];
  for (let i = 0; i < fragIndex; i++) {
    const stateIndex = currentFragmentsState[i];
    if (stateIndex === undefined || stateIndex === -1) continue;
    const selectedOpt = currentQuestion.fragments[i].options[stateIndex];
    if (selectedOpt && selectedOpt.type) activeTypes.push(selectedOpt.type);
  }

  const validOptions = frag.options.filter(opt => {
    if (!opt.requires || opt.requires.length === 0) return true;
    return opt.requires.some(req => activeTypes.includes(req));
  });
 
  return validOptions.length > 0 ? validOptions : frag.options;
}

function randomizeCurrentFragments() {
  currentFragmentsState = [];
  currentQuestion.fragments.forEach((frag, i) => {
    const validOptions = getValidFragmentOptions(i);
    const randIdx = Math.floor(Math.random() * validOptions.length);
    currentFragmentsState.push(frag.options.indexOf(validOptions[randIdx]));
  });
  renderInteractiveQuestion();
}

function updatePickerHints() {
  if (!currentQuestion) return;
  
  let rawHints = currentQuestion.hints ? [...currentQuestion.hints] : [];
  currentQuestion.fragments.forEach((frag, i) => {
    const stateIndex = currentFragmentsState[i];
    if (stateIndex !== undefined && stateIndex !== -1) {
        const selectedOption = frag.options[stateIndex];
        if (selectedOption && selectedOption.hints && Array.isArray(selectedOption.hints)) {
          rawHints.push(...selectedOption.hints);
        }
    }
  });
  
  // Убираем дубликаты базовых подсказок
  const uniqueHintsMap = new Map();
  rawHints.forEach(h => {
      const text = typeof h === 'object' ? h.text : h;
      if (!uniqueHintsMap.has(text)) {
          uniqueHintsMap.set(text, typeof h === 'object' ? h : { text: text, isPlural: false });
      }
  });
  
  let availableHints = Array.from(uniqueHintsMap.values());
  if (availableHints.length === 0) {
    availableHints.push({ text: "interesting things", isPlural: true });
  }

  window.questionRequiresPlural = availableHints.some(h => h.isPlural === true);

  // Собираем ВСЕ возможные комбинации (база + модификатор)
  let allPermutations = [];
  availableHints.forEach(hintBase => {
      const baseText = hintBase.text;
      const isPlural = !!hintBase.isPlural;
      const brainstorm = hintBase.brainstorm || [];
      
      if (hintBase.modifiers && hintBase.modifiers.length > 0) {
          hintBase.modifiers.forEach(mod => {
              allPermutations.push({
                  text: baseText,
                  isPlural: isPlural,
                  brainstorm: brainstorm,
                  modifier: mod !== "" ? mod : null // Пустые строки превращаем в null
              });
          });
      } else {
          allPermutations.push({
              text: baseText,
              isPlural: isPlural,
              brainstorm: brainstorm,
              modifier: null
          });
      }
  });

  // Перемешиваем получившуюся колоду
  for (let i = allPermutations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPermutations[i], allPermutations[j]] = [allPermutations[j], allPermutations[i]];
  }

  window.promptHistory = allPermutations;
  window.promptHistoryIndex = 0;
  
const displayEl = document.getElementById('prompt-display-text');
  const indexEl = document.getElementById('prompt-carousel-index');

  // Функция отрисовки текста со счетчиком
  window.renderCurrentPrompt = () => {
    if (!displayEl) return;
    
    const total = window.promptHistory.length;
    const current = window.promptHistoryIndex + 1;

    const h = window.promptHistory[window.promptHistoryIndex];
    let str = h.text;
    if (!str.toLowerCase().startsWith('name')) {
        str = `Name two: ${str}`;
    }
    if (h.modifier) {
        str += ` <span style="font-weight: 400; opacity: 0.65; color: #ffffff;">(${h.modifier})</span>`;
    }
    
    if (indexEl) indexEl.innerText = `${current}/${total}`;
    displayEl.innerHTML = str;
  };

  // Отрисовываем первый вариант сразу
  window.renderCurrentPrompt();
  
const nextBtn = document.getElementById('prompt-next-btn');
  const prevBtn = document.getElementById('prompt-prev-btn');
  // Ссылки на поле и карусель
  const customInput = document.getElementById('custom-hint-input');
  const carousel = document.querySelector('.prompt-carousel-container');
  
  if (nextBtn) {
      nextBtn.onclick = () => {
          if (audioManager) audioManager.play('click');
          window.promptHistoryIndex = (window.promptHistoryIndex + 1) % window.promptHistory.length;
          window.renderCurrentPrompt();
          
          // Сбрасываем кастомное поле при клике на стрелки
          if (customInput && customInput.value !== "") {
              customInput.value = "";
              if (carousel) {
                  carousel.style.opacity = '1';
                  carousel.style.pointerEvents = 'auto';
              }
          }
      };
  }
  if (prevBtn) {
      prevBtn.onclick = () => {
          if (audioManager) audioManager.play('click');
          window.promptHistoryIndex = (window.promptHistoryIndex - 1 + window.promptHistory.length) % window.promptHistory.length;
          window.renderCurrentPrompt();
          
          // Сбрасываем кастомное поле при клике на стрелки
          if (customInput && customInput.value !== "") {
              customInput.value = "";
              if (carousel) {
                  carousel.style.opacity = '1';
                  carousel.style.pointerEvents = 'auto';
              }
          }
      };
  }
} // Конец функции updatePickerHints

function renderInteractiveQuestion() {
  const container = document.getElementById('secret-question-text');
  if (currentQuestion.customCompiledText) {
      container.innerHTML = injectPlayerNames(currentQuestion.customCompiledText);
  } else {
      container.innerHTML = injectPlayerNames(currentQuestion.text) + " ";
      currentQuestion.fragments.forEach((frag, i) => {
        const optText = injectPlayerNames(frag.options[currentFragmentsState[i]].text);
        const span = document.createElement('span');
        span.innerText = optText + " ";
        container.appendChild(span);
      });
  }
  updatePickerHints();
}

function getCompiledQuestionString(w1 = "[ ... ]", w2 = "[ ... ]", useHtml = false) {
  let str = "";
  if (currentQuestion.customCompiledText) {
      str = currentQuestion.customCompiledText;
  } else {
      str = currentQuestion.text + " ";
      currentQuestion.fragments.forEach((frag, i) => {
        str += frag.options[currentFragmentsState[i]].text + " ";
      });
  }
  if (useHtml) {
    str = str.replace("[ ... ]", `<span style="color: #00ffb3; font-weight: bold;">${w1}</span>`);
    str = str.replace("[ ... ]", `<span style="color: #ff4a4a; font-weight: bold;">${w2}</span>`);
  } else {
    str = str.replace("[ ... ]", w1).replace("[ ... ]", w2);
  }
  return injectPlayerNames(str).trim();
}

function injectPlayerNames(text) {
  if (!window.game || !window.game.players || !text) return text;
  const pickerName = window.game.players[window.game.pickerIndex].name;
  const responderName = window.game.players[window.game.getResponderIndex()].name;
  return text.replace(/\[PICKER\]/g, pickerName).replace(/\[RESPONDER\]/g, responderName);
}

function selectHint(hintObj) {
  try {
    currentHintObject = hintObj;
    
    let str = hintObj.text;
    if (!str.toLowerCase().startsWith('name')) {
        str = `Name two: ${str}`;
    }
    if (hintObj.modifier) {
        str += ` <span style="font-weight: 400; opacity: 0.65;">(${hintObj.modifier})</span>`;
    }
    currentHint = str;
    window.currentHintRequiresPlural = hintObj.isPlural;
    
const picker = game.players[game.pickerIndex];
    const responder = game.players[game.getResponderIndex()];
    passPhoneWithSpeech(
      responder,
      startResponderPhase,
      `Now it's ${responder.name}'s turn to answer ${picker.name}'s prompt.\nKeep the phone hidden from others!`
    );
  } catch (err) {
    screens.showAlert("Error", "Error inside selectHint: " + err.message);
  }
}

function initRound() {
  try {
    if (game && game.players) {
      roundScoresSnapshot = game.players.map(p => ({ id: p.id, gold: p.gold }));
    }

    // Генерируем ровно 3 вопроса для выбора
    window.generatedQuestions = [];
    window.viewIndex = 0;
    
    for (let i = 0; i < 3; i++) {
      let q = game.getRandomQuestion();
      q.customCompiledText = null;
      
      currentQuestion = q;
      currentFragmentsState = [];
      
      q.fragments.forEach((frag, idx) => {
        const validOptions = getValidFragmentOptions(idx);
        const randIdx = Math.floor(Math.random() * validOptions.length);
        currentFragmentsState.push(frag.options.indexOf(validOptions[randIdx]));
      });

      window.generatedQuestions.push({
        q: q,
        f: [...currentFragmentsState],
        c: null
      });
    }

    activeSuffix = "";
    activePrefix = "";

    const picker = game.players[game.pickerIndex];
    screens.switchScreen('picker');
    document.getElementById('picker-name').innerText = `${picker.emoji} ${picker.name}`;
    const responder = game.players[game.getResponderIndex()];

    // Обновляем имена в плашках
    const rName = responder.name.toUpperCase();
    const elTop1 = document.getElementById('top-info-responder');
    const elTop2 = document.getElementById('top-info-responder-2');
    const elBottom = document.getElementById('bottom-info-responder');
    if (elTop1) elTop1.innerText = rName;
    if (elTop2) elTop2.innerText = rName;
    if (elBottom) elBottom.innerText = rName;

    const sendBtn = document.getElementById('confirm-prompt-btn');
    if (sendBtn) sendBtn.innerHTML = `Send to ${responder.name} ➜`;

    updateHelpTargetText();

// === ЛОГИКА РЕДАКТИРОВАНИЯ ВОПРОСА ===
    const editToggleBtn = document.getElementById('edit-question-toggle-btn');
    const editBlock = document.getElementById('edit-question-block');
    const questionCarouselWrapper = document.getElementById('question-carousel-wrapper');
    const editPart1 = document.getElementById('edit-q-part1');
    const editPart2 = document.getElementById('edit-q-part2');
    const editPart3 = document.getElementById('edit-q-part3');
    const editSaveBtn = document.getElementById('edit-q-save-btn');

    if (editToggleBtn && editBlock && questionCarouselWrapper) {
      editBlock.style.display = 'none';
      questionCarouselWrapper.style.display = 'block';
      editToggleBtn.innerHTML = "✍️ EDIT THE QUESTION";

      const toggleEdit = () => {
        const isEditing = editBlock.style.display === 'block';
        if (!isEditing) {
          const rawQuestion = getCompiledQuestionString("[ ... ]", "[ ... ]", false);
          const parts = rawQuestion.split("[ ... ]");
          editPart1.value = (parts[0] || "").trim();
          editPart2.value = (parts[1] || "").trim();
          editPart3.value = (parts[2] || "").trim();

          editBlock.style.display = 'block';
          questionCarouselWrapper.style.display = 'none';
          editToggleBtn.innerHTML = "← CANCEL EDITING";
        } else {
          editBlock.style.display = 'none';
          questionCarouselWrapper.style.display = 'block';
          editToggleBtn.innerHTML = "✍️ EDIT THE QUESTION";
        }
      };

      editToggleBtn.onclick = () => { if (audioManager) audioManager.play('click'); toggleEdit(); };

      if (editSaveBtn) {
        editSaveBtn.onclick = () => {
          if (audioManager) audioManager.play('click');
          currentQuestion.customCompiledText = `${editPart1.value.trim()} [ ... ] ${editPart2.value.trim()} [ ... ] ${editPart3.value.trim()}`;
          window.generatedQuestions[window.viewIndex].c = currentQuestion.customCompiledText;
          renderInteractiveQuestion();
          toggleEdit();
        };
      }
    }

    // === НАВИГАЦИЯ ПО 3 ВОПРОСАМ (Карусель) ===
    const prevBtn = document.getElementById('prev-question-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const qIndexDisplay = document.getElementById('question-carousel-index');

    const applyHistoryState = (index) => {
      const state = window.generatedQuestions[index];
      currentQuestion = state.q;
      currentFragmentsState = [...state.f];
      currentQuestion.customCompiledText = state.c;
      renderInteractiveQuestion();
      if (qIndexDisplay) {
        // Убрали слово Question, оставили только счетчик 1/3
        qIndexDisplay.innerText = `${index + 1}/3`;
      }
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        window.generatedQuestions[window.viewIndex].c = currentQuestion.customCompiledText;
        window.viewIndex = (window.viewIndex - 1 + 3) % 3; // Бесконечная прокрутка назад
        applyHistoryState(window.viewIndex);
        if (audioManager) audioManager.play('click');
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        window.generatedQuestions[window.viewIndex].c = currentQuestion.customCompiledText;
        window.viewIndex = (window.viewIndex + 1) % 3; // Бесконечная прокрутка вперед
        applyHistoryState(window.viewIndex);
        if (audioManager) audioManager.play('click');
      };
    }

    // Применяем первый вопрос при старте
    applyHistoryState(0);

    // Логика кастомного и готового промпта
    const presetBlock = document.getElementById('preset-prompt-block');
    const customBlock = document.getElementById('custom-prompt-block');
    const toggleToCustom = document.getElementById('toggle-custom-prompt-btn');
    const toggleToPreset = document.getElementById('toggle-preset-prompt-btn');
    const customInput = document.getElementById('custom-hint-input');

    if (presetBlock && customBlock) {
        presetBlock.style.display = 'block';
        customBlock.style.display = 'none';
        isCustomHintActive = false;
        if (customInput) customInput.value = "";
    }

    if (toggleToCustom) {
        toggleToCustom.onclick = () => {
            if (audioManager) audioManager.play('click');
            presetBlock.style.display = 'none';
            customBlock.style.display = 'block';
            isCustomHintActive = true;
            
            if (customInput) {
                customInput.value = "Name two: ";
                customInput.focus();
                const val = customInput.value;
                customInput.value = '';
                customInput.value = val;
            }
        };
    }

    if (toggleToPreset) {
        toggleToPreset.onclick = () => {
            if (audioManager) audioManager.play('click');
            customBlock.style.display = 'none';
            presetBlock.style.display = 'block';
            isCustomHintActive = false;
            if (customInput) customInput.value = "";
        };
    }

    const confirmBtn = document.getElementById('confirm-prompt-btn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            let chosenHintObj = null;

            if (isCustomHintActive) {
                let val = customInput ? customInput.value.trim() : "";
                if (val.length > 0 && val.toLowerCase() !== "name two:") {
                    if (!val.toLowerCase().startsWith('name')) {
                        val = "Name two: " + val;
                    }
                    chosenHintObj = { text: val, isPlural: false, brainstorm: [] };
                } else {
                    screens.showAlert("Notice", "Please write a topic or go back to the ready-made ones!");
                    return;
                }
            } else {
                if (window.promptHistory && window.promptHistory[window.promptHistoryIndex]) {
                    chosenHintObj = window.promptHistory[window.promptHistoryIndex];
                }
            }

            if (!chosenHintObj) return;
            selectHint(chosenHintObj);
        };
    }
  } catch (err) {
    screens.showAlert("Error", "Error inside initRound: " + err.message);
    console.error(err);
  }
}


function startResponderPhase() {
  try {
    screens.switchScreen('responder');
    const responder = game.players[game.getResponderIndex()];
   
    document.getElementById('responder-name').innerText = `${responder.emoji} ${responder.name}`;
    
    const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');

document.getElementById('displayed-hint').innerHTML = currentHint;
    
    const pluralWarning = document.getElementById('responder-plural-warning');
    if (pluralWarning) {
        // Если Пикер отредактировал секретный вопрос или написал свой промпт — скрываем подсказку
        if (currentQuestion.customCompiledText || isCustomHintActive) {
            pluralWarning.style.display = 'none';
        } else {
            pluralWarning.style.display = window.currentHintRequiresPlural ? 'block' : 'none';
        }
    }

    in1.placeholder = "First answer";
    in2.placeholder = "Second answer";

    const helperToggle = document.getElementById('responder-helper-toggle');
    const helperBox = document.getElementById('responder-helper-box') || (helperToggle ? helperToggle.parentElement : null);
    const helperContent = document.getElementById('responder-helper-content');
    const helperText = document.getElementById('responder-helper-text');
   
    if (helperToggle && helperContent && helperText) {
      if (helperBox) helperBox.style.display = 'none';
      helperContent.style.display = 'none';
      helperToggle.innerText = '💡 Ideas'; 
     
      let ideas = [];
      if (!isCustomHintActive && currentHintObject && typeof currentHintObject === 'object' && Array.isArray(currentHintObject.brainstorm)) {
        ideas = currentHintObject.brainstorm;
      }

      if (ideas.length > 0) {
        const randomIdeas = [...ideas].sort(() => Math.random() - 0.5).slice(0, 4);
        helperText.innerText = randomIdeas.join(', ');
        
        if (helperBox) helperBox.style.display = 'block';
       
        helperToggle.onclick = (e) => {
          e.stopPropagation();
          const isCollapsed = helperContent.style.display === 'none';
          if (isCollapsed) {
            helperContent.style.display = 'block';
            helperToggle.innerText = '🔼 Hide ideas';
          } else {
            helperContent.style.display = 'none';
            helperToggle.innerText = '💡 Ideas';
          }
          if (audioManager) audioManager.play('click');
        };
      }
    }
   
    const counter1 = document.getElementById('word-counter-1');
    const counter2 = document.getElementById('word-counter-2');
   
    in1.value = ""; in2.value = "";
    in1.disabled = false; in2.disabled = false; 
   
    const resetCounter = (counterEl) => {
      const txt = counterEl.querySelector('.counter-text');
      const lock = counterEl.querySelector('.lock-icon');
      if (txt && lock) {
        txt.innerText = "0/25";
        txt.style.display = "inline";
        lock.style.display = "none";
      } else {
        counterEl.innerText = "0/25";
      }
    };
    resetCounter(counter1);
    resetCounter(counter2);

    in1.oninput = (e) => {
      const txt = counter1.querySelector('.counter-text');
      if (txt) txt.innerText = `${e.target.value.length}/25`;
    };
    in2.oninput = (e) => {
      const txt = counter2.querySelector('.counter-text');
      if (txt) txt.innerText = `${e.target.value.length}/25`;
    };
   
    const submitWordsBtn = document.getElementById('submit-words-btn');
    const choiceBlock = document.getElementById('responder-choice-block');
    choiceBlock.style.display = 'none';
   
    submitWordsBtn.onclick = () => {
      const w1 = in1.value.trim().toUpperCase();
      const w2 = in2.value.trim().toUpperCase();
     
      if (!w1 || !w2 || w1 === w2) {
        screens.showAlert("Notice", "Enter 2 different words!");
        return;
      }

      let finalW1 = w1;
      let finalW2 = w2;

      let rawQuestionStr = currentQuestion.customCompiledText || "";
      if (!rawQuestionStr) {
          rawQuestionStr = currentQuestion.text + " ";
          currentQuestion.fragments.forEach((frag, i) => {
            rawQuestionStr += frag.options[currentFragmentsState[i]].text + " ";
          });
      }

      const suffixes = ["ism", "land", "ville", "field"];
      const prefixes = ["The Republic of "]; 
      
      let detectedSuffix = "";
      let detectedPrefix = "";
      
      for (const suf of suffixes) {
        if (rawQuestionStr.includes(`[ ... ]${suf}`)) {
          detectedSuffix = suf;
          break;
        }
      }
      for (const pref of prefixes) {
        if (rawQuestionStr.includes(`${pref}[ ... ]`)) {
          detectedPrefix = pref;
          break;
        }
      }

      if (detectedSuffix) {
          activeSuffix = detectedSuffix.toUpperCase();
          
          const processStem = (word, suf) => {
             let hyphenated = word.split(/\s+/).filter(Boolean).join('-');
             if (suf === "ism") {
                 if (hyphenated.endsWith('Y')) hyphenated = hyphenated.slice(0, -1);
                 if (hyphenated.endsWith('IST')) hyphenated = hyphenated.slice(0, -3);
                 if (hyphenated.endsWith('E')) hyphenated = hyphenated.slice(0, -1);
             }
             return hyphenated + suf.toUpperCase(); 
          };
          
          finalW1 = processStem(w1, detectedSuffix);
          finalW2 = processStem(w2, detectedSuffix);
          
          const regex = new RegExp(`\\[ \\.\\.\\. \\]${detectedSuffix}`, 'g');
          currentQuestion.customCompiledText = rawQuestionStr.replace(regex, "[ ... ]");
          
      } else if (detectedPrefix) {
          activePrefix = detectedPrefix.toUpperCase();
      }

      const tokens1 = finalW1.split(/\s+/).filter(Boolean);
      const tokens2 = finalW2.split(/\s+/).filter(Boolean);
      const isMultiWord = tokens1.length > 1 || tokens2.length > 1;

      const hasSimpleColor = tokens1.some(t => SIMPLE_COLORS.includes(t)) || tokens2.some(t => SIMPLE_COLORS.includes(t));
      const hasSimpleMaterialBoth = tokens1.some(t => SIMPLE_MATERIALS.includes(t)) && tokens2.some(t => SIMPLE_MATERIALS.includes(t));
      const hasSimpleMoodBoth = tokens1.some(t => SIMPLE_MOODS.includes(t)) && tokens2.some(t => SIMPLE_MOODS.includes(t));
      const hasSimpleEra = tokens1.some(t => SIMPLE_ERAS.includes(t)) || tokens2.some(t => SIMPLE_ERAS.includes(t));
      const fullWord1 = w1.trim();
      const fullWord2 = w2.trim();
      const hasSimpleCountry = tokens1.some(t => SIMPLE_COUNTRIES.includes(t)) || tokens2.some(t => SIMPLE_COUNTRIES.includes(t));
      const hasSimpleCity = SIMPLE_CITIES.includes(fullWord1) || SIMPLE_CITIES.includes(fullWord2);
      const hasSimpleFood = tokens1.some(t => SIMPLE_FOODS.includes(t)) || tokens2.some(t => SIMPLE_FOODS.includes(t));
      
      const hasSimpleSport = tokens1.some(t => SIMPLE_SPORTS.includes(t)) || tokens2.some(t => SIMPLE_SPORTS.includes(t));
      const hasSimpleProf = tokens1.some(t => SIMPLE_PROFESSIONS.includes(t)) || tokens2.some(t => SIMPLE_PROFESSIONS.includes(t));
      const hasSimpleVeggie = tokens1.some(t => SIMPLE_VEGETABLES.includes(t)) || tokens2.some(t => SIMPLE_VEGETABLES.includes(t));
      const hasSimpleFruit = tokens1.some(t => SIMPLE_FRUITS.includes(t)) || tokens2.some(t => SIMPLE_FRUITS.includes(t));
      const hasSimpleClothes = tokens1.some(t => SIMPLE_CLOTHES.includes(t)) || tokens2.some(t => SIMPLE_CLOTHES.includes(t));

      let shouldNerf = hasSimpleColor || hasSimpleMaterialBoth || hasSimpleMoodBoth || hasSimpleEra || hasSimpleCountry || hasSimpleCity || hasSimpleFood || hasSimpleSport || hasSimpleProf || hasSimpleVeggie || hasSimpleFruit || hasSimpleClothes;

      if (isMultiWord) {
        shouldNerf = false;
      }

      shifter = new WordShifter(finalW1, finalW2, shouldNerf, isMultiWord);
     
      if (activeSuffix) {
          const revealSuffix = (word, openedSet, suf) => {
              if (word.endsWith(suf)) {
                  for (let i = 1; i <= suf.length; i++) {
                      openedSet.add(word.length - i);
                  }
              }
          };
          revealSuffix(finalW1, shifter.openedIndices1, activeSuffix);
          revealSuffix(finalW2, shifter.openedIndices2, activeSuffix);
      }

      in1.disabled = true;
      in2.disabled = true;

      const updateCounterToLocked = (counterEl) => {
        const txt = counterEl.querySelector('.counter-text');
        const lock = counterEl.querySelector('.lock-icon');
        if (txt && lock) {
          txt.style.display = "none";
          lock.style.display = "inline";
        }
      };
      updateCounterToLocked(counter1);
      updateCounterToLocked(counter2);

      choiceBlock.style.display = 'block';

      const finalQ = getCompiledQuestionString(finalW1, finalW2, false);
      document.getElementById('responder-final-question').innerText = finalQ;
     
      const opt1 = document.getElementById('opt-btn-1');
      const opt2 = document.getElementById('opt-btn-2');
      opt1.innerText = finalW1; opt2.innerText = finalW2;
     
      opt1.onclick = () => confirmResponderChoice(finalW1, finalW2, finalW1);
      opt2.onclick = () => confirmResponderChoice(finalW1, finalW2, finalW2);

      setTimeout(() => {
        choiceBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    };
  } catch (err) {
    screens.showAlert("Error", "Error inside startResponderPhase: " + err.message);
  }
}

function confirmResponderChoice(w1, w2, choice) {
  try {
    responderChoice = choice;
    unchosenChoice = (choice === w1) ? w2 : w1; // <--- ДОБАВЛЕН ОТВЕРГНУТЫЙ ОТВЕТ
    const responder = game.players[game.getResponderIndex()];
   
    const plainQuestionText = getCompiledQuestionString("___", "___", false);
    game.saveRoundToHistory(plainQuestionText, currentHint, w1, w2, choice);
   
    if (currentQuestion.canTriggerCombo && typeof game.setQueuedCombo === 'function') {
      let comboWord = choice;
      if (activePrefix) {
         comboWord = activePrefix + choice; 
      }
      game.setQueuedCombo(comboWord, currentQuestion.category);
    }

    const fullQuestionText = getCompiledQuestionString(w1, w2, true);
    const formattedResultString = `<strong>${responder.name}</strong> chose ` +
      `<span style="color: #00ffb3; font-weight: bold;">${choice}</span> in the question:<br>` +
      `<span style="color: var(--muted); font-style: italic;">"${fullQuestionText}"</span>`;
   
    game.history[game.history.length - 1].resultSentence = formattedResultString;
   
    remainingGuessers = [game.pickerIndex, ...game.getOtherGuessersIndices()];
    totalGuessersThisRound = remainingGuessers.length; 
    setupNextGuesser();
  } catch (err) {
    screens.showAlert("Error", "Error inside confirmResponderChoice: " + err.message);
  }
}

function setupNextGuesser() {
  try {
    if (remainingGuessers.length === 0) {
      game.nextTurn();
      if (game.isGameOver()) {
        showFinalScores();
      } else {
        passPhoneWithSpeech(game.players[game.pickerIndex], initRound);
      }
      return;
    }
   
    currentGuesserIndex = remainingGuessers.shift();
    oralHintUsedThisTurn = false;
    shifter = new WordShifter(shifter.orig1, shifter.orig2, shifter.isNerfed, shifter.isMultiWord);
    
    if (activeSuffix) {
        const revealSuffix = (word, openedSet, suf) => {
            if (word.endsWith(suf)) {
                for (let i = 1; i <= suf.length; i++) {
                    openedSet.add(word.length - i);
                }
            }
        };
        revealSuffix(shifter.orig1, shifter.openedIndices1, activeSuffix);
        revealSuffix(shifter.orig2, shifter.openedIndices2, activeSuffix);
    }

    revealCount = 0;
   
    window.scrollTo({ top: 0, behavior: 'instant' });
    const responderName = game.players[game.getResponderIndex()].name;
    
    const guesser = game.players[currentGuesserIndex];
    const emojiName = EMOJI_NAMES[guesser.emoji] || "";

    const shortSpeech = `Pass the phone to ${emojiName} ${guesser.name}, and ${responderName} can watch.`;

    passPhoneWithSpeech(
      guesser,
      startGuesserPhase,
      `Only this player should hold the phone, but ${responderName} can watch!`,
      false,       
      shortSpeech  
    );
  } catch (err) {
    screens.showAlert("Error", "Error inside setupNextGuesser: " + err.message);
  }
}
function startGuesserPhase() {
  try {
    const guesser = game.players[currentGuesserIndex];

    if (revealCount === 0) {
      const isCatchUp = guesser.lastGuessCorrect === false;
      shifter.autoReveal(isCatchUp);
      revealCount = 1;
    }

    setupRevealButtons();
    updateGuesserUI();

    screens.switchScreen('guesser');
   
    const nameEl = document.getElementById('guesser-name');
    if (nameEl && game && typeof currentGuesserIndex === 'number') {
      nameEl.innerText = `${guesser.emoji} ${guesser.name}`;
    }
   
    const btn1 = document.getElementById('guess-word-1');
    const btn2 = document.getElementById('guess-word-2');
   
    if (btn1 && shifter) {
      btn1.onclick = () => makeGuess(shifter.orig1);
    }
    if (btn2 && shifter) {
      btn2.onclick = () => makeGuess(shifter.orig2);
    }
  } catch (err) {
    console.error("Error inside startGuesserPhase:", err);
  }
}

function setupRevealButtons() {
  const randBtn = document.getElementById('ability-extra-rand-btn');
  const lengthBtn = document.getElementById('ability-length-btn');
 
  const getButtonState = () => {
    if (revealCount === 1) return { disabled: false, cost: 15 };
    return { disabled: true, cost: 0 };
  };
 
  const state = getButtonState();

  if (randBtn) randBtn.disabled = state.disabled;
  if (lengthBtn) lengthBtn.disabled = state.disabled;
 
  if (randBtn) randBtn.onclick = (e) => { e.stopPropagation(); if (!randBtn.disabled) useReveal('random', state.cost); };
  if (lengthBtn) lengthBtn.onclick = (e) => { e.stopPropagation(); if (!lengthBtn.disabled) useReveal('length', state.cost); };
}

function useReveal(revealType, cost) {
  const guesser = game.players[currentGuesserIndex];
 
  if (cost > 0 && guesser.gold < cost) {
    screens.showAlert("Notice", 'Not enough points for this reveal!');
    return;
  }

  if (cost > 0) {
    guesser.gold -= cost;
    animateGoldChange(-cost);
  }

  if (revealType === 'random') {
    shifter.revealExtraRandom();
  } else if (revealType === 'length') {
    shifter.revealLength();
  }

  audioManager.playRevealCombo();
  revealCount++;

  const rollStatusEl = document.getElementById('ability-roll-status');
  if (rollStatusEl) {
    rollStatusEl.classList.remove('pulse-shake');
    void rollStatusEl.offsetWidth;
    rollStatusEl.classList.add('pulse-shake');
  }

  setupRevealButtons();
  updateGuesserUI();
}

function updateGuesserUI() {
  try {
    const progressEl = document.getElementById('guesser-round-progress');
    if (progressEl && game) {
      const currentGuesserStep = totalGuessersThisRound - remainingGuessers.length;
      let elements = [];
      
      if (game.totalRounds > 1) {
        elements.push(`<span>ROUND ${game.currentRound}/${game.totalRounds}</span>`);
      }
      if (game.players.length > 2) {
        elements.push(`<span>GUESSER ${currentGuesserStep} OF ${totalGuessersThisRound}</span>`);
      }
      
      if (elements.length > 0) {
        progressEl.innerHTML = elements.join(' <span style="color: rgba(255,255,255,0.15)">|</span> ');
        progressEl.style.display = 'flex';
      } else {
        progressEl.innerHTML = '';
        progressEl.style.display = 'none';
      }
    }

    const masks = shifter.getMaskedWords();
    const hintEl = document.getElementById('guesser-displayed-hint');
    const scoreEl = document.getElementById('potential-score');
    const balanceEl = document.getElementById('gold-balance');
    const guess1Btn = document.getElementById('guess-word-1');
    const guess2Btn = document.getElementById('guess-word-2');

    if (hintEl) hintEl.innerHTML = currentHint;
    if (scoreEl) scoreEl.innerText = `Win: +${FIXED_REWARD} points`;
    if (balanceEl) balanceEl.innerText = `${game.players[currentGuesserIndex].name}'s score: ${game.players[currentGuesserIndex].gold}`;

    const rawQuestion = getCompiledQuestionString("[ ... ]", "[ ... ]", false);
    const parts = rawQuestion.split("[ ... ]");
    
    const part1El = document.getElementById('guesser-q-part1');
    const part2El = document.getElementById('guesser-q-part2');
    const part3El = document.getElementById('guesser-q-part3');
    
    if (part1El) part1El.innerText = parts[0] ? parts[0].trim() : "";
    if (part2El) part2El.innerText = parts[1] ? parts[1].trim() : "";
    if (part3El) part3El.innerText = parts[2] ? parts[2].trim() : "";

    if (guess1Btn) guess1Btn.innerHTML = `<div class="masked-wrapper" style="margin: 0; justify-content: center;">${masks.w1}</div>`;
    if (guess2Btn) guess2Btn.innerHTML = `<div class="masked-wrapper" style="margin: 0; justify-content: center;">${masks.w2}</div>`;

    const randBtn = document.getElementById('ability-extra-rand-btn');
    const lengthBtn = document.getElementById('ability-length-btn');

    const rollStatusEl = document.getElementById('ability-roll-status');
    if (rollStatusEl) {
      if (revealCount === 1) {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = `💡 Spend 15 points for one reveal.`;
      } else {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = `🔒 Reveal spent`;
      }
    }

    updateStatsBarVisibility();

    const renderAbility = (btn, label, icon) => {
      if (!btn) return;
      const row = btn.closest('.ability-row');

      btn.innerHTML = `
        <div class="ability-main-line">
          <strong>${icon} ${label}</strong>
        </div>
        <span class="ability-cost">-15 pts</span>
      `;
     
      if (btn.disabled) {
        if (row) {
          if (!row.classList.contains('burned')) {
            row.classList.add('burned');
            setTimeout(() => {
              if (row.classList.contains('burned')) {
                row.style.setProperty('display', 'none', 'important');
                row.style.marginBottom = '0';
              }
            }, 350);
          }
        }
      } else {
        if (row) {
          row.classList.remove('burned');
          row.style.setProperty('display', 'flex', 'important');
          row.style.marginBottom = '10px';
        }
      }
    };

    renderAbility(randBtn, 'Random letters', '🎲');
    renderAbility(lengthBtn, "Word length & 1st letters", '📏');

    const abilitiesContainer = document.querySelector('.abilities-list-vertical');
    if (abilitiesContainer) {
      if (revealCount >= 2) {
        setTimeout(() => { abilitiesContainer.style.display = 'none'; }, 400);
      } else {
        abilitiesContainer.style.display = 'flex';
      }
    }

    const oralBtn = document.getElementById('oral-hint-btn');
    if (oralBtn) {
      if (game && game.players.length === 2 && revealCount >= 2 && !oralHintUsedThisTurn) {
        oralBtn.style.setProperty('display', 'block', 'important');
        oralBtn.onclick = (e) => {
          e.stopPropagation();
          const guesser = game.players[currentGuesserIndex];
         
          if (guesser.gold < 10) {
            screens.showAlert("Notice", 'Not enough points for an oral hint!');
            return;
          }
         
          guesser.gold -= 10;
          oralHintUsedThisTurn = true; 
          animateGoldChange(-10);
         
          screens.showAlert("💬 Oral Hint Activated!", `Ask your friend to give you a single honest oral hint or association about their choice.\n\n(For example: "This is a physical object" or "I encounter this at work")`);
          updateGuesserUI();
        };
      } else {
        oralBtn.style.setProperty('display', 'none', 'important');
      }
    }
  } catch (err) {
    console.error("Error in updateGuesserUI render loop:", err);
  }
}

export function getSmartProp(word) {
  if (!word) return null;
  const w = word.toUpperCase();
  if (w.includes("DOG") || w.includes("PUPPY")) return "🐶";
  if (w.includes("CAT") || w.includes("KITTEN")) return "🐱";
  if (w.includes("HORSE") || w.includes("PONY")) return "🐴";
  if (w.includes("BIRD") || w.includes("EAGLE") || w.includes("PARROT")) return "🐦";
  if (w.includes("FISH") || w.includes("SHARK")) return "🐟";
  if (w.includes("MONEY") || w.includes("CASH") || w.includes("DOLLAR") || w.includes("BANK")) return "💸";
  if (w.includes("CAR") || w.includes("DRIVE")) return "🚗";
  if (w.includes("HOUSE") || w.includes("HOME")) return "🏠";
  if (w.includes("APPLE")) return "🍎";
  if (w.includes("BOOK") || w.includes("READ")) return "📖";
  if (w.includes("PHONE") || w.includes("APP")) return "📱";
  return null;
}

export function generateVisualScene(isCorrect, sceneKeys, involvesGuesser, responder, guesser, picker, trueWord, prevChoice = "", unchosenWord = "") {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
    return ''; 
  }

  const smartProp = getSmartProp(trueWord);

  let activeSceneKey = sceneKeys.find(t => SCENE_REGISTRY[t]);
  if (!activeSceneKey) return '';
  const sceneData = SCENE_REGISTRY[activeSceneKey];

  let bgClass = "stars-bg";
  let bgStyle = "background-color: transparent;";
  
  if (sceneData.bg && (sceneData.bg.url || sceneData.bg.local)) {
    let bgUrl = sceneData.bg.local ? `src/ui/${sceneData.bg.local}` : sceneData.bg.url;
    let bgSize = sceneData.bg.cover ? 'cover' : `${sceneData.bg.s}%`;
    bgStyle = `background-image: url('${bgUrl}'); background-position: ${sceneData.bg.x}% ${sceneData.bg.y}%; background-size: ${bgSize};`;
    bgClass = ""; 
  }

  let elementsHtml = sceneData.elements.map((el, index) => {
    let renderContent = String(el.content);
    renderContent = renderContent.replace(/\[PICKER\]/g, picker.emoji);
    renderContent = renderContent.replace(/\[RESPONDER\]/g, responder.emoji);
    renderContent = renderContent.replace(/\[GUESSER\]/g, guesser.emoji);
    renderContent = renderContent.replace(/\[PICKER_NAME\]/g, picker.name);
    renderContent = renderContent.replace(/\[RESPONDER_NAME\]/g, responder.name);
    renderContent = renderContent.replace(/\[GUESSER_NAME\]/g, guesser.name);
    
    renderContent = renderContent.replace(/\[SMART_PROP\]/g, smartProp || '');
    renderContent = renderContent.replace(/\[GUESS_WORD\]/g, trueWord || ''); 
    renderContent = renderContent.replace(/\[PREV_CHOICE\]/g, prevChoice || '');
    renderContent = renderContent.replace(/\[UNCHOSEN_WORD\]/g, unchosenWord || '');

    let finalS = el.s;
    let extraStyles = "";
    let contentHtml = renderContent;
    
    if (el.type === 'text') {
      const align = el.textAlign || 'center';
      const maxW = el.maxWidth !== undefined ? el.maxWidth : 90;
      const lh = el.lineHeight !== undefined ? el.lineHeight : 1.2;
      const tBg = el.textBg || 'none';
      
      extraStyles += `white-space: pre-wrap; text-align: ${align}; max-width: ${maxW}vw; line-height: ${lh}; `;
      
      if (tBg === 'black') {
          extraStyles += `background: rgba(0,0,0,0.85); padding: 0.15em 0.35em; border-radius: 0.25em; box-decoration-break: clone; -webkit-box-decoration-break: clone; `;
      } else if (tBg === 'white') {
          extraStyles += `background: rgba(255,255,255,0.95); padding: 0.15em 0.35em; border-radius: 0.25em; box-decoration-break: clone; -webkit-box-decoration-break: clone; `;
      }

      if (!el.fixedText && renderContent.length > 8) {
        finalS = el.s * Math.max(0.25, 8 / renderContent.length);
      }
      if (el.fixedText) {
        extraStyles += "white-space: nowrap; max-width: none; ";
      }
    } else if (el.type === 'image') {
      contentHtml = `<img src="${renderContent}" style="height: 1em; width: auto; object-fit: contain; display: block;">`;
    }

    let filterStyle = el.glow ? 'filter: drop-shadow(0 0 15px var(--positive));' : 'filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));';

    if (renderContent === '🏳️') {
      renderContent = '⚑\uFE0E'; 
      extraStyles += `color: ${isCorrect ? 'var(--positive)' : 'var(--danger)'} !important; font-family: sans-serif !important; `;
      contentHtml = renderContent;
    }

    let overlayHtml = '';
    if (el.emo && el.emo.enabled) {
      const anchor = EYE_ANCHORS[renderContent] || EYE_ANCHORS["default"];
      const ovX = anchor.x || 0;
      const ovY = anchor.y || 0;
      const ovS = anchor.s || 1; 

      const winOverlay = `<img src="src/ui/acostajnalec-sunglasses-5040012_1280.png" style="width: 1.15em; height: auto; object-fit: contain;">`;
      const loseOverlay = `<div style="transform: translate(0.45em, 0.05em);"><span style="font-size: 0.35em; text-shadow: 0 2px 4px rgba(0,0,0,0.4); display: inline-block; animation: dropTear 1.2s infinite ease-in;">💧</span></div>`;
      const overlayEmoji = isCorrect ? winOverlay : loseOverlay;

      overlayHtml = `<div style="position: absolute; left: 50%; top: 50%; display: flex; justify-content: center; align-items: center; transform: translate(calc(-50% + ${ovX}%), calc(-50% + ${ovY}%)) scale(${ovS}); z-index: 4; pointer-events: none;">${overlayEmoji}</div>`;
    }

    let textStyles = el.type === 'text' ? `color: ${el.color || '#ffffff'}; font-family: ${el.font || 'inherit'}; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;` : '';

    return `<div class="scene-element ${el.anim}" style="--x: ${el.x}%; --y: ${el.y}%; --s: ${finalS}; --r: ${el.r}deg; --flip: ${el.flipX ? -1 : 1}; z-index: ${index + 2}; ${textStyles} ${filterStyle} ${extraStyles}">${contentHtml}${overlayHtml}</div>`;
  }).join('');

  return `<div class="alert-visual-scene ${bgClass}" style="${bgStyle} border-bottom-color: ${isCorrect ? 'var(--positive)' : 'var(--danger)'};">${elementsHtml}</div>`;
}

function makeGuess(word) {
  try {
    const guesser = game.players[currentGuesserIndex];
    const isCorrect = (word === responderChoice);
    const goldBefore = guesser.gold; 
   
    guesser.lastGuessCorrect = isCorrect;

    const candidateScenes = [];

    if (currentQuestion && currentQuestion.fragments) {
      currentQuestion.fragments.forEach((frag, i) => {
        const stateIndex = currentFragmentsState[i];
        if (stateIndex !== undefined && stateIndex !== -1) {
          const selectedOpt = frag.options[stateIndex];
          if (selectedOpt && selectedOpt.scene) candidateScenes.push(selectedOpt.scene);
        }
      });
    }

    candidateScenes.sort(() => Math.random() - 0.5);

    const sceneKeys = [...candidateScenes];
    if (currentQuestion && currentQuestion.scene) sceneKeys.push(currentQuestion.scene); 
    if (currentQuestion) sceneKeys.push(currentQuestion.id.toString());

    if (isCorrect) {
      guesser.gold += FIXED_REWARD;
      animateGoldChange(FIXED_REWARD, true);
      audioManager.play('win', audioManager.getVolume() * 0.6);
    } else {
      audioManager.play('lose', audioManager.getVolume() * 0.75);
    }

    const lastRoundData = game.history[game.history.length - 1];
    const formattedSentence = lastRoundData.resultSentence; 
    const statusIcon = isCorrect ? "🎉 CORRECT!" : "❌ WRONG!";
    const finalWallet = guesser.gold;
    const guessColor = isCorrect ? 'var(--positive)' : 'var(--danger)';

    const picker = game.players[game.pickerIndex];
    const responder = game.players[game.getResponderIndex()];
    const rawText = currentQuestion.customCompiledText || currentQuestion.text || "";
    const involvesGuesser = rawText.includes('[GUESSER]');
    const prevChoiceText = currentQuestion.comboWord || "";
    
    // ВЫЗЫВАЕМ ГЕНЕРАТОР С ПОЛНЫМ НАБОРОМ ДАННЫХ
    const visualScene = generateVisualScene(isCorrect, sceneKeys, involvesGuesser, responder, guesser, picker, responderChoice, prevChoiceText, unchosenChoice);

    const alertMessage = `<div style="text-align: center; margin-bottom: 10px;"><span style="font-size: 1.1rem; font-weight: 800; color: #ffd56b;">Score: ${goldBefore} ➔ ${finalWallet}</span></div>` +
      visualScene + 
      `<div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 14px; border: 1px dashed rgba(255,255,255,0.15); font-size: 0.95rem; text-align: center; white-space: normal;"><div style="margin-bottom: 10px; font-weight: 700;">Your guess: <span style="color: ${guessColor}; text-transform: uppercase;">"${word}"</span></div><div style="line-height: 1.5; color: #e8e9f1;">${formattedSentence}</div></div>`;

    let currentSceneAudio = null;
    let fadeOutInterval = null; 
    let activeSceneKey = sceneKeys.find(t => SCENE_REGISTRY[t]);
    let activeScene = activeSceneKey ? SCENE_REGISTRY[activeSceneKey] : null;

    if (activeScene && activeScene.sfx) {
      setTimeout(() => {
        currentSceneAudio = new Audio(`./src/audio/${activeScene.sfx}`);
        currentSceneAudio.volume = 0;
        currentSceneAudio.play().then(() => {
          let vol = 0;
          const fadeIn = setInterval(() => {
            vol += 0.1;
            if (vol >= 0.7) {
              currentSceneAudio.volume = 0.7;
              clearInterval(fadeIn);
            } else {
              currentSceneAudio.volume = vol;
            }
          }, 40);

          setTimeout(() => {
            if (currentSceneAudio && !currentSceneAudio.paused && !fadeOutInterval) {
              let outVol = currentSceneAudio.volume;
              fadeOutInterval = setInterval(() => {
                outVol -= 0.1;
                if (outVol <= 0.05) {
                  clearInterval(fadeOutInterval);
                  currentSceneAudio.pause();
                } else {
                  currentSceneAudio.volume = outVol;
                }
              }, 50);
            }
          }, 5000);
        }).catch(() => {});
      }, 600);
    }

    screens.showAlert(statusIcon, alertMessage, () => {
      if (currentSceneAudio && !currentSceneAudio.paused) {
         if (fadeOutInterval) clearInterval(fadeOutInterval);
         let vol = currentSceneAudio.volume;
         const fastFadeOut = setInterval(() => {
            vol -= 0.15;
            if (vol <= 0.05) {
               clearInterval(fastFadeOut);
               currentSceneAudio.pause();
               currentSceneAudio.currentTime = 0;
               setupNextGuesser();
            } else {
               currentSceneAudio.volume = vol;
            }
         }, 30);
      } else {
         setupNextGuesser();
      }
    });

  } catch (err) {
    screens.showAlert("Error", "Error inside makeGuess: " + err.message);
    console.error(err);
  }
}

async function showFinalScores() {
  try {
    screens.switchScreen('final');
   
    const leaderboard = [...game.players].sort((a, b) => (b.gold || 0) - (a.gold || 0));
    document.getElementById('final-scores-list').innerHTML = leaderboard
      .map(p => `<li><strong>${p.emoji} ${p.name}</strong>: ${p.gold || 0} points</li>`).join('');

    const playerList = document.getElementById('history-player-list');
    const selectedFrame = document.getElementById('final-history-window');

    playerList.innerHTML = game.players.map((player, index) => `
      <button class="btn btn-small history-player-btn" data-player="${player.name}" data-index="${index}">
        ${player.emoji} ${player.name}
      </button>
    `).join('');

    const renderHistoryForPlayer = (playerName) => {
      const playerHistory = game.history.filter((h) => h.responder === playerName);
      const rows = playerHistory
        .map((h) => `
          <div class="history-card">
            <div class="history-card-header">
              <strong>Round ${h.round}</strong>
            </div>
            <p class="history-card-text">${h.resultSentence}</p>
          </div>
        `)
        .join('');

      selectedFrame.innerHTML = `
        <div class="history-window">
          <h4 style="margin: 0 0 12px 0; font-size: 1rem; color: var(--text);">
            Choices by ${playerName}
          </h4>
          ${rows || '<p style="color: var(--muted);">No choices were made by this player.</p>'}
        </div>
      `;
    };

    const buttons = playerList.querySelectorAll('.history-player-btn');
    buttons.forEach((button) => {
      button.onclick = () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderHistoryForPlayer(button.dataset.player);
      };
    });

    if (buttons.length > 0) {
      buttons[0].classList.add('active');
      renderHistoryForPlayer(buttons[0].dataset.player);
    }

    const stopVoiceBtn = document.getElementById('stop-voice-btn');
    if (audioManager && !audioManager.isScreenReaderMode) {
      audioManager.stopSpeech(); 
      audioManager.cancelQueue = false;
      
      stopVoiceBtn.style.display = 'inline-block';
      stopVoiceBtn.onclick = () => {
        audioManager.stopSpeech();
        stopVoiceBtn.style.display = 'none';
      };

      const topScore = leaderboard[0].gold;
      const winners = leaderboard.filter(p => p.gold === topScore);
      const losers = leaderboard.filter(p => p.gold !== topScore);
      
      let winnerSpeechText = "";
      let playFanfares = true;

      let winnersNamesStr = winners.map(w => w.name).join(", ");
      if (winners.length > 1) {
        const lastCommaIndex = winnersNamesStr.lastIndexOf(", ");
        winnersNamesStr = winnersNamesStr.substring(0, lastCommaIndex) + " and " + winnersNamesStr.substring(lastCommaIndex + 2);
      }

      if (winners.length === leaderboard.length) {
        if (leaderboard.length === 2) {
          winnerSpeechText = `It's a draw! Both ${winners[0].name} and ${winners[1].name} finished with ${topScore} points.`;
          playFanfares = false; 
        } else {
          winnerSpeechText = `Unbelievable! Everyone tied. ${winnersNamesStr} all finished with ${topScore} points.`;
        }
      } else if (winners.length > 1) {
        winnerSpeechText = `First place is shared by ${winnersNamesStr} with ${topScore} points!`;
      } else {
        winnerSpeechText = `The winner is ${winners[0].name} with ${topScore} points!`;
      }

      try {
        await audioManager.speakAsync(winnerSpeechText);
        if (audioManager.cancelQueue) return;
        
        if (playFanfares) {
          await audioManager.playAsync('fanfare', audioManager.getVolume() * 0.75);
          if (audioManager.cancelQueue) return;
        }

        if (losers.length > 0) {
          let losersSpeech = losers.length === 1 ? "Followed by " : "Other scores: ";
          losersSpeech += losers.map(p => `${p.name} with ${p.gold || 0}`).join(", ") + " points.";
          await audioManager.speakAsync(losersSpeech);
          if (audioManager.cancelQueue) return;
        }

        let historyText = "Here is the history of all choices. ";
        game.history.forEach(h => {
          let cleanSentence = h.resultSentence.replace(/<\/?[^>]+(>|$)/g, "");
          historyText += cleanSentence + ". ";
        });
        await audioManager.speakAsync(historyText);

      } catch (e) {
        console.debug("Speech queue interrupted:", e);
      }
    } else {
      stopVoiceBtn.style.display = 'none';
    }

    const backBtn = document.getElementById('back-to-setup-btn');
    if (backBtn) {
      backBtn.onclick = resetToSetupState;
    }

  } catch (err) {
    screens.showAlert("Error", "Error inside showFinalScores: " + err.message);
    console.error(err);
  }
}

function animateGoldChange(amount, positive = false) {
  try {
    const el = document.getElementById('gold-balance');
    if (!el) return;
    if (game && typeof currentGuesserIndex === 'number' && game.players[currentGuesserIndex]) {
      el.innerText = `${game.players[currentGuesserIndex].name}'s score: ${game.players[currentGuesserIndex].gold}`;
    }
    updateStatsBarVisibility();
    const cls = positive ? 'gold-add' : 'gold-spend';
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 900);
  } catch (e) {}
}

let deferredPrompt;
const installBtn = document.getElementById('install-app-btn');

const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn && !isIOS && !isStandalone) { 
    installBtn.style.display = 'block';
    setTimeout(() => installBtn.style.opacity = '1', 50); 
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (window.audioManager) window.audioManager.play('click');
    
    if (isIOS) {
      screens.showAlert(
        "🍏 Install on iPhone", 
        "To play in full-screen mode like a real app:\n\n1. Tap the Share button (square with an arrow pointing up) at the bottom of the screen.\n2. Scroll down and tap 'Add to Home Screen' ➕."
      );
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installBtn.style.opacity = '0';
        setTimeout(() => installBtn.style.display = 'none', 400);
      }
      deferredPrompt = null;
    }
  });
}

function setupVideoTutorial() {
  const tutorialBtn = document.getElementById('tutorial-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const tutorialVideo = document.getElementById('tutorial-video');
  const speedBtns = document.querySelectorAll('.speed-btn');

  if (!tutorialBtn || !videoModal || !tutorialVideo) return;

  const defaultVideoSrc = 'https://www.youtube.com/embed/TU6HCiXeL0A?rel=0&playsinline=1&modestbranding=1&enablejsapi=1';
  tutorialVideo.removeAttribute('src');

  const setSpeedActive = (targetBtn) => {
    speedBtns.forEach(btn => {
      const active = btn === targetBtn;
      btn.style.background = active ? 'var(--accent)' : 'rgba(255,255,255,0.05)';
      btn.style.borderColor = active ? 'var(--accent)' : 'rgba(255,255,255,0.1)';
      btn.style.color = active ? '#fff' : 'var(--text)';
    });
  };

  const applyVideoSpeed = (speed) => {
    const numericSpeed = Number(speed);
    if (!Number.isFinite(numericSpeed)) return;

    try {
      if (tutorialVideo && tutorialVideo.contentWindow) {
        tutorialVideo.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'setPlaybackRate',
          args: [numericSpeed]
        }), '*');
      }
    } catch (error) {
      console.warn('Unable to change tutorial video speed:', error);
    }

    const matchingBtn = document.querySelector(`.speed-btn[data-speed="${String(numericSpeed)}"]`);
    setSpeedActive(matchingBtn || speedBtns[0]);
  };

  speedBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.audioManager) window.audioManager.play('click');
      applyVideoSpeed(btn.dataset.speed);
    });
  });

  const closeVideo = () => {
    videoModal.style.display = 'none';
    videoModal.classList.add('hidden');

    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }

    if (tutorialVideo) {
      tutorialVideo.src = 'about:blank';
      tutorialVideo.removeAttribute('src');
    }

    setSpeedActive(document.querySelector('.speed-btn[data-speed="1"]') || speedBtns[0]);
  };

  tutorialBtn.onclick = (e) => {
    e.preventDefault();
    if (window.audioManager) window.audioManager.play('click');

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }

    tutorialVideo.src = defaultVideoSrc + '&autoplay=1';
    videoModal.classList.remove('hidden');
    videoModal.style.display = 'flex';
    setTimeout(() => applyVideoSpeed(1), 250);
  };

  if (closeVideoBtn) {
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.audioManager) window.audioManager.play('click');
      closeVideo();
    };

    closeVideoBtn.addEventListener('click', handleClose);
    closeVideoBtn.addEventListener('touchstart', handleClose, { passive: false });
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
  });

  setSpeedActive(document.querySelector('.speed-btn[data-speed="1"]') || speedBtns[0]);
}