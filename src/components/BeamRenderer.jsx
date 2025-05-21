'use client';

import React from 'react';

export default function BeamRenderer() {
  return (
    <>
      <ambientLight intensity={1.0} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#00ffaa" />

      {/* ✅ No shader, no uniforms — just raw visible spine */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 10, 64]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2.5} />
      </mesh>
    </>
  );
}
