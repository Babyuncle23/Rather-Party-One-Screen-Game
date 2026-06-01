# Would You Rather: Hotseat Edition 📱🎲

A local multiplayer party game built with modern **Vanilla JavaScript**. This is a mobile-first "Hotseat" game designed to be played on a single smartphone passed around between friends.

## ✨ Features
- **True Hotseat Mechanics:** Hidden screens and blur overlays protect players' choices from being spied on.
- **Inclusive Prompts:** Completely custom, 12+ appropriate question database that focuses on general knowledge and broad pop-culture.
- **Virtual Mobile Keyboard:** Eliminates the annoying bouncing OS keyboard on touchscreen devices.
- **Smart Points System:** Players start with 100 potential points, which decrease when using hints (Random letter, First letter, custom letters).
- **Audio Feedback:** Immersive sound effects for clicking keys, winning guesses, and comical losing screens.
- **End-Game Carousel:** Review all answers and choices after the match to laugh over the results.

## 🛠️ Project Structure
- `src/core/` - Contains core game mechanics, the Fisher-Yates randomizer, and word masking engines.
- `src/ui/` - Dynamic screens controller injecting standalone web-app styles.
- `src/data/` - Inclusive question/hint database.
- `src/audio/` - Interactive game sound effects.

## 🚀 How to Play
1. Open the game link on your smartphone.
2. Input 2 or more player names and choose the number of rounds.
3. **Player 1** picks a hidden prompt to trap **Player 2**.
4. Pass the phone. **Player 2** types two words blindly and makes a final decision.
5. Pass the phone back. **Player 1** uses abilities to guess what word **Player 2** chose.
