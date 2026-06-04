# 🎭 Rather Party — One Screen Party Game

A modular, framework-less web application delivering a mobile-optimized "Would You Rather" party game for two or more players on a single shared device. The software coordinates custom prompt generation, hidden state transitions, and cryptographic-style masked word decoding via dedicated investigative mechanics.

---

## 🌟 Features

* **Single-Device Architecture:** Operates entirely client-side on a single physical device with no external network requests or server synchronization required.
* **Deterministic Input Prediction & Helper Modules:** Employs a context-free token matching subsystem for input autocomplete, combined with an isolated, static array mapping for localized `Brainstorm` hint objects.
* **State Immutability & Input Controls:** Upon data submission, input fields transition to a persistent `disabled` state augmented with visual indicators (`🔒`) to prevent post-reveal memory tampering or state reversion.
* **Algorithmic Word Masking & Revelation Engines:**
  * 📍 **Positions Engine:** Discloses character tokens at deterministic indices (Initial, Median, Terminal) relative to string length.
  * 🎲 **Proportional Random Engine:** Distributes dynamic bitmasks across separate string arrays using stochastic weighting.
  * 🔤 **Structural Typography Engine:** Sequences character disclosure based on phoneme categories (Vowels initiated on Pass 1, Consonants initiated on Pass 2).
* **Adaptive Balance Subsystem (Nerf Controls):** Token validation pipelines parse input strings against runtime dictionaries (Colors, Materials, Moods). Detection of matching low-complexity sequences dynamically downscales reveal coefficients.
* **Mobile Layout Optimization & Scroll Anchoring:**
  * Implements an absolute dark viewport theme designed to mitigate optic fatigue during continuous device usage.
  * Explicit UI position states prevent viewport oscillation during letter transitions, while automatically invoking targeted element-level smooth scrolling to the options container post-submission.
  * Displays an isolated step-by-step documentation widget configured as a discrete carousel element.
* **Low-Latency Web Audio Context:** Pre-instantiated audio element pooling combined with parallel Web Audio API buffer node decoding executes real-time multi-track audio blending (simultaneous transient and cyclic sound rendering).

---

## 🎮 Game Execution Loop

1. **Initialization Sequence:** Runtime variables consume player identifiers and define absolute iteration constraints (total rounds).
2. **Phase 1 (The Picker Matrix):** Input parameters load a randomized question object. Player 1 defines a contextual guiding prompt string.
3. **Phase 2 (The Responder Configuration):** Player 2 assumes interface focus. Optional static array values populate the brainstorm container. Upon answer submission, token string arrays are committed, inputs lock down (`🔒`), and the DOM shifts focus directly to the target question layout to process the hidden selection vector.
4. **Phase 3 (The Guesser Verification Loop):** Device focus cycles through remaining active player indices sequentially. Strings are obfuscated using placeholder character points (`W • • • R •`). Investigative assets consume points balances to update visible bitmasks prior to final variable selection.
5. **Evaluation Matrix:** Correct match inputs increment points balances. Matches terminate by exporting comprehensive logs to global score tables and historical execution arrays.

---

## 🛠️ Architecture & Directory Mapping

The codebase conforms to ECMAScript 2020 (ES6+) modular design specifications with absolute component separation:

```text
├── index.html                  # Core DOM node declarations & layout constraints
└── src
    ├── main.js                 # Global application controller & DOM lifecycle router
    ├── core
    │   ├── Match.js            # Match state machine, counters, & Fisher-Yates shuffling
    │   └── WordShifter.js      # Masking processor, bitwise indexes, & string descriptors
    ├── ui
    │   └── ScreenController.js # View state switching layer & style injection engine
    ├── audio
    │   └── AudioManager.js     # Audio contexts, buffer management, & parallel track blending
    └── data
        ├── autocompleteWords.js# Text dictionary for data entry predictions
        ├── nerfWords.js        # Filter dictionaries for balance downscaling
        └── questions.js        # Data records map containing questions and static brainstorms
```

* **Zero-Dependency Pipeline:** Engineered without external frameworks, transpilers, or npm build automation pipelines, resulting in optimized load times and native browser compatibility.
* **Hardware Acceleration Constraints:** Layout transformations and animations are bound to GPU-backed layers (`transform`, `opacity`) to maintain optimal frame render rates on mobile device processors.

---

## 🚀 Deployment & Local Environment Setup

The application executes natively inside client web clients without compilation.

1. Fetch target repository records:
   ```bash
   git clone https://github.com
   ```
2. Launch `index.html` inside a supported browser environment (Chrome, Safari, Edge, Firefox).

* **Local Module Execution:** To satisfy strict browser security restrictions (CORS) regarding local modular ES6 script execution, run the application root through a standard local web server node:
  ```bash
  npx serve .
  ```

---

## 🔧 Database Extension Configurations

* **Schema Updates (Questions & Brainstorms):** Modify `src/data/questions.js` by inserting valid schema records containing `id`, `category`, `text`, `resultTemplate`, and `hints`. Explicit brainstorm options are mapped directly to corresponding hint structures by declaring a `brainstorm: ["Value1", "Value2"]` property array.
* **Dictionary Tuning (Nerf Controls):** Expand the token balance filter list by adding uppercase string array elements directly to the target modules inside `src/data/nerfWords.js`.

---

## 🧬 Development Protocol & Vibe Coding

Project development utilized an asynchronous, AI-augmented iterative engineering methodology. Core application mechanics, state routing, and structural design configurations were generated through a collaborative human-AI syntax loop. System specifications, interface adjustments, performance tuning, and low-latency audio setups were verified and deployed interactively to optimize the application's runtime execution and UI comfort.

---

## 📄 Licensing

This software utility is distributed under the conditions of the open-source MIT License. Audio assets bound to the application assets framework are registered under universal CC0 (Creative Commons Zero) terms.

This project is open-source software licensed under the **MIT License**. Sound effects utilized inside the assets system are registered under **CC0 (Creative Commons Zero)** licenses.
