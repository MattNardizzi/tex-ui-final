import * as THREE from 'three';
import { useState, useEffect } from 'react';

// 👁️‍🗨️ Sovereign Emotional Spectrum — High-frequency, AGI-calibrated
const emotionStates = {
  calm: {
    name: 'Calm',
    glowColor: new THREE.Color('#00f4ff'),
    pulseRate: 0.45,
  },
  focused: {
    name: 'Focused',
    glowColor: new THREE.Color('#39ffd0'),
    pulseRate: 0.75,
  },
  alert: {
    name: 'Alert',
    glowColor: new THREE.Color('#a6ff00'),
    pulseRate: 1.0,
  },
  energized: {
    name: 'Energized',
    glowColor: new THREE.Color('#ffe600'),
    pulseRate: 1.2,
  },
  overclocked: {
    name: 'Overclocked',
    glowColor: new THREE.Color('#ff007a'),
    pulseRate: 1.5,
  },
  transcendence: {
    name: 'Transcendence',
    glowColor: new THREE.Color('#b000ff'),
    pulseRate: 1.3,
  },
};

let currentEmotion = 'calm';
let lastChange = Date.now();

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

// ✅ Fully reactive hook: updates emotionColor + pulse live
export function useEmotion() {
  const [emotion, setEmotionState] = useState({
    emotionColor: emotionStates[currentEmotion].glowColor,
    pulseRate: emotionStates[currentEmotion].pulseRate,
    emotionName: emotionStates[currentEmotion].name,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEmotionState({
        emotionColor: emotionStates[currentEmotion].glowColor,
        pulseRate: emotionStates[currentEmotion].pulseRate,
        emotionName: emotionStates[currentEmotion].name,
      });
    }, 100); // 🔄 Check every 100ms for live update

    return () => clearInterval(interval);
  }, []);

  return emotion;
}
