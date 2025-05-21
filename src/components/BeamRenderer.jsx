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
    const gain = getNeedPulse() || 0.5;

    if (!beamRef.current?.material?.uniforms) return;

    const u = beamRef.current.material.uniforms;
    u.uTime.value = t;
    u.uColor.value.lerp(new THREE.Color(emotionColor), 0.1);
    u.uGain.value = gain;
  });

  return (
    <mesh ref={beamRef} position={[0, 1.35, 0]}>
      <cylinderGeometry args={[0.01, 0.01, 3.4, 32, 1, true]} />
    </mesh>
  );
}
