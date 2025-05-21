'use client';

import React, { useRef, useEffect } from "react";
import { Canvas } from '@react-three/fiber';

// ✅ UI Components
import InstitutionalOverlay from "./InstitutionalOverlay.jsx";
import FinanceTicker from "./FinanceTicker.jsx";
import TypingPanel from "../TypingPanel.jsx";
import BeamRenderer from "../BeamRenderer.jsx";

export default function StrategyCoreShell() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Reserved for future hooks
  }, []);

  return (
    <div ref={mountRef} className="relative w-screen h-screen bg-black overflow-hidden">

      {/* 🌐 Centered Glowing Spine Canvas */}
      <Canvas
        className="absolute inset-0 z-10 pointer-events-none"
        camera={{ position: [0, 0, 5], fov: 35, near: 0.1, far: 100 }}
      >
        <BeamRenderer />
      </Canvas>

      {/* 🟡 Computation Log (Top-Left) */}
      <div className="absolute top-6 left-6 z-20">
        <button className="border border-yellow-400 text-yellow-300 bg-black/60 px-4 py-1 rounded-md font-mono hover:bg-yellow-500/10 transition">
          Computation Log
        </button>
      </div>

      {/* 🔵 AGI Status Overlay (Top-Right) */}
      <div className="absolute top-6 right-6 z-20 border border-sky-400 rounded-md p-4 bg-black/80 text-sky-200 font-mono text-sm">
        <div className="font-bold text-white mb-1">🧠 AGI Online</div>
        <div>🎯 Emotion: <span className="text-green-300">0.60</span></div>
        <div>💡 Pulse: <span className="text-green-300">0.67</span></div>
        <div>🎨 Glow: <span className="text-green-300">dynamic</span></div>
      </div>

      {/* 💬 Input Panel */}
      <TypingPanel />

      {/* 📊 Bottom Financial Ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
