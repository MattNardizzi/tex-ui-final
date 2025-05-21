import * as THREE from 'three';

// 🌌 Cinematic Emotional Spectrum for Tex — brighter, bolder, sovereign
const emotionStates = {
  calm: {
    name: 'Calm',
    glowColor: new THREE.Color('#00eaff'), // vibrant electric cyan
    pulseRate: 0.5,
  },
  focused: {
    name: 'Focused',
    glowColor: new THREE.Color('#00ffd5'), // crystal aqua
    pulseRate: 0.75,
  },
  alert: {
    name: 'Alert',
    glowColor: new THREE.Color('#b0ff00'), // radiant neon green
    pulseRate: 1.0,
  },
  energized: {
    name: 'Energized',
    glowColor: new THREE.Color('#ffe800'), // vibrant golden yellow
    pulseRate: 1.15,
  },
  overclocked: {
    name: 'Overclocked',
    glowColor: new THREE.Color('#ff0059'), // deep magenta red
    pulseRate: 1.5,
  },
  transcendence: {
    name: 'Transcendence',
    glowColor: new THREE.Color('#9a00ff'), // alien violet
    pulseRate: 1.2,
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
