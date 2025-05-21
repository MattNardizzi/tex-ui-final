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
        return pow(1.0 - dist, 2.0);
      }

      float verticalFade(float y) {
        return smoothstep(1.0, 0.05, abs(y));
      }

      void main() {
        float fadeY = verticalFade(vPosition.y);

        // Core light with pulse
        float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
        float coreGlow = fresnel(vUv) * pulse;

        float intensity = coreGlow * fadeY;
        vec3 finalColor = uColor * intensity;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
