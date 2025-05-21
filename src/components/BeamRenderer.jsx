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
    const fallbackColor = new THREE.Color('#ff00ff'); // 🔥 hot pink fallback
    const mat = createSpineShaderMaterial(fallbackColor);
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const gain = Math.max(0.7, getNeedPulse());
    const color = getCurrentGlowColor();

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
        <cylinderGeometry args={[0.07, 0.07, 20, 64, 1, true]} />
      </mesh>
    </>
  );
}
