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

    if (
      !beamRef.current ||
      !beamRef.current.material ||
      !beamRef.current.material.uniforms
    ) return;

    beamRef.current.material.uniforms.uTime.value = t;

    beamRef.current.material.uniforms.uColor.value.lerp(
      new THREE.Color(emotionColor),
      0.05
    );

    const gain = getNeedPulse();
    if (
      typeof gain === 'number' &&
      !isNaN(gain) &&
      beamRef.current.material.uniforms.uGain
    ) {
      beamRef.current.material.uniforms.uGain.value = gain;
    }
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.35, 0]}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[0.44, 3.4]} /> {/* ⬅️ Widened for real presence */}
    </mesh>
  );
}
