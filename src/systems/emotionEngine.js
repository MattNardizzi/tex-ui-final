import * as THREE from 'three';

const emotionStates = {
  calm: {
    name: 'Calm',
    glowColor: new THREE.Color('#00c2ff'), // soft electric cyan
    pulseRate: 0.5,
  },
  focused: {
    name: 'Focused',
    glowColor: new THREE.Color('#4de2ff'), // icy blue
    pulseRate: 0.75,
  },
  alert: {
    name: 'Alert',
    glowColor: new THREE.Color('#ffdf40'), // warm golden amber
    pulseRate: 1.0,
  },
  tense: {
    name: 'Tense',
    glowColor: new THREE.Color('#ff6b3b'), // reddish-orange ember
    pulseRate: 1.25,
  },
  overclocked: {
    name: 'Overclocked',
    glowColor: new THREE.Color('#ff0059'), // deep pulse magenta
    pulseRate: 1.6,
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
