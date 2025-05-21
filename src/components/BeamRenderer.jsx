'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();
  const { emotionColor } = useEmotion();

  useEffect(() => {
    if (beamRef.current) {
      beamRef.current.material = createSpineShaderMaterial(emotionColor);
    }
  }, [emotionColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = getNeedPulse() || 0.5;

    if (!beamRef.current?.material?.uniforms) return;

    const { uniforms } = beamRef.current.material;
    uniforms.uTime.value = t;

    // Smoothly animate toward current emotion color
    uniforms.uColor.value.lerp(new THREE.Color(emotionColor), 0.1);
    uniforms.uGain.value = gain;
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.35, 0]} // Adjust if needed to center vertically
      rotation={[0, 0, 0]}
    >
      {/* Cylinder shape for curvature and life */}
      <cylinderGeometry args={[0.012, 0.012, 3.4, 32, 1, true]} />
    </mesh>
  );
}
