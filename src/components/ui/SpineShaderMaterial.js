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

        float taper = 1.0 - smoothstep(0.9, 1.4, abs(position.y));
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
        return pow(1.0 - dist, 3.0);
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.65, uv.y);
        float bottom = smoothstep(0.0, 0.35, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        float breath = 0.6 + 0.4 * sin(uTime * 1.25);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 7.25);
        float pulse = breath * heartbeat;

        pulse = max(pulse, 0.15);  // ✅ Guarantees Tex never disappears

        float core = fresnel(vUv);
        float intensity = core * fade * pulse;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
