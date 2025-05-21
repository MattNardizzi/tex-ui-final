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

        // Subtle taper to give beam some dynamic shape
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
        return 1.0 - smoothstep(0.01, 0.02, d); // thinner, cleaner line
      }

      float pulseMod() {
        return 0.95 + 0.05 * sin(uTime * 3.0);
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.98, 0.45, uv.y);
        float bottom = smoothstep(0.02, 0.5, uv.y);
        return top * bottom;
      }

      void main() {
        float line = coreLine(vUv);
        float fade = verticalFade(vUv);
        float pulse = pulseMod();

        float intensity = line * fade * pulse;
        vec3 color = uColor * intensity;

        // FORCE sharp beam: kill all blur by matching alpha to intensity
        gl_FragColor = vec4(color, clamp(intensity, 0.4, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
