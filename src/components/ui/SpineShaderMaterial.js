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

        // Minimal taper just to round tips
        float taper = 1.0 - smoothstep(2.6, 3.5, abs(pos.y));
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;

      float fresnel(vec2 uv) {
        float d = length(uv - vec2(0.5));
        return pow(1.0 - d, 10.0); // bright tight core
      }

      float midGlow(vec2 uv) {
        float d = length(uv - vec2(0.5));
        return pow(1.0 - d, 2.0) * 0.3;
      }

      float halo(vec2 uv) {
        float dx = abs(uv.x - 0.5);
        return smoothstep(0.6, 0.0, dx) * 0.15;
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.98, 0.4, uv.y);
        float bottom = smoothstep(0.02, 0.5, uv.y);
        return top * bottom;
      }

      void main() {
        float beat = max(0.7 + 0.3 * sin(uTime * 1.2), 0.25);
        float fade = verticalFade(vUv);

        float intensity = (fresnel(vUv) + midGlow(vUv) + halo(vUv)) * fade * beat;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 0.08 + intensity); // base alpha
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
