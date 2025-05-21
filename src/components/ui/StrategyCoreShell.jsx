// StrategyCoreShell.jsx
import React from "react";
import BeamRenderer from "./BeamRenderer";
import TypingPanel from "./TypingPanel";
import MutationOverlay from "./MutationOverlay";
import StatusHUD from "./StatusHUD";
import ComputationButton from "./ComputationButton";

export default function StrategyCoreShell() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden text-white font-mono">
      <BeamRenderer />
      <StatusHUD />
      <ComputationButton />
      <TypingPanel />
      <MutationOverlay />
    </div>
  );
}
