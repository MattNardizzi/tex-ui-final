'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';
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
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.25, 0]} // Slightly raised to ensure ring visibility
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[0.2, 3.4]} /> {/* Tightened width for sharper beam */}
    </mesh>
  );
}
