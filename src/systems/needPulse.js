let lastPulse = 0.5;
let lastUpdate = Date.now();

// Configurable decay and surge values
const PULSE_CONFIG = {
  min: 0.2,
  max: 1.2,
  decayRate: 0.0025,      // how fast pulse fades over time
  surgeAmount: 0.15,      // how much pulse increases during “need” events
};

export function getNeedPulse() {
  const now = Date.now();
  const delta = now - lastUpdate;

  // Passive decay over time
  lastPulse -= delta * PULSE_CONFIG.decayRate;
  lastPulse = Math.max(PULSE_CONFIG.min, Math.min(PULSE_CONFIG.max, lastPulse));

  lastUpdate = now;
  return lastPulse;
}

// Optional: Call this from other systems to simulate a cognitive surge
export function triggerPulseSurge(strength = 1.0) {
  const surge = strength * PULSE_CONFIG.surgeAmount;
  lastPulse = Math.min(PULSE_CONFIG.max, lastPulse + surge);
}
