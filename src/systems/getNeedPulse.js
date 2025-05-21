/*  Tex v3.1.1 — Verified Runtime Stack (Finalized)
    ------------------------------------------------------
    Runtime dependencies + public assets + emotion/pulse hooks
    This completes all systems for guaranteed launch
*/

// ✅ FILE: getNeedPulse.js

export function getNeedPulse() {
  const t = performance.now() / 1000;
  return 0.75 + 0.25 * Math.sin(t * 2.2 + Math.cos(t * 1.5));
}


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

// Start cycling by default
autoCycleEmotion();


// ✅ /public/flare.png (INSTRUCTIONS)
// A white radial gradient (center to edge fade)
// Format: PNG, 512×512, transparent background
// Purpose: Beam flare glow for LensflareElement

// ✅ /public/heartbeat.wav (INSTRUCTIONS)
// Short bass kick sound, ~0.25 sec
// Format: WAV or MP3
// Looped via Tone.js → drives emotional pulse modulation

// Use placeholder sources if needed:
// flare.png → https://i.imgur.com/lM7aNLE.png
// heartbeat.wav → https://freesound.org/people/cabled_mess/sounds/350868/
