import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float glow = 1.0 - abs(vUv.x - 0.5) * 2.0;
        float breath = 0.6 + 0.4 * sin(uTime * 1.3);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 6.5);
        float pulse = glow * breath * heartbeat;

        float intensity = max(pulse, 0.25); // Never disappears

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, intensity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
