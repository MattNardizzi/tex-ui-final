'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial'; // ✅ Fixed path

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
    if (!beamRef.current?.material) return;

    beamRef.current.material.uniforms.uTime.value = t;
    beamRef.current.material.uniforms.uColor.value.lerp(
      new THREE.Color(emotionColor),
      0.04
    );
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.3, 0]}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[0.12, 3.2]} />
    </mesh>
  );
}
