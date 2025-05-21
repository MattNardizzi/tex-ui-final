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
        vUv = uv;
        vPosition = position;

        // Perfect tapering for cinematic effect
        float taper = 1.0 - smoothstep(0.9, 1.4, abs(position.y));
        vec3 pos = position;
        pos.x *= taper;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      varying vec2 vUv;
      varying vec3 vPosition;

      uniform vec3 uColor;
      uniform float uTime;

      float fresnel(vec2 uv) {
        vec2 center = vec2(0.5, 0.5);
        float dist = length(uv - center);
        return pow(1.0 - dist, 2.5);
      }

      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.65, uv.y);
        float bottom = smoothstep(0.0, 0.35, uv.y);
        return top * bottom;
      }

      void main() {
        float breath = 0.6 + 0.4 * sin(uTime * 1.2);
        float heartbeat = 0.9 + 0.1 * sin(uTime * 7.5);
        float pulse = breath * heartbeat;

        float fadeY = verticalFade(vUv);
        float core = fresnel(vUv);
        float intensity = max(0.08, core * fadeY * pulse);

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
