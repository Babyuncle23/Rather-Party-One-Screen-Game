# 🎭 Rather Party — One Screen Party Game

A modular, zero-dependency "Would You Rather" party game for two or more players on a single shared device. Pass the phone, edit questions, hide your answers, and guess your friends' choices using a letter-reveal and swipe mechanic.

## Features

* **Single-Device & Offline:** Runs entirely client-side on one device. No network requests, no servers, no tracking.
* **Dynamic Question Engine:** Questions are built modularly. The "Picker" can rewrite or customize question fragments on the fly using the built-in 3-part editor.
* **Word Masking & Reveal Engine:**
    * *Length Obfuscation:* Words are hidden behind a pulsing gap system to obscure their exact length.
    * *Abilities:* Spend points to buy "Random Letters" or "Length & 1st Letters" reveals.
    * *Balance Nerfs:* Common answers (basic colors, foods, materials) are detected and penalized to reduce reveal effectiveness.
    * *Swipe-to-Guess:* Intuitive, Tinder-style swipe mechanics for making the final guess.
* **Avatar System:** Built-in emoji picker for player identification and personalized Text-to-Speech handovers.
* **Fallback Oral Hints:** A special "-10 pts" action in 2-player games that prompts players to give a real-life verbal clue when all standard reveals are exhausted.
* **Audio System:** Native Text-to-Speech (TTS) screen reader and Web Audio API sound effects with volume controls.
* **Psychological Safety Tools:** A disguised "Safety Timeout" menu allows players to secretly skip uncomfortable questions, trigger an "Open Circle" talk, or set a delayed, anonymous game shutdown.

## How to Play

1. **Phase 1 (Picker):** Player 1 reads a secret question, edits it if they want to, and chooses/writes a prompt category for the next player.
2. **Phase 2 (Responder):** Player 2 reads the prompt, types two different answers (the fields lock to prevent cheating), and secretly selects their preferred option.
3. **Phase 3 (Guessers):** The device is passed to the remaining players. They spend points to buy letter reveals, ask for oral hints, and swipe left or right to guess Player 2's choice.

## Architecture & Directory Mapping

The codebase uses Vanilla JavaScript (ES6+ Modules) with zero external dependencies.

```text
├── index.html                  # Core DOM node declarations & layout
└── src
    ├── main.js                 # Global application controller, swipe physics & DOM lifecycle
    ├── core
    │   ├── Match.js            # Match state machine & round history
    │   └── WordShifter.js      # Masking processor, letter reveals & balance nerfs
    ├── ui
    │   └── ScreenController.js # View state switching & UI overlays
    ├── audio
    │   └── AudioManager.js     # Audio pools & TTS queue management
    └── data
        ├── nerfWords.js        # Filter lists for balance downscaling
        └── questions.js        # Database of questions, fragments, and brainstorms
```

## 🧬 Development Protocol

This project was built using "vibe coding." The core logic, state routing, CSS animations, and architecture were generated through a natural language collaborative loop with AI, translating human gameplay mechanics directly into vanilla JavaScript.

## 📄 Licensing

Distributed under the MIT License. Audio assets use CC0 (Creative Commons Zero) terms. Free for personal and commercial use.
