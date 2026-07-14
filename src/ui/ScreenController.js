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
    
    this.modals = {
      loading: document.getElementById('loading-screen'),
      customAlert: document.getElementById('custom-alert-modal')
    };
  }

  switchScreen(screenName) {
    let screenChanged = false;
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        const isTarget = key === screenName;
        const nextDisplay = key === 'pass' ? (isTarget ? 'flex' : 'none') : (isTarget ? 'block' : 'none');
        this.screens[key].classList.toggle('hidden', !isTarget);
        this.screens[key].style.display = nextDisplay;
        if (isTarget) screenChanged = true;
      }
    });
    if (screenChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Delay to ensure DOM has updated
      setTimeout(() => {
        if (typeof updateStatsBarVisibility === 'function') {
          updateStatsBarVisibility();
        }
      }, 10);
    }
  }

  showLoading() {
    if (this.modals.loading) {
      this.modals.loading.classList.remove('hidden');
      this.modals.loading.style.display = 'flex';
    }
  }

  hideLoading() {
    if (this.modals.loading) {
      this.modals.loading.style.display = 'none';
      this.modals.loading.classList.add('hidden');
    }
  }

showAlert(title, message, onConfirm = null) {
    if (!this.modals.customAlert) {
      alert(message); // Fallback if HTML is missing
      if (onConfirm) onConfirm();
      return;
    }
    
    document.getElementById('custom-alert-title').innerHTML = title;
    document.getElementById('custom-alert-message').innerHTML = message;
    
    this.modals.customAlert.classList.remove('hidden');
    this.modals.customAlert.style.display = 'flex';
    
    // Вешаем клик на всю модалку вместо кнопки
    this.modals.customAlert.onclick = null; 
    this.modals.customAlert.onclick = () => {
      this.modals.customAlert.style.display = 'none';
      if (onConfirm) onConfirm();
    };
  }

showPassScreen(player, onConfirm, note = "Only this player should look at the phone. Keep it hidden from others.") {
    this.screens.pass.classList.remove('hidden');
    this.screens.pass.style.display = 'flex';
    const message = document.getElementById('pass-message');
    
    const highlightedTargetName = `<span class="player-name-pass-fade">${player.emoji || ''} ${player.name.toUpperCase()}</span>`;
    
    let cleanNote = note;
    if (window.game) {
      const responder = window.game.players[window.game.getResponderIndex()];
      // Делаем поиск имени нечувствительным к регистру, чтобы точно подсветить его
      const regex = new RegExp(responder.name, 'i');
      if (regex.test(cleanNote)) {
        cleanNote = cleanNote.replace(regex, `<span class="player-name-pass-fade">${responder.emoji} ${responder.name.toUpperCase()}</span>`);
      }
    }

    // Добавили вывод cleanNote с аккуратными стилями под именем
    message.innerHTML = `PASS THE PHONE TO:<br>${highlightedTargetName}<br><span style="display: block; font-size: 1.05rem; color: var(--muted); margin-top: 24px; font-weight: 600; text-transform: none; line-height: 1.45; letter-spacing: normal;">${cleanNote}</span>`;
    
    window.scrollTo({ top: 0, behavior: 'instant' });

    this.screens.pass.onclick = null;
    this.screens.pass.onclick = () => {
      this.screens.pass.style.display = 'none';
      onConfirm();
    };
  }

setupAudioControl(audioManager) {
    const panel = document.createElement('div');
    panel.className = 'audio-control-panel';
    panel.id = 'audio-control-panel';
    // Оставляем только кнопку
    panel.innerHTML = `
      <button id="audio-toggle-btn" title="Toggle sound" aria-label="Toggle sound"></button>
    `;
    document.body.appendChild(panel);

    const toggleBtn = document.getElementById('audio-toggle-btn');

    // Функция обновления иконки
    const updateIcon = () => {
      const enabled = audioManager.isEnabled();
      toggleBtn.textContent = enabled ? '🔊' : '🔇';
      toggleBtn.style.opacity = enabled ? '1' : '0.5';
    };

    // Обычный клик для вкл/выкл
    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      audioManager.toggleEnabled();
      updateIcon();
      audioManager.play('click');
    };

    updateIcon(); // Устанавливаем иконку при старте
  }
}