'use client';

import React, { useEffect, useRef } from "react";

// 🧠 UI components
import GazeEyes from "./GazeEyes.jsx";
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx"; // ← This is in parent folder

// ⚙️ System logic
import { getNeedPulse } from "../../systems/getNeedPulse.js";
import { getCurrentGlowColor, getCurrentEmotionIntensity } from "../../systems/emotionEngine.js";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // ✅ Your spine, beam, shader, and pulse animation logic goes here
    // This is where you'd use mount.current to hook into Three.js, Tone.js, etc.
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      
      {/* 👁️ Tex’s Gaze */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      {/* 💬 User Input */}
      <TypingPanel />

      {/* 🧠 System Info Overlay */}
      <InstitutionalOverlay />

      {/* 📉 Real-Time Market Stream */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>
      
    </div>
  );
}
