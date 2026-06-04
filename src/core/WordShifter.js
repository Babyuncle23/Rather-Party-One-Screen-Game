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

    getWordCount1() {
    return this.orig1.split(/\s+/).filter(Boolean).length;
  }

  getWordCount2() {
    return this.orig2.split(/\s+/).filter(Boolean).length;
  }

  getMaskedWords() {
    const maskToHtml = (word, openedSet) => {
      let html = "";
      let inGap = false;
      
      // Если скрытые буквы идут в самом начале
      if (word.length > 0 && !openedSet.has(0) && word[0] !== " ") {
        html += '<span class="letter-gap"></span>';
        inGap = true;
      }
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (openedSet.has(i) || char === " ") {
          if (char === " ") {
            html += '<span class="word-space"></span>';
          } else {
            html += `<span class="revealed-char">${char}</span>`;
          }
          inGap = false;
        } else {
          // Если текущий символ скрыт и мы еще не создали разделитель для текущей группы пропусков
          if (!inGap && char !== " ") {
            html += '<span class="letter-gap"></span>';
            inGap = true;
          }
        }
      }
      return html;
    };

    return {
      w1: maskToHtml(this.orig1, this.openedIndices1),
      w2: maskToHtml(this.orig2, this.openedIndices2)
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
      const endsWithIng = word.toUpperCase().endsWith("ING");
      const ingStartIdx = word.length - 3;

      for (let i = 0; i < word.length; i++) {
        // Если слово заканчивается на ING, исключаем последние 3 индекса из случайного пула
        if (endsWithIng && i >= ingStartIdx) {
          continue;
        }
        if (!openedSet.has(i) && word[i] !== " ") arr.push(i);
      }
      
      // Пограничный сценарий: если ВСЕ оставшиеся буквы в слове — это только ING, 
      // возвращаем их обратно в пул, чтобы способность не сработала вхолостую
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

  // Reveal Type 3: Vowels & Consonants (Умный пословесный лимит с учетом Nerf-системы)
  revealLetterType(intensity = 1) {
    const vowelsList = 'aeiouAEIOU';
    const consonantsList = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    const targetList = (intensity === 1) ? consonantsList : vowelsList;

    const collectClosedByList = (word, openedSet, listStr) => {
      const arr = [];
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && listStr.includes(word[i])) {
          arr.push(i);
        }
      }
      return arr;
    };

    // Штрафной симметричный режим: открывает строго по 1 букве нужного типа в каждом поле (W1 и W2)
    if (this.isNerfed || this.getTotalLength() <= 3) {
      const openOneForField = (word, openedSet) => {
        let pool = collectClosedByList(word, openedSet, targetList);
        // Если букв основного целевого типа (например, согласных) нет, ищем альтернативный тип
        if (pool.length === 0) {
          const altList = (intensity === 1) ? vowelsList : consonantsList;
          pool = collectClosedByList(word, openedSet, altList);
        }
        if (pool.length > 0) {
          const randIdx = Math.floor(Math.random() * pool.length);
          openedSet.add(pool[randIdx]);
        }
      };

      openOneForField(this.orig1, this.openedIndices1);
      openOneForField(this.orig2, this.openedIndices2);
      return;
    }

    // 2. ОБЫЧНЫЙ УМНЫЙ РЕЖИМ: Гарантированно открывает 2 буквы нужного типа на всё поле
    const processSmartWordReveal = (origWord, openedSet) => {
      const availableClosedIndices = [];
      for (let i = 0; i < origWord.length; i++) {
        if (!openedSet.has(i) && targetList.includes(origWord[i])) {
          availableClosedIndices.push(i);
        }
      }
      
      const countToOpen = Math.min(2, availableClosedIndices.length);
      for (let i = 0; i < countToOpen; i++) {
        const randIdx = Math.floor(Math.random() * availableClosedIndices.length);
        openedSet.add(availableClosedIndices[randIdx]);
        availableClosedIndices.splice(randIdx, 1);
      }
    };

    processSmartWordReveal(this.orig1, this.openedIndices1);
    processSmartWordReveal(this.orig2, this.openedIndices2);
  }

  // Динамические описания для интерфейса игрока (с чётким указанием распределения на оба поля)
  getPositionalDescription(intensity = 1) {
    if (this.isMultiWord) return "Not available for multi-word phrases";
    
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

    return `Will reveal: [<span class="ability-inline-label">ANSWER 1</span>: ${getNextRevealsForWord(this.orig1, this.openedIndices1)}] & [<span class="ability-inline-label">ANSWER 2</span>: ${getNextRevealsForWord(this.orig2, this.openedIndices2)}]`;
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
      const endsWithIng = word.toUpperCase().endsWith("ING");
      const ingStartIdx = word.length - 3;

      for (let i = 0; i < word.length; i++) {
        if (endsWithIng && i >= ingStartIdx) continue;
        if (!openedSet.has(i) && word[i] !== " ") count++;
      }
      
      // Если кроме ING ничего не осталось, считаем их, чтобы не показывать 0
      if (count === 0) {
        for (let i = 0; i < word.length; i++) {
          if (!openedSet.has(i) && word[i] !== " ") count++;
        }
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
    const vowelsList = 'aeiouAEIOU';
    const consonantsList = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    const targetList = (intensity === 1) ? consonantsList : vowelsList;
    const typeLabel = (intensity === 1) ? "consonants" : "vowels";

    // Отдельный симуляционный подсчет для штрафного симметричного режима
    if (this.isNerfed || this.getTotalLength() <= 3) {
      const countRemainingInField = (word, openedSet) => {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
          if (!openedSet.has(i) && (consonantsList.includes(word[i]) || vowelsList.includes(word[i]))) {
            count = 1; // Способность гарантированно найдет и откроет 1 букву, если они вообще есть
            break;
          }
        }
        return count;
      };
    const c1 = countRemainingInField(this.orig1, this.openedIndices1);
    const c2 = countRemainingInField(this.orig2, this.openedIndices2);
    return `Reveals ${typeLabel}: [<span class="ability-inline-label">ANSWER 1</span>: +${c1} letters] & [<span class="ability-inline-label">ANSWER 2</span>: +${c2} letters]`;
  }

  const countRemaining = (word, openedSet, listStr) => {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (!openedSet.has(i) && listStr.includes(word[i])) count++;
    }
    return count;
  };

  if (intensity === 1) {
    const count1 = Math.min(2, countRemaining(this.orig1, this.openedIndices1, consonantsList));
    const count2 = Math.min(2, countRemaining(this.orig2, this.openedIndices2, consonantsList));
    return `Reveals ${typeLabel}: [<span class="ability-inline-label">ANSWER 1</span>: +${count1} letters] & [<span class="ability-inline-label">ANSWER 2</span>: +${count2} letters]`;
  } else {
    const count1 = Math.min(2, countRemaining(this.orig1, this.openedIndices1, vowelsList));
    const count2 = Math.min(2, countRemaining(this.orig2, this.openedIndices2, vowelsList));
    return `Reveals ${typeLabel}: [<span class="ability-inline-label">ANSWER 1</span>: +${count1} letters] & [<span class="ability-inline-label">ANSWER 2</span>: +${count2} letters]`;
  }
  }
}