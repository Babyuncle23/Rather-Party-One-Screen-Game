# 🎭 Rather Party — One Screen Party Game

A sleek, engaging, and mobile-friendly **"Would You Rather"** party game designed for 2 or more players on a single device. Pass the phone around, craft custom prompts, make secret choices, and decode your friends' answers using special investigative abilities!

---

## 🌟 Features

*   **Single-Device Multi-Player:** No internet or multiple phones needed. Just gather your friends and pass one screen around.
*   **Dynamic Smart Autocomplete:** A built-in context-aware prediction system helper for typing custom hidden prompts smoothly.
*   **Intuitive Word Reveal Mechanics:** 
    *   📍 **Positions Ability:** Reveals predictable strategic letters (Start, Middle, End) based on text length.
    *   🎲 **Random Percentage Ability:** Proportional distribution of uncovered indices between fields.
    *   🔤 **Smart Vowels & Consonants Ability:** Targets structural letters with logical step progression (Vowels first, then Consonants).
*   **Anti-Cheat Smart Balance (Nerf System):** If a player inputs overly simplistic words (basic colors, materials, or moods), the investigative abilities automatically scale down to keep the game challenging and fair.
*   **Fluid UX & UI:** 
    *   Designed with an elegant dark space-themed cyber-neon aesthetic.
    *   Extremely optimized layout prevents eye-strain during intense gameplay loops.
    *   Custom animated step-by-step onboarding carousel integrated seamlessly into current screen context.
*   **Advanced Web Audio Architecture:** Pre-cached sound pools and simultaneous Web Audio API multi-track blending (`typewriter` + `flap` mechanism) for instant zero-latency feedback.

---

## 🎮 Game Flow

1.  **The Setup:** Enter player names and set the desired number of rounds.
2.  **Phase 1 (The Picker):** Player 1 reads a secret question and selects or writes a guiding prompt for the next player.
3.  **Phase 2 (The Responder):** Player 2 sees *only* the prompt, types two answers (max 25 characters each), and privately selects which one fits the secret question best.
4.  **Phase 3 (The Guessers):** The phone goes to the remaining players one by one. They see the secret question with answers masked (`W • • • R •`). They can spend points to reveal specific letters before making a final guess.
5.  **The Verdict:** Score points for correct guesses. Review the match history and global leaderboards at the end of the game!

---

## 🛠️ Architecture & Tech Stack

This project is built using pure **Vanilla JavaScript (ES6+)** with a strict modular component structure:

```text
├── index.html                  # Main UI structure & App container
└── src
    ├── main.js                 # Global game loop manager & DOM events
    ├── core
    │   ├── Match.js            # Core match state, rounds, & Fisher-Yates shuffling
    │   └── WordShifter.js      # Masking engine, reveal math, & adaptive descriptors
    ├── ui
    │   └── ScreenController.js # Screen-switching matrix & CSS-in-JS style injection
    ├── audio
    │   └── AudioManager.js     # Audio pools, Web Audio Context, & combo play
    └── data
        ├── autocompleteWords.js# Databank for custom input predictions
        ├── nerfWords.js        # Trigger dictionary for the balance system
        └── questions.js        # Curated list of unique question objects
```

*   **No Frameworks / Zero Dependencies:** Lightweight, blazingly fast load times, completely independent of external packages or npm building pipelines.
*   **Hardware Acceleration:** CSS animations utilize GPU-friendly transitions (`transform`, `opacity`) preventing lagging rendering workflows on older mobile browsers.

---

## 🚀 Quick Start & Installation

Since the game is pure client-side web software, you don't need any complex installation steps.

1.  Clone the repository:
    ```bash
    git clone https://github.com
    ```
2.  Open `index.html` directly in any modern browser (Chrome, Safari, Edge, Firefox).
3.  *Alternative for Local Testing:* Run a simple lightweight server to avoid potential CORS limitations with specific local modular script file execution:
    ```bash
    npx serve .
    ```

---

## 🔧 Extending the Game Databases

*   **Adding Questions:** Open `src/data/questions.js` and add a new object to `questionsDatabase` following the existing `id`, `category`, `text`, `resultTemplate`, and `hints` schema.
*   **Expanding the Balance Filter:** To nerf more basic words, just add uppercase string tokens directly to the arrays inside `src/data/nerfWords.js`.

---

## 📄 License

This project is open-source software licensed under the **MIT License**. Sound effects utilized inside the assets system are registered under **CC0 (Creative Commons Zero)** licenses.
