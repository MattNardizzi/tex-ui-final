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

        // Ring band with crisp inner + outer boundaries
        float outer = smoothstep(0.3, 0.28, dist);
        float inner = smoothstep(0.22, 0.2, dist);
        float ring = outer * (1.0 - inner);

        // Add pulsation to intensity
        float pulse = 0.85 + 0.15 * sin(uTime * 2.5);
        float intensity = ring * pulse;

        vec3 color = uColor * intensity;

        // Force alpha visibility, no ghost fade
        float alpha = clamp(intensity + 0.35, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
