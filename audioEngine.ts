/**
 * Professional Web Audio Engine for ZIMI
 * Supports real audio file playback, synthesized preview mode, and frequency spectrum analysis.
 * Handles failed audio loading gracefully without ever pretending audio exists when missing.
 */

export type AudioPlaybackMode = 'master_audio' | 'synthesized_preview' | 'unavailable';

class AudioSynthesizerEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.85;
  private isMuted: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  private intervalTimer: number | null = null;
  private playbackSeconds: number = 0;
  private currentTrackDuration: number = 240;
  private audioElement: HTMLAudioElement | null = null;
  private mediaElementSource: MediaElementAudioSourceNode | null = null;
  private currentMode: AudioPlaybackMode = 'synthesized_preview';

  private onTimeUpdateCallback: ((currentTime: number, progress: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private onModeChangeCallback: ((mode: AudioPlaybackMode, statusText: string) => void) | null = null;

  // Harmonically tuned frequencies in Hz
  private readonly presets: Record<string, { root: number; chords: number[][]; bass: number[]; tempo: number; filterFreq: number }> = {
    aether: {
      root: 174.61, // F3
      chords: [
        [174.61, 220.00, 261.63, 349.23],
        [155.56, 196.00, 233.08, 311.13],
        [130.81, 164.81, 196.00, 261.63],
        [146.83, 174.61, 220.00, 293.66],
      ],
      bass: [87.31, 77.78, 65.41, 73.42],
      tempo: 124,
      filterFreq: 1200,
    },
    eclipse: {
      root: 155.56, // Eb3
      chords: [
        [155.56, 185.00, 233.08, 311.13],
        [138.59, 174.61, 207.65, 277.18],
        [116.54, 146.83, 174.61, 233.08],
        [123.47, 155.56, 185.00, 246.94],
      ],
      bass: [77.78, 69.30, 58.27, 61.74],
      tempo: 122,
      filterFreq: 950,
    },
    subzero: {
      root: 130.81, // C3
      chords: [
        [130.81, 155.56, 196.00, 261.63],
        [116.54, 138.59, 174.61, 233.08],
        [103.83, 130.81, 155.56, 207.65],
        [98.00, 123.47, 146.83, 196.00],
      ],
      bass: [65.41, 58.27, 51.91, 49.00],
      tempo: 128,
      filterFreq: 750,
    },
    monolith: {
      root: 146.83, // D3
      chords: [
        [146.83, 174.61, 220.00, 293.66],
        [174.61, 220.00, 261.63, 349.23],
        [130.81, 164.81, 196.00, 261.63],
        [110.00, 130.81, 164.81, 220.00],
      ],
      bass: [73.42, 87.31, 65.41, 55.00],
      tempo: 120,
      filterFreq: 1400,
    },
    solaris: {
      root: 196.00, // G3
      chords: [
        [196.00, 233.08, 293.66, 392.00],
        [174.61, 220.00, 261.63, 349.23],
        [146.83, 174.61, 220.00, 293.66],
        [164.81, 196.00, 246.94, 329.63],
      ],
      bass: [98.00, 87.31, 73.42, 82.41],
      tempo: 116,
      filterFreq: 1100,
    }
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playTrack(
    presetName: string = 'aether',
    durationSeconds: number = 240,
    startOffset: number = 0,
    audioUrl?: string
  ) {
    this.initContext();
    this.stopAudioNodes();

    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.currentTrackDuration = durationSeconds;
    this.playbackSeconds = startOffset;

    // Check if actual audio URL exists
    if (audioUrl) {
      this.playActualAudio(audioUrl, startOffset);
      return;
    }

    // Otherwise, play high-fidelity synthesized preview and explicitly notify UI
    this.currentMode = 'synthesized_preview';
    if (this.onModeChangeCallback) {
      this.onModeChangeCallback('synthesized_preview', 'Synthesized Ambient Preview · Official Master Awaiting Upload');
    }

    const preset = this.presets[presetName] || this.presets.aether;
    const now = this.ctx.currentTime;

    // 1. Create Sub Bass Drone Node
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    const bassFilter = this.ctx.createBiquadFilter();

    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(preset.bass[0], now);
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(140, now);

    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.linearRampToValueAtTime(0.35, now + 1.5);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.masterGain);

    bassOsc.start(now);
    this.activeOscillators.push(bassOsc);
    this.activeGains.push(bassGain);

    // 2. Create Atmospheric Pad / Chord Oscillators
    const chord = preset.chords[0];
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(freq * (1 + (idx - 1.5) * 0.003), now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08 / chord.length, now + 2.0);

      if (panner) {
        panner.pan.setValueAtTime((idx - 1.5) * 0.45, now);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      this.activeOscillators.push(osc);
      this.activeGains.push(gain);
    });

    // 3. Start interval ticker for progression and harmonic shifts
    let step = 0;
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
    }

    this.intervalTimer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;

      this.playbackSeconds += 1;
      const progress = Math.min(100, (this.playbackSeconds / this.currentTrackDuration) * 100);

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.playbackSeconds, progress);
      }

      if (this.playbackSeconds >= this.currentTrackDuration) {
        this.stop();
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
        return;
      }

      if (this.playbackSeconds % 4 === 0) {
        step = (step + 1) % preset.chords.length;
        const currentChord = preset.chords[step];
        const nextBass = preset.bass[step];

        if (bassOsc && this.ctx) {
          bassOsc.frequency.setTargetAtTime(nextBass, this.ctx.currentTime, 0.4);
        }

        this.activeOscillators.forEach((osc, i) => {
          if (i > 0 && currentChord[i - 1] && this.ctx) {
            osc.frequency.setTargetAtTime(currentChord[i - 1] * (1 + (i - 2) * 0.002), this.ctx.currentTime, 0.6);
          }
        });
      }
    }, 1000);
  }

  private playActualAudio(url: string, startOffset: number) {
    if (!this.ctx || !this.masterGain) return;

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }

    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';
    audio.currentTime = startOffset;
    audio.volume = this.isMuted ? 0 : this.currentVolume;

    audio.oncanplay = () => {
      this.currentMode = 'master_audio';
      if (this.onModeChangeCallback) {
        this.onModeChangeCallback('master_audio', 'Master Audio Stream Active');
      }
      audio.play().catch(() => {
        this.handleAudioFallback();
      });
    };

    audio.onerror = () => {
      this.handleAudioFallback();
    };

    audio.ontimeupdate = () => {
      this.playbackSeconds = Math.round(audio.currentTime);
      const dur = audio.duration || this.currentTrackDuration;
      const progress = (this.playbackSeconds / dur) * 100;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.playbackSeconds, progress);
      }
    };

    audio.onended = () => {
      this.stop();
      if (this.onEndedCallback) {
        this.onEndedCallback();
      }
    };

    try {
      this.mediaElementSource = this.ctx.createMediaElementSource(audio);
      this.mediaElementSource.connect(this.masterGain);
      this.audioElement = audio;
    } catch {
      this.handleAudioFallback();
    }
  }

  private handleAudioFallback() {
    this.currentMode = 'unavailable';
    if (this.onModeChangeCallback) {
      this.onModeChangeCallback('unavailable', 'Audio Source File Unavailable · Falling back to soundscape');
    }
    this.playTrack('aether', this.currentTrackDuration, this.playbackSeconds);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopAudioNodes();
  }

  public stop() {
    this.pause();
    this.playbackSeconds = 0;
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(0, 0);
    }
  }

  public seek(seconds: number, presetName: string = 'aether') {
    this.playbackSeconds = Math.max(0, Math.min(seconds, this.currentTrackDuration));
    if (this.audioElement) {
      this.audioElement.currentTime = this.playbackSeconds;
    } else if (this.isPlaying) {
      this.playTrack(presetName, this.currentTrackDuration, this.playbackSeconds);
    } else {
      const progress = (this.playbackSeconds / this.currentTrackDuration) * 100;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.playbackSeconds, progress);
      }
    }
  }

  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.currentVolume;
    }
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getPlaybackMode(): AudioPlaybackMode {
    return this.currentMode;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);
    return array;
  }

  public onTimeUpdate(callback: (currentTime: number, progress: number) => void) {
    this.onTimeUpdateCallback = callback;
  }

  public onEnded(callback: () => void) {
    this.onEndedCallback = callback;
  }

  public onModeChange(callback: (mode: AudioPlaybackMode, statusText: string) => void) {
    this.onModeChangeCallback = callback;
  }

  private stopAudioNodes() {
    this.activeGains.forEach(gain => {
      try {
        if (this.ctx) {
          gain.gain.setValueAtTime(gain.gain.value, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
        }
      } catch {
        // ignore
      }
    });

    setTimeout(() => {
      this.activeOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeOscillators = [];
      this.activeGains = [];
    }, 180);
  }
}

export const audioEngine = new AudioSynthesizerEngine();
