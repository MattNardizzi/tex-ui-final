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
    const mat = createSpineShaderMaterial(getCurrentGlowColor());
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
    u.uColor.value.lerp(getCurrentGlowColor(), 0.1);
    u.uGain.value = gain;
  });

  return (
    <mesh ref={beamRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.012, 0.012, 3.4, 64, 1, true]} />
    </mesh>
  );
}
