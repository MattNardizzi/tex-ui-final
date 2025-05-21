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
    const mat = createSpineShaderMaterial('#00ffaa');
    if (beamRef.current) {
      beamRef.current.material = mat;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!beamRef.current?.material?.uniforms) return;

    const time = clock.getElapsedTime();
    const gain = Math.max(0.6, getNeedPulse());

    let colorValue = getCurrentGlowColor();
    const color = typeof colorValue === 'string'
      ? new THREE.Color(colorValue)
      : colorValue?.isColor
        ? colorValue
        : new THREE.Color('#00ffaa');

    const uniforms = beamRef.current.material.uniforms;
    uniforms.uTime.value = time;
    uniforms.uGain.value = gain;
    uniforms.uColor.value.lerp(color, 0.1);
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 0, 5]} intensity={3} color="#00ffaa" />

      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 20, 64, 1, true]} />
      </mesh>
    </>
  );
}
