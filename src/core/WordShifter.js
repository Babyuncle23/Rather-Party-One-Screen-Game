export class WordShifter {
  constructor(word1, word2, isNerfed = false, isMultiWord = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed; 
    this.isMultiWord = isMultiWord;
    this.isLengthRevealed = false; // Флаг для разделения черточек
  }

  getTotalLength() { return this.orig1.length + this.orig2.length; }
  getWordCount1() { return this.orig1.split(/\s+/).filter(Boolean).length; }
  getWordCount2() { return this.orig2.split(/\s+/).filter(Boolean).length; }

  getMaskedWords() {
    const maskToHtml = (word, openedSet) => {
      let html = "";
      let wordIndex = 0; 
      let inGap = false;
      
      html += `<span class="word-group word-color-${wordIndex % 2}">`;
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        
        if (char === " ") {
          wordIndex++;
          html += `</span><span class="word-group word-color-${wordIndex % 2}">`;
          inGap = false;
        } else if (openedSet.has(i)) {
          html += `<span class="revealed-char">${char}</span>`;
          inGap = false;
        } else {
          // Если куплено раскрытие длины — выводим отдельную черточку для каждой буквы
          if (this.isLengthRevealed) {
            html += '<span class="letter-dash"></span>';
            inGap = false; // Сбрасываем, чтобы черточки не слипались
          } else {
            // Иначе объединяем скрытые буквы в один пульсирующий прямоугольник
            if (!inGap) {
              html += '<span class="letter-gap"></span>';
              inGap = true;
            }
          }
        }
      }
      
      html += '</span>';
      return html.replace(/<span class="word-group word-color-\d+"><\/span>/g, '');
    };

    return {
      w1: maskToHtml(this.orig1, this.openedIndices1),
      w2: maskToHtml(this.orig2, this.openedIndices2)
    };
  }

  autoReveal(isCatchUp = false) {
    // 1. Позиционное открытие первой буквы (если слово сложное или это фраза)
    if (!this.isNerfed || this.isMultiWord) {
      const revealFirst = (word, openedSet) => {
        if (word.length > 0 && word[0] !== ' ') openedSet.add(0);
        if (this.isMultiWord) {
          for (let i = 1; i < word.length; i++) {
            if (word[i - 1] === " " && word[i] !== " ") openedSet.add(i);
          }
        }
      };
      revealFirst(this.orig1, this.openedIndices1);
      revealFirst(this.orig2, this.openedIndices2);
    }

    // 2. Случайное открытие (ЗАДЕБАФАНО НА ~25%)
    let percentage = 0.26; // Было 0.35
    if (this.getTotalLength() > 8) percentage = 0.30; // Было 0.40
    
    // Если игрок ошибся в прошлом раунде, даем ему +15% к буквам (Catch-up)
    if (isCatchUp) percentage += 0.15; // Было 0.20

    this._revealRandomInternal(percentage, true);
  }

  revealExtraRandom() {
    // ЗАДЕБАФАНО НА 25% (Было 0.40)
    this._revealRandomInternal(0.30, false);
  }

  revealLength() {
    this.isLengthRevealed = true;
  }

  _revealRandomInternal(percentage, isFirstStep) {
    const collectClosed = (word, openedSet) => {
      const arr = [];
      const endsWithIng = word.toUpperCase().endsWith("ING");
      const ingStartIdx = word.length - 3;

      for (let i = 0; i < word.length; i++) {
        if (isFirstStep && endsWithIng && i >= ingStartIdx) continue;
        if (!openedSet.has(i) && word[i] !== " ") arr.push(i);
      }
      if (arr.length === 0) {
        for (let i = 0; i < word.length; i++) {
          if (!openedSet.has(i) && word[i] !== " ") arr.push(i);
        }
      }
      return arr;
    };

    const closed1 = collectClosed(this.orig1, this.openedIndices1);
    const closed2 = collectClosed(this.orig2, this.openedIndices2);
    const totalClosed = closed1.length + closed2.length;
    if (totalClosed === 0) return;

    let totalToReveal = Math.max(1, Math.ceil(totalClosed * percentage));
    // Снижен минимальный хардкап с 3 до 2, чтобы нерф процентов корректно работал для средних слов
    if (isFirstStep && totalClosed >= 8) totalToReveal = Math.max(2, totalToReveal); 
    totalToReveal = Math.min(totalClosed, totalToReveal);

    let toReveal1 = Math.round(totalToReveal * (closed1.length / totalClosed));
    let toReveal2 = totalToReveal - toReveal1;
    if (closed1.length === 0) { toReveal1 = 0; toReveal2 = totalToReveal; }
    if (closed2.length === 0) { toReveal2 = 0; toReveal1 = totalToReveal; }

    const pickRandomFrom = (arr, count, openedSet) => {
      const pool = arr.slice();
      for (let i = 0; i < count && pool.length > 0; i++) {
        const rand = Math.floor(Math.random() * pool.length);
        openedSet.add(pool[rand]);
        pool.splice(rand, 1);
      }
    };

    pickRandomFrom(closed1, toReveal1, this.openedIndices1);
    pickRandomFrom(closed2, toReveal2, this.openedIndices2);
  }
}