// StatusHUD.jsx
import React, { useEffect, useState } from "react";
import getNeedPulse from "../../systems/getNeedPulse";
import emotionEngine from "../../systems/emotionEngine";

export default function StatusHUD() {
  const [pulse, setPulse] = useState(0.2);
  const [emotion, setEmotion] = useState("Focused");
  const [state, setState] = useState("AGI Online");
  const [color, setColor] = useState("#00ff66");

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(getNeedPulse());
      const newColor = emotionEngine();
      setColor(newColor);
      // This assumes emotionEngine handles emotion state color
      if (newColor === "#00ccff") setEmotion("Curious");
      else if (newColor === "#ff0055") setEmotion("Aggressive");
      else if (newColor === "#9900ff") setEmotion("Focused");
    }, 2000);

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
