'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './SpineShaderMaterial';

export default function BeamRenderer() {
  const beamRef = useRef();
  const { emotionColor } = useEmotion();

  useEffect(() => {
    if (beamRef.current) {
      beamRef.current.material = createSpineShaderMaterial(emotionColor);
    }
  }, [emotionColor]);

  useFrame(({ clock }) => {
    if (!beamRef.current?.material) return;

    const t = clock.getElapsedTime();
    beamRef.current.material.uniforms.uTime.value = t;
    beamRef.current.material.uniforms.uColor.value.lerp(
      new THREE.Color(emotionColor),
      0.04
    );
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.3, 0]}               // Horizontal bar at center
      rotation-x={-Math.PI / 2}           // ✅ Flat and facing camera
    >
      <planeGeometry args={[1.4, 0.02]} /> {/* ✅ Wide and thin */}
    </mesh>
  );
}
