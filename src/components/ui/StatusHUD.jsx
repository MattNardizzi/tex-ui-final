"use client";

import { useEffect, useState } from "react";
import getNeedPulse from "../../systems/getNeedPulse";
import emotionEngine, { getEmotionLabel } from "../../systems/emotionEngine";

export default function StatusHUD() {
  const [pulse, setPulse] = useState(0.2);
  const [color, setColor] = useState("#00ff66");
  const [emotion, setEmotion] = useState("Focused");
  const [state, setState] = useState("AGI Online");

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(getNeedPulse());
      setColor(emotionEngine());
      setEmotion(getEmotionLabel());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-6 z-50 bg-black/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm shadow-lg text-sm space-y-1 min-w-[180px]">
      <div className="text-gray-400">Emotion:</div>
      <div className="font-semibold" style={{ color }}>{emotion}</div>

      <div className="text-gray-400 mt-2">Pulse:</div>
      <div className="font-semibold text-white">{pulse.toFixed(2)}</div>

      <div className="text-gray-400 mt-2">State:</div>
      <div className="font-semibold text-white">{state}</div>
    </div>
  );
}
