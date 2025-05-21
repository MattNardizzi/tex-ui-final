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

        // Gentle taper — maintains body while narrowing tips
        float taper = 1.0 - smoothstep(2.2, 3.4, abs(position.y));
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

      // Concentrated beam core
      float fresnel(vec2 uv) {
        float dist = length(uv - vec2(0.5));
        return pow(1.0 - dist, 6.0); // tighter, brighter center
      }

      // Soft radial outer blend
      float haloGlow(vec2 uv) {
        float dist = abs(uv.x - 0.5);
        return smoothstep(0.5, 0.0, dist); // wide soft halo
      }

      // Fade in/out at top and bottom
      float verticalFade(vec2 uv) {
        float top = smoothstep(0.95, 0.5, uv.y);
        float bottom = smoothstep(0.05, 0.45, uv.y);
        return top * bottom;
      }

      void main() {
        float fade = verticalFade(vUv);

        float pulse = 0.65 + 0.35 * sin(uTime * 1.2);
        float heartbeat = 0.9 + 0.1 * sin(uTime * 7.0);
        float beat = max(pulse * heartbeat, 0.2); // keep beam alive at all times

        float core = fresnel(vUv);
        float halo = haloGlow(vUv) * 0.25;

        float intensity = (core + halo) * fade * beat;

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, 0.08 + intensity); // prevent full blackout
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
