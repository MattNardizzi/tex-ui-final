'use client';

import React, { useEffect, useRef } from "react";

// ✅ UI Components
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx";

export default function StrategyCoreShell() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Reserved for future hooks
  }, []);

  return (
    <div ref={mountRef} className="relative w-screen h-screen bg-black overflow-hidden font-mono">

      {/* ✅ Glowing Vertical CSS Spine */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 z-10">
        <div className="w-full h-full bg-gradient-to-b from-green-400 via-green-300 to-transparent animate-pulse-spine opacity-80" />
      </div>

      {/* 🟡 Top-left: Computation Log */}
      <div className="absolute top-6 left-6 z-20">
        <button className="border border-yellow-400 text-yellow-300 bg-black/70 px-4 py-1 rounded-md font-mono hover:bg-yellow-500/10 transition">
          Computation Log
        </button>
      </div>

      {/* 🔵 Top-right: AGI Status */}
      <InstitutionalOverlay />

      {/* 💬 Typing Panel */}
      <TypingPanel />

      {/* 📊 Bottom Financial Ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
