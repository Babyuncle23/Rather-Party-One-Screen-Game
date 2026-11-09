# Rather Party — аудит интерфейса (UI review)

> Документ-хендoff для другого ИИ-чата. Фокус — только UI/UX: экраны, состояния,
> вёрстка, accessibility. Архитектура и геймплей разобраны в `AUDIT.md` рядом.
>
> Скриншоты: `screenshots/ui-audit/` — 8 кадров актуального UI + 1 бонусный.
> Сняты автоматически (headless Chrome, viewport **390×844 @2x**, локаль EN,
> соло-режим pass-and-play, 2 игрока, Screen Reader mode ON — чтобы не было TTS).

---

## 1. Скриншоты и что на них смотреть

| # | Файл | Экран | Ключевые элементы |
|---|------|-------|-------------------|
| 1 | `ui-01-setup.png` | Setup | Панель Safety+⚙️, lang-pills EN/RU/FI, переключатель «1 Phone / 2–4 Phones», инпут имени + список игроков с эмодзи-аватарами и ✕ |
| 2 | `ui-02-settings.png` | Settings modal | 3 кастомных чекбокса: Screen Reader / Rally English / **Advanced Mode** (здесь живёт тогл редактирования вопросов) |
| 3 | `ui-03-picker.png` | Picker | Step-1 инфобокс (dashed teal), карусель вопроса `1/3` со стрелками, серая кнопка «✍️ EDIT THE QUESTION» (видна только в Advanced), step-2 инфобокс, карусель промптов `1/5` |
| 4 | `ui-04-edit-question.png` | Редактор вопроса | Тогл стал «← CANCEL EDITING»; 3 textarea разделены маркерами `[ ANSWER 1 ]` / `[ ANSWER 2 ]`; кнопка «Save Changes» |
| 5 | `ui-05-responder.png` | Responder (слова) | Промпт «Name two: Wild animal», кнопка «💡 Ideas» (спойлер-подсказки), «BLIND STEP 1/2» баннер, 2 инпута со счётчиками `0/35`, «Submit Answers» |
| 6 | `ui-06-responder-choice.png` | Responder (выбор) | Бейджи слов с 🔒, «BLIND STEP 2/2», собранный вопрос с подставленными ответами, 2 крупные choice-кнопки |
| 7 | `ui-07-guesser.png` | Guesser | Промпт-плашка, вопрос с инлайн-замаскированными ответами (точки), «WALLET … SCORE: 50», «REVEAL OPTIONS», 2 платные кнопки (-15 / -10 pts) |
| 8 | `ui-08-result.png` | Result modal | «🎉 CORRECT!», score `50 → 100`, **сгенерированная сцена** (эмодзи-фейс + очки-аватар), карточка «Your guess» с подсветкой слов |
| + | `ui-09-pass-phone.png` | Pass screen (бонус) | Фуллскрин «PASS THE PHONE TO: 💣 BOB», tap-to-continue |

Не покрыто скриншотами (есть в коде): `#lobby-screen` и `#companion-screen`
(онлайн-режим), `#safety-modal` (3 экрана + hold-to-confirm), `#final-screen`,
`#emoji-picker-modal`, `#video-modal` (YouTube iframe).

## 2. Карта экранов → код

| Экран | DOM | Рендер-функция (`src/main.js`) |
|---|---|---|
| Setup | `#setup-screen` | `renderSetup` |
| Lobby | `#lobby-screen` | `renderLobby` / `renderLobbyRoster` |
| Picker | `#picker-screen` | `renderPickerActive` (+ `renderInteractiveQuestion`, `updatePickerHints`) |
| Companion (онлайн-ожидание) | `#companion-screen` | `renderCompanionView` |
| Responder words / choice | `#responder-screen` | `renderResponderWordsActive` / `renderResponderChoiceActive` |
| Guesser | `#guesser-screen` | `renderGuessing` |
| Result | `#custom-alert-modal` (переиспольз.) | `renderRoundResult` → `showResultAlert` |
| Final | `#final-screen` | `renderFinalScores` |
| Pass / Loading / Alert | `#pass-screen`, `#loading-screen`, `#custom-alert-modal` | `ScreenController.showPassScreen / showLoading / showAlert` |
| Safety / Settings / Emoji / Video | `#safety-modal`, `#settings-modal`, `#emoji-picker-modal`, `#video-modal` | `setupPsychologicalSafetySystem`, `setupSettingsModal`, emoji-grid, `setupVideoTutorial` |

Переключение экранов: `ScreenController.switchScreen(name)` — тоглит `.hidden`
**и** `style.display` одновременно. Единый рендер-путь: `store.subscribe(() =>
renderLocalView())` — любой `setState` вызывает полный ролевой ре-рендер.

## 3. Найденные проблемы UI (для аудита)

### Состояние и рендер
1. **UI-состояние живёт в DOM, а не в store.** Открытость `edit-question-block`,
   `custom-prompt-block`, выбранный `viewIndex` карусели — всё в `style.display`
   и модули. Любой `store.setState` в фазе PICKING вызывает `renderPickerActive`,
   который жёстко закрывает редактор и кастом-промпт и вызывает
   `applyHistoryState(0)` — карусель **сбрасывается на вопрос 1/3**, при этом
   `S.picker.viewIndex` не обновляется → `currentQuestion` и счётчик расходятся.
   В соло это маскируется (setState приходит только от действий пикера), в онлайне
   любой входящий `STATE_SYNC` сбросит недосохранённое редактирование.
2. **`#custom-alert-modal` перегружен**: обычные alert'ы, ошибки applyAction и
   result-сцена раунда — всё через одну модалку с `onclick` на весь оверлей.
   Grace-период 1.5с захардкожен только в `showResultAlert`.
3. Видимость управляется двумя способами сразу (`.hidden` + `style.display`) —
   в `switchScreen`, и вручную по всему `main.js`/`index.html`. Легко получить
   «полуоткрытый» элемент.

### Вёрстка и стили
4. **`index.html` ~40% inline-стилей**; динамический HTML в `main.js` тоже со
   `style="..."`. Дизайн-система есть (`style.css`, CSS-переменные
   `--accent/--positive/--danger/--muted`), но применяется непоследовательно.
5. **Верхняя панель (Safety + ⚙️ + подсказка) не скрывается на игровых экранах**
   — съедает ~90px высоты на picker/responder/guesser (видно на кадрах 3–7).
6. Склейка текста вопроса даёт **пробел перед знаком препинания**:
   «or tiny SUSHI ?» (кадры 6–8). Шаблоны конкатенируются с `" "`.
7. Маскированные слова — пунктирные «пилюли» из точек; длина скрыта
   намеренно (UX-фича), но подпись «••• hides any number of letters» мелкая
   и появляется не всегда очевидно.
8. Result-сцена — абсолютно-позиционированные элементы из `SCENE_REGISTRY`
   внутри alert-модалки: на узких экранах элементы могут вылезать за край
   (сцена на кадре 8 выглядит пустовато — `sfx`/элементы зависят от сцены).
9. **Внешние ресурсы без фолбэка**: QR-коды `api.qrserver.com` (setup, lobby,
   final) при офлайне — битые иконки; Google Fonts, YouTube iframe.
   *(Исправлено: QR генерируется локально — `src/utils/qrcode.js`, SVG data-URI.)*

### UX-логика
10. **Safety hold-2s без видимого прогресса** — кнопки «Hold 2s to Confirm»
    не показывают заполнение; на десктопе hold работает через mousedown.
    Опции раскрываются по тапу на карточку (индикатор «▼»).
11. Карусельные стрелки `←` `→` — без `aria-label`/текста; скринридеру нечего
    сказать. То же про ✕ у игроков и 🎲/📏 reveal-кнопки (там есть текст — ок).
12. **i18n покрытие неполное**: часть строк хардкод в `index.html` без
    `data-i18n` (`#oral-hint-btn` «💬 Ask for oral hint (-10 pts)», `#pass-message`),
    часть — в JS через `t()`. Плейсхолдеры переведены через `data-i18n-placeholder`.
13. Поля ввода в редакторе (`edit-q-part*`) не показывают, какой это фрагмент
    вопроса — только «[ ANSWER N ]»-разделители; без контекста легко сломать
    грамматику (редактор того и ждёт, но обратной проверки нет).
14. Pass-screen: нет явной кнопки — только «tap to continue» на весь экран;
    при случайном тапе следующий игрок увидит чужой экран без задержки.

### Мелочи, видимые на кадрах
- `settings-modal` вертикально центрирована с пустотой сверху — на высоких
  экранах выглядит «всплывшей».
- Кнопка «✍️ EDIT THE QUESTION» визуально неотличима от выключенной (тот же серый
  стиль, что и у «OR WRITE YOUR OWN PROMPT») — состояние Advanced не считывается.
- `Designed by Human / coded by ai` в футере — фича, не баг :)

## 4. Что хорошо (не ломать)

- **Единый стиль карточек**: инфобоксы с dashed-teal, карусели `n/N` сверху,
  стрелки снизу — консистентно на picker/prompt.
- **FTUE-онбординг**: step-инфобоксы меняют текст между раундом 1 и дальше
  (`picker.step1First` vs `picker.step1`) — объясняют «слепой» твист на месте.
- Бейджи слов респондера с 🔒 и счётчики `0/35` — понятная обратная связь.
- Вся pass-and-play приватность: pass-screen фуллскрин, секретный вопрос не
  показывается наблюдателям (`#companion-screen` без текста вопроса).
- Эмодзи-аватары игроков инжектятся в result-сцену и pass-screen — фирменный вид.

## 5. Рекомендации (приоритет)

1. Убрать полный ре-рендер при PICKING-setState: либо не трогать
   `editBlock`/карусель если редактор открыт (флаг в S), либо дифф-рендер.
   Заодно починить `applyHistoryState(S.picker.viewIndex)` вместо `(0)`.
2. Вынести видимость из инлайн-стилей в классы; `switchScreen` оставить `.hidden`.
3. Развести result-модалку и alert-модалку (отдельный `#result-modal` с
   отложенным tap).
4. `aria-label` для иконочных/стрелочных кнопок; видимый прогресс hold-2s.
5. Скрывать `.help-section` на игровых экранах или схлопывать safety-tip.
6. Починить пробел перед пунктуацией: собирать вопрос через join без
   хвостового пробела либо `.replace(/\s+([?.,!])/g, '$1')`.
7. Локальный QR (сгенерить data-URI один раз) вместо api.qrserver.com.
8. Довести i18n: `oral-hint-btn`, `pass-message` и прочие хардкод → `data-i18n`.
