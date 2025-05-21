// BeamRenderer.jsx
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import getNeedPulse from "../../systems/getNeedPulse";
import emotionEngine from "../../systems/emotionEngine";
import glsl from "babel-plugin-glsl/macro";

// Custom Shader
const SpineMaterial = shaderMaterial(
  {
    time: 0,
    intensity: 0.2,
    color: new THREE.Color("#00ff66"),
  },
  // Vertex Shader
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  glsl`
    uniform float time;
    uniform float intensity;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float glow = sin(vUv.y * 20.0 + time * 4.0) * 0.5 + 0.5;
      glow *= smoothstep(0.4, 0.6, vUv.x);
      vec3 outputColor = color * glow * intensity * 2.0;
      gl_FragColor = vec4(outputColor, 1.0);
    }
  `
);

function BeamRenderer() {
  const mesh = useRef();
  const materialRef = useRef();

  // Register custom material to drei
  const Material = useMemo(() => SpineMaterial, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = getNeedPulse();
    const color = new THREE.Color(emotionEngine());

    if (materialRef.current) {
      materialRef.current.time = t;
      materialRef.current.intensity = pulse;
      materialRef.current.color = color;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[0.02, 2.5, 1, 32]} />
      <Material ref={materialRef} />
    </mesh>
  );
}

export default BeamRenderer;
