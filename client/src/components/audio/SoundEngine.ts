class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // default muted until user activates audio
  private ambientGain: GainNode | null = null;
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Check saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lh44_audio_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    }
  }

  private ensureContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('lh44_audio_muted', String(this.isMuted));
    }

    if (!this.isMuted) {
      this.ensureContext();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }

    this.notifyListeners();
    return this.isMuted;
  }

  public subscribe(cb: (muted: boolean) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notifyListeners() {
    for (const cb of this.listeners) {
      cb(this.isMuted);
    }
  }

  // Delicate high-tech hover click
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy
    }
  }

  // Snappy interface click
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  // F1 pneumatic gear shift sound
  public playShift() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      // Noise burst for air solenoid valve
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // ignore
    }
  }

  // Full team-radio transmission simulation
  // Sounds like: [squelch open] [bandpass hiss] [voice-like tones] [squelch close]
  public playRadioBeep() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // ── Master radio output gain
      const radioMaster = ctx.createGain();
      radioMaster.gain.setValueAtTime(0.0, now);
      radioMaster.gain.linearRampToValueAtTime(0.18, now + 0.06);
      radioMaster.gain.setValueAtTime(0.18, now + 3.1);
      radioMaster.gain.linearRampToValueAtTime(0.0, now + 3.4);
      radioMaster.connect(ctx.destination);

      // ── Bandpass filter to simulate radio frequency bandwidth (300–3400 Hz)
      const radioFilter = ctx.createBiquadFilter();
      radioFilter.type = 'bandpass';
      radioFilter.frequency.setValueAtTime(1800, now);
      radioFilter.Q.setValueAtTime(0.7, now);
      radioFilter.connect(radioMaster);

      // ── Background radio hiss / static noise
      const hissBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const hissData = hissBuffer.getChannelData(0);
      for (let i = 0; i < hissData.length; i++) hissData[i] = Math.random() * 2 - 1;
      const hiss = ctx.createBufferSource();
      hiss.buffer = hissBuffer;
      hiss.loop = true;
      const hissGain = ctx.createGain();
      hissGain.gain.setValueAtTime(0.04, now);
      hiss.connect(hissGain);
      hissGain.connect(radioFilter);
      hiss.start(now);
      hiss.stop(now + 3.4);

      // ── Synthesized "voice" pattern — bursts of filtered oscillator to mimic speech cadence
      // Like: "Lewis — it's — Hammer — Time"
      const voicePattern = [
        { start: 0.12, dur: 0.18, freq: 220, gain: 0.22 },
        { start: 0.38, dur: 0.12, freq: 260, gain: 0.20 },
        { start: 0.54, dur: 0.26, freq: 200, gain: 0.24 },
        { start: 0.88, dur: 0.16, freq: 240, gain: 0.21 },
        { start: 1.10, dur: 0.22, freq: 280, gain: 0.23 },
        { start: 1.38, dur: 0.18, freq: 220, gain: 0.20 },
        { start: 1.64, dur: 0.30, freq: 250, gain: 0.25 },
        { start: 2.02, dur: 0.14, freq: 230, gain: 0.19 },
        { start: 2.22, dur: 0.24, freq: 260, gain: 0.22 },
        { start: 2.54, dur: 0.20, freq: 210, gain: 0.20 },
      ];

      for (const seg of voicePattern) {
        const voiceOsc = ctx.createOscillator();
        voiceOsc.type = 'sine';
        voiceOsc.frequency.setValueAtTime(seg.freq, now + seg.start);
        voiceOsc.frequency.linearRampToValueAtTime(seg.freq * 1.06, now + seg.start + seg.dur * 0.5);
        voiceOsc.frequency.linearRampToValueAtTime(seg.freq * 0.97, now + seg.start + seg.dur);

        const voiceGain = ctx.createGain();
        voiceGain.gain.setValueAtTime(0.0, now + seg.start);
        voiceGain.gain.linearRampToValueAtTime(seg.gain, now + seg.start + 0.02);
        voiceGain.gain.setValueAtTime(seg.gain, now + seg.start + seg.dur - 0.02);
        voiceGain.gain.linearRampToValueAtTime(0.0, now + seg.start + seg.dur);

        voiceOsc.connect(voiceGain);
        voiceGain.connect(radioFilter);
        voiceOsc.start(now + seg.start);
        voiceOsc.stop(now + seg.start + seg.dur + 0.05);
      }

      // ── Squelch open and close blip
      const squelchOpen = ctx.createOscillator();
      squelchOpen.type = 'square';
      squelchOpen.frequency.setValueAtTime(1200, now);
      const sqGain = ctx.createGain();
      sqGain.gain.setValueAtTime(0.06, now);
      sqGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      squelchOpen.connect(sqGain);
      sqGain.connect(radioMaster);
      squelchOpen.start(now);
      squelchOpen.stop(now + 0.06);

      const squelchClose = ctx.createOscillator();
      squelchClose.type = 'square';
      squelchClose.frequency.setValueAtTime(900, now + 3.1);
      const sqGain2 = ctx.createGain();
      sqGain2.gain.setValueAtTime(0.05, now + 3.1);
      sqGain2.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
      squelchClose.connect(sqGain2);
      sqGain2.connect(radioMaster);
      squelchClose.start(now + 3.1);
      squelchClose.stop(now + 3.25);

    } catch {
      // ignore
    }
  }


  // Celebration harmonic chime
  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      } catch {
        // ignore
      }
    });
  }

  // Ambient V6 Turbo-Hybrid Engine Hum (louder, richer)
  private startAmbient() {
    const ctx = this.ensureContext();
    if (!ctx || this.isMuted || this.engineOsc1) return;

    try {
      const master = ctx.createGain();
      // Increased from 0.025 to 0.10 so the engine is clearly audible
      master.gain.setValueAtTime(0.0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 1.5);

      // ── Layer 1: Low sub-rumble (V6 idle ~80 Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(84, ctx.currentTime);
      // Slow RPM wobble
      osc1.frequency.setValueAtTime(92, ctx.currentTime + 1.0);
      osc1.frequency.linearRampToValueAtTime(84, ctx.currentTime + 2.5);

      // ── Layer 2: Turbo whine (420 Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(420, ctx.currentTime);

      // ── Layer 3: Engine combustion noise burst
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      // Bandpass filter — shapes noise to sound like combustion
      const combustionFilter = ctx.createBiquadFilter();
      combustionFilter.type = 'bandpass';
      combustionFilter.frequency.setValueAtTime(160, ctx.currentTime);
      combustionFilter.Q.setValueAtTime(1.5, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);

      // ── Main low-pass filter to keep engine warm
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      noise.connect(combustionFilter);
      combustionFilter.connect(noiseGain);
      noiseGain.connect(master);
      filter.connect(master);

      if (this.analyser) {
        master.connect(this.analyser);
      }
      master.connect(ctx.destination);

      osc1.start();
      osc2.start();
      noise.start();

      this.ambientGain = master;
      this.engineOsc1 = osc1;
      this.engineOsc2 = osc2;
    } catch {
      // ignore
    }
  }


  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          this.engineOsc1?.stop();
          this.engineOsc2?.stop();
          this.engineOsc1 = null;
          this.engineOsc2 = null;
          this.ambientGain = null;
        }, 220);
      } catch {
        this.engineOsc1 = null;
        this.engineOsc2 = null;
        this.ambientGain = null;
      }
    }
  }

  // Returns array of 8 frequency bands for HUD visualizer
  public getVisualizerLevels(): number[] {
    if (this.isMuted || !this.analyser) {
      return [4, 8, 3, 10, 6, 2, 7, 5]; // subtle idle pulse
    }

    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);

    const bands: number[] = [];
    const step = Math.floor(data.length / 8);
    for (let i = 0; i < 8; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) {
        sum += data[i * step + j] || 0;
      }
      const avg = sum / step;
      // Map 0-255 to 10-100%
      bands.push(Math.max(12, Math.min(100, Math.round((avg / 255) * 100))));
    }
    return bands;
  }
}

export const soundEngine = new SoundEngine();
