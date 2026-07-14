import { Match } from './core/Match.js';
import { WordShifter } from './core/WordShifter.js';
import { ScreenController } from './ui/ScreenController.js';
import { AudioManager } from './audio/AudioManager.js';
import { SIMPLE_COLORS, SIMPLE_MATERIALS, SIMPLE_MOODS, SIMPLE_ERAS, SIMPLE_COUNTRIES, SIMPLE_CITIES, SIMPLE_FOODS, SIMPLE_SPORTS, SIMPLE_PROFESSIONS, SIMPLE_VEGETABLES, SIMPLE_FRUITS, SIMPLE_CLOTHES } from './data/nerfWords.js';

const PLAYER_EMOJIS = [
  "🔥", "⚠️",
  "🦊", "🐼", "🐱", "🐶", "🐰", "🐯", "🐨", "🐷", "🐮", "🐵", "🐺", "🦁", "🦦", "🦥", "🐿️", "🦇", "🦝",
  "🐧", "🦉", "🐦", "🦅", "🦆", "🐓", "🐤", "🦚", "🕊️", "🦜", "🦩",
  "🐸", "🐙", "🐢", "🦎", "🦐", "🦀", "🦑", "🦈", "🦞", "🐳", "🐬", "🐡",
  "🐝", "🕷️",
  "🦕", "🦖", "🐉", "🦄",
  "👶", "👴", "🥋", "🥷", "🦸‍♂️", "🦹", "🧝‍♂️", "🧙‍♂️",
  "🤠", "😎", "🤓", "🥳", "🤡", "😡", "👺", "👹", "💀", "👻",
  "👽", "🤖",
  "🍉", "🍓", "🥑", "🍍", "🥝", "🍊", "🍒", "🍋", "🍎", "🥭", "🥥",
  "🌸", "🌻", "🍄", "🌹", "🌝"
];

const EMOJI_NAMES = {
  "🔥": "Fiery", "⚠️": "Dangerous",
  "🦊": "Fox", "🐼": "Panda", "🐱": "Cat", "🐶": "Dog", "🐰": "Bunny", "🐯": "Tiger", "🐨": "Koala", "🐷": "Pig", "🐮": "Cow", "🐵": "Monkey", "🐺": "Wolf", "🦁": "Lion", "🦦": "Otter", "🦥": "Sloth", "🐿️": "Chipmunk", "🦇": "Bat", "🦝": "Raccoon",
  "🐧": "Penguin", "🦉": "Owl", "🐦": "Bird", "🦅": "Eagle", "🦆": "Duck", "🐓": "Rooster", "🐤": "Baby Chick", "🦚": "Peacock", "🕊️": "Dove", "🦜": "Parrot", "🦩": "Flamingo",
  "🐸": "Frog", "🐙": "Octopus", "🐢": "Turtle", "🦎": "Lizard", "🦐": "Shrimp", "🦀": "Crab", "🦑": "Squid", "🦈": "Shark", "🦞": "Lobster", "🐳": "Whale", "🐬": "Dolphin", "🐡": "Blowfish",
  "🐝": "Bee", "🕷️": "Spider",
  "🦕": "Dino", "🦖": "T-Rex", "🐉": "Dragon", "🦄": "Unicorn",
  "👶": "Baby", "👴": "Old Man", "🥋": "Sensei", "🥷": "Ninja", "🦸‍♂️": "Super", "🦹": "Supervillain", "🧝‍♂️": "Elf", "🧙‍♂️": "Wizard",
  "🤠": "Cowboy", "😎": "Cool", "🤓": "Nerd", "🥳": "Party", "🤡": "Clown", "😡": "Angry", "👺": "Goblin", "👹": "Ogre", "💀": "Skeleton", "👻": "Ghost",
  "👽": "Alien", "🤖": "Robo",
  "🍉": "Watermelon", "🍓": "Strawberry", "🥑": "Avocado", "🍍": "Pineapple", "🥝": "Kiwi", "🍊": "Tangerine", "🍒": "Cherries", "🍋": "Lemon", "🍎": "Apple", "🥭": "Mango", "🥥": "Coconut",
  "🌸": "Flower", "🌻": "Sunflower", "🍄": "Mushroom", "🌹": "Rose", "🌝": "Moonface"
};

function getDefaultEmojiForNewPlayer() {
  const used = new Set(temporaryPlayersList.map(p => p.emoji));
  const available = PLAYER_EMOJIS.filter(emoji => !used.has(emoji));
  if (available.length > 0) return available[Math.floor(Math.random() * available.length)];
  return PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];
}

function passPhoneWithSpeech(player, onConfirm, note, speakNote = false) {
  const emojiName = EMOJI_NAMES[player.emoji] || "";
let randomPhrase = "";
  
  if (audioManager && audioManager.isRallyEnglish) {
    // В режиме Finglish используем только одну каноничную фразу
    randomPhrase = `Pass the phone to ${emojiName} ${player.name}.`;
  } else {
    // В английском оставляем разнообразие
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
  
  let spokenText = randomPhrase;
  
  if (note && speakNote) {
    const cleanNote = note.replace(/<\/?[^>]+(>|$)/g, "");
    spokenText += " " + cleanNote;
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
  
  screens.showPassScreen(player, onConfirm, note);
}

let game = null;
let screens = null;
let audioManager = null;

// --- ЛОГИКА РАСПОЗНАВАНИЯ СВАЙПОВ И АНИМАЦИИ ---
let touchStartX = 0;
let touchStartY = 0;
let currentSwipeDeltaX = 0;
let isSwiping = false;

document.addEventListener('touchstart', (e) => { 
    const guesserScreen = document.getElementById('guesser-screen');
    if (!guesserScreen || guesserScreen.classList.contains('hidden') || guesserScreen.style.display === 'none') return;
    
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
    currentSwipeDeltaX = 0;
    
    // Отключаем CSS-анимации возврата, чтобы кнопка четко следовала за пальцем
    const btn1 = document.getElementById('guess-word-1');
    const btn2 = document.getElementById('guess-word-2');
    if(btn1) btn1.style.transition = 'none';
    if(btn2) btn2.style.transition = 'none';
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!isSwiping || !shifter) return;
    
    const touchCurrentX = e.changedTouches[0].screenX;
    const touchCurrentY = e.changedTouches[0].screenY;
    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;

    // Если движение больше похоже на вертикальный скролл, отменяем свайп
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 20) {
        resetSwipeVisuals();
        isSwiping = false;
        return;
    }

    currentSwipeDeltaX = deltaX;
    const btn1 = document.getElementById('guess-word-1');
    const btn2 = document.getElementById('guess-word-2');
    
    // Настройки физики свайпа
    const maxDrag = 35; // Максимальное смещение кнопки
    const pullDistance = Math.abs(deltaX);
    
    // Прогрессивное свечение: растет по мере оттягивания свайпа
    const glowIntensity = Math.min(0.9, 0.2 + (pullDistance / 100)); // Прозрачность от 0.2 до 0.9
    const glowRadius = pullDistance * 0.4; // Радиус размытия плавно увеличивается

    if (deltaX < -15 && btn1) { 
        // Тянем ВЛЕВО (выбираем первую кнопку)
        const pull = Math.max(-maxDrag, deltaX * 0.4);
        btn1.style.transform = `translateX(${pull}px) scale(0.98)`;
        btn1.style.boxShadow = `0 0 ${10 + glowRadius}px rgba(55, 255, 226, ${glowIntensity})`;
        btn1.style.borderColor = `rgba(55, 255, 226, ${glowIntensity})`;
        // Подсвечиваем сами буквы и прочерки
        btn1.style.textShadow = `0 0 ${5 + glowRadius * 0.5}px rgba(55, 255, 226, ${glowIntensity + 0.1})`;
    } else if (deltaX > 15 && btn2) { 
        // Тянем ВПРАВО (выбираем вторую кнопку)
        const pull = Math.min(maxDrag, deltaX * 0.4);
        btn2.style.transform = `translateX(${pull}px) scale(0.98)`;
        btn2.style.boxShadow = `0 0 ${10 + glowRadius}px rgba(55, 255, 226, ${glowIntensity})`;
        btn2.style.borderColor = `rgba(55, 255, 226, ${glowIntensity})`;
        // Подсвечиваем сами буквы и прочерки
        btn2.style.textShadow = `0 0 ${5 + glowRadius * 0.5}px rgba(55, 255, 226, ${glowIntensity + 0.1})`;
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    
    const threshold = 75; // Комфортный порог: сколько пикселей нужно протянуть для выбора
    
    if (currentSwipeDeltaX < -threshold) {
        makeGuess(shifter.orig1);
    } else if (currentSwipeDeltaX > threshold) {
        makeGuess(shifter.orig2);
    }
    
    // Плавно возвращаем кнопки на место
    resetSwipeVisuals();
}, { passive: true });

function resetSwipeVisuals() {
    const btn1 = document.getElementById('guess-word-1');
    const btn2 = document.getElementById('guess-word-2');
    const transitionStyle = 'transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out, text-shadow 0.3s ease-out';
    
    if (btn1) {
        btn1.style.transition = transitionStyle;
        btn1.style.transform = '';
        btn1.style.boxShadow = '';
        btn1.style.borderColor = '';
        btn1.style.textShadow = '';
    }
    if (btn2) {
        btn2.style.transition = transitionStyle;
        btn2.style.transform = '';
        btn2.style.boxShadow = '';
        btn2.style.borderColor = '';
        btn2.style.textShadow = '';
    }
}

let currentQuestion = null;
let roundScoresSnapshot = null;
let currentHint = "";
let currentHintObject = null; 
let isCustomHintActive = false; 
let shifter = null;
let responderChoice = "";

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
      
      rallyToggle.onchange = async (e) => {
        if (e.target.checked) {
          screens.showLoading(); // Включаем экран загрузки
          const hasFinnish = await audioManager.checkFinnishVoiceExistsAsync();
          screens.hideLoading(); // Выключаем загрузку
          
          if (!hasFinnish) {
            screens.showAlert(
              "Missing Voice 🇫🇮", 
              "Rally English mode requires a Finnish text-to-speech voice, which is not installed on your device or browser. The game will proceed with a standard voice."
            );
            e.target.checked = false;
            audioManager.setRallyEnglishMode(false);
            return;
          }
        }
        audioManager.setRallyEnglishMode(e.target.checked);
      };
    }

    setupInitialEventListeners();
    setupHelpPanel();
    setupGlobalButtonSounds();
    setupPsychologicalSafetySystem(); 
    
    updateStatsBarVisibility(); 

    const initAudioPreload = () => {
      audioManager.preloadRevealSounds();
      document.removeEventListener('click', initAudioPreload);
      document.removeEventListener('touchstart', initAudioPreload);
    };
    document.addEventListener('click', initAudioPreload);
    document.addEventListener('touchstart', initAudioPreload);

  } catch (error) {
    console.error("Initialization error:", error);
    screens.showAlert("Error", "UI Style Injection failed: " + error.message);
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
    if (safetyTip) safetyTip.style.display = 'none'; // Прячем курсив во время игры

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
      renderEmojiPickerGrid(emoji);
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

function setupHelpPanel() {
  const helpToggle = document.getElementById('help-toggle-btn');
  const helpPanel = document.getElementById('help-panel');
  const prevBtn = document.getElementById('help-prev-btn');
  const nextBtn = document.getElementById('help-next-btn');
  const indexDisplay = document.getElementById('carousel-index');

  if (!helpToggle || !helpPanel) return;

  let currentHelpStep = 1;

  function determineCurrentStep() {
    if (document.getElementById('picker-screen').style.display === 'block') return 1;
    if (document.getElementById('responder-screen').style.display === 'block') return 2;
    if (document.getElementById('guesser-screen').style.display === 'block') return 3;
    return 1; 
  }

  function renderHelpCarousel() {
    const steps = helpPanel.querySelectorAll('.help-step');
    steps.forEach(step => {
      const stepNum = parseInt(step.dataset.step);
      step.style.display = stepNum === currentHelpStep ? 'block' : 'none';
    });
    if (indexDisplay) indexDisplay.innerText = `Step ${currentHelpStep} / 3`;
  }

helpToggle.onclick = () => {
    const isOpen = helpPanel.style.display === 'block';
    if (!isOpen) {
      currentHelpStep = determineCurrentStep();
      renderHelpCarousel();
      helpPanel.style.display = 'block';
      helpToggle.innerText = 'Hide tips'; // Обновленный текст
    } else {
      helpPanel.style.display = 'none';
      helpToggle.innerText = 'Tips'; // Обновленный текст
    }
    audioManager.play('click');
  };

  if (prevBtn && nextBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      currentHelpStep = currentHelpStep > 1 ? currentHelpStep - 1 : 3;
      renderHelpCarousel();
    };
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      currentHelpStep = currentHelpStep < 3 ? currentHelpStep + 1 : 1;
      renderHelpCarousel();
    };
  }

  helpPanel.style.display = 'none';
  helpToggle.innerText = 'Tips'; // Обновленный текст
  updateHelpTargetText();
}

function setupGlobalButtonSounds() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    // Добавляем проверку, чтобы звук работал и при тапе по экранам передачи/алертов:
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
  
  // Безопасная привязка кликов: вешаем событие, только если кнопка есть в HTML
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
            safetyTip.style.display = 'block'; // Возвращаем видимость на главном экране
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
  const btn1 = document.getElementById('hint-btn-1');
  const btn2 = document.getElementById('hint-btn-2');
  if (!btn1 || !btn2) return;

  let availableHints = currentQuestion.hints ? [...currentQuestion.hints] : [];
 
  currentQuestion.fragments.forEach((frag, i) => {
    const selectedOption = frag.options[currentFragmentsState[i]];
    if (selectedOption.hints && Array.isArray(selectedOption.hints)) {
      availableHints.push(...selectedOption.hints);
    }
  });
 
  availableHints = [...new Set(availableHints)];

  if (availableHints.length < 2) {
    availableHints.push("Name two weird things", "Name two objects");
  }

  const randomIndex1 = Math.floor(Math.random() * availableHints.length);
  const hint1 = availableHints.splice(randomIndex1, 1)[0];
  const randomIndex2 = Math.floor(Math.random() * availableHints.length);
  const hint2 = availableHints[randomIndex2];
 
  const formatHintText = (hint) => {
    let text = typeof hint === 'object' ? hint.text : hint;
    if (!text.toLowerCase().startsWith('name')) text = `Name two: ${text}`;
    if (typeof hint === 'object' && hint.isPlural) text += " (plural)";
    return text;
  };
 
  btn1.innerText = formatHintText(hint1);
  btn2.innerText = formatHintText(hint2);
 
  btn1.onclick = () => { isCustomHintActive = false; selectHint(hint1); };
  btn2.onclick = () => { isCustomHintActive = false; selectHint(hint2); };
}

function renderInteractiveQuestion() {
  const container = document.getElementById('secret-question-text');
  
  // Если вопрос был отредактирован вручную
  if (currentQuestion.customCompiledText) {
      container.innerHTML = currentQuestion.customCompiledText;
  } else {
      // Иначе собираем из модульных фрагментов
      container.innerHTML = currentQuestion.text + " ";
      currentQuestion.fragments.forEach((frag, i) => {
        const optText = frag.options[currentFragmentsState[i]].text;
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
  return str.trim();
}

function initRound() {
  try {
    if (game && game.players) {
      roundScoresSnapshot = game.players.map(p => ({ id: p.id, gold: p.gold }));
    }

    currentQuestion = game.getRandomQuestion();
    currentQuestion.customCompiledText = null;
    fragmentsHistory = [];
    questionHistory = [];
    currentFragmentsState = []; 
const undoBtn = document.getElementById('undo-options-btn');
    if (undoBtn) {
      undoBtn.disabled = true;
      undoBtn.onclick = () => {
        if (questionHistory.length > 0) {
          const previousState = questionHistory.pop();
          currentQuestion = previousState.question;
          currentFragmentsState = previousState.fragments;
          currentQuestion.customCompiledText = previousState.customText; // <-- ДОБАВИТЬ ЭТУ СТРОКУ
          renderInteractiveQuestion();
          updatePickerHints();
          audioManager.play('click');
          if (questionHistory.length === 0) undoBtn.disabled = true;
        }
      };
      undoBtn.addEventListener('mousedown', (e) => {
        if (undoBtn.disabled) {
          e.preventDefault();
          screens.showAlert('Undo Blocked', '⏸️ Reroll first to enable undo. Then you can switch back to the previous question and options.');
          audioManager.play('error');
        }
      });
    }

    randomizeCurrentFragments();

    const picker = game.players[game.pickerIndex];
    screens.switchScreen('picker');
   
    document.getElementById('picker-name').innerText = `${picker.emoji} ${picker.name}`;
    const responder = game.players[game.getResponderIndex()];
    document.getElementById('responder-target-name').innerText = `${responder.emoji} ${responder.name}`;
   
    updateHelpTargetText();

    // --- ЛОГИКА ТРЕХЗОННОГО РЕДАКТИРОВАНИЯ ---
// --- ОБНОВЛЕННАЯ ЛОГИКА РЕДАКТИРОВАНИЯ ---
    const editToggleBtn = document.getElementById('edit-question-toggle-btn');
    const editBlock = document.getElementById('edit-question-block');
    const editPart1 = document.getElementById('edit-q-part1');
    const editPart2 = document.getElementById('edit-q-part2');
    const editPart3 = document.getElementById('edit-q-part3');
    const editCancelBtn = document.getElementById('edit-q-cancel-btn');
    const editSaveBtn = document.getElementById('edit-q-save-btn');
    const secretTextDisplay = document.getElementById('secret-question-text');
    const btnGroup = document.getElementById('picker-btn-group');

    if (editToggleBtn && editBlock) {
      editBlock.style.display = 'none';
      secretTextDisplay.style.display = 'block';
      if (btnGroup) btnGroup.style.display = 'flex';

      const toggleEdit = () => {
        const isEditing = editBlock.style.display === 'block';
        if (!isEditing) {
          // Открываем режим редактирования
          const rawQuestion = getCompiledQuestionString("[ ... ]", "[ ... ]", false);
          const parts = rawQuestion.split("[ ... ]");
          editPart1.value = (parts[0] || "").trim();
          editPart2.value = (parts[1] || "").trim();
          editPart3.value = (parts[2] || "").trim();
          
          editBlock.style.display = 'block';
          secretTextDisplay.style.display = 'none';
          if (btnGroup) btnGroup.style.display = 'none';
          editToggleBtn.innerHTML = "✖"; // Можно заменить иконку на крестик при открытии
        } else {
          // Закрываем режим редактирования
          editBlock.style.display = 'none';
          secretTextDisplay.style.display = 'block';
          if (btnGroup) btnGroup.style.display = 'flex';
          editToggleBtn.innerHTML = "✏️";
        }
      };

      editToggleBtn.onclick = toggleEdit;
      editCancelBtn.onclick = toggleEdit; // Кнопка Cancel теперь просто вызывает ту же функцию закрытия

      editSaveBtn.onclick = () => {
        const p1 = editPart1.value.trim();
        const p2 = editPart2.value.trim();
        const p3 = editPart3.value.trim();

        currentQuestion.customCompiledText = `${p1} [ ... ] ${p2} [ ... ] ${p3}`;
        renderInteractiveQuestion();
        
        toggleEdit(); // Автоматически закрываем после сохранения
      };
    }

const rerollOptionsBtn = document.getElementById('reroll-options-btn');
    if (rerollOptionsBtn) {
      rerollOptionsBtn.onclick = () => {
        if (currentQuestion && currentFragmentsState.length > 0) {
          questionHistory.push({
            question: currentQuestion,
            fragments: [...currentFragmentsState],
            customText: currentQuestion.customCompiledText // <-- ДОБАВИТЬ ЭТУ СТРОКУ
          });
          const undoBtn = document.getElementById('undo-options-btn');
          if (undoBtn) undoBtn.disabled = false;
        }
        
        game.shuffledQuestions.unshift(currentQuestion);
        currentQuestion = game.getRandomQuestion();
        currentQuestion.customCompiledText = null; // <-- ДОБАВИТЬ ЭТУ СТРОКУ
        currentFragmentsState = [];
        randomizeCurrentFragments();
        updatePickerHints();
        audioManager.play('click');
      };
    }
   
    const customInput = document.getElementById('custom-hint-input');
    customInput.value = "";
    document.getElementById('custom-hint-btn').onclick = () => {
      if (customInput.value.trim().length > 0) {
        isCustomHintActive = true;
        selectHint(customInput.value.trim());
      }
    };
  } catch (err) {
    screens.showAlert("Error", "Error inside initRound: " + err.message);
    console.error(err);
  }
}

function selectHint(hint) {
  try {
    currentHintObject = hint;
    let hintStr = typeof hint === 'object' ? hint.text : hint;
    if (typeof hint === 'object' && hint.isPlural) hintStr += " (plural)";
    currentHint = hintStr;
    const responder = game.players[game.getResponderIndex()];
    passPhoneWithSpeech(
      responder,
      startResponderPhase,
      "Only the next player should look at the phone. Keep it hidden from others."
    );
  } catch (err) {
    screens.showAlert("Error", "Error inside selectHint: " + err.message);
  }
}

function startResponderPhase() {
  try {
    screens.switchScreen('responder');
    const responder = game.players[game.getResponderIndex()];
   
    document.getElementById('responder-name').innerText = `${responder.emoji} ${responder.name}`;
    
const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');

    if (currentQuestion && currentQuestion.id === 14) {
      document.getElementById('displayed-hint').innerHTML = currentHint.toUpperCase() + 
        `<br><span class="pulse-warning-text">
          ⚠️ Use the base form of the verb: "eat pizza" (NOT "to eat" or "eating")
        </span>`;
    } else {
      document.getElementById('displayed-hint').innerText = currentHint.toUpperCase();
    }
    
    in1.placeholder = "First answer";
    in2.placeholder = "Second answer";

const helperToggle = document.getElementById('responder-helper-toggle');
    // Ищем коробку по ID, а если её нет — берем родителя кнопки
    const helperBox = document.getElementById('responder-helper-box') || (helperToggle ? helperToggle.parentElement : null);
    const helperContent = document.getElementById('responder-helper-content');
    const helperText = document.getElementById('responder-helper-text');
   
    if (helperToggle && helperContent && helperText) {
      if (helperBox) helperBox.style.display = 'none';
      helperContent.style.display = 'none';
      helperToggle.innerText = '💡 Ideas'; // Короткий текст по умолчанию
     
      let ideas = [];
      if (!isCustomHintActive && currentHintObject && typeof currentHintObject === 'object' && Array.isArray(currentHintObject.brainstorm)) {
        ideas = currentHintObject.brainstorm;
      }

      if (ideas.length > 0) {
        // Берем 4 случайные идеи из базы
        const randomIdeas = [...ideas].sort(() => Math.random() - 0.5).slice(0, 4);
        helperText.innerText = randomIdeas.join(', ');
        
        if (helperBox) helperBox.style.display = 'block';
       
        // Вешаем логику сворачивания/разворачивания
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

      const tokens1 = w1.split(/\s+/).filter(Boolean);
      const tokens2 = w2.split(/\s+/).filter(Boolean);
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

      shifter = new WordShifter(w1, w2, shouldNerf, isMultiWord);
     
// БЛОКИРОВКА ПОЛЕЙ И ОБНОВЛЕНИЕ СЧЕТЧИКОВ
      in1.disabled = true;
      in2.disabled = true;

      // Находим элементы счетчиков для каждого поля
      const updateCounterToLocked = (counterEl) => {
        const txt = counterEl.querySelector('.counter-text');
        const lock = counterEl.querySelector('.lock-icon');
        if (txt && lock) {
          txt.style.display = "none";  // Скрываем цифры (например, "5/25")
          lock.style.display = "inline"; // Показываем иконку замка
        }
      };
updateCounterToLocked(counter1);
      updateCounterToLocked(counter2);

      choiceBlock.style.display = 'block';

      const finalQ = getCompiledQuestionString(w1, w2, false);
      document.getElementById('responder-final-question').innerText = finalQ;
     
      const opt1 = document.getElementById('opt-btn-1');
      const opt2 = document.getElementById('opt-btn-2');
      opt1.innerText = w1; opt2.innerText = w2;
     
      opt1.onclick = () => confirmResponderChoice(w1, w2, w1);
      opt2.onclick = () => confirmResponderChoice(w1, w2, w2);

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
    const responder = game.players[game.getResponderIndex()];
    const loserWord = (choice === w1) ? w2 : w1;
   
    const plainQuestionText = getCompiledQuestionString("___", "___", false);
    game.saveRoundToHistory(plainQuestionText, currentHint, w1, w2, choice);
   
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
    revealCount = 0;
   
    window.scrollTo({ top: 0, behavior: 'instant' });
    const responderName = game.players[game.getResponderIndex()].name;

    passPhoneWithSpeech(
      game.players[currentGuesserIndex],
      startGuesserPhase,
      `Only this player should hold the phone, but ${responderName} can watch the guessing process!`,
      true
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
      btn1.onclick = (e) => {
        // Если палец сдвинулся больше чем на 15 пикселей (был свайп или скролл) — блокируем обычный клик
        if (typeof currentSwipeDeltaX !== 'undefined' && Math.abs(currentSwipeDeltaX) > 15) return; 
        makeGuess(shifter.orig1);
      };
    }
    if (btn2 && shifter) {
      btn2.onclick = (e) => {
        // Аналогичная защита для второй кнопки
        if (typeof currentSwipeDeltaX !== 'undefined' && Math.abs(currentSwipeDeltaX) > 15) return; 
        makeGuess(shifter.orig2);
      };
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
      
      // Показываем счетчик раундов только если их больше 1
      if (game.totalRounds > 1) {
        elements.push(`<span>ROUND ${game.currentRound}/${game.totalRounds}</span>`);
      }
      
      // Показываем счетчик угадывающих только если игроков больше 2
      if (game.players.length > 2) {
        elements.push(`<span>GUESSER ${currentGuesserStep} OF ${totalGuessersThisRound}</span>`);
      }
      
      // Если есть что показывать — выводим на экран, если нет — скрываем контейнер
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

    if (hintEl) hintEl.innerText = currentHint;
    if (scoreEl) scoreEl.innerText = `Win: +${FIXED_REWARD} points`;
    if (balanceEl) balanceEl.innerText = `${game.players[currentGuesserIndex].name}'s score: ${game.players[currentGuesserIndex].gold}`;

    // Разбиваем вопрос на 3 части (До 1 ответа, между, и после 2 ответа)
    const rawQuestion = getCompiledQuestionString("[ ... ]", "[ ... ]", false);
    const parts = rawQuestion.split("[ ... ]");
    
    const part1El = document.getElementById('guesser-q-part1');
    const part2El = document.getElementById('guesser-q-part2');
    const part3El = document.getElementById('guesser-q-part3');
    
    if (part1El) part1El.innerText = parts[0] ? parts[0].trim() : "";
    if (part2El) part2El.innerText = parts[1] ? parts[1].trim() : "";
    if (part3El) part3El.innerText = parts[2] ? parts[2].trim() : "";

// Вставляем маски с кружочками-номерами
   if (guess1Btn) guess1Btn.innerHTML = `<div class="masked-wrapper" style="margin: 0; justify-content: center;">${masks.w1}</div>`;
    if (guess2Btn) guess2Btn.innerHTML = `<div class="masked-wrapper" style="margin: 0; justify-content: center;">${masks.w2}</div>`;


    const randBtn = document.getElementById('ability-extra-rand-btn');
    const lengthBtn = document.getElementById('ability-length-btn');

    const rollStatusEl = document.getElementById('ability-roll-status');
    if (rollStatusEl) {
      if (revealCount === 1) {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = `💡 You can buy one word reveal:`;
      } else {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = `🔒 Reveal already used`;
      }
    }
    
    updateStatsBarVisibility();

const renderAbility = (btn, label, icon, desc) => {
      if (!btn) return;
      const row = btn.closest('.ability-row');
      const isUsed = revealCount >= 2;

      btn.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 4px;">
          <strong style="font-size: 15px;">${icon} ${label}</strong>
        </div>
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

renderAbility(randBtn, 'Open random letters', '🎲');
    renderAbility(lengthBtn, "Show words' length and first letters", '📏');

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

function makeGuess(word) {
  try {
    const guesser = game.players[currentGuesserIndex];
    const isCorrect = (word === responderChoice);
    const goldBefore = guesser.gold; 
   
    guesser.lastGuessCorrect = isCorrect;

    if (isCorrect) {
      guesser.gold += FIXED_REWARD;
      animateGoldChange(FIXED_REWARD, true);
      audioManager.play('win', audioManager.getVolume() * 0.6);
    } else {
      audioManager.play('lose', audioManager.getVolume() * 0.75);
    }

const lastRoundData = game.history[game.history.length - 1];
    // Берем красивую строку с HTML (с жирным шрифтом и цветами), а не голый текст
    const formattedSentence = lastRoundData.resultSentence; 

    const statusIcon = isCorrect ? "🎉 CORRECT!" : "❌ WRONG!";
    const finalWallet = guesser.gold;
    const guessColor = isCorrect ? 'var(--positive)' : 'var(--danger)';

    // Собираем компактную карточку с результатами
// Собираем компактную карточку с результатами (в одну строку, чтобы pre-wrap не добавлял лишние пробелы)
    const alertMessage = `<div style="text-align: center; margin-bottom: 10px;"><span style="font-size: 1.1rem; font-weight: 800; color: #ffd56b;">Score: ${goldBefore} ➔ ${finalWallet}</span></div><div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 14px; border: 1px dashed rgba(255,255,255,0.15); font-size: 0.95rem; text-align: center; white-space: normal;"><div style="margin-bottom: 10px; font-weight: 700;">Your guess: <span style="color: ${guessColor}; text-transform: uppercase;">"${word}"</span></div><div style="line-height: 1.5; color: #e8e9f1;">${formattedSentence}</div></div>`;

    screens.showAlert(statusIcon, alertMessage, () => {
      setupNextGuesser();
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