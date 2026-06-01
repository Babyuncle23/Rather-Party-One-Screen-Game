export class ScreenController {
  constructor() {
    this.screens = {
      setup: document.getElementById('setup-screen'),
      pass: document.getElementById('pass-screen'),
      picker: document.getElementById('picker-screen'),
      responder: document.getElementById('responder-screen'),
      guesser: document.getElementById('guesser-screen'),
      final: document.getElementById('final-screen')
    };
    this.injectMobileStyles();
  }

  switchScreen(screenName) {
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        if (key === 'pass') {
          this.screens[key].style.display = screenName === 'pass' ? 'flex' : 'none';
        } else {
          this.screens[key].style.display = key === screenName ? 'block' : 'none';
        }
      }
    });
  }

  showPassScreen(player, onConfirm) {
    this.screens.pass.style.display = 'flex';
    const message = document.getElementById('pass-message');
    const btn = document.getElementById('pass-confirm-btn');
    
    // ИСПРАВЛЕНО: Берем свойство name у объекта игрока
    message.innerText = `PASS THE PHONE TO:\n${player.name.toUpperCase()}`;
    
    btn.onclick = null;
    btn.onclick = () => {
      this.screens.pass.style.display = 'none';
      onConfirm();
    };
  }

  injectMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
      body {
        margin: 0; font-family: -apple-system, sans-serif;
        background: #121214; color: #e1e1e6; padding: 15px;
        display: flex; justify-content: center;
      }
      .game-container { width: 100%; max-width: 500px; }
      h2, h3 { text-align: center; color: #9c8feb; }
      .btn {
        width: 100%; padding: 15px; border: none; border-radius: 12px;
        font-size: 16px; font-weight: bold; cursor: pointer; margin: 8px 0;
        transition: transform 0.1s; -webkit-tap-highlight-color: transparent;
      }
      .btn:active { transform: scale(0.98); }
      .btn-primary { background: #6246ea; color: white; }
      .btn-secondary { background: #2f2f37; color: #e1e1e6; text-align: left; }
      .btn-accent { background: #e45858; color: white; }
      .btn-choice { background: #3e3e4a; color: #00ffb3; font-size: 18px; border: 1px solid #57576b; }
      .btn-small { padding: 10px; font-size: 14px; background: #2f2f37; color: white; }
      .input-field {
        width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #2f2f37;
        background: #1a1a1e; color: white; font-size: 16px; box-sizing: border-box; margin-bottom: 10px;
      }
      .modal-overlay {
        position: fixed; top:0; left:0; width:100vw; height:100vh;
        background: rgba(18, 18, 20, 0.9); backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); z-index: 999;
        display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
      }
      .modal-content { padding: 20px; width: 85%; }
      #pass-message { color: #ff4a4a; font-size: 26px; white-space: pre-line; margin-bottom: 30px; line-height: 1.4; }
      
      /* СТИЛИ КОРОБОЧЕК ИГРОКОВ */
      .boxes-container {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;
      }
      .player-box {
        background: #1a1a1e; border: 2px solid #6246ea; border-radius: 10px;
        padding: 10px 15px; display: flex; justify-content: space-between; align-items: center;
        color: white; font-weight: bold; font-size: 14px;
      }
      .delete-box-btn {
        background: none; border: none; color: #e45858; font-size: 16px; cursor: pointer; padding: 0 5px;
      }

      .card-question { background: #1a1a1e; padding: 20px; border-radius: 14px; border-left: 5px solid #6246ea; margin: 15px 0; font-size: 18px; }
      .highlight-text { color: #fff; font-weight: 500; line-height: 1.4; }
      .prompt-badge { 
        display: block; 
        background: #e45858; 
        padding: 12px 15px; 
        border-radius: 10px; 
        color: white; 
        margin-top: 10px;
        font-size: 16px;
        line-height: 1.4;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .stats-bar { display: flex; justify-content: space-between; margin: 10px 0; color: #a0a0b2; font-weight: bold; }
      .abilities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .keyboard-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin: 20px 0; }
      .key-btn { background: #2a2a32; color: white; border: none; padding: 12px 0; border-radius: 6px; font-weight: bold; font-size: 16px; }
      .key-btn:disabled { background: #15151a; color: #555; }
      .final-guess-block { border-top: 2px dashed #2f2f37; margin-top: 20px; padding-top: 10px; }
      .leaderboard-list { background: #1a1a1e; padding: 15px 40px; border-radius: 12px; font-size: 18px; color: #00ffb3; }
      .history-card { background: #1a1a1e; padding: 20px; border-radius: 12px; border: 1px solid #3e3e4a; min-height: 160px; margin: 15px 0; }
      .carousel-controls { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; /* Выравнивает кнопки и цифры строго по одной линии */
        margin-top: 15px;
        background: #1a1a1e; /* Делаем красивую общую подложку для кнопок */
        padding: 8px;
        border-radius: 12px;
        border: 1px solid #3e3e4a;
      }
      .carousel-controls .btn-small {
        width: 35%; /* Ограничиваем ширину кнопок, чтобы они не растягивались */
        margin: 0;
        padding: 12px;
      }
      #carousel-index {
        font-size: 16px;
        font-weight: bold;
        color: #9c8feb;
        text-align: center;
        white-space: nowrap; /* Запрещает цифрам переноситься на новую строку */
        width: 25%;
      }
      #responder-screen p {
        color: #a0a0b2;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .rules-help-container {
        margin: 10px 0 15px 0;
      }
      .btn-info-circle {
        background: none; border: none; color: #9c8feb; 
        font-size: 14px; cursor: pointer; text-decoration: underline;
        padding: 5px 0; display: block; width: 100%; text-align: left;
      }
      .rules-dropdown-box {
        background: #1a1a1e; border: 1px solid #3e3e4a; border-radius: 8px;
        padding: 12px 15px; margin-top: 5px; font-size: 13px; line-height: 1.5;
        color: #a0a0b2;
      }
      .rules-dropdown-box p { margin: 4px 0; }
      .rules-dropdown-box ul { margin: 5px 0; padding-left: 20px; }
      .rules-dropdown-box li { margin: 3px 0; }
          `;
    document.head.appendChild(style);
  }
}