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
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      varying vec3 vPosition;
      varying vec2 vUv;

      uniform vec3 uColor;
      uniform float uTime;

      float fresnel(vec2 uv) {
        vec2 center = vec2(0.5, 0.5);
        float dist = length(uv - center);
        return pow(1.0 - dist, 2.8); // tighter core
      }

      float verticalFade(float y) {
        float fade = smoothstep(1.1, 0.1, abs(y));
        return mix(0.4, 1.0, fade); // Always visible, fades near ends
      }

      void main() {
        float fadeY = verticalFade(vPosition.y);

        // Slow breathing pattern
        float breath = 0.6 + 0.4 * sin(uTime * 1.2);

        // Fast heartbeat pulse
        float heartbeat = 0.9 + 0.1 * sin(uTime * 7.5);

        float pulse = breath * heartbeat;

        float core = fresnel(vUv);
        float intensity = core * fadeY * pulse;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
