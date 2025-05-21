'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import BeamRenderer from '../BeamRenderer.jsx';

export default function StrategyCoreShell() {
  const cameraRef = useRef();
  const { emotionColor } = useEmotion();

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.35, 4.5], fov: 50 }}
      >
        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          position={[0, 1.35, 4.5]}
          fov={50}
        />
        <ambientLight intensity={0.25} color={emotionColor} />
        <BeamRenderer />
      </Canvas>
    </div>
  );
}
