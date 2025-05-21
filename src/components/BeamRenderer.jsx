'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { getNeedPulse } from '@/systems/needPulse';
import { getCurrentGlowColor } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();

  // Initialize spine shader material once
  useEffect(() => {
    const initialColor = getCurrentGlowColor();
    const mat = createSpineShaderMaterial(initialColor);

    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  // Animate pulse + glow over time
  useFrame(({ clock }) => {
    if (!beamRef.current || !beamRef.current.material) return;

    const time = clock.getElapsedTime();
    const gain = getNeedPulse();
    const glowColor = getCurrentGlowColor();

    const uniforms = beamRef.current.material.uniforms;
    if (!uniforms) return;

    uniforms.uTime.value = time;
    uniforms.uGain.value = gain;

    // Smooth color transition (no flicker)
    uniforms.uColor.value.lerp(glowColor, 0.05);
  });

  return (
    <mesh ref={beamRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.012, 0.012, 3.4, 64, 1, true]} />
    </mesh>
  );
}
