import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
      uGain: { value: 1.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;

        float taper = 1.0 - smoothstep(2.8, 3.4, abs(pos.y));
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      uniform float uGain;
      varying vec2 vUv;

      float coreLine(vec2 uv) {
        float d = abs(uv.x - 0.5);
        return 1.0 - smoothstep(0.015, 0.03, d); // widened just a hair
      }

      float verticalFade(vec2 uv) {
        float top = pow(smoothstep(1.0, 0.7, uv.y), 1.5);
        float bottom = pow(smoothstep(0.0, 0.3, uv.y), 1.5);
        return top * bottom;
      }

      float pulseShimmer(vec2 uv) {
        float wave = sin(uTime * 2.4 + uv.y * 12.0 + sin(uv.x * 16.0 + uTime));
        return 0.92 + 0.12 * wave;
      }

      void main() {
        float line = coreLine(vUv);
        float fade = verticalFade(vUv);
        float pulse = pulseShimmer(vUv);

        float intensity = line * fade * pulse * uGain * 1.8;
        vec3 color = uColor * intensity;

        gl_FragColor = vec4(color, clamp(intensity, 0.75, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
