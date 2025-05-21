'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import { createCoreRingShaderMaterial } from './CoreRingShaderMaterial';

import BeamRenderer from '../BeamRenderer.jsx';
import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import MutationOverlay from '../MutationOverlay';

function CoreRing() {
  const materialRef = useRef();
  const { emotionColor } = useEmotion();

  useFrame(({ clock }) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uColor.value.lerp(
        new THREE.Color(emotionColor),
        0.05
      );
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.3, 0]}>
      <ringGeometry args={[0.15, 0.28, 128]} />
      <shaderMaterial
        ref={materialRef}
        args={[createCoreRingShaderMaterial(emotionColor)]}
        attach="material"
      />
    </mesh>
  );
}

export default function StrategyCoreShell() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.1, 4.2], fov: 60 }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.1, 4.2]} />
        <ambientLight intensity={0.1} />

        {/* Order matters: render ring first, then beam above it */}
        <CoreRing />
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
