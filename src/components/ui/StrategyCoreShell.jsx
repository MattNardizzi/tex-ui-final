'use client';

import React, { useRef, useEffect } from "react";
import { Canvas } from '@react-three/fiber';

// ✅ UI Components
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx";
import BeamRenderer from "../BeamRenderer.jsx";

// ✅ Systems
import { getNeedPulse } from "../../systems/getNeedPulse.js";
import { getCurrentGlowColor, getCurrentEmotionIntensity } from "../../systems/emotionEngine.js";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // Reserved for future shader mounts or cleanup
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">

      {/* 🌐 Spine Render (3D beam) */}
      <Canvas className="absolute inset-0 z-10 pointer-events-none">
        <BeamRenderer />
      </Canvas>

      {/* 💬 User input typing */}
      <TypingPanel />

      {/* 🧠 System state overlay */}
      <InstitutionalOverlay />

      {/* 📊 Real-time financial ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
