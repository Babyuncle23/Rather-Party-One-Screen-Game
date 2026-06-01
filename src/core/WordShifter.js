export class WordShifter {
  constructor(word1, word2) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    // Массивы открытых индексов для каждого слова
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
  }

  // Вычисление лимита способностей на основе средней длины слов
    getAbilitiesLimit() {
    const avgLength = Math.round((this.orig1.length + this.orig2.length) / 2);
    if (avgLength <= 4) return 1;
    if (avgLength <= 6) return 2;
    if (avgLength <= 8) return 3;
    return 4; 
    }

  // Получить текущую маску слов (например, "G**ler" и "M**solini")
  getMaskedWords() {
    const mask = (word, openedSet) => {
      return word
        .split("")
        .map((char, index) => (openedSet.has(index) || char === " " ? char : "*"))
        .join("");
    };
    return {
      w1: mask(this.orig1, this.openedIndices1),
      w2: mask(this.orig2, this.openedIndices2)
    };
  }

  // Способность 1: Открыть случайную букву (-20 баллов)
  openRandomLetter() {
    const reveal = (word, openedSet) => {
      const closedIndices = [];
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && word[i] !== " ") closedIndices.push(i);
      }
      if (closedIndices.length > 0) {
        const randIndex = closedIndices[Math.floor(Math.random() * closedIndices.length)];
        openedSet.add(randIndex);
      }
    };
    reveal(this.orig1, this.openedIndices1);
    reveal(this.orig2, this.openedIndices2);
  }

  // Способность 2: Открыть первую букву (-40 баллов)
  openFirstLetter() {
    if (this.orig1.length > 0) this.openedIndices1.add(0);
    if (this.orig2.length > 0) this.openedIndices2.add(0);
  }

  // Способность 3: Проверить букву игрока (-30 баллов)
  guessLetter(char) {
    const searchChar = char.toLowerCase();
    const revealAll = (word, openedSet) => {
      for (let i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() === searchChar) {
          openedSet.add(i);
        }
      }
    };
    revealAll(this.orig1, this.openedIndices1);
    revealAll(this.orig2, this.openedIndices2);
  }
}