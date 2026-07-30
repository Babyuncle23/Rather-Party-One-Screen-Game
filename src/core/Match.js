import { questionsDatabase } from '../data/questions.js';

export class Match {
  constructor(playerNames, totalRounds) {
    this.players = playerNames.map((data, index) => {
      const playerName = typeof data === 'string' ? data : data.name;
      const playerEmoji = typeof data === 'string' ? '' : data.emoji;
      return { id: index + 1, name: playerName.toUpperCase(), emoji: playerEmoji, gold: 50, lastGuessCorrect: true };
    });
    this.totalRounds = totalRounds;
    this.currentRound = 1;
    this.pickerIndex = 0; 
    this.history = [];
    
    // --- ЛОГИКА КОМБО ---
    this.comboUsedThisGame = false; 
    this.queuedComboWord = null;
    this.queuedComboCategory = null;
    this.comboDatabase = questionsDatabase.filter(q => q.isCombo);
    
    this.shuffledQuestions = [];
    this.resetAndShuffleQuestions();
  }

  resetAndShuffleQuestions() {
    this.shuffledQuestions = questionsDatabase.filter(q => !q.isCombo);
    for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [this.shuffledQuestions[j], this.shuffledQuestions[i]];
    }
  }

  setQueuedCombo(chosenWord, category) {
    if (this.comboUsedThisGame) return;
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
      
      let comboQ;
      if (matchingCombos.length > 0) {
        comboQ = JSON.parse(JSON.stringify(matchingCombos[Math.floor(Math.random() * matchingCombos.length)]));
      } else {
        comboQ = JSON.parse(JSON.stringify(this.comboDatabase[Math.floor(Math.random() * this.comboDatabase.length)]));
      }
      
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
}