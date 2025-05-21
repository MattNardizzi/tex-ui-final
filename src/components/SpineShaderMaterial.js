import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
      uPulse: { value: 0.5 }
    },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPos;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPulse;

      float verticalFade(float y, float height) {
        float edge = height * 0.5;
        return smoothstep(0.0, 0.4, 1.0 - abs(y / edge));
      }

      void main() {
        float height = 2.5;
        float fade = verticalFade(vPos.y, height);

        float centerGlow = exp(-pow(length(vPos.xy) * 5.0, 2.0));
        float ripple = sin(vPos.y * 12.0 - uTime * 6.0) * 0.1;

        float intensity = centerGlow + ripple;
        vec3 color = mix(vec3(0.0), uColor, intensity * fade * (0.5 + uPulse));

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false,
    depthWrite: true,
    side: THREE.DoubleSide,
  });
}
