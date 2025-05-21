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

        float taper = 1.0 - smoothstep(2.5, 3.6, abs(pos.y)); // strong taper spread
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
        return 1.0 - smoothstep(0.015, 0.035, d); // slightly wider line
      }

      float verticalFade(vec2 uv) {
        float top = pow(smoothstep(1.0, 0.6, uv.y), 2.0);
        float bottom = pow(smoothstep(0.0, 0.35, uv.y), 2.0);
        return top * bottom;
      }

      float pulseShimmer(vec2 uv) {
        float waveY = sin(uTime * 2.8 + uv.y * 15.0);
        float waveX = cos(uTime * 1.5 + uv.x * 10.0);
        return 0.9 + 0.1 * (waveY * waveX);
      }

      void main() {
        float line = coreLine(vUv);
        float fade = verticalFade(vUv);
        float pulse = pulseShimmer(vUv);

        float intensity = line * fade * pulse * uGain * 2.2; // 🔥 stronger presence
        vec3 color = uColor * intensity;

        gl_FragColor = vec4(color, clamp(intensity, 0.7, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
