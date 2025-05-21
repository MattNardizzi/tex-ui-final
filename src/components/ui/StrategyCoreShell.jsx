'use client';

import React, { useEffect, useRef } from "react";
import GazeEyes from "./GazeEyes";
import TypingPanel from "./TypingPanel";
import InstitutionalOverlay from "./InstitutionalOverlay";
import FinanceTicker from "./FinanceTicker";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // ✅ Your Three.js + Tone.js scene setup should already be here
    // Example: initScene(mount.current);
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Top center gaze component */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      {/* Typing input panel */}
      <TypingPanel />

      {/* Center info overlay */}
      <InstitutionalOverlay />

      {/* Bottom ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>
    </div>
  );
}
