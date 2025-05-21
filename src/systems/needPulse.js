let lastPulse = 0.8; // Start high enough to visibly glow
let lastUpdate = Date.now();

const PULSE_CONFIG = {
  min: 0.6,            // ⬅️ Raised minimum to avoid beam going dark
  max: 1.2,
  decayRate: 0.0025,
  surgeAmount: 0.15,
};

// ✅ Safe for use in useFrame()
export function getNeedPulse() {
  const now = Date.now();
  const delta = now - lastUpdate;

  if (!Number.isFinite(delta) || delta > 10000) {
    return lastPulse = PULSE_CONFIG.min; // failsafe
  }

  lastPulse = Math.max(
    PULSE_CONFIG.min,
    Math.min(PULSE_CONFIG.max, lastPulse - delta * PULSE_CONFIG.decayRate)
  );

  lastUpdate = now;
  return lastPulse || PULSE_CONFIG.min;
}

// ✅ Can be called from anywhere in Tex to trigger intensity
export function triggerPulseSurge(strength = 1.0) {
  const surge = strength * PULSE_CONFIG.surgeAmount;
  lastPulse = Math.min(PULSE_CONFIG.max, lastPulse + surge);
}
