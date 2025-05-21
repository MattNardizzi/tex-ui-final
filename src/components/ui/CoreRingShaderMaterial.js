import * as THREE from 'three';

export function createCoreRingShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vAngle;
      void main() {
        vUv = uv;
        vAngle = atan(position.y, position.x);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;
      varying float vAngle;

      void main() {
        vec2 center = vec2(0.5);
        float dist = length(vUv - center);

        float outer = smoothstep(0.33, 0.29, dist);
        float inner = smoothstep(0.18, 0.22, dist);
        float ring = outer * (1.0 - inner);

        float core = smoothstep(0.1, 0.0, dist);
        float corePulse = 0.8 + 0.2 * sin(uTime * 5.0 + dist * 40.0);

        float spiral = sin(vAngle * 12.0 + uTime * 3.5) * 0.5 + 0.5;

        float total = (ring * spiral + core * corePulse) * 1.5;

        vec3 color = uColor * total;
        float alpha = clamp(total, 0.0, 1.0);

        gl_FragColor = vec4(color, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
