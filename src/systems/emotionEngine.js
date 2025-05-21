// emotionEngine.js

const emotionStates = [
  { name: "Focused", color: "#00ff66" },
  { name: "Curious", color: "#00ccff" },
  { name: "Aggressive", color: "#ff0055" },
  { name: "Serene", color: "#9900ff" },
  { name: "Alert", color: "#ffff00" },
];

let t = 0;
let currentIndex = 0;

export default function emotionEngine() {
  t += 0.015;

  // Change emotion every ~10 seconds
  if (t > 10) {
    t = 0;
    currentIndex = (currentIndex + 1) % emotionStates.length;
  }

  // Return only the color (used by BeamRenderer / StatusHUD)
  return emotionStates[currentIndex].color;
}

// Optional helper to also expose the emotion label:
export function getEmotionLabel() {
  return emotionStates[currentIndex].name;
}
