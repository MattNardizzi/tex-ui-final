import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;

        float taper = 1.0 - smoothstep(2.0, 3.5, abs(position.y)); // keep soft tips
        vec3 pos = position;
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;

      varying vec2 vUv;
      varying vec3 vPosition;

      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 8.0); // 🔹 solid bright core
      }

      float midGlow(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 2.5) * 0.5; // 🔸 body blend
      }

      float halo(vec2 uv) {
        float dist = abs(uv.x - 0.5);
        return smoothstep(0.6, 0.0, dist) * 0.25; // 🌌 ambient glow
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.98, 0.4, uv.y);     // extended vertical blend
        float bottom = smoothstep(0.02, 0.5, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        float pulse = 0.7 + 0.3 * sin(uTime * 1.25);
        float beat = max(pulse, 0.25); // lock floor visibility

        float core = fresnel(vUv);
        float body = midGlow(vUv);
        float aura = halo(vUv);

        float intensity = (core + body + aura) * fade * beat;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 0.1 + intensity); // 🧬 visible even at low pulse
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
