// StrategyCoreShell.jsx
import React from "react";
import BeamRenderer from "./BeamRenderer";
import TypingPanel from "../TypingPanel"; // Adjusted path to match actual location
import MutationOverlay from "./MutationOverlay";
import StatusHUD from "./StatusHUD";
import ComputationButton from "./ComputationButton";

export default function StrategyCoreShell() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden text-white font-mono">
      {/* Living spine */}
      <BeamRenderer />

      {/* Top-right status HUD */}
      <StatusHUD />

      {/* Top-left control button */}
      <ComputationButton />

      {/* Output feed from Tex */}
      <TypingPanel />

      {/* Subtle glitch effect overlay */}
      <MutationOverlay />
    </div>
  );
}
