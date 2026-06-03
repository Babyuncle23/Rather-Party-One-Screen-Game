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
    
    // Подсвечиваем имя главного получателя телефона классом для экрана передачи
    const highlightedTargetName = `<span class="player-name-pass-fade">${player.name.toUpperCase()}</span>`;
    
    // Если в тексте записки note встречается имя отвечающего, подсвечиваем и его тоже
    let cleanNote = note;
    if (window.game) {
      const responderName = window.game.players[window.game.getResponderIndex()].name.toUpperCase();
      if (cleanNote.includes(responderName)) {
        cleanNote = cleanNote.replace(responderName, `<span class="player-name-pass-fade">${responderName}</span>`);
      }
    }

    message.innerHTML = `PASS THE PHONE TO:<br>${highlightedTargetName}<br><br><span style="font-size: 1.2rem; font-weight: 400; color: var(--muted);">${cleanNote}</span>`;
    
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
      .help-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 18px;
      }
      .help-toggle-row {
        display: flex;
        justify-content: flex-end;
      }
      .tip-visual {
        display: grid;
        gap: 8px;
        margin-top: 10px;
        padding: 12px 14px;
        border-radius: 16px;
        background: rgba(255,255,255,0.04);
        color: var(--text);
      }
      .tip-note {
        margin-top: 12px;
        color: var(--muted);
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
      
      /* Базовые общие свойства для подсвеченных имён */
      .player-name-game-slow,
      .player-name-pass-fade {
        background: linear-gradient(135deg, #a5a1c8 0%, #8c6cff 40%, #ff6c8d 70%, #a5a1c8 100%);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        font-family: inherit;
        font-weight: 800;
        text-transform: uppercase;
      }

      /* Статичный текст: без фиолетового, низкий контраст, высокая яркость */
      .player-name-game-slow {
        color: var(--text);
        -webkit-text-fill-color: initial;
        background: none;
      }

      /* Комфортная скорость для экрана передачи телефона (12 секунд) */
      .player-name-pass-fade {
        animation: superSlowGradient 12s ease infinite;
      }

      @keyframes superSlowGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      /* Эффект поочередного проявления букв */
      /* Эффект поочередного проявления букв */
      .animated-letter {
        display: inline-block;
        opacity: 0;
        transform: translateY(2px) scale(0.95);
        animation: letterReveal 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        margin-right: 0.18em; /* Дополнительный отступ между буквами */
      }
      
      /* Стилизация скрытых точек для максимальной читаемости */
      .animated-letter:has(text) {
         letter-spacing: 0.15em;
      }

      /* Применяем разреженный шрифт ко всему блоку вопроса и кнопкам угадывания */
      #guesser-question-display, 
      .btn-choice {
        letter-spacing: 0.04em;
      }

      @keyframes letterReveal {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
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

      .stats-bar { display: flex; justify-content: space-between; gap: 10px; margin: 10px 0; color: var(--muted); font-weight: 700; flex-wrap: wrap; align-items: center; }
      .stats-bar span { flex: 0 1 auto; }
      .gold-balance { color: #ffd56b; font-weight: 900; transition: transform 0.25s ease, text-shadow 0.25s ease; }
      .gold-add { transform: translateY(-6px); text-shadow: 0 8px 30px rgba(125, 255, 170, 0.18); }
      .gold-spend { transform: translateY(-2px) scale(0.98); text-shadow: 0 6px 20px rgba(255, 120, 120, 0.08); color: #ffb2a8; }

      @media (max-width: 420px) {
        .ability-row { flex-direction: column; align-items: stretch; gap: 8px; }
        .ability-desc { margin-left: 0; margin-top: 6px; font-size: 0.9rem; }
        .btn-action { min-width: 100%; }
        .input-check-group { width: 100%; }
        .single-letter-box { width: 56px; }
      }
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
      .history-card-header {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
        color: var(--accent);
        font-size: 0.95rem;
      }
      .history-card-meta {
        margin: 0 0 12px 0;
        color: #a0a0b2;
        font-size: 0.95rem;
      }
      .history-card-text {
        margin: 0;
        color: var(--text);
        line-height: 1.6;
      }
      .history-player-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 18px;
        justify-content: center;
      }
      .history-player-btn {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        color: var(--text);
        padding: 12px 16px;
        border-radius: 16px;
        min-width: 120px;
        cursor: pointer;
      }
      .history-player-btn.active {
        background: linear-gradient(135deg, #7f65ff, #4d5dff);
        color: white;
        border-color: rgba(140,108,255,0.42);
      }
      .history-window {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 22px;
        padding: 18px;
      }
      .history-window-container {
        margin-bottom: 8px;
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
      
      .audio-control-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(20, 19, 29, 0.95);
        border: 1px solid rgba(140, 108, 255, 0.3);
        border-radius: 999px;
        padding: 12px 16px;
        z-index: 100;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        transition: width 0.3s ease, padding 0.3s ease, gap 0.3s ease, border-radius 0.3s ease;
      }
      
      .audio-control-panel.collapsed {
        width: 46px;
        padding: 10px;
        gap: 0;
        border-radius: 50%;
        justify-content: center;
        overflow: hidden;
      }
      
      .audio-control-panel.collapsed .volume-slider,
      .audio-control-panel.collapsed .volume-label {
        display: none;
      }
      
      .audio-control-panel button {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
        color: var(--accent);
      }
      
      .audio-control-panel button:hover {
        opacity: 0.7;
        transform: scale(1.05);
      }
      
      .audio-control-panel:hover,
      .audio-control-panel:focus-within {
        width: auto;
        padding: 12px 16px;
        gap: 12px;
        border-radius: 999px;
      }
      
      .volume-slider {
        width: 120px;
        height: 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.1);
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
      }
      
      .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--accent);
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(140, 108, 255, 0.3);
      }
      
      .volume-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--accent);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 6px rgba(140, 108, 255, 0.3);
      }
      
      .volume-label {
        font-size: 12px;
        color: var(--muted);
        min-width: 24px;
        text-align: right;
      }
      
      @media (max-width: 480px) {
        .audio-control-panel {
          bottom: 10px;
          right: 10px;
          gap: 8px;
          padding: 8px 12px;
        }
        .volume-slider {
          width: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupAudioControl(audioManager) {
    // Create audio control panel HTML
    const panel = document.createElement('div');
    panel.className = 'audio-control-panel collapsed';
    panel.id = 'audio-control-panel';
    panel.innerHTML = `
      <button id="audio-toggle-btn" title="Toggle sound" aria-label="Toggle sound">🔊</button>
      <input 
        id="volume-slider" 
        class="volume-slider" 
        type="range" 
        min="0" 
        max="100" 
        value="${Math.round(audioManager.getVolume() * 100)}"
        title="Volume control"
        aria-label="Volume control"
      >
      <span class="volume-label" id="volume-label">${Math.round(audioManager.getVolume() * 100)}%</span>
    `;
    document.body.appendChild(panel);

    panel.addEventListener('mouseenter', () => panel.classList.remove('collapsed'));
    panel.addEventListener('mouseleave', () => panel.classList.add('collapsed'));
    panel.addEventListener('focusin', () => panel.classList.remove('collapsed'));
    panel.addEventListener('focusout', (event) => {
      if (!panel.contains(event.relatedTarget)) {
        panel.classList.add('collapsed');
      }
    });

    // Setup event listeners
    const toggleBtn = document.getElementById('audio-toggle-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeLabel = document.getElementById('volume-label');

    toggleBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent global button click handler
      const enabled = audioManager.toggleEnabled();
      toggleBtn.textContent = enabled ? '🔊' : '🔇';
      toggleBtn.style.opacity = enabled ? '1' : '0.5';
      audioManager.play('click'); // Play sound when toggling ON
    };

    volumeSlider.oninput = (e) => {
      const volume = parseInt(e.target.value) / 100;
      audioManager.setVolume(volume);
      volumeLabel.textContent = `${Math.round(volume * 100)}%`;
    };

    // Set initial toggle button state
    const enabled = audioManager.isEnabled();
    toggleBtn.textContent = enabled ? '🔊' : '🔇';
    toggleBtn.style.opacity = enabled ? '1' : '0.5';
  }
}