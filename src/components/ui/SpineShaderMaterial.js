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

      float fresnel(vec2 uv) {
        float d = length(uv - vec2(0.5));
        return pow(1.0 - d, 16.0); // crisper core beam
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(0.98, 0.4, uv.y);
        float bottom = smoothstep(0.02, 0.5, uv.y);
        return top * bottom;
      }

      void main() {
        float pulse = 0.85 + 0.15 * sin(uTime * 1.5);
        float fade = verticalFade(vUv);
        float core = fresnel(vUv);
        float intensity = core * fade * pulse;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 0.2 + intensity * 0.8);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
