'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';
import { createCoreRingShaderMaterial } from './CoreRingShaderMaterial';
import { createSpineShaderMaterial } from './SpineShaderMaterial';

import TypingPanel from '../TypingPanel';
import BeamRenderer from '../BeamRenderer.jsx';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import MutationOverlay from '../MutationOverlay';

function CoreRing() {
  const materialRef = useRef();
  const { emotionColor } = useEmotion();

  useFrame(({ clock }) => {
    if (!materialRef.current?.uniforms) return;

    const t = clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = t;
    materialRef.current.uniforms.uColor.value.lerp(new THREE.Color(emotionColor), 0.05);
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

function AliveBeam() {
  const beamRef = useRef();
  const { emotionColor } = useEmotion();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = getNeedPulse();

    if (!beamRef.current?.material?.uniforms) return;

    beamRef.current.material.uniforms.uTime.value = t;
    beamRef.current.material.uniforms.uColor.value.lerp(new THREE.Color(emotionColor), 0.05);
    beamRef.current.material.uniforms.uGain.value = gain;
  });

  return (
    <mesh ref={beamRef} position={[0, 1.35, 0]}>
      <planeGeometry args={[0.44, 3.4]} />
      <shaderMaterial
        args={[createSpineShaderMaterial('#00faff')]}
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
        <CoreRing />
        <AliveBeam />
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
