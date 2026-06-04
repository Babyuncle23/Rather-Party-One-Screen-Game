import { Match } from './core/Match.js';
import { WordShifter } from './core/WordShifter.js';
import { ScreenController } from './ui/ScreenController.js';
import { AudioManager } from './audio/AudioManager.js';
import { AUTOCOMPLETE_WORDS } from './data/autocompleteWords.js';
import { SIMPLE_COLORS, SIMPLE_MATERIALS, SIMPLE_MOODS, SIMPLE_ERAS, SIMPLE_COUNTRIES, SIMPLE_CITIES, SIMPLE_FOODS } from './data/nerfWords.js';
let game = null;
let screens = null;
let audioManager = null;

let currentQuestion = null;
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

let temporaryPlayersList = [];

document.addEventListener("DOMContentLoaded", () => {
  try {
    audioManager = new AudioManager();
    screens = new ScreenController();
    screens.setupAudioControl(audioManager);
    setupInitialEventListeners();
    setupHelpPanel();
    setupGlobalButtonSounds();
    setupCustomHintAutocomplete();

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

function setupCustomHintAutocomplete() {
  try {
    const customInput = document.getElementById('custom-hint-input');
    if (!customInput) return;

    // Create a wrapper for proper positioning
    const wrapper = document.createElement('div');
    wrapper.className = 'autocomplete-wrapper';
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.marginBottom = '14px';

    // Insert wrapper right after input
    customInput.parentNode.insertBefore(wrapper, customInput.nextSibling);
    
    // Move input into wrapper
    wrapper.appendChild(customInput);

    // Create suggestion container (positioned absolutely below input)
    const suggestions = document.createElement('div');
    suggestions.className = 'autocomplete-suggestions';
    suggestions.style.position = 'absolute';
    suggestions.style.top = '100%';
    suggestions.style.left = '0';
    suggestions.style.right = '0';
    suggestions.style.marginTop = '4px';
    suggestions.style.display = 'none';
    suggestions.style.background = 'rgba(20, 19, 29, 0.96)';
    suggestions.style.border = '1px solid rgba(140, 108, 255, 0.24)';
    suggestions.style.borderRadius = '14px';
    suggestions.style.padding = '8px 0';
    suggestions.style.maxHeight = '200px';
    suggestions.style.overflowY = 'auto';
    suggestions.style.zIndex = '1000';
    suggestions.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5)';

    wrapper.appendChild(suggestions);

    // Inject comprehensive styles for suggestion items
    const style = document.createElement('style');
    style.textContent = `
      .autocomplete-item {
        padding: 10px 14px;
        cursor: pointer;
        color: var(--muted);
        font-size: 14px;
        transition: background 0.15s ease, color 0.15s ease;
        display: flex;
        align-items: center;
      }
      .autocomplete-item:hover {
        background: rgba(140, 108, 255, 0.18);
        color: var(--text);
      }
      .autocomplete-item.selected {
        background: rgba(140, 108, 255, 0.28);
        color: var(--accent);
        font-weight: 600;
      }
      .autocomplete-item-icon {
        font-size: 12px;
        margin-right: 8px;
        opacity: 0.5;
      }
      .autocomplete-item.selected .autocomplete-item-icon {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    let selectedIndex = -1;

    function insertSuggestion(word) {
      const val = customInput.value;
      const parts = val.split(/\s+/);
      if (parts.length === 0) {
        customInput.value = word + ' ';
      } else {
        parts.pop();
        const newVal = (parts.concat([word])).filter(Boolean).join(' ') + ' ';
        customInput.value = newVal;
      }
      customInput.focus();
      showSuggestionsFor('');
    }

    function showSuggestionsFor(prefix) {
      const p = (prefix || '').toLowerCase().trim();
      if (!p) {
        suggestions.style.display = 'none';
        suggestions.innerHTML = '';
        selectedIndex = -1;
        return;
      }

      const matches = AUTOCOMPLETE_WORDS.filter(w => w.toLowerCase().startsWith(p)).slice(0, 10);
      if (matches.length === 0) {
        suggestions.style.display = 'none';
        suggestions.innerHTML = '';
        selectedIndex = -1;
        return;
      }

      suggestions.innerHTML = '';
      selectedIndex = -1;

      matches.forEach((m, idx) => {
        const it = document.createElement('div');
        it.className = 'autocomplete-item';
        it.dataset.index = idx;
        it.innerHTML = `<span class="autocomplete-item-icon">✓</span>${m}`;
        it.onclick = () => {
          insertSuggestion(m);
        };
        suggestions.appendChild(it);
      });
      suggestions.style.display = 'block';
    }

    function updateSelectedClass() {
      const items = suggestions.querySelectorAll('.autocomplete-item');
      items.forEach((item, idx) => {
        if (idx === selectedIndex) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
    }

    customInput.addEventListener('input', (e) => {
      const val = e.target.value;
      const lastToken = (val.split(/\s+/).pop() || '').replace(/[^\w-]/g, '');
      showSuggestionsFor(lastToken);
      selectedIndex = -1;
    });

    customInput.addEventListener('keydown', (e) => {
      const items = suggestions.querySelectorAll('.autocomplete-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelectedClass();
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        if (selectedIndex >= 0) {
          updateSelectedClass();
          items[selectedIndex].scrollIntoView({ block: 'nearest' });
        } else {
          suggestions.querySelectorAll('.autocomplete-item').forEach(it => it.classList.remove('selected'));
        }
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const word = items[selectedIndex].textContent.replace('✓', '').trim();
        insertSuggestion(word);
      } else if (e.key === 'Escape') {
        suggestions.style.display = 'none';
        selectedIndex = -1;
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        suggestions.style.display = 'none';
        selectedIndex = -1;
      }
    });
  } catch (err) {
    console.warn('Autocomplete init failed', err);
  }
}

function setupInitialEventListeners() {
  const addPlayerBtn = document.getElementById('add-player-btn');
  const singleInput = document.getElementById('single-player-input');
  const startGameBtn = document.getElementById('start-game-btn');

  addPlayerBtn.onclick = () => {
    const name = singleInput.value.trim();
    if (name.length > 0) {
      if (temporaryPlayersList.includes(name.toUpperCase())) {
        alert("This name is already taken!");
        return;
      }
      temporaryPlayersList.push(name.toUpperCase());
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
    screens.showPassScreen(
      game.players[game.pickerIndex],
      initRound,
      "This is your turn only. Read the question and choose a prompt."
    );
  };
}

function renderPlayerBoxes() {
  const container = document.getElementById('players-boxes-container');
  container.innerHTML = "";
  temporaryPlayersList.forEach((name, index) => {
    const box = document.createElement('div');
    box.className = "player-box";
    box.innerHTML = `<span>${name}</span><button class="delete-box-btn">✕</button>`;
    box.querySelector('.delete-box-btn').onclick = () => {
      temporaryPlayersList.splice(index, 1);
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

/**
 * Add click sound to all buttons globally
 */
function setupGlobalButtonSounds() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (button) {
      audioManager.play('click');
    }
  }, true);
}

function updateHelpTargetText() {
  const helpResponderName = document.getElementById('help-responder-name');
  if (!helpResponderName) return;

  if (game && game.players.length === 2) {
    helpResponderName.innerText = game.players[game.getResponderIndex()].name;
  } else if (game && game.players.length > 2) {
    helpResponderName.innerText = 'the next player in order';
  } else if (temporaryPlayersList.length === 2) {
    helpResponderName.innerText = temporaryPlayersList[1] || 'the other player';
  } else {
    helpResponderName.innerText = 'the next player';
  }
}

function initRound() {
  try {
    currentQuestion = game.getRandomQuestion();
    if (!currentQuestion || !currentQuestion.hints || currentQuestion.hints.length < 2) {
      throw new Error("Invalid question structure in database! Check hints array.");
    }

    const picker = game.players[game.pickerIndex];
    screens.switchScreen('picker');
    
    document.getElementById('picker-name').innerText = picker.name;
    document.getElementById('responder-target-name').innerText = game.players[game.getResponderIndex()].name;
    document.getElementById('secret-question-text').innerText = currentQuestion.text;
    updateHelpTargetText();

    // Настройка кнопки реролла вопроса
    const rerollBtn = document.getElementById('reroll-question-btn');
    if (rerollBtn) {
      rerollBtn.style.display = 'block'; // Показываем кнопку в начале раунда
      rerollBtn.onclick = () => {
        // Возвращаем старый вопрос обратно в пул (чтобы не пропадал навсегда) и берем новый
        game.shuffledQuestions.unshift(currentQuestion);
        currentQuestion = game.getRandomQuestion();
        
        // Обновляем текст вопроса на экране
        document.getElementById('secret-question-text').innerText = currentQuestion.text;
        
        // Пересчитываем и обновляем кнопки подсказок для нового вопроса
        updatePickerHints();
        
        // Скрываем кнопку, так как лимит на раунд исчерпан
        rerollBtn.style.display = 'none';
      };
    }
    
    const btn1 = document.getElementById('hint-btn-1');
    const btn2 = document.getElementById('hint-btn-2');
    
    // Выносим генерацию подсказок в изолированную функцию, чтобы переиспользовать при реролле
    const updatePickerHints = () => {
      const availableHints = [...currentQuestion.hints];
      const randomIndex1 = Math.floor(Math.random() * availableHints.length);
      const hint1 = availableHints.splice(randomIndex1, 1)[0];
      
      const randomIndex2 = Math.floor(Math.random() * availableHints.length);
      const hint2 = availableHints[randomIndex2];
      
      // Извлекаем текст для отображения на кнопках, если подсказка является сложным объектом
      btn1.innerText = typeof hint1 === 'object' ? hint1.text : hint1;
      btn2.innerText = typeof hint2 === 'object' ? hint2.text : hint2;
      
      // Стандартные кнопки сбрасывают флаг кастомного промпта
      btn1.onclick = () => { isCustomHintActive = false; selectHint(hint1); };
      btn2.onclick = () => { isCustomHintActive = false; selectHint(hint2); };
    };


    // Первичный вызов при старте хода
    updatePickerHints();
    
    const customInput = document.getElementById('custom-hint-input');
    customInput.value = "";
    document.getElementById('custom-hint-btn').onclick = () => {
      if (customInput.value.trim().length > 0) {
        isCustomHintActive = true; // Игрок написал свою подсказку, включаем защиту
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
    currentHint = typeof hint === 'object' ? hint.text : hint;
    const responder = game.players[game.getResponderIndex()];
    screens.showPassScreen(
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
    
    document.getElementById('responder-name').innerText = responder.name;
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


      
      const finalQ = currentQuestion.text.replace("___", w1).replace("___", w2);
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
    
    // Генерируем красивую грамматическую строку по шаблону
    const formattedResultString = currentQuestion.resultTemplate
      .replace("{name}", `<strong>${responder.name}</strong>`)
      .replace("{winner}", `<span style="color: #00ffb3; font-weight: bold;">${choice}</span>`)
      .replace("{loser}", `<span style="color: #ff4a4a; font-weight: bold;">${loserWord}</span>`);

    // Сохраняем это предложение в историю раунда
    game.saveRoundToHistory(currentQuestion.text, currentHint, w1, w2, choice);
    
    // Дописываем сгенерированную строку прямо в объект последнего раунда истории
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
        screens.showPassScreen(game.players[game.pickerIndex], initRound);
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

    screens.showPassScreen(
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

        // Логика устной подсказки для режима 2 игроков
    const oralBtn = document.getElementById('oral-hint-btn');
    if (oralBtn) {
      if (game && game.players.length === 2) {
        oralBtn.style.display = 'block';
        
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
          
          oralBtn.style.display = 'none';
          updateGuesserUI();
        };
      } else {
        oralBtn.style.display = 'none';
      }
    }

    screens.switchScreen('guesser');
    
    const nameEl = document.getElementById('guesser-name');
    if (nameEl && game && typeof currentGuesserIndex === 'number') {
      nameEl.innerText = game.players[currentGuesserIndex].name;
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
    
    const displayStaticQuestion = currentQuestion.text.replace(/___/g, "______");
    
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
    
    // 1. Рендерим таблицу лидеров
    const leaderboard = [...game.players].sort((a, b) => (b.gold || 0) - (a.gold || 0));
    document.getElementById('final-scores-list').innerHTML = leaderboard
      .map(p => `<li><strong>${p.name}</strong>: ${p.gold || 0} points</li>`).join('');

    // 2. Рендерим кнопки выбора игрока и одно окно истории
    const playerList = document.getElementById('history-player-list');
    const selectedFrame = document.getElementById('final-history-window');

    playerList.innerHTML = game.players.map((player, index) => `
      <button class="btn btn-small history-player-btn" data-player="${player.name}" data-index="${index}">
        ${player.name}
      </button>
    `).join('');

    const renderHistoryForPlayer = (playerName) => {
      const rows = game.history
        .filter((h) => h.responder === playerName)
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
    buttons.forEach((button, index) => {
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

    // Логика кнопки возврата к настройкам без перезагрузки
    const backBtn = document.getElementById('back-to-setup-btn');
    if (backBtn) {
      backBtn.onclick = () => {
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