import { Match } from './core/Match.js';
import { WordShifter } from './core/WordShifter.js';
import { ScreenController } from './ui/ScreenController.js';

let game = null;
let screens = null;

let currentQuestion = null;
let currentHint = "";
let shifter = null;
let responderChoice = "";

let remainingGuessers = []; 
let currentGuesserIndex = null;
let currentPotentialScore = 100;
let abilitiesUsed = 0;
let currentCardIndex = 0;

let temporaryPlayersList = [];

document.addEventListener("DOMContentLoaded", () => {
  try {
    screens = new ScreenController();
    setupInitialEventListeners();
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
    initRound();
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
    
    const btn1 = document.getElementById('hint-btn-1');
    const btn2 = document.getElementById('hint-btn-2');
    
    // Создаем копию массива подсказок, чтобы безопасно выбирать случайные
    const availableHints = [...currentQuestion.hints];
    
    // Выбираем первую случайную подсказку и вырезаем её из копии массива
    const randomIndex1 = Math.floor(Math.random() * availableHints.length);
    const hint1 = availableHints.splice(randomIndex1, 1)[0];
    
    // Выбираем вторую случайную подсказку из оставшихся вариантов
    const randomIndex2 = Math.floor(Math.random() * availableHints.length);
    const hint2 = availableHints[randomIndex2];
    
    // Назначаем текст и действия на кнопки
    btn1.innerText = hint1;
    btn2.innerText = hint2;
    
    btn1.onclick = () => selectHint(hint1);
    btn2.onclick = () => selectHint(hint2);
    
    const customInput = document.getElementById('custom-hint-input');
    customInput.value = "";
    document.getElementById('custom-hint-btn').onclick = () => {
      if (customInput.value.trim().length > 0) {
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
    currentHint = hint;
    const responder = game.players[game.getResponderIndex()];
    screens.showPassScreen(responder, startResponderPhase);
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
    
    const in1 = document.getElementById('word-input-1');
    const in2 = document.getElementById('word-input-2');
    in1.value = ""; in2.value = "";
    
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
      
      shifter = new WordShifter(w1, w2);
      choiceBlock.style.display = 'block';
      
      const finalQ = currentQuestion.text.replace("___", w1).replace("___", w2);
      document.getElementById('responder-final-question').innerText = finalQ;
      
      const opt1 = document.getElementById('opt-btn-1');
      const opt2 = document.getElementById('opt-btn-2');
      opt1.innerText = w1; opt2.innerText = w2;
      
      opt1.onclick = () => confirmResponderChoice(w1, w2, w1);
      opt2.onclick = () => confirmResponderChoice(w1, w2, w2);
    };
  } catch (err) {
    alert("Error inside startResponderPhase: " + err.message);
  }
}

function confirmResponderChoice(w1, w2, choice) {
  try {
    responderChoice = choice;
    game.saveRoundToHistory(currentQuestion.text, currentHint, w1, w2, choice);
    remainingGuessers = [game.pickerIndex, ...game.getOtherGuessersIndices()];
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
    shifter = new WordShifter(shifter.orig1, shifter.orig2); 
    currentPotentialScore = 100;
    abilitiesUsed = 0;
    
    screens.showPassScreen(game.players[currentGuesserIndex], startGuesserPhase);
  } catch (err) {
    alert("Error inside setupNextGuesser: " + err.message);
  }
}

function startGuesserPhase() {
  try {
    screens.switchScreen('guesser');
    document.getElementById('guesser-name').innerText = game.players[currentGuesserIndex].name;

        // ЛОГИКА РАСКРЫТИЯ СПРАВКИ
    const toggleRulesBtn = document.getElementById('toggle-rules-btn');
    const rulesBox = document.getElementById('rules-details-box');
    
    // По умолчанию при переходе к новому игроку скрываем справку
    rulesBox.style.display = 'none'; 
    
    toggleRulesBtn.onclick = () => {
      if (rulesBox.style.display === 'none') {
        rulesBox.style.display = 'block';
      } else {
        rulesBox.style.display = 'none';
      }
    };
    
    updateGuesserUI();
    buildVirtualKeyboard();
    
    document.getElementById('ability-rand-btn').onclick = () => useAbility('rand', 20);
    document.getElementById('ability-first-btn').onclick = () => useAbility('first', 40);
    
    document.getElementById('guess-word-1').onclick = () => makeGuess(shifter.orig1);
    document.getElementById('guess-word-2').onclick = () => makeGuess(shifter.orig2);
  } catch (err) {
    alert("Error inside startGuesserPhase: " + err.message);
  }
}

function buildVirtualKeyboard() {
  const keyboardContainer = document.getElementById('virtual-keyboard');
  keyboardContainer.innerHTML = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  // Находим аудиоэлемент клика
  const clickSound = document.getElementById('sound-click');

  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = "key-btn";
    btn.innerHTML = `<span class="key-letter">${letter}</span><span class="key-cost">(-30 pts)</span>`;
    
    btn.onclick = () => {
      btn.disabled = true; 
      
      // ВОСПРОИЗВЕДЕНИЕ КЛИКА: сбрасываем время в 0, чтобы звук успевал играть при быстрых тапах
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio play blocked by browser:", e));
      }

      useAbility('letter', 30, letter);
    };
    keyboardContainer.appendChild(btn);
  });
}

function useAbility(type, cost, param = null) {
  if (abilitiesUsed >= shifter.getAbilitiesLimit()) {
    alert("Abilities limit reached!");
    return;
  }
  if (type === 'rand') shifter.openRandomLetter();
  if (type === 'first') shifter.openFirstLetter();
  if (type === 'letter') shifter.guessLetter(param);
  abilitiesUsed++;
  currentPotentialScore = Math.max(0, currentPotentialScore - cost);
  updateGuesserUI();
}

function updateGuesserUI() {
  const masks = shifter.getMaskedWords();
  const displayQ = currentQuestion.text.replace("___", masks.w1).replace("___", masks.w2);
  
  document.getElementById('guesser-question-display').innerText = displayQ;
  
  // ИСПРАВЛЕНО: Теперь везде выводится лаконичное "pts"
  document.getElementById('potential-score').innerText = `Reward: +${currentPotentialScore} pts`;
  document.getElementById('abilities-count').innerText = `Abilities used: ${abilitiesUsed} / ${shifter.getAbilitiesLimit()}`;
  
  document.getElementById('guess-word-1').innerText = masks.w1;
  document.getElementById('guess-word-2').innerText = masks.w2;
}

function makeGuess(word) {
  const guesser = game.players[currentGuesserIndex];
  
  // Находим элементы звуков выигрыша и проигрыша
  const winSound = document.getElementById('sound-win');
  const loseSound = document.getElementById('sound-lose');

  if (word === responderChoice) {
    guesser.score += currentPotentialScore;
    
    // ВКЛЮЧАЕМ ЗВУК ПОБЕДЫ
    if (winSound) {
      winSound.currentTime = 0;
      winSound.play().catch(e => console.log(e));
    }
    
    alert(`🎉 CORRECT!\nYou scored ${currentPotentialScore} points.`);
  } else {
    // ВКЛЮЧАЕМ ЗВУК ПРОИГРЫША
    if (loseSound) {
      loseSound.currentTime = 0;
      loseSound.play().catch(e => console.log(e));
    }

    alert(`❌ WRONG!\nThe answer was: ${responderChoice}`);
  }
  setupNextGuesser();
}

function renderCarouselCard() {
  const cardData = game.history[currentCardIndex];
  const container = document.getElementById('carousel-card');
  const indexIndicator = document.getElementById('carousel-index');
  
  indexIndicator.innerText = `${currentCardIndex + 1} / ${game.history.length}`;
  
  container.innerHTML = `
    <h4 style="margin:0; color:#6246ea;">ROUND ${cardData.round}</h4>
    <p><strong>Context Picker:</strong> ${cardData.picker}</p>
    <p><strong>Prompt:</strong> "<em>${cardData.hint}</em>"</p>
    <p><strong>Words from ${cardData.responder}:</strong> ${cardData.words[0]} vs ${cardData.words[1]}</p>
    <p><strong>Decision:</strong> <span style="color:#00ffb3; font-weight:bold;">${cardData.chosenByResponder}</span></p>
  `;
}