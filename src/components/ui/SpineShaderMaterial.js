import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
      uPulse: { value: 0.5 },
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

      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPulse;

      float glow(vec2 uv, float strength) {
        vec2 center = vec2(0.5, 0.5);
        float dist = length(uv - center);
        return pow(1.0 - dist, strength);
      }

      void main() {
        float fadeY = smoothstep(1.0, 0.05, abs(vPosition.y));
        float pulse = abs(sin(uTime * 2.5)) * 0.5 + 0.5;

        float baseGlow = glow(vUv, 3.5);
        float ripple = sin((vUv.y + uTime) * 20.0) * 0.05;

        float intensity = (baseGlow + ripple) * fadeY * pulse;
        vec3 color = mix(vec3(0.0), uColor, intensity);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
