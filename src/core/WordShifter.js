export class WordShifter {
  constructor(word1, word2, isNerfed = false, isMultiWord = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed; 
    this.isMultiWord = isMultiWord; 
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
      let wordIndex = 0; // Счетчик слов для чередования цветов
      let inGap = false;
      
      // Открываем первую группу с классом цвета (0 = бирюзовый, 1 = розовый)
      html += `<span class="word-group word-color-${wordIndex % 2}">`;
      
      if (word.length > 0 && !openedSet.has(0) && word[0] !== " ") {
        html += '<span class="letter-gap"></span>';
        inGap = true;
      }
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        
        if (char === " ") {
          // Встретили пробел: увеличиваем счетчик, закрываем группу, открываем новую с другим цветом
          wordIndex++;
          html += `</span><span class="word-space"></span><span class="word-group word-color-${wordIndex % 2}">`;
          inGap = false;
        } else if (openedSet.has(i)) {
          html += `<span class="revealed-char">${char}</span>`;
          inGap = false;
        } else {
          if (!inGap) {
            html += '<span class="letter-gap"></span>';
            inGap = true;
          }
        }
      }
      
      html += '</span>'; // Закрываем последнюю группу
      
      // Удаляем пустые группы, если строка начиналась/заканчивалась пробелом
      return html.replace(/<span class="word-group word-color-\d"><\/span>/g, '');
    };

    return {
      w1: maskToHtml(this.orig1, this.openedIndices1),
      w2: maskToHtml(this.orig2, this.openedIndices2)
    };
  }

  revealPositional(intensity = 1) {
    const revealPositions = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return;

      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);

      const applyNerf = this.isNerfed && intensity === 1;

      if (applyNerf || len <= 3) {
        openedSet.add(firstIdx);
        if (len > 4) openedSet.add(lastIdx);
        return;
      }

      if (intensity === 1) {
        openedSet.add(firstIdx);
        if (this.isMultiWord) {
          for (let i = 1; i < len; i++) {
            if (word[i - 1] === " " && word[i] !== " ") {
              openedSet.add(i);
            }
          }
          openedSet.add(lastIdx);
        } else {
          if (len > 2) openedSet.add(middleIdx);
        }
      } else {
        openedSet.add(firstIdx);
        if (len > 1) openedSet.add(lastIdx);

        if (this.isMultiWord) {
          for (let i = 1; i < len; i++) {
            if (word[i - 1] === " " && word[i] !== " ") openedSet.add(i);
          }
        } else {
          if (len > 6) {
            openedSet.add(1);
          } else if (len > 2) {
            openedSet.add(middleIdx);
          }
        }
      }
    };

    revealPositions(this.orig1, this.openedIndices1);
    revealPositions(this.orig2, this.openedIndices2);
  }

  revealRandom(intensity = 1) {
    if (this.isMultiWord && intensity >= 2) {
      if (this.orig1.length > 0 && this.orig1[0] !== " ") this.openedIndices1.add(0);
      if (this.orig2.length > 0 && this.orig2[0] !== " ") this.openedIndices2.add(0);
    }

    const totalLen = this.getTotalLength();
    let percentage = 0;
    
    if (intensity === 1) {
      if (totalLen <= 5) percentage = 0.35;
      else if (totalLen <= 8) percentage = 0.4;
      else percentage = 0.45; 
    } else if (intensity >= 2) {
      if (this.isMultiWord) {
        percentage = 0.45;
      } else {
        // НОВОЕ: Срезаем % для коротких слов на 2-м шаге, чтобы не оголять их полностью
        if (totalLen <= 5) percentage = 0.55; 
        else if (totalLen <= 8) percentage = 0.6; 
        else percentage = 0.6; 
      }
    }

    if (this.isNerfed || totalLen <= 5) {
      // НОВОЕ: Ослабляем штраф на 1-м шаге до 0.8
      percentage = (intensity === 1) ? (percentage * 0.8) : (percentage * 0.85);
    }

    const collectClosed = (word, openedSet) => {
      const arr = [];
      const endsWithIng = word.toUpperCase().endsWith("ING");
      const ingStartIdx = word.length - 3;

      for (let i = 0; i < word.length; i++) {
        if (endsWithIng && i >= ingStartIdx) continue;
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

    // НОВОЕ: Спасительный минимум. Если на доске 8+ букв, 1-й шаг Random откроет хотя бы 4
    if (intensity === 1 && totalClosed >= 8) {
      totalToReveal = Math.max(4, totalToReveal);
    }
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

    if (intensity >= 2) {
      const fixHoles = (word, openedSet) => {
        let gapStart = -1;
        for (let i = 0; i <= word.length; i++) {
          const isClosed = i < word.length && !openedSet.has(i) && word[i] !== " ";
          if (isClosed) {
            if (gapStart === -1) gapStart = i;
          } else {
            if (gapStart !== -1) {
              const gapLength = i - gapStart;
              if (gapLength >= 4) {
                const middleOfGap = gapStart + Math.floor(gapLength / 2);
                openedSet.add(middleOfGap);
              }
              gapStart = -1;
            }
          }
        }
      };
      fixHoles(this.orig1, this.openedIndices1);
      fixHoles(this.orig2, this.openedIndices2);
    }
  }

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

    const applyNerf = this.isNerfed || this.getTotalLength() <= 3;

    if (applyNerf && intensity === 1) {
      const openOneForField = (word, openedSet) => {
        let pool = collectClosedByList(word, openedSet, targetList);
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

    const processSmartWordReveal = (origWord, openedSet) => {
      const availableClosedIndices = [];
      for (let i = 0; i < origWord.length; i++) {
        if (!openedSet.has(i) && targetList.includes(origWord[i])) {
          availableClosedIndices.push(i);
        }
      }
      
      let countToOpen;
      if (intensity === 1) {
        if (origWord.length <= 4) {
          countToOpen = 1; 
        } else if (origWord.length >= 8) {
          countToOpen = Math.max(2, Math.ceil(availableClosedIndices.length * 0.5)); 
        } else {
          countToOpen = Math.max(2, Math.ceil(availableClosedIndices.length * 0.35));
        }
      } else {
        // НОВОЕ: Защищаем короткие слова от полного вскрытия гласных на 2-м шаге
        if (applyNerf) {
           countToOpen = Math.min(3, availableClosedIndices.length);
        } else if (origWord.length <= 4) {
           countToOpen = Math.min(1, availableClosedIndices.length);
        } else if (origWord.length <= 6) {
           countToOpen = Math.min(2, availableClosedIndices.length);
        } else {
           countToOpen = availableClosedIndices.length;
        }
      }

      for (let i = 0; i < countToOpen; i++) {
        const randIdx = Math.floor(Math.random() * availableClosedIndices.length);
        openedSet.add(availableClosedIndices[randIdx]);
        availableClosedIndices.splice(randIdx, 1);
      }
    };

    processSmartWordReveal(this.orig1, this.openedIndices1);
    processSmartWordReveal(this.orig2, this.openedIndices2);
  }

// Descriptions для UI
getPositionalDescription(intensity = 1) {
    // Внутренняя функция: проверяет, какие именно новые позиции откроются для конкретного слова
    const getNewRulesForWord = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return [];
      
      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);
      
      const applyNerf = this.isNerfed && intensity === 1;
      const rules = new Set();
      
      // Хелпер: добавляет правило, только если буква по этому индексу ещё закрыта
      const checkAndAdd = (idx, ruleName) => {
        if (!openedSet.has(idx) && word[idx] !== ' ') {
          rules.add(ruleName);
        }
      };

      if (applyNerf || len <= 3) {
        checkAndAdd(firstIdx, "1st");
        if (len > 4) checkAndAdd(lastIdx, "last");
        return Array.from(rules);
      }

      if (intensity === 1) {
        checkAndAdd(firstIdx, this.isMultiWord ? "1st of each" : "1st");
        if (this.isMultiWord) {
          for (let i = 1; i < len; i++) {
            if (word[i - 1] === " " && word[i] !== " ") checkAndAdd(i, "1st of each");
          }
          checkAndAdd(lastIdx, "last");
        } else {
          if (len > 2) checkAndAdd(middleIdx, "middle");
        }
      } else {
        checkAndAdd(firstIdx, this.isMultiWord ? "1st of each" : "1st");
        if (len > 1) checkAndAdd(lastIdx, "last");

        if (this.isMultiWord) {
          for (let i = 1; i < len; i++) {
            if (word[i - 1] === " " && word[i] !== " ") checkAndAdd(i, "1st of each");
          }
        } else {
          if (len > 6) {
            checkAndAdd(1, "2nd");
          } else if (len > 2) {
            checkAndAdd(middleIdx, "middle");
          }
        }
      }
      return Array.from(rules);
    };

    const rules1 = getNewRulesForWord(this.orig1, this.openedIndices1);
    const rules2 = getNewRulesForWord(this.orig2, this.openedIndices2);

    const rulesMap = new Map();
    
    const addRules = (rules, wordIndex) => {
      rules.forEach(rule => {
        if (!rulesMap.has(rule)) rulesMap.set(rule, []);
        rulesMap.get(rule).push(wordIndex);
      });
    };

    addRules(rules1, 1);
    addRules(rules2, 2);

    const parts = [];
    // Строгий порядок вывода для красоты
    const standardOrder = ["1st", "1st of each", "2nd", "middle", "last"];
    
    standardOrder.forEach(rule => {
      if (rulesMap.has(rule)) {
        const indices = rulesMap.get(rule).join(',');
        // Форматируем с маленькими жёлтыми цифрами
        parts.push(`${rule}<sup style="color: #ffd56b; font-weight: 800;">${indices}</sup>`);
      }
    });

    return parts.length > 0 ? parts.join(' ') : "no hidden positions";
  }

getRandomDescription(intensity = 1) {
    const totalLen = this.getTotalLength();
    let percentage = 0;
    
    if (intensity === 1) {
      if (totalLen <= 5) percentage = 0.35;
      else if (totalLen <= 8) percentage = 0.4;
      else percentage = 0.45;
    } else if (intensity >= 2) {
      if (this.isMultiWord) percentage = 0.45;
      else if (totalLen <= 5) percentage = 0.55; 
      else if (totalLen <= 8) percentage = 0.6; 
      else percentage = 0.6; 
    }

    if (this.isNerfed || totalLen <= 5) {
      percentage = (intensity === 1) ? (percentage * 0.8) : (percentage * 0.85);
    }

    // Проверяем, будут ли открыты первые буквы по правилу multi-word + step 2
    // Исключаем те, которые уже были открыты ранее
    const w1FirstWillOpen = this.isMultiWord && intensity >= 2 && this.orig1.length > 0 && this.orig1[0] !== " " && !this.openedIndices1.has(0);
    const w2FirstWillOpen = this.isMultiWord && intensity >= 2 && this.orig2.length > 0 && this.orig2[0] !== " " && !this.openedIndices2.has(0);

    // Подсчет закрытых букв теперь игнорирует те, что гарантированно откроются первыми
    const countClosed = (word, openedSet, skipFirst) => {
      let count = 0;
      const endsWithIng = word.toUpperCase().endsWith("ING");
      const ingStartIdx = word.length - 3;
      for (let i = 0; i < word.length; i++) {
        if (skipFirst && i === 0) continue;
        if (endsWithIng && i >= ingStartIdx) continue;
        if (!openedSet.has(i) && word[i] !== " ") count++;
      }
      if (count === 0) {
        for (let i = 0; i < word.length; i++) {
          if (skipFirst && i === 0) continue;
          if (!openedSet.has(i) && word[i] !== " ") count++;
        }
      }
      return count;
    };

    const closed1 = countClosed(this.orig1, this.openedIndices1, w1FirstWillOpen);
    const closed2 = countClosed(this.orig2, this.openedIndices2, w2FirstWillOpen);
    const totalClosed = closed1 + closed2;
    
    // Формируем точный префикс с маленькими желтыми цифрами
    let basePrefix = "";
    if (w1FirstWillOpen || w2FirstWillOpen) {
      const indices = [];
      if (w1FirstWillOpen) indices.push("1");
      if (w2FirstWillOpen) indices.push("2");
      
      const sup = `<sup style="color: #ffd56b; font-weight: 800;">${indices.join(',')}</sup>`;
      const letterWord = indices.length > 1 ? "letters" : "letter";
      basePrefix = `🥇 1st ${letterWord}${sup} & `;
    }

    if (totalClosed === 0 && basePrefix === "") return "No hidden letters left";
    
    let totalToReveal = 0;
    if (totalClosed > 0) {
      totalToReveal = Math.max(1, Math.ceil(totalClosed * percentage));
      if (intensity === 1 && totalClosed >= 8) totalToReveal = Math.max(4, totalToReveal);
      totalToReveal = Math.min(totalClosed, totalToReveal);
    }

    // Если случайных букв больше не осталось, оставляем только префикс
    if (totalToReveal === 0) {
      return basePrefix.replace(" & ", ""); 
    }

    return `${basePrefix}${totalToReveal} random letters <span style="color: #ffd56b; font-weight: 800;">total</span>`;
  }

getLetterTypeDescription(intensity = 1) {
    const vowelsList = 'aeiouAEIOU';
    const consonantsList = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    const typeLabel = (intensity === 1) ? "consonants" : "vowels";
    const applyNerf = this.isNerfed || this.getTotalLength() <= 3;

    const countRemaining = (word, openedSet, listStr) => {
      let count = 0;
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && listStr.includes(word[i])) count++;
      }
      return count;
    };

    let count1 = 0, count2 = 0;

    if (applyNerf && intensity === 1) {
      const countRemainingInField = (word, openedSet) => {
        for (let i = 0; i < word.length; i++) {
          if (!openedSet.has(i) && (consonantsList.includes(word[i]) || vowelsList.includes(word[i]))) return 1;
        }
        return 0;
      };
      count1 = countRemainingInField(this.orig1, this.openedIndices1);
      count2 = countRemainingInField(this.orig2, this.openedIndices2);
    } else if (intensity === 1) {
      const calcCount = (word, count) => {
        if (word.length <= 4) return Math.min(1, count);
        if (word.length >= 8) return Math.min(count, Math.max(2, Math.ceil(count * 0.5)));
        return Math.min(count, Math.max(2, Math.ceil(count * 0.35)));
      };
      count1 = calcCount(this.orig1, countRemaining(this.orig1, this.openedIndices1, consonantsList));
      count2 = calcCount(this.orig2, countRemaining(this.orig2, this.openedIndices2, consonantsList));
    } else {
      const getLimit = (word) => {
        if (applyNerf) return 3;
        if (word.length <= 4) return 1;
        if (word.length <= 6) return 2;
        return 99;
      };
      count1 = Math.min(getLimit(this.orig1), countRemaining(this.orig1, this.openedIndices1, vowelsList));
      count2 = Math.min(getLimit(this.orig2), countRemaining(this.orig2, this.openedIndices2, vowelsList));
    }

    const total = count1 + count2;
    // Убрали знак "+" в начале и добавили слово total жёлтым цветом
    return `${total} ${typeLabel} <span style="color: #ffd56b; font-weight: 800;">total</span>`;
  }
}