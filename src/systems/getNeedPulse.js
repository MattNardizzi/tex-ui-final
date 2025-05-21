// getNeedPulse.js

let t = 0;

export default function getNeedPulse() {
  // Advance time
  t += 0.035;

  // Simulated fluctuating pulse — between 0.15 and 0.95
  const pulse =
    0.15 + 0.4 * Math.abs(Math.sin(t * 1.5)) + 0.2 * Math.random() * Math.sin(t);

  return Math.min(1, Math.max(0.1, pulse));
}
