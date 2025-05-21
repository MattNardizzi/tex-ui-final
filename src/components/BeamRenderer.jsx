"use client";

// BeamRenderer.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import getNeedPulse from "../../systems/getNeedPulse";
import emotionEngine from "../../systems/emotionEngine";
import SpineShaderMaterial from "../../systems/SpineShaderMaterial";

export default function BeamRenderer() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = getNeedPulse(); // returns float (e.g. 0.2 to 1.0)
    const color = new THREE.Color(emotionEngine()); // returns a hex string

    if (materialRef.current) {
      materialRef.current.time = t;
      materialRef.current.intensity = pulse;
      materialRef.current.color = color;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[0.02, 2.5, 1, 32]} />
      <SpineShaderMaterial ref={materialRef} />
    </mesh>
  );
}
