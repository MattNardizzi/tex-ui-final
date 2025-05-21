'use client';

import React, { useEffect, useRef } from "react";

// ✅ UI components
import GazeEyes from "./GazeEyes.jsx";
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx"; // ← Corrected path (TypingPanel is in parent folder)

// ✅ System logic
import { getNeedPulse } from "../../systems/getNeedPulse.js";
import { getCurrentGlowColor, getCurrentEmotionIntensity } from "../../systems/emotionEngine.js";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // ✅ Placeholder for your Three.js / Tone.js scene
    // You can mount your shader beam, pulsing spine, and ambient fog here using mount.current
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      
      {/* 👁️ Gaze awareness */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      {/* 💬 Typing input */}
      <TypingPanel />

      {/* 🧠 Institutional overlay panel */}
      <InstitutionalOverlay />

      {/* 📈 Finance ticker bar */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>

    </div>
  );
}
