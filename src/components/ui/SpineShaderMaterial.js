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

        // Slight taper for shape
        float taper = 1.0 - smoothstep(3.0, 3.6, abs(pos.y));
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;

      float coreLine(vec2 uv) {
        float d = abs(uv.x - 0.5);
        return 1.0 - smoothstep(0.01, 0.02, d);
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.98, 0.45, uv.y);
        float bottom = smoothstep(0.02, 0.5, uv.y);
        return top * bottom;
      }

      float pulseShimmer(float y) {
        return 0.9 + 0.1 * sin(uTime * 2.5 + y * 10.0);
      }

      void main() {
        float line = coreLine(vUv);
        float fade = verticalFade(vUv);
        float pulse = pulseShimmer(vUv.y);

        float intensity = line * fade * pulse * 1.4;
        vec3 color = uColor * intensity;

        gl_FragColor = vec4(color, clamp(intensity, 0.65, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
