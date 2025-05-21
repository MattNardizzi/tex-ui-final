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
        
        // Core ring band definition
        float outerEdge = smoothstep(0.3, 0.285, dist);
        float innerEdge = smoothstep(0.22, 0.205, dist);
        float ring = outerEdge * (1.0 - innerEdge);

        // Radial shimmer pulse
        float wave = 0.5 + 0.5 * sin(uTime * 3.0 + dist * 20.0);
        float pulse = 0.9 + 0.1 * sin(uTime * 2.0);

        float intensity = ring * wave * pulse;

        vec3 color = uColor * intensity;

        // Stronger glow presence
        float alpha = clamp(intensity * 2.2, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
