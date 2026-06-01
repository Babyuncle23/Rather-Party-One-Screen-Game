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

  showPassScreen(player, onConfirm, note = "Only this player should look at the phone. Keep it hidden from others.") {
    this.screens.pass.style.display = 'flex';
    const message = document.getElementById('pass-message');
    const btn = document.getElementById('pass-confirm-btn');
    
    message.innerText = `PASS THE PHONE TO:\n${player.name.toUpperCase()}\n\n${note}`;
    
    btn.onclick = null;
    btn.onclick = () => {
      this.screens.pass.style.display = 'none';
      onConfirm();
    };
  }

  injectMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        color-scheme: dark;
        --bg: #08080d;
        --surface: rgba(20, 19, 29, 0.92);
        --surface-strong: rgba(14, 13, 22, 0.98);
        --border: rgba(112, 84, 255, 0.18);
        --accent: #8c6cff;
        --accent-strong: #ff5f7b;
        --text: #e8e9f1;
        --muted: #a5a1c8;
        --positive: #37ffe2;
        --danger: #ff6f7a;
      }

      * { box-sizing: border-box; }
      html, body { min-height: 100%; }
      body {
        margin: 0;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: radial-gradient(circle at top left, rgba(140, 108, 255, 0.18), transparent 24%),
                    radial-gradient(circle at bottom right, rgba(255, 95, 123, 0.12), transparent 28%),
                    linear-gradient(180deg, #09090f 0%, #0e0d16 45%, #120f20 100%);
        color: var(--text);
        padding: 20px;
        display: flex;
        justify-content: center;
      }

      body::before {
        content: '';
        position: fixed;
        left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 420px; height: 420px;
        background: radial-gradient(circle, rgba(140,108,255,0.18), transparent 65%);
        pointer-events: none;
        filter: blur(30px);
        opacity: 0.8;
      }

      .game-container {
        width: 100%;
        max-width: 560px;
        padding: 24px;
        border-radius: 28px;
        background: rgba(12, 11, 18, 0.86);
        border: 1px solid rgba(255, 255, 255, 0.04);
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(18px);
      }

      h2, h3 {
        margin: 0 0 16px;
        font-weight: 800;
        color: var(--text);
        text-align: center;
        letter-spacing: 0.04em;
      }

      h2 { font-size: clamp(1.8rem, 2.2vw, 2.5rem); }
      h3 { font-size: 1.3rem; color: var(--muted); }

      p { margin: 0 0 16px; line-height: 1.65; color: var(--muted); }
      .game-container > div:not(.modal-overlay) {
        padding: 0 0 10px;
      }

      .btn {
        width: 100%;
        padding: 16px 18px;
        border: none;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        letter-spacing: 0.02em;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .btn:hover { transform: translateY(-1px); }
      .btn:active { transform: scale(0.98); }
      .btn-primary {
        background: linear-gradient(135deg, #7f65ff, #4d5dff);
        color: white;
        box-shadow: 0 18px 40px rgba(93, 75, 255, 0.24);
      }
      .btn-secondary {
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
        text-align: left;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
      }
      .btn-secondary:hover { background: rgba(255,255,255,0.08); }
      .btn-accent {
        background: linear-gradient(135deg, #ff6c8d, #ff9d4a);
        color: white;
        box-shadow: 0 18px 40px rgba(255, 108, 141, 0.22);
      }
      .btn-choice {
        background: linear-gradient(180deg, #14141a 0%, #1f1e29 100%);
        color: var(--positive);
        font-size: 18px;
        border: 1px solid rgba(88, 255, 194, 0.24);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
      }
      .btn-choice:hover { background: rgba(255,255,255,0.04); }
      .btn-small {
        padding: 12px 14px;
        font-size: 14px;
        background: rgba(255,255,255,0.06);
        color: var(--text);
      }

      .input-field {
        width: 100%;
        padding: 16px 18px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.04);
        color: var(--text);
        font-size: 16px;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
        margin-bottom: 14px;
      }
      .input-field:focus {
        border-color: rgba(140, 108, 255, 0.55);
        box-shadow: 0 0 0 4px rgba(140, 108, 255, 0.08);
      }

      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(3, 3, 8, 0.86);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 24px;
      }
      .modal-content {
        padding: 28px;
        width: min(420px, 90%);
        border-radius: 28px;
        background: rgba(7, 7, 16, 0.98);
        border: 1px solid rgba(255,255,255,0.05);
        box-shadow: 0 26px 60px rgba(0,0,0,0.35);
      }
      #pass-message {
        color: #ffe2eb;
        font-size: 2rem;
        white-space: pre-line;
        margin-bottom: 26px;
        line-height: 1.2;
      }

      .boxes-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
        margin-top: 18px;
      }
      .player-box {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(140,108,255,0.18);
        border-radius: 18px;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text);
        font-weight: 700;
        font-size: 0.95rem;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .player-box:hover { transform: translateY(-2px); background: rgba(255,255,255,0.05); }
      .delete-box-btn {
        background: none;
        border: none;
        color: var(--danger);
        font-size: 18px;
        cursor: pointer;
        padding: 0 6px;
      }

      .card-question {
        background: rgba(255,255,255,0.04);
        padding: 22px;
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.06);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.01);
        margin: 18px 0;
        font-size: 1rem;
      }
      .highlight-text { color: #f7f7ff; font-weight: 600; line-height: 1.6; }
      .prompt-badge {
        display: inline-block;
        background: linear-gradient(135deg, rgba(255,111,152,0.15), rgba(140,108,255,0.22));
        padding: 14px 18px;
        border-radius: 16px;
        color: var(--text);
        margin-top: 10px;
        font-size: 1rem;
        text-align: center;
        box-shadow: 0 18px 45px rgba(97,70,234,0.12);
      }

      .stats-bar { display: flex; justify-content: space-between; gap: 10px; margin: 10px 0; color: var(--muted); font-weight: 700; }
      .final-guess-block { border-top: 1px dashed rgba(255,255,255,0.08); margin-top: 22px; padding-top: 18px; }
      .leaderboard-list {
        list-style: none;
        padding: 18px 22px;
        border-radius: 20px;
        background: rgba(255,255,255,0.03);
        color: var(--positive);
      }
      .leaderboard-list li { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .leaderboard-list li:last-child { border-bottom: none; }
      .history-card {
        background: rgba(255,255,255,0.04);
        padding: 22px;
        border-radius: 22px;
        border: 1px solid rgba(255,255,255,0.05);
        min-height: 140px;
        margin: 16px 0;
      }
      .carousel-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        background: rgba(255,255,255,0.03);
        padding: 12px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.05);
      }
      .carousel-controls .btn-small { width: 34%; margin: 0; padding: 12px; }
      #carousel-index {
        font-size: 0.96rem;
        font-weight: 700;
        color: var(--accent);
        text-align: center;
        width: 32%;
      }

      #responder-screen p { color: var(--muted); font-size: 1rem; margin-bottom: 12px; }

      .abilities-list-vertical {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 22px;
        padding: 16px 18px;
        margin: 18px 0;
      }
      .ability-row {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 14px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .ability-row:last-child { border-bottom: none; }
      .btn-action {
        background: rgba(255,255,255,0.04);
        color: var(--accent);
        border: 1px solid rgba(140,108,255,0.26);
        padding: 12px 16px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        min-width: 100px;
        text-align: center;
      }
      .btn-action:hover { background: rgba(255,255,255,0.08); }
      .ability-desc {
        font-size: 0.92rem;
        color: var(--muted);
        margin-left: 6px;
        line-height: 1.45;
      }
      .input-check-group {
        display: flex;
        gap: 10px;
        min-width: 100px;
      }
      .single-letter-box {
        width: 44px;
        height: 44px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        color: var(--text);
        text-align: center;
        font-size: 18px;
        font-weight: 800;
        text-transform: uppercase;
      }
      .btn-info-circle {
        background: none;
        border: none;
        color: var(--accent);
        font-size: 14px;
        cursor: pointer;
        text-decoration: underline;
        padding: 4px 0;
        display: block;
        width: 100%;
        text-align: left;
      }
      .rules-dropdown-box {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 18px;
        padding: 16px;
        margin-top: 10px;
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--muted);
      }
      .rules-dropdown-box p { margin: 6px 0; }
      .rules-dropdown-box ul { margin: 8px 0; padding-left: 22px; }
      .rules-dropdown-box li { margin: 4px 0; }
    `;
    document.head.appendChild(style);
  }
}