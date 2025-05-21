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

      uniform float uTime;

      void main() {
        vUv = uv;
        vPosition = position;

        // Subtle 4D horizontal ripple motion
        float wave = 0.015 * sin(position.y * 6.0 + uTime * 2.5);

        // Vertical tapering
        float taper = 1.0 - smoothstep(0.9, 1.4, abs(position.y));
        vec3 pos = position;
        pos.x *= taper;
        pos.x += wave;

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
        return pow(1.0 - dist, 3.0);  // sharper glow center
      }

      float verticalFade(float y) {
        float fade = smoothstep(1.4, 0.2, abs(y));
        return mix(0.2, 1.0, fade);
      }

      void main() {
        float fadeY = verticalFade(vPosition.y);

        // Breathing and pulse rhythm
        float breath = 0.6 + 0.4 * sin(uTime * 1.1);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 6.5);
        float pulse = breath * heartbeat;

        // Glow core
        float core = fresnel(vUv);
        float intensity = core * fadeY * pulse;

        // Final beam color
        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
