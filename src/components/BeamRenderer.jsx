'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const innerBeamRef = useRef();
  const outerAuraRef = useRef();
  const { emotionColor } = useEmotion();

  useEffect(() => {
    const material = createSpineShaderMaterial(emotionColor);
    if (innerBeamRef.current) innerBeamRef.current.material = material;
    if (outerAuraRef.current) outerAuraRef.current.material = material.clone();
  }, [emotionColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = getNeedPulse() || 0.5;

    [innerBeamRef, outerAuraRef].forEach(ref => {
      if (!ref.current?.material?.uniforms) return;
      const { uniforms } = ref.current.material;
      uniforms.uTime.value = t;
      uniforms.uColor.value.lerp(new THREE.Color(emotionColor), 0.1);
      uniforms.uGain.value = gain;
    });
  });

  return (
    <>
      {/* Inner core beam */}
      <mesh
        ref={innerBeamRef}
        position={[0, 1.35, 0]}
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.008, 0.008, 3.4, 32, 1, true]} />
      </mesh>

      {/* Outer glow beam */}
      <mesh
        ref={outerAuraRef}
        position={[0, 1.35, 0]}
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.018, 0.018, 3.4, 32, 1, true]} />
      </mesh>
    </>
  );
}
