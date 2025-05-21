import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vUv = uv;

        float taper = 1.0 - smoothstep(0.85, 1.25, abs(position.y));
        vec3 pos = position;
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      varying vec3 vPosition;
      varying vec2 vUv;

      uniform vec3 uColor;
      uniform float uTime;

      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 2.4);
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.7, uv.y);
        float bottom = smoothstep(0.0, 0.3, uv.y);
        return top * bottom;
      }

      void main() {
        float fadeY = verticalFade(vUv);
        float breath = 0.65 + 0.35 * sin(uTime * 1.1);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 7.0);
        float pulse = breath * heartbeat;

        float glow = fresnel(vUv);
        float intensity = max(0.08, glow * fadeY * pulse);

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, intensity);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
