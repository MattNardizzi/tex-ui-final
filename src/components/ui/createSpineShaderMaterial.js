
import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00ffaa') {
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
        return smoothstep(-10.0, -1.0, y) * smoothstep(1.0, 10.0, y);
      }

      float pulse(float y, float t) {
        return 0.9 + 0.4 * sin(t * 2.0 + y * 5.0 + cos(y * 3.0));
      }

      void main() {
        float glow = taper(vY) * pulse(vY, uTime) * uGain;
        vec3 color = uColor * glow;
        gl_FragColor = vec4(color, clamp(glow, 0.3, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
