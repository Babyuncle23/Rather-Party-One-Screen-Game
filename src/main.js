import { Match } from './core/Match.js';

import { WordShifter } from './core/WordShifter.js';

import { ScreenController } from './ui/ScreenController.js';

import { AudioManager } from './audio/AudioManager.js';

import { SIMPLE_COLORS, SIMPLE_MATERIALS, SIMPLE_MOODS, SIMPLE_ERAS, SIMPLE_COUNTRIES, SIMPLE_CITIES, SIMPLE_FOODS } from './data/nerfWords.js';

const PLAYER_EMOJIS = [

  "🦊", "🐼", "🐸", "🐱", "🐶", "🐰", "🐯", "🐨", "-", "🐮", "🐵", "🐙", "🐢", "🦕",

  "🦋", "🌸", "🌻", "🍄", "🍉", "🍓", "🥑", "🍕", "🍩", "🎲", "👾", "👻", "👽", "🤖",

  "🤠", "😎", "🤓", "🥳", "🥸", "🤡", "🦄", "🐧", "🦉", "🐝", "🦦", "🦥"

];



// 🟢 ДОБАВЛЕНО: Словарь и функция озвучки

const EMOJI_NAMES = {

  "🦊": "Fox", "🐼": "Panda", "🐸": "Frog", "🐱": "Cat", "🐶": "Dog", "🐰": "Bunny",

  "🐯": "Tiger", "🐨": "Koala", "🐷": "Pig", "🐮": "Cow", "🐵": "Monkey", "🐙": "Octopus",

  "🐢": "Turtle", "🦕": "Dinosaur", "🦋": "Butterfly", "🌸": "Flower", "🌻": "Sunflower",

  "🍄": "Mushroom", "🍉": "Watermelon", "🍓": "Strawberry", "🥑": "Avocado", "🍕": "Pizza",

  "🍩": "Donut", "🎲": "Dice", "👾": "Alien", "👻": "Ghost", "👽": "Alien", "🤖": "Robot",

  "🤠": "Cowboy", "😎": "Cool guy", "🤓": "Nerd", "🥳": "Party face", "🥸": "Disguise",

  "🤡": "Clown", "🦄": "Unicorn", "🐧": "Penguin", "🦉": "Owl", "🐝": "Bee", "🦦": "Otter", "🦥": "Sloth"

};



function passPhoneWithSpeech(player, onConfirm, note) {

  const emojiName = EMOJI_NAMES[player.emoji] || "";

  if (audioManager) {

    audioManager.speak(`Pass the phone to ${emojiName} ${player.name}`);

  }

  screens.showPassScreen(player, onConfirm, note);

}



let game = null;

let screens = null;

let audioManager = null;



let currentQuestion = null;

let roundScoresSnapshot = null;

let currentHint = "";

let currentHintObject = null; // Хранит ссылку на объект выбранной подсказки (для брейншторма)

let isCustomHintActive = false; // Флаг: написана ли подсказка вручную игроком

let shifter = null;

let responderChoice = "";



let remainingGuessers = [];

let totalGuessersThisRound = 0; // Сохраняем исходное количество угадывающих для правильного рендера точек

let currentGuesserIndex = null;

const FIXED_REWARD = 50; // Each correct answer is worth 50 points

let revealCount = 0; // Track: 0 = no reveals, 1 = one reveal used, 2 = two reveals used

let currentCardIndex = 0;

let fragmentsHistory = [];



let temporaryPlayersList = [];

let currentFragmentsState = [];

let safetyDelayedTimer = null; // <-- Добавь эту строку



document.addEventListener("DOMContentLoaded", () => {

  try {

    audioManager = new AudioManager();

    screens = new ScreenController();

    screens.setupAudioControl(audioManager);

    setupInitialEventListeners();

    setupHelpPanel();

    setupGlobalButtonSounds();

    setupPsychologicalSafetySystem(); // Теперь кнопка работает сразу при загрузке сайта



    // Запускаем предзагрузку тяжелых звуков при первом клике или тапе по экрану

    const initAudioPreload = () => {

      audioManager.preloadRevealSounds();

      document.removeEventListener('click', initAudioPreload);

      document.removeEventListener('touchstart', initAudioPreload);

    };

    document.addEventListener('click', initAudioPreload);

    document.addEventListener('touchstart', initAudioPreload);



  } catch (error) {

    console.error("Initialization error:", error);

    alert("UI Style Injection failed: " + error.message);

  }

});



function setupInitialEventListeners() {

  const addPlayerBtn = document.getElementById('add-player-btn');

  const singleInput = document.getElementById('single-player-input');

  const startGameBtn = document.getElementById('start-game-btn');



addPlayerBtn.onclick = () => {

    const name = singleInput.value.trim();

    if (name.length > 0) {

      // Ищем дубликаты теперь по ключу name

      if (temporaryPlayersList.some(p => p.name === name.toUpperCase())) {

        alert("This name is already taken!");

        return;

      }

     

      const randomEmoji = PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];

      temporaryPlayersList.push({ name: name.toUpperCase(), emoji: randomEmoji });

     

      singleInput.value = "";

      renderPlayerBoxes();

    }

  };



  singleInput.onkeydown = (e) => {

    if (e.key === "Enter") addPlayerBtn.click();

  };



  startGameBtn.onclick = () => {

    const roundsInput = parseInt(document.getElementById('rounds-input').value) || 3;

    if (temporaryPlayersList.length < 2) {

      alert("Please add at least 2 players to start!");

      return;

    }

    game = new Match(temporaryPlayersList, roundsInput);

    window.game = game; // Делаем доступным для экрана передачи телефона

   

    // Гарантируем, что кнопка видна, когда матч начался

    const safetyBtn = document.getElementById('safety-global-btn');

    if (safetyBtn) safetyBtn.style.display = 'block';

   

    // Меняем подпись на игровую

    const safetyTip = document.getElementById('safety-tip-text');

    if (safetyTip) safetyTip.innerText = "Open without showing other players if needed.";



      passPhoneWithSpeech(

      game.players[game.pickerIndex],

      initRound,

      "This is your call only. Read the question and choose a prompt."

    );

  };

}



function renderPlayerBoxes() {

  const container = document.getElementById('players-boxes-container');

  container.innerHTML = "";

  temporaryPlayersList.forEach((player, index) => {

    const box = document.createElement('div');

    box.className = "player-box";

    box.innerHTML = `

      <div class="player-box-left">

        <div class="player-avatar" title="Tap to reroll emoji">${player.emoji}</div>

        <span>${player.name}</span>

      </div>

      <button class="delete-box-btn">✕</button>

    `;

   

    // Удаление

    box.querySelector('.delete-box-btn').onclick = () => {

      temporaryPlayersList.splice(index, 1);

      renderPlayerBoxes();

    };

   

    // Реролл смайлика по клику

    box.querySelector('.player-avatar').onclick = (e) => {

      e.stopPropagation();

      player.emoji = PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];

      if (audioManager) audioManager.play('click'); // Звук при смене

      renderPlayerBoxes();

    };

   

    container.appendChild(box);

  });

  updateHelpTargetText();

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

    // Проверяем, какой игровой экран сейчас отображается пользователю

    if (document.getElementById('picker-screen').style.display === 'block') return 1;

    if (document.getElementById('responder-screen').style.display === 'block') return 2;

    if (document.getElementById('guesser-screen').style.display === 'block') return 3;

    return 1; // По умолчанию (экран настроек или финала)

  }



  function renderHelpCarousel() {

    const steps = helpPanel.querySelectorAll('.help-step');

    steps.forEach(step => {

      const stepNum = parseInt(step.dataset.step);

      step.style.display = stepNum === currentHelpStep ? 'block' : 'none';

    });

    if (indexDisplay) {

      indexDisplay.innerText = `Step ${currentHelpStep} / 3`;

    }

  }



  helpToggle.onclick = () => {

    const isOpen = helpPanel.style.display === 'block';

    if (!isOpen) {

      // Если инструкцию ОТКРЫВАЮТ, фиксируем карусель на шаге текущего экрана игры

      currentHelpStep = determineCurrentStep();

      renderHelpCarousel();

      helpPanel.style.display = 'block';

      helpToggle.innerText = 'Hide gameplay tips';

    } else {

      helpPanel.style.display = 'none';

      helpToggle.innerText = 'Show compact gameplay tips';

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

  helpToggle.innerText = 'Show compact gameplay tips';

  updateHelpTargetText();

}



function setupGlobalButtonSounds() {

  document.addEventListener('click', (e) => {

    const button = e.target.closest('button');

    if (button) {

      // Если кликнули на саму кнопку безопасности или на кнопку внутри её модального окна — глушим звук

      if (button.id === 'safety-global-btn' || button.closest('#safety-modal')) {

        return;

      }

      audioManager.play('click');

    }

  }, true);

}



/**

 * Инициализация системы психологической безопасности (Hold to Confirm)

 */

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

    scrPrivacy.style.display = 'block';

    scrOptions.style.display = 'none';

    scrTalk.style.display = 'none';

    modal.style.display = 'flex';

  };



  proceedBtn.onclick = () => {

    scrPrivacy.style.display = 'none';

    scrOptions.style.display = 'block';

  };



  const closeSafety = () => { modal.style.display = 'none'; };

  closeBtn1.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };

  closeBtn2.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };

  resumeMatchBtn.onclick = () => { closeSafety(); resetSafetyButtonsState(scrOptions); };



  // Логика кастомного таймера маскировки

  let safetySelectedMinutes = 0;

  const timerMinus = document.getElementById('safety-timer-minus');

  const timerPlus = document.getElementById('safety-timer-plus');

  const timerDisplay = document.getElementById('safety-timer-display');



  if (timerMinus && timerPlus && timerDisplay) {

    const handleMinus = (e) => {

      e.preventDefault();

      e.stopPropagation();

      safetySelectedMinutes = 0;

      timerDisplay.innerText = "Current: 0 min";

    };



    const handlePlus = (e) => {

      e.preventDefault();

      e.stopPropagation();

      safetySelectedMinutes += 1;

      timerDisplay.innerText = `Current: ${safetySelectedMinutes} min`;

    };



    timerMinus.onclick = handleMinus;

    timerMinus.ontouchstart = handleMinus;

    timerPlus.onclick = handlePlus;

    timerPlus.ontouchstart = handlePlus;

  }



  // Логика раскрытия карточек-спойлеров по клику

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



  // Передаем переменную выбранных минут в обработчик удержания кнопок

  setupSafetyHoldTriggers(scrOptions, scrTalk, modal, () => safetySelectedMinutes);

}



/**

 * Вспомогательный метод сброса кнопок удержания при закрытии

 */

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





/**

 * Обработка 2-секундного удержания для безопасных опций

 */

function setupSafetyHoldTriggers(scrOptions, scrTalk, modal, getMinutesFn) {

  const triggers = scrOptions.querySelectorAll('.safety-hold-trigger');

 

  triggers.forEach(btn => {

    let holdTimer = null;



    const startHold = (e) => {

      e.preventDefault();

      e.stopPropagation();

     

      btn.classList.add('holding');

      btn.innerText = "Holding...";



      holdTimer = setTimeout(() => {

        const minutes = typeof getMinutesFn === 'function' ? getMinutesFn() : 0;

        executeSafetyAction(btn.dataset.action, scrOptions, scrTalk, modal, minutes);

        endHold();

      }, 2000);

    };



    const endHold = () => {

      if (holdTimer) clearTimeout(holdTimer);

      btn.classList.remove('holding');

      btn.innerText = "Hold for 2s to Confirm";

    };



    btn.onmousedown = startHold;

    btn.onmouseup = endHold;

    btn.onmouseleave = endHold;



    btn.ontouchstart = startHold;

    btn.ontouchend = endHold;

    btn.ontouchcancel = endHold;

  });

}



/**

 * Исполнение выбранного безопасного действия

 */

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

    alert("🛡️ Safety: Current round was canceled. All scores earned during this round have been rolled back, and a new question is loaded.");



  } else if (action === 'talk') {

    scrOptions.style.display = 'none';

    scrTalk.style.display = 'block';



  } else if (action === 'stop-direct') {

    modal.style.display = 'none';

    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);

    const progressReport = game.players.map(p => `${p.name}: ${p.gold} pts`).join('\n');

   

    alert(`🛑 Match Stopped by Player Request\n\nThe session has been explicitly halted. Current player scores have been preserved successfully:\n\n${progressReport}\n\nReturning to the main lobby.`);

   

    const safetyTip = document.getElementById('safety-tip-text');

    if (safetyTip) safetyTip.innerText = "Recommended for all players to read before starting.";

    game = null;

    renderPlayerBoxes();

    screens.switchScreen('setup');



} else if (action === 'stop-delayed') {

    modal.style.display = 'none';

    const delayMs = minutes * 60 * 1000;

   

    // Очищаем старый таймер, если игрок случайно запустил его дважды

    if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);

   

    safetyDelayedTimer = setTimeout(() => {

      // ... (внутренний код алерта и сброса оставляем без изменений)

      let scoresSummary = "No active players data found.";

      if (window.game && window.game.players) {

        scoresSummary = window.game.players.map(p => `${p.name}: ${p.gold} pts`).join('\n');

      }

     

      const sessionCloseAlert =

        `⏱️ SESSION NOTICE: Play Time Limit Reached\n\n` +

        `To ensure session health and automatic player background anonymization, this match has been finalized by the system.\n\n` +

        `FINAL MATCH SCORES:\n${scoresSummary}\n\n` +

        `The lobby is now closed. Please recreate players or take a routine break.`;

     

      alert(sessionCloseAlert);

     

      const safetyTip = document.getElementById('safety-tip-text');

      if (safetyTip) safetyTip.innerText = "Recommended for all players to read before starting.";

      window.game = null;

      game = null;

      renderPlayerBoxes();

      screens.switchScreen('setup');

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

 

  // Первый фрагмент всегда доступен полностью

  if (fragIndex === 0) return frag.options;

 

  // 1. Собираем массив всех типов (type), которые игрок уже выбрал в предыдущих фрагментах

  const activeTypes = [];

  for (let i = 0; i < fragIndex; i++) {

    const stateIndex = currentFragmentsState[i];

   

    // ЗАЩИТА: Если индекс сломался (-1 или undefined), пропускаем итерацию

    if (stateIndex === undefined || stateIndex === -1) continue;

   

    const selectedOpt = currentQuestion.fragments[i].options[stateIndex];

    if (selectedOpt && selectedOpt.type) {

      activeTypes.push(selectedOpt.type);

    }

  }



  // 2. Фильтруем опции текущего фрагмента на основе собранной истории

  const validOptions = frag.options.filter(opt => {

    // Если у опции нет требований, она доступна всем

    if (!opt.requires || opt.requires.length === 0) return true;

   

    // Опция доступна, если хотя бы один её требуемый тип есть в нашей истории activeTypes

    return opt.requires.some(req => activeTypes.includes(req));

  });

 

  // БРОНЕБОЙНАЯ ЗАЩИТА: Если из-за опечатки в базе отфильтровались ВСЕ варианты,

  // мы принудительно возвращаем все опции фрагмента, чтобы игра не зависла.

  return validOptions.length > 0 ? validOptions : frag.options;

}



function randomizeCurrentFragments() {

  // Если у нас уже есть какое-то состояние, сохраняем его копию в историю перед рероллом

  if (currentFragmentsState && currentFragmentsState.length > 0) {

    fragmentsHistory.push([...currentFragmentsState]);

    const undoBtn = document.getElementById('undo-options-btn');

    if (undoBtn) undoBtn.style.display = 'inline-block';

  }



  currentFragmentsState = [];

  currentQuestion.fragments.forEach((frag, i) => {

    const validOptions = getValidFragmentOptions(i);

    const randIdx = Math.floor(Math.random() * validOptions.length);

    currentFragmentsState.push(frag.options.indexOf(validOptions[randIdx]));

  });

  renderInteractiveQuestion();

}



// Глобальная функция, которая собирает умные подсказки

function updatePickerHints() {

  if (!currentQuestion) return;

 

  const btn1 = document.getElementById('hint-btn-1');

  const btn2 = document.getElementById('hint-btn-2');

  if (!btn1 || !btn2) return;



  // 1. Берем общие подсказки для категории (если есть)

  let availableHints = currentQuestion.hints ? [...currentQuestion.hints] : [];

 

  // 2. Ищем КОНТЕКСТНЫЕ подсказки внутри выбранных вариантов

  currentQuestion.fragments.forEach((frag, i) => {

    const selectedOption = frag.options[currentFragmentsState[i]];

    if (selectedOption.hints && Array.isArray(selectedOption.hints)) {

      availableHints.push(...selectedOption.hints);

    }

  });

 

  // 3. Убираем дубликаты

  availableHints = [...new Set(availableHints)];



  // Если подсказок маловато, добавляем дефолтные для безопасности

  if (availableHints.length < 2) {

    availableHints.push("Name two weird things", "Name two objects");

  }



  // 4. Достаем 2 случайные подсказки из собранного пула

  const randomIndex1 = Math.floor(Math.random() * availableHints.length);

  const hint1 = availableHints.splice(randomIndex1, 1)[0];

  const randomIndex2 = Math.floor(Math.random() * availableHints.length);

  const hint2 = availableHints[randomIndex2];

 

const formatHintText = (hint) => {

    let text = typeof hint === 'object' ? hint.text : hint;

   

    // Если текст не начинается со слова "Name", добавляем инструкцию

    if (!text.toLowerCase().startsWith('name')) {

      text = `Name two: ${text}`;

    }

   

    if (typeof hint === 'object' && hint.isPlural) {

      text += " (plural)";

    }

   

    return text;

  };

 

  btn1.innerText = formatHintText(hint1);

  btn2.innerText = formatHintText(hint2);

 

  btn1.onclick = () => { isCustomHintActive = false; selectHint(hint1); };

  btn2.onclick = () => { isCustomHintActive = false; selectHint(hint2); };

}



function renderInteractiveQuestion() {

  const container = document.getElementById('secret-question-text');

  container.innerHTML = currentQuestion.text + " ";

 

  currentQuestion.fragments.forEach((frag, i) => {

    const optText = frag.options[currentFragmentsState[i]].text;

    const span = document.createElement('span');

    span.innerText = optText + " "; // Просто склеиваем текст в предложение

    container.appendChild(span);

  });



  updatePickerHints();

}



function getCompiledQuestionString(w1 = "[ ... ]", w2 = "[ ... ]", useHtml = false) {

  // Используем сгенерированный activeText

  let str = currentQuestion.text + " ";

  currentQuestion.fragments.forEach((frag, i) => {

    str += frag.options[currentFragmentsState[i]].text + " ";

  });

 

  // Заменяем маркер [ ... ] на нужные слова

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

   

    // Очищаем историю рероллов опций при смене вопроса или начале нового раунда

    fragmentsHistory = [];

    currentFragmentsState = []; // 🟢 ДОБАВЛЕНО: сброс индексов от прошлого раунда

    const undoBtn = document.getElementById('undo-options-btn');

    if (undoBtn) {

      undoBtn.style.display = 'none';

      undoBtn.onclick = () => {

        if (fragmentsHistory.length > 0) {

          // Достаем предыдущее состояние

          currentFragmentsState = fragmentsHistory.pop();

          renderInteractiveQuestion();

          audioManager.play('click');

         

          // Скрываем кнопку, если история закончилась

          if (fragmentsHistory.length === 0) undoBtn.style.display = 'none';

        }

      };

    }



    // 2. Сразу генерируем случайную вариацию (вместо старого цикла forEach)

    randomizeCurrentFragments();



    const picker = game.players[game.pickerIndex];

    screens.switchScreen('picker');

   

document.getElementById('picker-name').innerText = `${picker.emoji} ${picker.name}`;

    const responder = game.players[game.getResponderIndex()];

    document.getElementById('responder-target-name').innerText = `${responder.emoji} ${responder.name}`;

   

    updateHelpTargetText();



    // 3. Подключаем кнопку бесконечной генерации вариантов

    const rerollOptionsBtn = document.getElementById('reroll-options-btn');

    if (rerollOptionsBtn) {

      rerollOptionsBtn.onclick = () => {

        randomizeCurrentFragments();

        audioManager.play('click'); // Опционально: звук при генерации

      };

    }



    // 4. Подключаем кнопку полной смены вопроса (1 раз за ход)

const rerollBtn = document.getElementById('reroll-question-btn');

    if (rerollBtn) {

      rerollBtn.style.display = 'block';

      rerollBtn.onclick = () => {

        game.shuffledQuestions.unshift(currentQuestion);

        currentQuestion = game.getRandomQuestion();

       

        // 🟢 ДОБАВЛЕНО: Полностью обнуляем память перед генерацией вариантов для НОВОГО вопроса

        fragmentsHistory = [];

        currentFragmentsState = [];

        const undoBtn = document.getElementById('undo-options-btn');

        if (undoBtn) undoBtn.style.display = 'none';

       

        randomizeCurrentFragments();

        updatePickerHints();

        rerollBtn.style.display = 'none';

      };

    }

   

    const btn1 = document.getElementById('hint-btn-1');

    const btn2 = document.getElementById('hint-btn-2');

   

    const customInput = document.getElementById('custom-hint-input');

    customInput.value = "";

    document.getElementById('custom-hint-btn').onclick = () => {

      if (customInput.value.trim().length > 0) {

        isCustomHintActive = true;

        selectHint(customInput.value.trim());

      }

    };

  } catch (err) {

    alert("Error inside initRound: " + err.message);

    console.error(err);

  }

}



function selectHint(hint) {

  try {

    currentHintObject = hint;

   

    // Формируем финальную строку подсказки с учетом isPlural

    let hintStr = typeof hint === 'object' ? hint.text : hint;

    if (typeof hint === 'object' && hint.isPlural) {

      hintStr += " (plural)";

    }

    currentHint = hintStr;

    const responder = game.players[game.getResponderIndex()];

passPhoneWithSpeech(

      responder,

      startResponderPhase,

      "Only the next player should look at the phone. Keep it hidden from others."

    );

  } catch (err) {

    alert("Error inside selectHint: " + err.message);

  }

}



function startResponderPhase() {

  try {

    screens.switchScreen('responder');

    const responder = game.players[game.getResponderIndex()];

   

    document.getElementById('responder-name').innerText = `${responder.emoji} ${responder.name}`;

    document.getElementById('displayed-hint').innerText = currentHint.toUpperCase();



    // Логика контекстной компактной подсказки со спойлером

    const helperBox = document.getElementById('responder-helper-box');

    const helperToggle = document.getElementById('responder-helper-toggle');

    const helperContent = document.getElementById('responder-helper-content');

    const helperText = document.getElementById('responder-helper-text');

   

    if (helperBox && helperToggle && helperContent && helperText) {

      // Принудительно скрываем саму плашку, сворачиваем её внутреннее содержимое и сбрасываем текст кнопки

      helperBox.style.display = 'none';

      helperContent.style.display = 'none';

      helperToggle.innerText = '[ 💡 Need ideas? Tap to brainstorm ]';

     

      let ideas = [];

     

      // Достаем брейншторм только если подсказка выбрана из базы и у нее мануально прописан массив идей

      if (!isCustomHintActive && currentHintObject && typeof currentHintObject === 'object' && Array.isArray(currentHintObject.brainstorm)) {

        ideas = currentHintObject.brainstorm;

      }



      if (ideas.length > 0) {

        const randomIdeas = [...ideas].sort(() => Math.random() - 0.5).slice(0, 4);

        helperText.innerText = randomIdeas.join(', ');

        helperBox.style.display = 'block';

       

        helperToggle.onclick = (e) => {

          e.stopPropagation();

          const isCollapsed = helperContent.style.display === 'none';

          if (isCollapsed) {

            helperContent.style.display = 'block';

            helperToggle.innerText = '[ 🔼 Hide brainstorm ideas ]';

          } else {

            helperContent.style.display = 'none';

            helperToggle.innerText = '[ 💡 Need ideas? Tap to brainstorm ]';

          }

        };

      }

    }

   

    const in1 = document.getElementById('word-input-1');

    const in2 = document.getElementById('word-input-2');

    const counter1 = document.getElementById('word-counter-1');

    const counter2 = document.getElementById('word-counter-2');

   

    in1.value = ""; in2.value = "";

    in1.disabled = false; in2.disabled = false; // Разблокируем инпуты для нового раунда

   

    // Сбрасываем отображение счетчиков и скрываем замки

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

        alert("Enter 2 different words!");

        return;

      }



      // Разбиваем каждую строчку на отдельные слова по пробелам

      const tokens1 = w1.split(/\s+/).filter(Boolean);

      const tokens2 = w2.split(/\s+/).filter(Boolean);



      // Проверяем, является ли хотя бы один ответ фразой из нескольких слов

      const isMultiWord = tokens1.length > 1 || tokens2.length > 1;



      // Поштучная проверка каждого слова в массивах на штрафы (Nerf)

      const hasSimpleColor1 = tokens1.some(t => SIMPLE_COLORS.includes(t));

      const hasSimpleColor2 = tokens2.some(t => SIMPLE_COLORS.includes(t));

      const hasSimpleColor = hasSimpleColor1 || hasSimpleColor2;

     

      const hasSimpleMaterial1 = tokens1.some(t => SIMPLE_MATERIALS.includes(t));

      const hasSimpleMaterial2 = tokens2.some(t => SIMPLE_MATERIALS.includes(t));

      const hasSimpleMaterialBoth = hasSimpleMaterial1 && hasSimpleMaterial2;



      const hasSimpleMood1 = tokens1.some(t => SIMPLE_MOODS.includes(t));

      const hasSimpleMood2 = tokens2.some(t => SIMPLE_MOODS.includes(t));

      const hasSimpleMoodBoth = hasSimpleMood1 && hasSimpleMood2;



      // Если хотя бы в одном поле написана простая эпоха (например, 90S) — раунд сразу штрафуется

      const hasSimpleEra = tokens1.some(t => SIMPLE_ERAS.includes(t)) || tokens2.some(t => SIMPLE_ERAS.includes(t));



      // Проверка на простые географические названия (достаточно совпадения в одном из полей)

      // Собираем полную строку для проверки городов, состоящих из нескольких слов (например, NEW YORK)

      const fullWord1 = w1.trim();

      const fullWord2 = w2.trim();

     

      const hasSimpleCountry = tokens1.some(t => SIMPLE_COUNTRIES.includes(t)) || tokens2.some(t => SIMPLE_COUNTRIES.includes(t));

      const hasSimpleCity = SIMPLE_CITIES.includes(fullWord1) || SIMPLE_CITIES.includes(fullWord2);

     

      // Проверка на тривиальные или базовые продукты питания

      const hasSimpleFood = tokens1.some(t => SIMPLE_FOODS.includes(t)) || tokens2.some(t => SIMPLE_FOODS.includes(t));



      const shouldNerf = hasSimpleColor || hasSimpleMaterialBoth || hasSimpleMoodBoth || hasSimpleEra || hasSimpleCountry || hasSimpleCity || hasSimpleFood;



     

      shifter = new WordShifter(w1, w2, shouldNerf, isMultiWord);

     

      // Блокируем инпуты постфактум, чтобы нельзя было изменить ответы

      in1.disabled = true;

      in2.disabled = true;



      // Меняем текст счетчиков на значки замков

      const lockCounter = (counterEl) => {

        const txt = counterEl.querySelector('.counter-text');

        const lock = counterEl.querySelector('.lock-icon');

        if (txt && lock) {

          txt.style.display = "none";

          lock.style.display = "inline";

        }

      };

      lockCounter(counter1);

      lockCounter(counter2);



      choiceBlock.style.display = 'block';





     

      const finalQ = getCompiledQuestionString(w1, w2, false);

      document.getElementById('responder-final-question').innerText = finalQ;

     

      const opt1 = document.getElementById('opt-btn-1');

      const opt2 = document.getElementById('opt-btn-2');

      opt1.innerText = w1; opt2.innerText = w2;

     

      opt1.onclick = () => confirmResponderChoice(w1, w2, w1);

      opt2.onclick = () => confirmResponderChoice(w1, w2, w2);



      // Плавно скроллим экран вниз к появившемуся блоку выбора финального ответа

      setTimeout(() => {

        choiceBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      }, 50);

    };

  } catch (err) {

    alert("Error inside startResponderPhase: " + err.message);

  }

}



function confirmResponderChoice(w1, w2, choice) {

  try {

    responderChoice = choice;

    const responder = game.players[game.getResponderIndex()];

   

    // Определяем проигравшее слово (loser)

    const loserWord = (choice === w1) ? w2 : w1;

   

const plainQuestionText = getCompiledQuestionString("___", "___", false);

    game.saveRoundToHistory(plainQuestionText, currentHint, w1, w2, choice);

   

    const fullQuestionText = getCompiledQuestionString(w1, w2, true);

   

    // Формируем красивую, грамматически независимую строку истории по вашей новой формуле

    const formattedResultString = `<strong>${responder.name}</strong> chose ` +

      `<span style="color: #00ffb3; font-weight: bold;">${choice}</span> over ` +

      `<span style="color: #ff4a4a; font-weight: bold;">${loserWord}</span> in the question:<br>` +

      `<span style="color: var(--muted); font-style: italic;">"${fullQuestionText}"</span>`;

   

    // Записываем сгенерированное предложение в последний элемент истории

    game.history[game.history.length - 1].resultSentence = formattedResultString;

   

    remainingGuessers = [game.pickerIndex, ...game.getOtherGuessersIndices()];



    totalGuessersThisRound = remainingGuessers.length; // Фиксируем размер очереди перед тем, как извлекать игроков

    setupNextGuesser();

  } catch (err) {

    alert("Error inside confirmResponderChoice: " + err.message);

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

    // Пересоздаем WordShifter для следующего угадывающего игрока, сохраняя все флаги баланса

    shifter = new WordShifter(shifter.orig1, shifter.orig2, shifter.isNerfed, shifter.isMultiWord);

    revealCount = 0;

   

    // Сбрасываем скролл перед передачей хода следующему угадывающему

    window.scrollTo({ top: 0, behavior: 'instant' });

   

    // Получаем имя игрока, который придумывал слова

    const responderName = game.players[game.getResponderIndex()].name;



passPhoneWithSpeech(

      game.players[currentGuesserIndex],

      startGuesserPhase,

      `Only this player should hold the phone, but ${responderName} can watch the guessing process!`

    );

  } catch (err) {

    alert("Error inside setupNextGuesser: " + err.message);

  }

}



let activeAbilities = []; // Храним 2 выбранные способности для текущего раунда



function startGuesserPhase() {

  try {

    // 1. Инициализация двух способностей по правилам баланса фраз и случайного выбора одиночных слов

    if (revealCount === 0) {

      if (shifter && shifter.isMultiWord) {

        // Если хотя бы одно поле содержит фразу из нескольких слов — строго фиксируем Random и Letters Type

        activeAbilities = ['random', 'type'];

      } else {

        // Если в обоих полях одиночные слова — выбираем ровно 2 случайные способности из 3 доступных

        const allTypes = ['positional', 'random', 'type'];

        const shuffled = [...allTypes].sort(() => Math.random() - 0.5);

        activeAbilities = [shuffled[0], shuffled[1]];

      }

    }

    // 2. Теперь настраиваем кнопки и разметку, зная точный список activeAbilities

    setupRevealButtons();

    updateGuesserUI();



    // Старый блок устной подсказки полностью удален отсюда, управление передано в updateGuesserUI

    screens.switchScreen('guesser');

   

const nameEl = document.getElementById('guesser-name');

    if (nameEl && game && typeof currentGuesserIndex === 'number') {

      const guesser = game.players[currentGuesserIndex];

      nameEl.innerText = `${guesser.emoji} ${guesser.name}`;

    }

   

    const btn1 = document.getElementById('guess-word-1');

    const btn2 = document.getElementById('guess-word-2');

   

    if (btn1 && shifter) btn1.onclick = () => makeGuess(shifter.orig1);

    if (btn2 && shifter) btn2.onclick = () => makeGuess(shifter.orig2);

  } catch (err) {

    console.error("Error inside startGuesserPhase:", err);

  }

}



function setupRevealButtons() {

  const posBtn = document.getElementById('ability-pos-btn');

  const randBtn = document.getElementById('ability-rand-btn');

  const typeBtn = document.getElementById('ability-type-btn');

 

  const getButtonState = () => {

    if (revealCount === 0) return { disabled: false, cost: 0, label: ' (FREE)' };

    if (revealCount === 1) return { disabled: false, cost: 15, label: ' (15 pts)' };

    return { disabled: true, cost: 0, label: ' (Used)' };

  };

 

  const state = getButtonState();



  // Кнопки блокируются только если они уже использованы (state.disabled) или не попали в текущий раунд (activeAbilities)

  posBtn.disabled = state.disabled || !activeAbilities.includes('positional');

  randBtn.disabled = state.disabled || !activeAbilities.includes('random');

  typeBtn.disabled = state.disabled || !activeAbilities.includes('type');

 

  posBtn.onclick = (e) => {

    e.stopPropagation();

    if (!posBtn.disabled) useReveal('positional', state.cost);

  };

  randBtn.onclick = (e) => {

    e.stopPropagation();

    if (!randBtn.disabled) useReveal('random', state.cost);

  };

  typeBtn.onclick = (e) => {

    e.stopPropagation();

    if (!typeBtn.disabled) useReveal('type', state.cost);

  };

}



function useReveal(revealType, cost) {

  const guesser = game.players[currentGuesserIndex];

 

  if (cost > 0 && guesser.gold < cost) {

    alert('Not enough points for this reveal!');

    return;

  }



  // 1. Списываем очки и активируем анимацию баланса гарантированно

  if (cost > 0) {

    guesser.gold -= cost;

    animateGoldChange(-cost);

  }



  // 2. Запоминаем состояние до раскрытия

  const openedBefore = shifter.openedIndices1.size + shifter.openedIndices2.size;

 

  const intensity = revealCount + 1;

  if (revealType === 'positional') shifter.revealPositional(intensity);

  else if (revealType === 'random') shifter.revealRandom(intensity);

  else if (revealType === 'type') shifter.revealLetterType(intensity);

 

  // 3. Проверяем состояние после раскрытия

  const openedAfter = shifter.openedIndices1.size + shifter.openedIndices2.size;

  const newlyOpened = openedAfter - openedBefore;



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



  // 4. Если буквы не открылись, уведомляем игрока о неудаче

  if (newlyOpened === 0) {

    let reason = "Bad luck! All possible letters for this ability are already revealed or do not exist in these answers.";

    if (revealType === 'type') {

      reason = intensity === 1

        ? "Bad luck! There are no hidden CONSONANTS left in these answers."

        : "Bad luck! There are no hidden VOWELS left in these answers.";

    } else if (revealType === 'positional') {

      reason = "Bad luck! The target positions (start, middle, or end) are already completely visible.";

    }

    alert(`⚠️ Unlucky Reveal:\n${reason}`);

  }

}



function updateGuesserUI() {

  try {

    // Рендеринг компактного индикатора раунда и очереди

    const progressEl = document.getElementById('guesser-round-progress');

    if (progressEl && game) {

      // Вычисляем строгую позицию текущего угадывающего в цепочке (человеческий счет с 1)

      const currentGuesserStep = totalGuessersThisRound - remainingGuessers.length;



      progressEl.innerHTML = `

        <span>ROUND ${game.currentRound}/${game.totalRounds}</span>

        <span style="color: rgba(255,255,255,0.15)">|</span>

        <span>GUESSER ${currentGuesserStep} OF ${totalGuessersThisRound}</span>

      `;

    }







    const masks = shifter.getMaskedWords();

   

    const displayStaticQuestion = getCompiledQuestionString("[ ANSWER 1 ]", "[ ANSWER 2 ]", false);

    const hintEl = document.getElementById('guesser-displayed-hint');

    const questionEl = document.getElementById('guesser-question-display');

    const scoreEl = document.getElementById('potential-score');

    const balanceEl = document.getElementById('gold-balance');

    const guess1Btn = document.getElementById('guess-word-1');

    const guess2Btn = document.getElementById('guess-word-2');



    if (hintEl) hintEl.innerText = currentHint;

    if (questionEl) questionEl.innerText = displayStaticQuestion;

    if (scoreEl) scoreEl.innerText = `Win: +${FIXED_REWARD} points`;

    if (balanceEl) balanceEl.innerText = `Points: ${game.players[currentGuesserIndex].gold}`;

   

    const count1 = shifter.getWordCount1();

    const count2 = shifter.getWordCount2();

    const wordLabel1 = count1 === 1 ? "1 word" : `${count1} words`;

    const wordLabel2 = count2 === 1 ? "1 word" : `${count2} words`;



    if (guess1Btn) guess1Btn.innerHTML = `<span style="font-size: 10px; opacity: 0.4; font-weight: 700; margin-right: 8px; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">ANSWER 1</span><span style="font-size: 9px; opacity: 0.35; font-weight: 600; display: block; margin-bottom: 6px; letter-spacing: 0.02em;">(${wordLabel1})</span><div class="masked-wrapper">${masks.w1}</div>`;

    if (guess2Btn) guess2Btn.innerHTML = `<span style="font-size: 10px; opacity: 0.4; font-weight: 700; margin-right: 8px; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">ANSWER 2</span><span style="font-size: 9px; opacity: 0.35; font-weight: 600; display: block; margin-bottom: 6px; letter-spacing: 0.02em;">(${wordLabel2})</span><div class="masked-wrapper">${masks.w2}</div>`;

    // Haetaan kykyjen painikkeet ja infopainikkeet

    const posBtn = document.getElementById('ability-pos-btn');

    const randBtn = document.getElementById('ability-rand-btn');

    const typeBtn = document.getElementById('ability-type-btn');

    const infoPos = document.getElementById('info-pos-btn');

    const infoRand = document.getElementById('info-rand-btn');

    const infoType = document.getElementById('info-type-btn');



    const getCostLabel = () => {

      if (revealCount === 0) return ' (FREE)';

      if (revealCount === 1) return ' (15 pts)';

      return ' (Used)';

    };

    const costLabel = getCostLabel();



    const intensity = revealCount + 1;

    const posDesc = shifter.getPositionalDescription(intensity);

    const randDesc = shifter.getRandomDescription(intensity);

    const typeDesc = shifter.getLetterTypeDescription(intensity);



    // Выводим интуитивный статус ролла и счетчик оставшихся попыток раскрытия

    const rollStatusEl = document.getElementById('ability-roll-status');

    if (rollStatusEl) {

      const remainingReveals = Math.max(0, 2 - revealCount);

      if (remainingReveals > 0) {

        rollStatusEl.innerHTML = `✨ Letter reveals left: <span style="color: var(--accent); font-weight: 800;">${remainingReveals}</span>`;

      } else {

        rollStatusEl.innerHTML = `🔒 No reveals left for this turn`;

      }

    }



    // Настраиваем отображение кнопок с полным скрытием невыбранных вариантов

    const renderAbility = (btn, type, label, icon, desc) => {

      if (!btn) return;

      const row = btn.closest('.ability-row');

     

      // ВСЕГДА обновляем текст и цену кнопки актуальными данными текущего шага до проверки скрытия

      btn.innerHTML = `<div><strong>${icon} ${label}${costLabel}</strong></div><div style="font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 2px;">${desc}</div>`;

     

      const isNotRolled = !activeAbilities.includes(type);

     

      if (isNotRolled || btn.disabled) {

        if (row) {

          // Если мы только зашли в раунд (попыток раскрытия не было), скрываем мгновенно

          // Это гарантирует, что кнопка не «мелькнет» и не улетит из-за старых таймеров

          if (revealCount === 0) {

            row.classList.remove('burned');

            row.style.setProperty('display', 'none', 'important');

            row.style.marginBottom = '0';

          } else {

            // Плавное сгорание запускается исключительно при физическом клике игрока во время раунда

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

        }

      } else {

        if (row) {

          // Если способность выбрана для этого раунда — принудительно отображаем её сразу в flex

          row.classList.remove('burned');

          row.style.setProperty('display', 'flex', 'important');

          row.style.marginBottom = '10px';

        }

      }

    };



    renderAbility(posBtn, 'positional', 'Positional', '📍', posDesc);

    renderAbility(randBtn, 'random', 'Random', '🎲', randDesc);

    renderAbility(typeBtn, 'type', 'Letters Type', '🔤', typeDesc);



    // ДИНАМИЧЕСКОЕ ОТОБРАЖЕНИЕ УСТНОЙ ПОДСКАЗКИ (Только когда попытки раскрытия = 0)

    const oralBtn = document.getElementById('oral-hint-btn');

    if (oralBtn) {

      const remainingReveals = Math.max(0, 2 - revealCount);

     

      // Условие: режим 2 игроков AND больше нет доступных раскрытий букв

      if (game && game.players.length === 2 && remainingReveals === 0) {

        oralBtn.style.setProperty('display', 'block', 'important');

       

        oralBtn.onclick = (e) => {

          e.stopPropagation();

          const guesser = game.players[currentGuesserIndex];

         

          if (guesser.gold < 10) {

            alert('Not enough points for an oral hint!');

            return;

          }

         

          guesser.gold -= 10;

          animateGoldChange(-10);

         

          alert(`💬 Oral Hint Activated!\n\nAsk your friend to give you a single honest oral hint or association about their choice.\n\n(For example: "This is a physical object" or "I encounter this at work")`);

         

          // Удаляем кнопку из DOM/скрываем навсегда после одного использования в раунде

          oralBtn.remove();

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

    const goldBefore = guesser.gold; // Track balance before update

   

    if (isCorrect) {

      guesser.gold += FIXED_REWARD;

      animateGoldChange(FIXED_REWARD, true);

      // Умножаем на 0.6, чтобы сделать звук на 40% тише базовой громкости

      audioManager.play('win', audioManager.getVolume() * 0.6);

    } else {

      // Умножаем на 0.75, чтобы сделать звук на 25% тише базовой громкости

      audioManager.play('lose', audioManager.getVolume() * 0.75);

    }



    // 1. Получаем последнее сохраненное предложение из истории

    const lastRoundData = game.history[game.history.length - 1];

    let cleanSentence = lastRoundData.resultSentence;



    // 2. Очищаем предложение от HTML-тегов (strong, span, style), так как alert их не поддерживает

    cleanSentence = cleanSentence.replace(/<\/?[^>]+(>|$)/g, "");



    // 3. Формируем текст для всплывающего окна

    const statusIcon = isCorrect ? "🎉 CORRECT!" : "❌ WRONG!";

    const pointsEarned = isCorrect ? `${FIXED_REWARD} points` : "0 points";

    const goldChange = isCorrect ? `+${FIXED_REWARD}` : "0";

    const finalWallet = guesser.gold;



    const alertMessage =

      `${statusIcon}\n` +

      `You earned: ${pointsEarned}\n` +

      `Score: ${goldBefore} → ${finalWallet} points (${goldChange})\n\n` +

      `--- CHOICE SCHEME ---\n` +

      `${cleanSentence}\n\n` +

      `• Your guess was: "${word}"`;



    alert(alertMessage);



    // Переходим дальше

    setupNextGuesser();



  } catch (err) {

    alert("Error inside makeGuess: " + err.message);

    console.error(err);

  }

}



function showFinalScores() {

  try {

    screens.switchScreen('final');

   

// 1. Рендерим таблицу лидеров со смайликами

    const leaderboard = [...game.players].sort((a, b) => (b.gold || 0) - (a.gold || 0));

    document.getElementById('final-scores-list').innerHTML = leaderboard

      .map(p => `<li><strong>${p.emoji} ${p.name}</strong>: ${p.gold || 0} points</li>`).join('');



    if (audioManager) {

      let resultText = "Game Over! ";

      leaderboard.forEach((p, index) => {

        const emojiName = EMOJI_NAMES[p.emoji] || "";

        resultText += `Number ${index + 1}: ${emojiName} ${p.name}, ${p.gold || 0} points. `;

      });

      audioManager.speak(resultText);

    }



    // 2. Рендерим кнопки выбора игрока и одно окно истории

    const playerList = document.getElementById('history-player-list');

    const selectedFrame = document.getElementById('final-history-window');



    playerList.innerHTML = game.players.map((player, index) => `

      <button class="btn btn-small history-player-btn" data-player="${player.name}" data-index="${index}">

        ${player.emoji} ${player.name}

      </button>

    `).join('');



const renderHistoryForPlayer = (playerName, playAudio = false) => {

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



      if (playAudio && audioManager) {

        if (playerHistory.length > 0) {

          let historyText = `Choices by ${playerName}. `;

          playerHistory.forEach(h => {

            let cleanSentence = h.resultSentence.replace(/<\/?[^>]+(>|$)/g, "");

            historyText += cleanSentence + ". ";

          });

          audioManager.speak(historyText);

        } else {

          audioManager.speak(`No choices were made by ${playerName}.`);

        }

      }

    };



    const buttons = playerList.querySelectorAll('.history-player-btn');

    buttons.forEach((button, index) => {

      button.onclick = () => {

        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        renderHistoryForPlayer(button.dataset.player, true);

      };

    });



    if (buttons.length > 0) {

      buttons[0].classList.add('active');

      renderHistoryForPlayer(buttons[0].dataset.player, false);

    };

    // Логика кнопки возврата к настройкам без перезагрузки

    const backBtn = document.getElementById('back-to-setup-btn');

    if (backBtn) {

      backBtn.onclick = () => {

        if (safetyDelayedTimer) clearTimeout(safetyDelayedTimer);

        // Полностью обнуляем состояние прошлой игры

        game = null;

        currentQuestion = null;

        currentHint = "";

        shifter = null;

        responderChoice = "";

        remainingGuessers = [];

        currentGuesserIndex = null;

        revealCount = 0;



        // Перерисовываем коробочки с игроками (они остались в temporaryPlayersList)

        renderPlayerBoxes();



        // Reset safety tip text for the setup screen

        const safetyTip = document.getElementById('safety-tip-text');

        if (safetyTip) safetyTip.innerText = "Recommended for all players to read before starting.";



        // Возвращаем пользователя на экран настройки

        screens.switchScreen('setup');

      };

    }



  } catch (err) {

    alert("Error inside showFinalScores: " + err.message);

    console.error(err);

  }

}



// Simple visual feedback for gold spending/replenishment

function animateGoldChange(amount, positive = false) {

  try {

    const el = document.getElementById('gold-balance');

    if (!el) return;

    // update text

    if (game && typeof currentGuesserIndex === 'number' && game.players[currentGuesserIndex]) {

      el.innerText = `Points: ${game.players[currentGuesserIndex].gold}`;

    }

    const cls = positive ? 'gold-add' : 'gold-spend';

    el.classList.add(cls);

    setTimeout(() => el.classList.remove(cls), 900);

  } catch (e) {

    // ignore animation errors

  }

} 

