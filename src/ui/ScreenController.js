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
  }

  switchScreen(screenName) {
    let screenChanged = false;
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        const isTarget = key === screenName;
        const currentDisplay = this.screens[key].style.display;
        const nextDisplay = key === 'pass' ? (isTarget ? 'flex' : 'none') : (isTarget ? 'block' : 'none');
        
        if (currentDisplay !== nextDisplay) {
          this.screens[key].style.display = nextDisplay;
          if (isTarget) screenChanged = true;
        }
      }
    });
    // Скроллим наверх только если игрок действительно перешел на новый игровой экран
    if (screenChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

showPassScreen(player, onConfirm, note = "Only this player should look at the phone. Keep it hidden from others.") {
    this.screens.pass.style.display = 'flex';
    const message = document.getElementById('pass-message');
    const btn = document.getElementById('pass-confirm-btn');
    
    // Подсвечиваем имя главного получателя вместе с его эмодзи
    // Подсвечиваем имя главного получателя телефона вместе с его эмодзи
    const highlightedTargetName = `<span class="player-name-pass-fade">${player.emoji || ''} ${player.name.toUpperCase()}</span>`;
    
    // Если в тексте записки note встречается имя отвечающего, подсвечиваем его и добавляем его эмодзи
    let cleanNote = note;
    if (window.game) {
      const responder = window.game.players[window.game.getResponderIndex()];
      const responderName = responder.name.toUpperCase();
      if (cleanNote.includes(responderName)) {
        cleanNote = cleanNote.replace(responderName, `<span class="player-name-pass-fade">${responder.emoji} ${responderName}</span>`);
      }
    }

    message.innerHTML = `PASS THE PHONE TO:<br>${highlightedTargetName}<br><br><span style="font-size: 1.2rem; font-weight: 400; color: var(--muted);">${cleanNote}</span>`;
    
    // Скроллим наверх, чтобы окно передачи телефона гарантированно отцентрировалось по высоте экрана мобильного
    window.scrollTo({ top: 0, behavior: 'instant' });

    btn.onclick = null;
    btn.onclick = () => {
      this.screens.pass.style.display = 'none';
      onConfirm();
    };
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