# 🎭 Rather Party — One Screen Party Game

A modular, zero-dependency "Would You Rather" party game for two or more players on a single shared device. Pass the phone, create prompts, mask answers, and guess choices using a letter-reveal mechanic.

## Features

* **Single-Device & Offline:** Runs client-side on one device. No network requests or servers required.
* **Word Masking Engine:**
    * *Length Obfuscation:* Placeholder dots are replaced with a pulsing gap system to hide the exact length of the words.
    * *Reveals:* Spend points to reveal letters based on specific rules (Positional, Random, or Letter Type).
    * *Balance Nerfs:* Common answers (basic colors, foods, materials) are detected and penalized to reduce reveal effectiveness.
* **State Lock:** Submitted input fields lock down (🔒) to prevent state reversion.
* **Brainstorming:** A local database provides contextual ideas and hints for prompts.
* **Audio System:** Native Text-to-Speech (TTS) announcements and Web Audio API sound effects.
* **Safety Tools:** Built-in "Safety Timeout" mechanics allow players to secretly skip questions or trigger a delayed game end.

## How to Play

1. **Phase 1 (Picker):** Player 1 reads a secret question and chooses or writes a prompt for the next player.
2. **Phase 2 (Responder):** Player 2 reads the prompt, types two answers, and secretly selects their preferred option.
3. **Phase 3 (Guessers):** The device is passed to the remaining players. They spend points to buy letter reveals and guess Player 2's choice.

## Architecture & Directory Mapping

The codebase uses Vanilla JavaScript (ES6+ Modules) with zero external dependencies.

```text
├── index.html                  # Core DOM node declarations & layout
└── src
    ├── main.js                 # Global application controller & DOM lifecycle
    ├── core
    │   ├── Match.js            # Match state machine & round history
    │   └── WordShifter.js      # Masking processor, letter reveals & balance mechanics
    ├── ui
    │   └── ScreenController.js # View state switching & UI overlays
    ├── audio
    │   └── AudioManager.js     # Audio pools & TTS queue management
    └── data
        ├── nerfWords.js        # Filter lists for balance downscaling
        └── questions.js        # Database of questions, categories, and brainstorms 
```

## 🧬 Development Protocol

This project was built using vibe coding. The core logic, state routing, animations, and architecture were generated through a natural language collaborative loop with AI, translating gameplay mechanics into vanilla JavaScript.

## 📄 Licensing

Distributed under the MIT License. Audio assets use CC0 (Creative Commons Zero) terms.
