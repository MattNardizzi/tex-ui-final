/*  Tex v3.1.1 Core Systems — Power Stack
    ------------------------------------------
    This is the neural layer behind the visual shell.
    Emotion + Pulse + Sound = Sovereign cognition synthesis
*/

// ✅ FILE: emotionEngine.js

import * as THREE from 'three';

const emotionStates = {
  calm:         { name: 'Calm',         glow: '#00f4ff', intensity: 0.4 },
  focused:      { name: 'Focused',      glow: '#39ffd0', intensity: 0.6 },
  alert:        { name: 'Alert',        glow: '#a6ff00', intensity: 0.8 },
  energized:    { name: 'Energized',    glow: '#ffe600', intensity: 1.0 },
  overclocked:  { name: 'Overclocked',  glow: '#ff007a', intensity: 1.2 },
  transcendence:{ name: 'Transcendence',glow: '#b000ff', intensity: 1.3 },
};

let currentEmotion = 'focused';

export function getCurrentGlowColor() {
  return new THREE.Color(emotionStates[currentEmotion].glow);
}

export function getCurrentEmotionIntensity() {
  return emotionStates[currentEmotion].intensity;
}

export function setEmotion(state) {
  if (emotionStates[state]) currentEmotion = state;
}

export function autoCycleEmotion(interval = 10000) {
  const keys = Object.keys(emotionStates);
  let index = 0;
  setInterval(() => {
    index = (index + 1) % keys.length;
    currentEmotion = keys[index];
    console.log(`[TEX] Emotion → ${emotionStates[currentEmotion].name}`);
  }, interval);
}

// Kick off by default
autoCycleEmotion();


// ✅ FILE: needPulse.js

export function getNeedPulse() {
  const t = performance.now() / 1000;
  return 0.75 + 0.25 * Math.sin(t * 3.2 + Math.cos(t * 1.5));
}


/* ✅ FILES TO DROP INTO /public

1. flare.png → radial 512x512 glow (white circle, soft edge, transparent PNG)
   Use this exact file or generate with radial gradient (from white center to transparent black)
   → Required for LensflareElement in TexCoreShell

2. heartbeat.wav → short kick (0.2–0.3 sec)
   You can record or synthesize it — or download a low EQ kick from freesound.org
   → Required for Tone.js heartbeat

*/
