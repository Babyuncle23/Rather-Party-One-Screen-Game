# Rather Party — аудит геймплея и архитектуры

> Документ-хендoff для другого ИИ-чата. Описывает что делает игра, как устроена,
> где лежит контент, какие есть баги и куда смотреть в первую очередь.
> Скриншоты игрового цикла лежат в папке `screenshots/` рядом с этим файлом.

---

## 1. Что это за проект

**Rather Party** — локальная party-игра «на один экран» (pass-and-play): 2–4 игрока
передают один телефон друг другу. Гибрид «Would You Rather» и «угадай слово».

- Чистый vanilla HTML/CSS/JS, ES-модули, **без сборки и без зависимостей**.
- Хостится как статика (на проде — GitHub Pages: `babyuncle23.github.io/Rather-Party-One-Screen-Game/`).
- PWA-обвязка: `manifest.json`, регистрация `sw.js` (файл пустой — см. баги).
- Язык UI — английский, комментарии в коде — русский.
- Запуск локально: любой статик-сервер, напр. `python -m http.server` → `/index.html`.
  **Через `file://` работать не будет** (ES-модули).

## 2. Карта файлов

| Файл | Строк | Роль |
|---|---|---|
| `index.html` | 483 | Все экраны и модалки в одном файле, много inline-стилей |
| `src/main.js` | 2231 | **Главный оркестратор** — фактически god-object: состояние игры, все обработчики, генератор сцен |
| `src/core/Match.js` | 115 | Модель матча: игроки, раунды, очередь вопросов, комбо-очередь, история |
| `src/core/WordShifter.js` | 156 | Механика маскирования/открытия букв ответов |
| `src/data/questions.js` | 970 | База: `PROMPTS` (~110 тем) + `questionsDatabase` (24 вопроса + 7 комбо) |
| `src/data/scenes.js` | 2682 | `SCENE_REGISTRY` — ~30 JSON-сцен для result-модалки (генерируется редактором `scene-tester.html`) |
| `src/data/nerfWords.js` | 57 | Списки «простых» слов для нёрфа (см. баги — механика мёртвая) |
| `src/ui/ScreenController.js` | 158 | Переключение экранов, pass-screen, кастомный alert, кнопка звука |
| `src/audio/AudioManager.js` | 843 | Пулы `<audio>`, WebAudio для reveal-звуков, TTS-очередь, транслит «Finglish» |
| `style.css` | 2709 | Тёмная тема на CSS-переменных, все анимации (`anim-*` для сцен тут) |
| `sw.js` | 0 | Пустой service worker |
| `tester.html`, `tester_word_difficulty.html`, `finglish-tester.html`, `scene-tester.html` | — | Ручные QA-харнессы (не e2e-тесты): тестер раундов, баланс слов, транслит Finglish, **редактор сцен** |
| `src/ui/*.jpg/gif/png` | — | Мемы/фоны для сцен |
| `src/audio/*` | — | ~20 mp3/ogg: клики, win/lose, фанфары, sfx для сцен |

Git-репозитория в папке нет. `todo.txt`: «дать другу затестить / начать делать версию сетевую / отображение ривилов».

## 3. Игровой цикл (геймплей)

Роли в раунде: **Picker** (выбирает), **Responder** (отвечает), **Guessers** (угадывают —
все остальные, включая пикера; Responder не угадывает, но «can watch»).

```
setup → [pass phone → picker] → [pass phone → responder] → [pass phone → guesser₁...ₙ]
      → next turn (pickerIndex+1) → ... → currentRound > totalRounds → final
```

1. **Setup** (`#setup-screen`): добавление игроков (имя → uppercase, случайный эмодзи-
   аватар, тап по аватару → emoji-picker), число раундов (default 1), тоглы
   Screen Reader / Rally English / Advanced Mode, кнопка туториала (YouTube iframe).
   Минимум 2 игрока.
2. **Pass phone** (`#pass-screen`): полноэкранная «PASS THE PHONE TO 🦊 BOB» + TTS-
   озвучка передачи. Тап = продолжить.
3. **Picker** (`#picker-screen`): карусель из **3 сгенерированных вопросов** (каждый —
   шаблон с рандомно выбранными вариантами фрагментов) + карусель **до 5 промптов-подсказок**
   вида «Name two: X (modifier)». Промпт = тема для двух ответов Responder'а
   (напр. «singer», «funny-looking animal»). Advanced Mode открывает редактирование
   текста вопроса и свой промпт.
4. **Responder** (`#responder-screen`): видит промпт (+ спойлер «💡 Ideas» с brainstorm-
   подсказками), вводит 2 слова (max 25 символов), затем выбирает одно из них —
   «Now choose». Выбор и есть секретный ответ, который угадывают.
5. **Guesser** (`#guesser-screen`) — по очереди каждый: видит промпт + текст вопроса,
   где оба ответа **замаскированы** (`WordShifter`). Бесплатно открыто ~40% букв
   (+10% если прошлый guess был неверным — catch-up). Одна платная подсказка за ход:
   - 🎲 «Random letters» — ещё ~40% (−15 pts)
   - 📏 «Word length & 1st letters» — длины слов + первые буквы (−15 pts)
   - 💬 «Oral hint» — устная подсказка от Responder'а (−10 pts, только для 2 игроков)
   Тап по одному из двух masked-слов = guess.
6. **Result-модалка**: правильно → +50 pts; показывается сгенерированная **сцена**
   (`generateVisualScene`) — абсолютно-позиционированные эмодзи/текст/картинки из
   `SCENE_REGISTRY` с анимациями и scene-sfx; эмодзи игроков подставляются в сцену,
   победителям рисуются очки 😎, проигравшим слеза.
7. **Финал** (`#final-screen`): лидерборд, история выборов по игрокам, TTS-оглашение
   победителя + фанфары, кнопка «Play Again».

### Экономика
Старт 50 pts. Win +50. Reveal −15 (один раз за ход). Oral hint −10.
`FIXED_REWARD = 50` и цена 15 захардкожены в `main.js`.

### Комбо-система
У части вопросов `canTriggerCombo: true`. При выборе Responder'а `setQueuedCombo`
с вероятностью **40%** (`Math.random() > 0.6` → return) ставит в очередь комбо-вопрос
(id 101–107): следующий вопрос будет ссылаться на прошлый ответ через `[PREV_CHOICE]`
(напр. «As the supreme leader of X…»). Макс. 1 комбо за игру.

### Психологическая безопасность (уникальная фича)
Кнопка «Safety» → 3-экранная модалка: инфо-экран → 4 опции (каждая требует
**удержания 2 сек**): Skip This Round (откат очков раунда через `roundScoresSnapshot`),
Open Circle, Stop Match, Anonymous Exit Timer (отложенный стоп через N минут).

### Дополнительно
- **Rally English**: TTS переключается на `fi-FI` и текст прогоняется через
  `toFinglish()` — ~500-строчный словарь + регулярки транслита «финский акцент».
- **Screen Reader mode**: глушит авто-TTS.
- **Advanced Mode**: кастомные промпты + редактирование вопроса, сохраняется в
  localStorage (`advancedModeEnabled`).
- **PWA**: кнопка установки (iOS-инструкция / `beforeinstallprompt`), QR-код «поделиться».
- Суффиксы/префиксы вопросов: `ism/land/ville/field`, `The Republic of` —
  модифицируют введённые слова (напр. `PIZZA` → `PIZZISM`), суффикс открывается
  угадывающим сразу.

## 4. Схемы данных

**Question** (`questionsDatabase`):
```js
{ id, category, canTriggerCombo?, isCombo?, triggerCategory?,
  text: "Would you rather",
  fragments: [ { options: [ { text, type?, requires?: [type], scene?, hints?: [PROMPT] } ] } ],
  hints: [PROMPT] }
```
- `[ ... ]` — два плейсхолдера для ответов; `[PICKER]`, `[RESPONDER]`, `[PREV_CHOICE]` — подстановки.
- `requires` — вариант фрагмента валиден, если среди ранее выбранных `type` есть нужный
  (`getValidFragmentOptions`).

**Prompt** (`PROMPTS`): `{ text, modifiers?: string[], brainstorm?: string[], isPlural? }`.
`updatePickerHints` собирает hints вопроса + hints выбранных опций фрагментов,
перемножает с modifiers, перемешивает, берёт 5 в карусель.

**Scene** (`SCENE_REGISTRY[key]`): `{ sfx, bg: {url|local, x, y, s, cover},
elements: [{type: text|emoji|image, content, x, y, s, r, flipX, anim, color, emo.enabled, ...}] }`.
Плейсхолдеры в content: `[PICKER]/[RESPONDER]/[GUESSER]` (эмодзи), `[*_NAME]`,
`[GUESS_WORD]`, `[UNCHOSEN_WORD]`, `[PREV_CHOICE]`, `[SMART_PROP]` (эвристика
`getSmartProp`: слово→эмодзи). `emo.enabled` → оверлей очков/слезы по `EYE_ANCHORS`.

## 5. Архитектура: сильные стороны

- **Data-driven контент**: вопросы, промпты и сцены — декларативные структуры;
  новый контент добавляется без правки логики.
- Внятное разделение `core / ui / audio / data`.
- `WordShifter` — маленький чистый класс с хорошо изолированной механикой.
- Продуманный UX pass-and-play: pass-screen с TTS, «can watch», приватность.
- Нетривиальные фичи для pet-проекта: safety-система с откатом очков, транслит-
  акцент, генератор сцен, catch-up для проигравших, редактор сцен.
- Ноль зависимостей → нет supply-chain риска, работает как статика везде.

## 6. Проблемы архитектуры (важно для следующего ИИ)

### Критичное / баги
1. **`window.audioManager` никогда не присваивается** — звуки клика в туториале и
   кнопке Install мёртвые (`if (window.audioManager)` всегда false). Переменная
   `audioManager` существует только в module scope.
2. **Дублированный ветвь `stop-direct`** в `executeSafetyAction` (main.js ~646 и ~650):
   первая ветка мёртвая; вторая обращается к `game.players` без null-check — при
   вызове safety до старта матча упадёт.
3. **Дублирующийся ключ `"dog"`** в `SCENE_REGISTRY` (scenes.js ~808 и ~961) —
   вторая сцена молча перезаписывает первую.
4. **`WordShifter` получает 4-й аргумент `isMultiWord`, но конструктор принимает 3**
   — флаг теряется; кроме того `isNerfed` сохраняется, но **нигде не используется**
   в логике маскирования → вся nerf-механика (`nerfWords.js`, ~25 строк детектов в
   `startResponderPhase`) сейчас мёртвый код.
5. **XSS через пользовательский ввод**: имена игроков и кастомные промпты попадают
   в `innerHTML` без экранирования (имя-аватар, история, `showAlert`). В контексте
   pass-and-play это self-XSS, но при переходе к сетевой версии станет уязвимостью.
6. **`sw.js` пустой**, но регистрируется — PWA-офлайн не работает, хотя подразумевается.
7. **`typeof updateStatsBarVisibility` внутри `ScreenController.switchScreen`**
   всегда `'undefined'` (функция живёт в module scope main.js, не на window) —
   мёртвый коллбек.
8. `comboDatabase` пуст → `JSON.parse(JSON.stringify(undefined))` креш; сейчас
   не случается, но хрупко. `checkFinnishVoiceExistsAsync`: комментарий «2.5s»,
   таймаут 5000ms.

### Структурное
- **`main.js` — god-object 2231 строки**: состояние в ~20 module-level переменных,
  часть дублируется на `window.*` (`promptHistory`, `generatedQuestions`,
  `viewIndex`, `questionRequiresPlural`…). Нет state machine — переходы размазаны
  по функциям, которые заново навешивают `.onclick` каждый раунд.
- UI и логика сплавлены: вопросы рендерятся конкатенацией строк с inline-стилями;
  `index.html` на 40% состоит из `style="..."`; `switchScreen` управляет видимостью
  и `classList.toggle`, и `style.display` одновременно.
- Жёсткая связанность: `ScreenController` знает про `#safety-global-btn`,
  `updateStatsBarVisibility`, `window.game`; `main.js` дергает DOM напрямую везде.
- Нет единого события/шины: `passPhoneWithSpeech(player, callback)` — единственный
  механизм переходов; вложенные коллбеки через `screens.showAlert(..., onConfirm)`.
- i18n отсутствует; строки разбросаны по HTML/JS; в UI опечатка «Desgned by Human».
- Внешние зависимости в рантайме: Google Fonts, YouTube iframe, `api.qrserver.com`
  — без сети деградирует молча; для privacy-sensitive party-игры спорно.
- Нет автоматических тестов; только ручные tester-страницы. Нет CI, линта, форматтера.
- `scenes.js` генерируется редактором — ручные правки легко потерять; дубль `"dog"`
  уже демонстрирует проблему.

### Геймплей/баланс
- Reveal только один за ход (`revealCount === 1` → disabled): дизайн-ограничение,
  но `getButtonState` и UI «-15 pts» дублируют цену в 2 местах.
- Баланс не верифицируется кодом: FIXED_REWARD/цены — магические числа.
- Первые буквы слов жёстко скрыты (`i === 0` skip) — осознанно, но в сочетании с
  мёртвым nerf-флагом фактическая сложность слов не регулируется.
- Комбо 40% может выпасть на 1-м же раунде и ссылаться на ответ, который видел
  только Responder — для новых игроков выглядит странно.

## 7. Куда смотреть в первую очередь (для другого ИИ)

| Задача | Точка входа |
|---|---|
| Игровой цикл, переходы | `main.js`: `initRound` → `selectHint` → `startResponderPhase` → `confirmResponderChoice` → `setupNextGuesser` → `startGuesserPhase` → `makeGuess` → `showFinalScores` |
| Новый вопрос | `questions.js`: объект по схеме выше; `scene:` опционален, `hints` — ссылки на `PROMPTS.*` |
| Новый промпт-тема | `PROMPTS` в начале `questions.js`; `modifiers` размножают варианты, `brainstorm` кормит «💡 Ideas» |
| Новая сцена | `scene-tester.html` → экспорт JSON → `SCENE_REGISTRY`; анимации = CSS-классы `anim-*` в `style.css` |
| Скоринг/цены | `FIXED_REWARD`, `getButtonState`, `oral-hint-btn` в `main.js`; `gold` в `Match` |
| Маскирование | `WordShifter`: `autoReveal`, `revealExtraRandom`, `revealLength`, `getMaskedWords` |
| Аудио/TTS/Finglish | `AudioManager`: `speak`, `speakAsync`, `toFinglish`, `playRevealCombo` |
| Safety | `setupPsychologicalSafetySystem`, `executeSafetyAction`, `roundScoresSnapshot` |

## 8. Рекомендации (приоритет)

1. **Декомпозиция `main.js`**: вынести состояние раунда в класс/стор, сделать явный
   state machine (экраны уже фактически enum в `ScreenController`).
2. Починить мёртвое: `window.audioManager`, nerf-флаг, дубль `stop-direct`, дубль
   `"dog"`, пустой `sw.js` (либо наполнить офлайн-кэшем, либо убрать регистрацию).
3. Экранировать весь пользовательский ввод перед `innerHTML` (или `textContent`
   там, где HTML не нужен) — обязательно перед сетевой версией из todo.
4. Вычистить inline-стили из `index.html`/JS в CSS-классы; `switchScreen` оставить
   только класс `.hidden`.
5. Вынести экономику в конфиг (`{ startGold, reward, revealCost, oralCost }`).
6. Убрать `window.*`-прокси (promptHistory и пр.) в module state + функции.
7. Тесты: `WordShifter` и `Match` легко покрываются unit-тестами (node --test),
   игровой цикл — одним e2e (puppeteer): это и есть самый дешёвый регресс-стоппер.

## 9. Скриншоты

`screenshots/` — 9 кадров реального игрового цикла (headless Chrome, mobile
viewport 390×844 @2x, 2 игрока / 1 раунд):

| Файл | Что показано |
|---|---|
| `01-setup.png` | Экран настройки: 2 игрока с эмодзи-аватарами, тоглы режимов, раунды, QR |
| `02-safety-modal.png` | Модалка Safety: 4 опции с hold-to-confirm, одна раскрыта |
| `03-pass-phone.png` | Экран передачи телефона пикеру |
| `04-picker.png` | Ход пикера: карусель вопросов 1/3 + карусель промптов 1/5 |
| `05-responder.png` | Ход респондера: промпт + 2 ввода слов со счётчиками |
| `06-responder-choice.png` | «Now choose»: собранный вопрос + 2 ответа на выбор |
| `07-guesser.png` | Ход угадывающего: промпт, замаскированные ответы, кошелёк, платные reveal-опции |
| `08-result-scene.png` | Result-модалка «CORRECT!»: score, сгенерированная сцена с эмодзи игроков |
| `09-final.png` | Финал: лидерборд + история выборов по игрокам |
