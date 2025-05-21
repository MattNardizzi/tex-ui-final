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
        float taper = 1.0 - smoothstep(2.2, 3.4, abs(pos.y));
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
        return pow(1.0 - d, 10.0); // 🔹 tighter core
      }

      float halo(vec2 uv) {
        float dx = abs(uv.x - 0.5);
        return pow(1.0 - dx * 2.0, 2.0); // 🔸 still smooth but constrained
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.99, 0.4, uv.y);
        float bottom = smoothstep(0.01, 0.5, uv.y);
        return top * bottom;
      }

      void main() {
        float pulse = 0.7 + 0.3 * sin(uTime * 1.5);
        float beat = max(pulse, 0.3);

        float fade = verticalFade(vUv);
        float core = fresnel(vUv);
        float glow = halo(vUv) * 0.15;

        float intensity = (core + glow) * fade * beat;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 0.1 + intensity); // 🌟 minimum alpha
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
