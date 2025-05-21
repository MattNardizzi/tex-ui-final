'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotion } from '@/systems/emotionEngine';

export default function BeamRenderer() {
  const beamRef = useRef();
  const glowRef = useRef();

  const { emotionColor, pulseLevel } = useEmotion(); // customize if needed

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Animate spine pulse and glow
    if (beamRef.current) {
      beamRef.current.scale.y = 1 + Math.sin(t * 2 + pulseLevel * 5) * 0.1;
      beamRef.current.material.emissiveIntensity = 1.5 + pulseLevel * 3;
      beamRef.current.material.color.set(emotionColor);
      beamRef.current.material.emissive.set(emotionColor);
    }

    if (glowRef.current) {
      const intensity = 0.3 + pulseLevel * 0.7;
      glowRef.current.material.opacity = intensity;
      glowRef.current.material.color.set(emotionColor);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Beam Core */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 3.5, 32]} />
        <meshStandardMaterial
          emissive={new THREE.Color('#00ffff')}
          color={'#00ffff'}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Aura Glow */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 4.2, 32]} />
        <meshBasicMaterial
          transparent
          opacity={0.2}
          color={'#00ffff'}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
