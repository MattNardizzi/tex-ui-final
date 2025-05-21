'use client';

import React, { useEffect, useRef } from "react";

// ✅ UI Components (inside /ui/)
import GazeEyes from "./GazeEyes.jsx";
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";

// ✅ TypingPanel (located in /components/)
import TypingPanel from "../TypingPanel.jsx";

// ✅ Systems
import { getNeedPulse } from "../../systems/getNeedPulse.js";
import { getCurrentGlowColor, getCurrentEmotionIntensity } from "../../systems/emotionEngine.js";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // 🔧 This is where you’ll mount Three.js, shaders, beam animations
    // Example: initSpineScene(mount.current)
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      
      {/* 👁️ Eye tracker */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      {/* 💬 User input typing */}
      <TypingPanel />

      {/* 🧠 System state overlay */}
      <InstitutionalOverlay />

      {/* 📊 Real-time financial ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>

    </div>
  );
}
