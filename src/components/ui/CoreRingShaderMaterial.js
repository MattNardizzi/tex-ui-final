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

        // Sharpened band edge
        float outer = smoothstep(0.3, 0.285, dist);
        float inner = smoothstep(0.22, 0.205, dist);
        float ring = outer * (1.0 - inner);

        // Pulse the glow
        float pulse = 0.85 + 0.15 * sin(uTime * 2.5);
        float intensity = ring * pulse;

        vec3 color = uColor * intensity;

        // Amplified alpha so it's always visible
        float alpha = clamp(intensity * 1.8, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
