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
    
    screens.showPassScreen(
      game.players[currentGuesserIndex],
      startGuesserPhase,
      "Only this player should look. Do not show it to anyone else."
    );
  } catch (err) {
    alert("Error inside setupNextGuesser: " + err.message);
  }
}

// 1. Обновляем старт фазы угадывания
function startGuesserPhase() {
  try {
    screens.switchScreen('guesser');
    document.getElementById('guesser-name').innerText = game.players[currentGuesserIndex].name;
    
    updateGuesserUI();
    
    // Включаем обработчик ручного ввода буквы
    setupManualLetterInput();
    
    document.getElementById('ability-rand-btn').onclick = () => useAbility('rand', 20);
    document.getElementById('ability-first-btn').onclick = () => useAbility('first', 40);
    
    document.getElementById('guess-word-1').onclick = () => makeGuess(shifter.orig1);
    document.getElementById('guess-word-2').onclick = () => makeGuess(shifter.orig2);
  } catch (err) {
    alert("Error inside startGuesserPhase: " + err.message);
  }
}

function setupManualLetterInput() {
  const customLetterInput = document.getElementById('custom-letter-input');
  const checkBtn = document.getElementById('ability-letter-btn');
  const clickSound = document.getElementById('sound-click');
  
  customLetterInput.value = ""; // Очищаем поле при входе

  checkBtn.onclick = () => {
    const letter = customLetterInput.value.trim().toUpperCase();
    
    // Валидация: проверяем, что введена ровно одна английская буква
    if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
      alert("Please enter a single letter (A-Z)!");
      return;
    }
    
    // Звук клика
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(e => {});
    }

    // Запускаем стандартную способность проверки буквы за 30 баллов
    useAbility('letter', 30, letter);
    
    // Очищаем инпут для следующей проверки
    customLetterInput.value = "";
  };
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
  
  // ВОТ ЭТА СТРОКА: Записываем промпт раунда на экран угадывания капсом
  document.getElementById('guesser-displayed-hint').innerText = currentHint.toUpperCase();

  document.getElementById('guesser-question-display').innerText = displayQ;
  document.getElementById('potential-score').innerText = `Reward: +${currentPotentialScore} pts`;
  document.getElementById('abilities-count').innerText = `Abilities used: ${abilitiesUsed} / ${shifter.getAbilitiesLimit()}`;
  
  document.getElementById('guess-word-1').innerText = masks.w1;
  document.getElementById('guess-word-2').innerText = masks.w2;
}

function makeGuess(word) {
  try {
    const guesser = game.players[currentGuesserIndex];
    
    const winSound = document.getElementById('sound-win');
    const loseSound = document.getElementById('sound-lose');

    const isCorrect = (word === responderChoice);
    
    if (isCorrect) {
      guesser.score += currentPotentialScore;
      if (winSound) {
        winSound.currentTime = 0;
        winSound.play().catch(e => console.log(e));
      }
    } else {
      if (loseSound) {
        loseSound.currentTime = 0;
        loseSound.play().catch(e => console.log(e));
      }
    }

    // 1. Получаем последнее сохраненное предложение из истории
    const lastRoundData = game.history[game.history.length - 1];
    let cleanSentence = lastRoundData.resultSentence;

    // 2. Очищаем предложение от HTML-тегов (strong, span, style), так как alert их не поддерживает
    cleanSentence = cleanSentence.replace(/<\/?[^>]+(>|$)/g, "");

    // 3. Формируем текст для всплывающего окна
    const statusIcon = isCorrect ? "🎉 CORRECT!" : "❌ WRONG!";
    const pointsEarned = isCorrect ? `${currentPotentialScore} pts` : "0 pts";

    const alertMessage = 
      `${statusIcon}\n` +
      `You earned: ${pointsEarned}\n\n` +
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
    const leaderboard = [...game.players].sort((a, b) => b.score - a.score);
    document.getElementById('final-scores-list').innerHTML = leaderboard
      .map(p => `<li><strong>${p.name}</strong>: ${p.score} pts</li>`).join('');
    
    // 2. Рендерим историю в виде чистого вертикального списка карточек
    const historyContainer = document.getElementById('final-history-list');
    historyContainer.innerHTML = game.history.map(h => `
      <div class="history-card" style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 8px 0; color: #6246ea; font-size: 14px;">ROUND ${h.round}</h4>
        <p style="margin: 4px 0; font-size: 14px; color: #a0a0b2;">
          Context set by ${h.picker} via prompt: <em>"${h.hint.toUpperCase()}"</em>
        </p>
        <p style="margin: 10px 0 0 0; font-size: 16px; line-height: 1.4; border-top: 1px dashed #3e3e4a; padding-top: 10px;">
          ${h.resultSentence}
        </p>
      </div>
    `).join('');

  } catch (err) {
    alert("Error inside showFinalScores: " + err.message);
    console.error(err);
  }
}