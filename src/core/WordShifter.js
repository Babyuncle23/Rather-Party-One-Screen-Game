export class WordShifter {
  constructor(word1, word2, isNerfed = false, isMultiWord = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed; // Флаг ослабления способностей
    this.isMultiWord = isMultiWord; // Флаг фраз из нескольких слов
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

  // Reveal Type 1: Positional (учитывает длину слов и штрафы баланса)
  revealPositional(intensity = 1) {
    const revealPositions = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return;

      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);

      // Штрафной режим: если активирован nerf или слово слишком короткое
      if (this.isNerfed || len <= 3) {
        if (!openedSet.has(middleIdx) && word[middleIdx] !== " ") {
          openedSet.add(middleIdx);
        } else if (!openedSet.has(lastIdx) && word[lastIdx] !== " ") {
          openedSet.add(lastIdx);
        }
        return;
      }

      if (intensity === 1) {
        // Обычный режим (1-я попытка): первая и средняя буквы
        openedSet.add(firstIdx);
        if (len > 2) openedSet.add(middleIdx);
      } else {
        // Обычный режим (2-я попытка): первая, средняя и последняя буквы
        openedSet.add(firstIdx);
        if (len > 1) openedSet.add(lastIdx);
        if (len > 2) openedSet.add(middleIdx);
      }
    };

    revealPositions(this.orig1, this.openedIndices1);
    revealPositions(this.orig2, this.openedIndices2);
  }

  // Reveal Type 2: Random percentage (с особым правилом для многословных фраз на 2-й попытке)
  revealRandom(intensity = 1) {
    // Особое правило: на второй попытке для многословных фраз принудительно открываем первые буквы
    if (this.isMultiWord && intensity >= 2) {
      if (this.orig1.length > 0 && this.orig1[0] !== " ") this.openedIndices1.add(0);
      if (this.orig2.length > 0 && this.orig2[0] !== " ") this.openedIndices2.add(0);
    }

    const totalLen = this.getTotalLength();
    
    let percentage = 0;
    if (intensity === 1) {
      if (totalLen <= 3) percentage = 0.3;
      else if (totalLen <= 6) percentage = 0.4;
      // Усиление баланса: для длинных слов и фраз базовый процент на первой попытке увеличен до 40%
      else percentage = 0.4; 
    } else if (intensity >= 2) {
      if (totalLen <= 3) percentage = 0.6;
      else if (totalLen <= 6) percentage = 0.8;
      // Усиление баланса: для длинных слов на второй попытке открываем до 60% букв
      else percentage = 0.6; 
    }

    // Если активирован штраф или слова слишком короткие — режем силу случайного раскрытия в 2 раза
    if (this.isNerfed || totalLen <= 3) {
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

  // Reveal Type 3: Vowels & Consonants (инвертированный порядок: согласные, затем гласные)
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

    // Оптимальный штрафной режим: открывает строго 1 согласную на всё игровое поле за раз
    if (this.isNerfed || this.getTotalLength() <= 3) {
      let pool1 = collectClosedByList(this.orig1, this.openedIndices1, consonantsList);
      let pool2 = collectClosedByList(this.orig2, this.openedIndices2, consonantsList);
      
      // Если закрытых согласных не осталось вообще, переключаемся на гласные
      if (pool1.length === 0 && pool2.length === 0) {
        pool1 = collectClosedByList(this.orig1, this.openedIndices1, vowelsList);
        pool2 = collectClosedByList(this.orig2, this.openedIndices2, vowelsList);
      }

      const combinedPool = [
        ...pool1.map(idx => ({ wordNum: 1, index: idx })),
        ...pool2.map(idx => ({ wordNum: 2, index: idx }))
      ];
      
      if (combinedPool.length > 0) {
        const target = combinedPool[Math.floor(Math.random() * combinedPool.length)];
        if (target.wordNum === 1) this.openedIndices1.add(target.index);
        else this.openedIndices2.add(target.index);
      }
      return;
    }

    if (intensity === 1) {
      // Обычный режим (1-я попытка): открываем часть сильных СОГЛАСНЫХ букв
      const openConsonantsForWord = (word, openedSet) => {
        const closedConsonants = collectClosedByList(word, openedSet, consonantsList);
        if (closedConsonants.length === 0) return;

        let countToOpen = Math.max(1, Math.ceil(closedConsonants.length * 0.4));
        for (let i = 0; i < countToOpen; i++) {
          const randIdx = Math.floor(Math.random() * closedConsonants.length);
          openedSet.add(closedConsonants[randIdx]);
          closedConsonants.splice(randIdx, 1);
        }
      };
      openConsonantsForWord(this.orig1, this.openedIndices1);
      openConsonantsForWord(this.orig2, this.openedIndices2);
    } else {
      // Обычный режим (2-я попытка): открываем до половины ГЛАСНЫХ букв
      const openVowelsForWord = (word, openedSet) => {
        const closedVowels = collectClosedByList(word, openedSet, vowelsList);
        if (closedVowels.length === 0) return;

        let countToOpen = Math.max(1, Math.ceil(closedVowels.length * 0.5));
        for (let i = 0; i < countToOpen; i++) {
          const randIdx = Math.floor(Math.random() * closedVowels.length);
          openedSet.add(closedVowels[randIdx]);
          closedVowels.splice(randIdx, 1);
        }
      };
      openVowelsForWord(this.orig1, this.openedIndices1);
      openVowelsForWord(this.orig2, this.openedIndices2);
    }
  }

  // Динамические описания для интерфейса игрока (с чётким указанием распределения на оба поля)
  getPositionalDescription(intensity = 1) {
    if (this.isMultiWord) return "Not available for multi-word phrases";
    
    // Вспомогательная функция, которая смотрит, какие именно позиции ЕЩЕ НЕ ОТКРЫТЫ в конкретном слове
    const getNextRevealsForWord = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return "nothing";
      
      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);
      
      if (this.isNerfed || len <= 3) {
        if (!openedSet.has(middleIdx) && word[middleIdx] !== " ") return "+middle letter only";
        if (!openedSet.has(lastIdx) && word[lastIdx] !== " ") return "+last letter only";
        return "no letters";
      }
      
      if (intensity === 1) {
        const reveals = ["1st"];
        if (len > 2) reveals.push("middle");
        return `+${reveals.join(" & ")}`;
      } else {
        const reveals = ["1st"];
        if (len > 2) reveals.push("middle");
        if (len > 1) reveals.push("last");
        return `+${reveals.join(", ")}`;
      }
    };

    return `Will reveal: [W1: ${getNextRevealsForWord(this.orig1, this.openedIndices1)}] & [W2: ${getNextRevealsForWord(this.orig2, this.openedIndices2)}]`;
  }


  getRandomDescription(intensity = 1) {
    // Считаем точное количество скрытых букв, которое сейчас откроет алгоритм revealRandom
    const totalLen = this.getTotalLength();
    let percentage = 0;
    if (intensity === 1) {
      if (totalLen <= 3) percentage = 0.3;
      else if (totalLen <= 6) percentage = 0.4;
      else percentage = 0.4; // Для длинных слов базовый процент равен 40%
    } else if (intensity >= 2) {
      if (totalLen <= 3) percentage = 0.6;
      else if (totalLen <= 6) percentage = 0.8;
      else percentage = 0.6; // Для длинных слов на второй попытке равен 60%
    }

    // Если активирован штраф или слова слишком короткие — режем силу случайного раскрытия в 2 раза
    if (this.isNerfed || totalLen <= 3) {
      percentage = percentage / 2;
    }

    const countClosed = (word, openedSet) => {
      let count = 0;
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && word[i] !== " ") count++;
      }
      return count;
    };

    const closed1 = countClosed(this.orig1, this.openedIndices1);
    const closed2 = countClosed(this.orig2, this.openedIndices2);
    const totalClosed = closed1 + closed2;
    
    if (totalClosed === 0) return "No hidden letters left";
    
    const totalToReveal = Math.min(totalClosed, Math.max(1, Math.ceil(totalClosed * percentage)));
    const basePrefix = this.isMultiWord && intensity >= 2 ? "🥇 1st letters guaranteed + " : "";

    return `${basePrefix}Will reveal exactly +${totalToReveal} random letter${totalToReveal > 1 ? 's' : ''} total`;
  }

  getLetterTypeDescription(intensity = 1) {
    if (this.isMultiWord) return "Not available for multi-word phrases";
    if (this.isNerfed || this.getTotalLength() <= 3) {
      // Полностью скрываем техническую информацию о штрафе. Игрок видит только чистый результат.
      return "Will reveal exactly +1 random structural letter total";
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
      // Считаем точное количество согласных для первой попытки
      const getConsonantsToOpen = (word, openedSet) => {
        const available = countRemaining(word, openedSet, consonantsList);
        return Math.max(0, Math.ceil(available * 0.4));
      };

      const count1 = getConsonantsToOpen(this.orig1, this.openedIndices1);
      const count2 = getConsonantsToOpen(this.orig2, this.openedIndices2);

      return `Reveals consonants: [W1: +${count1} letters] & [W2: +${count2} letters]`;
    } else {
      // Считаем точное количество гласных для второй попытки
      const getVowelsToOpen = (word, openedSet) => {
        const available = countRemaining(word, openedSet, vowelsList);
        return Math.max(0, Math.ceil(available * 0.5));
      };

      const count1 = getVowelsToOpen(this.orig1, this.openedIndices1);
      const count2 = getVowelsToOpen(this.orig2, this.openedIndices2);

      return `Reveals vowels: [W1: +${count1} letters] & [W2: +${count2} letters]`;
    }
  }
}