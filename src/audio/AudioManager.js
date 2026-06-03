/**
 * AudioManager - Centralized audio playback system
 * Handles sound effects with volume control and efficient audio pooling
 */
export class AudioManager {
  constructor() {
    this.audioPool = {};
    this.volume = 0.5; // Default volume: 50%
    this.enabled = true;
    
    // Initialize audio pools for each sound type
    this.audioPool.click = this.createAudioPool('src/audio/click.mp3', 3);
    this.audioPool.win = this.createAudioPool('src/audio/win.mp3', 2);
    this.audioPool.lose = this.createAudioPool('src/audio/lose.ogg', 2);
    
    // Restore saved volume preference
    this.loadSettings();
    
    // Инициализируем Web Audio Context и буферы для моментального воспроизведения
    this.audioCtx = null;
    this.typewriterBuffer = null;
    this.flapBuffer = null;
    this.isPreloaded = false;
  }

  /**
   * Create a pool of audio elements for efficient playback
   * @param {string} src - Path to audio file
   * @param {number} count - Number of audio instances to pool
   * @returns {Array} Array of audio elements
   */
  createAudioPool(src, count) {
    const pool = [];
    for (let i = 0; i < count; i++) {
      const audio = new Audio(src);
      audio.volume = this.volume;
      pool.push(audio);
    }
    return pool;
  }

  /**
   * Get an available audio element from pool, cycling through if needed
   * @param {string} type - Type of sound ('click', 'win', 'lose')
   * @returns {Audio|null} Audio element or null if type not found
   */
  getPooledAudio(type) {
    const pool = this.audioPool[type];
    if (!pool) return null;
    
    // Вычисляем стартовое время: для клика пропускаем тишину (0.33 сек), для остальных с самого начала
    const startTime = (type === 'click') ? 0.10 : 0;
    
    // Find a stopped audio element
    for (let audio of pool) {
      if (audio.paused || audio.ended) {
        audio.currentTime = startTime;
        return audio;
      }
    }
    
    // If all are playing, return the first one (will restart it)
    const audio = pool[0];
    audio.currentTime = startTime;
    return audio;
  }

  /**
   * Play a sound effect
   * @param {string} type - Type of sound ('click', 'win', 'lose')
   * @param {number} volumeOverride - Optional volume override (0-1)
   */
  play(type, volumeOverride = null) {
    if (!this.enabled) return;
    
    const audio = this.getPooledAudio(type);
    if (!audio) {
      console.warn(`Audio type '${type}' not found`);
      return;
    }
    
    audio.volume = volumeOverride !== null ? volumeOverride : this.volume;
    audio.play().catch(err => {
      // Silently fail for browser autoplay restrictions
      console.debug(`Audio playback prevented: ${err.message}`);
    });
  }

  /**
   * Set global volume (0-1)
   * @param {number} level - Volume level from 0 to 1
   */
  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    
    // Update all pooled audio elements
    Object.values(this.audioPool).forEach(pool => {
      pool.forEach(audio => {
        audio.volume = this.volume;
      });
    });
    
    this.saveSettings();
  }

  /**
   * Get current volume
   * @returns {number} Current volume level (0-1)
   */
  getVolume() {
    return this.volume;
  }

  /**
   * Toggle sound on/off
   */
  toggleEnabled() {
    this.enabled = !this.enabled;
    this.saveSettings();
    return this.enabled;
  }

  /**
   * Check if audio is enabled
   * @returns {boolean} Whether audio is enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    localStorage.setItem('audioVolume', this.volume.toString());
    localStorage.setItem('audioEnabled', this.enabled.toString());
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    const savedVolume = localStorage.getItem('audioVolume');
    const savedEnabled = localStorage.getItem('audioEnabled');
    
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }
  }

  /**
   * Предзагрузка аудиофайлов в память, чтобы они играли мгновенно без сетевых задержек
   */
  async preloadRevealSounds() {
    if (this.isPreloaded || !this.enabled) return;
    
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      const loadBuffer = async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioCtx.decodeAudioData(arrayBuffer);
      };

      // Скачиваем и декодируем файлы в оперативную память один раз
      const [typewriter, flap] = await Promise.all([
        loadBuffer('src/audio/typewriter.mp3'),
        loadBuffer('src/audio/flap.mp3')
      ]);

      this.typewriterBuffer = typewriter;
      this.flapBuffer = flap;
      this.isPreloaded = true;
    } catch (err) {
      console.debug("Preloading reveal sounds failed:", err.message);
    }
  }

  /**
   * Мгновенное воспроизведение комбинации звуков из памяти
   */
  async playRevealCombo() {
    if (!this.enabled) return;

    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      // Если игроки играют очень быстро и файлы еще не загрузились, загружаем на лету
      if (!this.isPreloaded) {
        await this.preloadRevealSounds();
      }

      if (!this.typewriterBuffer || !this.flapBuffer) return;

      const now = this.audioCtx.currentTime;

      // 1. ВОСПРОИЗВЕДЕНИЕ FLAP (моментально из памяти)
      const flapSource = this.audioCtx.createBufferSource();
      flapSource.buffer = this.flapBuffer;
      const flapGain = this.audioCtx.createGain();
      flapGain.gain.value = this.volume;
      flapSource.connect(flapGain);
      flapGain.connect(this.audioCtx.destination);
      flapSource.start(now);

      // 2. ВОСПРОИЗВЕДЕНИЕ TYPEWRITER (громче, строго с 1-й по 3-ю секунду)
      const typewriterSource = this.audioCtx.createBufferSource();
      typewriterSource.buffer = this.typewriterBuffer;
      const typewriterGain = this.audioCtx.createGain();
      typewriterGain.gain.value = Math.min(1.0, this.volume * 1.6);
      typewriterSource.connect(typewriterGain);
      typewriterGain.connect(this.audioCtx.destination);
      
      // Начинаем с 1-й секунды файла, играем 2 секунды
      typewriterSource.start(now, 1.0, 2.0);

    } catch (err) {
      console.debug("Instant audio combo failed:", err.message);
    }
  }
}