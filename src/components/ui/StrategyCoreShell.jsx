'use client';

import React, { useEffect, useRef } from "react";
import GazeEyes from "./ui/GazeEyes";
import TypingPanel from "./ui/TypingPanel";
import InstitutionalOverlay from "./ui/InstitutionalOverlay";
import FinanceTicker from "./ui/FinanceTicker";

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    // Your Three.js + Tone.js scene setup goes here
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <GazeEyes />
      </div>

      <TypingPanel />
      <InstitutionalOverlay />

      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center">
        <FinanceTicker />
      </div>
    </div>
  );
}
