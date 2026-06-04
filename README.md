# 🎭 Rather Party — One Screen Party Game

A modular, framework-less web application delivering a mobile-optimized "Would You Rather" party game for two or more players on a single shared device. The software coordinates custom prompt generation, hidden state transitions, and an advanced gap-hiding masked word decoding system via dedicated investigative mechanics.

## 🌟 Features

*   **Single-Device Architecture:** Operates entirely client-side on a single physical device with no external network requests or server synchronization required.
*   **Deterministic Input Prediction & Helper Modules:** Employs a context-free token matching subsystem for input autocomplete, combined with an isolated, static array mapping for localized Brainstorm hint objects.
*   **State Immutability & Input Controls:** Upon data submission, input fields transition to a persistent disabled state augmented with visual indicators (🔒) to prevent post-reveal memory tampering or state reversion.
*   **Advanced Masking & Separation Engines:**
    *   **Positions Engine:** Discloses character tokens at deterministic indices (Initial, Median, Terminal) relative to string length.
    *   **Proportional Random Engine:** Distributes dynamic bitmasks across separate string arrays using stochastic weighting.
    *   **Guaranteed Letters Type Engine:** Sequences character disclosure based on phoneme categories (Consonants on Pass 1, Vowels on Pass 2). Grants a solid, high-utility reveal of exactly **2 letters** per action in standard mode, and 1 letter during nerf/short-word states.
*   **Absolute Word Length Obfuscation:** Replaces traditional placeholder dots with an adaptive pulsing CSS gap system (`.letter-gap`). Hidden characters do not render as individual symbols, completely hiding the exact length of the words from the guesser.
*   **Dynamic Word-Count Labels:** Sub-header indicators explicitly show the structure of the choices (`ANSWER 1` and `ANSWER 2`) by rendering clear metrics like `(1 word)` or `(2 words)` inside the option elements.
*   **Geometric Multi-Word Spacing:** Multi-word phrases use an ultra-wide empty layout break via explicit node widths (`36px`), creating an intuitive structural boundary that never breaks letters or disrupts the layout during mobile viewport line wraps.
*   **Oral Association Mechanic (2-Player Duel):** In dual-player matches, a contextual button enables the guesser to request a single verbal hint or association from the creator for a 10-point balance cost.
*   **Robust Error Feedback Loop:** If an investigative ability rolls a "blank" (no matching hidden letters left of that type), the action is processed as an unlucky reveal. The points and turn counter are spent, and the user receives an informative notification explaining why nothing opened.
*   **Mobile Layout Optimization & Scroll Anchoring:**
    *   Implements an absolute dark viewport theme designed to mitigate optic fatigue during continuous device usage.
    *   Explicit UI position states prevent viewport oscillation during letter transitions, while automatically invoking targeted element-level smooth scrolling to the options container post-submission.
    *   Displays an isolated step-by-step documentation widget configured as a discrete carousel element.
*   **Low-Latency Web Audio Context:** Pre-instantiated audio element pooling combined with parallel Web Audio API buffer node decoding executes real-time multi-track audio blending (simultaneous transient and cyclic sound rendering).

## 🎮 Game Execution Loop

1.  **Initialization Sequence:** Runtime variables consume player identifiers and define absolute iteration constraints (total rounds).
2.  **Phase 1 (The Picker Matrix):** Input parameters load a randomized question object. Player 1 defines a contextual guiding prompt string or selects a pre-made hint from the question registry.
3.  **Phase 2 (The Responder Configuration):** Player 2 assumes interface focus. Optional static array values populate the brainstorm container. Upon answer submission, token string arrays are committed, inputs lock down (🔒), and the DOM shifts focus directly to the target question layout to process the hidden selection vector.
4.  **Phase 3 (The Guesser Verification Loop):** Device focus cycles through remaining active player indices sequentially. Strings are completely obfuscated using smooth-pulsing visual separators. Investigative assets consume points balances to unlock characters or activate specialized hint features prior to making a final guess.
5.  **Evaluation Matrix:** Correct match inputs increment points balances. Matches terminate by exporting comprehensive logs to global score tables and historical execution arrays.

## 🛠️ Architecture & Directory Mapping

The codebase conforms to ECMAScript 2020 (ES6+) modular design specifications with absolute component separation:

```text
├── index.html                  # Core DOM node declarations & layout constraints
└── src
    ├── main.js                 # Global application controller & DOM lifecycle router
    ├── core
    │   ├── Match.js            # Match state machine, counters, & Fisher-Yates shuffling
    │   └── WordShifter.js      # Masking processor, letter rarity maps, & word counters
    ├── ui
    │   └── ScreenController.js # View state switching layer & style injection engine
    ├── audio
    │   └── AudioManager.js     # Audio pools, volume states, & parallel Web Audio nodes
    └── data
        ├── autocompleteWords.js# Text dictionary for data entry predictions
        ├── nerfWords.js        # Filter lists for balance downscaling
        └── questions.js        # Data records map containing questions and brainstorm arrays
```

*   **Zero-Dependency Pipeline:** Engineered without external frameworks, transpilers, or npm build automation pipelines, resulting in optimized load times and native browser compatibility.
*   **Hardware Acceleration Constraints:** Layout transformations and animations are bound to GPU-backed layers (`transform`, `opacity`) to maintain optimal frame render rates on mobile device processors.

## 🚀 Deployment & Local Environment Setup

The application executes natively inside client web clients without compilation.

1.  Fetch target repository records:
    ```bash
    git clone https://github.com
    ```
2.  Launch `index.html` inside a supported browser environment (Chrome, Safari, Edge, Firefox).
3.  **Local Module Execution:** To satisfy strict browser security restrictions (CORS) regarding local modular ES6 script execution, run the application root through a standard local web server node:
    ```bash
    npx serve .
    ```

## 🔧 Database Extension Configurations

*   **Schema Updates (Questions & Brainstorms):** Modify `src/data/questions.js` by inserting valid schema records containing `id`, `category`, `text`, `resultTemplate`, and `hints`. Explicit brainstorm options are mapped directly to corresponding hint structures by declaring a `brainstorm: ["Value1", "Value2"]` property array.
*   **Dictionary Tuning (Nerf Controls):** Expand the token balance filter list by adding uppercase string array elements directly to the target modules inside `src/data/nerfWords.js`.

## 🧬 Development Protocol

Project development utilized an asynchronous, AI-augmented iterative engineering methodology. Core application mechanics, state routing, and structural design configurations were generated through a collaborative human-AI syntax loop. System specifications, interface adjustments, performance tuning, and low-latency audio setups were verified and deployed interactively to optimize the application's runtime execution and UI comfort.

## 📄 Licensing

This software utility is distributed under the conditions of the open-source MIT License. Audio assets bound to the application assets framework are registered under universal CC0 (Creative Commons Zero) terms.
