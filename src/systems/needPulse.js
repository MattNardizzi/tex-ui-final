export function getNeedPulse() {
  const t = performance.now() / 1000;
  return 0.8 + 0.2 * Math.sin(t * 2.0 + Math.cos(t * 1.5));
}
