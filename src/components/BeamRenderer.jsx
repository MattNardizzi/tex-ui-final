'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { getNeedPulse } from '@/systems/needPulse';
import { getCurrentGlowColor } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();

  useEffect(() => {
    const initialColor = new THREE.Color('#00ff88');
    const mat = createSpineShaderMaterial(initialColor);
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const gain = Math.max(0.6, getNeedPulse());

    // Ensure valid THREE.Color
    const colorValue = getCurrentGlowColor();
    const color = typeof colorValue === 'string'
      ? new THREE.Color(colorValue)
      : colorValue instanceof THREE.Color
        ? colorValue
        : new THREE.Color('#00ffaa');

    if (!beamRef.current?.material?.uniforms) return;

    const u = beamRef.current.material.uniforms;
    u.uTime.value = time;
    u.uGain.value = gain;
    u.uColor.value.lerp(color, 0.05);
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 0, 4]} intensity={4} color="#ffffff" />

      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 20, 64, 1, true]} />
      </mesh>
    </>
  );
}
