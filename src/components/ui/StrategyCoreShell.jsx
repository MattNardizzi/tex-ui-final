import React, { useEffect, useRef } from "react";
import GazeEyes from "./GazeEyes";
import TypingPanel from "./TypingPanel";
import InstitutionalOverlay from "./InstitutionalOverlay";
import FinanceTicker from "./FinanceTicker";

export default function StrategyCoreShell() {
  const mount = useRef(null); // ✅ This is required for the spine rendering

  useEffect(() => {
    // your full Three.js + Tone.js setup should already be here
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
