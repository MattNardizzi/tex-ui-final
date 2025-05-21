'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import BeamRenderer from '../BeamRenderer.jsx';
import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import MutationOverlay from '../MutationOverlay';
import FinanceTicker from './FinanceTicker';

export default function StrategyCoreShell() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <BeamRenderer />
      </Canvas>

      <TypingPanel />
      <InstitutionalOverlay />
      <MutationOverlay />
      <div className="pointer-events-none absolute top-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
