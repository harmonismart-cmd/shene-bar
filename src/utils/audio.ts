/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private bgmInterval: any = null;
  private bgmIndex: number = 0;
  private bgmActive: boolean = false;

  // Retro arpeggiated loop pattern
  // Bass notes (very soft, triangle wave)
  // Treble notes (pleasant, sine wave)
  private bgmNotes = [
    { bass: 130.81, treble: 261.63 }, // C3, C4
    { bass: 130.81, treble: 329.63 }, // C3, E4
    { bass: 130.81, treble: 392.00 }, // C3, G4
    { bass: 130.81, treble: 329.63 }, // C3, E4
    { bass: 98.00,  treble: 293.66 }, // G2, D4
    { bass: 98.00,  treble: 349.23 }, // G2, F4
    { bass: 98.00,  treble: 392.00 }, // G2, G4
    { bass: 98.00,  treble: 349.23 }, // G2, F4
    { bass: 110.00, treble: 220.00 }, // A2, A3
    { bass: 110.00, treble: 261.63 }, // A2, C4
    { bass: 110.00, treble: 329.63 }, // A2, E4
    { bass: 110.00, treble: 261.63 }, // A2, C4
    { bass: 87.31,  treble: 349.23 }, // F2, F4
    { bass: 87.31,  treble: 440.00 }, // F2, A4
    { bass: 87.31,  treble: 523.25 }, // F2, C5
    { bass: 87.31,  treble: 440.00 }, // F2, A4
  ];

  constructor() {
    // Lazy initialisation to comply with browser autoplay guidelines
  }

  private init() {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      // Resume context if suspended (common in browser autoplay security models)
      if (this.ctx && this.ctx.state === 'suspended') {
        const promise = this.ctx.resume();
        if (promise && typeof promise.catch === 'function') {
          promise.catch((err) => {
            console.warn('AudioContext resume was blocked or failed:', err);
          });
        }
      }
    } catch (e) {
      console.error('Failed to initialize or resume Web Audio API:', e);
    }
  }

  startBGM() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.bgmActive) return;
    this.bgmActive = true;

    let nextNoteTime = this.ctx.currentTime;
    const tempo = 240; // ms per note

    const playNoteAt = (time: number, bassFreq: number, trebleFreq: number) => {
      if (!this.ctx || this.muted || !this.bgmActive) return;

      try {
        // Bass Note (Soft Triangle wave for classic 8-bit feeling)
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, time);
        bassGain.gain.setValueAtTime(0.008, time);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);
        bassOsc.start(time);
        bassOsc.stop(time + 0.4);

        // Treble Note (Soft Sine wave for ambient/pleasant sound)
        const trebleOsc = this.ctx.createOscillator();
        const trebleGain = this.ctx.createGain();
        trebleOsc.connect(trebleGain);
        trebleGain.connect(this.ctx.destination);
        trebleOsc.type = 'sine';
        trebleOsc.frequency.setValueAtTime(trebleFreq, time);
        trebleGain.gain.setValueAtTime(0.004, time);
        trebleGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
        trebleOsc.start(time);
        trebleOsc.stop(time + 0.25);
      } catch (e) {
        // Ignore audio play errors
      }
    };

    const tick = () => {
      if (!this.bgmActive || !this.ctx || this.muted) return;
      const lookAhead = 0.15; // seconds
      while (nextNoteTime < this.ctx.currentTime + lookAhead) {
        const note = this.bgmNotes[this.bgmIndex];
        playNoteAt(nextNoteTime, note.bass, note.treble);
        this.bgmIndex = (this.bgmIndex + 1) % this.bgmNotes.length;
        nextNoteTime += tempo / 1000;
      }
    };

    this.bgmInterval = window.setInterval(tick, 50);
  }

  stopBGM() {
    this.bgmActive = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (m) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
  }

  isMuted() {
    return this.muted;
  }

  playBleep() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime); // Classic 8-bit text scroll pitch
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio playBleep failed:', e);
    }
  }

  playSelect() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const playTone = (freq: number, start: number, duration: number) => {
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.03, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.01);
          osc.start(start);
          osc.stop(start + duration);
        } catch (inner) {}
      };

      playTone(523.25, now, 0.05); // C5
      playTone(659.25, now + 0.05, 0.06); // E5
    } catch (e) {
      console.warn('Audio playSelect failed:', e);
    }
  }

  playFanfare() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const playNote = (freq: number, start: number, duration: number) => {
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.02, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.02);
          osc.start(start);
          osc.stop(start + duration);
        } catch (inner) {}
      };

      // RPG Victory arpeggio (C major vibe)
      // C5 -> E5 -> G5 -> C6 -> G5 -> C6
      playNote(523.25, now, 0.08);       // C5
      playNote(659.25, now + 0.08, 0.08);  // E5
      playNote(784.00, now + 0.16, 0.08);  // G5
      playNote(1046.50, now + 0.24, 0.15); // C6
      playNote(784.00, now + 0.39, 0.08);  // G5
      playNote(1046.50, now + 0.47, 0.35); // C6 (Sustained)
    } catch (e) {
      console.warn('Audio playFanfare failed:', e);
    }
  }

  playCancel() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start();
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio playCancel failed:', e);
    }
  }
}

export const audio = new SoundSystem();
