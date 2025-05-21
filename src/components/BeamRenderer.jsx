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
    const mat = createSpineShaderMaterial(new THREE.Color("#00ff88")); // TEMP color
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = getNeedPulse();

    if (!beamRef.current?.material?.uniforms) return;

    const u = beamRef.current.material.uniforms;
    u.uTime.value = t;
    u.uGain.value = gain;
    u.uColor.value.lerp(new THREE.Color("#00ff88"), 0.1); // TEMP fixed glow
  });

  return (
    <>
      {/* 🔆 TEMP debug light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#00ffaa" />

      {/* 🧬 Spine Beam */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 32, 1, true]} />
      </mesh>
    </>
  );
}
