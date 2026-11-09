import { getQuestionsDB } from '../i18n/I18nManager.js';
import { GAME_CONFIG } from './GameConfig.js';

export class Match {
  constructor(playerNames, totalRounds) {
    this.players = playerNames.map((data, index) => {
      const playerName = typeof data === 'string' ? data : data.name;
      const playerEmoji = typeof data === 'string' ? '' : data.emoji;
      return { id: index + 1, name: playerName.toUpperCase(), emoji: playerEmoji, gold: GAME_CONFIG.START_GOLD, lastGuessCorrect: true };
    });
    this.totalRounds = totalRounds;
    this.currentRound = 1;
    this.pickerIndex = 0; 
    this.history = [];
    
    // --- ЛОГИКА КОМБО ---
    this.comboUsedThisGame = false; 
    this.queuedComboWord = null;
    this.queuedComboCategory = null;
    this.comboDatabase = getQuestionsDB().filter(q => q.isCombo);
    
    this.shuffledQuestions = [];
    this.resetAndShuffleQuestions();
  }

  resetAndShuffleQuestions() {
    this.shuffledQuestions = getQuestionsDB().filter(q => !q.isCombo);
    for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [this.shuffledQuestions[j], this.shuffledQuestions[i]];
    }
  }

  setQueuedCombo(chosenWord, category) {
    if (this.comboUsedThisGame) return;
    // Комбо не ставим в очередь на первом раунде: никто не видел прошлый ответ кроме Responder'а
    if (this.currentRound < 2) return;
    if (Math.random() > 0.6) return;

    this.queuedComboWord = chosenWord.toUpperCase();
    this.queuedComboCategory = category;
  }

  getRandomQuestion() {
    if (this.queuedComboWord) { 
      const matchingCombos = this.comboDatabase.filter(q => {
        if (!q.triggerCategory) return false;
        if (Array.isArray(q.triggerCategory)) {
          return q.triggerCategory.includes(this.queuedComboCategory);
        }
        return q.triggerCategory === this.queuedComboCategory;
      });
      
      const comboPool = matchingCombos.length > 0 ? matchingCombos : (this.comboDatabase || []);
      if (comboPool.length === 0) {
        // База комбо пуста — сбрасываем очередь и идём за обычным вопросом
        this.queuedComboWord = null;
        this.queuedComboCategory = null;
        if (this.shuffledQuestions.length === 0) {
          this.resetAndShuffleQuestions();
        }
        return this.shuffledQuestions.pop();
      }

      const comboQ = structuredClone(comboPool[Math.floor(Math.random() * comboPool.length)]);
      
      comboQ.text = comboQ.text.replace("[PREV_CHOICE]", this.queuedComboWord);
      
      // ВОТ ОНО! Сохраняем чистое слово для генератора графики
      comboQ.comboWord = this.queuedComboWord; 
      
      this.comboUsedThisGame = true; 
      this.queuedComboWord = null;
      this.queuedComboCategory = null; 
      return comboQ;
    }
    
    this.queuedComboWord = null; 
    this.queuedComboCategory = null;

    if (this.shuffledQuestions.length === 0) {
      this.resetAndShuffleQuestions();
    }
    return this.shuffledQuestions.pop();
  }

  getResponderIndex() {
    return (this.pickerIndex + 1) % this.players.length;
  }

  getOtherGuessersIndices() {
    const indices = [];
    for (let i = 0; i < this.players.length; i++) {
      if (i !== this.pickerIndex && i !== this.getResponderIndex()) {
        indices.push(i);
      }
    }
    return indices;
  }

  saveRoundToHistory(questionText, hintText, input1, input2, finalChoice) {
    this.history.push({
      round: this.currentRound,
      picker: this.players[this.pickerIndex].name,
      responder: this.players[this.getResponderIndex()].name,
      question: questionText,
      hint: hintText,
      words: [input1.toUpperCase(), input2.toUpperCase()],
      chosenByResponder: finalChoice.toUpperCase(),
      resultSentence: ""
    });
  }

  nextTurn() {
    this.pickerIndex = (this.pickerIndex + 1) % this.players.length;
    if (this.pickerIndex === 0) {
      this.currentRound++;
    }
  }

  isGameOver() {
    return this.currentRound > this.totalRounds;
  }

  serialize() {
    return {
      players: this.players,
      totalRounds: this.totalRounds,
      currentRound: this.currentRound,
      pickerIndex: this.pickerIndex,
      history: this.history,
      comboUsedThisGame: this.comboUsedThisGame,
      queuedComboWord: this.queuedComboWord,
      queuedComboCategory: this.queuedComboCategory,
      shuffledQuestions: this.shuffledQuestions
    };
  }

  static deserialize(data) {
    const match = Object.create(Match.prototype);
    Object.assign(match, {
      players: [],
      totalRounds: 1,
      currentRound: 1,
      pickerIndex: 0,
      history: [],
      comboUsedThisGame: false,
      queuedComboWord: null,
      queuedComboCategory: null,
      shuffledQuestions: []
    }, data);
    match.comboDatabase = getQuestionsDB().filter(q => q.isCombo);
    return match;
  }
}