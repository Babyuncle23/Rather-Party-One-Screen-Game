export class WordShifter {
  constructor(word1, word2) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
  }

  getTotalLength() {
    return this.orig1.length + this.orig2.length;
  }

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

  // Reveal Type 1: Positional (first, middle, last)
  revealPositional(intensity = 1) {
    const totalLen = this.getTotalLength();
    const revealPositions = (word, openedSet) => {
      const len = word.length;
      if (len === 0) return;
      const positions = new Set();

      // New reveal rules:
      // - Initial reveal (intensity === 1): start+middle for medium words,
      //   end+middle for very short words (<=4), and first+middle+last for very long words (>=10).
      // - Second reveal (intensity >= 2): reveal first and last, include middle and extra
      //   positions for longer words.

      const firstIdx = 0;
      const lastIdx = len - 1;
      const middleIdx = Math.floor((len - 1) / 2);

      if (intensity === 1) {
        // Tuned thresholds:
        // - very short words (<=3): reveal end + middle
        // - medium words (4-8): reveal start + middle
        // - long words (>=9): reveal start + middle + end
        if (len <= 3) {
          positions.add(lastIdx);
          positions.add(middleIdx);
        } else if (len >= 9) {
          positions.add(firstIdx);
          positions.add(middleIdx);
          positions.add(lastIdx);
        } else {
          positions.add(firstIdx);
          positions.add(middleIdx);
        }
      } else {
        // intensity >=2: reveal more aggressively with tuned extra cutoffs
        positions.add(firstIdx);
        if (len > 1) positions.add(lastIdx);
        if (len > 2) positions.add(middleIdx);
        if (len > 6) positions.add(Math.floor((len - 1) / 3));
        if (len > 9) positions.add(Math.ceil(2 * (len - 1) / 3));
      }

      Array.from(positions).forEach(idx => {
        if (idx >= 0 && idx < len && word[idx] !== " ") openedSet.add(idx);
      });
    };

    revealPositions(this.orig1, this.openedIndices1);
    revealPositions(this.orig2, this.openedIndices2);
  }

  // Reveal Type 2: Random percentage (scales with length)
  revealRandom(intensity = 1) {
    const totalLen = this.getTotalLength();
    
    // Calculate percentage based on intensity and total length
    let percentage = 0;
    if (intensity === 1) {
      if (totalLen <= 6) percentage = 0.5;
      else if (totalLen <= 10) percentage = 0.4;
      else percentage = 0.3;
    } else if (intensity >= 2) {
      if (totalLen <= 6) percentage = 1.0;
      else if (totalLen <= 10) percentage = 0.7;
      else percentage = 0.5;
    }

    // Collect closed (hidden) indices for both words
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

    // Distribute reveals proportionally between the two words
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

  // Reveal Type 3: Vowels or Consonants (whichever is fewer)
  revealLetterType(intensity = 1) {
    const countVowels = (word) => {
      let count = 0;
      const vowels = 'aeiouAEIOU';
      for (const char of word) {
        if (vowels.includes(char)) count++;
      }
      return count;
    };

    const totalVowels = countVowels(this.orig1) + countVowels(this.orig2);
    const totalConsonants = this.getTotalLength() - totalVowels;
    const revealVowels = totalVowels <= totalConsonants;

    let numberToReveal = 0;
    if (intensity === 1) {
      numberToReveal = Math.max(2, Math.ceil((revealVowels ? totalVowels : totalConsonants) * 0.4));
    } else if (intensity >= 2) {
      numberToReveal = Math.max(3, Math.ceil((revealVowels ? totalVowels : totalConsonants) * 0.7));
    }

    // If there are no target letters, fall back to revealing randomly
    const totalTarget = revealVowels ? totalVowels : totalConsonants;
    if (totalTarget === 0) {
      this.revealRandom(intensity);
      return;
    }

    // Distribute numberToReveal across the two words proportionally to how many
    // target letters each word contains, ensuring at least 0 and not exceeding
    // available targets.
    const countTargetIn = (word) => {
      const vowels = 'aeiouAEIOU';
      let c = 0;
      for (const ch of word) {
        if (ch === ' ') continue;
        const isV = vowels.includes(ch);
        if ((revealVowels && isV) || (!revealVowels && !isV)) c++;
      }
      return c;
    };

    const t1 = countTargetIn(this.orig1);
    const t2 = countTargetIn(this.orig2);
    let toReveal1 = Math.round(numberToReveal * (t1 / (t1 + t2 || 1)));
    let toReveal2 = numberToReveal - toReveal1;
    if (t1 === 0) { toReveal1 = 0; toReveal2 = numberToReveal; }
    if (t2 === 0) { toReveal2 = 0; toReveal1 = numberToReveal; }

    const revealTargetsIn = (word, openedSet, count) => {
      const vowels = 'aeiouAEIOU';
      const pool = [];
      for (let i = 0; i < word.length; i++) {
        if (!openedSet.has(i) && word[i] !== "") {
          const isV = vowels.includes(word[i]);
          if ((revealVowels && isV) || (!revealVowels && !isV)) pool.push(i);
        }
      }
      for (let i = 0; i < count && pool.length > 0; i++) {
        const rand = Math.floor(Math.random() * pool.length);
        openedSet.add(pool[rand]);
        pool.splice(rand, 1);
      }
    };

    revealTargetsIn(this.orig1, this.openedIndices1, toReveal1);
    revealTargetsIn(this.orig2, this.openedIndices2, toReveal2);
  }

  // Helper to get dynamic description for a reveal type based on length
  getPositionalDescription(intensity = 1) {
    const totalLen = this.getTotalLength();
    if (intensity === 1) {
      return `Reveal start and middle letters`;
    } else {
      if (totalLen <= 6) return `Reveal first, middle, and last letters`;
      else if (totalLen <= 10) return `Reveal first, middle, last + one`;
      else return `Reveal first, middle, last + more`;
    }
  }

  getRandomDescription(intensity = 1) {
    const totalLen = this.getTotalLength();
    if (intensity === 1) {
      if (totalLen <= 6) return `50% of letters`;
      else if (totalLen <= 10) return `40% of letters`;
      else return `30% of letters`;
    } else {
      if (totalLen <= 6) return `All letters`;
      else if (totalLen <= 10) return `70% of letters`;
      else return `50% of letters`;
    }
  }

  getLetterTypeDescription(intensity = 1) {
    const countVowels = (word) => {
      let count = 0;
      const vowels = 'aeiouAEIOU';
      for (const char of word) {
        if (vowels.includes(char)) count++;
      }
      return count;
    };

    const totalVowels = countVowels(this.orig1) + countVowels(this.orig2);
    const totalConsonants = this.getTotalLength() - totalVowels;
    const revealVowels = totalVowels <= totalConsonants;

    const type = revealVowels ? 'vowels' : 'consonants';
    
    if (intensity === 1) {
      return `${Math.max(2, Math.ceil((revealVowels ? totalVowels : totalConsonants) * 0.4))} ${type}`;
    } else {
      return `Most ${type}`;
    }
  }
}