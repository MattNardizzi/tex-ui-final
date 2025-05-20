// ⚡ High-intensity emotion states with vibrant glow + pulse
const emotionStates = {
  calm: {
    name: 'Calm',
    glowColor: '#00faff',    // electric cyan
    pulseRate: 0.65,
  },
  alert: {
    name: 'Alert',
    glowColor: '#39ff14',    // neon green
    pulseRate: 1.0,
  },
  agitated: {
    name: 'Agitated',
    glowColor: '#ffae00',    // vivid orange
    pulseRate: 1.35,
  },
  flow: {
    name: 'Flow',
    glowColor: '#be00ff',    // bright violet
    pulseRate: 1.2,
  },
  overdrive: {
    name: 'Overdrive',
    glowColor: '#ff0055',    // blazing pink-red
    pulseRate: 1.65,
  },
};

let currentEmotion = 'calm';
let lastChange = Date.now();

// 🌈 Get glow color for AGI beam
export function getEmotionGlowColor() {
  return emotionStates[currentEmotion].glowColor;
}

// 🫀 Get current pulse rate
export function getEmotionPulseRate() {
  return emotionStates[currentEmotion].pulseRate;
}

// 🧠 Get current emotion name
export function getEmotionName() {
  return emotionStates[currentEmotion].name;
}

// 🧬 Manually set emotion (call from cognition module)
export function setEmotion(state) {
  if (emotionStates[state]) {
    currentEmotion = state;
    lastChange = Date.now();
  } else {
    console.warn(`Unknown emotion state: ${state}`);
  }
}

// 🔁 Developer tool: auto-cycle emotions
export function autoCycleEmotion(interval = 8000) {
  const keys = Object.keys(emotionStates);
  let index = 0;
  setInterval(() => {
    index = (index + 1) % keys.length;
    setEmotion(keys[index]);
    console.log('🧠 Tex emotion →', emotionStates[keys[index]].name);
  }, interval);
}
