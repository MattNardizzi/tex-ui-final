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
      varying vec3 vPosition;

      void main() {
        vY = position.y;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      uniform float uGain;

      varying float vY;
      varying vec3 vPosition;

      float taper(float y) {
        float top = smoothstep(1.4, 1.0, y);
        float bottom = smoothstep(-1.0, -1.4, y);
        return top * bottom;
      }

      float pulse(float y, float time) {
        return 0.7 + 0.3 * sin(time * 4.0 + y * 10.0);
      }

      float fresnel(float y) {
        return smoothstep(0.6, 1.4, abs(y));
      }

      void main() {
        float taperVal = taper(vY);
        float pulseVal = pulse(vY, uTime);
        float edge = fresnel(vY);

        float intensity = taperVal * pulseVal * uGain;
        vec3 color = uColor * intensity + uColor * edge * 0.2;

        gl_FragColor = vec4(color, clamp(intensity + edge, 0.1, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
