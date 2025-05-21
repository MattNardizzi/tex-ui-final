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

        // Softer tapering for gentle glow, not hard pole
        float taper = 1.0 - smoothstep(2.0, 3.3, abs(position.y));
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

      // Deep core fresnel glow
      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 4.5); // sharper gradient inward
      }

      // Smooth vertical fade to black top and bottom
      float verticalFade(vec2 uv) {
        float top = smoothstep(0.95, 0.5, uv.y);
        float bottom = smoothstep(0.05, 0.45, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        float breath = 0.6 + 0.4 * sin(uTime * 1.1);
        float heartbeat = 0.9 + 0.1 * sin(uTime * 7.0);
        float pulse = breath * heartbeat;
        pulse = max(pulse, 0.15);

        float core = fresnel(vUv);
        float halo = smoothstep(0.42, 0.5, abs(vUv.x - 0.5)) * 0.18;

        float intensity = (core + halo) * fade * pulse;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,       // ✅ Enables layering glow
    depthWrite: false,       // ✅ Ensures proper blend with background
  });
}
