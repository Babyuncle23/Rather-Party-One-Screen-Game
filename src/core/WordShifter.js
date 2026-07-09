export class WordShifter {
  constructor(word1, word2, isNerfed = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed; 
    this.isLengthRevealed = false; 

    // Автоматически открываем знаки препинания со старта
    const revealPunctuation = (word, openedSet) => {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === '-' || word[i] === "'") openedSet.add(i);
      }
    };
    revealPunctuation(this.orig1, this.openedIndices1);
    revealPunctuation(this.orig2, this.openedIndices2);
  }

  getTotalLength() { return this.orig1.length + this.orig2.length; }
  
  // Для UI оставляем разделение только по пробелам, чтобы "T-SHIRT" считалось 1 словом визуально
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
          if (this.isLengthRevealed) {
            html += '<span class="letter-dash"></span>';
            inGap = false;
          } else {
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
    this._applyRevealLogic(0.40, true, isCatchUp); 
  }

  revealExtraRandom() {
    this._applyRevealLogic(0.40, false, false); 
  }

  revealLength() {
    this.isLengthRevealed = true;
    
    // Открываем первую букву каждого слова
    const openFirst = (wordStr, openedSet) => {
      let isNewWord = true;
      for (let i = 0; i < wordStr.length; i++) {
        let char = wordStr[i];
        if (char === ' ' || char === '-' || char === "'") {
          isNewWord = true;
        } else {
          if (isNewWord) {
            openedSet.add(i);
            isNewWord = false;
          }
        }
      }
    };
    
    openFirst(this.orig1, this.openedIndices1);
    openFirst(this.orig2, this.openedIndices2);
  }

  _applyRevealLogic(basePercentage, isFirstStep, isCatchUp) {
    const processWord = (wordStr, openedSet) => {
      // Разбиваем строку на слова, разделяя по пробелам, тире и апострофам для честной логики букв
      let words = [];
      let currentWord = { start: -1, text: "" };
      
      for (let i = 0; i < wordStr.length; i++) {
        let char = wordStr[i];
        if (char === ' ' || char === '-' || char === "'") {
          if (currentWord.text.length > 0) {
            words.push(currentWord);
            currentWord = { start: -1, text: "" };
          }
        } else {
          if (currentWord.start === -1) currentWord.start = i;
          currentWord.text += char;
        }
      }
      if (currentWord.text.length > 0) words.push(currentWord);

      // Применяем логику к каждому отдельному слову
      words.forEach(w => {
        let len = w.text.length;
        let pool = [];
        let localPercentage = basePercentage;

        if (isFirstStep && isCatchUp) localPercentage += 0.10;

        const endsWithIng = w.text.toUpperCase().endsWith("ING");
        const ingStartIdx = w.start + len - 3;

        // Собираем доступный пул индексов
        for (let i = 0; i < len; i++) {
          let globalIdx = w.start + i;

          if (openedSet.has(globalIdx)) continue;
          if (i === 0) continue; // ЖЕЛЕЗНО прячем первую букву слова
          if (isFirstStep && endsWithIng && globalIdx >= ingStartIdx) continue;

          pool.push(globalIdx);
        }

        if (pool.length === 0) return; 

        let toReveal = Math.ceil(pool.length * localPercentage);
        toReveal = Math.min(pool.length, Math.max(1, toReveal));

        for (let k = 0; k < toReveal && pool.length > 0; k++) {
          let rand = Math.floor(Math.random() * pool.length);
          openedSet.add(pool[rand]);
          pool.splice(rand, 1);
        }
      });
    };

    processWord(this.orig1, this.openedIndices1);
    processWord(this.orig2, this.openedIndices2);
  }
}
