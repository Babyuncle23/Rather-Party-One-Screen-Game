/**
 * ============================================================================
 *   ИНСТРУКЦИЯ ДЛЯ РАЗРАБОТКИ: ДОБАВЛЕНИЕ НОВЫХ ВОПРОСОВ (questions.js)
 * ============================================================================
 * 
 * При добавлении новой карточки в массив `questionsDatabase` строго соблюдайте 
 * следующую структуру и правила, чтобы не сломать игровую логику:
 * 
 * {
 *   id: 17,                                 // Уникальный порядковый номер (Number)
 *   category: "food",                       // Текстовый идентификатор категории
 *   difficulty: "easy",                     // Сложность карточки: easy | medium | hard
 *   text: "Would you rather eat ___ ...",   // Строка вопроса. Должна содержать СТРОГО ДВА маркера "___"
 *   resultTemplate: "{name} would rather...",// Шаблон для вывода в историю. Обязательные теги:
 *                                           // {name} - имя игрока, {winner} - выбор, {loser} - проигравшее слово
 *   hints: [                                // Массив встроенных промптов (минимум 2, лучше 3-5).
 *     "Name two fast-food items",           // Игрок 1 (Picker) увидит 2 случайных варианта из этого пула.
 *     "Name two ingredients for pizza"
 *   ]
 * }
 * 
 * ----------------------------------------------------------------------------
 * ⚠️ КРИТИЧЕСКИ ВАЖНО ДЛЯ РАБОТЫ «ЧУТКИХ» ПОДСКАЗОК (Brainstorm Helper):
 * ----------------------------------------------------------------------------
 * Текст ваших подсказок (строки внутри массива `hints`) напрямую анализируется 
 * регулярными выражениями и триггерами в `main.js`. Чтобы для Responder'а в шаге 2 
 * правильно открывался интерактивный спойлер идей, используйте в тексте хинтов 
 * следующие ключевые слова-маркеры:
 * 
 * 1. МАТЕРИАЛЫ: Используйте слова "material", "fabric", "substance", "texture".
 *    - Если материал должен быть хрупким, добавьте: "fragile", "breakable", "stain".
 *    - Если прочным/строительным, добавьте: "strong", "rigid", "heavy", "building".
 * 
 * 2. ЛЮДИ / ПЕРСОНЫ: Используйте слова "figure", "people", "actor", "celebrity", "personality".
 *    - Если нужны злодеи/худшие, добавьте: "worst", "villain", "dislike".
 *    - Если вдохновляющие/известные, добавьте: "interesting", "inspiring", "creative", "famous".
 * 
 * 3. ЭПОХИ И СОБЫТИЯ: Используйте слова "event", "hardship", "war", "era", "period", "decade", "time".
 *    - Если эпоха мрачная/тяжелая, добавьте: "hardship", "severe", "bad", "lacked".
 * 
 * 4. ЖИВОТНЫЕ И МОНСТРЫ: Используйте слова "animal", "creature", "beast", "monster".
 *    - Если нужны древние твари/мифы, добавьте: "prehistoric", "mythological", "monster", "bizarre", "dinosaur".
 *    - Если жуткие/опасные, добавьте: "creeps", "terrify", "toxic", "danger".
 * 
 * 5. ИГРЫ И АКТИВНОСТЬ: Используйте слово "game".
 *    - Для подвижных игр добавьте: "physical", "activity", "energy".
 * 
 * 6. ЕДА И ПРОДУКТЫ: Используйте слова "food", "snack", "ingredient", "breakfast".
 *    - Если еда должна пачкать одежду, добавьте: "sticky", "wet", "stain", "crumbly".
 * 
 * Если в вашем хинте не будет этих ключевых слов, спойлер штурма идей останется скрытым.
 */

export const questionsDatabase = [ {
    id: 1,
    category: "people",
    difficulty: "hard",
    text: "Would you rather be stranded on a desert island until the end of your life with ___ or with ___?",
    resultTemplate: "{name} would rather be stranded on a desert island until the end of life with {winner} than with {loser}.",
    hints: [
      "Name the two worst people in history",
      "Name two characters from any book or movie you remember",
      "Name two world-famous actors or celebrities everyone knows",
      "Name two historical figures you find interesting"
    ]
  },
  {
    id: 2,
    category: "colors",
    difficulty: "easy",
    text: "Would you rather wear only ___ socks or ___ socks for the rest of your life?",
    resultTemplate: "{name} would rather wear only {winner} socks than {loser} socks for the rest of life.",
    hints: [
      "Name two colors that are very bright",
      "Name two colors that look terrible together",
      "Name two colors that you can see somewhere in this room right now",
      "Name two of the safest colors you can think of",
      "Name two of the most standard colors you know"
    ]
  },
  {
    id: 3,
    category: "gaming",
    difficulty: "medium",
    text: "Would you rather spend 1000 hours playing ___ or playing ___?",
    resultTemplate: "{name} would rather spend 1000 hours playing {winner} than playing {loser}.",
    hints: [
      "Name two popular games (board games, sports, or digital) you dislike",
      "Name two games of any kind you recently played or saw",
      "Name two classic games that almost every person on earth knows",
      "Name two games that require a lot of physical activity or energy"
    ]
  },
  {
    id: 4,
    category: "food",
    difficulty: "easy",
    text: "Would you rather eat nothing but ___ or nothing but ___ for an entire month?",
    resultTemplate: "{name} would rather eat nothing but {winner} than nothing but {loser} for an entire month.",
    hints: [
      "Name two of your favorite fast-food or snack items",
      "Name two things you would eat for breakfast on a perfect morning",
      "Name two popular ingredients used in a pizza"
    ]
  },
  {
    id: 5,
    category: "superpowers",
    difficulty: "hard",
    text: "Would you rather have the ability to instantly transform into ___ or into ___?",
    resultTemplate: "{name} would rather have the ability to instantly transform into a {winner} than into a {loser}.",
    hints: [
      "Name two wild animals that are known to be large and heavy",
      "Name two well-known comic book or movie superheroes",
      "Name two random everyday objects in this room",
      "Name two mythical creatures from classic stories or fairy tales",
      "Name two of the cutest animals in your opinion"
    ]
  },
  {
    id: 6,
    category: "pop-culture",
    difficulty: "medium",
    text: "Would you rather go to a private live concert of ___ or of ___?",
    resultTemplate: "{name} would rather go to a private live concert of {winner} than of {loser}.",
    hints: [
      "Name two music artists, bands, or composers you know",
      "Name two famous singers or performers that have massive global hit songs",
      "Name two well-known internet personalities, bloggers, or creators"
    ]
  },
  {
    id: 7,
    category: "lifestyle",
    difficulty: "easy",
    text: "Would you rather live in a house completely made of ___ or made of ___?",
    resultTemplate: "{name} would rather live in a house completely made of {winner} than made of {loser}.",
    hints: [
      "Name two delicious sweet treats or candies", 
      "Name two building materials or metals",
      "Name two fragile or easily breakable materials",
      "Name two substances or textures that for some reason feel unpleasant to you"
    ]
  },
  {
    id: 8,
    category: "lifestyle",
    difficulty: "medium",
    text: "Would you rather have your bedroom completely filled with ___ or with ___?",
    resultTemplate: "{name} would rather have a bedroom completely filled with {winner} than with {loser}.",
    hints: [
      "Name two things that make an extremely unpleasant or annoying sound",
      "Name two soft things that you love to touch",
      "Name two tech gadgets or electronic devices"
    ]
  },
  {
    id: 9,
    category: "finance",
    difficulty: "hard",
    text: "Would you rather receive a lifetime endless supply of ___ or of ___?",
    resultTemplate: "{name} would rather receive a lifetime endless supply of {winner} than of {loser}.",
    hints: [
      "Name two expensive items or luxury goods you wish you owned",
      "Name two daily services or subscriptions that you use often",
      "Name two necessary everyday goods or products that you always buy",
      "Name two good moods",
      "Name two bad moods"
    ]
  },
  {
    id: 10,
    category: "travel",
    difficulty: "medium",
    text: "Would you rather spend a year traveling around ___ or around ___?",
    resultTemplate: "{name} would rather spend a year traveling around {winner} than around {loser}.",
    hints: [
      "Name two countries, cities, or regions that you personally find beautiful or fascinating",
      "Name two distinct types of natural terrain or geographic ecosystems",
      "Name two areas known for extreme weather, intense pollution, or very difficult terrain"
    ]
  },
  {
    id: 11,
    category: "skills",
    difficulty: "hard",
    text: "Would you rather instantly become a world-class expert in ___ or in ___?",
    resultTemplate: "{name} would rather instantly become a world-class expert in {winner} than in {loser}.",
    hints: [
      "Name two complex academic subjects, scientific disciplines, or professional industries",
      "Name two creative arts, styles of performance, crafts, or musical instruments",
      "Name two activities that you find incredibly boring, repetitive, or tedious to do",
      "Name two fields that are notoriously stressful, high-pressure, or exhausting",
      "Name two highly specific, unusual, or absurd activities"
    ]
  },
  {
    id: 12,
    category: "animals",
    difficulty: "easy",
    text: "Would you rather have a pet ___ or a pet ___ for the next ten years?",
    resultTemplate: "{name} would rather have a pet {winner} than a pet {loser} for the next ten years.",
    hints: [
      "Name two animals that you think are affectionate, gentle, or great companions",
      "Name two wild, rare, or majestic animals that you usually only see in nature documentaries",
      "Name two creatures that terrify you, give you the creeps, or possess toxic defenses",
      "Name two animals known for being extremely noisy, destructive, or bad-smelling",
      "Name two massive prehistoric beasts, mythological creatures, or bizarre monsters"
    ]
  },
  {
    id: 13,
    category: "fashion",
    difficulty: "easy",
    text: "Would you rather attend a formal gala wearing a suit made of ___ or made of ___?",
    resultTemplate: "{name} would rather attend a formal gala wearing a suit made of {winner} than made of {loser}.",
    hints: [
      "Name two high-quality fabrics, textures, or materials used to make fine clothing",
      "Name two shiny, rigid, or reflective elements found in nature or manufacturing",
      "Name two sticky, wet, or crumbly foods that would easily stain or fall apart",
      "Name two random objects you would find in a recycling bin, tool shed, or hardware store"
    ]
  },
  {
    id: 14,
    category: "history",
    difficulty: "hard",
    text: "Would you rather travel back in time to experience the era of ___ or the era of ___?",
    resultTemplate: "{name} would rather travel back in time to experience the era of {winner} than the era of {loser}.",
    hints: [
      "Name two historical time periods known for significant artistic, architectural, or cultural growth",
      "Name two specific decades from the past century",
      "Name two historical events marked by severe hardships",
      "Name two time periods that lacked modern conveniences like indoor plumbing or electricity"
    ]
  },
  {
    id: 15,
    category: "lifestyle",
    difficulty: "hard",
    text: "Would you rather be forced to experience ___ or experience ___ for the next 5 years of your life?",
    resultTemplate: "{name} would rather be forced to experience {winner} than {loser} for the next 5 years of life.",
    hints: [
      "Name two crazy or absurd situations that make no sense",
      "Name two mildly annoying, awkward, or ironic everyday accidents",
      "Name two unexpectedly pleasant or surprisingly satisfying feelings"
    ]
  },
  {
    id: 16,
    category: "history",
    difficulty: "hard",
    text: "Would you rather travel 100 years into the future to see the development of ___ or the development of ___?",
    resultTemplate: "{name} would rather travel 100 years into the future to see the development of {winner} than of {loser}.",
    hints: [
      "Name two advanced futuristic technologies or sci-fi inventions",
      "Name two mega-corporations, digital platforms, or popular websites",
      "Name two massive global cities or geographic regions",
      "Name two major industries, scientific fields, or professional domains"
    ]
  }
];