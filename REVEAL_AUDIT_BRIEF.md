# Аудит экономики раскрытия (10 vs 15 очков) — Rather Party

Консолидированный бриф: механика, экономика и код системы раскрытия
замаскированных слов в фазе угадывания. Файл самодостаточен —
ключевой код вшит verbatim.

---

## 1. Общая информация о проекте

**Rather Party** — мобильная пати-игра «Would You Rather» для одного
экрана (per-phone online через WebSocket-relay тоже есть).
Vanilla JS ES-модули, без фреймворка и без сборки. 2–4 игрока,
локали EN / RU / FI, офлайн-PWA (service worker + локальный QR).

**Цикл раунда:**
1. **PICKER** собирает вопрос из фрагментов (`fragments[].options[]`
   в question DB; опции связываются через `type`/`requires`).
2. **RESPONDER** вводит два секретных слова в слоты `[ ... ]` и
   тайно выбирает одно из них.
3. **GUESSING** — каждый угадчик по очереди видит вопрос с двумя
   замаскированными словами-карточками и выбирает, что выбрал
   респондер. Угадчиков `players - 1` (пикер тоже угадывает).
4. **ROUND_RESULT** → следующий угадчик или следующий раунд.

**Файлы системы:**
- `src/core/GameConfig.js` — все константы экономики
- `src/core/WordShifter.js` — движок маскировки/раскрытия (197 строк, ниже целиком)
- `src/main.js` (~3450 строк) — оркестрация: `applyBuyHint`,
  `applyEnterGuesser`, `applyMakeGuess`, `revealTailIndices`,
  `setupRevealButtons`, определение `shouldNerf`
- `src/data/nerfWords.js` — 12 категорий «простых слов» × 3 локали
- `src/i18n/morphology.js` — словомодификаторы → бесплатный хвост
- `src/core/GameStateStore.js` — фазы и стейт `S.guess`
- `index.html` ~540–570 — DOM экрана угадчика

---

## 2. Экономика (src/core/GameConfig.js)

```js
export const GAME_CONFIG = {
  START_GOLD: 50,          // стартовый баланс каждого игрока
  FIXED_REWARD: 50,        // фиксированная награда за верный ответ
  REVEAL_RANDOM_COST: 15,  // 🎲 «Random letters»
  REVEAL_LENGTH_COST: 10,  // 📏 «Word length & 1st letters»
  ORAL_HINT_COST: 10       // 💬 устная подсказка (только 2 игрока)
};
```

**Критично:** за неверный ответ штрафа НЕТ —
`if (isCorrect) guesser.gold += FIXED_REWARD;` (main.js:2367).
Потраченные на подсказку очки — единственный риск.

---

## 3. WordShifter.js — движок маскировки (полный код)

```js
import { escapeHTML } from '../utils/sanitize.js';
import { t } from '../i18n/I18nManager.js';

// Структурные знаки: видны сразу, не считаются буквами и работают
// разделителями слов в логике раскрытия. Включает кавычки «»„”" — они
// обрамляют слоты в RU/FI-шаблонах.
const STRUCT_CHARS = new Set("-'«»„“”\"?!.,:;()…/+*".split(''));

export class WordShifter {
  constructor(word1, word2, isNerfed = false, isMultiWord = false) {
    this.orig1 = word1.trim();
    this.orig2 = word2.trim();
    this.openedIndices1 = new Set();
    this.openedIndices2 = new Set();
    this.isNerfed = isNerfed;
    this.isMultiWord = isMultiWord;
    this.isLengthRevealed = false;

    // Автоматически открываем знаки препинания со старта
    const revealPunctuation = (word, openedSet) => {
      for (let i = 0; i < word.length; i++) {
        if (STRUCT_CHARS.has(word[i])) openedSet.add(i);
        // Многословные ответы: пробелы — видимые разделители
        if (this.isMultiWord && word[i] === ' ') openedSet.add(i);
      }
    };
    revealPunctuation(this.orig1, this.openedIndices1);
    revealPunctuation(this.orig2, this.openedIndices2);
  }

  getMaskedWords(highlight1 = null, highlight2 = null) {
    const maskToHtml = (word, openedSet, highlightSet) => {
      let html = "", wordIndex = 0, inGap = false;
      html += `<span class="word-group word-color-${wordIndex % 2}">`;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char === " ") {
          wordIndex++;
          html += `</span><span class="word-group word-color-${wordIndex % 2}">`;
          inGap = false;
        } else if (openedSet.has(i)) {
          const cls = (highlightSet && highlightSet.has(i))
            ? 'revealed-char just-revealed' : 'revealed-char';
          html += `<span class="${cls}">${escapeHTML(char)}</span>`;
          inGap = false;
        } else {
          if (this.isLengthRevealed) {
            html += '<span class="letter-slot">_</span>';
            inGap = false;
          } else {
            if (!inGap) {
              html += `<span class="mystery-chunk">•••</span>`;
              inGap = true;
            }
          }
        }
      }
      html += '</span>';
      if (this.isLengthRevealed) {
        // Unicode-счёт только букв/цифр (\p{L}\p{N})
        const letterCount = (word.match(/[\p{L}\p{N}]/gu) || []).length;
        html += `<span class="word-length-badge">(${letterCount} letters)</span>`;
      }
      return html.replace(/<span class="word-group word-color-\d+"><\/span>/g, '');
    };
    return {
      w1: maskToHtml(this.orig1, this.openedIndices1, highlight1),
      w2: maskToHtml(this.orig2, this.openedIndices2, highlight2)
    };
  }

  autoReveal(isCatchUp = false) {
    // Нёрф для простых слов: 25% вместо 40%
    this._applyRevealLogic(this.isNerfed ? 0.25 : 0.40, true, isCatchUp);
  }

  revealExtraRandom() {
    this._applyRevealLogic(0.40, false, false);
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
          if (isNewWord) { openedSet.add(i); isNewWord = false; }
        }
      }
    };
    openFirst(this.orig1, this.openedIndices1);
    openFirst(this.orig2, this.openedIndices2);
  }

  _applyRevealLogic(basePercentage, isFirstStep, isCatchUp) {
    const processWord = (wordStr, openedSet) => {
      // Разбиваем на слова по пробелам и структурным знакам
      let words = [], currentWord = { start: -1, text: "" };
      for (let i = 0; i < wordStr.length; i++) {
        let char = wordStr[i];
        if (char === ' ' || STRUCT_CHARS.has(char)) {
          if (currentWord.text.length > 0) {
            words.push(currentWord); currentWord = { start: -1, text: "" };
          }
        } else {
          if (currentWord.start === -1) currentWord.start = i;
          currentWord.text += char;
        }
      }
      if (currentWord.text.length > 0) words.push(currentWord);

      words.forEach(w => {
        let len = w.text.length;
        let pool = [];
        let localPercentage = basePercentage;
        if (isFirstStep && isCatchUp) localPercentage += 0.10;
        const endsWithIng = w.text.toUpperCase().endsWith("ING");
        const ingStartIdx = w.start + len - 3;
        // Пул доступных индексов
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
  // toJSON / fromJSON — сериализация маски для онлайн-синка
}
```

---

## 4. Типы раскрытия — сводка механики

| Тип | Цена | Что делает | Особенности |
|---|---|---|---|
| **0. Авто-ревил** | бесплатно | 40% букв **каждого слова** (25% при нёрфе) при входе угадчика | per-word; первая буква слова защищена; суффикс `-ING` защищён; catch-up `lastGuessCorrect===false` → +10%; `ceil(pool×pct)`, мин. 1 |
| **1. 🎲 Random letters** | **−15** | +40% от **оставшегося** пула каждого слова | `isFirstStep=false` → защита `-ING` снята; первая буква всё ещё защищена |
| **2. 📏 Length & 1st** | **−10** | `_`-слоты + бейдж `(N letters)` + **открывает первую букву каждого слова** | Снимает «железную» защиту первых букв; unicode-счёт `\p{L}\p{N}` |
| **3. 💬 Oral hint** | **−10** | Респондер устно даёт одну ассоциацию | Только `players===2`; только при `revealCount>=2` (после платной покупки!); 1 раз/ход |
| **4. Хвост модификатора** | бесплатно | Если шаблон имеет `-изм`/`-ляндия`/`-la`/`-maa` и т.п., добавленный суффикс открыт сразу | `revealTailIndices` — последние N букв слова; пер-локально разный хвост |

**Пунктуация и кавычки** `-'«»„""?!.,:;()…/+*` открыты сразу и служат
разделителями слов при per-word расчёте. Пробелы открыты только для
многословных ответов.

---

## 5. Оркестрация (verbatim-выдержки из main.js)

**Вход угадчика — бесплатный ревил + gating:**
```js
function applyEnterGuesser() {
  const guesser = game.players[S.guess.currentGuesserIndex];
  if (S.guess.revealCount === 0) {
    const isCatchUp = guesser.lastGuessCorrect === false;
    shifter.autoReveal(isCatchUp);
    S.guess.revealCount = 1;
    syncMask();
  }
  store.setPhase(GamePhase.GUESSING);
}
```

**Одна платная подсказка за ход (клиент + хост):**
```js
function setupRevealButtons(isActive) {
  const randBtn = document.getElementById('ability-extra-rand-btn');
  const lengthBtn = document.getElementById('ability-length-btn');
  const disabled = S.guess.revealCount !== 1;   // только после бесплатного
  if (randBtn) randBtn.disabled = disabled;
  if (lengthBtn) lengthBtn.disabled = disabled;
  ...
}

function tryBuyHint(revealType) {
  const cost = revealType === 'random'
    ? GAME_CONFIG.REVEAL_RANDOM_COST : GAME_CONFIG.REVEAL_LENGTH_COST;
  const guesser = game.players[S.guess.currentGuesserIndex];
  if (cost > 0 && guesser.gold < cost) {
    screens.showAlert(t('alerts.notice'), t('guesser.notEnough'));
    return;
  }
  dispatchAction({ type: 'BUY_HINT', kind: revealType });
}

function applyBuyHint(action) {
  const guesser = game.players[S.guess.currentGuesserIndex];
  if (action.kind === 'oral') {
    if (S.guess.oralHintUsed || game.players.length !== 2) return;
    if (guesser.gold < GAME_CONFIG.ORAL_HINT_COST) return;
    guesser.gold -= GAME_CONFIG.ORAL_HINT_COST;
    S.guess.oralHintUsed = true;
    syncMatch();
    S.live.oralHint = { guesserIdx: S.guess.currentGuesserIndex, ts: Date.now() };
    store.setState({ live: S.live });
    return;
  }
  const cost = action.kind === 'random'
    ? GAME_CONFIG.REVEAL_RANDOM_COST : GAME_CONFIG.REVEAL_LENGTH_COST;
  if (S.guess.revealCount !== 1) return;        // одна платная подсказка за ход
  if (cost > 0 && guesser.gold < cost) return;
  if (cost > 0) { guesser.gold -= cost; syncMatch(); }
  if (action.kind === 'random') shifter.revealExtraRandom();
  else if (action.kind === 'length') shifter.revealLength();
  syncMask();
  S.guess.revealCount++;
  S.live.lastReveal = { kind: action.kind, ts: Date.now() };
  store.setState({ guess: S.guess, live: S.live });
}
```

**Устная подсказка — UI-условие (main.js:2197):**
```js
const showOral = game && game.players.length === 2
  && S.guess.revealCount >= 2        // только ПОСЛЕ платного ревила!
  && !S.guess.oralHintUsed && isActiveGuesser();
```

**Начисление (main.js:2367):**
```js
if (isCorrect) guesser.gold += GAME_CONFIG.FIXED_REWARD;
// штрафа за промах НЕТ; guesser.lastGuessCorrect = isCorrect
```

**Новый ход угадчика — свежая маска (main.js:1901):**
```js
shifter = new WordShifter(shifter.orig1, shifter.orig2,
  shifter.isNerfed, shifter.isMultiWord);   // маска сброшена
// хвосты суффиксов открываются заново, S.guess.revealCount = 0
```

**Бесплатный хвост модификатора (main.js:1836):**
```js
function revealTailIndices(word, tail, openedSet) {
  if (!tail || !word.toUpperCase().endsWith(String(tail).toUpperCase())) return;
  for (let i = 1; i <= tail.length; i++)
    openedSet.add(word.length - i);
}
```

**Определение нёрфа (main.js:1716–1743):** `isNerfed=true`, если любой
токен ответа входит в простые категории (цвета / материалы+в-обоих /
настроения+в-обоих / эпохи / страны / города / еда / спорт /
профессии / овощи / фрукты / одежда — `nerfWords.js`, EN+RU+FI).
Многословные ответы (`isMultiWord`) нёрфа не имеют.

---

## 6. UI-строки кнопок (ui.en.js)

```js
revealRand: 'Random letters',
revealLen: 'Word length & 1st letters',
rollStatus: '💡 One reveal per turn: 🎲 -{a} / 📏 -{b} pts',
rollSpent: '🔒 Reveal spent',
winPts: 'Win: +{n} points',
oralBtn: '💬 Ask for oral hint (-{n} pts)',
maskCaption: '••• hides any number of letters',
lettersBadge: '({n} letters)',
```

Кнопки: `#ability-extra-rand-btn`, `#ability-length-btn`,
`#oral-hint-btn` (index.html ~557–566). После покупки кнопка
«сгорает» (`.burned` → `hidden`).

---

## 7. Наблюдения для аудита

1. **Инверсия цена/сила.** 📏 за 10 даёт ВСЕ первые буквы + точную
   длину каждого слова + структуру — для коротких слов это
   информативнее, чем +40% случайных за 15 (который первую букву
   не откроет никогда).
2. **Одна покупка за ход.** 📏 и 🎲 нельзя скомбинировать — цена
   должна отражать среднюю, а не маржинальную силу.
3. **Убывающая отдача 🎲.** 40% от *остатка* пула: после
   бесплатных 40% ≈ +24% от исходного слова (при нёрфе ~30%).
4. **Край `-ING`.** Защита суффикса действует только на
   бесплатном шаге — платный 🎲 может открыть `-ing` (EN).
5. **Воронка устной подсказки.** Номинал −10, но доступ только
   после платного ревила → реальный порог входа 20–25 pts.
6. **Нет штрафа за промах.** Подсказка — чистый расход vs
   бесплатная догадка 50/50; покупать рационально только если
   она реально повышает шанс на +50.
7. **Нёрф влияет только на бесплатный ревил.** Платные типы от
   нёрфа не зависят → у «простых» слов платный ревил
   относительно сильнее.
8. **Per-word процент.** `ceil(pool×0.4)`: слово из 2 букв → 1
   открытая (50%+), из 15 букв → ~40%; морфологические дефисы
   (`СОБАКО-ГРАД`) дробят ответ на «слова».
9. **Ожидание.** Старт 50, +50 за ответ, −10/−15 за подсказку:
   верный ответ с 🎲 ≈ +35 net vs +50 без подсказки.
10. **Оба слова раскрываются одновременно.** Подсказка открывает
    буквы в обоих вариантах (W1 и W2) — информация симметрична,
    но угадывается лишь одно слово.

## 8. Вопросы для аудита

- Соответствует ли 10/15 реальной информационной ценности типов
  на распределении длин слов в `questions.js`/`questions.ru.js`/
  `questions.fi.js` (brainstorm-списки ~90 категорий × 3 локали)?
- Стоит ли поменять цены, ввести динамическую цену (длина,
  многословность, нёрф), или открыть обе покупки за ход?
- 📏 и первая буква: осознанный дизайн или дыра против
  «железной» защиты типов 0–1?
- Ожидаемая ценность каждого типа в симуляции: % угаданных
  после бесплатного ревила vs после 🎲 vs после 📏?

---

## Приложение: рекомендуемые файлы к брифу

См. список в ответе агента — основные данные для симуляции лежат
в question DB (`PROMPTS.*.brainstorm` — реальные слова игроков).
