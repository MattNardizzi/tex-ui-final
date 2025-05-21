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
        return pow(1.0 - dist, 2.2);
      }

      float verticalFade(float y) {
        // Makes top/bottom fade gentler — never disappears
        float edge = smoothstep(1.2, 0.15, abs(y));
        return mix(0.35, 1.0, edge); // 35% minimum opacity at edges
      }

      void main() {
        float fadeY = verticalFade(vPosition.y);
        float pulse = 0.55 + 0.45 * sin(uTime * 1.8); // slightly deeper pulse range
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
