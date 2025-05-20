let memoryScore = 0.5;
let lastUpdate = Date.now();

const CONFIG = {
  min: 0.1,
  max: 1.0,
  learnRate: 0.01,
  decayRate: 0.001,
};

export function getMemoryScore() {
  const now = Date.now();
  const delta = now - lastUpdate;

  // decay over time
  memoryScore -= delta * CONFIG.decayRate;
  memoryScore = Math.max(CONFIG.min, Math.min(CONFIG.max, memoryScore));

  lastUpdate = now;
  return memoryScore;
}

export function reinforceMemory(amount = 0.1) {
  memoryScore += amount * CONFIG.learnRate;
  memoryScore = Math.min(CONFIG.max, memoryScore);
}
