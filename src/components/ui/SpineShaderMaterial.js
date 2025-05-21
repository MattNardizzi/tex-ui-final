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

        // Smooth vertical tapering (core narrowing at ends)
        float taper = 1.0 - smoothstep(0.8, 1.5, abs(position.y));
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

      // Sharp fresnel core for depth
      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 2.75); // balanced intensity
      }

      // Smooth top/bottom fade
      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.5, uv.y);
        float bottom = smoothstep(0.0, 0.2, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        // Biometric-style pulse
        float breath = 0.6 + 0.4 * sin(uTime * 1.1);
        float heartbeat = 0.92 + 0.08 * sin(uTime * 6.8);
        float pulse = breath * heartbeat;

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
