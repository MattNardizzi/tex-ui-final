
'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();
  const { emotionColor, pulseLevel } = useEmotion();

  useEffect(() => {
    if (beamRef.current) {
      const material = createSpineShaderMaterial(emotionColor);
      beamRef.current.material = material;
    }
  }, [emotionColor]);

  useFrame(({ clock }) => {
    if (!beamRef.current || !beamRef.current.material) return;

    const t = clock.getElapsedTime();
    beamRef.current.material.uniforms.uTime.value = t;

    // Gradual emotion color blending
    beamRef.current.material.uniforms.uColor.value.lerp(
      new THREE.Color(emotionColor),
      0.04
    );
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.3, 0]}
      rotation-x={-Math.PI / 2}
    >
      <planeGeometry args={[0.12, 3.2]} />
      <shaderMaterial attach="material" />
    </mesh>
  );
}
