'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();
  const { emotionColor } = useEmotion();

  // Set material on mount and update on emotion change
  useEffect(() => {
    if (beamRef.current) {
      beamRef.current.material = createSpineShaderMaterial(emotionColor);
    }
  }, [emotionColor]);

  // Animate beam pulse and color shift
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (
      !beamRef.current ||
      !beamRef.current.material ||
      !beamRef.current.material.uniforms
    ) return;

    beamRef.current.material.uniforms.uTime.value = t;

    // Smooth color blend
    beamRef.current.material.uniforms.uColor.value.lerp(
      new THREE.Color(emotionColor),
      0.05
    );
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.2, 0]} // ↕️ Height above ring
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[0.28, 3.2]} />
    </mesh>
  );
}
