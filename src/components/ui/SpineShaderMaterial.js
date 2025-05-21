// SpineShaderMaterial.js
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import glsl from "babel-plugin-glsl/macro";

// ShaderMaterial definition for Tex's spine
const SpineShaderMaterial = shaderMaterial(
  {
    time: 0,
    intensity: 0.5,
    color: new THREE.Color("#00ff66"),
  },
  // Vertex Shader
  glsl`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // Fragment Shader
  glsl`
    uniform float time;
    uniform float intensity;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float wave = sin(vUv.y * 25.0 + time * 5.0) * 0.5 + 0.5;
      float centerFade = smoothstep(0.4, 0.6, abs(vUv.x - 0.5));
      float glow = wave * (1.0 - centerFade);
      vec3 glowColor = color * glow * intensity * 2.0;
      gl_FragColor = vec4(glowColor, 1.0);
    }
  `
);

export default SpineShaderMaterial;
