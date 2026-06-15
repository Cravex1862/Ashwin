let audioCtx = null;

export const initAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playClickSound = () => {
  if (!audioCtx) initAudioContext();
  if (!audioCtx) return;

  const t = audioCtx.currentTime;
  
  // Oscillator for a sharp "tick" body
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
  
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(t);
  osc.stop(t + 0.05);

  // Small noise burst for crispness
  const bufferSize = audioCtx.sampleRate * 0.05; // 50ms of noise
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 5000;
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.2, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  
  noise.start(t);
};

export const playWhooshSound = (delayMs = 0) => {
  if (!audioCtx) initAudioContext();
  if (!audioCtx) return;

  const t = audioCtx.currentTime + (delayMs / 1000);
  const dur = 1.0;

  // Filtered noise for whoosh wind effect
  const bufferSize = audioCtx.sampleRate * dur;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.value = 1.5;
  // Sweep frequency up then down
  bandpass.frequency.setValueAtTime(200, t);
  bandpass.frequency.exponentialRampToValueAtTime(1200, t + dur * 0.4);
  bandpass.frequency.exponentialRampToValueAtTime(200, t + dur);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(0.15, t + dur * 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start(t);
};
