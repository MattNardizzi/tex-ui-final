'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { getNeedPulse } from '@/systems/needPulse';
import { getCurrentGlowColor } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();

  // Initialize shader material
  useEffect(() => {
    const initialColor = getCurrentGlowColor();
    const mat = createSpineShaderMaterial(initialColor);
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  // Animate spine pulse and color
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pulseGain = getNeedPulse();
    const targetColor = getCurrentGlowColor();

    if (!beamRef.current?.material?.uniforms) return;

    const u = beamRef.current.material.uniforms;
    u.uTime.value = time;
    u.uGain.value = pulseGain;
    u.uColor.value.lerp(targetColor, 0.05);
  });

  return (
    <>
      {/* Lighting for atmospheric glow */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 2]} intensity={3} color="#00ffaa" />

      {/* Glowing vertical beam */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 10, 64, 1, true]} />
      </mesh>
    </>
  );
}
