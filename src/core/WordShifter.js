export class WordShifter {
  constructor(word1, word2, isNerfed = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed; // Флаг ослабления способностей
  }

  getTotalLength() {
    return this.orig1.length + this.orig2.length;
  }

  getMaskedWords() {
    const mask = (word, openedSet) => {
      return word
        .split("")
        .map((char, index) => (openedSet.has(index) || char === " " ? char : "•"))
        .join("");
    };
    return {
      w1: mask(this.orig1, this.openedIndices1),
      w2: mask(this.orig2, this.openedIndices2)
    };
  }

  // Reveal Type 1: Positional (теперь слабее и учитывает штраф nerf)
  revealPositional(intensity = 1) {
    const revealPositions = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return;

      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);

      if (this.isNerfed) {
        // Ослабленный режим: всегда открывает строго 1 букву во всем слове
        if (!openedSet.has(firstIdx) && word[firstIdx] !== " ") {
          openedSet.add(firstIdx);
        } else if (!openedSet.has(middleIdx) && word[middleIdx] !== " ") {
          openedSet.add(middleIdx);
        }
        return;
      }

      if (intensity === 1) {
        // Ослабили первую попытку: для коротких (<=4) только первую, для остальных первую и среднюю
        openedSet.add(firstIdx);
        if (len > 4) {
          openedSet.add(middleIdx);
        }
      } else {
        // Вторая попытка: открываем первую, среднюю и последнюю
        openedSet.add(firstIdx);
        if (len > 1) openedSet.add(lastIdx);
        if (len > 2) openedSet.add(middleIdx);
      }
    };

    revealPositions(this.orig1, this.openedIndices1);
    revealPositions(this.orig2, this.openedIndices2);
  }

  // Reveal Type 2: Random percentage (урезается в 2 раза при штрафе)
  revealRandom(intensity = 1) {
    const totalLen = this.getTotalLength();
    
    let percentage = 0;
    if (intensity === 1) {
      if (totalLen <= 6) percentage = 0.4;
      else if (totalLen <= 10) percentage = 0.3;
      else percentage = 0.2;
    } else if (intensity >= 2) {
      if (totalLen <= 6) percentage = 0.8;
      else if (totalLen <= 10) percentage = 0.6;
      else percentage = 0.4;
    }

    // Если активирован штраф — урезаем процент открываемых букв ровно в 2 раза
    if (this.isNerfed) {
      percentage = percentage / 2;
    }

    const collectClosed = (word, openedSet) => {
      const arr = [];
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && word[i] !== " ") arr.push(i);
      }
      return arr;
    };

    const closed1 = collectClosed(this.orig1, this.openedIndices1);
    const closed2 = collectClosed(this.orig2, this.openedIndices2);
    const totalClosed = closed1.length + closed2.length;
    if (totalClosed === 0) return;

    const totalToReveal = Math.max(1, Math.ceil(totalClosed * percentage));

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

  // Reveal Type 3: Vowels & Consonants (по новым правилам с гласными в 1-й раз и согласными во 2-й)
  revealLetterType(intensity = 1) {
    const vowelsList = 'aeiouAEIOU';
    const consonantsList = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';

    const collectClosedByList = (word, openedSet, listStr) => {
      const arr = [];
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && listStr.includes(word[i])) {
          arr.push(i);
        }
      }
      return arr;
    };

    if (this.isNerfed) {
      // При штрафе открываем строго по 1 букве (гласной в 1-й раз, согласной во 2-й) во всем пуле закрытых букв
      const targetList = (intensity === 1) ? vowelsList : consonantsList;
      const pool1 = collectClosedByList(this.orig1, this.openedIndices1, targetList);
      const pool2 = collectClosedByList(this.orig2, this.openedIndices2, targetList);
      
      if (pool1.length > 0) this.openedIndices1.add(pool1[Math.floor(Math.random() * pool1.length)]);
      else if (pool2.length > 0) this.openedIndices2.add(pool2[Math.floor(Math.random() * pool2.length)]);
      return;
    }

    if (intensity === 1) {
      // Первое раскрытие: часть гласных с прогрессией на уменьшение для коротких слов
      const openVowelsForWord = (word, openedSet) => {
        const closedVowels = collectClosedByList(word, openedSet, vowelsList);
        if (closedVowels.length === 0) return;
        
        let countToOpen = 1;
        if (word.length > 7) countToOpen = 3;
        else if (word.length > 4) countToOpen = 2;

        countToOpen = Math.min(countToOpen, closedVowels.length);

        for (let i = 0; i < countToOpen; i++) {
          const randIdx = Math.floor(Math.random() * closedVowels.length);
          openedSet.add(closedVowels[randIdx]);
          closedVowels.splice(randIdx, 1);
        }
      };

      openVowelsForWord(this.orig1, this.openedIndices1);
      openVowelsForWord(this.orig2, this.openedIndices2);
    } else {
      // Второе раскрытие: должна показаться часть согласных
      const openConsonantsForWord = (word, openedSet) => {
        const closedConsonants = collectClosedByList(word, openedSet, consonantsList);
        if (closedConsonants.length === 0) return;

        let countToOpen = Math.max(1, Math.ceil(closedConsonants.length * 0.5));
        
        for (let i = 0; i < countToOpen; i++) {
          const randIdx = Math.floor(Math.random() * closedConsonants.length);
          openedSet.add(closedConsonants[randIdx]);
          closedConsonants.splice(randIdx, 1);
        }
      };

      openConsonantsForWord(this.orig1, this.openedIndices1);
      openConsonantsForWord(this.orig2, this.openedIndices2);
    }
  }

  // Динамические описания для интерфейса игрока (с четким указанием распределения на оба поля)
  getPositionalDescription(intensity = 1) {
    const getWordDesc = (word) => {
      const len = word.length;
      if (this.isNerfed) {
        return intensity === 1 ? "only start" : "only middle";
      }
      if (intensity === 1) {
        return len > 4 ? "start & mid" : "start";
      } else {
        return "start, mid & end";
      }
    };

    return `Applied to both: [W1: ${getWordDesc(this.orig1)}] & [W2: ${getWordDesc(this.orig2)}]`;
  }

  getRandomDescription(intensity = 1) {
    const suffix = " (split randomly between words)";
    if (this.isNerfed) {
      return (intensity === 1 ? "~15% random letters" : "~30% random letters") + suffix;
    }
    if (intensity === 1) {
      return "30%–40% random letters" + suffix;
    } else {
      return "50%–80% random letters" + suffix;
    }
  }

  getLetterTypeDescription(intensity = 1) {
    if (this.isNerfed) {
      return intensity === 1 
        ? "Opens 1 vowel in total (where available)" 
        : "Opens 1 consonant in total (where available)";
    }

    const vowelsList = 'aeiouAEIOU';
    const consonantsList = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';

    // Функция считает, сколько закрытых букв нужного типа ОСТАЛОСЬ в слове
    const countRemaining = (word, openedSet, listStr) => {
      let count = 0;
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && listStr.includes(word[i])) count++;
      }
      return count;
    };

    if (intensity === 1) {
      // Считаем точное количество гласных, которое откроет алгоритм из revealLetterType
      const getVowelsToOpen = (word, openedSet) => {
        const available = countRemaining(word, openedSet, vowelsList);
        if (available === 0) return 0;
        let target = 1;
        if (word.length > 7) target = 3;
        else if (word.length > 4) target = 2;
        return Math.min(target, available);
      };

      const count1 = getVowelsToOpen(this.orig1, this.openedIndices1);
      const count2 = getVowelsToOpen(this.orig2, this.openedIndices2);

      return `Reveals vowels: [W1: +${count1} letters] & [W2: +${count2} letters]`;
    } else {
      // Считаем точное количество согласных для второй попытки
      const getConsonantsToOpen = (word, openedSet) => {
        const available = countRemaining(word, openedSet, consonantsList);
        return Math.max(0, Math.ceil(available * 0.5));
      };

      const count1 = getConsonantsToOpen(this.orig1, this.openedIndices1);
      const count2 = getConsonantsToOpen(this.orig2, this.openedIndices2);

      return `Reveals consonants: [W1: +${count1} letters] & [W2: +${count2} letters]`;
    }
  }
}