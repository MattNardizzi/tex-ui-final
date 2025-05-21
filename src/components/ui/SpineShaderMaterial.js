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

        float taper = 1.0 - smoothstep(2.2, 3.6, abs(pos.y)); // softened + fuller
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
        float edge = smoothstep(0.012, 0.028, d);       // slightly thicker center
        float falloff = smoothstep(0.05, 0.08, d);      // outer soft glow
        return (1.0 - edge) * (1.0 - falloff);
      }

      float verticalFade(vec2 uv) {
        float top = pow(smoothstep(1.0, 0.5, uv.y), 2.2);
        float bottom = pow(smoothstep(0.0, 0.3, uv.y), 2.2);
        return top * bottom;
      }

      float pulseShimmer(vec2 uv) {
        float wave = sin(uTime * 3.0 + uv.y * 20.0 + cos(uv.x * 25.0 + uTime * 0.5));
        return 0.88 + 0.15 * wave;
      }

      void main() {
        float line = coreLine(vUv);
        float fade = verticalFade(vUv);
        float pulse = pulseShimmer(vUv);

        float intensity = line * fade * pulse * uGain * 2.3;
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
