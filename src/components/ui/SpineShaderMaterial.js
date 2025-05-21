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

        // Taper width near top and bottom
        float taper = 1.0 - smoothstep(0.9, 1.4, abs(position.y));
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

      // Core glow falloff from beam center
      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 2.8);
      }

      // Smooth fade into black at top and bottom
      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.65, uv.y);
        float bottom = smoothstep(0.0, 0.35, uv.y);
        return top * bottom;
      }

      void main() {
        float fadeY = verticalFade(vUv);

        // Breath = slow modulation, Heartbeat = fast pulse
        float breath = 0.6 + 0.4 * sin(uTime * 1.1);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 7.5);
        float pulse = breath * heartbeat;

        float coreGlow = fresnel(vUv);
        float intensity = coreGlow * fadeY * pulse;

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
