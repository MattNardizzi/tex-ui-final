'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BeamRenderer() {
  const beamRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beamRef.current) {
      beamRef.current.material.color.setHSL((t * 0.1) % 1, 1.0, 0.5);
    }
  });

  return (
    <mesh
      ref={beamRef}
      position={[0, 1.3, 0]}
      rotation={[0, 0, 0]} // upright
    >
      <planeGeometry args={[0.12, 3.2]} />
      <meshBasicMaterial color="cyan" />
    </mesh>
  );
}
