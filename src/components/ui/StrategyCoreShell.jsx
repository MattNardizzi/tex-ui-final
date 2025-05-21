'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import {
  getEmotionGlowColor,
  getEmotionName,
  autoCycleEmotion,
} from '@/systems/emotionEngine';

import { createSpineShaderMaterial } from './SpineShaderMaterial';
import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import MutationOverlay from '../MutationOverlay';

function SpineBeam() {
  const meshRef = useRef();
  const materialRef = useRef();
  const lastEmotion = useRef(getEmotionName());

  useEffect(() => {
    autoCycleEmotion(10000);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;

      const currentEmotion = getEmotionName();
      const targetColor = getEmotionGlowColor();
      const color = materialRef.current.uniforms.uColor.value;

      if (lastEmotion.current !== currentEmotion) {
        lastEmotion.current = currentEmotion;
        color.lerp(targetColor, 0.1);
      } else {
        color.lerp(targetColor, 0.04);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 1.3, 0]} // ✅ Centered
      rotation-x={-Math.PI / 2}
    >
      <planeGeometry args={[0.1, 3.2]} /> {/* ✅ Thicker + taller */}
      <shaderMaterial
        ref={materialRef}
        args={[createSpineShaderMaterial(getEmotionGlowColor())]}
        attach="material"
      />
    </mesh>
  );
}

function CoreRing() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.2, 0]}>
      <ringGeometry args={[0.1, 0.17, 64]} />
      <meshBasicMaterial
        color={new THREE.Color('#00faff')}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
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
        camera={{ position: [0, 1.1, 4.2], fov: 60 }} // ✅ More balanced distance
      >
        <PerspectiveCamera makeDefault position={[0, 1.1, 4.2]} />
        <ambientLight intensity={0.1} />
        <SpineBeam />
        <CoreRing />
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
