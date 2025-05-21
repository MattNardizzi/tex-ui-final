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
        float edgeFade = smoothstep(0.4, 0.25, dist); // outer softness
        float coreRing = smoothstep(0.26, 0.22, dist) * (1.0 - smoothstep(0.22, 0.12, dist));

        float pulse = 0.9 + 0.1 * sin(uTime * 3.0);
        float glow = edgeFade * coreRing * pulse;

        vec3 color = uColor * glow;
        gl_FragColor = vec4(color, glow);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
