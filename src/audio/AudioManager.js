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
    
    // Find a stopped audio element
    for (let audio of pool) {
      if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        return audio;
      }
    }
    
    // If all are playing, return the first one (will restart it)
    const audio = pool[0];
    audio.currentTime = 0;
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
}
