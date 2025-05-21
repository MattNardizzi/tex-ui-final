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
    const mat = createSpineShaderMaterial(new THREE.Color('#00ff88')); // bright teal fallback
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = Math.max(0.6, getNeedPulse()); // force strong visibility
    const color = getCurrentGlowColor();

    if (!beamRef.current?.material?.uniforms) return;

    const u = beamRef.current.material.uniforms;
    u.uTime.value = t;
    u.uGain.value = gain;
    u.uColor.value.lerp(color, 0.1);
  });

  return (
    <>
      <ambientLight intensity={1.0} />
      <pointLight position={[0, 0, 5]} intensity={4} color="#00ffaa" />

      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 12, 64, 1, true]} />
      </mesh>
    </>
  );
}
