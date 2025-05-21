import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
      uGain: { value: 1.0 },
    },
    vertexShader: `
      varying float vY;

      void main() {
        vY = position.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      uniform float uGain;
      varying float vY;

      float taper(float y) {
        return smoothstep(-1.3, -1.6, y) * smoothstep(1.6, 1.3, y);
      }

      float pulse(float y, float time) {
        return 0.8 + 0.2 * sin(time * 4.0 + y * 8.0);
      }

      void main() {
        float intensity = taper(vY) * pulse(vY, uTime) * uGain;
        vec3 color = uColor * intensity;

        gl_FragColor = vec4(color, clamp(intensity, 0.25, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
