let lastPulse = 0.5;
let lastUpdate = Date.now();

const PULSE_CONFIG = {
  min: 0.2,
  max: 1.2,
  decayRate: 0.0025,
  surgeAmount: 0.15,
};

export function getNeedPulse() {
  const now = Date.now();
  const delta = now - lastUpdate;

  // Update without triggering any React state
  lastPulse = Math.max(
    PULSE_CONFIG.min,
    Math.min(PULSE_CONFIG.max, lastPulse - delta * PULSE_CONFIG.decayRate)
  );

  lastUpdate = now;
  return lastPulse;
}

export function triggerPulseSurge(strength = 1.0) {
  const surge = strength * PULSE_CONFIG.surgeAmount;
  lastPulse = Math.min(PULSE_CONFIG.max, lastPulse + surge);
}
