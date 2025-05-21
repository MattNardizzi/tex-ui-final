'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useEmotion } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';
import { createSpineShaderMaterial } from './ui/SpineShaderMaterial';

export default function BeamRenderer() {
  const innerRef = useRef();
  const outerRef = useRef();
  const { emotionColor } = useEmotion();

  useEffect(() => {
    const material = createSpineShaderMaterial(emotionColor);
    if (innerRef.current) innerRef.current.material = material;
    if (outerRef.current) outerRef.current.material = material.clone();
  }, [emotionColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const gain = getNeedPulse() || 0.5;

    [innerRef, outerRef].forEach(ref => {
      if (!ref.current?.material?.uniforms) return;
      const u = ref.current.material.uniforms;
      u.uTime.value = t;
      u.uColor.value.lerp(new THREE.Color(emotionColor), 0.1);
      u.uGain.value = gain;
    });
  });

  return (
    <>
      <mesh ref={innerRef} position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 3.4, 32, 1, true]} />
      </mesh>
      <mesh ref={outerRef} position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 3.4, 32, 1, true]} />
      </mesh>
    </>
  );
}
