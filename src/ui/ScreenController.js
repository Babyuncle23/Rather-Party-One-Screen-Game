import { escapeHTML, escapeRegExp } from '../utils/sanitize.js';
import { t, applyStaticTexts } from '../i18n/I18nManager.js';

export class ScreenController {
  constructor() {
    this.screens = {
      setup: document.getElementById('setup-screen'),
      pass: document.getElementById('pass-screen'),
      lobby: document.getElementById('lobby-screen'),
      picker: document.getElementById('picker-screen'),
      responder: document.getElementById('responder-screen'),
      companion: document.getElementById('companion-screen'),
      guesser: document.getElementById('guesser-screen'),
      final: document.getElementById('final-screen')
    };
    
    this.modals = {
      loading: document.getElementById('loading-screen'),
      customAlert: document.getElementById('custom-alert-modal')
    };
  }

  switchScreen(screenName) {
    const safetyBtn = document.getElementById('safety-global-btn');
    const safetyTip = document.getElementById('safety-tip-text');
    const helpSection = document.querySelector('.help-section');
    const gameContainer = document.querySelector('.game-container');
    const finalScreenActive = screenName === 'final';
    const gameScreenActive = ['picker', 'responder', 'guesser', 'companion'].includes(screenName);

    document.body.classList.toggle('final-screen-active', finalScreenActive);
    document.body.classList.toggle('game-screen-active', gameScreenActive);

    if (gameContainer) {
      gameContainer.classList.toggle('hidden', finalScreenActive);
    }

    if (safetyBtn) {
      safetyBtn.classList.toggle('hidden', finalScreenActive);
      safetyBtn.setAttribute('aria-hidden', safetyBtn.classList.contains('hidden') ? 'true' : 'false');
    }

    if (safetyTip) {
      // На финале прячем подсказку; на остальных экранах видимостью
      // управляет игровая логика (она скрыта внутри матча).
      if (finalScreenActive) safetyTip.classList.add('hidden');
      safetyTip.setAttribute('aria-hidden', safetyTip.classList.contains('hidden') ? 'true' : 'false');
    }

    if (helpSection) {
      helpSection.classList.toggle('hidden', finalScreenActive);
      helpSection.setAttribute('aria-hidden', helpSection.classList.contains('hidden') ? 'true' : 'false');
    }

    let screenChanged = false;
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        const isTarget = key === screenName;
        this.screens[key].classList.toggle('hidden', !isTarget);
        if (isTarget) screenChanged = true;
      }
    });
    if (screenChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        // updateStatsBarVisibility живёт в module scope main.js — уведомляем через событие
        window.dispatchEvent(new CustomEvent('screenchange', { detail: { screen: screenName } }));
      }, 10);
    }
  }

  showLoading() {
    if (this.modals.loading) {
      this.modals.loading.classList.remove('hidden');
    }
  }

  hideLoading() {
    if (this.modals.loading) {
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
    
    // Вешаем клик на всю модалку вместо кнопки
    this.modals.customAlert.onclick = null; 
    this.modals.customAlert.onclick = () => {
      this.modals.customAlert.classList.add('hidden');
      if (onConfirm) onConfirm();
    };
  }

showPassScreen(player, onConfirm, note = null) {
    if (note === null) note = t('pass.defaultNote');
    this.screens.pass.classList.remove('hidden');
    const message = document.getElementById('pass-message');
    
    const highlightedTargetName = `<span class="player-name-pass-fade">${player.emoji || ''} ${escapeHTML(player.name.toUpperCase())}</span>`;

    // Экранируем note целиком (в нём могут быть имена игроков — пользовательский ввод)
    let cleanNote = escapeHTML(note);
    if (window.game) {
      const responder = window.game.players[window.game.getResponderIndex()];
      // Ищем уже экранированное имя; escapeRegExp защищает от метасимволов regex в имени
      const escapedName = escapeHTML(responder.name);
      const regex = new RegExp(escapeRegExp(escapedName), 'i');
      if (regex.test(cleanNote)) {
        cleanNote = cleanNote.replace(regex, `<span class="player-name-pass-fade">${responder.emoji} ${escapeHTML(responder.name.toUpperCase())}</span>`);
      }
    }

    // Добавили вывод cleanNote с аккуратными стилями под именем
    message.innerHTML = `${escapeHTML(t('pass.title'))}<br>${highlightedTargetName}<br><span style="display: block; font-size: 1.05rem; color: var(--muted); margin-top: 24px; font-weight: 600; text-transform: none; line-height: 1.45; letter-spacing: normal;">${cleanNote}</span>`;
    
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Фон не кликабелен — телефон передают из рук в руки, случайный тап
    // не должен открывать секретный экран. Только удержание кнопки 0.8с.
    this.screens.pass.onclick = null;

    const readyBtn = document.getElementById('pass-ready-btn');
    const readyLabel = document.getElementById('pass-ready-label');
    if (!readyBtn || !readyLabel) {
      this.screens.pass.classList.add('hidden');
      onConfirm();
      return;
    }

    readyLabel.innerText = t('pass.readyBtn', { name: player.name.toUpperCase() });

    const HOLD_MS = 800;
    let holdTimer = null;
    let activePointerId = null;
    const cancelHold = () => {
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      readyBtn.classList.remove('holding');
    };

    readyBtn.onpointerdown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (holdTimer) return;
      e.preventDefault();
      e.stopPropagation();
      activePointerId = e.pointerId ?? null;
      if (e.pointerId !== undefined && typeof readyBtn.setPointerCapture === 'function') {
        try { readyBtn.setPointerCapture(e.pointerId); } catch (err) {}
      }
      readyBtn.classList.add('holding');
      holdTimer = setTimeout(() => {
        holdTimer = null;
        readyBtn.classList.remove('holding');
        // Щит ставим ДО смены экрана: палец может быть ещё прижат,
        // и его touchend/click не должен «прострелить» в новый экран.
        this.suppressInputUntilRelease(activePointerId);
        this.screens.pass.classList.add('hidden');
        onConfirm();
      }, HOLD_MS);
    };
    readyBtn.onpointerup = cancelHold;
    readyBtn.onpointercancel = cancelHold;
    readyBtn.onpointerleave = cancelHold;
    readyBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); };
  }

  // Защита от «тапа насквозь»: пока палец, зажавший hold-кнопку, не оторвался
  // от экрана (+ короткий хвост), прозрачный щит глушит любой ввод — иначе
  // touchend/click может упасть на кнопку уже нового экрана (ghost click, iOS).
  suppressInputUntilRelease(pointerId, { tailMs = 300, maxMs = 1600 } = {}) {
    if (typeof document === 'undefined') return;
    if (this._inputGuardCleanup) this._inputGuardCleanup();

    const guard = document.createElement('div');
    guard.id = 'input-guard';
    guard.setAttribute('aria-hidden', 'true');
    document.body.appendChild(guard);

    const swallow = (e) => { e.preventDefault(); e.stopPropagation(); };
    ['pointerdown', 'pointerup', 'pointercancel', 'mousedown', 'mouseup', 'click',
     'dblclick', 'touchstart', 'touchmove', 'touchend', 'contextmenu']
      .forEach(type => guard.addEventListener(type, swallow, { passive: false }));

    let tailTimer = null, removed = false;
    const cleanup = () => {
      if (removed) return;
      removed = true;
      if (tailTimer) { clearTimeout(tailTimer); tailTimer = null; }
      window.removeEventListener('pointerup', onRelease, true);
      window.removeEventListener('pointercancel', onRelease, true);
      if (guard.parentNode) guard.parentNode.removeChild(guard);
      if (this._inputGuardCleanup === cleanup) this._inputGuardCleanup = null;
    };
    const onRelease = (e) => {
      if (pointerId == null || e.pointerId === undefined || e.pointerId === pointerId) {
        if (!tailTimer) tailTimer = setTimeout(cleanup, tailMs);
      }
    };
    window.addEventListener('pointerup', onRelease, true);
    window.addEventListener('pointercancel', onRelease, true);
    setTimeout(cleanup, maxMs); // failsafe
    this._inputGuardCleanup = cleanup;
  }

setupAudioControl(audioManager) {
    const panel = document.createElement('div');
    panel.className = 'audio-control-panel';
    panel.id = 'audio-control-panel';
    // Оставляем только кнопку
    panel.innerHTML = `
      <button id="audio-toggle-btn" title="Toggle sound" aria-label="Toggle sound" data-i18n-aria="a11y.toggleSound" data-i18n-title="a11y.toggleSound"></button>
    `;
    // Звук сидит в одной строке с Safety и ⚙️ — не перекрывает контент снизу
    const headerRow = document.querySelector('.help-header-row');
    (headerRow || document.body).appendChild(panel);
    // Панель добавлена после первого applyStaticTexts — переводим атрибуты сразу
    applyStaticTexts(panel);

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