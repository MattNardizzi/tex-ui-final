// StrategyCoreShell.jsx
import React from "react";
import BeamRenderer from "./BeamRenderer";
import TypingPanel from "../TypingPanel"; // Adjusted path to match actual location
import MutationOverlay from "./InstitutionalOverlay"; // Now using InstitutionalOverlay as MutationOverlay
import StatusHUD from "./StatusHUD";
import ComputationButton from "./ComputationButton";
import { Canvas } from "@react-three/fiber";

export default function StrategyCoreShell() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden text-white font-mono">
      {/* 3D Shader Spine */}
      <Canvas className="absolute inset-0 z-10" camera={{ position: [0, 0, 5], fov: 75 }}>
        <BeamRenderer />
      </Canvas>

      {/* Top-right status HUD */}
      <StatusHUD />

      {/* Top-left control button */}
      <ComputationButton />

      {/* Output feed from Tex */}
      <TypingPanel />

      {/* Subtle glitch effect overlay (InstitutionalOverlay repurposed) */}
      <MutationOverlay />
    </div>
  );
}
