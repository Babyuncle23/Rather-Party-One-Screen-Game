import { escapeHTML } from '../utils/sanitize.js';
import { t } from '../i18n/I18nManager.js';

// Структурные знаки: видны сразу, не считаются буквами и работают
// разделителями слов в логике раскрытия. Включает кавычки «»„”" — они
// обрамляют слоты в RU/FI-шаблонах.
const STRUCT_CHARS = new Set("-'«»„“”\"?!.,:;()…/+*".split(''));

export class WordShifter {
  // isNerfed / isMultiWord принимают либо boolean (legacy, общий на пару),
  // либо { w1, w2 } — per-word флаги. Сводные boolean-свойства сохранены
  // для обратной совместимости сериализации и старых вызовов.
  constructor(word1, word2, isNerfed = false, isMultiWord = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();

    if (typeof isNerfed === 'object' && isNerfed !== null) {
      this.isNerfed1 = !!isNerfed.w1;
      this.isNerfed2 = !!isNerfed.w2;
    } else {
      this.isNerfed1 = !!isNerfed;
      this.isNerfed2 = !!isNerfed;
    }
    this.isNerfed = this.isNerfed1 || this.isNerfed2;

    const autoMulti1 = this.orig1.split(/\s+/).filter(Boolean).length > 1;
    const autoMulti2 = this.orig2.split(/\s+/).filter(Boolean).length > 1;
    if (typeof isMultiWord === 'object' && isMultiWord !== null) {
      this.isMultiWord1 = !!isMultiWord.w1;
      this.isMultiWord2 = !!isMultiWord.w2;
    } else {
      this.isMultiWord1 = isMultiWord && autoMulti1;
      this.isMultiWord2 = isMultiWord && autoMulti2;
    }
    this.isMultiWord = this.isMultiWord1 || this.isMultiWord2;

    this.isLengthRevealed = false;

    // Автоматически открываем знаки препинания со старта
    const revealPunctuation = (word, openedSet, multiFlag) => {
      for (let i = 0; i < word.length; i++) {
        if (STRUCT_CHARS.has(word[i])) openedSet.add(i);
        // Многословные ответы: пробелы остаются видимыми разделителями
        if (multiFlag && word[i] === ' ') openedSet.add(i);
      }
    };
    revealPunctuation(this.orig1, this.openedIndices1, this.isMultiWord1);
    revealPunctuation(this.orig2, this.openedIndices2, this.isMultiWord2);
  }

  getTotalLength() { return this.orig1.length + this.orig2.length; }

  // Для UI оставляем разделение только по пробелам, чтобы "T-SHIRT" считалось 1 словом визуально
  getWordCount1() { return this.orig1.split(/\s+/).filter(Boolean).length; }
  getWordCount2() { return this.orig2.split(/\s+/).filter(Boolean).length; }

  // highlight1/highlight2 — Set индексов "только что открытых" букв для CSS-анимации
  getMaskedWords(highlight1 = null, highlight2 = null) {
    const maskToHtml = (word, openedSet, highlightSet) => {
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
          const cls = (highlightSet && highlightSet.has(i)) ? 'revealed-char just-revealed' : 'revealed-char';
          html += `<span class="${cls}">${escapeHTML(char)}</span>`;
          inGap = false;
        } else {
          if (this.isLengthRevealed) {
            html += '<span class="letter-slot">_</span>';
            inGap = false;
          } else {
            if (!inGap) {
              html += `<span class="mystery-chunk" title="${escapeHTML(t('guesser.maskTitle'))}">•••</span>`;
              inGap = true;
            }
          }
        }
      }

      html += '</span>';

      if (this.isLengthRevealed) {
        // Unicode-безопасный подсчёт: только буквы/цифры (\p{L}\p{N}),
        // чтобы Ё, Ä, Ö считались корректно, а пунктуация — нет.
        const letterCount = (word.match(/[\p{L}\p{N}]/gu) || []).length;
        html += `<span class="word-length-badge">${escapeHTML(t('guesser.lettersBadge', { n: letterCount }))}</span>`;
      }
      return html.replace(/<span class="word-group word-color-\d+"><\/span>/g, '');
    };

    return {
      w1: maskToHtml(this.orig1, this.openedIndices1, highlight1),
      w2: maskToHtml(this.orig2, this.openedIndices2, highlight2)
    };
  }

  autoReveal(isCatchUp = false) {
    // Нёрф для простых слов — per-word: одно «простое» слово не душит пару
    const pct1 = this.isNerfed1 ? 0.25 : 0.40;
    const pct2 = this.isNerfed2 ? 0.25 : 0.40;
    this._applyRevealLogicToWord(this.orig1, this.openedIndices1, pct1, true, isCatchUp);
    this._applyRevealLogicToWord(this.orig2, this.openedIndices2, pct2, true, isCatchUp);
  }

  revealExtraRandom() {
    // 50% оставшегося пула + минимум 2 буквы на словах 5+ — ощутимый бёрст
    this._applyRevealLogicToWord(this.orig1, this.openedIndices1, 0.50, false, false);
    this._applyRevealLogicToWord(this.orig2, this.openedIndices2, 0.50, false, false);
  }

  toJSON() {
    return {
      orig1: this.orig1,
      orig2: this.orig2,
      openedIndices1: [...this.openedIndices1],
      openedIndices2: [...this.openedIndices2],
      isNerfed: this.isNerfed,
      isNerfed1: this.isNerfed1,
      isNerfed2: this.isNerfed2,
      isMultiWord: this.isMultiWord,
      isMultiWord1: this.isMultiWord1,
      isMultiWord2: this.isMultiWord2,
      isLengthRevealed: this.isLengthRevealed
    };
  }

  static fromJSON(data) {
    const nerfArg = (typeof data.isNerfed1 === 'boolean' || typeof data.isNerfed2 === 'boolean')
      ? { w1: !!data.isNerfed1, w2: !!data.isNerfed2 }
      : !!data.isNerfed;
    const multiArg = (typeof data.isMultiWord1 === 'boolean' || typeof data.isMultiWord2 === 'boolean')
      ? { w1: !!data.isMultiWord1, w2: !!data.isMultiWord2 }
      : !!data.isMultiWord;
    const shifter = new WordShifter(data.orig1 || '', data.orig2 || '', nerfArg, multiArg);
    shifter.openedIndices1 = new Set(data.openedIndices1 || []);
    shifter.openedIndices2 = new Set(data.openedIndices2 || []);
    shifter.isLengthRevealed = !!data.isLengthRevealed;
    return shifter;
  }

  revealLength() {
    this.isLengthRevealed = true;

    // Открываем первую БУКВУ каждого слова (не кавычку/скобку)
    const openFirst = (wordStr, openedSet) => {
      let isNewWord = true;
      for (let i = 0; i < wordStr.length; i++) {
        let char = wordStr[i];
        if (char === ' ' || STRUCT_CHARS.has(char)) {
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

  // Общий проход по обоим словам — сохранён для совместимости вызовов
  _applyRevealLogic(basePercentage, isFirstStep, isCatchUp) {
    this._applyRevealLogicToWord(this.orig1, this.openedIndices1, basePercentage, isFirstStep, isCatchUp);
    this._applyRevealLogicToWord(this.orig2, this.openedIndices2, basePercentage, isFirstStep, isCatchUp);
  }

  _applyRevealLogicToWord(wordStr, openedSet, basePercentage, isFirstStep, isCatchUp) {
    // Разбиваем строку на слова, разделяя по пробелам и структурным знакам
    let words = [];
    let currentWord = { start: -1, text: "" };

    for (let i = 0; i < wordStr.length; i++) {
      let char = wordStr[i];
      if (char === ' ' || STRUCT_CHARS.has(char)) {
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

      // Защита суффикса только при реальном корне слова —
      // иначе KING/WING/THING теряли весь пул бесплатного ревила
      const upper = w.text.toUpperCase();
      let protectedTailLen = 0;
      if (len >= 6 && upper.endsWith("ING")) protectedTailLen = 3;
      else if (len >= 8 && upper.endsWith("MINEN")) protectedTailLen = 5;
      else if (len >= 7 && upper.endsWith("ТЬСЯ")) protectedTailLen = 4;
      else if (len >= 6 && (upper.endsWith("НИЕ") || upper.endsWith("ТИЕ"))) protectedTailLen = 3;

      const tailStartIdx = w.start + len - protectedTailLen;

      // Собираем доступный пул индексов
      for (let i = 0; i < len; i++) {
        let globalIdx = w.start + i;

        if (openedSet.has(globalIdx)) continue;
        if (i === 0) continue; // ЖЕЛЕЗНО прячем первую букву слова
        if (isFirstStep && protectedTailLen > 0 && globalIdx >= tailStartIdx) continue;

        pool.push(globalIdx);
      }

      if (pool.length === 0) return;

      let toReveal = Math.ceil(pool.length * localPercentage);
      // Платный 🎲: минимум +2 буквы на словах 5+, если пул позволяет
      if (!isFirstStep && len >= 5 && pool.length >= 2) {
        toReveal = Math.max(2, toReveal);
      }
      toReveal = Math.min(pool.length, Math.max(1, toReveal));

      for (let k = 0; k < toReveal && pool.length > 0; k++) {
        let rand = Math.floor(Math.random() * pool.length);
        openedSet.add(pool[rand]);
        pool.splice(rand, 1);
      }
    });
  }
}
