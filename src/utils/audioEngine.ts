/**
 * Lightweight zero-dependency Web Audio API sound synthesizer
 * for polite, tactile UI micro-interactions and algorithm audio feedback.
 */

class AudioEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    // Audio is muted by default per modern UX standards
    const stored = typeof window !== 'undefined' ? localStorage.getItem('nayak_audio_enabled') : null
    this.enabled = stored === 'true'
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(val: boolean) {
    this.enabled = val
    if (typeof window !== 'undefined') {
      localStorage.setItem('nayak_audio_enabled', String(val))
    }
    if (val) {
      this.initContext()
      this.playSuccess(0.1)
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled)
    return this.enabled
  }

  /**
   * Crisp, subtle tactile click for button presses & tab switches
   */
  public playClick(pitch: number = 800, volume: number = 0.04) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(volume, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Ignore audio failure gracefully
    }
  }

  /**
   * Melodic sine tone for algorithm sorting swaps & data points
   */
  public playTone(freq: number, duration: number = 0.06, volume: number = 0.035) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(volume, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Gentle frequency sweep for modal opening / drawer sliding
   */
  public playWhoosh(volume: number = 0.03) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(550, this.ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime)
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.12)
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Harmonic success chord for form submissions, copy, and CLI execution
   */
  public playSuccess(volume: number = 0.05) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.18, volume)
      }, i * 45)
    })
  }
}

export const sound = new AudioEngine()
