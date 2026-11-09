import { Match } from './core/Match.js';
import { WordShifter } from './core/WordShifter.js';
import { ScreenController } from './ui/ScreenController.js';
import { AudioManager } from './audio/AudioManager.js';
import { GAME_CONFIG } from './core/GameConfig.js';
import { GameStateStore, GamePhase } from './core/GameStateStore.js';
import { OnlineSession } from './net/OnlineSession.js';
import { pingServerHealth, acquireWakeLock, releaseWakeLock } from './net/NetworkManager.js';
import { escapeHTML } from './utils/sanitize.js';
import { getNerfVocab } from './data/nerfWords.js';
import { SCENE_REGISTRY } from './data/scenes.js';
import { getLocale, setLocale, t, applyStaticTexts, emojiNameFor, SUPPORTED_LOCALES } from './i18n/I18nManager.js';
import { detectWordModifier, applyWordModifier, stripSuffixMarker } from './i18n/morphology.js';

export const PLAYER_EMOJIS = [
  "🔥", "⚠️", "🦊", "🐼", "🐱", "🐶", "🐰", "🐯", "🐨", "🐷", "🐮", "🐵", "🐺", "🦁", "🐸", 
  "👽", "🤖", "👶", "👴", "😎", "🥳", "🤡", 
  "😡", "👺", "👹", "💀", "🍉", "🍓", "🥑", "🍍", "🥝", "🍊", "🍋", "🍎", "🥭", 
  "🥥", "🌸", "🍄", "🌹", "🌝"
];

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
  const used = new Set(S.lobby.players.map(p => p.emoji));
  const available = PLAYER_EMOJIS.filter(emoji => !used.has(emoji));
  if (available.length > 0) return available[Math.floor(Math.random() * available.length)];
  return PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];
}

function passPhoneWithSpeech(player, onConfirm, note, speakNote = false, exactSpeech = null) {
  store.setPhase(GamePhase.PASS_DEVICE);
  const emojiName = emojiNameFor(player.emoji);
  const fillPhrase = (tmpl) => String(tmpl).replaceAll('{emojiName}', emojiName).replaceAll('{name}', player.name);
  let spokenText = "";
  
  if (exactSpeech) {
    spokenText = exactSpeech;
  } else {
    let randomPhrase = "";
    if (audioManager && audioManager.isRallyEnglish && getLocale() === 'en') {
      randomPhrase = fillPhrase(t('pass.phraseSimple'));
    } else {
      const handoverPhrases = t('pass.phrases');
      randomPhrase = fillPhrase(handoverPhrases[Math.floor(Math.random() * handoverPhrases.length)]);
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

// --- Единое сериализуемое состояние (Sprint 2) ---
// store.state содержит ТОЛЬКО plain data — весь матч сериализуется в JSON.
// Живые runtime-объекты (game, shifter, screens, audioManager) остаются
// module-level ссылками и зеркалятся в стор через syncMatch()/syncMask().
export const store = new GameStateStore();
const S = store.state;

let game = null;
let screens = null;
let audioManager = null;
let advancedModeEnabled = false;

let shifter = null;

let safetyDelayedTimer = null;

// --- Онлайн-режим (Sprint 3) ---
// online — сессия комнаты; в solo-режиме isOnlineMode() === false.
// Разделение ответственности:
//   applyAction()/apply*() — изменяют состояние (соло-устройство ИЛИ хост);
//   renderLocalView()/render*() — рисуют экран под РОЛЬ этого устройства;
//   dispatchAction() — единая точка входа из UI: соло → apply локально,
//     хост → apply + broadcastState, гость → CLIENT_ACTION на сервер.
let online = null;
let typingDebounceTimer = null;
let resultShownAt = 0;          // grace-период 1.5с перед приёмом тапа по result-модалке
let lastResultNonce = null;     // чтобы повторный STATE_SYNC не открывал модалку заново
let lastSeenRevealTs = 0;       // edge-trigger для reveal-анимации/звука
let lastSeenOralTs = 0;         // edge-trigger для oral-hint баннера/алерта
let lastSeenNoticeTs = 0;       // edge-trigger для S.live.notice
let lastMaskKey = '';           // ключ "раунд:угадчик" — сброс diff-подсветки
let lastWordsPhaseKey = '';     // ключ "раунд:пикер" — сброс полей ввода респондера
let finalScoresSpoken = false;  // TTS финала играем только один раз
let prevOpened1 = new Set();    // diff маски для .just-revealed
let prevOpened2 = new Set();
let onlineAvatar = '🦊';
let pendingJoin = false;        // идёт попытка create/join — показываем оверлей
let talkOverlayActive = false;  // safety "Open Circle" открыт на ЭТОМ устройстве

function isOnlineMode() {
  return !!online && online.isOnline();
}

// Переход между фазами: в solo — экран передачи телефона, в онлайне — сразу.
function step(targetPlayer, nextFn, note, speakNote = false, exactSpeech = null) {
  if (isOnlineMode()) {
    nextFn();
    return;
  }
  passPhoneWithSpeech(targetPlayer, nextFn, note, speakNote, exactSpeech);
}

function dispatchAction(action) {
  if (online) {
    online.dispatchAction(action);
  } else {
    applyAction(action);
  }
}

// Какие op-действия может шлёпать только конкретная роль (проверка на хосте).
const ACTION_ROLE = {
  SUBMIT_PICK: 'picker',
  EDIT_QUESTION: 'picker',
  SUBMIT_WORDS: 'responder',
  SUBMIT_SECRET_CHOICE: 'responder',
  BUY_HINT: 'guesser',
  MAKE_GUESS: 'guesser',
  ORAL_HINT_DONE: 'responder',
  START_GAME: 'host',
  PLAY_AGAIN: 'host'
};

function senderRoleOk(fromPlayerId, actionType) {
  const role = ACTION_ROLE[actionType];
  if (!fromPlayerId || !role) return true; // solo/host-собственные вызовы и свободные действия
  if (role === 'host') return fromPlayerId === S.online.hostPlayerId;
  if (!game) return false;
  if (role === 'picker') return game.players[game.pickerIndex] && game.players[game.pickerIndex].netId === fromPlayerId;
  if (role === 'responder') return game.players[game.getResponderIndex()] && game.players[game.getResponderIndex()].netId === fromPlayerId;
  if (role === 'guesser') return game.players[S.guess.currentGuesserIndex] && game.players[S.guess.currentGuesserIndex].netId === fromPlayerId;
  return true;
}

// В соло между ходами фаза = PASS_DEVICE (экран передачи телефона).
// Логическая фаза для гардов — prevPhase в этот момент.
function effectivePhase() {
  return S.phase === GamePhase.PASS_DEVICE ? (S.prevPhase || S.phase) : S.phase;
}

// Единый диспетчер состояния: соло и хост выполняют одни и те же операции.
function applyAction(action, fromPlayerId = null) {
  if (!senderRoleOk(fromPlayerId, action.type)) return;
  try {
    switch (action.type) {
      case 'START_GAME': return applyStartGame(action);
      case 'SUBMIT_PICK': return applySubmitPick(action);
      case 'EDIT_QUESTION': return applyEditQuestion(action);
      case 'SUBMIT_WORDS': return applySubmitWords(action);
      case 'SUBMIT_SECRET_CHOICE': return applySecretChoice(action);
      case 'BUY_HINT': return applyBuyHint(action);
      case 'MAKE_GUESS': return applyMakeGuess(action);
      case 'ACK_RESULT': return applyAckResult(action);
      case 'TRIGGER_SAFETY': return applySafety(action.action, action.minutes);
      case 'RESUME_MATCH': return applyResumeMatch();
      case 'PLAY_AGAIN': return applyPlayAgain();
      case 'ORAL_HINT_DONE': return applyOralHintDone();
    }
  } catch (err) {
    console.error('applyAction error:', err);
    if (screens) screens.showAlert(t('alerts.error'), 'Error inside applyAction(' + action.type + '): ' + err.message);
  }
}

// Индекс ЭТОГО устройства в game.players:
//  - соло: «кто держит телефон» = активная роль текущей фазы;
//  - онлайн: по netId из лобби.
function resolveMyIndex() {
  if (!game) return -1;
  if (!isOnlineMode()) {
    switch (S.phase) {
      case GamePhase.PICKING: return game.pickerIndex;
      case GamePhase.RESPONDING_WORDS:
      case GamePhase.RESPONDING_CHOICE: return game.getResponderIndex();
      case GamePhase.GUESSING: return S.guess.currentGuesserIndex;
      default: return -1;
    }
  }
  return game.players.findIndex(p => p.netId === online.ctx.myPlayerId);
}

function syncMatch() {
  store.setState({ match: game ? game.serialize() : null });
}

function syncMask() {
  store.setState({ guess: { ...S.guess, mask: shifter ? shifter.toJSON() : null } });
}

function setAdvancedMode(enabled) {
  advancedModeEnabled = !!enabled;
  window.advancedModeEnabled = advancedModeEnabled;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('advancedModeEnabled', String(advancedModeEnabled));
  }

  const advancedToggle = document.getElementById('advanced-mode-toggle');
  if (advancedToggle) {
    advancedToggle.checked = advancedModeEnabled;
  }

  const editToggleBtn = document.getElementById('edit-question-toggle-btn');
  const editBlock = document.getElementById('edit-question-block');
  const toggleToCustom = document.getElementById('toggle-custom-prompt-btn');
  const customBlock = document.getElementById('custom-prompt-block');
  const presetBlock = document.getElementById('preset-prompt-block');
  const customInput = document.getElementById('custom-hint-input');

  if (editToggleBtn) {
    editToggleBtn.style.display = advancedModeEnabled ? 'block' : 'none';
    editToggleBtn.disabled = !advancedModeEnabled;
    if (!advancedModeEnabled) {
      editToggleBtn.innerHTML = t('picker.editStart');
    }
  }

  if (editBlock) {
    editBlock.style.display = 'none';
  }

  if (toggleToCustom) {
    toggleToCustom.style.display = advancedModeEnabled ? 'block' : 'none';
    toggleToCustom.disabled = !advancedModeEnabled;
  }

  if (customBlock) {
    customBlock.style.display = 'none';
  }

  if (presetBlock) {
    presetBlock.style.display = 'block';
  }

  if (customInput) {
    customInput.value = '';
  }

  S.picker.isCustomHintActive = false;
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (!document.getElementById('setup-screen')) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 50);

    audioManager = new AudioManager();
    window.audioManager = audioManager;
    window.store = store;
    screens = new ScreenController();
    screens.setupAudioControl(audioManager);

    // Sprint 4: локаль из localStorage / S.lobby.locale → UI + вопросы + TTS
    S.lobby.locale = getLocale();
    applyLocaleNow();
    setupLanguagePills();
    
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

    const advancedToggle = document.getElementById('advanced-mode-toggle');
    if (advancedToggle) {
      const savedAdvancedMode = typeof localStorage !== 'undefined' && localStorage.getItem('advancedModeEnabled') === 'true';
      advancedToggle.checked = false;
      setAdvancedMode(savedAdvancedMode);
      advancedToggle.onchange = (e) => setAdvancedMode(e.target.checked);
    } else {
      setAdvancedMode(false);
    }

    setupInitialEventListeners();
    setupGlobalButtonSounds();
    setupPsychologicalSafetySystem();
    setupSettingsModal();
    setupOnlineMode();

    updateStatsBarVisibility();
    window.addEventListener('screenchange', updateStatsBarVisibility);
    setupVideoTutorial();

    // Единый рендер-путь: любое изменение состояния → ролевой рендер экрана.
    store.subscribe(() => renderLocalView());

    // Будим сервер комнат (Render free tier засыпает) пока пользователь
    // ещё настраивает игру — к моменту Create/Join он уже тёплый.
    pingServerHealth();

    // Deep-link вида ?room=ABCD — сразу ведём в форму входа в комнату.
    const urlRoom = new URLSearchParams(location.search).get('room');
    if (urlRoom) {
      setSetupMode('online');
      setOnlineTab('join');
      const codeInput = document.getElementById('join-code-input');
      if (codeInput) codeInput.value = urlRoom.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
    }

    // Авто-переподключение к активной комнате после обновления страницы.
    const resumeInfo = online.getResumeInfo();
    if (resumeInfo && (!urlRoom || urlRoom.toUpperCase() === resumeInfo.roomCode)) {
      pendingJoin = true;
      online.resume();
    }

    // Wake Lock при игре: возобновляем после разблокировки экрана.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && isOnlineMode() && S.phase !== GamePhase.SETUP && S.phase !== GamePhase.LOBBY) {
        acquireWakeLock();
      }
    });

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
      if (S.lobby.players.some(p => p.name === name.toUpperCase())) {
        screens.showAlert(t('alerts.invalidName'), t('alerts.nameTaken'));
        return;
      }
      S.lobby.players.push({ name: name.toUpperCase(), emoji: getDefaultEmojiForNewPlayer() });
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
    if (S.lobby.players.length < 2) {
      screens.showAlert(t('alerts.notice'), t('alerts.minPlayers'));
      return;
    }
    S.lobby.roundsInput = roundsInput;

    const safetyBtn = document.getElementById('safety-global-btn');
    if (safetyBtn) safetyBtn.style.display = 'block';

    const safetyTip = document.getElementById('safety-tip-text');
    if (safetyTip) safetyTip.style.display = 'none';

    dispatchAction({ type: 'START_GAME', rounds: roundsInput });
  };

  const backToSetupBtn = document.getElementById('back-to-setup-btn');
  if (backToSetupBtn) {
    backToSetupBtn.onclick = resetToSetupState;
  }
}

function resetToSetupState() {
  if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
  if (audioManager) audioManager.stopSpeech();
  releaseWakeLock();
  const stopVoiceBtn = document.getElementById('stop-voice-btn');
  if (stopVoiceBtn) stopVoiceBtn.style.display = 'none';

  const helpSection = document.querySelector('.help-section');
  if (helpSection) helpSection.style.display = 'block';

  // Выход из онлайн-комнаты: сокет закрываем, сессию стираем.
  if (isOnlineMode()) online.leaveRoom();
  S.online = { roomCode: null, hostPlayerId: null, roster: [] };

  document.body.classList.remove('spectator-mode');
  game = null;
  window.game = null;
  shifter = null;
  store.reset();

  renderPlayerBoxes();
  const safetyTip = document.getElementById('safety-tip-text');
  if (safetyTip) safetyTip.innerText = t('setup.safetyTipAll');
  screens.switchScreen('setup');
}

function renderPlayerBoxes() {
  const container = document.getElementById('players-boxes-container');
  container.innerHTML = "";
  S.lobby.players.forEach((player, index) => {
    const box = document.createElement('div');
    box.className = "player-box";
    box.innerHTML = `
      <div class="player-box-left">
        <div class="player-avatar" title="${escapeHTML(t('setup.avatarTitle'))}">${player.emoji}</div>
        <div class="player-name-block">
          <span>${escapeHTML(player.name)}</span>
        </div>
      </div>
      <button class="delete-box-btn">✕</button>
    `;
    box.querySelector('.delete-box-btn').onclick = () => {
      S.lobby.players.splice(index, 1);
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
// 'player' — эмодзи игрока из списка; 'self' — мой аватар в онлайн-режиме
let emojiPickerKind = 'player';

function renderEmojiPickerGrid(selectedEmoji) {
  const grid = document.getElementById('emoji-picker-grid');
  if (!grid) return;
  grid.innerHTML = "";
  PLAYER_EMOJIS.forEach((emoji) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'emoji-picker-tile';
    tile.innerText = emoji;
    const emoName = emojiNameFor(emoji);
    tile.title = emoName ? `${emoName} (${emoji})` : emoji;
    if (emoji === selectedEmoji) tile.classList.add('selected');
    tile.onclick = (e) => {
      e.stopPropagation();
      if (emojiPickerKind === 'self') {
        onlineAvatar = emoji;
        const selfBtn = document.getElementById('online-avatar-btn');
        if (selfBtn) selfBtn.innerText = emoji;
      } else {
        if (activeEmojiPickerIndex === null) return;
        S.lobby.players[activeEmojiPickerIndex].emoji = emoji;
        renderPlayerBoxes();
      }
      if (audioManager) audioManager.play('click');
      closeEmojiPicker();
    };
    grid.appendChild(tile);
  });
}

function openEmojiPicker(index) {
  emojiPickerKind = 'player';
  activeEmojiPickerIndex = index;
  const player = S.lobby.players[activeEmojiPickerIndex];
  const modal = document.getElementById('emoji-picker-modal');
  if (!modal || !player) return;
  renderEmojiPickerGrid(player.emoji);
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function openEmojiPickerForSelf() {
  emojiPickerKind = 'self';
  activeEmojiPickerIndex = null;
  const modal = document.getElementById('emoji-picker-modal');
  if (!modal) return;
  renderEmojiPickerGrid(onlineAvatar);
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function closeEmojiPicker() {
  const modal = document.getElementById('emoji-picker-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
  activeEmojiPickerIndex = null;
  emojiPickerKind = 'player';
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
    // В онлайне SAFETY_PAUSE — чисто локальная штука: фазу не трогаем,
    // чтобы она не утекла в STATE_SYNC другим телефонам.
    if (!isOnlineMode()) store.setPhase(GamePhase.SAFETY_PAUSE);
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

  const closeSafety = () => {
    modal.style.display = 'none';
    if (S.phase === GamePhase.SAFETY_PAUSE) {
      store.setState({ phase: S.prevPhase || GamePhase.SETUP });
    }
  };
  
  if (closeBtn1) closeBtn1.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };
  if (closeBtn2) closeBtn2.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };
  if (resumeMatchBtn) resumeMatchBtn.onclick = () => {
    dispatchAction({ type: 'RESUME_MATCH' });
    closeSafety();
    resetSafetyButtonsState(scrOptions);
  };

  let safetySelectedMinutes = 0;
  const timerMinus = document.getElementById('safety-timer-minus');
  const timerPlus = document.getElementById('safety-timer-plus');
  const timerDisplay = document.getElementById('safety-timer-display');

  if (timerMinus && timerPlus && timerDisplay) {
    const handleMinus = (e) => {
      e.preventDefault(); e.stopPropagation();
      safetySelectedMinutes = 0;
      timerDisplay.innerText = t('safety.currentMin', { n: 0 });
    };

    const handlePlus = (e) => {
      e.preventDefault(); e.stopPropagation();
      safetySelectedMinutes += 1;
      timerDisplay.innerText = t('safety.currentMin', { n: safetySelectedMinutes });
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
  if (display) display.innerText = t('safety.currentMin', { n: 0 });
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
      btn.innerText = t('safety.hold2sLong');
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
      btn.innerText = t('safety.holding');

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
  // Локальная UI-часть (закрыть модалку, показать алерты) — сразу;
  // эффекты по игре идут через TRIGGER_SAFETY → applySafety на хосте
  // (в соло — на этом же устройстве).
  if (action === 'skip') {
    modal.style.display = 'none';
    if (!game) {
      screens.showAlert(t('alerts.safetyTitle'), t('safety.noMatch'));
      return;
    }
    dispatchAction({ type: 'TRIGGER_SAFETY', action: 'skip' });

  } else if (action === 'talk') {
    // Open Circle открывается на всех телефонах через S.safety.talkOpen
    dispatchAction({ type: 'TRIGGER_SAFETY', action: 'talk' });

  } else if (action === 'stop-direct') {
    modal.style.display = 'none';
    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
    const progressReport = (game && Array.isArray(game.players))
      ? game.players.map(p => `${escapeHTML(p.name)}: ${p.gold} pts`).join('\n')
      : t('safety.noMatch');

    screens.showAlert(
      t('safety.stoppedTitle'),
      t('safety.stoppedBody', { scores: progressReport }),
      () => {
        const safetyTip = document.getElementById('safety-tip-text');
        if (safetyTip) {
            safetyTip.style.display = 'block';
            safetyTip.innerText = t('setup.safetyTip');
        }
        dispatchAction({ type: 'TRIGGER_SAFETY', action: 'stop-direct' });
      }
    );

  } else if (action === 'stop-delayed') {
    modal.style.display = 'none';

    if (isOnlineMode()) {
      // Таймер живёт на хосте — сработает даже если этот телефон уйдёт в сон.
      dispatchAction({ type: 'TRIGGER_SAFETY', action: 'stop-delayed', minutes });
      screens.showAlert(t('safety.exitTitle'), t('safety.exitTimer', { n: minutes }));
      return;
    }

    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
    const delayMs = minutes * 60 * 1000;

    safetyDelayedTimer = setTimeout(() => {
      let scoresSummary = t('safety.noMatch');
      if (window.game && window.game.players) {
        scoresSummary = window.game.players.map(p => `${escapeHTML(p.name)}: ${p.gold} pts`).join('\n');
      }

      screens.showAlert(t('safety.sessionTitle'), t('safety.sessionBodyFull', { scores: scoresSummary }), () => {
        const safetyTip = document.getElementById('safety-tip-text');
        if (safetyTip) safetyTip.innerText = t('setup.safetyTipAll');
        window.game = null;
        game = null;
        store.reset();
        renderPlayerBoxes();
        screens.switchScreen('setup');
      });
    }, delayMs);
  }
}

// === applySafety: хост/соло — эффекты безопасности на состояние ===
function applySafety(action, minutes = 0) {
  if (action === 'skip') {
    if (!game) return;
    if (Array.isArray(game.players) && S.guess.roundScoresSnapshot) {
      game.players.forEach(p => {
        const backup = S.guess.roundScoresSnapshot.find(b => b.id === p.id);
        if (backup) p.gold = backup.gold;
      });
      syncMatch();
    }
    applyInitRound();
    S.live.notice = { icon: '🛡️', text: t('safety.rollback'), ts: Date.now() };
    store.setState({ live: S.live });
    return;
  }
  if (action === 'talk') {
    S.safety.talkOpen = true;
    store.setState({ safety: S.safety });
    return;
  }
  if (action === 'stop-direct') {
    applyStopToLobby();
    return;
  }
  if (action === 'stop-delayed') {
    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);
    const delayMs = Math.max(0, minutes | 0) * 60 * 1000;
    safetyDelayedTimer = setTimeout(() => {
      applyStopToLobby();
      if (isOnlineMode() && online.isHost()) online.broadcastState();
    }, delayMs);
  }
}

function applyResumeMatch() {
  S.safety.talkOpen = false;
  store.setState({ safety: S.safety });
}

// Анонимная остановка: онлайн → обратно в лобби (ростер сохраняется),
// соло → на экран настройки как раньше.
function applyStopToLobby() {
  if (safetyDelayedTimer) { clearTimeout(safetyDelayedTimer); safetyDelayedTimer = null; }
  if (audioManager) audioManager.stopSpeech();
  releaseWakeLock();
  document.body.classList.remove('spectator-mode');
  game = null;
  window.game = null;
  shifter = null;
  store.reset();
  store.setPhase(isOnlineMode() ? GamePhase.LOBBY : GamePhase.SETUP);
}

function updateHelpTargetText() {
  const helpResponderName = document.getElementById('help-responder-name');
  if (!helpResponderName) return;

  if (game && game.players.length === 2) {
    helpResponderName.innerText = game.players[game.getResponderIndex()].name;
  } else if (game && game.players.length > 2) {
    helpResponderName.innerText = t('alerts.nextInOrder');
  } else if (S.lobby.players.length === 2) {
    helpResponderName.innerText = S.lobby.players[1].name || t('alerts.otherPlayer');
  } else {
    helpResponderName.innerText = t('alerts.nextPlayer');
  }
}

function getValidFragmentOptions(fragIndex) {
  const frag = S.picker.currentQuestion.fragments[fragIndex];
  if (fragIndex === 0) return frag.options;
 
  const activeTypes = [];
  for (let i = 0; i < fragIndex; i++) {
    const stateIndex = S.picker.currentFragmentsState[i];
    if (stateIndex === undefined || stateIndex === -1) continue;
    const selectedOpt = S.picker.currentQuestion.fragments[i].options[stateIndex];
    if (selectedOpt && selectedOpt.type) activeTypes.push(selectedOpt.type);
  }

  const validOptions = frag.options.filter(opt => {
    if (!opt.requires || opt.requires.length === 0) return true;
    return opt.requires.some(req => activeTypes.includes(req));
  });
 
  return validOptions.length > 0 ? validOptions : frag.options;
}

function updatePickerHints() {
  if (!S.picker.currentQuestion) return;
  
  let rawHints = S.picker.currentQuestion.hints ? [...S.picker.currentQuestion.hints] : [];
  S.picker.currentQuestion.fragments.forEach((frag, i) => {
    const stateIndex = S.picker.currentFragmentsState[i];
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
    availableHints.push({ text: t('prompts.fallback'), isPlural: true });
  }

  // Грамматическая защита (только английский): если собранный шаблон требует
  // единственное число ("be chased by a tiny [ ... ]"), убираем из карусели
  // промпты с isPlural, чтобы не получить конструкции вида "a tiny COINS".
  // В RU/FI подстановка идёт в кавычках и падеж не страдает — фильтр не нужен.
  const compiledTemplate = getCompiledQuestionString();
  const articleMatch = getLocale() === 'en'
    ? compiledTemplate.match(/\b(?:a|an)\s+([a-zA-Z'’-]+)\s+\[ \.\.\. \]|\b(?:a|an)\s+\[ \.\.\. \]/i)
    : null;
  const questionIsSingular = !!articleMatch && (!articleMatch[1] || articleMatch[1].toLowerCase() !== 'of');
  if (questionIsSingular) {
    const nonPluralHints = availableHints.filter(h => !h.isPlural);
    if (nonPluralHints.length > 0) {
      availableHints = nonPluralHints;
    }
  }

  S.picker.questionRequiresPlural = availableHints.some(h => h.isPlural === true);

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

  // Перемешиваем получившуюся колоду и оставляем не больше пяти случайных вариантов
  for (let i = allPermutations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPermutations[i], allPermutations[j]] = [allPermutations[j], allPermutations[i]];
  }

  S.picker.promptHistory = allPermutations.slice(0, 5);
  S.picker.promptHistoryIndex = 0;
  
const displayEl = document.getElementById('prompt-display-text');
  const indexEl = document.getElementById('prompt-carousel-index');

  const normalizePromptIndex = () => {
    if (!S.picker.promptHistory || !S.picker.promptHistory.length) {
      S.picker.promptHistoryIndex = 0;
      return;
    }
    S.picker.promptHistoryIndex = ((S.picker.promptHistoryIndex % S.picker.promptHistory.length) + S.picker.promptHistory.length) % S.picker.promptHistory.length;
  };

  // Функция отрисовки текста со счетчиком
  const renderCurrentPrompt = () => {
    if (!displayEl || !S.picker.promptHistory || !S.picker.promptHistory.length) {
      if (indexEl) indexEl.innerText = '0/0';
      if (displayEl) displayEl.innerHTML = t('misc.loading');
      return;
    }

    normalizePromptIndex();

    const total = S.picker.promptHistory.length;
    const current = S.picker.promptHistoryIndex + 1;

    const h = S.picker.promptHistory[S.picker.promptHistoryIndex];
    let str = escapeHTML(h.text);
    if (!str.toLowerCase().startsWith(t('prompts.nameTwoStem'))) {
        str = `${escapeHTML(t('prompts.nameTwo').trim())} ${str}`;
    }
    if (h.modifier) {
        str += ` <span style="font-weight: 400; opacity: 0.65; color: #ffffff;">(${escapeHTML(h.modifier)})</span>`;
    }
    
    if (indexEl) indexEl.innerText = `${current}/${total}`;
    displayEl.innerHTML = str;
  };

  // Отрисовываем первый вариант сразу
  renderCurrentPrompt();
  
  const nextBtn = document.getElementById('prompt-next-btn');
  const prevBtn = document.getElementById('prompt-prev-btn');
  // Ссылки на поле и карусель
  const customInput = document.getElementById('custom-hint-input');
  const carousel = document.querySelector('.prompt-carousel-container');
  const movePromptIndex = (delta) => {
      if (!S.picker.promptHistory || !S.picker.promptHistory.length) return;
      S.picker.promptHistoryIndex = (S.picker.promptHistoryIndex + delta + S.picker.promptHistory.length) % S.picker.promptHistory.length;
      renderCurrentPrompt();
      
      // Сбрасываем кастомное поле при клике на стрелки
      if (customInput && customInput.value !== "") {
          customInput.value = "";
          if (carousel) {
              carousel.style.opacity = '1';
              carousel.style.pointerEvents = 'auto';
          }
      }
  };
  
  if (nextBtn) {
      nextBtn.onclick = () => {
          if (audioManager) audioManager.play('click');
          movePromptIndex(1);
      };
  }
  if (prevBtn) {
      prevBtn.onclick = () => {
          if (audioManager) audioManager.play('click');
          movePromptIndex(-1);
      };
  }
} // Конец функции updatePickerHints

function renderInteractiveQuestion() {
  const container = document.getElementById('secret-question-text');
  if (S.picker.currentQuestion.customCompiledText) {
      container.innerHTML = escapeHTML(injectPlayerNames(S.picker.currentQuestion.customCompiledText));
  } else {
      container.innerHTML = escapeHTML(injectPlayerNames(S.picker.currentQuestion.text)) + " ";
      S.picker.currentQuestion.fragments.forEach((frag, i) => {
        const optText = injectPlayerNames(frag.options[S.picker.currentFragmentsState[i]].text);
        const span = document.createElement('span');
        span.innerText = optText + " ";
        container.appendChild(span);
      });
  }
  updatePickerHints();
}

function getCompiledQuestionString(w1 = "[ ... ]", w2 = "[ ... ]", useHtml = false, chosenWord = null) {
  let str = "";
  if (S.picker.currentQuestion.customCompiledText) {
      str = S.picker.currentQuestion.customCompiledText;
  } else {
      str = S.picker.currentQuestion.text + " ";
      S.picker.currentQuestion.fragments.forEach((frag, i) => {
        str += frag.options[S.picker.currentFragmentsState[i]].text + " ";
      });
  }

  const resolvedChosenWord = chosenWord === null || chosenWord === undefined ? w1 : String(chosenWord);
  const formatAnswer = (word) => {
    if (!useHtml) return word;
    const isChosen = String(word).toUpperCase() === String(resolvedChosenWord).toUpperCase();
    return `<span style="color: ${isChosen ? 'var(--positive)' : 'var(--danger)'}; font-weight: 800;">${escapeHTML(word)}</span>`;
  };

  if (useHtml) {
    // Экранируем шаблон до вставки span-ов (шаблон может содержать кастомный текст)
    str = escapeHTML(str);
    str = str.replace("[ ... ]", formatAnswer(w1));
    str = str.replace("[ ... ]", formatAnswer(w2));
    return injectPlayerNames(str, true).trim();
  }
  str = str.replace("[ ... ]", w1).replace("[ ... ]", w2);
  return injectPlayerNames(str).trim();
}

function injectPlayerNames(text, escapeNames = false) {
  if (!window.game || !window.game.players || !text) return text;
  const pickerName = window.game.players[window.game.pickerIndex].name;
  const responderName = window.game.players[window.game.getResponderIndex()].name;
  const pName = escapeNames ? escapeHTML(pickerName) : pickerName;
  const rName = escapeNames ? escapeHTML(responderName) : responderName;
  return text.replace(/\[PICKER\]/g, pName).replace(/\[RESPONDER\]/g, rName);
}

// === applySubmitPick: пикер выбрал вопрос+тему (бывший selectHint) ===
function applySubmitPick(action) {
  if (!game || effectivePhase() !== GamePhase.PICKING) return;
  const gi = action.viewIndex | 0;
  const state = S.picker.generatedQuestions[gi];
  if (state) {
    S.picker.viewIndex = gi;
    S.picker.currentQuestion = state.q;
    S.picker.currentFragmentsState = [...state.f];
  }
  if (action.customCompiledText && S.picker.currentQuestion) {
    S.picker.currentQuestion.customCompiledText = action.customCompiledText;
    if (state) state.c = action.customCompiledText;
  }
  const hintObj = action.hintObj;
  if (!hintObj || !hintObj.text) return;

  S.hint.object = hintObj;

  let str = escapeHTML(hintObj.text);
  if (!str.toLowerCase().startsWith(t('prompts.nameTwoStem'))) {
      str = `${escapeHTML(t('prompts.nameTwo').trim())} ${str}`;
  }
  if (hintObj.modifier) {
      str += ` <span style="font-weight: 400; opacity: 0.65;">(${escapeHTML(hintObj.modifier)})</span>`;
  }
  S.hint.html = str;
  S.hint.requiresPlural = !!hintObj.isPlural;

  store.setPhase(GamePhase.RESPONDING_WORDS);
}

// === applyEditQuestion: живое редактирование вопроса (advanced mode) ===
function applyEditQuestion(action) {
  if (!game || !S.picker.currentQuestion || effectivePhase() !== GamePhase.PICKING) return;
  S.picker.currentQuestion.customCompiledText = action.customCompiledText;
  if (S.picker.generatedQuestions[S.picker.viewIndex]) {
    S.picker.generatedQuestions[S.picker.viewIndex].c = action.customCompiledText;
  }
  store.setState({ picker: S.picker });
}

// === applyInitRound: генерация вопросов и сброс раунда (бывшая state-часть initRound) ===
function applyInitRound() {
  if (!game) return;
  S.roundResult = null;
  S.live.typing = { w1: 0, w2: 0 };
  S.live.pickerViewIndex = 0;
  S.live.oralHint = null;
  S.live.lastReveal = null;
  S.live.notice = null;
  lastResultNonce = null;
  if (game && game.players) {
    S.guess.roundScoresSnapshot = game.players.map(p => ({ id: p.id, gold: p.gold }));
  }

  // Генерируем ровно 3 вопроса для выбора
  S.picker.generatedQuestions = [];
  S.picker.viewIndex = 0;
  S.picker.isCustomHintActive = false;

  for (let i = 0; i < 3; i++) {
    let q = game.getRandomQuestion();
    q.customCompiledText = null;

    S.picker.currentQuestion = q;
    S.picker.currentFragmentsState = [];

    q.fragments.forEach((frag, idx) => {
      const validOptions = getValidFragmentOptions(idx);
      const randIdx = Math.floor(Math.random() * validOptions.length);
      S.picker.currentFragmentsState.push(frag.options.indexOf(validOptions[randIdx]));
    });

    S.picker.generatedQuestions.push({
      q: q,
      f: [...S.picker.currentFragmentsState],
      c: null
    });
  }

  syncMatch();
  S.responder.wordMod = null;
  S.responder.words = { w1: '', w2: '', finalW1: '', finalW2: '' };
  S.responder.choice = '';
  S.responder.unchosen = '';
  S.guess.mask = null;
  S.guess.remainingGuessers = [];
  S.guess.totalGuessersThisRound = 0;
  S.guess.currentGuesserIndex = null;
  S.guess.revealCount = 0;
  S.guess.oralHintUsed = false;
  shifter = null;

  store.setPhase(GamePhase.PICKING);
}

// === renderPickerActive: экран пикера на ЕГО устройстве (бывшая DOM-часть initRound) ===
function renderPickerActive() {
  try {
    const picker = game.players[game.pickerIndex];
    screens.switchScreen('picker');
    document.getElementById('picker-name').innerText = `${picker.emoji} ${picker.name}`;
    const responder = game.players[game.getResponderIndex()];

    // Обновляем имена в плашках
    const rName = responder.name.toUpperCase();

    // === ROUND 1 ONBOARDING (FTUE): объясняем "слепой" твист ===
    const step1Title = document.getElementById('picker-step1-title');
    const step1Sub = document.getElementById('picker-step1-sub');
    const step2Title = document.getElementById('picker-step2-title');
    const step2Sub = document.getElementById('picker-step2-sub');
    if (step1Sub) step1Sub.innerHTML = t('picker.step1Sub', { name: '<span id="top-info-responder-2"></span>' });
    if (step1Title && step2Title) {
      if (game.currentRound === 1) {
        step1Title.innerHTML = t('picker.step1First', { name: escapeHTML(rName) });
        step2Title.innerHTML = t('picker.step2First');
        if (step2Sub) {
          step2Sub.innerHTML = t('picker.step2SubFirst', { name: escapeHTML(rName) });
          step2Sub.style.display = 'block';
        }
      } else {
        step1Title.innerHTML = t('picker.step1', { name: '<span id="top-info-responder"></span>' });
        step2Title.innerHTML = t('picker.step2', { name: '<span id="bottom-info-responder"></span>' });
        if (step2Sub) step2Sub.style.display = 'none';
      }
    }
    const elTop1 = document.getElementById('top-info-responder');
    const elTop2 = document.getElementById('top-info-responder-2');
    const elBottom = document.getElementById('bottom-info-responder');
    if (elTop1) elTop1.innerText = rName;
    if (elTop2) elTop2.innerText = rName;
    if (elBottom) elBottom.innerText = rName;

    const sendBtn = document.getElementById('confirm-prompt-btn');
    if (sendBtn) sendBtn.innerHTML = t('picker.sendTo', { name: escapeHTML(responder.name) });

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
      editToggleBtn.innerHTML = t('picker.editStart');

      if (!advancedModeEnabled) {
        editToggleBtn.style.display = 'none';
        editToggleBtn.disabled = true;
      } else {
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
            editToggleBtn.innerHTML = t('picker.editStop');
          } else {
            editBlock.style.display = 'none';
            questionCarouselWrapper.style.display = 'block';
            editToggleBtn.innerHTML = t('picker.editStart');
          }
        };

        editToggleBtn.onclick = () => { if (audioManager) audioManager.play('click'); toggleEdit(); };

        if (editSaveBtn) {
          editSaveBtn.onclick = () => {
            if (audioManager) audioManager.play('click');
            const compiled = `${editPart1.value.trim()} [ ... ] ${editPart2.value.trim()} [ ... ] ${editPart3.value.trim()}`;
            dispatchAction({ type: 'EDIT_QUESTION', customCompiledText: compiled });
            renderInteractiveQuestion();
            toggleEdit();
          };
        }
      }
    }

    // === НАВИГАЦИЯ ПО 3 ВОПРОСАМ (Карусель) ===
    const prevBtn = document.getElementById('prev-question-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const qIndexDisplay = document.getElementById('question-carousel-index');

    const applyHistoryState = (index) => {
      const state = S.picker.generatedQuestions[index];
      S.picker.currentQuestion = state.q;
      S.picker.currentFragmentsState = [...state.f];
      S.picker.currentQuestion.customCompiledText = state.c;
      renderInteractiveQuestion();
      if (qIndexDisplay) {
        // Убрали слово Question, оставили только счетчик 1/3
        qIndexDisplay.innerText = `${index + 1}/3`;
      }
    };

    const swipeQuestionCarousel = (newIndex, dir) => {
      S.picker.generatedQuestions[S.picker.viewIndex].c = S.picker.currentQuestion.customCompiledText;
      S.picker.viewIndex = newIndex;
      applyHistoryState(S.picker.viewIndex);
      if (audioManager) audioManager.play('click');
      // Наблюдатели видят только анимацию перелистывания карточки — без текста вопроса
      if (isOnlineMode()) {
        online.sendEphemeral({ type: 'CAROUSEL_SWIPE', viewIndex: S.picker.viewIndex, dir });
      }
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        swipeQuestionCarousel((S.picker.viewIndex - 1 + 3) % 3, -1); // Бесконечная прокрутка назад
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        swipeQuestionCarousel((S.picker.viewIndex + 1) % 3, 1); // Бесконечная прокрутка вперед
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
        S.picker.isCustomHintActive = false;
        if (customInput) customInput.value = "";
    }

    if (!advancedModeEnabled) {
        if (toggleToCustom) {
            toggleToCustom.style.display = 'none';
            toggleToCustom.disabled = true;
            toggleToCustom.onclick = null;
        }
        if (toggleToPreset) {
            toggleToPreset.onclick = null;
        }
    } else if (toggleToCustom) {
        toggleToCustom.style.display = 'block';
        toggleToCustom.disabled = false;
        toggleToCustom.onclick = () => {
            if (audioManager) audioManager.play('click');
            presetBlock.style.display = 'none';
            customBlock.style.display = 'block';
            S.picker.isCustomHintActive = true;
            
            if (customInput) {
                customInput.value = t('prompts.nameTwo');
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
            S.picker.isCustomHintActive = false;
            if (customInput) customInput.value = "";
        };
    }

    const confirmBtn = document.getElementById('confirm-prompt-btn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            let chosenHintObj = null;

            if (S.picker.isCustomHintActive) {
                let val = customInput ? customInput.value.trim() : "";
                const nameTwo = t('prompts.nameTwo').trim();
                if (val.length > 0 && val.toLowerCase() !== nameTwo.toLowerCase()) {
                    if (!val.toLowerCase().startsWith(t('prompts.nameTwoStem'))) {
                        val = nameTwo + " " + val;
                    }
                    chosenHintObj = { text: val, isPlural: false, brainstorm: [] };
                } else {
                    screens.showAlert(t('alerts.notice'), t('picker.writeTopic'));
                    return;
                }
            } else {
                if (S.picker.promptHistory && S.picker.promptHistory[S.picker.promptHistoryIndex]) {
                    chosenHintObj = S.picker.promptHistory[S.picker.promptHistoryIndex];
                }
            }

            if (!chosenHintObj) return;
            const action = {
              type: 'SUBMIT_PICK',
              viewIndex: S.picker.viewIndex,
              hintObj: chosenHintObj,
              customCompiledText: S.picker.currentQuestion.customCompiledText || null
            };
            step(
              responder,
              () => dispatchAction(action),
              t('pass.responderNote', { r: responder.name, p: picker.name })
            );
        };
    }
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside renderPickerActive: " + err.message);
    console.error(err);
  }
}


// === renderResponderWordsActive: слепой ввод двух слов на телефоне респондера ===
function renderResponderWordsActive() {
  try {
    screens.switchScreen('responder');
    const responder = game.players[game.getResponderIndex()];
    const picker = game.players[game.pickerIndex];
   
    document.getElementById('responder-name').innerText = `${responder.emoji} ${responder.name}`;
    
    const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');

document.getElementById('displayed-hint').innerHTML = S.hint.html;
    
    const pluralWarning = document.getElementById('responder-plural-warning');
    if (pluralWarning) {
        // Если Пикер отредактировал секретный вопрос или написал свой промпт — скрываем подсказку
        if (S.picker.currentQuestion.customCompiledText || S.picker.isCustomHintActive) {
            pluralWarning.style.display = 'none';
        } else {
            pluralWarning.style.display = S.hint.requiresPlural ? 'block' : 'none';
        }
    }

    // Сброс элементов шага "Now choose" — DOM переиспользуется между раундами
    const inputsWrapper = document.querySelector('#responder-screen .inputs-combined-wrapper');
    const submitBtnEl = document.getElementById('submit-words-btn');
    const wordsBadge = document.getElementById('responder-words-badge');
    const blindBanner = document.getElementById('responder-blind-banner');
    const blindBanner2 = document.getElementById('responder-blind-banner-2');

    if (inputsWrapper) inputsWrapper.classList.remove('hidden');
    if (submitBtnEl) submitBtnEl.classList.remove('hidden');
    const helperBoxReset = document.getElementById('responder-helper-box');
    if (helperBoxReset) helperBoxReset.classList.remove('hidden');
    if (wordsBadge) {
      wordsBadge.classList.add('hidden');
      wordsBadge.innerHTML = '';
    }
    if (blindBanner2) blindBanner2.classList.add('hidden');
    if (blindBanner) {
      if (game.currentRound === 1) {
        blindBanner.innerHTML = t('responder.blind1', { name: escapeHTML(picker.name) });
        blindBanner.classList.remove('hidden');
      } else {
        blindBanner.classList.add('hidden');
      }
    }

    in1.placeholder = t('responder.firstPh');
    in2.placeholder = t('responder.secondPh');

    const helperToggle = document.getElementById('responder-helper-toggle');
    const helperBox = document.getElementById('responder-helper-box') || (helperToggle ? helperToggle.parentElement : null);
    const helperContent = document.getElementById('responder-helper-content');
    const helperText = document.getElementById('responder-helper-text');
   
    if (helperToggle && helperContent && helperText) {
      if (helperBox) helperBox.style.display = 'none';
      helperContent.style.display = 'none';
      helperToggle.innerText = t('responder.ideas'); 
     
      let ideas = [];
      if (!S.picker.isCustomHintActive && S.hint.object && typeof S.hint.object === 'object' && Array.isArray(S.hint.object.brainstorm)) {
        ideas = S.hint.object.brainstorm;
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
            helperToggle.innerText = t('responder.hideIdeas');
          } else {
            helperContent.style.display = 'none';
            helperToggle.innerText = t('responder.ideas');
          }
          if (audioManager) audioManager.play('click');
        };
      }
    }
   
    const counter1 = document.getElementById('word-counter-1');
    const counter2 = document.getElementById('word-counter-2');
   
    // Ввод живёт локально: сохраняем при ре-рендере (sync/реконнект),
    // но чистим при заходе в новый раунд
    const wordsPhaseKey = `${game.currentRound}:${game.pickerIndex}`;
    if (wordsPhaseKey !== lastWordsPhaseKey) {
      lastWordsPhaseKey = wordsPhaseKey;
      in1.value = ""; in2.value = "";
    }
    in1.disabled = false; in2.disabled = false; 
   
    const resetCounter = (counterEl) => {
      const txt = counterEl.querySelector('.counter-text');
      const lock = counterEl.querySelector('.lock-icon');
      if (txt && lock) {
        txt.innerText = "0/35";
        txt.style.display = "inline";
        lock.style.display = "none";
      } else {
        counterEl.innerText = "0/35";
      }
    };
    resetCounter(counter1);
    resetCounter(counter2);

    in1.oninput = (e) => {
      const txt = counter1.querySelector('.counter-text');
      if (txt) txt.innerText = `${e.target.value.length}/35`;
      sendTypingProgress();
    };
    in2.oninput = (e) => {
      const txt = counter2.querySelector('.counter-text');
      if (txt) txt.innerText = `${e.target.value.length}/35`;
      sendTypingProgress();
    };
   
    const submitWordsBtn = document.getElementById('submit-words-btn');
    const choiceBlock = document.getElementById('responder-choice-block');
    choiceBlock.style.display = 'none';
   
    submitWordsBtn.onclick = () => {
      const w1 = in1.value.trim().toUpperCase();
      const w2 = in2.value.trim().toUpperCase();

      if (!w1 || !w2 || w1 === w2) {
        screens.showAlert(t('alerts.notice'), t('responder.diffWords'));
        return;
      }
      dispatchAction({ type: 'SUBMIT_WORDS', w1, w2 });
    };
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside renderResponderWordsActive: " + err.message);
  }
}

// === applySubmitWords: респондер отправил два слова (state-часть бывшего submit) ===
function applySubmitWords(action) {
  if (!game || effectivePhase() !== GamePhase.RESPONDING_WORDS) return;
  const w1 = String(action.w1 || '').trim().toUpperCase();
  const w2 = String(action.w2 || '').trim().toUpperCase();
  if (!w1 || !w2 || w1 === w2) return;

  let finalW1 = w1;
  let finalW2 = w2;

  let rawQuestionStr = S.picker.currentQuestion.customCompiledText || "";
  if (!rawQuestionStr) {
      rawQuestionStr = S.picker.currentQuestion.text + " ";
      S.picker.currentQuestion.fragments.forEach((frag, i) => {
        rawQuestionStr += frag.options[S.picker.currentFragmentsState[i]].text + " ";
      });
  }

  // Sprint 4: локальные модификаторы слов (суффиксы -ISM/-ИЗМ/-la и обёртки).
  const mod = detectWordModifier(rawQuestionStr, getLocale());
  let wordMod = null;

  if (mod && mod.kind === 'suffix') {
      const m1 = applyWordModifier(w1, mod.type, getLocale());
      const m2 = applyWordModifier(w2, mod.type, getLocale());
      finalW1 = m1.text;
      finalW2 = m2.text;
      wordMod = { kind: 'suffix', type: mod.type, tail1: m1.revealTail, tail2: m2.revealTail };
      S.picker.currentQuestion.customCompiledText = stripSuffixMarker(rawQuestionStr, mod.detect);
  } else if (mod && mod.kind === 'wrapper') {
      wordMod = { kind: 'wrapper', type: mod.type, before: mod.before, after: mod.after || '' };
  }
  S.responder.wordMod = wordMod;

  const tokens1 = finalW1.split(/\s+/).filter(Boolean);
  const tokens2 = finalW2.split(/\s+/).filter(Boolean);
  const isMultiWord = tokens1.length > 1 || tokens2.length > 1;

  const NV = getNerfVocab(getLocale());
  const hasSimpleColor = tokens1.some(t => NV.COLORS.includes(t)) || tokens2.some(t => NV.COLORS.includes(t));
  const hasSimpleMaterialBoth = tokens1.some(t => NV.MATERIALS.includes(t)) && tokens2.some(t => NV.MATERIALS.includes(t));
  const hasSimpleMoodBoth = tokens1.some(t => NV.MOODS.includes(t)) && tokens2.some(t => NV.MOODS.includes(t));
  const hasSimpleEra = tokens1.some(t => NV.ERAS.includes(t)) || tokens2.some(t => NV.ERAS.includes(t));
  const fullWord1 = w1.trim();
  const fullWord2 = w2.trim();
  const hasSimpleCountry = tokens1.some(t => NV.COUNTRIES.includes(t)) || tokens2.some(t => NV.COUNTRIES.includes(t));
  const hasSimpleCity = NV.CITIES.includes(fullWord1) || NV.CITIES.includes(fullWord2);
  const hasSimpleFood = tokens1.some(t => NV.FOODS.includes(t)) || tokens2.some(t => NV.FOODS.includes(t));

  const hasSimpleSport = tokens1.some(t => NV.SPORTS.includes(t)) || tokens2.some(t => NV.SPORTS.includes(t));
  const hasSimpleProf = tokens1.some(t => NV.PROFESSIONS.includes(t)) || tokens2.some(t => NV.PROFESSIONS.includes(t));
  const hasSimpleVeggie = tokens1.some(t => NV.VEGETABLES.includes(t)) || tokens2.some(t => NV.VEGETABLES.includes(t));
  const hasSimpleFruit = tokens1.some(t => NV.FRUITS.includes(t)) || tokens2.some(t => NV.FRUITS.includes(t));
  const hasSimpleClothes = tokens1.some(t => NV.CLOTHES.includes(t)) || tokens2.some(t => NV.CLOTHES.includes(t));

  let shouldNerf = hasSimpleColor || hasSimpleMaterialBoth || hasSimpleMoodBoth || hasSimpleEra || hasSimpleCountry || hasSimpleCity || hasSimpleFood || hasSimpleSport || hasSimpleProf || hasSimpleVeggie || hasSimpleFruit || hasSimpleClothes;

  if (isMultiWord) {
    shouldNerf = false;
  }

  shifter = new WordShifter(finalW1, finalW2, shouldNerf, isMultiWord);

  // Пер-словный «хвост» модификатора открыт сразу (для FI -la/-lä хвосты разные)
  if (wordMod && wordMod.kind === 'suffix') {
      revealTailIndices(finalW1, wordMod.tail1, shifter.openedIndices1);
      revealTailIndices(finalW2, wordMod.tail2, shifter.openedIndices2);
  }
  syncMask();

  S.responder.words = { w1, w2, finalW1, finalW2 };
  S.live.typing = { w1: 0, w2: 0 };
  store.setPhase(GamePhase.RESPONDING_CHOICE);
}

// === renderResponderChoiceActive: шаг "Now choose" на телефоне респондера ===
function renderResponderChoiceActive() {
  try {
    screens.switchScreen('responder');
    const responder = game.players[game.getResponderIndex()];
    document.getElementById('responder-name').innerText = `${responder.emoji} ${responder.name}`;
    document.getElementById('displayed-hint').innerHTML = S.hint.html;

    const { finalW1, finalW2 } = S.responder.words;
    const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');
    const counter1 = document.getElementById('word-counter-1');
    const counter2 = document.getElementById('word-counter-2');
    const inputsWrapper = document.querySelector('#responder-screen .inputs-combined-wrapper');
    const submitWordsBtn = document.getElementById('submit-words-btn');
    const helperBox = document.getElementById('responder-helper-box');
    const pluralWarning = document.getElementById('responder-plural-warning');
    const blindBanner = document.getElementById('responder-blind-banner');
    const blindBanner2 = document.getElementById('responder-blind-banner-2');
    const wordsBadge = document.getElementById('responder-words-badge');
    const choiceBlock = document.getElementById('responder-choice-block');

    if (in1) in1.disabled = true;
    if (in2) in2.disabled = true;

    const updateCounterToLocked = (counterEl) => {
      if (!counterEl) return;
      const txt = counterEl.querySelector('.counter-text');
      const lock = counterEl.querySelector('.lock-icon');
      if (txt && lock) {
        txt.style.display = "none";
        lock.style.display = "inline";
      }
    };
    updateCounterToLocked(counter1);
    updateCounterToLocked(counter2);

    // Прячем форму ввода: остаются бейдж слов, вопрос и две кнопки выбора
    if (inputsWrapper) inputsWrapper.classList.add('hidden');
    if (helperBox) helperBox.classList.add('hidden');
    if (submitWordsBtn) submitWordsBtn.classList.add('hidden');
    if (pluralWarning) pluralWarning.style.display = 'none';
    if (blindBanner) blindBanner.classList.add('hidden');

    if (wordsBadge) {
      wordsBadge.innerHTML =
        `<span class="locked-word-chip">🔒 ${escapeHTML(finalW1)}</span>` +
        `<span class="locked-word-chip">🔒 ${escapeHTML(finalW2)}</span>`;
      wordsBadge.classList.remove('hidden');
    }

    if (blindBanner2 && game.currentRound === 1) {
      blindBanner2.innerHTML = t('responder.blind2');
      blindBanner2.classList.remove('hidden');
    }

    if (choiceBlock) {
      choiceBlock.style.display = 'block';

      const finalQ = getCompiledQuestionString(finalW1, finalW2, false);
      document.getElementById('responder-final-question').innerText = finalQ;

      const opt1 = document.getElementById('opt-btn-1');
      const opt2 = document.getElementById('opt-btn-2');
      opt1.innerText = finalW1; opt2.innerText = finalW2;

      opt1.onclick = () => dispatchAction({ type: 'SUBMIT_SECRET_CHOICE', choice: finalW1 });
      opt2.onclick = () => dispatchAction({ type: 'SUBMIT_SECRET_CHOICE', choice: finalW2 });

      setTimeout(() => {
        choiceBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside renderResponderChoiceActive: " + err.message);
  }
}

// Открывает буквы хвоста суффикса в маске (word должен заканчиваться на tail).
function revealTailIndices(word, tail, openedSet) {
  if (!tail || !word || !word.toUpperCase().endsWith(String(tail).toUpperCase())) return;
  for (let i = 1; i <= tail.length; i++) {
    openedSet.add(word.length - i);
  }
}

// === applySecretChoice: респондер выбрал секретный ответ (бывший confirmResponderChoice) ===
function applySecretChoice(action) {
  try {
    if (!game || effectivePhase() !== GamePhase.RESPONDING_CHOICE) return;
    const w1 = S.responder.words.finalW1;
    const w2 = S.responder.words.finalW2;
    const choice = (action.choice === w2) ? w2 : w1; // принимаем только валидный ответ

    S.responder.choice = choice;
    S.responder.unchosen = (choice === w1) ? w2 : w1; // <--- ДОБАВЛЕН ОТВЕРГНУТЫЙ ОТВЕТ
    const responder = game.players[game.getResponderIndex()];

    const plainQuestionText = getCompiledQuestionString("___", "___", false);
    game.saveRoundToHistory(plainQuestionText, S.hint.html, w1, w2, choice);

    if (S.picker.currentQuestion.canTriggerCombo && typeof game.setQueuedCombo === 'function') {
      let comboWord = choice;
      const wm = S.responder.wordMod;
      if (wm && wm.kind === 'wrapper' && wm.before) {
         comboWord = wm.before + choice + (wm.after || '');
      }
      game.setQueuedCombo(comboWord, S.picker.currentQuestion.category);
    }

    const fullQuestionText = getCompiledQuestionString(w1, w2, true, choice);
    const formattedResultString = `<strong>${escapeHTML(responder.name)}</strong> ` +
      t('result.sentence', { word: `<span style="color: var(--positive); font-weight: bold;">${escapeHTML(choice)}</span>` }) + `<br>` +
      `<span style="color: var(--muted); font-style: italic;">"${fullQuestionText}"</span>`;

    game.history[game.history.length - 1].resultSentence = formattedResultString;
    syncMatch();

    S.guess.remainingGuessers = [game.pickerIndex, ...game.getOtherGuessersIndices()];
    S.guess.totalGuessersThisRound = S.guess.remainingGuessers.length;
    applyAdvanceGuesser();
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside applySecretChoice: " + err.message);
  }
}

// === applyAdvanceGuesser: кто угадывает следующим (бывший setupNextGuesser) ===
// В соло между ходами — экран передачи телефона (step), в онлайне — мгновенно.
function applyAdvanceGuesser() {
  try {
    if (S.guess.remainingGuessers.length === 0) {
      game.nextTurn();
      syncMatch();
      if (game.isGameOver()) {
        applyFinalScores();
      } else {
        const nextPicker = game.players[game.pickerIndex];
        step(nextPicker, applyInitRound);
      }
      return;
    }

    S.guess.currentGuesserIndex = S.guess.remainingGuessers.shift();
    S.guess.oralHintUsed = false;
    shifter = new WordShifter(shifter.orig1, shifter.orig2, shifter.isNerfed, shifter.isMultiWord);

    const wm = S.responder.wordMod;
    if (wm && wm.kind === 'suffix') {
        revealTailIndices(shifter.orig1, wm.tail1, shifter.openedIndices1);
        revealTailIndices(shifter.orig2, wm.tail2, shifter.openedIndices2);
    }
    syncMask();

    S.guess.revealCount = 0;

    const guesser = game.players[S.guess.currentGuesserIndex];
    const responderName = game.players[game.getResponderIndex()].name;
    const emojiName = emojiNameFor(guesser.emoji);
    const shortSpeech = t('pass.guesserSpeech', { emojiName, name: guesser.name, responder: responderName });

    step(
      guesser,
      applyEnterGuesser,
      t('pass.watchNote', { name: responderName }),
      false,
      shortSpeech
    );
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside applyAdvanceGuesser: " + err.message);
  }
}

// === applyEnterGuesser: авто-открытие букв и вход в фазу GUESSING ===
function applyEnterGuesser() {
  try {
    const guesser = game.players[S.guess.currentGuesserIndex];

    if (S.guess.revealCount === 0) {
      const isCatchUp = guesser.lastGuessCorrect === false;
      shifter.autoReveal(isCatchUp);
      S.guess.revealCount = 1;
      syncMask();
    }
    store.setPhase(GamePhase.GUESSING);
  } catch (err) {
    console.error("Error inside applyEnterGuesser:", err);
  }
}

// === renderGuessing: экран угадывания — активный угадчик или наблюдатель ===
function renderGuessing(isActive) {
  try {
    const guesser = game.players[S.guess.currentGuesserIndex];
    screens.switchScreen('guesser');
    const spectator = isOnlineMode() && !isActive;
    document.body.classList.toggle('spectator-mode', spectator);

    const banner = document.getElementById('guesser-spectator-banner');
    if (banner) {
      banner.classList.toggle('hidden', !spectator);
      if (spectator) {
        const amResponder = resolveMyIndex() === game.getResponderIndex();
        banner.innerHTML = amResponder
          ? t('guesser.spectatingYours', { emoji: escapeHTML(guesser.emoji), name: escapeHTML(guesser.name) })
          : t('guesser.spectating', { emoji: escapeHTML(guesser.emoji), name: escapeHTML(guesser.name) });
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    setupRevealButtons(isActive);
    updateGuesserUI();

    const nameEl = document.getElementById('guesser-name');
    if (nameEl && game && typeof S.guess.currentGuesserIndex === 'number') {
      nameEl.innerText = `${guesser.emoji} ${guesser.name}`;
    }

    const btn1 = document.getElementById('guess-word-1');
    const btn2 = document.getElementById('guess-word-2');

    if (isActive && shifter) {
      if (btn1) btn1.onclick = () => dispatchAction({ type: 'MAKE_GUESS', word: shifter.orig1 });
      if (btn2) btn2.onclick = () => dispatchAction({ type: 'MAKE_GUESS', word: shifter.orig2 });
    } else {
      if (btn1) btn1.onclick = null;
      if (btn2) btn2.onclick = null;
    }

    // Синхронная реакция на покупку подсказки: звук+анимация на всех телефонах
    if (S.live.lastReveal && S.live.lastReveal.ts !== lastSeenRevealTs) {
      lastSeenRevealTs = S.live.lastReveal.ts;
      audioManager.playRevealCombo();
      const rollStatusEl = document.getElementById('ability-roll-status');
      if (rollStatusEl) {
        rollStatusEl.classList.remove('pulse-shake');
        void rollStatusEl.offsetWidth;
        rollStatusEl.classList.add('pulse-shake');
      }
    }

    // Устная подсказка: угадчику — поясняющий алерт, респондеру — баннер
    if (S.live.oralHint && S.live.oralHint.ts !== lastSeenOralTs) {
      lastSeenOralTs = S.live.oralHint.ts;
      if (isActive) {
        screens.showAlert(t('guesser.oralTitle'), t('guesser.oralExplain'));
      }
    }
  } catch (err) {
    console.error("Error inside renderGuessing:", err);
  }
}

function setupRevealButtons(isActive) {
  const randBtn = document.getElementById('ability-extra-rand-btn');
  const lengthBtn = document.getElementById('ability-length-btn');

  const disabled = S.guess.revealCount !== 1;

  if (randBtn) randBtn.disabled = disabled;
  if (lengthBtn) lengthBtn.disabled = disabled;

  const canAct = !disabled && isActive;
  if (randBtn) randBtn.onclick = canAct ? (e) => { e.stopPropagation(); tryBuyHint('random'); } : null;
  if (lengthBtn) lengthBtn.onclick = canAct ? (e) => { e.stopPropagation(); tryBuyHint('length'); } : null;
}

// Локальная проверка баланса + отправка BUY_HINT на хост
function tryBuyHint(revealType) {
  const cost = revealType === 'random' ? GAME_CONFIG.REVEAL_RANDOM_COST : GAME_CONFIG.REVEAL_LENGTH_COST;
  const guesser = game.players[S.guess.currentGuesserIndex];
  if (cost > 0 && guesser.gold < cost) {
    screens.showAlert(t('alerts.notice'), t('guesser.notEnough'));
    return;
  }
  dispatchAction({ type: 'BUY_HINT', kind: revealType });
}

// === applyBuyHint: покупка подсказки на хосте (бывший useReveal + oral) ===
function applyBuyHint(action) {
  const guesser = game.players[S.guess.currentGuesserIndex];

  if (action.kind === 'oral') {
    if (S.guess.oralHintUsed || game.players.length !== 2) return;
    if (guesser.gold < GAME_CONFIG.ORAL_HINT_COST) return;
    guesser.gold -= GAME_CONFIG.ORAL_HINT_COST;
    S.guess.oralHintUsed = true;
    syncMatch();
    S.live.oralHint = { guesserIdx: S.guess.currentGuesserIndex, ts: Date.now() };
    store.setState({ live: S.live });
    return;
  }

  const cost = action.kind === 'random' ? GAME_CONFIG.REVEAL_RANDOM_COST : GAME_CONFIG.REVEAL_LENGTH_COST;
  if (S.guess.revealCount !== 1) return; // одна платная подсказка за ход
  if (cost > 0 && guesser.gold < cost) return;

  if (cost > 0) {
    guesser.gold -= cost;
    syncMatch();
  }

  if (action.kind === 'random') {
    shifter.revealExtraRandom();
  } else if (action.kind === 'length') {
    shifter.revealLength();
  }
  syncMask();

  S.guess.revealCount++;
  S.live.lastReveal = { kind: action.kind, ts: Date.now() };
  store.setState({ guess: S.guess, live: S.live });
}

function updateGuesserUI() {
  try {
    const progressEl = document.getElementById('guesser-round-progress');
    if (progressEl && game) {
      const currentGuesserStep = S.guess.totalGuessersThisRound - S.guess.remainingGuessers.length;
      let elements = [];
      
      if (game.totalRounds > 1) {
        elements.push(`<span>${t('guesser.progressRound', { a: game.currentRound, b: game.totalRounds })}</span>`);
      }
      if (game.players.length > 2) {
        elements.push(`<span>${t('guesser.progressGuesser', { a: currentGuesserStep, b: S.guess.totalGuessersThisRound })}</span>`);
      }
      
      if (elements.length > 0) {
        progressEl.innerHTML = elements.join(' <span style="color: rgba(255,255,255,0.15)">|</span> ');
        progressEl.style.display = 'flex';
      } else {
        progressEl.innerHTML = '';
        progressEl.style.display = 'none';
      }
    }

    // Подсветка свежеоткрытых букв: diff маски из состояния (работает на всех телефонах)
    const maskKey = `${game.currentRound}:${S.guess.currentGuesserIndex}`;
    if (maskKey !== lastMaskKey) {
      prevOpened1 = new Set(); prevOpened2 = new Set();
      lastMaskKey = maskKey;
    }
    const opened1 = new Set(S.guess.mask ? S.guess.mask.openedIndices1 : []);
    const opened2 = new Set(S.guess.mask ? S.guess.mask.openedIndices2 : []);
    const diff1 = new Set([...opened1].filter(i => !prevOpened1.has(i)));
    const diff2 = new Set([...opened2].filter(i => !prevOpened2.has(i)));
    const masks = shifter.getMaskedWords(diff1, diff2);
    prevOpened1 = opened1; prevOpened2 = opened2;
    const hintEl = document.getElementById('guesser-displayed-hint');
    const scoreEl = document.getElementById('potential-score');
    const balanceEl = document.getElementById('gold-balance');
    const guess1Btn = document.getElementById('guess-word-1');
    const guess2Btn = document.getElementById('guess-word-2');

    if (hintEl) hintEl.innerHTML = S.hint.html;
    if (scoreEl) scoreEl.innerText = t('guesser.winPts', { n: GAME_CONFIG.FIXED_REWARD });
    if (balanceEl) balanceEl.innerText = t('guesser.scoreLine', { name: game.players[S.guess.currentGuesserIndex].name, n: game.players[S.guess.currentGuesserIndex].gold });

    const maskCaption = document.getElementById('mask-hint-caption');
    if (maskCaption) {
      maskCaption.classList.toggle('hidden', !!shifter.isLengthRevealed);
    }

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
      if (S.guess.revealCount === 1) {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = t('guesser.rollStatus', { a: GAME_CONFIG.REVEAL_RANDOM_COST, b: GAME_CONFIG.REVEAL_LENGTH_COST });
      } else {
        rollStatusEl.style.display = 'block';
        rollStatusEl.innerHTML = t('guesser.rollSpent');
      }
    }

    updateStatsBarVisibility();

    const renderAbility = (btn, label, icon, cost) => {
      if (!btn) return;
      const row = btn.closest('.ability-row');

      btn.innerHTML = `
        <div class="ability-main-line">
          <strong>${icon} ${label}</strong>
        </div>
        <span class="ability-cost">-${cost} pts</span>
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

    renderAbility(randBtn, t('guesser.revealRand'), '🎲', GAME_CONFIG.REVEAL_RANDOM_COST);
    renderAbility(lengthBtn, t('guesser.revealLen'), '📏', GAME_CONFIG.REVEAL_LENGTH_COST);

    const abilitiesContainer = document.querySelector('.abilities-list-vertical');
    if (abilitiesContainer) {
      if (S.guess.revealCount >= 2) {
        setTimeout(() => { abilitiesContainer.style.display = 'none'; }, 400);
      } else {
        abilitiesContainer.style.display = 'flex';
      }
    }

    const oralBtn = document.getElementById('oral-hint-btn');
    if (oralBtn) {
      oralBtn.innerHTML = t('guesser.oralBtn', { n: GAME_CONFIG.ORAL_HINT_COST });
      const showOral = game && game.players.length === 2 && S.guess.revealCount >= 2 && !S.guess.oralHintUsed && isActiveGuesser();
      if (showOral) {
        oralBtn.style.setProperty('display', 'block', 'important');
        oralBtn.onclick = (e) => {
          e.stopPropagation();
          const guesser = game.players[S.guess.currentGuesserIndex];
          if (guesser.gold < GAME_CONFIG.ORAL_HINT_COST) {
            screens.showAlert(t('alerts.notice'), t('guesser.notEnoughOral'));
            return;
          }
          dispatchAction({ type: 'BUY_HINT', kind: 'oral' });
        };
      } else {
        oralBtn.style.setProperty('display', 'none', 'important');
      }
    }
  } catch (err) {
    console.error("Error in updateGuesserUI render loop:", err);
  }
}

// Подстроки-ключи для «умного пропа» на сценах (EN + RU + FI стемы).
const SMART_PROP_KEYWORDS = [
  { emoji: '🐶', keys: ["DOG", "PUPPY", "СОБАК", "ЩЕН", "KOIR"] },
  { emoji: '🐱', keys: ["KITTEN", "CAT", "КОШ", "КОТ", "КИС", "KISS"] },
  { emoji: '🐴', keys: ["HORSE", "PONY", "ЛОШАД", "КОНЬ", "КОНЯ", "HEVO", "PONI"] },
  { emoji: '🐦', keys: ["BIRD", "EAGLE", "PARROT", "ПТИЦ", "ОРЁЛ", "ОРЛ", "ПОПУГ", "LINN", "KOTK", "PAPUK"] },
  { emoji: '🐟', keys: ["FISH", "SHARK", "РЫБ", "АКУЛ", "KALAK", "HAIT"] },
  { emoji: '💸', keys: ["MONEY", "CASH", "DOLLAR", "BANK", "ДЕНЬГ", "РУБЛ", "БАНК", "RAHA", "PANKK", "VALUUT"] },
  { emoji: '🚗', keys: ["CAR", "DRIVE", "МАШИН", "АВТО", "AUTO"] },
  { emoji: '🏠', keys: ["HOUSE", "HOME", "ДОМ", "КВАРТИР", "TALO", "KOTI", "MÖKKI"] },
  { emoji: '🍎', keys: ["APPLE", "ЯБЛОК", "OMENA", "OMEN"] },
  { emoji: '📖', keys: ["BOOK", "READ", "КНИГ", "ЧТЕН", "KIRJ"] },
  { emoji: '📱', keys: ["PHONE", "APP", "ТЕЛЕФОН", "ПРИЛОЖ", "PUHEL", "SOVELL"] }
];

export function getSmartProp(word) {
  if (!word) return null;
  const w = word.toUpperCase();
  for (const entry of SMART_PROP_KEYWORDS) {
    if (entry.keys.some(k => w.includes(k))) return entry.emoji;
  }
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
    renderContent = renderContent.replace(/\[PICKER_NAME\]/g, escapeHTML(picker.name));
    renderContent = renderContent.replace(/\[RESPONDER_NAME\]/g, escapeHTML(responder.name));
    renderContent = renderContent.replace(/\[GUESSER_NAME\]/g, escapeHTML(guesser.name));

    renderContent = renderContent.replace(/\[SMART_PROP\]/g, smartProp || '');
    renderContent = renderContent.replace(/\[GUESS_WORD\]/g, escapeHTML(trueWord || ''));
    renderContent = renderContent.replace(/\[PREV_CHOICE\]/g, escapeHTML(prevChoice || ''));
    renderContent = renderContent.replace(/\[UNCHOSEN_WORD\]/g, escapeHTML(unchosenWord || ''));

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

// === applyMakeGuess: угадчик выбрал ответ (state-часть бывшего makeGuess) ===
function applyMakeGuess(action) {
  try {
    if (!game || effectivePhase() !== GamePhase.GUESSING) return;
    const word = String(action.word || '');
    if (!word) return;

    const guesser = game.players[S.guess.currentGuesserIndex];
    const isCorrect = (word === S.responder.choice);
    const goldBefore = guesser.gold;

    guesser.lastGuessCorrect = isCorrect;

    const candidateScenes = [];

    if (S.picker.currentQuestion && S.picker.currentQuestion.fragments) {
      S.picker.currentQuestion.fragments.forEach((frag, i) => {
        const stateIndex = S.picker.currentFragmentsState[i];
        if (stateIndex !== undefined && stateIndex !== -1) {
          const selectedOpt = frag.options[stateIndex];
          if (selectedOpt && selectedOpt.scene) candidateScenes.push(selectedOpt.scene);
        }
      });
    }

    candidateScenes.sort(() => Math.random() - 0.5);

    const sceneKeys = [...candidateScenes];
    if (S.picker.currentQuestion && S.picker.currentQuestion.scene) sceneKeys.push(S.picker.currentQuestion.scene);
    if (S.picker.currentQuestion) sceneKeys.push(S.picker.currentQuestion.id.toString());

    if (isCorrect) {
      guesser.gold += GAME_CONFIG.FIXED_REWARD;
    }
    syncMatch();

    // Результат раунда — в состояние: все телефоны покажут одну и ту же сцену
    const lastRoundData = game.history[game.history.length - 1];
    const rawText = S.picker.currentQuestion.customCompiledText || S.picker.currentQuestion.text || "";
    S.roundResult = {
      nonce: `${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
      word, isCorrect, goldBefore,
      goldAfter: guesser.gold,
      guesserIdx: S.guess.currentGuesserIndex,
      responderIdx: game.getResponderIndex(),
      pickerIdx: game.pickerIndex,
      sceneKeys,
      chosen: S.responder.choice,
      unchosen: S.responder.unchosen,
      involvesGuesser: rawText.includes('[GUESSER]'),
      prevChoice: S.picker.currentQuestion.comboWord || "",
      resultSentence: lastRoundData ? lastRoundData.resultSentence : ''
    };
    store.setPhase(GamePhase.ROUND_RESULT);
  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside applyMakeGuess: " + err.message);
    console.error(err);
  }
}

// Любой игрок может подтвердить результат — хост двигает игру дальше
function applyAckResult(action) {
  if (!game || effectivePhase() !== GamePhase.ROUND_RESULT) return;
  if (action && action.nonce && S.roundResult && action.nonce !== S.roundResult.nonce) return; // устаревший тап
  applyAdvanceGuesser();
}

// Сцена-звук с fade-in/fade-out как раньше, но управляемая через handle
function playSceneSfx(sfxFile) {
  const handle = { audio: null, fadeOut: null, stopped: false };
  setTimeout(() => {
    if (handle.stopped) return;
    const a = new Audio(`./src/audio/${sfxFile}`);
    handle.audio = a;
    a.volume = 0;
    a.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.1;
        if (vol >= 0.7) { a.volume = 0.7; clearInterval(fadeIn); }
        else { a.volume = vol; }
      }, 40);
      setTimeout(() => {
        if (a && !a.paused && !handle.stopped && !handle.fadeOut) {
          let outVol = a.volume;
          handle.fadeOut = setInterval(() => {
            outVol -= 0.1;
            if (outVol <= 0.05) { clearInterval(handle.fadeOut); a.pause(); }
            else { a.volume = outVol; }
          }, 50);
        }
      }, 5000);
    }).catch(() => {});
  }, 600);
  handle.stop = () => {
    handle.stopped = true;
    if (handle.fadeOut) clearInterval(handle.fadeOut);
    if (handle.audio && !handle.audio.paused) {
      let vol = handle.audio.volume;
      const fastFadeOut = setInterval(() => {
        vol -= 0.15;
        if (vol <= 0.05) {
          clearInterval(fastFadeOut);
          handle.audio.pause();
          handle.audio.currentTime = 0;
        } else {
          handle.audio.volume = vol;
        }
      }, 30);
    }
  };
  return handle;
}

// Модалка результата: тап принимается у любого игрока, но не раньше чем через
// 1.5с после открытия — случайный дабл-тап не должен скипать сцену
function showResultAlert(title, message, onConfirm) {
  const modal = document.getElementById('custom-alert-modal');
  if (!modal) return;
  document.getElementById('custom-alert-title').innerHTML = title;
  document.getElementById('custom-alert-message').innerHTML = message;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  resultShownAt = Date.now();
  modal.onclick = () => {
    if (Date.now() - resultShownAt < 1500) return;
    modal.style.display = 'none';
    if (onConfirm) onConfirm();
  };
}

// === renderRoundResult: одна и та же сцена результата на всех телефонах ===
function renderRoundResult() {
  const r = S.roundResult;
  if (!r || !game) return;

  // Под модалкой держим экран угадывания в режиме наблюдателя
  const guesserScreen = document.getElementById('guesser-screen');
  const guesserVisible = guesserScreen && !guesserScreen.classList.contains('hidden');
  if (!guesserVisible) {
    renderGuessing(false);
  }
  if (r.nonce === lastResultNonce) return; // модалка уже открыта
  lastResultNonce = r.nonce;

  const guesser = game.players[r.guesserIdx];
  const responder = game.players[r.responderIdx];
  const picker = game.players[r.pickerIdx];
  const isCorrect = r.isCorrect;
  const guessColor = isCorrect ? 'var(--positive)' : 'var(--danger)';

  // ВЫЗЫВАЕМ ГЕНЕРАТОР С ПОЛНЫМ НАБОРОМ ДАННЫХ
  const visualScene = generateVisualScene(isCorrect, r.sceneKeys, r.involvesGuesser, responder, guesser, picker, r.chosen, r.prevChoice, r.unchosen);

  const statusIcon = isCorrect ? t('result.correct') : t('result.wrong');
  const alertMessage = `<div style="text-align: center; margin-bottom: 10px;"><span style="font-size: 1.1rem; font-weight: 800; color: #ffd56b;">${t('result.score')}: ${r.goldBefore} ➔ ${r.goldAfter}</span></div>` +
    visualScene +
    `<div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 14px; border: 1px dashed rgba(255,255,255,0.15); font-size: 0.95rem; text-align: center; white-space: normal;"><div style="margin-bottom: 10px; font-weight: 700;">${t('result.yourGuess')}: <span style="color: ${guessColor}; text-transform: uppercase;">"${escapeHTML(r.word)}"</span></div><div style="line-height: 1.5; color: #e8e9f1;">${r.resultSentence}</div></div>`;

  if (isCorrect) {
    animateGoldChange(GAME_CONFIG.FIXED_REWARD, true);
    audioManager.play('win', audioManager.getVolume() * 0.6);
  } else {
    audioManager.play('lose', audioManager.getVolume() * 0.75);
  }

  const activeSceneKey = r.sceneKeys.find(t => SCENE_REGISTRY[t]);
  const activeScene = activeSceneKey ? SCENE_REGISTRY[activeSceneKey] : null;
  const sceneHandle = (activeScene && activeScene.sfx) ? playSceneSfx(activeScene.sfx) : null;

  showResultAlert(statusIcon, alertMessage, () => {
    if (sceneHandle) sceneHandle.stop();
    dispatchAction({ type: 'ACK_RESULT', nonce: r.nonce });
  });
}

function applyFinalScores() {
  S.roundResult = null;
  store.setPhase(GamePhase.FINAL_SCORES);
}

// === applyPlayAgain: хост перезапускает матч — все возвращаются в лобби ===
function applyPlayAgain() {
  game = null;
  window.game = null;
  shifter = null;
  finalScoresSpoken = false;
  store.reset();
  store.setPhase(isOnlineMode() ? GamePhase.LOBBY : GamePhase.SETUP);
}

async function renderFinalScores() {
  try {
    screens.switchScreen('final');
   
    const leaderboard = [...game.players].sort((a, b) => (b.gold || 0) - (a.gold || 0));
    document.getElementById('final-scores-list').innerHTML = leaderboard
      .map(p => `<li><strong>${p.emoji} ${escapeHTML(p.name)}</strong>: ${p.gold || 0} ${t('final.points')}</li>`).join('');

    const playerList = document.getElementById('history-player-list');
    const selectedFrame = document.getElementById('final-history-window');

    playerList.innerHTML = game.players.map((player, index) => `
      <button class="btn btn-small history-player-btn" data-player="${escapeHTML(player.name)}" data-index="${index}">
        ${player.emoji} ${escapeHTML(player.name)}
      </button>
    `).join('');

    const renderHistoryForPlayer = (playerName) => {
      const playerHistory = game.history.filter((h) => h.responder === playerName);
      const rows = playerHistory
        .map((h) => `
          <div class="history-card">
            <div class="history-card-header">
              <strong>${t('final.round', { n: h.round })}</strong>
            </div>
            <p class="history-card-text">${h.resultSentence}</p>
          </div>
        `)
        .join('');

      selectedFrame.innerHTML = `
        <div class="history-window">
          <h4 style="margin: 0 0 12px 0; font-size: 1rem; color: var(--text);">
            ${t('final.choicesBy', { name: escapeHTML(playerName) })}
          </h4>
          ${rows || `<p style="color: var(--muted);">${t('final.noChoices')}</p>`}
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
    // Озвучка победителя — один раз за финал, на каждом устройстве локально
    if (audioManager && !audioManager.isScreenReaderMode && !finalScoresSpoken) {
      finalScoresSpoken = true;
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
        winnersNamesStr = winnersNamesStr.substring(0, lastCommaIndex) + t('final.speech.and') + winnersNamesStr.substring(lastCommaIndex + 2);
      }

      if (winners.length === leaderboard.length) {
        if (leaderboard.length === 2) {
          winnerSpeechText = t('final.speech.draw2', { a: winners[0].name, b: winners[1].name, n: topScore });
          playFanfares = false; 
        } else {
          winnerSpeechText = t('final.speech.drawAll', { names: winnersNamesStr, n: topScore });
        }
      } else if (winners.length > 1) {
        winnerSpeechText = t('final.speech.sharedWin', { names: winnersNamesStr, n: topScore });
      } else {
        winnerSpeechText = t('final.speech.win', { name: winners[0].name, n: topScore });
      }

      try {
        await audioManager.speakAsync(winnerSpeechText);
        if (audioManager.cancelQueue) return;
        
        if (playFanfares) {
          await audioManager.playAsync('fanfare', audioManager.getVolume() * 0.75);
          if (audioManager.cancelQueue) return;
        }

        if (losers.length > 0) {
          let losersSpeech = losers.length === 1 ? t('final.speech.followedBy') : t('final.speech.otherScores');
          losersSpeech += losers.map(p => t('final.speech.withPts', { name: p.name, n: p.gold || 0 })).join(", ") + " " + t('final.speech.ptsWord') + ".";
          await audioManager.speakAsync(losersSpeech);
          if (audioManager.cancelQueue) return;
        }

        let historyText = t('final.speech.historyIntro');
        game.history.forEach(h => {
          let cleanSentence = h.resultSentence.replace(/<\/?[^>]+(>|$)/g, "");
          // Декодируем HTML-сущности, чтобы TTS не зачитывал их названия
          cleanSentence = cleanSentence
            .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
            .replace(/&amp;/g, "&");
          historyText += cleanSentence + ". ";
        });
        await audioManager.speakAsync(historyText);

      } catch (e) {
        console.debug("Speech queue interrupted:", e);
      }
    } else if (stopVoiceBtn) {
      stopVoiceBtn.style.display = 'none';
    }

    const backBtn = document.getElementById('back-to-setup-btn');
    if (backBtn) {
      if (isOnlineMode() && !online.isHost()) {
        backBtn.innerText = t('final.waitHost');
        backBtn.disabled = true;
        backBtn.onclick = null;
      } else {
        backBtn.innerText = t('final.playAgain');
        backBtn.disabled = false;
        backBtn.onclick = () => {
          if (isOnlineMode()) dispatchAction({ type: 'PLAY_AGAIN' });
          else resetToSetupState();
        };
      }
    }

  } catch (err) {
    screens.showAlert(t('alerts.error'), "Error inside renderFinalScores: " + err.message);
    console.error(err);
  }
}

function animateGoldChange(amount, positive = false) {
  try {
    const el = document.getElementById('gold-balance');
    if (!el) return;
    if (game && typeof S.guess.currentGuesserIndex === 'number' && game.players[S.guess.currentGuesserIndex]) {
      el.innerText = t('guesser.scoreLine', { name: game.players[S.guess.currentGuesserIndex].name, n: game.players[S.guess.currentGuesserIndex].gold });
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
      screens.showAlert(t('misc.iosTitle'), t('setup.installIos'));
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

function setupSettingsModal() {
  const settingsBtn = document.getElementById('settings-global-btn');
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.getElementById('settings-close-btn');

  if (!settingsBtn || !modal) return;

  const openSettings = (e) => {
    e.stopPropagation();
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  };

  const closeSettings = () => {
    modal.style.display = 'none';
    modal.classList.add('hidden');
  };

  settingsBtn.onclick = openSettings;
  if (closeBtn) closeBtn.onclick = closeSettings;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSettings();
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

/* ============================================================
   ОНЛАЙН-РЕЖИМ: ролевой рендер + сессия комнаты
   ============================================================ */

function isActivePicker() { return !!game && resolveMyIndex() === game.pickerIndex; }
function isActiveResponder() { return !!game && resolveMyIndex() === game.getResponderIndex(); }
function isActiveGuesser() { return !!game && resolveMyIndex() === S.guess.currentGuesserIndex; }

// Единая точка рендера: подписка на store + после каждого STATE_SYNC.
// Рисует экран под РОЛЬ этого устройства (в соло роль = текущая фаза).
function renderLocalView() {
  if (!screens) return;
  try {
    updateOralHintBanner();
    updateTalkOverlay();
    updateNotice();

    // SAFETY_PAUSE — только соло: модалка поверх, экран под ней не трогаем
    if (S.phase === GamePhase.SAFETY_PAUSE) return;

    const phasesWithGame = [
      GamePhase.PICKING, GamePhase.RESPONDING_WORDS, GamePhase.RESPONDING_CHOICE,
      GamePhase.GUESSING, GamePhase.ROUND_RESULT, GamePhase.FINAL_SCORES
    ];
    if (phasesWithGame.includes(S.phase) && !game) {
      if (isOnlineMode()) renderLobby(); else renderSetup();
      return;
    }

    switch (S.phase) {
      case GamePhase.SETUP: renderSetup(); break;
      case GamePhase.LOBBY: renderLobby(); break;
      case GamePhase.PICKING:
        if (isActivePicker()) renderPickerActive();
        else renderCompanionView();
        break;
      case GamePhase.RESPONDING_WORDS:
        if (isActiveResponder()) renderResponderWordsActive();
        else renderCompanionView();
        break;
      case GamePhase.RESPONDING_CHOICE:
        if (isActiveResponder()) renderResponderChoiceActive();
        else renderCompanionView();
        break;
      case GamePhase.GUESSING:
        renderGuessing(isActiveGuesser());
        break;
      case GamePhase.ROUND_RESULT:
        renderRoundResult();
        break;
      case GamePhase.FINAL_SCORES:
        renderFinalScores();
        break;
      case GamePhase.PASS_DEVICE:
        // Соло: экраном передачи телефона управляет showPassScreen напрямую.
        break;
    }
  } catch (err) {
    console.error('renderLocalView error:', err);
  }
}

function renderSetup() {
  screens.switchScreen('setup');
  document.body.classList.remove('spectator-mode');
  const safetyTip = document.getElementById('safety-tip-text');
  if (safetyTip) {
    safetyTip.style.display = 'block';
    safetyTip.innerText = t('setup.safetyTip');
  }
  updateLangPills();
}

function renderLobby() {
  if (!isOnlineMode()) { renderSetup(); return; }
  screens.switchScreen('lobby');
  document.body.classList.remove('spectator-mode');
  const code = S.online.roomCode || '';
  const codeEl = document.getElementById('lobby-room-code');
  if (codeEl) codeEl.innerText = code ? code.split('').join(' ') : '····';
  const qr = document.getElementById('lobby-qr');
  if (qr && code) {
    const joinUrl = `${location.origin}${location.pathname}?room=${code}`;
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(joinUrl)}`;
  }
  renderLobbyRoster();
  updateLangPills();
}

function renderLobbyRoster() {
  const list = document.getElementById('lobby-players');
  if (!list) return;
  list.innerHTML = S.online.roster.map(p =>
    `<div class="lobby-player-row">` +
    `<span class="connected-dot${p.connected === false ? ' off' : ''}"></span>` +
    `<span class="lobby-player-name">${p.avatar || '🎮'} ${escapeHTML(p.name || 'PLAYER')}</span>` +
    (p.isHost ? `<span class="host-crown">👑 ${t('lobby.host')}</span>` : '') +
    (p.connected === false ? `<span class="host-crown">${t('lobby.offline')}</span>` : '') +
    `</div>`
  ).join('');

  const isHost = isOnlineMode() && online.isHost();
  const hostControls = document.getElementById('lobby-host-controls');
  if (hostControls) hostControls.classList.toggle('hidden', !isHost);

  const connected = S.online.roster.filter(p => p.connected !== false).length;
  const startBtn = document.getElementById('lobby-start-btn');
  if (startBtn) startBtn.disabled = !(isHost && connected >= 2 && connected <= 4);

  const status = document.getElementById('lobby-status-text');
  if (status) {
    status.innerText = isHost
      ? (connected < 2 ? t('lobby.waitMore')
        : connected > 4 ? t('lobby.full')
        : t('lobby.connected', { n: connected }))
      : t('lobby.waitHost');
  }
}

// === Companion-view: телефон неактивной роли на фазах выбора/ввода ===
function renderCompanionView() {
  screens.switchScreen('companion');
  document.body.classList.remove('spectator-mode');
  const myIdx = resolveMyIndex();
  const picker = game.players[game.pickerIndex];
  const responderIdx = game.getResponderIndex();
  const responder = game.players[responderIdx];
  const icon = document.getElementById('companion-icon');
  const statusEl = document.getElementById('companion-status');
  const sub = document.getElementById('companion-sub');
  const qBlock = document.getElementById('companion-question-block');
  const flip = document.getElementById('companion-flip');

  if (S.phase === GamePhase.PICKING) {
    if (flip) flip.classList.remove('hidden');
    if (icon) icon.innerText = picker.emoji;
    const target = (myIdx === responderIdx) ? t('companion.targetYou') : escapeHTML(responder.name);
    if (statusEl) statusEl.innerHTML = t('companion.picking', { emoji: picker.emoji, name: escapeHTML(picker.name), target });
    if (sub) sub.innerText = t('companion.pickingSub');
    // Текст вопроса неактивным не показываем — он секрет до конца ввода
    if (qBlock) qBlock.classList.add('hidden');
  } else if (S.phase === GamePhase.RESPONDING_WORDS) {
    if (flip) flip.classList.add('hidden');
    if (icon) icon.innerText = responder.emoji;
    if (statusEl) statusEl.innerHTML = t('companion.typing', { emoji: responder.emoji, name: escapeHTML(responder.name) });
    if (sub) sub.innerText = t('companion.typingSub');
    renderCompanionQuestion(true);
  } else if (S.phase === GamePhase.RESPONDING_CHOICE) {
    if (flip) flip.classList.add('hidden');
    if (icon) icon.innerText = responder.emoji;
    if (statusEl) statusEl.innerHTML = t('companion.choosing', { emoji: responder.emoji, name: escapeHTML(responder.name) });
    if (sub) sub.innerText = t('companion.choosingSub');
    renderCompanionQuestion(false);
  }
}

function renderCompanionQuestion(withTyping) {
  const qBlock = document.getElementById('companion-question-block');
  if (qBlock) qBlock.classList.remove('hidden');
  const topic = document.getElementById('companion-topic');
  if (topic) topic.innerHTML = S.hint.html;
  const rawQuestion = getCompiledQuestionString('[ ... ]', '[ ... ]', false);
  const parts = rawQuestion.split('[ ... ]');
  const p1 = document.getElementById('companion-q-part1');
  const p2 = document.getElementById('companion-q-part2');
  const p3 = document.getElementById('companion-q-part3');
  if (p1) p1.innerText = parts[0] ? parts[0].trim() : '';
  if (p2) p2.innerText = parts[1] ? parts[1].trim() : '';
  if (p3) p3.innerText = parts[2] ? parts[2].trim() : '';
  updateCompanionTypingSlots(withTyping);
}

// Живой индикатор печати: только ДЛИНЫ слов, буквы никогда не передаются
function updateCompanionTypingSlots(withTyping = (S.phase === GamePhase.RESPONDING_WORDS)) {
  const s1 = document.getElementById('companion-slot1');
  const s2 = document.getElementById('companion-slot2');
  if (!s1 || !s2) return;
  const t = S.live.typing || { w1: 0, w2: 0 };
  const slotHtml = (len) => len > 0
    ? `<span class="typing-indicator">${t('companion.typingInd', { n: len, max: 35 })}</span>`
    : '<span class="companion-blank">[ … ]</span>';
  if (withTyping) {
    s1.innerHTML = slotHtml(t.w1);
    s2.innerHTML = slotHtml(t.w2);
  } else {
    s1.innerHTML = '<span class="companion-blank">[ … ]</span>';
    s2.innerHTML = '<span class="companion-blank">[ … ]</span>';
  }
}

// Анимация "листает вопросы" на наблюдающих телефонах (без текста вопроса)
function playCompanionFlip() {
  const flip = document.getElementById('companion-flip');
  if (!flip || S.phase !== GamePhase.PICKING) return;
  flip.classList.remove('hidden');
  flip.style.animation = 'none';
  void flip.offsetWidth;
  flip.style.animation = '';
}

// Баннер на телефоне респондера: "скажи устную подсказку вслух"
function updateOralHintBanner() {
  const banner = document.getElementById('oral-hint-banner');
  if (!banner) return;
  const show = !!(S.live.oralHint && game && isOnlineMode() && isActiveResponder() && S.phase === GamePhase.GUESSING);
  banner.classList.toggle('hidden', !show);
}

// Safety "Open Circle" открывается/закрывается на всех телефонах синхронно
function updateTalkOverlay() {
  const modal = document.getElementById('safety-modal');
  if (!modal) return;
  const scrPrivacy = document.getElementById('safety-screen-privacy');
  const scrOptions = document.getElementById('safety-screen-options');
  const scrTalk = document.getElementById('safety-screen-talk');
  if (S.safety.talkOpen) {
    talkOverlayActive = true;
    if (scrPrivacy) scrPrivacy.style.display = 'none';
    if (scrOptions) scrOptions.style.display = 'none';
    if (scrTalk) scrTalk.style.display = 'block';
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  } else if (talkOverlayActive) {
    talkOverlayActive = false;
    modal.style.display = 'none';
    modal.classList.add('hidden');
    if (scrTalk) scrTalk.style.display = 'none';
    if (scrOptions) scrOptions.style.display = 'none';
    if (scrPrivacy) scrPrivacy.style.display = 'block';
  }
}

// Транзитные уведомления всем телефонам (например, safety-skip раунда)
function updateNotice() {
  const n = S.live.notice;
  if (!n || n.ts === lastSeenNoticeTs) return;
  lastSeenNoticeTs = n.ts;
  screens.showAlert(n.icon || 'ℹ️', n.text || '');
}

function updateHostBanner(present) {
  const banner = document.getElementById('host-wait-banner');
  if (!banner) return;
  const show = isOnlineMode() && !online.isHost() && !present;
  banner.classList.toggle('hidden', !show);
}

// Оверлей реконнекта: только когда мы в комнате и сокет не открыт
function updateConnBanner(status) {
  const overlay = document.getElementById('connection-overlay');
  if (!overlay) return;
  const show = isOnlineMode() && status !== 'open' && (pendingJoin || !!S.online.roomCode);
  overlay.classList.toggle('hidden', !show);
  overlay.style.display = show ? 'flex' : 'none';
}

// Респондер печатает: шлём только длины слов (debounced), буквы — никогда
function sendTypingProgress() {
  if (!isOnlineMode()) return;
  if (typingDebounceTimer) clearTimeout(typingDebounceTimer);
  typingDebounceTimer = setTimeout(() => {
    const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');
    online.sendEphemeral({
      type: 'TYPING_PROGRESS',
      w1: in1 ? in1.value.trim().length : 0,
      w2: in2 ? in2.value.trim().length : 0
    });
  }, 120);
}

// Эфемерные события (relay без записи в каноническое состояние)
function renderEphemeral(action, fromPlayerId) {
  try {
    switch (action.type) {
      case 'TYPING_PROGRESS':
        S.live.typing = { w1: action.w1 | 0, w2: action.w2 | 0 };
        if (S.phase === GamePhase.RESPONDING_WORDS && !isActiveResponder()) {
          updateCompanionTypingSlots(true);
        }
        break;
      case 'CAROUSEL_SWIPE':
        S.live.pickerViewIndex = action.viewIndex | 0;
        playCompanionFlip();
        break;
      case 'ORAL_HINT_DONE':
        break;
      case 'SET_LOCALE':
        // Хост сменил язык комнаты — применяем сразу (лобби/сетап).
        if (SUPPORTED_LOCALES.includes(action.locale)) {
          S.lobby.locale = action.locale;
          applyLocaleNow();
          renderLocalView();
        }
        break;
    }
  } catch (err) {
    console.error('renderEphemeral error:', err);
  }
}

// Пересборка runtime-зеркал из снапшота хоста (гость + вернувшийся хост).
// game/shifter пересобираем ДО applyRemoteState: его notify триггерит
// renderLocalView, которому уже нужны живые объекты.
function restoreRuntimeFromState(remoteState) {
  const next = typeof remoteState === 'string' ? JSON.parse(remoteState) : remoteState;
  if (!next) return;
  // Локаль комнаты едет внутри snapshot — ставим её ДО Match.deserialize,
  // т.к. десериализация берёт вопросы из БД текущей локали.
  if (next.lobby && SUPPORTED_LOCALES.includes(next.lobby.locale) && next.lobby.locale !== getLocale()) {
    setLocale(next.lobby.locale);
    if (audioManager) audioManager.setLocale(next.lobby.locale);
    updateLangPills();
  }
  game = next.match ? Match.deserialize(next.match) : null;
  window.game = game;
  shifter = next.guess && next.guess.mask ? WordShifter.fromJSON(next.guess.mask) : null;
  // Не затираем наш онлайн-контекст (roster/roomCode) снапшотом хоста
  const myOnline = { ...S.online };
  store.applyRemoteState(next);
  S.online = myOnline;
}

// === applyStartGame: старт матча — соло из лобби, онлайн по ростеру комнаты ===
function applyStartGame(action) {
  if (isOnlineMode() && !online.isHost()) return;
  const rounds = Math.max(1, Math.min(10, (action && action.rounds) || S.lobby.roundsInput || 1));

  if (isOnlineMode()) {
    const roster = (action && Array.isArray(action.players) && action.players.length)
      ? action.players
      : S.online.roster;
    const connected = roster.filter(p => p.connected !== false);
    if (connected.length < 2 || connected.length > 4) return;

    // netId связывает игрока матча с конкретным телефоном для ролевого рендера
    game = new Match(
      connected.map(p => ({ name: String(p.name || 'PLAYER').slice(0, 14) || 'PLAYER', emoji: p.avatar || '🎮' })),
      rounds
    );
    connected.forEach((p, i) => { game.players[i].netId = p.playerId; });
  } else {
    if (S.lobby.players.length < 2) return;
    game = new Match(S.lobby.players, rounds);
  }

  window.game = game;
  finalScoresSpoken = false;
  syncMatch();
  acquireWakeLock();
  applyInitRound();
}

// === Оркестрация онлайн-режима: UI панели + депсы сессии ===
function setupOnlineMode() {
  online = new OnlineSession({
    store,
    applyAction: (action, from) => applyAction(action, from),
    renderLocalView: () => renderLocalView(),
    restoreRuntimeFromState: (state) => restoreRuntimeFromState(state),
    renderEphemeral: (action, from) => renderEphemeral(action, from),
    onLobbyUpdate: (players) => {
      S.online.roster = players;
      S.online.hostPlayerId = (players.find(p => p.isHost) || {}).playerId || S.online.hostPlayerId;
      if (S.phase === GamePhase.LOBBY) renderLobbyRoster();
      // Гость только что зашёл: хост шлёт локаль комнаты эфемером (без STATE_SYNC).
      if (online.isHost() && S.phase === GamePhase.LOBBY) {
        online.sendEphemeral({ type: 'SET_LOCALE', locale: getLocale() });
      }
      updateLangPills();
    },
    onConnectionChange: (status) => updateConnBanner(status),
    onHostPresence: (present) => updateHostBanner(present),
    onRoomEntered: ({ roomCode }) => {
      pendingJoin = false;
      S.online.roomCode = roomCode;
      // У хоста локаль комнаты = его локальный выбор; у гостя придёт SET_LOCALE/snapshot.
      if (online.isHost()) S.lobby.locale = getLocale();
      updateConnBanner('open');
      updateHostBanner(true);
      // Свежее вступление — в лобби; при реконнекте с cached state
      // restoreRuntimeFromState сразу после этого вернёт настоящую фазу.
      if (S.phase === GamePhase.SETUP) store.setPhase(GamePhase.LOBBY);
    },
    onSessionError: ({ message }) => {
      pendingJoin = false;
      updateConnBanner('open');
      const statusEl = document.getElementById('online-status-text');
      if (statusEl) statusEl.innerText = message || t('alerts.sessionErr');
    },
    onSessionEnd: () => {
      pendingJoin = false;
      S.online.roomCode = null;
      S.online.roster = [];
      updateHostBanner(true);
      updateConnBanner('open');
      releaseWakeLock();
      document.body.classList.remove('spectator-mode');
      game = null; window.game = null; shifter = null;
      store.reset();
      setSetupMode('solo');
      store.setPhase(GamePhase.SETUP);
      screens.showAlert(t('alerts.roomClosed'), t('alerts.roomClosedBody'));
    }
  });

  // --- Переключатель режима ---
  const soloBtn = document.getElementById('mode-solo-btn');
  const onlineBtn = document.getElementById('mode-online-btn');
  if (soloBtn) soloBtn.onclick = () => { if (audioManager) audioManager.play('click'); setSetupMode('solo'); };
  if (onlineBtn) onlineBtn.onclick = () => { if (audioManager) audioManager.play('click'); setSetupMode('online'); };

  // --- Табы Create / Join ---
  const tabCreate = document.getElementById('online-tab-create');
  const tabJoin = document.getElementById('online-tab-join');
  if (tabCreate) tabCreate.onclick = () => { if (audioManager) audioManager.play('click'); setOnlineTab('create'); };
  if (tabJoin) tabJoin.onclick = () => { if (audioManager) audioManager.play('click'); setOnlineTab('join'); };

  // --- Аватар (emoji picker в self-режиме) ---
  const avatarBtn = document.getElementById('online-avatar-btn');
  if (avatarBtn) {
    avatarBtn.innerText = onlineAvatar;
    avatarBtn.onclick = () => { if (audioManager) audioManager.play('click'); openEmojiPickerForSelf(); };
  }

  // --- Create / Join ---
  const connectBtn = document.getElementById('online-connect-btn');
  const nameInput = document.getElementById('online-name-input');
  const codeInput = document.getElementById('join-code-input');
  if (codeInput) {
    codeInput.addEventListener('input', () => {
      codeInput.value = codeInput.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
    });
  }
  if (connectBtn) {
    connectBtn.onclick = () => {
      if (audioManager) audioManager.play('click');
      const name = (nameInput ? nameInput.value : '').trim().slice(0, 14);
      if (!name) {
        const statusEl = document.getElementById('online-status-text');
        if (statusEl) statusEl.innerText = t('setup.enterName');
        return;
      }
      pendingJoin = true;
      updateConnBanner('connecting');
      if (onlineTab === 'create') {
        online.createRoom({ name, avatar: onlineAvatar });
      } else {
        const code = codeInput ? codeInput.value.trim() : '';
        if (code.length !== 4) {
          pendingJoin = false;
          updateConnBanner('open');
          const statusEl = document.getElementById('online-status-text');
          if (statusEl) statusEl.innerText = t('setup.enterCode');
          return;
        }
        online.joinRoom(code, { name, avatar: onlineAvatar });
      }
    };
  }

  // --- Лобби: старт игры / выход ---
  const lobbyStart = document.getElementById('lobby-start-btn');
  if (lobbyStart) {
    lobbyStart.onclick = () => {
      if (audioManager) audioManager.play('click');
      const roundsInput = document.getElementById('lobby-rounds-input');
      const rounds = roundsInput ? Math.max(1, Math.min(10, parseInt(roundsInput.value, 10) || 1)) : 1;
      dispatchAction({ type: 'START_GAME', rounds, players: S.online.roster });
    };
  }
  const lobbyLeave = document.getElementById('lobby-leave-btn');
  if (lobbyLeave) {
    lobbyLeave.onclick = () => {
      if (audioManager) audioManager.play('click');
      online.leaveRoom();
      S.online.roomCode = null;
      S.online.roster = [];
      setSetupMode('solo');
      store.setPhase(GamePhase.SETUP);
    };
  }

  // --- Кнопка "Done" на баннере устной подсказки ---
  const oralDone = document.getElementById('oral-hint-done-btn');
  if (oralDone) {
    oralDone.onclick = () => {
      if (audioManager) audioManager.play('click');
      dispatchAction({ type: 'ORAL_HINT_DONE' });
    };
  }

  // --- Тап по оверлею реконнекта отменяет ожидание входа ---
  const connOverlay = document.getElementById('connection-overlay');
  if (connOverlay) {
    connOverlay.onclick = () => {
      if (pendingJoin) {
        pendingJoin = false;
        updateConnBanner('open');
      }
    };
  }
}

function applyOralHintDone() {
  S.live.oralHint = null;
  store.setState({ live: S.live });
}

let onlineTab = 'create';

function setSetupMode(mode) {
  const soloBtn = document.getElementById('mode-solo-btn');
  const onlineBtn = document.getElementById('mode-online-btn');
  const soloPanel = document.getElementById('solo-setup-panel');
  const onlinePanel = document.getElementById('online-setup-panel');
  const isOnline = mode === 'online';
  if (soloBtn) soloBtn.classList.toggle('mode-card-active', !isOnline);
  if (onlineBtn) onlineBtn.classList.toggle('mode-card-active', isOnline);
  if (soloPanel) soloPanel.classList.toggle('hidden', isOnline);
  if (onlinePanel) onlinePanel.classList.toggle('hidden', !isOnline);
}

function setOnlineTab(tab) {
  onlineTab = tab === 'join' ? 'join' : 'create';
  const tabCreate = document.getElementById('online-tab-create');
  const tabJoin = document.getElementById('online-tab-join');
  const joinBlock = document.getElementById('join-code-block');
  const connectBtn = document.getElementById('online-connect-btn');
  if (tabCreate) tabCreate.classList.toggle('online-tab-active', onlineTab === 'create');
  if (tabJoin) tabJoin.classList.toggle('online-tab-active', onlineTab === 'join');
  if (joinBlock) joinBlock.classList.toggle('hidden', onlineTab !== 'join');
  if (connectBtn) connectBtn.innerText = t(onlineTab === 'create' ? 'setup.connectCreate' : 'setup.connectJoin');
}

// === Sprint 4: языковая пилюля (сетап + лобби) ===
// Соло/хост — переключают, гость видит локаль комнаты read-only.
function setupLanguagePills() {
  document.querySelectorAll('.lang-pill').forEach(pill => {
    pill.querySelectorAll('[data-lang]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        if (audioManager) audioManager.play('click');
        setGameLocale(btn.dataset.lang);
      };
    });
  });
  updateLangPills();
}

function setGameLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  if (isOnlineMode() && !online.isHost()) return; // гость — только чтение
  S.lobby.locale = locale;
  applyLocaleNow();
  if (isOnlineMode()) {
    online.sendEphemeral({ type: 'SET_LOCALE', locale });
    // фиксируем в состоянии — доедет со следующим STATE_SYNC
    store.setState({ lobby: S.lobby });
  }
  renderLocalView();
}

function applyLocaleNow() {
  const locale = (S.lobby && SUPPORTED_LOCALES.includes(S.lobby.locale)) ? S.lobby.locale : getLocale();
  if (locale !== getLocale()) setLocale(locale);
  else applyStaticTexts();
  if (audioManager && audioManager.setLocale) audioManager.setLocale(locale);
  updateLangPills();
}

function updateLangPills() {
  const cur = getLocale();
  const canChange = !isOnlineMode() || (online && online.isHost());
  document.querySelectorAll('.lang-pill').forEach(pill => {
    pill.classList.toggle('lang-pill-readonly', !canChange);
    pill.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === cur);
      btn.disabled = !canChange;
    });
  });
}