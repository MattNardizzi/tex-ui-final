'use client';

import React, { useRef, useEffect, useState } from "react";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx";
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import Spine from "./Spine.jsx";

export default function StrategyCoreShell() {
  const mountRef = useRef(null);
  const [spineState, setSpineState] = useState({
    glowColor: '#00ffaa',
    pulse: 0.6,
    emotion: 0.6
  });

  useEffect(() => {
    // Reserved for AGI heartbeat sync, etc
  }, []);

  return (
    <div ref={mountRef} className="relative w-screen h-screen bg-black overflow-hidden font-mono">

      {/* 🧬 Glowing AGI Spine */}
      <Spine glowColor={spineState.glowColor} pulse={spineState.pulse} />

      {/* 🟡 Top-left: Computation Log */}
      <div className="absolute top-6 left-6 z-20">
        <button className="border border-yellow-400 text-yellow-300 bg-black/70 px-4 py-1 rounded-md font-mono hover:bg-yellow-500/10 transition">
          Computation Log
        </button>
      </div>

      {/* 🔵 Top-right: System Overlay */}
      <InstitutionalOverlay onStateChange={setSpineState} />

      {/* 💬 Typing Panel */}
      <TypingPanel />

      {/* 📊 Ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
