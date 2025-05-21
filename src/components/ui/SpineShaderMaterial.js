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

        float taper = 1.0 - smoothstep(0.85, 1.3, abs(position.y));
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
        float d = length(uv - vec2(0.5));
        return pow(1.0 - d, 2.0);
      }

      float verticalFade(vec2 uv) {
        return smoothstep(1.0, 0.6, uv.y) * smoothstep(0.0, 0.4, uv.y);
      }

      void main() {
        float pulse = 0.6 + 0.4 * sin(uTime * 1.5) * (0.8 + 0.2 * sin(uTime * 6.0));
        float glow = fresnel(vUv);
        float fade = verticalFade(vUv);
        float intensity = glow * fade * pulse;

        // ENFORCE VISIBLE MINIMUM
        intensity = max(intensity, 0.15);

        vec3 color = uColor * intensity;
        gl_FragColor = vec4(color, intensity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
