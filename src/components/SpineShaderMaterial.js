import * as THREE from 'three';

export function createSpineShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
      uPulse: { value: 0.5 },
      uResolution: { value: new THREE.Vector2(1.0, 1.0) },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPulse;

      float fresnel(vec3 normal, vec3 viewDir) {
        return pow(1.0 - dot(normal, viewDir), 3.0);
      }

      float glow(vec2 uv, float power) {
        float dist = length(uv - 0.5);
        return pow(1.0 - dist, power);
      }

      float shimmer(vec2 uv, float time) {
        float angle = atan(uv.y - 0.5, uv.x - 0.5);
        float wave = sin(angle * 12.0 + time * 4.0) * 0.05;
        return wave;
      }

      void main() {
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        float fresnelGlow = fresnel(normalize(vNormal), viewDir);

        float core = glow(vUv + shimmer(vUv, uTime), 4.5);
        float aura = glow(vUv, 1.5) * fresnelGlow;

        float fadeY = smoothstep(1.0, 0.1, abs(vPosition.y));
        float intensity = mix(aura, core, 0.8) * fadeY;

        vec3 finalColor = mix(vec3(0.0), uColor, intensity + uPulse * 0.3);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });
}
