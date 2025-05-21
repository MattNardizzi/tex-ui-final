import * as THREE from 'three';

export function createCoreRingShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float dist = length(vUv - vec2(0.5));

        // 🌌 Glowing edge blend
        float ring = smoothstep(0.25, 0.18, dist) * (1.0 - smoothstep(0.18, 0.1, dist));

        // 🔄 Animated pulse aura
        float pulse = 0.75 + 0.25 * sin(uTime * 4.0);
        float glow = ring * pulse;

        vec3 color = uColor * glow;
        gl_FragColor = vec4(color, glow * 0.85); // soft alpha
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
