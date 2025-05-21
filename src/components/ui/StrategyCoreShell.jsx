'use client';

import React, { useEffect, useRef } from "react";

import GazeEyes from "./GazeEyes";
import TypingPanel from "./TypingPanel";
import InstitutionalOverlay from "./InstitutionalOverlay";
import FinanceTicker from "./FinanceTicker";

import { getNeedPulse } from "../../systems/getNeedPulse";
import { getCurrentGlowColor, getCurrentEmotionIntensity } from "../../systems/emotionEngine";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // 🔧 Your Three.js, shader, or Tone.js logic should go here.
    // This is where your render loop would mount to `mount.current`.
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Gaze indicator */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      {/* Input typing panel */}
      <TypingPanel />

      {/* Central information display */}
      <InstitutionalOverlay />

      {/* Bottom financial ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>
    </div>
  );
}
