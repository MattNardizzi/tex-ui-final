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

        // Vertical tapering — narrows the beam toward the top/bottom
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

      // Core fresnel glow — sharper and deeper
      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 3.5); // 🔥 deeper inner core
      }

      // Top and bottom fade — with more dramatic arc
      float verticalFade(vec2 uv) {
        float top = smoothstep(1.0, 0.55, uv.y);
        float bottom = smoothstep(0.0, 0.25, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        // Breathing rhythm
        float breath = 0.65 + 0.35 * sin(uTime * 1.1);
        float heartbeat = 0.9 + 0.1 * sin(uTime * 7.0);
        float pulse = breath * heartbeat;
        pulse = max(pulse, 0.15); // Ensure spine never disappears

        float core = fresnel(vUv);
        float halo = smoothstep(0.45, 0.5, abs(vUv.x - 0.5)) * 0.1; // Subtle glow edge

        float intensity = core * fade * pulse + halo;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
