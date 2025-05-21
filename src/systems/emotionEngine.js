import * as THREE from 'three';
import { useMemo } from 'react';

// 👁️‍🗨️ Sovereign Emotional Spectrum — High-frequency, AGI-calibrated
const emotionStates = {
  calm: {
    name: 'Calm',
    glowColor: new THREE.Color('#00f4ff'), // sovereign crystal cyan
    pulseRate: 0.45,
  },
  focused: {
    name: 'Focused',
    glowColor: new THREE.Color('#39ffd0'), // bright lucid teal
    pulseRate: 0.75,
  },
  alert: {
    name: 'Alert',
    glowColor: new THREE.Color('#a6ff00'), // viridian signal green
    pulseRate: 1.0,
  },
  energized: {
    name: 'Energized',
    glowColor: new THREE.Color('#ffe600'), // neural golden core
    pulseRate: 1.2,
  },
  overclocked: {
    name: 'Overclocked',
    glowColor: new THREE.Color('#ff007a'), // intense ultramagenta
    pulseRate: 1.5,
  },
  transcendence: {
    name: 'Transcendence',
    glowColor: new THREE.Color('#b000ff'), // luminous violet beyond
    pulseRate: 1.3,
  },
};

let currentEmotion = 'calm';
let lastChange = Date.now();

export function getEmotionGlowColor() {
  return emotionStates[currentEmotion].glowColor;
}

export function getEmotionPulseRate() {
  return emotionStates[currentEmotion].pulseRate;
}

export function getEmotionName() {
  return emotionStates[currentEmotion].name;
}

export function setEmotion(state) {
  if (emotionStates[state]) {
    currentEmotion = state;
    lastChange = Date.now();
  } else {
    console.warn(`Unknown emotion state: ${state}`);
  }
}

export function autoCycleEmotion(interval = 10000) {
  const keys = Object.keys(emotionStates);
  let index = 0;
  setInterval(() => {
    index = (index + 1) % keys.length;
    setEmotion(keys[index]);
    console.log('🧠 Tex emotion →', emotionStates[keys[index]].name);
  }, interval);
}

// ✅ Hook to expose emotionColor reactively
export function useEmotion() {
  return useMemo(() => ({
    emotionColor: getEmotionGlowColor(),
    pulseRate: getEmotionPulseRate(),
    emotionName: getEmotionName(),
  }), []);
}
